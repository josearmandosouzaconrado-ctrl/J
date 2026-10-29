'use strict';
// ===================== A VILA DO JOGADOR =====================
// Com uma Carta de Fundação você funda a sua própria vila num lugar vazio do mundo.
// Constrói casas, taverna, ferraria, templo, fazenda, torre e muralha; colonos chegam,
// pagam impostos e a vila cresce de Aldeia para Vila e depois Cidade. Bandidos atacam quem não se defende.
const VILA_SIZE = 30;
const VILA_PREDIOS = {
  casa1: { nome: 'Casa do Fundador', bt: 'house', x: 8, y: 10, ouro: 0, mats: {}, cap: 4 },
  casa2: { nome: 'Casa', bt: 'house', x: 24, y: 10, ouro: 120, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa3: { nome: 'Casa grande', bt: 'house2', x: 22, y: 4, ouro: 160, mats: { tabua: 12, pedra: 6, prego: 14 }, cap: 5, pop: 4 },
  casa4: { nome: 'Casa', bt: 'house', x: 2, y: 24, ouro: 140, mats: { tabua: 8, pedra: 6, prego: 10 }, cap: 4, pop: 6 },
  casa5: { nome: 'Casa grande', bt: 'house2', x: 7, y: 24, ouro: 180, mats: { tabua: 12, pedra: 8, prego: 14 }, cap: 5, pop: 8 },
  casa6: { nome: 'Chalé', bt: 'house3', x: 24, y: 24, ouro: 100, mats: { tabua: 6, pedra: 4, prego: 8 }, cap: 3, pop: 10 },
  fazenda: { nome: 'Fazenda', desc: 'Comida para os colonos: a vila cresce mais rápido e rende trigo.', ouro: 80, mats: { tabua: 4 }, renda: 4 },
  taverna: { nome: 'Taverna', bt: 'inn', x: 2, y: 9, ouro: 300, mats: { tabua: 14, pedra: 8, prego: 16 }, renda: 15, pop: 3, desc: 'Comida, bebida e cama. Atrai colonos e viajantes.' },
  armazem: { nome: 'Armazém', bt: 'general', x: 8, y: 3, ouro: 250, mats: { tabua: 10, pedra: 6, prego: 12 }, renda: 10, pop: 5, desc: 'Comércio de mantimentos.' },
  ferraria: { nome: 'Ferraria', bt: 'smith', x: 2, y: 3, ouro: 350, mats: { tabua: 6, pedra: 10, lingote_ferro: 6 }, renda: 12, pop: 6, desc: 'Armas, armaduras e forja.' },
  alquimista: { nome: 'Alquimista', bt: 'alchemist', x: 17, y: 3, ouro: 300, mats: { tabua: 8, pedra: 6, erva_vermelha: 4 }, renda: 10, pop: 8, desc: 'Poções e bancada de alquimia.' },
  estabulo: { nome: 'Estábulo', bt: 'stable', x: 17, y: 24, ouro: 250, mats: { tabua: 16, prego: 12 }, renda: 6, pop: 6, desc: 'Cavalos para você e para os colonos.' },
  templo: { nome: 'Templo', bt: 'temple', x: 18, y: 8, ouro: 600, mats: { bloco_pedra: 12, pedra: 10, tabua: 6 }, renda: 8, pop: 10, desc: 'Cura, bênçãos e honra para a vila.' },
  quartel: { nome: 'Quartel', bt: 'house2', deco: true, x: 19, y: 16, ouro: 400, mats: { tabua: 16, pedra: 12, prego: 16 }, pop: 6, desc: 'Treina arqueiros e dobra o número de soldados que a vila sustenta.' },
  torre: { nome: 'Torre de Vigia', bt: 'tower', x: 25, y: 17, ouro: 300, mats: { pedra: 12, tabua: 6 }, def: 1, pop: 4, desc: 'Guardas vigiam a vila. Menos ataques de bandidos.' },
  muralha: { nome: 'Muralha', ouro: 800, mats: { bloco_pedra: 20, pedra: 20 }, def: 2, pop: 8, desc: 'Protege a vila. Quase nenhum bandido se arrisca.' }
};
const VILA_NOMES = ['Pedra Alta', 'Vale do Sol', 'Bosque Novo', 'Ponte Velha', 'Campo Dourado', 'Rocha Branca', 'Monte Claro', 'Lago Sereno', 'Vento Leste', 'Fonte Clara'];
const Vila = {
  st() { return Game.player && Game.player.vila; },
  get s() { const V = this.st(); return V ? Game.world.settlements.find(o => o.id === V.id) : null; },
  // ---------- fundar ----------
  podeFundar() {
    const G = Game, P = G.player, W = G.world;
    if (this.st()) return 'Você já fundou a sua vila.';
    if (!G.level.isWorld) return 'Funde a vila no mundo aberto.';
    const cx = Math.floor(P.x / 16), cy = Math.floor(P.y / 16), h = VILA_SIZE >> 1;
    const R = W.regions[W.regAt(cx, cy)];
    if (R.hostile || R.id === 'nyxhal' || R.isolatedNoBuild) return 'Esta terra não aceita colonos.';
    for (const s of W.settlements) if (Math.abs(s.mid.x - cx) < (s.w || 30) / 2 + h + 20 && Math.abs(s.mid.y - cy) < (s.h || 30) / 2 + h + 20) return 'muito perto de ' + s.name;
    for (const d of W.dungeons) if (Math.abs(d.x - cx) < h + 8 && Math.abs(d.y - cy) < h + 8) return 'Muito perto de uma masmorra.';
    for (const p of W.pois) if (Math.abs(p.x - cx) < h + 6 && Math.abs(p.y - cy) < h + 6) return 'Muito perto de ' + (p.name || 'um lugar especial') + '.';
    for (const hm of W.homes) if (Math.abs(hm.x - cx) < h + 6 && Math.abs(hm.y - cy) < h + 6) return 'Muito perto de uma casa sua.';
    let bad = 0;
    for (let y = -h; y < h; y += 2) for (let x = -h; x < h; x += 2) { const t = W.baseTile(cx + x, cy + y); if (TWATER[t] || t === T.LAVA || t === T.DEEP) bad++; }
    if (bad > 30) return 'Há água demais aqui. A vila precisa de terra firme.';
    return { cx, cy, R };
  },
  fundar(it) {
    const G = Game, P = G.player, pos = this.podeFundar();
    if (typeof pos === 'string') return UI.dialog('Carta de Fundação', null, `Não dá para fundar a vila aqui: <b>${esc(pos)}</b><br><span class="dim small">Procure um campo aberto no mundo, longe de cidades, aldeias, masmorras, casas e da água, e use a carta de novo.</span>`, [{ label: 'Ok' }]);
    const nomes = new RNG(hashStr(P.name) + G.day).shuffle(VILA_NOMES.slice()).slice(0, 3).concat(['Vila de ' + P.name]);
    UI.dialog('Carta de Fundação', null, `Fundar a sua vila <b>aqui</b>, em ${esc(pos.R.short || pos.R.name)}?<br><span class="dim small">A carta é gasta. Você ganha uma casa, um poço e os primeiros colonos.</span><br><br>Qual vai ser o nome dela?`,
      nomes.map(n => ({ label: n, cls: 'gold', fn: () => { P.removeInst(it, 1); this.criar(pos, n); } })).concat([{ label: 'Agora não' }]));
  },
  criar(pos, nome) {
    const G = Game, P = G.player;
    P.vila = { id: 'vila_' + Date.now().toString(36), nome, cx: pos.cx, cy: pos.cy, region: pos.R.id, built: { casa1: 1 }, pop: 2, cofre: 0, dia: G.day, ataques: 0, noticia: null, fund: G.day };
    this.restore();
    UI.close(); UI.fade(); Sfx.play('levelup');
    P.x = (pos.cx) * 16 + 8; P.y = (pos.cy + 3) * 16 + 8; G.findFree(P);
    G.centerMsg(nome.toUpperCase() + ' FOI FUNDADA!', 'Fale com o Intendente na praça para construir.');
    G.chron(`Fundei a minha própria vila: ${nome}.`);
    Vida.honra(5);
  },
  // ---------- mundo: (re)monta o assentamento ----------
  restore() {
    const G = Game, W = G.world; if (!W) return;
    const old = W.settlements.filter(o => o.playerVila);
    for (const o of old) {
      W.settlements.splice(W.settlements.indexOf(o), 1);
      if (o.npcs) { const set = new Set(o.npcs); G.actors = (G.actors || []).filter(a => !set.has(a)); }
    }
    for (const [k, list] of W.stampIndex) W.stampIndex.set(k, list.filter(st => !st.vilaId));
    for (const [k, d] of W.doors) if (d.settlement && d.settlement.playerVila) W.doors.delete(k);
    const V = this.st(); if (!V) { if (old.length) this.limpaChunks(old[0]); return; }
    const R = W.regions.find(r => r.id === V.region) || W.regions[W.regAt(V.cx, V.cy)];
    const pop = V.pop, b = V.built;
    const type = pop >= 20 && b.templo && b.muralha ? 'capital' : pop >= 8 ? 'town' : 'village';
    const s = { id: V.id, name: V.nome, type, region: R, x: V.cx, y: V.cy, cx: V.cx, cy: V.cy, playerVila: true, homeId: V.id, buildings: [], npcSpots: [], lamps: [], gates: [] };
    this.layout(s);
    W.settlements.push(s);
    this.limpaChunks(s);
    return s;
  },
  limpaChunks(s) {
    const W = Game.world;
    for (let cy = (s.y0 >> 5) - 1; cy <= ((s.y0 + VILA_SIZE) >> 5) + 1; cy++) for (let cx = (s.x0 >> 5) - 1; cx <= ((s.x0 + VILA_SIZE) >> 5) + 1; cx++) { W.chunks.delete(W.ckey(cx, cy)); W.canvases.delete(W.ckey(cx, cy)); }
  },
  titulo() { const s = this.s; return !s ? '' : s.type === 'capital' ? 'Cidade' : s.type === 'town' ? 'Vila' : 'Aldeia'; },
  layout(s) {
    const W = Game.world, V = this.st(), reg = s.region, cul = CULTURES[reg.culture];
    const size = VILA_SIZE, N = size * size, mid = size >> 1;
    s.w = s.h = size; s.x0 = s.cx - mid; s.y0 = s.cy - mid;
    const tiles = new Uint8Array(N).fill(255), objs = new Uint8Array(N).fill(0), occ = new Uint8Array(N);
    const rng = new RNG(hashStr(V.id));
    const setT = (x, y, t) => { if (x >= 0 && y >= 0 && x < size && y < size) tiles[y * size + x] = t; };
    const setO = (x, y, o) => { if (x >= 0 && y >= 0 && x < size && y < size) objs[y * size + x] = o; };
    const ground = reg.biome === 'snow' ? T.SNOW : reg.biome === 'desert' ? T.DESERT : reg.biome === 'swamp' ? T.MUD : T.GRASS;
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const t = W.baseTile(s.x0 + x, s.y0 + y);
      if (TSOLID[t] || TWATER[t] || t === T.LAVA) setT(x, y, ground);
    }
    // (objetos 0 no carimbo apagam as árvores e pedras que o bioma colocou)
    const street = V.built.muralha || V.pop >= 8 ? (cul.street || T.COBBLE) : T.DIRT, plaza = V.pop >= 8 ? (cul.plaza || T.COBBLE) : T.DIRT;
    for (let i = 1; i < size - 1; i++) for (const k of [0, 1]) { setT(i, mid - 1 + k, street); setT(mid - 1 + k, i, street); }
    for (let x = 1; x < size - 1; x++) { setT(x, 13, T.DIRT); setT(x, 7, T.DIRT); setT(x, 27, T.DIRT); }
    for (let y = 12; y <= 17; y++) for (let x = 12; x <= 17; x++) setT(x, y, plaza);
    setO(12, 17, O.WELL);
    // muralha com quatro portões
    if (V.built.muralha) {
      const wallT = cul.wall || T.WALL;
      for (let i = 0; i < size; i++) for (const [x, y] of [[i, 0], [i, size - 1], [0, i], [size - 1, i]]) { if (i === mid - 1 || i === mid) continue; setT(x, y, wallT); occ[y * size + x] = 3; }
      for (const k of [mid - 1, mid]) { setT(k, 0, street); setT(k, size - 1, street); setT(0, k, street); setT(size - 1, k, street); }
    }
    for (const [dir, gx, gy] of [['w', s.x0 - 1, s.y0 + mid], ['e', s.x0 + size, s.y0 + mid], ['s', s.x0 + mid, s.y0 + size], ['n', s.x0 + mid, s.y0 - 1]]) s.gates.push({ x: gx, y: gy, dir });
    // fazenda: trigo para colher
    if (V.built.fazenda) for (let y = 19; y <= 22; y++) for (const [x0, x1] of [[2, 11], [17, 23]]) for (let x = x0; x <= x1; x++) { setT(x, y, T.FARM); if (y !== 21) setO(x, y, O.CROP); else setO(x, y, x % 4 ? 0 : O.HAY); }
    // prédios na ordem fixa (cada um tem o seu terreno)
    for (const [k, d] of Object.entries(VILA_PREDIOS)) {
      if (!V.built[k] || !d.bt) continue;
      const b = W.placeBuilding(s, d.bt, d.x, d.y, rng, objs, occ, size, cul, !!d.deco || d.bt === 'tower');
      if (d.deco) { b.name = d.nome; b.spec.banner = (Game.player.reino && Game.player.reino.cor) || reg.color; b.spec.sign = 'guild'; }
      b.vilaKey = k;
      if (k === 'casa1') { b.name = 'Casa do Fundador'; b.owner = Object.assign({}, b.owner, { name: 'Você' }); }
      // caminho da porta até a rua
      if (b.door) { const dx = b.door.x - s.x0, dy = b.door.y - s.y0 + 1; setT(dx, dy, T.DIRT); }
    }
    // lampiões e decoração
    for (const [x, y] of [[11, 12], [18, 12], [11, 18], [18, 18]]) { setO(x, y, O.LAMP); s.lamps.push({ x: s.x0 + x, y: s.y0 + y }); }
    if (V.built.templo) { setO(13, 12, O.STATUE); setO(16, 12, O.STATUE); }
    if (V.pop >= 8) for (const [x, y] of [[12, 13], [17, 13]]) setO(x, y, O.BANNER);
    for (let y = 1; y < size - 1; y++) for (let x = 1; x < size - 1; x++) {
      if (occ[y * size + x] || tiles[y * size + x] !== 255 || objs[y * size + x]) continue;
      const h = rng.next();
      if (h < 0.03) setO(x, y, O.FLOWERS); else if (h < 0.04) setO(x, y, rng.pick([O.BARREL, O.CRATE, O.BUSH]));
    }
    // moradores: colonos na praça, guardas na torre e nos portões, e o Intendente
    const nCit = Math.min(14, Math.ceil(V.pop * 0.6));
    for (let i = 0; i < nCit; i++) s.npcSpots.push({ role: 'citizen', x: s.x0 + mid + rng.int(-4, 4), y: s.y0 + mid + rng.int(-3, 4) });
    const nG = Math.min(10, (V.built.torre ? 2 : 0) + (V.built.muralha ? 4 : 0) + Math.min(4, Math.floor(Reino.total() / 8)));
    for (let i = 0; i < nG; i++) { const g = s.gates[i % 4]; s.npcSpots.push({ role: 'guard', x: g.x + (g.dir === 'w' ? 2 : g.dir === 'e' ? -2 : 0), y: g.y + (g.dir === 'n' ? 2 : g.dir === 's' ? -2 : 0) }); }
    s.npcSpots.push({ role: 'guardpost', x: s.x0 + 15, y: s.y0 + 16, vilaNPC: 'intendente', race: cul.race && !RACES[cul.race].npcOnly ? cul.race : 'humano' });
    s.mid = { x: s.x0 + mid, y: s.y0 + mid };
    W.addStamp({ x0: s.x0, y0: s.y0, w: size, h: size, tiles, objs, vilaId: s.id });
  },
  // ---------- tempo: colonos, impostos e ataques ----------
  dia() {
    const V = this.st(); if (!V) return;
    const G = Game, P = G.player, cap = this.cap(), b = V.built;
    // colonos chegam se há casa, comida e boa fama
    const atr = 1 + (b.fazenda ? 1 : 0) + (b.taverna ? 1 : 0) + ((P.honra || 0) >= 20 ? 1 : 0) - ((P.honra || 0) <= -20 ? 1 : 0);
    const antes = V.pop;
    if (V.pop < cap) V.pop = Math.min(cap, V.pop + Math.max(0, Math.round(atr * (0.5 + Math.random()))));
    // impostos e renda dos prédios
    let renda = V.pop * 3; for (const [k, d] of Object.entries(VILA_PREDIOS)) if (b[k] && d.renda) renda += d.renda;
    renda += Reino.rendaTratados();
    if (War.warOf('jogador').length) renda = Math.round(renda * 0.7);   // guerra atrapalha o comércio
    const trib = Reino.tributo(renda); V.trib = trib;
    V.cofre += renda - trib;
    if (b.fazenda) V.trigo = Math.min(60, (V.trigo || 0) + 3);
    // bandidos atacam vilas sem defesa
    const def = (b.torre ? 1 : 0) + (b.muralha ? 2 : 0);
    if (V.pop >= 5 && G.day - (V.ultimoAtaque || V.fund) > 3 && Math.random() < [0.3, 0.16, 0.08, 0.03][def]) {
      V.ultimoAtaque = G.day; V.ataques++;
      const aqui = this.s && dist(P.x / 16, P.y / 16, this.s.mid.x, this.s.mid.y) < 40 && G.level.isWorld;
      if (aqui) this.ataque();
      else { const perdeu = Math.floor(V.cofre * (0.4 - def * 0.1)), mortos = Math.min(V.pop - 2, Math.floor(Math.random() * (3 - def))); V.cofre -= perdeu; V.pop -= Math.max(0, mortos); V.noticia = `Bandidos atacaram ${V.nome} enquanto você estava fora! Levaram ${perdeu} de ouro do cofre${mortos > 0 ? ` e ${mortos} colono(s) fugiram` : ''}. Construa uma torre ou uma muralha.`; }
    }
    if (V.pop !== antes) this.restore();
  },
  cap() { const V = this.st(); let c = 0; for (const [k, d] of Object.entries(VILA_PREDIOS)) if (V.built[k] && d.cap) c += d.cap; return c + (V.built.taverna ? 2 : 0); },
  ataque() {
    const G = Game, P = G.player, s = this.s; if (!s) return;
    const g = s.gates[Math.floor(Math.random() * s.gates.length)], n = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) { const m = new Monster(i === 0 ? 'bandido_chefe' : rngPick(['bandido', 'bandido', 'bandido_arqueiro']), g.x * 16 + (Math.random() - 0.5) * 40, g.y * 16 + (Math.random() - 0.5) * 40, Math.max(2, P.level - (i === 0 ? 1 : 2))); m.vilaRaid = true; m.aggro = 260; G.findFree(m); G.actors.push(m); }
    this.raid = { t: 240 };
    G.centerMsg(`${s.name.toUpperCase()} ESTÁ SOB ATAQUE!`, 'Bandidos nos portões! Defenda os seus colonos!'); Sfx.play('shout');
  },
  tick(dt) {
    const G = Game, V = this.st(); if (!V || !G.level.isWorld) return;
    if (this.raid) {
      this.raid.t -= dt;
      const vivos = G.actors.filter(a => a.vilaRaid && !a.dead);
      if (!vivos.length) { this.raid = null; const g = 50 + G.player.level * 10; G.player.gold += g; Vida.honra(5, `defendi ${V.nome} de bandidos`); G.centerMsg('VILA DEFENDIDA!', `Os colonos comemoram! +${g} de ouro`); V.pop = Math.min(this.cap(), V.pop + 1); }
      else if (this.raid.t <= 0) { this.raid = null; const perdeu = Math.floor(V.cofre * 0.3); V.cofre -= perdeu; G.toast(`Os bandidos saquearam ${perdeu} de ouro e fugiram.`, '#ff8080'); for (const a of vivos) sumir(a); }
    }
    if (V.noticia && this.s && dist(G.player.x / 16, G.player.y / 16, this.s.mid.x, this.s.mid.y) < 25) { const t = V.noticia; V.noticia = null; UI.dialog('Notícias da vila', null, esc(t), [{ label: 'Entendi' }]); }
  },
  drawables() { },
  // ---------- o Intendente ----------
  talkNPC(a) {
    const P = Game.player, V = this.st(); a.talkT = 3;
    if (!V) return UI.dialog(a.name, a.look, 'Esta vila não tem mais dono...', [{ label: 'Tchau' }]);
    if (!a.nomeok) { a.nomeok = true; a.name = 'Intendente ' + a.name.split(' ')[0]; }
    const cap = this.cap(), b = V.built;
    const renda = V.pop * 3 + Object.entries(VILA_PREDIOS).reduce((n, [k, d]) => n + (b[k] && d.renda ? d.renda : 0), 0);
    const def = (b.torre ? 1 : 0) + (b.muralha ? 2 : 0);
    const txt = `<b>${esc(V.nome)}</b> — ${this.titulo()}<br>Colonos: <b>${V.pop}/${cap}</b> • Renda: <b>${renda + Reino.rendaTratados()}</b> ouro/dia${V.trib ? ` <span class="dim">(−${V.trib} de tributo)</span>` : ''} • Defesa: <b>${['nenhuma', 'baixa', 'boa', 'ótima'][def]}</b><br>Cofre: <b class="gold">${fmt(V.cofre)}</b> ouro${V.trigo ? ` • Celeiro: ${V.trigo} trigo` : ''}<br><span class="dim small">${V.pop >= cap ? 'Não há mais casas vazias: construa mais casas para receber colonos.' : 'Novos colonos chegam a cada dia.'}</span>`;
    const opts = [];
    if (V.cofre > 0) opts.push({ label: `Recolher o cofre (${fmt(V.cofre)} ouro)`, cls: 'gold', fn: () => { P.gold += V.cofre; Sfx.play('coin'); Game.toast(`+${fmt(V.cofre)} de ouro`, '#ffd060'); V.cofre = 0; this.talkNPC(a); } });
    if (V.trigo >= 5) opts.push({ label: `Pegar comida do celeiro`, fn: () => { const n = Math.floor(V.trigo / 5); V.trigo -= n * 5; P.addItem(Items.make('pao', n)); Game.toast(`+${n} pães feitos com o trigo da vila`, '#ffe0a0'); this.talkNPC(a); } });
    opts.push({ label: '🔨 Construir', fn: () => this.construirMenu(a) });
    opts.push({ label: `⚔ Quartel e tropas (${Reino.total()})`, fn: () => Reino.quartel(a, () => this.talkNPC(a)) });
    opts.push({ label: Reino.ativo() ? '👑 Coroa e diplomacia' : '👑 Suserano, independência e diplomacia', fn: () => Reino.coroa(a, () => this.talkNPC(a)) });
    opts.push({ label: 'Dar uma festa para os colonos (100 ouro)', fn: () => { if (P.gold < 100) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 100; Vida.honra(2, 'dei uma festa na minha vila'); V.pop = Math.min(cap, V.pop + 1); P.addBuff('regen', 2, 600, 'Festa na vila'); Sfx.play('quest'); UI.dialog(a.name, a.look, 'Música, cerveja e dança até tarde! Os colonos adoraram. 🎉', [{ label: 'Voltar', fn: () => this.talkNPC(a) }]); } });
    opts.push({ label: 'Tchau' });
    UI.dialog(a.name, a.look, txt, opts);
  },
  construirMenu(a) {
    const P = Game.player, V = this.st();
    const linha = (k, d) => {
      const mats = Object.entries(d.mats).map(([id, n]) => `<span class="${P.count(id) >= n ? '' : 'bad'}">${n}× ${esc(ITEMS[id] ? ITEMS[id].name : id)}</span>`).join(', ');
      return `${d.ouro} ouro${mats ? ' + ' + mats : ''}`;
    };
    const opts = [];
    for (const [k, d] of Object.entries(VILA_PREDIOS)) {
      if (V.built[k]) continue;
      if (d.pop && V.pop < d.pop) continue;
      opts.push({ label: `${d.nome} — ${linha(k, d)}`, fn: () => this.construir(a, k) });
    }
    const falta = Object.entries(VILA_PREDIOS).filter(([k, d]) => !V.built[k] && d.pop && V.pop < d.pop).map(([k, d]) => `${d.nome} (${d.pop} colonos)`);
    opts.push({ label: 'Voltar', fn: () => this.talkNPC(a) });
    UI.dialog(a.name, a.look, `O que vamos construir?${falta.length ? `<div class="dim small">Mais tarde: ${esc(falta.join(', '))}</div>` : ''}`, opts);
  },
  construir(a, k) {
    const G = Game, P = G.player, V = this.st(), d = VILA_PREDIOS[k];
    if (P.gold < d.ouro) return G.toast('Ouro insuficiente.', '#ff8080');
    if (!G.hasMats(d.mats)) return G.toast('Faltam materiais. Compre tábuas, pedras e pregos ou colete na natureza.', '#ff8080');
    P.gold -= d.ouro; G.takeMats(d.mats);
    V.built[k] = 1;
    if (k === 'templo') Vida.honra(5, `construí um templo em ${V.nome}`);
    G.time += 2 * 60; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
    P.train('construcao', 12);
    this.restore();
    UI.close(); UI.fade(); Sfx.play('forge');
    G.findFree(P);
    G.centerMsg(d.nome.toUpperCase() + ' CONSTRUÍDA!', d.desc || `${V.nome} agora tem lugar para mais colonos.`);
    G.chron(`Construí ${d.nome.toLowerCase()} em ${V.nome}.`);
  }
};
