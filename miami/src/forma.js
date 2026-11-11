// Ferramentas de modelagem "esculpida": superfícies lisas feitas a partir de seções transversais (loft)
// e asas com perfil aerodinâmico. Geram BufferGeometry com normais suaves, uv e sem índice
// (prontas para Mont.add).
import * as THREE from 'three';

// rings: lista de anéis (arrays de [x,y,z]) com o mesmo número de pontos. Liga os anéis em sequência,
// fecha as pontas com tampas planas (separadas, para não "amolecer" a borda) e corrige o sentido das faces.
export function superficie(rings, tampas = true) {
  const N = rings[0].length, R = rings.length;
  const pos = [], uv = [], idx = [];
  let vAc = 0;
  for (let r = 0; r < R; r++) {
    if (r > 0) {
      let d = 0;
      for (let i = 0; i < N; i++) { const a = rings[r][i], b = rings[r - 1][i]; d += Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
      vAc += d / N;
    }
    let uAc = 0;
    for (let i = 0; i < N; i++) {
      const p = rings[r][i];
      if (i > 0) { const q = rings[r][i - 1]; uAc += Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); }
      pos.push(p[0], p[1], p[2]);
      uv.push(uAc / 2.2, vAc / 2.2);
    }
  }
  for (let r = 0; r < R - 1; r++) {
    for (let i = 0; i < N; i++) {
      const a = r * N + i, b = r * N + (i + 1) % N, c = (r + 1) * N + i, d = (r + 1) * N + (i + 1) % N;
      idx.push(a, c, b, b, c, d);
    }
  }
  let g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  g.setIndex(idx);
  // sentido das faces: volume com sinal (centro do objeto como referência)
  let cx = 0, cy = 0, cz = 0;
  for (let i = 0; i < pos.length; i += 3) { cx += pos[i]; cy += pos[i + 1]; cz += pos[i + 2]; }
  const n3 = pos.length / 3; cx /= n3; cy /= n3; cz /= n3;
  let vol = 0;
  for (let t = 0; t < idx.length; t += 3) {
    const A = idx[t] * 3, B = idx[t + 1] * 3, C = idx[t + 2] * 3;
    const ax = pos[A] - cx, ay = pos[A + 1] - cy, az = pos[A + 2] - cz;
    const bx = pos[B] - cx, by = pos[B + 1] - cy, bz = pos[B + 2] - cz;
    const qx = pos[C] - cx, qy = pos[C + 1] - cy, qz = pos[C + 2] - cz;
    vol += ax * (by * qz - bz * qy) - ay * (bx * qz - bz * qx) + az * (bx * qy - by * qx);
  }
  const inverter = vol < 0;
  if (inverter) { for (let t = 0; t < idx.length; t += 3) { const k = idx[t + 1]; idx[t + 1] = idx[t + 2]; idx[t + 2] = k; } g.setIndex(idx); }
  g.computeVertexNormals();
  g = g.toNonIndexed();
  if (!tampas) return g;
  const partes = [g];
  for (const [r, sinal] of [[0, -1], [R - 1, 1]]) {
    const ring = rings[r];
    let mx = 0, my = 0, mz = 0;
    for (const p of ring) { mx += p[0]; my += p[1]; mz += p[2]; }
    mx /= N; my /= N; mz /= N;
    // tamanho do anel: ignora anéis degenerados (ponta fechada)
    let raio = 0;
    for (const p of ring) raio = Math.max(raio, Math.hypot(p[0] - mx, p[1] - my, p[2] - mz));
    if (raio < 1e-3) continue;
    const tp = [], tu = [];
    for (let i = 0; i < N; i++) {
      const p = ring[i], q = ring[(i + 1) % N];
      let tri = [[mx, my, mz], p, q];
      if ((sinal < 0) !== inverter) tri = [[mx, my, mz], q, p];
      for (const v of tri) { tp.push(v[0], v[1], v[2]); tu.push(0.5, 0.5); }
    }
    const tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.Float32BufferAttribute(tp, 3));
    tg.setAttribute('uv', new THREE.Float32BufferAttribute(tu, 2));
    tg.computeVertexNormals();
    partes.push(tg);
  }
  return juntarSimples(partes);
}

