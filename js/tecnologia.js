'use strict';
// =====================================================================
//  ÁRVORE DE TECNOLOGIA DOS REINOS
//  Todo reino (o seu e os da IA) pesquisa um pouco por dia: armaduras,
//  armas, táticas, cerco e economia. As pesquisas mudam de verdade a
//  guerra: soldados com mais vida e dano, armaduras novas no corpo dos
//  soldados, batalhas e cercos fora da vista, ordens novas na batalha
//  (parede de escudos, carga, flanqueio) e mosquetes por pesquisa.
// =====================================================================
const TEC_RAMOS = {
  arm: { nome: 'Armaduras', ic: '🛡' },
  armas: { nome: 'Armas', ic: '⚔' },
  tat: { nome: 'Táticas', ic: '🚩' },
  cerco: { nome: 'Cerco e muralhas', ic: '🏰' },
  eco: { nome: 'Economia', ic: '💰' }
};
const TECS = {
  // ---------- armaduras ----------
  gambeson: { r: 'arm', t: 1, custo: 12, nome: 'Gibão acolchoado', desc: 'Camadas de linho e lã por baixo de tudo. Os soldados aguentam mais pancada.', ef: '+10% de vida das tropas' },
  cota: { r: 'arm', t: 2, custo: 24, req: ['gambeson'], nome: 'Cota de malha', desc: 'Milhares de anéis de ferro trançados. Até os milicianos vestem malha.', ef: '+12% de vida • milicianos com cota de malha' },
  placas: { r: 'arm', t: 3, custo: 40, req: ['cota', 'ferro'], nome: 'Armadura de placas', desc: 'Peitorais de aço batido na forja. Os soldados ganham peitoral e os milicianos, elmo.', ef: '+15% de vida • peitoral de aço' },
  gotica: { r: 'arm', t: 4, custo: 65, req: ['placas'], nome: 'Armadura completa (gótica)', desc: 'Aço do elmo às botas, com ombreiras e articulações. O auge da forja medieval.', ef: '+18% de vida • elmo fechado e ombreiras • o Quartel forja a Armadura Gótica para você' },
  // ---------- armas ----------
  ferro: { r: 'armas', t: 1, custo: 12, nome: 'Ferro forjado', desc: 'Espadas, lanças e machados de ferro de verdade, não de bronze.', ef: '+8% de dano das tropas' },
  aco: { r: 'armas', t: 2, custo: 24, req: ['ferro'], nome: 'Aço temperado', desc: 'Lâminas temperadas em óleo: cortam malha e não quebram.', ef: '+12% de dano das tropas' },
  bestas: { r: 'armas', t: 2, custo: 22, req: ['ferro'], nome: 'Bestas', desc: 'Arcos de aço com manivela: atravessam escudos e armaduras.', ef: '+35% de dano dos arqueiros' },
  polvora: { r: 'armas', t: 4, custo: 70, req: ['aco', 'engenharia'], nome: 'Pólvora', desc: 'O pó negro que troveja. Seus ferreiros aprendem a fazer mosquetes.', ef: 'treina Mosqueteiros sem precisar de acordo • os reinos da IA passam a ter mosqueteiros' },
  // ---------- táticas ----------
  formacao: { r: 'tat', t: 1, custo: 12, nome: 'Formação cerrada', desc: 'Ombro com ombro, escudo com escudo.', ef: 'ordem 🧱 Parede de escudos (−40% de dano recebido, segurando a linha) • −12% de dano em quem tem escudo' },
  disciplina: { r: 'tat', t: 2, custo: 22, req: ['formacao'], nome: 'Disciplina e treino', desc: 'Sargentos, bandeiras e toque de corneta. As tropas não fogem tão fácil.', ef: '+5% de dano • as tropas só fogem com muito mais baixas' },
  carga: { r: 'tat', t: 2, custo: 26, req: ['formacao'], nome: 'Carga de cavalaria', desc: 'Lanças baixas e cavalos a galope contra a linha inimiga.', ef: 'ordem 🐎 Carga (mais rápidos e +25% de dano por 8 s) • cavaleiros +30% de dano' },
  flanqueio: { r: 'tat', t: 3, custo: 40, req: ['disciplina'], nome: 'Flanqueio', desc: 'Metade segura a frente, metade dá a volta e ataca pelas costas.', ef: 'ordem ↪ Flanquear (+30% de dano de quem chega pelo lado) • batalhas fora da vista mais fortes' },
  salva: { r: 'tat', t: 3, custo: 34, req: ['disciplina', 'bestas'], nome: 'Fogo em salvas', desc: 'Todos os atiradores disparam juntos, ao comando.', ef: '+20% de dano de arqueiros e mosqueteiros' },
  // ---------- cerco e muralhas ----------
  escadas: { r: 'cerco', t: 1, custo: 12, nome: 'Escadas e aríetes', desc: 'Aríetes com cabeça de ferro e escadas com ganchos.', ef: 'cercos +15% mais fortes • o aríete precisa de 2 golpes a menos' },
  engenharia: { r: 'cerco', t: 2, custo: 24, req: ['escadas'], nome: 'Engenharia', desc: 'Mestres de obras que sabem onde a muralha é fraca e como reforçar a sua.', ef: 'cercos +10% • guarnição das suas cidades +20%' },
  trabucos: { r: 'cerco', t: 3, custo: 38, req: ['engenharia'], nome: 'Trabucos de contrapeso', desc: 'Contrapesos de toneladas que jogam pedras enormes.', ef: 'cercos +25% • trabucos atiram 30% mais rápido no assalto' },
  muralhas: { r: 'cerco', t: 3, custo: 40, req: ['engenharia'], nome: 'Muralhas reforçadas', desc: 'Muralhas mais grossas e portões com grades de ferro.', ef: 'guarnição +35% • o portão aguenta 3 golpes a mais do aríete inimigo' },
  // ---------- economia ----------
  arado: { r: 'eco', t: 1, custo: 10, nome: 'Arado de ferro', desc: 'A terra rende mais e sobra comida para vender.', ef: '+10% de renda da vila • exércitos da IA maiores' },
  escolas: { r: 'eco', t: 2, custo: 20, req: ['arado'], nome: 'Escolas e escribas', desc: 'Gente que sabe ler, contar e copiar livros.', ef: '+30% de pontos de pesquisa' },
  estradas: { r: 'eco', t: 2, custo: 22, req: ['arado'], nome: 'Estradas e logística', desc: 'Pontes, carroças e depósitos ao longo do caminho.', ef: 'exércitos marcham 25% mais rápido • se recuperam mais rápido no acampamento' },
  moeda: { r: 'eco', t: 3, custo: 36, req: ['estradas'], nome: 'Casa da moeda', desc: 'Moeda própria, cobradores e um tesouro organizado.', ef: '+20% de renda da vila • exércitos da IA maiores' }
};
// as pesquisas custam o dobro do número escrito acima (a árvore inteira leva meses do jogo)
for (const id in TECS) TECS[id].custo *= 2;
// em que cada povo gosta de pesquisar primeiro
const TEC_GOSTO = { anao: 'arm', orc: 'tat', elfo: 'armas', draconato: 'arm', humano: 'eco', halfling: 'eco', tiefling: 'armas', nyxar: 'tat' };

