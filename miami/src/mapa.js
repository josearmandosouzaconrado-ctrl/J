// Mapa real de Miami: grade de terreno, prédios em 3D, água, satélite e palmeiras
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { META, GRADE_RLE, PREDIOS, COSTA } from './dados_mapa.js';
export { META, COSTA };

export const MPP = META.mpp;                 // metros por pixel (z17)
export const CEL = META.cel * MPP;           // tamanho da célula da grade (m)
export const GW = META.gw, GH = META.gh;
export const LARG = GW * CEL, ALT = GH * CEL; // tamanho do mapa em metros
export const T = { AGUA: 0, CHAO: 1, RUA: 2, PARQUE: 3, AREIA: 4, PREDIO: 5, PONTE: 6, CENTRO: 7, FLORESTA: 8, CAMPO: 9 };
export const RURAL = !!META.rural;
export const ehRua = (t) => t === 2 || t === 7;
// qualidade gráfica (0 baixa, 1 média, 2 alta), definida antes de construir o mundo
export let QUAL = 1;
export function definirQualidade(q) { QUAL = q; }

function b64(s) {
  const bin = atob(s), u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}

// ---------------- grade ----------------
export const grade = new Uint8Array(GW * GH);
{
  const r = b64(GRADE_RLE);
  let p = 0;
  for (let i = 0; i < r.length; i += 2) { grade.fill(r[i], p, p + r[i + 1]); p += r[i + 1]; }
}
export const predioId = new Int32Array(GW * GH).fill(-1);

export function cel(x, z) {
  const cx = Math.floor(x / CEL), cz = Math.floor(z / CEL);
  if (cx < 0 || cz < 0 || cx >= GW || cz >= GH) return -1;
  return cz * GW + cx;
}
export function tipo(x, z) { const c = cel(x, z); return c < 0 ? (COSTA ? T.AGUA : T.CHAO) : grade[c]; }
export function andavel(x, z) {
  const c = cel(x, z);
  if (c < 0) return false;
  const t = grade[c];
  return t !== T.AGUA && predioId[c] < 0;
}
export function agua(x, z) { const c = cel(x, z); return c < 0 ? COSTA : grade[c] === T.AGUA || grade[c] === T.PONTE; }
export function predioEm(x, z) { const c = cel(x, z); return c < 0 ? null : (predioId[c] >= 0 ? predios[predioId[c]] : null); }

export const lugares = {};
for (const k in META.lugares) {
  const [nome, px, py] = META.lugares[k];
  lugares[k] = { nome, x: px * MPP, z: py * MPP };
}

// ---------------- prédios ----------------
export const predios = [];
{
  const u8 = b64(PREDIOS);
  const a = new Uint16Array(u8.buffer, u8.byteOffset, u8.byteLength / 2);
  let i = 0;
  while (i < a.length) {
    const n = a[i], h = a[i + 1] / 4;
    const pts = new Float32Array(n * 2);
    for (let k = 0; k < n; k++) { pts[k * 2] = a[i + 2 + k * 2] / 2 * MPP; pts[k * 2 + 1] = a[i + 3 + k * 2] / 2 * MPP; }
    i += 2 + n * 2;
    // garante orientação (área com sinal negativa) para as paredes ficarem para fora
    let s = 0;
    for (let k = 0; k < n; k++) { const j = (k + 1) % n; s += pts[k * 2] * pts[j * 2 + 1] - pts[j * 2] * pts[k * 2 + 1]; }
    if (s > 0) {
      for (let k = 0; k < n / 2; k++) {
        const j = n - 1 - k;
        let t = pts[k * 2]; pts[k * 2] = pts[j * 2]; pts[j * 2] = t;
        t = pts[k * 2 + 1]; pts[k * 2 + 1] = pts[j * 2 + 1]; pts[j * 2 + 1] = t;
      }
    }
    const area = Math.abs(s) / 2;
    let cx = 0, cz = 0, x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (let k = 0; k < n; k++) {
      const x = pts[k * 2], z = pts[k * 2 + 1];
      cx += x; cz += z;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (z < z0) z0 = z; if (z > z1) z1 = z;
    }
    cx /= n; cz /= n;
    predios.push({
      id: predios.length, pts, h, area, cx, cz, x0, x1, z0, z1,
      raio: Math.max(x1 - x0, z1 - z0) / 2,
      cap: Math.max(4, Math.min(24, Math.round(area / 50) + Math.floor(h / 10))),
      guarnicao: [], civis: 0, sos: false, integridade: 100, removido: false,
    });
  }
}

export function dentroPoligono(p, x, z) {
  const pts = p.pts, n = pts.length / 2;
  let dentro = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = pts[i * 2], zi = pts[i * 2 + 1], xj = pts[j * 2], zj = pts[j * 2 + 1];
    if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) dentro = !dentro;
  }
  return dentro;
}

// pinta os prédios na grade (para colisão e para tocar num prédio)
export function rasterizarPredios() {
  predioId.fill(-1);
  for (const p of predios) {
    if (p.removido) continue;
    const cz0 = Math.max(0, Math.floor(p.z0 / CEL)), cz1 = Math.min(GH - 1, Math.floor(p.z1 / CEL));
    const cx0 = Math.max(0, Math.floor(p.x0 / CEL)), cx1 = Math.min(GW - 1, Math.floor(p.x1 / CEL));
    let marcou = false;
    for (let cz = cz0; cz <= cz1; cz++) {
      const z = (cz + 0.5) * CEL;
      for (let cx = cx0; cx <= cx1; cx++) {
        if (dentroPoligono(p, (cx + 0.5) * CEL, z)) { predioId[cz * GW + cx] = p.id; marcou = true; }
      }
    }
    if (!marcou) { const c = cel(p.cx, p.cz); if (c >= 0) predioId[c] = p.id; }
  }
  // células "prédio" do mapa sem polígono viram chão
  for (let i = 0; i < grade.length; i++) if (grade[i] === T.PREDIO && predioId[i] < 0) grade[i] = T.CHAO;
}

export function removerPrediosEm(x, z, r) {
  for (const p of predios) if (!p.removido && Math.hypot(p.cx - x, p.cz - z) < r + p.raio * 0.3) p.removido = true;
}

