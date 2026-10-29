'use strict';
// ===================== O REINO DO JOGADOR =====================
// A vila treina milicianos, cresce até virar cidade e um dia declara a guerra de independência
// contra o reino dono daquelas terras. Diplomacia com todos os reinos (presentes, comércio,
// aliança, paz, guerra), tática das tropas na batalha e mosquetes para quem é amigo dos reinos
// que os fabricam. O mundo também cresce: aldeias viram cidades e cidades viram metrópoles.
const TROPAS = {
  milicia: { nome: 'Miliciano', plural: 'Milicianos', ouro: 30, soldo: 1, forca: 1 },
  soldado: { nome: 'Soldado', plural: 'Soldados', ouro: 90, soldo: 2, forca: 1.5, precisa: 'ferraria', pnome: 'Ferraria' },
  arqueiro: { nome: 'Arqueiro', plural: 'Arqueiros', ouro: 80, soldo: 2, forca: 1.3, precisa: 'quartel', pnome: 'Quartel' },
  cavaleiro: { nome: 'Cavaleiro', plural: 'Cavaleiros', ouro: 220, soldo: 4, forca: 2.5, precisa: 'estabulo', pnome: 'Estábulo e Quartel' },
  mosqueteiro: { nome: 'Mosqueteiro', plural: 'Mosqueteiros', ouro: 160, soldo: 3, forca: 2, precisa: 'mosquetes', pnome: 'um acordo de armas com um reino de mosquetes' }
};
const REINO_CORES = ['#c03030', '#3050c0', '#30a050', '#c0a020', '#8040b0', '#20a0a0', '#e07020', '#d0d0e0'];
KSTYLE.jogador = { metal: '#b0b4bc', helm1: 'kettle', helm2: 'full', weapons: ['sword', 'spear', 'sword'], wItem: 'sword', mat2: 'aco', archers: 0.2 };
// símbolos da bandeira (5x5)
const EMBLEMAS = {
  cruz: { nome: 'Cruz', px: ['..#..', '..#..', '#####', '..#..', '..#..'] },
  estrela: { nome: 'Estrela', px: ['..#..', '.###.', '#####', '.#.#.', '#...#'] },
  coroa: { nome: 'Coroa', px: ['#.#.#', '#####', '#####', '.....', '.###.'] },
  espadas: { nome: 'Espadas', px: ['#...#', '.#.#.', '..#..', '.#.#.', '#...#'] },
  lua: { nome: 'Lua', px: ['.###.', '##...', '#....', '##...', '.###.'] },
  sol: { nome: 'Sol', px: ['#.#.#', '.###.', '#####', '.###.', '#.#.#'] },
  torre: { nome: 'Torre', px: ['#.#.#', '#####', '.###.', '.#.#.', '.###.'] },
  dragao: { nome: 'Dragão', px: ['##..#', '.####', '..##.', '.#.#.', '#...#'] },
  arvore: { nome: 'Árvore', px: ['..#..', '.###.', '#####', '..#..', '..#..'] },
  machado: { nome: 'Machado', px: ['.##..', '####.', '.###.', '..#..', '..#..'] },
  caveira: { nome: 'Caveira', px: ['.###.', '#.#.#', '#####', '.#.#.', '.....'] },
  escudo: { nome: 'Escudo', px: ['#####', '#.#.#', '#####', '.###.', '..#..'] }
};
const CORES_REINO = ['#c03030', '#e07020', '#c0a020', '#30a050', '#20a0a0', '#3050c0', '#8040b0', '#c040a0', '#d0d0e0', '#303038', '#6a4020', '#f0e0a0'];
const METAIS = [['#b0b4bc', 'Aço'], ['#4e4c54', 'Ferro negro'], ['#b08850', 'Bronze'], ['#d8b860', 'Dourado'], ['#dcdfe8', 'Prata'], ['#7a3030', 'Vermelho-sangue']];
const ELMOS = { classico: ['kettle', 'full', 'Clássico'], fechado: ['full', 'full', 'Fechado'], pontudo: ['spike', 'spike', 'Pontudo'], elfico: ['leaf', 'leaf', 'Élfico'], oriental: ['turban', 'full', 'Oriental'] };
const ARMAS_SETS = { espadas: [['sword', 'sword', 'spear'], 'Espadas', 'sword'], lancas: [['spear', 'spear', 'sword'], 'Lanças', 'sword'], machados: [['axe', 'axe', 'great'], 'Machados', 'axe'], martelos: [['hammer', 'mace', 'hammer'], 'Martelos', 'hammer'], mista: [['sword', 'axe', 'spear', 'mace'], 'Mista', 'sword'] };
// armadura real: as cores acompanham o brasão do reino
idef('armadura_reino', { name: 'Armadura Real', type: 'armor', slot: 'body', akind: 'body', mat: 'aco', armor: 48, icon: { k: 'body', c: '#c03030' }, lvl: 1, wlook: { tabard: '#c03030', cape: '#c03030' }, value: 1800, desc: 'Forjada no quartel do seu reino, nas cores do seu brasão.' });
idef('elmo_reino', { name: 'Elmo Real', type: 'armor', slot: 'head', akind: 'head', mat: 'aco', armor: 18, icon: { k: 'head', c: '#b0b4bc' }, lvl: 1, wlook: { helmStyle: 'full', plume: '#c03030' }, value: 900, desc: 'O elmo dos oficiais do seu reino.' });
idef('escudo_reino', { name: 'Escudo Real', type: 'armor', slot: 'offhand', akind: 'shield', mat: 'aco', armor: 24, icon: { k: 'shield', c: '#c03030' }, lvl: 1, value: 900, desc: 'Escudo com o brasão do seu reino.' });
const ORDENS = { atacar: '⚔ Atacar', segurar: '🛡 Segurar', seguir: '🚩 Seguir', recuar: '🏳 Recuar' };