const Tecnologia = {
  // ---------- estado (vai junto com o save da guerra) ----------
  todos() { const S = War.st(); return S.tec || (S.tec = {}); },
  de(k) {
    const T = this.todos(); if (!k) return null;
    let e = T[k];
    if (!e) {
      e = T[k] = { f: {}, pts: 0, atual: null, dia: Game.day };
      if (k !== 'jogador') this.inicio(k, e);
    }
    return e;
  },
  tem(k, id) { if (!k || !War.K || !War.K[k]) return false; const e = this.todos()[k]; return !!(e && e.f[id]); },
  n(k) { const e = this.todos()[k]; return e ? Object.keys(e.f).length : 0; },
  pode(k, id) { const e = this.de(k), T = TECS[id]; return !e.f[id] && (T.req || []).every(r => e.f[r]); },
  // um reino da IA que acabou de aparecer já pesquisou um pouco (o mundo não começou hoje)
  inicio(k, e) {
    if (KSTYLE[k] && KSTYLE[k].musket) for (const id of ['ferro', 'escadas', 'aco', 'engenharia', 'polvora']) e.f[id] = Game.day || 1;
    const dias = Math.max(0, (Game.day || 1) - 1) + 5;   // uns dias de vantagem: cada reino já começa com algo
    if (dias) { e.pts += Math.round(this.ptsIA(k) * dias * 0.8); this.gastaIA(k, e, true); }
  },
  // ---------- pontos de pesquisa ----------
  cidades(k) { return Game.world ? Game.world.settlements.filter(s => War.ownerOf(s) === k).length : 0; },
  ptsDia(k) {
    let p;
    if (k === 'jogador') {
      const V = Vila.st(); if (!V) return 0;
      const b = V.built;
      p = 2 + Math.floor(V.pop / 5) + (b.ferraria ? 1 : 0) + (b.templo ? 1 : 0) + (b.quartel ? 1 : 0) + (b.alquimista ? 1 : 0) + Math.max(0, this.cidades('jogador') - 1) * 2;
    } else p = this.ptsIA(k);
    if (this.tem(k, 'escolas')) p *= 1.3;
    return Math.round(p * 10) / 10;
  },
  ptsIA(k) { return 3 + Math.min(8, this.cidades(k) * 0.6); },
  // escolhe a próxima pesquisa da IA (cada povo tem o seu gosto) e gasta os pontos
  gastaIA(k, e, quieto) {
    for (let g = 0; g < 30; g++) {
      if (!e.atual || e.f[e.atual]) e.atual = this.escolheIA(k, e);
      if (!e.atual) return;
      const T = TECS[e.atual]; if (e.pts < T.custo) return;
      e.pts -= T.custo; e.f[e.atual] = Game.day || 1;
      if (!quieto && War.K[k] && Game.started && T.t >= 3 && this.importa(k)) War.news(`🔬 ${War.K[k].short} descobriu: ${T.nome}.`, false, [k]);
      e.atual = null;
    }
  },
  importa(k) { return k && (War.atWar('jogador', k) || Reino.rel(k) !== 0 || War._kList && War._kList.length < 12); },
  escolheIA(k, e) {
    const K = War.K[k], gosto = K && TEC_GOSTO[K.race], rng = new RNG(hashStr(k) + Game.day * 31 + this.n(k));
    const ok = Object.keys(TECS).filter(id => !e.f[id] && (TECS[id].req || []).every(r => e.f[r]));
    if (!ok.length) return null;
    const emGuerra = War.warOf(k).length > 0;
    return rng.weighted(ok.map(id => { const T = TECS[id]; let w = 10 / T.custo; if (T.r === gosto) w *= 3; if (emGuerra && (T.r === 'arm' || T.r === 'armas' || T.r === 'tat')) w *= 1.6; if (T.r === 'eco' && !emGuerra) w *= 1.3; return { id, w }; })).id;
  },
  // ---------- um dia passa ----------
  dia() {
    if (!War.K) return;
    for (const K of War._kList || []) {
      if (K.extinto) continue;
      const k = K.id, e = this.de(k);
      if (e.ult === Game.day) continue; e.ult = Game.day;
      if (k === 'jogador') { this.diaJogador(e); continue; }
      e.pts += this.ptsIA(k) * (this.tem(k, 'escolas') ? 1.3 : 1) * (0.7 + Math.random() * 0.6);
      this.gastaIA(k, e);
    }
    // jogador sem reino ainda (vila vassala): pesquisa do mesmo jeito
    if (!War.K.jogador && Vila.st()) { const e = this.todos().jogador || (this.todos().jogador = { f: {}, pts: 0, atual: null }); if (e.ult !== Game.day) { e.ult = Game.day; this.diaJogador(e); } }
  },
  diaJogador(e) {
    e.pts += this.ptsDia('jogador'); e.fin = 0;
    this.avancaJogador(e);
  },
  avancaJogador(e) {
    const id = e.atual; if (!id || e.f[id]) return;
    const T = TECS[id]; if (e.pts < T.custo) return;
    e.pts -= T.custo; e.f[id] = Game.day; e.atual = null;
    Game.centerMsg('🔬 PESQUISA CONCLUÍDA!', `${T.nome}: ${T.ef}`); Sfx.play('quest');
    Game.chron(`Meus estudiosos concluíram a pesquisa: ${T.nome}.`);
    this.sincOrdens(); Reino.painelKey = '';
  },
  // o jogador usa a mesma árvore estando ou não na lista de reinos
  meu() { const T = this.todos(); return T.jogador || (T.jogador = { f: {}, pts: 0, atual: null }); },
  temJ(id) { return !!this.meu().f[id]; },

  // ---------- efeitos ----------
  // tem(k, id) para o jogador funciona também antes de ele virar reino
  t(k, id) { return k === 'jogador' ? this.temJ(id) : this.tem(k, id); },
  nivelArm(k) { return ['gambeson', 'cota', 'placas', 'gotica'].filter(id => this.t(k, id)).length; },
  vida(k) { return 1 + (this.t(k, 'gambeson') ? 0.1 : 0) + (this.t(k, 'cota') ? 0.12 : 0) + (this.t(k, 'placas') ? 0.15 : 0) + (this.t(k, 'gotica') ? 0.18 : 0); },
  dano(k, kind, atirador) {
    let d = 1 + (this.t(k, 'ferro') ? 0.08 : 0) + (this.t(k, 'aco') ? 0.12 : 0) + (this.t(k, 'disciplina') ? 0.05 : 0);
    if (kind === 'arqueiro' && this.t(k, 'bestas')) d += 0.35;
    if (atirador && this.t(k, 'salva')) d += 0.2;
    if (kind === 'cavaleiro' && this.t(k, 'carga')) d += 0.3;
    return d;
  },
  ataque(k) { let a = 1; for (const [id, v] of [['ferro', 0.08], ['aco', 0.12], ['formacao', 0.05], ['disciplina', 0.06], ['carga', 0.06], ['flanqueio', 0.1], ['salva', 0.06], ['bestas', 0.05], ['polvora', 0.15]]) if (this.t(k, id)) a += v; return a; },
  defesa(k) { return this.vida(k) + (this.t(k, 'formacao') ? 0.06 : 0); },
  // perdas que o exército atk causa no def, nas batalhas fora da vista
  fatorBatalha(atk, def) { return clamp(this.ataque(atk) / this.defesa(def), 0.55, 1.9); },
  fatorCerco(k) { return 1 + (this.t(k, 'escadas') ? 0.15 : 0) + (this.t(k, 'engenharia') ? 0.1 : 0) + (this.t(k, 'trabucos') ? 0.25 : 0); },
  defesaCidade(k) { return 1 + (this.t(k, 'engenharia') ? 0.2 : 0) + (this.t(k, 'muralhas') ? 0.35 : 0); },
  marcha(k) { return this.t(k, 'estradas') ? 1.25 : 1; },
  rendaPct() { return (this.temJ('arado') ? 0.1 : 0) + (this.temJ('moeda') ? 0.2 : 0); },
  exercito(k) { return 1 + (this.t(k, 'arado') ? 0.08 : 0) + (this.t(k, 'moeda') ? 0.1 : 0) + (this.t(k, 'estradas') ? 0.05 : 0); },
  // armadura nova no corpo dos soldados
  visual(k, kind, L) {
    const S = KSTYLE[k]; if (!S || S.musket) { if (S && this.t(k, 'gotica') && WAR_KIND_RANK[kind] >= 1) L.chestplate = true; return L; }
    const r = WAR_KIND_RANK[kind], n = this.nivelArm(k), metal = shade(S.metal, [-0.12, 0, 0.12, 0.22][r] || 0);
    if (r === 0) {
      if (n >= 1) L.body = '#8a7656';
      if (n >= 2) { L.body = '#8c9098'; L.legs = '#5a5c62'; }
      if (n >= 3 && !(S.helm1 === 'turban')) { delete L.hood; L.helm = metal; L.helmStyle = S.helm1 || 'kettle'; }
    } else {
      if (n >= 3) L.chestplate = true;
      if (n >= 4) { L.legs = shade(metal, -0.2); if (!L.pauldron) L.pauldron = shade(metal, 0.18); if (r === 1 && S.helm1 !== 'turban') L.helmStyle = S.helm2 || 'full'; }
    }
    return L;
  },
  // ---------- na batalha ao vivo ----------
  recebe(t) {
    const k = t.faction; if (!k || t.ctrl !== 'battle') return 1;
    if (k === 'jogador' && Reino.ordem === 'parede' && this.temJ('formacao')) return 0.6;
    if (this.t(k, 'formacao') && t.look && t.look.shield) return 0.88;
    return 1;
  },
  causa(src) {
    if (!src || !src.faction || src.ctrl !== 'battle') return 1;
    let m = 1; const now = Game.t;
    if (src.cargaT > now) m *= src.kind === 'cavaleiro' ? 1.4 : 1.25;
    if (src.flankT > now) m *= 1.3;
    return m;
  },
  // ordens novas no painel de tática
  sincOrdens() {
    const ok = { parede: 'formacao', carga: 'carga', flanquear: 'flanqueio' }, nomes = { parede: '🧱 Parede de escudos', carga: '🐎 Carga!', flanquear: '↪ Flanquear' };
    for (const o in ok) { if (this.temJ(ok[o])) ORDENS[o] = nomes[o]; else delete ORDENS[o]; }
  },
  meusNaBatalha() { return Game.actors.filter(m => m.faction === 'jogador' && !m.dead && m.ctrl === 'battle'); },
  ordem(o) {
    const R = Reino, P = Game.player, now = Game.t, meus = this.meusNaBatalha();
    R.ordem = o; R.painelKey = '';
    for (const m of Game.actors) if (m.faction === 'jogador' && !m.dead) { m.hold = o === 'parede' ? { x: m.x, y: m.y } : null; m.retarget = 0; m.flankP = null; this.velNormal(m); }
    if (o === 'carga') for (const m of meus) { m._spd0 = m.spd; m.spd *= m.kind === 'cavaleiro' ? 1.45 : 1.25; m.cargaT = now + 8; m.aggro = 600; }
    if (o === 'flanquear') {
      // o centro de cada lado: metade vai pelos lados e cai nas costas do inimigo
      const bid = meus.length && meus[0].battleId, deles = Game.actors.filter(m => !m.dead && m.battleId === bid && m.faction !== 'jogador');
      if (meus.length && deles.length) {
        const c = (L) => L.reduce((a, m) => ({ x: a.x + m.x / L.length, y: a.y + m.y / L.length }), { x: 0, y: 0 });
        const M = c(meus), E = c(deles), d = Math.hypot(E.x - M.x, E.y - M.y) || 1, ux = (E.x - M.x) / d, uy = (E.y - M.y) / d;
        meus.forEach((m, i) => { if (i % 2 === 0) { m.aggro = 600; return; } const lado = (i % 4 === 1) ? 1 : -1; m.flankP = { x: E.x - uy * lado * 80 + ux * 40, y: E.y + ux * lado * 80 + uy * 40 }; m.flankT0 = now; m.aggro = 600; });
      }
    }
    Game.floater(P.x, P.y - 40, { parede: 'PAREDE DE ESCUDOS!', carga: 'CARREGAR!', flanquear: 'PELOS FLANCOS!' }[o], '#ffe080', 1.2);
    Sfx.play('shout');
  },
  velNormal(m) { if (m._spd0) { m.spd = m._spd0; m._spd0 = null; } },
  tatica(m, t, dt, sf) {
    const o = Reino.ordem;
    if (m._spd0 && !(m.cargaT > Game.t)) this.velNormal(m);
    if (o === 'parede') { Reino.ordem = 'segurar'; try { if (m.ai === 'musket' || m.ai === 'ranged') return false; return this.t0.call(Reino, m, t, dt, sf); } finally { Reino.ordem = 'parede'; } }
    if (o === 'carga') { m.aggro = 600; return false; }
    if (o === 'flanquear') {
      m.aggro = 600;
      if (m.flankP) {
        if (dist(m.x, m.y, m.flankP.x, m.flankP.y) < 18 || Game.t - m.flankT0 > 7) { m.flankP = null; m.flankT = Game.t + 6; return false; }
        m.moveToward(m.flankP.x, m.flankP.y, m.spd * 1.15 * sf, dt); return true;
      }
      return false;
    }
    return null;
  },

  // ---------- telas ----------
  estado(id) {
    const e = this.meu(), T = TECS[id];
    if (e.f[id]) return 'feita';
    if (e.atual === id) return 'atual';
    return (T.req || []).every(r => e.f[r]) ? 'livre' : 'trava';
  },
  dias(id) { const e = this.meu(), p = this.ptsDia('jogador'); if (!p) return '?'; return Math.max(0, Math.ceil((TECS[id].custo - e.pts) / p)); },
  tela(back) {
    this.sel = this.sel || this.meu().atual || 'gambeson';
    const e = this.meu(), V = Vila.st(), f = UI.reg(), P = Game.player, voltar = back || (() => UI.close());
    const pd = this.ptsDia('jogador'), sel = TECS[this.sel], est = this.estado(this.sel);
    const carta = (id) => {
      const T = TECS[id], s = this.estado(id);
      const lab = s === 'feita' ? '✅' : s === 'atual' ? `🔬 ${Math.min(T.custo, Math.floor(e.pts))}/${T.custo}` : s === 'trava' ? '🔒 ' + T.custo : '📜 ' + T.custo;
      return `<button class="tec-c ${s} ${this.sel === id ? 'sel' : ''}" ${f(() => { this.sel = id; this.tela(back); })}><span class="tec-n">${T.nome}</span><span class="tec-s">${lab}</span></button>`;
    };
    const cols = Object.entries(TEC_RAMOS).map(([r, R]) => `<div class="tec-col"><div class="tec-h">${R.ic} ${R.nome}</div>${Object.keys(TECS).filter(id => TECS[id].r === r).sort((a, b) => TECS[a].t - TECS[b].t).map(carta).join('')}</div>`).join('');
    const reqs = (sel.req || []).map(r => `${e.f[r] ? '✅' : '❌'} ${TECS[r].nome}`).join(' • ');
    let acao = '';
    if (!V) acao = '<span class="warn">Funde uma vila para ter estudiosos e pesquisar.</span>';
    else if (est === 'livre') acao = `<button class="mbtn small gold" ${f(() => { e.atual = this.sel; this.avancaJogador(e); this.tela(back); })}>🔬 Pesquisar (${sel.custo} pontos • ~${this.dias(this.sel)} dia(s))</button>`;
    else if (est === 'atual') acao = `<span class="gold">Pesquisando: faltam ~${this.dias(this.sel)} dia(s)</span>`;
    else if (est === 'feita') acao = '<span class="good">Já pesquisada</span>';
    else acao = `<span class="dim">Precisa antes: ${reqs}</span>`;
    const fin = e.fin || 0, preco = 200 + fin * 100;
    const finBtn = V && fin < 3 ? `<button class="mbtn small" ${f(() => { if (P.gold < preco) return Game.toast('Ouro insuficiente.', '#ff8080'); P.gold -= preco; e.pts += 10; e.fin = fin + 1; Sfx.play('coin'); this.avancaJogador(e); this.tela(back); })}>💰 Financiar estudiosos (+10 pontos: ${preco} ouro)</button>` : '';
    const atual = e.atual ? `${TECS[e.atual].nome} (${Math.floor(e.pts)}/${TECS[e.atual].custo})` : '<span class="warn">nada — escolha uma pesquisa</span>';
    const el = UI.show('tec', `<div class="panel wide tec-panel"><div class="ptitle">🔬 Árvore de tecnologia — ${esc(V ? Reino.nome() : 'sem reino')}</div>
      <div class="small">Pontos por dia: <b class="gold">${pd}</b> • Guardados: <b>${Math.floor(e.pts)}</b> • Pesquisando: ${atual}</div>
      <div class="tec-info"><b class="gold">${TEC_RAMOS[sel.r].ic} ${sel.nome}</b> <span class="dim small">(nível ${sel.t})</span><br>${sel.desc}<br><span class="good small">Efeito: ${sel.ef}</span>${sel.req ? `<br><span class="small">Requisitos: ${reqs}</span>` : ''}<div class="row" style="margin-top:4px;gap:6px;flex-wrap:wrap">${acao}</div></div>
      <div class="tec-tree">${cols}</div>
      <div class="sub">Os outros reinos</div><div class="small">${this.resumoReinos()}</div>
      <div class="row end" style="margin-top:6px;gap:6px;flex-wrap:wrap">${finBtn}<button class="mbtn small gold" ${f(voltar)}>Voltar</button></div>
      <div class="dim small">Mais colonos, Ferraria, Templo, Quartel, Alquimista, mais cidades e Escolas dão mais pontos. Os reinos da IA também pesquisam, cada povo do seu jeito.</div></div>`, { cls: 'scroll', onBack: voltar });
    UI.bind(el, f);
  },
  melhor(k, r) { const ids = Object.keys(TECS).filter(id => TECS[id].r === r && this.tem(k, id)).sort((a, b) => TECS[b].t - TECS[a].t); return ids.length ? TECS[ids[0]].nome : '—'; },
  resumoReinos() {
    const V = Vila.st(), cx = V ? V.cx : Game.player.x / 16, cy = V ? V.cy : Game.player.y / 16;
    const ks = (War.kingdoms() || []).filter(k => k.id !== 'jogador' && !k.extinto).sort((a, b) => (War.atWar('jogador', b.id) - War.atWar('jogador', a.id)) || dist(a.cap.x, a.cap.y, cx, cy) - dist(b.cap.x, b.cap.y, cx, cy)).slice(0, 8);
    for (const k of ks) this.de(k.id);
    return ks.map(k => `<b style="color:${k.color}">■</b> ${esc(k.short)}${War.atWar('jogador', k.id) ? ' ⚔' : ''}: <b>${this.n(k.id)}</b> pesquisas • 🛡 ${this.melhor(k.id, 'arm')} • ⚔ ${this.melhor(k.id, 'armas')} • 🚩 ${this.melhor(k.id, 'tat')}`).join('<br>');
  },
  textoDiplo(k) { this.de(k); return `<br><span class="small">🔬 ${this.n(k)} pesquisas • 🛡 ${this.melhor(k, 'arm')} • ⚔ ${this.melhor(k, 'armas')} • 🚩 ${this.melhor(k, 'tat')}${this.tem(k, 'polvora') ? ' • 🔫 pólvora' : ''}</span>`; },
  botoesTab(f) {
    const e = this.meu();
    if (!Vila.st()) return '';
    return `<div class="quest"><b>🔬 Tecnologia</b> — ${Object.keys(e.f).length}/${Object.keys(TECS).length} pesquisas${e.atual ? ` • pesquisando ${TECS[e.atual].nome} (${Math.floor(e.pts)}/${TECS[e.atual].custo})` : ' • <span class="warn">nenhuma pesquisa escolhida</span>'}<br><button class="mbtn" ${f(() => this.tela(() => UI.openMenu('war')))}>🔬 Árvore de tecnologia</button></div>`;
  }
};

