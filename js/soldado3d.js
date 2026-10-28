'use strict';
/* =========================================================
   SOLDADO 3D — infantaria de todas as facções (1939–1945)
   - modelado em metros com proporções reais (1,78 m; ombros 0,37 m;
     quadril a 52% da altura; cabeça 1/7,5 da altura)
   - esqueleto próprio: pélvis, tronco, pescoço, ombros, cotovelos,
     pulsos, quadris, joelhos e tornozelos
   - mãos presas à arma por cinemática inversa (IK) em todas as poses:
     pronto-baixo, porte cruzado (andando/correndo), mirando no ombro,
     ajoelhado e ajoelhado mirando; lança-rojão apoiado no ombro
   - facções: capacete, túnica, equipamento, botas/perneiras e armas próprios
     EUA (M1, Garand, Thompson, bazuca) · Alemanha (Stahlhelm, Kar98k, MP40,
     Panzerschreck) · Reino Unido (Brodie, Lee-Enfield) · URSS (SSh-40, Mosin,
     PPSh) · Japão (Tipo 90, Arisaka) · Itália, França, Polônia, China e outros
   - só depende do three.js; no jogo usa o material VC_MAT
   Uso:  const s = Soldado3.make({ nat: 'GER', kind: 'gren' });
         Soldado3.pose(s, { moving, speed, aim, crouch }, dt);
   ========================================================= */
