// Pessoas (civis, zumbis e soldados) desenhadas com instâncias: poucas chamadas de desenho para milhares.
import * as THREE from 'three';

const MAX = 3200;
// partes: [geometria, pivô(x,y,z), membro?]
function partes() {
  return {
    tronco: [new THREE.BoxGeometry(0.42, 0.62, 0.25).translate(0, 1.15, 0), [0, 0, 0]],
    cabeca: [new THREE.BoxGeometry(0.22, 0.25, 0.24).translate(0, 1.6, 0), [0, 0, 0]],
    pernaE: [new THREE.BoxGeometry(0.17, 0.86, 0.19).translate(0, -0.43, 0), [0.11, 0.86, 0]],
    pernaD: [new THREE.BoxGeometry(0.17, 0.86, 0.19).translate(0, -0.43, 0), [-0.11, 0.86, 0]],
    bracoE: [new THREE.BoxGeometry(0.12, 0.62, 0.13).translate(0, -0.3, 0), [0.28, 1.43, 0]],
    bracoD: [new THREE.BoxGeometry(0.12, 0.62, 0.13).translate(0, -0.3, 0), [-0.28, 1.43, 0]],
    capacete: [new THREE.BoxGeometry(0.28, 0.13, 0.3).translate(0, 1.76, -0.01), [0, 0, 0]],
    arma: [new THREE.BoxGeometry(0.07, 0.09, 0.9).translate(-0.05, 1.22, 0.32), [0, 0, 0]],
    mochila: [new THREE.BoxGeometry(0.34, 0.42, 0.16).translate(0, 1.18, -0.2), [0, 0, 0]],
  };
}

