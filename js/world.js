'use strict';
/* =========================================================
   MUNDO — cenários (Normandia, Norte da África, Itália,
   Ardenas), terreno, vilas, trincheiras, vegetação,
   objetos de cobertura e consultas espaciais.
   Norte = -Z (interior). Sul = +Z (mar ou estrada de chegada).
   ========================================================= */
const WORLD = { minX: -700, maxX: 700, minZ: -1000, maxZ: 620 };
const SHORE_Z = 330;
const DRAWS = [-220, 180];
const WIRE_Z = 214;
const WIRE_GAPS = [-400, -220, -60, 180, 330];

const SCENARIOS = {
  omaha: {
    id: 'omaha', biome: 'normandy', coast: true, bluff: 17, hills: 1, seed: 61944,
    title: 'DIA D', subtitle: 'Praia de Omaha, Normandia', card: 'Normandia', when: '6 jun 1944',
    eyebrow: '6 DE JUNHO DE 1944 · 06:30 · SETOR DOG GREEN',
    brief: ['Você comanda a primeira onda da 29ª Divisão de Infantaria. As barcaças Higgins vão abrir a rampa sob o fogo das casamatas alemãs no alto da falésia. Destrua as quatro casamatas para assegurar a praia.',
      'Depois, um navio LST trará o Veículo de Construção. Monte a base, capture as vilas e avance até o quartel-general alemão em Trévières.'],
    towns: ['Vierville-sur-Mer', 'Saint-Laurent-sur-Mer', 'Colleville-sur-Mer', 'Formigny', 'Trévières'],
    sky: 0x9ba6ab, fog: [300, 1200], sun: 0xfff0d8, sunI: 0.8, hemi: [0xcad4da, 0x4a4632, 0.8], skyTop: 0x7f8d96, skyHor: 0xb6b8b0,
  },
  africa: {
    id: 'africa', biome: 'desert', coast: false, bluff: 10, hills: 1.6, seed: 1943,
    title: 'KASSERINE', subtitle: 'Passo de Kasserine, Tunísia', card: 'Norte da África', when: 'fev 1943',
    eyebrow: '19 DE FEVEREIRO DE 1943 · II CORPO DOS EUA',
    brief: ['O Afrika Korps de Rommel rompeu as linhas americanas na Tunísia. Seu comboio de caminhões chega pela estrada do deserto: desembarque a infantaria e destrua as quatro posições alemãs que dominam o passo.',
      'Um comboio de engenharia trará o Veículo de Construção. Monte a base, retome os oásis e as aldeias e destrua o quartel-general alemão em Sidi Bou Zid.'],
    towns: ['Kasserine', 'Sbiba', 'Thala', 'Fériana', 'Sidi Bou Zid'],
    sky: 0xd6c7a6, fog: [260, 1100], sun: 0xfff2d6, sunI: 1.0, hemi: [0xf0e3c4, 0x8a6f4a, 0.75], skyTop: 0x8fa8bd, skyHor: 0xe3d2ae,
    pal: { us: { jacket: 0x8d8059, pants: 0x7b7052, helm: 0x5b623c }, de: { jacket: 0xa48d5f, pants: 0x988457, helm: 0x8c7a52, collar: 0x8a7650, pack: 0x8f7d55 } },
    paint: { us: { paint: 0x6e6a43, camo: null }, de: { paint: 0xab9461, camo: [0x8f7a4c, 0xb9a678] } },
  },
  italia: {
    id: 'italia', biome: 'med', coast: true, bluff: 9, hills: 1.3, seed: 1944,
    title: 'ANZIO', subtitle: 'Desembarque em Anzio, Itália', card: 'Itália', when: '22 jan 1944',
    eyebrow: '22 DE JANEIRO DE 1944 · OPERAÇÃO SHINGLE',
    brief: ['A 3ª Divisão de Infantaria desembarca atrás da Linha Gustav, nas praias de Anzio. As casamatas alemãs nas dunas precisam cair antes que os reforços cheguem.',
      'Um LST trará o Veículo de Construção. Monte a base entre os olivais, liberte as cidades do Lácio e destrua o quartel-general alemão em Campoleone.'],
    towns: ['Anzio', 'Nettuno', 'Aprilia', 'Cisterna', 'Campoleone'],
    sky: 0xa9bacb, fog: [320, 1250], sun: 0xfff4e2, sunI: 0.9, hemi: [0xd4dde6, 0x56523a, 0.78], skyTop: 0x7896b3, skyHor: 0xc6ccd0,
  },
  ardenas: {
    id: 'ardenas', biome: 'winter', coast: false, bluff: 12, hills: 2.2, seed: 1212,
    title: 'ARDENAS', subtitle: 'Batalha das Ardenas, Bélgica', card: 'Ardenas', when: 'dez 1944',
    eyebrow: '26 DE DEZEMBRO DE 1944 · RUMO A BASTOGNE',
    brief: ['Bastogne está cercada. O comboio do 3º Exército de Patton chega pela estrada coberta de neve: a infantaria desce dos caminhões e precisa destruir as quatro posições alemãs na floresta.',
      'Um comboio de engenharia trará o Veículo de Construção. Monte a base na neve, liberte as aldeias e destrua o quartel-general alemão em Houffalize.'],
    towns: ['Foy', 'Noville', 'Recogne', 'Bizory', 'Houffalize'],
    sky: 0xc3c9ce, fog: [180, 820], sun: 0xe8eef5, sunI: 0.62, hemi: [0xe2e8ee, 0x7d8088, 0.9], skyTop: 0x9aa6b0, skyHor: 0xd0d4d6, snow: true,
    pal: { us: { jacket: 0x5a573c, pants: 0x504d36 }, de: { jacket: 0x656b62, pants: 0x585e55 } },
    paint: { us: { paint: 0x4f5428, camo: [0xd9dbd6, 0xc5c8c2] }, de: { paint: 0xd6d8d2, camo: [0x9a8a58, 0x6d6a5a] } },
  },
  pacifico: {
    id: 'pacifico', biome: 'tropical', coast: true, bluff: 8, hills: 1.4, seed: 1544, mountain: [330, -560, 58, 150],
    title: 'SAIPAN', subtitle: 'Ilhas Marianas, Pacífico', card: 'Pacífico', when: '15 jun 1944',
    eyebrow: '15 DE JUNHO DE 1944 · 2ª E 4ª DIVISÕES DE FUZILEIROS NAVAIS',
    brief: ['Os Fuzileiros Navais desembarcam nas praias de coral de Saipan. Casamatas japonesas de troncos de coqueiro dominam a praia, e a Marinha Imperial vai mandar contratorpedeiros e caças Zero contra a sua frota.',
      'Monte a base, construa uma Base Naval para enfrentar a frota japonesa, resista às cargas banzai e destrua o quartel-general japonês ao pé do Monte Tapochau.'],
    towns: ['Charan Kanoa', 'Garapan', 'Tanapag', 'Aslito', 'Monte Tapochau'],
    sky: 0x9cc3de, fog: [320, 1300], sun: 0xfff6e0, sunI: 1.0, hemi: [0xd8ecf6, 0x4a5a32, 0.8], skyTop: 0x5b93c4, skyHor: 0xcfe2ea,
    water: { deep: 0x124a66, shallow: 0x3cb7b0, sand: 0xd9cfae },
    pal: { us: { jacket: 0x6c7550, pants: 0x646c4a, helm: 0x5b6a3c, band: 0x4a5a30 }, de: { jacket: 0x857a52, pants: 0x7d7350, helm: 0x645d3c, collar: 0x7a704a, web: 0x5a4632, pack: 0x7a6d48, boot: 0x3d3326, legging: 0x8a7f58 } },
    paint: { us: { paint: 0x5a6136, camo: null }, de: { paint: 0x7d6c45, camo: [0x4f5a35, 0x9a8a5a] } },
    unitMap: { gren: 'jinf', pzschreck: 'jat', panzer4: 'chiha', tiger: 'chiha', stug: 'chiha', sdkfz251: 'hago', sani: 'jmedic', sboot: 'jdd' },
    foe: { adj: 'japonês', adjF: 'japonesa', pl: 'japoneses', air: 'zero' },
    names: { dehq: 'Quartel-General Japonês', bunker: 'Casamata japonesa', nest_de: 'Ninho de metralhadora Tipo 92', flak_de: 'Canhão AA Tipo 96' },
    strikeNames: { p47: 'Caças F6F Hellcat', b26: 'Bombardeiros B-25', naval: 'Bombardeio naval' },
    airNames: { p47: 'F6F Hellcat', b26: 'B-25 Mitchell' },
  },
};
let SC = SCENARIOS.omaha;

