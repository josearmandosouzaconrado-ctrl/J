// Pessoas (civis, zumbis, soldados, SWAT e sobreviventes) desenhadas com instâncias.
// Esqueleto simples: quadril, tronco (que inclina), cabeça, coxa+canela (joelho), braço+antebraço (cotovelo).
// Os braços dos armados são resolvidos por cinemática inversa: as mãos seguram o fuzil de verdade.
// Andando: fuzil baixo, cano apontado para o chão à frente. Atirando: fuzil no ombro, mirando.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { QUAL } from './mapa.js';
import { loftY } from './forma.js';
// membro arredondado: lista [y, largura, frente, trás]
const membro = (secs, N = 10) => loftY(secs.map(([y, w, f, t]) => ({ y, w, f, t, n: 2.1 })), N);
const G_QUAL = () => QUAL;

// ---------- geometria com cores por vértice ----------
function peca(lista, geo, cor, x, y, z, rx = 0, ry = 0, rz = 0) {
  const g = geo.index ? geo.toNonIndexed() : geo;
  if (rx || ry || rz) g.applyMatrix4(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(rx, ry, rz)));
  g.translate(x, y, z);
  const n = g.attributes.position.count, c = new Float32Array(n * 3);
  const cc = Array.isArray(cor) ? cor : [cor, cor, cor];
  for (let i = 0; i < n; i++) { c[i * 3] = cc[0]; c[i * 3 + 1] = cc[1]; c[i * 3 + 2] = cc[2]; }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(n * 2), 2));
  lista.push(g);
}
const B = (w, h, d) => new THREE.BoxGeometry(w, h, d);
const C = (r1, r2, h, s = 7) => new THREE.CylinderGeometry(r1, r2, h, s);
const E = (r, sx, sy, sz) => { const g = new THREE.SphereGeometry(r, 12, 8); g.scale(sx, sy, sz); return g; };
// tronco afunilado (seção quadrada com cantos chanfrados)
function blocoAfunilado(wTop, wBot, h, prof) {
  const g = new THREE.CylinderGeometry(wTop * 0.72, wBot * 0.72, h, 8);
  g.rotateY(Math.PI / 8);
  g.scale(1, 1, prof);
  return g;
}
function juntar(fn) { const l = []; fn(l); return mergeGeometries(l); }   // mantém as normais suaves de cada peça

// medidas (metros)
const QUADRIL_Y = 0.93, COXA = 0.44, CANELA = 0.43, BRACO = 0.29, ANTEBRACO = 0.27, TRONCO = 0.5;

