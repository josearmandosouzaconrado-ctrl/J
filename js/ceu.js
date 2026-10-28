'use strict';
// ===================== SERAPHEL: A CIDADE DOS ANJOS ACIMA DAS NUVENS =====================
// Os anjos vivem numa ilha de nuvem muito acima do mundo. Os reinos nem sabem que eles
// existem e eles não fazem diplomacia com ninguém. A única subida é o Pilar de Luz do Vale
// Cósmico de Xar'Qin. Para conquistar um anjo é preciso vencer, em duelo, o Quarto Serafim do
// Coro; depois disso o anjo escolhido aceita namorar ou casar. Anjos quase nunca querem filhos.
const CORO = [
  { n: 1, name: 'Seraphiel', title: 'o Primeiro Serafim', sex: 'm', v: 4 },
  { n: 2, name: 'Azrael', title: 'o Segundo Serafim', sex: 'm', v: 5 },
  { n: 3, name: 'Gabriela', title: 'a Terceira Serafim', sex: 'f', v: 3 },
  { n: 4, name: 'Aurelith', title: 'a Quarta Serafim', sex: 'f', v: 1 },
  { n: 5, name: 'Cassiel', title: 'o Quinto Serafim', sex: 'm', v: 2 },
  { n: 6, name: 'Lumiel', title: 'a Sexta Serafim', sex: 'f', v: 4 },
  { n: 7, name: 'Raziel', title: 'o Sétimo Serafim', sex: 'm', v: 1 }
];
const ANJO_FILHO = 0.06;   // chance de um anjo aceitar ter um filho (por tentativa, uma vez por dia)

