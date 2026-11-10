// Mapa real de Miami: grade de terreno, prédios em 3D, água, satélite e palmeiras
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { META, GRADE_RLE, PREDIOS } from './dados_mapa.js';

export const MPP = META.mpp;                 // metros por pixel (z17)
export const CEL = META.cel * MPP;           // tamanho da célula da grade (m)
export const GW = META.gw, GH = META.gh;
export const LARG = GW * CEL, ALT = GH * CEL; // tamanho do mapa em metros
export const T = { AGUA: 0, CHAO: 1, RUA: 2, PARQUE: 3, AREIA: 4, PREDIO: 5, PONTE: 6 };

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
      cap: Math.max(4, Math.min(20, Math.round(area / 60))),
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
const CORES_T = [[44, 104, 140], [205, 200, 188], [86, 88, 94], [96, 146, 70], [232, 214, 164], [170, 168, 160], [110, 110, 114]];
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
    m[o] = t === T.RUA || t === T.PONTE ? 255 : 0;
    m[o + 1] = t === T.PARQUE ? 255 : 0;
    m[o + 2] = t === T.AREIA ? 255 : 0;
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
        float rua = smoothstep(0.42, 0.58, m.r), grama = smoothstep(0.35, 0.6, m.g), areia = smoothstep(0.35, 0.6, m.b);
        // calçada de placas de concreto
        vec2 q = abs(fract(p / 2.4) - 0.5);
        float junta = smoothstep(0.46, 0.5, max(q.x, q.y)) * det;
        vec3 calc = vec3(0.68, 0.66, 0.62) * (0.9 + 0.1 * n1 + 0.06 * n2) - junta * 0.07;
        // asfalto com faixa branca na borda da pista
        vec3 asf = vec3(0.20, 0.205, 0.215) * (0.85 + 0.25 * n1 + 0.12 * n2);
        float faixa = (smoothstep(0.60, 0.63, m.r) - smoothstep(0.66, 0.70, m.r)) * det;
        asf = mix(asf, vec3(0.86, 0.85, 0.80), faixa * 0.75);
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


// ---------------- palmeiras ----------------
function geoPalmeira() {
  const partes = [];
  // tronco levemente curvo, em segmentos
  for (let i = 0; i < 4; i++) {
    const g = new THREE.CylinderGeometry(0.2 - i * 0.02, 0.24 - i * 0.02, 2.4, 6).toNonIndexed();
    g.rotateZ(i * 0.04); g.translate(i * i * 0.06, 1.2 + i * 2.3, 0);
    partes.push(g);
  }
  const topo = new THREE.Vector3(0.55, 9.4, 0);
  // folhas: lâminas caídas em volta do topo
  for (let k = 0; k < 9; k++) {
    const a = (k / 9) * Math.PI * 2 + (k % 2) * 0.2;
    const s = new THREE.Shape();
    s.moveTo(0, 0); s.quadraticCurveTo(0.7, 1.8, 0, 4.2); s.quadraticCurveTo(-0.7, 1.8, 0, 0);
    const g = new THREE.ShapeGeometry(s, 3).toNonIndexed();
    g.rotateX(-Math.PI / 2 - 0.12 - (k % 3) * 0.18);
    g.rotateY(a);
    g.translate(topo.x, topo.y, topo.z);
    partes.push(g);
  }
  return partes;
}

export function construirPalmeiras(cena, qtd = 1800) {
  const p = geoPalmeira();
  const tronco = mergeGeometries(p.slice(0, 4).map((g) => { g.deleteAttribute('uv'); return g; }));
  const folhas = mergeGeometries(p.slice(4).map((g) => { g.deleteAttribute('uv'); return g; }));
  const mt = new THREE.MeshLambertMaterial({ color: 0x8c7454 });
  const mf = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const it = new THREE.InstancedMesh(tronco, mt, qtd), ifo = new THREE.InstancedMesh(folhas, mf, qtd);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), pp = new THREE.Vector3(), c = new THREE.Color();
  let n = 0, tent = 0;
  while (n < qtd && tent < qtd * 40) {
    tent++;
    const x = Math.random() * LARG, z = Math.random() * ALT;
    const ce = cel(x, z);
    if (ce < 0 || predioId[ce] >= 0) continue;
    const t = grade[ce];
    const chance = t === T.PARQUE ? 0.5 : t === T.AREIA ? 0.35 : t === T.CHAO ? 0.05 : 0;
    if (Math.random() > chance) continue;
    const k = 0.75 + Math.random() * 0.55;
    e.set((Math.random() - 0.5) * 0.1, Math.random() * 6.28, (Math.random() - 0.5) * 0.1);
    q.setFromEuler(e);
    m.compose(pp.set(x, 0, z), q, s.set(k, k, k));
    it.setMatrixAt(n, m); ifo.setMatrixAt(n, m);
    c.setHSL(0.27 + Math.random() * 0.07, 0.45, 0.28 + Math.random() * 0.12);
    ifo.setColorAt(n, c);
    n++;
  }
  it.count = ifo.count = n;
  cena.add(it); cena.add(ifo);
}
