// Modelos 3D (low-poly, feitos com formas simples) de veículos, aeronaves, navios e estruturas.
// Frente dos modelos = +Z. Medidas em metros, em escala real.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _c = new THREE.Color();

export const MAT = new THREE.MeshLambertMaterial({ vertexColors: true });
export const MAT_ROTOR = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, opacity: 0.75 });

export class Mont {
  constructor() { this.g = []; }
  add(geo, cor, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    _e.set(rx, ry, rz); _q.setFromEuler(_e);
    _m.compose(_p.set(x, y, z), _q, _s.set(sx, sy, sz));
    g.applyMatrix4(_m);
    _c.set(cor);
    const n = g.attributes.position.count, col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    if (g.attributes.uv) g.deleteAttribute('uv');
    if (g.attributes.uv1) g.deleteAttribute('uv1');
    this.g.push(g);
    return this;
  }
  box(w, h, d, cor, x, y, z, rx, ry, rz) { return this.add(new THREE.BoxGeometry(w, h, d), cor, x, y, z, rx, ry, rz); }
  cil(rt, rb, h, seg, cor, x, y, z, rx, ry, rz) { return this.add(new THREE.CylinderGeometry(rt, rb, h, seg), cor, x, y, z, rx, ry, rz); }
  esf(r, cor, x, y, z, sx = 1, sy = 1, sz = 1) { return this.add(new THREE.SphereGeometry(r, 10, 7), cor, x, y, z, 0, 0, 0, sx, sy, sz); }
  // forma vista de cima (pontos [x,z]) extrudada para cima com espessura esp, a partir de y
  planta(pts, esp, cor, y = 0, bisel = 0) {
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: esp, bevelEnabled: bisel > 0, bevelSize: bisel, bevelThickness: bisel, bevelSegments: 1 });
    return this.add(g, cor, 0, y + esp, 0, Math.PI / 2, 0, 0);
  }
  // planta espelhada em x (passa só metade direita, x>=0, de trás para frente)
  simetrica(meia, esp, cor, y = 0) {
    const pts = meia.concat(meia.slice().reverse().map(([x, z]) => [-x, z]));
    return this.planta(pts, esp, cor, y);
  }
  roda(r, larg, cor, x, y, z) { return this.cil(r, r, larg, 10, cor, x, y, z, 0, 0, Math.PI / 2); }
  build() { const g = mergeGeometries(this.g); g.computeBoundingSphere(); return g; }
}

const cache = {};
function malha(nome, fn, mat = MAT) {
  if (!cache[nome]) cache[nome] = fn();
  return new THREE.Mesh(cache[nome], mat);
}

// ---------------- cores ----------------
const VERDE = 0x55603a, VERDE2 = 0x434d2c, AREIA = 0xb39e70, PRETO = 0x1f2124, PNEU = 0x222222, VIDRO = 0x2d3e4a,
  CINZA_N = 0x7d868f, CINZA_N2 = 0x5f676f, CINZA_J = 0x5b6168, CINZA_F = 0x9aa3ac, BRANCO = 0xf0f0ea, METAL = 0x3a3d40, VERM = 0xb3261e;

// ---------------- veículos terrestres ----------------
function rodas(M, xs, zs, r, l, y) { for (const x of xs) for (const z of zs) M.roda(r, l, PNEU, x, y ?? r, z); }
function lagartas(M, comp, larg, alt, x) {
  for (const s of [-1, 1]) {
    M.box(0.7, alt, comp, PRETO, s * x, alt / 2 + 0.05, 0);
    for (let i = 0; i < 6; i++) M.roda(alt * 0.36, 0.72, 0x2a2a2a, s * x, alt * 0.38, -comp / 2 + 0.7 + i * (comp - 1.4) / 5);
  }
}

