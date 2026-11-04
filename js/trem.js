'use strict';
// =====================================================================
//  TRENS A VAPOR (só nos dois reinos humanos da pólvora: Aurelion e Ferrânia)
//  A ferrovia liga a capital às cidades do reino. O trem vai e volta o dia
//  todo, para nas estações e solta fumaça. Na estação você compra a
//  passagem e viaja dentro do trem até a outra cidade. Cuidado: quem
//  fica em cima do trilho leva uma pancada!
// =====================================================================
const TREM_REINOS = ['aurelion', 'ferrania'];
const TREM_V = 140, TREM_PARADA = 18, TREM_CARRO = 44, TREM_CARROS = 4, TREM_PRECO = 40;

const Trem = {
  st() { const S = War.st(); return S.trens || (S.trens = { linhas: [] }); },
  linhas() { return this.st().linhas.filter(l => l.path); },
  ptsCru(l) {
    const c = this._pc || (this._pc = new Map()); let L = c.get(l.id);
    if (!L) { L = [[l.x0 * 16 + 8, l.y0 * 16 + 8]]; let x = l.x0, y = l.y0; for (const ch of l.path) { const d = EST_DIRS[ch.charCodeAt(0) - 97]; x += d[0]; y += d[1]; L.push([x * 16 + 8, y * 16 + 8]); } c.set(l.id, L); }
    return L;
  },
  // a ferrovia desenhada e percorrida é uma curva suave (média dos tiles vizinhos), como trilho de verdade
  pts(l) {
    const c = this._pts || (this._pts = new Map()); let L = c.get(l.id);
    if (!L) {
      let A = this.ptsCru(l);
      for (let pass = 0; pass < 3; pass++) { const B = A.map((q, i) => { if (i < 2 || i > A.length - 3) return q; let sx = 0, sy = 0, n = 0; for (let k = -3; k <= 3; k++) { const r = A[clamp(i + k, 0, A.length - 1)]; sx += r[0]; sy += r[1]; n++; } return [sx / n, sy / n]; }); A = B; }
      L = A; const cum = [0]; for (let i = 1; i < L.length; i++) cum.push(cum[i - 1] + Math.hypot(L[i][0] - L[i - 1][0], L[i][1] - L[i - 1][1]));
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
    const L = this.ptsCru(l), TR = W.trilho || (W.trilho = new Map()), AO = W.trilhoAo || (W.trilhoAo = new Map()), sujos = new Set();
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
    this._w = W; W.trilho = new Map(); W.trilhoAo = new Map(); this._pts = new Map(); this._pc = new Map(); this.job = null;
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
    const F = this.puffs; if (F) for (let i = F.length - 1; i >= 0; i--) { const f = F[i]; f.t += dt; f.x += f.vx * dt; f.y += f.vy * dt; f.vy *= 0.98; if (f.t > f.vida) F.splice(i, 1); }
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
    this._fT = (this._fT || 0) - dt; if (this._fT > 0) return;
    this._fT = H.parado ? 0.5 : 0.16;
    const c = Math.cos(loco.ang), sn = Math.sin(loco.ang), k = 14;   // a chaminé fica na frente da locomotiva
    const F = this.puffs || (this.puffs = []);
    F.push({ x: loco.x + c * k + (Math.random() - 0.5) * 2, y: loco.y + sn * k - 28, vx: (H.parado ? 0 : c * TREM_V * 0.82) + (Math.random() - 0.5) * 8, vy: (H.parado ? 0 : sn * TREM_V * 0.82) - 24 - Math.random() * 10, r: 3, t: 0, vida: H.parado ? 2 : 1.1 });
    if (F.length > 60) F.shift();
  },
  // ---------- viagem do herói ----------
  embarcar(l, de) {
    const G = Game, P = G.player;
    if (P.gold < TREM_PRECO) return G.toast('Ouro insuficiente para a passagem.', '#ff8080');
    P.gold -= TREM_PRECO; Sfx.play('coin');
    const H = this.horario(l), alvoU = de === 'a' ? TREM_PARADA - 2.5 : 2 * TREM_PARADA + H.T - 2.5;
    l.ofs = alvoU - Game.t;   // o trem já está na plataforma esperando você
    P.mounted = false; P.trem = { id: l.id, para: de === 'a' ? 'b' : 'a', saiu: false, chegada: Game.t + 2.5 + H.T + 0.5 };
    UI.close(); G.toast(`🚂 Todos a bordo! Destino: ${de === 'a' ? l.bn : l.an}`, '#ffe0a0');
  },
  viajando(dt) {
    const G = Game, P = G.player, l = this.linhas().find(l => l.id === P.trem.id);
    if (!l || !G.level.isWorld) { P.trem = null; return; }
    const H = this.horario(l), C = this.carros(l, H), c = C[2];
    P.x = c.x; P.y = c.y; P.invuln = 0.5; P.moving = false;
    this.fumaca(C[0], H, dt);
    if (!H.parado) P.trem.saiu = true;
    // chega na hora marcada (mesmo que o jogo tenha ficado pausado no caminho)
    if ((P.trem.saiu && H.parado && H.onde === P.trem.para) || (P.trem.chegada && Game.t >= P.trem.chegada)) this.descer(l, P.trem.para);
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
  // ---------- o trem em 3D: cada vagão é uma caixa com textura no lado, no teto e nas pontas ----------
  // (vale para qualquer ângulo do trilho: reto, diagonal, subindo ou descendo a tela)
  texturas() {
    if (this._tx) return this._tx;
    const D = (w, h, fn) => this.desenha(w, h, fn), ouro = '#d8a838', ouroE = '#8a6420', vidro = '#ffd870', brilho = '#fff2b0';
    const roda = (p, cx, cy, r, aro, cubo) => { for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) { const d = x * x + y * y; if (d <= r * r + 0.5) p(cx + x, cy + y, d >= (r - 0.6) * (r - 0.6) ? '#121216' : aro); } p(cx, cy, cubo); if (r >= 3) { p(cx - r + 1, cy, '#121216'); p(cx + r - 1, cy, '#121216'); p(cx, cy - r + 1, '#121216'); p(cx, cy + r - 1, '#121216'); } };
    const vagao = (cor) => {
      const esc = shade(cor, -0.35), cla = shade(cor, 0.22);
      return {
        side: D(40, 22, p => {
          p(0, 0, cor, 40, 16); p(0, 0, cla, 40, 1); p(0, 2, ouro, 40, 1); p(0, 13, ouro, 40, 1); p(0, 15, esc, 40, 1);
          for (const x of [3, 11, 19, 27]) { p(x, 4, '#2a1a10', 7, 8); p(x + 1, 5, vidro, 5, 6); p(x + 1, 5, brilho, 2, 2); p(x + 1, 10, '#e0b050', 5, 1); }
          p(35, 3, '#3a2414', 4, 11); p(36, 5, vidro, 2, 3);
          p(1, 16, '#16161c', 38, 3); p(3, 19, '#1e1e24', 34, 1);
          for (const x of [6, 12, 27, 33]) roda(p, x, 19, 2.6, '#3a3a44', '#c03030');
        }),
        top: D(40, 14, p => { p(0, 0, '#2a2c38', 40, 14); p(0, 0, '#1a1a24', 40, 1); p(0, 13, '#14141c', 40, 1); p(0, 6, '#3c3e4e', 40, 2); p(0, 5, '#33354a', 40, 1); for (const x of [7, 18, 29]) { p(x, 5, '#4a4c5c', 4, 4); p(x, 5, '#62647a', 4, 1); p(x + 1, 7, '#1a1a24', 2, 1); } }),
        end: D(14, 22, p => { p(0, 0, cor, 14, 16); p(0, 0, cla, 14, 1); p(0, 2, ouro, 14, 1); p(0, 13, ouro, 14, 1); p(4, 3, '#3a2414', 6, 12); p(5, 4, vidro, 4, 4); p(5, 4, brilho, 2, 1); p(0, 16, '#16161c', 14, 3); p(1, 17, '#5a5a64', 2, 2); p(11, 17, '#5a5a64', 2, 2); })
      };
    };
    const T = this._tx = { vagoes: [null, vagao('#2f5a3a'), vagao('#7a2228'), vagao('#2a3256')] };
    T.cab = {
      side: D(12, 26, p => { p(0, 0, '#22222a', 12, 3); p(0, 0, '#3a3a46', 12, 1); p(0, 3, '#8a2228', 12, 17); p(0, 3, '#a83038', 12, 1); p(2, 6, '#2a1a10', 8, 7); p(3, 7, vidro, 6, 5); p(3, 7, brilho, 2, 2); p(0, 15, ouro, 12, 1); p(0, 19, ouroE, 12, 1); p(0, 20, '#16161c', 12, 3); roda(p, 6, 23, 2.6, '#a82020', '#f0d070'); }),
      top: D(12, 14, p => { p(0, 0, '#22222a', 12, 14); p(0, 0, '#3a3a46', 12, 1); p(0, 13, '#121216', 12, 1); p(0, 6, '#303040', 12, 2); }),
      end: D(14, 26, p => { p(0, 0, '#22222a', 14, 3); p(0, 3, '#8a2228', 14, 17); p(0, 3, '#a83038', 14, 1); p(3, 6, '#2a1a10', 8, 6); p(4, 7, vidro, 6, 4); p(0, 15, ouro, 14, 1); p(0, 20, '#16161c', 14, 6); })
    };
    T.caldeira = {
      side: D(28, 20, p => {
        p(0, 0, '#1c1c24', 28, 12); p(0, 1, '#3e3e4c', 28, 2); p(0, 0, '#2a2a34', 28, 1); p(0, 10, '#121218', 28, 2);
        for (const x of [5, 13, 21]) { p(x, 0, ouro, 2, 12); p(x, 0, '#f0d070', 1, 12); }
        p(25, 2, '#2a2a34', 3, 6); p(26, 3, '#ffe070', 2, 3);
        p(0, 12, '#2a2a30', 28, 2);
        roda(p, 6, 15, 4.4, '#a82020', '#f0d070'); roda(p, 16, 15, 4.4, '#a82020', '#f0d070'); roda(p, 24, 17, 2.6, '#a82020', '#f0d070');
        p(6, 15, '#c8c8d2', 11, 1); p(6, 16, '#6a6a74', 11, 1);
        for (let i = 0; i < 5; i++) p(23 + i, 14 + i, '#c02828', 5 - i > 0 ? 1 : 1, 1); p(27, 13, '#e04040', 1, 6);
      }),
      top: D(28, 11, p => { p(0, 0, '#1c1c24', 28, 11); p(0, 4, '#3a3a48', 28, 2); p(0, 0, '#121218', 28, 1); p(0, 10, '#121218', 28, 1); for (const x of [5, 13, 21]) p(x, 0, ouro, 2, 11); }),
      end: D(11, 20, p => { p(0, 0, '#1c1c24', 11, 12); p(1, 1, '#2e2e3a', 9, 10); p(3, 2, '#2a2a34', 5, 5); p(4, 3, '#ffe070', 3, 3); p(5, 3, '#fffac0', 1, 1); p(3, 8, ouro, 5, 2); p(0, 12, '#2a2a30', 11, 2); for (let y = 14; y < 20; y++) p(y - 14, y, '#c02828', 11 - 2 * (y - 14) > 0 ? 11 - 2 * (y - 14) : 1, 1); p(0, 14, '#e04040', 11, 1); })
    };
    T.chamine = { side: D(5, 10, p => { p(0, 0, '#3a3a46', 5, 2); p(0, 2, '#1a1a22', 5, 8); p(0, 2, '#2e2e3a', 1, 8); }), top: D(5, 5, p => { p(0, 0, '#3a3a46', 5, 5); p(1, 1, '#08080a', 3, 3); }), end: D(5, 10, p => { p(0, 0, '#3a3a46', 5, 2); p(0, 2, '#1a1a22', 5, 8); p(0, 2, '#2e2e3a', 1, 8); }) };
    T.domo = { side: D(6, 4, p => { p(0, 0, '#f0d070', 6, 1); p(0, 1, ouro, 6, 3); }), top: D(6, 6, p => { p(0, 0, ouro, 6, 6); p(1, 1, '#f0d070', 3, 3); }), end: D(6, 4, p => { p(0, 0, '#f0d070', 6, 1); p(0, 1, ouro, 6, 3); }) };
    return T;
  },
  // as caixas de cada carro: [textura, centro ao longo do trilho, comprimento, largura, altura, altura da base]
  caixas(j) {
    const T = this.texturas();
    if (j === 0) return [[T.cab, -14, 12, 13, 25, 0], [T.caldeira, 6, 28, 10, 17, 0], [T.domo, 4, 6, 6, 4, 17], [T.chamine, 15, 5, 5, 10, 17]];
    return [[T.vagoes[j], 0, 40, 12, 22, 0]];
  },
  caixa(ctx, X, Y, dx, dy, nx, ny, B) {
    const [tx, uc, L, W, H, z0] = B, cx = X + dx * uc, cy = Y + dy * uc;
    const face = (img, a, b, c, d, e, f) => { ctx.setTransform(a, b, c, d, e, f); ctx.drawImage(img, 0, 0); };
    // lado virado para a câmera: comprimento ao longo do trilho, altura para cima
    face(tx.side, dx * L / tx.side.width, dy * L / tx.side.width, 0, H / tx.side.height, cx + nx * W / 2 - dx * L / 2, cy + ny * W / 2 - dy * L / 2 - H - z0);
    // a ponta que aparece (a frente se o trem desce a tela, a traseira se sobe)
    const s = dy >= 0 ? 1 : -1, ue = s * L / 2;
    if (Math.abs(dy) > 0.05) face(tx.end, nx * W / tx.end.width, ny * W / tx.end.width, 0, H / tx.end.height, cx + dx * ue - nx * W / 2, cy + dy * ue - ny * W / 2 - H - z0);
    // o teto, visto de cima
    face(tx.top, dx * L / tx.top.width, dy * L / tx.top.width, nx * W / tx.top.height, ny * W / tx.top.height, cx - dx * L / 2 - nx * W / 2, cy - dy * L / 2 - ny * W / 2 - H - z0);
  },
  desenhaCarro(ctx, c, X, Y) {
    const dx = Math.cos(c.ang), dy = Math.sin(c.ang);
    // a lateral visível é a que olha para baixo da tela
    let nx = -dy, ny = dx; if (ny < 0 || (Math.abs(ny) < 1e-3 && nx > 0)) { nx = -nx; ny = -ny; }
    const B = this.caixas(c.j), L = c.j === 0 ? 42 : 40, W = 14;
    ctx.save();
    // sombra no chão
    ctx.fillStyle = 'rgba(0,0,0,0.3)'; ctx.beginPath();
    for (const [u, w] of [[-1, -1], [1, -1], [1, 1], [-1, 1]]) { const x = X + dx * u * L / 2 + nx * w * W / 2 + 2, y = Y + dy * u * L / 2 + ny * w * W / 2 + 2; if (u === -1 && w === -1) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
    ctx.fill();
    const chao = B.filter(b => !b[5]).sort((a, b) => dy * a[1] - dy * b[1]), alto = B.filter(b => b[5]);
    for (const b of chao.concat(alto)) this.caixa(ctx, X, Y, dx, dy, nx, ny, b);
    ctx.restore();
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
  // os trechos visíveis da curva da ferrovia
  visiveis(L, camX, camY, vw, vh) {
    const out = []; let ini = -1;
    for (let i = 0; i < L.length; i += 2) {
      const v = L[i][0] > camX - 40 && L[i][0] < camX + vw + 40 && L[i][1] > camY - 40 && L[i][1] < camY + vh + 40;
      if (v && ini < 0) ini = Math.max(0, i - 2); if (!v && ini >= 0) { out.push([ini, Math.min(L.length - 1, i + 2)]); ini = -1; }
    }
    if (ini >= 0) out.push([ini, L.length - 1]);
    return out;
  },
  trilhoCurva(ctx, L, a, b, camX, camY) {
    const linha = (off, cor, w) => {
      ctx.strokeStyle = cor; ctx.lineWidth = w; ctx.beginPath();
      for (let i = a; i <= b; i++) { const q = L[i], r = L[Math.min(L.length - 1, i + 1)], o = L[Math.max(0, i - 1)], ang = Math.atan2(r[1] - o[1], r[0] - o[0]), nx = -Math.sin(ang), ny = Math.cos(ang), x = q[0] + nx * off - camX, y = q[1] + ny * off - camY; if (i === a) ctx.moveTo(x, y); else ctx.lineTo(x, y); }
      ctx.stroke();
    };
    ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    // cascalho
    linha(0, '#5e5446', 17); linha(0, '#8a7e6a', 14); linha(0, '#a09480', 9);
    // dormentes de madeira, um a cada 7 px
    const C = L.cum;
    for (let s = Math.ceil(C[a] / 7) * 7; s < C[b]; s += 7) {
      const q = this.noPonto(L, s), nx = -Math.sin(q.ang), ny = Math.cos(q.ang), x = q.x - camX, y = q.y - camY;
      ctx.strokeStyle = '#3e2614'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - nx * 7, y - ny * 7); ctx.lineTo(x + nx * 7, y + ny * 7); ctx.stroke();
      ctx.strokeStyle = '#7a5030'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x - nx * 6, y - ny * 6 - 0.5); ctx.lineTo(x + nx * 6, y + ny * 6 - 0.5); ctx.stroke();
    }
    // os dois trilhos de aço
    for (const off of [-4, 4]) { linha(off, '#3a3a42', 2.4); linha(off - 0.6, '#d0d0da', 1); }
    ctx.lineCap = 'butt';
  },
  drawables(D, camX, camY, vw, vh) {
    const P = Game.player, ls = this.linhas(); if (!ls.length) return;
    for (const l of ls) {
      if (!this.perto(l, 500)) continue;
      const L = this.pts(l), vis = this.visiveis(L, camX, camY, vw, vh);
      if (vis.length) D.push({ y: -2e9, fn: (ctx) => { for (const [a, b] of vis) this.trilhoCurva(ctx, L, a, b, camX, camY); } });
      for (const de of ['a', 'b']) {
        const e = this.predio(l, de), im = this.estacaoImg();
        if (e.x < camX - 60 || e.x > camX + vw + 60 || e.y < camY - 60 || e.y > camY + vh + 60) continue;
        D.push({ y: e.y, img: im, x: Math.round(e.x - im.width / 2), yy: Math.round(e.y - im.height + 4) });
      }
      for (const c of this.carros(l)) {
        if (c.x < camX - 50 || c.x > camX + vw + 50 || c.y < camY - 50 || c.y > camY + vh + 50) continue;
        D.push({ y: c.y + 8, fn: (ctx) => this.desenhaCarro(ctx, c, Math.round(c.x - camX), Math.round(c.y - camY)) });
      }
    }
    const F = this.puffs; if (!F || !F.length) return;
    D.push({ y: 1e9, fn: (ctx) => {
      for (const f of F) {
        const k = f.t / f.vida, r = f.r + Math.sqrt(k) * 11, x = f.x - camX, y = f.y - camY; if (x < -30 || y < -30 || x > vw + 30 || y > vh + 30) continue;
        ctx.globalAlpha = Math.max(0, 0.85 * (1 - k));
        ctx.fillStyle = '#a8a8b4'; ctx.beginPath(); ctx.arc(x + r * 0.25, y + r * 0.25, r, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#f4f4f8'; ctx.beginPath(); ctx.arc(x, y, r * 0.9, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
    } });
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
    if (M) for (const i of M.keys()) { const t = r.tiles[i]; if (TWATER[t]) r.tiles[i] = T.BRIDGE; r.objs[i] = 0; }
    const A = this.trilhoAo && this.trilhoAo.get(k);
    if (A) for (const i of A) if (OSOLID[r.objs[i]] && r.objs[i] !== O.BLOCK) r.objs[i] = 0;
    return r;
  };
  const fi0 = Muralhas.findInteract; Muralhas.findInteract = function (fx, fy) { return Trem.findInteract(fx, fy) || fi0.call(this, fx, fy); };
  // o herói dentro do trem não aparece andando no trilho
  const pd0 = Player.prototype.draw; Player.prototype.draw = function () { if (this.trem) return; return pd0.apply(this, arguments); };
  const m0 = War.drawMap; War.drawMap = function (ctx, toS, z) { m0.call(this, ctx, toS, z); Trem.drawMap(ctx, toS); };
})();
