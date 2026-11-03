'use strict';
// ===================== O LAR: MOBÍLIA E FAMÍLIA =====================
// Dentro das suas casas (compradas, construídas, da vila, o palácio) aparece o botão 🪑 Mobília:
// escolha um móvel e ele é montado no chão à sua frente; dá para tirar os móveis também. Tudo fica
// salvo por casa. Na aba Família, o cônjuge e os filhos podem ser personalizados (nome, cabelo,
// penteado, pele, roupas, vestido, chapéu e barba).
const MOVEIS = {
  cama: { nome: 'Cama de casal', o: O.BED, ouro: 60, mats: { tabua: 10 } },
  caminha: { nome: 'Cama de solteiro', o: O.BEDSMALL, ouro: 35, mats: { tabua: 6 } },
  berco: { nome: 'Berço', o: O.CRIB, ouro: 30, mats: { tabua: 5 } },
  mesa: { nome: 'Mesa', o: O.TABLE, ouro: 25, mats: { tabua: 6 } },
  cadeira: { nome: 'Cadeira', o: O.CHAIR, ouro: 10, mats: { tabua: 3 } },
  poltrona: { nome: 'Poltrona', o: O.ARMCHAIR, ouro: 45, mats: { tabua: 4, couro: 2 } },
  banco: { nome: 'Banco', o: O.BENCH, ouro: 12, mats: { tabua: 3 } },
  estante: { nome: 'Estante de livros', o: O.BOOKSHELF, ouro: 50, mats: { tabua: 8 } },
  armario: { nome: 'Guarda-roupa', o: O.WARDROBE, ouro: 55, mats: { tabua: 10 } },
  comoda: { nome: 'Cômoda', o: O.DRESSER, ouro: 40, mats: { tabua: 6 } },
  prateleira: { nome: 'Prateleira', o: O.SHELF, ouro: 20, mats: { tabua: 4 } },
  lareira: { nome: 'Lareira', o: O.FIREPLACE, ouro: 90, mats: { pedra: 12 } },
  fogao: { nome: 'Fogão', o: O.STOVE, ouro: 80, mats: { lingote_ferro: 4 } },
  tapete: { nome: 'Tapete', o: O.RUG, ouro: 30, mats: { couro: 2 } },
  planta: { nome: 'Vaso de planta', o: O.PLANT, ouro: 8 },
  vela: { nome: 'Candelabro', o: O.CANDLE, ouro: 12, mats: { lingote_ferro: 1 } },
  lampiao: { nome: 'Lampião', o: O.LAMP, ouro: 20, mats: { lingote_ferro: 1 } },
  barril: { nome: 'Barril', o: O.BARREL, ouro: 8, mats: { tabua: 2 } },
  caixote: { nome: 'Caixote', o: O.CRATE, ouro: 6, mats: { tabua: 2 } },
  vasos: { nome: 'Potes de barro', o: O.POTS, ouro: 10 },
  estatua: { nome: 'Estátua', o: O.STATUE, ouro: 120, mats: { pedra: 8 } },
  armadura: { nome: 'Suporte de armadura', o: O.ARMORSTAND, ouro: 70, mats: { lingote_ferro: 6 } },
  trofeu: { nome: 'Troféu de caça', o: O.TROPHY, ouro: 40, mats: { couro: 1 } },
  instrumento: { nome: 'Instrumento musical', o: O.INSTRUMENT, ouro: 60, mats: { tabua: 3 } },
  piano: { nome: 'Piano', o: O.PIANO, ouro: 400, mats: { tabua: 20, lingote_ferro: 2 } },
  costura: { nome: 'Máquina de costura', o: O.SEWING, ouro: 150, mats: { lingote_ferro: 4 } }
};
const MOVEL_IDS = new Set(Object.values(MOVEIS).map(m => m.o));