// cada geometria tem o pivô na origem; membros se estendem para -Y, tronco e cabeça para +Y
function geometrias() {
  return {
    quadril: juntar((l) => {
      peca(l, loftY([
        { y: 0.03, w: 0.29, f: 0.105, t: 0.1, n: 2.4 },
        { y: -0.07, w: 0.315, f: 0.11, t: 0.115, n: 2.4 },
        { y: -0.15, w: 0.27, f: 0.085, t: 0.1, n: 2.2 },
        { y: -0.19, w: 0.16, f: 0.05, t: 0.06 },
      ], 14), 1, 0, 0, 0);
    }),
    // tronco anatômico: cintura fina, peito largo, ombros caídos, costas retas
    tronco: juntar((l) => {
      peca(l, loftY([
        { y: -0.03, w: 0.29, f: 0.105, t: 0.1, n: 2.4 },
        { y: 0.07, w: 0.275, f: 0.11, t: 0.095, n: 2.4 },
        { y: 0.19, w: 0.315, f: 0.125, t: 0.1, n: 2.5 },
        { y: 0.31, w: 0.365, f: 0.137, t: 0.11, n: 2.6 },
        { y: 0.41, w: 0.395, f: 0.128, t: 0.115, n: 2.8 },
        { y: 0.47, w: 0.37, f: 0.095, t: 0.105, n: 2.8 },
        { y: 0.515, w: 0.22, f: 0.07, t: 0.08 },
        { y: 0.545, w: 0.11, f: 0.05, t: 0.05 },
      ], 16), 1, 0, 0, 0);
      peca(l, E(0.072, 1.05, 0.95, 1.05), 1, 0.19, 0.445, 0);           // deltoides
      peca(l, E(0.072, 1.05, 0.95, 1.05), 1, -0.19, 0.445, 0);
      peca(l, C(0.048, 0.055, 0.1, 10), 0.93, 0, 0.58, 0.005);           // pescoço
    }),
    cabeca: juntar((l) => {
      peca(l, new THREE.SphereGeometry(0.112, 14, 10).scale(0.9, 1.08, 1.0), 1, 0, 0.12, 0.005);
      peca(l, E(0.05, 0.9, 0.7, 0.6), 0.97, 0, 0.065, 0.075);         // queixo/mandíbula
      peca(l, B(0.04, 0.05, 0.04), 0.95, 0, 0.12, 0.112);              // nariz
      peca(l, B(0.035, 0.02, 0.012), 0.12, 0.042, 0.15, 0.104);        // olhos
      peca(l, B(0.035, 0.02, 0.012), 0.12, -0.042, 0.15, 0.104);
      peca(l, B(0.05, 0.012, 0.01), 0.45, 0, 0.068, 0.103);            // boca
      peca(l, E(0.03, 0.5, 1, 0.8), 0.92, 0.106, 0.12, 0);             // orelhas
      peca(l, E(0.03, 0.5, 1, 0.8), 0.92, -0.106, 0.12, 0);
    }),
    cabelo: juntar((l) => {
      const g = new THREE.SphereGeometry(0.118, 10, 6, 0, Math.PI * 2, 0, Math.PI * 0.55);
      g.scale(0.95, 1.05, 1.05);
      peca(l, g, 1, 0, 0.13, -0.008);
      peca(l, E(0.1, 1.0, 0.9, 0.6), 1, 0, 0.1, -0.06);
    }),
    capacete: juntar((l) => {
      const d = new THREE.SphereGeometry(0.135, 12, 6, 0, Math.PI * 2, 0, Math.PI * 0.52);
      d.scale(1, 0.92, 1.1);
      peca(l, d, 1, 0, 0.145, -0.005);
      peca(l, C(0.137, 0.142, 0.035, 12).scale(1, 1, 1.1), 0.85, 0, 0.15, -0.005);
      peca(l, B(0.05, 0.04, 0.035), 0.3, 0, 0.23, 0.13);              // suporte NVG
      peca(l, C(0.018, 0.018, 0.08), 0.2, 0.026, 0.25, 0.155, Math.PI / 2 - 0.4);
      peca(l, C(0.018, 0.018, 0.08), 0.2, -0.026, 0.25, 0.155, Math.PI / 2 - 0.4);
      peca(l, B(0.18, 0.03, 0.025), 0.25, 0, 0.14, 0.115);            // faixa dos óculos
      peca(l, B(0.04, 0.05, 0.05), 0.65, 0.128, 0.18, 0);              // trilhos
      peca(l, B(0.04, 0.05, 0.05), 0.65, -0.128, 0.18, 0);
      peca(l, B(0.07, 0.05, 0.03), 0.4, 0, 0.21, -0.14);               // contrapeso
    }),
    colete: juntar((l) => {
      peca(l, loftY([
        { y: 0.0, w: 0.33, f: 0.145, t: 0.135, n: 3 },
        { y: 0.16, w: 0.375, f: 0.16, t: 0.14, n: 3.2 },
        { y: 0.29, w: 0.405, f: 0.155, t: 0.135, n: 3.2 },
        { y: 0.35, w: 0.34, f: 0.125, t: 0.125, n: 3 },
      ], 16), 1, 0, 0, 0);
      for (const x of [-0.11, 0, 0.11]) peca(l, B(0.095, 0.12, 0.055), 0.8, x, 0.07, 0.17);
      peca(l, B(0.16, 0.1, 0.045), 0.78, 0.07, 0.2, 0.17);
      peca(l, B(0.11, 0.08, 0.045), 0.78, -0.12, 0.15, 0.165);
      for (const x of [-0.13, 0.13]) peca(l, B(0.06, 0.06, 0.26), 0.7, x, 0.355, 0.0);   // alças nos ombros
      peca(l, B(0.34, 0.055, 0.25), 0.55, 0, -0.07, 0.0);                  // cinto tático
    }),
    mochila: juntar((l) => {
      peca(l, blocoAfunilado(0.3, 0.28, 0.38, 0.55), 1, 0, 0.28, -0.18);
      peca(l, B(0.26, 0.13, 0.05), 0.85, 0, 0.2, -0.27);
      peca(l, C(0.065, 0.065, 0.3, 8), 0.8, 0, 0.5, -0.18, 0, 0, Math.PI / 2);
      peca(l, C(0.008, 0.008, 0.35, 4), 0.25, 0.1, 0.62, -0.2);         // antena
    }),
    coxa: juntar((l) => {
      peca(l, membro([[0.04, 0.15, 0.08, 0.075], [-0.05, 0.175, 0.098, 0.085], [-0.2, 0.162, 0.09, 0.08], [-0.34, 0.128, 0.07, 0.066], [-0.43, 0.112, 0.062, 0.06], [-0.47, 0.085, 0.045, 0.045]]), 1, 0, 0, 0);
      peca(l, B(0.05, 0.11, 0.09), 0.75, 0.085, -0.2, 0.0);               // bolso lateral
    }),
    canela: juntar((l) => {
      peca(l, membro([[0.03, 0.105, 0.058, 0.058], [-0.1, 0.112, 0.055, 0.072], [-0.24, 0.092, 0.046, 0.052], [-0.37, 0.078, 0.04, 0.042], [-0.4, 0.06, 0.03, 0.03]]), 1, 0, 0, 0);
      peca(l, E(0.055, 1.1, 1.0, 0.7), 0.75, 0, -0.02, 0.05);              // joelheira
    }),
    bota: juntar((l) => {
      peca(l, B(0.11, 0.1, 0.25), 1, 0, -0.04, 0.05);
      peca(l, B(0.115, 0.03, 0.27), 0.5, 0, -0.085, 0.05);              // sola
    }),
    braco: juntar((l) => {
      peca(l, membro([[0.03, 0.1, 0.05, 0.05], [-0.08, 0.112, 0.06, 0.056], [-0.2, 0.094, 0.048, 0.046], [-0.29, 0.084, 0.042, 0.042], [-0.32, 0.06, 0.03, 0.03]]), 1, 0, 0, 0);
    }),
    antebraco: juntar((l) => {
      peca(l, membro([[0.02, 0.082, 0.04, 0.04], [-0.07, 0.09, 0.046, 0.044], [-0.2, 0.068, 0.034, 0.033], [-0.25, 0.058, 0.03, 0.03]]), 1, 0, 0, 0);
    }),
    mao: juntar((l) => {
      peca(l, B(0.075, 0.095, 0.045), 1, 0, -0.045, 0.01);
      peca(l, B(0.025, 0.05, 0.03), 1, 0.035, -0.03, 0.03);             // polegar
    }),
    // fuzil M4: pivô na empunhadura, cano para +Z
    arma: juntar((l) => {
      const P = 0.13, M = 0.2, Q = 0.3;
      peca(l, B(0.045, 0.07, 0.24), Q, 0, 0.05, -0.27);                 // coronha
      peca(l, B(0.05, 0.085, 0.3), M, 0, 0.06, -0.02);                  // caixa da culatra
      peca(l, B(0.058, 0.07, 0.24), Q, 0, 0.055, 0.25);                 // guarda-mão
      peca(l, C(0.011, 0.011, 0.3), P, 0, 0.055, 0.5, Math.PI / 2);     // cano
      peca(l, C(0.017, 0.017, 0.06), P, 0, 0.055, 0.66, Math.PI / 2);   // quebra-chamas
      peca(l, B(0.035, 0.13, 0.06), Q, 0, -0.04, 0.05, 0.3);            // carregador
      peca(l, B(0.03, 0.09, 0.04), Q, 0, -0.02, -0.06, -0.3);           // empunhadura
      peca(l, B(0.035, 0.055, 0.12), 0.12, 0, 0.13, 0.03);              // mira óptica
      peca(l, B(0.04, 0.04, 0.02), 0.5, 0, 0.13, 0.095);
    }),
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
  for (let k = 0; k < 90; k++) {
    g.fillStyle = cores[k % cores.length];
    g.beginPath();
    const x = r() * N, y = r() * N, rr = 3 + r() * 8;
    for (let a = 0; a < 6.28; a += 0.7) { const q = rr * (0.6 + r() * 0.6); g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q * 0.7); }
    g.fill();
  }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const COM_CAMO = { quadril: 1, tronco: 1, coxa: 1, canela: 1, braco: 1, antebraco: 1, mochila: 1, colete: 1 };
// peças do equipamento modeladas no Blender (www/modelos/soldados.js): têm a cor gravada por vértice e o atributo
// 'liso' (1 = sem camuflagem: bolsas, armas, óculos); o resto recebe a textura de camuflagem da nação
const COM_CAMO_N = { ...COM_CAMO, capacete: 1, arma: 1 };
function b64buf(t) { const b = atob(t), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; }
function geoBlender(pt) {
  const P = new Int16Array(b64buf(pt.p)), N = new Int8Array(b64buf(pt.n)), Cc = new Uint8Array(b64buf(pt.c)), U = new Int16Array(b64buf(pt.uv)), L = new Uint8Array(b64buf(pt.l));
  const n = L.length, pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), cor = new Float32Array(n * 3), uv = new Float32Array(n * 2), liso = new Float32Array(n);
  for (let i = 0; i < n * 3; i++) { pos[i] = P[i] / 2000; nor[i] = N[i] / 127; cor[i] = Cc[i] / 255; }
  for (let i = 0; i < n * 2; i++) uv[i] = U[i] / 2048;
  for (let i = 0; i < n; i++) liso[i] = L[i];
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(cor, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setAttribute('liso', new THREE.BufferAttribute(liso, 1));
  g.setIndex(new THREE.BufferAttribute(new Uint16Array(b64buf(pt.i)), 1));
  g.computeBoundingSphere();
  return g;
}
// camuflagem só onde 'liso' = 0 (peças do corpo não têm o atributo: o valor padrão é 0)
function comLiso(mat) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = 'attribute float liso;\nvarying float vLiso;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvLiso = liso;');
    sh.fragmentShader = 'varying float vLiso;\n' + sh.fragmentShader.replace('#include <map_fragment>',
      '#ifdef USE_MAP\nvec4 sampledDiffuseColor = texture2D( map, vMapUv );\ndiffuseColor.rgb *= mix( sampledDiffuseColor.rgb, vec3( 1.0 ), vLiso );\n#endif');
  };
  mat.customProgramCacheKey = () => 'liso';
  return mat;
}
const DUPLAS = { coxa: 1, canela: 1, bota: 1, braco: 1, antebraco: 1, mao: 1 };

