'use strict';
// =====================================================================
//  MUNDO MAIS DURO (no espírito de Kenshi) — vale nos modos Difícil e Brutal
//  • Ferimentos por parte do corpo: cabeça, tronco, braços e pernas.
//    Perna ferida = anda devagar (as duas inutilizadas = quase rastejando);
//    braço da arma ferido = bate fraco; pancada na cabeça = tontura.
//    O corpo sara devagar com o tempo (mais rápido dormindo); a atadura
//    estanca o sangue e ajuda a sarar.
//  • Sangramento: golpes fortes abrem feridas que sangram até você enfaixar.
//  • Pedágio dos bandidos: grupos na estrada mandam você entregar ouro ou
//    comida. Dá para pagar, intimidar (se você for bem mais forte) ou lutar.
//  • Sequestro: nocauteado por bandidos, você pode acordar acorrentado numa
//    jaula no acampamento deles, sem as armas (guardadas no baú do saque).
//    Para sair: forçar a porta, abrir com uma gazua (à noite é mais fácil),
//    pagar o resgate ou torcer por uma patrulha. Depois de solto, dá para
//    voltar escondido e recuperar as suas coisas no baú.
// =====================================================================
idef('atadura', { name: 'Atadura', type: 'food', use: { heal: 4 }, value: 8, stack: true, icon: { k: 'silk', c: '#f0ece0' }, desc: 'Estanca o sangramento e ajuda os ferimentos a sararem.' });
idef('gazua', { name: 'Gazua', type: 'material', value: 30, stack: true, icon: { k: 'nail', c: '#a0a0a8' }, desc: 'Ferramenta de ladrão. Abre cadeados e jaulas (gasta-se ao usar).' });

