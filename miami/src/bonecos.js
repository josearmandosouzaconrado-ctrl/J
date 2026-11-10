// Pessoas (civis, zumbis, soldados e SWAT) desenhadas com instâncias: poucas chamadas de desenho para milhares.
// Cada pessoa é feita de partes (tronco, colete, cabeça, cabelo, capacete com visão noturna, pernas com botas,
// braços, mãos, fuzil e mochila). Os soldados usam um conjunto com textura de camuflagem.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ---------- geometria com cores por vértice ----------
function peca(lista, geo, cor, x, y, z, rx = 0, ry = 0, rz = 0) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  g.translate(x, y, z);
  const n = g.attributes.position.count, c = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { c[i * 3] = cor; c[i * 3 + 1] = cor; c[i * 3 + 2] = cor; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  lista.push(g);
}
const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const C = (r1, r2, h, s = 6) => new THREE.CylinderGeometry(r1, r2, h, s);
function juntar(fn) { const l = []; fn(l); return mergeGeometries(l); }

// partes: [geometria, pivô]; membros giram em X no pivô
function partes() {
  return {
    tronco: [juntar((l) => {
      peca(l, B(0.4, 0.56, 0.23), 1, 0, 1.17, 0);
      peca(l, B(0.36, 0.1, 0.21), 0.92, 0, 0.86, 0);               // quadril
      peca(l, B(0.41, 0.06, 0.24), 0.28, 0, 0.92, 0);              // cinto
      peca(l, B(0.44, 0.1, 0.24), 0.96, 0, 1.42, 0);               // ombros
    }), [0, 0, 0]],
    colete: [juntar((l) => {
      peca(l, B(0.45, 0.4, 0.3), 1, 0, 1.2, 0);
      for (const x of [-0.13, 0, 0.13]) peca(l, B(0.11, 0.14, 0.06), 0.82, x, 1.1, 0.17);   // porta-carregadores
      peca(l, B(0.2, 0.12, 0.05), 0.8, 0.09, 1.31, 0.165);
      peca(l, B(0.14, 0.05, 0.06), 0.75, 0.2, 1.43, 0.05);          // ombreira
      peca(l, B(0.14, 0.05, 0.06), 0.75, -0.2, 1.43, 0.05);
    }), [0, 0, 0]],
    cabeca: [juntar((l) => {
      peca(l, B(0.21, 0.24, 0.23), 1, 0, 1.61, 0);
      peca(l, B(0.11, 0.1, 0.11), 0.92, 0, 1.47, 0);                // pescoço
      peca(l, B(0.045, 0.03, 0.02), 0.12, 0.05, 1.63, 0.116);       // olhos
      peca(l, B(0.045, 0.03, 0.02), 0.12, -0.05, 1.63, 0.116);
      peca(l, B(0.04, 0.06, 0.04), 0.95, 0, 1.585, 0.125);          // nariz
      peca(l, B(0.08, 0.018, 0.02), 0.45, 0, 1.53, 0.116);          // boca
      peca(l, B(0.03, 0.07, 0.05), 0.9, 0.115, 1.6, 0);             // orelhas
      peca(l, B(0.03, 0.07, 0.05), 0.9, -0.115, 1.6, 0);
    }), [0, 0, 0]],
    cabelo: [juntar((l) => {
      peca(l, B(0.23, 0.07, 0.25), 1, 0, 1.745, -0.005);
      peca(l, B(0.23, 0.17, 0.05), 1, 0, 1.65, -0.115);
      peca(l, B(0.03, 0.1, 0.18), 1, 0.115, 1.68, -0.02);
      peca(l, B(0.03, 0.1, 0.18), 1, -0.115, 1.68, -0.02);
    }), [0, 0, 0]],
    capacete: [juntar((l) => {
      const d = new THREE.SphereGeometry(0.155, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2);
      d.scale(1, 0.85, 1.12);
      peca(l, d, 1, 0, 1.67, -0.005);
      peca(l, C(0.157, 0.162, 0.05, 12).scale(1, 1, 1.12), 0.85, 0, 1.665, -0.005);
      peca(l, B(0.06, 0.05, 0.04), 0.3, 0, 1.76, 0.15);             // suporte do visor
      peca(l, C(0.022, 0.022, 0.09), 0.2, 0.03, 1.79, 0.17, Math.PI / 2 - 0.5);  // visão noturna
      peca(l, C(0.022, 0.022, 0.09), 0.2, -0.03, 1.79, 0.17, Math.PI / 2 - 0.5);
      peca(l, B(0.2, 0.035, 0.03), 0.25, 0, 1.66, 0.13);            // óculos/faixa
      peca(l, B(0.05, 0.06, 0.06), 0.7, 0.14, 1.7, 0);              // trilhos laterais
      peca(l, B(0.05, 0.06, 0.06), 0.7, -0.14, 1.7, 0);
    }), [0, 0, 0]],
    pernaE: [juntar((l) => {
      peca(l, B(0.17, 0.72, 0.19), 1, 0, -0.36, 0);
      peca(l, B(0.15, 0.1, 0.06), 0.7, 0, -0.42, 0.11);             // joelheira
      peca(l, B(0.17, 0.16, 0.27), 0.22, 0, -0.79, 0.04);           // bota
    }), [0.11, 0.86, 0]],
    pernaD: [null, [-0.11, 0.86, 0]],
    bracoE: [juntar((l) => {
      peca(l, B(0.13, 0.32, 0.14), 1, 0, -0.15, 0);
      peca(l, B(0.12, 0.28, 0.13), 0.94, 0, -0.44, 0);
    }), [0.28, 1.42, 0]],
    bracoD: [null, [-0.28, 1.42, 0]],
    maoE: [juntar((l) => { peca(l, B(0.1, 0.12, 0.11), 1, 0, -0.64, 0.01); }), [0.28, 1.42, 0]],
    maoD: [null, [-0.28, 1.42, 0]],
    // fuzil no "espaço do braço": -y aponta para onde o braço aponta, +z é "para cima"
    arma: [juntar((l) => {
      const k = 0.18;
      peca(l, B(0.05, 0.24, 0.06), 0.35, k, -0.05, -0.02);          // coronha
      peca(l, B(0.055, 0.32, 0.08), 0.22, k, -0.33, 0.0);           // caixa da culatra
      peca(l, B(0.06, 0.24, 0.075), 0.3, k, -0.6, 0.0);             // guarda-mão
      peca(l, C(0.012, 0.012, 0.32), 0.15, k, -0.86, 0.0);          // cano
      peca(l, B(0.04, 0.05, 0.13), 0.25, k, -0.36, -0.09, 0.25);    // carregador
      peca(l, B(0.035, 0.04, 0.09), 0.25, k, -0.24, -0.07);         // empunhadura
      peca(l, B(0.04, 0.11, 0.05), 0.12, k, -0.36, 0.07);           // mira óptica
      peca(l, B(0.05, 0.02, 0.03), 0.5, k, -0.36, 0.1);
    }), [-0.28, 1.42, 0.02]],
    mochila: [juntar((l) => {
      peca(l, B(0.33, 0.38, 0.16), 1, 0, 1.2, -0.2);
      peca(l, B(0.29, 0.14, 0.05), 0.85, 0, 1.12, -0.29);
      peca(l, C(0.07, 0.07, 0.34, 8), 0.8, 0, 1.42, -0.2, 0, 0, Math.PI / 2);
      peca(l, B(0.04, 0.18, 0.02), 0.3, 0.12, 1.28, -0.12);         // antena do rádio
    }), [0, 0, 0]],
  };
}

