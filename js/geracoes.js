'use strict';
// =====================================================================
//  GERAÇÕES: ENVELHECER, MORRER E CONTINUAR
//  • Idade: o personagem faz aniversário (1 ano = alguns dias de jogo, dá
//    para mudar o ritmo). Depois dos 60 os cabelos ficam brancos, o braço
//    fica mais fraco e a morte de velhice pode chegar a qualquer dia.
//  • Sucessão: quando você morre (de velhice, ou se aceitar a morte depois
//    de cair em combate), você continua como um dos seus filhos (herda o
//    ouro, os itens, as casas, a vila e o reino), como um parente distante
//    ou nasce de novo como um bebê de uma família qualquer do mundo.
//  • Infância (6 a 15 anos): a criança é pequena e fraca, não namora, não
//    se alista e não funda vila. Ela vai à escola, ajuda os pais e brinca.
//  • Escola: aulas sobre o que aconteceu no mundo (guerras, reinos que
//    caíram, rebeliões, governos) e sobre os seus antepassados — o que eles
//    fizeram, os reinos que governaram e as guerras que lutaram. Cada aula
//    tem uma pergunta; quem acerta ganha experiência e se forma aos 16.
//  • Equipar a família: dê armas e armaduras ao cônjuge e aos filhos. Eles
//    aparecem com elas e o cônjuge que luta ao seu lado fica mais forte.
// =====================================================================
const VIDA_RITMOS = [1, 3, 6, 12];          // dias de jogo por ano de vida
const ADULTO = 16, VELHO = 60;
const FEITOS_FALSOS = ['Domou um dragão de três cabeças em Nordheim.', 'Foi coroado(a) imperador(a) das ilhas do sul.', 'Atravessou o oceano a nado em uma noite.', 'Ganhou um torneio de canto em Zahrim.', 'Construiu uma torre que tocava as nuvens.', 'Venceu um gigante de gelo com uma colher.', 'Fundou a primeira biblioteca dos anões.', 'Casou com a rainha dos elfos da lua.'];
const CAUSAS_FALSAS = ['picada de cobra', 'queda de um cavalo', 'febre do pântano', 'naufrágio', 'um duelo de honra', 'velhice', 'uma flecha perdida'];

