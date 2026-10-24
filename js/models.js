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
TEX.blood = canvasTex(64, 64, (g) => {
  for (let i = 0; i < 7; i++) {
    const x = 32 + (Math.random() - 0.5) * 22, y = 32 + (Math.random() - 0.5) * 22, r = 8 + Math.random() * 12;
    const gr = g.createRadialGradient(x, y, 1, x, y, r); gr.addColorStop(0, 'rgba(92,14,10,0.85)'); gr.addColorStop(1, 'rgba(70,10,8,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  }
});
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
const VC_MAT = new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 14, specular: 0x1a1a18 });
G.limbT = new THREE.CylinderGeometry(1, 0.78, 1, 10);
G.limb = new THREE.CylinderGeometry(1, 1, 1, 10);
G.sph16 = new THREE.SphereGeometry(1, 16, 12);
G.dome16 = new THREE.SphereGeometry(1, 18, 8, 0, Math.PI * 2, 0, Math.PI / 2);
G.torso12 = new THREE.CylinderGeometry(1, 0.82, 1, 14);
G.ico1 = new THREE.IcosahedronGeometry(1, 1);
/* ---------- detalhe procedural no shader (textura sem imagens, sem repetição visível) ---------- */
const NOISE_GLSL = `
float hash3(vec3 p){ p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float vnoise(vec3 x){
  vec3 i = floor(x); vec3 f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
}`;
const DETAIL = {
  // tinta gasta, sujeira escorrida e lascas — veículos, soldados e construções
  unit: `
    vec3 p = vDPos;
    float n = vnoise(p * 9.0) * 0.55 + vnoise(p * 2.6) * 0.45;
    float streak = vnoise(vec3(p.x * 16.0, p.y * 1.3, p.z * 16.0));
    float chip = step(0.86, vnoise(p * 23.0));
    diffuseColor.rgb *= 0.88 + 0.2 * n - 0.09 * smoothstep(0.55, 1.0, streak);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.34, 0.33, 0.3), chip * 0.25);
    diffuseColor.rgb *= mix(0.6, 1.0, smoothstep(0.0, 1.5, p.y));`,
  // alvenaria de pedra e telhas nas vilas
  stone: `
    vec3 p = vDPos;
    float row = floor(p.y * 2.4);
    float m1 = step(0.9, fract(p.y * 2.4));
    float m2 = step(0.94, fract((p.x + p.z) * 1.1 + row * 0.5));
    float n = vnoise(p * 3.1) * 0.6 + vnoise(p * 11.0) * 0.4;
    diffuseColor.rgb *= (0.86 + 0.22 * n) * (1.0 - 0.13 * max(m1, m2));`,
  // terra batida de estradas e trincheiras
  ground: `
    vec3 p = vDPos;
    float n = vnoise(p * 1.3) * 0.5 + vnoise(p * 5.0) * 0.5;
    float rut = smoothstep(0.75, 1.0, vnoise(vec3(p.x * 0.4, 0.0, p.z * 0.4)));
    diffuseColor.rgb *= 0.8 + 0.3 * n - 0.08 * rut;`,
  // terreno: grama, campos arados, areia com ondulações, seixos e linha de maré
  terrain: `
    vec3 p = vDPos;
    float n1 = vnoise(p * 0.9), n2 = vnoise(p * 3.7), n3 = vnoise(p * 0.11), n4 = vnoise(p * 9.0);
    float beach = smoothstep(226.0, 238.0, p.z);
    float land = 1.0 - beach;
    float g = 0.84 + 0.14 * n1 + 0.08 * n2 + 0.16 * (n3 - 0.5);
    float tuft = step(0.8, hash3(floor(p * 2.2))) * land;
    g -= tuft * 0.1 * n4;
    vec2 cell = floor(p.xz / vec2(70.0, 60.0));
    float o = hash3(vec3(cell, 3.0));
    float isField = land * step(p.z, 105.0) * smoothstep(0.0, 0.06, diffuseColor.r - diffuseColor.g * 0.9);
    float fur = sin((o > 0.5 ? p.x : p.z) * 2.6) * 0.5 + 0.5;
    g -= isField * fur * 0.14;
    float rip = sin(p.z * 2.3 + vnoise(p * 0.3) * 7.0 + p.x * 0.12);
    float sandMask = beach * (1.0 - smoothstep(326.0, 334.0, p.z));
    g += sandMask * (rip * 0.045 + (n2 - 0.5) * 0.1);
    float pebble = beach * (1.0 - smoothstep(246.0, 254.0, p.z)) * step(0.55, hash3(floor(p * 3.0)));
    g += pebble * (hash3(floor(p * 3.0) + 7.0) - 0.5) * 0.35;
    float speck = step(0.95, hash3(floor(p * 7.0))) * sandMask;
    g -= speck * 0.12;
    diffuseColor.rgb *= g;
    float tide = (1.0 - smoothstep(0.0, 1.6, abs(p.z - 309.0 - (vnoise(vec3(p.x * 0.05, 0.0, 0.0)) - 0.5) * 9.0))) * beach;
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.24, 0.24, 0.16), tide * (0.35 + 0.4 * n2));
    float wet = smoothstep(298.0, 332.0, p.z);
    diffuseColor.rgb *= 1.0 - wet * 0.2;`,
};
function addDetail(mat, mode, world) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = 'varying vec3 vDPos;\n' + sh.vertexShader.replace('#include <begin_vertex>',
      '#include <begin_vertex>\n' + (world ? 'vDPos = (modelMatrix * vec4(transformed, 1.0)).xyz;' : 'vDPos = transformed;'));
    sh.fragmentShader = 'varying vec3 vDPos;\n' + NOISE_GLSL + '\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n' + DETAIL[mode]);
  };
  mat.customProgramCacheKey = () => 'detail-' + mode + (world ? 'w' : 'l');
  return mat;
}
addDetail(VC_MAT, 'unit');
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
const SKINS = [0xd2a17a, 0xc8936b, 0xe0b48f, 0xb98563];
// camuflagem alemã "Splittertarn" em manchas angulosas
const _sc = new THREE.Color();
function splinter(target) {
  const c1 = new THREE.Color(0x6f6f4c), c2 = new THREE.Color(0x4e5a3b), c3 = new THREE.Color(0x6a5238);
  return (x, y, z, base) => {
    if (base.getHex() !== target) return base;
    const a = Math.floor(x * 7 + y * 5) + Math.floor(z * 6 - y * 4) * 3;
    const k = ((a % 4) + 4) % 4;
    return _sc.copy(k === 0 ? c1 : k === 1 ? c2 : k === 2 ? c3 : c1).multiplyScalar(0.95);
  };
}

