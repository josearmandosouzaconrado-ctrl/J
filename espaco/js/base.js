'use strict';
// ===================== CRÔNICAS ESTELARES: utilitários =====================
const clamp = (v, a, b) => v < a ? a : v > b ? b : v;
const lerp = (a, b, t) => a + (b - a) * t;
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const angDiff = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
function mulberry32(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
class RNG {
  constructor(seed) { this.f = mulberry32((seed >>> 0) || 1); }
  next() { return this.f(); }
  range(a, b) { return a + (b - a) * this.f(); }
  int(a, b) { return a + Math.floor(this.f() * (b - a + 1)); }
  pick(arr) { return arr[Math.floor(this.f() * arr.length)]; }
  chance(p) { return this.f() < p; }
}
function hash2(x, y, s) { let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263) + Math.imul(s | 0, 982451653)) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); h ^= h >>> 16; return (h >>> 0) / 4294967296; }
function hashStr(str) { let h = 2166136261; for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619); return h >>> 0; }
const _G = [1, 1, -1, 1, 1, -1, -1, -1, 1, 0, -1, 0, 0, 1, 0, -1], _F2 = 0.5 * (Math.sqrt(3) - 1), _G2 = (3 - Math.sqrt(3)) / 6;
class Simplex {
  constructor(seed) { const r = new RNG(seed), p = []; for (let i = 0; i < 256; i++) p[i] = i; for (let i = 255; i > 0; i--) { const j = Math.floor(r.next() * (i + 1)); [p[i], p[j]] = [p[j], p[i]]; } this.p = new Uint8Array(512); for (let i = 0; i < 512; i++) this.p[i] = p[i & 255]; }
  noise(x, y) {
    const p = this.p, s = (x + y) * _F2, i = Math.floor(x + s), j = Math.floor(y + s), t = (i + j) * _G2, x0 = x - (i - t), y0 = y - (j - t);
    const i1 = x0 > y0 ? 1 : 0, j1 = 1 - i1, x1 = x0 - i1 + _G2, y1 = y0 - j1 + _G2, x2 = x0 - 1 + 2 * _G2, y2 = y0 - 1 + 2 * _G2, ii = i & 255, jj = j & 255;
    const c = (tx, ty, g) => { let q = 0.5 - tx * tx - ty * ty; if (q < 0) return 0; q *= q; g = (g & 7) * 2; return q * q * (_G[g] * tx + _G[g + 1] * ty); };
    return 70 * (c(x0, y0, p[ii + p[jj]]) + c(x1, y1, p[ii + i1 + p[jj + j1]]) + c(x2, y2, p[ii + 1 + p[jj + 1]]));
  }
}
function fbm(ns, x, y, o) { let a = 1, f = 1, s = 0, n = 0; for (let k = 0; k < o; k++) { s += a * ns.noise(x * f, y * f); n += a; a *= 0.5; f *= 2.03; } return s / n; }
function hexToRgb(h) { if (h[0] === '#') h = h.slice(1); if (h.length === 3) h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2]; const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; }
function rgbToHex(r, g, b) { return '#' + ((1 << 24) | (clamp(r | 0, 0, 255) << 16) | (clamp(g | 0, 0, 255) << 8) | clamp(b | 0, 0, 255)).toString(16).slice(1); }
const _sh = new Map();
function shade(hex, amt) { const k = hex + amt; let v = _sh.get(k); if (v) return v; const [r, g, b] = hexToRgb(hex); v = amt >= 0 ? rgbToHex(r + (255 - r) * amt, g + (255 - g) * amt, b + (255 - b) * amt) : rgbToHex(r * (1 + amt), g * (1 + amt), b * (1 + amt)); _sh.set(k, v); return v; }
function mix(a, b, t) { const A = hexToRgb(a), B = hexToRgb(b); return rgbToHex(lerp(A[0], B[0], t), lerp(A[1], B[1], t), lerp(A[2], B[2], t)); }
function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
const fmt = n => Math.floor(n).toLocaleString('pt-BR');
// ---------- pixel art ----------
const Px = {
  cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; },
  P(ctx) { return (x, y, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(x | 0, y | 0, w, h); }; },
  ellipse(p, cx, cy, rx, ry, col) { for (let y = Math.floor(cy - ry); y <= Math.ceil(cy + ry); y++) { const t = (y + 0.5 - cy) / ry; if (Math.abs(t) > 1) continue; const w = rx * Math.sqrt(1 - t * t), a = Math.round(cx - w), b = Math.round(cx + w); if (b > a) p(a, y, col, b - a, 1); } },
  outline(c, col = '#0a0c16') {
    const x = c.getContext('2d'), w = c.width, h = c.height, img = x.getImageData(0, 0, w, h), d = img.data, o = new Uint8ClampedArray(d), [r, g, b] = hexToRgb(col);
    for (let y = 0; y < h; y++) for (let i = 0; i < w; i++) { const k = (y * w + i) * 4; if (d[k + 3] > 40) continue; if ((i > 0 && d[k - 1] > 120) || (i < w - 1 && d[k + 7] > 120) || (y > 0 && d[k - w * 4 + 3] > 120) || (y < h - 1 && d[k + w * 4 + 3] > 120)) { o[k] = r; o[k + 1] = g; o[k + 2] = b; o[k + 3] = 255; } }
    x.putImageData(new ImageData(o, w, h), 0, 0); return c;
  },
  flip(c) { const f = Px.cv(c.width, c.height), x = f.getContext('2d'); x.translate(c.width, 0); x.scale(-1, 1); x.drawImage(c, 0, 0); return f; },
  // versões giradas de um sprite (para as naves), com pixels nítidos
  giros(c, n) {
    const out = [], S = Math.ceil(Math.hypot(c.width, c.height)) + 2;
    for (let i = 0; i < n; i++) { const o = Px.cv(S, S), x = o.getContext('2d'); x.imageSmoothingEnabled = false; x.translate(S / 2, S / 2); x.rotate(i / n * Math.PI * 2); x.drawImage(c, -c.width / 2, -c.height / 2); out.push(o); }
    return out;
  }
};
