'use strict';
// ===================== DIFICULDADE =====================
// Brutal (no espírito de Kenshi): inimigos batem forte e aguentam muito, a vida quase não volta
// sozinha e quem cai diante de bandidos ou soldados não morre — desmaia, é roubado e acorda
// horas depois, ferido, no mesmo lugar.
const DIFICULDADES = {
  normal: { nome: 'Normal', dano: 1, vida: 1, regen: 1, perda: 0.1, extra: 0 },
  dificil: { nome: 'Difícil', dano: 1.35, vida: 1.2, regen: 0.6, perda: 0.15, extra: 1 },
  brutal: { nome: 'Brutal (estilo Kenshi)', dano: 1.8, vida: 1.45, regen: 0.3, perda: 0.25, extra: 2, desmaio: true }
};
const Dificuldade = {
  id() { const s = Game.settings && Game.settings.dif; return DIFICULDADES[s] ? s : 'brutal'; },
  cfg() { return DIFICULDADES[this.id()]; },
  proxima() { const k = Object.keys(DIFICULDADES), i = k.indexOf(this.id()); Game.settings.dif = k[(i + 1) % k.length]; Game.saveSettings(); },
  dano() { return this.cfg().dano; },
  vida() { return this.cfg().vida; },
  regen() { return this.cfg().regen; },
  perda() { return this.cfg().perda; },
  extra() { return this.cfg().extra; },
  // derrotado por gente (bandidos, soldados, piratas): desmaia em vez de morrer
  desmaio(killer) {
    const G = Game, P = G.player;
    if (!this.cfg().desmaio || !killer || killer.remote || !killer.def || !killer.def.look || killer.def.look.k !== 'hum' || killer.def.boss || killer.def.undead) return false;
    if (!G.level.isWorld && !G.level.proprio) return false;
    if ((P.desmaios || 0) > 0 && G.t - (P.ultimoDesmaio || -999) < 20) return false;   // apanhou de novo logo depois: aí morre
    P.ultimoDesmaio = G.t; P.desmaios = (P.desmaios || 0) + 1;
    P.hp = Math.max(1, Math.round(P.stat.maxHp * 0.15)); P.st = 0; P.invuln = 4;
    const roubo = Math.floor(P.gold * 0.35); P.gold -= roubo;
    // levam também um item de valor da bolsa (nunca o que está equipado)
    let item = '';
    const vals = P.inv.filter(it => ITEMS[it.id] && ITEMS[it.id].type !== 'quest' && !Object.values(P.equip).includes(it) && Items.value(it) > 20);
    if (vals.length && Math.random() < 0.7) { const it = vals[Math.floor(Math.random() * vals.length)]; item = ITEMS[it.id].name; P.removeInst(it, it.n || 1); }
    // os agressores vão embora com o saque
    G.actors = G.actors.filter(a => !(a.team === 'enemy' && a.def && a.def.look && a.def.look.k === 'hum' && dist(a.x, a.y, P.x, P.y) < 500 && !a.boss));
    for (const a of G.actors) if (a.target === P) a.target = null;
    const h = 2 + Math.floor(Math.random() * 3);
    G.time += h * 60; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
    P.buffs.push({ k: 'speed', v: -0.25, t: 150, name: 'Ferido' });
    UI.fade(); Sfx.play('death');
    G.centerMsg('DESMAIADO', `Você foi nocauteado e acordou ${h}h depois. Levaram ${roubo} de ouro${item ? ' e ' + item : ''}.`);
    G.chron(`Fui nocauteado por ${killer.name} e roubado. Acordei ferido, mas vivo.`);
    return true;
  }
};
