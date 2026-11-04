'use strict';
// =====================================================================
//  GOVERNOS, NOVOS REINOS E PROPOSTAS DE PAZ
//  • Formas de governo: Monarquia, República, Teocracia, Junta Militar,
//    Conselho Mercante e Comuna do Povo. Cada uma muda o título de quem
//    governa, a felicidade do povo, o tamanho dos exércitos e a vontade
//    de fazer guerra ou paz. O seu reino também pode mudar de governo.
//  • Rebeliões criam reinos novos: numa guerra civil as cidades rebeldes
//    podem se separar e fundar um reino com um governo novo; revoluções
//    e golpes também podem trocar a forma de governo do reino inteiro.
//    Os reinos novos entram na diplomacia, nas guerras e no mapa.
//  • Paz: os reinos em guerra com você mandam um emissário com uma
//    proposta (paz com tributo, paz branca ou paz pagando). Você decide se
//    aceita ou recusa.
// =====================================================================
const GOVERNOS = {
  monarquia: { nome: 'Monarquia', icon: '👑', tit: ['Rei', 'Rainha'], pre: 'Reino de', desc: 'Um rei ou uma rainha governa e passa o trono aos filhos.', felic: 0, exerc: 1, renda: 1, paz: 0, guerra: 0 },
  republica: { nome: 'República', icon: '🏛', tit: ['Cônsul', 'Cônsul'], pre: 'República de', desc: 'O povo elege quem governa. Gosta de comércio e de paz.', felic: 8, exerc: 0.95, renda: 1.05, paz: 0.08, guerra: -0.5 },
  teocracia: { nome: 'Teocracia', icon: '⛪', tit: ['Sumo Sacerdote', 'Suma Sacerdotisa'], pre: 'Teocracia de', desc: 'Os sacerdotes governam em nome dos deuses. Povo fiel e soldados fanáticos.', felic: 5, exerc: 1.1, renda: 0.95, paz: 0, guerra: 0.2 },
  junta: { nome: 'Junta Militar', icon: '⚔', tit: ['General', 'Generala'], pre: 'Junta Militar de', desc: 'Os generais tomaram o poder. Exércitos enormes e um povo com medo.', felic: -8, exerc: 1.3, renda: 0.9, paz: -0.04, guerra: 0.6 },
  mercante: { nome: 'Conselho Mercante', icon: '💰', tit: ['Doge', 'Dogaresa'], pre: 'Liga Mercante de', desc: 'As grandes famílias de mercadores governam. Muito ouro, pouca vontade de lutar.', felic: 4, exerc: 0.9, renda: 1.2, paz: 0.1, guerra: -0.4 },
  comuna: { nome: 'Comuna do Povo', icon: '✊', tit: ['Porta-voz', 'Porta-voz'], pre: 'Comuna Livre de', desc: 'O povo divide as terras e decide tudo em assembleia. Muito feliz, mas o exército é de milícias.', felic: 14, exerc: 0.85, renda: 0.9, paz: 0.04, guerra: -0.2 }
};
const GOV_NOVOS = ['republica', 'teocracia', 'junta', 'mercante', 'comuna'];
const GOV_CORES = ['#d04080', '#30b8a8', '#e0a020', '#8050d0', '#50a040', '#c05030', '#3070d0', '#a0a030', '#e070b0', '#2aa0e0', '#b06030', '#60c080'];