function juntarSimples(gs) {
  let n = 0;
  for (const g of gs) n += g.attributes.position.count;
  const P = new Float32Array(n * 3), Nn = new Float32Array(n * 3), U = new Float32Array(n * 2);
  let o = 0;
  for (const g of gs) {
    P.set(g.attributes.position.array, o * 3);
    Nn.set(g.attributes.normal.array, o * 3);
    U.set(g.attributes.uv.array, o * 2);
    o += g.attributes.position.count;
  }
  const r = new THREE.BufferGeometry();
  r.setAttribute('position', new THREE.BufferAttribute(P, 3));
  r.setAttribute('normal', new THREE.BufferAttribute(Nn, 3));
  r.setAttribute('uv', new THREE.BufferAttribute(U, 2));
  return r;
}

// superelipse: expoente n (2 = elipse, 4 = caixa arredondada, 1 = losango)
const se = (v, n) => Math.sign(v) * Math.pow(Math.abs(v), 2 / n);

// anel de seção ao longo do eixo Z: centro (x,y), largura w, altura acima (hT) e abaixo (hB) do centro,
// expoentes de cima (nT) e de baixo (nB). O primeiro ponto fica embaixo (costura escondida).
export function anelZ(z, s, N) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const t = -Math.PI / 2 + (i / N) * Math.PI * 2;
    const c = Math.cos(t), sn = Math.sin(t);
    const n = sn >= 0 ? (s.nT ?? s.n ?? 2.4) : (s.nB ?? s.n ?? 2.4);
    const lado = (c >= 0 ? (s.wR ?? s.w) : (s.wL ?? s.w)) / 2;
    pts.push([(s.x || 0) + lado * se(c, n), (s.y || 0) + (sn >= 0 ? s.hT : s.hB) * se(sn, n), z]);
  }
  return pts;
}
// loft ao longo de Z: secs = [{z, w, hT, hB, y, x, n, nT, nB}, ...] de trás para frente
export function loftZ(secs, N = 18, tampas = true) {
  return superficie(secs.map((s) => anelZ(s.z, s, N)), tampas);
}
// loft ao longo de Y (troncos, membros): secs = [{y, w, f (frente +z), t (trás -z), x, z, n}]
export function loftY(secs, N = 14, tampas = true) {
  return superficie(secs.map((s) => {
    const pts = [];
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2;
      const c = Math.cos(a), sn = Math.sin(a);
      const n = s.n ?? 2.2;
      pts.push([(s.x || 0) + (s.w / 2) * se(c, n), s.y, (s.z || 0) + (sn >= 0 ? s.f : s.t) * se(sn, n)]);
    }
    return pts;
  }), tampas);
}

// asa/deriva com perfil aerodinâmico entre a raiz e a ponta.
// raiz/ponta: {p:[x,y,z] do bordo de ataque, corda, esp (espessura relativa)}; normal: direção da espessura
export function asa(raiz, ponta, normal = null, M = 9) {
  if (!normal) {
    // espessura perpendicular à envergadura e à corda (corda ao longo de -Z)
    const sx = ponta.p[0] - raiz.p[0], sy = ponta.p[1] - raiz.p[1], sz = ponta.p[2] - raiz.p[2];
    let nx = sy, ny = -sx, nz = 0;
    const L = Math.hypot(nx, ny, nz) || 1;
    normal = [nx / L, ny / L, nz / L];
    if (normal[1] < 0 || (Math.abs(normal[1]) < 1e-6 && normal[0] < 0)) normal = normal.map((v) => -v);
  }
  const perfil = (sec) => {
    const [px, py, pz] = sec.p, c = sec.corda, t = sec.esp ?? 0.08;
    const pts = [];
    // de trás (bordo de fuga) por cima até a frente e de volta por baixo
    for (let k = 0; k < M * 2; k++) {
      const cima = k < M;
      const u = cima ? 1 - k / (M - 1) : (k - M) / (M - 1);
      const xx = Math.pow(u, 1.6);   // mais pontos perto do bordo de ataque
      const yt = 5 * t * (0.2969 * Math.sqrt(xx) - 0.126 * xx - 0.3516 * xx * xx + 0.2843 * xx ** 3 - 0.1036 * xx ** 4);
      const off = (cima ? 1 : -1) * yt * c;
      pts.push([px + normal[0] * off, py + normal[1] * off, pz - xx * c + normal[2] * off]);
    }
    return pts;
  };
  return superficie([perfil(raiz), perfil(ponta)], true);
}
