'use strict';
// ===================== GUERRA E DIPLOMACIA ENTRE REINOS =====================
// Simulação procedural: relações entre reinos, declarações de guerra, exércitos que marcham,
// acampam esperando reforços, batalham, cercam e conquistam cidades; tratados de paz.
// Quando o jogador está perto, tudo vira combate de verdade com soldados no mapa.

const WAR_RANKS = [
  { id: 'milicia', name: 'Miliciano', merit: 0, lvl: 1, pay: 12 },
  { id: 'soldado', name: 'Soldado', merit: 15, lvl: 3, pay: 30 },
  { id: 'cavaleiro', name: 'Cavaleiro', merit: 50, lvl: 8, pay: 65 },
  { id: 'elite', name: 'Elite Real', merit: 120, lvl: 14, pay: 120 }
];
const WAR_KIND_RANK = { milicia: 0, soldado: 1, arqueiro: 1, mosqueteiro: 1, cavaleiro: 2, elite: 3 };
// estilo de armadura de cada reino
const KSTYLE = {
  valdoria: { metal: '#b8c0cc', helm1: 'kettle', helm2: 'full', weapons: ['sword', 'spear', 'sword'], wItem: 'sword', mat2: 'aco' },
  colinas: { metal: '#a89878', helm1: 'kettle', helm2: 'kettle', weapons: ['sword', 'spear', 'mace'], wItem: 'sword', mat2: 'aco' },
  sylvaris: { metal: '#d8d0a0', helm1: 'leaf', helm2: 'leaf', weapons: ['sword', 'spear', 'sword'], wItem: 'sword', mat2: 'elfico', archers: 0.35 },
  khazdurim: { metal: '#8a8a94', helm1: 'kettle', helm2: 'full', horns: true, weapons: ['axe', 'hammer', 'axe'], wItem: 'axe', mat2: 'anao', archers: 0.1 },
  nordheim: { metal: '#9aa0a8', helm1: 'kettle', helm2: 'kettle', horns: true, fur: true, weapons: ['axe', 'sword', 'spear'], wItem: 'axe', mat2: 'aco' },
  gorthak: { metal: '#4e4c44', helm1: 'spike', helm2: 'spike', weapons: ['axe', 'mace', 'great'], wItem: 'axe', mat2: 'orc', archers: 0.1 },
  zahrim: { metal: '#e0c890', helm1: 'turban', helm2: 'turban', cloth: true, weapons: ['sword', 'spear', 'sword'], wItem: 'sword', mat2: 'elfico' },
  ssarak: { metal: '#5a7a4a', helm1: 'kettle', helm2: 'full', crest: true, weapons: ['spear', 'sword', 'spear'], wItem: 'sword', mat2: 'aco' },
  talassa: { metal: '#7ab0c8', helm1: 'leaf', helm2: 'full', crest: true, weapons: ['spear', 'spear', 'sword'], wItem: 'sword', mat2: 'elfico' },
  azhkar: { metal: '#5a2a30', helm1: 'spike', helm2: 'spike', weapons: ['sword', 'great', 'axe'], wItem: 'sword', mat2: 'orc' },
  shirokai: { metal: '#3a4a3a', helm1: 'kettle', helm2: 'full', crest: true, weapons: ['sword', 'spear', 'sword'], wItem: 'sword', mat2: 'aco', archers: 0.3 },
  aurelion: { metal: '#c8ccd8', musket: true, weapons: ['musket', 'musket', 'sword'], wItem: 'sword', mat2: 'aco' },
  ferrania: { metal: '#8a8a94', musket: true, weapons: ['musket', 'musket', 'sword'], wItem: 'sword', mat2: 'aco' },
  gromhald: { metal: '#7a8088', helm1: 'kettle', helm2: 'full', horns: true, fur: true, weapons: ['hammer', 'axe', 'great'], wItem: 'hammer', mat2: 'anao', archers: 0.08 },
  lunethar: { metal: '#c0c8e8', helm1: 'leaf', helm2: 'leaf', weapons: ['sword', 'spear', 'sword'], wItem: 'sword', mat2: 'elfico', archers: 0.4 },
  rodafina: { metal: '#c09050', helm1: 'kettle', helm2: 'kettle', weapons: ['mace', 'sword', 'spear'], wItem: 'mace', mat2: 'aco', archers: 0.3 },
  kharzul: { metal: '#9a8a7a', helm1: 'kettle', helm2: 'full', horns: true, weapons: ['axe', 'hammer', 'axe'], wItem: 'axe', mat2: 'anao', archers: 0.1 },
  orkhai: { metal: '#5a4a3a', helm1: 'spike', helm2: 'spike', fur: true, weapons: ['axe', 'great', 'spear'], wItem: 'axe', mat2: 'orc', archers: 0.25 },
  serpentis: { metal: '#4a8a6a', helm1: 'kettle', helm2: 'full', crest: true, weapons: ['spear', 'spear', 'sword'], wItem: 'sword', mat2: 'aco' },
  kumari: { metal: '#d8b070', helm1: 'turban', helm2: 'turban', cloth: true, weapons: ['spear', 'sword', 'spear'], wItem: 'sword', mat2: 'elfico' }
};
// simpatias e rivalidades históricas (relação de base)
const KBIAS = { 'colinas|valdoria': 35, 'sylvaris|valdoria': 15, 'khazdurim|valdoria': 15, 'khazdurim|sylvaris': -25, 'gorthak|nordheim': -55, 'gorthak|khazdurim': -40, 'gorthak|valdoria': -30, 'ssarak|zahrim': -45, 'gorthak|zahrim': -20, 'nordheim|valdoria': 0, 'colinas|sylvaris': 20, 'azhkar|talassa': -50, 'azhkar|shirokai': -35, 'shirokai|talassa': 10, 'aurelion|kumari': -40, 'aurelion|gromhald': -20, 'gromhald|rodafina': -30, 'lunethar|rodafina': 25, 'aurelion|lunethar': 5, 'kumari|lunethar': -10, 'aurelion|rodafina': 15, 'aurelion|orkhai': -45, 'kharzul|orkhai': -35, 'gromhald|kharzul': 10, 'kumari|orkhai': -20, 'rodafina|serpentis': -15, 'serpentis|umbraval': -30, 'aurelion|ferrania': -30, 'ferrania|rodafina': 10, 'ferrania|serpentis': -25 };
const WAR_EVENTS = {
  bad: ['Patrulhas de {a} e {b} trocaram golpes na fronteira.', 'Um emissário de {a} foi insultado na corte de {b}.', 'Caravanas de {b} foram saqueadas em terras de {a}.', '{a} acusa {b} de espionagem.', 'Uma disputa por uma mina de ouro opõe {a} e {b}.'],
  good: ['{a} e {b} assinaram um acordo comercial.', 'Um casamento real uniu nobres de {a} e {b}.', '{a} enviou ajuda a {b} depois de uma colheita ruim.', 'Bardos de {a} foram aclamados em {b}.']
};
Object.assign(ENEMIES, {
  war_milicia: { name: 'Miliciano', look: { k: 'hum', body: '#7a5a3a' }, hp: 55, dmg: 7, spd: 60, ai: 'melee', xp: 14, armor: 6, gold: [2, 10] },
  war_soldado: { name: 'Soldado', look: { k: 'hum', body: '#a0a8b0' }, hp: 100, dmg: 11, spd: 62, ai: 'melee', xp: 24, armor: 18, gold: [5, 18] },
  war_arqueiro: { name: 'Arqueiro', look: { k: 'hum', body: '#a0a8b0' }, hp: 70, dmg: 10, spd: 60, ai: 'ranged', proj: 'arrow', xp: 22, armor: 10, gold: [4, 15] },
  war_cavaleiro: { name: 'Cavaleiro', look: { k: 'hum', body: '#c0c8d0' }, hp: 170, dmg: 15, spd: 66, ai: 'charge', charge: true, xp: 48, armor: 32, gold: [15, 40] },
  war_mosqueteiro: { name: 'Mosqueteiro Arcano', look: { k: 'hum', body: '#3a4a9a', weapon: 'musketb' }, hp: 80, dmg: 21, spd: 60, ai: 'musket', proj: 'bullet', cd: 2.3, xp: 38, armor: 12, gold: [8, 25] },
  war_elite: { name: 'Elite Real', look: { k: 'hum', body: '#d0d8e0' }, hp: 250, dmg: 20, spd: 66, ai: 'melee', xp: 85, armor: 46, gold: [30, 80] }
});

