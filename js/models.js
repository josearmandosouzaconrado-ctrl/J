'use strict';
/* =========================================================
   MODELOS 3D low-poly: soldados, tanques, navios e construções
   Frente de todo modelo = +Z local.
   ========================================================= */
const V3 = THREE.Vector3;
const UP = new V3(0, 1, 0);

function roofGeometry() {
  // prisma triangular: base 1x1 (x,z), altura 1, cumeeira ao longo de X
  const A = [-.5, 0, -.5], B = [-.5, 0, .5], C = [-.5, 1, 0], D = [.5, 0, -.5], E = [.5, 0, .5], F = [.5, 1, 0];
  const tris = [A, B, C, D, F, E, A, C, F, A, F, D, B, E, F, B, F, C];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(tris.flat(), 3));
  g.computeVertexNormals();
  return g;
}

const G = {
  box: new THREE.BoxGeometry(1, 1, 1),
  cyl: new THREE.CylinderGeometry(1, 1, 1, 14),
  cyl8: new THREE.CylinderGeometry(1, 1, 1, 8),
  sph: new THREE.SphereGeometry(1, 10, 8),
  hemi: new THREE.SphereGeometry(1, 10, 5, 0, Math.PI * 2, 0, Math.PI / 2),
  halfcyl: new THREE.CylinderGeometry(1, 1, 1, 14, 1, false, 0, Math.PI),
  cone: new THREE.ConeGeometry(1, 1, 8),
  cone4: new THREE.ConeGeometry(1, 1, 4),
  ico: new THREE.IcosahedronGeometry(1, 0),
  plane: new THREE.PlaneGeometry(1, 1),
  torus: new THREE.TorusGeometry(1, 0.07, 3, 10),
  roof: roofGeometry(),
};

const MATS = new Map();
function M(color, opts) {
  const key = color + (opts ? JSON.stringify(opts) : '');
  let m = MATS.get(key);
  if (!m) { m = new THREE.MeshLambertMaterial(Object.assign({ color }, opts || {})); MATS.set(key, m); }
  return m;
}
function P(geo, mat, sx, sy, sz, x, y, z, parent, cast) {
  const m = new THREE.Mesh(geo, typeof mat === 'number' ? M(mat) : mat);
  m.scale.set(sx, sy, sz); m.position.set(x, y, z);
  m.castShadow = cast !== false;
  if (parent) parent.add(m);
  return m;
}

