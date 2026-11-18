'use strict';
// =====================================================================
//  TERRENO REALISTA (texturas do Blender + relevo sombreado)
//  • O chão (grama, bosque, areia, terra, neve, deserto, rocha, pico
//    nevado, tundra, lama, pântano, terra morta, terra vermelha, cinzas)
//    vem de texturas renderizadas no Blender com relevo de verdade
//    (tools/blender/terrenos.py + folha_terrenos.py -> img/terreno.webp),
//    emendáveis e presas ao mundo (o mesmo ponto sempre tem o mesmo chão).
//  • As bordas entre terrenos usam a textura do vizinho no formato ondulado
//    de antes (transição natural em vez de faixa de cor lisa).
//  • Relevo: a altura do mapa (a mesma que cria montanhas e vales) vira luz
//    e sombra nas encostas, com o sol vindo do noroeste.
//  Tudo é pintado uma vez por trecho e guardado (não pesa por quadro).
//  No Modo leve (ou com o "Visual top" desligado) o chão volta ao pixel art.
// =====================================================================
const Terreno = {
  T: 384, ORDEM: ['GRASS', 'DGRASS', 'SAND', 'DIRT', 'SNOW', 'DESERT', 'ROCK', 'SNOWROCK', 'TUNDRA', 'MUD', 'SWAMP', 'DEADGRASS', 'BADLAND', 'ASH'],
  tex: [], ok: false,
  ligado() { return this.ok && typeof Visual !== 'undefined' && Visual.ligado(); },
  carregar() {
    const im = new Image();
    // uma folha só na memória (sem cópia por terreno); cada terreno guarda onde está na folha
    const pronto = folha => {
      this.folha = folha;
      this.ORDEM.forEach((n, i) => { this.tex[T[n]] = { x: (i % 4) * this.T, y: Math.floor(i / 4) * this.T }; });
      this.ok = true;
      // trechos já pintados com o chão antigo são refeitos
      try { if (Game.world && Game.world.canvases) Game.world.canvases.clear(); } catch (e) { }
    };
    im.onload = () => { if (typeof createImageBitmap === 'function') createImageBitmap(im).then(pronto, () => pronto(im)); else pronto(im); };
    im.src = typeof imgSrc === 'function' ? imgSrc('img/terreno.webp') : 'img/terreno.webp';
  },
  borda: null,
  // ---------- relevo ----------
  _alt: new Map(),
  altura(W, x, y) {
    const k = x * 65536 + y; let e = this._alt.get(k);
    if (e === undefined) {
      const t = W.baseTile(x, y); e = TWATER[t] ? -1 : W._e;
      if (this._alt.size > 20000) this._alt.clear();
      this._alt.set(k, e);
    }
    return e;
  },
  // desenha luz e sombra do relevo num trecho de 32x32 (pontos a cada 4 quadradinhos, ampliados com suavização)
  relevo(W, ctx, x0, y0) {
    const N = 11, P = 4, img = this._rimg || (this._rimg = (() => { const c = document.createElement('canvas'); c.width = N; c.height = N; return c; })());
    const g = img.getContext('2d'), d = this._rdat || (this._rdat = g.createImageData(N, N));
    const E = new Float32Array((N + 2) * (N + 2));
    for (let j = 0; j < N + 2; j++) for (let i = 0; i < N + 2; i++) E[j * (N + 2) + i] = this.altura(W, x0 - 8 + i * P, y0 - 8 + j * P);
    const L = [-0.62, -0.62, 0.48];                         // sol do noroeste
    let algo = false;
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      const c = E[(j + 1) * (N + 2) + i + 1], o = (j * N + i) * 4;
      if (c < 0) { d.data[o + 3] = 0; continue; }
      const ex = (Math.max(0, E[(j + 1) * (N + 2) + i + 2]) - Math.max(0, E[(j + 1) * (N + 2) + i])) / (2 * P);
      const ey = (Math.max(0, E[(j + 2) * (N + 2) + i + 1]) - Math.max(0, E[j * (N + 2) + i + 1])) / (2 * P);
      const K = 200, nx = -ex * K, ny = -ey * K, nl = Math.hypot(nx, ny, 1);
      let s = (nx * L[0] + ny * L[1] + L[2]) / nl - L[2];
      s = Math.max(-1, Math.min(1, s * 1.6));
      // montanhas altas ganham um pouco mais de contraste
      const forte = c > 0.7 ? 1.35 : 1;
      if (s >= 0) { d.data[o] = 255; d.data[o + 1] = 244; d.data[o + 2] = 214; d.data[o + 3] = Math.min(255, s * 60 * forte); }
      else { d.data[o] = 18; d.data[o + 1] = 22; d.data[o + 2] = 48; d.data[o + 3] = Math.min(255, -s * 85 * forte); }
      if (Math.abs(s) > 0.02) algo = true;
    }
    if (!algo) return;
    g.putImageData(d, 0, 0);
    ctx.save(); ctx.imageSmoothingEnabled = true; ctx.drawImage(img, -88, -88, N * 64, N * 64); ctx.restore();
  }
};
Terreno.carregar();
(function () {
  const S = Sprites, c0 = S.pintaChao, b0 = S.pintaBorda;
  S.pintaChao = function (ctx, t, v, x, y, ox = 0, oy = 0) {
    const tx = Terreno.ligado() && Terreno.tex[t];
    if (!tx) return c0.apply(this, arguments);
    const T = Terreno.T, sx = ((((x + ox) * 16) % T) + T) % T, sy = ((((y + oy) * 16) % T) + T) % T;
    ctx.drawImage(Terreno.folha, tx.x + sx, tx.y + sy, 16, 16, x * 16, y * 16, 16, 16);
  };
  // borda: o formato ondulado de antes, preenchido com a textura do vizinho
  S.pintaBorda = function (ctx, n, k, ev, x, y, ox = 0, oy = 0, img) {
    const tx = Terreno.ligado() && Terreno.tex[n];
    if (!tx) return b0.apply(this, arguments);
    const c = Terreno.borda || (Terreno.borda = (() => { const q = document.createElement('canvas'); q.width = 16; q.height = 16; return q; })());
    const g = c.getContext('2d'), T = Terreno.T, sx = ((((x + ox) * 16) % T) + T) % T, sy = ((((y + oy) * 16) % T) + T) % T;
    g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, 16, 16); g.drawImage(img, 0, 0);
    g.globalCompositeOperation = 'source-in'; g.drawImage(Terreno.folha, tx.x + sx, tx.y + sy, 16, 16, 0, 0, 16, 16);
    g.globalCompositeOperation = 'source-over';
    ctx.drawImage(c, x * 16, y * 16);
  };
  // relevo sombreado: logo depois do chão, antes das coisas fixas (árvores, pedras) serem assadas no trecho
  const f0 = World.prototype.finishChunk;
  World.prototype.finishChunk = function (job) {
    if (Terreno.ligado()) { try { Terreno.relevo(this, job.ctx, job.cx * 32, job.cy * 32); } catch (e) { } }
    return f0.apply(this, arguments);
  };
})();