function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function smooth(t) { t = clamp(t, 0, 1); return t * t * (3 - 2 * t); }
function lerp(a, b, t) { return a + (b - a) * t; }
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
let wr = mulberry32(61944);
function wrr(a, b) { return a + (b - a) * wr(); }
function wpick(arr) { return arr[(wr() * arr.length) | 0]; }
function wpickFrom(arr, seed) { return arr[Math.abs(Math.floor(seed * 13.37)) % arr.length]; }
function hash2(i, j) { const h = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return h - Math.floor(h); }

function groundH(x, z) {
  const B = SC.bluff;
  let h;
  if (z > 232) {
    if (SC.coast) {
      if (z > SHORE_Z) return -(z - SHORE_Z) * 0.045 - 1.2 * smooth((z - SHORE_Z) / 24);
      h = (SHORE_Z - z) * 0.03;
    } else {
      h = 2.94 + smooth((z - 232) / 50) * (1.0 * Math.sin(x * 0.013 + z * 0.01) + 0.6 * Math.sin(x * 0.04 - z * 0.03) + 0.8);
    }
  } else {
    h = 2.94 + B * smooth((232 - z) / 62);
    for (let i = 0; i < DRAWS.length; i++) {
      const w = 1 - smooth((Math.abs(x - DRAWS[i]) - 16) / 34);
      if (w > 0) h = h * (1 - w) + (2.94 + B * smooth((232 - z) / 150)) * w;
    }
    const k = smooth((175 - z) / 90) * SC.hills;
    if (k > 0) h += k * (2.6 * Math.sin(x * 0.011 + 1.3) * Math.cos(z * 0.009) + 1.4 * Math.sin(x * 0.027 + z * 0.021) + 0.7 * Math.cos(x * 0.05 - z * 0.04));
  }
  if (SC.mountain) { const [mx, mz, mh, mr] = SC.mountain, dx = x - mx, dz = z - mz; h += mh * Math.exp(-(dx * dx + dz * dz) / (mr * mr)); }
  if (SC.biome === 'desert') {
    const k = smooth((200 - z) / 120);
    h += k * (1.4 * Math.sin(x * 0.021 + Math.sin(z * 0.013) * 2.2) * Math.sin(z * 0.017) + 0.6 * Math.sin(x * 0.06 + z * 0.045));
  }
  return h;
}
function surfaceH(x, z) { return Math.max(groundH(x, z), 0); }

const FIELDS = {
  normandy: [[0.36, 0.47, 0.22], [0.30, 0.41, 0.19], [0.62, 0.57, 0.31], [0.44, 0.36, 0.24], [0.44, 0.53, 0.26], [0.33, 0.44, 0.2], [0.55, 0.55, 0.28]],
  med: [[0.42, 0.5, 0.26], [0.5, 0.48, 0.3], [0.55, 0.45, 0.32], [0.46, 0.55, 0.3], [0.38, 0.44, 0.24], [0.6, 0.55, 0.36]],
  desert: [[0.78, 0.66, 0.46], [0.74, 0.62, 0.43], [0.8, 0.7, 0.5], [0.7, 0.58, 0.4]],
  tropical: [[0.36, 0.52, 0.2], [0.5, 0.6, 0.24], [0.28, 0.44, 0.15], [0.56, 0.42, 0.28], [0.44, 0.56, 0.22]],
  winter: [[0.9, 0.92, 0.95], [0.86, 0.88, 0.91], [0.92, 0.93, 0.95], [0.8, 0.82, 0.84]],
};
function groundColor(x, z, h, c) {
  let r, g, b;
  const n = Math.sin(x * 0.37 + z * 0.11) * Math.cos(z * 0.29 - x * 0.07) * 0.035, bio = SC.biome;
  const k = hash2(Math.floor(x / 70), Math.floor(z / 60));
  const F = FIELDS[bio][Math.floor(k * FIELDS[bio].length)];
  if (SC.coast && h < 0.12) { r = 0.40; g = 0.39; b = 0.31; }
  else if (SC.coast && z > 236) {
    const wet = smooth((z - 296) / 30), sand = bio === 'med' ? [0.74, 0.69, 0.57] : bio === 'tropical' ? [0.88, 0.84, 0.72] : [0.8, 0.72, 0.53];
    r = sand[0] - wet * 0.2; g = sand[1] - wet * 0.18; b = sand[2] - wet * 0.13;
    if (z < 251) { if (bio === 'tropical') { r = 0.8; g = 0.76; b = 0.64; } else { r = 0.55; g = 0.53; b = 0.5; } }
  } else if (bio === 'tropical' && z > 150) {
    const gr = smooth((236 - z) / 34);
    r = lerp(0.78, 0.3, gr); g = lerp(0.74, 0.46, gr); b = lerp(0.6, 0.18, gr);
  } else if (bio === 'desert') {
    r = F[0]; g = F[1]; b = F[2];
    const rock = Math.sin(x * 0.045 + 1.7) * Math.cos(z * 0.05) + (z < 232 && z > 160 ? 0.5 : 0);
    if (rock > 0.75) { r = 0.6; g = 0.49; b = 0.36; }
    if (Math.sin(x * 0.11 + z * 0.07) > 0.93) { r -= 0.12; g -= 0.08; b -= 0.06; }
  } else if (bio === 'winter') {
    r = F[0]; g = F[1]; b = F[2];
    const thin = Math.sin(x * 0.07 + 0.4) * Math.cos(z * 0.06) + (z < 232 && z > 160 ? 0.4 : 0);
    if (thin > 0.8) { r = 0.6; g = 0.6; b = 0.56; } else if (thin > 0.6) { r = 0.76; g = 0.77; b = 0.76; }
  } else if (z > 150) {
    const gr = smooth((236 - z) / 34);
    r = lerp(0.6, 0.40, gr); g = lerp(0.56, 0.46, gr); b = lerp(0.40, 0.24, gr);
    if (Math.sin(x * 0.08) * Math.cos(z * 0.13) > 0.55) { r = 0.47; g = 0.41; b = 0.29; }
  } else {
    r = F[0]; g = F[1]; b = F[2];
    if (k > 0.55) { const f = Math.sin(x * 1.1 + z * 0.2) * 0.025; r += f; g += f; }
    const bl = smooth((z - 110) / 40);
    r = lerp(r, 0.40, bl); g = lerp(g, 0.46, bl); b = lerp(b, 0.24, bl);
  }
  c[0] = r + n; c[1] = g + n; c[2] = b + n * 0.6;
}

function segDist(px, pz, ax, az, bx, bz) {
  const dx = bx - ax, dz = bz - az, l2 = dx * dx + dz * dz;
  let t = l2 ? ((px - ax) * dx + (pz - az) * dz) / l2 : 0;
  t = clamp(t, 0, 1);
  const qx = ax + dx * t - px, qz = az + dz * t - pz;
  return Math.sqrt(qx * qx + qz * qz);
}

class SGrid {
  constructor(cell) { this.cell = cell; this.m = new Map(); }
  key(cx, cz) { return (cx + 4096) * 8192 + (cz + 4096); }
  add(o) {
    const k = this.key(Math.floor(o.x / this.cell), Math.floor(o.z / this.cell));
    let a = this.m.get(k); if (!a) { a = []; this.m.set(k, a); }
    a.push(o); return o;
  }
  near(x, z, out, rad) {
    out.length = 0;
    const R = rad || 1, cx = Math.floor(x / this.cell), cz = Math.floor(z / this.cell);
    for (let i = -R; i <= R; i++) for (let j = -R; j <= R; j++) {
      const a = this.m.get(this.key(cx + i, cz + j));
      if (a) for (let k = 0; k < a.length; k++) if (!a[k].dead) out.push(a[k]);
    }
    return out;
  }
}

