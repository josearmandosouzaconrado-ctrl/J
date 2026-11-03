'use strict';
// ===================== ESTAÇÕES DO ANO =====================
// O ano tem 60 dias e o inverno é longo (24 dias): o jogo começa no meio dele, com tudo branco.
// A neve gruda aos poucos no chão, nos telhados, nas árvores e nas pedras, e derrete no fim do
// inverno. Andar (e cavalgar) na neve é mais lento. No inverno quase não há caça: os animais
// somem, a comida fica cara (principalmente nas vilas) e as fazendas não produzem. Na primavera
// os bichos voltam devagar.
const ESTACOES = [
  { id: 'inverno', nome: 'Inverno', icon: '❄', dias: 24 },
  { id: 'primavera', nome: 'Primavera', icon: '🌱', dias: 12 },
  { id: 'verao', nome: 'Verão', icon: '☀', dias: 12 },
  { id: 'outono', nome: 'Outono', icon: '🍂', dias: 12 }
];
const ANO_DIAS = ESTACOES.reduce((s, e) => s + e.dias, 0);
const INICIO_ANO = 5;   // o dia 1 do jogo cai no 6º dia do inverno (já com neve alta)
// biomas quentes ou estranhos demais para nevar
const SEM_NEVE = new Set(['desert', 'volcanic', 'savanna', 'dusk', 'obsidian', 'reef', 'cosmic', 'dead', 'crystal']);
// chão que fica coberto (e quanto: estradas e pisos de cidade são pisoteados)
const CHAO_NEVE = new Map([[T.GRASS, 1], [T.DGRASS, 1], [T.TUNDRA, 1], [T.DEADGRASS, 1], [T.ELFGRASS, 1], [T.DIRT, 0.9], [T.MUD, 0.8], [T.WINDGRASS, 1], [T.LIVEMOSS, 1], [T.MISTHEATH, 1], [T.ROAD, 0.4], [T.FARM, 1]]);
const MIUDOS = new Set([O.FLOWERS, O.TALLGRASS, O.CROP]);   // somem debaixo da neve funda (nada cresce no inverno)