const PARA_PAL = { jacket: 0x8a8358, pants: 0x857e55, helm: 0x4a5032, band: 0x3a3f28 };
function snowSmock(target) {
  const c1 = new THREE.Color(0xe8eaea), c2 = new THREE.Color(0xc4c8c6);
  return (x, y, z, base) => { if (base.getHex() !== target) return base; return Math.sin(x * 9 + y * 7) + Math.sin(z * 8 - y * 5) > 1.1 ? c2 : c1; };
}
function camoFor(team, variant, target) {
  if (team !== 'de' || variant !== 1 || SC.biome === 'desert') return null;
  return SC.biome === 'winter' ? snowSmock(target) : splinter(target);
}
function roleExtras(B, team, role) {
  if (role === 'med') {
    const y = team === 'us' ? 2.16 : 2.17;
    for (const [x, z, ry] of [[0, 0.27, 0], [0, -0.27, Math.PI], [0.26, 0, Math.PI / 2], [-0.26, 0, -Math.PI / 2]]) {
      B.add(G.box, 0xf2f0e8, 0.16, 0.16, 0.02, x, y, z, 0, ry, 0);
      B.add(G.box, 0xb3241d, 0.11, 0.035, 0.025, x, y, z, 0, ry, 0);
      B.add(G.box, 0xb3241d, 0.035, 0.11, 0.025, x, y, z, 0, ry, 0);
    }
    B.add(G.box, 0x6b6747, 0.26, 0.22, 0.14, -0.25, 1.05, 0.05);
    B.add(G.box, 0x6b6747, 0.26, 0.22, 0.14, 0.25, 1.05, 0.05);
  } else if (role === 'para') {
    for (const [c, yy] of [[0xb22234, 1.62], [0xf3f1ea, 1.58], [0x3c3b6e, 1.6]]) B.add(G.box, c, 0.02, 0.05, 0.1, -0.345, yy, 0.0);
    B.add(G.box, 0x6d6a4c, 0.3, 0.16, 0.16, 0, 1.0, 0.22);
    B.add(G.box, 0x4a4f2e, 0.08, 0.32, 0.06, 0.22, 1.32, 0.21);
  }
}
function soldierBody(B, team, pal, variant) {
  const sk = pal.skin, us = team === 'us', de = team === 'de';
  B.cf = camoFor(team, variant, pal.jacket);
  B.add(G.limb, pal.pants, 0.24, 0.3, 0.16, 0, 1.0, 0);
  B.add(G.torso12, pal.jacket, 0.33, 0.62, 0.2, 0, 1.43, 0);
  B.add(G.sph16, pal.jacket, 0.27, 0.18, 0.15, 0, 1.56, 0.03);
  B.add(G.sph16, pal.jacket, 0.29, 0.16, 0.18, 0, 1.18, 0);
  for (const sx of [-1, 1]) {
    B.add(G.sph, pal.jacket, 0.13, 0.12, 0.14, sx * 0.29, 1.69, 0);
    B.add(G.box, de ? pal.collar : 0x5c5a3a, 0.1, 0.11, 0.03, sx * 0.13, 1.56, 0.2);
    B.add(G.box, de ? pal.collar : 0x5a5838, 0.11, 0.1, 0.03, sx * 0.13, 1.24, 0.19);
  }
  B.add(G.cyl8, sk, 0.085, 0.12, 0.085, 0, 1.79, 0.01);
  B.add(G.sph16, sk, 0.18, 0.21, 0.19, 0, 1.99, 0.02);
  B.add(G.box, sk, 0.22, 0.1, 0.18, 0, 1.9, 0.05);
  B.add(G.box, 0xb88a64, 0.055, 0.085, 0.07, 0, 1.96, 0.21);
  B.add(G.box, 0x7a4a3a, 0.085, 0.016, 0.02, 0, 1.9, 0.2);
  for (const sx of [-1, 1]) {
    B.add(G.box, 0xf0ebe0, 0.05, 0.03, 0.015, sx * 0.075, 2.02, 0.198);
    B.add(G.box, 0x1e1812, 0.025, 0.03, 0.02, sx * 0.075, 2.02, 0.203);
    B.add(G.box, 0x3a2a1c, 0.07, 0.018, 0.02, sx * 0.075, 2.06, 0.2);
    B.add(G.sph, sk, 0.04, 0.06, 0.03, sx * 0.19, 1.98, 0.0);
  }
  if (us) {
    B.add(G.dome16, pal.helm, 0.235, 0.21, 0.255, 0, 2.04, 0);
    B.add(G.cyl12, pal.helm, 0.265, 0.03, 0.285, 0, 2.04, 0);
    B.add(G.cyl12, pal.band, 0.24, 0.05, 0.26, 0, 2.09, 0);
    if (variant === 1) for (const [x, z] of [[0.1, 0.1], [-0.12, -0.05], [0.02, -0.15], [-0.05, 0.14]]) B.add(G.ico, 0x4a5a2c, 0.08, 0.06, 0.08, x, 2.24, z);
    else B.add(G.box, 0xe8e2d2, 0.08, 0.05, 0.02, 0, 2.14, 0.28);
    for (const sx of [-1, 1]) B.add(G.box, pal.web, 0.025, 0.2, 0.025, sx * 0.17, 1.94, 0.05);
    B.add(G.box, pal.web, 0.62, 0.08, 0.38, 0, 1.13, 0);
    for (const x of [-0.24, -0.12, 0.12, 0.24]) B.add(G.box, pal.web, 0.1, 0.12, 0.07, x, 1.13, 0.2);
    for (const sx of [-1, 1]) {
      B.add(G.box, pal.web, 0.05, 0.62, 0.03, sx * 0.12, 1.45, 0.205, 0, 0, sx * 0.1);
      B.add(G.box, pal.web, 0.05, 0.6, 0.03, sx * 0.1, 1.45, -0.205);
      B.add(G.sph, 0x4a4f30, 0.05, 0.06, 0.05, sx * 0.13, 1.5, 0.23);
    }
    if (variant === 1) B.add(G.box, 0x8a7f58, 0.08, 0.75, 0.03, 0, 1.45, 0.22, 0, 0, 0.62);
    B.add(G.box, 0x5f6268, 0.64, 0.09, 0.4, 0, 1.26, 0);
    B.add(G.box, 0x6b6747, 0.22, 0.18, 0.1, -0.08, 1.36, 0.22);
    B.add(G.box, pal.pack, 0.36, 0.42, 0.17, 0, 1.5, -0.28);
    B.add(G.box, pal.pack, 0.3, 0.12, 0.05, 0, 1.62, -0.38);
    B.add(G.box, 0x76704d, 0.3, 0.16, 0.12, 0, 1.28, -0.28);
    B.add(G.limb, 0x8a7d52, 0.11, 0.42, 0.11, 0, 1.76, -0.27, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) B.add(G.limb, 0x4a3f2a, 0.115, 0.03, 0.115, sx * 0.13, 1.76, -0.27, 0, 0, Math.PI / 2);
    B.add(G.box, 0x4f4f45, 0.13, 0.3, 0.03, 0, 1.2, -0.36);
    B.add(G.cyl8, 0x5e4a30, 0.02, 0.22, 0.02, 0, 1.42, -0.36);
    B.add(G.cyl8, 0x5f6040, 0.075, 0.17, 0.075, 0.28, 1.03, -0.1);
    B.add(G.box, 0x3a3a34, 0.04, 0.3, 0.03, -0.27, 1.0, -0.06);
  } else if (de && SC.biome === 'tropical') {
    B.add(G.dome16, pal.helm, 0.235, 0.2, 0.255, 0, 2.05, 0);
    B.add(G.cyl12, pal.helm, 0.245, 0.035, 0.265, 0, 2.05, 0);
    B.add(G.box, 0xd9b52a, 0.06, 0.06, 0.02, 0, 2.17, 0.27);
    B.add(G.box, 0x9a8f68, 0.42, 0.3, 0.03, 0, 1.94, -0.26, 0.2, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, 0x9a8f68, 0.03, 0.28, 0.24, sx * 0.27, 1.94, -0.05, 0, 0, sx * 0.15);
    B.add(G.box, pal.collar, 0.32, 0.07, 0.24, 0, 1.76, 0);
    B.add(G.box, pal.web, 0.62, 0.08, 0.38, 0, 1.13, 0);
    for (const sx of [-1, 1]) { B.add(G.box, pal.web, 0.13, 0.12, 0.08, sx * 0.14, 1.15, 0.2); B.add(G.box, pal.web, 0.05, 0.6, 0.03, sx * 0.1, 1.45, 0.205, 0, 0, sx * 0.12); }
    B.add(G.box, pal.pack, 0.32, 0.32, 0.14, 0, 1.5, -0.26);
    B.add(G.cyl8, 0x4a4c3a, 0.07, 0.16, 0.07, 0.27, 1.02, -0.1);
  } else if (de) {
    B.add(G.dome16, pal.helm, 0.225, 0.22, 0.245, 0, 2.05, 0);
    B.add(G.flare, pal.helm, 0.27, 0.13, 0.29, 0, 2.0, -0.01, -0.12, 0, 0);
    if (variant === 1) for (const [x, z] of [[0.12, 0.05], [-0.1, -0.08], [0.0, 0.12]]) B.add(G.ico, 0x4e5a35, 0.08, 0.05, 0.08, x, 2.24, z);
    B.add(G.box, pal.collar, 0.34, 0.08, 0.24, 0, 1.76, 0);
    B.add(G.box, pal.web, 0.62, 0.08, 0.38, 0, 1.13, 0);
    B.add(G.box, 0x8a8a80, 0.08, 0.06, 0.02, 0, 1.13, 0.2);
    for (const sx of [-1, 1]) {
      for (const x of [0.1, 0.18, 0.26]) B.add(G.box, pal.web, 0.075, 0.12, 0.07, sx * x, 1.15, 0.2);
      B.add(G.box, pal.web, 0.05, 0.62, 0.03, sx * 0.11, 1.45, 0.205, 0, 0, sx * 0.1);
      B.add(G.box, pal.collar, 0.12, 0.04, 0.16, sx * 0.29, 1.79, 0);
      B.add(G.box, 0xc8c2a8, 0.05, 0.08, 0.01, sx * 0.13, 1.68, 0.205);
    }
    B.add(G.box, 0xc8c2a8, 0.12, 0.05, 0.01, 0.13, 1.6, 0.206);
    B.add(G.box, pal.web, 0.05, 0.6, 0.03, 0, 1.45, -0.205);
    B.add(G.box, pal.pack, 0.2, 0.2, 0.08, 0.25, 1.02, -0.15);
    B.add(G.cyl8, 0x4a4c3a, 0.07, 0.16, 0.07, 0.2, 1.0, -0.26);
    B.add(G.box, 0x4f5348, 0.2, 0.1, 0.06, 0.08, 1.5, -0.26);
    B.add(G.cyl8, 0x4f5348, 0.08, 0.34, 0.08, -0.05, 1.3, -0.28, 0, 0, 0.7);
    B.add(G.box, 0x3a3a34, 0.05, 0.32, 0.04, -0.26, 1.0, -0.06);
    B.add(G.cyl8, 0x8a6a40, 0.03, 0.3, 0.03, -0.1, 1.2, 0.22);
    B.add(G.cyl8, 0x4a4c48, 0.055, 0.1, 0.055, -0.1, 1.38, 0.22);
  } else {
    B.add(G.cyl12, pal.helm, 0.22, 0.07, 0.23, 0, 2.17, 0);
    B.add(G.box, pal.helm, 0.26, 0.03, 0.12, 0, 2.15, 0.2);
    B.add(G.box, 0xe6e0d0, 0.2, 0.12, 0.03, 0, 1.65, 0.205);
  }
  B.cf = null;
}
const WEAPONS = {
  rifle: (B, team) => {
    const wood = team === 'de' ? 0x5a3a22 : 0x6e4527, met = 0x2a2b2b;
    B.add(G.box, wood, 0.07, 0.15, 0.3, 0, -0.04, -0.44);
    B.add(G.box, wood, 0.072, 0.1, 0.12, 0, -0.07, -0.3, 0.35, 0, 0);
    B.add(G.box, 0x2a2b2b, 0.075, 0.16, 0.02, 0, -0.04, -0.6);
    B.add(G.box, wood, 0.06, 0.08, 0.2, 0, -0.005, -0.2);
    B.add(G.box, 0x2a2b2b, 0.02, 0.06, 0.06, 0, -0.07, -0.08);
    B.add(G.box, met, 0.07, 0.09, 0.32, 0, 0.01, 0.05);
    B.add(G.box, wood, 0.07, 0.07, 0.44, 0, -0.005, 0.4);
    B.add(G.cyl8, met, 0.022, team === 'de' ? 0.42 : 0.34, 0.022, 0, 0.01, team === 'de' ? 0.8 : 0.76, Math.PI / 2, 0, 0);
    B.add(G.box, met, 0.02, 0.05, 0.02, 0, 0.05, 0.62);
    if (team === 'de') B.add(G.cyl8, met, 0.015, 0.1, 0.015, 0.06, 0.03, 0.04, 0, 0, Math.PI / 2);
    if (team === 'de' && SC.biome === 'tropical') B.add(G.box, 0xb0b4b4, 0.02, 0.05, 0.5, 0, -0.02, 1.25);
    B.add(G.box, 0x4a3f2a, 0.015, 0.02, 0.6, -0.04, -0.07, 0.05);
  },
  thompson: (B) => {
    B.add(G.box, 0x6e4527, 0.06, 0.13, 0.28, 0, -0.03, -0.32);
    B.add(G.box, 0x2a2b2b, 0.08, 0.1, 0.4, 0, 0.01, 0.0);
    B.add(G.box, 0x6e4527, 0.05, 0.12, 0.06, 0, -0.08, 0.22);
    B.add(G.box, 0x1e1e1e, 0.05, 0.22, 0.07, 0, -0.14, 0.08);
    B.add(G.cyl8, 0x2a2b2b, 0.025, 0.3, 0.025, 0, 0.02, 0.35, Math.PI / 2, 0, 0);
  },
  mp40: (B) => {
    B.add(G.box, 0x1e1e1e, 0.025, 0.03, 0.3, 0, 0.0, -0.3);
    B.add(G.box, 0x232323, 0.07, 0.09, 0.38, 0, 0.0, 0.0);
    B.add(G.box, 0x1e1e1e, 0.04, 0.26, 0.05, 0, -0.17, 0.08);
    B.add(G.box, 0x3a2a20, 0.05, 0.12, 0.05, 0, -0.09, -0.08);
    B.add(G.cyl8, 0x232323, 0.022, 0.25, 0.022, 0, 0.01, 0.31, Math.PI / 2, 0, 0);
  },
  bazooka: (B) => {
    B.add(G.cyl12, 0x4a4f2e, 0.075, 1.5, 0.075, 0, 0, 0.1, Math.PI / 2, 0, 0);
    B.add(G.cone, 0x4a4f2e, 0.11, 0.18, 0.11, 0, 0, -0.68, -Math.PI / 2, 0, 0);
    B.add(G.box, 0x6e4527, 0.06, 0.12, 0.28, 0, -0.1, -0.25);
    B.add(G.box, 0x2a2b2b, 0.04, 0.16, 0.05, 0, -0.12, 0.15);
    B.add(G.box, 0x2a2b2b, 0.1, 0.1, 0.02, 0, 0.1, 0.55);
    B.add(G.box, 0x7a6845, 0.06, 0.04, 0.9, 0.08, -0.03, 0.05);
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
  const civ = team === 'civ';
  const variant = civ ? (Math.random() * CIV_PALS.length) | 0 : (Math.random() * 3) | 0;
  const skin = civ ? 0 : (Math.random() * SKINS.length) | 0;
  const role = kind === 'medic' || kind === 'sani' ? 'med' : kind === 'para' ? 'para' : '';
  const base = civ ? CIV_PALS[variant] : SOLDIER_PAL[team];
  const pal = Object.assign({}, base, civ ? {} : (SC.pal && SC.pal[team]) || {}, role === 'para' ? PARA_PAL : {}, { skin: civ ? base.skin : SKINS[skin] });
  const key = team + variant + 's' + skin + role + (civ ? '' : SC.id);
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  VM(merged('body' + key, B => { soldierBody(B, team, pal, variant); roleExtras(B, team, role); }), g, 0, 0, 0, true);
  const thighG = merged('thigh' + key, B => {
    B.cf = camoFor(team, variant, pal.pants);
    B.add(G.sph16, pal.pants, 0.12, 0.11, 0.13, 0, 0, 0);
    B.add(G.limbT, pal.pants, 0.118, 0.52, 0.13, 0, -0.26, 0);
    B.add(G.box, pal.pants, 0.05, 0.15, 0.12, 0.11, -0.26, 0.02);
  });
  const shinG = merged('shin' + key, B => {
    const jb = team === 'de' && SC.biome !== 'tropical';
    B.add(G.sph16, pal.pants, 0.1, 0.1, 0.11, 0, 0, 0.01);
    B.add(G.limbT, pal.pants, 0.098, 0.3, 0.108, 0, -0.15, 0);
    B.add(G.limb, jb ? pal.boot : pal.legging, 0.1, jb ? 0.34 : 0.2, 0.11, 0, jb ? -0.3 : -0.35, 0);
    if (!jb) for (let i = 0; i < 3; i++) B.add(G.limb, 0x6a604a, 0.104, 0.02, 0.114, 0, -0.29 - i * 0.05, 0);
    B.add(G.box, pal.boot, 0.17, 0.1, 0.25, 0, -0.47, 0.05);
    B.add(G.sph16, pal.boot, 0.085, 0.06, 0.09, 0, -0.47, 0.17);
    B.add(G.box, 0x1a1612, 0.18, 0.03, 0.31, 0, -0.52, 0.06);
  });
  const upperG = merged('upper' + key, B => {
    B.cf = camoFor(team, variant, pal.jacket);
    if (role === 'med') { B.add(G.box, 0xf2f0e8, 0.165, 0.12, 0.175, 0, -0.1, 0); B.add(G.box, 0xb3241d, 0.17, 0.035, 0.06, 0, -0.1, 0); }
    B.add(G.sph16, pal.jacket, 0.1, 0.1, 0.1, 0, 0, 0);
    B.add(G.limbT, pal.jacket, 0.088, 0.38, 0.092, 0, -0.18, 0);
    if (team === 'us' && variant === 2) for (let i = 0; i < 3; i++) for (const sx of [-1, 1]) B.add(G.box, 0xc9b25a, 0.012, 0.025, 0.12, sx * 0.077, -0.1 - i * 0.045, 0);
  });
  const foreG = merged('fore' + key, B => {
    B.cf = camoFor(team, variant, pal.jacket);
    B.add(G.sph16, pal.jacket, 0.078, 0.078, 0.08, 0, 0, 0);
    B.add(G.limbT, pal.jacket, 0.076, 0.3, 0.078, 0, -0.15, 0);
    B.add(G.limb, pal.jacket, 0.07, 0.04, 0.072, 0, -0.29, 0);
    B.add(G.sph16, pal.skin, 0.055, 0.075, 0.05, 0, -0.35, 0.015);
    B.add(G.sph16, pal.skin, 0.022, 0.035, 0.022, -0.035, -0.33, 0.05);
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
  if (!civ && role !== 'med') {
    let wk = kind === 'bazooka' ? 'bazooka' : kind === 'pzschreck' ? 'pzschreck' : 'rifle';
    if (wk === 'rifle' && variant === 2) wk = team === 'us' ? 'thompson' : 'mp40';
    rifle = new THREE.Group(); g.add(rifle);
    VM(merged('wpn' + wk + team + (SC.biome === 'tropical' ? 'jp' : ''), B => WEAPONS[wk](B, team)), rifle, 0, 0, 0, false);
    if (wk === 'bazooka' || wk === 'pzschreck') { tube = true; rifle.position.set(0.27, 1.84, 0.12); }
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
TEX.track2 = canvasTex(64, 32, (g) => {
  g.fillStyle = '#26241f'; g.fillRect(0, 0, 64, 32);
  for (let x = 0; x < 64; x += 16) {
    g.fillStyle = '#46433b'; g.fillRect(x + 1, 2, 12, 28);
    g.fillStyle = '#58544a'; g.fillRect(x + 3, 3, 3, 26); g.fillRect(x + 9, 3, 2, 26);
    g.fillStyle = '#6d685c'; g.fillRect(x + 5, 13, 5, 6);
    g.fillStyle = '#1a1916'; g.fillRect(x + 13, 0, 2, 32);
  }
})
TEX.serial = (txt) => canvasTex(256, 48, (g) => {
  g.font = 'bold 30px "Courier New", monospace'; g.textAlign = 'center'; g.textBaseline = 'middle';
  g.fillStyle = 'rgba(236,232,214,0.92)'; g.fillText(txt, 128, 26);
});
const SERIAL_TEX = {};
function serialTex(t) { return SERIAL_TEX[t] || (SERIAL_TEX[t] = TEX.serial(t)); }
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
  // cobertor enrolado e amarrado na lateral da torre
  B.add(G.limb, 0x9a8a55, 0.22, 1.5, 0.22, -1.32, 0.5, -0.5, Math.PI / 2, 0, 0);
  for (const z of [-1.05, 0.05]) B.add(G.limb, 0x4a3f2a, 0.235, 0.05, 0.235, -1.32, 0.5, z, Math.PI / 2, 0, 0);
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
  if (VEH[kind]) return VEH[kind]();
  const s = Object.assign({}, TANKS[kind], (SC.paint && SC.paint[TANK_TEAM[kind]]) || {}), [hull, turret, gunFn, gunLen] = TANK_PARTS[kind];
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  VM(merged('hull' + kind + SC.id, B => { B.cf = paintFn(s.paint, s.camo, 1.3); hull(B, s); if (HULL_EXTRA[kind]) HULL_EXTRA[kind](B, s); }), g, 0, 0, 0, true);
  const tm = trackMaterial(1.2);
  let loop = _geoCache.get('loop' + kind);
  if (!loop) { loop = trackLoop(s.L, s.th, kind === 'sherman' ? 0.42 : 0.4, 0.38); _geoCache.set('loop' + kind, loop); }
  for (const sx of [-1, 1]) {
    const t = new THREE.Mesh(loop, tm); t.scale.x = s.tw; t.position.x = sx * (s.W / 2 - s.tw / 2); t.castShadow = true; g.add(t);
  }
  const tur = new THREE.Group(); tur.position.set(s.tur[0], s.tur[1], s.tur[2]); g.add(tur);
  VM(merged('turret' + kind + SC.id, B => { B.cf = paintFn(s.paint, s.camo, 0); turret(B, s); }), tur, 0, 0, 0, true);
  const gun = VM(merged('gun' + kind, gunFn), tur, 0, s.gy, s.gz, true);
  const muzzle = new THREE.Object3D(); muzzle.position.set(0, s.gy, s.gz + gunLen + 0.2); tur.add(muzzle);
  if (kind === 'sherman') {
    for (const sx of [-1, 1]) {
      const d = P(G.plane, decalMat(TEX.star), 0.95, 0.95, 1, sx * 1.235, 0.36, 0.05, tur, false); d.rotation.y = sx * Math.PI / 2;
      const h = P(G.plane, decalMat(TEX.star), 1.1, 1.1, 1, sx * (s.W / 2 + 0.01), 1.62, -0.6, g, false); h.rotation.y = sx * Math.PI / 2;
    }
    const top = P(G.plane, decalMat(TEX.star), 1.5, 1.5, 1, 0, 2.165, -1.4, g, false); top.rotation.x = -Math.PI / 2;
    const ser = serialTex('USA 30' + (62000 + Math.floor(Math.random() * 9000)));
    for (const sx of [-1, 1]) { const d = P(G.plane, decalMat(ser), 2.4, 0.45, 1, sx * (s.W / 2 + 0.012), 1.42, 1.0, g, false); d.rotation.y = sx * Math.PI / 2; }
  } else {
    const hx = kind === 'tiger' ? s.W * 0.49 + 0.02 : s.W / 2 + 0.235, tx = kind === 'tiger' ? 1.42 : 1.39;
    for (const sx of [-1, 1]) {
      const c = P(G.plane, decalMat(TEX.cross), 0.8, 0.8, 1, sx * hx, kind === 'tiger' ? 1.62 : 1.3, kind === 'tiger' ? -1.6 : 1.0, g, false); c.rotation.y = sx * Math.PI / 2;
      const n = P(G.plane, decalMat(NUM_TEX[kind]), 1.0, 0.5, 1, sx * tx, kind === 'tiger' ? 0.62 : 0.5, kind === 'tiger' ? 0.5 : -0.2, tur, false); n.rotation.y = sx * Math.PI / 2;
    }
  }
  const sh = blob(g, 1); sh.scale.set(s.W * 1.9, s.L * 1.35, 1);
  g.userData = { turret: tur, gun, muzzle, trackMat: tm, wheels: [], L: s.L };
  return g;
}
function crewHead(parent, x, y, z, team) {
  P(G.sph, 0xd1a27c, 0.2, 0.22, 0.2, x, y, z, parent, false);
  if (team === 'us') P(G.hemi, 0x474e2f, 0.27, 0.2, 0.29, x, y + 0.07, z, parent, false);
  else P(G.cyl8, 0x1d1d1d, 0.24, 0.12, 0.24, x, y + 0.14, z, parent, false);
  P(G.box, team === 'us' ? 0x5c5b3b : 0x262626, 0.5, 0.35, 0.4, x, y - 0.35, z, parent, false);
}

/* ---------- carga extra nos tanques (lonas, galões, caixas) ---------- */
function jerry(B, x, y, z, ry, col) { B.add(G.box, col || 0x4f5631, 0.18, 0.46, 0.34, x, y, z, 0, ry || 0, 0); B.add(G.box, 0x2c2b25, 0.06, 0.06, 0.2, x, y + 0.26, z, 0, ry || 0, 0); }
function tarpRoll(B, x, y, z, len, col) { B.add(G.cyl8, col || 0x6a6345, 0.22, len, 0.22, x, y, z, 0, 0, Math.PI / 2); B.add(G.box, 0x3a3326, 0.05, 0.47, 0.47, x - len * 0.3, y, z); B.add(G.box, 0x3a3326, 0.05, 0.47, 0.47, x + len * 0.3, y, z); }
const HULL_EXTRA = {
  sherman(B) {
    tarpRoll(B, 0.85, 2.38, -2.2, 1.0);
    for (let i = 0; i < 4; i++) B.add(G.torus, 0x8a7a50, 0.38 - i * 0.02, 0.38 - i * 0.02, 0.9, -1.0, 2.2 + i * 0.03, -1.3, Math.PI / 2, 0, 0);
    for (const z of [1.2, 0.6]) for (const sx of [-1, 1]) B.add(G.sph16, 0x3d3e36, 0.04, 0.04, 0.04, sx * 0.62, 2.31, z + 0.3);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x3f4322, 3.18, 0.02, 0.03, 0, 1.25 + i * 0.25, 0.4 - i * 0.8);
    B.add(G.ico, 0x5e5a3c, 0.6, 0.25, 0.5, 0.75, 2.3, -1.4);
    jerry(B, 1.25, 2.4, -2.95, 0); jerry(B, 1.0, 2.4, -2.95, 0);
    for (let i = 0; i < 6; i++) B.add(G.box, i % 2 ? 0x8a7a58 : 0x7c6e50, 0.55, 0.3, 0.32, -1.25 + (i % 3) * 0.42, 1.66 + Math.floor(i / 3) * 0.28, 3.05 - Math.floor(i / 3) * 0.5, 0.42, 0, 0);
    B.add(G.box, 0x2c2b25, 0.15, 0.15, 0.6, -1.35, 1.95, 2.7, 0.42, 0, 0);
  },
  panzer4(B) {
    for (let i = 0; i < 7; i++) for (const y of [1.25, 1.85]) B.add(G.sph16, 0x5a5236, 0.045, 0.045, 0.045, -1.05 + i * 0.35, y, 2.64);
    for (let i = 0; i < 3; i++) B.add(G.torus, 0x6a6040, 0.34, 0.34, 0.8, 0.6, 1.98 + i * 0.03, -1.0, Math.PI / 2, 0, 0);
    tarpRoll(B, 0, 1.98, -2.9, 1.6, 0x5d5a3c);
    for (const x of [-0.9, -0.6]) jerry(B, x, 2.05, -2.2, 0, 0x6b6440);
    B.add(G.box, 0x3d3e36, 0.4, 0.3, 1.0, 0.95, 1.95, -1.9);
  },
  tiger(B) {
    for (let i = 0; i < 9; i++) for (const y of [1.3, 1.95]) B.add(G.sph16, 0x5a5236, 0.05, 0.05, 0.05, -1.8 + i * 0.45, y, 3.63);
    tarpRoll(B, 0, 2.25, -3.3, 2.2, 0x5d5a3c);
    B.add(G.box, 0x3d3e36, 0.5, 0.35, 1.4, -1.5, 2.2, -2.4);
    for (const x of [1.2, 1.5]) jerry(B, x, 2.28, -2.6, 0, 0x6b6440);
    B.add(G.ico, 0x5e5a3c, 0.7, 0.3, 0.55, 0.9, 2.15, 2.3);
  },
};

/* ---------- veículos novos ---------- */
const VEH = {};
function spinWheel(g, x, y, z, r, w, hub) {
  const geo = merged('wheel' + r + w + hub, B => {
    B.add(G.cyl12, RUBBER_C, r, w, r, 0, 0, 0, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) {
      B.add(G.cyl12, hub, r * 0.62, 0.04, r * 0.62, sx * (w / 2 + 0.01), 0, 0, 0, 0, Math.PI / 2);
      for (let i = 0; i < 5; i++) { const a = i / 5 * Math.PI * 2; B.add(G.cyl6, 0x2c2b25, 0.035, 0.05, 0.035, sx * (w / 2 + 0.03), Math.cos(a) * r * 0.35, Math.sin(a) * r * 0.35, 0, 0, Math.PI / 2); }
      for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; B.add(G.box, 0x1c1c1a, 0.03, 0.08, 0.08, sx * (w / 2), Math.cos(a) * r * 0.96, Math.sin(a) * r * 0.96, a, 0, 0); }
    }
  });
  const m = VM(geo, g, x, y, z, true); return m;
}
const RUBBER_C = 0x222220;
const TANK_TEAM = { sherman: 'us', panzer4: 'de', tiger: 'de', halftrack: 'us', greyhound: 'us', m10: 'us', dozer: 'us', stug: 'de', sdkfz251: 'de' };
function vehicleShell(kind, s, hullFn, turretFn, gunFn, gunLen, tracks, wheels, decals) {
  s = Object.assign({}, s, (SC.paint && SC.paint[TANK_TEAM[kind]]) || {});
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  VM(merged('hull' + kind + SC.id, B => { B.cf = paintFn(s.paint, s.camo, 1.2); hullFn(B, s); }), g, 0, 0, 0, true);
  let tm = null;
  if (tracks) {
    tm = trackMaterial(1.2);
    let loop = _geoCache.get('loop' + kind);
    if (!loop) { loop = trackLoop(tracks.L, tracks.h, tracks.rs, tracks.ri); _geoCache.set('loop' + kind, loop); }
    for (const sx of [-1, 1]) { const t = new THREE.Mesh(loop, tm); t.scale.x = tracks.w; t.position.set(sx * tracks.x, 0, tracks.z || 0); t.castShadow = true; g.add(t); }
  }
  const ws = [];
  for (const w of wheels || []) for (const sx of [-1, 1]) ws.push(spinWheel(g, sx * w[0], w[1], w[2], w[3], w[4], s.paint));
  const tur = new THREE.Group(); tur.position.set(s.tur[0], s.tur[1], s.tur[2]); g.add(tur);
  if (turretFn) VM(merged('turret' + kind + SC.id, B => { B.cf = paintFn(s.paint, s.camo, 0); turretFn(B, s); }), tur, 0, 0, 0, true);
  const gun = VM(merged('gun' + kind, gunFn), tur, 0, s.gy, s.gz, true);
  const muzzle = new THREE.Object3D(); muzzle.position.set(0, s.gy, s.gz + gunLen + 0.15); tur.add(muzzle);
  if (decals) decals(g, tur);
  const sh = blob(g, 1); sh.scale.set((s.W || 3) * 1.9, s.L * 1.35, 1);
  g.userData = { turret: tur, gun, muzzle, trackMat: tm, wheels: ws, L: s.L };
  return g;
}
function mgGun(B, us) {
  B.add(G.box, 0x262624, 0.12, 0.15, 0.5, 0, 0, 0.0);
  B.add(G.cyl8, 0x262624, us ? 0.05 : 0.04, 0.9, us ? 0.05 : 0.04, 0, 0.01, 0.65, Math.PI / 2, 0, 0);
  B.add(G.box, us ? 0x4a4f2e : 0x4f5348, 0.18, 0.18, 0.25, -0.15, -0.05, 0.0);
  B.add(G.box, 0x1c1c1a, 0.05, 0.12, 0.05, 0, -0.1, -0.3);
}
function starPair(g, x, y, z, s) { for (const sx of [-1, 1]) decal(g, TEX.star, s, sx * x, y, z, 0, sx * Math.PI / 2); }
function crossPair(g, x, y, z, s) { for (const sx of [-1, 1]) decal(g, TEX.cross, s, sx * x, y, z, 0, sx * Math.PI / 2); }

// M3 Half-track
VEH.halftrack = () => vehicleShell('halftrack', { L: 6.2, paint: 0x55592e, camo: null, tur: [0, 2.15, 0.85], gy: 0.35, gz: 0.0 },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25;
    B.add(G.box, dark, 1.6, 0.3, 6.0, 0, 0.85, 0);
    B.add(G.cyl12, 0x3a3b30, 0.24, 2.0, 0.24, 0, 0.8, 3.35, 0, 0, Math.PI / 2);
    B.add(G.box, P0, 1.6, 1.05, 0.12, 0, 1.45, 3.05);
    for (let i = 0; i < 6; i++) B.add(G.box, dark, 1.3, 0.05, 0.05, 0, 1.15 + i * 0.13, 3.12);
    B.add(G.box, P0, 1.45, 0.72, 1.45, 0, 1.55, 2.3);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.55, 0.07, 1.5, sx * 0.98, 1.15, 2.05, -0.12, 0, 0);
      B.add(G.cyl8, 0x3a3a30, 0.12, 0.12, 0.12, sx * 0.62, 1.72, 3.05, Math.PI / 2, 0, 0);
      B.add(G.box, P0, 0.08, 1.15, 4.5, sx * 1.18, 1.55, -0.65);
      for (const z of [-2.2, -1.5, -0.8]) wheel(B, sx * 1.12, 0.36, z, 0.3, 0.22, dark, P0);
      wheel(B, sx * 1.12, 0.62, -0.05, 0.34, 0.24, dark, 0x3d3e36);
      wheel(B, sx * 1.12, 0.6, -2.85, 0.3, 0.22, dark, P0);
      B.add(G.cyl8, 0x6a6345, 0.17, 1.6, 0.17, sx * 1.3, 1.9, -0.9, Math.PI / 2, 0, 0);
    }
    B.add(G.box, P0, 2.36, 1.15, 0.08, 0, 1.55, -2.9);
    B.add(G.box, P0, 2.36, 0.55, 0.08, 0, 2.0, 1.6, -0.3, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, dark, 0.45, 0.06, 0.04, sx * 0.5, 2.05, 1.66);
    B.add(G.box, 0x23241a, 2.2, 0.06, 4.4, 0, 1.03, -0.65);
    for (const sx of [-1, 1]) B.add(G.box, 0x4a4630, 0.4, 0.4, 3.2, sx * 0.85, 1.25, -1.2);
    crewBust(B, -0.45, 1.85, 1.15, 'us');
    crewBust(B, 0.5, 1.75, -1.5, 'us'); crewBust(B, -0.5, 1.75, -2.1, 'us');
    B.add(G.cyl8, 0x3d3e36, 0.07, 1.1, 0.07, 0, 1.6, 0.85);
    for (let i = 0; i < 4; i++) jerry(B, -0.75 + i * 0.5, 1.4, -3.05, 0);
  },
  null,
  (B) => { mgGun(B, true); B.add(G.box, 0x3d3e36, 0.6, 0.45, 0.05, 0, 0.12, 0.3); },
  1.1, { L: 3.2, h: 0.95, rs: 0.36, ri: 0.32, w: 0.5, x: 1.0, z: -1.45 },
  [[1.02, 0.5, 2.0, 0.5, 0.32]],
  (g) => { starPair(g, 1.23, 1.6, -0.5, 0.9); decal(g, TEX.star, 1.0, 0, 1.93, 2.3, -Math.PI / 2, 0); });

