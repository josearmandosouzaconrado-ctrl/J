'use strict';
// ===================== INTERIORES EXPLORÁVEIS =====================
const INTERIOR_SIZES = { castle: [22, 16], palace: [22, 16], temple: [16, 14], heroes: [16, 12], guildhall: [16, 12], inn: [17, 12], smith: [13, 10], general: [12, 10], alchemist: [12, 10], magic: [12, 10], stable: [14, 10], playerhouse: [14, 11], house: [11, 9], house2: [12, 9], house3: [9, 8] };

class Interior {
  constructor(b) {
    this.isWorld = false; this.isInterior = true; this.dark = false;
    this.b = b; this.name = b.name;
    const s = b.settlement; this.s = s; this.regIndex = s.region.index;
    const cul = s.region.culture;
    const r = this.rng = new RNG(hashStr(b.name) + b.tx * 31 + b.ty * 17);
    const [W, H] = b.home ? ({ cabana: [10, 8], casa: [14, 11], casarao: [19, 13] })[b.home.tier] : (INTERIOR_SIZES[b.kind] || [11, 9]);
    this.w = W; this.h = H;
    const grand = b.kind === 'castle' || b.kind === 'palace' || b.kind === 'temple';
    this.wallT = (cul === 'nordic' || cul === 'orc' || cul === 'swamp') ? T.LOGWALL : cul === 'desert' ? T.TWALL : (cul === 'dwarf' || cul === 'fort' || (grand && cul !== 'elf' && cul !== 'halfling')) ? T.WALL : T.HWALL;
    this.floorT = grand ? (cul === 'desert' ? T.SANDSTONE : cul === 'elf' ? T.RFLOOR : T.DFLOOR) : (cul === 'dwarf' ? T.DCOBBLE : cul === 'desert' ? T.SANDSTONE : cul === 'elf' ? T.RFLOOR : T.HFLOOR);
    this.tiles = new Uint8Array(W * H).fill(this.wallT);
    this.objs = new Uint8Array(W * H);
    for (let y = 2; y < H - 1; y++) for (let x = 1; x < W - 1; x++) this.tiles[y * W + x] = this.floorT;
    const dx = Math.floor(W / 2);
    this.tiles[(H - 1) * W + dx] = this.floorT;
    this.objs[(H - 1) * W + dx] = O.DOOR_IN;
    this.exitPos = { x: dx, y: H - 1 };
    this.entry = { x: dx, y: H - 2 };
    this.dx = dx;
    this.spots = [];
    this.build(b.kind, r);
    this.canvas = null;
  }
  idx(x, y) { return y * this.w + x; }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  isFloor(x, y) { return this.inb(x, y) && !TSOLID[this.tiles[this.idx(x, y)]]; }
  free(x, y) { return this.isFloor(x, y) && !this.objs[this.idx(x, y)] && !(x === this.dx && y >= this.h - 3); }
  put(x, y, o) { if (this.free(x, y)) { this.objs[this.idx(x, y)] = o; return true; } return false; }
  wall(x, o) { if (this.inb(x, 1) && TSOLID[this.tiles[this.idx(x, 1)]]) this.objs[this.idx(x, 1)] = o; }
  setFloor(x, y, t) { if (this.isFloor(x, y)) this.tiles[this.idx(x, y)] = t; }
  spot(role, x, y, extra) { this.spots.push(Object.assign({ role, x, y }, extra || {})); }
  table(x, y, chairs = true) { this.put(x, y, O.TABLE); if (chairs) { this.put(x - 1, y, O.CHAIR); this.put(x + 1, y, O.CHAIR); } }
  build(kind, r) {
    const W = this.w, H = this.h, dx = this.dx;
    // janelas, quadros e tochas na parede do fundo
    for (let x = 2; x < W - 2; x += 3) this.wall(x, r.chance(0.6) ? O.WINDOW : (r.chance(0.5) ? O.PAINTING : 0));
    switch (kind) {
      case 'house': case 'house2': case 'house3': case 'playerhouse': {
        const ph = kind === 'playerhouse';
        this.put(1, 2, O.BEDSMALL); if (W > 9) this.put(2, 2, O.BEDSMALL);
        this.put(dx, 2, O.FIREPLACE);
        this.put(W - 2, 2, O.WARDROBE);
        if (W > 10) this.put(W - 3, 2, r.chance(0.5) ? O.BOOKSHELF : O.SHELF);
        for (let y = Math.floor(H / 2); y <= Math.floor(H / 2) + 1; y++) for (let x = dx - 1; x <= dx + 1; x++) this.setFloor(x, y, T.CARPET);
        this.table(dx, Math.floor(H / 2) - 1);
        this.put(1, H - 2, r.pick([O.BARREL, O.CRATE, O.PLANT]));
        this.put(W - 2, H - 2, r.pick([O.PLANT, O.BARREL, O.CANDLE]));
        if (ph) {
          this.put(1, H - 3, O.CAULDRON); this.put(W - 2, Math.floor(H / 2), O.ANVIL); this.put(W - 2, H - 3, O.WORKBENCH); this.put(3, 2, O.BEDSMALL);
          const q = this.b.home ? this.b.home.quality || 0 : 3;
          if (q <= 0) { for (let x = 1; x < W - 1; x++) if (this.objs[this.idx(x, 1)] === O.PAINTING) this.objs[this.idx(x, 1)] = 0; for (let i = 0; i < this.tiles.length; i++) if (this.tiles[i] === T.CARPET) this.tiles[i] = this.floorT; for (let i = 0; i < 4; i++) this.put(r.int(1, W - 2), r.int(3, H - 3), O.BONES === 0 ? 0 : O.CRATE); }
          if (q >= 3) { this.put(1, Math.floor(H / 2), O.PLANT); this.put(W - 3, H - 2, O.CANDLE); this.put(4, 2, O.BOOKSHELF); }
          if (q >= 4) { this.put(5, 2, O.STATUE); this.put(2, H - 2, O.PLANT); }
        }
        else {
          const res = Game.residentsOf(this.b);
          res.forEach((rs, i) => { if (Game.player && Game.player.spouse === rs.id && Game.player.spouseHome) return; this.spot(rs.child ? 'child' : 'resident', 2 + (i * 2) % (W - 4), Math.floor(H / 2) + 1, { res: rs }); });
        }
        break;
      }
      case 'inn': {
        for (let x = 2; x <= 7; x++) this.put(x, 4, O.COUNTER);
        this.put(2, 2, O.KEG); this.put(3, 2, O.KEG); this.put(5, 2, O.SHELF); this.put(6, 2, O.SHELF);
        this.spot('owner', 5, 3);
        this.put(W - 3, 2, O.FIREPLACE);
        const tables = [[W - 5, 5], [W - 3, 7], [W - 7, 8], [4, 7], [W - 6, 6]];
        for (const [x, y] of tables) if (y < H - 2) { this.table(x, y); if (r.chance(0.7)) this.spot('patron', x + (r.chance(0.5) ? 1 : -1), y); }
        this.put(1, H - 2, O.BARREL); this.put(W - 2, H - 2, O.PLANT); this.put(1, 6, O.CANDLE);
        break;
      }
      case 'smith': {
        this.put(2, 2, O.FORGE); this.put(4, 4, O.ANVIL); this.put(W - 2, 2, O.WEAPONRACK); this.put(W - 3, 2, O.WEAPONRACK);
        for (let x = 2; x <= W - 4; x++) if (x !== dx) this.put(x, H - 4, O.COUNTER);
        this.spot('owner', dx + 1, H - 5);
        this.put(1, H - 2, O.BARREL); this.put(W - 2, H - 2, O.CRATE); this.put(W - 2, 5, O.CRATE);
        break;
      }
      case 'general': case 'alchemist': case 'magic': {
        const sh = kind === 'alchemist' ? O.POTSHELF : kind === 'magic' ? O.BOOKSHELF : O.SHELF;
        for (let x = 1; x < W - 1; x++) if (x !== dx) this.put(x, 2, x % 3 === 0 ? (kind === 'magic' ? O.CRYSTAL : O.PLANT) : sh);
        for (let x = 2; x <= W - 4; x++) this.put(x, 5, O.COUNTER);
        this.spot('owner', 4, 4);
        if (kind === 'alchemist') { this.put(1, H - 3, O.CAULDRON); this.put(W - 2, H - 3, O.ALCHEMY); }
        if (kind === 'magic') { this.put(1, H - 3, O.CANDLE); this.put(W - 2, H - 3, O.CRYSTAL); this.put(W - 2, 4, O.CANDLE); }
        if (kind === 'general') { this.put(1, H - 2, O.BARREL); this.put(1, H - 3, O.CRATE); this.put(W - 2, H - 2, O.KEG); this.put(W - 2, 4, O.HAY); }
        break;
      }
      case 'temple': {
        for (let y = 3; y < H - 1; y++) this.setFloor(dx, y, T.CARPET);
        this.put(dx, 2, O.ALTAR); this.put(dx - 2, 2, O.CANDLE); this.put(dx + 2, 2, O.CANDLE);
        this.put(2, 2, O.STATUE); this.put(W - 3, 2, O.STATUE);
        for (let y = 4; y < H - 2; y += 3) { this.put(1, y, O.PILLAR); this.put(W - 2, y, O.PILLAR); }
        for (let y = 5; y < H - 2; y += 2) { this.put(dx - 2, y, O.BENCH); this.put(dx - 3, y, O.BENCH); this.put(dx + 2, y, O.BENCH); this.put(dx + 3, y, O.BENCH); }
        this.spot('owner', dx, 3);
        this.spot('patron', dx - 2, 6); this.spot('patron', dx + 3, 8);
        break;
      }
      case 'heroes': case 'guildhall': {
        this.put(dx - 3, 2, O.QUESTBOARD); this.put(dx + 3, 2, O.WEAPONRACK); this.put(1, 2, O.BANNER); this.put(W - 2, 2, O.BANNER);
        for (let x = dx - 2; x <= dx + 2; x++) this.put(x, 4, O.COUNTER);
        this.spot('owner', dx, 3);
        this.table(4, 7); this.table(W - 5, 7); this.put(1, H - 2, O.BARREL); this.put(W - 2, H - 2, O.CANDLE);
        this.spot('patron', 3, 8); this.spot('patron', W - 4, 8); this.spot('patron', dx, 7);
        break;
      }
      case 'castle': case 'palace': {
        for (let y = 3; y < H - 1; y++) for (let x = dx - 1; x <= dx + 1; x++) this.setFloor(x, y, T.CARPET);
        this.put(dx, 2, O.THRONE);
        this.put(dx - 3, 2, O.BANNER); this.put(dx + 3, 2, O.BANNER); this.put(dx - 2, 2, O.CANDLE); this.put(dx + 2, 2, O.CANDLE);
        for (let y = 4; y < H - 2; y += 3) { this.put(dx - 4, y, O.PILLAR); this.put(dx + 4, y, O.PILLAR); }
        this.put(1, 2, O.FIREPLACE); this.put(W - 2, 2, O.BOOKSHELF); this.put(W - 3, 2, O.BOOKSHELF);
        this.table(3, 7); this.table(W - 4, 7); this.put(1, H - 2, O.PLANT); this.put(W - 2, H - 2, O.PLANT);
        this.spot('owner', dx, 3);
        this.spot('guard', dx - 2, 4); this.spot('guard', dx + 2, 4); this.spot('guard', dx - 2, H - 3); this.spot('guard', dx + 2, H - 3);
        this.spot('patron', 4, 8); this.spot('patron', W - 5, 9);
        break;
      }
      case 'stable': {
        for (let x = 2; x < W - 2; x += 3) { this.put(x, 2, O.HAY); this.put(x, 4, O.FENCE); }
        this.put(W - 2, 2, O.BARREL); this.put(1, H - 2, O.HAY);
        this.spot('owner', dx, 6);
        break;
      }
    }
  }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : this.wallT; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx; const old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), 7);
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#0a0608'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(this.canvas, -camX, -camY);
  }
}
