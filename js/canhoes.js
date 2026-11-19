'use strict';
// =====================================================================
//  CANHÕES DO NAVIO — mira de verdade
//  • O artilheiro escolhe o alvo do lado em que você atira (navios e a
//    Serpente-do-Abismo), calcula para onde ele vai (velocidade e tempo
//    de voo da bala) e a bordada cai em cima dele, mais espalhada de longe.
//  • No timão aparecem: uma mira vermelha no alvo de cada lado (com a
//    distância), o alcance dos canhões e quanto falta para recarregar.
//  • O botão de ataque (J / Espaço) no timão dispara pelo lado onde está
//    o melhor alvo; o botão de magia (K) dispara o canhão de proa (um tiro
//    certeiro para a frente, recarrega rápido).
//  • Acertos mostram o dano na hora; 1 em cada 8 balas acerta a linha
//    d'água e faz o dobro.
// =====================================================================
const Canhoes = {
  ALC: 680, RECARGA: 3.0, PROA: 1.8,
  // alvos possíveis: navios da frota que não afundaram e a serpente visível
  alvos(L) {
    const out = [];
    for (const f of Mar.frota) if (!f.sink && !f.saqueado) out.push({ x: f.x, y: f.y, vx: Math.cos(f.ang) * (f.spd || 0), vy: Math.sin(f.ang) * (f.spd || 0), f, nome: f.nome, hostil: f.hostil || f.atacado });
    const m = typeof Serpente !== 'undefined' && Serpente.m;
    if (m && m.L === L && m.st !== 'morre' && m.st !== 'some' && (m.vis > 0.3 || m.st === 'emerge')) out.push({ x: m.x, y: m.y, vx: m.st === 'nada' ? Math.cos(m.ang) * m.v : 0, vy: m.st === 'nada' ? Math.sin(m.ang) * m.v : 0, serpente: m, nome: 'Serpente-do-Abismo', hostil: m.ataca });
    return out;
  },
  normal(L, lado) { return L.ang + (lado === 'est' ? Math.PI / 2 : lado === 'bom' ? -Math.PI / 2 : 0); },
  // o melhor alvo de um lado: perto, bem de frente para os canhões, e hostil vale mais
  alvoDo(L, lado) {
    const n = this.normal(L, lado), cone = lado === 'proa' ? 0.86 : 0.45;
    let best = null, bs = Infinity;
    for (const a of this.alvos(L)) {
      const dx = a.x - L.x, dy = a.y - L.y, d = Math.hypot(dx, dy); if (d > this.ALC || d < 60) continue;
      const c = (dx * Math.cos(n) + dy * Math.sin(n)) / d; if (c < cone) continue;
      const s = d * (1.6 - c) * (a.hostil ? 0.6 : 1); if (s < bs) { bs = s; best = Object.assign({ d }, a); }
    }
    return best;
  },
  ladoMelhor(L) {
    const b = this.alvoDo(L, 'bom'), e = this.alvoDo(L, 'est');
    if (b && e) return (b.hostil ? 0.6 : 1) * b.d <= (e.hostil ? 0.6 : 1) * e.d ? 'bom' : 'est';
    return b ? 'bom' : e ? 'est' : null;
  },
  pronto(L, lado) { return !(L.reload && L.reload[lado] > 0); },
  disparar(lado) {
    const G = Game, L = G.level; if (!L || !L.proprio) return;
    L.reload = L.reload || {};
    if (L.reload[lado] > 0) return G.toast(`Recarregando (${L.reload[lado].toFixed(1)}s)...`, '#c0c0c0');
    const proa = lado === 'proa', alvo = this.alvoDo(L, lado), n = this.normal(L, lado);
    L.reload[lado] = proa ? this.PROA : this.RECARGA;
    const qtd = proa ? 1 : Math.max(2, Math.round(NAVIOS[L.nav.tipo].canhoes / 2));
    // ponto de mira: onde o alvo vai estar quando a bala chegar
    let mx, my, T = 1.0;
    if (alvo) { T = clamp(alvo.d / 420, 0.6, 1.6); mx = alvo.x + alvo.vx * T; my = alvo.y + alvo.vy * T; }
    else { mx = L.x + Math.cos(n) * 360; my = L.y + Math.sin(n) * 360; }
    const esp = proa ? 14 : 22 + (alvo ? alvo.d * 0.05 : 40);
    for (let i = 0; i < qtd; i++) {
      const al = proa ? 0 : (i / Math.max(1, qtd - 1) - 0.5) * 360;
      const sx = proa ? L.x + Math.cos(L.ang) * 300 : L.x + Math.cos(L.ang) * al + Math.cos(n) * 90;
      const sy = proa ? L.y + Math.sin(L.ang) * 300 : L.y + Math.sin(L.ang) * al + Math.sin(n) * 90;
      const dd = dist(sx, sy, mx, my);
      Mar.balas.push({ de: 'jog', x0: sx, y0: sy, x1: mx + (Math.random() - 0.5) * esp * 2, y1: my + (Math.random() - 0.5) * esp, t: -i * 0.07, dur: Math.max(0.55, dd / 420), dmg: proa ? 14 : 12, crit: Math.random() < 0.125, _serp: true });
    }
    Sfx.play('boom'); G.shake = proa ? 3 : 6;
    // fogo e fumaça nas bocas dos canhões daquele lado
    const cxL = L.w * 8, cyL = L.h * 8, F = L.floors[0];
    for (let j = 0; j < F.objs.length; j++) if (F.objs[j] === O.CANNON) {
      const x = (j % L.w) * 16 + 8, y = ((j / L.w) | 0) * 16 + 8;
      if (!proa && (x - cxL) * Math.cos(n) + (y - cyL) * Math.sin(n) <= 0) continue;
      if (proa && x < cxL + L.w * 3) continue;
      G.particle(x + Math.cos(n) * 12, y + Math.sin(n) * 12, 0, 0, '#fff0a0', 0.12, 5, 0);
      for (let k = 0; k < 6; k++) G.particle(x + Math.cos(n) * 12, y + Math.sin(n) * 12, Math.cos(n) * 60 + (Math.random() - 0.5) * 40, Math.sin(n) * 60 - 20 - Math.random() * 20, Math.random() < 0.5 ? 'rgba(230,230,230,0.85)' : 'rgba(150,150,150,0.8)', 1 + Math.random(), 3, -10);
    }
    if (alvo) G.toast(`💥 ${proa ? 'Canhão de proa' : 'Bordada'} em ${alvo.nome}!`, '#ffd080');
    Mar.painelKey = '';
  },
  // ataque no timão: atira pelo lado do melhor alvo (ou pelos dois, se não houver)
  auto() {
    const L = Game.level; if (!L || !L.proprio || !L.leme) return false;
    const lado = this.ladoMelhor(L) || (this.pronto(L, 'est') ? 'est' : 'bom');
    this.disparar(lado); return true;
  },
  tick(dt) {
    const L = Game.level; if (!L || !L.proprio || !L.reload) return;
    if (L.reload.proa > 0) L.reload.proa = Math.max(0, L.reload.proa - dt);   // bombordo e estibordo o navio já recarrega
  },
  // miras sobre os alvos
  desenhar(ctx, cx, cy) {
    const L = Game.level; if (!L || !L.proprio || !L.leme) return;
    const t = Game.t;
    ctx.save();
    for (const lado of ['bom', 'est', 'proa']) {
      const a = this.alvoDo(L, lado); if (!a) continue;
      const T = clamp(a.d / 420, 0.6, 1.6), x = a.x + a.vx * T - cx, y = a.y + a.vy * T - cy, r = 34 + Math.sin(t * 6) * 3, ok = this.pronto(L, lado);
      ctx.strokeStyle = ok ? 'rgba(255,60,40,0.9)' : 'rgba(200,200,200,0.6)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.55, 0, 0, Math.PI * 2); ctx.stroke();
      for (let k = 0; k < 4; k++) { const an = k * Math.PI / 2 + t; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * (r - 8), y + Math.sin(an) * (r - 8) * 0.55); ctx.lineTo(x + Math.cos(an) * (r + 6), y + Math.sin(an) * (r + 6) * 0.55); ctx.stroke(); }
      ctx.font = 'bold 11px monospace'; ctx.textAlign = 'center';
      const txt = (lado === 'proa' ? 'PROA ' : lado === 'bom' ? 'BOMBORDO ' : 'ESTIBORDO ') + (ok ? '• PRONTO' : '• ' + L.reload[lado].toFixed(1) + 's');
      ctx.fillStyle = '#000'; ctx.fillText(txt, x + 1, y - r * 0.55 - 5); ctx.fillStyle = ok ? '#ff9070' : '#c0c0c0'; ctx.fillText(txt, x, y - r * 0.55 - 6);
    }
    ctx.restore();
  }
};
(function () {
  // os botões do timão usam o disparo novo
  Mar.disparar = function (lado) { return Canhoes.disparar(lado); };
  // dano visível e acerto na linha d'água
  const ac0 = Mar.acertou;
  Mar.acertou = function (f, dmg, L) { if (this._bala && this._bala.crit) { dmg *= 2; Game.floatText(f.x, f.y - 60, 'LINHA D\'ÁGUA!', '#ffd040'); } Game.floater(f.x + (Math.random() - 0.5) * 30, f.y - 40, String(Math.round(dmg)), '#ffb060', 2); return ac0.call(this, f, dmg, L); };
  // marca qual bala está sendo resolvida (para o crítico)
  const tn0 = Mar.tickNavio;
  Mar.tickNavio = function (dt, L) {
    const vistas = Mar.balas.filter(b => b.de === 'jog' && !b.feito && b.t + dt / Math.max(0.3, b.dur) >= 1);
    for (const b of vistas) { const alvo = Mar.frota.find(f => !f.sink && dist(f.x, f.y, b.x1, b.y1) < 70); if (alvo) { this._bala = b; Mar.acertou(alvo, b.dmg, L); b.feito = true; this._bala = null; } }
    return tn0.apply(this, arguments);
  };
  // ataque e magia no timão viram os canhões
  const at0 = Player.prototype.attack;
  Player.prototype.attack = function () { if (this === Game.player && Canhoes.auto()) return; return at0.apply(this, arguments); };
  const cs0 = Player.prototype.castSpell;
  Player.prototype.castSpell = function () { const L = Game.level; if (this === Game.player && L && L.proprio && L.leme) return Canhoes.disparar('proa'); return cs0.apply(this, arguments); };
  // botão do canhão de proa e as recargas no painel do timão
  const p0 = Mar.painel;
  Mar.painel = function () {
    const L = Game.level;
    if (L && L.proprio && L.leme) { const k = ['bom', 'est', 'proa'].map(s => Math.ceil((L.reload && L.reload[s]) || 0)).join(); if (k !== this._recK) { this._recK = k; this.painelKey = ''; } }
    const r = p0.apply(this, arguments);
    const el = this.el;
    if (el && L && L.proprio && L.leme && !el.querySelector('[data-o="proa"]')) {
      const rl = s => (L.reload && L.reload[s] > 0) ? ` (${Math.ceil(L.reload[s])}s)` : '';
      const b = el.querySelector('[data-o="bom"]'), e = el.querySelector('[data-o="est"]');
      if (b) b.textContent = '💥 Bombordo' + rl('bom'); if (e) e.textContent = '💥 Estibordo' + rl('est');
      if (e) { const p = document.createElement('button'); p.dataset.o = 'proa'; p.className = 'wide'; p.textContent = '🎯 Canhão de proa' + rl('proa'); e.after(p); }
    }
    return r;
  };
  // o clique no botão de proa (o painel é criado depois do carregamento)
  document.addEventListener('pointerdown', e => { const b = e.target.closest && e.target.closest('#leme button[data-o="proa"]'); if (b) { e.preventDefault(); e.stopPropagation(); Canhoes.disparar('proa'); } }, true);
  const n0 = NavioLevel.prototype.update;
  NavioLevel.prototype.update = function (dt) { try { Canhoes.tick(dt); } catch (e) { } return n0.apply(this, arguments); };
  // a mira fica por cima de tudo (navios inimigos inclusive)
  const o0 = ShipLevel.prototype.drawOverlay;
  ShipLevel.prototype.drawOverlay = function (ctx, camX, camY) { const r = o0.apply(this, arguments); try { Canhoes.desenhar(ctx, this.ox() + camX, this.oy() + camY); } catch (e) { } return r; };
})();
