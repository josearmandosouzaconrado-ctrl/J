'use strict';
// =====================================================================
//  MISSÃO: RESGATAR A MENINA DAS MINAS DO REI
//  Na abertura, os guardas do reino tirano levaram uma menina para as
//  minas do rei. Dias depois, um mineiro fugido conta onde ela está.
//  1. Vá até as Minas do Rei, perto da capital do reino tirano.
//  2. Lá dentro: guardas, besteiros e o Capataz das Minas, que tem a chave.
//  3. Derrote o capataz e solte a menina. Ela segue você.
//  4. Fuja com ela (os guardas vêm atrás) até uma cidade fora do reino
//     tirano, ou até a sua vila.
//  5. No fim, adote a menina ou deixe-a aos cuidados do templo.
// =====================================================================
Object.assign(ENEMIES, {
  guarda_mina: { name: 'Guarda das Minas', look: { k: 'hum', skin: '#d8a070', body: '#5a3030', legs: '#2a2a2a', boots: '#1a1a1a', helm: '#8a8a94', chestplate: true, weapon: 'spear', wc: '#b0b0b0' }, hp: 72, dmg: 10, spd: 58, ai: 'melee', xp: 28, armor: 14, gold: [4, 14] },
  besteiro_mina: { name: 'Besteiro das Minas', look: { k: 'hum', skin: '#c89060', body: '#5a3030', legs: '#2a2a2a', boots: '#1a1a1a', hood: '#3a2020', weapon: 'bow', wc: '#6a4a2a' }, hp: 50, dmg: 9, spd: 56, ai: 'ranged', proj: 'arrow', xp: 26, armor: 6, gold: [3, 12] },
  capataz_rei: { name: 'Capataz das Minas', look: { k: 'hum', skin: '#c88a5a', body: '#3a2a2a', legs: '#2a2020', boots: '#1a1010', helm: '#5a5a60', chestplate: true, beard: true, bulky: true, weapon: 'mace', wc: '#909090' }, hp: 280, dmg: 17, spd: 56, ai: 'melee', xp: 180, armor: 24, gold: [90, 220], boss: true, elite: true },
  menina_resgate: { name: 'Criança', look: { k: 'hum', skin: '#e0b090', body: '#8a7a6a', short: 3, blush: true }, hp: 999, dmg: 0, spd: 74, ai: 'melee', xp: 0, ally: true, passive: true }
});
DUNGEON_TYPES.minas_rei = { name: 'Minas do Rei', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['guarda_mina', 'guarda_mina', 'besteiro_mina'], boss: 'capataz_rei', deco: [O.MINEBEAM || O.ROCK, O.TORCH, O.CRATE, O.BARREL, O.ROCK], ores: true };

