'use strict';
// =====================================================================
//  CARROÇA COM PASSAGEIROS (multiplayer)
//  Quem tem carroça atrela no cavalo, monta e conduz. Os outros jogadores
//  chegam perto da carroça e tocam em "Subir": vão sentados na carroça
//  enquanto o dono conduz. Para sair, toque em "Descer" (ou empurre o
//  controle com força para um lado e pule fora). Cabem 3 passageiros.
// =====================================================================
const CARROCA_LUGARES = 3;

const Carroca = {
  // a sua carroça atrelada e sendo conduzida (é isso que os outros veem)
  estado() {
    const P = Game.player, c = P && P.cart;
    if (!c || !c.hitched || !P.mounted || !Game.level || !Game.level.isWorld) return 0;
    return [Math.round(c.x), Math.round(c.y), c.dir === 'left' ? 1 : 0, c.moving ? 1 : 0];
  },
  // a carroça em que alguém está sentado
  daCarroca(id) {
    if (id === Rede.id) { const e = this.estado(); return e ? { x: e[0], y: e[1], dir: e[2] ? 'left' : 'right' } : null; }
    const o = Rede.outros.get(id); return o && o.carroca;
  },
  assento(c, i) {
    const tras = c.dir === 'left' ? 1 : -1;
    return { x: c.x + tras * 3 + (i - 1) * 6, y: c.y - 3 - (i % 2) };
  },
  // quem vai sentado na carroça de alguém, sempre na mesma ordem em todos os aparelhos
  passageiros(id) {
    const P = Game.player, l = [...Rede.outros.values()].filter(o => o.pas === id).map(o => o.id);
    if (P && P.passageiro && P.passageiro.id === id) l.push(Rede.id);
    return l.sort();
  },
  subir(o) {
    const P = Game.player;
    if (this.passageiros(o.id).length >= CARROCA_LUGARES) return Game.toast('A carroça está cheia!', '#ffb080');
    if (P.mounted) P.toggleMount();
    P.passageiro = { id: o.id, nome: o.nome };
    Sfx.play('horse'); Game.toast(`Você subiu na carroça de ${o.nome}. Toque em Descer para sair.`, '#ffe0a0');
    Rede.send({ t: 'chat', txt: '🛒 subiu na carroça' });
  },
  descer(msg) {
    const P = Game.player; if (!P.passageiro) return;
    P.passageiro = null; P.y += 16; Game.findFree(P);
    Game.toast(msg || 'Você desceu da carroça.', '#e0d0b0');
  },
  // o passageiro vai sentado no lugar dele
  segue(P, dt) {
    const c = this.daCarroca(P.passageiro.id);
    if (!c || !Rede.on || !Game.level.isWorld || P.dead) { this.descer('A carroça foi embora: você desceu.'); return; }
    const s = this.assento(c, Math.max(0, this.passageiros(P.passageiro.id).indexOf(Rede.id)));
    P.x = s.x; P.y = s.y; P.moving = false; P.dir = c.dir; P.lastH = c.dir;
    // pular fora: controle empurrado com força por um tempo
    if (Input.move.mag > 0.85) { this.pulo = (this.pulo || 0) + dt; if (this.pulo > 0.6) { this.pulo = 0; this.descer('Você pulou da carroça!'); } } else this.pulo = 0;
  },
  // desenha alguém sentado: só aparece da cintura para cima, dentro da carroça
  sentado(ctx, camX, camY, a, c, fn) {
    ctx.save();
    ctx.beginPath(); ctx.rect(-10000, -10000, 30000, 10000 + Math.round(c.y - 7 - camY)); ctx.clip();
    const y0 = a.y; a.y -= 5;
    try { fn(); } finally { a.y = y0; ctx.restore(); }
  },
  desenharCarroca(ctx, camX, camY, c, dono) {
    const C = Sprites.cart(), img = C[c.dir][c.moving ? 1 + (Math.floor(Game.t * 8) % 2) : 0];
    const x = Math.round(c.x - img.width / 2 - camX), y = Math.round(c.y - img.height + 2 - camY);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + 2, y + img.height - 3, img.width - 4, 3);
    ctx.drawImage(img, x, y);
    if (dono) { ctx.strokeStyle = '#5a3418'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(c.x + (c.dir === 'right' ? 15 : -15) - camX, c.y - 8 - camY); ctx.lineTo(dono.x - camX, dono.y - 10 - camY); ctx.stroke(); }
  }
};

// ---------------- ganchos ----------------
(function () {
  // o passageiro não anda sozinho: vai sentado
  const up0 = Player.prototype.update;
  Player.prototype.update = function (dt) {
    if (!this.passageiro) return up0.apply(this, arguments);
    const m = Input.move, x0 = m.x, y0 = m.y, g0 = m.mag;
    m.x = 0; m.y = 0; m.mag = 0;
    try { up0.apply(this, arguments); } finally { m.x = x0; m.y = y0; m.mag = g0; }
    Carroca.segue(this, dt);
  };
  const pd0 = Player.prototype.draw;
  Player.prototype.draw = function (ctx, camX, camY) {
    const c = this.passageiro && Carroca.daCarroca(this.passageiro.id);
    if (!c) return pd0.apply(this, arguments);
    Carroca.sentado(ctx, camX, camY, this, c, () => pd0.call(this, ctx, camX, camY));
  };
  // os outros jogadores: a carroça que eles conduzem e quem vai sentado nela
  const rd0 = Remoto.prototype.draw;
  Remoto.prototype.draw = function (ctx, camX, camY) {
    if (this.carroca && this.area === 'w') Carroca.desenharCarroca(ctx, camX, camY, this.carroca, this);
    const c = this.pas && Carroca.daCarroca(this.pas);
    if (!c) return rd0.apply(this, arguments);
    // o lugar dele na carroça (calculado aqui, para não ficar atrasado)
    this.lugar = Math.max(0, Carroca.passageiros(this.pas).indexOf(this.id));
    const s = Carroca.assento(c, this.lugar); this.x = s.x; this.y = s.y; this.dir = c.dir;
    Carroca.sentado(ctx, camX, camY, this, c, () => rd0.call(this, ctx, camX, camY));
  };
  // Subir / Descer
  const fi0 = Muralhas.findInteract;
  Muralhas.findInteract = function (fx, fy) {
    const P = Game.player;
    if (Game.mp && Rede.on && Game.level && Game.level.isWorld) {
      if (P.passageiro) return { kind: 'mar', label: 'Descer', name: `Carroça de ${P.passageiro.nome}`, d: 0, prio: 9, fn: () => Carroca.descer() };
      for (const o of Rede.outros.values()) if (o.carroca && o.area === 'w' && dist(P.x, P.y, o.carroca.x, o.carroca.y) < 26) return { kind: 'mar', label: 'Subir', name: `Carroça de ${o.nome}`, d: 1, prio: 5, fn: () => Carroca.subir(o) };
    }
    return fi0.apply(this, arguments);
  };
  // saiu da sala: desce da carroça
  const sa0 = Rede.sair; Rede.sair = function () { if (Game.player && Game.player.passageiro) Game.player.passageiro = null; return sa0.apply(this, arguments); };
  // o dono fica sabendo quando alguém sobe
  const cm0 = UI.cartMenu;
  UI.cartMenu = function () {
    const r = cm0.apply(this, arguments);
    if (Game.mp) { const t = document.querySelector('.dlg-text'); if (t) t.insertAdjacentHTML('beforeend', '<br><small class="dim">No multiplayer: atrele, monte e conduza; os amigos chegam perto e tocam em <b>Subir</b> para ir sentados na carroça.</small>'); }
    return r;
  };
})();
