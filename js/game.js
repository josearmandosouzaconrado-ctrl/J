'use strict';
// ===================== NÚCLEO DO JOGO =====================
const SAVE_PREFIX = 'eldoria_save_';
const Game = {
  t: 0, started: false, paused: true, state: 'title',
  canvas: null, ctx: null, vw: 400, vh: 224, scale: 2,
  world: null, level: null, player: null,
  actors: [], projectiles: [], particles: [], floaters: [], fx: [], clouds: [], pickups: [], timers: [],
  mods: null, time: 8 * 60, day: 1, camX: 0, camY: 0, shake: 0, hitstop: 0, slowTime: 0, track: 'main',
  flow: null, flowT: 0, spawnT: 0, npcT: 0, discT: 0, dragonT: 30, autosaveT: 120, interact: null, interactT: 0,
  weather: { kind: null, t: 0, drops: [] }, curRegion: -1, curTown: null, settings: null,
  fps: 60, fpsAcc: 0, fpsN: 0,

  init() {
    this.canvas = document.getElementById('cv');
    this.ctx = this.canvas.getContext('2d');
    this.lightC = document.createElement('canvas'); this.lightX = this.lightC.getContext('2d');
    this.loadSettings();
    Sprites.init();
    Input.init();
    UI.init();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('orientationchange', () => setTimeout(() => this.resize(), 200));
    this.resize();
    document.addEventListener('visibilitychange', () => { if (document.hidden && this.started && !this.player.dead) this.saveGame(0, true); });
    let last = performance.now();
    const loop = (ts) => {
      let dt = (ts - last) / 1000; last = ts;
      if (dt > 0.1) dt = 0.1; if (dt < 0) dt = 0;
      this.frame(dt);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    UI.showTitle();
    if ('serviceWorker' in navigator && location.protocol.startsWith('http')) navigator.serviceWorker.register('sw.js').catch(() => { });
  },
  loadSettings() {
    let s = null;
    try { s = JSON.parse(localStorage.getItem('eldoria_settings')); } catch (e) { }
    this.settings = Object.assign({ sfx: true, music: true, sfxVol: 0.6, musicVol: 0.35, btnScale: 1, showFps: false, zoom: 1, weather: true }, s || {});
    Sfx.sfxOn = this.settings.sfx; Sfx.musicOn = this.settings.music; Sfx.sfxVol = this.settings.sfxVol; Sfx.musicVol = this.settings.musicVol;
  },
  saveSettings() {
    try { localStorage.setItem('eldoria_settings', JSON.stringify(this.settings)); } catch (e) { }
    Sfx.sfxOn = this.settings.sfx; Sfx.musicOn = this.settings.music; Sfx.sfxVol = this.settings.sfxVol; Sfx.musicVol = this.settings.musicVol; Sfx.setVolumes();
    document.documentElement.style.setProperty('--btn-scale', this.settings.btnScale);
    this.resize();
  },
  resize() {
    const w = window.innerWidth, h = window.innerHeight;
    const target = 232 / (this.settings ? this.settings.zoom : 1);
    const scale = Math.min(w, h) / target;
    this.scale = scale;
    this.vw = Math.ceil(w / scale); this.vh = Math.ceil(h / scale);
    this.canvas.width = this.vw; this.canvas.height = this.vh;
    this.canvas.style.width = w + 'px'; this.canvas.style.height = h + 'px';
    this.lightC.width = this.vw; this.lightC.height = this.vh;
    this.ctx.imageSmoothingEnabled = false;
    document.documentElement.style.setProperty('--btn-scale', this.settings ? this.settings.btnScale : 1);
  },

  // ---------- Novo jogo / carregar ----------
  newMods() {
    return { opened: new Set(), harvested: {}, cleared: {}, dopened: {}, camps: {}, runes: new Set(), shrines: {}, discovered: new Set(), explored: new Uint8Array(256 * 256), uniques: new Set(), treasures: [], day: 1 };
  },
  buildWorld(seed, cb) {
    UI.showLoading('Forjando o mundo de Eldoria...');
    setTimeout(() => {
      try {
        this.world = new World(seed);
        this.world.startMapImage();
        cb();
      } catch (e) { console.error(e); UI.showLoading('Erro ao gerar o mundo: ' + e.message); }
    }, 60);
  },
  newGame(opts) {
    const seed = opts.seed || (Math.floor(Math.random() * 1e9) + 1);
    this.buildWorld(seed, () => {
      this.mods = this.newMods();
      this.world.mods = this.mods;
      this.time = 7 * 60; this.day = 1;
      const P = new Player(opts);
      this.player = P;
      // começa numa vila de Valdoria perto da capital
      const W = this.world;
      const cap = W.settlements.find(s => s.region.id === 'valdoria' && s.type === 'capital') || W.settlements[0];
      const vill = W.settlements.filter(s => s.region.id === 'valdoria' && s.type === 'village').sort((a, b) => dist(a.x, a.y, cap.x, cap.y) - dist(b.x, b.y, cap.x, cap.y))[0] || cap;
      const g = vill.gates.find(g => g.dir === 's') || vill.gates[0];
      P.x = g.x * 16 + 8; P.y = (g.y + 3) * 16 + 8;
      this.findFree(P);
      P.lastTown = vill.id;
      this.mods.discovered.add(vill.id); this.mods.discovered.add(cap.id);
      P.quests = [];
      this.track = 'main';
      this.startPlay();
      UI.story([
        'O ano é 1247 da Era das Coroas. Os nove reinos de Eldoria vivem em paz frágil...',
        'Até que, numa manhã cinzenta, um DRAGÃO negro rasga o céu e destrói a caravana em que você viajava.',
        'Você é o único sobrevivente. Ao tocar uma escama caída, sente uma chama ardendo em seu peito.',
        `Seu nome é ${P.name}. E sua lenda começa agora.`
      ], () => {
        this.centerMsg(MAIN_QUEST[0].title, MAIN_QUEST[0].desc); this.saveGame(0, true);
        const tips = ['Dica: arraste o lado esquerdo da tela para andar. Empurre até o fim para correr.', 'Dica: o botão ⚔ ataca o inimigo mais próximo automaticamente.', 'Dica: siga a seta dourada no topo da tela até o objetivo.', 'Dica: entre na Guilda dos Heróis de qualquer cidade para pegar missões.', 'Dica: pessoas com "!" amarelo oferecem pedidos. Barracas vendem itens.', 'Dica: o botão dourado de ação aparece para falar, abrir baús, entrar e coletar.'];
        tips.forEach((t, i) => this.later(6 + i * 9, () => this.toast(t, '#a0e0ff')));
      });
    });
  },
  startPlay() {
    this.level = this.world;
    this.actors = []; this.projectiles = []; this.particles = []; this.fx = []; this.clouds = []; this.pickups = []; this.timers = []; this.floaters = [];
    this.started = true; this.paused = false; this.state = 'play';
    for (const s of this.world.settlements) { s.active = false; s.npcs = null; }
    for (const p of this.world.pois) { p.spawned = false; }
    this.curRegion = -1; this.curTown = null;
    this.player.dead = false;
    this.camX = this.player.x - this.vw / 2; this.camY = this.player.y - this.vh / 2;
    if (this.player.follower) this.spawnFollower();
    UI.showHUD(true);
    UI.closeAll();
    Quests.onInventory();
    Sfx.setMusic('field');
  },
  findFree(a) {
    const L = this.level || this.world;
    if (!collides(L, a.x, a.y, a.r)) return;
    for (let r = 1; r < 120; r++) for (let k = 0; k < 16 + r; k++) {
      const ang = k / (16 + r) * Math.PI * 2, x = a.x + Math.cos(ang) * r * 8, y = a.y + Math.sin(ang) * r * 8;
      if (!collides(L, x, y, a.r) && !TWATER[L.tileAt(Math.floor(x / 16), Math.floor(y / 16))]) { a.x = x; a.y = y; return; }
    }
  },
  hasSave(slot) { try { return !!localStorage.getItem(SAVE_PREFIX + slot); } catch (e) { return false; } },
  saveInfo(slot) { try { const s = JSON.parse(localStorage.getItem(SAVE_PREFIX + slot)); return s ? s.summary : null; } catch (e) { return null; } },
  saveGame(slot, silent) {
    if (!this.started || !this.player) return false;
    const P = this.player, M = this.mods;
    let px = P.x, py = P.y;
    if (!this.level.isWorld && this.worldPos) { px = this.worldPos.x; py = this.worldPos.y; }
    const exp = M.explored; let bin = ''; for (let i = 0; i < exp.length; i += 8192) bin += String.fromCharCode.apply(null, exp.subarray(i, i + 8192));
    const pj = P.toJSON(); pj.x = px; pj.y = py;
    const s = {
      v: 1, seed: this.world.seed, time: this.time, day: this.day, track: this.track, player: pj,
      mods: { opened: [...M.opened], harvested: M.harvested, cleared: M.cleared, dopened: M.dopened, camps: M.camps, runes: [...M.runes], shrines: M.shrines, discovered: [...M.discovered], explored: btoa(bin), uniques: [...M.uniques], treasures: M.treasures },
      summary: { name: P.name, level: P.level, race: RACES[P.race].name, cls: CLASSES[P.cls].name, loc: this.locationName(), date: Date.now(), time: Math.floor(P.stats.playTime) }
    };
    try {
      localStorage.setItem(SAVE_PREFIX + slot, JSON.stringify(s));
      if (!silent) this.toast('Jogo salvo!', '#80ff80');
      return true;
    } catch (e) { this.toast('Erro ao salvar: ' + e.message, '#ff8080'); return false; }
  },
  loadGame(slot) {
    let s;
    try { s = JSON.parse(localStorage.getItem(SAVE_PREFIX + slot)); } catch (e) { s = null; }
    if (!s) { UI.toast('Nenhum jogo salvo neste espaço.', '#ff8080'); return; }
    const go = () => {
      const M = this.newMods();
      const m = s.mods;
      M.opened = new Set(m.opened); M.harvested = m.harvested || {}; M.cleared = m.cleared || {}; M.dopened = m.dopened || {}; M.camps = m.camps || {};
      M.runes = new Set(m.runes || []); M.shrines = m.shrines || {}; M.discovered = new Set(m.discovered || []); M.uniques = new Set(m.uniques || []); M.treasures = m.treasures || [];
      try { const bin = atob(m.explored); for (let i = 0; i < bin.length && i < M.explored.length; i++) M.explored[i] = bin.charCodeAt(i); } catch (e) { }
      this.mods = M; this.world.mods = M; this.world.chunks.clear(); this.world.canvases.clear();
      this.time = s.time; this.day = s.day; M.day = s.day; this.track = s.track || 'main';
      this.player = Player.fromJSON(s.player);
      this.level = this.world;
      this.findFree(this.player);
      this.startPlay();
      this.toast('Jogo carregado.', '#80ff80');
    };
    if (this.world && this.world.seed === s.seed) { UI.showLoading('Carregando...'); setTimeout(go, 30); }
    else this.buildWorld(s.seed, go);
  },
  toTitle() {
    this.started = false; this.paused = true; this.state = 'title';
    UI.showHUD(false); UI.showTitle();
    Sfx.setMusic('title');
  },

  // ---------- Utilidades ----------
  toast(text, color, icon) { UI.toast(text, color, icon); },
  centerMsg(title, sub) { UI.centerMsg(title, sub); },
  floatText(x, y, text, color, size = 1) { UI.worldText(x, y, text, color, size); },
  floater(x, y, text, color, s = 1) { this.floaters.push({ x, y, text, color, s, t: 0 }); if (this.floaters.length > 60) this.floaters.shift(); },
  particle(x, y, vx, vy, color, life = 0.6, size = 1, grav = 0) { if (this.particles.length > 450) return; this.particles.push({ x, y, vx, vy, color, life, max: life, size, grav }); },
  burst(x, y, color, n = 8, spd = 60) { for (let i = 0; i < n; i++) { const a = Math.random() * Math.PI * 2, s = spd * (0.3 + Math.random() * 0.7); this.particle(x, y, Math.cos(a) * s, Math.sin(a) * s - 20, color, 0.3 + Math.random() * 0.4, Math.random() < 0.3 ? 2 : 1, 120); } },
  later(t, fn) { this.timers.push({ t, fn }); },
  isNight() { return this.time < 5 * 60 || this.time >= 20 * 60; },
  timeStr() { const h = Math.floor(this.time / 60), m = Math.floor(this.time % 60); return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`; },
  darkness() {
    if (!this.level.isWorld) return this.level.dark ? 0.9 : 0;
    const h = this.time / 60;
    let d;
    if (h >= 6.5 && h < 18) d = 0; else if (h >= 18 && h < 20.5) d = (h - 18) / 2.5 * 0.74; else if (h >= 4 && h < 6.5) d = (1 - (h - 4) / 2.5) * 0.74; else d = 0.74;
    if (this.player && RACES[this.player.race].nightvision) d *= 0.55;
    if (this.weather.kind === 'rain' || this.weather.kind === 'storm') d = Math.max(d, 0.18);
    return d;
  },
  locationName() {
    if (!this.level) return '';
    if (!this.level.isWorld) return this.level.name;
    const P = this.player;
    const s = this.world.settlementAt(Math.floor(P.x / 16), Math.floor(P.y / 16));
    if (s) return s.name;
    return this.world.regions[this.world.regAt(Math.floor(P.x / 16), Math.floor(P.y / 16))].name;
  },
  discover(id) {
    if (this.mods.discovered.has(id)) return;
    this.mods.discovered.add(id);
  },
  campCleared(p) { const d = this.mods.camps[p.id]; return d !== undefined && this.day - d < 5; },
  regionAtPlayer() { const P = this.player; return this.world.regions[this.world.regAt(Math.floor(P.x / 16), Math.floor(P.y / 16))]; },

  // ---------- Campo de fluxo para perseguição ----------
  computeFlow() {
    const P = this.player, L = this.level;
    const R = 18, N = R * 2 + 1;
    const ox = Math.floor(P.x / 16) - R, oy = Math.floor(P.y / 16) - R;
    if (!this.flow) this.flow = { d: new Int16Array(N * N), N, R };
    const f = this.flow; f.ox = ox; f.oy = oy;
    const d = f.d; d.fill(-1);
    const q = new Int32Array(N * N); let qh = 0, qt = 0;
    const s = R * N + R; d[s] = 0; q[qt++] = s;
    while (qh < qt) {
      const c = q[qh++], cx = c % N, cy = (c / N) | 0;
      const nd = d[c] + 1;
      for (let k = 0; k < 4; k++) {
        const nx = cx + (k === 0 ? 1 : k === 1 ? -1 : 0), ny = cy + (k === 2 ? 1 : k === 3 ? -1 : 0);
        if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
        const j = ny * N + nx;
        if (d[j] >= 0) continue;
        if (L.solidAt(ox + nx, oy + ny)) { d[j] = 32000; continue; }
        d[j] = nd; q[qt++] = j;
      }
    }
  },
  flowDir(x, y) {
    const f = this.flow; if (!f) return null;
    const tx = Math.floor(x / 16) - f.ox, ty = Math.floor(y / 16) - f.oy, N = f.N;
    if (tx < 1 || ty < 1 || tx >= N - 1 || ty >= N - 1) return null;
    const cur = f.d[ty * N + tx];
    if (cur <= 0 || cur >= 32000) return null;
    let best = cur, bx = 0, by = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const v = f.d[(ty + dy) * N + tx + dx];
      if (v < 0 || v >= 32000) continue;
      if (dx && dy) { const a = f.d[ty * N + tx + dx], b = f.d[(ty + dy) * N + tx]; if (a < 0 || a >= 32000 || b < 0 || b >= 32000) continue; }
      if (v < best) { best = v; bx = dx; by = dy; }
    }
    if (best === cur) return null;
    const cx = (f.ox + tx + bx) * 16 + 8, cy = (f.oy + ty + by) * 16 + 10;
    return Math.atan2(cy - y, cx - x);
  },

  // ---------- Loop ----------
  frame(dt) {
    this.t += dt;
    this.fpsAcc += dt; this.fpsN++;
    if (this.fpsAcc >= 1) { this.fps = Math.round(this.fpsN / this.fpsAcc); this.fpsAcc = 0; this.fpsN = 0; }
    Input.update();
    if (this.state === 'title') { this.renderTitle(dt); return; }
    if (!this.started) return;
    if (this.world && !this.world.mapDone) this.world.stepMapImage(6);
    if (!this.paused && !this.player.dead) {
      if (this.hitstop > 0) this.hitstop -= dt;
      else this.update(dt);
    } else if (this.player.dead) {
      this.updateFx(dt);
    }
    this.handleMenuKeys();
    this.render();
    UI.updateHUD(dt);
  },
  handleMenuKeys() {
    if (UI.current) {
      if (Input.consume('menu')) UI.back();
      Input.queue.delete('map');
      return;
    }
    if (!this.started || this.player.dead) { Input.clear(); return; }
    if (Input.consume('menu')) { UI.openMenu(); return; }
    if (Input.consume('map')) { UI.openMap(); return; }
  },
  update(dt) {
    const P = this.player;
    const W = this.world;
    // tempo
    this.time += dt * 2;
    if (this.time >= 1440) { this.time -= 1440; this.day++; this.mods.day = this.day; }
    if (this.slowTime > 0) this.slowTime -= dt;
    W.tick++;
    // ações do jogador
    if (Input.consume('attack') || (Input.held.attack && P.atkT <= 0)) P.attack();
    if (Input.consume('spell') || (Input.held.spell && P.castT <= 0 && SPELLS[P.spells[P.spellIdx]] && SPELLS[P.spells[P.spellIdx]].kind === 'proj')) P.castSpell();
    if (Input.consume('spellnext')) { if (P.spells.length) { P.spellIdx = (P.spellIdx + 1) % P.spells.length; this.toast('Magia: ' + SPELLS[P.spells[P.spellIdx]].name, SPELLS[P.spells[P.spellIdx]].color); } }
    for (let i = 1; i <= 9; i++) if (Input.consume('spell' + i) && P.spells[i - 1]) { P.spellIdx = i - 1; this.toast('Magia: ' + SPELLS[P.spells[i - 1]].name, SPELLS[P.spells[i - 1]].color); }
    if (Input.consume('roll')) P.roll();
    if (Input.consume('potion')) P.quickHeal();
    if (Input.consume('mana')) P.quickMana();
    if (Input.consume('shout')) P.shout();
    if (Input.consume('shoutnext')) { if (P.shouts.length) { P.shoutIdx = (P.shoutIdx + 1) % P.shouts.length; this.toast('Grito: ' + SHOUTS[P.shouts[P.shoutIdx]].name, '#ffd080'); } }
    if (Input.consume('racial')) P.racial();
    if (Input.consume('mount')) P.toggleMount();
    if (Input.consume('interact')) this.doInteract();
    P.update(dt);
    // campo de fluxo
    this.flowT -= dt;
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    if (this.flowT <= 0 || !this.flow || this.flow.ptx !== ptx || this.flow.pty !== pty) { this.computeFlow(); this.flow.ptx = ptx; this.flow.pty = pty; this.flowT = 0.5; }
    // atores
    for (const a of this.actors) { if (a.hidden) continue; a.update(dt); }
    this.separate();
    this.actors = this.actors.filter(a => !(a.dead && a.deadT > 0.7));
    this.updateProjectiles(dt);
    this.updateClouds(dt);
    this.updatePickups(dt);
    this.updateFx(dt);
    for (let i = this.timers.length - 1; i >= 0; i--) { const t = this.timers[i]; t.t -= dt; if (t.t <= 0) { this.timers.splice(i, 1); t.fn(); } }
    // sistemas do mundo
    if (this.level.isWorld) {
      this.npcT -= dt; if (this.npcT <= 0) { this.npcT = 1; this.manageNPCs(); }
      this.spawnT -= dt; if (this.spawnT <= 0) { this.spawnT = 1.2; this.spawnTick(); }
      this.discT -= dt; if (this.discT <= 0) { this.discT = 0.5; this.discoveryTick(); }
      W.pregen(P.x + (Input.move.x * 300), P.y + (Input.move.y * 300));
      this.updateWeather(dt);
    }
    this.autosaveT -= dt; if (this.autosaveT <= 0) { this.autosaveT = 150; this.saveGame(0, true); }
    this.interactT -= dt; if (this.interactT <= 0) { this.interactT = 0.12; this.findInteract(); }
    this.updateMusic();
    // câmera
    const lookX = P.x + Input.move.x * 18, lookY = P.y - 8 + Input.move.y * 14;
    this.camX = lerp(this.camX, lookX - this.vw / 2, Math.min(1, dt * 6));
    this.camY = lerp(this.camY, lookY - this.vh / 2, Math.min(1, dt * 6));
    if (!this.level.isWorld) {
      this.camX = clamp(this.camX, -16, this.level.w * 16 - this.vw + 16);
      this.camY = clamp(this.camY, -16, this.level.h * 16 - this.vh + 16);
    }
    if (this.shake > 0) this.shake = Math.max(0, this.shake - dt * 20);
  },
  separate() {
    const A = this.actors, P = this.player;
    const all = A.filter(a => !a.dead && !a.fly && !a.hidden);
    for (let i = 0; i < all.length; i++) {
      const a = all[i];
      for (let j = i + 1; j < all.length; j++) {
        const b = all[j];
        const dx = b.x - a.x, dy = b.y - a.y; const r = a.r + b.r;
        if (Math.abs(dx) > r || Math.abs(dy) > r) continue;
        const d = Math.hypot(dx, dy) || 0.1;
        if (d < r) { const push = (r - d) * 0.5; const nx = dx / d, ny = dy / d; moveActor(a, -nx * push, -ny * push); moveActor(b, nx * push, ny * push); }
      }
      if (a.team === 'npc' || a.team === 'ally') continue;
      const dx = P.x - a.x, dy = P.y - a.y, r = a.r + P.r - 2, d = Math.hypot(dx, dy) || 0.1;
      if (d < r) moveActor(a, -dx / d * (r - d), -dy / d * (r - d));
    }
  },
  updateProjectiles(dt) {
    const L = this.level;
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      const sf = (this.slowTime > 0 && p.team === 'enemy') ? 0.5 : 1;
      p.x += p.vx * dt * sf; p.y += p.vy * dt * sf; p.life -= dt;
      let dead = p.life <= 0;
      if (!dead && L.solidAt(Math.floor(p.x / 16), Math.floor(p.y / 16)) && !p.ghost) {
        const o = L.objAt(Math.floor(p.x / 16), Math.floor(p.y / 16));
        if (!(o && !TSOLID[L.tileAt(Math.floor(p.x / 16), Math.floor(p.y / 16))] && Math.random() < 0.5 && p.kind !== 'arrow')) dead = true;
      }
      if (!dead) {
        for (const a of Combat.targetsOf({ team: p.team })) {
          if (p.hit.has(a)) continue;
          const ay = a.y - 6 - a.z * 0.8;
          if (Math.abs(a.x - p.x) < a.r + p.r + 2 && Math.abs(ay - p.y) < a.r + p.r + 6 + (a.h || 16) * 0.3) {
            p.hit.add(a);
            this.projHit(p, a);
            if (!p.pierce) { dead = true; break; }
          }
        }
      }
      if (p.kind === 'fireball' || p.kind === 'breath') { if (Math.random() < 0.7) this.particle(p.x, p.y, (Math.random() - 0.5) * 20, (Math.random() - 0.5) * 20, Math.random() < 0.5 ? '#ff8020' : '#ffd040', 0.3); }
      else if (p.kind === 'frost') { if (Math.random() < 0.5) this.particle(p.x, p.y, 0, 0, '#c0f0ff', 0.25); }
      else if (p.kind === 'dark' || p.kind === 'poison' || p.kind === 'bolt') { if (Math.random() < 0.5) this.particle(p.x, p.y, 0, 0, p.kind === 'poison' ? '#80e040' : p.kind === 'bolt' ? (p.color || '#80a0ff') : '#a040e0', 0.25); }
      if (dead) {
        if (p.aoe && !p.exploded) { p.exploded = true; Combat.explode(p.x, p.y, p.aoe, p.dmg * 0.6, p.src, { elem: p.elem, color: p.kind === 'fireball' ? '#ff8020' : '#a0e0ff', magic: true }); Sfx.play('boom'); }
        else if (p.kind !== 'arrow') this.burst(p.x, p.y, p.kind === 'frost' ? '#c0f0ff' : p.kind === 'poison' ? '#80e040' : p.kind === 'rock' ? '#a09080' : p.kind === 'bolt' ? (p.color || '#80a0ff') : '#ff9030', 5, 40);
        this.projectiles.splice(i, 1);
      }
    }
  },
  projHit(p, a) {
    const P = this.player;
    const ka = Math.atan2(p.vy, p.vx);
    const kb = { x: Math.cos(ka) * 70, y: Math.sin(ka) * 70 };
    if (p.weapon && p.src === P) {
      Combat.damage(a, p.dmg, { src: P, crit: p.crit, kb, drain: P.drainPct(), elem: p.elem || 'phys', magic: p.magic });
      if (!a.dead) P.applyExtras(a, p.kind === 'arrow' ? 1 : 0.6);
      if (p.kind === 'arrow') P.train('arquearia', 1.5);
    } else {
      Combat.damage(a, p.dmg, { src: p.src, elem: p.elem, slow: p.slow, poison: p.poison, burn: p.burn, drain: p.drain, crit: p.crit, magic: p.magic, kb });
      if (p.src === P && p.magic) P.train('destruicao', 0.6);
    }
  },
  updateClouds(dt) {
    for (let i = this.clouds.length - 1; i >= 0; i--) {
      const c = this.clouds[i]; c.t -= dt; c.acc += dt;
      if (Math.random() < 0.6) this.particle(c.x + (Math.random() - 0.5) * c.r * 1.6, c.y + (Math.random() - 0.5) * c.r, 0, -8, c.color, 0.8, 2);
      if (c.acc >= 0.5) { c.acc = 0; for (const a of Combat.targetsOf(c.src)) if (dist(a.x, a.y, c.x, c.y) < c.r) Combat.damage(a, c.dps * 0.5, { src: c.src, elem: 'poison', dot: true }); }
      if (c.t <= 0) this.clouds.splice(i, 1);
    }
  },
  updatePickups(dt) {
    const P = this.player;
    for (let i = this.pickups.length - 1; i >= 0; i--) {
      const k = this.pickups[i];
      k.t += dt;
      if (k.z < 0 || k.vz) { k.vz = (k.vz || 0) + 300 * dt; k.z += k.vz * dt; if (k.z >= 0) { k.z = 0; k.vz = 0; } }
      const d = dist(k.x, k.y, P.x, P.y);
      if (k.t > 0.35 && d < 56) { const a = angleTo(k.x, k.y, P.x, P.y); const sp = 140 + (56 - d) * 4; k.x += Math.cos(a) * sp * dt; k.y += Math.sin(a) * sp * dt; }
      if (k.t > 0.35 && d < 10) {
        if (k.gold) { P.gold += k.gold; this.floater(P.x, P.y - 24, '+' + k.gold, '#ffd040'); Sfx.play('coin'); }
        else P.addItem(k.item);
        this.pickups.splice(i, 1);
      } else if (k.t > 240) this.pickups.splice(i, 1);
    }
  },
  dropItem(x, y, item) { this.pickups.push({ x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 8, item, t: 0, z: -2, vz: -90 - Math.random() * 40 }); },
  dropGold(x, y, n) { if (n <= 0) return; this.pickups.push({ x: x + (Math.random() - 0.5) * 12, y: y + (Math.random() - 0.5) * 8, gold: n, t: 0, z: -2, vz: -100 }); },
  updateFx(dt) {
    for (let i = this.fx.length - 1; i >= 0; i--) { const f = this.fx[i]; f.t += dt; if (f.t >= f.dur) this.fx.splice(i, 1); }
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]; p.life -= dt;
      if (p.life <= 0) { this.particles.splice(i, 1); continue; }
      p.vy += p.grav * dt; p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.96; if (!p.grav) p.vy *= 0.96;
    }
    for (let i = this.floaters.length - 1; i >= 0; i--) { const f = this.floaters[i]; f.t += dt; if (f.t > 0.9) this.floaters.splice(i, 1); }
  },

  // ---------- NPCs e spawns ----------
  manageNPCs() {
    const P = this.player, W = this.world;
    const ptx = P.x / 16, pty = P.y / 16;
    for (const s of W.settlements) {
      const d = dist(ptx, pty, s.mid.x, s.mid.y);
      if (!s.active && d < 75) {
        s.active = true; s.npcs = [];
        const rng = new RNG(hashStr(s.id) + W.seed);
        s.npcSpots.forEach((spot, i) => {
          let a;
          if (spot.role === 'guard') {
            const col = s.region.color;
            const look = Object.assign({}, ENEMIES.guarda.look, { body: shade(col, -0.25), helm: '#a0a8b0', shield: col, skin: rng.pick(RACES[CULTURES[s.region.culture].race].skins) });
            const cr = RACES[CULTURES[s.region.culture].race];
            if (cr.ears) look.ears = cr.ears; if (cr.tusks) look.tusks = true; if (cr.short) look.short = cr.short; if (cr.snout) look.snout = true; if (cr.tail) { look.tail = true; look.tailC = look.skin; } if (cr.catears) look.catears = true; if (cr.bulky) look.bulky = true;
            a = new Monster('guarda', spot.x * 16 + 8, spot.y * 16 + 12, Math.max(10, P.level + 5), { look, name: 'Guarda de ' + s.name });
            a.guardOf = s;
          } else a = new NPC(spot, s, rng);
          a.spotIndex = i;
          this.findFree(a);
          a.home = { x: a.x, y: a.y };
          s.npcs.push(a); this.actors.push(a);
        });
      } else if (s.active && d > 110) {
        s.active = false;
        const set = new Set(s.npcs); s.npcs = null;
        this.actors = this.actors.filter(a => !set.has(a));
      }
    }
  },
  spawnTick() {
    const P = this.player, W = this.world;
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    // remove distantes
    this.actors = this.actors.filter(a => {
      if (a.team !== 'enemy' || a.camp || a.boss && !a.def.dragon) return true;
      const d = dist(a.x, a.y, P.x, P.y);
      return d < (a.def.dragon ? 1400 : 760);
    });
    // acampamentos
    for (const p of W.pois) {
      if (p.kind !== 'camp') continue;
      const d = dist(ptx, pty, p.x, p.y);
      if (!p.spawned && d < 42 && !this.campCleared(p)) this.spawnCamp(p);
      else if (p.spawned && d > 95) { this.actors = this.actors.filter(a => a.camp !== p); p.spawned = false; }
    }
    if (W.settlementAt(ptx, pty)) return;
    const night = this.isNight();
    let count = 0;
    for (const a of this.actors) if (a.team === 'enemy' && !a.camp && !a.boss && dist(a.x, a.y, P.x, P.y) < 480) count++;
    const passiveCount = this.actors.filter(a => a.passive).length;
    const cap = night ? 8 : 6;
    if (count < cap) {
      for (let tries = 0; tries < 5; tries++) {
        const ang = Math.random() * Math.PI * 2, r = 230 + Math.random() * 110;
        const x = P.x + Math.cos(ang) * r, y = P.y + Math.sin(ang) * r;
        const tx = Math.floor(x / 16), ty = Math.floor(y / 16);
        if (W.solidAt(tx, ty) || TWATER[W.tileAt(tx, ty)] || W.tileAt(tx, ty) === T.LAVA) continue;
        if (W.settlementAt(tx, ty)) continue;
        const R = W.regions[W.regAt(tx, ty)];
        const table = SPAWNS[R.id][night ? 'night' : 'day'];
        const pick = new RNG(Math.floor(Math.random() * 1e9)).weighted(table.map(e => ({ id: e[0], w: e[1] })), 'w').id;
        const d = ENEMIES[pick];
        if (d.passive && passiveCount > 6) continue;
        const n = (pick === 'lobo' || pick === 'lobo_gelo' || pick === 'goblin' || pick === 'esqueleto' || pick === 'bandido' || pick === 'orc_renegado') ? 1 + Math.floor(Math.random() * 3) : (d.passive ? 1 + Math.floor(Math.random() * 2) : 1 + (Math.random() < 0.25 ? 1 : 0));
        const lvl = clamp(P.level + Math.floor(Math.random() * 4) - 2, R.lvl[0], R.lvl[1] + 2);
        for (let k = 0; k < n; k++) {
          const m = new Monster(pick, x + (Math.random() - 0.5) * 30, y + (Math.random() - 0.5) * 30, lvl);
          if (collides(W, m.x, m.y, m.r)) continue;
          this.actors.push(m);
        }
        break;
      }
    }
    // mercador viajante na estrada
    const trav = this.actors.find(a => a.traveler);
    if (trav && dist(trav.x, trav.y, P.x, P.y) > 700) this.actors.splice(this.actors.indexOf(trav), 1);
    else if (!trav && !night && W.tileAt(ptx, pty) === T.ROAD && Math.random() < 0.04) {
      const s = W.nearestSettlement(ptx, pty);
      for (let k = 0; k < 20; k++) {
        const ang = Math.random() * Math.PI * 2, r = 12 + Math.random() * 6;
        const tx = Math.round(ptx + Math.cos(ang) * r), ty = Math.round(pty + Math.sin(ang) * r);
        if (W.tileAt(tx, ty) !== T.ROAD || W.solidAt(tx, ty)) continue;
        const npc = new NPC({ role: 'merchant', x: tx, y: ty }, s, new RNG(Math.floor(Math.random() * 1e9)));
        npc.traveler = true; npc.name = 'Mercador Viajante ' + npc.name.split(' ')[0];
        this.actors.push(npc);
        break;
      }
    }
    // dragões
    this.dragonT -= 1.2;
    if (this.dragonT <= 0) {
      this.dragonT = 40;
      const hasDragon = this.actors.some(a => a.def && a.def.dragon && !a.dead);
      if (!hasDragon && P.level >= 5 && Math.random() < 0.12 + (this.regionAtPlayer().id === 'nordheim' ? 0.1 : 0)) {
        const R = this.regionAtPlayer();
        const id = (R.id === 'nordheim' || R.id === 'khazdurim') ? 'dragao_gelo' : 'dragao';
        const ang = Math.random() * Math.PI * 2;
        const m = new Monster(id, P.x + Math.cos(ang) * 420, P.y + Math.sin(ang) * 420, Math.max(P.level, 6));
        m.provoked = P;
        this.actors.push(m);
        this.centerMsg('UM DRAGÃO SE APROXIMA!', 'Prepare-se para lutar ou fuja!');
        Sfx.play('dragon');
      }
    }
  },
  spawnCamp(p) {
    p.spawned = true;
    const rid = p.region.id;
    let mobs, chief;
    if (rid === 'gorthak') { mobs = ['orc_renegado', 'orc_renegado', 'orc_renegado', 'salamandra']; chief = 'ogro'; }
    else if (rid === 'morvath') { mobs = ['cultista', 'cultista', 'esqueleto', 'esqueleto_arqueiro']; chief = 'cavaleiro_morto'; }
    else if (rid === 'nordheim') { mobs = ['bandido', 'bandido_arqueiro', 'bandido', 'draugr']; chief = 'bandido_chefe'; }
    else { mobs = ['bandido', 'bandido', 'bandido_arqueiro', 'bandido_mago']; chief = 'bandido_chefe'; }
    const lvl = Math.max(p.lvl, Math.min(this.player.level, p.region.lvl[1] + 2));
    const list = mobs.map(id => [id, lvl]).concat([[chief, lvl + 1]]);
    p.alive = 0;
    list.forEach(([id, l], i) => {
      const a = i / list.length * Math.PI * 2;
      const m = new Monster(id, (p.x + Math.cos(a) * 3) * 16 + 8, (p.y + Math.sin(a) * 3) * 16 + 8, l, { camp: p, hpMul: id === chief && !ENEMIES[id].boss ? 1.6 : 1 });
      if (id === chief) m.name = 'Líder: ' + ENEMIES[id].name;
      this.findFree(m); m.home = { x: m.x, y: m.y };
      this.actors.push(m); p.alive++;
    });
  },
  spawnFollower() {
    const P = this.player;
    const f = P.follower;
    const m = new Monster('mercenario', P.x + 12, P.y + 6, Math.max(P.level, 3), { follow: true, name: f.name });
    m.isFollower = true;
    this.actors.push(m);
  },
  discoveryTick() {
    const P = this.player, W = this.world, M = this.mods;
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    // névoa do mapa
    const ex = ptx >> 4, ey = pty >> 4;
    for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const x = ex + dx, y = ey + dy; if (x >= 0 && y >= 0 && x < 256 && y < 256 && dx * dx + dy * dy <= 5) M.explored[y * 256 + x] = 1; }
    for (const s of W.settlements) if (!M.discovered.has(s.id) && Math.abs(s.mid.x - ptx) < 30 && Math.abs(s.mid.y - pty) < 30) { M.discovered.add(s.id); this.toast('Local descoberto: ' + s.name, '#ffe080'); P.addXP(15); }
    for (const d of W.dungeons) if (!M.discovered.has(d.id) && Math.abs(d.x - ptx) < 14 && Math.abs(d.y - pty) < 14) { M.discovered.add(d.id); this.toast('Masmorra descoberta: ' + d.name, '#ff9080'); P.addXP(10); }
    for (const p of W.pois) if (!M.discovered.has(p.id) && Math.abs(p.x - ptx) < 14 && Math.abs(p.y - pty) < 14) { M.discovered.add(p.id); this.toast('Descoberto: ' + p.name, '#c0e0ff'); }
    // região
    const ri = W.regAt(ptx, pty);
    if (ri !== this.curRegion) {
      if (this.curRegion !== -1) { const R = W.regions[ri]; this.centerMsg(R.name, `Nível ${R.lvl[0]}-${R.lvl[1]}${R.lvl[0] > P.level + 3 ? ' • PERIGOSO!' : ''}`); }
      this.curRegion = ri;
    }
    const s = W.settlementAt(ptx, pty);
    if (s !== this.curTown) {
      this.curTown = s;
      if (s) { this.toast(`Bem-vindo a ${s.name}`, '#ffe8a0'); P.lastTown = s.id; if (this.autosaveT < 120) { this.autosaveT = 150; this.saveGame(0, true); } }
    }
  },
  updateWeather(dt) {
    const w = this.weather;
    w.t -= dt;
    if (w.t <= 0) {
      w.t = 60 + Math.random() * 120;
      const R = this.regionAtPlayer();
      const r = Math.random();
      const b = R.biome;
      if (!this.settings.weather) w.kind = null;
      else if (b === 'snow' || b === 'mountain') w.kind = r < 0.55 ? 'snow' : null;
      else if (b === 'desert') w.kind = r < 0.2 ? 'sand' : null;
      else if (b === 'volcanic' || b === 'dead') w.kind = r < 0.6 ? 'ash' : null;
      else w.kind = r < 0.2 ? 'rain' : r < 0.26 ? 'storm' : null;
    }
  },
  updateMusic() {
    if (!Sfx.ctx) return;
    const P = this.player;
    let boss = false, battle = false;
    for (const a of this.actors) {
      if (a.dead || a.team !== 'enemy') continue;
      if (a.target === P && dist(a.x, a.y, P.x, P.y) < 260) { battle = true; if (a.boss) boss = true; }
    }
    let m;
    if (boss) m = 'boss'; else if (battle) m = 'battle';
    else if (!this.level.isWorld) m = 'dungeon';
    else if (this.curTown) m = 'town';
    else if (this.isNight()) m = 'night';
    else m = 'field';
    if (m !== Sfx.mode) { if (m === 'battle' || m === 'boss' || this.musicHold <= 0 || !this.musicHold) { Sfx.setMusic(m); this.musicHold = 4; } }
    if (this.musicHold > 0) this.musicHold -= 0.016;
  },

  // ---------- Mortes ----------
  onMonsterDeath(m, killer) {
    const P = this.player;
    const byPlayer = killer === P || (killer && killer.team === 'ally') || m.provoked === P;
    this.burst(m.x, m.y - 8, m.def.undead ? '#d8d0c0' : '#a02020', 12, 70);
    if (m.team === 'enemy' && byPlayer) {
      P.stats.kills++;
      P.addXP(m.xp);
      this.floater(m.x, m.y - 30, '+' + m.xp, '#c0a0ff');
      Quests.onKill(m);
      // saque
      const d = m.def, rng = new RNG(Math.floor(Math.random() * 1e9));
      if (d.gold) this.dropGold(m.x, m.y, Math.round(rng.int(d.gold[0], d.gold[1]) * (1 + m.lvl * 0.15) * P.stat.gold));
      if (d.drops) for (const [id, ch] of d.drops) if (rng.chance(ch)) this.dropItem(m.x, m.y, Items.make(id, id === 'flecha' ? rng.int(2, 6) : 1));
      if (d.dropGear && rng.chance(d.dropGear)) { const n = d.boss ? 2 : 1; for (let i = 0; i < n; i++) this.dropItem(m.x, m.y, Items.randomGear(m.lvl, rng, d.boss ? 0.15 : 0.02)); }
      if (rng.chance(0.06) && !d.animal) this.dropItem(m.x, m.y, Items.make(Items.potionFor(m.lvl, rng)));
      if (d.dragon) {
        P.stats.dragons++;
        this.later(0.6, () => {
          P.souls++;
          this.centerMsg('ALMA DE DRAGÃO ABSORVIDA!', 'Use-a numa Pedra Rúnica para aprender um Grito.');
          Sfx.play('dragon');
          for (let i = 0; i < 40; i++) this.particle(m.x + (Math.random() - 0.5) * 40, m.y - 10 + (Math.random() - 0.5) * 30, (P.x - m.x) * 1.5, (P.y - m.y) * 1.5, '#ffb040', 0.8, 2);
        });
      }
      if (d.boss) P.stats.bosses++;
    }
    if (m.camp) {
      const p = m.camp; p.alive--;
      if (p.alive <= 0) { this.mods.camps[p.id] = this.day; Quests.onCamp(p.id); this.toast(`${p.name} eliminado!`, '#80ff80'); P.addXP(40 + p.lvl * 8); }
    }
    if (m.isFollower) { P.follower = null; this.toast('Seu mercenário caiu em combate.', '#ff8080'); }
    // chefe de masmorra
    if (!this.level.isWorld && m.boss && m.eid === this.level.def.boss && !m.master) {
      const d = this.level.def;
      if (!this.mods.cleared[d.id]) {
        this.mods.cleared[d.id] = this.day;
        this.centerMsg('MASMORRA CONQUISTADA!', d.name);
        Sfx.play('levelup');
        P.addXP(50 + d.lvl * 15);
        Quests.onClear(d.id);
      }
    }
  },
  onPlayerDeath() {
    Sfx.play('death');
    this.player.mounted = false;
    setTimeout(() => UI.death(), 1200);
  },
  respawn() {
    const P = this.player, W = this.world;
    const lost = Math.floor(P.gold * 0.1);
    P.gold -= lost;
    P.dead = false; P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; P.fx = []; P.buffs = []; P.recalc();
    let s = W.settlements.find(s => s.id === P.lastTown) || W.nearestSettlement(P.x / 16, P.y / 16);
    if (!this.level.isWorld) { this.level = W; }
    const g = s.gates[0];
    P.x = s.mid.x * 16 + 8; P.y = (s.mid.y + 4) * 16;
    this.findFree(P);
    this.actors = this.actors.filter(a => a.team === 'ally' && a.follow);
    for (const ss of W.settlements) { ss.active = false; ss.npcs = null; }
    for (const p of W.pois) p.spawned = false;
    this.projectiles = []; this.clouds = []; this.timers = [];
    this.camX = P.x - this.vw / 2; this.camY = P.y - this.vh / 2;
    this.paused = false;
    void g;
    this.toast(`Você despertou em ${s.name}. Perdeu ${lost} de ouro.`, '#ffb080');
  },
  onLevelUp() {
    Sfx.play('levelup');
    this.centerMsg('NÍVEL ' + this.player.level + '!', 'Abra o menu para escolher seu atributo e talento.');
    this.burst(this.player.x, this.player.y - 10, '#ffe060', 30, 90);
    setTimeout(() => { const P = this.player; if (!UI.current && this.started && !P.dead && !this.actors.some(a => a.target === P && !a.dead && a.team === 'enemy')) UI.levelUp(); }, 900);
  },
  victory() {
    this.centerMsg('VORTHAX FOI DERROTADO!', 'Eldoria está salva!');
    setTimeout(() => UI.victory(), 2500);
  },

  // ---------- Interação ----------
  findInteract() {
    const P = this.player, L = this.level;
    let best = null, bd = 30;
    const fx = P.x + Math.cos(P.face) * 8, fy = P.y - 4 + Math.sin(P.face) * 8;
    for (const a of this.actors) {
      if (a.dead || a.hidden) continue;
      if (!(a instanceof NPC) && !a.guard && !a.isFollower) continue;
      const d = dist(fx, fy, a.x, a.y - 6);
      if (d < bd) { bd = d; best = { kind: 'npc', a, label: a.guard ? 'Falar' : a.isFollower ? 'Falar' : 'Falar', name: a.name }; }
    }
    const ptx = Math.floor(P.x / 16), pty = Math.floor((P.y - 2) / 16);
    for (let dy = -2; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const tx = ptx + dx, ty = pty + dy;
      const cx = tx * 16 + 8, cy = ty * 16 + 10;
      const d = dist(fx, fy, cx, cy) - 2;
      if (d >= bd) continue;
      if (L.isWorld) {
        const door = this.world.doors.get(tkey(tx, ty));
        if (door && dy <= 0) { bd = d; best = { kind: 'door', b: door, label: 'Entrar', name: door.name }; continue; }
        const sign = this.world.signs.get(tkey(tx, ty));
        if (sign && L.objAt(tx, ty) === O.SIGN) { bd = d; best = { kind: 'sign', s: sign, label: 'Ler', name: 'Placa' }; continue; }
      }
      const o = L.objAt(tx, ty);
      const od = OBJ_DEFS[o];
      if (!o || !od.interact) continue;
      const labels = { chest: 'Abrir', harvest: o >= O.ORE_FERRO && o <= O.ORE_EBANO ? 'Minerar' : 'Coletar', cook: 'Cozinhar', forge: 'Forjar', alchemy: 'Alquimia', runestone: 'Ler', shrine: 'Orar', dungeon: 'Entrar', exit: 'Sair', sign: 'Ler' };
      let name = od.name;
      if (od.interact === 'dungeon' && L.isWorld) { const dd = this.world.entrances.get(tkey(tx, ty)); if (dd) name = `${dd.name} (Nv ${dd.lvl})`; }
      bd = d; best = { kind: od.interact, tx, ty, o, label: labels[od.interact] || 'Usar', name };
    }
    this.interact = best;
  },
  doInteract() {
    const it = this.interact;
    const P = this.player;
    if (!it) { return; }
    const L = this.level;
    switch (it.kind) {
      case 'npc': UI.talkNPC(it.a); break;
      case 'door': Sfx.play('door'); UI.building(it.b); break;
      case 'sign': UI.sign(it.s); break;
      case 'chest': this.openChest(it.tx, it.ty, it.o); break;
      case 'harvest': {
        const h = OBJ_DEFS[it.o].harvest;
        const n = h.n[0] + Math.floor(Math.random() * (h.n[1] - h.n[0] + 1)) + (P.skill(h.skill) > 50 && Math.random() < 0.4 ? 1 : 0);
        P.addItem(Items.make(h.item, n));
        P.train(h.skill, 2);
        L.setObj(it.tx, it.ty, 0);
        if (L.isWorld) this.mods.harvested[tkey(it.tx, it.ty)] = this.day;
        Sfx.play(it.o <= O.ORE_EBANO ? 'mine' : 'harvest');
        this.burst(it.tx * 16 + 8, it.ty * 16 + 8, it.o <= O.ORE_EBANO ? '#a09890' : '#60c040', 8, 40);
        if (it.o <= O.ORE_EBANO && Math.random() < 0.08) P.addItem(Items.make(['rubi', 'safira', 'esmeralda', 'ametista'][Math.floor(Math.random() * 4)]));
        break;
      }
      case 'cook': UI.craft('cook'); break;
      case 'forge': UI.craft('forge'); break;
      case 'alchemy': UI.craft('alchemy'); break;
      case 'runestone': this.useRunestone(it.tx, it.ty); break;
      case 'shrine': this.useShrine(it.tx, it.ty); break;
      case 'dungeon': { const d = this.world.entrances.get(tkey(it.tx, it.ty)); if (d) UI.confirm(`Entrar em <b>${esc(d.name)}</b>?<br><span class="dim">Nível recomendado: ${d.lvl}${this.mods.cleared[d.id] ? ' • Conquistada' : ''}</span>`, () => this.enterDungeon(d)); break; }
      case 'exit': this.exitDungeon(); break;
    }
  },
  openChest(tx, ty, o) {
    const P = this.player, L = this.level;
    const big = o === O.CHEST_BOSS;
    let lvl;
    if (L.isWorld) {
      const R = this.world.regions[this.world.regAt(tx, ty)];
      lvl = clamp(P.level, R.lvl[0], R.lvl[1] + 2);
      this.mods.opened.add(tkey(tx, ty));
    } else {
      lvl = L.def.lvl;
      const id = L.def.id;
      if (big && !this.mods.cleared[id] && this.actors.some(a => a.boss && !a.dead && a.eid === L.def.boss)) { this.toast('O baú está selado pela presença do chefe!', '#ff8080'); return; }
      (this.mods.dopened[id] = this.mods.dopened[id] || []).push(tkey(tx, ty));
    }
    const rng = new RNG(hashStr(tkey(tx, ty)) + this.world.seed + this.day);
    const loot = Items.chestLoot(lvl, rng, big);
    L.setObj(tx, ty, O.CHEST_OPEN);
    P.stats.chests++;
    Sfx.play('chest');
    const gold = Math.round(loot.gold * P.stat.gold);
    P.gold += gold;
    this.floater(tx * 16 + 8, ty * 16 - 8, '+' + gold, '#ffd040');
    for (const it of loot.items) P.addItem(it);
    if (big && !L.isWorld) {
      const d = L.def;
      for (const k of ['reward', 'bonus']) {
        const id = d[k];
        if (id && !this.mods.uniques.has(d.id + k)) { this.mods.uniques.add(d.id + k); const it = Items.make(id); P.addItem(it); this.centerMsg('TESOURO LENDÁRIO!', Items.name(it)); }
      }
      if (d.unique && d.unique.main === undefined) { }
    }
    // tesouro de mapa
    if (L.isWorld) {
      const i = this.mods.treasures.findIndex(t => t.x === tx && t.y === ty);
      if (i >= 0) { this.mods.treasures.splice(i, 1); if (this.track === 'treasure') this.track = 'main'; }
      const poi = this.world.poiAt.get(tkey(tx, ty));
      void poi;
    }
  },
  useRunestone(tx, ty) {
    const P = this.player;
    const poi = this.world.pois.find(p => p.kind === 'runestone' && p.x === tx && p.y === ty);
    if (!poi) return;
    const S = SHOUTS[poi.shout];
    const used = this.mods.runes.has(poi.id);
    if (used) { UI.dialog('Pedra Rúnica', null, `As runas brilham fracamente: "<b>${S.words}</b>". Você já absorveu o poder desta pedra.`, [{ label: 'Sair' }]); return; }
    if (P.souls <= 0) {
      UI.dialog('Pedra Rúnica', null, `Runas antigas na língua dos dragões: "<b>${S.words}</b>" — <i>${S.name}</i>.<br><br>Você sente o poder, mas precisa de uma <b>Alma de Dragão</b> para compreendê-lo. Derrote dragões!`, [{ label: 'Sair' }]);
      return;
    }
    P.souls--;
    this.mods.runes.add(poi.id);
    if (!P.shouts.includes(poi.shout)) { P.shouts.push(poi.shout); P.shoutLvl[poi.shout] = 1; P.shoutIdx = P.shouts.length - 1; }
    else P.shoutLvl[poi.shout] = Math.min(3, (P.shoutLvl[poi.shout] || 1) + 1);
    Sfx.play('shout');
    this.shake = 8;
    for (let i = 0; i < 40; i++) this.particle(tx * 16 + 8, ty * 16, (Math.random() - 0.5) * 120, -Math.random() * 120, '#a0f0ff', 1, 2, 60);
    this.centerMsg('GRITO APRENDIDO: ' + S.name.toUpperCase(), `"${S.words.split(' ').slice(0, P.shoutLvl[poi.shout]).join(' ')}" • Nível ${P.shoutLvl[poi.shout]}`);
  },
  useShrine(tx, ty) {
    const P = this.player;
    const k = tkey(tx, ty);
    if (this.mods.shrines[k] === this.day) { this.toast('Você já recebeu a bênção hoje.', '#c0e0ff'); return; }
    this.mods.shrines[k] = this.day;
    P.hp = P.stat.maxHp; P.mp = P.stat.maxMp; P.st = P.stat.maxSt; P.fx = [];
    P.addBuff('regen', 3, 600, 'Bênção'); P.addBuff('resFire', 0.15, 600, 'Bênção'); P.addBuff('resFrost', 0.15, 600, 'Bênção'); P.addBuff('dmg', 0.1, 600, 'Bênção');
    Sfx.play('learn');
    this.centerMsg('BÊNÇÃO DOS DEUSES', 'Vida restaurada, +10% dano e resistências por 10 minutos.');
    for (let i = 0; i < 30; i++) this.particle(P.x + (Math.random() - 0.5) * 20, P.y, 0, -40 - Math.random() * 40, '#fff4b0', 1.2, 2);
  },
  revealTreasure() {
    const P = this.player, W = this.world;
    for (let i = 0; i < 200; i++) {
      const a = Math.random() * Math.PI * 2, r = 120 + Math.random() * 500;
      const x = Math.round(P.x / 16 + Math.cos(a) * r), y = Math.round(P.y / 16 + Math.sin(a) * r);
      if (!W.isLand(x, y) || W.settlementAt(x, y)) continue;
      this.mods.treasures.push({ x, y });
      W.chunks.delete(W.ckey(x >> 5, y >> 5)); W.canvases.delete(W.ckey(x >> 5, y >> 5));
      this.track = 'treasure';
      this.centerMsg('MAPA DO TESOURO', 'Um X marca o local! Siga a bússola.');
      return;
    }
    this.toast('O mapa está ilegível...', '#c0a080');
  },
  enterDungeon(d) {
    const P = this.player;
    this.worldPos = { x: d.x * 16 + 8, y: (d.y + 1) * 16 + 10 };
    const state = { cleared: !!this.mods.cleared[d.id], opened: new Set(this.mods.dopened[d.id] || []) };
    let dun;
    try { dun = new Dungeon(d, hashStr(d.id) + this.world.seed, state); }
    catch (e) { console.error(e); this.toast('Erro ao gerar masmorra', '#f88'); return; }
    this.level = dun;
    P.mounted = false;
    const keep = this.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    this.actors = keep;
    for (const s of this.world.settlements) { if (s.active) { s.active = false; s.npcs = null; } }
    for (const p of this.world.pois) p.spawned = false;
    P.x = dun.entry.x * 16 + 8; P.y = dun.entry.y * 16 + 10;
    this.findFree(P);
    for (const a of keep) { a.x = P.x + 10; a.y = P.y + 4; this.findFree(a); }
    for (const sp of dun.spawns) {
      const m = new Monster(sp.id, sp.x * 16 + 8, sp.y * 16 + 10, sp.lvl);
      if (sp.boss) { m.name = ENEMIES[sp.id].name; m.aggro = 160; }
      this.findFree(m); m.home = { x: m.x, y: m.y };
      this.actors.push(m);
    }
    this.projectiles = []; this.clouds = []; this.pickups = []; this.timers = [];
    this.camX = P.x - this.vw / 2; this.camY = P.y - this.vh / 2;
    this.flow = null;
    Sfx.play('door');
    this.centerMsg(d.name, `Nível ${d.lvl}${this.mods.cleared[d.id] ? ' • Já conquistada' : ''}`);
    UI.fade();
  },
  exitDungeon() {
    const P = this.player;
    this.level = this.world;
    const keep = this.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    this.actors = keep;
    P.x = this.worldPos.x; P.y = this.worldPos.y;
    this.findFree(P);
    for (const a of keep) { a.x = P.x + 10; a.y = P.y + 4; this.findFree(a); }
    this.projectiles = []; this.clouds = []; this.pickups = []; this.timers = [];
    this.camX = P.x - this.vw / 2; this.camY = P.y - this.vh / 2;
    this.flow = null; this.curRegion = this.world.regAt(Math.floor(P.x / 16), Math.floor(P.y / 16));
    Sfx.play('door');
    UI.fade();
  },
  fastTravel(s) {
    const P = this.player;
    if (!this.level.isWorld) { this.toast('Saia da masmorra primeiro.', '#ff8080'); return; }
    if (this.actors.some(a => a.team === 'enemy' && !a.dead && a.target === P && dist(a.x, a.y, P.x, P.y) < 250)) { this.toast('Não é possível viajar com inimigos por perto!', '#ff8080'); return; }
    const d = dist(P.x / 16, P.y / 16, s.mid.x, s.mid.y);
    const hours = Math.max(1, Math.round(d / (P.hasHorse ? 400 : 220)));
    this.time += hours * 60;
    while (this.time >= 1440) { this.time -= 1440; this.day++; this.mods.day = this.day; }
    const g = s.gates.find(g => g.dir === 's') || s.gates[0];
    P.x = g.x * 16 + 8; P.y = (g.y + (g.dir === 's' ? 2 : 0)) * 16 + 8;
    if (g.dir === 'w') P.x -= 32; if (g.dir === 'e') P.x += 32;
    this.findFree(P);
    this.actors = this.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    for (const a of this.actors) { a.x = P.x + 10; a.y = P.y + 4; }
    for (const ss of this.world.settlements) { ss.active = false; ss.npcs = null; }
    for (const p of this.world.pois) p.spawned = false;
    this.projectiles = []; this.pickups = [];
    this.camX = P.x - this.vw / 2; this.camY = P.y - this.vh / 2;
    UI.fade();
    this.toast(`Viagem até ${s.name}: ${hours}h se passaram.`, '#c0e0ff');
  },

  // ---------- Renderização ----------
  render() {
    const ctx = this.ctx, vw = this.vw, vh = this.vh;
    if (!this.level) return;
    let camX = Math.round(this.camX), camY = Math.round(this.camY);
    if (this.shake > 0) { camX += Math.round((Math.random() - 0.5) * this.shake); camY += Math.round((Math.random() - 0.5) * this.shake); }
    const L = this.level;
    L.drawGround(ctx, camX, camY, vw, vh);
    // nuvens venenosas no chão
    for (const c of this.clouds) { ctx.fillStyle = 'rgba(120,220,60,0.18)'; ctx.beginPath(); ctx.ellipse(c.x - camX, c.y - camY, c.r, c.r * 0.6, 0, 0, Math.PI * 2); ctx.fill(); }
    // telegrafias no chão
    for (const f of this.fx) if (f.kind === 'telegraph') {
      const k = f.t / f.dur;
      ctx.strokeStyle = f.friendly ? 'rgba(255,140,40,0.8)' : 'rgba(255,40,40,0.85)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(f.x - camX, f.y - camY, f.r, f.r * 0.6, 0, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = f.friendly ? 'rgba(255,140,40,0.25)' : 'rgba(255,40,40,0.25)';
      ctx.beginPath(); ctx.ellipse(f.x - camX, f.y - camY, f.r * k, f.r * 0.6 * k, 0, 0, Math.PI * 2); ctx.fill();
    }
    // desenháveis com ordenação por Y
    const D = [];
    const tx0 = Math.floor(camX / 16) - 2, ty0 = Math.floor(camY / 16) - 1, tx1 = Math.floor((camX + vw) / 16) + 2, ty1 = Math.floor((camY + vh) / 16) + 3;
    const anim = Math.floor(this.t * 4) % 2;
    for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
      const o = L.objAt(tx, ty);
      if (!o || OBJ_BAKED[o] || o === O.BLOCK) continue;
      const nv = OBJ_VARIANTS[o] || 1;
      const s = Sprites.obj(o, nv > 1 ? Math.floor(hash2(tx, ty, 5) * nv) : 0, OBJ_ANIM[o] ? anim : 0);
      D.push({ y: ty * 16 + 15, img: s.c, x: tx * 16 + 8 - (s.w >> 1), yy: ty * 16 + 16 - s.h + s.oy });
    }
    if (L.isWorld) {
      for (const b of this.world.buildingsInView(camX, camY, camX + vw, camY + vh)) {
        const img = Sprites.building(b.spec);
        const H = img.height - 1;
        D.push({ y: (b.ty + b.h) * 16, img, x: b.tx * 16 - 1, yy: (b.ty + b.h) * 16 - H });
      }
    }
    const P = this.player;
    for (const a of this.actors) {
      if (a.hidden) continue;
      if (a.x < camX - 64 || a.x > camX + vw + 64 || a.y < camY - 32 || a.y > camY + vh + 96) continue;
      D.push({ y: a.y, a });
    }
    if (!P.dead || true) D.push({ y: P.y, a: P });
    for (const k of this.pickups) D.push({ y: k.y, pk: k });
    D.sort((a, b) => a.y - b.y);
    for (const d of D) {
      if (d.a) d.a.draw(ctx, camX, camY);
      else if (d.pk) this.drawPickup(ctx, d.pk, camX, camY);
      else ctx.drawImage(d.img, d.x - camX, d.yy - camY);
    }
    // marcadores de missão em masmorra/ mundo (alvo próximo)
    this.drawQuestMarker(ctx, camX, camY);
    // projéteis
    for (const p of this.projectiles) this.drawProjectile(ctx, p, camX, camY);
    // efeitos
    for (const f of this.fx) this.drawFx(ctx, f, camX, camY);
    // clima
    if (L.isWorld) this.drawWeather(ctx, vw, vh);
    // iluminação
    this.drawLighting(ctx, camX, camY);
    // partículas e números
    for (const p of this.particles) { ctx.globalAlpha = Math.min(1, p.life / p.max * 1.5); ctx.fillStyle = p.color; ctx.fillRect(Math.round(p.x - camX), Math.round(p.y - camY), p.size, p.size); }
    ctx.globalAlpha = 1;
    for (const f of this.floaters) drawNum(ctx, f.text, f.x - camX, f.y - camY - f.t * 22, f.color, f.s);
    if (this.slowTime > 0) { ctx.fillStyle = 'rgba(80,120,255,0.12)'; ctx.fillRect(0, 0, vw, vh); }
    if (P.hp < P.stat.maxHp * 0.25 && !P.dead) { const a = 0.15 + Math.sin(this.t * 6) * 0.08; const g = ctx.createRadialGradient(vw / 2, vh / 2, vh * 0.3, vw / 2, vh / 2, vh * 0.8); g.addColorStop(0, 'rgba(160,0,0,0)'); g.addColorStop(1, `rgba(160,0,0,${a})`); ctx.fillStyle = g; ctx.fillRect(0, 0, vw, vh); }
    if (this.settings.showFps) { ctx.fillStyle = '#fff'; ctx.font = '8px monospace'; ctx.fillText(this.fps + ' fps', 2, vh - 3); }
  },
  drawQuestMarker(ctx, camX, camY) {
    const q = this.trackedQuest();
    if (!q) return;
    const t = this.track === 'treasure' ? this.treasureTarget() : Quests.targetPos(q);
    if (!t || !this.level.isWorld || t.region) return;
    const x = t.x * 16 + 8 - camX, y = t.y * 16 - camY - 18 + Math.sin(this.t * 4) * 2;
    if (x < -10 || y < -10 || x > this.vw + 10 || y > this.vh + 10) return;
    ctx.fillStyle = '#10080c'; ctx.fillRect(Math.round(x) - 3, Math.round(y) - 1, 7, 9);
    ctx.fillStyle = '#ffd040'; ctx.fillRect(Math.round(x) - 2, Math.round(y), 5, 2); ctx.fillRect(Math.round(x) - 1, Math.round(y) + 2, 3, 2); ctx.fillRect(Math.round(x), Math.round(y) + 4, 1, 3);
  },
  trackedQuest() {
    const P = this.player; if (!P) return null;
    if (this.track === 'treasure') return this.mods.treasures.length ? 'treasure' : null;
    if (this.track === 'main') return MAIN_QUEST[P.main] ? 'main' : null;
    return P.quests.find(q => q.id === this.track) || (MAIN_QUEST[P.main] ? 'main' : null);
  },
  treasureTarget() { const t = this.mods.treasures[this.mods.treasures.length - 1]; return t ? { x: t.x, y: t.y, name: 'Tesouro' } : null; },
  drawPickup(ctx, k, camX, camY) {
    const x = Math.round(k.x - camX), y = Math.round(k.y - camY + k.z + Math.sin(this.t * 4 + k.x) * 1.5 - 4);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(k.x - camX) - 3, Math.round(k.y - camY), 7, 2);
    if (k.gold) {
      ctx.fillStyle = '#7a5a10'; ctx.fillRect(x - 3, y - 3, 6, 6); ctx.fillStyle = '#ffd040'; ctx.fillRect(x - 2, y - 3, 4, 5); ctx.fillStyle = '#fff8a0'; ctx.fillRect(x - 1, y - 2, 1, 2);
    } else {
      const ic = Sprites.icon(Items.icon(k.item));
      ctx.drawImage(ic, x - 6, y - 8, 12, 12);
      const c = Items.color(k.item);
      if (k.item.r >= 2 || ITEMS[k.item.id].unique) { ctx.fillStyle = c; ctx.globalAlpha = 0.5 + Math.sin(this.t * 6) * 0.3; ctx.fillRect(x - 1, y - 14, 2, 3); ctx.globalAlpha = 1; }
    }
  },
  drawProjectile(ctx, p, camX, camY) {
    const x = Math.round(p.x - camX), y = Math.round(p.y - camY);
    switch (p.kind) {
      case 'arrow': {
        const a = Math.atan2(p.vy, p.vx);
        ctx.save(); ctx.translate(x, y); ctx.rotate(a);
        ctx.fillStyle = '#6a4a2a'; ctx.fillRect(-6, 0, 9, 1); ctx.fillStyle = '#d0d0d8'; ctx.fillRect(3, -1, 2, 3); ctx.fillStyle = '#f0f0f0'; ctx.fillRect(-7, -1, 2, 1); ctx.fillRect(-7, 1, 2, 1);
        ctx.restore(); break;
      }
      case 'fireball': case 'breath':
        ctx.fillStyle = '#c03010'; ctx.fillRect(x - 3, y - 3, 6, 6); ctx.fillStyle = '#ff8020'; ctx.fillRect(x - 2, y - 3, 4, 6); ctx.fillRect(x - 3, y - 2, 6, 4); ctx.fillStyle = '#ffe070'; ctx.fillRect(x - 1, y - 1, 2, 2); break;
      case 'frost':
        ctx.fillStyle = '#4080c0'; ctx.fillRect(x - 1, y - 3, 2, 6); ctx.fillRect(x - 3, y - 1, 6, 2); ctx.fillStyle = '#e0f8ff'; ctx.fillRect(x - 1, y - 1, 2, 2); break;
      case 'dark':
        ctx.fillStyle = '#300040'; ctx.fillRect(x - 3, y - 3, 6, 6); ctx.fillStyle = '#a040e0'; ctx.fillRect(x - 2, y - 2, 4, 4); ctx.fillStyle = '#f0c0ff'; ctx.fillRect(x - 1, y - 1, 1, 1); break;
      case 'poison':
        ctx.fillStyle = '#205010'; ctx.fillRect(x - 3, y - 2, 6, 5); ctx.fillStyle = '#80e040'; ctx.fillRect(x - 2, y - 2, 4, 4); break;
      case 'rock':
        ctx.fillStyle = '#5a5048'; ctx.fillRect(x - 3, y - 3, 6, 6); ctx.fillStyle = '#8a8078'; ctx.fillRect(x - 2, y - 3, 3, 3); break;
      case 'bolt':
        ctx.fillStyle = p.color || '#80a0ff'; ctx.fillRect(x - 2, y - 2, 4, 4); ctx.fillStyle = '#ffffff'; ctx.fillRect(x - 1, y - 1, 2, 2); break;
      default: ctx.fillStyle = '#fff'; ctx.fillRect(x - 1, y - 1, 3, 3);
    }
  },
  drawFx(ctx, f, camX, camY) {
    const k = f.t / f.dur;
    switch (f.kind) {
      case 'swing': {
        ctx.strokeStyle = f.color; ctx.globalAlpha = 0.7 * (1 - k); ctx.lineWidth = 2;
        ctx.beginPath(); const a0 = f.ang - f.arc / 2, a1 = a0 + f.arc * Math.min(1, k * 1.6);
        ctx.arc(f.x - camX, f.y - camY, f.r * 0.85, a0, a1); ctx.stroke();
        ctx.lineWidth = 1; ctx.globalAlpha = 0.35 * (1 - k); ctx.beginPath(); ctx.arc(f.x - camX, f.y - camY, f.r * 0.6, a0, a1); ctx.stroke();
        ctx.globalAlpha = 1; break;
      }
      case 'ring': {
        const r = lerp(f.r0, f.r1, k);
        ctx.strokeStyle = f.color; ctx.globalAlpha = 1 - k; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.ellipse(f.x - camX, f.y - camY, Math.max(1, r), Math.max(1, r * 0.65), 0, 0, Math.PI * 2); ctx.stroke(); ctx.globalAlpha = 1; break;
      }
      case 'cone': {
        ctx.fillStyle = f.color; ctx.globalAlpha = 0.35 * (1 - k);
        ctx.beginPath(); ctx.moveTo(f.x - camX, f.y - camY); ctx.arc(f.x - camX, f.y - camY, f.r * Math.min(1, k * 2), f.ang - f.arc / 2, f.ang + f.arc / 2); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1; break;
      }
      case 'bolt': {
        ctx.strokeStyle = f.color; ctx.lineWidth = 2; ctx.globalAlpha = 1 - k;
        ctx.beginPath(); f.pts.forEach(([x, y], i) => i ? ctx.lineTo(x - camX, y - camY) : ctx.moveTo(x - camX, y - camY)); ctx.stroke();
        ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1; ctx.stroke(); ctx.globalAlpha = 1; break;
      }
      case 'line': {
        ctx.strokeStyle = f.color; ctx.globalAlpha = 0.6 * (1 - k); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(f.x - camX, f.y - camY); ctx.lineTo(f.x - camX + Math.cos(f.ang) * f.len, f.y - camY + Math.sin(f.ang) * f.len); ctx.stroke(); ctx.globalAlpha = 1; break;
      }
      case 'meteor': {
        const h = (1 - k) * 160;
        const x = f.x - camX + (1 - k) * 60, y = f.y - camY - h;
        ctx.fillStyle = '#ff6020'; ctx.fillRect(x - 4, y - 4, 8, 8); ctx.fillStyle = '#ffe070'; ctx.fillRect(x - 2, y - 2, 4, 4);
        if (Math.random() < 0.8) this.particle(f.x + (1 - k) * 60, f.y - h, 0, -10, '#ff9030', 0.4, 2);
        break;
      }
    }
  },
  drawWeather(ctx, vw, vh) {
    const w = this.weather;
    if (!w.kind) return;
    const t = this.t;
    if (w.kind === 'rain' || w.kind === 'storm') {
      ctx.fillStyle = 'rgba(30,40,70,0.15)'; ctx.fillRect(0, 0, vw, vh);
      ctx.fillStyle = 'rgba(170,190,230,0.55)';
      const n = w.kind === 'storm' ? 140 : 80;
      for (let i = 0; i < n; i++) { const x = (hash2(i, 1, 3) * vw + t * 60 + i * 13) % (vw + 20) - 10, y = (hash2(i, 2, 3) * vh + t * 260) % vh; ctx.fillRect(Math.round(x), Math.round(y), 1, 4); }
      if (w.kind === 'storm' && Math.random() < 0.004) { this.lightningFlash = 0.15; Sfx.play('boom'); }
      if (this.lightningFlash > 0) { ctx.fillStyle = `rgba(255,255,255,${this.lightningFlash * 3})`; ctx.fillRect(0, 0, vw, vh); this.lightningFlash -= 0.016; }
    } else if (w.kind === 'snow') {
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      for (let i = 0; i < 90; i++) { const x = (hash2(i, 1, 9) * vw + Math.sin(t + i) * 8 + t * 10) % vw, y = (hash2(i, 2, 9) * vh + t * (20 + (i % 3) * 10)) % vh; ctx.fillRect(Math.round(x), Math.round(y), i % 4 === 0 ? 2 : 1, i % 4 === 0 ? 2 : 1); }
    } else if (w.kind === 'ash') {
      for (let i = 0; i < 50; i++) { const x = (hash2(i, 1, 7) * vw + t * 12 + Math.sin(t * 0.7 + i) * 10) % vw, y = (hash2(i, 2, 7) * vh + t * 14) % vh; ctx.fillStyle = i % 6 === 0 ? '#ff7020' : 'rgba(80,70,70,0.8)'; ctx.fillRect(Math.round(x), Math.round(y), 1, 1); }
    } else if (w.kind === 'sand') {
      ctx.fillStyle = 'rgba(220,180,110,0.22)'; ctx.fillRect(0, 0, vw, vh);
      ctx.fillStyle = 'rgba(240,210,150,0.6)';
      for (let i = 0; i < 80; i++) { const x = (hash2(i, 1, 5) * vw + t * 160) % vw, y = (hash2(i, 2, 5) * vh + Math.sin(t + i) * 4) % vh; ctx.fillRect(Math.round(x), Math.round(y), 3, 1); }
    }
  },
  drawLighting(ctx, camX, camY) {
    const dark = this.darkness();
    if (dark <= 0.01) return;
    const lc = this.lightX, vw = this.vw, vh = this.vh, P = this.player, L = this.level;
    lc.globalCompositeOperation = 'source-over';
    lc.clearRect(0, 0, vw, vh);
    lc.fillStyle = L.isWorld ? `rgba(8,10,32,${dark})` : `rgba(4,2,8,${dark})`;
    lc.fillRect(0, 0, vw, vh);
    lc.globalCompositeOperation = 'destination-out';
    const lights = [];
    let pr = L.isWorld ? 70 : 62;
    if (P.buffVal('light')) pr += 90;
    if (P.count('tocha')) pr += 22;
    lights.push([P.x, P.y - 8, pr, 1]);
    const tx0 = Math.floor(camX / 16) - 4, ty0 = Math.floor(camY / 16) - 4, tx1 = Math.floor((camX + vw) / 16) + 4, ty1 = Math.floor((camY + vh) / 16) + 4;
    const fire = [];
    for (let ty = ty0; ty <= ty1; ty++) for (let tx = tx0; tx <= tx1; tx++) {
      const o = L.objAt(tx, ty); if (!o) continue;
      const lr = OBJ_DEFS[o].light;
      if (lr) { const fl = (o === O.TORCH || o === O.CAMPFIRE || o === O.LAMP || o === O.FORGE) ? 1 + Math.sin(this.t * 9 + tx) * 0.05 : 1; lights.push([tx * 16 + 8, ty * 16 + 4, lr * fl, 1]); if (o === O.TORCH || o === O.CAMPFIRE || o === O.FORGE || o === O.LAMP) fire.push([tx * 16 + 8, ty * 16 + 4, lr * 0.8]); }
      const tl = L.tileAt(tx, ty);
      if (tl === T.LAVA && (tx + ty) % 2 === 0) { lights.push([tx * 16 + 8, ty * 16 + 8, 26, 0.7]); }
    }
    if (L.isWorld && this.isNight()) {
      for (const b of this.world.buildingsInView(camX, camY, camX + vw, camY + vh)) if (b.door && !b.decorative) lights.push([b.door.x * 16 + 8, b.door.y * 16 + 4, 34, 0.7]);
    }
    for (const p of this.projectiles) if (p.kind !== 'arrow' && p.kind !== 'rock') lights.push([p.x, p.y, p.kind === 'fireball' || p.kind === 'breath' ? 36 : 22, 0.9]);
    for (const a of this.actors) if (!a.dead && a.def && a.def.look && (a.def.look.k === 'elemental' || a.def.elem === 'fire' && a.def.dragon)) lights.push([a.x, a.y - 10, 50, 0.8]);
    for (const a of this.actors) if (a.team === 'ally' && a.def && a.def.look && a.def.look.ghostly) lights.push([a.x, a.y - 6, 30, 0.6]);
    for (const f of this.fx) if (f.kind === 'ring' || f.kind === 'bolt' || f.kind === 'meteor') lights.push([f.x || (f.pts && f.pts[f.pts.length - 1][0]) || P.x, f.y || (f.pts && f.pts[f.pts.length - 1][1]) || P.y, 60, 1 - f.t / f.dur]);
    for (const [x, y, r, a] of lights) {
      const sx = x - camX, sy = y - camY;
      if (sx < -r || sy < -r || sx > vw + r || sy > vh + r) continue;
      const g = lc.createRadialGradient(sx, sy, 0, sx, sy, r);
      g.addColorStop(0, `rgba(0,0,0,${a})`); g.addColorStop(0.55, `rgba(0,0,0,${a * 0.7})`); g.addColorStop(1, 'rgba(0,0,0,0)');
      lc.fillStyle = g; lc.fillRect(sx - r, sy - r, r * 2, r * 2);
    }
    ctx.drawImage(this.lightC, 0, 0);
    // brilho quente
    ctx.globalCompositeOperation = 'lighter';
    for (const [x, y, r] of fire) {
      const sx = x - camX, sy = y - camY;
      if (sx < -r || sy < -r || sx > vw + r || sy > vh + r) continue;
      const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, r);
      g.addColorStop(0, `rgba(255,140,40,${0.22 * dark})`); g.addColorStop(1, 'rgba(255,100,20,0)');
      ctx.fillStyle = g; ctx.fillRect(sx - r, sy - r, r * 2, r * 2);
    }
    ctx.globalCompositeOperation = 'source-over';
  },
  // Cena do título
  renderTitle(dt) {
    const ctx = this.ctx, vw = this.vw, vh = this.vh, t = this.t;
    const g = ctx.createLinearGradient(0, 0, 0, vh);
    g.addColorStop(0, '#120a2a'); g.addColorStop(0.6, '#4a2a5a'); g.addColorStop(1, '#c06040');
    ctx.fillStyle = g; ctx.fillRect(0, 0, vw, vh);
    for (let i = 0; i < 60; i++) { ctx.fillStyle = `rgba(255,255,255,${0.4 + 0.4 * Math.sin(t * 2 + i)})`; ctx.fillRect(Math.floor(hash2(i, 0, 1) * vw), Math.floor(hash2(i, 1, 1) * vh * 0.5), 1, 1); }
    ctx.fillStyle = '#f0e0c0'; ctx.beginPath(); ctx.arc(vw * 0.78, vh * 0.22, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#4a2a5a'; ctx.beginPath(); ctx.arc(vw * 0.78 + 5, vh * 0.22 - 3, 12, 0, Math.PI * 2); ctx.fill();
    const layer = (col, base, amp, freq, off) => { ctx.fillStyle = col; for (let x = 0; x < vw; x++) { const h = base + Math.sin((x + off) * freq) * amp + Math.sin((x + off) * freq * 2.7) * amp * 0.4; ctx.fillRect(x, Math.round(vh - h), 1, Math.ceil(h)); } };
    layer('#2a1838', vh * 0.45, 18, 0.02, t * 4);
    layer('#1e1028', vh * 0.32, 12, 0.035, t * 8);
    // castelo
    const cx = Math.round(vw * 0.3), cy = Math.round(vh - vh * 0.3);
    ctx.fillStyle = '#140a1c';
    ctx.fillRect(cx - 30, cy - 30, 60, 40); ctx.fillRect(cx - 40, cy - 48, 14, 58); ctx.fillRect(cx + 26, cy - 48, 14, 58); ctx.fillRect(cx - 8, cy - 62, 16, 72);
    for (let i = 0; i < 4; i++) { ctx.fillRect(cx - 40 + i * 4, cy - 52, 2, 4); ctx.fillRect(cx + 26 + i * 4, cy - 52, 2, 4); }
    ctx.beginPath(); ctx.moveTo(cx - 10, cy - 62); ctx.lineTo(cx, cy - 80); ctx.lineTo(cx + 10, cy - 62); ctx.fill();
    ctx.fillStyle = '#ffc060'; for (const [x, y] of [[cx - 35, cy - 36], [cx + 31, cy - 36], [cx - 2, cy - 50], [cx - 15, cy - 15], [cx + 12, cy - 15]]) ctx.fillRect(x, y, 2, 3);
    layer('#0c0612', vh * 0.18, 6, 0.06, t * 16);
    // dragão voando
    const dx = ((t * 30) % (vw + 200)) - 100, dy = vh * 0.3 + Math.sin(t) * 10;
    const S = Sprites.actor({ k: 'dragon', c: '#2a1a2a' });
    ctx.globalAlpha = 0.9; ctx.drawImage(S.right[Math.floor(t * 4) % 2 + 1], Math.round(dx), Math.round(dy)); ctx.globalAlpha = 1;
  }
};
window.addEventListener('load', () => Game.init());
