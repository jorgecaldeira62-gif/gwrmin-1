const CACHE_NAME = 'cirurgiao-pwa-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './js/extractor.js',
  './js/comparator.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
