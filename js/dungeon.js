'use strict';
// ===================== MASMORRAS PROCEDURAIS =====================
class Dungeon {
  constructor(def, seed, state) {
    this.isWorld = false;
    this.def = def;
    this.type = DUNGEON_TYPES[def.type];
    this.name = def.name;
    this.dark = def.type !== 'arena';
    const S = def.size;
    this.w = S; this.h = S;
    this.tiles = new Uint8Array(S * S).fill(this.type.wall);
    this.objs = new Uint8Array(S * S);
    this.rng = new RNG(seed);
    this.spawns = [];
    this.chests = [];
    this.regIndex = def.region.index;
    this.state = state || {};
    const gen = this.type.gen;
    let ok = false;
    for (let attempt = 0; attempt < 8 && !ok; attempt++) {
      this.tiles.fill(this.type.wall); this.objs.fill(0); this.bossPos = null;
      if (gen === 'cave' && attempt < 5) ok = this.genCave();
      else if (gen === 'arena') ok = this.genArena();
      else ok = this.genRooms();
    }
    this.populate();
    this.canvas = null;
  }
  idx(x, y) { return y * this.w + x; }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  isFloor(x, y) { return this.inb(x, y) && !TSOLID[this.tiles[this.idx(x, y)]]; }
  carve(x, y, t) { if (x > 0 && y > 0 && x < this.w - 1 && y < this.h - 1) this.tiles[this.idx(x, y)] = t === undefined ? this.type.floor : t; }

