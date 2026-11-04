'use strict';
// =====================================================================
//  NPCs A CAVALO: viajantes que cavalgam pelas estradas, chegam às cidades,
//  descem do cavalo (que fica parado esperando), passeiam a pé e depois
//  montam de novo e seguem viagem. Param e descem para conversar com você.
//  A escolta das caravanas também anda a cavalo e desce para lutar.
// =====================================================================
const MONTARIAS_NPC = ['cavalo', 'cavalo', 'cavalo', 'burro', 'corcel', 'cavalo_guerra'];
const FALAS_CAVALEIRO = ['Ôa, ôa... calma, garoto. Bom dia, viajante!', 'Cavalgo desde o amanhecer. A estrada está cheia de lama.', 'Vou para a cidade vender umas coisas. E você?', 'Cuidado com os salteadores na próxima curva.', 'Meu cavalo é mais esperto que muita gente que eu conheço.'];

const Cavaleiros = {
  tT: 0,
  lista() { return Game.actors.filter(a => a.cavaleiro && !a.dead); },
  criar(tx, ty, dest, de) {
    const G = Game, rng = new RNG(Math.floor(Math.random() * 1e9)), s = de || G.world.nearestSettlement(tx, ty) || dest;
    const a = new NPC({ role: 'citizen', x: tx, y: ty }, s, rng);
    a.look = Object.assign({}, a.look, { cape: rng.chance(0.5) ? rng.pick(['#5a2a1a', '#2a3a5a', '#3a4a2a', '#4a3a5a']) : undefined, boots: '#2a1a10' });
    a.S = Sprites.actor(a.look); a.h = a.S.h;
    a.cavaleiro = { dest, estado: 'viagem', visit: new Map(), alvoT: null, kind: rng.pick(MONTARIAS_NPC), t: 0 };
    a.montado = true; a.home = { x: a.x, y: a.y };
    G.actors.push(a); return a;
  },
  // ---------- quem aparece e onde ----------
  tick(dt) {
    const G = Game, P = G.player, W = G.world; if (!P || !W || !G.level || !G.level.isWorld) return;
    this.tT -= dt; if (this.tT > 0) return; this.tT = 6;
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16), L = this.lista();
    for (const a of L) if (dist(a.x, a.y, P.x, P.y) > 1100) G.actors.splice(G.actors.indexOf(a), 1);
    if (L.length >= 3 || Math.random() > 0.35) return;
    const aqui = W.settlementAt(ptx, pty);
    if (aqui) {
      // alguém chega à cidade pela estrada do portão
      const g = aqui.gates[Math.floor(Math.random() * aqui.gates.length)]; if (!g) return;
      const k = g.dir === 'n' ? [0, -1] : g.dir === 's' ? [0, 1] : g.dir === 'w' ? [-1, 0] : [1, 0];
      for (let r = 10; r < 18; r++) { const x = g.x + k[0] * r, y = g.y + k[1] * r; if (!W.solidAt(x, y) && !W.settlementAt(x, y)) { this.criar(x, y, aqui); return; } }
      return;
    }
    if (G.distEstrada(ptx, pty) > 8) return;
    for (let t = 0; t < 20; t++) {
      const ang = Math.random() * Math.PI * 2, r = 15 + Math.random() * 8, x = Math.round(ptx + Math.cos(ang) * r), y = Math.round(pty + Math.sin(ang) * r);
      if (!ESTRADA_T(W.tileAt(x, y)) || W.solidAt(x, y) || W.settlementAt(x, y)) continue;
      const dest = Caravanas.destino(x, y, 25); if (dest) this.criar(x, y, dest);
      return;
    }
  },
  // ---------- montar e desmontar ----------
  desmontar(a) {
    if (!a.montado) return;
    const C = a.cavaleiro, lado = a.dir === 'left' ? 1 : -1;
    a.montado = false;
    C.cavalo = { x: a.x + lado * 14, y: a.y + 2, kind: C.kind, dir: a.dir === 'left' || a.dir === 'right' ? a.dir : 'right' };
    a.x -= lado * 4; a.pulo = 0.3;
  },
  montar(a) { const C = a.cavaleiro; if (!C.cavalo) return; a.x = C.cavalo.x; a.y = C.cavalo.y - 2; C.cavalo = null; a.montado = true; a.pulo = 0.3; },
  // ---------- andar ----------
  mover(a, dt) {
    const C = a.cavaleiro, W = Game.world;
    if (a.pulo > 0) { a.pulo -= dt; a.z = Math.sin((0.3 - a.pulo) / 0.3 * Math.PI) * 5; if (a.pulo <= 0) a.z = 0; }
    if (a.talkT > 0) { a.talkT -= dt; return; }
    if (C.pausa > 0) { C.pausa -= dt; a.moving = false; if (C.pausa <= 0 && C.estado === 'viagem') C.estado = 'aocavalo'; return; }
    const vai = (tx, ty, v) => { const d = dist(a.x, a.y, tx, ty); if (d < 3) { a.moving = false; return true; } const ang = Math.atan2(ty - a.y, tx - a.x); moveActor(a, Math.cos(ang) * Math.min(d, v * dt), Math.sin(ang) * Math.min(d, v * dt)); a.moving = true; a.anim += dt; a.setDir(ang); return false; };
    if (C.estado === 'viagem') {
      if (!a.montado) { C.estado = 'aocavalo'; return; }
      const dentro = W.settlementAt(Math.floor(a.x / 16), Math.floor(a.y / 16)) === C.dest;
      if (dentro || dist(a.x / 16, a.y / 16, C.dest.mid.x, C.dest.mid.y) < Math.min(C.dest.w, C.dest.h) / 2 - 1) {
        // chegou: desce do cavalo e vai passear na cidade
        this.desmontar(a); C.estado = 'cidade'; C.t = 25 + Math.random() * 25; C.passeio = null; return;
      }
      if (!C.alvoT || dist(a.x, a.y, C.alvoT.x, C.alvoT.y) < 3) C.alvoT = Caravanas.proximo({ x: a.x, y: a.y, dest: C.dest, visit: C.visit });
      if (C.alvoT) vai(C.alvoT.x, C.alvoT.y, 58);
    } else if (C.estado === 'cidade') {
      C.t -= dt;
      if (C.t <= 0) { C.estado = 'aocavalo'; C.partir = true; return; }
      if (!C.passeio || vai(C.passeio.x, C.passeio.y, 26)) { if (!C.passeio || Math.random() < 0.02) { const s = C.dest; C.passeio = { x: (s.mid.x + (Math.random() - 0.5) * s.w * 0.5) * 16, y: (s.mid.y + (Math.random() - 0.5) * s.h * 0.5) * 16 }; } }
      if (a.blocked) C.passeio = null;
    } else if (C.estado === 'aocavalo') {
      const h = C.cavalo; if (!h) { C.estado = 'viagem'; return; }
      if (vai(h.x - 6, h.y, 34) || a.blocked && dist(a.x, a.y, h.x, h.y) < 40) {
        this.montar(a);
        if (C.partir) { C.partir = false; const novo = Caravanas.destino(C.dest.mid.x, C.dest.mid.y, 30); if (novo && novo !== C.dest) { C.dest = novo; C.visit = new Map(); C.alvoT = null; } }
        C.estado = 'viagem';
      }
    }
  },
  // ---------- desenho ----------
  drawables(D, camX, camY, vw, vh) {
    for (const a of Game.actors) {
      const c = a.cavaleiro && a.cavaleiro.cavalo || a._cavaloParado; if (!c) continue;
      if (c.x < camX - 40 || c.x > camX + vw + 40 || c.y < camY - 40 || c.y > camY + vh + 40) continue;
      const H = Sprites.horse(c.kind), im = H[c.dir || 'right'][0];
      D.push({ y: c.y, fn: (ctx) => { ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(c.x - 11 - camX), Math.round(c.y - 1 - camY), 22, 3); ctx.drawImage(im, Math.round(c.x - im.width / 2 - camX), Math.round(c.y - im.height + 3 - camY)); } });
    }
  },
  // o NPC montado: cavalo embaixo, o cavaleiro por cima (vira para cima e para baixo também)
  desenharMontado(a, ctx, camX, camY) {
    const H = Sprites.horse(a.cavaleiro ? a.cavaleiro.kind : a.cavalo || 'cavalo'), vert = (a.dir === 'up' || a.dir === 'down') && H.up;
    const hk = vert ? a.dir : a.dir === 'left' || a.dir === 'right' ? a.dir : a.lastH || 'right';
    const f = a.moving ? 1 + (Math.floor(a.anim * 6) % 2) : 0, img = H[hk][f];
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(Math.round(a.x - (vert ? 7 : 11) - camX), Math.round(a.y - 1 - camY), vert ? 14 : 22, 3);
    ctx.drawImage(img, Math.round(a.x - img.width / 2 - camX), Math.round(a.y - img.height + 3 - camY));
    const z0 = a.z, d0 = a.dir; a.z = (z0 || 0) + 9; a.dir = hk;
    a.drawBody(ctx, camX, camY, a.S);
    a.z = z0; a.dir = d0;
    if (hk === 'down') { const fr = H.frente[f]; ctx.drawImage(fr, Math.round(a.x - fr.width / 2 - camX), Math.round(a.y - fr.height + 3 - camY)); }
  }
};