function texCamo() {
  const N = 128, c = document.createElement('canvas');
  c.width = c.height = N;
  const g = c.getContext('2d');
  g.fillStyle = '#b8ab84'; g.fillRect(0, 0, N, N);
  let s = 77;
  const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  const cores = ['#8d7f58', '#6f7350', '#cfc4a2', '#7a5f40', '#9a9467'];
  for (let k = 0; k < 70; k++) {
    g.fillStyle = cores[k % cores.length];
    g.beginPath();
    const x = r() * N, y = r() * N, rr = 4 + r() * 10;
    for (let a = 0; a < 6.28; a += 0.7) { const q = rr * (0.6 + r() * 0.6); g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q * 0.7); }
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const LISTA = ['tronco', 'colete', 'cabeca', 'cabelo', 'capacete', 'pernaE', 'pernaD', 'bracoE', 'bracoD', 'maoE', 'maoD', 'arma', 'mochila'];
const COM_CAMO = { tronco: 1, pernaE: 1, pernaD: 1, bracoE: 1, bracoD: 1, mochila: 1, colete: 1 };

class Conjunto {
  constructor(cena, def, max, camo) {
    this.def = def;
    this.m = {};
    this.n = {};
    for (const k of LISTA) {
      const geo = def[k][0] || def[k.replace(/D$/, 'E')][0];
      const mat = new THREE.MeshLambertMaterial({ vertexColors: true, map: camo && COM_CAMO[k] ? camo : null });
      const im = new THREE.InstancedMesh(geo, mat, max);
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(max * 3), 3);
      im.count = 0; im.frustumCulled = false; im.castShadow = true;
      cena.add(im);
      this.m[k] = im; this.n[k] = 0;
    }
    this.max = max;
  }
  comecar() { for (const k of LISTA) this.n[k] = 0; }
  terminar() {
    for (const k of LISTA) {
      const m = this.m[k];
      m.count = Math.min(this.max, this.n[k]);
      m.instanceMatrix.needsUpdate = true;
      m.instanceColor.needsUpdate = true;
    }
  }
  // escreve uma parte: R = Ry(yaw) * Rx(ang), escala k
  parte(k, x, y, z, c, s, ang, esc, cor) {
    const m = this.m[k], i = this.n[k]++;
    if (i >= this.max) return;
    const e = m.instanceMatrix.array, o = i * 16, piv = this.def[k][1];
    const ca = Math.cos(ang), sa = Math.sin(ang);
    e[o] = c * esc; e[o + 1] = 0; e[o + 2] = -s * esc; e[o + 3] = 0;
    e[o + 4] = s * sa * esc; e[o + 5] = ca * esc; e[o + 6] = c * sa * esc; e[o + 7] = 0;
    e[o + 8] = s * ca * esc; e[o + 9] = -sa * esc; e[o + 10] = c * ca * esc; e[o + 11] = 0;
    e[o + 12] = x + (c * piv[0] + s * piv[2]) * esc;
    e[o + 13] = y + piv[1] * esc;
    e[o + 14] = z + (-s * piv[0] + c * piv[2]) * esc;
    e[o + 15] = 1;
    const a = m.instanceColor.array, oc = i * 3;
    a[oc] = cor[0]; a[oc + 1] = cor[1]; a[oc + 2] = cor[2];
  }
  // parte deitada (corpo caído no chão)
  deitada(k, x, y, z, c, s, cor) {
    const m = this.m[k], i = this.n[k]++;
    if (i >= this.max) return;
    const e = m.instanceMatrix.array, o = i * 16;
    e[o] = c; e[o + 1] = 0; e[o + 2] = -s; e[o + 3] = 0;
    e[o + 4] = s; e[o + 5] = 0; e[o + 6] = c; e[o + 7] = 0;
    e[o + 8] = 0; e[o + 9] = -1; e[o + 10] = 0; e[o + 11] = 0;
    e[o + 12] = x - s * 0.9; e[o + 13] = y + 0.12; e[o + 14] = z - c * 0.9; e[o + 15] = 1;
    const a = m.instanceColor.array, oc = i * 3;
    a[oc] = cor[0]; a[oc + 1] = cor[1]; a[oc + 2] = cor[2];
  }
}

