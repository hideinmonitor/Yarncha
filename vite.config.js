import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { defineConfig } from "vite";

const virtualEntry = "virtual:yarncha-application";
const resolvedVirtualEntry = `\0${virtualEntry}`;
const classicSources = [
  "src/data/sizeReference.js",
  "src/calculations/core.js",
  "src/calculations/gauge.js",
  "src/calculations/yarn.js",
  "src/calculations/sizing.js",
  "src/calculations/repeat.js",
  "src/calculations/shaping.js",
  "src/calculations/garments.js",
  "src/calculations/crochet.js",
  "src/calculations/knitting.js",
  "src/calculations/rendering.js",
  "calculator-engine.js",
  "repeat-engine.js",
  "src/data/symbolReferenceMap.js",
  "symbol-database.js",
  "app.js"
];

function serviceWorkerSource(shellFiles) {
  const version = createHash("sha256").update(JSON.stringify(shellFiles)).digest("hex").slice(0, 16);
  return String.raw`const CACHE_PREFIX = "yarncha-shell-";
const CACHE_NAME = CACHE_PREFIX + ${JSON.stringify(version)};
const APP_SHELL = ${JSON.stringify(shellFiles, null, 2)};
const OFFLINE_FALLBACK = "/index.html";
const CRITICAL_SHELL = new Set(APP_SHELL.filter(url => url === OFFLINE_FALLBACK || /^\/assets\/index-[^/]+\.(?:js|css)$/.test(url)));

async function precacheShell() {
  const cache = await caches.open(CACHE_NAME);
  const failures = [];
  await Promise.all(APP_SHELL.map(async url => {
    try {
      const response = await fetch(new Request(url, { cache: "reload" }));
      if (!response.ok) throw new Error(String(response.status));
      await cache.put(url, response);
    } catch (error) {
      failures.push({ url, message: String(error && error.message || error) });
    }
  }));
  if (failures.length) {
    console.error("[Yarncha service worker] Precache failures", failures);
    if (failures.some(item => CRITICAL_SHELL.has(item.url))) {
      throw new Error("A critical offline shell asset could not be cached.");
    }
  }
}

self.addEventListener("install", event => {
  event.waitUntil(precacheShell().then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME).map(key => caches.delete(key))))
    .then(() => self.clients.claim()));
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.startsWith("/api/")) return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(async response => {
      if (response.ok) await (await caches.open(CACHE_NAME)).put(OFFLINE_FALLBACK, response.clone());
      return response;
    }).catch(async () => (await caches.match(OFFLINE_FALLBACK)) || Response.error()));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(async response => {
    if (response.ok && ["script", "style", "image", "font", "worker"].includes(request.destination)) {
      await (await caches.open(CACHE_NAME)).put(request, response.clone());
    }
    return response;
  })));
});
`;
}

function yarnchaBuildPlugin() {
  return {
    name: "yarncha-single-entry-and-pwa",
    resolveId(id) {
      return id === virtualEntry ? resolvedVirtualEntry : null;
    },
    async load(id) {
      if (id !== resolvedVirtualEntry) return null;
      const chunks = [];
      for (const file of classicSources) {
        this.addWatchFile(resolve(file));
        chunks.push(`\n/* Yarncha source: ${file} */\n${await readFile(resolve(file), "utf8")}`);
      }
      return chunks.join("\n");
    },
    generateBundle(_options, bundle) {
      const emitted = Object.keys(bundle).map(file => `/${file}`);
      const shell = [...new Set([
        "/",
        "/index.html",
        "/manifest.webmanifest",
        "/icons/icon-192.png",
        "/icons/icon-512.png",
        "/icons/maskable-icon-192.png",
        "/icons/maskable-icon-512.png",
        ...emitted
      ])].sort();
      this.emitFile({ type: "asset", fileName: "service-worker.js", source: serviceWorkerSource(shell) });
    }
  };
}

export default defineConfig({
  publicDir: "public",
  plugins: [yarnchaBuildPlugin()],
  build: {
    chunkSizeWarningLimit: 1100,
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: { input: "index.html" }
  },
  server: { host: "0.0.0.0", port: 4183 },
  preview: { host: "0.0.0.0", port: 4183 }
});