const Resgate = {
  st() { return Game.player && Game.player.resgate; },
  tirania() { const P = Game.player; return P && (P.tirania || P.tiraniaCaiu); },
  nome() { const T_ = this.tirania(); return (T_ && T_.crianca) || 'a menina'; },
  look() {
    const T_ = this.tirania(), k = T_ && T_.k, K = k && War.K && War.K[k];
    const race = K && K.race && NAMES[K.race] ? K.race : 'humano';
    const L = npcLook(race, 'f', new RNG(hashStr('resgate' + this.nome() + Game.world.seed)), 'kid');
    L.short = 3; L.blush = true; delete L.beard; delete L.hat; delete L.hood; delete L.helm; L.body = '#7a6a5a'; L.legs = '#5a4a3a'; L.hair = L.hair || '#5a3a1a';
    return L;
  },
  // ---------- 1. a pista ----------
  dia() {
    const P = Game.player, T_ = this.tirania(); if (!P || !T_ || P.resgate || !Game.level || !Game.level.isWorld) return;
    if (Game.day < (T_.dia || 0) + 1) return;
    const pos = this.lugar(T_.k); if (!pos) return;
    P.resgate = { fase: 'mina', k: T_.k, mina: pos, lvl: clamp(P.level + 2, 4, 30), dia: Game.day };
    this.registrar();
    Game.mods.discovered.add('minas_rei');
    Game.track = 'resgate';
    const K = War.K && War.K[T_.k], cap = K && K.cap ? K.cap.name : 'a capital';
    const look = npcLook('humano', 'm', new RNG(77), 'citizen'); look.body = '#5a4a3a'; look.legs = '#3a3020'; look.hat = null;
    const falas = [
      `Psiu... você é quem viu os guardas levarem a pequena ${this.nome()}, não é? Eu fugi das Minas do Rei ontem à noite.`,
      `Ela está viva! Fica acorrentada no fundo da mina, perto do Capataz. É ele quem guarda a chave das correntes.`,
      `As minas ficam perto de ${cap}. Tem guardas e besteiros lá dentro. Se você for... vá preparado(a). E traga ela para longe das terras do rei.`
    ];
    let i = 0;
    const prox = () => { if (i < falas.length) { const t = falas[i++]; UI.dialog('Mineiro fugido', look, esc(t), [{ label: i < falas.length ? 'Continuar ▶' : 'Eu vou buscá-la!', cls: i < falas.length ? '' : 'gold', fn: prox }]); } else { UI.close(); Game.centerMsg('NOVA MISSÃO: O RESGATE', `Salve ${this.nome()} das Minas do Rei`); Sfx.play('quest'); Game.chron(`Um mineiro fugido me contou que ${this.nome()} está viva, acorrentada nas Minas do Rei, perto de ${cap}. Vou buscá-la.`); } };
    Game.later ? Game.later(0.5, prox) : prox();
  },
  // a entrada das minas: perto da capital do reino tirano, longe das cidades
  lugar(k) {
    War.kingdoms();
    const W = Game.world, K = War.K && War.K[k];
    const cap = (K && K.cap) || W.settlements.find(s => s.region.id === k && s.type === 'capital') || W.settlements.find(s => s.region.id === k);
    if (!cap) return null;
    const rng = new RNG(hashStr('minas' + k) + W.seed);
    for (let r = 26; r < 90; r += 4) for (let t = 0; t < 24; t++) {
      const a = rng.range(0, Math.PI * 2), x = Math.round(cap.x + Math.cos(a) * r), y = Math.round(cap.y + Math.sin(a) * r);
      let ok = true;
      for (let dy = -3; dy <= 2 && ok; dy++) for (let dx = -3; dx <= 3 && ok; dx++) if (!W.isLand(x + dx, y + dy)) ok = false;
      if (!ok || !W.farFrom(x, y, W.settlements, 22) || !W.farFrom(x, y, W.dungeons, 14)) continue;
      return { x, y };
    }
    return null;
  },
  registrar() {
    const R = this.st(), W = Game.world; if (!R || !R.mina || !W || W.dungeonById.minas_rei) return;
    const reg = W.regions[W.regAt(R.mina.x, R.mina.y)];
    const d = { id: 'minas_rei', uid: 90001, name: 'Minas do Rei', type: 'minas_rei', boss: 'capataz_rei', lvl: R.lvl || 6, size: 46, x: R.mina.x, y: R.mina.y, region: reg };
    W.stampDungeon(d); W.dungeons.push(d); W.dungeonById[d.id] = d;
    for (let cy = (d.y >> 5) - 1; cy <= (d.y >> 5) + 1; cy++) for (let cx = (d.x >> 5) - 1; cx <= (d.x >> 5) + 1; cx++) { const k = W.ckey(cx, cy); W.chunks.delete(k); W.canvases.delete(k); }
  },
  // ---------- 2 e 3. dentro da mina ----------
  menina(x, y, presa) {
    const m = new Monster('menina_resgate', x, y, 1, { look: this.look(), name: this.nome() });
    m.team = 'ally'; m.resgate = true; m.presa = !!presa; m.follow = !presa;
    m.update = function (dt) {
      const P = Game.player;
      if (this.presa || !P) { this.moving = false; return; }
      const d = dist(this.x, this.y, P.x, P.y);
      if (d > 420) { this.x = P.x + 10; this.y = P.y + 10; Game.findFree(this); }
      else if (d > 30) this.moveToward(P.x, P.y, d > 120 ? 110 : 72, dt);
      else this.moving = false;
      if (this.moving) this.anim += dt;
    };
    Game.findFree(m); Game.actors.push(m);
    return m;
  },
  capatazVivo() { return Game.actors.some(a => a.eid === 'capataz_rei' && !a.dead); },
  falar(m) {
    const R = this.st(), nome = this.nome();
    if (!R) return;
    if (m.presa) {
      if (this.capatazVivo()) return UI.dialog(nome, m.look, 'Você... veio me buscar? Cuidado! O Capataz tem a chave das correntes. Ele está aqui perto!', [{ label: 'Eu volto já. Aguenta firme!' }]);
      return UI.dialog(nome, m.look, `A chave! Você pegou a chave do Capataz! Eu sabia que alguém ia vir... Você é aquele(a) que estava na vila quando levaram a mamãe e o papai.`, [
        { label: '🔓 Soltar as correntes', cls: 'gold', fn: () => this.soltar(m) }
      ]);
    }
    UI.dialog(nome, m.look, R.fase === 'fuga' ? 'Vamos sair daqui! Me leva para longe das terras do rei... por favor.' : 'Obrigada...', [{ label: 'Fica perto de mim.' }]);
  },
  soltar(m) {
    const R = this.st();
    m.presa = false; m.follow = true; R.fase = 'fuga'; R.solta = Game.day;
    UI.close(); Sfx.play('chest');
    Game.centerMsg(`${this.nome().toUpperCase()} ESTÁ LIVRE!`, 'Agora fuja das terras do rei com ela');
    Game.chron(`Derrotei o Capataz das Minas e soltei ${this.nome()} das correntes.`);
    Game.toast('Leve-a até uma cidade fora do reino tirano, ou até a sua vila.', '#ffe0a0');
  },
  // ---------- 4. a fuga ----------
  perseguicao() {
    const P = Game.player, rng = new RNG(Date.now() & 0xffff);
    for (let i = 0; i < 4; i++) {
      const a = rng.range(0, Math.PI * 2), id = i === 3 ? 'besteiro_mina' : 'guarda_mina';
      const m = new Monster(id, P.x + Math.cos(a) * 150, P.y + Math.sin(a) * 110, (this.st().lvl || 6));
      m.aggro = 400; m.target = P; Game.findFree(m); Game.actors.push(m);
    }
    Game.centerMsg('OS GUARDAS PERCEBERAM A FUGA!', 'Proteja a menina e fuja!'); Sfx.play('shout');
  },
  seguro() {
    const s = Game.curTown, R = this.st(); if (!s || !Game.level.isWorld) return false;
    if (s.playerVila) return true;
    const o = War.ownerOf(s) || s.region.id;
    return o !== R.k && !s.region.hostile;
  },
  tick() {
    const R = this.st(), P = Game.player; if (!R || R.fase !== 'fuga' || !Game.started || UI.current || !Game.level) return;
    const m = Game.actors.find(a => a.resgate && !a.dead);
    if (!m) { if (Game.level.isWorld || Game.level.def) this.menina(P.x + 12, P.y + 6, false); return; }
    if (this.seguro() && dist(m.x, m.y, P.x, P.y) < 140) this.final(m);
  },
  // ---------- 5. o final ----------
  final(m) {
    const R = this.st(), P = Game.player, nome = this.nome(), s = Game.curTown;
    R.fase = 'escolha';
    const casa = (P.houses && P.houses.length) || Vila.st();
    const fim = (adotou) => {
      R.fase = 'fim'; R.fim = Game.day; R.adotada = adotou;
      Game.actors = Game.actors.filter(a => !a.resgate);
      const xp = 250 + P.level * 20; P.addXP(xp); Vida.honra(adotou ? 8 : 6, `salvei ${nome}`);
      if (Game.track === 'resgate') Game.track = null;
      UI.close(); Sfx.play('levelup');
      Game.centerMsg('RESGATE CONCLUÍDO!', adotou ? `${nome} agora é sua filha` : `${nome} está segura no templo de ${s.name}`);
      Game.chron(adotou ? `Tirei ${nome} das Minas do Rei e a adotei. Agora ela tem uma casa de novo.` : `Tirei ${nome} das Minas do Rei e a deixei aos cuidados do templo de ${s.name}.`);
    };
    const ops = [];
    if (casa) ops.push({ label: `🏠 Adotar ${nome}: ela vira sua filha`, cls: 'gold', fn: () => {
      const L = this.look();
      P.children = P.children || [];
      P.children.push({ id: 'k' + uid(), name: nome, race: (War.K && War.K[R.k] && War.K[R.k].race && RACES[War.K[R.k].race]) ? War.K[R.k].race : 'humano', sex: 'f', born: Game.day - 12, look: L, resgatada: true });
      fim(true);
    } });
    else ops.push({ label: `🏠 Adotar (você precisa ter uma casa)`, fn: () => Game.toast('Compre ou construa uma casa para adotar.', '#ffb080') });
    ops.push({ label: '⛪ Deixar aos cuidados do templo da cidade', fn: () => fim(false) });
    UI.dialog(nome, m.look, `Aqui... ninguém do rei vai me achar? <br><br><i>${esc(nome)} segura a sua mão.</i> <br><br>Você não tem mais pais... O que fazer agora?`, ops);
  },
  // ---------- o rastreador ----------
  quest() {
    const R = this.st();
    return this._q || (this._q = { resgate: true, id: 'resgate', get title() { return `💔 O resgate de ${Resgate.nome()}`; } });
  },
  progresso() {
    const R = this.st(); if (!R) return '';
    if (R.fase === 'mina') return Game.level && Game.level.def && Game.level.def.id === 'minas_rei' ? (this.capatazVivo() ? 'Derrote o Capataz e pegue a chave' : `Solte ${this.nome()} das correntes`) : 'Vá até as Minas do Rei';
    if (R.fase === 'fuga') return 'Leve-a para uma cidade fora do reino tirano';
    return '';
  },
  alvo() {
    const R = this.st(); if (!R) return null;
    if (R.fase === 'mina') return { x: R.mina.x, y: R.mina.y + 1, name: 'Minas do Rei', dungeon: 'minas_rei' };
    if (R.fase === 'fuga') {
      const P = Game.player, W = Game.world, px = P.x / 16, py = P.y / 16;
      let best = null, bd = Infinity;
      for (const s of W.settlements) { const o = War.ownerOf(s) || s.region.id; if ((o === R.k && !s.playerVila) || s.region.hostile || s.pirata || s.academy) continue; const d = dist(s.x, s.y, px, py); if (d < bd) { bd = d; best = s; } }
      return best ? { x: best.mid ? best.mid.x : best.x, y: best.mid ? best.mid.y : best.y, name: best.name } : null;
    }
    return null;
  }
};