// M8 Greyhound
VEH.greyhound = () => vehicleShell('greyhound', { L: 6.0, paint: 0x55592e, camo: null, tur: [0, 1.62, -0.3], gy: 0.38, gz: 0.85 },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25;
    B.add(sideProfile([[2.9, 0.75], [3.08, 1.1], [2.2, 1.62], [-2.55, 1.62], [-2.95, 1.35], [-2.95, 0.75]], 2.4, 3), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.42, 0.07, 5.4, sx * 1.36, 1.32, -0.1);
      B.add(G.box, P0, 0.42, 0.07, 0.8, sx * 1.36, 1.15, 2.9, -0.45, 0, 0);
      B.add(G.box, 0x4a4f2e, 0.25, 0.4, 0.9, sx * 1.32, 1.0, 1.0);
      B.add(G.box, 0x4a4f2e, 0.25, 0.4, 0.9, sx * 1.32, 1.0, -0.75);
      B.add(G.cyl8, 0x3a3a30, 0.12, 0.14, 0.12, sx * 0.85, 1.35, 3.0, Math.PI / 2, 0, 0);
    }
    B.add(G.box, dark, 0.6, 0.12, 0.05, -0.5, 1.42, 2.62, -0.5, 0, 0);
    B.add(G.box, dark, 0.6, 0.12, 0.05, 0.5, 1.42, 2.62, -0.5, 0, 0);
    for (let i = 0; i < 4; i++) B.add(G.box, dark, 1.8, 0.04, 0.12, 0, 1.63, -1.4 - i * 0.3);
    tarpRoll(B, 0, 1.85, -2.5, 1.6);
  },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25;
    B.add(G.cyl12, P0, 1.05, 0.62, 1.05, 0, 0.31, 0);
    B.add(G.cyl12, 0x23241a, 0.95, 0.04, 0.95, 0, 0.6, 0);
    B.add(G.box, P0, 0.7, 0.5, 0.35, 0, 0.38, 0.95);
    B.add(G.cyl12, dark, 0.7, 0.05, 0.7, 0, 1.0, -0.2);
    for (const a of [0, 2.1, 4.2]) B.add(G.cyl8, dark, 0.025, 0.42, 0.025, Math.sin(a) * 0.68, 0.8, -0.2 + Math.cos(a) * 0.68);
    B.add(G.box, 0x262624, 0.12, 0.14, 0.45, 0.4, 1.12, -0.6);
    B.add(G.cyl8, 0x262624, 0.045, 0.9, 0.045, 0.4, 1.12, -0.05, Math.PI / 2, 0, 0);
    crewBust(B, -0.35, 1.05, -0.15, 'us'); crewBust(B, 0.35, 1.0, -0.35, 'us');
  },
  (B) => { B.add(G.cyl12, 0x3a3b2c, 0.065, 2.0, 0.065, 0, 0, 1.0, Math.PI / 2, 0, 0); B.add(G.cyl12, 0x3a3b2c, 0.09, 0.4, 0.09, 0, 0, 0.2, Math.PI / 2, 0, 0); },
  2.0, null,
  [[1.25, 0.55, 1.95, 0.55, 0.36], [1.25, 0.55, 0.1, 0.55, 0.36], [1.25, 0.55, -1.7, 0.55, 0.36]],
  (g, tur) => { starPair(tur, 1.06, 0.32, 0, 0.75); decal(g, TEX.star, 1.1, 0, 1.63, -0.3 - 1.6, -Math.PI / 2, 0); });

// Shermans/M10: trem de rolamento VVSS compartilhado
function shermanRunning(B, s) {
  const P0 = s.paint, L = s.L, W = s.W, tx = W / 2 - s.tw / 2, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(sideProfile([[3.35, 0.5], [3.62, 0.78], [3.55, 1.15], [-3.3, 1.15], [-3.42, 0.55]], W - 1.3, 2), P0, 1, 1, 1, 0, 0, 0);
  for (const sx of [-1, 1]) {
    for (const bz of [-2.15, -0.15, 1.85]) {
      B.add(G.box, P0, 0.26, 0.5, 0.95, sx * (tx + 0.2), 0.62, bz);
      B.add(G.cyl8, met, 0.12, 0.2, 0.12, sx * (tx + 0.2), 1.02, bz - 0.1, 0, 0, Math.PI / 2);
      for (const dz of [-0.42, 0.42]) wheel(B, sx * (tx + 0.18), 0.4, bz + dz, 0.37, 0.28, dark, P0);
    }
    wheel(B, sx * (tx + 0.16), s.th - 0.42, L / 2 - 0.42, 0.4, 0.3, dark, met);
    wheel(B, sx * (tx + 0.16), s.th - 0.38, -L / 2 + 0.38, 0.34, 0.3, dark, P0);
  }
}
VEH.m10 = () => vehicleShell('m10', { L: 6.9, W: 3.2, tw: 0.62, th: 1.15, paint: 0x545a33, camo: null, tur: [0, 2.05, -0.25], gy: 0.5, gz: 1.15 },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25;
    shermanRunning(B, s);
    B.add(sideProfile([[3.15, 1.12], [3.35, 1.42], [1.4, 2.05], [-2.6, 2.05], [-3.3, 1.75], [-3.42, 1.12]], 2.3, 4), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.1, 1.05, 5.9, sx * 1.36, 1.6, -0.4, 0, 0, -sx * 0.42);
      B.add(G.box, P0, 0.65, 0.05, 0.55, sx * 1.29, 1.18, 3.3);
      for (let i = 0; i < 4; i++) B.add(G.box, 0x6e4c2c, 0.05, 0.1, 0.6, sx * 1.58, 1.4 + (i % 2) * 0.2, -1.8 + Math.floor(i / 2) * 1.6, 0, 0, -sx * 0.42);
    }
    B.add(G.box, P0, 0.6, 0.3, 0.55, -0.6, 2.0, 1.45, -0.25, 0, 0);
    B.add(G.box, P0, 0.6, 0.3, 0.55, 0.6, 2.0, 1.45, -0.25, 0, 0);
    for (let i = 0; i < 5; i++) B.add(G.box, dark, 1.9, 0.04, 0.1, 0, 2.06, -1.2 - i * 0.28);
    tarpRoll(B, -0.6, 2.25, -2.6, 1.1);
  },
  (B, s) => {
    const P0 = s.paint;
    const pent = [[-0.95, 1.05], [0.95, 1.05], [1.32, -0.2], [0.9, -1.05], [-0.9, -1.05], [-1.32, -0.2]];
    B.add(G.cyl12, 0x2c2b25, 1.15, 0.1, 1.15, 0, 0.05, 0);
    B.add(planProfile(pent, 0.85, 1), P0, 1, 1, 1, 0, 0.08, 0);
    B.add(planProfile(pent.map(([x, z]) => [x * 0.9, z * 0.9]), 0.05, 1), 0x23241a, 1, 1, 1, 0, 0.88, 0);
    B.add(G.box, P0, 0.9, 0.6, 0.35, 0, 0.5, 1.15);
    for (const sx of [-1, 1]) B.add(G.box, P0, 0.5, 0.6, 0.8, sx * 0.5, 0.45, -1.4);
    crewBust(B, -0.45, 1.15, -0.3, 'us'); crewBust(B, 0.5, 1.1, -0.5, 'us');
    B.add(G.box, 0x262624, 0.12, 0.14, 0.45, 0.7, 1.15, -0.85);
    B.add(G.cyl8, 0x262624, 0.045, 0.9, 0.045, 0.7, 1.15, -0.25, Math.PI / 2, 0, 0);
  },
  (B) => { B.add(G.cyl12, 0x45472f, 0.14, 0.5, 0.14, 0, 0, 0.25, Math.PI / 2, 0, 0); B.add(G.cyl12, 0x45472f, 0.1, 3.9, 0.1, 0, 0, 2.4, Math.PI / 2, 0, 0); },
  4.35, { L: 6.9, h: 1.15, rs: 0.42, ri: 0.38, w: 0.62, x: 1.29 }, null,
  (g, tur) => { starPair(g, 1.6, 1.6, -0.5, 0.9); decal(g, TEX.star, 1.3, 0, 2.065, -2.0, -Math.PI / 2, 0); });

// StuG III Ausf. G
VEH.stug = () => vehicleShell('stug', { L: 6.6, W: 3.1, tw: 0.55, th: 1.0, paint: 0x9a8a56, camo: [0x56603a, 0x6b4a33], tur: [0, 1.62, 2.35], gy: 0.12, gz: 0.25 },
  (B, s) => {
    const P0 = s.paint, L = s.L, W = s.W, tx = W / 2 - s.tw / 2, dark = 0x2c2b25, met = 0x3d3e36;
    B.add(sideProfile([[3.2, 0.45], [3.45, 0.9], [3.35, 1.1], [-3.2, 1.1], [-3.3, 0.5]], W - 1.3, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[3.35, 1.08], [2.75, 1.4], [2.55, 1.4], [2.25, 2.05], [-0.75, 2.05], [-0.95, 1.7], [-3.2, 1.65], [-3.3, 1.08]], 2.55, 4), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, s.tw + 0.15, 0.06, L - 0.3, sx * tx, 1.1, 0);
      for (let i = 0; i < 6; i++) wheel(B, sx * (tx + 0.17), 0.36, -2.35 + i * 0.86, 0.33, 0.22, dark, P0);
      for (let i = 0; i < 3; i++) B.add(G.cyl8, dark, 0.1, 0.16, 0.1, sx * (tx + 0.14), 0.9, -1.8 + i * 1.6, 0, 0, Math.PI / 2);
      wheel(B, sx * (tx + 0.14), s.th - 0.36, L / 2 - 0.38, 0.36, 0.26, dark, met);
      wheel(B, sx * (tx + 0.14), s.th - 0.33, -L / 2 + 0.35, 0.3, 0.24, dark, P0);
      B.add(G.box, met, 0.05, 0.05, L - 1.0, sx * (W / 2 + 0.17), 1.66, -0.3);
      for (let i = 0; i < 5; i++) { if (sx > 0 && i === 1) continue; B.add(G.box, P0, 0.05, 0.85, 1.12, sx * (W / 2 + 0.2), 1.22, -2.5 + i * 1.12, 0, 0, sx * 0.05); }
    }
    B.add(G.cyl12, P0, 0.4, 0.3, 0.4, -0.7, 2.2, -0.2);
    B.add(G.cyl12, dark, 0.41, 0.07, 0.41, -0.7, 2.25, -0.2);
    crewBust(B, -0.7, 2.7, -0.2, 'de');
    B.add(G.box, P0, 0.9, 0.5, 0.05, 0.55, 2.35, 0.25);
    B.add(G.box, 0x1e1e1c, 0.1, 0.12, 0.8, 0.55, 2.35, 0.55);
    for (let i = 0; i < 6; i++) B.add(G.box, 0x3a3934, 0.36, 0.06, 0.22, -0.9 + i * 0.36, 1.25, 3.0, 0.5, 0, 0);
    tarpRoll(B, 0, 1.88, -2.6, 1.6, 0x5d5a3c);
    jerry(B, 0.9, 1.95, -1.6, 0, 0x6b6440);
  },
  (B, s) => { B.add(G.sph, s.paint, 0.5, 0.45, 0.55, 0, 0.12, 0.05); B.add(G.box, 0x2c2b25, 0.1, 0.1, 0.06, -0.3, 0.2, 0.5); },
  (B) => { B.add(G.cyl12, 0x6f6440, 0.085, 3.4, 0.085, 0, 0, 1.75, Math.PI / 2, 0, 0); B.add(G.cyl12, 0x45452f, 0.15, 0.34, 0.15, 0, 0, 3.5, Math.PI / 2, 0, 0); },
  3.7, { L: 6.6, h: 1.0, rs: 0.4, ri: 0.36, w: 0.55, x: 1.27 }, null,
  (g) => { crossPair(g, 1.79, 1.25, -0.4, 0.75); });

// Sd.Kfz. 251 meia-lagarta alemã
VEH.sdkfz251 = () => vehicleShell('sdkfz251', { L: 6.0, paint: 0x9a8a56, camo: [0x56603a, 0x6b4a33], tur: [0, 2.1, 0.75], gy: 0.32, gz: 0.0 },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25;
    B.add(G.box, dark, 1.5, 0.3, 5.6, 0, 0.8, 0);
    B.add(sideProfile([[3.05, 0.95], [3.05, 1.25], [1.6, 1.85], [1.3, 1.9], [1.3, 1.0]], 1.5, 2), P0, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, 0.08, 1.0, 4.4, sx * 1.02, 1.5, -0.95, 0, 0, sx * 0.18);
      B.add(G.box, P0, 0.08, 0.5, 4.4, sx * 0.88, 0.95, -0.95, 0, 0, -sx * 0.25);
      B.add(G.box, P0, 0.5, 0.07, 1.3, sx * 0.95, 1.05, 2.1, -0.15, 0, 0);
      for (let i = 0; i < 6; i++) { const outer = i % 2 === 0; wheel(B, sx * (0.95 + (outer ? 0.14 : 0.0)), 0.45, -2.75 + i * 0.42, 0.4, 0.18, dark, P0); }
      wheel(B, sx * 1.0, 0.6, -0.4, 0.34, 0.24, dark, 0x3d3e36);
    }
    B.add(G.box, P0, 2.2, 1.0, 0.08, 0, 1.5, -3.15, 0.15, 0, 0);
    B.add(G.box, P0, 2.0, 0.45, 0.08, 0, 2.05, 1.32, -0.35, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, dark, 0.45, 0.06, 0.04, sx * 0.45, 2.1, 1.38);
    B.add(G.box, 0x23241a, 1.9, 0.06, 4.2, 0, 1.03, -0.95);
    crewBust(B, -0.4, 1.85, 0.9, 'de'); crewBust(B, 0.45, 1.75, -1.4, 'de'); crewBust(B, -0.45, 1.75, -2.0, 'de');
    B.add(G.cyl8, 0x3d3e36, 0.06, 0.9, 0.06, 0, 1.6, 0.75);
    jerry(B, -0.75, 1.4, -3.3, 0, 0x6b6440); jerry(B, 0.75, 1.4, -3.3, 0, 0x6b6440);
  },
  null,
  (B) => { mgGun(B, false); B.add(G.box, 0x5d6052, 0.75, 0.5, 0.04, 0, 0.12, 0.3); B.add(G.box, 0x111111, 0.12, 0.1, 0.05, 0, 0.12, 0.31); },
  1.0, { L: 3.3, h: 0.95, rs: 0.36, ri: 0.32, w: 0.42, x: 0.95, z: -1.55 },
  [[0.95, 0.48, 2.1, 0.48, 0.28]],
  (g) => { crossPair(g, 1.12, 1.5, -1.0, 0.7); });