const Soldado3 = (() => {
  const V3 = THREE.Vector3, Q = THREE.Quaternion;
  const lerp = (a, b, t) => a + (b - a) * t, clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- construtor de malha com cores por vértice ---------- */
  const _ni = new WeakMap();
  const ni = (g) => { let r = _ni.get(g); if (!r) { r = g.index ? g.toNonIndexed() : g; _ni.set(g, r); } return r; };
  const _m = new THREE.Matrix4(), _q = new Q(), _e = new THREE.Euler(), _n = new THREE.Matrix3(), _c = new THREE.Color(), _t = new V3(), _p0 = new V3(), _s0 = new V3();
  class MB {
    constructor() { this.p = []; this.n = []; this.c = []; this.cf = null; }
    add(geo, color, sx = 1, sy = 1, sz = 1, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
      _e.set(rx, ry, rz); _q.setFromEuler(_e); _m.compose(_p0.set(x, y, z), _q, _s0.set(sx, sy, sz)); _n.getNormalMatrix(_m);
      const g = ni(geo), pa = g.attributes.position, na = g.attributes.normal; _c.setHex(color);
      for (let i = 0; i < pa.count; i++) {
        _t.fromBufferAttribute(pa, i).applyMatrix4(_m); this.p.push(_t.x, _t.y, _t.z);
        const cc = this.cf ? this.cf(_t.x, _t.y, _t.z, _c) : _c; this.c.push(cc.r, cc.g, cc.b);
        _t.fromBufferAttribute(na, i).applyMatrix3(_n).normalize(); this.n.push(_t.x, _t.y, _t.z);
      }
      return this;
    }
    build() {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(this.p, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(this.n, 3));
      g.setAttribute('color', new THREE.Float32BufferAttribute(this.c, 3));
      return g;
    }
  }
  const P = {
    box: new THREE.BoxGeometry(1, 1, 1), cyl8: new THREE.CylinderGeometry(1, 1, 1, 8), cyl6: new THREE.CylinderGeometry(1, 1, 1, 6),
    cone: new THREE.CylinderGeometry(0.6, 1, 1, 8), sph: new THREE.SphereGeometry(1, 8, 6), sph6: new THREE.SphereGeometry(1, 6, 4),
  };
  const shade = (hex, k) => new THREE.Color(hex).multiplyScalar(k).getHex();

  /* ---------- seções (lofts) ---------- */
  // anel superelíptico no plano XZ; fy(cos, sin) desloca y; fr(cos, sin) multiplica o raio
  function ring(n, y, rx, rz, k, cx, cz, fy, fr) {
    const out = [], e = 2 / (k || 2);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), r = fr ? fr(c, s) : 1;
      out.push([(cx || 0) + Math.sign(c) * Math.pow(Math.abs(c), e) * rx * r, y + (fy ? fy(c, s) : 0), (cz || 0) + Math.sign(s) * Math.pow(Math.abs(s), e) * rz * r]);
    }
    return out;
  }
  function zring(n, z, cx, cy, rx, ry, k) {
    const out = [], e = 2 / (k || 2);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      out.push([cx + Math.sign(c) * Math.pow(Math.abs(c), e) * rx, cy + Math.sign(s) * Math.pow(Math.abs(s), e) * ry, z]);
    }
    return out;
  }
  function loft(R, opt) {
    opt = opt || {};
    const n = R[0].length, pos = [], idx = [];
    const ctr = R.map(r => { let x = 0, y = 0, z = 0; for (const p of r) { x += p[0]; y += p[1]; z += p[2]; } return [x / n, y / n, z / n]; });
    for (const r of R) for (const p of r) pos.push(p[0], p[1], p[2]);
    const at = (i) => [pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]];
    const tri = (a, b, c, ref, dir) => {
      const A = at(a), B = at(b), C = at(c);
      const ux = B[0] - A[0], uy = B[1] - A[1], uz = B[2] - A[2], vx = C[0] - A[0], vy = C[1] - A[1], vz = C[2] - A[2];
      const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
      const d = dir || [(A[0] + B[0] + C[0]) / 3 - ref[0], (A[1] + B[1] + C[1]) / 3 - ref[1], (A[2] + B[2] + C[2]) / 3 - ref[2]];
      if (nx * d[0] + ny * d[1] + nz * d[2] < 0) idx.push(a, c, b); else idx.push(a, b, c);
    };
    for (let r = 0; r < R.length - 1; r++) {
      const ref = ctr[r].map((v, k) => (v + ctr[r + 1][k]) / 2);
      for (let i = 0; i < n; i++) { const a = r * n + i, b = r * n + (i + 1) % n, c = (r + 1) * n + (i + 1) % n, d = (r + 1) * n + i; tri(a, b, c, ref); tri(a, c, d, ref); }
    }
    for (const [ri, nb] of [[0, 1], [R.length - 1, R.length - 2]]) {
      if ((ri === 0 && opt.capA === false) || (ri > 0 && opt.capB === false)) continue;
      const base = pos.length / 3; for (const p of R[ri]) pos.push(p[0], p[1], p[2]);
      const c = pos.length / 3; pos.push(...ctr[ri]);
      const dir = ctr[ri].map((v, k) => v - ctr[nb][k]);
      for (let i = 0; i < n; i++) tri(c, base + i, base + (i + 1) % n, null, dir);
    }
    let g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setIndex(idx); g.computeVertexNormals();
    if (opt.flat) { g = g.toNonIndexed(); g.computeVertexNormals(); }
    return g;
  }
  const limb = (n, secs, k, opt) => loft(secs.map(([y, rx, rz, dx, dz]) => ring(n, y, rx, rz, k || 2, dx || 0, dz || 0)), opt);
  const zloft = (n, secs, k, opt) => loft(secs.map(([z, t, b, hw]) => zring(n, z, 0, (t + b) / 2, hw, (t - b) / 2, k || 2)), opt);
  // seção que acompanha um caminho (correias = 4 lados; rolos e tubos = n lados)
  function sweep(pts, w, t, out, n) {
    const R = [];
    n = n || 4;
    for (let i = 0; i < pts.length; i++) {
      const p = new V3(...pts[i]), T = new V3(...pts[Math.min(pts.length - 1, i + 1)]).sub(new V3(...pts[Math.max(0, i - 1)])).normalize();
      const N = new V3(...out(pts[i])).normalize(), S = new V3().crossVectors(T, N).normalize(), N2 = new V3().crossVectors(S, T).normalize();
      const rg = [];
      if (n === 4) for (const [a, b] of [[1, 1], [-1, 1], [-1, -1], [1, -1]]) rg.push(p.clone().addScaledVector(S, a * w / 2).addScaledVector(N2, b * t / 2).toArray());
      else for (let k = 0; k < n; k++) { const a = k / n * Math.PI * 2; rg.push(p.clone().addScaledVector(S, Math.cos(a) * w / 2).addScaledVector(N2, Math.sin(a) * t / 2).toArray()); }
      R.push(rg);
    }
    return loft(R, { flat: n === 4 });
  }
  const strap = (pts, w, t, out) => sweep(pts, w, t, out, 4);

  /* ---------- medidas (metros) ---------- */
  const M = { pelvisY: 0.95, spineY: 0.09, neckY: 0.47, shX: 0.185, shY: 0.4, hipX: 0.095, upper: 0.29, fore: 0.255, thigh: 0.44, shin: 0.43 };
  const GAME_SCALE = 1.38;            // 1,85 m de altura → mesma altura do soldado antigo no jogo
  const TORSO = [[-0.07, 0.305, 0.2, 0], [0.02, 0.3, 0.195, 0.003], [0.12, 0.325, 0.21, 0.01], [0.22, 0.37, 0.235, 0.016], [0.3, 0.4, 0.245, 0.016],
    [0.36, 0.415, 0.235, 0.008], [0.405, 0.41, 0.215, 0], [0.44, 0.34, 0.185, -0.008], [0.47, 0.2, 0.15, -0.008], [0.49, 0.12, 0.115, -0.005]];
  const TK = 2.6;
  function secAt(T, y) {
    let i = 0; while (i < T.length - 2 && T[i + 1][0] < y) i++;
    const a = T[i], b = T[i + 1], t = clamp((y - a[0]) / (b[0] - a[0]), 0, 1);
    return [lerp(a[1], b[1], t) / 2, lerp(a[2], b[2], t) / 2, lerp(a[3], b[3], t)];
  }
  // ponto na superfície (f = 1 frente, -1 costas) e giro para encostar peças
  function surf(T, x, y, f, off) {
    const [hw, hd, dz] = secAt(T, y), u = Math.min(0.995, Math.abs(x) / hw), zz = hd * Math.pow(1 - Math.pow(u, TK), 1 / TK);
    const dzdx = u > 0.01 ? -hd * Math.pow(1 - Math.pow(u, TK), 1 / TK - 1) * Math.pow(u, TK - 1) / hw * Math.sign(x) : 0;
    const ry = f > 0 ? Math.atan2(-dzdx, 1) : Math.PI + Math.atan2(dzdx, 1);
    return { x: x + (off || 0) * Math.sin(ry), y, z: dz + f * zz + (off || 0) * Math.cos(ry), ry };
  }
  const sp = (T, x, y, f, off) => { const p = surf(T, x, y, f, off); return [p.x, p.y, p.z]; };
  function around(T, y, a, off) {
    const [hw, hd, dz] = secAt(T, y), e = 2 / TK, c = Math.cos(a), s = Math.sin(a);
    const x = Math.sign(c) * Math.pow(Math.abs(c), e) * hw, z = Math.sign(s) * Math.pow(Math.abs(s), e) * hd;
    const nx = x / (hw * hw), nz = z / (hd * hd), l = Math.hypot(nx, nz) || 1;
    return { x: x + nx / l * (off || 0), z: dz + z + nz / l * (off || 0), ry: Math.atan2(nx, nz) };
  }
  const outT = (p) => (p[1] > 0.43 ? [p[0] * 0.3, 1, p[2] * 0.3] : [p[0] * 0.5, 0, p[2]]);
  const SKIRT = { us: -0.1, de: -0.14, plain4: -0.14, jp: -0.12, sov: -0.19, uk: 0.0, para: -0.12 };
  const skirtRings = (s) => s >= 0 ? [[0.0, 0.33, 0.22, 0], [0.06, 0.318, 0.208, 0], [0.13, 0.302, 0.2, 0]]
    : [[s, 0.35 - s * 0.15, 0.24 - s * 0.1, 0.006], [-0.03, 0.34, 0.228, 0.004], [0.06, 0.318, 0.208, 0], [0.13, 0.302, 0.2, 0]];

  /* ---------- formas (criadas uma vez, por nome) ---------- */
  const SHP = new Map();
  const shape = (name, fn) => { let g = SHP.get(name); if (!g) { g = fn(); SHP.set(name, g); } return g; };
  const common = () => shape('common', () => {
    const S = {};
    S.seat = loft([[-0.13, 0.25, 0.17], [-0.06, 0.32, 0.21], [0.04, 0.33, 0.215], [0.12, 0.3, 0.2]].map(([y, w, d]) => ring(12, y, w / 2, d / 2, 2.4)));
    S.belt = loft([ring(14, 0.03, 0.172, 0.117, TK, 0, 0.002), ring(14, 0.1, 0.168, 0.113, TK, 0, 0.001)], { flat: true });
    S.torso = loft(TORSO.map(([y, w, d, dz]) => ring(14, y, w / 2, d / 2, TK, 0, dz)));
    S.collarFold = loft([ring(10, 0.455, 0.082, 0.074, 2.2, 0, 0.004), ring(10, 0.515, 0.068, 0.062, 2.2, 0, 0.012)], { flat: true });
    S.collarStand = loft([ring(10, 0.46, 0.074, 0.068, 2.2, 0, 0.004), ring(10, 0.54, 0.064, 0.06, 2.2, 0, 0.01)], { flat: true });
    S.placket = strap([0.0, 0.1, 0.2, 0.3, 0.4, 0.47].map(y => sp(TORSO, 0, y, 1, 0.002)), 0.034, 0.01, outT);
    S.placketShort = strap([0.3, 0.38, 0.47].map(y => sp(TORSO, 0, y, 1, 0.002)), 0.03, 0.008, outT);
    S.neck = limb(8, [[-0.04, 0.055, 0.053, 0, -0.005], [0.09, 0.048, 0.05, 0, 0.006]]);
    S.head = loft([[0.055, 0.022, 0.02, 0.055], [0.07, 0.05, 0.042, 0.045], [0.09, 0.068, 0.075, 0.025], [0.12, 0.074, 0.088, 0.015], [0.155, 0.077, 0.093, 0.008],
      [0.19, 0.078, 0.095, 0.003], [0.22, 0.075, 0.092, 0], [0.25, 0.064, 0.08, -0.004], [0.272, 0.04, 0.052, -0.006], [0.282, 0.01, 0.012, -0.006]]
      .map(([y, rx, rz, dz]) => ring(12, y, rx, rz, 2.2, 0, dz)));
    S.sleeve = limb(8, [[0.0, 0.056, 0.058], [-0.08, 0.052, 0.055, 0, 0.006], [-0.18, 0.047, 0.05, 0, 0.004], [-0.29, 0.042, 0.044]]);
    S.fore = limb(8, [[0.0, 0.044, 0.046], [-0.08, 0.044, 0.047, 0, 0.004], [-0.19, 0.037, 0.039], [-0.215, 0.036, 0.038]]);
    S.cuff = limb(8, [[-0.2, 0.041, 0.043], [-0.238, 0.04, 0.042]]);
    S.wrist = limb(6, [[-0.225, 0.026, 0.022], [-0.262, 0.028, 0.023]]);
    S.band = limb(8, [[-0.06, 0.055, 0.058], [-0.11, 0.053, 0.056]]);
    S.palm = limb(8, [[0.0, 0.026, 0.02], [-0.03, 0.04, 0.024, 0, -0.004], [-0.065, 0.042, 0.024, 0, -0.008]], 2.6);
    S.fingers = limb(6, [[-0.04, 0.041, 0.016, 0, 0.022], [-0.092, 0.038, 0.017, 0, 0.018]], 3);
    S.thigh = limb(8, [[0.07, 0.085, 0.09], [0.0, 0.09, 0.097, 0, 0.005], [-0.12, 0.086, 0.094, 0, 0.01], [-0.28, 0.074, 0.08, 0, 0.008], [-0.4, 0.064, 0.069, 0, 0.004], [-0.45, 0.06, 0.065]]);
    S.trouserLo = limb(8, [[0.02, 0.062, 0.066], [-0.07, 0.058, 0.062, 0, -0.004], [-0.12, 0.068, 0.072, 0, -0.004], [-0.15, 0.062, 0.066]]);
    S.trouserLong = limb(8, [[0.02, 0.062, 0.066], [-0.12, 0.058, 0.062, 0, -0.005], [-0.3, 0.055, 0.059], [-0.37, 0.058, 0.064]]);
    S.trouserShort = limb(8, [[0.02, 0.062, 0.066], [-0.1, 0.059, 0.063, 0, -0.004]]);
    S.legging = limb(8, [[-0.13, 0.058, 0.062], [-0.24, 0.055, 0.058, 0, -0.006], [-0.36, 0.05, 0.053], [-0.41, 0.054, 0.06, 0, 0.006]]);
    S.puttee = limb(8, [[-0.1, 0.058, 0.062], [-0.22, 0.054, 0.058, 0, -0.006], [-0.36, 0.047, 0.05], [-0.41, 0.05, 0.055, 0, 0.004]]);
    S.shaft = limb(8, [[-0.08, 0.062, 0.068], [-0.2, 0.058, 0.064, 0, -0.004], [-0.36, 0.052, 0.057], [-0.42, 0.054, 0.06, 0, 0.006]]);
    S.anklet = limb(8, [[-0.33, 0.056, 0.06], [-0.42, 0.054, 0.06, 0, 0.006]]);
    S.boot = loft([[-0.075, -0.025, 0.036, 0.042], [-0.05, -0.022, 0.043, 0.052], [0.0, -0.03, 0.046, 0.048], [0.07, -0.046, 0.044, 0.034], [0.13, -0.053, 0.039, 0.026], [0.165, -0.056, 0.03, 0.019], [0.176, -0.058, 0.012, 0.009]]
      .map(([z, cy, rx, ry]) => zring(8, z, 0, cy, rx, ry, 2.6)));
    S.bootTop = limb(8, [[-0.06, 0.047, 0.052], [0.03, 0.044, 0.048]]);
    S.canteen = loft([ring(8, -0.09, 0.055, 0.026, 2.4), ring(8, -0.075, 0.066, 0.032, 2.4), ring(8, 0.06, 0.066, 0.032, 2.4), ring(8, 0.08, 0.055, 0.026, 2.4)]);
    S.can = limb(8, [[-0.14, 0.05, 0.05], [0.14, 0.05, 0.05]]);
    return S;
  });
  const skirtShape = (s) => shape('skirt' + s, () => {
    const R = skirtRings(s);
    return { R, skirt: loft(R.map(([y, w, d, dz]) => ring(14, y, w / 2, d / 2, TK, 0, dz))), hem: loft([ring(14, R[0][0] - 0.005, R[0][1] / 2 + 0.003, R[0][2] / 2 + 0.003, TK, 0, R[0][3]), ring(14, R[0][0] + 0.015, R[0][1] / 2 + 0.002, R[0][2] / 2 + 0.002, TK, 0, R[0][3])], { flat: true }) };
  });
  // capacetes (espaço do pescoço). Cada um: casco liso + aba facetada (+ rede)
  const HZ = -0.01;
  const helmShape = (type) => shape('helm' + type, () => {
    const H = {};
    const dome = (L, last, drop, fr) => loft([...L.map(([y, rx, rz]) => ring(16, y, rx, rz, 2.1, 0, HZ)), ring(16, last[0], last[1], last[2], 2.1, 0, HZ, drop, fr)], { capB: false });
    const lip = (rs, drop, fr) => loft(rs.map(([y, rx, rz]) => ring(16, y, rx, rz, 2.1, 0, HZ, drop, fr)), { flat: true });
    if (type === 'm1') {
      const drop = (c, s) => -0.03 * c * c - (s < 0 ? 0.016 * s * s : 0), L = [[0.338, 0.006, 0.007], [0.334, 0.046, 0.052], [0.32, 0.085, 0.095], [0.296, 0.112, 0.126], [0.262, 0.127, 0.142], [0.23, 0.132, 0.149]];
      H.shell = dome(L, [0.2, 0.134, 0.151], drop);
      H.rim = lip([[0.203, 0.135, 0.152], [0.195, 0.144, 0.162], [0.187, 0.145, 0.163], [0.194, 0.13, 0.147]], drop);
      H.netPts = L.slice(1).concat([[0.205, 0.134, 0.151]]); H.netRing = [0.262, 0.131, 0.146];
    } else if (type === 'stahl') {
      // casco, degrau vertical sobre as orelhas e saia aberta; viseira curta na frente
      const L = [[0.33, 0.006, 0.007], [0.326, 0.05, 0.055], [0.312, 0.088, 0.098], [0.288, 0.113, 0.127], [0.255, 0.125, 0.142], [0.228, 0.128, 0.146]];
      const dA = (c, s) => (s > 0 ? -0.005 * s : 0) - 0.05 * c * c - (s < 0 ? 0.05 * s * s : 0);
      const dB = (c, s) => (s > 0 ? 0.004 * s : 0) - 0.072 * c * c - (s < 0 ? 0.075 * s * s : 0);
      const fB = (c, s) => (s > 0 ? 1.07 + 0.03 * s : 1.13 + 0.02 * Math.abs(s));
      H.shell = loft([...L.map(([y, rx, rz]) => ring(16, y, rx, rz, 2.1, 0, HZ)), ring(16, 0.21, 0.13, 0.148, 2.1, 0, HZ, dA)], { capB: false });
      H.rim = loft([ring(16, 0.212, 0.131, 0.149, 2.1, 0, HZ, dA), ring(16, 0.205, 0.134, 0.152, 2.1, 0, HZ, dB, (c, s) => (s > 0 ? 1.02 : 1.04)), ring(16, 0.2, 0.13, 0.148, 2.1, 0, HZ, dB, fB), ring(16, 0.205, 0.122, 0.14, 2.1, 0, HZ, dB, fB)], { flat: true });
      H.netPts = L.slice(1).concat([[0.215, 0.13, 0.148]]); H.netRing = [0.255, 0.124, 0.141];
    } else if (type === 'brodie') {
      // "prato de sopa": casco raso e aba larga
      const L = [[0.315, 0.006, 0.007], [0.311, 0.05, 0.056], [0.297, 0.085, 0.096], [0.272, 0.103, 0.116], [0.248, 0.107, 0.12]];
      H.shell = loft(L.map(([y, rx, rz]) => ring(16, y, rx, rz, 2.1, 0, HZ)), { capB: false });
      H.rim = lip([[0.249, 0.107, 0.12], [0.24, 0.165, 0.185], [0.233, 0.172, 0.192], [0.24, 0.165, 0.185], [0.245, 0.1, 0.113]]);
      H.netPts = L.slice(1).concat([[0.243, 0.17, 0.19]]); H.netRing = [0.272, 0.102, 0.115];
    } else if (type === 'ssh40' || type === 'm33' || type === 'type90') {
      const lo = type === 'ssh40' ? 0.035 : type === 'm33' ? 0.028 : 0.022, fl = type === 'm33' ? 1.08 : type === 'type90' ? 1.06 : 1.05;
      const drop = (c, s) => -lo * c * c - (s < 0 ? lo * 0.6 * s * s : 0) + (s > 0 ? 0.008 * s : 0);
      const L = [[0.338, 0.006, 0.007], [0.334, 0.05, 0.056], [0.318, 0.09, 0.1], [0.293, 0.118, 0.132], [0.258, 0.131, 0.147], [0.225, 0.135, 0.151]];
      H.shell = dome(L, [0.195, 0.137, 0.153], drop);
      H.rim = lip([[0.197, 0.137, 0.153], [0.188, 0.137 * fl, 0.153 * fl], [0.181, 0.138 * fl, 0.154 * fl], [0.19, 0.13, 0.146]], drop, type === 'm33' ? (c, s) => (s > 0 ? 1 + 0.05 * s : 1) : null);
      H.netPts = L.slice(1).concat([[0.2, 0.137, 0.153]]); H.netRing = [0.258, 0.13, 0.146];
    } else if (type === 'adrian') {
      // casco com crista e abas na frente e atrás
      const L = [[0.31, 0.006, 0.007], [0.306, 0.05, 0.058], [0.292, 0.088, 0.1], [0.268, 0.108, 0.123], [0.236, 0.115, 0.13]];
      H.shell = loft(L.map(([y, rx, rz]) => ring(16, y, rx, rz, 2.1, 0, HZ)), { capB: false });
      const fr = (c, s) => 1 + 0.42 * Math.pow(Math.abs(s), 3);
      H.rim = lip([[0.237, 0.115, 0.13], [0.226, 0.122, 0.138], [0.22, 0.124, 0.14], [0.228, 0.112, 0.126]], (c, s) => -0.006 * c * c, fr);
      H.crest = limb(8, [[0.29, 0.008, 0.11], [0.33, 0.006, 0.1]], 2.4);
      H.netPts = null;
    }
    if (H.netPts) {
      const hOut = (p) => [p[0], p[1] - 0.2, p[2] - HZ];
      H.net = [];
      for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.25; H.net.push(strap(H.netPts.map(([y, rx, rz]) => [Math.cos(a) * rx * 1.03, y + 0.001, Math.sin(a) * rz * 1.03 + HZ]), 0.008, 0.005, hOut)); }
      const [y, rx, rz] = H.netRing, pts = []; for (let i = 0; i <= 14; i++) { const a = i / 14 * Math.PI * 2; pts.push([Math.cos(a) * rx * 1.03, y, Math.sin(a) * rz * 1.03 + HZ]); }
      H.net.push(strap(pts, 0.008, 0.005, hOut));
    }
    return H;
  });

  /* ---------- facções ---------- */
  const SKINS = [0xd2a17a, 0xc8936b, 0xe0b48f, 0xb98563], SKINS_AS = [0xd8b080, 0xcfa275, 0xe2bd8e];
  const BASE = { band: 0x3e432c, net: 0x30351f, metal: 0x2b2c2a, wood: 0x87512c, legging: 0xa39873 };
  const LOOK = {
    USA: { helm: 'm1', tunic: 'us', gear: 'us', legs: 'leggings', rifle: 'garand', smg: 'thompson', at: 'bazooka', btn: 0x2c2a22,
      pal: { jacket: 0x6a7050, pants: 0x5a5440, helm: 0x55603a, web: 0x9a916c, boot: 0x5e3f26, legging: 0xa39873, pack: 0x857c58 } },
    GER: { helm: 'stahl', tunic: 'de', gear: 'de', legs: 'jackboots', rifle: 'kar98', smg: 'mp40', at: 'pzschreck', btn: 0x8c8c80,
      pal: { jacket: 0x5d6a5a, pants: 0x56604f, helm: 0x5a645c, collar: 0x3c4a3f, web: 0x2a2621, boot: 0x1d1b19, pack: 0x6b6a52 } },
    ENG: { helm: 'brodie', tunic: 'uk', gear: 'uk', legs: 'anklets', rifle: 'enfield', smg: 'thompson', at: 'bazooka', btn: 0x5a5440,
      pal: { jacket: 0x76694a, pants: 0x6e6244, helm: 0x5c5c3c, web: 0xa59a74, legging: 0xa09670, boot: 0x1d1b19, pack: 0x958a66 } },
    SOV: { helm: 'ssh40', tunic: 'sov', gear: 'sov', legs: 'jackboots', rifle: 'mosin', smg: 'ppsh', at: 'bazooka', btn: 0x8a7a40,
      pal: { jacket: 0x857a56, pants: 0x766b4c, helm: 0x4d5a36, web: 0x6a5032, boot: 0x2a2018, pack: 0x7a7050, roll: 0x5d5a4a } },
    JAP: { helm: 'type90', tunic: 'jp', gear: 'jp', legs: 'puttees', rifle: 'arisaka', smg: 'arisaka', at: 'mortar', btn: 0x9a8040, asian: true,
      pal: { jacket: 0x8a7d4e, pants: 0x857850, helm: 0x6a6440, web: 0x5a4028, boot: 0x4a3420, legging: 0x7c7050, pack: 0x7a6e48 } },
  };
  const derive = (base, o) => Object.assign({}, LOOK[base], o, { pal: Object.assign({}, LOOK[base].pal, o.pal || {}) });
  Object.assign(LOOK, {
    ITA: derive('GER', { helm: 'm33', tunic: 'plain4', legs: 'puttees', rifle: 'carcano', pal: { jacket: 0x6e6d50, pants: 0x66654a, helm: 0x5e604c, web: 0x4a3a28, legging: 0x5f5e48, boot: 0x2a2018 } }),
    HUN: derive('GER', { tunic: 'plain4', legs: 'puttees', pal: { jacket: 0x726d4a, pants: 0x6a6442, helm: 0x5e5f48, web: 0x4a3a28, legging: 0x5f5a40, boot: 0x2a2018 } }),
    ROM: derive('GER', { helm: 'm33', tunic: 'plain4', legs: 'puttees', pal: { jacket: 0x7a7556, pants: 0x6f6a4c, web: 0x4a3a28, legging: 0x6a6448, boot: 0x2a2018 } }),
    FIN: derive('GER', { tunic: 'plain4', rifle: 'mosin', smg: 'ppsh', pal: { jacket: 0x63685a, pants: 0x5a5f52 } }),
    POL: derive('GER', { tunic: 'plain4', legs: 'puttees', at: 'none', pal: { jacket: 0x6c6c4c, pants: 0x626246, helm: 0x5a6040, web: 0x4a3a28, legging: 0x5c5c44, boot: 0x2a2018 } }),
    CHN: derive('GER', { tunic: 'plain4', gear: 'jp', legs: 'puttees', asian: true, at: 'none', pal: { jacket: 0x6b7072, pants: 0x63686a, helm: 0x4f5658, web: 0x6a6450, legging: 0x7a7a70, boot: 0x2a2a28 } }),
    FRA: derive('GER', { helm: 'adrian', tunic: 'plain4', legs: 'puttees', rifle: 'mas36', at: 'none', pal: { jacket: 0x8a7d58, pants: 0x7e7252, helm: 0x58685e, web: 0x5a4028, legging: 0x6e6450, boot: 0x2a2018 } }),
    YUG: derive('GER', { helm: 'adrian', tunic: 'plain4', legs: 'puttees', at: 'none', pal: { jacket: 0x6e6a4c, pants: 0x646046, web: 0x4a3a28, legging: 0x5c5a44, boot: 0x2a2018 } }),
    GRE: derive('ENG', { helm: 'adrian', tunic: 'plain4', legs: 'puttees', pal: { jacket: 0x7d7454, pants: 0x736a4c, legging: 0x6e6650 } }),
  });
  LOOK.USA_PARA = derive('USA', { tunic: 'para', legs: 'jumpboots', gear: 'para', pal: { jacket: 0x8a8358, pants: 0x857e55, helm: 0x4a5032, boot: 0x5a3a20 } });

  /* ---------- camuflagem por cor de vértice ---------- */
  function camo(kind, target) {
    const tc = new THREE.Color(target), out = new THREE.Color();
    const cols = kind === 'snow' ? [0xe8eaea, 0xc9cdcb, 0xe8eaea] : kind === 'splinter' ? [0x707350, 0x4e5a3b, 0x6a5238] : [0x5e6a40, 0x6f6646, 0x4a5236];
    return (x, y, z, c) => {
      if (!c.equals(tc)) return c;
      const n = Math.sin(x * 23 + y * 11) + Math.sin(z * 19 - y * 13 + 1.3) + Math.sin((x + z) * 15 + y * 7);
      return out.setHex(n > 0.9 ? cols[1] : n < -0.9 ? cols[2] : cols[0]);
    };
  }

  /* ---------- peças do corpo ---------- */
  function buildPelvis(B, L, pal, o) {
    const C = common(), J = pal.jacket, Jd = shade(J, 0.8), W = pal.web, Wd = shade(W, 0.8), met = 0x6f6f66;
    const sk = skirtShape(SKIRT[L.tunic]);
    B.add(C.seat, pal.pants);
    B.cf = o.camo; B.add(sk.skirt, J); B.cf = null; B.add(sk.hem, Jd);
    if (['us', 'de', 'plain4', 'jp', 'para'].includes(L.tunic)) for (const sx of [-1, 1]) {   // bolsos baixos com lapela
      const yy = SKIRT[L.tunic] + 0.06, p = surf(sk.R, sx * 0.085, yy, 1, 0.006);
      B.add(P.box, shade(J, 0.92), 0.1, 0.1, 0.014, p.x, yy, p.z, 0, p.ry, 0);
      B.add(P.box, Jd, 0.106, 0.032, 0.02, p.x, yy + 0.037, p.z + 0.002, 0.2, p.ry, 0);
    }
    const belt = L.gear === 'sov' || L.gear === 'jp' ? pal.web : W;
    B.add(C.belt, belt);
    const gear = L.gear;
    if (gear === 'us' || gear === 'para') {
      for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) {                             // cinto M1923
        const p = around(sk.R, 0.065, Math.PI / 2 - sx * (0.5 + i * 0.27), 0.024);
        B.add(P.box, W, 0.05, 0.072, 0.034, p.x, 0.058, p.z, 0, p.ry, 0);
        B.add(P.box, Wd, 0.053, 0.024, 0.038, p.x, 0.088, p.z, 0, p.ry, 0);
        B.add(P.box, met, 0.008, 0.008, 0.04, p.x, 0.082, p.z, 0, p.ry, 0);
      }
      { const p = surf(sk.R, -0.035, -0.005, 1, 0.026); B.add(P.box, W, 0.06, 0.065, 0.03, p.x, -0.005, p.z, 0, p.ry, 0); B.add(P.box, Wd, 0.062, 0.02, 0.034, p.x, 0.025, p.z, 0, p.ry, 0); }
      { const p = around(sk.R, -0.02, -0.55, 0.04); B.add(C.canteen, 0x6a664a, 1, 1, 1, p.x, -0.03, p.z, 0, p.ry + Math.PI / 2, 0); B.add(P.box, 0x58553d, 0.11, 0.025, 0.07, p.x, 0.045, p.z, 0, p.ry + Math.PI / 2, 0); }
    } else if (gear === 'de') {
      for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) {                             // porta-carregadores triplos de couro
        const p = around(sk.R, 0.07, Math.PI / 2 - sx * (0.42 + i * 0.25), 0.028);
        B.add(P.box, W, 0.046, 0.078, 0.042, p.x, 0.07, p.z, 0, p.ry, 0);
        B.add(P.box, shade(W, 1.25), 0.048, 0.022, 0.046, p.x, 0.104, p.z, 0.15, p.ry, 0);
      }
      { const p = around(sk.R, -0.04, -0.75, 0.05); B.add(P.box, pal.pack, 0.2, 0.17, 0.07, p.x, -0.06, p.z, 0, p.ry, 0); B.add(P.box, shade(pal.pack, 0.85), 0.2, 0.06, 0.075, p.x, 0.0, p.z, 0, p.ry, 0); }  // sacola de pão
      { const p = around(sk.R, -0.04, -0.35, 0.09); B.add(C.canteen, 0x4a4c3a, 1, 1, 1, p.x, -0.06, p.z, 0, p.ry + Math.PI / 2, 0); B.add(P.cyl8, 0x2a2a26, 0.034, 0.05, 0.034, p.x, 0.04, p.z); }
      { const p = around(sk.R, -0.02, -Math.PI + 0.75, 0.04); B.add(P.box, 0x45473b, 0.13, 0.16, 0.025, p.x, -0.07, p.z, 0, p.ry, 0); B.add(P.box, 0x2a2a26, 0.03, 0.26, 0.022, p.x + 0.04, -0.05, p.z + 0.03, 0, p.ry, 0.1); }  // pá e baioneta
    } else if (gear === 'uk') {
      { const p = around(sk.R, -0.02, -0.55, 0.04); B.add(C.canteen, 0x7a7454, 1, 1, 1, p.x, -0.04, p.z, 0, p.ry + Math.PI / 2, 0); B.add(P.box, W, 0.13, 0.02, 0.08, p.x, 0.03, p.z, 0, p.ry + Math.PI / 2, 0); }
      { const p = around(sk.R, -0.02, -Math.PI + 0.6, 0.03); B.add(P.box, W, 0.045, 0.1, 0.03, p.x, -0.02, p.z, 0, p.ry, 0); B.add(P.box, 0x2a2a26, 0.02, 0.22, 0.02, p.x, -0.12, p.z, 0, p.ry, 0); }
    } else if (gear === 'sov') {
      for (const sx of [-1, 1]) { const p = around(sk.R, 0.07, Math.PI / 2 - sx * 0.6, 0.03); B.add(P.box, W, 0.075, 0.08, 0.045, p.x, 0.07, p.z, 0, p.ry, 0); B.add(P.box, shade(W, 1.2), 0.078, 0.025, 0.05, p.x, 0.105, p.z, 0.15, p.ry, 0); }
      { const p = around(sk.R, -0.03, -0.6, 0.04); B.add(P.box, 0x4d5040, 0.13, 0.17, 0.025, p.x, -0.07, p.z, 0, p.ry, 0); B.add(P.cyl8, 0x5e4a30, 0.012, 0.12, 0.012, p.x, 0.05, p.z); }
      { const p = around(sk.R, -0.05, Math.PI - 0.5, 0.07); B.add(P.box, 0x5e6048, 0.16, 0.19, 0.08, p.x, -0.08, p.z, 0, p.ry, 0); }   // bolsa da máscara
    } else if (gear === 'jp') {
      for (const sx of [-1, 1]) { const p = around(sk.R, 0.07, Math.PI / 2 - sx * 0.5, 0.03); B.add(P.box, W, 0.09, 0.06, 0.04, p.x, 0.068, p.z, 0, p.ry, 0); B.add(P.box, shade(W, 1.2), 0.092, 0.02, 0.044, p.x, 0.095, p.z, 0.12, p.ry, 0); }
      { const p = around(sk.R, 0.07, -Math.PI / 2, 0.03); B.add(P.box, W, 0.11, 0.07, 0.045, p.x, 0.068, p.z, 0, p.ry, 0); }
      { const p = around(sk.R, -0.03, -0.45, 0.045); B.add(C.canteen, 0x6b6448, 1, 1, 1, p.x, -0.04, p.z, 0, p.ry + Math.PI / 2, 0); }
      { const p = around(sk.R, -0.05, Math.PI - 0.55, 0.05); B.add(P.box, 0x7a7050, 0.17, 0.16, 0.06, p.x, -0.07, p.z, 0, p.ry, 0); B.add(P.box, 0x2a2a26, 0.02, 0.26, 0.02, p.x + 0.02, -0.08, p.z + 0.04, 0, p.ry, 0.1); }
    }
    if (gear !== 'jp' && gear !== 'sov') { const p = surf(sk.R, 0, 0.065, 1, 0.012); B.add(P.box, met, 0.045, 0.04, 0.012, p.x, 0.065, p.z); }
    else { const p = surf(sk.R, 0, 0.065, 1, 0.012); B.add(P.box, 0x9a8a50, 0.045, 0.045, 0.012, p.x, 0.065, p.z); }
    if (o.role === 'med') for (const sx of [-1, 1]) { const p = around(sk.R, -0.02, Math.PI / 2 - sx * 1.0, 0.05); B.add(P.box, 0x8a8260, 0.12, 0.14, 0.07, p.x, -0.04, p.z, 0, p.ry, 0); B.add(P.box, 0xf2f0e8, 0.05, 0.05, 0.002, p.x + Math.sin(p.ry) * 0.036, -0.03, p.z + Math.cos(p.ry) * 0.036, 0, p.ry, 0); }
  }
  function buildTorso(B, L, pal, o) {
    const C = common(), J = pal.jacket, Jd = shade(J, 0.8), W = pal.web, met = 0x6f6f66, dark = 0x2c2a22, t = L.tunic;
    B.cf = o.camo; B.add(C.torso, J); B.cf = null;
    const stand = t === 'de' || t === 'sov' || t === 'jp';
    B.add(stand ? C.collarStand : C.collarFold, t === 'de' ? pal.collar : J);
    if (!stand) for (const sx of [-1, 1]) B.add(P.box, J, 0.07, 0.012, 0.06, sx * 0.045, 0.475, 0.07, -0.95, 0, sx * 0.4);
    if (t === 'de') for (const sx of [-1, 1]) { B.add(P.box, 0xb8b8a8, 0.03, 0.008, 0.004, sx * 0.04, 0.51, 0.06, 0, sx * 0.5, 0); B.add(P.box, 0xb8b8a8, 0.03, 0.008, 0.004, sx * 0.04, 0.495, 0.062, 0, sx * 0.5, 0); }
    if (t === 'jp') for (const sx of [-1, 1]) B.add(P.box, 0xa8241c, 0.035, 0.025, 0.004, sx * 0.045, 0.5, 0.06, 0, sx * 0.55, 0);
    for (const sx of [-1, 1]) {                                                                // dragonas / platinas
      B.add(P.box, t === 'de' ? pal.collar : t === 'sov' ? shade(J, 0.9) : J, 0.11, 0.012, t === 'sov' || t === 'de' ? 0.05 : 0.036, sx * 0.145, 0.448, -0.005, 0, 0, sx * -0.42);
      B.add(P.box, t === 'uk' ? 0x7a2a22 : met, 0.01, 0.008, 0.01, sx * 0.1, 0.468, -0.005);
    }
    const chest = t !== 'sov';
    if (chest) for (const sx of [-1, 1]) {
      const p = surf(TORSO, sx * 0.085, 0.27, 1, 0.006);
      B.add(P.box, shade(J, 0.93), 0.1, 0.115, 0.016, p.x, 0.265, p.z, 0, p.ry, 0);
      B.add(P.box, dark, 0.004, 0.1, 0.018, p.x, 0.26, p.z + 0.002, 0, p.ry, 0);
      B.add(P.box, Jd, 0.106, 0.034, 0.022, p.x, 0.325, p.z + 0.004, 0.2, p.ry, 0);
      B.add(P.box, L.btn, 0.012, 0.012, 0.01, p.x, 0.316, p.z + 0.016, 0, p.ry, 0);
    }
    if (t === 'de') { const p = surf(TORSO, 0.09, 0.355, 1, 0.012); B.add(P.box, 0xb8b8a8, 0.075, 0.02, 0.004, p.x, 0.355, p.z, 0, p.ry, 0); }   // águia
    if (t === 'uk') B.add(P.box, Jd, 0.006, 0.47, 0.008, 0, 0.23, surf(TORSO, 0, 0.23, 1, 0.004).z);                                  // botões ocultos
    else if (t === 'sov') { B.add(C.placketShort, Jd); for (const y of [0.34, 0.4, 0.46]) B.add(P.box, L.btn, 0.012, 0.012, 0.008, 0, y, surf(TORSO, 0, y, 1, 0.01).z); }
    else { B.add(C.placket, Jd); for (const y of [0.04, 0.14, 0.24, 0.34, 0.43]) B.add(P.box, L.btn, 0.014, 0.014, 0.008, 0, y, surf(TORSO, 0, y, 1, 0.01).z); }
    if (t === 'para') for (const sx of [-1, 1]) { const p = surf(TORSO, sx * 0.09, 0.22, 1, 0.012); B.add(P.box, shade(J, 0.92), 0.12, 0.13, 0.03, p.x, 0.22, p.z, 0, p.ry, sx * 0.25); }
    gearTorso(B, L, pal, o);
  }
  function gearTorso(B, L, pal, o) {
    const W = pal.web, met = 0x6f6f66, g = L.gear, med = o.role === 'med';
    const susp = (x0, x1, back) => [-1, 1].map(sx => {
      const pts = [];
      for (let y = -0.02; y <= 0.42; y += 0.06) pts.push(sp(TORSO, sx * lerp(x0, x1, (y + 0.02) / 0.44), y, 1, 0.006));
      pts.push([sx * 0.105, 0.465, 0.04], [sx * 0.105, 0.47, -0.03]);
      for (let y = 0.42; y >= back; y -= 0.06) pts.push(sp(TORSO, sx * lerp(0.095, 0.03, (0.42 - y) / 0.4), y, -1, 0.006));
      return strap(pts, 0.03, 0.008, outT);
    });
    const packM1928 = (big) => {
      const pk = pal.pack, ps = shape('pack28', () => loft([ring(8, 0.06, 0.13, 0.05, 3.4, 0, -0.18), ring(8, 0.1, 0.15, 0.068, 3.4, 0, -0.188), ring(8, 0.38, 0.152, 0.072, 3.4, 0, -0.19), ring(8, 0.43, 0.13, 0.058, 3.4, 0, -0.184)], { flat: true }));
      B.add(ps, pk, 1, big ? 1 : 0.7, big ? 1 : 0.85, 0, big ? 0 : 0.12, 0);
      B.add(P.box, shade(pk, 0.86), 0.29, 0.13, 0.022, 0, 0.36, big ? -0.262 : -0.25, 0.08, 0, 0);
      for (const sx of [-1, 1]) { B.add(P.box, W, 0.022, big ? 0.36 : 0.26, 0.008, sx * 0.075, big ? 0.25 : 0.29, big ? -0.264 : -0.248); B.add(P.box, met, 0.028, 0.014, 0.012, sx * 0.075, 0.31, big ? -0.268 : -0.252); }
    };
    if (g === 'us' || g === 'para') {
      for (const s of shape('suspUS', () => susp(0.07, 0.1, 0.3))) B.add(s, W);
      if (!med) { const p = surf(TORSO, -0.085, 0.19, 1, 0.03); B.add(P.sph6, 0x474c2e, 0.022, 0.03, 0.022, p.x, 0.19, p.z); B.add(P.box, 0x474c2e, 0.012, 0.018, 0.012, p.x, 0.225, p.z); B.add(P.box, 0x5a5a50, 0.008, 0.04, 0.006, p.x + 0.014, 0.2, p.z + 0.008); }
      packM1928(g === 'us' && !med);
      if (g === 'us' && !med) {
        B.add(shape('roll', () => limb(10, [[-0.2, 0.05, 0.05], [-0.17, 0.056, 0.056], [0.17, 0.056, 0.056], [0.2, 0.05, 0.05]])), 0x6d6448, 1, 1, 1, 0, 0.485, -0.17, 0, 0, Math.PI / 2);
        for (const sx of [-1, 1]) B.add(P.box, W, 0.016, 0.125, 0.125, sx * 0.12, 0.485, -0.17);
        B.add(P.box, 0x4d5040, 0.13, 0.17, 0.035, 0, 0.02, -0.215); B.add(P.box, shade(0x4d5040, 0.8), 0.13, 0.035, 0.04, 0, 0.1, -0.215); B.add(P.cyl8, 0x5e4a30, 0.012, 0.14, 0.012, 0, -0.13, -0.215);
        B.add(P.box, 0x3d3f35, 0.022, 0.28, 0.016, -0.135, 0.2, -0.2, 0, 0, 0.05); B.add(P.box, 0x5a4630, 0.018, 0.08, 0.02, -0.14, 0.38, -0.2);
      }
      if (g === 'para') { for (const sx of [-1, 1]) { const p = surf(TORSO, sx * 0.13, 0.06, 1, 0.03); B.add(P.box, 0x6a6448, 0.06, 0.08, 0.04, p.x, 0.06, p.z, 0, p.ry, 0); } }
    } else if (g === 'de') {
      // suspensório em Y: duas tiras na frente, uma nas costas; marmita e lata da máscara de gás
      for (const s of shape('suspDE', () => [-1, 1].map(sx => {
        const pts = [];
        for (let y = -0.02; y <= 0.42; y += 0.06) pts.push(sp(TORSO, sx * lerp(0.085, 0.11, (y + 0.02) / 0.44), y, 1, 0.006));
        pts.push([sx * 0.11, 0.465, 0.04], [sx * 0.1, 0.47, -0.03]);
        for (const [x, y] of [[0.09, 0.42], [0.06, 0.34], [0.02, 0.26]]) pts.push(sp(TORSO, sx * x, y, -1, 0.006));
        return strap(pts, 0.028, 0.008, outT);
      }).concat([strap([0.26, 0.15, 0.04, -0.06].map(y => sp(TORSO, 0, y, -1, 0.006)), 0.03, 0.008, outT)]))) B.add(s, W);
      B.add(P.box, 0x8a8a80, 0.03, 0.03, 0.01, 0, 0.26, surf(TORSO, 0, 0.26, -1, 0.012).z);
      if (!med) {
        B.add(shape('mess', () => loft([ring(8, 0.08, 0.075, 0.04, 2.4, 0, 0), ring(8, 0.24, 0.075, 0.04, 2.4, 0, 0)])), 0x55594a, 1, 1, 1, -0.06, 0.06, -0.165);  // marmita
        const can = common().can;
        B.add(can, 0x56604f, 0.85, 1, 0.85, 0.07, 0.11, -0.17, 0, 0, 0.7);                                                          // lata da máscara
        for (const k of [-0.08, 0, 0.08]) B.add(P.cyl8, shade(0x56604f, 0.8), 0.045, 0.012, 0.045, 0.07 + Math.sin(0.7) * k * -1, 0.11 + Math.cos(0.7) * k, -0.17, 0, 0, 0.7);
      }
    } else if (g === 'uk') {
      // P37: dois bolsões no peito, correias cruzadas e mochila pequena alta
      for (const s of shape('suspUK', () => susp(0.1, 0.11, 0.3))) B.add(s, W);
      for (const sx of [-1, 1]) { const p = surf(TORSO, sx * 0.095, 0.13, 1, 0.04); B.add(P.box, W, 0.1, 0.13, 0.07, p.x, 0.13, p.z, -0.05, p.ry, 0); B.add(P.box, shade(W, 0.85), 0.104, 0.04, 0.074, p.x, 0.2, p.z + 0.002, -0.05, p.ry, 0); B.add(P.box, met, 0.012, 0.012, 0.01, p.x, 0.19, p.z + 0.04, 0, p.ry, 0); }
      B.add(P.box, pal.pack, 0.26, 0.22, 0.1, 0, 0.33, -0.18); B.add(P.box, shade(pal.pack, 0.85), 0.26, 0.07, 0.104, 0, 0.41, -0.18);
      for (const sx of [-1, 1]) B.add(P.box, W, 0.022, 0.2, 0.008, sx * 0.08, 0.32, -0.232);
    } else if (g === 'sov') {
      // gimnastiorka, bolsa nas costas e capote enrolado a tiracolo (skatka)
      B.add(shape('sackSOV', () => loft([ring(8, 0.08, 0.1, 0.05, 2.2, 0, -0.16), ring(8, 0.16, 0.13, 0.075, 2.2, 0, -0.18), ring(8, 0.32, 0.11, 0.065, 2.2, 0, -0.175), ring(8, 0.37, 0.05, 0.03, 2.2, 0, -0.16)])), pal.pack);
      if (!med) B.add(shape('skatka', () => {
        const pts = [], c = new V3(0.015, 0.21, 0.0), D = new V3(0.36, -0.52, 0).normalize(), Z = new V3(0, 0, 1);
        for (let i = 0; i <= 20; i++) { const a = i / 20 * Math.PI * 2; pts.push(c.clone().addScaledVector(D, Math.cos(a) * 0.335).addScaledVector(Z, Math.sin(a) * 0.17).toArray()); }
        return sweep(pts, 0.085, 0.085, (p) => [p[0] - 0.015, (p[1] - 0.21) * 0.3, p[2]], 8);
      }), pal.roll || 0x5d5a4a);
      B.add(shape('gasStrap', () => strap([[-0.11, 0.47, 0.0], ...[0.4, 0.28, 0.16, 0.04].map((y, i) => sp(TORSO, -0.06 + i * 0.07, y, 1, 0.01))], 0.025, 0.006, outT)), shade(pal.pack, 0.9));
    } else if (g === 'jp') {
      B.add(shape('jpStrap', () => strap([[0.11, 0.47, 0.0], ...[0.4, 0.28, 0.16, 0.04].map((y, i) => sp(TORSO, 0.06 - i * 0.07, y, 1, 0.01))], 0.025, 0.006, outT)), 0x7a7050);
      B.add(P.box, pal.pack, 0.25, 0.22, 0.09, 0, 0.3, -0.175); B.add(P.box, shade(pal.pack, 0.85), 0.25, 0.06, 0.094, 0, 0.38, -0.175);
      B.add(shape('rollJP', () => sweep(Array.from({ length: 13 }, (_, i) => { const a = Math.PI * (0.05 + 0.9 * i / 12); return [Math.cos(a) * 0.16, 0.42 + Math.sin(a) * 0.06 - 0.06, -0.18]; }), 0.05, 0.05, (p) => [p[0], p[1] - 0.36, 0], 6)), 0x6a6448);
    }
  }
  function buildHead(B, L, pal, o) {
    const C = common(), H = helmShape(L.helm), sk = pal.skin, stub = new THREE.Color(shade(sk, 0.82)), skc = new THREE.Color(sk);
    B.cf = (x, y, z, c) => (c.equals(skc) && y < 0.125 && y > 0.06 && z > -0.02 ? stub : c);
    B.add(C.neck, sk); B.add(C.head, sk);
    B.cf = null;
    B.add(P.box, sk, 0.026, 0.045, 0.036, 0, 0.158, 0.108, -0.3, 0, 0);
    B.add(P.box, shade(sk, 0.88), 0.12, 0.016, 0.02, 0, 0.193, 0.094);
    B.add(P.box, 0x6e4034, 0.038, 0.008, 0.008, 0, 0.11, 0.1);
    for (const sx of [-1, 1]) {
      B.add(P.box, shade(sk, 0.72), 0.034, 0.02, 0.006, sx * 0.031, 0.177, 0.093);
      B.add(P.box, 0xe9e3d6, 0.022, 0.011, 0.006, sx * 0.031, 0.177, 0.096);
      B.add(P.box, 0x241a12, 0.011, 0.011, 0.006, sx * 0.031, 0.177, 0.098);
      B.add(P.box, 0x3a2a1c, 0.038, 0.009, 0.008, sx * 0.033, 0.197, 0.098, 0, 0, sx * -0.12);
      B.add(P.sph6, sk, 0.014, 0.03, 0.02, sx * 0.077, 0.165, 0.0);
    }
    const hc = pal.helm;
    B.cf = o.camoHelm; B.add(H.shell, hc); B.cf = null;
    B.add(H.rim, shade(hc, 0.85));
    if (H.crest) B.add(H.crest, shade(hc, 0.9));
    const net = L.helm === 'm1' || L.helm === 'brodie' || (L.helm === 'type90' && o.variant !== 0) || (L.helm === 'stahl' && o.variant === 1 && !o.camoHelm);
    if (net && H.net) for (const g of H.net) B.add(g, L.helm === 'stahl' ? 0x3a3a30 : shade(hc, 0.6));
    if (L.helm === 'type90') B.add(P.box, 0xd9b52a, 0.03, 0.03, 0.008, 0, 0.26, 0.142, -0.3, 0, Math.PI / 4);
    if (L.helm === 'm1' || L.helm === 'brodie') for (const sx of [-1, 1]) B.add(shape('chin' + sx, () => strap([[sx * 0.134, 0.2, 0.0], [sx * 0.125, 0.15, 0.012], [sx * 0.11, 0.1, 0.01], [sx * 0.1, 0.075, 0.0]], 0.013, 0.004, (p) => [p[0], 0, 0.1])), pal.band || 0x3e432c);
    else B.add(P.box, 0x1d1b19, 0.008, 0.11, 0.008, 0.11, 0.14, 0.03, 0, 0, -0.1);
    if (o.variant === 1 && (L.helm === 'm1' || L.helm === 'brodie' || L.helm === 'type90'))
      for (const [a, y, s, c] of [[0.4, 0.3, 1, 0x56603a], [2.0, 0.27, 1.1, 0x8a7a55], [3.6, 0.31, 0.9, 0x4e5a35], [5.0, 0.25, 1, 0x7a6e4a]])
        B.add(P.box, c, 0.06 * s, 0.008, 0.024, Math.cos(a) * 0.11, y, Math.sin(a) * 0.12, 0.3, a, 0.5);
    if (o.role === 'med' && L.helm === 'm1') for (const [x, z, ry] of [[0, 0.143, 0], [0, -0.16, Math.PI], [0.128, -0.005, Math.PI / 2], [-0.128, -0.005, -Math.PI / 2]]) {
      B.add(P.cyl8, 0xf2f0e8, 0.04, 0.004, 0.04, x, 0.262, z, Math.PI / 2 - 0.35 * (z > 0.1 ? 1 : z < -0.1 ? -1 : 0), ry, 0);
      B.add(P.box, 0xb3241d, 0.05, 0.016, 0.006, x * 1.04, 0.262, z * 1.04, 0, ry, 0); B.add(P.box, 0xb3241d, 0.016, 0.05, 0.006, x * 1.04, 0.262, z * 1.04, 0, ry, 0);
    }
  }
  function buildUpper(B, L, pal, o, side) {
    const C = common();
    B.cf = o.camo; B.add(P.sph, pal.jacket, 0.06, 0.062, 0.06, -side * 0.012, -0.004, 0); B.add(C.sleeve, pal.jacket); B.cf = null;
    if (side < 0 && L === LOOK.USA) { B.add(P.box, 0x5a5c3e, 0.006, 0.05, 0.04, -0.056, -0.07, 0); B.add(P.box, 0xa8241c, 0.007, 0.035, 0.01, -0.059, -0.07, 0); }
    if (side > 0 && L.tunic === 'para') { B.add(P.box, 0xb22234, 0.006, 0.035, 0.05, 0.056, -0.06, 0); B.add(P.box, 0x3c3b6e, 0.007, 0.018, 0.02, 0.057, -0.05, -0.014); }
    if (side < 0 && L.tunic === 'de') B.add(P.box, 0xb8b8a8, 0.006, 0.03, 0.04, -0.055, -0.08, 0);
    if (o.role === 'med' && side < 0) { B.add(C.band, 0xf2f0e8); B.add(P.box, 0xb3241d, 0.11, 0.032, 0.012, 0, -0.085, 0, 0, Math.PI / 2, 0); B.add(P.box, 0xb3241d, 0.11, 0.012, 0.032, 0, -0.085, 0, 0, Math.PI / 2, 0); }
    if (o.variant === 2 && L.tunic === 'us') for (let i = 0; i < 3; i++) B.add(P.box, 0xc9b25a, 0.006, 0.012, 0.06, side * 0.052, -0.09 - i * 0.022, 0);
  }
  function buildFore(B, L, pal, o) {
    const C = common();
    B.cf = o.camo; B.add(P.sph6, pal.jacket, 0.044, 0.044, 0.046); B.add(C.fore, pal.jacket); B.cf = null;
    B.add(C.cuff, shade(pal.jacket, 0.85)); B.add(C.wrist, pal.skin);
  }
  function buildHand(B, L, pal) {
    const C = common(), sk = pal.skin;
    B.add(C.palm, sk); B.add(C.fingers, shade(sk, 0.95));
    for (let i = 0; i < 4; i++) B.add(P.box, shade(sk, 0.86), 0.004, 0.012, 0.012, -0.03 + i * 0.02, -0.093, 0.037);
    B.add(P.box, sk, 0.04, 0.018, 0.02, 0.028, -0.045, 0.028, 0, 0, -0.4);
  }
  function buildThigh(B, L, pal, side) {
    const C = common();
    B.add(P.sph, pal.pants, 0.088, 0.08, 0.092); B.add(C.thigh, pal.pants);
    B.add(P.box, shade(pal.pants, 0.78), 0.05, 0.006, 0.006, 0, 0.0, 0.098, 0, 0, 0.7);
    if (L.tunic === 'para') { B.add(P.box, shade(pal.pants, 0.93), 0.03, 0.13, 0.11, side * 0.09, -0.2, 0.01); B.add(P.box, shade(pal.pants, 0.8), 0.034, 0.03, 0.112, side * 0.091, -0.13, 0.01); }
    if (L.tunic === 'uk' && side < 0) { B.add(P.box, shade(pal.pants, 0.93), 0.11, 0.13, 0.024, -0.02, -0.17, 0.092, 0, -0.35, 0); B.add(P.box, shade(pal.pants, 0.8), 0.112, 0.03, 0.03, -0.02, -0.105, 0.094, 0, -0.35, 0); }
  }
  function buildShin(B, L, pal, side) {
    const C = common(), lg = L.legs, Lc = pal.legging;
    B.add(P.sph, pal.pants, 0.057, 0.057, 0.06, 0, 0, 0.004);
    if (lg === 'leggings') {
      B.add(C.trouserLo, pal.pants); B.add(C.legging, Lc);
      for (let i = 0; i < 6; i++) { const y = -0.15 - i * 0.042, r = lerp(0.057, 0.051, i / 5); B.add(P.box, 0x4a4535, 0.01, 0.008, 0.01, side * (r + 0.003), y, 0.012); }
      B.add(P.box, shade(Lc, 0.85), 0.006, 0.24, 0.018, side * 0.054, -0.27, 0.012);
    } else if (lg === 'jackboots') {
      B.add(C.trouserShort, pal.pants); B.add(C.shaft, pal.boot); B.add(P.box, shade(pal.boot, 1.6), 0.13, 0.012, 0.138, 0, -0.08, 0);
    } else if (lg === 'puttees') {
      B.add(C.trouserShort, pal.pants); B.add(C.puttee, Lc);
      for (let i = 0; i < 6; i++) { const y = -0.13 - i * 0.048, r = lerp(0.06, 0.05, i / 5); B.add(P.cyl8, shade(Lc, 0.82), r * 1.03, 0.008, r * 1.08, 0, y, 0, 0.12, 0, 0.22 * side); }
    } else if (lg === 'anklets') {
      B.add(C.trouserLong, pal.pants); B.add(C.anklet, Lc);
      for (const y of [-0.355, -0.395]) B.add(P.box, shade(Lc, 0.8), 0.014, 0.012, 0.03, side * 0.056, y, 0.01);
    } else if (lg === 'jumpboots') {
      B.add(C.trouserLo, pal.pants); B.add(C.shaft, pal.boot, 1, 0.9, 1, 0, -0.04, 0);
      for (let i = 0; i < 6; i++) B.add(P.box, 0x2a1a10, 0.03, 0.005, 0.008, 0, -0.2 - i * 0.035, 0.059);
    }
  }
  function buildFoot(B, L, pal) {
    const C = common();
    B.add(C.bootTop, pal.boot); B.add(C.boot, pal.boot);
    if (L.legs === 'leggings') B.add(P.box, shade(pal.legging, 0.75), 0.098, 0.012, 0.02, 0, -0.06, -0.01);
    B.add(P.box, 0x241c15, 0.08, 0.012, 0.235, 0, -0.077, 0.048);
    B.add(P.box, 0x241c15, 0.072, 0.02, 0.065, 0, -0.073, -0.042);
  }

  /* ---------- armas (origem no punho da mão direita, +z para a frente) ---------- */
  const sling = (z0, z1, y0, y1, sag) => strap(Array.from({ length: 9 }, (_, i) => { const t = i / 8; return [0, lerp(y0, y1, t) - Math.sin(t * Math.PI) * sag, lerp(z0, z1, t)]; }), 0.016, 0.004, () => [1, 0, 0]);
  const WPN = {
    garand: { hold: 'rifle', L: [0, 0.0, 0.3], build(B) {
      const S = shape('garand', () => ({
        stock: zloft(8, [[-0.355, 0.015, -0.118, 0.021], [-0.28, 0.014, -0.102, 0.021], [-0.18, 0.01, -0.064, 0.019], [-0.085, 0.002, -0.04, 0.016], [-0.015, -0.004, -0.046, 0.0135],
          [0.04, 0.008, -0.052, 0.016], [0.1, 0.012, -0.03, 0.018], [0.3, 0.012, -0.026, 0.017], [0.47, 0.01, -0.024, 0.015], [0.5, 0.004, -0.02, 0.011]], 2.8),
        hgR: zloft(6, [[0.215, 0.045, 0.012, 0.014], [0.32, 0.045, 0.012, 0.015]], 2.6), hgF: zloft(6, [[0.355, 0.044, 0.012, 0.014], [0.53, 0.042, 0.012, 0.013], [0.545, 0.036, 0.014, 0.011]], 2.6),
        sling: sling(0.45, -0.26, -0.026, -0.1, 0.06) }));
      const w = 0x87512c, m = 0x2b2c2a;
      B.add(S.stock, w); B.add(S.hgR, w); B.add(S.hgF, w);
      B.add(P.box, m, 0.044, 0.135, 0.008, 0, -0.051, -0.357); B.add(P.box, m, 0.03, 0.036, 0.2, 0, 0.03, 0.115); B.add(P.box, 0x161616, 0.02, 0.006, 0.07, 0, 0.049, 0.12);
      B.add(P.box, m, 0.028, 0.026, 0.032, 0, 0.056, 0.03); B.add(P.box, m, 0.012, 0.03, 0.055, 0, -0.035, 0.065);
      B.add(P.box, m, 0.006, 0.012, 0.32, 0.017, 0.022, 0.36); B.add(P.box, m, 0.012, 0.012, 0.02, 0.022, 0.035, 0.2);
      B.add(P.cyl8, m, 0.009, 0.25, 0.009, 0, 0.028, 0.66, Math.PI / 2, 0, 0); B.add(P.cyl8, m, 0.013, 0.06, 0.013, 0, 0.022, 0.745, Math.PI / 2, 0, 0);
      B.add(P.box, m, 0.006, 0.026, 0.01, 0, 0.048, 0.765); for (const z of [0.34, 0.55]) B.add(P.box, m, 0.035, 0.05, 0.012, 0, 0.018, z);
      B.add(S.sling, 0x5c3c22);
    } },
    thompson: { hold: 'rifle', L: [0, -0.07, 0.24], build(B) {
      const w = 0x7a4a28, m = 0x262726;
      B.add(shape('tmpStock', () => zloft(6, [[-0.32, 0.01, -0.11, 0.019], [-0.2, 0.008, -0.07, 0.017], [-0.06, 0.012, -0.03, 0.015]], 2.8)), w);
      B.add(P.box, w, 0.026, 0.09, 0.04, 0, -0.06, 0.0, 0.25, 0, 0);                     // punho
      B.add(P.box, m, 0.038, 0.05, 0.25, 0, 0.022, 0.07); B.add(P.box, m, 0.014, 0.014, 0.03, 0.026, 0.04, 0.04);
      B.add(P.box, w, 0.026, 0.085, 0.035, 0, -0.045, 0.24, 0.2, 0, 0);                 // empunhadura vertical
      B.add(P.cyl8, m, 0.016, 0.2, 0.016, 0, 0.026, 0.3, Math.PI / 2, 0, 0);
      for (let i = 0; i < 5; i++) B.add(P.cyl8, m, 0.02, 0.006, 0.02, 0, 0.026, 0.22 + i * 0.022, Math.PI / 2, 0, 0);
      B.add(P.box, m, 0.024, 0.03, 0.05, 0, 0.026, 0.42); B.add(P.box, 0x1e1e1e, 0.022, 0.13, 0.03, 0, -0.06, 0.12);
      B.add(shape('tmpSling', () => sling(0.25, -0.3, -0.02, -0.09, 0.05)), 0x5a4a30);
    } },
    kar98: { hold: 'rifle', L: [0, 0.0, 0.3], build(B, o) { boltRifle(B, Object.assign({ muzzle: 0.75, fore: 0.57, wood: 0x5e3b22, bolt: 'down' }, o)); } },
    enfield: { hold: 'rifle', L: [0, 0.0, 0.3], build(B, o) { boltRifle(B, Object.assign({ muzzle: 0.73, fore: 0.62, wood: 0x6b4428, bolt: 'down', mag: true, guard: true }, o)); } },
    mosin: { hold: 'rifle', L: [0, 0.0, 0.32], build(B, o) { boltRifle(B, Object.assign({ muzzle: 0.86, fore: 0.75, wood: 0x7a4a26, bolt: 'straight', bayonet: 0.38, spike: true }, o)); } },
    arisaka: { hold: 'rifle', L: [0, 0.0, 0.3], build(B, o) { boltRifle(B, Object.assign({ muzzle: 0.76, fore: 0.64, wood: 0x8a5a30, bolt: 'straight', bayonet: 0.38, cover: true }, o)); } },
    carcano: { hold: 'rifle', L: [0, 0.0, 0.3], build(B, o) { boltRifle(B, Object.assign({ muzzle: 0.72, fore: 0.6, wood: 0x7a5030, bolt: 'down', mag: true }, o)); } },
    mas36: { hold: 'rifle', L: [0, 0.0, 0.3], build(B, o) { boltRifle(B, Object.assign({ muzzle: 0.7, fore: 0.56, wood: 0x6e4a2a, bolt: 'down', guard: true }, o)); } },
    mp40: { hold: 'rifle', L: [0, -0.07, 0.13], build(B) {
      const m = 0x232323;
      for (const sx of [-1, 1]) B.add(P.box, m, 0.006, 0.012, 0.25, sx * 0.016, 0.0, -0.15, 0.08, 0, 0);
      B.add(P.box, m, 0.04, 0.06, 0.012, 0, -0.01, -0.28);
      B.add(P.cyl8, m, 0.02, 0.32, 0.02, 0, 0.02, 0.09, Math.PI / 2, 0, 0); B.add(P.box, 0x3a2a20, 0.024, 0.085, 0.03, 0, -0.05, 0.0, 0.2, 0, 0);
      B.add(P.box, m, 0.03, 0.04, 0.12, 0, -0.012, 0.11); B.add(P.box, m, 0.022, 0.19, 0.026, 0, -0.12, 0.13);
      B.add(P.cyl8, m, 0.011, 0.14, 0.011, 0, 0.02, 0.31, Math.PI / 2, 0, 0); B.add(P.box, m, 0.012, 0.025, 0.02, 0, -0.005, 0.36);
      B.add(P.box, m, 0.012, 0.012, 0.03, 0.026, 0.03, 0.02);
    } },
    ppsh: { hold: 'rifle', L: [0, -0.02, 0.2], build(B) {
      const w = 0x7a4a26, m = 0x252525;
      B.add(shape('ppshStock', () => zloft(6, [[-0.34, 0.012, -0.11, 0.02], [-0.2, 0.008, -0.07, 0.018], [-0.04, 0.006, -0.04, 0.016], [0.16, 0.006, -0.025, 0.016]], 2.8)), w);
      B.add(P.box, m, 0.034, 0.04, 0.12, 0, 0.026, 0.04);
      B.add(P.cyl8, m, 0.022, 0.22, 0.022, 0, 0.028, 0.25, Math.PI / 2, 0, 0);
      for (let i = 0; i < 4; i++) B.add(P.box, 0x101010, 0.044, 0.008, 0.012, 0, 0.028, 0.17 + i * 0.045);
      B.add(P.box, m, 0.03, 0.035, 0.03, 0, 0.03, 0.37);
      B.add(P.cyl8, m, 0.09, 0.05, 0.09, 0, -0.1, 0.06, 0, 0, Math.PI / 2);
      B.add(P.box, m, 0.012, 0.03, 0.05, 0, -0.03, -0.0);
    } },
    bazooka: { hold: 'tube', L: [0, 0.0, 0.34], build(B) {
      const t = 0x4a4f2e;
      B.add(shape('bzTube', () => limb(10, [[-0.55, 0.05, 0.05], [-0.5, 0.042, 0.042], [0.8, 0.042, 0.042], [0.82, 0.046, 0.046]])), t, 1, 1, 1, 0, 0.09, 0, Math.PI / 2, 0, 0);
      B.add(P.cone, t, 0.07, 0.12, 0.07, 0, 0.09, -0.6, -Math.PI / 2, 0, 0);
      B.add(P.box, 0x6e4527, 0.04, 0.07, 0.24, 0, 0.04, -0.15); B.add(P.box, 0x2a2b2b, 0.024, 0.09, 0.035, 0, -0.03, 0.0, 0.2, 0, 0);
      B.add(P.box, 0x2a2b2b, 0.024, 0.08, 0.03, 0, 0.0, 0.34, 0.15, 0, 0); B.add(P.box, 0x2a2b2b, 0.05, 0.05, 0.015, -0.05, 0.14, 0.35);
      B.add(P.box, 0x3a3a30, 0.05, 0.035, 0.08, 0.0, 0.04, 0.12);
    } },
    pzschreck: { hold: 'tube', L: [0, 0.0, 0.38], build(B) {
      const t = 0x56584a;
      B.add(shape('psTube', () => limb(10, [[-0.62, 0.052, 0.052], [0.95, 0.052, 0.052], [0.98, 0.056, 0.056]])), t, 1, 1, 1, 0, 0.1, 0, Math.PI / 2, 0, 0);
      B.add(P.box, 0x5d6052, 0.34, 0.3, 0.012, -0.06, 0.13, 0.42); B.add(P.box, 0x1b1b1b, 0.08, 0.05, 0.016, -0.03, 0.17, 0.42);
      B.add(P.box, 0x2a2b2b, 0.024, 0.09, 0.035, 0, -0.03, 0.0, 0.2, 0, 0); B.add(P.box, 0x2a2b2b, 0.024, 0.08, 0.03, 0, 0.0, 0.38, 0.15, 0, 0);
      B.add(P.box, 0x45473b, 0.08, 0.04, 0.1, 0, 0.06, -0.2);
    } },
    mortar: { hold: 'rifle', L: [0, 0.0, 0.22], build(B) {
      const m = 0x3a3a32;
      B.add(P.cyl8, m, 0.026, 0.3, 0.026, 0, 0.02, 0.2, Math.PI / 2, 0, 0); B.add(P.cyl8, 0x2a2a26, 0.016, 0.25, 0.016, 0, 0.02, -0.07, Math.PI / 2, 0, 0);
      B.add(P.box, m, 0.08, 0.02, 0.06, 0, -0.01, -0.2, 0.4, 0, 0); B.add(P.box, 0x2a2a26, 0.02, 0.06, 0.02, 0, -0.02, 0.0);
    } },
    none: { hold: 'none' },
  };
  function boltRifle(B, o) {
    const key = 'bolt' + o.muzzle + o.fore + (o.mag ? 'm' : '') + (o.cover ? 'c' : '');
    const S = shape(key, () => ({
      stock: zloft(8, [[-0.355, 0.014, -0.112, 0.021], [-0.27, 0.012, -0.094, 0.02], [-0.16, 0.008, -0.056, 0.018], [-0.06, 0.0, -0.036, 0.0145], [0.0, 0.004, -0.046, 0.016],
        [0.08, 0.01, -0.036, 0.018], [0.2, 0.01, -0.026, 0.017], [o.fore - 0.03, 0.008, -0.022, 0.014], [o.fore, 0.004, -0.018, 0.011]], 2.8),
      hg: zloft(6, [[0.15, 0.04, 0.01, 0.014], [o.fore - 0.06, 0.038, 0.01, 0.013], [o.fore - 0.045, 0.032, 0.012, 0.011]], 2.6),
      sling: sling(o.fore - 0.12, -0.26, -0.024, -0.1, 0.06) }));
    const w = o.wood, m = 0x2b2c2a;
    B.add(S.stock, w); B.add(S.hg, w);
    B.add(P.box, m, 0.042, 0.13, 0.008, 0, -0.049, -0.357);
    B.add(P.cyl8, m, 0.016, 0.16, 0.016, 0, 0.026, 0.06, Math.PI / 2, 0, 0);                        // caixa da culatra
    if (o.bolt === 'down') { B.add(P.cyl6, m, 0.006, 0.07, 0.006, 0.032, 0.008, 0.01, 0, 0, 1.15); B.add(P.sph6, m, 0.012, 0.012, 0.012, 0.062, -0.012, 0.01); }
    else { B.add(P.cyl6, m, 0.006, 0.07, 0.006, 0.04, 0.026, 0.01, 0, 0, Math.PI / 2); B.add(P.sph6, m, 0.012, 0.012, 0.012, 0.075, 0.026, 0.01); }
    if (o.cover) B.add(P.box, m, 0.034, 0.012, 0.09, 0, 0.044, 0.05);
    if (o.mag) B.add(P.box, m, 0.026, 0.05, 0.07, 0, -0.06, 0.09);
    B.add(P.box, m, 0.012, 0.028, 0.06, 0, -0.035, 0.03);
    B.add(P.box, m, 0.022, 0.018, 0.04, 0, 0.048, 0.16);                                            // alça de mira
    if (o.guard) B.add(P.box, m, 0.02, 0.03, 0.02, 0, 0.05, 0.2);
    B.add(P.cyl8, m, 0.0085, o.muzzle - o.fore + 0.06, 0.0085, 0, 0.025, (o.muzzle + o.fore - 0.06) / 2, Math.PI / 2, 0, 0);
    B.add(P.box, m, 0.032, 0.046, 0.03, 0, 0.012, o.fore - 0.01);                                    // ponteira
    B.add(P.box, m, 0.034, 0.048, 0.012, 0, 0.012, o.fore - 0.2);
    B.add(P.box, m, 0.006, 0.022, 0.012, 0, 0.044, o.muzzle - 0.02);
    if (o.bayonet) {
      if (o.spike) B.add(P.cyl6, 0x9a9e9e, 0.005, o.bayonet, 0.005, 0.012, 0.018, o.muzzle + o.bayonet / 2 - 0.05, Math.PI / 2, 0, 0);
      else B.add(P.box, 0xb0b4b4, 0.004, 0.022, o.bayonet, 0, -0.005, o.muzzle + o.bayonet / 2 - 0.06);
    }
    B.add(S.sling, 0x4a3420);
  }

  /* ---------- montagem ---------- */
  const _cache = new Map();
  function geo(key, fn) { let g = _cache.get(key); if (!g) { const B = new MB(); fn(B); g = B.build(); _cache.set(key, g); } return g; }
  let MAT = null;
  function material() { return MAT || (MAT = (typeof VC_MAT !== 'undefined' ? VC_MAT : new THREE.MeshLambertMaterial({ vertexColors: true }))); }
  const mesh = (g, parent, cast) => { const m = new THREE.Mesh(g, material()); m.castShadow = cast !== false; parent.add(m); return m; };
  const grp = (parent, x, y, z) => { const g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); parent.add(g); return g; };
  const ROLE = { medic: 'med', sani: 'med', jmedic: 'med', para: 'para', bazooka: 'at', pzschreck: 'at', jat: 'at' };

  // o: nat (EUA = 'USA', 'GER', 'ENG', 'SOV', 'JAP', ...), kind, variant, skin, pal (cores), scale, biome
  function make(o) {
    o = o || {};
    const role = ROLE[o.kind] || '';
    const nat = role === 'para' && (o.nat || 'USA') === 'USA' ? 'USA_PARA' : (o.nat || 'USA');
    const L = LOOK[nat] || LOOK.USA;
    const variant = o.variant !== undefined ? o.variant : (Math.random() * 3) | 0;
    const skins = L.asian ? SKINS_AS : SKINS, skin = (o.skin !== undefined ? o.skin : (Math.random() * skins.length) | 0) % skins.length;
    const pal = Object.assign({}, BASE, L.pal, o.pal || {}, { skin: skins[skin] });
    const biome = o.biome || '';
    if (biome === 'desert' && (nat === 'GER' || nat === 'ITA')) Object.assign(pal, { jacket: 0xa08e60, pants: 0x9a885a, helm: 0x9c8c62, web: 0x6a5032, pack: 0x9a8a60, boot: 0x5a4028 });
    if (biome === 'desert' && nat === 'ENG') Object.assign(pal, { jacket: 0xb09a70, pants: 0xa8946a });
    let wk = role === 'med' ? 'none' : role === 'at' ? L.at : variant === 2 ? L.smg : L.rifle;
    if (role === 'at' && wk === 'none') wk = L.rifle;
    if (o.kind === 'jat') wk = 'mortar';
    const W = WPN[wk] || WPN.garand;
    const ck = biome === 'winter' && variant === 1 ? 'snow' : (nat === 'GER' && variant === 1 && biome !== 'desert') ? 'splinter' : '';
    const opts = { role, variant, camo: ck ? camo(ck, pal.jacket) : null, camoHelm: biome === 'winter' && variant === 1 ? camo('snow', pal.helm) : null };
    const key = nat + '|' + JSON.stringify(pal) + variant + role + ck;
    const root = new THREE.Group(); root.rotation.order = 'YXZ';
    const body = grp(root);
    const pelvis = grp(body, 0, M.pelvisY, 0); mesh(geo('pel' + key, B => buildPelvis(B, L, pal, opts)), pelvis);
    const torso = grp(pelvis, 0, M.spineY, 0); torso.rotation.order = 'YXZ'; mesh(geo('tor' + key, B => buildTorso(B, L, pal, opts)), torso);
    const neck = grp(torso, 0, M.neckY, -0.01); neck.rotation.order = 'YXZ'; mesh(geo('head' + key, B => buildHead(B, L, pal, opts)), neck);
    const J = { root, body, pelvis, torso, neck };
    for (const [s, n] of [[-1, 'L'], [1, 'R']]) {
      const sh = grp(torso, s * M.shX, M.shY, -0.005); mesh(geo('up' + s + key, B => buildUpper(B, L, pal, opts, s)), sh, false);
      const el = grp(sh, 0, -M.upper, 0); mesh(geo('fo' + key, B => buildFore(B, L, pal, opts)), el, false);
      const hd = grp(el, 0, -M.fore, 0); mesh(geo('hand' + key, B => buildHand(B, L, pal)), hd, false);
      const hip = grp(pelvis, s * M.hipX, 0, 0); mesh(geo('th' + s + key, B => buildThigh(B, L, pal, s)), hip, false);
      const kn = grp(hip, 0, -M.thigh, 0); mesh(geo('sh' + s + key, B => buildShin(B, L, pal, s)), kn, false);
      const an = grp(kn, 0, -M.shin, 0); mesh(geo('ft' + key, B => buildFoot(B, L, pal)), an, false);
      Object.assign(J, { ['sh' + n]: sh, ['el' + n]: el, ['hand' + n]: hd, ['hip' + n]: hip, ['knee' + n]: kn, ['ankle' + n]: an });
    }
    const rifle = grp(body);
    if (W.build) mesh(geo('w' + wk, B => W.build(B, {})), rifle, false);
    J.rifle = rifle;
    if (typeof blob === 'function' && o.scale === undefined) blob(root, 1.4);
    // escala externa igual à do soldado antigo (1,12); o resto fica no grupo interno
    root.scale.setScalar(o.scale !== undefined ? o.scale : 1.12);
    body.scale.setScalar(o.scale !== undefined ? 1 : GAME_SCALE / 1.12);
    root.userData = { s3: true, J, W, st: null, ph: Math.random() * 6, nat,
      legL: J.hipL, legR: J.hipR, shinL: J.kneeL, shinR: J.kneeR, armL: J.shL, armR: J.shR, foreL: J.elL, foreR: J.elR, rifle, tube: W.hold === 'tube' };
    pose(root, {}, 1);
    return root;
  }

  /* ---------- poses ---------- */
  // arma no espaço do corpo: punho (mão direita), direção do cano e "cima" da arma
  const HOLD = {
    rifle: { ready: { p: [0.17, 1.0, 0.05], d: [-0.61, -0.06, 0.79], u: [0.3, 1, 0.15] }, port: { p: [0.12, 1.08, 0.12], d: [-0.6, 0.62, 0.5], u: [0.1, 0.45, -1] }, aim: { p: [0.06, 1.5, 0.33], d: [-0.02, 0, 1], u: [0, 1, 0] } },
    tube: { ready: { p: [0.2, 1.41, 0.12], d: [0, 0.3, 1], u: [0, 1, -0.3] }, port: { p: [0.2, 1.41, 0.1], d: [0, 0.4, 1], u: [0, 1, -0.4] }, aim: { p: [0.2, 1.42, 0.15], d: [0, 0.02, 1], u: [0, 1, 0] } },
  };
  const GRIP_R = new V3(0, -0.022, -0.012), HAND_OFF = new V3(0, -0.058, 0.012);
  function target(st, hold) {
    const T = { pel: 0.95, lean: 0.02, twist: 0, nx: 0, ny: 0, nz: 0, shR: 0, hip: [-0.05, 0.04], knee: [0.08, 0.08], spread: 0.06, rifle: 'ready', kneel: 0 };
    const aim = st.aim && hold !== 'none';
    if (st.crouch) {
      Object.assign(T, { pel: 0.56, lean: 0.12, hip: [-1.45, -0.28], knee: [1.5, 1.75], spread: 0.1, kneel: 1, rifle: aim ? 'aim' : 'ready' });
      if (aim) Object.assign(T, { twist: -0.22, nx: 0.22, ny: 0.2, nz: -0.12, lean: 0.14, shR: 0.025 });
      if (st.heal) Object.assign(T, { lean: 0.42, nx: 0.25 });
    } else if (aim) Object.assign(T, { pel: 0.94, lean: 0.1, twist: -0.22, nx: 0.24, ny: 0.2, nz: -0.14, shR: 0.025, hip: [-0.25, 0.14], knee: [0.16, 0.06], spread: 0.1, rifle: 'aim' });
    else if (st.moving) Object.assign(T, { lean: st.speed > 9 ? 0.2 : 0.1, rifle: 'port' });
    if (hold === 'tube') Object.assign(T, { twist: 0, ny: 0, nz: aim ? -0.08 : 0, nx: aim ? 0.08 : 0 });
    return T;
  }
  // temporários reaproveitados (sem lixo de memória a cada quadro)
  const tA = new V3(), tB = new V3(), tU = new V3(), tV = new V3(), tF = new V3(), tE = new V3(), tT = new V3(), tG = new V3(), tX = new V3(), tY = new V3(), tZ = new V3(), tP = new V3();
  const qA = new Q(), qB = new Q(), qH = new Q(), qI = new Q(), qT = new Q(), mI = new THREE.Matrix4(), mB = new THREE.Matrix4(), DOWN = new V3(0, -1, 0);
  // IK de dois ossos: a mão segura o ponto gripW com o eixo x da mão ao longo de axisW
  function armIK(J, n, gripW, axisW, poleW) {
    const sh = J['sh' + n], el = J['el' + n], hd = J['hand' + n];
    mI.copy(J.torso.matrixWorld).invert();
    const grip = tG.copy(gripW).applyMatrix4(mI);
    J.torso.getWorldQuaternion(qT); qI.copy(qT).invert();
    const axis = tX.copy(axisW).applyQuaternion(qI).normalize(), pole = tP.copy(poleW).applyQuaternion(qI).normalize();
    const S = sh.position, a = M.upper, b = M.fore;
    tF.copy(grip).sub(S).normalize();
    for (let it = 0; it < 2; it++) {
      tY.copy(tF).addScaledVector(axis, -tF.dot(axis)).negate();
      if (tY.lengthSq() < 1e-6) tY.set(0, 1, 0); tY.normalize();
      tZ.crossVectors(axis, tY);
      qH.setFromRotationMatrix(mB.makeBasis(axis, tY, tZ));
      tT.copy(HAND_OFF).applyQuaternion(qH); tT.subVectors(grip, tT);
      tA.copy(tT).sub(S); const d = clamp(tA.length(), Math.abs(a - b) + 0.01, (a + b) * 0.999);
      tU.copy(tA).normalize(); tV.copy(pole).addScaledVector(tU, -pole.dot(tU)).normalize();
      const ca = (a * a + d * d - b * b) / (2 * a * d), sa = Math.sqrt(Math.max(0, 1 - ca * ca));
      tE.copy(S).addScaledVector(tU, a * ca).addScaledVector(tV, a * sa);
      tB.copy(tE).sub(S).normalize(); qA.setFromUnitVectors(DOWN, tB);
      tF.copy(S).addScaledVector(tU, d).sub(tE).normalize();
      tB.copy(tF).applyQuaternion(qI.copy(qA).invert()); qB.setFromUnitVectors(DOWN, tB);
    }
    sh.quaternion.copy(qA); el.quaternion.copy(qB);
    hd.quaternion.copy(qA).multiply(qB).invert().multiply(qH);
  }
  const _w0 = new V3(), _w1 = new V3(), _ax = new V3(), _po = new V3(), _gq = new Q(), _rm = new THREE.Matrix4(), _rd = new V3(), _ru = new V3(), _rx = new V3(), _ry = new V3();
  function pose(g, st, dt) {
    const ud = g.userData, J = ud.J, W = ud.W, hold = W.hold, k = Math.min(1, (dt || 0.016) * 9);
    const T = target(st, hold);
    const H = HOLD[hold === 'tube' ? 'tube' : 'rifle'];
    let C = ud.st;
    if (!C) C = ud.st = Object.assign({ move: 0, rp: H.ready.p.slice(), rd: H.ready.d.slice(), ru: H.ready.u.slice() }, T, { hip: T.hip.slice(), knee: T.knee.slice() });
    for (const f of ['pel', 'lean', 'twist', 'nx', 'ny', 'nz', 'shR', 'spread', 'kneel']) C[f] = lerp(C[f], T[f], k);
    for (let i = 0; i < 2; i++) { C.hip[i] = lerp(C.hip[i], T.hip[i], k); C.knee[i] = lerp(C.knee[i], T.knee[i], k); }
    C.move = lerp(C.move, st.moving && !st.crouch ? 1 : 0, k);
    const R = H[T.rifle];
    for (let i = 0; i < 3; i++) { C.rp[i] = lerp(C.rp[i], R.p[i], k); C.rd[i] = lerp(C.rd[i], R.d[i], k); C.ru[i] = lerp(C.ru[i], R.u[i], k); }
    const spd = st.speed || 6, run = clamp((spd - 6) / 4, 0, 1);
    if (st.moving) ud.ph += (dt || 0.016) * Math.max(2, spd) * 1.25;
    const ph = ud.ph, m = C.move, amp = lerp(0.5, 0.75, run), sw = Math.sin(ph), bob = Math.abs(Math.cos(ph));
    J.pelvis.position.set(0, C.pel - m * 0.025 * bob + m * 0.01, 0);
    J.pelvis.rotation.set(0, m * sw * 0.08, 0);
    J.torso.rotation.set(C.lean + m * run * 0.1, C.twist - m * sw * 0.1, 0);
    J.neck.rotation.set(C.nx - C.lean * 0.6, C.ny - C.twist * 0.4 + m * sw * 0.06, C.nz);
    J.shR.position.y = M.shY + C.shR;
    const kw = lerp(0.9, 1.3, run), N = ['L', 'R'];
    for (let i = 0; i < 2; i++) {
      const s = i ? 1 : -1, sg = i ? -1 : 1;
      const hx = lerp(C.hip[i], sg * sw * amp, m), kx = lerp(C.knee[i], 0.12 + Math.max(0, sg * Math.sin(ph + 1.7)) * kw, m);
      J['hip' + N[i]].rotation.set(hx, 0, s * C.spread * (1 - m * 0.6));
      J['knee' + N[i]].rotation.set(kx, 0, 0);
      const ax = i === 1 && C.kneel > 0.5 ? -(hx + kx) + 0.9 * C.kneel : -(hx + kx) + m * sg * sw * 0.15;
      J['ankle' + N[i]].rotation.set(ax, 0, -s * C.spread * (1 - m * 0.6));
    }
    J.rifle.visible = hold !== 'none';
    g.updateMatrixWorld(true);
    g.getWorldQuaternion(_gq);
    const drop = C.pel - 0.95;
    if (hold === 'none') {
      // sem arma (médicos): braços balançam ao andar; ajoelhado, mãos à frente
      _ax.set(0, 0, 1).applyQuaternion(_gq);
      for (let i = 0; i < 2; i++) {
        const s = i ? 1 : -1, n = N[i], swing = (i ? 1 : -1) * sw * 0.2 * m;
        const heal = st.crouch ? 1 : 0;
        _w0.set(s * lerp(0.24, 0.12, heal), lerp(0.85 + Math.abs(swing) * 0.2, 0.62, heal) + drop * (1 - heal) + drop * heal * 0.5, lerp(0.02 + swing, 0.4, heal));
        J.body.localToWorld(_w0);
        _po.set(s * 0.3, -1, -0.5).applyQuaternion(_gq);
        armIK(J, n, _w0, _ax, _po);
      }
      return;
    }
    _rd.set(C.rd[0], C.rd[1], C.rd[2]).normalize(); _ru.set(C.ru[0], C.ru[1], C.ru[2]);
    _rx.crossVectors(_ru, _rd).normalize(); _ry.crossVectors(_rd, _rx).normalize();
    const rf = J.rifle;
    rf.position.set(C.rp[0], C.rp[1] + drop - m * 0.02 * bob, C.rp[2]);
    rf.quaternion.setFromRotationMatrix(_rm.makeBasis(_rx, _ry, _rd));
    rf.updateMatrixWorld(true);
    rf.getWorldQuaternion(qT); _ax.set(0, 0, 1).applyQuaternion(qT);
    const isAim = T.rifle === 'aim';
    _w0.copy(GRIP_R); rf.localToWorld(_w0);
    _po.set(isAim || hold === 'tube' ? 1 : 0.5, isAim ? -0.4 : -1, -0.4).applyQuaternion(_gq);
    armIK(J, 'R', _w0, _ax, _po);
    _w1.set(W.L[0], W.L[1], W.L[2]); rf.localToWorld(_w1);
    _po.set(-0.3, -1, isAim ? 0 : -0.2).applyQuaternion(_gq);
    armIK(J, 'L', _w1, _ax, _po);
  }
  // ferido no chão (o jogo deita o corpo): braço chamando ajuda ou erguidos ao ser arrastado
  function downed(g, dragged, t, id) {
    const J = g.userData.J;
    J.rifle.visible = false;
    J.pelvis.position.set(0, M.pelvisY, 0); J.pelvis.rotation.set(0, 0, 0); J.torso.rotation.set(0, 0, 0); J.neck.rotation.set(-0.3, 0.3, 0);
    J.shR.position.y = M.shY;
    J.shR.rotation.set(dragged ? -2.9 : -2.5 + Math.sin(t * 3 + id) * 0.5, 0, -0.2); J.elR.rotation.set(-0.3, 0, 0); J.handR.rotation.set(0, 0, 0);
    J.shL.rotation.set(dragged ? -2.9 : -0.3, 0, 0.25); J.elL.rotation.set(-0.4, 0, 0); J.handL.rotation.set(0, 0, 0);
    J.hipL.rotation.set(0.15, 0, -0.08); J.kneeL.rotation.set(0.3, 0, 0); J.ankleL.rotation.set(-0.3, 0, 0);
    J.hipR.rotation.set(-0.2 + Math.sin(t * 1.7 + id) * 0.15, 0, 0.08); J.kneeR.rotation.set(0.5, 0, 0); J.ankleR.rotation.set(-0.2, 0, 0);
    if (g.userData.st) g.userData.st.rp = HOLD.rifle.ready.p.slice();
  }
  // paraquedista: braços nos tirantes, pernas soltas
  function chute(g, t) {
    const J = g.userData.J;
    J.rifle.visible = false;
    J.pelvis.position.set(0, M.pelvisY, 0); J.torso.rotation.set(0.05, 0, 0); J.neck.rotation.set(-0.2, 0, 0);
    J.shL.rotation.set(-2.75, 0, -0.25); J.shR.rotation.set(-2.75, 0, 0.25); J.elL.rotation.set(-0.5, 0, 0); J.elR.rotation.set(-0.5, 0, 0);
    J.hipL.rotation.set(Math.sin(t * 2) * 0.2, 0, -0.05); J.hipR.rotation.set(-Math.sin(t * 2) * 0.2, 0, 0.05);
    J.kneeL.rotation.set(0.25, 0, 0); J.kneeR.rotation.set(0.35, 0, 0); J.ankleL.rotation.set(0.2, 0, 0); J.ankleR.rotation.set(0.2, 0, 0);
  }
  // atirador de metralhadora fixa (ninhos e casamatas): ajoelhado, mãos nas empunhaduras
  function gunner(g) {
    pose(g, { crouch: true, aim: true }, 1);
    const J = g.userData.J;
    J.rifle.visible = false;
    J.shL.rotation.set(-1.25, 0, 0.15); J.shR.rotation.set(-1.15, 0, -0.15); J.elL.rotation.set(-0.35, 0, 0); J.elR.rotation.set(-0.55, 0, 0);
    J.handL.rotation.set(0, 0, 0); J.handR.rotation.set(0, 0, 0);
  }
  // adaptador para o jogo: mesmas regras de mira e cobertura do animSoldier
  // longe da câmera a pose é recalculada com menos frequência (economia no celular)
  function animate(u, dt, moving, aim) {
    const m = u.mesh, ud = m.userData;
    if (!m.visible) { ud.st = null; return; }
    ud.acc = (ud.acc || 0) + dt;
    if (typeof camera !== 'undefined') {
      const d = camera.position.distanceTo(m.position), every = d > 150 ? 0.2 : d > 80 ? 0.1 : 0;
      if (ud.acc < every) return;
    }
    pose(m, { moving, speed: u.speedNow, aim, crouch: u.crouch, heal: !!u.kneel && !!u.def.medic }, Math.min(ud.acc, 0.25));
    ud.acc = 0;
  }
  function triangles(g) { let t = 0; g.traverse(o => { if (o.isMesh && o.visible) t += o.geometry.attributes.position.count / 3; }); return t; }
  return { make, pose, animate, downed, chute, gunner, triangles, LOOK, M };
})();