const Governos = {
  S() { const S = War.st(); S.govs = S.govs || {}; S.novos = S.novos || {}; S.propostas = S.propostas || []; return S; },
  // a forma de governo de um reino (o seu fica no seu reino)
  de(k) {
    if (k === 'jogador') { const R = Game.player && Game.player.reino; return (R && R.gov) || 'monarquia'; }
    const SW = Game.mods && Game.mods.war, g = SW && SW.govs && SW.govs[k];
    return (g && g.g) || 'monarquia';
  },
  G(k) { return GOVERNOS[this.de(k)] || GOVERNOS.monarquia; },
  sexo(nome, race) { const N = NAMES[race] || NAMES.humano, p = (nome || '').split(' ')[0]; return N.f && N.f.includes(p) ? 'f' : 'm'; },
  titulo(g, sx) { const G = GOVERNOS[g] || GOVERNOS.monarquia; return G.tit[sx === 'f' ? 1 : 0]; },

  // ---------- os reinos novos entram (e saem) da lista de reinos ----------
  injetar() {
    const W = War; if (!W.K || !W._kList) return;
    const SW = Game.mods && Game.mods.war, novos = (SW && SW.novos) || {};
    for (const k of W._kList.slice()) if (k.novo && !novos[k.id]) {
      delete W.K[k.id]; W._kList.splice(W._kList.indexOf(k), 1); delete KSTYLE[k.id];
      for (const o of W._kList) if (o.nb) o.nb.delete(k.id);
    }
    for (const id in novos) {
      const n = novos[id], cap = W.settlement(n.cap); if (!cap) continue;
      let k = W.K[id];
      if (!k) { k = { id, novo: true, nb: new Set(), ruler: Object.assign({}, n.ruler) }; W.K[id] = k; W._kList.push(k); }
      Object.assign(k, { name: n.name, short: n.short, color: n.color, race: n.race, cap, cont: n.cont, lvl: n.lvl, pai: n.pai });
      for (const o of n.nb || []) if (W.K[o] && o !== id) { k.nb.add(o); if (W.K[o].nb) W.K[o].nb.add(id); }
      KSTYLE[id] = n.estilo;
      if (SW.extintos && SW.extintos[id]) k.extinto = true;
    }
  },
  // os títulos seguem a forma de governo (Cônsul, General, Doge...)
  titulos() {
    const SW = Game.mods && Game.mods.war; if (!SW || !SW.govs || !War.K) return;
    for (const k in SW.govs) {
      const K = War.K[k], g = SW.govs[k]; if (!K || !K.ruler) continue;
      const t = this.titulo(g.g, g.sx || this.sexo(K.ruler.name, K.race));
      if (K.ruler.title !== t) { K.ruler = Object.assign({}, K.ruler, { title: t }); const r = Game.world.regions.find(x => x.id === k); if (r) r.ruler = K.ruler; }
    }
  },
  mudar(k, g, quiet) {
    const S = this.S(), K = War.K[k]; if (!K) return;
    S.govs[k] = { g, sx: this.sexo(K.ruler.name, K.race), dia: Game.day };
    this.titulos();
    if (!quiet) War.news(`${GOVERNOS[g].icon} ${K.name} agora é uma ${GOVERNOS[g].nome}: ${K.ruler.title} ${K.ruler.name} governa.`, true, [k]);
  },

  // ---------- rebeldes fundam um reino novo ----------
  vivos() { const S = this.S(); return Object.keys(S.novos).filter(id => !War.extinto(id)).length; },
  secessao(k, o = {}) {
    const S = this.S(), K = War.K[k], W = Game.world; if (!K || K.extinto) return null;
    if (this.vivos() >= 10) return null;
    const contra = o.contra || k;
    let cs = o.cidades;
    if (!cs) {
      const todas = W.settlements.filter(s => War.ownerOf(s) === k && !s.playerVila);
      cs = todas.filter(s => s !== K.cap); if (cs.length < 2) return null;
      cs.sort((a, b) => dist(b.x, b.y, K.cap.x, K.cap.y) - dist(a.x, a.y, K.cap.x, K.cap.y));
      const c0 = cs[0];
      cs = cs.filter(s => dist(s.x, s.y, c0.x, c0.y) < 260).slice(0, Math.max(1, Math.min(4, Math.floor(todas.length / 2))));
    }
    if (!cs.length) return null;
    const rng = new RNG(hashStr(k + Game.day + cs[0].id) + (S.id || 1));
    const g = o.gov || rng.pick(GOV_NOVOS);
    const cap = cs.find(s => s.type === 'capital') || cs.find(s => s.type === 'town') || cs[0];
    const race = (K.race && NAMES[K.race]) ? K.race : 'humano', N = NAMES[race], sx = rng.chance(0.5) ? 'm' : 'f';
    const lider = o.lider || (rng.pick(N[sx]) + ' ' + rng.pick(N.s));
    S.novosN = (S.novosN || 0) + 1;
    const id = 'nr' + S.novosN;
    const usadas = new Set(War._kList.map(x => x.color));
    const cor = GOV_CORES.find(c => !usadas.has(c)) || GOV_CORES[S.novosN % GOV_CORES.length];
    const base = KSTYLE[k] || KSTYLE.valdoria;
    const estilo = Object.assign({}, base, { metal: shade(cor, -0.15), crest: true });
    S.novos[id] = {
      id, name: `${GOVERNOS[g].pre} ${cap.name}`, short: cap.name, color: cor, race, cap: cap.id, cont: K.cont || 0, lvl: K.lvl || [4, 9], gov: g, pai: contra, dia: Game.day,
      ruler: { title: this.titulo(g, sx), name: lider, race }, estilo,
      nb: [contra].concat([...(K.nb || [])].filter(x => x !== 'jogador' || contra === 'jogador')).slice(0, 4)
    };
    S.govs[id] = { g, sx, dia: Game.day };
    for (const s of cs) {
      S.owner[s.id] = id;
      if (s.active) { const set = new Set(s.npcs || []); Game.actors = Game.actors.filter(q => !set.has(q)); s.active = false; s.npcs = null; }
    }
    War.kingdoms();
    const NK = War.K[id]; if (!NK) return null;
    War.clearLive();
    const nomes = cs.map(s => s.name).join(', ');
    if (!o.semGuerra) {
      War.news(`${GOVERNOS[g].icon} NASCE UM REINO! Os rebeldes de ${nomes} se separaram de ${K.short} e fundaram a ${NK.name}. ${NK.ruler.title} ${lider} governa.`, true, [k, id]);
      if (Game.started) Game.centerMsg(`${GOVERNOS[g].icon} UM NOVO REINO NASCEU`, `${NK.name} (${GOVERNOS[g].nome})`);
    }
    // o reino antigo quer as cidades de volta
    if (o.semGuerra) { /* herança pacífica */ }
    else if (contra === 'jogador') War.declare(id, 'jogador');
    else if (rng.chance(0.65)) War.declare(id, contra);
    else S.rel[War.key(id, contra)] = -45;
    Povo.S().felic[id] = 70;
    return id;
  },

  // ---------- todo dia ----------
  dia() {
    const S = this.S(), PS = Povo.S(), rng = new RNG(Game.world.seed + Game.day * 613);
    // guerras civis da IA: os rebeldes podem se separar e fundar um reino
    for (const k in PS.civis) {
      const K = War.K[k]; if (!K || K.extinto) continue;
      const n = Game.world.settlements.filter(s => War.ownerOf(s) === k).length;
      if (n >= 3 && rng.chance(0.12)) { if (this.secessao(k)) { delete PS.civis[k]; PS.felic[k] = 45; } }
    }
    // o jeito de cada governo: uns gostam de paz, outros de guerra
    for (const w of S.wars.slice()) {
      if (w.a === 'jogador' || w.b === 'jogador') continue;
      const p = Math.max(this.G(w.a).paz, this.G(w.b).paz);
      if (p > 0 && Game.day - w.since > 4 && rng.chance(p)) War.peace(w);
    }
    for (const K of War.kingdoms()) {
      if (K.id === 'jogador' || K.extinto || !(this.G(K.id).guerra > 0) || War.warOf(K.id).length) continue;
      if (!rng.chance(0.05 * this.G(K.id).guerra)) continue;
      const alvo = [...K.nb].find(o => o !== 'jogador' && War.K[o] && !War.K[o].extinto && War.rel(K.id, o) < -30);
      if (alvo) { War.news(`${this.G(K.id).icon} ${K.ruler.title} ${K.ruler.name} (${K.short}) quer glória e marcha contra ${War.K[alvo].short}.`, false, [K.id, alvo]); War.declare(K.id, alvo); }
    }
    this.propostasDia(rng);
  },

  // ---------- propostas de paz para você ----------
  guerra(k) { return War.st().wars.find(x => [x.a, x.b].includes(k) && [x.a, x.b].includes('jogador')); },
  propostasDia(rng) {
    const S = this.S();
    S.propostas = S.propostas.filter(p => {
      if (this.guerra(p.k) && Game.day - p.dia <= 3) return true;
      if (this.guerra(p.k) && War.K[p.k]) War.news(`🕊 ${War.K[p.k].short} retirou a proposta de paz. A guerra continua.`, false, [p.k, 'jogador']);
      return false;
    });
    if (!Reino.ativo()) return;
    for (const w of War.warOf('jogador')) {
      const k = w.a === 'jogador' ? w.b : w.a, K = War.K[k];
      if (!K || K.extinto || S.propostas.some(p => p.k === k) || (w.propDia && Game.day - w.propDia < 3)) continue;
      const ps = w.ps || 0, dias = Game.day - w.since;
      let ch = (ps >= 5 ? 0.4 : ps >= 3 ? 0.18 : ps >= 1 && dias > 10 ? 0.07 : 0) + (dias > 14 ? 0.05 : 0) + this.G(k).paz;
      if (ps <= -3 && dias > 5) ch += 0.12;
      if (!rng.chance(clamp(ch, 0, 0.6))) continue;
      w.propDia = Game.day;
      const R = Reino.st(), indep = R.status === 'guerra' && R.suserano === k;
      let tipo = 'branca', ouro = 0;
      if (indep) tipo = 'indep';
      else if (ps >= 3) { tipo = 'tributo'; ouro = 150 + ps * 120 + (K.cap && K.cap.type === 'capital' ? 100 : 0); }
      else if (ps <= -3) { tipo = 'exige'; ouro = 200 + (-ps) * 110; }
      S.propostas.push({ k, tipo, ouro, dia: Game.day });
      War.news(`🕊 Um emissário de ${K.short} trouxe uma proposta de paz para o ${Reino.nome()}.`, true, [k, 'jogador']);
    }
  },
  tick() {
    const S = Game.mods && Game.mods.war; if (!S || !S.propostas || !S.propostas.length) return;
    if (UI.current || !Game.started || Game.paused || !Game.player || Game.player.dead || Game.state !== 'play') return;
    const p = S.propostas.find(x => !x.depois || Game.t > x.depois); if (!p) return;
    this.mostrar(p);
  },
  termos(p) {
    if (p.tipo === 'indep') return 'eles <b class="good">reconhecem a sua independência</b> e a guerra acaba.';
    if (p.tipo === 'tributo') return `paz, e eles <b class="good">pagam ${fmt(p.ouro)} de ouro</b> para o seu cofre.`;
    if (p.tipo === 'exige') return `paz, mas <b class="bad">você paga ${fmt(p.ouro)} de ouro</b> para eles.`;
    return 'paz sem vencedores: cada um fica com o que tem.';
  },
  mostrar(p) {
    const S = this.S(), K = War.K[p.k], w = this.guerra(p.k);
    const tirar = () => { S.propostas = S.propostas.filter(x => x !== p); };
    if (!K || !w) { tirar(); return; }
    const rng = new RNG(hashStr(p.k) + p.dia), race = (K.race && NAMES[K.race]) ? K.race : 'humano';
    const look = npcLook(race, 'm', rng, 'citizen'); look.body = K.color; look.cape = shade(K.color, -0.3); look.hat = 'beret'; look.hatC = shade(K.color, -0.2);
    const fala = { indep: 'Esta guerra já custou caro demais. Reconhecemos o seu reino. Que haja paz.', tributo: 'Vocês venceram muitas batalhas. Aceite o nosso ouro e deixe o nosso povo em paz.', exige: 'A vitória é nossa. Se quiser a paz, pague pelos estragos.', branca: 'Os dois lados já sangraram demais. Vamos parar por aqui?' }[p.tipo];
    const V = Vila.st();
    const body = `<b>${esc(K.ruler.title)} ${esc(K.ruler.name)}</b>, de ${esc(K.name)} (${GOVERNOS[this.de(p.k)].icon} ${GOVERNOS[this.de(p.k)].nome}), mandou um emissário com a bandeira branca:<br><i>"${esc(fala)}"</i><br><br><b>Termos:</b> ${this.termos(p)}<br><small class="dim">Placar da guerra: ${w.ps || 0} • há ${Game.day - w.since} dia(s) em guerra • a proposta vale até o dia ${p.dia + 3}. Se recusar, a guerra continua.</small>`;
    const ops = [
      { label: '🕊 Aceitar a paz', cls: 'gold', fn: () => this.aceitar(p) },
      { label: '⚔ Recusar: a guerra continua', fn: () => this.recusar(p) },
      { label: '⏳ Pensar mais um pouco', fn: () => { p.depois = Game.t + 90; UI.close(); Game.toast('O emissário espera a sua resposta (até 3 dias).', '#e0d0b0'); } }
    ];
    if (p.tipo === 'exige' && (V ? V.cofre : 0) + Game.player.gold < p.ouro) ops[0] = { label: `🕊 Aceitar (falta ouro: ${fmt(p.ouro)})`, fn: () => Game.toast('Você não tem ouro suficiente para pagar.', '#ff8080') };
    UI.dialog('🕊 Proposta de paz', look, body, ops);
  },
  aceitar(p) {
    const S = this.S(), K = War.K[p.k], w = this.guerra(p.k), P = Game.player, V = Vila.st();
    S.propostas = S.propostas.filter(x => x !== p);
    if (!K || !w) return UI.close();
    if (p.tipo === 'tributo') { if (V) V.cofre += p.ouro; else P.gold += p.ouro; Sfx.play('coin'); }
    if (p.tipo === 'exige') {
      let falta = p.ouro; if (V) { const t = Math.min(V.cofre, falta); V.cofre -= t; falta -= t; }
      P.gold -= Math.min(P.gold, falta);
    }
    War.peace(w);
    Reino.addRel(p.k, p.tipo === 'exige' ? 20 : 12, 'aceitou a nossa paz');
    UI.close(); Sfx.play('levelup');
    Game.centerMsg('🕊 PAZ!', `Você aceitou a paz com ${K.short}.`);
    Game.chron(`Aceitei a paz com ${K.name}${p.tipo === 'tributo' ? ` e recebi ${p.ouro} de ouro` : p.tipo === 'exige' ? ` pagando ${p.ouro} de ouro` : ''}.`);
    try { const R = Povo.st(); R.felic = Math.min(100, R.felic + 5); } catch (e) { /* sem reino */ }
  },
  recusar(p) {
    const S = this.S(), K = War.K[p.k];
    S.propostas = S.propostas.filter(x => x !== p);
    if (K) {
      Reino.addRel(p.k, -6, 'recusou a nossa paz');
      War.news(`⚔ O ${Reino.nome()} recusou a paz oferecida por ${K.short}. A guerra continua!`, true, [p.k, 'jogador']);
      Game.chron(`Recusei a proposta de paz de ${K.name}.`);
    }
    UI.close(); Sfx.play('shout');
  },

  // ---------- o seu reino muda de governo ----------
  tela(back) {
    const R = Game.player.reino, V = Vila.st(); if (!R || !V) return;
    const atual = this.de('jogador'), espera = R.govDia && Game.day - R.govDia < 10;
    const ops = Object.keys(GOVERNOS).filter(g => g !== atual).map(g => {
      const G = GOVERNOS[g];
      return { label: `${G.icon} ${G.nome} (1000 ouro do cofre)`, fn: () => {
        if (espera) return Game.toast(`O povo ainda está se acostumando. Espere até o dia ${R.govDia + 10}.`, '#ffb080');
        if (V.cofre < 1000) return Game.toast('O cofre não tem 1000 de ouro.', '#ff8080');
        UI.confirm(`Mudar o governo para <b>${G.nome}</b>?<br><small>${esc(G.desc)}</small>`, () => {
          V.cofre -= 1000; R.gov = g; R.govDia = Game.day; Reino.inject();
          try { const PR = Povo.st(); PR.felic = clamp(PR.felic - 6, 0, 100); } catch (e) { /* sem povo */ }
          Game.centerMsg(`${G.icon} ${G.nome.toUpperCase()}`, `O ${Reino.nome()} tem um novo governo. ${Reino.titulo()} ${Game.player.name}!`);
          War.news(`${G.icon} O ${Reino.nome()} virou uma ${G.nome}. ${Reino.titulo()} ${Game.player.name} governa.`, true, ['jogador']);
          Game.chron(`Mudei a forma de governo do meu reino para ${G.nome}.`); Sfx.play('levelup');
          this.tela(back);
        }, () => this.tela(back));
      } };
    });
    const linhas = Object.entries(GOVERNOS).map(([g, G]) => `<small>${G.icon} <b>${G.nome}</b>${g === atual ? ' <span class="good">(atual)</span>' : ''} — ${esc(G.desc)} <span class="dim">(povo ${G.felic >= 0 ? '+' : ''}${G.felic}, exército ×${G.exerc}, renda ×${G.renda})</span></small>`).join('<br>');
    UI.dialog('🏛 Forma de governo', null, `Hoje o seu reino é uma <b>${GOVERNOS[atual].nome}</b> e você é ${esc(Reino.titulo())}.<br>${linhas}${espera ? `<br><span class="warn">Mudou há pouco: espere até o dia ${R.govDia + 10}.</span>` : ''}`, ops.concat([{ label: 'Voltar', fn: back }]));
  },
  botoesTab(f) {
    if (!Reino.ativo() || !Vila.st()) return '';
    const G = this.G('jogador'), S = this.S();
    const pend = S.propostas.length ? `<br><button class="sbtn gold" ${f(() => { const p = S.propostas[0]; delete p.depois; this.mostrar(p); })}>🕊 Propostas de paz (${S.propostas.length})</button>` : '';
    return `<div class="quest"><b>${G.icon} Governo</b> — ${G.nome} • ${esc(Reino.titulo())}<br><button class="sbtn" ${f(() => this.tela(() => UI.openMenu('war')))}>🏛 Mudar a forma de governo</button>${pend}</div>`;
  },
  textoDiplo(k) {
    const K = War.K[k], G = this.G(k); if (!K) return '';
    let t = `<br>${G.icon} Governo: <b>${G.nome}</b>`;
    if (K.novo) { const n = this.S().novos[k]; if (n) t += ` • <span class="warn">nasceu de uma rebelião no dia ${n.dia}</span>`; }
    return t;
  }
};

