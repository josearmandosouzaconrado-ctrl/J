'use strict';
// =====================================================================
//  O INVERNO DE VERDADE E UM MUNDO MAIS BONITO
//  • Frio: no inverno (e nas terras geladas) o herói sente frio aos poucos.
//    Com frio ele cansa mais rápido e anda mais devagar; congelando, perde
//    vida. Roupas de pele, comida quente, fogueiras, lareiras e as casas
//    esquentam. Nórdicos e anões aguentam mais.
//  • Clima: neve leve (flocos de tamanhos diferentes caindo com o vento) e
//    nevasca (vento forte, tudo branco, frio três vezes mais rápido).
//  • Visual: pegadas na neve, bafo de frio, folhas caindo no outono,
//    vaga-lumes nas noites quentes, cores de cada estação e vinheta suave.
// =====================================================================
idef('casaco_pele', { name: 'Casaco de Peles', type: 'armor', slot: 'body', akind: 'body', mat: 'couro', armor: 10, quente: 0.45, icon: { k: 'body', c: '#8a6a4a' }, lvl: 1, wlook: { body: '#7a5a3a', pauldron: '#d8ccb8' }, value: 160, desc: 'Peles grossas de urso e lobo. Protege muito do frio do inverno.' });
idef('gorro_pele', { name: 'Gorro de Peles', type: 'armor', slot: 'head', akind: 'head', mat: 'couro', armor: 3, quente: 0.2, icon: { k: 'head', c: '#a08a6a' }, lvl: 1, wlook: { hat: 'beret', hatC: '#c8b89a' }, value: 60, desc: 'Esquenta as orelhas. Menos frio na nevasca.' });
idef('cha_quente', { name: 'Chá Quente de Ervas', type: 'food', use: { stam: 20, drink: 40 }, value: 6, stack: true, icon: { k: 'bottle', c: '#c87a3a' }, desc: 'Bem quente: espanta o frio.' });
// o quanto cada coisa esquenta
const COMIDA_QUENTE = { cha_quente: 45, ensopado: 40, hidromel: 30, carne_assada: 18, racao_viagem: 6 };
const RACA_FRIO = { nordico: 0.45, anao: 0.75, orc: 0.8, draconato: 0.7, tritao: 1.2, elfo: 1, felino: 1.15 };
const FONTES_CALOR = new Set([O.CAMPFIRE, O.FIREPLACE, O.FORGE, O.TORCH, O.STOVE, O.OVEN, O.BOILER].filter(x => x !== undefined));