const Reino = {
  ordem: 'atacar',
  st() {
    const P = Game.player;
    if (!P.reino) P.reino = { status: 'vassalo', tropas: { milicia: 0, soldado: 0, arqueiro: 0, cavaleiro: 0, mosqueteiro: 0 }, cor: REINO_CORES[hashStr(P.name) % REINO_CORES.length], tratados: {}, presentes: {}, derrotas: 0 };
    return P.reino;
  },
  ativo() { const P = Game.player, R = P && P.reino; return !!(R && R.status !== 'vassalo' && P.vila); },
  total(t) { t = t || (Game.player.reino ? Game.player.reino.tropas : {}); let n = 0; for (const k in t) n += t[k] || 0; return n; },
  forca() { const t = this.st().tropas; let f = 0; for (const k in t) f += (t[k] || 0) * TROPAS[k].forca; return f; },
  titulo() { const P = Game.player; return (P.app && P.app.sex === 'f') ? 'Rainha' : 'Rei'; },
  nome() { const V = Vila.st(), R = Game.player.reino; return R && R.nomeReino ? R.nomeReino : V ? 'Reino de ' + V.nome : 'Seu reino'; },

  // ---------- diplomacia: relação do jogador com cada reino ----------
  rel(k) { const S = War.st(); return (S.prel && S.prel[k]) || 0; },
  addRel(k, v, motivo) {
    if (!k || k === 'jogador' || !War.K[k]) return;
    const S = War.st(); S.prel = S.prel || {};
    const a = S.prel[k] || 0;
    S.prel[k] = clamp(a + v, -100, 100);
    if (motivo && Math.abs(v) >= 3) Game.toast(`${v > 0 ? '+' : ''}${Math.round(v)} relação com ${War.K[k].short}: ${motivo}`, v > 0 ? '#a0e0a0' : '#ff9080');
    this.checaMosquete(k, a);
  },
  relTxt(v) { return v >= 60 ? '<span class="good">Muito amigos</span>' : v >= 25 ? '<span class="good">Amigos</span>' : v > -25 ? 'Neutros' : v > -60 ? '<span class="warn">Desconfiados</span>' : '<span class="bad">Inimigos</span>'; },
  trat(k) { const R = this.st(); return R.tratados[k] || (R.tratados[k] = {}); },
  // amizade com um reino de mosquetes: armas e treino de mosqueteiros
  temMosquetes() { for (const k in War.K) if (KSTYLE[k] && KSTYLE[k].musket && this.rel(k) >= 50) return k; return null; },
  checaMosquete(k, antes) {
    if (!KSTYLE[k] || !KSTYLE[k].musket || antes >= 60 || this.rel(k) < 60 || !Game.player) return;
    const R = this.st(); if (R.presenteArma && R.presenteArma[k]) return;
    (R.presenteArma = R.presenteArma || {})[k] = true;
    const P = Game.player; P.addItem(Items.make('mosquete_arcano'), true); P.addItem(Items.make('bala_arcana', 60), true);
    Game.centerMsg('PRESENTE DE ' + War.K[k].short.toUpperCase(), 'Um Mosquete Arcano: sinal de amizade!');
    Game.chron(`${War.K[k].name} me deu um Mosquete Arcano como sinal de amizade.`);
  },
  suserano() {
    const V = Vila.st(), R = this.st(); if (!V) return null;
    if (R.suserano !== undefined) return R.suserano;
    War.kingdoms();
    const W = Game.world, reg = W.regions.find(r => r.id === V.region) || W.regions[W.regAt(V.cx, V.cy)];
    let k = War.K[reg.id] ? reg.id : null;
    if (!k) { let bd = 450; for (const o of War._kList) { if (o.id === 'jogador' || o.cont !== (reg.cont || 0)) continue; const d = dist(V.cx, V.cy, o.cap.x, o.cap.y); if (d < bd) { bd = d; k = o.id; } } }
    R.suserano = k;
    return k;
  },

  // ---------- o reino entra (ou sai) da lista de reinos da guerra ----------
  inject() {
    const W = War, P = Game.player; if (!W.K || !W._kList || !P) return;
    const SW = Game.mods && Game.mods.war; if (SW && SW.extintos) for (const id in SW.extintos) if (W.K[id]) W.K[id].extinto = true;
    const s = Vila.s;
    if (!this.ativo() || !s) {
      if (W.K.jogador) { delete W.K.jogador; W._kList = W._kList.filter(k => k.id !== 'jogador'); }
      return;
    }
    let k = W.K.jogador;
    if (!k) {
      k = { id: 'jogador', player: true, nb: new Set() };
      W.K.jogador = k; W._kList.push(k);
    }
    const reg = s.region, R = this.st();
    this.aplicaEstilo();
    Object.assign(k, { name: this.nome(), short: R.nomeReino ? R.nomeReino.replace(/^(Reino|Império|Principado|Ducado) d[eao]s? /, '') : Vila.st().nome, color: R.cor, emb: R.emblema || null, cor2: R.cor2 || '#f0e0a0', race: P.race, ruler: { title: this.titulo(), name: P.name, race: P.race }, cap: s, cont: reg.cont || 0, lvl: [Math.max(2, P.level - 4), P.level] });
    if (!k.nb.size) {
      const near = W._kList.filter(o => o.id !== 'jogador' && o.cont === k.cont).sort((a, b) => dist(a.cap.x, a.cap.y, s.x, s.y) - dist(b.cap.x, b.cap.y, s.x, s.y)).slice(0, 3).map(o => o.id);
      if (R.suserano && !near.includes(R.suserano)) near.push(R.suserano);
      for (const o of near) k.nb.add(o);
    }
  },
  owner(s) { const S = War.st(); return S.owner[s.id] || (this.ativo() ? 'jogador' : null); },
  guarnicao() {
    const V = Vila.st(); if (!V) return 5;
    return Math.round(5 + this.forca() * (V.built.muralha ? 1.6 : 1) * (V.built.torre ? 1.2 : 1));
  },

  // ---------- tropas da vila ----------
  pode(kind) {
    const V = Vila.st(), b = V ? V.built : {};
    const p = TROPAS[kind].precisa;
    if (!p) return true;
    if (p === 'mosquetes') return !!this.temMosquetes();
    if (kind === 'cavaleiro') return !!(b.estabulo && b.quartel);
    return !!b[p];
  },
  limite() { const V = Vila.st(); return V ? Math.round(V.pop * (V.built.quartel ? 2 : 1)) : 0; },
  recrutar(kind, n) {
    const P = Game.player, V = Vila.st(), R = this.st(), T = TROPAS[kind];
    n = Math.min(n, this.limite() - this.total());
    if (n <= 0) return Game.toast('Não há mais recrutas: a vila precisa de mais colonos (ou de um Quartel).', '#ff9080');
    const custo = T.ouro * n;
    if (P.gold < custo) return Game.toast(`Ouro insuficiente (${custo}).`, '#ff8080');
    P.gold -= custo; R.tropas[kind] = (R.tropas[kind] || 0) + n;
    Sfx.play('equip'); Game.toast(`+${n} ${n > 1 ? T.plural : T.nome}`, '#a0e0ff');
    if (R.status === 'vassalo' && this.total() >= 15 && this.suserano()) Game.toast(`${War.K[this.suserano()].short} está de olho no seu exército...`, '#ffb080');
    void V;
  },
  // ---------- exército de campo: segue o jogador ----------
  campo() { return War.st().armies.find(a => a.k === 'jogador' && a.campo); },
  formar(frac) {
    const P = Game.player, R = this.st(), S = War.st();
    if (!Game.level.isWorld) return Game.toast('Forme o exército no mundo aberto.', '#ffa0a0');
    if (this.campo()) return Game.toast('Seu exército já está em campo.', '#ffa0a0');
    const wars = War.warOf('jogador'); if (!wars.length) return Game.toast('Só dá para levar o exército em campo durante uma guerra.', '#ffa0a0');
    const comp = {}; let n = 0;
    for (const k in R.tropas) { const v = Math.floor((R.tropas[k] || 0) * frac); comp[k] = v; R.tropas[k] -= v; n += v; }
    if (n < 5) { for (const k in comp) R.tropas[k] += comp[k]; return Game.toast('Poucas tropas (mínimo 5).', '#ffa0a0'); }
    const foe = wars[0].a === 'jogador' ? wars[0].b : wars[0].a;
    S.armies.push({ id: S.id++, k: 'jogador', foe, x: P.x / 16, y: P.y / 16, n, n0: n, state: 'follow', target: null, siegeT: 0, campo: true, comp });
    UI.close(); this.ordem = 'seguir';
    Game.centerMsg('EXÉRCITO REUNIDO!', `${n} soldados seguem você. Use os botões à esquerda para dar ordens.`); Sfx.play('shout');
  },
  devolver(a) {
    const R = this.st(), S = War.st();
    const tot = this.total(a.comp) || 1;
    let resto = a.n;
    for (const k in a.comp) { const v = Math.min(resto, Math.round(a.n * (a.comp[k] || 0) / tot)); R.tropas[k] = (R.tropas[k] || 0) + v; resto -= v; }
    if (resto > 0) R.tropas.milicia += resto;
    S.armies = S.armies.filter(x => x !== a);
    War.dropSquad(a);
  },
  kind(a, rng) {
    const c = a.comp || {}, tot = this.total(c);
    if (!tot) return 'milicia';
    let x = rng.next() * tot;
    for (const k in c) { x -= c[k] || 0; if (x < 0) return k; }
    return 'milicia';
  },

  // ---------- quadro a quadro ----------
  tick(dt) {
    const G = Game, P = G.player;
    if (!G.started || !P) return;
    this.tT = (this.tT || 0) - dt;
    if (this.tT > 0) { this.painel(); return; }
    this.tT = 0.4;
    this.inject();
    this.painel();
    if (!this.ativo() || !G.level.isWorld) return;
    const S = War.st(), A = this.campo();
    // exército de campo acompanha o jogador
    if (A) {
      if (A.n < 3) { S.armies = S.armies.filter(x => x !== A); War.dropSquad(A); G.toast('O que restou do seu exército se dispersou.', '#ff9080'); }
      else if (A.state !== 'battle' && A.state !== 'siege') { A.state = 'follow'; A.x = P.x / 16; A.y = P.y / 16; }
      else if (A.state === 'siege' && dist(P.x / 16, P.y / 16, A.x, A.y) > 60) { A.state = 'follow'; G.toast('Você abandonou o cerco.', '#ffb080'); }
      // encontro com um exército inimigo
      if (A.state === 'follow') {
        const e = S.armies.find(b => b.k !== 'jogador' && b.state !== 'battle' && War.atWar('jogador', b.k) && dist(b.x, b.y, A.x, A.y) < 22);
        if (e) { A.foe = e.k; War.startBattle(A, e); this.inicioBatalha(); }
      }
    }
    // a vila sitiada com o jogador por perto: a guarnição sai para lutar
    const s = Vila.s;
    if (s && dist(P.x / 16, P.y / 16, s.mid.x, s.mid.y) < 70) {
      const e = S.armies.find(b => b.k !== 'jogador' && b.state === 'siege' && b.target === s.id);
      if (e && this.total() >= 3 && !S.armies.some(x => x.def && x.k === 'jogador')) {
        const comp = Object.assign({}, this.st().tropas), n = this.total(comp);
        for (const k in this.st().tropas) this.st().tropas[k] = 0;
        const d = { id: S.id++, k: 'jogador', foe: e.k, x: s.mid.x, y: s.mid.y + 4, n, n0: n, state: 'march', target: null, siegeT: 0, def: true, comp };
        S.armies.push(d); War.startBattle(e, d); this.inicioBatalha('A guarnição saiu para defender a cidade!');
      }
    }
    // a guarnição volta para dentro depois da luta
    for (const a of S.armies.slice()) if (a.k === 'jogador' && a.def && a.state !== 'battle') this.devolver(a);
  },
  inicioBatalha(txt) {
    this.ordem = 'segurar';
    Game.centerMsg('BATALHA!', txt || 'Suas tropas aguardam a ordem. Toque em ⚔ ATACAR para liberar a batalha!');
    Sfx.play('shout');
  },
  // ---------- tática: ordens para os soldados do jogador ----------
  tatica(m, t, dt, sf) {
    if (m.ctrl !== 'battle') return false;
    const o = this.ordem, P = Game.player;
    if (o === 'atacar') { m.aggro = 600; return false; }
    if (o === 'segurar') {
      if (!m.hold) m.hold = { x: m.x, y: m.y };
      if (m.ai === 'musket' || m.ai === 'ranged') return false;   // atiradores seguram a linha sozinhos
      if (t && !t.dead && dist(m.x, m.y, t.x, t.y) < 46) return false;
      if (dist(m.x, m.y, m.hold.x, m.hold.y) > 6) m.moveToward(m.hold.x, m.hold.y, m.spd * 0.8 * sf, dt);
      else if (t) m.setDir(angleTo(m.x, m.y, t.x, t.y));
      return true;
    }
    if (o === 'seguir') {
      if (t && !t.dead && dist(m.x, m.y, t.x, t.y) < 34) return false;
      const ang = (m.id % 12) / 12 * Math.PI * 2, tx = P.x + Math.cos(ang) * 34, ty = P.y + Math.sin(ang) * 24;
      if (dist(m.x, m.y, tx, ty) > 8) m.moveToward(tx, ty, m.spd * sf, dt);
      return true;
    }
    if (o === 'recuar') {
      const bt = War.st().battles.find(b => b.id === m.battleId);
      const cx = bt ? bt.x * 16 : m.x, cy = bt ? bt.y * 16 : m.y, a = angleTo(cx, cy, m.x, m.y);
      m.moveToward(m.x + Math.cos(a) * 60, m.y + Math.sin(a) * 60, m.spd * 1.1 * sf, dt);
      return true;
    }
    return false;
  },
  darOrdem(o) {
    this.ordem = o;
    const P = Game.player;
    for (const m of Game.actors) if (m.faction === 'jogador' && !m.dead) { m.hold = o === 'segurar' ? { x: m.x, y: m.y } : null; m.retarget = 0; }
    Game.floater(P.x, P.y - 40, { atacar: 'ATACAR!', segurar: 'SEGUREM!', seguir: 'COMIGO!', recuar: 'RECUAR!' }[o], '#ffe080', 1.2);
    Sfx.play('shout');
    if (o === 'recuar') {
      const bt = War.st().battles.find(b => b.live && [b.a, b.b].some(id => { const a = War.army(id); return a && a.k === 'jogador'; }));
      if (bt) Game.later(2.5, () => { if (!War.st().battles.includes(bt)) return; const A = War.army(bt.a); War.resolve(bt, A && A.k === 'jogador' ? 'a' : 'b'); Game.toast('Suas tropas recuaram da batalha.', '#ffb080'); this.ordem = 'seguir'; });
    }
  },
  cercar() {
    const A = this.campo(), s = this.cidadeInimiga(); if (!A || !s) return;
    A.state = 'siege'; A.target = s.id; A.siegeT = 0; A.foe = War.ownerOf(s); A.x = s.mid.x; A.y = s.mid.y + s.h / 2 + 2;
    Game.centerMsg('CERCO A ' + s.name.toUpperCase(), 'Fique por perto: em algumas horas a cidade cai (se a guarnição for menor que o seu exército).'); Sfx.play('shout');
  },
  // ataque direto: a guarnição sai pelo portão e a batalha acontece ali, ao vivo
  invadir() {
    const A = this.campo(), s = this.cidadeInimiga(), S = War.st(), P = Game.player;
    if (!A || !s || A.state === 'battle') return;
    const own = War.ownerOf(s); if (!own) return;
    let g = s.gates[0], bd = Infinity;
    for (const o of s.gates) { const d = dist(o.x, o.y, P.x / 16, P.y / 16); if (d < bd) { bd = d; g = o; } }
    if (!g) g = { x: s.mid.x, y: s.mid.y + (s.h >> 1) + 1 };
    const ix = g.x + (s.mid.x - g.x) * 0.2, iy = g.y + (s.mid.y - g.y) * 0.2;   // logo depois do portão
    const n = War.garrison(s);
    const D = { id: S.id++, k: own, foe: 'jogador', x: ix, y: iy, n, n0: n, state: 'march', target: null, siegeT: 0, cidade: s.id };
    S.armies.push(D);
    A.foe = own; A.x = g.x - (s.mid.x - g.x) * 0.12; A.y = g.y - (s.mid.y - g.y) * 0.12;
    War.startBattle(A, D);
    this.ordem = 'segurar';
    Game.centerMsg('INVASÃO DE ' + s.name.toUpperCase() + '!', `${n} defensores no portão. Toque em ⚔ ATACAR para avançar!`); Sfx.play('shout');
  },
  cidadeInimiga() {
    const P = Game.player; let best = null, bd = Infinity;
    for (const s of Game.world.settlements) { const o = War.ownerOf(s); if (!o || o === 'jogador' || !War.atWar('jogador', o)) continue; const d = dist(P.x / 16, P.y / 16, s.mid.x, s.mid.y); if (d < (s.w || 30) / 2 + 16 && d < bd) { bd = d; best = s; } }
    return best;
  },
  // botões de tática na tela
  painel() {
    let el = this.el;
    if (!el) {
      const hud = document.getElementById('hud'); if (!hud) return;
      el = this.el = document.createElement('div'); el.id = 'tatica'; el.className = 'hidden'; hud.appendChild(el);
      el.addEventListener('pointerdown', e => { const b = e.target.closest('button'); if (!b) return; e.preventDefault(); e.stopPropagation(); if (b.dataset.o === 'cercar') this.cercar(); else if (b.dataset.o === 'invadir') this.invadir(); else if (b.dataset.o === 'reunir') this.formar(1); else this.darOrdem(b.dataset.o); this.painelKey = ''; });
    }
    const P = Game.player, A = this.ativo() && Game.level.isWorld ? this.campo() : null;
    const emBatalha = this.ativo() && Game.actors.some(m => m.faction === 'jogador' && m.ctrl === 'battle' && !m.dead);
    // em guerra e sem exército em campo: botão para reunir as tropas da guarnição
    const reunir = !A && !emBatalha && this.ativo() && Game.level.isWorld && War.warOf('jogador').length > 0 && this.total() >= 5;
    const show = !!(A || emBatalha || reunir) && !Game.paused;
    const cerco = A && A.state === 'follow' && this.cidadeInimiga();
    const key = show + this.ordem + !!cerco + (A ? A.state + A.n : '') + (reunir ? 'r' + this.total() : '');
    if (key === this.painelKey) return;
    this.painelKey = key;
    el.classList.toggle('hidden', !show);
    if (!show) return;
    if (reunir) { el.innerHTML = `<div class="tat-t">⚔ Em guerra</div><button data-o="reunir" class="gold">🚩 Reunir exército (${this.total()})</button>`; return; }
    el.innerHTML = `<div class="tat-t">${A ? `🚩 ${A.n} soldados${A.state === 'siege' ? ' • cercando' : ''}` : 'Batalha'}</div>` + Object.entries(ORDENS).map(([o, l]) => `<button data-o="${o}" class="${this.ordem === o ? 'on' : ''}">${l}</button>`).join('') + (cerco ? `<button data-o="invadir" class="gold">⚔ Invadir ${esc(cerco.name)}</button><button data-o="cercar">🏰 Cercar (esperar)</button>` : '');
    void P;
  },

  // ---------- eventos da guerra ----------
  onResolve(bt, wk, lk, Wn, L) {
    // invasão: se a guarnição perdeu, a cidade cai na hora
    const D = [Wn, L].find(a => a && a.cidade), S = War.st();
    if (D) {
      S.armies = S.armies.filter(x => x !== D);
      const cid = War.settlement(D.cidade), atk = D === L ? Wn : null;
      if (cid && atk) { atk.foe = D.k; War.conquer(cid, atk); }
    }
    if (wk !== 'jogador' && lk !== 'jogador') {
      const P = Game.player;
      if (bt.live && P.tempSide && wk === P.tempSide) this.addRel(wk, 5, 'você lutou ao nosso lado');
      return;
    }
    const foe = wk === 'jogador' ? lk : wk, w = War.st().wars.find(x => (x.a === 'jogador' && x.b === foe) || (x.b === 'jogador' && x.a === foe));
    if (w) w.ps = (w.ps || 0) + (wk === 'jogador' ? 1 : -1);
    if (bt.live) Game.centerMsg(wk === 'jogador' ? 'VITÓRIA!' : 'DERROTA...', wk === 'jogador' ? `${War.K[foe].short} recuou!` : 'Suas tropas recuaram.');
    if (wk === 'jogador') Vida.honra(2);
  },
  onConquer(s, a, old) {
    if (a.k !== 'jogador') return;
    // tomar a capital faz o reino inteiro se render
    if (old && old !== 'jogador' && War.K[old] && War.K[old].cap === s) {
      const S = War.st(), resto = Game.world.settlements.filter(x => x !== s && War.ownerOf(x) === old);
      for (const x of resto) { S.owner[x.id] = 'jogador'; if (x.active) { const set = new Set(x.npcs || []); Game.actors = Game.actors.filter(q => !set.has(q)); x.active = false; x.npcs = null; } }
      Game.centerMsg(War.K[old].short.toUpperCase() + ' SE RENDEU!', `A capital caiu: ${resto.length + 1} cidades agora são do ${this.nome()}.`);
      Game.chron(`Conquistei a capital ${s.name}: ${War.K[old].name} se rendeu e foi anexado ao ${this.nome()}.`);
      War.news(`👑 ${War.K[old].name} se rendeu ao ${this.nome()}!`, true, [old, 'jogador']);
      Vida.honra(5);
      return;
    }
    this.onConquerMsg(s, a);
  },
  onConquerMsg(s, a) { const w = War.st().wars.find(x => [x.a, x.b].includes('jogador') && [x.a, x.b].includes(a.foe)); if (w) w.ps = (w.ps || 0) + 2; Game.centerMsg(s.name.toUpperCase() + ' É SUA!', `Agora faz parte do ${this.nome()}.`); Game.chron(`Conquistei ${s.name} para o ${this.nome()}.`); },
  // cerco à vila do jogador (fora da vista)
  cerco(a, s) {
    const g = this.guarnicao(), R = this.st();
    if (a.n > g) { this.vilaCaiu(s, a); return; }
    a.n -= Math.round(g * 0.35); War.retreat(a);
    for (const k in R.tropas) R.tropas[k] = Math.floor(R.tropas[k] * 0.85);
    War.news(`Os muros de ${s.name} resistiram ao cerco de ${War.K[a.k].short}!`, true, ['jogador', a.k]);
  },
  vilaCaiu(s, a) {
    const S = War.st(), R = this.st(), V = Vila.st(), P = Game.player;
    War.news(`⚔ ${War.K[a.k].name} tomou ${s.name}! A rebelião foi esmagada.`, true, [a.k]);
    for (const w of S.wars.filter(w => w.a === 'jogador' || w.b === 'jogador')) S.wars = S.wars.filter(x => x !== w);
    S.armies = S.armies.filter(x => x.k !== 'jogador' && x.foe !== 'jogador');
    S.battles = S.battles.filter(bt => S.armies.some(x => x.id === bt.a) && S.armies.some(x => x.id === bt.b));
    for (const id in S.owner) if (S.owner[id] === 'jogador') delete S.owner[id];
    for (const k in R.tropas) R.tropas[k] = 0;
    R.status = 'vassalo'; R.derrotas = (R.derrotas || 0) + 1; R.suserano = a.k;
    if (V) { V.cofre = 0; V.pop = Math.max(2, Math.floor(V.pop * 0.7)); V.noticia = `${War.K[a.k].name} tomou ${V.nome}. O exército foi desfeito, o cofre saqueado e a vila voltou a pagar tributo. Reconstrua as forças e tente de novo.`; }
    S.prel = S.prel || {}; S.prel[a.k] = -40;
    War.clearLive(); this.inject();
    Game.centerMsg('A REBELIÃO CAIU', `${s.name} voltou ao domínio de ${War.K[a.k].short}.`);
    Game.chron(`Perdi a guerra de independência: ${War.K[a.k].short} tomou ${s.name}.`);
    Vila.restore(); void P;
  },
  chancePaz(w) {
    const ps = w.ps || 0, days = Game.day - w.since;
    return ps >= 5 ? 0.4 : ps >= 3 ? 0.15 : ps >= 1 && days > 12 ? 0.05 : 0;
  },
  onPaz(w) {
    if (w.a !== 'jogador' && w.b !== 'jogador') return;
    const R = this.st(), foe = w.a === 'jogador' ? w.b : w.a;
    if (R.status === 'guerra' && foe === R.suserano) {
      R.status = 'independente'; R.indDia = Game.day;
      Game.centerMsg('INDEPENDÊNCIA!', `${War.K[foe].short} reconheceu o ${this.nome()}. ${this.titulo()} ${Game.player.name}!`);
      Game.chron(`${War.K[foe].name} reconheceu a independência. Sou ${this.titulo().toLowerCase()} do ${this.nome()}.`);
      Vida.honra(10); Sfx.play('levelup');
    }
    const S = War.st(); S.prel = S.prel || {}; S.prel[foe] = Math.max(S.prel[foe] || 0, -20);
    // as tropas do jogador que lutavam contra esse reino voltam para casa (ou viram contra outro inimigo)
    const outras = War.warOf('jogador').map(x => x.a === 'jogador' ? x.b : x.a);
    for (const a of S.armies.filter(x => x.k === 'jogador' && x.foe === foe)) { if (outras.length && a.campo) a.foe = outras[0]; else this.devolver(a); }
  },
  // ---------- diária ----------
  daily() {
    const P = Game.player; if (!P || !P.reino) return;
    const R = this.st(), V = Vila.st(), S = War.st();
    S.prel = S.prel || {};
    for (const k in S.prel) S.prel[k] *= 0.985;
    for (const k in R.tratados) { const t = R.tratados[k]; if (!War.K[k]) continue; if (t.comercio) this.addRel(k, 0.6); if (t.alianca) this.addRel(k, 0.4); if (War.atWar('jogador', k)) { t.comercio = false; t.alianca = false; } }
    if (!V) return;
    // soldo das tropas
    let soldo = 0; for (const k in R.tropas) soldo += (R.tropas[k] || 0) * TROPAS[k].soldo;
    for (const a of S.armies) if (a.k === 'jogador') soldo += Math.round(a.n * 1.5);
    if (soldo) {
      if (V.cofre >= soldo) V.cofre -= soldo;
      else { V.cofre = 0; let fug = 0; for (const k in R.tropas) { const f = Math.ceil((R.tropas[k] || 0) * 0.1); R.tropas[k] -= f; fug += f; } if (fug) V.noticia = `Sem soldo no cofre, ${fug} soldado(s) desertaram!`; }
    }
    const su = this.suserano();
    if (R.status === 'vassalo' && su && War.K[su]) {
      // um exército grande demais deixa o suserano desconfiado
      const t = this.total(); if (t >= 15) this.addRel(su, -(t - 10) / 8);
      if (this.rel(su) < -60 && t >= 15 && Math.random() < 0.2 && !War.atWar('jogador', su)) {
        R.status = 'guerra'; this.inject();
        War.declare(su, 'jogador');
        Game.centerMsg('O SUSERANO ATACA!', `${War.K[su].short} descobriu o seu exército e marcha contra ${V.nome}!`);
      }
    }
    if (!this.ativo()) return;
    // vizinhos hostis atacam; aliados entram nas suas guerras
    const minhas = War.warOf('jogador').map(w => w.a === 'jogador' ? w.b : w.a);
    for (const k of War.K.jogador ? War.K.jogador.nb : []) {
      if (!War.K[k] || War.atWar('jogador', k)) continue;
      if (this.rel(k) < -60 && Math.random() < 0.12 && War.warOf(k).length < 2) War.declare(k, 'jogador');
    }
    for (const k in R.tratados) {
      if (!R.tratados[k].alianca || !War.K[k]) continue;
      for (const f of minhas) if (f !== k && War.K[f] && !War.atWar(k, f) && Math.random() < 0.3) { War.declare(k, f); War.news(`${War.K[k].short} entrou na guerra ao lado do ${this.nome()}!`, true, [k, f, 'jogador']); }
    }
  },
  tributo(renda) { const R = Game.player.reino, su = R && R.status === 'vassalo' ? this.suserano() : null; return su && War.K[su] ? Math.round(renda * 0.2) : 0; },
  rendaTratados() { const R = Game.player.reino; if (!R) return 0; let n = 0; for (const k in R.tratados) if (R.tratados[k].comercio && War.K[k]) n += 10; return n; },

  // ---------- estética do reino: bandeira, símbolo, uniformes ----------
  estilo() { const R = this.st(); return R.estilo || (R.estilo = { metal: '#b0b4bc', elmo: 'classico', armas: 'espadas', peles: false, chifres: false, arqueiros: 0.2 }); },
  aplicaEstilo() {
    const R = Game.player && Game.player.reino; if (!R) return;
    const E = this.estilo(), H = ELMOS[E.elmo] || ELMOS.classico, A = ARMAS_SETS[E.armas] || ARMAS_SETS.espadas;
    KSTYLE.jogador = { metal: E.metal, helm1: H[0], helm2: H[1], weapons: A[0], wItem: A[2], mat2: 'aco', archers: E.arqueiros, horns: !!E.chifres, fur: !!E.peles, crest: !!R.cor2 };
    const c = R.cor || '#c03030', c2 = R.cor2 || '#f0e0a0';
    Object.assign(ITEMS.armadura_reino, { icon: { k: 'body', c: E.metal }, wlook: { tabard: c, cape: c, tabardSign: c2 } });
    Object.assign(ITEMS.elmo_reino, { icon: { k: 'head', c: E.metal }, wlook: { helmStyle: H[1], plume: c, helmHorns: !!E.chifres } });
    Object.assign(ITEMS.escudo_reino, { icon: { k: 'shield', c } });
    const P = Game.player, key = JSON.stringify([E, c, c2]);
    if (this._estKey !== key) { this._estKey = key; if (P.equip && [P.equip.body, P.equip.head, P.equip.offhand].some(it => it && /_reino$/.test(it.id))) P.buildLook(); }
  },
  brasao(back) {
    const R = this.st(), E = this.estilo(), f = UI.reg();
    const re = () => { this.aplicaEstilo(); this.inject(); this.brasao(back); };
    const sw = (cur, set) => CORES_REINO.map(c => `<button class="sw ${c === cur ? 'on' : ''}" style="background:${c}" ${f(() => { set(c); re(); })}></button>`).join('');
    const op = (list, cur, set) => list.map(([v, l]) => `<button class="sbtn small ${v === cur ? 'on' : ''}" ${f(() => { set(v); re(); })}>${l}</button>`).join('');
    const flag = War.flagImg(R.cor, R.emblema, R.cor2 || '#f0e0a0'), big = Sprites.scale(flag, 4).toDataURL();
    const rng = k => new RNG(hashStr('jogador' + k) + 1);
    const tropas = ['milicia', 'soldado', 'arqueiro', 'cavaleiro', 'elite'].map(k => `<div style="text-align:center">${UI.portrait(War.look('jogador', k, rng(k)))}<div class="small">${k === 'elite' ? 'Guarda Real' : TROPAS[k] ? TROPAS[k].nome : k}</div></div>`).join('');
    const el = UI.show('brasao', `<div class="panel"><div class="ptitle">Brasão, bandeira e exército</div>
      <div class="row" style="gap:12px;align-items:flex-start;flex-wrap:wrap">
        <div style="text-align:center"><img src="${big}" style="image-rendering:pixelated;height:120px"><div class="small gold">${esc(this.nome())}</div></div>
        <div style="flex:1;min-width:220px">
          <label>Nome do reino</label><div class="row"><input id="br-nome" maxlength="34" value="${esc(this.nome())}" style="flex:1"><button class="sbtn small" ${f(() => { const v = (document.getElementById('br-nome').value || '').trim(); if (v) { R.nomeReino = v.slice(0, 34); Game.toast('Agora o reino se chama ' + R.nomeReino, '#ffd860'); } re(); })}>Salvar</button></div>
          <label>Cor da bandeira</label><div class="row swatches">${sw(R.cor, c => R.cor = c)}</div>
          <label>Cor do símbolo</label><div class="row swatches">${sw(R.cor2 || '#f0e0a0', c => R.cor2 = c)}</div>
          <label>Símbolo</label><div class="row" style="flex-wrap:wrap">${op([['', 'Clássico']].concat(Object.entries(EMBLEMAS).map(([k, e]) => [k, e.nome])), R.emblema || '', v => R.emblema = v || null)}</div>
        </div></div>
      <div class="sub">Uniforme dos soldados</div>
      <div class="row" style="gap:8px;flex-wrap:wrap">${tropas}</div>
      <label>Metal da armadura</label><div class="row" style="flex-wrap:wrap">${METAIS.map(([c, l]) => `<button class="sbtn small ${c === E.metal ? 'on' : ''}" ${f(() => { E.metal = c; re(); })}><span class="sw" style="display:inline-block;width:12px;height:12px;background:${c};vertical-align:-1px"></span> ${l}</button>`).join('')}</div>
      <label>Elmos</label><div class="row" style="flex-wrap:wrap">${op(Object.entries(ELMOS).map(([k, h]) => [k, h[2]]), E.elmo, v => E.elmo = v)}</div>
      <label>Armas</label><div class="row" style="flex-wrap:wrap">${op(Object.entries(ARMAS_SETS).map(([k, a]) => [k, a[1]]), E.armas, v => E.armas = v)}</div>
      <label>Detalhes</label><div class="row" style="flex-wrap:wrap">${op([['p1', (E.peles ? '✔ ' : '') + 'Peles nos ombros'], ['p2', (E.chifres ? '✔ ' : '') + 'Chifres no elmo']], '', v => { if (v === 'p1') E.peles = !E.peles; else E.chifres = !E.chifres; })}${op([[0.1, 'Poucos arqueiros'], [0.2, 'Arqueiros normais'], [0.4, 'Muitos arqueiros']], E.arqueiros, v => E.arqueiros = v)}</div>
      <div class="row end" style="margin-top:8px"><button class="mbtn small gold" ${f(() => back ? back() : UI.close())}>Pronto</button></div></div>`, { cls: 'scroll', onBack: () => back ? back() : UI.close() });
    UI.bind(el, f);
  },
  // ---------- telas ----------
  quartel(a, back) {
    const P = Game.player, R = this.st(), V = Vila.st();
    const lin = Object.entries(TROPAS).map(([k, T]) => `${T.plural}: <b>${R.tropas[k] || 0}</b>`).join(' • ');
    let soldo = 0; for (const k in R.tropas) soldo += (R.tropas[k] || 0) * TROPAS[k].soldo;
    const A = this.campo();
    const txt = `<b>Tropas na guarnição</b><br>${lin}<br>Total: <b>${this.total()}/${this.limite()}</b> • Força da guarnição: <b>${this.guarnicao()}</b> • Soldo: <b>${soldo}</b> ouro/dia${A ? `<br>Em campo: <b>${A.n}</b> soldados` : ''}<br><span class="dim small">Mais colonos e um Quartel aumentam o limite. O soldo sai do cofre da vila todo dia.</span>`;
    const opts = [];
    for (const [k, T] of Object.entries(TROPAS)) {
      if (!this.pode(k)) continue;
      opts.push({ label: `Recrutar 5 ${T.plural} (${T.ouro * 5} ouro)`, fn: () => { this.recrutar(k, 5); this.quartel(a, back); } });
    }
    const falta = Object.entries(TROPAS).filter(([k]) => !this.pode(k)).map(([k, T]) => `${T.plural}: precisa de ${T.pnome}`);
    if (this.ativo() && War.warOf('jogador').length && !A) {
      opts.push({ label: '🚩 Levar todo o exército comigo', cls: 'gold', fn: () => this.formar(1) });
      opts.push({ label: '🚩 Levar metade (o resto defende)', fn: () => this.formar(0.5) });
    }
    if (this.ativo()) opts.push({ label: '🛡 Forjar armadura real (armadura + elmo + escudo: 2400 ouro)', fn: () => {
      if (P.gold < 2400) return Game.toast('Ouro insuficiente.', '#ff8080');
      P.gold -= 2400; this.aplicaEstilo();
      for (const id of ['armadura_reino', 'elmo_reino', 'escudo_reino']) P.addItem(Items.make(id), true);
      Sfx.play('forge'); Game.toast('A armadura real está na sua mochila, nas cores do seu brasão!', '#ffd860'); this.quartel(a, back);
    } });
    if (A && A.state !== 'battle') opts.push({ label: 'Mandar o exército de campo de volta para a guarnição', fn: () => { this.devolver(A); this.quartel(a, back); } });
    opts.push({ label: 'Voltar', fn: back });
    UI.dialog(a.name, a.look, txt + (falta.length ? `<div class="dim small">${esc(falta.join(' • '))}</div>` : ''), opts);
    void P; void V;
  },
  coroa(a, back) {
    const P = Game.player, R = this.st(), V = Vila.st(), su = this.suserano(), s = Vila.s;
    War.kingdoms();
    let txt;
    if (R.status === 'vassalo') txt = su ? `${esc(V.nome)} fica em terras de <b>${esc(War.K[su].name)}</b> e paga 20% da renda como tributo.<br>Relação com ${esc(War.K[su].short)}: ${this.relTxt(this.rel(su))}` : `${esc(V.nome)} fica em terras livres: nenhum reino cobra tributo daqui.`;
    else if (R.status === 'guerra') { const w = War.warOf('jogador').find(w => [w.a, w.b].includes(su)); txt = `<b class="bad">Guerra de independência contra ${esc(War.K[su] ? War.K[su].short : '?')}!</b><br>Placar da guerra: <b>${w ? w.ps || 0 : 0}</b> <span class="dim small">(vença batalhas e conquiste cidades; com placar alto o inimigo aceita a paz e reconhece o seu reino)</span>`; }
    else txt = `<b class="gold">${this.titulo()} ${esc(P.name)}</b> do <b>${esc(this.nome())}</b>.<br>Cidades: ${Game.world.settlements.filter(o => War.ownerOf(o) === 'jogador').length}`;
    const opts = [];
    if (R.status === 'vassalo') {
      if (s && s.type !== 'capital' && V.pop >= 20 && V.built.templo && V.built.muralha) Vila.restore();
      const req = this.requisitos(), ok = req.every(r => r[0]);
      txt += `<div class="small" style="margin-top:4px">Para ${su ? 'declarar independência' : 'proclamar o seu reino'}:<br>${req.map(r => `${r[0] ? '✅' : '❌'} ${r[1]}`).join('<br>')}</div>`;
      if (ok) opts.push({ label: su ? `👑 Declarar independência de ${War.K[su].short}` : '👑 Proclamar o seu reino', cls: 'gold', fn: () => this.independencia(a, back) });
    }
    if (this.ativo()) opts.push({ label: '🎨 Brasão, bandeira e uniformes', cls: 'gold', fn: () => this.brasao(() => this.coroa(a, back)) });
    opts.push({ label: '🕊 Diplomacia com os reinos', fn: () => this.listaDiplo(() => this.coroa(a, back)) });
    opts.push({ label: 'Voltar', fn: back });
    UI.dialog(a.name, a.look, txt, opts);
  },
  // a lista de requisitos, com o que o jogador tem agora
  requisitos() {
    const P = Game.player, V = Vila.st(), s = Vila.s, b = V ? V.built : {};
    const A = this.campo(), tropas = this.total() + (A ? A.n : 0);
    return [
      [!!V && V.pop >= 20, `20 colonos na vila (tem ${V ? V.pop : 0})`],
      [!!b.templo, 'Templo construído'],
      [!!b.muralha, 'Muralha construída'],
      [!!(s && s.type === 'capital'), 'a vila é uma Cidade'],
      [tropas >= 25, `25 soldados (tem ${tropas})`],
      [!P.army, P.army ? `não servir ao exército de ${War.K[P.army.k] ? War.K[P.army.k].short : 'outro reino'} (dê baixa no castelo dele)` : 'não servir ao exército de outro reino']
    ];
  },
  independencia(a, back) {
    const R = this.st(), su = this.suserano(), V = Vila.st();
    UI.confirm(su ? `Declarar a independência de <b>${esc(V.nome)}</b>?<br><span class="bad">${esc(War.K[su].name)} vai mandar exércitos para esmagar a rebelião.</span> Se ${esc(V.nome)} cair, você perde o exército e volta a ser vassalo.` : `Proclamar o <b>${esc(this.nome())}</b>?`, () => {
      R.status = su ? 'guerra' : 'independente';
      this.inject(); War.kingdoms();
      if (su) {
        War.declare('jogador', su);
        for (const k of War._kList) if (k.id !== su && k.id !== 'jogador' && War.rel(k.id, su) < -30) this.addRel(k.id, 12);
        Game.centerMsg('GUERRA DE INDEPENDÊNCIA!', `${V.nome} contra ${War.K[su].short} • toque em 🚩 Reunir exército (à esquerda)`);
        Game.chron(`Declarei a independência de ${V.nome} contra ${War.K[su].name}.`);
      } else { Game.centerMsg('UM NOVO REINO!', `${this.titulo()} ${Game.player.name} do ${this.nome()}`); Game.chron(`Proclamei o ${this.nome()}.`); }
      Vila.restore(); UI.close();
    }, () => this.coroa(a, back));
  },
  listaDiplo(back) {
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
    const V = Vila.st(), cx = V ? V.cx : Game.player.x / 16, cy = V ? V.cy : Game.player.y / 16;
    ks.sort((a, b) => dist(a.cap.x, a.cap.y, cx, cy) - dist(b.cap.x, b.cap.y, cx, cy));
    UI.dialog('Diplomacia', null, 'Mandar um emissário para qual reino?', ks.slice(0, 8).map(k => ({ label: `${k.short} — ${this.relTxt(this.rel(k.id)).replace(/<[^>]+>/g, '')}${War.atWar('jogador', k.id) ? ' ⚔' : ''}`, fn: () => this.diplo(k.id, () => this.listaDiplo(back)) })).concat([{ label: 'Voltar', fn: back }]));
  },
  diplo(k, back) {
    const P = Game.player, K = War.K[k], R = this.st(), t = this.trat(k), v = this.rel(k), guerra = War.atWar('jogador', k), day = Game.day;
    const mus = KSTYLE[k] && KSTYLE[k].musket;
    let txt = `<b style="color:${K.color}">■</b> <b>${esc(K.name)}</b> — ${esc(K.ruler.title)} ${esc(K.ruler.name)}<br>Relação: ${this.relTxt(v)} <span class="dim">(${Math.round(v)})</span>${t.comercio ? ' • 📦 Comércio' : ''}${t.alianca ? ' • 🤝 Aliança' : ''}${guerra ? ' • <span class="bad">⚔ Em guerra com você</span>' : ''}`;
    if (mus) txt += `<br><span class="dim small">Este reino fabrica mosquetes. ${v >= 60 ? 'Eles vendem armas para você!' : 'Fique muito amigo (60) e eles vendem armas e treinam mosqueteiros para você.'}</span>`;
    const opts = [];
    const hm = 1 + Math.max(0, (P.honra || 0)) / 200;
    if (!guerra && R.presentes[k] !== day) for (const [g, n] of [[200, 5], [600, 13], [1500, 28]]) opts.push({ label: `🎁 Mandar presente (${g} ouro)`, fn: () => { if (P.gold < g) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= g; R.presentes[k] = day; this.addRel(k, Math.round(n * hm), 'presente aceito'); Sfx.play('coin'); this.diplo(k, back); } });
    if (P.vila && R.status === 'vassalo' && this.suserano() === k) opts.unshift({ label: '👑 Independência de ' + K.short, cls: 'gold', fn: () => this.coroa({ name: 'Coroa', look: null }, () => this.diplo(k, back)) });
    if (!guerra && !t.comercio && v >= 25 && P.vila) opts.push({ label: '📦 Propor tratado de comércio (+10 ouro/dia)', fn: () => { t.comercio = true; Sfx.play('quest'); Game.toast(`Tratado de comércio com ${K.short}!`, '#a0e0a0'); this.diplo(k, back); } });
    if (!guerra && !t.alianca && v >= 60 && this.ativo()) opts.push({ label: '🤝 Propor aliança militar', cls: 'gold', fn: () => { t.alianca = true; Sfx.play('quest'); Game.centerMsg('ALIANÇA!', `${K.short} lutará nas suas guerras`); this.diplo(k, back); } });
    if (!guerra && R.status === 'guerra' && R.suserano && R.suserano !== k && v >= 40 && !War.atWar(k, R.suserano)) opts.push({ label: `⚔ Pedir ajuda contra ${War.K[R.suserano].short}`, fn: () => {
      const ok = Math.random() < 0.3 + (v - 40) / 100 + (War.rel(k, R.suserano) < 0 ? 0.25 : 0);
      if (ok) { War.declare(k, R.suserano); UI.dialog(K.ruler.title + ' ' + K.ruler.name, null, `${esc(K.short)} declara guerra a ${esc(War.K[R.suserano].short)}! Que caia o tirano.`, [{ label: 'Voltar', fn: () => this.diplo(k, back) }]); }
      else { this.addRel(k, -5); UI.dialog(K.ruler.title + ' ' + K.ruler.name, null, 'Não vamos arriscar nossos soldados na sua rebelião. Ainda não.', [{ label: 'Voltar', fn: () => this.diplo(k, back) }]); }
    } });
    if (mus && v >= 60) {
      opts.push({ label: '🔫 Comprar Mosquete Arcano (1800 ouro)', fn: () => { if (P.gold < 1800) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 1800; P.addItem(Items.make('mosquete_arcano')); Sfx.play('coin'); Game.toast('Você comprou um Mosquete Arcano!', '#80c0ff'); this.diplo(k, back); } });
      opts.push({ label: '🔫 Comprar 50 cartuchos (250 ouro)', fn: () => { if (P.gold < 250) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= 250; P.addItem(Items.make('bala_arcana', 50)); Sfx.play('coin'); this.diplo(k, back); } });
    }
    if (guerra) {
      const w = War.st().wars.find(x => [x.a, x.b].includes(k) && [x.a, x.b].includes('jogador')), ps = (w && w.ps) || 0;
      const preco = Math.max(0, 600 - ps * 200);
      opts.push({ label: `🕊 Propor paz${preco ? ` (pagando ${preco} ouro)` : ''}`, cls: 'gold', fn: () => {
        const indep = R.status === 'guerra' && k === R.suserano;
        const aceita = indep ? ps >= 3 : (ps >= 1 || v > -30);
        if (!aceita) return UI.dialog(K.ruler.title + ' ' + K.ruler.name, null, indep ? 'Paz? Só quando você nos vencer no campo de batalha. Rebeldes não fazem exigências.' : 'Ainda não. Esta guerra está longe de acabar.', [{ label: 'Voltar', fn: () => this.diplo(k, back) }]);
        if (P.gold < preco) return Game.toast('Ouro insuficiente para a paz.', '#ff8080');
        P.gold -= preco; if (w) War.peace(w); UI.close();
      } });
    } else if (this.ativo()) opts.push({ label: '⚔ Declarar guerra', cls: 'danger', fn: () => UI.confirm(`Declarar guerra a ${esc(K.name)}?`, () => { if (v > 25) Vida.honra(-8, 'traí um reino amigo'); t.comercio = t.alianca = false; War.declare('jogador', k); this.addRel(k, -40); UI.close(); }, () => this.diplo(k, back)) });
    opts.push({ label: 'Voltar', fn: back });
    UI.dialog('Diplomacia', null, txt, opts);
  },
  tabHTML() {
    const P = Game.player, R = P.reino, V = P.vila;
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && (this.rel(k.id) || (R && R.tratados[k.id]))).sort((a, b) => this.rel(b.id) - this.rel(a.id));
    const st = !V ? '<small class="dim">Funde uma vila (Carta de Fundação) para começar o seu reino.</small>' : !R || R.status === 'vassalo' ? `<small>${esc(V.nome)}: vila vassala${this.suserano() ? ' de ' + esc(War.K[this.suserano()].short) : ''} • Tropas: ${this.total()}</small>` : `<b class="gold">${this.titulo()} do ${esc(this.nome())}</b> <small>${R.status === 'guerra' ? '• <span class="bad">em guerra de independência</span>' : ''} • Tropas: ${this.total()}</small>`;
    return `<div class="sub">Seu reino e sua diplomacia</div><div class="quest">${st}${ks.length ? '<br>' + ks.slice(0, 10).map(k => `<small><b style="color:${k.color}">■</b> ${esc(k.short)}: ${this.relTxt(this.rel(k.id))}${R && R.tratados[k.id] && R.tratados[k.id].comercio ? ' 📦' : ''}${R && R.tratados[k.id] && R.tratados[k.id].alianca ? ' 🤝' : ''}</small>`).join('<br>') : ''}</div>`;
  }
};