/* ---------- veículo de construção (trator D7 blindado do Corpo de Engenheiros) ---------- */
function makeDozer() {
  const s = { L: 6.2, paint: 0x575a31, camo: null, tur: [0, 0, 0], gy: 0, gz: 0 };
  const g = vehicleShell('dozer', s, (B) => {
    const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36;
    B.add(G.box, dark, 1.9, 0.6, 5.4, 0, 0.75, 0);
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 5; i++) wheel(B, sx * 1.45, 0.38, -2.0 + i * 1.0, 0.33, 0.26, dark, met);
      B.add(G.box, P0, 0.95, 0.06, 5.4, sx * 1.4, 1.2, 0);
      B.add(G.box, met, 0.28, 0.3, 3.4, sx * 2.0, 0.95, 2.6, -0.08, 0, 0);
      B.add(G.cyl8, met, 0.09, 1.4, 0.09, sx * 1.0, 2.6, 2.0, 0.6, 0, sx * 0.2);
    }
    B.add(G.box, P0, 1.6, 1.35, 2.7, 0, 2.0, 0.95);
    B.add(G.box, dark, 1.4, 1.1, 0.06, 0, 1.95, 2.33);
    for (let i = 0; i < 7; i++) B.add(G.box, met, 0.05, 1.05, 0.05, -0.6 + i * 0.2, 1.95, 2.37);
    B.add(G.cyl8, 0x2b2b25, 0.13, 1.5, 0.13, 0.5, 3.3, 1.7);
    B.add(G.cyl8, 0x2b2b25, 0.17, 0.12, 0.17, 0.5, 4.05, 1.7);
    B.add(G.cyl8, met, 0.2, 0.7, 0.2, -0.45, 3.0, 1.2);
    B.add(G.box, met, 2.0, 0.12, 0.12, 0, 3.4, 2.15);
    for (const sx of [-1, 1]) B.add(G.box, met, 0.12, 1.9, 0.12, sx * 0.9, 2.5, 2.25, 0.25, 0, 0);
    B.add(G.cyl12, met, 0.28, 1.3, 0.28, 0, 1.05, 2.75, 0, 0, Math.PI / 2);
    // posto do operador blindado (Dia D)
    B.add(G.box, P0, 2.4, 1.4, 0.1, 0, 2.15, -0.5);
    for (const sx of [-1, 1]) B.add(G.box, P0, 0.1, 1.4, 1.9, sx * 1.2, 2.15, -1.45);
    B.add(G.box, dark, 1.2, 0.1, 0.05, 0, 2.55, -0.43);
    B.add(G.box, 0x3a3b25, 0.9, 0.5, 0.8, 0, 1.6, -1.5);
    crewBust(B, 0, 2.45, -1.5, 'us');
    B.add(G.cyl12, P0, 0.45, 1.6, 0.45, 0, 1.5, -2.7, 0, 0, Math.PI / 2);
    B.add(G.box, 0x6b5a3a, 1.6, 0.8, 1.0, 0, 2.3, -2.75);
    B.add(G.box, 0x7a6845, 0.2, 0.2, 2.6, -0.5, 2.8, -2.5);
    // lâmina
    B.add(G.box, met, 4.4, 1.6, 0.25, 0, 1.0, 4.25);
    B.add(G.box, 0x4a4c2c, 4.4, 0.2, 0.45, 0, 1.85, 4.1);
    B.add(G.box, 0x6a6a60, 4.4, 0.15, 0.4, 0, 0.25, 4.38);
    for (const sx of [-1, 1]) B.add(G.box, met, 0.15, 1.6, 0.55, sx * 2.2, 1.0, 4.05);
    for (let i = 0; i < 5; i++) B.add(G.box, 0x3a3b30, 0.12, 1.3, 0.08, -1.6 + i * 0.8, 1.05, 4.08);
  }, null, (B) => B.add(G.box, 0x2c2b25, 0.01, 0.01, 0.01, 0, 0, 0), 0, { L: 5.6, h: 1.15, rs: 0.45, ri: 0.4, w: 0.85, x: 1.4 }, null,
  (gg) => { starPair(gg, 0.81, 2.0, 0.9, 0.9); });
  return g;
}

/* ---------- barcaça Higgins (LCVP) ---------- */
function makeLCVP(n) {
  const g = new THREE.Group();
  VM(merged('lcvp', B => {
    const c = 0x66757b, c2 = 0x56636a, dk = 0x2e3438;
    B.add(sideProfile([[5.4, 0.3], [4.6, -0.35], [-4.8, -0.35], [-5.6, 0.3]], 3.6, 2), c2, 1, 1, 1, 0, 0, 0);
    for (const sx of [-1, 1]) B.add(G.box, c, 0.22, 2.0, 11, sx * 1.7, 1.2, 0);
    B.add(G.box, dk, 3.1, 0.06, 10.4, 0, 0.32, 0);
    for (const sx of [-1, 1]) {
      B.add(G.box, 0x7a8a90, 0.3, 0.12, 11, sx * 1.75, 2.06, 0);
      for (let i = 0; i < 5; i++) B.add(G.box, dk, 0.05, 1.5, 0.08, sx * 1.6, 1.15, -3 + i * 1.8);
    }
    B.add(G.box, c, 3.6, 2.6, 1.6, 0, 1.3, -4.9);
    B.add(G.box, 0x3e4a50, 1.0, 0.9, 0.9, 1.05, 2.9, -4.7);
    for (const sx of [-1, 1]) {
      B.add(G.cyl8, 0x2a2a2a, 0.05, 0.6, 0.05, sx * 1.2, 2.9, -4.2);
      B.add(G.box, 0x262624, 0.12, 0.14, 0.45, sx * 1.2, 3.25, -4.1);
      B.add(G.cyl8, 0x262624, 0.04, 0.8, 0.04, sx * 1.2, 3.27, -3.5, Math.PI / 2, 0, 0);
    }
    crewBust(B, -0.9, 2.75, -4.6, 'us');
    B.add(G.box, 0xe8e2d2, 0.9, 0.35, 0.03, 0, 1.4, -5.72);
  }), g, 0, 0, 0, true);
  const ramp = new THREE.Group(); ramp.position.set(0, 0.0, 5.4); g.add(ramp);
  VM(merged('lcvpRamp', B => {
    B.add(G.box, 0x66757b, 3.4, 2.4, 0.22, 0, 1.2, 0);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x56636a, 3.3, 0.1, 0.1, 0, 0.4 + i * 0.55, 0.14);
    for (const sx of [-1, 1]) B.add(G.box, 0x56636a, 0.1, 2.3, 0.1, sx * 1.0, 1.2, 0.14);
  }), ramp, 0, 0, 0, true);
  const troops = [];
  for (let i = 0; i < n; i++) {
    const s = makeSoldier('us', 'rifle');
    s.position.set(i % 2 ? -0.75 : 0.75, 0.3, 3.6 - Math.floor(i / 2) * 1.55);
    s.scale.setScalar(1.0); g.add(s); troops.push(s);
  }
  g.userData = { ramp, troops };
  return g;
}

/* ---------- aviões ---------- */
G.taper = new THREE.CylinderGeometry(0.45, 1, 1, 12);
const GLASS = 0x5c7682;
// pintura de avião: parte de baixo cinza claro, camuflagem opcional
function planePaint(top, under, camo) {
  const cT = new THREE.Color(under), cA = camo ? new THREE.Color(camo[0]) : null, cB = camo ? new THREE.Color(camo[1]) : null;
  return (x, y, z, base) => {
    if (base.getHex() !== top) return base;
    if (y < -0.15) return cT;
    if (cA) { const n = Math.sin(x * 0.9 + z * 0.4) + Math.sin(z * 0.7 - x * 0.5 + 1.3); if (n > 0.9) return cA; if (n < -0.9) return cB; }
    return base;
  };
}
function wingPlan(B, col, root, tip, span, x0, y, z, h, side) {
  const pts = [[x0, z + root * 0.55], [x0 + span, z + tip * 0.6], [x0 + span + 0.2, z - tip * 0.4], [x0, z - root * 0.45]].map(([x, zz]) => [x * side, zz]);
  if (side < 0) pts.reverse();
  B.add(planProfile(pts, h, 1), col, 1, 1, 1, 0, y, 0);
}
function stripes(B, x0, w, z0, z1, y, h, side) {
  for (let i = 0; i < 5; i++) B.add(G.box, i % 2 ? 0x161616 : 0xf2f0e8, w, h, Math.abs(z1 - z0), side * (x0 + (i + 0.5) * w), y, (z0 + z1) / 2);
}
function propMesh(g, x, y, z, r, blades) {
  const geo = merged('prop' + r + blades, B => {
    B.add(G.cone, 0x2c2c28, 0.35, 0.8, 0.35, 0, 0, 0.3, Math.PI / 2, 0, 0);
    for (let i = 0; i < blades; i++) B.add(G.box, 0x1c1c1a, 0.24, r, 0.06, Math.sin(i / blades * Math.PI * 2) * r / 2, Math.cos(i / blades * Math.PI * 2) * r / 2, 0, 0, 0, -i / blades * Math.PI * 2);
    for (let i = 0; i < blades; i++) B.add(G.box, 0xd8c040, 0.25, 0.3, 0.07, Math.sin(i / blades * Math.PI * 2) * r * 0.92, Math.cos(i / blades * Math.PI * 2) * r * 0.92, 0, 0, 0, -i / blades * Math.PI * 2);
  });
  const m = new THREE.Mesh(geo, VC_MAT); m.position.set(x, y, z); g.add(m); return m;
}
function makePlane(kind) {
  const g = new THREE.Group(); const props = [];
  if (kind === 'p47' || kind === 'fw190') {
    const us = kind === 'p47', navy = us && SC.biome === 'tropical', stripesOn = us && SC.id === 'omaha';
    const top = us ? (navy ? 0x2f4a66 : 0x4f5530) : 0x6d7468;
    VM(merged('plane' + kind + (navy ? 'n' : '') + (stripesOn ? 's' : ''), B => {
      B.cf = planePaint(top, us ? (navy ? 0xc8ccd0 : 0x8d908a) : 0xa9b4b8, us ? null : [0x58604f, 0x7f857a]);
      const L = us ? 1 : 0.85, R = us ? 0.95 : 0.78;
      B.add(G.cyl12, top, R * 0.88, 5.2 * L, R, 0, 0, 1.6 * L, Math.PI / 2, 0, 0);
      B.add(G.taper, top, R * 0.88, 6.2 * L, R, 0, 0.05, -4.1 * L, -Math.PI / 2, 0, 0);
      B.add(G.cyl12, us ? 0x3e4428 : 0x5a6052, R * 1.08, 1.5, R * 1.12, 0, 0, 4.6 * L, Math.PI / 2, 0, 0);
      B.add(G.cyl12, 0x1e1e1c, R * 0.85, 0.05, R * 0.85, 0, 0, 5.36 * L, Math.PI / 2, 0, 0);
      if (!us) B.add(G.cyl12, 0xd9b52a, R * 1.1, 0.5, R * 1.13, 0, -0.02, 3.9 * L, Math.PI / 2, 0, 0);
      B.add(G.sph, GLASS, 0.5, 0.5, 1.2, 0, R * 0.9, 0.4 * L);
      B.add(G.box, 0x2c2c28, 0.06, 0.5, 0.06, 0, R * 1.1, 0.9 * L);
      wingPlan(B, top, 2.9, 1.3, us ? 6.6 : 5.6, 0.6, -0.5, 1.2 * L, 0.28, 1);
      wingPlan(B, top, 2.9, 1.3, us ? 6.6 : 5.6, 0.6, -0.5, 1.2 * L, 0.28, -1);
      wingPlan(B, top, 1.4, 0.7, 2.4, 0.2, 0.1, -6.9 * L, 0.16, 1);
      wingPlan(B, top, 1.4, 0.7, 2.4, 0.2, 0.1, -6.9 * L, 0.16, -1);
      B.add(sideProfile([[-6.0 * L, 0.3], [-6.5 * L, 2.3], [-7.6 * L, 2.4], [-7.9 * L, 0.3]], 0.16, 1), top, 1, 1, 1, 0, 0, 0);
      if (stripesOn) {
        for (const sx of [-1, 1]) stripes(B, 2.4, 0.45, 2.55, -0.55, -0.35, 0.32, sx);
        for (let i = 0; i < 5; i++) B.add(G.cyl12, i % 2 ? 0x161616 : 0xf2f0e8, 0.82 - i * 0.04, 0.42, 0.86 - i * 0.04, 0, 0.02, -2.6 - i * 0.42, Math.PI / 2, 0, 0);
      }
      for (const sx of [-1, 1]) for (let k = 0; k < (us ? 4 : 2); k++) B.add(G.cyl8, 0x1c1c1a, 0.05, 0.9, 0.05, sx * (2.4 + k * 0.32), -0.5, 3.1, Math.PI / 2, 0, 0);
      if (us) for (const sx of [-1, 1]) B.add(G.cyl8, 0x55592e, 0.12, 2.0, 0.12, sx * 4.6, -0.85, 1.7, Math.PI / 2, 0, 0);
      else B.add(G.cyl8, 0x3a3a34, 0.22, 1.6, 0.22, 0, -1.1, 1.4, Math.PI / 2, 0, 0);
    }), g, 0, 0, 0, true);
    props.push(propMesh(g, 0, 0, 5.5 * (us ? 1 : 0.85), us ? 2.4 : 2.0, us ? 4 : 3));
    if (us) { decal(g, TEX.star, 1.6, -5.0, -0.2, 0.8, -Math.PI / 2, 0); decal(g, TEX.star, 1.6, 5.0, -0.52, 0.8, Math.PI / 2, 0); }
    else {
      for (const sx of [-1, 1]) decal(g, TEX.cross, 1.3, sx * 4.0, -0.2, 0.7, -Math.PI / 2, 0);
      for (const sx of [-1, 1]) decal(g, TEX.cross, 0.9, sx * 0.58, 0.05, -2.9, 0, sx * Math.PI / 2);
    }
  } else if (kind === 'c47') {
    const top = 0x4f5530;
    const sOn = SC.id === 'omaha';
    VM(merged('planec47' + (sOn ? 's' : ''), B => {
      B.cf = planePaint(top, 0x8d908a, null);
      B.add(G.cyl12, top, 1.2, 9.5, 1.35, 0, 0, 1.0, Math.PI / 2, 0, 0);
      B.add(G.taper, top, 1.2, 6.5, 1.35, 0, 0.25, -7.0, -Math.PI / 2, 0, 0);
      B.add(G.sph, top, 1.2, 1.25, 2.2, 0, -0.05, 5.6);
      B.add(G.box, GLASS, 1.6, 0.45, 0.6, 0, 0.75, 6.6, -0.5, 0, 0);
      for (let i = 0; i < 6; i++) for (const sx of [-1, 1]) B.add(G.box, GLASS, 0.05, 0.35, 0.4, sx * 1.2, 0.35, 3.5 - i * 1.2);
      B.add(G.box, 0x161616, 0.06, 1.7, 1.6, -1.23, -0.1, -2.6);
      wingPlan(B, top, 3.6, 1.4, 11.5, 0.8, -0.7, 1.8, 0.32, 1);
      wingPlan(B, top, 3.6, 1.4, 11.5, 0.8, -0.7, 1.8, 0.32, -1);
      wingPlan(B, top, 2.0, 1.0, 4.0, 0.3, 0.6, -9.3, 0.16, 1);
      wingPlan(B, top, 2.0, 1.0, 4.0, 0.3, 0.6, -9.3, 0.16, -1);
      B.add(sideProfile([[-8.4, 0.9], [-9.8, 4.2], [-11.0, 4.3], [-11.1, 0.9]], 0.2, 1), top, 1, 1, 1, 0, 0, 0);
      for (const sx of [-1, 1]) {
        B.add(G.cyl12, top, 0.85, 4.2, 0.9, sx * 4.3, -0.55, 2.6, Math.PI / 2, 0, 0);
        B.add(G.cyl12, 0x3e4428, 0.95, 0.9, 0.95, sx * 4.3, -0.55, 4.6, Math.PI / 2, 0, 0);
        if (sOn) stripes(B, 5.9, 0.55, 3.4, 0.4, -0.55, 0.38, sx);
      }
      if (sOn) for (let i = 0; i < 5; i++) B.add(G.cyl12, i % 2 ? 0x161616 : 0xf2f0e8, 1.12 - i * 0.05, 0.5, 1.26 - i * 0.05, 0, 0.12, -4.5 - i * 0.5, Math.PI / 2, 0, 0);
    }), g, 0, 0, 0, true);
    for (const sx of [-1, 1]) props.push(propMesh(g, sx * 4.3, -0.55, 5.15, 2.4, 3));
    decal(g, TEX.star, 2.0, -8.2, -0.36, 1.4, -Math.PI / 2, 0); decal(g, TEX.star, 2.0, 8.2, -0.72, 1.4, Math.PI / 2, 0);
    for (const sx of [-1, 1]) decal(g, TEX.star, 1.3, sx * 1.26, 0.1, -2.8 + (sx > 0 ? 0 : 1.9), 0, sx * Math.PI / 2);
  } else if (kind === 'b26') {
    const top = 0x4f5530;
    const sOn = SC.id === 'omaha';
    VM(merged('planeb26' + (sOn ? 's' : ''), B => {
      B.cf = planePaint(top, 0x8d908a, null);
      B.add(G.cyl12, top, 1.05, 11, 1.15, 0, 0, 1.5, Math.PI / 2, 0, 0);
      B.add(G.taper, top, 1.05, 6.5, 1.15, 0, 0.15, -7.2, -Math.PI / 2, 0, 0);
      B.add(G.taper, top, 1.05, 2.4, 1.15, 0, 0, 8.2, Math.PI / 2, 0, 0);
      B.add(G.sph, GLASS, 0.55, 0.6, 0.9, 0, 0, 9.3);
      B.add(G.sph, GLASS, 0.6, 0.5, 1.4, 0, 1.0, 5.5);
      B.add(G.sph, GLASS, 0.55, 0.5, 0.55, 0, 1.1, -1.5);
      for (const sx of [-1, 1]) B.add(G.cyl8, 0x1c1c1a, 0.05, 1.0, 0.05, sx * 0.18, 1.35, -1.2, Math.PI / 2, 0, 0);
      wingPlan(B, top, 3.8, 1.7, 11.5, 1.0, 0.55, 2.2, 0.32, 1);
      wingPlan(B, top, 3.8, 1.7, 11.5, 1.0, 0.55, 2.2, 0.32, -1);
      wingPlan(B, top, 2.2, 1.1, 4.4, 0.3, 1.6, -9.6, 0.18, 1);
      wingPlan(B, top, 2.2, 1.1, 4.4, 0.3, 1.6, -9.6, 0.18, -1);
      B.add(sideProfile([[-8.6, 0.8], [-9.6, 4.6], [-11.0, 4.7], [-11.2, 0.8]], 0.2, 1), top, 1, 1, 1, 0, 0, 0);
      for (const sx of [-1, 1]) {
        B.add(G.cyl12, top, 0.95, 5.6, 1.0, sx * 4.4, 0.1, 2.6, Math.PI / 2, 0, 0);
        B.add(G.cyl12, 0x3e4428, 1.05, 1.0, 1.05, sx * 4.4, 0.1, 5.2, Math.PI / 2, 0, 0);
        B.add(G.cyl12, 0x1e1e1c, 0.85, 0.05, 0.85, sx * 4.4, 0.1, 5.72, Math.PI / 2, 0, 0);
        if (sOn) stripes(B, 6.2, 0.55, 3.3, 0.9, 0.62, 0.38, sx);
      }
      if (sOn) for (let i = 0; i < 5; i++) B.add(G.cyl12, i % 2 ? 0x161616 : 0xf2f0e8, 0.98 - i * 0.04, 0.5, 1.08 - i * 0.04, 0, 0.1, -4.6 - i * 0.5, Math.PI / 2, 0, 0);
      B.add(G.box, 0x1c1c1a, 0.5, 0.4, 0.6, 0, 0.4, -11.4);
    }), g, 0, 0, 0, true);
    for (const sx of [-1, 1]) props.push(propMesh(g, sx * 4.4, 0.1, 5.85, 2.5, 4));
    decal(g, TEX.star, 2.2, -8.5, 0.89, 1.6, -Math.PI / 2, 0); decal(g, TEX.star, 2.2, 8.5, 0.53, 1.6, Math.PI / 2, 0);
    for (const sx of [-1, 1]) decal(g, TEX.star, 1.3, sx * 1.12, 0.1, -3.2, 0, sx * Math.PI / 2);
  }
  g.userData = { props };
  return g;
}
function makeBomb() {
  return VM(merged('bomb', B => {
    B.add(G.cyl12, 0x4a4f2e, 0.32, 1.4, 0.32, 0, 0, 0, Math.PI / 2, 0, 0);
    B.add(G.cone, 0x4a4f2e, 0.32, 0.5, 0.32, 0, 0, 0.95, Math.PI / 2, 0, 0);
    for (let i = 0; i < 4; i++) B.add(G.box, 0x3a3e24, 0.04, 0.7, 0.4, 0, 0, -0.85, 0, 0, i * Math.PI / 2);
    B.add(G.cyl12, 0xd9b52a, 0.33, 0.08, 0.33, 0, 0, 0.5, Math.PI / 2, 0, 0);
  }), null, 0, 0, 0, true);
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

/* ---------- navios jogáveis: contratorpedeiro e lancha S-Boot ---------- */
function ddTurret(g, x, y, z) {
  const t = new THREE.Group(); t.position.set(x, y, z); g.add(t);
  VM(merged('ddTurret', B => {
    B.add(G.box, 0x8a9298, 2.0, 1.3, 2.6, 0, 0.65, 0);
    B.add(G.cyl12, 0x8a9298, 1.05, 1.3, 1.05, 0, 0.65, -0.9);
    B.add(G.cyl12, 0x3a4046, 0.13, 3.4, 0.13, 0, 0.75, 2.8, Math.PI / 2, 0, 0);
  }), t, 0, 0, 0, true);
  return t;
}
function makeShip(kind) {
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  if (kind === 'destroyer') {
    VM(merged('ddHull', B => {
      const hullCol = 0x8a9298, low = new THREE.Color(0x3e4c5a);
      B.cf = (x, y, z, base) => (base.getHex() === hullCol && y < 1.4 ? low : base);
      const plan = [[0, 24.5], [2.0, 19], [2.9, 10], [2.9, -18], [2.4, -23.5], [-2.4, -23.5], [-2.9, -18], [-2.9, 10], [-2.0, 19]];
      B.add(planProfile(plan, 4.4, 2), hullCol, 1, 1, 1, 0, -1.6, 0);
      B.add(planProfile(plan.map(([x, z]) => [x * 0.95, z * 0.97]), 0.08, 1), 0x6d6a62, 1, 1, 1, 0, 2.8, 0);
      B.add(G.box, hullCol, 3.6, 2.4, 8, 0, 4.0, 7.5);
      B.add(G.box, hullCol, 3.0, 1.6, 3.4, 0, 5.9, 9.0);
      B.add(G.box, 0x222830, 3.05, 0.45, 0.1, 0, 6.2, 10.72);
      B.add(G.cyl8, 0x5a6268, 0.18, 9, 0.18, 0, 9.5, 6.4);
      B.add(G.box, 0x5a6268, 3.4, 0.12, 0.12, 0, 12.5, 6.4);
      B.add(G.box, 0x5a6268, 0.8, 0.6, 0.8, 0, 14.2, 6.4);
      for (const z of [1.0, -4.0]) { B.add(G.cyl12, hullCol, 1.0, 3.8, 1.25, 0, 4.8, z, -0.08, 0, 0); B.add(G.cyl12, 0x1c1c1c, 1.02, 0.5, 1.27, 0, 6.8, z - 0.16, -0.08, 0, 0); }
      B.add(G.box, hullCol, 2.8, 1.0, 3.0, 0, 3.3, -8.5);
      for (let i = 0; i < 5; i++) B.add(G.cyl8, 0x4a525a, 0.16, 3.6, 0.16, -0.7 + i * 0.35, 4.1, -8.5, Math.PI / 2, 0, 0);
      for (const z of [-12.5, 3.5]) for (const sx of [-1, 1]) { B.add(G.cyl8, 0x5a6268, 0.5, 0.5, 0.5, sx * 2.1, 3.1, z); B.add(G.cyl8, 0x2a2a2a, 0.05, 1.4, 0.05, sx * 2.1, 3.6, z + 0.6, Math.PI / 2 - 0.5, 0, 0); }
      for (const sx of [-1, 1]) B.add(G.box, 0x3a3e40, 0.6, 0.6, 2.4, sx * 1.4, 3.2, -22);
      B.add(G.box, 0xf2f0e8, 0.06, 1.0, 2.2, 2.85, 1.9, 17.5); B.add(G.box, 0xf2f0e8, 0.06, 1.0, 2.2, -2.85, 1.9, 17.5);
    }), g, 0, 0, 0, true);
    const t0 = ddTurret(g, 0, 2.85, 15.5), t1 = ddTurret(g, 0, 5.2, 11.5), t2 = ddTurret(g, 0, 3.9, -14.5), t3 = ddTurret(g, 0, 2.85, -19);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0.75, 4.6); t0.add(muzzle);
    g.userData = { turret: t0, turrets: [t1, t2, t3], muzzle, wheels: [], L: 48 };
  } else {
    VM(merged('sbootHull', B => {
      const hc = 0x7a8480, dk = new THREE.Color(0x58625c);
      B.cf = (x, y, z, base) => (base.getHex() === hc && Math.sin(z * 0.6 + y * 2) > 0.4 ? dk : base);
      const plan = [[0, 10.5], [1.6, 6], [2.3, 0], [2.2, -8.5], [-2.2, -8.5], [-2.3, 0], [-1.6, 6]];
      B.add(planProfile(plan, 2.4, 2), hc, 1, 1, 1, 0, -1.1, 0);
      B.add(G.box, hc, 2.2, 1.4, 3.2, 0, 1.9, 1.0);
      B.add(G.box, 0x222830, 2.25, 0.35, 0.1, 0, 2.2, 2.62);
      for (const sx of [-1, 1]) B.add(G.cyl8, hc, 0.4, 5.5, 0.4, sx * 1.1, 1.3, 5.5, Math.PI / 2, 0, 0);
      B.add(G.box, 0x4a524e, 1.0, 0.4, 1.0, 0, 1.5, -6.5);
      B.add(G.cyl8, 0x2a2a2a, 0.06, 1.6, 0.06, 0, 1.8, -5.6, Math.PI / 2, 0, 0);
      B.add(G.cyl8, 0x5a6268, 0.08, 3, 0.08, 0, 4.0, 0.2);
    }), g, 0, 0, 0, true);
    const t = new THREE.Group(); t.position.set(0, 1.35, 4.2); g.add(t);
    VM(merged('sbootGun', B => { B.add(G.box, 0x4a524e, 0.7, 0.5, 0.8, 0, 0.25, 0); B.add(G.cyl8, 0x2a2a2a, 0.06, 1.8, 0.06, 0, 0.35, 1.2, Math.PI / 2, 0, 0); }), t, 0, 0, 0, true);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0.1, 6.5); t.add(muzzle);
    g.userData = { turret: t, muzzle, wheels: [], L: 19 };
  }
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
const OD = 0x535833, ODd = 0x464b2b, CANVAS = 0x666548, WOOD = 0x6e5434, DIRT = 0x5d5444, GRAVEL = 0x7b7362, RUBBER = 0x222220;
const _mpar = new THREE.Matrix4(), _qpar = new THREE.Quaternion(), _one = new THREE.Vector3(1, 1, 1);
function at(x, y, z, ry) { return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), _qpar.setFromAxisAngle(UP, ry || 0).clone(), _one); }
function local(B, par) { return (geo, c, sx, sy, sz, x, y, z, rx, ry, rz) => B.add(geo, c, sx, sy, sz, x, y, z, rx || 0, ry || 0, rz || 0, par); }
const ARCH_Z = [0, Math.PI / 2, Math.PI / 2];   // meio-cilindro com arco para cima, eixo em z
const ARCH_X = [0, 0, Math.PI / 2];             // meio-cilindro com arco para cima, eixo em x

