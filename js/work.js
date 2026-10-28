'use strict';
// ===================== TRABALHOS DE VERDADE =====================
// Taverneiro, fazendeiro e minerador não ganham mais dinheiro só clicando:
// o turno acontece no lugar de trabalho e o jogador faz o serviço com as mãos.
const ACTIVE_JOBS = {
  taverneiro: { kind: 'tavern', quota: 10, time: 180, unit: 'pedidos' },
  fazendeiro: { kind: 'farm', quota: 8, time: 200, unit: 'canteiros colhidos' },
  minerador: { kind: 'mine', quota: 10, time: 200, unit: 'minérios no carrinho' }
};
const TAVERN_ORDERS = { beer: { name: 'cerveja', icon: 'mug' }, stew: { name: 'ensopado', icon: 'bowl' } };
const CUSTOMER_LINES = ['Finalmente! Saúde!', 'Ah, que delícia!', 'Você é rápido, hein?', 'Pela barba do meu avô, que cerveja boa!', 'Isso sim é serviço!', 'Obrigado, amigo!'];

// ---------- Mina subterrânea ----------
class MineLevel {
  constructor(s) {
    this.isWorld = false; this.isInterior = false; this.isMine = true; this.dark = true;
    this.s = s; this.name = `Mina de ${s.name}`; this.regIndex = s.region.index;
    const W = this.w = 44, H = this.h = 30, r = new RNG(hashStr(s.name) + 77);
    this.tiles = new Uint8Array(W * H).fill(T.CWALL);
    this.objs = new Uint8Array(W * H);
    const carve = (cx, cy, rad) => { for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) if (x > 0 && y > 0 && x < W - 1 && y < H - 1 && (x - cx) ** 2 + (y - cy) ** 2 <= rad * rad + 0.5) this.tiles[y * W + x] = T.CFLOOR; };
    // galeria principal (com trilhos) e galerias laterais
    const main = []; let x = W >> 1;
    for (let y = H - 2; y >= 4; y--) { carve(x, y, 1.6); main.push([x, y]); if (y < H - 5 && r.chance(0.25)) x = clamp(x + r.pick([-1, 1]), 8, W - 9); }
    this.rails = main.slice(2);
    for (let b = 0; b < 6; b++) {
      const [sx, sy] = main[r.int(5, main.length - 3)], dir = b % 2 ? 1 : -1;
      let bx = sx, by = sy;
      for (let k = 0, n = r.int(9, 15); k < n; k++) { bx += dir; if (r.chance(0.35)) by = clamp(by + r.pick([-1, 1]), 3, H - 6); carve(bx, by, 1.2); }
      carve(bx, by, 2.4);
    }
    carve(main[main.length - 1][0], 4, 2.6);
    const ex = W >> 1;
    this.objs[(H - 2) * W + ex] = O.STAIRS_UP;
    this.entry = { x: ex, y: H - 4 };
    const isFloor = (x, y) => x >= 0 && y >= 0 && x < W && y < H && this.tiles[y * W + x] === T.CFLOOR;
    const nearWall = (x, y) => [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => !isFloor(x + dx, y + dy));
    const railSet = new Set(this.rails.map(([a, b]) => b * W + a));
    const free = (x, y) => isFloor(x, y) && !this.objs[y * W + x] && !railSet.has(y * W + x) && Math.abs(y - (H - 3)) > 1;
    // carrinho de mina no fim dos trilhos, perto da entrada
    const [cx0, cy0] = this.rails[0];
    this.cart = { x: cx0, y: cy0 }; this.objs[cy0 * W + cx0] = O.MINECART;
    // veios de minério nas paredes das galerias
    const ores = ORE_BY_REGION[s.region.id] || [O.ORE_FERRO];
    const spots = []; for (let y = 2; y < H - 5; y++) for (let x = 1; x < W - 1; x++) if (free(x, y) && nearWall(x, y)) spots.push([x, y]);
    r.shuffle(spots);
    let n = 0; for (const [vx, vy] of spots) { if (n >= 26) break; if (this.near(vx, vy, O.ORE_FERRO, 2)) continue; this.objs[vy * W + vx] = r.chance(0.7) ? O.ORE_FERRO : r.pick(ores); n++; }
    // escoras de madeira, lanternas, caixas e ferramentas
    for (let i = 3; i < main.length; i += 5) { const [mx, my] = main[i]; for (const sx of [-2, 2]) { const tx = mx + sx; if (!isFloor(tx, my)) this.objs[my * W + tx] = O.MINEBEAM; } }
    for (let i = 4; i < main.length; i += 7) { const [mx, my] = main[i]; const tx = isFloor(mx + 1, my) && free(mx + 1, my) ? mx + 1 : mx - 1; if (free(tx, my)) this.objs[my * W + tx] = O.LANTERN; }
    for (let i = 0; i < 8; i++) { const [px, py] = spots[(i * 7 + 3) % spots.length]; if (free(px, py)) this.objs[py * W + px] = i % 3 === 0 ? O.LANTERN : r.pick([O.CRATE, O.BARREL, O.ROCK]); }
    this.veinHp = new Map();
    this.canvas = null;
  }
  near(x, y, o, d) { for (let yy = y - d; yy <= y + d; yy++) for (let xx = x - d; xx <= x + d; xx++) { const v = this.objAt(xx, yy); if (v >= O.ORE_FERRO && v <= O.ORE_EBANO) return true; } return false; }
  inb(x, y) { return x >= 0 && y >= 0 && x < this.w && y < this.h; }
  tileAt(tx, ty) { return this.inb(tx, ty) ? this.tiles[ty * this.w + tx] : T.CWALL; }
  objAt(tx, ty) { return this.inb(tx, ty) ? this.objs[ty * this.w + tx] : 0; }
  regAt() { return this.regIndex; }
  setObj(tx, ty, o) { if (!this.inb(tx, ty)) return; const i = ty * this.w + tx, old = this.objs[i]; this.objs[i] = o; if (OBJ_BAKED[old] || OBJ_BAKED[o]) this.canvas = null; }
  solidAt(tx, ty) { if (!this.inb(tx, ty)) return true; const i = ty * this.w + tx; return TSOLID[this.tiles[i]] || OSOLID[this.objs[i]]; }
  render() {
    const c = Sprites.cv(this.w * 16, this.h * 16), ctx = c.getContext('2d');
    Sprites.paintTiles(ctx, this.w, this.h, (x, y) => this.tileAt(x, y), hashStr(this.s.name) % 999);
    // trilhos do carrinho
    for (const [x, y] of this.rails) {
      const px = x * 16, py = y * 16;
      ctx.fillStyle = '#5a3a1a'; for (let k = 1; k < 16; k += 5) ctx.fillRect(px + 2, py + k, 12, 2);
      ctx.fillStyle = '#6a6a72'; ctx.fillRect(px + 3, py, 2, 16); ctx.fillRect(px + 11, py, 2, 16);
      ctx.fillStyle = '#9a9aa4'; ctx.fillRect(px + 3, py, 1, 16); ctx.fillRect(px + 11, py, 1, 16);
    }
    for (let i = 0; i < this.w * this.h; i++) {
      const o = this.objs[i]; if (!OBJ_BAKED[o]) continue;
      const x = i % this.w, y = (i / this.w) | 0, s = Sprites.obj(o, Math.floor(hash2(x, y, 5) * (OBJ_VARIANTS[o] || 1)));
      ctx.drawImage(s.c, x * 16 + 8 - (s.w >> 1), y * 16 + 16 - s.h + s.oy);
    }
    this.canvas = c;
  }
  drawGround(ctx, camX, camY, vw, vh) {
    if (!this.canvas) this.render();
    ctx.fillStyle = '#000'; ctx.fillRect(0, 0, vw, vh);
    ctx.drawImage(this.canvas, -camX, -camY);
  }
}

