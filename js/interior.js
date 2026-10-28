'use strict';
// ===================== INTERIORES EXPLORÁVEIS =====================
const INTERIOR_SIZES = { castle: [22, 16], palace: [22, 16], temple: [16, 14], heroes: [16, 12], guildhall: [16, 12], inn: [17, 12], smith: [13, 10], general: [12, 10], alchemist: [12, 10], magic: [12, 10], stable: [14, 10], playerhouse: [14, 11], house: [11, 9], house2: [12, 9], house3: [9, 8], grandhall: [26, 18], gunsmith: [13, 10], factory: [24, 15], dorm_real: [20, 12], dorm: [20, 12], library: [18, 14], refectory: [18, 12], fencing: [18, 13], alchemylab: [12, 10] };

class Interior {
  constructor(b) {
    this.isWorld = false; this.isInterior = true; this.dark = false;
    this.b = b; this.name = b.name;
    const s = b.settlement; this.s = s; this.regIndex = s.region.index;
    const cul = s.region.culture;
    const r = this.rng = new RNG(hashStr(b.name) + b.tx * 31 + b.ty * 17);
    let [W, H] = b.home ? ({ cabana: [10, 8], casa: [14, 11], casarao: [19, 13] })[b.home.tier] : (INTERIOR_SIZES[b.kind] || [11, 9]);
    const isHouse = !b.home && (b.kind === 'house' || b.kind === 'house2' || b.kind === 'house3');
    if (isHouse) { const big = b.kind === 'house2' ? 3 : b.kind === 'house3' ? -1 : 1; W = 10 + big + r.int(0, 4); H = 8 + (big > 0 ? 1 : 0) + r.int(0, 3); }
    this.w = W; this.h = H;
    const grand = b.kind === 'castle' || b.kind === 'palace' || b.kind === 'temple' || b.kind === 'grandhall' || b.kind === 'library' || b.kind === 'fencing';
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
    this.build(b.kind === 'alchemylab' ? 'alchemist' : b.kind, r);
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
      case 'house': case 'house2': case 'house3': this.buildHouse(r); break;
      case 'playerhouse': {
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
      case 'grandhall': {
        // Grande Salão: púlpito, lousa, mesas longas e estandartes
        for (let y = 3; y < H - 1; y++) for (let x = dx - 1; x <= dx + 1; x++) this.setFloor(x, y, T.CARPET);
        this.put(dx - 1, 2, O.BLACKBOARD); this.put(dx + 3, 2, O.CRYSTAL); this.put(dx - 4, 2, O.CRYSTAL);
        this.put(dx, 4, O.LECTERN);
        for (const x of [2, 5, W - 3, W - 6]) this.put(x, 2, O.BANNER);
        this.put(1, 2, O.BOOKSHELF); this.put(W - 2, 2, O.BOOKSHELF);
        for (let y = 7; y < H - 3; y += 3) {
          for (let x = 3; x <= dx - 4; x++) { this.put(x, y, O.TABLE); this.put(x, y + 1, O.BENCH); }
          for (let x = dx + 4; x <= W - 4; x++) { this.put(x, y, O.TABLE); this.put(x, y + 1, O.BENCH); }
        }
        for (let y = 5; y < H - 2; y += 4) { this.put(1, y, O.PILLAR); this.put(W - 2, y, O.PILLAR); this.put(dx - 3, y, O.CANDLE); this.put(dx + 3, y, O.CANDLE); }
        this.spot('owner', dx + 1, 4); this.teacherSpot = { x: dx, y: 5 };
        this.seatSpots = [];
        for (let y = 8; y < H - 2; y += 3) for (let x = 3; x <= W - 4; x += 2) if (x < dx - 3 || x > dx + 3) this.seatSpots.push({ x, y });
        break;
      }
      case 'dorm_real': case 'dorm': {
        const royal = kind === 'dorm_real';
        const P = Game.player, mine = P && P.academy && P.academy.enrolled && P.academy.dorm === kind;
        this.bedSpots = [];
        for (let x = 2; x < W - 2; x += 3) { this.put(x, 2, royal ? O.BED : O.BEDSMALL); this.put(x + 1, 2, O.WARDROBE); this.bedSpots.push({ x, y: 3 }); }
        for (let x = 2; x < W - 2; x += 3) { if (x === dx || x + 1 === dx) continue; this.put(x, H - 3, royal ? O.BED : O.BEDSMALL); this.put(x + 1, H - 3, O.CANDLE); this.bedSpots.push({ x, y: H - 4 }); }
        for (let y = 5; y <= 6; y++) for (let x = 3; x < W - 3; x++) this.setFloor(x, y, T.CARPET);
        this.put(1, 5, O.FIREPLACE); this.put(W - 2, 5, royal ? O.STATUE : O.BOOKSHELF); this.table(dx + 3, 6); this.table(dx - 4, 6);
        if (royal) { this.put(1, 2, O.BANNER); this.put(W - 2, 2, O.BANNER); this.put(W - 2, 7, O.PLANT); }
        if (mine) {
          const bx = 2, by = H - 3;
          this.objs[this.idx(bx, by)] = O.PLAYERBED; this.objs[this.idx(bx + 1, by)] = O.WARDROBE;
          this.playerBed = { x: bx, y: by };
        }
        this.spot('owner', W - 3, H - 4);
        break;
      }
      case 'library': {
        for (let x = 1; x < W - 1; x++) if (x !== dx) this.put(x, 2, x % 4 === 0 ? O.CANDLE : O.BOOKSHELF);
        for (let y = 4; y < H - 3; y += 3) { for (let x = 2; x <= 5; x++) this.put(x, y, O.BOOKSHELF); for (let x = W - 6; x <= W - 3; x++) this.put(x, y, O.BOOKSHELF); }
        this.table(dx, 5); this.table(dx, 8); this.put(dx + 2, 5, O.CANDLE); this.put(dx - 2, 8, O.CANDLE);
        this.put(1, H - 2, O.CRYSTAL); this.put(W - 2, H - 2, O.PLANT); this.put(dx + 3, 3, O.LECTERN);
        this.spot('owner', dx + 2, 3);
        break;
      }
      case 'refectory': {
        for (let x = 2; x <= 6; x++) this.put(x, 4, O.COUNTER);
        this.put(2, 2, O.CAULDRON); this.put(3, 2, O.KEG); this.put(5, 2, O.SHELF); this.put(6, 2, O.FIREPLACE);
        this.spot('owner', 4, 3);
        for (let y = 6; y < H - 2; y += 3) for (let x = 9; x <= W - 3; x++) { this.put(x, y, O.TABLE); this.put(x, y + 1, O.BENCH); }
        this.put(1, H - 2, O.BARREL); this.put(W - 2, 2, O.BANNER);
        this.seatSpots = [];
        for (let y = 7; y < H - 1; y += 3) for (let x = 9; x <= W - 3; x += 2) this.seatSpots.push({ x, y: y + 1 });
        break;
      }
      case 'fencing': {
        for (let y = 5; y < H - 3; y++) for (let x = 4; x < W - 4; x++) this.setFloor(x, y, T.SANDSTONE);
        for (let x = 2; x < W - 2; x += 2) this.put(x, 2, x % 4 === 0 ? O.WEAPONRACK : O.BANNER);
        for (let y = 5; y < H - 3; y += 3) { this.put(1, y, O.DUMMY); this.put(W - 2, y, O.DUMMY); }
        this.put(1, H - 2, O.BARREL); this.put(W - 2, H - 2, O.CRATE);
        this.spot('owner', dx, 4);
        break;
      }
      case 'gunsmith': {
        for (let x = 1; x < W - 1; x++) if (x !== dx) this.put(x, 2, x % 3 === 0 ? O.GASLAMP : O.GUNRACK);
        for (let x = 2; x <= W - 4; x++) this.put(x, 5, O.COUNTER);
        this.spot('owner', 4, 4);
        this.put(1, H - 3, O.WORKBENCH); this.put(W - 2, H - 3, O.BARREL); this.put(W - 2, H - 2, O.CRATE); this.put(1, H - 2, O.CRATE);
        break;
      }
      case 'factory': {
        for (let x = 2; x < W - 2; x += 5) this.wall(x, O.WINDOW);
        for (let x = 4; x < W - 2; x += 6) this.wall(x, O.GASLAMP);
        this.put(2, 2, O.BOILER); this.put(W - 3, 2, O.BOILER);
        for (let x = 4; x < W - 4; x += 3) this.put(x, 2, O.PIPES);
        for (let y = 5; y < H - 3; y += 4) for (let x = 3; x < W - 3; x += 5) if (Math.abs(x - dx) > 1) { this.put(x, y, O.MACHINE); this.spot('patron', x, y + 1); }
        this.put(1, H - 2, O.CRATE); this.put(2, H - 2, O.CRATE); this.put(W - 2, H - 2, O.BARREL); this.put(W - 3, H - 2, O.SACKS);
        this.spot('owner', dx + 2, H - 4);
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
  // ---------- Casas procedurais ----------
  buildHouse(r) {
    const W = this.w, H = this.h, dx = this.dx, b = this.b, cul = this.s.region.culture;
    const res = Game.residentsOf(b);
    const adults = res.filter(x => !x.child).length || 1, kids = res.filter(x => x.child).length;
    const wealth = r.pick([0, 1, 1, 1, 2, 2]);
    const jobs = { industrial: ['operario', 'operario', 'mosqueteiro', 'mercador', 'estudioso', 'tecela'], imperial: ['operario', 'mosqueteiro', 'mercador', 'estudioso', 'musico'], nordic: ['cacador', 'cacador', 'soldado', 'pescador', 'ferreiro'], orc: ['cacador', 'soldado', 'soldado', 'mineiro'], dwarf: ['mineiro', 'mineiro', 'ferreiro', 'soldado', 'estudioso'], elf: ['estudioso', 'musico', 'tecela', 'alquimista', 'cacador'], halfling: ['padeiro', 'padeiro', 'fazendeiro', 'musico', 'tecela'], desert: ['tecela', 'mercador', 'alquimista', 'estudioso'], swamp: ['pescador', 'alquimista', 'cacador'] }[cul] || ['fazendeiro', 'cacador', 'pescador', 'estudioso', 'padeiro', 'tecela', 'musico', 'soldado', 'alquimista', 'mercador', 'ferreiro'];
    const job = r.pick(jobs);
    this.profile = { wealth, job };
    // remove a decoração genérica da parede para redecorar por cômodo
    for (let x = 1; x < W - 1; x++) this.objs[this.idx(x, 1)] = 0;
    const reserved = new Set();
    const keep = (x, y) => reserved.add(x + ',' + y);
    // ---- cômodos
    const rooms = [];
    const full = { x0: 1, y0: 2, x1: W - 2, y1: H - 2 };
    let main = full;
    const wallCol = (x, y0, y1, door) => { for (let y = y0; y <= y1; y++) if (y !== door) this.tiles[this.idx(x, y)] = this.wallT; keep(x - 1, door); keep(x + 1, door); keep(x, door); };
    const wallRow = (y, x0, x1, door) => { for (let x = x0; x <= x1; x++) if (x !== door) this.tiles[this.idx(x, y)] = this.wallT; keep(door, y - 1); keep(door, y + 1); keep(door, y); };
    if (W >= 12 && r.chance(0.85)) {
      const left = r.chance(0.5);
      const sx = left ? r.int(4, Math.min(dx - 2, 6)) : r.int(Math.max(dx + 2, W - 7), W - 5);
      const door = r.int(3, H - 3);
      wallCol(sx, 2, H - 2, door);
      const side = left ? { x0: 1, y0: 2, x1: sx - 1, y1: H - 2 } : { x0: sx + 1, y0: 2, x1: W - 2, y1: H - 2 };
      main = left ? { x0: sx + 1, y0: 2, x1: W - 2, y1: H - 2 } : { x0: 1, y0: 2, x1: sx - 1, y1: H - 2 };
      if (H >= 10 && side.x1 - side.x0 >= 3 && r.chance(0.6)) {
        const sy = r.int(5, H - 5), d2 = r.int(side.x0, side.x1);
        wallRow(sy, side.x0, side.x1, d2);
        // a porta entre os cômodos precisa alcançar ambas as partes
        if (door > sy) { rooms.push({ ...side, y1: sy - 1, type: 'bedroom' }, { ...side, y0: sy + 1, type: 'kitchen' }); }
        else { rooms.push({ ...side, y1: sy - 1, type: 'kitchen' }, { ...side, y0: sy + 1, type: 'bedroom' }); }
        rooms.push({ ...main, type: 'living' });
      } else { rooms.push({ ...side, type: 'bedroom' }, { ...main, type: 'livingkitchen' }); }
    } else rooms.push({ ...full, type: 'all' });
    // ---- pisos
    const stone = cul === 'dwarf' || cul === 'desert' ? this.floorT : T.DCOBBLE;
    for (const rm of rooms) {
      if (rm.type === 'kitchen') for (let y = rm.y0; y <= rm.y1; y++) for (let x = rm.x0; x <= rm.x1; x++) this.setFloor(x, y, stone);
      if (wealth === 0 && cul !== 'dwarf' && rm.type !== 'bedroom' && r.chance(0.5)) for (let y = rm.y0; y <= rm.y1; y++) for (let x = rm.x0; x <= rm.x1; x++) if (r.chance(0.7)) this.setFloor(x, y, T.DIRT);
    }
    // ---- colocação segura (nunca bloqueia a passagem)
    const entry = { x: dx, y: H - 2 };
    const connected = () => {
      const seen = new Uint8Array(W * H), q = [entry.x + entry.y * W]; seen[q[0]] = 1; let n = 1;
      while (q.length) { const i = q.pop(), x = i % W, y = (i / W) | 0; for (const [ax, ay] of [[x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]]) { if (!this.inb(ax, ay)) continue; const j = ay * W + ax; if (seen[j] || this.solidAt(ax, ay)) continue; seen[j] = 1; n++; q.push(j); } }
      let tot = 0; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (!this.solidAt(x, y)) tot++;
      return n === tot;
    };
    const place = (x, y, o) => {
      if (reserved.has(x + ',' + y) || !this.free(x, y)) return false;
      this.objs[this.idx(x, y)] = o;
      if (OSOLID[o] && !connected()) { this.objs[this.idx(x, y)] = 0; return false; }
      return true;
    };
    const cells = (rm, pred) => { const out = []; for (let y = rm.y0; y <= rm.y1; y++) for (let x = rm.x0; x <= rm.x1; x++) if (pred(x, y)) out.push([x, y]); return r.shuffle(out); };
    const nearWall = (x, y) => TSOLID[this.tileAt(x - 1, y)] || TSOLID[this.tileAt(x + 1, y)] || TSOLID[this.tileAt(x, y - 1)];
    const topRow = (rm, o) => { for (const [x, y] of cells(rm, (x, y) => y === rm.y0)) if (place(x, y, o)) return [x, y]; return null; };
    const byWall = (rm, o) => { for (const [x, y] of cells(rm, nearWall)) if (place(x, y, o)) return [x, y]; return null; };
    const anywhere = (rm, o) => { for (const [x, y] of cells(rm, () => true)) if (place(x, y, o)) return [x, y]; return null; };
    const middle = (rm) => [Math.round((rm.x0 + rm.x1) / 2), Math.round((rm.y0 + rm.y1) / 2)];
    const tableSet = (rm) => {
      const [mx, my] = middle(rm);
      for (const [x, y] of [[mx, my], [mx - 1, my], [mx + 1, my], [mx, my + 1], [mx, my - 1]]) if (place(x, y, O.TABLE)) { place(x - 1, y, wealth ? O.CHAIR : O.CRATE); place(x + 1, y, O.CHAIR); return; }
    };
    const rug = (rm) => { if (rm.x1 - rm.x0 < 2 || rm.y1 - rm.y0 < 2) return; const [mx, my] = middle(rm); const o = (cul === 'nordic' || cul === 'orc' || job === 'cacador') ? O.PELT : O.RUG; if (this.free(mx, my + 1)) this.objs[this.idx(mx, my + 1)] = o; };
    const wallDecor = (rm, list) => { const xs = []; for (let x = rm.x0; x <= rm.x1; x++) if (TSOLID[this.tiles[this.idx(x, 1)]] && rm.y0 === 2) xs.push(x); r.shuffle(xs); list.forEach((o, i) => { if (xs[i] !== undefined) this.objs[this.idx(xs[i], 1)] = o; }); };
    const decorFor = () => {
      const L = [O.WINDOW];
      if (wealth >= 1) L.push(O.PAINTING); if (wealth >= 2) L.push(O.PAINTING);
      if (indus) L.push(O.GASLAMP, O.GASLAMP);
      if (job === 'cacador' || cul === 'nordic' || cul === 'orc') L.push(O.TROPHY);
      if (job === 'soldado' || cul === 'dwarf' || cul === 'nordic') L.push(O.SHIELDWALL);
      if (job === 'pescador') L.push(O.FISHNET);
      if (job === 'fazendeiro' || job === 'mineiro' || job === 'ferreiro') L.push(O.TOOLRACK);
      if (job === 'alquimista' || cul === 'swamp' || cul === 'halfling') L.push(O.HERBS);
      L.push(O.SHELFWALL);
      return L;
    };
    const indus = CULTURES[cul] && CULTURES[cul].industrial;
    const bedroom = (rm) => {
      wallDecor(rm, [O.WINDOW, wealth >= 1 ? O.PAINTING : O.SHELFWALL]);
      if (adults >= 2 && wealth >= 1) topRow(rm, O.BED); else for (let i = 0; i < Math.min(adults, 2); i++) topRow(rm, O.BEDSMALL);
      for (let i = 0; i < Math.min(kids, 3); i++) byWall(rm, O.BEDSMALL);
      byWall(rm, wealth ? O.WARDROBE : O.CRATE);
      if (wealth >= 1) byWall(rm, O.DRESSER);
      byWall(rm, O.CANDLE);
      if (kids) byWall(rm, O.TOYBOX);
      if (wealth >= 2) { byWall(rm, O.CLOCK); if (r.chance(0.5)) byWall(rm, O.BATHTUB); }
      if (indus) { if (r.chance(0.5)) byWall(rm, O.SEWING); }
      if (wealth >= 1) rug(rm);
    };
    const kitchen = (rm) => {
      wallDecor(rm, [O.WINDOW, O.SHELFWALL, O.HERBS]);
      topRow(rm, job === 'padeiro' || cul === 'halfling' ? O.OVEN : O.STOVE);
      if (job === 'padeiro') topRow(rm, O.STOVE);
      topRow(rm, O.COUNTER); byWall(rm, O.POTS); byWall(rm, O.SACKS); byWall(rm, r.pick([O.BARREL, O.KEG, O.CRATE]));
      if (cul === 'swamp' || job === 'alquimista') byWall(rm, O.CAULDRON);
    };
    const living = (rm, withKitchen) => {
      wallDecor(rm, decorFor());
      topRow(rm, O.FIREPLACE);
      rug(rm);
      if (withKitchen) { topRow(rm, cul === 'halfling' ? O.OVEN : O.STOVE); byWall(rm, O.POTS); byWall(rm, O.SACKS); byWall(rm, O.BARREL); }
      tableSet(rm);
      if (wealth >= 1) { byWall(rm, O.ARMCHAIR); byWall(rm, O.BOOKSHELF); byWall(rm, O.PLANT); } else byWall(rm, O.BENCH);
      if (wealth >= 2) { byWall(rm, O.ARMCHAIR); byWall(rm, r.chance(0.5) ? O.STATUE : O.CLOCK); byWall(rm, O.PLANT); }
      if (cul === 'elf') { byWall(rm, O.PLANT); byWall(rm, O.PLANT); }
      if (indus) { byWall(rm, O.GRAMOPHONE); if (wealth >= 1) byWall(rm, O.PIANO); byWall(rm, O.CLOCK); }
      // canto da profissão
      const J = { cacador: [O.WEAPONRACK, O.BARREL], fazendeiro: [O.SACKS, O.HAY, O.SACKS], pescador: [O.BARREL, O.BARREL], estudioso: [O.DESK, O.BOOKSHELF, O.BOOKSHELF, O.LECTERN], padeiro: [O.SACKS, O.SACKS, O.OVEN], tecela: [O.LOOM, O.CRATE], musico: [O.INSTRUMENT, O.INSTRUMENT], soldado: [O.ARMORSTAND, O.WEAPONRACK], alquimista: [O.ALCHEMY, O.POTSHELF], mercador: [O.CRATE, O.CRATE, O.BARREL, O.DESK], ferreiro: [O.ANVIL, O.WEAPONRACK], operario: [O.TOOLRACK, O.CRATE, O.PIPES], mosqueteiro: [O.GUNRACK, O.BARREL], mineiro: [O.CRATE, O.ROCK === 0 ? O.CRATE : O.BARREL] }[job] || [];
      for (const o of J) byWall(rm, o);
      if (job === 'estudioso') byWall(rm, O.CANDLE);
    };
    for (const rm of rooms) {
      if (rm.type === 'bedroom') bedroom(rm);
      else if (rm.type === 'kitchen') kitchen(rm);
      else if (rm.type === 'living') living(rm, false);
      else if (rm.type === 'livingkitchen') living(rm, true);
      else { // casa de um cômodo só
        wallDecor(rm, decorFor());
        topRow(rm, O.FIREPLACE);
        for (let i = 0; i < Math.min(adults + kids, 3); i++) topRow(rm, O.BEDSMALL);
        topRow(rm, cul === 'halfling' ? O.OVEN : O.STOVE); byWall(rm, wealth ? O.WARDROBE : O.CRATE); byWall(rm, O.POTS); byWall(rm, O.SACKS);
        rug(rm); tableSet(rm);
        const J = { cacador: O.WEAPONRACK, estudioso: O.DESK, tecela: O.LOOM, musico: O.INSTRUMENT, soldado: O.ARMORSTAND, alquimista: O.ALCHEMY, ferreiro: O.ANVIL }[job];
        if (J) byWall(rm, J);
        byWall(rm, O.CANDLE);
      }
    }
    // moradores andando pela casa
    const free = []; for (let y = 2; y < H - 2; y++) for (let x = 1; x < W - 1; x++) if (this.free(x, y)) free.push([x, y]);
    r.shuffle(free);
    res.forEach((rs, i) => { if (Game.player && Game.player.spouse === rs.id && Game.player.spouseHome) return; const [x, y] = free[i % Math.max(1, free.length)] || [dx, H - 3]; this.spot(rs.child ? 'child' : 'resident', x, y, { res: rs }); });
  }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : this.wallT; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx; const old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  // chão de fora da casa (em vez do vazio preto)
  outsideTile() {
    const bio = this.s.region.biome;
    if (BIOME_GROUND[bio]) return BIOME_GROUND[bio];
    return bio === 'snow' ? T.SNOW : bio === 'desert' ? T.DESERT : bio === 'volcanic' ? T.BADLAND : bio === 'swamp' ? T.MUD : bio === 'dead' ? T.DEADGRASS : bio === 'mountain' ? T.TUNDRA : bio === 'forest' ? T.DGRASS : T.GRASS;
  }
  render() {
    const M = this.M = 14, TW = this.w + M * 2, TH = this.h + M * 2;
    const c = Sprites.cv(TW * 16, TH * 16), ctx = c.getContext('2d');
    const out = this.outsideTile(), street = CULTURES[this.s.region.culture].street;
    const getT = (x, y) => {
      const ix = x - M, iy = y - M;
      if (this.inb(ix, iy)) return this.tiles[iy * this.w + ix];
      if (ix === this.dx && iy >= this.h && iy < this.h + 4) return street;      // caminho até a porta
      return out;
    };
    Sprites.paintTiles(ctx, TW, TH, getT, 7);
    // um pouco de natureza em volta
    const rng = new RNG(hashStr(this.b.name) + 99);
    const deco = out === T.SNOW ? [O.SNOWPINE, O.ROCK] : out === T.DESERT ? [O.CACTUS, O.ROCK] : out === T.BADLAND ? [O.ROCK, O.DEADTREE] : out === T.MUD ? [O.REEDS, O.WILLOW] : [O.FLOWERS, O.TALLGRASS, O.BUSH, O.FLOWERS, O.OAK];
    for (let i = 0; i < 70; i++) {
      const x = rng.int(0, TW - 1), y = rng.int(1, TH - 1), ix = x - M, iy = y - M;
      if (ix >= -2 && ix <= this.w + 1 && iy >= -3 && iy <= this.h + 4) continue;
      const o = rng.pick(deco), s = Sprites.obj(o, rng.int(0, (OBJ_VARIANTS[o] || 1) - 1));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    // sombra da casa sobre o chão de fora
    ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect((M + this.w) * 16, (M + 1) * 16, 6, this.h * 16); ctx.fillRect((M + 1) * 16, (M + this.h) * 16, this.w * 16, 4);
    for (let i = 0; i < this.w * this.h; i++) {
      const o = this.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w + M, y = ((i / this.w) | 0) + M;
      const s = Sprites.obj(o, Math.floor(hash2(x, y, 5) * (OBJ_VARIANTS[o] || 1)));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#3a5a2a'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(this.canvas, -camX - this.M * 16, -camY - this.M * 16);
  }
  // raios de sol entrando pelas janelas
  drawSunbeams(ctx, camX, camY) {
    const h = Game.time / 60;
    if (h < 6 || h > 19.5) return;
    const k = h < 9 ? (h - 6) / 3 : h > 16.5 ? (19.5 - h) / 3 : 1;
    const warm = h < 8 || h > 17;
    const lean = (h - 12.5) / 6;                                    // manhã: raio vai para a direita; tarde: esquerda
    ctx.save(); ctx.globalCompositeOperation = 'lighter';
    for (let x = 1; x < this.w - 1; x++) {
      if (this.objs[this.idx(x, 1)] !== O.WINDOW) continue;
      let len = 0; for (let y = 2; y < this.h - 1 && !TSOLID[this.tiles[this.idx(Math.min(this.w - 2, Math.max(1, Math.round(x - lean * (y - 2) * 0.8))), y)]]; y++) len++;
      len = Math.min(len, 5);
      if (!len) continue;
      const x0 = x * 16 + 4 - camX, y0 = 2 * 16 - camY, L = len * 16, sh = -lean * L * 0.8;
      const g = ctx.createLinearGradient(0, y0, 0, y0 + L);
      g.addColorStop(0, warm ? `rgba(255,170,80,${0.26 * k})` : `rgba(255,240,190,${0.24 * k})`); g.addColorStop(1, 'rgba(255,230,180,0)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + 8, y0); ctx.lineTo(x0 + 8 + sh + 6, y0 + L); ctx.lineTo(x0 + sh - 6, y0 + L); ctx.closePath(); ctx.fill();
      // poeira brilhando no raio
      for (let i = 0; i < 4; i++) { const t = (Game.t * 0.15 + i * 0.27 + x * 0.13) % 1; const px = x0 + 4 + sh * t + Math.sin(Game.t + i * 2 + x) * 4, py = y0 + L * t; ctx.fillStyle = `rgba(255,250,220,${0.5 * k * (1 - t)})`; ctx.fillRect(Math.round(px), Math.round(py), 1, 1); }
    }
    ctx.restore();
  }
}