function bPad(B, w, d, col) {
  B.add(G.box, DIRT, w + 1, 4, d + 1, 0, -2.0, 0);
  B.add(G.box, col || GRAVEL, w, 0.1, d, 0, 0.05, 0);
}
function bBags(B, x0, z0, x1, z1, rows, par) {
  const A = local(B, par), L = Math.hypot(x1 - x0, z1 - z0), n = Math.max(1, Math.round(L / 0.95)), ry = Math.atan2(x1 - x0, z1 - z0) + Math.PI / 2;
  for (let r = 0; r < rows; r++) for (let i = 0; i < n - (r % 2); i++) {
    const t = (i + 0.5 + (r % 2) * 0.5) / n;
    A(G.box, (i + r) % 3 ? 0x8a7a58 : 0x7c6e50, 0.95, 0.4, 0.55, lerp(x0, x1, t), 0.2 + r * 0.38, lerp(z0, z1, t), 0, ry + ((i * 7 + r) % 5 - 2) * 0.03, 0);
  }
}
function bBagRing(B, r, n, rows, gapFrom, gapTo, par) {
  const A = local(B, par);
  for (let k = 0; k < rows; k++) for (let i = 0; i < n; i++) {
    const a = (i + (k % 2) * 0.5) / n * Math.PI * 2;
    if (gapFrom !== undefined && a > gapFrom && a < gapTo) continue;
    A(G.box, (i + k) % 3 ? 0x8a7a58 : 0x7c6e50, 2 * Math.PI * r / n + 0.12, 0.4, 0.6, Math.sin(a) * r, 0.2 + k * 0.38, Math.cos(a) * r, 0, a, 0);
  }
}
function bCrate(B, x, y, z, w, h, d, ry, col, par) {
  const A = local(B, par); col = col || 0x6e5c3b;
  A(G.box, col, w, h, d, x, y + h / 2, z, 0, ry);
  A(G.box, 0x4a3d27, w + 0.04, 0.08, d + 0.04, x, y + h * 0.2, z, 0, ry);
  A(G.box, 0x4a3d27, w + 0.04, 0.08, d + 0.04, x, y + h * 0.8, z, 0, ry);
}
function bDrum(B, x, z, col, par, y) {
  const A = local(B, par); y = y || 0;
  A(G.cyl12, col || 0x3e4a2c, 0.4, 1.1, 0.4, x, y + 0.55, z);
  A(G.cyl12, 0x2e3522, 0.42, 0.06, 0.42, x, y + 0.35, z); A(G.cyl12, 0x2e3522, 0.42, 0.06, 0.42, x, y + 0.8, z);
}
function bPole(B, x, z, h, col, par) { local(B, par)(G.cyl8, col || WOOD, 0.1, h, 0.1, x, h / 2, z); }
function bWheel(A, x, y, z, r, w) {
  A(G.cyl12, RUBBER, r, w, r, x, y, z, 0, 0, Math.PI / 2);
  A(G.cyl12, ODd, r * 0.55, w + 0.04, r * 0.55, x, y, z, 0, 0, Math.PI / 2);
}
function bTruck(B, x, z, ry, kind) {
  const A = local(B, at(x, 0, z, ry)), body = kind === 'amb' ? 0x5a6036 : OD;
  A(G.box, 0x2f3020, 2.0, 0.3, 6.6, 0, 0.9, 0);
  for (const wz of [2.3, -1.2, -2.4]) for (const sx of [-1, 1]) bWheel(A, sx * 1.02, 0.52, wz, 0.5, 0.36);
  A(G.box, body, 1.5, 0.8, 1.5, 0, 1.5, 2.65);
  A(G.box, 0x23241a, 1.3, 0.65, 0.05, 0, 1.45, 3.42);
  for (const sx of [-1, 1]) { A(G.box, body, 0.6, 0.1, 1.3, sx * 0.98, 1.2, 2.55, -0.15); A(G.cyl8, 0x3a3a30, 0.12, 0.1, 0.12, sx * 0.55, 1.75, 3.42, Math.PI / 2); }
  A(G.box, body, 2.2, 1.1, 1.3, 0, 1.85, 1.3);
  A(G.box, 0x2e3a3c, 1.9, 0.5, 0.05, 0, 2.2, 1.97);
  A(G.box, ODd, 2.25, 0.08, 1.35, 0, 2.44, 1.3);
  if (kind === 'amb') {
    A(G.box, body, 2.3, 1.9, 3.6, 0, 2.0, -1.3);
  } else {
    A(G.box, body, 2.4, 0.7, 3.9, 0, 1.4, -1.35);
    A(G.halfcyl, kind === 'radio' ? ODd : CANVAS, 1.2, 3.9, 1.05, 0, 1.75, -1.35, ...ARCH_Z);
    if (kind === 'radio') { A(G.cyl8, 0x2a2a2a, 0.03, 7, 0.03, 0.9, 5.2, -2.8); A(G.box, 0x3a3b30, 0.6, 0.6, 0.8, -0.8, 2.6, -2.6); }
  }
}
function bJeep(B, x, z, ry) {
  const A = local(B, at(x, 0, z, ry));
  A(G.box, 0x2f3020, 1.4, 0.25, 3.2, 0, 0.62, 0);
  for (const wz of [1.05, -1.05]) for (const sx of [-1, 1]) bWheel(A, sx * 0.72, 0.4, wz, 0.4, 0.28);
  A(G.box, OD, 1.3, 0.42, 1.1, 0, 1.0, 1.05);
  A(G.box, 0x23241a, 1.1, 0.35, 0.05, 0, 0.98, 1.62);
  A(G.box, OD, 1.5, 0.55, 1.9, 0, 1.0, -0.5);
  for (const sx of [-1, 1]) A(G.box, OD, 0.25, 0.08, 1.0, sx * 0.72, 0.85, 1.1);
  A(G.box, 0x2e3a3c, 1.35, 0.5, 0.05, 0, 1.55, 0.48, -0.15);
  for (const sx of [-1, 1]) A(G.box, 0x3d3b2c, 0.5, 0.5, 0.5, sx * 0.35, 1.35, -0.2);
  A(G.cyl12, RUBBER, 0.38, 0.25, 0.38, 0, 1.0, -1.55, Math.PI / 2);
  A(G.cyl8, 0x2a2a2a, 0.02, 2.4, 0.02, -0.65, 2.3, -1.3, -0.2);
  A(G.box, 0x4a4c34, 0.3, 0.45, 0.2, 0.55, 1.35, -1.45);
}
function bPyrTent(B, x, z, s, ry, col) {
  const A = local(B, at(x, 0, z, ry)); col = col || CANVAS;
  A(G.box, col, s, 1.3, s, 0, 0.65, 0);
  A(G.cone4, col, s * 0.74, 2.4, s * 0.74, 0, 2.5, 0, 0, Math.PI / 4, 0);
  A(G.cyl8, WOOD, 0.08, 0.6, 0.08, 0, 3.9, 0);
  A(G.box, 0x2e2f22, s * 0.28, 1.25, 0.06, 0, 0.62, s / 2 + 0.02);
  A(G.box, col, s * 0.18, 1.2, 0.06, s * 0.2, 0.7, s / 2 + 0.25, 0, 0.7, 0);
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) A(G.cyl8, WOOD, 0.04, 1.2, 0.04, sx * (s / 2 + 0.6), 0.45, sz * (s / 2 + 0.6), sz * 0.5, 0, -sx * 0.5);
}
function bNet(B, x, z, w, d, h) {
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) B.add(G.cyl8, WOOD, 0.09, h, 0.09, x + sx * w / 2, h / 2, z + sz * d / 2);
  B.add(G.box, 0x4b5833, w + 0.6, 0.05, d + 0.6, x, h, z);
  for (let i = 0; i < 9; i++) {
    const px = x + ((i * 37) % 9 / 8 - 0.5) * w, pz = z + ((i * 53) % 7 / 6 - 0.5) * d;
    B.add(G.box, i % 2 ? 0x5e6a3b : 0x3c4729, w * 0.28, 0.07, d * 0.3, px, h + 0.02, pz, 0, i * 0.7, 0);
  }
}
function bScaffold(B, w, d, h) {
  for (let x = -w / 2; x <= w / 2 + 0.01; x += w / 3) for (const z of [-d / 2 - 0.6, d / 2 + 0.6]) B.add(G.cyl8, 0x8a6a42, 0.08, h, 0.08, x, h / 2, z);
  for (let z = -d / 2; z <= d / 2 + 0.01; z += d / 2) for (const x of [-w / 2 - 0.6, w / 2 + 0.6]) B.add(G.cyl8, 0x8a6a42, 0.08, h, 0.08, x, h / 2, z);
  for (const y of [h * 0.35, h * 0.7]) {
    for (const z of [-d / 2 - 0.6, d / 2 + 0.6]) B.add(G.box, 0x9a7a4f, w + 1.4, 0.12, 0.5, 0, y, z);
    for (const x of [-w / 2 - 0.6, w / 2 + 0.6]) B.add(G.box, 0x9a7a4f, 0.5, 0.12, d + 1.4, x, y, 0);
  }
}
function decal(g, tex, s, x, y, z, rx, ry) {
  const m = P(G.plane, decalMat(tex), s, s, 1, x, y, z, g, false); m.rotation.order = 'YXZ'; m.rotation.set(rx || 0, ry || 0, 0); return m;
}
// decalque preso a um sub-conjunto posicionado em (px, pz) e girado em pyaw
function decalAt(g, tex, s, px, pz, pyaw, lx, ly, lz, ry, rx) {
  const c = Math.cos(pyaw), sn = Math.sin(pyaw);
  return decal(g, tex, s, px + lx * c + lz * sn, ly, pz - lx * sn + lz * c, rx || 0, pyaw + (ry || 0));
}
function flagPole(g, x, z, h, tex) {
  P(G.cyl8, 0x8a8a84, 0.08, h, 0.08, x, h / 2, z, g);
  const f = P(G.plane, decalMat(tex), 2.4, 1.6, 1, x + 1.25, h - 0.9, z, g, false);
  return f;
}
function staticGunner(g, team, x, z, ry) {
  const s = makeSoldier(team, 'rifle'); s.position.set(x, -0.45, z); s.rotation.y = ry || 0;
  const u = s.userData;
  u.legL.rotation.x = -1.4; u.shinL.rotation.x = 1.4; u.legR.rotation.x = 0.15; u.shinR.rotation.x = 1.6;
  u.armL.rotation.x = -1.3; u.armR.rotation.x = -1.2; u.foreL.rotation.x = -0.3; u.foreR.rotation.x = -0.6;
  if (u.rifle) u.rifle.visible = false;
  g.add(s); return s;
}

