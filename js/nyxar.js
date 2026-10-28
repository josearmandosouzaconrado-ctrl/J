'use strict';
// ===================== RAÇA NYXAR =====================
// Povo chifrudo das sombras que vive só na Ilha de Nyxhal. O sprite vem da arte
// original (tools/extrair_nyxar.py -> img/nyxar.png). Cada morador ganha uma cor de
// veias; guardas são maiores com veias carmesim e o governante tem veias douradas.
const NYXAR_VEINS = ['#40e8d8', '#b070ff', '#58e890', '#68b8ff'];
const Nyxar = {
  img: null, ready: false, cache: new Map(),
  load() {
    const im = new Image();
    im.onload = () => { this.img = im; this.ready = true; };
    im.src = 'img/nyxar.png';
  },
  // pinta as veias turquesa com outra cor (mantendo o brilho de cada pixel)
  recolor(src, col, back) {
    const c = Sprites.cv(src.width, src.height), x = c.getContext('2d');
    x.drawImage(src, 0, 0);
    const d = x.getImageData(0, 0, c.width, c.height), p = d.data, [cr, cg, cb] = hexToRgb(col);
    for (let i = 0; i < p.length; i += 4) {
      if (!p[i + 3]) continue;
      const r = p[i], g = p[i + 1], b = p[i + 2];
      const teal = g > 110 && b > 100 && r < 120, eye = b > 150 && r > 110 && g < 110;
      if (teal) { const k = Math.min(1.2, g / 220); p[i] = cr * k; p[i + 1] = cg * k; p[i + 2] = cb * k; if (back) { p[i] *= 0.7; p[i + 1] *= 0.7; p[i + 2] *= 0.7; } }
      else if (back) {
        // costas: sem rosto (olhos apagados) e corpo mais escuro
        if (eye) { p[i] = 40; p[i + 1] = 28; p[i + 2] = 52; }
        else { p[i] *= 0.62; p[i + 1] *= 0.6; p[i + 2] *= 0.66; }
      }
    }
    x.putImageData(d, 0, 0);
    return c;
  },
  // quadro com balanço: dy sobe o corpo, dx inclina para o lado
  frame(src, flip, dy, dx, sc) {
    const w = Math.round(src.width * sc), h = Math.round(src.height * sc);
    const c = Sprites.cv(w + 2, h + 1), x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    if (flip) { x.translate(w + 2, 0); x.scale(-1, 1); }
    x.drawImage(src, 1 + (dx || 0), 1 - (dy || 0), w, h);
    return c;
  },
  sheet(L) {
    const v = L.v === undefined ? 0 : L.v, sc = L.sz || 1, key = v + '|' + sc;
    if (!this.ready) return this.placeholder(L);
    let S = this.cache.get(key);
    if (S) return S;
    const col = v === 'guard' ? '#ff4060' : v === 'ruler' ? '#f0c040' : NYXAR_VEINS[v % NYXAR_VEINS.length];
    const front = this.recolor(this.img, col, false), back = this.recolor(this.img, col, true);
    const F = (src, flip, dy, dx) => this.frame(src, flip, dy, dx, sc);
    S = {
      type: 'hum', white: {},
      // a arte olha para baixo e para a esquerda: frente/esquerda usam a arte, direita é o espelho
      down: [F(front), F(front, false, 1), F(front, false, 1, 1)],
      left: [F(front), F(front, false, 1, -1), F(front, false, 1)],
      right: [F(front, true), F(front, true, 1, 1), F(front, true, 1)],
      up: [F(back, true), F(back, true, 1), F(back, true, 1, 1)]
    };
    S.w = S.down[0].width; S.h = S.down[0].height;
    this.cache.set(key, S);
    return S;
  },
  placeholder(L) {
    const c = Sprites.cv(40, 46), x = c.getContext('2d');
    x.fillStyle = '#2a2236'; x.beginPath(); x.ellipse(20, 28, 15, 17, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = '#e8dcc0'; x.fillRect(8, 6, 4, 8); x.fillRect(28, 6, 4, 8); x.fillStyle = '#b060ff'; x.fillRect(15, 18, 3, 2); x.fillRect(22, 18, 3, 2);
    const a = [c, c, c];
    return { type: 'hum', white: {}, down: a, up: a, left: a, right: a, w: 40, h: 46, placeholder: true, real: () => this.ready ? this.sheet(L) : null };
  },
  // aparência de um morador (usada por npcLook)
  look(sex, rng, role) {
    if (role === 'ruler') return { k: 'nyxar', v: 'ruler', sz: 1 };
    if (role === 'guard') return { k: 'nyxar', v: 'guard', sz: 1 };
    return { k: 'nyxar', v: rng.int(0, NYXAR_VEINS.length - 1), sz: sex === 'f' ? 0.78 : role === 'child' || role === 'kid' ? 0.55 : 0.86 };
  }
};