const BANDIDOS = /^(bandido|bandido_arqueiro|bandido_mago|bandido_chefe|cangaceiro|cangaceiro_faca|garimpeiro|bandeirante|pirata|pirata_arqueiro|pistoleiro|saqueador|desertor)/;
const Kenshi = {
  PARTES: [['cabeca', 'Cabeça', 9], ['tronco', 'Tronco', 34], ['bracoE', 'Braço esq.', 14], ['bracoD', 'Braço dir.', 15], ['pernaE', 'Perna esq.', 14], ['pernaD', 'Perna dir.', 14]],
  on() { const d = Dificuldade.id(); return d === 'brutal' || d === 'dificil'; },
  corpo(P) {
    if (!P.corpo) { P.corpo = { sangra: 0 }; for (const [k] of this.PARTES) P.corpo[k] = 100; }
    return P.corpo;
  },
  // um golpe acerta uma parte do corpo (a chance de cada parte segue o peso)
  ferir(P, dmg) {
    if (!this.on() || dmg <= 0) return;
    const C = this.corpo(P), f = dmg / Math.max(1, P.stat.maxHp);
    let r = Math.random() * 100, parte = 'tronco';
    for (const [k, , w] of this.PARTES) { if (r < w) { parte = k; break; } r -= w; }
    const antes = C[parte];
    C[parte] = Math.max(-40, C[parte] - f * 240);
    if (f > 0.09) C.sangra = Math.min(8, C.sangra + f * 16);
    const nome = this.PARTES.find(p => p[0] === parte)[1];
    if (antes > 0 && C[parte] <= 0) {
      Game.toast(`🦴 ${nome} inutilizad${parte.startsWith('br') || parte.startsWith('pe') ? 'o' : parte === 'cabeca' ? 'a' : 'o'}!`, '#ff6060');
      if (parte === 'cabeca') { P.stun = Math.max(P.stun || 0, 1.6); Game.shake = 8; C.cabeca = 8; Game.toast('Você ficou tonto com a pancada na cabeça.', '#ff9080'); }
    } else if (antes >= 40 && C[parte] < 40) Game.toast(`${nome} ferid${parte === 'cabeca' ? 'a' : 'o'}.`, '#ffb080');
  },
  velMul(P) {
    if (!this.on() || !P.corpo) return 1;
    const f = v => v <= 0 ? 0.55 : v < 40 ? 0.82 : 1, C = P.corpo;
    return C.pernaE <= 0 && C.pernaD <= 0 ? 0.3 : f(C.pernaE) * f(C.pernaD);
  },
  danoMul(P) {
    if (!this.on() || !P.corpo) return 1;
    const C = P.corpo;
    return (C.bracoD <= 0 ? 0.5 : C.bracoD < 40 ? 0.8 : 1) * (C.bracoE <= 0 ? 0.85 : 1) * (C.tronco <= 0 ? 0.85 : 1);
  },
  tratar(P, quanto) { const C = this.corpo(P); C.sangra = 0; for (const [k] of this.PARTES) C[k] = Math.min(100, Math.max(C[k], 0) + quanto); },
  curarTudo(P) { if (P.corpo) { P.corpo.sangra = 0; for (const [k] of this.PARTES) P.corpo[k] = 100; } },
  tick(dt) {
    const G = Game, P = G.player; if (!P || P.dead || !P.corpo) return;
    const C = P.corpo;
    // o tempo do jogo que passou (dormir, viajar, esperar): o corpo sara 3 pontos por hora
    const agora = G.day * 1440 + G.time, ant = this._t === undefined ? agora : this._t; this._t = agora;
    let min = Math.max(0, agora - ant);
    if (min > 0) {
      const sarar = min * (P.lastHurt > 20 ? 0.05 : 0.02);
      for (const [k] of this.PARTES) if (C[k] < 100) C[k] = Math.min(100, C[k] + sarar);
      if (min > 20) C.sangra = Math.max(0, C.sangra - min * 0.05);
    }
    if (C.sangra > 0) {
      C.sangra = Math.max(0, C.sangra - dt * 0.02);
      if (P.hp > 1) P.hp = Math.max(1, P.hp - C.sangra * 0.06 * dt * (P.stat.maxHp / 100));
      this._gota = (this._gota || 0) - dt;
      if (this._gota <= 0) { this._gota = 1.4 / Math.min(4, C.sangra); G.particle(P.x + (Math.random() - 0.5) * 4, P.y - 4, 0, 10, '#a01818', 0.7, 1, 0); }
      if (C.sangra > 2 && (this._aviso || 0) < G.t) { this._aviso = G.t + 25; G.toast('🩸 Você está sangrando! Use uma atadura.', '#ff6060'); }
    }
  },
  hud() {
    const P = Game.player; if (!this.on() || !P || !P.corpo) return '';
    const C = P.corpo, ruins = this.PARTES.filter(([k]) => C[k] < 60);
    if (!ruins.length && C.sangra < 0.3) return '';
    const cor = v => v <= 0 ? '#ff4040' : v < 40 ? '#ff9040' : '#ffd080';
    return `<div class="needs-row" style="font-size:12px">${C.sangra >= 0.3 ? '<span style="color:#ff5050">🩸 sangrando</span> ' : ''}${ruins.map(([k, n]) => `<span style="color:${cor(C[k])}">${v2(C[k])}${n}</span>`).join(' ')}</div>`;
    function v2(v) { return v <= 0 ? '✖' : '•'; }
  }
};

