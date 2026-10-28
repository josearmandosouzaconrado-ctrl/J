'use strict';
/* =========================================================
   SOLDADO 3D (protótipo independente) — fuzileiro americano, 1944
   - modelado em metros com proporções reais (1,78 m; ombros 0,37 m;
     quadril a 52% da altura; cabeça 1/7,5 da altura)
   - esqueleto próprio: pélvis, tronco, pescoço, ombros, cotovelos,
     pulsos, quadris, joelhos e tornozelos
   - mãos presas ao fuzil por cinemática inversa (IK) em todas as poses:
     pronto-baixo, porte cruzado (andando/correndo), mirando no ombro,
     ajoelhado e ajoelhado mirando
   - não depende do resto do jogo: só do three.js
   Uso:  const s = Soldado3.make({ variant, skin, pal, scale });
         Soldado3.pose(s, { moving, speed, aim, crouch }, dt);
   ========================================================= */
const Soldado3 = (() => {
  const V3 = THREE.Vector3, Q = THREE.Quaternion;
  const lerp = (a, b, t) => a + (b - a) * t, clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  /* ---------- construtor de malha com cores por vértice ---------- */
  const _ni = new WeakMap();
  const ni = (g) => { let r = _ni.get(g); if (!r) { r = g.index ? g.toNonIndexed() : g; _ni.set(g, r); } return r; };
  const _m = new THREE.Matrix4(), _q = new Q(), _e = new THREE.Euler(), _n = new THREE.Matrix3(), _c = new THREE.Color(), _t = new V3();
  class MB {
    constructor() { this.p = []; this.n = []; this.c = []; this.cf = null; }
    add(geo, color, sx = 1, sy = 1, sz = 1, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
      _e.set(rx, ry, rz); _q.setFromEuler(_e); _m.compose(new V3(x, y, z), _q, new V3(sx, sy, sz)); _n.getNormalMatrix(_m);
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
  const flat = (g) => { const r = g.toNonIndexed(); r.computeVertexNormals(); return r; };
  const P = {
    box: new THREE.BoxGeometry(1, 1, 1), cyl8: new THREE.CylinderGeometry(1, 1, 1, 8), cyl6: new THREE.CylinderGeometry(1, 1, 1, 6),
    sph: new THREE.SphereGeometry(1, 10, 8), sph6: new THREE.SphereGeometry(1, 8, 6), ico: flat(new THREE.IcosahedronGeometry(1, 0)),
  };
  const shade = (hex, k) => new THREE.Color(hex).multiplyScalar(k).getHex();

  /* ---------- seções (lofts) ---------- */
  function ring(n, y, rx, rz, k, cx, cz, fy) {
    const out = [], e = 2 / (k || 2);
    for (let i = 0; i < n; i++) {
      const a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a);
      out.push([(cx || 0) + Math.sign(c) * Math.pow(Math.abs(c), e) * rx, y + (fy ? fy(c, s) : 0), (cz || 0) + Math.sign(s) * Math.pow(Math.abs(s), e) * rz]);
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
  // fita (correias) seguindo pontos; out(p) = lado de fora
  function strap(pts, w, t, out) {
    const R = [];
    for (let i = 0; i < pts.length; i++) {
      const p = new V3(...pts[i]), T = new V3(...pts[Math.min(pts.length - 1, i + 1)]).sub(new V3(...pts[Math.max(0, i - 1)])).normalize();
      const N = new V3(...out(pts[i])).normalize(), S = new V3().crossVectors(T, N).normalize(), N2 = new V3().crossVectors(S, T).normalize();
      const q = (a, b) => p.clone().addScaledVector(S, a * w / 2).addScaledVector(N2, b * t / 2).toArray();
      R.push([q(1, 1), q(-1, 1), q(-1, -1), q(1, -1)]);
    }
    return loft(R, { flat: true });
  }

  /* ---------- medidas (metros) ---------- */
  const M = {
    pelvisY: 0.95, spineY: 0.09, neckY: 0.47, shX: 0.185, shY: 0.4, hipX: 0.095,
    upper: 0.29, fore: 0.255, thigh: 0.44, shin: 0.43,
  };
  // tronco: [y, largura, profundidade, deslocamento z] no espaço do tronco
  const TORSO = [[-0.07, 0.305, 0.2, 0], [0.02, 0.3, 0.195, 0.003], [0.12, 0.325, 0.21, 0.01], [0.22, 0.37, 0.235, 0.016], [0.3, 0.4, 0.245, 0.016],
    [0.36, 0.415, 0.235, 0.008], [0.405, 0.41, 0.215, 0], [0.44, 0.34, 0.185, -0.008], [0.47, 0.2, 0.15, -0.008], [0.49, 0.12, 0.115, -0.005]];
  const TK = 2.6;
  function secAt(T, y) {
    let i = 0; while (i < T.length - 2 && T[i + 1][0] < y) i++;
    const a = T[i], b = T[i + 1], t = clamp((y - a[0]) / (b[0] - a[0]), 0, 1);
    return [lerp(a[1], b[1], t) / 2, lerp(a[2], b[2], t) / 2, lerp(a[3], b[3], t)];
  }
  // ponto na superfície (f = 1 frente, -1 costas) + giro para encostar peças
  function surf(T, x, y, f, off) {
    const [hw, hd, dz] = secAt(T, y), u = Math.min(0.995, Math.abs(x) / hw), zz = hd * Math.pow(1 - Math.pow(u, TK), 1 / TK);
    const dzdx = u > 0.01 ? -hd * Math.pow(1 - Math.pow(u, TK), 1 / TK - 1) * Math.pow(u, TK - 1) / hw * Math.sign(x) : 0;
    const ry = f > 0 ? Math.atan2(-dzdx, 1) : Math.PI + Math.atan2(dzdx, 1);
    return { x: x + (off || 0) * Math.sin(ry), y, z: dz + f * zz + (off || 0) * Math.cos(ry), ry };
  }
  function around(T, y, a, off) {
    const [hw, hd, dz] = secAt(T, y), e = 2 / TK, c = Math.cos(a), s = Math.sin(a);
    const x = Math.sign(c) * Math.pow(Math.abs(c), e) * hw, z = Math.sign(s) * Math.pow(Math.abs(s), e) * hd;
    const nx = x / (hw * hw), nz = z / (hd * hd), l = Math.hypot(nx, nz) || 1;
    return { x: x + nx / l * (off || 0), z: dz + z + nz / l * (off || 0), ry: Math.atan2(nx, nz) };
  }
  const outT = (p) => (p[1] > 0.43 ? [p[0] * 0.3, 1, p[2] * 0.3] : [p[0] * 0.5, 0, p[2]]);

  /* ---------- formas (criadas uma vez) ---------- */
  let SH = null;
  function shapes() {
    if (SH) return SH;
    const S = {};
    // pélvis: calça, saia da jaqueta e cinto
    const PEL = [[-0.13, 0.25, 0.17, 0], [-0.06, 0.32, 0.21, 0], [0.04, 0.33, 0.215, 0], [0.12, 0.3, 0.2, 0]];
    S.seat = loft(PEL.map(([y, w, d, dz]) => ring(14, y, w / 2, d / 2, 2.4, 0, dz)));
    const SK = [[-0.1, 0.35, 0.24, 0.006], [-0.03, 0.34, 0.228, 0.004], [0.06, 0.318, 0.208, 0], [0.13, 0.302, 0.2, 0]];
    S.SKIRT = SK;
    S.skirt = loft(SK.map(([y, w, d, dz]) => ring(18, y, w / 2, d / 2, TK, 0, dz)));
    S.hem = loft([ring(18, -0.105, 0.178, 0.123, TK, 0, 0.006), ring(18, -0.085, 0.177, 0.122, TK, 0, 0.006)], { flat: true });
    S.belt = loft([ring(18, 0.03, 0.172, 0.117, TK, 0, 0.002), ring(18, 0.1, 0.168, 0.113, TK, 0, 0.001)], { flat: true });
    // tronco e gola
    S.torso = loft(TORSO.map(([y, w, d, dz]) => ring(18, y, w / 2, d / 2, TK, 0, dz)));
    S.collar = loft([ring(12, 0.455, 0.082, 0.074, 2.2, 0, 0.004), ring(12, 0.515, 0.068, 0.062, 2.2, 0, 0.012)], { flat: true });
    S.placket = strap([0.0, 0.1, 0.2, 0.3, 0.4, 0.47].map(y => { const p = surf(TORSO, 0, y, 1, 0.002); return [p.x, p.y, p.z]; }), 0.034, 0.01, outT);
    // suspensórios: da frente sobre os ombros até a mochila
    S.susp = [-1, 1].map(sx => {
      const pts = [];
      for (let y = 0.0; y <= 0.42; y += 0.06) { const p = surf(TORSO, sx * lerp(0.07, 0.1, y / 0.42), y, 1, 0.006); pts.push([p.x, p.y, p.z]); }
      pts.push([sx * 0.105, 0.465, 0.04], [sx * 0.105, 0.47, -0.03]);
      for (let y = 0.42; y >= 0.3; y -= 0.06) { const p = surf(TORSO, sx * 0.095, y, -1, 0.006); pts.push([p.x, p.y, p.z]); }
      return strap(pts, 0.03, 0.008, outT);
    });
    // cabeça (espaço do pescoço)
    S.neck = limb(10, [[-0.04, 0.055, 0.053, 0, -0.005], [0.09, 0.048, 0.05, 0, 0.006]]);
    S.head = loft([[0.055, 0.022, 0.02, 0.055], [0.07, 0.05, 0.042, 0.045], [0.09, 0.068, 0.075, 0.025], [0.12, 0.074, 0.088, 0.015], [0.155, 0.077, 0.093, 0.008],
      [0.19, 0.078, 0.095, 0.003], [0.22, 0.075, 0.092, 0], [0.25, 0.064, 0.08, -0.004], [0.272, 0.04, 0.052, -0.006], [0.282, 0.01, 0.012, -0.006]]
      .map(([y, rx, rz, dz]) => ring(14, y, rx, rz, 2.2, 0, dz)));
    // capacete M1: casco alto, aba quase reta descendo sobre as orelhas
    const hz = -0.01, drop = (c, s) => -0.03 * c * c - (s < 0 ? 0.016 * s * s : 0);
    const HL = [[0.338, 0.006, 0.007], [0.334, 0.046, 0.052], [0.32, 0.085, 0.095], [0.296, 0.112, 0.126], [0.262, 0.127, 0.142], [0.23, 0.132, 0.149]];
    S.helm = loft([...HL.map(([y, rx, rz]) => ring(20, y, rx, rz, 2.1, 0, hz)), ring(20, 0.2, 0.134, 0.151, 2.1, 0, hz, drop)], { capB: false });
    S.rim = loft([ring(20, 0.203, 0.135, 0.152, 2.1, 0, hz, drop), ring(20, 0.195, 0.144, 0.162, 2.1, 0, hz, drop), ring(20, 0.187, 0.145, 0.163, 2.1, 0, hz, drop), ring(20, 0.194, 0.13, 0.147, 2.1, 0, hz, drop)], { flat: true });
    const hOut = (p) => [p[0], p[1] - 0.2, p[2] - hz];
    S.net = [];
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2 + 0.25; S.net.push(strap(HL.slice(1).concat([[0.205, 0.134, 0.151]]).map(([y, rx, rz]) => [Math.cos(a) * rx * 1.03, y + 0.001, Math.sin(a) * rz * 1.03 + hz]), 0.008, 0.005, hOut)); }
    { const pts = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * Math.PI * 2; pts.push([Math.cos(a) * 0.131 * 1.03, 0.262, Math.sin(a) * 0.146 * 1.03 + hz]); } S.net.push(strap(pts, 0.008, 0.005, hOut)); }
    S.chin = [-1, 1].map(sx => strap([[sx * 0.134, 0.2, 0.0], [sx * 0.125, 0.15, 0.012], [sx * 0.11, 0.1, 0.01], [sx * 0.1, 0.075, 0.0]], 0.013, 0.004, (p) => [p[0], 0, 0.1]));
    // mochila M1928 e cobertor enrolado
    S.pack = loft([ring(10, 0.06, 0.13, 0.05, 3.4, 0, -0.18), ring(10, 0.1, 0.15, 0.068, 3.4, 0, -0.188), ring(10, 0.38, 0.152, 0.072, 3.4, 0, -0.19), ring(10, 0.43, 0.13, 0.058, 3.4, 0, -0.184)], { flat: true });
    S.roll = limb(12, [[-0.2, 0.05, 0.05], [-0.17, 0.056, 0.056], [0.17, 0.056, 0.056], [0.2, 0.05, 0.05]]);
    S.canteen = loft([ring(10, -0.09, 0.055, 0.026, 2.4), ring(10, -0.075, 0.066, 0.032, 2.4), ring(10, 0.06, 0.066, 0.032, 2.4), ring(10, 0.08, 0.055, 0.026, 2.4)]);
    // braços
    S.sleeve = limb(10, [[0.0, 0.056, 0.058], [-0.08, 0.052, 0.055, 0, 0.006], [-0.18, 0.047, 0.05, 0, 0.004], [-0.29, 0.042, 0.044]]);
    S.fore = limb(10, [[0.0, 0.044, 0.046], [-0.08, 0.044, 0.047, 0, 0.004], [-0.19, 0.037, 0.039], [-0.215, 0.036, 0.038]]);
    S.cuff = limb(10, [[-0.2, 0.041, 0.043], [-0.238, 0.04, 0.042]]);
    S.wrist = limb(8, [[-0.225, 0.026, 0.022], [-0.262, 0.028, 0.023]]);
    // mão fechada (espaço do pulso; a arma passa pelo eixo x da mão)
    S.palm = limb(8, [[0.0, 0.026, 0.02], [-0.03, 0.04, 0.024, 0, -0.004], [-0.065, 0.042, 0.024, 0, -0.008]], 2.6);
    S.fingers = limb(8, [[-0.04, 0.041, 0.016, 0, 0.022], [-0.092, 0.038, 0.017, 0, 0.018]], 3);
    // pernas
    S.thigh = limb(10, [[0.07, 0.085, 0.09], [0.0, 0.09, 0.097, 0, 0.005], [-0.12, 0.086, 0.094, 0, 0.01], [-0.28, 0.074, 0.08, 0, 0.008], [-0.4, 0.064, 0.069, 0, 0.004], [-0.45, 0.06, 0.065]]);
    S.trouser = limb(10, [[0.02, 0.062, 0.066], [-0.07, 0.058, 0.062, 0, -0.004], [-0.12, 0.068, 0.072, 0, -0.004], [-0.15, 0.062, 0.066]]);
    S.legging = limb(10, [[-0.13, 0.058, 0.062], [-0.24, 0.055, 0.058, 0, -0.006], [-0.36, 0.05, 0.053], [-0.41, 0.054, 0.06, 0, 0.006]]);
    S.boot = loft([[-0.075, -0.025, 0.036, 0.042], [-0.05, -0.022, 0.043, 0.052], [0.0, -0.03, 0.046, 0.048], [0.07, -0.046, 0.044, 0.034], [0.13, -0.053, 0.039, 0.026], [0.165, -0.056, 0.03, 0.019], [0.176, -0.058, 0.012, 0.009]]
      .map(([z, cy, rx, ry]) => zring(10, z, 0, cy, rx, ry, 2.6)));
    S.bootTop = limb(10, [[-0.06, 0.047, 0.052, 0, 0.0], [0.03, 0.044, 0.048]]);
    // fuzil M1 Garand (origem no punho da coronha, +z para a boca do cano)
    S.stock = zloft(10, [[-0.355, 0.015, -0.118, 0.021], [-0.28, 0.014, -0.102, 0.021], [-0.18, 0.01, -0.064, 0.019], [-0.085, 0.002, -0.04, 0.016], [-0.015, -0.004, -0.046, 0.0135],
      [0.04, 0.008, -0.052, 0.016], [0.1, 0.012, -0.03, 0.018], [0.3, 0.012, -0.026, 0.017], [0.47, 0.01, -0.024, 0.015], [0.5, 0.004, -0.02, 0.011]], 2.8);
    S.hgR = zloft(8, [[0.215, 0.045, 0.012, 0.014], [0.32, 0.045, 0.012, 0.015]], 2.6);
    S.hgF = zloft(8, [[0.355, 0.044, 0.012, 0.014], [0.53, 0.042, 0.012, 0.013], [0.545, 0.036, 0.014, 0.011]], 2.6);
    const sl = []; for (let i = 0; i <= 8; i++) { const t = i / 8; sl.push([0.0, lerp(-0.026, -0.1, t) - Math.sin(t * Math.PI) * 0.06, lerp(0.45, -0.26, t)]); }
    S.sling = strap(sl, 0.016, 0.004, () => [1, 0, 0]);
    SH = S; return S;
  }

  /* ---------- paleta ---------- */
  const PAL = { jacket: 0x6a7050, pants: 0x5a5440, helm: 0x55603a, net: 0x30351f, band: 0x3e432c, web: 0x9a916c, boot: 0x5e3f26, legging: 0xa39873, pack: 0x857c58, metal: 0x2b2c2a, wood: 0x87512c };
  const SKINS = [0xd2a17a, 0xc8936b, 0xe0b48f, 0xb98563];

  /* ---------- peças ---------- */
  function buildPelvis(B, pal) {
    const S = shapes(), J = pal.jacket, Jd = shade(J, 0.8), W = pal.web, Wd = shade(W, 0.8), met = 0x6f6f66;
    B.add(S.seat, pal.pants);
    B.add(S.skirt, J); B.add(S.hem, Jd);
    for (const sx of [-1, 1]) {                                    // bolsos baixos com lapela
      const p = surf(S.SKIRT, sx * 0.085, -0.035, 1, 0.006);
      B.add(P.box, shade(J, 0.92), 0.1, 0.1, 0.014, p.x, -0.035, p.z, 0, p.ry, 0);
      B.add(P.box, Jd, 0.106, 0.032, 0.02, p.x, 0.002, p.z + 0.002, 0.2, p.ry, 0);
    }
    B.add(S.belt, W);
    for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) {        // 10 bolsos do cinto M1923
      const p = around(S.SKIRT, 0.065, Math.PI / 2 - sx * (0.5 + i * 0.27), 0.024);
      B.add(P.box, W, 0.05, 0.072, 0.034, p.x, 0.058, p.z, 0, p.ry, 0);
      B.add(P.box, Wd, 0.053, 0.024, 0.038, p.x, 0.088, p.z, 0, p.ry, 0);
      B.add(P.box, met, 0.008, 0.008, 0.04, p.x, 0.082, p.z, 0, p.ry, 0);
    }
    { const p = surf(S.SKIRT, 0, 0.065, 1, 0.012); B.add(P.box, met, 0.045, 0.04, 0.012, p.x, 0.065, p.z); }
    { const p = surf(S.SKIRT, -0.035, -0.005, 1, 0.026); B.add(P.box, W, 0.06, 0.065, 0.03, p.x, -0.005, p.z, 0, p.ry, 0); B.add(P.box, Wd, 0.062, 0.02, 0.034, p.x, 0.025, p.z, 0, p.ry, 0); }
    { const p = around(S.SKIRT, -0.02, -0.55, 0.04); B.add(S.canteen, 0x6a664a, 1, 1, 1, p.x, -0.03, p.z, 0, p.ry + Math.PI / 2, 0); B.add(P.box, 0x58553d, 0.11, 0.025, 0.07, p.x, 0.045, p.z, 0, p.ry + Math.PI / 2, 0); }
  }
  function buildTorso(B, pal) {
    const S = shapes(), J = pal.jacket, Jd = shade(J, 0.8), W = pal.web, met = 0x6f6f66, dark = 0x2c2a22;
    B.add(S.torso, J);
    B.add(S.collar, J);
    for (const sx of [-1, 1]) {
      B.add(P.box, J, 0.07, 0.012, 0.06, sx * 0.045, 0.475, 0.07, -0.95, 0, sx * 0.4);      // pontas da gola
      B.add(P.box, J, 0.11, 0.012, 0.036, sx * 0.145, 0.448, -0.005, 0, 0, sx * -0.42);       // dragonas
      B.add(P.box, met, 0.01, 0.008, 0.01, sx * 0.1, 0.468, -0.005);
      const p = surf(TORSO, sx * 0.085, 0.27, 1, 0.006);                                         // bolsos do peito
      B.add(P.box, shade(J, 0.93), 0.1, 0.115, 0.016, p.x, 0.265, p.z, 0, p.ry, 0);
      B.add(P.box, dark, 0.004, 0.1, 0.018, p.x, 0.26, p.z + 0.002, 0, p.ry, 0);               // prega
      B.add(P.box, Jd, 0.106, 0.034, 0.022, p.x, 0.325, p.z + 0.004, 0.2, p.ry, 0);            // lapela
      B.add(P.box, dark, 0.012, 0.012, 0.01, p.x, 0.316, p.z + 0.016, 0, p.ry, 0);
    }
    B.add(S.placket, Jd);
    for (const y of [0.04, 0.14, 0.24, 0.34, 0.43]) { const p = surf(TORSO, 0, y, 1, 0.01); B.add(P.box, dark, 0.014, 0.014, 0.008, p.x, y, p.z); }
    // suspensórios e granada MkII
    for (const g of S.susp) B.add(g, W);
    { const p = surf(TORSO, -0.085, 0.19, 1, 0.03); B.add(P.sph6, 0x474c2e, 0.022, 0.03, 0.022, p.x, 0.19, p.z); B.add(P.box, 0x474c2e, 0.012, 0.018, 0.012, p.x, 0.225, p.z); B.add(P.box, 0x5a5a50, 0.008, 0.04, 0.006, p.x + 0.014, 0.2, p.z + 0.008); }
    // mochila M1928: volume, aba, correias, cobertor, pá e baioneta
    const pk = pal.pack;
    B.add(S.pack, pk);
    B.add(P.box, shade(pk, 0.86), 0.29, 0.13, 0.022, 0, 0.36, -0.262, 0.08, 0, 0);
    for (const sx of [-1, 1]) { B.add(P.box, W, 0.022, 0.36, 0.008, sx * 0.075, 0.25, -0.264); B.add(P.box, met, 0.028, 0.014, 0.012, sx * 0.075, 0.31, -0.268); }
    B.add(S.roll, 0x6d6448, 1, 1, 1, 0, 0.485, -0.17, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) B.add(P.box, W, 0.016, 0.125, 0.125, sx * 0.12, 0.485, -0.17);
    B.add(P.box, 0x4d5040, 0.13, 0.17, 0.035, 0, 0.02, -0.215);                                // pá M1943 na capa
    B.add(P.box, shade(0x4d5040, 0.8), 0.13, 0.035, 0.04, 0, 0.1, -0.215);
    B.add(P.cyl8, 0x5e4a30, 0.012, 0.14, 0.012, 0, -0.13, -0.215);
    B.add(P.box, 0x3d3f35, 0.022, 0.28, 0.016, -0.135, 0.2, -0.2, 0, 0, 0.05);                // baioneta M1905
    B.add(P.box, 0x5a4630, 0.018, 0.08, 0.02, -0.14, 0.38, -0.2);
  }
  function buildHead(B, pal, variant) {
    const S = shapes(), sk = pal.skin, stub = new THREE.Color(shade(sk, 0.8)), skc = new THREE.Color(sk);
    B.cf = (x, y, z, c) => (c.equals(skc) && y < 0.125 && y > 0.06 && z > -0.02 ? stub : c);
    B.add(S.neck, sk); B.add(S.head, sk);
    B.cf = null;
    B.add(P.box, sk, 0.026, 0.045, 0.036, 0, 0.158, 0.108, -0.3, 0, 0);                      // nariz
    B.add(P.box, shade(sk, 0.88), 0.12, 0.016, 0.02, 0, 0.193, 0.094);                        // arco das sobrancelhas
    B.add(P.box, 0x6e4034, 0.038, 0.008, 0.008, 0, 0.11, 0.1);                                 // boca
    for (const sx of [-1, 1]) {
      B.add(P.box, shade(sk, 0.72), 0.034, 0.02, 0.006, sx * 0.031, 0.177, 0.093);
      B.add(P.box, 0xe9e3d6, 0.022, 0.011, 0.006, sx * 0.031, 0.177, 0.096);
      B.add(P.box, 0x241a12, 0.011, 0.011, 0.006, sx * 0.031, 0.177, 0.098);
      B.add(P.box, 0x3a2a1c, 0.038, 0.009, 0.008, sx * 0.033, 0.197, 0.098, 0, 0, sx * -0.12);
      B.add(P.sph6, sk, 0.014, 0.03, 0.02, sx * 0.077, 0.165, 0.0);
    }
    B.add(S.helm, pal.helm);
    B.add(S.rim, shade(pal.helm, 0.85));
    for (const g of S.net) B.add(g, pal.net);
    for (const g of S.chin) B.add(g, pal.band);
    if (variant === 1) for (const [a, y, s, c] of [[0.4, 0.3, 1, 0x56603a], [2.0, 0.27, 1.1, 0x8a7a55], [3.6, 0.31, 0.9, 0x4e5a35], [5.0, 0.25, 1, 0x7a6e4a]])
      B.add(P.box, c, 0.06 * s, 0.008, 0.024, Math.cos(a) * 0.11, y, Math.sin(a) * 0.12, 0.3, a, 0.5);
  }
  function buildUpper(B, pal, side, variant) {
    const S = shapes();
    B.add(P.sph, pal.jacket, 0.06, 0.062, 0.06, -side * 0.012, -0.004, 0);
    B.add(S.sleeve, pal.jacket);
    if (side < 0) { B.add(P.box, 0x5a5c3e, 0.006, 0.05, 0.04, -0.056, -0.07, 0); B.add(P.box, 0xa8241c, 0.007, 0.035, 0.01, -0.059, -0.07, 0); }
    if (variant === 2) for (let i = 0; i < 3; i++) B.add(P.box, 0xc9b25a, 0.006, 0.012, 0.06, side * 0.052, -0.09 - i * 0.022, 0);
  }
  function buildFore(B, pal) {
    const S = shapes();
    B.add(P.sph6, pal.jacket, 0.044, 0.044, 0.046);
    B.add(S.fore, pal.jacket); B.add(S.cuff, shade(pal.jacket, 0.85)); B.add(S.wrist, pal.skin);
  }
  function buildHand(B, pal) {
    const S = shapes(), sk = pal.skin;
    B.add(S.palm, sk);
    B.add(S.fingers, shade(sk, 0.95));
    for (let i = 0; i < 4; i++) B.add(P.box, shade(sk, 0.86), 0.004, 0.012, 0.012, -0.03 + i * 0.02, -0.093, 0.037);
    B.add(P.box, sk, 0.04, 0.018, 0.02, 0.028, -0.045, 0.028, 0, 0, -0.4);                     // polegar
  }
  function buildThigh(B, pal) {
    const S = shapes();
    B.add(P.sph, pal.pants, 0.088, 0.08, 0.092);
    B.add(S.thigh, pal.pants);
    B.add(P.box, shade(pal.pants, 0.78), 0.05, 0.006, 0.006, 0, 0.0, 0.098, 0, 0, 0.7);
  }
  function buildShin(B, pal, side) {
    const S = shapes(), L = pal.legging;
    B.add(P.sph, pal.pants, 0.057, 0.057, 0.06, 0, 0, 0.004);
    B.add(S.trouser, pal.pants); B.add(S.legging, L);
    for (let i = 0; i < 6; i++) { const y = -0.15 - i * 0.042, r = lerp(0.057, 0.051, i / 5); B.add(P.box, 0x4a4535, 0.01, 0.008, 0.01, side * (r + 0.003), y, 0.012); }
    B.add(P.box, shade(L, 0.85), 0.006, 0.24, 0.018, side * 0.054, -0.27, 0.012);
  }
  function buildFoot(B, pal) {
    const S = shapes();
    B.add(S.bootTop, pal.boot); B.add(S.boot, pal.boot);
    B.add(P.box, shade(pal.legging, 0.75), 0.098, 0.012, 0.02, 0, -0.06, -0.01);
    B.add(P.box, 0x241c15, 0.08, 0.012, 0.235, 0, -0.077, 0.048);
    B.add(P.box, 0x241c15, 0.072, 0.02, 0.065, 0, -0.073, -0.042);
  }
  function buildGarand(B, pal) {
    const S = shapes(), w = pal.wood, m = pal.metal;
    B.add(S.stock, w); B.add(S.hgR, w); B.add(S.hgF, w);
    B.add(P.box, m, 0.044, 0.135, 0.008, 0, -0.051, -0.357);                                    // soleira
    B.add(P.box, m, 0.03, 0.036, 0.2, 0, 0.03, 0.115);                                          // caixa da culatra
    B.add(P.box, 0x161616, 0.02, 0.006, 0.07, 0, 0.049, 0.12);                                   // janela do clipe
    B.add(P.box, m, 0.028, 0.026, 0.032, 0, 0.056, 0.03);                                        // alça de mira
    for (const sx of [-1, 1]) B.add(P.cyl8, m, 0.007, 0.008, 0.007, sx * 0.017, 0.062, 0.03, 0, 0, Math.PI / 2);
    B.add(P.box, m, 0.012, 0.03, 0.055, 0, -0.035, 0.065);                                       // guarda-mato
    B.add(P.box, m, 0.006, 0.02, 0.006, 0, -0.025, 0.07);
    B.add(P.box, m, 0.006, 0.012, 0.32, 0.017, 0.022, 0.36);                                     // haste de operação
    B.add(P.box, m, 0.012, 0.012, 0.02, 0.022, 0.035, 0.2);
    B.add(P.cyl8, m, 0.009, 0.25, 0.009, 0, 0.028, 0.66, Math.PI / 2, 0, 0);                    // cano
    B.add(P.cyl8, m, 0.013, 0.06, 0.013, 0, 0.022, 0.745, Math.PI / 2, 0, 0);                   // cilindro de gás
    B.add(P.box, m, 0.006, 0.026, 0.01, 0, 0.048, 0.765);                                        // massa de mira
    for (const sx of [-1, 1]) B.add(P.box, m, 0.003, 0.018, 0.012, sx * 0.008, 0.045, 0.765);
    for (const z of [0.34, 0.55]) B.add(P.box, m, 0.035, 0.05, 0.012, 0, 0.018, z);            // braçadeiras
    B.add(S.sling, 0x5c3c22);
  }

  /* ---------- montagem ---------- */
  const _cache = new Map();
  function geo(key, fn) { let g = _cache.get(key); if (!g) { const B = new MB(); fn(B); g = B.build(); _cache.set(key, g); } return g; }
  let MAT = null;
  function material() { return MAT || (MAT = (typeof VC_MAT !== 'undefined' ? VC_MAT : new THREE.MeshLambertMaterial({ vertexColors: true }))); }
  const mesh = (g, parent, cast) => { const m = new THREE.Mesh(g, material()); m.castShadow = cast !== false; m.receiveShadow = false; parent.add(m); return m; };
  const grp = (parent, x, y, z) => { const g = new THREE.Group(); g.position.set(x || 0, y || 0, z || 0); parent.add(g); return g; };

  function make(o) {
    o = o || {};
    const variant = o.variant !== undefined ? o.variant : (Math.random() * 2) | 0, skin = o.skin !== undefined ? o.skin : (Math.random() * SKINS.length) | 0;
    const pal = Object.assign({}, PAL, o.pal || {}, { skin: SKINS[skin] });
    const key = JSON.stringify(o.pal || {}) + variant + 's' + skin;
    const root = new THREE.Group(); root.rotation.order = 'YXZ';
    const pelvis = grp(root, 0, M.pelvisY, 0); mesh(geo('pel' + key, B => buildPelvis(B, pal)), pelvis);
    const torso = grp(pelvis, 0, M.spineY, 0); torso.rotation.order = 'YXZ'; mesh(geo('tor' + key, B => buildTorso(B, pal)), torso);
    const neck = grp(torso, 0, M.neckY, -0.01); neck.rotation.order = 'YXZ'; mesh(geo('head' + key, B => buildHead(B, pal, variant)), neck);
    const J = { root, pelvis, torso, neck };
    for (const [s, n] of [[-1, 'L'], [1, 'R']]) {
      const sh = grp(torso, s * M.shX, M.shY, -0.005); mesh(geo('up' + s + key, B => buildUpper(B, pal, s, variant)), sh, false);
      const el = grp(sh, 0, -M.upper, 0); mesh(geo('fo' + key, B => buildFore(B, pal)), el, false);
      const hd = grp(el, 0, -M.fore, 0); mesh(geo('hand' + key, B => buildHand(B, pal)), hd, false);
      const hip = grp(pelvis, s * M.hipX, 0, 0); mesh(geo('th' + key, B => buildThigh(B, pal)), hip, false);
      const kn = grp(hip, 0, -M.thigh, 0); mesh(geo('sh' + s + key, B => buildShin(B, pal, s)), kn, false);
      const an = grp(kn, 0, -M.shin, 0); mesh(geo('ft' + key, B => buildFoot(B, pal)), an, false);
      Object.assign(J, { ['sh' + n]: sh, ['el' + n]: el, ['hand' + n]: hd, ['hip' + n]: hip, ['knee' + n]: kn, ['ankle' + n]: an });
    }
    const rifle = grp(root); mesh(geo('garand' + key, B => buildGarand(B, pal)), rifle, false);
    J.rifle = rifle;
    root.scale.setScalar(o.scale || 1);
    root.userData = { s3: true, J, st: null, ph: Math.random() * 6,
      // nomes usados pelo jogo (corpo caído, paraquedas etc.)
      legL: J.hipL, legR: J.hipR, shinL: J.kneeL, shinR: J.kneeR, armL: J.shL, armR: J.shR, foreL: J.elL, foreR: J.elR, rifle, tube: false };
    pose(root, {}, 1);
    return root;
  }

  /* ---------- poses ---------- */
  // fuzil no espaço do corpo: punho (mão direita), direção do cano e "cima" do fuzil
  const RIFLE = {
    ready: { p: [0.17, 1.0, 0.05], d: [-0.61, -0.06, 0.79], u: [0.3, 1, 0.15] },          // pronto-baixo, cruzado na frente
    port: { p: [0.12, 1.08, 0.12], d: [-0.6, 0.62, 0.5], u: [0.1, 0.45, -1] },          // porte cruzado no peito (andando)
    aim: { p: [0.06, 1.5, 0.33], d: [-0.02, 0.0, 1], u: [0, 1, 0] },               // coronha no ombro, mirando
  };
  const GRIP_R = new V3(0, -0.022, -0.012), GRIP_L = new V3(0, 0.0, 0.3), HAND_OFF = new V3(0, -0.058, 0.012);
  function target(st) {
    const T = { pel: 0.95, pelZ: 0, lean: 0.02, twist: 0, nx: 0, ny: 0, nz: 0, shR: 0, hip: [-0.05, 0.04], knee: [0.08, 0.08], spread: 0.06, rifle: 'ready', kneel: 0 };
    if (st.crouch) {
      Object.assign(T, { pel: 0.56, lean: 0.12, hip: [-1.45, -0.28], knee: [1.5, 1.75], spread: 0.1, kneel: 1, rifle: st.aim ? 'aim' : 'ready' });
      if (st.aim) Object.assign(T, { twist: -0.22, nx: 0.22, ny: 0.2, nz: -0.12, lean: 0.14, shR: 0.025 });
    } else if (st.aim) Object.assign(T, { pel: 0.94, lean: 0.1, twist: -0.22, nx: 0.24, ny: 0.2, nz: -0.14, shR: 0.025, hip: [-0.25, 0.14], knee: [0.16, 0.06], spread: 0.1, rifle: 'aim' });
    else if (st.moving) Object.assign(T, { lean: st.speed > 9 ? 0.2 : 0.1, rifle: 'port' });
    return T;
  }
  const _a = new V3(), _b = new V3(), _u = new V3(), _v = new V3(), _w = new V3(), _mx = new THREE.Matrix4(), _qa = new Q(), _qb = new Q(), _qc = new Q(), DOWN = new V3(0, -1, 0);
  // IK de dois ossos para o braço: mão no ponto "grip" com o eixo x da mão ao longo do eixo do fuzil
  function armIK(J, n, gripW, axisW, poleW) {
    const torso = J.torso, sh = J['sh' + n], el = J['el' + n], hd = J['hand' + n];
    const inv = _mx.copy(torso.matrixWorld).invert();
    const grip = gripW.clone().applyMatrix4(inv);
    const tq = torso.getWorldQuaternion(new Q()), tqi = tq.clone().invert();
    const axis = axisW.clone().applyQuaternion(tqi).normalize(), pole = poleW.clone().applyQuaternion(tqi).normalize();
    const S = sh.position, a = M.upper, b = M.fore;
    let F = grip.clone().sub(S).normalize(), qh = new Q(), T = new V3();
    for (let it = 0; it < 2; it++) {
      const X = axis, Y = F.clone().addScaledVector(X, -F.dot(X)).negate().normalize(), Z = new V3().crossVectors(X, Y);
      qh.setFromRotationMatrix(new THREE.Matrix4().makeBasis(X, Y, Z));
      T.copy(grip).sub(HAND_OFF.clone().applyQuaternion(qh));
      const D = T.clone().sub(S), d = clamp(D.length(), Math.abs(a - b) + 0.01, (a + b) * 0.999);
      _u.copy(D).normalize(); _v.copy(pole).addScaledVector(_u, -pole.dot(_u)).normalize();
      const ca = (a * a + d * d - b * b) / (2 * a * d), sa = Math.sqrt(Math.max(0, 1 - ca * ca));
      const E = S.clone().addScaledVector(_u, a * ca).addScaledVector(_v, a * sa), Tc = S.clone().addScaledVector(_u, d);
      _qa.setFromUnitVectors(DOWN, E.clone().sub(S).normalize());
      F = Tc.clone().sub(E).normalize();
      _qb.setFromUnitVectors(DOWN, F.clone().applyQuaternion(_qa.clone().invert()));
    }
    sh.quaternion.copy(_qa); el.quaternion.copy(_qb);
    _qc.copy(_qa).multiply(_qb).invert().multiply(qh); hd.quaternion.copy(_qc);
  }
  function pose(g, st, dt) {
    const ud = g.userData, J = ud.J, k = Math.min(1, (dt || 0.016) * 9);
    const T = target(st);
    let C = ud.st; if (!C) C = ud.st = Object.assign({ move: 0, rp: RIFLE.ready.p.slice(), rd: RIFLE.ready.d.slice(), ru: RIFLE.ready.u.slice() }, T, { hip: T.hip.slice(), knee: T.knee.slice() });
    for (const f of ['pel', 'pelZ', 'lean', 'twist', 'nx', 'ny', 'nz', 'shR', 'spread', 'kneel']) C[f] = lerp(C[f], T[f], k);
    for (let i = 0; i < 2; i++) { C.hip[i] = lerp(C.hip[i], T.hip[i], k); C.knee[i] = lerp(C.knee[i], T.knee[i], k); }
    C.move = lerp(C.move, st.moving && !st.crouch ? 1 : 0, k);
    const R = RIFLE[T.rifle];
    for (let i = 0; i < 3; i++) { C.rp[i] = lerp(C.rp[i], R.p[i], k); C.rd[i] = lerp(C.rd[i], R.d[i], k); C.ru[i] = lerp(C.ru[i], R.u[i], k); }
    // caminhada / corrida
    const sp = st.speed || 6, run = clamp((sp - 6) / 4, 0, 1);
    if (st.moving) ud.ph += (dt || 0.016) * Math.max(2, sp) * 1.25;
    const ph = ud.ph, m = C.move, amp = lerp(0.5, 0.75, run);
    const sw = Math.sin(ph), bob = Math.abs(Math.cos(ph));
    const hipW = [sw * amp, -sw * amp], kneeW = [0.12 + Math.max(0, Math.sin(ph + 1.7)) * lerp(0.9, 1.3, run), 0.12 + Math.max(0, -Math.sin(ph + 1.7)) * lerp(0.9, 1.3, run)];
    J.pelvis.position.set(0, C.pel - m * (0.025 * bob) + m * 0.01, C.pelZ);
    J.pelvis.rotation.set(0, m * sw * 0.08, 0);
    J.torso.rotation.set(C.lean + m * run * 0.1, C.twist - m * sw * 0.1, 0);
    J.neck.rotation.set(C.nx - C.lean * 0.6, C.ny - C.twist * 0.4 + m * sw * 0.06, C.nz);
    J.shR.position.y = M.shY + C.shR; J.shL.position.y = M.shY;
    // pernas: base (parado / mira / ajoelhado) + ciclo
    const n = ['L', 'R'];
    for (let i = 0; i < 2; i++) {
      const s = i ? 1 : -1, hx = lerp(C.hip[i], hipW[i], m), kx = lerp(C.knee[i], kneeW[i], m);
      J['hip' + n[i]].rotation.set(hx, 0, s * C.spread * (1 - m * 0.6));
      J['knee' + n[i]].rotation.set(kx, 0, 0);
      // pé no chão: compensa quadril e joelho; joelho no chão com a ponta do pé apoiada
      const flatF = -(hx + kx) + m * (i ? -1 : 1) * Math.sin(ph) * 0.15;
      J['ankle' + n[i]].rotation.set(i === 1 && C.kneel > 0.5 ? -(hx + kx) + 0.9 * C.kneel : flatF, 0, -s * C.spread * (1 - m * 0.6));
    }
    // fuzil e mãos
    g.updateMatrixWorld(true);
    const rd = new V3(...C.rd).normalize(), ru = new V3(...C.ru), rx = new V3().crossVectors(ru, rd).normalize(), ry = new V3().crossVectors(rd, rx).normalize();
    const rf = J.rifle, kneelDrop = (C.pel - 0.95);
    rf.position.set(C.rp[0], C.rp[1] + kneelDrop - m * 0.02 * bob, C.rp[2]);
    rf.quaternion.setFromRotationMatrix(new THREE.Matrix4().makeBasis(rx, ry, rd));
    if (C.rifle === undefined) C.rifle = T.rifle;
    rf.updateMatrixWorld(true);
    const axisW = new V3(0, 0, 1).applyQuaternion(rf.getWorldQuaternion(new Q()));
    const isAim = T.rifle === 'aim';
    armIK(J, 'R', rf.localToWorld(GRIP_R.clone()), axisW, new V3(isAim ? 1 : 0.5, isAim ? -0.4 : -1, -0.4).applyQuaternion(g.getWorldQuaternion(new Q())));
    armIK(J, 'L', rf.localToWorld(GRIP_L.clone()), axisW, new V3(-0.3, -1, isAim ? 0 : -0.2).applyQuaternion(g.getWorldQuaternion(new Q())));
  }
  function triangles(g) { let t = 0; g.traverse(o => { if (o.isMesh) t += o.geometry.attributes.position.count / 3; }); return t; }
  return { make, pose, triangles, M };
})();