// ---------------- texturas das fachadas (desenhadas, sem fotos) ----------------
// cada textura cobre 4 janelas x 4 andares; a versão "acesa" vira luz das janelas à noite
const BAIA = 3.6, ANDAR = 3.4, REP = 4;
function semente(n) { let s = n >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

function texFachada(estilo) {
  const N = 256, c = document.createElement('canvas'), e = document.createElement('canvas');
  c.width = c.height = e.width = e.height = N;
  const g = c.getContext('2d'), ge = e.getContext('2d');
  const r = semente(estilo === 'vidro' ? 7 : estilo === 'concreto' ? 11 : 23);
  ge.fillStyle = '#000'; ge.fillRect(0, 0, N, N);
  const B = N / REP;
  if (estilo === 'vidro') {
    // pele de vidro: painéis refletindo o céu, montantes finos e faixas de laje
    for (let j = 0; j < REP; j++) for (let i = 0; i < REP; i++) {
      const x = i * B, y = j * B;
      const gr = g.createLinearGradient(x, y, x + B, y + B);
      const k = 0.85 + r() * 0.25;
      gr.addColorStop(0, `rgb(${150 * k | 0},${178 * k | 0},${200 * k | 0})`);
      gr.addColorStop(1, `rgb(${92 * k | 0},${118 * k | 0},${142 * k | 0})`);
      g.fillStyle = gr; g.fillRect(x, y, B, B);
      g.fillStyle = 'rgba(255,255,255,0.18)'; g.fillRect(x + B * 0.12, y + 4, B * 0.18, B - 10);
      if (r() < 0.35) { ge.fillStyle = `rgb(255,${220 + r() * 30 | 0},${150 + r() * 60 | 0})`; ge.fillRect(x + 3, y + 6, B - 6, B - 12); }
    }
    g.fillStyle = '#d7dde2';
    for (let j = 0; j <= REP; j++) g.fillRect(0, j * B - 3, N, 6);
    g.fillStyle = '#aeb8c0';
    for (let i = 0; i <= REP * 2; i++) g.fillRect(i * B / 2 - 1, 0, 2, N);
  } else if (estilo === 'concreto') {
    g.fillStyle = '#f2f0ec'; g.fillRect(0, 0, N, N);
    for (let k = 0; k < 1400; k++) { g.fillStyle = `rgba(0,0,0,${r() * 0.05})`; g.fillRect(r() * N, r() * N, 2, 2); }
    for (let j = 0; j < REP; j++) for (let i = 0; i < REP; i++) {
      const x = i * B, y = j * B;
      g.fillStyle = '#d9d6d0'; g.fillRect(x + 6, y + B * 0.72, B - 12, 4);           // peitoril
      g.fillStyle = '#3c4a57'; g.fillRect(x + 9, y + B * 0.2, B - 18, B * 0.52);      // vidro
      g.fillStyle = 'rgba(160,190,215,0.55)'; g.fillRect(x + 9, y + B * 0.2, (B - 18) * 0.45, B * 0.52);
      if (r() < 0.3) { g.fillStyle = '#e8e2d2'; g.fillRect(x + 9, y + B * 0.2, B - 18, B * 0.52 * r()); } // persiana
      g.fillStyle = '#9aa0a6'; g.fillRect(x + B / 2 - 1, y + B * 0.2, 2, B * 0.52);
      if (r() < 0.4) { ge.fillStyle = `rgb(255,${200 + r() * 40 | 0},${120 + r() * 60 | 0})`; ge.fillRect(x + 9, y + B * 0.2, B - 18, B * 0.52); }
    }
    g.fillStyle = 'rgba(0,0,0,0.12)';
    for (let j = 0; j < REP; j++) g.fillRect(0, j * B + B - 3, N, 3);
  } else {
    // art déco de Miami Beach: parede pastel, janelas menores e "sobrancelhas" de concreto
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, N, N);
    for (let k = 0; k < 900; k++) { g.fillStyle = `rgba(0,0,0,${r() * 0.04})`; g.fillRect(r() * N, r() * N, 2, 2); }
    for (let j = 0; j < REP; j++) for (let i = 0; i < REP; i++) {
      const x = i * B, y = j * B;
      g.fillStyle = 'rgba(0,0,0,0.25)'; g.fillRect(x + 8, y + B * 0.22 + 4, B - 16, 5);
      g.fillStyle = '#fafafa'; g.fillRect(x + 6, y + B * 0.2, B - 12, 5);              // sobrancelha
      g.fillStyle = '#2f4a5a'; g.fillRect(x + 14, y + B * 0.3, B - 28, B * 0.42);
      g.fillStyle = 'rgba(170,210,230,0.5)'; g.fillRect(x + 14, y + B * 0.3, (B - 28) * 0.4, B * 0.42);
      g.fillStyle = '#ffffff'; g.fillRect(x + B / 2 - 1.5, y + B * 0.3, 3, B * 0.42);
      if (r() < 0.45) { ge.fillStyle = `rgb(255,${190 + r() * 50 | 0},${110 + r() * 60 | 0})`; ge.fillRect(x + 14, y + B * 0.3, B - 28, B * 0.42); }
    }
    g.fillStyle = 'rgba(0,0,0,0.08)'; g.fillRect(0, N - 8, N, 8);
  }
  const t = new THREE.CanvasTexture(c), te = new THREE.CanvasTexture(e);
  for (const x of [t, te]) { x.wrapS = x.wrapT = THREE.RepeatWrapping; x.anisotropy = 8; x.colorSpace = THREE.SRGBColorSpace; }
  return { t, te };
}

