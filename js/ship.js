'use strict';
// ===================== VIAGEM DE NAVIO EM TEMPO REAL =====================
// O navio é um nível explorável (convés e porão) que navega de verdade pelo mapa:
// o mundo é desenhado por baixo e vai passando enquanto o jogador anda a bordo.
const SHIP_L = 36, SHIP_B = 11, SHIP_PAD = 40, SHIP_C = 5;
const SAILOR_LINES = [
  'Mar calmo hoje. Que Talassa nos guarde!',
  'Já viu uma serpente marinha? Eu já... ou foi o rum.',
  'Cuidado com o convés molhado, marujo!',
  'Lá no porão tem cabines para os passageiros. A sua é a da esquerda.',
  'Se o capitão perguntar, eu estava esfregando o convés.',
  'Ventos favoráveis! Chegaremos antes do previsto.',
  'Dizem que os navios de ferro de Valtheria não precisam de vento. Bruxaria!',
  'Ouvi golfinhos ontem à noite. Bom presságio.',
  'Puxe aquela corda... não, a outra!',
  'Quando eu era grumete, a viagem levava semanas.'
];

class ShipLevel {
  constructor(from, to, route, iron, col, cap) {
    this.isWorld = false; this.isInterior = false; this.isShip = true; this.dark = false;
    this.from = from; this.to = to; this.s = from; this.regIndex = from.region.index;
    this.iron = iron; this.col = col; this.cap = cap;
    this.name = iron ? 'Encouraçado a vapor' : 'Galeão';
    this.route = route; this.ri = 1;
    this.x = route[0].x; this.y = route[0].y; this.spd = 0; this.ang = 0;
    this.total = 0; for (let i = 1; i < route.length; i++) this.total += dist(route[i - 1].x, route[i - 1].y, route[i].x, route[i].y);
    this.done = 0; this.docked = false; this.landT = 0; this.trail = []; this.trailT = 0; this.fauna = []; this.gulls = [];
    const a = route[0], b = route[Math.min(route.length - 1, 12)];
    this.setOri(ShipLevel.oriOf(Math.atan2(b.y - a.y, b.x - a.x)));
    this.floor = 0; this.turnT = 0;
    this.crew = [[], []];
    this.spots = [];
  }
  static oriOf(ang) { const d = Math.round(ang / (Math.PI / 2)); return ['e', 's', 'w', 'n', 'e'][(d % 4 + 4) % 4]; }
  static oriAng(o) { return { e: 0, s: Math.PI / 2, w: Math.PI, n: -Math.PI / 2 }[o]; }
  setOri(o) {
    this.ori = o;
    const horiz = o === 'e' || o === 'w';
    this.w = horiz ? SHIP_L : SHIP_B; this.h = horiz ? SHIP_B : SHIP_L;
    this.floors = [this.build(0), this.build(1)];
  }
  // posição em pixels no nível <-> posição no casco (u ao longo do navio, v de través)
  toFrame(x, y) { const L = SHIP_L * 16; switch (this.ori) { case 'e': return [x, y]; case 'w': return [L - x, y]; case 's': return [y, x]; default: return [L - y, x]; } }
  fromFrame(u, v) { const L = SHIP_L * 16; switch (this.ori) { case 'e': return [u, v]; case 'w': return [L - u, v]; case 's': return [v, u]; default: return [v, L - u]; } }
  // o navio vira de verdade quando a rota muda de direção
  turn(o) {
    const G = Game, P = G.player, ox = P.x, oy = P.y;
    const movers = [P].concat(G.actors, this.crew[0], this.crew[1]).filter((a, i, A) => A.indexOf(a) === i);
    const fr = movers.map(a => [this.toFrame(a.x, a.y), a.home ? this.toFrame(a.home.x, a.home.y) : null]);
    const oldOri = this.ori;
    this.setOri(o);
    movers.forEach((a, i) => { const [p, h] = fr[i]; [a.x, a.y] = this.fromFrame(p[0], p[1]); if (h) { const q = this.fromFrame(h[0], h[1]); a.home = { x: q[0], y: q[1] }; } a.wp = null; });
    for (const a of movers) if (this.solidAt(Math.floor(a.x / 16), Math.floor(a.y / 16))) G.findFree(a);
    G.camX += P.x - ox; G.camY += P.y - oy; G.particles = []; G.flow = null; this.gulls = [];
    const names = { e: 'leste', w: 'oeste', n: 'norte', s: 'sul' };
    if (oldOri !== o) G.toast(`${this.cap.name}: Virar o leme! Rumo ${names[o]}!`, '#c0e0ff');
    Sfx.play('creak');
  }
  // coordenadas do casco (u: da popa à proa, v: de bombordo a estibordo) -> tile do nível
  T(u, v) {
    switch (this.ori) {
      case 'e': return { x: u, y: v };
      case 'w': return { x: SHIP_L - 1 - u, y: v };
      case 's': return { x: v, y: u };
      default: return { x: v, y: SHIP_L - 1 - u };
    }
  }
  static hw(u) {                                   // meia-largura do casco (em tiles)
    const Lb = SHIP_L - 11;
    if (u < 0 || u > SHIP_L + 1) return 0;
    if (u <= Lb) return 5.5;
    const t = (u - Lb) / (SHIP_L + 1 - Lb);
    return t >= 1 ? 0 : 5.5 * Math.sqrt(1 - t * t);
  }
  build(f) {
    const W = this.w, tiles = new Uint8Array(this.w * this.h).fill(T.DEEP), objs = new Uint8Array(this.w * this.h);
    const inside = (u, v) => u >= 0 && u < SHIP_L && v >= 0 && v < SHIP_B && Math.abs(v - SHIP_C) + 0.5 <= ShipLevel.hw(u + 0.5);
    const F = { tiles, objs, canvas: null, hatches: [], walls: [] };
    for (let u = 0; u < SHIP_L; u++) for (let v = 0; v < SHIP_B; v++) {
      if (!inside(u, v)) continue;
      const p = this.T(u, v), edge = u === 0 || !inside(u - 1, v) || !inside(u + 1, v) || !inside(u, v - 1) || !inside(u, v + 1);
      tiles[p.y * W + p.x] = edge ? T.HWALL : T.HFLOOR;
    }
    const put = (u, v, o) => { const p = this.T(u, v), i = p.y * W + p.x; if (tiles[i] === T.HFLOOR && !objs[i]) { objs[i] = o; return true; } return false; };
    const wall = (u, v) => { const p = this.T(u, v), i = p.y * W + p.x; if (tiles[i] === T.HFLOOR) { tiles[i] = T.HWALL; F.walls.push([u, v]); } };
    const C = SHIP_C;
    this.hatchU = [12, 23];
    for (const u of this.hatchU) { put(u, C, O.HATCH); F.hatches.push([u, C]); }
    const r = new RNG(hashStr(this.from.name + this.to.name));
    if (f === 0) {
      // convés: tombadilho com o timão, mastros, canhões, botes, cordas e carga
      put(2, C, O.HELM); put(4, C - 3, O.MAPTABLE); put(1, C - 4, O.LANTERN); put(1, C + 4, O.LANTERN);
      this.mastU = [9, 18, 27];
      for (const u of this.mastU) put(u, C, O.MAST);
      if (this.iron) put(14, C, O.BOILER);
      for (const u of [7, 10, 13, 16, 19, 22, 25, 28]) { put(u, 1, O.CANNON); put(u, SHIP_B - 2, O.CANNON); }
      put(15, C + 2, O.ROPE); put(21, C - 2, O.ROPE); put(31, C, O.ROPE);
      put(20, C + 2, O.LIFEBOAT); put(20, C - 2, O.LIFEBOAT);
      put(6, C + 3, O.BARREL); put(6, C - 2, O.BARREL); put(30, C - 2, O.CRATE); put(30, C + 2, O.CRATE); put(32, C + 1, O.BARREL);
      put(17, C - 3, O.LANTERN); put(29, C + 3, O.LANTERN);
      this.entry = this.T(6, C);
      this.deckSpots = [[5, C], [11, C - 2], [16, C + 3], [24, C - 3], [26, C + 2], [30, C], [14, C - 3]];
    } else {
      // porão: anteparas com portas
      for (const wu of [8, 17, 27]) for (let v = 0; v < SHIP_B; v++) if (v !== C) wall(wu, v);
      // cabine do capitão
      put(2, C - 3, O.SHIPBED); put(1, C + 3, O.BOOKSHELF); put(4, C, O.TABLE); put(3, C, O.CHAIR); put(5, C, O.CHAIR); put(6, C - 3, O.MAPTABLE); put(6, C + 3, O.CHEST_DECO || O.CRATE); put(1, C, O.LANTERN); put(4, C + 3, O.RUG);
      // cabines de passageiros (corredor no meio)
      for (let u = 9; u <= 16; u++) { if (u !== 11 && u !== 15) { wall(u, C - 1); wall(u, C + 1); } }
      for (const v of [1, 2, 3, 7, 8, 9]) wall(13, v);
      for (const [u, v] of [[9, 1], [14, 1], [9, SHIP_B - 2], [14, SHIP_B - 2]]) put(u, v, O.SHIPBED);
      for (const [u, v] of [[12, 1], [16, 1], [12, SHIP_B - 2], [16, SHIP_B - 2]]) put(u, v, r.pick([O.CRATE, O.LANTERN, O.BARREL]));
      put(10, 3, O.CANDLE); put(10, SHIP_B - 4, O.CANDLE);
      // alojamento dos marinheiros
      for (const u of [19, 21, 25]) { put(u, 2, O.HAMMOCK); put(u, SHIP_B - 3, O.HAMMOCK); }
      put(19, C, O.TABLE); put(20, C, O.CHAIR); put(26, C - 3, O.KEG); put(26, C + 3, O.BARREL); put(22, 1, O.LANTERN); put(22, SHIP_B - 2, O.LANTERN);
      // cozinha
      put(28, C - 3, O.STOVE); put(29, C - 3, O.SHELF); put(30, C, O.TABLE); put(29, C, O.CHAIR); put(28, C + 3, O.KEG); put(31, C + 2, O.BARREL); put(32, C - 2, O.LANTERN);
      // carga
      for (const [u, v] of [[33, C - 2], [33, C - 1], [34, C + 1], [34, C + 2], [33, C + 2], [35, C - 1], [34, C - 2]]) put(u, v, r.pick([O.CRATE, O.BARREL, O.CRATE]));
      this.lowSpots = [[4, C + 2, 'captain_cabin'], [22, C, 'crew'], [24, C + 1, 'crew'], [30, C + 2, 'cook']];
    }
    return F;
  }
  get tiles() { return this.floors[this.floor].tiles; }
  get objs() { return this.floors[this.floor].objs; }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : T.DEEP; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx, old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.floors[this.floor].canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  progress() { return clamp(this.done / Math.max(1, this.total), 0, 1); }
  remaining() { return Math.max(0, this.total - this.done); }

