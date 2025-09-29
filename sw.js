
const CACHE='igic-pwa-v5';
const ASSETS=['./','./index.html','./services.html','./calculator.html','./branches.html','./claims.html','./about.html','./contact.html','./styles.css','./app.js','./manifest.json','./assets/logo-ui.png','./assets/icon-192.png','./assets/icon-384.png','./assets/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(resp=>{const copy=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return resp;}).catch(()=>caches.match('./'))));
});
