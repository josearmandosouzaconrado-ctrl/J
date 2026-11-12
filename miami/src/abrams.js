// M1A2 Abrams feito a partir do modelo 3D "M1 Abrams low poly" (CGTrader, download gratuito),
// convertido de .blend por ferramentas/abrams/exportar.py. O casco e a torre são peças separadas
// para a torre girar; as cores do Exército (tan do deserto) são aplicadas aqui.
import * as THREE from 'three';
import { ABRAMS } from './abrams_dados.js';

// cor de cada material do arquivo original (índice gravado por vértice)
const CORES = [
  0xc2ab7c, // 0 blindagem: tan do deserto (CARC 686A)
  0x5e5b52, // 1 grades, escotilhas, metal
  0x2f2d29, // 2 esteiras e borracha das rodas
  0x86764f, // 3 cestos e bolsas de carga
  0x8c2a1f, // 4 lanternas
  0x1e1f20, // 5 metralhadoras e peças pretas
  0x48463e, // 6 coronha e mecanismo
  0x34332e, // 7 peças escuras
  0x4f5634, // 8 caixas de munição verde-oliva
];
const TORRE_Y = 1.44, TORRE_Z = 0.44; // pivô da torre (anel), em metros

function b64(s) { const b = atob(s); const u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; }

function geometria(d, dy, dz) {
  const P = new Int16Array(b64(d.p)), N = new Int8Array(b64(d.no)), C = new Uint8Array(b64(d.c)), I = new Uint16Array(b64(d.i));
  const n = d.n, pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), cor = new Float32Array(n * 3), uv = new Float32Array(n * 2);
  const pal = CORES.map((h) => new THREE.Color(h));
  let y0 = Infinity, y1 = -Infinity;
  for (let i = 0; i < n; i++) { const y = P[i * 3 + 1] / 1000; if (y < y0) y0 = y; if (y > y1) y1 = y; }
  for (let i = 0; i < n; i++) {
    const x = P[i * 3] / 1000, y = P[i * 3 + 1] / 1000, z = P[i * 3 + 2] / 1000;
    pos[i * 3] = x; pos[i * 3 + 1] = y - dy; pos[i * 3 + 2] = z - dz;
    const nx = N[i * 3] / 127, ny = N[i * 3 + 1] / 127, nz = N[i * 3 + 2] / 127;
    nor[i * 3] = nx; nor[i * 3 + 1] = ny; nor[i * 3 + 2] = nz;
    // textura de chapas projetada pela face dominante
    const ax = Math.abs(nx), ay = Math.abs(ny), az = Math.abs(nz);
    if (ay >= ax && ay >= az) { uv[i * 2] = x * 0.45; uv[i * 2 + 1] = z * 0.45; }
    else if (ax >= az) { uv[i * 2] = z * 0.45; uv[i * 2 + 1] = y * 0.45; }
    else { uv[i * 2] = x * 0.45; uv[i * 2 + 1] = y * 0.45; }
    const c = pal[C[i]] || pal[0];
    let r = c.r, g = c.g, b = c.b;
    // poeira nas partes baixas e manchas de uso (só na blindagem)
    const yy = y;
    if (C[i] === 0 || C[i] === 2) {
      const mancha = (Math.sin(x * 3.1 + z * 1.7) * Math.sin(z * 2.3 - x * 0.9) + 1) * 0.5;
      const k = Math.max(0, Math.min(1, (1.25 - yy) / 1.1)) * 0.5 + mancha * 0.1;
      r += (0.33 - r) * k; g += (0.25 - g) * k; b += (0.14 - b) * k;
    }
    // sombreamento falso: baixo mais escuro, topo mais claro
    let f = 0.62 + 0.38 * Math.min(1, (yy - y0) / Math.max(0.5, Math.min(3, y1 - y0)));
    if (ny > 0.6) f *= 1.08; else if (ny < -0.6) f *= 0.6;
    cor[i * 3] = r * f; cor[i * 3 + 1] = g * f; cor[i * 3 + 2] = b * f;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(cor, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(new THREE.BufferAttribute(I, 1));
  g.computeBoundingSphere();
  return g;
}

export function abramsModelo() {
  const corpo = geometria(ABRAMS.casco, 0, 0);
  const torre = geometria(ABRAMS.torre, TORRE_Y, TORRE_Z);
  // ponta do canhão (relativa ao pivô da torre)
  return { corpo, torre, torreY: TORRE_Y, torreZ: TORRE_Z, canoZ: 5.0, canoY: 0.43, destrocoTorre: true };
}

// material da carcaça: fosco, sem reflexo do céu (metal queimado não brilha)
let _matQ = null;
export function matQueimado() {
  if (!_matQ) _matQ = new THREE.MeshLambertMaterial({ vertexColors: true });
  return _matQ;
}

// versão queimada de qualquer geometria com cor por vértice: fuligem, metal exposto e ferrugem
const _queimadas = new WeakMap();
export function queimar(geo) {
  let q = _queimadas.get(geo);
  if (q) return q;
  q = geo.clone();
  const p = q.attributes.position, c = q.attributes.color;
  if (c) {
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
      const ruido = (Math.sin(x * 2.7 + y * 1.3) * Math.sin(z * 1.9 - y * 2.2 + x * 0.7) + 1) * 0.5;
      const lum = (c.getX(i) + c.getY(i) + c.getZ(i)) / 3;
      let r = 0.022 + lum * 0.05, g = 0.02 + lum * 0.045, b = 0.018 + lum * 0.04; // fuligem
      if (ruido > 0.86) { r = 0.15; g = 0.065; b = 0.03; }                         // ferrugem
      else if (ruido < 0.08) { r = 0.11; g = 0.105; b = 0.1; }                     // metal cinza exposto
      if (y < 0.7) { r += 0.04; g += 0.035; b += 0.03; }                           // cinza de terra
      c.setXYZ(i, r, g, b);
    }
    c.needsUpdate = true;
  }
  _queimadas.set(geo, q);
  return q;
}