// ---------------- ganchos ----------------
(function () {
  const tj0 = Player.prototype.toJSON; Player.prototype.toJSON = function () { const o = tj0.call(this); if (this.resgate) o.resgate = this.resgate; return o; };
  const dt0 = Game.dayTick; Game.dayTick = function () { const r = dt0.apply(this, arguments); Resgate.dia(); return r; };
  // o mundo é montado (novo jogo ou jogo carregado): as minas voltam ao mapa
  const vr0 = Vila.restore; Vila.restore = function () { const r = vr0.apply(this, arguments); const R = Resgate.st(); if (R && R.mina) Resgate.registrar(); return r; };
  // dentro da mina: a menina acorrentada perto do Capataz
  const ed0 = Game.enterDungeon;
  Game.enterDungeon = function (d) {
    const r = ed0.apply(this, arguments), R = Resgate.st();
    if (d && d.id === 'minas_rei' && R && R.fase === 'mina' && this.level && this.level.def === d) {
      const boss = this.actors.find(a => a.eid === 'capataz_rei');
      const h = boss ? boss.home : { x: this.player.x + 60, y: this.player.y };
      Resgate.menina(h.x + 26, h.y + 4, true);
      Game.toast(`Você ouve um choro no fundo da mina... ${Resgate.nome()} está aqui!`, '#ffd0d0');
    }
    return r;
  };
  // saindo da mina com ela: os guardas vêm atrás
  const xd0 = Game.exitDungeon;
  Game.exitDungeon = function () {
    const R = Resgate.st(), daMina = this.level && this.level.def && this.level.def.id === 'minas_rei';
    const r = xd0.apply(this, arguments);
    if (daMina && R && R.fase === 'fuga' && !R.perseguidos) { R.perseguidos = true; setTimeout(() => Resgate.perseguicao(), 800); }
    return r;
  };
  // ninguém machuca a menina
  const cd0 = Combat.damage; Combat.damage = function (t) { if (t && t.resgate) return 0; return cd0.apply(this, arguments); };
  // falar com ela
  const fi0 = Muralhas.findInteract;
  Muralhas.findInteract = function (fx, fy) {
    const m = Game.actors && Game.actors.find(a => a.resgate && !a.dead && dist(fx, fy, a.x, a.y - 6) < 24);
    if (m) return { kind: 'mar', label: m.presa ? 'Soltar' : 'Falar', name: Resgate.nome(), d: 0, prio: 8, fn: () => Resgate.falar(m) };
    return fi0.apply(this, arguments);
  };
  // correntes nos pés enquanto está presa
  const md0 = Monster.prototype.draw;
  Monster.prototype.draw = function (ctx, camX, camY) {
    const r = md0.apply(this, arguments);
    if (this.resgate && this.presa) {
      const x = Math.round(this.x - camX), y = Math.round(this.y - camY);
      ctx.fillStyle = '#5a5a64'; ctx.fillRect(x - 5, y - 1, 3, 2); ctx.fillRect(x + 2, y - 1, 3, 2);
      ctx.fillStyle = '#8a8a94'; for (let i = 0; i < 4; i++) ctx.fillRect(x + 5 + i * 3, y + (i % 2), 2, 1);
      ctx.fillStyle = '#3a3a40'; ctx.fillRect(x + 16, y - 2, 4, 4);
    }
    return r;
  };
  // ela chega à cidade segura
  const t0 = Reino.tick; Reino.tick = function (dt) { const r = t0.apply(this, arguments); Resgate.tick(); return r; };
  // o rastreador, a bússola e a lista de missões
  const tq0 = Game.trackedQuest;
  Game.trackedQuest = function () {
    const R = Resgate.st();
    if (R && (R.fase === 'mina' || R.fase === 'fuga')) { if (this.track === 'resgate') return Resgate.quest(); const q = tq0.call(this); return q || Resgate.quest(); }
    return tq0.call(this);
  };
  const tp0 = Quests.targetPos; Quests.targetPos = function (q) { if (q && q.resgate) return Resgate.alvo(); return tp0.apply(this, arguments); };
  const pt0 = Quests.progressText; Quests.progressText = function (q) { if (q && q.resgate) return Resgate.progresso(); return pt0.apply(this, arguments); };
  const qt0 = UI.questTab;
  UI.questTab = function (f) {
    const R = Resgate.st(), h = qt0.call(this, f);
    if (!R || (R.fase !== 'mina' && R.fase !== 'fuga')) return h;
    return `<div class="quest main ${Game.track === 'resgate' ? 'trk' : ''}" ${f(() => { Game.track = 'resgate'; this.openMenu('quests'); })}><b class="gold">💔 O resgate de ${esc(Resgate.nome())}</b><br><small>${esc(Resgate.progresso())}</small></div>` + h;
  };
  // jogo carregado no meio da fuga: ela continua com você
  const sp0 = Game.startPlay; Game.startPlay = function () { const r = sp0.apply(this, arguments); const R = Resgate.st(); if (R && R.fase === 'fuga') Resgate.menina(this.player.x + 12, this.player.y + 6, false); return r; };
})();
