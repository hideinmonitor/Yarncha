import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(new URL("..", import.meta.url).pathname);
const dist = resolve(root, "dist");
const html = await readFile(resolve(dist, "index.html"), "utf8");
const scriptUrls = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/gi)].map(match => match[1]);
assert.equal(scriptUrls.length, 1, "production HTML has exactly one application entry");
const normalized = scriptUrls.map(url => new URL(url, "https://yarncha.invalid").pathname);
assert.equal(new Set(normalized).size, normalized.length, "normalized script pathnames are unique regardless of query strings");
for (const pathname of normalized) await access(resolve(dist, pathname.slice(1)));
assert.doesNotMatch(html, /(?:app|calculator-engine|repeat-engine|symbol-database)\.js(?:\?|["'])/, "classic source scripts are absent from production HTML");

const requiredLinks = [...html.matchAll(/<(?:link|script)\b[^>]*(?:href|src)=["']([^"']+)["'][^>]*>/gi)]
  .map(match => match[1])
  .filter(url => url.startsWith("/") && !url.startsWith("//"));
for (const url of requiredLinks) {
  const pathname = new URL(url, "https://yarncha.invalid").pathname;
  await access(resolve(dist, pathname.slice(1)));
}
await access(resolve(dist, "service-worker.js"));
await access(resolve(dist, "manifest.webmanifest"));

console.log(`Production artifact contract passed with ${scriptUrls.length} application script.`);