const BUILD_GEO = {
  hq(B) {
    bPad(B, 16, 14);
    // casa de fazenda normanda requisitada
    B.add(G.box, 0xbfb398, 9, 4.6, 6.4, -2, 2.3, -2.8);
    B.add(G.roof, 0x4a4e57, 9.8, 2.7, 7.4, -2, 4.6, -2.8);
    B.add(G.box, 0x8a7d6a, 0.9, 2.4, 0.9, -5.2, 6.4, -3.6);
    for (const [cx, cy] of [[-6.6, 0.2], [-6.6, 4.4], [2.6, 0.2], [2.6, 4.4]]) B.add(G.box, 0xd6cbb2, 0.4, 0.5, 0.4, cx, cy + 0.25, 0.42);
    for (const x of [-5, 1]) { B.add(G.box, 0x2f3438, 1.0, 1.3, 0.12, x, 2.9, 0.42); B.add(G.box, 0x4f5f3a, 0.45, 1.3, 0.08, x - 0.75, 2.9, 0.44); B.add(G.box, 0x4f5f3a, 0.45, 1.3, 0.08, x + 0.75, 2.9, 0.44); }
    B.add(G.box, 0x4a3524, 1.2, 2.3, 0.12, -2, 1.15, 0.43);
    bBags(B, -6.4, 1.2, -3.2, 1.2, 3); bBags(B, -0.8, 1.2, 2.4, 1.2, 3);
    // tenda de comando anexa
    B.add(G.box, CANVAS, 5, 1.7, 6, 5.2, 0.85, -2.8);
    B.add(G.roof, ODd, 6.6, 1.9, 5.8, 5.2, 1.7, -2.8, 0, Math.PI / 2, 0);
    // mastro de rádio estaiado
    B.add(G.cyl8, 0x3a3a34, 0.12, 15, 0.12, 3.2, 7.5, -6.2);
    for (const y of [10, 13]) B.add(G.box, 0x3a3a34, 2.4, 0.07, 0.07, 3.2, y, -6.2);
    for (const a of [0.6, 2.7, 4.8]) B.add(G.cyl8, 0x2a2a2a, 0.015, 11.5, 0.015, 3.2 + Math.cos(a) * 3.3, 5.5, -6.2 + Math.sin(a) * 3.3, Math.sin(a) * 0.3, 0, -Math.cos(a) * 0.3);
    // mesa de mapas sob toldo
    for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) bPole(B, -2 + sx * 2, 3 + sz * 1.2, 2.5);
    B.add(G.box, CANVAS, 4.4, 0.08, 2.8, -2, 2.5, 3);
    B.add(G.box, WOOD, 2.2, 0.08, 1.2, -2, 0.9, 3); B.add(G.box, 0xd9cfa8, 1.8, 0.02, 1.0, -2, 0.95, 3);
    for (const sx of [-1, 1]) B.add(G.box, WOOD, 0.1, 0.9, 1.0, -2 + sx * 1, 0.45, 3);
    bBags(B, -7.6, 6.4, -2.2, 6.4, 2); bBags(B, 1.2, 6.4, 3.8, 6.4, 2);
    bTruck(B, 5.8, 3.4, -0.25, 'radio');
    bJeep(B, -6.4, 3.6, 0.35);
    bCrate(B, 0.4, 0, 2.6, 1.0, 0.7, 0.8, 0.3); bCrate(B, 0.6, 0.7, 2.6, 0.8, 0.5, 0.7, 0.1);
    bDrum(B, 7.2, -6); bDrum(B, 6.3, -6.4);
  },
  depot(B) {
    bPad(B, 12, 10);
    bNet(B, -1.2, -1.2, 8, 6.4, 3.3);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
      const x = -3.8 + i * 2.6, z = -2.6 + j * 2.6, hgt = 2 + ((i + j) % 2);
      for (let k = 0; k < hgt; k++) bCrate(B, x, k * 0.9, z, 1.6, 0.9, 1.1, (k % 2) * 0.1, k % 2 ? 0x7a6845 : 0x6b5a3a);
    }
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) bDrum(B, 3.6 + i * 0.85, -3.6 + j * 0.85);
    bDrum(B, 4.0, -3.2, 0x3e4a2c, null, 1.1); bDrum(B, 4.85, -3.2, 0x3e4a2c, null, 1.1);
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - r; i++) B.add(G.box, 0x4f5631, 0.18, 0.46, 0.34, 3.6 + i * 0.24 + r * 0.12, 0.23 + r * 0.46, -1.2);
    B.add(G.box, WOOD, 2.4, 0.15, 1.8, -3.8, 0.08, 3.4); B.add(G.roof, 0x5d5f3c, 2.4, 1.2, 1.9, -3.8, 0.16, 3.4);
    bTruck(B, 2.8, 2.2, Math.PI * 0.55);
    bBags(B, -5.8, 4.8, -1.8, 4.8, 2);
    bPole(B, 5.6, 4.6, 2.4); B.add(G.box, 0xd9d2b8, 1.4, 0.7, 0.06, 5.6, 2.1, 4.65);
  },
  barracks(B) {
    bPad(B, 15, 10);
    bPyrTent(B, -3.9, -1.2, 5.6, 0);
    bPyrTent(B, 3.9, -1.2, 5.6, 0);
    for (let i = 0; i < 6; i++) B.add(G.box, 0x7a6040, 1.2, 0.06, 0.28, 0, 0.12, 2.6 + i * 0.4);
    bBags(B, -7.2, 4.8, -1.4, 4.8, 2); bBags(B, 1.4, 4.8, 7.2, 4.8, 2);
    // armário de fuzis
    B.add(G.box, WOOD, 2.2, 0.1, 0.5, -6.3, 0.9, 2.6); B.add(G.box, WOOD, 2.2, 0.1, 0.5, -6.3, 0.2, 2.6);
    for (let i = 0; i < 6; i++) B.add(G.box, 0x4b3322, 0.07, 1.3, 0.1, -7.2 + i * 0.36, 0.95, 2.62, 0.12, 0, 0);
    // reboque-tanque de água
    B.add(G.cyl12, OD, 0.65, 2.2, 0.65, 6.0, 1.15, 2.6, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) B.add(G.cyl12, RUBBER, 0.4, 0.25, 0.4, 6.0 + sx * 0.9, 0.4, 2.6, 0, 0, Math.PI / 2);
    B.add(G.box, 0x2f3020, 0.12, 0.12, 1.4, 6.0, 0.6, 3.6);
    bCrate(B, -6.6, 0, -4.4, 1.2, 0.8, 0.9, 0.4); bDrum(B, 7.0, -4.4);
  },
  factory(B) {
    bPad(B, 20, 16, 0x8a877e);
    // hangar Quonset de chapa ondulada
    B.add(G.halfcyl, 0x6c705a, 8.8, 13, 6.6, 0, 0, -1.5, ...ARCH_Z);
    for (let z = -7.5; z <= 4.6; z += 1.5) B.add(G.halfcyl, 0x575b47, 8.9, 0.22, 6.7, 0, 0, z, ...ARCH_Z);
    B.add(G.halfcyl, 0x5f6350, 8.8, 0.25, 6.6, 0, 0, -8.0, ...ARCH_Z);
    B.add(G.halfcyl, 0x5f6350, 8.8, 0.25, 6.6, 0, 0, 5.0, ...ARCH_Z);
    B.add(G.box, 0x1f201a, 7.6, 5.2, 0.12, 0, 2.6, 5.14);
    B.add(G.cyl12, 0x4c4f3e, 0.45, 8.2, 0.45, 0, 5.45, 5.2, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) B.add(G.box, 0x3a3d2c, 0.3, 5.4, 0.3, sx * 3.95, 2.7, 5.25);
    for (const sx of [-1, 1]) B.add(G.box, 0x2e3a3c, 1.6, 0.9, 0.1, sx * 6.2, 2.4, 4.4, 0, 0, 0);
    // pórtico com guincho e motor pendurado
    for (const sx of [-1, 1]) { B.add(G.box, 0x3a3d28, 0.3, 7.5, 0.3, sx * 4.2, 3.75, 7.2, 0, 0, sx * 0.08); }
    B.add(G.box, 0x3a3d28, 9, 0.5, 0.5, 0, 7.5, 7.2);
    B.add(G.box, 0x2d2e22, 0.8, 0.6, 0.7, 1.4, 6.95, 7.2);
    B.add(G.cyl8, 0x222222, 0.03, 3.0, 0.03, 1.4, 5.2, 7.2);
    B.add(G.box, 0x45473a, 1.3, 1.0, 1.7, 1.4, 3.3, 7.2);
    // torre de Sherman em cavaletes, pneus, tambores, tanque de combustível
    B.add(G.box, WOOD, 2.6, 0.6, 0.4, -6.4, 0.3, 6.4); B.add(G.box, WOOD, 2.6, 0.6, 0.4, -6.4, 0.3, 7.6);
    B.add(G.cyl12, 0x55592e, 1.1, 0.5, 1.2, -6.4, 0.85, 7.0); B.add(G.dome, 0x55592e, 1.1, 0.65, 1.2, -6.4, 1.1, 7.0);
    B.add(G.cyl12, 0x45472f, 0.09, 2.4, 0.09, -6.4, 1.3, 8.2, Math.PI / 2, 0, 0);
    for (let i = 0; i < 4; i++) B.add(G.cyl12, RUBBER, 0.55, 0.3, 0.55, 7.2, 0.15 + i * 0.3, 7.2);
    bDrum(B, 8.4, 5.6, 0x5a3b2a); bDrum(B, 8.4, 6.5, 0x3e4a2c);
    B.add(G.cyl12, 0x7a7d70, 1.1, 5, 1.1, -8.6, 1.9, -3, Math.PI / 2, 0, 0);
    for (const z of [-4.6, -1.4]) B.add(G.box, 0x3a3d2c, 1.4, 0.8, 0.3, -8.6, 0.4, z);
    bCrate(B, 8.2, 0, -5.5, 1.4, 1.0, 1.1, 0.2); bCrate(B, 8.0, 1.0, -5.5, 1.0, 0.7, 0.9, -0.1);
  },
  mgnest(B) {
    B.add(G.box, DIRT, 8, 4, 8, 0, -2.0, 0);
    B.add(G.cyl8, 0x6b5c43, 3.8, 0.35, 3.8, 0, 0.17, 0);
    bBagRing(B, 2.9, 14, 3, Math.PI * 0.8, Math.PI * 1.2);
    for (let i = 0; i < 3; i++) B.add(G.box, 0x4a4f2e, 0.32, 0.3, 0.18, -1.6 + i * 0.36, 0.5, -1.2);
    B.add(G.box, 0x4a4f2e, 0.32, 0.3, 0.18, 1.5, 0.5, -1.4, 0, 0.6, 0);
  },
  atgun(B) {
    B.add(G.box, DIRT, 8, 4, 8, 0, -2.0, 0);
    B.add(G.cyl8, 0x6b5c43, 3.9, 0.3, 3.9, 0, 0.15, 0);
    bBagRing(B, 3.4, 16, 3, Math.PI * 0.7, Math.PI * 1.3);
    bCrate(B, -2.0, 0.3, -2.2, 1.0, 0.45, 0.6, 0.4, 0x5d5a3a); bCrate(B, -2.0, 0.75, -2.2, 1.0, 0.45, 0.6, 0.5, 0x5d5a3a);
    for (let i = 0; i < 5; i++) B.add(G.cyl8, 0xb08a3a, 0.06, 0.6, 0.06, 2.0 + i * 0.14, 0.6, -2.0, 0, 0, 0.1);
  },
  hospital(B) {
    bPad(B, 14, 12);
    B.add(G.box, CANVAS, 11, 1.9, 7, 0, 0.95, -1.2);
    B.add(G.roof, ODd, 11.8, 2.4, 7.9, 0, 1.9, -1.2);
    B.add(G.box, CANVAS, 2.4, 2.2, 2.0, 0, 1.1, 3.1);
    B.add(G.roof, ODd, 2.4, 1.0, 2.6, 0, 2.2, 3.1, 0, Math.PI / 2, 0);
    B.add(G.box, 0x2e2f22, 1.2, 1.8, 0.06, 0, 0.9, 4.12);
    for (let i = 0; i < 3; i++) {
      const x = -4.4 + i * 1.5;
      B.add(G.box, WOOD, 0.7, 0.08, 2.1, x, 0.45, 4.3); B.add(G.box, 0x6d6a4c, 0.6, 0.18, 1.6, x, 0.56, 4.3);
      B.add(G.sph, 0xd2a17a, 0.15, 0.13, 0.15, x, 0.6, 5.2);
      for (const sx of [-1, 1]) B.add(G.box, WOOD, 0.06, 0.4, 0.06, x + sx * 0.3, 0.2, 4.3);
    }
    for (let i = 0; i < 4; i++) B.add(G.cyl8, 0x2f5a3a, 0.15, 1.2, 0.15, 4.8 + i * 0.35, 0.6, 1.0);
    bTruck(B, 4.6, 4.2, -0.3, 'amb');
    bCrate(B, -5.6, 0, 2.2, 0.9, 0.6, 0.7, 0.2, 0xcfc9b3);
  },
  aa(B) {
    B.add(G.box, DIRT, 8, 4, 8, 0, -2.0, 0);
    B.add(G.cyl8, 0x6b5c43, 3.9, 0.3, 3.9, 0, 0.15, 0);
    bBagRing(B, 3.4, 16, 3, Math.PI * 0.75, Math.PI * 1.25);
    for (const r of [0, Math.PI / 2]) B.add(G.box, OD, 4.2, 0.25, 0.35, 0, 0.45, 0, 0, r + Math.PI / 4, 0);
    for (let i = 0; i < 4; i++) bCrate(B, -2.2 + (i % 2) * 0.7, 0.3 + Math.floor(i / 2) * 0.45, -2.3, 0.6, 0.45, 0.9, 0.3, 0x5d5a3a);
  },
  flak_de(B) {
    B.add(G.box, DIRT, 7, 4, 7, 0, -2.0, 0);
    B.add(G.cyl8, 0x6b5c43, 3.3, 0.3, 3.3, 0, 0.15, 0);
    bBagRing(B, 2.9, 14, 2, Math.PI * 0.8, Math.PI * 1.2);
    for (const a of [0, 2.1, 4.2]) B.add(G.box, 0x4f5348, 0.25, 0.2, 2.0, Math.sin(a) * 0.9, 0.4, Math.cos(a) * 0.9, 0, a, 0);
    for (let i = 0; i < 3; i++) B.add(G.box, 0x4f5348, 0.35, 0.3, 0.2, 1.6, 0.45 + i * 0.3, -1.4);
  },
  bunker_jp(B) {
    B.add(G.box, 0x6f6658, 11, 4, 10, 0, -2.0, 0);
    B.add(G.ico, 0xc9bf9e, 6.2, 2.6, 5.6, 0, 0.6, -0.4);
    for (let r = 0; r < 4; r++) B.add(G.cyl8, r % 2 ? 0x6a5236 : 0x5a432b, 0.32, 9, 0.32, 0, 0.35 + r * 0.6, 3.6, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) for (let r = 0; r < 4; r++) B.add(G.cyl8, 0x5a432b, 0.3, 7, 0.3, sx * 4.4, 0.35 + r * 0.6, 0, Math.PI / 2, 0, 0);
    B.add(G.box, 0x111111, 3.4, 0.5, 0.3, 0, 2.3, 3.72);
    B.add(G.box, 0x6a5236, 9.6, 0.4, 8, 0, 2.7, 0);
    B.add(G.roof, 0xc9bf9e, 9.6, 1.4, 8.4, 0, 2.85, 0);
    for (let i = 0; i < 5; i++) B.add(G.ico, 0x3f6a2c, 1.2, 0.8, 1.2, -3 + i * 1.5, 3.9, -1 + (i % 2));
  },
  nest_de_jp(B) {
    B.add(G.box, DIRT, 8, 4, 8, 0, -2.0, 0);
    B.add(G.cyl8, 0x8a7d5a, 3.8, 0.35, 3.8, 0, 0.17, 0);
    for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; if (a > Math.PI * 0.8 && a < Math.PI * 1.2) continue; for (let r = 0; r < 2; r++) B.add(G.cyl8, 0x5a432b, 0.28, 2.1, 0.28, Math.sin(a) * 2.9, 0.35 + r * 0.55, Math.cos(a) * 2.9, 0, a, Math.PI / 2); }
  },
  dehq_jp(B) {
    B.add(G.box, 0x6f6658, 27, 4, 21, 0, -2.0, 0);
    B.add(G.box, 0x8a7d62, 26, 0.1, 20, 0, 0.05, 0);
    B.add(G.box, 0xb8aa8a, 22, 1.0, 13, 0, 0.5, 0);
    B.add(G.box, 0x6b5a44, 20, 6, 11, 0, 4, 0);
    for (let i = 0; i < 8; i++) B.add(G.box, 0x3a2e22, 0.3, 6, 0.3, -9.5 + i * 2.7, 4, 5.55);
    for (let i = 0; i < 6; i++) B.add(G.box, 0xe6dcc0, 1.8, 2.2, 0.1, -7.5 + i * 3, 4.3, 5.56);
    B.add(G.box, 0x3d4249, 24, 0.4, 15, 0, 7.1, 0);
    B.add(G.roof, 0x3d4249, 22, 3.2, 13.5, 0, 7.3, 0);
    B.add(G.box, 0x6b5a44, 10, 3, 7, 0, 11.6, 0);
    B.add(G.box, 0x3d4249, 13, 0.35, 10, 0, 13.2, 0);
    B.add(G.roof, 0x3d4249, 11, 2.4, 8.4, 0, 13.4, 0);
    for (const sx of [-1, 1]) B.add(G.cyl12, 0xc0392b, 0.35, 6.5, 0.35, sx * 3, 3.25, 11);
    B.add(G.box, 0x1c1c1c, 8, 0.5, 0.6, 0, 6.7, 11); B.add(G.box, 0xc0392b, 7, 0.35, 0.45, 0, 5.6, 11);
    for (const x of [-9, 9]) bBagRing(B, 2.4, 10, 2, undefined, undefined, at(x, 0, 13, 0));
  },
  naval(B) {
    bPad(B, 16, 12, 0xb8ac90);
    B.add(G.halfcyl, 0x6c705a, 4.2, 10, 3.8, -3, 0, -2.5, ...ARCH_X);
    B.add(G.box, 0x2e2f22, 1.6, 2.4, 0.1, -3, 1.2, 1.32);
    for (const x of [3.5, 6.0]) { B.add(G.cyl12, 0x8a8d84, 1.1, 3.2, 1.1, x, 1.6, -3.5); B.add(G.cyl12, 0x6a6d64, 1.12, 0.1, 1.12, x, 3.2, -3.5); }
    for (let z = 4; z <= 42; z += 4) for (const sx of [-1, 1]) B.add(G.cyl8, 0x4a3b2a, 0.28, 6, 0.28, sx * 2.6, -1.5, z);
    B.add(G.box, 0x7a6448, 6.4, 0.3, 40, 0, 1.6, 23);
    for (let z = 5; z <= 41; z += 2) B.add(G.box, 0x5e4c36, 6.4, 0.04, 0.12, 0, 1.76, z);
    for (const sx of [-1, 1]) for (let z = 8; z <= 40; z += 8) B.add(G.cyl8, 0x3a3a34, 0.18, 0.6, 0.18, sx * 3.0, 2.0, z);
    B.add(G.box, 0x3a3d28, 0.5, 9, 0.5, 2.6, 6.3, 34); B.add(G.box, 0x3a3d28, 7, 0.4, 0.4, -0.6, 10.6, 34, 0, 0, 0.05);
    B.add(G.cyl8, 0x222222, 0.03, 4, 0.03, -3.6, 8.6, 34); B.add(G.box, 0x6b5a3a, 1.2, 0.9, 1.0, -3.6, 6.2, 34);
    for (let i = 0; i < 4; i++) bCrate(B, 1.0 + (i % 2) * 1.2, 1.75, 14 + Math.floor(i / 2) * 1.1, 1.0, 0.8, 0.9, 0.2);
    bDrum(B, -1.8, 20, 0x3e4a2c, null, 1.75); bDrum(B, -1.8, 21, 0x5a3b2a, null, 1.75);
  },
  coastgun(B) {
    B.add(G.box, DIRT, 9, 4, 9, 0, -2.0, 0);
    B.add(G.cyl12, 0xa6a296, 4.2, 0.5, 4.2, 0, 0.25, 0);
    B.add(G.torus, 0x6a6a64, 3.4, 3.4, 3.4, 0, 0.55, 0, Math.PI / 2, 0, 0);
    bBagRing(B, 4.4, 18, 2, Math.PI * 0.75, Math.PI * 1.25);
    for (let i = 0; i < 6; i++) B.add(G.cyl8, 0xb08a3a, 0.16, 0.8, 0.16, -3.2 + i * 0.36, 0.9, -3.0);
  },
  bunker(B) {
    B.add(G.box, 0x6f6c66, 11, 4, 10, 0, -2.0, 0);
    B.add(sideProfile([[4.2, 0], [4.2, 3.4], [3.6, 4.0], [-3.6, 4.0], [-4.2, 3.4], [-4.2, 0]], 9.4, 3), 0x8e8b82, 1, 1, 1, 0, 0, 0);
    B.add(G.box, 0x99968c, 10.2, 0.6, 1.2, 0, 3.7, 4.5);
    B.add(G.box, 0x6d6a63, 5.2, 1.4, 0.8, 0, 2.6, 4.25);
    B.add(G.box, 0x111111, 4.4, 0.55, 0.3, 0, 2.6, 4.68);
    for (const sx of [-1, 1]) B.add(G.roof, 0x5c5b3e, 3.6, 3.3, 9.6, sx * 6.2, 0, -0.2, 0, Math.PI / 2, 0);
    B.add(G.roof, 0x5f6040, 9.8, 1.0, 8.4, 0, 4.0, -0.4);
    for (let i = 0; i < 6; i++) B.add(G.ico, i % 2 ? 0x4a5a33 : 0x3d4a2a, 1.2, 0.7, 1.2, -3.5 + i * 1.4, 4.5, -1.5 + (i % 3) * 0.6);
    B.add(G.cyl12, 0x8e8b82, 0.9, 0.7, 0.9, 2.2, 4.35, -2.4);
    B.add(G.cyl12, 0x111111, 0.6, 0.72, 0.6, 2.2, 4.36, -2.4);
    B.add(G.box, 0x5a4b36, 1.6, 0.9, 3.0, -2.6, 0.45, -5.6);
  },
  nest_de(B) {
    B.add(G.box, DIRT, 8, 4, 8, 0, -2.0, 0);
    B.add(G.cyl8, 0x6b5c43, 3.8, 0.35, 3.8, 0, 0.17, 0);
    bBagRing(B, 2.9, 14, 3, Math.PI * 0.8, Math.PI * 1.2);
    for (let i = 0; i < 3; i++) B.add(G.box, 0x4f5348, 0.3, 0.26, 0.16, -1.6 + i * 0.34, 0.48, -1.2);
    for (const a of [0.3, 2.0, 4.3]) B.add(G.cyl8, WOOD, 0.06, 2.0, 0.06, Math.cos(a) * 3.3, 1.0, Math.sin(a) * 3.3);
  },
  dehq(B) {
    B.add(G.box, 0x6f6658, 27, 4, 21, 0, -2.0, 0);
    B.add(G.box, 0x7b7362, 26, 0.1, 20, 0, 0.05, 0);
    B.add(G.box, 0xb8ad98, 22, 10, 13, 0, 5, 0);
    B.add(G.box, 0xa49a85, 22.4, 0.5, 13.4, 0, 0.25, 0);
    B.add(G.box, 0xcfc4ad, 22.3, 0.4, 13.3, 0, 5.1, 0);
    for (const sx of [-1, 1]) for (const sz of [-1, 1]) for (let k = 0; k < 5; k++) B.add(G.box, 0xd6cbb2, 0.5, 0.9, 0.5, sx * 11, 0.6 + k * 2, sz * 6.5);
    B.add(G.roof, 0x41454d, 22.6, 6, 14, 0, 10, 0);
    for (const x of [-7, 0, 7]) { B.add(G.box, 0xb8ad98, 1.6, 1.8, 1.4, x, 11.6, 5.4); B.add(G.roof, 0x41454d, 1.4, 0.9, 2.0, x, 12.5, 5.4, 0, Math.PI / 2, 0); B.add(G.box, 0x2d3236, 0.9, 1.0, 0.1, x, 11.7, 6.12); }
    for (const x of [-8, 6]) B.add(G.box, 0x8a7d6a, 1.0, 3.5, 1.0, x, 15, -2);
    for (const sx of [-1, 1]) {
      B.add(G.cyl12, 0xb0a590, 2.8, 15, 2.8, sx * 12, 7.5, 4.6);
      B.add(G.cyl12, 0xcfc4ad, 2.95, 0.4, 2.95, sx * 12, 13.2, 4.6);
      B.add(G.cone, 0x41454d, 3.3, 5.5, 3.3, sx * 12, 17.75, 4.6);
      for (const y of [4, 9]) B.add(G.box, 0x2d3236, 0.8, 1.4, 0.2, sx * 12, y, 7.35);
    }
    for (let i = 0; i < 6; i++) for (const y of [2.8, 7]) {
      const x = -7.5 + i * 3;
      B.add(G.box, 0x2d3236, 1.2, 1.9, 0.12, x, y, 6.53);
      B.add(G.box, 0xd6cbb2, 1.5, 0.22, 0.2, x, y + 1.05, 6.55);
    }
    B.add(G.box, 0x3d2c1e, 2.4, 3.4, 0.14, 0, 1.7, 6.56);
    for (let k = 0; k < 3; k++) B.add(G.box, 0xa49a85, 5 - k, 0.3, 1.2, 0, 0.15 + k * 0.3, 7.4 - k * 0.3);
    for (const x of [-8, 8]) bBagRing(B, 2.4, 10, 2, undefined, undefined, at(x, 0, 11.5, 0));
    // canhão antiaéreo de 20 mm e Kübelwagen
    const F = local(B, at(-8, 0, 11.5, 0.4));
    F(G.cyl8, 0x4f5348, 0.6, 0.5, 0.6, 0, 0.5, 0); F(G.box, 0x4f5348, 0.8, 0.5, 0.9, 0, 1.0, 0);
    F(G.cyl8, 0x2a2a2a, 0.06, 2.2, 0.06, 0, 1.6, 0.9, -1.0, 0, 0); F(G.box, 0x5a5e52, 1.2, 0.6, 0.06, 0, 1.2, 0.5);
    const K = local(B, at(-15, 0, 9, 0.5));
    K(G.box, 0x8c7b4c, 1.6, 0.8, 3.6, 0, 0.9, 0); K(G.box, 0x7a6b42, 1.5, 0.5, 1.2, 0, 1.45, -0.6);
    for (const wz of [1.2, -1.2]) for (const sx of [-1, 1]) bWheel(K, sx * 0.8, 0.42, wz, 0.42, 0.3);
    B.add(G.cyl8, 0x3a3a34, 0.12, 12, 0.12, 9, 16, -3);
  },
};
const BUILD_SIZE = { naval: [16, 12, 6], coastgun: [8, 8, 2.5], hq: [16, 14, 7], depot: [12, 10, 4], barracks: [15, 10, 5], factory: [20, 16, 8], mgnest: [7, 7, 2.5], atgun: [7, 7, 2.5], aa: [7, 7, 2.5], hospital: [14, 12, 4.5] };

