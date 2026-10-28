'use strict';
// ===================== ELYNDRA: OS BIOMAS INVENTADOS =====================
// Chãos, paredes, objetos e clima que só existem no continente do leste (e na ilha dos anjos).
const ELYNDRA_BIOMES = new Set(['reef', 'windland', 'crystal', 'liveforest', 'obsidian', 'dusk', 'savanna', 'cosmic', 'mist', 'livestone']);
const Elyndra = {
  // ---------- Chãos ----------
  initArt() {
    const S = Sprites, TP = S.TP, fill = S.fill, speck = S.speck;
    TP[T.CORAL] = (p, r) => {
      fill(p, '#2a7a8a'); speck(p, r, ['#246c7c', '#2f8494'], 30); speck(p, r, ['#3a98a6'], 12);
      for (let i = 0; i < 2; i++) { const x = r.int(1, 12), y = r.int(4, 14), c = r.pick(['#ff7a9a', '#ffa060', '#c080ff']); p(x, y, c, 1, 2); p(x + 1, y - 1, c); p(x - 1, y - 1, c); p(x + 2, y - 2, c); }
      for (let i = 0; i < 3; i++) p(r.int(0, 15), r.int(0, 15), r.pick(['#7ffff0', '#60f0ff']));
    };
    TP[T.LUMWATER] = (p, r) => {
      fill(p, '#148a98'); speck(p, r, ['#10808e', '#1896a4'], 30);
      for (let i = 0; i < 2; i++) { const x = r.int(0, 12), y = r.int(1, 14); p(x, y, '#40d8d0', 4, 1); p(x + 1, y - 1, '#90fff0', 2, 1); }
      for (let i = 0; i < 4; i++) p(r.int(0, 15), r.int(0, 15), r.pick(['#a0fff8', '#60ffe0', '#c0a0ff']));
    };
    TP[T.WINDGRASS] = (p, r) => {
      fill(p, '#9cc096'); speck(p, r, ['#8eb288', '#a6ca9e'], 30);
      for (let i = 0; i < 4; i++) { const x = r.int(0, 11), y = r.int(1, 15); p(x, y, '#d0e6c8', 3, 1); p(x + 3, y - 1, '#e4f2dc', 2, 1); }
    };
    TP[T.CRYSTALF] = (p, r) => {
      fill(p, '#7c6cb8'); speck(p, r, ['#7062aa', '#8878c4'], 26);
      for (let i = 0; i < 3; i++) { const x = r.int(1, 13), y = r.int(2, 14); p(x, y, '#b8a8f0'); p(x + 1, y, '#9a88dc'); p(x, y - 1, '#d8ccff'); p(x + 1, y + 1, '#5a4a9a'); }
      if (r.chance(0.6)) p(r.int(1, 14), r.int(1, 14), '#ffffff');
    };
    TP[T.LIVEMOSS] = (p, r) => {
      fill(p, '#3a9448'); speck(p, r, ['#32863e', '#40a050'], 32); speck(p, r, ['#58b464'], 12);
      let x = r.int(0, 15), y = r.int(0, 15); for (let i = 0; i < 7; i++) { p(x, y, '#7aff9a'); x += r.int(-1, 1); y += r.pick([-1, 1]); if (x < 0 || y < 0 || x > 15 || y > 15) break; }
    };
    TP[T.OBSIDIAN] = (p, r) => {
      fill(p, '#241c28'); speck(p, r, ['#1c1620', '#2c2232'], 30);
      for (let i = 0; i < 3; i++) { const x = r.int(0, 13), y = r.int(0, 14); p(x, y, '#5a4a6a', 2, 1); p(x + 2, y + 1, '#3a3044'); }
      if (r.chance(0.35)) { let x = r.int(2, 13), y = r.int(0, 6); for (let i = 0; i < 6; i++) { p(x, y, '#ff6a20'); x += r.int(-1, 1); y++; } }
    };
    TP[T.DUSKSAND] = (p, r) => {
      fill(p, '#6a5888'); speck(p, r, ['#5e4c7c', '#745f94'], 30); speck(p, r, ['#8a74a8'], 10);
      if (r.chance(0.5)) p(r.int(0, 15), r.int(0, 15), '#ffa0e0');
    };
    TP[T.SAVANNA] = (p, r) => {
      fill(p, '#c4a24a'); speck(p, r, ['#b8963e', '#cead56'], 30);
      for (let i = 0; i < 6; i++) { const x = r.int(0, 15), y = r.int(3, 15); p(x, y - 2, '#a8862e', 1, 3); p(x, y - 3, '#dcc070'); }
    };
    TP[T.STARDUST] = (p, r) => {
      fill(p, '#262a5c'); speck(p, r, ['#20244e', '#2c3068'], 30);
      for (let i = 0; i < 5; i++) p(r.int(0, 15), r.int(0, 15), r.pick(['#ffffff', '#fff0a0', '#a0e0ff', '#c0a0ff']));
      if (r.chance(0.5)) { const x = r.int(2, 13), y = r.int(2, 13); p(x, y - 1, '#e0e8ff'); p(x, y + 1, '#e0e8ff'); p(x - 1, y, '#e0e8ff'); p(x + 1, y, '#e0e8ff'); p(x, y, '#ffffff'); }
    };
    TP[T.MISTHEATH] = (p, r) => {
      fill(p, '#64828f'); speck(p, r, ['#5a7684', '#6e8c9a'], 30); speck(p, r, ['#8a7aa0', '#9a86b0'], 8); speck(p, r, ['#a8bcc6'], 8);
    };
    TP[T.LIVESTONE] = (p, r) => {
      fill(p, '#b08a5a'); speck(p, r, ['#a47e50', '#ba9464'], 30); speck(p, r, ['#c8a274', '#94703f'], 10);
      let x = r.int(0, 15), y = r.int(0, 15); for (let i = 0; i < 9; i++) { p(x, y, '#7a5a34'); x += r.int(-1, 1); y += r.int(-1, 1); if (x < 0 || y < 0 || x > 15 || y > 15) break; }
      if (r.chance(0.3)) { const xx = r.int(2, 11), yy = r.int(2, 11); p(xx, yy, '#50e0d0', 3, 1); p(xx + 1, yy + 1, '#50e0d0', 1, 2); p(xx + 1, yy - 1, '#a0fff0'); }
    };
    TP[T.CLOUD] = (p, r) => {
      fill(p, '#eef2fa'); speck(p, r, ['#e2e8f4', '#f6f8fe'], 26);
      for (let i = 0; i < 3; i++) { const x = r.int(0, 11), y = r.int(0, 12); p(x, y, '#ffffff', 4, 2); p(x + 1, y + 2, '#dde4f2', 3, 1); }
    };
    TP[T.SKYMARBLE] = (p, r) => {
      S.slabs(p, r, '#e8e2d0', '#c8bfa8', 8);
      speck(p, r, ['#f4f0e4', '#dcd4c0'], 10);
      if (r.chance(0.3)) p(r.int(1, 13), r.int(1, 13), '#e0c060', 2, 1);
    };
    TP[T.SKYVOID] = (p, r) => {
      fill(p, '#8ab8f0'); speck(p, r, ['#84b2ec', '#90bef4'], 20);
      if (r.chance(0.5)) { const x = r.int(0, 10), y = r.int(2, 13); p(x, y, '#b8d8ff', 6, 1); p(x + 2, y - 1, '#d0e6ff', 3, 1); }
    };
    S.WALLS[T.CRYSTALROCK] = { top: '#a090e0', face: '#7a62c8', dark: '#4a3a8a', hi: '#e0d8ff', kind: 'rock' };
    S.WALLS[T.CANYON] = { top: '#b08a5a', face: '#9a6a3a', dark: '#6a4420', hi: '#50e0d0', kind: 'rock' };
    S.WALLS[T.GOLDWALL] = { top: '#f0e8d0', face: '#e0d4b0', dark: '#b09a60', hi: '#ffe890', kind: 'brick' };
    [[T.CORAL, 5], [T.LUMWATER, 1], [T.WINDGRASS, 12], [T.CRYSTALF, 11], [T.LIVEMOSS, 13], [T.OBSIDIAN, 8], [T.DUSKSAND, 6], [T.SAVANNA, 11], [T.STARDUST, 9], [T.MISTHEATH, 10], [T.LIVESTONE, 8], [T.CLOUD, 14], [T.SKYMARBLE, 3]].forEach(([t, v]) => S.BLEND[t] = v);
    this.initObjs();
  },
  // ---------- Objetos ----------
  initObjs() {
    const S = Sprites, E = S.ellipse, X = S.extraObj;
    X[O.CORALTREE] = (v, f, r, mk) => {
      const col = ['#ff7a9a', '#40e0d0', '#c080ff'][v % 3], tip = ['#ffd0e0', '#c0fff8', '#f0d8ff'][v % 3];
      const c = mk(22, 28, p => {
        const branch = (x, y, a, n) => { for (let i = 0; i < n; i++) { p(x, y, col, 2, 2); x += Math.cos(a) * 1.2; y += Math.sin(a) * 1.2; a += r.range(-0.25, 0.25); } p(x, y, tip, 2, 2); };
        branch(10, 26, -Math.PI / 2, 14); branch(10, 18, -Math.PI / 2 - 0.7, 7); branch(11, 15, -Math.PI / 2 + 0.7, 7); branch(10, 22, -Math.PI / 2 + 1.0, 6); branch(10, 21, -Math.PI / 2 - 1.1, 5);
        E(p, 11, 26, 6, 2, shade(col, -0.4));
      });
      return { c, oy: 2 };
    };
    X[O.WINDSPIRE] = (v, f, r, mk) => {
      const c = mk(26, 36, (p, ctx) => {
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(13, 33, 8, 2.5, 0, 0, Math.PI * 2); ctx.fill();
        const y0 = 4 + (v % 3);
        E(p, 13, y0 + 9, 11, 7, '#8a8278'); E(p, 13, y0 + 12, 8, 6, '#6a645c'); E(p, 13, y0 + 16, 4, 4, '#5a544c'); p(12, y0 + 19, '#5a544c', 2, 3);
        E(p, 13, y0 + 6, 11, 4, '#7ab070'); E(p, 11, y0 + 5, 6, 2, '#9ad08a');
        p(4, y0 + 22, '#7a746c', 2, 2); p(20, y0 + 24, '#7a746c', 2, 2);
        if (v === 1) { p(16, y0, '#5a3a1a', 1, 4); E(p, 16, y0 - 1, 3, 2, '#5aa04a'); }
      }, false);
      Sprites.outline(c);
      return { c, oy: 2 };
    };
    X[O.CRYSTALSPIRE] = (v, f, r, mk) => {
      const c = mk(20, 32, p => {
        const shard = (x, w, h, col, hi) => { for (let y = 0; y < h; y++) { const hw = y < 4 ? Math.max(1, y * w / 8) : w / 2; p(x - hw, 30 - h + y, col, hw * 2, 1); } p(x - 1, 31 - h + 3, hi, 1, h - 6); };
        shard(6, 5, 16 + v * 2, '#8a70e0', '#e0d8ff'); shard(14, 5, 18, '#7a60d0', '#d0c8ff'); shard(10, 7, 26 - v, '#a090f0', '#ffffff');
        p(2, 30, '#5a4a9a', 16, 2);
      });
      return { c, oy: 2 };
    };
    X[O.LIVETREE] = (v, f, r, mk) => {
      const leaf = ['#3a9a4a', '#4aa83a', '#2a8a5a'][v % 3];
      const c = mk(34, 46, p => {
        p(13, 24, '#5a3a20', 8, 22); p(13, 24, '#7a5030', 2, 22); p(19, 24, '#3a2410', 2, 22); p(10, 42, '#5a3a20', 14, 4);
        p(15, 30, '#101810', 2, 2); p(18, 30, '#101810', 2, 2); p(15, 30, '#90ff90'); p(18, 30, '#90ff90'); p(16, 34, '#2a1a0a', 3, 1);
        S.blob(p, r, 17, 14, 13, leaf); S.blob(p, r, 10, 18, 7, shade(leaf, -0.15)); S.blob(p, r, 24, 18, 7, shade(leaf, -0.1));
        for (let i = 0; i < 9; i++) p(r.int(6, 28), r.int(4, 24), r.pick(['#a0ffb0', '#d0ffa0', '#70e090']));
      });
      return { c, oy: 2 };
    };
    X[O.OBSIDSPIKE] = (v, f, r, mk) => {
      const c = mk(16, 24, p => {
        for (let y = 0; y < 22; y++) { const hw = Math.max(1, Math.round(y / 3.2)); p(8 - hw, 1 + y, '#1a1420', hw * 2, 1); p(8 - hw, 1 + y, '#3a3048'); }
        p(7, 4, '#6a5a80', 1, 12); let x = 9, y = 8; for (let i = 0; i < 10; i++) { p(x, y, '#ff6a20'); x += r.int(-1, 0) || 0; y++; } p(2, 22, '#2a2030', 12, 2);
        if (v) { for (let y = 0; y < 12; y++) { const hw = Math.max(1, Math.round(y / 3)); p(3 - hw / 2, 11 + y, '#241c2c', hw, 1); } }
      });
      return { c, oy: 1 };
    };
    X[O.DUSKBLOOM] = (v, f, r, mk) => {
      const c = mk(12, 14, p => {
        p(5, 7, '#3a5a3a', 1, 7); p(3, 10, '#4a6a4a', 2, 1); p(7, 9, '#4a6a4a', 2, 1);
        const pc = v ? '#e070ff' : '#b070f0'; E(p, 3, 4, 2, 2, pc); E(p, 8, 4, 2, 2, pc); E(p, 5.5, 2, 2, 2, pc); E(p, 5.5, 6, 2, 2, pc); p(5, 4, '#fff0a0', 2, 2);
      });
      return { c, oy: 0 };
    };
    X[O.BAOBAB] = (v, f, r, mk) => {
      const c = mk(36, 46, p => {
        p(12, 18, '#a08060', 12, 26); p(10, 30, '#a08060', 16, 14); p(12, 18, '#b89a78', 3, 26); p(21, 18, '#7a5a40', 3, 26); p(9, 42, '#8a6a4a', 18, 4);
        for (const [x, y] of [[8, 12], [18, 8], [27, 12]]) { p(x + 3, y + 4, '#8a6a4a', 2, 8); E(p, x + 4, y + 2, 7, 3.5, v ? '#7a8a3a' : '#6a8a30'); E(p, x + 3, y + 1, 4, 2, '#9ab050'); }
      });
      return { c, oy: 2 };
    };
    X[O.STARSHARD] = (v, f, r, mk) => {
      const c = mk(18, 26, (p, ctx) => {
        ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath(); ctx.ellipse(9, 24, 5, 1.5, 0, 0, Math.PI * 2); ctx.fill();
        for (let y = 0; y < 14; y++) { const hw = y < 7 ? y * 0.7 + 1 : (14 - y) * 0.7 + 1; p(9 - hw, 3 + y, y < 7 ? '#d0e0ff' : '#8090f0', hw * 2, 1); }
        p(8, 5, '#ffffff', 1, 8); p(9, 1, '#ffffff', 1, 2); p(9, 18, '#ffffff', 1, 2); p(3, 10, '#ffffff', 2, 1); p(14, 10, '#ffffff', 2, 1);
        if (v) { p(2, 4, '#fff0a0'); p(15, 16, '#a0e0ff'); }
      }, false);
      Sprites.outline(c, '#101040');
      return { c, oy: 2 };
    };
    X[O.MISTREED] = (v, f, r, mk) => {
      const c = mk(14, 14, p => { for (let i = 0; i < 5; i++) { const x = 2 + i * 2.4 | 0, h = r.int(6, 12); p(x, 14 - h, '#a8bcc6', 1, h); p(x, 14 - h, '#d8e4ea', 1, 2); } }, false);
      return { c, oy: 0 };
    };
    X[O.RUNEMONO] = (v, f, r, mk) => {
      const c = mk(18, 34, p => {
        p(3, 4, '#a08058', 12, 28); p(4, 2, '#a08058', 10, 2); p(3, 4, '#c0a070', 2, 28); p(13, 4, '#7a5a38', 2, 28); p(1, 30, '#8a6a44', 16, 4);
        for (let i = 0; i < 4; i++) { const y = 7 + i * 6; p(7, y, '#50e0d0', 4, 1); p(v ? 8 : 9, y + 1, '#50e0d0', 1, 2); p(6, y + 3, '#30b0a0', 2, 1); }
      });
      return { c, oy: 2 };
    };
    X[O.SKYPILLAR] = (v, f, r, mk) => {
      const c = Sprites.cv(30, 140), x = c.getContext('2d');
      // feixe de luz subindo até as nuvens
      const g = x.createLinearGradient(0, 0, 0, 126);
      g.addColorStop(0, 'rgba(255,250,220,0)'); g.addColorStop(0.35, 'rgba(255,248,210,0.55)'); g.addColorStop(1, 'rgba(255,255,240,0.95)');
      x.fillStyle = g; x.fillRect(8, 0, 14, 126);
      x.fillStyle = 'rgba(255,255,255,0.9)'; x.fillRect(13, 10, 4, 116);
      const p = Sprites.P(x);
      // base de mármore com runas douradas
      p(3, 124, '#e8e2d0', 24, 12); p(3, 124, '#ffffff', 24, 2); p(1, 134, '#c8bfa8', 28, 6); p(5, 128, '#e0c060', 3, 2); p(22, 128, '#e0c060', 3, 2); p(13, 129, '#e0c060', 4, 3);
      return { c, oy: 2 };
    };
    X[O.ANGELSTATUE] = (v, f, r, mk) => {
      const c = mk(26, 38, p => {
        p(6, 32, '#c8bfa8', 14, 6); p(6, 32, '#e8e2d0', 14, 1);
        for (let i = 0; i < 9; i++) { p(1 + i * 0.4, 8 + i * 2, '#f4f0e4', 7 - i * 0.5, 2); p(25 - 7 + i * 0.5 - i * 0.4, 8 + i * 2, '#f4f0e4', 7 - i * 0.5, 2); }
        p(10, 12, '#ece6d6', 6, 20); p(9, 20, '#ece6d6', 8, 12); E(p, 13, 8, 3, 3.5, '#f4f0e4'); p(10, 3, '#e0c060', 6, 1);
        p(11, 13, '#d0c8b4', 1, 18);
      });
      return { c, oy: 2 };
    };
    X[O.SKYFOUNT] = (v, f, r, mk) => {
      const c = mk(30, 26, p => {
        E(p, 15, 18, 14, 6, '#c8bfa8'); E(p, 15, 17, 12, 4.5, '#ffe080'); E(p, 15, 16, 8, 2.5, '#fff8d0');
        p(13, 4, '#e8e2d0', 4, 12); E(p, 15, 5, 5, 2, '#e8e2d0'); p(14, 0, '#fff8d0', 2, 4);
        for (let i = 0; i < 6; i++) p(r.int(4, 25), r.int(13, 20), '#ffffff');
      });
      return { c, oy: 2 };
    };
    X[O.HARP] = (v, f, r, mk) => {
      const c = mk(18, 26, p => {
        p(3, 2, '#e0b040', 2, 22); p(3, 2, '#f0d070', 12, 2); for (let i = 0; i < 12; i++) p(14 - i * 0.2, 4 + i * 1.6, '#e0b040', 2, 2);
        for (let x = 6; x < 14; x += 2) p(x, 4, '#fff8e0', 1, 18 - (x - 6));
        p(1, 23, '#c09030', 8, 3);
      });
      return { c, oy: 2 };
    };
  },
  // ---------- Clima de cada bioma ----------
  weatherKind(b, r) {
    switch (b) {
      case 'reef': case 'liveforest': return r < 0.5 ? 'spores' : null;
      case 'windland': return r < 0.65 ? 'wind' : null;
      case 'crystal': return r < 0.45 ? 'sparkle' : null;
      case 'obsidian': return r < 0.6 ? 'ash' : null;
      case 'dusk': return 'dusk';
      case 'savanna': return r < 0.15 ? 'rain' : r < 0.3 ? 'sand' : null;
      case 'cosmic': return r < 0.65 ? 'stars' : null;
      case 'mist': return r < 0.85 ? 'mist' : null;
      case 'livestone': return r < 0.25 ? 'sand' : null;
    }
    return null;
  },
  drawWeather(ctx, kind, vw, vh, t) {
    if (kind === 'spores') {
      for (let i = 0; i < 46; i++) {
        const x = (hash2(i, 1, 21) * vw + Math.sin(t * 0.6 + i) * 14) % vw, y = vh - ((hash2(i, 2, 21) * vh + t * (8 + (i % 4) * 3)) % vh);
        const a = 0.45 + Math.sin(t * 3 + i) * 0.35; ctx.fillStyle = i % 3 ? `rgba(120,255,220,${a})` : `rgba(200,140,255,${a})`; ctx.fillRect(Math.round(x), Math.round(y), i % 5 ? 1 : 2, i % 5 ? 1 : 2);
      }
    } else if (kind === 'wind') {
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      for (let i = 0; i < 26; i++) { const x = (hash2(i, 1, 31) * vw * 1.4 + t * 340) % (vw * 1.4) - vw * 0.2, y = (hash2(i, 2, 31) * vh + Math.sin(t * 2 + i) * 6) % vh; ctx.fillRect(Math.round(x), Math.round(y), 10 + (i % 4) * 6, 1); }
      ctx.fillStyle = 'rgba(160,220,140,0.8)';
      for (let i = 0; i < 10; i++) { const x = (hash2(i, 3, 31) * vw + t * 200) % vw, y = (hash2(i, 4, 31) * vh + Math.sin(t * 4 + i) * 10) % vh; ctx.fillRect(Math.round(x), Math.round(y), 2, 1); }
    } else if (kind === 'sparkle') {
      for (let i = 0; i < 40; i++) {
        const x = hash2(i, 1, 41) * vw, y = hash2(i, 2, 41) * vh, a = Math.max(0, Math.sin(t * 2.5 + i * 1.7));
        if (a < 0.2) continue; ctx.fillStyle = `rgba(230,210,255,${a})`; ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
        if (a > 0.85) { ctx.fillRect(Math.round(x) - 1, Math.round(y), 3, 1); ctx.fillRect(Math.round(x), Math.round(y) - 1, 1, 3); }
      }
    } else if (kind === 'dusk') {
      ctx.fillStyle = 'rgba(110,50,140,0.14)'; ctx.fillRect(0, 0, vw, vh);
      for (let i = 0; i < 24; i++) { const x = (hash2(i, 1, 51) * vw + t * 6) % vw, y = (hash2(i, 2, 51) * vh - t * 4 + vh) % vh; ctx.fillStyle = `rgba(255,170,230,${0.3 + Math.sin(t + i) * 0.2})`; ctx.fillRect(Math.round(x), Math.round(y), 1, 1); }
    } else if (kind === 'stars') {
      ctx.fillStyle = 'rgba(20,20,70,0.12)'; ctx.fillRect(0, 0, vw, vh);
      for (let i = 0; i < 4; i++) {
        const ph = (t * 0.5 + hash2(i, 9, 61) * 7) % 3; if (ph > 1) continue;
        const x0 = hash2(i, Math.floor((t * 0.5 + hash2(i, 9, 61) * 7) / 3), 61) * vw, y0 = hash2(i, 3, 61) * vh * 0.5;
        const x = x0 + ph * 90, y = y0 + ph * 50;
        ctx.fillStyle = `rgba(255,255,255,${1 - ph})`; ctx.fillRect(Math.round(x), Math.round(y), 2, 1);
        ctx.fillStyle = `rgba(180,200,255,${(1 - ph) * 0.5})`; for (let k = 1; k < 6; k++) ctx.fillRect(Math.round(x - k * 3), Math.round(y - k * 1.7), 2, 1);
      }
      for (let i = 0; i < 30; i++) { const a = Math.max(0, Math.sin(t * 1.5 + i * 2.1)); ctx.fillStyle = `rgba(200,210,255,${a * 0.8})`; ctx.fillRect(Math.round(hash2(i, 1, 63) * vw), Math.round(hash2(i, 2, 63) * vh), 1, 1); }
    } else if (kind === 'mist') {
      const tex = Sombra.fogTex(), D = 3;
      ctx.save(); ctx.imageSmoothingEnabled = true;
      ctx.fillStyle = 'rgba(170,190,205,0.18)'; ctx.fillRect(0, 0, vw, vh);
      for (const [sp, al, sc] of [[5, 0.42, 3], [-8, 0.32, 4.5]]) {
        ctx.globalAlpha = al; const tw = tex.width * sc, th = tex.height * sc;
        const ox = -((((Game.camX / D) + t * sp) * D % tw) + tw) % tw, oy = -((((Game.camY / D) + t * sp * 0.3) * D % th) + th) % th;
        for (let yy = oy; yy < vh; yy += th) for (let xx = ox; xx < vw; xx += tw) ctx.drawImage(tex, xx, yy, tw, th);
      }
      ctx.restore();
    }
  },
  // nome do mar que o navio cruza
  seaName(a, b) { return a === 4 || b === 4 ? 'Mar do Amanhecer' : a === 2 || b === 2 ? 'Oceano do Sul' : 'Mar das Brumas'; }
};