  genRooms() {
    const S = this.w, r = this.rng;
    const rooms = [];
    const target = Math.floor(S / 6) + 3;
    for (let a = 0; a < 600 && rooms.length < target; a++) {
      const w = r.int(5, 11), h = r.int(5, 9);
      const x = r.int(2, S - w - 3), y = r.int(2, S - h - 3);
      if (rooms.some(o => x < o.x + o.w + 2 && x + w + 2 > o.x && y < o.y + o.h + 2 && y + h + 2 > o.y)) continue;
      rooms.push({ x, y, w, h, cx: x + (w >> 1), cy: y + (h >> 1) });
    }
    if (rooms.length < 4) return false;
    for (const rm of rooms) for (let y = rm.y; y < rm.y + rm.h; y++) for (let x = rm.x; x < rm.x + rm.w; x++) this.carve(x, y);
    // ordena por proximidade encadeada
    const order = [rooms.reduce((a, b) => (a.cy > b.cy ? a : b))];
    const left = rooms.filter(x => x !== order[0]);
    while (left.length) {
      const last = order[order.length - 1];
      let bi = 0, bd = Infinity;
      left.forEach((o, i) => { const d = dist2(last.cx, last.cy, o.cx, o.cy); if (d < bd) { bd = d; bi = i; } });
      order.push(left.splice(bi, 1)[0]);
    }
    const corridor = (a, b) => {
      const wide = r.chance(0.4);
      let x = a.cx, y = a.cy;
      const horizFirst = r.chance(0.5);
      const stepX = () => { while (x !== b.cx) { this.carve(x, y); if (wide) this.carve(x, y + 1); x += x < b.cx ? 1 : -1; } };
      const stepY = () => { while (y !== b.cy) { this.carve(x, y); if (wide) this.carve(x + 1, y); y += y < b.cy ? 1 : -1; } };
      if (horizFirst) { stepX(); stepY(); } else { stepY(); stepX(); }
      this.carve(x, y);
    };
    for (let i = 1; i < order.length; i++) corridor(order[i - 1], order[i]);
    for (let i = 0; i < 3; i++) corridor(r.pick(order), r.pick(order));
    this.rooms = order;
    const ent = order[0];
    this.entry = { x: ent.cx, y: ent.y + ent.h - 2 };
    this.exitPos = { x: ent.cx, y: ent.y + ent.h - 1 };
    if (this.type.water) this.sprinkle(T.WATER, 0.5);
    return this.finishLayout();
  }
  genCave() {
    const S = this.w, r = this.rng;
    let g = new Uint8Array(S * S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) g[y * S + x] = (x < 2 || y < 2 || x >= S - 2 || y >= S - 2 || r.next() < 0.44) ? 1 : 0;
    for (let it = 0; it < 6; it++) {
      const n = new Uint8Array(S * S);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        if (x < 1 || y < 1 || x >= S - 1 || y >= S - 1) { n[y * S + x] = 1; continue; }
        let c = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (g[(y + dy) * S + x + dx]) c++;
        n[y * S + x] = c >= 5 ? 1 : 0;
      }
      g = n;
    }
    // maior região conectada
    const lab = new Int32Array(S * S).fill(-1);
    let best = -1, bestN = 0, id = 0;
    for (let i = 0; i < S * S; i++) {
      if (g[i] || lab[i] >= 0) continue;
      const q = [i]; lab[i] = id; let n = 0;
      while (q.length) { const c = q.pop(); n++; const cx = c % S, cy = (c / S) | 0; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nx = cx + dx, ny = cy + dy, j = ny * S + nx; if (nx >= 0 && ny >= 0 && nx < S && ny < S && !g[j] && lab[j] < 0) { lab[j] = id; q.push(j); } } }
      if (n > bestN) { bestN = n; best = id; }
      id++;
    }
    if (bestN < S * S * 0.18) return false;
    for (let i = 0; i < S * S; i++) if (!g[i] && lab[i] === best) this.tiles[i] = this.type.floor;
    // entrada: piso mais ao sul perto do centro
    let ent = null, bd = Infinity;
    for (let y = 2; y < S - 2; y++) for (let x = 2; x < S - 2; x++) {
      if (!this.isFloor(x, y) || !this.isFloor(x, y - 1) || !this.isFloor(x, y + 1)) continue;
      const d = (S - y) * 3 + Math.abs(x - S / 2);
      if (d < bd) { bd = d; ent = { x, y }; }
    }
    if (!ent) return false;
    this.exitPos = { x: ent.x, y: ent.y - 1 };
    this.entry = { x: ent.x, y: ent.y + 1 };
    if (!this.isFloor(this.entry.x, this.entry.y)) this.entry = { x: ent.x, y: ent.y };
    if (this.type.lava) this.sprinkle(T.LAVA, 0.62);
    if (this.type.water) this.sprinkle(T.WATER, 0.55);
    return this.finishLayout();
  }
  genArena() {
    const S = this.w, c = S / 2;
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
      const dx = (x - c + 0.5) / (S * 0.42), dy = (y - c + 0.5) / (S * 0.36);
      if (dx * dx + dy * dy < 1) this.tiles[this.idx(x, y)] = this.type.floor;
    }
    for (let y = Math.floor(c + S * 0.3); y < S - 1; y++) for (let x = c - 1; x <= c; x++) this.carve(x, y);
    this.exitPos = { x: c, y: S - 3 };
    this.entry = { x: c, y: S - 5 };
    this.carve(this.exitPos.x, this.exitPos.y);
    this.bossPos = { x: c, y: Math.floor(c - 3) };
    return this.finishLayout();
  }
  sprinkle(t, thr) {
    const n = new Simplex(this.rng.int(1, 1e6));
    for (let y = 1; y < this.h - 1; y++) for (let x = 1; x < this.w - 1; x++) {
      if (!this.isFloor(x, y)) continue;
      if (Math.abs(x - this.entry.x) + Math.abs(y - this.entry.y) < 8) continue;
      let c = 0; for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (this.isFloor(x + dx, y + dy)) c++;
      if (c < 9) continue;
      if (n.noise(x / 7, y / 7) > thr) this.tiles[this.idx(x, y)] = t;
    }
  }
  finishLayout() {
    // garante que a saída é parede com escada
    const e = this.exitPos;
    this.carve(e.x, e.y);
    this.objs[this.idx(e.x, e.y)] = O.STAIRS_UP;
    // distâncias BFS a partir da entrada
    const S = this.w, D = new Int32Array(S * S).fill(-1);
    const q = [this.idx(this.entry.x, this.entry.y)]; D[q[0]] = 0;
    let far = q[0];
    for (let h = 0; h < q.length; h++) {
      const c = q[h], cx = c % S, cy = (c / S) | 0;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, ny = cy + dy; if (!this.inb(nx, ny)) continue;
        const j = ny * S + nx;
        if (D[j] >= 0 || TSOLID[this.tiles[j]]) continue;
        D[j] = D[c] + 1; q.push(j); if (D[j] > D[far]) far = j;
      }
    }
    this.D = D;
    if (!this.bossPos) this.bossPos = { x: far % S, y: (far / S) | 0 };
    let floorN = 0; for (let i = 0; i < S * S; i++) if (D[i] >= 0) floorN++;
    this.floorN = floorN;
    return floorN > 60;
  }
  openAround(x, y) {
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) { if (!this.isFloor(x + dx, y + dy)) return false; const o = this.objs[this.idx(x + dx, y + dy)]; if (o && OSOLID[o]) return false; }
    return true;
  }
  populate() {
    const S = this.w, r = this.rng, T_ = this.type, D = this.D;
    const cleared = !!this.state.cleared;
    const opened = this.state.opened || new Set();
    const floors = [];
    for (let i = 0; i < S * S; i++) if (D[i] > 0) floors.push(i);
    // tochas nas paredes
    for (const i of floors) {
      const x = i % S, y = (i / S) | 0;
      if (TSOLID[this.tiles[i - S]] && !TSOLID[this.tiles[i + S]] && (x * 7 + y * 13) % 9 === 0 && D[i] > 2) this.objs[i] = O.TORCH;
    }
    // decoração
    const deco = T_.deco;
    for (const i of floors) {
      const x = i % S, y = (i / S) | 0;
      if (this.objs[i] || D[i] < 4) continue;
      const h = r.next();
      if (h < 0.035) {
        const o = r.pick(deco);
        if (OSOLID[o] && !this.openAround(x, y)) continue;
        this.objs[i] = o;
      } else if (h < 0.05 && (T_.gen === 'cave' || T_.gen === 'rooms')) {
        this.objs[i] = r.chance(0.5) ? O.BONES : (T_.gen === 'rooms' ? O.COBWEB : O.ROCK);
      }
    }
    if (T_.ores) for (const i of floors) { if (!this.objs[i] && TSOLID[this.tiles[i - 1]] && r.chance(0.06) && this.openAround(i % S + 1, (i / S) | 0)) this.objs[i] = r.pick([O.ORE_FERRO, O.ORE_FERRO, O.ORE_PRATA, O.ORE_OURO]); }
    // baús
    const nChest = 2 + Math.floor(this.floorN / 500);
    const chestCands = floors.filter(i => D[i] > 10 && !this.objs[i] && this.openAround(i % S, (i / S) | 0));
    for (let k = 0; k < nChest && chestCands.length; k++) {
      const i = chestCands.splice(r.int(0, chestCands.length - 1), 1)[0];
      const x = i % S, y = (i / S) | 0;
      this.objs[i] = opened.has(tkey(x, y)) ? O.CHEST_OPEN : O.CHEST;
    }
    // chefe e baú do tesouro
    const bp = this.bossPos;
    if (!cleared) this.spawns.push({ id: this.def.boss, x: bp.x, y: bp.y, lvl: this.def.lvl + 1, boss: true });
    // baú do chefe perto
    let cpos = null;
    for (const [dx, dy] of [[0, -2], [2, 0], [-2, 0], [0, 2], [1, -1], [-1, -1]]) { const x = bp.x + dx, y = bp.y + dy; if (this.isFloor(x, y) && this.openAround(x, y)) { cpos = { x, y }; break; } }
    if (!cpos) for (const [dx, dy] of [[0, -1], [1, 0], [-1, 0], [0, 1]]) { const x = bp.x + dx, y = bp.y + dy; if (this.isFloor(x, y)) { cpos = { x, y }; break; } }
    if (cpos) { this.objs[this.idx(cpos.x, cpos.y)] = opened.has(tkey(cpos.x, cpos.y)) ? O.CHEST_OPEN : O.CHEST_BOSS; this.bossChest = cpos; }
    // monstros
    const groups = Math.floor(this.floorN / (cleared ? 90 : 48)) + 2;
    const mobCands = floors.filter(i => D[i] > 9);
    for (let g = 0; g < groups && mobCands.length; g++) {
      const i = r.pick(mobCands);
      const x = i % S, y = (i / S) | 0;
      if (Math.abs(x - bp.x) + Math.abs(y - bp.y) < 6) continue;
      const n = r.int(1, 3);
      const id = r.pick(T_.mobs);
      for (let k = 0; k < n; k++) {
        const ox = x + r.int(-1, 1), oy = y + r.int(-1, 1);
        if (!this.isFloor(ox, oy)) continue;
        this.spawns.push({ id, x: ox, y: oy, lvl: Math.max(1, this.def.lvl + r.int(-1, 1)) });
      }
    }
    if (this.def.type === 'arena' && !cleared) {
      for (let k = 0; k < 4; k++) this.spawns.push({ id: r.pick(T_.mobs), x: bp.x + (k - 1.5) * 3, y: bp.y + 4, lvl: this.def.lvl - 1 });
    }
  }
  // ---- interface de nível ----
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : this.type.wall; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx; const old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), this.def.uid * 13 + 5);
    for (let i = 0; i < this.w * this.h; i++) {
      const o = this.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w, y = (i / this.w) | 0;
      const s = Sprites.obj(o, Math.floor(hash2(x, y, 5) * (OBJ_VARIANTS[o] || 1)));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(this.canvas, -camX, -camY);
  }
}