// ---------------- ganchos ----------------
(function () {
  // os reinos novos entram na lista e os títulos seguem o governo
  const k0 = War.kingdoms;
  War.kingdoms = function () { k0.call(this); Governos.injetar(); Governos.titulos(); return this._kList; };
  // um dia passa
  const d0 = War.daily; War.daily = function () { const r = d0.apply(this, arguments); Governos.dia(); return r; };
  // a paz com você agora vem como proposta (você decide)
  Reino.chancePaz = function () { return 0; };
  // o painel confere se chegou um emissário
  const t0 = Reino.tick; Reino.tick = function (dt) { const r = t0.apply(this, arguments); Governos.tick(); return r; };
  // revoluções e golpes podem trocar a forma de governo
  const g0 = Povo.golpe;
  Povo.golpe = function (k, tipo, amigo) {
    const K = War.K[k]; if (!K) return g0.apply(this, arguments);
    const n = Game.world.settlements.filter(s => War.ownerOf(s) === k).length;
    // a revolução também pode rachar o reino em dois
    if (tipo === 'revolucao' && n >= 4 && Math.random() < 0.35 && Governos.secessao(k)) return;
    const r = g0.apply(this, arguments);
    if (tipo === 'revolucao' && Math.random() < 0.6) Governos.mudar(k, ['republica', 'comuna', 'teocracia', 'mercante'][Math.floor(Math.random() * 4)]);
    else if (tipo === 'golpe' && Math.random() < 0.3) Governos.mudar(k, 'junta');
    else if (Governos.de(k) !== 'monarquia' && Math.random() < 0.3) Governos.mudar(k, 'monarquia');
    else Governos.titulos();
    return r;
  };
  // na sua guerra civil, cidades rebeldes podem virar um reino novo
  const dc0 = Povo.desertaCidade;
  Povo.desertaCidade = function () {
    const cs = Game.world.settlements.filter(s => !s.playerVila && War.ownerOf(s) === 'jogador');
    if (cs.length && Math.random() < 0.45 && War.K.jogador) {
      const s = cs[Math.floor(Math.random() * cs.length)], R = Povo.st();
      if (Governos.secessao('jogador', { cidades: [s], contra: 'jogador', lider: R.civil && R.civil.lider })) return true;
    }
    return dc0.apply(this, arguments);
  };
  // o governo muda o povo da IA...
  const a0 = Povo.alvoIA; Povo.alvoIA = function (k) { return clamp(a0.call(this, k) + Governos.G(k).felic, 0, 100); };
  // ...e o seu
  const f0 = Povo.fatores; Povo.fatores = function () { const f = f0.call(this), G = Governos.G('jogador'); if (G.felic) f.push([`Governo: ${G.nome}`, G.felic]); return f; };
  const rm0 = Povo.rendaMul; Povo.rendaMul = function () { return rm0.call(this) * Governos.G('jogador').renda; };
  const gu0 = Reino.guarnicao; Reino.guarnicao = function () { return Math.round(gu0.call(this) * Governos.G('jogador').exerc); };
  // o tamanho dos exércitos da IA
  const rs0 = War.raise;
  War.raise = function (k) {
    const S = this.st(), n0 = S.armies.length, r = rs0.apply(this, arguments);
    const m = Governos.G(k).exerc;
    if (m !== 1 && S.armies.length > n0) { const a = S.armies[S.armies.length - 1]; if (a.k === k) { a.n = Math.max(10, Math.round(a.n * m)); a.n0 = a.n; } }
    return r;
  };
  // o seu título segue o governo
  const ti0 = Reino.titulo;
  Reino.titulo = function () { const g = Governos.de('jogador'); if (g === 'monarquia') return ti0.call(this); return Governos.titulo(g, Game.player.app && Game.player.app.sex); };
  // diplomacia e menu
  const td0 = Povo.textoDiplo; Povo.textoDiplo = function (k) { return td0.call(this, k) + Governos.textoDiplo(k); };
  const bt0 = Povo.botoesTab; Povo.botoesTab = function (f) { return bt0.call(this, f) + Governos.botoesTab(f); };
})();
