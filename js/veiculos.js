'use strict';
/* =========================================================
   VEÍCULOS NOVOS (1944–1945)
   EUA: Jeep Willys, M24 Chaffee, M18 Hellcat, M36 Jackson,
        M26 Pershing, M7 Priest, M16 quádrupla .50, Sherman Calliope.
   Alemanha: Panther, Tiger II (King Tiger), Jagdpanther, Hetzer,
        Puma (Sd.Kfz. 234/2), Wirbelwind, Kübelwagen, Panzerwerfer 42.
   Frente = +Z local, chão = y 0.
   ========================================================= */
Object.assign(TANK_TEAM, {
  jeep: 'us', m24: 'us', m18: 'us', m36: 'us', m26: 'us', m7: 'us', m16: 'us', calliope: 'us',
  panther: 'de', kingtiger: 'de', jagdpanther: 'de', hetzer: 'de', puma: 'de', wirbelwind: 'de', kubel: 'de', maultier: 'de',
});
const DE_PAINT = 0x9a8a56, DE_CAMO = [0x56603a, 0x6b4a33], US_PAINT = 0x55592e;
const DARK = 0x2c2b25, METAL = 0x3d3e36;

// trem de rolamento genérico: rodas por lado, roda motriz na frente e tensora atrás
function runGear(B, s, n, r, opts) {
  const o = opts || {}, tx = s.W / 2 - s.tw / 2, L = s.L, z0 = o.z0 === undefined ? -L / 2 + r + 0.55 : o.z0, z1 = o.z1 === undefined ? L / 2 - r - 0.55 : o.z1;
  for (const sx of [-1, 1]) {
    for (let i = 0; i < n; i++) {
      const z = z0 + (z1 - z0) * (n > 1 ? i / (n - 1) : 0.5), outer = !o.interleave || i % 2 === 0;
      wheel(B, sx * (tx + (outer ? 0.16 : 0.0)), r + 0.04, z, r, o.ww || 0.24, DARK, s.paint);
      if (o.bogie && i % 2 === 0) B.add(G.box, METAL, 0.2, 0.32, (z1 - z0) / (n - 1) * 1.1, sx * (tx + 0.22), r * 1.25, z + (z1 - z0) / (n - 1) / 2);
    }
    for (let i = 0; i < (o.rollers || 0); i++) wheel(B, sx * (tx + 0.1), s.th - 0.12, z0 + 0.4 + i * (z1 - z0 - 0.8) / Math.max(1, o.rollers - 1), 0.12, 0.16, DARK, METAL);
    wheel(B, sx * (tx + 0.14), s.th - 0.36, L / 2 - 0.4, 0.36, 0.28, DARK, METAL);
    wheel(B, sx * (tx + 0.14), s.th - 0.34, -L / 2 + 0.38, 0.32, 0.26, DARK, s.paint);
    B.add(G.box, s.paint, s.tw + 0.16, 0.06, L - 0.3, sx * tx, s.th + 0.02, 0);
  }
}
function trackSpec(s) { return { L: s.L, h: s.th, rs: 0.42, ri: 0.38, w: s.tw, x: s.W / 2 - s.tw / 2 }; }
function muzzleBrake(B, z, r, col) {
  B.add(G.cyl12, col, r, 0.42, r, 0, 0, z, Math.PI / 2, 0, 0);
  B.add(G.box, col, r * 2.6, r * 1.3, 0.12, 0, 0, z - 0.12);
  B.add(G.box, col, r * 2.6, r * 1.3, 0.12, 0, 0, z + 0.12);
}
function longGun(B, len, r, col, brake) {
  B.add(G.cyl12, col, r * 1.6, 0.6, r * 1.6, 0, 0, 0.3, Math.PI / 2, 0, 0);
  B.add(G.cyl12, col, r, len, r, 0, 0, 0.55 + len / 2, Math.PI / 2, 0, 0);
  if (brake) muzzleBrake(B, 0.55 + len + 0.12, r * 1.6, 0x45452f);
}
function antenna(B, x, y, z, h) { B.add(G.cyl8, METAL, 0.05, 0.12, 0.05, x, y, z); B.add(G.cyl8, 0x2a2a2a, 0.012, h, 0.012, x, y + h / 2, z - 0.05, -0.06, 0, 0); }
function schurzen(B, s, n, y, h, missing) {
  for (const sx of [-1, 1]) {
    B.add(G.box, METAL, 0.05, 0.05, s.L - 1.0, sx * (s.W / 2 + 0.17), y + h / 2 + 0.04, -0.2);
    for (let i = 0; i < n; i++) {
      if (missing && sx === missing[0] && i === missing[1]) continue;
      B.add(G.box, s.paint, 0.05, h, (s.L - 1.2) / n * 0.98, sx * (s.W / 2 + 0.2), y, -s.L / 2 + 0.6 + (i + 0.5) * (s.L - 1.2) / n, 0, 0, sx * 0.05);
    }
  }
}
function crossDecal(g, x, y, z, s) { crossPair(g, x, y, z, s || 0.75); }
function numDecal(tur, txt, x, y, z) { const t = TEX.num(txt); for (const sx of [-1, 1]) decal(tur, t, 0.95, sx * x, y, z, 0, sx * Math.PI / 2).scale.set(0.95, 0.48, 1); }

/* ---------------- EUA ---------------- */
// Jeep Willys MB com metralhadora .30 no pedestal
VEH.jeep = () => vehicleShell('jeep', { L: 3.4, W: 1.6, paint: US_PAINT, camo: null, tur: [0, 1.75, -0.55], gy: 0.1, gz: 0.1 },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.box, 0x2f3020, 1.25, 0.22, 3.2, 0, 0.62, 0);
    B.add(G.box, P0, 1.22, 0.42, 1.05, 0, 1.0, 1.05);
    B.add(G.box, 0x23241a, 1.05, 0.34, 0.05, 0, 0.98, 1.6);
    for (let i = 0; i < 7; i++) B.add(G.box, 0x1e1e1a, 0.04, 0.28, 0.06, -0.42 + i * 0.14, 0.98, 1.63);
    for (const sx of [-1, 1]) B.add(G.sph, 0xd8d6c6, 0.09, 0.09, 0.05, sx * 0.4, 1.15, 1.62);
    B.add(G.box, P0, 1.42, 0.55, 1.95, 0, 0.98, -0.5);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.26, 0.07, 0.95, sx * 0.72, 0.92, 1.12, 0.1, 0, 0);
      B.add(G.box, P0, 0.26, 0.07, 0.75, sx * 0.72, 0.9, -1.15);
      B.add(G.box, 0x3d3b2c, 0.48, 0.42, 0.5, sx * 0.34, 1.32, 0.0);
      B.add(G.box, 0x3d3b2c, 0.48, 0.5, 0.12, sx * 0.34, 1.6, -0.26);
    }
    B.add(G.box, 0x2e3a3c, 1.3, 0.48, 0.05, 0, 1.52, 0.5, -0.12, 0, 0);
    B.add(G.box, P0, 1.34, 0.06, 0.06, 0, 1.78, 0.53);
    B.add(G.cyl12, RUBBER_C, 0.36, 0.24, 0.36, 0, 1.0, -1.55, Math.PI / 2, 0, 0);
    B.add(G.cyl8, METAL, 0.06, 1.0, 0.06, 0, 1.25, -0.55);
    B.add(G.box, 0x4a4c34, 0.3, 0.45, 0.22, 0.52, 1.35, -1.38);
    jerry(B, -0.52, 1.35, -1.42, 0);
    antenna(B, -0.62, 1.25, -1.3, 2.4);
    crewBust(B, -0.34, 1.75, 0.0, 'us');
    crewBust(B, 0.12, 1.95, -0.85, 'us');
  },
  null, (B) => mgGun(B, true), 1.1, null,
  [[0.72, 0.4, 1.05, 0.4, 0.26], [0.72, 0.4, -1.05, 0.4, 0.26]],
  (g) => { decal(g, TEX.star, 0.75, 0, 1.225, 1.05, -Math.PI / 2, 0); starPair(g, 0.725, 1.0, -0.6, 0.5); });

