'use strict';
// ===================== DRAGÕES E CAVALOS (desenho novo) =====================
// Dragão de perfil com pescoço em S, cabeça com chifres e dentes, asas de morcego com os ossos à
// mostra (batem em três quadros), escamas, placas na barriga, garras e cauda com ponta de lança.
// Cavalo com anatomia de verdade: peito, garupa, pescoço arqueado, crina, cauda, patas com
// joelhos e cascos, sela e rédeas — e as variações de cada montaria.
(function () {
  const cv = Sprites.cv, P = Sprites.P, ellipse = Sprites.ellipse;
  const linha = (p, x0, y0, x1, y1, col, w = 1) => { const n = Math.max(1, Math.round(Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)))); for (let i = 0; i <= n; i++) p(Math.round(x0 + (x1 - x0) * i / n), Math.round(y0 + (y1 - y0) * i / n), col, w, w); };
  const tri = (p, ax, ay, bx, by, cx, cy, col) => {
    const minY = Math.floor(Math.min(ay, by, cy)), maxY = Math.ceil(Math.max(ay, by, cy));
    for (let y = minY; y <= maxY; y++) {
      const xs = [];
      for (const [x1, y1, x2, y2] of [[ax, ay, bx, by], [bx, by, cx, cy], [cx, cy, ax, ay]]) { if ((y >= Math.min(y1, y2)) && (y <= Math.max(y1, y2)) && y1 !== y2) xs.push(x1 + (y - y1) * (x2 - x1) / (y2 - y1)); }
      if (xs.length >= 2) { const a = Math.round(Math.min(...xs)), b = Math.round(Math.max(...xs)); p(a, y, col, b - a + 1, 1); }
    }
  };

  // ---------- DRAGÃO ----------
  function dragao(L, frame) {
    const col = L.c || '#7a2a2a', hi = shade(col, 0.28), sh = shade(col, -0.28), dk = shade(col, -0.52);
    const belly = mix(col, '#e8c888', 0.6), bellyS = shade(belly, -0.2), glow = L.glow || '#ffc030', bone = '#efe4c8', boneS = '#bfb08a';
    const mem = shade(mix(col, '#3a1a2a', 0.25), -0.12), memS = shade(mem, -0.25);
    const W = 76, H = 56, c = cv(W, H), p = P(c.getContext('2d'));
    const ombro = { x: 38, y: 26 };
    const asa = (far, k) => {
      // k: 0 = asa no alto, 1 = no meio, 2 = embaixo
      const o = far ? { x: ombro.x - 3, y: ombro.y - 2 } : ombro;
      const cotov = k === 0 ? { x: o.x - 10, y: o.y - 18 } : k === 1 ? { x: o.x - 14, y: o.y - 8 } : { x: o.x - 12, y: o.y + 2 };
      const pontas = k === 0 ? [[o.x - 30, o.y - 24], [o.x - 34, o.y - 12], [o.x - 30, o.y - 2], [o.x - 22, o.y + 4]]
        : k === 1 ? [[o.x - 36, o.y - 12], [o.x - 36, o.y - 2], [o.x - 30, o.y + 6], [o.x - 20, o.y + 8]]
          : [[o.x - 32, o.y + 8], [o.x - 28, o.y + 16], [o.x - 20, o.y + 18], [o.x - 10, o.y + 14]];
      const m = far ? memS : mem;
      for (let i = 0; i < pontas.length - 1; i++) tri(p, cotov.x, cotov.y, pontas[i][0], pontas[i][1], pontas[i + 1][0], pontas[i + 1][1], i % 2 ? m : shade(m, 0.08));
      tri(p, o.x, o.y, cotov.x, cotov.y, pontas[pontas.length - 1][0], pontas[pontas.length - 1][1], m);
      // borda recortada da membrana
      for (let i = 0; i < pontas.length - 1; i++) { const mx = (pontas[i][0] + pontas[i + 1][0]) / 2 + 2, my = (pontas[i][1] + pontas[i + 1][1]) / 2 + 1; p(Math.round(mx), Math.round(my), shade(m, -0.2)); }
      linha(p, o.x, o.y, cotov.x, cotov.y, far ? dk : sh, 2);
      for (const [x, y] of pontas) linha(p, cotov.x, cotov.y, x, y, far ? dk : sh, 1);
      p(cotov.x - 1, cotov.y - 2, far ? boneS : bone, 2, 2);   // garra da asa
    };
    const kAsa = frame === 0 ? 0 : frame === 1 ? 2 : 1;
    asa(true, kAsa === 2 ? 1 : kAsa === 0 ? 1 : 0);
    // cauda (com ponta de lança)
    const cauda = []; for (let i = 0; i <= 20; i++) { const t = i / 20; cauda.push([26 - t * 22, 34 + Math.sin(t * 3.2 + frame * 0.8) * 3 + t * 4]); }
    cauda.forEach(([x, y], i) => { const r = 3.2 - i * 0.12; ellipse(p, x, y, Math.max(1, r), Math.max(1, r * 0.8), i % 4 === 0 ? sh : col); p(Math.round(x), Math.round(y - r + 1), hi); });
    const [tx, ty] = cauda[cauda.length - 1]; tri(p, tx + 2, ty - 1, tx - 6, ty - 5, tx - 5, ty + 4, dk); tri(p, tx + 1, ty, tx - 4, ty - 3, tx - 3, ty + 2, sh);
    // perna traseira (atrás)
    const passo = frame === 1 ? 2 : frame === 2 ? -2 : 0;
    ellipse(p, 28, 37, 5, 5, sh); linha(p, 28, 40, 26 - passo, 47, dk, 3); p(23 - passo, 47, dk, 6, 2); for (let i = 0; i < 3; i++) p(23 - passo + i * 2, 49, bone);
    // corpo
    ellipse(p, 36, 32, 15, 9, col);
    ellipse(p, 36, 28, 13, 5, hi);
    ellipse(p, 36, 30, 14, 6, col);
    ellipse(p, 37, 37, 11, 4, belly);
    for (let x = 28; x < 47; x += 3) p(x, 35, bellyS, 1, 5);
    for (let x = 24; x < 48; x += 4) for (let y = 27; y < 33; y += 3) p(x + (y % 2), y, sh);   // escamas
    // espinhos nas costas
    for (let x = 24; x < 48; x += 4) tri(p, x, 24, x + 3, 24, x + 1, 19 + (x % 8 === 0 ? -1 : 0), dk);
    // pescoço em S
    const pesc = []; for (let i = 0; i <= 14; i++) { const t = i / 14; pesc.push([46 + t * 14 + Math.sin(t * 3) * 2, 28 - t * 18 - Math.sin(t * 3.1) * 2]); }
    pesc.forEach(([x, y], i) => { const r = 5 - i * 0.14; ellipse(p, x, y, r, r, col); p(Math.round(x + 2), Math.round(y + r - 1), belly, 2, 1); if (i % 3 === 0) tri(p, x - 3, y - r + 1, x, y - r + 1, x - 2, y - r - 3, dk); });
    // cabeça
    const hx = 58, hy = 3;
    ellipse(p, hx + 3, hy + 6, 6, 5, col);                 // crânio
    p(hx + 4, hy + 4, col, 12, 6); p(hx + 4, hy + 4, hi, 11, 1);   // focinho
    p(hx + 15, hy + 5, col, 2, 4);
    p(hx + 5, hy + 10, sh, 11, 2);                         // mandíbula
    const abre = frame === 2 ? 2 : 0;
    if (abre) { p(hx + 7, hy + 10, '#3a0a0a', 9, abre); p(hx + 5, hy + 10 + abre, sh, 11, 2); }
    for (let x = hx + 7; x < hx + 16; x += 2) { p(x, hy + 10, '#f8f4e8'); p(x + 1, hy + 11 + abre, '#f8f4e8'); }   // dentes
    p(hx + 15, hy + 5, dk);                                // narina
    p(hx + 6, hy + 5, '#1a0808', 3, 2); p(hx + 7, hy + 5, glow, 2, 1); p(hx + 7, hy + 4, dk, 3, 1);   // olho e sobrancelha
    linha(p, hx + 1, hy + 3, hx - 7, hy - 3, bone, 2); p(hx - 8, hy - 4, boneS, 2, 2);   // chifres
    linha(p, hx + 3, hy + 2, hx - 3, hy - 5, bone, 1); p(hx - 4, hy - 6, boneS);
    for (let i = 0; i < 3; i++) p(hx - 1 - i * 2, hy + 9 + i, dk, 2, 2);   // espinhos da bochecha
    if (frame === 2 && !L.nofire) { p(hx + 17, hy + 8, glow, 3, 2); p(hx + 19, hy + 7, '#fff0a0', 2, 2); }
    // perna dianteira
    ellipse(p, 44, 37, 4, 4, col); linha(p, 44, 40, 46 + passo, 47, sh, 3); p(44 + passo, 47, sh, 6, 2); for (let i = 0; i < 3; i++) p(45 + passo + i * 2, 49, bone);
    // asa da frente
    asa(false, kAsa);
    // cabeças extras (hidra)
    const heads = L.heads || 1;
    for (let h = 1; h < heads; h++) { const oy = h * 9, ox = -h * 4; for (let i = 0; i < 8; i++) ellipse(p, 47 + i * 1.4 + ox, 26 - i * 1.6 + oy * 0.4, 3, 3, sh); p(hx + ox - 2, hy + oy + 4, sh, 12, 6); p(hx + ox + 4, hy + oy + 5, glow, 2, 1); for (let x = hx + ox + 2; x < hx + ox + 10; x += 2) p(x, hy + oy + 10, '#f8f4e8'); }
    Sprites.outline(c, '#140a10');
    return L.size ? Sprites.scale(c, L.size) : c;
  }
  Sprites.dragao = dragao;

  // ---------- CAVALOS ----------
  const cache = {};
  Sprites.horse = function (kind = 'cavalo') {
    if (cache[kind]) return cache[kind];
    const M = MOUNTS[kind] || MOUNTS.cavalo;
    if (M.wolf) {
      const right = [0, 1, 2].map(f => { let c = Sprites.actor({ k: 'wolf', c: M.c }).right[f]; c = Sprites.scale(c, 1.25); const o = cv(30, 24), x = o.getContext('2d'); x.drawImage(c, 0, 0); P(x)(10, 6, '#7a2a1a', 6, 3); return o; });
      return (cache[kind] = { right, left: right.map(Sprites.flip) });
    }
    const mk = (f) => {
      const c = cv(30, 24), p = P(c.getContext('2d'));
      const col = M.c, hi = shade(col, 0.22), sh = shade(col, -0.22), dk = shade(col, -0.45);
      const crina = kind === 'corcel' ? '#d8e0f8' : kind === 'camelo' ? shade(col, -0.2) : kind === 'alce' ? shade(col, -0.3) : shade(col, -0.6), crinaH = shade(crina, 0.25);
      const burro = kind === 'burro', camelo = kind === 'camelo';
      const by = burro ? 11 : 9;                            // linha das costas
      const casco = '#1e1612';
      // patas: [x do quadril/ombro, frente?] com o ciclo de passo
      const fase = f === 0 ? [0, 0, 0, 0] : f === 1 ? [3, -2, -2, 3] : [-2, 3, 3, -2];
      const pata = (x, fr, fz, atras) => {
        const top = by + 6, joelho = top + (burro ? 4 : 5), chao = 23, cor = atras ? dk : sh;
        const kx = x + Math.round(fz * 0.5) + (fr ? 0 : -1), hx2 = x + fz;
        linha(p, x, top, kx, joelho, cor, 2);
        linha(p, kx, joelho, hx2, chao - 1, cor, 1); p(hx2 + (atras ? 0 : 1), joelho + 1, cor, 1, chao - joelho - 2);
        p(hx2, chao - 1, casco, 3, 1); p(hx2 + 2, chao - 2, casco);
        if (kind === 'cavalo_guerra' || kind === 'corcel') p(hx2, chao - 3, kind === 'corcel' ? '#f4f4ff' : '#c8c0b0', 2, 1);   // franjas nos cascos
      };
      pata(8, false, fase[0], true); pata(20, true, fase[1], true);
      // cauda
      for (let i = 0; i < 11; i++) { const x = 4 - Math.round(i * 0.35 + (f === 1 ? i * 0.1 : 0)), y = by + 2 + i; p(x, y, i % 3 === 0 ? crinaH : crina, i < 3 ? 3 : 2, 1); }
      // corpo: garupa, barril e peito
      ellipse(p, 9, by + 4, 5, 4.5, col); ellipse(p, 15, by + 5, 7, 4, col); ellipse(p, 20, by + 4, 4.5, 4.5, col);
      p(6, by, hi, 16, 1); p(8, by + 8, sh, 14, 1); p(5, by + 2, hi, 1, 4);
      if (camelo) { ellipse(p, 11, by - 1, 3, 3, col); ellipse(p, 17, by - 1, 3, 3, col); p(9, by - 3, hi, 4, 1); p(15, by - 3, hi, 4, 1); }
      // pescoço arqueado e cabeça comprida, inclinada para baixo
      const nx = 20, hy = by - 6;
      for (let i = 0; i < 7; i++) { const t = i / 6; p(Math.round(nx + t * 5), Math.round(by + 3 - t * 7), col, 4, 3); }
      p(nx + 1, by - 1, hi, 1, 3);
      linha(p, 24, hy + 1, 28, hy + 5, col, 3); p(27, hy + 5, col, 3, 2); p(29, hy + 6, sh, 1, 1);   // cabeça e focinho
      p(28, hy + 7, dk, 2, 1); p(29, hy + 5, dk);                                                    // boca e narina
      p(25, hy + 1, '#100808'); p(24, hy, hi, 2, 1);                                                 // olho
      if (burro) { p(23, hy - 4, col, 1, 4); p(25, hy - 4, col, 1, 4); p(23, hy - 3, '#e0b0a0'); }
      else { p(24, hy - 1, col, 1, 2); p(25, hy - 2, sh); }                                          // orelha
      if (M.antlers) { linha(p, 24, hy - 1, 21, hy - 6, '#d8c8a0'); linha(p, 22, hy - 4, 19, hy - 5, '#d8c8a0'); linha(p, 25, hy - 1, 27, hy - 7, '#d8c8a0'); linha(p, 26, hy - 4, 29, hy - 5, '#d8c8a0'); }
      // crina
      if (!camelo) { for (let i = 0; i < 8; i++) { const t = i / 7; p(Math.round(nx - 1 + t * 5), Math.round(by + 2 - t * 8), i % 2 ? crinaH : crina, 2, 2); } p(24, hy - 1, crina, 1, 2); }
      // patas da frente (por cima do corpo)
      pata(10, false, fase[2], false); pata(21, true, fase[3], false);
      // sela, manta e rédeas
      const sela = kind === 'corcel' ? '#3a5aa0' : kind === 'cavalo_guerra' ? '#7a1a1a' : '#6a3a1a';
      p(11, by - 1, sela, 7, 4); p(11, by - 1, shade(sela, 0.3), 7, 1); p(10, by + 2, shade(sela, -0.25), 9, 2); p(13, by + 4, '#b08a40', 1, 3); p(12, by + 7, '#b08a40', 3, 1);
      linha(p, 27, hy + 6, 21, by + 1, '#3a2010'); p(26, hy + 3, '#3a2010', 1, 3);
      if (kind === 'cavalo_guerra') { p(19, by - 2, '#8a8a94', 6, 5); p(19, by - 2, '#b0b0ba', 6, 1); p(24, hy + 1, '#8a8a94', 3, 2); p(6, by + 1, '#8a8a94', 4, 4); }
      Sprites.outline(c, '#120c0c'); return c;
    };
    const right = [0, 1, 2].map(mk);
    return (cache[kind] = { right, left: right.map(Sprites.flip) });
  };
})();