const Mobilia = {
  st() { const P = Game.player; return P.mobilia || (P.mobilia = {}); },
  chave(L) { const b = L.b; return (b.settlement ? b.settlement.id : '') + ':' + b.tx + ',' + b.ty; },
  minha(L) { return !!(L && L.isInterior && L.b && Camas.dono(L) === 'meu'); },
  aplicar(L) {
    if (!L || !L.isInterior || !L.b) return;
    const r = this.st()[this.chave(L)]; if (!r) return;
    for (const [x, y] of r.rem || []) if (L.inb(x, y)) L.objs[L.idx(x, y)] = 0;
    for (const [x, y, o] of r.add || []) if (L.inb(x, y) && L.isFloor(x, y)) L.objs[L.idx(x, y)] = o;
    L.canvas = null;
  },
  frente() {
    const P = Game.player, L = Game.level;
    const tx = Math.floor((P.x + Math.cos(P.face) * 14) / 16), ty = Math.floor((P.y - 2 + Math.sin(P.face) * 14) / 16);
    return { tx, ty, ok: L.isFloor(tx, ty) && !(tx === L.dx && ty >= L.h - 3) && !(tx === Math.floor(P.x / 16) && ty === Math.floor(P.y / 16)) };
  },
  menu() {
    const L = Game.level, P = Game.player; if (!this.minha(L)) return;
    const opts = Object.entries(MOVEIS).map(([k, m]) => ({ label: `🪑 ${m.nome} — ${m.ouro} ouro${Object.entries(m.mats || {}).map(([id, n]) => `, ${n} ${ITEMS[id].name}`).join('')}`, fn: () => this.montar(k) }));
    opts.unshift({ label: '🗑 Tirar o móvel da minha frente', cls: 'danger', fn: () => this.tirar() });
    opts.push({ label: 'Fechar' });
    UI.dialog('Mobília', null, 'Escolha um móvel: ele é montado no chão logo à sua frente.<br><span class="dim small">Vire-se para o lugar onde quer o móvel antes de escolher.</span>', opts);
    void P;
  },
  montar(k) {
    const L = Game.level, P = Game.player, m = MOVEIS[k], f = this.frente();
    if (!f.ok) return Game.toast('Não dá para montar aí: escolha um chão livre à sua frente (longe da porta).', '#ffa080');
    if (L.objs[L.idx(f.tx, f.ty)]) return Game.toast('Já tem algo aí. Tire primeiro.', '#ffa080');
    if (P.gold < m.ouro) return Game.toast('Ouro insuficiente.', '#ff8080');
    if (m.mats && !Game.hasMats(m.mats)) return Game.toast('Faltam materiais.', '#ff8080');
    P.gold -= m.ouro; if (m.mats) Game.takeMats(m.mats);
    L.setObj(f.tx, f.ty, m.o);
    const r = this.st()[this.chave(L)] || (this.st()[this.chave(L)] = { add: [], rem: [] });
    r.rem = r.rem.filter(([x, y]) => !(x === f.tx && y === f.ty)); r.add = r.add.filter(([x, y]) => !(x === f.tx && y === f.ty)); r.add.push([f.tx, f.ty, m.o]);
    UI.close(); Sfx.play('forge'); P.train('construcao', 1);
    Game.burst(f.tx * 16 + 8, f.ty * 16 + 8, '#c8a070', 10, 40); Game.floater(f.tx * 16 + 8, f.ty * 16 - 4, m.nome, '#c8f0a0');
  },
  tirar() {
    const L = Game.level, P = Game.player, f = this.frente(), o = L.inb(f.tx, f.ty) ? L.objs[L.idx(f.tx, f.ty)] : 0;
    if (!o || !MOVEL_IDS.has(o)) return Game.toast('Não há móvel à sua frente.', '#ffa080');
    L.setObj(f.tx, f.ty, 0);
    const r = this.st()[this.chave(L)] || (this.st()[this.chave(L)] = { add: [], rem: [] });
    const meu = r.add.findIndex(([x, y]) => x === f.tx && y === f.ty);
    if (meu >= 0) { const m = Object.values(MOVEIS).find(m => m.o === r.add[meu][2]); r.add.splice(meu, 1); if (m) { P.gold += Math.floor(m.ouro / 2); Game.floater(f.tx * 16 + 8, f.ty * 16, `+${Math.floor(m.ouro / 2)} ouro`, '#ffe080'); } }
    else r.rem.push([f.tx, f.ty]);
    UI.close(); Sfx.play('pickup');
  },
  // botão no alto da tela, só dentro das suas casas
  tick() {
    if (!this.btn) {
      const tb = UI.topbar && UI.topbar(); if (!tb) return;
      this.btn = document.createElement('button'); this.btn.id = 'b-movel'; this.btn.textContent = '🪑 Mobília'; this.btn.className = 'hidden';
      tb.appendChild(this.btn);
      this.btn.addEventListener('pointerdown', e => { e.preventDefault(); e.stopPropagation(); this.menu(); });
    }
    const v = this.minha(Game.level) && !Game.paused;
    if (v !== this._v) { this._v = v; this.btn.classList.toggle('hidden', !v); }
  }
};