const Estacoes = {
  nivelPintado: -1,
  // dia do ano (0..59) com fração do dia
  diaAno() { const G = Game; return (((G.day || 1) - 1 + INICIO_ANO + (G.time || 0) / 1440) % ANO_DIAS + ANO_DIAS) % ANO_DIAS; },
  atual() { let d = this.diaAno(); for (const e of ESTACOES) { if (d < e.dias) return { e, d }; d -= e.dias; } return { e: ESTACOES[0], d: 0 }; },
  inverno() { return this.atual().e.id === 'inverno'; },
  rotulo() { const { e, d } = this.atual(); return `${e.icon} ${e.nome} ${Math.floor(d) + 1}/${e.dias}`; },
  // quanto do chão está coberto de neve (0..1): cai no outono tardio, enche no inverno e derrete no fim
  cobertura() {
    const { e, d } = this.atual();
    if (e.id === 'inverno') return d < 3 ? 0.35 + d / 3 * 0.65 : d < e.dias - 4 ? 1 : Math.max(0.3, 1 - (d - (e.dias - 4)) / 4 * 0.7);
    if (e.id === 'primavera') return d < 3 ? 0.3 * (1 - d / 3) : 0;
    if (e.id === 'outono') return d > e.dias - 3 ? (d - (e.dias - 3)) / 3 * 0.35 : 0;
    return 0;
  },
  nivel() { return Math.round(this.cobertura() * 5) / 5; },
  quente(ri) { const R = Game.world && Game.world.regions[ri]; return !R || SEM_NEVE.has(R.biome); },
  // este tile está debaixo de neve agora?
  neveEm(tx, ty, t, ri, cob) {
    if (t === T.SNOW) return true;
    const f = CHAO_NEVE.get(t); if (!f) return false;
    if (cob === undefined) cob = this.nivel();
    if (cob <= 0) return false;
    if (ri === undefined) ri = Game.world.regAt(tx, ty);
    if (this.quente(ri) || (typeof Mar !== 'undefined' && Mar.ilhaDe(tx, ty))) return false;
    return hash2(tx, ty, 977) < cob * f * (cob >= 1 ? 1.02 : 0.92);
  },
  // ---------- movimento ----------
  vel(P) {
    const G = Game, L = G.level;
    if (!L || !L.isWorld) return 1;
    const tx = Math.floor(P.x / 16), ty = Math.floor(P.y / 16), t = L.tileAt(tx, ty), cob = this.nivel();
    const naNeve = (cob > 0 || t === T.SNOW) && this.neveEm(tx, ty, t, undefined, cob);
    const frio = this.inverno() && !this.quente(L.regAt(tx, ty));
    if (P.mounted) return naNeve ? 0.62 : frio ? 0.85 : 1;
    return naNeve ? 0.78 : frio ? 0.93 : 1;
  },
  // ---------- caça e comida ----------
  fauna() {
    const { e, d } = this.atual();
    if (e.id === 'inverno') return d < 3 ? 0.5 : 0.15;
    if (e.id === 'primavera') return Math.min(1, 0.25 + d / e.dias * 0.75);
    if (e.id === 'outono') return 0.8;
    return 1;
  },
  colheita() { const id = this.atual().e.id; return id === 'inverno' ? 0 : id === 'primavera' ? 0.7 : id === 'verao' ? 1.3 : 1; },
  precoComida(it) {
    const d = ITEMS[it.id]; if (!d || d.type !== 'food') return 1;
    const f = this.fauna(); if (f >= 0.99) return 1;
    const L = Game.level, s = L && (L.s || (L.b && L.b.settlement));
    const k = !s ? 1.4 : s.type === 'village' ? 2 : s.type === 'town' ? 1.5 : 1.3;
    return 1 + (k - 1) * (1 - f) / 0.85;
  },
  falaInverno() {
    return ['Não há um cervo nessas matas desde que a neve caiu...', 'Os caçadores voltam de mãos vazias. A comida está acabando.', 'Esse inverno não acaba nunca. O celeiro já está pela metade.', 'Cuidado na estrada: a neve está pelo joelho.', 'Meu pai dizia que o inverno longo traz lobos famintos.', 'Pão está pela hora da morte. Carne, então, nem se fala.'][Math.floor(Math.random() * 6)];
  },
  // ---------- desenho: neve no chão, nos objetos e nos telhados ----------
  // o mundo pinta o chão pedindo o tipo de cada tile: no inverno a grama vira neve (com bordas suaves)
  tileVisual(W, tx, ty, t) { return this._cobPintura > 0 && t !== T.SNOW && CHAO_NEVE.has(t) && this.neveEm(tx, ty, t, W.regAt(tx, ty), this._cobPintura) ? T.SNOW : t; },
  // quando a neve muda de nível, os trechos do mapa são repintados
  tick(dt) {
    const W = Game.world; if (!W) return;
    this.chkT = (this.chkT || 0) - dt; if (this.chkT > 0) return; this.chkT = 2;
    const n = this.nivel();
    if (n !== this.nivelPintado) {
      this.nivelPintado = n;
      for (const k of [...W.canvases.keys()]) W.dropCanvas(k);
      W.pending = null;
    }
    const e = this.atual().e.id;
    if (!this.ultima && e === 'inverno' && Game.settings.weather && Game.weather && !Game.weather.kind && Game.level.isWorld) { Game.weather.kind = 'snow'; Game.weather.t = 150; }
    if (this.ultima && this.ultima !== e && Game.started) {
      const msg = { inverno: 'O frio chegou. A neve vai cobrir tudo e a caça vai sumir.', primavera: 'A neve derrete. Os animais começam a voltar às matas.', verao: 'Dias longos e quentes. As fazendas produzem como nunca.', outono: 'As folhas caem. Guarde comida: o inverno aqui é longo.' }[e];
      Game.centerMsg(ESTACOES.find(x => x.id === e).nome.toUpperCase(), msg);
    }
    this.ultima = e;
  },
  // versão com neve por cima de um objeto (árvore, pedra, cerca, poste...)
  objeto(o, v, f, tx, ty) {
    const s = Sprites.obj(o, v, f), cob = this.nivelPintado;
    if (cob < 0.3 || !Game.world || this.quente(Game.world.regAt(tx, ty)) || (typeof Mar !== 'undefined' && Mar.ilhaDe(tx, ty))) return s;
    if (MIUDOS.has(o) && cob >= 0.6) return null;
    const k = cob >= 0.75 ? 2 : 1;
    this._obj = this._obj || new Map();
    const key = s.c;
    let m = this._obj.get(key); if (!m) { m = {}; this._obj.set(key, m); }
    if (!m[k]) m[k] = Object.assign({}, s, { c: this.capa(s.c, k) });
    return m[k];
  },
  // pinta neve nas bordas de cima de um desenho (o contorno fica, a neve fica logo abaixo dele)
  capa(src, k) {
    const c = Sprites.cv(src.width, src.height), x = c.getContext('2d');
    x.drawImage(src, 0, 0);
    const img = x.getImageData(0, 0, c.width, c.height), d = img.data, w = c.width, h = c.height, out = new Uint8ClampedArray(d);
    const put = (px, py, r, g, b) => { const i = (py * w + px) * 4; if (d[i + 3] < 100) return; out[i] = r; out[i + 1] = g; out[i + 2] = b; };
    for (let px = 0; px < w; px++) for (let py = 1; py < h - 1; py++) {
      const i = (py * w + px) * 4;
      if (d[i + 3] < 100 || d[i - w * 4 + 3] > 100) continue;
      // py é uma borda de cima (contorno): neve logo abaixo
      put(px, py + 1, 244, 248, 255);
      if (k > 1 && py + 2 < h) put(px, py + 2, 226, 236, 248);
      if (k > 1 && ((px * 7 + py) % 5 === 0) && py + 3 < h) put(px, py + 3, 214, 226, 242);
    }
    img.data.set(out); x.putImageData(img, 0, 0);
    return c;
  },
  // telhados com neve: as casas já sabem desenhar a versão nevada (como em Nordheim)
  predio(b) {
    if (this.nivelPintado < 0.4 || b.spec.snow) return b.spec;
    if (this.quente(Game.world.regAt(b.tx, b.ty + b.h - 1))) return b.spec;
    if (!b._specNeve) b._specNeve = Object.assign({}, b.spec, { snow: true });
    return b._specNeve;
  },
  tempo(R, r) {
    // no inverno neva bastante nas terras frias e temperadas
    if (!this.inverno() || SEM_NEVE.has(R.biome)) return undefined;
    return r < 0.5 ? 'snow' : r < 0.58 ? 'storm' : null;
  }
};