const VEIC = {
  humvee() {
    const c = new Mont();
    c.box(2.2, 0.75, 4.6, AREIA, 0, 0.95, 0);
    c.box(2.05, 0.75, 2.4, AREIA, 0, 1.7, -0.3);
    c.box(1.95, 0.5, 0.1, VIDRO, 0, 1.75, 0.92, -0.3);
    c.box(2.1, 0.35, 1.5, AREIA, 0, 1.45, 1.55, -0.12);
    c.box(2.25, 0.08, 0.5, METAL, 0, 0.7, 2.35);
    rodas(c, [-0.95, 0.95], [-1.5, 1.6], 0.46, 0.38);
    const t = new Mont();
    t.cil(0.55, 0.6, 0.35, 10, AREIA, 0, 0, 0);
    t.box(0.9, 0.5, 0.12, AREIA, 0, 0.35, 0.4);
    t.cil(0.05, 0.05, 1.5, 6, METAL, 0, 0.45, 0.95, Math.PI / 2);
    t.box(0.25, 0.25, 0.6, METAL, 0, 0.45, 0.1);
    return { corpo: c.build(), torre: t.build(), torreY: 2.1, torreZ: -0.4, canoZ: 1.7, canoY: 0.45 };
  },
  ambulancia() {
    const c = new Mont();
    c.box(2.2, 0.75, 5.0, AREIA, 0, 0.95, 0);
    c.box(2.1, 0.7, 1.2, AREIA, 0, 1.65, 1.15);
    c.box(1.95, 0.45, 0.1, VIDRO, 0, 1.7, 1.78, -0.3);
    c.box(2.2, 1.6, 2.6, 0xe7e1cf, 0, 2.05, -1.1);
    c.box(2.22, 0.35, 2.62, 0x2e6fae, 0, 2.2, -1.1);
    c.box(0.5, 0.18, 0.18, 0x3a7bd5, 0, 2.95, 0.2);
    rodas(c, [-0.95, 0.95], [-1.6, 1.6], 0.46, 0.38);
    return { corpo: c.build() };
  },
  stryker() {
    const c = new Mont();
    c.simetrica([[1.35, -3.5], [1.35, 2.4], [0.9, 3.5]], 1.5, VERDE, 0.7);
    c.box(2.5, 0.6, 5.4, VERDE2, 0, 2.45, -0.6);
    c.box(2.3, 0.3, 0.8, VERDE2, 0, 2.3, 2.6, -0.4);
    rodas(c, [-1.25, 1.25], [-2.6, -1.2, 0.8, 2.2], 0.55, 0.45);
    const t = new Mont();
    t.box(0.8, 0.6, 0.9, VERDE2, 0, 0.3, 0);
    t.cil(0.05, 0.05, 1.5, 6, METAL, 0, 0.35, 0.9, Math.PI / 2);
    t.box(0.3, 0.3, 0.3, VIDRO, 0.35, 0.65, 0.1);
    return { corpo: c.build(), torre: t.build(), torreY: 2.75, torreZ: 0.5, canoZ: 1.6, canoY: 0.35 };
  },
  bradley() {
    const c = new Mont();
    c.simetrica([[1.6, -3.2], [1.6, 2.2], [1.1, 3.3]], 1.4, AREIA, 0.6);
    c.box(3.0, 0.5, 4.2, AREIA, 0, 2.2, -0.6);
    lagartas(c, 6.3, 3.4, 1.2, 1.55);
    const t = new Mont();
    t.simetrica([[1.1, -1.2], [1.1, 0.8], [0.7, 1.3]], 0.85, AREIA, 0);
    t.cil(0.07, 0.07, 2.4, 6, METAL, -0.2, 0.45, 2.3, Math.PI / 2);
    t.box(0.5, 0.45, 1.2, VERDE2, 1.35, 0.55, 0);
    return { corpo: c.build(), torre: t.build(), torreY: 2.45, torreZ: 0.2, canoZ: 3.5, canoY: 0.45 };
  },
  abrams() {
    const c = new Mont();
    c.simetrica([[1.8, -3.9], [1.8, 3.2], [1.4, 4.0]], 1.0, AREIA, 0.7);
    c.box(3.6, 0.2, 7.6, 0x9f8b60, 0, 1.75, 0);
    lagartas(c, 7.6, 3.7, 1.3, 1.75);
    const t = new Mont();
    t.simetrica([[1.75, -2.6], [1.75, 1.0], [1.2, 2.2], [0.5, 2.5]], 0.85, AREIA, 0);
    t.box(3.0, 0.3, 1.0, 0x9f8b60, 0, 0.9, -2.2);
    t.cil(0.12, 0.14, 5.3, 8, AREIA, 0, 0.42, 4.9, Math.PI / 2);
    t.cil(0.2, 0.2, 0.7, 8, AREIA, 0, 0.42, 4.1, Math.PI / 2);
    t.cil(0.3, 0.3, 0.3, 8, METAL, 0.8, 1.0, -0.6);
    t.cil(0.03, 0.03, 1.0, 5, METAL, 0.8, 1.2, -0.1, Math.PI / 2);
    return { corpo: c.build(), torre: t.build(), torreY: 1.85, torreZ: -0.3, canoZ: 7.6, canoY: 0.42 };
  },
  paladin() {
    const c = new Mont();
    c.simetrica([[1.7, -3.4], [1.7, 2.8], [1.2, 3.5]], 1.0, AREIA, 0.7);
    lagartas(c, 6.8, 3.6, 1.2, 1.7);
    const t = new Mont();
    t.box(3.2, 1.6, 4.4, AREIA, 0, 0.8, -0.8);
    t.box(2.6, 0.4, 3.6, 0x9f8b60, 0, 1.75, -0.8);
    t.cil(0.12, 0.15, 6.5, 8, AREIA, 0, 0.9, 4.3, Math.PI / 2);
    t.cil(0.22, 0.22, 0.6, 8, METAL, 0, 0.9, 7.4, Math.PI / 2);
    return { corpo: c.build(), torre: t.build(), torreY: 1.75, torreZ: -0.2, canoZ: 7.6, canoY: 0.9 };
  },
  himars() {
    const c = new Mont();
    c.box(2.4, 0.7, 7.0, AREIA, 0, 1.15, 0);
    c.box(2.4, 1.5, 1.9, AREIA, 0, 2.2, 2.4);
    c.box(2.2, 0.7, 0.1, VIDRO, 0, 2.5, 3.36, -0.2);
    rodas(c, [-1.05, 1.05], [-2.7, -1.2, 2.5], 0.55, 0.45);
    const t = new Mont();
    t.box(2.3, 1.0, 4.0, 0x9f8b60, 0, 0.5, 0);
    t.box(2.0, 0.85, 0.05, PRETO, 0, 0.5, 2.02);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) t.cil(0.22, 0.22, 0.06, 8, METAL, -0.6 + i * 0.6, 0.3 + j * 0.42, 2.04, Math.PI / 2);
    return { corpo: c.build(), torre: t.build(), torreY: 1.6, torreZ: -1.4, canoZ: 2.1, canoY: 0.5 };
  },
};

