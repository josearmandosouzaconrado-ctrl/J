// Busca de caminhos (A*) numa grade mais grossa que a do terreno (2x2 células)
import { GW, GH, CEL, grade, predioId, T, COSTA } from './mapa.js';

const F = 2;
export const NW = Math.ceil(GW / F), NH = Math.ceil(GH / F);
export const NCEL = CEL * F;
const N = NW * NH;
// modos: 0 terra, 1 água (barcos), 2 água funda (navios grandes), 3 anfíbio (hovercraft)
const mapas = [new Uint8Array(N), new Uint8Array(N), new Uint8Array(N), new Uint8Array(N)];

export function prepararNavegacao() {
  const terra = mapas[0], aguaM = mapas[1], funda = mapas[2], anf = mapas[3];
  for (let y = 0; y < NH; y++) {
    for (let x = 0; x < NW; x++) {
      let nt = 0, na = 0, np = 0;
      for (let j = 0; j < F; j++) for (let i = 0; i < F; i++) {
        const gx = x * F + i, gy = y * F + j;
        if (gx >= GW || gy >= GH) { na++; continue; }
        const c = gy * GW + gx, t = grade[c];
        if (t === T.AGUA) na++;
        else if (t === T.PONTE) { nt++; na++; np++; }
        else if (predioId[c] < 0) nt++;
      }
      const k = y * NW + x;
      terra[k] = nt >= 2 || np > 0 ? 1 : 0;
      aguaM[k] = na >= 3 ? 1 : 0;
      anf[k] = terra[k] || aguaM[k] ? 1 : 0;
    }
  }
  // água funda: distância de pelo menos 3 células até a terra
  const dist = new Uint8Array(N).fill(255);
  const fila = new Int32Array(N);
  let a = 0, b = 0;
  for (let k = 0; k < N; k++) if (!aguaM[k]) { dist[k] = 0; fila[b++] = k; }
  while (a < b) {
    const k = fila[a++], x = k % NW, y = (k / NW) | 0, d = dist[k] + 1;
    if (d > 20) continue;
    if (x > 0 && dist[k - 1] > d) { dist[k - 1] = d; fila[b++] = k - 1; }
    if (x < NW - 1 && dist[k + 1] > d) { dist[k + 1] = d; fila[b++] = k + 1; }
    if (y > 0 && dist[k - NW] > d) { dist[k - NW] = d; fila[b++] = k - NW; }
    if (y < NH - 1 && dist[k + NW] > d) { dist[k + NW] = d; fila[b++] = k + NW; }
  }
  for (let k = 0; k < N; k++) funda[k] = dist[k] >= 3 ? 1 : 0;
}

export function livre(modo, x, z) {
  const cx = Math.floor(x / NCEL), cz = Math.floor(z / NCEL);
  if (cx < 0 || cz < 0 || cx >= NW || cz >= NH) return COSTA && (modo === 1 || modo === 2);
  return mapas[modo][cz * NW + cx] === 1;
}

function pertoLivre(m, k, raio = 40) {
  if (m[k]) return k;
  const x0 = k % NW, y0 = (k / NW) | 0;
  for (let r = 1; r <= raio; r++) {
    for (let dy = -r; dy <= r; dy++) {
      for (let dx = -r; dx <= r; dx++) {
        if (Math.abs(dx) !== r && Math.abs(dy) !== r) continue;
        const x = x0 + dx, y = y0 + dy;
        if (x < 0 || y < 0 || x >= NW || y >= NH) continue;
        if (m[y * NW + x]) return y * NW + x;
      }
    }
  }
  return -1;
}

export function pontoLivreProximo(modo, x, z) {
  const cx = Math.max(0, Math.min(NW - 1, Math.floor(x / NCEL))), cz = Math.max(0, Math.min(NH - 1, Math.floor(z / NCEL)));
  const k = pertoLivre(mapas[modo], cz * NW + cx, 60);
  if (k < 0) return null;
  return { x: (k % NW + 0.5) * NCEL, z: (((k / NW) | 0) + 0.5) * NCEL };
}

