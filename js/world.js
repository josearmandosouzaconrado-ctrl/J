'use strict';
// ===================== MUNDO ABERTO PROCEDURAL =====================
const TSOLID = new Uint8Array(64), OSOLID = new Uint8Array(256), TWATER = new Uint8Array(64);
for (let i = 0; i < TILE_DEFS.length; i++) if (TILE_DEFS[i]) { TSOLID[i] = TILE_DEFS[i].solid ? 1 : 0; TWATER[i] = TILE_DEFS[i].water ? 1 : 0; }
for (let i = 0; i < OBJ_DEFS.length; i++) if (OBJ_DEFS[i]) OSOLID[i] = OBJ_DEFS[i].solid ? 1 : 0;
// objetos "chatos" pintados direto no chão do chunk
const OBJ_BAKED = new Uint8Array(256);
[O.FLOWERS, O.TALLGRASS, O.BONES, O.LILY, O.ROCK, O.SKULLS, O.CROP, O.RUG, O.PELT, O.HATCH, O.ROPE, O.MISTREED].forEach(o => OBJ_BAKED[o] = 1);
// terrenos que brilham no escuro (recifes, lagoas, cristais, poeira de estrelas)
const TGLOW = new Uint8Array(64);
for (let i = 0; i < TILE_DEFS.length; i++) if (TILE_DEFS[i] && TILE_DEFS[i].glow) TGLOW[i] = 1;
const OBJ_VARIANTS = { [O.COUNTER]: 2, [O.BEDSMALL]: 2, [O.PAINTING]: 4, [O.OAK]: 6, [O.AUTUMN]: 6, [O.PINE]: 6, [O.SNOWPINE]: 6, [O.PALM]: 4, [O.DEADTREE]: 3, [O.WILLOW]: 3, [O.ELFTREE]: 3, [O.BIGSHROOM]: 3, [O.CORALTREE]: 3, [O.WINDSPIRE]: 3, [O.CRYSTALSPIRE]: 3, [O.LIVETREE]: 3, [O.OBSIDSPIKE]: 2, [O.BAOBAB]: 2, [O.STARSHARD]: 2, [O.RUNEMONO]: 2, [O.DUSKBLOOM]: 2, [O.BUSH]: 3, [O.FLOWERS]: 4, [O.STALL]: 4, [O.TENT]: 3, [O.CRYSTAL]: 4, [O.BANNER]: 5, [O.LILY]: 2, [O.CACTUS]: 2, [O.LAMP]: 2, [O.BROKEN_PILLAR]: 3, [O.RUG]: 6, [O.POTS]: 3, [O.SACKS]: 2, [O.INSTRUMENT]: 2, [O.TROPHY]: 2, [O.ARMORSTAND]: 3, [O.SHELFWALL]: 3, [O.SHIELDWALL]: 4, [O.DRESSER]: 2, [O.ARMCHAIR]: 3 };
const TREE_OBJS = new Set([O.OAK, O.PINE, O.SNOWPINE, O.PALM, O.DEADTREE, O.WILLOW, O.AUTUMN, O.LIVETREE, O.BAOBAB]);
const QUARRY_OBJS = new Set([O.BOULDER, O.ICEROCK, O.SANDROCK]);
const OBJ_ANIM = new Uint8Array(256);
[O.CAMPFIRE, O.TORCH, O.RUNESTONE, O.FOUNTAIN, O.PORTAL, O.ALTAR, O.SHRINE, O.FORGE, O.FIREPLACE, O.CANDLE, O.CAULDRON, O.DESTINY, O.DESTINY2, O.DESTINY3, O.STOVE, O.OVEN, O.CLOCK, O.MACHINE, O.BOILER, O.GASLAMP, O.LANTERN].forEach(o => OBJ_ANIM[o] = 1);

const ORE_BY_REGION = {
  nyxhal: [O.ORE_OBSIDIANA, O.ORE_EBANO, O.ORE_OBSIDIANA],
  valdoria: [O.ORE_FERRO, O.ORE_FERRO, O.ORE_PRATA], colinas: [O.ORE_FERRO, O.ORE_PRATA], sylvaris: [O.ORE_PRATA, O.ORE_FERRO],
  khazdurim: [O.ORE_FERRO, O.ORE_OURO, O.ORE_PRATA, O.ORE_OURO], nordheim: [O.ORE_MALAQUITA, O.ORE_FERRO, O.ORE_MALAQUITA],
  gorthak: [O.ORE_OBSIDIANA, O.ORE_FERRO, O.ORE_OBSIDIANA], zahrim: [O.ORE_OURO, O.ORE_FERRO], ssarak: [O.ORE_FERRO, O.ORE_PRATA],
  morvath: [O.ORE_EBANO, O.ORE_OBSIDIANA, O.ORE_EBANO],
  voralis: [O.ORE_PRATA, O.ORE_MALAQUITA], zephyra: [O.ORE_PRATA, O.ORE_FERRO], thaldrim: [O.CRYSTALSPIRE, O.ORE_PRATA, O.ORE_OURO], silvania: [O.ORE_MALAQUITA, O.ORE_FERRO],
  krazul: [O.ORE_OBSIDIANA, O.ORE_OBSIDIANA, O.ORE_OURO], nimbor: [O.ORE_EBANO, O.ORE_PRATA], vaelith: [O.ORE_FERRO, O.ORE_OURO], xarqin: [O.STARSHARD, O.ORE_EBANO, O.ORE_PRATA],
  brumaria: [O.ORE_PRATA, O.ORE_FERRO, O.ORE_EBANO], terralux: [O.ORE_OURO, O.ORE_OURO, O.ORE_FERRO, O.ORE_MALAQUITA],
  talassa: [O.ORE_PRATA, O.ORE_FERRO, O.ORE_PRATA], azhkar: [O.ORE_OBSIDIANA, O.ORE_EBANO, O.ORE_OURO], shirokai: [O.ORE_FERRO, O.ORE_MALAQUITA, O.ORE_PRATA], ferrania: [O.ORE_FERRO, O.ORE_FERRO, O.ORE_PRATA], kharzul: [O.ORE_FERRO, O.ORE_OURO, O.ORE_EBANO, O.ORE_OURO], orkhai: [O.ORE_OBSIDIANA, O.ORE_FERRO], serpentis: [O.ORE_FERRO, O.ORE_PRATA, O.ORE_MALAQUITA],
  aurelion: [O.ORE_FERRO, O.ORE_PRATA, O.ORE_OURO], gromhald: [O.ORE_MALAQUITA, O.ORE_EBANO, O.ORE_FERRO], lunethar: [O.ORE_PRATA, O.ORE_MALAQUITA], rodafina: [O.ORE_FERRO, O.ORE_FERRO, O.ORE_OURO], kumari: [O.ORE_OURO, O.ORE_FERRO, O.ORE_OBSIDIANA], umbraval: [O.ORE_EBANO, O.ORE_OBSIDIANA, O.ORE_EBANO]
};

class World {
  constructor(seed) {
    this.seed = seed | 0;
    this.isWorld = true;
    this.nE = new Simplex(seed * 7 + 1); this.nM = new Simplex(seed * 7 + 2); this.nW = new Simplex(seed * 7 + 3);
    this.nR = new Simplex(seed * 7 + 4); this.nD = new Simplex(seed * 7 + 5); this.nL = new Simplex(seed * 7 + 6);
    this.regions = REGIONS.map(r => Object.assign({}, r, { cx: r.fx * WORLD_TILES, cy: r.fy * WORLD_TILES }));
    this.regC = [[], [], [], [], []]; this.regions.forEach((r, i) => this.regC[r.cont || 0].push(i));
    // relevo máximo das regiões de cada continente (para reconhecer mar aberto sem calcular tudo)
    this.maxMount = this.regC.map(l => l.reduce((m, i) => Math.max(m, this.regions[i].mount), 0));
    this.volcano = { x: VOLCANO.fx * WORLD_TILES, y: VOLCANO.fy * WORLD_TILES };
    this.chunks = new Map(); this.canvases = new Map();
    this.tick = 0;
    this.settlements = []; this.dungeons = []; this.pois = [];
    this.doors = new Map(); this.entrances = new Map(); this.signs = new Map(); this.poiAt = new Map();
    this.roadTiles = new Map(); this.stampIndex = new Map(); this.homes = [];
    this.mods = null; // estado de modificações (baús abertos etc.), injetado pelo jogo
    const t0 = performance.now();
    this.generateSites();
    this.genTime = performance.now() - t0;
  }

  // ---------- Amostragem do terreno ----------
  regionAt(x, y) {
    const wx = x + 150 * this.nW.noise(x / 520, y / 520), wy = y + 150 * this.nW.noise(x / 520 + 91.3, y / 520 + 47.1);
    let best = 0, bd = Infinity;
    for (const i of this.regC[contAt(x, y)]) { const r = this.regions[i]; const dx = wx - r.cx, dy = wy - r.cy, d = dx * dx + dy * dy; if (d < bd) { bd = d; best = i; } }
    return best;
  }
  baseTile(x, y) {
    const W = WORLD_TILES;
    if (x < 0 || y < 0 || x >= WORLD_W || y >= WORLD_H) { this._r = 0; this._e = 0; return T.DEEP; }
    const cont = contAt(x, y);
    const wx = x + 150 * this.nW.noise(x / 520, y / 520), wy = y + 150 * this.nW.noise(x / 520 + 91.3, y / 520 + 47.1);
    // quedas do relevo nas bordas de cada continente (aplicadas na mesma ordem de sempre)
    const F = this._F || (this._F = []); F.length = 0;
    if (!cont) {
      const nx = x / W * 2 - 1, ny = y / W * 2 - 1;
      const d = Math.max(Math.abs(nx), Math.abs(ny)) * 0.65 + Math.sqrt(nx * nx + ny * ny) * 0.35;
      if (d > 0.8) { const f = (d - 0.8) / 0.2; F.push(f * f * 0.75); }
    } else if (cont === 2) {
      // Valtheria: o Grande Continente do sul, maior que Eldoria
      const nx = (x - 4600) / 4400, ny = (y - 8250) / 3900;
      const d = Math.sqrt(nx * nx + ny * ny) * 0.72 + Math.max(Math.abs(nx), Math.abs(ny)) * 0.28 + this.nW.noise(x / 520, y / 520) * 0.07;
      if (d > 0.76) { const f = (d - 0.76) / 0.24; F.push(f * f * 0.85); }
      if (y < VALTHERIA_Y + 500) { const f = (VALTHERIA_Y + 500 - y) / 500; F.push(f * f); }   // oceano largo ao norte
    } else if (cont === 4) {
      // Elyndra: o maior de todos, com costas recortadas, baías e cabos
      const nx = (x - ELYNDRA.x) / ELYNDRA.rx, ny = (y - ELYNDRA.y) / ELYNDRA.ry;
      const d = Math.sqrt(nx * nx + ny * ny) * 0.7 + Math.max(Math.abs(nx), Math.abs(ny)) * 0.3 + this.nW.noise(x / 640, y / 640) * 0.09 + this.nW.noise(x / 170 + 33.3, y / 170 - 12.7) * 0.025;
      if (d > 0.78) { const f = (d - 0.78) / 0.22; F.push(f * f * 0.9); }
      if (x < ELYNDRA.x0 + 500) { const f = (ELYNDRA.x0 + 500 - x) / 500; F.push(f * f); }   // mar largo a oeste
    } else if (cont === 3) {
      // Ilha de Nyxhal: pequena, recortada e cercada de mar profundo
      const nx = (x - ISLE.x) / ISLE.rx, ny = (y - ISLE.y) / ISLE.ry;
      const d = Math.sqrt(nx * nx + ny * ny) + this.nW.noise(x / 160, y / 160) * 0.16;
      if (d > 0.6) { const f = (d - 0.6) / 0.4; F.push(f * f * 0.9 + (d > 1 ? 1 : 0)); }
    } else {
      // Kaeloria: continente alongado do outro lado do Mar das Brumas
      const nx = (x - 5180) / 760, ny = (y - 2048) / 1780;
      const d = Math.sqrt(nx * nx + ny * ny) * 0.75 + Math.max(Math.abs(nx), Math.abs(ny)) * 0.25 + this.nW.noise(x / 300, y / 300) * 0.08;
      if (d > 0.72) { const f = (d - 0.72) / 0.28; F.push(f * f * 0.85); }
    }
    const vdx = x - this.volcano.x, vdy = y - this.volcano.y, vd = Math.sqrt(vdx * vdx + vdy * vdy);
    const vb = vd < 150 ? (1 - vd / 150) ** 2 * 0.6 : 0;
    // mar aberto: nem o relevo mais alto passaria do nível do mar (pula o ruído caro, mesmo resultado)
    let fall = 0; for (const f of F) fall += f;
    if (1.1 + this.maxMount[cont] + vb - fall < 0.29) {
      let best = 0, bd = Infinity;
      for (const i of this.regC[cont]) { const r = this.regions[i], dx = wx - r.cx, dy = wy - r.cy, dd = dx * dx + dy * dy; if (dd < bd) { bd = dd; best = i; } }
      this._r = best; this._e = 1.1 + this.maxMount[cont] + vb - fall; this._m = 0.5; return T.DEEP;
    }
    const R = this.regions;
    let best = 0, bd = Infinity, mb = 0, ws = 0;
    for (const i of this.regC[cont]) {
      const r = R[i]; const dx = wx - r.cx, dy = wy - r.cy, d = dx * dx + dy * dy;
      if (d < bd) { bd = d; best = i; }
      const w = Math.exp(-d / 460800); mb += w * r.mount; ws += w;
    }
    mb = ws > 1e-6 ? mb / ws : 0;
    const reg = R[best]; this._r = best;
    let e = 0.5 + 0.6 * fbm(this.nE, x / 820, y / 820, 6) + mb;
    for (const f of F) e -= f;
    if (vd < 150) { const k = 1 - vd / 150; e += k * k * 0.6; }
    this._e = e;
    if (vd < 9) return T.LAVA;
    const m = fbm(this.nM, x / 420, y / 420, 4) * 0.5 + 0.5;
    this._m = m;
    const b = reg.biome;
    if (e < 0.3) return T.DEEP;
    if (e < 0.34) return b === 'snow' ? T.ICE : (b === 'volcanic' || b === 'obsidian') ? T.LAVA : b === 'reef' ? T.LUMWATER : T.WATER;
    if (e < 0.7 && b !== 'desert' && b !== 'volcanic' && b !== 'obsidian') {
      const rv = Math.abs(fbm(this.nR, x / 700, y / 700, 3));
      if (rv < 0.011) return b === 'snow' ? T.ICE : b === 'reef' ? T.LUMWATER : T.WATER;
    }
    if (e > 0.73 && cont === 4) return b === 'crystal' || b === 'cosmic' ? T.CRYSTALROCK : b === 'livestone' || b === 'savanna' ? T.CANYON : b === 'obsidian' ? T.VWALL : (e > 0.84 ? T.SNOWROCK : T.ROCK);
    if (e > 0.73) return (e > 0.84 || (b === 'snow' && e > 0.77) || (b === 'mountain' && e > 0.8)) ? T.SNOWROCK : T.ROCK;
    if (e < 0.365 && cont === 4) return b === 'obsidian' ? T.ASH : b === 'dusk' ? T.DUSKSAND : b === 'mist' ? T.MUD : b === 'cosmic' ? T.STARDUST : b === 'livestone' ? T.SANDSTONE : T.SAND;
    if (e < 0.365) return b === 'desert' ? T.DESERT : b === 'snow' ? T.SNOW : b === 'swamp' ? T.MUD : (b === 'volcanic' || b === 'dead') ? T.ASH : T.SAND;
    switch (b) {
      case 'plains': return m > 0.68 ? T.DGRASS : T.GRASS;
      case 'hills': return m > 0.72 ? T.DGRASS : T.GRASS;
      case 'forest': { const g = this.nD.noise(x / 90, y / 90); if (g > 0.5) return T.ELFGRASS; return m < 0.28 ? T.GRASS : T.DGRASS; }
      case 'mountain': if (e > 0.64) return T.SNOW; return m > 0.62 ? T.GRASS : T.TUNDRA;
      case 'snow': return m < 0.3 ? T.TUNDRA : T.SNOW;
      case 'volcanic': { const lv = this.nL.noise(x / 36, y / 36); if (lv > 0.66 && e > 0.42) return T.LAVA; return m > 0.52 ? T.ASH : T.BADLAND; }
      case 'desert': if (m > 0.84) return T.WATER; if (m > 0.77) return T.GRASS; return T.DESERT;
      case 'swamp': if (m > 0.7) return T.WATER; if (m > 0.52) return T.SWAMP; return m < 0.3 ? T.DGRASS : T.MUD;
      case 'dead': return m > 0.56 ? T.ASH : T.DEADGRASS;
      // ----- biomas inventados de Elyndra -----
      case 'reef': if (m > 0.66) return T.LUMWATER; if (m > 0.42) return T.CORAL; return m > 0.3 ? T.SAND : T.DGRASS;
      case 'windland': if (m > 0.78) return T.GRASS; return m < 0.18 ? T.TUNDRA : T.WINDGRASS;
      case 'crystal': { const lv = this.nL.noise(x / 50, y / 50); return (m > 0.36 || lv > 0.4) ? T.CRYSTALF : T.TUNDRA; }
      case 'liveforest': { const g = this.nD.noise(x / 90, y / 90); if (g > 0.45) return T.ELFGRASS; return m < 0.28 ? T.DGRASS : T.LIVEMOSS; }
      case 'obsidian': { const lv = this.nL.noise(x / 40, y / 40); if (lv > 0.6 && e > 0.42) return T.LAVA; return m > 0.62 ? T.ASH : T.OBSIDIAN; }
      case 'dusk': return m > 0.76 ? T.DEADGRASS : T.DUSKSAND;
      case 'savanna': if (m > 0.86) return T.WATER; return m < 0.2 ? T.DIRT : T.SAVANNA;
      case 'cosmic': { const lv = this.nL.noise(x / 70, y / 70); return lv > 0.6 ? T.CRYSTALF : T.STARDUST; }
      case 'mist': if (m > 0.74) return T.SWAMP; return m < 0.24 ? T.MUD : T.MISTHEATH;
      case 'livestone': { const cn = Math.abs(this.nR.noise(x / 150, y / 150)); if (cn < 0.05 && e > 0.45 && e < 0.7) return T.CANYON; return m > 0.72 ? T.SANDSTONE : T.LIVESTONE; }
    }
    return T.GRASS;
  }
  isLand(x, y) { const t = this.baseTile(x, y); return !TSOLID[t] && !TWATER[t] && t !== T.LAVA; }

