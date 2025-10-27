const CACHE_NAME = "pwa-cache-v1";
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/app/index.html",
  "/app/script.js",
  "/src/styles.css",
  "/src/script.js",
  "/service-worker.js",
  "/public/manifest.json",
  "/public/icon512_maskable.png",
  "/public/icon512_rounded.png",
  "/public/graphics/Imposter-logo.svg",
  "/public/videos/demo1.mp4",
  "/public/videos/hero.webm",
  "/public/videos/waves.mp4",
  "/public/videos/waves.webm",
  "/public/pictures/Hovering-Image.png",
  "/public/icons/github.svg",
  "/public/icons/add-task.svg",
  "/public/icons/growth.svg",
  "/public/icons/plus-icon.svg",
  "/public/icons/search.svg",
  "/public/icons/today.svg",
  "/public/icons/setting.svg",
  "/public/icons/sidebar-icon.svg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => caches.delete(key))
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("Serving from cache:", event.request.url);
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, response.clone());
            return response;
          });
        })
        .catch(() => {
          if (event.request.url.includes(".html")) {
            return caches.match("/index.html");
          }
          return caches.match(event.request.url) || caches.match("/index.html");
        });
    })
  );
});