// ---------------- pedágio dos bandidos na estrada ----------------
const Pedagio = {
  tick() {
    const G = Game, P = G.player;
    if (!Kenshi.on() || !P || P.dead || !G.level || !G.level.isWorld || UI.current || G.paused || Captura.ativo()) return;
    if ((this._cd || 0) > G.t) return;
    for (const a of G.actors) {
      if (a.dead || a.camp || a.pedagio || a.team !== 'enemy' || !BANDIDOS.test(a.eid || '') || a.target === P && a.hp < a.maxHp) continue;
      if (dist(a.x, a.y, P.x, P.y) > 120) continue;
      const grupo = G.actors.filter(b => !b.dead && b.team === 'enemy' && !b.camp && BANDIDOS.test(b.eid || '') && dist(a.x, a.y, b.x, b.y) < 180);
      grupo.forEach(b => b.pedagio = true);
      this._cd = G.t + 30;
      this.cobrar(grupo);
      return;
    }
  },
  cobrar(grupo) {
    const G = Game, P = G.player, chefe = grupo[0], lvl = Math.max(...grupo.map(b => b.lvl || 1));
    const cang = /cangac/.test(chefe.eid), pir = /pirat/.test(chefe.eid);
    const fala = cang ? 'Ô cabra! Isso aqui é terra do Capitão. Passa o ouro e a comida, ou vai pro saco!' : pir ? 'Arr! Pedágio dos sete mares, marujo: ouro ou sangue!' : rnd(['Alto lá! Isso é um assalto. Passa o ouro e a comida, ou vai sangrar.', 'Estamos com fome, forasteiro. Deixa a comida e o ouro e segue viagem.', 'Ninguém passa por esta estrada sem pagar o pedágio.']);
    const comida = P.inv.filter(it => ITEMS[it.id] && ITEMS[it.id].type === 'food');
    const parte = Math.max(10, Math.floor(P.gold * 0.3));
    for (const b of grupo) { b.target = null; b._ag0 = b._ag0 || b.aggro; b.aggro = 0; }
    const solta = () => { for (const b of grupo) { b.aggro = b._ag0 || 130; } };
    const vaoEmbora = msg => { UI.close(); G.actors = G.actors.filter(b => !grupo.includes(b)); G.toast(msg, '#c0e0ff'); };
    const op = [];
    if (P.gold >= 10) op.push({ label: `💰 Pagar ${parte} ouro`, fn: () => { P.gold -= parte; Sfx.play('coin'); vaoEmbora('Os bandidos pegam o ouro e somem no mato.'); } });
    if (comida.length) op.push({ label: '🍞 Entregar comida', fn: () => { let n = 0; for (const it of comida.slice(0, 3)) { n += it.n || 1; P.removeInst(it, it.n || 1); } vaoEmbora(`Levaram ${n} porç${n > 1 ? 'ões' : 'ão'} de comida e foram embora.`); } });
    op.push({ label: '😠 Intimidar', fn: () => {
      UI.close();
      if (P.level >= lvl + 4 || (P.honra || 0) > 60 && P.level >= lvl) { Sfx.play('shout'); for (const b of grupo) { b.aggro = 0; b.target = null; b.passive = true; } setTimeout(() => { G.actors = G.actors.filter(b => !grupo.includes(b)); }, 2500); G.toast('Eles olham para você... e saem correndo.', '#a0f080'); }
      else { solta(); for (const b of grupo) b.target = P; G.toast('Eles riem da sua cara e partem para cima!', '#ff8080'); }
    } });
    op.push({ label: '⚔ Lutar', cls: 'gold', fn: () => { UI.close(); solta(); for (const b of grupo) b.target = P; } });
    UI.dialog(chefe.name, chefe.look, `“${fala}”<br><br><span class="dim">${grupo.length} bandido${grupo.length > 1 ? 's' : ''} (nível ${lvl}). Se perder a luta, eles podem te levar para o acampamento.</span>`, op);
    function rnd(a) { return a[Math.floor(Math.random() * a.length)]; }
  }
};

