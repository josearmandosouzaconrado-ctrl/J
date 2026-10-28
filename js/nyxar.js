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
    im.src = imgSrc('img/nyxar.png');   // embutida: no APK uma imagem de arquivo bloquearia a leitura dos pixels
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

// ---------- Covil: cavernas ligadas por túneis (não há casas na ilha) ----------
class NyxCave {
  constructor() {
    this.isWorld = false; this.isInterior = false; this.isNyxCave = true; this.dark = true;
    const R = Game.world.regions.find(r => r.id === 'nyxhal');
    this.name = 'Covil da Alcateia Nyxar'; this.regIndex = R ? R.index : 0;
    const W = this.w = 64, H = this.h = 44, r = new RNG(Game.world.seed * 7 + 991);
    this.tiles = new Uint8Array(W * H).fill(T.CWALL); this.objs = new Uint8Array(W * H);
    const carve = (cx, cy, rad) => { for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) if (x > 1 && y > 1 && x < W - 2 && y < H - 2 && (x - cx) ** 2 + ((y - cy) * 1.15) ** 2 <= rad * rad + 0.5) this.tiles[y * W + x] = T.CFLOOR; };
    const tunnel = (a, b) => { let x = a.x, y = a.y; for (let k = 0; k < 300 && (Math.abs(x - b.x) > 1 || Math.abs(y - b.y) > 1); k++) { if (r.chance(0.65)) x += Math.sign(b.x - x); else y += Math.sign(b.y - y); if (r.chance(0.15)) y += r.pick([-1, 1]); x = clamp(x, 3, W - 4); y = clamp(y, 3, H - 4); carve(x, y, 1.3); } };
    // câmara do alfa no centro, três câmaras de entrada (uma para cada boca na ilha) e tocas
    this.hall = { x: W >> 1, y: H >> 1 };
    this.gates = [{ x: 8, y: 9 }, { x: W - 9, y: 13 }, { x: W >> 1, y: H - 7 }];
    this.dens = [{ x: 14, y: H - 12 }, { x: W - 14, y: H - 10 }, { x: 22, y: 6 }, { x: W - 22, y: 6 }];
    carve(this.hall.x, this.hall.y, 7);
    for (const g of this.gates) { carve(g.x, g.y, 3.2); tunnel(g, this.hall); }
    for (const d of this.dens) { carve(d.x, d.y, 3.6); tunnel(d, this.hall); }
    tunnel(this.gates[0], this.dens[2]); tunnel(this.dens[1], this.gates[2]);
    const put = (x, y, o) => { if (this.tiles[y * W + x] === T.CFLOOR && !this.objs[y * W + x]) this.objs[y * W + x] = o; };
    // saídas: cada uma leva a uma boca de caverna diferente na ilha
    this.exits = this.gates.map((g, i) => { let y = g.y - 2; while (y > 2 && this.tiles[(y - 1) * W + g.x] === T.CFLOOR) y--; this.objs[y * W + g.x] = O.STAIRS_UP; return { x: g.x, y, i }; });
    // fogueira e ossos na câmara do alfa; peles, crânios, cristais e cogumelos pelas tocas
    put(this.hall.x, this.hall.y, O.CAMPFIRE);
    for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; put(Math.round(this.hall.x + Math.cos(a) * 4), Math.round(this.hall.y + Math.sin(a) * 3), i % 2 ? O.PELT : O.BONES); }
    for (const d of this.dens) { put(d.x, d.y, O.CAMPFIRE); put(d.x - 2, d.y + 1, O.PELT); put(d.x + 2, d.y - 1, O.PELT); put(d.x + 1, d.y + 2, O.BONES); }
    const isF = (x, y) => this.tiles[y * W + x] === T.CFLOOR;
    for (let k = 0; k < 400; k++) {
      const x = r.int(3, W - 4), y = r.int(3, H - 4); if (!isF(x, y) || this.objs[y * W + x]) continue;
      const wall = !isF(x + 1, y) || !isF(x - 1, y) || !isF(x, y - 1);
      if (wall && r.chance(0.12)) put(x, y, O.CRYSTAL); else if (r.chance(0.03)) put(x, y, r.pick([O.HERB_SHROOM, O.SKULLS, O.BONES]));
    }
    this.canvas = null;
  }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : T.CWALL; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx, old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), 4242);
    // musgo violeta brilhante nas paredes dos túneis
    const r = new RNG(5);
    for (let i = 0; i < 260; i++) { const x = r.int(1, this.w - 2), y = r.int(1, this.h - 2); if (this.tileAt(x, y) === T.CFLOOR && this.tileAt(x, y - 1) !== T.CFLOOR) { ctx.fillStyle = r.chance(0.5) ? 'rgba(150,80,220,0.55)' : 'rgba(60,220,200,0.45)'; ctx.fillRect(x * 16 + r.int(0, 12), y * 16 + r.int(0, 3), r.int(2, 4), 2); } }
    for (let i = 0; i < this.w * this.h; i++) {
      const o = this.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w, y = (i / this.w) | 0, s = Sprites.obj(o, Math.floor(hash2(x, y, 5) * (OBJ_VARIANTS[o] || 1)));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(this.canvas, -camX, -camY);
  }
}