// ===================== ARTE NOVA: dragões e montarias recortados da imagem de referência =====================
// Os quadros de perfil vêm de js/bestas_px.js (tools/extrair_bestas.py). As vistas de frente e de costas
// das montarias (para o cavalo virar para baixo e para cima) são desenhadas aqui com as mesmas cores.
(function () {
  if (typeof BESTAS_PX === 'undefined') return;
  const cv = Sprites.cv, P = Sprites.P, ellipse = Sprites.ellipse, flip = Sprites.flip;
  // decodifica um quadro (paleta + índices em base64) num canvas
  const decod = (D, f) => {
    const c = cv(D.w, D.h), x = c.getContext('2d'), img = x.createImageData(D.w, D.h), d = img.data;
    const bin = atob(D.f[f]), pal = D.pal.map(hexToRgb);
    for (let i = 0; i < bin.length; i++) { const k = bin.charCodeAt(i); if (!k) continue; const q = pal[k - 1]; d[i * 4] = q[0]; d[i * 4 + 1] = q[1]; d[i * 4 + 2] = q[2]; d[i * 4 + 3] = 255; }
    x.putImageData(img, 0, 0); return c;
  };
  const rgb2hsl = (r, g, b) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; if (mx === mn) return [0, 0, l]; const d = mx - mn, s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); let h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; return [h * 60, s, l]; };
  const hsl2rgb = (h, s, l) => { h /= 360; const f = (p, q, t) => { t = (t + 1) % 1; return t < 1 / 6 ? p + (q - p) * 6 * t : t < 0.5 ? q : t < 2 / 3 ? p + (q - p) * (2 / 3 - t) * 6 : p; }; if (!s) return [l * 255, l * 255, l * 255]; const q = l < 0.5 ? l * (1 + s) : l + s - l * s, p = 2 * l - q; return [f(p, q, h + 1 / 3) * 255, f(p, q, h) * 255, f(p, q, h - 1 / 3) * 255]; };
  // troca a cor das escamas e das asas (para dragões de outras cores)
  const recolor = (c, de, para) => {
    const x = c.getContext('2d'), img = x.getImageData(0, 0, c.width, c.height), d = img.data;
    const [th, ts, tl] = rgb2hsl(...hexToRgb(para)), [, , bl] = rgb2hsl(...hexToRgb(de));
    for (let i = 0; i < d.length; i += 4) {
      if (!d[i + 3]) continue;
      const [h, s, l] = rgb2hsl(d[i], d[i + 1], d[i + 2]);
      const escama = de === 'r' ? (h < 22 || h > 335) && s > 0.35 : h > 195 && h < 250 && s > 0.3;
      if (!escama) continue;
      const q = hsl2rgb(th, Math.min(1, ts * 1.1), clamp(l * (tl / 0.36), 0.03, 0.92));
      d[i] = q[0]; d[i + 1] = q[1]; d[i + 2] = q[2];
    }
    x.putImageData(img, 0, 0); return c;
  };

  // ---------- DRAGÕES ----------
  const drag0 = Sprites.dragao;
  const dcache = {};
  Sprites.dragao = function (L, frame) {
    if (L.heads) return drag0(L, frame);   // hidras continuam com o desenho de várias cabeças
    const [h, s, l] = rgb2hsl(...hexToRgb(L.c || '#7a2a2a'));
    const azul = h > 180 && h < 260 && s > 0.2, base = azul ? 'dragao_azul' : 'dragao_vermelho';
    const exato = azul ? L.c === '#5a80b0' : (h < 20 || h > 340) && s > 0.4 && l > 0.25;   // a cor da imagem: sem recolorir
    const key = base + (exato ? '' : L.c) + frame + (L.size || 1);
    if (dcache[key]) return dcache[key];
    let c = decod(BESTAS_PX[base], frame);
    if (!exato) c = recolor(c, azul ? 'b' : 'r', L.c);
    if (L.glow) { const x = c.getContext('2d'), D = BESTAS_PX[base]; x.fillStyle = L.glow; x.fillRect(D.w - 9, 9, 2, 1); }
    if (L.size) c = Sprites.scale(c, L.size);
    return (dcache[key] = c);
  };

  // ---------- MONTARIAS ----------
  const CORES = {
    burro: { c: '#9d9080', s: '#867a6d', d: '#5e5349', m: '#4d3a30', sela: '#8a5a2e', orelha: 4 },
    cavalo: { c: '#8b4c22', s: '#743e1c', d: '#5c2d13', m: '#31170b', sela: '#6a3a1a' },
    cavalo_guerra: { c: '#22242c', s: '#16171c', d: '#0e0f12', m: '#121318', sela: '#921d1b', arm: '#96999e' },
    corcel: { c: '#e9ecef', s: '#c5c8cc', d: '#a7aeb8', m: '#dfe6f0', sela: '#214d94', azul: '#3a6ac0' },
    alce: { c: '#6b391a', s: '#562b13', d: '#452717', m: '#2a160c', sela: '#6a3a1a', galhada: true },
    camelo: { c: '#daa14f', s: '#c5853f', d: '#945327', m: '#b17d3d', sela: '#6f401b', corcova: true },
    lobo_gigante: { c: '#4b5267', s: '#3a3f4e', d: '#2a303c', m: '#343643', sela: '#782421', lobo: true }
  };
  // vista de frente (indo para baixo): corpo + "frente" (pescoço e cabeça, desenhados por cima do cavaleiro)
  const frente = (C, f, so) => {
    const c = cv(24, 34), p = P(c.getContext('2d')), b = f === 0 ? 0 : 1 - (f % 2);   // balanço do passo
    const pe = [f === 1 ? 2 : 0, f === 2 ? 2 : 0];                                   // pata levantada
    const casco = '#1e1612', meia = C.arm ? '#c8c0b0' : C.azul ? '#f4f4ff' : null;
    if (so !== 'cabeca') {
      // patas de trás (mais atrás, mais curtas) e patas da frente bem abertas dos dois lados
      for (const [x, k] of [[5, 1], [17, 0]]) { p(x, 15 + b, C.d, 2, 12 - pe[k]); p(x - 1, 26 + b - pe[k], casco, 3, 1); }
      for (const [x, k] of [[3, 0], [19, 1]]) { p(x, 18, C.s, 2, 13 - pe[k]); p(x + (x < 12 ? 0 : 1), 18, C.c, 1, 7); p(x - 1, 30 - pe[k], casco, 4, 2); if (meia) p(x - 1, 28 - pe[k], meia, 4, 2); }
      // costas vistas do alto e o peito largo
      ellipse(p, 12, 10 + b, 8, 6, C.c); p(5, 7 + b, shade(C.c, 0.18), 3, 4); p(17, 8 + b, C.s, 3, 6);
      if (C.corcova) { ellipse(p, 12, 4 + b, 5, 3, C.c); p(10, 2 + b, shade(C.c, 0.2), 4, 1); }
      ellipse(p, 12, 17 + b, 9, 4.5, C.c); p(4, 15 + b, shade(C.c, 0.12), 2, 4); p(19, 15 + b, C.s, 2, 5); p(6, 20 + b, C.s, 12, 1);
      if (C.arm) { p(4, 14 + b, C.arm, 16, 4); p(4, 14 + b, shade(C.arm, 0.25), 16, 1); }
      // sela e estribos
      p(8, 5 + b, C.sela, 8, 6); p(8, 5 + b, shade(C.sela, 0.3), 8, 1); p(6, 10 + b, shade(C.sela, -0.25), 12, 2);
      p(4, 11 + b, '#b08a40', 1, 3); p(19, 11 + b, '#b08a40', 1, 3); p(3, 14 + b, '#b08a40', 3, 1); p(18, 14 + b, '#b08a40', 3, 1);
    }
    if (so !== 'corpo') {
      const hy = 12 + b;
      if (C.lobo) {
        p(8, hy, C.c, 8, 8); p(9, hy + 8, C.c, 6, 4); p(10, hy + 10, C.s, 4, 3); p(11, hy + 12, '#101010', 2, 2);   // cabeça, focinho e nariz
        p(7, hy - 4, C.c, 3, 4); p(14, hy - 4, C.c, 3, 4); p(8, hy - 3, C.d, 1, 2); p(15, hy - 3, C.d, 1, 2);        // orelhas pontudas
        p(9, hy + 3, '#f0c030', 2, 1); p(13, hy + 3, '#f0c030', 2, 1); p(10, hy + 14, '#f0f0e0'); p(13, hy + 14, '#f0f0e0');
        p(8, hy, shade(C.c, 0.2), 8, 1);
      } else {
        const lg = C.corcova ? 6 : 3;                                    // pescoço (o do camelo é comprido)
        p(9, hy, C.c, 6, lg + 1); p(9, hy, shade(C.c, 0.15), 1, lg + 1);
        const cy = hy + lg;                                              // topo da cabeça
        p(8, cy, C.c, 8, 6); p(9, cy + 6, C.c, 6, 5); p(10, cy + 11, C.c, 4, 2);   // testa larga, cara comprida
        p(8, cy, shade(C.c, 0.18), 8, 1); p(15, cy + 1, C.s, 1, 5); p(14, cy + 6, C.s, 1, 5);
        p(9, cy + 10, C.d, 6, 3); p(10, cy + 13, C.d, 4, 1); p(10, cy + 11, '#1a0e0a'); p(13, cy + 11, '#1a0e0a');   // focinho e narinas
        p(8, cy + 3, '#100808', 1, 2); p(15, cy + 3, '#100808', 1, 2); p(8, cy + 3, '#ffffff'); p(15, cy + 3, '#ffffff');   // olhos dos lados
        if (C.c === '#e9ecef') p(11, cy + 1, '#ffffff', 2, 4); else p(11, cy + 1, C.c === '#22242c' ? '#e8e8f0' : shade(C.c, 0.32), 2, 5);   // estrela/listra na testa
        const o = (C.orelha || 2) + 1;
        p(7, cy - o, C.c, 2, o + 1); p(15, cy - o, C.c, 2, o + 1); p(8, cy - o + 1, C.d, 1, o - 1); p(15, cy - o + 1, C.d, 1, o - 1);   // orelhas em pé
        if (!C.corcova) { p(9, cy - 1, C.m, 6, 2); p(10, cy + 1, C.m, 3, 2); }                                                        // topete da crina
        const r = C.azul || (C.arm ? '#7a1a1a' : '#3a2010');
        p(8, cy + 8, r, 1, 3); p(15, cy + 8, r, 1, 3); p(8, cy + 10, r, 8, 1);                                                        // cabeçada e rédeas
        if (C.arm) { p(9, cy, C.arm, 6, 6); p(10, cy, shade(C.arm, 0.3), 4, 1); p(11, cy - 2, C.arm, 2, 2); }                          // testeira de metal com ponta
        if (C.galhada) { const g = '#d8c8a0'; for (const sd of [-1, 1]) { const x0 = sd < 0 ? 7 : 16; p(x0 + sd, cy - 5, g, 1, 3); p(x0 + sd * 2, cy - 7, g, 1, 3); p(x0 + sd * 3, cy - 8, g, 1, 2); p(x0 + sd * 4, cy - 6, g, 1, 2); p(x0, cy - 8, g, 1, 2); } }
      }
    }
    Sprites.outline(c, '#120c0c'); return c;
  };
  // vista de costas (indo para cima): garupa, cauda e a cabeça lá na frente
  const costas = (C, f) => {
    const c = cv(24, 34), p0 = P(c.getContext('2d')), p = (x, y, col, w, h) => p0(x + 1, y + 4, col, w, h), b = f === 0 ? 0 : 1 - (f % 2), pe = [f === 1 ? 2 : 0, f === 2 ? 2 : 0];
    // pescoço, crina e cabeça (no alto)
    if (C.lobo) { p(7, 1, C.c, 8, 6); p(7, -1, C.c, 2, 3); p(13, -1, C.c, 2, 3); p(9, 3, C.s, 4, 4); }
    else {
      const lg = C.corcova ? 3 : 0;
      p(8, 1 - lg, C.c, 6, 4); p(9, 4 - lg, C.c, 4, 6 + lg);                                    // nuca e pescoço
      const o = C.orelha || 2; p(8, 1 - lg - o, C.c, 2, o); p(12, 1 - lg - o, C.c, 2, o);       // orelhas
      if (!C.corcova) p(10, 0, C.m, 2, 10);                                                       // crina descendo pelo pescoço
      if (C.arm) p(9, 3, C.arm, 4, 2);
      if (C.galhada) { const g = '#d8c8a0'; p(6, -1, g, 2, 1); p(5, -3, g, 1, 2); p(7, -3, g, 1, 2); p(14, -1, g, 2, 1); p(14, -3, g, 1, 2); p(16, -3, g, 1, 2); }
    }
    // patas da frente quase escondidas e patas de trás
    for (const [x, k] of [[6, 1], [14, 0]]) { p(x, 14, C.d, 2, 8 - pe[k]); }
    for (const [x, k] of [[5, 0], [15, 1]]) { p(x, 19 + b, C.s, 2, 8 - pe[k]); p(x - 1, 26 + b - pe[k], '#1e1612', 3, 2); if (C.arm || C.azul) p(x - 1, 25 + b - pe[k], C.arm ? '#c8c0b0' : '#f4f4ff', 3, 1); }
    // costas e garupa
    ellipse(p, 11, 10 + b, 6, 5, C.c); ellipse(p, 11, 17 + b, 7, 6, C.c);
    p(5, 14 + b, shade(C.c, 0.15), 2, 5); p(16, 14 + b, C.s, 2, 6); p(7, 22 + b, C.s, 8, 1);
    if (C.corcova) { ellipse(p, 11, 8 + b, 4, 3, C.c); ellipse(p, 11, 15 + b, 4, 3, shade(C.c, 0.06)); }
    if (C.arm) { p(5, 15 + b, C.arm, 12, 4); p(5, 15 + b, shade(C.arm, 0.25), 12, 1); }
    // cauda balançando
    const sw = f === 1 ? -1 : f === 2 ? 1 : 0;
    if (C.lobo) { ellipse(p, 11 + sw, 24 + b, 2.5, 4, C.m); p(10 + sw, 27 + b, shade(C.m, 0.3), 2, 1); }
    else if (C.corcova) { p(10 + sw, 20 + b, C.m, 2, 6); }
    else { p(10, 18 + b, C.m, 3, 3); p(10 + sw, 21 + b, C.m, 3, 5); p(11 + sw * 2, 26 + b, C.m, 2, 2); p(11, 19 + b, shade(C.m, 0.25), 1, 5); }
    // sela
    p(7, 8 + b, C.sela, 8, 6); p(7, 8 + b, shade(C.sela, 0.3), 8, 1); p(6, 13 + b, shade(C.sela, -0.25), 10, 2);
    p(4, 12 + b, '#b08a40', 1, 3); p(17, 12 + b, '#b08a40', 1, 3);
    Sprites.outline(c, '#120c0c'); return c;
  };
  const h0 = Sprites.horse, cache = {};
  Sprites.horse = function (kind = 'cavalo') {
    if (cache[kind]) return cache[kind];
    const D = BESTAS_PX[kind] || BESTAS_PX.cavalo, C = CORES[kind] || CORES.cavalo;
    let right = [0, 1, 2].map(f => decod(D, f));
    if (C.galhada) right = right.map(c => {   // o alce ganha a galhada por cima da cabeça
      const x = c.getContext('2d'), d = x.getImageData(0, 0, c.width, c.height).data; let top = c.height, tx = 0;
      for (let y = 0; y < c.height && top === c.height; y++) for (let i = c.width - 1; i > c.width * 0.6; i--) if (d[(y * c.width + i) * 4 + 3]) { top = y; tx = i; break; }
      const p = P(x), g = '#d8c8a0', o = '#3a2a1a', y0 = top + 1;
      for (const [a, b2] of [[0, 0], [-1, -1], [-2, -2], [-3, -2], [-2, -3], [1, -1], [2, -2], [2, -3], [-4, -1]]) p(tx - 2 + a, y0 - 1 + b2, g);
      p(tx - 6, y0 - 3, o); return c;
    });
    const H = { right, left: right.map(flip), down: [0, 1, 2].map(f => frente(C, f, 'corpo')), frente: [0, 1, 2].map(f => frente(C, f, 'cabeca')), up: [0, 1, 2].map(f => costas(C, f)) };
    return (cache[kind] = H);
  };
})();