// ---------------- aeronaves ----------------
function rotor(pas, r, cor = 0x2a2a2a, larg = 0.55) {
  const m = new Mont();
  for (let i = 0; i < pas; i++) {
    const a = (i * Math.PI * 2) / pas;
    m.box(larg, 0.06, r * 0.98, cor, Math.sin(a) * r / 2, 0, Math.cos(a) * r / 2, 0, a, 0);
  }
  m.cil(0.3, 0.3, 0.4, 8, METAL, 0, -0.1, 0);
  return m.build();
}
function rotorCauda(r) {
  const m = new Mont();
  m.box(0.08, r * 2, 0.25, 0x2a2a2a, 0, 0, 0);
  m.box(0.08, 0.25, r * 2, 0x2a2a2a, 0, 0, 0);
  return m.build();
}

const AERO = {
  blackhawk() {
    const c = new Mont();
    const COR = 0x3b4231;
    c.box(2.3, 1.9, 6.5, COR, 0, 1.6, 0.3);
    c.simetrica([[1.15, 3.5], [1.0, 4.8], [0.5, 5.6]], 1.6, COR, 0.75);
    c.box(1.8, 0.9, 1.3, VIDRO, 0, 2.15, 4.4, 0.35);
    c.box(1.6, 0.7, 1.6, COR, 0, 2.85, 0.6);
    c.cil(0.35, 0.6, 7.5, 8, COR, 0, 2.0, -6.2, Math.PI / 2);
    c.box(0.15, 2.4, 1.4, COR, 0, 3.0, -9.8, -0.3);
    c.box(4.4, 0.1, 0.9, COR, 0, 2.2, -9.2);
    c.box(4.0, 0.12, 0.9, COR, 0, 2.3, 0.5);
    c.box(0.15, 0.15, 1.6, METAL, 1.25, 1.9, 1.8);
    c.box(0.15, 0.15, 1.6, METAL, -1.25, 1.9, 1.8);
    for (const s of [-1, 1]) { c.cil(0.06, 0.06, 1.0, 5, METAL, s * 1.1, 0.4, 3.0); c.roda(0.3, 0.2, PNEU, s * 1.1, 0.3, 3.0); }
    c.roda(0.2, 0.15, PNEU, 0, 0.6, -8.6);
    return { corpo: c.build(), rotor: rotor(4, 8.2), rotorY: 3.35, rotorZ: 0.6, cauda: rotorCauda(1.7), caudaPos: [0.35, 3.0, -9.9], caudaEixo: 'x' };
  },
  chinook() {
    const c = new Mont();
    const COR = 0x4a5136;
    c.box(3.6, 3.4, 13.5, COR, 0, 2.3, 0);
    c.simetrica([[1.8, 6.7], [1.6, 7.8], [0.9, 8.3]], 2.6, COR, 1.0);
    c.box(2.6, 1.0, 1.2, VIDRO, 0, 3.1, 7.6, 0.4);
    c.box(1.4, 2.0, 2.8, COR, 0, 4.7, -6.0);
    c.box(1.2, 0.8, 1.8, COR, 0, 4.3, 6.0);
    c.box(4.4, 1.0, 5.0, COR, 0, 1.3, -1.0);
    for (const s of [-1, 1]) { c.roda(0.45, 0.35, PNEU, s * 1.5, 0.45, 4.6); c.roda(0.45, 0.35, PNEU, s * 1.5, 0.45, -4.4); }
    return { corpo: c.build(), rotor: rotor(3, 9.1), rotorY: 5.8, rotorZ: -6.5, rotor2: rotor(3, 9.1), rotor2Y: 5.0, rotor2Z: 6.3 };
  },
  apache() {
    const c = new Mont();
    const COR = 0x3e442f;
    c.simetrica([[0.5, -2.5], [0.8, -1.0], [0.85, 2.0], [0.55, 4.6], [0.2, 5.3]], 1.6, COR, 0.9);
    c.box(0.9, 0.9, 3.2, VIDRO, 0, 2.6, 2.8, 0.15);
    c.box(1.0, 0.8, 2.2, COR, 0, 2.9, 0.0);
    for (const s of [-1, 1]) {
      c.box(1.3, 0.8, 2.4, COR, s * 0.95, 2.6, -0.2);
      c.box(2.3, 0.12, 1.0, COR, s * 1.6, 1.85, 0.6);
      for (let i = 0; i < 2; i++) c.cil(0.1, 0.1, 1.6, 6, 0x6b6b45, s * (1.8 + i * 0.55), 1.55, 0.7, Math.PI / 2);
      c.box(0.35, 0.35, 1.8, 0x55583f, s * 2.7, 1.55, 0.6);
      c.cil(0.05, 0.05, 0.9, 5, METAL, s * 0.8, 0.45, 2.2);
      c.roda(0.3, 0.2, PNEU, s * 0.8, 0.3, 2.2);
    }
    c.cil(0.25, 0.45, 7.2, 8, COR, 0, 1.9, -6.0, Math.PI / 2);
    c.box(0.15, 2.0, 1.3, COR, 0, 2.6, -9.5, -0.25);
    c.box(3.2, 0.1, 0.8, COR, 0, 1.6, -9.2);
    c.cil(0.06, 0.06, 1.6, 6, METAL, 0, 0.55, 4.4, Math.PI / 2);
    return { corpo: c.build(), rotor: rotor(4, 7.3), rotorY: 3.75, rotorZ: 0.1, cauda: rotorCauda(1.4), caudaPos: [0.3, 3.0, -9.6], caudaEixo: 'x', armaZ: 5.2, armaY: 0.55 };
  },
  reaper() {
    const c = new Mont();
    const COR = 0x9ba3a9;
    c.simetrica([[0.25, -5.5], [0.45, -2.0], [0.55, 2.5], [0.4, 4.5], [0.1, 5.5]], 0.9, COR, 0);
    c.simetrica([[10.0, -0.4], [10.0, 0.4], [0.5, 1.1], [0.5, -0.6]], 0.15, COR, 0.4);
    c.box(0.1, 1.6, 0.9, COR, 0.7, 0.9, -5.0, 0, 0, -0.7);
    c.box(0.1, 1.6, 0.9, COR, -0.7, 0.9, -5.0, 0, 0, 0.7);
    for (const s of [-1, 1]) c.cil(0.1, 0.1, 1.5, 6, 0x6b6b45, s * 3.5, -0.2, 0.3, Math.PI / 2);
    c.esf(0.4, 0x30363b, 0, -0.2, 4.6);
    return { corpo: c.build(), helice: rotor(3, 1.4, 0x333333, 0.25), heliceZ: -5.7, heliceY: 0.45, heliceEixo: 'z' };
  },
  f35() {
    const c = new Mont();
    const COR = CINZA_J;
    c.simetrica([[0.9, -7.6], [2.5, -7.6], [2.9, -5.6], [5.35, -3.2], [5.35, -1.8], [1.6, 2.8], [1.0, 5.5], [0.45, 7.2], [0.0, 8.0]], 0.9, COR, 0.4);
    c.simetrica([[1.1, -6.5], [1.3, 3.0], [0.9, 5.5]], 0.6, 0x50565c, 1.2);
    c.esf(0.55, 0x9a7a3a, 0, 1.75, 3.9, 1, 0.75, 2.6);
    for (const s of [-1, 1]) {
      c.planta([[s * 1.4, -7.0], [s * 1.8, -6.0], [s * 1.9, -4.6], [s * 1.5, -4.6]], 0.12, COR, 1.2);
      c.box(0.1, 2.0, 2.0, COR, s * 1.55, 2.1, -5.6, 0, 0, s * 0.42);
      c.box(0.9, 0.7, 1.6, 0x41464b, s * 1.25, 1.0, 1.8);
    }
    c.cil(0.55, 0.65, 0.8, 10, 0x2b2b2b, 0, 0.95, -7.9, Math.PI / 2);
    return { corpo: c.build(), motorZ: -8.3, motorY: 0.95 };
  },
  f18() {
    const c = new Mont();
    const COR = CINZA_F;
    c.simetrica([[1.5, -8.6], [3.6, -8.6], [3.6, -6.8], [6.8, -3.8], [6.8, -2.6], [1.5, 1.0], [1.4, 5.0], [0.6, 7.8], [0.0, 9.0]], 0.9, COR, 0.4);
    c.simetrica([[1.3, -8.0], [1.4, 4.0], [0.8, 6.5]], 0.7, 0x86909a, 1.2);
    c.esf(0.55, 0x384650, 0, 1.85, 4.5, 1, 0.75, 2.4);
    for (const s of [-1, 1]) {
      c.box(0.12, 2.4, 2.4, COR, s * 1.4, 2.4, -5.4, 0, 0, s * 0.35);
      c.cil(0.08, 0.08, 3.2, 6, BRANCO, s * 6.8, 0.6, -2.8, Math.PI / 2);
      c.cil(0.18, 0.18, 2.6, 6, 0x6b6b45, s * 3.8, 0.0, -2.4, Math.PI / 2);
    }
    c.cil(0.5, 0.55, 0.8, 10, 0x2b2b2b, 0.65, 0.95, -8.9, Math.PI / 2);
    c.cil(0.5, 0.55, 0.8, 10, 0x2b2b2b, -0.65, 0.95, -8.9, Math.PI / 2);
    return { corpo: c.build(), motorZ: -9.3, motorY: 0.95 };
  },
  osprey() {
    const c = new Mont();
    const COR = 0x6c7378;
    c.box(2.5, 2.4, 11, COR, 0, 1.9, 0);
    c.simetrica([[1.25, 5.5], [1.0, 7.4], [0.4, 8.6]], 1.8, COR, 1.0);
    c.box(2.0, 0.8, 1.2, VIDRO, 0, 2.55, 7.6, 0.4);
    c.box(14.0, 0.4, 2.4, COR, 0, 3.4, 0.6);
    c.box(1.8, 1.0, 6.0, COR, 0, 2.9, -7.0);
    c.box(5.4, 0.15, 1.5, COR, 0, 3.3, -9.3);
    for (const s of [-1, 1]) c.box(0.15, 2.2, 1.4, COR, s * 2.6, 3.8, -9.3);
    const n = new Mont();
    n.cil(0.65, 0.65, 4.2, 8, COR, 0, 0, 0, Math.PI / 2);
    return { corpo: c.build(), nacele: n.build(), rotor: rotor(3, 5.8), naceleX: 7.0, naceleY: 3.5 };
  },
};