// ---------- personalizar o cônjuge e os filhos ----------
const CORES_CABELO = ['#1a1410', '#3a2a1a', '#5a3a1a', '#8a5a2a', '#c08030', '#e0c070', '#f0e0b0', '#a03020', '#d8d8d8', '#f4f4f4', '#3a4a8a', '#8a3a8a', '#2a6a4a'];
const CORES_ROUPA = ['#7a4a2a', '#4a6a3a', '#3a4a7a', '#7a3a3a', '#6a5a3a', '#5a3a6a', '#8a7a5a', '#3a6a6a', '#e8e0d0', '#2a2a30', '#a02848', '#c0a040', '#4a8ad0'];
const CORES_CALCA = ['#3a3020', '#2a2a30', '#4a3a2a', '#3a3a3a', '#e8e4dc', '#2a3a5a', '#5a2a2a'];
const CHAPEUS = [null, 'straw', 'wide', 'cap', 'bandana', 'beret', 'flores', 'lenco'];
const NOMES_CHAPEU = { straw: 'Chapéu de palha', wide: 'Chapéu de abas', cap: 'Boné', bandana: 'Bandana', beret: 'Boina', flores: 'Coroa de flores', lenco: 'Lenço' };
const Familia = {
  pessoas() {
    const P = Game.player, l = [];
    if (P.spouse && P.rel[P.spouse]) l.push({ id: P.spouse, r: P.rel[P.spouse], tipo: 'Cônjuge' });
    for (const c of P.children || []) l.push({ id: c.id, r: c, tipo: c.sex === 'f' ? 'Filha' : 'Filho' });
    return l;
  },
  menu() {
    const l = this.pessoas();
    if (!l.length) return UI.dialog('Família', null, 'Você ainda não tem família para personalizar. Case-se e tenha filhos (ou adote no templo).', [{ label: 'Ok' }]);
    UI.dialog('Personalizar a família', null, 'Quem você quer personalizar?', l.map(p => ({ label: `${p.tipo}: ${p.r.name}`, fn: () => this.editar(p) })).concat([{ label: 'Fechar' }]));
  },
  ciclo(lista, atual) { const i = lista.indexOf(atual); return lista[(i + 1) % lista.length]; },
  editar(p) {
    const r = p.r, L = r.look = Object.assign({}, r.look || { k: 'hum' }), volta = () => this.editar(p);
    const R = RACES[r.race] || RACES.humano, crianca = p.tipo !== 'Cônjuge' && Game.day - r.born < 15;
    const mudar = fn => () => { fn(); this.atualizar(p); volta(); };
    const opts = [
      { label: '✏ Mudar o nome', fn: () => this.nome(p) },
      { label: '💇 Cor do cabelo ▶', fn: mudar(() => { L.hair = this.ciclo(CORES_CABELO, L.hair); }) },
      { label: `💇 Penteado ▶ (${L.hairStyle || 0})`, fn: mudar(() => { L.hairStyle = ((L.hairStyle || 0) + 1) % 5; }) },
      { label: '🧑 Tom de pele ▶', fn: mudar(() => { L.skin = this.ciclo(R.skins, L.skin); }) },
      { label: '👕 Cor da roupa ▶', fn: mudar(() => { L.body = this.ciclo(CORES_ROUPA, L.body); delete L.vest; delete L.stripes; }) },
      { label: '👖 Cor da calça ▶', fn: mudar(() => { L.legs = this.ciclo(CORES_CALCA, L.legs); }) },
      { label: L.robe ? '👗 Trocar o vestido por túnica e calça' : '👗 Usar vestido / manto', fn: mudar(() => { L.robe = !L.robe; }) },
      { label: `🎩 Chapéu ▶ (${L.hat ? NOMES_CHAPEU[L.hat] : 'nenhum'})`, fn: mudar(() => { L.hat = this.ciclo(CHAPEUS, L.hat || null); if (!L.hat) delete L.hat; else L.hatC = L.hatC || '#c8a050'; }) },
      { label: '🎨 Cor do chapéu ▶', fn: mudar(() => { L.hatC = this.ciclo(CORES_ROUPA, L.hatC); }) }
    ];
    if (r.sex === 'm' && !crianca) opts.push({ label: L.beard ? '🧔 Tirar a barba' : '🧔 Deixar a barba', fn: mudar(() => { L.beard = !L.beard; }) });
    opts.push({ label: 'Pronto', fn: () => this.menu() });
    UI.dialog(`${p.tipo}: ${r.name}`, Object.assign({}, L, crianca ? { short: 3 } : {}), 'Toque nas opções para mudar a aparência. O retrato mostra como está ficando.', opts);
  },
  // quem já estiver na casa troca de roupa na hora
  atualizar(p) {
    for (const a of Game.actors) if (a.rid === p.id || (a.kid && a.kid === p.r)) { a.look = Object.assign({}, p.r.look, a.family === 'kid' ? { short: Game.day - p.r.born < 15 ? 3 : 2, blush: true } : {}); a.S = Sprites.actor(a.look); a.h = a.S.h; a.name = p.r.name; }
    UI.portraitCache && UI.portraitCache.clear && UI.portraitCache.clear();
  },
  nome(p) {
    const f = UI.reg();
    const el = UI.show('name', `<div class="panel small center"><div class="ptitle">Novo nome</div><input id="famnome" maxlength="16" value="${esc(p.r.name)}"><div class="row"><button class="mbtn gold" ${f(() => { const v = (document.getElementById('famnome').value || '').trim(); if (v) { p.r.name = v; this.atualizar(p); } this.editar(p); })}>Salvar</button><button class="mbtn" ${f(() => this.editar(p))}>Cancelar</button></div></div>`);
    UI.bind(el, f);
  }
};
