// Mapa real de Miami: grade de terreno, prédios em 3D, água, satélite e palmeiras
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { META, GRADE_RLE, PREDIOS } from './dados_mapa.js';

export const MPP = META.mpp;                 // metros por pixel (z17)
export const CEL = META.cel * MPP;           // tamanho da célula da grade (m)
export const GW = META.gw, GH = META.gh;
export const LARG = GW * CEL, ALT = GH * CEL; // tamanho do mapa em metros
export const T = { AGUA: 0, CHAO: 1, RUA: 2, PARQUE: 3, AREIA: 4, PREDIO: 5, PONTE: 6, CENTRO: 7 };
export const ehRua = (t) => t === 2 || t === 7;

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
export function tipo(x, z) { const c = cel(x, z); return c < 0 ? T.AGUA : grade[c]; }
export function andavel(x, z) {
  const c = cel(x, z);
  if (c < 0) return false;
  const t = grade[c];
  return t !== T.AGUA && predioId[c] < 0;
}
export function agua(x, z) { const c = cel(x, z); return c < 0 || grade[c] === T.AGUA || grade[c] === T.PONTE; }
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
  const TAM = 1200;
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
    const estilo = h > 45 ? 'vidro' : h > 14 ? 'concreto' : 'deco';
    const lista = estilo === 'vidro' ? VIDROS : estilo === 'concreto' ? CONCRETO : PASTEIS;
    cor.setHex(lista[sem % lista.length]);
    p.cor = cor.getHex();
    const W = pega(base + ',' + estilo), R = pega(base + ',telhado');
    const parapeito = h > 6 ? 1.1 : 0;
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
      const terreo = Math.min(h, 4);
      quad(W, ax, az, bx, bz, 0, terreo, nx, nz, u0, u1, cor.r * 0.8, cor.g * 0.8, cor.b * 0.82, ANDAR * REP);
      if (h > terreo) quad(W, ax, az, bx, bz, terreo, h, nx, nz, u0, u1, cor.r, cor.g, cor.b, ANDAR * REP);
      if (parapeito) {
        // mureta do telhado (lado de fora e de dentro)
        const c2 = 0.92;
        quad(R, ax, az, bx, bz, h, h + parapeito, nx, nz, u0 * 3, u1 * 3, cor.r * c2, cor.g * c2, cor.b * c2, 8);
        quad(R, bx, bz, ax, az, h, h + parapeito, -nx, -nz, u0 * 3, u1 * 3, cor.r * 0.7, cor.g * 0.7, cor.b * 0.7, 8);
      }
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
    if (h > 8 && p.area > 150) {
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
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(ch.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(ch.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(ch.col, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(ch.uv, 2));
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, MAT_PREDIOS[est]);
    m.matrixAutoUpdate = false;
    m.updateMatrix();
    m.name = 'predios';
    cena.add(m);
    malhas.push(m);
  }
  return malhas;
}

// ---------------- chão desenhado (asfalto, calçada, grama, areia) ----------------
const CORES_T = [[44, 104, 140], [205, 200, 188], [86, 88, 94], [96, 146, 70], [232, 214, 164], [170, 168, 160], [110, 110, 114], [86, 88, 94]];
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