// ---------------- sequestro e cativeiro ----------------
const Captura = {
  ativo() { const P = Game.player; return !!(P && P.preso && !P.preso.solto); },
  campo(id) { return Game.world && Game.world.pois.find(p => p.id === id); },
  // chamado depois do nocaute (o roubo comum já aconteceu): talvez levem você
  prender(killer) {
    const G = Game, W = G.world, P = G.player;
    if (!Kenshi.on() || !killer || !BANDIDOS.test(killer.eid || '') || !G.level.isWorld || P.preso || Math.random() > 0.65) return false;
    const c = contAt(P.x / 16, P.y / 16);
    let camp = null, bd = 1500;
    for (const p of W.pois) { if (p.kind !== 'camp' || contAt(p.x, p.y) !== c || G.campCleared(p)) continue; const d = dist(p.x, p.y, P.x / 16, P.y / 16); if (d < bd) { bd = d; camp = p; } }
    if (!camp) return false;
    // confiscam as armas e o que restou de valor
    const bau = [];
    for (const slot of ['weapon', 'offhand']) { const it = P.equip[slot]; if (it) { P.unequip(slot); P.removeInst(it, it.n || 1); bau.push(it); } }
    const vals = P.inv.filter(it => ITEMS[it.id] && ITEMS[it.id].type !== 'quest' && !Object.values(P.equip).includes(it) && Items.value(it) > 25).sort((a, b) => Items.value(b) - Items.value(a)).slice(0, 2);
    for (const it of vals) { P.removeInst(it, it.n || 1); bau.push(it); }
    const ouro = Math.floor(P.gold * 0.6); P.gold -= ouro;
    P.mounted = false; P.carrying = null;
    const cx = camp.x, cy = camp.y + 3;
    P.x = cx * 16 + 8; P.y = cy * 16 + 10;
    camp.spawned = false;
    P.preso = { camp: camp.id, nome: camp.name, cx, cy, bx: camp.x - 3, by: camp.y, bau, ouro, dia: G.day, solto: false, tent: 0 };
    UI.fade(); Sfx.play('door');
    G.centerMsg('CAPTURADO', `Você acordou acorrentado numa jaula no ${camp.name}. Tomaram suas armas.`);
    G.chron(`Fui capturado por ${killer.name} e levado para o ${camp.name}.`);
    setTimeout(() => this.menu(), 1600);
    return true;
  },
  noite() { const t = Game.time; return t < 5 * 60 || t > 20 * 60; },
  menu() {
    const G = Game, P = G.player, S = P.preso; if (!S || S.solto) return;
    const resgate = 120 + P.level * 25, gaz = P.count('gazua'), noite = this.noite();
    const fc = Math.min(0.55, 0.1 + P.level * 0.008 + (noite ? 0.12 : 0) + S.tent * 0.03);
    const op = [
      { label: `💪 Forçar a porta (${Math.round(fc * 100)}%)`, fn: () => this.tentar(fc, false) },
      ...(gaz ? [{ label: `🗝 Usar a gazua (${Math.round(Math.min(0.9, 0.55 + (noite ? 0.2 : 0)) * 100)}%)`, cls: 'gold', fn: () => this.tentar(Math.min(0.9, 0.55 + (noite ? 0.2 : 0)), true) }] : []),
      { label: `💰 Pagar o resgate (${resgate} ouro)`, fn: () => { if (P.gold < resgate) return G.toast('Você não tem ouro para o resgate.', '#ff8080'); P.gold -= resgate; UI.close(); this.soltar('resgate'); } },
      { label: noite ? '⏳ Esperar 3 horas' : '🌙 Esperar a noite', fn: () => { UI.close(); this.passar(noite ? 180 : Math.max(60, 21 * 60 - G.time)); } },
      { label: 'Ficar quieto', fn: () => UI.close() }
    ];
    UI.dialog('Jaula do ' + esc(S.nome), null, `Correntes nos pulsos e uma porta de madeira grossa. Lá fora, os bandidos riem em volta da fogueira.<br><br>${noite ? '🌙 É noite: os guardas cochilam. Boa hora para fugir.' : '☀ É dia: os guardas estão atentos.'}<br><span class="dim">Dias preso: ${G.day - S.dia} • suas armas e ${S.ouro} de ouro estão no baú do saque, perto das tendas.</span>`, op);
  },
  passar(min) {
    const G = Game; G.time += min; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); this.diaPreso(); }
    UI.fade();
  },
  diaPreso() {
    const G = Game, P = G.player; if (!this.ativo()) return;
    // de vez em quando uma patrulha ataca o acampamento e solta os presos
    if (Math.random() < 0.15) { G.centerMsg('Resgate!', 'Uma patrulha atacou o acampamento durante a noite e abriu a sua jaula.'); this.soltar('patrulha'); }
  },
  tentar(chance, gazua) {
    const G = Game, P = G.player, S = P.preso; UI.close();
    if (gazua) P.removeItem('gazua', 1);
    S.tent++; this.passar(gazua ? 20 : 60);
    if (Math.random() < chance) { Sfx.play('door'); this.soltar(gazua ? 'gazua' : 'forca'); return; }
    if (Math.random() < (this.noite() ? 0.15 : 0.4)) {
      P.hp = Math.max(1, P.hp - P.stat.maxHp * 0.12); Kenshi.ferir(P, P.stat.maxHp * 0.12); G.shake = 6; Sfx.play('hurt');
      G.toast('O guarda ouviu o barulho e te espancou.', '#ff6060');
    } else G.toast(gazua ? 'A gazua quebrou na fechadura.' : 'A porta não cedeu... ainda.', '#ffd080');
  },
  soltar(como) {
    const G = Game, P = G.player, S = P.preso; if (!S) return;
    S.solto = true; S.como = como;
    if (como === 'resgate') {
      // soltam você longe do acampamento (e ficam com as suas coisas)
      const a = Math.random() * Math.PI * 2; P.x = (S.cx + Math.cos(a) * 30) * 16; P.y = (S.cy + Math.sin(a) * 30) * 16; G.findFree(P);
      G.centerMsg('Livre', 'Pagaram-se, e te largaram na estrada. Suas coisas ficaram no baú do acampamento...');
    } else {
      // fugindo: à noite os guardas dormem e quase não percebem
      const noite = this.noite();
      for (const a of G.actors) if (a.camp && a.camp.id === S.camp) { a._ag0 = a._ag0 || a.aggro; a.aggro = noite ? 30 : a._ag0; }
      this._vigia = G.t + 60;
      G.centerMsg('A jaula abriu!', noite ? 'Os guardas dormem. Pegue suas coisas no baú e fuja em silêncio.' : 'Cuidado: é dia e os guardas estão acordados!');
    }
    G.chron(como === 'resgate' ? 'Paguei o resgate e fui solto.' : 'Escapei da jaula dos bandidos.');
  },
  recuperar() {
    const G = Game, P = G.player, S = P.preso; if (!S) return;
    for (const it of S.bau) P.addItem(it);
    P.gold += S.ouro; Sfx.play('pickup');
    G.toast(`Você recuperou suas coisas e ${S.ouro} de ouro.`, '#a0f080');
    S.bau = []; S.ouro = 0;
    if (S.solto) P.preso = null;
  },
  tick(dt) {
    const G = Game, P = G.player, S = P && P.preso; if (!S || !G.level || !G.level.isWorld) return;
    if (!S.solto) {
      const cx = S.cx * 16 + 8, cy = S.cy * 16 + 10, d = dist(P.x, P.y, cx, cy);
      if (d > 300) { S.solto = true; return; }                 // saiu de algum outro jeito (viagem, teleporte)
      if (d > 7) { P.x = cx + (P.x - cx) / d * 7; P.y = cy + (P.y - cy) / d * 7; }
      P.mounted = false;
      for (const a of G.actors) if (a.target === P && a.camp && a.camp.id === S.camp) a.target = null;
      if (Math.floor(G.day) !== S.ultDia) { if (S.ultDia !== undefined && G.day > S.ultDia) this.diaPreso(); S.ultDia = G.day; }
    } else {
      if (this._vigia && G.t > this._vigia) { this._vigia = 0; for (const a of G.actors) if (a.camp && a.camp.id === S.camp && a._ag0) a.aggro = a._ag0; }
      if (!S.bau.length && !S.ouro) P.preso = null;
      else if (dist(P.x / 16, P.y / 16, S.cx, S.cy) > 2500) P.preso = null;   // foi embora de vez: o saque se perde
    }
  },
  findInteract(fx, fy) {
    const P = Game.player, S = P && P.preso; if (!S || !Game.level.isWorld) return null;
    if (!S.solto) return { kind: 'mar', fn: () => this.menu(), label: 'Jaula', name: 'Fugir da jaula', d: -50 };
    if ((S.bau.length || S.ouro) && dist(fx, fy, S.bx * 16 + 8, S.by * 16 + 8) < 26) return { kind: 'mar', fn: () => this.recuperar(), label: 'Pegar', name: 'Baú do saque', d: -20 };
    return null;
  },
  drawables(D, camX, camY) {
    const P = Game.player, S = P && P.preso; if (!S || !Game.level.isWorld) return;
    const x = S.cx * 16 + 8 - camX, y = S.cy * 16 + 10 - camY, aberto = S.solto;
    const grade = (ctx, frente) => {
      ctx.fillStyle = '#4a3018';
      const yy = frente ? y + 4 : y - 14;
      ctx.fillRect(x - 14, yy - 22 + (frente ? 0 : 0), 28, 3);           // travessa de cima
      ctx.fillRect(x - 14, yy, 28, 2);                                    // travessa de baixo
      for (let i = 0; i < 8; i++) { if (frente && aberto && (i === 3 || i === 4)) continue; const bx = x - 14 + i * 4; ctx.fillStyle = i % 2 ? '#5a3a1e' : '#6a4626'; ctx.fillRect(bx, yy - 22, 2, 24); }
    };
    D.push({ y: S.cy * 16 + 4, fn: ctx => { grade(ctx, false); ctx.fillStyle = '#5a3a1e'; ctx.fillRect(x - 16, y - 40, 32, 4); ctx.fillStyle = '#b89a52'; ctx.fillRect(x - 15, y - 42, 30, 3); } });
    D.push({ y: S.cy * 16 + 20, fn: ctx => { grade(ctx, true); ctx.fillStyle = '#4a3018'; ctx.fillRect(x - 15, y - 18, 2, 24); ctx.fillRect(x + 13, y - 18, 2, 24); if (!aberto) { ctx.fillStyle = '#8a8a90'; ctx.fillRect(x - 2, y - 6, 4, 4); } } });
    if (S.bau.length || S.ouro) {
      const bx = S.bx * 16 + 8 - camX, by = S.by * 16 + 8 - camY;
      D.push({ y: S.by * 16 + 10, fn: ctx => { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(bx - 7, by + 2, 14, 3); ctx.fillStyle = '#6a4220'; ctx.fillRect(bx - 7, by - 8, 14, 10); ctx.fillStyle = '#8a5a2e'; ctx.fillRect(bx - 7, by - 10, 14, 3); ctx.fillStyle = '#c0a040'; ctx.fillRect(bx - 1, by - 6, 2, 3); ctx.fillStyle = '#3a2410'; ctx.fillRect(bx - 7, by - 4, 14, 1); } });
    }
  }
};

