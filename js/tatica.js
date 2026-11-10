'use strict';
// =====================================================================
//  EXÉRCITOS MAIS ESPERTOS CONTRA OS JOGADORES
//  Antes, matar os 11 soldados que apareciam na tela destruía um exército de
//  100 homens, e os soldados eram fracos para um herói de nível alto. Agora,
//  contra os jogadores:
//  • Reforços: o exército inteiro luta. Os que caem são substituídos por
//    novas levas que chegam pela retaguarda até o exército acabar de verdade
//    (cada soldado na tela vale no máximo 2 homens).
//  • Veteranos: os soldados que enfrentam você têm o nível perto do seu e
//    aguentam mais; quanto mais soldados de um reino você mata, mais esse
//    reino manda gente experiente (o "terror" que você causa).
//  • Cercam: os de corpo a corpo se espalham em volta de você em vez de
//    virem em fila; arqueiros e fuzileiros miram em você quando você é a
//    maior ameaça.
//  • Escudos: soldados com escudo bloqueiam golpes vindos de frente.
//  • Capitão: se você derruba muita gente numa batalha, o capitão do
//    exército entra na luta (bem mais forte) e anima os soldados perto dele.
//  • Os reinos que você aterroriza reforçam os exércitos que estão em guerra
//    com você a cada dia.
// =====================================================================
const Tatica = {
  st() { const S = War.st(); return S.tat || (S.tat = { terror: {} }); },
  ligado() { return !(window.Batalhas && Batalhas.on); },
  contraJogador(m) { const P = Game.player; return !!(P && m && m.faction && m.faction !== 'jogador' && this.ligado() && isHostile(m, P)); },
  terror(k) { return this.st().terror[k] || 0; },
  // ---------- soldados no nível do herói ----------
  veterano(m) {
    const P = Game.player; if (!this.contraJogador(m) || m._tat) return; m._tat = true;
    const bonus = Math.min(6, Math.floor(this.terror(m.faction) / 25));
    const alvo = Math.max(m.lvl, P.level - 2 + bonus);
    const hpR = (1 + 0.12 * (alvo - 1)) / (1 + 0.12 * (m.lvl - 1)) * 1.4, dmR = (1 + 0.1 * (alvo - 1)) / (1 + 0.1 * (m.lvl - 1));
    m.maxHp = m.hp = Math.round(m.maxHp * hpR); m.dmg *= dmR; m.lvl = alvo; m._hpR = hpR; m._dmR = dmR; m.xp = Math.round(m.xp * (1 + 0.05 * (alvo - 1)));
    if (m.look && (m.look.shield || m.kind === 'soldado' || m.kind === 'elite')) m.escudo = m.kind === 'elite' ? 0.4 : 0.3;
  },
  // ---------- reforços nas batalhas ao vivo ----------
  prepararBatalha(bt) {
    bt.reserva = {}; bt.campo = {}; bt.mortosP = {}; bt.refT = {};
    for (const id of [bt.a, bt.b]) {
      const ar = War.army(id); if (!ar) continue;
      const ms = Game.actors.filter(m => m.battleId === bt.id && m.armyId === id && !m.dead); if (!ms.length || !this.contraJogador(ms[0])) continue;
      const repr = Math.min(2, ms[0].repr || 2); for (const m of ms) m.repr = repr;
      bt.campo[id] = Math.max(ms.length, Math.min(14, ms.length + 3)); bt.reserva[id] = Math.max(0, ar.n - ms.length * repr); bt.refT[id] = 4;
    }
  },
  reforcos(dt) {
    const S = War.st(), P = Game.player;
    for (const bt of S.battles) {
      if (!bt.live || !bt.reserva) continue;
      for (const id of [bt.a, bt.b]) {
        const res = bt.reserva[id]; if (!res || res <= 0) continue;
        const ar = War.army(id); if (!ar) continue;
        const vivos = Game.actors.filter(m => m.battleId === bt.id && m.armyId === id && !m.dead).length;
        bt.refT[id] = (bt.refT[id] || 0) - dt;
        if (vivos >= bt.campo[id] || (vivos > 0 && bt.refT[id] > 0)) continue;
        bt.refT[id] = 5 + Math.random() * 3;
        const lado = id === bt.a ? 1 : -1, n = Math.min(3, bt.campo[id] - vivos, Math.ceil(res / 2));
        const rng = new RNG((Math.random() * 1e9) | 0);
        for (let i = 0; i < n; i++) {
          const along = 13 + rng.range(0, 3), side = rng.range(-7, 7);
          const tx = bt.x + bt.ax * along * lado - bt.ay * side, ty = bt.y + bt.ay * along * lado + bt.ax * side;
          const m = War.makeSoldier(ar.k, War.pickKind(ar.k, rng, ar.n), tx * 16 + 8, ty * 16 + 8, rng);
          Game.findFree(m); m.home = { x: bt.x * 16 + 8, y: bt.y * 16 + 8 }; m.ctrl = 'battle'; m.battleId = bt.id; m.armyId = id; m.repr = 2; m.aggro = m.ai === 'musket' ? 400 : 320;
          Game.actors.push(m);
        }
        bt.reserva[id] = Math.max(0, res - n * 2);
        if (n && dist(P.x / 16, P.y / 16, bt.x, bt.y) < 40) Game.floater(P.x, P.y - 40, `⚔ Reforços de ${War.K[ar.k] ? War.K[ar.k].short : ''}!`, '#ffb070');
      }
    }
  },
  // ---------- o capitão entra na luta ----------
  capitao(bt, id) {
    const ar = War.army(id); if (!ar || bt.capitao && bt.capitao[id]) return;
    (bt.capitao = bt.capitao || {})[id] = true;
    const lado = id === bt.a ? 1 : -1, tx = bt.x + bt.ax * 11 * lado, ty = bt.y + bt.ay * 11 * lado, rng = new RNG((Math.random() * 1e9) | 0);
    const m = War.makeSoldier(ar.k, 'elite', tx * 16 + 8, ty * 16 + 8, rng);
    Game.findFree(m); m.home = { x: bt.x * 16 + 8, y: bt.y * 16 + 8 }; m.ctrl = 'battle'; m.battleId = bt.id; m.armyId = id; m.repr = 4; m.aggro = 420;
    m.maxHp = m.hp = Math.round(m.maxHp * 3.2); m.dmg *= 1.45; m.capitao = true; m.escudo = 0.45; m.xp *= 4;
    m.name = 'Capitão de ' + (War.K[ar.k] ? War.K[ar.k].short : 'guerra'); m.flagC = War.K[ar.k] && War.K[ar.k].color; m.flagK = ar.k;
    Game.actors.push(m);
    Game.centerMsg('⚔ O CAPITÃO ENTRA NA LUTA', `${m.name} vem atrás de você!`); Sfx.play('shout');
  },
  // ---------- quem ataca o jogador se espalha em volta dele ----------
  cercar(m, t, dt, sf) {
    if (!(t === Game.player || t.remote) || m.ai === 'ranged' || m.ai === 'musket' || !this.contraJogador(m)) return false;
    const d = dist(m.x, m.y, t.x, t.y); if (d < 28 || d > 220) return false;
    const grupo = []; for (const o of Game.actors) if (!o.dead && o.target === t && o.faction === m.faction && o.ai !== 'ranged' && o.ai !== 'musket') grupo.push(o);
    if (grupo.length < 2) return false;
    grupo.sort((a, b) => a.id - b.id);
    const i = grupo.indexOf(m), base = angleTo(t.x, t.y, m.x, m.y), passo = Math.PI * 2 / Math.min(8, grupo.length);
    const ang = Math.round(base / passo) * passo + (i % 2 ? passo / 2 : 0);
    const sx = t.x + Math.cos(ang) * 22, sy = t.y + Math.sin(ang) * 18;
    if (dist(m.x, m.y, sx, sy) < 8) return false;
    m.moveToward(sx, sy, m.spd * 1.05 * sf, dt); return true;
  }
};