// ---------------- navios ----------------
const NAVAL = {
  lancha() {
    const c = new Mont();
    c.simetrica([[2.6, -12], [2.6, 6], [1.4, 11], [0, 13]], 2.0, CINZA_N, -0.6);
    c.box(4.0, 2.4, 7.0, CINZA_N2, 0, 2.6, 1.0);
    c.box(3.6, 0.6, 0.1, VIDRO, 0, 3.3, 4.55, -0.3);
    c.cil(0.15, 0.15, 3.0, 6, METAL, 0, 4.8, -0.5);
    c.box(1.6, 0.3, 0.3, METAL, 0, 6.2, -0.5);
    const t = new Mont();
    t.cil(0.6, 0.7, 0.8, 8, CINZA_N2, 0, 0, 0);
    t.cil(0.1, 0.1, 2.4, 6, METAL, 0, 0.4, 1.4, Math.PI / 2);
    return { corpo: c.build(), torre: t.build(), torreY: 1.8, torreZ: 8.5, canoZ: 2.6, canoY: 0.4 };
  },
  lcac() {
    const c = new Mont();
    c.simetrica([[7.2, -12.5], [7.2, 11.5], [5.5, 13.2]], 1.6, 0x26292c, 0);
    c.box(12.5, 0.4, 22, CINZA_N, 0, 1.8, 0);
    for (const s of [-1, 1]) c.box(2.2, 2.6, 20, CINZA_N2, s * 5.8, 3.3, -0.5);
    c.box(2.3, 1.2, 2.4, VIDRO, 5.8, 5.2, 6.0);
    for (const s of [-1, 1]) {
      c.cil(2.3, 2.3, 1.6, 14, CINZA_N2, s * 3.6, 4.4, -11.8, Math.PI / 2);
      c.cil(1.7, 1.7, 1.65, 12, 0x1c1c1c, s * 3.6, 4.4, -11.8, Math.PI / 2);
    }
    return { corpo: c.build() };
  },
  destroier() {
    const c = new Mont();
    c.simetrica([[8.5, -77], [10, -55], [10, 20], [7.5, 50], [3.5, 70], [0, 78]], 9.0, CINZA_N, -5.0);
    c.simetrica([[8.4, -76], [9.9, -55], [9.9, 20], [7.4, 50], [3.4, 70], [0, 77]], 0.3, 0x55595e, 4.0);
    c.box(15, 7, 30, CINZA_N, 0, 7.8, 12);
    c.box(12, 5, 10, CINZA_N, 0, 13.5, 16);
    c.box(10.5, 1.6, 0.2, VIDRO, 0, 14.5, 21.1);
    for (const s of [-1, 1]) c.box(0.2, 4, 4, 0x6c7d8c, s * 7.6, 9.5, 20, 0, 0, 0);
    c.box(1.5, 18, 1.5, CINZA_N2, 0, 22, 12);
    c.box(8, 0.6, 0.6, CINZA_N2, 0, 26, 12);
    c.box(4, 2.4, 1.0, 0xbfc5c9, 0, 30.5, 12);
    c.box(11, 7, 10, CINZA_N, 0, 7.8, -6);
    c.box(4.5, 8, 6, CINZA_N2, 0, 12, -6);
    c.box(3.5, 6, 4.5, CINZA_N2, 0, 11, -18);
    c.box(14, 6, 14, CINZA_N, 0, 7, -30);
    c.box(8, 0.3, 20, 0x52575c, 0, 4.4, -64);
    c.box(6.5, 0.4, 0.4, BRANCO, 0, 4.6, -64);
    c.box(7, 1, 7, 0x4a4f54, 0, 4.6, 42);
    c.box(6, 1, 6, 0x4a4f54, 0, 10.6, -40);
    c.cil(1.1, 1.1, 2.4, 10, BRANCO, 5.5, 12.5, -37);
    const t = new Mont();
    t.simetrica([[2.0, -2.0], [2.0, 1.0], [1.0, 2.8]], 2.2, CINZA_N, 0);
    t.cil(0.18, 0.25, 7.5, 8, CINZA_N2, 0, 1.2, 6.0, Math.PI / 2);
    return { corpo: c.build(), torre: t.build(), torreY: 4.3, torreZ: 56, canoZ: 9.5, canoY: 1.2 };
  },
  portaavioes() {
    const c = new Mont();
    c.simetrica([[16, -150], [19, -120], [20, 90], [12, 140], [0, 160]], 18, CINZA_N, -10);
    // convoo inclinado
    c.planta([[-38, -160], [36, -160], [37, -20], [24, 160], [-24, 160], [-26, 40], [-40, -60]], 1.0, 0x4b4f53, 8.0);
    c.box(1.2, 0.05, 300, 0xdedede, 0, 9.03, 0);
    c.box(1.0, 0.05, 220, 0xe0c040, -10, 9.04, -45, 0, -0.16, 0);
    for (let i = -6; i <= 6; i++) c.box(0.5, 0.05, 6, BRANCO, 0, 9.04, i * 22);
    // ilha
    c.box(11, 18, 30, CINZA_N, 30, 18, -30);
    c.box(9, 6, 18, CINZA_N2, 30, 30, -30);
    c.box(9.2, 1.5, 0.2, VIDRO, 30, 27, -14.9);
    c.box(1.5, 14, 1.5, CINZA_N2, 30, 40, -34);
    c.box(7, 0.6, 0.6, CINZA_N2, 30, 45, -34);
    c.box(3.6, 0.3, 3.6, 0xffffff, 30, 33.3, -30);
    // aviões estacionados no convés
    const meia = [[0.9, -7], [5, -3], [5, -2], [1.4, 2.5], [0, 7.5]];
    const jato = meia.concat(meia.slice().reverse().map(([x, z]) => [-x, z]));
    for (let i = 0; i < 7; i++) {
      const dx = -26 + (i % 2) * 12, dz = -120 + i * 34;
      c.planta(jato.map(([x, z]) => [x + dx, z + dz]), 1.0, CINZA_F, 9.0);
    }
    return { corpo: c.build() };
  },
};

