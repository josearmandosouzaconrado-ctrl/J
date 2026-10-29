'use strict';
// ===================== MISSÕES DE MUNDO ABERTO: ESCOLHAS E CONSEQUÊNCIAS =====================
// Pela estrada acontecem coisas: um viajante ferido, um comerciante cercado, uma criança perdida...
// O que você escolhe muda a sua honra, e muitas escolhas voltam depois (favores, caçadores, vingança).
const EVENTOS = {
  ferido: { titulo: 'Viajante ferido', aviso: 'Alguém geme de dor perto da estrada...' },
  comerciante: { titulo: 'Comerciante atacado', aviso: 'Gritos! Um comerciante está sendo atacado!' },
  crianca: { titulo: 'Criança perdida', aviso: 'Você ouve uma criança chorando...' },
  mendigo: { titulo: 'Andarilho faminto', aviso: 'Um andarilho acena para você.' },
  ladrao: { titulo: 'Pega ladrão!', aviso: '"Socorro! Ele roubou a minha bolsa!"' },
  duelista: { titulo: 'O duelista', aviso: 'Um guerreiro bloqueia o caminho.' },
  convite: { titulo: 'Convite suspeito', aviso: 'Uns sujeitos mal-encarados chamam você.' },
  animal: { titulo: 'Animal ferido', aviso: 'Um animal ferido está caído no chão.' }
};
const Eventos = {
  cur: null, t: 60,
  state() { const P = Game.player; if (!P.eventos) P.eventos = { feitos: 0, procurado: 0, cacT: 0 }; return P.eventos; },
  pseudo() { const R = Game.regionAtPlayer(); return { id: 'estrada', name: 'Estrada', type: 'village', region: R, npcSpots: [], gates: [], buildings: [], mid: { x: 0, y: 0 } }; },
  // posição livre a uma certa distância do jogador, fora de cidades e da água
  lugar(d0, d1) {
    const G = Game, P = G.player, W = G.world;
    for (let k = 0; k < 30; k++) {
      const a = Math.random() * Math.PI * 2, d = d0 + Math.random() * (d1 - d0), x = P.x + Math.cos(a) * d, y = P.y + Math.sin(a) * d;
      const tx = Math.floor(x / 16), ty = Math.floor(y / 16);
      if (!W.isLand(tx, ty) || W.settlementAt(tx, ty) || TWATER[W.tileAt(tx, ty)] || collides(W, x, y, 5)) continue;
      return { x, y };
    }
    return null;
  },
  npc(x, y, extra) {
    const rng = new RNG((Date.now() & 0xffffff) + Math.floor(Math.random() * 1e6));
    const a = new NPC({ role: 'quest', x: 0, y: 0 }, this.pseudo(), rng);
    a.x = x; a.y = y; a.home = { x, y }; a.evento = true; a.rid = 'ev:' + a.name;
    if (extra && extra.kid) { a.look = Object.assign({}, a.look, { short: 3, blush: true }); delete a.look.beard; a.name = a.name.split(' ')[0]; }
    if (extra && extra.look) a.look = Object.assign({}, a.look, extra.look);
    if (extra && extra.raw) a.look = extra.raw;
    a.S = Sprites.actor(a.look); a.h = a.S.h;
    Game.findFree(a); Game.actors.push(a);
    return a;
  },
  mob(id, x, y, opts) {
    const P = Game.player, m = new Monster(id, x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, Math.max(1, P.level + ((opts && opts.dl) || 0)), opts);
    m.evento = true; Game.findFree(m); Game.actors.push(m);
    return m;
  },
  // ---------- ciclo ----------
  tick(dt) {
    const G = Game, P = G.player;
    if (!G.started || !P || G.intro) return;
    if (!G.level.isWorld) { if (this.cur) this.cancel(); return; }
    const st = this.state();
    if (this.cur) return this.update(dt);
    // consequências: favores pagos quando você chega numa cidade
    this.favorT = (this.favorT || 0) - dt;
    if (this.favorT <= 0) { this.favorT = 2; this.cobrarFavor(); }
    // caçadores de recompensa atrás de quem tem a cabeça a prêmio
    if (st.procurado > 0 || (P.honra || 0) <= -30) {
      st.cacT = (st.cacT || 240) - dt;
      if (st.cacT <= 0) { st.cacT = 260 + Math.random() * 200; if (!this.naCidade()) this.cacadores(); }
    }
    this.t -= dt;
    if (this.t > 0) return;
    this.t = 80 + Math.random() * 90;
    if (UI.current || this.naCidade() || P.mounted || G.level.isShip) return;
    const R = G.regionAtPlayer(); if (!R || R.hostile || RACES[CULTURES[R.culture].race].npcOnly && CULTURES[R.culture].race === 'nyxar') return;
    if (G.actors.some(a => a.team === 'enemy' && !a.dead && dist(a.x, a.y, P.x, P.y) < 260)) return;
    const ks = Object.keys(EVENTOS);
    this.start(ks[Math.floor(Math.random() * ks.length)]);
  },
  naCidade() { const P = Game.player; return !!Game.world.settlementAt(Math.floor(P.x / 16), Math.floor(P.y / 16)); },
  start(kind) {
    const G = Game, pos = this.lugar(150, 230); if (!pos) return false;
    const E = { kind, x: pos.x, y: pos.y, t: 300, npcs: [], mobs: [], fase: 0 };
    switch (kind) {
      case 'ferido': E.npcs.push(this.npc(pos.x, pos.y, { look: { body: '#7a5a4a' } })); break;
      case 'comerciante': {
        E.npcs.push(this.npc(pos.x, pos.y, { look: { body: '#a06a30', robe: false } }));
        for (let i = 0; i < 3; i++) E.mobs.push(this.mob(i === 2 ? 'bandido_arqueiro' : 'bandido', pos.x + 24, pos.y, { dl: -1 }));
        break;
      }
      case 'crianca': E.npcs.push(this.npc(pos.x, pos.y, { kid: true })); break;
      case 'mendigo': E.npcs.push(this.npc(pos.x, pos.y, { look: { body: '#6a5a4a', hood: '#5a4a3a', robe: true } })); break;
      case 'ladrao': {
        E.npcs.push(this.npc(pos.x, pos.y, { look: { robe: true, hair: '#d0d0d0' } }));
        const m = this.mob('bandido', pos.x + 40, pos.y + 10, { name: 'Ladrão de Bolsas', dl: -2, hpMul: 0.7 }); m.ladrao = true; E.mobs.push(m);
        break;
      }
      case 'duelista': E.npcs.push(this.npc(pos.x, pos.y, { look: { body: '#7a2a2a', cape: '#3a1a1a', weapon: 'sword' } })); break;
      case 'convite': for (let i = 0; i < 3; i++) E.npcs.push(this.npc(pos.x + i * 14 - 14, pos.y, { look: { body: '#5a4a3a', hood: '#3a3a30' } })); break;
      case 'animal': {
        const lobo = Math.random() < 0.5, a = this.npc(pos.x, pos.y, { raw: ENEMIES[lobo ? 'lobo' : 'cervo'].look });
        a.name = lobo ? 'Lobo ferido' : 'Cervo ferido'; a.animalEv = true; E.npcs.push(a);
        break;
      }
    }
    for (const a of E.npcs) a.evE = E;
    this.cur = E;
    G.toast(EVENTOS[kind].aviso, '#ffe0a0'); Sfx.play('quest');
    return true;
  },
  cancel() {
    const E = this.cur; if (!E) return;
    for (const a of E.npcs.concat(E.mobs)) if (!a.dead && !a.isFollower) { a.dead = true; a.deadT = 10; }
    this.cur = null;
  },
  fim(msg, cor) { const E = this.cur; if (!E) return; this.state().feitos++; E.done = true; E.t = Math.min(E.t, 30); if (msg) Game.chron(msg); void cor; },
  update(dt) {
    const G = Game, P = G.player, E = this.cur;
    E.t -= dt;
    const far = dist(P.x, P.y, E.x, E.y) > 900;
    if (E.t <= 0 || far) { this.cancel(); return; }
    if (E.done) return;
    if (E.kind === 'comerciante' && !E.fase && E.mobs.every(m => m.dead)) { E.fase = 1; G.toast('Os bandidos fugiram! Fale com o comerciante.', '#a0ffa0'); }
    if (E.kind === 'ladrao') {
      const m = E.mobs[0];
      if (!E.fase && m.dead) { E.fase = 1; G.toast('Você pegou a bolsa roubada. O que vai fazer com ela?', '#ffe0a0'); P.addItem(Items.make('bolsa_roubada'), true); }
      if (!m.dead && !m.target && !E.fase) { const a = angleTo(P.x, P.y, m.x, m.y); moveActor(m, Math.cos(a) * m.spd * 0.9 * dt, Math.sin(a) * m.spd * 0.9 * dt); m.moving = true; m.setDir(a); }
    }
    if (E.kind === 'duelista' && E.fase === 1 && E.mobs[0] && E.mobs[0].dead) {
      E.fase = 2; P.gold += 150 + P.level * 10; Vida.honra(6, 'venci um duelo justo');
      G.centerMsg('DUELO VENCIDO', `+${150 + P.level * 10} de ouro`); this.fim('Venci um duelista na estrada.');
    }
    if (E.kind === 'convite' && E.fase === 2 && E.mobs.every(m => m.dead)) { E.fase = 3; Vida.honra(6, 'enfrentei bandidos que planejavam um assalto'); this.fim('Acabei com um bando de assaltantes.'); }
    // criança perdida: segue você até a cidade mais próxima
    if (E.kind === 'crianca' && E.fase === 1) {
      const k = E.npcs[0], d = dist(k.x, k.y, P.x, P.y);
      E.t = Math.max(E.t, 60);
      if (d > 24) { const a = angleTo(k.x, k.y, P.x, P.y), sp = Math.min(P.stat.speed * 1.05, d * 2); moveActor(k, Math.cos(a) * sp * dt, Math.sin(a) * sp * dt); k.moving = true; k.anim += dt; k.setDir(a); }
      if (d > 500) { k.x = P.x - 12; k.y = P.y + 6; }
      if (this.naCidade()) {
        E.fase = 2; const ouro = 60 + P.level * 8; P.gold += ouro; Sfx.play('quest');
        Vida.honra(12, `levei ${k.name} de volta para casa`);
        UI.dialog(k.name, k.look, `Mamãe! Papai! 😭<br><br>Os pais de ${esc(k.name)} correm para abraçá-la e não param de agradecer.<br><span class="good">+${ouro} de ouro</span>`, [{ label: 'De nada!' }]);
        this.fim(`Levei ${k.name}, uma criança perdida, de volta para casa.`);
        k.wp = null; k.role = 'citizen'; k.home = { x: k.x, y: k.y };
      }
    }
  },
  // ---------- conversas dos eventos ----------
  talk(a) {
    const G = Game, P = G.player, E = a.evE;
    if (!E || E !== this.cur || E.done) return UI.dialog(a.name, a.look, 'Obrigado(a) mais uma vez. Que os deuses guiem seus passos.', [{ label: 'Tchau' }]);
    a.talkT = 2;
    const fecha = { label: 'Ir embora' };
    switch (E.kind) {
      case 'ferido': {
        const pot = P.inv.find(i => ITEMS[i.id].use && ITEMS[i.id].use.heal && ITEMS[i.id].type === 'potion'), food = P.inv.find(i => ITEMS[i.id].type === 'food' && ITEMS[i.id].use.heal);
        const o = [];
        if (pot) o.push({ label: `Dar ${ITEMS[pot.id].name}`, cls: 'gold', fn: () => { P.removeInst(pot, 1); this.ajudouFerido(a, 10); } });
        if (food) o.push({ label: `Dar ${ITEMS[food.id].name}`, fn: () => { P.removeInst(food, 1); this.ajudouFerido(a, 6); } });
        if (P.spells.includes('cura') || P.spells.includes('cura_maior')) o.push({ label: 'Curar com magia ✨', fn: () => { Juice.heal(a.x, a.y, '#80ff90'); this.ajudouFerido(a, 10); } });
        o.push({ label: 'Revistar os bolsos dele(a)', cls: 'danger', fn: () => { const g = 20 + Math.floor(Math.random() * 40); P.gold += g; Vida.honra(-15, 'roubei um viajante ferido'); UI.dialog(a.name, a.look, `Você pega ${g} de ouro enquanto ${esc(a.name)} geme sem forças.<br><span class="bad">Alguém pode ter visto...</span>`, [{ label: 'Sair' }]); if (Math.random() < 0.5) this.state().procurado++; this.fim('Roubei um viajante ferido.'); } });
        o.push(fecha);
        return UI.dialog(a.name, a.look, 'Ai... fui atacado por lobos... estou sangrando muito. Por favor, você tem alguma coisa?', o);
      }
      case 'comerciante': {
        if (!E.fase) return UI.dialog(a.name, a.look, 'Socorro!! Me livre desses bandidos!', [{ label: 'Deixa comigo!' }]);
        const g = 80 + P.level * 10;
        return UI.dialog(a.name, a.look, `Você salvou a minha vida e a minha mercadoria! Aceite a minha recompensa.`, [
          { label: `Aceitar ${g} de ouro`, cls: 'gold', fn: () => { P.gold += g; Vida.honra(8, 'salvei um comerciante'); this.favor('comerciante', a.name); UI.dialog(a.name, a.look, 'Vou contar a todos sobre você! Se passar na minha loja, tem desconto.', [{ label: 'Tchau' }]); this.fim(`Salvei o comerciante ${a.name} de bandidos.`); } },
          { label: 'Recusar: foi uma honra ajudar', fn: () => { Vida.honra(14, 'ajudei sem pedir nada em troca'); this.favor('comerciante', a.name); P.addItem(Items.make('pocao_vida_m', 2)); UI.dialog(a.name, a.look, 'Que nobreza! Ao menos leve estas poções. Não vou esquecer de você.', [{ label: 'Tchau' }]); this.fim(`Salvei o comerciante ${a.name} e recusei a recompensa.`); } },
          { label: 'Exigir o dobro', cls: 'danger', fn: () => { P.gold += g * 2; Vida.honra(-6, 'extorqui um comerciante que salvei'); UI.dialog(a.name, a.look, 'Tome... é quase tudo que eu tenho. Você não é muito melhor que eles.', [{ label: 'Sair' }]); this.fim(`Cobrei caro do comerciante ${a.name}.`); } }
        ]);
      }
      case 'crianca': {
        if (E.fase === 1) return UI.dialog(a.name, a.look, 'Tô com medo... a gente já tá chegando?', [{ label: 'Quase lá, fique perto de mim.' }]);
        return UI.dialog(a.name, a.look, 'Buáá... eu me perdi da minha família... você me leva pra cidade?', [
          { label: 'Venha comigo, eu te levo.', cls: 'gold', fn: () => { E.fase = 1; a.role = 'evento'; UI.close(); G.toast(`${a.name} vai seguir você. Leve-a até uma cidade ou vila.`, '#a0ffa0'); } },
          { label: 'Ensinar o caminho', fn: () => { Vida.honra(2, 'ensinei o caminho para uma criança perdida'); UI.dialog(a.name, a.look, 'Tá bom... obrigado...', [{ label: 'Tchau' }]); this.fim(); a.wp = { x: a.x + 300, y: a.y, t: 20 }; a.role = 'citizen'; } },
          { label: 'Ignorar', cls: 'danger', fn: () => { Vida.honra(-5, 'abandonei uma criança perdida'); UI.close(); this.fim(); } }
        ]);
      }
      case 'mendigo': {
        const o = [];
        if (P.gold >= 10) o.push({ label: 'Dar 10 de ouro', fn: () => { P.gold -= 10; Vida.honra(3, 'ajudei um andarilho'); this.mendigo(a, false); } });
        if (P.gold >= 60) o.push({ label: 'Dar 60 de ouro', cls: 'gold', fn: () => { P.gold -= 60; Vida.honra(7, 'fui generoso(a) com um andarilho'); this.mendigo(a, true); } });
        const f = P.inv.find(i => ITEMS[i.id].type === 'food');
        if (f) o.push({ label: `Dar ${ITEMS[f.id].name}`, fn: () => { P.removeInst(f, 1); Vida.honra(4, 'dei comida a um andarilho'); this.mendigo(a, Math.random() < 0.5); } });
        o.push({ label: 'Zombar dele', cls: 'danger', fn: () => { Vida.honra(-4, 'humilhei um andarilho'); UI.dialog(a.name, a.look, '...que os deuses tenham piedade de você.', [{ label: 'Sair' }]); this.fim(); } });
        o.push(fecha);
        return UI.dialog(a.name, a.look, 'Uma moeda, viajante? Faz dois dias que não como nada...', o);
      }
      case 'ladrao': {
        const b = P.inv.find(i => i.id === 'bolsa_roubada');
        if (!b) return UI.dialog(a.name, a.look, 'Ele foi por ali! Pegue aquele ladrão, por favor!', [{ label: 'Vou atrás dele!' }]);
        return UI.dialog(a.name, a.look, 'Você pegou ele?! Essa é a minha bolsa! Tem todas as minhas economias...', [
          { label: 'Devolver a bolsa', cls: 'gold', fn: () => { P.removeInst(b, 1); const g = 25 + P.level * 3; P.gold += g; Vida.honra(10, 'devolvi uma bolsa roubada'); this.favor('senhora', a.name); UI.dialog(a.name, a.look, `Obrigada, obrigada! Tome ${g} de ouro, é o que posso dar.`, [{ label: 'De nada' }]); this.fim('Devolvi a bolsa de uma senhora roubada.'); } },
          { label: 'Ficar com a bolsa', cls: 'danger', fn: () => { P.removeInst(b, 1); P.gold += 120; Vida.honra(-12, 'fiquei com a bolsa de uma senhora'); UI.dialog(a.name, a.look, 'O quê?! Você é igualzinho a ele! Guardas!!', [{ label: 'Sair' }]); this.state().procurado++; this.fim('Fiquei com a bolsa roubada (+120 de ouro).'); } }
        ]);
      }
      case 'duelista': {
        if (E.fase) return;
        return UI.dialog(a.name, a.look, 'Dizem que você é forte. Eu sou o melhor espadachim desta região. Um duelo justo, até alguém cair. Aceita?', [
          { label: 'Aceitar o duelo ⚔', cls: 'gold', fn: () => {
            UI.close(); E.fase = 1; sumir(a);
            const m = this.mob('bandido', a.x, a.y, { name: a.name + ' (duelista)', look: a.look.k === 'hum' ? Object.assign({}, a.look, { weapon: 'sword', wc: '#e0e0f0' }) : undefined, hpMul: 3, dmgMul: 1.2, dl: 1 });
            m.x = a.x; m.y = a.y; m.target = P; m.aggro = 400; m.duelista = true; E.mobs.push(m); G.centerMsg('DUELO!', 'Que vença o melhor.');
          } },
          { label: 'Recusar com respeito', fn: () => { UI.dialog(a.name, a.look, 'Hm. Uma pena. Talvez outro dia.', [{ label: 'Tchau' }]); this.fim(); } },
          { label: 'Chamar de covarde', cls: 'danger', fn: () => { Vida.honra(-2, 'insultei um duelista'); UI.dialog(a.name, a.look, 'Covarde?! Eu vou lembrar do seu rosto.', [{ label: 'Sair' }]); this.fim(); } }
        ]);
      }
      case 'convite': {
        if (E.fase) return;
        return UI.dialog(a.name, a.look, 'Psst... uma caravana rica passa por aqui hoje à noite. Com você no bando a gente rende os guardas fácil. Metade do saque é seu. Topa?', [
          { label: 'Topar o assalto 💰', cls: 'danger', fn: () => { const g = 150 + P.level * 15; P.gold += g; Vida.honra(-20, 'participei do assalto a uma caravana'); this.state().procurado += 2; UI.fade(); G.centerMsg('A CARAVANA FOI ROUBADA', `+${g} de ouro • a sua cabeça agora tem um preço`); this.fim('Ajudei bandidos a roubar uma caravana.'); for (const n of E.npcs) sumir(n); } },
          { label: 'Recusar', fn: () => { UI.dialog(a.name, a.look, 'Tá bom, tá bom. Você não viu a gente aqui, entendeu?', [{ label: 'Sair' }]); this.fim(); } },
          { label: 'Prender os bandidos ⚔', cls: 'gold', fn: () => {
            UI.close(); E.fase = 2;
            for (const n of E.npcs) { const m = this.mob(Math.random() < 0.3 ? 'bandido_arqueiro' : 'bandido', n.x, n.y, { look: n.look.k === 'hum' ? Object.assign({}, n.look, { weapon: 'sword', wc: '#a0a0a0' }) : undefined }); m.x = n.x; m.y = n.y; m.target = P; m.aggro = 300; E.mobs.push(m); sumir(n); }
            G.toast('Os bandidos sacam as armas!', '#ff9080');
          } }
        ]);
      }
      case 'animal': {
        const f = P.inv.find(i => ITEMS[i.id].type === 'food' || /erva|cogumelo/.test(i.id));
        const o = [];
        if (f) o.push({ label: `Cuidar dele (usar ${ITEMS[f.id].name})`, cls: 'gold', fn: () => {
          P.removeInst(f, 1); Vida.honra(4, 'cuidei de um animal ferido'); Sfx.play('learn');
          for (let i = 0; i < 10; i++) G.particle(a.x + (Math.random() - 0.5) * 10, a.y - 6, (Math.random() - 0.5) * 20, -20 - Math.random() * 20, '#80ff90', 0.8, 1, -10);
          UI.dialog(a.name, null, 'O animal lambe a sua mão, se levanta devagar e volta para a floresta. Você se sente bem.', [{ label: 'Tchau, amiguinho' }]);
          P.addBuff('regen', 2, 300, 'Coração leve'); a.role = 'citizen'; a.wp = { x: a.x + (Math.random() - 0.5) * 400, y: a.y + (Math.random() - 0.5) * 400, t: 12 }; this.fim('Cuidei de um animal ferido.');
        } });
        o.push({ label: 'Acabar com o sofrimento dele', fn: () => { sumir(a); G.burst(a.x, a.y - 4, '#a02020', 8, 30); P.addItem(Items.make('carne_crua', 1)); UI.close(); this.fim(); } });
        o.push(fecha);
        return UI.dialog('Animal ferido', null, 'Ele está muito machucado e mal consegue se mexer.', o);
      }
    }
  },
  ajudouFerido(a, h) {
    Vida.honra(h, 'ajudei um viajante ferido'); Sfx.play('learn'); this.favor('ferido', a.name);
    UI.dialog(a.name, a.look, 'Obrigado(a)... você salvou a minha vida. Eu vou retribuir, juro pelos deuses.', [{ label: 'Descanse' }]);
    this.fim(`Ajudei ${a.name}, um viajante ferido.`);
  },
  mendigo(a, nobre) {
    if (nobre && Math.random() < 0.5) { this.favor('nobre', a.name); UI.dialog(a.name, a.look, 'Muito obrigado... <i>(Ele sorri de um jeito estranho, como se estivesse escondendo alguma coisa.)</i>', [{ label: 'Tchau' }]); }
    else UI.dialog(a.name, a.look, 'Que os deuses abençoem você!', [{ label: 'Tchau' }]);
    this.fim(`Ajudei o andarilho ${a.name}.`);
  },
  // ---------- consequências que voltam depois ----------
  favor(k, nome) { const P = Game.player; Vida.init(P); P.favores.push({ k, nome, dia: Game.day }); },
  cobrarFavor() {
    const G = Game, P = G.player; if (!P.favores || !P.favores.length || !this.naCidade() || (UI.current)) return;
    const i = P.favores.findIndex(f => G.day > f.dia); if (i < 0) return;
    const f = P.favores.splice(i, 1)[0];
    const g = { ferido: 50, comerciante: 0, senhora: 0, nobre: 400 }[f.k] + P.level * 5;
    const itens = { ferido: ['pocao_vida_m', 2], comerciante: ['pocao_vida_g', 1], senhora: ['torta_maca', 3], nobre: ['carta_fundacao', 1] }[f.k];
    const txt = {
      ferido: `${f.nome} vem correndo até você: "Lembra de mim? Você salvou a minha vida na estrada! Juntei isto para você."`,
      comerciante: `${f.nome} aparece com um pacote: "Contei para toda a guilda dos comerciantes o que você fez! Tome, por conta da casa."`,
      senhora: `${f.nome} acena da janela: "Fiz uma torta para quem devolveu a minha bolsa!"`,
      nobre: `Um mensageiro real entrega uma carta: "O andarilho que você ajudou era o Duque disfarçado! Ele testava o coração do povo. Ele manda este presente."`
    }[f.k];
    P.gold += g; P.addItem(Items.make(itens[0], itens[1]), true); Vida.honra(2); Sfx.play('quest');
    UI.dialog('Uma boa ação volta', null, `${esc(txt)}<br><br><span class="good">${g ? `+${g} de ouro • ` : ''}${itens[1]}× ${esc(ITEMS[itens[0]].name)}</span>`, [{ label: 'Obrigado(a)!' }]);
    G.chron(`Uma boa ação voltou para mim: ${f.nome}.`);
  },
  cacadores() {
    const G = Game, P = G.player, st = this.state(), pos = this.lugar(220, 300); if (!pos) return;
    const n = Math.min(4, 1 + Math.floor((st.procurado + Math.max(0, -(P.honra || 0) - 20) / 20) / 2));
    for (let i = 0; i < n; i++) { const m = this.mob(i === 0 ? 'bandido' : rngPick(['bandido', 'bandido_arqueiro']), pos.x, pos.y, { name: 'Caçador de Recompensas', hpMul: 1.6, dmgMul: 1.1, dl: 2, look: Object.assign({}, ENEMIES.bandido.look, { body: '#3a3a4a', hood: '#2a2a30', helm: i === 0 ? '#7a7a7a' : undefined }) }); m.target = P; m.aggro = 500; m.cacador = true; }
    G.centerMsg('CAÇADORES DE RECOMPENSA!', 'Alguém pagou pela sua cabeça.'); Sfx.play('shout');
    if (st.procurado > 0) st.procurado--;
  },
  emboscada() {
    const G = Game, P = G.player, pos = this.lugar(120, 180); if (!pos) return;
    const id = Math.random() < 0.5 ? 'lobo' : 'bandido';
    for (let i = 0; i < 3; i++) { const m = this.mob(id, pos.x, pos.y, { dl: -1 }); m.target = P; m.aggro = 300; }
    G.centerMsg('EMBOSCADA!', 'Você acorda com barulhos perto do acampamento!');
  },
  // guarda: pagar a multa para limpar o nome
  multa(a) {
    const P = Game.player, st = this.state(), v = 150 + Math.max(0, -(P.honra || 0)) * 8 + st.procurado * 100;
    return { label: `Pagar a multa (${v} de ouro) para limpar o seu nome`, cls: 'gold', fn: () => {
      if (P.gold < v) return Game.toast('Ouro insuficiente.', '#ff8080');
      P.gold -= v; st.procurado = 0; P.honra = Math.max(P.honra, -10); Sfx.play('coin');
      UI.dialog(a.name, a.look, 'Multa paga. Você está livre... mas fique de olho, estamos te observando.', [{ label: 'Tchau' }]);
      Game.chron('Paguei uma multa aos guardas e limpei meu nome.');
    } };
  }
};
function sumir(a) { a.dead = true; a.deadT = 10; Game.burst(a.x, a.y - 8, '#c0d0ff', 10, 50); }
function rngPick(a) { return a[Math.floor(Math.random() * a.length)]; }