// a Armadura Gótica que o Quartel forja depois da pesquisa
idef('armadura_gotica', { name: 'Armadura Gótica', type: 'armor', slot: 'body', akind: 'body', mat: 'aco', armor: 62, icon: { k: 'body', c: '#d0d4dc' }, lvl: 1, wlook: { pauldron: '#d8dce4' }, value: 2600, desc: 'Armadura completa de placas, o auge da forja do seu reino.' });
idef('elmo_gotico', { name: 'Elmo Gótico', type: 'armor', slot: 'head', akind: 'head', mat: 'aco', armor: 22, icon: { k: 'head', c: '#d0d4dc' }, lvl: 1, wlook: { helmStyle: 'full' }, value: 1200, desc: 'Elmo fechado com viseira, da armadura gótica.' });

// ---------------- ganchos ----------------
(function () {
  const W = War;
  // um dia passa: todos pesquisam
  const d0 = W.daily; W.daily = function () { const r = d0.apply(this, arguments); Tecnologia.dia(); return r; };
  // soldados: vida, dano e visual
  const l0 = W.look; W.look = function (k, kind, rng) { return Tecnologia.visual(k, kind, l0.call(this, k, kind, rng)); };
  const m0 = W.makeSoldier;
  W.makeSoldier = function (k, kind, x, y, rng) {
    const m = m0.call(this, k, kind, x, y, rng), T = Tecnologia;
    const v = T.vida(k); if (v !== 1) { m.maxHp = m.hp = Math.round(m.maxHp * v); }
    m.dmg *= T.dano(k, kind, m.ai === 'musket' || m.ai === 'ranged' || kind === 'arqueiro');
    return m;
  };
  // reinos com pólvora (sem ser da era dos mosquetes) passam a ter mosqueteiros
  const p0 = W.pickKind;
  W.pickKind = function (k, rng, n) {
    const r = p0.call(this, k, rng, n);
    if ((r === 'soldado' || r === 'milicia') && KSTYLE[k] && !KSTYLE[k].musket && Tecnologia.t(k, 'polvora') && rng.next() < 0.3) return 'mosqueteiro';
    return r;
  };
  // batalhas e cercos fora da vista
  W.fatorBatalha = (a, b) => Tecnologia.fatorBatalha(a, b);
  W.fatorCerco = (k) => Tecnologia.fatorCerco(k);
  W.fatorMarcha = (k) => Tecnologia.marcha(k);
  const g0 = W.garrison; W.garrison = function (s) { const g = g0.call(this, s); return s.playerVila ? g : Math.round(g * Tecnologia.defesaCidade(W.ownerOf(s))); };
  const rg0 = Reino.guarnicao; Reino.guarnicao = function () { return Math.round(rg0.call(this) * Tecnologia.defesaCidade('jogador')); };
  const r0 = W.raise;
  W.raise = function (k, foe, rng, adv) {
    const S = this.st(), antes = S.armies.length, r = r0.apply(this, arguments);
    for (const a of S.armies.slice(antes)) if (a.k === k) { const f = Tecnologia.exercito(k); if (f !== 1) a.n = a.n0 = Math.round(a.n * f); }
    return r;
  };
  // moral: tropas disciplinadas aguentam mais antes de fugir
  const mo0 = Estrategia.moral;
  Estrategia.moral = function (m, bt) {
    const r = mo0.call(this, m, bt);
    if (!r || !Tecnologia.t(m.faction, 'disciplina')) return r;
    const meus = bt._vivos[m.armyId] || 0, max = bt._max[m.armyId] || 1;
    return meus <= max * 0.2;
  };
  // dano na batalha ao vivo: parede de escudos, carga e flanqueio
  const c0 = Combat.damage;
  Combat.damage = function (t, amount, o) {
    if (t && t.faction) amount *= Tecnologia.recebe(t);
    if (o && o.src && o.src.faction) amount *= Tecnologia.causa(o.src);
    return c0.call(this, t, amount, o);
  };
  // ordens novas
  const t0 = Reino.tatica; Tecnologia.t0 = t0;
  Reino.tatica = function (m, t, dt, sf) {
    if (m.ctrl === 'battle') { const r = Tecnologia.tatica(m, t, dt, sf); if (r !== null) return r; }
    return t0.call(this, m, t, dt, sf);
  };
  const o0 = Reino.darOrdem;
  Reino.darOrdem = function (o) {
    if (o === 'parede' || o === 'carga' || o === 'flanquear') return Tecnologia.ordem(o);
    for (const m of Game.actors) if (m.faction === 'jogador') { Tecnologia.velNormal(m); m.flankP = null; m.cargaT = 0; }
    return o0.call(this, o);
  };
  const tk0 = Reino.tick; Reino.tick = function (dt) { if (Game.player && War.K) Tecnologia.sincOrdens(); const r = tk0.call(this, dt); const el = this.el; if (el) el.classList.toggle('muitos', el.querySelectorAll('button').length > 6); return r; };
  // pólvora: mosqueteiros sem acordo de armas
  const pd0 = Reino.pode; Reino.pode = function (kind) { if (kind === 'mosqueteiro' && Tecnologia.temJ('polvora')) return true; return pd0.call(this, kind); };
  TROPAS.mosqueteiro.pnome = 'a pesquisa da Pólvora ou um acordo de armas com um reino de mosquetes';
  // economia: mais renda na vila (entra junto com a renda dos tratados)
  const rt0 = Reino.rendaTratados;
  Reino.rendaTratados = function () {
    const n = rt0.call(this), V = Vila.st(), pct = Tecnologia.rendaPct(); if (!V || !pct) return n;
    let base = V.pop * 3; for (const [k, d] of Object.entries(VILA_PREDIOS)) if (V.built[k] && d.renda) base += d.renda;
    return n + Math.round(base * pct);
  };
  // o assalto ao vivo: aríetes, trabucos e portões
  const a0 = Assalto.comecar;
  Assalto.comecar = function () {
    const r = a0.apply(this, arguments), C = Cerco.atual();
    if (C && C.fase === 'assalto' && C.portaoHp !== undefined && !C._tec) {
      C._tec = true; const D = War.army(C.defId);
      if (Tecnologia.temJ('escadas')) C.portaoHp -= 2;
      if (D && Tecnologia.t(D.k, 'muralhas')) C.portaoHp += 3;
      C.portaoHp = Math.max(2, C.portaoHp);
    }
    return r;
  };
  const at0 = Assalto.atira;
  Assalto.atira = function (m) { const r = at0.apply(this, arguments); if (m.k === 'trabuco' && Tecnologia.temJ('trabucos')) m.cd *= 0.7; return r; };
  // telas: Reinos (menu), diplomacia
  const bt0 = Povo.botoesTab; Povo.botoesTab = function (f) { return bt0.call(this, f) + Tecnologia.botoesTab(f); };
  const td0 = Corte.textoDiplo; Corte.textoDiplo = function (k) { return td0.call(this, k) + Tecnologia.textoDiplo(k); };
})();
