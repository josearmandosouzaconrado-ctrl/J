'use strict';
// =====================================================================
//  COMER, BEBER E FICAR BÊBADO
//  • Animação: quem come leva a comida à boca (mastiga, caem farelos) e quem
//    bebe vira a caneca ou a garrafa. Vale para você e para os fregueses da
//    taverna, que bebem de vez em quando.
//  • Álcool (cerveja, hidromel, vinho): como na vida real, aos poucos.
//      alegre   → mais coragem (+10% de dano)
//      tonto    → a visão balança e o passo sai torto
//      bêbado   → visão dupla, soluço, tropeços, apanha mais e erra mais
//      apagou   → desmaia e acorda horas depois (pode acordar sem ouro)
//    O corpo vai limpando o álcool com o tempo; beber muito dá ressaca.
//    E o calor da bebida engana: no frio você perde calor mais rápido.
// =====================================================================
const ALCOOL = { cerveja: 15, hidromel: 22, vinho: 18 };
const FASES_ALCOOL = [[85, 'apagando', '#ff6060'], [55, 'bêbado(a)', '#ff9050'], [30, 'tonto(a)', '#ffc060'], [12, 'alegre', '#ffe090']];

const Bebida = {
  // ---------- animação de comer e beber ----------
  anim(a, tipo, icon) { a.consumo = { t0: Game.t, dur: tipo === 'beber' ? 1.1 : 1.4, tipo, icon, migalha: 0 }; },
  desenhar(ctx, a, camX, camY) {
    const c = a.consumo; if (!c) return;
    const k = (Game.t - c.t0) / c.dur;
    if (k >= 1 || k < 0) { a.consumo = null; return; }
    if (a.dir === 'up' || a.mounted) return;   // de costas não dá para ver
    const h = a.h || 24, lado = a.dir === 'left' ? -1 : a.dir === 'right' ? 1 : 0;
    // a mão sobe até a boca, fica um pouco e desce
    const sobe = k < 0.25 ? k / 0.25 : k > 0.82 ? (1 - k) / 0.18 : 1;
    const bx = a.x + lado * 5 + (lado ? 0 : 3), by = a.y - h * 0.32;
    const mx = a.x + lado * 4 + (lado ? 0 : 1), my = a.y - h * 0.62;
    let x = bx + (mx - bx) * sobe, y = by + (my - by) * sobe;
    const img = Sprites.icon(c.icon), s = 9;
    ctx.save();
    if (c.tipo === 'comer') {
      if (sobe >= 1) y += Math.round(Math.sin(Game.t * 22)) * 0.8;   // mastigando
      if (sobe >= 1 && Game.t - c.migalha > 0.14) { c.migalha = Game.t; Game.particle(x + (Math.random() - 0.5) * 4, y + 2, (Math.random() - 0.5) * 18, 10, '#d8b070', 0.45); }
      ctx.translate(Math.round(x - camX), Math.round(y - camY));
    } else {
      // vira a caneca: inclina até quase deitar
      const inc = sobe * (lado < 0 ? 1.1 : -1.1);
      ctx.translate(Math.round(x - camX), Math.round(y - camY)); ctx.rotate(inc);
      if (sobe >= 1 && Game.t - c.migalha > 0.25 && Math.random() < 0.5) { c.migalha = Game.t; Game.particle(x, y + 3, (Math.random() - 0.5) * 10, 16, c.icon && c.icon.c ? c.icon.c : '#e0a020', 0.35); }
    }
    ctx.drawImage(img, -s / 2, -s / 2, s, s);
    ctx.restore();
  },
  // ---------- o álcool ----------
  init(P) { if (P.alcool === undefined) P.alcool = 0; },
  fase(P = Game.player) { const v = (P && P.alcool) || 0; return FASES_ALCOOL.find(f => v >= f[0]) || null; },
  agora() { return Game.day * 1440 + Game.time; },
  beber(P, id) {
    this.init(P);
    const f0 = this.fase(P);
    P.alcool = Math.min(120, P.alcool + ALCOOL[id] * (RACES[P.race] && RACES[P.race].bulky ? 0.8 : 1));
    P.alcoolT = this.agora();
    const f = this.fase(P);
    if (f && f !== f0) {
      const msg = { 'alegre': '🍺 Você está alegre. A coragem subiu!', 'tonto(a)': '🍺 Você está ficando tonto(a)... o chão balança.', 'bêbado(a)': '🍺 Você está bêbado(a)! Hic!', 'apagando': '🍺 Você bebeu demais... as pernas não obedecem.' }[f[1]];
      Game.toast(msg, f[2]);
    }
    if (P.alcool >= 100 && !P.apagou) this.apagar(P);
  },
  apagar(P) {
    P.apagou = true;
    Game.centerMsg('VOCÊ APAGOU', 'Bebeu demais e caiu no chão...');
    UI.fade(); Sfx.play('hurt');
    setTimeout(() => {
      const casa = Game.curTown && P.houses && P.houses.includes(Game.curTown.id);
      Academy.passTime(5 * 60);
      P.alcool = 35; P.alcoolT = this.agora(); P.apagou = false; P.ressaca = this.agora() + 10 * 60;
      let roubo = 0;
      if (!casa && Math.random() < (Luto.brutal() ? 0.45 : 0.25)) { roubo = Math.floor(P.gold * 0.3); P.gold -= roubo; }
      Game.centerMsg('VOCÊ ACORDOU', roubo ? `Cinco horas depois, no chão... e sem ${roubo} de ouro na bolsa!` : 'Cinco horas depois, com a cabeça latejando.');
      Game.chron(roubo ? `Bebi até apagar e acordei sem ${roubo} de ouro.` : 'Bebi até apagar. Que dor de cabeça!');
      Vida.honra && Vida.honra(-1, 'caí de bêbado(a) na rua');
    }, 1500);
  },
  tick(dt) {
    const P = Game.player; if (!P || !P.alcool) return;
    const t = this.agora(), dm = Math.max(0, t - (P.alcoolT || t));
    if (dm >= 1) { P.alcool = Math.max(0, P.alcool - dm * 0.22); P.alcoolT = t; if (P.alcool === 0 && !P.ressaca) Game.toast('O efeito da bebida passou.', '#c8c8d8'); }
    // soluço
    if (P.alcool >= 45 && !P.dead && Math.random() < dt * 0.12) { Game.floater(P.x, P.y - (P.h || 24) - 6, 'HIC!', '#ffd0a0', 1); }
    // tropeção
    if (P.alcool >= 60 && !P.dead && !P.mounted && Input.move.mag > 0.3 && Math.random() < dt * 0.15) { Game.toast('Você tropeçou!', '#ffb080'); P.st = Math.max(0, P.st - 10); Game.shake = Math.max(Game.shake, 3); }
  },
  // a vontade de andar reto e o passo que sai torto
  desvio(P) {
    const v = P.alcool || 0; if (v < 30) return 0;
    const f = (v - 30) / 70;
    return Math.sin(Game.t * 1.3) * 0.7 * f + Math.sin(Game.t * 3.7 + 1) * 0.35 * f;
  },
  // ---------- ressaca ----------
  ressaca(P = Game.player) { return P && P.ressaca && this.agora() < P.ressaca; },
  hud() {
    const P = Game.player; if (!P) return '';
    const f = this.fase(P);
    let h = '';
    if (f) h += `<span class="need" title="álcool" style="width:auto;padding:0 3px;color:${f[2]}"><b>🍺</b>${f[1]}</span>`;
    if (this.ressaca(P)) h += `<span class="need" title="ressaca" style="width:auto;padding:0 3px;color:#c0a0ff"><b>🤕</b>ressaca</span>`;
    return h;
  }
};