// M24 Chaffee — tanque leve, canhão de 75 mm
VEH.m24 = () => vehicleShell('m24', { L: 5.6, W: 3.0, tw: 0.45, th: 0.95, paint: US_PAINT, camo: null, tur: [0, 1.55, -0.15], gy: 0.42, gz: 1.12 },
  (B, s) => {
    const P0 = s.paint;
    B.add(sideProfile([[2.75, 0.45], [2.92, 0.82], [2.78, 1.0], [-2.7, 1.0], [-2.8, 0.5]], s.W - 1.1, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[2.86, 0.98], [1.75, 1.55], [-2.55, 1.55], [-2.8, 1.3], [-2.8, 0.98]], s.W - 0.12, 4), P0, 1, 1, 1, 0, 0, 0);
    runGear(B, s, 5, 0.33, { rollers: 3 });
    for (const sx of [-0.55, 0.55]) { B.add(G.cyl12, P0, 0.3, 0.12, 0.3, sx, 1.62, 1.2); B.add(G.box, P0, 0.32, 0.04, 0.3, sx, 1.7, 1.3, 0.9, 0, 0); }
    for (let i = 0; i < 4; i++) B.add(G.box, DARK, 2.3, 0.04, 0.1, 0, 1.57, -1.3 - i * 0.28);
    B.add(G.sph, METAL, 0.13, 0.13, 0.13, 0.7, 1.15, 2.6);
    tarpRoll(B, 0, 1.75, -2.45, 1.8);
    jerry(B, 1.15, 1.8, -1.9, 0); jerry(B, 0.9, 1.8, -1.9, 0);
    for (let i = 0; i < 3; i++) B.add(G.box, 0x3f4322, 2.86, 0.02, 0.03, 0, 1.05 + i * 0.16, 1.9 - i * 0.55);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, DARK, 1.0, 0.1, 1.0, 0, 0.05, 0);
    B.add(planProfile([[-0.75, 1.0], [0.75, 1.0], [1.08, 0.3], [1.08, -1.05], [0.8, -1.3], [-0.8, -1.3], [-1.08, -1.05], [-1.08, 0.3]], 0.72, 1), P0, 1, 1, 1, 0, 0.08, 0);
    B.add(G.box, P0, 1.05, 0.6, 0.28, 0, 0.42, 1.05);
    B.add(G.cyl12, P0, 0.36, 0.22, 0.36, -0.45, 0.92, -0.35);
    B.add(G.cyl12, DARK, 0.37, 0.06, 0.37, -0.45, 1.04, -0.35);
    crewBust(B, -0.45, 1.42, -0.35, 'us');
    B.add(G.cyl8, METAL, 0.03, 0.4, 0.03, 0.45, 1.0, -0.6);
    B.add(G.box, METAL, 0.12, 0.14, 0.45, 0.45, 1.22, -0.5);
    B.add(G.cyl8, 0x1e1e1e, 0.026, 0.9, 0.026, 0.45, 1.24, 0.15, Math.PI / 2, 0, 0);
    antenna(B, 0.65, 0.8, -1.1, 2.8);
  },
  (B) => { longGun(B, 3.2, 0.075, 0x45472f, false); B.add(G.cyl12, 0x3c3e2a, 0.1, 0.2, 0.1, 0, 0, 3.85, Math.PI / 2, 0, 0); },
  3.95, trackSpec({ L: 5.6, th: 0.95, tw: 0.45, W: 3.0 }), null,
  (g, tur) => { starPair(tur, 1.1, 0.42, -0.2, 0.75); starPair(g, 1.45, 1.2, -1.4, 0.7); decal(g, TEX.star, 1.0, 0, 1.56, -1.9, -Math.PI / 2, 0); });

// M18 Hellcat — caça-tanques rápido de 76 mm, torre aberta
VEH.m18 = () => vehicleShell('m18', { L: 5.5, W: 2.9, tw: 0.42, th: 0.95, paint: US_PAINT, camo: null, tur: [0, 1.55, -0.3], gy: 0.48, gz: 1.05 },
  (B, s) => {
    const P0 = s.paint;
    B.add(sideProfile([[2.7, 0.45], [2.85, 0.8], [2.7, 0.98], [-2.7, 0.98], [-2.78, 0.5]], s.W - 1.05, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[2.8, 0.96], [1.2, 1.5], [-2.5, 1.5], [-2.78, 1.25], [-2.78, 0.96]], s.W - 0.1, 4), P0, 1, 1, 1, 0, 0, 0);
    runGear(B, s, 5, 0.34, { rollers: 4 });
    for (let i = 0; i < 5; i++) B.add(G.box, DARK, 2.2, 0.04, 0.1, 0, 1.52, -1.2 - i * 0.26);
    B.add(G.sph, METAL, 0.13, 0.13, 0.13, 0.65, 1.12, 2.45);
    tarpRoll(B, 0, 1.72, -2.35, 1.7);
    for (const sx of [-1, 1]) B.add(G.box, 0x4a4630, 0.4, 0.36, 1.6, sx * 1.15, 1.7, -1.0);
    jerry(B, -0.95, 1.75, 1.7, 0);
  },
  (B, s) => {
    const P0 = s.paint, pent = [[-0.85, 1.05], [0.85, 1.05], [1.25, 0.1], [1.15, -1.2], [-1.15, -1.2], [-1.25, 0.1]];
    B.add(G.cyl12, DARK, 1.05, 0.1, 1.05, 0, 0.05, 0);
    B.add(planProfile(pent, 0.15, 1), P0, 1, 1, 1, 0, 0.06, 0);
    for (let i = 0; i < pent.length; i++) {
      const a = pent[i], b = pent[(i + 1) % pent.length], mx = (a[0] + b[0]) / 2, mz = (a[1] + b[1]) / 2, len = Math.hypot(b[0] - a[0], b[1] - a[1]);
      B.add(G.box, P0, len, 0.72, 0.07, mx, 0.55, mz, 0, Math.atan2(b[1] - a[1], -(b[0] - a[0])) + Math.PI, 0);
    }
    B.add(G.box, P0, 0.8, 0.55, 0.3, 0, 0.48, 1.18);
    crewBust(B, -0.5, 1.1, -0.35, 'us'); crewBust(B, 0.45, 1.05, -0.55, 'us');
    B.add(G.cyl8, METAL, 0.03, 0.5, 0.03, 0.75, 0.95, -0.95);
    B.add(G.box, METAL, 0.13, 0.15, 0.48, 0.75, 1.22, -0.85);
    B.add(G.cyl8, 0x1e1e1e, 0.03, 1.0, 0.03, 0.75, 1.24, -0.1, Math.PI / 2, 0, 0);
    tarpRoll(B, 0, 0.5, -1.45, 1.4, 0x7a6e4c);
  },
  (B) => longGun(B, 3.3, 0.085, 0x45472f, true),
  4.05, trackSpec({ L: 5.5, th: 0.95, tw: 0.42, W: 2.9 }), null,
  (g, tur) => { starPair(tur, 1.21, 0.5, -0.4, 0.7); decal(g, TEX.star, 1.0, 0, 1.52, -1.8, -Math.PI / 2, 0); });