/* geometria estática mesclada (uma malha, cores por vértice) */
const _niCache = new Map();
function nonIndexed(geo) { let g = _niCache.get(geo); if (!g) { g = geo.index ? geo.toNonIndexed() : geo; _niCache.set(geo, g); } return g; }
const _m4 = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _v = new THREE.Vector3(), _s = new THREE.Vector3(), _n3 = new THREE.Matrix3(), _col = new THREE.Color();
class GeoBuilder {
  constructor() { this.p = []; this.n = []; this.c = []; this.cf = null; }
  add(geo, color, sx, sy, sz, x, y, z, rx, ry, rz, parent) {
    _e.set(rx || 0, ry || 0, rz || 0); _q.setFromEuler(_e);
    _m4.compose(_v.set(x, y, z), _q, _s.set(sx, sy, sz));
    if (parent) _m4.premultiply(parent);
    _n3.getNormalMatrix(_m4); _col.setHex(color);
    const g = nonIndexed(geo), pa = g.attributes.position, na = g.attributes.normal;
    const t = new THREE.Vector3();
    for (let i = 0; i < pa.count; i++) {
      t.fromBufferAttribute(pa, i).applyMatrix4(_m4); this.p.push(t.x, t.y, t.z);
      const cc = this.cf ? this.cf(t.x, t.y, t.z, _col) : _col; this.c.push(cc.r, cc.g, cc.b);
      t.fromBufferAttribute(na, i).applyMatrix3(_n3).normalize(); this.n.push(t.x, t.y, t.z);
    }
  }
  tri(a, b, c, color) {
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    if (ny < 0) { const t = b; b = c; c = t; nx = -nx; ny = -ny; nz = -nz; }
    const l = Math.hypot(nx, ny, nz) || 1; _col.setHex(color);
    for (const p of [a, b, c]) { this.p.push(p[0], p[1], p[2]); this.n.push(nx / l, ny / l, nz / l); this.c.push(_col.r, _col.g, _col.b); }
  }
  ribbon(pts, width, lift, color, colorJitter) {
    const out = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1];
      const L = Math.hypot(bx - ax, bz - az), n = Math.max(1, Math.ceil(L / 5));
      for (let k = (i ? 1 : 0); k <= n; k++) out.push([lerp(ax, bx, k / n), lerp(az, bz, k / n)]);
    }
    let prevL = null, prevR = null;
    for (let i = 0; i < out.length; i++) {
      const p = out[i], q = out[Math.min(i + 1, out.length - 1)], o = out[Math.max(i - 1, 0)];
      let dx = q[0] - o[0], dz = q[1] - o[1]; const l = Math.hypot(dx, dz) || 1; dx /= l; dz /= l;
      const lx = p[0] - dz * width / 2, lz = p[1] + dx * width / 2, rx = p[0] + dz * width / 2, rz = p[1] - dx * width / 2;
      const L = [lx, surfaceH(lx, lz) + lift, lz], R = [rx, surfaceH(rx, rz) + lift, rz];
      if (prevL) {
        const col = colorJitter ? (wr() < 0.5 ? color : colorJitter) : color;
        this.tri(prevL, prevR, R, col); this.tri(prevL, R, L, col);
      }
      prevL = L; prevR = R;
    }
  }
  build() {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
    g.computeBoundingSphere();
    return g;
  }
}

const TOWN_POS = [
  { x: -255, z: -30, r: 52, cp: true }, { x: 135, z: -150, r: 58, cp: true }, { x: 430, z: -20, r: 48, cp: true },
  { x: -90, z: -470, r: 58, cp: true }, { x: 60, z: -850, r: 72, hq: true },
];
const BASE_ROADS = [
  [[-690, 118], [-420, 112], [-220, 118], [0, 124], [180, 118], [420, 112], [690, 120]],
  [[-220, 262], [-221, 180], [-232, 110], [-250, 20], [-255, -30]],
  [[-255, -30], [-200, -200], [-140, -360], [-90, -470]],
  [[180, 262], [180, 175], [165, 60], [145, -60], [135, -150]],
  [[135, -150], [60, -300], [-20, -400], [-90, -470]],
  [[135, -150], [260, -110], [430, -20]],
  [[-90, -470], [-40, -640], [20, -760], [60, -850]],
  [[430, -20], [420, -250], [330, -520], [180, -740], [60, -850]],
  [[-255, -30], [-430, -160], [-520, -420], [-600, -700]],
  [[60, -850], [60, -995]], [[60, -850], [-300, -880], [-695, -900]], [[60, -850], [400, -900], [695, -930]],
];
const MAP = { bunkerSpots: [[-300, 187], [-140, 191], [62, 189], [262, 187]], MMW: 176, MMH: 203 };
function resetMap() {
  Object.assign(MAP, {
    towns: TOWN_POS.map((t, i) => Object.assign({ name: SC.towns[i] }, t)),
    roads: BASE_ROADS.map(r => r.slice()), roadSegs: [], trenchLines: [], trenchSpots: [], hedgehogs: [], hedge: new Set(),
    obstacles: new SGrid(24), coverPts: new SGrid(12), trench: new SGrid(10),
    navalGuns: [], ships: [], water: null, miniBase: null, root: MAP.root || null,
  });
  if (!SC.coast) {
    MAP.roads[1].unshift([-226, 615], [-222, 420]);
    MAP.roads[3].unshift([170, 615], [178, 420]);
    MAP.roads.push([[20, 615], [22, 420], [24, 262]]);
  }
}
resetMap();

function nearRoad(x, z, d) {
  for (const s of MAP.roadSegs) if (segDist(x, z, s[0], s[1], s[2], s[3]) < d) return true;
  return false;
}
function nearTown(x, z, pad) {
  for (const t of MAP.towns) if (Math.hypot(x - t.x, z - t.z) < t.r + pad) return t;
  return null;
}
const _near = [];
function inTrench(x, z) {
  MAP.trench.near(x, z, _near);
  for (const p of _near) { const s = p.seg; if (segDist(x, z, s[0], s[1], s[2], s[3]) < 1.7) return true; }
  return false;
}
function hedgeCover(x, z) {
  const i = Math.round(x / 70);
  if (Math.abs(x - i * 70) < 2.6 && MAP.hedge.has('v' + i + ',' + Math.floor(z / 60))) return true;
  const j = Math.round(z / 60);
  if (Math.abs(z - j * 60) < 2.6 && MAP.hedge.has('h' + Math.floor(x / 70) + ',' + j)) return true;
  return false;
}
function coverAt(x, z) {
  if (inTrench(x, z)) return 2;
  MAP.coverPts.near(x, z, _near);
  for (const p of _near) { const dx = p.x - x, dz = p.z - z; if (dx * dx + dz * dz < p.r * p.r) return 1; }
  if (hedgeCover(x, z)) return 1;
  MAP.obstacles.near(x, z, _near);
  for (const o of _near) { const dx = o.x - x, dz = o.z - z, r = o.r + 2.5; if (dx * dx + dz * dz < r * r) return 1; }
  return 0;
}
function inWire(x, z) {
  if (Math.abs(z - WIRE_Z) > 1.6) return false;
  for (const g of WIRE_GAPS) if (Math.abs(x - g) < 7) return false;
  return true;
}
/* ponto de cobertura para a IA: à frente, na direção do destino, protegido da ameaça */
const _cand = [];
function findCover(x, z, tx, tz, threatX, threatZ, maxD, minProgress) {
  const dx = tx - x, dz = tz - z, dl = Math.hypot(dx, dz) || 1, ux = dx / dl, uz = dz / dl;
  const hasT = threatX !== undefined && threatX !== null;
  let best = null, bs = -Infinity;
  const consider = (px, pz, quality) => {
    const ox = px - x, oz = pz - z, d = Math.hypot(ox, oz);
    if (d > maxD || d < 1.5) return;
    const prog = ox * ux + oz * uz;
    if (prog < minProgress) return;
    if (Math.hypot(tx - px, tz - pz) > dl + 4) return;
    let s = quality * 6 + prog * 0.6 - d * 0.35;
    if (hasT) s += Math.min(8, Math.hypot(px - threatX, pz - threatZ) * 0.04);
    if (s > bs) { bs = s; best = { x: px, z: pz }; }
  };
  MAP.coverPts.near(x, z, _cand, 2);
  for (const p of _cand) {
    let px = p.x, pz = p.z;
    if (hasT) { const ax = p.x - threatX, az = p.z - threatZ, al = Math.hypot(ax, az) || 1; px += ax / al * (p.r * 0.6); pz += az / al * (p.r * 0.6); }
    consider(px, pz, p.q || 1);
  }
  MAP.obstacles.near(x, z, _cand, 1);
  for (const o of _cand) {
    if (o.r > 14) continue;
    const ax = hasT ? o.x - threatX : -ux, az = hasT ? o.z - threatZ : -uz, al = Math.hypot(ax, az) || 1;
    consider(o.x + ax / al * (o.r + 1.4), o.z + az / al * (o.r + 1.4), 1.2);
  }
  MAP.trench.near(x, z, _cand, 1);
  for (const p of _cand) consider(p.x, p.z, 1.6);
  return best;
}

