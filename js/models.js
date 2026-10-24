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

/* ---------- geometria mesclada em cache: muitos detalhes, poucas chamadas de desenho ---------- */
G.boxS = new THREE.BoxGeometry(1, 1, 1, 3, 2, 3);
G.torso = new THREE.CylinderGeometry(1, 0.8, 1, 8);
G.flare = new THREE.CylinderGeometry(0.74, 1, 1, 12);
G.cyl6 = new THREE.CylinderGeometry(1, 1, 1, 6);
G.cyl12 = new THREE.CylinderGeometry(1, 1, 1, 12);
G.dome = new THREE.SphereGeometry(1, 14, 6, 0, Math.PI * 2, 0, Math.PI / 2);
const VC_MAT = new THREE.MeshLambertMaterial({ vertexColors: true });
const _geoCache = new Map();
function merged(key, fn) {
  let g = _geoCache.get(key);
  if (!g) { const B = new GeoBuilder(); fn(B); g = B.build(); _geoCache.set(key, g); }
  return g;
}
function VM(geo, parent, x, y, z, cast) {
  const m = new THREE.Mesh(geo, VC_MAT); m.position.set(x || 0, y || 0, z || 0);
  m.castShadow = cast !== false; if (parent) parent.add(m); return m;
}
// perfil lateral (z = frente, y = cima) extrudado na largura (eixo x)
function sideProfile(pts, width, steps) {
  const sh = new THREE.Shape(); pts.forEach((p, i) => i ? sh.lineTo(p[0], p[1]) : sh.moveTo(p[0], p[1]));
  const g = new THREE.ExtrudeGeometry(sh, { depth: width, bevelEnabled: false, steps: steps || 1 });
  g.rotateY(-Math.PI / 2); g.translate(width / 2, 0, 0); return g;
}
// planta vista de cima ([x, z]) extrudada na altura
function planProfile(pts, h, steps) {
  const sh = new THREE.Shape(); pts.forEach((p, i) => i ? sh.lineTo(p[0], -p[1]) : sh.moveTo(p[0], -p[1]));
  const g = new THREE.ExtrudeGeometry(sh, { depth: h, bevelEnabled: false, steps: steps || 1 });
  g.rotateX(-Math.PI / 2); return g;
}
// pintura: camuflagem em manchas + lama nas partes baixas + leve variação de tom
const _pc = new THREE.Color(), MUD = new THREE.Color(0x5b4d37);
function paintFn(paint, camo, mudH) {
  const cA = camo ? new THREE.Color(camo[0]) : null, cB = camo ? new THREE.Color(camo[1]) : null;
  return (x, y, z, base) => {
    _pc.copy(base);
    if (cA && base.getHex() === paint) {
      const n = Math.sin(x * 1.9 + z * 0.55 + y * 0.8) + 0.8 * Math.sin(z * 1.25 - x * 0.9 + 2.1) + 0.6 * Math.sin(y * 2.2 + x * 0.6 - z * 0.7);
      if (n > 0.85) _pc.copy(cA); else if (n < -0.95) _pc.copy(cB);
    }
    if (mudH) { const k = clamp((mudH - y) / mudH, 0, 1) * 0.55; if (k > 0) _pc.lerp(MUD, k); }
    return _pc.multiplyScalar(1 + Math.sin(x * 7.1 + z * 3.3 + y * 5.7) * 0.035);
  };
}

/* ---------- soldados e civis ---------- */
const SOLDIER_PAL = {
  us: { jacket: 0x6b6944, pants: 0x5d5a3e, helm: 0x4f5535, band: 0x3c4229, web: 0x948a63, boot: 0x3d2e1f, legging: 0x9c8f68, skin: 0xd2a17a, pack: 0x857b55 },
  de: { jacket: 0x5c675b, pants: 0x535b51, helm: 0x58625b, band: 0x58625b, web: 0x2a2621, boot: 0x1d1b19, legging: 0x1d1b19, skin: 0xd2a17a, collar: 0x3c4a3f, pack: 0x6b6a52 },
};
const CIV_PALS = [
  [0x3c4a66, 0x2f2f35], [0x6b4b3a, 0x4a3f33], [0x5d5d5d, 0x3a3a3a], [0x7b6b4a, 0x2f2f35], [0x3f5a48, 0x4a3f33], [0x7a3e3e, 0x3a3a3a],
].map(([j, p]) => ({ jacket: j, pants: p, helm: 0x2a2a2e, band: 0x2a2a2e, web: 0x4a3f33, boot: 0x2b2117, legging: p, skin: 0xd8ab84, pack: j }));

