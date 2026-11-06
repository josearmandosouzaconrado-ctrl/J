'use strict';
// =====================================================================
//  CRIADOR DE BATALHAS (SÓ NO MODO ADM)
//  No painel ADM, aba ⚔ Batalhas: escolha um cenário (planície, floresta,
//  deserto, neve, travessia do rio, cerco ao castelo, praia, trincheiras ou
//  cidade em ruínas), o reino de cada lado, a hora e o clima. No editor:
//  toque numa unidade da barra de baixo (com a imagem dela), escolha o lado
//  (🔴 ou 🔵) e quantas (1, 5, 10 ou 20 em formação) e toque no mapa para
//  colocar. Arraste para mover a câmera. Depois ▶ Começar e assista; dá para
//  pausar, acelerar, recomeçar com as mesmas tropas e mandar reforços.
//  O APK normal nem leva este arquivo.
// =====================================================================
if (typeof IS_ADM !== 'undefined' && IS_ADM) (function () {
  const BW = 96, BH = 56;
  // ---------- os cenários ----------
  const pinta = (L, x0, y0, w, h, t) => { for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) if (L.inb(x, y)) L.tiles[y * L.w + x] = t; };
  const obj = (L, x, y, o) => { if (L.inb(x, y)) L.objs[y * L.w + x] = o; };
  const espalha = (L, r, n, lista, ok) => { for (let i = 0; i < n; i++) { const x = r.int(1, L.w - 2), y = r.int(1, L.h - 2); if (ok && !ok(x, y)) continue; if (!TSOLID[L.tiles[y * L.w + x]] && !TWATER[L.tiles[y * L.w + x]] && !L.objs[y * L.w + x]) obj(L, x, y, r.pick(lista)); } };
  const meio = x => x > 22 && x < BW - 22;     // deixa as pontas livres para as tropas
  const CENARIOS = {
    planicie: { nome: 'Planície verde', gen(L, r) { L.tiles.fill(T.GRASS); for (let i = 0; i < 18; i++) pinta(L, r.int(0, BW), r.int(0, BH), r.int(3, 9), r.int(2, 6), T.DGRASS); pinta(L, 0, 27, BW, 2, T.ROAD); espalha(L, r, 120, [O.FLOWERS, O.TALLGRASS, O.BUSH, O.ROCK]); espalha(L, r, 14, [O.OAK], (x, y) => y < 8 || y > BH - 8); } },
    floresta: { nome: 'Floresta densa', gen(L, r) { L.tiles.fill(T.GRASS); for (let i = 0; i < 30; i++) pinta(L, r.int(0, BW), r.int(0, BH), r.int(3, 8), r.int(2, 5), T.DGRASS); espalha(L, r, 700, [O.OAK, O.PINE, O.OAK, O.AUTUMN, O.BUSH], (x, y) => meio(x) || r.chance(0.25)); for (let x = 0; x < BW; x++) for (let y = 24; y < 32; y++) L.objs[y * BW + x] = 0; pinta(L, 0, 27, BW, 2, T.DIRT); } },
    deserto: { nome: 'Deserto', gen(L, r) { L.tiles.fill(T.DESERT); for (let i = 0; i < 25; i++) pinta(L, r.int(0, BW), r.int(0, BH), r.int(4, 12), r.int(2, 5), T.SAND); espalha(L, r, 60, [O.CACTUS, O.BOULDER, O.ROCK, O.BONES], meio); } },
    neve: { nome: 'Campo de neve', gen(L, r) { L.tiles.fill(T.SNOW); for (let i = 0; i < 12; i++) pinta(L, r.int(0, BW), r.int(0, BH), r.int(4, 10), r.int(2, 5), T.ICE); espalha(L, r, 110, [O.SNOWPINE, O.SNOWPINE, O.ROCK], (x, y) => meio(x) || y < 6 || y > BH - 6); } },
    rio: { nome: 'Travessia do rio', gen(L, r) { L.tiles.fill(T.GRASS); for (let y = 0; y < BH; y++) { const c = 45 + Math.round(Math.sin(y * 0.18) * 3); pinta(L, c - 3, y, 7, 1, T.WATER); pinta(L, c - 4, y, 1, 1, T.SAND); pinta(L, c + 4, y, 1, 1, T.SAND); } for (const by of [12, 40]) pinta(L, 38, by, 20, 3, T.BRIDGE); espalha(L, r, 60, [O.REEDS, O.BUSH, O.OAK, O.FLOWERS]); } },
    castelo: { nome: 'Cerco ao castelo', gen(L, r) {
      L.tiles.fill(T.GRASS); pinta(L, 0, 27, 60, 3, T.ROAD);
      const x0 = 60, y0 = 12, w = 28, h = 32;
      pinta(L, x0, y0, w, h, T.COBBLE);
      pinta(L, x0, y0, w, 2, T.WALL); pinta(L, x0, y0 + h - 2, w, 2, T.WALL); pinta(L, x0 + w - 2, y0, 2, h, T.WALL); pinta(L, x0, y0, 2, h, T.WALL);
      pinta(L, x0, y0 + 13, 2, 6, T.COBBLE);                                    // o portão
      for (const [tx, ty] of [[x0 - 1, y0 - 1], [x0 + w - 2, y0 - 1], [x0 - 1, y0 + h - 2], [x0 + w - 2, y0 + h - 2]]) pinta(L, tx, ty, 3, 3, T.WALL);
      espalha(L, r, 50, [O.BUSH, O.ROCK, O.FLOWERS], x => x < 56); for (let i = 0; i < 8; i++) obj(L, x0 + 4 + i * 3, y0 + 4, O.BARREL);
    } },
    praia: { nome: 'Desembarque na praia', gen(L, r) { L.tiles.fill(T.GRASS); for (let y = 0; y < BH; y++) { const c = 16 + Math.round(Math.sin(y * 0.2) * 2); pinta(L, 0, y, c - 5, 1, T.DEEP); pinta(L, c - 5, y, 5, 1, T.WATER); pinta(L, c, y, 14, 1, T.SAND); } espalha(L, r, 40, [O.PALM, O.BUSH, O.ROCK], x => x > 36); espalha(L, r, 20, [O.CRATE, O.BOULDER], x => x > 18 && x < 30); } },
    trincheiras: { nome: 'Trincheiras (1ª Guerra)', gen(L, r) { L.tiles.fill(T.DEADGRASS); for (let i = 0; i < 40; i++) pinta(L, r.int(0, BW), r.int(0, BH), r.int(2, 5), r.int(1, 3), T.MUD); for (const tx of [18, 77]) { for (let y = 2; y < BH - 2; y++) pinta(L, tx + Math.round(Math.sin(y * 0.4)), y, 2, 1, T.MUD); for (let y = 3; y < BH - 3; y += 3) obj(L, tx + (tx < 40 ? 4 : -3), y, O.FENCE); for (let y = 4; y < BH - 4; y += 5) obj(L, tx + (tx < 40 ? -1 : 2), y, O.CRATE); } espalha(L, r, 40, [O.DEADTREE, O.BONES, O.ROCK], meio); } },
    ruinas: { nome: 'Cidade em ruínas (2ª Guerra)', gen(L, r) { L.tiles.fill(T.COBBLE); for (let x = 0; x < BW; x += 16) pinta(L, x, 0, 3, BH, T.ROAD); for (let y = 0; y < BH; y += 14) pinta(L, 0, y, BW, 3, T.ROAD); for (let i = 0; i < 26; i++) { const x = r.int(24, BW - 26), y = r.int(2, BH - 6), w = r.int(3, 7), h = r.int(2, 4); pinta(L, x, y, w, 1, T.WALL); if (r.chance(0.6)) pinta(L, x, y, 1, h, T.WALL); } espalha(L, r, 90, [O.BOULDER, O.CRATE, O.BARREL, O.ROCK, O.DEADTREE]); } }
  };

  class BatalhaLevel {
    constructor(cen, seed) {
      this.isWorld = false; this.isInterior = false; this.isBatalha = true; this.dark = false;
      this.cen = cen; this.name = '⚔ ' + CENARIOS[cen].nome;
      this.w = BW; this.h = BH; this.tiles = new Uint8Array(BW * BH); this.objs = new Uint8Array(BW * BH);
      CENARIOS[cen].gen(this, new RNG(seed));
      const W = Game.world, P = Game.player;
      this.regIndex = W && P ? W.regAt(Math.floor((Game.worldPos ? Game.worldPos.x : P.x) / 16), Math.floor((Game.worldPos ? Game.worldPos.y : P.y) / 16)) : 0;
      this.entry = { x: BW >> 1, y: BH >> 1 }; this.canvas = null;
      this.decos = []; this.mask = new Uint8Array(BW * BH);
    }
    inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
    tileAt(x, y) { return this.inb(x, y) ? this.tiles[y * this.w + x] : T.ROCK; }
    objAt(x, y) { return this.inb(x, y) ? this.objs[y * this.w + x] : 0; }
    regAt() { return this.regIndex; }
    setObj(x, y, o) { if (this.inb(x, y)) { this.objs[y * this.w + x] = o; } }
    solidAt(x, y) { if (!this.inb(x, y)) return true; const i = y * this.w + x; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]] || this.mask[i] > 0; }
    // as decorações sólidas viram cobertura (bloqueiam passagem e tiros)
    refazMascara() {
      this.mask.fill(0);
      for (const d of this.decos) { const D = BatDeco.porId[d.id]; if (!D || !D.sol) continue; const [sw, sh] = D.sol; for (let ty = Math.floor((d.y - sh) / 16); ty <= Math.floor((d.y - 1) / 16); ty++) for (let tx = Math.floor((d.x - sw / 2) / 16); tx <= Math.floor((d.x + sw / 2 - 1) / 16); tx++) if (this.inb(tx, ty)) this.mask[ty * this.w + tx] = 1; }
    }
    render() { const c = Sprites.cv(this.w * 16, this.h * 16); Sprites.paintTiles(c.getContext('2d'), this.w, this.h, (x, y) => this.tileAt(x, y), 777); this.canvas = c; }
    drawGround(ctx, camX, camY, vw, vh) {
      if (!this.canvas) this.render(); ctx.fillStyle = '#2a3a20'; ctx.fillRect(0, 0, vw, vh); ctx.drawImage(this.canvas, -camX, -camY);
      for (const d of this.decos) { const D = BatDeco.porId[d.id]; if (!D || !D.plano) continue; const img = BatDeco.img(D); ctx.drawImage(img, Math.round(d.x - img.width / 2 - camX), Math.round(d.y - img.height / 2 - camY)); }
    }
    miniatura() {
      const c = document.createElement('canvas'); c.width = this.w; c.height = this.h; const x = c.getContext('2d');
      for (let y = 0; y < this.h; y++) for (let xx = 0; xx < this.w; xx++) { const t = this.tiles[y * this.w + xx], o = this.objs[y * this.w + xx]; x.fillStyle = o && OSOLID[o] ? '#2a4a1a' : (TILE_DEFS[t] && TILE_DEFS[t].c) || '#555'; x.fillRect(xx, y, 1, 1); }
      return c.toDataURL();
    }
  }

  // ---------- as unidades (com imagem) ----------
  const fotoCache = new Map();
  const foto = (k, fn) => { if (!fotoCache.has(k)) { try { fotoCache.set(k, fn()); } catch (e) { fotoCache.set(k, ''); } } return fotoCache.get(k); };
  const urlLook = look => { const S = Sprites.actor(look), img = S.down ? S.down[0] : S.right[0]; return Sprites.scale(img, 3).toDataURL(); };
  const MEDIEVAIS = [['milicia', 'Miliciano'], ['soldado', 'Soldado'], ['arqueiro', 'Arqueiro'], ['cavaleiro', 'Cavaleiro'], ['mosqueteiro', 'Mosqueteiro'], ['elite', 'Elite Real']];
  const MONSTROS = ['goblin', 'goblin_arqueiro', 'bandido', 'esqueleto', 'esqueleto_arqueiro', 'zumbi', 'lobo', 'urso', 'aranha', 'troll', 'ogro', 'yeti', 'necromante', 'lich', 'cavaleiro_morto', 'campeao_orc', 'troll_rei', 'dragao'];
  const Bat = {
    on: false, fase: 'editar', lado: 'A', qtd: 5, sel: null, cat: 'medieval', vel: 1, apagar: false, dcat: 'guerra',
    ka: 'valdoria', kb: 'gorthak', hora: 12, clima: null, cen: 'planicie', colocadas: [], mortos: { A: 0, B: 0 },
    reino(l) { return l === 'A' ? this.ka : this.kb; },
    cor(l) { const K = War.K[this.reino(l)]; return (K && K.color) || (l === 'A' ? '#e04040' : '#4060e0'); },
    catalogo() {
      const out = [], k = this.reino(this.lado), E = window.Era;
      if (this.cat === 'medieval') for (const [kind, nome] of MEDIEVAIS) out.push({ id: 'w:' + kind, nome, img: foto('w' + kind + k, () => urlLook(War.look(k, kind, new RNG(hashStr(k + kind))))) });
      if (this.cat === 'monstros') for (const id of MONSTROS) if (ENEMIES[id] && ENEMIES[id].look) out.push({ id: 'm:' + id, nome: ENEMIES[id].name, img: foto('m' + id, () => urlLook(ENEMIES[id].look)) });
      if (this.cat === 'moderno' && E && window.EraArte) {
        const A = window.EraArte, cor = this.cor(this.lado);
        for (const [era, nome] of [['ww1', 'Fuzileiro (1914)'], ['ww2', 'Infantaria (1940)']]) out.push({ id: 'f:' + era, nome, img: foto('f' + era + k, () => { const m = this.soldadoModerno(k, 'soldado', 0, 0, era); return urlLook(m.look); }) });
        for (const t of ['mark4', 'ft17', 'sherman', 'tiger', 'panzer4']) out.push({ id: 'v:' + t, nome: A.TANQUES[t].nome, img: foto('v' + t + cor, () => A.tanque(t, mix(A.TANQUES[t].cor, cor, 0.2), cor).lado[0].toDataURL()), larga: true });
        out.push({ id: 'v:biplano', nome: 'Biplano', img: foto('vb' + cor, () => A.biplano('#a08850', cor).c.toDataURL()), larga: true });
        out.push({ id: 'v:caca', nome: 'Caça', img: foto('vc' + cor, () => A.caca('#6a7a6a', cor).c.toDataURL()), larga: true });
      }
      if (this.cat === 'deco' && window.BatDeco) for (const d of BatDeco.DECOS) if (d.cat === this.dcat) out.push({ id: 'd:' + d.id, nome: d.nome, img: BatDeco.url(d), larga: d.w > 30 });
      return out;
    },
    soldadoModerno(k, kind, x, y, era) {
      const S = Era.st(), e0 = S.era; S.era = era;
      try { const m = War.makeSoldier(k, kind, x, y, new RNG(Date.now() & 0xffff)); if (!m.look || m.look.weapon !== 'musketb') Era.fardar(m, k); return m; } finally { S.era = e0; }
    },
    // cria uma unidade de um lado
    criar(u, lado, x, y) {
      const k = this.reino(lado), rng = new RNG((Math.random() * 1e9) | 0), [tipo, id] = u.split(':');
      let m;
      if (tipo === 'w') m = War.makeSoldier(k, id, x, y, rng);
      else if (tipo === 'f') m = this.soldadoModerno(k, 'soldado', x, y, id);
      else if (tipo === 'm') { m = new Monster(id, x, y, 12); m.team = 'enemy'; }
      else if (tipo === 'v') { m = Era.novo(id, x, y, k, lado === 'A' ? 0 : Math.PI); m.x = x; m.y = y; if (id === 'biplano' || id === 'caca') { m.veic.alt = 30; m.z = 30; } }
      if (!m) return null;
      m.lado = lado; m.ctrl = null; m.aggro = 2000; m.batalha = true;
      if (m.setDir) m.setDir(lado === 'A' ? 0 : Math.PI);
      if (tipo !== 'v') { Game.findFree(m); Game.actors.push(m); }
      if (this.fase !== 'lutar') this.congelar(m);
      return m;
    },
    congelar(m) { if (this.fase === 'lutar' || m._upd !== undefined) return; m._upd = Object.prototype.hasOwnProperty.call(m, 'update') ? m.update : null; m.update = function () { }; },
    soltar(m) { if (m._upd === undefined) return; if (m._upd) m.update = m._upd; else delete m.update; delete m._upd; },
    colocar(wx, wy) {
      if (!this.sel) return this.aviso('Escolha uma unidade na barra de baixo.');
      if (this.sel.startsWith('d:')) return this.decorar(this.sel.slice(2), wx, wy);
      const v = this.sel.startsWith('v:'), n = v ? Math.min(this.qtd, 5) : this.qtd, cols = Math.min(n, 5), esp = v ? 56 : 15;
      const rows = Math.ceil(n / cols), dir = this.lado === 'A' ? 1 : -1;
      for (let i = 0; i < n; i++) {
        const c = i % cols, r = Math.floor(i / cols);
        const x = wx - r * esp * dir * 0.9, y = wy + (c - (cols - 1) / 2) * (v ? 40 : esp);
        if (this.criar(this.sel, this.lado, x, y)) this.colocadas.push({ u: this.sel, lado: this.lado, x, y });
      }
      void rows;
      Sfx.play('equip'); this.atualizar();
    },
    decorar(id, wx, wy) {
      const D = BatDeco.porId[id], L = Game.level; if (!D || !L.isBatalha) return;
      if (D.obj !== undefined) { const tx = Math.floor(wx / 16), ty = Math.floor(wy / 16); if (L.inb(tx, ty)) { L.objs[ty * L.w + tx] = D.obj; } }
      else { L.decos.push({ id, x: Math.round(wx), y: Math.round(D.plano ? wy : wy + D.h / 2 - 2) }); L.refazMascara(); }
      Sfx.play('equip');
    },
    apagarPerto(wx, wy) {
      const L = Game.level;
      // primeiro as decorações (a mais perto do toque)
      // distância do toque até o retângulo do desenho (0 se tocou em cima dele)
      let di = -1, dd = 14; L.decos.forEach((d, i) => { const D = BatDeco.porId[d.id]; if (!D) return; const y0 = D.plano ? d.y - D.h / 2 : d.y - D.h, x0 = d.x - D.w / 2; const k = Math.hypot(Math.max(x0 - wx, 0, wx - x0 - D.w), Math.max(y0 - wy, 0, wy - y0 - D.h)); if (k < dd || (k === 0 && dd === 0 && d.y > L.decos[di].y)) { dd = k; di = i; } });
      const tx = Math.floor(wx / 16), ty = Math.floor(wy / 16), temObj = L.inb(tx, ty) && L.objs[ty * L.w + tx];
      let best = null, bd = 26;
      for (const a of Game.actors) if (a.batalha && !a.dead) { const d = dist(a.x, a.y - 8, wx, wy); if (d < bd) { bd = d; best = a; } }
      if (!best) { if (di >= 0) { L.decos.splice(di, 1); L.refazMascara(); } else if (temObj) L.objs[ty * L.w + tx] = 0; this.atualizar(); return; }
      Game.actors = Game.actors.filter(a => a !== best);
      let ci = -1, cd = Infinity; this.colocadas.forEach((c, i) => { const d = dist(c.x, c.y, best.x, best.y); if (c.lado === best.lado && d < cd) { cd = d; ci = i; } });
      if (ci >= 0 && cd < 40) this.colocadas.splice(ci, 1);
      this.atualizar();
    },
    // ---------- entrar e sair ----------
    tela() {
      const f = UI.reg(), ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
      const op = sel => ks.map(k => `<option value="${k.id}" ${sel === k.id ? 'selected' : ''}>${esc(k.short)}</option>`).join('');
      const cards = Object.entries(CENARIOS).map(([id, c]) => { const L = new BatalhaLevel(id, 1234); return `<button class="bat-cen ${this.cen === id ? 'on' : ''}" ${f(() => { this.cen = id; this.tela(); })}><img src="${foto('cen' + id, () => L.miniatura())}"><span>${esc(c.nome)}</span></button>`; }).join('');
      const el = UI.show('adm', `<div class="panel wide adm-panel"><div class="ptitle"><span class="adm-badge">ADM</span> ⚔ Criador de Batalhas</div>
        <div class="adm-tabs"><button class="sbtn" ${f(() => Adm.open('jogador'))}>◀ Painel ADM</button> <button class="sbtn on" ${f(() => this.abrir())}>⚔ Criar a batalha: ${esc(CENARIOS[this.cen].nome)}</button></div>
        <div class="adm-body"><h3>1. Cenário</h3><div class="bat-cens">${cards}</div>
        <h3>2. Os lados</h3><div class="adm-row">🔴 Lado A: <select id="bat-ka" class="adm-sel">${op(this.ka)}</select> 🔵 Lado B: <select id="bat-kb" class="adm-sel">${op(this.kb)}</select></div>
        <div class="adm-row">Hora: ${[[7, 'Manhã'], [12, 'Meio-dia'], [18, 'Pôr do sol'], [23, 'Noite']].map(([h, n]) => `<button class="sbtn ${this.hora === h ? 'on' : ''}" ${f(() => { this.hora = h; this.tela(); })}>${n}</button>`).join('')}</div>
        <div class="adm-row">Clima: ${[[null, 'Limpo'], ['rain', 'Chuva'], ['snow', 'Neve'], ['storm', 'Tempestade']].map(([c, n]) => `<button class="sbtn ${this.clima === c ? 'on' : ''}" ${f(() => { this.clima = c; this.tela(); })}>${n}</button>`).join('')}</div>
        <button class="mbtn gold" ${f(() => this.abrir())}>⚔ Criar a batalha</button></div>
        <button class="mbtn" ${f(() => UI.close())}>Fechar</button></div>`, { onBack: () => UI.close() });
      UI.bind(el, f);
      for (const id of ['bat-ka', 'bat-kb']) { const s = document.getElementById(id); s.addEventListener('change', () => { this.ka = document.getElementById('bat-ka').value; this.kb = document.getElementById('bat-kb').value; }); }
    },
    abrir() {
      const G = Game, P = G.player;
      if (!G.level.isWorld) return Adm.msg('abra o criador no mundo aberto');
      if (window.Era && Era.pil) Era.sair(true);
      UI.close();
      G.worldPos = { x: P.x, y: P.y };
      const L = new BatalhaLevel(this.cen, (Math.random() * 1e9) | 0);
      G.level = L; P.mounted = false;
      G.actors = []; G.projectiles = []; G.clouds = []; G.pickups = []; G.timers = []; G.fx = [];
      P.x = L.w * 8; P.y = L.h * 8; G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2;
      G.time = this.hora * 60; if (G.weather) { G.weather.kind = this.clima; G.weather.t = 999; }
      this.on = true; this.fase = 'editar'; this.colocadas = []; this.mortos = { A: 0, B: 0 }; this.vel = 1; this.fim = false;
      this.esconder(true); this.montarUI(); UI.fade(); Sfx.play('shout');
    },
    sair() {
      this.on = false; this.vel = 1;
      const el = document.getElementById('batalha-ui'); if (el) el.remove();
      Game.actors = []; Game.projectiles = [];
      Game.exitDungeon(); this.esconder(false);
    },
    recomecar() {
      Game.actors = []; Game.projectiles = []; Game.fx = []; this.fase = 'editar'; this.fim = false; this.mortos = { A: 0, B: 0 };
      for (const c of this.colocadas) this.criar(c.u, c.lado, c.x, c.y);
      this.atualizar();
    },
    limpar() { Game.actors = []; Game.projectiles = []; this.colocadas = []; this.fase = 'editar'; this.fim = false; this.mortos = { A: 0, B: 0 }; this.atualizar(); },
    comecar() {
      if (this.fase === 'lutar') { this.fase = 'pausa'; for (const a of Game.actors) if (a.batalha) this.congelar(a); this.atualizar(); return; }
      if (this.fase === 'pausa') { this.fase = 'lutar'; for (const a of Game.actors) if (a.batalha) this.soltar(a); this.atualizar(); return; }
      const n = this.contar(); if (!n.A || !n.B) return this.aviso('Coloque tropas dos dois lados (🔴 e 🔵).');
      this.fase = 'lutar'; for (const a of Game.actors) if (a.batalha) this.soltar(a);
      Game.centerMsg('⚔ À BATALHA!', `${War.K[this.ka] ? War.K[this.ka].short : 'A'} × ${War.K[this.kb] ? War.K[this.kb].short : 'B'}`); Sfx.play('shout');
      this.atualizar();
    },
    esconder(sim) {
      for (const id of ['controls', 'hud-tl', 'hud-tr', 'tracker', 'compass', 'atalhos']) { const e = document.getElementById(id); if (e) e.style.visibility = sim ? 'hidden' : ''; }
    },
    contar() { const n = { A: 0, B: 0 }; for (const a of Game.actors) if (a.batalha && !a.dead) n[a.lado]++; return n; },
    aviso(t) { Game.toast(t, '#ffd080'); },
    // ---------- a cada quadro ----------
    tick(dt) {
      if (!this.on) return;
      const n = this.contar();
      for (const a of Game.actors) if (a.batalha && !a.dead) {
        a.home = { x: a.x, y: a.y };       // nunca "voltam para casa": seguem lutando
        if (this.fase !== 'lutar' || !a.veic || TIPOS_VOA(a)) continue;
        // tanque sem inimigo à vista: avança para o inimigo mais perto
        if (!Combat.nearestHostile(a, a.x, a.y, 440)) {
          let alvo = null, bd = Infinity; for (const o of Game.actors) if (o.batalha && !o.dead && o.lado !== a.lado) { const d = dist(a.x, a.y, o.x, o.y); if (d < bd) { bd = d; alvo = o; } }
          if (alvo) { const ang = angleTo(a.x, a.y, alvo.x, alvo.y), sp = 34 * dt, nx = a.x + Math.cos(ang) * sp, ny = a.y + Math.sin(ang) * sp; a.veic.ang = ang; if (!Game.level.solidAt(Math.floor(nx / 16), Math.floor(ny / 16))) { a.x = nx; a.y = ny; a.moving = true; a.veic.anim += sp * 0.4; } }
        }
      }
      if (this.fase === 'lutar' && Game.level.decos) this.armadilhas(dt);
      if (this.fase === 'lutar' && !this.fim && (!n.A || !n.B)) {
        this.fim = true; const l = n.A ? 'A' : 'B', K = War.K[this.reino(l)];
        Game.centerMsg(`🏆 VITÓRIA DO LADO ${l === 'A' ? '🔴' : '🔵'}`, `${K ? K.name : 'Lado ' + l} venceu • sobreviveram ${n[l]}`); Sfx.play('levelup');
      }
      this.placar(n);
    },
    armadilhas(dt) {
      const L = Game.level;
      for (let i = L.decos.length - 1; i >= 0; i--) {
        const d = L.decos[i], D = BatDeco.porId[d.id]; if (!D) continue;
        if (D.mina) {
          const pisou = Game.actors.find(a => a.batalha && !a.dead && !(a.veic && a.z > 4) && dist(a.x, a.y, d.x, d.y) < 10);
          if (!pisou) continue;
          L.decos.splice(i, 1);
          for (const a of Game.actors) { const r = a.batalha && !a.dead ? dist(a.x, a.y, d.x, d.y) : 99; if (r < 44) Combat.damage(a, (a.veic ? 260 : Math.max(240, a.maxHp * 1.5)) * (r < 18 ? 1 : 0.45), { kb: { x: (a.x - d.x) * 4, y: (a.y - d.y) * 4 } }); }
          Juice.explode(d.x, d.y, 40, '#ff8030'); Game.fx.push({ kind: 'ring', x: d.x, y: d.y, r0: 4, r1: 44, t: 0, dur: 0.35, color: '#ff9030' }); Game.burst(d.x, d.y, '#ff9030', 16, 90); Sfx.play('boom'); Game.shake = Math.max(Game.shake, 5);
          L.decos.push({ id: 'cratera16', x: d.x, y: d.y });
        } else if (D.arame) {
          for (const a of Game.actors) if (a.batalha && !a.dead && !a.veic && Math.abs(a.x - d.x) < D.w / 2 && a.y < d.y + 2 && a.y > d.y - 14) { a._arame = (a._arame || 0) + dt; if (a._arame > 0.5) { a._arame = 0; Combat.damage(a, 6, {}); } }
        }
      }
    },
    placar(n) {
      const e = document.getElementById('bat-placar'); if (!e) return;
      const t = `<b style="color:${this.cor('A')}">🔴 ${n.A}</b> × <b style="color:${this.cor('B')}">🔵 ${n.B}</b> <small>(baixas: ${this.mortos.A} × ${this.mortos.B})</small>`;
      if (e._t !== t) { e._t = t; e.innerHTML = t; }
    },
    // ---------- a interface do editor ----------
    montarUI() {
      let el = document.getElementById('batalha-ui'); if (el) el.remove();
      el = document.createElement('div'); el.id = 'batalha-ui';
      el.style.cssText = 'position:fixed;inset:0;z-index:30;pointer-events:none;font-family:VT323,monospace;color:#f0e0c0';
      el.innerHTML = `<div id="bat-toque" style="position:absolute;inset:0;pointer-events:auto;touch-action:none"></div>
        <div id="bat-topo" style="position:absolute;left:4px;right:4px;top:4px;display:flex;flex-wrap:wrap;gap:4px;align-items:center;pointer-events:auto"></div>
        <div id="bat-placar" style="position:absolute;left:50%;top:44px;transform:translateX(-50%);background:rgba(20,12,10,.8);padding:2px 10px;border:2px solid #6a4a2a;font-size:18px;pointer-events:none"></div>
        <div id="bat-baixo" style="position:absolute;left:4px;right:4px;bottom:4px;pointer-events:auto"></div>`;
      document.getElementById('game').appendChild(el);
      // tocar no mapa coloca; arrastar move a câmera
      const toque = el.querySelector('#bat-toque');
      let ini = null, arrastou = false;
      const mundo = (cx, cy) => ({ x: Math.round(Game.camX) + cx / window.innerWidth * Game.vw, y: Math.round(Game.camY) + cy / window.innerHeight * Game.vh });
      toque.addEventListener('pointerdown', e => { ini = { x: e.clientX, y: e.clientY, px: Game.player.x, py: Game.player.y }; arrastou = false; toque.setPointerCapture(e.pointerId); });
      toque.addEventListener('pointermove', e => { if (!ini) return; const dx = e.clientX - ini.x, dy = e.clientY - ini.y; if (Math.hypot(dx, dy) > 10) arrastou = true; if (arrastou) { const k = Game.vw / window.innerWidth; Game.player.x = clamp(ini.px - dx * k, 0, BW * 16); Game.player.y = clamp(ini.py - dy * k, 0, BH * 16); } });
      toque.addEventListener('pointerup', e => { if (ini && !arrastou) { const w = mundo(e.clientX, e.clientY); if (this.apagar) this.apagarPerto(w.x, w.y); else this.colocar(w.x, w.y); } ini = null; });
      this.atualizar();
    },
    atualizar() {
      const topo = document.getElementById('bat-topo'), baixo = document.getElementById('bat-baixo'); if (!topo) return;
      const bt = (txt, on, fn, cor) => { const b = document.createElement('button'); b.className = 'sbtn' + (on ? ' on' : ''); b.innerHTML = txt; b.style.cssText = `font-size:15px;padding:2px 7px${cor ? ';border-color:' + cor : ''}`; b.onclick = e => { e.stopPropagation(); fn(); }; return b; };
      topo.innerHTML = '';
      const ladoBt = l => bt(`${l === 'A' ? '🔴' : '🔵'} ${esc(War.K[this.reino(l)] ? War.K[this.reino(l)].short : l)}`, this.lado === l && !this.apagar, () => { this.lado = l; this.apagar = false; this.atualizar(); }, this.cor(l));
      topo.append(ladoBt('A'), ladoBt('B'));
      for (const q of [1, 5, 10, 20]) topo.append(bt('×' + q, this.qtd === q, () => { this.qtd = q; this.atualizar(); }));
      topo.append(bt('🧽 Apagar', this.apagar, () => { this.apagar = !this.apagar; this.atualizar(); }));
      topo.append(bt(this.fase === 'lutar' ? '⏸ Pausar' : this.fase === 'pausa' ? '▶ Continuar' : '▶ Começar', this.fase !== 'editar', () => this.comecar(), '#ffd040'));
      for (const v of [1, 2, 4]) topo.append(bt(v + 'x', this.vel === v, () => { this.vel = v; this.atualizar(); }));
      topo.append(bt('↺ Recomeçar', false, () => this.recomecar()), bt('🗑 Limpar', false, () => this.limpar()), bt('✖ Sair', false, () => this.sair(), '#ff6060'));
      // a barra das unidades
      baixo.innerHTML = '';
      const cats = document.createElement('div'); cats.style.cssText = 'display:flex;gap:4px;margin-bottom:3px';
      for (const [c, n] of [['medieval', '⚔ Medievais'], ['monstros', '👹 Monstros'], ['moderno', '🛡 Era moderna'], ['deco', '🏗 Decorações']]) if ((c !== 'moderno' || window.Era) && (c !== 'deco' || window.BatDeco)) cats.append(bt(n, this.cat === c, () => { this.cat = c; this.atualizar(); }));
      if (this.cat === 'deco') {
        const sub = document.createElement('div'); sub.style.cssText = 'display:flex;gap:3px;margin-bottom:3px;overflow-x:auto;scrollbar-width:none';
        const mini = b => { b.style.cssText += ';flex:0 0 auto;white-space:nowrap;font-size:13px;padding:1px 6px'; return b; };
        for (const [c, n] of BatDeco.CATS) sub.append(mini(bt(`${n} <small>${BatDeco.DECOS.filter(d => d.cat === c).length}</small>`, this.dcat === c, () => { this.dcat = c; this.atualizar(); })));
        sub.append(mini(bt('🧹 Tirar todas', false, () => { Game.level.decos = []; Game.level.refazMascara(); this.atualizar(); }, '#ff8060')));
        this._sub = sub;
      } else this._sub = null;
      const dica = document.createElement('span'); dica.style.cssText = 'font-size:14px;color:#c8b890;align-self:center;margin-left:6px'; dica.textContent = this.cat === 'deco' ? `${BatDeco.DECOS.length} decorações: toque numa e depois no mapa. As sólidas viram cobertura; as minas explodem.` : this.fase === 'editar' ? 'Toque numa unidade e depois no mapa. Arraste para mover a câmera.' : 'Toque no mapa para mandar reforços.'; cats.append(dica);
      const lista = document.createElement('div'); lista.style.cssText = 'display:flex;gap:4px;overflow-x:auto;background:rgba(20,12,10,.82);border:2px solid #6a4a2a;padding:3px';
      for (const u of this.catalogo()) {
        const b = document.createElement('button'); b.className = 'sbtn' + (this.sel === u.id ? ' on' : '');
        b.style.cssText = `flex:0 0 auto;display:flex;flex-direction:column;align-items:center;padding:2px 4px;min-width:${u.larga ? 92 : 62}px;font-size:13px;line-height:1`;
        b.innerHTML = `<img src="${u.img}" style="height:44px;max-width:${u.larga ? 88 : 56}px;image-rendering:pixelated;object-fit:contain"><span>${esc(u.nome)}</span>`;
        b.onclick = e => { e.stopPropagation(); this.sel = u.id; this.apagar = false; this.atualizar(); };
        lista.append(b);
      }
      baixo.append(cats); if (this._sub) baixo.append(this._sub); baixo.append(lista);
      this.placar(this.contar());
    }
  };
  const TIPOS_VOA = a => a.veic && (a.veic.tipo === 'biplano' || a.veic.tipo === 'caca');
  window.Batalhas = Bat;
  // um pouco de estilo para os cartões dos cenários
  const css = document.createElement('style');
  css.textContent = '.bat-cens{display:flex;flex-wrap:wrap;gap:6px}.bat-cen{display:flex;flex-direction:column;align-items:center;width:96px;padding:2px;background:rgba(40,24,16,.8);border:2px solid #6a4a2a;color:#f0e0c0;font-family:VT323,monospace;font-size:13px;line-height:1}.bat-cen.on{border-color:#ffd040;background:rgba(90,60,20,.85)}.bat-cen img{width:90px;height:52px;image-rendering:pixelated}';
  document.head.appendChild(css);

  // ---------------- ganchos ----------------
  // os dois lados da batalha brigam entre si (mesmo sendo do mesmo reino); você só assiste
  const ih0 = isHostile;
  isHostile = function (a, b) { if (a && b && (a.lado || b.lado)) return !!(a.lado && b.lado && a.lado !== b.lado); return ih0(a, b); };
  // o jogador vira uma câmera livre (invisível e intocável)
  const up0 = Player.prototype.update;
  Player.prototype.update = function (dt) {
    if (!Bat.on) return up0.apply(this, arguments);
    const m = Input.move; this.x = clamp(this.x + m.x * 320 * dt, 0, BW * 16); this.y = clamp(this.y + m.y * 320 * dt, 0, BH * 16); this.moving = false; this.hp = this.stat.maxHp;
  };
  const pd0 = Player.prototype.draw; Player.prototype.draw = function () { if (Bat.on) return; return pd0.apply(this, arguments); };
  const cd0 = Combat.damage; Combat.damage = function (t) { if (Bat.on && t === Game.player) return 0; return cd0.apply(this, arguments); };
  // velocidade 2x e 4x: a simulação roda mais vezes por quadro
  const gu0 = Game.update;
  Game.update = function (dt) { const n = Bat.on && Bat.fase === 'lutar' ? Bat.vel : 1; for (let i = 0; i < n; i++) gu0.call(this, dt); };
  const t0 = Reino.tick; Reino.tick = function (dt) { const r = t0.apply(this, arguments); Bat.tick(dt); return r; };
  const od0 = Game.onMonsterDeath; Game.onMonsterDeath = function (m) { if (Bat.on && m && m.lado) Bat.mortos[m.lado]++; return od0.apply(this, arguments); };
  // não deixa abrir menus do mundo no meio da batalha
  const fi0 = Muralhas.findInteract; Muralhas.findInteract = function () { if (Bat.on) return null; return fi0.apply(this, arguments); };
  const cdw0 = Ceu.drawables;
  Ceu.drawables = function (D, camX, camY, vw, vh) {
    const r = cdw0.apply(this, arguments), L = Game.level;
    if (L && L.isBatalha && window.BatDeco) for (const d of L.decos) {
      const De = BatDeco.porId[d.id]; if (!De || De.plano) continue;
      const img = BatDeco.img(De), x = d.x - img.width / 2, yy = d.y - img.height + 2;
      if (x > camX + vw + 20 || x + img.width < camX - 20 || yy > camY + vh + 20 || yy + img.height < camY - 20) continue;
      D.push({ y: d.y, img, x: Math.round(x), yy: Math.round(yy) });
    }
    return r;
  };
  // a aba ⚔ Batalhas no painel ADM
  const op0 = Adm.open;
  Adm.open = function (tab) {
    if ((tab || this.tab) === 'batalhas') { this.tab = 'jogador'; return Bat.tela(); }
    const r = op0.apply(this, arguments);
    const bar = UI.current && UI.current.el && UI.current.el.querySelector('.adm-tabs');
    if (bar && !bar.querySelector('.bt-bat')) { const b = document.createElement('button'); b.className = 'sbtn bt-bat'; b.textContent = '⚔ Batalhas'; b.onclick = () => Bat.tela(); bar.appendChild(b); }
    return r;
  };
})();