const Inverno = {
  pegadas: [], folhas: [], vagalumes: [], tT: 0,
  // ---------- frio ----------
  frioAqui() {
    const G = Game, L = G.level, P = G.player; if (!L || !L.isWorld) return 0;
    const tx = Math.floor(P.x / 16), ty = Math.floor(P.y / 16), ri = L.regAt(tx, ty), R = G.world.regions[ri];
    const gelado = R && (R.biome === 'snow' || R.biome === 'mountain');
    if (Estacoes.quente(ri) && !gelado) return 0;
    let f = Estacoes.inverno() ? 1 : gelado ? 0.6 : 0;
    if (!f) return 0;
    const w = G.weather.kind;
    if (w === 'nevasca') f *= 3; else if (w === 'snow') f *= 1.4;
    if (G.isNight && G.isNight()) f *= 1.5;
    if (G.world.settlementAt(tx, ty)) f *= 0.5;   // as casas e as muralhas cortam o vento
    return f;
  },
  roupa(P) { let q = 0; for (const k in P.equip) { const it = P.equip[k]; const d = it && ITEMS[it.id]; if (d && d.quente) q += d.quente; } return Math.min(0.85, q); },
  perto(P) {
    const L = Game.level, tx = Math.floor(P.x / 16), ty = Math.floor(P.y / 16);
    for (let y = -3; y <= 3; y++) for (let x = -3; x <= 3; x++) if (FONTES_CALOR.has(L.objAt(tx + x, ty + y))) return true;
    return false;
  },
  atualizaFrio(dt) {
    const P = Game.player; if (P.frio === undefined) P.frio = 0;
    if (Game.godMode) { P.frio = 0; return; }
    const f = this.frioAqui(), fogo = this.perto(P);
    if (fogo || !Game.level.isWorld) P.frio = Math.max(0, P.frio - (fogo ? 4 : 2) * dt);
    else if (f > 0) P.frio = Math.min(100, P.frio + 0.4 * f * (1 - this.roupa(P)) * (RACA_FRIO[P.race] || 1) * (P.mounted ? 0.9 : 1) * dt);
    else P.frio = Math.max(0, P.frio - 1.2 * dt);
    // efeitos: cansa mais, anda devagar e, congelando, perde vida
    if (P.frio > 40 && P.stat) P.st = Math.max(0, P.st - P.stat.regenSt * 0.4 * dt);
    if (P.frio > 75 && !P.dead && P.stat) {
      const piso = P.stat.maxHp * (Game.weather.kind === 'nevasca' && P.frio >= 99 ? 0 : 0.15);
      if (P.hp > piso) { P.hp = Math.max(piso, P.hp - P.stat.maxHp * 0.006 * (P.frio - 70) / 30 * dt); if (P.hp <= 0) P.die && P.die(); }
    }
    const nivel = P.frio > 75 ? 2 : P.frio > 40 ? 1 : 0;
    if (nivel !== this.avisou) {
      if (nivel === 1 && (this.avisou || 0) < 1) Game.toast('❄ Você está com frio: procure uma fogueira, uma casa ou roupas de pele.', '#a0d0ff');
      if (nivel === 2) Game.toast('❄ CONGELANDO! Você está perdendo vida. Esquente-se!', '#80c0ff');
      this.avisou = nivel;
    }
  },
  vel() { const P = Game.player; let v = 1; if (P && P.frio > 60) v *= 0.88; if (Game.weather.kind === 'nevasca' && this.frioAqui() > 0) v *= 0.85; return v; },
  // ---------- quadro a quadro ----------
  tick(dt) {
    const G = Game; if (!G.started || !G.player || G.paused) return;
    this.tT -= dt; if (this.tT <= 0) { this.tT = 0.25; this.atualizaFrio(0.25); this.bafos(); }
    if (G.level && G.level.isWorld) { this.registraPegadas(); this.ambiente(dt); }
  },
  // bafo de frio saindo da boca de quem está por perto
  bafos() {
    const G = Game; if (!G.level.isWorld || !(Estacoes.inverno() || this.frioAqui() > 0)) return;
    const P = G.player;
    if (this.frioAqui() <= 0 && !Estacoes.inverno()) return;
    for (const a of [P].concat(G.actors.filter(a => !a.dead && !a.hidden && (a.team === 'npc' || a.guard) && dist(a.x, a.y, P.x, P.y) < 180).slice(0, 10))) {
      if (Math.random() > 0.35) continue;
      const h = (a.h || 24) + (a.z || 0), dx = a.dir === 'left' ? -4 : a.dir === 'right' ? 4 : 0;
      for (let i = 0; i < 2; i++) G.particle(a.x + dx + (Math.random() - 0.5) * 3, a.y - h + 7, dx * 3 + (Math.random() - 0.5) * 8, -6 - Math.random() * 6, 'rgba(235,242,255,0.75)', 0.7);
    }
  },
  // ---------- pegadas na neve ----------
  naNeve(x, y) {
    const W = Game.world, tx = Math.floor(x / 16), ty = Math.floor(y / 16), t = W.tileAt(tx, ty);
    return t === T.SNOW || (Estacoes.nivelPintado > 0 && Estacoes.neveEm(tx, ty, t, undefined, Estacoes.nivelPintado));
  },
  registraPegadas() {
    const G = Game, P = G.player, L = [P];
    for (const a of G.actors) if (a.moving && !a.dead && !a.fly && dist(a.x, a.y, P.x, P.y) < 260) L.push(a);
    for (const a of L) {
      const u = a._pg; if (u && dist(u.x, u.y, a.x, a.y) < 7) continue;
      a._pg = { x: a.x, y: a.y, lado: u ? -u.lado : 1 };
      if (!u || !this.naNeve(a.x, a.y)) continue;
      const ang = Math.atan2(a.y - u.y, a.x - u.x), cav = a === P ? P.mounted : a.montado;
      this.pegadas.push({ x: a.x - Math.sin(ang) * 2 * a._pg.lado, y: a.y + Math.cos(ang) * 2 * a._pg.lado, ang, t: G.t, cav });
    }
    if (this.pegadas.length > 360) this.pegadas.splice(0, this.pegadas.length - 360);
  },
  // ---------- folhas no outono e vaga-lumes nas noites quentes ----------
  ambiente(dt) {
    const G = Game, e = Estacoes.atual().e.id, vw = G.vw, vh = G.vh, noite = G.isNight && G.isNight();
    const R = G.regionAtPlayer && G.regionAtPlayer(), frio = R && (R.biome === 'snow' || SEM_NEVE.has(R.biome) && R.biome !== 'savanna');
    const qFolhas = e === 'outono' && !frio ? 22 : e === 'primavera' ? 8 : 0;
    while (this.folhas.length < qFolhas) this.folhas.push({ x: Math.random() * vw, y: Math.random() * vh, v: 8 + Math.random() * 14, f: Math.random() * 6, c: e === 'primavera' ? (Math.random() < 0.5 ? '#f8c8d8' : '#fff0f4') : ['#d06020', '#e0a020', '#a03018', '#c87a28'][Math.floor(Math.random() * 4)] });
    if (this.folhas.length > qFolhas) this.folhas.length = qFolhas;
    for (const f of this.folhas) { f.f += dt; f.y += f.v * dt; f.x += Math.sin(f.f * 1.7) * 14 * dt + 6 * dt; if (f.y > vh + 4) { f.y = -4; f.x = Math.random() * vw; } if (f.x > vw + 4) f.x = -4; }
    const qVaga = (e === 'verao' || e === 'primavera') && noite && !frio && G.weather.kind !== 'rain' && G.weather.kind !== 'storm' ? 16 : 0;
    const P = G.player;
    while (this.vagalumes.length < qVaga) this.vagalumes.push({ x: P.x + (Math.random() - 0.5) * vw, y: P.y + (Math.random() - 0.5) * vh, f: Math.random() * 9, a: Math.random() * 6 });
    if (this.vagalumes.length > qVaga) this.vagalumes.length = qVaga;
    for (const v of this.vagalumes) { v.f += dt; v.a += (Math.random() - 0.5) * dt * 3; v.x += Math.cos(v.a) * 9 * dt; v.y += Math.sin(v.a) * 6 * dt; if (Math.abs(v.x - P.x) > vw * 0.7 || Math.abs(v.y - P.y) > vh * 0.7) { v.x = P.x + (Math.random() - 0.5) * vw; v.y = P.y + (Math.random() - 0.5) * vh; } }
  },
  // ---------- desenho ----------
  drawables(D, camX, camY, vw, vh) {
    if (!this.pegadas.length) return;
    const t = Game.t;
    D.push({ y: -1e9, fn: (ctx) => {
      for (const p of this.pegadas) {
        const age = t - p.t; if (age > 50) continue;
        const x = Math.round(p.x - camX), y = Math.round(p.y - camY); if (x < -8 || y < -8 || x > vw + 8 || y > vh + 8) continue;
        ctx.globalAlpha = Math.max(0, 0.5 * (1 - age / 50));
        ctx.fillStyle = '#8a9ab8';
        if (p.cav) { ctx.fillRect(x - 2, y - 1, 3, 3); ctx.fillRect(x + 3, y - 1, 3, 3); }
        else if (Math.abs(Math.cos(p.ang)) > 0.7) ctx.fillRect(x - 2, y, 4, 2); else ctx.fillRect(x, y - 2, 2, 4);
      }
      ctx.globalAlpha = 1;
    } });
  },
  // a tela por cima do mundo: neve, nevasca, folhas, cores da estação e o frio nas bordas
  tela(ctx, vw, vh) {
    const G = Game, t = G.t, w = G.weather.kind, e = Estacoes.atual().e.id;
    if (Visual.ligado()) {
      // cores de cada estação (bem de leve)
      const cor = { inverno: 'rgba(170,195,255,0.07)', outono: 'rgba(255,170,90,0.05)', verao: 'rgba(255,230,140,0.035)', primavera: 'rgba(170,255,190,0.03)' }[e];
      // as cores ficam vivas como num quadro: um pouco mais de saturação no verde de dia
      if (e !== 'inverno' && Game.time > 6 * 60 && Game.time < 18 * 60) { ctx.globalCompositeOperation = 'saturation'; ctx.fillStyle = 'rgba(0,200,0,0.12)'; ctx.fillRect(0, 0, vw, vh); ctx.globalCompositeOperation = 'source-over'; }
      if (cor) { ctx.fillStyle = cor; ctx.fillRect(0, 0, vw, vh); }
    }
    for (const f of this.folhas) { const x = Math.round(f.x), y = Math.round(f.y), v = Math.sin(f.f * 3) > 0; ctx.fillStyle = f.c; if (v) { ctx.fillRect(x, y, 4, 2); ctx.fillRect(x + 1, y - 1, 2, 4); } else ctx.fillRect(x, y, 2, 3); ctx.fillStyle = shade(f.c, -0.35); ctx.fillRect(x + (v ? 3 : 1), y + (v ? 1 : 2), 1, 1); }
    const P = G.player;
    if (P && P.frio > 35) {
      // gelo nas bordas da tela
      const k = Math.min(1, (P.frio - 35) / 55), g = this.gelo(vw, vh);
      ctx.globalAlpha = k * (0.75 + Math.sin(t * 2) * 0.08); ctx.drawImage(g, 0, 0); ctx.globalAlpha = 1;
    }
    void w;
  },
  neve(ctx, vw, vh, forte) {
    const t = Game.t, vento = forte ? 150 + Math.sin(t * 0.5) * 60 : 14 + Math.sin(t * 0.3) * 10;
    if (forte) {
      // rajadas de vento: tudo fica branco e some ao longe
      const raj = 0.3 + 0.12 * Math.sin(t * 1.3) + 0.08 * Math.sin(t * 3.1);
      ctx.fillStyle = `rgba(225,232,245,${raj})`; ctx.fillRect(0, 0, vw, vh);
      ctx.strokeStyle = 'rgba(255,255,255,0.35)'; ctx.lineWidth = 1; ctx.beginPath();
      for (let i = 0; i < 26; i++) { const y = (hash2(i, 5, 3) * vh + t * 30) % vh, x = (hash2(i, 6, 3) * (vw + 200) + t * 520) % (vw + 200) - 100; ctx.moveTo(x, y); ctx.lineTo(x - 36, y - 6); }
      ctx.stroke();
    }
    const n = forte ? 260 : 130;
    for (let i = 0; i < n; i++) {
      const camada = i % 3, sz = camada === 0 ? 1 : camada === 1 ? 2 : 3, vel = (forte ? 120 : 16) + camada * (forte ? 60 : 12);
      const x = ((hash2(i, 1, 9) * (vw + 60) + t * vento * (0.6 + camada * 0.3) + Math.sin(t * 1.3 + i) * (forte ? 3 : 7)) % (vw + 60) + vw + 60) % (vw + 60) - 30;
      const y = (hash2(i, 2, 9) * vh + t * vel) % vh;
      ctx.fillStyle = camada === 2 ? 'rgba(255,255,255,0.95)' : camada === 1 ? 'rgba(245,248,255,0.85)' : 'rgba(230,238,250,0.7)';
      ctx.fillRect(Math.round(x), Math.round(y), forte && camada === 2 ? 3 : sz, sz);
    }
  },
  gelo(vw, vh) {
    if (this._gelo && this._gelo.width === vw && this._gelo.height === vh) return this._gelo;
    const c = this._gelo = Sprites.cv(vw, vh), x = c.getContext('2d');
    const g = x.createRadialGradient(vw / 2, vh / 2, Math.min(vw, vh) * 0.3, vw / 2, vh / 2, Math.max(vw, vh) * 0.65);
    g.addColorStop(0, 'rgba(200,225,255,0)'); g.addColorStop(0.7, 'rgba(200,225,255,0.25)'); g.addColorStop(1, 'rgba(235,245,255,0.8)');
    x.fillStyle = g; x.fillRect(0, 0, vw, vh);
    // cristais de gelo nos cantos
    x.fillStyle = 'rgba(255,255,255,0.6)';
    for (let i = 0; i < 260; i++) { const a = hash2(i, 3, 1) * Math.PI * 2, r = Math.max(vw, vh) * (0.42 + hash2(i, 4, 1) * 0.2), px = vw / 2 + Math.cos(a) * r * vw / Math.max(vw, vh), py = vh / 2 + Math.sin(a) * r * vh / Math.max(vw, vh); x.fillRect(Math.round(px), Math.round(py), 1 + (i % 3 === 0), 1); }
    return c;
  },
  vinheta(vw, vh) {
    if (this._vin && this._vin.width === vw && this._vin.height === vh) return this._vin;
    const c = this._vin = Sprites.cv(vw, vh), x = c.getContext('2d');
    const g = x.createRadialGradient(vw / 2, vh / 2, Math.min(vw, vh) * 0.45, vw / 2, vh / 2, Math.max(vw, vh) * 0.72);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(10,6,16,0.32)');
    x.fillStyle = g; x.fillRect(0, 0, vw, vh);
    return c;
  },
  // vaga-lumes brilham no escuro: desenhados depois da luz da noite
  brilhos(ctx) {
    if (!this.vagalumes.length || !Game.level.isWorld) return;
    const camX = Game.camX, camY = Game.camY;
    for (const v of this.vagalumes) {
      const b = 0.5 + 0.5 * Math.sin(v.f * 3); if (b < 0.25) continue;
      const x = Math.round(v.x - camX), y = Math.round(v.y - camY);
      ctx.fillStyle = `rgba(210,255,120,${0.25 * b})`; ctx.fillRect(x - 2, y - 2, 5, 5);
      ctx.fillStyle = `rgba(240,255,170,${b})`; ctx.fillRect(x, y, 1, 1);
    }
  },
  hud() {
    const P = Game.player; if (!P || !(P.frio > 1)) return '';
    const c = P.frio > 75 ? '#60a0ff' : P.frio > 40 ? '#a0c8ff' : '#d0e4ff';
    return `<span class="need ${P.frio > 75 ? 'pulse' : ''}" title="frio"><b>❄</b><i style="width:${Math.round(P.frio)}%;background:${c}"></i></span>`;
  }
};

