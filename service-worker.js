const CACHE_NAME = "yarncha-shell-v31";
const APP_SHELL = [
  "/",
  "/index.html",
  "/styles.css?v=31",
  "/calculator-engine.js?v=31",
  "/app.js?v=31",
  "/src/cloud/bootstrap.js?v=31",
  "/src/document-tools.js?v=31",
  "/public/manifest.json?v=31",
  "/public/icons/icon-192.png",
  "/public/icons/icon-512.png",
  "/public/icons/maskable-icon-192.png",
  "/public/icons/maskable-icon-512.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key)))).then(() => self.clients.claim()));
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  if (request.mode === "navigate") {
    event.respondWith(fetch(request).then(response => {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put("/index.html", copy));
      return response;
    }).catch(() => caches.match("/index.html")));
    return;
  }
  event.respondWith(caches.match(request).then(cached => cached || fetch(request).then(response => {
    const url = new URL(request.url);
    if (["script", "style", "image", "font"].includes(request.destination)) {
      const copy = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
    }
    return response;
  })));
});
