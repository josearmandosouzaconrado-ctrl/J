'use strict';
// ===================== GUERRA NAVAL =====================
// Frotas dos reinos em guerra navegam por rotas de mar reais (grade de navegação),
// travam batalhas navais com canhões e fazem desembarques de tropas em cidades costeiras.
// Os reinos industriais de Valtheria usam encouraçados de ferro a vapor.

const SHIP_TYPES = {
  galeao: { name: 'Galeão', hp: 110, dmg: 12, guns: 2, spd: 30 },
  drakkar: { name: 'Drakkar', hp: 75, dmg: 9, guns: 1, spd: 36 },
  encouracado: { name: 'Encouraçado a Vapor', hp: 230, dmg: 19, guns: 2, spd: 32 }
};

const Naval = {
  vis: [], balls: [], boats: [], _grid: null,
  shipTypeOf(k) { const S = KSTYLE[k] || {}; return S.musket ? 'encouracado' : (k === 'nordheim' || k === 'gromhald' || k === 'gorthak' || k === 'orkhai') ? 'drakkar' : 'galeao'; },

  // ---------- Desenho dos navios ----------
  sprite(type, col, frame = 0) {
    this._spr = this._spr || {};
    const key = type + col + frame;
    if (this._spr[key]) return this._spr[key];
    let c;
    if (type === 'encouracado') c = this.drawIronclad(col, frame);
    else if (type === 'drakkar') c = this.drawDrakkar(col);
    else c = this.drawGalleon(col);
    Sprites.outline(c, '#120c10');
    this._spr[key] = c;
    return c;
  },
  drawGalleon(col) {
    const W = 92, H = 78, c = Sprites.cv(W, H), p = Sprites.P(c.getContext('2d'));
    const wl = 66; // linha d'água
    // casco curvo com tábuas
    for (let y = 46; y < wl + 6; y++) {
      const t = (y - 46) / (wl + 6 - 46);
      const inset = Math.round(t * t * 14), x0 = 8 + inset + (y < 52 ? Math.max(0, 52 - y) * 0 : 0), x1 = 78 - Math.round(t * t * 6);
      const plank = (y % 3 === 0) ? '#4a2a14' : (y < 52 ? '#8a5a30' : y % 6 < 3 ? '#6e4424' : '#7a4c28');
      p(x0, y, plank, x1 - x0, 1);
      p(x0, y, '#3a2010', 1, 1);
    }
    p(8, 50, '#c8a040', 70, 2);                                     // friso dourado
    p(10, 55, '#2a1810', 66, 4); for (let x = 14; x < 74; x += 7) { p(x, 55, '#1a0c08', 4, 4); p(x, 54, '#5a3a1a', 4, 1); } // portinholas
    // castelo de popa (atrás) e de proa
    p(4, 34, '#7a4c28', 18, 14); p(4, 34, '#9a6a3a', 18, 2); p(4, 33, '#c8a040', 18, 1);
    for (let x = 6; x < 20; x += 5) { p(x, 38, '#3a2010', 3, 4); p(x, 38, '#f0c060', 3, 2); }
    p(2, 32, '#c8a040', 2, 16); p(68, 40, '#7a4c28', 12, 8); p(68, 40, '#9a6a3a', 12, 1);
    // gurupés e figura de proa
    for (let i = 0; i < 16; i++) p(78 + i, 42 - Math.round(i * 0.55), '#5a3a1a', 1, 2);
    p(80, 44, '#e0c060', 3, 4);
    // mastros e vergas
    const masts = [[26, 6, 40], [46, 0, 46], [64, 10, 36]];
    for (const [mx, top, h] of masts) { p(mx, top, '#4a2c14', 2, h); p(mx, top, '#6a4422', 1, h); }
    // velas enfunadas com luz e sombra
    const sail = (mx, top, w, h) => {
      p(mx - w / 2 - 1, top - 1, '#3a2a1a', w + 2, 1);
      for (let y = 0; y < h; y++) {
        const bulge = Math.round(Math.sin(y / h * Math.PI) * 3), t = y / h;
        for (let x = -w / 2 - bulge; x < w / 2 + bulge; x++) {
          const u = (x + w / 2 + bulge) / (w + bulge * 2);
          const tone = 0.9 - t * 0.12 - Math.abs(u - 0.35) * 0.15;
          p(mx + x, top + y, shade('#f2ead6', (tone - 0.9) * 1.5), 1, 1);
        }
      }
      for (let y = 2; y < h; y += 5) p(mx - w / 2 + 1, top + y, '#d8ccb0', w - 2, 1);
      p(mx - w / 2 - 1, top + h, '#3a2a1a', w + 2, 1);
    };
    sail(27, 8, 24, 14); sail(27, 24, 26, 14); sail(47, 3, 26, 16); sail(47, 21, 30, 16); sail(65, 12, 20, 12); sail(65, 26, 22, 12);
    // emblema do reino nas velas grandes
    for (const [cx, cy] of [[47, 28], [27, 30]]) { p(cx - 3, cy - 3, col, 7, 7); p(cx - 1, cy - 4, col, 3, 9); p(cx - 1, cy - 1, shade(col, 0.4), 3, 3); }
    // vela latina na proa
    for (let y = 0; y < 18; y++) p(70 + Math.round(y * 0.5), 22 + y, '#ece2cc', Math.round(y * 0.8) + 1, 1);
    // cordame
    for (let i = 0; i < 18; i++) { p(10 + i * 0.9, 46 - i * 2.2, '#2a1a10'); p(56 + i * 0.5, 46 - i * 2.4, '#2a1a10'); p(80 - i * 0.8, 40 - i * 1.6, '#2a1a10'); }
    p(44, 6, '#4a2c14', 6, 2);                                       // cesto da gávea
    p(47, 0, col, 9, 5); p(47, 0, shade(col, 0.3), 9, 1);             // bandeira
    return c;
  },
  drawDrakkar(col) {
    const W = 84, H = 56, c = Sprites.cv(W, H), p = Sprites.P(c.getContext('2d'));
    for (let y = 36; y < 50; y++) { const t = (y - 36) / 14, inset = Math.round(t * t * 12); p(10 + inset, y, y % 3 === 0 ? '#4a2a14' : '#7a4c28', 64 - inset * 2, 1); }
    // proa e popa curvas com cabeça de dragão
    for (let i = 0; i < 14; i++) { p(72 + Math.round(i * 0.4), 36 - i, '#6a4020', 3, 1); p(10 - Math.round(i * 0.4), 36 - i, '#6a4020', 3, 1); }
    p(76, 20, '#6a4020', 6, 4); p(80, 21, '#e0d0a0', 2, 1); p(78, 19, '#c03020', 2, 1);
    p(4, 22, '#6a4020', 5, 3);
    // escudos na amurada
    for (let x = 16; x < 70; x += 6) { S_shield(p, x, 37, (x / 6) % 2 ? col : '#e8e0d0'); }
    function S_shield(pp, x, y, cc) { pp(x, y, cc, 5, 5); pp(x + 2, y + 2, '#c0a040', 1, 1); pp(x, y, shade(cc, 0.3), 5, 1); }
    // remos
    for (let x = 18; x < 68; x += 7) for (let k = 0; k < 6; k++) p(x - k, 43 + k, '#5a3a1a');
    // mastro e vela listrada
    p(41, 4, '#4a2c14', 2, 34);
    for (let y = 0; y < 22; y++) { const bulge = Math.round(Math.sin(y / 22 * Math.PI) * 3); for (let x = -15 - bulge; x < 15 + bulge; x++) p(42 + x, 7 + y, Math.floor((x + 15) / 6) % 2 ? shade(col, -y * 0.008) : shade('#f0e8d8', -y * 0.008), 1, 1); }
    p(26, 6, '#3a2a1a', 32, 1); p(26, 29, '#3a2a1a', 32, 1);
    for (let i = 0; i < 14; i++) { p(20 + i * 1.4, 36 - i * 2, '#2a1a10'); p(64 - i * 1.4, 36 - i * 2, '#2a1a10'); }
    return c;
  },
  drawIronclad(col, frame) {
    const W = 98, H = 66, c = Sprites.cv(W, H), p = Sprites.P(c.getContext('2d'));
    // casco de ferro rebitado
    for (let y = 36; y < 58; y++) { const t = (y - 36) / 22, inset = Math.round(t * t * 10); p(6 + inset, y, y < 40 ? '#6a6e78' : y > 50 ? '#8a2a20' : (y % 4 === 0 ? '#3e424a' : '#4e525c'), 86 - inset * 2 + (y < 46 ? 4 : 0), 1); }
    for (let x = 10; x < 88; x += 4) { p(x, 42, '#7a7e88'); p(x + 2, 47, '#7a7e88'); }   // rebites
    p(6, 36, '#8a8e98', 90, 1);
    // casamata blindada com canhões
    p(30, 24, '#4a4e58', 40, 12); p(30, 24, '#6a6e78', 40, 2); p(30, 35, '#2a2e36', 40, 1);
    for (let x = 34; x < 68; x += 8) { p(x, 29, '#1a1c22', 4, 3); p(x + 4, 30, '#2a2c32', 5, 1); }
    // torre giratória na proa
    S_turret(p);
    function S_turret(pp) { pp(72, 28, '#4a4e58', 12, 8); pp(72, 28, '#6a6e78', 12, 2); pp(84, 31, '#2a2c32', 10, 2); pp(70, 33, '#2a2e36', 16, 2); }
    // chaminés com faixa do reino
    for (const fx of [40, 54]) { p(fx, 4, '#22242a', 7, 20); p(fx, 4, '#3a3c44', 2, 20); p(fx, 9, col, 7, 3); p(fx - 1, 3, '#16181c', 9, 2); }
    // roda de pás
    const wx = 50, wy = 44;
    for (let a = 0; a < Math.PI; a += 0.08) p(wx + Math.cos(a) * 10, wy - Math.sin(a) * 10, '#3a3e46', 1, 1);
    p(wx - 10, wy - 1, '#3a3e46', 21, 2);
    for (let k = 0; k < 5; k++) { const a = (k / 5) * Math.PI + (frame ? 0.3 : 0); for (let r = 2; r < 10; r++) p(wx + Math.cos(a) * r, wy - Math.sin(a) * r, '#5a3a20'); }
    // mastro e bandeira
    p(24, 6, '#4a3a2a', 2, 30); p(24, 6, col, 10, 6); p(24, 6, shade(col, 0.3), 10, 1);
    for (let i = 0; i < 12; i++) p(12 + i * 1.1, 36 - i * 2.4, '#1a1a1a');
    // vigias
    for (let x = 14; x < 30; x += 5) { p(x, 39, '#1a1c22', 2, 2); p(x, 39, '#f0c060'); }
    return c;
  },
  rowboat(col) {
    if (this._row && this._row[col]) return this._row[col];
    this._row = this._row || {};
    const c = Sprites.cv(26, 16), p = Sprites.P(c.getContext('2d'));
    for (let y = 9; y < 14; y++) { const i = (y - 9); p(2 + i, y, y === 9 ? '#9a6a3a' : '#6a4424', 22 - i * 2, 1); }
    for (const x of [7, 12, 17]) { p(x, 4, col, 3, 5); p(x, 2, '#e0ac69', 3, 2); p(x, 1, '#2a2a2a', 3, 1); }
    p(3, 10, '#5a3a1a', 1, 5); p(22, 10, '#5a3a1a', 1, 5);
    Sprites.outline(c, '#120c10');
    this._row[col] = c;
    return c;
  },
  // desenha com a parte de baixo do casco submersa, espuma e balanço
  drawShip(ctx, img, x, y, opts = {}) {
    const flip = !!opts.flip, sink = opts.sink || 0, bob = Math.sin(Game.t * 1.4 + (opts.seed || 0)) * 1.5;
    const sub = Math.round(img.height * 0.12 + sink * img.height * 0.9);
    const visH = Math.max(1, img.height - sub);
    ctx.save();
    ctx.translate(Math.round(x), Math.round(y + bob));
    if (sink) ctx.rotate((flip ? -1 : 1) * sink * 0.5);
    if (flip) ctx.scale(-1, 1);
    ctx.drawImage(img, 0, 0, img.width, visH, -img.width / 2, -visH + sub * 0, img.width, visH);
    ctx.restore();
    // espuma e reflexo na linha d'água
    ctx.fillStyle = 'rgba(255,255,255,0.55)';
    const w = img.width * (0.7 - sink * 0.4);
    ctx.fillRect(Math.round(x - w / 2), Math.round(y + bob), Math.round(w), 1);
    ctx.fillStyle = 'rgba(20,40,70,0.25)'; ctx.fillRect(Math.round(x - w / 2 + 3), Math.round(y + bob + 1), Math.round(w - 6), 2);
    if (opts.moving) { ctx.fillStyle = 'rgba(255,255,255,0.4)'; for (let i = 1; i < 5; i++) ctx.fillRect(Math.round(x + (flip ? 1 : -1) * (w / 2 + i * 5)), Math.round(y + bob + (i % 2)), 4, 1); }
  },

  // ---------- Grade de navegação (mar) ----------
  grid() {
    const W = Game.world;
    if (this._grid && this._grid.seed === W.seed) return this._grid;
    if (!W.mapDone || !W.navWater) return null;
    const w = MAP_W, h = MAP_H, water = W.navWater, comp = new Int32Array(w * h).fill(-1), sizes = [];
    const q = new Int32Array(w * h);
    for (let i = 0; i < w * h; i++) {
      if (!water[i] || comp[i] >= 0) continue;
      const id = sizes.length; let head = 0, tail = 0; q[tail++] = i; comp[i] = id; let n = 0;
      while (head < tail) { const j = q[head++]; n++; const x = j % w, y = (j / w) | 0; for (const [ax, ay] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) { if (ax < 0 || ay < 0 || ax >= w || ay >= h) continue; const k = ay * w + ax; if (water[k] && comp[k] < 0) { comp[k] = id; q[tail++] = k; } } }
      sizes.push(n);
    }
    this._grid = { seed: W.seed, w, h, water, comp, sizes, par: new Int32Array(w * h), seen: new Uint8Array(w * h), q };
    return this._grid;
  },
  isOcean(i) { const G = this._grid; return G && G.water[i] && G.sizes[G.comp[i]] > 2500; },
  // célula de mar aberto mais perto da cidade
  seaOf(s) {
    const G = this.grid(); if (!G) return null;
    if (s._sea !== undefined && s._seaSeed === G.seed) return s._sea;
    const mx = Math.floor(s.mid.x / 16), my = Math.floor(s.mid.y / 16);
    let best = null, bd = Infinity;
    for (let dy = -9; dy <= 9; dy++) for (let dx = -9; dx <= 9; dx++) {
      const x = mx + dx, y = my + dy; if (x < 0 || y < 0 || x >= G.w || y >= G.h) continue;
      const i = y * G.w + x; if (!this.isOcean(i)) continue;
      const d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; }
    }
    s._sea = best; s._seaSeed = G.seed;
    return best;
  },
  path(a, b) {
    const G = this.grid(); if (!G || G.comp[a] !== G.comp[b]) return null;
    G.seen.fill(0); let head = 0, tail = 0; G.q[tail++] = a; G.seen[a] = 1;
    while (head < tail) {
      const j = G.q[head++]; if (j === b) break;
      const x = j % G.w, y = (j / G.w) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        if (!dx && !dy) continue; const ax = x + dx, ay = y + dy; if (ax < 0 || ay < 0 || ax >= G.w || ay >= G.h) continue;
        const k = ay * G.w + ax; if (G.seen[k] || !G.water[k]) continue;
        if (dx && dy && (!G.water[y * G.w + ax] || !G.water[ay * G.w + x])) continue;
        G.seen[k] = 1; G.par[k] = j; G.q[tail++] = k;
      }
    }
    if (!G.seen[b]) return null;
    const out = []; for (let j = b; j !== a; j = G.par[j]) out.push(j); out.push(a);
    return out.reverse();
  },
  cellPx(i) { return { x: (i % MAP_W) * 16 * 16 + 128, y: ((i / MAP_W) | 0) * 16 * 16 + 128 }; },
  // ponto de praia para o desembarque
  beachFor(i, s) {
    const W = Game.world, c = this.cellPx(i);
    let x = c.x / 16, y = c.y / 16;
    const d = dist(x, y, s.mid.x, s.mid.y) || 1, sx = (s.mid.x - x) / d, sy = (s.mid.y - y) / d;
    for (let k = 0; k < 140; k++) { const tx = Math.round(x), ty = Math.round(y); if (W.isLand(tx, ty) && W.isLand(tx + 1, ty)) return { x: tx, y: ty }; x += sx; y += sy; }
    return { x: Math.round(s.mid.x), y: Math.round(s.mid.y) };
  },
  st() { const S = War.st(); S.fleets = S.fleets || []; S.navals = S.navals || []; return S; },
  fleet(id) { return this.st().fleets.find(f => f.id === id); },
  fpos(f) { const i = f.path[Math.min(f.path.length - 1, Math.floor(f.pi))]; return this.cellPx(i); },

  // ---------- Estratégia (diária e por hora) ----------
  daily() {
    const S = this.st(), W = Game.world, rng = new RNG(W.seed + Game.day * 613);
    if (!this.grid()) return;
    S.fleets = S.fleets.filter(f => War.atWar(f.k, f.foe) || f.state === 'return');
    for (const w of S.wars) for (const [k, foe] of [[w.a, w.b], [w.b, w.a]]) {
      if (S.fleets.some(f => f.k === k && f.foe === foe && f.state !== 'return') || !rng.chance(0.4)) continue;
      const homes = W.settlements.filter(s => War.ownerOf(s) === k && this.seaOf(s) !== null);
      const targets = W.settlements.filter(s => War.ownerOf(s) === foe && this.seaOf(s) !== null && s.type !== 'capital');
      if (!homes.length || !targets.length) continue;
      let best = null, bd = Infinity;
      for (const h of homes) for (const t of targets) { const G = this._grid; if (G.comp[this.seaOf(h)] !== G.comp[this.seaOf(t)]) continue; const d = dist(h.x, h.y, t.x, t.y); if (d > 150 && d < bd) { bd = d; best = [h, t]; } }
      if (!best) continue;
      const path = this.path(this.seaOf(best[0]), this.seaOf(best[1]));
      if (!path || path.length < 4) continue;
      const type = this.shipTypeOf(k), T = SHIP_TYPES[type], n = rng.int(3, 5);
      const ships = []; for (let i = 0; i < n; i++) ships.push({ type, hp: T.hp, max: T.hp });
      const f = { id: S.id++, k, foe, ships, troops: rng.int(30, 50), path, pi: 0, state: 'sail', home: best[0].id, target: best[1].id };
      S.fleets.push(f);
      War.news(`⚓ Uma frota de ${War.K[k].short} (${n} ${T.name.toLowerCase()}s) zarpou de ${best[0].name} rumo a ${best[1].name}!`, false, [k, foe]);
    }
  },
  hour() {
    const S = this.st(), rng = new RNG(Game.world.seed + Game.day * 977 + Math.floor(Game.time));
    for (const f of S.fleets.slice()) {
      if (f.state === 'land' && !f.vis) { if (!f.landed) { this.landTroops(f); f.landed = true; } f.state = 'return'; f.path = f.path.slice().reverse(); f.pi = 0; continue; }
      if (f.state === 'battle' || f.state === 'land' || f.vis) continue;
      f.pi += SHIP_TYPES[f.ships[0] ? f.ships[0].type : 'galeao'].spd / 10;
      if (f.pi >= f.path.length - 1) { f.pi = f.path.length - 1; this.arrive(f, false); }
    }
    // encontros no mar
    for (const a of S.fleets) for (const b of S.fleets) {
      if (a.id >= b.id || a.k !== b.foe || b.k !== a.foe || a.state === 'battle' || b.state === 'battle' || a.state === 'land' || b.state === 'land') continue;
      const pa = this.fpos(a), pb = this.fpos(b);
      if (dist(pa.x, pa.y, pb.x, pb.y) < 16 * 70) this.startBattle(a, b);
    }
    for (const nb of S.navals.slice()) {
      if (nb.live) continue;
      const A = this.fleet(nb.a), B = this.fleet(nb.b);
      if (!A || !B) { S.navals = S.navals.filter(x => x !== nb); continue; }
      nb.h++;
      const pow = f => f.ships.reduce((t, s) => t + (s.hp > 0 ? SHIP_TYPES[s.type].dmg * SHIP_TYPES[s.type].guns : 0), 0);
      const hit = (f, dmg) => { for (let i = 0; i < 4 && dmg > 0; i++) { const s = rng.pick(f.ships.filter(x => x.hp > 0)); if (!s) break; const d = Math.min(s.hp, dmg * rng.range(0.3, 0.7)); s.hp -= d; dmg -= d; } f.ships = f.ships.filter(x => x.hp > 0); };
      const pa = pow(A), pb = pow(B);
      hit(A, pb * rng.range(2, 4)); hit(B, pa * rng.range(2, 4));
      if (!A.ships.length || !B.ships.length || nb.h >= 4) this.endBattle(nb, !A.ships.length ? 'a' : !B.ships.length ? 'b' : (pow(A) < pow(B) ? 'a' : 'b'));
    }
  },
  startBattle(a, b) {
    const S = this.st();
    a.state = b.state = 'battle';
    const pa = this.fpos(a), pb = this.fpos(b);
    const nb = { id: S.id++, a: a.id, b: b.id, x: (pa.x + pb.x) / 2, y: (pa.y + pb.y) / 2, h: 0, live: false, sunk: 0 };
    S.navals.push(nb);
    nb.name = 'Batalha naval ' + War.nearName(nb.x / 16, nb.y / 16);
    War.news(`💥 As frotas de ${War.K[a.k].short} e ${War.K[b.k].short} se enfrentam no mar ${War.nearName(nb.x / 16, nb.y / 16)}!`, false, [a.k, b.k]);
  },
  endBattle(nb, loser) {
    const S = this.st();
    S.navals = S.navals.filter(x => x !== nb);
    const A = this.fleet(nb.a), B = this.fleet(nb.b);
    const L = loser === 'a' ? A : B, Wn = loser === 'a' ? B : A;
    if (Wn) Wn.state = 'sail';
    if (L) { if (!L.ships.length) { S.fleets = S.fleets.filter(x => x !== L); } else { L.state = 'return'; L.path = L.path.slice(0, Math.floor(L.pi) + 1).reverse(); L.pi = 0; } }
    if (Wn && L) War.news(`⚓ ${nb.name}: a frota de ${War.K[Wn.k].short} venceu a de ${War.K[L.k].short}${L.ships.length ? ', que fugiu de volta ao porto' : ' e afundou todos os seus navios'}.`, !!nb.live, [Wn.k, L.k]);
    for (const v of this.vis) if (v.f === L && !L.ships.length) v.f = null;
  },
  arrive(f, live) {
    const S = this.st(), s = War.settlement(f.target);
    if (f.state === 'return') { S.fleets = S.fleets.filter(x => x !== f); this.dropVis(f); return; }
    if (!s || War.ownerOf(s) !== f.foe) { f.state = 'return'; f.path = f.path.slice().reverse(); f.pi = 0; return; }
    const beach = this.beachFor(f.path[f.path.length - 1], s);
    f.state = 'land'; f.beach = beach; f.landT = 0;
    if (!live) this.landTroops(f);
  },
  landTroops(f) {
    const S = War.st(), s = War.settlement(f.target);
    if (s && f.troops > 0 && War.atWar(f.k, f.foe)) {
      const a = { id: S.id++, k: f.k, foe: f.foe, x: f.beach.x, y: f.beach.y, n: f.troops, n0: f.troops, state: 'march', target: s.id, siegeT: 0, from: f.home, landed: true };
      S.armies.push(a);
      War.news(`🚣 Desembarque! Tropas de ${War.K[f.k].short} desembarcaram na praia perto de ${s.name}!`, true, [f.k, f.foe]);
      f.troops = 0;
      return a;
    }
    return null;
  },

  // ---------- Ao vivo (perto do jogador) ----------
  update(dt) {
    if (!Game.world || !Game.mods || !Game.level.isWorld) { if (this.vis.length) { this.vis = []; this.balls = []; this.boats = []; } return; }
    const S = this.st(), P = Game.player;
    for (const f of S.fleets) if (f.vis && !this.vis.some(v => v.f === f)) f.vis = false;
    for (const f of S.fleets) {
      const fp = this.fpos(f), d = dist(fp.x, fp.y, P.x, P.y);
      if (!f.vis && d < 16 * 70) this.spawnVis(f);
      else if (f.vis && d > 16 * 110) this.dropVis(f);
    }
    for (const nb of S.navals) {
      const A = this.fleet(nb.a), B = this.fleet(nb.b);
      nb.live = !!(A && B && A.vis && B.vis);
    }
    // navios visíveis
    for (const v of this.vis) {
      v.anim += dt;
      if (v.sink) { v.sink = Math.min(1, v.sink + dt * 0.22); if (Math.random() < 0.5) Game.particle(v.x + (Math.random() - 0.5) * 30, v.y - 20 - Math.random() * 20, (Math.random() - 0.5) * 10, -20, Math.random() < 0.5 ? 'rgba(60,60,60,0.7)' : '#ff8020', 1, 2); continue; }
      const f = v.f; if (!f) continue;
      if (f.state === 'battle') this.fight(v, f, dt);
      else if (f.state === 'sail' || f.state === 'return') this.sail(v, f, dt);
      else if (f.state === 'land') this.anchor(v, f, dt);
      if (v.type === 'encouracado' && Math.random() < dt * 6) { const fx = v.x + (v.flip ? 1 : -1) * 2; for (const ox of [-6, 8]) Game.particles.push({ x: fx + (v.flip ? -ox : ox), y: v.y - 58, vx: (v.flip ? 8 : -8), vy: -12 - Math.random() * 6, color: Math.random() < 0.5 ? 'rgba(50,50,56,0.75)' : 'rgba(90,90,96,0.6)', life: 2.4, max: 2.4, size: 2, grav: 0 }); }
    }
    this.vis = this.vis.filter(v => !(v.sink >= 1));
    // desembarques ao vivo
    for (const f of S.fleets) if (f.vis && f.state === 'land') this.liveLanding(f, dt);
    this.updateBalls(dt);
    for (const b of this.boats) { b.t += dt / b.dur; b.x = lerp(b.x0, b.x1, Math.min(1, b.t)); b.y = lerp(b.y0, b.y1, Math.min(1, b.t)); if (b.t >= 1 && !b.done) { b.done = true; if (b.onArrive) b.onArrive(); } }
    this.boats = this.boats.filter(b => b.t < 1.6);
  },
  spawnVis(f) {
    f.vis = true;
    const fp = this.fpos(f), col = War.K[f.k].color;
    f.ships.forEach((s, i) => {
      const v = { f, s, type: s.type, col, x: fp.x - i * 70, y: fp.y + (i % 2 ? 26 : -26), flip: false, cd: 2 + Math.random() * 2, anim: 0, seed: i * 1.7, slot: i, sink: 0 };
      if (!this.water(v.x, v.y)) { v.x = fp.x; v.y = fp.y; }
      this.vis.push(v);
    });
  },
  dropVis(f) { f.vis = false; this.vis = this.vis.filter(v => v.f !== f || v.sink); },
  water(x, y) { const t = Game.world.tileAt(Math.floor(x / 16), Math.floor(y / 16)); return TWATER[t] || t === T.DEEP; },
  moveShip(v, tx, ty, spd, dt) {
    const d = dist(v.x, v.y, tx, ty); if (d < 2) return false;
    const nx = v.x + (tx - v.x) / d * spd * dt, ny = v.y + (ty - v.y) / d * spd * dt;
    if (this.water(nx, ny) && this.water(nx + 30, ny) && this.water(nx - 30, ny)) { v.x = nx; v.y = ny; }
    else if (this.water(nx, v.y)) v.x = nx; else if (this.water(v.x, ny)) v.y = ny;
    if (Math.abs(tx - v.x) > 1) v.flip = tx < v.x;
    v.moving = true;
    return true;
  },
  sail(v, f, dt) {
    const spd = SHIP_TYPES[v.type].spd * 0.9;
    v.moving = false;
    if (v.slot === 0 || !this.vis.some(o => o.f === f && o.slot === 0 && !o.sink)) {
      const i = Math.min(f.path.length - 1, Math.floor(f.pi) + 1), c = this.cellPx(f.path[i]);
      const ox = v.x, oy = v.y, moved = this.moveShip(v, c.x, c.y, spd, dt);
      v.stuck = (Math.abs(v.x - ox) + Math.abs(v.y - oy) < 0.01) ? (v.stuck || 0) + dt : 0;
      if (!moved || v.stuck > 1.5 || dist(v.x, v.y, c.x, c.y) < 24) { v.stuck = 0; f.pi = Math.min(f.path.length - 1, Math.floor(f.pi) + 1); if (f.pi >= f.path.length - 1) this.arrive(f, true); }
      v.lead = true;
    } else {
      const L = this.vis.find(o => o.f === f && o.slot === 0 && !o.sink) || this.vis.find(o => o.f === f && o.lead);
      if (!L) return;
      const back = L.flip ? 1 : -1;
      const tx = L.x + back * 75 * v.slot, ty = L.y + (v.slot % 2 ? 22 : -22);
      if (dist(v.x, v.y, tx, ty) > 10) this.moveShip(v, this.water(tx, ty) ? tx : L.x, this.water(tx, ty) ? ty : L.y, spd * 1.15, dt);
    }
  },
  anchor(v, f, dt) {
    v.moving = false;
    void f; void dt;
  },
  fight(v, f, dt) {
    v.moving = false;
    let best = null, bd = Infinity;
    for (const o of this.vis) { if (o.sink || !o.f || o.f.k !== f.foe || o.f.foe !== f.k) continue; const d = dist(v.x, v.y, o.x, o.y); if (d < bd) { bd = d; best = o; } }
    if (!best) return;
    // manobra de bordada: mantém distância de tiro
    const want = 170;
    const ang = angleTo(best.x, best.y, v.x, v.y) + 0.6;
    const tx = best.x + Math.cos(ang) * want, ty = best.y + Math.sin(ang) * want * 0.6;
    if (dist(v.x, v.y, tx, ty) > 20) this.moveShip(v, tx, ty, SHIP_TYPES[v.type].spd * (bd > 380 ? 2.4 : 0.8), dt);
    v.flip = best.x < v.x;
    v.cd -= dt;
    if (v.cd <= 0 && bd < 320) {
      const T = SHIP_TYPES[v.type];
      v.cd = 3.2 + Math.random() * 1.6;
      for (let g = 0; g < T.guns; g++) {
        const ex = best.x + (Math.random() - 0.5) * 50, ey = best.y - 8 + (Math.random() - 0.5) * 22;
        const sx = v.x + (Math.random() - 0.5) * 30, sy = v.y - 10;
        Game.later(g * 0.25, () => {
          this.balls.push({ x0: sx, y0: sy, x1: ex, y1: ey, t: 0, dur: 0.6 + bd / 500, dmg: T.dmg, foe: f.foe, by: f.k });
          for (let i = 0; i < 7; i++) Game.particles.push({ x: sx, y: sy, vx: (best.x > v.x ? 1 : -1) * (20 + Math.random() * 30), vy: -6 - Math.random() * 10, color: Math.random() < 0.3 ? '#ffb040' : 'rgba(220,220,225,0.7)', life: 1.2, max: 1.2, size: 2, grav: 0 });
          if (dist(sx, sy, Game.player.x, Game.player.y) < 500) Sfx.play('boom');
        });
      }
    }
  },
  updateBalls(dt) {
    for (const b of this.balls) {
      b.t += dt / b.dur;
      if (b.t >= 1 && !b.done) {
        b.done = true;
        const hit = this.vis.find(o => !o.sink && o.f && o.f.k === b.foe && Math.abs(o.x - b.x1) < 34 && Math.abs(o.y - 10 - b.y1) < 20);
        if (hit) {
          hit.s.hp -= b.dmg * (0.8 + Math.random() * 0.4);
          Game.burst(b.x1, b.y1, '#ff9030', 10, 60); Game.burst(b.x1, b.y1, '#6a4a2a', 6, 50);
          if (hit.s.hp <= 0 && !hit.sink) this.sinkShip(hit);
        } else for (let i = 0; i < 10; i++) Game.particle(b.x1, b.y1, (Math.random() - 0.5) * 30, -40 - Math.random() * 50, Math.random() < 0.5 ? '#ffffff' : '#a0d0f0', 0.6, 1, 140);
      }
    }
    this.balls = this.balls.filter(b => b.t < 1.05);
  },
  sinkShip(v) {
    v.sink = 0.01;
    const f = v.f;
    if (f) {
      f.ships = f.ships.filter(s => s !== v.s);
      const nb = this.st().navals.find(n => n.a === f.id || n.b === f.id);
      if (nb) nb.sunk++;
      if (!f.ships.length && nb) this.endBattle(nb, nb.a === f.id ? 'a' : 'b');
      else if (!f.ships.length) { this.st().fleets = this.st().fleets.filter(x => x !== f); }
    }
    const kn = f && War.K[f.k] ? War.K[f.k].short : 'um reino';
    if (dist(v.x, v.y, Game.player.x, Game.player.y) < 700) Game.toast(`🔥 Um ${SHIP_TYPES[v.type].name.toLowerCase()} de ${kn} está afundando!`, '#ffb080');
  },
  liveLanding(f, dt) {
    f.landT += dt;
    if (f.landed) return;
    const ships = this.vis.filter(v => v.f === f && !v.sink);
    if (!ships.length) { this.landTroops(f); f.landed = true; return; }
    const trips = clamp(Math.ceil(f.troops / 12), 2, 5);
    f.boatsSent = f.boatsSent || 0;
    if (f.boatsSent < trips && f.landT > f.boatsSent * 1.6) {
      const sh = ships[f.boatsSent % ships.length], bx = f.beach.x * 16 + 8, by = f.beach.y * 16 + 8;
      const k = f.boatsSent;
      this.boats.push({ x0: sh.x, y0: sh.y + 6, x1: bx + (k - trips / 2) * 22, y1: by + 4, x: sh.x, y: sh.y, t: 0, dur: 4.5, col: War.K[f.k].color, onArrive: () => {
        if (k === trips - 1) {
          const a = this.landTroops(f);
          if (a && dist(bx, by, Game.player.x, Game.player.y) < 16 * 45) War.spawnSquad(a);
          f.landed = true; f.state = 'return'; f.path = f.path.slice().reverse(); f.pi = 0;
        } else Game.burst(bx, by, '#a0d0f0', 8, 40);
      } });
      f.boatsSent++;
      if (f.boatsSent === 1) Game.toast(`🚣 Botes de ${War.K[f.k].short} estão desembarcando tropas na praia!`, '#ffd080');
    }
  },
  drawables(D, camX, camY, vw, vh) {
    const inView = (x, y, m = 120) => x > camX - m && y > camY - m && x < camX + vw + m && y < camY + vh + m;
    for (const v of this.vis) {
      if (!inView(v.x, v.y)) continue;
      const img = this.sprite(v.type, v.col, v.type === 'encouracado' ? Math.floor(v.anim * 4) % 2 : 0);
      D.push({ y: v.y, fn: (ctx) => this.drawShip(ctx, img, v.x - camX, v.y - camY, { flip: v.flip, sink: v.sink, seed: v.seed, moving: v.moving }) });
    }
    for (const b of this.boats) { if (!inView(b.x, b.y)) continue; const img = this.rowboat(b.col); D.push({ y: b.y, fn: (ctx) => { ctx.drawImage(img, Math.round(b.x - 13 - camX), Math.round(b.y - 12 - camY + Math.sin(Game.t * 3) * 1)); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(Math.round(b.x - 10 - camX), Math.round(b.y + 3 - camY), 20, 1); } }); }
    for (const b of this.balls) {
      const x = lerp(b.x0, b.x1, b.t), y = lerp(b.y0, b.y1, b.t), z = Math.sin(Math.PI * b.t) * 40;
      if (!inView(x, y)) continue;
      D.push({ y: y + 200, fn: (ctx) => { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(x - camX) - 1, Math.round(y - camY), 3, 1); ctx.fillStyle = '#1a1a1e'; ctx.fillRect(Math.round(x - camX) - 1, Math.round(y - z - camY) - 1, 3, 3); ctx.fillStyle = '#6a6a70'; ctx.fillRect(Math.round(x - camX) - 1, Math.round(y - z - camY) - 1, 1, 1); } });
    }
  },
  drawMap(ctx, toS) {
    const S = this.st();
    ctx.font = '14px VT323, monospace';
    for (const f of S.fleets) { const p = this.fpos(f), [x, y] = toS(p.x / 16, p.y / 16); ctx.fillStyle = '#000'; ctx.fillText('⛵', x + 1, y + 6); ctx.fillStyle = War.K[f.k].color; ctx.fillText('⛵', x, y + 5); }
    for (const nb of S.navals) { const [x, y] = toS(nb.x / 16, nb.y / 16); ctx.fillStyle = '#ff6040'; ctx.fillText('💥', x, y + 5); }
  }
};