  // ---------- Objetos naturais ----------
  natObj(x, y, t, ri) {
    const h = hash2(x, y, this.seed + 101);
    const reg = this.regions[ri];
    const dens = this.nD.noise(x / 46, y / 46);
    const treeP = (base, mul) => base + Math.max(0, dens) * mul;
    switch (t) {
      case T.GRASS: {
        if (reg.biome === 'desert') { if (h < 0.06) return O.PALM; if (h < 0.1) return O.BUSH; return 0; }
        const tp = reg.biome === 'hills' ? treeP(0.006, 0.07) : reg.biome === 'mountain' ? treeP(0.01, 0.05) : treeP(0.004, 0.09);
        if (h < tp) return reg.biome === 'hills' ? (h < tp * 0.4 ? O.AUTUMN : O.OAK) : reg.biome === 'mountain' ? O.PINE : (hash2(x, y, 7) < 0.15 ? O.AUTUMN : O.OAK);
        if (h < tp + 0.012) return O.BUSH;
        if (h < tp + 0.05 + (reg.biome === 'hills' ? 0.05 : 0)) return O.FLOWERS;
        if (h < tp + 0.11) return O.TALLGRASS;
        if (h < tp + 0.116) return O.ROCK;
        if (h < tp + 0.1185) return O.HERB_RED;
        if (h < tp + 0.1195) return O.BOULDER;
        return 0;
      }
      case T.DGRASS: {
        const tp = treeP(0.18, 0.3);
        if (h < tp) { const k = hash2(x, y, 9); if (reg.biome === 'liveforest') return O.LIVETREE; if (reg.biome === 'reef') return O.PALM; return reg.biome === 'swamp' ? O.WILLOW : k < 0.25 ? O.PINE : (reg.biome === 'hills' && k < 0.45) ? O.AUTUMN : O.OAK; }
        if (h < tp + 0.03) return O.BUSH;
        if (h < tp + 0.07) return O.TALLGRASS;
        if (h < tp + 0.074) return O.HERB_RED;
        if (h < tp + 0.078) return O.HERB_SHROOM;
        if (h < tp + 0.079) return O.BIGSHROOM;
        return 0;
      }
      case T.ELFGRASS: {
        if (h < treeP(0.05, 0.08)) return O.ELFTREE;
        if (h < 0.15) return O.FLOWERS;
        if (h < 0.165) return O.HERB_BLUE;
        if (h < 0.172) return O.BIGSHROOM;
        if (h < 0.2) return O.TALLGRASS;
        return 0;
      }
      case T.SNOW: {
        if (h < treeP(0.02, 0.16)) return O.SNOWPINE;
        if (h < 0.17) return O.ROCK;
        if (h < 0.18) return O.ICEROCK;
        if (h < 0.184) return O.HERB_ICE;
        if (h < 0.1845) return O.CRYSTAL;
        return 0;
      }
      case T.TUNDRA: {
        if (h < treeP(0.02, 0.08)) return O.PINE;
        if (h < 0.15) return O.ROCK;
        if (h < 0.165) return O.BOULDER;
        if (h < 0.2) return O.TALLGRASS;
        if (h < 0.204) return O.HERB_ICE;
        return 0;
      }
      case T.DESERT: {
        if (h < 0.006) return O.CACTUS;
        if (h < 0.012) return O.SANDROCK;
        if (h < 0.016) return O.BONES;
        if (h < 0.0175) return O.HERB_FIRE;
        return 0;
      }
      case T.SAND: { if (h < 0.01 && reg.biome !== 'snow') return O.PALM; if (h < 0.025) return O.ROCK; return 0; }
      case T.SWAMP: case T.MUD: {
        if (h < treeP(0.04, 0.12)) return hash2(x, y, 3) < 0.3 ? O.DEADTREE : O.WILLOW;
        if (h < 0.2) return O.REEDS;
        if (h < 0.215) return O.HERB_SHROOM;
        if (h < 0.22) return O.BIGSHROOM;
        return 0;
      }
      case T.WATER: { if (reg.biome === 'swamp' && h < 0.08) return O.LILY; if (h < 0.01) return O.REEDS; return 0; }
      case T.BADLAND: case T.ASH: {
        if (h < 0.02) return O.DEADTREE;
        if (h < 0.06) return O.ROCK;
        if (h < 0.075) return O.BOULDER;
        if (h < 0.08) return O.HERB_FIRE;
        if (h < 0.083) return O.BONES;
        return 0;
      }
      // ----- Elyndra -----
      case T.CORAL: { if (h < 0.05) return O.CORALTREE; if (h < 0.065) return O.CRYSTAL; if (h < 0.1) return O.ROCK; if (h < 0.104) return O.HERB_BLUE; return 0; }
      case T.LUMWATER: { if (h < 0.04) return O.LILY; return 0; }
      case T.WINDGRASS: { if (h < 0.009) return O.WINDSPIRE; if (h < 0.022) return O.BUSH; if (h < 0.07) return O.TALLGRASS; if (h < 0.1) return O.FLOWERS; if (h < 0.102) return O.HERB_BLUE; return 0; }
      case T.CRYSTALF: { if (h < 0.01) return O.CRYSTALSPIRE; if (h < 0.028) return O.CRYSTAL; if (h < 0.05) return O.ROCK; return 0; }
      case T.LIVEMOSS: { const tp = treeP(0.08, 0.2); if (h < tp) return O.LIVETREE; if (h < tp + 0.008) return O.BIGSHROOM; if (h < tp + 0.05) return O.FLOWERS; if (h < tp + 0.09) return O.TALLGRASS; if (h < tp + 0.095) return O.HERB_RED; if (h < tp + 0.098) return O.HERB_SHROOM; return 0; }
      case T.OBSIDIAN: { if (h < 0.018) return O.OBSIDSPIKE; if (h < 0.04) return O.ROCK; if (h < 0.044) return O.HERB_FIRE; if (h < 0.046) return O.BONES; return 0; }
      case T.DUSKSAND: { if (h < 0.01) return O.BROKEN_PILLAR; if (h < 0.026) return O.DUSKBLOOM; if (h < 0.034) return O.DEADTREE; if (h < 0.045) return O.ROCK; return 0; }
      case T.SAVANNA: { if (h < 0.005) return O.BAOBAB; if (h < 0.025) return O.BUSH; if (h < 0.12) return O.TALLGRASS; if (h < 0.123) return O.BONES; return 0; }
      case T.STARDUST: { if (h < 0.01) return O.STARSHARD; if (h < 0.022) return O.CRYSTAL; if (h < 0.04) return O.ROCK; return 0; }
      case T.MISTHEATH: { if (h < 0.025) return O.DEADTREE; if (h < 0.13) return O.MISTREED; if (h < 0.136) return O.HERB_SHROOM; if (h < 0.14) return O.GRAVE; return 0; }
      case T.LIVESTONE: { if (h < 0.005) return O.RUNEMONO; if (h < 0.018) return O.BOULDER; if (h < 0.028) return O.SANDROCK; if (h < 0.032) return O.CACTUS; return 0; }
      case T.DEADGRASS: {
        if (h < treeP(0.02, 0.08)) return O.DEADTREE;
        if (h < 0.11) return O.BONES;
        if (h < 0.12) return O.GRAVE;
        if (h < 0.14) return O.ROCK;
        if (h < 0.145) return O.SKULLS;
        return 0;
      }
    }
    return 0;
  }

