'use strict';
// =====================================================================
//  O PALÁCIO REAL DE VERDADE
//  Por fora: um palácio de filme, enorme (34 × 14 quadrados, quase três
//  vezes o castelo antigo), com escadaria, corpo central de três andares,
//  cúpula dourada, alas laterais, quatro torres redondas, estandartes do
//  reino e janelas que se acendem à noite.
//  Por dentro: três andares ligados por escadas, cada cômodo com o nome
//  escrito no chão:
//   • Térreo: Hall de Entrada, Salão do Trono (sem camas na porta),
//     Cozinha, Salão de Banquetes, Arsenal, Capela, Sala do Conselho.
//   • 1º andar (Ala Real): o Quarto Real bem grande, com a sua cama e uma
//     para cada esposa do harém; Quarto dos Meninos, Quarto das Meninas,
//     Quarto das Crianças e Berçário; Sala de Estar Real.
//   • 2º andar (Torres): Biblioteca Real, Sala do Tesouro, Quartos de
//     Hóspedes e o Terraço.
//  A família mora no 1º andar: as esposas no Quarto Real e os filhos nos
//  quartos das crianças (os bebês no berçário).
// =====================================================================
const Palacio = {
  W: 34, H: 14,
  ANDARES: ['Térreo', '1º andar • Ala Real', '2º andar • Torres'],
  // ---------- a fachada (desenhada uma vez por cor de reino) ----------
  cache: new Map(),
  sprite(spec) {
    const k = (spec.roof || '') + (spec.banner || '') + (spec.snow ? 's' : ''); if (this.cache.has(k)) return this.cache.get(k);
    const W = this.W * 16 + 2, H = 368, c = Sprites.cv(W, H), x = c.getContext('2d');
    const r = (a, b, w, h, cor) => { x.fillStyle = cor; x.fillRect(Math.round(a), Math.round(b), Math.round(w), Math.round(h)); };
    const pedra = '#e6dfd0', pedraL = '#f4efe4', pedraS = '#cbc2b0', pedraD = '#a39a88', linha = '#8c8474', ouro = '#e0b850', ouroD = '#a8862e';
    const teto = spec.roof || '#3050a0', tetoL = shade(teto, 0.18), tetoD = shade(teto, -0.25), band = spec.banner || '#c03030';
    const V1 = '#7aa0bc', V2 = '#4a6a88';             // as cores do vidro (as janelas acendem à noite)
    const neve = !!spec.snow, branco = '#f4f8fc';
    const base = H - 2;
    // janela com moldura e arco
    const janela = (a, b, w, h, arco) => {
      r(a - 1, b - 1, w + 2, h + 2, linha);
      r(a, b, w, h, V2); r(a, b, w, Math.ceil(h / 2), V1);
      if (arco) { r(a - 1, b - 2, w + 2, 1, linha); r(a, b - 1, w, 1, V1); }
      r(a + (w >> 1), b, 1, h, linha); r(a - 1, b + h + 1, w + 2, 1, pedraL);
    };
    // telhado em duas águas
    const empena = (a, b, w, h) => { for (let i = 0; i < h; i++) { const m = Math.round((w / 2) * (i / h)); r(a + w / 2 - m, b + i, m * 2, 1, i < 2 ? tetoL : teto); } r(a, b + h - 1, w, 1, tetoD); };
    // torre redonda com teto cônico e bandeira
    const torre = (cx, topo, larg) => {
      const a = cx - larg / 2;
      r(a, topo, larg, base - topo, pedra); r(a, topo, 3, base - topo, pedraL); r(a + larg - 4, topo, 4, base - topo, pedraS); r(a + larg - 1, topo, 1, base - topo, pedraD);
      for (let y = topo + 10; y < base - 6; y += 9) r(a, y, larg, 1, pedraS);
      for (let y = topo + 18; y < base - 30; y += 40) janela(cx - 3, y, 6, 12, true);
      r(a - 3, topo - 4, larg + 6, 5, pedraS); r(a - 3, topo - 4, larg + 6, 1, pedraL);
      for (let i = 0; i < larg + 6; i += 5) r(a - 3 + i, topo - 8, 3, 4, pedraS);
      const ch = 56; for (let i = 0; i < ch; i++) { const m = Math.max(1, Math.round((larg / 2 + 3) * (i / ch))); r(cx - m, topo - 8 - ch + i, m * 2, 1, i % 6 === 0 ? tetoD : (i < ch / 2 ? tetoL : teto)); }
      if (neve) for (let i = 8; i < ch; i += 3) { const m = Math.max(1, Math.round((larg / 2 + 3) * (i / ch))); r(cx - m, topo - 8 - ch + i, Math.max(1, m * 0.7), 1, branco); }
      r(cx, topo - 8 - ch - 22, 1, 22, '#3a3a3a'); r(cx + 1, topo - 8 - ch - 22, 12, 7, band); r(cx + 1, topo - 8 - ch - 16, 12, 1, shade(band, -0.3));
      r(cx - 1, topo - 8 - ch - 1, 3, 2, ouro);
    };
    // ---- alas laterais (2 andares) ----
    const alaY = 210;
    for (const [a, w] of [[46, 104], [W - 150, 104]]) {
      r(a, alaY, w, base - alaY, pedra); r(a, alaY, w, 2, pedraL); r(a, base - 26, w, 2, pedraS);
      for (let i = 0; i < w; i += 26) { r(a + i, alaY, 3, base - alaY, pedraS); r(a + i, alaY, 1, base - alaY, pedraL); }
      for (let i = 8; i < w - 6; i += 26) { janela(a + i, alaY + 22, 10, 22, true); janela(a + i, alaY + 74, 10, 22, true); }
      r(a, alaY + 58, w, 3, pedraS); r(a, alaY + 58, w, 1, pedraL);
      r(a - 2, alaY - 4, w + 4, 5, pedraS); for (let i = 0; i < w; i += 8) r(a + i, alaY - 9, 5, 5, pedraS);
      empena(a + 8, alaY - 40, w - 16, 32); if (neve) r(a + 20, alaY - 36, w - 40, 3, branco);
    }
    // ---- corpo principal (3 andares) ----
    const cx0 = 150, cx1 = W - 150, corpoY = 150;
    r(cx0, corpoY, cx1 - cx0, base - corpoY, pedra); r(cx0, corpoY, cx1 - cx0, 2, pedraL);
    for (let a = cx0; a < cx1; a += 30) { r(a, corpoY, 4, base - corpoY, pedraS); r(a, corpoY, 1, base - corpoY, pedraL); r(a, corpoY, 4, 6, ouroD); }
    for (const yy of [corpoY + 62, corpoY + 124]) { r(cx0, yy, cx1 - cx0, 4, pedraS); r(cx0, yy, cx1 - cx0, 1, pedraL); }
    for (let a = cx0 + 10; a < cx1 - 14; a += 30) {
      if (a > W / 2 - 66 && a < W / 2 + 56) continue;           // o pavilhão do meio tem as suas janelas
      janela(a, corpoY + 18, 12, 30, true); janela(a, corpoY + 80, 12, 30, true); janela(a, corpoY + 146, 12, 30, true);
      r(a - 3, corpoY + 78, 18, 2, pedraL);                       // sacadinhas
    }
    // mansarda com janelinhas
    r(cx0 - 4, corpoY - 6, cx1 - cx0 + 8, 6, pedraS); r(cx0 - 4, corpoY - 6, cx1 - cx0 + 8, 1, pedraL);
    for (let i = 0; i < 28; i++) { const m = Math.round(i * 0.6); r(cx0 + m, corpoY - 34 + i, cx1 - cx0 - m * 2, 1, i < 3 ? tetoL : teto); }
    for (let a = cx0 + 24; a < cx1 - 24; a += 44) { r(a, corpoY - 26, 12, 16, pedra); janela(a + 3, corpoY - 22, 6, 9, true); empena(a - 2, corpoY - 34, 16, 9); }
    if (neve) for (let a = cx0 + 6; a < cx1 - 6; a += 3) r(a, corpoY - 32 + ((a * 7) % 3), 2, 2, branco);
    // ---- pavilhão central com a porta, a sacada, o frontão e a cúpula ----
    const pc = W / 2, pw = 130, pa = pc - pw / 2, pTop = 96;
    r(pa, pTop, pw, base - pTop, pedraL); r(pa, pTop, 4, base - pTop, '#fbf8f0'); r(pa + pw - 5, pTop, 5, base - pTop, pedraS);
    for (const cc of [pa + 16, pa + 40, pa + pw - 44, pa + pw - 20]) { r(cc, pTop + 30, 8, base - pTop - 56, '#f8f4ea'); r(cc + 6, pTop + 30, 2, base - pTop - 56, pedraS); r(cc - 2, pTop + 26, 12, 4, ouro); r(cc - 2, base - 30, 12, 4, pedraS); }
    janela(pc - 9, pTop + 44, 18, 40, true); janela(pa + 26, pTop + 52, 10, 30, true); janela(pa + pw - 36, pTop + 52, 10, 30, true);
    // sacada real
    r(pa + 8, pTop + 104, pw - 16, 4, pedraS); r(pa + 8, pTop + 104, pw - 16, 1, pedraL); for (let a = pa + 10; a < pa + pw - 10; a += 4) r(a, pTop + 108, 2, 8, pedraS); r(pa + 8, pTop + 116, pw - 16, 2, pedraD);
    // estandartes
    for (const bx of [pa + 4, pa + pw - 14]) { r(bx, pTop + 30, 10, 60, band); r(bx, pTop + 30, 10, 2, ouro); r(bx + 3, pTop + 52, 4, 6, ouro); r(bx, pTop + 88, 5, 6, band); r(bx + 5, pTop + 88, 5, 4, band); }
    // a grande porta em arco
    const pdw = 36, pdh = 58, pdx = pc - pdw / 2, pdy = base - 22 - pdh;
    r(pdx - 6, pdy - 10, pdw + 12, pdh + 10, pedraS); for (let i = 0; i < 10; i++) r(pdx - 6 + i, pdy - 10 + (10 - i), 1, 1, pedraL);
    r(pdx - 4, pdy - 6, pdw + 8, 4, ouro);
    r(pdx, pdy, pdw, pdh, '#5a3418'); for (let a = pdx + 3; a < pdx + pdw; a += 6) r(a, pdy, 1, pdh, '#4a2a12');
    r(pdx, pdy, pdw, 3, '#3a200c'); r(pc - 1, pdy, 2, pdh, '#3a200c'); r(pc - 6, pdy + pdh / 2, 3, 3, ouro); r(pc + 3, pdy + pdh / 2, 3, 3, ouro);
    for (let i = 0; i < 6; i++) r(pdx + i * 6, pdy - 3 - Math.round(Math.sin(i / 5 * Math.PI) * 4), 6, 2, ouroD);
    // frontão triangular com o brasão
    const fr = 34; for (let i = 0; i < fr; i++) { const m = Math.round((pw / 2 + 6) * (i / fr)); r(pc - m, pTop - fr + i, m * 2, 1, i < 2 ? pedraL : pedra); }
    r(pa - 6, pTop - 2, pw + 12, 4, ouro); r(pc - 9, pTop - 24, 18, 18, band); r(pc - 9, pTop - 24, 18, 2, ouro); r(pc - 2, pTop - 20, 4, 10, ouro); r(pc - 6, pTop - 17, 12, 3, ouro);
    // cúpula dourada com lanterna e pináculo
    const dr = 44, dy = pTop - fr - 4;
    r(pc - dr - 4, dy - 4, (dr + 4) * 2, 8, pedraS); for (let a = pc - dr; a < pc + dr; a += 8) janela(a + 2, dy - 2, 3, 4, false);
    for (let i = 0; i < dr; i++) { const m = Math.round(Math.sqrt(dr * dr - i * i)); r(pc - m, dy - 4 - i, m * 2, 1, i > dr * 0.8 ? tetoL : teto); }
    for (const k of [-0.6, -0.25, 0.1, 0.45]) for (let i = 0; i < dr - 4; i++) { const m = Math.sqrt(dr * dr - i * i); r(pc + k * m, dy - 4 - i, 1, 1, ouro); }
    if (neve) for (let i = dr - 14; i < dr; i++) { const m = Math.round(Math.sqrt(dr * dr - i * i)); r(pc - m, dy - 4 - i, m * 2, 1, branco); }
    r(pc - 8, dy - dr - 18, 16, 16, pedraL); janela(pc - 4, dy - dr - 14, 8, 9, true); r(pc - 10, dy - dr - 20, 20, 3, ouro);
    r(pc - 1, dy - dr - 46, 2, 26, ouro); r(pc - 3, dy - dr - 26, 6, 3, ouroD); r(pc + 1, dy - dr - 46, 16, 9, band); r(pc + 1, dy - dr - 38, 16, 1, shade(band, -0.3));
    // ---- as quatro torres ----
    torre(26, 168, 38); torre(W - 27, 168, 38); torre(150, 128, 30); torre(W - 151, 128, 30);
    // ---- terraço e escadaria ----
    r(0, base - 22, W, 22, pedraS); r(0, base - 22, W, 2, pedraL); for (let a = 0; a < W; a += 12) r(a, base - 18, 6, 12, pedraD);
    for (let i = 0; i < 6; i++) { const w = 80 + i * 14; r(pc - w / 2, base - 22 + i * 4, w, 4, i % 2 ? pedra : pedraL); r(pc - w / 2, base - 19 + i * 4, w, 1, pedraD); }
    for (const sx of [pc - 72, pc + 58]) { r(sx, base - 40, 14, 22, pedraS); r(sx + 2, base - 46, 10, 6, pedraL); r(sx + 4, base - 52, 6, 6, ouro); }
    // lampiões e sebes na frente
    for (const lx of [pc - 96, pc + 92, 110, W - 114]) { r(lx, base - 34, 2, 14, '#2a2a2a'); r(lx - 2, base - 40, 6, 6, '#ffe8a0'); r(lx - 2, base - 41, 6, 1, '#2a2a2a'); }
    for (const [hx, hw] of [[60, 70], [W - 130, 70]]) { r(hx, base - 30, hw, 10, '#3a6a2a'); r(hx, base - 30, hw, 2, '#5a8a3a'); }
    // contorno escuro para destacar do chão
    const img = x.getImageData(0, 0, W, H), d = img.data, out = new Uint8ClampedArray(d);
    for (let yy = 1; yy < H - 1; yy++) for (let xx = 1; xx < W - 1; xx++) { const i = (yy * W + xx) * 4; if (d[i + 3]) continue; if (d[i + 7] || d[i - 1] || d[i + W * 4 + 3] || d[i - W * 4 + 3]) { out[i] = 26; out[i + 1] = 20; out[i + 2] = 22; out[i + 3] = 255; } }
    x.putImageData(new ImageData(out, W, H), 0, 0);
    this.cache.set(k, c); return c;
  },
  // ---------- onde fica no mundo ----------
  lugar() {
    const W = Game.world, s = Vila.s, w = this.W, h = this.H; if (!s) return null;
    const tenta = [];
    for (let d = 8; d <= 22; d += 2) tenta.push([s.mid.x - (w >> 1), s.y0 - h - d, 'n'], [s.x0 - w - d, s.mid.y - (h >> 1), 'w'], [s.x0 + s.w + d, s.mid.y - (h >> 1), 'e'], [s.mid.x - (w >> 1), s.y0 + s.h + d, 's']);
    for (const [x0, y0, dir] of tenta) {
      let ok = true;
      for (let y = y0 - 1; y <= y0 + h + 2 && ok; y++) for (let x = x0 - 1; x <= x0 + w && ok; x++) { const t = W.baseTile(x, y); if (TWATER[t] || t === T.LAVA || t === T.DEEP) ok = false; }
      for (const o of W.settlements) if (Math.abs(o.mid.x - (x0 + w / 2)) < (o.w || 30) / 2 + w / 2 + 1 && Math.abs(o.mid.y - (y0 + h / 2)) < (o.h || 30) / 2 + h / 2 + 1) ok = false;
      if (ok) return { x: x0, y: y0, dir };
    }
    return null;
  },
  // ---------- por dentro ----------
  sala(L, x0, y0, x1, y1, nome, piso) { if (piso !== undefined) for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) L.setFloor(x, y, piso); (L.salas = L.salas || []).push({ x: (x0 + x1 + 1) / 2, y: y0, nome }); },
  parede(L, x0, y0, x1, y1, vaos) {
    for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
      if (vaos.some(v => (x0 === x1 ? Math.abs(y - v) <= 1 : Math.abs(x - v) <= 1))) continue;
      if (L.inb(x, y)) { L.tiles[L.idx(x, y)] = L.wallT; L.objs[L.idx(x, y)] = 0; }
    }
  },
  escada(L, x, y, para, txt) { L.objs[L.idx(x, y)] = O.STAIRS_UP; (L.escadas = L.escadas || []).push({ x, y, para, txt }); },
  montar(L, n, r) {
    const W = L.w, H = L.h, P = (x, y, o) => L.put(x, y, o), M = O;
    L.salas = []; L.escadas = []; L.palAndar = n;
    for (let x = 2; x < W - 2; x += 3) L.wall(x, x % 6 === 2 ? M.PAINTING : M.WINDOW);
    if (n > 0) { const i = L.idx(L.dx, H - 1); L.tiles[i] = L.wallT; L.objs[i] = 0; }          // em cima não há porta para fora
    const tapete = T.CARPET, pedra = T.DCOBBLE, madeira = T.HFLOOR;
    if (n === 0) {
      // paredes internas: alas esquerda e direita, e o hall de entrada
      this.parede(L, 13, 2, 13, H - 2, [6, 16, 25]); this.parede(L, 30, 2, 30, H - 2, [6, 16, 25]);
      this.parede(L, 1, 11, 12, 11, [6]); this.parede(L, 1, 21, 12, 21, [6]); this.parede(L, 31, 11, 42, 11, [36]); this.parede(L, 31, 21, 42, 21, [36]);
      this.parede(L, 14, 21, 18, 21, []); this.parede(L, 26, 21, 29, 21, []);
      this.sala(L, 14, 2, 29, 20, '👑 Salão do Trono', L.floorT); this.sala(L, 14, 22, 29, H - 2, 'Hall de Entrada', L.floorT);
      for (let y = 3; y < H - 1; y++) for (let x = 21; x <= 23; x++) L.setFloor(x, y, tapete);
      P(22, 3, M.THRONE); P(19, 2, M.BANNER); P(25, 2, M.BANNER); P(20, 2, M.CANDLE); P(24, 2, M.CANDLE); P(15, 3, M.STATUE); P(28, 3, M.STATUE);
      for (const y of [6, 10, 14, 18]) { P(17, y, M.PILLAR); P(27, y, M.PILLAR); }
      P(16, 24, M.STATUE); P(28, 24, M.STATUE); P(15, 27, M.PLANT); P(28, 27, M.PLANT); P(19, 25, M.FOUNTAIN);
      this.sala(L, 1, 2, 12, 10, '🍳 Cozinha', pedra);
      P(2, 2, M.STOVE); P(4, 2, M.STOVE); P(6, 2, M.POTSHELF); P(8, 2, M.COUNTER); P(9, 2, M.COUNTER); P(10, 2, M.COUNTER); P(12, 3, M.BARREL); P(12, 4, M.BARREL);
      P(3, 5, M.CAULDRON); P(2, 9, M.SACKS); P(4, 9, M.SACKS); P(11, 9, M.KEG); P(7, 6, M.TABLE); P(8, 6, M.TABLE); P(6, 7, M.CHAIR); P(9, 7, M.CHAIR);
      this.sala(L, 1, 12, 12, 20, '🍷 Salão de Banquetes', tapete);
      for (let x = 3; x <= 10; x++) { P(x, 15, M.TABLE); P(x, 16, M.TABLE); if (x % 2) { P(x, 14, M.CHAIR); P(x, 17, M.CHAIR); } }
      P(1, 12, M.FIREPLACE); P(12, 12, M.CANDLE); P(2, 19, M.PLANT); P(11, 19, M.PLANT);
      this.sala(L, 1, 22, 12, H - 2, '⚔ Arsenal', pedra);
      for (let x = 2; x <= 11; x += 2) P(x, 22, M.WEAPONRACK); P(4, 26, M.DUMMY); P(8, 26, M.DUMMY); P(11, 27, M.ANVIL); P(2, 27, M.BARREL);
      this.sala(L, 31, 2, 42, 10, '🕯 Capela', L.floorT);
      P(36, 2, M.ALTAR); P(34, 2, M.CANDLE); P(38, 2, M.CANDLE); P(32, 2, M.STATUE); P(41, 2, M.STATUE);
      for (const y of [5, 7, 9]) for (let x = 33; x <= 40; x++) if (x !== 36) P(x, y, M.BENCH);
      this.sala(L, 31, 12, 42, 20, '📜 Sala do Conselho', tapete);
      P(36, 15, M.MAPTABLE); P(35, 14, M.CHAIR); P(37, 14, M.CHAIR); P(35, 16, M.CHAIR); P(37, 16, M.CHAIR); P(32, 12, M.BOOKSHELF); P(33, 12, M.BOOKSHELF); P(41, 12, M.BOOKSHELF); P(40, 19, M.PLANT);
      this.sala(L, 31, 22, 42, H - 2, '🪜 Escadaria', L.floorT);
      this.escada(L, 37, 23, 1, 'Subir ao 1º andar (Ala Real)'); P(33, 23, M.STATUE); P(41, 23, M.STATUE); P(32, 27, M.PLANT); P(41, 27, M.PLANT);
      L.spot('owner', 22, 5);
      for (const [x, y] of [[20, 5], [24, 5], [20, 19], [24, 19], [20, 26], [24, 26], [36, 25]]) L.spot('guard', x, y);
      L.spot('patron', 5, 14); L.spot('patron', 9, 18); L.spot('patron', 6, 4); L.spot('patron', 33, 8);
    } else if (n === 1) {
      this.parede(L, 22, 2, 22, H - 2, [10, 23]);
      this.parede(L, 33, 2, 33, 17, [5, 14]); this.parede(L, 23, 9, 42, 9, [28, 38]);
      this.parede(L, 1, 18, 21, 18, [11]); this.parede(L, 23, 18, 42, 18, [28, 38]);
      this.sala(L, 1, 2, 21, 17, '👑 Quarto Real', tapete);
      P(11, 3, M.PLAYERBED); P(9, 2, M.CANDLE); P(13, 2, M.CANDLE);
      const camas = [[3, 3], [6, 3], [16, 3], [19, 3], [3, 8], [19, 8]];
      for (const [x, y] of camas) P(x, y, M.BED);
      P(1, 2, M.WARDROBE); P(21, 2, M.WARDROBE); P(1, 12, M.FIREPLACE); P(21, 12, M.PIANO); P(8, 13, M.BENCH); P(14, 13, M.BENCH); P(11, 15, M.TABLE);
      P(1, 17, M.PLANT); P(21, 17, M.PLANT); P(11, 9, M.FOUNTAIN);
      L.lugarEsposa = [[4, 5], [7, 5], [16, 5], [19, 5], [4, 10], [18, 10], [11, 6], [8, 11]];
      this.sala(L, 23, 2, 32, 8, '🧒 Quarto dos Meninos', madeira); this.sala(L, 34, 2, 42, 8, '👧 Quarto das Meninas', madeira);
      this.sala(L, 23, 10, 32, 17, '🧸 Quarto das Crianças', madeira); this.sala(L, 34, 10, 42, 17, '🍼 Berçário', tapete);
      for (const x of [24, 26, 28, 30]) P(x, 2, M.BEDSMALL); P(32, 2, M.WARDROBE);
      for (const x of [35, 37, 39, 41]) P(x, 2, M.BEDSMALL);
      for (const x of [24, 26, 28, 30]) { P(x, 10, M.BEDSMALL); } P(25, 16, M.BEDSMALL); P(29, 16, M.BEDSMALL); P(32, 12, M.DUMMY);
      for (const x of [35, 37, 39, 41]) P(x, 10, M.CRIB); P(36, 15, M.SEWING); P(40, 15, M.CHAIR); P(42, 16, M.PLANT);
      L.lugarFilho = [[24, 4], [26, 4], [28, 4], [30, 4], [35, 4], [37, 4], [39, 4], [41, 4], [24, 12], [26, 12], [28, 12], [30, 12], [25, 14], [29, 14], [27, 6], [38, 6]];
      L.lugarBebe = [[35, 12], [37, 12], [39, 12], [41, 12]];
      this.sala(L, 1, 19, 21, H - 2, '🛋 Sala de Estar Real', tapete);
      P(11, 19, M.FIREPLACE); P(3, 19, M.BOOKSHELF); P(4, 19, M.BOOKSHELF); P(19, 19, M.HARP); P(8, 23, M.BENCH); P(14, 23, M.BENCH); P(11, 24, M.TABLE); P(2, 27, M.PLANT); P(20, 27, M.PLANT);
      this.sala(L, 23, 19, 42, H - 2, '🪜 Escadaria', L.floorT);
      this.escada(L, 27, 20, 0, 'Descer ao Térreo'); this.escada(L, 38, 20, 2, 'Subir ao 2º andar (Torres)');
      P(32, 20, M.STATUE); P(24, 27, M.PLANT); P(41, 27, M.PLANT);
      L.spot('guard', 30, 25); L.spot('guard', 22, 23);
    } else {
      this.parede(L, 18, 2, 18, H - 2, [6, 15]); this.parede(L, 1, 11, 35, 11, [9, 27]);
      this.sala(L, 1, 2, 17, 10, '📚 Biblioteca Real', madeira);
      for (let x = 2; x <= 16; x++) if (x !== 9) P(x, 2, M.BOOKSHELF); P(9, 6, M.LECTERN); P(5, 7, M.TABLE); P(13, 7, M.TABLE); P(4, 8, M.CHAIR); P(14, 8, M.CHAIR); P(1, 10, M.PLANT);
      this.sala(L, 19, 2, 34, 10, '💰 Sala do Tesouro', pedra);
      for (let x = 20; x <= 33; x += 3) P(x, 2, M.CHEST_OPEN); P(22, 6, M.CRYSTAL); P(26, 6, M.TROPHY); P(30, 6, M.CRYSTAL); P(20, 9, M.STATUE); P(33, 9, M.STATUE); P(26, 9, M.SACKS);
      this.sala(L, 1, 12, 17, H - 2, '🛏 Quartos de Hóspedes', tapete);
      for (const x of [3, 7, 11, 15]) P(x, 12, M.BED); P(1, 18, M.WARDROBE); P(9, 17, M.TABLE); P(16, 19, M.PLANT);
      this.sala(L, 19, 12, 34, H - 2, '🌿 Terraço e Escadaria', T.GRASS);
      this.escada(L, 26, 13, 1, 'Descer ao 1º andar (Ala Real)'); P(31, 16, M.FOUNTAIN); P(21, 18, M.PLANT); P(33, 13, M.PLANT); P(21, 13, M.FLOWERS); P(33, 19, M.FLOWERS);
      L.spot('guard', 23, 16);
    }
    L._base = L.objs.slice();
  },
  // ---------- subir e descer ----------
  ir(base, n, de) {
    const G = Game, P = G.player;
    const b = Object.assign(Object.create(base), { kind: 'pal_' + n, palAndar: n, palBase: base, name: 'Palácio Real • ' + this.ANDARES[n] });
    Palacio._ei0.call(G, b);
    const L = G.level; if (!L || L.palAndar !== n) return;
    // onde aparece: pela porta, ou ao lado da escada por onde chegou
    if (de !== undefined) { const e = (L.escadas || []).find(e => e.para === de); if (e) { P.x = e.x * 16 + 8; P.y = (e.y + 1) * 16 + 10; G.findFree(P); G.camX = P.x - G.vw / 2; G.camY = P.y - G.vh / 2; } }
    // a família: no 1º andar, cada um no seu quarto; nos outros andares não aparece
    const fam = G.actors.filter(a => a.family === 'spouse' || a.family === 'harem' || a.family === 'kid');
    if (n !== 1) { G.actors = G.actors.filter(a => !fam.includes(a)); }
    else {
      let ie = 0, ik = 0;
      for (const a of fam) {
        const q = a.family === 'kid' ? L.lugarFilho[ik++ % L.lugarFilho.length] : L.lugarEsposa[ie++ % L.lugarEsposa.length];
        a.x = q[0] * 16 + 8; a.y = q[1] * 16 + 10; G.findFree(a); a.home = { x: a.x, y: a.y };
      }
    }
    // o berço que o jogo põe para um recém-nascido vai para o berçário
    for (let i = 0; i < L.objs.length; i++) if (L.objs[i] === O.CRIB && L._base[i] !== O.CRIB) L.objs[i] = L._base[i];
    L.canvas = null;
  },
  escadaEm(L, tx, ty) { return (L.escadas || []).find(e => e.x === tx && e.y === ty); }
};