export function construirChao(cena) {
  // máscaras por tipo de terreno: R rua/ponte, G grama, B areia, A prédio (sombra de contato)
  const m = new Uint8Array(GW * GH * 4);
  for (let i = 0; i < GW * GH; i++) {
    const t = grade[i], o = i * 4;
    m[o] = t === T.RUA || t === T.PONTE || t === T.CENTRO ? 255 : 0;
    m[o + 1] = t === T.PARQUE ? 255 : 0;
    m[o + 2] = t === T.AREIA || t === T.CENTRO ? 255 : 0;  // na rua, B marca a linha central
    m[o + 3] = predioId[i] >= 0 ? 255 : 0;
  }
  const tex = new THREE.DataTexture(m, GW, GH, THREE.RGBAFormat, THREE.UnsignedByteType);
  tex.magFilter = THREE.LinearFilter; tex.minFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      mapa: { value: tex }, tam: { value: new THREE.Vector2(LARG, ALT) }, luz: { value: 1 }, corLuz: { value: new THREE.Color(1, 1, 1) },
      corNevoa: { value: new THREE.Color(0xa9c8de) }, nevoaPerto: { value: 2000 }, nevoaLonge: { value: 9000 },
    },
    vertexShader: `varying vec3 vW; varying float vProf;
      void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vProf = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform sampler2D mapa; uniform vec2 tam; uniform float luz; uniform vec3 corLuz;
      uniform vec3 corNevoa; uniform float nevoaPerto; uniform float nevoaLonge;
      varying vec3 vW; varying float vProf;
      float h1(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
      float ru(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
        return mix(mix(h1(i), h1(i+vec2(1,0)), u.x), mix(h1(i+vec2(0,1)), h1(i+vec2(1,1)), u.x), u.y); }
      float fbm(vec2 p){ return ru(p)*0.5 + ru(p*2.07)*0.3 + ru(p*4.13)*0.2; }
      void main(){
        vec2 uv = vW.xz / tam;
        vec4 m = texture2D(mapa, uv);
        float det = 1.0 - smoothstep(250.0, 1400.0, vProf);
        vec2 p = vW.xz;
        float n1 = fbm(p * 0.18), n2 = ru(p * 3.1) * det, n3 = fbm(p * 0.012);
        float rua = smoothstep(0.42, 0.58, m.r), grama = smoothstep(0.35, 0.6, m.g), areia = smoothstep(0.35, 0.6, m.b) * (1.0 - smoothstep(0.2, 0.5, m.r));
        // calçada de placas de concreto
        vec2 q = abs(fract(p / 2.4) - 0.5);
        float junta = smoothstep(0.46, 0.5, max(q.x, q.y)) * det;
        vec3 calc = vec3(0.68, 0.66, 0.62) * (0.9 + 0.1 * n1 + 0.06 * n2) - junta * 0.07;
        // asfalto com faixa branca na borda da pista
        vec3 asf = vec3(0.20, 0.205, 0.215) * (0.85 + 0.25 * n1 + 0.12 * n2);
        float faixa = (smoothstep(0.60, 0.63, m.r) - smoothstep(0.66, 0.70, m.r)) * det;
        asf = mix(asf, vec3(0.86, 0.85, 0.80), faixa * 0.75);
        // faixa amarela dupla no meio da rua: linhas finas na borda da região central
        float fb = fwidth(m.b) + 0.002;
        float lin = 1.0 - smoothstep(0.03, 0.03 + fb * 1.5, abs(m.b - 0.5));
        float centro = lin * smoothstep(0.85, 0.97, m.r) * det;
        asf = mix(asf, vec3(0.95, 0.76, 0.18), centro * 0.9);
        // marcas de desgaste e manchas de óleo
        asf *= 1.0 - smoothstep(0.62, 0.75, ru(p * 0.6)) * 0.12 * det;
        vec3 gr = mix(vec3(0.22, 0.38, 0.14), vec3(0.36, 0.52, 0.20), n1) * (0.85 + 0.3 * n2);
        vec3 ar = vec3(0.92, 0.85, 0.67) * (0.93 + 0.08 * n1 + 0.05 * n2);
        // terreno urbano variado: estacionamentos e gramados entre os prédios
        float lote = fbm(p * 0.021 + 7.0), jard = fbm(p * 0.03 - 3.0);
        vec3 c = mix(calc, vec3(0.38, 0.385, 0.39) * (0.9 + 0.2 * n2), smoothstep(0.58, 0.68, lote) * 0.85);
        c = mix(c, gr * 0.95, smoothstep(0.6, 0.7, jard) * 0.85);
        c = mix(c, gr, grama);
        c = mix(c, ar, areia);
        c = mix(c, asf, rua);
        c *= 0.9 + 0.18 * n3;
        // sombra de contato junto aos prédios
        c *= 1.0 - smoothstep(0.05, 0.6, m.a) * 0.32;
        c *= (0.14 + 0.8 * luz) * corLuz;
        float f = smoothstep(nevoaPerto, nevoaLonge, vProf);
        gl_FragColor = vec4(mix(c, corNevoa, f), 1.0);
        #include <colorspace_fragment>
      }`,
  });
  const geo = new THREE.PlaneGeometry(LARG, ALT);
  geo.rotateX(-Math.PI / 2);
  geo.translate(LARG / 2, 0, ALT / 2);
  const chao = new THREE.Mesh(geo, mat);
  chao.name = 'chao';
  cena.add(chao);
  const fundo = new THREE.Mesh(new THREE.PlaneGeometry(80000, 80000).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x1d5a7a }));
  fundo.position.set(LARG / 2, -0.6, ALT / 2);
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
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      tempo: { value: 0 }, mascara: { value: mask }, tam: { value: new THREE.Vector2(LARG, ALT) },
      alfa: { value: 1 }, luz: { value: 1 },
      corNevoa: { value: new THREE.Color(0xa9c8de) }, nevoaPerto: { value: 2000 }, nevoaLonge: { value: 9000 },
    },
    vertexShader: `
      varying vec3 vW; varying float vProf;
      void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vProf = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform float tempo; uniform sampler2D mascara; uniform vec2 tam; uniform float alfa; uniform float luz;
      uniform vec3 corNevoa; uniform float nevoaPerto; uniform float nevoaLonge;
      varying vec3 vW; varying float vProf;
      void main(){
        vec2 uv = vW.xz / tam;
        float m = 1.0;
        if (uv.x > 0.0 && uv.y > 0.0 && uv.x < 1.0 && uv.y < 1.0) m = texture2D(mascara, uv).r;
        if (m < 0.45) discard;
        float o = sin(vW.x*0.045 + tempo*0.9) * sin(vW.z*0.06 - tempo*1.1) + 0.5*sin((vW.x+vW.z)*0.11 + tempo*1.7);
        vec3 raso = vec3(0.16,0.52,0.62), fundo = vec3(0.07,0.30,0.45);
        float costa = smoothstep(0.45, 0.95, m);
        vec3 c = mix(raso, fundo, costa) + o*0.035;
        c += vec3(0.9) * pow(max(0.0, o), 6.0) * 0.12;
        c *= luz;
        float f = smoothstep(nevoaPerto, nevoaLonge, vProf);
        gl_FragColor = vec4(mix(c, corNevoa, f), alfa * (0.86 + 0.14*costa));
      }`,
  });
  const geo = new THREE.PlaneGeometry(LARG + 30000, ALT + 30000);
  geo.rotateX(-Math.PI / 2);
  const agua = new THREE.Mesh(geo, mat);
  agua.position.set(LARG / 2, 0.15, ALT / 2);
  agua.renderOrder = 1;
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
  const seg = 6;
  for (let i = 0; i < seg; i++) {
    const g = new THREE.CylinderGeometry(0.19 - i * 0.012, 0.22 - i * 0.012, 1.62, 6).toNonIndexed();
    const curva = (i / seg) ** 2 * 0.9;
    g.rotateZ(-0.06 * i / seg); g.translate(curva, 0.81 + i * 1.58, 0);
    const k = i % 2 ? 0.86 : 1;
    tr.push(corVert(g, (y) => [0.62 * k, 0.5 * k, 0.36 * k]));
  }
  const tx = 0.9, ty = 9.6;
  // cocos
  for (let k = 0; k < 4; k++) {
    const g = new THREE.SphereGeometry(0.16, 6, 4).toNonIndexed();
    g.translate(tx + Math.cos(k * 1.6) * 0.22, ty - 0.25, Math.sin(k * 1.6) * 0.22);
    tr.push(corVert(g, () => [0.42, 0.33, 0.12]));
  }
  // folhas: cada uma é uma lâmina arqueada com folíolos (duas camadas)
  const nf = 10;
  for (let k = 0; k < nf; k++) {
    const a = (k / nf) * Math.PI * 2 + (k % 2) * 0.25;
    const comp = 4.0 + (k % 3) * 0.6, queda = 0.25 + (k % 4) * 0.18 + (k >= 8 ? 0.35 : -0.1);
    const pts = [];
    const n = 5;
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
  const t = new THREE.CylinderGeometry(0.25, 0.42, 3.4, 7).toNonIndexed(); t.translate(0, 1.7, 0);
  tr.push(corVert(t, () => [0.42, 0.33, 0.24]));
  for (let k = 0; k < 3; k++) {
    const g = new THREE.CylinderGeometry(0.1, 0.18, 2.2, 5).toNonIndexed();
    g.rotateZ(0.8); g.rotateY(k * 2.1); g.translate(Math.cos(k * 2.1) * 0.6, 3.6, -Math.sin(k * 2.1) * 0.6);
    tr.push(corVert(g, () => [0.4, 0.31, 0.22]));
  }
  const bolas = [[0, 5.4, 0, 2.6], [1.7, 4.8, 0.6, 1.9], [-1.5, 4.9, -0.7, 2.0], [0.4, 4.6, -1.8, 1.8], [-0.6, 4.7, 1.7, 1.8], [0.3, 6.6, 0.2, 1.7]];
  for (const [x, y, z, r] of bolas) {
    const g = new THREE.IcosahedronGeometry(r, 0).toNonIndexed();
    g.scale(1, 0.8, 1); g.translate(x, y, z);
    co.push(corVert(g, (yy, i) => { const v = 0.75 + ((yy - 3.5) / 4) * 0.35 + ((i * 7919) % 13) / 100; return [0.3 * v, 0.47 * v, 0.2 * v]; }));
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

export function construirPalmeiras(cena, qtd = 2600) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true });
  const matF = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const P = geoPalmeira(), A = geoArvore();
  const nP = Math.round(qtd * 0.65), nA = qtd - nP;
  const ip = new THREE.InstancedMesh(P.tronco, mat, nP), ipf = new THREE.InstancedMesh(P.folhas, matF, nP);
  const ia = new THREE.InstancedMesh(A.tronco, mat, nA), iac = new THREE.InstancedMesh(A.copa, mat, nA);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), pp = new THREE.Vector3(), c = new THREE.Color();
  let a = 0, b = 0, tent = 0;
  while ((a < nP || b < nA) && tent < qtd * 6) {
    tent++;
    const l = lugarArvore();
    if (!l) continue;
    if (l.tipo === 0 && a < nP) {
      const k = 0.8 + Math.random() * 0.5;
      e.set(0, Math.random() * 6.28, 0); q.setFromEuler(e);
      m.compose(pp.set(l.x, 0, l.z), q, s.set(k, k * (0.9 + Math.random() * 0.3), k));
      ip.setMatrixAt(a, m); ipf.setMatrixAt(a, m);
      c.setHSL(0.24 + Math.random() * 0.08, 0.5, 0.75 + Math.random() * 0.4); ipf.setColorAt(a, c);
      ip.setColorAt(a, c.setRGB(1, 1, 1));
      a++;
    } else if (l.tipo === 1 && b < nA) {
      const k = 0.75 + Math.random() * 0.6;
      e.set(0, Math.random() * 6.28, 0); q.setFromEuler(e);
      m.compose(pp.set(l.x, 0, l.z), q, s.set(k, k, k));
      ia.setMatrixAt(b, m); iac.setMatrixAt(b, m);
      c.setHSL(0.22 + Math.random() * 0.1, 0.45, 0.8 + Math.random() * 0.35); iac.setColorAt(b, c);
      ia.setColorAt(b, c.setRGB(1, 1, 1));
      b++;
    }
  }
  ip.count = ipf.count = a; ia.count = iac.count = b;
  for (const x of [ip, ipf, ia, iac]) { x.computeBoundingSphere(); cena.add(x); }
  return [ip, ipf, ia, iac];
}