  // ---------- Chunks ----------
  ckey(cx, cy) { return cy * 1024 + cx; }
  getChunk(cx, cy) {
    const k = cy * 1024 + cx;
    let ch = this.chunks.get(k);
    if (ch) { ch.t = this.tick; return ch; }
    ch = this.genChunk(cx, cy);
    ch.t = this.tick;
    this.chunks.set(k, ch);
    if (this.chunks.size > 420) this.evictChunks();
    return ch;
  }
  evictChunks() {
    const arr = [...this.chunks.entries()].sort((a, b) => a[1].t - b[1].t);
    for (let i = 0; i < 120; i++) { this.chunks.delete(arr[i][0]); this.dropCanvas(arr[i][0]); }
  }
  // as imagens do chão (512x512) são reaproveitadas em vez de criar uma nova a cada trecho
  dropCanvas(k) {
    const c = this.canvases.get(k); if (!c) return;
    this.canvases.delete(k);
    const pool = this.cvPool || (this.cvPool = []);
    if (pool.length < 4) pool.push(c);
  }
  genChunk(cx, cy) {
    const tiles = new Uint8Array(1024), objs = new Uint8Array(1024), reg = new Uint8Array(1024);
    const x0 = cx * 32, y0 = cy * 32;
    for (let ly = 0; ly < 32; ly++) for (let lx = 0; lx < 32; lx++) {
      const i = ly * 32 + lx;
      tiles[i] = this.baseTile(x0 + lx, y0 + ly);
      reg[i] = this._r;
    }
    const k = cy * 1024 + cx;
    const roads = this.roadTiles.get(k);
    const isRoad = new Uint8Array(1024);
    if (roads) for (const i of roads) {
      const t = tiles[i];
      tiles[i] = (TWATER[t] || t === T.LAVA) ? T.BRIDGE : T.ROAD;
      isRoad[i] = 1;
    }
    for (let ly = 0; ly < 32; ly++) for (let lx = 0; lx < 32; lx++) {
      const i = ly * 32 + lx;
      if (isRoad[i]) continue;
      const t = tiles[i];
      let o = this.natObj(x0 + lx, y0 + ly, t, reg[i]);
      // vizinhos de estrada: sem árvores
      if (o && OSOLID[o] && ((lx > 0 && isRoad[i - 1]) || (lx < 31 && isRoad[i + 1]) || (ly > 0 && isRoad[i - 32]) || (ly < 31 && isRoad[i + 32]))) o = 0;
      // minérios perto de montanhas
      if (!o && !TSOLID[t] && !TWATER[t] && lx > 0 && lx < 31 && ly > 0 && ly < 31) {
        const nr = (tt) => tt === T.ROCK || tt === T.SNOWROCK || tt === T.CRYSTALROCK || tt === T.CANYON || tt === T.VWALL;
        if (nr(tiles[i - 1]) || nr(tiles[i + 1]) || nr(tiles[i - 32]) || nr(tiles[i + 32])) {
          const h = hash2(x0 + lx, y0 + ly, this.seed + 555);
          if (h < 0.045) { const list = ORE_BY_REGION[this.regions[reg[i]].id]; o = list[Math.floor(hash2(x0 + lx, y0 + ly, 77) * list.length)]; }
          else if (h < 0.08) o = O.BOULDER;
        }
      }
      // baús perdidos
      if (!o && !TSOLID[t] && !TWATER[t] && t !== T.LAVA && hash2(x0 + lx, y0 + ly, this.seed + 999) < 0.00035) o = O.CHEST;
      objs[i] = o;
    }
    // carimbos (cidades, masmorras, acampamentos)
    const st = this.stampIndex.get(k);
    if (st) for (const s of st) {
      const ax0 = Math.max(x0, s.x0), ay0 = Math.max(y0, s.y0), ax1 = Math.min(x0 + 32, s.x0 + s.w), ay1 = Math.min(y0 + 32, s.y0 + s.h);
      for (let y = ay0; y < ay1; y++) for (let x = ax0; x < ax1; x++) {
        const j = (y - s.y0) * s.w + (x - s.x0), i = (y - y0) * 32 + (x - x0);
        const tt = s.tiles[j]; if (tt !== 255) tiles[i] = tt;
        const oo = s.objs[j]; if (oo !== 255) objs[i] = oo;
      }
    }
    // modificações do jogador
    if (this.mods && this.mods.treasures) for (const t of this.mods.treasures) {
      if (t.x >= x0 && t.y >= y0 && t.x < x0 + 32 && t.y < y0 + 32) { const i = (t.y - y0) * 32 + (t.x - x0); objs[i] = O.CHEST_BOSS; if (TSOLID[tiles[i]] || TWATER[tiles[i]]) tiles[i] = T.DIRT; }
    }
    if (this.mods) {
      for (let ly = 0; ly < 32; ly++) for (let lx = 0; lx < 32; lx++) {
        const i = ly * 32 + lx, o = objs[i];
        if (!o) continue;
        const def = OBJ_DEFS[o];
        if (o === O.CHEST || o === O.CHEST_BOSS) { if (this.mods.opened.has(tkey(x0 + lx, y0 + ly))) objs[i] = O.CHEST_OPEN; }
        else if (def.harvest) { const d = this.mods.harvested[tkey(x0 + lx, y0 + ly)]; if (d !== undefined && this.mods.day - d < 3) objs[i] = 0; }
        else if (TREE_OBJS.has(o)) { const d = this.mods.harvested[tkey(x0 + lx, y0 + ly)]; if (d !== undefined && this.mods.day - d < 5) objs[i] = O.STUMP; }
        else if (QUARRY_OBJS.has(o) || o === O.CROP) { const d = this.mods.harvested[tkey(x0 + lx, y0 + ly)]; if (d !== undefined && this.mods.day - d < (o === O.CROP ? 2 : 7)) objs[i] = 0; }
      }
    }
    return { cx, cy, tiles, objs, reg, t: 0 };
  }
  tileAt(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return T.DEEP;
    return this.getChunk(tx >> 5, ty >> 5).tiles[((ty & 31) << 5) | (tx & 31)];
  }
  objAt(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return 0;
    return this.getChunk(tx >> 5, ty >> 5).objs[((ty & 31) << 5) | (tx & 31)];
  }
  regAt(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return 0;
    return this.getChunk(tx >> 5, ty >> 5).reg[((ty & 31) << 5) | (tx & 31)];
  }
  // objetos desenhados em pé (árvores, postes...) de um trecho, numa lista pronta
  objList(cx, cy) {
    const ch = this.getChunk(cx, cy);
    if (ch.objList) return ch.objList;
    const out = [], x0 = cx * 32, y0 = cy * 32;
    for (let i = 0; i < 1024; i++) {
      const o = ch.objs[i]; if (!o || OBJ_BAKED[o] || o === O.BLOCK) continue;
      const tx = x0 + (i & 31), ty = y0 + (i >> 5), nv = OBJ_VARIANTS[o] || 1;
      out.push([tx, ty, o, nv > 1 ? Math.floor(hash2(tx, ty, 5) * nv) : 0]);
    }
    return (ch.objList = out);
  }
  lightList(cx, cy) {
    const ch = this.getChunk(cx, cy);
    if (ch.lightList) return ch.lightList;
    const objs = [], lava = [], x0 = cx * 32, y0 = cy * 32;
    for (let i = 0; i < 1024; i++) {
      const tx = x0 + (i & 31), ty = y0 + (i >> 5), o = ch.objs[i];
      if (o && OBJ_DEFS[o].light) objs.push([tx, ty, o]);
      if (ch.tiles[i] === T.LAVA && (tx + ty) % 2 === 0) lava.push([tx, ty]);
      else if (TGLOW[ch.tiles[i]] && hash2(tx, ty, 3) < 0.04) lava.push([tx, ty]);
    }
    return (ch.lightList = { objs, lava });
  }
  setObj(tx, ty, o) {
    const ch = this.getChunk(tx >> 5, ty >> 5); const i = ((ty & 31) << 5) | (tx & 31);
    const old = ch.objs[i]; ch.objs[i] = o;
    if (OBJ_BAKED[old] || OBJ_BAKED[o]) { const k = this.ckey(tx >> 5, ty >> 5); this.dropCanvas(k); if (this.pending && this.pending.k === k) this.pending = null; }
    ch.objList = null; ch.lightList = null;
  }
  solidAt(tx, ty) {
    if (tx < 0 || ty < 0 || tx >= WORLD_W || ty >= WORLD_H) return true;
    const ch = this.getChunk(tx >> 5, ty >> 5); const i = ((ty & 31) << 5) | (tx & 31);
    return TSOLID[ch.tiles[i]] || OSOLID[ch.objs[i]];
  }
  chunkCanvas(cx, cy) {
    const k = this.ckey(cx, cy);
    let c = this.canvases.get(k);
    if (c) { this.canvases.delete(k); this.canvases.set(k, c); return c; }
    // termina na hora um trecho que estava sendo pintado aos poucos (ou pinta um novo inteiro)
    const job = this.pending && this.pending.k === k ? this.pending : this.chunkJob(cx, cy);
    if (job === this.pending) this.pending = null;
    this.paintRows(job, 32);
    return this.finishChunk(job);
  }
  chunkJob(cx, cy) {
    const ch = this.getChunk(cx, cy), c = (this.cvPool && this.cvPool.pop()) || Sprites.cv(CHUNK_PX, CHUNK_PX), x0 = cx * 32, y0 = cy * 32;
    c.getContext('2d').clearRect(0, 0, CHUNK_PX, CHUNK_PX);
    const getT = (lx, ly) => (lx >= 0 && ly >= 0 && lx < 32 && ly < 32) ? ch.tiles[ly * 32 + lx] : this.tileAt(x0 + lx, y0 + ly);
    return { k: this.ckey(cx, cy), cx, cy, ch, c, ctx: c.getContext('2d'), getT, row: 0 };
  }
  paintRows(job, n) {
    const r0 = job.row, r1 = Math.min(32, r0 + n); if (r1 <= r0) return;
    const x0 = job.cx * 32, y0 = job.cy * 32 + r0;
    job.ctx.setTransform(1, 0, 0, 1, 0, r0 * 16);
    Sprites.paintTiles(job.ctx, 32, r1 - r0, (lx, ly) => job.getT(lx, ly + r0), this.seed, x0, y0);
    job.ctx.setTransform(1, 0, 0, 1, 0, 0);
    job.row = r1;
  }
  finishChunk(job) {
    const { ch, ctx, c, k } = job, x0 = job.cx * 32, y0 = job.cy * 32;
    for (let i = 0; i < 1024; i++) {
      const o = ch.objs[i];
      if (!OBJ_BAKED[o]) continue;
      const lx = i & 31, ly = i >> 5;
      const nv = OBJ_VARIANTS[o] || 1;
      const s = Sprites.obj(o, Math.floor(hash2(x0 + lx, y0 + ly, 5) * nv));
      ctx.drawImage(s.c, lx * 16 + 8 - (s.w >> 1), ly * 16 + 16 - s.h + s.oy);
    }
    this.canvases.set(k, c);
    if (this.canvases.size > 20) this.dropCanvas(this.canvases.keys().next().value);
    return c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    const cx0 = Math.floor(camX / CHUNK_PX), cy0 = Math.floor(camY / CHUNK_PX);
    const cx1 = Math.floor((camX + vw) / CHUNK_PX), cy1 = Math.floor((camY + vh) / CHUNK_PX);
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      if (cx < 0 || cy < 0 || cx >= WORLD_W / 32 || cy >= WORLD_H / 32) { ctx.fillStyle = '#1f4a8a'; ctx.fillRect(cx * CHUNK_PX - camX, cy * CHUNK_PX - camY, CHUNK_PX, CHUNK_PX); continue; }
      ctx.drawImage(this.chunkCanvas(cx, cy), cx * CHUNK_PX - camX, cy * CHUNK_PX - camY);
    }
  }
  // Pré-gera chunks próximos aos poucos
  // pinta com antecedência os trechos à frente do jogador, 8 linhas por quadro (sem engasgos)
  pregen(px, py) {
    if (this.pending) { this.paintRows(this.pending, 8); if (this.pending.row >= 32) { this.finishChunk(this.pending); this.pending = null; } return; }
    const cx = Math.floor(px / CHUNK_PX), cy = Math.floor(py / CHUNK_PX);
    for (let r = 0; r <= 1; r++) for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
      const k = this.ckey(cx + dx, cy + dy);
      if (!this.canvases.has(k) && cx + dx >= 0 && cy + dy >= 0 && cx + dx < WORLD_W / 32 && cy + dy < WORLD_H / 32) { this.pending = this.chunkJob(cx + dx, cy + dy); this.paintRows(this.pending, 8); return; }
    }
  }

  // ---------- Geração de locais ----------
  addStamp(s) {
    const cx0 = Math.floor(s.x0 / 32), cy0 = Math.floor(s.y0 / 32), cx1 = Math.floor((s.x0 + s.w - 1) / 32), cy1 = Math.floor((s.y0 + s.h - 1) / 32);
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) {
      const k = this.ckey(cx, cy);
      if (!this.stampIndex.has(k)) this.stampIndex.set(k, []);
      this.stampIndex.get(k).push(s);
    }
  }
  findLand(cx, cy, rng, radius, test) {
    for (let i = 0; i < 400; i++) {
      const rr = radius * Math.sqrt(i / 400 + 0.02);
      const a = rng.range(0, Math.PI * 2);
      const x = Math.round(cx + Math.cos(a) * rr * rng.next()), y = Math.round(cy + Math.sin(a) * rr * rng.next());
      if (x < 80 || y < 80 || x > WORLD_W - 80 || y > WORLD_H - 80) continue;
      if (test(x, y)) return { x, y };
    }
    return null;
  }
  farFrom(x, y, list, d) { for (const o of list) if (Math.abs(o.x - x) < d && Math.abs(o.y - y) < d && dist(o.x, o.y, x, y) < d) return false; return true; }

  generateSites() {
    const rng = new RNG(this.seed * 31 + 17);
    const all = [];
    let sid = 0;
    // ---- Assentamentos
    for (const reg of this.regions) {
      if (reg.cont) continue;
      const names = SETTLEMENT_NAMES[reg.id];
      const pool = rng.shuffle(names.list.slice());
      const types = [];
      if (!reg.hostile) types.push('capital');
      for (let i = 0; i < reg.towns; i++) types.push('town');
      for (let i = 0; i < reg.villages; i++) types.push('village');
      for (const type of types) {
        const size = type === 'capital' ? 50 : type === 'town' ? 34 : 24;
        const half = size / 2 + 4;
        const ok = (x, y) => {
          if (this.regionAt(x, y) !== reg.index) return false;
          const pts = [[0, 0], [-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [0, half], [-half, 0], [half, 0]];
          let bad = 0;
          for (const [dx, dy] of pts) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA) return false; if (TSOLID[t] || TWATER[t]) bad++; }
          if (bad > 2) return false;
          if (dist(x, y, this.volcano.x, this.volcano.y) < 190) return false;
          return this.farFrom(x, y, all, type === 'village' ? 75 : 110);
        };
        let pos = null;
        if (type === 'capital' || (reg.hostile && type === 'town')) pos = this.findLand(reg.cx, reg.cy, rng, 220, ok);
        if (!pos) pos = this.findLand(reg.cx, reg.cy, rng, type === 'town' ? 560 : 680, ok);
        if (!pos) continue;
        const name = type === 'capital' || reg.hostile ? names.cap : (pool.pop() || ('Vila ' + sid));
        const s = { id: 's' + (sid++), name, type, region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y };
        all.push(s); this.settlements.push(s);
      }
    }
    for (const s of this.settlements) this.layoutSettlement(s);
    // ---- Masmorras únicas
    let did = 0;
    const dungeonList = [];
    for (const u of UNIQUE_DUNGEONS) {
      const reg = REGION_BY_ID[u.region];
      const R = this.regions[reg.index];
      let pos = null;
      if (u.volcano) {
        for (let r = 30; r < 200; r++) { const x = Math.round(this.volcano.x), y = Math.round(this.volcano.y + r); if (this.isLand(x, y) && this.isLand(x, y + 2)) { pos = { x, y: y + 1 }; break; } }
      } else {
        const tx = R.cx + (u.off ? u.off[0] : 0) * WORLD_TILES, ty = R.cy + (u.off ? u.off[1] : 0) * WORLD_TILES;
        pos = this.findLand(tx, ty, rng, 160, (x, y) => this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.68 && this.farFrom(x, y, all, 40) && this.farFrom(x, y, dungeonList, 30));
      }
      if (!pos) pos = { x: Math.round(R.cx + 60), y: Math.round(R.cy + 60) };
      const d = { id: u.id, uid: did++, name: u.name, type: u.type, boss: u.boss, lvl: u.lvl, size: u.size, x: pos.x, y: pos.y, region: R, unique: u, reward: u.reward, bonus: u.bonus };
      dungeonList.push(d);
    }
    // ---- Masmorras comuns
    for (const R of this.regions) {
      if (R.cont) continue;
      const types = REGION_DUNGEONS[R.id];
      for (let i = 0; i < R.dungeons; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 720, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.69 && this.farFrom(x, y, all, 36) && this.farFrom(x, y, dungeonList, 34));
        if (!pos) continue;
        const type = rng.pick(types);
        const dt = DUNGEON_TYPES[type];
        const lvl = rng.int(R.lvl[0], R.lvl[1]);
        const d = { id: 'd' + did, uid: did++, name: dt.name + ' ' + rng.pick(DUNGEON_NOUNS), type, boss: dt.boss, lvl, size: rng.int(44, 60), x: pos.x, y: pos.y, region: R };
        dungeonList.push(d);
      }
    }
    for (const d of dungeonList) { this.stampDungeon(d); this.dungeons.push(d); }
    this.dungeonById = {}; for (const d of this.dungeons) this.dungeonById[d.id] = d;
    // ---- Acampamentos, pedras rúnicas e santuários
    let pid = 0;
    for (const R of this.regions) {
      if (R.cont) continue;
      const nc = R.hostile ? 3 : 3;
      for (let i = 0; i < nc; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 650, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this._e < 0.66 && this.farFrom(x, y, all, 60) && this.farFrom(x, y, dungeonList, 25) && this.farFrom(x, y, this.pois, 40));
        if (!pos) continue;
        const p = { id: 'camp' + (pid++), kind: 'camp', x: pos.x, y: pos.y, region: R, lvl: rng.int(R.lvl[0], R.lvl[1]), name: (R.id === 'gorthak' ? 'Acampamento Orc' : R.hostile ? 'Acampamento de Cultistas' : 'Acampamento Bandido') };
        this.stampCamp(p, rng); this.pois.push(p);
      }
      const ns = 2;
      for (let i = 0; i < ns; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 600, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, all, 40) && this.farFrom(x, y, this.pois, 40) && this.farFrom(x, y, dungeonList, 20));
        if (!pos) continue;
        const p = { id: 'shrine' + (pid++), kind: 'shrine', x: pos.x, y: pos.y, region: R, name: 'Santuário' };
        this.stampSmall(p, O.SHRINE, rng); this.pois.push(p);
      }
    }
    const runeRegions = ['nordheim', 'nordheim', 'khazdurim', 'valdoria', 'sylvaris', 'gorthak', 'zahrim', 'morvath', 'ssarak', 'colinas'];
    const runeShouts = ['forca', 'gelo', 'forca', 'etereo', 'tempo', 'fogo', 'etereo', 'dragao', 'gelo', 'fogo'];
    runeRegions.forEach((rid, i) => {
      const R = this.regions[REGION_BY_ID[rid].index];
      const pos = this.findLand(R.cx, R.cy, rng, 650, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, all, 50) && this.farFrom(x, y, this.pois, 30) && this.farFrom(x, y, dungeonList, 20));
      if (!pos) return;
      const p = { id: 'rune' + i, kind: 'runestone', x: pos.x, y: pos.y, region: R, shout: runeShouts[i], name: 'Pedra Rúnica' };
      this.stampSmall(p, O.RUNESTONE, rng); this.pois.push(p);
    });
    this.placeAcademy();
    // ---- Estradas
    this.buildRoads(rng);
    this.placeDestiny();
    this.generateKaeloria();
    this.generateValtheria();
    this.generateIsland();
    this.generateElyndra();
    // placas
    for (const s of this.settlements) {
      for (const g of s.gates) {
        const sx = g.x + (g.dir === 'n' || g.dir === 's' ? 3 : 0), sy = g.y + (g.dir === 'e' || g.dir === 'w' ? -3 : 0) + (g.dir === 'n' ? -1 : g.dir === 's' ? 1 : 0);
        const st = { x0: sx, y0: sy, w: 1, h: 1, tiles: new Uint8Array([255]), objs: new Uint8Array([O.SIGN]) };
        this.addStamp(st);
        this.signs.set(tkey(sx, sy), s);
      }
    }
  }

  // ---------- Kaeloria: o continente de além-mar ----------
  generateKaeloria() {
    const rng = new RNG(this.seed * 53 + 29);
    const regs = this.regions.filter(r => r.cont === 1);
    const made = [];
    let sid = 0;
    for (const reg of regs) {
      const names = SETTLEMENT_NAMES[reg.id], pool = rng.shuffle(names.list.slice());
      const types = ['capital'];
      for (let i = 0; i < reg.towns; i++) types.push('town');
      for (let i = 0; i < reg.villages; i++) types.push('village');
      for (const type of types) {
        const size = type === 'capital' ? 50 : type === 'town' ? 34 : 24, half = size / 2 + 4;
        const ok = (x, y) => {
          if (this.regionAt(x, y) !== reg.index || x < WORLD_TILES + 40) return false;
          const pts = [[0, 0], [-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [0, half], [-half, 0], [half, 0]];
          let bad = 0;
          for (const [dx, dy] of pts) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA) return false; if (TSOLID[t] || TWATER[t]) bad++; }
          return bad <= 2 && this.farFrom(x, y, made, type === 'village' ? 75 : 110);
        };
        const pos = this.findLand(reg.cx, reg.cy, rng, type === 'capital' ? 220 : type === 'town' ? 560 : 680, ok) || (type === 'capital' ? this.findLand(reg.cx, reg.cy, rng, 600, ok) : null);
        if (!pos) continue;
        const st = { id: 'k' + (sid++), name: type === 'capital' ? names.cap : (pool.pop() || ('Vila ' + sid)), type, region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y };
        made.push(st); this.settlements.push(st);
      }
    }
    for (const st of made) this.layoutSettlement(st);
    // masmorras, acampamentos e santuários
    let uid = this.dungeons.reduce((m, d) => Math.max(m, d.uid), 0) + 1;
    const dl = [];
    for (const R of regs) {
      const types = REGION_DUNGEONS[R.id];
      for (let i = 0; i < R.dungeons; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 720, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.69 && this.farFrom(x, y, made, 36) && this.farFrom(x, y, dl, 34));
        if (!pos) continue;
        const type = rng.pick(types), dt = DUNGEON_TYPES[type];
        const d = { id: 'kd' + uid, uid: uid++, name: dt.name + ' ' + rng.pick(DUNGEON_NOUNS), type, boss: dt.boss, lvl: rng.int(R.lvl[0], R.lvl[1]), size: rng.int(44, 60), x: pos.x, y: pos.y, region: R };
        dl.push(d); this.stampDungeon(d); this.dungeons.push(d); this.dungeonById[d.id] = d;
      }
      for (let i = 0; i < 2; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 650, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this._e < 0.66 && this.farFrom(x, y, made, 60) && this.farFrom(x, y, dl, 25) && this.farFrom(x, y, this.pois, 40));
        if (!pos) continue;
        const pc = { id: 'kcamp' + R.id + i, kind: 'camp', x: pos.x, y: pos.y, region: R, lvl: rng.int(R.lvl[0], R.lvl[1]), name: R.id === 'talassa' ? 'Esconderijo Pirata' : R.id === 'azhkar' ? 'Acampamento de Cultistas' : 'Acampamento de Ronins' };
        this.stampCamp(pc, rng); this.pois.push(pc);
      }
      const pos = this.findLand(R.cx, R.cy, rng, 600, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, made, 40) && this.farFrom(x, y, this.pois, 40) && this.farFrom(x, y, dl, 20));
      if (pos) { const pc = { id: 'kshrine' + R.id, kind: 'shrine', x: pos.x, y: pos.y, region: R, name: 'Santuário' }; this.stampSmall(pc, O.SHRINE, rng); this.pois.push(pc); }
    }
    // portos dos dois lados do Mar das Brumas
    this.placePorts(rng);
    const k1 = made.concat(this.ports.filter(p => p.port.cont === 1));
    this.buildRoads(rng, k1, false);
    // portos de Eldoria ligados à cidade mais próxima
    const edges = [];
    for (const pt of this.ports.filter(p => p.port.cont === 0)) {
      let near = null, nd = Infinity;
      for (const st of this.settlements) { if (st.port || st.x >= WORLD_TILES || st.academy) continue; const d = dist(st.x, st.y, pt.x, pt.y); if (d < nd) { nd = d; near = st; } }
      if (near) edges.push({ a: pt, b: near, w: 2 });
    }
    for (const e of edges) {
      const ga = this.closestGate(e.a, e.b), gb = this.closestGate(e.b, e.a);
      const path = this.wiggle([ga.x, ga.y], [gb.x, gb.y], rng, 0);
      for (let i = 0; i < path.length - 1; i++) this.rasterRoad(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], e.w);
      this.extendGate(ga, e.w); this.extendGate(gb, e.w);
    }
    this.roadEdges = this.roadEdges.concat(edges);
  }
  // Ilha de Nyxhal: território da alcateia Nyxar. Não há cidades nem casas: eles vivem num
  // covil de cavernas ligadas por túneis, com três bocas espalhadas pela ilha.
  generateIsland() {
    const rng = new RNG(this.seed * 71 + 13);
    const R = this.regions.find(r => r.cont === 3); if (!R) return;
    this.nyxCaves = [];
    const clear = (x, y, rx, ry) => { for (let dy = -ry; dy <= ry; dy++) for (let dx = -rx; dx <= rx; dx++) { const t = this.baseTile(x + dx, y + dy); if (TSOLID[t] || TWATER[t] || t === T.LAVA || t === T.DEEP) return false; } return true; };
    for (const [ax, ay] of [[-0.45, -0.35], [0.5, -0.1], [-0.05, 0.4]]) {
      const pos = this.findLand(ISLE.x + ax * ISLE.rx, ISLE.y + ay * ISLE.ry, rng, 60, (x, y) => contAt(x, y) === 3 && clear(x, y, 3, 3) && this.farFrom(x, y, this.nyxCaves, 40));
      if (pos) this.nyxCaves.push({ x: pos.x, y: pos.y, i: this.nyxCaves.length });
    }
    // as bocas das cavernas ficam livres de árvores e pedras
    for (const c of this.nyxCaves) {
      const W = 7, H = 6, tiles = new Uint8Array(W * H).fill(255), objs = new Uint8Array(W * H);
      for (let i = 0; i < W * H; i++) objs[i] = 0;
      this.addStamp({ x0: c.x - 3, y0: c.y - 4, w: W, h: H, tiles, objs, clearObjs: true });
    }
    const sp = this.findLand(ISLE.x, ISLE.y, rng, 160, (x, y) => contAt(x, y) === 3 && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, this.nyxCaves, 30));
    if (sp) { const pc = { id: 'nshrine', kind: 'shrine', x: sp.x, y: sp.y, region: R, name: 'Pedra dos Chifres' }; this.stampSmall(pc, O.SHRINE, rng); this.pois.push(pc); }
    // um píer na costa sul: o único lugar onde estrangeiros desembarcam (o barqueiro é um tritão de Talassa)
    const seaAt = (x, y) => { const t = this.baseTile(x, y); return TWATER[t] || t === T.DEEP; };
    outer: for (let dx = 0; dx < 220; dx += 6) for (const xx of [ISLE.x + dx, ISLE.x - dx]) {
      let y = ISLE.y; if (!this.isLand(xx, y)) continue;
      while (y < ISLE.y + ISLE.ry * 1.3 && this.isLand(xx, y + 1)) y++;
      let land = 0, sea = 0;
      for (let k = 1; k <= 12; k++) { if (this.isLand(xx, y - k) && this.isLand(xx - 3, y - k) && this.isLand(xx + 3, y - k)) land++; if (seaAt(xx, y + k) && seaAt(xx - 3, y + k) && seaAt(xx + 4, y + k)) sea++; }
      if (land < 11 || sea < 11 || !this.farFrom(xx, y, this.nyxCaves, 30)) continue;
      this.layoutPortV({ x: xx, y, R }, 3, 1, 'Píer de Nyxhal', 30, rng);
      const pt = this.ports[this.ports.length - 1];
      pt.npcSpots = pt.npcSpots.filter(sp => sp.role === 'captain').map(sp => Object.assign(sp, { race: 'tritao' }));
      break outer;
    }
  }
  generateValtheria() {
    const rng = new RNG(this.seed * 71 + 13);
    const regs = this.regions.filter(r => r.cont === 2);
    const made = [];
    let sid = 0;
    for (const reg of regs) {
      const names = SETTLEMENT_NAMES[reg.id], pool = rng.shuffle(names.list.slice());
      const types = reg.hostile ? [] : ['capital'];
      for (let i = 0; i < reg.towns; i++) types.push('town');
      for (let i = 0; i < reg.villages; i++) types.push('village');
      for (const type of types) {
        const size = type === 'capital' ? 50 : type === 'town' ? 34 : 24, half = size / 2 + 4;
        const ok = (x, y) => {
          if (this.regionAt(x, y) !== reg.index || y < VALTHERIA_Y + 40) return false;
          const pts = [[0, 0], [-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [0, half], [-half, 0], [half, 0]];
          let bad = 0;
          for (const [dx, dy] of pts) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA) return false; if (TSOLID[t] || TWATER[t]) bad++; }
          return bad <= 2 && this.farFrom(x, y, made, type === 'village' ? 80 : 120);
        };
        const pos = this.findLand(reg.cx, reg.cy, rng, type === 'capital' || (reg.hostile && !made.some(m => m.region === reg)) ? 300 : type === 'town' ? 1150 : 1400, ok);
        if (!pos) continue;
        const first = reg.hostile && !made.some(m => m.region === reg);
        const st = { id: 'v' + (sid++), name: type === 'capital' || first ? names.cap : (pool.pop() || ('Vila ' + sid)), type, region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y };
        made.push(st); this.settlements.push(st);
      }
    }
    for (const st of made) this.layoutSettlement(st);
    let uid = this.dungeons.reduce((m, d) => Math.max(m, d.uid), 0) + 1;
    const dl = [];
    const campName = { umbraval: 'Acampamento de Cultistas', gromhald: 'Acampamento de Gigantes', rodafina: 'Oficina Abandonada', aurelion: 'Acampamento de Desertores' };
    for (const R of regs) {
      const types = REGION_DUNGEONS[R.id];
      for (let i = 0; i < R.dungeons; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 1400, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.69 && this.farFrom(x, y, made, 36) && this.farFrom(x, y, dl, 34));
        if (!pos) continue;
        const type = rng.pick(types), dt = DUNGEON_TYPES[type];
        const d = { id: 'vd' + uid, uid: uid++, name: dt.name + ' ' + rng.pick(DUNGEON_NOUNS), type, boss: dt.boss, lvl: rng.int(R.lvl[0], R.lvl[1]), size: rng.int(48, 64), x: pos.x, y: pos.y, region: R };
        dl.push(d); this.stampDungeon(d); this.dungeons.push(d); this.dungeonById[d.id] = d;
      }
      for (let i = 0; i < 3; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 1000, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this._e < 0.66 && this.farFrom(x, y, made, 60) && this.farFrom(x, y, dl, 25) && this.farFrom(x, y, this.pois, 40));
        if (!pos) continue;
        const pc = { id: 'vcamp' + R.id + i, kind: 'camp', x: pos.x, y: pos.y, region: R, lvl: rng.int(R.lvl[0], R.lvl[1]), name: campName[R.id] || 'Acampamento Bandido' };
        this.stampCamp(pc, rng); this.pois.push(pc);
      }
      for (let i = 0; i < 2; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 900, (x, y) => this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, made, 40) && this.farFrom(x, y, this.pois, 40) && this.farFrom(x, y, dl, 20));
        if (pos) { const pc = { id: 'vshrine' + R.id + i, kind: 'shrine', x: pos.x, y: pos.y, region: R, name: 'Santuário' }; this.stampSmall(pc, O.SHRINE, rng); this.pois.push(pc); }
      }
    }
    // portos nas costas: sul de Eldoria e de Kaeloria, norte de Valtheria
    const before = this.ports.length;
    const specs = [
      [0, 1700, 'Porto do Sul'], [0, 2900, 'Porto das Gaivotas'], [1, 5150, 'Porto da Âncora'],
      [2, 2700, 'Porto do Norte'], [2, 4400, 'Porto Imperial'], [2, 6200, 'Porto Leste de Valtheria']
    ];
    specs.forEach(([cont, x0, name], n) => this.placePortV(cont, x0, name, n, rng));
    this.placePortV(2, 4500, 'Porto de Ferrânia', 9, rng, 1);
    const nv = this.ports.slice(before);
    this.buildRoads(rng, made.concat(nv.filter(p => p.port.cont === 2)), false);
    const edges = [];
    for (const pt of nv.filter(p => p.port.cont !== 2)) {
      let near = null, nd = Infinity;
      for (const st of this.settlements) { if (st.port || st.academy || contAt(st.x, st.y) !== pt.port.cont) continue; const d = dist(st.x, st.y, pt.x, pt.y); if (d < nd) { nd = d; near = st; } }
      if (near) edges.push({ a: pt, b: near, w: 2 });
    }
    for (const e of edges) {
      const ga = this.closestGate(e.a, e.b), gb = this.closestGate(e.b, e.a);
      const path = this.wiggle([ga.x, ga.y], [gb.x, gb.y], rng, 0);
      for (let i = 0; i < path.length - 1; i++) this.rasterRoad(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], e.w);
      this.extendGate(ga, e.w); this.extendGate(gb, e.w);
    }
    this.roadEdges = this.roadEdges.concat(edges);
  }
  // ---------- Elyndra: o continente do leste ----------
  // Dez reinos de povos que só existem aqui, cada um no seu bioma inventado. Nenhum deles
  // tinha contato com os outros continentes: os portos da costa oeste são novos.
  generateElyndra() {
    const rng = new RNG(this.seed * 97 + 41);
    const regs = this.regions.filter(r => r.cont === 4);
    const made = [];
    let sid = 0;
    for (const reg of regs) {
      const names = SETTLEMENT_NAMES[reg.id], pool = rng.shuffle(names.list.slice());
      const types = ['capital'];
      for (let i = 0; i < reg.towns; i++) types.push('town');
      for (let i = 0; i < reg.villages; i++) types.push('village');
      for (const type of types) {
        const size = type === 'capital' ? 50 : type === 'town' ? 34 : 24, half = size / 2 + 4;
        const ok = (x, y) => {
          if (contAt(x, y) !== 4 || this.regionAt(x, y) !== reg.index) return false;
          const pts = [[0, 0], [-half, -half], [half, -half], [-half, half], [half, half], [0, -half], [0, half], [-half, 0], [half, 0]];
          let bad = 0;
          for (const [dx, dy] of pts) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA) return false; if (TSOLID[t] || TWATER[t]) bad++; }
          return bad <= 2 && this.farFrom(x, y, made, type === 'village' ? 85 : 130);
        };
        const pos = this.findLand(reg.cx, reg.cy, rng, type === 'capital' ? 320 : type === 'town' ? 1200 : 1450, ok) || (type === 'capital' ? this.findLand(reg.cx, reg.cy, rng, 900, ok) : null);
        if (!pos) continue;
        const st = { id: 'e' + (sid++), name: type === 'capital' ? names.cap : (pool.pop() || ('Vila ' + sid)), type, region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y };
        made.push(st); this.settlements.push(st);
      }
    }
    for (const st of made) this.layoutSettlement(st);
    let uid = this.dungeons.reduce((m, d) => Math.max(m, d.uid), 0) + 1;
    const dl = [];
    const campName = { voralis: 'Acampamento de Caçadores de Pérolas', zephyra: 'Ninho de Saqueadores', thaldrim: 'Garimpo Clandestino', silvania: 'Acampamento de Lenhadores Ilegais', krazul: 'Acampamento de Exilados', nimbor: 'Círculo de Cultistas', vaelith: 'Acampamento de Caçadores', xarqin: 'Acampamento de Ladrões de Estrelas', brumaria: 'Acampamento Perdido na Névoa', terralux: 'Acampamento de Saqueadores de Runas' };
    for (const R of regs) {
      const types = REGION_DUNGEONS[R.id];
      for (let i = 0; i < R.dungeons; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 1450, (x, y) => contAt(x, y) === 4 && this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this._e < 0.69 && this.farFrom(x, y, made, 36) && this.farFrom(x, y, dl, 34));
        if (!pos) continue;
        const type = rng.pick(types), dt = DUNGEON_TYPES[type];
        const d = { id: 'ed' + uid, uid: uid++, name: dt.name + ' ' + rng.pick(DUNGEON_NOUNS), type, boss: dt.boss, lvl: rng.int(R.lvl[0], R.lvl[1]), size: rng.int(48, 64), x: pos.x, y: pos.y, region: R };
        dl.push(d); this.stampDungeon(d); this.dungeons.push(d); this.dungeonById[d.id] = d;
      }
      for (let i = 0; i < 3; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 1100, (x, y) => contAt(x, y) === 4 && this.regionAt(x, y) === R.index && this.isLand(x, y) && this._e < 0.66 && this.farFrom(x, y, made, 60) && this.farFrom(x, y, dl, 25) && this.farFrom(x, y, this.pois, 40));
        if (!pos) continue;
        const pc = { id: 'ecamp' + R.id + i, kind: 'camp', x: pos.x, y: pos.y, region: R, lvl: rng.int(R.lvl[0], R.lvl[1]), name: campName[R.id] || 'Acampamento Bandido' };
        this.stampCamp(pc, rng); this.pois.push(pc);
      }
      for (let i = 0; i < 2; i++) {
        const pos = this.findLand(R.cx, R.cy, rng, 900, (x, y) => contAt(x, y) === 4 && this.regionAt(x, y) === R.index && this.isLand(x, y) && this.isLand(x, y + 1) && this.farFrom(x, y, made, 40) && this.farFrom(x, y, this.pois, 40) && this.farFrom(x, y, dl, 20));
        if (pos) { const pc = { id: 'eshrine' + R.id + i, kind: 'shrine', x: pos.x, y: pos.y, region: R, name: 'Santuário' }; this.stampSmall(pc, O.SHRINE, rng); this.pois.push(pc); }
      }
    }
    // o Pilar de Luz: um feixe que sobe do Vale Cósmico até acima das nuvens (o caminho para Seraphel)
    const RX = this.regions.find(r => r.id === 'xarqin');
    if (RX) {
      const pos = this.findLand(RX.cx + 260, RX.cy - 200, rng, 700, (x, y) => contAt(x, y) === 4 && this.regionAt(x, y) === RX.index && this.isLand(x, y) && this.isLand(x, y + 2) && this.isLand(x - 3, y) && this.isLand(x + 3, y) && this._e < 0.62 && this.farFrom(x, y, made, 70) && this.farFrom(x, y, dl, 30) && this.farFrom(x, y, this.pois, 40));
      if (pos) {
        const w = 9, h = 9, tiles = new Uint8Array(w * h).fill(255), objs = new Uint8Array(w * h);
        for (let yy = 0; yy < h; yy++) for (let xx = 0; xx < w; xx++) { const dx = xx - 4, dy = yy - 4; if (dx * dx + dy * dy <= 13) tiles[yy * w + xx] = T.SKYMARBLE; }
        objs[4 * w + 4] = O.SKYPILLAR;
        this.addStamp({ x0: pos.x - 4, y0: pos.y - 4, w, h, tiles, objs });
        this.skyPillar = { x: pos.x, y: pos.y };
        this.pois.push({ id: 'skypillar', kind: 'pillar', x: pos.x, y: pos.y, region: RX, name: 'Pilar de Luz' });
      }
    }
    // portos novos na costa oeste, de frente para o Mar do Amanhecer
    const before = this.ports.length;
    [[2600, 'Porto do Amanhecer'], [5000, 'Porto das Lagoas'], [7400, 'Porto da Bruma'], [9600, 'Porto dos Cânions']].forEach(([y0, name], n) => this.placePortH(4, y0, name, n, rng));
    const nv = this.ports.slice(before);
    this.buildRoads(rng, made.concat(nv), false);
  }
  // porto em costa oeste/leste: varre na horizontal a partir do mar (dir<0: o mar fica a oeste)
  placePortH(cont, y0, name, n, rng) {
    const dir = -1, seaAt = (x, y) => { const t = this.baseTile(x, y); return TWATER[t] || t === T.DEEP; };
    for (let dy = 0; dy < 900; dy += 10) for (const yy of [y0 + dy, y0 - dy]) {
      let x = ELYNDRA.x0 + 60;
      while (x < ELYNDRA.x0 + 3200) { if (this.isLand(x, yy)) break; x++; }
      if (x >= ELYNDRA.x0 + 3200 || contAt(x, yy) !== cont) continue;
      let land = 0, sea = 0;
      for (let k = 1; k <= 12; k++) { if (this.isLand(x - dir * k, yy) && this.isLand(x - dir * k, yy - 3) && this.isLand(x - dir * k, yy + 3)) land++; if (seaAt(x + dir * k, yy) && seaAt(x + dir * k, yy - 3) && seaAt(x + dir * k, yy + 4)) sea++; }
      const R = this.regions[this.regionAt(x, yy)];
      if (land < 11 || sea < 11 || R.hostile || !this.farFrom(x, yy, this.settlements, 40) || !this.farFrom(x, yy, this.dungeons, 20)) continue;
      this.layoutPort({ x, y: yy, R }, cont, dir, name, n, rng);
      return;
    }
  }
  // porto em costa norte/sul: varre na vertical a partir do mar
  placePortV(cont, x0, name, n, rng, south) {
    const dir = cont === 2 && !south ? -1 : 1;       // dir>0: o mar fica ao sul
    const seaAt = (x, y) => { const t = this.baseTile(x, y); return TWATER[t] || t === T.DEEP; };
    for (let dx = 0; dx < 900; dx += 10) for (const xx of [x0 + dx, x0 - dx]) {
      const down = cont === 2 && !south;              // varre de cima para baixo?
      let y = down ? VALTHERIA_Y + 20 : south ? WORLD_H - 100 : VALTHERIA_Y - 20;
      const lim = down ? VALTHERIA_Y + 2600 : south ? WORLD_H - 2600 : 2600;
      while (down ? y < lim : y > lim) { if (this.isLand(xx, y)) break; y += down ? 1 : -1; }
      if (down ? y >= lim : y <= lim) continue;
      if (contAt(xx, y) !== cont) continue;
      let land = 0, sea = 0;
      for (let k = 1; k <= 12; k++) { if (this.isLand(xx, y - dir * k) && this.isLand(xx - 3, y - dir * k) && this.isLand(xx + 3, y - dir * k)) land++; if (seaAt(xx, y + dir * k) && seaAt(xx - 3, y + dir * k) && seaAt(xx + 4, y + dir * k)) sea++; }
      const R = this.regions[this.regionAt(xx, y)];
      if (land < 11 || sea < 11 || R.hostile || !this.farFrom(xx, y, this.settlements, 40) || !this.farFrom(xx, y, this.dungeons, 20)) continue;
      this.layoutPortV({ x: xx, y, R }, cont, dir, name, n, rng);
      return;
    }
  }
  layoutPortV(f, cont, dir, name, n, rng) {
    const W = 14, H = 24, coast = 13;
    const st = { id: 'portv' + cont + n, name, type: 'port', region: f.R, x: f.x, y: f.y, cx: f.x, cy: f.y, port: { cont, dir, axis: 'y' } };
    st.w = W; st.h = H;
    st.x0 = f.x - 7;
    st.y0 = dir > 0 ? f.y - coast + 1 : f.y - (H - coast);
    const ly = u => dir > 0 ? u : H - 1 - u;                    // u = distância ao longo do píer
    const at = (u, v) => ly(u) * W + v;
    const tiles = new Uint8Array(W * H).fill(255), objs = new Uint8Array(W * H), occ = new Uint8Array(W * H);
    const cul = CULTURES[f.R.culture];
    for (let u = 0; u < coast; u++) for (let v = 0; v < W; v++) { const i = at(u, v); const t = this.baseTile(st.x0 + v, st.y0 + ly(u)); tiles[i] = (TSOLID[t] || TWATER[t] || t === T.LAVA) ? T.SAND : (v >= 5 && v <= 8) || u >= coast - 3 ? T.WOOD : 255; }
    for (let u = coast - 3; u < H; u++) for (let v = 6; v <= 7; v++) tiles[at(u, v)] = T.BRIDGE;
    for (let u = H - 4; u < H; u++) for (let v = 4; v <= 9; v++) tiles[at(u, v)] = T.BRIDGE;
    st.buildings = []; st.npcSpots = []; st.lamps = []; st.gates = [];
    for (let i = 0; i < W * H; i++) if (tiles[i] === T.WOOD || tiles[i] === T.BRIDGE) occ[i] = 2;
    const b = this.placeBuilding(st, 'inn', 8, dir > 0 ? 1 : H - 1 - 4 - 1, rng, objs, occ, W, cul);
    b.name = 'Taverna do ' + name;
    for (const [u, v, o] of [[coast - 2, 4, O.CRATE], [coast - 2, 9, O.BARREL], [coast - 1, 10, O.CRATE], [H - 1, 4, O.LAMP], [H - 1, 9, O.LAMP], [coast - 3, 10, O.LAMP], [3, 2, O.BARREL], [4, 3, O.CRATE]]) { const i = at(u, v); if (!occ[i] || occ[i] === 2) objs[i] = o; }
    st.lamps.push({ x: st.x0 + 4, y: st.y0 + ly(H - 1) });
    st.npcSpots.push({ role: 'captain', x: st.x0 + 7, y: st.y0 + ly(H - 3) }, { role: 'citizen', x: st.x0 + 6, y: st.y0 + ly(coast - 4) }, { role: 'citizen', x: st.x0 + 3, y: st.y0 + ly(5) }, { role: 'guard', x: st.x0 + 7, y: st.y0 + ly(1) });
    st.gates.push({ x: st.x0 + 7, y: dir > 0 ? st.y0 - 1 : st.y0 + H, dir: dir > 0 ? 'n' : 's' });
    st.mid = { x: st.x0 + 7, y: st.y0 + ly(coast - 2) };
    st.port.ship = { x: (st.x0 + 7) * 16 + 8, y: (st.y0 + ly(H - 1) + dir * 4) * 16 + 8 };
    st.port.dock = { x: st.x0 + 7, y: st.y0 + ly(H - 3) };
    this.addStamp({ x0: st.x0, y0: st.y0, w: W, h: H, tiles, objs });
    this.settlements.push(st); this.ports.push(st);
  }
  placePorts(rng) {
    this.ports = [];
    const names = [['Porto das Brumas', 'Porto do Sol Nascente'], ['Porto de Kaeloria', 'Porto das Pérolas']];
    const seaAt = (x, y) => { const t = this.baseTile(x, y); return TWATER[t] || t === T.DEEP; };
    for (const cont of [0, 1]) {
      const ys = cont ? [0.3, 0.64] : [0.44, 0.7];
      ys.forEach((fy, n) => {
        const y0 = Math.round(fy * WORLD_TILES), dir = cont ? -1 : 1;
        let found = null;
        for (let dy = 0; dy < 900 && !found; dy += 10) for (const yy of [y0 + dy, y0 - dy]) {
          if (found) break;
          let x = cont ? 4300 : 4060;
          while (cont ? x < 5700 : x > 2600) { if (this.isLand(x, yy)) break; x -= dir; }
          if (cont ? x >= 5700 : x <= 2600) continue;
          // terra firme atrás, mar aberto à frente
          let land = 0, sea = 0;
          for (let k = 1; k <= 12; k++) { if (this.isLand(x - dir * k, yy) && this.isLand(x - dir * k, yy - 3) && this.isLand(x - dir * k, yy + 3)) land++; if (seaAt(x + dir * k, yy) && seaAt(x + dir * k, yy - 3) && seaAt(x + dir * k, yy + 4)) sea++; }
          const R = this.regions[this.regionAt(x, yy)];
          if (land < 11 || sea < 11 || R.hostile || !this.farFrom(x, yy, this.settlements, 40) || !this.farFrom(x, yy, this.dungeons, 20)) continue;
          found = { x, y: yy, R };
        }
        if (!found) return;
        this.layoutPort(found, cont, dir, names[cont][n], n, rng);
      });
    }
  }
  layoutPort(f, cont, dir, name, n, rng) {
    const W = 24, H = 14, coast = 13;
    const st = { id: 'port' + cont + n, name, type: 'port', region: f.R, x: f.x, y: f.y, cx: f.x, cy: f.y, port: { cont, dir } };
    st.w = W; st.h = H;
    st.x0 = dir > 0 ? f.x - coast + 1 : f.x - (W - coast);
    st.y0 = f.y - 7;
    const tiles = new Uint8Array(W * H).fill(255), objs = new Uint8Array(W * H), occ = new Uint8Array(W * H);
    const lx = x => dir > 0 ? x : W - 1 - x;                    // x local espelhado
    const at = (x, y) => y * W + lx(x);
    const cul = CULTURES[f.R.culture];
    for (let y = 0; y < H; y++) for (let x = 0; x < coast; x++) { const i = at(x, y); const t = this.baseTile(st.x0 + lx(x), st.y0 + y); tiles[i] = (TSOLID[t] || TWATER[t] || t === T.LAVA) ? T.SAND : (y >= 5 && y <= 8) || x >= coast - 3 ? T.WOOD : 255; }
    // píer sobre o mar
    for (let x = coast - 3; x < W; x++) for (let y = 6; y <= 7; y++) tiles[at(x, y)] = T.BRIDGE;
    for (let x = W - 4; x < W; x++) for (let y = 4; y <= 9; y++) tiles[at(x, y)] = T.BRIDGE;
    st.buildings = []; st.npcSpots = []; st.lamps = []; st.gates = [];
    // taverna do porto
    for (let i = 0; i < W * H; i++) if (tiles[i] === T.WOOD || tiles[i] === T.BRIDGE) occ[i] = 2;
    const bx = dir > 0 ? 1 : W - 1 - 1 - 6 + 1;
    const b = this.placeBuilding(st, 'inn', bx, 0, rng, objs, occ, W, cul);
    b.name = 'Taverna do ' + name;
    for (const [x, y, o] of [[coast - 2, 5, O.CRATE], [coast - 2, 8, O.BARREL], [coast - 1, 9, O.CRATE], [W - 1, 4, O.LAMP], [W - 1, 9, O.LAMP], [coast - 3, 9, O.LAMP], [2, 10, O.BARREL], [3, 11, O.CRATE], [6, 12, O.BARREL]]) { const i = at(x, y); if (!occ[i] || occ[i] === 2) objs[i] = o; }
    st.lamps.push({ x: st.x0 + lx(W - 1), y: st.y0 + 4 });
    st.npcSpots.push({ role: 'captain', x: st.x0 + lx(W - 3), y: st.y0 + 6 }, { role: 'citizen', x: st.x0 + lx(coast - 4), y: st.y0 + 7 }, { role: 'citizen', x: st.x0 + lx(4), y: st.y0 + 9 }, { role: 'guard', x: st.x0 + lx(1), y: st.y0 + 7 });
    st.gates.push({ x: st.x0 + lx(0) - dir, y: st.y0 + 7, dir: dir > 0 ? 'w' : 'e' });
    st.mid = { x: st.x0 + lx(coast - 2), y: st.y0 + 7 };
    st.port.ship = { x: (st.x0 + lx(W - 1) + dir * 3) * 16 + 8, y: (st.y0 + 7) * 16 + 8 };
    st.port.dock = { x: st.x0 + lx(W - 3), y: st.y0 + 7 };
    this.addStamp({ x0: st.x0, y0: st.y0, w: W, h: H, tiles, objs });
    this.settlements.push(st); this.ports.push(st);
  }
  placeAcademy() {
    const rng = new RNG(this.seed * 17 + 3);
    const V = this.regions[REGION_BY_ID.valdoria.index], S = this.regions[REGION_BY_ID.sylvaris.index];
    const tx = lerp(V.cx, S.cx, 0.45), ty = lerp(V.cy, S.cy, 0.45);
    const size = 64, half = size / 2;
    const ok = (x, y) => {
      for (let dy = -half; dy <= half; dy += 8) for (let dx = -half; dx <= half; dx += 8) { const t = this.baseTile(x + dx, y + dy); if (t === T.DEEP || t === T.LAVA || (TWATER[t] && Math.abs(dx) < half - 8 && Math.abs(dy) < half - 8)) return false; }
      if (!this.farFrom(x, y, this.settlements, 80)) return false;
      for (const d of this.dungeons) if (Math.abs(d.x - x) < half + 12 && Math.abs(d.y - y) < half + 12) return false;
      for (const p of this.pois) if (Math.abs(p.x - x) < half + 10 && Math.abs(p.y - y) < half + 10) return false;
      return true;
    };
    let pos = null;
    for (let r = 0; r < 700 && !pos; r += 6) for (let k = 0; k < 24 && !pos; k++) { const a = k / 24 * Math.PI * 2; const x = Math.round(tx + Math.cos(a) * r), y = Math.round(ty + Math.sin(a) * r); if (ok(x, y)) pos = { x, y }; }
    if (!pos) return;
    const reg = this.regions[this.regionAt(pos.x, pos.y)];
    const s = { id: 'academy', name: ACADEMY.name, type: 'academy', region: reg, x: pos.x, y: pos.y, cx: pos.x, cy: pos.y, academy: true };
    this.settlements.push(s);
    this.academy = s;
    this.layoutAcademy(s, rng);
  }
  layoutAcademy(s, rng) {
    const size = 64; s.w = s.h = size; s.x0 = s.cx - 32; s.y0 = s.cy - 32;
    const N = size * size;
    const tiles = new Uint8Array(N).fill(T.GRASS), objs = new Uint8Array(N).fill(0), occ = new Uint8Array(N);
    const setT = (x, y, t) => { if (x >= 0 && y >= 0 && x < size && y < size) tiles[y * size + x] = t; };
    const setO = (x, y, o) => { if (x >= 0 && y >= 0 && x < size && y < size && !occ[y * size + x]) objs[y * size + x] = o; };
    s.buildings = []; s.npcSpots = []; s.lamps = []; s.gates = [];
    const cul = Object.assign({}, CULTURES.human, { wallC: '#dcd8d0', roof: ['#2a3a7a'] });
    for (let i = 0; i < size; i++) for (const [x, y] of [[i, 0], [i, size - 1], [0, i], [size - 1, i]]) { setT(x, y, T.WALL); occ[y * size + x] = 3; }
    // avenidas
    for (let y = 11; y < size; y++) for (let x = 30; x <= 33; x++) setT(x, y, T.COBBLE);
    for (let x = 1; x < size - 1; x++) for (let y = 33; y <= 35; y++) setT(x, y, T.COBBLE);
    for (let y = 20; y <= 28; y++) for (let x = 24; x <= 39; x++) setT(x, y, T.COBBLE);
    for (const yy of [44, 45, 57, 58]) for (let x = 1; x < size - 1; x++) setT(x, yy, T.COBBLE);
    for (const [dir, gx, gy] of [['s', 32, size - 1], ['w', 0, 34], ['e', size - 1, 34]]) {
      for (let k = -2; k <= 1; k++) { const x = dir === 's' ? gx + k : gx, y = dir === 's' ? gy : gy + k; setT(x, y, T.COBBLE); occ[y * size + x] = 0; }
      s.gates.push({ x: s.x0 + gx + (dir === 'w' ? -1 : dir === 'e' ? 1 : 0), y: s.y0 + gy + (dir === 's' ? 1 : 0), dir });
    }
    const place = (bt, bx, by, spec, owner) => {
      const b = this.placeBuilding(s, bt, bx, by, rng, objs, occ, size, cul);
      Object.assign(b.spec, spec);
      if (owner) Object.assign(b.owner, owner);
      b.name = BUILDINGS[bt].name;
      // caminho até a avenida
      if (b.door) { let y = b.door.y - s.y0 + 1; const x = b.door.x - s.x0; for (let k = 0; k < 30 && y < size - 1; k++, y++) { if (tiles[y * size + x] === T.COBBLE && k > 0) break; setT(x, y, T.COBBLE); } }
      return b;
    };
    const blue = '#2a3a7a';
    place('grandhall', 23, 2, { type: 'castle', style: 'castle', roof: blue, wall: '#e4e0d8', banner: '#3050c0' }, Object.assign({ ruler: false }, ACADEMY.head));
    place('dorm_real', 4, 13, { type: 'house', style: 'stone', roof: '#7a2030', wall: '#e0dcd4', chimney: true, sign: 'house' }, { name: 'Zeladora Marta Lumen', race: 'humano', sex: 'f' });
    place('dorm', 48, 13, { type: 'house', style: 'stone', roof: blue, wall: '#d8d4cc', chimney: true, sign: 'house' }, { name: 'Zelador Bertoldo Pó', race: 'pequenino', sex: 'm' });
    place('library', 6, 37, { type: 'tower', style: 'stone', roof: '#4a2a7a', wall: '#d8d4cc', sign: 'magic' }, { name: 'Bibliotecária Lirien Folha-de-Prata', race: 'elfo', sex: 'f' });
    place('refectory', 47, 38, { type: 'house', style: 'timber', roof: '#8a3a2a', sign: 'inn' }, { name: 'Cozinheiro Gorbo Barriga-Cheia', race: 'pequenino', sex: 'm' });
    place('fencing', 6, 50, { type: 'guildhall', style: 'stone', roof: '#8a2a2a', wall: '#d0ccc4', sign: 'guild', banner: '#c03030' }, ACADEMY.fencingTeacher);
    place('alchemylab', 45, 51, { type: 'house', style: 'stone', roof: '#2a6a4a', sign: 'alchemist' }, { name: 'Mestre Alquimista Ozric Vael', race: 'anao', sex: 'm' });
    place('magic', 55, 51, { type: 'tower', style: 'stone', roof: '#4a2a7a', sign: 'magic' }, { name: 'Lojista Fenna Brilho-Azul', race: 'elfo', sex: 'f' });
    // pátio de treino de esgrima
    for (let y = 48; y <= 55; y++) for (let x = 18; x <= 27; x++) setT(x, y, T.SAND);
    for (let y = 49; y <= 54; y += 3) for (let x = 19; x <= 26; x += 3) setO(x, y, O.DUMMY);
    // jardins e praça
    setO(31, 24, O.FOUNTAIN);
    setO(26, 21, O.STATUE); setO(37, 21, O.STATUE); setO(26, 27, O.STATUE); setO(37, 27, O.STATUE);
    for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
      if (occ[y * size + x] || tiles[y * size + x] !== T.GRASS || objs[y * size + x]) continue;
      const h = rng.next();
      if (h < 0.06) setO(x, y, O.FLOWERS); else if (h < 0.085) setO(x, y, rng.chance(0.4) ? O.ELFTREE : O.OAK); else if (h < 0.095) setO(x, y, O.BUSH); else if (h < 0.1) setO(x, y, O.BENCH);
    }
    for (let y = 13; y < size - 2; y += 5) { if (tiles[y * size + 29] === T.COBBLE) continue; setO(29, y, O.LAMP); setO(34, y, O.LAMP); s.lamps.push({ x: s.x0 + 29, y: s.y0 + y }); }
    for (let x = 4; x < size - 3; x += 6) { if (x >= 29 && x <= 34) continue; setO(x, 32, O.LAMP); setO(x, 36, O.LAMP); }
    for (const x of [24, 27, 36, 39]) setO(x, 19, O.BANNER);
    // guardas nos portões
    s.npcSpots.push({ role: 'guard', x: s.x0 + 30, y: s.y0 + size - 3 }, { role: 'guard', x: s.x0 + 34, y: s.y0 + size - 3 }, { role: 'guard', x: s.x0 + 2, y: s.y0 + 32 }, { role: 'guard', x: s.x0 + size - 3, y: s.y0 + 32 });
    s.mid = { x: s.x0 + 32, y: s.y0 + 30 };
    this.addStamp({ x0: s.x0, y0: s.y0, w: size, h: size, tiles, objs });
  }
  placeDestiny() {
    const rng = new RNG(this.seed * 13 + 5);
    const cap = this.settlements.find(s => s.region.id === 'valdoria' && s.type === 'capital');
    if (!cap) return;
    const ok = (x, y) => { for (let dy = -2; dy <= 2; dy++) for (let dx = -5; dx <= 5; dx++) { const t = this.baseTile(x + dx, y + dy); if (TSOLID[t] || TWATER[t]) return false; } return !this.settlements.some(s => Math.abs(s.mid.x - x) < s.w / 2 + 8 && Math.abs(s.mid.y - y) < s.h / 2 + 8); };
    let pos = null;
    for (let i = 0; i < 300 && !pos; i++) { const a = rng.range(0, Math.PI * 2), r = rng.range(36, 70); const x = Math.round(cap.mid.x + Math.cos(a) * r), y = Math.round(cap.mid.y + Math.sin(a) * r); if (ok(x, y)) pos = { x, y }; }
    if (!pos) return;
    const w = 11, h = 5, x0 = pos.x - 5, y0 = pos.y - 2;
    const tiles = new Uint8Array(w * h).fill(255), objs = new Uint8Array(w * h).fill(0);
    for (let yy = 0; yy < h; yy++) for (let xx = 1; xx < w - 1; xx++) tiles[yy * w + xx] = T.COBBLE;
    objs[1 * w + 2] = O.DESTINY; objs[1 * w + 5] = O.DESTINY2; objs[1 * w + 8] = O.DESTINY3;
    this.addStamp({ x0, y0, w, h, tiles, objs });
    const p = { id: 'destiny', kind: 'destiny', x: pos.x, y: pos.y, region: cap.region, name: 'Pedras do Destino' };
    this.pois.push(p); this.destiny = p;
  }
  layoutSettlement(s) {
    const reg = s.region, cul = CULTURES[reg.culture];
    const size = s.type === 'capital' ? 50 : s.type === 'town' ? 34 : 24;
    s.w = s.h = size; s.x0 = s.cx - (size >> 1); s.y0 = s.cy - (size >> 1);
    const N = size * size;
    const tiles = new Uint8Array(N).fill(255), objs = new Uint8Array(N).fill(0), occ = new Uint8Array(N);
    const rng = new RNG(hashStr(s.name) + this.seed);
    const inb = (x, y) => x >= 0 && y >= 0 && x < size && y < size;
    const setT = (x, y, t) => { if (inb(x, y)) tiles[y * size + x] = t; };
    const setO = (x, y, o) => { if (inb(x, y)) objs[y * size + x] = o; };
    const isOcc = (x, y) => !inb(x, y) || occ[y * size + x];
    const mark = (x, y, v = 1) => { if (inb(x, y)) occ[y * size + x] = v; };
    // terreno base: água/rocha viram chão
    const ground = reg.biome === 'snow' ? T.SNOW : reg.biome === 'desert' ? T.DESERT : reg.biome === 'volcanic' ? T.BADLAND : reg.biome === 'swamp' ? T.MUD : reg.biome === 'dead' ? T.DEADGRASS : reg.biome === 'mountain' ? T.TUNDRA : reg.biome === 'forest' ? T.DGRASS : T.GRASS;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const t = this.baseTile(s.x0 + x, s.y0 + y);
      if (TSOLID[t] || TWATER[t] || t === T.LAVA) setT(x, y, ground);
    }
    const walled = cul.wall && cul.walls.includes(s.type);
    const mid = size >> 1, sw = s.type === 'capital' ? 3 : 2;
    const street = cul.street, plaza = cul.plaza;
    s.buildings = []; s.npcSpots = []; s.lamps = [];
    s.gates = [];
    // castelo / palácio
    let castleBottom = 1;
    if (s.type === 'capital' || (reg.hostile && s.type === 'town')) {
      const bt = (reg.culture === 'elf' || reg.culture === 'desert') ? 'palace' : 'castle';
      const B = BUILDINGS[bt];
      const bx = mid - Math.floor(B.w / 2), by = walled ? 3 : 2;
      this.placeBuilding(s, bt, bx, by, rng, objs, occ, size, cul);
      castleBottom = by + B.h;
    }
    // ruas
    for (let x = 0; x < size; x++) for (let k = 0; k < sw; k++) { setT(x, mid - 1 + k, street); mark(x, mid - 1 + k, 2); }
    for (let y = castleBottom; y < size; y++) for (let k = 0; k < sw; k++) { if (occ[y * size + mid - 1 + k] === 1) continue; setT(mid - 1 + k, y, street); mark(mid - 1 + k, y, 2); }
    // praça
    const pr = s.type === 'capital' ? 5 : s.type === 'town' ? 4 : 3;
    for (let y = mid - pr; y <= mid + pr; y++) for (let x = mid - pr; x <= mid + pr; x++) { if (isOcc(x, y) && occ[y * size + x] === 1) continue; setT(x, y, plaza); mark(x, y, 2); }
    // fonte/poço no centro
    const cobj = s.type === 'village' ? O.WELL : (reg.culture === 'elf' ? O.ELFTREE : reg.culture === 'orc' ? O.HUT_TOTEM : O.FOUNTAIN);
    setO(mid, mid + 2, cobj);
    // muralhas
    if (walled) {
      for (let i = 0; i < size; i++) {
        for (const [x, y] of [[i, 0], [i, size - 1], [0, i], [size - 1, i]]) { setT(x, y, cul.wall); setO(x, y, 0); mark(x, y, 3); }
      }
      // margem interna
      for (let i = 1; i < size - 1; i++) for (const [x, y] of [[i, 1], [i, size - 2], [1, i], [size - 2, i]]) if (!occ[y * size + x]) mark(x, y, 4);
    } else {
      for (let i = 0; i < size; i++) for (const [x, y] of [[i, 0], [i, size - 1], [0, i], [size - 1, i]]) if (!occ[y * size + x]) mark(x, y, 4);
    }
    // portões
    const gw = sw + 2;
    const openGate = (dir) => {
      for (let k = -1; k < sw + 1; k++) {
        let x, y;
        if (dir === 'w') { x = 0; y = mid - 1 + k; } else if (dir === 'e') { x = size - 1; y = mid - 1 + k; } else if (dir === 's') { x = mid - 1 + k; y = size - 1; } else { x = mid - 1 + k; y = 0; }
        setT(x, y, street); mark(x, y, 2);
      }
      let gx, gy;
      if (dir === 'w') { gx = s.x0 - 1; gy = s.y0 + mid; } else if (dir === 'e') { gx = s.x0 + size; gy = s.y0 + mid; } else if (dir === 's') { gx = s.x0 + mid; gy = s.y0 + size; } else { gx = s.x0 + mid; gy = s.y0 - 1; }
      s.gates.push({ x: gx, y: gy, dir });
    };
    openGate('w'); openGate('e'); openGate('s');
    if (castleBottom <= 1) openGate('n');
    void gw;
    // torres nos cantos
    if (walled && s.type === 'capital') {
      for (const [x, y] of [[0, 0], [size - 3, 0], [0, size - 3], [size - 3, size - 3]]) this.placeBuilding(s, 'tower', x, y, rng, objs, occ, size, cul, true);
    }
    // lista de prédios
    const req = [];
    if (s.type === 'capital') {
      req.push('temple', 'heroes', 'inn', 'smith', 'general', 'alchemist', 'magic', 'stable', 'playerhouse');
      for (const [gid, g] of Object.entries(GUILDS)) if (g.hq === reg.id) req.push('guildhall:' + gid);
    } else if (s.type === 'town') {
      if (reg.hostile) { req.push('temple', 'heroes', 'inn', 'smith', 'alchemist', 'general', 'magic'); }
      else { req.push('heroes', 'inn', 'smith', 'general', 'alchemist'); if (rng.chance(0.6)) req.push('magic'); if (rng.chance(0.5)) req.push('temple'); }
    } else { req.push('inn', 'general'); if (rng.chance(0.4)) req.push('smith'); }
    if (cul.industrial && s.type !== 'village') { req.unshift('factory'); req.push('gunsmith'); if (s.type === 'capital') req.unshift('factory'); }
    const houses = s.type === 'capital' ? 16 : s.type === 'town' ? 9 : 5;
    for (let i = 0; i < houses; i++) req.push(rng.pick(['house', 'house', 'house2', 'house3']));
    for (const r of req) {
      const [bt, gid] = r.split(':');
      const B = BUILDINGS[bt];
      let placed = false;
      for (let a = 0; a < 400 && !placed; a++) {
        const spread = 4 + a * 0.08;
        const bx = Math.round(mid + rng.range(-1, 1) * Math.min(size / 2, spread * 2) - B.w / 2);
        const by = Math.round(mid + rng.range(-1, 1) * Math.min(size / 2, spread * 2) - B.h / 2);
        if (bx < 1 || by < 1 || bx + B.w > size - 1 || by + B.h > size - 2) continue;
        let free = true;
        for (let y = by - 1; y <= by + B.h && free; y++) for (let x = bx - 1; x <= bx + B.w && free; x++) {
          const v = inb(x, y) ? occ[y * size + x] : 9;
          if (y === by + B.h) { if (v === 1 || v === 3 || v === 9) free = false; }
          else if (y >= by && y < by + B.h && x >= bx && x < bx + B.w) { if (v) free = false; }
          else if (v === 1 || v === 3) free = false;
        }
        if (!free) continue;
        // porta deve dar para algo caminhável
        this.placeBuilding(s, bt, bx, by, rng, objs, occ, size, cul, false, gid);
        // caminho da porta até a rua
        const dx = bx + Math.floor(B.w / 2);
        let yy = by + B.h;
        const dirY = yy < mid ? 1 : -1;
        if (dirY === -1) { // porta abaixo da rua: segue para baixo até encontrar rua? só marca tile
          setT(dx, yy, street);
        } else {
          for (let k = 0; k < size; k++) {
            if (!inb(dx, yy) || occ[yy * size + dx] === 2) break;
            if (occ[yy * size + dx] === 1 || occ[yy * size + dx] === 3) break;
            setT(dx, yy, street); mark(dx, yy, 2); yy++;
          }
        }
        placed = true;
      }
    }
    // decoração
    for (let i = 3; i < size - 3; i += 6) {
      for (const [x, y] of [[i, mid - 2], [i, mid + sw - 1 + 1], [mid - 2, i], [mid + sw, i]]) {
        if (inb(x, y) && !occ[y * size + x]) { setO(x, y, O.LAMP); mark(x, y, 1); s.lamps.push({ x: s.x0 + x, y: s.y0 + y }); }
      }
    }
    if (s.type !== 'village') {
      const stalls = s.type === 'capital' ? 4 : 2;
      for (let i = 0; i < stalls; i++) {
        const x = mid - pr + 1 + i * 3, y = mid - pr;
        if (inb(x, y) && occ[y * size + x] === 2 && objs[y * size + x] === 0) { setO(x, y, O.STALL); s.npcSpots.push({ role: 'merchant', x: s.x0 + x, y: s.y0 + y + 1 }); }
      }
    }
    // árvores/flores/fazendas no espaço livre
    for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
      if (occ[y * size + x]) continue;
      const h = rng.next();
      if (s.type === 'village' && (x < 6 || x > size - 7 || y > size - 7) && ground !== T.DESERT && reg.biome !== 'dead') {
        if (y % 4 !== 0) { setT(x, y, T.FARM); if (h < 0.7 && reg.biome !== 'snow') setO(x, y, O.CROP); } else if (h < 0.3) setO(x, y, O.HAY);
        continue;
      }
      if (cul.flowers && h < 0.15) setO(x, y, O.FLOWERS);
      else if (h < 0.025) setO(x, y, reg.culture === 'elf' ? O.ELFTREE : reg.biome === 'snow' ? O.SNOWPINE : reg.biome === 'desert' ? O.PALM : reg.biome === 'volcanic' || reg.biome === 'dead' ? O.DEADTREE : O.OAK);
      else if (h < 0.05) setO(x, y, rng.pick([O.BARREL, O.CRATE, O.BUSH]));
      else if (h < 0.09 && reg.culture === 'halfling') setO(x, y, O.BUSH);
    }
    // NPCs
    const nCit = Math.ceil((s.type === 'capital' ? 16 : s.type === 'town' ? 9 : 5) * (RACES[cul.race] && RACES[cul.race].npcOnly ? 0.5 : 1));  // os Nyxar são grandes: menos gente na rua
    for (let i = 0; i < nCit; i++) s.npcSpots.push({ role: 'citizen', x: s.x0 + mid + rng.int(-pr, pr), y: s.y0 + mid + rng.int(-pr, pr) });
    const nGuard = (cul.guard || s.type === 'capital' || walled) ? (s.type === 'capital' ? 8 : s.type === 'town' ? 4 : 1) : 0;
    for (let i = 0; i < nGuard; i++) {
      const g = s.gates[i % s.gates.length];
      const gx = g.x + (g.dir === 'w' ? 2 : g.dir === 'e' ? -2 : 0), gy = g.y + (g.dir === 'n' ? 2 : g.dir === 's' ? -2 : 0);
      s.npcSpots.push({ role: 'guard', x: gx + (i >= s.gates.length ? 2 : 0), y: gy });
    }
    if (s.type !== 'village') s.npcSpots.push({ role: 'quest', x: s.x0 + mid + 2, y: s.y0 + mid - 1 });
    s.npcSpots.push({ role: 'quest', x: s.x0 + mid - 3, y: s.y0 + mid + 2 });
    s.mid = { x: s.x0 + mid, y: s.y0 + mid };
    this.addStamp({ x0: s.x0, y0: s.y0, w: size, h: size, tiles, objs });
  }

  placeBuilding(s, bt, bx, by, rng, objs, occ, size, cul, decorative = false, gid = null) {
    const B = BUILDINGS[bt];
    for (let y = by; y < by + B.h; y++) for (let x = bx; x < bx + B.w; x++) { objs[y * size + x] = O.BLOCK; occ[y * size + x] = 1; }
    for (let y = by - 1; y <= by + B.h; y++) for (let x = bx - 1; x <= bx + B.w; x++) if (x >= 0 && y >= 0 && x < size && y < size && !occ[y * size + x]) occ[y * size + x] = 4;
    const reg = s.region;
    const styleMap = { industrial: 'brick', human: 'timber', halfling: 'round', elf: 'elven', dwarf: 'stone', nordic: 'log', orc: 'hide', desert: 'adobe', swamp: 'stilt', fort: 'stone', tide: 'adobe', infernal: 'stone', jade: 'elven', imperial: 'brick', giant: 'log', gnome: 'round' };
    let style = styleMap[reg.culture] || cul.houseWall || 'timber';
    const elyStyle = !styleMap[reg.culture] && !!cul.houseWall;   // povos de Elyndra: arquitetura própria em todos os prédios
    let type = bt;
    if (elyStyle) { /* mantém o estilo do povo */ } else if (bt === 'castle' || bt === 'palace') { if (style === 'hide') style = 'log'; if (style === 'round' || style === 'stilt') style = 'timber'; if (reg.culture === 'human') style = 'castle'; }
    if (bt === 'temple' && style === 'hide') style = 'log';
    if ((bt === 'heroes' || bt === 'guildhall') && style === 'hide') style = 'log';
    if (bt === 'magic' && reg.culture === 'elf') type = 'tower';
    if (bt === 'tower') type = 'tower';
    const roof = bt === 'tower' && decorative ? shade(cul.wallC, -0.3) : rng.pick(cul.roof);
    const signs = { gunsmith: 'smith', inn: 'inn', smith: 'smith', general: 'general', alchemist: 'alchemist', magic: 'magic', heroes: 'guild', guildhall: 'guild', temple: 'temple', stable: 'stable', playerhouse: 'house' };
    const banner = gid ? GUILDS[gid].color : bt === 'heroes' ? '#e0b040' : reg.color;
    const spec = { type, w: B.w, h: B.h, style, roof: bt === 'magic' ? '#5a3a8a' : bt === 'temple' ? '#c0a050' : roof, wall: decorative ? shade(cul.wallC, -0.1) : cul.wallC, sign: signs[bt] || null, seed: rng.int(1, 99999), snow: !!cul.snowroof, chimney: style === 'brick' ? rng.chance(0.85) : rng.chance(0.4) && (style === 'timber' || style === 'log' || style === 'stone'), banner, domeC: rng.pick(['#4a80c0', '#e8e0d0', '#40a080']), dome: bt === 'house3' ? false : undefined };
    const ownerRace = cul.race;
    const ownerSex = rng.chance(0.5) ? 'm' : 'f';
    const nm = NAMES[ownerRace];
    const owner = { name: rng.pick(nm[ownerSex]) + ' ' + rng.pick(nm.s), race: ownerRace, sex: ownerSex, seed: rng.int(1, 999999) };
    let name = B.name;
    if (bt === 'inn') name = 'Taverna ' + rng.pick(SHOP_NAMES.inn);
    else if (SHOP_NAMES[bt]) name = rng.pick(SHOP_NAMES[bt]) + ' ' + owner.name.split(' ')[0];
    else if (bt === 'guildhall') name = GUILDS[gid].name;
    else if (bt === 'gunsmith') name = 'Armaria Arcana de ' + owner.name.split(' ')[0];
    else if (bt === 'factory') name = 'Fábrica ' + rng.pick(['a Vapor', 'de Engrenagens', 'de Cartuchos Arcanos', 'de Caldeiras', 'Real de Ferro']);
    else if (bt === 'house' || bt === 'house2' || bt === 'house3') name = 'Casa de ' + owner.name.split(' ')[0];
    else if (bt === 'castle' || bt === 'palace') name = (reg.ruler ? (reg.ruler.title === 'Rei' || reg.ruler.title === 'Rainha' ? 'Castelo' : 'Salão') + ' de ' + s.name : 'Fortaleza ' + s.name);
    if (bt === 'castle' || bt === 'palace') { if (reg.ruler) Object.assign(owner, { name: reg.ruler.title + ' ' + reg.ruler.name, race: reg.ruler.race, ruler: true }); else owner.name = 'Comandante Helena Aurora'; }
    const b = { kind: bt, role: B.role, guild: gid || (bt === 'heroes' ? 'herois' : null), tx: s.x0 + bx, ty: s.y0 + by, w: B.w, h: B.h, spec, name, owner, settlement: s, decorative };
    s.buildings.push(b);
    if (!decorative && B.role !== 'tower') {
      const dx = s.x0 + bx + Math.floor(B.w / 2), dy = s.y0 + by + B.h - 1;
      b.door = { x: dx, y: dy };
      this.doors.set(tkey(dx, dy), b);
    }
    return b;
  }

  stampDungeon(d) {
    const dt = DUNGEON_TYPES[d.type];
    const w = 7, h = 5, x0 = d.x - 3, y0 = d.y - 3;
    const tiles = new Uint8Array(w * h).fill(255), objs = new Uint8Array(w * h).fill(0);
    const grd = d.type === 'tumba_deserto' ? T.SANDSTONE : d.type === 'arena' ? T.SANDSTONE : (dt.gen === 'rooms' ? T.DCOBBLE : T.DIRT);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const t = this.baseTile(x0 + x, y0 + y);
      if (TSOLID[t] || TWATER[t] || t === T.LAVA) tiles[y * w + x] = T.DIRT;
    }
    for (let y = 3; y < h; y++) for (let x = 2; x < 5; x++) tiles[y * w + x] = grd;
    objs[3 * w + 3] = dt.ent;
    if (dt.gen === 'rooms') { objs[3 * w + 1] = O.TORCH; objs[3 * w + 5] = O.TORCH; }
    else { objs[4 * w + 1] = O.BONES; objs[2 * w + 5] = O.ROCK; }
    if (d.unique) { objs[4 * w + 0] = O.BANNER; objs[4 * w + 6] = O.BANNER; }
    this.addStamp({ x0, y0, w, h, tiles, objs });
    this.entrances.set(tkey(d.x, d.y), d);
  }
  stampCamp(p, rng) {
    const w = 11, h = 11, x0 = p.x - 5, y0 = p.y - 5;
    const tiles = new Uint8Array(w * h).fill(255), objs = new Uint8Array(w * h).fill(0);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const t = this.baseTile(x0 + x, y0 + y);
      const dd = Math.hypot(x - 5, y - 5);
      if (TSOLID[t] || TWATER[t] || t === T.LAVA || dd < 4) tiles[y * w + x] = T.DIRT;
    }
    objs[5 * w + 5] = O.CAMPFIRE;
    for (const [x, y] of [[2, 2], [8, 2], [2, 8], [8, 7]]) objs[y * w + x] = O.TENT;
    objs[5 * w + 8] = O.CHEST; objs[4 * w + 2] = O.CRATE; objs[6 * w + 2] = O.BARREL;
    if (p.region.id === 'gorthak') objs[1 * w + 5] = O.HUT_TOTEM; else objs[1 * w + 5] = O.BANNER;
    this.addStamp({ x0, y0, w, h, tiles, objs });
    p.chest = { x: p.x + 3, y: p.y };
    this.poiAt.set(tkey(p.x + 3, p.y), p);
  }
  stampSmall(p, obj, rng) {
    const w = 5, h = 5, x0 = p.x - 2, y0 = p.y - 2;
    const tiles = new Uint8Array(w * h).fill(255), objs = new Uint8Array(w * h).fill(0);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const t = this.baseTile(x0 + x, y0 + y);
      if (TSOLID[t] || TWATER[t] || t === T.LAVA) tiles[y * w + x] = T.DIRT;
      if ((x === 0 || x === 4 || y === 0 || y === 4) && (x + y) % 2 === 0) objs[y * w + x] = O.ROCK;
    }
    tiles[3 * w + 2] = T.COBBLE; tiles[4 * w + 2] = T.COBBLE;
    objs[2 * w + 2] = obj; objs[4 * w + 2] = 0;
    this.addStamp({ x0, y0, w, h, tiles, objs });
    this.poiAt.set(tkey(p.x, p.y), p);
  }

  // ---------- Estradas ----------
  buildRoads(rng, S = this.settlements, uniq = true) {
    const edges = [];
    const byReg = {};
    for (const s of S) (byReg[s.region.id] = byReg[s.region.id] || []).push(s);
    // MST dentro de cada região
    for (const list of Object.values(byReg)) {
      const inTree = [list[0]];
      const rest = list.slice(1);
      while (rest.length) {
        let best = null, bd = Infinity, bi = -1;
        for (const a of inTree) for (let i = 0; i < rest.length; i++) { const d = dist(a.x, a.y, rest[i].x, rest[i].y); if (d < bd) { bd = d; best = [a, rest[i]]; bi = i; } }
        edges.push({ a: best[0], b: best[1], w: 2 });
        inTree.push(rest[bi]); rest.splice(bi, 1);
      }
    }
    // capitais conectadas
    const caps = S.filter(s => s.type === 'capital' || (s.region.hostile && s.type === 'town'));
    const capTree = [caps.find(c => c.region.id === 'valdoria') || caps[0]];
    const capRest = caps.filter(c => c !== capTree[0]);
    while (capRest.length) {
      let best = null, bd = Infinity, bi = -1;
      for (const a of capTree) for (let i = 0; i < capRest.length; i++) { const d = dist(a.x, a.y, capRest[i].x, capRest[i].y); if (d < bd) { bd = d; best = [a, capRest[i]]; bi = i; } }
      edges.push({ a: best[0], b: best[1], w: 3 });
      capTree.push(capRest[bi]); capRest.splice(bi, 1);
    }
    // algumas conexões extras
    for (let i = 0; i < caps.length; i++) {
      let near = null, nd = Infinity;
      for (let j = 0; j < caps.length; j++) { if (i === j) continue; const d = dist(caps[i].x, caps[i].y, caps[j].x, caps[j].y); if (d < nd && !edges.some(e => (e.a === caps[i] && e.b === caps[j]) || (e.b === caps[i] && e.a === caps[j]))) { nd = d; near = caps[j]; } }
      if (near && nd < 1500) edges.push({ a: caps[i], b: near, w: 3 });
    }
    // masmorras únicas ligadas ao assentamento mais próximo
    if (uniq) for (const d of this.dungeons) if (d.unique) {
      let near = null, nd = Infinity;
      for (const s of S) { const dd = dist(s.x, s.y, d.x, d.y); if (dd < nd) { nd = dd; near = s; } }
      if (near) edges.push({ a: near, b: { x: d.x, y: d.y + 1, gates: [{ x: d.x, y: d.y + 1, dir: 's' }] }, w: 2 });
    }
    this.roadEdges = (this.roadEdges || []).concat(edges);
    for (const e of edges) {
      const ga = this.closestGate(e.a, e.b), gb = this.closestGate(e.b, e.a);
      const pts = [[ga.x, ga.y], [gb.x, gb.y]];
      const path = this.wiggle(pts[0], pts[1], rng, 0);
      // conecta ao portão em linha reta a partir da saída
      for (let i = 0; i < path.length - 1; i++) this.rasterRoad(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1], e.w);
      this.extendGate(ga, e.w); this.extendGate(gb, e.w);
    }
  }
  extendGate(g, w) {
    if (g.gx === undefined) return;
    this.rasterRoad(g.gx, g.gy, g.x, g.y, w);
  }
  closestGate(s, other) {
    if (!s.gates || !s.gates.length) return { x: s.x, y: s.y };
    let best = s.gates[0], bd = Infinity;
    for (const g of s.gates) {
      const ox = g.x + (g.dir === 'w' ? -4 : g.dir === 'e' ? 4 : 0), oy = g.y + (g.dir === 'n' ? -4 : g.dir === 's' ? 4 : 0);
      const d = dist(ox, oy, other.x, other.y); if (d < bd) { bd = d; best = g; }
    }
    const ox = best.x + (best.dir === 'w' ? -4 : best.dir === 'e' ? 4 : 0), oy = best.y + (best.dir === 'n' ? -4 : best.dir === 's' ? 4 : 0);
    return { x: ox, y: oy, dir: best.dir, gx: best.x, gy: best.y };
  }
  wiggle(a, b, rng, depth) {
    const len = dist(a[0], a[1], b[0], b[1]);
    if (len < 28 || depth > 7) return [a, b];
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    const nx = -(b[1] - a[1]) / len, ny = (b[0] - a[0]) / len;
    let off = rng.range(-0.18, 0.18) * len;
    // evita água/montanha: testa alguns deslocamentos
    let best = off, bestScore = -1;
    for (let k = 0; k < 5; k++) {
      const o = k === 0 ? off : rng.range(-0.25, 0.25) * len;
      const px = Math.round(mx + nx * o), py = Math.round(my + ny * o);
      const t = this.baseTile(px, py);
      const score = (TSOLID[t] ? 0 : TWATER[t] ? 1 : t === T.LAVA ? 0 : 3) - Math.abs(o) / len;
      if (score > bestScore) { bestScore = score; best = o; }
    }
    const m = [Math.round(mx + nx * best), Math.round(my + ny * best)];
    return this.wiggle(a, m, rng, depth + 1).concat(this.wiggle(m, b, rng, depth + 1).slice(1));
  }
  rasterRoad(x0, y0, x1, y1, w) {
    x0 = Math.round(x0); y0 = Math.round(y0); x1 = Math.round(x1); y1 = Math.round(y1);
    const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
    let err = dx + dy, x = x0, y = y0;
    const half = Math.floor((w - 1) / 2);
    for (let n = 0; n < 20000; n++) {
      for (let oy = -half; oy < w - half; oy++) for (let ox = -half; ox < w - half; ox++) this.markRoad(x + ox, y + oy);
      if (x === x1 && y === y1) break;
      const e2 = 2 * err;
      if (e2 >= dy) { err += dy; x += sx; }
      if (e2 <= dx) { err += dx; y += sy; }
    }
  }
  markRoad(x, y) {
    if (x < 1 || y < 1 || x >= WORLD_W - 1 || y >= WORLD_H - 1) return;
    const k = this.ckey(x >> 5, y >> 5);
    let s = this.roadTiles.get(k);
    if (!s) { s = new Set(); this.roadTiles.set(k, s); }
    s.add(((y & 31) << 5) | (x & 31));
  }

  // ---------- Consultas ----------
  settlementAt(tx, ty) {
    for (const s of this.settlements) if (tx >= s.x0 && ty >= s.y0 && tx < s.x0 + s.w && ty < s.y0 + s.h) return s;
    return null;
  }
  nearestSettlement(tx, ty, filter) {
    let best = null, bd = Infinity;
    for (const s of this.settlements) { if (filter && !filter(s)) continue; const d = dist2(tx, ty, s.x, s.y); if (d < bd) { bd = d; best = s; } }
    return best;
  }
  buildingsInView(x0, y0, x1, y1) {
    const out = [];
    for (const s of this.settlements) {
      if (s.x0 * 16 > x1 + 64 || (s.x0 + s.w) * 16 < x0 - 64 || s.y0 * 16 > y1 + 160 || (s.y0 + s.h) * 16 < y0 - 64) continue;
      for (const b of s.buildings) out.push(b);
    }
    for (const b of this.extras || []) { if (b.tx * 16 > x1 + 64 || (b.tx + b.w) * 16 < x0 - 64 || b.ty * 16 > y1 + 160 || (b.ty + b.h) * 16 < y0 - 64) continue; out.push(b); }
    for (const h of this.homes) { const b = h._b; if (!b || b.tx * 16 > x1 + 64 || (b.tx + b.w) * 16 < x0 - 64 || b.ty * 16 > y1 + 160 || (b.ty + b.h) * 16 < y0 - 64) continue; out.push(b); }
    return out;
  }
  // ---------- Casas construídas pelo jogador ----------
  homeSize(h) { const T_ = HOME_TIERS[h.tier]; return { w: T_.w, h: T_.h }; }
  addHome(h) {
    const { w, h: hh } = this.homeSize(h);
    const reg = this.regions[this.regAt(h.x, h.y)];
    const mid = { x: h.x + Math.floor(w / 2), y: h.y + hh + 1 };
    const pseudo = { id: h.id, name: h.name, type: 'home', region: reg, x: mid.x, y: mid.y, cx: mid.x, cy: mid.y, mid, gates: [{ x: mid.x, y: mid.y, dir: 's' }], x0: h.x, y0: h.y, w, h: hh, buildings: [], npcSpots: [], lamps: [] };
    const q = h.quality || 0;
    const roofs = ['#6a5a4a', '#8a4a2a', '#a03a2a', '#3a5a8a', '#6a2a6a'];
    const spec = { type: 'house', w, h: hh, style: q >= 3 ? 'stone' : 'timber', roof: roofs[q], wall: q === 0 ? '#b8a888' : q >= 3 ? '#a8a4a0' : '#e8dcc0', seed: hashStr(h.id), chimney: q >= 1, quality: q };
    const b = { kind: 'playerhouse', role: 'playerhouse', guild: null, tx: h.x, ty: h.y, w, h: hh, spec, name: h.name, owner: { name: 'Você', race: 'humano', sex: 'm', seed: 1 }, settlement: pseudo, home: h, site: !h.done, decorative: false };
    if (h.done) { b.door = { x: h.x + Math.floor(w / 2), y: h.y + hh - 1 }; }
    pseudo.buildings = [b];
    h._b = b; h._s = pseudo;
    // remove carimbo antigo
    for (const [k, list] of this.stampIndex) this.stampIndex.set(k, list.filter(st => st.homeId !== h.id));
    for (const [k, d] of this.doors) if (d.home && d.home.id === h.id) this.doors.delete(k);
    if (b.door) this.doors.set(tkey(b.door.x, b.door.y), b);
    const W2 = w + 2, H2 = hh + 3;
    const tiles = new Uint8Array(W2 * H2).fill(255), objs = new Uint8Array(W2 * H2).fill(0);
    for (let y = 0; y < H2; y++) for (let x = 0; x < W2; x++) {
      const inFoot = x >= 1 && x <= w && y >= 0 && y < hh;
      if (inFoot) objs[y * W2 + x] = O.BLOCK;
      if (y >= hh && x >= 1 && x <= w) tiles[y * W2 + x] = x === Math.floor(w / 2) + 1 ? T.ROAD : 255;
    }
    if (!h.done) objs[(hh) * W2 + 0] = O.WORKBENCH;
    this.addStamp({ x0: h.x - 1, y0: h.y, w: W2, h: H2, tiles, objs, homeId: h.id });
    for (let cy = (h.y >> 5) - 1; cy <= ((h.y + H2) >> 5) + 1; cy++) for (let cx = ((h.x - 1) >> 5) - 1; cx <= ((h.x + W2) >> 5) + 1; cx++) { this.chunks.delete(this.ckey(cx, cy)); this.canvases.delete(this.ckey(cx, cy)); }
    this.pending = null;
    if (!this.homes.includes(h)) this.homes.push(h);
    return b;
  }
  // Imagem do mapa-múndi gerada aos poucos
  startMapImage() {
    const R = MAP_H, step = 16;
    this.mapCanvas = Sprites.cv(MAP_W, R);
    this.mapCtx = this.mapCanvas.getContext('2d');
    this.mapImg = this.mapCtx.createImageData(MAP_W, R);
    this.mapRow = 0; this.mapDone = false;
    this.mapStep = step;
  }
  // rows: limite de linhas; budget (ms): para antes se o quadro já gastou tempo demais
  stepMapImage(rows = 8, budget = 0) {
    if (this.mapDone || !this.mapImg) return;
    const R = MAP_H, step = this.mapStep, d = this.mapImg.data, t0 = budget ? performance.now() : 0;
    for (let k = 0; k < rows && this.mapRow < R; k++, this.mapRow++) {
      if (budget && k && performance.now() - t0 > budget) break;
      const y = this.mapRow;
      for (let x = 0; x < MAP_W; x++) {
        const t = this.baseTile(Math.floor(x * step + step / 2), Math.floor(y * step + step / 2));
        if (!this.navWater) this.navWater = new Uint8Array(MAP_W * MAP_H);
        this.navWater[y * MAP_W + x] = (TWATER[t] || t === T.DEEP) ? 1 : 0;
        const [r, g, b] = hexToRgb(TILE_DEFS[t].c);
        const sh = clamp(1 + (this._e - 0.5) * 0.35, 0.8, 1.25);
        const i = (y * MAP_W + x) * 4; d[i] = r * sh; d[i + 1] = g * sh; d[i + 2] = b * sh; d[i + 3] = 255;
      }
    }
    if (this.mapRow >= R) {
      this.mapCtx.putImageData(this.mapImg, 0, 0); this.mapImg = null;   // já está no canvas: libera a cópia
      // estradas
      this.mapCtx.fillStyle = 'rgba(170,130,80,0.9)';
      for (const [k, set] of this.roadTiles) {
        const cx = k % 1024, cy = Math.floor(k / 1024);
        for (const i of set) { if ((i & 3) || ((i >> 5) & 3)) continue; this.mapCtx.fillRect(Math.floor((cx * 32 + (i & 31)) / step), Math.floor((cy * 32 + (i >> 5)) / step), 1, 1); }
      }
      this.mapDone = true;
    }
  }
}
