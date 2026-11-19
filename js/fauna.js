'use strict';
// =====================================================================
//  FAUNA — o mundo cheio de bichos (só enfeite e reação, sem combate)
//  Vilas: galinhas ciscando, porcos, vacas, ovelhas, cachorros que vêm
//  cheirar você e gatos. Água: patos nadando, peixes pulando, garças na
//  beira. Pântanos e rios da selva: sapos pulando e jacarés tomando sol
//  na margem que deslizam para a água quando você chega perto (e ficam
//  só com os olhos de fora). Praias: caranguejos andando de lado e
//  tartarugas. Selva: macacos e araras voando. Montanhas: cabras.
//  Bosques: esquilos. À noite: morcegos.
//  Os bichos nascem só em volta do jogador e somem quando ficam longe.
// =====================================================================
const Fauna = {
  L: [], spT: 0, MAX: 28,
  terra(t) { return !TSOLID[t] && !TWATER[t] && t !== T.LAVA; },
  agua(t) { return t === T.WATER || t === T.LUMWATER; },
  regiao(W, tx, ty) { W.baseTile(tx, ty); return W.regions[W._r] || {}; },
  escolhe(W, tx, ty) {
    const t = W.tileAt(tx, ty), R = this.regiao(W, tx, ty), b = R.biome, noite = Game.isNight && Game.isNight();
    const r = Math.random();
    if (noite) return r < 0.25 ? 'morcego' : null;
    if (this.agua(t)) {
      const margem = [[1, 0], [-1, 0], [0, 1], [0, -1]].some(([dx, dy]) => this.terra(W.tileAt(tx + dx * 2, ty + dy * 2)));
      if (b === 'swamp' || b === 'wetland' || b === 'jungle' || b === 'mist') return r < 0.35 ? 'jacare' : r < 0.6 ? 'peixe' : margem ? 'garca' : 'peixe';
      return r < 0.45 ? 'pato' : r < 0.8 ? 'peixe' : margem ? 'garca' : 'pato';
    }
    if (t === T.DEEP) return r < 0.2 ? 'peixe' : null;
    if (!this.terra(t)) return null;
    const s = W.nearestSettlement(tx, ty), dv = s ? dist(s.x, s.y, tx, ty) : 999;
    if (s && dv < 40 && s.type !== 'port' && !s.region.neutral) {
      const fora = dv > 14;
      const L = fora ? [['vaca', 3], ['ovelha', 3], ['porco', 2], ['galinha', 2], ['cachorro', 1]] : [['galinha', 5], ['gato', 2], ['cachorro', 2], ['porco', 1]];
      let tot = 0; for (const [, w] of L) tot += w; let x = Math.random() * tot; for (const [k, w] of L) { if (x < w) return k; x -= w; }
    }
    const perto = (f) => [[2, 0], [-2, 0], [0, 2], [0, -2], [3, 3], [-3, -3]].some(([dx, dy]) => f(W.tileAt(tx + dx, ty + dy)));
    if ((b === 'swamp' || b === 'wetland' || b === 'jungle') && perto(q => this.agua(q))) return r < 0.4 ? 'jacare' : 'sapo';
    if (t === T.MUD || t === T.SWAMP) return 'sapo';
    if (t === T.SAND && perto(q => this.agua(q) || q === T.DEEP)) return r < 0.6 ? 'caranguejo' : (b === 'tropical' || b === 'reef' || b === 'desert' || b === 'plains' ? 'tartaruga' : 'caranguejo');
    if (b === 'jungle' || b === 'liveforest') return r < 0.45 ? 'macaco' : r < 0.8 ? 'arara' : 'sapo';
    if (b === 'tropical' || b === 'serraverde') return r < 0.4 ? 'arara' : r < 0.6 ? 'macaco' : null;
    if (t === T.TUNDRA || b === 'mountain' || b === 'snow' || b === 'serra') return r < 0.5 && perto(q => TSOLID[q]) ? 'cabra' : null;
    if (t === T.DGRASS || b === 'forest' || b === 'hills') return r < 0.5 ? 'esquilo' : null;
    return null;
  },
  VOA: { arara: 1, morcego: 1 }, AGUA: { pato: 1, peixe: 1 },
  pode(W, k, x, y) {
    if (this.VOA[k]) return true;
    const t = W.tileAt(Math.floor(x / 16), Math.floor(y / 16));
    if (this.AGUA[k]) return this.agua(t) || (k === 'peixe' && t === T.DEEP);
    if (k === 'jacare') return this.terra(t) || this.agua(t);
    return this.terra(t) && !OSOLID[W.objAt(Math.floor(x / 16), Math.floor(y / 16))];
  },
  tick(dt) {
    const G = Game, W = G.world, P = G.player;
    if (!P || !G.level || !G.level.isWorld || G.level !== W) { this.L.length = 0; return; }
    const vw = G.vw, vh = G.vh, cx = G.camX + vw / 2, cy = G.camY + vh / 2;
    // nasce um bicho por vez, fora da tela ou na beirada
    this.spT -= dt;
    if (this.spT <= 0 && this.L.length < this.MAX) {
      this.spT = this.L.length < 10 ? 0.12 : 0.3;
      const x = cx + (Math.random() - 0.5) * vw * 1.15, y = cy + (Math.random() - 0.5) * vh * 1.15, tx = Math.floor(x / 16), ty = Math.floor(y / 16);
      const k = this.escolhe(W, tx, ty);
      if (k && this.pode(W, k, x, y) && !this.L.some(a => dist(a.x, a.y, x, y) < 24)) {
        const a = { k, x, y, vx: 0, vy: 0, t: Math.random() * 10, mude: 0, dir: Math.random() < 0.5 ? 1 : -1, st: 'anda', f: Math.random() * 6 };
        if (this.VOA[k]) { const ang = Math.random() * 6.28; a.vx = Math.cos(ang) * (k === 'morcego' ? 60 : 46); a.vy = Math.sin(ang) * 20; a.z = 30 + Math.random() * 30; a.dir = a.vx > 0 ? 1 : -1; a.cor = ['#e02020', '#2a6ae0', '#f0c020'][Math.floor(Math.random() * 3)]; }
        if (k === 'jacare') a.st = this.agua(W.tileAt(tx, ty)) ? 'nada' : 'sol';
        if (k === 'peixe') { a.st = 'fundo'; a.mude = 1 + Math.random() * 4; }
        if (k === 'cachorro' || k === 'gato') a.cor = ['#8a5a2a', '#2a2420', '#d8c8a8', '#c07a30', '#6a6a70'][Math.floor(Math.random() * 5)];
        if (k === 'galinha') a.cor = Math.random() < 0.6 ? '#f4f0e8' : '#a0522a';
        if (k === 'vaca') a.cor = Math.random() < 0.5 ? 'malhada' : '#8a5a34';
        this.L.push(a);
      }
    }
    for (let i = this.L.length - 1; i >= 0; i--) {
      const a = this.L[i]; a.t += dt; a.f += dt;
      const dp = dist(a.x, a.y, P.x, P.y);
      if (Math.abs(a.x - cx) > vw * 1.3 || Math.abs(a.y - cy) > vh * 1.3) { this.L.splice(i, 1); continue; }
      this.mover(W, a, dt, dp, P);
    }
  },
  mover(W, a, dt, dp, P) {
    const k = a.k;
    if (this.VOA[k]) { a.x += a.vx * dt; a.y += a.vy * dt + Math.sin(a.t * (k === 'morcego' ? 9 : 2)) * 12 * dt; return; }
    if (k === 'peixe') {
      a.mude -= dt;
      if (a.st === 'fundo' && a.mude <= 0) { a.st = 'pulo'; a.p = 0; a.dir = Math.random() < 0.5 ? 1 : -1; }
      if (a.st === 'pulo') { a.p += dt * 1.6; if (a.p >= 1) { a.st = 'fundo'; a.mude = 2 + Math.random() * 5; Game.particle(a.x + a.dir * 10, a.y, 0, -20, 'rgba(220,240,255,0.9)', 0.4, 1, 80); } }
      return;
    }
    if (k === 'jacare') {
      if (a.st === 'sol' && dp < 70) {
        // corre para a água mais próxima
        let alvo = null;
        for (let r = 1; r < 6 && !alvo; r++) for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) { const tx = Math.floor(a.x / 16) + dx * r, ty = Math.floor(a.y / 16) + dy * r; if (this.agua(W.tileAt(tx, ty))) { alvo = { x: tx * 16 + 8, y: ty * 16 + 8 }; break; } }
        if (alvo) { a.st = 'foge'; a.alvo = alvo; Sfx.play('swing'); } else a.st = 'bravo';
      }
      if (a.st === 'foge') { const d = dist(a.x, a.y, a.alvo.x, a.alvo.y); if (d < 4) { a.st = 'nada'; Game.particle(a.x, a.y, 0, -30, 'rgba(220,240,255,0.9)', 0.5, 2, 80); } else { a.dir = a.alvo.x > a.x ? 1 : -1; a.x += (a.alvo.x - a.x) / d * 90 * dt; a.y += (a.alvo.y - a.y) / d * 90 * dt; } return; }
      if (a.st === 'nada') { a.mude -= dt; if (a.mude <= 0) { a.mude = 2 + Math.random() * 3; const ang = Math.random() * 6.28; a.vx = Math.cos(ang) * 10; a.vy = Math.sin(ang) * 6; } const nx = a.x + a.vx * dt, ny = a.y + a.vy * dt; if (this.agua(W.tileAt(Math.floor(nx / 16), Math.floor(ny / 16)))) { a.x = nx; a.y = ny; if (a.vx) a.dir = a.vx > 0 ? 1 : -1; } return; }
      return;   // tomando sol: parado, boca aberta de vez em quando
    }
    // bichos de terra (e o pato na água): passeiam, param, fogem de perto (o cachorro vem cheirar)
    const medroso = { galinha: 60, gato: 50, sapo: 40, esquilo: 70, caranguejo: 45, cabra: 90, macaco: 70, pato: 50, garca: 80, ovelha: 40, porco: 35, tartaruga: 0, vaca: 0, cachorro: 0 }[k] || 0;
    a.mude -= dt;
    if (k === 'cachorro' && dp < 120 && dp > 22) { const ang = Math.atan2(P.y - a.y, P.x - a.x); a.vx = Math.cos(ang) * 50; a.vy = Math.sin(ang) * 50; a.st = 'anda'; if (Math.random() < dt * 0.3) Game.floatText && Game.floatText(a.x, a.y - 14, 'Au!', '#ffffff'); }
    else if (medroso && dp < medroso) {
      if (k === 'garca') { this.VOA.garca_voo = 1; a.k = 'garca_voo'; a.vx = (a.x > P.x ? 1 : -1) * 55; a.vy = -14; a.z = 10; a.dir = a.vx > 0 ? 1 : -1; this.VOA[a.k] = 1; return; }
      const ang = Math.atan2(a.y - P.y, a.x - P.x), v = k === 'tartaruga' ? 8 : k === 'sapo' ? 70 : k === 'caranguejo' ? 50 : 75;
      a.vx = Math.cos(ang) * v; a.vy = Math.sin(ang) * v; a.st = 'foge'; a.mude = 0.6;
    } else if (a.mude <= 0) {
      a.mude = 1 + Math.random() * 3;
      if (Math.random() < 0.45) { a.vx = 0; a.vy = 0; a.st = 'para'; }
      else { const ang = Math.random() * 6.28, v = { vaca: 8, ovelha: 10, porco: 14, tartaruga: 5, galinha: 18, pato: 12, cabra: 16, caranguejo: 22, sapo: 0 }[k] ?? 20; a.vx = Math.cos(ang) * v; a.vy = Math.sin(ang) * v * 0.7; a.st = 'anda'; if (k === 'sapo') { a.pulo = 0.35; const vv = 55; a.vx = Math.cos(ang) * vv; a.vy = Math.sin(ang) * vv; } }
    }
    if (k === 'sapo') { if (a.pulo > 0) a.pulo -= dt; else { a.vx = 0; a.vy = 0; } }
    if (a.vx) a.dir = a.vx > 0 ? 1 : -1;
    const lado = k === 'caranguejo' ? 1 : 1, nx = a.x + a.vx * dt * lado, ny = a.y + a.vy * dt;
    if (this.pode(W, k, nx, ny)) { a.x = nx; a.y = ny; } else { a.vx = -a.vx; a.vy = -a.vy; a.mude = 0.5; }
  },
  drawables(D, camX, camY, vw, vh) {
    for (const a of this.L) {
      const x = Math.round(a.x - camX), y = Math.round(a.y - camY);
      if (x < -30 || y < -40 || x > vw + 30 || y > vh + 40) continue;
      const voa = this.VOA[a.k];
      D.push({ y: voa ? a.y + 400 : a.y, fn: ctx => this.desenha(ctx, a, x, y) });
    }
  },
  desenha(ctx, a, x, y) {
    const d = a.dir, f = a.f, k = a.k, anda = Math.abs(a.vx) + Math.abs(a.vy) > 1;
    const p = (dx, dy, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(d > 0 ? x + dx : x - dx - w + 1, y + dy, w, h); };
    const sombra = (w) => { ctx.fillStyle = 'rgba(0,0,0,0.22)'; ctx.fillRect(x - w / 2, y, w, 2); };
    const passo = anda ? (Math.floor(f * 8) % 2) : 0;
    switch (k) {
      case 'galinha': { sombra(6); const c = a.cor, bica = a.st === 'para' && Math.floor(f * 2) % 3 === 0; p(-3, -5, c, 5, 4); p(1, bica ? -3 : -7, c, 2, 3); p(3, bica ? -2 : -6, '#e8a020'); p(2, bica ? -4 : -8, '#d02020'); p(-4, -6, shade(c, -0.15), 2, 2); p(-1, -1, '#e8a020', 1, 1 + passo); p(1, -1, '#e8a020', 1, 2 - passo); break; }
      case 'porco': { sombra(10); p(-5, -7, '#f0a0a0', 10, 6); p(4, -6, '#e88888', 3, 3); p(6, -5, '#c06060'); p(3, -8, '#e08080', 2, 2); p(-6, -6, '#e08080'); for (const [lx, o] of [[-4, passo], [-1, 1 - passo], [2, passo], [4, 1 - passo]]) p(lx, -1, '#d07878', 1, 1 + o); break; }
      case 'vaca': { sombra(14); const c = a.cor === 'malhada' ? '#f4f0e8' : a.cor; p(-7, -10, c, 13, 7); if (a.cor === 'malhada') { p(-5, -9, '#2a2420', 3, 3); p(0, -8, '#2a2420', 3, 2); } p(5, -12, c, 4, 5); p(8, -10, '#f0b0a0', 2, 2); p(5, -13, '#e8e0d0'); p(8, -13, '#e8e0d0'); for (const [lx, o] of [[-6, passo], [-3, 1 - passo], [2, passo], [4, 1 - passo]]) p(lx, -3, shade(c === '#f4f0e8' ? '#c8c0b0' : c, -0.2), 1, 3 + o); p(-8, -9, '#3a2a1a', 1, 4); break; }
      case 'ovelha': { sombra(10); p(-5, -9, '#f0ece4', 9, 6); p(-4, -10, '#f8f6f0', 7, 2); p(4, -9, '#3a3430', 3, 4); for (const [lx, o] of [[-4, passo], [-1, 1 - passo], [2, passo]]) p(lx, -3, '#3a3430', 1, 3 + o); break; }
      case 'cachorro': case 'gato': {
        sombra(9); const c = a.cor, g = k === 'gato';
        p(-4, -6, c, 8, 4); p(3, -9, c, 4, 4); p(g ? 3 : 4, -10, shade(c, -0.25), 1, g ? 2 : 1); p(6, -10, shade(c, -0.25), 1, g ? 2 : 1); p(5, -8, '#101010');
        p(-5, g ? -10 : -7, c, 1, g ? 4 : 2); if (!g) p(-6, -8 + passo, c);
        for (const [lx, o] of [[-3, passo], [-1, 1 - passo], [1, passo], [3, 1 - passo]]) p(lx, -2, shade(c, -0.15), 1, 2 + o); break;
      }
      case 'pato': { ctx.fillStyle = 'rgba(200,230,255,0.5)'; ctx.fillRect(x - 6, y, 12, 1); p(-4, -4, '#f0ece0', 7, 4); p(2, -7, '#2a7a3a', 3, 3); p(5, -6, '#e8a020', 2, 1); p(3, -6, '#101010'); p(-5, -4, '#c8c0b0'); break; }
      case 'peixe': {
        if (a.st !== 'pulo') { if (Math.floor(a.t * 2) % 7 === 0) { ctx.fillStyle = 'rgba(220,240,255,0.5)'; ctx.fillRect(x - 3, y, 6, 1); } break; }
        const h = Math.sin(a.p * Math.PI) * 14, xx = (a.p - 0.5) * 20 * d;
        ctx.save(); ctx.translate(x + xx, y - h); ctx.rotate((a.p - 0.5) * 1.6 * d); ctx.fillStyle = '#9ab8c8'; ctx.fillRect(-4, -1, 8, 3); ctx.fillStyle = '#c8e0e8'; ctx.fillRect(-3, -1, 5, 1); ctx.fillStyle = '#6a8a9a'; ctx.fillRect(d > 0 ? -6 : 4, -2, 2, 5); ctx.restore(); break;
      }
      case 'garca': { sombra(6); p(0, -2, '#2a2420', 1, 4); p(2, -2, '#2a2420', 1, 4); p(-2, -9, '#f4f4f0', 6, 6); p(3, -13, '#f4f4f0', 2, 5); p(4, -14, '#f4f4f0', 3, 2); p(7, -13, '#e8b020', 3, 1); p(5, -14, '#101010'); break; }
      case 'garca_voo': case 'arara': case 'morcego': {
        const asa = Math.sin(a.t * (k === 'morcego' ? 22 : 10)) > 0, yy = -(a.z || 20);
        if (k !== 'morcego') { ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fillRect(x - 3, y, 6, 2); }
        if (k === 'morcego') { p(-1, yy, '#2a2030', 3, 2); p(asa ? -4 : -3, yy - (asa ? 2 : -1), '#3a2a40', 3, 1); p(asa ? 2 : 2, yy - (asa ? 2 : -1), '#3a2a40', 3, 1); }
        else if (k === 'arara') { const c = a.cor; p(-3, yy, c, 6, 2); p(3, yy - 1, c, 2, 2); p(5, yy, '#202020'); p(-6, yy + 1, shade(c, -0.2), 3, 1); p(-2, yy + (asa ? -3 : 2), k === 'arara' ? '#20a040' : c, 4, 2); }
        else { p(-3, yy, '#f4f4f0', 6, 2); p(3, yy - 1, '#f4f4f0', 3, 1); p(-2, yy + (asa ? -3 : 2), '#e8e8e4', 4, 2); }
        break;
      }
      case 'jacare': {
        if (a.st === 'nada') { ctx.fillStyle = 'rgba(200,230,255,0.4)'; ctx.fillRect(x - 7, y, 14, 1); p(-4, -2, '#3e4a2a', 9, 2); p(3, -3, '#4a5a32', 2, 1); p(0, -3, '#4a5a32', 2, 1); p(3, -3, '#e0d040'); p(0, -3, '#e0d040'); break; }
        sombra(20); const boca = a.st === 'sol' && Math.floor(a.t / 3) % 3 === 0;
        p(-12, -3, '#3e4a2a', 7, 3); p(-5, -5, '#4a5a32', 12, 5); p(7, -4, '#4a5a32', 7, 3); if (boca) { p(9, -6, '#4a5a32', 5, 2); p(9, -4, '#c05050', 5, 1); }
        for (let i = -4; i < 6; i += 2) p(i, -6, '#2e3a1e'); p(8, -5, '#e0d040'); for (const lx of [-4, 4]) p(lx, -1, '#3e4a2a', 2, 2); break;
      }
      case 'sapo': { const pl = a.pulo > 0 ? -3 : 0; p(-2, -3 + pl, '#4a8a2a', 5, 3); p(-1, -4 + pl, '#5aa03a', 2, 1); p(2, -4 + pl, '#5aa03a', 2, 1); p(1, -5 + pl, '#101010'); p(3, -5 + pl, '#101010'); p(-3, -1 + pl, '#3a6a20', 2, 1); break; }
      case 'caranguejo': { const s = Math.floor(f * 10) % 2; p(-3, -3, '#d04020', 6, 3); p(-5, -4 + s, '#e05030', 2, 2); p(3, -4 + 1 - s, '#e05030', 2, 2); p(-1, -4, '#101010'); p(1, -4, '#101010'); for (const lx of [-3, -1, 1, 3]) p(lx, 0, '#b03018', 1, 1); break; }
      case 'tartaruga': { sombra(8); p(-4, -5, '#5a6a2a', 8, 4); p(-3, -6, '#6a7a34', 6, 1); p(-2, -4, '#4a5a24', 1, 2); p(1, -4, '#4a5a24', 1, 2); p(4, -4, '#8a9a5a', 2, 2); p(5, -4, '#101010'); break; }
      case 'macaco': { sombra(6); const s = Math.floor(f * 6) % 2; p(-2, -8, '#6a4a2a', 5, 5); p(2, -11, '#6a4a2a', 4, 4); p(3, -10, '#d8b088', 2, 2); p(4, -10, '#101010'); p(-4, -9 + s, '#6a4a2a', 1, 6); p(-5, -11 + s, '#6a4a2a', 2, 1); p(-1, -3, '#5a3a1a', 1, 3); p(2, -3, '#5a3a1a', 1, 3); break; }
      case 'cabra': { sombra(10); p(-5, -8, '#d8d0c0', 9, 5); p(3, -11, '#d8d0c0', 3, 4); p(3, -13, '#8a7a6a', 1, 2); p(5, -13, '#8a7a6a', 1, 2); p(5, -9, '#101010'); p(4, -7, '#a09888', 1, 2); for (const [lx, o] of [[-4, passo], [-1, 1 - passo], [2, passo]]) p(lx, -3, '#b0a898', 1, 3 + o); break; }
      case 'esquilo': { const s = anda ? Math.floor(f * 10) % 2 : 0; p(-1, -4 - s, '#b0602a', 4, 3); p(2, -6 - s, '#b0602a', 2, 2); p(3, -6 - s, '#101010'); p(-4, -8 - s, '#c87030', 3, 5); p(-3, -9 - s, '#d88040', 2, 2); break; }
    }
  }
};
(function () {
  const t0 = Inverno.tick; Inverno.tick = function (dt) { const r = t0.call(this, dt); try { Fauna.tick(dt); } catch (e) { } return r; };
  const d0 = Inverno.drawables; Inverno.drawables = function (D, camX, camY, vw, vh) { d0.call(this, D, camX, camY, vw, vh); try { Fauna.drawables(D, camX, camY, vw, vh); } catch (e) { } };
})();