class CeuLevel {
  constructor() {
    this.isWorld = false; this.isInterior = false; this.isCeu = true; this.dark = false;
    this.name = 'Seraphel, a Cidade Acima das Nuvens';
    const R = Game.world.regions.find(r => r.id === 'xarqin');
    this.regIndex = R ? R.index : 0;
    const W = this.w = 96, H = this.h = 78, r = new RNG(Game.world.seed * 13 + 777), n = new Simplex(Game.world.seed + 4242);
    this.tiles = new Uint8Array(W * H).fill(T.SKYVOID); this.objs = new Uint8Array(W * H);
    const set = (x, y, t) => { if (x > 0 && y > 0 && x < W - 1 && y < H - 1) this.tiles[y * W + x] = t; };
    const put = (x, y, o) => { if (x > 0 && y > 0 && x < W - 1 && y < H - 1 && !TSOLID[this.tiles[y * W + x]] && !this.objs[y * W + x]) this.objs[y * W + x] = o; };
    const cx = W / 2, cy = 40;
    // a ilha de nuvem (borda recortada pelo ruído)
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
      const dx = (x - cx) / 42, dy = (y - cy) / 34, d = Math.sqrt(dx * dx + dy * dy) + n.noise(x / 9, y / 9) * 0.09;
      if (d < 0.97) set(x, y, T.CLOUD);
    }
    const disk = (x0, y0, rad, t) => { for (let y = Math.floor(y0 - rad); y <= y0 + rad; y++) for (let x = Math.floor(x0 - rad); x <= x0 + rad; x++) if ((x - x0) ** 2 + (y - y0) ** 2 <= rad * rad) set(x, y, t); };
    const rect = (x0, y0, w, h, t) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) set(x, y, t); };
    // avenidas de mármore
    rect(46, 12, 4, 58, T.SKYMARBLE); rect(12, 38, 72, 4, T.SKYMARBLE);
    disk(48, 40, 8, T.SKYMARBLE);
    // chegada: plataforma do Pilar de Luz, no sul
    disk(48, 67, 5, T.SKYMARBLE);
    this.pillar = { x: 48, y: 68 }; this.objs[68 * W + 48] = O.SKYPILLAR;
    this.arrive = { x: 48, y: 64 };
    // o Coro dos Serafins: arena dourada no norte, aberta para o sul
    this.arena = { x: 48, y: 17, r: 10 };
    disk(48, 17, 11, T.SKYMARBLE);
    for (let a = 0; a < Math.PI * 2; a += 0.02) {
      const x = Math.round(48 + Math.cos(a) * 11), y = Math.round(17 + Math.sin(a) * 9);
      if (y > 22 && Math.abs(x - 48) <= 2) continue;
      set(x, y, T.GOLDWALL);
    }
    // templos (blocos de mármore dourado com colunas na frente)
    this.temples = [];
    for (const [tx, ty] of [[18, 29], [70, 29], [18, 46], [70, 46], [27, 57], [61, 57], [30, 22], [60, 22]]) {
      rect(tx - 4, ty - 2, 9, 3, T.GOLDWALL); rect(tx - 4, ty + 1, 9, 3, T.SKYMARBLE);
      put(tx - 4, ty + 2, O.PILLAR); put(tx + 4, ty + 2, O.PILLAR); put(tx, ty + 3, r.chance(0.5) ? O.HARP : O.ANGELSTATUE);
      this.temples.push({ x: tx, y: ty + 2 });
    }
    // fonte celestial na praça, estátuas do Coro em volta
    this.objs[40 * W + 48] = O.SKYFOUNT;
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * 0.42; put(Math.round(48 + Math.cos(a) * 7), Math.round(17 + Math.sin(a) * 6), O.ANGELSTATUE); }
    for (let i = 0; i < 8; i++) { const a = i / 8 * Math.PI * 2 + 0.4; put(Math.round(48 + Math.cos(a) * 6), Math.round(40 + Math.sin(a) * 6), i % 2 ? O.CRYSTAL : O.ANGELSTATUE); }
    // jardins: flores e cristais sobre a nuvem
    for (let k = 0; k < 420; k++) {
      const x = r.int(4, W - 5), y = r.int(4, H - 5);
      if (this.tiles[y * W + x] !== T.CLOUD) continue;
      const ok = this.tiles[(y + 1) * W + x] === T.CLOUD && this.tiles[(y - 1) * W + x] === T.CLOUD;
      if (!ok) continue;
      const h = r.next(); put(x, y, h < 0.55 ? O.FLOWERS : h < 0.75 ? O.TALLGRASS : h < 0.85 ? O.CRYSTAL : h < 0.93 ? O.HERB_BLUE : O.SKYFOUNT);
    }
    this.canvas = null;
  }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : T.SKYVOID; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx, old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), 9191);
    // o céu aberto fica transparente (o fundo é desenhado a cada quadro, com nuvens passando embaixo)
    for (let y = 0; y < this.h; y++) for (let x = 0; x < this.w; x++) if (this.tiles[y * this.w + x] === T.SKYVOID) ctx.clearRect(x * 16, y * 16, 16, 16);
    // a parte de baixo da ilha: a nuvem engrossa e some
    for (let y = 1; y < this.h; y++) for (let x = 0; x < this.w; x++) {
      if (this.tiles[y * this.w + x] !== T.SKYVOID || this.tiles[(y - 1) * this.w + x] === T.SKYVOID) continue;
      const g = ctx.createLinearGradient(0, y * 16, 0, y * 16 + 30);
      g.addColorStop(0, 'rgba(220,228,244,0.95)'); g.addColorStop(1, 'rgba(220,228,244,0)');
      ctx.fillStyle = g; ctx.fillRect(x * 16, y * 16, 16, 30);
    }
    for (let i = 0; i < this.w * this.h; i++) {
      const o = this.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w, y = (i / this.w) | 0, s = Sprites.obj(o, Math.floor(hash2(x, y, 5) * (OBJ_VARIANTS[o] || 1)));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    // céu: azul em cima, dourado no horizonte, e um mar de nuvens lá embaixo passando devagar
    const g = ctx.createLinearGradient(0, 0, 0, vh);
    g.addColorStop(0, '#5a8ee0'); g.addColorStop(0.6, '#a8cdf6'); g.addColorStop(1, '#f6e8c8');
    ctx.fillStyle = g; ctx.fillRect(0, 0, vw, vh);
    const t = Game.t, tex = Ceu.cloudTex();
    for (const [sp, par, al, sc] of [[6, 0.25, 0.55, 2], [14, 0.5, 0.75, 3]]) {
      const tw = tex.width * sc, th = tex.height * sc;
      const ox = -((((camX * par) + t * sp) % tw) + tw) % tw, oy = -(((camY * par) % th) + th) % th;
      ctx.globalAlpha = al;
      for (let yy = oy; yy < vh; yy += th) for (let xx = ox; xx < vw; xx += tw) ctx.drawImage(tex, xx, yy, tw, th);
    }
    ctx.globalAlpha = 1;
    ctx.drawImage(this.canvas, -camX, -camY);
  }
}