function soldierBody(B, team, pal) {
  const sk = pal.skin, us = team === 'us', de = team === 'de';
  B.add(G.box, pal.pants, 0.46, 0.26, 0.3, 0, 1.0, 0);
  B.add(G.torso, pal.jacket, 0.33, 0.62, 0.2, 0, 1.43, 0);
  for (const sx of [-1, 1]) {
    B.add(G.sph, pal.jacket, 0.13, 0.12, 0.14, sx * 0.29, 1.69, 0);
    B.add(G.box, de ? pal.collar : 0x5c5a3a, 0.1, 0.11, 0.03, sx * 0.13, 1.56, 0.2);
  }
  B.add(G.cyl8, sk, 0.085, 0.12, 0.085, 0, 1.79, 0.01);
  B.add(G.sph, sk, 0.18, 0.21, 0.19, 0, 1.99, 0.02);
  B.add(G.box, 0xc08e68, 0.05, 0.08, 0.06, 0, 1.96, 0.2);
  for (const sx of [-1, 1]) {
    B.add(G.box, 0x2a2018, 0.04, 0.025, 0.02, sx * 0.07, 2.02, 0.195);
    B.add(G.sph, sk, 0.04, 0.06, 0.03, sx * 0.18, 1.98, 0.0);
  }
  if (us) {
    B.add(G.dome, pal.helm, 0.27, 0.25, 0.29, 0, 2.03, 0);
    B.add(G.cyl12, pal.helm, 0.3, 0.035, 0.32, 0, 2.03, 0);
    B.add(G.cyl12, pal.band, 0.276, 0.06, 0.296, 0, 2.09, 0);
    for (const sx of [-1, 1]) B.add(G.box, pal.web, 0.025, 0.2, 0.025, sx * 0.17, 1.94, 0.05);
    B.add(G.box, pal.web, 0.62, 0.08, 0.38, 0, 1.13, 0);
    for (const x of [-0.24, -0.12, 0.12, 0.24]) B.add(G.box, pal.web, 0.1, 0.12, 0.07, x, 1.13, 0.2);
    for (const sx of [-1, 1]) {
      B.add(G.box, pal.web, 0.05, 0.62, 0.03, sx * 0.12, 1.45, 0.205, 0, 0, sx * 0.1);
      B.add(G.box, pal.web, 0.05, 0.6, 0.03, sx * 0.1, 1.45, -0.205);
    }
    B.add(G.box, 0x5f6268, 0.64, 0.09, 0.4, 0, 1.26, 0);              // cinto salva-vidas do Dia D
    B.add(G.box, 0x6b6747, 0.22, 0.18, 0.1, -0.08, 1.36, 0.22);        // bolsa da máscara de gás no peito
    B.add(G.box, pal.pack, 0.34, 0.4, 0.15, 0, 1.5, -0.27);
    B.add(G.cyl8, 0x6d6a4c, 0.08, 0.36, 0.08, 0, 1.74, -0.27, 0, 0, Math.PI / 2);
    B.add(G.box, 0x4f4f45, 0.13, 0.3, 0.03, 0, 1.2, -0.36);
    B.add(G.cyl8, 0x5e4a30, 0.02, 0.22, 0.02, 0, 1.42, -0.36);
    B.add(G.cyl8, 0x5f6040, 0.075, 0.17, 0.075, 0.28, 1.03, -0.1);
  } else if (de) {
    B.add(G.dome, pal.helm, 0.25, 0.24, 0.27, 0, 2.05, 0);
    B.add(G.flare, pal.helm, 0.3, 0.14, 0.32, 0, 2.0, -0.01, -0.12, 0, 0);
    B.add(G.box, pal.collar, 0.34, 0.08, 0.24, 0, 1.76, 0);
    B.add(G.box, pal.web, 0.62, 0.08, 0.38, 0, 1.13, 0);
    for (const sx of [-1, 1]) {
      for (const x of [0.1, 0.18, 0.26]) B.add(G.box, pal.web, 0.075, 0.12, 0.07, sx * x, 1.15, 0.2);
      B.add(G.box, pal.web, 0.05, 0.62, 0.03, sx * 0.11, 1.45, 0.205, 0, 0, sx * 0.1);
      B.add(G.box, pal.collar, 0.12, 0.04, 0.16, sx * 0.29, 1.79, 0);
    }
    B.add(G.box, pal.web, 0.05, 0.6, 0.03, 0, 1.45, -0.205);
    B.add(G.box, pal.pack, 0.2, 0.2, 0.08, 0.25, 1.02, -0.15);
    B.add(G.cyl8, 0x4a4c3a, 0.07, 0.16, 0.07, 0.2, 1.0, -0.26);
    B.add(G.cyl8, 0x4f5348, 0.08, 0.34, 0.08, -0.05, 1.3, -0.28, 0, 0, 0.7);
    B.add(G.cyl8, 0x8a6a40, 0.03, 0.3, 0.03, -0.1, 1.2, 0.22);
    B.add(G.cyl8, 0x4a4c48, 0.055, 0.1, 0.055, -0.1, 1.38, 0.22);
  } else {
    B.add(G.cyl12, pal.helm, 0.22, 0.07, 0.23, 0, 2.17, 0);
    B.add(G.box, pal.helm, 0.26, 0.03, 0.12, 0, 2.15, 0.2);
    B.add(G.box, 0xe6e0d0, 0.2, 0.12, 0.03, 0, 1.65, 0.205);
  }
}
const WEAPONS = {
  rifle: (B, team) => {
    const wood = team === 'de' ? 0x5a3a22 : 0x6e4527, met = 0x2a2b2b;
    B.add(G.box, wood, 0.07, 0.15, 0.3, 0, -0.04, -0.44);
    B.add(G.box, wood, 0.06, 0.08, 0.2, 0, -0.005, -0.2);
    B.add(G.box, met, 0.07, 0.09, 0.32, 0, 0.01, 0.05);
    B.add(G.box, wood, 0.07, 0.07, 0.44, 0, -0.005, 0.4);
    B.add(G.cyl8, met, 0.022, team === 'de' ? 0.42 : 0.34, 0.022, 0, 0.01, team === 'de' ? 0.8 : 0.76, Math.PI / 2, 0, 0);
    B.add(G.box, met, 0.02, 0.05, 0.02, 0, 0.05, 0.62);
    if (team === 'de') B.add(G.cyl8, met, 0.015, 0.1, 0.015, 0.06, 0.03, 0.04, 0, 0, Math.PI / 2);
    B.add(G.box, 0x4a3f2a, 0.015, 0.02, 0.6, -0.04, -0.07, 0.05);
  },
  bazooka: (B) => {
    B.add(G.cyl12, 0x4a4f2e, 0.075, 1.5, 0.075, 0, 0, 0.1, Math.PI / 2, 0, 0);
    B.add(G.cone, 0x4a4f2e, 0.11, 0.18, 0.11, 0, 0, -0.68, -Math.PI / 2, 0, 0);
    B.add(G.box, 0x6e4527, 0.06, 0.12, 0.28, 0, -0.1, -0.25);
    B.add(G.box, 0x2a2b2b, 0.04, 0.16, 0.05, 0, -0.12, 0.15);
    B.add(G.box, 0x2a2b2b, 0.1, 0.1, 0.02, 0, 0.1, 0.55);
  },
  pzschreck: (B) => {
    B.add(G.cyl12, 0x56584a, 0.09, 1.6, 0.09, 0, 0, 0.1, Math.PI / 2, 0, 0);
    B.add(G.box, 0x5d6052, 0.5, 0.42, 0.025, -0.12, 0.08, 0.3);
    B.add(G.box, 0x1b1b1b, 0.12, 0.08, 0.03, -0.1, 0.12, 0.3);
    B.add(G.box, 0x2a2b2b, 0.04, 0.16, 0.05, 0, -0.13, 0.05);
    B.add(G.cyl12, 0x45473b, 0.11, 0.06, 0.11, 0, 0, -0.7, Math.PI / 2, 0, 0);
  },
};
function makeSoldier(team, kind) {
  const civ = team === 'civ', variant = civ ? (Math.random() * CIV_PALS.length) | 0 : 0;
  const pal = civ ? CIV_PALS[variant] : SOLDIER_PAL[team], key = team + variant;
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  VM(merged('body' + key, B => soldierBody(B, team, pal)), g, 0, 0, 0, true);
  const thighG = merged('thigh' + key, B => B.add(G.box, pal.pants, 0.2, 0.5, 0.23, 0, -0.25, 0));
  const shinG = merged('shin' + key, B => {
    B.add(G.box, pal.pants, 0.18, 0.3, 0.2, 0, -0.15, 0);
    B.add(G.box, team === 'de' ? pal.boot : pal.legging, 0.195, team === 'de' ? 0.34 : 0.2, 0.215, 0, team === 'de' ? -0.3 : -0.34, 0);
    B.add(G.box, pal.boot, 0.19, 0.12, 0.3, 0, -0.46, 0.05);
  });
  const upperG = merged('upper' + key, B => B.add(G.box, pal.jacket, 0.15, 0.38, 0.16, 0, -0.18, 0));
  const foreG = merged('fore' + key, B => {
    B.add(G.box, pal.jacket, 0.14, 0.3, 0.15, 0, -0.14, 0);
    B.add(G.sph, pal.skin, 0.075, 0.08, 0.075, 0, -0.33, 0.02);
  });
  const leg = (x) => {
    const th = new THREE.Group(); th.position.set(x, 0.98, 0); VM(thighG, th, 0, 0, 0, false);
    const kn = new THREE.Group(); kn.position.y = -0.5; th.add(kn); VM(shinG, kn, 0, 0, 0, false);
    g.add(th); return [th, kn];
  };
  const arm = (x) => {
    const sh = new THREE.Group(); sh.position.set(x, 1.68, 0); VM(upperG, sh, 0, 0, 0, false);
    const el = new THREE.Group(); el.position.y = -0.36; sh.add(el); VM(foreG, el, 0, 0, 0, false);
    g.add(sh); return [sh, el];
  };
  const [legL, shinL] = leg(-0.13), [legR, shinR] = leg(0.13);
  const [armL, foreL] = arm(-0.39), [armR, foreR] = arm(0.39);
  let rifle = null, tube = false;
  if (!civ) {
    const wk = kind === 'bazooka' ? 'bazooka' : kind === 'pzschreck' ? 'pzschreck' : 'rifle';
    rifle = new THREE.Group(); g.add(rifle);
    VM(merged('wpn' + wk + team, B => WEAPONS[wk](B, team)), rifle, 0, 0, 0, false);
    if (wk !== 'rifle') { tube = true; rifle.position.set(0.27, 1.84, 0.12); }
  }
  blob(g, 1.4);
  g.scale.setScalar(1.12);
  g.userData = { legL, legR, shinL, shinR, armL, armR, foreL, foreR, rifle, tube };
  return g;
}

