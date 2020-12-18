const staticCacheName = "site-static-v1";
const dynamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/Portfolio/index.html",
  "/Portfolio/assets/icons/favicon-16x16.png",
  "/Portfolio/assets/icons/favicon-32x32.png",
  "/Portfolio/assets/icons/android-chrome-192x192.png",
  "/Portfolio/assets/icons/android-chrome-512x512.png",
  "/Portfolio/assets/icons/favicon.ico",
  "/Portfolio/assets/icons/apple-touch-icon.png",
  "/Portfolio/assets/icons/maskable_icon.png",
  "/Portfolio/assets/DevFolio.jpg",
  "/Portfolio/assets/Gradient-Picker.jpg",
  "/Portfolio/assets/Neumorphism-Analog-Clock.jpg",
  "/Portfolio/assets/Neumorphism-Digital-Clock.jpg",
  "/Portfolio/assets/profile.jpg",
  "/Portfolio/assets/Website.jpg",
  "/Portfolio/assets/Working-Neumorphism-Keyboard.jpg",
  "/Portfolio/css/font-awesome.min.css",
  "/Portfolio/css/fontawesome-webfont.woff2",
  "/Portfolio/css/main.css",
  "/Portfolio/javascript/app.js",
  "/Portfolio/javascript/scrollreveal.min.js",
  "/Portfolio/javascript/scrollveal.js",
  "/Portfolio/javascript/valtilt.js",
  "/Portfolio/javascript/vanilla-tilt.min.js",
  "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
  "https://fonts.gstatic.com/s/montserrat/v15/JTUSjIg1_i6t8kCHKm459Wlhyw.woff2",
  "https://fonts.gstatic.com/s/montserrat/v15/JTURjIg1_i6t8kCHKm45_dJE3gnD_g.woff2",
];
// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};
//install serviceWorker
self.addEventListener("install", (evt) => {
  console.log("serviceworker installed");
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll(assets);
      console.log("caching all assests");
    })
  );
});
//activate event
self.addEventListener("activate", (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName && dynamicCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});
//fetch events
self.addEventListener("fetch", (evt) => {
  evt.respondWith(
    caches
      .match(evt.request)
      .then((cacheRes) => {
        return (
          cacheRes ||
          fetch(evt.request).then((fetchRes) => {
            return caches.open(dynamicCacheName).then((cache) => {
              cache.put(evt.request.url, fetchRes.clone());
              limitCacheSize(dynamicCacheName, 15);
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (evt.request.url.indexOf(".html") > -1)
          return caches.match("/pages/fallback.html");
      })
  );
});