// ---------- matemática: R = Ry(yaw) * Rx(p) * Rz(r) ----------
const _v = [0, 0, 0];
// rotaciona v (local do corpo) por Rx(p)Rz(r)
function rotPR(x, y, z, cp, sp, cr, sr) {
  const x1 = cr * x - sr * y, y1 = sr * x + cr * y;
  _v[0] = x1; _v[1] = cp * y1 - sp * z; _v[2] = sp * y1 + cp * z;
  return _v;
}
// direção unitária d -> (pitch, roll) que leva (0,-1,0) a d
function dirParaPR(dx, dy, dz, out) {
  const r = Math.asin(Math.max(-1, Math.min(1, dx)));
  const p = Math.atan2(-dz, -dy);
  out[0] = p; out[1] = r;
}

class Conjunto {
  constructor(cena, geos, max, camo, comCamo = COM_CAMO) {
    this.m = {}; this.n = {};
    this.max = {};
    for (const k in geos) {
      const mx = DUPLAS[k] ? max * 2 : max;
      const mat = new THREE.MeshLambertMaterial({ vertexColors: true, map: camo && comCamo[k] ? camo : null });
      if (comCamo !== COM_CAMO && mat.map) comLiso(mat);
      const im = new THREE.InstancedMesh(geos[k], mat, mx);
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(mx * 3), 3);
      im.count = 0; im.frustumCulled = false; im.castShadow = (G_QUAL() >= 2);
      cena.add(im);
      this.m[k] = im; this.n[k] = 0; this.max[k] = mx;
    }
  }
  comecar() { for (const k in this.n) this.n[k] = 0; }
  terminar() {
    for (const k in this.m) {
      const m = this.m[k];
      m.count = Math.min(this.max[k], this.n[k]);
      m.visible = m.count > 0;
      m.instanceMatrix.needsUpdate = true;
      m.instanceColor.needsUpdate = true;
    }
  }
  // parte com pivô em (lx,ly,lz) no espaço do corpo (antes do giro yaw), orientação pitch/roll
  parte(k, bx, by, bz, cy, sy, lx, ly, lz, p, r, esc, cor) {
    const m = this.m[k], i = this.n[k]++;
    if (i >= this.max[k]) return;
    const e = m.instanceMatrix.array, o = i * 16;
    const cp = Math.cos(p), sp = Math.sin(p), cr = Math.cos(r), sr = Math.sin(r);
    const m00 = cy * cr + sy * sp * sr, m01 = -cy * sr + sy * sp * cr, m02 = sy * cp;
    const m10 = cp * sr, m11 = cp * cr, m12 = -sp;
    const m20 = -sy * cr + cy * sp * sr, m21 = sy * sr + cy * sp * cr, m22 = cy * cp;
    e[o] = m00 * esc; e[o + 1] = m10 * esc; e[o + 2] = m20 * esc; e[o + 3] = 0;
    e[o + 4] = m01 * esc; e[o + 5] = m11 * esc; e[o + 6] = m21 * esc; e[o + 7] = 0;
    e[o + 8] = m02 * esc; e[o + 9] = m12 * esc; e[o + 10] = m22 * esc; e[o + 11] = 0;
    e[o + 12] = bx + (cy * lx + sy * lz) * esc;
    e[o + 13] = by + ly * esc;
    e[o + 14] = bz + (-sy * lx + cy * lz) * esc;
    e[o + 15] = 1;
    const a = m.instanceColor.array, oc = i * 3;
    a[oc] = cor[0]; a[oc + 1] = cor[1]; a[oc + 2] = cor[2];
  }
}