function texTelhado() {
  const N = 128, c = document.createElement('canvas');
  c.width = c.height = N;
  const g = c.getContext('2d');
  const r = semente(5);
  g.fillStyle = '#8f8c86'; g.fillRect(0, 0, N, N);
  for (let k = 0; k < 2600; k++) { const v = 100 + r() * 90 | 0; g.fillStyle = `rgb(${v},${v - 2},${v - 6})`; g.fillRect(r() * N, r() * N, 1 + r() * 2, 1 + r() * 2); }
  g.strokeStyle = 'rgba(60,60,60,0.25)'; g.lineWidth = 1;
  for (let i = 0; i <= 4; i++) { g.beginPath(); g.moveTo(i * 32, 0); g.lineTo(i * 32, N); g.stroke(); }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texTelha() {
  // telha cerâmica: fileiras com sombra embaixo de cada fiada
  const N = 128, c = document.createElement('canvas');
  c.width = c.height = N;
  const g = c.getContext('2d');
  const r = semente(31);
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, N, N);
  for (let y = 0; y < N; y += 16) {
    for (let x = (y / 16) % 2 ? -8 : 0; x < N; x += 16) {
      const v = 210 + r() * 45 | 0;
      g.fillStyle = `rgb(${v},${v},${v})`;
      g.beginPath(); g.ellipse(x + 8, y + 9, 8, 9, 0, 0, Math.PI); g.fill();
      g.fillRect(x, y, 16, 9);
    }
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(0, y + 14, N, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 8; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function texTijolo() {
  // parede de tijolo com janelas de moldura branca (4 x 4 como as outras fachadas)
  const N = 256, c = document.createElement('canvas'), e = document.createElement('canvas');
  c.width = c.height = e.width = e.height = N;
  const g = c.getContext('2d'), ge = e.getContext('2d');
  const r = semente(41);
  ge.fillStyle = '#000'; ge.fillRect(0, 0, N, N);
  g.fillStyle = '#c9c4bc'; g.fillRect(0, 0, N, N);
  for (let y = 0; y < N; y += 6) {
    for (let x = (y / 6) % 2 ? -6 : 0; x < N; x += 12) {
      const v = 0.85 + r() * 0.3;
      g.fillStyle = `rgb(${255 * v | 0},${230 * v | 0},${220 * v | 0})`;
      g.fillRect(x + 1, y + 1, 10, 4);
    }
  }
  const B = N / REP;
  for (let j = 0; j < REP; j++) for (let i = 0; i < REP; i++) {
    const x = i * B, y = j * B;
    g.fillStyle = '#efece6'; g.fillRect(x + 12, y + B * 0.18, B - 24, B * 0.6);
    g.fillStyle = '#2e3a44'; g.fillRect(x + 15, y + B * 0.21, B - 30, B * 0.54);
    g.fillStyle = 'rgba(150,180,205,0.5)'; g.fillRect(x + 15, y + B * 0.21, (B - 30) * 0.45, B * 0.54);
    g.fillStyle = '#efece6'; g.fillRect(x + B / 2 - 1, y + B * 0.21, 2, B * 0.54); g.fillRect(x + 15, y + B * 0.47, B - 30, 2);
    g.fillStyle = '#e4ded4'; g.fillRect(x + 10, y + B * 0.78, B - 20, 4);
    if (r() < 0.4) { ge.fillStyle = `rgb(255,${200 + r() * 40 | 0},${120 + r() * 50 | 0})`; ge.fillRect(x + 15, y + B * 0.21, B - 30, B * 0.54); }
  }
  const t = new THREE.CanvasTexture(c), te = new THREE.CanvasTexture(e);
  for (const x of [t, te]) { x.wrapS = x.wrapT = THREE.RepeatWrapping; x.anisotropy = 8; x.colorSpace = THREE.SRGBColorSpace; }
  return { t, te };
}

const TIJOLOS = [0xd88a6c, 0xe39a7a, 0xcf8266, 0xeab08e, 0xf0e2c8, 0xc77a62];
const TELHAS = [0xb5502e, 0xa8462a, 0xc0603a, 0x9c4a30, 0x6a6f74, 0x4f5a62];
const PASTEIS = [0xf7c7cc, 0xbfe8dc, 0xf7e7a6, 0xbfdcf2, 0xf6f2ea, 0xf9d7b2, 0xdccbf0, 0xffffff, 0xc9f0e6, 0xffd0dc];
const VIDROS = [0xe6f0f7, 0xd2e4ef, 0xd9ebe8, 0xe9e9f2, 0xf2f2f2, 0xc8dbe8, 0xdfe9df];
const CONCRETO = [0xf0ebe2, 0xe3ddd2, 0xf7f4ee, 0xd8d1c5, 0xece4d8, 0xe9e0cf];
export const MAT_PREDIOS = {};

export function construirPredios(cena) {
  const estilos = ['vidro', 'concreto', 'deco'];
  for (const e of estilos) {
    const { t, te } = texFachada(e);
    MAT_PREDIOS[e] = new THREE.MeshLambertMaterial({ vertexColors: true, map: t, emissiveMap: te, emissive: 0xffffff, emissiveIntensity: 0 });
  }
  MAT_PREDIOS.telhado = new THREE.MeshLambertMaterial({ vertexColors: true, map: texTelhado() });
  MAT_PREDIOS.telha = new THREE.MeshLambertMaterial({ vertexColors: true, map: texTelha() });
  { const { t, te } = texTijolo(); MAT_PREDIOS.tijolo = new THREE.MeshLambertMaterial({ vertexColors: true, map: t, emissiveMap: te, emissive: 0xffffff, emissiveIntensity: 0 }); }
  const TAM = 700;
  const grupos = new Map();
  const pega = (k) => { let ch = grupos.get(k); if (!ch) { ch = { pos: [], nor: [], col: [], uv: [] }; grupos.set(k, ch); } return ch; };
  const cor = new THREE.Color();
  const quad = (ch, ax, az, bx, bz, y0, y1, nx, nz, u0, u1, cr, cg, cb, sv) => {
    ch.pos.push(ax, y0, az, bx, y0, bz, bx, y1, bz, ax, y0, az, bx, y1, bz, ax, y1, az);
    for (let k = 0; k < 6; k++) { ch.nor.push(nx, 0, nz); ch.col.push(cr, cg, cb); }
    const v0 = y0 / sv, v1 = y1 / sv;
    ch.uv.push(u0, v0, u1, v0, u1, v1, u0, v0, u1, v1, u0, v1);
  };
  const caixa = (ch, cx, cz, w, d, y0, h, c) => {
    // caixinha no telhado (ar-condicionado, casa de máquinas)
    const x0 = cx - w / 2, x1 = cx + w / 2, z0 = cz - d / 2, z1 = cz + d / 2, y1 = y0 + h;
    const lados = [[x0, z1, x1, z1, 0, 1], [x1, z1, x1, z0, 1, 0], [x1, z0, x0, z0, 0, -1], [x0, z0, x0, z1, -1, 0]];
    for (const [ax, az, bx, bz, nx, nz] of lados) quad(ch, ax, az, bx, bz, y0, y1, nx, nz, 0, 0.3, c, c, c * 0.98, 6);
    ch.pos.push(x0, y1, z0, x0, y1, z1, x1, y1, z1, x0, y1, z0, x1, y1, z1, x1, y1, z0);
    for (let k = 0; k < 6; k++) { ch.nor.push(0, 1, 0); ch.col.push(c * 1.05, c * 1.05, c * 1.03); }
    ch.uv.push(0, 0, 0, 0.2, 0.2, 0.2, 0, 0, 0.2, 0.2, 0.2, 0);
  };
  for (const p of predios) {
    if (p.removido) continue;
    const base = Math.floor(p.cx / TAM) + ',' + Math.floor(p.cz / TAM);
    const n = p.pts.length / 2, h = p.h, pts = p.pts;
    const sem = (p.id * 2654435761) >>> 0;
    // casa: base quase retangular e baixa -> telhado de telha de duas águas
    let casa = null;
    if (h < 11 && n >= 4 && n <= 6 && p.area < 900) {
      const xs = [], zs = [];
      // eixo principal = maior lado
      let mi = 0, ml = 0;
      for (let i = 0; i < n; i++) { const j = (i + 1) % n, l = Math.hypot(pts[j * 2] - pts[i * 2], pts[j * 2 + 1] - pts[i * 2 + 1]); if (l > ml) { ml = l; mi = i; } }
      const j0 = (mi + 1) % n;
      const ux = (pts[j0 * 2] - pts[mi * 2]) / ml, uz = (pts[j0 * 2 + 1] - pts[mi * 2 + 1]) / ml;
      let a0 = 1e9, a1 = -1e9, b0 = 1e9, b1 = -1e9;
      for (let i = 0; i < n; i++) {
        const dx = pts[i * 2] - p.cx, dz = pts[i * 2 + 1] - p.cz, a = dx * ux + dz * uz, b = -dx * uz + dz * ux;
        a0 = Math.min(a0, a); a1 = Math.max(a1, a); b0 = Math.min(b0, b); b1 = Math.max(b1, b);
      }
      const retang = (a1 - a0) * (b1 - b0);
      if (p.area / retang > 0.82 && b1 - b0 > 4) casa = { ux, uz, a0, a1, b0, b1 };
    }
    const estilo = h > 45 ? 'vidro' : h > 14 ? (sem % 3 === 0 && h < 30 ? 'tijolo' : 'concreto') : (casa && sem % 2 === 0 ? 'tijolo' : 'deco');
    const lista = estilo === 'vidro' ? VIDROS : estilo === 'concreto' ? CONCRETO : estilo === 'tijolo' ? TIJOLOS : PASTEIS;
    cor.setHex(lista[sem % lista.length]);
    p.cor = cor.getHex();
    const W = pega(base + ',' + estilo), R = pega(base + ',telhado');
    const parapeito = h > 6 && !casa && QUAL >= 1 ? 1.1 : 0;
    let along = (sem % 7) * BAIA;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const ax = pts[i * 2], az = pts[i * 2 + 1], bx = pts[j * 2], bz = pts[j * 2 + 1];
      const ex = bx - ax, ez = bz - az, len = Math.hypot(ex, ez) || 1;
      const nx = -ez / len, nz = ex / len;
      // arredonda o número de janelas para não cortar no meio
      const nb = Math.max(1, Math.round(len / BAIA));
      const u0 = along / (BAIA * REP), u1 = (along + nb * BAIA) / (BAIA * REP);
      along += nb * BAIA;
      // térreo um pouco mais escuro (lojas/portaria)
      if (QUAL === 0) quad(W, ax, az, bx, bz, 0, h, nx, nz, u0, u1, cor.r, cor.g, cor.b, ANDAR * REP);
      else {
        const terreo = Math.min(h, 4);
        quad(W, ax, az, bx, bz, 0, terreo, nx, nz, u0, u1, cor.r * 0.8, cor.g * 0.8, cor.b * 0.82, ANDAR * REP);
        if (h > terreo) quad(W, ax, az, bx, bz, terreo, h, nx, nz, u0, u1, cor.r, cor.g, cor.b, ANDAR * REP);
      }
      if (parapeito) {
        // mureta do telhado (lado de fora e de dentro)
        const c2 = 0.92;
        quad(R, ax, az, bx, bz, h, h + parapeito, nx, nz, u0 * 3, u1 * 3, cor.r * c2, cor.g * c2, cor.b * c2, 8);
        quad(R, bx, bz, ax, az, h, h + parapeito, -nx, -nz, u0 * 3, u1 * 3, cor.r * 0.7, cor.g * 0.7, cor.b * 0.7, 8);
      }
    }
    if (casa) {
      // telhado de duas águas com beiral, cumeeira ao longo do eixo maior
      const T2 = pega(base + ',telha');
      const { ux, uz } = casa, bei = 0.5;
      const a0 = casa.a0 - bei, a1 = casa.a1 + bei, b0 = casa.b0 - bei, b1 = casa.b1 + bei;
      const alt = Math.min(4, (b1 - b0) * 0.38), bm = (b0 + b1) / 2;
      const P = (a, b, y) => [p.cx + a * ux - b * uz, y, p.cz + a * uz + b * ux];
      const tc = new THREE.Color(TELHAS[(sem >> 4) % TELHAS.length]);
      const tri = (A, Bv, Cv, cr, uvs) => {
        // normal do triângulo
        const e1 = [Bv[0] - A[0], Bv[1] - A[1], Bv[2] - A[2]], e2 = [Cv[0] - A[0], Cv[1] - A[1], Cv[2] - A[2]];
        let nx = e1[1] * e2[2] - e1[2] * e2[1], ny = e1[2] * e2[0] - e1[0] * e2[2], nz = e1[0] * e2[1] - e1[1] * e2[0];
        if (ny < 0) { const t = Bv; Bv = Cv; Cv = t; nx = -nx; ny = -ny; nz = -nz; const u = uvs[1]; uvs[1] = uvs[2]; uvs[2] = u; }
        const L = Math.hypot(nx, ny, nz) || 1;
        for (const [v, uv] of [[A, uvs[0]], [Bv, uvs[1]], [Cv, uvs[2]]]) { T2.pos.push(...v); T2.nor.push(nx / L, ny / L, nz / L); T2.col.push(cr[0], cr[1], cr[2]); T2.uv.push(uv[0], uv[1]); }
      };
      const lado = [tc.r, tc.g, tc.b];
      const ka = 1 / 2.2, kb = Math.hypot(alt, (b1 - b0) / 2) / 2.2;
      for (const [bb, s2] of [[b0, 1], [b1, -1]]) {
        const A = P(a0, bb, h), Bv = P(a1, bb, h), C2 = P(a1, bm, h + alt), D = P(a0, bm, h + alt);
        tri(A, Bv, C2, lado, [[0, 0], [(a1 - a0) * ka, 0], [(a1 - a0) * ka, kb]]);
        tri(A, C2, D, lado, [[0, 0], [(a1 - a0) * ka, kb], [0, kb]]);
      }
      // oitões (paredes triangulares nas pontas)
      for (const aa of [casa.a0, casa.a1]) {
        const A = P(aa, casa.b0, h), Bv = P(aa, casa.b1, h), C2 = P(aa, bm, h + alt * 0.95);
        const sx = aa === casa.a0 ? -1 : 1;
        const nx = ux * sx, nz = uz * sx;
        for (const v of [A, Bv, C2]) { W.pos.push(...v); W.nor.push(nx, 0, nz); W.col.push(cor.r, cor.g, cor.b); W.uv.push(0.02, 0.02); }
        for (const v of [A, C2, Bv]) { W.pos.push(...v); W.nor.push(nx, 0, nz); W.col.push(cor.r, cor.g, cor.b); W.uv.push(0.02, 0.02); }
      }
      continue;
    }
    // telhado
    const cont = [];
    for (let i = 0; i < n; i++) cont.push(new THREE.Vector2(pts[i * 2], pts[i * 2 + 1]));
    let tris;
    try { tris = THREE.ShapeUtils.triangulateShape(cont, []); } catch (e) { tris = []; }
    const tom = 0.85 + ((sem >> 8) % 20) / 100;
    for (const t of tris) {
      let [a, b, c] = t;
      const cross = (cont[b].x - cont[a].x) * (cont[c].y - cont[a].y) - (cont[b].y - cont[a].y) * (cont[c].x - cont[a].x);
      if (cross > 0) { const tmp = b; b = c; c = tmp; }
      for (const k of [a, b, c]) {
        R.pos.push(cont[k].x, h, cont[k].y);
        R.nor.push(0, 1, 0); R.col.push(tom, tom, tom * 0.98); R.uv.push(cont[k].x / 8, cont[k].y / 8);
      }
    }
    // equipamentos no telhado
    if (QUAL >= 1 && h > 8 && p.area > 150) {
      const nq = 1 + (sem % 3) + (h > 40 ? 2 : 0);
      for (let q = 0; q < nq; q++) {
        const ang = ((sem >> (q * 3)) % 628) / 100, dd = p.raio * 0.25 * ((q % 3) / 2);
        const cx = p.cx + Math.sin(ang) * dd, cz = p.cz + Math.cos(ang) * dd;
        if (!dentroPoligono(p, cx, cz)) continue;
        const big = h > 40 && q === 0;
        caixa(R, cx, cz, big ? 8 : 2.2 + (q % 2), big ? 8 : 1.6 + (q % 2), h, big ? 4 : 1.4, big ? 0.8 : 0.72);
      }
    }
  }
  const malhas = [];
  for (const [k, ch] of grupos) {
    const est = k.split(',')[2];
    const [kx, kz] = k.split(',').map(Number);
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(ch.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(ch.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(ch.col, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(ch.uv, 2));
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, MAT_PREDIOS[est]);
    m.matrixAutoUpdate = false;
    m.updateMatrix();
    m.castShadow = QUAL >= 1; m.receiveShadow = QUAL >= 1;
    m.userData.cx = (kx + 0.5) * TAM; m.userData.cz = (kz + 0.5) * TAM;
    m.name = 'predios';
    cena.add(m);
    malhas.push(m);
  }
  return malhas;
}

// ---------------- chão desenhado (asfalto, calçada, grama, areia) ----------------
const CORES_T = [[44, 104, 140], [205, 200, 188], [86, 88, 94], [96, 146, 70], [232, 214, 164], [170, 168, 160], [110, 110, 114], [86, 88, 94], [52, 82, 38], [176, 168, 112]];
export function canvasTerreno(escala = 1) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(GW / escala); c.height = Math.ceil(GH / escala);
  const g = c.getContext('2d');
  const img = g.createImageData(c.width, c.height);
  const d = img.data;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = Math.min(GH - 1, y * escala) * GW + Math.min(GW - 1, x * escala);
      const t = predioId[i] >= 0 ? 5 : grade[i];
      const cc = CORES_T[t];
      const o = (y * c.width + x) * 4;
      d[o] = cc[0]; d[o + 1] = cc[1]; d[o + 2] = cc[2]; d[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

// marcas da rua calculadas da grade: faixas de pedestre nos cruzamentos
function gerarMarcas() {
  const N = GW * GH;
  const rua = new Uint8Array(N);
  for (let i = 0; i < N; i++) rua[i] = ehRua(grade[i]) && predioId[i] < 0 ? 1 : 0;
  const runH = new Uint16Array(N), runV = new Uint16Array(N);
  for (let y = 0; y < GH; y++) {
    let x = 0;
    while (x < GW) {
      if (!rua[y * GW + x]) { x++; continue; }
      let e = x; while (e < GW && rua[y * GW + e]) e++;
      for (let k = x; k < e; k++) runH[y * GW + k] = e - x;
      x = e;
    }
  }
  for (let x = 0; x < GW; x++) {
    let y = 0;
    while (y < GH) {
      if (!rua[y * GW + x]) { y++; continue; }
      let e = y; while (e < GH && rua[e * GW + x]) e++;
      for (let k = y; k < e; k++) runV[k * GW + x] = e - y;
      y = e;
    }
  }
  const L = 8;
  const junc = (k) => runH[k] >= L && runV[k] >= L;
  const m = new Uint8Array(N * 4);
  for (let y = 3; y < GH - 3; y++) {
    for (let x = 3; x < GW - 3; x++) {
      const k = y * GW + x;
      if (!rua[k] || junc(k)) continue;
      // braço norte-sul encostado no cruzamento: listras variam em x
      let tipo = -1;
      if (runV[k] >= L && runH[k] < L && runH[k] >= 3 && (junc(k - GW) || junc(k + GW))) tipo = 0;
      else if (runH[k] >= L && runV[k] < L && runV[k] >= 3 && (junc(k - 1) || junc(k + 1))) tipo = 1;
      if (tipo < 0) continue;
      // só em ruas da cidade (com prédios por perto)
      let perto = false;
      for (let dy = -6; dy <= 6 && !perto; dy += 3) for (let dx = -6; dx <= 6; dx += 3) { const q = k + dy * GW + dx; if (q >= 0 && q < N && predioId[q] >= 0) { perto = true; break; } }
      if (perto) m[k * 4 + tipo] = 255;
    }
  }
  // linha central reta: só em trechos longos e retos de células "centro", longe dos cruzamentos
  const cen = (k) => grade[k] === T.CENTRO;
  for (let y = 2; y < GH - 2; y++) {
    for (let x = 2; x < GW - 2; x++) {
      const k = y * GW + x;
      if (!cen(k) || junc(k) || m[k * 4] || m[k * 4 + 1]) continue;
      let h = 0, v = 0, h0 = 0, v0 = 0;
      for (let d = -3; d <= 3; d++) {
        if (cen(k + d) || cen(k + d - GW) || cen(k + d + GW)) h++;
        if (cen(k + d * GW) || cen(k + d * GW - 1) || cen(k + d * GW + 1)) v++;
        if (cen(k + d)) h0++;
        if (cen(k + d * GW)) v0++;
      }
      // uma linha só, mesmo quando a faixa do mapa ocupa duas fileiras
      if (h >= 6 && v0 <= 3 && h0 >= v0 && !m[(k - GW) * 4 + 2]) m[k * 4 + 2] = 255;
      else if (v >= 6 && h0 <= 3 && v0 > h0 && !m[(k - 1) * 4 + 3]) m[k * 4 + 3] = 255;
    }
  }
  return m;
}

export function construirChao(cena) {
  // máscaras por tipo de terreno: R rua/ponte, G grama, B areia (ou linha central na rua), A prédio
  const m = new Uint8Array(GW * GH * 4);
  for (let i = 0; i < GW * GH; i++) {
    const t = grade[i], o = i * 4;
    m[o] = t === T.RUA || t === T.PONTE || t === T.CENTRO ? 255 : 0;
    m[o + 1] = t === T.PARQUE ? 255 : 0;
    m[o + 2] = t === T.AREIA || t === T.CENTRO ? 255 : 0;
    m[o + 3] = predioId[i] >= 0 ? 255 : 0;
  }
  const tex = new THREE.DataTexture(m, GW, GH, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  const t2d = new Uint8Array(GW * GH * 4);
  for (let i = 0; i < GW * GH; i++) { t2d[i * 4] = grade[i] === T.FLORESTA ? 255 : 0; t2d[i * 4 + 1] = grade[i] === T.CAMPO ? 255 : 0; }
  const t2 = new THREE.DataTexture(t2d, GW, GH, THREE.RGBAFormat, THREE.UnsignedByteType);
  t2.magFilter = THREE.LinearFilter; t2.minFilter = THREE.LinearFilter; t2.needsUpdate = true;
  const tm = new THREE.DataTexture(gerarMarcas(), GW, GH, THREE.RGBAFormat, THREE.UnsignedByteType);
  tm.magFilter = THREE.NearestFilter; tm.minFilter = THREE.NearestFilter;
  tm.needsUpdate = true;
  // material com luz e sombra do three.js; a cor de cada ponto é calculada no shader
  const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.mapa = { value: tex };
    sh.uniforms.marcas = { value: tm };
    sh.uniforms.terreno2 = { value: t2 };
    sh.uniforms.tam = { value: new THREE.Vector2(LARG, ALT) };
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vW;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
      uniform sampler2D mapa; uniform sampler2D marcas; uniform sampler2D terreno2; uniform vec2 tam; varying vec3 vW;
      ${QUAL === 0 ? `float ru(vec2 p){ return 0.5; }
      float fbm(vec2 p){ return 0.5; }` : `float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float ru(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1(i), h1(i+vec2(1,0)), u.x), mix(h1(i+vec2(0,1)), h1(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ return ru(p)*0.5 + ru(p*2.07)*0.3 + ru(p*4.13)*0.2; }`}`)
      .replace('#include <map_fragment>', `
      {
        vec2 uv = vW.xz / tam;
        vec4 m = texture2D(mapa, uv);
        vec4 mk = texture2D(marcas, uv);
        vec4 tr2 = texture2D(terreno2, uv);
        float vProf = length(vViewPosition);
        float det = 1.0 - smoothstep(250.0, 1400.0, vProf);
        vec2 p = vW.xz;
        float n1 = fbm(p * 0.18), n2 = ru(p * 3.1) * det, n3 = fbm(p * 0.012);
        float rua = smoothstep(0.42, 0.58, m.r), grama = smoothstep(0.35, 0.6, m.g), areia = smoothstep(0.35, 0.6, m.b) * (1.0 - smoothstep(0.2, 0.5, m.r));
        // calçada de placas de concreto com meio-fio
        vec2 q = abs(fract(p / 2.4) - 0.5);
        float junta = smoothstep(0.46, 0.5, max(q.x, q.y)) * det;
        vec3 calc = vec3(0.70, 0.68, 0.64) * (0.9 + 0.1 * n1 + 0.06 * n2) - junta * 0.07;
        float meioFio = (smoothstep(0.30, 0.36, m.r) - smoothstep(0.40, 0.46, m.r)) * det;
        calc = mix(calc, vec3(0.86, 0.85, 0.82), meioFio * 0.9);
        // asfalto
        vec3 asf = vec3(0.25, 0.255, 0.265) * (0.82 + 0.25 * n1 + 0.14 * n2);
        asf *= 1.0 - smoothstep(0.62, 0.75, ru(p * 0.6)) * 0.12 * det;
        float faixa = (smoothstep(0.60, 0.63, m.r) - smoothstep(0.66, 0.70, m.r)) * det;
        asf = mix(asf, vec3(0.86, 0.85, 0.80), faixa * 0.7);
        // faixa amarela dupla, reta, no centro da célula
        float cz = abs(abs(fract(p.y / ${CEL.toFixed(4)}) - 0.5) * ${CEL.toFixed(4)} - 0.16);
        float cx = abs(abs(fract(p.x / ${CEL.toFixed(4)}) - 0.5) * ${CEL.toFixed(4)} - 0.16);
        float amar = mk.b * (1.0 - smoothstep(0.06, 0.1, cz)) + mk.a * (1.0 - smoothstep(0.06, 0.1, cx));
        asf = mix(asf, vec3(0.95, 0.76, 0.18), amar * det * 0.9);
        // faixa de pedestre (zebra) nos cruzamentos
        float zx = step(0.5, fract(p.x / 1.1)), zz = step(0.5, fract(p.y / 1.1));
        float zebra = (mk.r * zx + mk.g * zz) * det;
        asf = mix(asf, vec3(0.9, 0.9, 0.87), zebra * 0.85);
        vec3 gr = mix(vec3(0.26, 0.36, 0.15), vec3(0.42, 0.50, 0.24), n1) * (0.85 + 0.3 * n2);
        vec3 ar = vec3(0.90, 0.80, 0.60) * (0.93 + 0.08 * n1 + 0.05 * n2);
        // estacionamentos com vagas pintadas e gramados entre os prédios
        float lote = fbm(p * 0.021 + 7.0), jard = fbm(p * 0.03 - 3.0);
        float ehLote = smoothstep(0.58, 0.68, lote);
        vec3 estac = vec3(0.30, 0.305, 0.31) * (0.9 + 0.2 * n2);
        float vz = fract(p.y / 15.0);
        float vaga = step(fract(p.x / 2.7), 0.05) * (step(0.12, vz) * step(vz, 0.44) + step(0.56, vz) * step(vz, 0.88)) * det;
        estac = mix(estac, vec3(0.88), vaga * 0.8);
        ${RURAL ? `// interior: gramado no lugar da calçada (a calçada fica só junto da rua) e sem estacionamentos aleatórios
        vec3 gramado = mix(vec3(0.34, 0.44, 0.2), vec3(0.42, 0.5, 0.24), n1) * (0.88 + 0.22 * n2);
        calc = mix(gramado, calc, smoothstep(0.06, 0.3, m.r));
        ehLote = 0.0;` : ''}
        vec3 c = mix(calc, estac, ehLote * 0.9);
        c = mix(c, gr * 0.95, smoothstep(0.6, 0.7, jard) * 0.85);
        ${RURAL ? `// no interior os parques são o pântano dos Everglades: capim-serra amarelado com poças
        vec3 serra = mix(vec3(0.5, 0.48, 0.27), vec3(0.4, 0.45, 0.22), n1) * (0.88 + 0.25 * n2);
        float poca = smoothstep(0.66, 0.7, fbm(p * 0.012 + 3.7)) * grama;
        gr = mix(serra, vec3(0.14, 0.26, 0.24) * (0.9 + 0.2 * n2), poca);` : ''}
        c = mix(c, gr, grama);
        // mata/floresta (chão escuro coberto de folhas) e fazendas (fileiras de plantação)
        float flor = smoothstep(0.35, 0.6, tr2.r), camp = smoothstep(0.35, 0.6, tr2.g);
        // copa fechada vista de cima: tufos verdes com sombra escura entre eles
        float copaN = fbm(p * 0.33) * 0.6 + fbm(p * 0.09 + 1.3) * 0.4;
        vec3 chaoMata = mix(vec3(0.05, 0.085, 0.035), vec3(0.17, 0.27, 0.09), smoothstep(0.38, 0.62, copaN)) * (0.85 + 0.35 * n2);
        vec2 lote2 = floor(p / 160.0);
        float hl = fract(sin(dot(lote2, vec2(12.9898, 78.233))) * 43758.5453);
        float eixo = hl > 0.5 ? p.x : p.y;
        float fileira = 0.5 + 0.5 * sin(eixo * 2.2);
        vec3 lavoura = hl > 0.8 ? vec3(0.5, 0.43, 0.3) * (0.92 + 0.12 * n1) : mix(vec3(0.44, 0.37, 0.24), vec3(0.32, 0.47, 0.18) * (0.8 + 0.4 * hl), smoothstep(0.35, 0.65, fileira) * det + (1.0 - det) * 0.5);
        c = mix(c, chaoMata, flor);
        c = mix(c, lavoura, camp);
        c = mix(c, ar, areia);
        c = mix(c, asf, rua);
        c *= 0.9 + 0.18 * n3;
        c *= 1.0 - smoothstep(0.05, 0.6, m.a) * 0.3;
        diffuseColor.rgb = c;
      }`);
  };
  const geo = new THREE.PlaneGeometry(LARG, ALT, 48, 28);
  geo.rotateX(-Math.PI / 2);
  geo.translate(LARG / 2, 0, ALT / 2);
  const chao = new THREE.Mesh(geo, mat);
  chao.name = 'chao';
  chao.receiveShadow = true;
  cena.add(chao);
  const fundo = new THREE.Mesh(new THREE.PlaneGeometry(80000, 80000).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: COSTA ? 0x0f3a3a : RURAL ? 0x3d4d2a : 0x8d8a80 }));
  fundo.position.set(LARG / 2, -4, ALT / 2);
  cena.add(fundo);
  return chao;
}

// ---------------- água animada ----------------
export function construirAgua(cena) {
  const m = new Uint8Array(GW * GH);
  for (let i = 0; i < m.length; i++) m[i] = grade[i] === T.AGUA ? 255 : 0;
  const mask = new THREE.DataTexture(m, GW, GH, THREE.RedFormat, THREE.UnsignedByteType);
  mask.magFilter = THREE.LinearFilter; mask.minFilter = THREE.LinearFilter;
  mask.needsUpdate = true;
  const tempo = { value: 0 };
  const mat = new THREE.MeshPhongMaterial({ color: 0xffffff, transparent: true, depthWrite: false, shininess: 90, specular: 0x556666, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 });
  mat.onBeforeCompile = (sh) => {
    sh.uniforms.mascara = { value: mask };
    sh.uniforms.tam = { value: new THREE.Vector2(LARG, ALT) };
    sh.uniforms.tempo = tempo;
    sh.vertexShader = sh.vertexShader
      .replace('#include <common>', '#include <common>\nvarying vec3 vW;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvW = (modelMatrix * vec4(transformed, 1.0)).xyz;');
    sh.fragmentShader = sh.fragmentShader
      .replace('#include <common>', `#include <common>
      uniform sampler2D mascara; uniform vec2 tam; uniform float tempo; varying vec3 vW;
      ${QUAL === 0 ? `float rua2(vec2 p){ return 0.45 + 0.1 * sin(p.x * 3.0 + p.y * 2.0); }` : `float h1a(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float rua2(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1a(i), h1a(i+vec2(1,0)), u.x), mix(h1a(i+vec2(0,1)), h1a(i+vec2(1,1)), u.x), u.y); }`}`)
      .replace('#include <map_fragment>', `
      {
        vec2 uv = vW.xz / tam;
        float mm = ${COSTA ? '1.0' : '0.0'};
        if (uv.x > 0.0 && uv.y > 0.0 && uv.x < 1.0 && uv.y < 1.0) mm = texture2D(mascara, uv).r;
        if (mm < 0.45) discard;
        float prof = length(vViewPosition);
        float det = 1.0 - smoothstep(600.0, 3000.0, prof);
        vec2 p = vW.xz;
        float fundo = smoothstep(0.45, 0.98, mm);
        vec3 raso = vec3(0.16, 0.38, 0.36), alto = vec3(0.06, 0.20, 0.21);
        vec3 c = mix(raso, alto, fundo);
        float o = rua2(p * 0.03 + vec2(tempo * 0.05, tempo * 0.03));
        c *= 0.88 + 0.24 * o;
        // espuma nas cristas: traços alongados que andam com o vento
        vec2 q = vec2(p.x * 0.022 + p.y * 0.008, p.y * 0.06 - p.x * 0.012) + vec2(tempo * 0.04, tempo * 0.1);
        float cr = rua2(q) * 0.65 + rua2(q * 2.3) * 0.35;
        float espuma = smoothstep(0.70, 0.74, cr) * (1.0 - smoothstep(0.74, 0.80, cr));
        espuma *= smoothstep(0.35, 0.65, rua2(p * 0.004 + tempo * 0.01)) * det;
        // arrebentação junto à costa
        float costa = (1.0 - smoothstep(0.5, 0.75, mm)) * (0.6 + 0.4 * sin(tempo * 1.4 + p.x * 0.05 + p.y * 0.03));
        c = mix(c, vec3(0.85, 0.9, 0.88), clamp(espuma * 0.85 + costa * 0.7, 0.0, 1.0));
        diffuseColor.rgb = c;
        diffuseColor.a = 0.9 + 0.1 * fundo;
      }`);
  };
  const geo = new THREE.PlaneGeometry(LARG + 30000, ALT + 30000, 64, 48);
  geo.rotateX(-Math.PI / 2);
  const agua = new THREE.Mesh(geo, mat);
  agua.position.set(LARG / 2, 0.3, ALT / 2);
  agua.renderOrder = 1;
  agua.receiveShadow = true;
  agua.userData.tempo = tempo;
  cena.add(agua);
  return agua;
}

// ---------------- árvores ----------------
function corVert(g, f) {
  const n = g.attributes.position.count, c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { const v = f(g.attributes.position.getY(i), i); c[i * 3] = v[0]; c[i * 3 + 1] = v[1]; c[i * 3 + 2] = v[2]; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  if (g.attributes.uv) g.deleteAttribute('uv');
  return g;
}

function geoPalmeira() {
  const tr = [], fo = [];
  // tronco curvo em anéis (claro/escuro alternados)
  const seg = QUAL >= 2 ? 6 : 3;
  for (let i = 0; i < seg; i++) {
    const L = 9.5 / seg;
    const g = new THREE.CylinderGeometry(0.19 - i * 0.02, 0.22 - i * 0.02, L * 1.03, 5, 1, true).toNonIndexed();
    const curva = (i / seg) ** 2 * 0.9;
    g.rotateZ(-0.06 * i / seg); g.translate(curva, L / 2 + i * L, 0);
    const k = i % 2 ? 0.86 : 1;
    tr.push(corVert(g, (y) => [0.62 * k, 0.5 * k, 0.36 * k]));
  }
  const tx = 0.9, ty = 9.6;
  // cocos
  for (let k = 0; k < (QUAL >= 2 ? 4 : 0); k++) {
    const g = new THREE.SphereGeometry(0.16, 6, 4).toNonIndexed();
    g.translate(tx + Math.cos(k * 1.6) * 0.22, ty - 0.25, Math.sin(k * 1.6) * 0.22);
    tr.push(corVert(g, () => [0.42, 0.33, 0.12]));
  }
  // folhas: cada uma é uma lâmina arqueada com folíolos (duas camadas)
  const nf = QUAL >= 2 ? 10 : QUAL === 1 ? 8 : 7;
  for (let k = 0; k < nf; k++) {
    const a = (k / nf) * Math.PI * 2 + (k % 2) * 0.25;
    const comp = 4.0 + (k % 3) * 0.6, queda = 0.25 + (k % 4) * 0.18 + (k >= 8 ? 0.35 : -0.1);
    const pts = [];
    const n = QUAL >= 2 ? 5 : 2;
    // lâmina: duas tiras laterais (folíolos) ao longo de uma curva que cai
    const pos = [], cor = [];
    let px = 0, py = 0;
    for (let i = 0; i <= n; i++) {
      const t = i / n;
      const x = t * comp, y = Math.sin(t * 1.2) * 0.9 - t * t * comp * queda;
      const w = Math.sin(t * Math.PI) * 0.75 + 0.05;
      pts.push([x, y, w]);
    }
    for (let i = 0; i < n; i++) {
      const [x0, y0, w0] = pts[i], [x1, y1, w1] = pts[i + 1];
      for (const lado of [-1, 1]) {
        const d0 = lado * w0, d1 = lado * w1;
        pos.push(x0, y0, 0, x1, y1, 0, x1, y1 - 0.25 * w1, d1, x0, y0, 0, x1, y1 - 0.25 * w1, d1, x0, y0 - 0.25 * w0, d0);
        const v = 0.85 + (i / n) * 0.3;
        for (let q = 0; q < 6; q++) cor.push(0.24 * v, 0.5 * v, 0.2 * v);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(cor, 3));
    g.computeVertexNormals();
    g.rotateY(a);
    g.translate(tx, ty, 0);
    fo.push(g);
  }
  return { tronco: mergeGeometries(tr), folhas: mergeGeometries(fo) };
}

function geoArvore() {
  // árvore de copa larga (carvalho/figueira): tronco com galhos e copa de "nuvens" facetadas
  const tr = [], co = [];
  const t = new THREE.CylinderGeometry(0.25, 0.42, 3.4, 5, 1, true).toNonIndexed(); t.translate(0, 1.7, 0);
  tr.push(corVert(t, () => [0.42, 0.33, 0.24]));
  for (let k = 0; k < (QUAL >= 1 ? 3 : 0); k++) {
    const g = new THREE.CylinderGeometry(0.1, 0.18, 2.2, 4, 1, true).toNonIndexed();
    g.rotateZ(0.8); g.rotateY(k * 2.1); g.translate(Math.cos(k * 2.1) * 0.6, 3.6, -Math.sin(k * 2.1) * 0.6);
    tr.push(corVert(g, () => [0.4, 0.31, 0.22]));
  }
  const bolas = [[0, 5.4, 0, 2.6], [1.7, 4.8, 0.6, 1.9], [-1.5, 4.9, -0.7, 2.0], [0.4, 4.6, -1.8, 1.8], [-0.6, 4.7, 1.7, 1.8], [0.3, 6.6, 0.2, 1.7]];
  for (const [x, y, z, r] of (QUAL >= 1 ? bolas : [[0, 5.2, 0, 3.0], [0.6, 6.4, 0.3, 2.0]])) {
    const g = new THREE.IcosahedronGeometry(r, 0).toNonIndexed();
    g.scale(1, 0.8, 1); g.translate(x, y, z);
    co.push(corVert(g, (yy, i) => { const v = 0.75 + ((yy - 3.5) / 4) * 0.35 + ((i * 7919) % 13) / 100; return [0.3 * v, 0.47 * v, 0.2 * v]; }));
  }
  return { tronco: mergeGeometries(tr), copa: mergeGeometries(co) };
}

// pinheiro da Flórida (slash pine): tronco alto e fino, copa em tufos só no alto
function geoPinheiro() {
  const tr = [], co = [];
  const t = new THREE.CylinderGeometry(0.16, 0.3, 13, 5, 1, true).toNonIndexed(); t.translate(0, 6.5, 0);
  tr.push(corVert(t, () => [0.45, 0.33, 0.24]));
  const tufos = QUAL >= 1 ? [[0, 13.6, 0, 1.6], [1.0, 12.6, 0.4, 1.2], [-0.9, 12.9, -0.5, 1.25], [0.3, 11.6, -1.0, 1.1], [-0.4, 14.5, 0.3, 1.1]] : [[0, 13.4, 0, 2.0], [0.4, 12.0, 0.3, 1.4]];
  for (const [x, y, z, r] of tufos) {
    const g = new THREE.IcosahedronGeometry(r, 0).toNonIndexed();
    g.scale(1.25, 0.6, 1.25); g.translate(x, y, z);
    co.push(corVert(g, (yy, i) => { const v = 0.7 + ((i * 7919) % 17) / 100; return [0.24 * v, 0.38 * v, 0.17 * v]; }));
  }
  return { tronco: mergeGeometries(tr), copa: mergeGeometries(co) };
}

// pontos para árvores: parques, praias e calçadas ao lado das ruas
function lugarArvore() {
  for (let tent = 0; tent < 60; tent++) {
    const x = Math.random() * LARG, z = Math.random() * ALT;
    const ce = cel(x, z);
    if (ce < 0 || predioId[ce] >= 0) continue;
    const t = grade[ce];
    if (t === T.FLORESTA && Math.random() < 0.9) return { x, z, tipo: Math.random() < 0.55 ? 2 : 1 };
    if (t === T.CAMPO) { if (Math.random() < 0.004) return { x, z, tipo: 1 }; continue; }
    if (t === T.PARQUE && RURAL) { if (Math.random() < 0.55) return { x, z, tipo: Math.random() < 0.6 ? 2 : 1 }; continue; }
    if (t === T.PARQUE && Math.random() < 0.6) return { x, z, tipo: Math.random() < 0.5 ? 0 : 1 };
    if (t === T.AREIA && Math.random() < 0.35) return { x, z, tipo: 0 };
    if (t === T.CHAO) {
      // calçada: precisa ter rua do lado
      const cx = ce % GW, cz = (ce / GW) | 0;
      let rua = false;
      for (const [dx, dz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const k = (cz + dz) * GW + cx + dx; if (k >= 0 && k < grade.length && ehRua(grade[k])) rua = true; }
      if (rua && Math.random() < 0.5) return { x, z, tipo: Math.random() < 0.7 ? 0 : 1 };
      if (!rua && Math.random() < 0.04) return { x, z, tipo: Math.random() < 0.5 ? 0 : 1 };
    }
  }
  return null;
}

// Agrupa instâncias por bloco de BLOCO metros: cada bloco é um InstancedMesh separado, e a cada quadro
// só os blocos perto da câmera ficam visíveis (as árvores e carros longe nem são enviados à placa de vídeo).
const BLOCO = 400;
function blocos(cena, geo, mat, itens, sombra, tipo) {
  const mapa = new Map();
  for (const it of itens) {
    const k = Math.floor(it.x / BLOCO) + ',' + Math.floor(it.z / BLOCO);
    let l = mapa.get(k); if (!l) { l = []; mapa.set(k, l); } l.push(it);
  }
  const out = [];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), pp = new THREE.Vector3(), c = new THREE.Color();
  for (const [k, l] of mapa) {
    const im = new THREE.InstancedMesh(geo, mat, l.length);
    l.forEach((it, n) => {
      e.set(0, it.ang, 0); q.setFromEuler(e);
      m.compose(pp.set(it.x, it.y || 0, it.z), q, s.set(it.sx, it.sy, it.sz));
      im.setMatrixAt(n, m);
      if (it.cor) im.setColorAt(n, c.setHex(it.cor)); else if (it.hsl) im.setColorAt(n, c.setHSL(...it.hsl));
      it.malha = im; it.idx = n;
    });
    im.computeBoundingSphere();
    im.castShadow = sombra; im.receiveShadow = false;
    const [bx, bz] = k.split(',').map(Number);
    im.userData.cx = (bx + 0.5) * BLOCO; im.userData.cz = (bz + 0.5) * BLOCO; im.userData.tipo = tipo;
    cena.add(im);
    out.push(im);
  }
  return out;
}

export function construirPalmeiras(cena, qtd = 2600, evitar = null) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const matF = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const P = geoPalmeira(), A = geoArvore(), PI = geoPinheiro();
  if (QUAL === 0) qtd = Math.round(qtd * 0.7);
  const nP = Math.round(qtd * (RURAL ? 0.12 : 0.65)), nPi = RURAL ? Math.round(qtd * 0.48) : 0, nA = qtd - nP - nPi;
  const palmas = [], copas = [], pinhos = [];
  let tent = 0;
  while ((palmas.length < nP || copas.length < nA || pinhos.length < nPi) && tent < qtd * 6) {
    tent++;
    const l = lugarArvore();
    if (!l || (evitar && evitar(l.x, l.z))) continue;
    if (l.tipo === 0 && palmas.length < nP) {
      const k = 0.8 + Math.random() * 0.5;
      palmas.push({ x: l.x, z: l.z, ang: Math.random() * 6.28, sx: k, sy: k * (0.9 + Math.random() * 0.3), sz: k, hsl: [0.24 + Math.random() * 0.08, 0.5, 0.75 + Math.random() * 0.4] });
    } else if ((l.tipo === 2 && pinhos.length < nPi) || (l.tipo === 1 && copas.length < nA)) {
      // no interior as árvores nascem em ilhas de mata (tufos densos com clareiras entre eles)
      const n = RURAL ? 4 + ((Math.random() * 7) | 0) : 1;
      for (let k2 = 0; k2 < n; k2++) {
        const x = k2 ? l.x + (Math.random() - 0.5) * 30 : l.x, z = k2 ? l.z + (Math.random() - 0.5) * 30 : l.z;
        if (k2) { const ce = cel(x, z); if (ce < 0 || predioId[ce] >= 0 || (grade[ce] !== T.FLORESTA && grade[ce] !== T.PARQUE)) continue; }
        const tipo = k2 && Math.random() < 0.3 ? 3 - l.tipo : l.tipo;
        if (tipo === 2 && pinhos.length < nPi) {
          const k = 0.8 + Math.random() * 0.55;
          pinhos.push({ x, z, ang: Math.random() * 6.28, sx: k, sy: k * (0.85 + Math.random() * 0.35), sz: k, hsl: [0.25 + Math.random() * 0.06, 0.4, 0.62 + Math.random() * 0.3] });
        } else if (tipo === 1 && copas.length < nA) {
          const k = 0.75 + Math.random() * 0.6;
          copas.push({ x, z, ang: Math.random() * 6.28, sx: k, sy: k, sz: k, hsl: [0.22 + Math.random() * 0.1, 0.45, 0.8 + Math.random() * 0.35] });
        }
      }
    }
  }
  const sombra = QUAL >= 2;
  const troncos = palmas.map((p) => ({ ...p, hsl: null, cor: 0xffffff })), troncosA = copas.map((p) => ({ ...p, hsl: null, cor: 0xffffff }));
  return [
    ...blocos(cena, P.tronco, mat, troncos, sombra, 'arvore'),
    ...blocos(cena, P.folhas, matF, palmas, sombra, 'arvore'),
    ...blocos(cena, A.tronco, mat, troncosA, sombra, 'arvore'),
    ...blocos(cena, A.copa, mat, copas, sombra, 'arvore'),
    ...(pinhos.length ? blocos(cena, PI.tronco, mat, pinhos.map((p) => ({ ...p, hsl: null, cor: 0xffffff })), sombra, 'arvore') : []),
    ...(pinhos.length ? blocos(cena, PI.copa, mat, pinhos, sombra, 'arvore') : []),
  ];
}

// ---------------- carros estacionados ----------------
export const carros = { lista: [] };
export function construirCarros(cena, qtd = 1600, evitar) {
  const L = [];
  const add = (geo, cor, x, y, z) => { const g = geo.toNonIndexed(); g.translate(x, y, z); L.push(corVert(g, () => cor)); };
  add(new THREE.BoxGeometry(1.8, 0.62, 4.4), [1, 1, 1], 0, 0.6, 0);
  add(new THREE.BoxGeometry(1.62, 0.5, 2.2), [0.95, 0.95, 0.95], 0, 1.15, -0.25);
  add(new THREE.BoxGeometry(1.64, 0.36, 2.04), [0.18, 0.22, 0.27], 0, 1.15, -0.25);          // vidros
  add(new THREE.BoxGeometry(1.7, 0.42, 3.4), [0.08, 0.08, 0.08], 0, 0.26, 0);              // rodas (bloco escuro)
  if (QUAL >= 1) {
    add(new THREE.BoxGeometry(1.2, 0.12, 0.05), [2.2, 2.1, 1.8], 0, 0.7, 2.21);             // faróis
    add(new THREE.BoxGeometry(1.2, 0.12, 0.05), [1.6, 0.2, 0.15], 0, 0.75, -2.21);          // lanternas
  }
  const geo = mergeGeometries(L);
  const mat = QUAL >= 1 ? new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 60, specular: 0x444444 }) : new THREE.MeshLambertMaterial({ vertexColors: true });
  const CORES = [0xf2f2f2, 0x1c1c1c, 0x9a9fa6, 0xb3261e, 0x22427a, 0x6a6f74, 0xd8c8a0, 0x2c5e3a, 0xe8b830, 0x5a2a6a, 0xd0d4d8, 0x3a4048];
  if (QUAL === 0) qtd = Math.round(qtd * 0.6);
  const lista = [];
  let tent = 0;
  while (lista.length < qtd && tent < qtd * 80) {
    tent++;
    const cx = 1 + Math.floor(Math.random() * (GW - 2)), cz = 1 + Math.floor(Math.random() * (GH - 2));
    const k = cz * GW + cx;
    if (grade[k] !== T.RUA || predioId[k] >= 0) continue;
    let dx = 0, dz = 0;
    for (const [ox, oz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const t = grade[k + oz * GW + ox]; if (!ehRua(t) && t !== T.AGUA && t !== T.PONTE) { dx = ox; dz = oz; } }
    if (!dx && !dz) continue;
    const x = (cx + 0.5) * CEL + dx * 0.9, z = (cz + 0.5) * CEL + dz * 0.9;
    if (evitar && evitar(x, z)) continue;
    let perto = false;
    for (let i = Math.max(0, lista.length - 40); i < lista.length; i++) if (Math.abs(lista[i].x - x) < 6 && Math.abs(lista[i].z - z) < 6) { perto = true; break; }
    if (perto) continue;
    const ang = (dx !== 0 ? 0 : Math.PI / 2) + (Math.random() < 0.5 ? Math.PI : 0) + (Math.random() - 0.5) * 0.08;
    lista.push({ x, z, ang, sx: 1, sy: 1, sz: 1, cor: CORES[(Math.random() * CORES.length) | 0] });
  }
  carros.lista = lista;
  return blocos(cena, geo, mat, lista, false, 'carro');
}

// mostra só os blocos de árvores, carros e prédios perto da câmera
export function atualizarDecoracao(lista, alvo, distCam) {
  const fator = QUAL === 0 ? 1.0 : QUAL === 1 ? 1.4 : 2.0;
  const rArv = distCam > 1600 ? 0 : Math.max(300, Math.min(1400, distCam * 1.3 * fator + 200));
  const rCar = distCam > 900 ? 0 : Math.max(250, Math.min(900, distCam * 1.0 * fator + 150));
  for (const m of lista) {
    const r = m.userData.tipo === 'carro' ? rCar : rArv;
    const dx = m.userData.cx - alvo.x, dz = m.userData.cz - alvo.z;
    m.visible = r > 0 && dx * dx + dz * dz < (r + BLOCO * 0.7) * (r + BLOCO * 0.7);
  }
}
export function atualizarPredios(malhas, alvo, distCam, alcance) {
  for (const m of malhas) {
    const dx = m.userData.cx - alvo.x, dz = m.userData.cz - alvo.z;
    m.visible = dx * dx + dz * dz < (alcance + 400) * (alcance + 400);
  }
}

// veículo pesado passando por cima amassa o carro
const _m4 = new THREE.Matrix4(), _q4 = new THREE.Quaternion(), _e4 = new THREE.Euler(), _s4 = new THREE.Vector3(), _p4 = new THREE.Vector3();
export function esmagarCarros(x, z, r) {
  let k = 0;
  for (const c of carros.lista) {
    if (c.esmagado) continue;
    const dx = c.x - x, dz = c.z - z;
    if (dx * dx + dz * dz < r * r) {
      c.esmagado = true;
      _e4.set(0, c.ang, (Math.random() - 0.5) * 0.2); _q4.setFromEuler(_e4);
      _m4.compose(_p4.set(c.x, -0.1, c.z), _q4, _s4.set(1.08, 0.35, 1.04));
      c.malha.setMatrixAt(c.idx, _m4);
      c.malha.instanceMatrix.needsUpdate = true;
      k++;
    }
  }
  return k;
}

// latitude/longitude -> metros no mapa
export function latlon(lat, lon) {
  const tx = (lon + 180) / 360 * Math.pow(2, META.z) * 256 - META.gx0;
  const r = lat * Math.PI / 180;
  const ty = (1 - Math.asinh(Math.tan(r)) / Math.PI) / 2 * Math.pow(2, META.z) * 256 - META.gy0;
  return { x: tx * MPP, z: ty * MPP };
}