// M36 Jackson — casco do M10 com torre aberta de 90 mm
VEH.m36 = () => vehicleShell('m36', { L: 6.9, W: 3.2, tw: 0.62, th: 1.15, paint: 0x4f5530, camo: null, tur: [0, 2.05, -0.3], gy: 0.55, gz: 1.2 },
  (B, s) => {
    const P0 = s.paint;
    shermanRunning(B, s);
    B.add(sideProfile([[3.15, 1.12], [3.35, 1.42], [1.4, 2.05], [-2.6, 2.05], [-3.3, 1.75], [-3.42, 1.12]], 2.3, 4), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.1, 1.05, 5.9, sx * 1.36, 1.6, -0.4, 0, 0, -sx * 0.42);
      for (let i = 0; i < 4; i++) B.add(G.box, 0x6e4c2c, 0.05, 0.1, 0.6, sx * 1.58, 1.4 + (i % 2) * 0.2, -1.8 + Math.floor(i / 2) * 1.6, 0, 0, -sx * 0.42);
    }
    for (const sx of [-0.6, 0.6]) B.add(G.box, P0, 0.6, 0.3, 0.55, sx, 2.0, 1.45, -0.25, 0, 0);
    for (let i = 0; i < 5; i++) B.add(G.box, DARK, 1.9, 0.04, 0.1, 0, 2.06, -1.2 - i * 0.28);
    for (let i = 0; i < 8; i++) B.add(G.box, i % 2 ? 0x8a7a58 : 0x7c6e50, 0.5, 0.3, 0.3, -1.0 + (i % 4) * 0.5, 1.62 + Math.floor(i / 4) * 0.25, 3.1 - Math.floor(i / 4) * 0.4, 0.5, 0, 0);
    tarpRoll(B, 0, 2.25, -2.75, 1.6);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, DARK, 1.25, 0.1, 1.25, 0, 0.05, 0);
    B.add(G.cyl12, P0, 1.3, 0.85, 1.3, 0, 0.5, 0);
    B.add(G.cyl12, 0x23241a, 1.2, 0.04, 1.2, 0, 0.94, 0);
    B.add(G.box, P0, 2.1, 0.75, 0.9, 0, 0.45, -1.55);
    B.add(G.box, P0, 1.1, 0.75, 0.35, 0, 0.5, 1.35);
    crewBust(B, -0.5, 1.25, -0.2, 'us'); crewBust(B, 0.55, 1.2, -0.45, 'us');
    B.add(G.box, METAL, 0.13, 0.15, 0.48, 0.85, 1.25, -0.8);
    B.add(G.cyl8, 0x1e1e1e, 0.03, 1.0, 0.03, 0.85, 1.27, -0.05, Math.PI / 2, 0, 0);
  },
  (B) => longGun(B, 4.0, 0.11, 0x45472f, true),
  4.75, { L: 6.9, h: 1.15, rs: 0.42, ri: 0.38, w: 0.62, x: 1.29 }, null,
  (g, tur) => { starPair(tur, 1.31, 0.55, 0.0, 0.8); starPair(g, 1.6, 1.6, -0.6, 0.9); decal(g, TEX.star, 1.2, 0, 2.065, -2.0, -Math.PI / 2, 0); });

// M26 Pershing — tanque pesado de 90 mm
VEH.m26 = () => vehicleShell('m26', { L: 7.0, W: 3.5, tw: 0.62, th: 1.12, paint: US_PAINT, camo: null, tur: [0, 1.88, -0.45], gy: 0.58, gz: 1.6 },
  (B, s) => {
    const P0 = s.paint;
    B.add(sideProfile([[3.35, 0.5], [3.55, 0.95], [3.42, 1.15], [-3.3, 1.15], [-3.42, 0.55]], s.W - 1.3, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[3.45, 1.12], [2.15, 1.88], [-3.15, 1.88], [-3.45, 1.6], [-3.45, 1.12]], s.W - 0.1, 4), P0, 1, 1, 1, 0, 0, 0);
    runGear(B, s, 6, 0.38, { rollers: 5 });
    B.add(G.sph, METAL, 0.15, 0.15, 0.15, 0.75, 1.42, 2.95);
    B.add(G.cyl8, 0x1e1e1e, 0.03, 0.4, 0.03, 0.75, 1.45, 3.15, Math.PI / 2 - 0.5, 0, 0);
    for (let i = 0; i < 5; i++) B.add(G.box, DARK, 2.6, 0.04, 0.1, 0, 1.9, -1.4 - i * 0.3);
    for (const sx of [-0.6, 0.6]) { B.add(G.cyl12, P0, 0.32, 0.1, 0.32, sx, 1.95, 1.55); }
    for (let i = 0; i < 4; i++) B.add(G.box, 0x3f4322, 3.38, 0.02, 0.03, 0, 1.2 + i * 0.18, 2.6 - i * 0.6);
    tarpRoll(B, 0, 2.12, -2.9, 2.1);
    for (const x of [1.3, 1.05, -1.05, -1.3]) jerry(B, x, 2.15, -2.3, 0);
    B.add(G.ico, 0x5e5a3c, 0.7, 0.28, 0.5, -0.9, 2.05, 1.0);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, DARK, 1.25, 0.1, 1.25, 0, 0.05, 0);
    B.add(planProfile([[-0.85, 1.35], [0.85, 1.35], [1.32, 0.5], [1.32, -1.3], [0.95, -2.1], [-0.95, -2.1], [-1.32, -1.3], [-1.32, 0.5]], 0.95, 1), P0, 1, 1, 1, 0, 0.08, 0);
    B.add(G.box, P0, 1.35, 0.78, 0.38, 0, 0.55, 1.42);
    B.add(G.cyl12, P0, 0.42, 0.3, 0.42, -0.55, 1.18, -0.5);
    B.add(G.cyl12, DARK, 0.43, 0.06, 0.43, -0.55, 1.33, -0.5);
    crewBust(B, -0.55, 1.75, -0.5, 'us');
    B.add(G.cyl8, METAL, 0.04, 0.45, 0.04, 0.55, 1.25, -0.9);
    B.add(G.box, METAL, 0.14, 0.16, 0.5, 0.55, 1.5, -0.75);
    B.add(G.cyl8, 0x1e1e1e, 0.03, 1.1, 0.03, 0.55, 1.52, 0.05, Math.PI / 2, 0, 0);
    tarpRoll(B, 0, 0.75, -2.3, 1.6, 0x7a6e4c);
    antenna(B, 0.8, 1.05, -1.6, 3.0);
  },
  (B) => longGun(B, 4.35, 0.11, 0x45472f, true),
  5.15, trackSpec({ L: 7.0, th: 1.12, tw: 0.62, W: 3.5 }), null,
  (g, tur) => { starPair(tur, 1.33, 0.55, -0.6, 0.85); starPair(g, 1.7, 1.45, -1.2, 0.9); decal(g, TEX.star, 1.3, 0, 1.89, -2.2, -Math.PI / 2, 0); });

