'use strict';
/* =========================================================
   MUNDO — praia de Omaha, falésia, vilas normandas,
   trincheiras, sebes (bocage) e consultas espaciais.
   Norte = -Z (interior). Mar = +Z.
   ========================================================= */
const WORLD = { minX: -700, maxX: 700, minZ: -1000, maxZ: 620 };
const SHORE_Z = 330;
const DRAWS = [-220, 180];            // "draws": vales que cortam a falésia
const WIRE_Z = 214;
const WIRE_GAPS = [-400, -220, -60, 180, 330];

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
const wr = mulberry32(61944);
function wrr(a, b) { return a + (b - a) * wr(); }
function wpick(arr) { return arr[(wr() * arr.length) | 0]; }
function hash2(i, j) { const h = Math.sin(i * 127.1 + j * 311.7) * 43758.5453; return h - Math.floor(h); }

function groundH(x, z) {
  if (z > SHORE_Z) return -(z - SHORE_Z) * 0.045 - 1.2 * smooth((z - SHORE_Z) / 24);
  if (z > 232) return (SHORE_Z - z) * 0.03;
  let h = 2.94 + 17 * smooth((232 - z) / 62);
  for (let i = 0; i < DRAWS.length; i++) {
    const w = 1 - smooth((Math.abs(x - DRAWS[i]) - 16) / 34);
    if (w > 0) h = h * (1 - w) + (2.94 + 17 * smooth((232 - z) / 150)) * w;
  }
  const k = smooth((175 - z) / 90);
  if (k > 0) h += k * (2.6 * Math.sin(x * 0.011 + 1.3) * Math.cos(z * 0.009) + 1.4 * Math.sin(x * 0.027 + z * 0.021) + 0.7 * Math.cos(x * 0.05 - z * 0.04));
  return h;
}
function surfaceH(x, z) { return Math.max(groundH(x, z), 0); }

