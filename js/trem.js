'use strict';
// =====================================================================
//  TRENS A VAPOR (só nos dois reinos humanos da pólvora: Aurelion e Ferrânia)
//  A ferrovia liga a capital às cidades do reino. O trem vai e volta o dia
//  todo, para nas estações e solta fumaça. Na estação você compra a
//  passagem e viaja dentro do trem até a outra cidade. Cuidado: quem
//  fica em cima do trilho leva uma pancada!
// =====================================================================
const TREM_REINOS = ['aurelion', 'ferrania'];
const TREM_V = 140, TREM_PARADA = 18, TREM_CARRO = 30, TREM_CARROS = 5, TREM_PRECO = 40;

const Trem = {
  st() { const S = War.st(); return S.trens || (S.trens = { linhas: [] }); },
  linhas() { return this.st().linhas.filter(l => l.path); },
  pts(l) {
    const c = this._pts || (this._pts = new Map()); let L = c.get(l.id);
    if (!L) {
      L = [[l.x0 * 16 + 8, l.y0 * 16 + 8]]; let x = l.x0, y = l.y0;
      for (const ch of l.path) { const d = EST_DIRS[ch.charCodeAt(0) - 97]; x += d[0]; y += d[1]; L.push([x * 16 + 8, y * 16 + 8]); }
      const cum = [0]; for (let i = 1; i < L.length; i++) cum.push(cum[i - 1] + Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]));
      L.cum = cum; c.set(l.id, L);
    }
    return L;
  },
  // ---------- planejar as linhas (uma vez por mundo, aos poucos) ----------
  planejar() {
    const S = this.st(); if (S.planejado) return;
    S.planejado = true;
    const W = Game.world;
    for (const k of TREM_REINOS) {
      const K = War.K[k]; if (!K || !K.cap) continue;
      const cap = K.cap, c0 = contAt(cap.mid.x, cap.mid.y);
      const cid = W.settlements.filter(s => s !== cap && War.ownerOf(s) === k && contAt(s.mid.x, s.mid.y) === c0).map(s => ({ s, d: dist(s.mid.x, s.mid.y, cap.mid.x, cap.mid.y) })).filter(o => o.d > 35 && o.d < 330).sort((a, b) => b.d - a.d);
      // as linhas vão até as cidades mais longe (até ~330 tiles): a viagem vale a pena
      const longe = cid.filter(o => o.d > 70), esc = (longe.length ? longe : cid).slice(0, 2);
      for (const o of esc) {
        const sa = this.estacao(cap, o.s), sb = this.estacao(o.s, cap); if (!sa || !sb) continue;
        S.linhas.push({ id: S.linhas.length + 1, k, a: cap.id, b: o.s.id, an: cap.name, bn: o.s.name, sa, sb });
      }
    }
  },
  // a estação fica do lado de fora do portão que olha para a outra cidade
  estacao(s, outra) {
    const W = Game.world; let g = null, bd = Infinity;
    for (const o of s.gates || []) { const d = dist(o.x, o.y, outra.mid.x, outra.mid.y); if (d < bd) { bd = d; g = o; } }
    if (!g) return null;
    const v = { n: [0, -1], s: [0, 1], w: [-1, 0], e: [1, 0] }[g.dir] || [0, 1];
    for (let r = 5; r < 14; r++) { const x = g.x + v[0] * r, y = g.y + v[1] * r, t = W.baseTile(x, y); if (!TSOLID[t] && !TWATER[t] && t !== T.LAVA && !Gestao.cidadeEm(W, x, y)) return [x, y]; }
    return null;
  },
  // busca o caminho da ferrovia por terra (atravessa rios com ponte), um pouco por quadro
  trabalhar() {
    const W = Game.world, l = this.st().linhas.find(l => !l.path && !l.falhou); if (!l) return;
    const K = (a, b) => a * 16384 + b;
    if (!this.job || this.job.id !== l.id) {
      const [ax, ay] = l.sa, [bx, by] = l.sb;
      this.job = { id: l.id, pai: new Map([[K(ax, ay), -1]]), fila: [ax, ay], h: 0, x0: Math.min(ax, bx) - 70, y0: Math.min(ay, by) - 70, x1: Math.max(ax, bx) + 70, y1: Math.max(ay, by) + 70 };
    }
    const J = this.job, [bx, by] = l.sb, alvo = K(bx, by);
    for (let n = 0; n < 5000 && J.h < J.fila.length; n++) {
      const cx = J.fila[J.h++], cy = J.fila[J.h++];
      if (K(cx, cy) === alvo) {
        const L = []; let k = alvo; while (k !== -1) { L.push([Math.floor(k / 16384), k % 16384]); k = J.pai.get(k); }
        L.reverse(); l.x0 = L[0][0]; l.y0 = L[0][1]; l.path = Gestao.codifica(L); this.job = null; this.aplicar(W, l, true);
        return;
      }
      for (const [dx, dy] of EST_DIRS) {
        const nx = cx + dx, ny = cy + dy, k = K(nx, ny);
        if (J.pai.has(k) || nx < J.x0 || ny < J.y0 || nx > J.x1 || ny > J.y1) continue;
        const t = W.baseTile(nx, ny); if (TSOLID[t] || t === T.DEEP || t === T.LAVA) continue;
        if (k !== alvo && Gestao.cidadeEm(W, nx, ny)) continue;
        J.pai.set(k, K(cx, cy)); J.fila.push(nx, ny);
      }
    }
    if (J.h >= J.fila.length || J.pai.size > 260000) { l.falhou = true; this.job = null; }
  },
  // ---------- os trilhos no mundo ----------
  aplicar(W, l, aoVivo) {
    const L = this.pts(l), TR = W.trilho || (W.trilho = new Map()), AO = W.trilhoAo || (W.trilhoAo = new Map()), sujos = new Set();
    const bit = (i, j) => { const dx = Math.sign(L[j][0] - L[i][0]), dy = Math.sign(L[j][1] - L[i][1]); return 1 << EST_DIRS.findIndex(d => d[0] === dx && d[1] === dy); };
    for (let i = 0; i < L.length; i++) {
      const x = (L[i][0] - 8) / 16, y = (L[i][1] - 8) / 16, k = W.ckey(x >> 5, y >> 5), idx = ((y & 31) << 5) | (x & 31);
      let m = 0; if (i > 0) m |= bit(i, i - 1); if (i < L.length - 1) m |= bit(i, i + 1);
      if (!TR.has(k)) TR.set(k, new Map()); TR.get(k).set(idx, (TR.get(k).get(idx) || 0) | m); sujos.add(k);
      for (const [dx, dy] of EST_DIRS) { const ax = x + dx, ay = y + dy, ak = W.ckey(ax >> 5, ay >> 5); if (!AO.has(ak)) AO.set(ak, new Set()); AO.get(ak).add(((ay & 31) << 5) | (ax & 31)); sujos.add(ak); }
    }
    if (aoVivo) for (const k of sujos) { W.chunks.delete(k); W.dropCanvas(k); if (W.pending && W.pending.k === k) W.pending = null; }
  },
  sync() {
    const W = Game.world; if (!W || this._w === W) return;
    this._w = W; W.trilho = new Map(); W.trilhoAo = new Map(); this._pts = new Map(); this.job = null;
    for (const l of this.linhas()) this.aplicar(W, l, true);
  },
  // ---------- o horário: onde está cada trem agora ----------
  horario(l) {
    const L = this.pts(l), total = L.cum[L.length - 1], len = TREM_CARRO * TREM_CARROS, viagem = Math.max(1, total - len), T = viagem / TREM_V, ciclo = 2 * (T + TREM_PARADA);
    if (l.ofs === undefined) l._ofs = l._ofs !== undefined ? l._ofs : hash2(l.id, 3, 7) * ciclo;
    const ofs = l.ofs !== undefined ? l.ofs : l._ofs;
    const u = (((Game.t + ofs) % ciclo) + ciclo) % ciclo;
    let p, dir, parado = false, onde = null, falta = 0;
    if (u < TREM_PARADA) { p = 0; dir = 1; parado = true; onde = 'a'; falta = TREM_PARADA - u; }
    else if (u < TREM_PARADA + T) { p = (u - TREM_PARADA) * TREM_V; dir = 1; }
    else if (u < 2 * TREM_PARADA + T) { p = viagem; dir = -1; parado = true; onde = 'b'; falta = 2 * TREM_PARADA + T - u; }
    else { p = viagem - (u - 2 * TREM_PARADA - T) * TREM_V; dir = -1; }
    return { L, p, dir, parado, onde, falta, len, total, ciclo, T, u };
  },
  noPonto(L, s) {
    const C = L.cum; s = clamp(s, 0, C[C.length - 1]);
    let lo = 0, hi = C.length - 1; while (hi - lo > 1) { const m = (lo + hi) >> 1; if (C[m] <= s) lo = m; else hi = m; }
    const a = L[lo], b = L[hi], k = C[hi] > C[lo] ? (s - C[lo]) / (C[hi] - C[lo]) : 0;
    return { x: a[0] + (b[0] - a[0]) * k, y: a[1] + (b[1] - a[1]) * k, ang: Math.atan2(b[1] - a[1], b[0] - a[0]) };
  },
  carros(l, H) {
    H = H || this.horario(l); const out = [];
    for (let j = 0; j < TREM_CARROS; j++) {
      const s = H.dir > 0 ? H.p + H.len - j * TREM_CARRO - TREM_CARRO / 2 : H.p + j * TREM_CARRO + TREM_CARRO / 2;
      const q = this.noPonto(H.L, s); q.ang = H.dir > 0 ? q.ang : q.ang + Math.PI; q.j = j; out.push(q);
    }
    return out;
  },
  perto(l, r) { const P = Game.player, L = this.pts(l); if (!L.bb) { let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9; for (const [x, y] of L) { x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y); } L.bb = [x0, y0, x1, y1]; } const b = L.bb; return P.x > b[0] - r && P.x < b[2] + r && P.y > b[1] - r && P.y < b[3] + r; },
  // ---------- quadro a quadro ----------
  tick(dt) {
    const G = Game; if (!G.started || !G.player || !G.world || !War.K) return;
    this.sync(); this.planejar(); this.trabalhar();
    const P = G.player;
    if (P.trem) return this.viajando(dt);
    if (!G.level || !G.level.isWorld) return;
    for (const l of this.linhas()) {
      if (!this.perto(l, 700)) continue;
      const H = this.horario(l), C = this.carros(l, H);
      this.fumaca(C[0], H, dt);
      if (H.parado) continue;
      // quem está no trilho é empurrado (e o herói leva uma pancada)
      for (const c of C) {
        if (dist(c.x, c.y, P.x, P.y) < 14 && !(P.invuln > 0) && !G.godMode) {
          const a = c.ang + Math.PI / 2 * (((P.x - c.x) * Math.cos(c.ang + Math.PI / 2) + (P.y - c.y) * Math.sin(c.ang + Math.PI / 2)) >= 0 ? 1 : -1);
          P.x += Math.cos(a) * 22; P.y += Math.sin(a) * 22; G.findFree(P); P.invuln = 1;
          P.hp = Math.max(1, P.hp - P.stat.maxHp * 0.1); G.shake = 6; Sfx.play('hurt'); G.toast('🚂 Cuidado com o trem!', '#ffb080');
        }
        for (const a of G.actors) { if (a.dead || a.fly || dist(c.x, c.y, a.x, a.y) > 12) continue; const k = Math.atan2(a.y - c.y, a.x - c.x); moveActor(a, Math.cos(k) * 6, Math.sin(k) * 6); }
      }
    }
  },
  fumaca(loco, H, dt) {
    const G = Game; this._fT = (this._fT || 0) - dt; if (this._fT > 0) return;
    this._fT = H.parado ? 0.5 : 0.09;
    const fx = Math.cos(loco.ang) * 9;
    G.particle(loco.x + fx + (Math.random() - 0.5) * 3, loco.y - 26, -Math.cos(loco.ang) * (H.parado ? 4 : 30) + (Math.random() - 0.5) * 10, -18 - Math.random() * 12, H.parado ? 'rgba(235,235,240,0.7)' : 'rgba(80,80,88,0.65)', 1.4);
  },
  // ---------- viagem do herói ----------
  embarcar(l, de) {
    const G = Game, P = G.player;
    if (P.gold < TREM_PRECO) return G.toast('Ouro insuficiente para a passagem.', '#ff8080');
    P.gold -= TREM_PRECO; Sfx.play('coin');
    const H = this.horario(l), alvoU = de === 'a' ? TREM_PARADA - 2.5 : 2 * TREM_PARADA + H.T - 2.5;
    l.ofs = alvoU - Game.t;   // o trem já está na plataforma esperando você
    P.mounted = false; P.trem = { id: l.id, para: de === 'a' ? 'b' : 'a', saiu: false };
    UI.close(); G.toast(`🚂 Todos a bordo! Destino: ${de === 'a' ? l.bn : l.an}`, '#ffe0a0');
  },
  viajando(dt) {
    const G = Game, P = G.player, l = this.linhas().find(l => l.id === P.trem.id);
    if (!l || !G.level.isWorld) { P.trem = null; return; }
    const H = this.horario(l), C = this.carros(l, H), c = C[2];
    P.x = c.x; P.y = c.y; P.invuln = 0.5; P.moving = false;
    this.fumaca(C[0], H, dt);
    if (!H.parado) P.trem.saiu = true;
    if (P.trem.saiu && H.parado && H.onde === P.trem.para) this.descer(l, P.trem.para);
  },
  descer(l, onde) {
    const G = Game, P = G.player, c = onde === 'a' ? l.sa : l.sb;
    P.trem = null; P.x = c[0] * 16 + 8 + 20; P.y = c[1] * 16 + 8 + 20; G.findFree(P);
    G.toast(`🚉 Chegamos: ${onde === 'a' ? l.an : l.bn}`, '#ffe0a0'); Sfx.play('quest');
  },
  bilheteria(l, de) {
    const K = War.K[l.k], P = Game.player, H = this.horario(l), aqui = de === 'a' ? l.an : l.bn, para = de === 'a' ? l.bn : l.an;
    if (K && War.atWar(War.playerSide() || 'x', l.k)) return UI.dialog('Bilheteiro', null, `A ferrovia é de ${esc(K.name)}. Inimigos do reino não embarcam!`, [{ label: 'Sair' }]);
    const prox = H.parado && H.onde === de ? 'o trem está na plataforma agora!' : `o próximo trem chega em uns ${Math.ceil(((de === 'a' ? 0 : TREM_PARADA + H.T) - H.u + H.ciclo) % H.ciclo)} segundos`;
    UI.dialog('Estação de ' + aqui, null, `🚂 <b>Ferrovia de ${esc(K ? K.short : '')}</b>: ${esc(aqui)} ⇄ ${esc(para)}<br>Passagem: <b class="gold">${TREM_PRECO} ouro</b> • ${prox}<br><span class="dim small">A viagem leva uns ${Math.round(H.T)} segundos, bem mais rápido que a pé.</span>`, [
      { label: `🎫 Comprar passagem para ${para} (${TREM_PRECO} ouro)`, cls: 'gold', fn: () => this.embarcar(l, de) },
      { label: 'Sair' }
    ]);
    void P;
  },
  findInteract(fx, fy) {
    const P = Game.player;
    if (P.trem) { const l = this.linhas().find(l => l.id === P.trem.id); return l ? { kind: 'mar', fn: () => { const H = this.horario(l), C = this.carros(l, H); P.trem = null; P.x = C[2].x + 24; P.y = C[2].y + 10; Game.findFree(P); Game.toast('Você desceu do trem.', '#ffe0a0'); }, label: 'Descer', name: 'do trem', d: 1, prio: true } : null; }
    if (!Game.level.isWorld) return null;
    for (const l of this.linhas()) for (const de of ['a', 'b']) {
      const e = this.predio(l, de);
      if (dist(fx, fy, e.x, e.y + 6) < 30) return { kind: 'mar', fn: () => this.bilheteria(l, de), label: 'Trem', name: 'Estação de ' + (de === 'a' ? l.an : l.bn), d: 5 };
    }
    return null;
  },
  // o prédio da estação fica do lado do trilho, no começo (ou no fim) da linha
  predio(l, de) {
    const L = this.pts(l), i = de === 'a' ? 0 : L.length - 1, j = de === 'a' ? Math.min(4, L.length - 1) : Math.max(0, L.length - 5);
    const ang = Math.atan2(L[j][1] - L[i][1], L[j][0] - L[i][0]), px = -Math.sin(ang), py = Math.cos(ang);
    const meio = this.noPonto(L, de === 'a' ? 70 : L.cum[L.length - 1] - 70);
    return { x: meio.x + px * 34, y: meio.y + py * 34 + 8 };
  },
  // ---------- desenho ----------
  trilhoImg(m) {
    const c = this._ti || (this._ti = new Map()); let im = c.get(m); if (im) return im;
    im = Sprites.cv(16, 16); const x = im.getContext('2d'), p = (a, b, cor) => { if (a >= 0 && b >= 0 && a < 16 && b < 16) { x.fillStyle = cor; x.fillRect(a, b, 1, 1); } };
    for (let k = 0; k < 8; k++) {
      if (!(m & (1 << k))) continue;
      const [dx, dy] = EST_DIRS[k], diag = dx && dy, qx = -dy, qy = dx;
      for (let s = 0; s <= 8; s++) {
        const bx = 8 + s * dx, by = 8 + s * dy;
        if (s % 4 === 1) for (let o = diag ? -3 : -5; o <= (diag ? 3 : 5); o++) { p(bx + o * qx, by + o * qy, '#5a3a1e'); if (diag) p(bx + o * qx + 1, by + o * qy, '#6a4424'); }
        for (const r of diag ? [-2, 2] : [-3, 3]) { p(bx + r * qx, by + r * qy, '#9a9aa4'); if (!diag) p(bx + r * qx + (dy ? 0 : 0), by + r * qy, '#9a9aa4'); }
        if (diag) for (const r of [-2, 2]) p(bx + r * qx + 1, by + r * qy, '#c8c8d0');
      }
    }
    c.set(m, im); return im;
  },
  carroImg(j, lado) {
    const k = j + ':' + lado, c = this._ci || (this._ci = new Map()); let im = c.get(k); if (im) return im;
    const cores = ['#2a2a30', '#2a2a30', '#3a6a4a', '#8a3030', '#3a4a7a'];
    if (lado === 'h') {
      // vista de lado (indo para a direita)
      if (j === 0) im = this.desenha(34, 26, (p) => {
        p(2, 10, '#1e1e24', 22, 9); p(2, 10, '#3a3a44', 22, 2); for (const x of [6, 12, 18]) p(x, 10, '#c8a040', 1, 9);
        p(22, 3, '#1e1e24', 10, 16); p(23, 5, '#e8d080', 4, 4); p(22, 2, '#5a1a1a', 11, 2);
        p(5, 4, '#1e1e24', 4, 6); p(4, 3, '#3a3a44', 6, 2);
        p(0, 17, '#8a8a90', 3, 3); p(0, 19, '#c03030', 2, 2);
        for (const x of [5, 13, 21, 27]) { p(x, 19, '#a02020', 5, 5); p(x + 1, 20, '#e04040', 3, 3); p(x + 2, 21, '#1e1e24', 1, 1); }
        p(3, 20, '#6a6a70', 28, 1); p(2, 14, '#f0e070', 1, 2);
      });
      else if (j === 1) im = this.desenha(28, 22, (p) => { p(1, 8, '#2a2a30', 26, 9); p(1, 8, '#4a4a54', 26, 1); p(3, 4, '#141418', 22, 5); p(5, 3, '#2a2a2e', 6, 2); p(14, 2, '#24242a', 7, 3); for (const x of [3, 19]) { p(x, 16, '#a02020', 5, 5); p(x + 1, 17, '#e04040', 3, 3); } });
      else im = this.desenha(28, 22, (p) => { const b = cores[j]; p(1, 4, b, 26, 13); p(0, 2, '#3a2a20', 28, 3); p(1, 4, shade(b, 0.2), 26, 1); for (const x of [4, 11, 18]) { p(x, 7, '#f0e0a0', 5, 4); p(x, 7, '#c8b070', 5, 1); } p(1, 15, shade(b, -0.3), 26, 2); p(24, 7, '#2a1a14', 2, 8); for (const x of [3, 19]) { p(x, 16, '#3a3a40', 5, 5); p(x + 1, 17, '#6a6a74', 3, 3); } });
    } else {
      // vista de frente / de trás (indo para cima ou para baixo)
      if (j === 0) im = this.desenha(20, 28, (p) => { p(3, 6, '#1e1e24', 14, 18); p(4, 8, '#3a3a44', 12, 12); p(7, 9, '#f0e070', 6, 5); p(8, 10, '#fffab0', 4, 3); p(8, 0, '#1e1e24', 4, 7); p(7, 0, '#3a3a44', 6, 1); p(2, 22, '#8a8a90', 16, 3); p(3, 25, '#a02020', 4, 3); p(13, 25, '#a02020', 4, 3); p(5, 17, '#c8a040', 10, 1); });
      else im = this.desenha(18, 24, (p) => { const b = cores[j]; p(1, 4, b, 16, 17); p(0, 2, '#3a2a20', 18, 3); p(6, 8, '#2a1a14', 6, 11); p(2, 7, '#f0e0a0', 3, 4); p(13, 7, '#f0e0a0', 3, 4); p(2, 21, '#3a3a40', 4, 3); p(12, 21, '#3a3a40', 4, 3); });
    }
    c.set(k, im); return im;
  },
  desenha(w, h, fn) { const c = Sprites.cv(w, h), x = c.getContext('2d'); fn((a, b, cor, ww = 1, hh = 1) => { x.fillStyle = cor; x.fillRect(a, b, ww, hh); }); return c; },
  estacaoImg() {
    if (this._ei) return this._ei;
    return (this._ei = this.desenha(40, 36, (p) => {
      p(0, 30, '#6a4a2a', 40, 6); for (let x = 0; x < 40; x += 4) p(x, 30, '#5a3a1e', 1, 6);
      p(4, 12, '#a04a30', 32, 18); for (let y = 14; y < 30; y += 3) p(4, y, '#8a3a24', 32, 1);
      p(1, 6, '#3a3a44', 38, 7); p(3, 4, '#4a4a54', 34, 3); p(1, 6, '#5a5a64', 38, 1);
      p(17, 7, '#f0f0e8', 6, 5); p(19, 8, '#1e1e24', 1, 2); p(20, 9, '#1e1e24', 2, 1);
      p(8, 17, '#f0e0a0', 6, 6); p(26, 17, '#f0e0a0', 6, 6); p(17, 18, '#3a2414', 6, 12);
      p(10, 13, '#2a2420', 20, 3); p(12, 14, '#e8d080', 16, 1);
      p(37, 14, '#2a2a30', 1, 16); p(35, 12, '#f0d060', 4, 3);
    }));
  },
  drawables(D, camX, camY, vw, vh) {
    const W = Game.world; if (!W.trilho || !W.trilho.size) return;
    const cx0 = Math.floor((camX - 16) / 512), cy0 = Math.floor((camY - 16) / 512), cx1 = Math.floor((camX + vw + 16) / 512), cy1 = Math.floor((camY + vh + 16) / 512);
    const vis = [];
    for (let cy = cy0; cy <= cy1; cy++) for (let cx = cx0; cx <= cx1; cx++) { const M = W.trilho.get(W.ckey(cx, cy)); if (M) vis.push([cx, cy, M]); }
    if (vis.length) D.push({ y: -2e9, fn: (ctx) => {
      for (const [cx, cy, M] of vis) for (const [i, m] of M) {
        const x = (cx * 32 + (i & 31)) * 16 - camX, y = (cy * 32 + (i >> 5)) * 16 - camY;
        if (x < -16 || y < -16 || x > vw || y > vh) continue;
        ctx.drawImage(this.trilhoImg(m), Math.round(x), Math.round(y));
      }
    } });
    const P = Game.player;
    for (const l of this.linhas()) {
      if (!this.perto(l, 500)) continue;
      for (const de of ['a', 'b']) {
        const e = this.predio(l, de), im = this.estacaoImg();
        if (e.x < camX - 60 || e.x > camX + vw + 60 || e.y < camY - 60 || e.y > camY + vh + 60) continue;
        D.push({ y: e.y, img: im, x: Math.round(e.x - im.width / 2), yy: Math.round(e.y - im.height + 4) });
      }
      for (const c of this.carros(l)) {
        if (c.x < camX - 40 || c.x > camX + vw + 40 || c.y < camY - 40 || c.y > camY + vh + 40) continue;
        const hz = Math.abs(Math.cos(c.ang)) >= 0.55, im = this.carroImg(c.j, hz ? 'h' : 'v'), flip = hz && Math.cos(c.ang) < 0;
        D.push({ y: c.y + 6, fn: (ctx) => {
          const x = Math.round(c.x - camX), y = Math.round(c.y - camY);
          ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x - im.width / 2 + 2, y + 3, im.width - 4, 4);
          if (flip) { ctx.save(); ctx.translate(x, 0); ctx.scale(-1, 1); ctx.drawImage(im, -Math.round(im.width / 2), y - im.height + 6); ctx.restore(); }
          else ctx.drawImage(im, x - Math.round(im.width / 2), y - im.height + 6);
          if (P.trem && P.trem.id === l.id && c.j === 2) { ctx.fillStyle = '#f0c8a0'; ctx.fillRect(x - 2, y - 16, 4, 4); }
        } });
      }
    }
  },
  drawMap(ctx, toS) {
    for (const l of this.linhas()) {
      const L = this.pts(l); ctx.strokeStyle = '#2a2a30'; ctx.lineWidth = 2; ctx.setLineDash([3, 2]); ctx.beginPath();
      for (let i = 0; i < L.length; i += 4) { const [x, y] = toS(L[i][0] / 16, L[i][1] / 16); if (i) ctx.lineTo(x, y); else ctx.moveTo(x, y); }
      const [ex, ey] = toS(L[L.length - 1][0] / 16, L[L.length - 1][1] / 16); ctx.lineTo(ex, ey); ctx.stroke(); ctx.setLineDash([]);
    }
  }
};

