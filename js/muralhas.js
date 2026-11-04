'use strict';
// ===================== MURALHAS, PORTÕES E CERCO =====================
// As muralhas das cidades ganham altura: adarve com ameias, face de pedra (ou paliçada de troncos),
// torres e portões com grade levadiça. Guardas patrulham em cima. Quando uma cidade murada está
// sitiada os portões fecham. Para tomá-la é preciso montar o cerco, construir armas de cerco e
// esperar o amanhecer do dia seguinte; até lá os defensores passam fome e ficam mais fracos.
const MURO_H = 20;   // altura da face da muralha (px)
const MURO_COR = { [T.CWALL]: '#9a9488', [T.WALL]: '#8a8478', [T.DWALL]: '#6e6458', [T.TWALL]: '#c8a878', [T.IWALL]: '#a8c0d0', [T.MWALL]: '#7a7a6a', [T.RWALL]: '#a86a52', [T.GOLDWALL]: '#d8b850', [T.VWALL]: '#4a3e48' };
const ARMAS_CERCO = {
  ariete: { nome: 'Aríete coberto', ouro: 400, mats: { tabua: 20 }, desc: 'Arromba o portão da cidade.', abre: true },
  escada: { nome: 'Escadas de cerco', ouro: 120, mats: { tabua: 10 }, desc: 'Suas tropas escalam a muralha.', abre: true },
  torre: { nome: 'Torre de cerco', ouro: 900, mats: { tabua: 40 }, desc: 'Leva os soldados direto ao adarve (−10% defensores).', abre: true, corta: 0.1 },
  trabuco: { nome: 'Trabuco', ouro: 800, mats: { tabua: 30, pedra: 10 }, desc: 'Pedras enormes sobre a muralha (−18% defensores).', corta: 0.18 },
  catapulta: { nome: 'Catapulta incendiária', ouro: 600, mats: { tabua: 20 }, desc: 'Fogo dentro da cidade (−12% e defensores mais fracos).', corta: 0.12, fogo: true },
  balista: { nome: 'Balista', ouro: 350, mats: { tabua: 12, lingote_ferro: 4 }, desc: 'Dardos gigantes nos arqueiros (−8% defensores).', corta: 0.08 },
  manta: { nome: 'Manteletes', ouro: 150, mats: { tabua: 10 }, desc: 'Escudos de madeira: suas tropas chegam mais inteiras (+10% vida).' }
};