/* ---------- casas e igrejas por região ---------- */
const HOUSE_STYLE = {
  normandy: { walls: [0xcbbd9c, 0xbcae92, 0xd6cbb2, 0xa99d86, 0xc4b69a, 0xb3a58b], roofs: [0x4a4e57, 0x555a62, 0x6e3b2c, 0x7a4433, 0x4f525a], shut: 0x2f3438 },
  med: { walls: [0xd9b98f, 0xe3c9a8, 0xcf9f7a, 0xe8dcc4, 0xd8b07c], roofs: [0xa8553a, 0xb5653f, 0x9c4b33], shut: 0x3f5a3a },
  desert: { walls: [0xe6dcc6, 0xd8c6a0, 0xcdb68e, 0xe9e2d2], roofs: [], shut: 0x2a5268 },
  tropical: { walls: [0x7a6448, 0x8a7558, 0xb8a888, 0xc9bfa6], roofs: [0x3d4249, 0x8a4a32, 0x4a4e44], shut: 0x3a3226 },
  winter: { walls: [0x9a958c, 0x8a857c, 0xb0a99c, 0x7d776c], roofs: [0xe6ebef, 0xdfe5ea], shut: 0x3a2f28 },
};
function addHouse(B, x, z, ry, damaged) {
  const st = HOUSE_STYLE[SC.biome], desert = SC.biome === 'desert';
  const w = wrr(7, 10), d = wrr(6, 8.5), h = desert ? wrr(4, 6) : wrr(5, 7.5);
  const wall = wpick(st.walls);
  const par = new THREE.Matrix4().compose(new THREE.Vector3(x, groundH(x, z), z), new THREE.Quaternion().setFromAxisAngle(UP, ry), new THREE.Vector3(1, 1, 1));
  B.add(G.box, wall, w, h + 3, d, 0, (h + 3) / 2 - 3, 0, 0, 0, 0, par);
  if (!damaged) {
    if (desert) {
      B.add(G.box, wall, w + 0.3, 0.6, d + 0.3, 0, h + 0.3, 0, 0, 0, 0, par);
      B.add(G.box, 0xb8a888, w - 0.4, 0.1, d - 0.4, 0, h + 0.05, 0, 0, 0, 0, par);
      if (wr() < 0.25) B.add(G.dome, 0xeae4d6, 1.6, 1.4, 1.6, w * 0.2, h + 0.1, 0, 0, 0, 0, par);
    } else {
      B.add(G.roof, wpick(st.roofs), w + 0.7, h * 0.5, d + 1, 0, h, 0, 0, 0, 0, par);
      B.add(G.box, 0x8a7d6a, 0.8, 2.2, 0.8, w * 0.3, h + h * 0.3, -d * 0.2, 0, 0, 0, par);
    }
  } else {
    for (let i = 0; i < 4; i++) B.add(G.box, wall, wrr(1.5, 3), wrr(0.5, 2), 0.6, wrr(-w / 2, w / 2), h + 0.4, wrr(-d / 2, d / 2), 0, wrr(0, 3), 0, par);
    for (let i = 0; i < 6; i++) B.add(G.ico, 0x7d7465, wrr(0.6, 1.4), wrr(0.4, 0.9), wrr(0.6, 1.4), wrr(-w / 2 - 2, w / 2 + 2), 0.3, wrr(d / 2, d / 2 + 2.5), 0, 0, 0, par);
    if (!desert) B.add(G.roof, 0x2d2a26, w * 0.6, h * 0.3, d + 0.4, -w * 0.2, h - 0.3, 0, 0.12, 0, 0, par);
  }
  for (const side of [1, -1]) for (const wx of [-w / 4, w / 4]) {
    B.add(G.box, 0x2a2e31, desert ? 0.6 : 1.0, desert ? 0.8 : 1.2, 0.12, wx, h * 0.58, side * (d / 2 + 0.03), 0, 0, 0, par);
    if (!desert) for (const sx of [-1, 1]) B.add(G.box, st.shut, 0.45, 1.2, 0.08, wx + sx * 0.75, h * 0.58, side * (d / 2 + 0.05), 0, 0, 0, par);
  }
  B.add(G.box, desert ? 0x2a5268 : 0x4a3524, 1.1, 2.1, 0.12, 0, 1.05, d / 2 + 0.04, 0, 0, 0, par);
  MAP.obstacles.add({ x, z, r: Math.max(w, d) * 0.58 });
}
function addChurch(B, x, z) {
  const par = new THREE.Matrix4().makeTranslation(x, groundH(x, z), z);
  const bio = SC.biome;
  if (bio === 'tropical') {
    // santuário xintoísta com portal torii
    B.add(G.box, 0x6b5a44, 8, 4, 10, 0, 1.5, -2, 0, 0, 0, par);
    B.add(G.roof, 0x3d4249, 10, 3.2, 12.5, 0, 3.5, -2, 0, Math.PI / 2, 0, par);
    B.add(G.box, 0x3d4249, 11, 0.3, 13, 0, 3.55, -2, 0, 0, 0, par);
    for (const sx of [-1, 1]) B.add(G.cyl12, 0xc0392b, 0.35, 6.5, 0.35, sx * 2.6, 3.25, 9, 0, 0, 0, par);
    B.add(G.box, 0x1c1c1c, 7.4, 0.5, 0.6, 0, 6.7, 9, 0, 0, 0, par);
    B.add(G.box, 0xc0392b, 6.4, 0.35, 0.45, 0, 5.6, 9, 0, 0, 0, par);
    MAP.obstacles.add({ x, z: z - 2, r: 7 }); return;
  }
  if (bio === 'desert') {
    B.add(G.box, 0xe9e2d2, 12, 9, 12, 0, 1.5, 0, 0, 0, 0, par);
    B.add(G.dome, 0xf0ece2, 4.6, 4.2, 4.6, 0, 6, 0, 0, 0, 0, par);
    B.add(G.cyl12, 0xe9e2d2, 1.5, 18, 1.5, 6.5, 6, 6.5, 0, 0, 0, par);
    B.add(G.cyl12, 0xd8cfbd, 1.8, 0.6, 1.8, 6.5, 13, 6.5, 0, 0, 0, par);
    B.add(G.dome, 0x4f8a7a, 1.4, 1.6, 1.4, 6.5, 15, 6.5, 0, 0, 0, par);
    B.add(G.box, 0x2a5268, 2, 3.5, 0.15, 0, 1.75, 6.05, 0, 0, 0, par);
    MAP.obstacles.add({ x, z, r: 8.5 }); return;
  }
  const wall = bio === 'med' ? 0xe0cfae : bio === 'winter' ? 0x8f8a80 : 0xc2b79f;
  const roof = bio === 'med' ? 0xa8553a : bio === 'winter' ? 0xe6ebef : 0x4a4e57;
  B.add(G.box, wall, 9, 11, 20, 0, 2.5, 0, 0, 0, 0, par);
  B.add(G.roof, roof, 21, 4.5, 10, 0, 8, 0, 0, Math.PI / 2, 0, par);
  B.add(G.box, wall, 5.5, 18, 5.5, 0, 6, 12, 0, 0, 0, par);
  if (bio === 'med') B.add(G.cone4, roof, 4.0, 3.5, 4.0, 0, 16.75, 12, 0, Math.PI / 4, 0, par);
  else B.add(G.cone4, bio === 'winter' ? 0x3a3e45 : 0x41454d, 4.2, 9, 4.2, 0, 19.5, 12, 0, Math.PI / 4, 0, par);
  B.add(G.box, 0x2b2f33, 1.4, 2.4, 0.15, 0, 11, 14.8, 0, 0, 0, par);
  for (let i = 0; i < 3; i++) for (const sx of [-1, 1]) B.add(G.box, 0x2f3540, 0.15, 2.6, 1.2, sx * 4.55, 4.5, -6 + i * 5, 0, 0, 0, par);
  B.add(G.box, 0x3d2c1e, 2, 3.2, 0.15, 0, 1.6, 14.8, 0, 0, 0, par);
  MAP.obstacles.add({ x, z: z - 4, r: 7 }); MAP.obstacles.add({ x, z: z + 8, r: 6 });
}

/* ---------- detalhe do terreno no shader, por região ---------- */
function registerTerrainShaders() {
  const common = `
    vec3 p = vDPos;
    float n1 = vnoise(p * 0.9), n2 = vnoise(p * 3.7), n3 = vnoise(p * 0.11), n4 = vnoise(p * 9.0);
    float g = 0.84 + 0.14 * n1 + 0.08 * n2 + 0.16 * (n3 - 0.5);`;
  DETAIL.terrain_normandy = DETAIL.terrain;
  DETAIL.terrain_med = DETAIL.terrain;
  DETAIL.terrain_tropical = DETAIL.terrain;
  DETAIL.terrain_desert = common + `
    float rip = sin(p.x * 1.4 + p.z * 0.6 + vnoise(p * 0.25) * 8.0);
    g += rip * 0.05 + (n2 - 0.5) * 0.1;
    float pebble = step(0.93, hash3(floor(p * 2.5)));
    g -= pebble * 0.18 * n4;
    float scrub = step(0.985, hash3(floor(p * 0.9))) * step(p.z, 200.0);
    diffuseColor.rgb *= g;
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.42, 0.42, 0.26), scrub * 0.7);`;
  DETAIL.terrain_winter = common + `
    g = 0.93 + 0.06 * n1 + 0.04 * n2;
    float sparkle = step(0.985, hash3(floor(p * 9.0)));
    float drift = sin(p.x * 0.35 + vnoise(p * 0.2) * 5.0) * 0.5 + 0.5;
    diffuseColor.rgb *= g - drift * 0.04;
    diffuseColor.rgb += sparkle * 0.12;
    diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * vec3(0.92, 0.95, 1.04), 0.6);`;
}

