const CACHE = 'fortnight-v2.5.0';
const ASSETS = [
  './',
  './index.html',
  './support.js',
  './icon-512.png',
  './icon-maskable-512.png',
  './manifest.webmanifest',
  './_ds/modernist-4b975c40-2f80-4e26-8c22-2849640d9bde/styles.css',
  './_ds/modernist-4b975c40-2f80-4e26-8c22-2849640d9bde/_ds_bundle.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(ASSETS.map(a => c.add(a)))).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request).then(m => m || caches.match('./index.html')))
  );
});