const Ceu = {
  state() { const P = Game.player; if (!P.ceu) P.ceu = { won: false, tries: 0, chosen: null, visited: false }; return P.ceu; },
  cloudTex() {
    if (this._ct) return this._ct;
    const N = 96, c = Sprites.cv(N, N), x = c.getContext('2d'), r = new RNG(31);
    for (let i = 0; i < 14; i++) {
      const px = r.range(0, N), py = r.range(0, N), rx = r.range(10, 26), ry = rx * 0.45;
      for (const [dx, dy] of [[0, 0], [N, 0], [-N, 0], [0, N], [0, -N]]) {
        const gg = x.createRadialGradient(px + dx, py + dy, 0, px + dx, py + dy, rx);
        gg.addColorStop(0, 'rgba(255,255,255,0.95)'); gg.addColorStop(0.7, 'rgba(240,244,252,0.6)'); gg.addColorStop(1, 'rgba(240,244,252,0)');
        x.fillStyle = gg; x.save(); x.translate(px + dx, py + dy); x.scale(1, ry / rx); x.beginPath(); x.arc(0, 0, rx, 0, Math.PI * 2); x.fill(); x.restore();
      }
    }
    return (this._ct = c);
  },
  // ---------- Subir e descer pelo Pilar de Luz ----------
  enter(tx, ty) {
    const G = Game, P = G.player, st = this.state();
    G.worldPos = { x: tx * 16 + 8, y: (ty + 2) * 16 + 8 };
    const L = new CeuLevel();
    G.level = L; P.mounted = false;
    const keep = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    G.actors = keep;
    P.x = L.arrive.x * 16 + 8; P.y = L.arrive.y * 16 + 8; G.findFree(P);
    for (const a of keep) { a.x = P.x + 10; a.y = P.y + 4; G.findFree(a); }
    this.populate(L);
    G.projectiles = []; G.clouds = []; G.pickups = []; G.timers = G.timers.filter(t => t.keep);
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    Sfx.play('learn'); UI.fade();
    if (!st.visited) {
      st.visited = true;
      G.centerMsg('SERAPHEL', 'A cidade dos anjos, muito acima das nuvens');
      G.chron('Toquei o Pilar de Luz de Xar\'Qin e fui erguido acima das nuvens até Seraphel, a cidade dos anjos. Nenhum reino sabe que ela existe.');
      P.addXP(400);
    } else G.toast('A luz te ergue de novo até Seraphel...', '#fff0a0');
  },
  leave() {
    const G = Game;
    this.duel = null;
    G.exitDungeon();
    G.toast('A luz te leva de volta para o Vale Cósmico.', '#fff0a0');
  },
  // ---------- Os anjos ----------
  pseudo() {
    const R = Game.world.regions.find(r => r.id === 'xarqin');
    return { id: 'seraphel', name: 'Seraphel', type: 'capital', region: R, npcSpots: [], gates: [], buildings: [], mid: { x: 48, y: 40 } };
  },
  makeAngel(x, y, name, sex, v, rng, extra) {
    const a = new NPC({ role: 'resident', x, y, race: 'anjo' }, this.pseudo(), rng);
    a.sex = sex; a.name = name; a.look = Racas.look('anjo', sex, new RNG(hashStr(name) + v), ANJO_PAPEIS[v] || 'cidadao'); a.S = Sprites.actor(a.look); a.h = a.S.h;
    a.angel = true; a.rid = 'anjo:' + name; a.indoor = true; a.home = { x: a.x, y: a.y };
    Object.assign(a, extra || {});
    return a;
  },
  populate(L) {
    const G = Game, rng = new RNG(G.world.seed * 3 + 1717), st = this.state();
    // o Coro: o Primeiro Serafim na praça; a Quarta no centro da arena; os outros em volta dela
    for (const c of CORO) {
      let x, y;
      if (c.n === 1) { x = 51; y = 40; } else if (c.n === 4) { x = 48; y = 17; } else { const k = [2, 3, 5, 6, 7].indexOf(c.n), a = Math.PI + (k + 0.5) / 5 * Math.PI; x = Math.round(48 + Math.cos(a) * 7); y = Math.round(18 + Math.sin(a) * 5.5); }
      const a = this.makeAngel(x, y, `${c.name}, ${c.title}`, c.sex, c.v, rng, { seraph: c.n });
      a.rid = 'anjo:' + c.name; a.look = Object.assign({}, a.look, { size: c.n === 4 ? 1.12 : 1.06, cape: c.n === 4 ? '#a02040' : '#3a5ab0' }); a.S = Sprites.actor(a.look); a.h = a.S.h;
      if (c.n !== 1) a.role = 'guardpost';   // o Coro não sai da arena
      if (c.n === 4 && this.duel) continue;
      G.findFree(a); G.actors.push(a);
    }
    // o povo de Seraphel: cidadãos, guerreiros, arqueiros, magos, clérigos e assassinos
    const coro = new Set(CORO.map(c => c.name)), used = new Set(), P = G.player;
    for (let i = 0; i < 20; i++) {
      const sex = rng.chance(0.6) ? 'f' : 'm';
      let nm = ''; for (let k = 0; k < 40; k++) { nm = rng.pick(NAMES.anjo[sex]) + ' ' + rng.pick(NAMES.anjo.s); if (!used.has(nm) && !coro.has(nm.split(' ')[0])) break; }
      used.add(nm);
      const v = i < 4 ? 0 : i % 6;
      const spot = i < 8 ? L.temples[i % L.temples.length] : { x: rng.int(20, 76), y: rng.int(26, 58) };
      const a = this.makeAngel(spot.x + rng.int(-2, 2), spot.y + rng.int(0, 2), nm, sex, v, rng);
      a.rid = 'anjo:' + i + ':' + nm;
      // quem casou e desceu para morar na casa do jogador não está mais em Seraphel
      if (P.spouse === a.rid && P.spouseHome) continue;
      G.findFree(a); G.actors.push(a);
    }
    void st;
  },
  GREET: ['Um mortal em Seraphel? O Pilar de Luz não se abre para qualquer um.', 'Você cheira a terra e a fumaça. Fique longe das nossas harpas.', 'Respire devagar. O ar aqui em cima é fino para quem vem de baixo.', 'Os de baixo nunca chegam até aqui. Como você subiu?', 'Que a luz te guarde... enquanto estiver aqui.'],
  LORE: ['Seraphel flutua acima das nuvens desde antes dos primeiros reinos.', 'Nós não temos rei. Temos o Coro: sete serafins, do mais forte ao mais fraco.', 'Os reinos lá de baixo não sabem que existimos. E é melhor assim.', 'Não fazemos alianças, tratados nem guerras. Diplomacia é coisa de quem tem medo.', 'Anjos vivem séculos. Filhos? Quase nenhum de nós quer ter. É raro um anjo aceitar.', 'Quem quiser o coração de um anjo precisa antes vencer a Quarta Serafim, Aurelith, em duelo.', 'O Pilar de Luz é a única ponte entre Seraphel e o mundo de baixo.'],
  talk(a) {
    const P = Game.player, st = this.state();
    a.talkT = 3;
    if (a.seraph === 4) return this.talkAurelith(a);
    if (a.seraph === 1) return this.talkFirst(a);
    const r = P.rel[a.rid];
    if (r && (r.status === 'dating' || r.status === 'married' || P.spouse === a.rid)) return UI.personal(a);
    const back = { label: 'Voltar', fn: () => this.talk(a) };
    const opts = [
      { label: 'Perguntar sobre Seraphel', fn: () => UI.dialog(a.name, a.look, esc(this.LORE[Math.floor(Math.random() * this.LORE.length)]), [back, { label: 'Tchau' }]) },
      { label: 'Propor uma aliança com os reinos', fn: () => UI.dialog(a.name, a.look, 'Anjos não fazem diplomacia. Não assinamos tratados, não mandamos embaixadores e não entramos nas guerras de vocês. Os reinos nem sabem que existimos — e assim vai continuar.', [back, { label: 'Tchau' }]) }
    ];
    if (!a.seraph) {
      if (!st.won) opts.push({ label: 'Flertar 💕', fn: () => UI.dialog(a.name, a.look, 'Hm. Uma criatura de baixo flertando com um anjo? Primeiro prove o seu valor: vença a Quarta Serafim, Aurelith, no duelo do Coro. Até lá, nem pense nisso.', [back, { label: 'Tchau' }]) });
      else if (!st.chosen && !P.spouse) opts.push({ label: `Escolher ${a.name.split(' ')[0]} para ficar com você 💕`, cls: 'gold', fn: () => this.choose(a) });
      else if (!st.chosen && P.spouse) opts.push({ label: 'Flertar 💕', fn: () => UI.dialog(a.name, a.look, 'Você venceu Aurelith, eu sei. Mas você já tem alguém lá embaixo. Anjos não dividem ninguém.', [back, { label: 'Tchau' }]) });
    }
    opts.push({ label: 'Tchau' });
    UI.dialog(a.name, a.look, `${esc(st.won ? 'Você venceu Aurelith... o Coro inteiro fala de você, mortal.' : this.GREET[Math.floor(Math.random() * this.GREET.length)])}<div class="dim small">(Anjo de Seraphel)</div>`, opts);
  },
  talkFirst(a) {
    const st = this.state();
    UI.dialog(a.name, a.look, st.won
      ? 'Aurelith caiu diante de você. O Coro reconhece a sua força, mortal. Escolha quem quiser entre nós: se o anjo aceitar, será seu.'
      : 'Eu sou Seraphiel, o Primeiro do Coro. Somos sete, do mais forte ao mais fraco. Se deseja algo de um anjo — amizade, amor, qualquer coisa — vença primeiro a Quarta, Aurelith, na arena ao norte. Não lute contra os três primeiros: você não sobreviveria.', [
      { label: 'Quem é o Coro?', fn: () => UI.dialog(a.name, a.look, CORO.map(c => `<b>${c.n}º</b> ${esc(c.name)}, ${esc(c.title)}`).join('<br>'), [{ label: 'Voltar', fn: () => this.talkFirst(a) }]) },
      { label: 'Tchau' }
    ]);
  },
  talkAurelith(a) {
    const P = Game.player, st = this.state(), r = P.rel[a.rid];
    if (r && (r.status === 'dating' || r.status === 'married' || P.spouse === a.rid)) return UI.personal(a);
    if (st.won) {
      const opts = [];
      if (!st.chosen && !P.spouse) opts.push({ label: 'Escolher Aurelith para ficar com você 💕', cls: 'gold', fn: () => this.choose(a) });
      opts.push({ label: 'Tchau' });
      return UI.dialog(a.name, a.look, 'Você me venceu de forma justa. Faz séculos que ninguém me derruba. O Coro respeita você agora.', opts);
    }
    UI.dialog(a.name, a.look, `Eu sou Aurelith, a Quarta Serafim do Coro. Quer o coração de um anjo? Então me vença.${st.tries ? `<div class="dim small">(Você já tentou ${st.tries} ${st.tries > 1 ? 'vezes' : 'vez'}.)</div>` : ''}<div class="dim small">Duelo até a rendição: ninguém morre na arena do Coro. Nível recomendado: 30+.</div>`, [
      { label: '⚔ Desafiar Aurelith para um duelo', cls: 'danger', fn: () => { UI.close(); this.startDuel(a); } },
      { label: 'Ainda não', fn: () => UI.close() }
    ]);
  },
  // ---------- O duelo contra a Quarta Serafim ----------
  startDuel(npc) {
    const G = Game, P = G.player, st = this.state();
    st.tries = (st.tries || 0) + 1;
    npc.dead = true; G.actors = G.actors.filter(x => x !== npc);
    const lvl = Math.max(30, P.level + 3);
    const m = new Monster('serafim_quarto', npc.x, npc.y, lvl, { name: 'Aurelith, a Quarta Serafim' });
    m.ceuDuel = true; m.target = P; m.aggro = 600;
    G.actors.push(m);
    this.duel = { m, t: 0 };
    G.centerMsg('DUELO DO CORO', 'Aurelith, a Quarta Serafim');
    Sfx.play('boom'); G.shake = 6;
  },
  // ninguém morre no duelo: quem chegaria a zero se rende
  duelGuard(t) {
    const d = this.duel; if (!d || !Game.level.isCeu) return false;
    if (t === Game.player) { t.hp = 1; this.endDuel(false); return true; }
    if (t === d.m) { t.hp = 1; this.endDuel(true); return true; }
    return false;
  },
  endDuel(won) {
    const G = Game, P = G.player, d = this.duel, st = this.state(); if (!d) return;
    this.duel = null;
    const m = d.m;
    G.actors = G.actors.filter(a => a !== m && !(a.master === m) && a.eid !== 'anjo_guerreiro');
    G.projectiles = [];
    const rng = new RNG(G.world.seed * 3 + 1717);
    const c = CORO[3], a = this.makeAngel(Math.floor(m.x / 16), Math.floor(m.y / 16), `${c.name}, ${c.title}`, c.sex, c.v, rng, { seraph: 4 });
    a.rid = 'anjo:' + c.name; a.role = 'guardpost'; a.look = Object.assign({}, a.look, { size: 1.12, cape: '#a02040' }); a.S = Sprites.actor(a.look); a.h = a.S.h;
    G.findFree(a); G.actors.push(a);
    if (won) {
      const first = !st.won; st.won = true;
      P.hp = Math.max(P.hp, P.stat.maxHp * 0.3);
      Sfx.play('levelup');
      for (let i = 0; i < 40; i++) G.particle(m.x + (Math.random() - 0.5) * 40, m.y - 10, (Math.random() - 0.5) * 40, -40 - Math.random() * 60, Math.random() < 0.5 ? '#fff8d0' : '#ffe080', 1.4, 2);
      G.centerMsg('VITÓRIA NO CORO!', 'Aurelith, a Quarta Serafim, se rende');
      if (first) {
        P.addXP(2500); P.gold += 1500; P.addItem(Items.make('pena_celestial', 3));
        G.chron('Venci Aurelith, a Quarta Serafim, no duelo do Coro de Seraphel. Agora posso escolher um anjo para ficar comigo.');
        setTimeout(() => UI.dialog(a.name, a.look, 'Você... me venceu. Faz séculos que ninguém consegue. O Coro reconhece a sua força.<br><br>Escolha um de nós — até mesmo eu — e, se quiser, esse anjo será seu: como namorado(a) ou como esposo(a).', [{ label: 'Entendido' }]), 900);
      }
    } else {
      P.hp = Math.max(1, Math.round(P.stat.maxHp * 0.25));
      G.centerMsg('VOCÊ SE RENDEU', 'Aurelith baixa a espada');
      setTimeout(() => UI.dialog(a.name, a.look, 'Levante-se. Ninguém morre na arena do Coro. Volte quando estiver mais forte.', [{ label: 'Voltarei' }]), 900);
    }
  },
  tick(dt) {
    const d = this.duel; if (!d) return;
    if (!Game.level.isCeu) { this.duel = null; return; }
    d.t += dt;
    if (d.m.dead) this.endDuel(true);
  },
  // ---------- Romance: o anjo escolhido vira namorado(a) ou esposo(a) ----------
  choose(a) {
    const P = Game.player, st = this.state();
    const r = UI.relOf(a);
    const f = a.sex === 'f';
    UI.dialog(a.name, a.look, `${f ? 'Ela' : 'Ele'} olha para você por um longo tempo, com as asas fechadas.<br><br>"Você venceu o Coro. Eu aceito. Mas como você me quer ao seu lado?"`, [
      { label: f ? 'Como minha namorada 💕' : 'Como meu namorado 💕', cls: 'gold', fn: () => {
        st.chosen = a.rid; r.status = 'dating'; r.aff = Math.max(r.aff, 70);
        Sfx.play('quest'); Game.centerMsg('UM ANJO AO SEU LADO 💕', `${a.name.split(',')[0]} agora namora você`);
        Game.chron(`${a.name.split(',')[0]}, um anjo de Seraphel, aceitou namorar comigo.`);
        UI.dialog(a.name, a.look, 'Então está decidido. Quando quiser, peça minha mão — com um Amuleto da Aurora, como fazem lá embaixo.', [{ label: '💕', fn: () => UI.close() }]);
      } },
      { label: f ? 'Como minha esposa 💍' : 'Como meu marido 💍', cls: 'gold', fn: () => {
        st.chosen = a.rid; r.status = 'married'; r.aff = 100; P.spouse = a.rid;
        if (P.houses.length) P.spouseHome = P.houses[0];
        Sfx.play('levelup');
        for (let i = 0; i < 40; i++) Game.particle(P.x + (Math.random() - 0.5) * 40, P.y - 10, (Math.random() - 0.5) * 40, -40 - Math.random() * 60, Math.random() < 0.5 ? '#ff80b0' : '#fff0a0', 1.4, 2);
        Game.centerMsg('VOCÊS SE CASARAM! 💍', `${P.name} e ${a.name.split(',')[0]}`);
        Game.chron(`Casei com ${a.name.split(',')[0]}, um anjo de Seraphel, depois de vencer o Coro.`);
        P.addXP(200);
        UI.dialog(a.name, a.look, `${P.spouseHome ? 'Vou descer com você e morar na sua casa. ' : 'Quando você tiver uma casa lá embaixo, eu desço para morar com você. '}Só uma coisa: anjos quase nunca aceitam ter filhos. Não espere muito disso.`, [{ label: 'Te amo!', fn: () => UI.close() }]);
      } },
      { label: 'Pensar melhor', fn: () => UI.close() }
    ]);
  },
  // anjos quase nunca aceitam ter filhos (chance muito pequena, uma tentativa por dia)
  babyTry(r) {
    if (r.race !== 'anjo') return true;
    r.babyTryDay = Game.day;
    return Math.random() < ANJO_FILHO;
  },
  // feixe do Pilar de Luz (o sprite é bem mais alto que os outros objetos)
  drawables(D, camX, camY, vw, vh) {
    const L = Game.level; let p = null;
    if (L.isWorld && Game.world.skyPillar) p = Game.world.skyPillar; else if (L.isCeu) p = L.pillar;
    if (!p) return;
    const by = p.y * 16 + 16, top = by - 140;
    if (p.x * 16 + 30 < camX || p.x * 16 - 30 > camX + vw || top > camY + vh || by < camY) return;
    // o objeto normal só é desenhado quando a base está perto da tela: aqui cobre o resto
    if (by > camY + vh + 3 * 16) { const s = Sprites.obj(O.SKYPILLAR, 0, 0); D.push({ y: by - 1, img: s.c, x: p.x * 16 + 8 - (s.w >> 1), yy: by - s.h + s.oy }); }
    if (Math.random() < 0.5) Game.particle(p.x * 16 + 8 + (Math.random() - 0.5) * 12, by - Math.random() * 120, 0, -20 - Math.random() * 20, Math.random() < 0.5 ? '#fff8d0' : '#ffffff', 1.2, 1, 0);
  }
};
