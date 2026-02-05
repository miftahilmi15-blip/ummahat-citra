const CACHE_NAME = 'masterpro-v2';
const assets = [
  'index.html',
  'kamalul.png',
  'manifest.json'
];

// Proses Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Sistem MasterPro: Mengamankan Aset...');
      return cache.addAll(assets);
    })
  );
});

// Aktivasi & Hapus Cache Lama
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Ambil Data
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