// M7 Priest — obus autopropulsado de 105 mm (artilharia de longo alcance)
VEH.m7 = () => vehicleShell('m7', { L: 6.9, W: 3.0, tw: 0.6, th: 1.12, paint: US_PAINT, camo: null, tur: [-0.25, 1.95, 1.65], gy: 0.1, gz: 0.2 },
  (B, s) => {
    const P0 = s.paint;
    shermanRunning(B, Object.assign({}, s, { L: 6.9 }));
    B.add(sideProfile([[3.25, 1.12], [3.4, 1.4], [2.2, 2.05], [-3.0, 2.05], [-3.4, 1.7], [-3.42, 1.12]], s.W - 0.4, 4), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, P0, 0.08, 0.6, 4.6, sx * 1.32, 2.33, -0.8);
    B.add(G.box, P0, 2.7, 0.6, 0.08, 0, 2.33, -3.0);
    // "púlpito" da metralhadora .50
    B.add(G.cyl12, P0, 0.62, 1.05, 0.62, 0.95, 2.45, 1.85);
    B.add(G.torus, METAL, 0.6, 0.6, 1.2, 0.95, 3.0, 1.85, Math.PI / 2, 0, 0);
    B.add(G.box, METAL, 0.14, 0.16, 0.5, 0.95, 3.15, 2.1);
    B.add(G.cyl8, 0x1e1e1e, 0.035, 1.1, 0.035, 0.95, 3.17, 2.9, Math.PI / 2, 0, 0);
    crewBust(B, 0.95, 3.0, 1.75, 'us');
    crewBust(B, -0.65, 2.55, -0.2, 'us'); crewBust(B, 0.5, 2.5, -1.2, 'us'); crewBust(B, -0.4, 2.5, -1.9, 'us');
    for (let i = 0; i < 8; i++) B.add(G.cyl8, 0xb08a3a, 0.08, 0.6, 0.08, -0.95 + (i % 4) * 0.18, 2.35, -2.6 + Math.floor(i / 4) * 0.2, Math.PI / 2, 0, 0);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x6e6a43, 0.45, 0.32, 0.6, 0.85, 2.22, -0.6 - i * 0.62);
    tarpRoll(B, 0, 2.35, 3.0, 1.6, 0x6a6345);
  },
  (B, s) => { B.add(G.box, s.paint, 1.3, 0.85, 0.5, 0, 0.0, 0.0); B.add(G.cyl12, 0x45472f, 0.3, 0.6, 0.3, 0, 0.05, 0.3, Math.PI / 2, 0, 0); },
  (B) => { B.add(G.cyl12, 0x45472f, 0.17, 2.2, 0.17, 0, 0, 1.4, Math.PI / 2, 0, 0); B.add(G.cyl12, 0x3c3e2a, 0.2, 0.3, 0.2, 0, 0, 2.45, Math.PI / 2, 0, 0); },
  2.65, { L: 6.9, h: 1.12, rs: 0.42, ri: 0.38, w: 0.6, x: 1.2 }, null,
  (g) => { starPair(g, 1.31, 1.75, -0.8, 0.85); });