const Geracoes = {
  // ---------- idade ----------
  init(P) {
    if (!P) return;
    if (P.idade0 === undefined) { P.idade0 = 20; P.idadeDia = Game.day + Game.time / 1440; }
    if (!P.vidaRitmo) P.vidaRitmo = 3;
  },
  agora() { return Game.day + Game.time / 1440; },
  idade(P = Game.player) { if (!P) return 20; this.init(P); return Math.max(0, P.idade0 + (this.agora() - P.idadeDia) / P.vidaRitmo); },
  anos(P = Game.player) { return Math.floor(this.idade(P)); },
  crianca(P = Game.player) { return !!P && this.idade(P) < ADULTO; },
  fase(P = Game.player) { const a = this.idade(P); return a < ADULTO ? 'crianca' : a >= VELHO ? 'velho' : 'adulto'; },
  ritmo(n) {
    const P = Game.player, a = this.idade(P);
    P.idade0 = a; P.idadeDia = this.agora(); P.vidaRitmo = n;
  },
  idadeFilho(c) { const P = Game.player; this.init(P); return Math.max(0, (this.agora() - (c.born || 0)) / P.vidaRitmo); },
  // a força do braço muda com a idade
  fatorDano(P = Game.player) {
    const a = this.idade(P);
    if (a < ADULTO) return 0.45 + (a - 6) * 0.03;
    if (a >= 75) return 0.7;
    if (a >= VELHO) return 0.85;
    return 1;
  },
  // ---------- todo dia ----------
  dia() {
    const P = Game.player; if (!P || P.dead) return;
    this.init(P);
    const a = this.anos(P), f = this.fase(P);
    if (P.aniv !== undefined && a > P.aniv) {
      Game.toast(`🎂 Feliz aniversário! ${P.name} fez ${a} anos.`, '#ffe0a0');
      if (a === ADULTO && P.escola) this.formatura();
      else if (a === ADULTO) Game.centerMsg('VOCÊ CRESCEU!', `${P.name} agora é adulto(a): pode casar, se alistar e fundar uma vila.`);
    }
    P.aniv = a;
    if (f !== P.faseVista) {
      if (P.faseVista === 'adulto' && f === 'velho') { Game.centerMsg('OS CABELOS FICARAM BRANCOS', `${P.name} tem ${a} anos. A velhice chegou: o braço já não é o mesmo.`); Game.chron(`Fiz ${a} anos. Meus cabelos ficaram brancos.`); }
      if (P.faseVista === 'crianca' && f === 'adulto') Game.chron(`Fiz ${a} anos e virei adulto(a).`);
      P.faseVista = f; P.buildLook();
    }
    // a morte de velhice (cada vez mais provável depois dos 60)
    if (a >= VELHO && !P.morteVelho) {
      const anual = a >= 95 ? 99 : 0.012 * Math.exp(0.1 * (a - VELHO)) * (Luto.brutal() ? 1.3 : 1);
      if (Math.random() < anual / P.vidaRitmo) P.morteVelho = Game.day;
      else if (a >= 70 && Math.random() < 0.05) Game.toast(`${P.name} acordou com as costas doendo... a idade pesa.`, '#d0c0a0');
    }
    // mesada dos pais na infância
    if (P.origem && f === 'crianca' && Game.day % 5 === 0) { P.gold += 5; Game.toast(`Seus pais deram uma mesada: +5 de ouro.`, '#f0e0a0'); }
  },
  tick() {
    const P = Game.player; if (!P || !P.morteVelho || P.dead || UI.current || !Game.started || Game.state !== 'play') return;
    if (Game.level && Game.level.isWorld === false && Game.level.isShip) return;
    P.morteVelho = null; P.dead = true;
    Game.centerMsg('✝ O FIM DE UMA VIDA', `${P.name} morreu de velhice aos ${this.anos(P)} anos.`); Sfx.play('death');
    setTimeout(() => this.sucessao('morreu de velhice'), 1600);
  },

  // ---------- a memória de quem viveu ----------
  registro(P, causa) {
    const sp = P.spouse && P.rel[P.spouse];
    const feitos = (P.chronicle || []).map(c => c.text).filter(t => !/^Cheguei pela primeira vez|^Local descoberto/.test(t));
    let reino = null, titulo = null;
    try { if (Reino.ativo()) { reino = Reino.nome(); titulo = Reino.titulo(); } } catch (e) { /* sem reino */ }
    return {
      nome: P.name, raca: (RACES[P.race] || RACES.humano).name, sexo: (P.app && P.app.sex) || 'm', idade: this.anos(P), dia: Game.day, causa,
      nivel: P.level, look: P.look, reino, titulo, vila: P.vila ? P.vila.nome : null, conjuge: sp ? sp.name : null,
      filhos: (P.children || []).map(c => c.name), feitos: feitos.slice(-40), kills: P.stats.kills, dragoes: P.stats.dragons, missoes: P.stats.quests,
      geracao: P.geracao || 1
    };
  },
  // ---------- a escolha de quem continua ----------
  sucessao(causa) {
    const P = Game.player, G = Game;
    const filhos = (P.children || []).slice();
    const reg = this.registro(P, causa);
    const f = UI.reg();
    const vida = `${esc(P.name)} viveu ${reg.idade} anos • nível ${P.level} • ${P.stats.kills} inimigos • ${P.stats.quests} missões${reg.reino ? ` • ${esc(reg.titulo)} do ${esc(reg.reino)}` : reg.vila ? ` • fundou ${esc(reg.vila)}` : ''}`;
    const bts = filhos.map(c => {
      const ia = Math.floor(this.idadeFilho(c));
      return `<button class="mbtn gold" ${f(() => this.herdeiro(c, reg))}>👑 Continuar como ${esc(c.name)} (${c.sex === 'f' ? 'filha' : 'filho'}, ${Math.max(6, ia)} anos)<br><small>Herda o ouro, os itens, as casas${P.vila ? ', a vila' : ''}${Reino.ativo() ? ' e o reino' : ''}</small></button>`;
    }).join('');
    const parente = `<button class="mbtn${filhos.length ? '' : ' gold'}" ${f(() => this.herdeiro(null, reg))}>👥 Continuar como um parente distante (18 anos)<br><small>${filhos.length ? 'Herda tudo, mas não é seu filho' : 'Sem filhos, um sobrinho herda tudo'}</small></button>`;
    const bebe = `<button class="mbtn" ${f(() => this.renascer(reg))}>👶 Nascer de novo como um bebê de uma família qualquer<br><small>Começa do zero, aos 6 anos, numa cidade aleatória${P.vila ? '. A vila fica para trás' : ''}${Reino.ativo() ? ' e as terras do reino viram um reino independente' : ''}</small></button>`;
    const el = UI.show('sucessao', `<div class="death"><h1>✝ ${esc(P.name)}</h1><p>${esc(P.name)} ${esc(causa)}.</p><p class="dim">${vida}</p><p>Quem vai continuar a história?</p>${bts}${parente}${bebe}</div>`, { cls: 'dark scroll' });
    UI.bind(el, f);
    void G;
  },
  // devolve para a mochila o que a família estava usando
  devolverEquip(P, N) {
    for (const id in P.equipFam || {}) for (const sl in P.equipFam[id]) { const it = P.equipFam[id][sl]; if (it) N.inv.push(it); }
  },
  herdeiro(c, reg) {
    const old = Game.player, rng = new RNG(Date.now() & 0xffffff);
    const parts = old.name.split(' '), sobren = parts.length > 1 ? parts[parts.length - 1] : '';
    let race, sex, look, nome, idade;
    if (c) { race = RACES[c.race] && !RACES[c.race].npcOnly ? c.race : old.race; sex = c.sex; look = c.look || {}; nome = c.name.split(' ')[0] + (sobren ? ' ' + sobren : ''); idade = Math.max(6, this.idadeFilho(c)); }
    else { race = old.race; sex = rng.chance(0.5) ? 'm' : 'f'; look = npcLook(race, sex, rng, 'citizen'); nome = rng.pick(NAMES[race][sex]) + (sobren ? ' ' + sobren : ''); idade = 18; }
    const app = { skin: look.skin || old.app.skin, hair: look.hair || old.app.hair, hairStyle: look.hairStyle || 0, sex };
    if (sex === 'f') app.beard = false;
    const N = new Player({ name: nome, race, cls: old.cls, app, noItems: true });
    // a herança
    for (const k of ['gold', 'inv', 'equip', 'houses', 'storage', 'hasHorse', 'mount', 'horse', 'cart', 'vila', 'reino', 'mobilia', 'nobre', 'mar', 'tirania', 'tiraniaCaiu', 'main', 'doneQuests', 'quests', 'eventos', 'visitedCont', 'freeMode', 'pet', 'falecidos']) if (old[k] !== undefined) N[k] = old[k];
    this.devolverEquip(old, N);
    N.honra = Math.round((old.honra || 0) / 2);
    const L = Math.max(1, Math.round(old.level * 0.4)); N.level = L; N.pendingLevels = L - 1; N.perkPts = L - 1;
    N.irmaos = (old.children || []).filter(x => x !== c).map(x => ({ name: x.name, look: x.look, sex: x.sex }));
    const sp = old.spouse && old.rel[old.spouse];
    N.origem = { cidade: old.lastTown, pais: [{ name: old.name, look: old.look, vivo: false }].concat(sp && c ? [{ name: sp.name, look: sp.look, vivo: true }] : []), herdeiro: true };
    N.falecidos = (old.falecidos || []).slice(); N.falecidos.unshift({ nome: old.name, tipo: c ? (reg.sexo === 'f' ? 'Mãe' : 'Pai') : 'Parente', dia: Game.day, causa: reg.causa, look: old.look, race: old.race, sex: reg.sexo });
    this.passar(old, N, idade, reg);
    const V = Vila.st();
    const casa = (V && Game.world.settlements.find(s => s.id === V.id)) || Game.world.settlements.find(s => s.id === old.lastTown);
    this.recomecar(N, casa);
    Game.chron(`Sou ${N.name}, ${c ? (sex === 'f' ? 'filha' : 'filho') : 'parente'} de ${old.name}, que ${reg.causa}. Herdei tudo o que ${reg.sexo === 'f' ? 'ela' : 'ele'} construiu.`);
    War.news(`👑 ${old.name} ${reg.causa}. ${N.name} herda ${N.reino ? 'o ' + Reino.nome() : 'a família'}.`, true, ['jogador']);
    UI.story([
      `${old.name} ${reg.causa} aos ${reg.idade} anos.`,
      c ? `O povo se reuniu para a despedida. ${N.name}, com ${Math.floor(idade)} anos, agora carrega o nome da família.` : `Sem filhos para herdar, um parente distante chamado ${N.name} chegou para cuidar de tudo.`,
      N.reino ? `${Reino.titulo()} ${N.name}! ${Math.floor(idade) < ADULTO ? 'Até crescer, um regente ajuda no governo, mas as decisões são suas.' : 'O reino é seu agora.'}` : 'A história da família continua.'
    ], () => Game.centerMsg(N.name.toUpperCase(), `${Math.floor(idade)} anos • ${Game.player.geracao}ª geração`));
  },
  // um bebê de uma família qualquer do mundo
  renascer(reg) {
    const old = Game.player, W = Game.world, rng = new RNG(Date.now() & 0xffffff);
    const cs = W.settlements.filter(s => !s.playerVila && !s.academy && !s.pirata && !s.homeId && (s.type === 'village' || s.type === 'town') && s.region && !s.region.neutral && !s.region.hostile);
    const s = rng.pick(cs.length ? cs : W.settlements);
    const cult = CULTURES[s.region.culture], r0 = cult && cult.race;
    const race = RACES[r0] && !RACES[r0].npcOnly && NAMES[r0] ? r0 : 'humano';
    const sex = rng.chance(0.5) ? 'm' : 'f', N_ = NAMES[race], sobren = rng.pick(N_.s);
    const look = npcLook(race, sex, rng, 'kid');
    const nome = rng.pick(N_[sex]) + ' ' + sobren;
    const pai = { name: rng.pick(N_.m) + ' ' + sobren, look: npcLook(race, 'm', rng, 'citizen'), vivo: true }, mae = { name: rng.pick(N_.f) + ' ' + sobren, look: npcLook(race, 'f', rng, 'citizen'), vivo: true };
    const prof = rng.pick(['fazendeiros', 'ferreiros', 'pescadores', 'mercadores', 'tecelões', 'padeiros', 'lenhadores', 'pastores']);
    const app = { skin: look.skin, hair: look.hair, hairStyle: look.hairStyle || 0, sex };
    if (sex === 'f') app.beard = false;
    const N = new Player({ name: nome, race, cls: old.cls, app, noItems: true });
    N.gold = 15; N.addItem(Items.make('pao', 3), true); N.addItem(Items.make('maca', 2), true);
    for (const k of ['main', 'doneQuests', 'visitedCont', 'freeMode']) if (old[k] !== undefined) N[k] = old[k];
    N.origem = { cidade: s.id, nomeCidade: s.name, pais: [pai, mae], prof };
    // as terras do reino antigo viram um reino independente; a vila fica para trás
    this.legado(old, reg);
    this.passar(old, N, 6, reg);
    this.recomecar(N, s);
    Game.chron(`Nasci em ${s.name}, ${sex === 'f' ? 'filha' : 'filho'} de ${pai.name} e ${mae.name}, uma família de ${prof}.`);
    UI.story([
      `${old.name} ${reg.causa} aos ${reg.idade} anos. O mundo seguiu em frente...`,
      `Em ${s.name}, ${s.region.short || s.region.name}, nasceu um bebê na casa de ${pai.name} e ${mae.name}, ${prof}.`,
      `Deram o nome de ${nome}. Os anos passaram depressa.`,
      `Agora ${nome} tem 6 anos. É hora de ir à escola, ajudar em casa, brincar... e um dia escrever a própria história.`
    ], () => Game.centerMsg(nome.toUpperCase(), `6 anos • ${s.name}`));
  },
  legado(old, reg) {
    const S = War.st();
    if (!old.reino || !old.vila) return;
    const cs = Game.world.settlements.filter(x => !x.playerVila && War.ownerOf(x) === 'jogador');
    let novo = null;
    if (cs.length && War.K.jogador) novo = Governos.secessao('jogador', { cidades: cs, gov: 'monarquia', semGuerra: true, lider: reg.filhos[0] ? reg.filhos[0] + ' ' + (reg.nome.split(' ')[1] || '') : null });
    S.wars = S.wars.filter(w => w.a !== 'jogador' && w.b !== 'jogador');
    S.armies = S.armies.filter(x => x.k !== 'jogador' && x.foe !== 'jogador');
    S.battles = S.battles.filter(bt => S.armies.some(x => x.id === bt.a) && S.armies.some(x => x.id === bt.b));
    for (const id in S.owner) if (S.owner[id] === 'jogador') delete S.owner[id];
    S.propostas = [];
    if (novo && War.K[novo]) War.news(`👑 Com a morte de ${old.name}, as terras do ${reg.reino} viraram o ${War.K[novo].name}.`, true, [novo]);
  },
  // o que passa de uma vida para a outra
  passar(old, N, idade, reg) {
    N.idade0 = idade; N.idadeDia = this.agora(); N.vidaRitmo = old.vidaRitmo || 3;
    N.aniv = Math.floor(idade); N.faseVista = idade < ADULTO ? 'crianca' : idade >= VELHO ? 'velho' : 'adulto';
    N.antepassados = (old.antepassados || []).concat([reg]).slice(-12);
    N.geracao = (old.geracao || 1) + 1;
    N.stats.playTime = old.stats.playTime;
    if (idade < ADULTO) N.escola = { aulas: 0, acertos: 0, dia: -1 };
  },
  recomecar(N, s) {
    const G = Game, W = G.world;
    G.player = N; N.buildLook(); N.recalc(); N.hp = N.stat.maxHp; N.mp = N.stat.maxMp; N.st = N.stat.maxSt;
    s = s || W.nearestSettlement(N.x / 16, N.y / 16);
    N.lastTown = s.id;
    N.x = s.mid.x * 16 + 8; N.y = (s.mid.y + 4) * 16 + 8;
    G.level = W; G.track = null; G.worldPos = null;
    G.startPlay();
    G.findFree(N);
    G.camX = N.x - G.vw / 2; G.camY = N.y - G.vh / 2;
    War.kingdoms();
    G.saveGame(0, true);
  },

  // ---------- a escola ----------
  professor(s) {
    const rng = new RNG(hashStr('prof' + s.id)), race = (CULTURES[s.region.culture] && NAMES[CULTURES[s.region.culture].race]) ? CULTURES[s.region.culture].race : 'humano';
    const sx = rng.chance(0.5) ? 'm' : 'f', L = npcLook(race, sx, rng, 'citizen');
    L.old = true; L.hair = '#d8d8d8'; if (L.beard) L.beardC = L.hair; L.body = rng.pick(['#3a4a7a', '#5a3a2a', '#2a5a4a']); L.robe = true;
    return { nome: (sx === 'f' ? 'Mestra ' : 'Mestre ') + rng.pick(NAMES[race][sx]), look: L };
  },
  escola() {
    const P = Game.player, a = this.anos(P), s = Game.curTown;
    if (a >= ADULTO) return UI.dialog('Escola', null, 'A escola é para crianças de 6 a 15 anos. Você já se formou!', [{ label: 'Ok' }]);
    if (!s || !Game.level.isWorld || s.playerVila && !Vila.st()) return UI.dialog('Escola', null, 'A escola fica nas vilas e cidades. Vá até uma delas de manhã.', [{ label: 'Ok' }]);
    const h = Game.time / 60;
    if (h < 7 || h >= 16) return UI.dialog('Escola', null, 'A escola abre de manhã (das 7h às 16h). Volte amanhã cedo!', [{ label: 'Ok' }]);
    const E = P.escola || (P.escola = { aulas: 0, acertos: 0, dia: -1 });
    if (E.dia === Game.day) return UI.dialog('Escola', null, 'Você já foi à aula hoje. Volte amanhã! 📚', [{ label: 'Ok' }]);
    E.dia = Game.day; E.aulas++;
    const pr = this.professor(s), aula = this.aula(E.aulas);
    Academy.passTime(180);
    UI.dialog(`📚 Escola de ${s.name}`, pr.look, `<b>${esc(pr.nome)}</b>: Bom dia, turma! Hoje a aula é sobre <b>${esc(aula.titulo)}</b>.<br><br>${aula.texto}`, [
      { label: '✋ Responder à pergunta do professor', cls: 'gold', fn: () => this.pergunta(aula, pr) },
      { label: 'Matar a aula 🙈', fn: () => { E.aulas--; UI.close(); Game.toast('Você saiu de fininho...', '#d0c0a0'); } }
    ]);
  },
  pergunta(aula, pr) {
    const P = Game.player, E = P.escola, q = aula.perg;
    if (!q) { E.acertos++; P.addXP(20); UI.dialog(`📚 ${pr.nome}`, pr.look, 'Hoje não tem pergunta. Prestou atenção? Muito bem! (+20 XP)', [{ label: 'Obrigado(a)!' }]); return; }
    const ops = new RNG(E.aulas * 77 + Game.day).shuffle(q.ops.slice());
    UI.dialog(`📚 ${pr.nome}`, pr.look, `❓ <b>${esc(q.q)}</b>`, ops.map(o => ({ label: o, fn: () => {
      if (o === q.ops[0]) {
        E.acertos++; const xp = 20 + this.anos(P) * 2; P.addXP(xp); Sfx.play('learn');
        UI.dialog(`📚 ${pr.nome}`, pr.look, `✅ Isso mesmo! Muito bem, ${esc(P.name.split(' ')[0])}! <span class="good">(+${xp} XP)</span><br><small class="dim">Acertos: ${E.acertos} de ${E.aulas} aulas.</small>`, [{ label: 'Oba! 😊' }]);
      } else UI.dialog(`📚 ${pr.nome}`, pr.look, `❌ Não... a resposta certa era: <b>${esc(q.ops[0])}</b>.<br>Estude mais um pouco!<br><small class="dim">Acertos: ${E.acertos} de ${E.aulas} aulas.</small>`, [{ label: 'Vou estudar 😔' }]);
    } })));
  },
  formatura() {
    const P = Game.player, E = P.escola; if (!E) return;
    const pts = Math.min(4, Math.floor(E.acertos / 6)), nota = E.aulas ? Math.round(E.acertos / E.aulas * 10) : 0;
    P.perkPts += pts; P.gold += 50 + E.acertos * 5;
    Game.centerMsg('🎓 FORMATURA!', `${P.name} se formou com nota ${nota}/10. +${pts} ponto(s) de talento e ${50 + E.acertos * 5} de ouro.`);
    Game.chron(`Fiz ${ADULTO} anos e me formei na escola com nota ${nota}.`);
    Sfx.play('levelup'); E.formado = Game.day;
  },
  // ---------- as aulas: o mundo e os antepassados ----------
  aula(n) {
    const P = Game.player, S = War.st(), rng = new RNG(n * 131 + hashStr(P.name));
    const ks = War.kingdoms().filter(k => k.id !== 'jogador' && !k.extinto && k.ruler);
    const temas = ['antepassado', 'guerras', 'reinos', 'governos', 'noticias', 'historia'];
    for (let t = 0; t < temas.length; t++) {
      const tema = temas[(n + t) % temas.length];
      const A = (P.antepassados || [])[(P.antepassados || []).length - 1 - (Math.floor(n / 6) % Math.max(1, (P.antepassados || []).length))];
      if (tema === 'antepassado' && A) {
        const feitos = A.feitos.length ? rng.shuffle(A.feitos.slice()).slice(0, 4) : [];
        const texto = `Hoje vamos estudar <b>${esc(A.nome)}</b> (${esc(A.raca)}), da ${A.geracao}ª geração da sua família. ${A.sexo === 'f' ? 'Ela' : 'Ele'} viveu <b>${A.idade} anos</b> e ${esc(A.causa)} no dia ${A.dia}.` +
          `${A.reino ? ` Foi <b>${esc(A.titulo)} do ${esc(A.reino)}</b>.` : A.vila ? ` Fundou a vila de <b>${esc(A.vila)}</b>.` : ''}${A.conjuge ? ` Casou com ${esc(A.conjuge)}.` : ''}${A.filhos.length ? ` Teve ${A.filhos.length} filho(s): ${esc(A.filhos.join(', '))}.` : ''}` +
          ` Chegou ao nível ${A.nivel}, venceu ${A.kills} inimigos${A.dragoes ? ` e ${A.dragoes} dragão(ões)` : ''} e cumpriu ${A.missoes} missões.` +
          (feitos.length ? `<br><br><b>O que as crônicas contam:</b><br>${feitos.map(x => `• <i>${esc(x)}</i>`).join('<br>')}` : '');
        const tipo = n % 3;
        let perg;
        if (tipo === 0 || !feitos.length) perg = { q: `Quantos anos viveu ${A.nome}?`, ops: [String(A.idade), String(A.idade + 7), String(Math.max(20, A.idade - 9))] };
        else if (tipo === 1) perg = { q: `Qual destes feitos é de ${A.nome}?`, ops: [feitos[0], ...rng.shuffle(FEITOS_FALSOS.slice()).slice(0, 2)] };
        else perg = { q: `Como terminou a vida de ${A.nome}?`, ops: [A.causa, ...rng.shuffle(CAUSAS_FALSAS.filter(c => !A.causa.includes(c))).slice(0, 2)] };
        return { titulo: `a vida de ${A.nome}`, texto, perg };
      }
      if (tema === 'guerras' && S.wars.length) {
        const nm = id => War.K[id] ? War.K[id].short : id;
        const linhas = S.wars.map(w => `• ${esc(nm(w.a))} contra ${esc(nm(w.b))} desde o dia ${w.since}`).join('<br>');
        const w = rng.pick(S.wars), outros = ks.filter(k => k.id !== w.a && k.id !== w.b && !War.atWar(k.id, w.a)).map(k => k.short);
        if (outros.length < 2 || !War.K[w.a] || !War.K[w.b]) continue;
        return { titulo: 'as guerras de hoje', texto: `O mundo não está em paz. Estas são as guerras que estão acontecendo agora:<br>${linhas}<br><br>Toda guerra começa com rivalidade, insultos e fronteiras disputadas. Algumas terminam com um tratado de paz; outras, com um reino deixando de existir.`, perg: { q: `Com quem ${nm(w.a)} está em guerra?`, ops: [nm(w.b), ...rng.shuffle(outros).slice(0, 2)] } };
      }
      if (tema === 'reinos' && ks.length >= 3) {
        const K = rng.pick(ks), n_ = Game.world.settlements.filter(s => War.ownerOf(s) === K.id).length;
        const outros = rng.shuffle(ks.filter(k => k !== K)).slice(0, 2).map(k => `${k.ruler.title} ${k.ruler.name}`);
        return { titulo: `o reino de ${K.short}`, texto: `<b>${esc(K.name)}</b> é governado por <b>${esc(K.ruler.title)} ${esc(K.ruler.name)}</b>. Tem ${n_} cidade(s) e a capital fica em ${esc(K.cap.name)}. O povo é de maioria ${esc((RACES[K.race] || RACES.humano).name.toLowerCase())}, e a forma de governo é <b>${GOVERNOS[Governos.de(K.id)].nome}</b>.${K.novo ? ' Este reino é jovem: nasceu de uma rebelião!' : ''}`, perg: { q: `Quem governa ${K.short}?`, ops: [`${K.ruler.title} ${K.ruler.name}`, ...outros] } };
      }
      if (tema === 'governos' && ks.length >= 3) {
        const l = ks.filter(k => Governos.de(k.id) !== 'monarquia');
        const K = l.length && rng.chance(0.7) ? rng.pick(l) : rng.pick(ks), g = Governos.de(K.id);
        const novos = Object.values(Governos.S().novos).map(x => `• ${esc(x.name)} nasceu de uma rebelião no dia ${x.dia}`).join('<br>');
        const outros = rng.shuffle(Object.keys(GOVERNOS).filter(x => x !== g)).slice(0, 2).map(x => GOVERNOS[x].nome);
        return { titulo: 'as formas de governo', texto: `Nem todo povo tem um rei. ${Object.values(GOVERNOS).map(G => `<b>${G.nome}</b>: ${esc(G.desc)}`).join('<br>')}${l.length ? `<br><br>Hoje não são monarquias: ${l.map(k => `${esc(k.short)} (${GOVERNOS[Governos.de(k.id)].nome})`).join(', ')}.` : ''}${novos ? `<br><br><b>Reinos que nasceram de rebeliões:</b><br>${novos}` : ''}`, perg: { q: `Qual é a forma de governo de ${K.short}?`, ops: [GOVERNOS[g].nome, ...outros] } };
      }
      if (tema === 'noticias' && S.news.length >= 3) {
        const l = S.news.slice(0, 8), it = rng.pick(l.slice(0, 5)), corta = t => t.length > 70 ? t.slice(0, 68) + '…' : t;
        const outros = rng.shuffle(S.news.filter(x => x.day !== it.day && x.text !== it.text)).slice(0, 2).map(x => corta(x.text));
        if (outros.length < 2) continue;
        return { titulo: 'as notícias do mundo', texto: `Vamos ler as notícias que os mensageiros trouxeram:<br>${l.map(x => `<small>• Dia ${x.day}: ${esc(x.text)}</small>`).join('<br>')}`, perg: { q: `O que aconteceu no dia ${it.day}?`, ops: [corta(it.text), ...outros] } };
      }
      if (tema === 'historia') {
        const mortos = War.kingdoms().filter(k => k.extinto && S.extintos && S.extintos[k.id]);
        if (mortos.length && ks.length >= 2) {
          const K = rng.pick(mortos);
          return { titulo: 'os reinos que caíram', texto: `Reinos não duram para sempre.<br>${mortos.map(k => `• <b>${esc(k.name)}</b> deixou de existir no dia ${S.extintos[k.id]}.`).join('<br>')}<br><br>Quando um reino perde todas as suas cidades, os vencedores ficam com as terras e o povo passa a obedecer a outro governo.`, perg: { q: 'Qual destes reinos deixou de existir?', ops: [K.short, ...rng.shuffle(ks).slice(0, 2).map(k => k.short)] } };
        }
        const A = (P.antepassados || [])[0];
        if (A && A.feitos.length) {
          const g = A.feitos.filter(t => /guerra|batalha|conquist|reino|exército|paz/i.test(t));
          if (g.length) return { titulo: `as guerras de ${A.nome}`, texto: `O seu antepassado <b>${esc(A.nome)}</b> viveu tempos de guerra:<br>${g.slice(-6).map(x => `• <i>${esc(x)}</i>`).join('<br>')}`, perg: { q: `Quem viveu estas guerras?`, ops: [A.nome, ...rng.shuffle(ks).slice(0, 2).map(k => k.ruler.name)] } };
        }
      }
    }
    return { titulo: 'ler e contar', texto: 'Hoje a turma aprendeu a ler, escrever e fazer contas com moedas. Quem sabe contar não é enganado no mercado!', perg: { q: 'Quanto é 12 moedas mais 9 moedas?', ops: ['21', '19', '23'] } };
  },
  // ---------- coisas de criança ----------
  ajudar() {
    const P = Game.player, O = P.origem;
    if (O.ajudouDia === Game.day) return Game.toast('Você já ajudou em casa hoje.', '#c8c8d8');
    if (!Game.curTown || Game.curTown.id !== O.cidade) return Game.toast(`Seus pais moram em ${O.nomeCidade || 'outra cidade'}.`, '#ffb080');
    O.ajudouDia = Game.day; Academy.passTime(120);
    const g = 4 + Math.floor(Math.random() * 6); P.gold += g; P.addXP(8); Vida.honra(1, 'ajudei os meus pais');
    UI.dialog('Em casa', O.pais[0] && O.pais[0].look, `Você ajudou os seus pais ${O.prof ? `(${O.prof})` : ''} o dia todo. Eles ficaram orgulhosos! <span class="good">+${g} de ouro</span>`, [{ label: 'De nada! 😊' }]);
  },
  brincar() {
    const P = Game.player, E = P.escola || (P.escola = { aulas: 0, acertos: 0, dia: -1 });
    if (E.brincou === Game.day) return Game.toast('Você já brincou bastante hoje!', '#c8c8d8');
    if (!Game.curTown) return Game.toast('As outras crianças estão nas vilas e cidades.', '#ffb080');
    E.brincou = Game.day; Academy.passTime(90);
    const j = ['pega-pega', 'esconde-esconde', 'cavaleiros e dragões', 'pular corda', 'bolinha de gude', 'pião'][Math.floor(Math.random() * 6)];
    P.addXP(6);
    Game.toast(`🤸 Você brincou de ${j} com as crianças da cidade!`, '#a0e0ff');
  },

  // ---------- equipar a família ----------
  equip(id) { const P = Game.player; P.equipFam = P.equipFam || {}; return P.equipFam[id] || (P.equipFam[id] = {}); },
  aplicarLook(L, E) {
    if (!E) return L;
    const b = E.body, h = E.head, o = E.offhand, w = E.weapon;
    if (b) { const d = ITEMS[b.id]; if (d.akind === 'robe') { L.robe = true; L.body = d.color || d.icon.c; } else { L.robe = false; L.body = d.icon.c; L.legs = shade(d.icon.c, -0.35); L.chestplate = d.mat !== 'couro'; delete L.vest; delete L.stripes; delete L.apron; } }
    if (h) { const d = ITEMS[h.id]; delete L.hat; if (d.mat === 'couro') L.hood = d.icon.c; else L.helm = d.icon.c; }
    if (o) L.shield = ITEMS[o.id].icon.c;
    if (w) { const d = ITEMS[w.id]; L.weapon = d.wclass || 'sword'; L.wc = d.icon.c; }
    for (const it of [b, h, o]) if (it && ITEMS[it.id].wlook) for (const [k, v] of Object.entries(ITEMS[it.id].wlook)) if (v !== undefined) L[k] = v;
    return L;
  },
  forca(E) {
    let a = 0, d = 0;
    for (const sl of ['body', 'head', 'offhand']) if (E[sl]) a += ITEMS[E[sl].id].armor || 0;
    if (E.weapon) d = ITEMS[E.weapon.id].dmg || 0;
    return { a, d };
  },
  equipar(m, volta) {
    const P = Game.player, E = this.equip(m.id), L = this.aplicarLook(Object.assign({}, m.r.look || { k: 'hum' }), E);
    const crianca = m.tipo !== 'Cônjuge' && Game.day - (m.r.born || 0) < 15; if (crianca) L.short = 3;
    const ops = [];
    for (const [sl, nm] of [['weapon', 'Arma'], ['body', 'Corpo'], ['head', 'Cabeça'], ['offhand', 'Escudo']]) {
      if (E[sl]) ops.push({ label: `${nm}: ${ITEMS[E[sl].id].name} — tirar`, fn: () => { P.addItem(E[sl], true); delete E[sl]; this.atualizar(m); this.equipar(m, volta); } });
      else ops.push({ label: `${nm}: nada — escolher ▶`, fn: () => this.escolher(m, sl, volta) });
    }
    const F = this.forca(E);
    ops.push({ label: 'Pronto', fn: volta });
    UI.dialog(`🎒 ${m.tipo}: ${m.r.name}`, L, `Dê armas e armaduras da sua mochila.${m.tipo === 'Cônjuge' ? ' Quando lutar ao seu lado, fica mais forte com elas.' : ''}<br><small class="dim">Armadura +${F.a} • Dano +${F.d}</small>`, ops);
  },
  escolher(m, sl, volta) {
    const P = Game.player, l = P.inv.filter(it => ITEMS[it.id] && ITEMS[it.id].slot === sl && (ITEMS[it.id].type === 'weapon' || ITEMS[it.id].type === 'armor') && !Object.values(P.equip).includes(it));
    if (!l.length) { Game.toast('Nada disso na sua mochila.', '#ffb080'); return this.equipar(m, volta); }
    UI.dialog('Escolher', null, 'O que você quer dar?', l.slice(0, 12).map(it => ({ label: `${ITEMS[it.id].name}${ITEMS[it.id].armor ? ` (armadura ${ITEMS[it.id].armor})` : ITEMS[it.id].dmg ? ` (dano ${ITEMS[it.id].dmg})` : ''}`, fn: () => {
      const i = P.inv.indexOf(it); if (i < 0) return;
      let dado = it;
      if (it.n > 1) { it.n--; dado = Object.assign({}, it, { n: 1, u: uid() }); } else P.inv.splice(i, 1);
      this.equip(m.id)[sl] = dado; Sfx.play('equip'); this.atualizar(m); this.equipar(m, volta);
    } })).concat([{ label: 'Voltar', fn: () => this.equipar(m, volta) }]));
  },
  atualizar(m) {
    for (const a of Game.actors) if (a.rid === m.id || (a.kid && a.kid === m.r)) this.vestirAtor(a, m.id);
    for (const a of Game.actors) if (a.isFollower && a.spouse && m.tipo === 'Cônjuge') this.vestirAtor(a, m.id, true);
  },
  vestirAtor(a, id, guerra) {
    const P = Game.player, E = P.equipFam && P.equipFam[id]; if (!E) return;
    a.look = this.aplicarLook(Object.assign({}, a.look), E);
    if (!guerra && !E.weapon) delete a.look.weapon;
    a.S = Sprites.actor(a.look); a.h = a.S.h;
    if (a.look.weapon) { a.wclass = a.look.weapon; a.wimg = Sprites.weapon(a.look.weapon, a.look.wc || '#a0a0a0', '#a060ff'); }
    if (guerra && !a._eqF) {
      const F = this.forca(E); a._eqF = true;
      a.maxHp = Math.round(a.maxHp + F.a * 3); a.hp = a.maxHp; a.dmg += F.d * 0.5;
    }
  },

  // ---------- telas ----------
  html(f) {
    const P = Game.player, a = this.anos(P), fase = this.fase(P);
    const fn = { crianca: 'criança', adulto: 'adulto(a)', velho: 'idoso(a)' }[fase];
    let h = `<h3>Idade e linhagem</h3><div class="quest"><b>🎂 ${a} anos</b> (${fn}) • ${P.geracao || 1}ª geração • 1 ano = ${P.vidaRitmo} dia(s) de jogo <button class="sbtn" ${f(() => { this.ritmo(VIDA_RITMOS[(VIDA_RITMOS.indexOf(P.vidaRitmo) + 1) % VIDA_RITMOS.length]); UI.openMenu('family'); })}>⏳ Mudar o ritmo</button>`;
    if (fase === 'velho') h += `<br><small class="warn">A velhice chegou: a qualquer dia a morte pode vir buscar ${esc(P.name)}.</small>`;
    if (fase === 'crianca') {
      h += `<br><small>Criança: não pode namorar, se alistar nem fundar vila. Vá à escola, ajude os pais e brinque!</small>`;
      const E = P.escola || {};
      h += `<br><button class="sbtn gold" ${f(() => this.escola())}>📚 Ir à escola</button> <small class="dim">Aulas: ${E.aulas || 0} • acertos: ${E.acertos || 0}</small>`;
      if (P.origem && !P.origem.herdeiro) h += ` <button class="sbtn" ${f(() => this.ajudar())}>🧺 Ajudar os pais</button>`;
      h += ` <button class="sbtn" ${f(() => this.brincar())}>🤸 Brincar</button>`;
    }
    if (a >= 45 && (P.children || []).length) h += `<br><button class="sbtn" ${f(() => UI.confirm(`Deixar ${esc(P.name)} descansar e passar tudo para outra pessoa da família?`, () => { UI.close(); P.dead = true; this.sucessao('se aposentou e passou o legado adiante'); }))}>👑 Aposentar e passar o legado</button>`;
    if (P.origem && P.origem.pais) h += `<br><small class="dim">Pais: ${P.origem.pais.map(p => `${esc(p.name)}${p.vivo ? '' : ' ✝'}`).join(' e ')}${P.origem.nomeCidade ? ` • ${esc(P.origem.nomeCidade)}` : ''}${P.irmaos && P.irmaos.length ? ` • irmãos: ${esc(P.irmaos.map(x => x.name).join(', '))}` : ''}</small>`;
    const ant = P.antepassados || [];
    if (ant.length) h += `<br><small class="dim">Antepassados: ${ant.slice().reverse().map(x => `${esc(x.nome)} (${x.idade} anos${x.titulo ? ', ' + esc(x.titulo) : ''})`).join(' ← ')}</small>`;
    const fam = Luto.membros();
    if (fam.length && fase !== 'crianca') h += `<br>${fam.map(m => `<button class="sbtn" ${f(() => this.equipar(m, () => UI.openMenu('family')))}>🎒 Equipar ${esc(m.r.name.split(' ')[0])}</button>`).join(' ')}`;
    return h + '</div>';
  }
};