// ---------------- bichos novos nas regiões antigas ----------------
Object.assign(ENEMIES, {
  raposa: { name: 'Raposa', look: { k: 'wolf', c: '#d8702a', size: 0.75 }, hp: 18, dmg: 4, spd: 86, ai: 'flee', xp: 4, r: 4, drops: [['couro', 0.5], ['carne_crua', 0.3]], animal: true, passive: true },
  bisao: { name: 'Bisão', look: { k: 'boar', c: '#4a3424', size: 1.5 }, hp: 140, dmg: 18, spd: 58, ai: 'charge', xp: 30, r: 9, aggro: 50, drops: [['couro', 1], ['carne_crua', 1], ['chifre', 0.6]], animal: true },
  cabra_montes: { name: 'Cabra-Montês', look: { k: 'deer', c: '#b8b0a0', size: 0.9 }, hp: 30, dmg: 0, spd: 88, ai: 'flee', xp: 5, r: 5, drops: [['carne_crua', 1], ['couro', 0.5], ['chifre', 0.5]], animal: true, passive: true },
  crocodilo: { name: 'Crocodilo do Pântano', look: { k: 'lizard', c: '#4e5a32', size: 1.35 }, hp: 150, dmg: 20, spd: 44, ai: 'melee', xp: 46, aggro: 70, r: 7, drops: [['escama_lagarto', 0.9], ['carne_crua', 0.8], ['presa', 0.3]], animal: true }
});
(function () {
  const mais = (rid, dia, noite) => { const S = SPAWNS[rid]; if (!S) return; S.day = S.day.concat(dia); if (noite) S.night = S.night.concat(noite); };
  mais('valdoria', [['raposa', 2], ['bisao', 0.8]], [['raposa', 1]]);
  mais('colinas', [['raposa', 2], ['cabra_montes', 1]]);
  mais('sylvaris', [['raposa', 1.5]]);
  mais('khazdurim', [['cabra_montes', 3]]);
  mais('nordheim', [['cabra_montes', 2], ['raposa', 1]]);
  mais('ssarak', [['crocodilo', 2.5], ['jacare', 1.5]], [['crocodilo', 2]]);
  mais('serpentis', [['crocodilo', 2.5], ['jacare', 2]], [['crocodilo', 2]]);
  mais('aurelion', [['raposa', 1.5], ['bisao', 1.2]]);
  mais('orkhai', [['bisao', 3]]);
  mais('gromhald', [['cabra_montes', 3]]);
  mais('kharzul', [['cabra_montes', 2]]);
  mais('lunethar', [['raposa', 2]]);
  mais('rodafina', [['raposa', 1.5], ['cabra_montes', 1]]);
  mais('kumari', [['bisao', 1]]);
  mais('brumaria', [['crocodilo', 1.5]]);
  mais('vaelith', [['bisao', 2]]);
  mais('sertao', [['cabra_montes', 2]]);
})();