const FIELD_COLS = [
  [0.36, 0.47, 0.22], [0.30, 0.41, 0.19], [0.62, 0.57, 0.31], [0.44, 0.36, 0.24],
  [0.44, 0.53, 0.26], [0.33, 0.44, 0.2], [0.55, 0.55, 0.28],
];
function groundColor(x, z, h, c) {
  let r, g, b;
  const n = Math.sin(x * 0.37 + z * 0.11) * Math.cos(z * 0.29 - x * 0.07) * 0.035;
  if (h < 0.12) { r = 0.40; g = 0.39; b = 0.31; }
  else if (z > 236) {
    const wet = smooth((z - 296) / 30);
    r = 0.80 - wet * 0.2; g = 0.72 - wet * 0.18; b = 0.53 - wet * 0.13;
    if (z < 251) { r = 0.55; g = 0.53; b = 0.5; }
  } else if (z > 150) {
    const gr = smooth((236 - z) / 34);
    r = lerp(0.6, 0.40, gr); g = lerp(0.56, 0.46, gr); b = lerp(0.40, 0.24, gr);
    if (Math.sin(x * 0.08) * Math.cos(z * 0.13) > 0.55) { r = 0.47; g = 0.41; b = 0.29; }
  } else {
    const k = hash2(Math.floor(x / 70), Math.floor(z / 60));
    const P = FIELD_COLS[Math.floor(k * FIELD_COLS.length)];
    r = P[0]; g = P[1]; b = P[2];
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
  near(x, z, out) {
    out.length = 0;
    const cx = Math.floor(x / this.cell), cz = Math.floor(z / this.cell);
    for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) {
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
  constructor() { this.p = []; this.n = []; this.c = []; }
  add(geo, color, sx, sy, sz, x, y, z, rx, ry, rz, parent) {
    _e.set(rx || 0, ry || 0, rz || 0); _q.setFromEuler(_e);
    _m4.compose(_v.set(x, y, z), _q, _s.set(sx, sy, sz));
    if (parent) _m4.premultiply(parent);
    _n3.getNormalMatrix(_m4); _col.setHex(color);
    const g = nonIndexed(geo), pa = g.attributes.position, na = g.attributes.normal;
    const t = new THREE.Vector3();
    for (let i = 0; i < pa.count; i++) {
      t.fromBufferAttribute(pa, i).applyMatrix4(_m4); this.p.push(t.x, t.y, t.z);
      t.fromBufferAttribute(na, i).applyMatrix3(_n3).normalize(); this.n.push(t.x, t.y, t.z);
      this.c.push(_col.r, _col.g, _col.b);
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

const MAP = {
  towns: [
    { name: 'Vierville-sur-Mer', x: -255, z: -30, r: 52, cp: true },
    { name: 'Saint-Laurent-sur-Mer', x: 135, z: -150, r: 58, cp: true },
    { name: 'Colleville-sur-Mer', x: 430, z: -20, r: 48, cp: true },
    { name: 'Formigny', x: -90, z: -470, r: 58, cp: true },
    { name: 'Trévières', x: 60, z: -850, r: 72, hq: true },
  ],
  roads: [
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
  ],
  roadSegs: [], trenchLines: [], trenchSpots: [], hedgehogs: [], hedge: new Set(),
  obstacles: new SGrid(24), coverPts: new SGrid(12), trench: new SGrid(10),
  bunkerSpots: [[-300, 187], [-140, 191], [62, 189], [262, 187]],
  navalGuns: [], ships: [], water: null, foam: null, miniBase: null, MMW: 176, MMH: 203,
};

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

/* ---------- casas, igreja ---------- */
function addHouse(B, x, z, ry, damaged) {
  const w = wrr(7, 10), d = wrr(6, 8.5), h = wrr(5, 7.5);
  const wall = wpick([0xcbbd9c, 0xbcae92, 0xd6cbb2, 0xa99d86, 0xc4b69a, 0xb3a58b]);
  const roof = wpick([0x4a4e57, 0x555a62, 0x6e3b2c, 0x7a4433, 0x4f525a]);
  const par = new THREE.Matrix4().compose(new THREE.Vector3(x, groundH(x, z), z), new THREE.Quaternion().setFromAxisAngle(UP, ry), new THREE.Vector3(1, 1, 1));
  B.add(G.box, wall, w, h + 3, d, 0, (h + 3) / 2 - 3, 0, 0, 0, 0, par);
  if (!damaged) {
    B.add(G.roof, roof, w + 0.7, h * 0.5, d + 1, 0, h, 0, 0, 0, 0, par);
    B.add(G.box, 0x8a7d6a, 0.8, 2.2, 0.8, w * 0.3, h + h * 0.3, -d * 0.2, 0, 0, 0, par);
  } else {
    for (let i = 0; i < 4; i++) B.add(G.box, wall, wrr(1.5, 3), wrr(0.5, 2), 0.6, wrr(-w / 2, w / 2), h + 0.4, wrr(-d / 2, d / 2), 0, wrr(0, 3), 0, par);
    for (let i = 0; i < 6; i++) B.add(G.ico, 0x7d7465, wrr(0.6, 1.4), wrr(0.4, 0.9), wrr(0.6, 1.4), wrr(-w / 2 - 2, w / 2 + 2), 0.3, wrr(d / 2, d / 2 + 2.5), 0, 0, 0, par);
    B.add(G.roof, 0x2d2a26, w * 0.6, h * 0.3, d + 0.4, -w * 0.2, h - 0.3, 0, 0.12, 0, 0, par);
  }
  for (const side of [1, -1]) {
    for (const wx of [-w / 4, w / 4]) B.add(G.box, 0x2f3438, 1.0, 1.2, 0.12, wx, h * 0.58, side * (d / 2 + 0.03), 0, 0, 0, par);
  }
  B.add(G.box, 0x4a3524, 1.1, 2.1, 0.12, 0, 1.05, d / 2 + 0.04, 0, 0, 0, par);
  MAP.obstacles.add({ x, z, r: Math.max(w, d) * 0.58 });
}
function addChurch(B, x, z) {
  const par = new THREE.Matrix4().makeTranslation(x, groundH(x, z), z);
  B.add(G.box, 0xc2b79f, 9, 11, 20, 0, 2.5, 0, 0, 0, 0, par);
  B.add(G.roof, 0x4a4e57, 21, 4.5, 10, 0, 8, 0, 0, Math.PI / 2, 0, par);
  B.add(G.box, 0xbaae95, 5.5, 18, 5.5, 0, 6, 12, 0, 0, 0, par);
  B.add(G.cone4, 0x41454d, 4.2, 9, 4.2, 0, 19.5, 12, 0, Math.PI / 4, 0, par);
  B.add(G.box, 0x2b2f33, 1.4, 2.4, 0.15, 0, 11, 14.8, 0, 0, 0, par);
  for (let i = 0; i < 3; i++) for (const sx of [-1, 1]) B.add(G.box, 0x2f3540, 0.15, 2.6, 1.2, sx * 4.55, 4.5, -6 + i * 5, 0, 0, 0, par);
  B.add(G.box, 0x3d2c1e, 2, 3.2, 0.15, 0, 1.6, 14.8, 0, 0, 0, par);
  MAP.obstacles.add({ x, z: z - 4, r: 7 }); MAP.obstacles.add({ x, z: z + 8, r: 6 });
}

/* ---------- construção do mundo ---------- */
function buildWorld(scene) {
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
  const terrain = new THREE.Mesh(tg, new THREE.MeshLambertMaterial({ vertexColors: true }));
  terrain.receiveShadow = true; scene.add(terrain);
  // borda distante (campos além do mapa)
  const far = new THREE.Mesh(new THREE.PlaneGeometry(6000, 3000), new THREE.MeshLambertMaterial({ color: 0x55643a }));
  far.rotation.x = -Math.PI / 2; far.position.set(0, 14, -2490); scene.add(far);
  for (const sx of [-1, 1]) {
    const side = new THREE.Mesh(new THREE.PlaneGeometry(2300, 1160), new THREE.MeshLambertMaterial({ color: 0x55643a }));
    side.rotation.x = -Math.PI / 2; side.position.set(sx * (700 + 1150), 16, -420); scene.add(side);
  }

  /* mar */
  const wg = new THREE.PlaneGeometry(4200, 2600, 70, 44); wg.rotateX(-Math.PI / 2); wg.translate(0, 0, 1050);
  const water = new THREE.Mesh(wg, new THREE.MeshPhongMaterial({ color: 0x3c5a62, specular: 0x3a4a4f, shininess: 40, transparent: true, opacity: 0.86, flatShading: true }));
  water.userData.base = Float32Array.from(wg.attributes.position.array);
  scene.add(water); MAP.water = water;
  const foam = new THREE.Mesh(new THREE.PlaneGeometry(SX, 7), new THREE.MeshBasicMaterial({ color: 0xe9efe9, transparent: true, opacity: 0.45, depthWrite: false }));
  foam.rotation.x = -Math.PI / 2; foam.position.set(0, 0.08, SHORE_Z + 2); scene.add(foam); MAP.foam = foam;

  const B = new GeoBuilder();      // casas, igrejas, obstáculos de praia, arame
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
  for (const r of MAP.roads) R.ribbon(r, 5.5, 0.14, 0x8b7d5e, 0x857759);

  /* trincheiras */
  const zig = (x0, x1, zc, amp, step) => { const p = []; let i = 0; for (let x = x0; x <= x1; x += step, i++) p.push([x, zc + (i % 2 ? amp : -amp) + wrr(-1.5, 1.5)]); return p; };
  const ring = (cx, cz, r, n) => { const p = []; for (let i = 0; i <= n; i++) { const a = i / n * Math.PI * 2; p.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r * 0.85]); } return p; };
  MAP.trenchLines = [zig(-480, 480, 170, 3.5, 16), zig(-430, 430, -330, 3.5, 18), ring(60, -850, 125, 26)];
  const bags = [];
  for (const line of MAP.trenchLines) {
    R.ribbon(line, 2.8, 0.1, 0x3a2e22);
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
  const bagMesh = new THREE.InstancedMesh(G.box, new THREE.MeshLambertMaterial({ color: 0xffffff }), bags.length);
  const dummy = new THREE.Object3D(), bc = new THREE.Color();
  bags.forEach((b, i) => {
    dummy.position.set(b[0], b[1], b[2]); dummy.rotation.set(0, b[3], 0); dummy.scale.set(0.68, 0.48, 1.18); dummy.updateMatrix();
    bagMesh.setMatrixAt(i, dummy.matrix); bagMesh.setColorAt(i, bc.setHex(wpick([0x8a7a58, 0x7d6f50, 0x94845f])));
  });
  bagMesh.castShadow = true; bagMesh.receiveShadow = true; scene.add(bagMesh);

  /* praia: ouriços tchecos, rampas de troncos com minas, arame farpado */
  for (let i = 0; i < 95; i++) {
    const x = wrr(-560, 560), z = wrr(256, 320);
    const par = new THREE.Matrix4().compose(new THREE.Vector3(x, groundH(x, z), z), new THREE.Quaternion().setFromAxisAngle(UP, wrr(0, 3)), new THREE.Vector3(1, 1, 1));
    for (let k = 0; k < 3; k++) B.add(G.box, 0x3d3634, 0.32, 0.32, 3.4, 0, 1.0, 0, 0.62, k * 2.094, 0, par);
    MAP.hedgehogs.push([x, z]); MAP.coverPts.add({ x, z, r: 3.0 });
  }
  for (let i = 0; i < 40; i++) {
    const x = wrr(-560, 560), z = wrr(262, 312);
    const par = new THREE.Matrix4().compose(new THREE.Vector3(x, groundH(x, z), z), new THREE.Quaternion().setFromAxisAngle(UP, Math.PI), new THREE.Vector3(1, 1, 1));
    B.add(G.box, 0x5b4a36, 0.45, 0.45, 5, 0, 1.2, 0, -0.45, 0, 0, par);
    B.add(G.box, 0x5b4a36, 0.4, 2.0, 0.4, 0, 1.0, -1.7, 0, 0, 0, par);
    B.add(G.cyl8, 0x2e2e28, 0.36, 0.16, 0.36, 0, 2.35, 2.3, -0.45, 0, 0, par);
    MAP.coverPts.add({ x, z, r: 2.5 });
  }
  for (let x = -620; x <= 620; x += 2.0) {
    if (WIRE_GAPS.some(g => Math.abs(x - g) < 7)) continue;
    const z = WIRE_Z + Math.sin(x * 0.3) * 0.4, y = groundH(x, z);
    B.add(G.torus, 0x4a4540, 0.9, 0.9, 0.9, x, y + 0.85, z, 0, Math.PI / 2, 0);
    if (Math.round(x) % 10 === 0) B.add(G.box, 0x4f3f2c, 0.14, 1.8, 0.14, x, y + 0.9, z, 0, 0, 0);
  }
  // quebra-mar de seixos e destroços
  for (let i = 0; i < 26; i++) {
    const x = wrr(-600, 600), z = wrr(240, 250);
    B.add(G.ico, 0x6b6862, wrr(1, 2.2), wrr(0.5, 0.9), wrr(1, 2), x, groundH(x, z) + 0.2, z, 0, wrr(0, 3), 0);
  }

  /* sebes (bocage) e árvores */
  const bush = [], trees = [];
  for (let i = -9; i <= 9; i++) for (let j = -16; j <= 1; j++) {
    for (const vert of [true, false]) {
      if (wr() > 0.55) continue;
      const ax = i * 70, az = j * 60, bx = vert ? ax : ax + 70, bz = vert ? az + 60 : az;
      if (Math.max(az, bz) > 118 || bx > 690 || ax < -690) continue;
      if (nearTown((ax + bx) / 2, (az + bz) / 2, 26)) continue;
      MAP.hedge.add((vert ? 'v' : 'h') + i + ',' + j);
      const len = vert ? 60 : 70;
      for (let s = 2; s < len; s += 4.3) {
        const x = vert ? ax + wrr(-0.6, 0.6) : ax + s, z = vert ? az + s : az + wrr(-0.6, 0.6);
        if (nearRoad(x, z, 6) || inTrench(x, z)) continue;
        bush.push([x, z, wrr(2.3, 3.4), wrr(1.9, 2.9)]);
        if (wr() < 0.11) trees.push([x + wrr(-1, 1), z + wrr(-1, 1), wrr(0.9, 1.35), wr() < 0.3 ? 1 : 0]);
      }
    }
  }
  for (let f = 0; f < 9; f++) {
    const cx = wrr(-620, 620), cz = wrr(-950, 60);
    if (nearTown(cx, cz, 40)) continue;
    for (let k = 0; k < 32; k++) {
      const a = wrr(0, 6.28), d = Math.sqrt(wr()) * 38, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
      if (!nearRoad(x, z, 5) && !inTrench(x, z)) trees.push([x, z, wrr(0.9, 1.5), 0]);
    }
  }
  for (const t of MAP.towns) {
    const ox = t.x - t.r - 30, oz = t.z + t.r * 0.35;
    for (let a = 0; a < 5; a++) for (let b = 0; b < 4; b++) {
      const x = ox + a * 7 + wrr(-1, 1), z = oz + b * 7 + wrr(-1, 1);
      if (!nearRoad(x, z, 5)) trees.push([x, z, wrr(0.55, 0.7), 2]);
    }
  }
  const bushMesh = new THREE.InstancedMesh(G.ico, new THREE.MeshLambertMaterial({ color: 0xffffff }), bush.length);
  bush.forEach((b, i) => {
    dummy.position.set(b[0], groundH(b[0], b[1]) + b[3] * 0.45, b[1]); dummy.rotation.set(0, wrr(0, 6), 0); dummy.scale.set(b[2], b[3], b[2]); dummy.updateMatrix();
    bushMesh.setMatrixAt(i, dummy.matrix); bushMesh.setColorAt(i, bc.setHex(wpick([0x2f4a22, 0x37532a, 0x2a4220, 0x3e5a2c])));
  });
  bushMesh.castShadow = true; scene.add(bushMesh);
  const trunk = new THREE.InstancedMesh(G.cyl8, new THREE.MeshLambertMaterial({ color: 0x4a3b2a }), trees.length);
  const crown = new THREE.InstancedMesh(G.ico, new THREE.MeshLambertMaterial({ color: 0xffffff }), trees.length);
  trees.forEach((t, i) => {
    const s = t[2], y = groundH(t[0], t[1]), tall = t[3] === 1, apple = t[3] === 2;
    const th = tall ? 7 : apple ? 2.4 : 4;
    dummy.position.set(t[0], y + th * s / 2, t[1]); dummy.rotation.set(0, 0, 0); dummy.scale.set(0.35 * s, th * s, 0.35 * s); dummy.updateMatrix();
    trunk.setMatrixAt(i, dummy.matrix);
    const cw = tall ? 1.7 : apple ? 3.2 : 2.9, ch = tall ? 6.5 : apple ? 2.6 : 3.4;
    dummy.position.set(t[0], y + (th + ch * 0.55) * s, t[1]); dummy.rotation.set(0, wrr(0, 6), 0); dummy.scale.set(cw * s, ch * s, cw * s); dummy.updateMatrix();
    crown.setMatrixAt(i, dummy.matrix); crown.setColorAt(i, bc.setHex(apple ? wpick([0x4f6e2f, 0x5a7a34]) : wpick([0x2d4a24, 0x35552a, 0x2a4422, 0x3f5e2d])));
  });
  trunk.castShadow = true; crown.castShadow = true; scene.add(trunk, crown);

  /* malhas estáticas mescladas */
  const statics = new THREE.Mesh(B.build(), new THREE.MeshLambertMaterial({ vertexColors: true }));
  statics.castShadow = true; statics.receiveShadow = true; scene.add(statics);
  const ground = new THREE.Mesh(R.build(), new THREE.MeshLambertMaterial({ vertexColors: true, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  ground.receiveShadow = true; scene.add(ground);

  /* frota ao largo */
  const fleet = [[-320, 840, 60, false, 0.15], [260, 900, 64, false, -0.1], [-60, 1180, 130, true, 0.05], [520, 1300, 120, true, -0.05], [-600, 1050, 60, false, 0.2]];
  for (const f of fleet) {
    const s = makeWarship(f[2], f[3]); s.position.set(f[0], 0, f[1]); s.rotation.y = Math.PI / 2 + f[4];
    scene.add(s); MAP.ships.push(s);
    s.userData.guns.forEach(gun => MAP.navalGuns.push(gun));
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

/* animação do mar */
function updateWater(t) {
  const w = MAP.water; if (!w) return;
  const p = w.geometry.attributes.position, b = w.userData.base;
  for (let i = 0; i < p.count; i++) {
    const x = b[i * 3], z = b[i * 3 + 2];
    p.array[i * 3 + 1] = Math.sin(x * 0.045 + t * 1.1) * 0.35 + Math.cos(z * 0.06 - t * 1.4) * 0.3;
  }
  p.needsUpdate = true; w.geometry.computeVertexNormals();
  if (MAP.foam) { MAP.foam.position.z = SHORE_Z + 3 + Math.sin(t * 0.8) * 3; MAP.foam.material.opacity = 0.3 + Math.sin(t * 0.8 + 1) * 0.15; }
}
