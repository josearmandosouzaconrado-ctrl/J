'use strict';
// =====================================================================
//  GESTÃO DO REINO
//  • Armazém do reino: você deposita os itens da mochila; a mina, os
//    lenhadores e os pedreiros guardam tudo lá; o Modo Construção usa o
//    armazém sem precisar ter nada na bolsa.
//  • Trabalhadores: você escolhe quantos colonos vão para cada serviço
//    (lenhadores, mineiros, fazendeiros, pedreiros).
//  • Cabana do lenhador: os lenhadores saem, cortam árvores, replantam a
//    muda no lugar e voltam com a madeira (dá para ver tudo).
//  • Estradas de pedra: você manda os pedreiros calçarem a estrada até
//    outra cidade. A obra anda devagar e dá para ver os pedreiros
//    trabalhando quando você passa. Os reinos da IA fazem o mesmo.
//  • Expandir a cidade: a vila cresce e ganha lugar para prédios novos.
// =====================================================================
O.MUDA = 163; O.LENHADOR = 164;
odef(O.MUDA, { name: 'Muda de árvore' });
odef(O.LENHADOR, { name: 'Cabana do Lenhador', solid: true, interact: 'lenhador' });
OSOLID[O.LENHADOR] = 1;
OBRAS.lenhador = { cat: 'Prédios', nome: 'Cabana do lenhador (madeira)', obj: () => O.LENHADOR, ouro: 300, mats: { tabua: 10, pedra: 6 } };

Sprites.extraObj[O.MUDA] = (v, f, r, mk) => {
  const c = mk(12, 14, p => { p(5, 6, '#6a4a2a', 2, 7); p(2, 3, '#4a8a3a', 4, 3); p(6, 1, '#5a9a42', 4, 4); p(3, 2, '#6ab04a', 2, 1); p(7, 1, '#7ac05a', 2, 1); p(3, 12, '#5a3a20', 6, 2); });
  return { c, oy: 0 };
};
Sprites.extraObj[O.LENHADOR] = (v, f, r, mk) => {
  // cabana de toras, pilha de lenha ao lado e um machado cravado no toco
  const c = mk(34, 30, p => {
    p(2, 12, '#7a4a24', 22, 16); for (let y = 12; y < 28; y += 3) { p(2, y, '#5a3418', 22, 1); p(1, y + 1, '#9a6a3a', 1, 1); p(24, y + 1, '#9a6a3a', 1, 1); }
    p(0, 6, '#4a3020', 26, 7); p(2, 3, '#5a3a24', 22, 4); p(5, 1, '#6a4a2a', 16, 3); p(0, 6, '#6a4a30', 26, 1);
    p(10, 19, '#2a1a10', 6, 9); p(11, 20, '#3a2414', 4, 8); p(15, 24, '#d0a040', 1, 1);
    p(4, 15, '#e8d090', 4, 3); p(18, 15, '#e8d090', 4, 3); p(4, 16, '#5a3418', 4, 1); p(18, 16, '#5a3418', 4, 1);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3 - i; j++) { p(25 + j * 3 + i, 25 - i * 3, '#8a5a30', 3, 3); p(26 + j * 3 + i, 26 - i * 3, '#d8b070', 1, 1); }
    p(27, 14, '#6a4422', 5, 3); p(28, 13, '#c8a070', 3, 1); p(29, 8, '#6a4424', 1, 6); p(28, 7, '#a0a4ac', 3, 3);
  });
  return { c, oy: 0 };
};

