'use strict';
// ===================== PIXEL ART PROCEDURAL: tiles, objetos e ícones =====================
const Sprites = {};
(function (S) {
  function cv(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  S.cv = cv;
  function P(ctx) { return (x, y, c, w = 1, h = 1) => { ctx.fillStyle = c; ctx.fillRect(x | 0, y | 0, w, h); }; }
  S.P = P;
  function outline(c, col = '#16101c') {
    const ctx = c.getContext('2d'); const w = c.width, h = c.height;
    const img = ctx.getImageData(0, 0, w, h), d = img.data;
    const out = new Uint8ClampedArray(d);
    const [r, g, b] = hexToRgb(col);
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const i = (y * w + x) * 4;
      if (d[i + 3] > 40) continue;
      let n = false;
      if (x > 0 && d[i - 4 + 3] > 120) n = true;
      else if (x < w - 1 && d[i + 4 + 3] > 120) n = true;
      else if (y > 0 && d[i - w * 4 + 3] > 120) n = true;
      else if (y < h - 1 && d[i + w * 4 + 3] > 120) n = true;
      if (n) { out[i] = r; out[i + 1] = g; out[i + 2] = b; out[i + 3] = 255; }
    }
    ctx.putImageData(new ImageData(out, w, h), 0, 0);
    return c;
  }
  S.outline = outline;
  function flip(c) {
    const f = cv(c.width, c.height), x = f.getContext('2d');
    x.translate(c.width, 0); x.scale(-1, 1); x.drawImage(c, 0, 0); return f;
  }
  S.flip = flip;
  function scaleCanvas(c, s) {
    const w = Math.round(c.width * s), h = Math.round(c.height * s);
    const o = cv(w, h), x = o.getContext('2d'); x.imageSmoothingEnabled = false; x.drawImage(c, 0, 0, w, h); return o;
  }
  S.scale = scaleCanvas;
  function tint(c, col, a) {
    const o = cv(c.width, c.height), x = o.getContext('2d');
    x.drawImage(c, 0, 0); x.globalCompositeOperation = 'source-atop'; x.globalAlpha = a; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height);
    return o;
  }
  S.tint = tint;
  function whiteMask(c) { return tint(c, '#ffffff', 1); }
  S.whiteMask = whiteMask;

  // ---------- helpers de pintura ----------
  function fill(p, c) { p(0, 0, c, 16, 16); }
  function speck(p, r, cols, n, size = 1) { for (let i = 0; i < n; i++) p(r.int(0, 16 - size), r.int(0, 16 - size), r.pick(cols), size, size); }
  function blob(p, r, cx, cy, rad, base, opts = {}) {
    const hi = opts.hi || shade(base, 0.22), sh = opts.sh || shade(base, -0.28), dk = shade(base, -0.45);
    for (let y = Math.floor(cy - rad); y <= cy + rad; y++) for (let x = Math.floor(cx - rad); x <= cx + rad; x++) {
      const dx = x - cx + 0.5, dy = y - cy + 0.5, d = dx * dx + dy * dy;
      if (d > rad * rad) continue;
      let col = base;
      const s = (dx + dy) / rad;
      if (s < -0.55) col = hi; else if (s > 0.6) col = sh;
      if (d > (rad - 1) * (rad - 1) && dy > 0) col = dk;
      if (r.next() < 0.12) col = r.next() < 0.5 ? hi : sh;
      p(x, y, col);
    }
  }
  S.blob = blob;
  function ellipse(p, cx, cy, rx, ry, col) {
    for (let y = Math.floor(cy - ry); y <= cy + ry; y++) for (let x = Math.floor(cx - rx); x <= cx + rx; x++) {
      const dx = (x - cx + 0.5) / rx, dy = (y - cy + 0.5) / ry;
      if (dx * dx + dy * dy <= 1) p(x, y, col);
    }
  }
  S.ellipse = ellipse;
  function bricks(p, r, base, mortar, bw, bh, vary = 0.08) {
    fill(p, mortar);
    for (let row = 0; row * bh < 16; row++) {
      const off = (row % 2) * (bw >> 1);
      for (let bx = -off; bx < 16; bx += bw) {
        const c = shade(base, r.range(-vary, vary));
        p(bx + 1, row * bh + 1, c, bw - 1, bh - 1);
        p(bx + 1, row * bh + 1, shade(c, 0.12), bw - 1, 1);
      }
    }
  }
  function slabs(p, r, base, line, n = 8) {
    fill(p, base);
    for (let y = 0; y < 16; y += n) for (let x = 0; x < 16; x += n) {
      const c = shade(base, r.range(-0.06, 0.06));
      p(x, y, c, n, n); p(x, y, line, n, 1); p(x, y, line, 1, n); p(x + 1, y + 1, shade(c, 0.1), n - 2, 1);
    }
  }

  // ---------- TILES ----------
  const TP = {}; // pintores por tile
  TP[T.GRASS] = (p, r) => { fill(p, '#4f9a3c'); speck(p, r, ['#3f8a30', '#458f34'], 34); speck(p, r, ['#62ad48', '#5aa542'], 18); for (let i = 0; i < 4; i++) { const x = r.int(1, 14), y = r.int(2, 14); p(x, y, '#6fbf50'); p(x, y - 1, '#7acb58'); } };
  TP[T.DGRASS] = (p, r) => { fill(p, '#3a7330'); speck(p, r, ['#2f6228', '#336a2b'], 36); speck(p, r, ['#4a8a3a', '#447f36'], 16); speck(p, r, ['#6a5a2a', '#7a6a32'], 3); };
  TP[T.ELFGRASS] = (p, r) => { fill(p, '#3d9a72'); speck(p, r, ['#2f8a62', '#358f68'], 30); speck(p, r, ['#52b088', '#5abb90'], 14); if (r.chance(0.5)) p(r.int(1, 14), r.int(1, 14), '#c0fff0'); };
  TP[T.SAND] = (p, r) => { fill(p, '#dcc98a'); speck(p, r, ['#cbb878', '#d2bf80'], 26); speck(p, r, ['#ead9a0', '#f0e2b0'], 14); };
  TP[T.DESERT] = (p, r) => { fill(p, '#e6b765'); speck(p, r, ['#dcae5c', '#f0c470'], 24); const y0 = r.int(2, 6); for (let x = 0; x < 16; x++) { p(x, y0 + Math.round(Math.sin(x / 2.5 + r.next()) * 1), '#d4a454'); p(x, y0 + 8 + Math.round(Math.sin(x / 3) * 1), '#d4a454'); } };
  TP[T.DIRT] = (p, r) => { fill(p, '#8a6a43'); speck(p, r, ['#7a5a38', '#80603c'], 30); speck(p, r, ['#9a7a50', '#a08058'], 16); speck(p, r, ['#a89478'], 3); };
  TP[T.SNOW] = (p, r) => { fill(p, '#e6edf5'); speck(p, r, ['#d5e0ec', '#dbe4ee'], 26); speck(p, r, ['#ffffff'], 10); };
  TP[T.ICE] = (p, r) => { fill(p, '#a6d6ee'); speck(p, r, ['#9acde8', '#b4dff2'], 20); let x = r.int(0, 15), y = 0; for (let i = 0; i < 18; i++) { p(x, y, '#e0f6ff'); x += r.int(-1, 1); y++; if (x < 0 || x > 15 || y > 15) break; } p(r.int(2, 13), r.int(2, 13), '#ffffff'); };
  TP[T.SWAMP] = (p, r) => { fill(p, '#4d5a2e'); speck(p, r, ['#3d4a24', '#45522a'], 30); speck(p, r, ['#5d6a3a', '#66733f'], 14); if (r.chance(0.5)) { const x = r.int(2, 9), y = r.int(2, 10); p(x, y, '#38483e', 5, 3); p(x + 1, y, '#4a5a50', 2, 1); } };
  TP[T.MUD] = (p, r) => { fill(p, '#5e4b35'); speck(p, r, ['#4e3d2a', '#544330'], 30); speck(p, r, ['#6e5a42'], 14); };
  TP[T.WATER] = (p, r, v) => { fill(p, '#3a78c8'); speck(p, r, ['#3570c0', '#3f80d0'], 30); for (let i = 0; i < 3; i++) { const x = r.int(0, 12), y = r.int(1, 14); p(x, y, '#5a98e0', 3, 1); p(x + 1, y - 1, '#78b0ec', 1, 1); } };
  TP[T.DEEP] = (p, r) => { fill(p, '#1f4a8a'); speck(p, r, ['#1b4380', '#245294'], 30); for (let i = 0; i < 2; i++) { const x = r.int(0, 12), y = r.int(1, 14); p(x, y, '#2e62a8', 4, 1); } };
  TP[T.LAVA] = (p, r) => { fill(p, '#ff5a1a'); speck(p, r, ['#e84a10', '#ff6a2a'], 30); for (let i = 0; i < 4; i++) { const x = r.int(0, 13), y = r.int(0, 13); p(x, y, '#ffb030', 3, 2); p(x + 1, y, '#ffe070'); } speck(p, r, ['#a02808'], 6, 2); };
  TP[T.ASH] = (p, r) => { fill(p, '#4a4246'); speck(p, r, ['#3a3438', '#403a3e'], 30); speck(p, r, ['#5a5256', '#625a5e'], 14); if (r.chance(0.3)) p(r.int(0, 15), r.int(0, 15), '#ff6020'); };
  TP[T.ROAD] = (p, r) => { fill(p, '#b09163'); speck(p, r, ['#a08355', '#a88a5c'], 30); speck(p, r, ['#c0a173', '#c8aa7c'], 16); speck(p, r, ['#8a7050'], 4); };
  const cobble = (base, mortar) => (p, r) => {
    fill(p, mortar);
    for (let y = 0; y < 16; y += 4) { const off = (y / 4) % 2 * 2; for (let x = -off; x < 16; x += 4) { const c = shade(base, r.range(-0.1, 0.1)); p(x + 1, y + 1, c, 3, 3); p(x + 1, y + 1, shade(c, 0.15), 3, 1); } }
  };
  TP[T.COBBLE] = cobble('#9a968f', '#6a6764');
  TP[T.DCOBBLE] = cobble('#68646e', '#46424c');
  TP[T.SANDSTONE] = (p, r) => slabs(p, r, '#c9a46a', '#b08a50');
  TP[T.WOOD] = (p, r) => { fill(p, '#9c6b3c'); for (let y = 0; y < 16; y += 4) { p(0, y, '#7a5028', 16, 1); const c = shade('#9c6b3c', r.range(-0.08, 0.08)); p(0, y + 1, c, 16, 3); p(r.int(0, 15), y + 2, '#8a5a30', 3, 1); p(r.int(0, 3) * 4 + 2, y + 1, '#5a3a20'); } };
  TP[T.BRIDGE] = (p, r) => { fill(p, '#a67845'); for (let x = 0; x < 16; x += 4) { p(x, 0, '#7a5028', 1, 16); p(x + 1, 0, shade('#a67845', r.range(-0.08, 0.08)), 3, 16); } p(0, 0, '#5a3a20', 16, 1); p(0, 15, '#5a3a20', 16, 1); };
  TP[T.TUNDRA] = (p, r) => { fill(p, '#8a9a6e'); speck(p, r, ['#7a8a5e', '#808f64'], 30); speck(p, r, ['#9aaa7e'], 14); if (r.chance(0.5)) p(r.int(0, 15), r.int(0, 15), '#e8eef0'); };
  TP[T.FARM] = (p, r) => { fill(p, '#7a5a2e'); for (let y = 1; y < 16; y += 4) { p(0, y, '#5e4420', 16, 1); p(0, y + 1, '#8a6a3a', 16, 1); for (let x = 1; x < 16; x += 3) if (r.chance(0.6)) p(x, y - 1, '#6aa040'); } };
  TP[T.DFLOOR] = (p, r) => { slabs(p, r, '#4b4552', '#36303c'); if (r.chance(0.3)) p(r.int(1, 13), r.int(1, 13), '#3a3442', 2, 1); };
  TP[T.CFLOOR] = (p, r) => { fill(p, '#5a4a3c'); speck(p, r, ['#4e4034', '#524436'], 30); speck(p, r, ['#6a5a4a', '#655545'], 14); speck(p, r, ['#3a3028'], 4, 2); };
  TP[T.DEADGRASS] = (p, r) => { fill(p, '#6b6040'); speck(p, r, ['#5b5030', '#615636'], 30); speck(p, r, ['#7b7050', '#837858'], 14); for (let i = 0; i < 3; i++) { const x = r.int(1, 14), y = r.int(2, 14); p(x, y, '#8a7a50'); } };
  TP[T.BADLAND] = (p, r) => { fill(p, '#9c4a2c'); speck(p, r, ['#8c3e24', '#924428'], 30); speck(p, r, ['#ac5a3a'], 14); let x = r.int(0, 15), y = r.int(0, 15); for (let i = 0; i < 8; i++) { p(x, y, '#6c2a18'); x += r.int(-1, 1); y += r.int(-1, 1); } };
  TP[T.IFLOOR] = (p, r) => { fill(p, '#7fa8c4'); speck(p, r, ['#729cb8', '#88b2ce'], 30); speck(p, r, ['#b0d8f0'], 6); };
  TP[T.TFLOOR] = (p, r) => slabs(p, r, '#a8875a', '#8a6a40');
  TP[T.VFLOOR] = (p, r) => { fill(p, '#3a2a2a'); speck(p, r, ['#302222', '#443030'], 30); if (r.chance(0.4)) { let x = r.int(0, 15), y = r.int(0, 15); for (let i = 0; i < 6; i++) { p(x, y, '#c03a10'); x += r.int(-1, 1); y += 1; } } };
  TP[T.RFLOOR] = (p, r) => { slabs(p, r, '#56705a', '#3e5442'); speck(p, r, ['#4a8a4a', '#3a7a3a'], 8); };
  TP[T.MFLOOR] = (p, r) => { slabs(p, r, '#6a5844', '#4a3c2c', 8); speck(p, r, ['#7a6852'], 6); };
  TP[T.HFLOOR] = (p, r) => { fill(p, '#8a6038'); for (let y = 0; y < 16; y += 4) { const c = shade('#8a6038', r.range(-0.07, 0.07)); p(0, y, c, 16, 4); p(0, y + 3, '#5e3e20', 16, 1); const j = r.int(2, 13); p(j, y, '#5e3e20', 1, 3); p(r.int(0, 15), y + 1, shade(c, 0.1), 3, 1); } };
  TP[T.CARPET] = (p, r) => { fill(p, '#8a2030'); p(0, 0, '#c09030', 16, 1); p(0, 15, '#c09030', 16, 1); speck(p, r, ['#7a1828', '#9a2838'], 20); p(7, 7, '#c09030', 2, 2); };
  // paredes: topo e face
  const WALLS = {
    [T.ROCK]: { top: '#77706a', face: '#5f5853', dark: '#433e3a', hi: '#8a837c', kind: 'rock' },
    [T.SNOWROCK]: { top: '#e2e8ef', face: '#8a8f98', dark: '#5f646c', hi: '#ffffff', kind: 'rock', snow: true },
    [T.WALL]: { top: '#77737c', face: '#6d6a72', dark: '#4d4a52', hi: '#8d8a92', kind: 'brick' },
    [T.DWALL]: { top: '#3a3442', face: '#2c2633', dark: '#1c1823', hi: '#4a4452', kind: 'brick' },
    [T.CWALL]: { top: '#3a2e26', face: '#2e2520', dark: '#1e1814', hi: '#4a3e34', kind: 'rock' },
    [T.IWALL]: { top: '#5a80a0', face: '#3b5a78', dark: '#2a4058', hi: '#a0d0f0', kind: 'rock' },
    [T.TWALL]: { top: '#8a6a40', face: '#6a5030', dark: '#4a3820', hi: '#a08050', kind: 'brick' },
    [T.VWALL]: { top: '#2a1c1c', face: '#1c1212', dark: '#100808', hi: '#ff5020', kind: 'rock', glow: true },
    [T.RWALL]: { top: '#3a4a3c', face: '#2a3a2c', dark: '#1a2a1c', hi: '#4a7a4a', kind: 'brick', moss: true },
    [T.MWALL]: { top: '#4a3e32', face: '#3a2e24', dark: '#2a2018', hi: '#c08a4a', kind: 'brick' },
    [T.PALISADE]: { top: '#6a4a26', face: '#5a3a1e', dark: '#3a2410', hi: '#8a6a3a', kind: 'log' },
    [T.HWALL]: { top: '#5a3a22', face: '#d8c8a4', dark: '#6a4a2a', hi: '#efe2c4', kind: 'plaster' },
    [T.LOGWALL]: { top: '#4a3018', face: '#7a5230', dark: '#4a2e18', hi: '#9a7048', kind: 'logh' }
  };
  function paintWall(p, r, w, face) {
    if (!face) {
      fill(p, w.top);
      if (w.kind === 'rock') { speck(p, r, [w.hi, shade(w.top, -0.1)], 20); speck(p, r, [shade(w.top, -0.18)], 8, 2); }
      else if (w.kind === 'log') { for (let x = 0; x < 16; x += 4) { ellipseTop(p, x + 2, 8, w.hi, w.dark); } }
      else if (w.kind === 'plaster' || w.kind === 'logh') { p(0, 0, w.top, 16, 16); speck(p, r, [shade(w.top, 0.1), shade(w.top, -0.1)], 14); }
      else { bricks(p, r, w.top, shade(w.top, -0.2), 8, 4, 0.05); }
      if (w.snow) speck(p, r, ['#ffffff', '#f0f4f8'], 30);
      if (w.moss) speck(p, r, ['#4a7a3a', '#5a8a40'], 10);
      return;
    }
    if (w.kind === 'plaster') {
      fill(p, w.face); speck(p, r, [shade(w.face, -0.05), shade(w.face, 0.05)], 20);
      p(0, 0, w.dark, 16, 2); p(0, 2, shade(w.dark, 0.2), 16, 1); p(0, 12, w.dark, 16, 4); p(0, 12, shade(w.dark, 0.25), 16, 1);
      p(0, 0, w.dark, 2, 16); p(1, 2, shade(w.dark, 0.2), 1, 10);
      return;
    }
    if (w.kind === 'logh') {
      for (let y = 0; y < 16; y += 4) { p(0, y, w.face, 16, 4); p(0, y, w.hi, 16, 1); p(0, y + 3, w.dark, 16, 1); if (r.chance(0.5)) p(r.int(1, 13), y + 1, w.dark, 2, 1); }
      return;
    }
    if (w.kind === 'rock') {
      fill(p, w.face);
      for (let x = 0; x < 16; x += r.int(2, 4)) p(x, 0, w.dark, 1, 16);
      speck(p, r, [w.hi, shade(w.face, 0.1)], 12); speck(p, r, [w.dark], 10);
      p(0, 0, w.top, 16, 3); speck(p, r, [w.hi], 4);
      if (w.snow) { p(0, 0, '#ffffff', 16, 3); for (let x = 0; x < 16; x++) if (r.chance(0.5)) p(x, 3, '#e8eef4', 1, r.int(1, 3)); }
      if (w.glow) for (let i = 0; i < 2; i++) { let x = r.int(2, 13), y = 4; for (let k = 0; k < 8; k++) { p(x, y, '#ff5020'); x += r.int(-1, 1); y++; } }
      p(0, 15, w.dark, 16, 1);
    } else if (w.kind === 'log') {
      fill(p, w.face);
      for (let x = 0; x < 16; x += 4) { p(x, 2, shade(w.face, 0.1), 3, 14); p(x + 3, 2, w.dark, 1, 14); p(x + 1, 0, w.hi, 1, 2); p(x, 1, w.face, 3, 1); }
    } else {
      bricks(p, r, w.face, w.dark, 8, 4);
      p(0, 0, w.top, 16, 2); p(0, 0, w.hi, 16, 1);
      if (w.moss) speck(p, r, ['#4a7a3a', '#3a6a30'], 8);
    }
  }
  function ellipseTop(p, cx, cy, hi, dk) { for (let y = 0; y < 16; y++) { p(cx - 2, y, dk); p(cx - 1, y, hi, 2, 1); p(cx + 1, y, dk); } }

  S.tiles = []; S.wallFace = [];
  S.tileBase = [];
  function initTiles() {
    for (let id = 0; id < TILE_DEFS.length; id++) {
      if (!TILE_DEFS[id]) continue;
      S.tiles[id] = [];
      for (let v = 0; v < 4; v++) {
        const c = cv(16, 16), p = P(c.getContext('2d')), r = new RNG(id * 977 + v * 31 + 7);
        if (WALLS[id]) paintWall(p, r, WALLS[id], false);
        else if (TP[id]) TP[id](p, r, v);
        else fill(p, TILE_DEFS[id].c);
        S.tiles[id].push(c);
      }
      if (WALLS[id]) {
        S.wallFace[id] = [];
        for (let v = 0; v < 3; v++) { const c = cv(16, 16), p = P(c.getContext('2d')), r = new RNG(id * 131 + v * 17); paintWall(p, r, WALLS[id], true); S.wallFace[id].push(c); }
      }
    }
  }

  // Prioridade para mistura de bordas
  const BLEND = [];
  [[T.DEEP, 0], [T.WATER, 1], [T.LAVA, 2], [T.ICE, 3], [T.SAND, 4], [T.MUD, 5], [T.SWAMP, 6], [T.DESERT, 7], [T.DIRT, 8], [T.BADLAND, 9], [T.ASH, 9],
    [T.TUNDRA, 10], [T.DEADGRASS, 10], [T.GRASS, 12], [T.DGRASS, 13], [T.ELFGRASS, 13], [T.SNOW, 14], [T.CFLOOR, 2], [T.IFLOOR, 2], [T.VFLOOR, 2]].forEach(([t, v]) => BLEND[t] = v);
  S.BLEND = BLEND;

  // Pinta um bloco de tiles num contexto (usado por chunks e masmorras)
  // getT(x,y) retorna tile em coordenadas locais (pode ir 1 além das bordas)
  S.paintTiles = function (ctx, w, h, getT, seed, ox = 0, oy = 0) {
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
      const t = getT(x, y);
      const hv = hash2(x + ox, y + oy, seed);
      const v = Math.floor(hv * 4);
      const def = TILE_DEFS[t];
      if (def.wall) {
        const below = getT(x, y + 1);
        if (!TILE_DEFS[below].wall) ctx.drawImage(S.wallFace[t][v % 3], x * 16, y * 16);
        else ctx.drawImage(S.tiles[t][v], x * 16, y * 16);
        continue;
      }
      ctx.drawImage(S.tiles[t][v], x * 16, y * 16);
      // sombra de parede acima
      const above = getT(x, y - 1);
      if (TILE_DEFS[above].wall) { ctx.fillStyle = 'rgba(0,0,0,0.28)'; ctx.fillRect(x * 16, y * 16, 16, 4); ctx.fillStyle = 'rgba(0,0,0,0.14)'; ctx.fillRect(x * 16, y * 16 + 4, 16, 3); }
      const my = BLEND[t];
      if (my === undefined) continue;
      // bordas
      const nb = [[0, -1], [1, 0], [0, 1], [-1, 0]];
      for (let k = 0; k < 4; k++) {
        const n = getT(x + nb[k][0], y + nb[k][1]);
        if (n === t) continue;
        const pr = BLEND[n];
        const water = def.water;
        if (water && !TILE_DEFS[n].water && !TILE_DEFS[n].wall) {
          // espuma
          ctx.fillStyle = '#b8daf4';
          for (let i = 0; i < 16; i++) {
            const dd = (hash2(x * 16 + i + ox * 16, y * 16 + k + oy * 16, seed + 3) * 2) | 0;
            if (dd === 0) continue;
            if (k === 0) ctx.fillRect(x * 16 + i, y * 16, 1, dd);
            else if (k === 2) ctx.fillRect(x * 16 + i, y * 16 + 16 - dd, 1, dd);
            else if (k === 1) ctx.fillRect(x * 16 + 16 - dd, y * 16 + i, dd, 1);
            else ctx.fillRect(x * 16, y * 16 + i, dd, 1);
          }
        }
        if (pr === undefined || pr <= my) continue;
        const col = TILE_DEFS[n].c;
        ctx.fillStyle = col;
        for (let i = 0; i < 16; i++) {
          const dd = 1 + ((hash2((x + ox) * 16 + i, (y + oy) * 16 + k * 7, seed + 11) * 3.2) | 0);
          if (k === 0) ctx.fillRect(x * 16 + i, y * 16, 1, dd);
          else if (k === 2) ctx.fillRect(x * 16 + i, y * 16 + 16 - dd, 1, dd);
          else if (k === 1) ctx.fillRect(x * 16 + 16 - dd, y * 16 + i, dd, 1);
          else ctx.fillRect(x * 16, y * 16 + i, dd, 1);
        }
      }
    }
  };

  // ---------- OBJETOS ----------
  // Cada sprite: {c: canvas, oy: deslocamento vertical}. Desenhado com base no centro-inferior do tile.
  const objCache = new Map();
  S.obj = function (id, v = 0, frame = 0) {
    const k = id * 1000 + v * 10 + frame;
    let s = objCache.get(k);
    if (!s) { s = makeObj(id, v, frame); objCache.set(k, s); }
    return s;
  };
  function mk(w, h, fn, ol = true) { const c = cv(w, h), p = P(c.getContext('2d')); fn(p, c.getContext('2d')); if (ol) outline(c); return c; }
  function trunk(p, x, y, w, h, c) { p(x, y, c, w, h); p(x, y, shade(c, 0.2), 1, h); p(x + w - 1, y, shade(c, -0.25), 1, h); }
  function makeObj(id, v, f) {
    const r = new RNG(id * 7919 + v * 104729 + 13);
    let c, oy = 0;
    switch (id) {
      case O.OAK: case O.AUTUMN: {
        const cols = id === O.OAK ? ['#3f8a32', '#47913a', '#3a8030'] : ['#d07020', '#c04a20', '#d8a020'];
        const base = cols[v % 3];
        const sz = [0, 1, 2][v % 3];
        c = mk(20, 30 + sz * 2, p => {
          trunk(p, 8, 18 + sz * 2, 4, 11, '#6a4a2a'); p(7, 28 + sz * 2, '#5a3a1a', 6, 1);
          blob(p, r, 10, 10 + sz, 7 + sz * 0.4, base); blob(p, r, 6, 13 + sz, 4.5, base); blob(p, r, 14, 13 + sz, 4.5, base);
          for (let i = 0; i < 6; i++) p(r.int(4, 15), r.int(4, 17), shade(base, 0.3));
          if (id === O.AUTUMN && r.chance(0.5)) p(r.int(4, 15), 28, '#d07020');
        });
        oy = 2; break;
      }
      case O.PINE: case O.SNOWPINE: {
        const snow = id === O.SNOWPINE; const h = 30 + (v % 3) * 3;
        c = mk(18, h, p => {
          trunk(p, 8, h - 6, 2, 6, '#5a3a20');
          const tiers = 4;
          for (let t = 0; t < tiers; t++) {
            const ty = 2 + t * ((h - 8) / tiers), wd = 2 + t * 2;
            for (let y = 0; y < (h - 8) / tiers + 2; y++) {
              const half = Math.min(wd, Math.floor(y * 0.9) + 1);
              for (let x = -half; x <= half; x++) {
                let col = x < -half / 3 ? '#3a7a4a' : x > half / 3 ? '#1e4a2e' : '#2a5e3a';
                if (snow && y < 2) col = '#f0f4f8';
                if (snow && y === 2 && r.chance(0.5)) col = '#e0e8f0';
                p(9 + x, ty + y, col);
              }
            }
          }
          if (snow) for (let i = 0; i < 6; i++) p(r.int(4, 13), r.int(6, h - 8), '#ffffff');
        });
        oy = 2; break;
      }
      case O.PALM: {
        c = mk(24, 32, p => {
          let x = 11; for (let y = 31; y > 10; y--) { p(x, y, (y % 3) ? '#a08050' : '#80603a', 3, 1); if (y % 6 === 0) x += (v % 2 ? 1 : -1); }
          const tx = x + 1, ty = 10;
          for (let a = 0; a < 6; a++) {
            const ang = -Math.PI + a * Math.PI / 5 + 0.1;
            for (let i = 0; i < 10; i++) { const px = tx + Math.cos(ang) * i, py = ty + Math.sin(ang) * i * 0.6 + i * i * 0.05; p(px, py, i < 3 ? '#3a8a3a' : '#4aa040', 1, 2); }
          }
          p(tx - 1, ty, '#6a4a20', 3, 2);
        });
        oy = 2; break;
      }
      case O.DEADTREE: {
        c = mk(18, 26, p => {
          trunk(p, 8, 10, 3, 16, '#5a4a3a');
          const br = (x, y, dx, n) => { for (let i = 0; i < n; i++) { p(x, y, '#5a4a3a'); x += dx; y -= 1; if (r.chance(0.4)) x += dx; } };
          br(8, 14, -1, 6); br(10, 12, 1, 6); br(9, 10, 0, 6); br(7, 8, -1, 3); br(11, 7, 1, 3);
        });
        oy = 2; break;
      }
      case O.WILLOW: {
        c = mk(24, 30, p => {
          trunk(p, 10, 18, 4, 12, '#4a3a2a');
          blob(p, r, 12, 10, 9, '#5a7a3a');
          for (let x = 4; x < 21; x += 2) { const len = r.int(6, 14); for (let y = 12; y < 12 + len; y++) p(x, y, y % 2 ? '#4a6a30' : '#5a7a3a'); }
        });
        oy = 2; break;
      }
      case O.ELFTREE: {
        c = mk(28, 44, p => {
          trunk(p, 11, 22, 6, 22, '#d8d0c0'); p(9, 42, '#c0b8a8', 10, 2);
          for (let i = 0; i < 6; i++) p(12 + r.int(0, 3), 24 + i * 3, '#a8a090', 1, 2);
          blob(p, r, 14, 13, 11, '#2aa08a'); blob(p, r, 7, 17, 6, '#2a9a80'); blob(p, r, 21, 17, 6, '#2a9a80');
          for (let i = 0; i < 12; i++) p(r.int(4, 24), r.int(3, 22), r.chance(0.5) ? '#a0fff0' : '#e0fff8');
        });
        oy = 3; break;
      }
      case O.CACTUS: {
        c = mk(14, 20, p => {
          p(5, 2, '#3a8a3a', 4, 18); p(5, 2, '#5aaa4a', 1, 18); p(8, 2, '#2a6a2a', 1, 18);
          p(1, 7, '#3a8a3a', 2, 6); p(2, 11, '#3a8a3a', 3, 2); p(11, 5, '#3a8a3a', 2, 6); p(9, 9, '#3a8a3a', 3, 2);
          if (v % 2) p(6, 1, '#f070a0', 2, 2);
        });
        break;
      }
      case O.BIGSHROOM: {
        const cap = ['#c03030', '#8040c0', '#d08030'][v % 3];
        c = mk(18, 20, p => {
          p(7, 10, '#e8e0d0', 4, 10); p(7, 10, '#ffffff', 1, 10);
          ellipse(p, 9, 8, 8, 5, cap); ellipse(p, 9, 7, 6, 3, shade(cap, 0.2));
          for (let i = 0; i < 4; i++) p(r.int(3, 14), r.int(4, 9), '#f8f0e0', 2, 1);
        });
        break;
      }
      case O.BUSH: {
        const base = ['#3a8030', '#46883a', '#3a7a40'][v % 3];
        c = mk(14, 11, p => { blob(p, r, 7, 6, 5, base); blob(p, r, 4, 7, 3.5, base); blob(p, r, 10, 7, 3.5, base); if (v === 1) for (let i = 0; i < 4; i++) p(r.int(3, 11), r.int(3, 8), '#e03040'); });
        break;
      }
      case O.ROCK: { c = mk(12, 8, p => { ellipse(p, 6, 5, 5, 3, '#8a8580'); ellipse(p, 5, 4, 3, 2, '#a09a94'); p(7, 6, '#6a6560', 3, 1); }); break; }
      case O.BOULDER: case O.ICEROCK: case O.SANDROCK: {
        const base = id === O.ICEROCK ? '#a0c8e0' : id === O.SANDROCK ? '#c8a070' : '#8a8580';
        c = mk(16, 14, p => { blob(p, r, 8, 8, 6.5, base); p(4, 5, shade(base, 0.3), 3, 1); });
        break;
      }
      case O.ORE_FERRO: case O.ORE_PRATA: case O.ORE_OURO: case O.ORE_OBSIDIANA: case O.ORE_MALAQUITA: case O.ORE_EBANO: {
        const oc = { [O.ORE_FERRO]: '#c08060', [O.ORE_PRATA]: '#e8f0ff', [O.ORE_OURO]: '#ffd040', [O.ORE_OBSIDIANA]: '#4a3a5a', [O.ORE_MALAQUITA]: '#40e090', [O.ORE_EBANO]: '#7a50a0' }[id];
        c = mk(16, 14, p => { blob(p, r, 8, 8, 6.5, '#6a6560'); for (let i = 0; i < 7; i++) { const x = r.int(4, 11), y = r.int(4, 11); p(x, y, oc, 2, 1); p(x, y - 1, shade(oc, 0.4)); } });
        break;
      }
      case O.FLOWERS: {
        const cols = [['#f0e040', '#ffffff'], ['#e04070', '#f090c0'], ['#8070f0', '#f0f0ff'], ['#f08030', '#f0e040']][v % 4];
        c = mk(16, 16, p => { for (let i = 0; i < 6; i++) { const x = r.int(1, 13), y = r.int(3, 13); p(x, y + 1, '#3a7a2a', 1, 2); p(x, y, r.pick(cols)); p(x + 1, y, r.pick(cols)); } }, false);
        oy = 0; break;
      }
      case O.TALLGRASS: {
        c = mk(16, 14, p => { for (let i = 0; i < 9; i++) { const x = r.int(1, 14), h = r.int(4, 9); for (let y = 0; y < h; y++) p(x + (y > h - 3 ? (i % 2 ? 1 : -1) : 0), 13 - y, y > h - 3 ? '#7acb58' : '#4a9a3a'); } }, false);
        break;
      }
      case O.REEDS: {
        c = mk(14, 20, p => { for (let i = 0; i < 6; i++) { const x = 1 + i * 2 + r.int(0, 1), h = r.int(10, 17); p(x, 20 - h, '#5a7a3a', 1, h); if (r.chance(0.6)) p(x, 20 - h - 2, '#6a4020', 1, 3); } }, false);
        break;
      }
      case O.LILY: { c = mk(14, 10, p => { ellipse(p, 7, 5, 6, 3.5, '#3a8a3a'); p(7, 3, '#3a6a2a', 1, 3); if (v % 2) { p(5, 3, '#f0a0c0', 3, 2); p(6, 2, '#ffffff'); } }); break; }
      case O.HERB_RED: case O.HERB_BLUE: case O.HERB_FIRE: {
        const fc = id === O.HERB_RED ? '#e03040' : id === O.HERB_BLUE ? '#6090ff' : '#ff8020';
        c = mk(12, 12, p => { for (let i = 0; i < 4; i++) { const x = 2 + i * 2 + r.int(0, 1); p(x, 5, '#3a8a2a', 1, 7); p(x - 1, 8, '#4aa03a', 1, 2); p(x - 1, 3, fc, 3, 2); p(x, 2, shade(fc, 0.4)); } });
        break;
      }
      case O.HERB_SHROOM: {
        c = mk(14, 10, p => { for (let i = 0; i < 3; i++) { const x = 2 + i * 4, h = r.int(3, 5); p(x + 1, 9 - h, '#e0d8c8', 1, h); ellipse(p, x + 1.5, 9 - h, 2.5, 1.5, '#a060e0'); p(x, 8 - h, '#e0b0ff'); } });
        break;
      }
      case O.HERB_ICE: { c = mk(12, 10, p => { for (let i = 0; i < 5; i++) { let x = 6, y = 9; for (let k = 0; k < 5; k++) { p(x, y, k > 2 ? '#e0f8ff' : '#a0e0ff'); x += r.int(-1, 1); y--; } } }); break; }
      case O.CHEST: case O.CHEST_OPEN: case O.CHEST_BOSS: {
        const boss = id === O.CHEST_BOSS, open = id === O.CHEST_OPEN;
        const wood = boss ? '#6a2a5a' : '#8a5a2a', trim = boss ? '#ffd040' : '#d0a040';
        c = mk(14, 12, p => {
          if (open) { p(1, 0, shade(wood, -0.2), 12, 4); p(1, 0, trim, 12, 1); p(2, 5, '#2a1a10', 10, 2); }
          p(1, 5, wood, 12, 7); p(1, open ? 5 : 2, shade(wood, 0.15), 12, open ? 1 : 4); p(1, 5, trim, 12, 1); p(1, 11, shade(wood, -0.3), 12, 1);
          p(1, 2, trim, 1, 10); p(12, 2, trim, 1, 10);
          if (!open) { p(6, 4, trim, 2, 3); p(6, 5, '#2a1a10', 2, 1); }
        });
        break;
      }
      case O.CAMPFIRE: {
        c = mk(16, 16, p => {
          p(2, 12, '#6a4a2a', 12, 2); p(4, 11, '#5a3a1a', 8, 2); p(3, 13, '#4a2a10', 3, 1); p(10, 13, '#4a2a10', 3, 1);
          for (let i = 0; i < 4; i++) p(1 + i * 4, 14, '#7a7a7a', 3, 2);
          const fl = f ? [[6, 3], [9, 5], [7, 6]] : [[7, 4], [5, 6], [9, 4]];
          for (const [fx, fy] of fl) { for (let y = fy; y < 12; y++) { const w = Math.min(3, (y - fy) / 2 + 1) | 0; p(fx - w + 1, y, y < fy + 3 ? '#ffe070' : '#ff8020', w * 2 - 1, 1); } }
          p(7, 9, '#fff8c0', 2, 2);
        });
        break;
      }
      case O.SIGN: { c = mk(14, 16, p => { p(6, 6, '#6a4a2a', 2, 10); p(1, 2, '#9a6a3a', 12, 6); p(1, 2, '#b07a40', 12, 1); p(3, 4, '#5a3a1a', 8, 1); p(3, 6, '#5a3a1a', 5, 1); }); break; }
      case O.WELL: {
        c = mk(16, 24, p => {
          p(2, 14, '#7a7a80', 12, 9); bricksSmall(p, r, 2, 14, 12, 9); p(4, 15, '#1a2a4a', 8, 2);
          p(2, 3, '#6a4a2a', 1, 12); p(13, 3, '#6a4a2a', 1, 12); p(0, 1, '#8a3a2a', 16, 3); p(1, 0, '#a04a30', 14, 1); p(7, 4, '#4a3a2a', 1, 7); p(6, 10, '#7a5a3a', 3, 2);
        });
        break;
      }
      case O.FOUNTAIN: {
        c = mk(20, 20, p => {
          ellipse(p, 10, 14, 9, 5, '#8a8a90'); ellipse(p, 10, 13, 7, 3.5, '#3a78c8'); p(9, 4, '#9a9aa0', 2, 9); p(7, 3, '#aaaab0', 6, 2);
          p(9, 1, '#a0d0ff', 2, 2); if (f) { p(6, 6, '#a0d0ff'); p(13, 7, '#a0d0ff'); } else { p(7, 7, '#a0d0ff'); p(12, 6, '#a0d0ff'); }
        });
        break;
      }
      case O.LAMP: {
        const glow = v === 1 ? '#80e0ff' : '#ffd060';
        c = mk(8, 26, p => { p(3, 8, '#3a3a40', 2, 18); p(2, 24, '#2a2a30', 4, 2); p(1, 2, '#2a2a30', 6, 7); p(2, 3, glow, 4, 5); p(3, 4, '#ffffff', 2, 2); p(2, 1, '#3a3a40', 4, 1); });
        break;
      }
      case O.FENCE: { c = mk(16, 12, p => { p(0, 4, '#8a6a3a', 16, 2); p(0, 8, '#8a6a3a', 16, 2); p(2, 1, '#9a7a4a', 2, 11); p(12, 1, '#9a7a4a', 2, 11); p(2, 1, '#b08a5a', 2, 1); p(12, 1, '#b08a5a', 2, 1); }); break; }
      case O.STALL: {
        const cl = ['#c03030', '#3060c0', '#30a050', '#d0a020'][v % 4];
        c = mk(18, 24, p => {
          p(1, 8, '#6a4a2a', 1, 16); p(16, 8, '#6a4a2a', 1, 16);
          for (let x = 0; x < 18; x++) p(x, 2 + (x % 4 < 2 ? 0 : 0), (Math.floor(x / 3) % 2) ? cl : '#f0f0e0', 1, 7);
          p(0, 9, shade(cl, -0.3), 18, 1);
          p(1, 15, '#8a5a2a', 16, 5); p(1, 15, '#a06a3a', 16, 1);
          for (let i = 0; i < 4; i++) p(3 + i * 3, 13, r.pick(['#e03030', '#f0d040', '#60c040', '#f08030']), 2, 2);
        });
        break;
      }
      case O.TENT: {
        const tc = ['#a08060', '#806040', '#a06040'][v % 3];
        c = mk(26, 20, p => {
          for (let y = 0; y < 18; y++) { const hw = Math.floor(y * 0.7) + 1; p(13 - hw, y + 1, tc, hw * 2, 1); p(13 - hw, y + 1, shade(tc, 0.15), Math.max(1, hw - 2), 1); }
          for (let y = 8; y < 19; y++) { const hw = Math.floor((y - 8) * 0.35); p(13 - hw, y, '#2a1a10', hw * 2 + 1, 1); }
          p(12, 0, '#5a3a1a', 2, 3);
        });
        break;
      }
      case O.RUNESTONE: {
        c = mk(14, 24, p => {
          p(2, 4, '#6a6a74', 10, 20); p(3, 2, '#6a6a74', 8, 2); p(2, 4, '#8a8a94', 1, 20); p(11, 4, '#4a4a54', 1, 20);
          const rc = f ? '#a0f0ff' : '#60c0ff';
          for (let i = 0; i < 5; i++) { p(4 + r.int(0, 4), 6 + i * 3, rc, 2, 1); p(5 + r.int(0, 3), 7 + i * 3, rc, 1, 1); }
        });
        break;
      }
      case O.SHRINE: {
        c = mk(16, 24, p => {
          p(1, 18, '#8a8a90', 14, 6); p(1, 18, '#aaaab0', 14, 1); p(5, 6, '#c0c0c8', 6, 12); p(6, 2, '#d0d0d8', 4, 4); p(4, 9, '#c0c0c8', 8, 2);
          p(7, 0, f ? '#fff0a0' : '#ffd060', 2, 2);
        });
        break;
      }
      case O.BONES: { c = mk(14, 8, p => { p(1, 5, '#e8e0c8', 8, 1); p(0, 4, '#e8e0c8', 2, 3); p(8, 4, '#e8e0c8', 2, 3); p(6, 2, '#e8e0c8', 1, 5); ellipse(p, 11, 4, 2.5, 2, '#e8e0c8'); p(10, 4, '#2a2020'); }); break; }
      case O.SKULLS: { c = mk(16, 12, p => { for (let i = 0; i < 4; i++) { const x = 2 + (i % 3) * 4 + (i > 2 ? 2 : 0), y = i > 2 ? 2 : 6; ellipse(p, x + 2, y + 2, 2.5, 2.5, '#e8e0c8'); p(x + 1, y + 2, '#2a2020'); p(x + 3, y + 2, '#2a2020'); } }); break; }
      case O.TORCH: {
        c = mk(10, 22, p => {
          p(4, 10, '#5a3a20', 2, 12); p(2, 8, '#6a6a70', 6, 3);
          const fy = f ? 1 : 2; p(3, fy + 2, '#ff8020', 4, 5); p(4, fy, '#ffb030', 2, 4); p(4, fy + 3, '#fff0a0', 2, 2);
        });
        break;
      }
      case O.STAIRS_UP: {
        c = mk(16, 16, p => { for (let i = 0; i < 5; i++) { p(1 + i, 13 - i * 3, shade('#a0a0a8', -i * 0.05), 14 - i * 2, 3); p(1 + i, 13 - i * 3, '#c8c8d0', 14 - i * 2, 1); } p(4, 0, '#fff8d0', 8, 2); });
        break;
      }
      case O.BARREL: { c = mk(12, 14, p => { p(1, 1, '#8a5a2a', 10, 13); p(1, 1, '#a06a3a', 2, 13); p(9, 1, '#6a4020', 2, 13); p(1, 3, '#4a4a50', 10, 1); p(1, 10, '#4a4a50', 10, 1); p(3, 0, '#7a4a20', 6, 1); }); break; }
      case O.CRATE: { c = mk(14, 13, p => { p(1, 1, '#a07040', 12, 12); p(1, 1, '#c08a50', 12, 1); for (let i = 0; i < 10; i++) p(2 + i, 2 + i, '#7a5028'); p(1, 1, '#7a5028', 1, 12); p(12, 1, '#7a5028', 1, 12); p(1, 12, '#7a5028', 12, 1); }); break; }
      case O.FORGE: {
        c = mk(18, 22, p => {
          p(1, 6, '#6a6a70', 16, 16); bricksSmall(p, r, 1, 6, 16, 16); p(4, 12, '#2a1a10', 10, 7);
          p(5, 14, f ? '#ffb030' : '#ff8020', 8, 5); p(7, 15, '#fff0a0', 4, 2); p(6, 0, '#5a5a60', 6, 6);
        });
        break;
      }
      case O.ALCHEMY: {
        c = mk(16, 16, p => {
          p(0, 7, '#8a5a2a', 16, 3); p(0, 7, '#a06a3a', 16, 1); p(1, 10, '#6a4020', 2, 6); p(13, 10, '#6a4020', 2, 6);
          p(2, 3, '#e03030', 3, 4); p(3, 2, '#c0c0d0'); p(7, 2, '#3070f0', 2, 5); p(7, 1, '#c0c0d0', 2, 1); p(11, 4, '#30c040', 3, 3); p(12, 3, '#c0c0d0');
        });
        break;
      }
      case O.CRYSTAL: {
        const cc = ['#a060ff', '#60c0ff', '#ff60a0', '#60ffc0'][v % 4];
        c = mk(14, 18, p => {
          const sh = (x, h, w) => { for (let y = 0; y < h; y++) { const ww = y < 3 ? Math.ceil((y + 1) * w / 3) : w; p(x - (ww >> 1), 17 - h + y, y < 3 ? shade(cc, 0.4) : cc, ww, 1); } p(x - (w >> 1), 17 - h + 3, shade(cc, 0.6), 1, h - 4); };
          sh(7, 15, 4); sh(3, 9, 3); sh(11, 11, 3);
        });
        break;
      }
      case O.PILLAR: case O.BROKEN_PILLAR: {
        const h = id === O.PILLAR ? 28 : 14 + v * 2;
        c = mk(12, h, p => { p(2, 2, '#a8a4a0', 8, h - 4); p(2, 2, '#c8c4c0', 2, h - 4); p(8, 2, '#7a7670', 2, h - 4); p(1, h - 3, '#9a9690', 10, 3); if (id === O.PILLAR) p(1, 0, '#9a9690', 10, 3); else { p(2, 1, '#a8a4a0', 3, 1); p(6, 0, '#a8a4a0', 3, 2); } });
        break;
      }
      case O.GRAVE: { c = mk(12, 14, p => { p(2, 2, '#8a8a90', 8, 12); p(3, 0, '#8a8a90', 6, 2); p(2, 2, '#a0a0a8', 1, 12); p(5, 3, '#5a5a60', 2, 6); p(4, 5, '#5a5a60', 4, 1); p(0, 12, '#5a4a3a', 12, 2); }); break; }
      case O.HAY: { c = mk(14, 11, p => { ellipse(p, 7, 6, 6.5, 4.5, '#d8b040'); for (let i = 0; i < 6; i++) p(r.int(2, 11), r.int(2, 9), '#b08a20', 2, 1); }); break; }
      case O.CROP: { c = mk(16, 14, p => { for (let i = 0; i < 6; i++) { const x = 1 + i * 2.6 | 0, h = r.int(8, 12); p(x, 14 - h, '#6a9a3a', 1, h); p(x, 14 - h - 2, '#e0c050', 2, 3); } }, false); break; }
      case O.STATUE: {
        c = mk(14, 30, p => {
          p(1, 24, '#8a8a90', 12, 6); p(1, 24, '#aaaab0', 12, 1);
          p(5, 4, '#b0b0b8', 4, 4); p(4, 8, '#a0a0a8', 6, 8); p(3, 9, '#a0a0a8', 1, 6); p(10, 9, '#a0a0a8', 1, 6); p(5, 16, '#909098', 2, 8); p(7, 16, '#909098', 2, 8);
          p(11, 0, '#c0c0c8', 1, 14); p(10, 2, '#c0c0c8', 3, 1);
        });
        break;
      }
      case O.BANNER: {
        const bc = ['#c03030', '#3050c0', '#d0a020', '#30a050', '#6a3aa0'][v % 5];
        c = mk(12, 28, p => { p(1, 0, '#5a4a3a', 1, 28); p(2, 2, bc, 9, 14); p(2, 16, bc, 4, 3); p(7, 16, bc, 4, 3); p(5, 6, '#f0d060', 3, 4); p(2, 2, shade(bc, 0.2), 9, 1); });
        break;
      }
      case O.COBWEB: {
        c = mk(16, 16, (p, ctx) => { ctx.globalAlpha = 0.6; for (let i = 0; i < 16; i += 2) { p(i, 0, '#e8e8f0'); p(0, i, '#e8e8f0'); } for (let i = 0; i < 12; i++) p(i, i, '#e8e8f0'); for (let i = 0; i < 8; i++) { p(i, 8 - i, '#d8d8e0'); p(i + 4, 12 - i, '#d8d8e0'); } }, false);
        oy = -12; break;
      }
      case O.BED: { c = mk(16, 14, p => { p(1, 2, '#7a4a2a', 14, 12); p(2, 3, '#e8e0d0', 12, 3); p(2, 6, '#a03030', 12, 7); p(2, 6, '#c04040', 12, 1); }); break; }
      case O.TABLE: { c = mk(16, 12, p => { p(0, 2, '#9a6a3a', 16, 5); p(0, 2, '#b07a48', 16, 1); p(1, 7, '#6a4020', 2, 5); p(13, 7, '#6a4020', 2, 5); p(4, 0, '#e0e0e8', 3, 2); p(10, 0, '#c08040', 3, 2); }); break; }
      case O.HUT_TOTEM: {
        c = mk(12, 26, p => { p(5, 6, '#6a4a2a', 3, 20); ellipse(p, 6.5, 5, 4, 4, '#e8e0c8'); p(4, 4, '#2a1010', 2, 2); p(7, 4, '#2a1010', 2, 2); p(2, 0, '#e8e0c8', 2, 4); p(9, 0, '#e8e0c8', 2, 4); p(3, 12, '#c03030', 7, 2); });
        break;
      }
      case O.ALTAR: {
        c = mk(18, 16, p => { p(1, 6, '#3a3040', 16, 10); p(1, 6, '#5a5060', 16, 1); p(3, 9, '#8020a0', 12, 2); p(2, 2, '#e8e0c0', 1, 4); p(15, 2, '#e8e0c0', 1, 4); p(2, 0, f ? '#ffd060' : '#ff9030', 1, 2); p(15, 0, f ? '#ff9030' : '#ffd060', 1, 2); });
        break;
      }
      case O.PORTAL: {
        c = mk(18, 26, (p) => {
          ellipse(p, 9, 13, 8, 12, '#4a3a6a'); ellipse(p, 9, 13, 6, 10, f ? '#a060ff' : '#8040e0'); ellipse(p, 9, 13, 3, 6, f ? '#e0c0ff' : '#c090ff');
        });
        break;
      }
      case O.ENT_CAVE: case O.ENT_LAVA: case O.ENT_ICE: case O.ENT_MINE: {
        const rc = id === O.ENT_ICE ? '#8ab0d0' : id === O.ENT_LAVA ? '#4a3434' : '#7a726a';
        const inside = id === O.ENT_LAVA ? '#601808' : id === O.ENT_ICE ? '#1a2a40' : '#140c08';
        c = mk(34, 28, p => {
          blob(p, r, 17, 16, 13, rc); blob(p, r, 8, 20, 7, rc); blob(p, r, 26, 20, 7, rc);
          for (let y = 12; y < 28; y++) { const hw = Math.min(7, Math.floor((y - 12) * 0.9) + 2); p(17 - hw, y, inside, hw * 2, 1); }
          if (id === O.ENT_LAVA) { p(13, 24, '#ff5010', 8, 4); p(15, 22, '#ff9030', 4, 2); }
          if (id === O.ENT_MINE) { p(9, 12, '#7a5028', 3, 16); p(22, 12, '#7a5028', 3, 16); p(8, 10, '#8a6030', 18, 3); p(12, 26, '#5a5a5a', 10, 1); }
        });
        oy = 4; break;
      }
      case O.ENT_CRYPT: {
        c = mk(26, 30, p => {
          p(2, 8, '#7a7a84', 22, 22); p(2, 8, '#9a9aa4', 22, 1); for (let y = 0; y < 8; y++) p(12 - y * 1.4, y, '#6a6a74', 2 + y * 2.8, 1);
          p(4, 12, '#9a9aa4', 3, 18); p(19, 12, '#9a9aa4', 3, 18); p(9, 16, '#140c10', 8, 14); p(12, 3, '#d0d0d8', 2, 4); p(11, 4, '#d0d0d8', 4, 1);
        });
        oy = 4; break;
      }
      case O.ENT_RUIN: {
        c = mk(30, 26, p => {
          p(3, 4, '#8a9a8a', 5, 22); p(22, 6, '#8a9a8a', 5, 20); p(3, 2, '#a0b0a0', 12, 4); p(18, 5, '#a0b0a0', 9, 3);
          for (let i = 0; i < 4; i++) p(9 + i, 14 + i * 3, shade('#5a6a5a', -i * 0.1), 12 - i * 2, 3);
          p(9, 24, '#101810', 12, 2); speck(p, r, ['#4a8a3a'], 10);
        });
        oy = 4; break;
      }
      case O.ENT_TOMB: {
        c = mk(34, 26, p => {
          for (let y = 0; y < 22; y++) { const hw = Math.floor(y * 0.75) + 1; p(17 - hw, y + 4, y % 4 === 0 ? '#b08a50' : '#c9a46a', hw * 2, 1); }
          p(13, 14, '#2a1a0a', 8, 12); p(12, 13, '#e0c060', 10, 1); p(16, 6, '#e0c060', 2, 4);
        });
        oy = 4; break;
      }
      case O.ENT_BARROW: {
        c = mk(32, 24, p => {
          blob(p, r, 16, 16, 12, '#7a8a6a'); speck(p, r, ['#e8eef4'], 20);
          p(10, 10, '#5a5a60', 12, 14); p(11, 11, '#6a6a70', 10, 13); p(13, 13, '#141018', 6, 11); p(9, 9, '#4a4a50', 14, 2);
        });
        oy = 4; break;
      }
      case O.ENT_ARENA: {
        c = mk(36, 30, p => {
          p(1, 6, '#8a7a6a', 34, 24); for (let x = 1; x < 35; x += 4) p(x, 3, '#8a7a6a', 2, 3);
          p(1, 6, '#a09080', 34, 1); for (let x = 4; x < 32; x += 6) p(x, 10, '#3a2a20', 3, 5);
          p(12, 14, '#1a1010', 12, 16); for (let x = 13; x < 24; x += 2) p(x, 14, '#5a5a5a', 1, 16); p(6, 1, '#c03030', 4, 6); p(26, 1, '#c03030', 4, 6);
        });
        oy = 4; break;
      }
      case O.COUNTER: { c = mk(16, 16, p => { p(0, 3, '#9a6a3a', 16, 4); p(0, 3, '#c08a50', 16, 1); p(0, 7, '#6a4422', 16, 9); for (let x = 2; x < 16; x += 5) p(x, 8, '#58381c', 1, 7); p(0, 15, '#3a2410', 16, 1); if (v % 2) { p(3, 0, '#e0c060', 3, 3); p(10, 1, '#c03030', 2, 2); } }); break; }
      case O.SHELF: case O.POTSHELF: {
        const pot = id === O.POTSHELF;
        c = mk(16, 26, p => {
          p(1, 2, '#6a4422', 14, 24); p(2, 3, '#4a2e16', 12, 22); for (let y = 9; y < 26; y += 7) p(1, y, '#8a5a30', 14, 2);
          for (let row = 0; row < 3; row++) for (let i = 0; i < 4; i++) {
            const x = 3 + i * 3, y = 4 + row * 7;
            if (pot) { const col = r.pick(['#e03030', '#3070f0', '#30c040', '#f0c040', '#a040e0']); p(x, y + 1, col, 2, 4); p(x, y, '#c0c0d0', 2, 1); }
            else { const col = r.pick(['#a07040', '#d0b080', '#6a8a3a', '#a03030', '#8a8a90']); p(x, y + 2, col, 2, 3); }
          }
        });
        oy = 2; break;
      }
      case O.BOOKSHELF: {
        c = mk(16, 26, p => {
          p(1, 2, '#5a3a1e', 14, 24); p(2, 3, '#3a2410', 12, 22);
          for (let y = 9; y < 26; y += 7) p(1, y, '#7a5028', 14, 2);
          for (let row = 0; row < 3; row++) { let x = 3; while (x < 13) { const w = r.int(1, 2); p(x, 4 + row * 7 + r.int(0, 1), r.pick(['#8a2030', '#20408a', '#2a6a30', '#8a6a20', '#5a2a6a', '#c0a060']), w, 5); x += w; } }
        });
        oy = 2; break;
      }
      case O.CHAIR: { c = mk(10, 14, p => { p(2, 0, '#7a4a24', 2, 9); p(2, 0, '#9a6a3a', 6, 2); p(2, 7, '#9a6a3a', 6, 2); p(2, 9, '#5a3418', 1, 5); p(7, 9, '#5a3418', 1, 5); }); break; }
      case O.BENCH: { c = mk(16, 10, p => { p(0, 2, '#9a6a3a', 16, 3); p(0, 2, '#b88050', 16, 1); p(1, 5, '#5a3418', 2, 5); p(13, 5, '#5a3418', 2, 5); }); break; }
      case O.FIREPLACE: {
        c = mk(20, 28, p => {
          p(0, 6, '#7a7378', 20, 22); bricksSmall(p, r, 0, 6, 20, 22); p(0, 4, '#8a5a30', 20, 3); p(0, 4, '#a87a48', 20, 1);
          p(4, 14, '#1a1010', 12, 14); p(5, 24, '#5a3a1e', 10, 2);
          const fy = f ? 16 : 17; p(6, fy + 2, '#ff8020', 8, 6); p(8, fy, '#ffb030', 4, 6); p(9, fy + 3, '#fff0a0', 2, 3);
        });
        oy = 2; break;
      }
      case O.THRONE: { c = mk(18, 28, p => { p(3, 0, '#d0a030', 12, 4); p(5, 0, '#e02848', 2, 2); p(11, 0, '#3050e0', 2, 2); p(3, 4, '#a02030', 12, 14); p(4, 5, '#c03040', 10, 12); p(0, 14, '#d0a030', 4, 10); p(14, 14, '#d0a030', 4, 10); p(3, 18, '#d0a030', 12, 4); p(3, 22, '#8a6020', 12, 6); }); oy = 2; break; }
      case O.PLANT: { c = mk(12, 18, p => { p(3, 12, '#a05a30', 6, 6); p(2, 11, '#c07040', 8, 2); blob(p, r, 6, 7, 5, '#3a8a3a'); }); break; }
      case O.WARDROBE: { c = mk(16, 26, p => { p(1, 2, '#7a4a24', 14, 24); p(1, 2, '#9a6a3a', 14, 2); p(2, 5, '#6a3e1c', 6, 19); p(8, 5, '#6a3e1c', 6, 19); p(7, 12, '#e0c060', 1, 3); p(8, 12, '#e0c060', 1, 3); }); oy = 2; break; }
      case O.CRIB: { c = mk(16, 14, p => { p(1, 3, '#b08050', 14, 10); p(2, 5, '#f0e8f0', 12, 6); p(3, 6, '#f0a0c0', 6, 4); for (let x = 1; x < 16; x += 3) p(x, 1, '#c09060', 1, 12); p(1, 1, '#c09060', 15, 1); }); break; }
      case O.BEDSMALL: { c = mk(16, 16, p => { p(1, 1, '#7a4a24', 14, 15); p(2, 2, '#f0ece0', 12, 4); p(2, 6, v % 2 ? '#3a6aa0' : '#a03a5a', 12, 9); p(2, 6, shade(v % 2 ? '#3a6aa0' : '#a03a5a', 0.2), 12, 1); }); break; }
      case O.WEAPONRACK: { c = mk(16, 24, p => { p(1, 4, '#6a4422', 14, 2); p(1, 18, '#6a4422', 14, 2); p(1, 4, '#6a4422', 2, 20); p(13, 4, '#6a4422', 2, 20); for (let i = 0; i < 3; i++) { const x = 4 + i * 3; p(x, 0, '#c0c8d0', 1, 16); p(x - 1, 14, '#d0a030', 3, 1); p(x, 15, '#5a3418', 1, 5); } }); oy = 2; break; }
      case O.DOOR_IN: { c = mk(16, 18, p => { p(2, 0, '#3a2410', 12, 18); p(3, 1, '#8a5a2e', 10, 17); for (let x = 5; x < 13; x += 3) p(x, 1, '#6a4020', 1, 17); p(11, 9, '#e0c060', 1, 2); p(0, 16, '#5a3a1e', 16, 2); }, true); oy = 2; break; }
      case O.CANDLE: { c = mk(10, 18, p => { p(4, 6, '#c0a040', 2, 10); p(2, 15, '#c0a040', 6, 2); p(1, 6, '#c0a040', 8, 1); p(1, 3, '#f0e8d0', 1, 3); p(4, 3, '#f0e8d0', 2, 3); p(8, 3, '#f0e8d0', 1, 3); const fy = f ? 0 : 1; p(1, fy, '#ffc040', 1, 2); p(4, fy, '#ffe070', 2, 2); p(8, fy, '#ffc040', 1, 2); }); break; }
      case O.KEG: { c = mk(16, 18, p => { for (const [x, y] of [[0, 8], [8, 8], [4, 0]]) { p(x + 1, y + 1, '#8a5a2a', 7, 9); p(x + 1, y + 3, '#4a4a50', 7, 1); p(x + 1, y + 7, '#4a4a50', 7, 1); S.ellipse(p, x + 4.5, y + 5, 2, 2, '#a07040'); p(x + 4, y + 5, '#2a1a10'); } }); break; }
      case O.CAULDRON: { c = mk(16, 16, p => { S.ellipse(p, 8, 10, 7, 5, '#2a2a30'); S.ellipse(p, 8, 7, 6, 2, f ? '#60e060' : '#40c040'); p(4, 14, '#2a2a30', 2, 2); p(10, 14, '#2a2a30', 2, 2); p(6, 2 + (f ? 0 : 1), '#a0ffa0', 2, 2); }); break; }
      case O.DESTINY: case O.DESTINY2: case O.DESTINY3: {
        v = id === O.DESTINY ? 0 : id === O.DESTINY2 ? 1 : 2;
        const dc = ['#e05040', '#5080ff', '#50d070'][v % 3];
        c = mk(16, 30, p => {
          p(3, 4, '#7a7680', 10, 26); p(4, 2, '#7a7680', 8, 2); p(5, 0, '#7a7680', 6, 2); p(3, 4, '#9a96a0', 2, 26); p(11, 4, '#5a5660', 2, 26);
          const g = f ? shade(dc, 0.3) : dc;
          if (v % 3 === 0) { p(7, 8, g, 2, 12); p(5, 10, g, 6, 2); }
          else if (v % 3 === 1) { p(6, 8, g, 4, 4); p(7, 12, g, 2, 8); p(5, 18, g, 6, 2); }
          else { p(5, 9, g, 6, 2); p(6, 12, g, 4, 2); p(5, 15, g, 6, 2); p(7, 18, g, 2, 4); }
        });
        oy = 2; break;
      }
      case O.ANVIL: { c = mk(16, 12, p => { p(1, 1, '#5a5a62', 14, 3); p(0, 1, '#4a4a52', 3, 2); p(5, 4, '#4a4a52', 6, 4); p(3, 8, '#3a3a42', 10, 4); p(1, 1, '#8a8a94', 14, 1); }); break; }
      case O.WINDOW: { c = mk(16, 14, p => { p(3, 1, '#5a3a1e', 10, 11); p(4, 2, '#a0d0f0', 8, 9); p(7, 2, '#5a3a1e', 2, 9); p(4, 6, '#5a3a1e', 8, 1); p(4, 2, '#e0f0ff', 2, 2); p(2, 11, '#8a6a40', 12, 2); }, true); oy = -1; break; }
      case O.PAINTING: { const pc = ['#3a6aa0', '#a04030', '#3a8a40', '#a08030'][v % 4]; c = mk(16, 12, p => { p(2, 1, '#c09030', 12, 10); p(3, 2, pc, 10, 8); p(3, 6, shade(pc, -0.3), 10, 4); S.ellipse(p, 10, 4, 1.5, 1.5, '#f0e070'); p(4, 7, '#2a5a20', 4, 3); }, true); oy = -2; break; }
      case O.QUESTBOARD: { c = mk(18, 22, p => { p(2, 10, '#5a3418', 2, 12); p(14, 10, '#5a3418', 2, 12); p(0, 0, '#8a5a2e', 18, 14); p(1, 1, '#a87a48', 16, 12); for (let i = 0; i < 5; i++) { const x = 2 + (i % 3) * 5, y = 2 + Math.floor(i / 3) * 5; p(x, y, '#f0e8d0', 4, 4); p(x + 1, y + 1, '#6a5040', 2, 1); p(x + 1, y, '#c03030'); } }); oy = 2; break; }
      case O.STUMP: { c = mk(14, 10, p => { S.ellipse(p, 7, 6, 5.5, 3.5, '#6a4422'); S.ellipse(p, 7, 5, 4.5, 2.5, '#c8a070'); p(6, 4, '#8a6040', 3, 1); }); break; }
      case O.WORKBENCH: { c = mk(18, 16, p => { p(0, 4, '#a87440', 18, 4); p(0, 4, '#c8945a', 18, 1); p(1, 8, '#6a4020', 2, 8); p(15, 8, '#6a4020', 2, 8); p(3, 1, '#9a9a9a', 5, 3); p(11, 2, '#7a5028', 6, 2); p(5, 10, '#8a5a2e', 8, 2); }); break; }
      default: c = mk(8, 8, p => p(0, 0, '#ff00ff', 8, 8));
    }
    return { c, oy, w: c.width, h: c.height };
  }
  function bricksSmall(p, r, x0, y0, w, h) {
    for (let y = 0; y < h; y += 3) { const off = (y / 3) % 2 * 2; for (let x = -off; x < w; x += 4) { if (x < 0) continue; p(x0 + x, y0 + y, '#5a5a60', 1, 3); } p(x0, y0 + y, '#5a5a60', w, 1); }
  }

  // ---------- ÍCONES DE ITENS ----------
  const iconCache = new Map();
  S.icon = function (icon) {
    const k = JSON.stringify(icon);
    let c = iconCache.get(k);
    if (!c) { c = makeIcon(icon); iconCache.set(k, c); }
    return c;
  };
  const urlCache = new Map();
  S.iconURL = function (icon) {
    const k = JSON.stringify(icon);
    let u = urlCache.get(k);
    if (!u) { u = S.icon(icon).toDataURL(); urlCache.set(k, u); }
    return u;
  };
  function makeIcon(ic) {
    const c = cv(16, 16), ctx = c.getContext('2d'), p = P(ctx);
    const col = ic.c || '#a0a0a0', hi = shade(col, 0.35), sh = shade(col, -0.3);
    const r = new RNG(hashStr(JSON.stringify(ic)));
    const wood = '#7a5028', gold = '#e0b040';
    const diag = (x0, y0, n, cc, w = 1) => { for (let i = 0; i < n; i++) p(x0 + i, y0 - i, cc, w, w); };
    switch (ic.k) {
      case 'sword': diag(5, 10, 9, col, 2); diag(6, 10, 8, hi); p(2, 11, gold, 5, 2); p(4, 9, gold, 2, 5); diag(1, 15, 3, wood, 2); break;
      case 'dagger': diag(6, 9, 6, col, 2); diag(7, 9, 5, hi); p(4, 10, gold, 4, 2); p(5, 9, gold, 2, 4); diag(3, 13, 3, wood, 2); break;
      case 'great': diag(4, 11, 11, col, 3); diag(5, 11, 10, hi); p(1, 11, gold, 6, 2); p(3, 9, gold, 2, 6); diag(0, 15, 2, wood, 2); break;
      case 'axe': diag(2, 14, 12, wood, 2); p(9, 1, col, 5, 7); p(8, 2, col, 1, 5); p(14, 2, hi, 1, 5); p(9, 1, hi, 5, 1); break;
      case 'mace': diag(2, 14, 9, wood, 2); ellipse(p, 11.5, 4.5, 3.5, 3.5, col); p(10, 3, hi, 2, 2); p(11, 0, col, 1, 1); p(15, 4, col, 1, 1); p(7, 4, col, 1, 1); p(11, 8, col, 1, 1); break;
      case 'hammer': diag(2, 14, 10, wood, 2); p(8, 1, col, 7, 6); p(8, 1, hi, 7, 1); p(14, 1, sh, 1, 6); break;
      case 'bow': for (let y = 1; y < 15; y++) { const x = 4 + Math.round(Math.sin(y / 14 * Math.PI) * 6); p(x, y, col, 2, 1); } p(4, 1, '#e8e8e0', 1, 14); p(3, 7, '#c0c0c0', 9, 1); p(11, 6, '#e0e0e0', 2, 3); break;
      case 'staff': diag(1, 15, 12, ic.c || wood, 2); ellipse(p, 13, 3, 2.6, 2.6, ic.g || '#60a0ff'); p(12, 2, '#ffffff'); break;
      case 'body': p(3, 3, col, 10, 11); p(1, 3, col, 2, 6); p(13, 3, col, 2, 6); p(6, 3, sh, 4, 2); p(3, 3, hi, 1, 11); p(3, 13, sh, 10, 1); p(7, 6, hi, 2, 6); break;
      case 'robe': p(4, 2, col, 8, 13); p(2, 3, col, 2, 7); p(12, 3, col, 2, 7); p(3, 12, col, 10, 3); p(7, 2, gold, 2, 13); p(6, 2, sh, 4, 1); break;
      case 'head': ellipse(p, 8, 8, 6, 6, col); p(2, 9, sh, 12, 5); p(4, 9, '#1a1a20', 8, 2); p(7, 9, col, 2, 5); p(5, 3, hi, 3, 2); break;
      case 'feet': p(2, 4, col, 4, 9); p(2, 11, col, 7, 3); p(9, 4, col, 4, 9); p(9, 11, col, 6, 3); p(2, 4, hi, 4, 1); p(9, 4, hi, 4, 1); break;
      case 'shield': for (let y = 1; y < 15; y++) { const hw = y < 9 ? 6 : Math.max(1, 6 - (y - 8)); p(8 - hw, y, col, hw * 2, 1); } p(7, 2, gold, 2, 11); p(3, 6, gold, 10, 2); p(2, 1, hi, 12, 1); break;
      case 'ring': ellipse(p, 8, 10, 5, 4.5, col); ellipse(p, 8, 10, 3, 2.5, 'rgba(0,0,0,0)'); ctx.clearRect(6, 9, 4, 3); p(6, 2, ic.g || '#ff4040', 4, 4); p(7, 2, '#ffffff'); break;
      case 'amulet': for (let i = 0; i < 6; i++) { p(3 + i, 1 + i, col); p(12 - i, 1 + i, col); } ellipse(p, 8, 11, 4, 4, col); ellipse(p, 8, 11, 2.5, 2.5, ic.g || '#40ff80'); p(7, 10, '#ffffff'); break;
      case 'potion': p(6, 1, '#a07040', 4, 2); p(6, 3, '#d0e0f0', 4, 3); ellipse(p, 8, 10.5, 5.5, 5, '#d0e0f0'); ellipse(p, 8, 11, 4.5, 4, col); p(5, 9, shade(col, 0.5), 2, 2); break;
      case 'apple': ellipse(p, 8, 9, 6, 6, col); p(5, 6, hi, 2, 2); p(8, 1, '#5a3a1a', 1, 3); p(9, 2, '#40a030', 3, 2); break;
      case 'bread': ellipse(p, 8, 9, 7, 4.5, col); p(4, 7, hi, 8, 1); p(5, 8, sh, 1, 2); p(8, 8, sh, 1, 2); p(11, 8, sh, 1, 2); break;
      case 'cheese': for (let y = 4; y < 14; y++) p(2 + Math.max(0, 9 - y), y, col, 12 - Math.max(0, 9 - y), 1); p(6, 9, sh, 2, 2); p(10, 11, sh, 2, 1); break;
      case 'potato': ellipse(p, 8, 9, 6, 4.5, col); p(5, 8, sh); p(9, 10, sh); p(11, 7, sh); break;
      case 'meat': ellipse(p, 9, 7, 5.5, 5, col); p(2, 11, '#e8e0c8', 5, 2); p(1, 10, '#e8e0c8', 2, 4); p(7, 5, hi, 3, 2); break;
      case 'stew': ellipse(p, 8, 10, 7, 4.5, '#7a5a3a'); ellipse(p, 8, 9, 5.5, 2.5, col); p(5, 8, '#e0a040', 2, 1); p(9, 9, '#60a040', 2, 1); p(6, 2, '#e0e0e0', 1, 3); p(9, 1, '#e0e0e0', 1, 3); break;
      case 'pie': ellipse(p, 8, 10, 7, 4, '#c08040'); ellipse(p, 8, 9, 6, 3, col); for (let x = 3; x < 13; x += 3) p(x, 9, sh, 2, 1); break;
      case 'bottle': p(6, 1, '#6a4020', 4, 2); p(6, 3, col, 4, 3); p(4, 6, col, 8, 9); p(5, 7, hi, 1, 6); p(5, 9, '#f0e0c0', 6, 3); break;
      case 'ore': blob(p, r, 8, 9, 6, '#6a6560'); for (let i = 0; i < 6; i++) p(r.int(4, 11), r.int(5, 12), col, 2, 2); break;
      case 'ingot': for (let y = 0; y < 6; y++) p(2 + Math.max(0, 2 - y), 6 + y, y < 2 ? hi : col, 12 - Math.max(0, 2 - y) * 2, 1); p(2, 11, sh, 12, 2); break;
      case 'leather': p(2, 3, col, 12, 10); p(1, 5, col, 1, 6); p(14, 4, col, 1, 7); p(3, 4, hi, 10, 1); p(5, 7, sh, 6, 1); break;
      case 'pelt': p(3, 3, col, 10, 10); p(1, 2, col, 3, 3); p(12, 2, col, 3, 3); p(1, 11, col, 3, 3); p(12, 11, col, 3, 3); p(7, 13, col, 2, 3); p(4, 4, hi, 8, 2); break;
      case 'fang': for (let y = 2; y < 15; y++) p(8 - Math.max(0, (14 - y) / 4) | 0, y, col, Math.max(1, (15 - y) / 3 | 0) + 1, 1); break;
      case 'horn': for (let i = 0; i < 12; i++) p(3 + i * 0.8, 14 - i, col, 2, 2); p(8, 6, col, 4, 1); p(11, 5, col, 1, 2); break;
      case 'bone': p(3, 7, col, 10, 2); ellipse(p, 3, 6.5, 2, 2, col); ellipse(p, 3, 9.5, 2, 2, col); ellipse(p, 13, 6.5, 2, 2, col); ellipse(p, 13, 9.5, 2, 2, col); break;
      case 'silk': for (let i = 0; i < 4; i++) ellipse(p, 8, 8, 6 - i * 1.4, 6 - i * 1.4, i % 2 ? sh : col); break;
      case 'gland': ellipse(p, 8, 9, 5, 5, col); p(6, 7, hi, 2, 2); p(8, 3, sh, 1, 2); break;
      case 'goo': ellipse(p, 8, 10, 6, 4, col); ellipse(p, 8, 7, 3.5, 3, col); p(6, 6, hi, 2, 2); break;
      case 'wing': for (let i = 0; i < 6; i++) p(2 + i * 2, 4 + Math.abs(3 - i), col, 2, 8 - Math.abs(3 - i)); p(2, 4, sh, 12, 1); break;
      case 'essence': ellipse(p, 8, 8, 5, 5, col); ellipse(p, 8, 8, 3, 3, hi); p(7, 7, '#ffffff', 2, 2); for (let i = 0; i < 4; i++) p(r.int(1, 14), r.int(1, 14), hi); break;
      case 'shell': ellipse(p, 8, 9, 6, 5, col); for (let x = 3; x < 14; x += 3) p(x, 5, sh, 1, 8); p(4, 5, hi, 8, 1); break;
      case 'scale': for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) { ellipse(p, 3 + x * 5, 4 + y * 4, 2.6, 2.4, col); p(2 + x * 5, 3 + y * 4, hi); } break;
      case 'herb': p(7, 6, '#3a8a2a', 2, 9); p(4, 9, '#4aa03a', 3, 2); p(9, 8, '#4aa03a', 3, 2); ellipse(p, 8, 4, 3.5, 3, col); p(7, 3, hi, 2, 1); break;
      case 'shroom': p(7, 8, '#e0d8c8', 3, 7); ellipse(p, 8.5, 6, 6, 3.5, col); p(5, 5, '#f8f0e0', 2, 1); p(10, 4, '#f8f0e0', 2, 1); break;
      case 'root': for (let i = 0; i < 4; i++) { let x = 8, y = 2; for (let k = 0; k < 12; k++) { p(x, y, k > 8 ? hi : col); x += r.int(-1, 1); y++; } } break;
      case 'gem': for (let y = 0; y < 10; y++) { const hw = y < 3 ? 3 + y : 6 - (y - 3) * 0.85; p(8 - hw, 3 + y, y < 3 ? hi : col, hw * 2, 1); } p(6, 4, '#ffffff', 2, 1); break;
      case 'soul': ellipse(p, 8, 9, 5, 5, col); ellipse(p, 8, 9, 3, 3, '#fff0c0'); p(7, 1, col, 2, 4); p(4, 3, col, 1, 3); p(11, 3, col, 1, 3); break;
      case 'arrow': diag(2, 14, 11, '#8a6a3a'); p(11, 2, col, 3, 3); p(12, 1, col); p(14, 3, col); p(1, 12, '#e0e0e0', 2, 3); p(3, 14, '#e0e0e0', 2, 1); break;
      case 'torch': diag(4, 15, 8, wood, 2); p(10, 3, '#ff8020', 4, 4); p(11, 1, '#ffd060', 2, 3); break;
      case 'scroll': p(3, 3, col, 10, 10); p(2, 2, shade(col, -0.2), 12, 2); p(2, 12, shade(col, -0.2), 12, 2); for (let y = 5; y < 11; y += 2) p(5, y, '#6a5040', 6, 1); break;
      case 'totem': p(5, 2, col, 6, 13); p(4, 4, '#e8e0c8', 8, 3); p(5, 5, '#2a1010', 2, 1); p(9, 5, '#2a1010', 2, 1); p(6, 9, gold, 4, 2); break;
      case 'crate': p(2, 3, col, 12, 11); p(2, 3, hi, 12, 1); p(7, 3, sh, 2, 11); p(2, 8, sh, 12, 1); break;
      case 'gold': for (let i = 0; i < 5; i++) { ellipse(p, 5 + (i % 3) * 3, 11 - Math.floor(i / 3) * 3, 3, 2, gold); p(4 + (i % 3) * 3, 10 - Math.floor(i / 3) * 3, '#fff080'); } break;
      case 'tome': p(3, 2, col, 10, 12); p(3, 2, hi, 10, 1); p(3, 13, sh, 10, 1); p(12, 3, '#f0e8d0', 1, 10); p(6, 5, gold, 4, 4); p(7, 6, '#ffffff', 2, 2); break;
      case 'log': p(2, 5, col, 12, 7); p(2, 5, hi, 12, 1); ellipse(p, 13.5, 8.5, 2.2, 3.4, '#d0a060'); p(13, 8, '#8a5a2e'); p(3, 11, sh, 10, 1); break;
      case 'plank': for (let i = 0; i < 3; i++) { p(1, 3 + i * 4, col, 14, 3); p(1, 3 + i * 4, hi, 14, 1); p(4 + i * 3, 4 + i * 4, sh, 1, 1); } break;
      case 'stone': blob(p, r, 8, 9, 5.5, col); break;
      case 'block': p(2, 4, col, 12, 9); p(2, 4, hi, 12, 2); p(8, 4, sh, 1, 9); p(2, 8, sh, 12, 1); break;
      case 'nail': for (let i = 0; i < 3; i++) { p(3 + i * 4, 3, '#c0c8d0', 3, 1); p(4 + i * 4, 4, col, 1, 9); } break;
      case 'wheat': for (let i = 0; i < 4; i++) { p(5 + i * 2, 6, '#8a9a3a', 1, 9); p(4 + i * 2, 2 + (i % 2), col, 2, 4); } break;
      case 'pick': diag(3, 15, 10, '#7a5028', 2); for (let i = 0; i < 11; i++) p(3 + i, 3 + Math.abs(5 - i) * 0.6, col, 1, 2); break;
      case 'fish': ellipse(p, 7, 8, 6, 3.5, col); p(12, 5, col, 3, 7); p(13, 4, sh, 2, 2); p(13, 11, sh, 2, 2); p(3, 7, '#1a1a1a'); p(4, 6, hi, 5, 1); for (let x = 5; x < 11; x += 2) p(x, 9, sh); break;
      case 'rod': diag(1, 15, 14, ic.c || '#8a6a3a', 1); p(14, 1, '#c0c0c0', 1, 9); p(13, 10, '#e03030', 2, 2); p(2, 12, '#5a3a1e', 3, 3); break;
      case 'doll': ellipse(p, 8, 4, 3, 3, '#f0c8a0'); p(5, 1, '#a05a20', 6, 2); p(5, 7, col, 6, 6); p(3, 8, col, 2, 4); p(11, 8, col, 2, 4); p(5, 13, '#5a3a1e', 2, 3); p(9, 13, '#5a3a1e', 2, 3); p(7, 4, '#1a1a1a'); p(9, 4, '#1a1a1a'); break;
      case 'heart': for (let y = 0; y < 10; y++) { const w = y < 3 ? 0 : 0; void w; } ellipse(p, 5.5, 6, 3.5, 3.5, col); ellipse(p, 10.5, 6, 3.5, 3.5, col); for (let y = 6; y < 14; y++) p(2 + (y - 6), y, col, 12 - (y - 6) * 2, 1); p(4, 4, hi, 2, 2); break;
      case 'spell': {
        ellipse(p, 8, 8, 7, 7, shade(col, -0.5)); ellipse(p, 8, 8, 5, 5, col); ellipse(p, 8, 8, 2.5, 2.5, hi); p(7, 6, '#ffffff', 2, 2);
        break;
      }
      default: p(4, 4, col, 8, 8);
    }
    outline(c);
    return c;
  }

  S.init = function () { initTiles(); };
})(Sprites);