// ---------------- estruturas da base ----------------
const ESTR = {
  qg() {
    const c = new Mont();
    c.box(40, 12, 26, 0xcbbd9b, 0, 6, 0);
    c.box(30, 4, 20, 0xb7a984, 0, 14, 0);
    c.box(42, 1, 28, 0x8c8165, 0, 12.4, 0);
    c.cil(0.25, 0.25, 26, 6, METAL, 14, 29, 6);
    c.box(0.4, 2.4, 4.0, 0x2b4a8c, 14, 40, 8.2);
    c.box(0.42, 1.2, 2.0, BRANCO, 14, 40.6, 7.1);
    c.cil(2.8, 2.8, 0.6, 14, BRANCO, -9, 16.8, -4, 0.5);
    c.cil(0.3, 0.3, 4, 6, METAL, -9, 18, -4);
    for (let i = 0; i < 5; i++) c.box(5, 2.2, 0.15, VIDRO, -16 + i * 8, 6.5, 13.05);
    return { corpo: c.build() };
  },
  quartel() {
    const c = new Mont();
    for (let i = 0; i < 3; i++) {
      c.box(14, 5, 40, 0xb7aa86, -20 + i * 20, 2.5, 0);
      c.box(15, 0.8, 41, 0x6b6450, -20 + i * 20, 5.4, 0);
    }
    for (let i = 0; i < 24; i++) c.box(1.4, 1.0, 0.7, 0x9a8a62, -32 + i * 2.8, 0.5, 24);
    return { corpo: c.build() };
  },
  patio() {
    const c = new Mont();
    c.box(60, 9, 30, 0xa9a28f, 0, 4.5, -10);
    c.box(62, 0.8, 32, 0x5f5b4f, 0, 9.3, -10);
    for (let i = 0; i < 5; i++) c.box(9, 7, 0.3, 0x707468, -24 + i * 12, 3.5, 5.2);
    c.box(64, 0.15, 30, 0x55585a, 0, 0.08, 22);
    return { corpo: c.build() };
  },
  heliporto() {
    const c = new Mont();
    for (const [x, z] of [[-30, 0], [0, 0], [30, 0], [-15, 32], [15, 32]]) {
      c.cil(12, 12, 0.3, 20, 0x45484b, x, 0.15, z);
      c.box(1.2, 0.05, 7, 0xf2f2f2, x - 2.2, 0.33, z);
      c.box(1.2, 0.05, 7, 0xf2f2f2, x + 2.2, 0.33, z);
      c.box(3.4, 0.05, 1.2, 0xf2f2f2, x, 0.33, z);
    }
    c.box(14, 7, 10, 0x9aa08c, 0, 3.5, -24);
    c.cil(0.2, 0.2, 9, 6, METAL, 6, 4.5, -20);
    c.cil(0.6, 0.1, 2.2, 8, 0xff7b00, 6, 9.0, -20, 0, 0, 1.3);
    return { corpo: c.build() };
  },
  docas() {
    const c = new Mont();
    c.box(16, 1.2, 70, 0x7c7468, 0, 0.6, 0);
    for (let i = 0; i < 8; i++) c.cil(0.5, 0.5, 4, 6, 0x4f4a42, 7, -1, -32 + i * 9);
    c.box(10, 6, 12, 0x9aa08c, -4, 4, -26);
    c.box(1.5, 12, 1.5, 0xd4a017, 3, 6, 18);
    c.box(1.5, 1.5, 14, 0xd4a017, 3, 12, 12);
    return { corpo: c.build() };
  },
  zona() {
    const c = new Mont();
    for (let i = 0; i < 4; i++) for (let j = 0; j < 3; j++) {
      c.box(8, 3, 14, 0xe9e4d2, -18 + i * 12, 1.5, -14 + j * 17);
      c.cil(0.01, 4.2, 1.8, 4, 0xf4f0e2, -18 + i * 12, 3.9, -14 + j * 17, 0, Math.PI / 4, 0);
    }
    c.box(56, 0.1, 56, 0x6f8a5a, 0, 0.06, 0);
    return { corpo: c.build() };
  },
  muro() {
    const c = new Mont();
    c.box(1.5, 2.2, 10, 0xb4a079, 0, 1.1, 0);
    return { corpo: c.build() };
  },
  torre() {
    const c = new Mont();
    for (const [x, z] of [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]]) c.box(0.3, 9, 0.3, 0x5b5040, x, 4.5, z);
    c.box(4.5, 2.2, 4.5, 0x7a6a4f, 0, 10, 0);
    c.box(5, 0.4, 5, 0x4a4234, 0, 11.6, 0);
    return { corpo: c.build() };
  },
  patriot() {
    const c = new Mont();
    c.box(2.6, 1.2, 9, VERDE, 0, 1.3, 0);
    rodas(c, [-1.1, 1.1], [-3, -1.6, 2.8], 0.55, 0.45);
    c.box(2.6, 1.8, 6, VERDE2, 0, 3.0, -1.2, -0.6);
    return { corpo: c.build() };
  },
};

