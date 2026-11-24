const CACHE = 'nexo-6';
const ARQUIVOS = ["./", "LICENCA-wllama.txt", "animes.js", "apk.js", "app.js", "icon-192.png", "icon-512.png", "index.html", "jogos.js", "local.js", "modelos.js", "motor.js", "novidades.js", "style.css", "voz.js", "wllama.js"];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ARQUIVOS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return;
  if (u.pathname.endsWith('.wasm')) {
    e.respondWith(caches.open(CACHE).then(c => c.match(e.request).then(r => r || fetch(e.request).then(n => { c.put(e.request, n.clone()); return n; }))));
    return;
  }
  e.respondWith(fetch(e.request).then(n => { const copia = n.clone(); caches.open(CACHE).then(c => c.put(e.request, copia)); return n; }).catch(() => caches.match(e.request)));
});