const LUVA = [0.22, 0.2, 0.17], PRETO = [0.12, 0.12, 0.13], COLETE_MIL = [0.62, 0.55, 0.4], CAP_MIL = [0.66, 0.6, 0.45];

export class Bonecos {
  constructor(cena) {
    const def = partes();
    this.civ = new Conjunto(cena, def, 3200, null);
    this.mil = new Conjunto(cena, def, 700, texCamo());
  }
  comecar() { this.civ.comecar(); this.mil.comecar(); }
  terminar() { this.civ.terminar(); this.mil.terminar(); }
  // estilo: 0 civil, 1 soldado, 2 SWAT, 3 soldado zumbi
  // pose: 0 andando, 1 zumbi (braços à frente), 2 mirando, 3 caído, 4 acenando
  add(x, y, z, ang, fase, pose, camisa, calca, pele, estilo = 0, esc = 1, cabelo = null) {
    const S = estilo === 1 || estilo === 3 ? this.mil : this.civ;
    const c = Math.cos(ang), s = Math.sin(ang);
    if (pose === 3) {
      S.deitada('tronco', x, y, z, c, s, camisa);
      S.deitada('cabeca', x, y, z, c, s, pele);
      return;
    }
    const sw = Math.sin(fase);
    const arm = estilo === 1 || estilo === 2;
    const pernas = sw * 0.55;
    const bob = Math.abs(Math.cos(fase)) * 0.03 * Math.min(1, Math.abs(pernas) * 3);
    const yy = y + bob;
    S.parte('tronco', x, yy, z, c, s, 0, esc, camisa);
    S.parte('cabeca', x, yy, z, c, s, 0, esc, pele);
    S.parte('pernaE', x, y, z, c, s, pernas, esc, calca);
    S.parte('pernaD', x, y, z, c, s, -pernas, esc, calca);
    let be, bd;
    if (pose === 1) { be = -1.45 + sw * 0.15; bd = -1.5 - sw * 0.15; }
    else if (pose === 2) { be = -1.38; bd = -1.5; }
    else if (pose === 4) { be = Math.PI - 0.3 + sw * 0.3; bd = Math.PI - 0.3 - sw * 0.3; }
    else if (arm) { be = -0.75 + sw * 0.05; bd = -0.6 - sw * 0.05; }
    else { be = -sw * 0.45; bd = sw * 0.45; }
    const braco = pose === 1 && !arm ? pele : camisa;
    S.parte('bracoE', x, yy, z, c, s, be, esc, braco);
    S.parte('bracoD', x, yy, z, c, s, bd, esc, braco);
    const mao = estilo === 0 || estilo === 3 ? pele : LUVA;
    S.parte('maoE', x, yy, z, c, s, be, esc, mao);
    S.parte('maoD', x, yy, z, c, s, bd, esc, mao);
    if (estilo === 0) {
      if (cabelo) S.parte('cabelo', x, yy, z, c, s, 0, esc, cabelo);
      return;
    }
    const swat = estilo === 2;
    S.parte('colete', x, yy, z, c, s, 0, esc, swat ? PRETO : estilo === 3 ? [0.45, 0.42, 0.33] : COLETE_MIL);
    S.parte('capacete', x, yy, z, c, s, 0, esc, swat ? PRETO : estilo === 3 ? [0.5, 0.47, 0.38] : CAP_MIL);
    if (!swat) S.parte('mochila', x, yy, z, c, s, 0, esc, estilo === 3 ? [0.6, 0.58, 0.5] : [0.92, 0.9, 0.85]);
    if (arm) S.parte('arma', x, yy, z, c, s, bd, esc, [0.35, 0.35, 0.36]);
  }
}