// ---------- ganchos: o chão do mundo é pintado com a neve da estação ----------
(function () {
  const P = World.prototype, paint0 = P.paintRows;
  P.paintRows = function (job, n) {
    const E = Estacoes;
    E._cobPintura = E.nivelPintado < 0 ? E.nivel() : E.nivelPintado;
    if (E._cobPintura <= 0) return paint0.call(this, job, n);
    const g0 = job.getT, x0 = job.cx * 32, y0 = job.cy * 32, W = this;
    job.getT = (lx, ly) => E.tileVisual(W, x0 + lx, y0 + ly, g0(lx, ly));
    try { return paint0.call(this, job, n); } finally { job.getT = g0; }
  };
  const fin0 = P.finishChunk;
  P.finishChunk = function (job) {
    // objetos "assados" no chão do trecho: pedras ganham neve, flores e capim somem na neve funda
    const E = Estacoes;
    if (E.nivelPintado < 0.3) return fin0.call(this, job);
    const { ch, ctx, c, k } = job, x0 = job.cx * 32, y0 = job.cy * 32;
    for (let i = 0; i < 1024; i++) {
      const o = ch.objs[i]; if (!OBJ_BAKED[o]) continue;
      const lx = i & 31, ly = i >> 5, nv = OBJ_VARIANTS[o] || 1;
      const s = E.objeto(o, Math.floor(hash2(x0 + lx, y0 + ly, 5) * nv), 0, x0 + lx, y0 + ly); if (!s) continue;
      ctx.drawImage(s.c, lx * 16 + 8 - (s.w >> 1), ly * 16 + 16 - s.h + s.oy);
    }
    this.canvases.set(k, c);
    if (this.canvases.size > 20) this.dropCanvas(this.canvases.keys().next().value);
    return c;
  };
})();
