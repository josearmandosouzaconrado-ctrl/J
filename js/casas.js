'use strict';
// ===================== ARQUITETURA DOS POVOS DE ELYNDRA =====================
// Cada povo tem as suas construções (não são casas humanas pintadas de outra cor):
// conchas de coral, torres brancas com cata-vento, cristais, casas dentro de árvores,
// fortalezas de basalto com magma, cúpulas do crepúsculo, tendas de presas, observatórios,
// palafitas na névoa e casas esculpidas na pedra viva.
const Casas = {
  // moldura comum: tamanho da imagem, paredes, telhado, janelas, porta, placa e sombra
  build(sp, St) {
    const W = sp.w * 16, FH = sp.h * 16, big = sp.type === 'castle' || sp.type === 'palace', tower = sp.type === 'tower', temple = sp.type === 'temple';
    const top = St.top + (big ? 12 : tower ? 18 : temple ? 6 : 0);
    const H = FH + top;
    const c = Sprites.cv(W + 2, H + 1), ctx = c.getContext('2d'), p = Sprites.P(ctx), r = new RNG(sp.seed || 1);
    const ox = 1;
    const wallH = Math.max(16, Math.min(big ? 46 : 30, Math.round(FH * 0.6)));
    const wallTop = H - wallH;
    const roofC = sp.roof || '#888', wallC = sp.wall || '#ccc';
    const doorW = big ? 12 : temple || sp.type === 'guildhall' || sp.type === 'heroes' ? 10 : 8, doorH = big ? 16 : 12;
    const doorX = ox + Math.floor(W / 2) - Math.floor(doorW / 2);
    const E = { p, ctx, r, sp, W, H, FH, ox, wallTop, wallH, roofC, wallC, big, tower, temple, doorX, doorW, doorH };
    if (St.full) St.full(E);
    else {
      if (big) {
        const tw = Math.max(16, Math.round(W * 0.2)), bodyTop = wallTop - 8;
        St.wall(E, ox + tw - 2, bodyTop, W - (tw - 2) * 2, H - bodyTop);
        St.roof(E, ox + tw - 4, 10, W - (tw - 4) * 2, bodyTop - 8);
        for (const tx of [ox, ox + W - tw]) { St.wall(E, tx, 18, tw, H - 18); St.roof(E, tx - 1, 0, tw + 2, 20); St.win(E, tx + tw / 2 - 2, 26); St.win(E, tx + tw / 2 - 2, wallTop + 4); }
      } else if (tower) {
        St.wall(E, ox + 2, 26, W - 4, H - 26); St.roof(E, ox, 0, W, 28); St.win(E, ox + W / 2 - 2, 34);
      } else {
        St.wall(E, ox, wallTop, W, wallH);
        St.roof(E, ox - 1, 0, W + 2, wallTop + 2);
      }
      const nwin = Math.floor((W - doorW) / 2 / 14);
      if (!tower) for (let i = 0; i < nwin; i++) { St.win(E, ox + 5 + i * 14, wallTop + 6); St.win(E, ox + W - 10 - i * 14, wallTop + 6); }
      St.door(E, doorX, H - doorH, doorW, doorH);
      if (St.decor) St.decor(E);
    }
    if (sp.sign) { const sx = doorX + doorW + 3, sy = H - doorH - 2; if (sx + 9 < W) { p(sx, sy, '#3a2a1a', 9, 8); p(sx + 1, sy + 1, St.signC || '#c09050', 7, 6); Sprites.drawSignIcon(p, sx + 2, sy + 2, sp.sign); } }
    Sprites.outline(c);
    if (!big) { ctx.save(); ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = 'rgba(10,20,10,0.22)'; ctx.beginPath(); ctx.moveTo(W, wallTop + 2); ctx.lineTo(W + 2, wallTop + 2); ctx.lineTo(W + 2, H); ctx.lineTo(W - 4, H); ctx.closePath(); ctx.fill(); ctx.restore(); }
    return c;
  },
  // cúpula (meia elipse) desenhada linha por linha
  dome(p, x, y, w, h, col, fn) {
    for (let yy = 0; yy < h; yy++) { const t = 1 - yy / h, hw = Math.round(w / 2 * Math.sqrt(Math.max(0, 1 - t * t))); for (let xx = -hw; xx < hw; xx++) p(x + w / 2 + xx, y + yy, fn ? fn(xx, yy, hw) : col); }
  },
  spike(p, cx, base, w, h, light, dark, edge) {
    for (let yy = 0; yy < h; yy++) { const hw = Math.max(0, Math.round((yy / h) * w / 2)); p(cx - hw, base - h + yy, light, hw, 1); p(cx, base - h + yy, dark, hw + 1, 1); }
    p(cx, base - h, edge, 1, Math.round(h * 0.6));
  }
};