  // ---------- Desenho do casco ----------
  renderFloor(f) {
    const F = this.floors[f], FL = SHIP_L * 16, FB = SHIP_B * 16, P = SHIP_PAD;
    const fc = Sprites.cv(FL + P * 2, FB + P * 2), c = fc.getContext('2d');
    const cy = P + FB / 2;
    const poly = (inset, ox = 0, oy = 0) => {
      c.beginPath();
      const N = (FL + 16) / 2;
      for (let i = 0; i <= N; i++) { const u = i * 2, h = Math.max(0, ShipLevel.hw(u / 16) * 16 - inset); c.lineTo(P + u + ox + (u === 0 ? inset * 0.6 : 0), cy - h + oy); }
      for (let i = N; i >= 0; i--) { const u = i * 2, h = Math.max(0, ShipLevel.hw(u / 16) * 16 - inset); c.lineTo(P + u + ox + (u === 0 ? inset * 0.6 : 0), cy + h + oy); }
      c.closePath();
    };
    const hull = this.iron ? '#3e434c' : '#5a3418', hullD = this.iron ? '#2a2d34' : '#3a2010', rail = this.iron ? '#646a74' : '#7a4a24';
    // sombra, espuma da linha d'água e casco
    poly(0, 4, 6); c.fillStyle = 'rgba(0,15,35,0.35)'; c.fill();
    poly(-2); c.fillStyle = 'rgba(235,245,255,0.45)'; c.fill();
    poly(0); c.fillStyle = hull; c.fill();
    poly(3); c.fillStyle = this.col; c.fill();
    poly(5); c.fillStyle = f ? hullD : rail; c.fill();
    const inner = f ? 9 : 8;
    // gurupés
    c.fillStyle = '#4a2c14'; c.fillRect(P + FL - 10, cy - 2, 46, 4); c.fillStyle = '#6a4422'; c.fillRect(P + FL - 10, cy - 2, 46, 1);
    // tábuas do piso
    c.save(); poly(inner); c.clip();
    c.fillStyle = f ? '#7a5232' : '#a8784a'; c.fillRect(P - 4, P - 4, FL + 8, FB + 8);
    const rr = new RNG(77 + f);
    for (let y = P; y < P + FB; y += 4) {
      c.fillStyle = (y / 4) % 2 ? (f ? 'rgba(0,0,0,0.10)' : 'rgba(80,40,10,0.10)') : 'rgba(255,230,180,0.05)'; c.fillRect(P, y, FL, 4);
      c.fillStyle = f ? 'rgba(30,15,5,0.45)' : 'rgba(60,30,10,0.35)'; c.fillRect(P, y + 3, FL, 1);
      for (let x = P + rr.int(0, 30); x < P + FL; x += rr.int(26, 64)) { c.fillRect(x, y, 1, 3); c.fillStyle = 'rgba(40,20,5,0.6)'; c.fillRect(x + 2, y + 1, 1, 1); c.fillStyle = f ? 'rgba(30,15,5,0.45)' : 'rgba(60,30,10,0.35)'; }
    }
    if (!f) {
      // tombadilho (popa) e castelo de proa elevados
      c.fillStyle = 'rgba(255,240,200,0.07)'; c.fillRect(P, P, 7 * 16, FB); c.fillRect(P + 30 * 16, P, 8 * 16, FB);
      c.fillStyle = 'rgba(40,20,5,0.55)'; c.fillRect(P + 7 * 16, P, 2, FB); c.fillRect(P + 30 * 16 - 2, P, 2, FB);
      c.fillStyle = 'rgba(255,230,180,0.25)'; c.fillRect(P + 7 * 16 - 1, P, 1, FB); c.fillRect(P + 30 * 16, P, 1, FB);
    } else {
      // vigas do teto vistas por baixo (faixas escuras) e manchas de umidade
      for (let u = 2; u < SHIP_L; u += 3) { c.fillStyle = 'rgba(20,10,5,0.18)'; c.fillRect(P + u * 16, P, 5, FB); }
      for (let i = 0; i < 14; i++) { c.fillStyle = 'rgba(20,30,20,0.12)'; c.beginPath(); c.ellipse(P + rr.int(20, FL - 40), P + rr.int(20, FB - 20), rr.int(4, 12), rr.int(2, 6), 0, 0, Math.PI * 2); c.fill(); }
    }
    c.restore();
    // amurada: balaústres / vigias (escotilhas redondas) no porão
    for (let u = 8; u < FL - 16; u += f ? 48 : 16) {
      const h = ShipLevel.hw(u / 16) * 16;
      for (const s of [-1, 1]) {
        const y = cy + s * (h - (f ? 4.5 : 6.5));
        if (f) { c.fillStyle = '#c8a040'; c.beginPath(); c.arc(P + u + 8, y, 3, 0, Math.PI * 2); c.fill(); c.fillStyle = '#9ad0f0'; c.beginPath(); c.arc(P + u + 8, y, 1.8, 0, Math.PI * 2); c.fill(); }
        else { c.fillStyle = hullD; c.fillRect(P + u, y - 1, 2, 2); }
      }
    }
    if (this.iron) { c.fillStyle = 'rgba(200,205,215,0.7)'; for (let u = 4; u < FL; u += 6) { const h = ShipLevel.hw(u / 16) * 16 - 1.5; c.fillRect(P + u, cy - h, 1, 1); c.fillRect(P + u, cy + h - 1, 1, 1); } }
    // passa para a orientação do nível
    const lc = Sprites.cv(this.w * 16 + P * 2, this.h * 16 + P * 2), l = lc.getContext('2d'), FW = FL + P * 2;
    const M = { e: [1, 0, 0, 1, 0, 0], w: [-1, 0, 0, 1, FW, 0], s: [0, 1, 1, 0, 0, 0], n: [0, -1, 1, 0, 0, FW] }[this.ori];
    l.setTransform(...M); l.drawImage(fc, 0, 0); l.setTransform(1, 0, 0, 1, 0, 0);
    // anteparas (paredes internas) do porão
    for (const [u, v] of F.walls) {
      const p = this.T(u, v), x = P + p.x * 16, y = P + p.y * 16;
      l.fillStyle = '#4a2c16'; l.fillRect(x, y - 6, 16, 22); l.fillStyle = '#6a4422'; l.fillRect(x, y - 6, 16, 3); l.fillStyle = '#2a1608'; l.fillRect(x, y + 14, 16, 2);
      l.fillStyle = 'rgba(0,0,0,0.25)'; l.fillRect(x + 7, y - 3, 1, 17);
    }
    // objetos fixos desenhados no piso
    for (let i = 0; i < F.objs.length; i++) {
      const o = F.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w, y = (i / this.w) | 0, s = Sprites.obj(o, 0);
      l.drawImage(s.c, P + x * 16 + 8 - (s.w >> 1), P + y * 16 + 16 - s.h + s.oy);
    }
    if (f) for (const [u, v] of F.hatches) {
      // escada que sobe para o convés
      const p = this.T(u, v), x = P + p.x * 16, y = P + p.y * 16;
      l.fillStyle = '#5a3a1a'; l.fillRect(x + 3, y - 10, 2, 26); l.fillRect(x + 11, y - 10, 2, 26);
      l.fillStyle = '#8a5a30'; for (let k = -8; k < 16; k += 4) l.fillRect(x + 3, y + k, 10, 1);
    }
    F.canvas = lc;
  }
  ox() { return this.x - this.w * 8; }
  oy() { return this.y - this.h * 8; }
  drawGround(ctx, camX, camY, vw, vh) {
    const W = Game.world;
    const bx = Math.round(Math.sin(Game.t * 0.9) * 1.2), by = Math.round(Math.sin(Game.t * 1.3) * 1.6);
    const wcx = Math.round(this.ox() + camX + bx), wcy = Math.round(this.oy() + camY + by);
    W.drawGround(ctx, wcx, wcy, vw, vh);
    this.drawWorldStuff(ctx, wcx, wcy, vw, vh);
    this.drawWake(ctx, wcx, wcy);
    if (this.floor) { ctx.fillStyle = 'rgba(0,10,25,0.35)'; ctx.fillRect(0, 0, vw, vh); }
    const F = this.floors[this.floor];
    if (!F.canvas) this.renderFloor(this.floor);
    ctx.drawImage(F.canvas, -camX - SHIP_PAD, -camY - SHIP_PAD);
    if (this.floor) {
      // luz do dia entrando pelas escotilhas
      const h = Game.time / 60; if (h > 6 && h < 19) for (const [u, v] of F.hatches) {
        const p = this.T(u, v), x = p.x * 16 - camX, y = p.y * 16 - camY;
        ctx.save(); ctx.globalCompositeOperation = 'lighter';
        const g = ctx.createRadialGradient(x + 8, y + 8, 2, x + 8, y + 8, 26); g.addColorStop(0, 'rgba(255,240,190,0.28)'); g.addColorStop(1, 'rgba(255,240,190,0)');
        ctx.fillStyle = g; ctx.fillRect(x - 20, y - 20, 56, 56); ctx.restore();
      }
    }
  }
  // costa, árvores, cidades, navios atracados e criaturas marinhas passando ao redor
  drawWorldStuff(ctx, cx, cy, vw, vh) {
    const W = Game.world, D = [];
    const tx0 = Math.floor(cx / 16) - 2, ty0 = Math.floor(cy / 16) - 1, tx1 = Math.floor((cx + vw) / 16) + 2, ty1 = Math.floor((cy + vh) / 16) + 3;
    const anim = Math.floor(Game.t * 4) % 2;
    for (let cy = Math.max(0, ty0 >> 5); cy <= Math.min(WORLD_H / 32 - 1, ty1 >> 5); cy++) for (let cx = Math.max(0, tx0 >> 5); cx <= Math.min(WORLD_W / 32 - 1, tx1 >> 5); cx++) {
      for (const [tx, ty, o, v] of W.objList(cx, cy)) {
        if (tx < tx0 || tx > tx1 || ty < ty0 || ty > ty1) continue;
        const s = Sprites.obj(o, v, OBJ_ANIM[o] ? anim : 0);
        D.push({ y: ty * 16 + 15, img: s.c, x: tx * 16 + 8 - (s.w >> 1), yy: ty * 16 + 16 - s.h + s.oy });
      }
    }
    for (const b of W.buildingsInView(cx, cy, cx + vw, cy + vh)) { if (b.site) continue; const img = Sprites.building(b.spec); D.push({ y: (b.ty + b.h) * 16, img, x: b.tx * 16 - 1, yy: (b.ty + b.h) * 16 - (img.height - 1) }); }
    Game.drawShips(D, cx, cy);
    for (const a of this.fauna) D.push({ y: a.y, fn: (c) => this.drawCreature(c, a, cx, cy) });
    D.sort((a, b) => a.y - b.y);
    for (const d of D) { if (d.fn) d.fn(ctx, cx, cy); else ctx.drawImage(d.img, d.x - cx, d.yy - cy); }
  }
  drawCreature(ctx, a, cx, cy) {
    const k = a.t / a.dur, x = Math.round(a.x + a.vx * a.t - cx), y = Math.round(a.y + a.vy * a.t - cy);
    if (a.kind === 'whale') {
      ctx.fillStyle = 'rgba(20,40,60,0.5)'; ctx.beginPath(); ctx.ellipse(x, y, 22, 7, 0, 0, Math.PI * 2); ctx.fill();
      if (k > 0.4 && k < 0.6) { ctx.fillStyle = 'rgba(230,245,255,0.8)'; for (let i = 0; i < 6; i++) ctx.fillRect(x - 8 + i * 3, y - 6 - Math.abs(Math.sin(i + Game.t * 8)) * 10, 1, 2); }
      return;
    }
    // golfinho saltando em arco
    const z = Math.sin(Math.PI * Math.min(1, (k * 3) % 1)) * 9, up = (k * 3) % 1 < 0.5;
    ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fillRect(x - 3, y, 7, 1);
    ctx.fillStyle = '#5a6a7a'; ctx.fillRect(x - 4, y - z - 2, 8, 3); ctx.fillStyle = '#8a9aaa'; ctx.fillRect(x - 3, y - z, 6, 1);
    ctx.fillStyle = '#4a5a6a'; ctx.fillRect(x + (a.vx > 0 ? (up ? 3 : 2) : -4), y - z - 4, 2, 2); ctx.fillRect(x + (a.vx > 0 ? -6 : 4), y - z - 3, 2, 3);
  }
  drawWake(ctx, cx, cy) {
    const now = Game.t, pts = this.trail.filter(p => now - p.t < 6.5);
    if (pts.length < 2) return;
    const side = (p, s) => { const age = now - p.t, spread = 60 + age * 22, nx = -Math.sin(p.a), ny = Math.cos(p.a); return [p.x + nx * spread * s - cx, p.y + ny * spread * s - cy, age]; };
    // faixa de água revolta atrás da popa
    ctx.beginPath();
    pts.forEach((p, i) => { const [x, y] = side(p, -1); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    for (let i = pts.length - 1; i >= 0; i--) { const [x, y] = side(pts[i], 1); ctx.lineTo(x, y); }
    ctx.closePath(); ctx.fillStyle = 'rgba(200,230,255,0.10)'; ctx.fill();
    // as duas linhas de espuma em V
    ctx.lineWidth = 2;
    for (const s of [-1, 1]) for (let i = 1; i < pts.length; i++) {
      const [x0, y0, a0] = side(pts[i - 1], s), [x1, y1] = side(pts[i], s);
      ctx.strokeStyle = `rgba(240,248,255,${0.6 * (1 - a0 / 6.5)})`; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
    }
    ctx.lineWidth = 1;
    // espuma borbulhando no meio
    for (const p of pts) { const age = now - p.t, k = 1 - age / 6.5, nx = -Math.sin(p.a), ny = Math.cos(p.a); ctx.fillStyle = `rgba(235,245,255,${0.45 * k})`; for (let i = 0; i < 4; i++) { const j = ((p.seed + i * 37) % 70 - 35) * (0.5 + age * 0.3); ctx.fillRect(Math.round(p.x + nx * j - cx) - 1, Math.round(p.y + ny * j - cy), 3, 2); } }
  }
  // velas, cordame, bandeira e gaivotas por cima de tudo
  drawOverlay(ctx, camX, camY) {
    const P = Game.player;
    if (this.floor === 0) {
      const horiz = this.ori === 'e' || this.ori === 'w', fwd = this.ori === 'e' || this.ori === 's' ? 1 : -1;
      for (const u of this.mastU) {
        const m = this.T(u, SHIP_C), mx = m.x * 16 + 8 - camX, my = m.y * 16 + 8 - camY, top = my - 40, half = ShipLevel.hw(u) * 16 - 10;
        // cordame
        ctx.strokeStyle = 'rgba(40,25,10,0.55)'; ctx.lineWidth = 1; ctx.beginPath();
        for (const s of [-1, 1]) for (const d of [-20, 0, 20]) { if (horiz) { ctx.moveTo(mx, top); ctx.lineTo(mx + d, my + s * (half + 4)); } else { ctx.moveTo(mx, top); ctx.lineTo(mx + s * (half + 4), my + d); } }
        ctx.stroke();
        // vela enfunada pelo vento
        const near = horiz ? Math.abs(P.x - camX - mx) < 26 && Math.abs(P.y - camY - (my - 16)) < half + 20 : Math.abs(P.y - camY - (top + 4)) < 30 && Math.abs(P.x - camX - mx) < half + 10;
        ctx.globalAlpha = near ? 0.4 : 0.93;
        for (const [hgt, sc] of [[0, 1], [16, 0.82]]) {
          const yb = top + hgt, bil = 9 * sc;
          ctx.beginPath();
          if (horiz) { const x0 = mx, y0 = my - half * sc - 14 + hgt * 0.4, y1 = my + half * sc - 14 + hgt * 0.4; ctx.moveTo(x0, y0); ctx.quadraticCurveTo(x0 + fwd * bil * 2, (y0 + y1) / 2, x0, y1); ctx.lineTo(x0 - fwd * 3, y1); ctx.quadraticCurveTo(x0 + fwd * bil, (y0 + y1) / 2, x0 - fwd * 3, y0); }
          else { const x0 = mx - half * sc, x1 = mx + half * sc; ctx.moveTo(x0, yb); ctx.quadraticCurveTo(mx, yb + fwd * bil * 2, x1, yb); ctx.lineTo(x1, yb + 6 * sc); ctx.quadraticCurveTo(mx, yb + 6 * sc + fwd * bil * 2.4, x0, yb + 6 * sc); }
          ctx.closePath(); ctx.fillStyle = this.iron ? '#d8d4c8' : '#efe6cc'; ctx.fill();
          ctx.strokeStyle = 'rgba(120,100,70,0.6)'; ctx.stroke();
          // faixa com a cor do reino
          ctx.fillStyle = this.col;
          if (horiz) ctx.fillRect(Math.round(mx + fwd * bil * 0.6) - 1, Math.round(my - 14 + hgt * 0.4 - 4), 3, 8); else ctx.fillRect(Math.round(mx - 4), Math.round(yb + 2 + fwd * bil), 8, 3);
          // verga
          ctx.fillStyle = '#4a2c14';
          if (horiz) ctx.fillRect(Math.round(mx - fwd * 4) - 1, Math.round(my - half * sc - 16 + hgt * 0.4), 2, Math.round(half * sc * 2 + 4)); else ctx.fillRect(Math.round(mx - half * sc - 2), Math.round(yb - 1), Math.round(half * sc * 2 + 4), 2);
        }
        ctx.globalAlpha = 1;
        // cesto da gávea
        ctx.fillStyle = '#4a2c14'; ctx.fillRect(Math.round(mx) - 4, Math.round(top) - 6, 8, 3); ctx.fillStyle = '#6a4422'; ctx.fillRect(Math.round(mx) - 4, Math.round(top) - 6, 8, 1);
      }
      if (this.iron) {
        // chaminé do motor a vapor
        const c = this.T(14, SHIP_C), x = c.x * 16 + 8 - camX, y = c.y * 16 + 8 - camY;
        ctx.fillStyle = '#1e2026'; ctx.fillRect(Math.round(x) - 5, Math.round(y) - 46, 10, 34); ctx.fillStyle = '#3a3e46'; ctx.fillRect(Math.round(x) - 5, Math.round(y) - 46, 2, 34); ctx.fillStyle = '#a02020'; ctx.fillRect(Math.round(x) - 5, Math.round(y) - 42, 10, 3);
      }
      // bandeira na popa
      const st = this.T(0, SHIP_C), fx = st.x * 16 + 8 - camX, fy = st.y * 16 + 8 - camY;
      ctx.fillStyle = '#3a2410'; ctx.fillRect(Math.round(fx), Math.round(fy) - 30, 1, 30);
      for (let i = 0; i < 12; i++) { const wv = Math.round(Math.sin(Game.t * 6 - i * 0.6) * 1.5); ctx.fillStyle = i % 4 === 3 ? shade(this.col, -0.3) : this.col; ctx.fillRect(Math.round(fx) + 1 + i, Math.round(fy) - 30 + wv, 1, 7); }
    }
    // gaivotas no céu
    for (const g of this.gulls) {
      const x = Math.round(g.cx + Math.cos(g.a) * g.r - camX), y = Math.round(g.cy + Math.sin(g.a) * g.r * 0.6 - camY - 50), fl = Math.sin(Game.t * 10 + g.a * 5) > 0;
      ctx.fillStyle = '#f4f4f4'; ctx.fillRect(x - 1, y, 3, 1); ctx.fillRect(x - 3, y - (fl ? 1 : -1), 2, 1); ctx.fillRect(x + 2, y - (fl ? 1 : -1), 2, 1);
    }
  }
  maxS() { return clamp(this.total / 115, 190, 340) * (this.iron ? 1.12 : 1); }
  savePos() { return Ship.landing(this.progress() > 0.5 ? this.to : this.from); }

  // ---------- Navegação ----------
  update(dt) {
    const G = Game, W = G.world;
    if (this.docked) {
      this.landT -= dt;
      if (this.landT <= 0 && !this.leaving) { this.leaving = true; Ship.disembark(this); }
      return;
    }
    const R = this.route, rem = this.remaining();
    const maxS = this.maxS(), acc = 30;
    const want = Math.min(maxS, Math.sqrt(2 * acc * rem) + 8);
    this.spd = this.spd < want ? Math.min(want, this.spd + acc * dt) : want;
    let step = this.spd * dt;
    while (step > 0 && this.ri < R.length) {
      const t = R[this.ri], d = dist(this.x, this.y, t.x, t.y);
      if (d <= step) { this.x = t.x; this.y = t.y; step -= d; this.done += d; this.ri++; continue; }
      const nx = (t.x - this.x) / d, ny = (t.y - this.y) / d;
      this.ang = Math.atan2(ny, nx);
      this.x += nx * step; this.y += ny * step; this.done += step; step = 0;
    }
    // vira o casco quando a rota mudar de direção por alguns segundos
    const want4 = ShipLevel.oriOf(this.ang);
    let da = Math.abs(this.ang - ShipLevel.oriAng(this.ori)); if (da > Math.PI) da = Math.PI * 2 - da;
    if (want4 !== this.ori && da > Math.PI / 3) { this.turnT += dt; if (this.turnT > 2.5) { this.turnT = 0; this.turn(want4); } } else this.turnT = 0;
    if (this.ri >= R.length) { this.docked = true; this.landT = 3; G.centerMsg(this.to.name, 'O navio atracou no porto'); Sfx.play('quest'); return; }
    if (!this.landHo && rem < 1800) { this.landHo = true; G.toast(`${this.cap.name}: Terra à vista! Preparem-se para atracar em ${this.to.name}!`, '#a0e0ff'); }
    if (!this.half && this.progress() > 0.5) { this.half = true; G.toast(`${this.cap.name}: Metade do caminho, marujos!`, '#c0e0ff'); }
    // mundo ao redor: gera os trechos de mapa à frente e revela a névoa
    W.pregen(this.x + Math.cos(this.ang) * 900, this.y + Math.sin(this.ang) * 900);
    G.worldPos = { x: this.x, y: this.y };
    const ex = Math.floor(this.x / 256), ey = Math.floor(this.y / 256), M = G.mods;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const x = ex + dx, y = ey + dy; if (x >= 0 && y >= 0 && x < MAP_W && y < MAP_H && dx * dx + dy * dy <= 5) M.explored[y * MAP_W + x] = 1; }
    // esteira de espuma
    this.trailT -= dt;
    if (this.trailT <= 0 && this.spd > 20) {
      this.trailT = 0.16;
      const oa = ShipLevel.oriAng(this.ori), back = SHIP_L * 8 + 10;
      this.trail.push({ x: this.x - Math.cos(oa) * back, y: this.y - Math.sin(oa) * back, a: this.ang, t: G.t, seed: (Math.random() * 1000) | 0 });
      if (this.trail.length > 42) this.trail.shift();
    }
    // borrifos na proa
    if (this.floor === 0 && this.spd > 50 && Math.random() < dt * 12) {
      const b = this.T(SHIP_L - 1, SHIP_C), bx = b.x * 16 + 8, by = b.y * 16 + 8;
      for (let i = 0; i < 3; i++) G.particle(bx + (Math.random() - 0.5) * 20, by + (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 40 - Math.cos(this.ang) * 30, -20 - Math.random() * 20, 'rgba(235,245,255,0.85)', 0.6, 1, 60);
    }
    // vapor da chaminé
    if (this.iron && Math.random() < dt * 8) { const c = this.T(14, SHIP_C); G.particles.push({ x: c.x * 16 + 6 + Math.random() * 4, y: c.y * 16 - 40, vx: -Math.cos(this.ang) * 14, vy: -14 - Math.random() * 6, color: Math.random() < 0.5 ? 'rgba(50,50,56,0.7)' : 'rgba(110,110,118,0.55)', life: 2.6, max: 2.6, size: 2, grav: 0 }); }
    // golfinhos, baleias e gaivotas
    if (Math.random() < dt * 0.12 && this.fauna.length < 4) {
      const a = Math.random() * Math.PI * 2, r = 220 + Math.random() * 160, whale = Math.random() < 0.25;
      const x = this.x + Math.cos(a) * r, y = this.y + Math.sin(a) * r;
      if (W.tileAt(Math.floor(x / 16), Math.floor(y / 16)) === T.DEEP) this.fauna.push({ kind: whale ? 'whale' : 'dolphin', x, y, vx: Math.cos(this.ang) * (whale ? 40 : 150), vy: Math.sin(this.ang) * (whale ? 40 : 150), t: 0, dur: whale ? 9 : 4 });
    }
    for (const a of this.fauna) a.t += dt;
    this.fauna = this.fauna.filter(a => a.t < a.dur);
    if (!this.gulls.length) for (let i = 0; i < 4; i++) this.gulls.push({ cx: this.w * 8 + (Math.random() - 0.5) * 80, cy: this.h * 8, r: 50 + Math.random() * 70, a: Math.random() * 6.28, s: 0.4 + Math.random() * 0.5 });
    for (const g of this.gulls) g.a += g.s * dt;
    // rangidos do casco e ondas
    this.creakT = (this.creakT || 3) - dt;
    if (this.creakT <= 0) { this.creakT = 4 + Math.random() * 6; Sfx.play(Math.random() < 0.5 ? 'creak' : 'wave'); }
    G.updateWeather(dt);
  }
}

const Ship = {
  landing(s) { return s.port.axis === 'y' ? { x: s.mid.x * 16 + 8, y: (s.mid.y - s.port.dir * 2) * 16 + 8 } : { x: s.mid.x * 16 + 8 - s.port.dir * 32, y: s.mid.y * 16 + 8 }; },
  out(s, k) { const p = s.port.ship; return s.port.axis === 'y' ? { x: p.x, y: p.y + s.port.dir * k } : { x: p.x + s.port.dir * k, y: p.y }; },
  route(from, to) {
    const W = Game.world;
    let n = 0; while (!W.mapDone && n++ < 400) W.stepMapImage(64);
    const a = Naval.seaOf(from), b = Naval.seaOf(to);
    if (a === null || b === null) return null;
    const cells = Naval.path(a, b); if (!cells) return null;
    // corta o começo/fim da rota para o navio não voltar atrás perto dos portos
    const cp = cells.map(i => Naval.cellPx(i)), o1 = this.out(from, 900), o2 = this.out(to, 900);
    const near = (q, lo, hi) => { let k = lo, bd = Infinity; for (let i = lo; i < hi; i++) { const d = dist(cp[i].x, cp[i].y, q.x, q.y); if (d < bd) { bd = d; k = i; } } return k; };
    const k0 = near(o1, 0, Math.min(cp.length, 12)), k1 = near(o2, Math.max(k0, cp.length - 12), cp.length);
    let pts = [this.out(from, 520), o1];
    for (let i = k0 + 1; i < k1; i++) pts.push(cp[i]);
    pts.push(o2, this.out(to, 520));
    // suaviza a rota (Chaikin)
    for (let it = 0; it < 3; it++) {
      const q = [pts[0]];
      for (let i = 0; i < pts.length - 1; i++) { const p = pts[i], r = pts[i + 1]; q.push({ x: p.x * 0.75 + r.x * 0.25, y: p.y * 0.75 + r.y * 0.25 }, { x: p.x * 0.25 + r.x * 0.75, y: p.y * 0.25 + r.y * 0.75 }); }
      q.push(pts[pts.length - 1]); pts = q;
    }
    return pts;
  },
  board(from, to, cap) {
    const G = Game, P = G.player, W = G.world;
    const route = this.route(from, to);
    if (!route) return false;
    const own = War.ownerOf(from), iron = !!(own && Naval.shipTypeOf(own) === 'encouracado');
    const col = own && War.K[own] ? War.K[own].color : from.region.color;
    UI.close();
    const L = new ShipLevel(from, to, route, iron, col, cap);
    G.worldPos = { x: L.x, y: L.y };
    G.level = L; P.mounted = false;
    const keep = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    G.actors = keep;
    for (const s of W.settlements) if (s.active) { s.active = false; s.npcs = null; }
    for (const p of W.pois) p.spawned = false;
    P.x = L.entry.x * 16 + 8; P.y = L.entry.y * 16 + 12;
    for (const a of keep) { a.x = P.x + (Math.random() - 0.5) * 20; a.y = P.y - 4; G.findFree(a); }
    this.spawnCrew(L);
    G.actors = keep.concat(L.crew[0]);
    G.projectiles = []; G.clouds = []; G.pickups = []; G.particles = []; G.timers = G.timers.filter(t => t.keep);
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    Sfx.play('quest'); UI.fade();
    G.centerMsg('Levantar âncora!', `Rumo a ${to.name} (${CONTINENTS[to.port.cont]})`);
    G.toast(`${cap.name}: Içar as velas! Explore o navio à vontade — sua cabine fica no porão.`, '#ffe8a0');
    return true;
  },
  spawnCrew(L) {
    const G = Game, rng = new RNG(hashStr(L.from.name) + G.day), s = L.from;
    const mk = (u, v, role, kind) => {
      const p = L.T(u, v), a = new NPC({ role, x: p.x, y: p.y }, s, rng);
      a.indoor = true; a.shipCrew = kind;
      if (kind !== 'captain' && kind !== 'passenger') { a.look = Object.assign({}, a.look, { body: rng.pick(['#e8e4dc', '#3a4a7a', '#7a2a2a', '#d8d0c0']), legs: rng.pick(['#2a2a40', '#4a3a2a']), robe: false }); if (kind === 'cook') a.look.body = '#f0f0f0'; a.S = Sprites.actor(a.look); a.h = a.S.h; }
      return a;
    };
    const cap = mk(3, SHIP_C, 'captain', 'captain');
    cap.name = L.cap.name; cap.look = Object.assign({}, L.cap.look, { helm: '#1a1a22', helmStyle: 'tricorne', cape: L.col }); cap.S = Sprites.actor(cap.look); cap.h = cap.S.h;
    L.crew[0].push(cap);
    for (const [u, v] of L.deckSpots) { const a = mk(u, v, 'resident', 'sailor'); a.name = 'Marinheiro ' + a.name.split(' ')[0]; L.crew[0].push(a); }
    for (const [u, v, k] of L.lowSpots) { const a = mk(u, v, 'resident', k === 'cook' ? 'cook' : k === 'captain_cabin' ? 'passenger' : 'sailor'); if (k === 'cook') a.name = 'Cozinheiro ' + a.name.split(' ')[0]; else if (k === 'crew') a.name = 'Marinheiro ' + a.name.split(' ')[0]; else a.name = a.name + ' (passageiro)'; L.crew[1].push(a); }
    for (const a of L.crew[0].concat(L.crew[1])) a.home = { x: a.x, y: a.y };
  },
  switchFloor() {
    const G = Game, L = G.level, P = G.player; if (!L || !L.isShip) return;
    L.crew[L.floor] = G.actors.filter(a => a.shipCrew);
    const keep = G.actors.filter(a => !a.shipCrew);
    L.floor = 1 - L.floor;
    G.actors = keep.concat(L.crew[L.floor]);
    G.findFree(P);
    for (const a of keep) if (a.team === 'ally') { a.x = P.x + (Math.random() - 0.5) * 14; a.y = P.y + 6; G.findFree(a); }
    G.projectiles = []; G.particles = []; G.flow = null;
    Sfx.play('door'); UI.fade();
    G.toast(L.floor ? 'Porão: cabines, alojamento, cozinha e carga' : 'Convés', '#ffe8a0');
  },
  eta(L) { return Math.max(1, Math.round(L.remaining() / L.maxS())); },
  talk(a) {
    const G = Game, L = G.level, P = G.player;
    if (!L || !L.isShip) return;
    const pct = Math.round(L.progress() * 100), sea = Elyndra.seaName(L.to.port.cont, L.from.port.cont);
    if (a.shipCrew === 'captain') {
      const txt = L.docked ? `Chegamos a <b>${esc(L.to.name)}</b>! Pode desembarcar.` : `Navegamos pelo <b>${sea}</b> rumo a <b>${esc(L.to.name)}</b>, em ${CONTINENTS[L.to.port.cont]}.<br>Já percorremos <b>${pct}%</b> da rota. Faltam uns ${this.eta(L)} segundos de vento bom.`;
      const opts = [];
      if (!L.docked) opts.push({ label: '💤 Descansar na cabine até chegarmos', cls: 'gold', fn: () => this.sleep() });
      opts.push({ label: 'Ver a rota no mapa', fn: () => { UI.close(); UI.openMap(); } });
      opts.push({ label: 'Tchau' });
      return UI.dialog(a.name, a.look, txt, opts);
    }
    if (a.shipCrew === 'cook') {
      return UI.dialog(a.name, a.look, 'Fome? Tenho ensopado de peixe com pão duro. É o melhor do mar — porque é o único!', [
        { label: 'Comer um prato (grátis)', fn: () => { P.hp = P.stat.maxHp; P.st = P.stat.maxSt; UI.close(); G.toast('Você comeu o ensopado do navio. Vida e vigor restaurados!', '#a0ff90'); } },
        { label: 'Tchau' }
      ]);
    }
    if (a.shipCrew === 'passenger') return UI.dialog(a.name, a.look, `Também vou para ${esc(L.to.name)}. Dizem que ${CONTINENTS[L.to.port.cont]} é cheia de oportunidades... e de perigos.`, [{ label: 'Tchau' }]);
    UI.dialog(a.name, a.look, esc(SAILOR_LINES[Math.floor(Math.random() * SAILOR_LINES.length)]), [{ label: 'Tchau' }]);
  },
  sleepPrompt() {
    const L = Game.level; if (!L || !L.isShip) return;
    if (L.docked) return Game.toast('O navio já atracou.', '#c0e0ff');
    UI.dialog('Beliche', null, `Deitar no beliche e dormir até o navio chegar a <b>${esc(L.to.name)}</b>?`, [{ label: '💤 Dormir', cls: 'gold', fn: () => this.sleep() }, { label: 'Ficar acordado' }]);
  },
  sleep() {
    const G = Game, L = G.level, P = G.player; if (!L || !L.isShip || L.docked) return;
    UI.close(); UI.fade();
    const mins = Math.max(60, Math.round(this.eta(L) * 2 * 3));
    G.time += mins; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
    const R = L.route; L.done = L.total; L.ri = R.length; L.x = R[R.length - 1].x; L.y = R[R.length - 1].y; L.trail = [];
    P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; Vida.dormiu();
    L.docked = true; L.landT = 2.5;
    G.centerMsg(L.to.name, `Você dormiu ${Math.round(mins / 60)}h. O navio atracou!`);
  },
  disembark(L) {
    const G = Game, P = G.player, to = L.to;
    G.worldPos = this.landing(to);
    G.exitDungeon();
    P.mounted = false;
    if (P.horse) { P.horse.x = P.x - 20; P.horse.y = P.y + 8; }
    if (P.cart && P.cart.hitched) { P.cart.x = P.x - 50; P.cart.y = P.y + 10; }
    for (const m of G.actors) if (m.follow || m.isFollower || m.isPet) { m.x = P.x + 12; m.y = P.y + 6; G.findFree(m); }
    for (const s of G.world.settlements) if (s.active) { s.active = false; const set = new Set(s.npcs || []); G.actors = G.actors.filter(x => !set.has(x)); s.npcs = null; }
    G.mods.discovered.add(to.id);
    const vc = P.visitedCont || [0], first = !vc.includes(to.port.cont);
    if (first) { P.visitedCont = vc.concat(to.port.cont); G.centerMsg(CONTINENTS[to.port.cont].toUpperCase(), 'Você atravessou o mar!'); G.chron(`Atravessei o mar a bordo de um navio e cheguei a ${CONTINENTS[to.port.cont]}, desembarcando em ${to.name}.`); P.addXP(150); }
    else G.toast(`Você desembarcou em ${to.name}.`, '#a0e0ff');
  }
};