const Muralhas = {
  sitiadas: new Set(),
  // a cidade tem muralha?
  murada(s) {
    if (!s || !s.region) return false;
    if (s.playerVila) { const V = Vila.st(); return !!(V && V.built && V.built.muralha); }
    const cul = CULTURES[s.region.culture];
    return !!(cul && cul.wall && cul.walls && cul.walls.includes(s.type));
  },
  tipoMuro(s) { return s.playerVila ? (CULTURES[s.region.culture].wall || T.WALL) : CULTURES[s.region.culture].wall; },
  // geometria da muralha: tiles de muro e vãos dos portões em cada lado
  geo(s) {
    const key = s.type + (s.x0 | 0) + ',' + (s.y0 | 0) + (s.playerVila ? (Vila.st().built.muralha ? 'm' : '') : '');
    if (s._muro && s._muro.key === key) return s._muro;
    const W = Game.world, wt = this.tipoMuro(s), g = { key, pecas: [], vaos: [], wt, caminho: [] };
    if (!this.murada(s) || !wt) { s._muro = g; return g; }
    const x0 = s.x0, y0 = s.y0, x1 = s.x0 + s.w - 1, y1 = s.y0 + s.h - 1;
    const muro = (x, y) => W.tileAt(x, y) === wt;
    const lados = [['n', x0, y0, 1, 0, s.w], ['s', x0, y1, 1, 0, s.w], ['w', x0, y0, 0, 1, s.h], ['e', x1, y0, 0, 1, s.h]];
    for (const [lado, sx, sy, dx, dy, n] of lados) {
      let vao = null;
      for (let i = 0; i < n; i++) {
        const x = sx + dx * i, y = sy + dy * i;
        if (muro(x, y)) { g.pecas.push({ x, y, lado, i, n }); if (vao) { g.vaos.push(vao); vao = null; } }
        else if (i > 0 && i < n - 1 && !W.solidAt(x, y)) { if (!vao) vao = { lado, tiles: [] }; vao.tiles.push([x, y]); }
        else if (vao) { g.vaos.push(vao); vao = null; }
      }
      if (vao) g.vaos.push(vao);
    }
    g.vaos = g.vaos.filter(v => v.tiles.length >= 2 && v.tiles.length <= 6);
    // caminho do adarve (em volta, no sentido horário) para os guardas
    const tem = new Set(g.pecas.map(p => p.x + ',' + p.y));
    const ponte = new Set(); for (const v of g.vaos) for (const [x, y] of v.tiles) ponte.add(x + ',' + y);
    const add = (x, y) => { if (tem.has(x + ',' + y) || ponte.has(x + ',' + y)) g.caminho.push([x, y]); };
    for (let x = x0; x <= x1; x++) add(x, y0);
    for (let y = y0 + 1; y <= y1; y++) add(x1, y);
    for (let x = x1 - 1; x >= x0; x--) add(x, y1);
    for (let y = y1 - 1; y > y0; y--) add(x0, y);
    s._muro = g;
    return g;
  },
  // ---------- desenho das peças ----------
  pecaImg(wt, lado, var_) {
    this._img = this._img || {};
    const neve = Estacoes.nivelPintado >= 0.4 ? 1 : 0, k = wt + lado + var_ + neve;
    if (this._img[k]) return this._img[k];
    const H = MURO_H, c = Sprites.cv(16, 16 + H), p = Sprites.P(c.getContext('2d'));
    const pal = wt === T.LOGWALL;
    const base = pal ? '#7a5030' : (MURO_COR[wt] || '#8a8478'), hi = shade(base, 0.2), sh = shade(base, -0.22), dk = shade(base, -0.42);
    if (pal) {
      // paliçada de troncos pontudos
      for (let x = 0; x < 16; x += 4) { p(x, 3, base, 4, 13 + H); p(x, 3, hi, 1, 13 + H); p(x + 3, 3, dk, 1, 13 + H); p(x + 1, 1, base, 2, 2); p(x + 1, 0, hi, 1, 1); for (let y = 6; y < 16 + H; y += 5) p(x, y, sh, 4, 1); }
      p(0, 12, '#4a3018', 16, 2); p(0, 12 + H - 2, '#4a3018', 16, 2);
    } else {
      // adarve (piso de pedra em cima) com ameias na borda de fora
      p(0, 0, shade(base, 0.08), 16, 16);
      for (let y = 3; y < 16; y += 4) p(0, y, sh, 16, 1);
      for (let x = (var_ % 2) * 4; x < 16; x += 8) p(x, 0, sh, 1, 16);
      const ameia = (vertical, lado2) => {
        if (!vertical) { for (let x = 0; x < 16; x += 5) { p(x, 0, hi, 3, 4); p(x, 4, dk, 3, 1); } p(0, 4, sh, 16, 1); }
        else { const ax = lado2 ? 12 : 0; for (let y = 0; y < 16; y += 5) { p(ax, y, hi, 4, 3); p(ax + (lado2 ? -1 : 4), y, dk, 1, 3); } }
      };
      if (lado === 'n' || lado === 's') ameia(false); else ameia(true, lado === 'e');
      // face da muralha: blocos de pedra cada um com o seu tom, junta escura, luz em cima e musgo na base
      for (let row = 0; row * 4 < H; row++) {
        const y = 16 + row * 4, off = (row % 2) * 4 + (var_ % 3) - 8;
        for (let x = off; x < 16; x += 8) {
          const tom = shade(base, (hash2(x + var_ * 31, row, 77) - 0.5) * 0.22), bx = Math.max(0, x), bw = Math.min(16, x + 8) - bx; if (bw <= 0) continue;
          p(bx, y, tom, bw, 4); p(bx, y, shade(tom, 0.14), bw, 1); p(bx, y + 3, sh, bw, 1); if (x >= 0) p(x, y, dk, 1, 4);
          if (hash2(x, row + var_, 13) < 0.25) p(bx + 2, y + 1, shade(tom, -0.12), 2, 1);   // rachadura
        }
      }
      p(0, 16, hi, 16, 1);
      for (let x = 0; x < 16; x++) { const m = hash2(x, var_, 91); if (m < 0.55) p(x, 16 + H - 2 - (m < 0.2 ? 1 : 0), m < 0.3 ? '#4a6a34' : '#5a7a3a', 1, m < 0.2 ? 2 : 1); }
      if (var_ % 4 === 1 && (lado === 'n' || lado === 's')) { p(7, 19, '#1a1418', 2, 6); p(6, 21, '#1a1418', 4, 1); }   // seteira
      p(0, 16 + H - 1, dk, 16, 1);
    }
    let img = c;
    if (neve) img = Estacoes.capa(c, 2);
    return (this._img[k] = img);
  },
  torreImg(wt, cor) {
    this._img = this._img || {};
    cor = cor || '#a03030';
    const neve = Estacoes.nivelPintado >= 0.4 ? 1 : 0, k = 't' + wt + neve + cor;
    if (this._img[k]) return this._img[k];
    const H = MURO_H + 12, TOP = 22, c = Sprites.cv(24, 20 + H + TOP), p0 = Sprites.P(c.getContext('2d')), p = (x, y, col, w, h) => p0(x, y + TOP, col, w, h);
    const pal = wt === T.LOGWALL, base = pal ? '#6a4428' : (MURO_COR[wt] || '#8a8478'), hi = shade(base, 0.22), sh = shade(base, -0.22), dk = shade(base, -0.45);
    p(1, 4, shade(base, 0.08), 22, 18); for (let y = 8; y < 22; y += 4) p(1, y, sh, 22, 1);
    for (let x = 1; x < 23; x += 5) { p(x, 0, hi, 3, 5); p(x, 5, dk, 3, 1); }
    p(1, 5, sh, 22, 1);
    for (let y = 22; y < 20 + H; y++) p(1, y, base, 22, 1);
    for (let row = 0; row * 4 < H - 2; row++) { const y = 22 + row * 4; p(1, y + 3, sh, 22, 1); for (let x = 1 + (row % 2) * 4; x < 23; x += 8) p(x, y, sh, 1, 4); }
    p(11, 26, '#1a1418', 2, 7); p(10, 28, '#1a1418', 4, 1); p(5, 36, '#1a1418', 2, 4); p(17, 36, '#1a1418', 2, 4);
    p(1, 4, hi, 1, 16 + H); p(22, 4, dk, 1, 16 + H); p(1, 19 + H, dk, 22, 1);
    if (!pal) {
      // telhado cônico de ardósia e a bandeira do reino no alto
      const rf = '#4a4458', rfC = '#625a74', rfE = '#322e3e';
      for (let y = 0; y < 22; y++) { const hw = Math.round(1 + y * 0.52), x0 = 12 - hw; p0(x0, y + 4, rf, hw * 2, 1); p0(x0, y + 4, rfC, Math.max(1, Math.round(hw * 0.6)), 1); p0(x0 + hw * 2 - 1, y + 4, rfE, 1, 1); if (y % 4 === 3) p0(x0, y + 4, rfE, hw * 2, 1); }
      p0(1, 25, rfE, 22, 2);
      p0(11, 0, '#3a3a40', 1, 6); for (let y = 0; y < 4; y++) p0(12, y, y === 0 ? shade(cor, 0.3) : cor, 5 - (y > 2 ? 1 : 0), 1);
    }
    Sprites.outline(c);
    let img = c; if (neve) img = Estacoes.capa(c, 2);
    return (this._img[k] = img);
  },
  // grade levadiça (portão fechado) ou arco aberto, do tamanho do vão
  portaoImg(n, fechado, pal) {
    this._img = this._img || {};
    const k = 'g' + n + fechado + pal;
    if (this._img[k]) return this._img[k];
    const W = n * 16, H = MURO_H + 16, c = Sprites.cv(W, H), p = Sprites.P(c.getContext('2d'));
    if (pal) { p(0, 0, '#5a3a20', W, 4); for (let x = 0; x < W; x += 4) p(x, 0, '#7a5030', 3, 3); }
    else { p(0, 0, '#8a8478', W, 6); for (let x = 0; x < W; x += 5) { p(x, 0, '#aaa498', 3, 3); } p(0, 6, '#5a544a', W, 2); for (let x = 2; x < W - 2; x++) { const t = (x - 2) / (W - 4), h = Math.round(Math.sin(t * Math.PI) * 5); p(x, 8, '#6a645a', 1, 5 - h); } }
    if (fechado) {
      const top = pal ? 4 : 8;
      if (pal) { for (let x = 1; x < W - 1; x += 3) { p(x, top, '#5a3418', 2, H - top - 1); p(x, top, '#7a4a24', 1, H - top - 1); } p(0, top + 6, '#3a2410', W, 2); p(0, H - 7, '#3a2410', W, 2); }
      else { for (let x = 2; x < W - 1; x += 4) p(x, top, '#2a2a30', 2, H - top - 1); for (let y = top + 2; y < H - 1; y += 4) p(1, y, '#3a3a42', W - 2, 1); for (let x = 2; x < W - 1; x += 4) p(x, H - 2, '#5a5a62', 2, 2); }
    }
    return (this._img[k] = c);
  },
  // ---------- guardas no adarve (só visual) ----------
  guardas(s) {
    const g = this.geo(s); if (!g.caminho.length) return [];
    if (s._ronda && s._ronda.key === g.key) return s._ronda.l;
    const rng = new RNG(hashStr(s.id) + 5), n = s.type === 'capital' ? 6 : s.type === 'town' ? 4 : 2, l = [];
    for (let i = 0; i < n; i++) l.push({ t: rng.range(0, g.caminho.length), v: (rng.chance(0.5) ? 1 : -1) * rng.range(0.45, 0.7), pausa: 0, seed: rng.int(1, 1e6) });
    s._ronda = { key: g.key, l };
    return l;
  },
  lookGuarda(s, g) {
    const own = War.ownerOf(s) || s.region.id;
    s._lookG = s._lookG || {};
    const k = own + (g.seed % 3);
    if (!s._lookG[k]) { let look = null; try { look = War.look(own, g.seed % 3 === 0 ? 'arqueiro' : 'soldado', new RNG(g.seed)); } catch (e) { look = null; } s._lookG[k] = look || Object.assign({}, ENEMIES.guarda.look, { body: shade(s.region.color, -0.25) }); }
    return s._lookG[k];
  },
  drawables(D, camX, camY, vw, vh) {
    const G = Game, W = G.world;
    for (const s of W.settlements) {
      if (s.x0 * 16 > camX + vw + 64 || (s.x0 + s.w) * 16 < camX - 64 || s.y0 * 16 > camY + vh + 64 || (s.y0 + s.h) * 16 < camY - 80) continue;
      if (!this.murada(s)) continue;
      const g = this.geo(s); if (!g.pecas.length) continue;
      const pal = g.wt === T.LOGWALL, fechado = this.fechada(s);
      for (const pc of g.pecas) {
        const x = pc.x * 16, y = pc.y * 16; if (x < camX - 32 || x > camX + vw + 32 || y < camY - 40 || y > camY + vh + 40) continue;
        const img = this.pecaImg(g.wt, pc.lado, hash2(pc.x, pc.y, 3) * 8 | 0);
        D.push({ y: y + 15, img, x, yy: y + 16 - img.height });
        // torres a cada 12 blocos e nos cantos
        if ((pc.i === 0 || pc.i === pc.n - 1 || pc.i % 12 === 6) && !(s.type === 'capital' && (pc.i < 3 || pc.i > pc.n - 4))) { const t = this.torreImg(g.wt, s.region.color); D.push({ y: y + 15.5, img: t, x: x - 4, yy: y + 16 - t.height + 2 }); }
      }
      // portões: arco (ou grade fechada) por cima da passagem, com uma torre de cada lado
      for (const v of g.vaos) {
        const [ax, ay] = v.tiles[0], n = v.tiles.length, horiz = v.lado === 'n' || v.lado === 's';
        if (horiz) {
          const img = this.portaoImg(n, fechado, pal);
          D.push({ y: ay * 16 + 15, img, x: ax * 16, yy: ay * 16 + 16 - img.height });
          const t = this.torreImg(g.wt, s.region.color);
          D.push({ y: ay * 16 + 15.6, img: t, x: ax * 16 - 20, yy: ay * 16 + 16 - t.height + 2 });
          D.push({ y: ay * 16 + 15.6, img: t, x: (ax + n) * 16 - 4, yy: ay * 16 + 16 - t.height + 2 });
        } else {
          for (const [x, y] of v.tiles) { const img = this.pecaImg(g.wt, v.lado, 2); D.push({ y: y * 16 + 15, fn: (ctx) => { ctx.drawImage(img, 0, 0, 16, 16, x * 16 - camX, y * 16 - MURO_H - camY, 16, 16); if (fechado) { ctx.fillStyle = pal ? '#5a3418' : '#2a2a30'; ctx.fillRect(x * 16 - camX + 6, y * 16 - camY, 4, 16); ctx.fillStyle = pal ? '#7a4a24' : '#4a4a52'; ctx.fillRect(x * 16 - camX + 6, y * 16 - camY, 1, 16); } } }); }
        }
      }
      // guardas andando no alto da muralha
      for (const gd of this.guardas(s)) {
        const C = g.caminho, i = Math.floor(gd.t) % C.length, [tx, ty] = C[(i + C.length) % C.length];
        const px = tx * 16 + 8, py = ty * 16 + 8;
        if (px < camX - 20 || px > camX + vw + 20 || py < camY - 30 || py > camY + vh + 30) continue;
        const [nx, ny] = C[((i + (gd.v > 0 ? 1 : -1)) % C.length + C.length) % C.length], dir = nx > tx ? 'right' : nx < tx ? 'left' : ny > ty ? 'down' : 'up';
        const S = Sprites.actor(this.lookGuarda(s, gd)), f = gd.pausa > 0 ? 0 : 1 + (Math.floor(G.t * 4 + gd.seed) % 2), img = S[dir][f];
        D.push({ y: ty * 16 + 15.8, img, x: px - (img.width >> 1), yy: py - MURO_H + 4 - img.height });
      }
    }
  },
  tick(dt) {
    const G = Game, W = G.world; if (!W || !G.level || !G.level.isWorld) return;
    // patrulha
    for (const s of W.settlements) if (s.active && s._ronda) for (const g of s._ronda.l) {
      if (g.pausa > 0) { g.pausa -= dt; continue; }
      g.t += g.v * dt; if (Math.random() < dt * 0.06) { g.pausa = 2 + Math.random() * 3; if (Math.random() < 0.4) g.v = -g.v; }
      const n = s._muro.caminho.length; g.t = ((g.t % n) + n) % n;
    }
    this.cT = (this.cT || 0) - dt; if (this.cT > 0) return; this.cT = 1;
    // quais cidades estão sitiadas (portões fechados)
    const S = War.st(), sit = new Set();
    for (const a of S.armies) if (a.state === 'siege' && a.target) sit.add(a.target);
    const C = Cerco.atual(); if (C) sit.add(C.cid);
    if (C && C.aberto) sit.delete(C.cid);
    const mudou = sit.size !== this.sitiadas.size || [...sit].some(id => !this.sitiadas.has(id));
    this.sitiadas = sit;
    if (mudou) {
      const F = new Set();
      for (const id of sit) { const s = W.settlements.find(x => x.id === id); if (!s || !this.murada(s)) continue; for (const v of this.geo(s).vaos) for (const [x, y] of v.tiles) F.add(tkey(x, y)); }
      W.fechados = F; G.flow = null;
    }
    Cerco.tick();
  },
  fechada(s) { return this.sitiadas.has(s.id) && this.murada(s); },
  // portão fechado: quem não está em guerra com a cidade pode pedir passagem aos guardas
  findInteract(fx, fy) {
    const W = Game.world; if (!W.fechados || !W.fechados.size || !Game.level.isWorld) return null;
    const tx = Math.floor(fx / 16), ty = Math.floor(fy / 16);
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (W.fechados.has(tkey(tx + dx, ty + dy))) {
      const s = W.settlementAt(tx + dx, ty + dy); if (!s) continue;
      const own = War.ownerOf(s);
      return { kind: 'mar', fn: () => this.passagem(s, tx + dx, ty + dy), label: 'Portão', name: 'Portão fechado (cerco)', d: 4 };
    }
    return null;
  },
  passagem(s, gx, gy) {
    const G = Game, P = G.player, own = War.ownerOf(s);
    if (own === 'jogador' || (own && War.atWar('jogador', own)) || (Cerco.atual() && Cerco.atual().cid === s.id)) return G.toast('Os portões estão trancados. Do alto da muralha os arqueiros miram em você!', '#ff8080');
    const dentro = gx > s.x0 && gx < s.x0 + s.w - 1 && gy > s.y0 && gy < s.y0 + s.h - 1;
    const mx = s.x0 + s.w / 2, my = s.y0 + s.h / 2, ptx = P.x / 16, pty = P.y / 16;
    const fora = Math.abs(ptx - mx) > s.w / 2 - 1 || Math.abs(pty - my) > s.h / 2 - 1;
    const sx = Math.sign(mx - gx), sy = Math.sign(my - gy), lado = Math.abs(gx - mx) > Math.abs(gy - my) ? [sx, 0] : [0, sy];
    const k = fora ? 2 : -2;
    P.x = (gx + lado[0] * k) * 16 + 8; P.y = (gy + lado[1] * k) * 16 + 8; G.findFree(P);
    G.toast('Os guardas abriram uma portinhola e deixaram você passar.', '#c0e0ff'); Sfx.play('door'); void dentro;
  }
};

