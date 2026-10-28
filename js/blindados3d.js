'use strict';
/* =========================================================
   BLINDADOS 3D — tanques modelados do zero em metros reais
   - casco em chapas inclinadas (prismas com meia-largura por vértice)
   - torres soldadas (facetadas) ou fundidas (lisas) por seções
   - rodas, rodas motrizes dentadas, tensoras e roletes torneados (lathe)
   - lagarta contínua que passa pelas rodas, roletes e motriz, com elos
     em textura que corre conforme a velocidade
   - camuflagem no shader (cobre chapas grandes sem depender de vértices):
     verde-oliva, cinza Panzergrau, três cores alemã, deserto, Caunter,
     francesa, japonesa e caiação de inverno; lama, poeira e Zimmerit
   - escala do jogo K = 1,3 (combina com os soldados e os raios de colisão)
   Contrato com o jogo (igual ao modelo antigo):
     userData = { turret, gun, muzzle, trackMat, wheels, L }
   ========================================================= */
const Blindado3 = (() => {
  const V3 = THREE.Vector3, K = 1.3;
  const lerp = (a, b, t) => a + (b - a) * t, clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const TAU = Math.PI * 2, LOD_DIST = 34;

  /* ---------- montador de malha com cor por vértice ---------- */
  // cor < 0 = tinta do veículo com sombreamento -cor (o shader aplica a camuflagem)
  const _ni = new WeakMap();
  const ni = (g) => { let r = _ni.get(g); if (!r) { r = g.index ? g.toNonIndexed() : g; _ni.set(g, r); } return r; };
  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _n = new THREE.Matrix3(), _c = new THREE.Color(), _t = new V3(), _p0 = new V3(), _s0 = new V3();
  // LITE: versão de longe (LOD) — descarta peças menores que ~7 cm e usa rodas simples
  let LITE = false;
  const _rad = new WeakMap();
  const radius = (g) => { let r = _rad.get(g); if (r === undefined) { g.computeBoundingSphere(); r = g.boundingSphere.radius; _rad.set(g, r); } return r; };
  class MB {
    constructor() { this.p = []; this.n = []; this.c = []; }
    add(geo, col, sx = 1, sy = 1, sz = 1, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
      if (LITE && radius(geo) * Math.max(Math.abs(sx), Math.abs(sy), Math.abs(sz)) < 0.07) return this;
      _e.set(rx, ry, rz, 'YXZ'); _q.setFromEuler(_e); _m.compose(_p0.set(x, y, z), _q, _s0.set(sx, sy, sz)); _n.getNormalMatrix(_m);
      const g = ni(geo), pa = g.attributes.position, na = g.attributes.normal;
      if (col < 0) _c.setRGB(1, Math.min(0.99, -col * 0.9), 1); else _c.setHex(col);
      for (let i = 0; i < pa.count; i++) {
        _t.fromBufferAttribute(pa, i).applyMatrix4(_m); this.p.push(_t.x, _t.y, _t.z);
        this.c.push(_c.r, _c.g, _c.b);
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
  const PT = -1, PD = -0.82, PL = -1.08;              // tinta: normal, sombra, clara
  const STEEL = 0x3b3b37, DARK = 0x1c1c1a, RUBBER = 0x232220, GLASS = 0x0e1214, WOOD = 0x7a5a36, CANVAS = 0x6d6648, BRASS = 0x8a7840;
  const box = new THREE.BoxGeometry(1, 1, 1);
  const cyl = (n) => new THREE.CylinderGeometry(1, 1, 1, n);
  const C6 = cyl(6), C8 = cyl(8), C12 = cyl(12), C16 = cyl(16), SPH = new THREE.SphereGeometry(1, 8, 6), HEMI = new THREE.SphereGeometry(1, 12, 5, 0, TAU, 0, Math.PI / 2);

  /* ---------- geometria ---------- */
  function faces(tris) {
    const pos = new Float32Array(tris.length * 9), nor = new Float32Array(tris.length * 9);
    tris.forEach((t, i) => {
      const [a, b, c] = t, ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
      let nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx; const l = Math.hypot(nx, ny, nz) || 1; nx /= l; ny /= l; nz /= l;
      for (let k = 0; k < 3; k++) { pos.set(t[k], i * 9 + k * 3); nor[i * 9 + k * 3] = nx; nor[i * 9 + k * 3 + 1] = ny; nor[i * 9 + k * 3 + 2] = nz; }
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    return g;
  }
  // vira o triângulo para que a normal aponte para "dir"
  function orient(t, dir) {
    const [a, b, c] = t, ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    return nx * dir[0] + ny * dir[1] + nz * dir[2] < 0 ? [a, c, b] : t;
  }
  // chapa de blindagem: polígono lateral [z, y, meia-largura] extrudado nas duas laterais
  function prism(pts) {
    let area = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; }
    const P = area < 0 ? pts.slice().reverse() : pts;
    const R = P.map(([z, y, h]) => [h, y, z]), L = P.map(([z, y, h]) => [-h, y, z]);
    const tris = [];
    for (const [a, b, c] of THREE.ShapeUtils.triangulateShape(P.map(p => new THREE.Vector2(p[0], p[1])), [])) {
      tris.push(orient([R[a], R[b], R[c]], [1, 0, 0]), orient([L[a], L[b], L[c]], [-1, 0, 0]));
    }
    for (let i = 0; i < P.length; i++) {
      const j = (i + 1) % P.length, out = [0, -(P[j][0] - P[i][0]), P[j][1] - P[i][1]];
      tris.push(orient([L[i], L[j], R[j]], out), orient([L[i], R[j], R[i]], out));
    }
    return faces(tris);
  }
  // seções empilhadas; anéis de vértices ligados em faixas e tampados
  function loft(Rg, opt) {
    opt = opt || {};
    const n = Rg[0].length, tris = [], ctr = Rg.map(r => { let x = 0, y = 0, z = 0; for (const p of r) { x += p[0]; y += p[1]; z += p[2]; } return [x / n, y / n, z / n]; });
    for (let r = 0; r < Rg.length - 1; r++) {
      const ref = ctr[r].map((v, k) => (v + ctr[r + 1][k]) / 2);
      for (let i = 0; i < n; i++) {
        const a = Rg[r][i], b = Rg[r][(i + 1) % n], c = Rg[r + 1][(i + 1) % n], d = Rg[r + 1][i];
        const m = [(a[0] + b[0] + c[0] + d[0]) / 4 - ref[0], (a[1] + b[1] + c[1] + d[1]) / 4 - ref[1], (a[2] + b[2] + c[2] + d[2]) / 4 - ref[2]];
        tris.push(orient([a, b, c], m), orient([a, c, d], m));
      }
    }
    for (const [ri, nb] of [[0, 1], [Rg.length - 1, Rg.length - 2]]) {
      if ((ri === 0 && opt.capA === false) || (ri > 0 && opt.capB === false)) continue;
      const dir = ctr[ri].map((v, k) => v - ctr[nb][k]);
      for (let i = 0; i < n; i++) tris.push(orient([ctr[ri], Rg[ri][i], Rg[ri][(i + 1) % n]], dir));
    }
    const g = faces(tris);
    if (opt.smooth) smoothSides(g, (Rg.length - 1) * n * 6);
    return g;
  }
  // normais suaves nas paredes (aço fundido)
  function smoothSides(g, count) {
    const p = g.attributes.position, nr = g.attributes.normal, acc = new Map(), key = (i) => Math.round(p.getX(i) * 1e3) + ',' + Math.round(p.getY(i) * 1e3) + ',' + Math.round(p.getZ(i) * 1e3);
    for (let i = 0; i < count; i++) { const k = key(i), a = acc.get(k) || [0, 0, 0]; a[0] += nr.getX(i); a[1] += nr.getY(i); a[2] += nr.getZ(i); acc.set(k, a); }
    for (let i = 0; i < count; i++) { const a = acc.get(key(i)), l = Math.hypot(a[0], a[1], a[2]) || 1; nr.setXYZ(i, a[0] / l, a[1] / l, a[2] / l); }
  }
  // torre: planta [x, z] em anéis [y, escala x, escala z, desloc. z, desloc. x]
  const tloft = (plan, rings, opt) => loft(rings.map(([y, sx, sz, dz, dx]) => plan.map(([x, z]) => [x * sx + (dx || 0), y, z * sz + (dz || 0)])), opt);
  // planta retangular com cantos chanfrados (frente cf, trás cb)
  function plan8(w, d, cf, cb, dz) {
    const hw = w / 2, hd = d / 2, o = dz || 0;
    return [[hw - cf, hd + o], [hw, hd - cf + o], [hw, -hd + cb + o], [hw - cb, -hd + o], [-hw + cb, -hd + o], [-hw, -hd + cb + o], [-hw, hd - cf + o], [-hw + cf, hd + o]];
  }
  // superelipse (torres fundidas); kf = expoente da frente
  function superPlan(w, d, n, k, kf, dz) {
    const out = [];
    for (let i = 0; i < n; i++) {
      const a = i / n * TAU, c = Math.cos(a), s = Math.sin(a), e = 2 / (s > 0 ? (kf || k) : k);
      out.push([Math.sign(c) * Math.pow(Math.abs(c), e) * w / 2, Math.sign(s) * Math.pow(Math.abs(s), e) * d / 2 + (dz || 0)]);
    }
    return out;
  }
  // torneado: perfil [raio, altura] no sentido anti-horário (fora à direita); eixo y
  function lathe(prof, n) {
    const tris = [], nor = [];
    for (let i = 0; i < prof.length - 1; i++) {
      const [r0, h0] = prof[i], [r1, h1] = prof[i + 1], dr = r1 - r0, dh = h1 - h0, l = Math.hypot(dr, dh) || 1, nr = dh / l, nh = -dr / l;
      for (let j = 0; j < n; j++) {
        const a0 = j / n * TAU, a1 = (j + 1) / n * TAU, am = (a0 + a1) / 2;
        const P = (r, h, a) => [Math.cos(a) * r, h, Math.sin(a) * r];
        const dir = [Math.cos(am) * nr, nh, Math.sin(am) * nr];
        const A = P(r0, h0, a0), B = P(r0, h0, a1), C = P(r1, h1, a1), D = P(r1, h1, a0);
        if (r0 > 1e-5) tris.push(orient([A, B, C], dir)); if (r1 > 1e-5) tris.push(orient([A, C, D], dir));
        else if (r0 <= 1e-5) continue;
      }
    }
    const g = faces(tris);
    // suaviza em volta do eixo (mantém as quinas do perfil)
    const p = g.attributes.position, nrm = g.attributes.normal;
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), z = p.getZ(i), r = Math.hypot(x, z), ny = nrm.getY(i), nxz = Math.hypot(nrm.getX(i), nrm.getZ(i));
      if (r > 1e-5 && nxz > 1e-4) { const s = Math.sign(nrm.getX(i) * x + nrm.getZ(i) * z) || 1; nrm.setXYZ(i, x / r * nxz * s, ny, z / r * nxz * s); }
    }
    return g;
  }
  // tubo ao longo de pontos (cabos, corrimãos, escapamentos)
  function tube(pts, r, n) {
    n = n || 6; const Rg = [];
    for (let i = 0; i < pts.length; i++) {
      const p = new V3(...pts[i]), T = new V3(...pts[Math.min(pts.length - 1, i + 1)]).sub(new V3(...pts[Math.max(0, i - 1)])).normalize();
      const up = Math.abs(T.y) > 0.9 ? new V3(1, 0, 0) : new V3(0, 1, 0), S = new V3().crossVectors(T, up).normalize(), N = new V3().crossVectors(S, T);
      const rg = []; for (let k = 0; k < n; k++) { const a = k / n * TAU; rg.push(p.clone().addScaledVector(S, Math.cos(a) * r).addScaledVector(N, Math.sin(a) * r).toArray()); }
      Rg.push(rg);
    }
    return loft(Rg, { smooth: true });
  }
  const _cache = new Map();
  const once = (k, fn) => { let g = _cache.get(k); if (!g) { g = fn(); _cache.set(k, g); } return g; };

  /* ---------- peças torneadas ---------- */
  // eixo x; s = +1 face externa para +x
  const AX = (s) => s > 0 ? -Math.PI / 2 : Math.PI / 2;
  const WHEEL = {
    // roda de disco prensado com aro de borracha (alemã, Sherman)
    disc: (n) => ({
      tire: lathe([[0.8, -0.5], [0.95, -0.5], [1, -0.36], [1, 0.36], [0.95, 0.5], [0.8, 0.5]], n),
      disc: lathe([[0, -0.36], [0.81, -0.42], [0.81, 0.44], [0.62, 0.32], [0.42, 0.42], [0.3, 0.5], [0, 0.5]], n),
      hub: lathe([[0, 0.48], [0.24, 0.48], [0.22, 0.66], [0.12, 0.74], [0, 0.75]], 8), bolts: 8,
    }),
    // roda de aço (sem borracha externa)
    steel: (n) => ({
      tire: lathe([[0.84, -0.5], [1, -0.42], [1, 0.42], [0.84, 0.5]], n),
      disc: lathe([[0, -0.36], [0.85, -0.4], [0.85, 0.42], [0.55, 0.34], [0.32, 0.46], [0, 0.48]], n),
      hub: lathe([[0, 0.46], [0.22, 0.46], [0.2, 0.62], [0, 0.66]], 8), bolts: 16,
    }),
    // Christie (T-34, BT, Crusader): grande, com furos de alívio
    big: (n) => ({
      tire: lathe([[0.84, -0.5], [0.96, -0.5], [1, -0.32], [1, 0.32], [0.96, 0.5], [0.84, 0.5]], n),
      disc: lathe([[0, -0.3], [0.85, -0.36], [0.85, 0.36], [0.5, 0.28], [0.3, 0.42], [0, 0.44]], n),
      hub: lathe([[0, 0.4], [0.2, 0.4], [0.17, 0.6], [0, 0.62]], 8), bolts: 6, holes: 6,
    }),
    // roda raiada (VVSS, pequenas)
    spoke: (n) => ({
      tire: lathe([[0.74, -0.5], [0.93, -0.5], [1, -0.34], [1, 0.34], [0.93, 0.5], [0.74, 0.5]], n),
      disc: lathe([[0, -0.2], [0.75, -0.3], [0.75, 0.3], [0.55, 0.2], [0.3, 0.46], [0, 0.48]], n),
      hub: lathe([[0, 0.44], [0.2, 0.44], [0.16, 0.66], [0, 0.68]], 8), spokes: 6,
    }),
  };
  function wheel(B, x, y, z, r, w, s, style) {
    if (LITE) { B.add(once('wl', () => lathe([[0, -0.5], [1, -0.5], [1, 0.5], [0, 0.5]], 7)), PD, r, w, r, x, y, z, 0, 0, AX(s)); return; }
    const W = once('w' + style + (r < 0.3 ? 's' : ''), () => WHEEL[style](r < 0.3 ? 11 : 15)), rz = AX(s);
    B.add(W.tire, style === 'steel' ? PD : RUBBER, r, w, r, x, y, z, 0, 0, rz);
    B.add(W.disc, PT, r, w, r, x, y, z, 0, 0, rz);
    B.add(W.hub, PD, r, w, r, x, y, z, 0, 0, rz);
    const fx = x + s * w * 0.46;
    if (W.bolts && r > 0.2) for (let i = 0; i < W.bolts; i++) { const a = i / W.bolts * TAU, rr = W.bolts > 8 ? 0.88 : 0.34; B.add(box, STEEL, w * 0.12, r * 0.06, r * 0.06, fx + s * w * 0.04, y + Math.cos(a) * r * rr, z + Math.sin(a) * r * rr); }
    if (W.holes) for (let i = 0; i < W.holes; i++) { const a = i / W.holes * TAU + 0.3; B.add(C8, DARK, r * 0.11, w * 0.06, r * 0.11, fx - s * w * 0.04, y + Math.cos(a) * r * 0.6, z + Math.sin(a) * r * 0.6, 0, 0, Math.PI / 2); }
    if (W.spokes) for (let i = 0; i < W.spokes; i++) { const a = i / W.spokes * TAU; B.add(box, PD, w * 0.2, r * 0.48, r * 0.12, fx - s * w * 0.1, y + Math.cos(a) * r * 0.45, z + Math.sin(a) * r * 0.45, a, 0, 0); }
  }
  // roda motriz dentada
  function sprocket(B, x, y, z, r, w, s, teeth) {
    const D = once('spr', () => ({ disc: lathe([[0, -0.5], [0.82, -0.5], [0.84, -0.3], [0.62, -0.2], [0.62, 0.2], [0.84, 0.3], [0.82, 0.5], [0.42, 0.54], [0.3, 0.64], [0, 0.66]], 14) }));
    B.add(D.disc, PT, r, w, r, x, y, z, 0, 0, AX(s));
    const n = teeth || 13;
    for (const side of [-0.38, 0.38]) for (let i = 0; i < n; i++) {
      const a = (i + (side > 0 ? 0.5 : 0)) / n * TAU;
      B.add(box, STEEL, w * 0.18, r * 0.24, r * 0.14, x + s * side * w, y + Math.cos(a) * r * 0.93, z + Math.sin(a) * r * 0.93, a, 0, 0);
    }
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; B.add(box, STEEL, w * 0.1, r * 0.07, r * 0.07, x + s * w * 0.72, y + Math.cos(a) * r * 0.36, z + Math.sin(a) * r * 0.36); }
  }

  /* ---------- lagarta ---------- */
  const TT = 0.085;                                      // espessura do elo
  function hull2(P) {
    const pts = P.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    const cr = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    const lo = [], up = [];
    for (const p of pts) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], p) <= 0) lo.pop(); lo.push(p); }
    for (let i = pts.length - 1; i >= 0; i--) { const p = pts[i]; while (up.length >= 2 && cr(up[up.length - 2], up[up.length - 1], p) <= 0) up.pop(); up.push(p); }
    up.pop(); lo.pop(); return lo.concat(up);          // anti-horário em (z, y)
  }
  // caminho da linha central da lagarta em (z, y)
  function trackPath(G) {
    const R = TT / 2, P = [];
    const circ = (z, y, r, n) => { for (let i = 0; i < n; i++) { const a = i / n * TAU; P.push([z + Math.cos(a) * (r + R), y + Math.sin(a) * (r + R)]); } };
    circ(G.front.z, G.front.y, G.front.r, 28); circ(G.rear.z, G.rear.y, G.rear.r, 28);
    for (const z of G.wheels) circ(z, G.wy, G.wr, 20);
    let H = hull2(P);
    // percurso de cima: apoiado nos roletes (ou no topo das rodas) com barriga entre apoios
    const fTop = [G.front.z, G.front.y + G.front.r + R], rTop = [G.rear.z, G.rear.y + G.rear.r + R];
    const sup = (G.rollers && G.rollers.length ? G.rollers.map(o => [o.z, o.y + o.r + R]) : G.wheels.map(z => [z, G.wy + G.wr + R])).filter(p => p[0] < fTop[0] - 0.05 && p[0] > rTop[0] + 0.05).sort((a, b) => b[0] - a[0]);
    const top = [fTop];
    const all = [fTop, ...sup, rTop];
    for (let i = 1; i < all.length; i++) {
      const a = all[i - 1], b = all[i], d = Math.abs(a[0] - b[0]), sag = (G.sag !== undefined ? G.sag : 0.05) * clamp(d / 0.9, 0.2, 1.6);
      for (let k = 1; k <= 3; k++) { const t = k / 4; top.push([lerp(a[0], b[0], t), lerp(a[1], b[1], t) - Math.sin(t * Math.PI) * sag]); }
      top.push(b);
    }
    let iF = 0, iR = 0, dF = 1e9, dR = 1e9;
    H.forEach((p, i) => { const a = Math.hypot(p[0] - fTop[0], p[1] - fTop[1]), b = Math.hypot(p[0] - rTop[0], p[1] - rTop[1]); if (a < dF) { dF = a; iF = i; } if (b < dR) { dR = b; iR = i; } });
    // anti-horário: da frente (z maior) por cima até a traseira
    const out = []; let i = iR;
    while (true) { out.push(H[i]); if (i === iF) break; i = (i + 1) % H.length; }
    return out.concat(top.slice(1, -1));
  }
  function trackGeo(G) {
    const path = trackPath(G), n = path.length, w = G.tw;
    // espaçamento uniforme para a textura
    const pos = [], nor = [], uv = [];
    let total = 0; const S = [0];
    for (let i = 0; i < n; i++) { const a = path[i], b = path[(i + 1) % n]; total += Math.hypot(b[0] - a[0], b[1] - a[1]); S.push(total); }
    const tile = total / Math.max(1, Math.round(total / (1 / (1.15 * K))));
    const N = path.map((p, i) => { const a = path[(i - 1 + n) % n], b = path[(i + 1) % n], dz = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dz, dy) || 1; return [dy / l, -dz / l]; });
    const quad = (A, B2, C, D, nA, nB, uA, uB, vA, vB) => {
      for (const [P, nn, u, v] of [[A, nA, uA, vA], [B2, nB, uB, vA], [C, nB, uB, vB], [A, nA, uA, vA], [C, nB, uB, vB], [D, nA, uA, vB]]) { pos.push(...P); nor.push(...nn); uv.push(u, v); }
    };
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n, a = path[i], b = path[j], na = N[i], nb = N[j], ua = S[i] / tile, ub = S[i + 1] / tile;
      const o = (p, nn, s) => [p[0] + nn[0] * s * TT / 2, p[1] + nn[1] * s * TT / 2];
      const ao = o(a, na, 1), bo = o(b, nb, 1), ai = o(a, na, -1), bi = o(b, nb, -1);
      const V = (x, q) => [x, q[1], q[0]];
      // externa (elos), interna, laterais
      quad(V(w / 2, ao), V(w / 2, bo), V(-w / 2, bo), V(-w / 2, ao), [0, na[1], na[0]], [0, nb[1], nb[0]], ua, ub, 0, 1);
      quad(V(-w / 2, ai), V(-w / 2, bi), V(w / 2, bi), V(w / 2, ai), [0, -na[1], -na[0]], [0, -nb[1], -nb[0]], ua, ub, 0.02, 0.98);
      for (const s of [-1, 1]) quad(V(s * w / 2, s > 0 ? ai : ao), V(s * w / 2, s > 0 ? bi : bo), V(s * w / 2, s > 0 ? bo : bi), V(s * w / 2, s > 0 ? ao : ai), [s, 0, 0], [s, 0, 0], ua, ub, 0.96, 1.0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3)); g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    // corrige o sentido dos triângulos pelas normais
    const p = g.attributes.position, nr = g.attributes.normal;
    for (let i = 0; i < p.count; i += 3) {
      const A = new V3().fromBufferAttribute(p, i), B2 = new V3().fromBufferAttribute(p, i + 1), C = new V3().fromBufferAttribute(p, i + 2);
      const f = new V3().subVectors(B2, A).cross(new V3().subVectors(C, A)), m = new V3().fromBufferAttribute(nr, i);
      if (f.dot(m) < 0) for (const at of [p, nr, g.attributes.uv]) for (let k = 0; k < at.itemSize; k++) { const t = at.array[(i + 1) * at.itemSize + k]; at.array[(i + 1) * at.itemSize + k] = at.array[(i + 2) * at.itemSize + k]; at.array[(i + 2) * at.itemSize + k] = t; }
    }
    return g;
  }
  // textura dos elos: 4 elos por ladrilho (u ao longo, v na largura)
  const TRACK_TEX = {};
  function trackTex(style) {
    if (TRACK_TEX[style]) return TRACK_TEX[style];
    const W = 256, H = 64, mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
    const col = mk(), bump = mk(), g = col.getContext('2d'), b = bump.getContext('2d');
    g.fillStyle = '#1d1c19'; g.fillRect(0, 0, W, H); b.fillStyle = '#202020'; b.fillRect(0, 0, W, H);
    for (let i = 0; i < 4; i++) {
      const x0 = i * 64;
      const gr = g.createLinearGradient(x0, 0, x0 + 60, 0); gr.addColorStop(0, '#2c2a25'); gr.addColorStop(0.5, '#44413a'); gr.addColorStop(1, '#2a2824');
      g.fillStyle = gr; g.fillRect(x0 + 3, 2, 56, 60); b.fillStyle = '#8a8a8a'; b.fillRect(x0 + 3, 2, 56, 60);
      if (style === 'chevron') {
        g.strokeStyle = '#191816'; g.lineWidth = 9; g.beginPath(); g.moveTo(x0 + 14, 4); g.lineTo(x0 + 36, 32); g.lineTo(x0 + 14, 60); g.stroke();
        b.strokeStyle = '#ffffff'; b.lineWidth = 7; b.beginPath(); b.moveTo(x0 + 14, 4); b.lineTo(x0 + 36, 32); b.lineTo(x0 + 14, 60); b.stroke();
        g.fillStyle = '#56524a'; g.fillRect(x0 + 1, 0, 4, 64);
      } else {
        // garras transversais e guia central
        for (const gx of [16, 40]) { g.fillStyle = '#57534a'; g.fillRect(x0 + gx, 4, 6, 56); b.fillStyle = '#ffffff'; b.fillRect(x0 + gx, 4, 6, 56); }
        g.fillStyle = '#2a2824'; g.fillRect(x0 + 24, 26, 14, 12);
        if (style === 'sov') { g.fillStyle = '#3c3a34'; for (let k = 0; k < 5; k++) g.fillRect(x0 + 6 + k * 11, 6, 3, 52); }
      }
      g.fillStyle = '#0d0c0b'; g.fillRect(x0 + 59, 0, 5, 64); b.fillStyle = '#000'; b.fillRect(x0 + 59, 0, 5, 64);   // vão entre elos
    }
    const t = new THREE.CanvasTexture(col), tb = new THREE.CanvasTexture(bump);
    for (const x of [t, tb]) { x.wrapS = x.wrapT = THREE.RepeatWrapping; }
    return (TRACK_TEX[style] = { t, tb });
  }
  function trackMat(style) {
    const T = trackTex(style), map = T.t.clone(); map.needsUpdate = true;
    return new THREE.MeshPhongMaterial({ map, bumpMap: T.tb, bumpScale: 0.06, shininess: 26, specular: 0x2a2a26, color: 0xcfcac0 });
  }

  /* ---------- pintura (shader) ---------- */
  const NOISE = `
float hash3(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x){ vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z); }`;
  const CAMO = {
    solid: `vec3 camo(vec3 p){ return uC0 * (0.95 + 0.1 * vnoise(p * 0.8)); }`,
    ambush: `vec3 camo(vec3 p){
      float a = vnoise(p * vec3(0.7, 1.1, 0.7) + 3.1), b = vnoise(p * vec3(0.8, 1.2, 0.8) + 17.3);
      vec3 c = uC0; c = mix(c, uC1, smoothstep(0.57, 0.6, a)); c = mix(c, uC2, smoothstep(0.6, 0.63, b) * (1.0 - smoothstep(0.55, 0.58, a)));
      return c; }`,
    blotch: `vec3 camo(vec3 p){
      float a = vnoise(p * 1.1 + 5.0), b = vnoise(p * 1.2 + 21.0);
      vec3 c = uC0; float ea = smoothstep(0.54, 0.56, a), eb = smoothstep(0.56, 0.58, b) * (1.0 - ea);
      c = mix(c, uC1, ea); c = mix(c, uC2, eb);
      float edge = uEdge * (1.0 - smoothstep(0.0, 0.025, abs(a - 0.55))) ; c = mix(c, vec3(0.12), edge);
      return c; }`,
    stripes: `vec3 camo(vec3 p){
      float s = fract((p.z * 0.55 + p.y * 0.85 + p.x * 0.15) * 0.75);
      return s < 0.45 ? uC0 : (s < 0.72 ? uC1 : uC2); }`,
    winter: `vec3 camo(vec3 p){
      float a = vnoise(p * vec3(1.6, 0.9, 1.6)), st = vnoise(vec3(p.x * 5.0, p.y * 0.6, p.z * 5.0));
      return mix(uC1, uC0, smoothstep(0.32, 0.4, a * 0.8 + st * 0.35)); }`,
  };
  const DETAILS = `
    float n = vnoise(p * 9.0) * 0.55 + vnoise(p * 2.6) * 0.45;
    float streak = vnoise(vec3(p.x * 14.0, p.y * 1.2, p.z * 14.0));
    float chip = step(0.87, vnoise(p * 21.0));
    float lum = dot(diffuseColor.rgb, vec3(0.33));
    diffuseColor.rgb *= 0.9 + 0.18 * n - 0.12 * smoothstep(0.55, 1.0, streak) * (1.0 - abs(vDNrm.y));
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.28, 0.27, 0.25), chip * 0.22 * step(0.12, lum));
    float dust = smoothstep(0.6, 0.95, vDNrm.y) * (0.45 + 0.55 * vnoise(p * 3.5)) * step(0.1, lum);
    diffuseColor.rgb = mix(diffuseColor.rgb, uDust, dust * 0.3);
    float mud = (1.0 - smoothstep(0.2, 1.05, p.y)) * (0.5 + 0.5 * vnoise(p * 2.7));
    diffuseColor.rgb = mix(diffuseColor.rgb, uMud, mud * 0.6);`;
  const ZIM = `
    float side = 1.0 - smoothstep(0.45, 0.75, abs(vDNrm.y));
    float rib = smoothstep(0.32, 0.5, abs(fract((p.x * vDNrm.z - p.z * vDNrm.x) * 13.0 + vnoise(p * 6.0) * 0.6) - 0.5));
    float zim = side * step(0.95, p.y) * step(0.14, lum) * paintMask;
    diffuseColor.rgb *= 1.0 - zim * (0.13 * rib + 0.03);`;
  const MATS = new Map();
  function paintMat(sc, zim) {
    const key = sc.id + (zim ? 'Z' : '');
    if (MATS.has(key)) return MATS.get(key);
    const m = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 14, specular: 0x23231f });
    const U = { uC0: { value: new THREE.Color(sc.c[0]) }, uC1: { value: new THREE.Color(sc.c[1] || sc.c[0]) }, uC2: { value: new THREE.Color(sc.c[2] || sc.c[0]) },
      uMud: { value: new THREE.Color(sc.mud || 0x4f4232) }, uDust: { value: new THREE.Color(sc.dust || 0x8f8269) }, uEdge: { value: sc.edge || 0 } };
    m.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U);
      sh.vertexShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvDPos = transformed; vDNrm = normalize(objectNormal);');
      sh.fragmentShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\nuniform vec3 uC0, uC1, uC2, uMud, uDust;\nuniform float uEdge;\n' + NOISE + '\n' + CAMO[sc.pat] + '\n' +
        sh.fragmentShader.replace('#include <color_fragment>', `#include <color_fragment>
    vec3 p = vDPos;
    float paintMask = step(0.995, vColor.r) * step(0.995, vColor.b);
    if (paintMask > 0.5) diffuseColor.rgb = camo(p) * (vColor.g / 0.9);
    ${DETAILS}
    ${zim ? ZIM : ''}`);
    };
    m.customProgramCacheKey = () => 'blind-' + sc.pat + (zim ? 'Z' : '');
    MATS.set(key, m); return m;
  }
  function scheme(nat) {
    const y = (typeof SC !== 'undefined' && SC.year) || 1944, bio = (typeof SC !== 'undefined' && SC.biome) || '';
    const desert = bio === 'desert', winter = bio === 'winter';
    let s;
    if (nat === 'GER') s = desert ? { id: 'gerS', pat: 'solid', c: [0xa58f5f] } : y < 1943.15 ? { id: 'gerG', pat: 'solid', c: [0x4b5054] } : { id: 'ger3', pat: 'ambush', c: [0xaf9a63, 0x55603a, 0x6d4a33] };
    else if (nat === 'USA') s = { id: 'usa', pat: 'solid', c: [0x4d5333] };
    else if (nat === 'ENG') s = desert ? (y < 1942.4 ? { id: 'engC', pat: 'stripes', c: [0xc2b28a, 0x8b948a, 0x52604f] } : { id: 'engS', pat: 'solid', c: [0xb7a578] }) : y < 1944 ? { id: 'engB', pat: 'solid', c: [0x5c513b] } : { id: 'engG', pat: 'solid', c: [0x4e5236] };
    else if (nat === 'SOV') s = { id: 'sov', pat: 'solid', c: [0x4b5631] };
    else if (nat === 'FRA') s = { id: 'fra', pat: 'blotch', c: [0x9b8a57, 0x4c5833, 0x5d4530], edge: 0.8 };
    else if (nat === 'POL') s = { id: 'pol', pat: 'blotch', c: [0x9a8a58, 0x4f5a34, 0x5a4632], edge: 0 };
    else if (nat === 'JAP') s = desert || bio === 'tropical' ? { id: 'japT', pat: 'blotch', c: [0x7c6742, 0x4e5a34, 0xa8925e], edge: 0 } : { id: 'japE', pat: 'blotch', c: [0x7c6742, 0x4e5a34, 0xa8925e], edge: 0 };
    else if (nat === 'ITA') s = desert ? { id: 'itaS', pat: 'solid', c: [0xb59c6a] } : { id: 'itaG', pat: 'solid', c: [0x6b6e50] };
    else s = { id: 'gen', pat: 'solid', c: [0x55593a] };
    if (winter) s = { id: s.id + 'W', pat: 'winter', c: [0xdcdedb, s.c[0]], mud: 0x5a5448, dust: 0xe8eae8 };
    if (desert) Object.assign(s, { mud: 0x8a7650, dust: 0xc9b48a });
    return s;
  }

  /* ---------- decalques ---------- */
  const DTEX = {};
  function canvasTex(w, h, draw) { const c = document.createElement('canvas'); c.width = w; c.height = h; draw(c.getContext('2d'), w, h); const t = new THREE.CanvasTexture(c); return t; }
  function star5(g, cx, cy, R, r) { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r : R; g.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad); } g.closePath(); }
  const DECAL = {
    usstar: () => canvasTex(64, 64, (g) => { g.strokeStyle = '#e6e2d0'; g.lineWidth = 4; g.beginPath(); g.arc(32, 32, 28, 0, 7); g.stroke(); g.fillStyle = '#e6e2d0'; star5(g, 32, 33, 24, 9.5); g.fill(); }),
    usstar0: () => canvasTex(64, 64, (g) => { g.fillStyle = '#e6e2d0'; star5(g, 32, 34, 29, 11.5); g.fill(); }),
    cross: () => canvasTex(64, 64, (g) => { g.fillStyle = '#efede4'; g.fillRect(21, 4, 22, 56); g.fillRect(4, 21, 56, 22); g.fillStyle = '#141414'; g.fillRect(27, 8, 10, 48); g.fillRect(8, 27, 48, 10); }),
    crossO: () => canvasTex(64, 64, (g) => { g.strokeStyle = '#efede4'; g.lineWidth = 4; g.strokeRect(24, 6, 16, 52); g.strokeRect(6, 24, 52, 16); g.fillStyle = 'rgba(0,0,0,0)'; }),
    redstar: () => canvasTex(64, 64, (g) => { g.fillStyle = '#e8e4d8'; star5(g, 32, 34, 30, 12.5); g.fill(); g.fillStyle = '#a3241c'; star5(g, 32, 34, 25, 10); g.fill(); }),
    roundel: () => canvasTex(64, 64, (g) => { for (const [r, c] of [[29, '#a3241c'], [20, '#e8e4d8'], [11, '#283c7a']]) { g.fillStyle = c; g.beginPath(); g.arc(32, 32, r, 0, 7); g.fill(); } }),
    jpstar: () => canvasTex(64, 64, (g) => { g.fillStyle = '#d9b52a'; star5(g, 32, 34, 28, 11); g.fill(); }),
    itplate: () => canvasTex(96, 48, (g) => { g.fillStyle = '#e8e4d8'; g.fillRect(4, 8, 88, 32); g.fillStyle = '#a3241c'; g.fillRect(8, 12, 26, 24); g.fillStyle = '#1d1d1d'; g.font = 'bold 22px Arial'; g.fillText('R.E.', 40, 32); }),
  };
  function dtex(k) { return DTEX[k] || (DTEX[k] = DECAL[k]()); }
  const NUMS = {};
  function numTex(txt, style) {
    const k = txt + style; if (NUMS[k]) return NUMS[k];
    return (NUMS[k] = canvasTex(128, 64, (g) => {
      g.font = 'bold 44px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      if (style === 'ger') { g.lineWidth = 7; g.strokeStyle = '#efede4'; g.strokeText(txt, 64, 34); g.fillStyle = '#7a1c16'; g.fillText(txt, 64, 34); }
      else if (style === 'gerW') { g.fillStyle = '#efede4'; g.fillText(txt, 64, 34); }
      else { g.fillStyle = '#e8e4d8'; g.fillText(txt, 64, 34); }
    }));
  }
  const DMAT = new Map();
  function decalMat(t) { let m = DMAT.get(t); if (!m) { m = new THREE.MeshLambertMaterial({ map: t, transparent: true, alphaTest: 0.3, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2 }); DMAT.set(t, m); } return m; }
  const PLANE = new THREE.PlaneGeometry(1, 1);
  // decalque numa face: (x, y, z) no espaço do pai, ry = direção da face (0 frente, ±π/2 lados)
  function decal(parent, tex, w, h, x, y, z, ry, rx) {
    const m = new THREE.Mesh(PLANE, decalMat(tex)); m.scale.set(w, h, 1); m.position.set(x, y, z); m.rotation.set(rx || 0, ry || 0, 0, 'YXZ'); m.renderOrder = 2; parent.add(m); return m;
  }

  /* ---------- acessórios ---------- */
  const A = {
    hatch(B, x, y, z, r, ry, open) {
      B.add(C16, PT, r, 0.05, r, x, y + 0.025, z);
      B.add(C16, PD, r * 0.82, 0.02, r * 0.82, x, y + 0.055, z);
      B.add(box, STEEL, r * 0.9, 0.035, 0.06, x + Math.sin(ry || 0) * r * 0.92, y + 0.03, z + Math.cos(ry || 0) * r * 0.92, 0, ry || 0, 0);
      B.add(box, STEEL, 0.03, 0.04, r * 0.5, x - Math.sin(ry || 0) * r * 0.5, y + 0.07, z - Math.cos(ry || 0) * r * 0.5, 0, ry || 0, 0);
      void open;
    },
    periscope(B, x, y, z, ry) { B.add(box, PT, 0.18, 0.1, 0.16, x, y + 0.05, z, 0, ry || 0, 0); B.add(box, GLASS, 0.15, 0.05, 0.02, x + Math.sin(ry || 0) * 0.08, y + 0.07, z + Math.cos(ry || 0) * 0.08, 0, ry || 0, 0); B.add(box, PD, 0.2, 0.025, 0.18, x, y + 0.11, z, 0, ry || 0, 0); },
    light(B, x, y, z, ry) { B.add(C12, PT, 0.09, 0.15, 0.09, x, y, z, Math.PI / 2, ry || 0, 0); B.add(C12, 0xb8b4a0, 0.075, 0.02, 0.075, x + Math.sin(ry || 0) * 0.08, y, z + Math.cos(ry || 0) * 0.08, Math.PI / 2, ry || 0, 0); B.add(box, STEEL, 0.03, 0.12, 0.03, x, y - 0.1, z); },
    jerry(B, x, y, z, ry, col) { B.add(box, col || 0x4f5631, 0.16, 0.46, 0.34, x, y, z, 0, ry || 0, 0); B.add(box, DARK, 0.05, 0.05, 0.12, x, y + 0.26, z + 0.08, 0, ry || 0, 0); B.add(box, 0x3a3f22, 0.165, 0.3, 0.02, x, y, z, 0, ry || 0, 0); },
    toolbox(B, x, y, z, w, h, d, ry) { B.add(box, PT, w, h, d, x, y, z, 0, ry || 0, 0); B.add(box, PD, w + 0.01, 0.02, d + 0.01, x, y + h / 2, z, 0, ry || 0, 0); B.add(box, STEEL, 0.06, 0.06, 0.02, x, y + h * 0.2, z + d / 2 + 0.01, 0, ry || 0, 0); },
    cable(B, pts, r) { B.add(tube(pts, r || 0.022, 6), STEEL); },
    // ferramentas: pá, picareta e marreta lado a lado
    tools(B, x, y, z, len, s) {
      B.add(box, WOOD, 0.04, 0.035, len * 0.75, x, y + 0.02, z);
      B.add(box, STEEL, 0.18, 0.012, 0.22, x, y + 0.02, z + len * 0.47);
      B.add(box, WOOD, 0.035, 0.035, len * 0.62, x + s * 0.12, y + 0.02, z - len * 0.05);
      B.add(box, STEEL, 0.25, 0.04, 0.05, x + s * 0.12, y + 0.02, z + len * 0.27);
      B.add(box, WOOD, 0.035, 0.035, len * 0.55, x + s * 0.22, y + 0.02, z - len * 0.1);
      B.add(box, STEEL, 0.08, 0.08, 0.14, x + s * 0.22, y + 0.04, z + len * 0.2);
      for (const dz of [-len * 0.3, len * 0.25]) B.add(box, STEEL, 0.3, 0.025, 0.03, x + s * 0.1, y + 0.04, z + dz);
    },
    links(B, x, y, z, n, w, ry, rx) {
      for (let i = 0; i < n; i++) { const o = (i - (n - 1) / 2) * 0.17; B.add(box, 0x2e2c27, w, 0.05, 0.15, x + Math.cos(ry || 0) * o, y + Math.sin(rx || 0) * 0, z - Math.sin(ry || 0) * o, rx || 0, ry || 0, 0); B.add(box, 0x46433b, w * 0.2, 0.08, 0.06, x + Math.cos(ry || 0) * o, y + 0.03, z - Math.sin(ry || 0) * o, rx || 0, ry || 0, 0); }
    },
    mg(B, x, y, z, ry, rx, kind) {
      const e = new THREE.Euler(rx || 0, ry || 0, 0, 'YXZ'), f = new V3(0, 0, 1).applyEuler(e);
      const at = (d) => [x + f.x * d, y + f.y * d, z + f.z * d];
      B.add(box, DARK, 0.1, 0.12, 0.42, ...at(0), rx || 0, ry || 0, 0);
      if (kind === '50') { B.add(C8, 0x2a2a28, 0.05, 0.55, 0.05, ...at(0.45), Math.PI / 2 + (rx || 0), ry || 0, 0, 'YXZ'); B.add(C8, DARK, 0.022, 0.6, 0.022, ...at(0.85), Math.PI / 2 + (rx || 0), ry || 0, 0); B.add(box, 0x3a3a34, 0.12, 0.1, 0.14, ...at(-0.1).map((v, i) => i === 1 ? v - 0.12 : v), 0, ry || 0, 0); }
      else { B.add(C8, DARK, 0.022, 0.7, 0.022, ...at(0.5), Math.PI / 2 + (rx || 0), ry || 0, 0); B.add(box, DARK, 0.05, 0.08, 0.18, ...at(-0.3), rx || 0, ry || 0, 0); }
    },
    antenna(B, x, y, z, h) { B.add(C8, STEEL, 0.05, 0.1, 0.05, x, y + 0.05, z); B.add(C6, DARK, 0.007, h, 0.007, x, y + h / 2, z); },
    muffler(B, x, y, z, r, len, axis) { const rx = axis === 'z' ? Math.PI / 2 : 0, rz = axis === 'x' ? Math.PI / 2 : 0; B.add(C12, 0x4a3426, r, len, r, x, y, z, rx, 0, rz); B.add(C12, 0x2a2420, r * 1.03, 0.04, r * 1.03, x, y, z, rx, 0, rz); },
    rivets(B, pts) { for (const [x, y, z] of pts) B.add(box, PD, 0.025, 0.025, 0.025, x, y, z); },
    smoke(B, x, y, z, s, n) { for (let i = 0; i < n; i++) B.add(C8, PD, 0.05, 0.16, 0.05, x, y + i * 0.11, z, 0.5, 0, s * 0.6); },
    vis(B, x, y, z, ry, w) { B.add(box, PD, w || 0.22, 0.09, 0.06, x, y, z, 0, ry || 0, 0); B.add(box, GLASS, (w || 0.22) * 0.75, 0.025, 0.02, x + Math.sin(ry || 0) * 0.03, y, z + Math.cos(ry || 0) * 0.03, 0, ry || 0, 0); },
    // cúpula de comandante: tambor com visores e tampa
    cupola(B, x, y, z, r, h, n, kind) {
      B.add(once('cupD', () => lathe([[0, 0], [1, 0], [1, 1], [0.92, 1.08], [0, 1.08]], 16)), PT, r, h, r, x, y, z);
      for (let i = 0; i < n; i++) { const a = i / n * TAU + 0.3; B.add(box, GLASS, 0.1, h * 0.28, 0.05, x + Math.sin(a) * r * 1.0, y + h * 0.6, z + Math.cos(a) * r * 1.0, 0, a, 0); if (kind !== 'us') B.add(box, PD, 0.16, 0.05, 0.08, x + Math.sin(a) * r * 1.03, y + h * 0.82, z + Math.cos(a) * r * 1.03, 0, a, 0); }
      if (kind === 'us') B.add(once('cupT', () => lathe([[0, 0], [1, 0], [0.9, 0.35], [0.5, 0.62], [0, 0.66]], 14)), PT, r * 0.92, h, r * 0.92, x, y + h * 1.05, z);
      else A.hatch(B, x, y + h * 1.06, z, r * 0.78, Math.PI, false);
    },
    // grade do motor
    grille(B, x, y, z, w, d, n) { B.add(box, DARK, w, 0.02, d, x, y, z); for (let i = 0; i < n; i++) B.add(box, PD, w * 0.96, 0.03, 0.025, x, y + 0.015, z - d / 2 + (i + 0.5) * d / n); },
    rail(B, pts) { B.add(tube(pts, 0.015, 5), PD); },
    // tanque de combustível externo
    fuel(B, x, y, z, r, len) { B.add(C12, PT, r, len, r, x, y, z, Math.PI / 2, 0, 0); for (const dz of [-len * 0.3, len * 0.3]) B.add(C12, STEEL, r * 1.04, 0.03, r * 1.04, x, y, z + dz, Math.PI / 2, 0, 0); },
  };

  /* ---------- canhões (eixo +z, origem no mantelete) ---------- */
  // perfis: [raio, posição]; o torneado é feito em y e girado para z
  function gunGeo(spec) {
    const { len, r0, r1, brake, sleeve } = spec, P = [[0, 0], [sleeve ? sleeve[0] : r0 * 1.5, 0], [sleeve ? sleeve[0] : r0 * 1.5, sleeve ? sleeve[1] : 0.25], [r0, (sleeve ? sleeve[1] : 0.25) + 0.05]];
    const L = len;
    if (brake === 'double') { const br = r1 * 2.1, bl = Math.max(0.3, r1 * 6.5); P.push([r1, L - bl], [br, L - bl], [br, L - bl * 0.58], [r1 * 1.2, L - bl * 0.55], [r1 * 1.2, L - bl * 0.45], [br, L - bl * 0.42], [br, L - 0.03], [r1 * 0.7, L]); }
    else if (brake === 'single') { const br = r1 * 1.9, bl = r1 * 4.2; P.push([r1, L - bl], [br, L - bl], [br, L - 0.02], [r1 * 0.7, L]); }
    else if (brake === 'swell') P.push([r1, L - 0.2], [r1 * 1.25, L - 0.12], [r1 * 1.25, L], [r1 * 0.7, L]);
    else if (brake === 'thread') P.push([r1, L - 0.12], [r1 * 1.12, L - 0.11], [r1 * 1.12, L], [r1 * 0.68, L]);
    else P.push([r1, L], [r1 * 0.65, L]);
    P.push([r1 * 0.6, L - 0.05], [0, L - 0.05]);
    // a lista precisa ir no sentido anti-horário (r para fora, h para cima): de (0,0) para a borda, sobe, volta
    const g = lathe(P, 12);
    return g;
  }
  // o canhão fica na altura real (y) para a lama e a poeira do shader; o recuo move só em z
  function addGun(B, spec) {
    const y = spec.y;
    B.add(gunGeo(spec), PT, 1, 1, 1, 0, y, 0, Math.PI / 2, 0, 0);
    B.add(C8, DARK, spec.r1 * 0.6, 0.02, spec.r1 * 0.6, 0, y, spec.len - 0.02, Math.PI / 2, 0, 0);
    if (spec.brake === 'double') for (const s of [-1, 1]) for (const k of [0.75, 0.33]) { const bl = Math.max(0.3, spec.r1 * 6.5); B.add(box, DARK, 0.012, spec.r1 * 1.7, bl * 0.18, s * spec.r1 * 2.11, y, spec.len - bl * k, 0, 0, 0); }
  }

  /* ---------- trem de rolamento ---------- */
  // G: { tw, x (centro da lagarta), wr, wheels:[z], style, front:{z,y,r,sprocket}, rear:{...}, rollers:[{z,y,r}], bogie, inter, sag, tex }
  function runningGear(B, G) {
    G.wy = G.wy || G.wr + TT;
    for (const s of [-1, 1]) {
      const x = s * G.x;
      for (const e of [G.front, G.rear]) {
        if (e.sprocket) sprocket(B, x, e.y, e.z, e.r, G.tw * 0.8, s, e.teeth);
        else wheel(B, x, e.y, e.z, e.r, G.tw * 0.75, s, e.style || 'steel');
        B.add(C12, PD, e.r * 0.3, G.tw * 0.5, e.r * 0.3, x - s * G.tw * 0.5, e.y, e.z, 0, 0, Math.PI / 2);   // cubo e eixo
      }
      if (G.inter) {
        // rodas intercaladas (Tiger, Panther): duas fileiras visíveis
        G.wheels.forEach((z, i) => {
          const outer = i % 2 === 0, wx = x + s * (outer ? G.tw * 0.27 : -G.tw * 0.02);
          wheel(B, wx, G.wy, z, G.wr, G.tw * 0.24, s, G.style);
          if (outer && !LITE) B.add(once('wIn', () => lathe([[0.8, -0.5], [1, -0.4], [1, 0.4], [0.8, 0.5], [0, 0.5]], 10)), RUBBER, G.wr, G.tw * 0.22, G.wr, x - s * G.tw * 0.3, G.wy, z, 0, 0, AX(s));
          B.add(box, PD, 0.1, 0.08, 0.38, x - s * (G.tw * 0.62), G.wy + 0.04, z + 0.12, -0.35, 0, 0);
        });
      } else {
        for (const z of G.wheels) {
          if (LITE) wheel(B, x, G.wy, z, G.wr, G.tw * 0.84, s, G.style);
          else if (!G.single) { wheel(B, x + s * G.tw * 0.24, G.wy, z, G.wr, G.tw * 0.36, s, G.style); B.add(once('wIn', () => lathe([[0.8, -0.5], [1, -0.4], [1, 0.4], [0.8, 0.5], [0, 0.5]], 10)), RUBBER, G.wr, G.tw * 0.36, G.wr, x - s * G.tw * 0.24, G.wy, z, 0, 0, AX(s)); }
          else wheel(B, x + s * G.tw * 0.02, G.wy, z, G.wr, G.tw * 0.58, s, G.style);
        }
      }
      for (const o of G.rollers || []) { wheel(B, x + s * 0.02, o.y, o.z, o.r, G.tw * 0.5, s, 'spoke'); B.add(box, PD, 0.08, 0.06, 0.06, x - s * G.tw * 0.38, o.y, o.z); }
      // suspensão
      if (G.bogie === 'vvss') for (const bz of G.bogies) {
        B.add(box, PT, 0.16, 0.44, 0.52, x - s * 0.14, G.wy + 0.22, bz);                       // suporte do truque
        for (const d of [-1, 1]) B.add(box, PT, 0.08, 0.08, 0.36, x - s * 0.02, G.wy + 0.1, bz + d * 0.15, -d * 0.5, 0, 0);   // braços
        B.add(C12, PD, 0.085, 0.3, 0.085, x - s * 0.02, G.wy + 0.28, bz);                     // mola voluta
        for (let k = 0; k < 4; k++) B.add(C12, STEEL, 0.092, 0.02, 0.092, x - s * 0.02, G.wy + 0.16 + k * 0.07, bz);
        B.add(box, PT, 0.26, 0.07, 0.42, x - s * 0.06, G.wy + 0.44, bz);
      } else if (G.bogie === 'leaf') for (const bz of G.bogies) {
        B.add(box, PT, 0.12, 0.24, 0.62, x - s * G.tw * 0.62, G.wy + 0.08, bz);
        for (let k = 0; k < 4; k++) B.add(box, STEEL, 0.1, 0.03, 0.55 - k * 0.08, x - s * G.tw * 0.62, G.wy + 0.24 + k * 0.035, bz);
        for (const d of [-1, 1]) B.add(box, PD, 0.08, 0.08, 0.3, x - s * G.tw * 0.5, G.wy + 0.02, bz + d * 0.15, d * 0.35, 0, 0);
      } else if (G.bogie === 'torsion') for (const z of G.wheels) {
        B.add(box, PD, 0.1, 0.09, 0.42, x - s * G.tw * 0.62, G.wy + 0.08, z + 0.16, -0.38, 0, 0);
      }
      if (G.skirt) {
        const S = G.skirt;
        B.add(box, PT, 0.04, S.h, S.len, x + s * (G.tw / 2 + 0.06), S.y, S.z || 0);
        if (S.chutes) for (let i = 0; i < S.chutes; i++) B.add(box, DARK, 0.05, 0.14, 0.22, x + s * (G.tw / 2 + 0.065), S.y - S.h * 0.25, (S.z || 0) - S.len / 2 + (i + 0.5) * S.len / S.chutes);
        for (let i = 0; i < Math.round(S.len / 0.12); i++) B.add(box, PD, 0.02, 0.02, 0.02, x + s * (G.tw / 2 + 0.085), S.y + S.h * 0.42, (S.z || 0) - S.len / 2 + (i + 0.5) * 0.12);
      }
    }
  }


  /* ---------- ajudantes de modelagem ---------- */
  // inverte faces e normais (lado de dentro de torres abertas)
  function flip(geo) {
    const g = geo.clone(), p = g.attributes.position, n = g.attributes.normal;
    for (let i = 0; i < p.count; i += 3) for (const at of [p, n]) for (let k = 0; k < 3; k++) { const a = at.array[(i + 1) * 3 + k]; at.array[(i + 1) * 3 + k] = at.array[(i + 2) * 3 + k]; at.array[(i + 2) * 3 + k] = a; }
    for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
    return g;
  }
  // torre aberta: paredes externas + internas + piso escuro
  function openTurret(B, plan, rings, thick) {
    B.add(tloft(plan, rings, { capB: false }), PT);
    const k = 1 - (thick || 0.05) / 1.0;
    B.add(flip(tloft(plan, rings.map(([y, sx, sz, dz, dx]) => [y, sx * k, sz * k, dz, dx]), { capB: false })), PD);
    B.add(tloft(plan, [[rings[0][0] + 0.1, k * 0.98, k * 0.98], [rings[0][0] + 0.11, k * 0.98, k * 0.98]]), 0x2a2a26);
  }
  const H2 = (B, pts, hw, col, dx) => B.add(prism(pts.map(p => p.length > 2 ? p : [p[0], p[1], hw])), col === undefined ? PT : col, 1, 1, 1, dx || 0, 0, 0);
  function fenders(B, hw, y, z0, z1, w) { for (const s of [-1, 1]) B.add(box, PT, w || 0.3, 0.025, z0 - z1, s * (hw - (w || 0.3) / 2), y, (z0 + z1) / 2); }
  function rivLine(B, a, b, n) { for (let i = 0; i <= n; i++) { const t = i / n; B.add(box, PD, 0.028, 0.028, 0.028, lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)); } }
  // rebites ao longo das quinas de um polígono lateral [z, y] nas duas laterais
  function rivEdges(B, pts, hw, step) { for (const s of [-1, 1]) for (let i = 0; i < pts.length; i++) { const a = pts[i], b = pts[(i + 1) % pts.length], L = Math.hypot(b[0] - a[0], b[1] - a[1]); if (L < 0.3) continue; rivLine(B, [s * (hw + 0.012), a[1] + (b[1] < a[1] ? 0.04 : -0.04) * 0, a[0]], [s * (hw + 0.012), b[1], b[0]], Math.max(2, Math.round(L / (step || 0.22)))); } }
  // marcas nacionais
  function mark(g, tur, nat, o) {
    const sz = o.s || 0.6;
    if (nat === 'USA') { if (o.h) for (const s of [-1, 1]) decal(g, dtex('usstar'), sz * 1.4, sz * 1.4, s * o.h[0], o.h[1], o.h[2], s * Math.PI / 2); if (o.t) for (const s of [-1, 1]) decal(tur, dtex('usstar'), sz, sz, s * o.t[0], o.t[1], o.t[2], s * Math.PI / 2); }
    else if (nat === 'GER') { if (o.h) for (const s of [-1, 1]) decal(g, dtex('cross'), sz, sz, s * o.h[0], o.h[1], o.h[2], s * Math.PI / 2); if (o.t) { const num = String(o.n || (100 * (1 + ((Math.random() * 8) | 0)) + ((Math.random() * 30) | 0) + 1)); for (const s of [-1, 1]) decal(tur, numTex(num, 'ger'), sz * 1.5, sz * 0.75, s * o.t[0], o.t[1], o.t[2], s * (Math.PI / 2 - (o.ta || 0))); } }
    else if (nat === 'SOV') { if (o.t) { const num = String(100 + ((Math.random() * 90) | 0)); for (const s of [-1, 1]) decal(tur, numTex(num, 'sov'), sz * 1.4, sz * 0.7, s * o.t[0], o.t[1], o.t[2], s * (Math.PI / 2 - (o.ta || 0))); } }
    else if (nat === 'FRA') { if (o.t) for (const s of [-1, 1]) decal(tur, dtex('roundel'), sz * 0.6, sz * 0.6, s * o.t[0], o.t[1], o.t[2], s * (Math.PI / 2 - (o.ta || 0))); }
    else if (nat === 'JAP') { if (o.f) decal(g, dtex('jpstar'), sz * 0.5, sz * 0.5, o.f[0], o.f[1], o.f[2], 0, o.f[3] || 0); }
    else if (nat === 'ITA') { if (o.h) for (const s of [-1, 1]) decal(g, dtex('itplate'), sz * 0.9, sz * 0.45, s * o.h[0], o.h[1], o.h[2], s * Math.PI / 2); }
  }
  // mantelete "cabeça de porco" (fundido, arredondado)
  const SAU = () => once('sau', () => lathe([[0, 0], [1, 0], [1.02, 0.25], [0.86, 0.62], [0.5, 0.92], [0, 1]], 14));

  /* ---------- tanques ---------- */
  // cada função recebe o contexto: H (casco), T (torre), G (canhão), opções (ano) e devolve as medidas
  const SPEC = {};

  // M4A3 Sherman (75 mm), casco soldado de 47°, suspensão VVSS
  SPEC.sherman = {
    nat: 'USA', L: 5.84, track: 'chevron',
    gear: { tw: 0.42, x: 1.1, wr: 0.254, style: 'spoke', wheels: [1.85, 1.29, 0.31, -0.25, -1.23, -1.79], bogie: 'vvss', bogies: [1.57, 0.03, -1.51],
      front: { z: 2.5, y: 0.98, r: 0.33, sprocket: true, teeth: 13 }, rear: { z: -2.58, y: 0.58, r: 0.29, style: 'spoke' },
      rollers: [{ z: 1.4, y: 0.9, r: 0.1 }, { z: -0.14, y: 0.9, r: 0.1 }, { z: -1.68, y: 0.9, r: 0.1 }], sag: 0.03 },
    hull(B) {
      // casco inferior e nariz da transmissão (três peças aparafusadas)
      B.add(prism([[2.3, 1.1, 0.87], [2.62, 1.04, 0.87], [2.86, 0.88, 0.87], [2.94, 0.68, 0.87], [2.84, 0.5, 0.86], [2.55, 0.42, 0.84], [-2.5, 0.42, 0.86], [-2.86, 0.6, 0.86], [-2.9, 1.1, 0.86]]), PT);
      for (const z of [2.53, 2.79]) B.add(box, PD, 1.78, 0.05, 0.05, 0, z > 2.7 ? 0.93 : 1.06, z, 0.6, 0, 0);
      for (const sx of [-1, 1]) B.add(box, STEEL, 0.1, 0.16, 0.18, sx * 0.6, 0.62, 2.88);                    // ganchos de reboque
      // casco superior com sponsons sobre as lagartas
      B.add(prism([[2.28, 1.07, 1.31], [1.15, 1.88, 1.26], [-1.8, 1.88, 1.26], [-2.55, 1.8, 1.27], [-2.84, 1.62, 1.29], [-2.84, 1.07, 1.31]]), PT);
      // capotas do motorista e do auxiliar
      for (const sx of [-1, 1]) {
        B.add(prism([[1.6, 1.62, 0.3], [1.28, 1.98, 0.27], [0.95, 1.98, 0.27], [0.95, 1.86, 0.3]]), PT, 1, 1, 1, sx * 0.5, 0, 0);
        A.hatch(B, sx * 0.5, 1.98, 1.1, 0.27, 0);
        A.periscope(B, sx * 0.5, 1.98, 1.4, 0);
      }
      A.mg(B, -0.58, 1.38, 2.0, 0, 0.12);                                                                   // metralhadora do casco
      B.add(HEMI, PT, 0.14, 0.12, 0.14, -0.58, 1.36, 1.86, 0.9, 0, 0);
      for (const sx of [-1, 1]) A.light(B, sx * 0.95, 1.6, 2.02, 0);
      // convés do motor: tampas, grades, tampões e ferramentas
      A.grille(B, 0, 1.885, -2.25, 1.6, 0.55, 8);
      for (const sx of [-1, 1]) { B.add(box, PD, 0.9, 0.03, 0.9, sx * 0.55, 1.9, -1.35); B.add(C8, STEEL, 0.07, 0.04, 0.07, sx * 0.95, 1.91, -0.65); }
      A.tools(B, -0.95, 1.9, -1.55, 1.3, 1); A.tools(B, 0.75, 1.9, -1.8, 1.0, -1);
      // traseira: defletor de escapamento, lanternas e galões
      B.add(prism([[-2.86, 1.12, 1.15], [-3.02, 0.92, 1.15], [-2.88, 0.86, 1.15]]), PT);
      for (const sx of [-1, 1]) { B.add(box, 0xa3241c, 0.08, 0.05, 0.03, sx * 1.05, 1.5, -2.86); A.jerry(B, sx * 0.62, 1.35, -2.97, 0); }
      A.cable(B, [[1.29, 1.6, 1.0], [1.3, 1.62, -0.5], [1.3, 1.62, -2.0], [1.25, 1.5, -2.6]]);
      // lona e sacos sobre os sponsons
      B.add(C8, CANVAS, 0.17, 1.1, 0.17, -0.85, 2.05, -2.45, 0, 0, Math.PI / 2);
      for (const [x, z] of [[1.12, -0.7], [1.05, -0.2]]) B.add(SPH, 0x6a6346, 0.24, 0.16, 0.3, x, 1.98, z);
      return { tur: [0, 0.08], deck: 1.88 };
    },
    turret(B) {
      const y0 = 1.88;
      B.add(tloft(superPlan(1.78, 2.05, 22, 2.4, 2.0, -0.12), [[0, 0.96, 0.96], [0.08, 1, 1], [0.42, 0.99, 0.99], [0.66, 0.9, 0.92, -0.02], [0.82, 0.68, 0.74, -0.06]].map(r => [r[0] + y0, ...r.slice(1)]), { smooth: true }), PT);
      B.add(C16, PD, 0.92, 0.07, 0.92, 0, y0 + 0.03, 0);                                              // anel de base
      // mantelete M34A1 com rotor e abas laterais
      B.add(prism([[0.78, 0.12, 0.52], [1.02, 0.18, 0.5], [1.06, 0.4, 0.5], [1.02, 0.66, 0.5], [0.78, 0.72, 0.52]].map(([z, y, h]) => [z, y + y0, h])), PT);
      B.add(C12, PD, 0.13, 0.26, 0.13, 0, y0 + 0.42, 1.12, Math.PI / 2, 0, 0);
      for (const s of [-1, 1]) B.add(box, PT, 0.06, 0.48, 0.34, s * 0.53, y0 + 0.42, 0.88);
      A.mg(B, -0.22, y0 + 0.42, 1.12, 0, 0);                                                            // coaxial
      B.add(box, PD, 0.1, 0.1, 0.06, 0.24, y0 + 0.58, 1.06);                                            // luneta
      // blindagem extra na bochecha direita
      B.add(box, PT, 0.06, 0.42, 0.6, -0.78, y0 + 0.38, 0.4, 0, -0.35, 0);
      // cúpula do comandante, escotilha do municiador, .50, periscópios, ventilador
      A.cupola(B, -0.42, y0 + 0.78, -0.42, 0.3, 0.2, 6, 'us');
      A.mg(B, -0.42, y0 + 1.12, -0.25, 0.15, -0.08, '50');
      B.add(C8, STEEL, 0.02, 0.24, 0.02, -0.42, y0 + 1.0, -0.28);
      A.hatch(B, 0.4, y0 + 0.8, -0.35, 0.28, 0);
      for (const x of [0.4, -0.05]) A.periscope(B, x, y0 + 0.8, 0.32, 0);
      B.add(HEMI, PT, 0.13, 0.1, 0.13, 0.05, y0 + 0.8, -0.05);
      A.antenna(B, 0.55, y0 + 0.62, -0.98, 2.4);
      B.add(C8, PD, 0.07, 0.04, 0.07, 0.86, y0 + 0.4, -0.2, 0, 0, Math.PI / 2);                          // porta de pistola
      for (const s of [-1, 1]) B.add(box, STEEL, 0.06, 0.06, 0.12, s * 0.62, y0 + 0.78, 0.4);           // olhais de içamento
      return { y: y0 + 0.42, z: 1.12, len: 2.7, r0: 0.065, r1: 0.055, brake: 'thread', sleeve: [0.1, 0.35] };
    },
    decals(g, tur) {
      for (const s of [-1, 1]) { decal(g, dtex('usstar'), 0.95, 0.95, s * 1.325, 1.45, -0.45, s * Math.PI / 2); decal(tur, dtex('usstar'), 0.62, 0.62, s * 0.9, 1.88 + 0.42, -0.25, s * Math.PI / 2); }
      decal(g, dtex('usstar'), 1.2, 1.2, 0, 1.895, -1.1, 0, -Math.PI / 2);
    },
  };

  // Panzer IV Ausf. H (Schürzen a partir de 1943)
  SPEC.panzer4 = {
    nat: 'GER', L: 5.92, track: 'ger', zim: true, flags: (y) => (y >= 1943.3 ? 'S' : ''),
    gear: { tw: 0.4, x: 1.24, wr: 0.235, style: 'disc', wheels: [1.64, 1.16, 0.71, 0.23, -0.24, -0.72, -1.17, -1.65], pair: false, bogie: 'leaf', bogies: [1.4, 0.47, -0.48, -1.41],
      front: { z: 2.45, y: 0.86, r: 0.33, sprocket: true, teeth: 20 }, rear: { z: -2.6, y: 0.66, r: 0.3, style: 'steel' },
      rollers: [{ z: 1.78, y: 0.82, r: 0.1 }, { z: 0.6, y: 0.84, r: 0.1 }, { z: -0.6, y: 0.84, r: 0.1 }, { z: -1.75, y: 0.82, r: 0.1 }], sag: 0.025 },
    hull(B, f) {
      B.add(prism([[2.9, 0.5, 0.98], [3.0, 0.74, 0.98], [2.8, 1.06, 0.98], [2.28, 1.13, 0.98], [-2.85, 1.13, 0.98], [-2.95, 0.66, 0.98], [-2.7, 0.44, 0.96], [2.6, 0.42, 0.96]]), PT);
      // superestrutura: chapa frontal vertical, teto e convés do motor
      B.add(prism([[2.24, 1.08, 1.12], [2.24, 1.74, 1.1], [0.95, 1.74, 1.1], [-1.25, 1.74, 1.1], [-1.35, 1.7, 1.12], [-2.84, 1.66, 1.12], [-2.9, 1.08, 1.12]]), PT);
      // para-lamas
      B.add(box, PT, 0.32, 0.03, 5.5, 1.28, 1.08, -0.15); B.add(box, PT, 0.32, 0.03, 5.5, -1.28, 1.08, -0.15);
      for (const s of [-1, 1]) B.add(prism([[2.62, 1.08, 0.16], [3.02, 0.86, 0.16], [3.05, 0.84, 0.16], [2.65, 1.1, 0.16]]), PT, 1, 1, 1, s * 1.28, 0, 0);
      // visor do motorista, metralhadora do rádio-operador, escotilhas
      B.add(box, PT, 0.36, 0.16, 0.1, 0.45, 1.5, 2.28); B.add(box, GLASS, 0.2, 0.03, 0.02, 0.45, 1.5, 2.34);
      B.add(HEMI, PT, 0.15, 0.13, 0.15, -0.45, 1.46, 2.24, Math.PI / 2, 0, 0); A.mg(B, -0.45, 1.46, 2.42, 0, 0.05);
      for (const s of [-1, 1]) { B.add(box, PT, 0.62, 0.05, 0.5, s * 0.5, 1.765, 1.85); B.add(box, STEEL, 0.5, 0.04, 0.04, s * 0.5, 1.8, 1.64); }
      A.links(B, 0, 1.0, 2.9, 7, 0.36, 0, 0.75);                                                            // elos no nariz
      A.light(B, 1.12, 1.25, 2.55, 0);                                                                        // farol Bosch
      // ferramentas e cabos nos para-lamas
      A.tools(B, 1.25, 1.1, -0.2, 1.4, -1); A.tools(B, -1.25, 1.1, 0.2, 1.4, 1);
      for (const s of [-1, 1]) A.cable(B, [[s * 1.18, 1.18, 1.7], [s * 1.2, 1.2, 0.6], [s * 1.2, 1.2, -1.0], [s * 1.16, 1.15, -2.0]]);
      // convés: grades, tampas, escapamento traseiro e macaco
      A.grille(B, 0, 1.68, -2.2, 1.6, 0.5, 9);
      for (const s of [-1, 1]) B.add(box, PD, 0.8, 0.03, 0.75, s * 0.48, 1.72, -1.6);
      A.muffler(B, 0.4, 0.95, -3.08, 0.17, 0.95, 'x'); B.add(C8, 0x3a2a22, 0.05, 0.25, 0.05, 0.85, 1.05, -3.08);
      A.jerry(B, -0.75, 1.3, -3.03, 0, 0x4a4c3c);
      A.antenna(B, -0.95, 1.72, -1.3, 2.0);
      if (f.includes('S')) {
        // Schürzen: placas de 5 mm penduradas num trilho
        for (const s of [-1, 1]) {
          B.add(box, STEEL, 0.04, 0.04, 4.9, s * 1.5, 1.4, -0.1);
          for (let i = 0; i < 5; i++) { const z = 2.15 - i * 0.98 - 0.48; B.add(box, PT, 0.02, 0.98, 0.96, s * 1.52, 0.92, z, 0, 0, s * 0.04); B.add(box, STEEL, 0.06, 0.12, 0.05, s * 1.47, 1.35, z); }
        }
      }
      return { tur: [0.07, 0.15] };
    },
    turret(B, f) {
      const y0 = 1.74;
      B.add(tloft([[0.6, 0.86], [0.86, 0.36], [0.86, -0.55], [0.68, -0.92], [-0.68, -0.92], [-0.86, -0.55], [-0.86, 0.36], [-0.6, 0.86]], [[y0, 1, 1], [y0 + 0.68, 0.78, 0.9, -0.04]]), PT);
      B.add(C16, PD, 0.86, 0.05, 0.86, 0, y0 + 0.02, 0);
      // mantelete e luneta, escotilhas laterais, cúpula, caixa traseira
      B.add(box, PT, 0.66, 0.4, 0.14, 0, y0 + 0.36, 0.92); B.add(C12, PD, 0.12, 0.3, 0.12, 0, y0 + 0.36, 1.04, Math.PI / 2, 0, 0);
      A.mg(B, -0.2, y0 + 0.36, 1.0, 0, 0); B.add(box, GLASS, 0.06, 0.06, 0.02, 0.2, y0 + 0.42, 1.0);
      for (const s of [-1, 1]) { B.add(box, PD, 0.03, 0.42, 0.5, s * 0.8, y0 + 0.34, 0.0, 0, 0, s * 0.18); A.vis(B, s * 0.7, y0 + 0.45, 0.6, s * 0.7, 0.18); }
      A.cupola(B, 0, y0 + 0.66, -0.55, 0.3, 0.26, 5, 'de');
      A.hatch(B, 0.42, y0 + 0.66, 0.2, 0.18, 0);
      B.add(box, PT, 1.0, 0.42, 0.42, 0, y0 + 0.36, -1.15); B.add(box, PD, 1.02, 0.04, 0.44, 0, y0 + 0.58, -1.15);
      if (f.includes('S')) {
        // blindagem espaçada em volta da torre
        const ring = [[0.96, 0.45], [1.06, -0.1], [1.06, -0.75], [0.8, -1.3], [-0.8, -1.3], [-1.06, -0.75], [-1.06, -0.1], [-0.96, 0.45]];
        for (let i = 0; i < ring.length - 1; i++) {
          const [x0, z0] = ring[i], [x1, z1] = ring[i + 1], len = Math.hypot(x1 - x0, z1 - z0), ry = Math.atan2(x1 - x0, z1 - z0);
          B.add(box, PT, 0.02, 0.62, len, (x0 + x1) / 2, y0 + 0.3, (z0 + z1) / 2, 0, ry, 0);
        }
        for (const s of [-1, 1]) for (const z of [0.3, -0.9]) B.add(box, STEEL, 0.24, 0.05, 0.05, s * 0.92, y0 + 0.55, z);
      }
      return { y: y0 + 0.36, z: 1.04, len: 3.55, r0: 0.06, r1: 0.044, brake: 'double', sleeve: [0.1, 0.4] };
    },
    decals(g, tur, f) {
      const num = String(400 + ((Math.random() * 30) | 0) + 1);
      const sch = f.includes('S');
      for (const s of [-1, 1]) {
        decal(g, dtex('cross'), 0.6, 0.6, s * (sch ? 1.535 : 1.125), sch ? 1.05 : 1.4, sch ? -0.05 : -1.0, s * Math.PI / 2);
        decal(tur, numTex(num, 'ger'), 0.9, 0.45, s * (sch ? 1.075 : 0.83), 1.74 + 0.32, sch ? -0.5 : -0.25, s * Math.PI / 2);
      }
    },
  };

  // Tiger I (produção de meados de 1943)
  SPEC.tiger = {
    nat: 'GER', L: 6.32, track: 'ger', zim: true,
    gear: { tw: 0.725, x: 1.42, wr: 0.4, style: 'disc', inter: true, wheels: [2.02, 1.44, 0.86, 0.28, -0.3, -0.88, -1.46, -2.04],
      front: { z: 2.72, y: 0.98, r: 0.42, sprocket: true, teeth: 18 }, rear: { z: -2.8, y: 0.78, r: 0.33, style: 'steel' }, sag: 0.05 },
    hull(B) {
      B.add(prism([[3.1, 0.6, 0.92], [2.34, 1.02, 0.92], [-2.98, 1.02, 0.92], [-3.0, 0.5, 0.92], [-2.6, 0.42, 0.92], [2.8, 0.42, 0.92]]), PT);
      B.add(prism([[2.34, 1.0, 1.58], [2.34, 1.95, 1.58], [-2.98, 1.95, 1.58], [-3.02, 1.0, 1.58]]), PT);
      // para-lamas dianteiros e traseiros
      for (const s of [-1, 1]) {
        B.add(prism([[2.34, 1.0, 0.24], [3.15, 0.95, 0.24], [3.15, 0.99, 0.24], [2.34, 1.04, 0.24]]), PT, 1, 1, 1, s * 1.55, 0, 0);
        B.add(box, PT, 0.48, 0.03, 0.35, s * 1.55, 1.0, -3.15);
      }
      // visor do motorista, metralhadora em bola, escotilhas, periscópios
      B.add(box, PT, 0.46, 0.18, 0.12, 0.62, 1.68, 2.38); B.add(box, GLASS, 0.3, 0.03, 0.02, 0.62, 1.68, 2.45);
      B.add(HEMI, PT, 0.18, 0.15, 0.18, -0.62, 1.62, 2.34, Math.PI / 2, 0, 0); A.mg(B, -0.62, 1.62, 2.55, 0, 0.04);
      for (const s of [-1, 1]) { A.hatch(B, s * 0.62, 1.95, 1.8, 0.28, 0); A.periscope(B, s * 0.62, 1.95, 2.18, 0); }
      A.light(B, 0, 2.08, 2.25, 0);
      // cabos e ferramentas nas laterais, elos de reserva
      for (const s of [-1, 1]) { A.cable(B, [[s * 1.6, 1.75, 1.9], [s * 1.62, 1.72, 0.3], [s * 1.62, 1.72, -1.6], [s * 1.58, 1.6, -2.7]], 0.028); A.tools(B, s * 1.4, 1.96, 0.1, 1.5, -s); }
      // convés: tampas dos ventiladores, grades, escotilha do motor
      for (const s of [-1, 1]) { A.grille(B, s * 0.95, 1.955, -2.15, 0.85, 1.25, 8); B.add(C16, PD, 0.32, 0.05, 0.32, s * 0.95, 1.99, -1.2); B.add(C16, DARK, 0.26, 0.06, 0.26, s * 0.95, 2.0, -1.2); }
      B.add(box, PD, 1.0, 0.04, 1.1, 0, 1.97, -2.1);
      // traseira: dois escapamentos verticais com protetores, macaco, ganchos
      for (const s of [-1, 1]) { A.muffler(B, s * 0.62, 1.55, -3.14, 0.13, 0.75, 'y'); B.add(box, PT, 0.34, 0.85, 0.06, s * 0.62, 1.55, -3.3); B.add(C8, 0x3a2a22, 0.07, 0.25, 0.07, s * 0.62, 2.02, -3.14); }
      B.add(C8, STEEL, 0.1, 0.55, 0.1, 0, 1.15, -3.12, 0, 0, Math.PI / 2);
      return { tur: [0, -0.2] };
    },
    turret(B) {
      const y0 = 1.95, plan = [[1.15, 0.82], [1.15, -0.5]];
      // planta em ferradura: frente reta, laterais paralelas, traseira arredondada
      for (let i = 1; i < 10; i++) { const a = i / 10 * Math.PI; plan.push([Math.cos(a) * 1.15, -0.5 - Math.sin(a) * 0.95]); }
      plan.push([-1.15, -0.5], [-1.15, 0.82]);
      B.add(tloft(plan, [[y0, 1, 1], [y0 + 0.88, 0.99, 0.99], [y0 + 0.94, 0.95, 0.97]], { smooth: true }), PT);
      B.add(box, PT, 2.25, 0.06, 0.14, 0, y0 + 0.9, 0.78);
      // mantelete grande com ressaltos
      B.add(prism([[0.82, 0.08, 0.8], [1.04, 0.14, 0.78], [1.08, 0.45, 0.78], [1.04, 0.78, 0.78], [0.82, 0.84, 0.8]].map(([z, y, h]) => [z, y + y0, h])), PT);
      B.add(C12, PT, 0.17, 0.38, 0.17, 0, y0 + 0.45, 1.22, Math.PI / 2, 0, 0);
      for (const x of [0.32, 0.5]) B.add(C8, GLASS, 0.04, 0.04, 0.04, x, y0 + 0.62, 1.09, Math.PI / 2, 0, 0);
      A.mg(B, -0.36, y0 + 0.5, 1.1, 0, 0);
      // cúpula à esquerda, escotilha do municiador, lançadores de fumaça, porta de fuga
      A.cupola(B, 0.62, y0 + 0.94, -0.75, 0.36, 0.26, 5, 'de');
      A.hatch(B, -0.55, y0 + 0.94, -0.3, 0.3, 0);
      A.periscope(B, -0.15, y0 + 0.94, -0.1, 0);
      for (const s of [-1, 1]) A.smoke(B, s * 1.2, y0 + 0.58, 0.55, s, 3);
      B.add(C16, PD, 0.32, 0.04, 0.32, -1.07, y0 + 0.5, -1.0, 0, 0, Math.PI / 2 + 0.35);
      // caixa de bagagem traseira e elos laterais
      B.add(prism([[-1.4, 0.15, 0.68], [-1.4, 0.65, 0.68], [-1.95, 0.6, 0.62], [-1.95, 0.2, 0.62]].map(([z, y, h]) => [z, y + y0, h])), PT);
      B.add(box, PD, 1.26, 0.04, 0.5, 0, y0 + 0.64, -1.7);
      for (const s of [-1, 1]) A.links(B, s * 1.18, y0 + 0.42, -0.25, 4, 0.06, Math.PI / 2, 0);
      return { y: y0 + 0.45, z: 1.35, len: 4.75, r0: 0.08, r1: 0.06, brake: 'double', sleeve: [0.12, 0.25] };
    },
    decals(g, tur) {
      const num = String(100 + ((Math.random() * 40) | 0) + 1);
      for (const s of [-1, 1]) { decal(g, dtex('cross'), 0.62, 0.62, s * 1.585, 1.5, -1.6, s * Math.PI / 2); decal(tur, numTex(num, 'ger'), 1.0, 0.5, s * 1.16, 1.95 + 0.62, -0.2, s * Math.PI / 2); }
    },
  };

  // T-34/76 modelo 1943 (torre hexagonal)
  SPEC.t34 = {
    nat: 'SOV', L: 5.92, track: 'sov',
    gear: { tw: 0.55, x: 1.22, wr: 0.415, style: 'big', wheels: [1.96, 0.98, 0.0, -0.98, -1.96],
      front: { z: 2.62, y: 0.6, r: 0.31, style: 'big' }, rear: { z: -2.62, y: 0.62, r: 0.33, sprocket: true, teeth: 6 }, sag: 0.06 },
    hull(B) {
      B.add(prism([[2.98, 0.92, 0.86], [2.72, 0.45, 0.86], [-2.72, 0.45, 0.86], [-2.98, 0.82, 0.86], [-2.98, 0.94, 0.86]]), PT);
      // casco superior: glacis de 60°, laterais inclinadas sobre as lagartas
      B.add(prism([[2.98, 0.92, 1.49], [1.88, 1.53, 1.06], [-2.28, 1.53, 1.06], [-2.98, 1.12, 1.3], [-2.98, 0.92, 1.49]]), PT);
      // escotilha do motorista no glacis, metralhadora, farol, ganchos
      B.add(prism([[2.5, 1.18, 0.32], [2.1, 1.41, 0.32], [2.0, 1.36, 0.32], [2.4, 1.13, 0.32]]), PT, 1, 1, 1, 0.42, 0.04, 0);
      for (const dx of [-0.12, 0.12]) A.periscope(B, 0.42 + dx, 1.4, 2.18, 0);
      B.add(HEMI, PT, 0.15, 0.12, 0.15, -0.5, 1.2, 2.47, 1.05, 0, 0); A.mg(B, -0.5, 1.22, 2.6, 0, 0.12);
      A.light(B, 0.85, 1.2, 2.55, 0);
      for (const s of [-1, 1]) B.add(box, STEEL, 0.12, 0.2, 0.14, s * 0.7, 0.62, 2.96);
      // corrimãos para a infantaria, tanques externos, cabos, elos
      for (const s of [-1, 1]) {
        A.rail(B, [[s * 1.28, 1.2, 1.3], [s * 1.28, 1.3, 1.25], [s * 1.28, 1.3, -1.55], [s * 1.28, 1.2, -1.6]]);
        for (const z of [-1.95, -2.55]) A.fuel(B, s * 1.32, 1.12, z, 0.17, 0.55);
        A.cable(B, [[s * 1.18, 1.38, 1.2], [s * 1.2, 1.38, -0.2], [s * 1.18, 1.36, -1.4]], 0.022);
        A.links(B, s * 1.32, 1.08, 0.6, 3, 0.05, Math.PI / 2, 0);
      }
      A.toolbox(B, -1.3, 1.08, -0.6, 0.2, 0.22, 0.85);
      // convés do motor com grades e tampa de acesso
      A.grille(B, 0, 1.535, -1.55, 1.3, 0.75, 9);
      for (const s of [-1, 1]) A.grille(B, s * 0.72, 1.535, -0.55, 0.32, 0.6, 4);
      // traseira: escapamentos com blindagem e escotilha redonda
      B.add(C16, PD, 0.32, 0.05, 0.32, 0, 1.06, -3.0, Math.PI / 2 - 0.85, 0, 0);
      for (const s of [-1, 1]) { B.add(C8, 0x3a2a22, 0.07, 0.24, 0.07, s * 0.62, 0.72, -3.04, Math.PI / 2, 0, 0); B.add(box, PT, 0.22, 0.2, 0.14, s * 0.62, 0.78, -3.02); }
      return { tur: [0, 0.72] };
    },
    turret(B) {
      const y0 = 1.53;
      B.add(tloft([[0.42, 0.98], [0.98, 0.34], [0.98, -0.5], [0.58, -0.95], [-0.58, -0.95], [-0.98, -0.5], [-0.98, 0.34], [-0.42, 0.98]], [[y0, 1, 1], [y0 + 0.76, 0.84, 0.88, -0.02]]), PT);
      B.add(C16, PD, 0.9, 0.05, 0.9, 0, y0 + 0.02, 0);
      // mantelete fundido arredondado
      B.add(tloft(superPlan(0.72, 0.22, 12, 3, 3), [[y0 + 0.14, 1, 1, 1.02], [y0 + 0.62, 1, 1, 1.02]], { smooth: true }), PT);
      B.add(C12, PT, 0.11, 0.42, 0.11, 0, y0 + 0.4, 1.28, Math.PI / 2, 0, 0);
      A.mg(B, -0.2, y0 + 0.4, 1.15, 0, 0);
      // escotilhas "orelhas de Mickey", periscópios, corrimãos, portas de pistola
      for (const s of [-1, 1]) {
        A.hatch(B, s * 0.36, y0 + 0.76, -0.3, 0.27, 0);
        B.add(C8, PD, 0.06, 0.04, 0.06, s * 0.88, y0 + 0.4, -0.2, 0, 0, Math.PI / 2 + s * 0.2);
        A.rail(B, [[s * 0.9, y0 + 0.5, 0.35], [s * 0.97, y0 + 0.5, 0.3], [s * 0.97, y0 + 0.5, -0.35], [s * 0.9, y0 + 0.5, -0.4]]);
      }
      A.periscope(B, 0.3, y0 + 0.76, 0.35, 0); A.periscope(B, -0.25, y0 + 0.76, 0.1, 0);
      return { y: y0 + 0.4, z: 1.45, len: 2.75, r0: 0.068, r1: 0.05, brake: 'none', sleeve: [0.09, 0.55] };
    },
    decals(g, tur) {
      const num = String(100 + ((Math.random() * 90) | 0));
      for (const s of [-1, 1]) decal(tur, numTex(num, 'sov'), 0.8, 0.4, s * 0.94, 1.53 + 0.36, -0.2, s * (Math.PI / 2 - 0.12));
      decal(tur, dtex('redstar'), 0.38, 0.38, 0, 1.53 + 0.35, -0.98, Math.PI);
    },
  };


  /* ---------- trens de rolamento compartilhados ---------- */
  const G_PZ3 = { tw: 0.4, x: 1.27, wr: 0.26, style: 'disc', wheels: [1.55, 0.98, 0.4, -0.18, -0.76, -1.38], bogie: 'torsion',
    front: { z: 2.32, y: 0.84, r: 0.3, sprocket: true, teeth: 21 }, rear: { z: -2.45, y: 0.7, r: 0.3, style: 'steel' },
    rollers: [{ z: 1.3, y: 0.88, r: 0.1 }, { z: 0.1, y: 0.9, r: 0.1 }, { z: -1.1, y: 0.88, r: 0.1 }], sag: 0.02 };
  const G_38T = { tw: 0.293, x: 0.92, wr: 0.39, style: 'disc', wheels: [1.27, 0.43, -0.3, -1.14], bogie: 'leaf', bogies: [0.85, -0.72],
    front: { z: 1.95, y: 0.82, r: 0.28, sprocket: true, teeth: 19 }, rear: { z: -2.0, y: 0.62, r: 0.28, style: 'steel' },
    rollers: [{ z: 0.85, y: 0.96, r: 0.08 }, { z: -0.72, y: 0.96, r: 0.08 }], sag: 0.02 };
  const G_PANTHER = { tw: 0.66, x: 1.3, wr: 0.43, style: 'disc', inter: true, wheels: [2.13, 1.52, 0.91, 0.3, -0.31, -0.92, -1.53, -2.14],
    front: { z: 2.86, y: 1.04, r: 0.4, sprocket: true, teeth: 17 }, rear: { z: -2.95, y: 0.74, r: 0.34, style: 'steel' }, sag: 0.06 };
  const G_SHERMAN = SPEC.sherman.gear;
  const G_PZ4 = SPEC.panzer4.gear;
  const vvss = (o) => Object.assign({}, G_SHERMAN, o);

  // casco do Panzer III / StuG
  function hullPz3(B, deck) {
    H2(B, [[2.62, 0.5], [2.72, 0.82], [2.42, 1.1], [-2.62, 1.1], [-2.72, 0.6], [-2.45, 0.44]], 0.98);
    if (deck) H2(B, [[2.15, 1.05], [2.15, 1.72], [-1.0, 1.72], [-1.05, 1.68], [-2.68, 1.62], [-2.72, 1.05]], 1.2);
    fenders(B, 1.47, 1.07, 2.6, -2.72, 0.3);
    for (const s of [-1, 1]) B.add(prism([[2.6, 1.07, 0.15], [2.95, 0.88, 0.15], [2.97, 0.86, 0.15], [2.62, 1.09, 0.15]]), PT, 1, 1, 1, s * 1.32, 0, 0);
    A.light(B, 1.2, 1.25, 2.55, 0);
    A.tools(B, 1.3, 1.09, -0.5, 1.3, -1); A.tools(B, -1.3, 1.09, -0.3, 1.3, 1);
    for (const s of [-1, 1]) A.muffler(B, s * 0.45, 0.95, -2.85, 0.13, 0.55, 'x');
    A.links(B, 0, 0.98, 2.68, 6, 0.36, 0, 0.9);
  }
  function schurzen(B, x, y0, h, z0, n, len) {
    for (const s of [-1, 1]) {
      B.add(box, STEEL, 0.04, 0.04, n * len, s * (x - 0.03), y0 + h / 2 + 0.03, z0 - n * len / 2);
      for (let i = 0; i < n; i++) { const z = z0 - i * len - len / 2; B.add(box, PT, 0.02, h, len - 0.02, s * x, y0, z, 0, 0, s * 0.04); B.add(box, STEEL, 0.06, 0.1, 0.05, s * (x - 0.03), y0 + h / 2 - 0.02, z); }
    }
  }

  // Panzer II Ausf. F (20 mm)
  SPEC.panzer2 = {
    nat: 'GER', L: 4.81, track: 'ger',
    gear: { tw: 0.29, x: 1.0, wr: 0.27, style: 'disc', single: false, wheels: [1.45, 0.75, 0.05, -0.65, -1.35], bogie: 'torsion',
      front: { z: 2.05, y: 0.78, r: 0.28, sprocket: true, teeth: 16 }, rear: { z: -2.15, y: 0.58, r: 0.26, style: 'steel' },
      rollers: [{ z: 1.3, y: 0.8, r: 0.08 }, { z: 0.4, y: 0.82, r: 0.08 }, { z: -0.5, y: 0.82, r: 0.08 }, { z: -1.4, y: 0.8, r: 0.08 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.3, 0.45], [2.42, 0.7], [2.2, 0.98], [-2.3, 0.98], [-2.4, 0.55], [-2.2, 0.42]], 0.74);
      H2(B, [[2.05, 0.95], [2.05, 1.45], [-1.0, 1.45], [-2.38, 1.38], [-2.4, 0.95]], 0.98);
      fenders(B, 1.15, 0.97, 2.2, -2.38, 0.2);
      A.vis(B, 0.45, 1.25, 2.08, 0, 0.3); B.add(box, PT, 0.16, 0.16, 0.06, -0.45, 1.25, 2.08);
      A.hatch(B, 0.4, 1.45, 1.6, 0.2, 0);
      A.light(B, 0.95, 1.12, 2.05, 0); A.tools(B, -1.05, 0.98, 0, 1.1, 1);
      A.grille(B, 0, 1.43, -1.8, 1.2, 0.6, 7); A.muffler(B, 0.4, 0.8, -2.5, 0.11, 0.5, 'x');
      A.antenna(B, -0.8, 1.42, -1.0, 1.6);
      return { tur: [0.1, 0.25] };
    },
    turret(B) {
      const y0 = 1.45;
      B.add(tloft(plan8(1.25, 1.55, 0.28, 0.2), [[y0, 1, 1], [y0 + 0.46, 0.9, 0.94]]), PT);
      B.add(box, PT, 0.42, 0.28, 0.1, 0, y0 + 0.24, 0.8); A.mg(B, -0.12, y0 + 0.24, 0.85, 0, 0);
      A.cupola(B, 0, y0 + 0.46, -0.35, 0.22, 0.16, 6, 'de');
      for (const s of [-1, 1]) A.vis(B, s * 0.6, y0 + 0.28, 0.25, s * 1.3, 0.14);
      return { y: y0 + 0.24, z: 0.85, len: 1.15, r0: 0.032, r1: 0.024, brake: 'swell', sleeve: [0.05, 0.4] };
    },
    decals(g, tur) { mark(g, tur, 'GER', { h: [0.985, 1.2, -0.6], t: [0.6, 1.7, -0.1], s: 0.45, ta: 0.08 }); },
  };

  // Panzer III Ausf. L (50 mm longo)
  SPEC.panzer3 = {
    nat: 'GER', L: 5.52, track: 'ger', zim: true, flags: (y) => (y >= 1943.3 ? 'S' : ''),
    gear: G_PZ3,
    hull(B, f) {
      hullPz3(B, true);
      A.vis(B, 0.45, 1.48, 2.18, 0, 0.3); B.add(HEMI, PT, 0.14, 0.12, 0.14, -0.45, 1.45, 2.15, Math.PI / 2, 0, 0); A.mg(B, -0.45, 1.45, 2.3, 0, 0.05);
      B.add(box, PT, 2.0, 0.5, 0.06, 0, 1.4, 2.24);                                                      // placa espaçada
      for (const s of [-1, 1]) A.hatch(B, s * 0.5, 1.72, 1.65, 0.24, 0);
      A.grille(B, 0, 1.72, -1.6, 1.4, 0.8, 8); A.antenna(B, -0.95, 1.7, -1.2, 2.0);
      if (f.includes('S')) schurzen(B, 1.5, 0.95, 0.9, 1.95, 4, 1.05);
      return { tur: [0, -0.05] };
    },
    turret(B, f) {
      const y0 = 1.72;
      B.add(tloft([[0.52, 0.8], [0.84, 0.38], [0.84, -0.62], [0.62, -0.98], [-0.62, -0.98], [-0.84, -0.62], [-0.84, 0.38], [-0.52, 0.8]], [[y0, 1, 1], [y0 + 0.62, 0.86, 0.92, -0.02]]), PT);
      B.add(box, PT, 0.78, 0.42, 0.14, 0, y0 + 0.32, 0.86); B.add(box, PT, 0.82, 0.46, 0.04, 0, y0 + 0.32, 1.06);
      A.mg(B, -0.22, y0 + 0.34, 1.0, 0, 0);
      for (const s of [-1, 1]) B.add(box, PD, 0.03, 0.38, 0.42, s * 0.78, y0 + 0.3, 0.0, 0, 0, s * 0.16);
      A.cupola(B, 0, y0 + 0.6, -0.62, 0.27, 0.24, 5, 'de');
      B.add(box, PT, 0.95, 0.38, 0.38, 0, y0 + 0.32, -1.18); B.add(box, PD, 0.97, 0.04, 0.4, 0, y0 + 0.52, -1.18);
      A.smoke(B, 0.78, y0 + 0.4, 0.5, 1, 3); A.smoke(B, -0.78, y0 + 0.4, 0.5, -1, 3);
      if (f.includes('S')) { const ring = [[0.95, 0.4], [1.04, -0.15], [1.04, -0.8], [0.78, -1.3], [-0.78, -1.3], [-1.04, -0.8], [-1.04, -0.15], [-0.95, 0.4]]; for (let i = 0; i < ring.length - 1; i++) { const [x0, z0] = ring[i], [x1, z1] = ring[i + 1]; B.add(box, PT, 0.02, 0.58, Math.hypot(x1 - x0, z1 - z0), (x0 + x1) / 2, y0 + 0.3, (z0 + z1) / 2, 0, Math.atan2(x1 - x0, z1 - z0), 0); } }
      return { y: y0 + 0.32, z: 1.08, len: 2.95, r0: 0.05, r1: 0.04, brake: 'none', sleeve: [0.09, 0.45] };
    },
    decals(g, tur, f) { mark(g, tur, 'GER', f.includes('S') ? { h: [1.51, 1.05, -0.3], t: [1.05, 2.02, -0.5], s: 0.5 } : { h: [1.205, 1.4, -0.5], t: [0.8, 2.02, -0.2], s: 0.5, ta: 0.08 }); },
  };

  // Panzer 38(t) Ausf. E (rebitado)
  SPEC.panzer38t = {
    nat: 'GER', L: 4.61, track: 'ger', gear: G_38T,
    hull(B) {
      const lo = [[2.25, 0.45], [2.35, 0.72], [2.1, 1.05], [-2.25, 1.05], [-2.3, 0.5], [-2.1, 0.4]], up = [[1.95, 1.0], [1.95, 1.62], [-0.7, 1.62], [-0.8, 1.55], [-2.28, 1.5], [-2.3, 1.0]];
      H2(B, lo, 0.7); H2(B, up, 0.98);
      fenders(B, 1.07, 1.02, 2.1, -2.3, 0.12);
      rivEdges(B, up, 0.98, 0.2);
      A.vis(B, 0.4, 1.38, 1.98, 0, 0.3); B.add(HEMI, PT, 0.12, 0.1, 0.12, -0.42, 1.35, 1.96, Math.PI / 2, 0, 0); A.mg(B, -0.42, 1.35, 2.08, 0, 0.05);
      rivLine(B, [-0.9, 1.6, 1.97], [0.9, 1.6, 1.97], 12);
      A.light(B, 0.85, 1.18, 2.05, 0); A.tools(B, -1.0, 1.04, 0, 1.2, 1);
      A.grille(B, 0, 1.53, -1.5, 1.2, 0.9, 6); A.muffler(B, 0, 0.82, -2.42, 0.12, 0.9, 'x');
      return { tur: [0, 0.4] };
    },
    turret(B) {
      const y0 = 1.62, pl = plan8(1.32, 1.55, 0.22, 0.25);
      B.add(tloft(pl, [[y0, 1, 1], [y0 + 0.55, 0.94, 0.95]]), PT);
      for (const s of [-1, 1]) rivLine(B, [s * 0.65, y0 + 0.48, -0.5], [s * 0.65, y0 + 0.48, 0.5], 7);
      B.add(box, PT, 0.55, 0.35, 0.1, 0, y0 + 0.28, 0.8);
      B.add(HEMI, PT, 0.1, 0.08, 0.1, -0.2, y0 + 0.25, 0.82, Math.PI / 2, 0, 0); A.mg(B, -0.2, y0 + 0.25, 0.95, 0, 0);
      A.cupola(B, 0.15, y0 + 0.55, -0.3, 0.22, 0.18, 4, 'de');
      return { y: y0 + 0.3, z: 0.85, len: 1.55, r0: 0.04, r1: 0.03, brake: 'none', sleeve: [0.07, 0.35] };
    },
    decals(g, tur) { mark(g, tur, 'GER', { h: [0.99, 1.3, -0.9], t: [0.64, 1.9, 0.0], s: 0.42, ta: 0.04 }); },
  };

  // StuG III Ausf. G (casamata, canhão de 75 mm L/48)
  SPEC.stug = {
    nat: 'GER', L: 5.52, track: 'ger', zim: true, flags: (y) => (y >= 1943.3 ? 'S' : ''),
    gear: G_PZ3,
    hull(B, f) {
      hullPz3(B, false);
      B.add(prism([[2.15, 1.08, 1.38], [1.98, 1.95, 1.12], [-0.55, 1.95, 1.12], [-0.62, 1.62, 1.3], [-0.62, 1.08, 1.38]]), PT);
      H2(B, [[-0.6, 1.06], [-0.6, 1.62], [-2.62, 1.58], [-2.72, 1.06]], 1.1);
      B.add(box, PT, 0.5, 0.3, 0.1, 0.55, 1.78, 2.02, -0.1, 0, 0); A.vis(B, 0.55, 1.75, 2.08, 0, 0.3);
      A.cupola(B, 0.55, 1.95, 0.6, 0.27, 0.2, 7, 'de');
      A.hatch(B, -0.5, 1.95, 0.55, 0.3, 0);
      B.add(box, PT, 0.55, 0.32, 0.03, -0.5, 2.12, 1.0); A.mg(B, -0.5, 2.18, 1.15, 0, 0);            // escudo da MG 34
      A.grille(B, 0, 1.62, -1.6, 1.4, 0.8, 8); A.antenna(B, -1.0, 1.6, -0.9, 2.0);
      A.links(B, 0, 1.96, 1.5, 5, 0.36, 0, 0);
      if (f.includes('S')) schurzen(B, 1.52, 0.95, 0.9, 1.95, 4, 1.05);
      return { tur: [-0.1, 2.02] };
    },
    turret(B) {
      B.add(SAU(), PT, 0.32, 0.36, 0.32, 0, 1.55, 0, Math.PI / 2, 0, 0);
      B.add(C12, PT, 0.09, 0.3, 0.09, 0, 1.55, 0.42, Math.PI / 2, 0, 0);
      return { y: 1.55, z: 0.4, len: 3.0, r0: 0.06, r1: 0.044, brake: 'double', sleeve: [0.09, 0.3] };
    },
    decals(g, tur, f) { mark(g, null, 'GER', { h: f.includes('S') ? [1.53, 1.05, -0.1] : [1.33, 1.5, -0.2], s: 0.55 }); },
  };

  // Panther Ausf. G
  function hullPanther(B, roof) {
    H2(B, [[3.3, 1.02], [3.15, 0.6], [2.85, 0.42], [-2.9, 0.42], [-3.25, 0.75], [-3.25, 1.04]], 0.95);
    if (roof) B.add(prism([[3.3, 1.02, 1.6], [2.05, 1.9, 1.38], [-2.2, 1.9, 1.38], [-3.25, 1.04, 1.6]]), PT);
    for (const s of [-1, 1]) { B.add(box, STEEL, 0.12, 0.22, 0.16, s * 0.75, 0.7, 3.25); }
    A.light(B, 1.15, 1.58, 2.7, 0.0);
    for (const s of [-1, 1]) { A.cable(B, [[s * 1.52, 1.25, 2.4], [s * 1.5, 1.38, 0.6], [s * 1.5, 1.38, -1.2], [s * 1.52, 1.25, -2.6]], 0.026); A.tools(B, s * 1.35, 1.45, 0.4, 1.6, -s); }
    // traseira: escapamentos, caixas, macaco
    for (const s of [-1, 1]) { B.add(C8, 0x3a2a22, 0.08, 0.7, 0.08, s * 0.38, 1.25, -3.28); B.add(box, PT, 0.55, 0.45, 0.3, s * 1.0, 1.25, -3.18, 0.1, 0, 0); }
    B.add(C8, STEEL, 0.1, 0.55, 0.1, 0, 0.92, -3.2, 0, 0, Math.PI / 2);
    A.links(B, 0, 0.85, -3.24, 6, 0.6, 0, 0);
  }
  SPEC.panther = {
    nat: 'GER', L: 6.87, track: 'ger', zim: true, flags: (y) => (y >= 1943.5 ? 'S' : ''),
    gear: G_PANTHER,
    hull(B, f) {
      hullPanther(B, true);
      B.add(HEMI, PT, 0.16, 0.13, 0.16, -0.62, 1.42, 2.85, 1.0, 0, 0); A.mg(B, -0.62, 1.44, 2.98, 0, 0.1);
      for (const s of [-1, 1]) { A.hatch(B, s * 0.62, 1.9, 1.75, 0.27, 0); A.periscope(B, s * 0.62, 1.9, 2.02, 0); }
      for (const s of [-1, 1]) { A.grille(B, s * 0.9, 1.905, -2.0, 0.55, 0.9, 6); B.add(C16, DARK, 0.27, 0.05, 0.27, s * 0.7, 1.92, -1.05); }
      B.add(box, PD, 0.95, 0.04, 1.4, 0, 1.92, -1.8);
      if (f.includes('S')) for (const s of [-1, 1]) for (let i = 0; i < 6; i++) B.add(box, PT, 0.02, 0.42, 0.98, s * 1.64, 0.86, 2.4 - i * 1.0, 0, 0, s * 0.05);
      return { tur: [0, -0.15] };
    },
    turret(B) {
      const y0 = 1.9;
      B.add(tloft([[0.62, 1.05], [1.12, 0.45], [1.12, -1.0], [0.95, -1.3], [-0.95, -1.3], [-1.12, -1.0], [-1.12, 0.45], [-0.62, 1.05]], [[y0, 1, 1], [y0 + 0.82, 0.78, 0.88, -0.06]]), PT);
      B.add(C16, PD, 1.05, 0.05, 1.05, 0, y0 + 0.02, 0);
      // mantelete curvo com "queixo"
      B.add(once('pthM', () => lathe([[0, -0.5], [1, -0.5], [1, 0.5], [0, 0.5]], 14)), PT, 0.4, 1.3, 0.4, 0, y0 + 0.42, 1.0, 0, 0, Math.PI / 2);
      B.add(box, PT, 1.3, 0.16, 0.36, 0, y0 + 0.08, 1.05);
      B.add(C12, PT, 0.12, 0.35, 0.12, 0, y0 + 0.42, 1.48, Math.PI / 2, 0, 0);
      A.mg(B, -0.4, y0 + 0.42, 1.38, 0, 0); B.add(C8, GLASS, 0.04, 0.03, 0.04, 0.35, y0 + 0.55, 1.4, Math.PI / 2, 0, 0);
      A.cupola(B, 0.6, y0 + 0.7, -0.72, 0.36, 0.2, 7, 'de');
      A.hatch(B, -0.5, y0 + 0.78, -0.35, 0.24, 0);
      B.add(C16, PD, 0.32, 0.04, 0.32, 0, y0 + 0.4, -1.3, Math.PI / 2, 0, 0);
      for (const s of [-1, 1]) B.add(C8, PD, 0.06, 0.04, 0.06, s * 1.0, y0 + 0.42, -0.45, 0, 0, Math.PI / 2 + s * 0.4);
      return { y: y0 + 0.42, z: 1.62, len: 4.55, r0: 0.07, r1: 0.05, brake: 'double', sleeve: [0.1, 0.3] };
    },
    decals(g, tur, f) { mark(g, tur, 'GER', { h: [f.includes('S') ? 1.655 : 1.5, 1.25, 0.3], t: [1.03, 2.32, -0.4], s: 0.6, ta: 0.24 }); },
  };

  // Tiger II (torre Henschel)
  SPEC.kingtiger = {
    nat: 'GER', L: 7.38, track: 'ger', zim: true,
    gear: { tw: 0.8, x: 1.48, wr: 0.4, style: 'steel', inter: true, wheels: [2.35, 1.79, 1.23, 0.67, 0.11, -0.45, -1.01, -1.57, -2.13],
      front: { z: 3.12, y: 1.06, r: 0.42, sprocket: true, teeth: 18 }, rear: { z: -3.0, y: 0.76, r: 0.37, style: 'steel' }, sag: 0.05 },
    hull(B) {
      H2(B, [[3.6, 1.05], [3.42, 0.62], [3.05, 0.44], [-3.0, 0.44], [-3.45, 0.75], [-3.45, 1.06]], 1.02);
      B.add(prism([[3.6, 1.05, 1.76], [2.3, 1.98, 1.52], [-2.45, 1.98, 1.52], [-3.45, 1.05, 1.76]]), PT);
      B.add(HEMI, PT, 0.17, 0.14, 0.17, -0.68, 1.5, 3.1, 1.0, 0, 0); A.mg(B, -0.68, 1.52, 3.24, 0, 0.1);
      for (const s of [-1, 1]) { A.hatch(B, s * 0.68, 1.98, 1.95, 0.28, 0); A.periscope(B, s * 0.68, 1.98, 2.25, 0); A.cable(B, [[s * 1.66, 1.32, 2.7], [s * 1.62, 1.45, 0.6], [s * 1.62, 1.45, -1.5], [s * 1.66, 1.3, -2.9]], 0.028); A.tools(B, s * 1.45, 1.53, -0.1, 1.7, -s); }
      for (const s of [-1, 1]) { A.grille(B, s * 0.95, 1.985, -2.2, 0.6, 1.0, 7); B.add(C16, DARK, 0.3, 0.05, 0.3, s * 0.75, 2.0, -1.2); }
      for (const s of [-1, 1]) { B.add(C8, 0x3a2a22, 0.09, 0.75, 0.09, s * 0.45, 1.3, -3.48); B.add(box, PT, 0.6, 0.4, 0.3, s * 1.15, 1.32, -3.38, 0.1, 0, 0); }
      A.light(B, 1.2, 1.65, 2.95, 0);
      return { tur: [0, -0.55] };
    },
    turret(B) {
      const y0 = 1.98;
      B.add(tloft([[0.72, 1.18], [1.25, 0.85], [1.25, -1.55], [1.05, -1.98], [-1.05, -1.98], [-1.25, -1.55], [-1.25, 0.85], [-0.72, 1.18]], [[y0, 1, 1], [y0 + 0.82, 0.8, 0.95, -0.05]]), PT);
      B.add(C16, PD, 1.05, 0.05, 1.05, 0, y0 + 0.02, 0);
      B.add(SAU(), PT, 0.4, 0.42, 0.4, 0, y0 + 0.42, 1.12, Math.PI / 2, 0, 0);
      A.mg(B, -0.3, y0 + 0.42, 1.25, 0, 0);
      A.cupola(B, 0.62, y0 + 0.72, -0.6, 0.36, 0.22, 7, 'de');
      A.hatch(B, -0.55, y0 + 0.82, -0.45, 0.26, 0);
      for (const s of [-1, 1]) A.links(B, s * 1.17, y0 + 0.4, -0.5, 6, 0.06, Math.PI / 2 - s * 0.0, 0);
      B.add(C16, PD, 0.4, 0.04, 0.4, 0, y0 + 0.4, -1.98, Math.PI / 2, 0, 0);
      return { y: y0 + 0.42, z: 1.5, len: 5.6, r0: 0.08, r1: 0.06, brake: 'double', sleeve: [0.12, 0.3] };
    },
    decals(g, tur) { mark(g, tur, 'GER', { h: [1.62, 1.45, -1.2], t: [1.2, 2.4, -1.3], s: 0.65, ta: 0.16 }); },
  };

  // Jagdpanther (88 mm L/71 em casamata)
  SPEC.jagdpanther = {
    nat: 'GER', L: 6.87, track: 'ger', zim: true, flags: (y) => (y >= 1943.5 ? 'S' : ''),
    gear: G_PANTHER,
    hull(B, f) {
      hullPanther(B, false);
      B.add(prism([[3.3, 1.02, 1.6], [1.55, 2.3, 1.3], [-1.05, 2.3, 1.3], [-1.35, 1.9, 1.42], [-2.7, 1.9, 1.42], [-3.25, 1.04, 1.6]]), PT);
      B.add(HEMI, PT, 0.15, 0.12, 0.15, 0.62, 1.48, 2.85, 1.0, 0, 0); A.mg(B, 0.62, 1.5, 2.98, 0, 0.1);
      for (const s of [-1, 1]) A.periscope(B, s * 0.6, 2.3, 1.2, 0);
      A.hatch(B, -0.5, 2.3, 0.2, 0.3, 0); A.hatch(B, 0.5, 2.3, -0.3, 0.26, 0);
      B.add(C8, GLASS, 0.05, 0.12, 0.05, -0.5, 2.36, 0.85);
      for (const s of [-1, 1]) A.grille(B, s * 0.85, 1.905, -2.1, 0.55, 0.9, 6);
      if (f.includes('S')) for (const s of [-1, 1]) for (let i = 0; i < 6; i++) B.add(box, PT, 0.02, 0.42, 0.98, s * 1.64, 0.86, 2.4 - i * 1.0, 0, 0, s * 0.05);
      return { tur: [0.05, 2.15] };
    },
    turret(B) {
      B.add(SAU(), PT, 0.36, 0.38, 0.36, 0, 1.82, 0, Math.PI / 2 - 0.18, 0, 0);
      return { y: 1.86, z: 0.36, len: 4.9, r0: 0.08, r1: 0.06, brake: 'double', sleeve: [0.11, 0.25] };
    },
    decals(g, tur, f) { mark(g, null, 'GER', { h: [f.includes('S') ? 1.655 : 1.48, 1.3, -0.8], s: 0.6 }); },
  };

  // Jagdpanzer 38(t) Hetzer
  SPEC.hetzer = {
    nat: 'GER', L: 4.87, track: 'ger',
    gear: Object.assign({}, G_38T, { tw: 0.35, x: 1.14, rollers: [{ z: 0.1, y: 0.98, r: 0.09 }], front: { z: 2.05, y: 0.8, r: 0.28, sprocket: true, teeth: 19 }, rear: { z: -2.05, y: 0.62, r: 0.28, style: 'steel' } }),
    hull(B) {
      H2(B, [[2.25, 0.42], [2.45, 0.85], [-2.25, 0.85], [-2.4, 0.45]], 0.9);
      B.add(prism([[2.45, 0.85, 1.32], [1.05, 1.92, 0.9], [-0.6, 1.95, 0.9], [-2.35, 1.62, 1.08], [-2.42, 0.85, 1.32]]), PT);
      A.periscope(B, 0.55, 1.92, 1.0, 0); A.hatch(B, 0.45, 1.95, 0.2, 0.28, 0); A.hatch(B, -0.35, 1.95, -0.2, 0.26, 0);
      B.add(box, PT, 0.3, 0.2, 0.04, 0.0, 2.1, -0.05); A.mg(B, 0.0, 2.08, 0.15, 0, 0);
      for (const s of [-1, 1]) A.cable(B, [[s * 1.15, 1.2, 1.6], [s * 1.08, 1.35, 0.2], [s * 1.12, 1.25, -1.6]], 0.022);
      A.muffler(B, 0.35, 1.05, -2.45, 0.12, 0.55, 'x'); A.tools(B, -1.0, 1.62, -1.2, 1.0, 1);
      return { tur: [-0.38, 1.6] };
    },
    turret(B) {
      B.add(SAU(), PT, 0.28, 0.3, 0.28, 0, 1.5, 0, Math.PI / 2 - 0.2, 0, 0);
      return { y: 1.52, z: 0.3, len: 2.8, r0: 0.06, r1: 0.044, brake: 'double', sleeve: [0.09, 0.2] };
    },
    decals(g) { mark(g, null, 'GER', { h: [1.06, 1.45, -0.6], s: 0.45 }); },
  };

  // Flakpanzer IV Wirbelwind (torre aberta de 9 lados, 4 canhões de 20 mm)
  SPEC.wirbelwind = {
    nat: 'GER', L: 5.92, track: 'ger', zim: true,
    gear: G_PZ4,
    hull(B) { const r = SPEC.panzer4.hull(B, ''); return { tur: [0.0, -0.1] }; void r; },
    turret(B) {
      const y0 = 1.74, pl = []; for (let i = 0; i < 9; i++) { const a = i / 9 * TAU; pl.push([Math.sin(a) * 1.02, Math.cos(a) * 1.02]); }
      openTurret(B, pl, [[y0, 1, 1], [y0 + 0.72, 0.84, 0.84]], 0.04);
      B.add(box, PD, 0.5, 0.5, 0.6, 0, y0 + 0.4, -0.05);
      return { y: y0 + 0.75, z: 0.05, len: 1.75, custom(B2, y) {
        B2.add(box, DARK, 0.6, 0.45, 0.65, 0, y, -0.15);
        for (const sx of [-1, 1]) for (const sy of [-1, 1]) { B2.add(C8, DARK, 0.022, 1.45, 0.022, sx * 0.17, y + sy * 0.13, 0.85, Math.PI / 2, 0, 0); B2.add(C8, DARK, 0.035, 0.18, 0.035, sx * 0.17, y + sy * 0.13, 1.6, Math.PI / 2, 0, 0); }
        B2.add(box, PT, 0.7, 0.4, 0.02, 0, y + 0.05, 0.2);
      } };
    },
    decals(g) { mark(g, null, 'GER', { h: [1.125, 1.4, -1.0], s: 0.6 }); },
  };

  // 7TP (polonês, canhão Bofors de 37 mm)
  SPEC.tp7 = {
    nat: 'POL', L: 4.6, track: 'ger',
    gear: { tw: 0.26, x: 1.08, wr: 0.2, style: 'disc', wheels: [1.45, 1.07, 0.55, 0.17, -0.35, -0.73, -1.25, -1.63], bogie: 'leaf', bogies: [1.26, 0.36, -0.54, -1.44],
      front: { z: 2.05, y: 0.72, r: 0.26, sprocket: true, teeth: 15 }, rear: { z: -2.2, y: 0.55, r: 0.26, style: 'steel' },
      rollers: [{ z: 1.4, y: 0.8, r: 0.07 }, { z: 0.45, y: 0.82, r: 0.07 }, { z: -0.5, y: 0.82, r: 0.07 }, { z: -1.45, y: 0.8, r: 0.07 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.25, 0.42], [2.4, 0.62], [2.15, 0.95], [-2.25, 0.95], [-2.32, 0.48], [-2.1, 0.4]], 0.82);
      const up = [[2.15, 0.95], [1.7, 1.38], [1.45, 1.62], [-0.7, 1.62], [-0.85, 1.45], [-2.28, 1.4], [-2.32, 0.95]];
      H2(B, up, 1.0); rivEdges(B, up, 1.0, 0.22); fenders(B, 1.21, 0.95, 2.2, -2.3, 0.2);
      A.vis(B, 0.35, 1.52, 1.5, 0, 0.26); A.light(B, 0.9, 1.1, 2.1, 0);
      A.grille(B, 0, 1.43, -1.55, 1.3, 1.1, 10); A.muffler(B, -0.3, 0.85, -2.45, 0.1, 0.6, 'x');
      A.tools(B, -1.1, 0.97, 0.2, 1.1, 1);
      return { tur: [0.1, 0.35] };
    },
    turret(B) {
      const y0 = 1.62;
      B.add(tloft(plan8(1.25, 1.35, 0.2, 0.1, 0.05), [[y0, 1, 1], [y0 + 0.55, 0.92, 0.94]]), PT);
      B.add(box, PT, 0.8, 0.42, 0.42, 0, y0 + 0.28, -0.82);
      B.add(box, PT, 0.48, 0.32, 0.1, 0, y0 + 0.28, 0.72); A.mg(B, 0.16, y0 + 0.26, 0.8, 0, 0);
      A.periscope(B, -0.25, y0 + 0.55, 0.2, 0); B.add(C8, PT, 0.1, 0.18, 0.1, -0.25, y0 + 0.62, 0.2);
      A.hatch(B, 0.2, y0 + 0.55, -0.2, 0.22, 0);
      return { y: y0 + 0.28, z: 0.78, len: 1.6, r0: 0.04, r1: 0.032, brake: 'none', sleeve: [0.07, 0.3] };
    },
  };

  // Char B1 bis (lagartas em volta do casco, obus de 75 mm no casco)
  SPEC.charb1 = {
    nat: 'FRA', L: 6.37, track: 'ger',
    gear: { tw: 0.5, x: 0.98, wr: 0.2, style: 'spoke', wheels: [1.85, 1.3, 0.75, 0.2, -0.35, -0.9, -1.45, -2.0],
      front: { z: 2.6, y: 1.15, r: 0.5, style: 'steel' }, rear: { z: -2.6, y: 1.2, r: 0.46, sprocket: true, teeth: 14 },
      rollers: [{ z: 1.6, y: 1.6, r: 0.1 }, { z: 0.8, y: 1.62, r: 0.1 }, { z: 0, y: 1.62, r: 0.1 }, { z: -0.8, y: 1.62, r: 0.1 }, { z: -1.6, y: 1.6, r: 0.1 }], sag: 0.02,
      skirt: { y: 0.98, h: 0.82, len: 4.3, z: 0, chutes: 6 } },
    hull(B) {
      H2(B, [[2.95, 0.9], [2.75, 1.55], [2.3, 1.82], [-2.6, 1.82], [-2.95, 1.6], [-2.95, 0.6], [-2.6, 0.42], [2.55, 0.42]], 0.74);
      B.add(box, PT, 1.55, 0.04, 4.9, 0, 1.84, -0.15);
      // cabine do motorista e obus de 75 mm
      B.add(box, PT, 0.45, 0.4, 0.55, 0.32, 1.95, 2.2); A.vis(B, 0.32, 2.0, 2.48, 0, 0.26);
      B.add(box, PT, 0.42, 0.5, 0.25, -0.3, 1.05, 2.82); B.add(once('b1g', () => gunGeo({ len: 1.1, r0: 0.07, r1: 0.06, brake: 'none', sleeve: [0.1, 0.2] })), PT, 1, 1, 1, -0.3, 1.05, 2.85, Math.PI / 2, 0, 0);
      A.grille(B, 0, 1.84, -1.8, 1.2, 1.2, 9); B.add(box, PT, 0.6, 0.3, 0.7, -0.55, 1.4, -1.0);
      rivEdges(B, [[2.75, 1.55], [2.3, 1.82], [-2.6, 1.82]], 0.74, 0.25);
      return { tur: [0, 0.35] };
    },
    turret(B) {
      const y0 = 1.84;
      B.add(tloft(superPlan(1.2, 1.25, 18, 2.3), [[y0, 1, 1], [y0 + 0.55, 0.96, 0.96], [y0 + 0.62, 0.82, 0.82]], { smooth: true }), PT);
      B.add(once('apx', () => lathe([[0, 0], [1, 0], [1, 0.6], [0.7, 1.0], [0, 1.05]], 14)), PT, 0.3, 0.32, 0.3, 0, y0 + 0.62, -0.15);
      for (let i = 0; i < 5; i++) { const a = i / 5 * TAU; B.add(box, GLASS, 0.05, 0.06, 0.03, Math.sin(a) * 0.3, y0 + 0.78, -0.15 + Math.cos(a) * 0.3, 0, a, 0); }
      B.add(box, PT, 0.36, 0.3, 0.1, 0, y0 + 0.3, 0.62); A.mg(B, 0.15, y0 + 0.3, 0.68, 0, 0);
      return { y: y0 + 0.3, z: 0.68, len: 1.75, r0: 0.045, r1: 0.035, brake: 'none', sleeve: [0.07, 0.3] };
    },
    decals(g, tur) { mark(g, tur, 'FRA', { t: [0.6, 2.15, 0], s: 0.7 }); },
  };

  // Somua S35 (casco e torre fundidos)
  SPEC.somua = {
    nat: 'FRA', L: 5.38, track: 'ger',
    gear: { tw: 0.36, x: 0.88, wr: 0.18, style: 'spoke', wheels: [1.65, 1.25, 0.85, 0.45, 0.05, -0.35, -0.75, -1.15, -1.55],
      front: { z: 2.15, y: 0.62, r: 0.3, style: 'steel' }, rear: { z: -2.2, y: 0.8, r: 0.33, sprocket: true, teeth: 14 },
      rollers: [{ z: 0.9, y: 0.96, r: 0.08 }, { z: -0.6, y: 0.98, r: 0.08 }], sag: 0.02, skirt: { y: 0.72, h: 0.52, len: 3.9, chutes: 0 } },
    hull(B) {
      H2(B, [[2.4, 0.55], [2.5, 0.75], [-2.4, 0.75], [-2.3, 0.45], [2.2, 0.42]], 0.68);
      const pts = [[2.4, 0.6, 0.72], [2.55, 0.85, 0.82], [2.3, 1.22, 0.98], [1.6, 1.55, 1.0], [-1.3, 1.58, 1.0], [-2.4, 1.3, 0.96], [-2.55, 0.9, 0.86], [-2.35, 0.6, 0.72]];
      B.add(prism(pts), PT);
      B.add(box, PD, 1.9, 0.04, 0.06, 0, 1.15, 0.0); A.vis(B, 0.35, 1.45, 1.75, 0, 0.24);
      A.grille(B, 0, 1.5, -1.5, 1.2, 0.8, 8); A.light(B, 0.7, 1.15, 2.35, 0);
      return { tur: [0, 0.25] };
    },
    turret(B) {
      const y0 = 1.58;
      B.add(tloft(superPlan(1.25, 1.4, 18, 2.3), [[y0, 1, 1], [y0 + 0.55, 0.93, 0.93], [y0 + 0.65, 0.76, 0.78]], { smooth: true }), PT);
      B.add(once('apx', () => lathe([[0, 0], [1, 0], [1, 0.6], [0.7, 1.0], [0, 1.05]], 14)), PT, 0.28, 0.3, 0.28, 0, y0 + 0.65, -0.18);
      B.add(box, PT, 0.34, 0.3, 0.1, 0, y0 + 0.3, 0.68); A.mg(B, 0.15, y0 + 0.3, 0.74, 0, 0);
      return { y: y0 + 0.3, z: 0.74, len: 1.75, r0: 0.045, r1: 0.035, brake: 'none', sleeve: [0.07, 0.3] };
    },
    decals(g, tur) { mark(g, tur, 'FRA', { t: [0.6, 1.9, 0], s: 0.7 }); },
  };

  // Matilda II (saias blindadas com escoadouros de lama)
  SPEC.matilda = {
    nat: 'ENG', L: 5.61, track: 'ger',
    gear: { tw: 0.36, x: 1.11, wr: 0.16, style: 'spoke', wheels: [1.75, 1.35, 0.95, 0.55, 0.15, -0.25, -0.65, -1.05, -1.45, -1.85],
      front: { z: 2.35, y: 0.62, r: 0.3, style: 'steel' }, rear: { z: -2.45, y: 0.72, r: 0.33, sprocket: true, teeth: 13 },
      rollers: [{ z: 1.5, y: 0.95, r: 0.08 }, { z: 0.5, y: 0.97, r: 0.08 }, { z: -0.5, y: 0.97, r: 0.08 }, { z: -1.5, y: 0.95, r: 0.08 }], sag: 0.01,
      skirt: { y: 0.78, h: 0.62, len: 4.1, chutes: 5 } },
    hull(B) {
      H2(B, [[2.55, 0.95], [2.62, 0.7], [2.45, 0.48], [-2.4, 0.45], [-2.6, 0.65], [-2.6, 0.95]], 0.78);
      H2(B, [[2.55, 0.9], [2.35, 1.45], [1.9, 1.76], [-2.2, 1.76], [-2.6, 1.4], [-2.6, 0.9]], 0.92);
      for (const s of [-1, 1]) B.add(box, PT, 0.42, 0.05, 4.9, s * 1.12, 1.12, -0.05);
      A.vis(B, 0, 1.62, 2.03, 0, 0.3); A.periscope(B, 0, 1.76, 1.75, 0);
      for (const s of [-1, 1]) { A.light(B, s * 0.75, 1.3, 2.4, 0); A.toolbox(B, s * 1.12, 1.3, -1.3, 0.35, 0.3, 1.0); }
      A.grille(B, 0, 1.765, -1.5, 1.3, 1.0, 9); A.muffler(B, 0, 1.0, -2.68, 0.12, 0.9, 'x');
      return { tur: [0, 0.15] };
    },
    turret(B) {
      const y0 = 1.76;
      B.add(tloft(superPlan(1.45, 1.6, 18, 2.2, 2.6), [[y0, 1, 1], [y0 + 0.5, 0.94, 0.95], [y0 + 0.66, 0.78, 0.8]], { smooth: true }), PT);
      B.add(box, PT, 0.5, 0.36, 0.14, 0, y0 + 0.32, 0.8); A.mg(B, 0.18, y0 + 0.3, 0.86, 0, 0);
      A.hatch(B, -0.2, y0 + 0.66, -0.2, 0.26, 0); A.periscope(B, 0.25, y0 + 0.66, 0.15, 0);
      B.add(box, PT, 0.8, 0.3, 0.3, 0, y0 + 0.3, -0.95); A.smoke(B, 0.68, y0 + 0.4, 0.2, 1, 2); A.antenna(B, 0.3, y0 + 0.66, -0.55, 1.8);
      return { y: y0 + 0.32, z: 0.86, len: 1.95, r0: 0.04, r1: 0.032, brake: 'none', sleeve: [0.07, 0.25] };
    },
  };

  // Crusader III (suspensão Christie, canhão de 6 libras)
  SPEC.crusader = {
    nat: 'ENG', L: 5.97, track: 'ger',
    gear: { tw: 0.35, x: 1.21, wr: 0.41, style: 'big', wheels: [1.75, 0.88, 0.0, -0.88, -1.75],
      front: { z: 2.45, y: 0.58, r: 0.3, style: 'big' }, rear: { z: -2.5, y: 0.62, r: 0.32, sprocket: true, teeth: 12 }, sag: 0.05 },
    hull(B) {
      H2(B, [[2.75, 0.95], [2.85, 0.65], [2.6, 0.42], [-2.7, 0.42], [-2.95, 0.7], [-2.95, 0.96]], 0.85);
      H2(B, [[2.75, 0.95], [2.2, 1.25], [1.75, 1.45], [-2.5, 1.45], [-2.95, 1.18], [-2.95, 0.95]], 1.12);
      for (const s of [-1, 1]) { B.add(box, PT, 0.25, 0.03, 5.3, s * 1.27, 1.02, -0.1); B.add(box, PT, 0.03, 0.26, 4.6, s * 1.39, 0.9, -0.2); }
      B.add(box, PT, 0.5, 0.22, 0.4, 0.4, 1.5, 1.85); A.vis(B, 0.4, 1.52, 2.07, 0, 0.26);
      A.grille(B, 0, 1.455, -1.6, 1.6, 1.2, 10); for (const s of [-1, 1]) A.jerry(B, s * 0.8, 1.2, -3.02, 0, 0x6b6440);
      A.light(B, -0.85, 1.12, 2.5, 0);
      return { tur: [0, 0.2] };
    },
    turret(B) {
      const y0 = 1.45;
      B.add(tloft([[0.5, 0.95], [0.86, 0.55], [0.86, -0.5], [0.62, -0.88], [-0.62, -0.88], [-0.86, -0.5], [-0.86, 0.55], [-0.5, 0.95]], [[y0, 1, 1], [y0 + 0.66, 0.74, 0.8, -0.05]]), PT);
      B.add(box, PT, 0.42, 0.3, 0.12, 0, y0 + 0.3, 0.92); A.mg(B, 0.16, y0 + 0.3, 0.98, 0, 0);
      A.hatch(B, 0, y0 + 0.66, -0.2, 0.3, 0); A.periscope(B, -0.3, y0 + 0.66, 0.2, 0);
      A.smoke(B, 0.66, y0 + 0.42, 0.3, 1, 2); A.antenna(B, -0.35, y0 + 0.66, -0.55, 1.8);
      return { y: y0 + 0.3, z: 0.98, len: 2.45, r0: 0.05, r1: 0.038, brake: 'thread', sleeve: [0.08, 0.35] };
    },
  };

  // T-26 modelo 1933 (antena de quadro na torre)
  SPEC.t26 = {
    nat: 'SOV', L: 4.65, track: 'sov',
    gear: { tw: 0.26, x: 1.09, wr: 0.15, style: 'disc', wheels: [1.45, 1.15, 0.75, 0.45, -0.45, -0.75, -1.15, -1.45], bogie: 'leaf', bogies: [1.3, 0.6, -0.6, -1.3],
      front: { z: 2.05, y: 0.65, r: 0.26, sprocket: true, teeth: 14 }, rear: { z: -2.1, y: 0.55, r: 0.26, style: 'steel' },
      rollers: [{ z: 1.4, y: 0.76, r: 0.07 }, { z: 0.45, y: 0.78, r: 0.07 }, { z: -0.45, y: 0.78, r: 0.07 }, { z: -1.4, y: 0.76, r: 0.07 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.25, 0.42], [2.35, 0.7], [2.0, 0.92], [-2.2, 0.92], [-2.3, 0.5], [-2.05, 0.4]], 0.8);
      const up = [[2.0, 0.92], [1.75, 1.3], [1.6, 1.45], [-0.9, 1.45], [-1.0, 1.35], [-2.28, 1.3], [-2.3, 0.92]];
      H2(B, up, 0.98); rivEdges(B, up, 0.98, 0.24); fenders(B, 1.22, 0.92, 2.1, -2.3, 0.24);
      A.vis(B, 0.4, 1.38, 1.72, 0, 0.24); A.light(B, 0.75, 1.15, 1.95, 0);
      A.grille(B, 0, 1.33, -1.55, 1.2, 1.0, 8); A.toolbox(B, -1.1, 1.02, -0.6, 0.2, 0.18, 0.7);
      return { tur: [0.12, 0.3] };
    },
    turret(B) {
      const y0 = 1.45, pl = superPlan(1.3, 1.3, 18, 2.0, 2.0, 0.05);
      B.add(tloft(pl, [[y0, 1, 1], [y0 + 0.5, 1, 1]], { smooth: true }), PT);
      B.add(box, PT, 0.8, 0.4, 0.45, 0, y0 + 0.24, -0.78);
      B.add(box, PT, 0.42, 0.3, 0.12, 0, y0 + 0.26, 0.68); A.mg(B, 0.16, y0 + 0.25, 0.75, 0, 0);
      A.hatch(B, 0, y0 + 0.5, -0.15, 0.28, 0);
      const ring = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * TAU; ring.push([Math.cos(a) * 0.85, y0 + 0.62, Math.sin(a) * 0.85 + 0.05]); }
      A.rail(B, ring); for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; B.add(C6, STEEL, 0.012, 0.2, 0.012, Math.cos(a) * 0.75, y0 + 0.52, Math.sin(a) * 0.75 + 0.05, 0, 0, Math.cos(a) * 0.5); }
      return { y: y0 + 0.26, z: 0.75, len: 1.95, r0: 0.045, r1: 0.034, brake: 'none', sleeve: [0.07, 0.35] };
    },
    decals(g, tur) { mark(g, tur, 'SOV', { t: [0.66, 1.72, -0.1], s: 0.4 }); },
  };

  // BT-7 (suspensão Christie, nariz em cunha)
  SPEC.bt7 = {
    nat: 'SOV', L: 5.66, track: 'sov',
    gear: { tw: 0.26, x: 1.0, wr: 0.41, style: 'big', single: true, wheels: [1.7, 0.6, -0.5, -1.6],
      front: { z: 2.4, y: 0.55, r: 0.28, style: 'big' }, rear: { z: -2.45, y: 0.55, r: 0.3, sprocket: true, teeth: 6 }, sag: 0.06 },
    hull(B) {
      B.add(prism([[2.78, 0.62, 0.32], [2.45, 0.42, 0.75], [-2.45, 0.42, 0.85], [-2.75, 0.7, 0.85], [-2.75, 0.95, 0.85], [2.45, 0.95, 0.75], [2.78, 0.82, 0.32]]), PT);
      H2(B, [[2.45, 0.92], [2.0, 1.5], [-1.2, 1.5], [-2.7, 1.4], [-2.75, 0.92]], 0.86);
      fenders(B, 1.16, 1.0, 2.3, -2.6, 0.3);
      A.vis(B, 0.0, 1.32, 2.12, 0, 0.3); for (const s of [-1, 1]) A.light(B, s * 0.55, 1.15, 2.45, 0);
      A.grille(B, 0, 1.43, -1.6, 1.3, 1.0, 8);
      for (const s of [-1, 1]) B.add(C8, 0x3a2a22, 0.07, 0.4, 0.07, s * 0.55, 1.4, -2.75, 0.6, 0, 0);
      A.toolbox(B, -1.05, 1.1, -0.8, 0.2, 0.18, 0.8);
      return { tur: [0, 0.55] };
    },
    turret(B) {
      const y0 = 1.5;
      B.add(tloft(superPlan(1.35, 1.35, 18, 2.0, 2.0, 0.08), [[y0, 1, 1], [y0 + 0.5, 0.86, 0.86]], { smooth: true }), PT);
      B.add(tloft(plan8(0.8, 0.5, 0.1, 0.12, -0.8), [[y0 + 0.02, 1, 1], [y0 + 0.44, 0.9, 0.9]]), PT);
      B.add(box, PT, 0.42, 0.3, 0.12, 0, y0 + 0.26, 0.66); A.mg(B, 0.16, y0 + 0.25, 0.72, 0, 0);
      A.hatch(B, 0, y0 + 0.5, -0.2, 0.3, 0); A.periscope(B, -0.35, y0 + 0.48, 0.1, 0);
      return { y: y0 + 0.26, z: 0.72, len: 1.95, r0: 0.045, r1: 0.034, brake: 'none', sleeve: [0.07, 0.35] };
    },
    decals(g, tur) { mark(g, tur, 'SOV', { t: [0.6, 1.76, 0.05], s: 0.42, ta: 0.25 }); },
  };

  // KV-1 modelo 1941 (torre soldada)
  SPEC.kv1 = {
    nat: 'SOV', L: 6.75, track: 'sov',
    gear: { tw: 0.7, x: 1.31, wr: 0.3, style: 'steel', wheels: [2.0, 1.2, 0.4, -0.4, -1.2, -2.0], bogie: 'torsion',
      front: { z: 2.85, y: 0.66, r: 0.33, style: 'steel' }, rear: { z: -2.85, y: 0.7, r: 0.35, sprocket: true, teeth: 16 },
      rollers: [{ z: 1.6, y: 0.85, r: 0.1 }, { z: 0, y: 0.86, r: 0.1 }, { z: -1.6, y: 0.85, r: 0.1 }], sag: 0.02 },
    hull(B) {
      H2(B, [[3.05, 1.1], [3.2, 0.7], [3.0, 0.45], [-3.0, 0.45], [-3.25, 0.8], [-3.2, 1.1]], 0.95);
      H2(B, [[3.05, 1.06], [2.6, 1.5], [2.25, 1.76], [-2.3, 1.76], [-3.15, 1.4], [-3.2, 1.06]], 1.28);
      fenders(B, 1.66, 1.07, 3.1, -3.25, 0.4);
      for (const s of [-1, 1]) for (const z of [1.2, -0.3, -1.8]) A.toolbox(B, s * 1.5, 1.27, z, 0.28, 0.38, 0.85);
      A.vis(B, 0.42, 1.6, 2.4, 0, 0.3); B.add(HEMI, PT, 0.14, 0.11, 0.14, -0.45, 1.58, 2.42, 1.0, 0, 0); A.mg(B, -0.45, 1.6, 2.55, 0, 0.1);
      A.grille(B, 0, 1.765, -1.5, 1.4, 1.2, 10); A.light(B, 0.9, 1.5, 2.6, 0);
      return { tur: [0, 0.25] };
    },
    turret(B) {
      const y0 = 1.76;
      B.add(tloft([[0.62, 1.05], [1.0, 0.6], [1.0, -0.85], [0.75, -1.25], [-0.75, -1.25], [-1.0, -0.85], [-1.0, 0.6], [-0.62, 1.05]], [[y0, 1, 1], [y0 + 0.85, 0.95, 0.96]]), PT);
      B.add(box, PT, 0.8, 0.5, 0.18, 0, y0 + 0.42, 1.1); A.mg(B, 0.22, y0 + 0.42, 1.2, 0, 0);
      B.add(HEMI, PT, 0.12, 0.1, 0.12, 0, y0 + 0.42, -1.24, -Math.PI / 2, 0, 0);
      A.hatch(B, 0, y0 + 0.85, -0.3, 0.32, 0); for (const x of [-0.5, 0.5]) A.periscope(B, x, y0 + 0.85, 0.3, 0);
      return { y: y0 + 0.42, z: 1.2, len: 2.95, r0: 0.07, r1: 0.05, brake: 'none', sleeve: [0.1, 0.5] };
    },
    decals(g, tur) { mark(g, tur, 'SOV', { t: [0.97, 2.2, -0.2], s: 0.55 }); },
  };

  // M3 Stuart (leve, rebitado)
  SPEC.stuart = {
    nat: 'USA', L: 4.53, track: 'chevron',
    gear: { tw: 0.295, x: 0.97, wr: 0.25, style: 'spoke', wheels: [1.19, 0.65, -0.49, -1.03], bogie: 'vvss', bogies: [0.92, -0.76],
      front: { z: 1.95, y: 0.85, r: 0.28, sprocket: true, teeth: 13 }, rear: { z: -1.92, y: 0.38, r: 0.3, style: 'spoke' },
      rollers: [{ z: 1.1, y: 0.92, r: 0.08 }, { z: 0.1, y: 0.92, r: 0.08 }, { z: -0.9, y: 0.92, r: 0.08 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.2, 0.45], [2.3, 0.82], [2.05, 1.15], [-2.2, 1.15], [-2.25, 0.55], [-1.95, 0.4]], 0.78);
      const up = [[2.05, 1.08], [1.95, 1.6], [1.7, 1.75], [-0.9, 1.75], [-2.2, 1.62], [-2.25, 1.08]];
      H2(B, up, 1.1); rivEdges(B, up, 1.1, 0.22);
      A.vis(B, 0.4, 1.42, 2.02, 0, 0.26); B.add(HEMI, PT, 0.11, 0.09, 0.11, -0.4, 1.4, 2.0, Math.PI / 2, 0, 0); A.mg(B, -0.4, 1.4, 2.12, 0, 0.05);
      for (const s of [-1, 1]) { A.light(B, s * 0.85, 1.32, 2.15, 0); A.hatch(B, s * 0.42, 1.75, 1.4, 0.22, 0); }
      A.grille(B, 0, 1.68, -1.5, 1.4, 0.9, 8); A.tools(B, -1.0, 1.75, -0.4, 1.0, 1);
      return { tur: [0, 0.1] };
    },
    turret(B) {
      const y0 = 1.75;
      B.add(tloft(superPlan(1.3, 1.45, 18, 2.3, 2.0), [[y0, 1, 1], [y0 + 0.52, 0.93, 0.93]], { smooth: true }), PT);
      B.add(box, PT, 0.46, 0.34, 0.12, 0, y0 + 0.27, 0.72); A.mg(B, 0.16, y0 + 0.27, 0.78, 0, 0);
      A.hatch(B, 0, y0 + 0.52, -0.2, 0.3, 0); A.periscope(B, 0.3, y0 + 0.52, 0.2, 0);
      A.mg(B, 0, y0 + 0.75, -0.45, 0.2, -0.1); B.add(C6, STEEL, 0.02, 0.22, 0.02, 0, y0 + 0.62, -0.5);
      return { y: y0 + 0.27, z: 0.78, len: 1.95, r0: 0.04, r1: 0.032, brake: 'none', sleeve: [0.07, 0.3] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [1.105, 1.4, -0.4], t: [0.65, 2.0, 0], s: 0.5 }); },
  };

  // M3 Lee (75 mm no casco, 37 mm na torre)
  SPEC.lee = {
    nat: 'USA', L: 5.64, track: 'chevron',
    gear: vvss({ wheels: [1.73, 1.17, 0.28, -0.28, -1.17, -1.73], bogies: [1.45, 0, -1.45], front: { z: 2.35, y: 0.98, r: 0.33, sprocket: true, teeth: 13 }, rear: { z: -2.4, y: 0.58, r: 0.29, style: 'spoke' },
      rollers: [{ z: 1.45, y: 0.9, r: 0.1 }, { z: 0, y: 0.9, r: 0.1 }, { z: -1.45, y: 0.9, r: 0.1 }] }),
    hull(B) {
      H2(B, [[2.4, 0.45], [2.6, 0.85], [2.45, 1.1], [-2.5, 1.1], [-2.6, 0.55], [-2.3, 0.42]], 0.9);
      const up = [[2.45, 1.05], [2.25, 1.55], [1.75, 2.2], [-1.6, 2.2], [-2.55, 2.05], [-2.6, 1.05]];
      H2(B, up, 1.3); rivEdges(B, up, 1.3, 0.25);
      // casamata do 75 mm à direita
      B.add(tloft(superPlan(0.75, 0.8, 12, 2.4), [[1.25, 1, 1], [1.95, 0.92, 0.92]], { smooth: true }), PT, 1, 1, 1, -0.65, 0, 1.85);
      B.add(once('leeG', () => gunGeo({ len: 1.7, r0: 0.07, r1: 0.05, brake: 'thread', sleeve: [0.11, 0.3] })), PT, 1, 1, 1, -0.65, 1.55, 2.2, Math.PI / 2, 0, 0);
      A.vis(B, 0.45, 1.9, 1.98, 0, 0.26); A.grille(B, 0, 2.205, -1.3, 1.6, 0.9, 8);
      for (const s of [-1, 1]) A.light(B, s * 1.0, 1.5, 2.3, 0);
      return { tur: [0.35, -0.1] };
    },
    turret(B) {
      const y0 = 2.2;
      B.add(tloft(superPlan(1.35, 1.5, 18, 2.2), [[y0, 1, 1], [y0 + 0.55, 0.92, 0.92]], { smooth: true }), PT);
      B.add(box, PT, 0.42, 0.32, 0.12, 0, y0 + 0.27, 0.74); A.mg(B, 0.15, y0 + 0.27, 0.8, 0, 0);
      B.add(C16, PT, 0.3, 0.3, 0.3, -0.1, y0 + 0.7, -0.15); A.mg(B, -0.1, y0 + 0.75, 0.15, 0, 0); A.hatch(B, -0.1, y0 + 0.85, -0.15, 0.24, 0);
      return { y: y0 + 0.27, z: 0.8, len: 1.9, r0: 0.04, r1: 0.032, brake: 'none', sleeve: [0.07, 0.3] };
    },
    decals(g) { mark(g, null, 'USA', { h: [1.315, 1.6, -0.5], s: 0.6 }); },
  };

  // Fiat M13/40
  SPEC.m1340 = {
    nat: 'ITA', L: 4.92, track: 'ger',
    gear: { tw: 0.26, x: 1.01, wr: 0.15, style: 'disc', wheels: [1.5, 1.12, 0.62, 0.24, -0.4, -0.78, -1.28, -1.66], bogie: 'leaf', bogies: [1.31, 0.43, -0.59, -1.47],
      front: { z: 2.1, y: 0.72, r: 0.26, sprocket: true, teeth: 14 }, rear: { z: -2.2, y: 0.58, r: 0.26, style: 'steel' },
      rollers: [{ z: 1.2, y: 0.88, r: 0.07 }, { z: 0, y: 0.9, r: 0.07 }, { z: -1.2, y: 0.88, r: 0.07 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.3, 0.45], [2.4, 0.72], [2.15, 1.0], [-2.3, 1.0], [-2.38, 0.55], [-2.1, 0.42]], 0.78);
      const up = [[2.1, 0.98], [1.85, 1.35], [1.55, 1.55], [-0.8, 1.55], [-0.9, 1.45], [-2.4, 1.4], [-2.42, 0.98]];
      H2(B, up, 1.06); rivEdges(B, up, 1.06, 0.22); fenders(B, 1.14, 0.98, 2.2, -2.4, 0.1);
      A.vis(B, 0.35, 1.45, 1.72, 0, 0.26); for (const x of [-0.35, -0.55]) A.mg(B, x, 1.42, 1.8, 0, 0.05);
      A.grille(B, 0, 1.43, -1.6, 1.3, 1.1, 9); for (const s of [-1, 1]) A.jerry(B, s * 0.75, 1.15, -2.52, 0, 0x8a7a50);
      return { tur: [0, 0.2] };
    },
    turret(B) {
      const y0 = 1.55;
      B.add(tloft(plan8(1.25, 1.5, 0.25, 0.15), [[y0, 1, 1], [y0 + 0.55, 0.86, 0.9]]), PT);
      rivLine(B, [0.62, y0 + 0.05, -0.6], [0.62, y0 + 0.05, 0.5], 6); rivLine(B, [-0.62, y0 + 0.05, -0.6], [-0.62, y0 + 0.05, 0.5], 6);
      B.add(box, PT, 0.42, 0.3, 0.12, 0, y0 + 0.28, 0.78); A.mg(B, 0.16, y0 + 0.26, 0.84, 0, 0);
      A.hatch(B, 0, y0 + 0.55, -0.25, 0.28, 0);
      return { y: y0 + 0.28, z: 0.84, len: 1.55, r0: 0.045, r1: 0.036, brake: 'none', sleeve: [0.07, 0.3] };
    },
    decals(g) { mark(g, null, 'ITA', { h: [1.07, 1.2, -1.3], s: 0.6 }); },
  };

  // Tanquete L3/35 (duas metralhadoras na casamata)
  SPEC.l335 = {
    nat: 'ITA', L: 3.17, track: 'ger',
    gear: { tw: 0.18, x: 0.61, wr: 0.13, style: 'disc', single: true, wheels: [0.9, 0.6, 0.3, -0.3, -0.6, -0.9], bogie: 'leaf', bogies: [0.6, -0.6],
      front: { z: 1.32, y: 0.45, r: 0.2, sprocket: true, teeth: 12 }, rear: { z: -1.35, y: 0.42, r: 0.2, style: 'steel' }, sag: 0.01, rollers: [{ z: 0, y: 0.5, r: 0.06 }] },
    hull(B) {
      H2(B, [[1.5, 0.3], [1.6, 0.5], [1.35, 0.75], [-1.5, 0.75], [-1.6, 0.4], [-1.35, 0.25]], 0.5);
      const up = [[1.45, 0.72], [1.25, 1.05], [1.0, 1.22], [-0.3, 1.22], [-0.5, 1.12], [-1.58, 1.0], [-1.6, 0.72]];
      H2(B, up, 0.68); rivEdges(B, up, 0.68, 0.2);
      A.vis(B, -0.25, 1.1, 1.2, 0, 0.2); A.grille(B, 0, 1.03, -1.0, 0.9, 0.7, 6);
      return { tur: [0.2, 1.12] };
    },
    turret(B) {
      B.add(box, PT, 0.35, 0.3, 0.12, 0, 1.0, 0);
      return { y: 1.0, z: 0.05, len: 0.75, custom(B2, y) { for (const sx of [-0.07, 0.07]) { B2.add(box, DARK, 0.07, 0.1, 0.3, sx, y, 0.05); B2.add(C8, DARK, 0.018, 0.6, 0.018, sx, y, 0.45, Math.PI / 2, 0, 0); } } };
    },
  };

  // M24 Chaffee
  SPEC.m24 = {
    nat: 'USA', L: 5.56, track: 'ger',
    gear: { tw: 0.41, x: 1.3, wr: 0.32, style: 'disc', wheels: [1.65, 0.85, 0.05, -0.75, -1.55], bogie: 'torsion',
      front: { z: 2.35, y: 0.85, r: 0.32, sprocket: true, teeth: 13 }, rear: { z: -2.42, y: 0.64, r: 0.3, style: 'disc' },
      rollers: [{ z: 1.25, y: 0.9, r: 0.1 }, { z: 0.05, y: 0.92, r: 0.1 }, { z: -1.15, y: 0.9, r: 0.1 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.55, 0.45], [2.85, 0.75], [2.6, 1.05], [-2.55, 1.05], [-2.75, 0.6], [-2.45, 0.42]], 0.95);
      B.add(prism([[2.85, 1.0, 1.42], [1.9, 1.6, 1.3], [-1.0, 1.65, 1.3], [-2.75, 1.55, 1.35], [-2.8, 1.0, 1.42]]), PT);
      for (const s of [-1, 1]) { A.hatch(B, s * 0.48, 1.62, 1.65, 0.24, 0); A.light(B, s * 1.05, 1.32, 2.45, 0); }
      B.add(HEMI, PT, 0.12, 0.1, 0.12, -0.48, 1.32, 2.4, 1.0, 0, 0); A.mg(B, -0.48, 1.34, 2.5, 0, 0.1);
      A.grille(B, 0, 1.6, -1.7, 1.6, 1.0, 9); A.tools(B, 1.1, 1.62, -0.6, 1.2, -1);
      return { tur: [0, 0.0] };
    },
    turret(B) {
      const y0 = 1.65;
      B.add(tloft(superPlan(1.75, 2.1, 18, 2.4, 2.0, -0.1), [[y0, 1, 1], [y0 + 0.6, 0.9, 0.92], [y0 + 0.7, 0.72, 0.76]], { smooth: true }), PT);
      B.add(box, PT, 0.55, 0.35, 0.2, 0, y0 + 0.32, 0.98); A.mg(B, 0.2, y0 + 0.32, 1.08, 0, 0);
      A.cupola(B, -0.4, y0 + 0.68, -0.4, 0.26, 0.18, 6, 'us'); A.mg(B, -0.4, y0 + 0.98, -0.2, 0.1, -0.08, '50');
      A.hatch(B, 0.4, y0 + 0.7, -0.3, 0.25, 0); A.antenna(B, 0.45, y0 + 0.6, -0.9, 2.2);
      return { y: y0 + 0.32, z: 1.08, len: 2.55, r0: 0.055, r1: 0.045, brake: 'none', sleeve: [0.08, 0.35] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [1.36, 1.3, -0.6], t: [0.86, 2.0, -0.2], s: 0.55 }); },
  };

  // M18 Hellcat (torre aberta)
  SPEC.m18 = {
    nat: 'USA', L: 5.28, track: 'ger',
    gear: { tw: 0.37, x: 1.25, wr: 0.32, style: 'disc', wheels: [1.6, 0.82, 0.04, -0.74, -1.52], bogie: 'torsion',
      front: { z: 2.2, y: 0.84, r: 0.3, sprocket: true, teeth: 13 }, rear: { z: -2.3, y: 0.62, r: 0.3, style: 'disc' },
      rollers: [{ z: 1.2, y: 0.9, r: 0.09 }, { z: 0.42, y: 0.92, r: 0.09 }, { z: -0.36, y: 0.92, r: 0.09 }, { z: -1.14, y: 0.9, r: 0.09 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.4, 0.45], [2.62, 0.75], [2.4, 1.0], [-2.5, 1.0], [-2.65, 0.55], [-2.35, 0.42]], 0.92);
      B.add(prism([[2.62, 0.98, 1.38], [1.85, 1.45, 1.28], [-2.4, 1.5, 1.28], [-2.65, 0.98, 1.38]]), PT);
      for (const s of [-1, 1]) { A.hatch(B, s * 0.48, 1.47, 1.5, 0.22, 0); A.light(B, s * 1.0, 1.25, 2.35, 0); }
      A.grille(B, 0, 1.5, -1.7, 1.6, 0.9, 9); A.tools(B, -1.1, 1.5, -0.3, 1.2, 1);
      return { tur: [0, -0.2] };
    },
    turret(B) {
      const y0 = 1.5;
      openTurret(B, [[0.6, 1.05], [1.05, 0.5], [1.05, -0.8], [0.85, -1.08], [-0.85, -1.08], [-1.05, -0.8], [-1.05, 0.5], [-0.6, 1.05]], [[y0, 1, 1], [y0 + 0.62, 0.88, 0.92]]);
      B.add(box, PT, 0.55, 0.42, 0.25, 0, y0 + 0.32, 1.02);
      B.add(box, PT, 1.6, 0.3, 0.4, 0, y0 + 0.2, -1.25); A.mg(B, 0.55, y0 + 0.78, -0.6, 0, -0.1, '50');
      return { y: y0 + 0.34, z: 1.12, len: 3.2, r0: 0.05, r1: 0.04, brake: 'single', sleeve: [0.08, 0.3] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [1.3, 1.22, -0.8], t: [1.0, 1.8, -0.3], s: 0.5 }); },
  };

  // M10 Wolverine (casco do Sherman, torre aberta pentagonal)
  function hullM10(B) {
    B.add(prism([[2.3, 1.1, 0.87], [2.62, 1.04, 0.87], [2.86, 0.88, 0.87], [2.94, 0.68, 0.87], [2.84, 0.5, 0.86], [2.55, 0.42, 0.84], [-2.5, 0.42, 0.86], [-2.86, 0.6, 0.86], [-2.9, 1.1, 0.86]]), PT);
    B.add(prism([[2.28, 1.07, 1.31], [1.2, 1.85, 1.12], [-1.5, 1.85, 1.1], [-2.55, 1.75, 1.18], [-2.84, 1.6, 1.25], [-2.84, 1.07, 1.31]]), PT);
    for (const s of [-1, 1]) { for (let i = 0; i < 6; i++) B.add(C8, PD, 0.04, 0.05, 0.04, s * 1.22, 1.45, 1.2 - i * 0.55, 0, 0, Math.PI / 2 - s * 0.3); A.light(B, s * 0.95, 1.6, 2.02, 0); }
    for (const sx of [-1, 1]) { A.hatch(B, sx * 0.5, 1.86, 1.05, 0.25, 0); A.periscope(B, sx * 0.5, 1.84, 1.35, 0); }
    A.grille(B, 0, 1.86, -2.2, 1.5, 0.6, 8); A.tools(B, -0.9, 1.86, -1.4, 1.2, 1);
    for (const sx of [-1, 1]) B.add(box, STEEL, 0.1, 0.16, 0.18, sx * 0.6, 0.62, 2.88);
  }
  SPEC.m10 = {
    nat: 'USA', L: 5.97, track: 'chevron', gear: G_SHERMAN,
    hull(B) { hullM10(B); return { tur: [0, 0.05] }; },
    turret(B) {
      const y0 = 1.85;
      openTurret(B, [[0.55, 1.0], [1.05, 0.25], [0.95, -0.9], [-0.95, -0.9], [-1.05, 0.25], [-0.55, 1.0]], [[y0, 1, 1], [y0 + 0.75, 0.86, 0.92]]);
      for (const s of [-1, 1]) B.add(box, PT, 0.5, 0.55, 0.45, s * 0.48, y0 + 0.35, -1.12);
      B.add(box, PT, 0.6, 0.5, 0.25, 0, y0 + 0.38, 1.0); A.mg(B, -0.6, y0 + 0.95, -0.6, 0, -0.1, '50');
      return { y: y0 + 0.38, z: 1.1, len: 3.5, r0: 0.06, r1: 0.045, brake: 'none', sleeve: [0.09, 0.4] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [1.2, 1.45, -0.6], t: [0.98, 2.2, -0.2], s: 0.55 }); },
  };
  // M36 Jackson (90 mm, torre aberta redonda)
  SPEC.m36 = {
    nat: 'USA', L: 5.88, track: 'chevron', gear: G_SHERMAN,
    hull(B) { hullM10(B); return { tur: [0, 0.05] }; },
    turret(B) {
      const y0 = 1.85;
      openTurret(B, superPlan(2.0, 2.0, 18, 2.15), [[y0, 1, 1], [y0 + 0.72, 0.95, 0.95]]);
      B.add(box, PT, 1.3, 0.55, 0.45, 0, y0 + 0.32, -1.15);
      B.add(box, PT, 0.7, 0.55, 0.26, 0, y0 + 0.4, 1.0);
      return { y: y0 + 0.42, z: 1.12, len: 4.1, r0: 0.07, r1: 0.055, brake: 'double', sleeve: [0.1, 0.45] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [1.2, 1.45, -0.6], t: [0.98, 2.2, 0], s: 0.55 }); },
  };

  // M26 Pershing
  SPEC.m26 = {
    nat: 'USA', L: 6.33, track: 'ger',
    gear: { tw: 0.61, x: 1.45, wr: 0.33, style: 'disc', wheels: [2.1, 1.32, 0.54, -0.24, -1.02, -1.8], bogie: 'torsion',
      front: { z: 2.75, y: 0.72, r: 0.32, style: 'disc' }, rear: { z: -2.9, y: 0.76, r: 0.35, sprocket: true, teeth: 13 },
      rollers: [{ z: 1.7, y: 0.94, r: 0.1 }, { z: 0.9, y: 0.95, r: 0.1 }, { z: 0.1, y: 0.95, r: 0.1 }, { z: -0.7, y: 0.95, r: 0.1 }, { z: -1.5, y: 0.94, r: 0.1 }], sag: 0.02 },
    hull(B) {
      H2(B, [[3.1, 1.02], [3.2, 0.7], [2.9, 0.45], [-2.9, 0.45], [-3.2, 0.75], [-3.18, 1.02]], 0.98);
      H2(B, [[3.1, 1.0], [2.1, 1.75], [-2.6, 1.8], [-3.15, 1.55], [-3.18, 1.0]], 1.42);
      fenders(B, 1.76, 1.05, 3.1, -3.15, 0.36);
      for (const s of [-1, 1]) { A.hatch(B, s * 0.55, 1.77, 1.85, 0.25, 0); A.periscope(B, s * 0.55, 1.75, 2.12, 0); A.light(B, s * 1.2, 1.5, 2.7, 0); A.toolbox(B, s * 1.6, 1.22, -2.0, 0.3, 0.3, 0.8); }
      B.add(HEMI, PT, 0.13, 0.1, 0.13, -0.55, 1.45, 2.55, 1.0, 0, 0); A.mg(B, -0.55, 1.47, 2.65, 0, 0.1);
      A.grille(B, 0, 1.79, -1.9, 1.9, 1.2, 10);
      return { tur: [0, -0.1] };
    },
    turret(B) {
      const y0 = 1.8;
      B.add(tloft(superPlan(2.1, 2.65, 22, 2.5, 2.0, -0.2), [[y0, 1, 1], [y0 + 0.55, 0.98, 0.98], [y0 + 0.8, 0.84, 0.86, -0.05]], { smooth: true }), PT);
      B.add(tloft(superPlan(1.25, 0.32, 12, 3.0), [[y0 + 0.15, 1, 1, 1.25], [y0 + 0.68, 1, 1, 1.25]], { smooth: true }), PT);
      A.mg(B, 0.32, y0 + 0.42, 1.38, 0, 0);
      A.cupola(B, -0.45, y0 + 0.78, -0.55, 0.3, 0.2, 6, 'us'); A.mg(B, -0.45, y0 + 1.12, -0.35, 0.1, -0.08, '50');
      A.hatch(B, 0.45, y0 + 0.8, -0.45, 0.27, 0); A.antenna(B, 0.6, y0 + 0.7, -1.2, 2.4);
      return { y: y0 + 0.42, z: 1.4, len: 4.2, r0: 0.075, r1: 0.06, brake: 'double', sleeve: [0.11, 0.35] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [1.425, 1.4, -0.9], t: [1.04, 2.2, -0.3], s: 0.6 }); },
  };

  // M7 Priest (obus de 105 mm, compartimento aberto e "púlpito" da .50)
  SPEC.m7 = {
    nat: 'USA', L: 6.02, track: 'chevron', gear: G_SHERMAN,
    hull(B) {
      B.add(prism([[2.3, 1.1, 0.87], [2.62, 1.04, 0.87], [2.86, 0.88, 0.87], [2.94, 0.68, 0.87], [2.84, 0.5, 0.86], [2.55, 0.42, 0.84], [-2.5, 0.42, 0.86], [-2.86, 0.6, 0.86], [-2.9, 1.1, 0.86]]), PT);
      H2(B, [[2.28, 1.07], [1.6, 1.62], [-0.6, 1.62], [-0.6, 1.07]], 1.29, PD);
      // paredes do compartimento aberto
      for (const s of [-1, 1]) B.add(box, PT, 0.04, 0.85, 3.0, s * 1.29, 1.62, 0.6);
      B.add(box, PT, 2.58, 0.04, 1.2, 0, 1.75, 2.0, -0.62, 0, 0);
      B.add(box, PT, 2.58, 0.6, 0.04, 0, 1.75, -0.9);
      H2(B, [[-0.9, 1.07], [-0.9, 1.82], [-2.55, 1.78], [-2.84, 1.6], [-2.84, 1.07]], 1.29);
      // púlpito da metralhadora
      B.add(C16, PT, 0.42, 0.75, 0.42, -0.85, 1.95, 1.35); B.add(C16, DARK, 0.38, 0.05, 0.38, -0.85, 2.33, 1.35); A.mg(B, -0.85, 2.48, 1.55, 0, -0.1, '50');
      A.grille(B, 0, 1.79, -2.0, 1.5, 0.8, 8); A.tools(B, 0.95, 1.82, -1.7, 1.0, -1);
      for (let i = 0; i < 4; i++) B.add(box, 0x6a5a3a, 0.35, 0.35, 0.35, 0.95 - (i % 2) * 0.4, 1.3, -0.2 - ((i / 2) | 0) * 0.4);
      return { tur: [0.22, 1.05] };
    },
    turret(B) {
      B.add(box, PT, 0.55, 0.48, 0.5, 0, 1.55, 0); B.add(box, PT, 0.25, 0.35, 0.9, 0, 1.4, -0.4);
      return { y: 1.62, z: 0.25, len: 2.35, r0: 0.075, r1: 0.06, brake: 'swell', sleeve: [0.13, 0.55] };
    },
    decals(g) { mark(g, null, 'USA', { h: [1.315, 1.55, -0.2], s: 0.55 }); },
  };

  // Sherman Calliope (lançador de 60 foguetes sobre a torre)
  SPEC.calliope = Object.assign({}, SPEC.sherman, {
    turret(B, f) {
      const gs = SPEC.sherman.turret(B, f), y0 = 1.88;
      // armação e tubos
      for (const s of [-1, 1]) { B.add(box, STEEL, 0.06, 1.15, 0.08, s * 1.15, y0 + 1.05, -0.2); B.add(box, STEEL, 0.06, 0.08, 1.5, s * 1.15, y0 + 0.5, 0.2); }
      B.add(box, STEEL, 2.4, 0.06, 0.08, 0, y0 + 1.62, -0.2);
      for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) { if (c === 4) continue; B.add(C6, 0x4d5333, 0.06, 2.6, 0.06, (c - 4) * 0.13 * (c < 4 ? 1.05 : 1.05) + (c < 4 ? -0.0 : 0.0), y0 + 1.0 + r * 0.13, 0.4, Math.PI / 2 - 0.05, 0, 0); }
      for (let r = 0; r < 2; r++) for (let c = 0; c < 6; c++) B.add(C6, 0x4d5333, 0.06, 2.6, 0.06, (c - 2.5) * 0.13, y0 + 1.55 + r * 0.13, 0.4, Math.PI / 2 - 0.05, 0, 0);
      return gs;
    },
  });

  // Chi-Ha Tipo 97 (antena em arco na torre)
  SPEC.chiha = {
    nat: 'JAP', L: 5.55, track: 'ger',
    gear: { tw: 0.33, x: 1.0, wr: 0.27, style: 'disc', wheels: [1.55, 1.0, 0.45, -0.25, -0.8, -1.35], bogie: 'leaf', bogies: [0.72, -0.53],
      front: { z: 2.15, y: 0.78, r: 0.3, sprocket: true, teeth: 14 }, rear: { z: -2.3, y: 0.58, r: 0.28, style: 'steel' },
      rollers: [{ z: 1.4, y: 0.86, r: 0.07 }, { z: 0.5, y: 0.88, r: 0.07 }, { z: -0.4, y: 0.88, r: 0.07 }, { z: -1.3, y: 0.86, r: 0.07 }], sag: 0.02 },
    hull(B) {
      H2(B, [[2.35, 0.45], [2.45, 0.78], [2.2, 1.05], [-2.35, 1.05], [-2.45, 0.55], [-2.15, 0.42]], 0.82);
      const up = [[2.2, 1.02], [1.9, 1.4], [1.5, 1.62], [-0.6, 1.62], [-0.75, 1.52], [-2.42, 1.45], [-2.45, 1.02]];
      H2(B, up, 1.1); rivEdges(B, up, 1.1, 0.22); fenders(B, 1.17, 1.02, 2.3, -2.45, 0.08);
      A.vis(B, -0.35, 1.48, 1.78, 0, 0.24); B.add(HEMI, PT, 0.1, 0.08, 0.1, 0.4, 1.48, 1.76, Math.PI / 2, 0, 0); A.mg(B, 0.4, 1.48, 1.86, 0, 0.05);
      A.grille(B, 0, 1.47, -1.6, 1.4, 1.1, 9); B.add(C8, 0x3a2a22, 0.08, 0.7, 0.08, -0.7, 1.3, -2.6, 0, 0, Math.PI / 2);
      A.light(B, 0.8, 1.15, 2.25, 0);
      return { tur: [-0.15, 0.15] };
    },
    turret(B) {
      const y0 = 1.62;
      B.add(tloft(plan8(1.3, 1.5, 0.3, 0.2), [[y0, 1, 1], [y0 + 0.5, 0.9, 0.92], [y0 + 0.56, 0.8, 0.84]]), PT);
      rivLine(B, [0.65, y0 + 0.08, -0.6], [0.65, y0 + 0.08, 0.5], 6); rivLine(B, [-0.65, y0 + 0.08, -0.6], [-0.65, y0 + 0.08, 0.5], 6);
      B.add(box, PT, 0.4, 0.3, 0.12, 0, y0 + 0.26, 0.78);
      B.add(HEMI, PT, 0.1, 0.08, 0.1, 0.25, y0 + 0.25, -0.76, -Math.PI / 2, 0, 0);
      A.cupola(B, 0.2, y0 + 0.56, -0.2, 0.22, 0.2, 6, 'de');
      const ring = []; for (let i = 0; i <= 18; i++) { const a = i / 18 * Math.PI * 1.7 + Math.PI * 0.65; ring.push([Math.cos(a) * 0.82, y0 + 0.66, Math.sin(a) * 0.9]); }
      A.rail(B, ring); for (const k of [2, 9, 16]) B.add(C6, STEEL, 0.012, 0.25, 0.012, ring[k][0], y0 + 0.55, ring[k][2]);
      return { y: y0 + 0.26, z: 0.84, len: 0.95, r0: 0.06, r1: 0.05, brake: 'none', sleeve: [0.09, 0.25] };
    },
    decals(g) { mark(g, null, 'JAP', { f: [0, 1.53, 1.73, -0.65], s: 0.6 }); },
  };

  // Ha-Go Tipo 95 (torre à esquerda)
  SPEC.hago = {
    nat: 'JAP', L: 4.38, track: 'ger',
    gear: { tw: 0.25, x: 0.9, wr: 0.26, style: 'disc', wheels: [1.2, 0.55, -0.45, -1.1], bogie: 'leaf', bogies: [0.88, -0.78],
      front: { z: 1.75, y: 0.72, r: 0.26, sprocket: true, teeth: 13 }, rear: { z: -1.85, y: 0.52, r: 0.25, style: 'steel' },
      rollers: [{ z: 0.85, y: 0.84, r: 0.07 }, { z: -0.75, y: 0.84, r: 0.07 }], sag: 0.02 },
    hull(B) {
      H2(B, [[1.9, 0.42], [2.0, 0.7], [1.75, 0.98], [-1.9, 0.98], [-2.0, 0.5], [-1.75, 0.4]], 0.74);
      const up = [[1.75, 0.95], [1.4, 1.35], [1.1, 1.62], [-0.4, 1.62], [-0.6, 1.42], [-1.95, 1.35], [-2.0, 0.95]];
      H2(B, up, 0.98); rivEdges(B, up, 0.98, 0.2); fenders(B, 1.04, 0.96, 1.9, -2.0, 0.08);
      B.add(box, PT, 0.35, 0.3, 0.4, -0.45, 1.45, 1.25); A.mg(B, -0.45, 1.45, 1.5, 0, 0.05);
      A.vis(B, 0.0, 1.5, 1.3, 0, 0.24); A.grille(B, 0, 1.37, -1.3, 1.2, 0.9, 7);
      B.add(C8, 0x3a2a22, 0.08, 0.7, 0.08, 0.6, 1.2, -2.1, 0, 0, Math.PI / 2);
      return { tur: [0.25, 0.3] };
    },
    turret(B) {
      const y0 = 1.62;
      B.add(tloft(superPlan(1.05, 1.3, 14, 2.2), [[y0, 1, 1], [y0 + 0.5, 0.9, 0.92]], { smooth: true }), PT);
      B.add(box, PT, 0.32, 0.25, 0.1, 0, y0 + 0.24, 0.66);
      B.add(HEMI, PT, 0.09, 0.07, 0.09, 0.0, y0 + 0.24, -0.66, -Math.PI / 2, 0, 0);
      A.hatch(B, 0, y0 + 0.5, -0.1, 0.24, 0);
      return { y: y0 + 0.24, z: 0.7, len: 1.35, r0: 0.04, r1: 0.032, brake: 'none', sleeve: [0.06, 0.25] };
    },
    decals(g) { mark(g, null, 'JAP', { f: [0.4, 1.38, 1.5, -0.8], s: 0.5 }); },
  };


  /* ---------- veículos com rodas ---------- */
  // pneu e roda centrados na origem; face externa para +x
  function tyre(B, r, w, style) {
    const T = once('ty' + style, () => {
      const knob = style === 'jeep' || style === 'mil';
      return {
        tire: lathe(style === 'dual'
          ? [[0.62, -0.5], [0.94, -0.5], [1, -0.42], [1, -0.06], [0.94, -0.02], [0.94, 0.02], [1, 0.06], [1, 0.42], [0.94, 0.5], [0.62, 0.5]]
          : [[0.6, -0.5], [0.9, -0.5], [1, -0.32], [1, 0.32], [0.9, 0.5], [0.6, 0.5]], 16),
        rim: lathe([[0, -0.3], [0.62, -0.36], [0.62, 0.4], [0.5, 0.3], [0.3, 0.38], [0.22, 0.52], [0, 0.54]], 14),
        knob,
      };
    });
    B.add(T.tire, RUBBER, r, w, r, 0, 0, 0, 0, 0, -Math.PI / 2);
    B.add(T.rim, PT, r, w, r, 0, 0, 0, 0, 0, -Math.PI / 2);
    for (let i = 0; i < 6; i++) { const a = i / 6 * TAU; B.add(box, STEEL, w * 0.1, r * 0.06, r * 0.06, w * 0.5, Math.cos(a) * r * 0.36, Math.sin(a) * r * 0.36); }
    if (T.knob) for (let i = 0; i < 18; i++) { const a = i / 18 * TAU; for (const sx of [-1, 1]) B.add(box, RUBBER, w * 0.36, r * 0.07, r * 0.16, sx * w * 0.22, Math.cos(a) * r * 1.0, Math.sin(a) * r * 1.0, a + sx * 0.35, 0, 0); }
    else for (let i = 0; i < 20; i++) { const a = i / 20 * TAU; B.add(box, RUBBER, w * 0.85, r * 0.05, r * 0.1, 0, Math.cos(a) * r * 1.0, Math.sin(a) * r * 1.0, a, 0, 0); }
  }
  // tripulante em busto (capacete conforme a nação)
  const UNI = { USA: [0x6a7050, 0x55603a], GER: [0x5d6a5a, 0x5a645c], SOV: [0x857a56, 0x4d5a36], ENG: [0x76694a, 0x5c5c3c], JAP: [0x8a7d4e, 0x6a6440], ITA: [0x6e6d50, 0x5e604c], FRA: [0x8a7d58, 0x58685e] };
  function crew(B, x, y, z, nat, ry, tank) {
    const [j, h] = UNI[nat] || UNI.USA, sk = 0xd2a17a, r = ry || 0;
    B.add(prism([[0.13, -0.4, 0.2], [0.14, 0.0, 0.22], [0.1, 0.12, 0.17], [-0.1, 0.12, 0.17], [-0.13, 0.0, 0.22], [-0.12, -0.4, 0.2]].map(([zz, yy, hw]) => [zz, yy, hw])), tank && nat === 'GER' ? 0x1e1e1e : j, 1, 1, 1, x, y - 0.12, z, 0, r, 0);
    B.add(C8, sk, 0.055, 0.1, 0.055, x, y + 0.04, z, 0, r, 0);
    B.add(SPH, sk, 0.09, 0.11, 0.1, x, y + 0.15, z + Math.cos(r) * 0.01);
    if (tank && nat === 'GER') { B.add(C12, 0x1a1a1a, 0.105, 0.07, 0.11, x, y + 0.24, z); B.add(box, 0x1a1a1a, 0.18, 0.02, 0.08, x + Math.sin(r) * 0.08, y + 0.21, z + Math.cos(r) * 0.08, 0, r, 0); }
    else if (nat === 'GER') { B.add(HEMI, h, 0.125, 0.12, 0.135, x, y + 0.19, z); B.add(once('flare', () => new THREE.CylinderGeometry(0.75, 1, 1, 12, 1, true)), shade(h, 0.9), 0.15, 0.06, 0.16, x, y + 0.165, z - 0.01); }
    else if (nat === 'ENG') { B.add(HEMI, h, 0.1, 0.07, 0.11, x, y + 0.23, z); B.add(C16, h, 0.17, 0.012, 0.18, x, y + 0.23, z); }
    else if (nat === 'SOV' && tank) { B.add(SPH, 0x2a2a26, 0.11, 0.1, 0.12, x, y + 0.21, z); }
    else { B.add(HEMI, h, 0.125, 0.13, 0.135, x, y + 0.19, z); B.add(C16, shade(h, 0.85), 0.14, 0.012, 0.15, x, y + 0.19, z); }
    for (const s of [-1, 1]) B.add(box, j, 0.07, 0.3, 0.08, x + Math.cos(r) * s * 0.24, y - 0.05, z - Math.sin(r) * s * 0.24 + Math.cos(r) * 0.06, 0.6, r, 0);
  }
  const shade = (hex, k) => { const c = new THREE.Color(hex).multiplyScalar(k); return c.getHex(); };
  // seções [x, y] empilhadas ao longo de z (lonas em arco, capôs arredondados)
  function zLoft(prof, zs, smooth) { return loft(zs.map(([z, sx, sy, dy]) => prof.map(([x, y]) => [x * (sx || 1), y * (sy || 1) + (dy || 0), z])), { smooth }); }
  const ARCH = (() => { const p = []; for (let i = 0; i <= 10; i++) { const a = i / 10 * Math.PI; p.push([Math.cos(a), Math.sin(a) * 0.9 + 0.1]); } p.push([-1, 0], [1, 0]); return p; })();
  // painel lateral fino (perfil [z, y] com recortes de para-lama)
  const side = (B, pts, x, t, col) => { for (const s of [-1, 1]) B.add(prism(pts.map(([z, y]) => [z, y, t || 0.025])), col === undefined ? PT : col, 1, 1, 1, s * x, 0, 0); };
  const arch = (z, r, y0) => { const o = []; for (let i = 0; i <= 6; i++) { const a = i / 6 * Math.PI; o.push([z + Math.cos(a) * r, y0 + Math.sin(a) * r]); } return o; };
  const mgOnly = (B2, y, kind) => { B2.add(box, DARK, 0.1, 0.12, 0.45, 0, y, 0); B2.add(C8, DARK, kind === '50' ? 0.03 : 0.02, 0.9, kind === '50' ? 0.03 : 0.02, 0, y + 0.01, 0.62, Math.PI / 2, 0, 0); if (kind === '50') B2.add(C8, 0x2a2a28, 0.05, 0.5, 0.05, 0, y + 0.01, 0.42, Math.PI / 2, 0, 0); };

  // Jeep Willys MB com .30 no pedestal
  SPEC.jeep = {
    nat: 'USA', L: 3.36, Wd: 1.6,
    wheels: [{ x: 0.62, z: 1.02, r: 0.37, w: 0.19, style: 'jeep' }, { x: 0.62, z: -1.01, r: 0.37, w: 0.19, style: 'jeep' }],
    hull(B) {
      for (const s of [-1, 1]) B.add(box, 0x2c2c26, 0.08, 0.14, 3.1, s * 0.4, 0.48, 0.05);
      B.add(C8, 0x2c2c26, 0.05, 1.25, 0.05, 0, 0.37, 1.02, 0, 0, Math.PI / 2); B.add(C8, 0x2c2c26, 0.06, 1.25, 0.06, 0, 0.37, -1.01, 0, 0, Math.PI / 2);
      // capô, grade e para-lamas dianteiros
      B.add(prism([[1.55, 0.62, 0.46], [1.55, 0.98, 0.44], [0.55, 1.03, 0.48], [0.55, 0.62, 0.5]]), PT);
      B.add(box, DARK, 0.86, 0.38, 0.03, 0, 0.8, 1.56); for (let i = 0; i < 9; i++) B.add(box, PT, 0.035, 0.36, 0.04, -0.36 + i * 0.09, 0.8, 1.575);
      for (const s of [-1, 1]) { B.add(C12, PT, 0.07, 0.05, 0.07, s * 0.3, 0.92, 1.58, Math.PI / 2, 0, 0); B.add(C12, 0xb8b4a0, 0.055, 0.01, 0.055, s * 0.3, 0.92, 1.61, Math.PI / 2, 0, 0); }
      for (const s of [-1, 1]) { B.add(prism([[1.62, 0.66, 0.15], [1.5, 0.8, 0.15], [0.55, 0.82, 0.15], [0.55, 0.78, 0.15], [1.5, 0.76, 0.15], [1.6, 0.62, 0.15]]), PT, 1, 1, 1, s * 0.63, 0, 0); }
      B.add(box, PT, 1.42, 0.12, 0.08, 0, 0.55, 1.66);
      // carroceria aberta: laterais com recorte de entrada, piso, traseira
      side(B, [[0.55, 0.55], [0.55, 1.02], [0.25, 1.02], [-0.02, 0.82], [-0.55, 0.82], [-0.72, 1.0], [-1.62, 1.0], [-1.65, 0.55]], 0.69, 0.025);
      B.add(box, PT, 1.38, 0.04, 2.2, 0, 0.58, -0.55); B.add(box, PT, 1.4, 0.45, 0.04, 0, 0.8, -1.64);
      for (const s of [-1, 1]) B.add(box, PT, 0.28, 0.3, 0.9, s * 0.53, 0.72, -1.0);
      B.add(box, PT, 1.36, 0.4, 0.05, 0, 0.82, 0.54);
      // bancos, volante, para-brisa
      for (const s of [-1, 1]) { B.add(box, 0x4a4a36, 0.42, 0.1, 0.42, s * 0.3, 0.75, 0.05); B.add(box, 0x4a4a36, 0.42, 0.4, 0.08, s * 0.3, 0.95, -0.17, -0.15, 0, 0); }
      B.add(box, 0x4a4a36, 1.2, 0.1, 0.45, 0, 0.78, -1.05);
      B.add(C8, DARK, 0.02, 0.4, 0.02, 0.3, 0.95, 0.35, -0.5, 0, 0); B.add(C16, DARK, 0.16, 0.02, 0.16, 0.3, 1.13, 0.27, -0.9, 0, 0);
      for (const s of [-1, 1]) B.add(box, PT, 0.04, 0.48, 0.04, s * 0.66, 1.26, 0.55, -0.12, 0, 0);
      B.add(box, PT, 1.36, 0.04, 0.04, 0, 1.5, 0.52); B.add(box, 0x5a6a6a, 1.26, 0.42, 0.012, 0, 1.27, 0.55, -0.12, 0, 0);
      // estepe, galão, pá e machado, antena
      B.add(once('jsp', () => { const b = new MB(); tyre(b, 0.37, 0.19, 'jeep'); return b.build(); }), PT, 1, 1, 1, 0, 0.92, -1.76, 0, Math.PI / 2, 0);
      A.jerry(B, 0.5, 0.95, -1.82, 0); A.antenna(B, -0.62, 1.0, -1.45, 2.2);
      B.add(box, WOOD, 0.03, 0.03, 0.9, -0.72, 0.85, -0.6); B.add(box, STEEL, 0.02, 0.2, 0.16, -0.72, 0.85, -0.12);
      // pedestal e tripulação
      B.add(C8, STEEL, 0.04, 0.85, 0.04, 0, 1.0, -0.55);
      crew(B, 0.3, 1.2, 0.0, 'USA'); crew(B, -0.12, 1.42, -0.85, 'USA');
      return { tur: [0, -0.55] };
    },
    turret() { return { y: 1.48, z: 0.1, len: 0.95, custom: (B2, y) => mgOnly(B2, y) }; },
    decals(g) { decal(g, dtex('usstar0'), 0.55, 0.55, 0, 1.035, 1.05, 0, -Math.PI / 2); for (const s of [-1, 1]) decal(g, dtex('usstar'), 0.4, 0.4, s * 0.72, 0.8, -1.2, s * Math.PI / 2); },
  };

  // Kübelwagen Typ 82 com MG 34
  SPEC.kubel = {
    nat: 'GER', L: 3.74, Wd: 1.6,
    wheels: [{ x: 0.66, z: 1.2, r: 0.36, w: 0.2, style: 'mil' }, { x: 0.66, z: -1.2, r: 0.36, w: 0.2, style: 'mil' }],
    hull(B) {
      const pf = [[1.9, 0.5], [1.95, 0.78], [1.62, 0.98], ...arch(1.2, 0.46, 0.5).reverse().map(([z, y]) => [z, y]), [0.95, 1.04], [-0.95, 1.04], [-1.9, 0.82], [-1.92, 0.5]];
      // painel lateral com caixas de roda e frisos
      const sp = [[1.95, 0.48], [1.98, 0.8], [1.6, 1.0], [0.95, 1.04], [-0.95, 1.04], [-1.9, 0.84], [-1.93, 0.48], ...arch(-1.2, 0.44, 0.48).map(([z, y]) => [z, y]).reverse().reverse(), ...[]];
      void pf; void sp;
      const pts = [[1.95, 0.5], [1.98, 0.8], [1.6, 1.0], [0.95, 1.04], [-0.95, 1.04], [-1.9, 0.84], [-1.93, 0.5], [-1.66, 0.5]];
      for (const [z, y] of arch(-1.2, 0.44, 0.5)) pts.push([z, y]);
      pts.push([-0.74, 0.5], [0.74, 0.5]);
      for (const [z, y] of arch(1.2, 0.44, 0.5)) pts.push([z, y]);
      pts.push([1.66, 0.5]);
      side(B, pts, 0.76, 0.02);
      for (const s of [-1, 1]) for (const y of [0.62, 0.86]) B.add(box, PD, 0.02, 0.03, 2.7, s * 0.785, y, 0.0);
      B.add(prism([[1.95, 0.55, 0.74], [1.98, 0.8, 0.74], [1.6, 1.0, 0.74], [0.95, 1.04, 0.74], [0.95, 0.55, 0.74]]), PT);
      B.add(prism([[-0.95, 0.55, 0.74], [-0.95, 1.04, 0.74], [-1.9, 0.84, 0.74], [-1.93, 0.55, 0.74]]), PT);
      for (let i = 0; i < 6; i++) B.add(box, DARK, 0.6, 0.015, 0.05, 0, 0.95 - i * 0.03, -1.15 - i * 0.12, -0.2, 0, 0);
      B.add(box, PT, 1.5, 0.04, 1.9, 0, 0.6, 0.0);
      B.add(once('ksp', () => { const b = new MB(); tyre(b, 0.36, 0.2, 'mil'); return b.build(); }), PT, 1, 1, 1, 0, 1.13, 1.45, 0, 0, Math.PI / 2 - 0.35);
      for (const s of [-1, 1]) A.light(B, s * 0.55, 1.08, 1.55, 0);
      // bancos, para-brisa, capota recolhida
      for (const z of [0.35, -0.55]) for (const s of [-1, 1]) { B.add(box, 0x3a3a30, 0.45, 0.12, 0.45, s * 0.3, 0.72, z); B.add(box, 0x3a3a30, 0.45, 0.4, 0.08, s * 0.3, 0.95, z - 0.22, -0.12, 0, 0); }
      B.add(box, PT, 1.45, 0.04, 0.04, 0, 1.45, 0.95); for (const s of [-1, 1]) B.add(box, PT, 0.04, 0.42, 0.04, s * 0.7, 1.24, 0.95); B.add(box, 0x5a6a6a, 1.36, 0.36, 0.012, 0, 1.25, 0.96);
      B.add(C12, CANVAS, 0.14, 1.5, 0.14, 0, 1.12, -0.95, 0, 0, Math.PI / 2);
      A.jerry(B, -0.55, 1.05, -1.6, 0, 0x4a4c3c); B.add(box, WOOD, 0.03, 0.03, 0.9, 0.79, 0.75, 0.0);
      crew(B, 0.3, 1.2, 0.4, 'GER'); crew(B, -0.3, 1.2, -0.5, 'GER');
      return { tur: [0.0, -0.1] };
    },
    turret(B) { B.add(C8, STEEL, 0.03, 0.55, 0.03, 0, 1.25, 0); return { y: 1.52, z: 0.0, len: 0.95, custom: (B2, y) => mgOnly(B2, y) }; },
    decals(g) { for (const s of [-1, 1]) decal(g, dtex('cross'), 0.32, 0.32, s * 0.8, 0.75, -1.3, s * Math.PI / 2); },
  };

  // M8 Greyhound (seis rodas, torre aberta de 37 mm)
  SPEC.greyhound = {
    nat: 'USA', L: 5.0, Wd: 2.54,
    wheels: [{ x: 1.0, z: 1.52, r: 0.47, w: 0.26, style: 'mil' }, { x: 1.0, z: -0.4, r: 0.47, w: 0.26, style: 'mil' }, { x: 1.0, z: -1.62, r: 0.47, w: 0.26, style: 'mil' }],
    hull(B) {
      H2(B, [[2.45, 0.62], [2.55, 0.95], [1.65, 1.42], [-1.3, 1.5], [-2.4, 1.42], [-2.5, 0.62]], 0.82);
      B.add(prism([[2.2, 0.95, 0.85], [1.55, 1.42, 0.85], [1.55, 1.42, 1.08], [2.2, 0.95, 1.0]].map(p => p)), PT);
      for (const s of [-1, 1]) {
        B.add(box, PT, 0.42, 0.04, 4.6, s * 1.08, 1.05, -0.1);
        for (const z of [0.55, -1.0]) { B.add(box, PT, 0.32, 0.38, 0.75, s * 1.08, 1.25, z); B.add(box, PD, 0.34, 0.04, 0.77, s * 1.08, 1.45, z); }
        A.light(B, s * 0.6, 1.12, 2.5, 0);
      }
      A.vis(B, 0.4, 1.3, 1.95, 0, 0.3); A.vis(B, -0.4, 1.3, 1.95, 0, 0.3);
      A.grille(B, 0, 1.51, -1.6, 1.4, 0.8, 7);
      B.add(C8, CANVAS, 0.16, 1.4, 0.16, 0, 1.62, -2.2, 0, 0, Math.PI / 2);
      return { tur: [0, -0.2] };
    },
    turret(B) {
      const y0 = 1.5;
      openTurret(B, superPlan(1.75, 1.75, 18, 2.2), [[y0, 1, 1], [y0 + 0.5, 0.96, 0.96]]);
      B.add(box, PT, 0.55, 0.38, 0.22, 0, y0 + 0.26, 0.9);
      const ring = []; for (let i = 0; i <= 16; i++) { const a = i / 16 * TAU; ring.push([Math.cos(a) * 0.75, y0 + 0.75, Math.sin(a) * 0.75]); }
      A.rail(B, ring); for (const a of [0.5, 2.6, 4.7]) B.add(C6, STEEL, 0.02, 0.28, 0.02, Math.cos(a) * 0.75, y0 + 0.62, Math.sin(a) * 0.75);
      A.mg(B, -0.75, y0 + 0.82, 0.0, 0, -0.1, '50');
      crew(B, 0.35, y0 + 0.5, -0.2, 'USA', 0, true); crew(B, -0.35, y0 + 0.45, -0.35, 'USA', 0, true);
      return { y: y0 + 0.26, z: 1.0, len: 1.9, r0: 0.04, r1: 0.032, brake: 'none', sleeve: [0.07, 0.3] };
    },
    decals(g, tur) { mark(g, tur, 'USA', { h: [0.83, 1.15, -0.2], t: [0.86, 1.75, 0], s: 0.45 }); },
  };

  // Sd.Kfz. 234/2 Puma (oito rodas, 50 mm)
  SPEC.puma = {
    nat: 'GER', L: 6.8, Wd: 2.4, zim: false,
    wheels: [2.0, 0.66, -0.66, -2.0].map(z => ({ x: 0.95, z, r: 0.48, w: 0.27, style: 'mil' })),
    hull(B) {
      B.add(prism([[3.3, 0.75, 0.55], [3.0, 1.15, 0.85], [2.2, 1.65, 0.85], [-2.2, 1.65, 0.85], [-3.1, 1.35, 0.85], [-3.3, 0.75, 0.7], [-2.6, 0.55, 0.8], [2.6, 0.55, 0.8]]), PT);
      for (const s of [-1, 1]) {
        B.add(prism([[3.0, 1.12, 0.02], [2.4, 1.2, 0.02], [-2.4, 1.2, 0.02], [-3.0, 1.12, 0.02], [-3.0, 1.1, 0.02], [3.0, 1.1, 0.02]]), PT, 1, 1, 1, 0, 0, 0);
        B.add(box, PT, 0.42, 0.03, 6.0, s * 1.08, 1.18, 0);
        for (const z of [1.33, -1.33]) { B.add(box, PT, 0.34, 0.42, 0.95, s * 1.1, 1.42, z); B.add(box, PD, 0.36, 0.04, 0.97, s * 1.1, 1.64, z); }
        A.light(B, s * 0.55, 1.25, 3.0, 0);
      }
      A.vis(B, 0.3, 1.45, 2.65, 0, 0.32); A.grille(B, 0, 1.66, -1.9, 1.3, 1.0, 8);
      for (const s of [-1, 1]) A.antenna(B, s * 0.7, 1.65, -2.4, 1.6);
      return { tur: [0, -0.3] };
    },
    turret(B) {
      const y0 = 1.65;
      B.add(tloft([[0.5, 0.9], [0.85, 0.35], [0.85, -0.55], [0.65, -0.85], [-0.65, -0.85], [-0.85, -0.55], [-0.85, 0.35], [-0.5, 0.9]], [[y0, 1, 1], [y0 + 0.62, 0.78, 0.86, -0.04]]), PT);
      B.add(SAU(), PT, 0.28, 0.3, 0.28, 0, y0 + 0.3, 0.88, Math.PI / 2, 0, 0);
      A.smoke(B, 0.72, y0 + 0.36, 0.3, 1, 3); A.smoke(B, -0.72, y0 + 0.36, 0.3, -1, 3); A.hatch(B, 0.2, y0 + 0.62, -0.3, 0.24, 0);
      return { y: y0 + 0.3, z: 1.1, len: 2.85, r0: 0.05, r1: 0.04, brake: 'double', sleeve: [0.08, 0.2] };
    },
    decals(g, tur) { mark(g, tur, 'GER', { h: [0.86, 1.4, -0.4], t: [0.8, 1.95, -0.2], s: 0.45, ta: 0.24 }); },
  };

  // corpo de meia-lagarta M3 (dianteira, cabine, compartimento)
  function halftrackUS(B, wallH) {
    for (const s of [-1, 1]) B.add(box, 0x2c2c26, 0.1, 0.18, 5.6, s * 0.45, 0.62, 0.3);
    B.add(C12, PD, 0.16, 1.9, 0.16, 0, 0.72, 3.0, 0, 0, Math.PI / 2);                                 // rolo para-choque
    B.add(box, PT, 1.3, 0.75, 0.08, 0, 1.12, 2.72); for (let i = 0; i < 7; i++) B.add(box, DARK, 1.1, 0.04, 0.05, 0, 0.85 + i * 0.09, 2.77);
    B.add(prism([[2.72, 0.75, 0.65], [2.72, 1.52, 0.6], [1.35, 1.6, 0.68], [1.35, 0.75, 0.7]]), PT);
    for (const s of [-1, 1]) { B.add(prism([[2.75, 0.95, 0.16], [2.5, 1.12, 0.16], [1.4, 1.12, 0.16], [1.1, 0.75, 0.16], [1.18, 0.72, 0.16], [1.45, 1.06, 0.16], [2.45, 1.06, 0.16], [2.7, 0.9, 0.16]]), PT, 1, 1, 1, s * 0.86, 0, 0); A.light(B, s * 0.75, 1.25, 2.55, 0); }
    // cabine e para-brisa blindado
    side(B, [[1.35, 0.75], [1.35, 1.65], [0.65, 1.65], [0.65, 1.95], [-2.65, 1.95], [-2.65, 0.75]], 1.0, 0.03);
    B.add(box, PT, 2.0, 0.55, 0.05, 0, 1.92, 1.35, -0.35, 0, 0); for (const s of [-1, 1]) B.add(box, GLASS, 0.5, 0.06, 0.02, s * 0.45, 1.92, 1.39, -0.35, 0, 0);
    B.add(box, PT, 2.0, 1.2, 0.05, 0, 1.35, -2.65); B.add(box, PD, 0.6, 0.9, 0.06, 0, 1.3, -2.68);
    B.add(box, 0x3a3a30, 1.94, 0.05, 4.0, 0, 0.98, -0.65);
    for (const s of [-1, 1]) B.add(box, 0x4a4a36, 0.35, 0.4, 2.8, s * 0.78, 1.18, -1.1);
    for (const s of [-1, 1]) { B.add(C8, CANVAS, 0.15, 1.4, 0.15, s * 1.12, 1.6, -0.6, Math.PI / 2, 0, 0); B.add(box, STEEL, 0.04, 0.04, 2.2, s * 1.05, 1.82, -0.8); }
    for (let i = 0; i < 3; i++) A.jerry(B, -0.55 + i * 0.55, 1.2, -2.78, 0);
    void wallH;
  }
  const G_M3 = { tw: 0.3, x: 0.85, wr: 0.25, style: 'spoke', wheels: [-0.55, -1.0, -1.45, -1.9], bogie: 'vvss', bogies: [-1.22],
    front: { z: -0.05, y: 0.5, r: 0.3, sprocket: true, teeth: 12 }, rear: { z: -2.45, y: 0.42, r: 0.3, style: 'spoke' }, rollers: [{ z: -1.2, y: 0.78, r: 0.08 }], sag: 0.02 };

  // M3 Half-track com .50 no púlpito
  SPEC.halftrack = {
    nat: 'USA', L: 6.18, Wd: 2.22, gear: G_M3, track: 'chevron',
    wheels: [{ x: 0.86, z: 1.85, r: 0.45, w: 0.24, style: 'mil' }],
    hull(B) {
      halftrackUS(B);
      B.add(C16, PT, 0.36, 0.55, 0.36, -0.55, 1.95, 1.0); B.add(C16, DARK, 0.33, 0.05, 0.33, -0.55, 2.22, 1.0);
      crew(B, 0.42, 1.55, 1.0, 'USA'); crew(B, 0.45, 1.6, -1.2, 'USA'); crew(B, -0.4, 1.6, -1.8, 'USA');
      return { tur: [-0.55, 1.0] };
    },
    turret() { return { y: 2.4, z: 0.1, len: 1.0, custom: (B2, y) => { mgOnly(B2, y, '50'); B2.add(box, PT, 0.5, 0.35, 0.03, 0, y - 0.05, 0.25); } }; },
    decals(g) { mark(g, null, 'USA', { h: [1.03, 1.45, -0.9], s: 0.5 }); decal(g, dtex('usstar0'), 0.6, 0.6, 0, 1.61, 2.0, 0, -Math.PI / 2); },
  };

  // M16 (reparo quádruplo de .50)
  SPEC.m16 = Object.assign({}, SPEC.halftrack, {
    hull(B) { halftrackUS(B); crew(B, 0.42, 1.55, 1.0, 'USA'); return { tur: [0, -1.0] }; },
    turret(B) {
      B.add(C16, PT, 0.55, 0.25, 0.55, 0, 1.2, 0); B.add(box, PT, 1.4, 0.55, 0.05, 0, 1.9, 0.35);
      for (const s of [-1, 1]) B.add(box, PT, 0.05, 0.5, 0.5, s * 0.7, 1.85, 0.1);
      crew(B, 0, 1.75, -0.25, 'USA', 0, true);
      return { y: 1.75, z: 0.2, len: 1.5, custom(B2, y) {
        B2.add(box, DARK, 0.9, 0.25, 0.5, 0, y, 0);
        for (const sx of [-1, 1]) for (const sy of [-1, 1]) { B2.add(box, DARK, 0.12, 0.14, 0.5, sx * 0.32, y + sy * 0.16, 0.0); B2.add(C8, 0x2a2a28, 0.035, 0.55, 0.035, sx * 0.32, y + sy * 0.16, 0.45, Math.PI / 2, 0, 0); B2.add(C8, DARK, 0.022, 0.6, 0.022, sx * 0.32, y + sy * 0.16, 1.0, Math.PI / 2, 0, 0); }
        for (const sx of [-1, 1]) B2.add(box, 0x4a4f2e, 0.18, 0.3, 0.3, sx * 0.62, y - 0.05, -0.1);
      } };
    },
  });

  // Sd.Kfz. 251 Ausf. D
  SPEC.sdkfz251 = {
    nat: 'GER', L: 5.8, Wd: 2.1, track: 'ger',
    gear: { tw: 0.28, x: 0.82, wr: 0.32, style: 'disc', inter: true, wheels: [0.75, 0.27, -0.21, -0.69, -1.17, -1.65],
      front: { z: 1.22, y: 0.5, r: 0.3, sprocket: true, teeth: 14 }, rear: { z: -2.35, y: 0.46, r: 0.3, style: 'steel' }, sag: 0.03 },
    wheels: [{ x: 0.8, z: 2.05, r: 0.42, w: 0.2, style: 'mil' }],
    hull(B) {
      // casco blindado de chapas inclinadas, aberto em cima
      B.add(prism([[2.9, 0.62, 0.38], [2.95, 0.85, 0.42], [2.6, 1.3, 0.62], [1.2, 1.5, 0.72], [1.2, 0.6, 0.78], [2.4, 0.55, 0.6]]), PT);
      for (const s of [-1, 1]) {
        B.add(prism([[1.2, 0.95, 0.02], [1.2, 1.75, 0.02], [-2.5, 1.75, 0.02], [-2.9, 1.3, 0.02], [-2.9, 0.95, 0.02]]), PT, 1, 1, 1, s * 0.9, 0, 0, 0, 0, 0);
        B.add(prism([[1.2, 0.95, 0.03], [1.2, 1.75, 0.03], [-2.5, 1.75, 0.03], [-2.9, 1.3, 0.03], [-2.9, 0.95, 0.03]]), PT, 1, 1, 1, s * 0.88, 0, 0, 0, 0, s * -0.18);
        B.add(box, PT, 0.4, 0.03, 4.6, s * 1.0, 0.98, -0.75);
        B.add(prism([[2.5, 0.9, 0.17], [2.3, 1.05, 0.17], [1.75, 1.05, 0.17], [1.5, 0.6, 0.17], [1.6, 0.58, 0.17], [1.82, 0.98, 0.17], [2.25, 0.98, 0.17], [2.45, 0.85, 0.17]]), PT, 1, 1, 1, s * 0.82, 0, 0);
        A.light(B, s * 0.55, 1.3, 2.45, 0);
      }
      B.add(box, PT, 1.6, 0.52, 0.05, 0, 1.72, 1.2, -0.45, 0, 0); for (const s of [-1, 1]) A.vis(B, s * 0.4, 1.73, 1.23, 0, 0.26);
      B.add(box, PT, 1.6, 0.85, 0.05, 0, 1.38, -2.88, 0.35, 0, 0);
      B.add(box, 0x3a3a30, 1.6, 0.05, 3.8, 0, 0.98, -0.75);
      for (const s of [-1, 1]) B.add(box, 0x3a3a30, 0.32, 0.35, 2.8, s * 0.6, 1.15, -1.0);
      A.tools(B, 0.98, 1.0, -1.2, 1.2, -1); A.antenna(B, -0.8, 1.75, 0.9, 1.8);
      crew(B, 0.35, 1.5, 0.75, 'GER'); crew(B, -0.4, 1.5, -1.3, 'GER'); crew(B, 0.4, 1.5, -1.9, 'GER');
      return { tur: [0, 1.05] };
    },
    turret(B) { B.add(box, PT, 0.55, 0.42, 0.03, 0, 1.95, 0.15, -0.15, 0, 0); return { y: 1.98, z: 0.05, len: 0.95, custom: (B2, y) => mgOnly(B2, y) }; },
    decals(g) { mark(g, null, 'GER', { h: [0.95, 1.4, -1.3], s: 0.45 }); },
  };

  // Panzerwerfer 42 "Maultier" (10 tubos de 150 mm)
  SPEC.maultier = {
    nat: 'GER', L: 6.0, Wd: 2.2, track: 'ger',
    gear: { tw: 0.28, x: 0.8, wr: 0.2, style: 'disc', single: true, wheels: [-0.35, -0.75, -1.15, -1.55], bogie: 'leaf', bogies: [-0.55, -1.35],
      front: { z: 0.12, y: 0.45, r: 0.26, sprocket: true, teeth: 12 }, rear: { z: -2.0, y: 0.38, r: 0.25, style: 'steel' }, sag: 0.02 },
    wheels: [{ x: 0.82, z: 1.95, r: 0.42, w: 0.22, style: 'mil' }],
    hull(B) {
      B.add(prism([[2.75, 0.62, 0.55], [2.8, 1.0, 0.55], [2.35, 1.45, 0.6], [1.3, 1.5, 0.75], [1.3, 0.6, 0.78]]), PT);
      B.add(prism([[1.3, 0.62, 1.0], [1.3, 1.8, 0.95], [0.95, 2.1, 0.9], [-2.4, 2.1, 0.9], [-2.55, 1.6, 0.95], [-2.55, 0.62, 1.0]]), PT);
      for (const s of [-1, 1]) { B.add(prism([[2.55, 0.92, 0.16], [2.3, 1.05, 0.16], [1.6, 1.05, 0.16], [1.4, 0.6, 0.16], [1.5, 0.58, 0.16], [1.65, 0.98, 0.16], [2.25, 0.98, 0.16], [2.5, 0.85, 0.16]]), PT, 1, 1, 1, s * 0.82, 0, 0); A.light(B, s * 0.5, 1.2, 2.6, 0); }
      for (const s of [-1, 1]) A.vis(B, s * 0.4, 1.85, 1.16, 0, 0.3);
      B.add(C16, PT, 0.85, 0.1, 0.85, 0, 2.15, -0.9);
      return { tur: [0, -0.9] };
    },
    turret(B) {
      B.add(box, PT, 1.0, 0.25, 0.9, 0, 2.35, 0);
      return { y: 2.75, z: -0.3, len: 1.35, custom(B2, y) {
        for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) { B2.add(C12, 0x4a4c3c, 0.09, 1.5, 0.09, (c - 2) * 0.2, y + r * 0.2, 0.7, Math.PI / 2 - 0.25, 0, 0); B2.add(C12, DARK, 0.07, 0.02, 0.07, (c - 2) * 0.2, y + r * 0.2 + 0.18, 1.43, Math.PI / 2 - 0.25, 0, 0); }
        for (const z of [0.2, 1.1]) B2.add(box, STEEL, 1.1, 0.5, 0.06, 0, y + 0.1 + (z - 0.2) * 0.25, z, -0.25, 0, 0);
      } };
    },
    decals(g) { mark(g, null, 'GER', { h: [0.97, 1.4, -1.2], s: 0.5 }); },
  };

  // trator blindado Caterpillar D7 do Dia D
  SPEC.dozer = {
    nat: 'USA', L: 6.2, Wd: 3.0, track: 'ger',
    gear: { tw: 0.51, x: 0.95, wr: 0.22, style: 'steel', single: true, wheels: [1.05, 0.55, 0.05, -0.45, -0.95],
      front: { z: 1.75, y: 0.52, r: 0.38, style: 'steel' }, rear: { z: -1.7, y: 0.64, r: 0.42, sprocket: true, teeth: 16 },
      rollers: [{ z: 0.9, y: 0.92, r: 0.09 }, { z: -0.6, y: 0.94, r: 0.09 }], sag: 0.01 },
    hull(B) {
      for (const s of [-1, 1]) B.add(box, PT, 0.25, 0.25, 3.4, s * 0.62, 0.62, 0.0);
      B.add(prism([[1.8, 0.9, 0.55], [1.8, 1.72, 0.52], [0.15, 1.78, 0.55], [0.15, 0.9, 0.58]]), PT);
      B.add(box, DARK, 0.95, 0.75, 0.04, 0, 1.3, 1.82); for (let i = 0; i < 8; i++) B.add(box, PT, 0.04, 0.72, 0.05, -0.42 + i * 0.12, 1.3, 1.84);
      B.add(C8, 0x2b2b25, 0.08, 0.9, 0.08, 0.35, 2.15, 1.35); B.add(C8, 0x2b2b25, 0.1, 0.06, 0.1, 0.35, 2.62, 1.35);
      B.add(C8, STEEL, 0.13, 0.5, 0.13, -0.32, 1.98, 1.0);
      for (const s of [-1, 1]) B.add(box, PT, 0.55, 0.04, 3.4, s * 0.95, 1.12, 0.0);
      // posto do operador com blindagem e tanque de combustível
      B.add(box, 0x3a3a30, 0.6, 0.15, 0.55, 0, 1.25, -0.5); B.add(box, 0x3a3a30, 0.6, 0.5, 0.1, 0, 1.5, -0.8);
      B.add(C12, PT, 0.32, 1.3, 0.32, 0, 1.45, -1.35, 0, 0, Math.PI / 2);
      B.add(box, PT, 1.9, 1.1, 0.06, 0, 1.7, 0.1); B.add(box, GLASS, 0.6, 0.08, 0.02, 0, 2.0, 0.14);
      for (const s of [-1, 1]) B.add(box, PT, 0.06, 1.1, 1.5, s * 0.95, 1.7, -0.65);
      crew(B, 0, 1.75, -0.45, 'USA');
      // lâmina curva e braços de empuxo
      B.add(prism([[2.75, 0.05], [2.6, 0.4], [2.55, 0.8], [2.6, 1.2], [2.72, 1.42], [2.62, 1.44], [2.47, 1.2], [2.42, 0.8], [2.47, 0.4], [2.6, 0.05]].map(([z, y]) => [z, y, 1.9])), PT);
      B.add(box, 0x6a6a60, 3.8, 0.12, 0.2, 0, 0.08, 2.78);
      for (const s of [-1, 1]) { B.add(box, PT, 0.18, 0.22, 2.2, s * 1.35, 0.72, 1.5, -0.06, 0, 0); B.add(box, PT, 0.08, 1.4, 0.4, s * 1.9, 0.75, 2.55); }
      B.add(box, STEEL, 0.5, 0.6, 0.4, 0, 2.0, 2.0); for (const s of [-1, 1]) B.add(box, STEEL, 0.08, 1.4, 0.08, s * 0.5, 1.65, 2.2, 0.35, 0, 0);
      return { tur: [0, 0] };
    },
    decals(g) { for (const s of [-1, 1]) decal(g, dtex('usstar'), 0.7, 0.7, s * 0.985, 1.7, -0.6, s * Math.PI / 2); },
  };

  // caminhões de comboio
  function truckBed(B, z0, z1, hw, y0) {
    B.add(box, PT, hw * 2, 0.08, z0 - z1, 0, y0, (z0 + z1) / 2);
    side(B, [[z0, y0], [z0, y0 + 0.55], [z1, y0 + 0.55], [z1, y0]], hw, 0.03, WOOD);
    B.add(box, WOOD, hw * 2, 0.55, 0.05, 0, y0 + 0.28, z1);
    B.add(zLoft(ARCH, [[z0, hw, 0.85, y0 + 0.5], [z1 + 0.02, hw, 0.85, y0 + 0.5]], true), CANVAS);
    for (let i = 0; i < 4; i++) B.add(box, shade(CANVAS, 0.8), hw * 2.02, 0.03, 0.06, 0, y0 + 1.3, z0 - (i + 0.5) * (z0 - z1) / 4);
  }
  SPEC.gmc = {
    nat: 'USA', L: 6.86, Wd: 2.24,
    wheels: [{ x: 0.86, z: 2.35, r: 0.48, w: 0.25, style: 'truck' }, { x: 0.82, z: -0.92, r: 0.48, w: 0.42, style: 'dual' }, { x: 0.82, z: -2.15, r: 0.48, w: 0.42, style: 'dual' }],
    hull(B) {
      for (const s of [-1, 1]) B.add(box, 0x2c2c26, 0.1, 0.22, 6.5, s * 0.45, 0.78, -0.1);
      B.add(prism([[3.25, 0.95, 0.42], [3.25, 1.5, 0.4], [1.75, 1.6, 0.45], [1.75, 0.95, 0.45]]), PT);
      B.add(box, DARK, 0.75, 0.55, 0.03, 0, 1.22, 3.27); for (let i = 0; i < 6; i++) B.add(box, STEEL, 0.75, 0.025, 0.04, 0, 1.0 + i * 0.1, 3.3);
      for (const s of [-1, 1]) { B.add(prism([[3.3, 1.0, 0.22], [2.85, 1.28, 0.22], [1.85, 1.28, 0.22], [1.6, 0.95, 0.22], [1.7, 0.92, 0.22], [1.95, 1.22, 0.22], [2.8, 1.22, 0.22], [3.25, 0.96, 0.22]]), PT, 1, 1, 1, s * 0.85, 0, 0); A.light(B, s * 0.62, 1.35, 3.2, 0); }
      B.add(box, PT, 2.1, 0.14, 0.1, 0, 0.82, 3.4);
      // cabine aberta com capota de lona
      B.add(prism([[1.75, 0.95, 0.95], [1.75, 1.65, 0.95], [1.6, 1.75, 0.95], [0.6, 1.75, 0.95], [0.6, 0.95, 0.95]]), PT);
      B.add(box, 0x5a6a6a, 1.75, 0.55, 0.02, 0, 2.05, 1.72, -0.08, 0, 0); for (const s of [-1, 1]) B.add(box, PT, 0.05, 0.6, 0.05, s * 0.9, 2.05, 1.72);
      B.add(box, CANVAS, 1.95, 0.06, 1.2, 0, 2.38, 1.15); for (const s of [-1, 1]) B.add(box, CANVAS, 0.03, 0.55, 1.1, s * 0.96, 2.1, 1.1);
      crew(B, 0.42, 2.0, 1.15, 'USA');
      B.add(once('gsp', () => { const b = new MB(); tyre(b, 0.48, 0.25, 'truck'); return b.build(); }), PT, 1, 1, 1, -1.0, 1.25, 0.3, 0, 0, 0);
      truckBed(B, 0.45, -3.3, 1.08, 1.2);
      for (const s of [-1, 1]) B.add(box, PT, 0.5, 0.05, 1.8, s * 0.82, 1.08, -1.55);
      A.jerry(B, 0.75, 1.0, 0.3, Math.PI / 2);
      return { tur: [0, 0] };
    },
    decals(g) { decal(g, dtex('usstar0'), 0.55, 0.55, 0, 1.585, 2.5, 0, -Math.PI / 2); for (const s of [-1, 1]) decal(g, dtex('usstar'), 0.55, 0.55, s * 0.955, 1.35, 1.15, s * Math.PI / 2); },
  };
  SPEC.blitz = {
    nat: 'GER', L: 6.02, Wd: 2.26,
    wheels: [{ x: 0.82, z: 1.85, r: 0.46, w: 0.24, style: 'mil' }, { x: 0.8, z: -1.35, r: 0.46, w: 0.42, style: 'dual' }],
    hull(B) {
      for (const s of [-1, 1]) B.add(box, 0x2c2c26, 0.1, 0.2, 5.8, s * 0.45, 0.75, -0.1);
      B.add(prism([[2.85, 0.92, 0.4], [2.85, 1.42, 0.36], [1.45, 1.62, 0.42], [1.45, 0.92, 0.44]]), PT);
      B.add(box, DARK, 0.62, 0.45, 0.03, 0, 1.15, 2.87); for (let i = 0; i < 8; i++) B.add(box, STEEL, 0.03, 0.42, 0.04, -0.28 + i * 0.08, 1.15, 2.89);
      for (const s of [-1, 1]) { B.add(prism([[2.95, 0.95, 0.22], [2.55, 1.28, 0.22], [1.45, 1.28, 0.22], [1.3, 0.95, 0.22], [1.4, 0.92, 0.22], [1.55, 1.22, 0.22], [2.5, 1.22, 0.22], [2.9, 0.92, 0.22]]), PT, 1, 1, 1, s * 0.85, 0, 0); A.light(B, s * 0.75, 1.4, 2.6, 0); }
      // cabine fechada (Einheitsfahrerhaus)
      B.add(prism([[1.45, 0.95, 0.98], [1.45, 1.75, 0.98], [1.3, 2.25, 0.95], [0.35, 2.3, 0.95], [0.3, 0.95, 0.98]]), PT);
      B.add(box, 0x5a6a6a, 1.6, 0.42, 0.02, 0, 2.0, 1.4, -0.3, 0, 0);
      for (const s of [-1, 1]) B.add(box, 0x5a6a6a, 0.02, 0.38, 0.55, s * 0.99, 1.95, 0.95);
      truckBed(B, 0.25, -2.95, 1.1, 1.15);
      for (const s of [-1, 1]) B.add(box, PT, 0.48, 0.05, 1.2, s * 0.82, 1.02, -1.35);
      return { tur: [0, 0] };
    },
    decals(g) { for (const s of [-1, 1]) decal(g, dtex('cross'), 0.35, 0.35, s * 0.99, 1.45, 0.9, s * Math.PI / 2); },
  };

  /* ---------- montagem ---------- */
  function make(kind) {
    const S = SPEC[kind];
    const year = (typeof SC !== 'undefined' && SC.year) || 1944;
    const f = S.flags ? S.flags(year) : '';
    const sc = scheme(S.nat), zim = !!S.zim && year >= 1943.65 && year < 1944.75 && (typeof SC === 'undefined' || SC.biome !== 'desert');
    const mat = paintMat(sc, zim);
    const root = new THREE.Group(); root.rotation.order = 'YXZ';
    const g = new THREE.Group(); root.add(g); g.scale.setScalar(K);
    // duas versões de cada malha: perto (detalhada) e longe (leve)
    const build = (key, fn) => [false, true].map(l => once(key + (l ? 'L' : ''), () => { LITE = l; const B = new MB(); const info = fn(B); LITE = false; const geo = B.build(); geo.userData = info || {}; return geo; }));
    const lod = (geos, parent) => { const o = new THREE.LOD(); geos.forEach((geo, i) => { const m = new THREE.Mesh(geo, mat); m.castShadow = true; m.receiveShadow = i === 0; o.addLevel(m, i ? LOD_DIST : 0); }); parent.add(o); return o; };
    const hullGeos = build('H' + kind + f, (B) => { const i = S.hull(B, f); if (S.gear) runningGear(B, S.gear); return i; });
    const info = hullGeos[0].userData;
    lod(hullGeos, g);
    let tm = null;
    if (S.gear) {
      tm = trackMat(S.track || 'ger');
      const tg = once('T' + kind, () => trackGeo(S.gear));
      for (const s of [-1, 1]) { const t = new THREE.Mesh(tg, tm); t.position.x = s * S.gear.x; t.castShadow = true; g.add(t); }
    }
    // rodas que giram (veículos com rodas e meias-lagartas)
    const ws = [];
    for (const w of S.wheels || []) {
      const geo = once('WH' + w.style + w.r + w.w, () => { const B = new MB(); tyre(B, w.r, w.w, w.style); return B.build(); });
      for (const s of [-1, 1]) { const m = new THREE.Mesh(geo, mat); m.position.set(s * w.x, w.r, w.z); m.rotation.y = s > 0 ? 0 : Math.PI; m.castShadow = true; g.add(m); ws.push(m); }
    }
    const tur = new THREE.Group(); tur.position.set(info.tur[0] || 0, 0, info.tur[1] || 0); g.add(tur);
    const turGeos = build('R' + kind + f, (B) => (S.turret ? S.turret(B, f) : { y: 1, z: 0, len: 0, custom() {} }));
    const gs = turGeos[0].userData;
    lod(turGeos, tur);
    const gGeo = once('G' + kind, () => { const B = new MB(); if (gs.custom) gs.custom(B, gs.y); else addGun(B, gs); return B.build(); });
    const gun = new THREE.Mesh(gGeo, mat); gun.position.set(0, 0, gs.z); gun.castShadow = true; tur.add(gun);
    if (!gGeo.attributes.position.count) gun.visible = false;
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, gs.y, gs.z + gs.len + 0.15); tur.add(muzzle);
    if (S.decals) S.decals(g, tur, f);
    if (typeof blob === 'function') { const sh = blob(root, 1); sh.scale.set((S.Wd || 3.1) * K * 1.4, S.L * K * 1.25, 1); }
    root.userData = { turret: tur, gun, muzzle, trackMat: tm, wheels: ws, L: S.L * K, b3: true };
    return root;
  }
  // triângulos visíveis: nível 0 (perto) ou 1 (longe) dos LODs
  function triangles(o, level) {
    let t = 0;
    const walk = (m) => {
      if (m.isLOD) { walk(m.levels[Math.min(level || 0, m.levels.length - 1)].object); return; }
      if (m.isMesh) t += (m.geometry.index ? m.geometry.index.count : m.geometry.attributes.position.count) / 3;
      for (const c of m.children) walk(c);
    };
    walk(o); return Math.round(t);
  }
  return { make, has: (k) => !!SPEC[k], kinds: () => Object.keys(SPEC), SPEC, K, triangles, A, prism, tloft, plan8, superPlan, lathe, decal, dtex, numTex };
})();
// substitui os modelos antigos pelos novos onde houver
if (typeof makeTank === 'function') {
  const _makeTankOld3 = makeTank;
  makeTank = function (kind) { return Blindado3.has(kind) ? Blindado3.make(kind) : _makeTankOld3(kind); };
}
if (typeof makeDozer === 'function') makeDozer = function () { return Blindado3.make('dozer'); };