const TODOS = Object.assign({}, VEIC, AERO, NAVAL, ESTR);

// cria o objeto 3D de um tipo; devolve {grupo, torre, rotor, rotor2, cauda, nacele...}
export function criarModelo(nome) {
  const def = cache['_d_' + nome] || (cache['_d_' + nome] = TODOS[nome]());
  const grupo = new THREE.Group();
  const r = { grupo, def };
  grupo.add(new THREE.Mesh(def.corpo, MAT));
  if (def.torre) {
    const t = new THREE.Mesh(def.torre, MAT);
    t.position.set(0, def.torreY, def.torreZ);
    grupo.add(t); r.torre = t;
  }
  if (def.rotor && !def.nacele) {
    const ro = new THREE.Mesh(def.rotor, MAT_ROTOR);
    ro.position.set(0, def.rotorY, def.rotorZ);
    grupo.add(ro); r.rotor = ro;
  }
  if (def.rotor2) {
    const ro = new THREE.Mesh(def.rotor2, MAT_ROTOR);
    ro.position.set(0, def.rotor2Y, def.rotor2Z);
    grupo.add(ro); r.rotor2 = ro;
  }
  if (def.cauda) {
    const ca = new THREE.Mesh(def.cauda, MAT_ROTOR);
    ca.position.set(...def.caudaPos);
    grupo.add(ca); r.cauda = ca;
  }
  if (def.helice) {
    const h = new THREE.Mesh(def.helice, MAT_ROTOR);
    h.position.set(0, def.heliceY, def.heliceZ);
    h.rotation.x = Math.PI / 2;
    grupo.add(h); r.helice = h;
  }
  if (def.nacele) {
    r.naceles = [];
    for (const s of [-1, 1]) {
      const piv = new THREE.Group();
      piv.position.set(s * def.naceleX, def.naceleY, 0.6);
      const n = new THREE.Mesh(def.nacele, MAT);
      piv.add(n);
      const ro = new THREE.Mesh(def.rotor, MAT_ROTOR);
      ro.position.set(0, 2.2, 0);
      piv.add(ro);
      grupo.add(piv);
      r.naceles.push({ piv, ro });
    }
  }
  return r;
}

// marcador de seleção (anel)
export function criarAnel(raio, cor = 0x4cff6a) {
  const g = new THREE.RingGeometry(raio * 0.86, raio, 28).rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.85, depthWrite: false }));
  m.renderOrder = 3;
  return m;
}