// ---------------- ganchos ----------------
(function () {
  // clima de inverno: neve leve e nevasca (sem trovoada no meio da neve)
  Estacoes.tempo = function (R, r) {
    if (!this.inverno() || SEM_NEVE.has(R.biome)) return undefined;
    return r < 0.36 ? 'snow' : r < 0.54 ? 'nevasca' : null;
  };
  const uw0 = Game.updateWeather;
  Game.updateWeather = function (dt) {
    const w = this.weather, t0 = w.t; uw0.call(this, dt);
    if (w.t > t0 && w.kind === 'snow') { const R = this.regionAtPlayer(); if (R && (R.biome === 'snow' || R.biome === 'mountain') && Math.random() < 0.35) w.kind = 'nevasca'; }
  };
  const dw0 = Game.drawWeather;
  Game.drawWeather = function (ctx, vw, vh) {
    const k = this.weather.kind;
    if (k === 'snow' || k === 'nevasca') Inverno.neve(ctx, vw, vh, k === 'nevasca'); else dw0.call(this, ctx, vw, vh);
    if (this.level && this.level.isWorld) Inverno.tela(ctx, vw, vh);
  };
  const fog0 = Sombra.drawFog; Sombra.drawFog = function (ctx) { const r = fog0.apply(this, arguments); Inverno.brilhos(ctx); return r; };
  // frio deixa mais lento
  const v0 = Estacoes.vel; Estacoes.vel = function (P) { return v0.call(this, P) * (P === Game.player ? Inverno.vel() : 1); };
  // comida quente espanta o frio
  const u0 = Player.prototype.useItem;
  Player.prototype.useItem = function (it) { const q = it && COMIDA_QUENTE[it.id]; const r = u0.call(this, it); if (q && this.frio) { this.frio = Math.max(0, this.frio - q); Game.toast(`Que quentinho! (−${q} de frio)`, '#ffd0a0'); } return r; };
  // a barrinha de frio junto da fome, sede e sono
  const h0 = Vida.hudHTML; Vida.hudHTML = function () { return h0.call(this) + Inverno.hud(); };
  // roupas de pele e chá quente nas lojas (mais no inverno)
  const g0 = Shops.generate;
  Shops.generate = function (b, role, rng) {
    const out = g0.call(this, b, role, rng);
    if (role === 'general' || role === 'stall') {
      out.push(Items.make('cha_quente', rng.int(3, 8)));
      if (Estacoes.inverno() || rng.chance(0.35)) { out.push(Items.make('casaco_pele')); out.push(Items.make('gorro_pele')); }
    }
    return out;
  };
  // armaduras de couro e peles também esquentam um pouco
  for (const id in ITEMS) { const d = ITEMS[id]; if (d.slot && d.quente === undefined && /couro|pele/i.test(d.name || '') && (d.slot === 'body' || d.slot === 'head')) d.quente = d.slot === 'body' ? 0.15 : 0.05; }
})();