// ---------------- ganchos ----------------
(function () {
  const tj0 = Player.prototype.toJSON;
  Player.prototype.toJSON = function () { const o = tj0.call(this); for (const k of ['alcool', 'alcoolT', 'ressaca']) if (this[k]) o[k] = this[k]; return o; };
  // comer e beber: a animação, e o álcool
  const ui0 = Player.prototype.useItem;
  Player.prototype.useItem = function (it) {
    const d = ITEMS[it.id], u = d && d.use, n0 = this.inv.length, c0 = it.n;
    const comida = u && !d.slot && (d.type === 'food' || d.type === 'potion') && !u.camp && !u.vila && !u.treasure;
    const r = ui0.call(this, it);
    if (comida && (this.inv.length !== n0 || it.n !== c0)) {
      const beber = d.type === 'potion' || (d.icon && (d.icon.k === 'bottle' || d.icon.k === 'potion'));
      Bebida.anim(this, beber ? 'beber' : 'comer', d.icon);
      if (ALCOOL[it.id]) Bebida.beber(this, it.id);
      if (this.ressaca && it.id === 'agua') this.ressaca -= 120;   // água ajuda a ressaca a passar
    }
    return r;
  };
  // beber da fonte ou do poço
  const vb0 = Vida.beber; Vida.beber = function () { const r = vb0.apply(this, arguments); Bebida.anim(Game.player, 'beber', { k: 'bottle', c: '#5090e0' }); return r; };
  // desenhar a mão com a comida
  const pd0 = Player.prototype.draw; Player.prototype.draw = function (ctx, camX, camY) { pd0.apply(this, arguments); Bebida.desenhar(ctx, this, camX, camY); };
  const nd0 = NPC.prototype.draw;
  NPC.prototype.draw = function (ctx, camX, camY) {
    const r = nd0.apply(this, arguments);
    // os fregueses da taverna bebem de vez em quando
    if (this.role === 'patron' && !this.consumo && !this.moving) {
      if (!this._bebT) this._bebT = Game.t + Math.random() * 6;
      if (Game.t > this._bebT) { this._bebT = Game.t + 5 + Math.random() * 9; Bebida.anim(this, Math.random() < 0.8 ? 'beber' : 'comer', Math.random() < 0.8 ? { k: 'bottle', c: '#e0a020' } : { k: 'bread', c: '#c8903a' }); }
    }
    Bebida.desenhar(ctx, this, camX, camY);
    return r;
  };
  // o passo torto
  const up0 = Player.prototype.update;
  Player.prototype.update = function (dt) {
    const m = Input.move, a = Bebida.desvio(this);
    if (!a || m.mag < 0.12) return up0.apply(this, arguments);
    const x0 = m.x, y0 = m.y, c = Math.cos(a), s = Math.sin(a);
    m.x = x0 * c - y0 * s; m.y = x0 * s + y0 * c;
    try { return up0.apply(this, arguments); } finally { m.x = x0; m.y = y0; }
  };
  // a visão que balança e fica dupla
  const r0 = Game.render;
  Game.render = function () {
    const P = this.player, v = (P && P.alcool) || 0;
    if (v < 30 || !this.level) return r0.apply(this, arguments);
    const f = Math.min(1, (v - 30) / 60), ox = Math.sin(this.t * 0.9) * 4 * f, oy = Math.sin(this.t * 1.4) * 2 * f;
    this.camX += ox; this.camY += oy;
    let r;
    try { r = r0.apply(this, arguments); } finally { this.camX -= ox; this.camY -= oy; }
    if (v >= 55) {
      const ctx = this.ctx, d = Math.round(2 + Math.sin(this.t * 1.1) * 2 * f);
      ctx.save(); ctx.globalAlpha = 0.22 + 0.12 * f; ctx.drawImage(this.canvas, d, Math.round(d / 3)); ctx.restore();
    }
    const ctx = this.ctx; ctx.save(); ctx.globalAlpha = 0.06 + 0.08 * f; ctx.fillStyle = '#ff9040'; ctx.fillRect(0, 0, this.vw, this.vh); ctx.restore();
    return r;
  };
  // coragem e falta de jeito no combate
  const rd0 = Player.prototype.rollDamage;
  Player.prototype.rollDamage = function (kind) {
    const r = rd0.call(this, kind), v = this.alcool || 0;
    if (r && v >= 12) r.dmg *= v >= 55 ? 0.85 : 1.1;
    if (r && Bebida.ressaca(this)) r.dmg *= 0.9;
    return r;
  };
  const cd0 = Combat.damage;
  Combat.damage = function (t, amount, o) {
    const P = Game.player;
    if (t === P && P && (P.alcool || 0) >= 40) amount *= 1.15;
    return cd0.call(this, t, amount, o);
  };
  // o painel mostra se você está bêbado ou de ressaca
  const h0 = Vida.hudHTML; Vida.hudHTML = function () { return h0.call(this) + Bebida.hud(); };
  const t0 = Reino.tick; Reino.tick = function (dt) { const r = t0.apply(this, arguments); Bebida.tick(dt); return r; };
  // o calor da bebida engana: no frio, quem bebeu perde calor mais rápido
  const fr0 = Inverno.atualizaFrio;
  Inverno.atualizaFrio = function (dt) {
    const P = Game.player, f0 = P && P.frio, r = fr0.apply(this, arguments);
    if (P && (P.alcool || 0) >= 20 && P.frio > f0) P.frio = Math.min(100, P.frio + (P.frio - f0) * 0.35);
    return r;
  };
  // a ressaca deixa mais lento e com mais sede
  const vel0 = Vida.speedMul; Vida.speedMul = function () { return vel0.apply(this, arguments) * (Bebida.ressaca() ? 0.9 : 1); };
})();
