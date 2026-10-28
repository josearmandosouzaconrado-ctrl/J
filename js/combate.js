'use strict';
// ===================== IMPACTO DO COMBATE E BRILHO DAS MAGIAS =====================
// Pausa no impacto, faíscas na direção do golpe, combo de três golpes com finalização,
// rastro na esquiva, círculo mágico ao lançar, brilho e rastro nos projéteis e explosões
// com onda de choque. Tudo é efeito visual: os números de dano continuam os mesmos.
const COMBAT_TEMPO = 0.82;   // inimigos atacam mais rápido (combate mais frenético)
const Juice = {
  glowC: new Map(),
  // mancha de luz colorida (cacheada por cor e tamanho)
  glow(color, r) {
    const rr = r <= 6 ? 6 : r <= 12 ? 12 : r <= 24 ? 24 : 48, k = color + rr;
    let c = this.glowC.get(k);
    if (!c) {
      c = Sprites.cv(rr * 2, rr * 2); const x = c.getContext('2d'), g = x.createRadialGradient(rr, rr, 0, rr, rr, rr);
      const [R, G, B] = hexToRgb(color.startsWith('#') ? color : '#ffffff');
      g.addColorStop(0, `rgba(${R},${G},${B},0.9)`); g.addColorStop(0.35, `rgba(${R},${G},${B},0.45)`); g.addColorStop(1, `rgba(${R},${G},${B},0)`);
      x.fillStyle = g; x.fillRect(0, 0, rr * 2, rr * 2); this.glowC.set(k, c);
    }
    return c;
  },
  drawGlow(ctx, x, y, color, r, a = 1) {
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a;
    ctx.drawImage(this.glow(color, r), x - r, y - r, r * 2, r * 2);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  },
  // ---------- Golpes ----------
  // chamado em todo dano direto (não em queimadura/veneno)
  hit(t, o, dmg) {
    const P = Game.player, src = o.src, byP = src === P || (src && src.team === 'ally');
    const ang = src ? angleTo(src.x, src.y, t.x, t.y) : Math.random() * 6.28;
    const hx = t.x, hy = t.y - 8 - (t.z || 0);
    if (byP && t !== P) {
      Game.hitstop = Math.max(Game.hitstop, o.crit ? 0.085 : 0.05);
      if (o.crit) { Game.shake = Math.max(Game.shake, 3); Game.floater(hx, hy - 16, 'CRÍTICO', '#ffe040'); }
    }
    const col = o.elem === 'fire' ? '#ffb050' : o.elem === 'frost' ? '#c0f0ff' : o.elem === 'shock' ? '#fff080' : o.elem === 'dark' ? '#d080ff' : o.elem === 'holy' ? '#fff4b0' : '#ffffff';
    Game.fx.push({ kind: 'impact', x: hx, y: hy, ang, t: 0, dur: o.crit ? 0.2 : 0.14, color: col, big: !!o.crit });
    // faíscas saindo na direção do golpe
    for (let i = 0; i < (o.crit ? 9 : 5); i++) { const a = ang + (Math.random() - 0.5) * 1.3, s = 70 + Math.random() * 110; Game.particle(hx, hy, Math.cos(a) * s, Math.sin(a) * s - 15, Math.random() < 0.5 ? col : '#ffe0a0', 0.18 + Math.random() * 0.15, Math.random() < 0.3 ? 2 : 1, 200); }
  },
  kill(m) {
    Game.hitstop = Math.max(Game.hitstop, m.boss ? 0.25 : 0.1);
    Game.shake = Math.max(Game.shake, m.boss ? 10 : 4);
    const y = m.y - 8;
    Game.fx.push({ kind: 'shock', x: m.x, y: m.y - 2, r0: 4, r1: m.boss ? 70 : 30, t: 0, dur: 0.35, color: '#ffffff' });
    Game.fx.push({ kind: 'glowfx', x: m.x, y, r: m.boss ? 60 : 26, t: 0, dur: 0.3, color: '#fff0c0' });
    for (let i = 0; i < (m.boss ? 40 : 14); i++) { const a = Math.random() * 6.28, s = 40 + Math.random() * 120; Game.particle(m.x, y, Math.cos(a) * s, Math.sin(a) * s - 40, Math.random() < 0.5 ? '#fff0c0' : '#ffd060', 0.4 + Math.random() * 0.4, Math.random() < 0.4 ? 2 : 1, 160); }
  },
  // combo de 3 golpes: 1 e 2 rápidos, o 3º é a finalização (mais forte, mais larga, empurra longe)
  combo(P) {
    const now = Game.t;
    P.combo = now - (P.lastSwing || -9) < 0.8 ? (P.combo % 3) + 1 : 1;
    P.lastSwing = now;
    return P.combo;
  },
  finisher(P, ang, hits) {
    Game.shake = Math.max(Game.shake, 5);
    Game.fx.push({ kind: 'shock', x: P.x + Math.cos(ang) * 14, y: P.y - 4 + Math.sin(ang) * 10, r0: 6, r1: 34, t: 0, dur: 0.3, color: '#ffd060' });
    if (hits) Game.floater(P.x, P.y - 34, `COMBO x3!`, '#ffb040', 1);
  },
  // rastro de esquiva (silhuetas que somem)
  ghost(a) {
    const S = a.S; if (!S || !S[a.dir]) return;
    const img = S[a.dir][0];
    Game.fx.push({ kind: 'ghost', img, x: a.x - img.width / 2, y: a.y - img.height + 1 - (a.z || 0), t: 0, dur: 0.22 });
  },
  // ---------- Magias ----------
  cast(P, sp) {
    Game.fx.push({ kind: 'circle', x: P.x, y: P.y + 1, r: 16, t: 0, dur: 0.45, color: sp.color, rot: Math.random() * 6.28 });
    Game.fx.push({ kind: 'glowfx', x: P.x + Math.cos(P.face) * 6, y: P.y - 10, r: 16, t: 0, dur: 0.25, color: sp.color });
    for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28; Game.particle(P.x + Math.cos(a) * 14, P.y + Math.sin(a) * 6, 0, -30 - Math.random() * 30, sp.color, 0.5, 1, -10); }
  },
  heal(x, y, color) {
    for (let i = 0; i < 22; i++) Game.particle(x + (Math.random() - 0.5) * 22, y + (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, -25 - Math.random() * 40, Math.random() < 0.5 ? '#fff4b0' : color, 0.8 + Math.random() * 0.5, Math.random() < 0.3 ? 2 : 1, -5);
    Game.fx.push({ kind: 'glowfx', x, y: y - 8, r: 28, t: 0, dur: 0.5, color });
  },
  explode(x, y, r, color) {
    Game.fx.push({ kind: 'shock', x, y, r0: 3, r1: r * 1.15, t: 0, dur: 0.32, color });
    Game.fx.push({ kind: 'glowfx', x, y: y - 4, r: Math.min(48, r * 1.1), t: 0, dur: 0.28, color });
    for (let i = 0; i < 10; i++) { const a = Math.random() * 6.28, s = 60 + Math.random() * 100; Game.particle(x, y - 4, Math.cos(a) * s, Math.sin(a) * s - 50, Math.random() < 0.5 ? '#ffffff' : color, 0.4 + Math.random() * 0.3, 2, 220); }
  },
  projImpact(p) {
    const col = p.color || (p.kind === 'fireball' || p.kind === 'breath' ? '#ff8020' : p.kind === 'frost' ? '#a0e0ff' : p.kind === 'dark' ? '#b050ff' : p.kind === 'poison' ? '#80e040' : p.kind === 'bullet' ? '#ffe0a0' : '#80a0ff');
    Game.fx.push({ kind: 'glowfx', x: p.x, y: p.y, r: 14, t: 0, dur: 0.2, color: col });
    Game.fx.push({ kind: 'ring', x: p.x, y: p.y, r0: 2, r1: 12, t: 0, dur: 0.2, color: col });
  },
  projGlow(ctx, p, x, y) {
    const col = p.color || (p.kind === 'fireball' || p.kind === 'breath' ? '#ff7020' : p.kind === 'frost' ? '#80d0ff' : p.kind === 'dark' ? '#a040ff' : p.kind === 'poison' ? '#70e030' : p.kind === 'bullet' ? '#ffd080' : '#7090ff');
    // rastro: o brilho repetido atrás do projétil
    const L = Math.hypot(p.vx, p.vy) || 1, tx = p.vx / L, ty = p.vy / L;
    for (let i = 3; i >= 1; i--) this.drawGlow(ctx, x - tx * i * 4, y - ty * i * 4, col, 7 - i, 0.35);
    this.drawGlow(ctx, x, y, col, p.kind === 'bullet' ? 6 : 11, 0.9);
  },
  // ---------- Desenho dos efeitos novos (true = já desenhou) ----------
  drawFx(ctx, f, camX, camY) {
    const k = f.t / f.dur, x = f.x - camX, y = f.y - camY;
    switch (f.kind) {
      case 'swing': {
        // corte em meia-lua: faixa grossa colorida com miolo branco
        const dirS = f.rev ? -1 : 1, a0 = f.ang - dirS * f.arc / 2, sweep = dirS * f.arc * Math.min(1, k * 1.8);
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = f.color; ctx.lineCap = 'round';
        for (const [w, rr, al] of [[f.fin ? 7 : 5, 0.85, 0.35], [3, 0.82, 0.6], [1, 0.8, 0.95]]) {
          ctx.globalAlpha = al * (1 - k); ctx.lineWidth = w; ctx.strokeStyle = w === 1 ? '#ffffff' : f.color;
          ctx.beginPath(); ctx.arc(x, y, f.r * rr, Math.min(a0, a0 + sweep), Math.max(a0, a0 + sweep)); ctx.stroke();
        }
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.lineCap = 'butt'; ctx.lineWidth = 1;
        return true;
      }
      case 'impact': {
        // estrela de impacto: raios que crescem e somem
        ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = f.color; ctx.globalAlpha = 1 - k; ctx.lineWidth = f.big ? 2 : 1;
        const n = f.big ? 8 : 6, R = (f.big ? 14 : 9) * (0.5 + k);
        ctx.beginPath();
        for (let i = 0; i < n; i++) { const a = f.ang + i / n * 6.28 + (i % 2) * 0.2, rr = i % 2 ? R * 0.55 : R; ctx.moveTo(x + Math.cos(a) * R * 0.25, y + Math.sin(a) * R * 0.25); ctx.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); }
        ctx.stroke();
        this.drawGlow(ctx, x, y, f.color === '#ffffff' ? '#fff0d0' : f.color, f.big ? 12 : 8, 0.8 * (1 - k));
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.lineWidth = 1;
        return true;
      }
      case 'shock': {
        const r = lerp(f.r0, f.r1, 1 - (1 - k) * (1 - k));
        ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = f.color;
        ctx.globalAlpha = 0.5 * (1 - k); ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(x, y, Math.max(1, r), Math.max(1, r * 0.6), 0, 0, 6.29); ctx.stroke();
        ctx.globalAlpha = 0.9 * (1 - k); ctx.lineWidth = 1.5; ctx.beginPath(); ctx.ellipse(x, y, Math.max(1, r), Math.max(1, r * 0.6), 0, 0, 6.29); ctx.stroke();
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.lineWidth = 1;
        return true;
      }
      case 'glowfx': this.drawGlow(ctx, x, y, f.color, f.r * (0.6 + k * 0.6), 1 - k); return true;
      case 'ghost': ctx.globalAlpha = 0.4 * (1 - k); ctx.drawImage(f.img, Math.round(x), Math.round(y)); ctx.globalAlpha = 1; return true;
      case 'circle': {
        // círculo mágico girando no chão, com runas
        const r = f.r * Math.min(1, k * 4), a = f.rot + k * 4;
        ctx.globalCompositeOperation = 'lighter'; ctx.strokeStyle = f.color; ctx.globalAlpha = (k < 0.7 ? 1 : (1 - k) / 0.3) * 0.85; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.ellipse(x, y, r, r * 0.45, 0, 0, 6.29); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(x, y, r * 0.7, r * 0.32, 0, 0, 6.29); ctx.stroke();
        ctx.beginPath();
        for (let i = 0; i < 6; i++) { const b = a + i / 6 * 6.28, c2 = a + (i + 2) / 6 * 6.28; ctx.moveTo(x + Math.cos(b) * r * 0.7, y + Math.sin(b) * r * 0.32); ctx.lineTo(x + Math.cos(c2) * r * 0.7, y + Math.sin(c2) * r * 0.32); }
        ctx.stroke();
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 8; i++) { const b = -a + i / 8 * 6.28; ctx.fillRect(Math.round(x + Math.cos(b) * r * 0.85), Math.round(y + Math.sin(b) * r * 0.39), 1, 1); }
        this.drawGlow(ctx, x, y - 2, f.color, 14, 0.4 * (1 - k));
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
        return true;
      }
      case 'bolt': {
        // raio com brilho em volta
        ctx.globalCompositeOperation = 'lighter';
        for (const [w, col, al] of [[6, f.color, 0.3], [3, f.color, 0.8], [1, '#ffffff', 1]]) {
          ctx.strokeStyle = col; ctx.lineWidth = w; ctx.globalAlpha = al * (1 - k);
          ctx.beginPath(); f.pts.forEach(([px, py], i) => i ? ctx.lineTo(px - camX, py - camY) : ctx.moveTo(px - camX, py - camY)); ctx.stroke();
        }
        const end = f.pts[f.pts.length - 1]; this.drawGlow(ctx, end[0] - camX, end[1] - camY, f.color, 12, 1 - k);
        ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.lineWidth = 1;
        return true;
      }
    }
    return false;
  }
};