// ---------------- ganchos ----------------
(function () {
  INTERIOR_SIZES.pal_0 = [44, 30]; INTERIOR_SIZES.pal_1 = [44, 30]; INTERIOR_SIZES.pal_2 = [36, 22];
  // os andares do palácio têm a sua planta
  const b0 = Interior.prototype.build;
  Interior.prototype.build = function (kind, r) { if (/^pal_\d$/.test(kind)) return Palacio.montar(this, +kind.slice(4), r); return b0.apply(this, arguments); };
  // a fachada grande
  const sb0 = Sprites.building;
  Sprites.building = function (spec) { if (spec && spec.palacioReal) return Palacio.sprite(spec); return sb0.apply(this, arguments); };
  // o palácio no mundo, bem maior (e o antigo muda para um lugar com espaço)
  Construcao.palacio = function (pos, vs, sujos) {
    const W = Game.world, P = Game.player, R = P.reino || {}, V = Vila.st(), w = Palacio.W, h = Palacio.H;
    if (V && !V.palacioG) { const novo = Palacio.lugar(); if (novo) { V.palacio = pos = novo; } V.palacioG = 1; }
    const door = { x: pos.x + (w >> 1), y: pos.y + h - 1 };
    const g = vs.gates.find(o => o.dir === pos.dir) || vs.gates[0];
    const rua = [];
    if (pos.dir === 'n') for (let y = door.y + 1; y <= g.y + 1; y++) rua.push([door.x, y]);
    else { let x = door.x, y = door.y + 1; rua.push([x, y]); const sx = Math.sign(g.x - x); while (x !== g.x) { x += sx; rua.push([x, y]); } const sy = Math.sign(g.y - y); while (y !== g.y) { y += sy; rua.push([x, y]); } }
    let x0 = pos.x - 2, y0 = pos.y - 1, x1 = pos.x + w + 1, y1 = pos.y + h + 5;
    for (const [x, y] of rua) { x0 = Math.min(x0, x - 1); y0 = Math.min(y0, y); x1 = Math.max(x1, x + 1); y1 = Math.max(y1, y); }
    const sw = x1 - x0 + 1, sh = y1 - y0 + 1, tiles = new Uint8Array(sw * sh).fill(255), objs = new Uint8Array(sw * sh).fill(255);
    for (let y = pos.y - 1; y <= pos.y + h + 5; y++) for (let x = pos.x - 2; x <= pos.x + w + 1; x++) {
      const i = (y - y0) * sw + (x - x0), dentro = x >= pos.x && x < pos.x + w && y >= pos.y && y < pos.y + h;
      objs[i] = dentro ? O.BLOCK : 0;
      if (y >= pos.y + h) { tiles[i] = T.COBBLE; objs[i] = 0; }                 // a praça de pedra na frente
      if (y === pos.y + h + 3 && (x - pos.x) % 6 === 1 && Math.abs(x - (pos.x + (w >> 1))) > 3) objs[i] = O.LAMP;   // lampiões na praça
    }
    for (const [x, y] of rua) for (const dx of [-1, 0, 1]) { const i = (y - y0) * sw + (x + dx - x0); if (i >= 0 && i < tiles.length) { tiles[i] = T.COBBLE; if (objs[i] !== O.BLOCK) objs[i] = 0; } }
    W.addStamp({ x0, y0, w: sw, h: sh, tiles, objs, obra: true });
    const spec = { type: 'castle', palacioReal: true, w, h, style: 'castle', roof: shade(R.cor || '#3050c0', -0.15), wall: '#e4e0d8', banner: R.cor || '#c03030', seed: 777, sign: null };
    const b = { kind: 'castle', role: 'ruler', tx: pos.x, ty: pos.y, w, h, spec, name: 'Palácio Real', owner: { name: 'Mordomo Real', race: P.race, sex: 'm', seed: 99 }, settlement: vs, decorative: false, obra: true, player: true, door };
    W.doors.set(tkey(door.x, door.y), b);
    this.extras.push(b);
    for (let cy = (y0 >> 5) - 1; cy <= (y1 >> 5) + 1; cy++) for (let cx = (x0 >> 5) - 1; cx <= (x1 >> 5) + 1; cx++) sujos.add(W.ckey(cx, cy));
  };
  // o lugar para construir procura espaço para o palácio grande
  Reino.lugarPalacio = function () { return Palacio.lugar(); };
  const cp0 = Reino.construirPalacio;
  Reino.construirPalacio = function () { const V = Vila.st(), r = cp0.apply(this, arguments); if (V && V.palacio) V.palacioG = 1; return r; };
  // entrar no palácio do jogador abre o térreo novo
  const ei0 = Game.enterInterior; Palacio._ei0 = ei0;
  Game.enterInterior = function (b) { if (b && b.player && b.kind === 'castle' && !b.palAndar) return Palacio.ir(b, 0); return ei0.apply(this, arguments); };
  // as escadas: subir e descer
  const fi0 = Game.findInteract;
  Game.findInteract = function () {
    const r = fi0.apply(this, arguments), L = this.level, it = this.interact;
    if (L && L.palAndar !== undefined && it && it.kind === 'exit' && it.tx !== undefined) { const e = Palacio.escadaEm(L, it.tx, it.ty); if (e) { it.label = e.para > L.palAndar ? 'Subir' : 'Descer'; it.name = e.txt; it.escada = e; } }
    return r;
  };
  const di0 = Game.doInteract;
  Game.doInteract = function () {
    const it = this.interact, L = this.level;
    if (L && L.palAndar !== undefined && it && it.escada) { Sfx.play('door'); return Palacio.ir(L.b.palBase || L.b, it.escada.para, L.palAndar); }
    return di0.apply(this, arguments);
  };
  // o nome de cada cômodo escrito no chão
  const cd0 = Ceu.drawables;
  Ceu.drawables = function (D, camX, camY, vw, vh) {
    const r = cd0.apply(this, arguments), L = Game.level;
    if (L && L.salas && L.palAndar !== undefined) D.push({ y: -1e9, fn: (ctx, cx, cy) => {
      for (const s of L.salas) {
        const x = Math.round(s.x * 16 - cx), y = Math.round(s.y * 16 + 13 - cy);
        if (x < -80 || x > vw + 80 || y < -10 || y > vh + 20) continue;
        if (typeof Nitido !== 'undefined') Nitido.nome(x, y, s.nome, { cor: '#ffe8a0', fundo: 'rgba(30,18,10,0.72)' });
        else { ctx.font = '8px VT323, monospace'; ctx.fillStyle = '#ffe8a0'; ctx.textAlign = 'center'; ctx.fillText(s.nome, x, y); ctx.textAlign = 'left'; }
      }
    } });
    return r;
  };
})();
