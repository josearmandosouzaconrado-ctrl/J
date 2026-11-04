'use strict';
// =====================================================================
//  CARAVANAS DE COMÉRCIO escoltadas pelas estradas, missões de escolta das guildas
//  e NAVIOS MERCANTES navegando entre os portos
// =====================================================================
const CARGAS = ['sal', 'vinho', 'trigo', 'tecidos', 'especiarias', 'ferro', 'cerâmica', 'peles'];
const NOMES_ESCOLTA = ['Lia', 'Bran', 'Tessa', 'Rurik', 'Mira', 'Odo', 'Yara', 'Gunnar', 'Sela', 'Doran'];

const Caravanas = {
  C: null, alvo: false,
  look(i) { return Object.assign({}, ENEMIES.guarda.look, { body: ['#6a5a40', '#5a4a3a', '#4a5a4a'][i % 3], helm: '#8a8a8a', shield: '#7a5a2a', legs: '#3a3028' }); },
  // ---------- nascer ----------
  tick(dt) {
    const G = Game, P = G.player, W = G.world; if (!P || !W || !G.level) return;
    if (!G.level.isWorld) { if (this.C) this.C = null; return; }
    const C = this.C;
    if (C && !G.actors.includes(C.mercador)) this.C = null;   // trocou de mapa: a caravana ficou para trás
    if (this.C) { this.mover(this.C, dt); return; }
    this.tT = (this.tT || 0) - dt; if (this.tT > 0) return; this.tT = 3;
    const ptx = Math.floor(P.x / 16), pty = Math.floor(P.y / 16);
    if (W.settlementAt(ptx, pty) || G.distEstrada(ptx, pty) > 6) return;
    if (Math.random() > (this.alvo ? 0.45 : 0.12)) return;
    for (let k = 0; k < 24; k++) {
      const a = Math.random() * Math.PI * 2, r = 16 + Math.random() * 10, tx = Math.round(ptx + Math.cos(a) * r), ty = Math.round(pty + Math.sin(a) * r);
      if (W.tileAt(tx, ty) !== T.ROAD || W.solidAt(tx, ty) || W.settlementAt(tx, ty)) continue;
      const dest = this.destino(tx, ty, 40); if (!dest) return;
      this.criar(tx, ty, dest, {});
      return;
    }
  },
  destino(tx, ty, min) {
    const W = Game.world, c = contAt(tx, ty);
    const ok = W.settlements.filter(s => !s.pirata && !s.region.neutral && !s.isolatedLayout && contAt(s.mid.x, s.mid.y) === c && dist(s.mid.x, s.mid.y, tx, ty) > min && dist(s.mid.x, s.mid.y, tx, ty) < 320);
    if (!ok.length) return null;
    ok.sort((a, b) => dist(a.mid.x, a.mid.y, tx, ty) - dist(b.mid.x, b.mid.y, tx, ty));
    return ok[Math.floor(Math.random() * Math.min(4, ok.length))];
  },
  criar(tx, ty, dest, o) {
    const G = Game, P = G.player, rng = new RNG(Math.floor(Math.random() * 1e9));
    const C = { x: tx * 16 + 8, y: ty * 16 + 8, alvoT: null, dest, trail: [], visit: new Map(), passo: 0, carga: rng.pick(CARGAS), escolta: !!o.escolta, guilda: o.guilda || null, premio: o.premio || 0, embT: 18 + Math.random() * 15, guardas: [], ang: 0, f: 0 };
    for (let i = 0; i < 40; i++) C.trail.push({ x: C.x, y: C.y });
    const s = G.world.nearestSettlement(tx, ty) || dest;
    const m = new NPC({ role: 'merchant', x: tx, y: ty }, s, rng);
    m.name = 'Mercador ' + m.name.split(' ')[0]; m.caravana = C; m.look = Object.assign({}, m.look, { hat: 'wide', hatC: '#6a4a2a' }); m.S = Sprites.actor(m.look); m.h = m.S.h;
    G.actors.push(m); C.mercador = m;
    const lvl = Math.max(6, P.level);
    const n = 2 + (Math.random() < 0.5 ? 1 : 0);
    for (let i = 0; i < n; i++) C.guardas.push(this.guarda(C, this.look(i), 'Escolta da Caravana', lvl));
    // na missão da guilda, outros membros vão junto
    if (o.guilda) for (let i = 0; i < 2; i++) { const nm = rng.pick(NOMES_ESCOLTA); C.guardas.push(this.guarda(C, Object.assign({}, ENEMIES.bandido.look, { hood: undefined, body: rng.pick(['#3a5a8a', '#8a3a3a', '#3a7a4a']), cape: rng.pick(['#2a2a4a', '#4a2a1a']), weapon: rng.pick(['sword', 'axe', 'spear']), wc: '#c0c0c8', helm: rng.chance(0.5) ? '#9098a0' : undefined }), `${nm} (${GUILDS[o.guilda] ? GUILDS[o.guilda].name.split(' ').slice(-1)[0] : 'guilda'})`, lvl)); }
    this.C = C;
    return C;
  },
  guarda(C, look, name, lvl) {
    const m = new Monster('guarda', C.x, C.y, lvl, { look, name, hpMul: 0.6, dmgMul: 0.7 });
    m.caravana = C; Game.findFree(m); m.home = { x: m.x, y: m.y };
    Game.actors.push(m); return m;
  },
  // ---------- andar pela estrada ----------
  atras(C, d) {
    const T_ = C.trail; let acc = 0, px = C.x, py = C.y;
    for (let i = T_.length - 1; i >= 0; i--) { const q = T_[i], s = dist(px, py, q.x, q.y); if (acc + s >= d) { const k = (d - acc) / Math.max(1e-3, s); return { x: px + (q.x - px) * k, y: py + (q.y - py) * k }; } acc += s; px = q.x; py = q.y; }
    return { x: px, y: py };
  },
  proximo(C) {
    const W = Game.world, tx = Math.floor(C.x / 16), ty = Math.floor(C.y / 16), dx0 = C.dest.mid.x, dy0 = C.dest.mid.y;
    let best = null, bs = Infinity;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const x = tx + dx, y = ty + dy; if (W.solidAt(x, y) || TWATER[W.tileAt(x, y)]) continue;
      const estrada = W.tileAt(x, y) === T.ROAD || W.settlementAt(x, y);
      const v = C.visit.get(x * 100000 + y) || 0;
      const s = dist(x, y, dx0, dy0) + (estrada ? 0 : 6) + v * 9 + (dx && dy ? 0.4 : 0);
      if (s < bs) { bs = s; best = { x: x * 16 + 8, y: y * 16 + 8 }; }
    }
    C.visit.set(tx * 100000 + ty, (C.visit.get(tx * 100000 + ty) || 0) + 1);
    if (C.visit.size > 400) C.visit.clear();
    return best;
  },
  inimigos(C) { for (const a of Game.actors) if (a.team === 'enemy' && !a.dead && !a.passive && dist(a.x, a.y, C.x, C.y) < 190) return true; return false; },
  mover(C, dt) {
    const G = Game, P = G.player;
    if (dist(C.x, C.y, P.x, P.y) > 1300 && !C.escolta) return this.sumir(C);
    const vivos = C.guardas.filter(g => !g.dead);
    C.parado = this.inimigos(C) || C.assaltada;
    if (C.assaltada) {
      if (!vivos.length && !C.saque) this.saquear(C);
    } else if (C.escolta && !vivos.length && C.parado) return this.falhou(C);
    if (C.chegou) { C.fimT -= dt; if (C.fimT <= 0) this.sumir(C); return; }
    if (!C.parado) {
      if (!C.alvoT || dist(C.x, C.y, C.alvoT.x, C.alvoT.y) < 3) C.alvoT = this.proximo(C);
      if (C.alvoT) {
        const a = Math.atan2(C.alvoT.y - C.y, C.alvoT.x - C.x), v = 30 * dt;
        C.x += Math.cos(a) * v; C.y += Math.sin(a) * v; C.ang = a; C.f += dt;
        const u = C.trail[C.trail.length - 1]; if (dist(u.x, u.y, C.x, C.y) > 4) { C.trail.push({ x: C.x, y: C.y }); if (C.trail.length > 60) C.trail.shift(); }
      }
      // emboscada na missão de escolta
      if (C.escolta) { C.embT -= dt; if (C.embT <= 0) { C.embT = 30 + Math.random() * 25; if (Math.random() < 0.55) this.emboscada(C); } }
      if (dist(C.x / 16, C.y / 16, C.dest.mid.x, C.dest.mid.y) < 9) this.chegada(C);
    }
    // cada um no seu lugar da fila
    const slots = [0, 46, 74, 92, 108, 122];
    let i = 0;
    for (const g of C.guardas) { const q = this.atras(C, slots[i === 0 ? 0 : i + 2] || 120); g.home = { x: q.x + (i % 2 ? 7 : -7) * (i ? 1 : 0), y: q.y }; i++; }
    C.cart = this.atras(C, 28);
    if (!C.fugiu) { const q = this.atras(C, 14); C.mercador.home = { x: q.x, y: q.y - 9 }; }
  },
  emboscada(C) {
    const G = Game, P = G.player, n = 2 + Math.floor(Math.random() * 3), base = C.ang + (Math.random() - 0.5) * 1.2;
    for (let i = 0; i < n; i++) {
      const r = 130 + Math.random() * 40, a = base + (Math.random() - 0.5) * 0.8;
      const m = new Monster(i % 3 === 2 ? 'bandido_arqueiro' : 'bandido', C.x + Math.cos(a) * r, C.y + Math.sin(a) * r, Math.max(4, P.level), { name: 'Salteador' });
      if (collides(G.world, m.x, m.y, m.r)) G.findFree(m);
      m.aggro = 320; m.provoked = P; G.actors.push(m);
    }
    G.centerMsg('EMBOSCADA!', 'Salteadores atacam a caravana!'); Sfx.play('shout');
  },
  chegada(C) {
    const P = Game.player;
    C.chegou = true; C.fimT = 6;
    if (!C.escolta) return;
    const g = C.premio || (250 + P.level * 25);
    P.gold += g; P.addXP(150 + P.level * 10); Vida.honra(2); Sfx.play('quest');
    if (C.guilda && P.guilds[C.guilda]) P.guilds[C.guilda].rep = (P.guilds[C.guilda].rep || 0) + 12;
    Game.centerMsg('ESCOLTA CONCLUÍDA!', `A caravana chegou a ${C.dest.name} • +${g} de ouro`);
    Game.chron(`Escoltei uma caravana de ${C.carga} até ${C.dest.name}.`);
    C.escolta = false;
  },
  falhou(C) {
    Game.centerMsg('A CARAVANA CAIU', 'Os salteadores levaram a carga...'); Game.chron(`Falhei em proteger a caravana de ${C.carga}.`);
    C.escolta = false; C.mercador.caravana = null; this.sumir(C, true);
  },
  sumir(C, ficaMercador) {
    const set = new Set(C.guardas.filter(g => !g.dead)); if (!ficaMercador) set.add(C.mercador);
    Game.actors = Game.actors.filter(a => !set.has(a));
    if (this.C === C) this.C = null;
  },
  // ---------- assaltar ----------
  assaltar(C) {
    const P = Game.player;
    C.assaltada = true; C.escolta = false; C.fugiu = true;
    for (const g of C.guardas) { g.team = 'enemy'; g.provoked = P; g.target = P; g.aggro = 400; g.name = 'Escolta furiosa'; }
    const m = C.mercador, a = Math.atan2(m.y - P.y, m.x - P.x); m.home = { x: m.x + Math.cos(a) * 400, y: m.y + Math.sin(a) * 400 };
    Vida.honra(-6, 'assaltei uma caravana'); const E = Eventos.state(); E.procurado = (E.procurado || 0) + 1;
    Game.centerMsg('ASSALTO!', 'Derrote a escolta e leve a carga!'); Sfx.play('shout');
  },
  saquear(C) {
    const P = Game.player; C.saque = true;
    const g = 180 + Math.floor(Math.random() * 320) + P.level * 10; P.gold += g;
    const itens = [];
    for (let i = 0; i < 2 + Math.floor(Math.random() * 2); i++) { const id = SAQUE_ITENS[Math.floor(Math.random() * SAQUE_ITENS.length)]; P.addItem(Items.make(id, 1)); itens.push(ITEMS[id].name); }
    Sfx.play('coin');
    Game.centerMsg('A CARAVANA FOI SAQUEADA', `+${g} de ouro • ${itens.join(', ')}`);
    Game.chron(`Assaltei uma caravana de ${C.carga}.`);
    const B = P.bandidos; if (B && B.missao && B.missao.tipo === 'caravana') { B.missao.feito = true; Game.toast('Missão dos Corvos cumprida! Volte ao esconderijo.', '#ffd080'); }
    this.alvo = false;
    C.chegou = true; C.fimT = 20;
  },
  // ---------- conversa com o mercador ----------
  falar(a) {
    const P = Game.player, C = a.caravana;
    if (!C || C.assaltada) return UI.dialog(a.name, a.look, 'Socorro! Alguém nos ajude!', [{ label: 'Sair' }]);
    const premio = 220 + P.level * 22;
    const o = [];
    o.push({ label: '🛒 Ver as mercadorias', fn: () => { UI.close(); UI.shop({ name: 'Caravana', settlement: C.dest, tx: 7, ty: Math.floor(C.y / 16), role: 'general' }, 'stall'); } });
    if (!C.escolta && !C.chegou) o.push({ label: `🛡 Escoltar até ${C.dest.name} (${premio} ouro)`, cls: 'gold', fn: () => { C.escolta = true; C.premio = premio; UI.close(); Game.toast(`Escolte a caravana até ${C.dest.name}. Cuidado com emboscadas!`, '#ffd080'); } });
    const B = P.bandidos, missao = B && B.missao && B.missao.tipo === 'caravana';
    o.push({ label: missao ? '🗡 Assaltar a caravana! (missão dos Corvos)' : '🗡 Assaltar a caravana', cls: 'danger', fn: () => UI.confirm('Assaltar a caravana? A escolta vai lutar e você será procurado(a).', () => { UI.close(); this.assaltar(C); }) });
    o.push({ label: 'Boa viagem' });
    UI.dialog(a.name, a.look, `Levamos <b>${esc(C.carga)}</b> para <b>${esc(C.dest.name)}</b>.${C.escolta ? ' <span class="good">Com você na escolta me sinto mais seguro!</span>' : ' As estradas andam cheias de bandidos...'}`, o);
  },
  // missão de escolta pedida na guilda
  missaoGuilda(b) {
    const P = Game.player, s = b.settlement, gid = b.guild;
    if (this.C && this.C.escolta) return Game.toast('Você já está escoltando uma caravana.', '#ff8080');
    const dest = this.destino(s.mid.x, s.mid.y, 45); if (!dest) return Game.toast('Nenhuma caravana sai daqui hoje.', '#ffb080');
    const W = Game.world;
    let ini = null;
    for (const g of s.gates) { for (let r = 2; r < 12 && !ini; r++) { const x = g.x + (g.dir === 'w' ? -r : g.dir === 'e' ? r : 0), y = g.y + (g.dir === 'n' ? -r : g.dir === 's' ? r : 0); if (!W.solidAt(x, y) && !W.settlementAt(x, y)) ini = { x, y }; } if (ini) break; }
    if (!ini) ini = { x: s.mid.x, y: s.y0 + s.h + 2 };
    const premio = 320 + P.level * 30;
    UI.close();
    this.C = null;
    const C = this.criar(ini.x, ini.y, dest, { escolta: true, guilda: gid, premio });
    P.x = C.x - 30; P.y = C.y + 10; Game.findFree(P); UI.fade();
    Game.centerMsg('MISSÃO DE ESCOLTA', `Leve a caravana de ${C.carga} até ${dest.name} • ${premio} de ouro`);
    Game.track = null;
  },
  // ---------- desenho ----------
  drawables(D, camX, camY, vw, vh) {
    const C = this.C; if (!C || !C.cart) return;
    const q = C.cart; if (q.x < camX - 60 || q.x > camX + vw + 60 || q.y < camY - 60 || q.y > camY + vh + 60) return;
    const esq = Math.cos(C.ang) < 0, f = C.parado || C.chegou ? 0 : Math.floor(C.f * 6) % 3;
    const cart = Sprites.cart()[esq ? 'left' : 'right'][f], H = Sprites.horse('cavalo')[esq ? 'left' : 'right'][C.parado ? 0 : 1 + (Math.floor(C.f * 6) % 2)];
    D.push({ y: q.y + 6, fn: (ctx) => {
      const x = Math.round(q.x - camX), y = Math.round(q.y - camY);
      ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x - 30, y + 4, 60, 3);
      const hx = esq ? x - 34 : x + 8;
      ctx.drawImage(H, hx, y - H.height + 6);
      const cx = esq ? x - 4 : x - 30;
      ctx.drawImage(cart, cx, y - cart.height + 8);
      // a carga coberta com lona
      ctx.fillStyle = '#c8b890'; ctx.fillRect(cx + 4, y - 18, 24, 6); ctx.fillStyle = '#a89870'; ctx.fillRect(cx + 4, y - 13, 24, 1);
      ctx.fillStyle = '#8a6a3a'; ctx.fillRect(cx + 6, y - 21, 7, 4); ctx.fillRect(cx + 17, y - 22, 8, 5);
      if (C.saque) { ctx.fillStyle = '#3a2a1a'; ctx.fillRect(cx + 2, y - 14, 30, 2); }
    } });
  },
  drawMap(ctx, toS) {
    const C = this.C; ctx.font = '12px VT323, monospace';
    if (C) { const [x, y] = toS(C.x / 16, C.y / 16); ctx.fillStyle = '#000'; ctx.fillText('💰', x - 5, y + 5); }
    for (const n of Mercantes.lista) { if (!n.rota) continue; const [x, y] = toS(n.x / 16, n.y / 16); ctx.fillStyle = '#000'; ctx.fillRect(x - 2, y - 2, 5, 5); ctx.fillStyle = '#ffd040'; ctx.fillRect(x - 1, y - 1, 3, 3); }
  }
};