// ---- A* ----
const g = new Float32Array(N), veio = new Int32Array(N), marca = new Uint32Array(N), fechado = new Uint32Array(N);
let geracao = 1;
const heapK = new Int32Array(N), heapF = new Float32Array(N);
let hn = 0;
function push(k, f) {
  let i = hn++;
  while (i > 0) { const p = (i - 1) >> 1; if (heapF[p] <= f) break; heapK[i] = heapK[p]; heapF[i] = heapF[p]; i = p; }
  heapK[i] = k; heapF[i] = f;
}
function pop() {
  const top = heapK[0], lk = heapK[--hn], lf = heapF[hn];
  let i = 0;
  while (true) {
    let c = i * 2 + 1;
    if (c >= hn) break;
    if (c + 1 < hn && heapF[c + 1] < heapF[c]) c++;
    if (heapF[c] >= lf) break;
    heapK[i] = heapK[c]; heapF[i] = heapF[c]; i = c;
  }
  heapK[i] = lk; heapF[i] = lf;
  return top;
}
const DX = [1, -1, 0, 0, 1, 1, -1, -1], DY = [0, 0, 1, -1, 1, -1, 1, -1], CUSTO = [1, 1, 1, 1, 1.4142, 1.4142, 1.4142, 1.4142];

function visao(m, a, b) {
  let x0 = a % NW, y0 = (a / NW) | 0;
  const x1 = b % NW, y1 = (b / NW) | 0;
  const dx = Math.abs(x1 - x0), dy = Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;
  while (true) {
    if (!m[y0 * NW + x0]) return false;
    if (x0 === x1 && y0 === y1) return true;
    const e2 = err * 2;
    if (e2 > -dy && e2 < dx) {
      // passo diagonal: as duas vizinhas precisam estar livres
      if (!m[y0 * NW + x0 + sx] || !m[(y0 + sy) * NW + x0]) return false;
    }
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
}

// devolve lista de pontos [{x,z}] ou null
export function acharCaminho(modo, x0, z0, x1, z1, limite = 70000) {
  const m = mapas[modo];
  const cl = (v, n) => Math.max(0, Math.min(n - 1, v));
  let s = pertoLivre(m, cl(Math.floor(z0 / NCEL), NH) * NW + cl(Math.floor(x0 / NCEL), NW), 12);
  let e = pertoLivre(m, cl(Math.floor(z1 / NCEL), NH) * NW + cl(Math.floor(x1 / NCEL), NW), 40);
  if (s < 0 || e < 0) return null;
  if (s === e) return [{ x: x1, z: z1 }];
  geracao++;
  hn = 0;
  const ex = e % NW, ey = (e / NW) | 0;
  const h = (k) => { const dx = Math.abs(k % NW - ex), dy = Math.abs(((k / NW) | 0) - ey); return (dx + dy + (1.4142 - 2) * Math.min(dx, dy)) * 1.25; };
  g[s] = 0; marca[s] = geracao; veio[s] = -1;
  push(s, h(s));
  let melhor = s, melhorH = h(s), n = 0, achou = false;
  while (hn > 0 && n < limite) {
    const k = pop();
    if (fechado[k] === geracao) continue;
    fechado[k] = geracao;
    n++;
    if (k === e) { achou = true; break; }
    const hk = h(k);
    if (hk < melhorH) { melhorH = hk; melhor = k; }
    const kx = k % NW, ky = (k / NW) | 0;
    for (let d = 0; d < 8; d++) {
      const nx = kx + DX[d], ny = ky + DY[d];
      if (nx < 0 || ny < 0 || nx >= NW || ny >= NH) continue;
      const nk = ny * NW + nx;
      if (!m[nk] || fechado[nk] === geracao) continue;
      if (d >= 4 && (!m[ky * NW + nx] || !m[ny * NW + kx])) continue;
      const ng = g[k] + CUSTO[d];
      if (marca[nk] !== geracao || ng < g[nk]) {
        marca[nk] = geracao; g[nk] = ng; veio[nk] = k;
        push(nk, ng + h(nk));
      }
    }
  }
  let fim = achou ? e : melhor;
  const cel = [];
  for (let k = fim; k !== -1; k = veio[k]) cel.push(k);
  cel.reverse();
  // suaviza (puxa a corda)
  const lisa = [cel[0]];
  let i = 0;
  while (i < cel.length - 1) {
    let j = Math.min(cel.length - 1, i + 60);
    while (j > i + 1 && !visao(m, cel[i], cel[j])) j--;
    lisa.push(cel[j]);
    i = j;
  }
  const pts = lisa.slice(1).map((k) => ({ x: (k % NW + 0.5) * NCEL, z: (((k / NW) | 0) + 0.5) * NCEL }));
  if (achou) pts.push({ x: x1, z: z1 });
  return pts.length ? pts : [{ x: x1, z: z1 }];
}