// M16 — meia-lagarta com quatro metralhadoras .50 (antiaérea)
VEH.m16 = () => vehicleShell('m16', { L: 6.2, paint: US_PAINT, camo: null, tur: [0, 1.6, -1.2], gy: 0.75, gz: 0.2 },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.box, DARK, 1.6, 0.3, 6.0, 0, 0.85, 0);
    B.add(G.cyl12, 0x3a3b30, 0.24, 2.0, 0.24, 0, 0.8, 3.35, 0, 0, Math.PI / 2);
    B.add(G.box, P0, 1.6, 1.05, 0.12, 0, 1.45, 3.05);
    for (let i = 0; i < 6; i++) B.add(G.box, DARK, 1.3, 0.05, 0.05, 0, 1.15 + i * 0.13, 3.12);
    B.add(G.box, P0, 1.45, 0.72, 1.45, 0, 1.55, 2.3);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.55, 0.07, 1.5, sx * 0.98, 1.15, 2.05, -0.12, 0, 0);
      B.add(G.box, P0, 0.08, 0.7, 4.5, sx * 1.18, 1.35, -0.65);
      B.add(G.box, P0, 0.06, 0.55, 3.2, sx * 1.3, 1.7, -1.3, 0, 0, sx * 0.6);
      for (const z of [-2.2, -1.5, -0.8]) wheel(B, sx * 1.12, 0.36, z, 0.3, 0.22, DARK, P0);
      wheel(B, sx * 1.12, 0.62, -0.05, 0.34, 0.24, DARK, METAL);
      wheel(B, sx * 1.12, 0.6, -2.85, 0.3, 0.22, DARK, P0);
    }
    B.add(G.box, P0, 2.36, 0.7, 0.08, 0, 1.35, -2.9);
    B.add(G.box, P0, 2.36, 0.55, 0.08, 0, 2.0, 1.6, -0.3, 0, 0);
    B.add(G.box, 0x23241a, 2.2, 0.06, 4.4, 0, 1.03, -0.65);
    crewBust(B, -0.45, 1.85, 1.15, 'us'); crewBust(B, 0.45, 1.85, 1.15, 'us');
    for (let i = 0; i < 6; i++) B.add(G.box, 0x6e6a43, 0.4, 0.28, 0.24, -0.95 + (i % 3) * 0.42, 1.2, -2.5 + Math.floor(i / 3) * 0.3);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, METAL, 0.75, 0.35, 0.75, 0, 0.15, 0);
    B.add(G.box, P0, 1.6, 0.9, 0.08, 0, 0.75, 0.55);
    for (const sx of [-1, 1]) B.add(G.box, P0, 0.08, 0.7, 0.7, sx * 0.82, 0.7, 0.2);
    crewBust(B, 0, 1.15, -0.3, 'us');
  },
  (B) => {
    for (const sx of [-0.55, 0.55]) for (const y of [-0.12, 0.18]) {
      B.add(G.box, 0x262624, 0.14, 0.16, 0.55, sx, y, 0.05);
      B.add(G.cyl8, 0x262624, 0.045, 1.3, 0.045, sx, y, 0.95, Math.PI / 2, 0, 0);
      B.add(G.cyl8, 0x1e1e1e, 0.07, 0.25, 0.07, sx, y, 1.55, Math.PI / 2, 0, 0);
    }
    for (const sx of [-0.85, 0.85]) B.add(G.box, 0x6e6a43, 0.22, 0.3, 0.4, sx, 0, -0.1);
  },
  1.75, { L: 3.2, h: 0.95, rs: 0.36, ri: 0.32, w: 0.5, x: 1.0, z: -1.45 },
  [[1.02, 0.5, 2.0, 0.5, 0.32]],
  (g) => { starPair(g, 1.23, 1.4, -0.5, 0.8); decal(g, TEX.star, 1.0, 0, 1.93, 2.3, -Math.PI / 2, 0); });

// Sherman T34 Calliope — lançador de 60 foguetes sobre a torre
VEH.calliope = () => {
  const g = makeTank('sherman'), tur = g.userData.turret;
  VM(merged('calliopeRack', B => {
    for (const sx of [-1, 1]) { B.add(G.box, METAL, 0.12, 1.6, 0.12, sx * 1.55, 0.8, -0.2); B.add(G.box, METAL, 0.1, 0.1, 1.8, sx * 1.55, 0.2, 0.4, 0.35, 0, 0); }
    B.add(G.box, METAL, 3.3, 0.1, 0.1, 0, 1.6, -0.2);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 9; c++) {
      B.add(G.cyl8, c % 2 ? 0x4a4f2e : 0x45472f, 0.12, 2.6, 0.12, -1.36 + c * 0.34, 1.0 + r * 0.24, 0.2, Math.PI / 2 - 0.08, 0, 0);
      B.add(G.cyl8, 0x111111, 0.07, 0.02, 0.07, -1.36 + c * 0.34, 1.0 + r * 0.24 + 0.1, 1.5, Math.PI / 2 - 0.08, 0, 0);
    }
  }), tur, 0, 0.75, 0, true);
  return g;
};

/* ---------------- Alemanha ---------------- */
function hullPantherBase(B, s) {
  const P0 = s.paint;
  B.add(sideProfile([[3.35, 0.45], [3.62, 0.9], [3.55, 1.1], [-3.3, 1.1], [-3.42, 0.55]], s.W - 1.45, 2), P0, 1, 1, 1, 0, 0, 0);
  runGear(B, s, 8, 0.43, { interleave: true, ww: 0.18 });
  schurzen(B, s, 5, 1.25, 0.8, [1, 2]);
  B.add(G.cyl8, 0x5a3b2a, 0.22, 1.8, 0.22, 0, 0.95, -3.55, 0, 0, Math.PI / 2);
  for (const sx of [-1, 1]) { B.add(G.cyl12, METAL, 0.16, 0.8, 0.16, sx * 0.55, 1.5, -3.55); B.add(G.cyl8, 0x3a3a34, 0.025, 5.0, 0.025, sx * 1.55, 1.92, -0.4, Math.PI / 2, 0, 0); }
}
// Panther Ausf. G
VEH.panther = () => vehicleShell('panther', { L: 6.9, W: 3.4, tw: 0.66, th: 1.05, paint: DE_PAINT, camo: DE_CAMO, tur: [0, 1.95, -0.4], gy: 0.45, gz: 1.45 },
  (B, s) => {
    const P0 = s.paint;
    hullPantherBase(B, s);
    B.add(sideProfile([[3.55, 1.08], [2.25, 1.95], [-2.9, 1.95], [-3.35, 1.5], [-3.42, 1.08]], s.W * 0.98, 4), P0, 1, 1, 1, 0, 0, 0);
    B.add(G.sph, METAL, 0.15, 0.15, 0.15, 0.82, 1.5, 3.0);
    for (const sx of [-0.6, 0.6]) B.add(G.cyl12, P0, 0.28, 0.08, 0.28, sx, 1.98, 1.75);
    for (let i = 0; i < 4; i++) B.add(G.box, DARK, 2.5, 0.04, 0.1, 0, 1.97, -1.5 - i * 0.32);
    for (let i = 0; i < 8; i++) for (const y of [1.25, 1.65]) B.add(G.sph16, 0x5a5236, 0.045, 0.045, 0.045, -1.3 + i * 0.37, y, 3.2 - (y - 1.25) * 1.4);
    tarpRoll(B, 0, 2.15, -2.75, 1.8, 0x5d5a3c);
    for (const x of [1.3, 1.0]) jerry(B, x, 2.2, -2.2, 0, 0x6b6440);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, DARK, 1.15, 0.1, 1.15, 0, 0.05, 0);
    B.add(planProfile([[-0.85, 1.3], [0.85, 1.3], [1.25, 0.2], [1.3, -1.55], [-1.3, -1.55], [-1.25, 0.2]], 0.85, 1), P0, 1, 1, 1, 0, 0.08, 0);
    B.add(G.cyl12, P0, 0.42, 1.25, 0.42, 0, 0.45, 1.3, 0, 0, Math.PI / 2);
    B.add(G.box, P0, 1.25, 0.3, 0.5, 0, 0.22, 1.3);
    B.add(G.cyl12, P0, 0.38, 0.32, 0.38, -0.6, 1.08, -0.9);
    B.add(G.cyl12, DARK, 0.39, 0.06, 0.39, -0.6, 1.25, -0.9);
    crewBust(B, -0.6, 1.65, -0.9, 'de');
    B.add(G.cyl8, METAL, 0.1, 0.25, 0.1, 0.5, 1.0, -0.7);
    for (const sx of [-1, 1]) for (let k = 0; k < 3; k++) B.add(G.cyl8, METAL, 0.06, 0.25, 0.06, sx * (1.15 + k * 0.05), 0.85, 0.9 - k * 0.12, 0.6, 0, sx * 0.4);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x3a3934, 0.07, 0.12, 0.5, 1.33, 0.35 + (i % 2) * 0.16, -0.4 - Math.floor(i / 2) * 0.55);
    antenna(B, 0.8, 0.9, -1.4, 2.4);
  },
  (B) => longGun(B, 4.6, 0.075, 0x6f6440, true),
  5.5, trackSpec({ L: 6.9, th: 1.05, tw: 0.66, W: 3.4 }), null,
  (g, tur) => { crossDecal(g, 1.72, 1.25, -1.6, 0.7); numDecal(tur, '' + (200 + Math.floor(Math.random() * 99)), 1.31, 0.48, -0.5); });

