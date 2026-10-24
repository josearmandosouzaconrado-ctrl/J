'use strict';
// ===================== LOJAS =====================
const Shops = {
  state: {},
  key(b) { return b.settlement.id + ':' + b.tx + ',' + b.ty; },
  stock(b, kind) {
    const k = this.key(b) + ':' + (kind || b.role);
    const st = this.state[k];
    if (st && st.day === Game.day) return st.items;
    const items = this.generate(b, kind || b.role, new RNG(hashStr(k) + Game.day * 7919 + Game.world.seed));
    this.state[k] = { day: Game.day, items };
    return items;
  },
  generate(b, role, rng) {
    const s = b.settlement, R = s.region, P = Game.player;
    const lvl = clamp(Math.max(P.level, R.lvl[0]), 1, R.lvl[1] + 6) + (s.type === 'capital' ? 3 : 0);
    const out = [];
    const add = (id, n = 1) => { if (ITEMS[id]) out.push(Items.make(id, n)); };
    const mats = MATERIALS.filter(m => m.lvl <= lvl + 2);
    switch (role) {
      case 'general': case 'stall':
        ['pao', 'maca', 'queijo', 'batata', 'carne_assada', 'hidromel'].forEach(id => add(id, rng.int(3, 10)));
        add('flecha', rng.int(40, 120)); add('tocha', rng.int(2, 6));
        add('pocao_vida_p', rng.int(2, 5)); add('pocao_vigor', rng.int(1, 3)); add('antidoto', rng.int(1, 3));
        ['body_couro', 'head_couro', 'feet_couro', 'shield_couro'].forEach(id => { if (rng.chance(0.6)) add(id); });
        add('couro', rng.int(2, 6)); add('lingote_ferro', rng.int(2, 6));
        if (rng.chance(0.4)) add('mapa_tesouro');
        add('vara_pesca'); add('machado_lenha'); add('picareta'); add('lenha', rng.int(10, 30)); add('tabua', rng.int(20, 60)); add('pedra', rng.int(20, 60)); add('prego', rng.int(40, 120)); add('bloco_pedra', rng.int(5, 20)); add('trigo', rng.int(3, 10)); add('buque', rng.int(2, 6)); add('boneca', rng.int(1, 3)); add('espada_madeira', rng.int(1, 3));
        if (R.id === 'zahrim' || R.id === 'sylvaris') add('vinho', rng.int(1, 4));
        if (role === 'stall') for (let i = 0; i < 2; i++) out.push(Items.randomGear(lvl, rng, 0.05));
        break;
      case 'smith': {
        const top = mats.slice(-3);
        for (const m of top) {
          for (const w of rng.shuffle(Object.keys(WEAPON_TYPES)).slice(0, 4)) if (!m.armorOnly) add(w + '_' + m.id);
          for (const a of Object.keys(ARMOR_TYPES)) if (rng.chance(0.6)) add(a + '_' + m.id);
        }
        for (let i = 0; i < 4; i++) out.push(Items.randomGear(lvl, rng, 0.1, rng.pick(['weapon', 'armor'])));
        ['lingote_ferro', 'lingote_aco', 'couro'].forEach(id => add(id, rng.int(2, 8)));
        if (lvl > 8) add('lingote_prata', rng.int(1, 4)); if (lvl > 12) add('lingote_ouro', rng.int(1, 3));
        if (R.id === 'khazdurim' && lvl > 14) add('lingote_obsidiana', rng.int(1, 3));
        add('minerio_ferro', rng.int(3, 10));
        break;
      }
      case 'alchemist': {
        const sz = lvl < 8 ? ['p'] : lvl < 16 ? ['p', 'm'] : ['p', 'm', 'g'];
        for (const z of sz) { add('pocao_vida_' + z, rng.int(2, 6)); add('pocao_magia_' + z, rng.int(2, 6)); }
        ['pocao_vigor', 'antidoto', 'pocao_res_fogo', 'pocao_res_gelo', 'pocao_forca', 'pocao_velocidade'].forEach(id => { if (rng.chance(0.7)) add(id, rng.int(1, 3)); });
        ['erva_vermelha', 'erva_azul', 'cogumelo', 'flor_fogo', 'raiz_gelo', 'gosma'].forEach(id => add(id, rng.int(2, 8)));
        if (rng.chance(0.25)) add('elixir_heroi');
        break;
      }
      case 'magic': {
        const spells = Object.keys(SPELLS).filter(k => (SPELLS[k].minLvl || 1) <= lvl + 3);
        for (const k of rng.shuffle(spells).slice(0, 7)) add('tomo_' + k);
        for (const sdef of STAFFS) if (sdef.lvl <= lvl + 2 && rng.chance(0.6)) add(sdef.id);
        for (const r of ROBES) if (r.lvl <= lvl + 2 && rng.chance(0.5)) add(r.id);
        add('pocao_magia_p', rng.int(2, 6)); if (lvl > 8) add('pocao_magia_m', rng.int(1, 4));
        for (let i = 0; i < 3; i++) out.push(Items.randomGear(lvl, rng, 0.15, 'jewel'));
        ['ametista', 'safira', 'essencia_fogo', 'essencia_gelo'].forEach(id => { if (rng.chance(0.5)) add(id, rng.int(1, 3)); });
        break;
      }
      case 'inn':
        ['pao', 'queijo', 'carne_assada', 'ensopado', 'torta_maca', 'hidromel', 'vinho'].forEach(id => add(id, rng.int(2, 8)));
        break;
      case 'temple':
        add('pocao_vida_p', rng.int(4, 8)); add('pocao_vida_m', rng.int(2, 5)); add('antidoto', rng.int(2, 5));
        add('amuleto_aurora'); add('buque', rng.int(2, 5));
        add('tomo_cura'); add('tomo_luz'); if (lvl > 6) add('tomo_luz_sagrada'); if (lvl > 10) add('tomo_cura_maior'); add('tomo_escudo_arcano');
        break;
    }
    return out;
  },
  buyPrice(it) {
    const P = Game.player;
    return Math.max(1, Math.ceil(Items.value(it) * (P.perks.has('negociante') ? 0.8 : 1) * (1 - Math.min(0.3, P.skill('eloquencia') * 0.003)) * (1 - ((P.sb && P.sb.price) || 0))));
  },
  sellPrice(it) {
    const P = Game.player;
    const d = ITEMS[it.id];
    if (d.type === 'quest') return 0;
    return Math.max(0, Math.floor(Items.value(it) * 0.33 * (P.perks.has('negociante') ? 1.2 : 1) * (1 + Math.min(0.5, P.skill('eloquencia') * 0.005)) * (1 + ((P.sb && P.sb.price) || 0))));
  }
};
