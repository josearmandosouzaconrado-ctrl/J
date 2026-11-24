'use strict';
// =====================================================================
//  INFÂNCIA EM CASA — quem nasce de novo começa dentro da casa da família
//  Ao "nascer de novo como um bebê", a criança ganha uma casa de verdade
//  na cidade onde nasceu e começa lá dentro, com o pai e a mãe (e os
//  irmãos, se tiver). Sempre que entrar nessa casa, a família está lá: de
//  dia o pai sai para trabalhar. Dá para conversar, ajudar em casa, jantar
//  em família, dormir na sua cama, pedir mesada e dar um abraço.
//  Saves de quem já tinha renascido ganham a casa também.
// =====================================================================
const Infancia = {
  O() { const P = Game.player; return P && P.origem && !P.origem.herdeiro && P.origem.pais ? P.origem : null; },
  cidade() { const O = this.O(); return O && Game.world && Game.world.settlements.find(s => s.id === O.cidade); },
  sobrenome() { const p = (Game.player.name || '').split(' '); return p.length > 1 ? p[p.length - 1] : p[0]; },
  // a casa da família (escolhida uma vez e guardada no save)
  casaB() {
    const O = this.O(), s = this.cidade(); if (!O || !s) return null;
    if (!O.casa) {
      const L = s.buildings.filter(b => b.role === 'house' && b.door && !b.decorative).sort((a, b) => (b.kind === 'house2') - (a.kind === 'house2') || a.tx - b.tx || a.ty - b.ty);
      if (!L.length) return null;
      const b = L[hashStr(Game.player.name + O.cidade) % Math.min(L.length, 4)];
      O.casa = { x: b.door.x, y: b.door.y };
    }
    const b = s.buildings.find(b => b.door && b.door.x === O.casa.x && b.door.y === O.casa.y) || null;
    if (b && !b._familia) { b._familia = true; b.name = 'Casa da família ' + this.sobrenome(); delete b._res; }
    return b;
  },
  ehCasa(b) { if (!b || !this.O()) return false; const c = this.casaB(); return !!c && c === b; },
  emCasa() { const L = Game.level; return !!(L && L.b && this.ehCasa(L.b)); },
  // quem está em casa agora (de dia o pai está no trabalho)
  moradores(b) {
    const O = this.O(), P = Game.player, h = (Game.time / 60) % 24, trab = h >= 8 && h < 17, L = [];
    O.pais.forEach((p, i) => {
      if (!p.vivo || (trab && i === 0 && O.pais.length > 1)) return;
      L.push({ id: 'familia:' + i, name: p.name, race: P.race, sex: i === 0 ? 'm' : 'f', child: false, look: p.look, home: O.nomeCidade, familia: i === 0 ? 'pai' : 'mae', pessoa: p });
    });
    (P.irmaos || []).forEach((x, j) => L.push({ id: 'familia:irmao' + j, name: x.name, race: P.race, sex: x.sex || 'm', child: true, look: x.look, home: O.nomeCidade, familia: 'irmao' }));
    return L;
  },
  crianca() { return Geracoes.crianca(); },
  filhoA() { return (Game.player.app && Game.player.app.sex) === 'f' ? 'filha' : 'filho'; },
  hoje(k) { const O = this.O(); O.feito = O.feito || {}; if (O.feito[k] === Game.day) return true; O.feito[k] = Game.day; return false; },
  // ---------- conversar com a família ----------
  falar(a) {
    const rs = a.res, P = Game.player, O = this.O(), h = (Game.time / 60) % 24;
    if (rs.familia === 'irmao') {
      return UI.dialog(a.name, a.look, `*${a.name.split(' ')[0]} vem correndo* Vamos brincar?`, [
        { label: '🤸 Brincar juntos', cls: 'gold', fn: () => { if (this.hoje('brincouIrmao')) { UI.close(); return Game.toast('Vocês já brincaram bastante hoje.', '#c8c8d8'); } Academy.passTime(60); P.addXP(5); UI.close(); Game.toast(`🤸 Você brincou de ${['esconde-esconde', 'pega-pega', 'cavaleiros e dragões', 'casinha', 'bolinha de gude'][Math.floor(Math.random() * 5)]} com ${a.name.split(' ')[0]}!`, '#a0e0ff'); } },
        { label: 'Tchau' }
      ]);
    }
    const mae = rs.familia === 'mae', nome = mae ? 'Mãe' : 'Pai', fa = this.filhoA();
    const ola = this.crianca() ? (h < 11 ? `Bom dia, meu ${fa === 'filha' ? 'amor' : 'querido'}! Já tomou café?` : h < 18 ? 'Voltou da rua? Lave as mãos!' : 'Já está tarde... hora de jantar e ir para a cama.') : `Que bom te ver, ${fa}! Você cresceu tanto...`;
    const ops = [];
    ops.push({ label: '🧺 Ajudar em casa', fn: () => this.ajudar(a) });
    ops.push({ label: '🍲 Jantar em família', fn: () => this.jantar(a) });
    ops.push({ label: '😴 Dormir na minha cama', fn: () => { UI.close(); UI.rest(Game.level.b, 0); } });
    if (this.crianca()) ops.push({ label: '💰 Pedir uma mesada', fn: () => this.mesada(a) });
    ops.push({ label: '🤗 Dar um abraço', fn: () => { const ja = this.hoje('abraco' + rs.familia); UI.dialog(nome, a.look, ja ? '*abraça você de novo* Hoje você está carinhoso(a), hein?' : `*abraça você bem apertado* Eu te amo, ${fa}.`, [{ label: '❤', fn: () => UI.close() }]); if (!ja) { Vida.honra(1, 'abracei a minha família'); P.hp = Math.min(P.stat.maxHp, P.hp + P.stat.maxHp * 0.15); } } });
    ops.push({ label: '💬 Pedir um conselho', fn: () => this.conselho(a) });
    ops.push({ label: 'Tchau' });
    UI.dialog(`${nome} — ${a.name}`, a.look, `<i>"${esc(ola)}"</i>${O.prof ? `<br><small class="dim">Sua família é de ${esc(O.prof)}.</small>` : ''}`, ops);
  },
  ajudar(a) {
    const P = Game.player, O = this.O();
    if (this.hoje('ajudou')) return UI.dialog(a.name, a.look, 'Você já ajudou bastante hoje. Vá brincar um pouco!', [{ label: 'Tá bom', fn: () => UI.close() }]);
    O.ajudouDia = Game.day;
    const tarefas = { fazendeiros: 'tirar o mato da horta e dar milho às galinhas', ferreiros: 'puxar o fole da forja e separar os pregos', pescadores: 'remendar as redes e limpar os peixes', mercadores: 'arrumar a mercadoria e contar as moedas', 'tecelões': 'enrolar a lã e separar as linhas', padeiros: 'sovar a massa e buscar lenha para o forno', lenhadores: 'empilhar a lenha e afiar os machados', pastores: 'levar as ovelhas para beber água' };
    const t = tarefas[O.prof] || 'varrer a casa e buscar água no poço';
    Academy.passTime(120);
    const g = 4 + Math.floor(Math.random() * 6); P.gold += g; P.addXP(8); Vida.honra(1, 'ajudei os meus pais');
    UI.dialog(a.name, a.look, `Você passou a manhã ajudando a ${t}. <i>"Obrigado(a), ${this.filhoA()}! Toma uns trocados."</i> <span class="good">+${g} de ouro</span>`, [{ label: 'De nada! 😊', fn: () => UI.close() }]);
  },
  jantar(a) {
    const P = Game.player;
    if (this.hoje('jantou')) return UI.dialog(a.name, a.look, 'Já comemos hoje! Se estiver com fome, tem pão na despensa.', [{ label: 'Ok', fn: () => UI.close() }]);
    Academy.passTime(60);
    if (P.needs) { P.needs.fome = 100; P.needs.sede = 100; }
    P.hp = P.stat.maxHp; P.st = P.stat.maxSt;
    const prato = ['sopa de legumes com pão quente', 'ensopado de carne com batatas', 'peixe assado com ervas', 'mingau de aveia com mel', 'torta de frango'][Math.floor(Math.random() * 5)];
    UI.dialog('Jantar em família', a.look, `A família inteira sentou à mesa para comer ${prato}. Todo mundo contou como foi o dia.<br><span class="good">Fome e sede cheias, vida e vigor recuperados.</span>`, [{ label: '😋 Estava uma delícia!', fn: () => UI.close() }]);
  },
  mesada(a) {
    const P = Game.player, O = this.O();
    if (O.mesadaDia && Game.day - O.mesadaDia < 3) return UI.dialog(a.name, a.look, `Mesada só a cada três dias! A próxima é no dia ${O.mesadaDia + 3}.`, [{ label: 'Ah...', fn: () => UI.close() }]);
    O.mesadaDia = Game.day; const g = 10 + Math.floor(Math.random() * 11); P.gold += g; Sfx.play('coin');
    UI.dialog(a.name, a.look, `*tira umas moedas do bolso* Toma, mas não gaste tudo em doce! <span class="good">+${g} de ouro</span>`, [{ label: 'Obrigado(a)!', fn: () => UI.close() }]);
  },
  conselho(a) {
    const P = Game.player, idade = Geracoes.anos();
    const L = idade < 16 ? ['A escola abre de manhã, das 7h às 16h. Quem estuda se forma aos 16 e vai longe!', 'Brinque com as outras crianças da cidade, mas volte antes de escurecer.', 'Quando fizer 16 anos, você vai poder trabalhar, se alistar no exército e até fundar a sua própria vila.', 'Ajude em casa e guarde as moedas da mesada: um dia você compra a sua primeira espada.', 'Não chegue perto das masmorras! Lá dentro tem monstros de verdade.']
      : ['Seja honesto(a). O nome da família vale mais do que ouro.', 'Se for para a guerra, volte vivo(a). Promete?', 'Arrume alguém que te faça feliz e venha nos visitar com os netos.', 'O mundo é grande, mas a porta desta casa está sempre aberta para você.'];
    UI.dialog(a.name, a.look, `<i>"${esc(L[Math.floor(Math.random() * L.length)])}"</i>`, [{ label: 'Vou lembrar', fn: () => this.falar(a) }]);
  },
  // ---------- começar a vida dentro de casa ----------
  comecarEmCasa() {
    const b = this.casaB(); if (!b) return false;
    Game.time = Math.max(Game.time, 7 * 60);   // acorda de manhã
    Game.enterInterior(b);
    const L = Game.level, mae = Game.actors.find(a => a.res && a.res.familia === 'mae') || Game.actors.find(a => a.res && a.res.familia);
    if (mae) { const P = Game.player; P.x = mae.x + 20; P.y = mae.y + 6; Game.findFree(P); }
    Game.toast('🏠 Casa da sua família', '#ffe8a0');
    return L && L.b === b;
  },
  // aviso perto da porta, para achar a casa de volta
  tT: 0, avisou: null,
  tick(dt) {
    const G = Game, P = G.player; if (!P || G.level !== G.world || !this.O()) return;
    this.tT -= dt; if (this.tT > 0) return; this.tT = 1.5;
    const b = this.casaB(); if (!b) return;
    const d = dist(P.x, P.y, b.door.x * 16 + 8, b.door.y * 16 + 8);
    if (d < 16 * 7 && this.avisou !== G.day) { this.avisou = G.day; G.toast('🏠 Aqui é a casa da sua família', '#ffe8a0'); }
  }
};
(function () {
  // a família mora na casa
  const r0 = Game.residentsOf;
  Game.residentsOf = function (b) { try { if (Infancia.ehCasa(b)) return Infancia.moradores(b); } catch (e) { } return r0.apply(this, arguments); };
  // conversar com os pais e irmãos
  const t0 = UI.talkNPC;
  UI.talkNPC = function (a) { if (a && a.res && a.res.familia) return Infancia.falar(a); return t0.apply(this, arguments); };
  // a cama de casa é sua
  const d0 = Camas.dono;
  Camas.dono = function (L) { if (L && L.b && Infancia.ehCasa(L.b)) return 'meu'; return d0.apply(this, arguments); };
  // vizinhos da rotina não entram na casa da família
  if (typeof Rotina !== 'undefined' && Rotina.quemEstaEm) { const q0 = Rotina.quemEstaEm; Rotina.quemEstaEm = function (b) { if (Infancia.ehCasa(b)) return []; return q0.apply(this, arguments); }; }
  // "Ajudar os pais" na aba Família também vale dentro de casa
  const aj0 = Geracoes.ajudar;
  Geracoes.ajudar = function () { if (Infancia.emCasa()) { const a = Game.actors.find(x => x.res && (x.res.familia === 'mae' || x.res.familia === 'pai')); if (a) return Infancia.ajudar(a); } return aj0.apply(this, arguments); };
  // quem nasce de novo começa dentro de casa, com os pais
  const rc0 = Geracoes.recomecar;
  Geracoes.recomecar = function (N, s) { const r = rc0.apply(this, arguments); try { if (Infancia.O()) Infancia.comecarEmCasa(); } catch (e) { console.warn('Infância', e); } return r; };
  const it0 = Inverno.tick.bind(Inverno);
  Inverno.tick = function (dt) { it0(dt); try { Infancia.tick(dt); } catch (e) { } };
})();