const CASA_STYLES = {
  // ---------- Voralis: conchas e coral ----------
  coral: {
    top: 18, signC: '#9ad8e0',
    wall(E, x, y, w, h) { const { p, wallC } = E, ws = shade(wallC, -0.18); p(x, y, wallC, w, h); for (let yy = 3; yy < h - 3; yy += 4) for (let xx = (yy % 8 ? 0 : 3); xx < w - 4; xx += 6) { p(x + xx + 1, y + yy + 2, ws, 4, 1); p(x + xx, y + yy + 1, ws); p(x + xx + 5, y + yy + 1, ws); } p(x, y, '#f0a0b0', w, 2); p(x, y + h - 3, '#e0d0a0', w, 3); },
    roof(E, x, y, w, h) { const { p, roofC } = E; Casas.dome(p, x, y, w, h, roofC, (xx, yy, hw) => (Math.abs(xx) % 5 === 0 ? shade(roofC, -0.25) : yy < 3 ? shade(roofC, 0.25) : roofC)); Sprites.ellipse(p, x + w / 2, y + 1, 3, 3, '#f8f4ff'); p(x + w / 2 - 1, y, '#ffffff'); },
    win(E, x, y) { const { p } = E; Sprites.ellipse(p, x + 2.5, y + 2.5, 3.5, 3.5, '#2a4a5a'); Sprites.ellipse(p, x + 2.5, y + 2.5, 2.4, 2.4, '#90f0ff'); p(x + 1, y + 1, '#ffffff'); },
    door(E, x, y, w, h) { const { p } = E; Casas.dome(p, x - 1, y - 3, w + 2, 5, '#1a4a5a'); p(x - 1, y + 1, '#1a4a5a', w + 2, h - 1); p(x, y + 1, '#2a6a7a', w, h - 1); p(x + w - 2, y + h / 2, '#f8f4ff'); },
    decor(E) { const { p, r, W, H, ox } = E; for (const bx of [ox + 2, ox + W - 6]) { const c = r.pick(['#ff7a9a', '#ffa060', '#c080ff']); p(bx + 1, H - 9, c, 1, 8); p(bx, H - 7, c); p(bx + 2, H - 6, c); p(bx - 1, H - 9, c); p(bx + 3, H - 10, c); } },
  },
  // ---------- Zephyrans: torres brancas e bandeirolas ao vento ----------
  cloudstone: {
    top: 30, signC: '#c8e0f0',
    wall(E, x, y, w, h) { const { p, wallC } = E; p(x, y, wallC, w, h); for (let yy = 4; yy < h; yy += 6) p(x, y + yy, shade(wallC, -0.08), w, 1); p(x, y + Math.floor(h / 3), '#80b0e0', w, 2); p(x, y, '#ffffff', 2, h); p(x + w - 2, y, shade(wallC, -0.15), 2, h); },
    roof(E, x, y, w, h) { const { p, roofC } = E; for (let yy = 0; yy < h; yy++) { const inset = Math.round((1 - yy / h) * w * 0.48); p(x + inset, y + yy, Math.floor(yy / 4) % 2 ? roofC : shade(roofC, -0.12), w - inset * 2, 1); p(x + inset, y + yy, shade(roofC, 0.25)); } p(x + w / 2, y - 6, '#e0c060', 1, 7); const f = (E.r.next() * 2) | 0; p(x + w / 2 + 1, y - 6, '#4a90d0', 4, 1); p(x + w / 2 + 1, y - 5, '#4a90d0', 3 + f, 1); },
    win(E, x, y) { const { p } = E; p(x - 1, y - 1, '#ffffff', 6, 9); p(x, y + 1, '#a0d0f0', 4, 7); p(x + 1, y, '#a0d0f0', 2, 1); p(x, y + 1, '#e0f4ff', 1, 3); },
    door(E, x, y, w, h) { const { p } = E; p(x - 1, y - 1, '#ffffff', w + 2, h + 1); p(x, y + 1, '#b08a5a', w, h - 1); p(x + 1, y, '#b08a5a', w - 2, 1); for (let xx = 2; xx < w; xx += 3) p(x + xx, y + 1, '#8a6a40', 1, h - 1); },
    decor(E) { const { p, W, wallTop, ox } = E; const cx = ox + W - 6, cy = wallTop - 4; for (let k = -4; k <= 4; k++) { p(cx + k, cy, '#d8d0c0'); p(cx, cy + k, '#d8d0c0'); } p(cx - 4, cy - 1, '#f0f0f0', 3, 2); p(cx + 2, cy + 1, '#f0f0f0', 3, 2); p(cx - 1, cy - 4, '#f0f0f0', 2, 3); p(cx + 1, cy + 2, '#f0f0f0', 2, 3); p(cx, cy, '#8a6a40'); },
  },
  // ---------- Thaldrim: cristal vivo ----------
  crystal: {
    top: 26, signC: '#b0a0f0',
    wall(E, x, y, w, h) { const { p, wallC, r } = E; p(x, y, wallC, w, h); for (let yy = 0; yy < h; yy += 5) p(x, y + yy, shade(wallC, -0.25), w, 1); for (let i = 0; i < w * h / 60; i++) { const sx = x + r.int(1, w - 4), sy = y + r.int(1, h - 4); p(sx, sy, '#a090f0'); p(sx + 1, sy + 1, '#a090f0'); p(sx + 2, sy + 2, '#d0c8ff'); } },
    roof(E, x, y, w, h) { const { p, r } = E; p(x, y + h - 4, '#3a2a5a', w, 4); const n = Math.max(3, Math.round(w / 10)); for (let i = 0; i < n; i++) { const cx = Math.round(x + 4 + (w - 8) * (i + 0.5) / n + r.range(-2, 2)), hh = Math.round(h * (0.55 + 0.45 * (1 - Math.abs(i - (n - 1) / 2) / (n / 2))) - r.int(0, 4)); Casas.spike(p, cx, y + h - 2, r.int(6, 10), Math.max(6, hh), '#c8b8ff', '#8a70e0', '#ffffff'); } },
    win(E, x, y) { const { p } = E; p(x + 2, y, '#e0d8ff'); p(x + 1, y + 1, '#c0a0ff', 3, 1); p(x, y + 2, '#a080f0', 5, 1); p(x + 1, y + 3, '#c0a0ff', 3, 1); p(x + 2, y + 4, '#8060d0'); },
    door(E, x, y, w, h) { const { p } = E; Casas.spike(p, x + w / 2, y + 2, w + 2, 6, '#c8b8ff', '#8a70e0', '#ffffff'); p(x, y + 1, '#2a1e44', w, h - 1); p(x + w / 2, y + 2, '#8060d0', 1, h - 3); },
    decor(E) { const { p, W, H, ox } = E; for (const bx of [ox + 3, ox + W - 4]) Casas.spike(p, bx, H, 5, 8, '#c8b8ff', '#8a70e0', '#ffffff'); },
  },
  // ---------- Silvanos: casas dentro de árvores vivas ----------
  treehouse: {
    top: 30, signC: '#a0c070',
    full(E) {
      const { p, r, W, H, ox, roofC, doorX, doorW, doorH } = E;
      const bark = '#6a4a28', barkD = '#4a3218', barkH = '#8a6a40';
      const tx0 = ox + Math.round(W * 0.14), tx1 = ox + Math.round(W * 0.86), ty = Math.round(H * 0.38);
      for (let y = ty; y < H; y++) { const flare = y > H - 8 ? Math.round((y - (H - 8)) * 0.9) : 0; p(tx0 - flare, y, bark, tx1 - tx0 + flare * 2, 1); }
      for (let x = tx0 + 2; x < tx1 - 1; x += 4) p(x, ty, barkD, 1, H - ty);
      for (let x = tx0; x < tx1; x += 7) p(x + 1, ty, barkH, 1, H - ty);
      for (let i = 0; i < 6; i++) Sprites.ellipse(p, r.int(tx0 + 3, tx1 - 3), r.int(ty + 6, H - 10), 1.5, 2, barkD);
      // janelas redondas acesas e porta redonda
      for (const wx of [tx0 + 6, tx1 - 11]) if (wx + 5 < doorX || wx > doorX + doorW) { Sprites.ellipse(p, wx + 2.5, ty + 12, 3.5, 3.5, barkD); Sprites.ellipse(p, wx + 2.5, ty + 12, 2.4, 2.4, '#f0d070'); }
      Sprites.ellipse(p, doorX + doorW / 2, H - doorH / 2, doorW / 2 + 1, doorH / 2 + 1, barkD); Sprites.ellipse(p, doorX + doorW / 2, H - doorH / 2, doorW / 2, doorH / 2, '#3a7a3a'); p(doorX + doorW / 2 + 2, H - doorH / 2, '#e0c060');
      // copa enorme de folhas vivas
      const leaf = roofC, lH = shade(leaf, 0.22), lS = shade(leaf, -0.25);
      for (let i = 0; i < 9; i++) { const cx = ox + W * (0.12 + 0.76 * i / 8), cy = ty * (0.45 + (i % 2) * 0.25), rr = W * 0.16 + r.int(0, 4); Sprites.ellipse(p, cx, cy + 2, rr, rr * 0.7, lS); }
      for (let i = 0; i < 9; i++) { const cx = ox + W * (0.12 + 0.76 * i / 8), cy = ty * (0.4 + (i % 2) * 0.25), rr = W * 0.14 + r.int(0, 3); Sprites.ellipse(p, cx, cy, rr, rr * 0.65, leaf); Sprites.ellipse(p, cx - rr * 0.3, cy - rr * 0.25, rr * 0.4, rr * 0.3, lH); }
      for (let i = 0; i < 16; i++) p(r.int(ox + 2, ox + W - 3), r.int(2, ty), r.pick(['#f080b0', '#f0f080', '#ffffff', '#a0ffb0']));
      for (let i = 0; i < 5; i++) { const vx = r.int(tx0, tx1); p(vx, ty - 2, '#3a7a2a', 1, r.int(5, 12)); }
    }
  },
  // ---------- Krazul: basalto e magma ----------
  basalt: {
    top: 14, signC: '#8a5a3a',
    wall(E, x, y, w, h) { const { p, r } = E; p(x, y, '#2a2224', w, h); for (let yy = 0; yy < h; yy += 4) { p(x, y + yy, '#1a1416', w, 1); for (let xx = (yy % 8 ? 3 : 0); xx < w; xx += 7) p(x + xx, y + yy, '#1a1416', 1, 4); } for (let k = 0; k < Math.max(2, w / 12); k++) { let cx = x + r.int(2, w - 3), cy = y + r.int(1, 4); for (let i = 0; i < h - 6; i++) { p(cx, cy, i % 3 ? '#ff7a20' : '#ffd060'); cx += r.int(-1, 1); cy++; if (cx < x + 1 || cx > x + w - 2) break; } } p(x, y + h - 2, '#ff6a10', w, 1); },
    roof(E, x, y, w, h) { const { p } = E; const ry = y + Math.max(0, h - 10); p(x, ry, '#3a2e30', w, Math.min(10, h)); p(x, ry, '#4a3c3e', w, 1); for (let xx = 0; xx < w; xx += 6) p(x + xx, ry - 3, '#3a2e30', 3, 3); for (const cx of [x + 5, x + w - 10]) { p(cx, ry - 8, '#2a2224', 5, 8); p(cx, ry - 9, '#ff9030', 5, 1); p(cx + 1, ry - 10, '#ffd060', 3, 1); } },
    win(E, x, y) { const { p } = E; p(x + 1, y - 1, '#1a1012', 3, 8); p(x + 2, y, '#ffb040', 1, 6); },
    door(E, x, y, w, h) { const { p } = E; p(x - 1, y - 1, '#1a1012', w + 2, h + 1); p(x, y, '#4a4a50', w, h); for (let yy = 2; yy < h; yy += 4) for (let xx = 1; xx < w; xx += 3) p(x + xx, y + yy, '#8a8a90'); },
  },
  // ---------- Nimbors: cúpulas do crepúsculo com lua crescente ----------
  dusk: {
    top: 30, signC: '#a090d0',
    wall(E, x, y, w, h) { const { p, wallC } = E; p(x, y, wallC, w, h); for (let yy = 0; yy < h; yy += 5) { const off = (yy / 5) % 2 * 4; for (let xx = -off; xx < w; xx += 8) if (xx >= 0) p(x + xx, y + yy, shade(wallC, -0.25), 1, 5); p(x, y + yy, shade(wallC, -0.25), w, 1); } p(x, y, '#c0c8e0', w, 1); },
    roof(E, x, y, w, h) { const { p, roofC } = E; const bw = w * 0.86, cx = x + w / 2; for (let yy = 0; yy < h; yy++) { const t = yy / h; const hw = Math.round(bw / 2 * (t < 0.55 ? Math.sin(t / 0.55 * Math.PI / 2) * 0.9 + 0.05 : 0.95 - (t - 0.55) * 0.6)); p(cx - hw, y + yy, yy % 4 === 0 ? shade(roofC, -0.2) : roofC, hw * 2, 1); p(cx - hw, y + yy, shade(roofC, 0.25), 2, 1); } p(cx, y - 4, '#c0a050', 1, 5); p(cx - 2, y - 8, '#f0d060', 2, 1); p(cx - 3, y - 7, '#f0d060', 1, 3); p(cx - 2, y - 4, '#f0d060', 2, 1); },
    win(E, x, y) { const { p } = E; p(x, y + 1, '#1a1030', 5, 7); p(x + 1, y, '#1a1030', 3, 1); p(x + 1, y + 2, '#c0a0ff', 3, 5); p(x + 2, y + 1, '#e0d0ff'); },
    door(E, x, y, w, h) { const { p } = E; p(x, y + 2, '#1a1030', w, h - 2); for (let i = 0; i < w / 2; i++) p(x + i, y + 2 - Math.round(i * 0.5), '#1a1030', w - i * 2, 1); p(x + 1, y + 3, '#3a2a5a', w - 2, h - 3); },
  },
  // ---------- Vaelith: tendas de couro com presas e totens ----------
  bonehut: {
    top: 20, signC: '#c09a60',
    full(E) {
      const { p, r, W, H, ox, roofC, doorX, doorW, doorH } = E;
      for (let yy = 0; yy < H - 2; yy++) { const t = yy / (H - 2), inset = Math.round((1 - t) * W * 0.44); p(ox + inset, yy + 2, Math.floor(yy / 5) % 2 ? roofC : shade(roofC, -0.2), W - inset * 2, 1); if (yy % 7 === 3) p(ox + inset + 2, yy + 2, '#c03020', W - inset * 2 - 4, 1); }
      p(ox + W / 2 - 1, 0, '#5a3a1a', 2, 7); p(ox + W / 2 - 4, 0, '#6a4a2a', 2, 5); p(ox + W / 2 + 2, 0, '#6a4a2a', 2, 5);
      for (let yy = H - doorH; yy < H; yy++) { const hw = Math.round((yy - (H - doorH)) * 0.45) + 2; p(ox + W / 2 - hw, yy, '#1a0e08', hw * 2, 1); }
      // presas formando o arco da entrada
      for (let k = 0; k < 9; k++) { const t = k / 8; p(doorX - 3 + Math.round(Math.sin(t * Math.PI / 2) * 3), H - 2 - Math.round(t * (doorH + 2)), '#f0e8d0', 2, 1); p(doorX + doorW + 1 - Math.round(Math.sin(t * Math.PI / 2) * 3), H - 2 - Math.round(t * (doorH + 2)), '#f0e8d0', 2, 1); }
      // totem com caveira ao lado
      const tx = ox + W - 6; p(tx, H - 20, '#6a4a2a', 3, 20); p(tx - 1, H - 22, '#e8e0c8', 5, 4); p(tx, H - 21, '#1a1010'); p(tx + 2, H - 21, '#1a1010'); p(tx - 2, H - 14, '#c03020', 7, 2);
      for (let i = 0; i < 4; i++) p(r.int(ox + W * 0.3, ox + W * 0.7), r.int(8, H - doorH - 4), '#e8e0c8', 2, 1);
    }
  },
  // ---------- Xar'Qin: observatórios com cúpula e anel ----------
  observatory: {
    top: 24, signC: '#8070d0',
    wall(E, x, y, w, h) { const { p, wallC, r } = E; p(x, y, wallC, w, h); for (let yy = 0; yy < h; yy += 6) p(x, y + yy, shade(wallC, -0.2), w, 1); for (let i = 0; i < w * h / 50; i++) p(x + r.int(0, w - 1), y + r.int(0, h - 1), r.pick(['#ffe080', '#ffffff', '#a0c0ff'])); p(x, y, '#e0c050', w, 1); },
    roof(E, x, y, w, h) { const { p, roofC } = E; const dh = Math.min(h, Math.round(w * 0.5)); Casas.dome(p, x + 2, y + h - dh, w - 4, dh, roofC, (xx, yy, hw) => Math.abs(xx) < 2 ? '#5a6aa0' : yy < 2 ? shade(roofC, 0.3) : roofC); const cx = x + w / 2, cy = y + h - dh * 0.6; for (let k = 0; k < 9; k++) p(cx + k, cy - k * 0.8, '#c09040', 2, 2); p(cx + 9, cy - 8, '#f0d070', 2, 2); for (let a = 0; a < 6.28; a += 0.05) { const px = cx + Math.cos(a) * w * 0.48, py = y + h - dh * 0.45 + Math.sin(a) * 3; if (Math.sin(a) > 0 || Math.abs(Math.cos(a)) > 0.75) p(px, py, '#e0c050'); } },
    win(E, x, y) { const { p } = E; Sprites.ellipse(p, x + 2.5, y + 2.5, 3, 3, '#1a1a40'); Sprites.ellipse(p, x + 2.5, y + 2.5, 2, 2, '#ffe080'); },
    door(E, x, y, w, h) { const { p } = E; Casas.dome(p, x, y - 2, w, 4, '#141238'); p(x, y + 1, '#141238', w, h - 1); p(x + w / 2 - 1, y + 4, '#ffe080', 2, 2); p(x + w / 2 - 2, y + 5, '#ffe080', 4, 1); },
  },
  // ---------- Brumários: palafitas na névoa ----------
  mistwood: {
    top: 24, signC: '#90a8b8',
    wall(E, x, y, w, h) { const { p, wallC } = E; const stilt = 5; for (let xx = 0; xx < w; xx += 3) { p(x + xx, y, wallC, 3, h - stilt); p(x + xx, y, shade(wallC, 0.12), 1, h - stilt); p(x + xx + 2, y, shade(wallC, -0.2), 1, h - stilt); } p(x, y + h - stilt, '#2a3238', w, 1); for (let xx = 2; xx < w; xx += 7) p(x + xx, y + h - stilt, '#3a4448', 2, stilt); },
    roof(E, x, y, w, h) { const { p, roofC } = E; for (let yy = 0; yy < h; yy++) { const inset = Math.round((1 - yy / h) * w * 0.46); p(x + inset, y + yy, yy % 3 === 0 ? shade(roofC, -0.25) : roofC, w - inset * 2, 1); } p(x + w / 2 - 1, y - 2, shade(roofC, -0.3), 2, 3); },
    win(E, x, y) { const { p } = E; p(x - 1, y - 1, '#2a3238', 6, 6); p(x, y, '#d8ecf8', 4, 4); p(x + 2, y, '#2a3238', 1, 4); },
    door(E, x, y, w, h) { const { p } = E; p(x, y - 5, '#3a4448', w, h); p(x + 1, y - 4, '#5a6a78', w - 2, h - 2); for (let k = 0; k < 5; k++) p(x + 1, y + h - 5 + k, '#4a3a2a', w - 2, 1); },
    decor(E) { const { p, ctx, W, H, ox, wallTop } = E; p(ox + 3, wallTop + 2, '#3a4448', 1, 4); Sprites.ellipse(p, ox + 3.5, wallTop + 7, 2, 2.5, '#e8f4ff'); ctx.fillStyle = 'rgba(220,235,245,0.5)'; for (let i = 0; i < 4; i++) ctx.fillRect(ox + 4 + i * W / 4, H - 3 - (i % 2), W / 5, 2); },
  },
  // ---------- Terralux: casas esculpidas na pedra viva ----------
  carved: {
    top: 18, signC: '#c8a878',
    wall(E, x, y, w, h) { const { p, wallC, r } = E; p(x, y, wallC, w, h); for (let i = 0; i < w * h / 40; i++) { let cx = x + r.int(1, w - 2), cy = y + r.int(1, h - 3); for (let k = 0; k < 4; k++) { p(cx, cy, shade(wallC, -0.28)); cx += r.int(-1, 1); cy++; } } for (let i = 0; i < Math.max(2, w / 14); i++) { const rx = x + r.int(3, w - 7), ry = y + r.int(3, h - 8); p(rx, ry, '#40e0d0', 4, 1); p(rx + 1, ry + 1, '#40e0d0', 1, 3); p(rx + 3, ry + 2, '#a0fff8'); } },
    roof(E, x, y, w, h) { const { p, roofC, r } = E; Casas.dome(p, x, y, w, h, roofC, (xx, yy, hw) => (Math.abs(xx) > hw - 2 ? shade(roofC, -0.3) : yy < 3 ? shade(roofC, 0.2) : roofC)); for (let i = 0; i < 6; i++) p(r.int(x + w * 0.2, x + w * 0.8), r.int(y + h * 0.3, y + h - 2), '#5a8a3a', r.int(2, 5), 1); Casas.spike(p, x + w / 2, y + 3, 5, 7, '#80fff0', '#30c0b0', '#ffffff'); },
    win(E, x, y) { const { p } = E; Sprites.ellipse(p, x + 2.5, y + 2.5, 3.2, 3.2, '#30c0b0'); Sprites.ellipse(p, x + 2.5, y + 2.5, 2.2, 2.2, '#1a1410'); },
    door(E, x, y, w, h) { const { p } = E; Casas.dome(p, x - 2, y - 3, w + 4, 6, '#8a6a48'); p(x - 2, y + 1, '#8a6a48', w + 4, h - 1); Casas.dome(p, x, y - 1, w, 4, '#1a1410'); p(x, y + 1, '#1a1410', w, h - 1); p(x + w / 2 - 1, y - 3, '#40e0d0', 2, 2); },
  }
};
for (const k in CASA_STYLES) Sprites.extraBuilding[k] = sp => Casas.build(sp, CASA_STYLES[k]);
