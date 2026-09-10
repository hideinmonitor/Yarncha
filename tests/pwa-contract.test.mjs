import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";
import vm from "node:vm";

const root = resolve(new URL("..", import.meta.url).pathname);
const dist = resolve(root, "dist");
const workerSource = await readFile(resolve(dist, "service-worker.js"), "utf8");
const shell = JSON.parse(workerSource.match(/const APP_SHELL = (\[[\s\S]*?\]);\nconst OFFLINE_FALLBACK/)?.[1] || "null");
assert.ok(Array.isArray(shell) && shell.length > 4, "the built worker has a generated application shell");
assert.ok(shell.some(url => /^\/assets\/index-[^/]+\.js$/.test(url)), "the hashed application JavaScript is precached");
assert.ok(shell.some(url => /^\/assets\/index-[^/]+\.css$/.test(url)), "the hashed application CSS is precached");
assert.doesNotMatch(workerSource, /\/src\/|\?v=/, "the worker has no development source URLs");
for (const url of shell.filter(url => url !== "/")) await access(resolve(dist, url.slice(1)));

const listeners = {};
const stores = new Map();
let claimed = false;
let skipped = false;
const fakeCaches = {
  async open(name) {
    if (!stores.has(name)) stores.set(name, new Map());
    const entries = stores.get(name);
    return {
      async put(key, response) { entries.set(typeof key === "string" ? key : key.url, response.clone()); },
      async match(key) { return entries.get(typeof key === "string" ? key : key.url)?.clone(); }
    };
  },
  async keys() { return [...stores.keys()]; },
  async delete(name) { return stores.delete(name); },
  async match(key) {
    for (const entries of stores.values()) if (entries.has(typeof key === "string" ? key : key.url)) return entries.get(typeof key === "string" ? key : key.url).clone();
    return undefined;
  }
};
let fetchMode = "online";
const loggedErrors = [];
const context = {
  caches: fakeCaches,
  Response,
  URL,
  Request: class { constructor(url, options = {}) { this.url = url; Object.assign(this, options); } },
  fetch: async request => {
    const url = typeof request === "string" ? request : request.url;
    if (fetchMode === "offline") throw new TypeError("offline");
    if (fetchMode === "server-error" && url.endsWith("/route")) return new Response("failure", { status: 503 });
    if (fetchMode === "missing-optional" && url.endsWith("icon-512.png")) throw new TypeError("missing");
    if (fetchMode === "missing-critical" && (url === "/index.html" || /^\/assets\/index-[^/]+\.js$/.test(url))) throw new TypeError("missing");
    return new Response(`online:${url}`, { status: 200 });
  },
  console: { error: (...args) => loggedErrors.push(args), warn() {}, log() {} }
};
context.self = {
  location: { origin: "https://yarncha.invalid" },
  addEventListener(type, callback) { listeners[type] = callback; },
  skipWaiting() { skipped = true; },
  clients: { claim() { claimed = true; } }
};
vm.createContext(context);
vm.runInContext(workerSource, context);

async function lifecycle(type) {
  let promise;
  listeners[type]({ waitUntil(value) { promise = value; } });
  return promise;
}
await lifecycle("install");
assert.equal(skipped, true, "a complete shell advances the new worker");
const currentCache = [...stores.keys()].find(name => name.startsWith("yarncha-shell-"));
assert.ok(currentCache);
assert.ok(stores.get(currentCache).has("/index.html"), "the offline fallback was installed");

stores.set("yarncha-shell-old-build", new Map([["/index.html", new Response("old")]]));
stores.set("unrelated-cache", new Map());
await lifecycle("activate");
assert.equal(claimed, true, "the updated worker claims open clients");
assert.equal(stores.has("yarncha-shell-old-build"), false, "an older Yarncha worker cache is removed on update");
assert.equal(stores.has("unrelated-cache"), true, "unrelated origin caches are preserved");

const fallbackCache = await fakeCaches.open(currentCache);
await fallbackCache.put("/index.html", new Response("known-good", { status: 200 }));
fetchMode = "server-error";
let responsePromise;
listeners.fetch({ request: { method: "GET", url: "https://yarncha.invalid/route", mode: "navigate", destination: "document" }, respondWith(value) { responsePromise = value; } });
assert.equal((await responsePromise).status, 503, "an online HTTP failure is returned to the browser");
assert.equal(await (await fakeCaches.match("/index.html")).text(), "known-good", "a failed navigation never replaces the offline shell");

fetchMode = "offline";
listeners.fetch({ request: { method: "GET", url: "https://yarncha.invalid/offline-route", mode: "navigate", destination: "document" }, respondWith(value) { responsePromise = value; } });
assert.equal(await (await responsePromise).text(), "known-good", "offline navigation recovers from the cached shell");

fetchMode = "missing-optional";
await lifecycle("install");
assert.ok(loggedErrors.length, "a missing noncritical shell asset is diagnosed without silently aborting install");
fetchMode = "missing-critical";
await assert.rejects(lifecycle("install"), /critical offline shell asset could not be cached/, "a missing critical entry bundle fails installation explicitly");

console.log("PWA install, activation, update, offline, and recovery contract passed.");