// ---------------- ganchos ----------------
(function () {
  const tj0 = Player.prototype.toJSON;
  Player.prototype.toJSON = function () {
    const o = tj0.call(this);
    for (const k of ['idade0', 'idadeDia', 'vidaRitmo', 'aniv', 'faseVista', 'antepassados', 'escola', 'origem', 'equipFam', 'geracao', 'irmaos', 'morteVelho']) if (this[k] !== undefined) o[k] = this[k];
    return o;
  };
  const dt0 = Game.dayTick; Game.dayTick = function () { const r = dt0.apply(this, arguments); Geracoes.dia(); return r; };
  const t0 = Reino.tick; Reino.tick = function (dt) { const r = t0.apply(this, arguments); Geracoes.tick(); return r; };
  // criança pequena, idoso de cabelos brancos
  const bl0 = Player.prototype.buildLook;
  Player.prototype.buildLook = function () {
    bl0.call(this);
    if (this.idade0 === undefined || !this.look) return;
    const f = Geracoes.fase(this), L = this.look;
    if (f === 'crianca') { L.short = 3; L.blush = true; delete L.beard; delete L.tall; }
    else if (f === 'velho') { L.old = true; L.hair = '#d8d8d8'; if (L.beard) L.beardC = '#e0e0e0'; }
    else return;
    this.S = Sprites.actor(L); this.h = this.S.h;
  };
  // a força do braço
  const rd0 = Player.prototype.rollDamage;
  Player.prototype.rollDamage = function (kind) { const r = rd0.call(this, kind); if (r && this.idade0 !== undefined) r.dmg *= Geracoes.fatorDano(this); return r; };
  // criança não namora, não se alista e não funda vila
  const romance = /💕|💍|namoro|Flertar|casamento|aumentar a família|romântic/i;
  const dg0 = UI.dialog;
  UI.dialog = function (title, look, text, opts) {
    if (opts && Game.player && Game.started && Geracoes.crianca()) opts = opts.filter(o => !o || !o.label || !romance.test(o.label));
    return dg0.call(this, title, look, text, opts);
  };
  const en0 = War.enlist; War.enlist = function () { if (Geracoes.crianca()) return UI.dialog('Quartel', null, 'Você é muito pequeno(a) para o exército! Volte quando tiver 16 anos.', [{ label: 'Ok 😔' }]); return en0.apply(this, arguments); };
  const fu0 = Vila.fundar; Vila.fundar = function () { if (Geracoes.crianca()) return UI.dialog('Carta de Fundação', null, 'Crianças não podem fundar uma vila. Guarde a carta até os 16 anos!', [{ label: 'Ok' }]); return fu0.apply(this, arguments); };
  // a idade no painel
  const h0 = Vida.hudHTML; Vida.hudHTML = function () { const P = Game.player; return h0.call(this) + (P ? `<span class="need" title="idade" style="width:auto;padding:0 3px"><b>🎂</b>${Geracoes.anos(P)}</span>` : ''); };
  // a aba da família
  const ft0 = UI.familyTab; UI.familyTab = function (f) { return Geracoes.html(f) + ft0.call(this, f); };
  // ao morrer em combate também dá para continuar a linhagem
  const de0 = UI.death;
  UI.death = function () {
    const r = de0.apply(this, arguments);
    const box = this.current && this.current.el && this.current.el.querySelector('.death');
    if (box) {
      const b = document.createElement('button'); b.className = 'mbtn'; b.textContent = '✝ Aceitar a morte e continuar a linhagem';
      b.onclick = () => { UI.close(); Geracoes.sucessao('caiu em combate'); };
      box.appendChild(b);
    }
    return r;
  };
  // a família aparece em casa com o que você deu
  const si0 = Game.spawnInteriorNPCs;
  Game.spawnInteriorNPCs = function (L) {
    const r = si0.apply(this, arguments);
    const P = this.player; if (P && P.equipFam) for (const a of this.actors) if (a.family && (a.rid || a.kid)) Geracoes.vestirAtor(a, a.rid || a.kid.id);
    return r;
  };
  // o cônjuge que luta ao seu lado usa as armas e armaduras
  const sf0 = Game.spawnFollower;
  Game.spawnFollower = function () {
    const r = sf0.apply(this, arguments);
    const P = this.player; if (P && P.spouse && P.equipFam && P.equipFam[P.spouse]) for (const a of this.actors) if (a.isFollower && a.spouse && !a.dead) Geracoes.vestirAtor(a, P.spouse, true);
    return r;
  };
})();