function makeBuilding(kind) {
  const g = new THREE.Group(); const ud = {};
  const gk = SC.biome === 'tropical' && BUILD_GEO[kind + '_jp'] ? kind + '_jp' : kind;
  VM(merged('bld' + gk, B => { B.cf = paintFn(-1, kind === 'bunker' && gk === kind ? [0x6f7258, 0x7d6a52] : null, 0); BUILD_GEO[gk](B); }), g, 0, 0, 0, true);
  const SLOPE = Math.PI / 2 - Math.atan2(2.4, 3.95);
  switch (kind) {
    case 'hq':
      ud.flag = flagPole(g, -7.4, -6.2, 9, TEX.usflag);
      for (const sx of [-1, 1]) decalAt(g, TEX.star, 0.9, 5.8, 3.4, -0.25, sx * 1.12, 1.85, 1.3, sx * Math.PI / 2);
      decal(g, TEX.star, 2.2, 5.2 + 2.0, 2.0, -2.8, -(Math.PI / 2 - Math.atan2(1.9, 2.9)), Math.PI / 2);
      break;
    case 'barracks': ud.flag = flagPole(g, 0, -4.4, 8, TEX.usflag); break;
    case 'depot': for (const sx of [-1, 1]) decalAt(g, TEX.star, 0.9, 2.8, 2.2, Math.PI * 0.55, sx * 1.12, 1.85, 1.3, sx * Math.PI / 2); break;
    case 'factory': decal(g, TEX.star, 1.2, 0, 5.9, 5.15, 0, 0); break;
    case 'hospital': {
      decal(g, TEX.redcross, 2.6, 0, 3.2, -1.2 + 2.0, -SLOPE, 0);
      decal(g, TEX.redcross, 2.6, 0, 3.2, -1.2 - 2.0, -SLOPE, Math.PI);
      decal(g, TEX.redcross, 0.9, 0, 2.4, 4.13, 0, 0);
      for (const sx of [-1, 1]) decalAt(g, TEX.redcross, 1.4, 4.6, 4.2, -0.3, sx * 1.17, 2.1, -1.3, sx * Math.PI / 2);
      flagPole(g, -6.2, -5, 6, TEX.redcross);
      break;
    }
    case 'mgnest': case 'nest_de': {
      const us = kind === 'mgnest';
      const t = new THREE.Group(); t.position.set(0, 1.25, 0); g.add(t);
      VM(merged('mg' + kind, B => {
        for (const a of [0, 2.1, 4.2]) B.add(G.cyl8, 0x2b2b26, 0.03, 1.2, 0.03, Math.sin(a) * 0.35, -0.6, Math.cos(a) * 0.35 - 0.1, Math.cos(a) * 0.35, 0, -Math.sin(a) * 0.35);
        B.add(G.box, 0x2c2c28, 0.16, 0.2, 0.7, 0, 0, 0);
        B.add(G.cyl8, us ? 0x3a3a34 : 0x262624, us ? 0.07 : 0.06, 0.9, us ? 0.07 : 0.06, 0, 0.02, 0.75, Math.PI / 2, 0, 0);
        B.add(G.cyl8, 0x1a1a1a, 0.025, 0.25, 0.025, 0, 0.02, 1.3, Math.PI / 2, 0, 0);
        B.add(G.box, us ? 0x4a4f2e : 0x4f5348, 0.22, 0.2, 0.3, -0.2, -0.05, 0.05);
        if (!us) B.add(G.box, 0x5a3a22, 0.07, 0.12, 0.3, 0, -0.04, -0.45);
      }), t, 0, 0, 0, true);
      staticGunner(t, us ? 'us' : 'de', 0, -0.95, 0).position.y = -1.4;
      const loader = staticGunner(g, us ? 'us' : 'de', -1.1, -1.0, 0.5); loader.position.y = -0.1;
      const m = new THREE.Object3D(); m.position.set(0, 0.02, 1.45); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'atgun': {
      const t = new THREE.Group(); t.position.set(0, 0.9, 0); g.add(t);
      VM(merged('atgunT', B => {
        B.add(G.box, OD, 1.3, 1.25, 0.1, 0, 0.55, 0.6);
        for (const sx of [-1, 1]) B.add(G.box, OD, 0.7, 1.05, 0.1, sx * 0.95, 0.48, 0.48, 0, -sx * 0.45, 0);
        B.add(G.box, ODd, 0.28, 0.22, 0.12, -0.3, 0.75, 0.66);
        B.add(G.box, 0x3a3b2c, 0.35, 0.35, 0.9, 0, 0.42, 0.0);
        B.add(G.cyl12, 0x3a3b2c, 0.1, 3.6, 0.1, 0, 0.45, 2.3, Math.PI / 2, 0, 0);
        B.add(G.cyl12, 0x3a3b2c, 0.08, 1.6, 0.08, 0, 0.28, 1.2, Math.PI / 2, 0, 0);
        B.add(G.cyl12, 0x2c2d22, 0.13, 0.2, 0.13, 0, 0.45, 4.05, Math.PI / 2, 0, 0);
        for (const sx of [-1, 1]) {
          B.add(G.cyl12, RUBBER, 0.5, 0.28, 0.5, sx * 0.85, -0.38, 0.25, 0, 0, Math.PI / 2);
          B.add(G.cyl12, ODd, 0.3, 0.32, 0.3, sx * 0.85, -0.38, 0.25, 0, 0, Math.PI / 2);
          B.add(G.box, OD, 0.16, 0.16, 2.8, sx * 0.62, -0.62, -1.3, 0.12, sx * 0.32, 0);
          B.add(G.box, 0x2c2d22, 0.3, 0.1, 0.3, sx * 1.05, -0.85, -2.55);
        }
      }), t, 0, 0, 0, true);
      staticGunner(t, 'us', 0.65, -0.55, 0).position.y = -1.0;
      staticGunner(g, 'us', -1.0, -1.6, 0.4).position.y = -0.1;
      const m = new THREE.Object3D(); m.position.set(0, 0.45, 4.25); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'aa': case 'flak_de': {
      const us = kind === 'aa';
      const t = new THREE.Group(); t.position.set(0, 0.6, 0); g.add(t);
      VM(merged('aaT' + kind, B => {
        B.add(G.cyl12, us ? OD : 0x4f5348, us ? 0.7 : 0.45, 0.6, us ? 0.7 : 0.45, 0, 0.3, 0);
        B.add(G.box, us ? OD : 0x4f5348, us ? 1.4 : 0.9, 0.5, 1.2, 0, 0.8, 0);
        for (const sx of [-1, 1]) B.add(G.box, 0x3a3b2c, 0.1, 0.25, 0.6, sx * (us ? 0.95 : 0.6), 1.0, -0.3);
        if (!us) B.add(G.box, 0x5a5e52, 1.3, 0.9, 0.05, 0, 1.3, 0.55);
      }), t, 0, 0, 0, true);
      const bar = new THREE.Group(); bar.position.set(0, 1.25, 0); t.add(bar);
      VM(merged('aaB' + kind, B => {
        B.add(G.box, 0x3a3b2c, us ? 0.5 : 0.3, 0.45, 1.2, 0, 0, 0);
        B.add(G.cyl12, 0x2c2d22, us ? 0.07 : 0.045, us ? 3.2 : 2.2, us ? 0.07 : 0.045, 0, 0.05, us ? 2.2 : 1.6, Math.PI / 2, 0, 0);
        B.add(G.cone, 0x2c2d22, us ? 0.12 : 0.07, 0.4, us ? 0.12 : 0.07, 0, 0.05, us ? 3.9 : 2.8, Math.PI / 2, 0, 0);
        if (us) B.add(G.box, 0xb08a3a, 0.3, 0.5, 0.25, 0, 0.45, -0.2);
        else B.add(G.box, 0x1e1e1c, 0.12, 0.3, 0.2, 0, -0.3, 0.2);
      }), bar, 0, 0, 0, true);
      staticGunner(t, us ? 'us' : 'de', -0.9, -0.6, 0.2).position.y = -0.55;
      staticGunner(g, us ? 'us' : 'de', 1.2, -1.2, -0.4).position.y = -0.1;
      const m = new THREE.Object3D(); m.position.set(0, 0.05, us ? 4.1 : 3.0); bar.add(m);
      ud.turret = t; ud.barrel = bar; ud.muzzle = m; break;
    }
    case 'bunker': {
      const t = new THREE.Group(); t.position.set(0, 2.6, 4.2); g.add(t);
      VM(merged('bunkerMG', B => { B.add(G.box, 0x1e1e1c, 0.14, 0.14, 1.3, 0, 0, 0.4); B.add(G.cyl8, 0x1a1a1a, 0.05, 0.4, 0.05, 0, 0, 1.1, Math.PI / 2, 0, 0); }), t, 0, 0, 0, false);
      const m = new THREE.Object3D(); m.position.set(0, 0, 1.3); t.add(m);
      ud.turret = t; ud.muzzle = m; break;
    }
    case 'dehq':
      ud.flag = flagPole(g, -3, 10.5, 10, foeFlag());
      flagPole(g, 4, 10.5, 10, foeFlag());
      for (const x of [-8, 8]) staticGunner(g, 'de', x, 11.5, 0).position.y = 0.0;
      break;
  }
  if (kind === 'coastgun') {
    const t = new THREE.Group(); t.position.set(0, 0.7, 0); g.add(t);
    VM(merged('coastT', B => {
      B.add(G.box, OD, 2.4, 1.0, 3.0, 0, 0.5, 0);
      for (const sx of [-1, 1]) { B.add(G.box, OD, 0.25, 0.25, 4.5, sx * 0.9, 0.1, -2.5, 0, sx * 0.3, 0); B.add(G.cyl12, RUBBER, 0.6, 0.35, 0.6, sx * 1.4, 0.0, 0.2, 0, 0, Math.PI / 2); }
      B.add(G.box, 0x3a3b2c, 0.7, 0.7, 2.2, 0, 1.2, 0.6);
      B.add(G.cyl12, 0x3a3b2c, 0.17, 7, 0.17, 0, 1.3, 4.6, Math.PI / 2, 0, 0);
    }), t, 0, 0, 0, true);
    staticGunner(t, 'us', 1.4, -0.8, 0).position.y = -0.7; staticGunner(g, 'us', -2, -2, 0.4).position.y = -0.1;
    const m = new THREE.Object3D(); m.position.set(0, 1.3, 8.3); t.add(m);
    ud.turret = t; ud.muzzle = m;
  }
  if (kind === 'naval') ud.flag = flagPole(g, 4, 4, 9, TEX.usflag);
  const sz = BUILD_SIZE[kind];
  if (sz) { ud.scaffold = VM(merged('scaf' + kind, B => bScaffold(B, sz[0] * 0.9, sz[1] * 0.9, sz[2])), g, 0, 0, 0, false); ud.scaffold.visible = false; }
  g.userData = ud;
  return g;
}

/* ---------- Pacífico: tanques japoneses, caça Zero, navios ---------- */
TEX.jpflag = canvasTex(96, 64, (g) => { g.fillStyle = '#f4f2ea'; g.fillRect(0, 0, 96, 64); g.fillStyle = '#bc002d'; g.beginPath(); g.arc(48, 32, 19, 0, 7); g.fill(); });
TEX.hinomaru = canvasTex(64, 64, (g) => { g.fillStyle = '#f4f2ea'; g.beginPath(); g.arc(32, 32, 30, 0, 7); g.fill(); g.fillStyle = '#bc002d'; g.beginPath(); g.arc(32, 32, 25, 0, 7); g.fill(); });
function foeFlag() { return SC.biome === 'tropical' ? TEX.jpflag : TEX.deflag; }

// Chi-Ha Tipo 97: casco rebitado, torre deslocada com antena em arco (hachimaki)
VEH.chiha = () => vehicleShell('chiha', { L: 6.2, W: 2.8, tw: 0.42, th: 0.95, paint: 0x7d6c45, camo: [0x4f5a35, 0x9a8a5a], tur: [0.3, 1.95, -0.1], gy: 0.4, gz: 0.85 },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36, tx = s.W / 2 - s.tw / 2;
    B.add(sideProfile([[3.0, 0.5], [3.15, 0.95], [2.9, 1.25], [-3.0, 1.25], [-3.1, 0.55]], s.W - 0.9, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[2.6, 1.2], [1.6, 1.95], [-1.4, 1.95], [-2.0, 1.75], [-3.1, 1.7], [-3.15, 1.2]], s.W - 0.1, 3), P0, 1, 1, 1, 0, 0, 0);
    B.add(G.box, P0, 0.9, 0.6, 1.0, -0.6, 1.95, 1.35);
    B.add(G.box, dark, 0.4, 0.12, 0.05, -0.6, 2.05, 1.86);
    B.add(G.sph, met, 0.13, 0.13, 0.13, 0.55, 1.7, 2.2);
    for (let i = 0; i < 18; i++) B.add(G.sph, met, 0.035, 0.035, 0.035, (i % 2 ? 1 : -1) * (s.W / 2 - 0.04), 1.55, -2.6 + Math.floor(i / 2) * 0.6);
    B.add(G.box, 0xd9b52a, s.W + 0.02, 0.12, 0.3, 0, 1.6, -0.4);
    for (const sx of [-1, 1]) {
      B.add(G.box, P0, s.tw + 0.1, 0.05, s.L - 0.4, sx * tx, 1.0, 0);
      for (let i = 0; i < 6; i++) wheel(B, sx * (tx + 0.12), 0.3, -2.1 + i * 0.84, 0.26, 0.18, dark, P0);
      B.add(G.box, met, 0.08, 0.1, 4.6, sx * (tx + 0.24), 0.62, 0);
      for (let i = 0; i < 3; i++) B.add(G.cyl8, dark, 0.09, 0.14, 0.09, sx * (tx + 0.1), 0.86, -1.6 + i * 1.6, 0, 0, Math.PI / 2);
      wheel(B, sx * (tx + 0.1), s.th - 0.32, s.L / 2 - 0.35, 0.32, 0.22, dark, met);
      wheel(B, sx * (tx + 0.1), s.th - 0.3, -s.L / 2 + 0.32, 0.28, 0.2, dark, P0);
    }
    B.add(G.cyl8, 0x5a3b2a, 0.15, 1.2, 0.15, 0, 1.25, -3.2, 0, 0, Math.PI / 2);
    tarpRoll(B, -0.4, 1.95, -2.4, 1.0, 0x6a6345);
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, P0, 0.82, 0.75, 0.9, 0, 0.38, 0);
    B.add(G.cyl12, P0, 0.62, 0.22, 0.62, 0, 0.86, -0.1);
    B.add(G.box, P0, 0.55, 0.45, 0.3, 0, 0.4, 0.85);
    B.add(G.torus, 0x2c2c28, 1.25, 1.25, 1.25, 0, 0.95, -0.15, Math.PI / 2, 0, 0);
    crewBust(B, 0, 1.2, -0.1, 'de');
  },
  (B) => { B.add(G.cyl12, 0x3a3b2c, 0.1, 1.0, 0.1, 0, 0, 0.5, Math.PI / 2, 0, 0); B.add(G.cyl12, 0x2c2d22, 0.12, 0.15, 0.12, 0, 0, 1.0, Math.PI / 2, 0, 0); },
  1.1, { L: 6.2, h: 0.95, rs: 0.34, ri: 0.3, w: 0.42, x: 1.19 }, null, null);
