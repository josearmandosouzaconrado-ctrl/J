'use strict';
// Terra de ninguém: relevo, trincheiras em zigue-zague, crateras, arame farpado, tanque e destroços.
(function () {
  const W = WW1.world = {};
  const MINX = W.MINX = -64, MAXX = W.MAXX = 64, MINZ = W.MINZ = -34, MAXZ = W.MAXZ = 270;
  const PT = W.PLAYER_TRENCH = 0, ET = W.ENEMY_TRENCH = 150;
  const HALFW = W.HALFW = 1.3, FLOOR = W.FLOOR = -1.55, STEPH = W.STEPH = 0.7, STEPOFF = W.STEPOFF = 1.0;
  W.STEPY = FLOOR + STEPH;
  const RAMPS = W.RAMPS = [-36, -12, 12, 36];
  const G = 0.4;
  const NX = Math.round((MAXX - MINX) / G) + 1, NZ = Math.round((MAXZ - MINZ) / G) + 1;
  let Hg, Sg;
  W.craters = []; W.wires = []; W.ammoCrates = []; W.objectiveCrater = null; W.mgPos = null; W.tank = null;
  const S = WW1.smooth;

  W.zig = x => { const p = 16, f = x / p - Math.floor(x / p); return Math.abs(f - 0.5) * 4 - 1; };
  W.trenchZ = (x, base) => base + W.zig(x + base * 0.37);
  W.tangent = (x, base) => { const dz = (W.trenchZ(x + 0.25, base) - W.trenchZ(x - 0.25, base)) / 0.5; const l = Math.hypot(1, dz); return { x: 1 / l, z: dz / l }; };
  W.nearRamp = (x, w) => RAMPS.some(r => Math.abs(x - r) < w);
  const bump = (x, c, w) => { const d = (x - c) / w; return Math.exp(-d * d); };

  function base(x, z) {
    return WW1.noise2(x * 0.021 + 31.7, z * 0.021 + 11.3, 1) * 1.3 + WW1.noise2(x * 0.09 + 5.1, z * 0.09 + 91.7, 2) * 0.35 + WW1.noise2(x * 0.35, z * 0.35, 3) * 0.08;
  }

  function cut(h, d, x, ramps) {
    const ad = Math.abs(d);
    let c = 1 - S(HALFW, HALFW + 0.55, ad);
    if (ramps && d > 0) {
      for (const r of RAMPS) {
        const dx = Math.abs(x - r);
        if (dx > 1.2) continue;
        const t = WW1.clamp01(1 - (d - HALFW) / 5.5);
        c = Math.max(c, t * (1 - S(0.7, 1.2, dx)));
      }
    }
    return h + (FLOOR - h) * c;
  }

  // ---------- Layout com semente ----------
  function layout() {
    const rng = WW1.RNG(1916);
    const list = [{ x: -3, z: 70, r: 6.5, depth: 1.9 }];
    const addCraters = (count, z0, z1) => {
      let tries = 0;
      while (count > 0 && tries++ < 4000) {
        const x = rng.range(MINX + 6, MAXX - 6), z = rng.range(z0, z1);
        const r = 1.8 + rng() * rng() * 4.5;
        if (Math.abs(z - W.trenchZ(x, PT)) < r + 8 || Math.abs(z - W.trenchZ(x, ET)) < r + 8) continue;
        if (list.some(c => (c.x - x) ** 2 + (c.z - z) ** 2 < (c.r + r) ** 2 * 0.55)) continue;
        list.push({ x, z, r, depth: r * (0.28 + 0.1 * rng()) });
        count--;
      }
    };
    addCraters(80, 12, 138);
    addCraters(26, 162, 262);
    addCraters(6, -30, -9);
    W.craters = list;
    W.wires = [
      { base: PT, o0: 9, o1: 12.5, gaps: [-30, -6, 8, 28], gapW: 4 },
      { base: ET, o0: -14, o1: -9.5, gaps: [-22, -4, 15, 33], gapW: 5 },
    ];
  }

  // ---------- Grades de altura (chão e "sólido" com degraus, sacos e tanque) ----------
  function buildGrids() {
    Hg = new Float32Array(NX * NZ);
    for (let j = 0; j < NZ; j++) {
      const z = MINZ + j * G;
      for (let i = 0; i < NX; i++) {
        const x = MINX + i * G;
        const dp = Math.abs(z - W.trenchZ(x, PT)), de = Math.abs(z - W.trenchZ(x, ET));
        let h = base(x, z) * WW1.lerp(0.2, 1, S(3, 10, Math.min(dp, de)));
        h += 0.28 * bump(dp, 2.3, 0.75) + 0.28 * bump(de, 2.3, 0.75);
        Hg[j * NX + i] = h;
      }
    }
    for (const c of W.craters) {
      const rr = c.r * 1.7;
      const i0 = Math.max(0, Math.floor((c.x - rr - MINX) / G)), i1 = Math.min(NX - 1, Math.ceil((c.x + rr - MINX) / G));
      const j0 = Math.max(0, Math.floor((c.z - rr - MINZ) / G)), j1 = Math.min(NZ - 1, Math.ceil((c.z + rr - MINZ) / G));
      for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
        const dx = MINX + i * G - c.x, dz = MINZ + j * G - c.z, d2 = dx * dx + dz * dz;
        if (d2 > rr * rr) continue;
        const d = Math.sqrt(d2) / c.r;
        let h = 0;
        if (d < 1) h -= c.depth * (1 - d * d);
        h += c.depth * 0.28 * Math.exp(-(d - 1) * (d - 1) / 0.08);
        Hg[j * NX + i] += h;
      }
    }
    for (let j = 0; j < NZ; j++) {
      const z = MINZ + j * G;
      for (let i = 0; i < NX; i++) {
        const x = MINX + i * G, k = j * NX + i;
        let h = cut(Hg[k], z - W.trenchZ(x, PT), x, true);
        h = cut(h, z - W.trenchZ(x, ET), x, false);
        const edge = Math.min(x - MINX, MAXX - x, z - MINZ, MAXZ - z);
        Hg[k] = h * S(0, 8, edge);
      }
    }
    W.objectiveCrater = { x: -3, y: W.H(-3, 70), z: 70 };

    // Sólido: chão + degraus de tiro + sacos de areia + tanque
    Sg = new Float32Array(Hg);
    for (let j = 0; j < NZ; j++) {
      const z = MINZ + j * G;
      for (let i = 0; i < NX; i++) {
        const x = MINX + i * G, k = j * NX + i;
        if (x < MINX + 7 || x > MAXX - 7) continue;
        for (let t = 0; t < 2; t++) {
          const bz = t === 0 ? PT : ET, front = t === 0 ? 1 : -1;
          const d = z - W.trenchZ(x, bz), ad = Math.abs(d), side = d >= 0 ? 1 : -1;
          if (ad > 3) continue;
          const isFront = side === front;
          if (ad > STEPOFF - 0.3 && ad < HALFW && (t === 1 || isFront) && !(t === 0 && W.nearRamp(x, 2)))
            Sg[k] = Math.max(Sg[k], FLOOR + STEPH);
          if (ad > HALFW + 0.5 && ad < HALFW + 1.0 && !(t === 0 && isFront && W.nearRamp(x, 1.6))) {
            const rows = isFront ? 1 : 2;
            Sg[k] = Math.max(Sg[k], Hg[k] + 0.12 + rows * 0.2);
          }
        }
      }
    }
  }

  function sample(A, x, z) {
    let fx = (x - MINX) / G, fz = (z - MINZ) / G;
    fx = WW1.clamp(fx, 0, NX - 1.001); fz = WW1.clamp(fz, 0, NZ - 1.001);
    const i = Math.floor(fx), j = Math.floor(fz), tx = fx - i, tz = fz - j, k = j * NX + i;
    const a = A[k], b = A[k + 1], c = A[k + NX], d = A[k + NX + 1];
    return (a + (b - a) * tx) * (1 - tz) + (c + (d - c) * tx) * tz;
  }
  W.H = (x, z) => sample(Hg, x, z);
  W.S = (x, z) => sample(Sg, x, z);

  function stamp(x0, x1, z0, z1, fn) {
    const i0 = Math.max(0, Math.floor((x0 - MINX) / G)), i1 = Math.min(NX - 1, Math.ceil((x1 - MINX) / G));
    const j0 = Math.max(0, Math.floor((z0 - MINZ) / G)), j1 = Math.min(NZ - 1, Math.ceil((z1 - MINZ) / G));
    for (let j = j0; j <= j1; j++) for (let i = i0; i <= i1; i++) {
      const k = j * NX + i, v = fn(MINX + i * G, MINZ + j * G, Hg[k]);
      if (v !== null && v > Sg[k]) Sg[k] = v;
    }
  }
  W.stamp = stamp;

  // Linha de visão: retorna true se nada sólido bloqueia.
  W.los = function (ax, ay, az, bx, by, bz) {
    const dx = bx - ax, dy = by - ay, dz = bz - az, len = Math.hypot(dx, dy, dz);
    const n = Math.ceil(len / 0.35);
    for (let s = 1; s < n; s++) {
      const t = s / n;
      if (t * len < 0.4 || (1 - t) * len < 0.4) continue;
      const x = ax + dx * t, z = az + dz * t;
      if (ay + dy * t < W.S(x, z) - 0.03) return false;
    }
    return true;
  };

  // Ponto onde um raio encontra o chão/obstáculo (ou null)
  W.rayHit = function (o, d, maxDist) {
    let prev = 0;
    for (let t = 0.3; t <= maxDist; t += 0.3) {
      const x = o.x + d.x * t, y = o.y + d.y * t, z = o.z + d.z * t;
      if (y < W.S(x, z)) {
        // refina
        let a = prev, b = t;
        for (let k = 0; k < 6; k++) {
          const m = (a + b) / 2;
          if (o.y + d.y * m < W.S(o.x + d.x * m, o.z + d.z * m)) b = m; else a = m;
        }
        return { dist: b, x: o.x + d.x * b, y: o.y + d.y * b, z: o.z + d.z * b };
      }
      prev = t;
    }
    return null;
  };

  W.inTrench = function (p) {
    if (Math.abs(p.z - W.trenchZ(p.x, PT)) < HALFW + 0.3 && p.y < FLOOR + 1) return PT;
    if (Math.abs(p.z - W.trenchZ(p.x, ET)) < HALFW + 0.3 && p.y < FLOOR + 1) return ET;
    return null;
  };

  W.inWire = function (x, z) {
    for (const w of W.wires) {
      const rel = z - W.trenchZ(x, w.base);
      if (rel < Math.min(w.o0, w.o1) || rel > Math.max(w.o0, w.o1)) continue;
      if (!w.gaps.some(g => Math.abs(x - g) < w.gapW / 2)) return true;
    }
    return false;
  };

  // =============== Construção visual ===============
  W.build = function (scene, quality) {
    layout();
    buildGrids();
    const tex = WW1.tex;
    const R = WW1.RNG(1914);
    const mats = W.mats = {
      mud: new THREE.MeshStandardMaterial({ map: tex.mud, normalMap: tex.mudN, color: 0xb3aa9c, vertexColors: true, roughness: 0.93, metalness: 0 }),
      wood: new THREE.MeshStandardMaterial({ map: tex.wood, roughness: 0.9 }),
      deadWood: new THREE.MeshStandardMaterial({ map: tex.wood, color: 0x8c8073, roughness: 0.95 }),
      bag: new THREE.MeshStandardMaterial({ map: tex.burlap, roughness: 0.97 }),
      metal: new THREE.MeshStandardMaterial({ map: tex.metal, color: 0xbdbdb8, roughness: 0.55, metalness: 0.55 }),
      rust: new THREE.MeshStandardMaterial({ map: tex.metal, color: 0xd9b399, roughness: 0.8, metalness: 0.25 }),
      water: new THREE.MeshStandardMaterial({ color: 0x23251f, roughness: 0.06, metalness: 0.2 }),
      crate: new THREE.MeshStandardMaterial({ map: tex.wood, color: 0x8c9973, roughness: 0.85 }),
    };
    tex.mud.repeat.set(1, 1);

    buildTerrain(scene, mats);
    buildOuter(scene, mats);
    buildWater(scene, mats, R);
    buildTrench(scene, mats, PT, 1, true, R);
    buildTrench(scene, mats, ET, -1, false, R);
    buildWire(scene, mats, R);
    buildTrees(scene, mats, R);
    buildTank(scene, mats, 17, 97);
    buildDebris(scene, mats, R);
    buildCrates(scene, mats);
  };

  function buildTerrain(scene, mats) {
    const step = 2; // usa 1 a cada 2 amostras da grade (0,8 m)
    const nx = Math.floor((NX - 1) / step) + 1, nz = Math.floor((NZ - 1) / step) + 1;
    const chunks = 4, rows = Math.ceil((nz - 1) / chunks);
    for (let c = 0; c < chunks; c++) {
      const j0 = c * rows, j1 = Math.min(nz - 1, j0 + rows);
      if (j0 >= j1) break;
      const cnt = nx * (j1 - j0 + 1);
      const pos = new Float32Array(cnt * 3), nor = new Float32Array(cnt * 3), uv = new Float32Array(cnt * 2), col = new Float32Array(cnt * 3);
      let k = 0;
      for (let j = j0; j <= j1; j++) {
        for (let i = 0; i < nx; i++, k++) {
          const gi = i * step, gj = j * step;
          const x = MINX + gi * G, z = MINZ + gj * G, h = Hg[gj * NX + gi];
          pos[k * 3] = x; pos[k * 3 + 1] = h; pos[k * 3 + 2] = z;
          const hl = Hg[gj * NX + Math.max(0, gi - step)], hr = Hg[gj * NX + Math.min(NX - 1, gi + step)];
          const hd = Hg[Math.max(0, gj - step) * NX + gi], hu = Hg[Math.min(NZ - 1, gj + step) * NX + gi];
          const nxv = hl - hr, nyv = 2 * G * step, nzv = hd - hu, l = Math.hypot(nxv, nyv, nzv);
          nor[k * 3] = nxv / l; nor[k * 3 + 1] = nyv / l; nor[k * 3 + 2] = nzv / l;
          uv[k * 2] = x * 0.22; uv[k * 2 + 1] = z * 0.22;
          // Lugares baixos ficam mais escuros e molhados; variação de cor em grandes manchas
          const wet = S(-0.2, -1.6, h);
          const v = 0.92 + WW1.noise2(x * 0.05, z * 0.05, 9) * 0.25;
          const shade = v * (1 - 0.35 * wet);
          col[k * 3] = shade * (1 - 0.05 * wet); col[k * 3 + 1] = shade; col[k * 3 + 2] = shade * (1 + 0.04 * wet);
        }
      }
      const idx = [];
      for (let j = 0; j < j1 - j0; j++) for (let i = 0; i < nx - 1; i++) {
        const a = j * nx + i, b = a + 1, cc = a + nx, d = cc + 1;
        idx.push(a, cc, b, b, cc, d);
      }
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      g.setAttribute('color', new THREE.BufferAttribute(col, 3));
      g.setIndex(idx);
      g.computeBoundingSphere();
      const m = new THREE.Mesh(g, mats.mud);
      m.receiveShadow = true;
      m.castShadow = false;
      m.matrixAutoUpdate = false;
      scene.add(m);
    }
  }

  function buildOuter(scene, mats) {
    const b = new WW1.GeoBuilder(true);
    const far = 700, quads = [[-far, MINX, -far, far], [MAXX, far, -far, far], [MINX, MAXX, -far, MINZ], [MINX, MAXX, MAXZ, far]];
    for (const [x0, x1, z0, z1] of quads) {
      for (let x = x0; x < x1; x += 50) for (let z = z0; z < z1; z += 50) {
        const xa = x, xb = Math.min(x + 50, x1), za = z, zb = Math.min(z + 50, z1);
        b.add(planeGeo(xa, xb, za, zb), new THREE.Matrix4(), [0.96, 0.96, 0.96]);
      }
    }
    const m = b.mesh(mats.mud, false, true);
    scene.add(m);
  }

  function planeGeo(xa, xb, za, zb) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute([xa, -0.01, za, xb, -0.01, za, xa, -0.01, zb, xb, -0.01, zb], 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute([0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0], 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute([xa * 0.22, za * 0.22, xb * 0.22, za * 0.22, xa * 0.22, zb * 0.22, xb * 0.22, zb * 0.22], 2));
    g.setIndex([0, 2, 1, 1, 2, 3]);
    return g;
  }

  function buildWater(scene, mats, R) {
    const b = new WW1.GeoBuilder(false);
    const circle = new THREE.CircleGeometry(0.5, 20);
    circle.rotateX(-Math.PI / 2);
    for (const c of W.craters) {
      if (c.r < 3 || R() > 0.4) continue;
      const y = W.H(c.x, c.z) + c.depth * 0.32;
      b.add(circle, WW1.trs(c.x, y, c.z, [0, R() * 360, 0], c.r * 1.3, 1, c.r * 1.3));
    }
    const m = b.mesh(mats.water, false, true);
    scene.add(m);
  }

  function buildTrench(scene, mats, bz, frontSign, isPlayer, R) {
    const bags = [];
    const wood = new WW1.GeoBuilder(false);
    // Sacos de areia (parapeito na frente: 1 fileira; parados atrás: 2)
    for (let x = MINX + 7; x < MAXX - 7; x += 0.62) {
      const zc = W.trenchZ(x, bz), t = W.tangent(x, bz), yaw = Math.atan2(t.x, t.z) * 180 / Math.PI;
      for (const s of [-1, 1]) {
        const front = s === frontSign;
        if (isPlayer && front && W.nearRamp(x, 1.6)) continue;
        const rows = front ? 1 : 2, z = zc + s * (HALFW + 0.75), y = W.H(x, z);
        for (let r = 0; r < rows; r++)
          bags.push(WW1.trs(x + (r % 2) * 0.31, y + 0.1 + r * 0.2, z + R.range(-0.05, 0.05), [R.range(-4, 4), yaw + R.range(-8, 8), R.range(-4, 4)], 0.36, 0.24, 0.62));
      }
    }
    // Degraus de tiro
    for (let x = MINX + 7; x < MAXX - 7; x += 1.8) {
      const xm = x + 0.9, zc = W.trenchZ(xm, bz), t = W.tangent(xm, bz), yaw = Math.atan2(t.x, t.z) * 180 / Math.PI;
      for (const s of [-1, 1]) {
        const front = s === frontSign;
        if (isPlayer && (!front || W.nearRamp(xm, 2))) continue;
        wood.box(xm, FLOOR + STEPH / 2, zc + s * STEPOFF, 0.6, STEPH, 1.85, [0, yaw, 0]);
      }
    }
    // Estrados e estacas de revestimento
    for (let x = MINX + 7; x < MAXX - 7; x += 1.2) {
      const zc = W.trenchZ(x, bz), t = W.tangent(x, bz), yaw = Math.atan2(t.x, t.z) * 180 / Math.PI;
      const sx = t.z, sz = -t.x; // lateral
      wood.box(x + sx * 0.28, FLOOR + 0.06, zc + sz * 0.28, 0.06, 0.06, 1.2, [0, yaw, 0], null, 2);
      wood.box(x - sx * 0.28, FLOOR + 0.06, zc - sz * 0.28, 0.06, 0.06, 1.2, [0, yaw, 0], null, 2);
      for (let k = 0; k < 4; k++) {
        const o = -0.45 + k * 0.3;
        wood.box(x + t.x * o, FLOOR + 0.1, zc + t.z * o, 0.7, 0.025, 0.12, [0, yaw + R.range(-3, 3), 0]);
      }
      for (const s of [-1, 1]) {
        const a = { x, y: FLOOR, z: zc + s * (HALFW + 0.12) };
        const b = { x, y: FLOOR + 1.75, z: a.z + s * 0.22 };
        wood.cyl(a, b, 0.045);
        if (R() < 0.6) {
          const h = R.range(0.3, 1.3);
          wood.box(x, FLOOR + h, a.z + s * (0.22 * h / 1.75 - 0.05), 0.03, 0.18, 1.2, [0, yaw, 0]);
        }
      }
    }
    const inst = new THREE.InstancedMesh(WW1.prim.lowSph(), mats.bag, bags.length);
    bags.forEach((m, i) => inst.setMatrixAt(i, m));
    inst.castShadow = true;
    inst.receiveShadow = true;
    scene.add(inst);
    scene.add(wood.mesh(mats.wood));
  }

  function buildWire(scene, mats, R) {
    const pts = [];
    const stakes = new WW1.GeoBuilder(false);
    for (const w of W.wires) {
      const rows = [w.o0, (w.o0 + w.o1) / 2, w.o1];
      rows.forEach((ro, r) => {
        let prev = null;
        for (let x = MINX + 8; x < MAXX - 8; x += 0.45) {
          if (w.gaps.some(g => Math.abs(x - g) < w.gapW / 2)) { prev = null; continue; }
          const z = W.trenchZ(x, w.base) + ro + Math.sin(x * 1.7 + r) * 0.35;
          const y = W.H(x, z) + 0.25 + Math.abs(Math.sin(x * 1.3 + r * 2)) * 0.75;
          const p = [x, y, z];
          if (prev) pts.push(...prev, ...p);
          prev = p;
          if (((x % 2.7) + 2.7) % 2.7 < 0.45 && r !== 1) {
            const g0 = { x, y: W.H(x, z) - 0.2, z };
            stakes.cyl(g0, { x: x + R.range(-0.15, 0.15), y: g0.y + 1.35, z: z + R.range(-0.15, 0.15) }, 0.035);
          }
        }
      });
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
    scene.add(new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x1c1a17 })));
    scene.add(stakes.mesh(mats.wood));
  }

  function buildTrees(scene, mats, R) {
    const b = new WW1.GeoBuilder(false);
    let placed = 0, tries = 0;
    while (placed < 26 && tries++ < 500) {
      const x = R.range(MINX + 6, MAXX - 6), z = R.range(-28, 262);
      if (Math.abs(z - PT) < 6 || Math.abs(z - ET) < 6) continue;
      const p = { x, y: W.H(x, z) - 0.3, z };
      const h = R.range(2, 7.5), rad = R.range(0.14, 0.3);
      const top = { x: x + R.range(-0.25, 0.25), y: p.y + h, z: z + R.range(-0.25, 0.25) };
      b.cyl(p, top, rad, null, true);
      b.cyl(top, { x: top.x + R.range(-0.2, 0.2), y: top.y + R.range(0.3, 0.8), z: top.z + R.range(-0.2, 0.2) }, rad * 0.55);
      const n = R.int(4);
      for (let i = 0; i < n; i++) {
        const t = R.range(0.45, 0.95), s = { x: p.x + (top.x - p.x) * t, y: p.y + (top.y - p.y) * t, z: p.z + (top.z - p.z) * t };
        const d = new THREE.Vector3(R.range(-1, 1), R.range(0.3, 1), R.range(-1, 1)).normalize().multiplyScalar(R.range(0.8, 2.2));
        b.cyl(s, { x: s.x + d.x, y: s.y + d.y, z: s.z + d.z }, rad * 0.35);
      }
      placed++;
    }
    scene.add(b.mesh(mats.deadWood));
  }

  // Tanque britânico Mark I destruído (cobertura na terra de ninguém)
  function buildTank(scene, mats, x, z) {
    const y = W.H(x, z) - 0.55;
    const b = new WW1.GeoBuilder(false);
    const prof = [[-3.0, 0], [2.6, 0], [4.1, 1.5], [3.5, 2.45], [-3.2, 2.45], [-4.0, 0.9]];
    const frame = WW1.extrude(prof, 0.62);
    b.add(frame, WW1.trs(-1.55, 0, 0, null, 1, 1, 1));
    b.add(frame, WW1.trs(1.55, 0, 0, null, 1, 1, 1));
    b.box(0, 1.35, 0.2, 2.5, 1.6, 5.2);
    b.box(0, 2.25, 1.4, 1.3, 0.5, 1.2);
    for (const s of [-1, 1]) {
      b.box(s * 2.15, 1.25, 0.3, 0.6, 1.0, 2.0);
      b.cyl({ x: s * 2.4, y: 1.35, z: 0.9 }, { x: s * 2.55, y: 1.3, z: 2.6 }, 0.06);
      for (let k = 0; k < 18; k++) b.box(s * 1.55, -0.02, -3 + k * 0.33, 0.68, 0.06, 0.2);
    }
    b.box(-3.2, 0.1, -1.2, 0.9, 0.05, 0.7, [10, 30, 70]);
    const m = new THREE.Mesh(b.build(), new THREE.MeshStandardMaterial({ map: WW1.tex.metal, color: 0x8a8670, roughness: 0.75, metalness: 0.35 }));
    m.position.set(x, y, z);
    m.rotation.set(-7 * Math.PI / 180, 205 * Math.PI / 180, 9 * Math.PI / 180, 'YXZ');
    m.castShadow = m.receiveShadow = true;
    scene.add(m);
    W.tank = { x, y, z, mesh: m };
    // bloco sólido aproximado (caminhar/cobertura)
    const yaw = 205 * Math.PI / 180, cs = Math.cos(yaw), sn = Math.sin(yaw);
    stamp(x - 5, x + 5, z - 5, z + 5, (px, pz) => {
      const dx = px - x, dz = pz - z;
      const lx = dx * cs - dz * sn, lz = dx * sn + dz * cs;
      if (Math.abs(lx) < 2.2 && Math.abs(lz) < 3.4) return y + 2.25;
      return null;
    });
    WW1.fx && WW1.fx.plume(x, y + 2, z, 0.5);
  }

  function buildDebris(scene, mats, R) {
    const wood = new WW1.GeoBuilder(false), metal = new WW1.GeoBuilder(false);
    for (let i = 0; i < 70; i++) {
      const x = R.range(MINX + 8, MAXX - 8), z = R.range(6, 250), y = W.H(x, z), k = R();
      if (k < 0.55) wood.box(x, y + 0.04, z, R.range(0.12, 0.25), 0.04, R.range(0.8, 2.4), [R.range(-10, 10), R.range(0, 360), R.range(-15, 15)]);
      else if (k < 0.75) metal.cyl({ x, y: y - 0.1, z }, { x: x + R.range(-0.3, 0.3), y: y + R.range(0.2, 0.5), z: z + R.range(-0.3, 0.3) }, 0.08);
      else if (k < 0.9) metal.add(WW1.prim.lowSph(), WW1.trs(x, y + 0.04, z, [R.range(-30, 30), R.range(0, 360), R.range(-30, 30)], 0.3, 0.14, 0.32));
      else {
        const a = R() * Math.PI * 2, dx = Math.sin(a) * 0.45, dz = Math.cos(a) * 0.45;
        metal.cyl({ x: x - dx, y: y + 0.3, z: z - dz }, { x: x + dx, y: y + 0.3, z: z + dz }, 0.3, null, true);
      }
    }
    scene.add(wood.mesh(mats.wood));
    scene.add(metal.mesh(mats.rust));
  }

  function buildCrates(scene, mats) {
    const b = new WW1.GeoBuilder(false);
    const list = [[3.5, PT, -0.55], [-5, ET, 0.55], [13.5, ET, 0.55], [-18.5, ET, 0.55]];
    W.ammoCrates = [];
    for (const [x, bz, off] of list) {
      const zc = W.trenchZ(x, bz), t = W.tangent(x, bz), yaw = Math.atan2(t.x, t.z) * 180 / Math.PI;
      const p = { x, y: FLOOR + 0.22, z: zc + off };
      b.box(p.x, p.y, p.z, 0.5, 0.44, 0.85, [0, yaw, 0]);
      b.box(p.x, p.y + 0.23, p.z, 0.54, 0.04, 0.9, [0, yaw, 0]);
      W.ammoCrates.push(p);
    }
    scene.add(b.mesh(mats.crate));
  }
})();