const LUVA = [0.25, 0.22, 0.18], PRETO = [0.13, 0.13, 0.14], COLETE_MIL = [0.62, 0.56, 0.42], CAP_MIL = [0.52, 0.48, 0.36];
const BOTA_MIL = [0.55, 0.45, 0.32], BOTA_CIV = [0.2, 0.18, 0.17], BRANCO = [1, 1, 1], ESCURO_SNIPER = [0.82, 0.84, 0.8];
const _pr = [0, 0];

export class Bonecos {
  constructor(cena) {
    const geos = geometrias();
    this.civ = new Conjunto(cena, geos, 2600, null);
    this.mil = new Conjunto(cena, geos, 300, texCamo());
    // um conjunto por nação, com a camuflagem e o equipamento modelados no Blender
    this.nac = {};
    const SD = window.SOLDADOS;
    if (SD) for (const n in SD.pecas) {
      const g = { ...geos };
      for (const k in SD.pecas[n]) g[k] = geoBlender(SD.pecas[n][k]);
      if (!SD.pecas[n].mochila) delete g.mochila;
      delete g.cabelo;
      const t = new THREE.TextureLoader().load(SD.texturas[n]);
      t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4;
      this.nac[n] = new Conjunto(cena, g, 500, t, COM_CAMO_N);
      this.nac[n].blender = true;
    }
  }
  comecar() { this.civ.comecar(); this.mil.comecar(); for (const n in this.nac) this.nac[n].comecar(); }
  terminar() { this.civ.terminar(); this.mil.terminar(); for (const n in this.nac) this.nac[n].terminar(); }

