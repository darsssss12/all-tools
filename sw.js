// Ganti v1 ke v2 agar browser mendeteksi adanya pembaruan desain/kode
const CACHE_NAME = 'daris-mega-suite-v2';

const ASSETS = [
  './',
  './index.html',
  'https://unpkg.com/tesseract.js@v2.1.0/dist/tesseract.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap'
];

// Install: Simpan semua aset ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
  // Langsung aktifkan SW tanpa harus menunggu tab ditutup
  self.skipWaiting();
});

// Activate: Hapus cache versi lama yang sudah tidak terpakai
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch: Ambil data dari cache, jika tidak ada baru ambil dari internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
