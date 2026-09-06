const CACHE_NAME = 'radar-10k-v2';
const urlsToCache = [
  '/Radar-10K-Full/',
  '/Radar-10K-Full/index.html',
  '/Radar-10K-Full/manifest.json',
  '/Radar-10K-Full/logo-customizada.png',
  '/Radar-10K-Full/icon-192.png',
  '/Radar-10K-Full/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
