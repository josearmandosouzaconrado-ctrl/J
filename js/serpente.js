'use strict';
// =====================================================================
//  SERPENTE-DO-ABISMO — o monstro dos mares abertos
//  Arte: tools/serpente_ref.png -> tools/extrair_serpente.py -> img/serpente.webp
//  (4 poses: emergindo de boca aberta, nadando vista de cima, cabeça
//  erguida com o corpo em curva, enrolada afundando).
//  • Em mar aberto (longe da costa) ela é vista com frequência: nada ao
//    lado do navio, sobe e mergulha, e vai embora. Quase nunca ataca.
//  • É hostil: de vez em quando (raro) vem por baixo, emerge ao lado do
//    casco com um rugido e morde o navio, mergulha e volta por outro lado.
//  • Atirar nela com os canhões a deixa furiosa (passa a atacar). Ferida,
//    foge para o fundo; morta, afunda enrolada e deixa escamas abissais.
//  • Nas viagens pagas ela só é vista (o capitão comenta), nunca ataca.
// =====================================================================
idef('escama_abissal', { name: 'Escama Abissal', type: 'material', value: 220, stack: true, icon: { k: 'scale', c: '#3a6ae0' }, desc: 'Escama azul que brilha no escuro, arrancada de uma Serpente-do-Abismo.' });