// ---------------- ganchos ----------------
(function () {
  const nu = NPC.prototype.update;
  NPC.prototype.update = function (dt) { if (this.cavaleiro) return Cavaleiros.mover(this, dt); return nu.call(this, dt); };
  const nd = NPC.prototype.draw;
  NPC.prototype.draw = function (ctx, camX, camY) { if (this.montado && this.cavaleiro) return Cavaleiros.desenharMontado(this, ctx, camX, camY); return nd.call(this, ctx, camX, camY); };
  // conversar com um cavaleiro: ele para e desce do cavalo
  const t0 = UI.talkNPC;
  UI.talkNPC = function (a) {
    if (a.cavaleiro && !a.caravana) {
      const C = a.cavaleiro;
      if (a.montado) { Cavaleiros.desmontar(a); C.pausa = 10; }
      else if (C.estado === 'viagem' || C.estado === 'aocavalo') C.pausa = 10;
      if (C.estado === 'viagem') return UI.dialog(a.name, a.look, FALAS_CAVALEIRO[Math.floor(Math.random() * FALAS_CAVALEIRO.length)] + `<br><span class="dim">Vou para ${esc(C.dest.name)}.</span>`, [{ label: 'Boa viagem!' }]);
    }
    return t0.call(this, a);
  };
  // a escolta da caravana: o primeiro guarda vai a cavalo e desce para lutar
  const g0 = Caravanas.guarda;
  Caravanas.guarda = function (C, look, name, lvl) {
    const m = g0.call(this, C, look, name, lvl);
    if (C.guardas.length === 0) { m.montado = true; m.cavalo = 'cavalo_guerra'; m.cavaloDe = true; }
    return m;
  };
  const mv0 = Caravanas.mover;
  Caravanas.mover = function (C, dt) {
    mv0.call(this, C, dt);
    for (const g of C.guardas) {
      if (!g.cavaloDe || g.dead) continue;
      if (C.parado && g.montado) { g.montado = false; g._cavaloParado = { x: g.x + 14, y: g.y + 2, kind: g.cavalo, dir: 'left' }; g.z = 0; }
      else if (!C.parado && !g.montado && g._cavaloParado) { if (dist(g.x, g.y, g._cavaloParado.x, g._cavaloParado.y) < 30 || dist(g.x, g.y, g.home.x, g.home.y) > 60) { g.montado = true; g._cavaloParado = null; } }
    }
  };
})();