/* ---------- texturas desenhadas em canvas ---------- */
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas'); c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  return new THREE.CanvasTexture(c);
}
function starPath(g, cx, cy, R, r) {
  g.beginPath();
  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5, rad = i % 2 ? r : R;
    g.lineTo(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad);
  }
  g.closePath();
}
const TEX = {
  star: canvasTex(64, 64, (g) => {
    g.strokeStyle = '#e8e4d2'; g.lineWidth = 4; g.beginPath(); g.arc(32, 32, 28, 0, 7); g.stroke();
    g.fillStyle = '#e8e4d2'; starPath(g, 32, 33, 24, 9.5); g.fill();
  }),
  cross: canvasTex(64, 64, (g) => {
    g.fillStyle = '#f2f0e8'; g.fillRect(22, 4, 20, 56); g.fillRect(4, 22, 56, 20);
    g.fillStyle = '#161616'; g.fillRect(27, 8, 10, 48); g.fillRect(8, 27, 48, 10);
  }),
  redcross: canvasTex(64, 64, (g) => {
    g.fillStyle = '#f1efe6'; g.fillRect(0, 0, 64, 64);
    g.fillStyle = '#b3241d'; g.fillRect(24, 8, 16, 48); g.fillRect(8, 24, 48, 16);
  }),
  usflag: canvasTex(96, 64, (g) => {
    for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#f3f1ea' : '#b22234'; g.fillRect(0, i * 64 / 13, 96, 64 / 13 + 0.5); }
    g.fillStyle = '#3c3b6e'; g.fillRect(0, 0, 40, 34);
    g.fillStyle = '#f3f1ea';
    for (let y = 0; y < 5; y++) for (let x = 0; x < 6; x++) g.fillRect(3 + x * 6.2, 3 + y * 6.2, 2, 2);
  }),
  deflag: canvasTex(96, 64, (g) => {
    g.fillStyle = '#8b8f86'; g.fillRect(0, 0, 96, 64);
    g.fillStyle = '#f2f0e8'; g.fillRect(40, 12, 16, 40); g.fillRect(28, 24, 40, 16);
    g.fillStyle = '#161616'; g.fillRect(44, 16, 8, 32); g.fillRect(32, 28, 32, 8);
  }),
  track: canvasTex(16, 64, (g) => {
    g.fillStyle = '#2b2a25'; g.fillRect(0, 0, 16, 64);
    g.fillStyle = '#4a4740'; for (let y = 0; y < 64; y += 8) g.fillRect(0, y, 16, 3);
  }),
  blob: canvasTex(64, 64, (g) => {
    const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31);
    gr.addColorStop(0, 'rgba(0,0,0,0.55)'); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  }),
  crater: canvasTex(64, 64, (g) => {
    const gr = g.createRadialGradient(32, 32, 2, 32, 32, 31);
    gr.addColorStop(0, 'rgba(28,22,15,0.95)'); gr.addColorStop(0.55, 'rgba(48,38,26,0.8)');
    gr.addColorStop(0.8, 'rgba(70,58,40,0.45)'); gr.addColorStop(1, 'rgba(70,58,40,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  }),
};
const decalMats = new Map();
function decalMat(tex) {
  let m = decalMats.get(tex);
  if (!m) { m = new THREE.MeshLambertMaterial({ map: tex, transparent: true, alphaTest: 0.25, side: THREE.DoubleSide }); decalMats.set(tex, m); }
  return m;
}
const BLOB_MAT = new THREE.MeshBasicMaterial({ map: TEX.blob, transparent: true, depthWrite: false });
function blob(parent, s) {
  const b = new THREE.Mesh(G.plane, BLOB_MAT);
  b.rotation.x = -Math.PI / 2; b.scale.set(s, s, 1); b.position.y = 0.06; b.renderOrder = 1;
  parent.add(b); return b;
}

/* ---------- soldados e civis ---------- */
function makeSoldier(team, kind) {
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  const skin = 0xd1a27c;
  let jacket, pants, helm;
  if (team === 'us') { jacket = 0x5c5b3b; pants = 0x6e664a; helm = 0x474e2f; }
  else if (team === 'de') { jacket = 0x59625a; pants = 0x4d544a; helm = 0x4a5048; }
  else {
    jacket = [0x3c4a66, 0x6b4b3a, 0x5d5d5d, 0x7b6b4a, 0x3f5a48, 0x7a3e3e][(Math.random() * 6) | 0];
    pants = [0x2f2f35, 0x4a3f33, 0x3a3a3a][(Math.random() * 3) | 0];
  }
  const leg = (x) => {
    const l = new THREE.Group(); l.position.set(x, 1.02, 0);
    P(G.box, pants, 0.26, 1.0, 0.3, 0, -0.5, 0, l, false);
    P(G.box, 0x2a2219, 0.28, 0.2, 0.42, 0, -0.94, 0.05, l, false);
    g.add(l); return l;
  };
  const legL = leg(-0.16), legR = leg(0.16);
  P(G.box, jacket, 0.68, 0.82, 0.4, 0, 1.43, 0, g, false);
  P(G.box, team === 'us' ? 0x8c8158 : 0x2a2a24, 0.7, 0.12, 0.42, 0, 1.06, 0, g, false);
  P(G.sph, skin, 0.2, 0.23, 0.21, 0, 2.02, 0.02, g, false);
  if (team === 'us') {
    P(G.hemi, helm, 0.29, 0.22, 0.31, 0, 2.1, 0, g, false);
    P(G.box, 0x67603f, 0.5, 0.52, 0.24, 0, 1.5, -0.3, g, false);
  } else if (team === 'de') {
    P(G.hemi, helm, 0.27, 0.25, 0.29, 0, 2.1, 0, g, false);
    P(G.cyl8, helm, 0.31, 0.08, 0.33, 0, 2.08, -0.02, g, false);
    P(G.cyl8, 0x3b3a30, 0.09, 0.34, 0.09, 0.2, 1.2, -0.25, g, false);
  } else {
    P(G.cyl8, 0x2a2a2e, 0.24, 0.07, 0.24, 0, 2.2, 0, g, false);
  }
  const arm = (x) => {
    const a = new THREE.Group(); a.position.set(x, 1.78, 0);
    P(G.box, jacket, 0.18, 0.72, 0.2, 0, -0.34, 0, a, false);
    P(G.sph, skin, 0.09, 0.09, 0.09, 0, -0.72, 0, a, false);
    g.add(a); return a;
  };
  const armL = arm(-0.43), armR = arm(0.43);
  let rifle = null, tube = false;
  if (team !== 'civ') {
    rifle = new THREE.Group(); g.add(rifle);
    if (kind === 'bazooka' || kind === 'pzschreck') {
      const t = P(G.cyl8, team === 'us' ? 0x3d4428 : 0x4a4a3a, 0.11, 1.7, 0.11, 0, 0, 0, rifle, false);
      t.rotation.x = Math.PI / 2; rifle.position.set(0.3, 1.88, 0.1); tube = true;
    } else {
      P(G.box, 0x4b3322, 0.07, 0.1, 0.78, 0, 0, -0.12, rifle, false);
      P(G.box, 0x262626, 0.045, 0.05, 0.56, 0, 0.02, 0.52, rifle, false);
    }
  }
  blob(g, 1.5);
  g.userData = { legL, legR, armL, armR, rifle, tube };
  return g;
}

/* ---------- tanques ---------- */
const TANKS = {
  sherman: { L: 6.9, W: 3.2, col: 0x4f5428, tur: 0x4b5026, wheels: 6, gun: 3.6, gunR: 0.11 },
  panzer4: { L: 7.0, W: 3.3, col: 0x8c7b4c, tur: 0x86754a, wheels: 8, gun: 4.4, gunR: 0.1, skirts: true },
  tiger: { L: 7.5, W: 4.2, col: 0x7f7248, tur: 0x7a6d44, wheels: 8, gun: 5.6, gunR: 0.15 },
};
function trackMaterial() {
  const t = TEX.track.clone(); t.needsUpdate = true;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(1, 7);
  return new THREE.MeshLambertMaterial({ map: t });
}
function crewHead(parent, x, y, z, team) {
  P(G.sph, 0xd1a27c, 0.2, 0.22, 0.2, x, y, z, parent, false);
  if (team === 'us') P(G.hemi, 0x474e2f, 0.27, 0.2, 0.29, x, y + 0.07, z, parent, false);
  else P(G.cyl8, 0x1d1d1d, 0.24, 0.12, 0.24, x, y + 0.14, z, parent, false);
  P(G.box, team === 'us' ? 0x5c5b3b : 0x262626, 0.5, 0.35, 0.4, x, y - 0.35, z, parent, false);
}
function makeTank(kind) {
  const s = TANKS[kind]; const g = new THREE.Group(); g.rotation.order = 'YXZ';
  const tm = trackMaterial(); const L = s.L, W = s.W, tx = W / 2 - 0.38;
  const wheels = [];
  for (const sx of [-1, 1]) {
    P(G.box, tm, 0.76, 1.15, L, sx * tx, 0.62, 0, g);
    for (let i = 0; i < s.wheels; i++) {
      const z = -L / 2 + 0.8 + i * (L - 1.6) / (s.wheels - 1);
      const w = P(G.cyl8, 0x2e2d26, 0.42, 0.14, 0.42, sx * (tx + 0.39), 0.55, z, g, false);
      w.rotation.z = Math.PI / 2; wheels.push(w);
    }
    if (s.skirts) P(G.box, s.col, 0.07, 0.95, L * 0.78, sx * (W / 2 + 0.14), 1.3, -0.1, g);
  }
  P(G.box, s.col, W - 1.4, 0.9, L - 0.5, 0, 0.8, 0, g);
  if (kind === 'sherman') {
    P(G.box, s.col, W, 0.8, L * 0.62, 0, 1.62, -L * 0.13, g);
    const gl = P(G.box, s.col, W * 0.94, 0.16, 2.3, 0, 1.45, L * 0.33, g); gl.rotation.x = 0.95;
    P(G.box, 0x3c4020, 0.5, 0.18, 0.5, -0.75, 2.04, L * 0.15, g);
    P(G.box, 0x3c4020, 0.5, 0.18, 0.5, 0.75, 2.04, L * 0.15, g);
    P(G.box, 0x3b3f22, W * 0.7, 0.12, 1.6, 0, 2.05, -L * 0.36, g);
    const st = P(G.plane, decalMat(TEX.star), 1.6, 1.6, 1, 0, 2.03, L * 0.05, g, false); st.rotation.x = -Math.PI / 2;
  } else if (kind === 'panzer4') {
    P(G.box, s.col, W * 0.98, 0.85, L * 0.86, 0, 1.62, 0, g);
    P(G.box, s.col, W * 0.7, 0.75, 0.3, 0, 1.6, L * 0.44, g);
    P(G.box, 0x5a5236, 0.4, 0.4, 0.3, -0.7, 1.9, L * 0.44, g);
  } else {
    P(G.box, s.col, W, 1.05, L * 0.9, 0, 1.68, 0, g);
    P(G.box, s.col, W * 0.94, 0.7, 0.35, 0, 1.55, L * 0.46, g);
    P(G.box, 0x3a3627, 0.6, 0.12, 0.5, -0.9, 2.25, L * 0.32, g);
  }
  if (kind !== 'sherman') {
    for (const sx of [-1, 1]) {
      const c = P(G.plane, decalMat(TEX.cross), 0.9, 0.9, 1, sx * (W / 2 + (s.skirts ? 0.2 : 0.03)), 1.55, -0.6, g, false);
      c.rotation.y = sx * Math.PI / 2;
    }
  }
  const tur = new THREE.Group(); g.add(tur);
  let gy, gz;
  if (kind === 'sherman') {
    tur.position.set(0, 2.0, -0.35);
    P(G.cyl, s.tur, 1.25, 0.95, 1.3, 0, 0.48, 0, tur);
    P(G.box, s.tur, 1.7, 0.75, 1.1, 0, 0.45, -1.0, tur);
    P(G.box, s.tur, 1.1, 0.72, 0.45, 0, 0.45, 1.3, tur);
    P(G.cyl8, s.tur, 0.42, 0.3, 0.42, 0.45, 1.08, -0.25, tur);
    for (const sx of [-1, 1]) {
      const d = P(G.plane, decalMat(TEX.star), 1.0, 1.0, 1, sx * 1.27, 0.5, 0.05, tur, false);
      d.rotation.y = sx * Math.PI / 2;
    }
    crewHead(tur, 0.45, 1.45, -0.25, 'us');
    gy = 0.45; gz = 1.5;
  } else if (kind === 'panzer4') {
    tur.position.set(0, 2.05, -0.1);
    P(G.box, s.tur, 2.0, 0.95, 2.3, 0, 0.48, 0, tur);
    P(G.box, s.tur, 2.2, 0.8, 0.9, 0, 0.45, -1.5, tur);
    for (const sx of [-1, 1]) P(G.box, s.tur, 0.06, 0.9, 2.4, sx * 1.35, 0.5, -0.2, tur);
    P(G.cyl8, s.tur, 0.42, 0.38, 0.42, 0, 1.12, -0.6, tur);
    crewHead(tur, 0, 1.55, -0.6, 'de');
    gy = 0.45; gz = 1.15;
  } else {
    tur.position.set(0, 2.2, -0.2);
    P(G.box, s.tur, 2.7, 1.05, 3.0, 0, 0.53, 0, tur);
    P(G.box, s.tur, 1.3, 0.95, 0.5, 0, 0.52, 1.65, tur);
    P(G.cyl8, s.tur, 0.46, 0.36, 0.46, -0.65, 1.22, -0.5, tur);
    crewHead(tur, -0.65, 1.62, -0.5, 'de');
    gy = 0.5; gz = 1.85;
  }
  const gun = P(G.cyl, 0x3a3b2c, s.gunR, s.gun, s.gunR, 0, gy, gz + s.gun / 2, tur); gun.rotation.x = Math.PI / 2;
  if (kind !== 'sherman') {
    const mb = P(G.cyl8, 0x34352a, s.gunR * 2.2, 0.5, s.gunR * 2.2, 0, gy, gz + s.gun, tur); mb.rotation.x = Math.PI / 2;
  }
  const muzzle = new THREE.Object3D(); muzzle.position.set(0, gy, gz + s.gun + 0.35); tur.add(muzzle);
  g.userData = { turret: tur, gun, muzzle, trackMat: tm, wheels, L };
  return g;
}

/* ---------- veículo de construção (trator D7 do Corpo de Engenheiros) ---------- */
function makeDozer() {
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  const tm = trackMaterial(), col = 0x575a31, L = 6.2;
  for (const sx of [-1, 1]) P(G.box, tm, 0.95, 1.15, L, sx * 1.4, 0.62, 0, g);
  P(G.box, col, 2.0, 0.9, L - 0.6, 0, 0.9, 0, g);
  P(G.box, col, 1.9, 1.5, 3.2, 0, 1.95, 0.9, g);
  P(G.box, 0x2c2d1f, 1.5, 1.0, 0.1, 0, 1.95, 2.52, g);
  P(G.cyl8, 0x2b2b25, 0.13, 1.6, 0.13, 0.5, 3.3, 1.6, g);
  for (const sx of [-1, 1]) for (const z of [-2.4, -0.7]) P(G.box, 0x3d3f23, 0.12, 2.4, 0.12, sx * 1.15, 2.6, z, g);
  P(G.box, 0x3d3f23, 2.6, 0.12, 2.0, 0, 3.8, -1.55, g);
  P(G.box, 0x3a3b25, 0.9, 0.5, 0.8, 0, 1.6, -1.5, g);
  crewHead(g, 0, 2.55, -1.5, 'us');
  P(G.box, 0x4a4c2c, 4.4, 1.6, 0.35, 0, 1.05, L / 2 + 1.0, g);
  for (const sx of [-1, 1]) {
    const a = P(G.box, 0x3d3f23, 0.25, 0.25, 2.8, sx * 1.95, 1.0, L / 2 - 0.4, g); a.rotation.x = 0.1;
    const st = P(G.plane, decalMat(TEX.star), 1.1, 1.1, 1, sx * 0.97, 1.95, 1.0, g, false); st.rotation.y = sx * Math.PI / 2;
  }
  // kit de construção (caixas e vigas) preso atrás
  P(G.box, 0x6b5a3a, 1.6, 0.8, 1.1, 0, 1.75, -2.65, g);
  P(G.box, 0x7a6845, 0.2, 0.2, 2.6, -0.5, 2.25, -2.4, g);
  g.userData = { trackMat: tm, wheels: [], L };
  return g;
}

/* ---------- barcaça Higgins (LCVP) ---------- */
function makeLCVP(n) {
  const g = new THREE.Group(); const c = 0x66757b, c2 = 0x56636a;
  P(G.box, c2, 3.6, 0.7, 11, 0, 0.0, 0, g);
  P(G.box, c, 0.22, 2.0, 11, -1.7, 1.0, 0, g);
  P(G.box, c, 0.22, 2.0, 11, 1.7, 1.0, 0, g);
  P(G.box, c, 3.6, 2.4, 1.4, 0, 1.2, -5.0, g);
  P(G.box, 0x3e4a50, 1.0, 0.9, 0.9, 1.05, 2.8, -4.7, g);
  crewHead(g, -0.9, 2.65, -4.6, 'us');
  const ramp = new THREE.Group(); ramp.position.set(0, 0.0, 5.4); g.add(ramp);
  P(G.box, c, 3.4, 2.4, 0.25, 0, 1.2, 0, ramp);
  const troops = [];
  for (let i = 0; i < n; i++) {
    const s = makeSoldier('us', 'rifle');
    s.position.set(i % 2 ? -0.75 : 0.75, 0.3, 3.6 - Math.floor(i / 2) * 1.55);
    s.scale.setScalar(0.95); g.add(s); troops.push(s);
  }
  g.userData = { ramp, troops };
  return g;
}

/* ---------- LST (navio de desembarque de tanques) ---------- */
function makeLST() {
  const g = new THREE.Group(); const W = 15, L = 90, c = 0x6d757b, cd = 0x5d656b;
  P(G.box, c, W, 7, L, 0, 0.5, 0, g);
  P(G.box, 0x4f5559, W - 1, 0.3, L - 4, 0, 4.1, -1, g);
  for (const sx of [-1, 1]) P(G.box, cd, 0.4, 1.0, L, sx * (W / 2 - 0.2), 4.6, 0, g);
  const doorL = new THREE.Group(); doorL.position.set(-W / 2, 0.5, L / 2); g.add(doorL);
  P(G.box, cd, W / 2, 7, 0.5, W / 4, 0, 0.2, doorL);
  const doorR = new THREE.Group(); doorR.position.set(W / 2, 0.5, L / 2); g.add(doorR);
  P(G.box, cd, W / 2, 7, 0.5, -W / 4, 0, 0.2, doorR);
  const ramp = new THREE.Group(); ramp.position.set(0, -1.6, L / 2 - 0.3); g.add(ramp);
  P(G.box, 0x4b5156, W * 0.56, 0.35, 6.5, 0, 0, 3.25, ramp);
  ramp.rotation.x = -Math.PI / 2;
  // superestrutura na popa
  P(G.box, c, W * 0.75, 5, 10, 0, 6.6, -L / 2 + 8, g);
  P(G.box, cd, W * 0.55, 3, 6, 0, 10.6, -L / 2 + 8, g);
  P(G.box, 0x2b3033, W * 0.56, 0.6, 0.2, 0, 11.2, -L / 2 + 11.05, g);
  P(G.cyl8, 0x3e4448, 0.25, 12, 0.25, 0, 17, -L / 2 + 8, g);
  for (const z of [L / 2 - 8, L / 2 - 20, -L / 2 + 18]) for (const sx of [-1, 1]) P(G.cyl8, cd, 1.1, 1.2, 1.1, sx * 5, 5, z, g);
  // carga no convés
  P(G.box, 0x4f5428, 2.6, 2.2, 5.5, -3.5, 5.3, 6, g);
  P(G.box, 0x4f5428, 2.6, 2.2, 5.5, 3.5, 5.3, -4, g);
  // balão de barragem
  P(G.sph, 0xb2b5ad, 3.6, 3.6, 8.5, 0, 48, -6, g);
  for (const r of [0, 1, 2]) { const f = P(G.box, 0xa3a69e, 0.15, 3.0, 2.5, 0, 48, -14, g); f.rotation.z = r * Math.PI * 2 / 3; }
  P(G.cyl8, 0x2a2a2a, 0.05, 44, 0.05, 0, 26, -4, g, false);
  const st = P(G.plane, decalMat(TEX.star), 4, 4, 1, W / 2 + 0.05, 1.5, -10, g, false); st.rotation.y = Math.PI / 2;
  g.userData = { doorL, doorR, ramp, L };
  return g;
}

/* ---------- navios ao largo (bombardeio naval) ---------- */
function makeWarship(len, big) {
  const g = new THREE.Group(); const c = 0x5f676c, w = big ? 18 : 10;
  P(G.box, c, w, 5, len, 0, 1, 0, g, false);
  const bow = P(G.cone4, c, w * 0.7, len * 0.18, 5, 0, 1, len / 2 + len * 0.08, g, false); bow.rotation.x = Math.PI / 2; bow.rotation.y = Math.PI / 4;
  P(G.box, c, w * 0.6, 6, len * 0.22, 0, 6, len * 0.05, g, false);
  P(G.box, 0x50575c, w * 0.4, 4, len * 0.1, 0, 10.5, len * 0.08, g, false);
  P(G.cyl8, 0x484d50, w * 0.13, 7, w * 0.13, 0, 9, -len * 0.08, g, false);
  if (big) P(G.cyl8, 0x484d50, w * 0.13, 7, w * 0.13, 0, 9, -len * 0.2, g, false);
  const guns = [];
  for (const z of [len * 0.3, len * 0.2, -len * 0.3]) {
    const t = new THREE.Group(); t.position.set(0, 4.2, z); g.add(t);
    P(G.box, 0x50575c, w * 0.42, 2, w * 0.5, 0, 0, 0, t, false);
    const b = P(G.cyl8, 0x3a3f42, 0.35, big ? 12 : 7, 0.35, 0, 0.2, big ? 7 : 4.5, t, false); b.rotation.x = Math.PI / 2;
    guns.push(t);
  }
  g.userData = { guns, len };
  return g;
}

/* ---------- construções ---------- */
function foundation(g, w, d, col) { P(G.box, col || 0x5d5444, w + 1, 4, d + 1, 0, -2.0, 0, g, false); }
function sandbagRing(g, r, n, gapFrom, gapTo) {
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2;
    if (gapFrom !== undefined && a > gapFrom && a < gapTo) continue;
    const b = P(G.box, i % 2 ? 0x8a7a58 : 0x7e7051, 1.4, 0.55, 0.7, Math.sin(a) * r, 0.3, Math.cos(a) * r, g);
    b.rotation.y = a;
    const b2 = P(G.box, 0x857654, 1.3, 0.5, 0.65, Math.sin(a + 0.15) * r, 0.82, Math.cos(a + 0.15) * r, g);
    b2.rotation.y = a + 0.15;
  }
}
function flagPole(g, x, z, h, tex) {
  P(G.cyl8, 0x8a8a84, 0.08, h, 0.08, x, h / 2, z, g);
  const f = P(G.plane, decalMat(tex), 2.4, 1.6, 1, x + 1.25, h - 0.9, z, g, false);
  return f;
}
function staticGunner(g, team, x, z, ry) {
  const s = makeSoldier(team, 'rifle'); s.position.set(x, -0.45, z); s.rotation.y = ry || 0;
  s.userData.legL.rotation.x = -1.3; s.userData.legR.rotation.x = 0.4;
  s.userData.armL.rotation.x = -1.3; s.userData.armR.rotation.x = -1.2;
  if (s.userData.rifle) s.visible = true;
  g.add(s); return s;
}

function makeBuilding(kind) {
  const g = new THREE.Group(); const ud = {};
  const OD = 0x59603a, ODd = 0x4b5131;
  switch (kind) {
    case 'hq': {
      foundation(g, 16, 14);
      P(G.box, OD, 12, 4.2, 9, 0, 2.1, -0.5, g);
      const r = P(G.roof, ODd, 12.8, 2.2, 10, 0, 4.2, -0.5, g);
      P(G.box, 0x2b2d1f, 2.2, 2.6, 0.1, 0, 1.3, 4.02, g);
      for (const x of [-4, 4]) P(G.box, 0x2b3a3a, 1.6, 1.1, 0.1, x, 2.6, 4.02, g);
      for (const sx of [-1, 1]) { P(G.box, 0x8a7a58, 0.8, 1.1, 13, sx * 7.6, 0.55, 0, g); }
      P(G.box, 0x8a7a58, 15, 1.1, 0.8, 0, 0.55, -6.6, g);
      P(G.box, 0x8a7a58, 5, 1.1, 0.8, -5.2, 0.55, 6.6, g); P(G.box, 0x8a7a58, 5, 1.1, 0.8, 5.2, 0.55, 6.6, g);
      P(G.cyl8, 0x3a3a34, 0.12, 15, 0.12, -5, 7.5, -4, g);
      P(G.box, 0x3a3a34, 3, 0.08, 0.08, -5, 14.6, -4, g);
      ud.flag = flagPole(g, 5.5, 5.2, 9, TEX.usflag);
      // jipe
      P(G.box, 0x4f5428, 1.7, 0.8, 3.4, 9.8, 0.9, 3, g); P(G.box, 0x3c4020, 1.5, 0.6, 0.1, 9.8, 1.6, 3.8, g);
      for (const sx of [-1, 1]) for (const z of [1.9, 4.1]) { const w = P(G.cyl8, 0x222, 0.42, 0.3, 0.42, 9.8 + sx * 0.85, 0.42, z, g); w.rotation.z = Math.PI / 2; }
      const st = P(G.plane, decalMat(TEX.star), 5, 5, 1, 0, 6.5, -0.5, g, false); st.rotation.x = -Math.PI / 2;
      r.castShadow = true; break;
    }
    case 'depot': {
      foundation(g, 12, 10);
      for (let i = 0; i < 7; i++) P(G.box, i % 2 ? 0x6b5a3a : 0x786644, 2.2, 1.6, 1.6, -4 + (i % 4) * 2.4, 0.8 + Math.floor(i / 4) * 1.6, -2.5, g);
      for (let i = 0; i < 10; i++) P(G.cyl8, 0x3f4a2a, 0.5, 1.4, 0.5, 1 + (i % 5) * 1.1, 0.7, 1.2 + Math.floor(i / 5) * 1.1, g);
      P(G.roof, 0x5d5f3c, 6, 2.4, 4, -2.5, 0, 2.2, g);
      P(G.box, 0x4f5428, 2.4, 2.0, 5.0, 5.6, 1.4, -1.0, g);
      P(G.box, 0x5a5e35, 2.4, 1.2, 2.0, 5.6, 1.0, 2.6, g);
      break;
    }
    case 'barracks': {
      foundation(g, 15, 10);
      const q = P(G.halfcyl, 0x5f6640, 4.6, 14, 4.6, 0, 0, 0, g); q.rotation.z = Math.PI / 2;
      for (const sx of [-1, 1]) P(G.box, 0x4a5131, 0.2, 4.4, 9.0, sx * 7.0, 2.2, 0, g);
      P(G.box, 0x2b2d1f, 1.8, 2.4, 0.1, 0, 1.2, 4.62, g);
      for (const x of [-4.5, 4.5]) P(G.box, 0x2b3a3a, 1.2, 0.9, 0.12, x, 1.6, 4.5, g);
      for (let i = 0; i < 4; i++) P(G.box, 0x8a7a58, 1.3, 0.55, 0.7, -5 + i * 1.4, 0.28, 6.2, g);
      ud.flag = flagPole(g, 7.5, 5.5, 7, TEX.usflag);
      break;
    }
    case 'factory': {
      foundation(g, 20, 16);
      P(G.box, 0x5a5f3c, 20, 7, 14, 0, 3.5, -1, g);
      const r = P(G.halfcyl, 0x4c5233, 7.2, 20.6, 3.0, 0, 7, -1, g); r.rotation.z = Math.PI / 2;
      P(G.box, 0x23251a, 9, 6, 0.12, 0, 3, 6.03, g);
      for (const sx of [-1, 1]) P(G.box, 0x3a3d28, 0.5, 9, 0.5, sx * 9.5, 4.5, 7.3, g);
      P(G.box, 0x3a3d28, 19.6, 0.6, 0.6, 0, 9, 7.3, g);
      P(G.box, 0x2d2e22, 1.5, 1.4, 1.2, 3, 8.2, 7.3, g);
      P(G.cyl8, 0x3c3c34, 0.6, 5, 0.6, -7, 11, -5, g);
      P(G.box, 0x4f5428, 3.2, 1.3, 5.5, 6.5, 0.9, 9.5, g);
      break;
    }
    case 'mgnest': {
      foundation(g, 7, 7, 0x6e6048);
      sandbagRing(g, 2.8, 12);
      const t = new THREE.Group(); t.position.set(0, 1.3, 0); g.add(t);
      P(G.box, 0x2b2b26, 0.18, 0.2, 1.6, 0, 0, 0.6, t); P(G.box, 0x3a3a30, 0.3, 0.3, 0.6, 0, 0, 0, t);
      P(G.cyl8, 0x2b2b26, 0.05, 1.1, 0.05, 0, -0.55, 0.2, t);
      staticGunner(t, 'us', 0, -0.9, 0).position.y = -1.4;
      const m = new THREE.Object3D(); m.position.set(0, 0, 1.5); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'atgun': {
      foundation(g, 7, 7, 0x6e6048);
      sandbagRing(g, 3.2, 12, Math.PI * 0.75, Math.PI * 1.25);
      const t = new THREE.Group(); t.position.set(0, 0.9, 0); g.add(t);
      P(G.box, 0x4f5428, 2.4, 1.3, 0.12, 0, 0.5, 0.6, t);
      const b = P(G.cyl8, 0x3a3b2c, 0.1, 3.6, 0.1, 0, 0.45, 2.2, t); b.rotation.x = Math.PI / 2;
      for (const sx of [-1, 1]) { const w = P(G.cyl8, 0x222, 0.55, 0.3, 0.55, sx * 1.0, -0.3, 0.2, t); w.rotation.z = Math.PI / 2; const tr = P(G.box, 0x4f5428, 0.18, 0.18, 2.6, sx * 0.5, -0.5, -1.3, t); tr.rotation.y = sx * 0.25; }
      staticGunner(t, 'us', 0.7, -0.6, 0).position.y = -1.0;
      staticGunner(t, 'us', -0.9, -1.4, 0.3).position.y = -1.0;
      const m = new THREE.Object3D(); m.position.set(0, 0.45, 4.2); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'hospital': {
      foundation(g, 14, 12);
      P(G.roof, 0xcfcab6, 12, 4.6, 8, 0, 0, -1, g);
      P(G.box, 0xc7c2ad, 12, 0.8, 8, 0, 0.4, -1, g);
      for (const sx of [-1, 1]) {
        const c = P(G.plane, decalMat(TEX.redcross), 2.6, 2.6, 1, sx * 1.0, 2.9, -1, g, false);
        c.rotation.x = -Math.PI / 2; c.rotation.y = sx * 0.9;
      }
      for (let i = 0; i < 3; i++) P(G.box, 0x7e7a5c, 0.9, 0.3, 2.2, -3 + i * 3, 0.4, 5, g);
      P(G.box, 0xc9c4ae, 2.0, 2.0, 4.4, 6.5, 1.6, 4.2, g);
      const c2 = P(G.plane, decalMat(TEX.redcross), 1.4, 1.4, 1, 7.52, 2, 4.2, g, false); c2.rotation.y = Math.PI / 2;
      break;
    }
    case 'bunker': {
      foundation(g, 10, 9, 0x6f6c66);
      P(G.box, 0x8b8880, 9, 3.6, 8, 0, 1.8, 0, g);
      P(G.box, 0x96938a, 10, 0.8, 9, 0, 3.9, 0.3, g);
      P(G.box, 0x111111, 4.4, 0.55, 0.3, 0, 2.6, 4.02, g);
      for (const sx of [-1, 1]) { const e = P(G.roof, 0x5b5a3e, 3.5, 3.3, 8.5, sx * 5.6, 0, 0, g); e.rotation.y = Math.PI / 2; }
      P(G.roof, 0x5b5a3e, 9.5, 1.2, 8, 0, 4.3, -0.2, g);
      const t = new THREE.Group(); t.position.set(0, 2.6, 3.6); g.add(t);
      P(G.box, 0x222, 0.15, 0.15, 1.2, 0, 0, 0.4, t);
      const m = new THREE.Object3D(); m.position.set(0, 0, 1.2); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'nest_de': {
      foundation(g, 7, 7, 0x6e6048);
      sandbagRing(g, 2.8, 12);
      const t = new THREE.Group(); t.position.set(0, 1.3, 0); g.add(t);
      P(G.box, 0x1e1e1c, 0.14, 0.16, 1.5, 0, 0, 0.6, t); P(G.box, 0x2c2c28, 0.25, 0.3, 0.5, 0, 0, 0, t);
      staticGunner(t, 'de', 0, -0.9, 0).position.y = -1.4;
      const m = new THREE.Object3D(); m.position.set(0, 0, 1.4); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'dehq': {
      foundation(g, 26, 20, 0x6f6658);
      P(G.box, 0xb8ad98, 22, 10, 13, 0, 5, 0, g);
      P(G.roof, 0x4a4e57, 22.6, 6, 14, 0, 10, 0, g);
      for (const sx of [-1, 1]) {
        P(G.cyl, 0xb0a590, 2.8, 14, 2.8, sx * 11.5, 7, 4.5, g);
        P(G.cone, 0x4a4e57, 3.3, 5, 3.3, sx * 11.5, 16.5, 4.5, g);
      }
      for (let i = 0; i < 6; i++) for (const y of [3, 7]) P(G.box, 0x2d3236, 1.2, 1.8, 0.12, -7.5 + i * 3, y, 6.53, g);
      P(G.box, 0x3d2c1e, 2.4, 3.4, 0.14, 0, 1.7, 6.55, g);
      ud.flag = flagPole(g, -3, 10.5, 10, TEX.deflag);
      flagPole(g, 4, 10.5, 10, TEX.deflag);
      for (const x of [-8, 8]) { const s = new THREE.Group(); s.position.set(x, 0, 11); g.add(s); sandbagRing(s, 2.4, 10); }
      P(G.cyl8, 0x3a3a34, 0.12, 12, 0.12, 9, 16, -3, g);
      P(G.box, 0x51503f, 2, 1.1, 4.6, -14, 1, 9, g);
      break;
    }
  }
  g.userData = Object.assign(g.userData || {}, ud);
  return g;
}