// ---------------- ganchos ----------------
(function () {
  // o chão da ferrovia: cascalho (e ponte nos rios), sem árvores em volta
  const gc0 = World.prototype.genChunk;
  World.prototype.genChunk = function (cx, cy) {
    const r = gc0.call(this, cx, cy), k = this.ckey(cx, cy);
    const M = this.trilho && this.trilho.get(k);
    if (M) for (const i of M.keys()) { const t = r.tiles[i]; r.tiles[i] = TWATER[t] ? T.BRIDGE : (t === T.ROAD || t === T.PAVED || t === T.BRIDGE) ? t : T.DIRT; r.objs[i] = 0; }
    const A = this.trilhoAo && this.trilhoAo.get(k);
    if (A) for (const i of A) if (OSOLID[r.objs[i]] && r.objs[i] !== O.BLOCK) r.objs[i] = 0;
    return r;
  };
  const fi0 = Muralhas.findInteract; Muralhas.findInteract = function (fx, fy) { return Trem.findInteract(fx, fy) || fi0.call(this, fx, fy); };
  // o herói dentro do trem não aparece andando no trilho
  const pd0 = Player.prototype.draw; Player.prototype.draw = function () { if (this.trem) return; return pd0.apply(this, arguments); };
  const m0 = War.drawMap; War.drawMap = function (ctx, toS, z) { m0.call(this, ctx, toS, z); Trem.drawMap(ctx, toS); };
})();