// ---------------- ganchos ----------------
(function () {
  const ms0 = War.makeSoldier;
  War.makeSoldier = function () { const m = ms0.apply(this, arguments); try { Tatica.veterano(m); } catch (e) { } return m; };
  const sb0 = War.spawnBattle;
  War.spawnBattle = function (bt) { const r = sb0.apply(this, arguments); try { Tatica.prepararBatalha(bt); } catch (e) { } return r; };
  // os reforços chegam antes de o jogo decidir quem perdeu
  const lv0 = War.live;
  War.live = function (dt) { try { Tatica.reforcos(dt); } catch (e) { } return lv0.apply(this, arguments); };
  // mais soldados mirando no jogador quando ele é a maior ameaça
  const al0 = War.alvo;
  War.alvo = function (m) {
    const best = al0.apply(this, arguments), P = Game.player;
    if (!P || P.dead || !Tatica.contraJogador(m)) return best;
    const d = dist(m.x, m.y, P.x, P.y), bt = m.battleId && this.st().battles.find(b => b.id === m.battleId);
    const ameaca = (bt && bt.mortosP && bt.mortosP[m.armyId] || 0) + Math.min(10, Tatica.terror(m.faction) / 10);
    const alc = m.ai === 'ranged' || m.ai === 'musket' ? 340 : 200;
    if (best !== P && d < alc && ameaca >= 2) return P;
    return best;
  };
  const ia0 = War.ia;
  War.ia = function (m, t, dt, sf) { if (t && Tatica.cercar(m, t, dt, sf)) return true; return ia0.apply(this, arguments); };
  // escudo: golpes do herói vindos de frente às vezes são aparados
  const dm0 = Combat.damage;
  const doJogador = a => !!a && (a === Game.player || a.remote || a.team === 'ally' || a.team === 'player');
  Combat.damage = function (t, amount, o) {
    // a força de veterano vale só contra os jogadores (e os companheiros deles): entre exércitos tudo continua igual
    const src = o && o.src;
    if (t && t._hpR && src && !doJogador(src)) amount *= t._hpR;
    if (src && src._dmR && t && !doJogador(t)) amount /= src._dmR;
    if (t && t.escudo && !t.dead && o && o.src && (o.src === Game.player || o.src.remote) && t.windup <= 0 && !(t.recuo > 0)) {
      const a = angleTo(t.x, t.y, o.src.x, o.src.y);
      if (Math.abs(angDiff(t.face || 0, a)) < 1.1 && Math.random() < t.escudo) {
        amount *= 0.3; if ((t._blq || 0) < Game.t) { t._blq = Game.t + 0.8; Game.floater(t.x, t.y - 30, 'Bloqueou!', '#c0d0ff'); Sfx.play('block'); }
      }
    }
    return dm0.call(this, t, amount, o);
  };
  // contar as mortes causadas pelo jogador: terror do reino e o capitão
  const od0 = War.onDeath;
  War.onDeath = function (m, killer) {
    const r = od0.apply(this, arguments);
    try {
      const P = Game.player, byP = killer === P || (killer && (killer.team === 'ally' || killer.remote));
      if (byP && m.faction && m.faction !== 'jogador' && Tatica.ligado()) {
        const T = Tatica.st(); T.terror[m.faction] = (T.terror[m.faction] || 0) + 1;
        if (m.battleId) { const bt = War.st().battles.find(b => b.id === m.battleId); if (bt) { bt.mortosP = bt.mortosP || {}; bt.mortosP[m.armyId] = (bt.mortosP[m.armyId] || 0) + 1; if (bt.mortosP[m.armyId] >= 8) Tatica.capitao(bt, m.armyId); } }
      }
    } catch (e) { }
    return r;
  };
  // o capitão anima quem está perto (+20% de dano)
  const t0 = War.update;
  War.update = function (dt) {
    const r = t0.apply(this, arguments);
    Tatica._aT = (Tatica._aT || 0) - dt;
    if (Tatica._aT <= 0) {
      Tatica._aT = 1;
      for (const c of Game.actors) if (c.capitao && !c.dead) for (const o of Game.actors) if (!o.dead && o !== c && o.faction === c.faction && !o._animado && dist(o.x, o.y, c.x, c.y) < 120) { o._animado = true; o.dmg *= 1.2; }
    }
    return r;
  };
  // os reinos aterrorizados reforçam os exércitos que estão em guerra com você; o terror passa devagar
  const dl0 = War.daily;
  War.daily = function () {
    const r = dl0.apply(this, arguments);
    try {
      const T = Tatica.st(), lado = War.playerSide();
      for (const k of Object.keys(T.terror)) {
        if (T.terror[k] > 30 && lado) for (const a of War.st().armies) if (a.k === k && War.atWar(k, lado) && a.state !== 'battle') a.n = Math.min(a.n + 6 + Math.floor(T.terror[k] / 30) * 2, 160);
        T.terror[k] = Math.floor(T.terror[k] * 0.9);
      }
    } catch (e) { }
    return r;
  };
})();