// ===================== O MUNDO CRESCE: ALDEIAS VIRAM CIDADES, CIDADES VIRAM METRÓPOLES =====================
const SIZE_BY_TYPE = { village: 24, town: 34, capital: 50 };
const Mundo = {
  base(s) { if (!s.baseType) s.baseType = s.type; return s.baseType; },
  pode(s) { return !(s.port || s.academy || s.playerVila || s.homeId || s.region.neutral || s.isolatedLayout); },
  aplicar() {
    const W = Game.world, M = Game.mods; if (!W || !M) return;
    const E = M.evol || (M.evol = {});
    for (const s of W.settlements) {
      if (!this.pode(s)) continue;
      const b = this.base(s), want = E[s.id] || b;
      if (s.type !== want) this.relayout(s, want);
      s.metro = want === 'capital' && b !== 'capital';
    }
  },
  livre(s, type) {
    const W = Game.world, half = SIZE_BY_TYPE[type] / 2 + 3;
    for (const o of W.settlements) if (o !== s && Math.abs(o.mid.x - s.cx) < half + (o.w || 30) / 2 && Math.abs(o.mid.y - s.cy) < half + (o.h || 30) / 2) return false;
    for (const d of W.dungeons) if (Math.abs(d.x - s.cx) < half + 4 && Math.abs(d.y - s.cy) < half + 4) return false;
    for (const p of W.pois) if (Math.abs(p.x - s.cx) < half + 3 && Math.abs(p.y - s.cy) < half + 3) return false;
    for (const h of W.homes) if (Math.abs(h.x - s.cx) < half + 3 && Math.abs(h.y - s.cy) < half + 3) return false;
    let agua = 0, n = 0;
    for (let y = -half; y < half; y += 3) for (let x = -half; x < half; x += 3) { const t = W.baseTile(s.cx + x, s.cy + y); n++; if (TWATER[t] || t === T.LAVA) agua++; }
    return agua / n < 0.2;
  },
  relayout(s, type) {
    const W = Game.world, G = Game;
    const old = { x0: s.x0, y0: s.y0, w: s.w, h: s.h };
    for (const [k, list] of W.stampIndex) W.stampIndex.set(k, list.filter(st => !(st.x0 === s.x0 && st.y0 === s.y0 && st.w === s.w && st.h === s.h && !st.homeId && !st.vilaId)));
    for (const [k, d] of W.doors) if (d.settlement === s) W.doors.delete(k);
    if (s.npcs) { const set = new Set(s.npcs); G.actors = (G.actors || []).filter(a => !set.has(a)); }
    s.active = false; s.npcs = null;
    s.type = type;
    W.layoutSettlement(s);
    const x0 = Math.min(old.x0, s.x0), y0 = Math.min(old.y0, s.y0), x1 = Math.max(old.x0 + old.w, s.x0 + s.w), y1 = Math.max(old.y0 + old.h, s.y0 + s.h);
    for (let cy = (y0 >> 5) - 1; cy <= (y1 >> 5) + 1; cy++) for (let cx = (x0 >> 5) - 1; cx <= (x1 >> 5) + 1; cx++) { W.chunks.delete(W.ckey(cx, cy)); W.canvases.delete(W.ckey(cx, cy)); }
  },
  daily() {
    const G = Game, W = G.world, M = G.mods; if (!W || !M || G.day < 10) return;
    const E = M.evol || (M.evol = {});
    if (Math.random() > 0.25) return;
    const P = G.player;
    const cands = W.settlements.filter(s => this.pode(s) && !s.active && !s.region.hostile && (s.type === 'village' || (s.type === 'town' && G.day >= 25)) && (!P || dist(P.x / 16, P.y / 16, s.mid.x, s.mid.y) > 130));
    if (!cands.length) return;
    const s = cands[Math.floor(Math.random() * cands.length)];
    const own = War.ownerOf(s);
    if (own && War.warOf(own).length) return;            // em guerra ninguém constrói
    if (War.st().owner[s.id]) return;                     // cidades ocupadas não crescem
    const metros = Object.values(E).filter(t => t === 'capital').length;
    const to = s.type === 'village' ? 'town' : 'capital';
    if (to === 'capital' && metros >= 6) return;
    this.base(s);
    if (!this.livre(s, to)) return;
    E[s.id] = to; this.relayout(s, to); s.metro = to === 'capital';
    War.news(to === 'town' ? `🏘 A aldeia de ${s.name} cresceu e virou uma cidade!` : `🏙 ${s.name} cresceu tanto que virou uma metrópole!`, true, own ? [own] : []);
  }
};