// Tiger II (King Tiger) com torre Henschel
VEH.kingtiger = () => vehicleShell('kingtiger', { L: 7.4, W: 3.75, tw: 0.8, th: 1.15, paint: DE_PAINT, camo: DE_CAMO, tur: [0, 2.05, -0.55], gy: 0.55, gz: 1.75 },
  (B, s) => {
    const P0 = s.paint;
    B.add(sideProfile([[3.55, 0.45], [3.85, 0.95], [3.78, 1.15], [-3.55, 1.15], [-3.7, 0.55]], s.W - 1.7, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[3.78, 1.12], [2.45, 2.08], [-3.35, 2.08], [-3.72, 1.62], [-3.75, 1.12]], s.W * 0.97, 4), P0, 1, 1, 1, 0, 0, 0);
    runGear(B, s, 9, 0.44, { interleave: true, ww: 0.2 });
    schurzen(B, s, 6, 1.3, 0.8);
    B.add(G.sph, METAL, 0.16, 0.16, 0.16, 0.9, 1.65, 3.15);
    for (const sx of [-0.65, 0.65]) B.add(G.cyl12, P0, 0.3, 0.08, 0.3, sx, 2.1, 1.85);
    for (let i = 0; i < 5; i++) B.add(G.box, DARK, 2.8, 0.04, 0.1, 0, 2.1, -1.6 - i * 0.32);
    for (const sx of [-1, 1]) { B.add(G.cyl12, METAL, 0.18, 0.9, 0.18, sx * 0.6, 1.6, -3.85); B.add(G.cyl8, 0x3a3a34, 0.03, 5.8, 0.03, sx * 1.7, 2.12, -0.4, Math.PI / 2, 0, 0); }
    for (let i = 0; i < 9; i++) B.add(G.sph16, 0x5a5236, 0.05, 0.05, 0.05, -1.6 + i * 0.4, 1.6, 3.32);
    tarpRoll(B, 0, 2.3, -3.1, 2.2, 0x5d5a3c);
    B.add(G.box, METAL, 0.5, 0.35, 1.4, -1.4, 2.25, -2.2);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, DARK, 1.3, 0.1, 1.3, 0, 0.05, 0);
    B.add(planProfile([[-0.85, 1.55], [0.85, 1.55], [1.38, 0.85], [1.38, -2.0], [-1.38, -2.0], [-1.38, 0.85]], 0.98, 1), P0, 1, 1, 1, 0, 0.08, 0);
    B.add(G.box, P0, 1.75, 0.98, 0.1, 0, 0.57, 1.6);
    B.add(G.flare, P0, 0.42, 0.9, 0.42, 0, 0.55, 1.95, Math.PI / 2, 0, 0);
    B.add(G.cyl12, P0, 0.4, 0.3, 0.4, -0.65, 1.2, -0.6);
    B.add(G.cyl12, DARK, 0.41, 0.06, 0.41, -0.65, 1.37, -0.6);
    crewBust(B, -0.65, 1.78, -0.6, 'de');
    for (const sx of [-1, 1]) for (let k = 0; k < 6; k++) B.add(G.box, 0x3a3934, 0.07, 0.12, 0.5, sx * 1.42, 0.3 + (k % 2) * 0.16, 0.2 - Math.floor(k / 2) * 0.55);
    B.add(G.box, P0, 1.3, 0.08, 0.9, 0.3, 1.1, -1.3);
    antenna(B, 0.9, 1.05, -1.7, 2.6);
  },
  (B) => longGun(B, 5.6, 0.1, 0x6f6440, true),
  6.5, trackSpec({ L: 7.4, th: 1.15, tw: 0.8, W: 3.75 }), null,
  (g, tur) => { crossDecal(g, 1.88, 1.3, -1.8, 0.8); numDecal(tur, '' + (100 + Math.floor(Math.random() * 30)), 1.39, 0.6, -0.4); });

// Jagdpanther — caça-tanques de 88 mm sobre o chassi do Panther
VEH.jagdpanther = () => vehicleShell('jagdpanther', { L: 6.9, W: 3.4, tw: 0.66, th: 1.05, paint: DE_PAINT, camo: DE_CAMO, tur: [0, 1.65, 2.55], gy: 0.05, gz: 0.25 },
  (B, s) => {
    const P0 = s.paint;
    hullPantherBase(B, s);
    B.add(sideProfile([[3.55, 1.08], [1.65, 2.28], [-1.9, 2.28], [-2.2, 1.98], [-3.35, 1.85], [-3.42, 1.08]], s.W * 0.97, 4), P0, 1, 1, 1, 0, 0, 0);
    B.add(G.cyl12, P0, 0.36, 0.3, 0.36, 0.7, 2.4, 0.1);
    B.add(G.cyl12, DARK, 0.37, 0.06, 0.37, 0.7, 2.56, 0.1);
    crewBust(B, 0.7, 2.95, 0.1, 'de');
    B.add(G.box, P0, 0.5, 0.25, 0.4, -0.7, 2.4, 0.6);
    for (let i = 0; i < 4; i++) B.add(G.box, DARK, 2.5, 0.04, 0.1, 0, 1.9, -2.2 - i * 0.3);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x6e4c2c, 0.05, 0.1, 0.8, 1.62, 1.6 + (i % 2) * 0.2, -1.5 + Math.floor(i / 2) * 1.8);
    tarpRoll(B, 0, 2.05, -3.0, 1.8, 0x5d5a3c);
    jerry(B, -1.1, 2.0, -2.6, 0, 0x6b6440);
    B.add(G.box, METAL, 0.25, 0.25, 0.25, 0.35, 2.4, -1.3);
  },
  (B, s) => { B.add(G.sph, s.paint, 0.55, 0.5, 0.42, 0, 0.0, 0.0); B.add(G.cyl12, s.paint, 0.3, 0.6, 0.3, 0, 0.0, 0.4, Math.PI / 2, 0, 0); },
  (B) => longGun(B, 4.8, 0.1, 0x6f6440, true),
  5.7, trackSpec({ L: 6.9, th: 1.05, tw: 0.66, W: 3.4 }), null,
  (g) => { crossDecal(g, 1.66, 1.6, -0.6, 0.75); });

