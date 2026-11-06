'use strict';
// =====================================================================
//  ARTE DOS VEÍCULOS DA ERA MODERNA (SÓ NO MODO ADM)
//  Pixel art desenhada aqui no código, pixel por pixel (sem borrão):
//  tanques Sherman, Tiger I, Panzer IV, Mark IV (losango) e Renault FT,
//  jipe Willys, caminhão de 1914, biplano, caça e encouraçado.
//  Tanques: vista de lado (com 3 quadros de esteira andando), de frente e de
//  trás, e a torre separada (para girar e mirar sozinha).
//  Aviões: vistos de cima (giram para qualquer direção) e a sombra no chão.
// =====================================================================
if (typeof IS_ADM !== 'undefined' && IS_ADM) (function () {
  // ---------- o pincel de pixel ----------
  function Tela(w, h) {
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const x = c.getContext('2d');
    const T = {
      c, x, w, h,
      r(px, py, pw, ph, col) { if (pw <= 0 || ph <= 0) return; x.fillStyle = col; x.fillRect(Math.round(px), Math.round(py), Math.round(pw), Math.round(ph)); return T; },
      d(px, py, col) { x.fillStyle = col; x.fillRect(Math.round(px), Math.round(py), 1, 1); return T; },
      // polígono preenchido por linhas (sem antisserrilhado)
      poly(pts, col) {
        x.fillStyle = col;
        let y0 = Infinity, y1 = -Infinity; for (const [, py] of pts) { y0 = Math.min(y0, py); y1 = Math.max(y1, py); }
        for (let y = Math.floor(y0); y <= Math.ceil(y1); y++) {
          const yy = y + 0.5, xs = [];
          for (let i = 0; i < pts.length; i++) { const [ax, ay] = pts[i], [bx, by] = pts[(i + 1) % pts.length]; if ((ay <= yy && by > yy) || (by <= yy && ay > yy)) xs.push(ax + (yy - ay) / (by - ay) * (bx - ax)); }
          xs.sort((a, b) => a - b);
          for (let i = 0; i + 1 < xs.length; i += 2) { const a = Math.round(xs[i]), b = Math.round(xs[i + 1]); if (b > a) x.fillRect(a, y, b - a, 1); }
        }
        return T;
      },
      circ(cx, cy, rr, col) { x.fillStyle = col; for (let dy = -Math.ceil(rr); dy <= Math.ceil(rr); dy++) for (let dx = -Math.ceil(rr); dx <= Math.ceil(rr); dx++) if (dx * dx + dy * dy <= rr * rr + rr * 0.6) x.fillRect(Math.round(cx + dx), Math.round(cy + dy), 1, 1); return T; },
      elip(cx, cy, rx, ry, col) { x.fillStyle = col; for (let dy = -Math.ceil(ry); dy <= Math.ceil(ry); dy++) for (let dx = -Math.ceil(rx); dx <= Math.ceil(rx); dx++) if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1.05) x.fillRect(Math.round(cx + dx), Math.round(cy + dy), 1, 1); return T; },
      linha(x0, y0, x1, y1, col) { x.fillStyle = col; const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) || 1; for (let i = 0; i <= n; i++) x.fillRect(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), 1, 1); return T; },
      // contorno escuro em volta de tudo (fica nítido no jogo)
      contorno(col = '#14120e') {
        const id = x.getImageData(0, 0, w, h), D = id.data, o = new Uint8ClampedArray(D);
        const [r, g, b] = hexToRgb(col);
        for (let py = 0; py < h; py++) for (let px = 0; px < w; px++) {
          const i = (py * w + px) * 4; if (D[i + 3] > 0) continue;
          let viz = false; for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const qx = px + dx, qy = py + dy; if (qx >= 0 && qy >= 0 && qx < w && qy < h && D[(qy * w + qx) * 4 + 3] > 120) viz = true; }
          if (viz) { o[i] = r; o[i + 1] = g; o[i + 2] = b; o[i + 3] = 255; }
        }
        id.data.set(o); x.putImageData(id, 0, 0); return T;
      },
      espelho() { const c2 = document.createElement('canvas'); c2.width = w; c2.height = h; const x2 = c2.getContext('2d'); x2.translate(w, 0); x2.scale(-1, 1); x2.drawImage(c, 0, 0); return c2; }
    };
    return T;
  }
  const P = base => ({ b: base, l: shade(base, 0.2), ll: shade(base, 0.38), d: shade(base, -0.22), dd: shade(base, -0.42), ddd: shade(base, -0.6) });
  const ESTEIRA = { b: '#2e2c26', l: '#4c4a40', ll: '#6a675a', d: '#1c1b17' };
  const BORRACHA = '#1d1d1a';

  // ---------- peças comuns ----------
  function roda(t, cx, cy, rr, p, f, tipo) {
    t.circ(cx, cy, rr, BORRACHA);
    t.circ(cx, cy, rr - 1, tipo === 'disco' ? p.d : p.dd);
    if (tipo === 'disco') { t.circ(cx, cy, rr - 2.2, p.b); t.circ(cx - 0.5, cy - 0.5, Math.max(1, rr - 3.6), p.l); }
    t.circ(cx, cy, Math.max(0.8, rr * 0.28), p.dd);
    const a = f * 1.05; t.d(cx + Math.cos(a) * (rr - 1.5), cy + Math.sin(a) * (rr - 1.5), p.ll);
    t.d(cx - Math.cos(a) * (rr - 1.5), cy - Math.sin(a) * (rr - 1.5), p.d);
  }
  function engrenagem(t, cx, cy, rr, p, f) {
    t.circ(cx, cy, rr, p.dd);
    for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28 + f * 0.3; t.d(cx + Math.cos(a) * (rr + 0.6), cy + Math.sin(a) * (rr + 0.6), ESTEIRA.l); }
    t.circ(cx, cy, rr - 1.5, p.d); t.circ(cx, cy, 1, p.l);
  }
  // os elos da esteira andando (em cima e embaixo)
  function elos(t, x0, x1, ytopo, ybase, f) {
    for (let x = x0; x <= x1; x++) {
      if ((x + f) % 3 === 0) { t.d(x, ytopo, ESTEIRA.ll); t.d(x, ybase, ESTEIRA.l); }
      else if ((x + f) % 3 === 1) t.d(x, ytopo, ESTEIRA.l);
    }
  }
  // a insígnia: estrela branca (o seu veículo sem reino) ou o círculo na cor do reino
  const ESTRELA = ['...#...', '..###..', '#######', '.#####.', '..###..', '.##.##.', '.#...#.'];
  function emblema(t, cx, cy, cor) {
    if (cor === '#f0f0f0') { ESTRELA.forEach((l, y) => { for (let x = 0; x < 7; x++) if (l[x] === '#') t.d(cx - 3 + x, cy - 3 + y, '#ecebe2'); }); return; }
    t.circ(cx, cy, 3, '#e8e4d8'); t.circ(cx, cy, 2, cor); t.d(cx, cy, '#e8e4d8');
  }

  // ================== TANQUES (vista de lado, virados para a direita) ==================
  const TANQUES = {
    sherman: {
      nome: 'M4 Sherman', cor: '#5b6136', W: 78, H: 40, ancora: [40, 14], pivo: [13, 14], cano: [46, 9], frenteW: 40,
      casco(t, p, f, em) {
        t.poly([[9, 27], [64, 26], [70, 29], [68, 36], [61, 39], [15, 39], [8, 36], [6, 31]], ESTEIRA.b);
        elos(t, 10, 64, 26, 39, f);
        for (const bx of [22, 39, 56]) { t.r(bx - 4, 28, 9, 3, p.d); t.r(bx - 4, 28, 9, 1, p.b); t.circ(bx + 1, 27, 1.5, ESTEIRA.ll); roda(t, bx - 4, 34, 3.6, p, f, 'disco'); roda(t, bx + 4, 34, 3.6, p, f, 'disco'); }
        engrenagem(t, 66, 31, 3.6, p, f); roda(t, 10, 32, 3.2, p, f);
        // casco alto com a rampa da frente (glacis)
        t.poly([[11, 12], [50, 12], [68, 19], [69, 22], [69, 26], [8, 26], [8, 14]], p.b);
        t.r(11, 12, 39, 1, p.l); t.linha(50, 12, 67, 19, p.ll); t.linha(51, 13, 67, 20, p.l);
        t.r(8, 22, 62, 1, p.d); t.r(8, 25, 62, 1, p.dd);              // para-lama
        t.r(8, 14, 2, 8, p.d);                                       // chapa de trás
        for (let i = 0; i < 4; i++) t.r(12 + i * 3, 13, 2, 1, p.dd);    // grade do motor
        t.r(24, 20, 9, 1, '#6a5030'); t.r(33, 19, 2, 3, '#4a4a44');    // pá
        t.r(14, 19, 6, 1, p.dd); t.r(14, 18, 1, 2, p.dd);             // macaco
        t.circ(64, 20, 1, p.dd); t.r(65, 20, 3, 1, p.ddd);              // metralhadora do casco
        t.d(67, 22, '#e0dcb0'); t.d(67, 23, '#a8a480');                // farol
        t.r(5, 16, 3, 4, '#3a3630');                                   // escapamento
        emblema(t, 28, 16, em);
      },
      torre(t, p) {
        t.poly([[3, 14], [3, 8], [6, 4], [12, 2], [21, 2], [25, 5], [27, 9], [27, 14]], p.b);
        t.r(7, 3, 14, 1, p.l); t.r(5, 5, 18, 1, p.l); t.r(3, 13, 24, 1, p.d);
        t.r(8, 0, 6, 3, p.d); t.r(9, 0, 4, 1, p.l);                     // escotilha do comandante
        t.r(15, 1, 7, 1, '#2a2a24'); t.r(21, 0, 1, 2, '#2a2a24');        // .50 no teto
        t.r(26, 5, 4, 8, p.d); t.r(26, 5, 4, 1, p.l);                   // mantelete
        t.r(30, 8, 13, 2, p.dd); t.r(30, 8, 13, 1, p.d); t.r(42, 7, 3, 4, p.ddd);   // canhão de 75 mm
        t.d(10, 9, p.dd); t.d(16, 9, p.dd);
      }
    },
    tiger: {
      nome: 'Tiger I', cor: '#8f8460', W: 90, H: 42, ancora: [44, 17], pivo: [17, 17], cano: [58, 11], frenteW: 46,
      casco(t, p, f, em) {
        t.poly([[6, 30], [80, 29], [86, 32], [83, 39], [77, 42], [13, 42], [6, 38], [4, 33]], ESTEIRA.b);
        elos(t, 8, 80, 29, 42, f);
        for (const wx of [18, 30, 42, 54, 66]) roda(t, wx, 35, 5.6, P(shade(p.b, -0.12)), f, 'disco');     // fileira de trás
        for (const wx of [12, 24, 36, 48, 60, 72]) roda(t, wx, 36, 5.6, p, f, 'disco');                     // fileira da frente (intercaladas)
        engrenagem(t, 80, 31, 4.5, p, f); roda(t, 8, 33, 4, p, f);
        t.r(7, 17, 74, 10, p.b); t.r(7, 17, 74, 1, p.l); t.r(7, 26, 76, 2, p.d); t.r(7, 27, 76, 1, p.dd);
        t.poly([[81, 17], [86, 21], [86, 27], [81, 27]], p.d); t.linha(81, 17, 86, 21, p.l);
        t.r(84, 21, 2, 1, p.ddd);                                     // visor do motorista
        t.circ(85, 24, 1, p.ddd);                                      // metralhadora
        for (let x = 12; x < 66; x += 2) t.d(x, 21 + ((x / 2) % 2), '#3e3c34');   // cabo de reboque
        t.r(40, 23, 10, 1, '#6a5030'); t.r(50, 22, 2, 3, '#4a4a44');
        t.r(4, 13, 3, 5, '#3a3632'); t.r(4, 13, 3, 1, '#5a5650');      // escapamentos
        t.d(84, 18, '#e0dcb0');
        for (let i = 0; i < 6; i++) t.r(12 + i * 10, 18, 1, 8, p.d);   // chapas
        emblema(t, 20, 21, em);
      },
      torre(t, p) {
        t.poly([[2, 17], [2, 7], [5, 3], [29, 3], [33, 7], [33, 17]], p.b);
        t.r(5, 3, 24, 1, p.l); t.r(3, 5, 29, 1, p.l); t.r(2, 16, 31, 1, p.d);
        t.r(4, 0, 8, 3, p.d); t.r(5, 0, 6, 1, p.l);                     // cúpula do comandante
        for (let i = 0; i < 5; i++) { t.r(10 + i * 4, 9, 3, 5, p.d); t.r(10 + i * 4, 9, 3, 1, p.b); }   // elos de reserva
        t.circ(30, 6, 1, p.dd); t.circ(30, 9, 1, p.dd);                // lança-fumaça
        t.r(33, 6, 6, 10, p.d); t.r(33, 6, 6, 1, p.l); t.r(38, 8, 1, 6, p.dd);   // mantelete grande
        t.r(39, 10, 18, 3, p.dd); t.r(39, 10, 18, 1, p.d);             // canhão de 88 mm, longo
        t.r(56, 8, 5, 7, p.ddd); t.r(57, 9, 1, 5, p.dd); t.r(59, 9, 1, 5, p.dd);   // freio de boca
      }
    },
    panzer4: {
      nome: 'Panzer IV', cor: '#6c6f6a', W: 82, H: 38, ancora: [40, 16], pivo: [15, 15], cano: [56, 10], frenteW: 42,
      casco(t, p, f, em) {
        t.poly([[6, 28], [72, 27], [78, 30], [75, 36], [70, 38], [12, 38], [5, 35], [4, 31]], ESTEIRA.b);
        elos(t, 8, 72, 27, 38, f);
        for (const wx of [14, 21, 29, 36, 44, 51, 59, 66]) roda(t, wx, 34, 2.9, p, f, 'disco');
        for (const bx of [17.5, 32.5, 47.5, 62.5]) t.r(bx - 3, 30, 7, 1, p.dd);   // feixes de mola
        for (const rx of [19, 35, 51, 63]) t.circ(rx, 27, 1.2, ESTEIRA.ll);
        engrenagem(t, 75, 30, 3.6, p, f); roda(t, 8, 31, 3, p, f);
        t.r(8, 18, 64, 9, p.b); t.poly([[72, 18], [78, 22], [78, 26], [72, 26]], p.d); t.linha(72, 18, 78, 22, p.l);
        // saias de blindagem (Schürzen) cobrindo as laterais
        t.r(10, 15, 60, 12, p.b); t.r(10, 15, 60, 1, p.l); t.r(10, 26, 60, 1, p.d);
        for (let i = 1; i < 4; i++) t.r(10 + i * 15, 15, 1, 12, p.d);
        for (let i = 0; i < 4; i++) { t.d(14 + i * 15, 16, p.dd); t.d(22 + i * 15, 16, p.dd); }
        t.r(76, 23, 2, 1, p.ddd); t.d(77, 20, '#e0dcb0');
        t.r(4, 17, 3, 4, '#3a3632');
        emblema(t, 24, 21, em);
      },
      torre(t, p) {
        t.r(0, 5, 28, 11, p.b); t.r(0, 5, 28, 1, p.l); t.r(0, 15, 28, 1, p.d);        // saia da torre
        for (let i = 1; i < 3; i++) t.r(i * 9, 5, 1, 11, p.d);
        t.poly([[4, 6], [6, 3], [22, 3], [26, 6]], p.b); t.r(6, 3, 16, 1, p.l);
        t.r(4, 0, 7, 3, p.d); t.r(5, 0, 5, 1, p.l);                                 // cúpula
        t.r(28, 7, 4, 7, p.d); t.r(28, 7, 4, 1, p.l);
        t.r(32, 9, 20, 2, p.dd); t.r(32, 9, 20, 1, p.d);                          // 75 mm longo
        t.r(51, 8, 4, 4, p.ddd); t.r(52, 9, 1, 2, p.dd);                           // freio de boca
      }
    },
    mark4: {
      nome: 'Mark IV (1916)', cor: '#6b6245', W: 86, H: 40, ancora: null, cano: [62, 23], frenteW: 46,
      casco(t, p, f, em) {
        // o losango: a esteira dá a volta no tanque inteiro
        t.poly([[2, 32], [14, 5], [64, 5], [84, 21], [78, 37], [10, 38]], ESTEIRA.b);
        for (let x = 15; x < 63; x++) if ((x + f) % 3 === 0) t.d(x, 5, ESTEIRA.ll); else if ((x + f) % 3 === 1) t.d(x, 6, ESTEIRA.l);
        for (let x = 11; x < 78; x++) if ((x + f) % 3 === 0) t.d(x, 37, ESTEIRA.l);
        t.poly([[8, 30], [17, 9], [62, 9], [78, 21], [74, 33], [12, 34]], p.b);
        t.linha(17, 9, 62, 9, p.l); t.linha(62, 9, 78, 21, p.ll); t.linha(8, 30, 17, 9, p.l);
        for (let y = 12; y < 32; y += 4) for (let x = 14; x < 72; x += 5) if (x > 12 + (32 - y) * 0.4 && x < 60 + (y - 9) * 0.8) t.d(x, y, p.dd);   // rebites
        for (const rx of [18, 30, 42, 54, 66]) roda(t, rx, 33, 2.4, p, f);
        // a casamata do canhão (sponson) e o canhão de 6 libras
        t.r(30, 17, 18, 11, p.d); t.r(30, 17, 18, 1, p.b); t.r(31, 20, 4, 2, p.ddd);
        t.r(48, 21, 12, 2, p.dd); t.r(48, 21, 12, 1, p.d); t.r(59, 20, 2, 4, p.ddd);
        t.r(52, 2, 14, 6, p.b); t.r(52, 2, 14, 1, p.l); t.r(55, 4, 3, 1, p.ddd); t.r(60, 4, 3, 1, p.ddd);   // cabine
        t.r(16, 3, 44, 1, '#5a4a32'); t.r(16, 2, 1, 2, '#3a3020'); t.r(59, 2, 1, 2, '#3a3020');           // trilho da viga
        t.r(4, 22, 6, 1, '#3a3020'); t.r(6, 20, 1, 4, '#3a3020');
        emblema(t, 22, 22, em);
      }
    },
    ft17: {
      nome: 'Renault FT (1917)', cor: '#6a6a4a', W: 52, H: 34, ancora: [26, 14], pivo: [9, 10], cano: [24, 6], frenteW: 28,
      casco(t, p, f, em) {
        t.poly([[4, 25], [10, 18], [38, 16], [48, 21], [46, 31], [40, 33], [10, 33], [5, 30]], ESTEIRA.b);
        elos(t, 8, 44, 16, 33, f);
        t.circ(42, 23, 5, p.dd); t.circ(42, 23, 3.5, p.d); t.circ(42, 23, 1, p.l);    // roda grande da frente
        for (const wx of [13, 19, 25, 31]) roda(t, wx, 29, 2.4, p, f);
        t.r(10, 12, 30, 11, p.b); t.r(10, 12, 30, 1, p.l); t.poly([[40, 12], [46, 18], [46, 22], [40, 22]], p.d); t.linha(40, 12, 46, 18, p.l);
        t.r(0, 21, 10, 2, p.d); t.r(0, 21, 10, 1, p.b);                                // rabo para trincheiras
        for (let x = 13; x < 38; x += 4) t.d(x, 15, p.dd);
        t.r(43, 16, 2, 1, p.ddd);
        emblema(t, 18, 17, em);
      },
      torre(t, p) {
        t.poly([[1, 10], [1, 4], [4, 1], [13, 1], [16, 4], [16, 10]], p.b);
        t.r(4, 1, 9, 1, p.l); t.r(1, 9, 15, 1, p.d); t.r(6, 0, 4, 1, p.d);
        t.r(16, 5, 2, 3, p.d); t.r(18, 5, 6, 2, p.dd); t.r(18, 5, 6, 1, p.d);
      }
    }
  };

  // vista de frente e de trás (genéricas, com as proporções de cada tanque)
  function frenteTanque(M, p, tras) {
    const W = M.frenteW, H = 34, t = Tela(W, H), tw = Math.round(W * 0.2);
    t.r(0, H - 16, tw, 16, ESTEIRA.b); t.r(W - tw, H - 16, tw, 16, ESTEIRA.b);
    for (let y = H - 16; y < H; y += 2) { t.r(1, y, tw - 2, 1, ESTEIRA.l); t.r(W - tw + 1, y, tw - 2, 1, ESTEIRA.l); }
    t.r(tw - 1, H - 20, W - tw * 2 + 2, 14, p.b); t.r(tw - 1, H - 20, W - tw * 2 + 2, 1, p.l);
    t.r(0, H - 18, W, 3, p.d); t.r(0, H - 18, W, 1, p.l);                                         // para-lamas
    if (!tras) { t.r(tw + 2, H - 14, 4, 2, p.ddd); t.r(W - tw - 6, H - 14, 4, 2, p.ddd); t.d(tw, H - 16, '#e0dcb0'); t.d(W - tw - 1, H - 16, '#e0dcb0'); t.r(Math.round(W / 2) - 3, H - 9, 6, 3, p.d); }
    else { t.r(tw + 2, H - 13, 3, 4, '#3a3630'); t.r(W - tw - 5, H - 13, 3, 4, '#3a3630'); t.r(Math.round(W / 2) - 4, H - 12, 8, 4, p.d); }
    if (!M.torre) {     // o Mark IV não tem torre: a cabine e o losango
      t.r(Math.round(W / 2) - 7, H - 28, 14, 9, p.b); t.r(Math.round(W / 2) - 7, H - 28, 14, 1, p.l);
      if (!tras) { t.r(Math.round(W / 2) - 4, H - 25, 2, 1, p.ddd); t.r(Math.round(W / 2) + 2, H - 25, 2, 1, p.ddd); }
      t.r(0, H - 30, tw, 14, ESTEIRA.b); t.r(W - tw, H - 30, tw, 14, ESTEIRA.b);
    }
    return t.contorno().c;
  }
  function torreFrente(M, p, tras) {
    const W = Math.round(M.frenteW * 0.6), H = 16, t = Tela(W, H), cx = Math.round(W / 2);
    t.poly([[1, H - 1], [2, 5], [5, 2], [W - 6, 2], [W - 3, 5], [W - 2, H - 1]], p.b);
    t.r(5, 2, W - 11, 1, p.l); t.r(1, H - 2, W - 2, 1, p.d);
    t.r(3, 0, 6, 3, p.d); t.r(4, 0, 4, 1, p.l);
    if (!tras) { t.r(cx - 4, 7, 8, 7, p.d); t.r(cx - 4, 7, 8, 1, p.l); t.circ(cx, 10, 2.4, p.ddd); t.circ(cx, 10, 1.2, '#0a0a08'); }
    else { t.r(cx - 6, 7, 12, 6, p.d); t.r(cx - 6, 7, 12, 1, p.b); }
    return t.contorno().c;
  }

  const cache = new Map();
  const Arte = {
    TANQUES,
    tanque(modelo, cor, em) {
      const k = modelo + cor + em; if (cache.has(k)) return cache.get(k);
      const M = TANQUES[modelo], p = P(cor), lado = [];
      for (let f = 0; f < 3; f++) { const t = Tela(M.W, M.H); M.casco(t, p, f, em); lado.push(t.contorno()); }
      let torre = null;
      if (M.torre) { const tw = M.cano[0] + 6, t = Tela(tw, 20); M.torre(t, p); torre = t.contorno(); }
      const r = {
        M, lado: lado.map(t => t.c), ladoE: lado.map(t => t.espelho()),
        torre: torre && torre.c, torreE: torre && torre.espelho(),
        frente: frenteTanque(M, p, false), tras: frenteTanque(M, p, true),
        tFrente: M.torre ? torreFrente(M, p, false) : null, tTras: M.torre ? torreFrente(M, p, true) : null
      };
      cache.set(k, r); return r;
    },
    // ---------- carros ----------
    jipe(cor, em) {
      const k = 'jipe' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), quadros = [];
      for (let f = 0; f < 3; f++) {
        const t = Tela(40, 24);
        t.r(4, 10, 31, 7, p.b); t.r(4, 10, 31, 1, p.l); t.r(24, 8, 11, 3, p.b); t.r(24, 8, 11, 1, p.l);
        for (let i = 0; i < 4; i++) t.r(35, 9 + i * 2, 1, 1, p.dd);                 // grade
        t.r(35, 8, 1, 9, p.d); t.d(36, 10, '#e0dcb0');
        t.r(19, 2, 1, 8, p.dd); t.r(20, 3, 4, 6, '#9ab8c8'); t.r(20, 3, 4, 1, '#c8e0ec'); t.r(19, 2, 5, 1, p.dd);   // para-brisa
        t.r(9, 7, 8, 3, '#3a3020'); t.r(10, 6, 2, 1, '#2a2a24');                   // bancos e volante
        t.r(16, 5, 1, 4, '#2a2a24');
        t.circ(2, 12, 3.6, BORRACHA); t.circ(2, 12, 2, p.d);                       // estepe
        t.r(6, 15, 8, 2, p.dd); t.r(25, 15, 9, 2, p.dd);                          // para-lamas
        for (const wx of [10, 30]) { t.circ(wx, 19, 4.5, BORRACHA); t.circ(wx, 19, 2.6, p.d); t.circ(wx, 19, 1, '#9a9a8a'); const a = f * 2.1; t.d(wx + Math.cos(a) * 3.5, 19 + Math.sin(a) * 3.5, '#3a3a36'); }
        emblema(t, 28, 13, em);
        quadros.push(t.contorno());
      }
      const r = { lado: quadros.map(t => t.c), ladoE: quadros.map(t => t.espelho()), W: 40, H: 24 };
      cache.set(k, r); return r;
    },
    caminhao(cor, em) {
      const k = 'cam' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), lona = P('#8a8462'), quadros = [];
      for (let f = 0; f < 3; f++) {
        const t = Tela(54, 32);
        t.r(3, 22, 48, 2, p.ddd);                                                 // chassi
        t.poly([[4, 21], [4, 6], [7, 3], [28, 3], [31, 6], [31, 21]], lona.b);  // lona arqueada
        t.r(7, 3, 21, 1, lona.l); for (let i = 1; i < 5; i++) t.r(4 + i * 5.4, 4, 1, 17, lona.d);
        t.r(4, 18, 27, 3, p.d); t.r(4, 18, 27, 1, p.b);
        t.r(32, 9, 12, 13, p.b); t.r(32, 8, 13, 2, p.d); t.r(32, 8, 13, 1, p.l);   // cabine
        t.r(35, 11, 7, 5, '#9ab8c8'); t.r(35, 11, 7, 1, '#c8e0ec');
        t.r(44, 13, 8, 9, p.b); t.r(44, 13, 8, 1, p.l); t.r(51, 13, 1, 9, p.dd);   // capô e radiador
        for (let y = 15; y < 21; y += 2) t.r(45, y, 5, 1, p.d);
        t.d(52, 15, '#e0dcb0');
        for (const wx of [12, 42]) { t.circ(wx, 26, 5, BORRACHA); t.circ(wx, 26, 3.4, p.d); for (let i = 0; i < 6; i++) { const a = i / 6 * 6.28 + f * 0.35; t.linha(wx, 26, wx + Math.cos(a) * 3, 26 + Math.sin(a) * 3, p.l); } t.circ(wx, 26, 1, p.dd); }
        emblema(t, 18, 12, em);
        quadros.push(t.contorno());
      }
      const r = { lado: quadros.map(t => t.c), ladoE: quadros.map(t => t.espelho()), W: 54, H: 32 };
      cache.set(k, r); return r;
    },
    // ---------- aviões (de cima, com o nariz para cima) ----------
    biplano(cor, em) {
      const k = 'bip' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(48, 38);
      t.r(5, 16, 38, 2, p.dd);                                                     // asa de baixo aparecendo
      t.poly([[2, 9], [4, 7], [44, 7], [46, 9], [46, 14], [44, 16], [4, 16], [2, 14]], p.b);   // asa de cima
      t.r(4, 7, 40, 1, p.l); t.r(3, 8, 42, 1, p.l); t.r(3, 15, 42, 1, p.d);
      for (let x = 8; x < 42; x += 4) t.r(x, 9, 1, 6, p.d);                        // nervuras
      t.circ(9, 11, 3, '#e8e4d8'); t.circ(9, 11, 2, em); t.circ(39, 11, 3, '#e8e4d8'); t.circ(39, 11, 2, em);
      t.poly([[21, 2], [27, 2], [27, 30], [25, 35], [23, 35], [21, 30]], p.d);    // fuselagem
      t.r(22, 3, 4, 26, p.b); t.r(23, 3, 1, 26, p.l);
      t.circ(24, 4, 3, '#3a3630'); t.circ(24, 4, 1.4, '#6a665a');                  // capô redondo do motor
      t.r(22, 18, 4, 3, '#2a1a10'); t.d(23, 18, '#6a4a2a');                        // cabine e piloto
      t.poly([[15, 30], [33, 30], [33, 33], [15, 33]], p.b); t.r(15, 30, 18, 1, p.l);   // estabilizador
      t.r(23, 31, 2, 6, p.dd);
      t.contorno();
      const r = { c: t.c, W: 48, H: 38, nariz: 2, sombra: this.sombra(t.c) };
      cache.set(k, r); return r;
    },
    caca(cor, em) {
      const k = 'caca' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(54, 42);
      t.elip(27, 16, 26, 5.5, p.b);                                                // asa elíptica
      t.elip(27, 15, 25, 3.5, p.l); t.elip(27, 16, 24, 3, p.b);
      for (let x = 6; x < 48; x += 6) t.d(x, 17, p.d);
      t.r(4, 15, 2, 1, p.dd); t.r(48, 15, 2, 1, p.dd);
      t.circ(12, 16, 2.6, '#e8e4d8'); t.circ(12, 16, 1.6, em); t.circ(42, 16, 2.6, '#e8e4d8'); t.circ(42, 16, 1.6, em);
      t.r(17, 12, 1, 4, '#2a2a24'); t.r(36, 12, 1, 4, '#2a2a24');                  // canhões nas asas
      t.poly([[24, 3], [30, 3], [31, 10], [30, 30], [28, 39], [26, 39], [24, 30], [23, 10]], p.b);   // fuselagem
      t.r(26, 4, 1, 30, p.l); t.r(29, 6, 1, 26, p.d);
      for (let y = 6; y < 11; y += 2) { t.d(23, y, '#2a2a24'); t.d(31, y, '#2a2a24'); }   // escapamentos
      t.elip(27, 14, 2, 3.2, '#7aa8c8'); t.d(26, 12, '#d0e8f4'); t.d(27, 12, '#b8d8ec');   // cabine de vidro
      t.elip(27, 36, 8.5, 2.4, p.b); t.r(19, 35, 17, 1, p.l);                        // profundores
      t.circ(27, 2, 2, '#3a3a36'); t.d(27, 1, '#8a8a80');                            // cubo da hélice
      t.contorno();
      const r = { c: t.c, W: 54, H: 42, nariz: 1, sombra: this.sombra(t.c) };
      cache.set(k, r); return r;
    },
    sombra(c) { const s = document.createElement('canvas'); s.width = c.width; s.height = c.height; const x = s.getContext('2d'); x.drawImage(c, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#000'; x.fillRect(0, 0, c.width, c.height); return s; },
    // ---------- o encouraçado ----------
    navio(cor, em) {
      const k = 'navio' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(156, 54);
      t.poly([[4, 38], [140, 38], [154, 31], [150, 46], [144, 50], [12, 50], [2, 44]], p.d);      // casco com a proa inclinada
      t.r(6, 47, 140, 3, '#6a2a26'); t.r(6, 46, 140, 1, '#8a3a30');                                // linha d'água
      t.r(4, 37, 138, 2, p.l); t.linha(140, 38, 154, 31, p.ll);
      for (let x = 14; x < 136; x += 7) t.d(x, 41, p.dd);                                           // escotilhas
      // a torre de comando, as chaminés e os mastros
      t.r(60, 26, 26, 11, p.b); t.r(60, 26, 26, 1, p.l);
      t.r(64, 16, 16, 10, p.b); t.r(64, 16, 16, 1, p.l); t.r(66, 19, 12, 2, '#1a1a1a');
      t.r(68, 8, 9, 8, p.b); t.r(68, 8, 9, 1, p.l); t.r(69, 10, 7, 1, '#1a1a1a');
      t.r(72, 0, 1, 8, '#2a2a2a'); t.r(66, 3, 13, 1, '#2a2a2a');
      t.r(88, 16, 7, 21, p.d); t.r(88, 14, 7, 2, '#2a2a28'); t.r(89, 16, 1, 21, p.b);
      t.r(98, 19, 6, 18, p.d); t.r(98, 17, 6, 2, '#2a2a28'); t.r(99, 19, 1, 18, p.b);
      t.r(40, 6, 1, 31, '#2a2a2a'); t.r(36, 10, 9, 1, '#2a2a2a');
      // as torres de canhões (3 canos cada): duas na frente, duas atrás
      const torreta = (x, y, dir) => { t.r(x, y, 14, 6, p.b); t.r(x, y, 14, 1, p.l); t.r(x, y + 5, 14, 1, p.dd); for (let i = 0; i < 3; i++) t.r(dir > 0 ? x + 14 : x - 15, y + 1 + i * 1.6, 15, 1, '#2a2e34'); };
      torreta(118, 31, 1); torreta(104, 26, 1); torreta(26, 31, -1); torreta(42, 26, -1);
      for (const sx of [56, 84, 110]) { t.r(sx, 34, 4, 3, p.dd); t.r(sx + 4, 35, 4, 1, '#2a2e34'); }   // canhões secundários
      t.circ(124, 42, 2.4, '#e8e4d8'); t.circ(124, 42, 1.4, em);
      t.contorno();
      const r = { c: t.c, cE: t.espelho(), W: 156, H: 54 };
      cache.set(k, r); return r;
    }
  };
  // ---------- destróier, submarino, porta-aviões e lancha de desembarque ----------
  Object.assign(Arte, {
    destroier(cor, em) {
      const k = 'destr' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(114, 40);
      t.poly([[3, 26], [100, 26], [112, 19], [108, 32], [101, 36], [8, 36], [2, 31]], p.d);
      t.r(5, 33, 99, 3, '#6a2a26'); t.r(5, 32, 99, 1, '#8a3a30'); t.r(3, 25, 98, 2, p.l); t.linha(100, 26, 112, 19, p.ll);
      for (let x = 12; x < 96; x += 8) t.d(x, 29, p.dd);
      t.r(62, 15, 15, 10, p.b); t.r(62, 15, 15, 1, p.l); t.r(64, 18, 11, 2, '#1a1a1a'); t.r(66, 10, 8, 5, p.b); t.r(67, 11, 6, 1, '#1a1a1a');
      t.r(69, 1, 1, 9, '#2a2a2a'); t.r(64, 4, 11, 1, '#2a2a2a'); t.r(70, 6, 5, 1, '#3a3a3a');
      t.r(46, 14, 7, 11, p.d); t.r(46, 12, 7, 2, '#2a2a28'); t.r(47, 14, 1, 11, p.b); t.r(36, 17, 6, 8, p.d); t.r(36, 15, 6, 2, '#2a2a28');
      const torre = (x, dir) => { t.r(x, 20, 10, 5, p.b); t.r(x, 20, 10, 1, p.l); t.elip(x + 5, 20, 5, 2, p.b); t.r(dir > 0 ? x + 10 : x - 10, 21, 10, 1, '#2a2e34'); };
      torre(84, 1); torre(76, 1); torre(14, -1);
      t.r(24, 22, 9, 3, '#3a3e44'); t.r(24, 22, 9, 1, '#5a5e64'); for (const x of [5, 9]) t.circ(x, 23, 1.5, '#3a3e44');
      t.circ(104, 28, 2, '#e8e4d8'); t.circ(104, 28, 1.1, em); t.contorno();
      const r = { c: t.c, cE: t.espelho(), W: 114, H: 40 }; cache.set(k, r); return r;
    },
    submarino(cor, em) {
      const k = 'sub' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(98, 28);
      t.elip(49, 20, 46, 5.5, p.d); t.elip(49, 18.5, 44, 3, p.b); t.r(8, 17, 82, 1, p.l);
      t.poly([[93, 20], [97, 17], [97, 23]], p.dd); t.poly([[3, 20], [0, 16], [0, 24]], p.dd);
      t.poly([[40, 8], [58, 8], [62, 16], [36, 16]], p.b); t.r(40, 8, 18, 1, p.l); t.r(44, 11, 9, 1, '#1a1a1a');
      t.r(48, 0, 1, 8, '#2a2a2a'); t.r(48, 0, 3, 1, '#2a2a2a'); t.r(52, 3, 1, 5, '#2a2a2a');
      t.r(68, 13, 4, 3, p.dd); t.r(72, 13, 7, 1, '#2a2e34'); t.r(30, 14, 3, 2, p.dd);
      t.circ(44, 13, 1.6, '#e8e4d8'); t.circ(44, 13, 0.9, em); t.contorno();
      const r = { c: t.c, cE: t.espelho(), W: 98, H: 28 }; cache.set(k, r); return r;
    },
    portaavioes(cor, em) {
      const k = 'pa' + cor + em; if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(194, 60);
      t.poly([[6, 40], [176, 40], [191, 31], [186, 50], [177, 55], [12, 55], [4, 48]], p.d);
      t.r(8, 51, 170, 4, '#6a2a26'); t.r(8, 50, 170, 1, '#8a3a30'); for (let x = 16; x < 170; x += 9) t.d(x, 45, p.dd);
      t.poly([[0, 32], [184, 32], [193, 28], [189, 39], [3, 39]], '#55595e'); t.r(1, 32, 186, 1, '#7a7e84'); t.r(3, 38, 184, 1, '#3a3e42');
      for (let x = 8; x < 178; x += 12) t.r(x, 35, 6, 1, '#e8e8e0');
      t.r(2, 33, 1, 5, '#e8e8e0'); t.r(184, 33, 1, 5, '#e8e8e0'); t.linha(150, 38, 178, 32, '#d8c040');
      t.r(120, 14, 24, 18, p.b); t.r(120, 14, 24, 1, p.l); t.r(122, 18, 20, 2, '#1a1a1a'); t.r(122, 24, 20, 1, '#1a1a1a');
      t.r(126, 5, 11, 9, p.d); t.r(126, 4, 11, 1, '#2a2a28'); t.r(131, 0, 1, 5, '#2a2a2a'); t.r(127, 1, 9, 1, '#2a2a2a'); t.r(139, 9, 5, 2, '#3a3a3a');
      const aviao = x => { t.r(x, 29, 15, 3, '#6a7a6a'); t.r(x + 1, 29, 13, 1, '#8a9a8a'); t.r(x + 5, 27, 5, 2, '#5a6a5a'); t.r(x, 26, 2, 3, '#5a6a5a'); t.d(x + 14, 30, '#2a2a2a'); t.circ(x + 7, 30, 0.9, em); };
      for (const x of [14, 36, 58, 80]) aviao(x);
      t.r(150, 28, 9, 3, '#3a3e44'); t.r(158, 29, 6, 1, '#2a2e34'); t.r(98, 28, 9, 3, '#3a3e44'); t.r(106, 29, 6, 1, '#2a2e34');
      t.circ(170, 45, 2.4, '#e8e4d8'); t.circ(170, 45, 1.4, em); t.contorno();
      const r = { c: t.c, cE: t.espelho(), W: 194, H: 60 }; cache.set(k, r); return r;
    },
    lancha(cor, em, cheia) {
      const k = 'lan' + cor + em + (cheia ? 1 : 0); if (cache.has(k)) return cache.get(k);
      const p = P(cor), t = Tela(46, 22);
      t.poly([[2, 11], [38, 11], [44, 6], [44, 17], [37, 20], [5, 20], [1, 16]], p.d); t.r(3, 18, 36, 2, '#4a3a2a');
      t.r(39, 5, 5, 12, p.b); t.r(39, 5, 1, 12, p.l); t.r(3, 10, 35, 2, p.b); t.r(4, 10, 34, 1, p.l);
      t.r(4, 5, 7, 6, p.b); t.r(5, 6, 5, 2, '#1a1a1a'); t.r(6, 2, 1, 3, '#2a2a2a');
      if (cheia) for (let x = 14; x < 37; x += 4) { t.elip(x, 9, 2, 1.6, '#4a4e42'); t.d(x, 8, '#6a6e60'); }
      t.circ(30, 15, 1.4, em); t.contorno();
      const r = { c: t.c, cE: t.espelho(), W: 46, H: 22 }; cache.set(k, r); return r;
    }
  });
  Arte.Tela = Tela; Arte.P = P; Arte.roda = roda; Arte.emblema = emblema;
  window.EraArte = Arte;
})();