const Work = {
  cur: null,
  icons: {},
  icon(k) {
    if (this.icons[k]) return this.icons[k];
    const c = Sprites.cv(10, 10), p = Sprites.P(c.getContext('2d'));
    if (k === 'mug') { p(1, 2, '#c08020', 6, 7); p(2, 3, '#e0a830', 4, 5); p(1, 1, '#f8f4e8', 6, 2); p(7, 4, '#c08020', 2, 1); p(8, 4, '#c08020', 1, 3); p(7, 6, '#c08020', 2, 1); }
    else if (k === 'bowl') { p(1, 5, '#7a4a24', 8, 3); p(2, 8, '#5a3418', 6, 1); p(2, 4, '#c87a30', 6, 2); p(3, 1, '#e0e0e0', 1, 2); p(6, 0, '#e0e0e0', 1, 2); }
    else if (k === 'ore') { p(2, 3, '#6a6670', 6, 5); p(1, 4, '#5a5660', 8, 3); p(3, 4, '#c08050', 2, 1); p(5, 6, '#c08050', 1, 1); p(3, 3, '#8a8690', 3, 1); }
    Sprites.outline(c, '#120c10');
    return (this.icons[k] = c);
  },
  st() { return this.cur; },
  isActive(id) { return !!ACTIVE_JOBS[id]; },

  // ---------- Início do turno ----------
  start(b, id) {
    const G = Game, P = G.player, job = P.job, J = JOBS[id], A = ACTIVE_JOBS[id];
    const h = G.time / 60;
    if (h < 6 || h >= 22) { G.toast('O expediente é das 6h às 22h. Volte de manhã.', '#ffb080'); return false; }
    if (job.lastDay !== G.day) { job.lastDay = G.day; job.today = 0; }
    if (job.today >= 2) { G.toast('Você já trabalhou dois turnos hoje. Descanse!', '#ffb080'); return false; }
    if (this.cur) { G.toast('Você já está num turno de trabalho.', '#ffb080'); return false; }
    job.today++;
    const s = b.settlement;
    const c = this.cur = { kind: A.kind, id, b, s, quota: A.quota, t: A.time, max: A.time, done: 0, tips: 0, carry: [], items: 0 };
    UI.close();
    if (A.kind === 'tavern') {
      if (!(G.level.isInterior && G.level.b === b)) G.enterInterior(b);
      c.level = G.level; c.custs = []; c.spawnT = 0.5; c.spawned = 0;
      G.centerMsg('TURNO NA TAVERNA', `Sirva ${A.quota} pedidos: encha canecas no barril e pegue ensopado na lareira`);
    } else if (A.kind === 'farm') {
      c.plots = this.makePlots(s);
      G.centerMsg('TURNO NA FAZENDA', `Vá até a plantação (siga a bússola): plante, regue e colha ${A.quota} canteiros`);
    } else {
      c.mine = this.mineOf(s);
      if (!c.mine) { this.cur = null; job.today--; G.toast('Esta vila não tem mina por perto.', '#ffb080'); return false; }
      G.centerMsg('TURNO NA MINA', `Vá até a mina (siga a bússola) e encha o carrinho com ${A.quota} minérios`);
    }
    Sfx.play('quest');
    return true;
  },

  // ---------- Atualização ----------
  update(dt) {
    const c = this.cur; if (!c) return;
    const G = Game, P = G.player;
    c.t -= dt;
    if (P.dead) return this.finish('Você desmaiou durante o turno.');
    if (c.t <= 0) return this.finish('O turno acabou.');
    if (c.kind === 'tavern') {
      if (G.level !== c.level) return this.finish('Você saiu da taverna no meio do turno.');
      this.updateTavern(dt);
    } else if (c.kind === 'farm') {
      for (const p of c.plots) if (p.stage === 2) { p.g += dt; if (p.g >= p.need) { p.stage = 3; if (G.level.isWorld && dist(P.x, P.y, p.x * 16 + 8, p.y * 16 + 8) < 200) G.burst(p.x * 16 + 8, p.y * 16 + 4, '#f0d040', 6, 30); } }
      if (G.level.isWorld && c.started && dist(P.x / 16, P.y / 16, c.plots[0].x, c.plots[0].y) > 140) return this.finish('Você abandonou a plantação.');
      if (G.level.isWorld && !c.started && dist(P.x / 16, P.y / 16, c.plots[0].x, c.plots[0].y) < 12) { c.started = true; G.toast('Chegou à plantação! Ande até os canteiros e use AÇÃO.', '#c0ff90'); }
    } else if (c.kind === 'mine') {
      if (G.level.isMine) c.entered = true;
      else if (c.entered) return this.finish('Você saiu da mina.');
    }
  },
  // ---------- Taverna ----------
  updateTavern(dt) {
    const c = this.cur, G = Game, L = c.level;
    // novos clientes chegam e se sentam
    c.spawnT -= dt;
    const waiting = c.custs.filter(a => a.workCust.state === 'wait').length;
    if (c.spawnT <= 0 && waiting < 4 && c.spawned < c.quota + 6) {
      c.spawnT = 5 + Math.random() * 4;
      const chairs = [];
      for (let y = 0; y < L.h; y++) for (let x = 0; x < L.w; x++) if (L.objAt(x, y) === O.CHAIR && !G.actors.some(a => !a.dead && Math.abs(a.x - (x * 16 + 8)) < 8 && Math.abs(a.y - (y * 16 + 12)) < 8)) chairs.push([x, y]);
      if (chairs.length) {
        const [x, y] = chairs[Math.floor(Math.random() * chairs.length)];
        const a = new NPC({ role: 'patron', x, y }, c.s, new RNG(Math.floor(Math.random() * 1e9)));
        a.indoor = true; a.visiting = true; a.home = { x: a.x, y: a.y };
        a.workCust = { order: Math.random() < 0.7 ? 'beer' : 'stew', pat: 45, max: 45, state: 'wait', t: 0 };
        a.setDir(Math.PI / 2);
        G.actors.push(a); c.custs.push(a); c.spawned++;
        G.particle(a.x, a.y - 12, 0, -20, '#ffffff', 0.4);
      }
    }
    for (const a of c.custs) {
      const w = a.workCust;
      if (w.state === 'wait') {
        w.pat -= dt;
        if (w.pat <= 0) { w.state = 'leave'; G.floater(a.x, a.y - 26, 'Que demora!', '#ff9080'); G.toast(`${a.name} cansou de esperar e foi embora.`, '#ffb080'); }
      } else if (w.state === 'drink') { w.t -= dt; if (w.t <= 0) w.state = 'leave'; }
      else if (w.state === 'leave') {
        const tx = L.exitPos.x * 16 + 8, ty = (L.exitPos.y - 1) * 16 + 8, d = dist(a.x, a.y, tx, ty);
        w.t = (w.t || 0) + dt;
        if (d < 8 || w.t > 8) { a.dead = true; a.deadT = 10; continue; }
        const ang = angleTo(a.x, a.y, tx, ty); moveActor(a, Math.cos(ang) * 40 * dt, Math.sin(ang) * 40 * dt);
        if (a.blocked) moveActor(a, Math.cos(ang + 1.3) * 40 * dt, Math.sin(ang + 1.3) * 40 * dt);
        a.moving = true; a.anim = (a.anim || 0) + dt; a.setDir(ang);
      }
    }
    c.custs = c.custs.filter(a => !a.dead);
  },
  serve(a) {
    const c = this.cur, G = Game, w = a.workCust;
    if (!c || !w) return;
    if (w.state !== 'wait') return G.toast(w.state === 'drink' ? `${a.name} está saboreando o pedido.` : `${a.name} já está indo embora.`, '#c0c0c0');
    const k = c.carry.indexOf(w.order);
    if (k < 0) { G.floater(a.x, a.y - 26, `Eu pedi ${TAVERN_ORDERS[w.order].name}!`, '#ffd0a0'); return; }
    c.carry.splice(k, 1);
    const tip = Math.round(2 + (w.pat / w.max) * 8 + Math.random() * 3);
    c.tips += tip; c.done++;
    w.state = 'drink'; w.t = 7 + Math.random() * 5;
    G.floater(a.x, a.y - 30, `+${tip} gorjeta`, '#ffd040');
    G.floater(a.x, a.y - 20, CUSTOMER_LINES[Math.floor(Math.random() * CUSTOMER_LINES.length)], '#ffffff');
    Sfx.play('coin'); Game.player.train('eloquencia', 1.5);
    if (c.done >= c.quota) G.later(1.2, () => this.cur === c && this.finish('Todos os pedidos servidos!'));
  },
  // ---------- Fazenda ----------
  makePlots(s) {
    const W = Game.world, out = [], seen = new Set();
    const far = [];
    for (let y = s.y0; y < s.y0 + s.h; y++) for (let x = s.x0; x < s.x0 + s.w; x++) if (W.tileAt(x, y) === T.FARM && !W.objAt(x, y)) far.push([x, y]);
    if (far.length >= 8) {
      const rng = new RNG(Game.day * 31 + hashStr(s.name));
      const [ax, ay] = far[rng.int(0, far.length - 1)];
      far.sort((p, q) => dist(p[0], p[1], ax, ay) - dist(q[0], q[1], ax, ay));
      for (const [x, y] of far.slice(0, 8)) out.push({ x, y });
    } else {
      // sem campos cultivados: o fazendeiro abre canteiros na saída da cidade
      const g = s.gates.find(g => g.dir === 's') || s.gates[0];
      let bx = g.x - 2, by = g.y + (g.dir === 'n' ? -6 : 4);
      for (let tries = 0; tries < 30 && out.length < 8; tries++, by += g.dir === 'n' ? -1 : 1) {
        out.length = 0;
        for (let k = 0; k < 8; k++) { const x = bx + (k % 4) + (k % 4 > 1 ? 1 : 0), y = by + Math.floor(k / 4) * 2; const t = W.tileAt(x, y); if (!TSOLID[t] && !TWATER[t] && !W.objAt(x, y)) out.push({ x, y }); }
      }
    }
    for (const p of out) { p.stage = 0; p.g = 0; p.need = 10 + Math.random() * 6; seen.add(p.x + ',' + p.y); }
    return out;
  },
  farmAct(p) {
    const c = this.cur, G = Game, P = G.player, x = p.x * 16 + 8, y = p.y * 16 + 10;
    if (p.stage === 0) { p.stage = 1; G.burst(x, y, '#6a4a2a', 6, 25); Sfx.play('harvest'); G.floater(x, y - 14, 'Plantado', '#c0ff90'); }
    else if (p.stage === 1) { p.stage = 2; p.g = 0; for (let i = 0; i < 10; i++) G.particle(x + (Math.random() - 0.5) * 12, y - 10, (Math.random() - 0.5) * 10, 30 + Math.random() * 20, '#80c0ff', 0.5, 1, 60); Sfx.play('drink'); G.floater(x, y - 14, 'Regado', '#80c0ff'); }
    else if (p.stage === 3) {
      p.stage = 4; c.done++; G.burst(x, y, '#f0d040', 10, 40); Sfx.play('harvest');
      const n = 1 + (Math.random() < 0.5 ? 1 : 0); P.addItem(Items.make(Math.random() < 0.8 ? 'trigo' : 'batata', n), true);
      G.floater(x, y - 14, 'Colhido!', '#ffe080'); P.train('alquimia', 1);
      if (c.done >= c.quota) G.later(1, () => this.cur === c && this.finish('A colheita terminou!'));
    }
    P.st = Math.max(0, P.st - 3);
  },
  // ---------- Mina ----------
  mineOf(s) {
    if (s._mine !== undefined) return s._mine;
    const W = Game.world, rng = new RNG(hashStr(s.name) + 5);
    const ok = (x, y) => {
      if (x > s.x0 - 3 && x < s.x0 + s.w + 3 && y > s.y0 - 3 && y < s.y0 + s.h + 3) return false;
      for (let dy = -3; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) { const t = W.tileAt(x + dx, y + dy); if (TSOLID[t] || TWATER[t] || t === T.LAVA) return false; const o = W.objAt(x + dx, y + dy); if (o && OSOLID[o]) return false; }
      return !W.settlementAt(x, y);
    };
    let best = null;
    for (let k = 0; k < 90 && !best; k++) { const a = rng.range(0, Math.PI * 2), r = s.w / 2 + 6 + rng.range(0, 16); const x = Math.round(s.mid.x + Math.cos(a) * r), y = Math.round(s.mid.y + Math.sin(a) * r); if (ok(x, y)) best = { x, y }; }
    s._mine = best;
    return best;
  },
  hasMine(s) { return (s.type === 'village' || s.type === 'town') && (s.buildings || []).some(b => b.role === 'smith'); },
  enterMine(s) {
    const G = Game, P = G.player, m = this.mineOf(s);
    G.worldPos = { x: m.x * 16 + 8, y: (m.y + 2) * 16 + 4 };
    const L = new MineLevel(s);
    G.level = L; P.mounted = false;
    const keep = G.actors.filter(a => a.team === 'ally' && a.follow && !a.dead);
    G.actors = keep;
    for (const ss of G.world.settlements) if (ss.active) { ss.active = false; ss.npcs = null; }
    for (const p of G.world.pois) p.spawned = false;
    P.x = L.entry.x * 16 + 8; P.y = L.entry.y * 16 + 10;
    for (const a of keep) { a.x = P.x + 10; a.y = P.y + 4; G.findFree(a); }
    G.projectiles = []; G.clouds = []; G.pickups = []; G.timers = G.timers.filter(t => t.keep);
    G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; G.flow = null;
    Sfx.play('door'); UI.fade();
    G.toast(this.cur && this.cur.kind === 'mine' ? 'Quebre os veios de minério e leve as pedras até o carrinho nos trilhos.' : L.name, '#ffe8a0');
  },
  mineHit(it) {
    const c = this.cur, G = Game, P = G.player, L = G.level;
    if (!c || c.kind !== 'mine') return false;
    if (c.carry.length >= 4) { G.toast('Suas mãos estão cheias! Leve os minérios até o carrinho.', '#ffb080'); return true; }
    if (P.st < 4) { G.toast('Você está cansado demais. Espere recuperar o fôlego.', '#80ff80'); return true; }
    P.st -= 4;
    const k = it.ty * L.w + it.tx, hp = (L.veinHp.get(k) ?? 3) - 1;
    const ang = angleTo(P.x, P.y - 6, it.tx * 16 + 8, it.ty * 16 + 8); P.setDir(ang);
    P.swing = { t: 0, dur: 0.18, ang, arc: 1.4 };
    G.fx.push({ kind: 'swing', x: P.x, y: P.y - 6, ang, arc: 1.2, r: 22, t: 0, dur: 0.16, color: '#ffffff' });
    G.burst(it.tx * 16 + 8, it.ty * 16 + 8, '#a09890', 6, 40); G.shake = Math.max(G.shake, 1.5); Sfx.play('mine');
    if (hp > 0) { L.veinHp.set(k, hp); G.floater(it.tx * 16 + 8, it.ty * 16 - 4, 'CRAC!', '#d0d0d0'); return true; }
    L.veinHp.delete(k); L.setObj(it.tx, it.ty, 0);
    c.carry.push(it.o);
    G.burst(it.tx * 16 + 8, it.ty * 16 + 8, '#c08050', 10, 50);
    G.floater(it.tx * 16 + 8, it.ty * 16 - 6, `Minério! (${c.carry.length}/4)`, '#ffd080');
    P.train('ferraria', 1.2);
    return true;
  },
  unload() {
    const c = this.cur, G = Game, P = G.player, L = G.level;
    if (!c || c.kind !== 'mine') return G.toast('Um carrinho de mina cheio de pedras.', '#c0c0c0');
    if (!c.carry.length) return G.toast('Você não está carregando minério. Quebre um veio primeiro.', '#c0c0c0');
    const n = c.carry.length;
    for (const o of c.carry) if (Math.random() < 0.35) { const h = OBJ_DEFS[o].harvest; if (h) P.addItem(Items.make(h.item, 1), true); }
    c.carry = []; c.done += n;
    G.burst(L.cart.x * 16 + 8, L.cart.y * 16 + 6, '#a08060', 12, 40); Sfx.play('mine');
    G.floater(L.cart.x * 16 + 8, L.cart.y * 16 - 8, `+${n} no carrinho (${Math.min(c.done, c.quota)}/${c.quota})`, '#ffd040');
    if (c.done >= c.quota) G.later(1, () => this.cur === c && this.finish('O carrinho está cheio!'));
  },

  // ---------- Interações ----------
  findInteract(fx, fy) {
    const c = this.cur, G = Game, L = G.level, P = G.player;
    let best = null, bd = 24;
    const consider = (x, y, o) => { const d = dist(fx, fy, x, y); if (d < bd) { bd = d; best = Object.assign({ kind: 'work', d }, o); } };
    if (L.isWorld) {
      for (const s of this.minesNear(P.x / 16, P.y / 16)) consider(s._mine.x * 16 + 8, (s._mine.y + 1) * 16, { act: 'mine', s, label: 'Entrar', name: `Mina de ${s.name}` });
      if (c && c.kind === 'farm') for (const p of c.plots) {
        if (p.stage === 2 || p.stage === 4) continue;
        consider(p.x * 16 + 8, p.y * 16 + 8, { act: 'farm', p, label: ['Plantar', 'Regar', '', 'Colher'][p.stage], name: ['Canteiro arado', 'Sementes plantadas', '', 'Trigo maduro'][p.stage] });
      }
    }
    if (c && c.kind === 'tavern' && L === c.level) {
      const total = c.carry.length;
      for (let ty = Math.floor(P.y / 16) - 2; ty <= Math.floor(P.y / 16) + 1; ty++) for (let tx = Math.floor(P.x / 16) - 1; tx <= Math.floor(P.x / 16) + 1; tx++) {
        const o = L.objAt(tx, ty);
        if (o === O.KEG) consider(tx * 16 + 8, ty * 16 + 10, { act: 'beer', label: total >= 3 ? 'Mãos cheias' : 'Encher caneca', name: `Barril de cerveja (${total}/3)` });
        if (o === O.FIREPLACE) consider(tx * 16 + 8, ty * 16 + 10, { act: 'stew', label: total >= 3 ? 'Mãos cheias' : 'Pegar ensopado', name: `Caldeirão de ensopado (${total}/3)` });
      }
    }
    return best;
  },
  interact(it) {
    const c = this.cur, G = Game;
    if (it.act === 'mine') {
      if ((c && c.kind === 'mine' && c.s === it.s) || (G.player.job && G.player.job.id === 'minerador')) return this.enterMine(it.s);
      return G.toast('A mina é dos mineiros da vila. Peça emprego de Minerador no ferreiro para trabalhar aqui.', '#ffb080');
    }
    if (it.act === 'farm') return this.farmAct(it.p);
    if (it.act === 'beer' || it.act === 'stew') {
      if (c.carry.length >= 3) return G.toast('Suas mãos estão cheias! Leve os pedidos até as mesas.', '#ffb080');
      c.carry.push(it.act); Sfx.play(it.act === 'beer' ? 'drink' : 'pickup');
      G.floater(G.player.x, G.player.y - 28, it.act === 'beer' ? '+1 caneca' : '+1 ensopado', '#ffe0a0');
    }
  },
  minesNear(x, y) {
    const out = [];
    for (const s of Game.world.settlements) { if (Math.abs(s.mid.x - x) > 80 || Math.abs(s.mid.y - y) > 80 || !this.hasMine(s)) continue; if (this.mineOf(s)) out.push(s); }
    return out;
  },

  // ---------- Fim do turno e pagamento ----------
  finish(reason) {
    const c = this.cur; if (!c) return;
    this.cur = null;
    const G = Game, P = G.player, J = JOBS[c.id], job = P.job;
    const frac = Math.min(1, c.done / c.quota);
    const pay = Math.round(G.jobPay(c.id) * 1.4 * frac) + c.tips;
    P.gold += pay;
    if (frac > 0) P.train(J.skill, 2 + 6 * frac);
    if (c.custs) for (const a of c.custs) { a.dead = true; a.deadT = 10; }
    G.actors = G.actors.filter(a => !a.workCust);
    let promo = '';
    if (job && job.id === c.id && frac >= 0.5) {
      const r0 = G.jobRank(job); job.shifts++; const r1 = G.jobRank(job);
      if (r1 > r0) { promo = JOB_RANKS[r1][0]; G.chron(`Fui promovido(a) a ${promo} como ${J.name} em ${c.s.name}.`); }
    }
    Sfx.play(pay > 0 ? 'coin' : 'fail');
    G.centerMsg(promo ? 'PROMOÇÃO!' : 'FIM DO TURNO', `${reason} ${Math.min(c.done, c.quota)}/${c.quota} ${ACTIVE_JOBS[c.id].unit} • +${pay} ouro${c.tips ? ` (${c.tips} de gorjetas)` : ''}${promo ? ` • Agora você é ${promo}` : ''}`);
    if (promo) Sfx.play('levelup');
  },
  target() {
    const c = this.cur; if (!c) return null;
    if (c.kind === 'farm') { const p = c.plots.find(p => p.stage !== 4) || c.plots[0]; return p ? { x: p.x, y: p.y, name: 'Plantação' } : null; }
    if (c.kind === 'mine' && !Game.level.isMine) return { x: c.mine.x, y: c.mine.y + 1, name: 'Mina' };
    return null;
  },
  trackerText() {
    const c = this.cur, J = JOBS[c.id], m = Math.max(0, Math.ceil(c.t)), tm = `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
    let carry = '';
    if (c.kind === 'tavern' && c.carry.length) carry = ` • levando ${c.carry.map(k => k === 'beer' ? '🍺' : '🍲').join('')}`;
    if (c.kind === 'mine' && c.carry.length) carry = ` • ${c.carry.length} minério(s)`;
    const hint = c.kind === 'farm' ? (c.started ? 'Plante, regue e colha' : 'Vá até a plantação') : c.kind === 'mine' ? (Game.level.isMine ? 'Quebre veios e leve ao carrinho' : 'Vá até a mina') : 'Sirva as mesas';
    return `<b class="gold">💼 ${esc(J.name)}</b> ${tm}<br><small>${Math.min(c.done, c.quota)}/${c.quota} ${ACTIVE_JOBS[c.id].unit}${carry}<br>${hint}</small>`;
  },

  // ---------- Desenho ----------
  drawGround(ctx, camX, camY) {
    const c = this.cur; if (!c || c.kind !== 'farm' || !Game.level.isWorld) return;
    for (const p of c.plots) {
      const x = p.x * 16 - camX, y = p.y * 16 - camY;
      if (x < -20 || y < -40 || x > Game.vw + 20 || y > Game.vh + 20) continue;
      ctx.fillStyle = p.stage === 2 || p.stage === 3 ? '#4a2e18' : '#6a4626'; ctx.fillRect(x + 1, y + 2, 14, 13);
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; for (let k = 4; k < 15; k += 4) ctx.fillRect(x + 1, y + k, 14, 1);
      if (p.stage === 1) { ctx.fillStyle = '#d8c080'; for (let k = 0; k < 6; k++) ctx.fillRect(x + 3 + (k % 3) * 4, y + 5 + Math.floor(k / 3) * 5, 1, 1); }
      if (p.stage === 2 || p.stage === 3) {
        const g = p.stage === 3 ? 1 : p.g / p.need, hgt = Math.max(1, Math.round(2 + g * 9));
        for (let k = 0; k < 6; k++) {
          const sx = x + 3 + (k % 3) * 4, sy = y + 7 + Math.floor(k / 3) * 5, sway = Math.round(Math.sin(Game.t * 2 + k) * (g > 0.6 ? 1 : 0));
          ctx.fillStyle = p.stage === 3 ? '#c8a030' : g > 0.6 ? '#7aa83a' : '#5aa040'; ctx.fillRect(sx + sway, sy - hgt, 1, hgt);
          if (p.stage === 3) { ctx.fillStyle = '#f0d050'; ctx.fillRect(sx - 1 + sway, sy - hgt - 2, 3, 3); }
          else if (g > 0.3) { ctx.fillStyle = '#8ad050'; ctx.fillRect(sx - 1 + sway, sy - hgt + 1, 1, 1); ctx.fillRect(sx + 1 + sway, sy - hgt + 2, 1, 1); }
        }
      }
      if (p.stage === 4) { ctx.fillStyle = '#a08040'; for (let k = 0; k < 6; k++) ctx.fillRect(x + 3 + (k % 3) * 4, y + 6 + Math.floor(k / 3) * 5, 1, 2); }
      if (p.stage === 0 || p.stage === 1 || p.stage === 3) { const by = y - 8 + Math.sin(Game.t * 4 + p.x) * 2; ctx.fillStyle = p.stage === 3 ? '#ffd040' : p.stage === 1 ? '#80c0ff' : '#c0ff90'; ctx.fillRect(Math.round(x + 7), Math.round(by), 2, 3); ctx.fillRect(Math.round(x + 6), Math.round(by + 3), 4, 1); }
    }
  },
  drawables(D, camX, camY, vw, vh) {
    if (!Game.level.isWorld) return;
    for (const s of this.minesNear((camX + vw / 2) / 16, (camY + vh / 2) / 16)) {
      const m = s._mine, x = m.x * 16 + 8 - 24, y = (m.y + 1) * 16 - 40;
      if (x - camX < -60 || y - camY < -60 || x - camX > vw + 10 || y - camY > vh + 10) continue;
      D.push({ y: (m.y + 1) * 16, img: this.mineImg(), x, yy: y });
    }
  },
  mineImg() {
    if (this._mineImg) return this._mineImg;
    const c = Sprites.cv(48, 44), x = c.getContext('2d'), p = Sprites.P(x);
    // morro de pedra com a boca do túnel escorada
    Sprites.ellipse(p, 24, 28, 23, 15, '#6a6660'); Sprites.ellipse(p, 24, 26, 20, 12, '#7e7a72'); Sprites.ellipse(p, 18, 20, 7, 4, '#8e8a82');
    for (let i = 0; i < 12; i++) p(4 + (i * 17) % 40, 18 + (i * 11) % 18, '#5a5650', 2, 1);
    p(15, 22, '#0c0a0c', 18, 18); p(17, 20, '#0c0a0c', 14, 2);
    p(13, 20, '#6a4422', 3, 21); p(32, 20, '#6a4422', 3, 21); p(12, 17, '#7a5028', 24, 4); p(12, 17, '#9a6a38', 24, 1);
    p(13, 20, '#8a5a30', 1, 21); p(32, 20, '#8a5a30', 1, 21);
    p(19, 40, '#5a3a1a', 10, 2); p(18, 38, '#6a6a72', 1, 6); p(29, 38, '#6a6a72', 1, 6);
    p(36, 30, '#5a3a1a', 2, 10); p(33, 28, '#c8a060', 10, 5); p(34, 29, '#3a2410', 8, 1); p(34, 31, '#3a2410', 6, 1);
    p(6, 34, '#5a5a62', 7, 4); p(7, 33, '#8a6a50', 2, 2); p(10, 33, '#8a6a50', 2, 1);
    Sprites.outline(c, '#120c10');
    return (this._mineImg = c);
  },
  drawOverlay(ctx, camX, camY) {
    const c = this.cur, G = Game, P = G.player; if (!c) return;
    if (c.kind === 'tavern' && G.level === c.level) {
      for (const a of c.custs) {
        const w = a.workCust; if (w.state !== 'wait') continue;
        const x = Math.round(a.x - camX), y = Math.round(a.y - camY - a.h - 12), k = w.pat / w.max;
        ctx.fillStyle = '#10080c'; ctx.fillRect(x - 8, y - 6, 16, 15); ctx.fillStyle = '#f8f0e0'; ctx.fillRect(x - 7, y - 5, 14, 13); ctx.fillRect(x - 1, y + 8, 3, 2);
        ctx.drawImage(this.icon(TAVERN_ORDERS[w.order].icon), x - 5, y - 4);
        ctx.fillStyle = '#10080c'; ctx.fillRect(x - 8, y + 11, 16, 3); ctx.fillStyle = k > 0.5 ? '#60d060' : k > 0.25 ? '#e0c040' : '#e04040'; ctx.fillRect(x - 7, y + 12, Math.round(14 * k), 1);
      }
    }
    // o que o jogador carrega nas mãos
    if (c.carry.length && (c.kind === 'tavern' || G.level.isMine)) {
      c.carry.forEach((k, i) => { const ic = this.icon(c.kind === 'mine' ? 'ore' : TAVERN_ORDERS[k].icon); ctx.drawImage(ic, Math.round(P.x - camX - c.carry.length * 5 + i * 10), Math.round(P.y - camY - P.h - 12 + Math.sin(G.t * 6 + i) * 1)); });
    }
  }
};