// ---------------- ganchos ----------------
(function () {
  // dano recebido fere partes do corpo; o dado pelo jogador depende dos braços
  const d0 = Combat.damage;
  Combat.damage = function (t, amount, o = {}) {
    const P = Game.player;
    if (o && o.src === P && t !== P) amount *= Kenshi.danoMul(P);
    const hp0 = t === P ? P.hp : 0;
    const r = d0.call(this, t, amount, o);
    if (t === P && !o.dot && P.hp < hp0) Kenshi.ferir(P, hp0 - P.hp);
    return r;
  };
  const v0 = Estacoes.vel; Estacoes.vel = function (P) { return v0.call(this, P) * (P === Game.player ? Kenshi.velMul(P) : 1); };
  // acorrentado: não ataca nem lança magia
  for (const f of ['attack', 'castSpell']) {
    const a0 = Player.prototype[f]; if (!a0) continue;
    Player.prototype[f] = function () { if (this === Game.player && Captura.ativo()) { if ((this._avisoCorr || 0) < Game.t) { this._avisoCorr = Game.t + 3; Game.toast('Você está acorrentado.', '#ffb080'); } return; } return a0.apply(this, arguments); };
  }
  // os bandidos do acampamento ignoram quem está preso na jaula
  const ft0 = Monster.prototype.findTarget;
  Monster.prototype.findTarget = function () { const t = ft0.call(this); return t === Game.player && Captura.ativo() ? null : t; };
  // nocaute por bandidos: talvez acorde na jaula deles
  const ds0 = Dificuldade.desmaio;
  Dificuldade.desmaio = function (killer) { const r = ds0.call(this, killer); if (r) { try { Captura.prender(killer); } catch (e) { console.error(e); } } return r; };
  // atadura
  const u0 = Player.prototype.useItem;
  Player.prototype.useItem = function (it) { const at = it && it.id === 'atadura'; const r = u0.call(this, it); if (at) { Kenshi.tratar(this, 25); Game.toast('Ferida enfaixada: o sangramento parou.', '#a0f080'); } return r; };
  // ser curado no templo ou renascer zera os ferimentos
  const rv0 = Game.respawn; if (rv0) Game.respawn = function () { const r = rv0.apply(this, arguments); Kenshi.curarTudo(this.player); return r; };
  // ataduras e gazuas nas lojas
  const g0 = Shops.generate;
  Shops.generate = function (b, role, rng) {
    const out = g0.call(this, b, role, rng);
    if (role === 'general' || role === 'stall' || role === 'alchemist') out.push(Items.make('atadura', rng.int(3, 10)));
    if ((role === 'general' || role === 'stall') && rng.chance(0.4)) out.push(Items.make('gazua', rng.int(1, 3)));
    return out;
  };
  // o painel de fome/sede mostra também os ferimentos
  const h0 = Vida.hudHTML; Vida.hudHTML = function () { return h0.call(this) + Kenshi.hud(); };
  // gancho de interação e de desenho (o mesmo das atividades)
  const fi0 = Mar.findInteract;
  Mar.findInteract = function (fx, fy) { const a = fi0.call(this, fx, fy); let b = null; try { b = Captura.findInteract(fx, fy); } catch (e) { } return !a ? b : !b ? a : (b.d < a.d ? b : a); };
  const t0 = Inverno.tick; Inverno.tick = function (dt) { const r = t0.call(this, dt); try { if (Kenshi.on() && Game.player) Kenshi.corpo(Game.player); Kenshi.tick(dt); Pedagio.tick(); Captura.tick(dt); } catch (e) { } return r; };
  const dr0 = Inverno.drawables; Inverno.drawables = function (D, camX, camY, vw, vh) { dr0.call(this, D, camX, camY, vw, vh); try { Captura.drawables(D, camX, camY); } catch (e) { } };
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.corpo) o.corpo = this.corpo; if (this.preso) o.preso = this.preso; return o; };
})();
