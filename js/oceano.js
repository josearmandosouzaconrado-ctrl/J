'use strict';
// =====================================================================
//  OCEANO REALISTA (renderizado no Blender)
//  O mar do mundo ganha ondas de verdade: uma simulação de oceano do
//  Blender (modificador Ocean, ondas FFT com espuma), fotografada de cima
//  em 24 quadros que emendam sem costura no espaço e no tempo
//  (tools/blender/oceano.py + folha_oceano.py -> img/oceano.webp).
//  No mar fundo ela cobre a água inteira; na água rasa fica translúcida,
//  deixando aparecer o tom claro do raso, e se afasta da areia na beira.
//  A espuma da beira e os brilhos (visual2.js) continuam por cima.
//  Desliga junto com o "Visual top" e no Modo leve.
// =====================================================================
const Oceano = {
  T: 384, N: 24, COLS: 6, FPS: 8, ok: false,
  carregar() {
    const im = new Image();
    // a folha inteira fica uma vez só na memória (sem uma cópia por quadro)
    const pronto = f => { this.folha = f; this.ok = true; };
    im.onload = () => { if (typeof createImageBitmap === 'function') createImageBitmap(im).then(pronto, () => pronto(im)); else pronto(im); };
    im.src = typeof imgSrc === 'function' ? imgSrc('img/oceano.webp') : 'img/oceano.webp';
  },
  // Desenha numa tela à parte: o oceano inteiro, depois uma máscara de profundidade (um pixel por
  // quadradinho, ampliada com suavização: o raso vira fundo aos poucos, sem degraus) e por fim
  // recorta só a água (recuando 3 px da areia) para não cobrir a praia.
  desenhar(ctx, camX, camY, vw, vh) {
    if (!this.ok) return;
    const G = Game, W = G.world, T = this.T;
    const tx0 = Math.floor(camX / 16) - 1, ty0 = Math.floor(camY / 16) - 1, nx = Math.ceil(vw / 16) + 3, ny = Math.ceil(vh / 16) + 3;
    const k = Math.floor(G.t * this.FPS) % this.N, chave = tx0 + ',' + ty0 + ',' + nx + ',' + ny;
    // refaz só quando a onda muda de quadro (8x/s) ou a câmera passa para outro quadradinho
    if (this._chave !== chave || this._k !== k || this._W !== W) { if (!this._refazer(G, W, T, tx0, ty0, nx, ny, k, chave)) return; }
    if (!this._tem) return;
    ctx.save(); ctx.translate(tx0 * 16 - camX, ty0 * 16 - camY); ctx.clip(this._recorte); ctx.drawImage(this.of, 0, 0); ctx.restore();
  },
  _refazer(G, W, T, tx0, ty0, nx, ny, k, chave) {
    const mudouLugar = this._chave !== chave || this._W !== W;
    this._chave = chave; this._k = k; this._W = W;
    if (mudouLugar || !this.mk) {
    // máscara
    if (!this.mk || this.mk.width !== nx || this.mk.height !== ny) { this.mk = document.createElement('canvas'); this.mk.width = nx; this.mk.height = ny; this.mkd = this.mk.getContext('2d').createImageData(nx, ny); this.vals = new Float32Array(nx * ny); this.tipos = new Uint8Array(nx * ny); }
    const val = this.vals, tip = this.tipos; let tem = false;
    for (let j = 0; j < ny; j++) { const ty = ty0 + j, cy = ty >> 5; for (let i = 0; i < nx; i++) {
      const tx = tx0 + i; let v = 0;
      if (tx >= 0 && ty >= 0) { const m = Visual2.trecho(W, tx >> 5, cy); v = m.length ? m[(ty - cy * 32) * 32 + (tx - (tx >> 5) * 32)] : 0; }
      tip[j * nx + i] = v; val[j * nx + i] = !v ? -1 : (v & 32) ? 0.97 : 0.5; if (v) tem = true;
    } }
    this._tem = tem; if (!tem) return true;
    const d = this.mkd.data;
    for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) {
      let a = val[j * nx + i];
      if (a < 0) { a = 0; for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const ii = i + di, jj = j + dj; if (ii >= 0 && jj >= 0 && ii < nx && jj < ny) a = Math.max(a, val[jj * nx + ii]); } }
      d[(j * nx + i) * 4 + 3] = a * 255;
    }
    this.mk.getContext('2d').putImageData(this.mkd, 0, 0);
    }
    if (!this._tem) return true;
    const tip = this.tipos;
    // oceano na tela à parte
    const ow = nx * 16, oh = ny * 16;
    if (!this.of || this.of.width !== ow || this.of.height !== oh) { this.of = document.createElement('canvas'); this.of.width = ow; this.of.height = oh; }
    const o = this.of.getContext('2d');
    const ox = -((((tx0 * 16) % T) + T) % T), oy = -((((ty0 * 16) % T) + T) % T);
    const fx = (k % this.COLS) * T, fy = Math.floor(k / this.COLS) * T;
    o.globalCompositeOperation = 'copy';
    for (let y = oy; y < oh; y += T) for (let x = ox; x < ow; x += T) { o.drawImage(this.folha, fx, fy, T, T, x, y, T, T); o.globalCompositeOperation = 'source-over'; }
    o.globalCompositeOperation = 'destination-in'; o.imageSmoothingEnabled = true; o.drawImage(this.mk, 0, 0, ow, oh);
    o.globalCompositeOperation = 'source-over';
    // recorte: só a água (em coordenadas da tela à parte; só muda quando a câmera troca de quadradinho)
    if (mudouLugar || !this._recorte) {
      const P = new Path2D();
      for (let j = 0; j < ny; j++) {
        let ini = -1; const y = j * 16;
        for (let i = 0; i <= nx; i++) {
          const v = i < nx ? tip[j * nx + i] : 0;
          if (v && !(v & 30)) { if (ini < 0) ini = i; continue; }
          if (ini >= 0) { P.rect(ini * 16, y, (i - ini) * 16, 16); ini = -1; }
          if (v) { const l = v & 8 ? 3 : 0, r = v & 16 ? 3 : 0, t = v & 2 ? 3 : 0, b = v & 4 ? 3 : 0; P.rect(i * 16 + l, y + t, 16 - l - r, 16 - t - b); }
        }
      }
      this._recorte = P;
    }
    return true;
  }
};
Oceano.carregar();
(function () {
  // o oceano vem antes dos brilhos e da espuma da beira
  const d0 = Visual2.desenharAgua;
  Visual2.desenharAgua = function (ctx, camX, camY, vw, vh) {
    try { Oceano.desenhar(ctx, camX, camY, vw, vh); } catch (e) { }
    return d0.apply(this, arguments);
  };
})();