// ---------------- navios mercantes entre os portos ----------------
const Mercantes = {
  lista: [], T: 0,
  tick(dt) {
    const W = Game.world; if (!W || !W.ports || W.ports.length < 2) return;
    if (this.seed !== W.seed) { this.seed = W.seed; this.lista = []; for (let i = 0; i < 8; i++) this.lista.push({ id: i, de: W.ports[(i * 5) % W.ports.length], nome: NOMES_NAVIO[i % NOMES_NAVIO.length], cor: ['#c8a060', '#a06040', '#e0d0b0', '#6a8ab0'][i % 4], i: 0, x: 0, y: 0, ang: 0 }); }
    // as rotas são calculadas aos poucos, uma por vez
    this.T -= dt;
    if (this.T <= 0 && W.mapDone) {
      this.T = 1.5;
      const n = this.lista.find(n => !n.rota && !n.falhou);
      if (n) {
        const outros = W.ports.filter(p => p !== n.de);
        const para = outros[Math.floor(Math.random() * outros.length)];
        let r = null; try { r = Ship.route(n.de, para); } catch (e) { r = null; }
        if (r && r.length > 2) { n.rota = r; n.para = para; n.i = n.id === undefined ? 0 : Math.floor(Math.random() * (r.length - 1)) * (n.primeira ? 0 : 1); n.primeira = true; n.x = r[n.i].x; n.y = r[n.i].y; } else n.falhou = true;
      }
    }
    for (const n of this.lista) {
      if (!n.rota) continue;
      const q = n.rota[n.i + 1];
      if (!q) { n.de = n.para; n.rota = null; continue; }
      const d = dist(n.x, n.y, q.x, q.y), v = 75 * dt;
      if (d <= v) { n.x = q.x; n.y = q.y; n.i++; }
      else { n.ang = Math.atan2(q.y - n.y, q.x - n.x); n.x += Math.cos(n.ang) * v; n.y += Math.sin(n.ang) * v; }
    }
  },
  drawables(D, camX, camY, vw, vh) {
    for (const n of this.lista) {
      if (!n.rota || n.x < camX - 90 || n.x > camX + vw + 90 || n.y < camY - 90 || n.y > camY + vh + 90) continue;
      const img = Naval.sprite('galeao', n.cor, Math.floor(Game.t * 2) % 2);
      D.push({ y: n.y + 10, fn: (ctx) => { Naval.drawShip(ctx, img, n.x - camX, n.y + 12 - camY, { flip: Math.cos(n.ang) < 0, seed: n.id, moving: true }); ctx.font = '10px VT323, monospace'; ctx.fillStyle = '#000'; ctx.fillText('💰 ' + n.nome, Math.round(n.x - camX) - 21, Math.round(n.y - camY) - 33); ctx.fillStyle = '#ffe080'; ctx.fillText('💰 ' + n.nome, Math.round(n.x - camX) - 22, Math.round(n.y - camY) - 34); } });
    }
  }
};