/* ---------- construção do mundo ---------- */
function disposeWorld(scene) {
  if (!MAP.root) return;
  scene.remove(MAP.root);
  MAP.root.traverse(o => { if (o.isMesh && o.geometry && !o.userData.shared && !_geoCacheHas(o.geometry)) o.geometry.dispose(); });
  MAP.root = null;
}
function _geoCacheHas(g) { for (const v of _geoCache.values()) if (v === g) return true; return false; }
function buildWorld(scene) {
  disposeWorld(scene);
  wr = mulberry32(SC.seed);
  resetMap();
  registerTerrainShaders();
  const root = new THREE.Group(); MAP.root = root; scene.add(root);
  const bio = SC.biome;
  for (const r of MAP.roads) for (let i = 0; i < r.length - 1; i++) MAP.roadSegs.push([r[i][0], r[i][1], r[i + 1][0], r[i + 1][1]]);

  /* terreno */
  const SX = WORLD.maxX - WORLD.minX, SZ = WORLD.maxZ - WORLD.minZ, CELL = 6;
  const tg = new THREE.PlaneGeometry(SX, SZ, Math.round(SX / CELL), Math.round(SZ / CELL));
  tg.rotateX(-Math.PI / 2);
  tg.translate((WORLD.minX + WORLD.maxX) / 2, 0, (WORLD.minZ + WORLD.maxZ) / 2);
  const pos = tg.attributes.position, cols = new Float32Array(pos.count * 3), c = [0, 0, 0];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), h = groundH(x, z);
    pos.setY(i, h); groundColor(x, z, h, c);
    cols[i * 3] = c[0]; cols[i * 3 + 1] = c[1]; cols[i * 3 + 2] = c[2];
  }
  tg.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  tg.computeVertexNormals();
  const terrain = new THREE.Mesh(tg, addDetail(new THREE.MeshLambertMaterial({ vertexColors: true }), 'terrain_' + bio, true));
  terrain.receiveShadow = true; root.add(terrain);
  const farCol = { normandy: 0x55643a, med: 0x5d6a40, desert: 0xbfa77c, winter: 0xdfe4e8, tropical: 0x3f6a2c }[bio];
  const farMat = addDetail(new THREE.MeshLambertMaterial({ color: farCol }), 'terrain_' + bio, true);
  const far = new THREE.Mesh(new THREE.PlaneGeometry(6000, 3000), farMat);
  far.rotation.x = -Math.PI / 2; far.position.set(0, 14, -2490); root.add(far);
  for (const sx of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(2300, SC.coast ? 1160 : 1620), farMat);
    side.rotation.x = -Math.PI / 2; side.position.set(sx * (700 + 1150), SC.coast ? 16 : 2, SC.coast ? -420 : -190); root.add(side);
  }
  if (!SC.coast) {
    const south = new THREE.Mesh(new THREE.PlaneGeometry(6000, 2000), farMat);
    south.rotation.x = -Math.PI / 2; south.position.set(0, 2.5, 620 + 1000); root.add(south);
  }

  /* mar */
  if (SC.coast) {
    const wg = new THREE.PlaneGeometry(4200, 2600, 140, 90); wg.rotateX(-Math.PI / 2); wg.translate(0, 0, 1050);
    const water = new THREE.Mesh(wg, makeWaterMaterial());
    water.renderOrder = 2; root.add(water); MAP.water = water;
  }

  const B = new GeoBuilder();      // casas, igrejas, obstáculos, arame
  const R = new GeoBuilder();      // estradas e trincheiras (chão)

  /* vilas */
  for (const t of MAP.towns) {
    const plaza = t.hq ? 28 : 17;
    MAP.roads.push([[t.x - t.r - 12, t.z], [t.x + t.r + 12, t.z]], [[t.x, t.z - t.r - 12], [t.x, t.z + t.r + 12]]);
    MAP.roadSegs.push([t.x - t.r - 12, t.z, t.x + t.r + 12, t.z], [t.x, t.z - t.r - 12, t.x, t.z + t.r + 12]);
    for (const axis of [0, 1]) {
      for (let s = -t.r; s <= t.r; s += wrr(10, 12.5)) {
        if (Math.abs(s) < plaza) continue;
        for (const side of [-1, 1]) {
          if (wr() < 0.12) continue;
          const off = wrr(9.5, 11);
          if (axis === 0) addHouse(B, t.x + s, t.z + side * off, side > 0 ? Math.PI : 0, wr() < 0.25);
          else addHouse(B, t.x + side * off, t.z + s, side > 0 ? -Math.PI / 2 : Math.PI / 2, wr() < 0.25);
        }
      }
    }
    for (let i = 0; i < 5; i++) {
      const a = wrr(0, Math.PI * 2), d = t.r + wrr(18, 40), x = t.x + Math.cos(a) * d, z = t.z + Math.sin(a) * d;
      if (!nearRoad(x, z, 8) && z < 150) addHouse(B, x, z, wrr(0, 6.28), wr() < 0.3);
    }
    if (!t.hq) addChurch(B, t.x + 27, t.z - 28);
  }

  /* estradas */
  const roadCol = { normandy: [0x8b7d5e, 0x857759], med: [0x9a8a6a, 0x928262], desert: [0xa58c64, 0x9c845d], winter: [0x7a7268, 0x857d72], tropical: [0x9a7a5a, 0x8f7052] }[bio];
  for (const r of MAP.roads) R.ribbon(r, 5.5, 0.14, roadCol[0], roadCol[1]);

  /* trincheiras */
  const zig = (x0, x1, zc, amp, step) => { const p = []; let i = 0; for (let x = x0; x <= x1; x += step, i++) p.push([x, zc + (i % 2 ? amp : -amp) + wrr(-1.5, 1.5)]); return p; };
  const ring = (cx, cz, r, n) => { const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; p.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r * 0.85]); } return p; };
  MAP.trenchLines = [zig(-480, 480, 170, 3.5, 16), zig(-430, 430, -330, 3.5, 18), ring(60, -850, 125, 26)];
  const bags = [];
  for (const line of MAP.trenchLines) {
    R.ribbon(line, 2.8, 0.1, bio === 'winter' ? 0x4a443c : bio === 'desert' ? 0x7d6a4c : 0x3a2e22);
    for (let i = 0; i < line.length - 1; i++) {
      const s = [line[i][0], line[i][1], line[i + 1][0], line[i + 1][1]];
      const L = Math.hypot(s[2] - s[0], s[3] - s[1]), dx = (s[2] - s[0]) / L, dz = (s[3] - s[1]) / L, ang = Math.atan2(dx, dz);
      for (let d = 0; d < L; d += 4) MAP.trench.add({ x: s[0] + dx * d, z: s[1] + dz * d, seg: s });
      for (let d = 0; d < L; d += 1.3) {
        const px = s[0] + dx * d, pz = s[1] + dz * d;
        for (const side of [-1, 1]) {
          const bx = px - dz * side * 1.85, bz = pz + dx * side * 1.85, gy = groundH(bx, bz);
          bags.push([bx, gy + 0.25, bz, ang + wrr(-0.15, 0.15)]);
          if (side < 0 || wr() < 0.5) bags.push([bx, gy + 0.72, bz, ang + wrr(-0.2, 0.2)]);
        }
        if (wr() < 0.12) MAP.trenchSpots.push([px, pz]);
      }
    }
  }
  const dummy = new THREE.Object3D(), bc = new THREE.Color();
  const inst = (geo, list, cols, setup, cast) => {
    if (!list.length) return null;
    const m = new THREE.InstancedMesh(geo, addDetail(new THREE.MeshLambertMaterial({ color: 0xffffff }), 'ground', false), list.length);
    list.forEach((it, i) => { dummy.rotation.order = 'XYZ'; setup(it, dummy); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); m.setColorAt(i, bc.setHex(Array.isArray(cols) ? cols[i % cols.length] : cols)); });
    m.castShadow = cast !== false; m.receiveShadow = true; m.userData.shared = true; root.add(m); return m;
  };
  const bagCols = bio === 'winter' ? [0xc9ccc8, 0xb8bab4, 0x8a7a58] : bio === 'desert' ? [0xb39c70, 0xa38e66, 0xbba57a] : [0x8a7a58, 0x7d6f50, 0x94845f];
  inst(G.box, bags, bagCols, (b, d) => { d.position.set(b[0], b[1], b[2]); d.rotation.set(0, b[3], 0); d.scale.set(0.68, 0.48, 1.18); });

  /* praia (litoral): ouriços tchecos, rampas de troncos com minas */
  if (SC.coast) {
    for (let i = 0; i < 95; i++) {
      const x = wrr(-560, 560), z = wrr(256, 320);
      const par = new THREE.Matrix4().compose(new THREE.Vector3(x, groundH(x, z), z), new THREE.Quaternion().setFromAxisAngle(UP, wrr(0, 3)), new THREE.Vector3(1, 1, 1));
      for (let k = 0; k < 3; k++) B.add(G.box, 0x3d3634, 0.32, 0.32, 3.4, 0, 1.0, 0, 0.62, k * 2.094, 0, par);
      MAP.hedgehogs.push([x, z]); MAP.coverPts.add({ x, z, r: 3.0, q: 1 });
    }
    for (let i = 0; i < 40; i++) {
      const x = wrr(-560, 560), z = wrr(262, 312);
      const par = new THREE.Matrix4().compose(new THREE.Vector3(x, groundH(x, z), z), new THREE.Quaternion().setFromAxisAngle(UP, Math.PI), new THREE.Vector3(1, 1, 1));
      B.add(G.box, 0x5b4a36, 0.45, 0.45, 5, 0, 1.2, 0, -0.45, 0, 0, par);
      B.add(G.box, 0x5b4a36, 0.4, 2.0, 0.4, 0, 1.0, -1.7, 0, 0, 0, par);
      B.add(G.cyl8, 0x2e2e28, 0.36, 0.16, 0.36, 0, 2.35, 2.3, -0.45, 0, 0, par);
      MAP.coverPts.add({ x, z, r: 2.5, q: 0.8 });
    }
    for (let i = 0; i < 26; i++) {
      const x = wrr(-600, 600), z = wrr(240, 250);
      B.add(G.ico, 0x6b6862, wrr(1, 2.2), wrr(0.5, 0.9), wrr(1, 2), x, groundH(x, z) + 0.2, z, 0, wrr(0, 3), 0);
    }
  }
  for (let x = -620; x <= 620; x += 2.0) {
    if (WIRE_GAPS.some(g => Math.abs(x - g) < 7)) continue;
    const z = WIRE_Z + Math.sin(x * 0.3) * 0.4, y = groundH(x, z);
    B.add(G.torus, 0x4a4540, 0.9, 0.9, 0.9, x, y + 0.85, z, 0, Math.PI / 2, 0);
    if (Math.round(x) % 10 === 0) B.add(G.box, 0x4f3f2c, 0.14, 1.8, 0.14, x, y + 0.9, z, 0, 0, 0);
  }

  /* bordas de campo: sebes (Normandia), muros de pedra (Itália), cercas (Ardenas) */
  const bush = [], walls = [], posts = [], rails = [], trees = [];
  const edgeKind = { normandy: 'hedge', med: 'wall', winter: 'fence', desert: null, tropical: 'hedge' }[bio];
  if (edgeKind) for (let i = -9; i <= 9; i++) for (let j = -16; j <= 1; j++) {
    for (const vert of [true, false]) {
      if (wr() > (edgeKind === 'hedge' ? 0.55 : 0.4)) continue;
      const ax = i * 70, az = j * 60, bx = vert ? ax : ax + 70, bz = vert ? az + 60 : az;
      if (Math.max(az, bz) > 118 || bx > 690 || ax < -690) continue;
      if (nearTown((ax + bx) / 2, (az + bz) / 2, 26)) continue;
      MAP.hedge.add((vert ? 'v' : 'h') + i + ',' + j);
      const len = vert ? 60 : 70, step = edgeKind === 'hedge' ? 4.3 : edgeKind === 'wall' ? 2.4 : 3.0;
      for (let s = 2; s < len; s += step) {
        const x = vert ? ax + wrr(-0.4, 0.4) : ax + s, z = vert ? az + s : az + wrr(-0.4, 0.4);
        if (nearRoad(x, z, 6) || inTrench(x, z)) continue;
        if (edgeKind === 'hedge') { bush.push([x, z, wrr(2.3, 3.4), wrr(1.9, 2.9)]); if (wr() < 0.11) trees.push([x + wrr(-1, 1), z + wrr(-1, 1), wrr(0.9, 1.35), bio === 'tropical' ? 'palm' : wr() < 0.3 ? 'tall' : 'round']); }
        else if (edgeKind === 'wall') { walls.push([x, z, vert ? 0 : Math.PI / 2, wrr(0.9, 1.3)]); if (wr() < 0.06) trees.push([x + wrr(-2, 2), z + wrr(-2, 2), wrr(0.9, 1.2), 'cypress']); }
        else { posts.push([x, z]); rails.push([x + (vert ? 0 : step / 2), z + (vert ? step / 2 : 0), vert ? 0 : Math.PI / 2]); if (wr() < 0.05) trees.push([x + wrr(-2, 2), z + wrr(-2, 2), wrr(1, 1.4), 'pine']); }
      }
    }
  }
  const forestCount = { normandy: 9, med: 7, desert: 0, winter: 24, tropical: 20 }[bio];
  const forestTree = { normandy: 'round', med: 'umbrella', winter: 'pine', tropical: 'round' }[bio];
  for (let f = 0; f < forestCount; f++) {
    const cx = wrr(-640, 640), cz = wrr(-960, SC.coast ? 60 : 160);
    if (nearTown(cx, cz, 40)) continue;
    const n = bio === 'winter' ? 48 : 32, rad = bio === 'winter' ? 46 : 38;
    for (let k = 0; k < n; k++) {
      const a = wrr(0, 6.28), d = Math.sqrt(wr()) * rad, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
      if (!nearRoad(x, z, 5) && !inTrench(x, z)) trees.push([x, z, wrr(0.9, 1.5), bio === 'winter' && wr() < 0.18 ? 'bare' : bio === 'tropical' && wr() < 0.4 ? 'palm' : forestTree]);
    }
  }
  if (bio === 'winter') for (let k = 0; k < 220; k++) {
    const x = wrr(-680, 680), z = wrr(230, 600);
    if (Math.abs(x) < 520 && z < 420) continue;
    trees.push([x, z, wrr(0.9, 1.5), 'pine']);
  }
  for (const t of MAP.towns) {
    const ox = t.x - t.r - 30, oz = t.z + t.r * 0.35;
    const kind = { normandy: 'apple', med: 'olive', desert: 'palm', winter: 'bare', tropical: 'palm' }[bio];
    for (let a = 0; a < 5; a++) for (let b = 0; b < 4; b++) {
      const x = ox + a * 7 + wrr(-1, 1), z = oz + b * 7 + wrr(-1, 1);
      if (!nearRoad(x, z, 5)) trees.push([x, z, kind === 'palm' ? wrr(0.9, 1.2) : wrr(0.55, 0.7), kind]);
    }
    if (bio === 'desert') for (let k = 0; k < 14; k++) { const a = wrr(0, 6.28), d = t.r + wrr(4, 30); trees.push([t.x + Math.cos(a) * d, t.z + Math.sin(a) * d, wrr(0.9, 1.3), 'palm']); }
  }
  if (bio === 'tropical') for (let k = 0; k < 120; k++) { const x = wrr(-660, 660), z = wrr(150, 228); if (!nearRoad(x, z, 6) && !inTrench(x, z)) trees.push([x, z, wrr(0.9, 1.3), 'palm']); }
  if (bio === 'desert') for (let k = 0; k < 160; k++) { const x = wrr(-680, 680), z = wrr(-980, 600); if (!nearRoad(x, z, 6) && !nearTown(x, z, 4)) bush.push([x, z, wrr(0.6, 1.2), wrr(0.4, 0.8)]); }
  if (bio === 'med') for (let g2 = 0; g2 < 10; g2++) {
    const cx = wrr(-620, 620), cz = wrr(-950, 80);
    if (nearTown(cx, cz, 30)) continue;
    for (let a = 0; a < 6; a++) for (let b = 0; b < 5; b++) { const x = cx + a * 8, z = cz + b * 8; if (!nearRoad(x, z, 5)) trees.push([x + wrr(-1, 1), z + wrr(-1, 1), wrr(0.6, 0.8), 'olive']); }
  }

  const bushCols = { normandy: [0x2f4a22, 0x37532a, 0x2a4220, 0x3e5a2c], med: [0x4a5a30, 0x56643a], desert: [0x6b6a3e, 0x7a7448, 0x5e5d36], winter: [0xd6dadc, 0xc4c9cc], tropical: [0x2c5a22, 0x37682a, 0x24501c, 0x3f7030] }[bio];
  inst(G.ico, bush, bushCols, (b, d) => { d.position.set(b[0], groundH(b[0], b[1]) + b[3] * 0.45, b[1]); d.rotation.set(0, (b[0] * 13) % 6, 0); d.scale.set(b[2], b[3], b[2]); });
  inst(G.box, walls, [0x9a948a, 0x8c867c, 0xa49e92], (w, d) => { d.position.set(w[0], groundH(w[0], w[1]) + 0.5 * w[3], w[1]); d.rotation.set(0, w[2], 0); d.scale.set(0.7, 1.0 * w[3], 2.5); });
  inst(G.box, posts, 0x5a4632, (p, d) => { d.position.set(p[0], groundH(p[0], p[1]) + 0.7, p[1]); d.rotation.set(0, 0, 0); d.scale.set(0.16, 1.4, 0.16); });
  inst(G.box, rails, 0x6e5434, (p, d) => { d.position.set(p[0], groundH(p[0], p[1]) + 0.9, p[1]); d.rotation.set(0, p[2], 0); d.scale.set(0.08, 0.12, 3.0); });

  // árvores: troncos + copas por tipo
  const TT = {
    round: { th: 4, cw: 2.9, ch: 3.4, geo: 'ico', cols: [0x2d4a24, 0x35552a, 0x2a4422, 0x3f5e2d] },
    tall: { th: 7, cw: 1.7, ch: 6.5, geo: 'ico', cols: [0x2d4a24, 0x35552a] },
    apple: { th: 2.4, cw: 3.2, ch: 2.6, geo: 'ico', cols: [0x4f6e2f, 0x5a7a34] },
    cypress: { th: 2, cw: 1.3, ch: 8.5, geo: 'ico', cols: [0x243a1f, 0x2b4424] },
    umbrella: { th: 7.5, cw: 4.8, ch: 1.7, geo: 'ico', cols: [0x2f4a26, 0x36522b] },
    olive: { th: 1.9, cw: 2.8, ch: 2.0, geo: 'ico', cols: [0x7b8a5c, 0x6f7f53, 0x85926a] },
    pine: { th: 2.4, cw: 2.4, ch: 6.5, geo: 'cone', cols: [0x223a26, 0x29432c, 0x1f3523] },
    palm: { th: 8, cw: 1, ch: 1, geo: 'palm', cols: [0x4f6a2c, 0x5a7432, 0x46602a] },
    bare: { th: 6, cw: 0, ch: 0, geo: null, cols: [0] },
  };
  inst(G.cyl8, trees, bio === 'desert' ? 0x6b5a40 : 0x4a3b2a, (t, d) => {
    const T = TT[t[3]], s = t[2], y = groundH(t[0], t[1]), palm = t[3] === 'palm';
    d.position.set(t[0], y + T.th * s / 2, t[1]); d.rotation.set(palm ? 0.08 : 0, (t[0] * 7) % 6, palm ? 0.06 : 0);
    const r = (palm ? 0.28 : t[3] === 'bare' ? 0.3 : 0.35) * s;
    d.scale.set(r, T.th * s, r);
  });
  const PALM = merged('palmCrown', B2 => {
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2; B2.add(G.box, 0xffffff, 0.6, 0.08, 3.4, Math.sin(a) * 1.6, -0.4, Math.cos(a) * 1.6, 0.45, a, 0); }
    B2.add(G.sph, 0xd8d0b8, 0.5, 0.5, 0.5, 0, 0, 0);
  });
  const BARE = merged('bareCrown', B2 => {
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; B2.add(G.cyl8, 0xffffff, 0.08, 2.6, 0.08, Math.sin(a) * 0.8, 1.0, Math.cos(a) * 0.8, Math.cos(a) * 0.6, 0, -Math.sin(a) * 0.6); }
  });
  const byGeo = { ico: [], cone: [], palm: [], bare: [] };
  for (const t of trees) { const T = TT[t[3]]; if (T.geo) byGeo[T.geo].push(t); if (t[3] === 'bare') byGeo.bare.push(t); }
  const crownSetup = (t, d) => {
    const T = TT[t[3]], s = t[2], y = groundH(t[0], t[1]);
    if (T.geo === 'palm') { d.position.set(t[0] + 0.5 * s, y + T.th * s, t[1] + 0.6 * s); d.rotation.set(0, (t[1] * 3) % 6, 0); d.scale.setScalar(s); return; }
    d.position.set(t[0], y + (T.th + T.ch * (T.geo === 'cone' ? 0.5 : 0.55)) * s, t[1]); d.rotation.set(0, (t[0] * 5) % 6, 0); d.scale.set(T.cw * s, T.ch * s, T.cw * s);
  };
  const instCrowns = (geo, list) => {
    if (!list.length) return;
    const m = new THREE.InstancedMesh(geo, addDetail(new THREE.MeshLambertMaterial({ color: 0xffffff, vertexColors: geo === PALM }), 'ground', false), list.length);
    list.forEach((it, i) => { dummy.rotation.order = 'XYZ'; crownSetup(it, dummy); dummy.updateMatrix(); m.setMatrixAt(i, dummy.matrix); m.setColorAt(i, bc.setHex(wpickFrom(TT[it[3]].cols, it[0] + it[1]))); });
    m.castShadow = true; m.userData.shared = true; root.add(m);
  };
  instCrowns(G.ico, byGeo.ico);
  instCrowns(G.cone, byGeo.cone);
  instCrowns(PALM, byGeo.palm);
  inst(BARE, byGeo.bare, 0x4a3b2a, (t, d) => { const s = t[2], y = groundH(t[0], t[1]); d.position.set(t[0], y + 5 * s, t[1]); d.rotation.set(0, t[0] % 6, 0); d.scale.setScalar(s); });
  if (bio === 'winter') inst(G.cone, byGeo.cone, 0xeef2f4, (t, d) => { const T = TT[t[3]], s = t[2], y = groundH(t[0], t[1]); d.position.set(t[0], y + (T.th + T.ch * 0.78) * s, t[1]); d.rotation.set(0, 0, 0); d.scale.set(T.cw * s * 0.55, T.ch * s * 0.45, T.cw * s * 0.55); }, false);

  /* objetos de cobertura: pedras grandes e pilhas de toras de madeira */
  const rocks = [], logs = [];
  const nRocks = { normandy: 70, med: 110, desert: 260, winter: 80, tropical: 120 }[bio], nLogs = { normandy: 60, med: 30, desert: 10, winter: 130, tropical: 70 }[bio];
  const freeSpot = (zmin, zmax) => {
    for (let k = 0; k < 8; k++) {
      const x = wrr(-660, 660), z = wrr(zmin, zmax);
      if (SC.coast && z > 228) continue;
      if (!nearRoad(x, z, 6) && !nearTown(x, z, 6) && !inTrench(x, z) && !hedgeCover(x, z)) return [x, z];
    }
    return null;
  };
  for (let i = 0; i < nRocks; i++) { const p = freeSpot(-980, SC.coast ? 228 : 600); if (p) rocks.push([p[0], p[1], wrr(1.0, 2.2), wrr(0.7, 1.4)]); }
  for (let i = 0; i < nLogs; i++) { const p = freeSpot(-980, SC.coast ? 228 : 600); if (p) logs.push([p[0], p[1], wrr(0, 3)]); }
  if (!SC.coast) for (let i = 0; i < 70; i++) { const x = wrr(-520, 520), z = wrr(232, 330); if (!nearRoad(x, z, 5)) { if (i % 2) rocks.push([x, z, wrr(1.2, 2.2), wrr(0.8, 1.3)]); else logs.push([x, z, wrr(0, 3)]); } }
  const rockCols = { normandy: [0x77736b, 0x6b675f, 0x837e74], med: [0x9a958a, 0x8c877c], desert: [0x9a7f5c, 0x8a6f4f, 0xa88b66], winter: [0x6f6e6a, 0x7d7c78], tropical: [0xb8b0a0, 0x9a9488, 0x6d6a60] }[bio];
  inst(G.ico, rocks, rockCols, (r, d) => { d.position.set(r[0], groundH(r[0], r[1]) + r[3] * 0.35, r[1]); d.rotation.set(r[2], r[0] % 6, 0); d.scale.set(r[2], r[3], r[2] * 0.9); });
  for (const r of rocks) { MAP.coverPts.add({ x: r[0], z: r[1], r: r[2] + 1.3, q: 1.3 }); if (r[2] > 1.4) MAP.obstacles.add({ x: r[0], z: r[1], r: r[2] * 0.8 }); }
  const logList = [];
  for (const l of logs) {
    for (let k = 0; k < 5; k++) { const row = k < 3 ? 0 : 1, col = row ? k - 3 : k; logList.push([l[0], l[1], l[2], (col - (row ? 0.5 : 1)) * 0.62, 0.3 + row * 0.52]); }
    MAP.coverPts.add({ x: l[0], z: l[1], r: 2.4, q: 1.2 });
  }
  inst(G.cyl8, logList, [0x6a5034, 0x5a432b, 0x765a3a], (l, d) => {
    const c = Math.cos(l[2]), s = Math.sin(l[2]);
    d.position.set(l[0] + c * l[3], groundH(l[0], l[1]) + l[4], l[1] - s * l[3]);
    d.rotation.order = 'YXZ'; d.rotation.set(Math.PI / 2, l[2], 0); d.scale.set(0.3, 3.6, 0.3);
  });
  if (bio === 'winter') inst(G.box, logs, 0xeef2f4, (l, d) => { d.position.set(l[0], groundH(l[0], l[1]) + 1.1, l[1]); d.rotation.set(0, l[2], 0); d.scale.set(1.6, 0.12, 3.4); }, false);

  /* malhas estáticas mescladas */
  const statics = new THREE.Mesh(B.build(), addDetail(new THREE.MeshLambertMaterial({ vertexColors: true }), 'stone', true));
  statics.castShadow = true; statics.receiveShadow = true; root.add(statics);
  const ground = new THREE.Mesh(R.build(), addDetail(new THREE.MeshLambertMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }), 'ground', true));
  ground.receiveShadow = true; root.add(ground);

  /* frota ao largo */
  if (SC.coast) {
    const fleet = [[-320, 840, 60, false, 0.15], [260, 900, 64, false, -0.1], [-60, 1180, 130, true, 0.05], [520, 1300, 120, true, -0.05], [-600, 1050, 60, false, 0.2]];
    for (const f of fleet) {
      const s = makeWarship(f[2], f[3]); s.position.set(f[0], 0, f[1]); s.rotation.y = Math.PI / 2 + f[4];
      root.add(s); MAP.ships.push(s);
      s.userData.guns.forEach(gun => MAP.navalGuns.push(gun));
    }
  }

  /* minimapa base */
  const mc = document.createElement('canvas'); mc.width = MAP.MMW; mc.height = MAP.MMH;
  const mx = mc.getContext('2d'), img = mx.createImageData(MAP.MMW, MAP.MMH);
  for (let py = 0; py < MAP.MMH; py++) for (let px = 0; px < MAP.MMW; px++) {
    const x = WORLD.minX + (px + 0.5) / MAP.MMW * SX, z = WORLD.minZ + (py + 0.5) / MAP.MMH * SZ, h = groundH(x, z);
    if (h < 0) { c[0] = 0.22; c[1] = 0.33; c[2] = 0.37; } else groundColor(x, z, h, c);
    const k = (py * MAP.MMW + px) * 4;
    img.data[k] = c[0] * 230; img.data[k + 1] = c[1] * 230; img.data[k + 2] = c[2] * 230; img.data[k + 3] = 255;
  }
  mx.putImageData(img, 0, 0);
  const toM = (x, z) => [(x - WORLD.minX) / SX * MAP.MMW, (z - WORLD.minZ) / SZ * MAP.MMH];
  mx.strokeStyle = 'rgba(150,130,95,0.9)'; mx.lineWidth = 1;
  for (const r of MAP.roads) { mx.beginPath(); r.forEach((p, i) => { const q = toM(p[0], p[1]); i ? mx.lineTo(q[0], q[1]) : mx.moveTo(q[0], q[1]); }); mx.stroke(); }
  mx.strokeStyle = 'rgba(40,30,20,0.9)';
  for (const r of MAP.trenchLines) { mx.beginPath(); r.forEach((p, i) => { const q = toM(p[0], p[1]); i ? mx.lineTo(q[0], q[1]) : mx.moveTo(q[0], q[1]); }); mx.stroke(); }
  mx.fillStyle = 'rgba(200,190,170,0.55)';
  for (const t of MAP.towns) { const q = toM(t.x, t.z), s = t.r / SX * MAP.MMW * 2; mx.fillRect(q[0] - s / 2, q[1] - s / 2, s, s); }
  MAP.miniBase = mc; MAP.toM = toM;
}