  // membro de 2 ossos: do ponto S (ombro/quadril) até o alvo H, dobrando para o lado do polo
  _membro(S, k1, k2, L1, L2, ombro, alvo, polo, bx, by, bz, cy, sy, esc, cor1, cor2, kMao, corMao) {
    let dx = alvo[0] - ombro[0], dy = alvo[1] - ombro[1], dz = alvo[2] - ombro[2];
    let D = Math.hypot(dx, dy, dz) || 1e-4;
    const Dm = Math.min(D, (L1 + L2) * 0.999);
    const ux = dx / D, uy = dy / D, uz = dz / D;
    const a = (L1 * L1 - L2 * L2 + Dm * Dm) / (2 * Dm), h = Math.sqrt(Math.max(0, L1 * L1 - a * a));
    // vetor de dobra perpendicular
    const pd = polo[0] * ux + polo[1] * uy + polo[2] * uz;
    let bxv = polo[0] - pd * ux, byv = polo[1] - pd * uy, bzv = polo[2] - pd * uz;
    const bl = Math.hypot(bxv, byv, bzv) || 1;
    bxv /= bl; byv /= bl; bzv /= bl;
    const ex = ombro[0] + ux * a + bxv * h, ey = ombro[1] + uy * a + byv * h, ez = ombro[2] + uz * a + bzv * h;
    // osso 1
    let l1 = Math.hypot(ex - ombro[0], ey - ombro[1], ez - ombro[2]) || 1;
    dirParaPR((ex - ombro[0]) / l1, (ey - ombro[1]) / l1, (ez - ombro[2]) / l1, _pr);
    S.parte(k1, bx, by, bz, cy, sy, ombro[0], ombro[1], ombro[2], _pr[0], _pr[1], esc, cor1);
    // osso 2 (termina no alvo alcançável)
    const hx = ombro[0] + ux * Dm, hy = ombro[1] + uy * Dm, hz = ombro[2] + uz * Dm;
    const l2 = Math.hypot(hx - ex, hy - ey, hz - ez) || 1;
    dirParaPR((hx - ex) / l2, (hy - ey) / l2, (hz - ez) / l2, _pr);
    S.parte(k2, bx, by, bz, cy, sy, ex, ey, ez, _pr[0], _pr[1], esc, cor2);
    if (kMao) S.parte(kMao, bx, by, bz, cy, sy, hx, hy, hz, _pr[0], _pr[1], esc, corMao);
    return { ex, ey, ez, hx, hy, hz };
  }