// ---------- Língua Nyxar ----------
// Cada palavra em português vira sempre a mesma palavra Nyxar (o mesmo texto dá a mesma fala).
const NYX_SYL = ['vh', 'zh', 'kr', 'th', 'gh', 'nyx', 'ul', 'ar', 'esh', 'ok', 'ra', 'ze', 'mor', 'ak', 'ith', 'oth', 'vae', 'ruk', 'sha', 'dra', 'kel', 'um', 'zul', 'ora', 'ith', 'gor', 'ash', 'yr'];
Object.assign(Nyxar, {
  word(w) {
    let h = 2166136261; for (const ch of w.toLowerCase()) { h ^= ch.charCodeAt(0); h = Math.imul(h, 16777619) >>> 0; }
    const n = Math.max(1, Math.min(3, Math.round(w.length / 3)));
    let out = '';
    for (let i = 0; i < n; i++) { out += NYX_SYL[(h >>> (i * 5)) % NYX_SYL.length]; if (i === 0 && n > 1 && (h >> 17) % 4 === 0) out += "'"; }
    return out;
  },
  speak(text) {
    let first = true;
    return text.replace(/[A-Za-zÀ-ÿ]+/g, w => { let t = this.word(w); if (first) { t = t[0].toUpperCase() + t.slice(1); first = false; } return t; });
  },
  // fala na língua deles + barra com a tradução
  say(pt) { return `<div class="nyx-fala">${esc(this.speak(pt))}</div><div class="nyx-trad"><b>Tradução</b> ${esc(pt)}</div>`; },
  GREET: ['Forasteiro. Você cheira a sal e a ferro.', 'O vento trouxe você até a nossa ilha.', 'Fale baixo. A alcateia está descansando.', 'Seus olhos não brilham. Você não é dos nossos.', 'Ande devagar perto das tocas, forasteiro.'],
  LORE: ['Vivemos nos túneis desde antes dos reinos terem nome.', 'A alcateia caça junta, dorme junta e morre junta.', 'As veias brilham quando a lua está alta. É assim que nos achamos no escuro.', 'Os reinos do continente já tentaram tomar esta ilha. Nenhum voltou para casa.', 'Ninguém declara guerra à alcateia. Ninguém pisa aqui para conquistar.', "Vhar'Zul é o nosso alfa. Ninguém fala com ele sem ser chamado.", 'A criatura das sombras de Valtheria não é nossa parente. Ela não tem alcateia.', 'Não construímos casas. A pedra da montanha já é a nossa casa.'],
  talk(a) {
    const rng = new RNG(hashStr(a.name) + Game.day), alpha = a.nyxAlpha;
    const greet = alpha ? "Eu sou Vhar'Zul, o alfa. Você pode andar na nossa ilha, mas nunca poderá ficar nela." : rng.pick(this.GREET);
    const back = { label: 'Voltar', fn: () => this.talk(a) };
    UI.dialog(a.name, a.look, `${this.say(greet)}<div class="dim small">(Nyxar${alpha ? ' — alfa da alcateia' : ''})</div>`, [
      { label: 'Perguntar sobre o povo dele', fn: () => UI.dialog(a.name, a.look, this.say(this.LORE[Math.floor(Math.random() * this.LORE.length)]), [back, { label: 'Tchau' }]) },
      { label: 'Pedir para entrar na alcateia', fn: () => UI.dialog(a.name, a.look, this.say('Não. A alcateia é de sangue, não de vontade. Você nunca será um de nós.'), [back, { label: 'Tchau' }]) },
      { label: 'Propor uma troca de mercadorias', fn: () => UI.dialog(a.name, a.look, this.say('Não trocamos nada com quem vem do mar. A ilha e a caçada nos dão tudo.'), [back, { label: 'Tchau' }]) },
      { label: 'Tchau' }
    ]);
  },

  // ---------- Alcateia ----------
  packSettlement() {
    if (this._ps && this._ps.region === Game.world.regions.find(r => r.id === 'nyxhal')) return this._ps;
    const R = Game.world.regions.find(r => r.id === 'nyxhal');
    return (this._ps = { id: 'nyxpack', name: 'Território de Nyxhal', type: 'village', region: R, npcSpots: [], gates: [], buildings: [], mid: { x: ISLE.x, y: ISLE.y } });
  },
  makeMember(x, y, rng, role, alpha) {
    const a = new NPC({ role: role || 'citizen', x, y }, this.packSettlement(), rng);
    a.nyxPack = true; a.home = { x: a.x, y: a.y };
    if (alpha) { a.nyxAlpha = true; a.name = "Vhar'Zul, o Alfa"; a.look = { k: 'nyxar', v: 'ruler', sz: 1.05 }; a.S = Sprites.actor(a.look); a.h = a.S.h; }
    return a;
  },
  // grupos da alcateia vagando perto das bocas das cavernas (aparecem quando o jogador está na ilha)
  manage() {
    const G = Game, W = G.world; if (!G.level.isWorld || !W.nyxCaves) return;
    const P = G.player, on = contAt(P.x / 16, P.y / 16) === 3;
    const has = G.actors.some(a => a.nyxPack);
    if (on && !has) {
      const rng = new RNG(W.seed + G.day * 13);
      for (const c of W.nyxCaves) for (let k = 0; k < 3; k++) { const a = this.makeMember(c.x + rng.int(-5, 5), c.y + 3 + rng.int(0, 5), rng); G.findFree(a); G.actors.push(a); }
    } else if (!on && has) G.actors = G.actors.filter(a => !a.nyxPack);
  },
  // ---------- Bocas das cavernas ----------
  caveImg() {
    if (this._cimg) return this._cimg;
    const c = Sprites.cv(52, 42), x = c.getContext('2d'), p = Sprites.P(x);
    Sprites.ellipse(p, 26, 28, 25, 14, '#3a3440'); Sprites.ellipse(p, 26, 25, 22, 12, '#4c4456'); Sprites.ellipse(p, 18, 19, 8, 4, '#5a5266');
    for (let i = 0; i < 14; i++) p(4 + (i * 17) % 44, 18 + (i * 11) % 18, '#2a2430', 2, 1);
    Sprites.ellipse(p, 26, 31, 11, 9, '#06040a'); p(15, 31, '#06040a', 22, 10);
    for (const [xx, yy] of [[13, 24], [37, 22], [20, 14], [33, 15]]) { p(xx, yy, '#40e8d8', 2, 1); p(xx + 1, yy + 1, '#b070ff', 1, 1); }
    p(10, 36, '#e8dcc0', 3, 1); p(40, 37, '#e8dcc0', 4, 1); p(41, 36, '#e8dcc0', 1, 1);
    Sprites.outline(c, '#0c0810');
    return (this._cimg = c);
  },
  drawables(D, camX, camY, vw, vh) {
    const W = Game.world; if (!Game.level.isWorld || !W.nyxCaves) return;
    for (const c of W.nyxCaves) {
      const x = c.x * 16 + 8 - 26, y = (c.y + 1) * 16 - 42;
      if (x - camX < -60 || y - camY < -60 || x - camX > vw + 10 || y - camY > vh + 10) continue;
      D.push({ y: (c.y + 1) * 16, img: this.caveImg(), x, yy: y });
    }
  },
  findInteract(fx, fy) {
    const W = Game.world; if (!Game.level.isWorld || !W.nyxCaves) return null;
    for (const c of W.nyxCaves) { const d = dist(fx, fy, c.x * 16 + 8, (c.y + 1) * 16); if (d < 24) return { kind: 'nyxcave', c, d, label: 'Entrar', name: 'Túnel da alcateia' }; }
    return null;
  },
  enter(c) {
    const G = Game, P = G.player;
    G.worldPos = { x: c.x * 16 + 8, y: (c.y + 2) * 16 + 6 };
    const L = new NyxCave();
    G.level = L; P.mounted = false;
    const keep = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    G.actors = keep;
    const g = L.exits[c.i] || L.exits[0];
    P.x = g.x * 16 + 8; P.y = (g.y + 2) * 16 + 10; G.findFree(P);
    for (const a of keep) { a.x = P.x + 10; a.y = P.y + 4; G.findFree(a); }
    // a alcateia dentro do covil: o alfa na câmara central e os outros nas tocas
    const rng = new RNG(G.world.seed + G.day * 31);
    const alpha = this.makeMember(L.hall.x + 2, L.hall.y + 1, rng, 'resident', true); alpha.indoor = true; G.findFree(alpha); G.actors.push(alpha);
    for (const d of L.dens) for (let k = 0; k < 3; k++) { const a = this.makeMember(d.x + rng.int(-2, 2), d.y + rng.int(-1, 2), rng, 'resident'); a.indoor = true; G.findFree(a); a.home = { x: a.x, y: a.y }; G.actors.push(a); }
    for (let k = 0; k < 4; k++) { const a = this.makeMember(L.hall.x + rng.int(-5, 5), L.hall.y + rng.int(-3, 3), rng, 'resident'); a.indoor = true; G.findFree(a); a.home = { x: a.x, y: a.y }; G.actors.push(a); }
    G.projectiles = []; G.clouds = []; G.pickups = []; G.timers = G.timers.filter(t => t.keep);
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    Sfx.play('door'); UI.fade(); G.toast('Você entra nos túneis da alcateia Nyxar...', '#c0a0ff');
  },
  // sair por qualquer saída leva à boca de caverna correspondente na ilha
  exitAt(tx, ty) {
    const L = Game.level, W = Game.world;
    let best = L.exits[0], bd = Infinity;
    for (const e of L.exits) { const d = dist(e.x, e.y, tx, ty); if (d < bd) { bd = d; best = e; } }
    const c = W.nyxCaves[best.i]; if (c) Game.worldPos = { x: c.x * 16 + 8, y: (c.y + 2) * 16 + 6 };
  }
});