// Jagdpanzer 38(t) Hetzer — pequeno e baixo
VEH.hetzer = () => vehicleShell('hetzer', { L: 4.9, W: 2.6, tw: 0.38, th: 0.85, paint: DE_PAINT, camo: [0x56603a, 0x6b4a33], tur: [0.35, 1.25, 1.75], gy: 0.05, gz: 0.2 },
  (B, s) => {
    const P0 = s.paint;
    B.add(sideProfile([[2.4, 0.35], [2.55, 0.72], [1.25, 1.88], [-1.25, 1.88], [-2.4, 1.38], [-2.45, 0.35]], s.W - 0.28, 4), P0, 1, 1, 1, 0, 0, 0);
    runGear(B, s, 4, 0.4, { z0: -1.55, z1: 1.45, ww: 0.24 });
    B.add(G.cyl12, P0, 0.3, 0.25, 0.3, -0.5, 1.95, 0.2);
    crewBust(B, -0.5, 2.3, 0.2, 'de');
    B.add(G.box, METAL, 0.3, 0.3, 0.3, 0.4, 2.03, -0.3);
    B.add(G.box, 0x262624, 0.1, 0.12, 0.55, 0.4, 2.25, -0.1);
    B.add(G.cyl8, 0x1a1a1a, 0.03, 0.7, 0.03, 0.4, 2.25, 0.4, Math.PI / 2, 0, 0);
    for (let i = 0; i < 3; i++) B.add(G.box, DARK, 1.8, 0.04, 0.1, 0, 1.6, -1.1 - i * 0.26, -0.4, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, P0, 0.05, 0.55, 3.6, sx * 1.38, 1.0, -0.1);
    tarpRoll(B, 0, 1.55, -2.2, 1.4, 0x5d5a3c);
  },
  (B, s) => { B.add(G.sph, s.paint, 0.42, 0.38, 0.32, 0, 0, 0); },
  (B) => longGun(B, 2.4, 0.075, 0x6f6440, true),
  3.25, trackSpec({ L: 4.9, th: 0.85, tw: 0.38, W: 2.6 }), null,
  (g) => { crossDecal(g, 1.42, 1.0, -0.8, 0.6); });

// Sd.Kfz. 234/2 Puma — carro blindado de 8 rodas com canhão de 50 mm
VEH.puma = () => vehicleShell('puma', { L: 6.8, W: 2.4, paint: DE_PAINT, camo: DE_CAMO, tur: [0, 1.52, -0.25], gy: 0.36, gz: 0.95 },
  (B, s) => {
    const P0 = s.paint;
    B.add(sideProfile([[3.25, 0.75], [3.45, 1.05], [3.0, 1.52], [-2.9, 1.52], [-3.35, 1.08], [-3.15, 0.75]], 2.15, 3), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.4, 0.06, 6.2, sx * 1.2, 1.22, 0, 0, 0, sx * 0.25);
      B.add(G.box, METAL, 0.32, 0.3, 1.0, sx * 1.12, 1.4, 0);
      jerry(B, sx * 1.25, 1.6, 2.0, 0, 0x6b6440);
    }
    for (let i = 0; i < 4; i++) B.add(G.box, DARK, 1.8, 0.04, 0.1, 0, 1.53, -1.6 - i * 0.3);
    B.add(G.box, DARK, 0.5, 0.12, 0.05, -0.45, 1.3, 3.18, -0.6, 0, 0);
    B.add(G.box, DARK, 0.5, 0.12, 0.05, 0.45, 1.3, 3.18, -0.6, 0, 0);
    B.add(G.cyl8, 0x5a3b2a, 0.16, 1.4, 0.16, 0, 1.62, -2.6, 0, 0, Math.PI / 2);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, DARK, 0.9, 0.08, 0.9, 0, 0.04, 0);
    B.add(planProfile([[-0.55, 0.95], [0.55, 0.95], [0.95, 0.15], [0.95, -0.95], [-0.95, -0.95], [-0.95, 0.15]], 0.62, 1), P0, 1, 1, 1, 0, 0.06, 0);
    B.add(G.sph, P0, 0.36, 0.32, 0.36, 0, 0.36, 0.95);
    B.add(G.box, DARK, 0.6, 0.04, 0.6, 0, 0.7, -0.3);
    crewBust(B, -0.3, 1.0, -0.4, 'de');
    antenna(B, 0.65, 0.6, -0.8, 2.3);
  },
  (B) => longGun(B, 2.8, 0.06, 0x6f6440, true),
  3.6, null,
  [[1.15, 0.52, 2.15, 0.52, 0.3], [1.15, 0.52, 0.75, 0.52, 0.3], [1.15, 0.52, -0.75, 0.52, 0.3], [1.15, 0.52, -2.15, 0.52, 0.3]],
  (g) => { crossDecal(g, 1.15, 1.15, -1.0, 0.6); });

// Flakpanzer IV Wirbelwind — torre aberta com quatro canhões de 20 mm
VEH.wirbelwind = () => {
  const base = Object.assign({}, TANKS.panzer4);
  return vehicleShell('wirbelwind', Object.assign(base, { tur: [0, 1.95, -0.3], gy: 0.75, gz: 0.25 }),
    (B, s) => hullPanzer4(B, s),
    (B, s) => {
      const P0 = s.paint;
      B.add(G.cyl12, DARK, 1.15, 0.1, 1.15, 0, 0.05, 0);
      for (let i = 0; i < 9; i++) {
        const a = i / 9 * Math.PI * 2;
        B.add(G.box, P0, 0.82, 0.95, 0.08, Math.sin(a) * 1.18, 0.55, Math.cos(a) * 1.18, -0.18, a, 0);
      }
      crewBust(B, 0, 1.05, -0.5, 'de');
      B.add(G.box, METAL, 0.5, 0.5, 0.6, 0, 0.6, 0);
    },
    (B) => {
      for (const sx of [-0.28, 0.28]) for (const y of [-0.12, 0.16]) {
        B.add(G.box, 0x4f5348, 0.12, 0.14, 0.6, sx, y, 0.1);
        B.add(G.cyl8, 0x2a2a2a, 0.04, 1.5, 0.04, sx, y, 1.1, Math.PI / 2, 0, 0);
        B.add(G.cone, 0x2a2a2a, 0.06, 0.25, 0.06, sx, y, 1.9, Math.PI / 2, 0, 0);
      }
    },
    2.0, { L: 7.0, h: 1.0, rs: 0.4, ri: 0.38, w: 0.6, x: 1.35 }, null,
    (g) => { crossDecal(g, 1.88, 1.3, 0.6, 0.7); });
};

