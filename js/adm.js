'use strict';
// ===================== VERSÃO ADM (painel de testes) =====================
// Só aparece no APK "Eldoria ADM" ou abrindo o jogo com ?adm no endereço.
// Serve para testar guerras, batalhas, itens e o mundo sem precisar jogar horas.
const Adm = {
  on: IS_ADM,
  tab: 'jogador',
  speed: 1, noclip: false, infinite: false, tp: false,
  init() {
    if (!this.on) return;
    const bar = document.getElementById('topbtns');
    const b = document.createElement('button');
    b.className = 'tbtn adm'; b.id = 'b-adm'; b.textContent = 'ADM';
    b.addEventListener('click', ev => { ev.stopPropagation(); if (Game.started) this.open(); });
    bar.insertBefore(b, bar.firstChild);
  },
  update() {
    if (!this.on || !Game.started) return;
    const P = Game.player;
    if (this.infinite) { P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; }
  },
  P() { return Game.player; },
  msg(t) { Game.toast('ADM: ' + t, '#ff80c0'); },

  // ---------- Painel ----------
  open(tab) {
    if (tab) this.tab = tab;
    const f = UI.reg(), T = this.tab;
    const tabs = [['jogador', 'Jogador'], ['itens', 'Itens'], ['mundo', 'Mundo'], ['guerra', 'Guerra'], ['inimigos', 'Inimigos']];
    const b = (label, fn, cls = '') => `<button class="sbtn ${cls}" ${f(fn)}>${label}</button>`;
    const tog = (label, v, fn) => b(`${label}: ${v ? 'SIM' : 'NÃO'}`, fn, v ? 'on' : '');
    let body = '';
    const P = this.P();
    if (T === 'jogador') {
      body = `<div class="adm-grid">
        ${tog('Modo deus', Game.godMode, () => { Game.godMode = !Game.godMode; this.open(); })}
        ${tog('Vida/mana/vigor infinitos', this.infinite, () => { this.infinite = !this.infinite; this.open(); })}
        ${tog('Atravessar paredes', this.noclip, () => { this.noclip = !this.noclip; this.open(); })}
        ${tog('Invisível', P.invisible > 1e6, () => { P.invisible = P.invisible > 1e6 ? 0 : 1e9; this.open(); })}
        <div class="adm-row">Velocidade: ${[1, 2, 4, 8].map(v => b(v + 'x', () => { this.speed = v; this.open(); }, this.speed === v ? 'on' : '')).join('')}</div>
        ${b('+10.000 ouro', () => { P.gold += 10000; this.msg('+10.000 ouro'); this.open(); })}
        ${b('+1 nível', () => { this.levels(1); })} ${b('+10 níveis', () => { this.levels(10); })}
        ${b('Todas as habilidades 100', () => { for (const k in P.skills) P.skills[k].lvl = 100; P.recalc(); this.msg('habilidades no máximo'); })}
        ${b('Aprender todas as magias', () => { for (const k in SPELLS) if (!P.spells.includes(k)) P.spells.push(k); P.magicAwake = true; this.msg(`${P.spells.length} magias`); })}
        ${b('Aprender todos os gritos', () => { for (const k in SHOUTS) { if (!P.shouts.includes(k)) P.shouts.push(k); P.shoutLvl[k] = 3; } this.msg(`${P.shouts.length} gritos`); })}
        ${b('Curar tudo', () => { P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; P.fx = []; this.msg('curado'); })}
        ${b('Ganhar cavalo de guerra', () => { P.mount = MOUNTS.cavalo_guerra ? 'cavalo_guerra' : 'cavalo'; P.hasHorse = true; P.horse = { x: P.x + 20, y: P.y + 8, dir: 'right' }; this.msg('cavalo ao seu lado'); })}
        ${Work.cur ? b('Completar turno de trabalho', () => { Work.cur.done = Work.cur.quota; Work.finish('ADM completou o turno.'); UI.close(); }) : ''}
      </div>`;
    } else if (T === 'itens') {
      body = `<input id="adm-q" class="adm-input" placeholder="Procurar item (ex.: mosquete, espada, poção)..." value="${esc(this.q || '')}"><div id="adm-items" class="adm-list"></div>`;
    } else if (T === 'mundo') {
      const caps = Game.world.settlements.filter(s => s.type === 'capital' || s.port).sort((a, b) => a.name.localeCompare(b.name));
      body = `<div class="adm-grid">
        ${tog('Teleporte tocando no mapa', this.tp, () => { this.tp = !this.tp; this.open(); })}
        ${b('Revelar o mapa inteiro', () => { Game.mods.explored.fill(1); for (const s of Game.world.settlements) Game.mods.discovered.add(s.id); for (const d of Game.world.dungeons) Game.mods.discovered.add(d.id); this.msg('mapa revelado'); })}
        <div class="adm-row">Ir para: <select id="adm-goto" class="adm-sel">${caps.map(s => `<option value="${s.id}">${esc(s.name)} (${CONTINENTS[contAt(s.x, s.y)]})</option>`).join('')}</select>${b('Ir', () => { const s = Game.world.settlements.find(x => x.id === document.getElementById('adm-goto').value); if (s) { const g = s.gates.find(g => g.dir === 's') || s.gates[0]; this.teleport(g.x, g.y + 2); } })}</div>
        <div class="adm-row">Hora: ${[[6, 'Manhã'], [12, 'Meio-dia'], [18, 'Tarde'], [22, 'Noite']].map(([h, n]) => b(n, () => { Game.time = h * 60; this.msg(n); })).join('')}</div>
        <div class="adm-row">Tempo: ${b('+1 dia', () => this.days(1))} ${b('+7 dias', () => this.days(7))} ${b('+30 dias', () => this.days(30))}</div>
        <div class="adm-row">Clima: ${[[null, 'Limpo'], ['rain', 'Chuva'], ['storm', 'Tempestade'], ['snow', 'Neve'], ['sand', 'Areia'], ['ash', 'Cinzas']].map(([k, n]) => b(n, () => { Game.weather.kind = k; Game.weather.t = 600; this.msg('clima: ' + n); })).join('')}</div>
      </div>`;
    } else if (T === 'guerra') {
      const K = War.kingdoms(), S = War.st();
      const opt = sel => K.map(k => `<option value="${k.id}" ${sel === k.id ? 'selected' : ''}>${esc(k.short)} (${CONTINENTS[k.cont]})</option>`).join('');
      const wars = S.wars.map((w, i) => `<div class="adm-war"><span style="color:${War.K[w.a].color}">${esc(War.K[w.a].short)}</span> × <span style="color:${War.K[w.b].color}">${esc(War.K[w.b].short)}</span> <small class="dim">desde o dia ${w.since}</small> ${b('Paz', () => { War.peace(w); this.open(); })}</div>`).join('') || '<div class="dim">Nenhuma guerra agora.</div>';
      body = `<div class="adm-row">Reino A <select id="adm-ka" class="adm-sel">${opt(this.ka || 'aurelion')}</select> Reino B <select id="adm-kb" class="adm-sel">${opt(this.kb || 'ferrania')}</select></div>
        <div class="adm-grid">
          ${b('⚔ Declarar guerra A × B', () => { const [a, c] = this.pair(); if (a) { War.declare(a, c); this.open(); } })}
          ${b('🕊 Paz entre A e B', () => { const [a, c] = this.pair(); const w = a && S.wars.find(w => (w.a === a && w.b === c) || (w.a === c && w.b === a)); if (w) War.peace(w); else this.msg('eles não estão em guerra'); this.open(); })}
          ${b('Batalha AQUI (A × B)', () => this.battleHere())}
          ${b('Batalha naval AQUI (A × B)', () => this.navalHere())}
          ${b('Mosqueteiros em linha AQUI (A × B)', () => this.lineHere())}
          ${b('A conquista a cidade mais próxima', () => this.conquerNear())}
          ${b('Exército de A marcha até aqui', () => this.armyHere())}
          ${b('Guerra entre todos os vizinhos', () => { for (const k of K) for (const o of k.nb) if (k.id < o) War.declare(k.id, o, true); this.msg('guerra geral'); this.open(); })}
          ${b('Paz mundial', () => { for (const w of S.wars.slice()) War.peace(w); this.msg('paz em todo o mundo'); this.open(); })}
          ${b('Avançar a guerra +1 dia', () => { this.days(1); this.open(); })}
        </div>
        <h3>Guerras (${S.wars.length}) • exércitos: ${S.armies.length} • batalhas: ${S.battles.length} • frotas: ${(S.fleets || []).length}</h3>${wars}`;
    } else if (T === 'inimigos') {
      const ids = Object.keys(ENEMIES).filter(k => !ENEMIES[k].ally).sort((a, b) => ENEMIES[a].name.localeCompare(ENEMIES[b].name));
      body = `<div class="adm-row">Criatura <select id="adm-en" class="adm-sel">${ids.map(k => `<option value="${k}" ${this.en === k ? 'selected' : ''}>${esc(ENEMIES[k].name)}${ENEMIES[k].boss ? ' (chefe)' : ''}</option>`).join('')}</select>
        Nível <select id="adm-lv" class="adm-sel">${[1, 5, 10, 20, 30, 50].map(v => `<option ${this.lv === v ? 'selected' : ''}>${v}</option>`).join('')}</select></div>
        <div class="adm-grid">
          ${b('Criar 1', () => this.spawn(1))} ${b('Criar 5', () => this.spawn(5))} ${b('Criar 20', () => this.spawn(20))}
          ${b('Chamar um dragão', () => { Game.dragonT = 0; this.msg('um dragão está vindo...'); UI.close(); })}
          ${b('Matar inimigos por perto', () => { let n = 0; for (const a of Game.actors) if (!a.dead && a.team !== 'ally' && a.team !== 'npc' && !(a instanceof NPC) && dist(a.x, a.y, P.x, P.y) < 400 && (a.team === 'enemy' || a.faction)) { a.hp = 0; a.die(P); n++; } this.msg(`${n} derrotados`); })}
          ${b('Remover todos os inimigos', () => { const n = Game.actors.length; Game.actors = Game.actors.filter(a => !(a.team === 'enemy' || (a.faction && !a.guard))); this.msg(`${n - Game.actors.length} removidos`); })}
        </div>`;
    }
    const el = UI.show('adm', `<div class="panel wide adm-panel"><div class="ptitle"><span class="adm-badge">ADM</span> Painel de testes</div>
      <div class="adm-tabs">${tabs.map(([k, n]) => b(n, () => this.open(k), T === k ? 'on' : '')).join('')}</div>
      <div class="adm-body">${body}</div>
      <button class="mbtn" ${f(() => UI.close())}>Fechar</button></div>`, { onBack: () => UI.close() });
    UI.bind(el, f);
    Game.paused = true;
    for (const id of ['adm-ka', 'adm-kb', 'adm-en', 'adm-lv']) { const s = document.getElementById(id); if (s) s.addEventListener('change', () => { this.ka = this.val('adm-ka', this.ka); this.kb = this.val('adm-kb', this.kb); this.en = this.val('adm-en', this.en); this.lv = +this.val('adm-lv', this.lv || 10); }); }
    if (T === 'itens') {
      const q = document.getElementById('adm-q'), list = document.getElementById('adm-items');
      const render = () => {
        this.q = q.value;
        const s = q.value.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        const items = Object.entries(ITEMS).filter(([id, d]) => !s || (d.name + ' ' + id).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').includes(s)).slice(0, 80);
        list.innerHTML = items.map(([id, d]) => `<div class="adm-item"><img src="${Sprites.iconURL(d.icon)}"><span>${esc(d.name)} <small class="dim">${{ weapon: 'arma', armor: 'armadura', potion: 'poção', food: 'comida', mat: 'material', book: 'livro', ammo: 'munição', key: 'chave', misc: 'item' }[d.type] || d.type || ''}${d.lvl ? ' • nv ' + d.lvl : ''}</small></span><button class="sbtn small" data-give="${id}" data-n="1">+1</button><button class="sbtn small" data-give="${id}" data-n="10">+10</button></div>`).join('') || '<div class="dim">Nada encontrado.</div>';
      };
      q.addEventListener('input', render);
      q.addEventListener('keydown', ev => ev.stopPropagation());
      list.addEventListener('click', ev => { const t = ev.target.closest('[data-give]'); if (!t) return; ev.stopPropagation(); const id = t.dataset.give, n = +t.dataset.n; P.addItem(Items.make(id, n)); Sfx.play('pickup'); this.msg(`${ITEMS[id].name} x${n}`); });
      render();
    }
  },
  val(id, def) { const e = document.getElementById(id); return e ? e.value : def; },
  pair() {
    const a = this.ka = this.val('adm-ka', this.ka), b = this.kb = this.val('adm-kb', this.kb);
    if (!a || !b || a === b) { this.msg('escolha dois reinos diferentes'); return []; }
    return [a, b];
  },

  // ---------- Ações ----------
  levels(n) { const P = this.P(); for (let i = 0; i < n; i++) P.addXP(Math.max(1, P.needXP() - P.xp)); this.msg(`nível ${P.level}`); this.open(); },
  days(n) {
    // cada dia avança também a simulação da guerra (dias e horas: exércitos, cercos, frotas)
    for (let i = 0; i < n; i++) { Game.day++; Game.mods.day = Game.day; Game.dayTick(); War.update(0); }
    this.msg(`+${n} dia(s): agora é o dia ${Game.day}`);
  },
  teleport(tx, ty) {
    const G = Game, P = G.player;
    UI.close();
    if (!G.level.isWorld) { G.worldPos = { x: tx * 16 + 8, y: ty * 16 + 8 }; G.exitDungeon(); }
    P.mounted = false; P.x = tx * 16 + 8; P.y = ty * 16 + 8; G.findFree(P);
    G.actors = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    for (const a of G.actors) { a.x = P.x + 10; a.y = P.y + 4; G.findFree(a); }
    for (const s of G.world.settlements) { s.active = false; s.npcs = null; }
    for (const p of G.world.pois) p.spawned = false;
    War.clearLive();
    G.projectiles = []; G.pickups = [];
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2;
    if (P.horse) { P.horse.x = P.x - 20; P.horse.y = P.y + 8; }
    UI.fade(); this.msg('teletransportado');
  },
  needWorld() { if (!Game.level.isWorld) { this.msg('saia para o mundo aberto primeiro'); return false; } return true; },
  ensureWar(a, b) { if (!War.atWar(a, b)) War.declare(a, b, true); },
  // dois exércitos de verdade se encontram onde o jogador está
  battleHere() {
    const [a, b] = this.pair(); if (!a || !this.needWorld()) return;
    this.ensureWar(a, b);
    const S = War.st(), P = this.P(), x = P.x / 16, y = P.y / 16;
    const mk = (k, foe, dx) => { const n = 60; const ar = { id: S.id++, k, foe, x: x + dx, y, n, n0: n, state: 'march', target: null, siegeT: 0, from: null }; S.armies.push(ar); return ar; };
    const A = mk(a, b, -8), B = mk(b, a, 8);
    War.startBattle(A, B);
    UI.close(); this.msg(`batalha ${War.K[a].short} × ${War.K[b].short} começando aqui!`);
  },
  armyHere() {
    const [a, b] = this.pair(); if (!a || !this.needWorld()) return;
    this.ensureWar(a, b);
    const S = War.st(), P = this.P(), ar = { id: S.id++, k: a, foe: b, x: P.x / 16 + 25, y: P.y / 16, n: 50, n0: 50, state: 'march', target: null, siegeT: 0, from: null };
    S.armies.push(ar);
    UI.close(); this.msg(`um exército de ${War.K[a].short} está marchando aqui perto`);
  },
  // duas linhas de mosqueteiros frente a frente (para ver salvas e baionetas)
  lineHere() {
    const [a, b] = this.pair(); if (!a || !this.needWorld()) return;
    this.ensureWar(a, b);
    const P = this.P(), rng = new RNG(Math.floor(Math.random() * 1e9));
    for (const [k, side] of [[a, -1], [b, 1]]) {
      const kind = KSTYLE[k].musket ? 'mosqueteiro' : 'soldado';
      for (let i = 0; i < 8; i++) {
        const x = P.x + side * 140, y = P.y - 90 + i * 24;
        const m = War.makeSoldier(k, i % 4 === 3 ? 'soldado' : kind, x, y, rng);
        m.ctrl = null; m.home = { x, y }; m.line = m.ai === 'musket' ? { x, y } : null; m.aggro = 400;
        Game.findFree(m); Game.actors.push(m);
      }
    }
    UI.close(); this.msg('linhas formadas');
  },
  conquerNear() {
    const [a] = this.pair(); if (!a) return;
    const P = this.P(), W = Game.world;
    const s = W.settlements.filter(s => War.ownerOf(s) && War.ownerOf(s) !== a && !s.academy).sort((x, y) => dist(x.mid.x, x.mid.y, P.x / 16, P.y / 16) - dist(y.mid.x, y.mid.y, P.x / 16, P.y / 16))[0];
    if (!s) return this.msg('nenhuma cidade para conquistar');
    const foe = War.ownerOf(s); this.ensureWar(a, foe);
    War.conquer(s, { k: a, foe });
    this.msg(`${War.K[a].short} conquistou ${s.name}`); this.open();
  },
  navalHere() {
    const [a, b] = this.pair(); if (!a) return;
    if (!Game.world.mapDone) while (!Game.world.mapDone) Game.world.stepMapImage(64);
    const G = Naval.grid(); if (!G) return this.msg('mapa do mar ainda não está pronto');
    this.ensureWar(a, b);
    const P = this.P(), cx = Math.floor(P.x / 256), cy = Math.floor(P.y / 256);
    let sea = null, bd = Infinity;
    for (let dy = -14; dy <= 14; dy++) for (let dx = -14; dx <= 14; dx++) { const x = cx + dx, y = cy + dy; if (x < 0 || y < 0 || x >= G.w || y >= G.h) continue; const i = y * G.w + x; if (Naval.isOcean(i) && dx * dx + dy * dy < bd) { bd = dx * dx + dy * dy; sea = i; } }
    if (sea === null) return this.msg('não há mar aberto por perto — vá até a costa');
    const sx = sea % G.w, sy = (sea / G.w) | 0; let c1 = null, c2 = null;
    for (let r = 2; r < 10 && !(c1 !== null && c2 !== null); r++) for (let k = 0; k < 16; k++) { const ang = k / 16 * Math.PI * 2, i = Math.round(sy + Math.sin(ang) * r) * G.w + Math.round(sx + Math.cos(ang) * r); if (!Naval.isOcean(i) || G.comp[i] !== G.comp[sea]) continue; if (c1 === null) c1 = i; else if (c2 === null && Math.abs((i % G.w) - (c1 % G.w)) + Math.abs(((i / G.w) | 0) - ((c1 / G.w) | 0)) > 3) c2 = i; }
    if (c1 === null || c2 === null) return this.msg('mar pequeno demais aqui');
    const S = Naval.st(), home = Game.world.settlements.slice().sort((x, y) => dist(x.mid.x, x.mid.y, P.x / 16, P.y / 16) - dist(y.mid.x, y.mid.y, P.x / 16, P.y / 16))[0];
    const mk = (k, foe, cell) => { const type = Naval.shipTypeOf(k), T = SHIP_TYPES[type]; const f = { id: S.id++, k, foe, ships: [0, 1, 2].map(() => ({ type, hp: T.hp, max: T.hp })), troops: 30, path: Naval.path(cell, sea) || [cell], pi: 0, state: 'sail', home: home.id, target: home.id }; S.fleets.push(f); return f; };
    const A = mk(a, b, c1), B = mk(b, a, c2);
    Naval.startBattle(A, B);
    const p = Naval.cellPx(sea);
    UI.close(); this.msg('batalha naval começando no mar mais próximo');
    if (Game.level.isWorld && dist(p.x, p.y, P.x, P.y) > 16 * 60) Game.toast('A batalha é no mar logo ali — olhe o mapa (💥).', '#ffb0d0');
  },
  spawn(n) {
    const id = this.en = this.val('adm-en', this.en), lv = this.lv = +this.val('adm-lv', this.lv || 10);
    if (!id) return;
    const P = this.P();
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, r = 50 + Math.random() * 40;
      const m = new Monster(id, P.x + Math.cos(a) * r, P.y + Math.sin(a) * r, lv);
      m.home = { x: m.x, y: m.y }; Game.findFree(m); Game.actors.push(m);
    }
    UI.close(); this.msg(`${n}x ${ENEMIES[id].name} (nv ${lv})`);
  },
  // toque no mapa com teleporte ligado
  mapTap(wx, wy) {
    if (!this.on || !this.tp) return false;
    if (wx < 0 || wy < 0 || wx >= WORLD_W || wy >= WORLD_H) return false;
    this.teleport(Math.floor(wx), Math.floor(wy));
    return true;
  }
};