const Serpente = {
  POSES: [[0, 0, 285, 190], [287, 0, 292, 120], [581, 0, 240, 190], [823, 0, 159, 170]],
  img: null, ok: false, m: null, cdT: 25, HP: 900,
  carregar() {
    const im = new Image();
    im.onload = () => { this.img = im; this.ok = true; };
    im.src = typeof imgSrc === 'function' ? imgSrc('img/serpente.webp') : 'img/serpente.webp';
  },
  // mar aberto: água navegável em todas as direções por um bom pedaço
  aberto(L) {
    let n = 0;
    for (let k = 0; k < 8; k++) { const a = k * Math.PI / 4; if (Mar.navegavel(L.x + Math.cos(a) * 700, L.y + Math.sin(a) * 700) && Mar.navegavel(L.x + Math.cos(a) * 350, L.y + Math.sin(a) * 350)) n++; }
    return n >= 7;
  },
  tick(dt, L) {
    if (!this.ok || !L || !L.isShip) { this.m = null; return; }
    const G = Game, m = this.m;
    if (!m) {
      this.cdT -= dt;
      if (this.cdT <= 0) { this.cdT = 40 + Math.random() * 55; if (this.aberto(L) && Math.random() < 0.5) this.surgir(L); }
      return;
    }
    if (m.L !== L) { this.m = null; return; }
    m.t += dt; m.st_t += dt;
    const ang = L.ang || 0;
    switch (m.st) {
      case 'nada': {
        // passa ao lado do navio, subindo e mergulhando
        m.x += Math.cos(m.ang) * m.v * dt; m.y += Math.sin(m.ang) * m.v * dt;
        m.vis += ((Math.sin(m.t * 0.9) > -0.2 ? 0.85 : 0.18) - m.vis) * dt * 1.2;
        if (Math.random() < dt * 8) this.espuma(m.x - Math.cos(m.ang) * 120, m.y - Math.sin(m.ang) * 120, 1);
        if (m.ataca && m.st_t > 5) this.estado(m, 'vem');
        else if (m.t > 16 || dist(m.x, m.y, L.x, L.y) > 1400) this.estado(m, 'some');
        break;
      }
      case 'vem': {
        // vem por baixo d'água na direção do navio
        const alvo = this.lado(L, m), a = Math.atan2(alvo.y - m.y, alvo.x - m.x);
        let da = a - m.ang; while (da > Math.PI) da -= Math.PI * 2; while (da < -Math.PI) da += Math.PI * 2;
        m.ang += clamp(da, -1.6 * dt, 1.6 * dt);
        m.x += Math.cos(m.ang) * 190 * dt; m.y += Math.sin(m.ang) * 190 * dt; m.vis += (0.25 - m.vis) * dt * 2;
        if (Math.random() < dt * 10) this.espuma(m.x, m.y, 0.6);
        if (dist(m.x, m.y, alvo.x, alvo.y) < 60 || m.st_t > 9) this.emergir(L, m);
        break;
      }
      case 'emerge': {
        // gruda ao lado do casco, de cabeça erguida, e morde
        const alvo = this.lado(L, m); m.x += (alvo.x - m.x) * dt * 3; m.y += (alvo.y - m.y) * dt * 3;
        m.vis = Math.min(1, m.vis + dt * 2);
        m.mordida -= dt;
        if (m.mordida <= 0) { m.mordida = 2.4; m.boca = 0.6; this.morder(L, m); }
        if (m.boca > 0) m.boca -= dt;
        if (Math.random() < dt * 14) this.espuma(m.x + (Math.random() - 0.5) * 160, m.y + 30, 1.2);
        if (m.st_t > 7) { m.rodadas++; this.estado(m, m.rodadas >= 3 ? 'some' : 'mergulha'); m.ang = ang + (m.lado > 0 ? 1 : -1) * Math.PI / 2; }
        break;
      }
      case 'mergulha': {
        m.vis = Math.max(0.15, m.vis - dt * 0.9); m.x += Math.cos(m.ang) * 160 * dt; m.y += Math.sin(m.ang) * 160 * dt;
        if (m.st_t > 3) { m.lado = -m.lado; this.estado(m, 'vem'); }
        break;
      }
      case 'some': {
        m.vis -= dt * 0.5; m.x += Math.cos(m.ang) * 140 * dt; m.y += Math.sin(m.ang) * 140 * dt;
        if (m.vis <= 0) this.m = null;
        break;
      }
      case 'morre': {
        m.vis -= dt * 0.22; m.afunda += dt * 10;
        if (Math.random() < dt * 6) this.espuma(m.x + (Math.random() - 0.5) * 120, m.y + (Math.random() - 0.5) * 60, 1);
        if (m.vis <= 0) this.m = null;
        break;
      }
    }
  },
  estado(m, s) { m.st = s; m.st_t = 0; },
  // o ponto ao lado do casco onde ela emerge (bombordo ou estibordo)
  lado(L, m) { const a = (L.ang || 0) + m.lado * Math.PI / 2; return { x: L.x + Math.cos(a) * 230 - Math.cos(L.ang || 0) * 40, y: L.y + Math.sin(a) * 170 }; },
  surgir(L) {
    const G = Game, lado = Math.random() < 0.5 ? 1 : -1, ang = L.ang || 0;
    const sx = L.x + Math.cos(ang) * 700 + Math.cos(ang + lado * Math.PI / 2) * 380, sy = L.y + Math.sin(ang) * 700 + Math.sin(ang + lado * Math.PI / 2) * 300;
    const ataca = !!L.proprio && Math.random() < 0.12;
    this.m = { L, x: sx, y: sy, ang: ang + Math.PI + lado * 0.15, v: 120 + Math.random() * 40, vis: 0, t: 0, st: 'nada', st_t: 0, lado, ataca, hp: this.HP, max: this.HP, mordida: 1, boca: 0, rodadas: 0, afunda: 0 };
    Sfx.play('wave');
    if (L.proprio) G.toast('🌊 Uma Serpente-do-Abismo nada ao lado do navio... não provoque.', '#80c8ff');
    else G.toast(`${(L.cap && L.cap.name) || 'O capitão'}: Silêncio todos... é uma Serpente-do-Abismo. Ela só está de passagem.`, '#80c8ff');
  },
  emergir(L, m) {
    const G = Game;
    this.estado(m, 'emerge'); m.vis = 0.5; m.mordida = 1.4;
    G.shake = 12; Sfx.play('shout'); Sfx.play('boom');
    for (let i = 0; i < 26; i++) this.espuma(m.x + (Math.random() - 0.5) * 220, m.y + (Math.random() - 0.5) * 80, 1.6);
    if (!m.avisou) { m.avisou = true; G.centerMsg('SERPENTE-DO-ABISMO!', 'Ela emergiu ao lado do casco! Use os canhões.'); }
  },
  morder(L, m) {
    const G = Game;
    if (!L.proprio || !L.nav) return;
    L.nav.hp -= 16; G.shake = 9; Sfx.play('hit');
    const p = L.T(4 + Math.floor(Math.random() * 26), m.lado > 0 ? SHIP_B - 2 : 1);
    G.burst(p.x * 16 + 8, p.y * 16 + 8, '#8a5a2a', 14, 80); G.burst(p.x * 16 + 8, p.y * 16 + 8, '#e8f4ff', 10, 70);
    if (!G.player.dead && dist(G.player.x, G.player.y, p.x * 16 + 8, p.y * 16 + 8) < 70) Combat.damage(G.player, 18, { src: null });
    if (L.nav.hp <= 0) Mar.naufragar(L);
  },
  // as balas dos seus canhões que caem perto dela (antes de o mar as contar como água)
  balas(L, m, dt) {
    if (m.st === 'morre' || m.st === 'some') return;
    // o artilheiro mira nela quando ela está do lado em que os canhões dispararam
    for (const b of Mar.balas) {
      if (b.de !== 'jog' || b._serp || b.feito) continue;
      b._serp = true;
      const vx = b.x1 - b.x0, vy = b.y1 - b.y0, mx = m.x - b.x0, my = m.y - b.y0, d = Math.hypot(mx, my);
      if (d < 700 && (vx * mx + vy * my) / (Math.hypot(vx, vy) * d + 1e-6) > 0.5 && (m.vis > 0.3 || m.st === 'emerge')) { b.x1 = m.x + (Math.random() - 0.5) * 120; b.y1 = m.y + (Math.random() - 0.5) * 70; b.dur = Math.max(0.6, d / 380); }
    }
    for (const b of Mar.balas) {
      if (b.de !== 'jog' || b.feito || b.t + dt / Math.max(0.3, b.dur) < 1) continue;
      if (dist(b.x1, b.y1, m.x, m.y) > (m.st === 'emerge' ? 170 : 130) || (m.vis < 0.3 && m.st !== 'emerge')) continue;
      b.feito = true; m.hp -= b.dmg * 1.4;
      Game.burst(b.x1, b.y1, '#40e0ff', 12, 80); Game.burst(b.x1, b.y1, '#1a2a6a', 8, 60);
      Mar.efeitos.push({ k: 'fogo', x: b.x1, y: b.y1 - 20, t: 0 });
      if (!m.ataca) { m.ataca = true; Game.toast('Você acertou a serpente... agora ela está furiosa!', '#ff8060'); if (m.st === 'nada') this.estado(m, 'vem'); }
      if (m.hp <= 0) return this.matar(L, m);
      if (m.hp < m.max * 0.3 && !m.ferida) { m.ferida = true; Game.toast('A serpente sangra luz azul e mergulha para o fundo!', '#80c8ff'); m.ang = Math.atan2(m.y - L.y, m.x - L.x); this.estado(m, 'some'); return; }
    }
  },
  matar(L, m) {
    const G = Game, P = G.player;
    this.estado(m, 'morre'); m.vis = 1;
    P.gold += 500; P.addItem(Items.make('escama_abissal', 3));
    const M = Mar.st(); M.fama = (M.fama || 0) + 6;
    Sfx.play('levelup'); G.shake = 14;
    G.centerMsg('A SERPENTE-DO-ABISMO CAIU!', '500 de ouro e 3 escamas abissais pescadas da água.');
    if (G.chron) G.chron('Matei uma Serpente-do-Abismo com os canhões do meu navio.');
  },
  espuma(x, y, f) { Game.particle(x, y, (Math.random() - 0.5) * 40 * f, -30 - Math.random() * 40 * f, Math.random() < 0.7 ? 'rgba(235,245,255,0.9)' : 'rgba(150,200,255,0.8)', 0.6 + Math.random() * 0.4, 2, 90); },
  // ---------- desenho (na água, por baixo do convés) ----------
  desenhar(ctx, cx, cy, cima) {
    const m = this.m; if (!m || !this.ok || m.vis <= 0.01) return;
    const erguida = m.st === 'emerge' || m.st === 'morre';
    if (!!cima !== erguida) return;   // nadando: por baixo do convés; erguida: por cima do navio
    const x = m.x - cx, y = m.y - cy, G = Game;
    if (x < -500 || y < -400 || x > G.vw + 500 || y > G.vh + 400) return;
    ctx.save(); ctx.imageSmoothingEnabled = false;
    if (m.st === 'emerge' || m.st === 'morre') {
      // erguida ao lado do casco: cabeça para o navio, espuma em volta
      const pose = m.st === 'morre' ? 3 : m.boca > 0 ? 0 : 2, [sx, sy, sw, sh] = this.POSES[pose], k = 1.45;
      const flip = m.st !== 'morre' && G.level.x > m.x;
      ctx.globalAlpha = Math.min(1, m.vis) * 0.35; ctx.fillStyle = '#0a1a3a'; ctx.beginPath(); ctx.ellipse(x, y + 20, sw * k * 0.45, 26, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = Math.min(1, m.vis);
      ctx.translate(x, y + m.afunda); if (flip) ctx.scale(-1, 1);
      ctx.drawImage(this.img, sx, sy, sw, sh, -sw * k / 2, -sh * k + 30, sw * k, sh * k);
      ctx.restore(); ctx.save();
      ctx.globalAlpha = 0.75 * Math.min(1, m.vis); ctx.strokeStyle = '#eaf4ff'; ctx.lineWidth = 3;
      for (let i = 0; i < 3; i++) { const r = (G.t * 40 + i * 30) % 90; ctx.beginPath(); ctx.ellipse(x, y + 26, 120 + r, 22 + r * 0.25, 0, 0, Math.PI * 2); ctx.stroke(); }
    } else {
      // nadando: vista de cima, meio submersa (só a parte de cima aparece nítida)
      const [sx, sy, sw, sh] = this.POSES[1], k = 1.6;
      ctx.translate(x, y); ctx.rotate(m.ang + Math.PI);
      ctx.globalAlpha = 0.3 * m.vis; ctx.fillStyle = '#04122e'; ctx.beginPath(); ctx.ellipse(0, 8, sw * k * 0.5, sh * k * 0.32, 0, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = Math.max(0, Math.min(1, m.vis));
      ctx.drawImage(this.img, sx, sy, sw, sh, -sw * k / 2, -sh * k / 2, sw * k, sh * k);
      if (m.vis < 0.7) { ctx.globalAlpha = (0.7 - m.vis) * 0.9; ctx.fillStyle = '#1e5aa0'; ctx.fillRect(-sw * k / 2, -sh * k / 2, sw * k, sh * k); }
    }
    ctx.restore();
    // vida (depois que ela vira inimiga)
    if (m.ataca && m.st !== 'morre' && m.st !== 'some') {
      const w = 120, bx = Math.round(x - w / 2), by = Math.round(y - (m.st === 'emerge' ? 270 : 90));
      ctx.fillStyle = '#10080c'; ctx.fillRect(bx - 1, by - 1, w + 2, 6); ctx.fillStyle = '#3a8aff'; ctx.fillRect(bx, by, Math.ceil(w * Math.max(0, m.hp) / m.max), 4);
      ctx.font = '9px monospace'; ctx.textAlign = 'center'; ctx.fillStyle = '#000'; ctx.fillText('Serpente-do-Abismo', x + 1, by - 3); ctx.fillStyle = '#a0d0ff'; ctx.fillText('Serpente-do-Abismo', x, by - 4); ctx.textAlign = 'left';
    }
  }
};
Serpente.carregar();
(function () {
  // as balas são resolvidas dentro do tick do mar: confere a serpente logo antes
  const tn0 = Mar.tickNavio;
  Mar.tickNavio = function (dt, L) { const m = Serpente.m; if (m && m.L === L) { try { Serpente.balas(L, m, dt); } catch (e) { } } return tn0.apply(this, arguments); };
  const u0 = ShipLevel.prototype.update;
  ShipLevel.prototype.update = function (dt) { if (!this.proprio) { try { Serpente.tick(dt, this); } catch (e) { } } return u0.apply(this, arguments); };
  const n0 = NavioLevel.prototype.update;
  NavioLevel.prototype.update = function (dt) { try { Serpente.tick(dt, this); } catch (e) { } return n0.apply(this, arguments); };
  const d0 = ShipLevel.prototype.drawWorldStuff;
  ShipLevel.prototype.drawWorldStuff = function (ctx, cx, cy, vw, vh) { const r = d0.apply(this, arguments); try { Serpente.desenhar(ctx, cx, cy, false); } catch (e) { } return r; };
  const o0 = ShipLevel.prototype.drawOverlay;
  ShipLevel.prototype.drawOverlay = function (ctx, camX, camY) { const r = o0.apply(this, arguments); try { Serpente.desenhar(ctx, this.ox() + camX, this.oy() + camY, true); } catch (e) { } return r; };
})();