/* mar: ondas no shader, profundidade analítica, espuma da arrebentação */
function makeWaterMaterial() {
  const depthFn = `
    float seaDepth(float z){
      if (z > 330.0) { float t = clamp((z - 330.0) / 24.0, 0.0, 1.0); return (z - 330.0) * 0.045 + 1.2 * t * t * (3.0 - 2.0 * t); }
      return -(330.0 - z) * 0.03;
    }`;
  return new THREE.ShaderMaterial({
    uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
      uTime: { value: 0 }, uSun: { value: new THREE.Vector3(150, 260, 110).normalize() },
      uDeep: { value: new THREE.Color(SC.water ? SC.water.deep : 0x1d3a44) }, uShallow: { value: new THREE.Color(SC.water ? SC.water.shallow : 0x4d7f7c) },
      uSand: { value: new THREE.Color(SC.water ? SC.water.sand : 0x8d8064) }, uFoam: { value: new THREE.Color(0xf0f4f1) }, uSky: { value: new THREE.Color(0xb3bcbe) },
    }]),
    vertexShader: depthFn + `
      uniform float uTime; varying vec3 vW; varying vec3 vN; varying float vDepth;
      #include <fog_pars_vertex>
      void main(){
        vec3 p = position;
        float d = seaDepth(p.z);
        float a = 0.12 + 0.4 * clamp(d / 4.0, 0.0, 1.0);
        float ph1 = p.x * 0.045 + uTime * 1.1, ph2 = p.z * 0.06 - uTime * 1.4, ph3 = (p.x + p.z) * 0.11 + uTime * 2.0;
        p.y += (sin(ph1) * 0.35 + cos(ph2) * 0.3 + sin(ph3) * 0.12) * a;
        float dx = (cos(ph1) * 0.35 * 0.045 + cos(ph3) * 0.12 * 0.11) * a;
        float dz = (-sin(ph2) * 0.3 * 0.06 + cos(ph3) * 0.12 * 0.11) * a;
        vN = normalize(vec3(-dx, 1.0, -dz));
        vDepth = d;
        vec4 wp = modelMatrix * vec4(p, 1.0); vW = wp.xyz;
        vec4 mvPosition = viewMatrix * wp;
        gl_Position = projectionMatrix * mvPosition;
        #include <fog_vertex>
      }`,
    fragmentShader: NOISE_GLSL + depthFn + `
      uniform float uTime; uniform vec3 uSun, uDeep, uShallow, uSand, uFoam, uSky;
      varying vec3 vW; varying vec3 vN; varying float vDepth;
      #include <fog_pars_fragment>
      void main(){
        float d = seaDepth(vW.z);
        float r1 = vnoise(vec3(vW.x * 0.32 + uTime * 0.5, uTime * 0.25, vW.z * 0.32));
        float r2 = vnoise(vec3(vW.x * 1.2 - uTime * 0.4, uTime * 0.45, vW.z * 1.2 + uTime * 0.3));
        vec3 n = normalize(vN + vec3(r1 - 0.5, 0.0, r2 - 0.5) * 0.32);
        vec3 V = normalize(cameraPosition - vW);
        float fres = pow(1.0 - max(dot(n, V), 0.0), 3.0);
        vec3 col = mix(uSand, uShallow, smoothstep(-0.05, 0.35, d));
        col = mix(col, uDeep, smoothstep(1.0, 9.0, d));
        col = mix(col, uSky, fres * 0.55);
        float spec = pow(max(dot(n, normalize(uSun + V)), 0.0), 80.0);
        col += vec3(1.0, 0.97, 0.9) * spec * 0.75;
        float breakers = smoothstep(0.62, 1.0, sin(d * 4.2 + uTime * 1.5 + r1 * 3.0)) * (1.0 - smoothstep(0.8, 3.6, d)) * smoothstep(0.1, 0.5, d);
        float edge = 1.0 - smoothstep(0.0, 0.09, abs(d - 0.04 - sin(uTime * 0.8) * 0.05));
        float foam = clamp(breakers * 0.85 + edge * 0.8, 0.0, 1.0) * (0.55 + 0.45 * r2);
        foam *= step(0.08, fract(vW.x * 0.07 + r1 * 1.5)) * 0.4 + 0.6;
        col = mix(col, uFoam, foam);
        float alpha = mix(0.35, 0.93, smoothstep(0.0, 1.2, d)) + foam * 0.4;
        gl_FragColor = vec4(col, clamp(alpha, 0.0, 1.0));
        #include <fog_fragment>
      }`,
    transparent: true, fog: true,
  });
}
function updateWater(t) {
  if (MAP.water) MAP.water.material.uniforms.uTime.value = t;
}