  // estilo: 0 civil, 1 soldado, 2 SWAT, 3 soldado zumbi, 4 sobrevivente armado, 5 policial sobrevivente
  // pose: 0 andando, 1 zumbi, 2 mirando/atirando, 3 caído, 4 acenando
  add(x, y, z, ang, fase, pose, camisa, calca, pele, estilo = 0, esc = 1, cabelo = null, vel = 1, equip = null) {
    const mil = estilo === 1 || estilo === 3;
    const SN = mil && equip && equip.nacao ? this.nac[equip.nacao] : null;
    const S = SN || (mil ? this.mil : this.civ);
    this._S = S;
    if (SN) {
      // farda: a textura já tem as cores; o colete/capacete/arma trazem as cores do Blender
      camisa = equip.sniper ? ESCURO_SNIPER : BRANCO; calca = BRANCO;
      if (equip.pele) pele = equip.pele;
    }
    const cy = Math.cos(ang), sy = Math.sin(ang);
    const armado = estilo === 1 || estilo === 2 || estilo === 4 || estilo === 5;
    if (pose === 3) {
      // caído: deitado de costas
      S.parte('tronco', x, y + 0.15, z, cy, sy, 0, 0, 0, Math.PI / 2, 0, esc, camisa);
      S.parte('cabeca', x, y + 0.15, z, cy, sy, 0, 0, TRONCO + 0.08, Math.PI / 2, 0, esc, pele);
      S.parte('quadril', x, y + 0.12, z, cy, sy, 0, 0, 0, Math.PI / 2, 0, esc, calca);
      for (const s of [1, -1]) {
        S.parte('coxa', x, y + 0.1, z, cy, sy, s * 0.1, 0, -0.05, -Math.PI / 2, s * 0.15, esc, calca);
        S.parte('braco', x, y + 0.12, z, cy, sy, s * 0.22, 0, TRONCO - 0.05, -Math.PI / 2 - 0.5, s * 0.5, esc, camisa);
      }
      return;
    }
    const sw = Math.sin(fase), cw = Math.cos(fase);
    const andando = Math.min(1, vel);
    // inclinação do tronco: zumbi curvado, mirando um pouco à frente
    const lean = pose === 1 ? 0.35 : pose === 2 ? 0.12 : 0.05 + andando * 0.08;
    const bob = Math.abs(cw) * 0.035 * andando;
    const hy = QUADRIL_Y - bob;
    const cl = Math.cos(lean), sl = Math.sin(lean);
    // ---- pernas ----
    const roupaPerna = calca;
    const corBota = SN ? (equip.nacao === 'eua' ? BOTA_MIL : PRETO) : mil ? BOTA_MIL : estilo === 2 || estilo === 5 ? PRETO : BOTA_CIV;
    for (const s of [1, -1]) {
      const f = s === 1 ? sw : -sw;
      const coxa = pose === 5 ? -1.45 + f * 0.08 : -f * 0.55 * andando;   // negativo = perna para frente
      const joelho = pose === 5 ? 1.35 + f * 0.1 : Math.max(0, (s === 1 ? cw : -cw)) * 0.9 * andando + (pose === 1 ? 0.15 : 0.05);
      const hxp = s * 0.1;
      S.parte('coxa', x, y, z, cy, sy, hxp, hy, 0, coxa, 0, esc, roupaPerna);
      // joelho
      const kx = hxp, kyy = hy - COXA * Math.cos(coxa), kz = -COXA * Math.sin(coxa);
      const pc = coxa + joelho;
      S.parte('canela', x, y, z, cy, sy, kx, kyy, kz, pc, 0, esc, roupaPerna);
      const ax = kx, ayy = kyy - CANELA * Math.cos(pc), az = kz - CANELA * Math.sin(pc);
      S.parte('bota', x, y, z, cy, sy, ax, ayy + 0.06, az, 0, 0, esc, corBota);
    }
    S.parte('quadril', x, y, z, cy, sy, 0, hy, 0, 0, 0, esc, calca);
    // ---- tronco e cabeça (inclinam juntos) ----
    // ponto no tronco: (lx, ly acima do quadril, lz) rotacionado pela inclinação
    const T = (lx, ly, lz, out) => { out[0] = lx; out[1] = hy + ly * cl - lz * sl; out[2] = ly * sl + lz * cl; return out; };
    S.parte('tronco', x, y, z, cy, sy, 0, hy, 0, -lean, 0, esc, camisa);
    const pc0 = T(0, TRONCO + 0.1, 0, [0, 0, 0]);
    const olhar = pose === 1 ? -0.25 : pose === 2 ? 0.05 : 0;
    S.parte('cabeca', x, y, z, cy, sy, pc0[0], pc0[1], pc0[2], -lean * 0.4 + olhar, 0, esc, pele);
    if (mil || estilo === 2 || estilo === 5) {
      S.parte('colete', x, y, z, cy, sy, 0, hy + 0.12 * cl, 0.12 * sl, -lean, 0, esc, SN ? BRANCO : estilo === 2 || estilo === 5 ? PRETO : estilo === 3 ? [0.45, 0.42, 0.33] : equip && equip.colete ? equip.colete : COLETE_MIL);
      S.parte('capacete', x, y, z, cy, sy, pc0[0], pc0[1], pc0[2], -lean * 0.4 + olhar, 0, esc, SN ? BRANCO : estilo === 2 || estilo === 5 ? PRETO : estilo === 3 ? [0.5, 0.47, 0.38] : equip && equip.capacete ? equip.capacete : CAP_MIL);
      if (mil && S.m.mochila) S.parte('mochila', x, y, z, cy, sy, 0, hy + 0.12 * cl, 0.12 * sl, -lean, 0, esc, SN ? BRANCO : estilo === 3 ? [0.6, 0.58, 0.5] : [0.92, 0.9, 0.85]);
    } else if (cabelo) S.parte('cabelo', x, y, z, cy, sy, pc0[0], pc0[1], pc0[2], -lean * 0.4 + olhar, 0, esc, cabelo);
    // ---- braços ----
    const oE = T(0.2, TRONCO - 0.05, 0, [0, 0, 0]), oD = T(-0.2, TRONCO - 0.05, 0, [0, 0, 0]);
    const corMao = estilo === 0 || estilo === 3 || estilo === 4 ? pele : LUVA;
    const manga = camisa;
    if (armado && pose !== 1 && pose !== 4) {
      // posição do fuzil no corpo: empunhadura (mão direita) e ângulo
      const mirando = pose === 2;
      const gx = -0.11, gy = mirando ? 1.38 : 1.0 + bob * 0.5, gz = mirando ? 0.16 + sl * 0.3 : 0.2;
      const pitch = mirando ? 0 : 0.5 + sw * 0.04 * andando;      // positivo = cano para baixo
      const yawA = mirando ? 0.03 : 0.35;                            // atravessado no corpo quando baixo
      // fuzil: pivô na empunhadura; usa roll para o "yaw" local aproximado
      this._arma(S, x, y, z, cy, sy, gx, gy, gz, pitch, yawA, esc);
      // mão esquerda no guarda-mão (0.27 m à frente da empunhadura ao longo do cano)
      const dz = Math.cos(pitch) * Math.cos(yawA), dyv = -Math.sin(pitch), dxv = Math.sin(yawA) * Math.cos(pitch);
      const mE = [gx + dxv * 0.27, gy + 0.05 + dyv * 0.27, gz + dz * 0.27];
      const mD = [gx, gy + 0.02, gz - 0.02];
      this._membro(S, 'braco', 'antebraco', BRACO, ANTEBRACO, oE, mE, [1, -0.6, -0.3], x, y, z, cy, sy, esc, manga, manga, 'mao', corMao);
      this._membro(S, 'braco', 'antebraco', BRACO, ANTEBRACO, oD, mD, [-1, -0.7, -0.6], x, y, z, cy, sy, esc, manga, manga, 'mao', corMao);
      return;
    }
    // braços sem arma
    for (const s of [1, -1]) {
      const o = s === 1 ? oE : oD;
      let alvo;
      if (pose === 1) {
        // zumbi: braços esticados à frente, balançando
        alvo = [o[0] * 0.8, o[1] - 0.05 + (s === 1 ? sw : -sw) * 0.05, o[2] + 0.52];
      } else if (pose === 4) {
        alvo = [o[0] + s * (0.2 + sw * 0.12), o[1] + 0.5, o[2] + 0.05];
      } else {
        const f = (s === 1 ? -sw : sw) * 0.45 * andando;
        alvo = [o[0] + s * 0.05, o[1] - 0.52 * Math.cos(f) + 0.05 * andando, o[2] + 0.52 * Math.sin(f) + 0.04];
      }
      this._membro(S, 'braco', 'antebraco', BRACO, ANTEBRACO, o, alvo, [s * 0.4, 0.1, -1], x, y, z, cy, sy, esc, pose === 1 && estilo !== 3 ? pele : manga, pose === 1 ? pele : (estilo === 0 || estilo === 4 ? pele : manga), 'mao', corMao);
    }
  }

  // fuzil com pivô na empunhadura; pitch (cano para baixo) e desvio lateral
  _arma(S, bx, by, bz, cy, sy, gx, gy, gz, pitch, yawA, esc) {
    // R = Ry(ang+yawA) * Rx(pitch): soma o desvio ao giro do corpo
    const c2 = Math.cos(Math.atan2(sy, cy) + yawA), s2 = Math.sin(Math.atan2(sy, cy) + yawA);
    const wx = bx + (cy * gx + sy * gz) * esc, wz = bz + (-sy * gx + cy * gz) * esc;
    S.parte('arma', wx, by, wz, c2, s2, 0, gy, 0, pitch, 0, esc, S.blender ? BRANCO : [0.38, 0.38, 0.39]);
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