const War = {
  K: null, _kList: null, liveR: 46, hourAcc: 0,
  // ---------- Reinos ----------
  kingdoms() {
    if (this._kList && this._kSeed === Game.world.seed) { Reino.inject(); return this._kList; }
    const W = Game.world;
    this.K = {};
    const list = [];
    for (const R of W.regions) {
      if (!R.ruler || !KSTYLE[R.id]) continue;
      const cap = W.settlements.find(s => s.region.id === R.id && s.type === 'capital') || W.settlements.find(s => s.region.id === R.id && s.type === 'town');
      if (!cap) continue;
      const k = { id: R.id, name: R.name, short: R.short, color: R.color, race: R.ruler.race || CULTURES[R.culture].race, ruler: R.ruler, cap, cont: R.cont || 0, lvl: R.lvl || [3, 8] };
      this.K[R.id] = k; list.push(k);
    }
    // vizinhos: os 3 reinos mais próximos no mesmo continente
    for (const k of list) {
      k.nb = new Set(list.filter(o => o !== k && o.cont === k.cont).sort((a, b) => dist(a.cap.x, a.cap.y, k.cap.x, k.cap.y) - dist(b.cap.x, b.cap.y, k.cap.x, k.cap.y)).slice(0, 3).map(o => o.id));
    }
    for (const k of list) for (const o of k.nb) this.K[o].nb.add(k.id);
    this._kList = list; this._kSeed = W.seed;
    Reino.inject();
    return this._kList;
  },
  key(a, b) { return a < b ? a + '|' + b : b + '|' + a; },
  st() { const M = Game.mods; if (!M.war) M.war = this.fresh(); return M.war; },
  fresh() {
    this.kingdoms();
    const S = { rel: {}, wars: [], owner: {}, armies: [], battles: [], fields: [], news: [], id: 1, abs: Game.day * 1440 + Game.time, peaceDay: {} };
    const rng = new RNG(Game.world.seed * 3 + 11);
    for (const k of this._kList) for (const o of k.nb) if (k.id < o) S.rel[this.key(k.id, o)] = (KBIAS[this.key(k.id, o)] || 0) + rng.int(-15, 15);
    Game.mods.war = S;
    // a guerra mais antiga do mundo já está acontecendo quando você acorda
    const pairs = Object.entries(S.rel).filter(([p]) => !p.includes('valdoria') && !p.includes('colinas') && p.split('|').every(id => !this.K[id].cont)).sort((a, b) => a[1] - b[1]);
    if (pairs.length) { const [a, b] = pairs[0][0].split('|'); this.declare(a, b, true); }
    return S;
  },
  rel(a, b) { if (a === 'jogador') return Reino.rel(b); if (b === 'jogador') return Reino.rel(a); const v = this.st().rel[this.key(a, b)]; return v === undefined ? 0 : v; },
  atWar(a, b) { if (!a || !b || a === b) return false; return this.st().wars.some(w => (w.a === a && w.b === b) || (w.a === b && w.b === a)); },
  warOf(k) { return this.st().wars.filter(w => w.a === k || w.b === k); },
  ownerOf(s) { if (!s || s.academy || s.region.neutral) return null; if (s.playerVila) return Reino.owner(s); if (s.homeId) return null; const o = this.st().owner[s.id]; return o || (KSTYLE[s.region.id] && s.region.ruler ? s.region.id : null); },
  settlement(id) { return Game.world.settlements.find(s => s.id === id); },
  news(text, imp, ks) {
    const S = this.st();
    S.news.unshift({ day: Game.day, text }); if (S.news.length > 60) S.news.length = 60;
    const P = Game.player;
    const mine = P && ((P.army && ks && ks.includes(P.army.k)) || (ks && Game.level.isWorld && ks.includes(Game.world.regions[Game.world.regAt(Math.floor(P.x / 16), Math.floor(P.y / 16))].id)));
    if (imp || mine) Game.toast('📜 ' + text, imp ? '#ffd080' : '#e0d0b0');
  },
  // ---------- Lados ----------
  playerSide() { const P = Game.player; if (Reino.ativo()) return 'jogador'; return P.army ? P.army.k : (P.tempSide || null); },
  side(a) {
    if (a.faction) return a.faction;
    if (a === Game.player || a.team === 'ally' || a.team === 'player') return 'player';
    if (a.team === 'enemy') return 'monster';
    return null;
  },
  hostile(a, b) {
    const sa = this.side(a), sb = this.side(b);
    if (!sa || !sb || sa === sb) return false;
    if (sa === 'monster' || sb === 'monster') return !(a.scav && b.scav);
    if (sa === 'player' || sb === 'player') {
      const sol = sa === 'player' ? a : b, other = sa === 'player' ? b : a, k = other.faction;
      if (other.provoked === Game.player || other.provoked === sol) return true;
      const S = this.st();
      if (S.angry && S.angry[k] > Game.day * 1440 + Game.time) return true;
      return this.atWar(this.playerSide(), k);
    }
    return this.atWar(sa, sb);
  },
  // ---------- Aparência ----------
  look(k, kind, rng) {
    const K = this.K[k], S = KSTYLE[k], r = WAR_KIND_RANK[kind];
    const race = K.race, sex = rng.chance(race === 'anao' || race === 'orc' ? 0.12 : 0.3) ? 'f' : 'm';
    const L = npcLook(race, sex, rng, 'guard'); delete L.robe; delete L.hood;
    const metal = shade(S.metal, [-0.12, 0, 0.12, 0.22][r]);
    if (S.musket) {
      // exércitos da era industrial: casacas, cintos cruzados, tricórnios, barretinas e gorros de pele
      L.body = r === 0 ? '#6a5040' : r === 2 ? metal : K.color; L.sleeve = r === 2 ? K.color : undefined;
      L.legs = r === 0 ? '#4a3a2a' : '#e8e4dc'; L.boots = '#141418'; L.crossbelt = r !== 2; L.chestplate = r === 2;
      L.helm = r === 2 ? metal : '#1a1a22'; L.helmStyle = r === 0 ? 'tricorne' : r === 3 ? 'bearskin' : 'shako';
      if (r >= 1) L.plume = r === 3 ? '#e02020' : shade(K.color, 0.3);
      if (r === 3) L.pauldron = '#e0c040';
      L.weapon = kind === 'cavaleiro' ? 'sword' : kind === 'milicia' ? rng.pick(['spear', 'musketb']) : 'musketb'; L.wc = '#4a4a52';
      return L;
    }
    if (r === 0) {
      L.body = S.fur ? '#6a5040' : S.cloth ? '#d8c8a0' : '#7a5a3a'; L.legs = '#4a3a2a'; L.tabard = K.color;
      if (S.helm1 === 'turban') { L.helm = '#e8e0d0'; L.helmStyle = 'turban'; } else if (rng.chance(0.5)) L.hood = shade(K.color, -0.35);
    } else {
      L.body = metal; L.legs = shade(metal, -0.4); L.chestplate = r >= 2; L.tabard = K.color;
      L.helm = S.helm1 === 'turban' && r < 2 ? '#e8e0d0' : metal; L.helmStyle = r >= 2 ? S.helm2 : S.helm1;
      if (S.horns) L.helmHorns = true;
      if (r >= 2) { L.plume = K.color; L.cape = K.color; }
      if (r === 3) { L.crest = '#f0c040'; L.pauldron = '#e0b040'; L.tabardSign = '#ffffff'; delete L.plume; }
      if (S.crest && !L.crest) L.crest = shade(K.color, 0.2);
    }
    L.boots = '#2a2018';
    L.weapon = kind === 'arqueiro' ? 'bow' : kind === 'mosqueteiro' ? 'musketb' : rng.pick(S.weapons); L.wc = r >= 2 ? '#e0e8f0' : '#a0a8b0';
    if (r >= 1 && kind !== 'arqueiro' && !['great', 'hammer', 'spear'].includes(L.weapon)) L.shield = K.color;
    return L;
  },
  pickKind(k, rng, n) {
    const S = KSTYLE[k], a = S.archers || 0.2;
    const x = rng.next();
    if (x < 0.03 + Math.min(0.05, n / 2000)) return 'elite';
    if (x < 0.14) return 'cavaleiro';
    if (S.musket) return x < 0.62 ? 'mosqueteiro' : x < 0.8 ? 'soldado' : 'milicia';
    if (x < 0.14 + a) return 'arqueiro';
    if (x < 0.62) return 'soldado';
    return 'milicia';
  },
  makeSoldier(k, kind, x, y, rng) {
    const K = this.K[k];
    const lvl = Math.max(2, K.lvl[0] + WAR_KIND_RANK[kind] * 2);
    // 8 aparências por reino e tipo de tropa: os sprites são reaproveitados entre soldados
    const m = new Monster('war_' + kind, x, y, lvl, { look: this.look(k, kind, new RNG(hashStr(k + kind) + rng.int(0, 7) * 7919)), name: `${ENEMIES['war_' + kind].name} de ${K.short}`, hpMul: 0.55 });
    m.faction = k; m.team = 'war'; m.kind = kind; m.ctrl = 'squad'; m.aggro = 210;
    // infantaria de linha: atira em salvas e luta de baioneta (a elite carrega de baioneta)
    if (m.look.weapon === 'musketb' && kind !== 'elite') { m.ai = 'musket'; m.proj = 'bullet'; m.aggro = 300; if (kind !== 'mosqueteiro') m.dmg *= 1.6; }
    return m;
  },

  // ---------- Diplomacia (diária) ----------
  daily() {
    const S = this.st(), rng = new RNG(Game.world.seed + Game.day * 977);
    const name = id => this.K[id].short;
    for (const k of this._kList) for (const o of k.nb) if (k.id !== 'jogador' && o !== 'jogador' && k.id < o && S.rel[this.key(k.id, o)] === undefined) S.rel[this.key(k.id, o)] = KBIAS[this.key(k.id, o)] || 0;
    for (const [p, v] of Object.entries(S.rel)) {
      const [a, b] = p.split('|');
      if (a === 'jogador' || b === 'jogador' || !this.K[a] || !this.K[b]) continue;
      if (this.atWar(a, b)) continue;
      const base = KBIAS[p] || 0;
      let nv = v + (base - v) * 0.08 + rng.range(-5, 5);
      if (rng.chance(0.1)) {
        const good = rng.chance(0.45);
        const L = good ? WAR_EVENTS.good : WAR_EVENTS.bad;
        nv += good ? rng.int(10, 22) : -rng.int(12, 28);
        const [x, y] = rng.chance(0.5) ? [a, b] : [b, a];
        this.news(rng.pick(L).replace('{a}', name(x)).replace('{b}', name(y)), false, [a, b]);
      }
      S.rel[p] = clamp(nv, -100, 100);
      const busy = id => this.warOf(id).length >= 1;
      const calm = S.peaceDay[p] && Game.day - S.peaceDay[p] < 6;
      if (S.rel[p] < -60 && S.wars.length < 2 && !busy(a) && !busy(b) && !calm && Game.day >= 3 && (Game.day >= 7 || (!p.includes('valdoria') && !p.includes('colinas'))) && rng.chance(0.4)) this.declare(a, b);
    }
    // tratados de paz
    for (const w of S.wars.slice()) {
      const days = Game.day - w.since;
      const armiesA = S.armies.filter(x => x.k === w.a && x.foe === w.b).length, armiesB = S.armies.filter(x => x.k === w.b && x.foe === w.a).length;
      const ch = w.a === 'jogador' || w.b === 'jogador' ? Reino.chancePaz(w) : Math.max(0, days - 3) * 0.06 + (!armiesA || !armiesB ? 0.15 : 0);
      if (rng.chance(ch)) this.peace(w);
    }
    // reforços: cada lado mantém exércitos em campo
    for (const w of S.wars) for (const [k, foe] of [[w.a, w.b], [w.b, w.a]]) {
      if (k === 'jogador' || !this.K[k] || !this.K[foe]) continue;
      const mine = S.armies.filter(x => x.k === k && x.foe === foe);
      if (mine.length < 2 && rng.chance(0.6)) this.raise(k, foe, rng);
      for (const a of mine) if (a.state === 'camp') a.n = Math.min(a.n0, a.n + rng.int(8, 16));
    }
    Naval.daily();
    // campos de batalha antigos somem
    S.fields = S.fields.filter(f => Game.day - f.day < 5);
    // soldo do jogador
    const P = Game.player;
    if (P.army) P.army.owed = Math.min(15, (P.army.owed || 0) + 1);
    Reino.daily(); Mundo.daily();
  },
  declare(a, b, quiet) {
    const S = this.st();
    if (this.atWar(a, b)) return;
    S.wars.push({ a, b, since: Game.day, won: { [a]: [], [b]: [] } });
    if (a === 'jogador' || b === 'jogador') { S.prel = S.prel || {}; S.prel[a === 'jogador' ? b : a] = Math.min(Reino.rel(a === 'jogador' ? b : a), -80); } else S.rel[this.key(a, b)] = -80;
    const rng = new RNG(Game.world.seed + Game.day * 31 + S.id);
    for (let i = 0; i < 2; i++) { this.raise(a, b, rng, quiet ? 0.45 : 0); this.raise(b, a, rng, quiet ? 0.45 : 0); }
    const txt = `${this.K[a].name} declarou guerra a ${this.K[b].name}!`;
    this.news(txt, !quiet, [a, b]);
    if (!quiet && Game.started) { Game.centerMsg('⚔ GUERRA DECLARADA!', `${this.K[a].short} × ${this.K[b].short}`); Sfx.play('shout'); }
  },
  peace(w) {
    const S = this.st();
    S.wars = S.wars.filter(x => x !== w);
    S.armies = S.armies.filter(x => x.k === 'jogador' || !((x.k === w.a && x.foe === w.b) || (x.k === w.b && x.foe === w.a)));
    S.battles = S.battles.filter(bt => S.armies.some(x => x.id === bt.a) && S.armies.some(x => x.id === bt.b));
    if (w.a !== 'jogador' && w.b !== 'jogador') S.rel[this.key(w.a, w.b)] = -15; S.peaceDay[this.key(w.a, w.b)] = Game.day;
    const keepA = w.won[w.a].map(id => this.settlement(id)).filter(s => s && this.ownerOf(s) === w.a).map(s => s.name);
    const keepB = w.won[w.b].map(id => this.settlement(id)).filter(s => s && this.ownerOf(s) === w.b).map(s => s.name);
    let txt = `🕊 Paz entre ${this.K[w.a].short} e ${this.K[w.b].short}.`;
    if (keepA.length) txt += ` ${this.K[w.a].short} fica com ${keepA.join(', ')}.`;
    if (keepB.length) txt += ` ${this.K[w.b].short} fica com ${keepB.join(', ')}.`;
    this.news(txt, true, [w.a, w.b]);
    this.clearLive();
    Reino.onPaz(w);
  },
  // novo exército sai da cidade do reino mais próxima do inimigo
  raise(k, foe, rng, advance = 0) {
    const S = this.st(), W = Game.world;
    if (k === 'jogador' || !this.K[k] || !this.K[foe]) return;
    const mine = W.settlements.filter(s => this.ownerOf(s) === k);
    const fc = this.K[foe].cap;
    if (!mine.length) return;
    mine.sort((x, y) => dist(x.x, x.y, fc.x, fc.y) - dist(y.x, y.y, fc.x, fc.y));
    const from = mine[0];
    const n = rng.int(45, 75);
    const a = { id: S.id++, k, foe, x: from.mid.x, y: from.mid.y + from.h / 2 + 4, n, n0: n, state: 'march', target: null, siegeT: 0, from: from.id };
    if (advance) { a.x = lerp(a.x, fc.x, advance * 0.6); a.y = lerp(a.y, fc.y, advance * 0.6); }
    S.armies.push(a);
  },
  garrison(s) { if (s.playerVila) return Reino.guarnicao(); return s.type === 'capital' ? 75 : s.type === 'town' ? 32 : 14; },
  pickTarget(a) {
    let best = null, bd = Infinity;
    for (const s of Game.world.settlements) {
      if (this.ownerOf(s) !== a.foe) continue;
      const d = dist(a.x, a.y, s.mid.x, s.mid.y) + (s.type === 'capital' ? 400 : 0);
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  },
  army(id) { return this.st().armies.find(a => a.id === id); },
  // ---------- Simulação por hora ----------
  hour() {
    const S = this.st(), rng = new RNG(Game.world.seed + Game.day * 1440 + Math.floor(Game.time));
    for (const a of S.armies) {
      if (a.state === 'battle' || a.state === 'follow') continue;
      if (a.state === 'camp') { a.n = Math.min(a.n0, a.n + 2); if (a.n >= a.n0 * 0.8) { a.state = 'march'; a.target = null; } continue; }
      let s = a.target && this.settlement(a.target);
      if (!s || this.ownerOf(s) !== a.foe) { s = this.pickTarget(a); a.target = s ? s.id : null; if (a.state === 'siege') a.state = 'march'; }
      if (!s) continue;
      if (a.state === 'siege') {
        a.siegeT++;
        if (a.siegeT >= 3) {
          if (s.playerVila && a.k !== 'jogador') { Reino.cerco(a, s); continue; }
          const g = this.garrison(s);
          if (a.n > g) { this.conquer(s, a); a.n -= Math.round(g * 0.4); a.state = 'march'; a.target = null; }
          else { a.n -= Math.round(g * 0.35); this.retreat(a); }
        }
        continue;
      }
      if (a.squad) continue; // movido pelos soldados visíveis
      const d = dist(a.x, a.y, s.mid.x, s.mid.y);
      if (d < 10) { a.state = 'siege'; a.siegeT = 0; continue; }
      const sp = Math.min(d, 9);
      a.x += (s.mid.x - a.x) / d * sp; a.y += (s.mid.y - a.y) / d * sp;
    }
    // encontros
    for (const a of S.armies) for (const b of S.armies) {
      if (a.id >= b.id || a.state === 'battle' || b.state === 'battle' || a.foe !== b.k || b.foe !== a.k) continue;
      if (dist(a.x, a.y, b.x, b.y) < 24) this.startBattle(a, b);
    }
    // batalhas fora da vista
    for (const bt of S.battles.slice()) {
      if (bt.live) continue;
      const A = this.army(bt.a), B = this.army(bt.b);
      if (!A || !B) { S.battles = S.battles.filter(x => x !== bt); continue; }
      bt.h++;
      const la = Math.ceil(B.n * rng.range(0.07, 0.16)), lb = Math.ceil(A.n * rng.range(0.07, 0.16));
      A.n = Math.max(0, A.n - la); B.n = Math.max(0, B.n - lb); bt.dead += la + lb; bt.deadA += la; bt.deadB += lb;
      if (A.n <= bt.a0 * 0.4 || B.n <= bt.b0 * 0.4 || bt.h >= 5) this.resolve(bt, A.n / bt.a0 < B.n / bt.b0 ? 'a' : 'b');
    }
    Naval.hour();
  },
  startBattle(a, b) {
    const S = this.st();
    this.dropSquad(a); this.dropSquad(b);
    a.state = b.state = 'battle';
    const bt = { id: S.id++, a: a.id, b: b.id, x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, ax: a.x - b.x, ay: a.y - b.y, h: 0, a0: a.n, b0: b.n, dead: 0, deadA: 0, deadB: 0, corpses: [] };
    const L = Math.hypot(bt.ax, bt.ay) || 1; bt.ax /= L; bt.ay /= L;
    S.battles.push(bt);
    const near = this.nearName(bt.x, bt.y);
    bt.name = 'Batalha ' + near;
    this.news(`Exércitos de ${this.K[a.k].short} e ${this.K[b.k].short} se enfrentam ${near}!`, false, [a.k, b.k]);
  },
  nearName(x, y) {
    let best = null, bd = Infinity;
    for (const s of Game.world.settlements) { const d = dist(x, y, s.x, s.y); if (d < bd) { bd = d; best = s; } }
    return best ? (bd < 40 ? 'em ' : 'perto de ') + best.name : 'nos campos';
  },
  resolve(bt, loser) {
    const S = this.st();
    S.battles = S.battles.filter(x => x !== bt);
    const A = this.army(bt.a), B = this.army(bt.b);
    const L = loser === 'a' ? A : B, Wn = loser === 'a' ? B : A;
    if (Wn) { Wn.state = 'march'; Wn.target = null; }
    if (L) { if (L.n < 10) { S.armies = S.armies.filter(x => x !== L); } else this.retreat(L); }
    // campo de batalha com os corpos
    const rng = new RNG(bt.id * 7919 + Game.day);
    const corpses = bt.corpses.slice();
    const extra = Math.min(26, Math.round(bt.dead / 3)) - corpses.length;
    const W = Game.world;
    for (let i = 0; i < extra; i++) {
      const ang = rng.range(0, Math.PI * 2), r = rng.range(1, 12);
      const tx = bt.x + Math.cos(ang) * r, ty = bt.y + Math.sin(ang) * r;
      if (W.solidAt(Math.floor(tx), Math.floor(ty)) || TWATER[W.tileAt(Math.floor(tx), Math.floor(ty))]) continue;
      const k = rng.chance(bt.deadA / Math.max(1, bt.dead)) ? (A ? A.k : bt.ka) : (B ? B.k : bt.kb);
      if (!k || !this.K[k]) continue;
      corpses.push({ x: tx * 16 + 8, y: ty * 16 + 10, k, kind: this.pickKind(k, rng, 0), seed: rng.int(1, 1e6), f: rng.chance(0.5) ? 1 : -1 });
    }
    S.fields.push({ id: bt.id, x: bt.x, y: bt.y, day: Game.day, corpses, scav: 0 });
    const wk = Wn ? Wn.k : (loser === 'a' ? bt.kb : bt.ka), lk = L ? L.k : (loser === 'a' ? bt.ka : bt.kb);
    if (wk && lk && this.K[wk] && this.K[lk]) this.news(`${bt.name}: ${this.K[wk].short} venceu ${this.K[lk].short}. ${L && L.n >= 10 ? `O exército de ${this.K[lk].short} recuou e acampou esperando reforços.` : `O exército de ${this.K[lk].short} foi destruído.`}`, !!bt.live, [wk, lk]);
    const P = Game.player;
    if (bt.live && P.army && wk === P.army.k) { P.army.merit += 8; Game.toast('Vitória! +8 de mérito', '#80ff80'); Game.chron(`Lutei na ${bt.name} e ${this.K[wk].short} venceu.`); }
    Reino.onResolve(bt, wk, lk);
    if (bt.live && P.tempSide) P.tempSide = null;
    for (const m of Game.actors) if (m.battleId === bt.id && !m.dead) { m.ctrl = 'victor'; m.battleId = null; }
  },
  retreat(a) {
    const home = this.K[a.k].cap;
    const d = dist(a.x, a.y, home.mid.x, home.mid.y) || 1;
    const step = Math.min(45, d * 0.5);
    let x = a.x + (home.mid.x - a.x) / d * step, y = a.y + (home.mid.y - a.y) / d * step;
    const W = Game.world;
    for (let r = 0; r < 40 && !W.isLand(Math.round(x), Math.round(y)); r++) { x += (home.mid.x - x) * 0.05; y += (home.mid.y - y) * 0.05; }
    a.x = x; a.y = y; a.state = 'camp'; a.target = null;
    this.dropSquad(a);
  },
  conquer(s, a) {
    if (s.playerVila && a.k !== 'jogador') return Reino.vilaCaiu(s, a);
    const S = this.st(), old = this.ownerOf(s);
    S.owner[s.id] = a.k;
    const w = S.wars.find(x => (x.a === a.k && x.b === a.foe) || (x.b === a.k && x.a === a.foe));
    if (w) { if (!w.won[a.k].includes(s.id)) w.won[a.k].push(s.id); if (old && w.won[old]) w.won[old] = w.won[old].filter(id => id !== s.id); }
    const back = s.region.id === a.k;
    this.news(back ? `${this.K[a.k].short} retomou ${s.name}!` : `⚔ ${this.K[a.k].name} conquistou ${s.name}${old ? ` de ${this.K[old].short}` : ''}!`, true, [a.k, old]);
    if (s.active) { const set = new Set(s.npcs || []); Game.actors = Game.actors.filter(x => !set.has(x)); s.active = false; s.npcs = null; }
    Reino.onConquer(s, a);
  },

  // ---------- Quadro a quadro ----------
  update(dt) {
    if (!Game.world || !Game.mods) return;
    const S = this.st();
    this.kingdoms();
    const abs = Game.day * 1440 + Game.time;
    if (abs < S.abs) S.abs = abs;
    let n = 0;
    while (abs - S.abs >= 60 && n < 72) {
      const before = Math.floor(S.abs / 1440);
      S.abs += 60; n++;
      if (Math.floor(S.abs / 1440) !== before) this.daily();
      this.hour();
    }
    if (n >= 72) S.abs = abs;
    if (Game.level !== this._lvl) { this._lvl = Game.level; for (const a of S.armies) a.squad = false; for (const b of S.battles) b.live = false; }
    if (!Game.level.isWorld) return;
    this.live(dt);
  },
  live(dt) {
    const S = this.st(), P = Game.player, ptx = P.x / 16, pty = P.y / 16;
    // batalhas ao vivo
    for (const bt of S.battles.slice()) {
      const d = dist(ptx, pty, bt.x, bt.y);
      if (!bt.live && d < this.liveR) this.spawnBattle(bt);
      else if (bt.live && d > this.liveR + 30) this.unspawnBattle(bt);
      if (bt.live) {
        const A = this.army(bt.a), B = this.army(bt.b);
        if (!A || !B) { this.resolve(bt, !A ? 'a' : 'b'); continue; }
        const aliveA = Game.actors.some(m => m.battleId === bt.id && m.armyId === A.id && !m.dead);
        const aliveB = Game.actors.some(m => m.battleId === bt.id && m.armyId === B.id && !m.dead);
        if (!aliveA || !aliveB) { if (!aliveA) A.n = Math.min(A.n, 9 + Math.floor(A.n * 0.3)); if (!aliveB) B.n = Math.min(B.n, 9 + Math.floor(B.n * 0.3)); this.resolve(bt, !aliveA ? 'a' : 'b'); }
      }
    }
    // exércitos marchando / acampados perto do jogador
    for (const a of S.armies) {
      if (a.state === 'battle') continue;
      const d = dist(ptx, pty, a.x, a.y);
      if (!a.squad && d < 40) this.spawnSquad(a);
      else if (a.squad && d > 70) this.dropSquad(a);
      if (a.squad && a.state === 'march') {
        const lead = Game.actors.find(m => m.armyId === a.id && m.lead && !m.dead);
        if (lead) { a.x = lead.x / 16; a.y = lead.y / 16; const s = a.target && this.settlement(a.target); if (s && dist(a.x, a.y, s.mid.x, s.mid.y) < 10) { a.state = 'siege'; a.siegeT = 0; } }
        else this.dropSquad(a);
      }
    }
    // vencedores voltam ao exército depois de um tempo
    for (const m of Game.actors) if (m.ctrl === 'victor' && !m.dead) { m.vt = (m.vt || 0) + dt; if (m.vt > 25 && dist(m.x, m.y, P.x, P.y) > 200) m.vanish(); }
    // carniceiros nos campos de batalha
    this.scavT = (this.scavT || 0) - dt;
    if (this.scavT <= 0) {
      this.scavT = 3;
      for (const f of S.fields) {
        if (dist(ptx, pty, f.x, f.y) > 40 || !f.corpses.length) continue;
        const live = Game.actors.filter(m => m.scav && m.field === f.id && !m.dead).length;
        if (live >= 4 || f.scav >= 10) continue;
        const c = f.corpses[Math.floor(Math.random() * f.corpses.length)];
        if (dist(c.x, c.y, P.x, P.y) < 120) continue;
        const bio = Game.world.regions[Game.world.regAt(Math.floor(c.x / 16), Math.floor(c.y / 16))].biome;
        const pool = bio === 'snow' ? ['lobo_gelo', 'lobo_gelo', 'urso_polar'] : bio === 'desert' ? ['escorpiao', 'goblin', 'goblin'] : bio === 'swamp' ? ['lagarto', 'goblin'] : ['lobo', 'lobo', 'urso', 'goblin', 'goblin'];
        const id = pool[Math.floor(Math.random() * pool.length)];
        const ang = Math.random() * Math.PI * 2;
        const m = new Monster(id, c.x + Math.cos(ang) * 60, c.y + Math.sin(ang) * 60, Math.max(2, P.level));
        Game.findFree(m); m.scav = c; m.field = f.id; m.ctrl = 'scav'; m.aggro = 64; m.home = { x: c.x, y: c.y };
        Game.actors.push(m); f.scav++;
      }
    }
  },
  spawnBattle(bt) {
    const A = this.army(bt.a), B = this.army(bt.b);
    if (!A || !B) return;
    bt.live = true; bt.ka = A.k; bt.kb = B.k;
    const rng = new RNG(bt.id * 131 + Game.day);
    for (const [ar, sign] of [[A, 1], [B, -1]]) {
      const cnt = clamp(Math.ceil(ar.n / 5), 3, 11), repr = ar.n / cnt;
      for (let i = 0; i < cnt; i++) {
        const along = 5 + rng.range(0, 3), side = rng.range(-6, 6);
        const tx = bt.x + bt.ax * along * sign - bt.ay * side, ty = bt.y + bt.ay * along * sign + bt.ax * side;
        const m = this.makeSoldier(ar.k, ar.k === 'jogador' ? Reino.kind(ar, rng) : this.pickKind(ar.k, rng, ar.n), tx * 16 + 8, ty * 16 + 8, rng);
        Game.findFree(m); m.home = { x: bt.x * 16 + 8, y: bt.y * 16 + 8 };
        m.ctrl = 'battle'; m.battleId = bt.id; m.armyId = ar.id; m.repr = repr; m.aggro = m.ai === 'musket' ? 400 : 320;
        Game.actors.push(m);
      }
      // mosqueteiros formam uma linha atrás da infantaria, de frente para o inimigo
      const line = Game.actors.filter(m => m.battleId === bt.id && m.armyId === ar.id && m.ai === 'musket');
      line.forEach((m, k) => { const along = 10, side = (k - (line.length - 1) / 2) * 1.5; const lx = bt.x + bt.ax * along * sign - bt.ay * side, ly = bt.y + bt.ay * along * sign + bt.ax * side; m.line = { x: lx * 16 + 8, y: ly * 16 + 8 }; m.x = m.line.x; m.y = m.line.y; Game.findFree(m); });
    }
  },
  unspawnBattle(bt) {
    bt.live = false;
    Game.actors = Game.actors.filter(m => m.battleId !== bt.id || m.dead);
  },
  spawnSquad(a) {
    a.squad = true;
    const rng = new RNG(a.id * 17 + Game.day);
    const cnt = clamp(Math.ceil(a.n / 9), 3, 8);
    for (let i = 0; i < cnt; i++) {
      const m = this.makeSoldier(a.k, a.k === 'jogador' ? Reino.kind(a, rng) : i === 0 ? (a.n > 50 ? 'cavaleiro' : 'soldado') : this.pickKind(a.k, rng, a.n), a.x * 16 + (i % 3 - 1) * 14, a.y * 16 + Math.floor(i / 3) * 14, rng);
      Game.findFree(m); m.armyId = a.id; m.slot = i; m.lead = i === 0; m.home = { x: m.x, y: m.y };
      if (m.lead) m.flagC = this.K[a.k].color;
      Game.actors.push(m);
    }
  },
  dropSquad(a) {
    if (!a.squad) return;
    a.squad = false;
    Game.actors = Game.actors.filter(m => !(m.armyId === a.id && m.ctrl === 'squad'));
  },
  clearLive() {
    Game.actors = Game.actors.filter(m => !(m.faction && (m.ctrl === 'squad' || m.ctrl === 'battle' || m.ctrl === 'victor')));
    const S = this.st(); for (const a of S.armies) a.squad = false; for (const b of S.battles) b.live = false;
  },
  // ---------- Mosqueteiros: linha de tiro, salvas e baioneta ----------
  nearFoe(m, r) {
    // resultado guardado por um instante (cada mosqueteiro não precisa procurar a cada quadro)
    if (m._nfT > Game.t && m._nfR === r) return m._nf && !m._nf.dead ? m._nf : null;
    m._nfT = Game.t + 0.15 + Math.random() * 0.1; m._nfR = r;
    let best = null, bd = r * r;
    const P = Game.player;
    for (const a of P ? [P].concat(Game.actors) : Game.actors) { if (a.dead || a === m) continue; const d = dist2(m.x, m.y, a.x, a.y); if (d < bd && isHostile(m, a)) { bd = d; best = a; } }
    return (m._nf = best);
  },
  musketAI(m, t, d, dt, sf) {
    // inimigo colado: calar baionetas e lutar corpo a corpo
    const close = this.nearFoe(m, 34);
    if (close) {
      if (!m.fixed) { m.fixed = true; if (Math.random() < 0.35) Game.floater(m.x, m.y - 28, 'Baionetas!', '#ffd0a0'); }
      m.target = close; m.fireDelay = undefined;
      const dd = dist(m.x, m.y, close.x, close.y), reach = m.r + close.r + 15;
      if (dd > reach) m.moveToward(close.x, close.y, m.spd * 0.9 * sf, dt);
      else { m.setDir(angleTo(m.x, m.y, close.x, close.y)); if (m.atkCd <= 0) m.startAttack('bayonet', 0.24); }
      return;
    }
    m.fixed = false;
    // posição: a linha da batalha ou um arco de frente para o inimigo
    let lx, ly;
    if (m.line) { lx = m.line.x; ly = m.line.y; }
    else { const a = angleTo(t.x, t.y, m.x, m.y) + ((m.id % 5) - 2) * 0.13; lx = t.x + Math.cos(a) * 150; ly = t.y + Math.sin(a) * 150; }
    const off = dist(m.x, m.y, lx, ly);
    if (off > 8 && d > 60) m.moveToward(lx, ly, m.spd * 0.75 * sf, dt);
    else m.setDir(angleTo(m.x, m.y, t.x, t.y));
    // salvas sincronizadas por unidade
    const key = (m.battleId ? 'b' + m.battleId : 'a' + (m.armyId || 0)) + m.faction;
    this.volleys = this.volleys || {};
    const g = this.volleys[key] || (this.volleys[key] = { t: 2 + Math.random() * 1.5, said: false, fireT: -9, stamp: -1 });
    if (g.stamp !== Game.t) {
      g.stamp = Game.t; g.t -= dt;
      if (g.t < 1.3 && !g.said) { g.said = true; Game.floater(m.x, m.y - 30, 'Apontar!', '#ffe0a0'); }
      if (g.t <= 0) { g.t = 4 + Math.random() * 1.2; g.said = false; g.fireT = Game.t; Game.floater(m.x, m.y - 30, 'FOGO!', '#ff9060', 1); }
    }
    const ready = off <= 14 && d < 380;
    m.aimT = ready && g.t < 1.3 ? 0.3 : Math.max(0, (m.aimT || 0) - dt);
    if (ready && g.fireT > (m.lastVolley || -9) && Game.t - g.fireT < 0.5) { m.lastVolley = g.fireT; m.fireDelay = Math.random() * 0.3; }
    if (m.fireDelay !== undefined) { m.fireDelay -= dt; if (m.fireDelay <= 0) { m.fireDelay = undefined; m.aimT = 0.5; m.startAttack('shoot', 0.02); } }
  },
  // movimento sem alvo (chamado pela IA dos monstros)
  steer(m, dt, sf) {
    if (m.ctrl === 'scav') {
      const c = m.scav; if (!c) return false;
      const d = dist(m.x, m.y, c.x + 8, c.y);
      if (d > 6) { m.moveToward(c.x + 8, c.y, m.spd * 0.7 * sf, dt); return true; }
      m.setDir(Math.PI); m.eatT = (m.eatT || 0) + dt;
      if (m.eatT > 0.5) { m.eatT = 0; m.anim += 0.4; if (Math.random() < 0.6) Game.particle(c.x + 4, c.y - 2, (Math.random() - 0.5) * 20, -20, '#8a1010', 0.5, 1, 80); }
      return true;
    }
    if (m.ctrl === 'squad') {
      const a = this.army(m.armyId); if (!a) return false;
      let tx, ty;
      if (a.state === 'march') {
        if (m.lead) { const s = a.target && this.settlement(a.target); if (!s) return true; tx = s.mid.x * 16 + 8; ty = (s.mid.y + s.h / 2 + 3) * 16; }
        else { const L = Game.actors.find(x => x.armyId === a.id && x.lead && !x.dead); if (!L) return false; const row = Math.floor((m.slot - 1) / 3) + 1, col = (m.slot - 1) % 3 - 1; const ang = L.face || 0; tx = L.x - Math.cos(ang) * row * 14 - Math.sin(ang) * col * 12; ty = L.y - Math.sin(ang) * row * 14 + Math.cos(ang) * col * 12; }
      } else {
        const ang = m.slot / 8 * Math.PI * 2; tx = a.x * 16 + Math.cos(ang) * 44; ty = a.y * 16 + Math.sin(ang) * 30;
      }
      const d = dist(m.x, m.y, tx, ty);
      if (d > (m.lead ? 2 : 6)) { m.moveToward(tx, ty, m.spd * (m.lead ? 0.55 : d > 30 ? 0.9 : 0.6) * sf, dt); if (m.lead) m.face = angleTo(m.x, m.y, tx, ty); return true; }
      return true;
    }
    if (m.ctrl === 'battle') { const bt = this.st().battles.find(b => b.id === m.battleId); if (bt) { const tx = bt.x * 16 + 8, ty = bt.y * 16 + 8; if (dist(m.x, m.y, tx, ty) > 30) { m.moveToward(tx, ty, m.spd * sf, dt); return true; } } return false; }
    if (m.ctrl === 'victor') return true;
    return false;
  },
  // ---------- Mortes, mérito e corpos ----------
  onDeath(m, killer) {
    const P = Game.player;
    if (m.armyId) { const a = this.army(m.armyId); if (a) a.n = Math.max(0, a.n - (m.repr || 1)); }
    if (m.battleId) { const bt = this.st().battles.find(b => b.id === m.battleId); if (bt) { bt.corpses.push({ x: m.x - 8, y: m.y, k: m.faction, kind: m.kind, seed: Math.floor(Math.random() * 1e6), f: Math.random() < 0.5 ? 1 : -1 }); bt.dead++; if (bt.a === m.armyId) bt.deadA++; else bt.deadB++; } }
    else if (m.faction && m.kind) {
      // morto fora de batalha: vira um pequeno campo
      const S = this.st(); let f = S.fields.find(f => dist(f.x, f.y, m.x / 16, m.y / 16) < 20);
      if (!f) { f = { id: S.id++, x: m.x / 16, y: m.y / 16, day: Game.day, corpses: [], scav: 0 }; S.fields.push(f); }
      f.corpses.push({ x: m.x - 8, y: m.y, k: m.faction, kind: m.kind, seed: Math.floor(Math.random() * 1e6), f: 1 });
    }
    const byPlayer = killer === P || (killer && killer.team === 'ally');
    if (m.faction && byPlayer && m.faction !== 'jogador') Reino.addRel(m.faction, -1);
    if (m.faction && byPlayer) {
      P.addXP(m.xp); Game.floater(m.x, m.y - 30, '+' + m.xp, '#c0a0ff'); P.stats.kills++;
      if (P.army && this.atWar(P.army.k, m.faction)) { const g = [1, 2, 2, 4, 7][['milicia', 'soldado', 'arqueiro', 'cavaleiro', 'elite'].indexOf(m.kind)] || 1; P.army.merit += g; P.army.kills = (P.army.kills || 0) + 1; }
      else if (!P.army && !P.tempSide) { const S = this.st(); S.angry = S.angry || {}; S.angry[m.faction] = Game.day * 1440 + Game.time + 600; }
    }
  },
  corpseImg(c) {
    const key = c.k + c.kind + c.seed + c.f;
    this._cimg = this._cimg || new Map();
    let im = this._cimg.get(key);
    if (im) return im;
    if (this._cimg.size > 120) this._cimg.clear();
    const L = this.look(c.k, c.kind, new RNG(c.seed));
    const spr = Sprites.actor(L).right[0];
    im = Sprites.cv(34, 24); const x = im.getContext('2d');
    x.fillStyle = 'rgba(110,10,10,0.55)'; x.beginPath(); x.ellipse(17, 15, 12, 4.5, 0, 0, Math.PI * 2); x.fill();
    x.fillStyle = 'rgba(80,0,0,0.5)'; x.beginPath(); x.ellipse(20, 16, 6, 2.5, 0, 0, Math.PI * 2); x.fill();
    x.save(); x.translate(17, 13); x.rotate(c.f * Math.PI / 2); x.globalAlpha = 0.92; x.filter = 'brightness(0.8)'; x.drawImage(spr, -spr.width / 2, -spr.height / 2); x.restore();
    if (c.looted) { x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(30,20,20,0.25)'; x.fillRect(0, 0, 34, 24); }
    if (L.weapon && !c.looted) { const w = Sprites.weapon(L.weapon, L.wc); x.globalCompositeOperation = 'source-over'; x.save(); x.translate(26, 19); x.rotate(0.4); x.drawImage(w, -10, -8); x.restore(); }
    this._cimg.set(key, im);
    return im;
  },
  nearCorpse(fx, fy) {
    const S = this.st(); let best = null, bd = 16;
    for (const f of S.fields) { if (dist(fx / 16, fy / 16, f.x, f.y) > 30) continue; for (const c of f.corpses) { if (c.looted) continue; const d = dist(fx, fy, c.x + 8, c.y); if (d < bd) { bd = d; best = c; } } }
    return best;
  },
  loot(c) {
    const P = Game.player, r = WAR_KIND_RANK[c.kind] || 0, rng = new RNG(c.seed + 5);
    c.looted = true;
    const slots = r >= 1 && c.kind !== 'arqueiro' && !KSTYLE[c.k].musket ? ['body', 'body', 'head', 'head', 'shield'] : ['body', 'head'];
    if (KSTYLE[c.k].musket) { P.addItem(Items.make('bala_arcana', rng.int(3, 9))); if (c.kind === 'mosqueteiro' && rng.chance(0.1)) { P.addItem(Items.make('mosquete_arcano')); Game.toast('Você pegou um Mosquete Arcano!', '#80c0ff'); } }
    const id = `war_${c.k}_${r}_${rng.pick(slots)}_d`;
    if (ITEMS[id]) { P.addItem(Items.make(id)); Game.toast(`Você pegou: ${ITEMS[id].name}`, '#e0d0b0'); }
    if (rng.chance(0.5)) { const g = rng.int(3, 12 + r * 10); P.gold += g; Game.toast(`+${g} ouro`, '#ffd040'); }
    Sfx.play('pickup');
    this._cimg && this._cimg.forEach((v, k) => { if (k.startsWith(c.k + c.kind + c.seed)) this._cimg.delete(k); });
  },
  // ---------- Desenho no mundo ----------
  flagImg(col) {
    this._flags = this._flags || {};
    if (this._flags[col]) return this._flags[col];
    const c = Sprites.cv(14, 30), p = Sprites.P(c.getContext('2d'));
    p(1, 0, '#e0c060', 2, 2); p(1, 2, '#6a4a2a', 2, 28);
    for (let y = 0; y < 12; y++) { const w = 10 - (y > 8 ? (y - 8) * 2 : 0); p(3, 3 + y, y % 4 === 0 ? shade(col, 0.2) : col, w, 1); }
    p(6, 6, '#f0e0a0', 3, 4); p(7, 5, '#f0e0a0', 1, 6);
    this._flags[col] = c;
    return c;
  },
  drawables(D, camX, camY, vw, vh) {
    const S = this.st(), anim = Math.floor(Game.t * 4) % 2;
    const inView = (x, y, m = 40) => x > camX - m && y > camY - m && x < camX + vw + m && y < camY + vh + m;
    for (const f of S.fields) {
      if (!inView(f.x * 16, f.y * 16, 260)) continue;
      for (const c of f.corpses) { if (!inView(c.x, c.y)) continue; const im = this.corpseImg(c); D.push({ y: c.y - 6, img: im, x: c.x - 9, yy: c.y - 15 }); }
    }
    for (const a of S.armies) {
      if (a.state !== 'camp' && a.state !== 'siege') continue;
      const cx = a.x * 16, cy = a.y * 16;
      if (!inView(cx, cy, 120)) continue;
      const tents = [[-50, -24], [40, -28], [-36, 30], [52, 22], [0, -44]];
      tents.forEach(([dx, dy], i) => { const s = Sprites.obj(O.TENT, (a.id + i) % 3); D.push({ y: cy + dy + 15, img: s.c, x: cx + dx + 8 - (s.w >> 1), yy: cy + dy + 16 - s.h + s.oy }); });
      const fire = Sprites.obj(O.CAMPFIRE, 0, anim); D.push({ y: cy + 15, img: fire.c, x: cx + 8 - (fire.w >> 1), yy: cy + 16 - fire.h + fire.oy });
      const fl = this.flagImg(this.K[a.k].color); D.push({ y: cy - 10, img: fl, x: cx + 20, yy: cy - 40 });
    }
    // bandeiras das cidades ocupadas
    for (const s of Game.world.settlements) {
      const o = S.owner[s.id];
      if (!o || o === s.region.id || !this.K[o]) continue;
      const x = s.mid.x * 16 + 30, y = s.mid.y * 16;
      if (!inView(x, y)) continue;
      const fl = this.flagImg(this.K[o].color); D.push({ y: y + 2, img: fl, x, yy: y - 28 });
    }
    // porta-bandeira do exército
    for (const m of Game.actors) if (m.lead && m.flagC && !m.dead && inView(m.x, m.y)) { const fl = this.flagImg(m.flagC); D.push({ y: m.y + 0.5, img: fl, x: m.x - 2, yy: m.y - 44 }); }
  },
  // ---------- Itens dos exércitos ----------
  defineItems() {
    for (const R of REGIONS) {
      const S = KSTYLE[R.id]; if (!S || !R.ruler) continue;
      for (let r = 0; r < 4; r++) {
        const rk = WAR_RANKS[r], metal = shade(S.metal, [-0.12, 0, 0.12, 0.22][r]);
        const MK = !!S.musket;
        const bodyLook = MK ? { crossbelt: r !== 2, sleeve: r === 2 ? R.color : undefined } : { tabard: R.color };
        if (MK && r === 3) bodyLook.pauldron = '#e0c040'; if (r >= 2) bodyLook.cape = R.color; if (r === 3) { bodyLook.pauldron = '#e0b040'; bodyLook.tabardSign = '#ffffff'; }
        const headLook = MK ? { helmStyle: ['tricorne', 'shako', 'shako', 'bearskin'][r], plume: r >= 1 ? (r === 3 ? '#e02020' : shade(R.color, 0.3)) : undefined } : { helmStyle: r === 0 ? (S.helm1 === 'turban' ? 'turban' : undefined) : r >= 2 ? S.helm2 : S.helm1 };
        if (!MK) { if (S.horns && r > 0) headLook.helmHorns = true; if (r === 2) headLook.plume = R.color; if (r === 3) headLook.crest = '#f0c040'; else if (S.crest && r > 0) headLook.crest = shade(R.color, 0.2); }
        const bodyC = MK ? (r === 0 ? '#6a5040' : r === 2 ? metal : R.color) : r === 0 ? (S.fur ? '#6a5040' : S.cloth ? '#d8c8a0' : '#7a5a3a') : metal;
        const headC = MK ? (r === 2 ? metal : '#1a1a22') : r === 0 ? (S.helm1 === 'turban' ? '#e8e0d0' : shade(R.color, -0.35)) : metal;
        const base = [
          ['body', MK ? (r === 2 ? 'Couraça' : 'Casaca') : 'Armadura', [10, 24, 42, 64][r], bodyC, bodyLook, MK ? (r === 2 ? 'ferro' : 'couro') : r === 0 ? 'couro' : 'ferro'],
          ['head', MK ? ['Tricórnio', 'Barretina', 'Barretina', 'Gorro de Pele'][r] : 'Elmo', [3, 8, 15, 23][r], headC, headLook, MK || r > 0 || S.helm1 === 'turban' ? 'ferro' : 'couro']
        ];
        if (r >= 1 && !MK) base.push(['shield', 'Escudo', [0, 12, 20, 30][r], R.color, null, 'ferro']);
        for (const [slot, nm, ar, col, wl, mat] of base) {
          const def = { type: 'armor', slot: slot === 'shield' ? 'offhand' : slot, akind: slot, mat, armor: ar, icon: { k: slot, c: col }, lvl: rk.lvl, wlook: wl, kingdom: R.id, tier: r + 1 };
          const name = r === 0 && slot === 'head' && mat === 'couro' ? 'Capuz' : nm;
          idef(`war_${R.id}_${r}_${slot}`, Object.assign({}, def, { name: `${name} de ${rk.name} (${R.short})`, value: Math.round(ar * 9 + r * 60) }));
          idef(`war_${R.id}_${r}_${slot}_d`, Object.assign({}, def, { name: `${name} de ${rk.name} (${R.short}) danificado`, armor: Math.max(1, Math.round(ar * 0.45)), value: Math.round(ar * 2.5 + 3), damaged: true }));
        }
      }
    }
  },
  giveGear(k, r) {
    const P = Game.player, S = KSTYLE[k];
    const ids = [`war_${k}_${r}_body`, `war_${k}_${r}_head`]; if (r >= 1 && !S.musket) ids.push(`war_${k}_${r}_shield`);
    const wid = S.musket ? ['sword_ferro', 'mosquete_arcano', 'bacamarte_arcano', 'mosquete_imperial'][r] : `${S.wItem}_${['ferro', 'aco', S.mat2 || 'aco', 'vidro'][r]}`; if (ITEMS[wid]) ids.push(wid);
    if (S.musket) P.addItem(Items.make('bala_arcana', 40 + r * 20), true);
    for (const id of ids) { const it = Items.make(id); P.addItem(it, true); P.equipItem(P.findItem(it.u), true); }
    P.recalc(); P.buildLook();
    if (r === 2 && !P.mount) { P.mount = 'cavalo_guerra'; P.hasHorse = true; P.horse = { x: P.x + 20, y: P.y, dir: 'right' }; Game.toast('Você recebeu um Cavalo de Guerra!', '#ffd080'); }
  },
  // ---------- Castelo: alistamento ----------
  castleOptions(b, opts) {
    const P = Game.player, s = b.settlement, k = this.ownerOf(s);
    if (!k || !this.K[k]) return '';
    const K = this.K[k];
    const wars = this.warOf(k).map(w => this.K[w.a === k ? w.b : w.a].short);
    let txt = `<br><br><b>${esc(K.name)}</b> ${wars.length ? `<span class="bad">está em guerra contra ${esc(wars.join(', '))}.</span>` : '<span class="good">está em paz.</span>'}`;
    if (k !== 'jogador') opts.push({ label: `🕊 Diplomacia com ${K.short}`, fn: () => Reino.diplo(k, () => UI.building(b)) });
    if (k === 'jogador') { /* o seu próprio castelo */ }
    else if (Reino.ativo()) txt += `<br><span class="dim">Você é ${Reino.titulo().toLowerCase()} do ${esc(Reino.nome())}.</span>`;
    else if (!P.army) {
      opts.unshift({ label: `⚔ Alistar-se no exército de ${K.short}`, cls: 'gold', fn: () => this.enlist(b, k) });
    } else if (P.army.k === k) {
      const A = P.army, R = WAR_RANKS[A.rank], N = WAR_RANKS[A.rank + 1];
      txt += `<br>Seu posto: <b class="gold">${R.name}</b> • Mérito: ${A.merit}${N ? `/${N.merit}` : ''} • Soldo: ${R.pay}/dia`;
      if (A.owed) opts.unshift({ label: `💰 Receber soldo (${A.owed * R.pay} ouro)`, cls: 'gold', fn: () => { const g = A.owed * R.pay; P.gold += g; A.owed = 0; Sfx.play('coin'); Game.toast(`+${g} ouro de soldo`, '#ffd040'); UI.building(b); } });
      if (N) opts.push({ label: `🎖 Pedir promoção a ${N.name}`, fn: () => this.promote(b) });
      if (wars.length) opts.push({ label: '📯 Receber ordens', fn: () => { Game.track = 'war'; UI.close(); const t = this.orderTarget(); Game.toast(t ? `Ordens: junte-se ao exército ${t.name}. Siga a bússola!` : 'Sem ordens no momento.', '#ffd080'); } });
      opts.push({ label: 'Dar baixa do exército', cls: 'danger', fn: () => UI.confirm('Deixar o exército? Você mantém seu equipamento.', () => { Game.chron(`Dei baixa do exército de ${K.short} como ${R.name}.`); P.army = null; UI.building(b); }, () => UI.building(b)) });
    } else txt += `<br><span class="dim">Você serve ao exército de ${esc(this.K[P.army.k].short)}.</span>`;
    return txt;
  },
  enlist(b, k) {
    const P = Game.player, K = this.K[k];
    UI.dialog(b.owner.name, UI.ownerLook(b), `Então quer servir a ${esc(K.name)}? Começará como <b>Miliciano</b>, com uma lança velha e um gibão. Lute bem e subirá a Soldado, Cavaleiro e quem sabe à Elite Real.<br><br><span class="dim">Atenção: os reinos em guerra contra ${esc(K.short)} passarão a ser seus inimigos.</span>`, [
      { label: 'Juro lealdade!', cls: 'gold', fn: () => { P.army = { k, rank: 0, merit: 0, owed: 0, since: Game.day, kills: 0 }; this.giveGear(k, 0); Sfx.play('quest'); UI.close(); Game.centerMsg('ALISTADO!', `Miliciano de ${K.short}`); Game.chron(`Me alistei no exército de ${K.name} como miliciano.`); } },
      { label: 'Ainda não', fn: () => UI.building(b) }
    ]);
  },
  promote(b) {
    const P = Game.player, A = P.army, N = WAR_RANKS[A.rank + 1], K = this.K[A.k];
    if (A.merit < N.merit) return UI.dialog(b.owner.name, UI.ownerLook(b), `Ainda não. Você precisa de ${N.merit} de mérito (tem ${A.merit}). Lute nas batalhas de ${esc(K.short)}!`, [{ label: 'Voltar', fn: () => UI.building(b) }]);
    if (P.level < N.lvl) return UI.dialog(b.owner.name, UI.ownerLook(b), `Coragem você tem, mas falta experiência. Volte no nível ${N.lvl}.`, [{ label: 'Voltar', fn: () => UI.building(b) }]);
    A.rank++;
    this.giveGear(A.k, A.rank);
    Sfx.play('levelup'); UI.close();
    Game.centerMsg('PROMOVIDO!', `${N.name} de ${K.short}`);
    Game.chron(`Fui promovido(a) a ${N.name} do exército de ${K.short}.`);
  },
  orderTarget() {
    const P = Game.player, S = this.st();
    const side = this.playerSide(); if (!side) return null;
    let best = null, bd = Infinity;
    for (const bt of S.battles) { const A = this.army(bt.a), B = this.army(bt.b); if (!A || !B || (A.k !== side && B.k !== side)) continue; const d = dist(P.x / 16, P.y / 16, bt.x, bt.y); if (d < bd) { bd = d; best = { x: bt.x, y: bt.y, name: bt.name.replace('Batalha ', 'na batalha ') }; } }
    if (best) return best;
    for (const a of S.armies) { if (a.k !== side) continue; const d = dist(P.x / 16, P.y / 16, a.x, a.y); if (d < bd) { bd = d; best = { x: a.x, y: a.y, name: this.nearName(a.x, a.y) }; } }
    return best;
  },
  talk(a) {
    const P = Game.player, K = this.K[a.faction];
    const opts = [];
    let txt = a.ctrl === 'battle' ? 'Saia do caminho, a batalha está feia!' : a.ctrl === 'squad' ? `Marchamos por ${esc(K.name)}!` : 'A guerra acabou para nós aqui.';
    if (a.battleId && !P.army && P.tempSide !== a.faction) opts.push({ label: `⚔ Lutar ao lado de ${K.short}`, cls: 'gold', fn: () => { P.tempSide = a.faction; UI.close(); Game.toast(`Você luta por ${K.short} nesta batalha!`, '#ffd080'); } });
    if (P.army && P.army.k === a.faction) txt = `${WAR_RANKS[P.army.rank].name}! Bom ter você conosco.`;
    opts.push({ label: 'Tchau' });
    UI.dialog(a.name, a.look, txt, opts);
  },
  // ---------- Menu "Reinos" ----------
  tab(f) {
    const P = Game.player, S = this.st();
    const ks = this.kingdoms();
    const status = (a, b) => this.atWar(a, b) ? '<span class="bad">⚔ Guerra</span>' : this.rel(a, b) < -40 ? '<span class="warn">Tensão</span>' : this.rel(a, b) > 40 ? '<span class="good">Aliados</span>' : 'Paz';
    const mine = P.army ? `<div class="quest main"><b class="gold">${WAR_RANKS[P.army.rank].name} de ${esc(this.K[P.army.k].name)}</b><br><small>Mérito ${P.army.merit} • Inimigos abatidos: ${P.army.kills || 0} • Soldo a receber: ${(P.army.owed || 0) * WAR_RANKS[P.army.rank].pay} ouro</small></div>` : '<div class="quest"><small class="dim">Você não serve a nenhum exército. Aliste-se no castelo de um reino.</small></div>';
    const wars = S.wars.map(w => { const cA = Game.world.settlements.filter(s => this.ownerOf(s) === w.a).length, cB = Game.world.settlements.filter(s => this.ownerOf(s) === w.b).length; return `<div class="quest"><b class="bad">⚔ ${esc(this.K[w.a].short)} × ${esc(this.K[w.b].short)}</b> <small class="dim">desde o dia ${w.since}</small><br><small>Cidades: ${esc(this.K[w.a].short)} ${cA} • ${esc(this.K[w.b].short)} ${cB}${w.won[w.a].length + w.won[w.b].length ? ` • Conquistas: ${w.won[w.a].length + w.won[w.b].length}` : ''}</small></div>`; }).join('') || '<div class="quest"><small class="good">Nenhuma guerra no momento.</small></div>';
    const rows = ks.map(k => { const cities = Game.world.settlements.filter(s => this.ownerOf(s) === k.id).length; const nb = [...k.nb].map(o => `${esc(this.K[o].short)}: ${status(k.id, o)}`).join(' • '); return `<div class="quest"><b style="color:${k.color}">■</b> <b>${esc(k.name)}</b> <small class="dim">${esc(k.ruler.title)} ${esc(k.ruler.name)} • ${cities} cidades</small><br><small>${nb}</small></div>`; }).join('');
    const news = S.news.slice(0, 14).map(n => `<div class="chron"><small class="dim">Dia ${n.day}</small> ${esc(n.text)}</div>`).join('') || '<small class="dim">Sem notícias.</small>';
    return `<div class="qcol">${mine}${Reino.tabHTML()}<div class="sub">Guerras</div>${wars}<div class="sub">Reinos e diplomacia</div>${rows}<div class="sub">Notícias</div>${news}</div>`;
  },
  // ---------- Mapa ----------
  drawMap(ctx, toS, z) {
    const S = this.st();
    Naval.drawMap(ctx, toS);
    for (const s of Game.world.settlements) { const o = S.owner[s.id]; if (!o || o === s.region.id || !this.K[o]) continue; const [x, y] = toS(s.x, s.y); ctx.strokeStyle = this.K[o].color; ctx.lineWidth = 3; ctx.strokeRect(x - 9, y - 9, 18, 18); }
    for (const a of S.armies) { const [x, y] = toS(a.x, a.y); ctx.fillStyle = '#000'; ctx.fillRect(x - 4, y - 9, 9, 7); ctx.fillStyle = this.K[a.k].color; ctx.fillRect(x - 3, y - 8, 7, 5); ctx.fillStyle = '#6a4a2a'; ctx.fillRect(x - 4, y - 9, 1, 12); if (a.state === 'camp') { ctx.fillStyle = '#e0d0a0'; ctx.fillText('⛺', x + 9, y + 4); } }
    for (const b of S.battles) { const [x, y] = toS(b.x, b.y); ctx.fillStyle = '#000'; ctx.fillText('⚔', x + 1, y + 6); ctx.fillStyle = '#ff5040'; ctx.fillText('⚔', x, y + 5); }
    for (const f of S.fields) { const [x, y] = toS(f.x, f.y); ctx.fillStyle = 'rgba(160,20,20,0.6)'; ctx.fillRect(x - 3, y - 3, 6, 6); }
    void z;
  }
};
War.defineItems();
