'use strict';
// ===================== MISSÕES =====================
const QCATS = {
  undead: { name: 'mortos-vivos', test: d => !!d.undead },
  animal: { name: 'feras selvagens', test: d => !!d.animal && !d.passive },
  strong: { name: 'criaturas poderosas', test: d => d.hp >= 70 && !d.ally }
};
const QITEMS = {
  pelt: ['pele_lobo', 'pele_urso', 'couro', 'presa', 'chifre'],
  herb: ['erva_vermelha', 'erva_azul', 'cogumelo', 'flor_fogo', 'raiz_gelo'],
  ore: ['minerio_ferro', 'minerio_prata', 'minerio_ouro', 'lingote_ferro', 'lingote_aco', 'minerio_obsidiana', 'minerio_malaquita'],
  arcane: ['essencia_fogo', 'essencia_gelo', 'ectoplasma', 'ametista', 'safira', 'cogumelo', 'erva_azul'],
  misc: ['osso', 'seda_aranha', 'gosma', 'pele_lobo', 'erva_vermelha', 'couro'],
  gems: ['rubi', 'safira', 'esmeralda', 'ametista']
};
const UNDEAD_DUNGEONS = ['cripta', 'tumulo_nordico', 'cripta_sombria', 'tumba_deserto'];

const Quests = {
  get P() { return Game.player; },
  regionLvl(s) { const R = s.region; return clamp(this.P.level, R.lvl[0], R.lvl[1] + 4); },
  generate(qtype, s, rng, guildId, key) {
    const P = this.P, W = Game.world;
    const L = Math.max(this.regionLvl(s), 1);
    const q = { id: uid(), key, guild: guildId || null, giver: { sid: s.id, name: s.name }, status: 'active', prog: 0, region: s.region.id };
    const reward = (g, x, rep = 1) => { q.reward = { gold: Math.round(g * rng.range(0.9, 1.2)), xp: Math.round(x * rng.range(0.9, 1.15)), rep }; };
    let kind = qtype;
    if (qtype === 'kill_undead') kind = 'kill_cat:undead';
    if (qtype === 'kill_animal') kind = 'kill_cat:animal';
    if (qtype === 'kill_strong') kind = 'kill_cat:strong';
    if (qtype === 'collect_pelt') kind = 'collect:pelt';
    if (qtype === 'collect_herb') kind = 'collect:herb';
    if (qtype === 'collect_ore') kind = 'collect:ore';
    if (qtype === 'collect') kind = 'collect:' + (guildId === 'magos' ? 'arcane' : guildId === 'ladroes' ? 'gems' : 'misc');
    if (qtype === 'clear_undead') kind = 'clear:undead';
    if (kind === 'kill') {
      const list = SPAWNS[s.region.id].day.concat(SPAWNS[s.region.id].night).map(e => e[0]).filter(id => !ENEMIES[id].passive);
      const id = rng.pick(list);
      const d = ENEMIES[id];
      const n = clamp(Math.round(rng.int(4, 8) * 40 / Math.max(30, d.hp)), 2, 8);
      q.kind = 'kill'; q.t = { enemy: id }; q.n = n;
      q.title = `Caçada: ${d.name}`;
      q.desc = `Elimine ${n}x ${d.name} na região de ${s.region.short}. Eles têm atacado viajantes.`;
      reward(20 + L * 9 * n / 3, 30 + L * 8 * n / 3);
    } else if (kind.startsWith('kill_cat')) {
      const cat = kind.split(':')[1];
      const n = rng.int(4, 8);
      q.kind = 'kill'; q.t = { cat }; q.n = n;
      q.title = cat === 'undead' ? 'Purificação' : cat === 'animal' ? 'Grande Caçada' : 'Prova de Força';
      q.desc = `Derrote ${n} ${QCATS[cat].name} em qualquer lugar do mundo.`;
      reward(30 + L * 12, 40 + L * 12);
    } else if (kind.startsWith('collect')) {
      const cat = kind.split(':')[1];
      const id = rng.pick(QITEMS[cat]);
      const it = ITEMS[id];
      const n = it.value > 60 ? rng.int(1, 2) : it.value > 20 ? rng.int(2, 4) : rng.int(3, 8);
      q.kind = 'collect'; q.t = { item: id }; q.n = n;
      q.title = `Encomenda: ${it.name}`;
      q.desc = `Traga ${n}x ${it.name} para ${guildId ? GUILDS[guildId].name : s.name}.`;
      reward(20 + it.value * n * 1.6 + L * 4, 25 + L * 7);
    } else if (kind.startsWith('clear')) {
      const undead = kind.endsWith('undead');
      let cands = W.dungeons.filter(d => !d.unique && !Game.mods.cleared[d.id] && d.lvl <= P.level + 4 && (!undead || UNDEAD_DUNGEONS.includes(d.type)));
      cands.sort((a, b) => dist(a.x, a.y, s.x, s.y) - dist(b.x, b.y, s.x, s.y));
      cands = cands.slice(0, 6);
      if (!cands.length) return this.generate('kill', s, rng, guildId, key);
      const d = rng.pick(cands);
      q.kind = 'clear'; q.t = { dungeon: d.id }; q.n = 1;
      q.title = `Expedição: ${d.name}`;
      q.desc = `Entre em ${d.name} (Nv ${d.lvl}) e derrote o líder de lá.`;
      reward(60 + d.lvl * 26, 90 + d.lvl * 26, 2);
    } else if (kind === 'camp') {
      const cands = W.pois.filter(p => p.kind === 'camp' && !Game.campCleared(p)).sort((a, b) => dist(a.x, a.y, s.x, s.y) - dist(b.x, b.y, s.x, s.y)).slice(0, 4);
      if (!cands.length) return this.generate('kill', s, rng, guildId, key);
      const p = rng.pick(cands);
      q.kind = 'camp'; q.t = { camp: p.id }; q.n = 1;
      q.title = `Recompensa: ${p.name}`;
      q.desc = `Um ${p.name.toLowerCase()} foi visto em ${p.region.short}. Elimine todos lá.`;
      reward(50 + p.lvl * 22, 70 + p.lvl * 20, 2);
    } else if (kind === 'deliver') {
      const cands = W.settlements.filter(o => o !== s && dist(o.x, o.y, s.x, s.y) > 150 && dist(o.x, o.y, s.x, s.y) < 1300 && !o.region.hostile && (o.x >= WORLD_TILES) === (s.x >= WORLD_TILES) && !o.academy);
      if (!cands.length) return this.generate('kill', s, rng, guildId, key);
      const dst = rng.pick(cands);
      const dd = dist(dst.x, dst.y, s.x, s.y);
      q.kind = 'deliver'; q.t = { dest: dst.id, item: rng.chance(0.5) ? 'pacote' : 'carta' }; q.n = 1;
      q.title = `Entrega para ${dst.name}`;
      q.desc = `Leve ${ITEMS[q.t.item].name.toLowerCase()} até ${dst.name} (${dst.region.short}) e entregue em qualquer estabelecimento da cidade.`;
      reward(30 + dd / 6 + L * 4, 40 + dd / 8 + L * 5);
    }
    if (guildId === 'herois') { q.reward.gold = Math.round(q.reward.gold * 1.1); }
    return q;
  },
  offers(guildId, s) {
    const P = this.P;
    const g = guildId ? GUILDS[guildId] : null;
    const types = g ? g.qtypes : ['kill', 'collect', 'deliver', 'camp'];
    const out = [];
    for (let i = 0; i < 3; i++) {
      const key = `${guildId || 'npc'}:${s.id}:${Game.day}:${P.doneQuests}:${i}`;
      if (P.quests.some(q => q.key === key)) continue;
      const rng = new RNG(hashStr(key) + Game.world.seed);
      out.push(this.generate(rng.pick(types), s, rng, guildId, key));
    }
    return out;
  },
  accept(q) {
    const P = this.P;
    if (P.quests.filter(x => !x.main).length >= 12) { Game.toast('Diário cheio! Conclua algumas missões.', '#ff9090'); return false; }
    P.quests.push(q);
    if (q.kind === 'deliver') P.addItem(Items.make(q.t.item), true);
    if (q.kind === 'clear') Game.discover(q.t.dungeon);
    if (q.kind === 'camp') Game.discover(q.t.camp);
    this.onInventory();
    Game.toast('Nova missão: ' + q.title, '#ffd040');
    Sfx.play('quest');
    Game.track = q.id;
    return true;
  },
  isReady(q) { return q.status === 'ready'; },
  onKill(m) {
    const P = this.P; if (!P) return;
    for (const q of P.quests) {
      if (q.kind !== 'kill' || q.status !== 'active') continue;
      const d = m.def;
      const ok = q.t.enemy ? (m.eid === q.t.enemy) : QCATS[q.t.cat].test(d);
      if (!ok) continue;
      q.prog++;
      if (q.prog >= q.n) { q.status = 'ready'; Game.toast(`Missão pronta: ${q.title}`, '#80ff80'); Sfx.play('quest'); }
      else Game.toast(`${q.title}: ${q.prog}/${q.n}`, '#e0e0a0');
    }
  },
  onClear(did) {
    const P = this.P;
    for (const q of P.quests) if (q.kind === 'clear' && q.t.dungeon === did && q.status === 'active') { q.status = 'ready'; Game.toast(`Missão pronta: ${q.title}`, '#80ff80'); }
    const step = MAIN_QUEST[P.main];
    if (step && step.type === 'clear' && step.dungeon === did) this.advanceMain();
  },
  onCamp(pid) {
    for (const q of this.P.quests) if (q.kind === 'camp' && q.t.camp === pid && q.status === 'active') { q.status = 'ready'; Game.toast(`Missão pronta: ${q.title}`, '#80ff80'); }
  },
  onInventory() {
    const P = this.P; if (!P || !P.quests) return;
    for (const q of P.quests) if (q.kind === 'collect') {
      const c = P.count(q.t.item);
      q.prog = Math.min(c, q.n);
      const was = q.status;
      q.status = c >= q.n ? 'ready' : 'active';
      if (was !== 'ready' && q.status === 'ready' && Game.started) Game.toast(`Missão pronta: ${q.title}`, '#80ff80');
    }
  },
  // pode entregar neste prédio?
  turnInHere(q, b) {
    if (q.status !== 'ready' || q.main) return false;
    if (q.guild) {
      if (b.role !== 'guild') return false;
      if (q.guild === 'herois') return b.guild === 'herois';
      return b.guild === q.guild;
    }
    return false;
  },
  turnInNpc(q, s) { return q.status === 'ready' && !q.guild && !q.main && q.giver.sid === s.id; },
  complete(q) {
    const P = this.P;
    if (q.kind === 'collect') { if (!P.removeItem(q.t.item, q.n)) { Game.toast('Itens insuficientes.', '#ff8080'); return false; } }
    P.quests = P.quests.filter(x => x !== q);
    P.doneQuests++; P.stats.quests++;
    const g = Math.round(q.reward.gold * (P.perks.has('negociante') ? 1.1 : 1));
    P.gold += g;
    const xp = P.addXP(q.reward.xp);
    Game.toast(`Missão concluída! +${g} ouro, +${xp} XP`, '#ffd040');
    Sfx.play('coin');
    if (q.guild) this.addRep(q.guild, q.reward.rep || 1);
    if (Game.track === q.id) Game.track = null;
    return true;
  },
  deliverHere(s) {
    const P = this.P;
    const qs = P.quests.filter(q => q.kind === 'deliver' && q.t.dest === s.id);
    for (const q of qs) { P.removeItem(q.t.item, 1); this.complete(q); }
    return qs.length;
  },
  addRep(gid, n) {
    const P = this.P, g = GUILDS[gid];
    const m = P.guilds[gid]; if (!m) return;
    m.rep += n;
    while (m.rank < g.ranks.length - 1 && m.rep >= g.th[m.rank + 1]) {
      m.rank++;
      Game.toast(`${g.name}: promovido a ${g.ranks[m.rank]}!`, g.color);
      Game.chron(`Fui promovido(a) a ${g.ranks[m.rank]} na ${g.name}.`);
      Sfx.play('levelup');
      const rw = g.rewards[m.rank];
      if (rw) this.giveReward(rw);
    }
  },
  giveReward(rw) {
    const P = this.P;
    if (rw.gold) { P.gold += rw.gold; Game.toast(`+${rw.gold} ouro`, '#ffd040'); }
    if (rw.item) { const [id, n] = Items.parse(rw.item); const it = Items.make(id, n); if (ITEMS[id].type === 'weapon' || ITEMS[id].type === 'armor') { if (!ITEMS[id].unique) { it.r = 2; Items.addEnchants(it, 1, P.level, new RNG(Date.now() & 0xffff)); } } P.addItem(it); }
    if (rw.spell && !P.spells.includes(rw.spell)) { P.spells.push(rw.spell); Game.toast('Magia aprendida: ' + SPELLS[rw.spell].name, '#c0a0ff'); }
  },
  join(gid) {
    const P = this.P;
    if (P.guilds[gid]) return;
    P.guilds[gid] = { rank: 0, rep: 0 };
    Game.toast(`Você entrou na ${GUILDS[gid].name}!`, GUILDS[gid].color);
    Game.chron(`Entrei para a ${GUILDS[gid].name}.`);
    Sfx.play('levelup');
  },
  // ---------- História ----------
  mainStep() { return this.P.freeMode ? null : (MAIN_QUEST[this.P.main] || null); },
  advanceMain() {
    const P = this.P;
    const step = MAIN_QUEST[P.main];
    if (!step) return;
    if (step.reward) {
      if (step.reward.gold) P.gold += step.reward.gold;
      if (step.reward.xp) P.addXP(step.reward.xp);
      if (step.reward.item) { const [id, n] = Items.parse(step.reward.item); P.addItem(Items.make(id, n)); }
    }
    P.main++;
    Sfx.play('quest');
    const next = MAIN_QUEST[P.main];
    if (next) {
      Game.toast(`História: ${next.title}`, '#ffb040');
      Game.centerMsg(next.title, next.desc);
      if (next.dungeon) Game.discover(next.dungeon);
      Game.track = 'main';
    } else {
      Game.victory();
    }
  },
  // posição alvo para a bússola (tiles)
  targetPos(q) {
    const W = Game.world;
    if (!q) return null;
    if (q === 'main' || q.main) {
      const st = this.mainStep(); if (!st) return null;
      if (st.type === 'talk') { const cap = W.settlements.find(s => s.region.id === st.region && s.type === 'capital'); if (!cap) return null; const b = cap.buildings.find(b => b.role === 'ruler'); return b && b.door ? { x: b.door.x, y: b.door.y + 1, name: cap.name } : { x: cap.x, y: cap.y, name: cap.name }; }
      if (st.type === 'clear') { const d = W.dungeonById[st.dungeon]; return d ? { x: d.x, y: d.y + 1, name: d.name, dungeon: d.id } : null; }
      return null;
    }
    if (q.status === 'ready') {
      if (q.guild) {
        let best = null, bd = Infinity;
        for (const s of W.settlements) for (const b of s.buildings) if (b.role === 'guild' && (q.guild === 'herois' ? b.guild === 'herois' : b.guild === q.guild) && b.door) {
          const d = dist2(b.door.x, b.door.y, Game.player.x / 16, Game.player.y / 16); if (d < bd) { bd = d; best = { x: b.door.x, y: b.door.y + 1, name: b.name }; }
        }
        return best;
      }
      const s = W.settlements.find(s => s.id === q.giver.sid); return s ? { x: s.mid.x, y: s.mid.y, name: s.name } : null;
    }
    if (q.kind === 'clear') { const d = W.dungeonById[q.t.dungeon]; return d ? { x: d.x, y: d.y + 1, name: d.name, dungeon: d.id } : null; }
    if (q.kind === 'camp') { const p = W.pois.find(p => p.id === q.t.camp); return p ? { x: p.x, y: p.y, name: p.name } : null; }
    if (q.kind === 'deliver') { const s = W.settlements.find(s => s.id === q.t.dest); return s ? { x: s.mid.x, y: s.mid.y, name: s.name } : null; }
    if (q.kind === 'kill' && q.t.enemy) { const R = REGION_BY_ID[q.region]; const reg = W.regions[R.index]; return { x: reg.cx, y: reg.cy, name: R.short, region: true }; }
    return null;
  },
  progressText(q) {
    if (q === 'main' || q.main) { const st = this.mainStep(); return st ? st.desc : ''; }
    if (q.status === 'ready') return q.guild ? `Volte à ${GUILDS[q.guild].name}` : `Volte a ${q.giver.name}`;
    if (q.kind === 'kill') return `${q.prog}/${q.n}`;
    if (q.kind === 'collect') return `${Math.min(q.prog, q.n)}/${q.n} ${ITEMS[q.t.item].name}`;
    if (q.kind === 'clear') { const d = Game.world.dungeonById[q.t.dungeon]; return d ? d.name : ''; }
    if (q.kind === 'deliver') { const s = Game.world.settlements.find(s => s.id === q.t.dest); return 'Entregar em ' + (s ? s.name : '?'); }
    if (q.kind === 'camp') return 'Limpar acampamento';
    return '';
  }
};
