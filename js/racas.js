'use strict';
// ===================== AS RAÇAS DE ELYNDRA E OS ANJOS =====================
// Os sprites vêm das folhas de arte originais (tools/extrair_racas.py -> img/racas.png).
// Cada raça tem de 6 a 8 figuras diferentes: cada morador usa uma delas. Os anjos têm
// uma figura por papel: cidadão, guerreiro, arqueiro, mago, clérigo e assassino.
const ANJO_PAPEIS = ['cidadao', 'guerreiro', 'arqueiro', 'mago', 'clerigo', 'assassino'];
const Racas = {
  img: null, ready: false, cache: new Map(),
  load() {
    const im = new Image();
    im.onload = () => { this.img = im; this.ready = true; };
    im.src = 'img/racas.png';
  },
  // recorta a figura da folha; as costas são a mesma figura espelhada, mais escura e sem brilho
  src(race, v, back) {
    const key = 'src|' + race + '|' + v + '|' + (back ? 1 : 0);
    let c = this.cache.get(key); if (c) return c;
    const list = RACAS_FRAMES[race] || RACAS_FRAMES.voralis, b = RACAS_BOXES[list[((v % list.length) + list.length) % list.length]];
    c = Sprites.cv(b[2], b[3]); const x = c.getContext('2d');
    x.drawImage(this.img, b[0], b[1], b[2], b[3], 0, 0, b[2], b[3]);
    if (back) {
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
      for (let i = 0; i < p.length; i += 4) if (p[i + 3]) { const l = (p[i] + p[i + 1] + p[i + 2]) / 3; p[i] = (p[i] * 0.45 + l * 0.15); p[i + 1] = (p[i + 1] * 0.45 + l * 0.15); p[i + 2] = (p[i + 2] * 0.5 + l * 0.15); }
      x.putImageData(d, 0, 0);
    }
    this.cache.set(key, c);
    return c;
  },
  frame(src, flip, dy, dx, sc) {
    const w = Math.max(1, Math.round(src.width * sc)), h = Math.max(1, Math.round(src.height * sc));
    const c = Sprites.cv(w + 2, h + 1), x = c.getContext('2d');
    x.imageSmoothingEnabled = false;
    if (flip) { x.translate(w + 2, 0); x.scale(-1, 1); }
    x.drawImage(src, 1 + (dx || 0), 1 - (dy || 0), w, h);
    return c;
  },
  sheet(L) {
    if (!this.ready) return this.placeholder(L);
    const sc = L.sz || 1, key = L.r + '|' + (L.v | 0) + '|' + sc;
    let S = this.cache.get(key);
    if (S) return S;
    const front = this.src(L.r, L.v | 0, false), back = this.src(L.r, L.v | 0, true);
    const F = (s, flip, dy, dx) => this.frame(s, flip, dy, dx, sc);
    S = {
      type: 'hum', white: {},
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
    const k = 'ph|' + L.r;
    let ph = this.cache.get(k);
    if (!ph) {
      const col = { anjo: '#f0e8d0', voralis: '#40a0e0', zephyran: '#e8dcc8', thaldrim: '#9080e0', silvano: '#6a9a3a', krazul: '#c04a20', nimbor: '#8a70c0', vaelith: '#c0905a', xarqin: '#6a40c0', brumario: '#5a90d0', terralux: '#c0a060' }[L.r] || '#a0a0a0';
      const c = Sprites.cv(20, 34), x = c.getContext('2d');
      x.fillStyle = col; x.fillRect(5, 8, 10, 24); x.beginPath(); x.arc(10, 6, 5, 0, Math.PI * 2); x.fill();
      const a = [c, c, c];
      ph = { type: 'hum', white: {}, down: a, up: a, left: a, right: a, w: 20, h: 34, placeholder: true, real: () => this.ready ? this.sheet(L) : null };
      this.cache.set(k, ph);
    }
    return ph;
  },
  // aparência de um morador (usada por npcLook)
  look(race, sex, rng, role) {
    const n = (RACAS_FRAMES[race] || []).length || 1;
    if (race === 'anjo') {
      const v = role === 'guard' ? 1 : role === 'archer' ? 2 : role === 'mage' ? 3 : role === 'cleric' ? 4 : role === 'assassin' ? 5 : rng.pick([0, 0, 4, 3]);
      return { k: 'raca', r: 'anjo', v, sz: role === 'kid' || role === 'child' ? 0.55 : sex === 'f' ? 0.86 : 0.92 };
    }
    // guardas e governantes usam as figuras mais imponentes (as últimas de cada folha são as armaduras)
    if (role === 'ruler') return { k: 'raca', r: race, v: n - 1, sz: 1.12 };
    if (role === 'guard') return { k: 'raca', r: race, v: n - 1 - rng.int(0, Math.min(2, n - 1)), sz: 1.04 };
    return { k: 'raca', r: race, v: rng.int(0, n - 1), sz: role === 'kid' || role === 'child' ? 0.58 : sex === 'f' ? 0.9 : 1 };
  }
};
// aparência de qualquer raça desenhada a partir de arte (Nyxar ou as raças de Elyndra)
function sheetLook(race, sex, rng, role) { return race === 'nyxar' ? Nyxar.look(sex, rng, role) : Racas.look(race, sex, rng, role); }
