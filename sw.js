
const CACHE = 'aiic-full-v1';
const ASSETS = [
  './','./index.html','./styles.css','./manifest.json','./sw.js',
  './services.html','./calculator.html','./branches.html','./claims.html','./contact.html',
  './app.js',
  './assets/logo-ui.png','./assets/icon-192.png','./assets/icon-384.png','./assets/icon-512.png'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});
self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).then(resp => {
      const copy = resp.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return resp;
    }).catch(() => caches.match('./')))
  );
});