// Kübelwagen com metralhadora MG 34
VEH.kubel = () => vehicleShell('kubel', { L: 3.75, W: 1.6, paint: DE_PAINT, camo: null, tur: [0, 1.55, -0.45], gy: 0.1, gz: 0.1 },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.box, 0x2f3020, 1.2, 0.2, 3.5, 0, 0.55, 0);
    B.add(sideProfile([[1.85, 0.6], [1.85, 0.95], [1.2, 1.15], [-1.55, 1.15], [-1.85, 0.85], [-1.8, 0.6]], 1.55, 2), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, 0x3d3b2c, 0.5, 0.36, 0.5, sx * 0.36, 1.3, 0.25);
      B.add(G.box, 0x3d3b2c, 0.5, 0.48, 0.12, sx * 0.36, 1.55, 0.0);
      B.add(G.sph, 0xd8d6c6, 0.09, 0.09, 0.05, sx * 0.5, 1.05, 1.86);
    }
    B.add(G.box, 0x2e3a3c, 1.4, 0.38, 0.04, 0, 1.38, 0.95, -0.2, 0, 0);
    B.add(G.halfcyl, 0x5d5a3c, 0.25, 1.5, 0.3, 0, 1.15, -1.45, 0, 0, Math.PI / 2);
    B.add(G.cyl12, RUBBER_C, 0.34, 0.22, 0.34, 0, 1.12, 1.55, -0.6, 0, 0);
    B.add(G.cyl8, METAL, 0.05, 0.6, 0.05, 0, 1.25, -0.45);
    crewBust(B, -0.36, 1.7, 0.2, 'de');
    crewBust(B, 0.1, 1.75, -0.8, 'de');
  },
  null, (B) => mgGun(B, false), 1.05, null,
  [[0.72, 0.38, 1.25, 0.38, 0.24], [0.72, 0.38, -1.15, 0.38, 0.24]],
  (g) => { crossDecal(g, 0.79, 0.92, -0.8, 0.45); });

// Panzerwerfer 42 "Maultier" — meia-lagarta com lançador de 10 foguetes
VEH.maultier = () => vehicleShell('maultier', { L: 6.2, paint: DE_PAINT, camo: DE_CAMO, tur: [0, 2.35, -1.5], gy: 0.35, gz: -0.3 },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.box, DARK, 1.5, 0.3, 5.8, 0, 0.82, 0);
    B.add(sideProfile([[3.05, 0.9], [3.05, 1.35], [2.1, 1.65], [1.6, 2.35], [0.7, 2.35], [0.7, 0.9]], 2.15, 3), P0, 1, 1, 1, 0, 0, 0);
    B.add(G.box, P0, 2.2, 1.2, 2.6, 0, 1.55, -1.5);
    B.add(G.box, 0x2a2e31, 1.2, 0.18, 0.05, 0, 2.05, 1.95, -0.6, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.4, 0.06, 1.4, sx * 1.05, 1.15, 2.2, -0.2, 0, 0);
      wheel(B, sx * 1.15, 0.5, -1.4, 0.46, 0.22, DARK, P0);
      wheel(B, sx * 1.15, 0.5, -0.55, 0.46, 0.22, DARK, P0);
      wheel(B, sx * 1.15, 0.5, -2.25, 0.46, 0.22, DARK, P0);
    }
    for (let i = 0; i < 6; i++) B.add(G.box, 0x6e6a43, 0.35, 0.3, 0.3, -0.85 + (i % 3) * 0.4, 2.3, 0.1 - Math.floor(i / 3) * 0.32);
    crewBust(B, -0.45, 2.05, 1.2, 'de');
  },
  (B, s) => { B.add(G.cyl12, METAL, 0.65, 0.25, 0.65, 0, 0.1, 0); B.add(G.box, s.paint, 0.4, 0.5, 0.6, 0, 0.45, 0); },
  (B) => {
    for (let r = 0; r < 2; r++) for (let c = 0; c < 5; c++) {
      B.add(G.cyl12, 0x4f5348, 0.15, 2.2, 0.15, -0.66 + c * 0.33, r * 0.32, 0.3, Math.PI / 2 - 0.45, 0, 0);
      B.add(G.cyl8, 0x111111, 0.1, 0.02, 0.1, -0.66 + c * 0.33, r * 0.32 + 0.48, 1.3, Math.PI / 2 - 0.45, 0, 0);
    }
    B.add(G.box, METAL, 1.75, 0.08, 0.08, 0, -0.15, 0.3);
    B.add(G.box, METAL, 1.75, 0.08, 0.08, 0, 0.45, 1.05);
  },
  1.5, { L: 2.9, h: 0.95, rs: 0.38, ri: 0.34, w: 0.42, x: 1.0, z: -1.4 },
  [[0.95, 0.48, 2.3, 0.48, 0.28]],
  (g) => { crossDecal(g, 1.11, 1.5, -1.6, 0.65); });

/* ---------- Garagem de Veículos (motor pool) ---------- */
BUILD_GEO.motorpool = (B) => {
  B.add(G.box, GRAVEL, 18, 0.2, 14, 0, 0.1, 0);
  for (const x of [-7.5, -2.5, 2.5, 7.5]) for (const z of [-5.5, 0.5]) B.add(G.cyl8, WOOD, 0.14, 4.6, 0.14, x, 2.3, z);
  B.add(G.box, 0x5e6250, 16.4, 0.18, 7.2, 0, 4.7, -2.5, 0.08, 0, 0);
  for (let i = 0; i < 8; i++) B.add(G.box, 0x4e5244, 16.4, 0.05, 0.12, 0, 4.82 - i * 0.07, -5.8 + i * 0.95, 0.08, 0, 0);
  B.add(G.box, 0x6e5434, 16, 2.2, 0.15, 0, 1.1, -6.0);
  bTruck(B, -4.8, -2.4, 0);
  bJeep(B, 0.5, -2.2, 0.05);
  bJeep(B, 4.6, -2.6, -0.1);
  B.add(G.box, 0x3a3b30, 1.2, 1.0, 0.8, 7.0, 0.6, 3.5);
  for (let i = 0; i < 6; i++) B.add(G.cyl12, 0x4a4c34, 0.3, 0.9, 0.3, -6.5 + (i % 3) * 0.7, 0.55, 4.2 + Math.floor(i / 3) * 0.7);
  for (let i = 0; i < 3; i++) B.add(G.cyl12, RUBBER, 0.5, 0.3, 0.5, 3.0 + i * 0.4, 0.5 + i * 0.05, 4.5, Math.PI / 2, 0, 0);
  B.add(G.box, 0x6e5434, 2.2, 0.9, 0.9, -1.0, 0.55, 4.5);
};
BUILD_SIZE.motorpool = [18, 14, 5];