/* ---------- tanques ---------- */
const TANKS = {
  sherman: { L: 6.9, W: 3.2, tw: 0.62, th: 1.15, paint: 0x55592e, camo: null, gy: 0.55, gz: 1.5, tur: [0, 2.15, -0.35] },
  panzer4: { L: 7.0, W: 3.3, tw: 0.6, th: 1.0, paint: 0x9c8a55, camo: [0x56603a, 0x6b4a33], gy: 0.42, gz: 1.25, tur: [0, 1.95, -0.2] },
  tiger: { L: 7.6, W: 4.2, tw: 0.75, th: 1.12, paint: 0x9a8a58, camo: [0x5c6640, 0x6e4f36], gy: 0.55, gz: 1.75, tur: [0, 2.05, -0.25] },
};
TEX.track2 = canvasTex(64, 16, (g) => {
  g.fillStyle = '#2b2925'; g.fillRect(0, 0, 64, 16);
  for (let x = 0; x < 64; x += 16) { g.fillStyle = '#4b4840'; g.fillRect(x, 0, 7, 16); g.fillStyle = '#5c584e'; g.fillRect(x + 2, 6, 3, 4); }
});
TEX.num = (txt) => canvasTex(96, 48, (g) => {
  g.font = 'bold 38px Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.lineWidth = 6; g.strokeStyle = '#f0ede2'; g.strokeText(txt, 48, 26); g.fillStyle = '#7a1c16'; g.fillText(txt, 48, 26);
});
const NUM_TEX = { panzer4: TEX.num('423'), tiger: TEX.num('112') };
function trackMaterial(rep) {
  const t = TEX.track2.clone(); t.needsUpdate = true;
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(rep || 1.2, 1);
  return new THREE.MeshLambertMaterial({ map: t });
}
function trackLoop(L, h, rs, ri) {
  const pts = [], arc = (cz, cy, r, a0, a1) => { for (let i = 0; i <= 6; i++) { const a = a0 + (a1 - a0) * i / 6; pts.push([cz + Math.cos(a) * r, cy + Math.sin(a) * r]); } };
  pts.push([-L / 2 + ri * 1.6, 0.02], [L / 2 - rs * 1.9, 0.02]);
  arc(L / 2 - rs, h - rs, rs, -1.9, Math.PI / 2);
  arc(-L / 2 + ri, h - ri, ri, Math.PI / 2, Math.PI * 1.42);
  return sideProfile(pts, 1, 1);
}
function wheel(B, x, y, z, r, w, rubber, hub) {
  B.add(G.cyl12, rubber, r, w, r, x, y, z, 0, 0, Math.PI / 2);
  B.add(G.cyl12, hub, r * 0.72, w + 0.04, r * 0.72, x, y, z, 0, 0, Math.PI / 2);
  B.add(G.cyl6, 0x2c2b25, r * 0.22, w + 0.1, r * 0.22, x, y, z, 0, 0, Math.PI / 2);
}
function crewBust(B, x, y, z, team) {
  B.add(G.box, team === 'us' ? 0x6b6944 : 0x262626, 0.5, 0.38, 0.36, x, y - 0.32, z);
  B.add(G.sph, 0xd2a17a, 0.18, 0.2, 0.18, x, y, z);
  if (team === 'us') { B.add(G.dome, 0x4a4d38, 0.25, 0.2, 0.27, x, y + 0.05, z); B.add(G.box, 0x2b2b26, 0.3, 0.06, 0.04, x, y + 0.08, z + 0.2); }
  else { B.add(G.cyl12, 0x1d1d1d, 0.22, 0.1, 0.24, x, y + 0.16, z); B.add(G.box, 0x1d1d1d, 0.22, 0.03, 0.12, x, y + 0.12, z + 0.2); B.add(G.box, 0x111111, 0.3, 0.05, 0.03, x, y + 0.02, z + 0.17); }
}
function hullSherman(B, s) {
  const P0 = s.paint, L = s.L, W = s.W, tx = W / 2 - s.tw / 2, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(sideProfile([[3.35, 0.5], [3.62, 0.78], [3.55, 1.15], [-3.3, 1.15], [-3.42, 0.55]], W - 1.3, 2), P0, 1, 1, 1, 0, 0, 0);
  B.add(sideProfile([[3.15, 1.12], [3.35, 1.42], [1.65, 2.15], [-2.25, 2.15], [-3.2, 1.9], [-3.42, 1.12]], W, 4), P0, 1, 1, 1, 0, 0, 0);
  for (const sx of [-1, 1]) {
    B.add(G.box, P0, 0.62, 0.34, 0.6, sx * 0.62, 2.12, 1.5, -0.25, 0, 0);
    B.add(G.box, dark, 0.2, 0.08, 0.14, sx * 0.62, 2.32, 1.42);
    B.add(G.cyl8, met, 0.11, 0.16, 0.11, sx * 1.15, 1.5, 3.18, Math.PI / 2, 0, 0);
    B.add(G.box, met, 0.04, 0.3, 0.3, sx * 1.15 + 0.14, 1.5, 3.1);
    B.add(G.box, P0, s.tw + 0.05, 0.05, 0.55, sx * tx, 1.18, 3.3);
    B.add(G.box, dark, 0.12, 0.18, 0.3, sx * 0.9, 0.62, 3.6);
    // trem de rolamento VVSS: 3 truques por lado
    for (const bz of [-2.15, -0.15, 1.85]) {
      B.add(G.box, P0, 0.26, 0.5, 0.95, sx * (tx + 0.2), 0.62, bz);
      B.add(G.cyl8, met, 0.12, 0.2, 0.12, sx * (tx + 0.2), 1.02, bz - 0.1, 0, 0, Math.PI / 2);
      for (const dz of [-0.42, 0.42]) wheel(B, sx * (tx + 0.18), 0.4, bz + dz, 0.37, 0.28, dark, P0);
    }
    wheel(B, sx * (tx + 0.16), s.th - 0.42, L / 2 - 0.42, 0.4, 0.3, dark, met);
    wheel(B, sx * (tx + 0.16), s.th - 0.38, -L / 2 + 0.38, 0.34, 0.3, dark, P0);
    // ferramentas no convés traseiro
    B.add(G.box, 0x6e4c2c, 0.06, 0.06, 1.2, sx * 1.35, 2.17, -1.6);
    B.add(G.box, met, 0.2, 0.05, 0.32, sx * 1.35, 2.17, -0.85);
  }
  B.add(G.sph, met, 0.16, 0.16, 0.16, 0.62, 1.74, 2.62);
  B.add(G.cyl8, 0x1e1e1e, 0.03, 0.42, 0.03, 0.62, 1.8, 2.86, Math.PI / 2 - 0.4, 0, 0);
  for (let i = 0; i < 4; i++) B.add(G.box, 0x3a3934, 0.5, 0.06, 0.2, -0.85 + i * 0.57, 1.62, 2.86, 0.42, 0, 0);
  for (let i = 0; i < 5; i++) B.add(G.box, dark, 2.0, 0.04, 0.1, 0, 2.16, -1.0 - i * 0.28);
  // dutos de vadeamento do Dia D
  B.add(G.box, P0, 1.7, 1.5, 0.55, 0, 2.3, -3.55, 0.15, 0, 0);
  B.add(G.box, dark, 1.4, 0.06, 0.4, 0, 3.08, -3.47, 0.15, 0, 0);
  B.add(G.box, P0, 0.8, 1.0, 0.7, -0.95, 2.6, -2.55);
  B.add(G.box, met, 0.9, 0.08, 0.3, 0, 1.0, -3.55);
}
function turretSherman(B, s) {
  const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(G.cyl12, dark, 1.18, 0.12, 1.18, 0, 0.06, 0);
  B.add(G.cyl12, P0, 1.22, 0.4, 1.35, 0, 0.32, -0.05);
  B.add(G.dome, P0, 1.22, 0.62, 1.35, 0, 0.52, -0.05);
  B.add(G.sph, P0, 0.82, 0.4, 0.62, 0, 0.55, -1.15);
  B.add(G.cyl12, P0, 0.33, 1.15, 0.33, 0, 0.55, 1.2, 0, 0, Math.PI / 2);
  B.add(G.box, P0, 1.2, 0.66, 0.32, 0, 0.55, 1.38);
  B.add(G.box, dark, 0.12, 0.12, 0.1, 0.38, 0.55, 1.56);
  B.add(G.cyl12, P0, 0.38, 0.18, 0.38, 0.45, 1.12, -0.35);
  B.add(G.box, P0, 0.36, 0.04, 0.38, 0.45, 1.45, -0.62, 1.2, 0, 0);
  B.add(G.cyl12, P0, 0.3, 0.06, 0.3, -0.45, 1.1, -0.15);
  for (const x of [-0.75, 0.0]) B.add(G.box, dark, 0.14, 0.14, 0.1, x, 1.13, 0.55);
  crewBust(B, 0.45, 1.55, -0.35, 'us');
  // metralhadora .50 no pino e antena de rádio
  B.add(G.cyl8, met, 0.03, 0.4, 0.03, 0.05, 1.3, -0.75);
  B.add(G.box, met, 0.13, 0.15, 0.48, 0.05, 1.55, -0.6);
  B.add(G.cyl8, 0x1e1e1e, 0.028, 1.0, 0.028, 0.05, 1.57, 0.1, Math.PI / 2, 0, 0);
  B.add(G.box, 0x4b5130, 0.15, 0.14, 0.25, 0.22, 1.48, -0.6);
  B.add(G.cyl8, met, 0.05, 0.12, 0.05, -0.75, 1.0, -0.95);
  B.add(G.cyl8, 0x2a2a2a, 0.012, 3.2, 0.012, -0.75, 2.6, -1.05, -0.08, 0, 0);
}
function gunSherman(B) {
  B.add(G.cyl12, 0x45472f, 0.13, 0.5, 0.13, 0, 0, 0.25, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x45472f, 0.095, 2.9, 0.095, 0, 0, 1.9, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x3c3e2a, 0.12, 0.18, 0.12, 0, 0, 3.3, Math.PI / 2, 0, 0);
}
function hullPanzer4(B, s) {
  const P0 = s.paint, L = s.L, W = s.W, tx = W / 2 - s.tw / 2, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(sideProfile([[3.3, 0.45], [3.58, 0.92], [3.5, 1.15], [-3.3, 1.15], [-3.42, 0.5]], W - 1.4, 2), P0, 1, 1, 1, 0, 0, 0);
  B.add(sideProfile([[3.5, 1.12], [3.05, 1.45], [2.6, 1.45], [2.6, 1.12]], 2.5, 2), P0, 1, 1, 1, 0, 0, 0);
  B.add(sideProfile([[2.62, 1.12], [2.62, 1.95], [-0.6, 1.95], [-0.72, 1.82], [-3.35, 1.78], [-3.45, 1.12]], 2.5, 4), P0, 1, 1, 1, 0, 0, 0);
  B.add(G.box, dark, 0.48, 0.15, 0.06, -0.6, 1.72, 2.64);
  B.add(G.sph, met, 0.15, 0.15, 0.15, 0.62, 1.66, 2.64);
  B.add(G.cyl8, 0x1e1e1e, 0.03, 0.4, 0.03, 0.62, 1.66, 2.86, Math.PI / 2, 0, 0);
  for (let i = 0; i < 6; i++) B.add(G.box, 0x3a3934, 0.36, 0.06, 0.22, -0.9 + i * 0.36, 1.31, 3.18, 0.62, 0, 0);
  B.add(G.cyl8, 0x5a3b2a, 0.22, 1.6, 0.22, 0, 0.95, -3.55, 0, 0, Math.PI / 2);
  for (const sx of [-1, 1]) {
    B.add(G.box, P0, s.tw + 0.15, 0.06, L - 0.3, sx * tx, 1.12, 0);
    for (let i = 0; i < 4; i++) {
      const bz = -2.25 + i * 1.32;
      B.add(G.box, met, 0.18, 0.18, 0.75, sx * (tx + 0.22), 0.55, bz);
      for (const dz of [-0.3, 0.3]) wheel(B, sx * (tx + 0.17), 0.31, bz + dz, 0.29, 0.22, dark, P0);
      B.add(G.cyl8, dark, 0.1, 0.16, 0.1, sx * (tx + 0.14), 0.92, bz - 0.4, 0, 0, Math.PI / 2);
    }
    wheel(B, sx * (tx + 0.14), s.th - 0.36, L / 2 - 0.38, 0.36, 0.28, dark, met);
    wheel(B, sx * (tx + 0.14), s.th - 0.33, -L / 2 + 0.35, 0.31, 0.26, dark, P0);
    wheel(B, sx * 1.12, 1.42, 2.95, 0.29, 0.2, dark, P0);
    B.add(G.cyl8, 0x3a3a34, 0.025, 4.5, 0.025, sx * 1.25, 1.2, -0.6, Math.PI / 2, 0, 0);
    // Schürzen (saias blindadas) — uma placa perdida em combate
    B.add(G.box, met, 0.05, 0.05, L - 1.0, sx * (W / 2 + 0.17), 1.74, -0.2);
    for (let i = 0; i < 5; i++) {
      if (sx < 0 && i === 3) continue;
      B.add(G.box, P0, 0.05, 0.92, 1.2, sx * (W / 2 + 0.2), 1.27, -2.55 + i * 1.22, 0, 0, sx * 0.05);
    }
  }
  B.add(G.box, dark, 1.4, 0.04, 0.9, 0.3, 1.8, -1.9);
}
function turretPanzer4(B, s) {
  const P0 = s.paint, dark = 0x2c2b25;
  B.add(G.cyl12, dark, 1.0, 0.1, 1.0, 0, 0.05, 0);
  B.add(planProfile([[-0.82, 1.0], [0.82, 1.0], [1.02, 0.25], [1.02, -1.15], [-1.02, -1.15], [-1.02, 0.25]], 0.85, 1), P0, 1, 1, 1, 0, 0.08, 0);
  B.add(G.box, P0, 0.9, 0.55, 0.3, 0, 0.42, 1.12);
  B.add(G.box, dark, 0.12, 0.1, 0.06, -0.3, 0.5, 1.28);
  B.add(G.cyl12, P0, 0.38, 0.32, 0.38, 0, 1.08, -0.72);
  B.add(G.cyl12, dark, 0.39, 0.08, 0.39, 0, 1.12, -0.72);
  B.add(G.box, P0, 0.4, 0.05, 0.4, 0, 1.45, -1.0, 1.1, 0, 0);
  crewBust(B, 0, 1.6, -0.72, 'de');
  for (const sx of [-1, 1]) B.add(G.box, P0, 0.05, 0.72, 2.3, sx * 1.36, 0.48, -0.32);
  B.add(G.box, P0, 2.76, 0.72, 0.05, 0, 0.48, -1.5);
  B.add(G.box, P0, 1.3, 0.55, 0.55, 0, 0.45, -1.85);
}
function gunPanzer4(B) {
  B.add(G.cyl12, 0x6f6440, 0.12, 0.6, 0.12, 0, 0, 0.3, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x6f6440, 0.08, 3.6, 0.08, 0, 0, 2.35, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x45452f, 0.15, 0.34, 0.15, 0, 0, 4.3, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x222222, 0.155, 0.06, 0.155, 0, 0, 4.25, Math.PI / 2, 0, 0);
}
function hullTiger(B, s) {
  const P0 = s.paint, L = s.L, W = s.W, tx = W / 2 - s.tw / 2, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(sideProfile([[3.42, 0.45], [3.78, 0.88], [3.78, 1.2], [-3.6, 1.2], [-3.72, 0.5]], 2.4, 2), P0, 1, 1, 1, 0, 0, 0);
  B.add(sideProfile([[3.6, 1.15], [3.62, 2.05], [-3.72, 2.0], [-3.82, 1.15]], W * 0.98, 4), P0, 1, 1, 1, 0, 0, 0);
  B.add(G.box, dark, 0.62, 0.16, 0.06, -0.75, 1.8, 3.64);
  B.add(G.sph, met, 0.17, 0.17, 0.17, 0.85, 1.75, 3.64);
  B.add(G.cyl8, 0x1e1e1e, 0.035, 0.45, 0.035, 0.85, 1.75, 3.88, Math.PI / 2, 0, 0);
  for (let i = 0; i < 4; i++) B.add(G.box, dark, 2.2, 0.05, 0.12, 0, 2.03, -1.2 - i * 0.35);
  for (const sx of [-1, 1]) {
    B.add(G.cyl8, met, 0.12, 0.2, 0.12, sx * 1.0, 2.14, 3.35, Math.PI / 2, 0, 0);
    B.add(G.box, P0, s.tw + 0.1, 0.05, 0.55, sx * tx, 1.18, 3.82);
    B.add(G.cyl8, 0x3a3a34, 0.035, 5.6, 0.035, sx * (W * 0.49 + 0.03), 1.62, -0.2, Math.PI / 2, 0, 0);
    B.add(G.cyl12, P0, 0.25, 0.9, 0.25, sx * 1.25, 1.55, -3.95);
    B.add(G.cyl8, 0x5a3b2a, 0.1, 0.85, 0.1, sx * 0.6, 2.2, -3.85);
    B.add(G.box, met, 0.32, 0.6, 0.06, sx * 0.6, 2.2, -3.97);
    // rodas grandes intercaladas (Schachtellaufwerk)
    for (let i = 0; i < 8; i++) {
      const z = -2.85 + i * 0.8, outer = i % 2 === 0;
      wheel(B, sx * (tx + (outer ? 0.22 : 0.02)), 0.62, z, 0.58, 0.2, dark, P0);
    }
    wheel(B, sx * (tx + 0.16), s.th - 0.46, L / 2 - 0.46, 0.46, 0.3, dark, met);
    wheel(B, sx * (tx + 0.16), s.th - 0.44, -L / 2 + 0.44, 0.42, 0.3, dark, P0);
  }
}
function turretTiger(B, s) {
  const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36;
  const plan = [[1.4, 1.35]];
  for (let i = 0; i <= 12; i++) { const a = i / 12 * Math.PI; plan.push([Math.cos(a) * 1.4, -0.15 - Math.sin(a) * 1.4]); }
  plan.push([-1.4, 1.35]);
  B.add(G.cyl12, dark, 1.25, 0.1, 1.25, 0, 0.05, 0);
  B.add(planProfile(plan, 1.0, 1), P0, 1, 1, 1, 0, 0.08, 0);
  B.add(G.box, P0, 1.6, 0.95, 0.42, 0, 0.55, 1.55);
  B.add(G.box, P0, 0.5, 0.5, 0.3, 0, 0.52, 1.85);
  B.add(G.box, dark, 0.14, 0.12, 0.06, -0.45, 0.62, 1.77);
  B.add(G.cyl12, P0, 0.42, 0.4, 0.42, -0.62, 1.25, -0.55);
  B.add(G.cyl12, dark, 0.43, 0.08, 0.43, -0.62, 1.3, -0.55);
  B.add(G.box, P0, 0.45, 0.05, 0.45, -0.62, 1.68, -0.85, 1.1, 0, 0);
  crewBust(B, -0.62, 1.75, -0.55, 'de');
  B.add(G.cyl12, P0, 0.3, 0.05, 0.3, 0.55, 1.1, -0.3);
  for (const sx of [-1, 1]) {
    for (let k = 0; k < 3; k++) B.add(G.cyl8, met, 0.06, 0.25, 0.06, sx * (1.25 + k * 0.05), 0.95, 1.1 - k * 0.12, 0.6, 0, sx * 0.4);
    for (let k = 0; k < 4; k++) B.add(G.box, 0x3a3934, 0.07, 0.12, 0.5, sx * 1.42, 0.35 + (k % 2) * 0.16, -0.3 - Math.floor(k / 2) * 0.55);
  }
  B.add(G.box, P0, 1.7, 0.55, 0.6, 0, 0.55, -1.78);
}
function gunTiger(B) {
  B.add(G.cyl12, 0x6f6440, 0.17, 0.5, 0.17, 0, 0, 0.25, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x6f6440, 0.12, 4.7, 0.12, 0, 0, 2.85, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x45452f, 0.24, 0.55, 0.24, 0, 0, 5.4, Math.PI / 2, 0, 0);
  B.add(G.cyl12, 0x222222, 0.245, 0.08, 0.245, 0, 0, 5.35, Math.PI / 2, 0, 0);
}
const TANK_PARTS = {
  sherman: [hullSherman, turretSherman, gunSherman, 3.45],
  panzer4: [hullPanzer4, turretPanzer4, gunPanzer4, 4.5],
  tiger: [hullTiger, turretTiger, gunTiger, 5.7],
};
function makeTank(kind) {
  const s = TANKS[kind], [hull, turret, gunFn, gunLen] = TANK_PARTS[kind];
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  VM(merged('hull' + kind, B => { B.cf = paintFn(s.paint, s.camo, 1.3); hull(B, s); }), g, 0, 0, 0, true);
  const tm = trackMaterial(1.2);
  let loop = _geoCache.get('loop' + kind);
  if (!loop) { loop = trackLoop(s.L, s.th, kind === 'sherman' ? 0.42 : 0.4, 0.38); _geoCache.set('loop' + kind, loop); }
  for (const sx of [-1, 1]) {
    const t = new THREE.Mesh(loop, tm); t.scale.x = s.tw; t.position.x = sx * (s.W / 2 - s.tw / 2); t.castShadow = true; g.add(t);
  }
  const tur = new THREE.Group(); tur.position.set(s.tur[0], s.tur[1], s.tur[2]); g.add(tur);
  VM(merged('turret' + kind, B => { B.cf = paintFn(s.paint, s.camo, 0); turret(B, s); }), tur, 0, 0, 0, true);
  const gun = VM(merged('gun' + kind, gunFn), tur, 0, s.gy, s.gz, true);
  const muzzle = new THREE.Object3D(); muzzle.position.set(0, s.gy, s.gz + gunLen + 0.2); tur.add(muzzle);
  if (kind === 'sherman') {
    for (const sx of [-1, 1]) {
      const d = P(G.plane, decalMat(TEX.star), 0.95, 0.95, 1, sx * 1.235, 0.36, 0.05, tur, false); d.rotation.y = sx * Math.PI / 2;
      const h = P(G.plane, decalMat(TEX.star), 1.1, 1.1, 1, sx * (s.W / 2 + 0.01), 1.62, -0.6, g, false); h.rotation.y = sx * Math.PI / 2;
    }
    const top = P(G.plane, decalMat(TEX.star), 1.5, 1.5, 1, 0, 2.165, -1.4, g, false); top.rotation.x = -Math.PI / 2;
  } else {
    const hx = kind === 'tiger' ? s.W * 0.49 + 0.02 : s.W / 2 + 0.235, tx = kind === 'tiger' ? 1.42 : 1.39;
    for (const sx of [-1, 1]) {
      const c = P(G.plane, decalMat(TEX.cross), 0.8, 0.8, 1, sx * hx, kind === 'tiger' ? 1.62 : 1.3, kind === 'tiger' ? -1.6 : 1.0, g, false); c.rotation.y = sx * Math.PI / 2;
      const n = P(G.plane, decalMat(NUM_TEX[kind]), 1.0, 0.5, 1, sx * tx, kind === 'tiger' ? 0.62 : 0.5, kind === 'tiger' ? 0.5 : -0.2, tur, false); n.rotation.y = sx * Math.PI / 2;
    }
  }
  g.userData = { turret: tur, gun, muzzle, trackMat: tm, wheels: [], L: s.L };
  return g;
}
function crewHead(parent, x, y, z, team) {
  P(G.sph, 0xd1a27c, 0.2, 0.22, 0.2, x, y, z, parent, false);
  if (team === 'us') P(G.hemi, 0x474e2f, 0.27, 0.2, 0.29, x, y + 0.07, z, parent, false);
  else P(G.cyl8, 0x1d1d1d, 0.24, 0.12, 0.24, x, y + 0.14, z, parent, false);
  P(G.box, team === 'us' ? 0x5c5b3b : 0x262626, 0.5, 0.35, 0.4, x, y - 0.35, z, parent, false);
}

/* ---------- veículo de construção (trator D7 do Corpo de Engenheiros) ---------- */
function makeDozer() {
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  const tm = trackMaterial(7), col = 0x575a31, L = 6.2;
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
    s.scale.setScalar(1.0); g.add(s); troops.push(s);
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
  s.userData.legL.rotation.x = -1.4; s.userData.shinL.rotation.x = 1.4; s.userData.legR.rotation.x = 0.15; s.userData.shinR.rotation.x = 1.6;
  s.userData.foreL.rotation.x = -0.3; s.userData.foreR.rotation.x = -1.0;
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