// ---------- o cerco feito pelo jogador ----------
const Cerco = {
  atual() { const R = Game.player && Game.player.reino; return R && R.cerco ? R.cerco : null; },
  cidade() { const C = this.atual(); return C ? Game.world.settlements.find(s => s.id === C.cid) : null; },
  iniciar(s) {
    const R = Game.player.reino; if (!R) return;
    const P = Game.player, mx = s.x0 + s.w / 2, my = s.y0 + s.h / 2, a = Math.atan2(P.y / 16 - my, P.x / 16 - mx);
    R.cerco = { cid: s.id, dia: Game.day, armas: {}, aberto: false, x: P.x / 16 + Math.cos(a) * 3, y: P.y / 16 + Math.sin(a) * 3, ang: a };
    Game.centerMsg('CERCO A ' + s.name.toUpperCase(), 'Os portões fecharam! Construa armas de cerco. O assalto só pode começar ao amanhecer de amanhã.');
    Sfx.play('shout');
  },
  pronto() { const C = this.atual(); return !!C && (Game.day > C.dia && Game.time >= 6 * 60 || Game.day > C.dia + 1); },
  diasCerco() { const C = this.atual(); return C ? Math.max(0, Game.day - C.dia) : 0; },
  podeAssaltar() { const C = this.atual(); if (!C) return false; return Object.keys(C.armas).some(k => C.armas[k] > 0 && ARMAS_CERCO[k].abre); },
  tick() {
    const C = this.atual(); if (!C) return;
    const R = Game.player.reino, s = this.cidade(), A = Reino.campo();
    // o cerco acaba se a cidade mudou de dono, o exército foi embora ou a guerra terminou
    if (!s || War.ownerOf(s) === 'jogador' || !A || A.state !== 'siege' && A.state !== 'battle' || (War.ownerOf(s) && !War.atWar('jogador', War.ownerOf(s)))) { R.cerco = null; Reino.painelKey = ''; }
  },
  menuArmas() {
    const C = this.atual(), P = Game.player; if (!C) return;
    const linhas = Object.entries(ARMAS_CERCO).map(([k, a]) => ({ label: `🔨 ${a.nome} (${C.armas[k] || 0}) — ${a.ouro} ouro, ${Object.entries(a.mats).map(([id, n]) => n + ' ' + ITEMS[id].name).join(', ')}`, fn: () => this.construir(k) }));
    UI.dialog('Armas de cerco', null, `Monte as armas no acampamento. Para passar pela muralha você precisa de <b>aríete</b>, <b>escadas</b> ou <b>torre de cerco</b>.<br><span class="dim">${Object.values(ARMAS_CERCO).map(a => `<b>${a.nome}</b>: ${a.desc}`).join('<br>')}</span>`, linhas.concat([{ label: 'Fechar' }]));
  },
  construir(k) {
    const C = this.atual(), P = Game.player, a = ARMAS_CERCO[k]; if (!C) return;
    if ((C.armas[k] || 0) >= (k === 'escada' ? 3 : 2)) return Game.toast('Já há o bastante dessa arma.', '#ffd080');
    if (P.gold < a.ouro) return Game.toast('Ouro insuficiente.', '#ff8080');
    if (!Game.hasMats(a.mats)) return Game.toast('Faltam materiais (tábuas, pedras, ferro).', '#ff8080');
    P.gold -= a.ouro; Game.takeMats(a.mats); C.armas[k] = (C.armas[k] || 0) + 1;
    Sfx.play('forge'); Game.toast(`${a.nome} pronta!`, '#c8f0a0'); Reino.painelKey = '';
    this.menuArmas();
  },
  esperar() {
    const G = Game, C = this.atual(); if (!C) return;
    if (this.pronto()) return G.toast('Já amanheceu: o assalto pode começar!', '#ffe080');
    if (G.actors.some(a => !a.dead && a.target === G.player && dist(a.x, a.y, G.player.x, G.player.y) < 250)) return G.toast('Há inimigos atacando você!', '#ff8080');
    UI.fade();
    const alvo = (C.dia + 1) * 1440 + 6 * 60, agora = G.day * 1440 + G.time;
    let falta = alvo - agora; if (falta < 0) falta = 0;
    G.time += falta; while (G.time >= 1440) { G.time -= 1440; G.day++; G.mods.day = G.day; G.dayTick(); }
    G.centerMsg('AMANHECEU', 'Os defensores passaram a noite com fome e medo. Ao ataque!');
    Reino.painelKey = '';
  },
  // o assalto: abre o portão (aríete, escadas ou torre), as armas derrubam defensores e a guarnição está fraca
  assaltar() {
    const G = Game, C = this.atual(), s = this.cidade(); if (!C || !s) return;
    if (!this.pronto()) return G.toast('O assalto só pode começar ao amanhecer de amanhã.', '#ffd080');
    if (!this.podeAssaltar()) return G.toast('Sem aríete, escadas ou torre de cerco não há como passar pela muralha!', '#ff8080');
    const A = Reino.campo(); if (!A) return;
    A.state = 'follow';
    let corte = 0, fogo = false;
    for (const [k, n] of Object.entries(C.armas)) { const a = ARMAS_CERCO[k]; if (a.corta) corte += a.corta * Math.min(2, n); if (a.fogo && n) fogo = true; }
    corte = Math.min(0.6, corte);
    C.aberto = true; Muralhas.cT = 0;
    Reino._invadir.call(Reino);
    const D = War.st().armies.find(x => x.cidade === s.id && x.state === 'battle');
    if (D) { D.n = Math.max(4, Math.round(D.n * (1 - corte))); D.fraco = Math.max(0.55, 0.82 - 0.04 * (this.diasCerco() - 1) - (fogo ? 0.05 : 0)); }
    if (C.armas.manta) A.forte = 1.1;
    const como = C.armas.ariete ? 'O aríete arrombou o portão!' : C.armas.torre ? 'A torre de cerco encostou na muralha e suas tropas abriram o portão por dentro!' : 'Suas tropas subiram as escadas e abriram o portão por dentro!';
    G.centerMsg('ASSALTO A ' + s.name.toUpperCase() + '!', `${como} Defensores famintos e enfraquecidos.`);
    G.shake = 8; Sfx.play('boom');
  },
  // armas montadas em frente à cidade (com o trabuco jogando pedras de vez em quando)
  drawables(D, camX, camY) {
    const C = this.atual(), s = C && this.cidade(), A = C && Reino.campo(); if (!s || !A) return;
    const tipos = []; for (const [k, n] of Object.entries(C.armas)) for (let i = 0; i < Math.min(n, 2); i++) tipos.push(k);
    if (!tipos.length) return;
    const cx = (C.x !== undefined ? C.x : A.x) * 16, cy = (C.y !== undefined ? C.y : A.y + 4) * 16, a = C.ang || Math.PI / 2, px = -Math.sin(a), py = Math.cos(a);
    tipos.forEach((k, i) => {
      const o = (i - (tipos.length - 1) / 2) * 46, x = cx + px * o + Math.cos(a) * 30 * (i % 2), y = cy + py * o * 0.6 + Math.sin(a) * 30 * (i % 2) + 20;
      const img = this.sprite(k, k === 'trabuco' || k === 'catapulta' ? (Math.floor(Game.t * 0.5 + i) % 6 === 0 ? 1 : 0) : 0);
      D.push({ y, img, x: x - (img.width >> 1), yy: y - img.height });
    });
  },
  sprite(k, f) {
    this._spr = this._spr || {};
    const key = k + f; if (this._spr[key]) return this._spr[key];
    const wd = '#7a4a24', wl = '#9a6436', wk = '#4a2c14', fe = '#4a4a52', fh = '#8a8a94';
    const roda = (p, x, y, r = 3) => { for (let a = 0; a < 6.3; a += 0.4) p(x + Math.round(Math.cos(a) * r), y + Math.round(Math.sin(a) * r), '#2a2a30'); p(x - 1, y - 1, '#6a5030', 3, 3); p(x, y, '#c0a060'); };
    const viga = (p, x0, y0, x1, y1, c, w = 2) => { const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)); for (let i = 0; i <= n; i++) p(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), c, w, w); };
    let c;
    const mk = (w, h, fn) => { c = Sprites.cv(w, h); fn(Sprites.P(c.getContext('2d')), c.getContext('2d')); Sprites.outline(c); };
    switch (k) {
      case 'trabuco': mk(56, 56, p => { p(6, 44, wd, 40, 4); p(6, 44, wl, 40, 1); viga(p, 14, 44, 24, 16, wd, 3); viga(p, 36, 44, 26, 16, wk, 3); p(22, 14, fe, 6, 4); const a = f ? -0.9 : 0.5; viga(p, 25 - Math.cos(a) * 12, 16 + Math.sin(a) * 12, 25 + Math.cos(a) * 26, 16 - Math.sin(a) * 26, wl, 2); const ex = 25 - Math.cos(a) * 12, ey = 16 + Math.sin(a) * 12; p(ex - 5, ey, '#8a8a8a', 9, 8); p(ex - 5, ey, '#b0b0b0', 9, 2); const tx = 25 + Math.cos(a) * 26, ty = 16 - Math.sin(a) * 26; p(tx, ty, '#c0c0c0', 1, 10); p(tx - 2, ty + 9, '#5a5a5a', 5, 4); roda(p, 10, 50); roda(p, 42, 50); }); break;
      case 'catapulta': mk(48, 40, p => { p(4, 28, wd, 36, 4); p(4, 28, wl, 36, 1); viga(p, 12, 28, 20, 12, wd, 3); viga(p, 30, 28, 22, 12, wk, 3); const a = f ? 1.2 : 0.35; viga(p, 21, 14, 21 - Math.cos(a) * 20, 14 - Math.sin(a) * 18, wl, 2); const bx = 21 - Math.cos(a) * 20, by = 14 - Math.sin(a) * 18; p(bx - 4, by - 3, '#5a3418', 7, 5); p(bx - 3, by - 6, '#ff9020', 5, 3); p(bx - 2, by - 8, '#ffe060', 3, 2); roda(p, 9, 34); roda(p, 35, 34); }); break;
      case 'balista': mk(44, 32, p => { p(10, 22, wd, 24, 4); viga(p, 14, 26, 20, 12, wd, 2); viga(p, 30, 26, 24, 12, wk, 2); p(8, 10, wl, 30, 3); p(8, 10, wk, 30, 1); viga(p, 6, 4, 20, 10, wd, 2); viga(p, 38, 4, 24, 10, wd, 2); p(6, 4, fh, 1, 1); p(38, 4, fh, 1, 1); viga(p, 6, 5, 20, 11, '#d0d0c0', 1); viga(p, 38, 5, 24, 11, '#d0d0c0', 1); p(20, 9, fh, 14, 1); p(34, 8, '#c0c0c8', 3, 3); roda(p, 12, 28); roda(p, 32, 28); }); break;
      case 'torre': mk(34, 66, p => { p(4, 6, wd, 26, 54); for (let y = 6; y < 60; y += 6) p(4, y, wk, 26, 1); p(4, 6, wl, 2, 54); p(28, 6, wk, 2, 54); p(2, 2, wl, 30, 5); for (let x = 2; x < 32; x += 6) p(x, 0, wd, 4, 3); p(8, 12, '#1a1410', 18, 8); p(10, 14, '#3a4a5a', 3, 3); p(17, 14, '#3a4a5a', 3, 3); p(12, 28, '#a02020', 10, 16); p(12, 28, '#c03030', 10, 2); p(16, 32, '#f0d060', 2, 6); p(14, 34, '#f0d060', 6, 2); p(8, 46, wk, 18, 2); roda(p, 8, 60); roda(p, 26, 60); }); break;
      case 'ariete': mk(52, 30, p => { for (let y = 4; y < 16; y++) { const ins = Math.max(0, 8 - y) ; p(6 + ins, y, y % 3 ? wd : wk, 38 - ins * 2, 1); } p(6, 16, wk, 38, 8); for (let x = 8; x < 44; x += 6) p(x, 16, wd, 4, 8); p(0, 18, '#6a5030', 12, 4); p(0, 18, fh, 3, 4); p(0, 18, '#9a7048', 12, 1); roda(p, 12, 26); roda(p, 26, 26); roda(p, 40, 26); }); break;
      case 'escada': mk(36, 44, p => { viga(p, 4, 40, 26, 2, wd, 2); viga(p, 12, 40, 32, 6, wd, 2); for (let i = 1; i < 9; i++) { const t = i / 9; viga(p, Math.round(4 + 22 * t), Math.round(40 - 38 * t), Math.round(12 + 20 * t), Math.round(40 - 34 * t), wl, 1); } p(2, 36, wk, 16, 4); roda(p, 5, 41); roda(p, 16, 41); }); break;
      case 'manta': mk(36, 30, p => { p(2, 2, wd, 32, 22); for (let x = 2; x < 34; x += 5) p(x, 2, wk, 1, 22); p(2, 2, wl, 32, 2); p(9, 8, '#1a1410', 4, 3); p(23, 8, '#1a1410', 4, 3); p(2, 14, fe, 32, 1); roda(p, 7, 26); roda(p, 29, 26); }); break;
    }
    return (this._spr[key] = c);
  },
  // botões no painel de tática enquanto o cerco dura
  botoes() {
    const C = this.atual(); if (!C) return '';
    const s = this.cidade(), ok = this.pronto(), armas = Object.entries(C.armas).filter(([, n]) => n).map(([k, n]) => `${n}× ${ARMAS_CERCO[k].nome}`).join(', ') || 'nenhuma';
    return `<div class="tat-t">🏰 Cerco a ${esc(s ? s.name : '')} • dia ${this.diasCerco() + 1}</div><div class="tat-t" style="font-size:11px;white-space:normal;max-width:220px">Armas: ${armas}</div>` +
      `<button data-o="armas">🔨 Armas de cerco</button>` + (ok ? `<button data-o="assalto" class="gold">⚔ Assaltar a muralha</button>` : `<button data-o="esperar">⏳ Esperar o amanhecer</button>`);
  }
};

// ---------- ganchos ----------
(function () {
  // portões fechados são parede
  const WP = World.prototype, solid0 = WP.solidAt;
  WP.solidAt = function (tx, ty) { if (this.fechados && this.fechados.size && this.fechados.has(tkey(tx, ty))) return true; return solid0.call(this, tx, ty); };
  // cercar uma cidade murada: o cerco não se resolve sozinho, é preciso assaltar
  const cercar0 = Reino.cercar, invadir0 = Reino.invadir;
  Reino._invadir = invadir0;
  Reino.cercar = function () { const s = this.cidadeInimiga(); cercar0.call(this); const A = this.campo(); if (s && A && A.state === 'siege' && Muralhas.murada(s)) Cerco.iniciar(s); };
  Reino.invadir = function () { const s = this.cidadeInimiga(); if (s && Muralhas.murada(s)) { const C = Cerco.atual(); if (!C || C.cid !== s.id) { Game.toast('Os portões estão fechados! Monte o cerco e construa armas de cerco.', '#ffd080'); return this.cercar(); } return Cerco.assaltar(); } return invadir0.call(this); };
})();