// prédios novos que só cabem na vila expandida (posições no anel novo de cada nível)
Object.assign(VILA_PREDIOS, {
  mercado: { nome: 'Mercado', bt: 'general', nivel: 1, x: 3, y: 1, ouro: 600, mats: { tabua: 16, pedra: 8, prego: 16 }, renda: 25, desc: 'Comerciantes de fora trazem mais renda todo dia.' },
  serraria: { nome: 'Serraria', bt: 'smith', nivel: 1, x: 10, y: 1, ouro: 500, mats: { tabua: 10, pedra: 10, lingote_ferro: 4 }, renda: 6, desc: 'Os lenhadores rendem 50% mais tábuas.' },
  escola: { nome: 'Escola', bt: 'house2', nivel: 1, x: 24, y: 1, ouro: 700, mats: { tabua: 14, pedra: 8, prego: 12 }, desc: '+3 pontos de pesquisa por dia na árvore de tecnologia.' },
  casa7: { nome: 'Casa nova', bt: 'house', nivel: 1, x: 31, y: 1, ouro: 150, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  celeiro: { nome: 'Celeiro', bt: 'stable', nivel: 1, x: 3, y: 35, ouro: 350, mats: { tabua: 18, prego: 12 }, desc: 'Guarda até 150 de trigo e dá lugar para mais 4 fazendeiros.' },
  casa8: { nome: 'Casa nova', bt: 'house', nivel: 1, x: 11, y: 35, ouro: 150, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  pedreira: { nome: 'Oficina dos pedreiros', bt: 'house2', nivel: 1, x: 24, y: 35, ouro: 450, mats: { tabua: 8, pedra: 20 }, desc: 'Mais 4 pedreiros, estradas 50% mais rápidas e blocos de pedra no armazém.' },
  casa9: { nome: 'Casa nova', bt: 'house', nivel: 1, x: 31, y: 35, ouro: 150, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa10: { nome: 'Chalé novo', bt: 'house3', nivel: 1, x: 1, y: 8, ouro: 100, mats: { tabua: 6, pedra: 4, prego: 8 }, cap: 3 },
  casa11: { nome: 'Chalé novo', bt: 'house3', nivel: 1, x: 36, y: 8, ouro: 100, mats: { tabua: 6, pedra: 4, prego: 8 }, cap: 3 },
  casa_moeda: { nome: 'Casa da Moeda', bt: 'general', nivel: 2, x: 3, y: 1, ouro: 1500, mats: { bloco_pedra: 16, lingote_ferro: 8, tabua: 10 }, renda: 45, desc: 'O tesouro do reino: muito mais renda.' },
  academia: { nome: 'Academia Militar', bt: 'house2', nivel: 2, x: 11, y: 1, ouro: 1200, mats: { bloco_pedra: 12, tabua: 12, prego: 16 }, desc: '+20 no limite de soldados do quartel.' },
  biblioteca: { nome: 'Biblioteca', bt: 'magic', nivel: 2, x: 30, y: 1, ouro: 1000, mats: { bloco_pedra: 10, tabua: 14 }, desc: '+4 pontos de pesquisa por dia.' },
  casa12: { nome: 'Casa nova', bt: 'house', nivel: 2, x: 38, y: 1, ouro: 160, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa13: { nome: 'Casa nova', bt: 'house', nivel: 2, x: 43, y: 1, ouro: 160, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa14: { nome: 'Casa nova', bt: 'house', nivel: 2, x: 3, y: 45, ouro: 160, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa15: { nome: 'Casa nova', bt: 'house', nivel: 2, x: 11, y: 45, ouro: 160, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa16: { nome: 'Casa nova', bt: 'house', nivel: 2, x: 30, y: 45, ouro: 160, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 },
  casa17: { nome: 'Casa nova', bt: 'house', nivel: 2, x: 38, y: 45, ouro: 160, mats: { tabua: 8, pedra: 4, prego: 10 }, cap: 4 }
});
const EXPANSOES = [
  { nome: 'Vila ampliada', pop: 14, ouro: 2500, mats: { tabua: 40, pedra: 40, prego: 30 } },
  { nome: 'Grande cidade', pop: 26, ouro: 7000, mats: { tabua: 60, bloco_pedra: 40, pedra: 40, prego: 40 }, capital: true }
];
const TRABALHOS = {
  lenhador: { nome: 'Lenhadores', ic: '🪓', desc: 'cortam árvores perto da Cabana do Lenhador e replantam as mudas', falta: 'construa uma Cabana do lenhador (Modo Construção)' },
  mineiro: { nome: 'Mineiros', ic: '⛏', desc: 'tiram pedra, ferro e ouro das minas', falta: 'construa uma Mina (Modo Construção)' },
  fazendeiro: { nome: 'Fazendeiros', ic: '🌾', desc: 'trigo no celeiro e +2 de renda cada um', falta: 'construa a Fazenda' },
  pedreiro: { nome: 'Pedreiros', ic: '🔨', desc: 'calçam as estradas de pedra (mais pedreiros, obra mais rápida)' }
};
const EST_DIRS = [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
const FALAS_TRAB = {
  lenhador: ['Corto uma e planto outra: assim a floresta nunca acaba.', 'Cuidado aí! Essa vai cair para o seu lado!', 'Madeira boa, essa. Vai virar tábua na serraria.'],
  mineiro: ['A veia de ferro está boa hoje.', 'Lá dentro é escuro e apertado, mas paga bem.', 'Pedra, ferro... e às vezes um pouquinho de ouro!'],
  pedreiro: ['Pedra por pedra, a estrada vai longe.', 'Quando acabar, as carroças vão voar por aqui!', 'Cuidado com a pedra solta, ainda não assentou.']
};

const Gestao = {
  // ---------- trabalhadores ----------
  trab() {
    const V = Vila.st(); if (!V) return null;
    if (!V.trab) { V.trab = { lenhador: 0, mineiro: Math.min(3 * Recursos.minas(), Math.floor(V.pop / 3)), fazendeiro: V.built.fazenda ? Math.min(2, Math.floor(V.pop / 4)) : 0, pedreiro: 0 }; }
    return V.trab;
  },
  cabanas() { return Construcao.obras().filter(o => o.k === 'lenhador'); },
  max(k) {
    const V = Vila.st(); if (!V) return 0; const b = V.built;
    // até 9 por serviço (por cabana e por mina); celeiro e oficina dos pedreiros dão mais 4
    if (k === 'lenhador') return 9 * this.cabanas().length;
    if (k === 'mineiro') return 9 * Recursos.minas();
    if (k === 'fazendeiro') return b.fazenda ? 9 + (b.celeiro ? 4 : 0) : 0;
    if (k === 'pedreiro') return 9 + (b.pedreira ? 4 : 0);
    return 0;
  },
  ocupados() { const t = this.trab() || {}; let n = 0; for (const k in TRABALHOS) n += t[k] || 0; return n; },
  livres() { const V = Vila.st(); return V ? V.pop - this.ocupados() : 0; },
  ajusta() {
    const V = Vila.st(), t = this.trab(); if (!t) return;
    for (const k in TRABALHOS) t[k] = clamp(t[k] || 0, 0, this.max(k));
    let sobra = this.ocupados() - V.pop;
    for (const k of ['pedreiro', 'lenhador', 'fazendeiro', 'mineiro']) { while (sobra > 0 && t[k] > 0) { t[k]--; sobra--; } }
  },
  muda(k, d) {
    const t = this.trab(); if (!t) return;
    if (d > 0) { if (this.livres() <= 0) return Game.toast('Não há colonos livres: a vila precisa de mais gente (ou tire alguém de outro serviço).', '#ffa080'); if (t[k] >= this.max(k)) return Game.toast(this.max(k) ? 'Já está no máximo para este serviço.' : (TRABALHOS[k].falta || 'Ainda não dá.'), '#ffa080'); }
    t[k] = clamp((t[k] || 0) + d, 0, this.max(k)); Sfx.play('pickup');
  },
  // ---------- o dia: produção ----------
  dia() {
    const V = Vila.st(); if (!V) return;
    this.ajusta();
    const t = this.trab(), A = Recursos.armazem(), add = (id, q) => { if (q > 0) A[id] = Math.min(9999, (A[id] || 0) + q); };
    add('tabua', Math.round(t.lenhador * 2 * (V.built.serraria ? 1.5 : 1)));
    add('lenha', t.lenhador * 2);
    if (t.fazendeiro) V.trigo = Math.min(V.built.celeiro ? 150 : 60, (V.trigo || 0) + Math.round(t.fazendeiro * 2 * Estacoes.colheita()));
    if (V.built.pedreira && (A.pedra || 0) >= 6) { A.pedra -= 6; add('bloco_pedra', 3); }
    // as árvores replantadas crescem de novo
    const C = V.cortes || {}, W = Game.world;
    for (const k in C) { const e = C[k]; if (Game.day - e.d >= 3) { const [x, y] = k.split(',').map(Number); delete C[k]; if (W && W.chunks.has(W.ckey(x >> 5, y >> 5)) && W.objAt(x, y) === O.MUDA) W.setObj(x, y, e.o); } }
  },
  // ---------- tela da gestão ----------
  tela(aba, volta) {
    const V = Vila.st(); if (!V) return Game.toast('Funde uma vila primeiro.', '#ffa080');
    this.aba = aba || this.aba || 'trab'; this.volta = volta || this.volta || null;
    this.ajusta();
    const f = UI.reg(), P = Game.player, re = (a) => f(() => this.tela(a || this.aba));
    const abas = [['trab', '👷 Trabalhadores'], ['arm', '📦 Armazém'], ['est', '🛣 Estradas'], ['pat', '🛡 Patrulhas'], ['exp', '🏗 Expandir']];
    let corpo = '';
    if (this.aba === 'trab') corpo = this.htmlTrab(f);
    else if (this.aba === 'arm') corpo = this.htmlArm(f);
    else if (this.aba === 'est') corpo = this.htmlEst(f);
    else if (this.aba === 'pat') corpo = Patrulhas.html(f);
    else corpo = this.htmlExp(f);
    const fechar = () => { const v = this.volta; this.volta = null; if (v) v(); else UI.close(); };
    const el = UI.show('gestao', `<div class="panel wide gestao-panel"><div class="ptitle">🏛 Gestão de ${esc(V.nome)}</div>
      <div class="small">Colonos: <b>${V.pop}/${Vila.cap()}</b> • Livres: <b class="gold">${this.livres()}</b> • ${esc(this.nivelNome())} • Cofre: <b class="gold">${fmt(V.cofre)}</b> • Seu ouro: <b class="gold">${fmt(P.gold)}</b></div>
      <div class="tabs">${abas.map(([k, n]) => `<button class="tab ${this.aba === k ? 'on' : ''}" ${re(k)}>${n}</button>`).join('')}</div>
      <div class="gestao-corpo">${corpo}</div>
      <div class="row end" style="margin-top:6px"><button class="mbtn small gold" ${f(fechar)}>Voltar</button></div></div>`, { cls: 'scroll', onBack: fechar });
    UI.bind(el, f);
  },
  nivelNome() { const V = Vila.st(), n = V.nivel || 0; return n === 0 ? Vila.titulo() + ' (tamanho original)' : EXPANSOES[n - 1].nome; },
  htmlTrab(f) {
    const t = this.trab(), V = Vila.st();
    const linhas = Object.entries(TRABALHOS).map(([k, T]) => {
      const mx = this.max(k), ef = k === 'lenhador' ? `+${Math.round(t[k] * 2 * (V.built.serraria ? 1.5 : 1))} tábuas e +${t[k] * 2} lenha por dia` : k === 'mineiro' ? (Recursos.minas() ? `minas trabalhando a ${Math.round(this.fatorMina() * 100)}%` : '') : k === 'fazendeiro' ? `+${t[k] * 2} trigo e +${t[k] * 2} ouro por dia` : `${this.ritmo().toFixed(1)} trechos de estrada por hora`;
      return `<div class="trab-l"><span class="trab-n">${T.ic} <b>${T.nome}</b>: <b class="gold">${t[k] || 0}</b>/${mx}</span><button class="sbtn small" ${f(() => { this.muda(k, -1); this.tela(); })}>−</button><button class="sbtn small" ${f(() => { this.muda(k, 1); this.tela(); })}>+</button><div class="dim small">${T.desc}${mx ? '' : T.falta ? ` • <span class="warn">${T.falta}</span>` : ''}${ef ? ` • <span class="good">${ef}</span>` : ''}</div></div>`;
    }).join('');
    return `${linhas}<div class="dim small">Os colonos livres pagam impostos e cuidam da vila. Quem trabalha continua morando e pagando, mas também produz para o armazém do reino.</div>`;
  },
  htmlArm(f) {
    const P = Game.player, A = Recursos.armazem();
    const tem = Object.entries(A).filter(([id, n]) => n > 0 && ITEMS[id]).sort((a, b) => b[1] - a[1]);
    const lista = tem.length ? tem.map(([id, n]) => `<div class="arm-l">${UI.icon(ITEMS[id].icon)} ${esc(ITEMS[id].name)}: <b>${n}</b> <button class="sbtn small" ${f(() => { const q = Math.min(n, 10); A[id] -= q; P.addItem(Items.make(id, q)); this.tela(); })}>Pegar 10</button><button class="sbtn small" ${f(() => { P.addItem(Items.make(id, A[id])); A[id] = 0; this.tela(); })}>Pegar tudo</button></div>`).join('') : '<div class="dim">O armazém está vazio.</div>';
    const mochila = this.depositaveis();
    const dep = mochila.length ? mochila.map(it => `<div class="arm-l">${UI.icon(ITEMS[it.id].icon)} ${esc(ITEMS[it.id].name)}: <b>${it.n || 1}</b> <button class="sbtn small" ${f(() => { this.depositar(it.id); this.tela(); })}>📥 Guardar</button></div>`).join('') : '<div class="dim small">Nenhum material ou comida na mochila.</div>';
    return `<div class="sub">No armazém do reino</div>${lista}
      <div class="sub">Da sua mochila ${mochila.length ? `<button class="sbtn small gold" ${f(() => { for (const it of this.depositaveis()) this.depositar(it.id, true); Sfx.play('pickup'); Game.toast('Tudo guardado no armazém do reino.', '#c8f0a0'); this.tela(); })}>📥 Guardar todos os materiais</button>` : ''}</div>${dep}
      <div class="dim small">O Modo Construção, as obras da vila, as armas de cerco e as estradas usam o que está aqui: não precisa carregar nada na mochila. A mina e os lenhadores também guardam a produção aqui.</div>`;
  },
  depositaveis() { const P = Game.player, vistos = new Set(); return P.inv.filter(it => { const d = ITEMS[it.id]; if (!d || P.isEquipped(it) || (d.type !== 'material' && d.type !== 'food') || vistos.has(it.id)) return false; vistos.add(it.id); return true; }).map(it => ({ id: it.id, n: P.count(it.id) })); },
  depositar(id, quieto) {
    const P = Game.player, A = Recursos.armazem(), n = P.count(id); if (!n) return;
    P.removeItem(id, n); A[id] = (A[id] || 0) + n;
    if (!quieto) { Sfx.play('pickup'); Game.toast(`${n}× ${ITEMS[id].name} no armazém do reino`, '#c8f0a0'); }
  },
  htmlExp(f) {
    const V = Vila.st(), n = V.nivel || 0, E = EXPANSOES[n], P = Game.player;
    const novos = Object.entries(VILA_PREDIOS).filter(([k, d]) => d.nivel === n + 1).map(([k, d]) => d.nome);
    const feitos = Object.entries(VILA_PREDIOS).filter(([k, d]) => d.nivel && d.nivel <= n && !V.built[k]).map(([k, d]) => d.nome);
    let txt = `<div>Tamanho atual: <b>${30 + n * 10}×${30 + n * 10}</b> (${esc(this.nivelNome())})</div>`;
    if (feitos.length) txt += `<div class="small">Lugares livres para construir com o Intendente: ${esc([...new Set(feitos)].join(', '))}</div>`;
    if (!E) return txt + '<div class="good">A sua cidade já está no tamanho máximo!</div>';
    const s = Vila.s, mats = Object.entries(E.mats).map(([id, q]) => `<span class="${P.count(id) + (Recursos.armazem()[id] || 0) >= q ? '' : 'bad'}">${q} ${esc(ITEMS[id].name)}</span>`).join(', ');
    const req = [[V.pop >= E.pop, `${E.pop} colonos (tem ${V.pop})`]];
    if (E.capital) req.push([!!(s && s.type === 'capital'), 'a vila precisa ser uma Cidade (20 colonos, Templo e Muralha)']);
    const espaco = this.espaco(n + 1);
    txt += `<div class="sub">Expandir para: ${esc(E.nome)} (${40 + n * 10}×${40 + n * 10})</div><div class="small">Custo: <b class="gold">${E.ouro} ouro</b> + ${mats}<br>${req.map(r => `${r[0] ? '✅' : '❌'} ${r[1]}`).join('<br>')}<br>${espaco ? `❌ ${esc(espaco)}` : '✅ há espaço em volta'}<br>Prédios novos: ${esc([...new Set(novos)].join(', '))}</div>`;
    if (req.every(r => r[0]) && !espaco) txt += `<button class="mbtn small gold" ${f(() => this.expandir())}>🏗 Expandir a cidade</button>`;
    return txt + '<div class="dim small">A muralha (se tiver) é refeita mais para fora e as ruas crescem até os portões novos. As suas obras do Modo Construção continuam no lugar. Os reinos da IA também crescem: aldeias viram vilas e vilas viram cidades.</div>';
  },
  espaco(nv) {
    const V = Vila.st(), W = Game.world, h = (30 + nv * 10) / 2;
    for (const s of W.settlements) { if (s.playerVila) continue; if (Math.abs(s.mid.x - V.cx) < (s.w || 30) / 2 + h + 4 && Math.abs(s.mid.y - V.cy) < (s.h || 30) / 2 + h + 4) return `${s.name} está perto demais`; }
    for (const d of W.dungeons) if (Math.abs(d.x - V.cx) < h + 3 && Math.abs(d.y - V.cy) < h + 3) return 'há uma masmorra perto demais';
    return null;
  },
  expandir() {
    const G = Game, P = G.player, V = Vila.st(), n = V.nivel || 0, E = EXPANSOES[n]; if (!E) return;
    if (P.gold < E.ouro) return G.toast('Ouro insuficiente.', '#ff8080');
    if (!G.hasMats(E.mats)) return G.toast('Faltam materiais (bolsa + armazém).', '#ff8080');
    P.gold -= E.ouro; G.takeMats(E.mats);
    V.nivel = n + 1;
    G.time += 6 * 60; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
    Vila.restore(); UI.close(); UI.fade(); Sfx.play('forge'); G.findFree(P);
    G.centerMsg(`${V.nome.toUpperCase()} CRESCEU!`, `${E.nome}: ${40 + n * 10}×${40 + n * 10} e prédios novos para construir.`);
    G.chron(`Expandi ${V.nome}: agora é uma ${E.nome.toLowerCase()}.`);
  },
  // obras do Modo Construção no lugar de um prédio do anel novo?
  sobrepoe(x0, y0, w, h) {
    return Construcao.obras().some(ob => { const [ow, oh] = Construcao.tamanho(ob.k, ob.r); return ob.x < x0 + w && ob.x + ow > x0 && ob.y < y0 + h + 1 && ob.y + oh > y0; });
  },

  // ---------- estradas de pedra ----------
  projs() { const S = War.st(); return S.obrasEst || (S.obrasEst = []); },
  pts(p) {
    const c = this._pts || (this._pts = new Map()); let L = c.get(p.id);
    if (!L) { L = [[p.x0, p.y0]]; let x = p.x0, y = p.y0; for (const ch of p.path) { const d = EST_DIRS[ch.charCodeAt(0) - 97]; x += d[0]; y += d[1]; L.push([x, y]); } c.set(p.id, L); }
    return L;
  },
  ehEstrada(W, x, y) { const s = W.roadTiles.get(W.ckey(x >> 5, y >> 5)); return !!(s && s.has(((y & 31) << 5) | (x & 31))); },
  // cidades num mapa de busca rápida (por trecho)
  cidadeEm(W, x, y) {
    if (this._sbW !== W || this._sbN !== W.settlements.length) {
      this._sbW = W; this._sbN = W.settlements.length; const M = this._sb = new Map();
      for (const s of W.settlements) { const x0 = s.x0 - 2, y0 = s.y0 - 2, x1 = s.x0 + s.w + 2, y1 = s.y0 + s.h + 2; for (let cy = y0 >> 5; cy <= y1 >> 5; cy++) for (let cx = x0 >> 5; cx <= x1 >> 5; cx++) { const k = W.ckey(cx, cy); if (!M.has(k)) M.set(k, []); M.get(k).push(s); } }
    }
    const L = this._sb.get(W.ckey(x >> 5, y >> 5)); if (!L) return null;
    for (const s of L) if (x >= s.x0 - 2 && y >= s.y0 - 2 && x < s.x0 + s.w + 2 && y < s.y0 + s.h + 2) return s;
    return null;
  },
  codifica(L) { let s = ''; for (let i = 1; i < L.length; i++) { const dx = L[i][0] - L[i - 1][0], dy = L[i][1] - L[i - 1][1]; s += String.fromCharCode(97 + EST_DIRS.findIndex(d => d[0] === dx && d[1] === dy)); } return s; },
  // busca pelas estradas a partir de (x,y): devolve as cidades alcançadas e o caminho até cada uma
  pelasEstradas(W, x, y, evitar, limite) {
    const K = (a, b) => a * 16384 + b, pai = new Map([[K(x, y), -1]]), fila = [x, y], achou = new Map();
    let h = 0;
    while (h < fila.length && pai.size < (limite || 160000)) {
      const cx = fila[h++], cy = fila[h++];
      const s = this.cidadeEm(W, cx, cy);
      if (s && s !== evitar && !achou.has(s)) achou.set(s, K(cx, cy));
      if (s && s !== evitar && pai.size > 1) continue;   // chegou numa cidade: não atravessa
      for (const [dx, dy] of EST_DIRS) { const nx = cx + dx, ny = cy + dy, k = K(nx, ny); if (pai.has(k) || !this.ehEstrada(W, nx, ny)) continue; pai.set(k, K(cx, cy)); fila.push(nx, ny); }
    }
    const caminho = (k) => { const L = []; while (k !== -1) { L.push([Math.floor(k / 16384), k % 16384]); k = pai.get(k); } return L.reverse(); };
    return { achou, caminho };
  },
  // da sua vila até a estrada mais perto (estrada nova, abrindo caminho no mato)
  ateEstrada(W, s) {
    const K = (a, b) => a * 16384 + b, pai = new Map(), fila = [];
    for (const g of s.gates) { const k = K(g.x, g.y); pai.set(k, -1); fila.push(g.x, g.y); }
    let h = 0, fim = null;
    while (h < fila.length && pai.size < 50000) {
      const cx = fila[h++], cy = fila[h++];
      if (this.ehEstrada(W, cx, cy)) { fim = K(cx, cy); break; }
      const c = this.cidadeEm(W, cx, cy); if (c && c !== s) { fim = K(cx, cy); break; }
      for (const [dx, dy] of EST_DIRS) {
        const nx = cx + dx, ny = cy + dy, k = K(nx, ny); if (pai.has(k)) continue;
        if (Math.abs(nx - s.mid.x) > 150 || Math.abs(ny - s.mid.y) > 150) continue;
        const t = W.baseTile(nx, ny); if (TSOLID[t] || TWATER[t] || t === T.LAVA || t === T.DEEP) continue;
        if (nx >= s.x0 && ny >= s.y0 && nx < s.x0 + s.w && ny < s.y0 + s.h) continue;
        pai.set(k, K(cx, cy)); fila.push(nx, ny);
      }
    }
    if (fim === null) return null;
    const L = []; let k = fim; while (k !== -1) { L.push([Math.floor(k / 16384), k % 16384]); k = pai.get(k); }
    return L.reverse();
  },
  // as opções de estrada da sua vila (com cache por dia)
  opcoes() {
    const W = Game.world, s = Vila.s; if (!W || !s) return [];
    const chave = s.id + ':' + Game.day + ':' + this.projs().length;
    if (this._op && this._op.k === chave) return this._op.v;
    const out = [], seg = this.ateEstrada(W, s);
    if (seg) {
      const fim = seg[seg.length - 1], c = this.cidadeEm(W, fim[0], fim[1]);
      const novo = this.ehEstrada(W, fim[0], fim[1]) ? seg.length - 1 : seg.length;
      if (c && c !== s) out.push({ nome: c.name, dest: c.id, L: seg, novo });
      else {
        if (seg.length > 2) out.push({ nome: 'só ligar a vila à estrada', dest: null, L: seg, novo });
        const R = this.pelasEstradas(W, fim[0], fim[1], s, 120000);
        for (const [c2, k] of R.achou) { const resto = R.caminho(k); out.push({ nome: c2.name, dest: c2.id, L: seg.concat(resto.slice(1)), novo }); }
      }
    }
    const feitos = new Set(this.projs().filter(p => p.k === 'jogador').map(p => p.dest + ''));
    const v = out.filter(o => !feitos.has(o.dest + '') && o.L.length > 1 && o.L.length < 2600).sort((a, b) => a.L.length - b.L.length).slice(0, 7);
    this._op = { k: chave, v };
    return v;
  },
  custo(o) { return { ouro: 40 + o.L.length * 2, mats: { pedra: Math.ceil(o.L.length * 0.6) } }; },
  ritmo(p) {
    if (p && p.k !== 'jogador') return 1.6 * Tecnologia.marcha(p.k);
    const V = Vila.st(), t = this.trab(); if (!V || !t) return 0;
    return t.pedreiro * (V.built.pedreira ? 1.5 : 1) * Tecnologia.marcha('jogador');
  },
  agora() { return Game.day * 1440 + Game.time; },
  novoProj(k, o, de) {
    const S = War.st(); S.estId = (S.estId || 0) + 1;
    const p = { id: S.estId, k, de, para: o.nome, dest: o.dest, x0: o.L[0][0], y0: o.L[0][1], path: this.codifica(o.L), novo: o.novo || 0, feito: 0, i: 0, t: this.agora(), dia: Game.day };
    this.projs().push(p); this._op = null;
    return p;
  },
  mandar(o) {
    const G = Game, P = G.player, c = this.custo(o);
    if (this.projs().some(p => p.k === 'jogador' && !p.done)) return G.toast('Os pedreiros já estão numa obra. Espere terminar.', '#ffa080');
    if (P.gold < c.ouro) return G.toast('Ouro insuficiente.', '#ff8080');
    if (!G.hasMats(c.mats)) return G.toast('Faltam pedras (bolsa + armazém).', '#ff8080');
    P.gold -= c.ouro; G.takeMats(c.mats);
    this.novoProj('jogador', o, Vila.st().nome);
    Sfx.play('quest');
    G.centerMsg('OBRA DA ESTRADA COMEÇOU!', `${o.L.length} trechos até ${o.nome}${(this.trab().pedreiro || 0) ? '' : ' • coloque pedreiros para trabalhar!'}`);
    G.chron(`Mandei calçar a estrada de ${Vila.st().nome} até ${o.nome}.`);
    this.tela('est');
  },
  htmlEst(f) {
    const meus = this.projs().filter(p => p.k === 'jogador'), ativo = meus.find(p => !p.done), t = this.trab();
    let h = '';
    if (ativo) {
      const L = this.pts(ativo).length, pc = Math.floor(ativo.feito / L * 100), r = this.ritmo(ativo), fx = this.pts(ativo)[Math.min(L - 1, ativo.feito)], P = Game.player;
      const dd = dist(P.x / 16, P.y / 16, fx[0], fx[1]), dir = ['leste', 'sudeste', 'sul', 'sudoeste', 'oeste', 'noroeste', 'norte', 'nordeste'][Math.round(((Math.atan2(fx[1] - P.y / 16, fx[0] - P.x / 16) * 180 / Math.PI + 360) % 360) / 45) % 8];
      h += `<div class="quest"><b class="gold">🛣 Obra: ${esc(ativo.de)} → ${esc(ativo.para)}</b><div class="barra"><div style="width:${pc}%"></div></div><small>${ativo.feito}/${L} trechos (${pc}%) • ${r ? `${r.toFixed(1)} por hora: faltam ~${Math.ceil((L - ativo.feito) / r)} horas` : '<span class="warn">parada: coloque pedreiros!</span>'}<br>A obra está a ${(dd * 2 / 1000).toFixed(1)} km, para o ${dir}.</small></div>`;
    }
    h += `<div class="small">Pedreiros: <b>${t.pedreiro}</b>/${this.max('pedreiro')} <button class="sbtn small" ${f(() => { this.muda('pedreiro', -1); this.tela(); })}>−</button><button class="sbtn small" ${f(() => { this.muda('pedreiro', 1); this.tela(); })}>+</button></div>`;
    if (!ativo) {
      const op = this.opcoes();
      h += '<div class="sub">Mandar calçar com pedra a estrada até…</div>' + (op.length ? op.map(o => { const c = this.custo(o); return `<div class="arm-l">🛣 <b>${esc(o.nome)}</b> — ${o.L.length} trechos${o.novo ? ` (${o.novo} de estrada nova)` : ''} • ${c.ouro} ouro + ${c.mats.pedra} pedras <button class="sbtn small gold" ${f(() => this.mandar(o))}>Mandar</button></div>`; }).join('') : '<div class="dim small">Nenhuma estrada por perto (ou todas já estão calçadas).</div>');
    }
    const prontas = meus.filter(p => p.done);
    if (prontas.length) h += `<div class="small good">Estradas de pedra prontas: ${prontas.map(p => esc(p.para)).join(', ')}</div>`;
    const ia = this.projs().filter(p => p.k !== 'jogador' && !p.done && War.K[p.k]).slice(0, 6);
    if (ia.length) h += '<div class="sub">Obras dos outros reinos</div>' + ia.map(p => `<small><b style="color:${War.K[p.k].color}">■</b> ${esc(War.K[p.k].short)}: ${esc(p.de)} → ${esc(p.para)} (${Math.floor(p.feito / this.pts(p).length * 100)}%)</small>`).join('<br>');
    return h + '<div class="dim small">A estrada de pedra é mais rápida para andar e para as caravanas. Passe pela obra para ver os pedreiros trabalhando.</div>';
  },
  // um trecho fica pronto: a estrada (e a de terra do lado) vira pedra
  pavimenta(W, p, j, aoVivo) {
    const L = this.pts(p), [x, y] = L[j]; if (x === undefined) return;
    const lista = [[x, y, j < p.novo]];
    if (j < p.novo) {
      const a = L[Math.max(0, j - 1)], b = L[Math.min(L.length - 1, j + 1)], dx = Math.sign(b[0] - a[0]), dy = Math.sign(b[1] - a[1]);
      lista.push([x - dy, y + dx, true]);
    } else for (const [dx, dy] of EST_DIRS) if (this.ehEstrada(W, x + dx, y + dy)) lista.push([x + dx, y + dy, false]);
    const PV = W.pave || (W.pave = new Map());
    for (const [tx, ty, novo] of lista) {
      if (novo) { if (W.settlementAt(tx, ty)) continue; const bt = W.baseTile(tx, ty); if (TWATER[bt] || TSOLID[bt] || bt === T.LAVA) continue; W.markRoad(tx, ty); }
      const k = W.ckey(tx >> 5, ty >> 5), idx = ((ty & 31) << 5) | (tx & 31);
      if (!PV.has(k)) PV.set(k, new Set()); PV.get(k).add(idx);
      if (!aoVivo) { (this._sujos || (this._sujos = new Set())).add(k); continue; }
      const ch = W.chunks.get(k); if (!ch) continue;
      if (novo && ch.tiles[idx] !== T.ROAD && !W.settlementAt(tx, ty)) { ch.tiles[idx] = T.ROAD; ch.objs[idx] = 0; }
      if (ch.tiles[idx] === T.ROAD) ch.tiles[idx] = T.PAVED;
      ch.objList = null; ch.lightList = null; W.dropCanvas(k); if (W.pending && W.pending.k === k) W.pending = null;
    }
  },
  // monta de novo as estradas prontas (ao carregar o jogo)
  sync() {
    const W = Game.world; if (!W || this._w === W) return;
    this._w = W; W.pave = new Map(); this._pts = new Map(); this._sujos = new Set();
    for (const p of this.projs()) for (let j = 0; j < p.feito; j++) this.pavimenta(W, p, j, false);
    for (const k of this._sujos) { W.chunks.delete(k); W.dropCanvas(k); }
    this._sujos = null;
    if (!War.st().estIni) this.iniciaIA();
  },
  // ---------- a IA calça as estradas dela ----------
  iniciaIA() {
    const S = War.st(); S.estIni = true;
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto);
    const rng = new RNG(Game.world.seed + 4242);
    for (let n = 0, tent = 0; n < 4 && tent < 30; tent++) { const K = rng.pick(ks); const p = this.projetoIA(K.id, rng); if (p) n++; if (p) { const L = this.pts(p).length; const alvo = Math.floor(L * rng.range(0.15, 0.7)); for (let j = 0; j < alvo; j++) this.pavimenta(Game.world, p, j, true); p.feito = p.i = alvo; } }
  },
  projetoIA(k, rng) {
    const W = Game.world, K = War.K[k]; if (!K || !K.cap) return null;
    const feitos = new Set(this.projs().filter(p => p.k === k).map(p => p.dest));
    // começa na estrada que sai da capital
    const c = K.cap; let ini = null;
    for (let r = 0; r < 8 && !ini; r++) for (const g of c.gates || []) for (let d = 0; d <= r && !ini; d++) for (const [dx, dy] of EST_DIRS) { const x = g.x + dx * d, y = g.y + dy * d; if (this.ehEstrada(W, x, y)) { ini = [x, y]; break; } }
    if (!ini) return null;
    // só as cidades do próprio reino que a estrada alcança (e que ainda não têm estrada de pedra)
    const R = this.pelasEstradas(W, ini[0], ini[1], c, 90000);
    const ok = [...R.achou.keys()].filter(t => War.ownerOf(t) === k && !feitos.has(t.id));
    if (!ok.length) return null;
    const alvo = rng.pick(ok), L = R.caminho(R.achou.get(alvo)); if (L.length < 8 || L.length > 1800) return null;
    const p = this.novoProj(k, { nome: alvo.name, dest: alvo.id, L, novo: 0 }, c.name);
    return p;
  },
  diaIA() {
    const ativos = this.projs().filter(p => p.k !== 'jogador' && !p.done).length;
    if (ativos >= 6 || Math.random() > 0.45) return;
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto && !War.warOf(k.id).length);
    if (!ks.length) return;
    const rng = new RNG(Game.day * 97 + ativos), K = rng.pick(ks), p = this.projetoIA(K.id, rng);
    if (p && Tecnologia.importa(K.id)) War.news(`🛣 ${K.short} começou a calçar com pedra a estrada de ${p.de} até ${p.para}.`, false, [K.id]);
  },
  // ---------- quadro a quadro ----------
  tick(dt) {
    const G = Game; if (!G.started || !G.player || !G.world || !War.K) return;
    this.sync();
    this.tT = (this.tT || 0) - dt;
    if (this.tT <= 0) {
      this.tT = 0.25;
      const now = this.agora(), W = G.world;
      for (const p of this.projs()) {
        if (p.done) continue;
        const dm = clamp(now - p.t, 0, 1440 * 3); p.t = now;
        p.i += dm / 60 * this.ritmo(p);
        const L = this.pts(p).length;
        while (p.feito < Math.min(L, Math.floor(p.i))) { this.pavimenta(W, p, p.feito, true); p.feito++; }
        if (p.feito >= L) {
          p.done = true; p.diaFim = G.day;
          if (p.k === 'jogador') { G.centerMsg('ESTRADA DE PEDRA PRONTA!', `${p.de} → ${p.para}`); Sfx.play('quest'); G.chron(`A estrada de pedra até ${p.para} ficou pronta.`); }
          else if (War.K[p.k] && Tecnologia.importa(p.k)) War.news(`🛣 ${War.K[p.k].short} terminou a estrada de pedra de ${p.de} até ${p.para}.`, false, [p.k]);
        }
      }
      if (G.level && G.level.isWorld) this.trabalhadores();
    }
  },

  // ---------- os trabalhadores que dá para ver ----------
  vivos() { return Game.actors.filter(a => a.trab && !a.dead); },
  criar(tipo, s, x, y, extra) {
    const rng = new RNG(Math.floor(Math.random() * 1e9)), a = new NPC({ role: 'citizen', x: Math.floor(x / 16), y: Math.floor(y / 16) }, s, rng);
    a.x = x; a.y = y;
    const L = a.look = Object.assign({}, a.look); delete L.robe;
    if (tipo === 'pedreiro') { L.apron = '#8a6a4a'; L.hat = rng.chance(0.5) ? 'cap' : 'bandana'; L.hatC = '#6a5a4a'; }
    if (tipo === 'lenhador') { L.body = rng.pick(['#a03030', '#3a5a3a', '#6a4a2a']); L.stripes = rng.chance(0.5); L.beard = L.beard || (a.sex === 'm' && rng.chance(0.6)); }
    if (tipo === 'mineiro') { L.body = '#5a5048'; L.hat = 'cap'; L.hatC = '#c8a030'; }
    a.S = Sprites.actor(L); a.h = a.S.h;
    a.trab = Object.assign({ tipo, estado: 'inicio', t: Math.random() * 2, ph: Math.random() }, extra);
    a.ferr = Sprites.weapon(tipo === 'lenhador' ? 'axe' : tipo === 'mineiro' ? 'pick' : 'hammer', '#a0a4ac');
    a.wclass = 'axe';
    Game.actors.push(a); return a;
  },
  trabalhadores() {
    const G = Game, P = G.player, W = G.world, V = Vila.st(), vs = Vila.s, vivos = this.vivos();
    // quem ficou longe some
    for (const a of vivos) { const o = a.trab; const ax = o.ox !== undefined ? o.ox : a.x, ay = o.oy !== undefined ? o.oy : a.y; if (dist(ax, ay, P.x, P.y) > 720) { G.actors.splice(G.actors.indexOf(a), 1); } }
    const conta = (f) => this.vivos().filter(f).length;
    const sobra = (f, n) => { const L = this.vivos().filter(f); for (const a of L.slice(n)) G.actors.splice(G.actors.indexOf(a), 1); };
    // lenhadores: até 3 por cabana
    if (V && vs) {
      const t = this.trab(); let resto = t.lenhador;
      for (const ob of this.cabanas()) {
        const q = Math.min(9, resto); resto -= q; const n = Math.min(6, q);
        sobra(a => a.trab.casa === ob, n);
        const cx = ob.x * 16 + 8, cy = ob.y * 16 + 14; if (dist(cx, cy, P.x, P.y) > 480) continue;
        for (let i = conta(a => a.trab.casa === ob); i < n; i++) this.criar('lenhador', vs, cx + 12 + i * 6, cy + 10, { casa: ob, ox: cx, oy: cy });
      }
      // mineiros: até 3 por mina
      let rm = t.mineiro;
      for (const ob of Construcao.obras().filter(o => o.k === 'mina')) {
        const q = Math.min(9, rm); rm -= q; const n = Math.min(4, q);
        sobra(a => a.trab.casa === ob, n);
        const cx = ob.x * 16 + 8, cy = ob.y * 16 + 16; if (dist(cx, cy, P.x, P.y) > 480) continue;
        for (let i = conta(a => a.trab.casa === ob); i < n; i++) this.criar('mineiro', vs, cx - 14 + i * 14, cy + 14, { casa: ob, ox: cx, oy: cy, n: i });
      }
    }
    // pedreiros na frente de cada obra de estrada
    for (const p of this.projs()) {
      if (p.done) continue;
      const L = this.pts(p), f = L[Math.min(L.length - 1, p.feito)], fx = f[0] * 16 + 8, fy = f[1] * 16 + 8;
      if (dist(fx, fy, P.x, P.y) > 520) continue;
      const s = p.k === 'jogador' ? vs : War.K[p.k] && War.K[p.k].cap; if (!s) continue;
      const n = p.k === 'jogador' ? Math.min(9, this.trab() ? this.trab().pedreiro : 0) : 4;
      sobra(a => a.trab.obra === p.id, n);
      for (let i = conta(a => a.trab.obra === p.id); i < n; i++) this.criar('pedreiro', s, fx + (Math.random() - 0.5) * 30, fy + (Math.random() - 0.5) * 30, { obra: p.id, n: i, proj: p, ox: fx, oy: fy });
    }
  },
  // o canto onde cada pedreiro trabalha: na frente da obra, dos dois lados da estrada
  vaga(a) {
    const o = a.trab, p = o.proj, L = this.pts(p), j = clamp(p.feito - 1 + (o.n >> 1), 0, L.length - 1), A = L[Math.max(0, j - 1)], B = L[Math.min(L.length - 1, j + 1)];
    const dx = Math.sign(B[0] - A[0]), dy = Math.sign(B[1] - A[1]), lado = o.n % 2 ? 1 : -1, [x, y] = L[j];
    return { x: x * 16 + 8 - dy * lado * 14, y: y * 16 + 10 + dx * lado * 12, alvo: { x: x * 16 + 8, y: y * 16 + 10 } };
  },
  anda(a, tx, ty, v, dt) {
    const d = dist(a.x, a.y, tx, ty); if (d < 3) { a.moving = false; return true; }
    const ang = Math.atan2(ty - a.y, tx - a.x); moveActor(a, Math.cos(ang) * Math.min(d, v * dt), Math.sin(ang) * Math.min(d, v * dt)); a.moving = true; a.anim += dt; a.setDir(ang);
    if (a.blocked) { a.preso = (a.preso || 0) + dt; if (a.preso > 2.5) { a.preso = 0; a.x += (tx - a.x) * 0.5; a.y += (ty - a.y) * 0.5; } } else a.preso = 0;
    return false;
  },
  // golpe da ferramenta: devolve true no instante da batida
  bate(a, dt, vel) {
    const o = a.trab, antes = o.ph; o.ph = (o.ph + dt * vel) % 1; a.batendo = true;
    return o.ph < antes;
  },
  mover(a, dt) {
    const o = a.trab, W = Game.world, P = Game.player;
    a.batendo = false; a.moving = false;
    if (a.talkT > 0) { a.talkT -= dt; a.setDir(angleTo(a.x, a.y, P.x, P.y)); return; }
    const perto = dist(a.x, a.y, P.x, P.y) < 160;
    if (o.tipo === 'pedreiro') {
      const p = o.proj; if (!p || p.done) { a.dead = true; Game.actors.splice(Game.actors.indexOf(a), 1); return; }
      const v = this.vaga(a);
      if (o.n === 3) {
        // o carregador: leva pedras do monte até a frente da obra
        const L = this.pts(p), m = L[Math.max(0, p.feito - 5)], mx = m[0] * 16 + 8 + 18, my = m[1] * 16 + 12;
        if (o.estado !== 'leva' && o.estado !== 'pega') o.estado = 'pega';
        if (o.estado === 'pega') { a.carrega = false; if (this.anda(a, mx, my, 30, dt)) { o.t -= dt; if (o.t <= 0) { o.estado = 'leva'; o.t = 1; a.carrega = 'pedra'; } } }
        else if (this.anda(a, v.alvo.x + 10, v.alvo.y + 8, 26, dt)) { o.t -= dt; if (o.t <= 0) { o.estado = 'pega'; o.t = 1.2; a.carrega = false; if (perto) Game.particle(a.x, a.y - 4, 0, -10, '#a8a090', 0.4); } }
        return;
      }
      if (!this.anda(a, v.x, v.y, 34, dt)) return;
      a.setDir(angleTo(a.x, a.y, v.alvo.x, v.alvo.y));
      if (this.bate(a, dt, 1.4) && perto) { for (let i = 0; i < 4; i++) Game.particle(v.alvo.x + (Math.random() - 0.5) * 12, v.alvo.y, (Math.random() - 0.5) * 50, -Math.random() * 50, Math.random() < 0.6 ? '#a8a090' : '#7a6a52', 0.5); if (Math.random() < 0.3) Sfx.play('block'); }
      return;
    }
    if (o.tipo === 'mineiro') {
      const sx = o.ox - 16 + o.n * 16, sy = o.oy + 10;
      if (o.estado === 'carrinho') { if (this.anda(a, o.ox + 30, o.oy + 18, 28, dt)) { o.t -= dt; if (o.t <= 0) { o.estado = 'bate'; o.t = 6 + Math.random() * 6; a.carrega = false; } } return; }
      if (!this.anda(a, sx, sy, 30, dt)) return;
      a.setDir(angleTo(a.x, a.y, o.ox, o.oy - 6));
      if (this.bate(a, dt, 1.2) && perto) for (let i = 0; i < 3; i++) Game.particle(o.ox + (Math.random() - 0.5) * 14, o.oy, (Math.random() - 0.5) * 60, -Math.random() * 60, Math.random() < 0.7 ? '#8a8580' : '#c0a060', 0.5);
      o.t -= dt; if (o.t <= 0) { o.estado = 'carrinho'; o.t = 1.5; a.carrega = 'pedra'; }
      return;
    }
    // lenhador
    const ob = o.casa, cx = o.ox, cy = o.oy;
    if (o.estado === 'inicio' || o.estado === 'procura') {
      const alvo = this.arvore(W, ob); if (!alvo) { o.estado = 'descansa'; o.t = 6; return; }
      o.arv = alvo; o.estado = 'vai';
    }
    if (o.estado === 'vai') {
      const [tx, ty] = o.arv; if (!TREE_OBJS.has(W.objAt(tx, ty))) { o.estado = 'procura'; return; }
      if (this.anda(a, tx * 16 + 8 + (o.ph > 0.5 ? 10 : -10), ty * 16 + 18, 30, dt)) { o.estado = 'corta'; o.t = 5 + Math.random() * 3; }
      return;
    }
    if (o.estado === 'corta') {
      const [tx, ty] = o.arv; a.setDir(angleTo(a.x, a.y, tx * 16 + 8, ty * 16 + 10));
      if (this.bate(a, dt, 1.3) && perto) { for (let i = 0; i < 4; i++) Game.particle(tx * 16 + 8 + (Math.random() - 0.5) * 6, ty * 16 + 8, (Math.random() - 0.5) * 70, -Math.random() * 60, Math.random() < 0.6 ? '#c8a070' : '#8a5a30', 0.5); if (Math.random() < 0.4) Sfx.play('block'); }
      o.t -= dt;
      if (o.t <= 0) {
        const V = Vila.st(), orig = W.objAt(tx, ty);
        if (TREE_OBJS.has(orig) && V) {
          (V.cortes || (V.cortes = {}))[tkey(tx, ty)] = { d: Game.day, o: orig };
          W.setObj(tx, ty, O.STUMP);
          if (perto) { Game.floater(tx * 16 + 8, ty * 16 - 10, 'Madeira!', '#e0c080'); for (let i = 0; i < 14; i++) Game.particle(tx * 16 + 8 + (Math.random() - 0.5) * 20, ty * 16 - Math.random() * 20, (Math.random() - 0.5) * 80, -Math.random() * 40, Math.random() < 0.5 ? '#3a7a2a' : '#5a9a3a', 0.9); Sfx.play('boom'); }
        }
        o.estado = 'planta'; o.t = 2.5;
      }
      return;
    }
    if (o.estado === 'planta') {
      a.setDir(Math.PI / 2); o.t -= dt;
      if (perto && Math.random() < 0.2) Game.particle(a.x + (Math.random() - 0.5) * 8, a.y, 0, -15, '#6a4a2a', 0.4);
      if (o.t <= 0) { const [tx, ty] = o.arv, V = Vila.st(), e = V && V.cortes && V.cortes[tkey(tx, ty)]; if (e) { e.r = 1; if (W.objAt(tx, ty) === O.STUMP) W.setObj(tx, ty, O.MUDA); } o.estado = 'volta'; a.carrega = 'tora'; }
      return;
    }
    if (o.estado === 'volta') { if (this.anda(a, cx + 14, cy + 10, 28, dt)) { o.estado = 'descansa'; o.t = 3 + Math.random() * 3; a.carrega = false; } return; }
    if (o.estado === 'descansa') { o.t -= dt; if (o.t <= 0) o.estado = 'procura'; }
  },
  // a árvore mais perto da cabana que ninguém está cortando
  arvore(W, ob) {
    const ocup = new Set(this.vivos().map(a => a.trab.arv && tkey(a.trab.arv[0], a.trab.arv[1])).filter(Boolean));
    let best = null, bd = Infinity;
    for (let y = ob.y - 12; y <= ob.y + 12; y++) for (let x = ob.x - 12; x <= ob.x + 12; x++) {
      if (!TREE_OBJS.has(W.objAt(x, y)) || ocup.has(tkey(x, y))) continue;
      const d = dist(x, y, ob.x, ob.y) + Math.random() * 2; if (d < bd) { bd = d; best = [x, y]; }
    }
    return best;
  },
  desenhar(a, ctx, camX, camY) {
    a.drawShadow(ctx, camX, camY);
    let sw = null;
    if (a.batendo) { const ph = a.trab.ph, lift = ph < 0.75 ? ph / 0.75 : 1 - (ph - 0.75) / 0.25; sw = a.face + (Math.cos(a.face) >= 0 ? -1 : 1) * (0.2 + lift * 1.5); }
    const cima = a.dir === 'up';
    if (cima && !a.carrega) a.drawWeapon(ctx, camX, camY, a.ferr, 'axe', sw);
    const r = a.drawBody(ctx, camX, camY, a.S);
    if (!cima && !a.carrega) a.drawWeapon(ctx, camX, camY, a.ferr, 'axe', sw);
    if (a.carrega) {
      const x = Math.round(a.x - camX), y = r.y - 3;
      if (a.carrega === 'tora') { ctx.fillStyle = '#6a4422'; ctx.fillRect(x - 9, y, 18, 4); ctx.fillStyle = '#c8a070'; ctx.fillRect(x + 8, y, 2, 4); ctx.fillRect(x - 10, y, 2, 4); }
      else { ctx.fillStyle = '#6a5a40'; ctx.fillRect(x - 6, y - 1, 12, 5); ctx.fillStyle = '#a8a090'; ctx.fillRect(x - 5, y - 3, 4, 3); ctx.fillRect(x, y - 4, 4, 4); ctx.fillStyle = '#8a8478'; ctx.fillRect(x - 2, y - 2, 3, 2); }
    }
  },
  // o monte de pedras, o carrinho e as estacas na frente de cada obra
  drawables(D, camX, camY, vw, vh) {
    for (const p of this.projs()) {
      if (p.done) continue;
      const L = this.pts(p), j = Math.min(L.length - 1, p.feito), m = L[Math.max(0, j - 5)];
      const mx = m[0] * 16 + 8 + 18, my = m[1] * 16 + 12;
      if (mx < camX - 60 || mx > camX + vw + 60 || my < camY - 60 || my > camY + vh + 60) continue;
      D.push({ y: my, fn: (ctx) => {
        const x = Math.round(mx - camX), y = Math.round(my - camY);
        ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x - 12, y - 1, 26, 4);
        const cor = ['#a8a090', '#9a9282', '#b8b0a0', '#8a8478'];
        for (let i = 0; i < 9; i++) { const px = x - 9 + (i % 4) * 5 + (i > 3 ? 2 : 0) + (i > 6 ? 2 : 0), py = y - 4 - (i > 3 ? 3 : 0) - (i > 6 ? 3 : 0); ctx.fillStyle = '#5a5448'; ctx.fillRect(px - 1, py - 1, 6, 5); ctx.fillStyle = cor[i % 4]; ctx.fillRect(px, py, 4, 3); }
        // carrinho de mão
        ctx.fillStyle = '#5a3a20'; ctx.fillRect(x + 12, y - 7, 10, 5); ctx.fillStyle = '#7a5030'; ctx.fillRect(x + 12, y - 8, 10, 1); ctx.fillStyle = '#2a2a30'; ctx.fillRect(x + 13, y - 2, 3, 3); ctx.fillStyle = '#6a4424'; ctx.fillRect(x + 22, y - 6, 5, 1);
      } });
      // estacas com corda marcando o caminho que ainda falta
      for (const k of [2, 6]) {
        const q = L[Math.min(L.length - 1, j + k)], A = L[Math.max(0, j + k - 1)], B = L[Math.min(L.length - 1, j + k + 1)], dx = Math.sign(B[0] - A[0]), dy = Math.sign(B[1] - A[1]);
        for (const lado of [-1, 1]) {
          const sx = q[0] * 16 + 8 - dy * lado * 18, sy = q[1] * 16 + 10 + dx * lado * 16;
          D.push({ y: sy, fn: (ctx) => { const x = Math.round(sx - camX), y = Math.round(sy - camY); ctx.fillStyle = '#6a4424'; ctx.fillRect(x, y - 9, 2, 10); ctx.fillStyle = '#e8d040'; ctx.fillRect(x - 1, y - 10, 4, 2); } });
        }
      }
    }
  },
  // ---------- telas pequenas ----------
  menuTrab() { this.tela('trab', null); },
  botoesTab(f) {
    if (!Vila.st()) return '';
    const t = this.trab(), ativo = this.projs().find(p => p.k === 'jogador' && !p.done);
    return `<div class="quest"><b>🏛 Gestão do reino</b> — 🪓${t.lenhador} ⛏${t.mineiro} 🌾${t.fazendeiro} 🔨${t.pedreiro} • livres: ${this.livres()} • 📦 ${Recursos.total()}${ativo ? ` • 🛣 obra ${Math.floor(ativo.feito / this.pts(ativo).length * 100)}%` : ''}<br><button class="mbtn" ${f(() => this.tela('trab', () => UI.openMenu('war')))}>🏛 Gestão: trabalhadores, armazém, estradas e expansão</button></div>`;
  },
  falar(a) {
    const o = a.trab, P = Game.player, L = FALAS_TRAB[o.tipo] || FALAS_TRAB.pedreiro;
    a.talkT = 4;
    let txt = L[Math.floor(Math.random() * L.length)];
    const p = o.proj;
    if (p) txt += `<br><span class="dim">Estamos calçando a estrada de ${esc(p.de)} até ${esc(p.para)}${p.k !== 'jogador' && War.K[p.k] ? ` por ordem de ${esc(War.K[p.k].ruler.title)} ${esc(War.K[p.k].ruler.name)}` : ''}. ${Math.floor(p.feito / this.pts(p).length * 100)}% pronta.</span>`;
    const opts = [];
    if ((o.casa || (p && p.k === 'jogador')) && Vila.st()) opts.push({ label: '🏛 Gestão do reino', fn: () => this.tela(p ? 'est' : 'trab', null) });
    opts.push({ label: 'Bom trabalho!' });
    UI.dialog(a.name, a.look, txt, opts);
    void P;
  }
};

// ---------------- ganchos ----------------
(function () {
  // tocos e mudas dos lenhadores e as estradas de pedra quando o trecho do mundo é montado
  const gc0 = World.prototype.genChunk;
  World.prototype.genChunk = function (cx, cy) {
    const r = gc0.call(this, cx, cy), k = this.ckey(cx, cy);
    const pv = this.pave && this.pave.get(k);
    if (pv) for (const i of pv) if (r.tiles[i] === T.ROAD) r.tiles[i] = T.PAVED;
    const V = Game.player && Game.player.vila;
    if (V && V.cortes) for (const kk in V.cortes) {
      const [x, y] = kk.split(',').map(Number); if (x >> 5 !== cx || y >> 5 !== cy) continue;
      const e = V.cortes[kk], i = ((y & 31) << 5) | (x & 31);
      if (Game.day - e.d >= 3) continue;
      if (TREE_OBJS.has(r.objs[i]) || r.objs[i] === 0) r.objs[i] = e.r ? O.MUDA : O.STUMP;
    }
    return r;
  };
  const nu = NPC.prototype.update; NPC.prototype.update = function (dt) { if (this.trab) return Gestao.mover(this, dt); return nu.call(this, dt); };
  const nd = NPC.prototype.draw; NPC.prototype.draw = function (ctx, camX, camY) { if (this.trab) return Gestao.desenhar(this, ctx, camX, camY); return nd.call(this, ctx, camX, camY); };
  const t0 = UI.talkNPC; UI.talkNPC = function (a) { if (a.trab) return Gestao.falar(a); return t0.call(this, a); };
  // a produção do dia
  const vd0 = Vila.dia; Vila.dia = function () { const r = vd0.apply(this, arguments); Gestao.dia(); return r; };
  const wd0 = War.daily; War.daily = function () { const r = wd0.apply(this, arguments); Gestao.diaIA(); return r; };
  // a mina rende conforme os mineiros
  Gestao.fatorMina = function () { const n = Recursos.minas(); if (!n) return 0; const t = Gestao.trab(); let f = 0, m = t ? t.mineiro : 0; for (let i = 0; i < n; i++) { const q = Math.min(9, m); m -= q; f += q ? 0.4 + q * 0.2 : 0.2; } return f / n; };
  Recursos.dia = function () {
    const n = this.minas(), A = this.armazem(); if (!n || !A) return;
    const F = Gestao.fatorMina(), add = (id, q) => { q = Math.round(q * F); if (q > 0) A[id] = Math.min(9999, (A[id] || 0) + q); };
    for (let i = 0; i < n; i++) { add('pedra', 6 + Math.floor(Math.random() * 5)); add('minerio_ferro', 2 + Math.floor(Math.random() * 3)); if (Math.random() < 0.45) add('minerio_ouro', 1 + Math.floor(Math.random() * 2)); }
  };
  Recursos.texto = function () {
    const A = this.armazem() || {};
    const l = Object.entries(A).filter(([id, n]) => n > 0 && ITEMS[id]).map(([id, n]) => `${esc(ITEMS[id].name)}: <b>${n}</b>`).join(' • ');
    return l || '<span class="dim">vazio</span>';
  };
  const rm0 = Recursos.menu;
  Recursos.menu = function (volta) { rm0.call(this, volta); const el = document.querySelector('.dlg-opts'); if (el && Vila.st()) { const b = document.createElement('button'); b.className = 'dbtn'; b.textContent = '🏛 Gestão: mineiros e armazém'; b.addEventListener('click', () => Gestao.tela('trab', null)); el.insertBefore(b, el.lastChild); } };
  // a fazenda com fazendeiros rende mais
  const rt0 = Reino.rendaTratados; Reino.rendaTratados = function () { const t = Vila.st() && Gestao.trab(); return rt0.call(this) + (t ? t.fazendeiro * 2 : 0); };
  // escola e biblioteca dão pontos de pesquisa
  const pd0 = Tecnologia.ptsDia; Tecnologia.ptsDia = function (k) { let p = pd0.call(this, k); const V = Vila.st(); if (k === 'jogador' && V) p += (V.built.escola ? 3 : 0) + (V.built.biblioteca ? 4 : 0); return p; };
  // academia militar: mais soldados
  const li0 = Reino.limite; Reino.limite = function () { const V = Vila.st(); return li0.call(this) + (V && V.built.academia ? 20 : 0); };
  // o Intendente mostra a gestão
  const tk0 = Vila.talkNPC;
  Vila.talkNPC = function (a) { tk0.call(this, a); const el = document.querySelector('.dlg-opts'); if (el && Vila.st()) { const b = document.createElement('button'); b.className = 'dbtn gold'; b.textContent = '🏛 Gestão do reino (trabalhadores, armazém, estradas, expandir)'; b.addEventListener('click', () => Gestao.tela('trab', () => Vila.talkNPC(a))); el.insertBefore(b, el.firstChild); } };
  // prédio novo da expansão em cima de uma obra sua: avisa
  const vc0 = Vila.construir;
  Vila.construir = function (a, k) {
    const d = VILA_PREDIOS[k], V = Vila.st(), s = Vila.s;
    if (d && d.nivel && V && d.nivel > (V.nivel || 0)) return Game.toast('Este prédio só cabe depois de expandir a cidade (Gestão do reino → Expandir).', '#ffa080');
    if (d && d.nivel && s) { const q = 5 * ((V.nivel || 0) - d.nivel), B = BUILDINGS[d.bt]; if (Gestao.sobrepoe(s.x0 + d.x + q, s.y0 + d.y + q, B.w, B.h)) return Game.toast('Tem uma obra sua do Modo Construção no lugar desse prédio: remova ela antes.', '#ffa080'); }
    return vc0.call(this, a, k);
  };
  // menu Reinos
  const bt0 = Povo.botoesTab; Povo.botoesTab = function (f) { return bt0.call(this, f) + Gestao.botoesTab(f); };
})();