// ===================== FRONTEIRAS NO MAPA =====================
// O território de cada reino é a terra mais perto das suas cidades: pintado de leve na cor do reino,
// com uma linha forte na fronteira. Muda sozinho quando uma cidade é conquistada.
const Fronteiras = {
  CEL: 32,     // tamanho de cada célula em tiles (1 célula = 2 pixels do mapa)
  chave() {
    const S = War.st(), R = Game.player && Game.player.reino;
    return JSON.stringify(S.owner) + JSON.stringify(S.extintos || {}) + (Reino.ativo() ? Vila.st().id + R.cor : '') + Game.world.settlements.length + Game.world.seed;
  },
  terra() {
    const W = Game.world, C = this.CEL, gw = Math.ceil(WORLD_W / C), gh = Math.ceil(WORLD_H / C);
    if (this._terra && this._tSeed === W.seed) return this._terra;
    const t = new Uint8Array(gw * gh);
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) { const b = W.baseTile(x * C + (C >> 1), y * C + (C >> 1)); t[y * gw + x] = TWATER[b] || b === T.DEEP ? 0 : 1; }
    this._terra = t; this._tSeed = W.seed;
    return t;
  },
  canvas() {
    const k = this.chave();
    if (this.cv && this._k === k) return this.cv;
    War.kingdoms();
    const W = Game.world, C = this.CEL, gw = Math.ceil(WORLD_W / C), gh = Math.ceil(WORLD_H / C), terra = this.terra();
    // cidades com dono, num balde por região do mapa
    const B = 6, bw = Math.ceil(gw / B), bh = Math.ceil(gh / B), baldes = new Map(), donos = [], cores = [];
    const idx = {};
    for (const s of W.settlements) {
      const o = War.ownerOf(s); if (!o || !War.K[o] || War.K[o].extinto) continue;
      if (idx[o] === undefined) { idx[o] = donos.length; donos.push(o); cores.push(War.K[o].color); }
      const bx = Math.floor(s.x / C / B), by = Math.floor(s.y / C / B), kk = by * bw + bx;
      if (!baldes.has(kk)) baldes.set(kk, []);
      baldes.get(kk).push([s.x / C, s.y / C, idx[o]]);
    }
    const dono = new Int16Array(gw * gh).fill(-1), raio2 = (140 / C) * (140 / C) * 4;
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
      if (!terra[y * gw + x]) continue;
      const bx = Math.floor(x / B), by = Math.floor(y / B);
      let best = -1, bd = raio2;
      for (let j = by - 2; j <= by + 2; j++) for (let i = bx - 2; i <= bx + 2; i++) { if (i < 0 || j < 0 || i >= bw) continue; const l = baldes.get(j * bw + i); if (!l) continue; for (const [sx, sy, o] of l) { const d = (sx - x) * (sx - x) + (sy - y) * (sy - y); if (d < bd) { bd = d; best = o; } } }
      dono[y * gw + x] = best;
    }
    const cv = this.cv || Sprites.cv(gw, gh), ctx = cv.getContext('2d');
    ctx.clearRect(0, 0, gw, gh);
    const img = ctx.createImageData(gw, gh), d = img.data;
    const rgb = cores.map(c => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)]);
    for (let y = 0; y < gh; y++) for (let x = 0; x < gw; x++) {
      const i = y * gw + x, o = dono[i]; if (o < 0) continue;
      const borda = (x > 0 && dono[i - 1] !== o) || (x < gw - 1 && dono[i + 1] !== o) || (y > 0 && dono[i - gw] !== o) || (y < gh - 1 && dono[i + gw] !== o);
      const c = rgb[o], p = i * 4;
      d[p] = c[0]; d[p + 1] = c[1]; d[p + 2] = c[2]; d[p + 3] = borda ? 235 : 46;
    }
    ctx.putImageData(img, 0, 0);
    this.cv = cv; this._k = k;
    return cv;
  },
  draw(ctx, toS) {
    if (!Game.world || !Game.mods) return;
    const cv = this.canvas(), [x0, y0] = toS(0, 0), [x1, y1] = toS(WORLD_W, WORLD_H);
    const sm = ctx.imageSmoothingEnabled; ctx.imageSmoothingEnabled = false;
    ctx.drawImage(cv, x0, y0, x1 - x0, y1 - y0);
    ctx.imageSmoothingEnabled = sm;
  }
};
