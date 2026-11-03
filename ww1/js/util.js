'use strict';
// Utilidades: matemática, números aleatórios com semente e ruído procedural.
const WW1 = window.WW1 = {};

WW1.clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
WW1.clamp01 = v => (v < 0 ? 0 : v > 1 ? 1 : v);
WW1.lerp = (a, b, t) => a + (b - a) * t;
WW1.smooth = (a, b, x) => { const t = WW1.clamp01((x - a) / (b - a)); return t * t * (3 - 2 * t); };
WW1.rand = (a, b) => a + Math.random() * (b - a);
WW1.moveTowards = (v, target, step) => (Math.abs(target - v) <= step ? target : v + Math.sign(target - v) * step);
WW1.angleDelta = (a, b) => { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; };
WW1.moveAngle = (a, b, step) => { const d = WW1.angleDelta(a, b); return Math.abs(d) <= step ? b : a + Math.sign(d) * step; };

// Gerador com semente (mulberry32)
WW1.RNG = function (seed) {
  let s = seed >>> 0;
  const next = () => {
    s = (s + 0x6D2B79F5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  next.range = (a, b) => a + next() * (b - a);
  next.int = n => Math.floor(next() * n);
  return next;
};

function hash2(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h & 0xffffff) / 16777215;
}

WW1.hash = hash2;

// Ruído de valor suave (com período opcional para texturas sem emenda)
WW1.vnoise = function (x, y, seed, period) {
  const xi = Math.floor(x), yi = Math.floor(y);
  let fx = x - xi, fy = y - yi;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);
  let x0 = xi, x1 = xi + 1, y0 = yi, y1 = yi + 1;
  if (period) {
    x0 = ((x0 % period) + period) % period; x1 = ((x1 % period) + period) % period;
    y0 = ((y0 % period) + period) % period; y1 = ((y1 % period) + period) % period;
  }
  const a = hash2(x0, y0, seed), b = hash2(x1, y0, seed), c = hash2(x0, y1, seed), d = hash2(x1, y1, seed);
  return (a + (b - a) * fx) + ((c + (d - c) * fx) - (a + (b - a) * fx)) * fy;
};

// Fractal periódico em u,v de 0 a 1
WW1.fbm = function (u, v, basePeriod, octaves, seed) {
  let sum = 0, amp = 0.5, norm = 0, p = basePeriod;
  for (let o = 0; o < octaves; o++) {
    sum += amp * WW1.vnoise(u * p, v * p, seed + o * 31, p);
    norm += amp; amp *= 0.5; p *= 2;
  }
  return sum / norm;
};

// Ruído contínuo para o relevo (centrado em 0)
WW1.noise2 = (x, y, seed) => WW1.vnoise(x, y, seed, 0) - 0.5;
