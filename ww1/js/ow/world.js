'use strict';
// Mundo aberto (6 x 6 km): relevo, rio Ancre, cidades francesas, estradas com álamos, florestas,
// e a frente de batalha com trincheiras, crateras e arame. O terreno é carregado em pedaços ao redor da câmera.
(function () {
  const O = WW1.ow = {};
  const S = WW1.smooth, lerp = WW1.lerp, hash = WW1.hash;
  const MINX = -3000, MAXX = 3000, MINZ = -3000, MAXZ = 3000;
  const HALFW = 1.3, FLOOR_D = 1.75, STEPH = 0.7, STEPOFF = 1.0;
  const WATER = -3.5;
  O.WATER = WATER;

  // ---------------- Frente de batalha ----------------
  const frontZ = x => 400 + 120 * Math.sin(x / 700) + 50 * Math.sin(x / 230 + 1);
  const zig = x => { const p = 16, f = x / p - Math.floor(x / p); return Math.abs(f - 0.5) * 4 - 1; };
  const alliedZ = x => frontZ(x) - 70 + zig(x);
  const germanZ = x => frontZ(x) + 70 + zig(x + 37);
  O.frontZ = frontZ; O.alliedZ = alliedZ; O.germanZ = germanZ;
  O.SECTOR_W = 300;
  O.sectorOf = x => WW1.clamp(Math.floor((x - MINX) / O.SECTOR_W), 0, 19);
  O.sectorX = i => MINX + (i + 0.5) * O.SECTOR_W;

  // ---------------- Cidades, estradas e rio ----------------
  O.towns = [
    { name: 'Albert', x: 0, z: -900, r: 170, side: 'allied', hq: true },
    { name: 'Amiens', x: -1600, z: -2450, r: 190, side: 'allied' },
    { name: 'Corbie', x: -1500, z: -1500, r: 110, side: 'allied' },
    { name: 'Bray', x: 1500, z: -1300, r: 110, side: 'allied' },
    { name: 'Mailly', x: -2300, z: -300, r: 90, side: 'allied' },
    { name: 'Mesnil', x: 900, z: -150, r: 80, side: 'allied', damaged: true },
    { name: 'Auchonvillers', x: -800, z: -150, r: 80, side: 'allied', damaged: true },
    { name: 'La Boisselle', x: 60, z: 400, r: 70, side: 'ruin' },
    { name: 'Pozières', x: -150, z: 900, r: 100, side: 'german', damaged: true },
    { name: 'Thiepval', x: -1300, z: 850, r: 90, side: 'german', damaged: true },
    { name: 'Courcelette', x: 1100, z: 1100, r: 90, side: 'german' },
    { name: 'Le Sars', x: 1800, z: 1800, r: 90, side: 'german' },
    { name: 'Miraumont', x: -2000, z: 1900, r: 100, side: 'german' },
    { name: 'Bapaume', x: 300, z: 2300, r: 180, side: 'german' },
  ];
  const T = name => O.towns.find(t => t.name === name);
  const ROADS = [
    ['Amiens', 'Corbie'], ['Corbie', 'Albert'], ['Albert', 'Bray'], ['Albert', 'Mesnil'], ['Albert', 'Auchonvillers'],
    ['Auchonvillers', 'Mailly'], ['Corbie', 'Mailly'], ['Bray', 'Mesnil'], ['Albert', 'La Boisselle'], ['La Boisselle', 'Pozières'],
    ['Pozières', 'Bapaume'], ['Pozières', 'Courcelette'], ['Courcelette', 'Le Sars'], ['Le Sars', 'Bapaume'],
    ['Pozières', 'Thiepval'], ['Thiepval', 'Miraumont'], ['Miraumont', 'Bapaume'], ['Amiens', 'Bray'],
  ];
  const RIVER = [[-3200, -1000], [-1800, -1250], [-900, -1150], [-250, -1060], [300, -1150], [1200, -1600], [2200, -1900], [3200, -2000]];

  // Grade espacial para segmentos (estradas e rio)
  const CELL = 64;
  function SegGrid() { this.map = new Map(); }
  SegGrid.prototype.key = (i, j) => i * 100003 + j;
  SegGrid.prototype.add = function (seg, margin) {
    const x0 = Math.min(seg[0], seg[2]) - margin, x1 = Math.max(seg[0], seg[2]) + margin;
    const z0 = Math.min(seg[1], seg[3]) - margin, z1 = Math.max(seg[1], seg[3]) + margin;
    for (let i = Math.floor(x0 / CELL); i <= Math.floor(x1 / CELL); i++)
      for (let j = Math.floor(z0 / CELL); j <= Math.floor(z1 / CELL); j++) {
        const k = this.key(i, j);
        let l = this.map.get(k);
        if (!l) this.map.set(k, (l = []));
        l.push(seg);
      }
  };
  SegGrid.prototype.dist = function (x, z, max) {
    const l = this.map.get(this.key(Math.floor(x / CELL), Math.floor(z / CELL)));
    let best = max;
    if (!l) return best;
    for (const s of l) {
      const dx = s[2] - s[0], dz = s[3] - s[1], L = dx * dx + dz * dz;
      let t = L > 0 ? ((x - s[0]) * dx + (z - s[1]) * dz) / L : 0;
      t = t < 0 ? 0 : t > 1 ? 1 : t;
      const ex = s[0] + dx * t - x, ez = s[1] + dz * t - z, d = Math.sqrt(ex * ex + ez * ez);
      if (d < best) best = d;
    }
    return best;
  };
  const roadGrid = new SegGrid(), riverGrid = new SegGrid();
  O.roads = [];

  function buildLayout() {
    for (const t of O.towns) t.h = baseH(t.x, t.z);
    for (const [a, b] of ROADS) {
      const A = T(a), B = T(b);
      const dx = B.x - A.x, dz = B.z - A.z, len = Math.hypot(dx, dz);
      const nx = -dz / len, nz = dx / len, curv = (hash(Math.round(A.x), Math.round(B.z), 5) - 0.5) * 0.14 * len;
      const pts = [];
      const n = Math.ceil(len / 15);
      for (let i = 0; i <= n; i++) {
        const t = i / n, off = Math.sin(t * Math.PI) * curv + Math.sin(t * Math.PI * 3) * 4 * Math.sign(curv);
        pts.push([A.x + dx * t + nx * off, A.z + dz * t + nz * off]);
      }
      const road = { a, b, pts, main: (a === 'Albert' || b === 'Albert' || a === 'Bapaume' || b === 'Bapaume') };
      O.roads.push(road);
      for (let i = 0; i < pts.length - 1; i++) roadGrid.add([pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1]], 20);
    }
    for (let i = 0; i < RIVER.length - 1; i++) {
      const a = RIVER[i], b = RIVER[i + 1];
      const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 40);
      let prev = a;
      for (let k = 1; k <= n; k++) {
        const t = k / n;
        const p = [a[0] + (b[0] - a[0]) * t + Math.sin((a[0] + t * 400) / 90) * 25 * (k < n ? 1 : 0), a[1] + (b[1] - a[1]) * t + Math.cos((a[1] + t * 300) / 70) * 18 * (k < n ? 1 : 0)];
        riverGrid.add([prev[0], prev[1], p[0], p[1]], 45);
        prev = p;
      }
    }
  }

  // ---------------- Altura do terreno ----------------
  function baseH(x, z) {
    return 18 + 14 * (WW1.vnoise(x * 0.0007 + 11.3, z * 0.0007 + 3.7, 21) - 0.5) * 2
      + 6 * (WW1.vnoise(x * 0.0026, z * 0.0026, 22) - 0.5) * 2;
  }
  function frontness(x, z) { return 1 - S(110, 650, Math.abs(z - frontZ(x))); }

  function townMask(x, z) {
    let m = 0, h = 0;
    for (const t of O.towns) {
      const d = Math.hypot(x - t.x, z - t.z);
      if (d > t.r + 70) continue;
      const k = S(t.r + 70, t.r, d);
      if (k > m) { m = k; h = t.h; }
    }
    return [m, h];
  }

  function craters(x, z, f) {
    if (f < 0.02) return 0;
    const C = 9;
    const ci = Math.floor(x / C), cj = Math.floor(z / C);
    let h = 0;
    const dens = 0.62 * Math.pow(f, 1.3);
    for (let i = ci - 1; i <= ci + 1; i++) for (let j = cj - 1; j <= cj + 1; j++) {
      if (hash(i, j, 31) > dens) continue;
      const cx = (i + 0.15 + 0.7 * hash(i, j, 32)) * C, cz = (j + 0.15 + 0.7 * hash(i, j, 33)) * C;
      const r = 1.5 + hash(i, j, 34) * (1.5 + 2.5 * f);
      const d = Math.hypot(x - cx, z - cz) / r;
      if (d > 1.7) continue;
      const depth = r * 0.33;
      if (d < 1) h -= depth * (1 - d * d);
      h += depth * 0.28 * Math.exp(-(d - 1) * (d - 1) / 0.08);
    }
    return h;
  }

  function trenchCut(h, d, floorY) {
    const ad = Math.abs(d);
    const c = 1 - S(HALFW, HALFW + 0.55, ad);
    return h + (floorY - h) * c;
  }

  // Altura do chão (sem obstáculos)
  function H(x, z) {
    let h = baseH(x, z);
    const roadD = roadGrid.dist(x, z, 40);
    const road = 1 - S(5, 18, roadD);
    const [tm, th] = townMask(x, z);
    h = lerp(h, th, tm);
    h += ((WW1.vnoise(x * 0.017, z * 0.017, 23) - 0.5) * 2.2 + (WW1.vnoise(x * 0.08, z * 0.08, 24) - 0.5) * 0.4) * (1 - road) * (1 - tm * 0.85);
    // rio
    const rd = riverGrid.dist(x, z, 60);
    if (rd < 60) h = lerp(h, -6.5, S(30, 9, rd) * (1 - road));
    // frente
    const fz = frontZ(x), f = 1 - S(110, 650, Math.abs(z - fz));
    if (f > 0) {
      h += craters(x, z, f) * (1 - road * 0.7) * (1 - tm * 0.5);
      const dA = z - alliedZ(x), dG = z - germanZ(x);
      const near = Math.min(Math.abs(dA), Math.abs(dG));
      if (near < 12) {
        const ref = baseH(x, fz);
        h = lerp(ref + (h - ref) * 0.3, h, S(3, 10, near));
        h += 0.28 * Math.exp(-Math.pow((Math.abs(dA) - 2.3) / 0.75, 2)) + 0.28 * Math.exp(-Math.pow((Math.abs(dG) - 2.3) / 0.75, 2));
        h = trenchCut(h, dA, ref - FLOOR_D);
        h = trenchCut(h, dG, ref - FLOOR_D);
      }
    }
    return h;
  }

  // ---------------- Obstáculos (casas, degraus, sacos de areia, remendos) ----------------
  const solids = new Map(); // célula 32 m -> lista de retângulos orientados
  const SC = 32;
  function addSolid(o) {
    const r = Math.hypot(o.hw, o.hd);
    for (let i = Math.floor((o.x - r) / SC); i <= Math.floor((o.x + r) / SC); i++)
      for (let j = Math.floor((o.z - r) / SC); j <= Math.floor((o.z + r) / SC); j++) {
        const k = i * 100003 + j;
        let l = solids.get(k);
        if (!l) solids.set(k, (l = []));
        l.push(o);
      }
  }
  O.addSolid = addSolid;
  function solidAt(x, z) {
    const l = solids.get(Math.floor(x / SC) * 100003 + Math.floor(z / SC));
    if (!l) return -1e9;
    let top = -1e9;
    for (const o of l) {
      const dx = x - o.x, dz = z - o.z;
      const lx = dx * o.c + dz * o.s, lz = -dx * o.s + dz * o.c;
      if (Math.abs(lx) < o.hw && Math.abs(lz) < o.hd) {
        const t = o.patch ? o.patch(x, z) : o.top;
        if (t > top) top = t;
      }
    }
    return top;
  }

  function Sfn(x, z) {
    let h = H(x, z);
    const fz = frontZ(x);
    if (Math.abs(z - fz) < 90) {
      for (let t = 0; t < 2; t++) {
        const tz = t === 0 ? alliedZ(x) : germanZ(x), front = t === 0 ? 1 : -1;
        const d = z - tz, ad = Math.abs(d);
        if (ad > 3) continue;
        const ref = baseH(x, fz), floor = ref - FLOOR_D;
        if (ad > STEPOFF - 0.3 && ad < HALFW) h = Math.max(h, floor + STEPH);
        if (ad > HALFW + 0.5 && ad < HALFW + 1.0) {
          const rows = Math.sign(d) === front ? 1 : 2;
          h = Math.max(h, H(x, tz + Math.sign(d) * (HALFW + 0.75)) + 0.12 + rows * 0.2);
        }
      }
    }
    const s = solidAt(x, z);
    return s > h ? s : h;
  }

  // Remendo de altura local (ex.: anel de sacos do ninho de metralhadora)
  function stamp(x0, x1, z0, z1, fn) {
    const G = 0.4, nx = Math.ceil((x1 - x0) / G) + 1, nz = Math.ceil((z1 - z0) / G) + 1;
    const grid = new Float32Array(nx * nz).fill(-1e9);
    for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
      const x = x0 + i * G, z = z0 + j * G, v = fn(x, z, H(x, z));
      if (v !== null) grid[j * nx + i] = v;
    }
    addSolid({
      x: (x0 + x1) / 2, z: (z0 + z1) / 2, hw: (x1 - x0) / 2, hd: (z1 - z0) / 2, c: 1, s: 0,
      patch: (x, z) => grid[WW1.clamp(Math.round((z - z0) / G), 0, nz - 1) * nx + WW1.clamp(Math.round((x - x0) / G), 0, nx - 1)],
    });
  }

  // ---------------- API do "mundo" usada pelo resto do jogo ----------------
  const API = {
    MINX: MINX + 20, MAXX: MAXX - 20, MINZ: MINZ + 20, MAXZ: MAXZ - 20,
    H, S: Sfn, stamp, ammoCrates: [], mats: null,
    STEPY: 0, FLOOR: 0, STEPOFF, PLAYER_TRENCH: 0, ENEMY_TRENCH: 0,
    trenchZ: (x, base) => (base === 'german' ? germanZ(x) : alliedZ(x)),
    los(ax, ay, az, bx, by, bz) {
      const dx = bx - ax, dy = by - ay, dz = bz - az, len = Math.hypot(dx, dy, dz);
      const n = Math.ceil(len / (len > 120 ? 0.8 : 0.4));
      for (let s = 1; s < n; s++) {
        const t = s / n;
        if (t * len < 0.4 || (1 - t) * len < 0.4) continue;
        const x = ax + dx * t, z = az + dz * t;
        if (ay + dy * t < Sfn(x, z) - 0.03) return false;
      }
      return true;
    },
    rayHit(o, d, maxDist) {
      let prev = 0;
      const step = 0.4;
      for (let t = 0.3; t <= maxDist; t += (t > 80 ? 1 : step)) {
        const x = o.x + d.x * t, y = o.y + d.y * t, z = o.z + d.z * t;
        if (y < Sfn(x, z) || y < WATER - 0.2) {
          let a = prev, b = t;
          for (let k = 0; k < 7; k++) { const m = (a + b) / 2; const yy = o.y + d.y * m, xx = o.x + d.x * m, zz = o.z + d.z * m; if (yy < Sfn(xx, zz) || yy < WATER - 0.2) b = m; else a = m; }
          return { dist: b, x: o.x + d.x * b, y: o.y + d.y * b, z: o.z + d.z * b };
        }
        prev = t;
      }
      return null;
    },
    inTrench(p) {
      if (Math.abs(p.z - frontZ(p.x)) > 90) return null;
      const ref = baseH(p.x, frontZ(p.x)) - FLOOR_D;
      if (Math.abs(p.z - alliedZ(p.x)) < HALFW + 0.3 && p.y < ref + 1) return 'allied';
      if (Math.abs(p.z - germanZ(p.x)) < HALFW + 0.3 && p.y < ref + 1) return 'german';
      return null;
    },
    inWire(x, z) {
      const fz = frontZ(x);
      if (Math.abs(z - fz) > 90) return false;
      const ra = z - alliedZ(x), rg = z - germanZ(x);
      const seg = Math.floor((x + 3000) / 40);
      const gap = hash(seg, 1, 41) < 0.35;
      if (ra > 9 && ra < 12.5 && !gap) return true;
      if (rg < -9.5 && rg > -14 && hash(seg, 2, 42) > 0.35) return true;
      return false;
    },
  };
  O.API = API;
  O.H = H; O.S = Sfn; O.baseH = baseH; O.frontness = frontness;
  O.roadDist = (x, z) => roadGrid.dist(x, z, 60);
  O.riverDist = (x, z) => riverGrid.dist(x, z, 80);
  O.trenchFloor = x => baseH(x, frontZ(x)) - FLOOR_D;
  O.stepY = x => O.trenchFloor(x) + STEPH;

  // =================================================================
  //  Malhas
  // =================================================================
  let scene, terrainMat, roadMat, chunks = new Map(), buildQueue = [], treeGeos, treeMat;
  O.mats = null;

  function makeTerrainMaterial() {
    const tx = WW1.tex;
    const m = new THREE.MeshStandardMaterial({ map: tx.grass, normalMap: tx.mudN, normalScale: new THREE.Vector2(0.6, 0.6), vertexColors: true, roughness: 0.95, metalness: 0 });
    m.onBeforeCompile = sh => {
      sh.uniforms.mudMap = { value: tx.mud };
      sh.vertexShader = sh.vertexShader.replace('#include <common>', '#include <common>\nattribute float aMud;\nvarying float vMud;')
        .replace('#include <uv_vertex>', '#include <uv_vertex>\nvMud = aMud;');
      sh.fragmentShader = sh.fragmentShader.replace('#include <common>', '#include <common>\nuniform sampler2D mudMap;\nvarying float vMud;')
        .replace('#include <map_fragment>', `
          #ifdef USE_MAP
            vec4 gC = texture2D( map, vUv );
            vec4 mC = texture2D( mudMap, vUv * 1.3 );
            diffuseColor *= mix( gC, mC, clamp( vMud, 0.0, 1.0 ) );
          #endif`);
    };
    return m;
  }

  // Pedaço de terreno com nível de detalhe e "saias" para esconder as emendas
  const CH = 128;
  function buildChunk(ci, cj, lod) {
    const step = lod === 0 ? 2 : lod === 1 ? 4 : 8;
    const n = CH / step + 1;
    const x0 = ci * CH, z0 = cj * CH;
    const cnt = n * n + 4 * n;
    const pos = new Float32Array(cnt * 3), nor = new Float32Array(cnt * 3), uv = new Float32Array(cnt * 2), col = new Float32Array(cnt * 3), mud = new Float32Array(cnt);
    const hs = new Float32Array((n + 2) * (n + 2));
    for (let j = -1; j <= n; j++) for (let i = -1; i <= n; i++) hs[(j + 1) * (n + 2) + (i + 1)] = H(x0 + i * step, z0 + j * step);
    let k = 0;
    const put = (x, y, z, i, j) => {
      pos[k * 3] = x; pos[k * 3 + 1] = y; pos[k * 3 + 2] = z;
      const hl = hs[(j + 1) * (n + 2) + i], hr = hs[(j + 1) * (n + 2) + i + 2], hd = hs[j * (n + 2) + i + 1], hu = hs[(j + 2) * (n + 2) + i + 1];
      const nx = hl - hr, ny = 2 * step, nz = hd - hu, l = Math.hypot(nx, ny, nz);
      nor[k * 3] = nx / l; nor[k * 3 + 1] = ny / l; nor[k * 3 + 2] = nz / l;
      uv[k * 2] = x * 0.22; uv[k * 2 + 1] = z * 0.22;
      // cor: campos em retalhos, lama na frente, ruas nas cidades
      const f = frontness(x, z);
      const fr = Math.cos(0.35) * x - Math.sin(0.35) * z, fc = Math.sin(0.35) * x + Math.cos(0.35) * z;
      const field = hash(Math.floor(fr / 85), Math.floor(fc / 60), 51);
      let r = 1, g = 1, b = 1, m = 0;
      if (field < 0.25) { r = 1.25; g = 1.12; b = 0.55; }          // trigo
      else if (field < 0.38) { m = 0.75; r = 0.95; g = 0.9; b = 0.85; } // terra arada
      else if (field < 0.55) { r = 1.05; g = 1.05; b = 0.8; }       // pasto seco
      else { r = 0.92 + field * 0.1; g = 1.0; b = 0.9; }
      const [tm] = townMask(x, z);
      m = Math.max(m, tm * 0.55, S(0.15, 0.55, f) * 1.2);
      const rd = riverGrid.dist(x, z, 60);
      m = Math.max(m, S(40, 18, rd) * 0.6);
      const v = 0.93 + (WW1.vnoise(x * 0.04, z * 0.04, 9) - 0.5) * 0.3;
      const wet = y < 2 ? S(2, -2, y) * 0.25 : 0;
      col[k * 3] = r * v * (1 - wet); col[k * 3 + 1] = g * v * (1 - wet); col[k * 3 + 2] = b * v * (1 - wet * 0.8);
      mud[k] = Math.min(1, m);
      k++;
    };
    for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) put(x0 + i * step, hs[(j + 1) * (n + 2) + i + 1], z0 + j * step, i, j);
    const idx = [];
    for (let j = 0; j < n - 1; j++) for (let i = 0; i < n - 1; i++) {
      const a = j * n + i, b = a + 1, c = a + n, d = c + 1;
      idx.push(a, c, b, b, c, d);
    }
    // saias nas 4 bordas
    const skirt = (getIJ, flip) => {
      const start = k;
      for (let t = 0; t < n; t++) {
        const [i, j] = getIJ(t);
        put(x0 + i * step, hs[(j + 1) * (n + 2) + i + 1] - step * 0.6 - 0.5, z0 + j * step, i, j);
      }
      for (let t = 0; t < n - 1; t++) {
        const [i0, j0] = getIJ(t), [i1, j1] = getIJ(t + 1);
        const a = j0 * n + i0, b = j1 * n + i1, c = start + t, d = start + t + 1;
        if (flip) idx.push(a, b, c, b, d, c); else idx.push(a, c, b, b, c, d);
      }
    };
    skirt(t => [t, 0], false);
    skirt(t => [t, n - 1], true);
    skirt(t => [0, t], true);
    skirt(t => [n - 1, t], false);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    g.setAttribute('aMud', new THREE.BufferAttribute(mud, 1));
    g.setIndex(idx);
    g.computeBoundingSphere();
    const mesh = new THREE.Mesh(g, terrainMat);
    mesh.matrixAutoUpdate = false;
    mesh.receiveShadow = true;
    return mesh;
  }

  // Árvores do pedaço (instâncias)
  function buildTrees(ci, cj) {
    const x0 = ci * CH, z0 = cj * CH;
    const lists = { tree: [], poplar: [], dead: [] };
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
    const add = (type, x, z, s, yaw, tilt) => {
      const y = H(x, z) - 0.2;
      if (y < WATER + 0.3) return;
      q.setFromEuler(e.set(tilt || 0, yaw, (tilt || 0) * 0.7));
      lists[type].push(m4.clone().compose(new THREE.Vector3(x, y, z), q, new THREE.Vector3(s, s, s)));
    };
    const G = 9;
    for (let j = 0; j < CH / G; j++) for (let i = 0; i < CH / G; i++) {
      const gi = Math.floor(x0 / G) + i, gj = Math.floor(z0 / G) + j;
      const x = (gi + hash(gi, gj, 61)) * G, z = (gj + hash(gi, gj, 62)) * G;
      const f = frontness(x, z);
      const forest = WW1.vnoise(x * 0.0035 + 5, z * 0.0035 + 9, 63);
      const r = hash(gi, gj, 64);
      if (f > 0.35) { if (r < 0.012 * f) add('dead', x, z, 0.7 + r * 30, r * 60, (r - 0.006) * 20); continue; }
      if (townMask(x, z)[0] > 0.2 || roadGrid.dist(x, z, 20) < 9 || riverGrid.dist(x, z, 40) < 22) continue;
      const dens = forest > 0.62 ? 0.55 : forest > 0.55 ? 0.1 : 0.01;
      if (r < dens) add('tree', x, z, 0.8 + hash(gi, gj, 65) * 0.6, r * 40);
    }
    // álamos ao longo das estradas principais
    for (const rd of O.roads) {
      if (!rd.main) continue;
      for (let p = 0; p < rd.pts.length - 1; p++) {
        const a = rd.pts[p], b = rd.pts[p + 1];
        if (a[0] < x0 - 20 || a[0] > x0 + CH + 20 || a[1] < z0 - 20 || a[1] > z0 + CH + 20) continue;
        const dx = b[0] - a[0], dz = b[1] - a[1], l = Math.hypot(dx, dz), nx = -dz / l, nz = dx / l;
        for (const sgn of [-1, 1]) {
          const x = a[0] + nx * 7.5 * sgn, z = a[1] + nz * 7.5 * sgn;
          if (x < x0 || x >= x0 + CH || z < z0 || z >= z0 + CH) continue;
          if (townMask(x, z)[0] > 0.1) continue;
          const f = frontness(x, z);
          if (f > 0.35) { if (hash(p, sgn + 5, 66) < 0.3) add('dead', x, z, 0.9, p); }
          else add('poplar', x, z, 0.85 + hash(p, sgn + 5, 67) * 0.4, p);
        }
      }
    }
    const group = new THREE.Group();
    for (const type in lists) {
      const L = lists[type];
      if (!L.length) continue;
      const im = new THREE.InstancedMesh(treeGeos[type], treeMat, L.length);
      L.forEach((m, i) => {
        im.setMatrixAt(i, m);
        const t = 0.85 + hash(i, ci * 7 + cj, 68) * 0.3;
        im.setColorAt(i, new THREE.Color(t, t * (0.95 + hash(i, cj, 69) * 0.1), t * 0.9));
      });
      im.castShadow = false;
      group.add(im);
    }
    return group;
  }

  function makeTreeGeos() {
    const P = WW1.prim;
    const trunk = [0.32, 0.24, 0.17], leaf = [0.26, 0.36, 0.16], leaf2 = [0.32, 0.4, 0.18];
    const blob = new THREE.IcosahedronGeometry(1, 0);
    const t = new WW1.GeoBuilder(true);
    t.seg({ x: 0, y: 0, z: 0 }, { x: 0, y: 4.5, z: 0 }, 0.28, 0.18, trunk, 5);
    t.add(blob, WW1.trs(0, 6.2, 0, null, 3.2, 2.6, 3.2), leaf);
    t.add(blob, WW1.trs(1.4, 5.0, 0.6, null, 2.2, 1.8, 2.2), leaf2);
    t.add(blob, WW1.trs(-1.2, 5.4, -0.8, null, 2.3, 1.9, 2.3), leaf2);
    const pop = new WW1.GeoBuilder(true);
    pop.seg({ x: 0, y: 0, z: 0 }, { x: 0, y: 3, z: 0 }, 0.22, 0.17, trunk, 5);
    pop.add(blob, WW1.trs(0, 9, 0, null, 1.7, 7.5, 1.7), leaf);
    const d = new WW1.GeoBuilder(true);
    d.seg({ x: 0, y: 0, z: 0 }, { x: 0.2, y: 5.5, z: 0.1 }, 0.25, 0.12, [0.28, 0.25, 0.22], 6);
    d.seg({ x: 0.1, y: 3.5, z: 0 }, { x: 1.5, y: 4.8, z: 0.3 }, 0.08, 0.04, [0.28, 0.25, 0.22], 5);
    d.seg({ x: 0.15, y: 4.5, z: 0 }, { x: -1.0, y: 5.6, z: -0.4 }, 0.07, 0.03, [0.28, 0.25, 0.22], 5);
    treeGeos = { tree: t.build(), poplar: pop.build(), dead: d.build() };
    treeMat = new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.9, map: WW1.tex.cloth });
  }

  // ---------------- Estradas ----------------
  function buildRoads() {
    for (const rd of O.roads) {
      const w = rd.main ? 6.5 : 5;
      // divide em pedaços para o recorte por câmera funcionar
      for (let s = 0; s < rd.pts.length - 1; s += 20) {
        const pos = [], uv = [], idx = [];
        let vlen = 0;
        const end = Math.min(rd.pts.length - 1, s + 20);
        for (let i = s; i <= end; i++) {
          const p = rd.pts[i], q = rd.pts[Math.min(i + 1, rd.pts.length - 1)], o = rd.pts[Math.max(i - 1, 0)];
          const dx = q[0] - o[0], dz = q[1] - o[1], l = Math.hypot(dx, dz) || 1, nx = -dz / l, nz = dx / l;
          if (i > s) vlen += Math.hypot(p[0] - rd.pts[i - 1][0], p[1] - rd.pts[i - 1][1]);
          // subdivide no comprimento para seguir o relevo
          for (const sgn of [-1, 0, 1]) {
            const x = p[0] + nx * w / 2 * sgn, z = p[1] + nz * w / 2 * sgn;
            pos.push(x, Math.max(H(x, z), WATER + 0.4) + 0.07, z);
            uv.push((sgn + 1) / 2, vlen / w);
          }
        }
        for (let i = 0; i < end - s; i++) {
          const a = i * 3;
          idx.push(a, a + 1, a + 3, a + 1, a + 4, a + 3, a + 1, a + 2, a + 4, a + 2, a + 5, a + 4);
        }
        const g = new THREE.BufferGeometry();
        g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
        g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
        g.setIndex(idx);
        g.computeVertexNormals();
        g.computeBoundingSphere();
        const m = new THREE.Mesh(g, roadMat);
        m.matrixAutoUpdate = false;
        m.receiveShadow = true;
        scene.add(m);
      }
    }
  }

  // ---------------- Cidades ----------------
  const PLASTER = [[0.86, 0.82, 0.72], [0.8, 0.77, 0.7], [0.88, 0.85, 0.78], [0.72, 0.62, 0.5], [0.66, 0.42, 0.32], [0.78, 0.74, 0.66]];
  const ROOFS = [[0.62, 0.3, 0.2], [0.55, 0.27, 0.18], [0.33, 0.34, 0.37], [0.68, 0.38, 0.26]];
  const SHUTTERS = [[0.3, 0.42, 0.33], [0.32, 0.4, 0.52], [0.45, 0.32, 0.22], [0.75, 0.73, 0.66]];

  function roofGeo(w, d, h) {
    // prisma do telhado (cumeeira ao longo de w), com beiral
    const W2 = w / 2 + 0.35, D2 = d / 2 + 0.45;
    const v = [
      -W2, 0, -D2, W2, 0, -D2, W2, h, 0, -W2, h, 0,   // água de trás
      -W2, 0, D2, -W2, h, 0, W2, h, 0, W2, 0, D2,     // água da frente
      -W2 + 0.35, 0, -D2 + 0.45, -W2 + 0.35, h, 0, -W2 + 0.35, 0, D2 - 0.45, // oitão esquerdo
      W2 - 0.35, 0, -D2 + 0.45, W2 - 0.35, 0, D2 - 0.45, W2 - 0.35, h, 0,   // oitão direito
    ];
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([0, 0, w / 2, 0, w / 2, 2, 0, 2, 0, 0, 0, 2, w / 2, 2, w / 2, 0, 0, 0, 0.5, 1, 1, 0, 0, 0, 1, 0, 0.5, 1], 2));
    g.setIndex([0, 2, 1, 0, 3, 2, 4, 6, 5, 4, 7, 6, 8, 9, 10, 11, 12, 13]);
    g.computeVertexNormals();
    return g;
  }

  function buildTown(t) {
    const R = WW1.RNG(Math.round(t.x * 7 + t.z * 13));
    const walls = new WW1.GeoBuilder(true), roofs = new WW1.GeoBuilder(true);
    const ruin = t.side === 'ruin', dmg = t.damaged ? 0.4 : ruin ? 1 : 0.04;
    // direção principal: primeira estrada que passa pela cidade
    const rd = O.roads.find(r => r.a === t.name || r.b === t.name);
    let ang = 0;
    if (rd) { const o = rd.a === t.name ? T(rd.b) : T(rd.a); ang = Math.atan2(o.x - t.x, o.z - t.z); }
    const ca = Math.cos(ang), sa = Math.sin(ang);
    const toW = (u, v) => [t.x + u * sa + v * ca, t.z + u * ca - v * sa]; // u: ao longo da rua, v: lateral
    const streets = [{ u0: -t.r, u1: t.r, v: 0, along: true }, { u0: -t.r * 0.7, u1: t.r * 0.7, v: 0, along: false }];
    if (t.r > 120) streets.push({ u0: -t.r * 0.8, u1: t.r * 0.8, v: 48, along: true }, { u0: -t.r * 0.8, u1: t.r * 0.8, v: -48, along: true });
    const placed = [];
    const house = (cx, cz, yaw, w, d, floors, ruined) => {
      if (placed.some(p => Math.hypot(p[0] - cx, p[1] - cz) < (p[2] + Math.max(w, d)) * 0.55)) return;
      if (H(cx, cz) < WATER + 1 || Math.abs(cz - frontZ(cx)) < 95 && !ruin) return;
      if (riverGrid.dist(cx, cz, 30) < 18) return;
      placed.push([cx, cz, Math.max(w, d)]);
      const y = H(cx, cz) - 0.3;
      const hgt = floors * 3.1 + 0.6;
      const wc = PLASTER[R.int(PLASTER.length)], rc = ROOFS[R.int(ROOFS.length)], sc = SHUTTERS[R.int(SHUTTERS.length)];
      const deg = yaw * 180 / Math.PI;
      const q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), yaw);
      const L = (lx, ly, lz) => { const v = new THREE.Vector3(lx, ly, lz).applyQuaternion(q); return [cx + v.x, y + ly, cz + v.z]; };
      const wc2 = ruined ? wc.map(c => c * 0.75) : wc;
      if (!ruined) {
        walls.box(cx, y + hgt / 2, cz, w, hgt, d, [0, deg, 0], wc2, 0.25);
        const rg = roofGeo(w, d, Math.min(w, d) * 0.45 + 1);
        const p0 = L(0, hgt, 0);
        roofs.add(rg, WW1.trs(p0[0], p0[1], p0[2], [0, deg, 0], 1), rc);
        // chaminé
        const ch = L(w * 0.3, hgt + 1.6, 0);
        walls.box(ch[0], ch[1], ch[2], 0.6, 2.4, 0.6, [0, deg, 0], [0.55, 0.32, 0.24]);
      } else {
        // paredes quebradas, sem telhado
        const segs = [[0, -d / 2, w, 0.4], [0, d / 2, w, 0.4], [-w / 2, 0, 0.4, d], [w / 2, 0, 0.4, d]];
        for (const [lx, lz, sw, sd] of segs) {
          const parts = 3;
          for (let pI = 0; pI < parts; pI++) {
            const hh = hgt * (0.15 + R() * 0.85) * (R() < 0.25 ? 0.2 : 1);
            const ox = sw > 1 ? (pI - 1) * sw / 3 : 0, oz = sd > 1 ? (pI - 1) * sd / 3 : 0;
            const p = L(lx + ox, hh / 2, lz + oz);
            walls.box(p[0], p[1], p[2], sw > 1 ? sw / 3 : sw, hh, sd > 1 ? sd / 3 : sd, [0, deg, 0], wc2, 0.25);
          }
        }
        for (let i = 0; i < 6; i++) {
          const p = L((R() - 0.5) * w, 0.3, (R() - 0.5) * d);
          walls.box(p[0], p[1], p[2], 1 + R() * 2, 0.4 + R() * 0.8, 1 + R() * 2, [R() * 30, R() * 180, R() * 30], [0.55, 0.5, 0.44]);
        }
      }
      // janelas com venezianas e porta (fachada da frente e de trás)
      if (!ruined) for (const side of [1, -1]) {
        const nWin = Math.max(1, Math.floor(w / 2.6));
        for (let f = 0; f < floors; f++) for (let i = 0; i < nWin; i++) {
          const lx = -w / 2 + (i + 0.5) * w / nWin;
          if (f === 0 && side === 1 && i === Math.floor(nWin / 2)) {
            const p = L(lx, 1.15, side * (d / 2 + 0.03));
            walls.box(p[0], p[1], p[2], 1.1, 2.3, 0.08, [0, deg, 0], [0.32, 0.22, 0.14]);
            continue;
          }
          const p = L(lx, f * 3.1 + 1.7, side * (d / 2 + 0.03));
          walls.box(p[0], p[1], p[2], 0.95, 1.35, 0.06, [0, deg, 0], [0.08, 0.09, 0.1]);
          for (const sx of [-1, 1]) {
            const s = L(lx + sx * 0.72, f * 3.1 + 1.7, side * (d / 2 + 0.06));
            walls.box(s[0], s[1], s[2], 0.45, 1.4, 0.04, [0, deg + sx * 10, 0], sc);
          }
        }
      }
      addSolid({ x: cx, z: cz, hw: w / 2, hd: d / 2, c: Math.cos(-yaw), s: Math.sin(-yaw), top: y + (ruined ? hgt * 0.5 : hgt + Math.min(w, d) * 0.45) });
    };
    // igreja na praça
    const [chx, chz] = toW(0, 30);
    const churchRuin = ruin || (t.damaged && R() < 0.6);
    const cy = H(chx, chz) - 0.3, deg = ang * 180 / Math.PI;
    const stone = [0.7, 0.68, 0.62];
    if (!churchRuin) {
      walls.box(chx, cy + 5, chz, 10, 10, 22, [0, deg, 0], stone, 0.2);
      roofs.add(roofGeo(22, 10, 5), WW1.trs(chx, cy + 10, chz, [0, deg + 90, 0], 1), [0.33, 0.34, 0.37]);
      const [tx, tz] = toW(13, 30);
      walls.box(tx, cy + 11, tz, 5, 22, 5, [0, deg, 0], stone, 0.2);
      roofs.add(new THREE.ConeGeometry(3.6, 9, 4), WW1.trs(tx, cy + 26.5, tz, [0, deg + 45, 0], 1), [0.3, 0.32, 0.35]);
      addSolid({ x: chx, z: chz, hw: 5.5, hd: 13.5, c: Math.cos(-ang), s: Math.sin(-ang), top: cy + 15 });
      addSolid({ x: tx, z: tz, hw: 2.6, hd: 2.6, c: Math.cos(-ang), s: Math.sin(-ang), top: cy + 31 });
    } else {
      for (let i = 0; i < 8; i++) {
        const [px, pz] = toW(-8 + R() * 16, 30 + (R() - 0.5) * 10);
        walls.box(px, cy + 2 + R() * 3, pz, 1, 4 + R() * 6, 3 + R() * 4, [0, deg + R() * 20, 0], stone.map(c => c * 0.8));
      }
      addSolid({ x: chx, z: chz, hw: 5, hd: 11, c: Math.cos(-ang), s: Math.sin(-ang), top: cy + 3 });
    }
    t.square = toW(0, -10);
    t.church = [chx, chz];
    t.ang = ang;
    t.toW = toW;
    // casas ao longo das ruas
    for (const st of streets) {
      for (let u = st.u0 + 8; u < st.u1 - 6;) {
        const w = 7 + R() * 5, d = 6.5 + R() * 3.5;
        for (const side of [-1, 1]) {
          const off = 6.5 + d / 2;
          let uu = u, vv = st.v + side * off;
          if (!st.along) { uu = st.v + side * off; vv = u; }
          if (Math.hypot(uu, vv) < 24 || Math.hypot(uu - 0, vv - 30) < 16) continue;
          if (Math.hypot(uu, vv) > t.r) continue;
          const [hx, hz] = toW(uu, vv);
          let yaw = ang + (st.along ? (side > 0 ? -Math.PI / 2 : Math.PI / 2) : (side > 0 ? Math.PI : 0));
          if (R() < 0.15) continue;
          house(hx, hz, yaw, w, d, R() < 0.35 ? 2 : 1, R() < dmg);
        }
        u += w + 1.5 + R() * 3;
      }
    }
    const mw = new THREE.Mesh(walls.build(), new THREE.MeshStandardMaterial({ vertexColors: true, map: WW1.tex.plaster, roughness: 0.92 }));
    const mr = new THREE.Mesh(roofs.build(), new THREE.MeshStandardMaterial({ vertexColors: true, map: WW1.tex.tiles, roughness: 0.8, side: THREE.DoubleSide }));
    const grp = new THREE.Group();
    for (const m of [mw, mr]) { m.matrixAutoUpdate = false; m.castShadow = m.receiveShadow = true; grp.add(m); }
    // bandeira no QG
    if (t.hq || t.side === 'german') {
      const [fx, fz] = toW(-6, -14);
      const fy = H(fx, fz);
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 9, 6), new THREE.MeshStandardMaterial({ color: 0xdddddd }));
      pole.position.set(fx, fy + 4.5, fz);
      const flag = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 1.4, 8, 1), new THREE.MeshStandardMaterial({ map: t.side === 'german' ? WW1.tex.flagDE : WW1.tex.flag, side: THREE.DoubleSide, roughness: 0.9 }));
      flag.position.set(fx + 1.35, fy + 8.1, fz);
      grp.add(pole, flag);
      O.flags.push(flag);
      t.flagPos = [fx, fy, fz];
    }
    scene.add(grp);
    t.group = grp;
  }
  O.flags = [];

  // ---------------- Construção inicial e atualização ----------------
  O.build = function (sc) {
    scene = sc;
    O.flags = [];
    buildLayout();
    terrainMat = makeTerrainMaterial();
    roadMat = new THREE.MeshStandardMaterial({ map: WW1.tex.road, roughness: 0.95, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
    O.mats = {
      bag: new THREE.MeshStandardMaterial({ map: WW1.tex.burlap, roughness: 0.97 }),
      wood: new THREE.MeshStandardMaterial({ map: WW1.tex.wood, roughness: 0.9 }),
      metal: new THREE.MeshStandardMaterial({ map: WW1.tex.metal, color: 0xbdbdb8, roughness: 0.55, metalness: 0.55 }),
    };
    API.mats = O.mats;
    makeTreeGeos();
    buildRoads();
    for (const t of O.towns) buildTown(t);
    // água do rio
    const water = new THREE.Mesh(new THREE.PlaneGeometry(1600, 1600), new THREE.MeshStandardMaterial({ color: 0x2c3330, roughness: 0.08, metalness: 0.3 }));
    water.rotation.x = -Math.PI / 2;
    water.position.y = WATER;
    scene.add(water);
    O.water = water;
    O.trenchMeshes = new Map();
  };

  // Trincheira visível (sacos, degraus, estacas, arame) de um setor de 128 m
  function buildTrenchChunk(ci) {
    const x0 = ci * CH, x1 = x0 + CH;
    const bags = [], wood = new WW1.GeoBuilder(false);
    const wire = [];
    for (const kind of ['allied', 'german']) {
      const tz = kind === 'allied' ? alliedZ : germanZ, frontSign = kind === 'allied' ? 1 : -1;
      for (let x = x0; x < x1; x += 0.62) {
        const zc = tz(x), dz = (tz(x + 0.25) - tz(x - 0.25)) / 0.5, yaw = Math.atan2(1, dz) * 180 / Math.PI;
        for (const s of [-1, 1]) {
          const rows = s === frontSign ? 1 : 2, z = zc + s * (HALFW + 0.75), y = H(x, z);
          for (let r = 0; r < rows; r++) bags.push(WW1.trs(x + (r % 2) * 0.31, y + 0.1 + r * 0.2, z, [0, yaw + (hash(Math.round(x * 10), r, 3) - 0.5) * 16, 0], 0.36, 0.24, 0.62));
        }
      }
      const floor = x => O.trenchFloor(x);
      for (let x = x0; x < x1; x += 1.8) {
        const xm = x + 0.9, zc = tz(xm), dz = (tz(xm + 0.25) - tz(xm - 0.25)) / 0.5, yaw = Math.atan2(1, dz) * 180 / Math.PI;
        for (const s of [-1, 1]) {
          if (kind === 'allied' && s !== frontSign) continue;
          wood.box(xm, floor(xm) + STEPH / 2, zc + s * STEPOFF, 0.6, STEPH, 1.85, [0, yaw, 0]);
        }
        wood.box(xm, floor(xm) + 0.06, zc, 0.7, 0.05, 1.8, [0, yaw + 90, 0]);
        for (const s of [-1, 1]) {
          const a = { x: xm, y: floor(xm), z: zc + s * (HALFW + 0.12) };
          wood.cyl(a, { x: xm, y: a.y + 1.75, z: a.z + s * 0.22 }, 0.045);
        }
      }
      // arame farpado
      for (const ro of kind === 'allied' ? [9, 10.8, 12.5] : [-9.5, -11.8, -14]) {
        let prev = null;
        for (let x = x0; x <= x1; x += 0.6) {
          if (!API.inWire(x, tz(x) + ro)) { prev = null; continue; }
          const z = tz(x) + ro + Math.sin(x * 1.7) * 0.35, y = H(x, z) + 0.25 + Math.abs(Math.sin(x * 1.3 + ro)) * 0.75;
          if (prev) wire.push(...prev, x, y, z);
          prev = [x, y, z];
          if (((x % 2.7) + 2.7) % 2.7 < 0.6 && ro !== 10.8 && ro !== -11.8) wood.cyl({ x, y: H(x, z) - 0.2, z }, { x: x + 0.1, y: H(x, z) + 1.2, z }, 0.035);
        }
      }
    }
    const grp = new THREE.Group();
    const inst = new THREE.InstancedMesh(WW1.prim.lowSph(), O.mats.bag, bags.length);
    bags.forEach((m, i) => inst.setMatrixAt(i, m));
    grp.add(inst);
    grp.add(wood.mesh(O.mats.wood, false, true));
    const wg = new THREE.BufferGeometry();
    wg.setAttribute('position', new THREE.Float32BufferAttribute(wire, 3));
    grp.add(new THREE.LineSegments(wg, new THREE.LineBasicMaterial({ color: 0x1c1a17 })));
    return grp;
  }

  // Carrega e descarrega pedaços conforme a câmera anda
  O.update = function (cam, dt, budget) {
    const cx = cam.position.x, cz = cam.position.z;
    const R0 = 180, R1 = 380, R2 = 560;
    const ci0 = Math.floor((cx - R2) / CH), ci1 = Math.floor((cx + R2) / CH);
    const cj0 = Math.floor((cz - R2) / CH), cj1 = Math.floor((cz + R2) / CH);
    const want = [];
    for (let i = ci0; i <= ci1; i++) for (let j = cj0; j <= cj1; j++) {
      const mx = (i + 0.5) * CH, mz = (j + 0.5) * CH, d = Math.hypot(mx - cx, mz - cz) - CH * 0.7;
      if (d > R2 || mx < MINX - 400 || mx > MAXX + 400 || mz < MINZ - 400 || mz > MAXZ + 400) continue;
      const lod = d < R0 ? 0 : d < R1 ? 1 : 2;
      want.push({ i, j, lod, d });
    }
    want.sort((a, b) => a.d - b.d);
    const keep = new Set();
    let built = 0;
    for (const w of want) {
      const key = w.i + ',' + w.j;
      keep.add(key);
      let c = chunks.get(key);
      if (c && c.lod === w.lod) continue;
      if (built >= (budget || 2)) continue;
      const mesh = buildChunk(w.i, w.j, w.lod);
      scene.add(mesh);
      if (c) { scene.remove(c.mesh); c.mesh.geometry.dispose(); }
      else c = { trees: null };
      c.mesh = mesh; c.lod = w.lod;
      chunks.set(key, c);
      built++;
    }
    for (const [key, c] of chunks) {
      if (keep.has(key)) {
        const [i, j] = key.split(',').map(Number);
        const d = Math.hypot((i + 0.5) * CH - cx, (j + 0.5) * CH - cz);
        if (d < 380 && !c.trees && built < 3) { c.trees = buildTrees(i, j); scene.add(c.trees); built++; }
        if (d > 440 && c.trees) { scene.remove(c.trees); c.trees.children.forEach(m => m.dispose && m.dispose()); c.trees = null; }
        continue;
      }
      scene.remove(c.mesh); c.mesh.geometry.dispose();
      if (c.trees) { scene.remove(c.trees); c.trees.children.forEach(m => m.dispose && m.dispose()); }
      chunks.delete(key);
    }
    // trincheiras detalhadas só perto da câmera
    if (Math.abs(cz - frontZ(cx)) < 500) {
      for (let i = Math.floor((cx - 260) / CH); i <= Math.floor((cx + 260) / CH); i++) {
        if (!O.trenchMeshes.has(i) && built < 3) { const g = buildTrenchChunk(i); scene.add(g); O.trenchMeshes.set(i, g); built++; }
      }
    }
    for (const [i, g] of O.trenchMeshes) {
      if (Math.abs((i + 0.5) * CH - cx) > 420 || Math.abs(cz - frontZ(cx)) > 600) {
        scene.remove(g);
        g.traverse(o => { if (o.geometry && o.geometry !== WW1.prim.lowSph()) o.geometry.dispose(); });
        O.trenchMeshes.delete(i);
      }
    }
    for (const t of O.towns) if (t.group) t.group.visible = Math.hypot(t.x - cx, t.z - cz) < t.r + 700;
    O.water.position.x = Math.round(cx / 50) * 50; O.water.position.z = Math.round(cz / 50) * 50;
    // bandeiras tremulando
    const tm = performance.now() / 1000;
    for (const f of O.flags) f.rotation.y = Math.sin(tm * 1.7 + f.position.x) * 0.25;
    return built;
  };
  O.pendingChunks = cam => {
    let n = 0;
    for (const c of chunks.values()) if (!c.mesh) n++;
    return n;
  };
  O.chunkCount = () => chunks.size;

  // Ativa o mundo aberto como "mundo" do jogo
  O.activate = function () { Object.assign(WW1.world, API); };
})();