// ---------------- carros estacionados ----------------
export const carros = { x: null, z: null, n: 0, malha: null, esmagado: null };
export function construirCarros(cena, qtd = 1600, evitar) {
  const L = [];
  const add = (geo, cor, x, y, z) => { const g = geo.toNonIndexed(); g.translate(x, y, z); L.push(corVert(g, () => cor)); };
  add(new THREE.BoxGeometry(1.8, 0.62, 4.4), [1, 1, 1], 0, 0.55, 0);
  add(new THREE.BoxGeometry(1.62, 0.5, 2.2), [0.95, 0.95, 0.95], 0, 1.1, -0.25);
  add(new THREE.BoxGeometry(1.64, 0.4, 2.0), [0.18, 0.22, 0.27], 0, 1.1, -0.25);        // vidros
  add(new THREE.BoxGeometry(1.4, 0.38, 0.05), [0.18, 0.22, 0.27], 0, 1.08, 0.88);
  for (const [x, z] of [[-0.82, 1.35], [0.82, 1.35], [-0.82, -1.35], [0.82, -1.35]]) {
    const r = new THREE.CylinderGeometry(0.33, 0.33, 0.24, 6).toNonIndexed(); r.rotateZ(Math.PI / 2); r.translate(x, 0.33, z);
    L.push(corVert(r, () => [0.08, 0.08, 0.08]));
  }
  add(new THREE.BoxGeometry(0.3, 0.12, 0.05), [2.2, 2.1, 1.8], 0.6, 0.65, 2.21);
  add(new THREE.BoxGeometry(0.3, 0.12, 0.05), [2.2, 2.1, 1.8], -0.6, 0.65, 2.21);
  add(new THREE.BoxGeometry(0.3, 0.12, 0.05), [1.6, 0.2, 0.15], 0.6, 0.7, -2.21);
  add(new THREE.BoxGeometry(0.3, 0.12, 0.05), [1.6, 0.2, 0.15], -0.6, 0.7, -2.21);
  const geo = mergeGeometries(L);
  const mat = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 60, specular: 0x444444 });
  const im = new THREE.InstancedMesh(geo, mat, qtd);
  const CORES = [0xf2f2f2, 0x1c1c1c, 0x9a9fa6, 0xb3261e, 0x22427a, 0x6a6f74, 0xd8c8a0, 0x2c5e3a, 0xe8b830, 0x5a2a6a, 0xd0d4d8, 0x3a4048];
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(1, 1, 1), pp = new THREE.Vector3(), c = new THREE.Color();
  carros.x = new Float32Array(qtd); carros.z = new Float32Array(qtd); carros.ang = new Float32Array(qtd); carros.esmagado = new Uint8Array(qtd);
  let n = 0, tent = 0;
  while (n < qtd && tent < qtd * 80) {
    tent++;
    const cx = 1 + Math.floor(Math.random() * (GW - 2)), cz = 1 + Math.floor(Math.random() * (GH - 2));
    const k = cz * GW + cx;
    if (grade[k] !== T.RUA || predioId[k] >= 0) continue;
    // lado da calçada: vizinho que não é rua
    let dx = 0, dz = 0;
    for (const [ox, oz] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const t = grade[k + oz * GW + ox]; if (!ehRua(t) && t !== T.AGUA && t !== T.PONTE) { dx = ox; dz = oz; } }
    if (!dx && !dz) continue;
    const x = (cx + 0.5) * CEL + dx * 0.9, z = (cz + 0.5) * CEL + dz * 0.9;
    if (evitar && evitar(x, z)) continue;
    let perto = false;
    for (let i = Math.max(0, n - 40); i < n; i++) if (Math.abs(carros.x[i] - x) < 6 && Math.abs(carros.z[i] - z) < 6) { perto = true; break; }
    if (perto) continue;
    const ang = (dx !== 0 ? 0 : Math.PI / 2) + (Math.random() < 0.5 ? Math.PI : 0) + (Math.random() - 0.5) * 0.08;
    e.set(0, ang, 0); q.setFromEuler(e);
    m.compose(pp.set(x, 0, z), q, s);
    im.setMatrixAt(n, m);
    c.setHex(CORES[(Math.random() * CORES.length) | 0]);
    im.setColorAt(n, c);
    carros.x[n] = x; carros.z[n] = z; carros.ang[n] = ang;
    n++;
  }
  im.count = n; carros.n = n; carros.malha = im;
  im.computeBoundingSphere();
  cena.add(im);
  return im;
}

// veículo pesado passando por cima amassa o carro
const _m4 = new THREE.Matrix4(), _q4 = new THREE.Quaternion(), _e4 = new THREE.Euler(), _s4 = new THREE.Vector3(), _p4 = new THREE.Vector3();
export function esmagarCarros(x, z, r) {
  if (!carros.malha) return 0;
  let k = 0;
  for (let i = 0; i < carros.n; i++) {
    if (carros.esmagado[i]) continue;
    const dx = carros.x[i] - x, dz = carros.z[i] - z;
    if (dx * dx + dz * dz < r * r) {
      carros.esmagado[i] = 1;
      _e4.set(0, carros.ang[i], (Math.random() - 0.5) * 0.2); _q4.setFromEuler(_e4);
      _m4.compose(_p4.set(carros.x[i], -0.1, carros.z[i]), _q4, _s4.set(1.08, 0.35, 1.04));
      carros.malha.setMatrixAt(i, _m4);
      carros.malha.instanceMatrix.needsUpdate = true;
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