// ---------------- ganchos ----------------
(function () {
  // quem anda com a caravana segue a fila (e luta quando há inimigos)
  const mu = Monster.prototype.update;
  Monster.prototype.update = function (dt) {
    const C = this.caravana;
    if (C && !C.parado && !this.dead && this.team !== 'enemy') {
      const h = this.home, d = dist(this.x, this.y, h.x, h.y);
      if (d > 3) { const a = Math.atan2(h.y - this.y, h.x - this.x), v = Math.min(this.spd * 1.2, d * 6) * dt; moveActor(this, Math.cos(a) * v, Math.sin(a) * v); this.moving = true; this.anim += dt; this.setDir(a); } else this.moving = false;
      if (this.hp < this.maxHp) this.hp = Math.min(this.maxHp, this.hp + this.maxHp * 0.02 * dt);
      return;
    }
    return mu.call(this, dt);
  };
  const nu = NPC.prototype.update;
  NPC.prototype.update = function (dt) {
    if (this.caravana && !(this.talkT > 0)) {
      const h = this.home, d = dist(this.x, this.y, h.x, h.y), C = this.caravana;
      this.moving = false;
      if ((!C.parado || C.fugiu) && d > 3) { const a = Math.atan2(h.y - this.y, h.x - this.x), v = Math.min(C.fugiu ? 70 : 40, d * 6) * dt; moveActor(this, Math.cos(a) * v, Math.sin(a) * v); this.moving = true; this.anim = (this.anim || 0) + dt; this.setDir(a); }
      return;
    }
    return nu.call(this, dt);
  };
  const t0 = UI.talkNPC;
  UI.talkNPC = function (a) { if (a.caravana) return Caravanas.falar(a); return t0.call(this, a); };
  // a guilda oferece a missão de escolta
  const g0 = UI.guild;
  UI.guild = function (b) { Caravanas._guilda = Game.player.guilds[b.guild] ? b : null; try { return g0.call(this, b); } finally { Caravanas._guilda = null; } };
  const d0 = UI.dialog;
  UI.dialog = function (name, look, html, opts, ...r) {
    const b = Caravanas._guilda;
    if (b && Array.isArray(opts)) { Caravanas._guilda = null; opts = opts.slice(); opts.splice(Math.max(0, opts.length - 1), 0, { label: '🐎 Missão: escoltar uma caravana (com outros membros)', cls: 'gold', fn: () => Caravanas.missaoGuilda(b) }); }
    return d0.call(this, name, look, html, opts, ...r);
  };
  const m0 = War.drawMap; War.drawMap = function (ctx, toS, z) { m0.call(this, ctx, toS, z); Caravanas.drawMap(ctx, toS); };
})();
