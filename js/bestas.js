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