// paletas
const hex = (h) => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255];
export const CAMISAS = [0xd94f4f, 0x4f7fd9, 0xf2f2f2, 0xf2c94c, 0x56b870, 0xe68ac0, 0x333333, 0x7fd3e0, 0xff9f40, 0x9b6bd6, 0x1f4e8c, 0xc9b28f, 0xffffff, 0x2bb3a5].map(hex);
export const CALCAS = [0x2f3b52, 0x3c3c3c, 0x6b5a45, 0x1f2a44, 0xd8cdb5, 0x4a5d7a, 0x2b2b2b, 0x8aa0c2].map(hex);
export const PELES = [0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524, 0xffdbac, 0xa86b3c].map(hex);
export const CABELOS = [0x1a1410, 0x3b2a1e, 0x5e4026, 0x8a6a3b, 0xd8b56a, 0x222222, 0x6b2e1e, 0xb0a9a0].map(hex);
export const PELE_ZUMBI = [0x8fa37a, 0x9aa88a, 0x7d8f6a, 0xa3a98e].map(hex);
export const CAMO = [1, 1, 1], CAMO2 = [0.95, 0.95, 0.93], PELE_SOLD = hex(0xd9a777);
export const SWAT_ROUPA = hex(0x1d2026), SWAT_CALCA = hex(0x23262c);
export { hex };