// Ha-Go Tipo 95: tanque leve com torre à esquerda e canhão de 37 mm
VEH.hago = () => vehicleShell('hago', { L: 5.4, W: 2.4, tw: 0.36, th: 0.9, paint: 0x7d6c45, camo: [0x4f5a35, 0x9a8a5a], tur: [-0.35, 1.8, 0.4], gy: 0.36, gz: 0.7 },
  (B, s) => {
    const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36, tx = s.W / 2 - s.tw / 2;
    B.add(sideProfile([[2.6, 0.5], [2.75, 0.9], [2.4, 1.15], [-2.6, 1.15], [-2.7, 0.55]], s.W - 0.7, 2), P0, 1, 1, 1, 0, 0, 0);
    B.add(sideProfile([[2.3, 1.1], [1.5, 1.8], [-1.2, 1.8], [-2.7, 1.55], [-2.7, 1.1]], s.W - 0.1, 3), P0, 1, 1, 1, 0, 0, 0);
    B.add(G.box, P0, 0.8, 0.5, 0.8, 0.5, 1.8, 1.4);
    B.add(G.box, 0xd9b52a, s.W + 0.02, 0.1, 0.25, 0, 1.45, -0.6);
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 4; i++) wheel(B, sx * (tx + 0.1), 0.34, -1.6 + i * 1.05, 0.3, 0.16, dark, P0);
      B.add(G.box, met, 0.08, 0.1, 3.4, sx * (tx + 0.2), 0.66, 0);
      wheel(B, sx * (tx + 0.08), s.th - 0.3, s.L / 2 - 0.32, 0.3, 0.2, dark, met);
      wheel(B, sx * (tx + 0.08), s.th - 0.28, -s.L / 2 + 0.3, 0.26, 0.2, dark, P0);
    }
  },
  (B, s) => {
    const P0 = s.paint;
    B.add(G.cyl12, P0, 0.62, 0.65, 0.66, 0, 0.32, 0);
    B.add(G.cone, P0, 0.55, 0.3, 0.55, 0, 0.8, -0.05);
    B.add(G.box, P0, 0.4, 0.35, 0.25, 0, 0.36, 0.62);
    crewBust(B, 0.2, 1.05, -0.2, 'de');
  },
  (B) => { B.add(G.cyl12, 0x3a3b2c, 0.06, 1.5, 0.06, 0, 0, 0.75, Math.PI / 2, 0, 0); },
  1.5, { L: 5.4, h: 0.9, rs: 0.32, ri: 0.28, w: 0.36, x: 1.02 }, null, null);
TANK_TEAM.chiha = 'de'; TANK_TEAM.hago = 'de';

/* navios genéricos: contratorpedeiros, cruzador e lanchas */
function shipTurret(g, key, x, y, z, barrels, col) {
  const t = new THREE.Group(); t.position.set(x, y, z); g.add(t);
  VM(merged('tur' + key, B => {
    const w = barrels > 2 ? 3.0 : 2.0;
    B.add(G.box, col, w, barrels > 2 ? 1.6 : 1.3, barrels > 2 ? 3.4 : 2.6, 0, 0.65, 0);
    B.add(G.cyl12, col, w * 0.52, barrels > 2 ? 1.6 : 1.3, w * 0.52, 0, 0.65, -0.9);
    for (let i = 0; i < barrels; i++) B.add(G.cyl12, 0x3a4046, 0.12, barrels > 2 ? 4.2 : 3.4, 0.12, (i - (barrels - 1) / 2) * 0.45, 0.75, barrels > 2 ? 3.3 : 2.8, Math.PI / 2, 0, 0);
  }), t, 0, 0, 0, true);
  return t;
}
function warshipHull(B, L, Bm, hullCol, lowCol, deckCol) {
  const low = new THREE.Color(lowCol);
  B.cf = (x, y, z, base) => (base.getHex() === hullCol && y < 1.4 ? low : base);
  const h = L / 2;
  const plan = [[0, h + 0.5], [Bm * 0.35, h - 5], [Bm / 2, h * 0.4], [Bm / 2, -h * 0.75], [Bm * 0.42, -h + 0.5], [-Bm * 0.42, -h + 0.5], [-Bm / 2, -h * 0.75], [-Bm / 2, h * 0.4], [-Bm * 0.35, h - 5]];
  B.add(planProfile(plan, 4.4, 2), hullCol, 1, 1, 1, 0, -1.6, 0);
  B.add(planProfile(plan.map(([x, z]) => [x * 0.95, z * 0.97]), 0.08, 1), deckCol, 1, 1, 1, 0, 2.8, 0);
}
const _makeShipBase = makeShip;
makeShip = function (kind) {
  if (kind === 'destroyer' || kind === 'sboot') return _makeShipBase(kind);
  const g = new THREE.Group(); g.rotation.order = 'YXZ';
  if (kind === 'cruiser') {
    const hc = 0x7e868c;
    VM(merged('crHull', B => {
      warshipHull(B, 66, 8, hc, 0x34404c, 0x6d6a62);
      B.add(G.box, hc, 5.4, 3.0, 12, 0, 4.3, 8);
      B.add(G.box, hc, 4.4, 2.4, 6, 0, 7.0, 9.5);
      B.add(G.box, hc, 3.4, 2.0, 3.5, 0, 9.2, 10.5);
      B.add(G.box, 0x222830, 3.45, 0.4, 0.1, 0, 9.5, 12.27);
      B.add(G.cyl8, 0x5a6268, 0.22, 12, 0.22, 0, 14, 7);
      B.add(G.box, 0x5a6268, 4, 0.14, 0.14, 0, 17, 7);
      for (const z of [0, -6]) { B.add(G.cyl12, hc, 1.3, 5, 1.6, 0, 5.8, z, -0.06, 0, 0); B.add(G.cyl12, 0x1c1c1c, 1.32, 0.5, 1.62, 0, 8.4, z - 0.15, -0.06, 0, 0); }
      B.add(G.box, hc, 5, 2.4, 8, 0, 4.0, -12);
      for (const sx of [-1, 1]) for (const z of [4, -2, -8]) { B.add(G.box, hc, 1.2, 0.9, 1.4, sx * 3.4, 3.4, z); B.add(G.cyl8, 0x3a4046, 0.09, 2.2, 0.09, sx * 3.4, 3.6, z + 1.4, Math.PI / 2, 0, 0); }
      for (const z of [10, -16, 2]) for (const sx of [-1, 1]) B.add(G.cyl8, 0x5a6268, 0.5, 0.6, 0.5, sx * 3.6, 3.1, z);
    }), g, 0, 0, 0, true);
    const t0 = shipTurret(g, 'cr', 0, 2.85, 24, 3, hc), t1 = shipTurret(g, 'cr', 0, 5.0, 18.5, 3, hc), t2 = shipTurret(g, 'cr', 0, 5.0, -20, 3, hc), t3 = shipTurret(g, 'cr', 0, 2.85, -25.5, 3, hc);
    t2.rotation.y = Math.PI; t3.rotation.y = Math.PI;
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0.75, 5.6); t0.add(muzzle);
    g.userData = { turret: t0, turrets: [t1, t2, t3], muzzle, wheels: [], L: 66 };
  } else if (kind === 'jdd') {
    const hc = 0x8d9196;
    VM(merged('jddHull', B => {
      warshipHull(B, 46, 5.4, hc, 0x5e6266, 0x6b4a34);
      B.add(G.box, hc, 3.2, 2.2, 5, 0, 3.9, 9);
      B.add(G.box, hc, 2.6, 2.2, 3, 0, 6.1, 9.6);
      B.add(G.box, hc, 2.0, 1.6, 2.2, 0, 7.9, 9.8);
      B.add(G.box, 0x222830, 2.05, 0.35, 0.1, 0, 8.2, 10.92);
      B.add(G.cyl8, 0x5a6268, 0.18, 9, 0.18, 0, 11, 7.5);
      B.add(G.cyl12, hc, 1.3, 4.6, 1.5, 0, 5.2, 3.5, -0.18, 0, 0); B.add(G.cyl12, 0x1c1c1c, 1.32, 0.4, 1.52, 0, 7.4, 3.1, -0.18, 0, 0);
      B.add(G.cyl12, hc, 1.0, 3.6, 1.15, 0, 4.7, -2.5, -0.14, 0, 0); B.add(G.cyl12, 0x1c1c1c, 1.02, 0.4, 1.17, 0, 6.4, -2.75, -0.14, 0, 0);
      for (const z of [-6.5, -11]) { B.add(G.cyl12, 0x5a6268, 1.0, 0.6, 1.0, 0, 3.1, z); for (let i = 0; i < 3; i++) B.add(G.cyl8, 0x4a525a, 0.18, 3.8, 0.18, -0.4 + i * 0.4, 3.6, z, Math.PI / 2, 0, 0); }
    }), g, 0, 0, 0, true);
    decal(g, TEX.jpflag, 1.6, 0, 15.2, 6.6, 0, Math.PI / 2).scale.set(1.8, 1.2, 1);
    const t0 = shipTurret(g, 'jdd', 0, 2.85, 15, 2, hc), t1 = shipTurret(g, 'jdd', 0, 3.6, -15, 2, hc), t2 = shipTurret(g, 'jdd', 0, 2.85, -19.5, 2, hc);
    t1.rotation.y = Math.PI; t2.rotation.y = Math.PI;
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0.75, 4.6); t0.add(muzzle);
    g.userData = { turret: t0, turrets: [t1, t2], muzzle, wheels: [], L: 46 };
  } else if (kind === 'pt') {
    VM(merged('ptHull', B => {
      const hc = 0x3e4c3e;
      const plan = [[0, 9.5], [1.5, 5.5], [2.1, 0], [2.0, -8], [-2.0, -8], [-2.1, 0], [-1.5, 5.5]];
      B.add(planProfile(plan, 2.0, 2), hc, 1, 1, 1, 0, -0.9, 0);
      B.add(planProfile(plan.map(([x, z]) => [x * 0.94, z * 0.96]), 0.06, 1), 0x6e5a40, 1, 1, 1, 0, 1.1, 0);
      B.add(G.box, hc, 1.8, 1.1, 2.6, 0, 1.6, 2.5);
      B.add(G.box, 0x222830, 1.85, 0.3, 0.1, 0, 1.9, 3.82);
      for (const sx of [-1, 1]) for (const z of [-1, -5]) B.add(G.cyl8, 0x5a6050, 0.32, 4.6, 0.32, sx * 1.6, 1.45, z, Math.PI / 2, 0, 0);
      for (const sx of [-1, 1]) { B.add(G.cyl8, 0x4a524e, 0.45, 0.5, 0.45, sx * 0.9, 1.4, 0.2); B.add(G.cyl8, 0x1c1c1c, 0.04, 1.2, 0.04, sx * 0.9, 1.8, 0.8, Math.PI / 2 - 0.3, 0, 0); }
      B.add(G.cyl8, 0x5a6268, 0.06, 2.5, 0.06, 0, 3.0, 2.0);
    }), g, 0, 0, 0, true);
    const t = new THREE.Group(); t.position.set(0, 1.2, 6.5); g.add(t);
    const muzzle = new THREE.Object3D(); muzzle.position.set(0, 0, 3); t.add(muzzle);
    g.userData = { turret: t, muzzle, wheels: [], L: 18 };
  }
  return g;
};

/* caça Zero A6M */
function makeZero() {
  const g = new THREE.Group(), props = [];
  const top = 0x3d5a3a;
  VM(merged('planeZero', B => {
    B.cf = planePaint(top, 0xb8b4a0, null);
    B.add(G.cyl12, top, 0.72, 4.8, 0.78, 0, 0, 1.4, Math.PI / 2, 0, 0);
    B.add(G.taper, top, 0.72, 5.6, 0.78, 0, 0.05, -3.7, -Math.PI / 2, 0, 0);
    B.add(G.cyl12, 0x1e1e1c, 0.88, 1.2, 0.92, 0, 0, 4.2, Math.PI / 2, 0, 0);
    B.add(G.sph, GLASS, 0.42, 0.45, 1.6, 0, 0.7, 0.3);
    wingPlan(B, top, 2.6, 1.0, 5.8, 0.5, -0.45, 1.0, 0.22, 1);
    wingPlan(B, top, 2.6, 1.0, 5.8, 0.5, -0.45, 1.0, 0.22, -1);
    for (const sx of [-1, 1]) B.add(G.box, 0xd9b52a, 4.4, 0.24, 0.18, sx * 3.4, -0.33, 2.3);
    wingPlan(B, top, 1.2, 0.6, 2.0, 0.2, 0.1, -6.3, 0.14, 1);
    wingPlan(B, top, 1.2, 0.6, 2.0, 0.2, 0.1, -6.3, 0.14, -1);
    B.add(sideProfile([[-5.5, 0.3], [-6.0, 1.9], [-7.0, 2.0], [-7.2, 0.3]], 0.14, 1), top, 1, 1, 1, 0, 0, 0);
    B.add(G.cyl8, 0x3a3a34, 0.3, 1.8, 0.3, 0, -0.95, 1.2, Math.PI / 2, 0, 0);
  }), g, 0, 0, 0, true);
  props.push(propMesh(g, 0, 0, 4.85, 1.9, 3));
  for (const sx of [-1, 1]) decal(g, TEX.hinomaru, 1.5, sx * 4.0, -0.22, 0.6, -Math.PI / 2, 0);
  for (const sx of [-1, 1]) decal(g, TEX.hinomaru, 0.9, sx * 0.62, 0.05, -2.6, 0, sx * Math.PI / 2);
  g.userData = { props };
  return g;
}
const _makePlaneBase = makePlane;
makePlane = function (kind) { return kind === 'zero' ? makeZero() : _makePlaneBase(kind); };
