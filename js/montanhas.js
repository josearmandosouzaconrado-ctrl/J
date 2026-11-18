'use strict';
// =====================================================================
//  MONTANHAS E PEDRAS REALISTAS (Blender)
//  • Volume das montanhas: cada maciço ganha altura (mais alto longe da
//    beira, com cristas irregulares) e é sombreado como relevo de verdade:
//    faces viradas para o sol (noroeste) claras, as do outro lado escuras.
//  • Paredão: a frente das montanhas é um penhasco de rocha renderizado no
//    Blender (rocha, pico nevado e cânion), emendável na horizontal.
//  • Pedras e rochedos modelados em 3D no Blender, 3 variações cada
//    (cinza, gelo e arenito), com sombra no chão.
//  (tools/blender/montanhas.py + folha_montanhas.py -> img/montanha.png)
//  Pintado uma vez por trecho; no Modo leve volta ao pixel art.
// =====================================================================
const Montanhas = {
  ok: false, img: null, sprites: {},
  PAREDE: null, MACICO: null,
  ligado() { return this.ok && typeof Visual !== 'undefined' && Visual.ligado(); },
  carregar() {
    const im = new Image();
    im.onload = () => {
      this.img = im; this.ok = true;
      // pedras: 12 células de 32x28 (pedra, rochedo, gelo, arenito x 3)
      const tipos = [O.ROCK, O.BOULDER, O.ICEROCK, O.SANDROCK];
      tipos.forEach((id, i) => {
        this.sprites[id] = [0, 1, 2].map(v => {
          const k = i * 3 + v, c = document.createElement('canvas'); c.width = 32; c.height = 28;
          c.getContext('2d').drawImage(im, (k % 12) * 32, 48, 32, 28, 0, 0, 32, 28);
          return { c, oy: 1, w: 32, h: 28 };
        });
        OBJ_VARIANTS[id] = 3;
      });
      try { if (Game.world && Game.world.canvases) Game.world.canvases.clear(); } catch (e) { }
    };
    im.src = typeof imgSrc === 'function' ? imgSrc('img/montanha.png') : 'img/montanha.png';
  },
  // ---------- volume dos maciços ----------
  _rd: null,
  relevo(W, job) {
    const M = this.MACICO, G = 6, N = 32 + G * 2, x0 = job.cx * 32, y0 = job.cy * 32;
    const mt = new Uint8Array(N * N); let tem = false;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const t = job.getT(i - G, j - G); if (M[t]) { mt[j * N + i] = 1; if (i >= G && j >= G && i < G + 32 && j < G + 32) tem = true; } }
    if (!tem) return;
    // distância até a beira (chanfro 3-4), em quadradinhos
    const d = new Float32Array(N * N), INF = 1e9;
    for (let k = 0; k < N * N; k++) d[k] = mt[k] ? INF : 0;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const k = j * N + i; if (!d[k]) continue; let v = d[k]; if (i > 0) v = Math.min(v, d[k - 1] + 3); if (j > 0) { v = Math.min(v, d[k - N] + 3); if (i > 0) v = Math.min(v, d[k - N - 1] + 4); if (i < N - 1) v = Math.min(v, d[k - N + 1] + 4); } d[k] = v; }
    for (let j = N - 1; j >= 0; j--) for (let i = N - 1; i >= 0; i--) { const k = j * N + i; if (!d[k]) continue; let v = d[k]; if (i < N - 1) v = Math.min(v, d[k + 1] + 3); if (j < N - 1) { v = Math.min(v, d[k + N] + 3); if (i < N - 1) v = Math.min(v, d[k + N + 1] + 4); if (i > 0) v = Math.min(v, d[k + N - 1] + 4); } d[k] = v; }
    // altura: sobe a partir da beira, com cristas (ruído "dobrado") que fazem picos e vales
    const ns = this._ns || (this._ns = new Simplex(9137)), h = new Float32Array(N * N);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i; if (!mt[k]) continue;
      const wx = x0 + i - G, wy = y0 + j - G, dist = Math.min(d[k] / 3, 9);
      const crista = 1 - Math.abs(ns.noise(wx / 9, wy / 9)), fino = ns.noise(wx / 3.1, wy / 3.1) * 0.35;
      h[k] = Math.pow(dist, 0.85) * (0.45 + 1.1 * crista * crista * crista) + fino;
    }
    // sombreado (sol do noroeste) num quadro de 1 pixel por quadradinho
    const c = this._rc || (this._rc = (() => { const q = document.createElement('canvas'); q.width = N; q.height = N; return q; })());
    const g = c.getContext('2d'), im = this._rd || (this._rd = g.createImageData(N, N)), px = im.data;
    const L = [-0.6, -0.6, 0.53];
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const k = j * N + i, o = k * 4;
      if (!mt[k] || i === 0 || j === 0 || i === N - 1 || j === N - 1) { px[o + 3] = 0; continue; }
      const dx = (h[k + 1] - h[k - 1]) / 2, dy = (h[k + N] - h[k - N]) / 2, nl = Math.hypot(dx, dy, 1);
      let s = ((-dx) * L[0] + (-dy) * L[1] + L[2]) / nl - L[2];
      s = Math.max(-1, Math.min(1, s * 2.4));
      if (s >= 0) { px[o] = 255; px[o + 1] = 236; px[o + 2] = 200; px[o + 3] = Math.min(255, s * 85); }
      else { px[o] = 16; px[o + 1] = 20; px[o + 2] = 40; px[o + 3] = Math.min(255, -s * 215); }
    }
    g.putImageData(im, 0, 0);
    // só no topo das montanhas (o paredão da frente fica de fora)
    const P = new Path2D();
    for (let j = 0; j < 32; j++) for (let i = 0; i < 32; i++) { const k = (j + G) * N + i + G; if (mt[k] && mt[k + N]) P.rect(i * 16, j * 16, 16, 16); }
    const ctx = job.ctx; ctx.save(); ctx.clip(P); ctx.imageSmoothingEnabled = true; ctx.drawImage(c, -G * 16 + 8 - 8, -G * 16, N * 16, N * 16); ctx.restore();
  }
};
Montanhas.MACICO = new Uint8Array(128); [T.ROCK, T.SNOWROCK, T.CRYSTALROCK, T.CANYON].forEach(t => Montanhas.MACICO[t] = 1);
Montanhas.PAREDE = { [T.ROCK]: 0, [T.SNOWROCK]: 1, [T.CANYON]: 2 };
Montanhas.carregar();
(function () {
  const S = Sprites, p0 = S.pintaParede, o0 = S.obj;
  S.pintaParede = function (ctx, t, v, x, y, ox = 0, oy = 0) {
    const r = Montanhas.PAREDE[t];
    if (r === undefined || !Montanhas.ligado()) return p0.apply(this, arguments);
    const sx = ((((x + ox) * 16) % 384) + 384) % 384;
    ctx.drawImage(Montanhas.img, sx, r * 16, 16, 16, x * 16, y * 16, 16, 16);
  };
  S.obj = function (id, v = 0, frame = 0) {
    const L = Montanhas.sprites[id];
    if (L && Montanhas.ligado()) return L[v % 3];
    return o0.apply(this, arguments);
  };
  const f0 = World.prototype.finishChunk;
  World.prototype.finishChunk = function (job) {
    if (Montanhas.ligado()) { try { Montanhas.relevo(this, job); } catch (e) { console.warn('montanhas', e); } }
    return f0.apply(this, arguments);
  };
})();
