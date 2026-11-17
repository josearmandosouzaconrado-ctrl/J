'use strict';
// ===================== MONTARIAS (modelos do Blockbench) =====================
// Cavalo, burro, cavalo de guerra, corcel élfico, alce e camelo foram modelados em cubos no formato
// do Blockbench (tools/blockbench/modelos/*.bbmodel, dá para abrir e editar no Blockbench) e
// renderizados em pixel art (tools/blockbench/render_cavalos.py + folha_cavalos.py -> img/cavalos.png).
// Folha: uma faixa por montaria; 12 quadros: lado 0-2 | frente 0-2 | cabeça 0-2 | costas 0-2.
// O lobo gigante continua com o desenho de antes.
const Cavalos3D = {
  ORDEM: ['cavalo', 'burro', 'cavalo_guerra', 'corcel', 'alce', 'camelo'],
  CW: 46, CH: 50, img: null, ok: false, cache: {},
  carregar() {
    const im = new Image();
    im.onload = () => { this.img = im; this.ok = true; this.cache = {}; };
    im.src = imgSrc('img/cavalos.png');
  },
  quadro(v, i) {
    const c = Sprites.cv(this.CW, this.CH);
    c.getContext('2d').drawImage(this.img, i * this.CW, v * this.CH, this.CW, this.CH, 0, 0, this.CW, this.CH);
    return c;
  },
  // recorta as sobras transparentes, mantendo o centro da célula no meio e os cascos embaixo
  recorta(lista) {
    let x0 = this.CW, x1 = 0, y0 = this.CH;
    for (const c of lista) {
      const d = c.getContext('2d').getImageData(0, 0, c.width, c.height).data;
      for (let y = 0; y < c.height; y++) for (let x = 0; x < c.width; x++) if (d[(y * c.width + x) * 4 + 3]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; }
    }
    const m = this.CW / 2, meia = Math.ceil(Math.max(m - x0, x1 + 1 - m)), a = Math.max(0, Math.floor(m - meia)), w = Math.min(this.CW, meia * 2), h = this.CH - y0;
    return lista.map(c => { const o = Sprites.cv(w, h); o.getContext('2d').drawImage(c, a, y0, w, h, 0, 0, w, h); return o; });
  },
  sheet(kind) {
    if (this.cache[kind]) return this.cache[kind];
    const v = this.ORDEM.indexOf(kind);
    const q = i => this.quadro(v, i);
    const lado = this.recorta([0, 1, 2].map(q));
    const fc = this.recorta([3, 4, 5, 6, 7, 8].map(q));          // frente e cabeça com o mesmo recorte (ficam alinhadas)
    const costas = this.recorta([9, 10, 11].map(q));
    const H = { right: lado, left: lado.map(Sprites.flip), down: fc.slice(0, 3), frente: fc.slice(3, 6), up: costas, modelo: 'blockbench' };
    return (this.cache[kind] = H);
  }
};
(function () {
  Cavalos3D.carregar();
  const h0 = Sprites.horse;
  Sprites.horse = function (kind = 'cavalo') {
    if (!Cavalos3D.ok || !Cavalos3D.ORDEM.includes(kind)) return h0.apply(this, arguments);   // lobo gigante, ou enquanto a imagem carrega
    return Cavalos3D.sheet(kind);
  };
})();
