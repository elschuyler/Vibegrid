const CACHE_NAME = 'vibegrid-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/vibe-ui.css',
  '/romz-handler.js'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((c) => c.addAll(ASSETS))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request)
      .then((res) => res || fetch(e.request))
  );
});
