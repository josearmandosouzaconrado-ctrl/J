'use strict';
// ===================== ÁRVORES (pixel art com luz e volume) =====================
// Cada árvore é pintada pixel a pixel: tronco com casca e raízes, galhos, copa feita de
// dezenas de tufos de folhas iluminados de cima-esquerda, sombra interna e sombra no chão.
const Trees = (() => {
  const T = {};
  const cv = (w, h) => { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; };
  const ramp = (base, k = [-0.55, -0.38, -0.2, 0, 0.18, 0.36]) => k.map(v => shade(base, v));
  const clampI = (v, a, b) => v < a ? a : v > b ? b : v;
  const nz = (x, y, s) => hash2(x, y, s);

  // contorno escuro suave (cor puxada do próprio tom mais escuro da árvore)
  function outline(c, col) {
    const ctx = c.getContext('2d'), w = c.width, h = c.height;
    const img = ctx.getImageData(0, 0, w, h), d = img.data, out = new Uint8ClampedArray(d);
    const [r, g, b] = hexToRgb(col);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (d[i + 3] > 40) continue;
      const n = (x > 0 && d[i - 1] > 120) || (x < w - 1 && d[i + 7] > 120) || (y > 0 && d[i - w * 4 + 3] > 120) || (y < h - 1 && d[i + w * 4 + 3] > 120);
      if (n) { out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = 255; }
    }
    img.data.set(out); ctx.putImageData(img, 0, 0);
  }
  function groundShadow(c, cx, cy, rx, ry) {
    const ctx = c.getContext('2d');
    ctx.save(); ctx.globalCompositeOperation = 'destination-over';
    ctx.fillStyle = 'rgba(8,20,8,0.16)'; ctx.beginPath(); ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(8,20,8,0.16)'; ctx.beginPath(); ctx.ellipse(cx, cy, rx * 0.7, ry * 0.7, 0, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }
  // buffer de tons: -1 vazio, senão paleta*8 + tom
  function Buf(w, h) { const b = new Int16Array(w * h).fill(-1); b.w = w; b.h = h; return b; }
  function paintBuf(ctx, buf, ramps) {
    for (let i = 0; i < buf.length; i++) {
      const v = buf[i]; if (v < 0) continue;
      ctx.fillStyle = ramps[v >> 3][v & 7]; ctx.fillRect(i % buf.w, (i / buf.w) | 0, 1, 1);
    }
  }
  // tronco afunilado com casca, luz à esquerda, raízes e sombra da copa
  function trunk(ctx, rng, bx, by, topY, wb, wt, bark, lean = 0, shadeTop = 5) {
    const R = ramp(bark, [-0.5, -0.32, -0.15, 0, 0.16, 0.3]);
    const seed = rng.int(1, 9999);
    for (let y = topY; y <= by; y++) {
      const t = (y - topY) / Math.max(1, by - topY);
      const wd = Math.max(1, Math.round(wt + (wb - wt) * Math.pow(t, 1.6)));
      const x0 = Math.round(bx - wd / 2 + lean * (1 - t));
      for (let x = 0; x < wd; x++) {
        const u = wd === 1 ? 0.5 : x / (wd - 1);
        let tone = u < 0.2 ? 4 : u < 0.45 ? 3 : u < 0.75 ? 2 : 1;
        if (nz(x0 + x, Math.floor(y / 3), seed) < 0.22) tone -= 1;           // fendas da casca
        if (nz(x0 + x, y, seed + 7) < 0.06) tone += 1;
        if (y - topY < shadeTop) tone -= 1;                                    // sombra da copa
        ctx.fillStyle = R[clampI(tone, 0, 5)]; ctx.fillRect(x0 + x, y, 1, 1);
      }
    }
    // raízes
    ctx.fillStyle = R[3]; ctx.fillRect(bx - wb / 2 - 2, by, 2, 1); ctx.fillRect(bx - wb / 2 - 1, by - 1, 1, 1);
    ctx.fillStyle = R[1]; ctx.fillRect(bx + wb / 2, by, 2, 1); ctx.fillRect(bx + wb / 2, by - 1, 1, 1);
    ctx.fillStyle = R[2]; ctx.fillRect(Math.round(bx) - 1, by + 1, 3, 1);
  }
  function branchLine(ctx, x0, y0, x1, y1, w, col, colHi) {
    const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0)) | 0;
    for (let i = 0; i <= n; i++) {
      const t = n ? i / n : 0, x = Math.round(x0 + (x1 - x0) * t), y = Math.round(y0 + (y1 - y0) * t);
      const ww = Math.max(1, Math.round(w * (1 - t * 0.5)));
      ctx.fillStyle = col; ctx.fillRect(x - (ww >> 1), y, ww, 1);
      if (colHi && ww > 1) { ctx.fillStyle = colHi; ctx.fillRect(x - (ww >> 1), y, 1, 1); }
    }
  }
  // copa: muitos tufos de folhas, ordenados de trás para frente
  function canopy(buf, rng, cx, cy, rx, ry, o = {}) {
    const n = o.n || Math.round(rx * ry / 5.5);
    const pal = o.pals || [0];
    const cl = [];
    for (let i = 0; i < n; i++) {
      let x, y; do { x = rng.range(-1, 1); y = rng.range(-1, 1); } while (x * x + y * y > 1);
      cl.push({ x: cx + x * (rx - 2.5), y: cy + y * (ry - 2.5), r: rng.range(o.rmin || 2.6, o.rmax || 4.4), p: pal[rng.int(0, pal.length - 1)] });
    }
    cl.sort((a, b) => a.y - b.y);
    const sd = rng.int(1, 9999);
    for (const c of cl) {
      const R = c.r;
      for (let y = Math.floor(c.y - R); y <= c.y + R; y++) for (let x = Math.floor(c.x - R); x <= c.x + R; x++) {
        if (x < 0 || y < 0 || x >= buf.w || y >= buf.h) continue;
        const dx = x + 0.5 - c.x, dy = y + 0.5 - c.y, d = Math.sqrt(dx * dx + dy * dy);
        if (d > R - nz(x, y, sd) * 1.1) continue;                         // borda recortada (folhas)
        const l = -(dx * 0.75 + dy) / R;                                     // luz local do tufo
        const gy = (y - (cy - ry)) / (2 * ry), gx = (x - (cx - rx)) / (2 * rx);
        let t = 3.3 + l * 1.0 - gy * 2.5 - gx * 0.8 + (nz(x, y, sd + 3) - 0.5) * 1.0;
        if (d > R - 1.3 && dy > 0.5) t -= 1.1;                               // sombra sob o tufo
        buf[y * buf.w + x] = c.p * 8 + clampI(Math.round(t), 0, 5);
      }
    }
  }
  function darkBase(buf, cx, cy, rx, ry, tone = 0) {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
      const dx = (x + 0.5 - cx) / rx, dy = (y + 0.5 - cy) / ry;
      if (dx * dx + dy * dy <= 1 && x >= 0 && y >= 0 && x < buf.w && y < buf.h) buf[y * buf.w + x] = tone + (dy < -0.3 ? 1 : 0);
    }
  }

  // ---------- Carvalho / árvore de outono ----------
  T.broadleaf = function (v, autumn) {
    const rng = new RNG(1234 + v * 97 + (autumn ? 5000 : 0));
    const sz = v % 3, W = 34 + sz * 2, H = 44 + sz * 3;
    const c = cv(W, H), ctx = c.getContext('2d');
    const bx = W / 2 + (v % 2 ? 1 : -1), by = H - 5;
    const cx = W / 2, cy = 16 + sz, rx = 13.5 + sz, ry = 12 + sz * 0.6;
    const greens = [['#4a8a34', '#3f7f2e'], ['#558f38', '#457e30'], ['#4c8a3e', '#3d7a34']][sz];
    const pals = autumn ? [ramp(['#d06a1e', '#c8452a', '#d89a22'][sz]), ramp('#e0a828'), ramp('#b83a22')] : [ramp(greens[0]), ramp(greens[1])];
    trunk(ctx, rng, bx, by, cy + 4, 7, 4, '#6e5236', 0, 7);
    // camada escura interna (profundidade)
    const base = Buf(W, H); darkBase(base, cx, cy + 1, rx - 1.5, ry - 1.5, 0); paintBuf(ctx, base, pals);
    // galhos visíveis entre as folhas
    const bark = '#3e2c1c', barkHi = '#5a4028';
    for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * 0.55; branchLine(ctx, bx, cy + 6, bx + Math.cos(a) * rx * 0.7, cy + 6 + Math.sin(a) * ry * 0.75, 3, bark, barkHi); }
    // folhagem com algumas falhas para os galhos aparecerem
    const buf = Buf(W, H);
    const pl = autumn ? [0, 0, 1, 2] : [0, 0, 1];
    const lumps = [[0, -0.62, 0.5], [-0.52, -0.32, 0.45], [0.52, -0.32, 0.45], [-0.68, 0.18, 0.42], [0.68, 0.18, 0.42], [0, 0.02, 0.5], [-0.3, 0.52, 0.46], [0.34, 0.52, 0.46]];
    lumps.sort((a, b) => a[1] - b[1]);
    for (const [lx, ly, lr] of lumps) { const r2 = lr * rx * rng.range(0.9, 1.08); canopy(buf, rng, cx + lx * rx * rng.range(0.9, 1.05), cy + ly * ry * rng.range(0.9, 1.05), r2, r2 * 0.88, { pals: pl, n: Math.round(r2 * r2 / 3), rmin: 2, rmax: 3.4 }); }
    for (let k = 0; k < 2; k++) { const hx = cx + rng.range(-rx * 0.45, rx * 0.45), hy = cy + rng.range(-ry * 0.1, ry * 0.5), hr = rng.range(1.2, 2); for (let y = Math.floor(hy - hr); y <= hy + hr; y++) for (let x = Math.floor(hx - hr); x <= hx + hr; x++) if ((x - hx) ** 2 + (y - hy) ** 2 < hr * hr && x >= 0 && y >= 0 && x < W && y < H) buf[y * W + x] = -1; }
    paintBuf(ctx, buf, pals);
    if (autumn) for (let i = 0; i < 7; i++) { ctx.fillStyle = rng.pick(['#d06a1e', '#e0a828', '#b83a22']); ctx.fillRect(Math.round(bx + rng.range(-9, 9)), by + rng.int(-1, 2), 1, 1); }
    outline(c, shade(pals[0][0], -0.45));
    groundShadow(c, bx + 2, by + 1, rx * 0.85, 3.5);
    return { c, oy: 4 };
  };

  // ---------- Pinheiro (com ou sem neve) ----------
  T.pine = function (v, snow) {
    const rng = new RNG(777 + v * 131 + (snow ? 3000 : 0));
    const W = 28, H = 50 + (v % 3) * 4;
    const c = cv(W, H), ctx = c.getContext('2d');
    const bx = W / 2, by = H - 5;
    const pal = [ramp(['#2e6a40', '#2a6248', '#356e3a'][v % 3]), ramp('#c8d6e6', [-0.42, -0.28, -0.14, 0, 0.1, 0.2])];
    trunk(ctx, rng, bx, by, H - 16, 4, 3, '#5e4028', 0, 4);
    const buf = Buf(W, H), sd = rng.int(1, 9999);
    const tiers = 6, top = 2, bottom = H - 11, step = (bottom - top) / tiers;
    for (let t = tiers - 1; t >= 0; t--) {                      // de baixo para cima: a saia de cima cobre a de baixo
      const ty0 = top + t * step - (t ? 2 : 0), ty1 = top + (t + 1) * step + 2;
      const hwB = 2.5 + (t + 1) * (W / 2 - 3.5) / tiers;
      for (let y = Math.floor(ty0); y <= ty1; y++) {
        const f = (y - ty0) / (ty1 - ty0);
        const hw = hwB * Math.pow(f, 0.75) + 0.5;
        for (let x = Math.floor(-hw); x <= hw; x++) {
          const ax = Math.abs(x) / hw;
          const droop = ax * ax * 2.2;                               // galhos caídos nas pontas
          if (f * (ty1 - ty0) < droop - 0.5) continue;
          if (ax > 0.75 && nz(x + 50, y, sd) < 0.35) continue;      // pontas recortadas
          const px = Math.round(bx + x), py = y;
          if (px < 0 || px >= W || py < 0 || py >= H) continue;
          let tone = 2.8 - (x / hw) * 1.3 - f * 1.4 + (nz(px, py, sd + 1) - 0.5) * 1.2;
          if (f > 0.85) tone -= 1;
          let p = 0;
          if (snow && (f < 0.38 + nz(px, 0, sd + 2) * 0.2) && !(ax > 0.9)) { p = 1; tone = 3.2 - (x / hw) * 1.1 - f * 2 + (nz(px, py, sd + 4) - 0.5); }
          buf[py * W + px] = p * 8 + clampI(Math.round(tone), 0, 5);
        }
      }
      // sombra que esta camada projeta logo abaixo da borda
      for (let x = -Math.ceil(hwB); x <= hwB; x++) for (let k = 1; k <= 2; k++) {
        const ax = Math.abs(x) / hwB, py = Math.round(ty1 - ax * ax * 2.2 + k), px = Math.round(bx + x);
        if (px < 0 || px >= W || py < 0 || py >= H) continue;
        const i = py * W + px; if (buf[i] >= 0 && (buf[i] >> 3) === 0) buf[i] = Math.max(0, (buf[i] & 7) - 2);
      }
    }
    paintBuf(ctx, buf, pal);
    if (snow) for (let i = 0; i < 10; i++) { const x = rng.int(4, W - 5), y = rng.int(4, H - 14); if (buf[y * W + x] >> 3 === 1) { ctx.fillStyle = '#ffffff'; ctx.fillRect(x, y, 1, 1); } }
    outline(c, shade(pal[0][0], -0.5));
    groundShadow(c, bx + 2, by + 1, 10, 3);
    return { c, oy: 4 };
  };

  // ---------- Palmeira ----------
  T.palm = function (v) {
    const rng = new RNG(4321 + v * 59);
    const W = 38, H = 48, c = cv(W, H), ctx = c.getContext('2d');
    const bx = W / 2, by = H - 5, bend = v % 2 ? 6 : -6;
    const R = ramp('#a08458', [-0.45, -0.3, -0.15, 0, 0.15, 0.28]);
    let tx = bx, ty = 12;
    for (let y = by; y >= ty; y--) {
      const t = (by - y) / (by - ty), x = Math.round(bx + bend * t * t), wd = t > 0.8 ? 3 : 4;
      for (let k = 0; k < wd; k++) { let tone = k === 0 ? 4 : k === wd - 1 ? 1 : 3; if ((by - y) % 3 === 0) tone -= 2; ctx.fillStyle = R[clampI(tone, 0, 5)]; ctx.fillRect(x - (wd >> 1) + k, y, 1, 1); }
      if (y === ty) tx = x;
    }
    const G = ramp('#4a9a3c');
    const fronds = [];
    for (let i = 0; i < 8; i++) fronds.push(-Math.PI + i * (Math.PI * 2 / 8) + rng.range(-0.2, 0.2));
    fronds.sort((a, b) => Math.sin(a) - Math.sin(b));               // as de trás primeiro
    for (const a of fronds) {
      const L = rng.range(13, 17), back = Math.sin(a) < 0;
      for (let s = 0; s < L; s += 0.5) {
        const fx = tx + Math.cos(a) * s, fy = ty + Math.sin(a) * s * 0.55 + s * s * 0.04;
        const fl = Math.round(3.2 * (1 - s / L) + 1);
        const tone = (back ? 1.5 : 3) + (Math.cos(a) < 0 ? 1 : 0) - s / L;
        ctx.fillStyle = G[clampI(Math.round(tone) - 1, 0, 5)]; ctx.fillRect(Math.round(fx), Math.round(fy), 1, 1);
        if (s % 1.5 < 0.5) for (const side of [-1, 1]) {           // folíolos
          const pa = a + side * 1.25;
          for (let k = 1; k <= fl; k++) { ctx.fillStyle = G[clampI(Math.round(tone) + (side < 0 ? 1 : 0) - (k === fl ? 1 : 0), 0, 5)]; ctx.fillRect(Math.round(fx + Math.cos(pa) * k * 0.8), Math.round(fy + Math.sin(pa) * k * 0.45 + k * 0.45), 1, 1); }
        }
      }
    }
    for (const [dx, dy] of [[-1, 1], [1, 1], [0, 2]]) { ctx.fillStyle = '#5a3a1e'; ctx.fillRect(tx + dx - 1, ty + dy, 2, 2); ctx.fillStyle = '#8a6030'; ctx.fillRect(tx + dx - 1, ty + dy, 1, 1); }
    outline(c, '#1a2a14');
    groundShadow(c, bx + 3, by + 1, 9, 3);
    return { c, oy: 4 };
  };

  // ---------- Árvore seca ----------
  T.dead = function (v) {
    const rng = new RNG(999 + v * 71);
    const W = 30, H = 40, c = cv(W, H), ctx = c.getContext('2d');
    const bx = W / 2, by = H - 5;
    const col = '#5e5044', hi = '#8a7a6a', dk = '#3e342c';
    const br = (x, y, a, len, w, d) => {
      const x1 = x + Math.cos(a) * len, y1 = y + Math.sin(a) * len;
      branchLine(ctx, x, y, x1, y1, w, w > 1.5 ? col : dk, w > 1.5 ? hi : null);
      if (d <= 0 || len < 3) return;
      const n = rng.chance(0.3) ? 1 : 2;
      for (let i = 0; i < n; i++) br(x1, y1, a + rng.range(-0.75, 0.75), len * rng.range(0.55, 0.75), w * 0.6, d - 1);
    };
    trunk(ctx, rng, bx, by, 20, 5, 3, '#5e5044', 0, 0);
    br(bx, 21, -Math.PI / 2 - 0.5, 9, 2.5, 3); br(bx, 21, -Math.PI / 2 + 0.55, 9, 2.5, 3); br(bx, 20, -Math.PI / 2, 11, 2.5, 3);
    ctx.fillStyle = dk; ctx.fillRect(bx - 1, 28, 2, 2);                // buraco no tronco
    outline(c, '#1a1410');
    groundShadow(c, bx + 2, by + 1, 7, 2.5);
    return { c, oy: 4 };
  };

  // ---------- Salgueiro ----------
  T.willow = function (v) {
    const rng = new RNG(2468 + v * 37);
    const W = 36, H = 44, c = cv(W, H), ctx = c.getContext('2d');
    const bx = W / 2, by = H - 5, cx = W / 2, cy = 13;
    const pal = [ramp('#6a8a3e'), ramp('#5a8040')];
    trunk(ctx, rng, bx, by, cy + 2, 7, 4, '#5a4632', 0, 8);
    const buf = Buf(W, H);
    for (const [lx, ly, r2] of [[-7, 2, 7], [7, 2, 7], [0, -2, 8], [0, 4, 7]].sort((p, q) => p[1] - q[1])) canopy(buf, rng, cx + lx, cy + ly, r2 * 1.15, r2 * 0.85, { pals: [0, 1], rmin: 2.2, rmax: 3.4 });
    // cortinas de folhas pendentes, em mechas
    const sd = rng.int(1, 9999);
    let x = 3;
    while (x < W - 4) {
      const gw = rng.int(2, 3), dxn = (x + gw / 2 - cx) / 16;
      const y0 = Math.round(cy + 2 + Math.sqrt(Math.max(0, 1 - dxn * dxn)) * 5);
      const len = Math.round((10 + rng.range(0, 14)) * (1 - Math.abs(dxn) * 0.35));
      for (let k = 0; k < gw; k++) {
        const xx0 = x + k, ln = len - rng.int(0, 3);
        for (let y = y0; y < Math.min(H - 6, y0 + ln); y++) {
          const f = (y - y0) / ln;
          if (f > 0.7 && nz(xx0, y, sd) < f - 0.55) continue;            // pontas desfiadas
          const xx = xx0 + Math.round(Math.sin(y * 0.35 + x * 0.7) * 0.7);
          if (xx < 0 || xx >= W) continue;
          const tone = clampI(Math.round(3.4 - dxn * 1.3 - f * 2.2 - (k === gw - 1 ? 1 : 0) + ((y + k) % 3 === 0 ? 0.6 : 0) + (nz(xx, y, sd + 1) - 0.5) * 0.8), 0, 5);
          buf[y * W + xx] = ((x >> 2) % 2) * 8 + tone;
        }
      }
      x += gw + (rng.chance(0.55) ? 1 : 2);
    }
    paintBuf(ctx, buf, pal);
    outline(c, shade(pal[0][0], -0.45));
    groundShadow(c, bx + 2, by + 1, 13, 3.5);
    return { c, oy: 4 };
  };

  // ---------- Árvore élfica ----------
  T.elf = function (v) {
    const rng = new RNG(1357 + v * 13);
    const W = 36, H = 54, c = cv(W, H), ctx = c.getContext('2d');
    const bx = W / 2, by = H - 5, cx = W / 2, cy = 17;
    const pal = [ramp('#2aa08a'), ramp('#3ab0a0'), ramp('#7ad8c0')];
    trunk(ctx, rng, bx, by, cy + 4, 8, 4, '#d8d0c0', 0, 6);
    for (let i = 0; i < 7; i++) { ctx.fillStyle = '#6a6458'; ctx.fillRect(bx - 3 + rng.int(0, 5), cy + 10 + i * 3, rng.int(1, 3), 1); } // marcas de bétula
    const base = Buf(W, H); darkBase(base, cx, cy + 1, 13.5, 12); paintBuf(ctx, base, pal);
    for (let i = 0; i < 4; i++) { const a = -Math.PI / 2 + (i - 1.5) * 0.5; branchLine(ctx, bx, cy + 8, bx + Math.cos(a) * 11, cy + 8 + Math.sin(a) * 11, 3, '#c8c0b0', '#f0e8dc'); }
    const buf = Buf(W, H);
    canopy(buf, rng, cx, cy, 15, 13.5, { pals: [0, 0, 1, 2] });
    paintBuf(ctx, buf, pal);
    outline(c, '#0e3a34');
    for (let i = 0; i < 14; i++) { ctx.fillStyle = rng.chance(0.5) ? '#c0fff4' : '#ffffff'; ctx.fillRect(rng.int(5, W - 6), rng.int(4, cy + 12), 1, 1); } // brilhos mágicos
    groundShadow(c, bx + 2, by + 1, 13, 3.5);
    return { c, oy: 4 };
  };
  return T;
})();
