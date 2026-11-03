'use strict';
// Texturas procedurais (lama com relevo, tecido, madeira, aniagem, metal, partículas).
(function () {
  const T = WW1.tex = {};

  function canvasTex(size, fn, srgb, repeat) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const ctx = c.getContext('2d');
    const img = ctx.createImageData(size, size);
    const d = img.data;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const col = fn((x + 0.5) / size, (y + 0.5) / size);
        const i = (y * size + x) * 4;
        d[i] = col[0] * 255; d[i + 1] = col[1] * 255; d[i + 2] = col[2] * 255;
        d[i + 3] = (col[3] === undefined ? 1 : col[3]) * 255;
      }
    }
    ctx.putImageData(img, 0, 0);
    const t = new THREE.CanvasTexture(c);
    if (repeat !== false) { t.wrapS = t.wrapT = THREE.RepeatWrapping; }
    if (srgb) t.encoding = THREE.sRGBEncoding;
    t.anisotropy = 4;
    return t;
  }

  function normalTex(h, size, strength) {
    return canvasTex(size, (u, v) => {
      const x = Math.floor(u * size), y = Math.floor(v * size);
      const l = h[y * size + (x - 1 + size) % size], r = h[y * size + (x + 1) % size];
      const dn = h[((y + 1) % size) * size + x], up = h[((y - 1 + size) % size) * size + x];
      let nx = (l - r) * strength, ny = (dn - up) * strength, nz = 1;
      const len = Math.hypot(nx, ny, nz);
      return [nx / len * 0.5 + 0.5, ny / len * 0.5 + 0.5, nz / len * 0.5 + 0.5, 1];
    }, false);
  }

  const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const S = WW1.smooth;

  T.init = function () {
    // Lama: cor + mapa de normais
    const MS = 512, mh = new Float32Array(MS * MS), mc = [];
    for (let y = 0; y < MS; y++) {
      for (let x = 0; x < MS; x++) {
        const u = (x + 0.5) / MS, v = (y + 0.5) / MS;
        const big = WW1.fbm(u, v, 6, 5, 11), fine = WW1.fbm(u, v, 48, 2, 12);
        const stones = S(0.78, 0.86, WW1.vnoise(u * 96, v * 96, 13, 96));
        mh[y * MS + x] = big * 0.65 + fine * 0.25 + stones * 0.25;
        const wet = WW1.fbm(u, v, 3, 4, 14), clay = WW1.fbm(u, v, 5, 3, 15);
        let c = mix([0.20, 0.16, 0.12], [0.40, 0.33, 0.24], Math.min(1, big * 0.8 + fine * 0.3));
        c = mix(c, [0.40, 0.38, 0.33], S(0.55, 0.75, clay) * 0.6);
        c = mix(c, [0.36, 0.34, 0.30], stones * 0.5);
        const k = WW1.lerp(1, 0.62, S(0.52, 0.72, wet));
        mc.push([c[0] * k, c[1] * k, c[2] * k]);
      }
    }
    T.mud = canvasTex(MS, (u, v) => mc[Math.floor(v * MS) * MS + Math.floor(u * MS)], true);
    T.mudN = normalTex(mh, MS, 5);

    T.cloth = canvasTex(128, (u, v) => {
      const n = WW1.fbm(u, v, 16, 3, 21);
      const weave = 0.5 + 0.5 * Math.sin(u * Math.PI * 128) * Math.sin(v * Math.PI * 128);
      let g = 0.8 + 0.16 * n + 0.05 * weave;
      g *= WW1.lerp(1, 0.78, S(0.55, 0.8, WW1.fbm(u, v, 4, 3, 22)));
      return [g, g * 0.98, g * 0.95];
    }, true);

    T.wood = canvasTex(256, (u, v) => {
      const warp = WW1.fbm(u, v, 4, 4, 31) * 6;
      const s = 0.5 + 0.5 * Math.sin((u * 24 + warp) * Math.PI * 2);
      const n = WW1.fbm(u, v, 32, 2, 32);
      let c = mix([0.30, 0.22, 0.15], [0.46, 0.36, 0.25], s * 0.6 + n * 0.4);
      return mix(c, [0.40, 0.39, 0.35], 0.35);
    }, true);

    T.burlap = canvasTex(128, (u, v) => {
      const wx = Math.abs(Math.sin(u * Math.PI * 48)), wy = Math.abs(Math.sin(v * Math.PI * 48));
      const weave = (Math.floor(u * 48) + Math.floor(v * 48)) % 2 ? wy : wx;
      let c = [0.56, 0.49, 0.36].map(x => x * (0.8 + 0.2 * weave));
      return mix(c, [0.30, 0.25, 0.18], S(0.45, 0.75, WW1.fbm(u, v, 4, 4, 41)));
    }, true);

    T.metal = canvasTex(128, (u, v) => {
      const n = WW1.fbm(u, v, 8, 4, 51);
      const rust = S(0.55, 0.75, WW1.fbm(u, v, 4, 4, 52));
      const c = mix([0.26, 0.27, 0.26], [0.36, 0.36, 0.34], n);
      return mix(c, [0.38, 0.21, 0.12], rust * 0.8);
    }, true);

    T.soft = canvasTex(64, (u, v) => {
      const d = Math.hypot(u - 0.5, v - 0.5) * 2, a = WW1.clamp01(1 - d);
      return [1, 1, 1, a * a];
    }, false, false);

    T.puff = canvasTex(128, (u, v) => {
      const d = Math.hypot(u - 0.5, v - 0.5) * 2;
      const n = WW1.fbm(u, v, 4, 4, 61);
      const a = WW1.clamp01(1 - d * (0.75 + n * 0.6));
      const sh = 0.75 + 0.25 * WW1.fbm(u, v, 8, 3, 62);
      return [sh, sh, sh, a * a];
    }, false, false);
  };
})();
