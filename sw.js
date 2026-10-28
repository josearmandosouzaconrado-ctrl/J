// Service worker: permite jogar offline depois do primeiro acesso
const CACHE = 'eldoria-v17';
const FILES = ['./', './index.html', './css/style.css', './manifest.json', './icons/icon-192.png', './icons/icon-512.png',
  './js/util.js', './js/data.js', './js/trees.js', './js/sprites.js', './js/sprites2.js', './js/items.js', './js/world.js', './js/dungeon.js', './js/interior.js', './js/ui2.js',
  './js/entities.js', './js/player.js', './js/quests.js', './js/shops.js', './js/input.js', './js/audio.js', './js/ui.js', './js/game.js', './js/game2.js', './js/academy.js', './js/war.js', './js/naval.js', './js/ship.js', './js/work.js', './js/adm.js', './js/sombra_frames.js', './js/sombra.js', './img/criatura_sombras.png', './js/nyxar.js', './img/nyxar.png', './js/racas_frames.js', './js/racas.js', './img/racas.png', './js/elyndra.js', './js/ceu.js', './css/fonts/VT323-Regular.ttf'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); return r; }).catch(() => caches.match(e.request)));
});
