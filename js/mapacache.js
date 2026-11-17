'use strict';
// ===================== MAPA-MÚNDI GUARDADO NO APARELHO =====================
// Montar a imagem do mapa (e a grade de água usada pelos navios) exige calcular o terreno de
// quase um milhão de pontos. Isso era refeito toda vez que o jogo abria e pesava nos celulares.
// Agora, depois de pronta, ela fica guardada (IndexedDB) para aquele mundo e aquela versão do jogo;
// nas próximas vezes ela chega pronta. Se o aparelho não deixar guardar, tudo continua como antes.
const MapaCache = {
  BANCO: 'eldoria_mapa', LOJA: 'mapas', MAX: 3,
  chave(W) { return `m${W.seed}_${GAME_VERSION}_${MAP_W}x${MAP_H}`; },
  abrir(fn) {
    try {
      if (!window.indexedDB) return fn(null);
      const r = indexedDB.open(this.BANCO, 1);
      r.onupgradeneeded = () => { const db = r.result; if (!db.objectStoreNames.contains(this.LOJA)) db.createObjectStore(this.LOJA, { keyPath: 'k' }); };
      r.onsuccess = () => fn(r.result);
      r.onerror = () => fn(null);
      r.onblocked = () => fn(null);
    } catch (e) { fn(null); }
  },
  carregar(W) {
    const k = this.chave(W);
    this.abrir(db => {
      if (!db) return;
      try {
        const tx = db.transaction(this.LOJA, 'readonly'), q = tx.objectStore(this.LOJA).get(k);
        q.onsuccess = () => {
          const v = q.result;
          if (!v || W.mapDone || !W.mapCtx || v.w !== MAP_W || v.h !== MAP_H) return;
          const img = new ImageData(new Uint8ClampedArray(v.px), MAP_W, MAP_H);
          W.mapCtx.putImageData(img, 0, 0);
          W.navWater = new Uint8Array(v.nav);
          W.mapImg = null; W.mapRow = MAP_H; W.mapDone = true; W.mapDoCache = true;
          // estradas novas (as obras do jogador) por cima
          W.mapCtx.fillStyle = 'rgba(170,130,80,0.9)';
          for (const [ck, set] of W.roadTiles) {
            const cx = ck % 1024, cy = Math.floor(ck / 1024);
            for (const i of set) { if ((i & 3) || ((i >> 5) & 3)) continue; W.mapCtx.fillRect(Math.floor((cx * 32 + (i & 31)) / W.mapStep), Math.floor((cy * 32 + (i >> 5)) / W.mapStep), 1, 1); }
          }
        };
      } catch (e) { }
    });
  },
  salvar(W) {
    if (W.mapDoCache) return;
    // espera um pouco: ler a imagem e gravar acontece uma vez só, fora da hora de ação
    setTimeout(() => {
      try {
        // a imagem guardada é a de antes das estradas (elas são desenhadas por cima ao carregar)
        const px = W._mapBase, nav = W.navWater.buffer.slice(0); W._mapBase = null;
        if (!px) return;
        const k = this.chave(W);
        this.abrir(db => {
          if (!db) return;
          try {
            const tx = db.transaction(this.LOJA, 'readwrite'), st = tx.objectStore(this.LOJA);
            st.put({ k, w: MAP_W, h: MAP_H, px, nav, t: Date.now() });
            // guarda só os mapas mais recentes (cada um ocupa uns 5 MB)
            // (só os nomes: carregar os mapas inteiros para isso pesaria na memória do celular)
            const ks = st.getAllKeys();
            ks.onsuccess = () => {
              const l = (ks.result || []).filter(x => x !== k), velhos = l.filter(x => !String(x).includes('_' + GAME_VERSION + '_')), mesmos = l.filter(x => String(x).includes('_' + GAME_VERSION + '_'));
              for (const x of velhos) st.delete(x);                       // mapas de versões antigas do jogo
              for (const x of mesmos.slice(0, Math.max(0, mesmos.length - (this.MAX - 1)))) st.delete(x);
            };
          } catch (e) { }
        });
      } catch (e) { }
    }, 1500);
  }
};
