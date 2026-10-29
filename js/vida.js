'use strict';
// ===================== VIDA: FOME, SEDE, SONO, HONRA E CONVERSAS =====================
// Necessidades do corpo (dá para desligar nas Opções), a honra do jogador com as suas
// consequências, os moradores conversando entre si e o romance feito na conversa.
const NEED_MIN = { fome: 2880, sede: 1800, sono: 2400 };   // minutos de jogo de 100% até 0%
const HONRA_TITULOS = [[-60, 'Infame', '#ff5050'], [-20, 'Desonrado', '#ff9070'], [20, 'Comum', '#d0c8b0'], [60, 'Honrado', '#90e0a0'], [999, 'Herói Lendário', '#ffd860']];
const PERSONALIDADES = {
  romantico: { nome: 'romântico(a)', gosta: ['romance', 'elogio', 'sonhos'], odeia: ['provocar'] },
  aventureiro: { nome: 'aventureiro(a)', gosta: ['aventuras', 'piada', 'provocar'], odeia: ['sonhos'] },
  timido: { nome: 'tímido(a)', gosta: ['vida', 'sonhos'], odeia: ['romance', 'provocar'] },
  divertido: { nome: 'divertido(a)', gosta: ['piada', 'provocar', 'aventuras'], odeia: ['vida'] },
  serio: { nome: 'sério(a)', gosta: ['vida', 'aventuras'], odeia: ['piada', 'provocar'] },
  orgulhoso: { nome: 'orgulhoso(a)', gosta: ['elogio', 'aventuras'], odeia: ['provocar', 'piada'] }
};
const TOPICOS = {
  elogio: { label: 'Elogiar', fala: ['Você está linda(o) hoje.', 'Seus olhos têm uma cor rara.', 'Gosto de como você sorri.'] },
  piada: { label: 'Contar uma piada', fala: ['Sabe por que o esqueleto não briga? Falta estômago!', 'Um goblin entrou numa taverna... e saiu com a taverna.', 'O dragão pediu desconto no ferreiro. Disse que já vinha "pré-aquecido".'] },
  aventuras: { label: 'Falar das suas aventuras', fala: ['Outro dia enfrentei um troll do tamanho de uma casa.', 'Já atravessei o mar até outro continente.', 'Encontrei um baú cheio de ouro numa cripta.'] },
  vida: { label: 'Perguntar sobre a vida dele(a)', fala: ['Como foi o seu dia?', 'O que você mais gosta de fazer?', 'Você sempre morou aqui?'] },
  sonhos: { label: 'Falar de sonhos e do futuro', fala: ['Um dia quero uma casa com vista para o mar.', 'Às vezes sonho em viajar pelo mundo inteiro.', 'O que você imagina para daqui a dez anos?'] },
  romance: { label: 'Ser romântico(a) 💕', fala: ['Quando estou com você, o resto do mundo some.', 'Eu pensei em você o dia inteiro.', 'Fica comigo mais um pouco?'], min: 30 },
  provocar: { label: 'Provocar de brincadeira', fala: ['Aposto que você não me alcança numa corrida!', 'Você ficou vermelho(a)? Hahaha.', 'Você é sempre tão sério(a) assim?'] }
};
const RESPOSTAS = {
  otimo: ['Hahaha! Você é demais. 💕', 'Ninguém nunca me disse isso... obrigado(a).', 'Eu adoro conversar com você!', 'Fica mais um pouco, vai?'],
  bom: ['Que conversa boa.', 'Hm, interessante!', 'Você tem jeito com as palavras.', 'Gostei de ouvir isso.'],
  ruim: ['Hm... não sei o que dizer.', 'Isso foi meio estranho.', 'Prefiro mudar de assunto.', 'Ah. Tá bom.']
};
// pares de falas dos moradores (um fala, o outro responde)
const NPC_CONVERSAS = [
  ['Bom dia, vizinho!', 'Bom dia! Que dia bonito.'], ['Viu o preço do pão?', 'Um absurdo!'], ['Dizem que há um dragão nas montanhas.', 'Credo! Que os deuses nos protejam.'],
  ['Minha colheita foi ótima este ano.', 'Que inveja! A minha secou.'], ['Você soube da guerra?', 'Não fale disso aqui...'], ['O ferreiro está noivo!', 'O quê? De quem?!'],
  ['Choveu a noite toda.', 'Meu telhado virou uma peneira.'], ['Vi um aventureiro voltando todo machucado.', 'Eles nunca aprendem.'], ['Me empresta dez moedas?', 'De novo? Nem pensar!'],
  ['A taverna vai ter música hoje!', 'Então te vejo lá.'], ['Meu filho quer ser guarda.', 'É um trabalho honrado.'], ['Ouvi uivos ontem à noite.', 'Tranquei a porta duas vezes.'],
  ['Esse peixe está fresco?', 'Pescado hoje de manhã!'], ['Você parece cansado.', 'Trabalhei o dia inteiro.'], ['Acho que vai nevar.', 'Nem me fale.']
];
const Vida = {
  // ---------- estado ----------
  init(P) {
    if (!P.needs) P.needs = { fome: 100, sede: 100, sono: 100 };
    if (P.honra === undefined) P.honra = 0;
    if (!P.favores) P.favores = [];
  },
  on() { return !Game.settings || Game.settings.needs !== false; },
  clock() { return Game.day * 1440 + Game.time; },
  // ---------- necessidades ----------
  tick(dt) {
    const P = Game.player; if (!P) return;
    this.init(P);
    const now = this.clock();
    if (this.last === undefined || now < this.last) this.last = now;
    const dm = Math.min(1440, now - this.last); this.last = now;
    if (this.on() && dm > 0 && !P.dead) {
      const N = P.needs;
      for (const k of ['fome', 'sede', 'sono']) {
        const before = N[k];
        // dormindo, o sono volta em vez de cair
        if (k === 'sono' && P.sleeping) N[k] = Math.min(100, N[k] + dm * 0.2);
        else N[k] = Math.max(0, N[k] - dm * 100 / NEED_MIN[k] * (P.sprinting ? 1.4 : 1));
        if (before >= 30 && N[k] < 30) Game.toast({ fome: 'Você está com fome. Coma alguma coisa.', sede: 'Você está com sede. Beba água.', sono: 'Você está com sono. Durma numa cama ou acampe.' }[k], '#ffd080');
        if (before >= 10 && N[k] < 10) Game.toast({ fome: 'Você está fraco(a) de fome!', sede: 'Você está desidratado(a)!', sono: 'Você mal consegue manter os olhos abertos!' }[k], '#ff8060');
      }
      // fome ou sede no zero tiram vida devagar (nunca abaixo de 10%)
      if ((N.fome <= 0 || N.sede <= 0) && P.hp > P.stat.maxHp * 0.1) P.hp = Math.max(P.stat.maxHp * 0.1, P.hp - dm * 0.35);
    }
  },
  speedMul() { const P = Game.player; if (!this.on() || !P || !P.needs) return 1; return P.needs.sono < 10 ? 0.82 : P.needs.sono < 25 ? 0.92 : 1; },
  regenMul() { const P = Game.player; if (!this.on() || !P || !P.needs) return 1; return (P.needs.fome < 15 ? 0.5 : 1) * (P.needs.sede < 15 ? 0.6 : 1); },
  restore(k, v) { const P = Game.player; this.init(P); P.needs[k] = clamp(P.needs[k] + v, 0, 100); },
  // efeito extra de comida e bebida (chamado por useItem); true = já tratou o item
  useItem(P, it, d, u) {
    this.init(P);
    if (u.camp) { this.acampar(it); return true; }
    if (u.vila) { Vila.fundar(it); return true; }
    if (d.type === 'food' && u.heal) this.restore('fome', u.heal * 1.6 + 8);
    if (u.drink) this.restore('sede', u.drink);
    else if (d.type === 'potion') this.restore('sede', 8);
    return false;
  },
  beber(fonte) {
    const P = Game.player; this.init(P);
    this.restore('sede', 60); Sfx.play('drink');
    Game.burst(P.x + Math.cos(P.face) * 10, P.y - 2, '#80c0ff', 6, 30);
    Game.toast(`Você bebeu água ${fonte}.`, '#a0d8ff');
  },
  // dormir no saco de dormir em qualquer lugar fora das cidades (perigoso se houver inimigos)
  acampar(it) {
    const G = Game, P = G.player;
    if (!G.level.isWorld) return G.toast('Acampe no mundo aberto.', '#ffa0a0');
    if (G.actors.some(a => a.team === 'enemy' && !a.dead && dist(a.x, a.y, P.x, P.y) < 260)) return G.toast('Não dá para dormir com inimigos por perto!', '#ff8080');
    const h = G.time >= 20 * 60 || G.time < 5 * 60 ? 'até o amanhecer' : 'por algumas horas';
    UI.confirm(`Montar acampamento e dormir ${h}?<br><span class="dim">O saco de dormir não é gasto.</span>`, () => {
      UI.close();
      const add = G.time >= 20 * 60 ? 1440 - G.time + 6 * 60 : G.time < 5 * 60 ? 6 * 60 - G.time : 6 * 60;
      G.time += add; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
      this.restore('sono', 100); this.restore('fome', -add / NEED_MIN.fome * 100 * 0.5); this.restore('sede', -add / NEED_MIN.sede * 100 * 0.5);
      this.last = this.clock();
      P.hp = Math.max(P.hp, P.stat.maxHp * 0.8); P.st = P.stat.maxSt;
      for (let i = 0; i < 16; i++) G.particle(P.x + (Math.random() - 0.5) * 10, P.y - 6, (Math.random() - 0.5) * 10, -20 - Math.random() * 20, Math.random() < 0.5 ? '#ff9030' : '#ffd060', 0.8, 1, -10);
      UI.fade(); G.centerMsg('Você acampou', `Dia ${G.day}, ${G.timeStr()}`);
      if (Math.random() < 0.15) Eventos.emboscada();
    });
  },
  // acordar depois de uma noite de sono: descansado, mas com um pouco de fome e sede
  dormiu() { this.restore('sono', 100); this.restore('fome', -12); this.restore('sede', -18); this.last = this.clock(); },
  hudHTML() {
    const P = Game.player; if (!P || !P.needs || !this.on()) return '';
    const N = P.needs, cor = v => v < 10 ? '#ff4040' : v < 30 ? '#ffb040' : '#80d070';
    return ['fome', 'sede', 'sono'].map(k => `<span class="need ${N[k] < 10 ? 'pulse' : ''}" title="${k}"><b>${{ fome: '🍖', sede: '💧', sono: '💤' }[k]}</b><i style="width:${Math.round(N[k])}%;background:${cor(N[k])}"></i></span>`).join('');
  },

  // ---------- honra ----------
  honra(n, motivo) {
    const P = Game.player; this.init(P);
    const t0 = this.titulo().nome;
    P.honra = clamp(P.honra + n, -100, 100);
    Game.floater(P.x, P.y - 36, `${n > 0 ? '+' : ''}${n} HONRA`, n > 0 ? '#90e0a0' : '#ff8070');
    if (motivo) Game.chron(`${n > 0 ? 'Ganhei' : 'Perdi'} honra: ${motivo}.`);
    const t1 = this.titulo();
    if (t1.nome !== t0) Game.centerMsg('HONRA: ' + t1.nome.toUpperCase(), n > 0 ? 'As pessoas falam bem de você.' : 'As pessoas falam mal de você.');
  },
  titulo() { const h = (Game.player && Game.player.honra) || 0; for (const [lim, nome, cor] of HONRA_TITULOS) if (h < lim) return { nome, cor, v: h }; return { nome: 'Herói Lendário', cor: '#ffd860', v: h }; },
  // preços: honrados ganham desconto, infames pagam mais
  precoMul() { const h = (Game.player && Game.player.honra) || 0; return h >= 60 ? 0.88 : h >= 20 ? 0.95 : h <= -60 ? 1.3 : h <= -20 ? 1.12 : 1; },
  // guardas atacam quem é infame
  hostilGuarda() { return ((Game.player && Game.player.honra) || 0) <= -60; },
  saudacao() {
    const h = (Game.player && Game.player.honra) || 0;
    if (h >= 60) return ['É uma honra conhecer você, herói!', 'Todos falam das suas façanhas!', 'Bem-vindo(a), campeão(ã)!'];
    if (h >= 20) return ['Ouvi coisas boas sobre você.', 'Seja bem-vindo(a), amigo(a).'];
    if (h <= -60) return ['Fique longe de mim, criminoso(a)!', 'Guardas! ... ah, deixa pra lá.', 'Não quero confusão com gente como você.'];
    if (h <= -20) return ['Hm. Já ouvi falar de você...', 'Não confio em você.'];
    return null;
  },

  // guardas atacam quem é infame (e voltam ao normal quando a honra melhora ou a multa é paga)
  guardas(dt) {
    this.gT = (this.gT || 0) - dt; if (this.gT > 0) return; this.gT = 1;
    const G = Game, P = G.player; if (!P || !G.level.isWorld) return;
    const mau = this.hostilGuarda() || (Eventos.state().procurado >= 3);
    for (const a of G.actors) {
      if (!a.guard || a.dead) continue;
      if (mau && a.team !== 'law' && dist(a.x, a.y, P.x, P.y) < 150) {
        a.team = 'law'; a._fac = a.faction; a.faction = null; a.target = P; a.provoked = P;
        if (!this.gritoT || G.t - this.gritoT > 20) { this.gritoT = G.t; G.toast(`${a.name}: "Pare, criminoso(a)!"`, '#ff8070'); }
      } else if (!mau && a.team === 'law') { a.team = 'ally'; a.faction = a._fac; a.target = null; a.provoked = null; }
    }
  },
  // ---------- moradores conversando entre si ----------
  chats: [],
  npcTick(dt) {
    const G = Game;
    this.chats = this.chats.filter(c => (c.t -= dt) > 0 && !c.a.dead && !c.b.dead);
    this.chatT = (this.chatT || 0) - dt;
    if (this.chatT > 0 || !G.started) return;
    this.chatT = 1.5 + Math.random() * 2;
    const P = G.player, near = G.actors.filter(a => a instanceof NPC && !a.angel && !a.workCust && !a.chatT && !(a.chatCd > 0) && a.talkT <= 0 && (a.role === 'citizen' || a.role === 'resident' || a.role === 'merchant') && dist(a.x, a.y, P.x, P.y) < 220);
    for (const a of near) {
      const b = near.find(o => o !== a && !o.chatT && dist(o.x, o.y, a.x, a.y) < 46);
      if (!b) continue;
      const par = NPC_CONVERSAS[Math.floor(Math.random() * NPC_CONVERSAS.length)];
      a.chatT = b.chatT = 5; a.chatWith = b; b.chatWith = a; a.wp = b.wp = null;
      this.chats.push({ a, b, t: 5, par });
      break;
    }
    // às vezes alguém comenta sobre o jogador (a honra muda o que dizem)
    const s = this.saudacao();
    if (s && Math.random() < 0.25) { const n = near.find(a => !a.chatT && dist(a.x, a.y, P.x, P.y) < 70); if (n) { n.chatT = 3; n.chatWith = P; this.chats.push({ a: n, b: P, t: 3, par: [s[Math.floor(Math.random() * s.length)], null] }); } }
  },
  // balões de fala (desenhados por cima dos personagens)
  drawChats(ctx, camX, camY) {
    ctx.font = '10px VT323, monospace'; ctx.textAlign = 'center';
    for (const c of this.chats) {
      const first = c.t > 2.6 || !c.par[1], who = first ? c.a : c.b, txt = first ? c.par[0] : c.par[1];
      if (!txt || who === Game.player) continue;
      const x = Math.round(who.x - camX), y = Math.round(who.y - (who.h || 28) - 8 - camY), w = Math.min(150, ctx.measureText(txt).width + 8);
      ctx.fillStyle = 'rgba(250,246,232,0.95)'; ctx.fillRect(x - w / 2, y - 10, w, 12); ctx.fillRect(x - 2, y + 2, 4, 2);
      ctx.strokeStyle = '#3a2a1a'; ctx.lineWidth = 1; ctx.strokeRect(x - w / 2 + 0.5, y - 9.5, w - 1, 11);
      ctx.fillStyle = '#2a1a10'; ctx.fillText(txt, x, y - 1, 144);
    }
    ctx.textAlign = 'left';
  },

  // ---------- romance pela conversa ----------
  personalidade(r, rid) { if (!r.pers) { const k = Object.keys(PERSONALIDADES); r.pers = k[hashStr(rid || r.name || 'x') % k.length]; } return PERSONALIDADES[r.pers]; },
  conversar(a, r, back) {
    const day = Game.day;
    if (r.talkDay !== day) { r.talkDay = day; r.talkN = 0; }
    if (r.talkN >= 3) return UI.dialog(a.name, a.look, 'Hoje já conversamos bastante. Volte amanhã! 😊', [{ label: 'Voltar', fn: back }]);
    const rng = new RNG(hashStr(a.rid || a.name) + day * 31 + r.talkN);
    const keys = rng.shuffle(Object.keys(TOPICOS).filter(k => !TOPICOS[k].min || r.aff >= TOPICOS[k].min)).slice(0, 4);
    const pers = this.personalidade(r, a.rid);
    const dica = r.aff >= 20 ? `<div class="dim small">Parece ser uma pessoa ${pers.nome}.</div>` : '';
    UI.dialog(a.name, a.look, `${UI.hearts(r.aff)}<br>Sobre o que você quer falar?${dica}`, keys.map(k => ({ label: TOPICOS[k].label, fn: () => this.falar(a, r, k, back) })).concat([{ label: 'Voltar', fn: back }]));
  },
  falar(a, r, k, back) {
    const P = Game.player, T_ = TOPICOS[k], pers = this.personalidade(r, a.rid);
    r.talkN = (r.talkN || 0) + 1;
    const fala = T_.fala[Math.floor(Math.random() * T_.fala.length)];
    let q = pers.gosta.includes(k) ? 'otimo' : pers.odeia.includes(k) ? 'ruim' : 'bom';
    // eloquência ajuda; honra ruim atrapalha
    if (q === 'bom' && Math.random() < P.skill('eloquencia') / 200) q = 'otimo';
    if (q !== 'ruim' && (P.honra || 0) <= -40 && Math.random() < 0.4) q = 'ruim';
    const ganho = q === 'otimo' ? 8 + Math.floor(P.skill('eloquencia') / 15) : q === 'bom' ? 4 : -5;
    r.aff = clamp(r.aff + ganho, 0, 100); P.train('eloquencia', 2);
    const resp = RESPOSTAS[q][Math.floor(Math.random() * RESPOSTAS[q].length)];
    const opts = [];
    // às vezes ele(a) devolve uma pergunta: a escolha da resposta conta
    if (q !== 'ruim' && Math.random() < 0.35) {
      const perguntas = [
        ['Você acha que eu deveria sair desta cidade um dia?', 'Vá atrás dos seus sonhos!', 'Aqui é o seu lugar.', 'aventureiro'],
        ['O que você faria se ganhasse mil moedas de ouro?', 'Ajudaria quem precisa.', 'Gastaria tudo numa festa!', 'romantico'],
        ['Você tem medo de alguma coisa?', 'De perder quem eu gosto.', 'Eu? De nada!', 'timido'],
        ['Qual é o seu lugar preferido no mundo?', 'Qualquer lugar perto de você.', 'O topo de uma montanha.', 'serio']
      ];
      const pg = perguntas[Math.floor(Math.random() * perguntas.length)];
      const responder = (i) => {
        const bom = (i === 0) === (r.pers === pg[3] || r.pers === 'romantico');
        r.aff = clamp(r.aff + (bom ? 6 : -2), 0, 100);
        UI.dialog(a.name, a.look, `${UI.hearts(r.aff)}<br>${bom ? 'Eu pensei exatamente a mesma coisa! 💕' : 'Hm... eu pensaria diferente.'} <span class="${bom ? 'good' : 'bad'}">(${bom ? '+6' : '-2'})</span>`, [{ label: 'Continuar conversando', fn: () => this.conversar(a, r, back) }, { label: 'Voltar', fn: back }]);
      };
      return UI.dialog(a.name, a.look, `<i>"${esc(fala)}"</i><br>${esc(resp)} <span class="${ganho > 0 ? 'good' : 'bad'}">(${ganho > 0 ? '+' : ''}${ganho})</span><br><br>${esc(pg[0])}`, [{ label: pg[1], fn: () => responder(0) }, { label: pg[2], fn: () => responder(1) }]);
    }
    opts.push({ label: 'Continuar conversando', fn: () => this.conversar(a, r, back) }, { label: 'Voltar', fn: back });
    UI.dialog(a.name, a.look, `${UI.hearts(r.aff)}<br><i>"${esc(fala)}"</i><br>${esc(resp)} <span class="${ganho > 0 ? 'good' : 'bad'}">(${ganho > 0 ? '+' : ''}${ganho})</span>`, opts);
  }
};
