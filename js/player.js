'use strict';
// ===================== JOGADOR =====================
const EQUIP_SLOTS = ['weapon', 'offhand', 'head', 'body', 'feet', 'ring', 'neck'];
const SLOT_NAMES = { weapon: 'Arma', offhand: 'Escudo', head: 'Cabeça', body: 'Corpo', feet: 'Pés', ring: 'Anel', neck: 'Amuleto' };

class Player extends Actor {
  constructor(o) {
    super(o.x || 0, o.y || 0);
    this.team = 'player'; this.r = 5;
    this.name = o.name; this.race = o.race; this.cls = o.cls; this.app = o.app;
    this.level = 1; this.xp = 0; this.base = { hp: 0, mp: 0, st: 0 }; this.perkPts = 0; this.perks = new Set(); this.pendingLevels = 0;
    const C = CLASSES[o.cls];
    this.gold = 60 + (C.gold || 0);
    this.inv = []; this.equip = { weapon: null, offhand: null, head: null, body: null, feet: null, ring: null, neck: null };
    this.spells = C.spells.slice(); this.spellIdx = 0;
    this.shouts = []; this.shoutLvl = {}; this.shoutIdx = 0; this.souls = 0;
    this.skills = {}; for (const k in SKILLS) this.skills[k] = { lvl: 5 + (C.skills[k] || 0), xp: 0 };
    this.quests = []; this.guilds = {}; this.main = 0; this.doneQuests = 0;
    this.buffs = []; this.cds = {}; this.hasHorse = false; this.mounted = false; this.houses = []; this.storage = {};
    this.follower = null;
    this.stats = { kills: 0, bosses: 0, dragons: 0, quests: 0, deaths: 0, chests: 0, playTime: 0, dist: 0 };
    this.rolling = 0; this.atkT = 0; this.castT = 0; this.swing = null; this.lastHurt = 99; this.invuln = 0; this.invisible = 0;
    this.hurtAcc = 0; this.h = 22;
    this.lastTown = null;
    if (!o.noItems) {
      for (const spec of C.items) {
        const [id, n] = Items.parse(spec);
        const it = Items.make(id, n);
        this.addItem(it, true);
        const d = ITEMS[id];
        if (d.slot && !this.equip[d.slot]) this.equipItem(this.findItem(it.u), true);
      }
      this.addItem(Items.make('pao', 3), true);
      this.addItem(Items.make('maca', 2), true);
    }
    this.recalc();
    this.hp = this.stat.maxHp; this.mp = this.stat.maxMp; this.st = this.stat.maxSt;
  }
  // ---------- Serialização ----------
  toJSON() {
    const o = {};
    for (const k of ['name', 'race', 'cls', 'app', 'level', 'xp', 'base', 'perkPts', 'gold', 'inv', 'equip', 'spells', 'spellIdx', 'shouts', 'shoutLvl', 'shoutIdx', 'souls', 'skills', 'quests', 'guilds', 'main', 'doneQuests', 'hasHorse', 'houses', 'storage', 'follower', 'stats', 'hp', 'mp', 'st', 'x', 'y', 'lastTown', 'pendingLevels', 'cds']) o[k] = this[k];
    o.perks = [...this.perks];
    o.buffs = this.buffs.filter(b => b.t < 1e6);
    return o;
  }
  static fromJSON(o) {
    const p = new Player({ name: o.name, race: o.race, cls: o.cls, app: o.app, noItems: true });
    for (const k in o) if (k !== 'perks') p[k] = o[k];
    p.perks = new Set(o.perks || []);
    p.buffs = o.buffs || [];
    p.cds = o.cds || {};
    for (const sl of EQUIP_SLOTS) if (p.equip[sl]) { const inst = p.inv.find(i => i.u === p.equip[sl].u); if (inst) p.equip[sl] = inst; else p.inv.push(p.equip[sl]); }
    p.recalc();
    return p;
  }
  // ---------- Estatísticas ----------
  skill(k) { return this.skills[k] ? this.skills[k].lvl : 0; }
  needXP(L = this.level) { return Math.round(60 + 40 * Math.pow(L, 1.4)); }
  addXP(n) {
    const R = RACES[this.race];
    n = Math.round(n * (1 + (R.xp || 0)));
    this.xp += n;
    let ups = 0;
    while (this.xp >= this.needXP()) { this.xp -= this.needXP(); this.level++; this.perkPts++; this.pendingLevels++; ups++; }
    if (ups) { Game.onLevelUp(); }
    return n;
  }
  train(k, amt) {
    const s = this.skills[k]; if (!s || s.lvl >= 100) return;
    s.xp += amt;
    const need = 8 + s.lvl * 2.2;
    if (s.xp >= need) {
      s.xp -= need; s.lvl++;
      Game.toast(`${SKILLS[k]} subiu para ${s.lvl}!`, '#a0e0ff');
      this.addXP(3 + Math.floor(s.lvl / 4));
      this.recalc();
    }
  }
  allEnchants() {
    const out = {};
    for (const s of EQUIP_SLOTS) { const it = this.equip[s]; if (!it) continue; for (const e of Items.enchants(it)) out[e.k] = (out[e.k] || 0) + e.v; }
    return out;
  }
  recalc() {
    const R = RACES[this.race], C = CLASSES[this.cls];
    const E = this.allEnchants();
    this.ench = E;
    let maxHp = 100 + (R.mods.hp || 0) + (C.mods.hp || 0) + this.base.hp + (E.hp || 0);
    let maxMp = 60 + (R.mods.mp || 0) + (C.mods.mp || 0) + this.base.mp + (E.mp || 0);
    let maxSt = 80 + (R.mods.st || 0) + (C.mods.st || 0) + this.base.st + (E.st || 0);
    let armor = (R.mods.armor || 0) + (E.def || 0);
    let mpRegenB = 0, crit = (R.mods.crit || 0) + (C.crit || 0) + (E.crit || 0) / 100, magic = (R.mods.magic || 0) + (E.magic || 0) / 100;
    for (const s of EQUIP_SLOTS) {
      const it = this.equip[s]; if (!it) continue; const d = ITEMS[it.id];
      armor += Items.armor(it);
      if (d.mpBonus) { maxMp += d.mpBonus; mpRegenB += d.mpRegen; }
      if (d.magicBonus) magic += d.magicBonus;
      if (d.crit && d.type !== 'weapon') crit += d.crit;
    }
    armor *= 1 + this.skill('armadura') * 0.006;
    if (this.perks.has('colosso')) maxHp *= 1.2;
    if (this.perks.has('critico')) crit += 0.1;
    let speed = 70 * (1 + (R.mods.speed || 0) + (E.speed || 0) / 100 + (this.perks.has('atleta') ? 0.1 : 0));
    this.stat = {
      maxHp: Math.round(maxHp), maxMp: Math.round(maxMp), maxSt: Math.round(maxSt), armor: Math.round(armor), crit, magic, speed,
      regenHp: (E.regen || 0), regenMp: (2 + maxMp * 0.012) * (1 + mpRegenB) * (this.perks.has('mana') ? 1.6 : 1),
      regenSt: (16 + maxSt * 0.06) * (this.perks.has('atleta') ? 1.5 : 1),
      lifesteal: (this.perks.has('vampiro') ? 0.05 : 0), gold: 1 + (R.mods.gold || 0) + (E.luck || 0) / 100 + (this.perks.has('saqueador') ? 0.5 : 0)
    };
    if (this.hp !== undefined) { this.hp = Math.min(this.hp, this.stat.maxHp); this.mp = Math.min(this.mp, this.stat.maxMp); this.st = Math.min(this.st, this.stat.maxSt); }
    this.buildLook();
  }
  res(elem) {
    const R = RACES[this.race];
    let r = (R.res && R.res[elem]) || 0;
    if (elem === 'fire') r += (this.ench.resFire || 0) / 100 + this.buffVal('resFire');
    if (elem === 'frost') r += (this.ench.resFrost || 0) / 100 + this.buffVal('resFrost');
    if (this.perks.has('dragao') && elem !== 'phys') r += 0.25;
    return r;
  }
  dmgTakenMul() {
    let m = 1;
    if (this.perks.has('escudeiro')) m *= 0.85;
    if (this.buffVal('coragem')) m *= 0.7;
    if (this.buffVal('pele_pedra')) m *= 0.5;
    if (this.buffVal('sangue_gelo')) m *= 0.7;
    if (this.buffVal('armor')) m *= 100 / (100 + this.buffVal('armor'));
    return m;
  }
  buffVal(k) { let v = 0; for (const b of this.buffs) if (b.k === k) v += b.v; return v; }
  addBuff(k, v, t, name) {
    const b = this.buffs.find(b => b.k === k);
    if (b) { b.t = Math.max(b.t, t); b.v = Math.max(b.v, v); } else this.buffs.push({ k, v, t, name });
  }
  heal(n, silent) {
    const before = this.hp;
    this.hp = Math.min(this.stat.maxHp, this.hp + n);
    const d = Math.round(this.hp - before);
    if (!silent && d > 0) Game.floater(this.x, this.y - 24, '+' + d, '#60ff80');
    return d;
  }
  buildLook() {
    const R = RACES[this.race], a = this.app;
    const L = { k: 'hum', skin: a.skin, hair: a.hair, hairStyle: a.hairStyle };
    if (R.ears) L.ears = R.ears; if (R.tall) L.tall = 1; if (R.short) L.short = R.short; if (R.bulky) L.bulky = true;
    if (R.beard && a.beard !== false && a.sex === 'm') L.beard = true;
    if (R.tusks) L.tusks = true; if (R.snout) L.snout = true; if (R.horns) L.horns = true;
    if (R.tail) { L.tail = true; L.tailC = a.skin; }
    if (R.catears) L.catears = true; if (R.muzzle) L.muzzle = true;
    L.body = CLASSES[this.cls].color; L.legs = '#3a3028'; L.boots = '#3a2a1a';
    const b = this.equip.body, h = this.equip.head, f = this.equip.feet, o = this.equip.offhand;
    if (b) {
      const d = ITEMS[b.id];
      if (d.akind === 'robe') { L.robe = true; L.body = d.color || d.icon.c; }
      else { L.body = d.icon.c; L.legs = shade(d.icon.c, -0.35); L.chestplate = d.mat !== 'couro'; }
    }
    if (h) { const d = ITEMS[h.id]; if (h.id === 'coroa_heroi') L.crown = true; else if (d.mat === 'couro') L.hood = d.icon.c; else L.helm = d.icon.c; if (d.mat === 'orc' || d.mat === 'draconico') L.helmHorns = true; }
    if (f) L.boots = shade(ITEMS[f.id].icon.c, -0.2);
    if (o) L.shield = ITEMS[o.id].icon.c;
    if (this.cls === 'paladino' || this.cls === 'mago') L.cape = this.cls === 'paladino' ? '#e0e0f0' : undefined;
    this.look = L;
    this.S = Sprites.actor(L);
    this.h = this.S.h;
    const w = this.equip.weapon;
    if (w) { const d = ITEMS[w.id]; this.wclass = d.wclass; this.wimg = Sprites.weapon(d.wclass, d.icon.c, d.icon.g); } else { this.wclass = null; this.wimg = null; }
  }
  // ---------- Inventário ----------
  findItem(u) { return this.inv.find(i => i.u === u); }
  count(id) { let n = 0; for (const it of this.inv) if (it.id === id) n += it.n; return n; }
  addItem(it, silent) {
    if (Items.stackable(it)) {
      const ex = this.inv.find(i => i.id === it.id && !i.ench);
      if (ex) { ex.n += it.n; } else this.inv.push(it);
    } else this.inv.push(it);
    if (!silent) { Game.toast(`+ ${Items.name(it)}${it.n > 1 ? ' x' + it.n : ''}`, Items.color(it), Items.icon(it)); Sfx.play('pickup'); }
    if (it.id === 'alma_dragao') { this.removeItem('alma_dragao', it.n); this.souls += it.n; }
    Quests.onInventory();
  }
  removeItem(id, n = 1) {
    if (this.count(id) < n) return false;
    for (let i = this.inv.length - 1; i >= 0 && n > 0; i--) {
      const it = this.inv[i]; if (it.id !== id) continue;
      if (this.isEquipped(it)) continue;
      const take = Math.min(n, it.n); it.n -= take; n -= take;
      if (it.n <= 0) this.inv.splice(i, 1);
    }
    return n <= 0;
  }
  removeInst(it, n = 1) {
    const i = this.inv.indexOf(it); if (i < 0) return;
    it.n -= n; if (it.n <= 0) { this.unequipInst(it); this.inv.splice(i, 1); }
  }
  isEquipped(it) { return EQUIP_SLOTS.some(s => this.equip[s] && this.equip[s].u === it.u); }
  unequipInst(it) { for (const s of EQUIP_SLOTS) if (this.equip[s] && this.equip[s].u === it.u) this.equip[s] = null; }
  equipItem(it, silent) {
    if (!it) return;
    const d = ITEMS[it.id];
    if (!d.slot) return;
    if (d.lvl && d.lvl > this.level + 4 && !silent) { Game.toast(`Requer nível ${d.lvl - 4}`, '#ff8080'); return; }
    this.equip[d.slot] = it;
    if (d.slot === 'weapon' && d.two) this.equip.offhand = null;
    if (d.slot === 'offhand' && this.equip.weapon && ITEMS[this.equip.weapon.id].two) this.equip.weapon = null;
    this.recalc();
    if (!silent) Sfx.play('equip');
  }
  unequip(slot) { this.equip[slot] = null; this.recalc(); }
  useItem(it) {
    const d = ITEMS[it.id];
    if (d.slot) { if (this.isEquipped(it)) { this.unequipInst(it); this.recalc(); } else this.equipItem(it); return; }
    if (d.type === 'tome') {
      if (this.spells.includes(d.spell)) { Game.toast('Você já conhece esta magia.', '#ffa0a0'); return; }
      this.spells.push(d.spell); this.removeInst(it);
      Game.toast('Magia aprendida: ' + SPELLS[d.spell].name, '#c0a0ff'); Sfx.play('learn');
      return;
    }
    const u = d.use; if (!u) return;
    const mul = this.perks.has('alquimista') ? 1.5 : 1;
    if (u.treasure) { this.removeInst(it); Game.revealTreasure(); return; }
    if (u.heal) this.heal(u.heal >= 9999 ? 99999 : u.heal * mul);
    if (u.mana) this.mp = Math.min(this.stat.maxMp, this.mp + (u.mana >= 9999 ? 99999 : u.mana * mul));
    if (u.stam) this.st = Math.min(this.stat.maxSt, this.st + (u.stam >= 9999 ? 99999 : u.stam * mul));
    if (u.buff) this.addBuff(u.buff.k, u.buff.v * (u.buff.k === 'regen' ? mul : 1), u.buff.t * mul, d.name);
    if (u.cure) this.fx = this.fx.filter(e => e.k !== 'poison');
    this.removeInst(it);
    Sfx.play(d.type === 'potion' ? 'drink' : 'eat');
  }
  quickHeal() {
    const order = ['pocao_vida_p', 'pocao_vida_m', 'pocao_vida_g', 'elixir_heroi'];
    const missing = this.stat.maxHp - this.hp;
    let pick = null;
    for (const id of order) { const it = this.inv.find(i => i.id === id); if (it) { pick = it; if (ITEMS[id].use.heal >= missing) break; } }
    if (!pick) { const f = this.inv.filter(i => ITEMS[i.id].type === 'food' && ITEMS[i.id].use.heal).sort((a, b) => ITEMS[b.id].use.heal - ITEMS[a.id].use.heal)[0]; pick = f; }
    if (!pick) { Game.toast('Sem poções de vida!', '#ff8080'); return; }
    this.useItem(pick);
  }
  quickMana() {
    const it = ['pocao_magia_p', 'pocao_magia_m', 'pocao_magia_g'].map(id => this.inv.find(i => i.id === id)).find(Boolean);
    if (!it) { Game.toast('Sem poções de magia!', '#8080ff'); return; }
    this.useItem(it);
  }
  // ---------- Combate ----------
  weaponDef() { return this.equip.weapon ? ITEMS[this.equip.weapon.id] : null; }
  spellMul(school) {
    let m = (1 + this.skill(school) * 0.012) * (1 + this.stat.magic) * (1 + (this.level - 1) * 0.05);
    if (school === 'destruicao' && this.perks.has('destruicao')) m *= 1.25;
    if (school === 'destruicao' && this.perks.has('arquimago')) m *= 1.15;
    if (this.buffVal('dmg')) m *= 1 + this.buffVal('dmg') * 0.5;
    return m;
  }
  rollDamage(kind) {
    const w = this.equip.weapon, d = w ? ITEMS[w.id] : null;
    let base = w ? Items.dmg(w) : 4 + this.level * 0.6;
    let mul = 1;
    const R = RACES[this.race];
    if (kind === 'melee') {
      mul *= 1 + this.skill('combate') * 0.012;
      if (this.perks.has('lamina')) mul *= 1.2;
      mul *= 1 + (R.mods.melee || 0);
      if (this.buffVal('furia')) mul *= 1.5;
      if (this.buffVal('garras')) mul *= 1.25;
      if (!w && this.race === 'felino') base += 6;
    } else if (kind === 'bow') {
      mul *= 1 + this.skill('arquearia') * 0.012;
      if (this.perks.has('aguia')) mul *= 1.25;
    } else if (kind === 'staff') mul *= this.spellMul('destruicao') * 0.8;
    if (this.buffVal('dmg')) mul *= 1 + this.buffVal('dmg');
    if (this.buffVal('coragem')) mul *= 1.3;
    if (this.perks.has('berserker') && this.hp < this.stat.maxHp * 0.35) mul *= 1.4;
    if (this.mounted) mul *= 1.1;
    let cc = 0.05 + (d && d.crit || 0) + this.stat.crit + (this.buffVal('sorte') ? 0.4 : 0);
    const crit = Math.random() < cc;
    return { dmg: base * mul * (0.9 + Math.random() * 0.2) * (crit ? 2 : 1), crit };
  }
  applyExtras(a, mul = 1) {
    const w = this.equip.weapon; if (!w) return;
    for (const e of Items.enchants(w)) {
      const v = e.v * mul * (1 + this.level * 0.02);
      if (e.k === 'fire') Combat.damage(a, v, { src: this, elem: 'fire', burn: v * 0.3 });
      else if (e.k === 'frost') Combat.damage(a, v, { src: this, elem: 'frost', slow: 0.35 });
      else if (e.k === 'shock') Combat.damage(a, v, { src: this, elem: 'shock' });
      else if (e.k === 'holy') Combat.damage(a, v, { src: this, elem: 'holy' });
      if (a.dead) return;
    }
  }
  drainPct() { const w = this.equip.weapon; if (!w) return 0; let d = 0; for (const e of Items.enchants(w)) if (e.k === 'drain') d += e.v / 100; return d; }
  autoAim(range) {
    const tgt = Combat.nearestHostile(this, this.x, this.y - 6, range, this.face);
    return tgt;
  }
  attack() {
    if (this.atkT > 0 || this.rolling > 0 || this.dead) return;
    const w = this.equip.weapon, d = w ? ITEMS[w.id] : null;
    const wc = d ? d.wclass : 'fist';
    let cd = d ? d.cd : 0.33;
    if (this.perks.has('rapido')) cd *= 0.85;
    if (this.buffVal('furia')) cd *= 0.7;
    const range = wc === 'bow' ? 230 : wc === 'staff' ? 200 : (d ? d.range : 14) + 26;
    const tgt = this.autoAim(range);
    const ang = tgt ? angleTo(this.x, this.y - 6, tgt.x, tgt.y - 6 - tgt.z * 0.6) : this.face;
    this.setDir(ang);
    this.atkT = cd;
    if (wc === 'bow') {
      if (!this.count('flecha')) { Game.toast('Sem flechas! Compre no armazém.', '#ffb080'); this.atkT = 0.4; return; }
      this.removeItem('flecha', 1);
      const n = this.perks.has('tiro_duplo') ? 2 : 1;
      for (let i = 0; i < n; i++) {
        const pk = this.rollDamage('bow');
        const a = ang + (n > 1 ? (i - 0.5) * 0.14 : 0);
        Combat.projectile(this, this.x, this.y - 8, a, 'arrow', pk.dmg, { crit: pk.crit, spd: 320, life: 0.9, weapon: true, kind2: 'bow' });
      }
      this.st = Math.max(0, this.st - 1); Sfx.play('bow');
    } else if (wc === 'staff') {
      const pk = this.rollDamage('staff');
      Combat.projectile(this, this.x, this.y - 10, ang, 'bolt', pk.dmg, { crit: pk.crit, spd: 230, life: 0.9, elem: 'magic', magic: true, color: d.icon.g || '#80a0ff', weapon: true });
      Sfx.play('zap');
      this.train('destruicao', 0.4);
    } else {
      const arc = d ? d.arc : 0.9, reach = (d ? d.range : 13) + 6;
      this.swing = { t: 0, dur: Math.min(0.2, cd * 0.6), ang, arc: arc * 1.6 };
      Game.fx.push({ kind: 'swing', x: this.x, y: this.y - 6, ang, arc: arc * 1.6, r: reach + 4, t: 0, dur: 0.16, color: '#ffffff' });
      const two = d && d.two;
      const drain = this.drainPct();
      const hits = Combat.melee(this, ang, arc * 1.6, reach, (a) => {
        const pk = this.rollDamage('melee');
        const ka = angleTo(this.x, this.y, a.x, a.y);
        Combat.damage(a, pk.dmg, { src: this, crit: pk.crit, drain, kb: { x: Math.cos(ka) * (two ? 150 : 60), y: Math.sin(ka) * (two ? 150 : 60) }, stun: two && pk.crit ? 0.5 : 0 });
        if (!a.dead) this.applyExtras(a);
      });
      if (hits) { this.train('combate', 1.2 + hits * 0.4); Game.hitstop = 0.04; }
      this.st = Math.max(0, this.st - (two ? 3 : 1));
      Sfx.play('swing');
    }
  }
  castSpell() {
    if (this.dead || this.rolling > 0) return;
    const id = this.spells[this.spellIdx];
    if (!id) { Game.toast('Você não conhece magias. Compre tomos em lojas de magia.', '#c0a0ff'); return; }
    const sp = SPELLS[id];
    if ((this.cds['sp_' + id] || 0) > 0 || this.castT > 0) return;
    let cost = sp.cost * (this.perks.has('eficiente') ? 0.75 : 1) * (1 - Math.min(0.4, this.skill(sp.school) * 0.003));
    if (this.mp < cost) { Game.toast('Magia insuficiente!', '#80a0ff'); Sfx.play('fail'); this.castT = 0.3; return; }
    this.mp -= cost; this.cds['sp_' + id] = sp.cd; this.castT = 0.22;
    const mul = this.spellMul(sp.school);
    const tgt = this.autoAim(sp.range || 230);
    const ang = tgt ? angleTo(this.x, this.y - 8, tgt.x, tgt.y - 6 - tgt.z * 0.6) : this.face;
    this.setDir(ang);
    const sx = this.x + Math.cos(ang) * 6, sy = this.y - 10;
    Game.burst(sx, sy, sp.color, 6, 40);
    switch (sp.kind) {
      case 'proj': {
        const kind = id === 'bola_fogo' ? 'fireball' : id === 'estilhaco_gelo' ? 'frost' : 'dark';
        Combat.projectile(this, sx, sy, ang, kind, sp.dmg * mul, { elem: sp.elem, aoe: sp.aoe, slow: sp.slow, drain: sp.drain, spd: sp.spd, pierce: this.perks.has('arquimago'), magic: true, life: 1.4, burn: sp.elem === 'fire' ? sp.dmg * mul * 0.15 : 0 });
        break;
      }
      case 'chain': {
        let cur = tgt; const hit = new Set();
        let px = sx, py = sy;
        if (!cur) { Game.fx.push({ kind: 'bolt', pts: this.boltPts(px, py, px + Math.cos(ang) * 90, py + Math.sin(ang) * 90), t: 0, dur: 0.2, color: sp.color }); break; }
        for (let i = 0; i <= sp.chains + (this.perks.has('arquimago') ? 1 : 0) && cur; i++) {
          hit.add(cur);
          Game.fx.push({ kind: 'bolt', pts: this.boltPts(px, py, cur.x, cur.y - 8 - cur.z), t: 0, dur: 0.22, color: sp.color });
          Combat.damage(cur, sp.dmg * mul * (i ? 0.75 : 1), { src: this, elem: 'shock', stun: 0.25 });
          px = cur.x; py = cur.y - 8 - cur.z;
          let nx = null, nd = 90;
          for (const a of Combat.targetsOf(this)) { if (hit.has(a)) continue; const d = dist(px, py, a.x, a.y); if (d < nd) { nd = d; nx = a; } }
          cur = nx;
        }
        Sfx.play('zap');
        break;
      }
      case 'heal': {
        const hm = (1 + this.skill('restauracao') * 0.01) * (this.perks.has('curandeiro') ? 1.5 : 1) * (1 + (this.level - 1) * 0.05);
        this.heal(sp.heal * hm);
        if (sp.regen) this.addBuff('regen', sp.regen * hm, 10, sp.name);
        Game.fx.push({ kind: 'ring', x: this.x, y: this.y - 6, r0: 18, r1: 4, t: 0, dur: 0.4, color: sp.color });
        // cura aliados próximos também
        for (const a of Game.actors) if (a.team === 'ally' && !a.dead && dist(a.x, a.y, this.x, this.y) < 80) a.hp = Math.min(a.maxHp, a.hp + sp.heal * hm * 0.5);
        break;
      }
      case 'nova':
        Combat.explode(this.x, this.y - 4, sp.radius, sp.dmg * mul, this, { elem: sp.elem, slow: sp.slow, color: sp.color, kb: 110, magic: true });
        break;
      case 'buff':
        this.addBuff(sp.buff.k, sp.buff.v, sp.buff.t, sp.name);
        Game.fx.push({ kind: 'ring', x: this.x, y: this.y - 6, r0: 4, r1: 22, t: 0, dur: 0.4, color: sp.color });
        break;
      case 'summon': {
        const mine = Game.actors.filter(a => a.summoner === this && !a.dead);
        if (mine.length >= 2) mine[0].vanish();
        const cm = this.perks.has('conjurador') ? 1.5 : 1;
        const sm = (1 + this.skill('conjuracao') * 0.01) * cm;
        const m = new Monster(sp.ent, this.x + Math.cos(ang) * 20, this.y + Math.sin(ang) * 20, this.level, { follow: true, t: sp.t * cm, hpMul: sm, dmgMul: sm });
        m.summoner = this; m.levelRef = Game.level;
        Game.actors.push(m);
        Game.fx.push({ kind: 'ring', x: m.x, y: m.y, r0: 2, r1: 20, t: 0, dur: 0.5, color: sp.color });
        break;
      }
      case 'area':
        for (const a of Combat.targetsOf(this)) if (dist(a.x, a.y, this.x, this.y) < sp.radius) { Combat.damage(a, sp.dmg * mul, { src: this, root: sp.root, magic: true }); }
        Game.fx.push({ kind: 'ring', x: this.x, y: this.y, r0: 6, r1: sp.radius, t: 0, dur: 0.5, color: sp.color });
        for (let i = 0; i < 16; i++) { const a = i / 16 * Math.PI * 2; Game.particle(this.x + Math.cos(a) * sp.radius * 0.7, this.y + Math.sin(a) * sp.radius * 0.7, 0, -30, '#60a030', 0.7); }
        break;
      case 'blink': {
        let bx = this.x, by = this.y;
        for (let d = 8; d <= sp.range; d += 4) { const x = this.x + Math.cos(ang) * d, y = this.y + Math.sin(ang) * d; if (collides(Game.level, x, y, this.r)) break; bx = x; by = y; }
        Game.burst(this.x, this.y - 8, sp.color, 14, 60); this.x = bx; this.y = by; Game.burst(bx, by - 8, sp.color, 14, 60);
        this.invuln = 0.3;
        break;
      }
      case 'cloud': {
        const x = tgt ? tgt.x : this.x + Math.cos(ang) * 70, y = tgt ? tgt.y : this.y + Math.sin(ang) * 70;
        Game.clouds.push({ x, y, r: sp.radius, t: sp.t, dps: sp.dmg * mul, src: this, acc: 0, color: sp.color });
        break;
      }
      case 'meteor': {
        const x = tgt ? tgt.x : this.x + Math.cos(ang) * 80, y = tgt ? tgt.y : this.y + Math.sin(ang) * 80;
        Game.fx.push({ kind: 'telegraph', x, y, r: sp.radius, t: 0, dur: sp.delay, color: '#ff6020', friendly: true });
        Game.fx.push({ kind: 'meteor', x, y, t: 0, dur: sp.delay });
        Game.later(sp.delay, () => { Combat.explode(x, y, sp.radius, sp.dmg * mul, this, { elem: 'fire', color: '#ff6020', kb: 200, burn: sp.dmg * mul * 0.1, magic: true }); Game.shake = 8; Sfx.play('boom'); });
        break;
      }
      case 'storm':
        for (let i = 0; i < sp.strikes; i++) Game.later(0.15 + i * 0.22, () => {
          const cands = Combat.targetsOf(this).filter(a => dist(a.x, a.y, this.x, this.y) < sp.radius);
          const a = cands.length ? cands[Math.floor(Math.random() * cands.length)] : null;
          const x = a ? a.x : this.x + (Math.random() - 0.5) * sp.radius * 2, y = a ? a.y : this.y + (Math.random() - 0.5) * sp.radius * 2;
          Game.fx.push({ kind: 'bolt', pts: this.boltPts(x, y - 140, x, y), t: 0, dur: 0.2, color: '#fff27a' });
          Combat.explode(x, y, 18, sp.dmg * mul, this, { elem: 'shock', color: '#fff27a', kb: 40, stun: 0.3, magic: true });
          Sfx.play('zap');
        });
        break;
    }
    this.train(sp.school, cost * 0.25);
    Sfx.play('spell');
  }
  boltPts(x0, y0, x1, y1) {
    const pts = [[x0, y0]]; const n = 6;
    for (let i = 1; i < n; i++) pts.push([lerp(x0, x1, i / n) + (Math.random() - 0.5) * 10, lerp(y0, y1, i / n) + (Math.random() - 0.5) * 10]);
    pts.push([x1, y1]); return pts;
  }
  shout() {
    if (this.dead) return;
    if (!this.shouts.length) { Game.toast('Você não conhece Gritos. Mate dragões e visite Pedras Rúnicas.', '#ffb060'); return; }
    const id = this.shouts[this.shoutIdx % this.shouts.length];
    const S = SHOUTS[id];
    if ((this.cds['sh_' + id] || 0) > 0) { Game.toast(`${S.name}: ${Math.ceil(this.cds['sh_' + id])}s`, '#ffb060'); return; }
    const lv = this.shoutLvl[id] || 1;
    this.cds['sh_' + id] = S.cd * (this.perks.has('grito') ? 0.6 : 1);
    const words = S.words.split(' ').slice(0, lv).join(' ');
    Game.floatText(this.x, this.y - 30, words, '#ffd080', 1.4);
    Game.shake = 5; Sfx.play('shout');
    const ang = this.face;
    const pm = (1 + this.level * 0.08);
    switch (S.kind) {
      case 'push':
        Game.fx.push({ kind: 'cone', x: this.x, y: this.y - 6, ang, arc: 1.2, r: 70 + lv * 25, t: 0, dur: 0.35, color: '#e0f0ff' });
        for (const a of Combat.targetsOf(this)) {
          const d = dist(this.x, this.y, a.x, a.y);
          if (d < 70 + lv * 25 && Math.abs(angDiff(ang, angleTo(this.x, this.y, a.x, a.y))) < 0.8) {
            const ka = angleTo(this.x, this.y, a.x, a.y);
            Combat.damage(a, S.dmg * pm * lv, { src: this, kb: { x: Math.cos(ka) * (300 + lv * 120), y: Math.sin(ka) * (300 + lv * 120) }, stun: 1 + lv * 0.5 });
          }
        }
        break;
      case 'cone': {
        const R = 80 + lv * 18;
        Game.fx.push({ kind: 'cone', x: this.x, y: this.y - 6, ang, arc: 0.9, r: R, t: 0, dur: 0.5, color: S.elem === 'fire' ? '#ff7020' : '#a0e0ff' });
        for (let i = 0; i < 26; i++) { const a = ang + (Math.random() - 0.5) * 0.9, s = 80 + Math.random() * 120; Game.particle(this.x, this.y - 8, Math.cos(a) * s, Math.sin(a) * s, S.elem === 'fire' ? (Math.random() < 0.5 ? '#ff9030' : '#ffe060') : '#c0f0ff', 0.6); }
        for (const a of Combat.targetsOf(this)) {
          const d = dist(this.x, this.y, a.x, a.y);
          if (d < R && Math.abs(angDiff(ang, angleTo(this.x, this.y, a.x, a.y))) < 0.6)
            Combat.damage(a, S.dmg * pm * (0.7 + lv * 0.3), { src: this, elem: S.elem, burn: S.elem === 'fire' ? 8 * lv : 0, slow: S.elem === 'frost' ? 0.6 : 0, root: S.elem === 'frost' && lv >= 3 ? 2 : 0 });
        }
        break;
      }
      case 'dash':
        this.rolling = 0.22 + lv * 0.08; this.rollAng = ang; this.rollSpd = 5; this.invuln = this.rolling + 0.2;
        Game.burst(this.x, this.y - 6, '#e0f0ff', 16, 80);
        break;
      case 'slowtime':
        Game.slowTime = 5 + lv * 2.5;
        Game.toast('O tempo se curva à sua voz...', '#c0d0ff');
        break;
      case 'dragonstorm':
        for (let i = 0; i < 8 + lv * 4; i++) Game.later(0.3 + i * 0.35, () => {
          const cands = Combat.targetsOf(this).filter(a => dist(a.x, a.y, this.x, this.y) < 160);
          const a = cands.length ? cands[Math.floor(Math.random() * cands.length)] : null;
          const x = a ? a.x : this.x + (Math.random() - 0.5) * 240, y = a ? a.y : this.y + (Math.random() - 0.5) * 240;
          Game.fx.push({ kind: 'meteor', x, y, t: 0, dur: 0.5 });
          Game.later(0.5, () => { Combat.explode(x, y, 30, S.dmg * pm, this, { elem: 'fire', color: '#ff6020', burn: 10 }); Sfx.play('boom'); });
        });
        break;
    }
  }
  racial() {
    if (this.dead) return;
    const R = RACES[this.race], A = RACE_ABILITIES[R.ability];
    if ((this.cds.racial || 0) > 0) { Game.toast(`${A.name}: ${Math.ceil(this.cds.racial)}s`, '#ffd080'); return; }
    this.cds.racial = A.cd;
    Game.floatText(this.x, this.y - 30, A.name.toUpperCase(), '#ffd080', 1);
    Sfx.play('learn');
    switch (R.ability) {
      case 'coragem': this.addBuff('coragem', 1, 30, A.name); break;
      case 'graca': this.mp = this.stat.maxMp; this.addBuff('graca', 1, 20, A.name); break;
      case 'pele_pedra': this.addBuff('pele_pedra', 1, 30, A.name); break;
      case 'furia': this.addBuff('furia', 1, 20, A.name); break;
      case 'sorte': this.addBuff('sorte', 1, 30, A.name); break;
      case 'garras': this.addBuff('garras', 1, 20, A.name); this.addBuff('speed', 0.4, 20); break;
      case 'sangue_gelo': this.heal(this.stat.maxHp * 0.5); this.addBuff('sangue_gelo', 1, 15, A.name); break;
      case 'sopro': {
        const ang = this.face;
        Game.fx.push({ kind: 'cone', x: this.x, y: this.y - 6, ang, arc: 0.9, r: 90, t: 0, dur: 0.5, color: '#ff7020' });
        for (let i = 0; i < 24; i++) { const a = ang + (Math.random() - 0.5) * 0.9, s = 80 + Math.random() * 120; Game.particle(this.x, this.y - 8, Math.cos(a) * s, Math.sin(a) * s, Math.random() < 0.5 ? '#ff9030' : '#ffe060', 0.6); }
        for (const a of Combat.targetsOf(this)) if (dist(this.x, this.y, a.x, a.y) < 90 && Math.abs(angDiff(ang, angleTo(this.x, this.y, a.x, a.y))) < 0.6) Combat.damage(a, (25 + this.level * 6), { src: this, elem: 'fire', burn: 4 + this.level });
        break;
      }
    }
  }
  roll() {
    if (this.rolling > 0 || this.dead || this.st < 18) { if (this.st < 18) Game.toast('Sem vigor!', '#80ff80'); return; }
    this.st -= 18;
    const m = Input.move;
    this.rollAng = m.mag > 0.15 ? Math.atan2(m.y, m.x) : this.face;
    this.rolling = 0.28; this.rollSpd = 2.7; this.invuln = 0.32;
    Sfx.play('roll');
  }
  toggleMount() {
    if (!this.hasHorse) { Game.toast('Você não tem um cavalo. Compre um no estábulo de uma capital.', '#ffd080'); return; }
    if (!Game.level.isWorld) { Game.toast('Não é possível montar aqui.', '#ffa0a0'); return; }
    this.mounted = !this.mounted;
    Sfx.play('horse');
  }
  // ---------- Atualização ----------
  update(dt) {
    if (this.dead) return;
    this.updateStatus(dt);
    this.stats.playTime += dt;
    for (const k in this.cds) { this.cds[k] -= dt; if (this.cds[k] <= 0) delete this.cds[k]; }
    let changed = false;
    for (let i = this.buffs.length - 1; i >= 0; i--) { this.buffs[i].t -= dt; if (this.buffs[i].t <= 0) { this.buffs.splice(i, 1); changed = true; } }
    if (changed) this.recalc();
    if (this.atkT > 0) this.atkT -= dt;
    if (this.castT > 0) this.castT -= dt;
    if (this.invuln > 0) this.invuln -= dt;
    if (this.swing) { this.swing.t += dt; if (this.swing.t >= this.swing.dur) this.swing = null; }
    this.lastHurt += dt;
    const L = Game.level;
    const tx = Math.floor(this.x / 16), ty = Math.floor(this.y / 16);
    const tdef = TILE_DEFS[L.tileAt(tx, ty)];
    this.moving = false; this.sprinting = false;
    if (this.rolling > 0) {
      this.rolling -= dt;
      const sp = this.stat.speed * (this.rollSpd || 2.7);
      moveActor(this, Math.cos(this.rollAng) * sp * dt, Math.sin(this.rollAng) * sp * dt);
      this.moving = true; this.anim += dt * 2;
      if (Math.random() < 0.5) Game.particle(this.x, this.y, (Math.random() - 0.5) * 20, -8, '#c8b090', 0.3);
    } else {
      const m = Input.move;
      let spd = this.stat.speed * (this.mounted ? 1 : tdef.slow) * this.speedFactor * (1 + this.buffVal('speed'));
      if (this.mounted) spd *= 1.85 * (this.perks.has('cavaleiro') ? 1.25 : 1);
      if (this.castT > 0 || (this.atkT > 0 && this.swing)) spd *= 0.6;
      if (m.mag > 0.12) {
        if ((Input.sprint || m.mag > 0.94) && this.st > 1) { spd *= 1.45; this.st -= (this.mounted ? 7 : 15) * dt; this.sprinting = true; }
        const a = Math.atan2(m.y, m.x);
        const mm = Math.min(1, m.mag * 1.3);
        const ox = this.x, oy = this.y;
        moveActor(this, Math.cos(a) * spd * mm * dt, Math.sin(a) * spd * mm * dt);
        this.stats.dist += Math.hypot(this.x - ox, this.y - oy);
        this.moving = true; this.anim += dt * (spd / 70) * mm;
        if (!(this.swing || this.castT > 0)) this.setDir(a);
        if (this.sprinting && Math.random() < 0.3) Game.particle(this.x, this.y, (Math.random() - 0.5) * 20, -6, '#c8b090', 0.3);
      }
    }
    if (tdef.hurt && !this.mounted) {
      this.hurtAcc += dt;
      if (this.hurtAcc > 0.5) { this.hurtAcc = 0; Combat.damage(this, tdef.hurt * 0.5 * (1 + this.level * 0.05), { elem: 'fire', dot: true }); Game.burst(this.x, this.y, '#ff8020', 4); }
    }
    // regeneração
    const out = this.lastHurt > 5;
    this.hp = Math.min(this.stat.maxHp, this.hp + (this.stat.regenHp + this.buffVal('regen') + (out ? 1.5 + this.stat.maxHp * 0.012 : 0.25)) * dt);
    this.mp = Math.min(this.stat.maxMp, this.mp + this.stat.regenMp * (this.buffVal('graca') ? 4 : 1) * dt);
    if (!this.sprinting && this.rolling <= 0) this.st = Math.min(this.stat.maxSt, this.st + this.stat.regenSt * (this.atkT > 0 ? 0.4 : 1) * dt);
    if (this.st < 0) this.st = 0;
  }
  die(killer) {
    if (this.dead) return;
    this.dead = true;
    this.stats.deaths++;
    Game.onPlayerDeath(killer);
  }
  draw(ctx, camX, camY) {
    const blink = this.invuln > 0 && this.rolling <= 0 && Math.floor(Game.t * 20) % 2;
    if (this.mounted) {
      const H = Sprites.horse();
      const hk = this.dir === 'left' || this.dir === 'right' ? this.dir : this.lastH;
      const f = this.moving ? 1 + (Math.floor(this.anim * 6) % 2) : 0;
      this.drawShadow(ctx, camX, camY, 20);
      const img = H[hk][f];
      ctx.drawImage(img, Math.round(this.x - 12 - camX), Math.round(this.y - 19 - camY));
      this.z = 9;
      const sd = this.dir; this.dir = hk;
      if (blink) ctx.globalAlpha = 0.5;
      this.drawBody(ctx, camX, camY, this.S);
      ctx.globalAlpha = 1;
      this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, this.swingAngle());
      this.dir = sd; this.z = 0;
      return;
    }
    this.drawShadow(ctx, camX, camY);
    const sa = this.swingAngle();
    if (this.dir === 'up') this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, sa);
    if (blink) ctx.globalAlpha = 0.5;
    if (this.rolling > 0) ctx.globalAlpha = 0.75;
    this.drawBody(ctx, camX, camY, this.S);
    ctx.globalAlpha = 1;
    if (this.dir !== 'up') this.drawWeapon(ctx, camX, camY, this.wimg, this.wclass, sa);
    if (this.castT > 0) {
      const sp = SPELLS[this.spells[this.spellIdx]];
      ctx.fillStyle = sp ? sp.color : '#fff';
      for (let i = 0; i < 4; i++) { const a = Game.t * 10 + i * Math.PI / 2; ctx.fillRect(Math.round(this.x - camX + Math.cos(a) * 7), Math.round(this.y - 10 - camY + Math.sin(a) * 4), 2, 2); }
    }
  }
  swingAngle() {
    if (!this.swing) return null;
    const k = this.swing.t / this.swing.dur;
    return this.swing.ang - this.swing.arc / 2 + this.swing.arc * smooth(Math.min(1, k));
  }
}