export class Bonecos {
  constructor(cena) {
    this.def = partes();
    this.malhas = {};
    for (const k in this.def) {
      const cor = k === 'arma' ? 0x1d1d1d : 0xffffff;
      const m = new THREE.InstancedMesh(this.def[k][0], new THREE.MeshLambertMaterial({ color: cor }), MAX);
      m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      if (k !== 'arma') m.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(MAX * 3), 3);
      m.count = 0;
      m.frustumCulled = false;
      cena.add(m);
      this.malhas[k] = m;
    }
    this.n = { };
    for (const k in this.def) this.n[k] = 0;
  }
  comecar() { for (const k in this.n) this.n[k] = 0; }
  // escreve uma parte; ang = rotação do membro em X (pivô)
  _parte(k, x, y, z, c, s, ang, k2, r, g, b) {
    const m = this.malhas[k], i = this.n[k]++;
    if (i >= MAX) return;
    const e = m.instanceMatrix.array, o = i * 16;
    const piv = this.def[k][1];
    const ca = Math.cos(ang), sa = Math.sin(ang);
    // R = Ry(yaw) * Rx(ang), escala k2
    e[o] = c * k2; e[o + 1] = 0; e[o + 2] = -s * k2; e[o + 3] = 0;
    e[o + 4] = s * sa * k2; e[o + 5] = ca * k2; e[o + 6] = c * sa * k2; e[o + 7] = 0;
    e[o + 8] = s * ca * k2; e[o + 9] = -sa * k2; e[o + 10] = c * ca * k2; e[o + 11] = 0;
    // posição = pos + Ry * pivô * escala
    e[o + 12] = x + (c * piv[0] + s * piv[2]) * k2;
    e[o + 13] = y + piv[1] * k2;
    e[o + 14] = z + (-s * piv[0] + c * piv[2]) * k2;
    e[o + 15] = 1;
    if (m.instanceColor) { const a = m.instanceColor.array, oc = i * 3; a[oc] = r; a[oc + 1] = g; a[oc + 2] = b; }
  }
  // p: {x,y,z,ang,fase,pose,camisa,calca,pele,soldado,escala}
  // pose: 0 andando, 1 zumbi (braços à frente), 2 mirando, 3 caído, 4 braços para cima (pedindo socorro)
  add(x, y, z, ang, fase, pose, camisa, calca, pele, soldado, esc = 1) {
    const c = Math.cos(ang), s = Math.sin(ang);
    if (pose === 3) {
      // corpo caído: só tronco e cabeça deitados
      this._parteDeitada('tronco', x, y, z, c, s, camisa);
      this._parteDeitada('cabeca', x, y, z, c, s, pele);
      return;
    }
    const sw = Math.sin(fase);
    const pernas = sw * 0.55;
    this._parte('tronco', x, y, z, c, s, 0, esc, camisa[0], camisa[1], camisa[2]);
    this._parte('cabeca', x, y, z, c, s, 0, esc, pele[0], pele[1], pele[2]);
    this._parte('pernaE', x, y, z, c, s, pernas, esc, calca[0], calca[1], calca[2]);
    this._parte('pernaD', x, y, z, c, s, -pernas, esc, calca[0], calca[1], calca[2]);
    let be, bd;
    if (pose === 1) { be = -1.45 + sw * 0.15; bd = -1.5 - sw * 0.15; }
    else if (pose === 2) { be = -1.3; bd = -1.1; }
    else if (pose === 4) { be = Math.PI - 0.3 + sw * 0.3; bd = Math.PI - 0.3 - sw * 0.3; }
    else { be = -sw * 0.45; bd = sw * 0.45; }
    const braco = pose === 1 ? pele : camisa;
    this._parte('bracoE', x, y, z, c, s, be, esc, braco[0], braco[1], braco[2]);
    this._parte('bracoD', x, y, z, c, s, bd, esc, braco[0], braco[1], braco[2]);
    if (soldado) {
      this._parte('capacete', x, y, z, c, s, 0, esc, calca[0] * 0.8, calca[1] * 0.8, calca[2] * 0.8);
      this._parte('mochila', x, y, z, c, s, 0, esc, calca[0] * 0.9, calca[1] * 0.9, calca[2] * 0.9);
      if (pose !== 1) this._parte('arma', x, y, z, c, s, 0, esc, 0, 0, 0);
    }
  }
  _parteDeitada(k, x, y, z, c, s, cor) {
    const m = this.malhas[k], i = this.n[k]++;
    if (i >= MAX) return;
    const e = m.instanceMatrix.array, o = i * 16;
    // deitado: gira -90° em X (fica ao longo da direção ang), abaixa
    e[o] = c; e[o + 1] = 0; e[o + 2] = -s; e[o + 3] = 0;
    e[o + 4] = s; e[o + 5] = 0; e[o + 6] = c; e[o + 7] = 0;
    e[o + 8] = 0; e[o + 9] = -1; e[o + 10] = 0; e[o + 11] = 0;
    e[o + 12] = x - s * 0.9; e[o + 13] = y + 0.12; e[o + 14] = z - c * 0.9; e[o + 15] = 1;
    if (m.instanceColor) { const a = m.instanceColor.array, oc = i * 3; a[oc] = cor[0]; a[oc + 1] = cor[1]; a[oc + 2] = cor[2]; }
  }
  terminar() {
    for (const k in this.malhas) {
      const m = this.malhas[k];
      m.count = Math.min(MAX, this.n[k]);
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
    }
  }
}

// paletas
const hex = (h) => [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255];
export const CAMISAS = [0xd94f4f, 0x4f7fd9, 0xf2f2f2, 0xf2c94c, 0x56b870, 0xe68ac0, 0x333333, 0x7fd3e0, 0xff9f40, 0x9b6bd6, 0x1f4e8c, 0xc9b28f].map(hex);
export const CALCAS = [0x2f3b52, 0x3c3c3c, 0x6b5a45, 0x1f2a44, 0xd8cdb5, 0x4a5d7a, 0x2b2b2b].map(hex);
export const PELES = [0xf1c27d, 0xe0ac69, 0xc68642, 0x8d5524, 0xffdbac, 0xa86b3c].map(hex);
export const PELE_ZUMBI = [0x8fa37a, 0x9aa88a, 0x7d8f6a, 0xa3a98e].map(hex);
export const CAMO = hex(0x6b6346), CAMO2 = hex(0x58553e), PELE_SOLD = hex(0xd9a777);
export const MARINHA = hex(0x3a4a6b);
export { hex };
