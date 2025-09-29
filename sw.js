const CACHE_NAME = 'pwa-layout-kokoh-v1';
const urlsToCache = [
  '/',
  '/index.html',
  // Jika Anda punya file CSS atau JS terpisah, tambahkan di sini
  // '/style.css',
  // '/app.js',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Event: Install
// Saat service worker di-install, buka cache dan tambahkan file-file di atas.
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Event: Fetch
// Saat ada permintaan (request) dari halaman web, cek dulu di cache.
// Jika ada, langsung berikan dari cache. Jika tidak, ambil dari jaringan.
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
