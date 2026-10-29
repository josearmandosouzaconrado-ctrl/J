'use strict';
// rodando dentro do aplicativo Android (APK)?
const GAME_VERSION = '0.13.4';
const IS_APK = /EldoriaAPK/.test(navigator.userAgent);
// versão ADM (painel de testes): APK 'Eldoria ADM' ou o endereço com ?adm
const IS_ADM = /EldoriaADM/.test(navigator.userAgent) || /[?&]adm\b/.test(location.search);
// ===================== Constantes e utilitários =====================
const TILE = 16;
const CHUNK = 32;
const CHUNK_PX = TILE * CHUNK;
const WORLD_TILES = 4096; // altura do mundo e largura do continente de Eldoria
const WORLD_W = 19456;     // largura total: Eldoria + Mar das Brumas + Kaeloria (Valtheria embaixo) + Mar do Amanhecer + Elyndra
const WORLD_H = 12288;     // altura total: Eldoria/Kaeloria no norte + Oceano do Sul + Valtheria
const MAP_W = WORLD_W / 16; // largura do mapa-múndi / névoa (células de 16 tiles)
const MAP_H = WORLD_H / 16;
const VALTHERIA_Y = 4400;  // abaixo desta linha começa o continente de Valtheria
// Ilha de Nyxhal: ilha pequena no oceano a leste de Kaeloria, só do povo Nyxar (continente 3)
const ISLE = { x: 7350, y: 1500, rx: 300, ry: 240 };
// Elyndra: o continente do leste, o maior de todos (continente 4), além do Mar do Amanhecer
const ELYNDRA = { x: 14450, y: 6144, rx: 4750, ry: 5750, x0: 9700 };
function contAt(x, y) { return x >= ELYNDRA.x0 ? 4 : Math.abs(x - ISLE.x) < 540 && Math.abs(y - ISLE.y) < 470 ? 3 : y >= VALTHERIA_Y ? 2 : x >= WORLD_TILES ? 1 : 0; }

const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const dist2 = (ax, ay, bx, by) => { const dx = bx - ax, dy = by - ay; return dx * dx + dy * dy; };
const angleTo = (ax, ay, bx, by) => Math.atan2(by - ay, bx - ax);
const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
const smooth = t => t * t * (3 - 2 * t);

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

class RNG {
  constructor(seed) { this.f = mulberry32((seed >>> 0) || 1); }
  next() { return this.f(); }
  range(a, b) { return a + (b - a) * this.f(); }
  int(a, b) { return a + Math.floor(this.f() * (b - a + 1)); }
  pick(arr) { return arr[Math.floor(this.f() * arr.length)]; }
  chance(p) { return this.f() < p; }
  shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) { const j = Math.floor(this.f() * (i + 1)); const t = arr[i]; arr[i] = arr[j]; arr[j] = t; }
    return arr;
  }
  weighted(list, wkey = 'w') {
    let total = 0; for (const it of list) total += it[wkey];
    let r = this.f() * total;
    for (const it of list) { r -= it[wkey]; if (r <= 0) return it; }
    return list[list.length - 1];
  }
}

function hash2(x, y, s) {
  let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 982451653)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}

function hashStr(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619);
  return h >>> 0;
}

// ---------- Simplex noise 2D ----------
const _GRAD = new Float32Array([1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 1, 0, -1, 0, 0, 1, 0, -1, 0, 1, 0, -1]);
const _F2 = 0.5 * (Math.sqrt(3) - 1), _G2 = (3 - Math.sqrt(3)) / 6;
class Simplex {
  constructor(seed) {
    const r = new RNG(seed);
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) { const j = Math.floor(r.next() * (i + 1)); const t = p[i]; p[i] = p[j]; p[j] = t; }
    this.perm = new Uint8Array(512); this.pm12 = new Uint8Array(512);
    for (let i = 0; i < 512; i++) { this.perm[i] = p[i & 255]; this.pm12[i] = this.perm[i] % 12; }
  }
  noise(xin, yin) {
    const perm = this.perm, pm = this.pm12;
    const s = (xin + yin) * _F2;
    const i = Math.floor(xin + s), j = Math.floor(yin + s);
    const t = (i + j) * _G2;
    const x0 = xin - (i - t), y0 = yin - (j - t);
    let i1, j1; if (x0 > y0) { i1 = 1; j1 = 0; } else { i1 = 0; j1 = 1; }
    const x1 = x0 - i1 + _G2, y1 = y0 - j1 + _G2, x2 = x0 - 1 + 2 * _G2, y2 = y0 - 1 + 2 * _G2;
    const ii = i & 255, jj = j & 255;
    let n = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 > 0) { const g = pm[ii + perm[jj]] * 2; t0 *= t0; n += t0 * t0 * (_GRAD[g] * x0 + _GRAD[g + 1] * y0); }
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 > 0) { const g = pm[ii + i1 + perm[jj + j1]] * 2; t1 *= t1; n += t1 * t1 * (_GRAD[g] * x1 + _GRAD[g + 1] * y1); }
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 > 0) { const g = pm[ii + 1 + perm[jj + 1]] * 2; t2 *= t2; n += t2 * t2 * (_GRAD[g] * x2 + _GRAD[g + 1] * y2); }
    return 70 * n;
  }
}
function fbm(ns, x, y, oct) {
  let a = 1, f = 1, sum = 0, norm = 0;
  for (let o = 0; o < oct; o++) { sum += a * ns.noise(x * f, y * f); norm += a; a *= 0.5; f *= 2.03; }
  return sum / norm;
}

// ---------- Cores ----------
function hexToRgb(h) {
  if (h[0] === '#') h = h.slice(1);
  if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgbToHex(r, g, b) {
  return '#' + ((1 << 24) | (clamp(r | 0, 0, 255) << 16) | (clamp(g | 0, 0, 255) << 8) | clamp(b | 0, 0, 255)).toString(16).slice(1);
}
const _shadeCache = new Map();
function shade(hex, amt) {
  const k = hex + amt;
  let v = _shadeCache.get(k);
  if (v) return v;
  const [r, g, b] = hexToRgb(hex);
  if (amt >= 0) v = rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt);
  else v = rgbToHex(r * (1 + amt), g * (1 + amt), b * (1 + amt));
  _shadeCache.set(k, v);
  return v;
}
function mix(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return rgbToHex(lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t));
}

const _nf = new Intl.NumberFormat('pt-BR');
function fmt(n) { return _nf.format(Math.floor(n)); }
let _uid = 1;
function uid() { return (Date.now().toString(36) + (_uid++).toString(36) + Math.floor(Math.random() * 1e6).toString(36)); }
function cap(s) { return s ? s[0].toUpperCase() + s.slice(1) : s; }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function tkey(x, y) { return x + ',' + y; }
