'use strict';
// ===================== ITENS, ENCANTAMENTOS E SAQUE =====================
const Items = {
  make(id, n = 1, extra) {
    if (!ITEMS[id]) { console.warn('item desconhecido', id); id = 'osso'; }
    const it = { id, n, r: 0, u: uid() };
    if (extra) Object.assign(it, extra);
    return it;
  },
  parse(spec) { const [id, n] = spec.split(':'); return [id, n ? parseInt(n) : 1]; },
  def(it) { return ITEMS[it.id]; },
  stackable(it) { const d = ITEMS[it.id]; return d.stack && !it.ench; },
  enchants(it) {
    const d = ITEMS[it.id];
    const a = [];
    if (d.ench) a.push(...d.ench);
    if (it.ench) a.push(...it.ench);
    return a;
  },
  name(it) {
    if (it.name) return it.name;
    const d = ITEMS[it.id];
    let n = d.name;
    if (it.ench && it.ench.length) n += ' ' + ENCHANTS[it.ench[0].k].name;
    return n;
  },
  color(it) { const d = ITEMS[it.id]; if (d.unique) return '#ffb030'; if (d.type === 'quest') return '#f0e080'; return RARITY[it.r || 0].c; },
  rmult(it) { return RARITY[it.r || 0].mult; },
  dmg(it) { const d = ITEMS[it.id]; return Math.round((d.dmg || 0) * this.rmult(it)); },
  armor(it) { const d = ITEMS[it.id]; return Math.round((d.armor || 0) * this.rmult(it)); },
  value(it) {
    const d = ITEMS[it.id];
    let v = d.value * Math.pow(this.rmult(it), 2) * (1 + (it.ench ? it.ench.length * 0.5 : 0));
    return Math.max(d.type === 'quest' ? 0 : 1, Math.round(v));
  },
  icon(it) {
    const d = ITEMS[it.id];
    if (d.type === 'tome') return { k: 'tome', c: SPELLS[d.spell].color };
    return d.icon || { k: 'crate', c: '#a07040' };
  },
  typeName(it) {
    const d = ITEMS[it.id];
    const map = { weapon: 'Arma', armor: 'Armadura', potion: 'Poção', food: 'Comida', material: 'Material', ammo: 'Munição', quest: 'Item de Missão', misc: 'Diversos', tome: 'Tomo de Magia' };
    if (d.slot === 'ring') return 'Anel'; if (d.slot === 'neck') return 'Amuleto'; if (d.slot === 'offhand') return 'Escudo';
    if (d.akind === 'robe') return 'Manto';
    if (d.slot === 'head') return 'Elmo'; if (d.slot === 'feet') return 'Botas';
    if (d.wclass) return ({ sword: 'Espada', axe: 'Machado', mace: 'Maça', dagger: 'Adaga', great: 'Duas mãos', hammer: 'Duas mãos', bow: 'Arco', staff: 'Cajado' })[d.wclass];
    return map[d.type] || 'Item';
  },
  describe(it) {
    const d = ITEMS[it.id];
    const L = [];
    L.push(`<b style="color:${this.color(it)}">${esc(this.name(it))}</b>`);
    L.push(`<span class="dim">${this.typeName(it)}${d.unique ? ' • Único' : it.r ? ' • ' + RARITY[it.r].name : ''}${d.lvl ? ' • Nv ' + d.lvl : ''}</span>`);
    if (d.dmg) L.push(`Dano: <b>${this.dmg(it)}</b>${d.cd ? ` • Vel: ${(1 / d.cd).toFixed(1)}/s` : ''}`);
    if (d.magicBonus) L.push(`+${Math.round(d.magicBonus * 100)}% dano mágico`);
    if (d.armor) L.push(`Armadura: <b>${this.armor(it)}</b>`);
    if (d.mpBonus) L.push(`+${d.mpBonus} Magia, +${Math.round(d.mpRegen * 100)}% regeneração`);
    if (d.crit) L.push(`+${Math.round(d.crit * 100)}% crítico`);
    for (const e of this.enchants(it)) L.push(`<span style="color:${ENCHANTS[e.k].c}">✦ ${ENCHANTS[e.k].desc(e.v)}</span>`);
    if (d.use) {
      const u = d.use;
      if (u.heal) L.push(`Restaura ${u.heal >= 9999 ? 'toda a' : u.heal} vida`);
      if (u.mana) L.push(`Restaura ${u.mana >= 9999 ? 'toda a' : u.mana} magia`);
      if (u.stam) L.push(`Restaura ${u.stam >= 9999 ? 'todo o' : u.stam} vigor`);
      if (u.buff) L.push(`Efeito: ${({ resFire: 'resistência ao fogo', resFrost: 'resistência ao gelo', dmg: 'mais dano', speed: 'mais velocidade', regen: 'regeneração' })[u.buff.k]} por ${u.buff.t}s`);
      if (u.cure) L.push('Cura venenos');
    }
    if (d.type === 'tome') L.push(`Ensina: <b>${SPELLS[d.spell].name}</b><br><span class="dim">${SPELLS[d.spell].desc}</span>`);
    if (d.desc) L.push(`<span class="dim">${esc(d.desc)}</span>`);
    L.push(`<span class="gold">Valor: ${this.value(it)}</span>`);
    return L.join('<br>');
  },
  rollRarity(rng, boost = 0) {
    const r = rng.next() - boost;
    if (r < 0.015) return 4; if (r < 0.06) return 3; if (r < 0.18) return 2; if (r < 0.42) return 1; return 0;
  },
  rollEnchant(slotKind, lvl, rng, exclude) {
    const keys = Object.keys(ENCHANTS).filter(k => {
      const e = ENCHANTS[k];
      if (exclude && exclude.includes(k)) return false;
      if (slotKind === 'weapon') return e.weapon || e.both;
      return e.armor || e.both;
    });
    const k = rng.pick(keys);
    const L = Math.max(1, lvl);
    const val = {
      fire: 3 + L * 0.8, frost: 3 + L * 0.7, shock: 3 + L * 0.9, holy: 4 + L, drain: 3 + Math.min(8, L * 0.3), crit: 3 + Math.min(10, L * 0.3),
      hp: 10 + L * 3, mp: 10 + L * 3, st: 10 + L * 3, def: 4 + L, speed: 3 + Math.min(10, L * 0.3), magic: 5 + Math.min(25, L * 0.8),
      regen: 0.5 + L * 0.06, luck: 10 + Math.min(30, L), resFire: 10 + Math.min(30, L), resFrost: 10 + Math.min(30, L)
    }[k];
    let v = val * rng.range(0.8, 1.2);
    v = v >= 10 ? Math.round(v) : Math.round(v * 10) / 10;
    return { k, v };
  },
  addEnchants(it, n, lvl, rng) {
    const d = ITEMS[it.id];
    const kind = d.type === 'weapon' ? 'weapon' : 'armor';
    it.ench = it.ench || [];
    for (let i = 0; i < n; i++) it.ench.push(this.rollEnchant(kind, lvl, rng, it.ench.map(e => e.k)));
  },
  // Equipamento aleatório adequado ao nível
  randomGear(lvl, rng, boost = 0, forceKind) {
    const mats = MATERIALS.filter(m => m.lvl <= lvl + 2);
    // peso maior para materiais próximos do nível
    const weighted = mats.map(m => ({ m, w: 1 + Math.max(0, 6 - Math.abs(lvl - m.lvl) / 2) }));
    const kind = forceKind || rng.weighted([{ k: 'weapon', w: 4 }, { k: 'armor', w: 4 }, { k: 'staff', w: 1 }, { k: 'robe', w: 1 }, { k: 'jewel', w: 1.5 }], 'w').k;
    let id;
    if (kind === 'staff') { const ok = STAFFS.filter(s => s.lvl <= lvl + 2 && s.id !== 'staff_carvalho'); id = (ok.length ? rng.pick(ok.slice(-2)) : STAFFS[0]).id; }
    else if (kind === 'robe') { const ok = ROBES.filter(s => s.lvl <= lvl + 2); id = rng.pick(ok.slice(-3)).id; }
    else if (kind === 'jewel') id = rng.pick(['anel_prata', 'anel_ouro', 'amuleto_prata', 'amuleto_ouro']);
    else {
      let m = rng.weighted(weighted, 'w').m;
      if (kind === 'weapon') {
        if (m.armorOnly) m = MAT_BY_ID.ferro;
        id = rng.pick(Object.keys(WEAPON_TYPES)) + '_' + m.id;
      } else id = rng.pick(Object.keys(ARMOR_TYPES)) + '_' + m.id;
    }
    const it = this.make(id);
    it.r = this.rollRarity(rng, boost);
    if (kind === 'jewel' && it.r === 0) it.r = 1;
    const ne = RARITY[it.r].ench;
    if (ne) this.addEnchants(it, ne, lvl, rng);
    return it;
  },
  potionFor(lvl, rng) {
    const sz = lvl < 8 ? 'p' : lvl < 18 ? 'm' : 'g';
    return rng.pick(['pocao_vida_' + sz, 'pocao_vida_' + sz, 'pocao_magia_' + sz, 'pocao_vigor']);
  },
  chestLoot(lvl, rng, big) {
    const out = [];
    const gold = Math.round(rng.int(10, 30) * (1 + lvl * 0.35) * (big ? 4 : 1));
    const n = big ? rng.int(3, 5) : rng.int(1, 3);
    for (let i = 0; i < n; i++) {
      const roll = rng.next();
      if (roll < (big ? 0.6 : 0.3)) out.push(this.randomGear(lvl, rng, big ? 0.12 : 0));
      else if (roll < 0.6) out.push(this.make(this.potionFor(lvl, rng), rng.int(1, 2)));
      else if (roll < 0.75) out.push(this.make(rng.pick(['rubi', 'safira', 'esmeralda', 'ametista', 'diamante']), 1));
      else if (roll < 0.85) out.push(this.make('flecha', rng.int(8, 20)));
      else if (roll < 0.92) { const sp = rng.pick(Object.keys(SPELLS).filter(k => (SPELLS[k].minLvl || 1) <= lvl + 2)); out.push(this.make('tomo_' + sp)); }
      else out.push(this.make(rng.pick(['lingote_ferro', 'lingote_aco', 'couro', 'minerio_prata', 'minerio_ouro', 'mapa_tesouro']), rng.int(1, 3)));
    }
    return { gold, items: out };
  }
};
// Tomos de magia
for (const [k, sp] of Object.entries(SPELLS)) idef('tomo_' + k, { name: 'Tomo: ' + sp.name, type: 'tome', spell: k, value: sp.price, icon: { k: 'tome', c: sp.color }, lvl: sp.minLvl || 1 });
