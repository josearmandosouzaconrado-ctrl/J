// Modelos 3D (feitos com formas simples) de veículos, aeronaves, navios e estruturas.
// Frente dos modelos = +Z. Medidas em metros, em escala real.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { QUAL } from './mapa.js';
import { superficie, loftZ, loftY, asa } from './forma.js';
import { abramsModelo } from './abrams.js';

const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _e = new THREE.Euler(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _c = new THREE.Color();

// textura de chapas: emendas, rebites e sujeira (multiplica a cor de cada peça)
function texChapas() {
  const N = 128, c = document.createElement('canvas');
  c.width = c.height = N;
  const g = c.getContext('2d');
  g.fillStyle = '#f4f4f4'; g.fillRect(0, 0, N, N);
  let s = 9;
  const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let k = 0; k < 900; k++) { const v = 200 + r() * 55 | 0; g.fillStyle = `rgba(${v},${v},${v},0.5)`; g.fillRect(r() * N, r() * N, 1 + r() * 3, 1 + r() * 3); }
  const sujo = g.createLinearGradient(0, 0, 0, N);
  sujo.addColorStop(0, 'rgba(90,70,40,0.0)'); sujo.addColorStop(1, 'rgba(90,70,40,0.18)');
  g.fillStyle = sujo; g.fillRect(0, 0, N, N);
  g.strokeStyle = 'rgba(0,0,0,0.18)'; g.lineWidth = 1.5; g.strokeRect(1, 1, N - 2, N - 2);
  g.strokeStyle = 'rgba(255,255,255,0.12)'; g.lineWidth = 1; g.strokeRect(3.5, 3.5, N - 7, N - 7);
  g.fillStyle = 'rgba(0,0,0,0.18)';
  for (let i = 10; i < N; i += 20) { g.fillRect(i, 6, 2, 2); g.fillRect(i, N - 8, 2, 2); g.fillRect(6, i, 2, 2); g.fillRect(N - 8, i, 2, 2); }
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping; t.anisotropy = 4; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}
const TEX_CHAPAS = texChapas();

// material dos veículos: com reflexo do céu (PBR) nas qualidades média/alta, simples na baixa
let _mat = null, _matV = null;
export function matCorpo() {
  if (!_mat) _mat = QUAL === 0
    ? new THREE.MeshLambertMaterial({ vertexColors: true, map: TEX_CHAPAS })
    : new THREE.MeshStandardMaterial({ vertexColors: true, map: TEX_CHAPAS, roughness: 0.52, metalness: 0.32, envMapIntensity: 0.9 });
  return _mat;
}
export function matVidro() {
  if (!_matV) _matV = QUAL === 0
    ? new THREE.MeshLambertMaterial({ color: 0x1c2833 })
    : new THREE.MeshStandardMaterial({ color: 0x1a2632, roughness: 0.06, metalness: 0.9, envMapIntensity: 1.6 });
  return _matV;
}
// céu simples para os reflexos dos materiais PBR (gerado uma vez)
export function criarAmbiente(renderer, cena) {
  if (QUAL === 0) return;
  const ceu = new THREE.Scene();
  const geo = new THREE.SphereGeometry(10, 32, 16);
  const mat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    vertexShader: 'varying vec3 vP; void main(){ vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `varying vec3 vP; void main(){
      float h = normalize(vP).y;
      vec3 c = h > 0.0 ? mix(vec3(0.85,0.9,0.95), vec3(0.38,0.6,0.88), pow(h, 0.6)) : mix(vec3(0.62,0.6,0.55), vec3(0.3,0.3,0.28), pow(-h, 0.5));
      // sol
      vec3 s = normalize(vec3(-0.5, 0.75, 0.4));
      c += vec3(1.0,0.9,0.7) * pow(max(0.0, dot(normalize(vP), s)), 300.0) * 6.0;
      gl_FragColor = vec4(c, 1.0);
    }`,
  });
  ceu.add(new THREE.Mesh(geo, mat));
  const pm = new THREE.PMREMGenerator(renderer);
  cena.environment = pm.fromScene(ceu, 0.02).texture;
  pm.dispose();
}
export const MAT_ROTOR = new THREE.MeshLambertMaterial({ vertexColors: true, transparent: true, opacity: 0.8 });

export class Mont {
  constructor() { this.g = []; }
  add(geo, cor, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, sx = 1, sy = 1, sz = 1, uvEsc = 0) {
    const g = geo.index ? geo.toNonIndexed() : geo;
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    if (uvEsc) { const uv = g.attributes.uv.array; for (let i = 0; i < uv.length; i++) uv[i] *= uvEsc; }
    _e.set(rx, ry, rz); _q.setFromEuler(_e);
    _m.compose(_p.set(x, y, z), _q, _s.set(sx, sy, sz));
    g.applyMatrix4(_m);
    _c.set(tingir(cor));
    const n = g.attributes.position.count, col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) { col[i * 3] = _c.r; col[i * 3 + 1] = _c.g; col[i * 3 + 2] = _c.b; }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    if (g.attributes.uv1) g.deleteAttribute('uv1');
    this.g.push(g);
    return this;
  }
  box(w, h, d, cor, x, y, z, rx, ry, rz) { return this.add(new THREE.BoxGeometry(w, h, d), cor, x, y, z, rx, ry, rz); }
  cil(rt, rb, h, seg, cor, x, y, z, rx, ry, rz) { return this.add(new THREE.CylinderGeometry(rt, rb, h, seg), cor, x, y, z, rx, ry, rz); }
  esf(r, cor, x, y, z, sx = 1, sy = 1, sz = 1) { return this.add(new THREE.SphereGeometry(r, 12, 8), cor, x, y, z, 0, 0, 0, sx, sy, sz); }
  // forma vista de cima (pontos [x,z]) extrudada para cima com espessura esp, a partir de y
  planta(pts, esp, cor, y = 0, bisel = 0) {
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    const g = new THREE.ExtrudeGeometry(s, { depth: esp, bevelEnabled: bisel > 0, bevelSize: bisel, bevelThickness: bisel, bevelSegments: 1 });
    return this.add(g, cor, 0, y + esp, 0, Math.PI / 2, 0, 0, 1, 1, 1, 0.25);
  }
  // planta espelhada em x (passa só metade direita, x>=0, de trás para frente)
  simetrica(meia, esp, cor, y = 0) {
    const pts = meia.concat(meia.slice().reverse().map(([x, z]) => [-x, z]));
    return this.planta(pts, esp, cor, y);
  }
  // perfil lateral (pontos [z,y]) extrudado na largura (centrado em x)
  perfil(pts, larg, cor, x = 0, bisel = 0.07) {
    const s = new THREE.Shape();
    s.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) s.lineTo(pts[i][0], pts[i][1]);
    s.closePath();
    const b = Math.min(bisel, larg * 0.2);
    const g = new THREE.ExtrudeGeometry(s, { depth: larg - 2 * b, bevelEnabled: b > 0, bevelSize: b, bevelThickness: b, bevelSegments: 2 });
    g.translate(0, 0, b);
    // shape (z,y) no plano XY -> gira para que X do shape vire Z do mundo
    return this.add(g, cor, x + larg / 2, 0, 0, 0, -Math.PI / 2, 0, 1, 1, 1, 0.3);
  }
  // corpo de revolução ao longo de Z: prof = [[z, raio], ...] (de trás para frente); sx/sy achatam a seção
  fuso(prof, cor, x = 0, y = 0, z = 0, sx = 1, sy = 1, seg = 14) {
    const pts = prof.map(([zz, r]) => new THREE.Vector2(Math.max(0.001, r), zz));
    const g = new THREE.LatheGeometry(pts, seg);
    g.rotateX(Math.PI / 2);          // eixo Y -> Z
    g.scale(sx, sy, 1);
    g.computeVertexNormals();
    return this.add(g, cor, x, y, z, 0, 0, 0, 1, 1, 1, 0.5);
  }
  // caixa com cantos arredondados (largura x altura x comprimento)
  bloco(w, h, d, cor, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0, raio = 0.12) {
    const r = Math.min(raio, w / 2.2, h / 2.2);
    const s = new THREE.Shape();
    const W = w / 2 - r, H = h / 2 - r;
    s.moveTo(-W, -h / 2); s.lineTo(W, -h / 2); s.quadraticCurveTo(w / 2, -h / 2, w / 2, -H);
    s.lineTo(w / 2, H); s.quadraticCurveTo(w / 2, h / 2, W, h / 2); s.lineTo(-W, h / 2);
    s.quadraticCurveTo(-w / 2, h / 2, -w / 2, H); s.lineTo(-w / 2, -H); s.quadraticCurveTo(-w / 2, -h / 2, -W, -h / 2);
    const b = Math.min(r, d * 0.2);
    const g = new THREE.ExtrudeGeometry(s, { depth: d - 2 * b, bevelEnabled: b > 0, bevelSize: b * 0.6, bevelThickness: b, bevelSegments: 2, curveSegments: 3 });
    g.translate(0, 0, -d / 2 + b);
    return this.add(g, cor, x, y, z, rx, ry, rz, 1, 1, 1, 0.3);
  }
  roda(r, larg, cor, x, y, z) {
    const tor = new THREE.TorusGeometry(r * 0.74, r * 0.26, 8, 18);
    tor.scale(1, 1, (larg / (r * 0.52)) * 0.95);
    this.add(tor, cor, x, y, z, 0, Math.PI / 2, 0);
    this.cil(r * 0.62, r * 0.62, larg * 0.7, 14, 0x3c3d38, x, y, z, 0, 0, Math.PI / 2);
    const lado = Math.sign(x) || 1;
    this.cil(r * 0.55, r * 0.55, 0.04, 10, 0x55574f, x + lado * larg / 2, y, z, 0, 0, Math.PI / 2);
    this.cil(r * 0.18, r * 0.22, 0.12, 8, 0x3a3a36, x + lado * (larg / 2 + 0.05), y, z, 0, 0, Math.PI / 2);
    return this;
  }
  build(ao = true) {
    const g = mergeGeometries(this.g);
    if (SUJAR && ao && !this.limpa) {
      // poeira e barro nas partes baixas, manchas aleatórias de uso
      const p = g.attributes.position, c = g.attributes.color;
      const PO = [0.62, 0.53, 0.4];
      for (let i = 0; i < p.count; i++) {
        const y = p.getY(i), x = p.getX(i), z = p.getZ(i);
        const mancha = (Math.sin(x * 3.1 + z * 1.7) * Math.sin(z * 2.3 - x * 0.9) + 1) * 0.5;
        const k = Math.max(0, Math.min(1, (1.25 - y) / 1.1)) * 0.55 + mancha * 0.12;
        c.setXYZ(i, c.getX(i) + (PO[0] - c.getX(i)) * k, c.getY(i) + (PO[1] - c.getY(i)) * k, c.getZ(i) + (PO[2] - c.getZ(i)) * k);
      }
    }
    if (ao) {
      // sombreamento falso: partes de baixo mais escuras, topo mais claro
      const p = g.attributes.position, n = g.attributes.normal, c = g.attributes.color;
      let y0 = Infinity, y1 = -Infinity;
      for (let i = 0; i < p.count; i++) { const y = p.getY(i); if (y < y0) y0 = y; if (y > y1) y1 = y; }
      const alt = Math.max(0.5, Math.min(3, y1 - y0));
      for (let i = 0; i < p.count; i++) {
        let f = 0.62 + 0.38 * Math.min(1, (p.getY(i) - y0) / alt);
        if (n.getY(i) > 0.6) f *= 1.08; else if (n.getY(i) < -0.6) f *= 0.6;
        c.setXYZ(i, c.getX(i) * f, c.getY(i) * f, c.getZ(i) * f);
      }
    }
    g.computeBoundingSphere();
    return g;
  }
}

const cache = {};
let SUJAR = false;

// ---------------- cores ----------------
const VERDE = 0x55603f, VERDE2 = 0x434c30, AREIA = 0xc2ab7c, AREIA2 = 0xa38d62, PRETO = 0x1f2124, PNEU = 0x1c1c1c, VIDRO = 0x1f3442,
  CINZA_N = 0x7d868f, CINZA_N2 = 0x5f676f, CINZA_J = 0x5b6168, CINZA_F = 0x9aa3ac, BRANCO = 0xf0f0ea, METAL = 0x34373a, VERM = 0xb3261e,
  FAROL = 0xfff3c4, LANTERNA = 0xc0281e;

// ---------------- veículos terrestres ----------------
function rodas(M, xs, zs, r, l, y) { for (const x of xs) for (const z of zs) M.roda(r, l, PNEU, x, y ?? r, z); }

// lagarta completa: esteira, rodas de apoio, roda motriz e tensora, saia lateral
function lagartas(M, comp, alt, x, larg = 0.66, saia = true, cor = AREIA) {
  for (const s of [-1, 1]) {
    const xx = s * x;
    M.box(larg, 0.12, comp, PRETO, xx, alt, 0);                         // esteira de cima
    M.box(larg, 0.12, comp - 1.2, PRETO, xx, 0.06, 0);                    // esteira de baixo
    M.box(larg, alt * 0.8, 0.12, PRETO, xx, alt * 0.5, comp / 2 - 0.3, 0.6);
    M.box(larg, alt * 0.8, 0.12, PRETO, xx, alt * 0.5, -comp / 2 + 0.3, -0.6);
    const nr = Math.max(5, Math.round(comp / 1.1));
    for (let i = 0; i < nr; i++) M.roda(alt * 0.34, larg * 0.9, 0x2c2e2a, xx, alt * 0.36, -comp / 2 + 1.0 + i * (comp - 2.0) / (nr - 1));
    M.roda(alt * 0.4, larg * 0.95, 0x30312c, xx, alt * 0.62, -comp / 2 + 0.35);
    M.roda(alt * 0.36, larg * 0.95, 0x30312c, xx, alt * 0.6, comp / 2 - 0.35);
    if (saia) M.box(0.1, alt * 0.55, comp - 0.6, cor, s * (x + larg / 2 + 0.06), alt * 0.82, 0);
  }
}
function faroisFrente(M, x, y, z) { for (const s of [-1, 1]) M.box(0.22, 0.14, 0.06, FAROL, s * x, y, z); }
function lanternas(M, x, y, z) { for (const s of [-1, 1]) M.box(0.16, 0.12, 0.06, LANTERNA, s * x, y, z); }
function antena(M, x, y, z, h = 2.6) { M.cil(0.012, 0.025, h, 4, PRETO, x, y + h / 2, z); }

// ---------------- detalhes pintados: números e insígnias ----------------
const SEGS = { 0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc', 7: 'abc', 8: 'abcdefg', 9: 'abcdfg' };
// plano: '+x', '-x' (laterais) ou '+y' (em cima). (x,y,z) é o centro do texto, h a altura dos dígitos
function numero(c, txt, x, y, z, h, plano, cor = 0xf2f2f2) {
  const w = h * 0.58, t = h * 0.14, passo = w * 1.45;
  const R = plano === '+x' ? [0, 0, -1] : plano === '-x' ? [0, 0, 1] : plano === '+z' ? [1, 0, 0] : plano === '-z' ? [-1, 0, 0] : [-1, 0, 0];
  const U = plano === '+y' ? [0, 0, 1] : [0, 1, 0];
  const N = plano === '+x' ? [1, 0, 0] : plano === '-x' ? [-1, 0, 0] : plano === '+z' ? [0, 0, 1] : plano === '-z' ? [0, 0, -1] : [0, 1, 0];
  const n = txt.length;
  [...txt].forEach((ch, k) => {
    const u0 = (k - (n - 1) / 2) * passo;
    for (const s of SEGS[ch] || '') {
      const [du, dv, hor] = { a: [0, h / 2, 1], d: [0, -h / 2, 1], g: [0, 0, 1], b: [w / 2, h / 4, 0], c: [w / 2, -h / 4, 0], e: [-w / 2, -h / 4, 0], f: [-w / 2, h / 4, 0] }[s];
      const su = hor ? w + t : t, sv = hor ? t : h / 2 + t;
      const px = x + R[0] * (u0 + du) + U[0] * dv + N[0] * 0.02, py = y + R[1] * (u0 + du) + U[1] * dv + N[1] * 0.02, pz = z + R[2] * (u0 + du) + U[2] * dv + N[2] * 0.02;
      const dim = [0, 0, 0];
      for (let i = 0; i < 3; i++) dim[i] = Math.abs(R[i]) * su + Math.abs(U[i]) * sv + Math.abs(N[i]) * 0.02;
      c.box(dim[0], dim[1], dim[2], cor, px, py, pz);
    }
  });
}
// insígnia dos EUA (estrela no círculo com barras). baixa visibilidade = tons de cinza
// variantes de outras nações: TINTA troca as cores neutras (cinzas) pela pintura da nação; MARCA troca a insígnia
let TINTA = null, MARCA = null;
function tingir(cor) {
  if (!TINTA) return cor;
  const r = ((cor >> 16) & 255) / 255, g = ((cor >> 8) & 255) / 255, b = (cor & 255) / 255;
  const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2;
  if (mx - mn > 0.12 || l < 0.22 || l > 0.9) return cor;            // cores fortes, pretos e brancos ficam
  const k = l / 0.62;
  const t = TINTA;
  return (Math.min(255, ((t >> 16) & 255) * k) << 16) | (Math.min(255, ((t >> 8) & 255) * k) << 8) | Math.min(255, (t & 255) * k);
}
function comPintura(tinta, marca, f) { TINTA = tinta; MARCA = marca; try { return f(); } finally { TINTA = null; MARCA = null; } }

function insignia(c, x, y, z, r, plano, baixaVis = false) {
  if (MARCA) {
    // estrela vermelha com borda (Rússia: borda branca e vermelha; China: "八一" amarelo no meio)
    const rot0 = plano === '+x' ? [0, Math.PI / 2, 0] : plano === '-x' ? [0, -Math.PI / 2, 0] : [-Math.PI / 2, 0, 0];
    const N0 = plano === '+x' ? [1, 0, 0] : plano === '-x' ? [-1, 0, 0] : [0, 1, 0];
    const est = (rr, cor, k) => {
      const st = new THREE.Shape();
      for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? rr * 0.4 : rr; if (i === 0) st.moveTo(Math.cos(a) * q, Math.sin(a) * q); else st.lineTo(Math.cos(a) * q, Math.sin(a) * q); }
      st.closePath();
      c.add(new THREE.ShapeGeometry(st), cor, x + N0[0] * k, y + N0[1] * k, z + N0[2] * k, rot0[0], rot0[1], rot0[2]);
    };
    est(r * 1.25, 0xf2f2f2, 0.012);
    est(r * 1.05, 0xc0221a, 0.02);
    if (MARCA === 'china') c.add(new THREE.CircleGeometry(r * 0.28, 12), 0xf2d34a, x + N0[0] * 0.028, y + N0[1] * 0.028, z + N0[2] * 0.028, rot0[0], rot0[1], rot0[2]);
    return;
  }
  const azul = baixaVis ? 0x5d6369 : 0x1c2f6b, branco = baixaVis ? 0x868c92 : 0xf2f2f2, verm = baixaVis ? 0x5d6369 : 0xb22234;
  const rot = plano === '+x' ? [0, Math.PI / 2, 0] : plano === '-x' ? [0, -Math.PI / 2, 0] : [-Math.PI / 2, 0, 0];
  const N = plano === '+x' ? [1, 0, 0] : plano === '-x' ? [-1, 0, 0] : [0, 1, 0];
  const off = (k) => [x + N[0] * k, y + N[1] * k, z + N[2] * k];
  const add = (g, cor, k) => { const p = off(k); c.add(g, cor, p[0], p[1], p[2], rot[0], rot[1], rot[2]); };
  // barras laterais
  const barras = new THREE.Shape();
  barras.moveTo(-r * 2, -r * 0.42); barras.lineTo(r * 2, -r * 0.42); barras.lineTo(r * 2, r * 0.42); barras.lineTo(-r * 2, r * 0.42); barras.closePath();
  add(new THREE.ShapeGeometry(barras), azul, 0.012);
  const bb = new THREE.Shape();
  bb.moveTo(-r * 1.85, -r * 0.3); bb.lineTo(r * 1.85, -r * 0.3); bb.lineTo(r * 1.85, r * 0.3); bb.lineTo(-r * 1.85, r * 0.3); bb.closePath();
  add(new THREE.ShapeGeometry(bb), branco, 0.016);
  const vv = new THREE.Shape();
  vv.moveTo(-r * 1.85, -r * 0.08); vv.lineTo(r * 1.85, -r * 0.08); vv.lineTo(r * 1.85, r * 0.08); vv.lineTo(-r * 1.85, r * 0.08); vv.closePath();
  add(new THREE.ShapeGeometry(vv), verm, 0.02);
  add(new THREE.CircleGeometry(r, 20), azul, 0.024);
  const st = new THREE.Shape();
  for (let i = 0; i < 10; i++) {
    const a = Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.38 : r * 0.95;
    const px = Math.cos(a) * rr, py = Math.sin(a) * rr;
    if (i === 0) st.moveTo(px, py); else st.lineTo(px, py);
  }
  st.closePath();
  add(new THREE.ShapeGeometry(st), branco, 0.03);
}
// cruz vermelha (ambulância)
function cruz(c, x, y, z, r, plano) {
  const rot = plano === '+x' ? [0, Math.PI / 2, 0] : plano === '-x' ? [0, -Math.PI / 2, 0] : plano === '-z' ? [0, Math.PI, 0] : plano === '+z' ? [0, 0, 0] : [-Math.PI / 2, 0, 0];
  const N = plano === '+x' ? [1, 0, 0] : plano === '-x' ? [-1, 0, 0] : plano === '-z' ? [0, 0, -1] : plano === '+z' ? [0, 0, 1] : [0, 1, 0];
  const q = new THREE.Shape();
  q.moveTo(-r, -r); q.lineTo(r, -r); q.lineTo(r, r); q.lineTo(-r, r); q.closePath();
  c.add(new THREE.ShapeGeometry(q), 0xf4f4f0, x + N[0] * 0.012, y + N[1] * 0.012, z + N[2] * 0.012, rot[0], rot[1], rot[2]);
  const k = r * 0.3, l = r * 0.8;
  const cr = new THREE.Shape();
  cr.moveTo(-k, -l); cr.lineTo(k, -l); cr.lineTo(k, -k); cr.lineTo(l, -k); cr.lineTo(l, k); cr.lineTo(k, k); cr.lineTo(k, l); cr.lineTo(-k, l); cr.lineTo(-k, k); cr.lineTo(-l, k); cr.lineTo(-l, -k); cr.lineTo(-k, -k); cr.closePath();
  c.add(new THREE.ShapeGeometry(cr), 0xc81e1e, x + N[0] * 0.02, y + N[1] * 0.02, z + N[2] * 0.02, rot[0], rot[1], rot[2]);
}
// guarda-corpo (balaustrada) entre dois pontos na altura y
function guarda(c, x0, z0, x1, z1, y, cor = 0x8a9095, h = 1.0) {
  const L = Math.hypot(x1 - x0, z1 - z0), a = Math.atan2(x1 - x0, z1 - z0);
  const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2;
  c.box(0.05, 0.05, L, cor, mx, y + h, mz, 0, a, 0);
  c.box(0.04, 0.04, L, cor, mx, y + h * 0.5, mz, 0, a, 0);
  const n = Math.max(1, Math.round(L / 2));
  for (let i = 0; i <= n; i++) { const t = i / n; c.cil(0.025, 0.025, h, 4, cor, x0 + (x1 - x0) * t, y + h / 2, z0 + (z1 - z0) * t); }
}
// geometria de outro modelo (com cores) posicionada dentro deste
function juntaModelo(c, geo, x, y, z, ry = 0, esc = 1) {
  const g = geo.clone();
  g.applyMatrix4(new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(0, ry, 0)), new THREE.Vector3(esc, esc, esc)));
  c.g.push(g);
}

// estrela do Exército (sem círculo), pintada em preto fosco
function estrela(c, x, y, z, r, plano, cor = 0x23241f) {
  const rot = plano === '+x' ? [0, Math.PI / 2, 0] : plano === '-x' ? [0, -Math.PI / 2, 0] : plano === '+z' ? [0, 0, 0] : plano === '-z' ? [0, Math.PI, 0] : [-Math.PI / 2, 0, 0];
  const N = plano === '+x' ? [1, 0, 0] : plano === '-x' ? [-1, 0, 0] : plano === '+z' ? [0, 0, 1] : plano === '-z' ? [0, 0, -1] : [0, 1, 0];
  const st = new THREE.Shape();
  for (let i = 0; i < 10; i++) { const a = Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.4 : r; if (i === 0) st.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); else st.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  st.closePath();
  c.add(new THREE.ShapeGeometry(st), cor, x + N[0] * 0.015, y + N[1] * 0.015, z + N[2] * 0.015, rot[0], rot[1], rot[2]);
}
// fileira de parafusos ao longo de Z numa face lateral
function parafusos(c, x, y, z0, z1, n, lado) {
  for (let i = 0; i < n; i++) c.cil(0.035, 0.035, 0.04, 6, 0x6a6352, x + lado * 0.02, y, z0 + (z1 - z0) * i / Math.max(1, n - 1), 0, 0, Math.PI / 2);
}
// galão de combustível (jerry can)
function galao(c, x, y, z, ry = 0, cor = 0x4d5236) {
  c.bloco(0.17, 0.46, 0.34, cor, x, y + 0.23, z, 0, ry, 0, 0.03);
  c.box(0.06, 0.06, 0.12, cor, x, y + 0.5, z + 0.08);
}
// cabo de reboque enrolado sobre o casco (dois trechos com olhais)
function caboReboque(c, x, y, z0, z1) {
  const L = Math.abs(z1 - z0), zm = (z0 + z1) / 2;
  c.cil(0.035, 0.035, L, 6, 0x2a2826, x, y, zm, Math.PI / 2);
  c.cil(0.035, 0.035, L * 0.96, 6, 0x2a2826, x + 0.09, y, zm, Math.PI / 2);
  for (const z of [z0, z1]) c.add(new THREE.TorusGeometry(0.1, 0.03, 6, 10), 0x2a2826, x + 0.045, y, z, Math.PI / 2, 0, 0);
}
// detalhes comuns dos blindados: estrela nas laterais, número no para-choque, ganchos e luzes de comboio
function detalhesBlindado(c, { frente, tras, larg, yLat, yPara, num }) {
  for (const sx of [-1, 1]) {
    estrela(c, sx * larg / 2, yLat, -0.4, 0.28, sx > 0 ? '+x' : '-x');
    c.add(new THREE.TorusGeometry(0.11, 0.035, 6, 10), 0x3b3a34, sx * (larg / 2 - 0.25), yPara - 0.12, frente + 0.06, 0, 0, Math.PI / 2);   // gancho
    c.box(0.18, 0.08, 0.04, 0x3a5a2a, sx * (larg / 2 - 0.2), yPara + 0.22, tras - 0.03);   // luz de comboio (blackout)
  }
  numero(c, num, 0, yPara, frente + 0.02, 0.12, '+z', 0x1e1e1a);
  numero(c, num, 0, yPara, tras - 0.02, 0.12, '-z', 0x1e1e1a);
}

const VEIC = {
  humvee() {
    const c = new Mont(), v = new Mont();
    const C = AREIA, C2 = AREIA2;
    c.box(1.9, 0.45, 4.4, C2, 0, 0.72, 0);
    // carroceria larga e baixa com capô inclinado (cantos arredondados)
    c.add(loftZ([
      { z: -2.35, w: 2.14, hT: 0.36, hB: 0.32, y: 1.12, n: 7 },
      { z: 0.7, w: 2.18, hT: 0.38, hB: 0.34, y: 1.12, n: 7 },
      { z: 1.5, w: 2.16, hT: 0.27, hB: 0.34, y: 1.1, n: 6 },
      { z: 2.25, w: 2.12, hT: 0.16, hB: 0.32, y: 1.06, n: 6 },
      { z: 2.38, w: 1.9, hT: 0.1, hB: 0.26, y: 1.04, n: 5 },
    ], 22), C);
    // para-lamas
    for (const sx of [-1, 1]) for (const z of [-1.5, 1.55]) c.add(loftZ([{ z: z - 0.68, w: 0.48, hT: 0.06, hB: 0.06, y: 1.42, x: sx * 0.92, n: 4 }, { z: z - 0.55, w: 0.48, hT: 0.1, hB: 0.06, y: 1.48, x: sx * 0.92, n: 4 }, { z: z + 0.55, w: 0.48, hT: 0.1, hB: 0.06, y: 1.48, x: sx * 0.92, n: 4 }, { z: z + 0.68, w: 0.48, hT: 0.06, hB: 0.06, y: 1.42, x: sx * 0.92, n: 4 }], 12), C);
    // cabine blindada com janelas pequenas
    c.add(loftZ([
      { z: -1.5, w: 2.06, hT: 0.44, hB: 0.05, y: 1.52, n: 7 },
      { z: 0.35, w: 2.06, hT: 0.44, hB: 0.05, y: 1.52, n: 7 },
      { z: 0.75, w: 2.0, hT: 0.2, hB: 0.05, y: 1.52, n: 6 },
    ], 20), C);
    v.box(1.75, 0.34, 0.05, VIDRO, 0, 1.8, 0.58, -0.75);
    for (const sx of [-1, 1]) { v.box(0.04, 0.3, 0.75, VIDRO, sx * 1.035, 1.78, 0.0); v.box(0.04, 0.3, 0.75, VIDRO, sx * 1.035, 1.78, -0.95); }
    for (const sx of [-1, 1]) for (const z of [0.0, -0.95]) c.box(0.03, 0.66, 0.98, C2, sx * 1.1, 1.18, z);
    c.box(1.3, 0.36, 0.05, 0x2a2a26, 0, 1.0, 2.37);
    for (let i = 0; i < 6; i++) c.box(0.04, 0.32, 0.06, C, -0.5 + i * 0.2, 1.0, 2.38);
    faroisFrente(c, 0.72, 1.12, 2.36);
    c.bloco(2.2, 0.18, 0.22, METAL, 0, 0.62, 2.42, 0, 0, 0, 0.06);
    c.box(0.6, 0.22, 0.3, 0x3a3a34, 0, 0.62, 2.58);
    lanternas(c, 0.85, 1.3, -2.36);
    for (const sx of [-1, 1]) { c.box(0.04, 0.24, 0.18, METAL, sx * 1.25, 1.75, 0.65); c.box(0.18, 0.04, 0.04, METAL, sx * 1.15, 1.75, 0.65); }
    antena(c, 0.9, 1.5, -2.1); antena(c, -0.9, 1.5, -2.1, 2.0);
    c.bloco(1.8, 0.35, 0.7, 0x4b4a3a, 0, 1.68, -1.95, 0, 0, 0, 0.1);
    c.roda(0.38, 0.22, PNEU, 0, 1.62, -2.42);
    rodas(c, [-0.95, 0.95], [-1.5, 1.55], 0.47, 0.4);
    detalhesBlindado(c, { frente: 2.5, tras: -2.37, larg: 2.2, yLat: 1.2, yPara: 0.78, num: '18' });
    for (const sx of [-1, 1]) galao(c, sx * 0.75, 1.48, -2.15);
    const t = new Mont();
    t.cil(0.6, 0.62, 0.18, 16, C2, 0, 0, 0);
    t.bloco(1.3, 0.62, 0.07, C, 0, 0.42, 0.45, -0.12, 0, 0, 0.05);
    for (const sx of [-1, 1]) t.bloco(0.07, 0.55, 0.65, C, sx * 0.66, 0.38, 0.15, 0, sx * 0.35, 0, 0.03);
    t.box(0.5, 0.26, 0.1, VIDRO, 0, 0.62, 0.47, -0.12);
    t.bloco(0.18, 0.2, 0.75, METAL, 0, 0.35, 0.25, 0, 0, 0, 0.04);
    t.cil(0.035, 0.035, 1.25, 8, METAL, 0, 0.38, 1.2, Math.PI / 2);
    t.cil(0.06, 0.06, 0.12, 8, METAL, 0, 0.38, 1.82, Math.PI / 2);
    t.bloco(0.22, 0.2, 0.3, 0x4b4a3a, 0.25, 0.28, 0.1, 0, 0, 0, 0.04);
    return { corpo: c.build(), vidro: v.build(false), torre: t.build(), torreY: 2.08, torreZ: -0.45, canoZ: 1.85, canoY: 0.38 };
  },
  ambulancia() {
    // M997: frente de Humvee com baú de paciente (cantos arredondados), cruzes vermelhas e giroflex
    const c = new Mont(), v = new Mont();
    const C = AREIA, C2 = AREIA2, BAU = 0xe2dccb;
    c.box(1.9, 0.45, 4.8, C2, 0, 0.72, 0);
    c.add(loftZ([
      { z: 0.55, w: 2.16, hT: 0.36, hB: 0.32, y: 1.12, n: 7 },
      { z: 1.65, w: 2.16, hT: 0.27, hB: 0.34, y: 1.1, n: 6 },
      { z: 2.4, w: 2.12, hT: 0.16, hB: 0.32, y: 1.06, n: 6 },
      { z: 2.52, w: 1.9, hT: 0.1, hB: 0.26, y: 1.04, n: 5 },
    ], 20), C);
    for (const sx of [-1, 1]) for (const z of [-1.6, 1.65]) c.add(loftZ([{ z: z - 0.66, w: 0.48, hT: 0.06, hB: 0.06, y: 1.42, x: sx * 0.92, n: 4 }, { z: z - 0.52, w: 0.48, hT: 0.1, hB: 0.06, y: 1.48, x: sx * 0.92, n: 4 }, { z: z + 0.52, w: 0.48, hT: 0.1, hB: 0.06, y: 1.48, x: sx * 0.92, n: 4 }, { z: z + 0.66, w: 0.48, hT: 0.06, hB: 0.06, y: 1.42, x: sx * 0.92, n: 4 }], 12), C);
    // cabine
    c.add(loftZ([{ z: -0.2, w: 2.06, hT: 0.44, hB: 0.05, y: 1.52, n: 7 }, { z: 0.6, w: 2.06, hT: 0.44, hB: 0.05, y: 1.52, n: 7 }, { z: 0.95, w: 2.0, hT: 0.2, hB: 0.05, y: 1.52, n: 6 }], 18), C);
    v.box(1.75, 0.34, 0.05, VIDRO, 0, 1.8, 0.8, -0.75);
    for (const sx of [-1, 1]) v.box(0.04, 0.3, 0.6, VIDRO, sx * 1.035, 1.78, 0.25);
    // baú do paciente
    c.add(loftZ([
      { z: -2.62, w: 2.22, hT: 0.95, hB: 0.95, y: 1.95, n: 9 },
      { z: -0.25, w: 2.22, hT: 0.95, hB: 0.95, y: 1.95, n: 9 },
    ], 24), BAU);
    c.box(2.24, 0.08, 2.4, 0x8a8576, 0, 2.92, -1.42);
    for (const sx of [-1, 1]) { cruz(c, sx * 1.11, 2.15, -1.6, 0.42, sx > 0 ? '+x' : '-x'); v.box(0.04, 0.35, 0.5, VIDRO, sx * 1.12, 2.3, -0.65); }
    cruz(c, 0, 2.95, -1.42, 0.5, '+y');
    cruz(c, 0, 2.15, -2.63, 0.32, '-z');
    c.box(0.05, 1.5, 0.04, 0x8a8576, 0, 1.85, -2.64);                      // divisão das portas traseiras
    for (const sx of [-1, 1]) c.box(0.12, 0.04, 0.04, METAL, sx * 0.15, 1.9, -2.66);
    c.box(1.2, 0.12, 0.35, METAL, 0, 0.75, -2.6);                          // degrau
    // giroflex e luzes
    c.bloco(1.4, 0.14, 0.28, 0x222222, 0, 1.98, 0.35, 0, 0, 0, 0.05);
    c.box(0.55, 0.14, 0.26, 0xff2a2a, -0.36, 2.05, 0.35); c.box(0.55, 0.14, 0.26, 0x3070ff, 0.36, 2.05, 0.35);
    for (const sx of [-1, 1]) for (const z of [-0.3, -2.55]) c.box(0.18, 0.18, 0.06, 0xff3030, sx * 1.0, 2.82, z);
    c.box(1.3, 0.36, 0.05, 0x2a2a26, 0, 1.0, 2.51);
    faroisFrente(c, 0.72, 1.12, 2.5); lanternas(c, 0.85, 1.1, -2.64);
    c.bloco(2.2, 0.18, 0.22, METAL, 0, 0.62, 2.56, 0, 0, 0, 0.06);
    antena(c, 0.9, 2.9, -2.3, 1.2);
    rodas(c, [-0.95, 0.95], [-1.6, 1.65], 0.47, 0.4);
    return { corpo: c.build(), vidro: v.build(false) };
  },
  stryker() {
    const c = new Mont();
    const C = VERDE, C2 = VERDE2;
    // casco em cunha com laterais inclinadas
    // casco em "V" com laterais inclinadas e frente em cunha
    c.add(loftZ([
      { z: -3.5, w: 2.6, hT: 0.9, hB: 0.85, y: 1.65, nT: 7, nB: 2.6 },
      { z: 2.0, w: 2.7, hT: 0.9, hB: 0.88, y: 1.65, nT: 7, nB: 2.6 },
      { z: 3.0, w: 2.6, hT: 0.35, hB: 0.85, y: 1.55, nT: 6, nB: 2.4 },
      { z: 3.55, w: 2.3, hT: 0.08, hB: 0.5, y: 1.25, n: 4 },
    ], 24), C);
    c.box(1.2, 0.4, 0.8, C2, -0.55, 2.8, 1.7);
    c.box(0.5, 0.25, 0.05, VIDRO, -0.55, 2.85, 2.11);
    c.box(1.6, 1.4, 0.1, C2, 0, 1.8, -3.55);
    for (let i = 0; i < 4; i++) c.box(0.1, 0.08, 0.5, METAL, 0.9, 2.66, -1.5 - i * 0.6);
    faroisFrente(c, 0.95, 1.45, 3.12); lanternas(c, 0.95, 1.6, -3.56);
    antena(c, 1.0, 2.6, -3.0, 3); antena(c, -1.0, 2.6, -3.0, 2.4);
    // mochilas e caixas penduradas nas laterais
    for (const s of [-1, 1]) for (let i = 0; i < 3; i++) c.box(0.3, 0.45, 0.8, 0x4a4a36, s * 1.5, 2.1, -2.4 + i * 1.1);
    rodas(c, [-1.25, 1.25], [-2.55, -1.15, 0.85, 2.25], 0.56, 0.48);
    for (const sx of [-1, 1]) caboReboque(c, sx * 0.9, 2.58, -3.2, -1.2);
    c.bloco(1.5, 1.3, 0.08, C2, 0, 1.75, -3.55, 0, 0, 0, 0.03);                 // rampa traseira
    detalhesBlindado(c, { frente: 3.55, tras: -3.52, larg: 2.72, yLat: 1.9, yPara: 1.25, num: '412' });
    // estação de armas remota (RWS)
    const t = new Mont();
    t.cil(0.45, 0.5, 0.25, 12, C2, 0, 0, 0);
    t.box(0.7, 0.55, 0.8, C, 0, 0.42, 0);
    t.box(0.35, 0.35, 0.35, VIDRO, 0.42, 0.55, 0.2);
    t.box(0.2, 0.2, 0.8, METAL, -0.15, 0.48, 0.5);
    t.cil(0.035, 0.035, 1.3, 6, METAL, -0.15, 0.48, 1.4, Math.PI / 2);
    t.box(0.25, 0.3, 0.4, 0x4b4a3a, 0.45, 0.25, -0.3);
    return { corpo: c.build(), torre: t.build(), torreY: 2.62, torreZ: 0.4, canoZ: 2.05, canoY: 0.48 };
  },
  bradley() {
    const c = new Mont();
    const C = AREIA, C2 = AREIA2;
    c.add(loftZ([
      { z: -3.3, w: 2.9, hT: 0.9, hB: 0.85, y: 1.45, n: 7 },
      { z: 1.4, w: 3.0, hT: 0.9, hB: 0.85, y: 1.45, n: 7 },
      { z: 2.7, w: 2.95, hT: 0.25, hB: 0.8, y: 1.4, n: 6 },
      { z: 3.35, w: 2.8, hT: 0.05, hB: 0.5, y: 1.15, n: 5 },
    ], 24), C);
    lagartas(c, 6.4, 1.2, 1.55, 0.6, true, C2);
    c.box(3.6, 0.1, 6.6, C2, 0, 1.42, 0);
    // blindagem reativa nas laterais
    for (const s of [-1, 1]) for (let i = 0; i < 5; i++) c.box(0.14, 0.5, 1.1, C, s * 1.98, 1.15, -2.4 + i * 1.2);
    c.box(1.2, 1.5, 0.1, C2, 0.6, 1.5, -3.35);
    faroisFrente(c, 1.2, 1.4, 3.3); lanternas(c, 1.3, 1.6, -3.32);
    antena(c, -1.3, 2.35, -2.8, 2.8);
    for (const sx of [-1, 1]) { parafusos(c, sx * 2.06, 1.4, -2.4, 2.4, 10, sx); caboReboque(c, sx * 1.2, 2.42, -3.0, -0.6); galao(c, sx * 1.25, 2.4, -3.05); }
    c.bloco(1.1, 1.4, 0.08, C2, 0.6, 1.45, -3.33, 0, 0, 0, 0.03);                 // rampa traseira
    for (let i = 0; i < 4; i++) c.box(0.12, 0.05, 0.05, METAL, 0.6, 1.0 + i * 0.3, -3.39);
    detalhesBlindado(c, { frente: 3.35, tras: -3.3, larg: 3.05, yLat: 1.6, yPara: 1.0, num: '231' });
    const t = new Mont();
    t.add(loftZ([
      { z: -1.25, w: 2.0, hT: 0.42, hB: 0.42, y: 0.43, n: 6 },
      { z: 0.6, w: 2.1, hT: 0.44, hB: 0.42, y: 0.43, n: 6 },
      { z: 1.3, w: 1.2, hT: 0.32, hB: 0.4, y: 0.42, n: 5 },
    ], 20), C);
    t.box(1.9, 0.14, 2.2, C2, 0, 0.92, -0.2);
    t.box(0.5, 0.45, 0.6, C2, -0.45, 0.6, 1.2);
    t.cil(0.09, 0.09, 2.3, 8, METAL, -0.45, 0.6, 2.6, Math.PI / 2);
    t.cil(0.12, 0.12, 0.3, 8, METAL, -0.45, 0.6, 3.7, Math.PI / 2);
    t.box(0.55, 0.55, 1.4, C2, 1.35, 0.55, -0.1);                         // lançador TOW
    t.box(0.42, 0.2, 0.06, PRETO, 1.35, 0.68, 0.61); t.box(0.42, 0.2, 0.06, PRETO, 1.35, 0.4, 0.61);
    t.box(0.35, 0.3, 0.3, VIDRO, 0.5, 1.05, 0.3);
    for (const s of [-1, 1]) for (let i = 0; i < 4; i++) t.cil(0.06, 0.06, 0.25, 6, METAL, s * 0.95, 0.65 + (i % 2) * 0.14, 0.75 + Math.floor(i / 2) * 0.15, Math.PI / 2.6);
    return { corpo: c.build(), torre: t.build(), torreY: 2.36, torreZ: 0.1, canoZ: 3.8, canoY: 0.6 };
  },
  abrams() {
    // modelo 3D do CGTrader convertido do .blend (ver abrams.js)
    return abramsModelo();
  },
  paladin() {
    // M109A7 Paladin: casco baixo com lagartas, torre grande e alta, canhão longo com freio de boca
    const c = new Mont();
    const C = AREIA, C2 = AREIA2;
    c.add(loftZ([
      { z: -3.45, w: 2.9, hT: 0.5, hB: 0.55, y: 1.15, n: 7 },
      { z: 2.5, w: 2.95, hT: 0.5, hB: 0.55, y: 1.15, n: 7 },
      { z: 3.3, w: 2.9, hT: 0.12, hB: 0.5, y: 1.1, n: 6 },
      { z: 3.6, w: 2.7, hT: 0.04, hB: 0.25, y: 0.9, n: 5 },
    ], 22), C);
    lagartas(c, 6.9, 1.2, 1.6, 0.62, true, C2);
    faroisFrente(c, 1.2, 1.4, 3.3); lanternas(c, 1.4, 1.45, -3.47);
    c.bloco(1.6, 0.5, 0.3, C2, 0, 1.05, -3.55, 0, 0, 0, 0.08);
    // trava de transporte do canhão na frente
    for (const sx of [-1, 1]) c.box(0.1, 0.9, 0.1, METAL, sx * 0.25, 1.95, 3.1, 0.35);
    c.bloco(0.7, 0.18, 0.25, METAL, 0, 2.35, 3.25, 0, 0, 0, 0.05);
    detalhesBlindado(c, { frente: 3.6, tras: -3.5, larg: 3.0, yLat: 1.25, yPara: 1.0, num: '155' });
    for (const sx of [-1, 1]) parafusos(c, sx * 2.06, 1.35, -3.0, 2.8, 12, sx);
    const t = new Mont();
    t.add(loftZ([
      { z: -3.2, w: 3.0, hT: 0.85, hB: 0.85, y: 0.85, n: 8 },
      { z: 0.4, w: 3.15, hT: 0.88, hB: 0.85, y: 0.85, n: 8 },
      { z: 1.5, w: 2.9, hT: 0.6, hB: 0.85, y: 0.85, n: 7 },
      { z: 1.85, w: 2.2, hT: 0.35, hB: 0.75, y: 0.8, n: 6 },
    ], 22), C);
    // cesto e caixas nas laterais, escotilhas, metralhadora
    for (const sx of [-1, 1]) {
      t.bloco(0.35, 0.55, 2.6, C2, sx * 1.7, 1.05, -1.2, 0, 0, 0, 0.08);
      for (let i = 0; i < 3; i++) t.bloco(0.32, 0.4, 0.7, 0x5f5a45, sx * 1.75, 1.6, -2.2 + i * 0.85, 0, 0, 0, 0.1);
    }
    t.box(3.0, 0.08, 0.8, METAL, 0, 0.55, -3.6);
    t.cil(0.42, 0.45, 0.22, 12, C2, 0.85, 1.8, -1.6);
    t.bloco(0.15, 0.18, 0.85, METAL, 0.85, 2.0, -1.1, 0, 0, 0, 0.03);
    t.cil(0.03, 0.03, 1.0, 6, METAL, 0.85, 2.0, -0.3, Math.PI / 2);
    t.cil(0.32, 0.36, 0.18, 12, C2, -0.8, 1.76, -0.9);
    // canhão de 155mm: luva, tubo, extrator de fumos e freio de boca
    t.cil(0.32, 0.32, 1.0, 14, C2, 0, 0.95, 2.3, Math.PI / 2);
    t.cil(0.15, 0.18, 6.6, 14, C, 0, 0.95, 5.4, Math.PI / 2);
    t.cil(0.24, 0.24, 0.9, 14, C2, 0, 0.95, 4.4, Math.PI / 2);
    t.bloco(0.62, 0.4, 0.75, 0x6a6450, 0, 0.95, 8.75, 0, 0, 0, 0.08);
    for (const sx of [-1, 1]) t.box(0.06, 0.26, 0.5, 0x2a2a2a, sx * 0.315, 0.95, 8.75);
    antena(t, -1.2, 1.7, -2.6, 2.6); antena(t, 1.2, 1.7, -2.6, 2.0);
    return { corpo: c.build(), torre: t.build(), torreY: 1.75, torreZ: -0.2, canoZ: 9.1, canoY: 0.95 };
  },
  bearcat() {
    // Lenco BearCat da SWAT: picape blindada preta, capô longo, teto com escotilha, para-choque com aríete
    const c = new Mont(), v = new Mont();
    const C = 0x1c1f23, C2 = 0x2a2e33;
    c.box(1.95, 0.5, 5.6, C2, 0, 0.75, 0);
    c.add(loftZ([
      { z: -2.85, w: 2.36, hT: 1.05, hB: 0.75, y: 1.75, n: 8 },
      { z: 0.85, w: 2.36, hT: 1.05, hB: 0.75, y: 1.75, n: 8 },
      { z: 1.35, w: 2.34, hT: 0.55, hB: 0.75, y: 1.65, nT: 6, nB: 8 },
      { z: 2.6, w: 2.3, hT: 0.38, hB: 0.7, y: 1.55, n: 6 },
      { z: 2.9, w: 2.1, hT: 0.25, hB: 0.6, y: 1.5, n: 5 },
    ], 24), C);
    // faixas da polícia
    for (const sx of [-1, 1]) {
      c.box(0.02, 0.26, 4.6, 0xf0f0f0, sx * 1.19, 1.7, -0.3);
      c.box(0.02, 0.1, 4.6, 0x2a55a8, sx * 1.195, 1.52, -0.3);
      // janelinhas blindadas e seteiras
      v.box(0.04, 0.42, 0.62, VIDRO, sx * 1.19, 2.3, 0.45);
      v.box(0.04, 0.36, 0.4, VIDRO, sx * 1.19, 2.3, -0.7);
      v.box(0.04, 0.36, 0.4, VIDRO, sx * 1.19, 2.3, -1.8);
      for (const z of [-0.7, -1.8]) c.cil(0.05, 0.05, 0.05, 8, 0x0e0e0e, sx * 1.2, 2.0, z, 0, 0, Math.PI / 2);
      c.bloco(0.3, 0.08, 1.6, METAL, sx * 1.25, 0.95, 0.0, 0, 0, 0, 0.03);       // degrau lateral
      c.box(0.05, 0.25, 0.18, METAL, sx * 1.27, 2.3, 1.05);                      // espelho
    }
    v.box(2.0, 0.55, 0.05, VIDRO, 0, 2.38, 1.08, -0.6);
    // teto: escotilha giratória, giroflex, holofotes
    c.cil(0.48, 0.52, 0.3, 14, C2, 0, 2.95, -1.1);
    c.bloco(0.8, 0.45, 0.12, C2, 0, 3.2, -0.7, 0, 0, 0, 0.04);
    c.bloco(1.5, 0.14, 0.3, 0x111111, 0, 2.86, 0.6, 0, 0, 0, 0.05);
    c.box(0.62, 0.15, 0.28, 0xff2020, -0.38, 2.94, 0.6); c.box(0.62, 0.15, 0.28, 0x2050ff, 0.38, 2.94, 0.6);
    for (const sx of [-1, 1]) c.cil(0.1, 0.1, 0.12, 10, 0xfff3c4, sx * 0.9, 2.86, 0.95, Math.PI / 2);
    // grade, aríete e guincho
    c.box(1.4, 0.4, 0.05, 0x0c0c0c, 0, 1.4, 2.91);
    for (let i = 0; i < 7; i++) c.box(0.04, 0.36, 0.06, C2, -0.6 + i * 0.2, 1.4, 2.92);
    faroisFrente(c, 0.85, 1.45, 2.88); lanternas(c, 0.95, 1.4, -2.88);
    c.bloco(2.5, 0.3, 0.3, METAL, 0, 0.82, 3.0, 0, 0, 0, 0.06);
    for (const sx of [-1, 1]) c.box(0.1, 0.8, 0.1, METAL, sx * 0.9, 1.15, 3.05);
    c.box(0.6, 0.3, 0.25, 0x333333, 0, 0.82, 3.25);
    c.box(1.9, 1.6, 0.06, C2, 0, 1.8, -2.89);
    antena(c, 0.9, 2.8, -2.4, 2.4);
    rodas(c, [-1.05, 1.05], [-1.8, 1.9], 0.55, 0.45);
    return { corpo: c.build(), vidro: v.build(false) };
  },
  himars() {
    // M142 HIMARS: caminhão 6x6 com cabine blindada e lançador de 6 foguetes que gira
    const c = new Mont(), v = new Mont();
    const C = AREIA, C2 = AREIA2;
    c.box(1.9, 0.45, 7.0, C2, 0, 0.95, 0);
    c.box(2.4, 0.15, 4.6, C2, 0, 1.25, -1.1);
    // cabine blindada com para-brisa inclinado
    c.add(loftZ([
      { z: 1.55, w: 2.45, hT: 1.0, hB: 0.95, y: 2.05, n: 8 },
      { z: 2.65, w: 2.45, hT: 1.0, hB: 0.95, y: 2.05, n: 8 },
      { z: 3.25, w: 2.42, hT: 0.45, hB: 0.95, y: 2.0, nT: 6, nB: 8 },
      { z: 3.5, w: 2.3, hT: 0.1, hB: 0.85, y: 1.85, n: 6 },
    ], 22), C);
    v.box(2.15, 0.62, 0.05, VIDRO, 0, 2.6, 3.0, -0.72);
    for (const sx of [-1, 1]) { v.box(0.04, 0.5, 0.75, VIDRO, sx * 1.23, 2.55, 2.25); c.bloco(0.5, 0.6, 1.2, 0x5f5a45, sx * 1.0, 1.6, 0.9, 0, 0, 0, 0.1); }
    c.bloco(2.5, 0.2, 0.25, METAL, 0, 1.0, 3.6, 0, 0, 0, 0.06);
    faroisFrente(c, 0.95, 1.35, 3.52); lanternas(c, 1.0, 1.1, -3.5);
    antena(c, 1.1, 3.05, 1.8, 2.2); antena(c, -1.1, 3.05, 1.8, 1.6);
    // estabilizadores traseiros (macacos)
    for (const sx of [-1, 1]) { c.box(0.18, 0.7, 0.18, METAL, sx * 1.05, 0.65, -3.3); c.cil(0.2, 0.2, 0.06, 10, METAL, sx * 1.05, 0.3, -3.3); }
    c.bloco(2.2, 0.35, 0.6, C2, 0, 1.6, -3.2, 0, 0, 0, 0.08);
    for (const sx of [-1, 1]) c.box(0.08, 0.5, 4.8, C2, sx * 1.2, 1.15, -1.1);     // para-lamas laterais
    rodas(c, [-1.05, 1.05], [-2.65, -1.3, 2.5], 0.56, 0.48);
    detalhesBlindado(c, { frente: 3.65, tras: -3.52, larg: 2.45, yLat: 2.1, yPara: 1.0, num: '304' });
    // lançador: base giratória e caixote do módulo de 6 foguetes
    const t = new Mont();
    t.cil(1.0, 1.05, 0.25, 16, C2, 0, 0.12, 0.6);
    t.bloco(0.8, 0.35, 3.6, METAL, 0, 0.3, 0, 0, 0, 0, 0.06);
    t.add(loftZ([{ z: -2.05, w: 2.3, hT: 0.55, hB: 0.55, y: 0.9, n: 9 }, { z: 2.05, w: 2.3, hT: 0.55, hB: 0.55, y: 0.9, n: 9 }], 22), C);
    t.box(2.32, 0.1, 4.1, C2, 0, 1.47, 0);
    t.box(2.1, 0.95, 0.05, 0x1a1a1a, 0, 0.9, 2.08);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) {
      t.cil(0.25, 0.25, 0.08, 14, 0x8a8470, -0.68 + i * 0.68, 0.66 + j * 0.48, 2.1, Math.PI / 2);
      t.cil(0.12, 0.12, 0.09, 10, 0x3a3830, -0.68 + i * 0.68, 0.66 + j * 0.48, 2.12, Math.PI / 2);
    }
    for (const sx of [-1, 1]) t.box(0.05, 0.9, 3.4, C2, sx * 1.17, 0.9, 0);
    return { corpo: c.build(), vidro: v.build(false), torre: t.build(), torreY: 1.35, torreZ: -1.5, canoZ: 2.1, canoY: 0.9 };
  },
};
// ---------------- aeronaves ----------------
function rotor(pas, r, cor = 0x2a2a2a, larg = 0.55) {
  const m = new Mont();
  for (let i = 0; i < pas; i++) {
    const a = (i * Math.PI * 2) / pas;
    const pa = asa({ p: [0.55, 0, larg / 2], corda: larg, esp: 0.12 }, { p: [r * 0.97, 0, larg / 2], corda: larg * 0.92, esp: 0.1 });
    m.add(pa, cor, 0, 0, 0, 0, a, 0);
    m.box(0.36, 0.06, larg * 0.95, 0xd8c040, Math.cos(a) * r * 0.93, 0, -Math.sin(a) * r * 0.93, 0, a, 0);     // ponta pintada
    m.box(0.7, 0.12, 0.18, METAL, Math.cos(a) * 0.45, 0, -Math.sin(a) * 0.45, 0, a, 0);                       // braço do cubo
    m.cil(0.025, 0.025, 0.45, 4, METAL, Math.cos(a) * 0.35, -0.25, -Math.sin(a) * 0.35);                    // haste de comando
  }
  m.cil(0.3, 0.36, 0.3, 12, METAL, 0, -0.05, 0);
  m.cil(0.42, 0.42, 0.08, 14, 0x3a3d40, 0, -0.42, 0);                                                         // prato oscilante
  m.cil(0.12, 0.12, 0.6, 8, METAL, 0, -0.3, 0);
  return m.build(false);
}
function rotorCauda(r) {
  const m = new Mont();
  m.box(0.08, r * 2, 0.25, 0x2a2a2a, 0, 0, 0);
  m.box(0.08, 0.25, r * 2, 0x2a2a2a, 0, 0, 0);
  return m.build();
}

// deriva (leme vertical) com perfil [z, y], espessura, posição e inclinação lateral
function deriva(c, pts, esp, cor, x, y, incl) {
  const sh = new THREE.Shape();
  sh.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length; i++) sh.lineTo(pts[i][0], pts[i][1]);
  sh.closePath();
  const g = new THREE.ExtrudeGeometry(sh, { depth: esp, bevelEnabled: false });
  g.translate(0, 0, -esp / 2);
  g.rotateY(-Math.PI / 2);
  g.rotateZ(-incl);
  g.translate(x, y, 0);
  c.add(g, cor);
}

// trem de pouso (bequilha + dois principais), mostrado só no chão/convés
function trem(zN, zP, xP, r, extra = 0) {
  const c = new Mont();
  const M = 0x8a8f94, P = 0x161616;
  c.cil(0.06, 0.06, 1.0 + extra * 0.1, 6, M, 0, 0.55, zN);
  c.roda(r * 0.8, 0.2, P, 0.16, r * 0.8, zN); c.roda(r * 0.8, 0.2, P, -0.16, r * 0.8, zN);
  c.box(0.05, 0.6, 0.9, M, 0.4, 0.7, zN - 0.2);
  for (const s of [-1, 1]) {
    c.cil(0.08, 0.08, 1.1, 6, M, s * xP, 0.65, zP, 0, 0, s * 0.12);
    c.roda(r, 0.32, P, s * (xP + 0.1), r, zP);
    c.box(0.05, 0.7, 1.2, M, s * (xP - 0.35), 0.8, zP);
  }
  return c.build(false);
}

// asas espelhadas (lado direito dado; o esquerdo é refletido em X)
function asas(c, raiz, ponta, cor, espelhar = true) {
  c.add(asa(raiz, ponta), cor);
  if (espelhar) {
    const m = (s) => ({ ...s, p: [-s.p[0], s.p[1], s.p[2]] });
    c.add(asa(m(raiz), m(ponta)), cor);
  }
}
// casulo liso (motor, tanque, míssil): perfil [z, raio] ao longo de Z
function casulo(c, prof, cor, x, y, z, sx = 1, sy = 1, N = 12) {
  c.add(loftZ(prof.map(([zz, r]) => ({ z: zz + z, x, y, w: r * 2 * sx, hT: r * sy, hB: r * sy, n: 2 })), N), cor);
}

const AERO = {
  seahawk() {
    // SH-60B Seahawk da Marinha (modelo 3D texturizado); sem o arquivo, usa o Black Hawk
    return heliReal('seahawk') || AERO.blackhawk();
  },
  blackhawk(cores = {}) {
    const c = new Mont(), v = new Mont();
    const C = cores.C ?? 0x59614a, C2 = cores.C2 ?? 0x4b523e, ESC = 0x2c2f2a;
    // fuselagem: nariz arredondado, cabine larga de fundo chato, cone de cauda afinando
    c.add(loftZ([
      { z: -10.1, w: 0.22, hT: 0.22, hB: 0.14, y: 2.45 },
      { z: -8.6, w: 0.36, hT: 0.32, hB: 0.24, y: 2.3 },
      { z: -5.6, w: 0.55, hT: 0.45, hB: 0.36, y: 2.12 },
      { z: -3.2, w: 1.05, hT: 0.8, hB: 0.6, y: 1.92, n: 2.6 },
      { z: -2.1, w: 2.0, hT: 1.0, hB: 0.86, y: 1.76, nT: 3, nB: 4.5 },
      { z: 2.4, w: 2.25, hT: 1.06, hB: 0.92, y: 1.76, nT: 3, nB: 4.5 },
      { z: 3.7, w: 2.12, hT: 0.96, hB: 0.86, y: 1.72, nT: 2.8, nB: 4 },
      { z: 4.9, w: 1.8, hT: 0.72, hB: 0.76, y: 1.58, nT: 2.4, nB: 3 },
      { z: 5.75, w: 1.15, hT: 0.42, hB: 0.55, y: 1.42 },
      { z: 6.25, w: 0.35, hT: 0.12, hB: 0.18, y: 1.36 },
    ], 22), C);
    // para-brisa e janelas
    v.add(loftZ([
      { z: 3.9, w: 2.0, hT: 0.95, hB: 0.05, y: 1.73, nT: 2.8, nB: 2 },
      { z: 4.85, w: 1.83, hT: 0.74, hB: 0.05, y: 1.6, nT: 2.4, nB: 2 },
      { z: 5.6, w: 1.25, hT: 0.47, hB: 0.05, y: 1.44, nT: 2.2, nB: 2 },
    ], 18), VIDRO);
    for (const sx of [-1, 1]) {
      v.box(0.04, 0.62, 1.05, VIDRO, sx * 1.105, 2.2, 3.2);          // janela da porta do piloto
      v.box(0.04, 0.5, 0.75, VIDRO, sx * 1.12, 2.15, 1.5);           // janelas da cabine
      v.box(0.04, 0.5, 0.75, VIDRO, sx * 1.12, 2.15, 0.2);
      c.box(0.05, 1.3, 2.2, C2, sx * 1.13, 1.7, 0.6);                // porta de correr
      c.box(0.05, 0.05, 2.4, ESC, sx * 1.16, 2.38, 0.6);             // trilho
      // M134 na janela
      c.cil(0.035, 0.035, 0.9, 6, METAL, sx * 1.42, 2.05, 2.2, Math.PI / 2);
      c.box(0.16, 0.2, 0.4, METAL, sx * 1.36, 2.05, 1.65);
      // trem principal
      c.cil(0.05, 0.05, 1.0, 6, METAL, sx * 1.25, 0.72, 2.9, 0, 0, sx * 0.45);
      c.roda(0.33, 0.22, PNEU, sx * 1.55, 0.33, 2.9);
      // asa curta (ESSS) com tanque de combustível
      c.add(asa({ p: [sx * 1.1, 2.5, 0.8], corda: 1.0, esp: 0.12 }, { p: [sx * 2.9, 2.2, 0.75], corda: 0.7, esp: 0.1 }), C2);
      casulo(c, [[-1.8, 0.05], [-1.3, 0.32], [1.1, 0.32], [1.7, 0.06]], 0x5a6448, sx * 2.6, 1.75, 0.4);
    }
    // carenagem dos motores, entradas de ar e pilão do rotor
    c.add(loftZ([
      { z: -2.6, w: 0.9, hT: 0.35, hB: 0.1, y: 2.75 },
      { z: -1.6, w: 1.8, hT: 0.55, hB: 0.1, y: 2.8, n: 3 },
      { z: 2.6, w: 1.8, hT: 0.58, hB: 0.1, y: 2.8, n: 3 },
      { z: 3.6, w: 1.1, hT: 0.25, hB: 0.1, y: 2.72 },
    ], 16), C);
    for (const sx of [-1, 1]) { casulo(c, [[-1.6, 0.18], [-1.1, 0.38], [1.0, 0.4], [1.5, 0.3]], C2, sx * 0.72, 3.05, 0.3); c.cil(0.25, 0.25, 0.05, 10, ESC, sx * 0.72, 3.05, 1.82, Math.PI / 2); }
    c.cil(0.26, 0.34, 0.55, 12, C2, 0, 3.55, 0.6);
    // deriva inclinada para trás e estabilizador
    c.add(asa({ p: [0, 2.35, -8.2], corda: 1.7, esp: 0.12 }, { p: [0, 4.35, -9.3], corda: 1.0, esp: 0.1 }), C);
    asas(c, { p: [0.1, 2.25, -8.7], corda: 0.95, esp: 0.1 }, { p: [2.3, 2.25, -8.9], corda: 0.75, esp: 0.08 }, C);
    c.roda(0.2, 0.15, PNEU, 0, 0.25, -8.4);
    c.cil(0.04, 0.04, 1.6, 6, METAL, 0, 1.0, -8.4);
    antena(c, 0, 2.7, -4, 1.0);
    // detalhes: guincho de resgate, cortadores de cabo, FLIR, supressores de calor, insígnia e número
    c.bloco(0.38, 0.3, 0.7, C2, 1.35, 2.8, 1.7, 0, 0, 0, 0.08);
    c.box(0.7, 0.06, 0.08, METAL, 1.55, 2.72, 1.95);
    c.cil(0.008, 0.008, 0.9, 3, 0x222222, 1.88, 2.25, 1.95);
    c.box(0.05, 0.35, 0.9, METAL, 0, 2.62, 5.0, -0.9);
    c.box(0.05, 0.3, 0.7, METAL, 0, 0.92, 5.4, 0.9);
    c.esf(0.19, 0x2a2d30, 0, 0.82, 5.35);
    v.esf(0.12, VIDRO, 0, 0.8, 5.5);
    for (const sx of [-1, 1]) {
      c.bloco(0.35, 0.4, 1.3, 0x4f5743, sx * 1.15, 3.0, -1.6, 0, sx * 0.4, 0, 0.1);
      c.box(0.25, 0.08, 0.35, METAL, sx * 1.12, 0.62, 4.0);                  // degrau
      c.box(0.04, 0.03, 0.18, METAL, sx * 1.15, 1.85, 3.2);                  // maçaneta
      if (cores.marca) cores.marca(c, sx);
      else {
        insignia(c, sx * 0.31, 2.2, -6.6, 0.22, sx > 0 ? '+x' : '-x', true);
        numero(c, '26543', sx * 0.08, 3.5, -8.8, 0.22, sx > 0 ? '+x' : '-x', 0x1e1e1e);
      }
    }
    antena(c, 0.4, 2.75, -2.6, 0.8); antena(c, -0.4, 0.95, 2.0, 0.5);
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(4, 8.2), rotorY: 3.95, rotorZ: 0.6, cauda: rotorCauda(1.7), caudaPos: [0.3, 3.9, -9.4], caudaEixo: 'x' };
  },
  chinook() {
    // modelo 3D texturizado (Boeing CH-47 Chinook); o feito no jogo fica de reserva
    const real = heliReal('chinook');
    if (real) return real;
    const c = new Mont(), v = new Mont();
    const C = 0x5d654c, C2 = 0x4f5641;
    c.add(loftZ([
      { z: -7.6, w: 2.6, hT: 1.4, hB: 0.9, y: 2.55, n: 3 },
      { z: -6.6, w: 3.6, hT: 1.8, hB: 1.55, y: 2.35, nT: 3.5, nB: 5 },
      { z: 5.4, w: 3.6, hT: 1.8, hB: 1.55, y: 2.35, nT: 3.5, nB: 5 },
      { z: 6.9, w: 3.3, hT: 1.55, hB: 1.4, y: 2.3, nT: 3, nB: 4 },
      { z: 7.9, w: 2.6, hT: 1.05, hB: 1.0, y: 2.1, n: 2.6 },
      { z: 8.5, w: 1.4, hT: 0.45, hB: 0.5, y: 1.85 },
    ], 22), C);
    v.add(loftZ([
      { z: 6.7, w: 3.36, hT: 1.58, hB: 0.05, y: 2.32, nT: 3, nB: 2 },
      { z: 7.8, w: 2.66, hT: 1.08, hB: 0.05, y: 2.12, nT: 2.6, nB: 2 },
      { z: 8.35, w: 1.6, hT: 0.55, hB: 0.05, y: 1.9 },
    ], 18), VIDRO);
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 6; i++) v.box(0.04, 0.42, 0.5, VIDRO, sx * 1.81, 2.9, -4.2 + i * 1.6);
      c.add(loftZ([{ z: -4.6, w: 0.7, hT: 0.45, hB: 0.42, y: 1.15, x: sx * 1.95 }, { z: -3.6, w: 0.95, hT: 0.55, hB: 0.5, y: 1.1, x: sx * 2.0 }, { z: 3.4, w: 0.95, hT: 0.55, hB: 0.5, y: 1.1, x: sx * 2.0 }, { z: 4.4, w: 0.6, hT: 0.35, hB: 0.4, y: 1.15, x: sx * 1.9 }], 14), C2);
      c.roda(0.45, 0.35, PNEU, sx * 1.6, 0.45, 4.8);
      c.roda(0.45, 0.35, PNEU, sx * 1.6, 0.45, -4.3);
      c.roda(0.45, 0.35, PNEU, sx * 1.6, 0.45, -5.3);
      casulo(c, [[-2.4, 0.3], [-1.9, 0.52], [0.6, 0.55], [1.2, 0.42]], 0x6c7557, sx * 1.55, 4.3, -6.0);
    }
    // pilão traseiro alto e dianteiro
    c.add(loftZ([
      { z: -8.2, w: 1.0, hT: 0.4, hB: 0.1, y: 4.2 },
      { z: -7.6, w: 1.8, hT: 1.6, hB: 0.1, y: 4.1, n: 3 },
      { z: -5.2, w: 1.8, hT: 1.6, hB: 0.1, y: 4.1, n: 3 },
      { z: -3.4, w: 1.4, hT: 0.25, hB: 0.1, y: 4.1 },
    ], 16), C);
    c.add(loftZ([
      { z: 4.8, w: 1.0, hT: 0.15, hB: 0.1, y: 4.12 },
      { z: 5.6, w: 1.4, hT: 0.6, hB: 0.1, y: 4.1, n: 3 },
      { z: 7.0, w: 1.3, hT: 0.55, hB: 0.1, y: 4.05, n: 3 },
      { z: 7.6, w: 0.8, hT: 0.2, hB: 0.1, y: 3.95 },
    ], 14), C);
    c.box(1.6, 0.06, 4, 0x2a2e22, 0, 0.5, -6.6, 0.25);
    for (const sx of [-1, 1]) { insignia(c, sx * 1.8, 2.6, -1.0, 0.45, sx > 0 ? '+x' : '-x', true); numero(c, '12', sx * 0.92, 5.2, -6.4, 0.45, sx > 0 ? '+x' : '-x', 0x1e1e1e); }
    c.cil(0.06, 0.06, 2.4, 6, METAL, 1.0, 2.3, 9.2, Math.PI / 2);          // sonda de reabastecimento
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(3, 9.1), rotorY: 6.3, rotorZ: -6.5, rotor2: rotor(3, 9.1), rotor2Y: 5.15, rotor2Z: 6.2 };
  },
  apache() {
    const c = new Mont(), v = new Mont();
    const C = 0x575f48, C2 = 0x4a513d, ESC = 0x2a2c27;
    c.add(loftZ([
      { z: -9.6, w: 0.22, hT: 0.22, hB: 0.18, y: 2.05 },
      { z: -7.0, w: 0.34, hT: 0.3, hB: 0.28, y: 1.98 },
      { z: -3.6, w: 0.6, hT: 0.5, hB: 0.45, y: 1.88 },
      { z: -1.6, w: 1.0, hT: 0.85, hB: 0.62, y: 1.82, n: 3 },
      { z: 1.4, w: 1.05, hT: 0.88, hB: 0.62, y: 1.8, n: 3 },
      { z: 3.4, w: 0.86, hT: 0.62, hB: 0.56, y: 1.7, n: 2.6 },
      { z: 4.8, w: 0.58, hT: 0.38, hB: 0.45, y: 1.55 },
      { z: 5.45, w: 0.24, hT: 0.14, hB: 0.2, y: 1.45 },
    ], 20), C);
    // canopy em degraus (artilheiro na frente, piloto atrás, mais alto)
    v.add(loftZ([
      { z: 0.4, w: 0.9, hT: 0.65, hB: 0.05, y: 2.55, n: 3 },
      { z: 1.6, w: 0.96, hT: 0.62, hB: 0.05, y: 2.55, n: 3 },
      { z: 2.3, w: 0.9, hT: 0.45, hB: 0.05, y: 2.4, n: 2.8 },
      { z: 3.6, w: 0.8, hT: 0.42, hB: 0.05, y: 2.25, n: 2.6 },
      { z: 4.5, w: 0.55, hT: 0.2, hB: 0.05, y: 2.0 },
    ], 16), VIDRO);
    c.box(0.04, 0.5, 0.06, ESC, 0, 3.0, 1.95);
    for (const sx of [-1, 1]) {
      // motores laterais altos com escapes
      casulo(c, [[-2.8, 0.22], [-2.3, 0.42], [0.2, 0.45], [0.7, 0.3]], C, sx * 0.98, 2.62, -0.4);
      c.cil(0.22, 0.26, 0.5, 10, ESC, sx * 1.05, 2.62, -3.3, Math.PI / 2 - 0.15);
      // sponsons e asas curtas
      c.add(loftZ([{ z: -1.4, w: 0.4, hT: 0.25, hB: 0.25, y: 1.55, x: sx * 0.7 }, { z: -0.6, w: 0.55, hT: 0.38, hB: 0.32, y: 1.5, x: sx * 0.75 }, { z: 2.0, w: 0.55, hT: 0.38, hB: 0.32, y: 1.5, x: sx * 0.75 }, { z: 2.8, w: 0.35, hT: 0.2, hB: 0.2, y: 1.55, x: sx * 0.7 }], 12), C2);
      c.add(asa({ p: [sx * 0.8, 2.0, 1.1], corda: 1.05, esp: 0.14 }, { p: [sx * 3.0, 1.85, 1.0], corda: 0.85, esp: 0.12 }), C2);
      // 4 Hellfire e casulo de foguetes
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) casulo(c, [[-0.8, 0.02], [-0.6, 0.09], [0.6, 0.09], [0.85, 0.01]], 0x7a7a52, sx * (1.95 + i * 0.24), 1.62 - j * 0.22, 0.8, 1, 1, 8);
      casulo(c, [[-0.9, 0.24], [-0.7, 0.33], [0.7, 0.33], [0.9, 0.26]], 0x55593f, sx * 2.8, 1.62, 0.6);
      c.cil(0.05, 0.05, 1.0, 6, METAL, sx * 0.85, 0.62, 2.3, 0, 0, sx * 0.3);
      c.roda(0.3, 0.2, PNEU, sx * 1.0, 0.3, 2.3);
    }
    c.esf(0.32, C2, 0, 1.0, 3.6);
    c.cil(0.04, 0.05, 1.7, 6, METAL, 0, 0.9, 4.45, Math.PI / 2);
    c.esf(0.28, 0x2a2a2a, 0, 1.25, 5.3);
    c.box(0.5, 0.25, 0.3, C2, 0, 1.25, 5.05);
    // cauda
    c.add(asa({ p: [0, 2.15, -8.4], corda: 1.4, esp: 0.12 }, { p: [0, 4.25, -9.3], corda: 0.95, esp: 0.1 }), C);
    asas(c, { p: [0.1, 1.85, -8.9], corda: 0.85, esp: 0.1 }, { p: [1.65, 1.85, -9.1], corda: 0.7, esp: 0.08 }, C);
    c.roda(0.18, 0.12, PNEU, 0, 0.2, -8.9);
    c.cil(0.04, 0.04, 1.4, 6, METAL, 0, 0.9, -8.9);
    // mastro com radar Longbow
    c.cil(0.16, 0.22, 0.9, 8, C2, 0, 3.5, 0.1);
    // detalhes: cortadores de cabo, insígnia, número, luz anticolisão
    c.box(0.05, 0.4, 0.9, METAL, 0, 2.95, 4.2, -0.9);
    c.box(0.05, 0.3, 0.7, METAL, 0, 1.05, 5.3, 0.9);
    for (const sx of [-1, 1]) {
      insignia(c, sx * 0.3, 2.0, -6.0, 0.2, sx > 0 ? '+x' : '-x', true);
      numero(c, '445', sx * 0.08, 3.3, -8.95, 0.25, sx > 0 ? '+x' : '-x', 0x1e1e1e);
      c.box(0.2, 0.15, 0.2, METAL, sx * 1.0, 1.25, -1.0);
    }
    c.box(0.12, 0.1, 0.12, 0xd02020, 0, 4.3, -9.2);
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(4, 7.3), rotorY: 4.2, rotorZ: 0.1, cauda: rotorCauda(1.4), caudaPos: [0.3, 3.4, -9.4], caudaEixo: 'x', armaZ: 5.2, armaY: 0.9, radar: true };
  },
  littlebird() {
    // MH-6M Little Bird: fuselagem em "ovo", rotor de 6 pás, cauda fina com empenagem em H, esquis e bancos externos
    const c = new Mont(), v = new Mont();
    const C = 0x2c2f30, C2 = 0x222526, ESC = 0x151718;
    c.add(loftZ([
      { z: -1.5, w: 0.5, hT: 0.45, hB: 0.25, y: 1.65 },
      { z: -0.9, w: 1.2, hT: 0.75, hB: 0.55, y: 1.55, n: 2.2 },
      { z: 0.0, w: 1.42, hT: 0.85, hB: 0.68, y: 1.5, n: 2.2 },
      { z: 0.9, w: 1.36, hT: 0.78, hB: 0.66, y: 1.45, n: 2.1 },
      { z: 1.6, w: 1.0, hT: 0.5, hB: 0.5, y: 1.38 },
      { z: 1.95, w: 0.35, hT: 0.15, hB: 0.2, y: 1.32 },
    ], 22), C);
    // cabine quase toda de vidro (na frente e nas portas)
    v.add(loftZ([
      { z: 0.25, w: 1.4, hT: 0.8, hB: 0.15, y: 1.55, n: 2.2 },
      { z: 1.0, w: 1.3, hT: 0.72, hB: 0.2, y: 1.48, n: 2.1 },
      { z: 1.65, w: 0.95, hT: 0.45, hB: 0.25, y: 1.4 },
    ], 18), VIDRO);
    // cone de cauda fino, empenagem em H e deriva
    c.add(loftZ([
      { z: -5.4, w: 0.16, hT: 0.1, hB: 0.1, y: 2.0 },
      { z: -3.0, w: 0.26, hT: 0.16, hB: 0.16, y: 1.85 },
      { z: -1.3, w: 0.42, hT: 0.26, hB: 0.24, y: 1.75 },
    ], 12), C);
    c.box(1.7, 0.06, 0.45, C, 0, 2.05, -5.0);
    for (const sx of [-1, 1]) c.box(0.05, 0.6, 0.45, C, sx * 0.85, 2.05, -5.0);
    c.add(asa({ p: [0, 2.0, -4.8], corda: 0.6, esp: 0.12 }, { p: [0, 2.9, -5.25], corda: 0.4, esp: 0.1 }), C);
    c.add(asa({ p: [0, 2.0, -4.8], corda: 0.55, esp: 0.12 }, { p: [0, 1.4, -5.1], corda: 0.4, esp: 0.1 }), C);
    // mastro do rotor e carenagem do motor
    c.bloco(0.6, 0.35, 1.0, C2, 0, 2.35, -0.3, 0, 0, 0, 0.12);
    c.cil(0.12, 0.14, 0.35, 8, METAL, 0, 2.6, 0.0);
    c.cil(0.12, 0.16, 0.4, 8, ESC, 0, 1.9, -1.55, Math.PI / 2);           // escape
    // esquis com travessas
    for (const sx of [-1, 1]) {
      c.cil(0.045, 0.045, 3.0, 6, ESC, sx * 0.95, 0.06, 0.15, Math.PI / 2);
      c.cil(0.045, 0.045, 0.35, 6, ESC, sx * 0.95, 0.14, 1.75, Math.PI / 2 - 0.5);
      for (const z of [-0.5, 0.9]) c.cil(0.04, 0.04, 1.05, 6, ESC, sx * 0.72, 0.5, z, 0, 0, sx * 0.45);
      // bancos externos (pranchas) e alças
      c.bloco(0.42, 0.06, 1.7, 0x3a3e40, sx * 1.02, 0.92, 0.2, 0, 0, 0, 0.02);
      c.cil(0.02, 0.02, 1.6, 4, METAL, sx * 0.95, 1.95, 0.2, Math.PI / 2);
      c.box(0.04, 0.45, 0.04, METAL, sx * 1.2, 0.7, 0.2);
    }
    // nariz com FLIR e antena
    c.esf(0.15, ESC, 0, 1.0, 1.75);
    v.esf(0.09, VIDRO, 0, 0.98, 1.88);
    antena(c, 0, 2.3, -1.0, 0.7);
    numero(c, '54', 0.09, 2.0, -3.6, 0.2, '+x', 0x5a5f62);
    numero(c, '54', -0.09, 2.0, -3.6, 0.2, '-x', 0x5a5f62);
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(6, 4.4, 0x1e1e1e, 0.25), rotorY: 2.85, rotorZ: 0.0, cauda: rotorCauda(0.7), caudaPos: [0.18, 2.1, -5.3], caudaEixo: 'x', bancos: true };
  },
  reaper() {
    const c = new Mont();
    const C = 0xb3bbc1;
    c.add(loftZ([
      { z: -5.5, w: 0.2, hT: 0.12, hB: 0.12, y: 0.45 },
      { z: -4.0, w: 0.6, hT: 0.32, hB: 0.32, y: 0.45 },
      { z: 0, w: 0.95, hT: 0.48, hB: 0.45, y: 0.45 },
      { z: 3.0, w: 1.0, hT: 0.55, hB: 0.42, y: 0.5 },
      { z: 4.7, w: 0.85, hT: 0.62, hB: 0.32, y: 0.55 },
      { z: 5.6, w: 0.3, hT: 0.2, hB: 0.12, y: 0.5 },
    ], 16), C);
    asas(c, { p: [0.4, 0.75, 1.2], corda: 1.15, esp: 0.14 }, { p: [10.0, 0.95, 0.5], corda: 0.55, esp: 0.1 }, C);
    for (const s of [-1, 1]) c.add(asa({ p: [s * 0.15, 0.6, -4.2], corda: 1.0, esp: 0.1 }, { p: [s * 1.5, 1.6, -4.8], corda: 0.5, esp: 0.08 }), C);
    c.add(asa({ p: [0, 0.3, -4.0], corda: 0.8, esp: 0.1 }, { p: [0, -0.5, -4.4], corda: 0.45, esp: 0.08 }), C);
    for (const s of [-1, 1]) for (const x of [3.2, 5.0]) casulo(c, [[-0.8, 0.02], [-0.6, 0.1], [0.7, 0.1], [0.9, 0.02]], 0x7a7a52, s * x, 0.4, 0.4, 1, 1, 8);
    c.esf(0.36, 0x2b3035, 0, 0.05, 4.2);
    return { corpo: c.build(), helice: rotor(3, 1.4, 0x333333, 0.25), heliceZ: -5.7, heliceY: 0.45, heliceEixo: 'z' };
  },
  f35() {
    // F-35C Lightning II: corpo largo e achatado, entradas de ar laterais, asa grande (versão naval)
    const c = new Mont(), v = new Mont();
    const C = 0xa3abb2, C2 = 0x8e969d, ESC = 0x33383d;
    c.add(loftZ([
      { z: -7.55, w: 1.25, hT: 0.55, hB: 0.5, y: 1.2, n: 2 },
      { z: -6.4, w: 2.4, hT: 0.62, hB: 0.48, y: 1.2, nT: 2.4, nB: 3 },
      { z: -3.4, w: 3.3, hT: 0.72, hB: 0.52, y: 1.2, nT: 2.8, nB: 3.5 },
      { z: 0.0, w: 3.2, hT: 0.86, hB: 0.58, y: 1.2, nT: 3.0, nB: 3.5 },
      { z: 2.0, w: 2.6, hT: 0.82, hB: 0.56, y: 1.2, nT: 2.8, nB: 3 },
      { z: 3.6, w: 1.6, hT: 0.66, hB: 0.48, y: 1.18, nT: 2.4, nB: 2.6 },
      { z: 5.6, w: 1.0, hT: 0.44, hB: 0.36, y: 1.12 },
      { z: 7.2, w: 0.46, hT: 0.2, hB: 0.17, y: 1.06 },
      { z: 8.1, w: 0.06, hT: 0.03, hB: 0.03, y: 1.03 },
    ], 22), C);
    v.add(loftZ([
      { z: 1.6, w: 0.75, hT: 0.25, hB: 0.05, y: 1.95 },
      { z: 2.6, w: 0.95, hT: 0.52, hB: 0.05, y: 1.92 },
      { z: 4.0, w: 0.9, hT: 0.45, hB: 0.05, y: 1.78 },
      { z: 5.3, w: 0.62, hT: 0.2, hB: 0.05, y: 1.52 },
    ], 16), 0xb08a40);
    // entradas de ar (bocas escuras)
    for (const sx of [-1, 1]) c.box(0.52, 0.55, 0.08, ESC, sx * 1.35, 1.12, 2.15, 0, sx * 0.35, 0);
    asas(c, { p: [1.4, 1.12, 0.8], corda: 6.0, esp: 0.05 }, { p: [6.55, 1.08, -3.2], corda: 2.0, esp: 0.04 }, C);
    asas(c, { p: [1.15, 1.2, -5.2], corda: 2.6, esp: 0.05 }, { p: [3.95, 1.2, -6.6], corda: 1.2, esp: 0.04 }, C);
    for (const sx of [-1, 1]) c.add(asa({ p: [sx * 1.3, 1.65, -4.1], corda: 3.0, esp: 0.05 }, { p: [sx * 2.05, 3.65, -5.7], corda: 1.3, esp: 0.04 }), C2);
    c.cil(0.62, 0.68, 0.9, 16, 0x403d3a, 0, 1.2, -7.55, Math.PI / 2);
    c.cil(0.5, 0.5, 0.92, 16, 0x141414, 0, 1.2, -7.56, Math.PI / 2);
    c.box(0.12, 0.06, 0.25, 0xd02020, -6.5, 1.1, -2.4); c.box(0.12, 0.06, 0.25, 0x20c040, 6.5, 1.1, -2.4);
    c.box(0.06, 0.06, 0.7, ESC, 0, 0.62, -7.0, -0.3);
    // insígnias de baixa visibilidade, número, sensor EOTS, portas do compartimento de armas, bordas escuras
    insignia(c, -4.0, 1.14, -1.6, 0.42, '+y', true);
    for (const sx of [-1, 1]) {
      insignia(c, sx * 1.62, 1.25, -4.4, 0.32, sx > 0 ? '+x' : '-x', true);
      numero(c, '100', sx * 0.63, 1.2, 4.6, 0.32, sx > 0 ? '+x' : '-x', 0x60666c);
      c.box(0.04, 0.03, 4.2, 0x6a7177, sx * 0.55, 0.64, -0.6);           // portas do compartimento interno
      c.add(asa({ p: [sx * 1.4, 1.13, 0.85], corda: 0.12, esp: 0.3 }, { p: [sx * 6.55, 1.09, -3.15], corda: 0.08, esp: 0.3 }), 0x5d646a);
    }
    v.esf(0.18, VIDRO, 0, 0.72, 5.4, 1, 0.7, 1.4);
    c.box(0.06, 0.03, 1.6, 0x6a7177, 0, 0.64, -0.6);
    return { corpo: c.build(), vidro: v.build(false), trem: trem(4.2, -0.6, 1.5, 0.3), motorZ: -8.0, motorY: 1.2, chamaR: 0.5, pontas: 6.5 };
  },
  f18() {
    // F/A-18E Super Hornet
    const c = new Mont(), v = new Mont();
    const C = 0xbcc3ca, C2 = 0xa9b1b8, ESC = 0x33383d;
    c.add(loftZ([
      { z: -8.9, w: 2.2, hT: 0.5, hB: 0.45, y: 1.2, n: 3 },
      { z: -6.0, w: 2.6, hT: 0.6, hB: 0.52, y: 1.2, n: 3.2 },
      { z: -2.0, w: 2.5, hT: 0.68, hB: 0.6, y: 1.2, n: 3.2 },
      { z: 1.0, w: 1.6, hT: 0.74, hB: 0.66, y: 1.25, n: 2.8 },
      { z: 4.0, w: 1.15, hT: 0.65, hB: 0.55, y: 1.28, n: 2.4 },
      { z: 6.6, w: 0.78, hT: 0.44, hB: 0.38, y: 1.25 },
      { z: 8.6, w: 0.32, hT: 0.18, hB: 0.16, y: 1.2 },
      { z: 9.3, w: 0.04, hT: 0.02, hB: 0.02, y: 1.2 },
    ], 22), C);
    v.add(loftZ([
      { z: 2.8, w: 0.7, hT: 0.25, hB: 0.05, y: 1.92 },
      { z: 4.0, w: 0.92, hT: 0.55, hB: 0.05, y: 1.9 },
      { z: 5.6, w: 0.85, hT: 0.45, hB: 0.05, y: 1.78 },
      { z: 6.7, w: 0.5, hT: 0.15, hB: 0.05, y: 1.6 },
    ], 16), VIDRO);
    // LEX, entradas de ar retangulares, asa trapezoidal
    asas(c, { p: [0.65, 1.38, 5.6], corda: 6.0, esp: 0.03 }, { p: [1.65, 1.36, 0.0], corda: 0.6, esp: 0.03 }, C2);
    for (const sx of [-1, 1]) { c.bloco(0.95, 0.85, 3.6, C, sx * 1.25, 0.95, 0.3, 0, 0, 0, 0.18); c.box(0.78, 0.7, 0.06, ESC, sx * 1.25, 0.95, 2.12); }
    asas(c, { p: [1.4, 1.22, 0.4], corda: 4.8, esp: 0.05 }, { p: [6.8, 1.15, -2.3], corda: 1.8, esp: 0.04 }, C);
    asas(c, { p: [1.3, 1.25, -6.1], corda: 3.0, esp: 0.05 }, { p: [3.85, 1.2, -8.2], corda: 1.3, esp: 0.04 }, C);
    for (const sx of [-1, 1]) {
      c.add(asa({ p: [sx * 1.2, 1.75, -4.4], corda: 3.4, esp: 0.05 }, { p: [sx * 2.15, 4.35, -6.6], corda: 1.4, esp: 0.04 }), C2);
      casulo(c, [[-1.5, 0.02], [-1.2, 0.07], [1.3, 0.07], [1.6, 0.01]], 0xe8e8e0, sx * 6.95, 1.15, -2.5, 1, 1, 8);
      c.box(0.08, 0.4, 1.2, C2, sx * 2.9, 0.85, -1.5);
      casulo(c, [[-1.8, 0.05], [-1.3, 0.24], [1.0, 0.24], [1.6, 0.04]], 0x6d6b4a, sx * 2.9, 0.48, -1.4, 1, 1, 10);
      c.box(0.08, 0.4, 1.0, C2, sx * 4.6, 0.9, -2.0);
      casulo(c, [[-1.2, 0.05], [-0.8, 0.17], [0.9, 0.17], [1.3, 0.03]], 0x6d6b4a, sx * 4.6, 0.6, -2.0, 1, 1, 10);
    }
    casulo(c, [[-2.6, 0.05], [-2.0, 0.35], [1.8, 0.35], [2.6, 0.05]], C2, 0, 0.45, -1.0);
    for (const x of [-0.62, 0.62]) {
      c.cil(0.5, 0.55, 0.9, 14, 0x403d3a, x, 1.2, -8.95, Math.PI / 2);
      c.cil(0.4, 0.4, 0.92, 14, 0x141414, x, 1.2, -8.96, Math.PI / 2);
    }
    c.box(0.12, 0.06, 0.25, 0xd02020, -6.9, 1.15, -1.1); c.box(0.12, 0.06, 0.25, 0x20c040, 6.9, 1.15, -1.1);
    insignia(c, -4.0, 1.21, -1.0, 0.42, '+y', true);
    for (const sx of [-1, 1]) {
      insignia(c, sx * 1.31, 1.25, -4.6, 0.3, sx > 0 ? '+x' : '-x', true);
      numero(c, '300', sx * 0.44, 1.25, 6.0, 0.3, sx > 0 ? '+x' : '-x', 0x5a6066);
    }
    c.cil(0.02, 0.03, 0.9, 6, METAL, 0, 1.2, 9.65, Math.PI / 2);          // tubo de pitot
    c.bloco(0.12, 0.12, 1.4, C2, 0.5, 1.75, 5.6, 0, 0, 0, 0.04);          // sonda de reabastecimento recolhida
    c.box(0.05, 0.09, 0.05, 0x111111, 0, 1.6, 7.8);                         // boca do canhão
    v.box(0.04, 0.06, 1.8, ESC, 0, 2.43, 4.6);                              // armação do canopy
    for (const sx of [-1, 1]) casulo(c, [[-1.6, 0.02], [-1.3, 0.09], [1.4, 0.09], [1.7, 0.01]], 0xe0e0d8, sx * 1.35, 0.72, -2.6, 1, 1, 8);  // AMRAAM
    return { corpo: c.build(), vidro: v.build(false), trem: trem(5.0, -1.0, 1.6, 0.35), motorZ: -9.4, motorY: 1.2, chamaR: 0.45, motores: [-0.62, 0.62], pontas: 6.9 };
  },
  a10() {
    // A-10 Thunderbolt II: asa reta e grossa, motores altos, duas derivas
    const c = new Mont(), v = new Mont();
    const C = 0x9aa3a9, C2 = 0x8a9399, ESC = 0x33383d;
    c.add(loftZ([
      { z: -8.0, w: 0.3, hT: 0.25, hB: 0.25, y: 1.75 },
      { z: -6.4, w: 0.65, hT: 0.55, hB: 0.5, y: 1.7 },
      { z: -2.5, w: 1.25, hT: 0.95, hB: 0.85, y: 1.6, n: 2.4 },
      { z: 2.0, w: 1.45, hT: 1.0, hB: 0.95, y: 1.6, n: 2.6 },
      { z: 4.6, w: 1.4, hT: 0.95, hB: 0.95, y: 1.6, n: 2.6 },
      { z: 6.6, w: 1.1, hT: 0.7, hB: 0.75, y: 1.5 },
      { z: 7.9, w: 0.65, hT: 0.38, hB: 0.42, y: 1.35 },
      { z: 8.3, w: 0.3, hT: 0.15, hB: 0.2, y: 1.3 },
    ], 20), C);
    v.add(loftZ([
      { z: 4.0, w: 1.0, hT: 0.55, hB: 0.05, y: 2.4 },
      { z: 5.1, w: 1.1, hT: 0.62, hB: 0.05, y: 2.35 },
      { z: 6.4, w: 0.85, hT: 0.45, hB: 0.05, y: 2.1 },
      { z: 7.1, w: 0.5, hT: 0.15, hB: 0.05, y: 1.95 },
    ], 16), VIDRO);
    c.cil(0.08, 0.1, 1.5, 8, 0x222222, 0, 1.25, 8.9, Math.PI / 2);
    asas(c, { p: [0.6, 1.1, 2.3], corda: 3.0, esp: 0.16 }, { p: [8.3, 1.25, 1.4], corda: 1.8, esp: 0.12 }, C);
    for (const s of [-1, 1]) {
      c.add(asa({ p: [s * 8.3, 1.25, 1.4], corda: 1.8, esp: 0.1 }, { p: [s * 9.0, 0.95, 1.3], corda: 1.4, esp: 0.08 }), C2);
      casulo(c, [[-2.2, 0.35], [-1.8, 0.62], [1.0, 0.66], [1.5, 0.58]], C2, s * 1.55, 2.8, -3.0);
      c.cil(0.52, 0.52, 0.06, 14, ESC, s * 1.55, 2.8, -1.48, Math.PI / 2);
      c.add(asa({ p: [s * 0.6, 2.3, -2.2], corda: 1.4, esp: 0.15 }, { p: [s * 1.2, 2.6, -2.4], corda: 1.2, esp: 0.15 }), C2);
      for (const [x, cor, r] of [[2.4, 0x6d6b4a, 0.2], [3.6, 0x6d6b4a, 0.2], [4.8, 0xdddddd, 0.15], [6.0, 0x3a3f45, 0.25]]) {
        c.box(0.08, 0.3, 0.9, C2, s * x, 0.82, 0.8);
        casulo(c, [[-1.2, 0.03], [-0.9, r], [0.9, r], [1.3, 0.02]], cor, s * x, 0.55, 0.8, 1, 1, 8);
      }
    }
    asas(c, { p: [0.3, 1.8, -6.5], corda: 1.6, esp: 0.1 }, { p: [3.6, 1.8, -6.7], corda: 1.3, esp: 0.09 }, C);
    for (const s of [-1, 1]) c.add(asa({ p: [s * 3.6, 0.9, -6.5], corda: 1.6, esp: 0.1 }, { p: [s * 3.6, 3.2, -6.9], corda: 1.2, esp: 0.09 }), C);
    c.box(0.12, 0.06, 0.25, 0xd02020, -9.0, 0.95, 0.6); c.box(0.12, 0.06, 0.25, 0x20c040, 9.0, 0.95, 0.6);
    // boca de tubarão pintada, canhão de 7 canos, insígnias e número
    for (const sx of [-1, 1]) {
      const pl = sx > 0 ? '+x' : '-x';
      c.add(new THREE.CircleGeometry(0.42, 3, -0.6, 1.2), 0xa82020, sx * 0.62, 1.15, 7.0, 0, sx * Math.PI / 2, 0);
      for (let k = 0; k < 5; k++) c.add(new THREE.CircleGeometry(0.07, 3), 0xf2f2f2, sx * 0.64, 1.25 - (k % 2) * 0.12, 6.75 + k * 0.12, 0, sx * Math.PI / 2, Math.PI / 2 * (k % 2 ? 1 : -1));
      c.box(0.03, 0.12, 0.12, 0x111111, sx * 0.64, 1.3, 7.15);               // olho
      insignia(c, sx * 2.21, 2.8, -3.0, 0.32, pl, true);
      numero(c, '81', sx * 3.67, 2.2, -6.7, 0.35, pl, 0x2a2e33);
    }
    for (let k = 0; k < 7; k++) { const a = k / 7 * Math.PI * 2; c.cil(0.025, 0.025, 1.0, 4, 0x1a1a1a, Math.cos(a) * 0.07, 1.25 + Math.sin(a) * 0.07, 9.2, Math.PI / 2); }
    c.box(0.3, 0.04, 0.3, 0x2a2e33, 0, 2.55, 3.8);                          // receptáculo de reabastecimento
    return { corpo: c.build(), vidro: v.build(false), trem: trem(1.2, 0.4, 2.2, 0.38, 5.0), pontas: 8.8, semChama: true };
  },
  f22() {
    // F-22 Raptor: asa em diamante, derivas bem inclinadas, bocal 2D
    const c = new Mont(), v = new Mont();
    const C = 0xb2b9c0, C2 = 0x9ea6ad;
    c.add(loftZ([
      { z: -7.8, w: 2.4, hT: 0.45, hB: 0.42, y: 1.2, n: 4 },
      { z: -5.8, w: 3.0, hT: 0.62, hB: 0.5, y: 1.2, n: 3.5 },
      { z: -2.0, w: 3.6, hT: 0.8, hB: 0.58, y: 1.2, n: 3.4 },
      { z: 1.4, w: 3.4, hT: 0.84, hB: 0.6, y: 1.2, nT: 3.2, nB: 3.6 },
      { z: 3.8, w: 1.8, hT: 0.7, hB: 0.52, y: 1.2, nT: 2.4, nB: 2.6 },
      { z: 6.6, w: 0.95, hT: 0.42, hB: 0.32, y: 1.12 },
      { z: 8.6, w: 0.3, hT: 0.12, hB: 0.1, y: 1.06 },
      { z: 9.4, w: 0.04, hT: 0.02, hB: 0.02, y: 1.04 },
    ], 22), C);
    v.add(loftZ([
      { z: 3.6, w: 0.75, hT: 0.25, hB: 0.05, y: 1.92 },
      { z: 4.8, w: 0.95, hT: 0.55, hB: 0.05, y: 1.9 },
      { z: 6.6, w: 0.85, hT: 0.42, hB: 0.05, y: 1.72 },
      { z: 7.8, w: 0.45, hT: 0.12, hB: 0.05, y: 1.5 },
    ], 16), 0xb08a40);
    for (const sx of [-1, 1]) c.box(0.6, 0.6, 0.08, 0x33383d, sx * 1.55, 1.1, 3.05, 0, sx * 0.5, 0);
    asas(c, { p: [1.6, 1.12, 2.6], corda: 8.0, esp: 0.04 }, { p: [6.8, 1.1, -1.6], corda: 1.2, esp: 0.035 }, C);
    asas(c, { p: [1.6, 1.15, -5.0], corda: 3.0, esp: 0.04 }, { p: [4.4, 1.15, -6.4], corda: 1.4, esp: 0.035 }, C);
    for (const sx of [-1, 1]) c.add(asa({ p: [sx * 1.7, 1.6, -3.4], corda: 3.6, esp: 0.04 }, { p: [sx * 2.8, 3.9, -5.4], corda: 1.4, esp: 0.035 }), C2);
    for (const x of [-0.75, 0.75]) { c.box(1.2, 0.55, 1.0, 0x403d3a, x, 1.2, -7.9); c.box(1.0, 0.36, 1.02, 0x141414, x, 1.2, -7.92); }
    c.box(0.12, 0.06, 0.25, 0xd02020, -6.8, 1.1, -2.2); c.box(0.12, 0.06, 0.25, 0x20c040, 6.8, 1.1, -2.2);
    insignia(c, -4.0, 1.13, 0.0, 0.42, '+y', true);
    for (const sx of [-1, 1]) {
      insignia(c, sx * 1.81, 1.25, -4.2, 0.3, sx > 0 ? '+x' : '-x', true);
      numero(c, '04', sx * 0.48, 1.12, 6.6, 0.3, sx > 0 ? '+x' : '-x', 0x60666c);
      c.box(0.04, 0.03, 3.6, 0x7d848b, sx * 0.6, 0.64, -1.0);
    }
    return { corpo: c.build(), vidro: v.build(false), trem: trem(4.8, -0.8, 1.6, 0.32), motorZ: -8.4, motorY: 1.2, chamaR: 0.42, motores: [-0.75, 0.75], pontas: 6.8 };
  },
  osprey() {
    const c = new Mont(), v = new Mont();
    const C = 0x9aa1a6, C2 = 0x899095;
    c.add(loftZ([
      { z: -9.2, w: 0.5, hT: 0.35, hB: 0.2, y: 3.0 },
      { z: -7.0, w: 1.4, hT: 0.8, hB: 0.6, y: 2.4 },
      { z: -5.0, w: 2.4, hT: 1.25, hB: 1.1, y: 2.0, nT: 3, nB: 4 },
      { z: 5.0, w: 2.5, hT: 1.3, hB: 1.15, y: 2.0, nT: 3, nB: 4 },
      { z: 6.8, w: 2.2, hT: 1.05, hB: 1.0, y: 1.95, n: 2.8 },
      { z: 8.0, w: 1.4, hT: 0.6, hB: 0.7, y: 1.8 },
      { z: 8.7, w: 0.4, hT: 0.15, hB: 0.25, y: 1.7 },
    ], 22), C);
    v.add(loftZ([
      { z: 6.4, w: 2.26, hT: 1.08, hB: 0.05, y: 1.95, n: 2.8 },
      { z: 7.6, w: 1.66, hT: 0.75, hB: 0.05, y: 1.85 },
      { z: 8.4, w: 0.9, hT: 0.32, hB: 0.05, y: 1.75 },
    ], 16), VIDRO);
    for (const sx of [-1, 1]) c.add(loftZ([{ z: -2.8, w: 0.5, hT: 0.4, hB: 0.35, y: 1.15, x: sx * 1.35 }, { z: -2.0, w: 0.8, hT: 0.5, hB: 0.45, y: 1.1, x: sx * 1.4 }, { z: 2.6, w: 0.8, hT: 0.5, hB: 0.45, y: 1.1, x: sx * 1.4 }, { z: 3.4, w: 0.5, hT: 0.3, hB: 0.3, y: 1.15, x: sx * 1.35 }], 12), C2);
    asas(c, { p: [0.0, 3.55, 2.0], corda: 2.6, esp: 0.16 }, { p: [7.0, 3.6, 1.9], corda: 2.2, esp: 0.14 }, C);
    asas(c, { p: [0.0, 3.0, -7.6], corda: 1.6, esp: 0.1 }, { p: [2.7, 3.0, -8.0], corda: 1.2, esp: 0.09 }, C);
    for (const s of [-1, 1]) c.add(asa({ p: [s * 2.7, 2.6, -7.8], corda: 1.5, esp: 0.1 }, { p: [s * 2.7, 4.9, -8.3], corda: 1.1, esp: 0.09 }), C);
    for (const s of [-1, 1]) c.roda(0.4, 0.3, PNEU, s * 1.5, 0.4, 0.5);
    c.roda(0.3, 0.2, PNEU, 0, 0.3, 6.0);
    const n = new Mont();
    n.add(loftZ([{ z: -2.2, w: 0.85, hT: 0.42, hB: 0.42, y: 0 }, { z: -1.6, w: 1.4, hT: 0.68, hB: 0.68, y: 0 }, { z: 1.8, w: 1.36, hT: 0.66, hB: 0.66, y: 0 }, { z: 2.3, w: 0.7, hT: 0.35, hB: 0.35, y: 0 }], 14), C);
    n.cil(0.3, 0.3, 0.5, 10, C2, 0, 0, 2.4, Math.PI / 2);
    const ng = n.build(); ng.rotateX(-Math.PI / 2);
    for (const sx of [-1, 1]) insignia(c, sx * 1.26, 2.2, -2.5, 0.4, sx > 0 ? '+x' : '-x', true);
    for (const sx of [-1, 1]) numero(c, '00', sx * 2.78, 3.9, -8.3, 0.4, sx > 0 ? '+x' : '-x', 0x1e1e1e);
    c.cil(0.06, 0.06, 2.6, 6, METAL, 0.85, 2.3, 8.6, Math.PI / 2);
    return { corpo: c.build(), vidro: v.build(false), nacele: ng, rotor: rotor(3, 5.8), naceleX: 7.0, naceleY: 3.7 };
  },
};

// casco de navio: seções da popa à proa. bocas = largura no convés, pontal acima da água e calado abaixo
function casco(L, B, alto, calado, opts = {}) {
  const secs = [];
  const n = 14;
  for (let i = 0; i <= n; i++) {
    const t = i / n;                       // 0 popa, 1 proa
    const z = -L / 2 + t * L;
    let w = B;
    if (t > 0.6) w = B * Math.sqrt(Math.max(0, 1 - Math.pow((t - 0.6) / 0.4, 2.2)));
    if (t < 0.08) w = B * (0.86 + 0.14 * t / 0.08);
    const sheer = t > 0.7 ? Math.pow((t - 0.7) / 0.3, 2) * (opts.sheer ?? alto * 0.25) : 0;
    const dra = calado * (t > 0.85 ? 1 - (t - 0.85) / 0.15 * 0.6 : 1);
    const nB = t > 0.65 ? 1.3 + (1 - t) * 3 : opts.fundoChato ?? 3.2;
    secs.push({ z, w: Math.max(0.05, w), hT: alto + sheer, hB: Math.max(0.05, dra), y: 0, nT: 9, nB });
  }
  return loftZ(secs, 20);
}

const NAVAL = {
  lancha() {
    // Mark VI: casco de planeio em "V" profundo, cabine com vidros inclinados
    const c = new Mont(), v = new Mont();
    const C = 0x7f8890, C2 = 0x69727a;
    c.add(casco(25, 5.4, 1.6, 1.0, { fundoChato: 1.6, sheer: 0.7 }), C);
    c.box(5.0, 0.06, 23, 0x5a6168, 0, 1.62, -0.5);                         // convés
    c.perfil([[-3.5, 1.6], [-3.5, 3.7], [1.4, 3.7], [3.4, 1.6]], 3.8, C2, 0, 0.15);
    v.box(3.4, 0.75, 0.06, VIDRO, 0, 2.85, 2.55, -0.86);
    for (const s of [-1, 1]) v.box(0.06, 0.6, 2.6, VIDRO, s * 1.92, 3.0, -0.2);
    c.cil(0.12, 0.12, 3.2, 6, METAL, 0, 5.3, -1.5);
    c.box(1.8, 0.25, 0.25, METAL, 0, 6.3, -1.5);
    c.esf(0.5, BRANCO, 0, 7.0, -1.5, 1, 0.5, 1);
    for (const s of [-1, 1]) c.box(0.06, 0.6, 18, 0x4a5056, s * 2.55, 1.95, -1);
    c.cil(0.3, 0.35, 0.6, 8, C2, 0, 1.9, -9);
    c.cil(0.05, 0.05, 1.6, 6, METAL, 0, 2.3, -8.0, Math.PI / 2);
    const t = new Mont();
    t.cil(0.65, 0.75, 0.6, 10, C2, 0, 0, 0);
    t.bloco(1.0, 0.7, 1.2, C, 0, 0.6, 0, 0, 0, 0, 0.2);
    t.cil(0.08, 0.1, 2.4, 8, METAL, 0, 0.6, 1.6, Math.PI / 2);
    numero(c, '602', 2.62, 0.7, 6.0, 0.7, '+x', 0xf2f2f2);
    numero(c, '602', -2.62, 0.7, 6.0, 0.7, '-x', 0xf2f2f2);
    for (const sx of [-1, 1]) c.add(new THREE.TorusGeometry(0.32, 0.07, 6, 14), 0xff6a1a, sx * 1.95, 2.6, -2.6, 0, Math.PI / 2, 0);   // boia
    c.cil(0.03, 0.03, 1.6, 4, METAL, 0, 2.4, -11.6);
    c.box(0.02, 0.5, 0.8, 0x1c2f6b, 0, 3.0, -12.0);                          // bandeira
    c.cil(0.45, 0.45, 0.35, 12, 0xe8e8e8, 0, 4.0, 0.3);                       // radar
    return { corpo: c.build(), vidro: v.build(false), torre: t.build(), torreY: 1.95, torreZ: 8.0, canoZ: 2.8, canoY: 0.6 };
  },
  lcac() {
    const c = new Mont();
    const C = 0x7d868f, C2 = 0x5f676f;
    // saia de borracha arredondada
    c.bloco(14.2, 1.9, 26, 0x24272a, 0, 0.95, 0, 0, 0, 0, 0.9);
    c.box(12.6, 0.35, 23.5, C2, 0, 1.95, 0);                                  // convés de carga
    for (const s of [-1, 1]) {
      c.bloco(2.3, 2.6, 21, C, s * 5.9, 3.3, -0.5, 0, 0, 0, 0.3);             // costados
      for (let i = 0; i < 4; i++) c.box(0.06, 0.5, 0.8, VIDRO, s * 7.07, 3.6, -7 + i * 4);
      // hélices dutadas com lemes
      c.cil(2.35, 2.35, 1.4, 18, C, s * 3.6, 4.6, -11.6, Math.PI / 2);
      c.cil(1.95, 1.95, 1.45, 16, 0x1a1a1a, s * 3.6, 4.6, -11.6, Math.PI / 2);
      c.box(0.15, 3.6, 0.9, C2, s * 3.6, 4.6, -12.7);
      c.box(0.15, 3.6, 0.9, C2, s * 2.6, 4.6, -12.7);
      // tomadas de ar
      c.bloco(1.6, 1.2, 2.4, C2, s * 5.9, 5.1, -6, 0, 0, 0, 0.3);
    }
    c.bloco(2.4, 1.6, 2.8, C, 5.9, 5.4, 6.5, 0, 0, 0, 0.3);                   // cabine de comando
    c.box(2.42, 0.5, 2.0, VIDRO, 5.9, 5.7, 7.0);
    c.box(10.5, 0.15, 2.0, 0x8a8f94, 0, 2.6, 12.0, -0.6);                     // rampa da proa
    return { corpo: c.build() };
  },
  destroier() {
    // classe Arleigh Burke: casco com proa lançada, superestrutura inclinada com radares,
    // duas chaminés, mastro treliçado, canhão de 5", células de mísseis e heliponto na popa
    const c = new Mont();
    const C = 0x7f8890, C2 = 0x667078, C3 = 0x575f66;
    c.add(casco(158, 20.4, 4.2, 5.0, { sheer: 2.2 }), C);
    c.box(18.5, 0.1, 120, 0x585e64, 0, 4.25, -10);                         // convés
    // superestrutura dianteira inclinada (perfil chanfrado)
    c.perfil([[-2, 4.2], [-2, 13.5], [12, 17.5], [24, 17.5], [27, 4.2]], 14.5, C, 0, 0.2);
    c.perfil([[8, 17.5], [10, 23], [20, 23], [22, 17.5]], 10, C, 0, 0.15);   // ponte
    c.box(9.6, 1.4, 0.15, VIDRO, 0, 21.2, 21.7, -0.35);
    for (const s of [-1, 1]) {
      // painéis octogonais do radar SPY-1
      c.cil(3.3, 3.3, 0.3, 8, 0x8c959c, s * 7.25, 13, 16, 0, 0, Math.PI / 2 + s * 0.35);
      c.cil(3.3, 3.3, 0.3, 8, 0x8c959c, s * 4.5, 13, 3.5, Math.PI / 2 - 0.35, 0, 0);
    }
    c.cil(3.3, 3.3, 0.3, 8, 0x8c959c, 0, 13.5, 24.5, -Math.PI / 2 + 0.6, 0, 0);
    // mastro treliçado com antenas
    for (const [ox, oz] of [[-1.2, -1.2], [1.2, -1.2], [-1.2, 1.2], [1.2, 1.2]]) c.box(0.25, 16, 0.25, C2, ox, 31, 10 + oz);
    for (let i = 0; i < 4; i++) c.box(2.8, 0.2, 2.8, C2, 0, 25 + i * 4, 10);
    c.box(7, 0.4, 0.4, C2, 0, 36, 10);
    c.cil(0.08, 0.08, 6, 6, METAL, 0, 42, 10);
    c.esf(0.8, BRANCO, 2.5, 34, 10);
    // chaminés gêmeas
    c.perfil([[-12, 4.2], [-11, 16], [-6, 16], [-5, 4.2]], 6, C, 0, 0.2);
    c.box(5.4, 0.6, 1.8, 0x222222, 0, 16.2, -7.8);
    c.box(5.4, 0.6, 1.8, 0x222222, 0, 16.2, -9.6);
    c.perfil([[-34, 4.2], [-33, 15], [-28, 15], [-27, 4.2]], 6, C, 0, 0.2);
    c.box(5.4, 0.6, 1.8, 0x222222, 0, 15.2, -29.8);
    c.box(5.4, 0.6, 1.8, 0x222222, 0, 15.2, -31.6);
    c.perfil([[-26, 4.2], [-26, 9], [-13, 9], [-13, 4.2]], 11, C2, 0, 0.15);
    c.perfil([[-50, 4.2], [-50, 10], [-35, 12], [-35, 4.2]], 14, C, 0, 0.15); // hangar
    // células de lançamento vertical (VLS) na proa e na popa
    for (const [z0, n] of [[34, 4], [-46, 4]]) {
      c.box(8, 0.25, n * 2.2, C3, 0, 4.35, z0);
      for (let i = 0; i < n; i++) for (let j = 0; j < 4; j++) c.box(1.6, 0.1, 1.7, 0x41474c, -3 + j * 2, 4.5, z0 - (n - 1) * 1.1 + i * 2.2);
    }
    // heliponto
    c.box(14, 0.12, 18, 0x4a4f54, 0, 4.3, -64);
    c.box(0.4, 0.05, 14, BRANCO, 0, 4.4, -64);
    c.cil(4.5, 4.5, 0.05, 24, 0xe6c23a, 0, 4.36, -64);
    c.cil(4.2, 4.2, 0.07, 24, 0x4a4f54, 0, 4.37, -64);
    // CIWS e botes
    c.cil(1.1, 1.3, 2.2, 10, BRANCO, 0, 15.2, -19); c.esf(1.1, BRANCO, 0, 16.7, -19);
    c.cil(1.1, 1.3, 2.2, 10, BRANCO, 0, 18.6, 15); c.esf(1.1, BRANCO, 0, 20, 15);
    for (const s of [-1, 1]) c.bloco(1.8, 1.0, 6, 0x2f3438, s * 6.5, 10, -20, 0, 0, 0, 0.4);
    const t = new Mont();
    // canhão Mk 45 de 5" com torre facetada
    t.perfil([[-2.2, 0], [-2.2, 1.8], [0.8, 2.2], [2.6, 1.0], [2.6, 0]], 3.6, C, 0, 0.15);
    t.cil(0.2, 0.28, 7.0, 10, C2, 0, 1.2, 5.6, Math.PI / 2);
    t.cil(0.32, 0.32, 0.6, 10, C2, 0, 1.2, 2.8, Math.PI / 2);
    // número no casco, guarda-corpos, âncoras, lançadores Harpoon, balsas salva-vidas, bandeira e antenas
    numero(c, '117', 8.4, 1.6, 52, 2.4, '+x');
    numero(c, '117', -8.4, 1.6, 52, 2.4, '-x');
    for (const sx of [-1, 1]) {
      guarda(c, sx * 9.9, -76, sx * 10.05, 20, 4.2);
      guarda(c, sx * 10.05, 20, sx * 7.5, 50, 4.2);
      guarda(c, sx * 7.5, 50, sx * 2.0, 74, 4.2 + 1.4);
      c.bloco(0.6, 1.2, 1.4, 0x2a2d30, sx * 5.2, 3.2, 66, 0, 0, 0, 0.2);   // âncora
      for (let k = 0; k < 4; k++) c.cil(0.35, 0.35, 1.6, 10, BRANCO, sx * 7.6, 9.4, -4 + k * 2.2, 0, 0, Math.PI / 2);   // balsas
      for (let k = 0; k < 4; k++) c.cil(0.22, 0.22, 3.4, 8, 0x4a5056, sx * (1.2 + k * 0.5), 6.0, -24, 0.25, 0, 0);       // Harpoon
    }
    c.cil(0.05, 0.05, 3, 4, METAL, 0, 45, 10);
    c.box(0.02, 1.0, 1.6, 0x1c2f6b, 0, 46.0, 9.1);
    c.box(0.02, 0.5, 0.8, 0xb22234, 0, 46.2, 8.7);
    for (const k of [-1, 1]) antena(c, k * 3.5, 26, 10, 4);
    return { corpo: c.build(), torre: t.build(), torreY: 4.3, torreZ: 56, canoZ: 9.2, canoY: 1.2 };
  },
  portaavioes() {
    if (window.MODELO_PORTA) return portaReal(window.MODELO_PORTA);
    const c = new Mont();
    // casco com proa afilada e alargamento sob o convés
    c.add(casco(320, 40, 8, 10, { sheer: 1 }), CINZA_N);
    c.simetrica([[33, -158], [34, -40], [32, 60], [22, 140], [12, 158]], 2.5, CINZA_N2, 5.5);
    // convoo
    c.planta([[-38, -160], [36, -160], [37, -20], [24, 160], [-24, 160], [-26, 40], [-40, -60]], 1.0, 0x45484b, 8.0);
    // linhas do convés: eixo da pista angulada, bordas tracejadas, catapultas e cabos de parada
    const DECK = 9.03, AMAR = 0xe6c23a, BR = 0xf0f0ea, VERM2 = 0xc0392b;
    const ang = -0.16, cx0 = -10, cz0 = -45, ca = Math.cos(ang), sa = Math.sin(ang);
    const pa = (a, b) => [cx0 + b * ca + a * sa, cz0 - b * sa + a * ca];
    for (let k = -100; k < 100; k += 8) { const [x, z] = pa(k, 0); c.box(0.6, 0.04, 4.5, BR, x, DECK + 0.01, z, 0, ang, 0); }
    for (const b of [-14, 14]) for (let k = -100; k < 100; k += 6) { const [x, z] = pa(k, b); c.box(0.4, 0.04, 3, BR, x, DECK, z, 0, ang, 0); }
    for (let k = 0; k < 4; k++) { const [x, z] = pa(-70 + k * 9, 0); c.box(26, 0.05, 0.25, 0x222222, x, DECK + 0.02, z, 0, ang, 0); }
    for (const x of [-6, 6, -28, -18]) c.box(0.5, 0.05, 80, 0x2b2b2b, x, DECK + 0.01, x > -10 ? 110 : 30);
    for (const x of [-6, 6]) c.box(0.3, 0.05, 80, AMAR, x + 1.2, DECK + 0.02, 110);
    c.box(0.5, 0.04, 300, AMAR, 32, DECK, 0);                   // faixa de segurança da borda
    c.box(0.5, 0.04, 300, VERM2, -36, DECK, -10, 0, 0.03, 0);
    // elevadores de aeronaves
    for (const [x, z] of [[36, -80], [36, 30], [-40, -30]]) c.box(14, 0.6, 16, 0x3e4144, x, 8.6, z);
    // número 68 pintado no convés (na proa) — segmentos
    const SEG = { 6: 'afedcg', 8: 'abcdefg' };
    const seg = (x, z, w, h, l) => {
      const p = { a: [0, h, w, 0.9], b: [w / 2, h / 2, 0.9, h / 2], c: [w / 2, -h / 2, 0.9, h / 2], d: [0, -h, w, 0.9], e: [-w / 2, -h / 2, 0.9, h / 2], f: [-w / 2, h / 2, 0.9, h / 2], g: [0, 0, w, 0.9] }[l];
      c.box(p[2], 0.05, p[3], BR, x + p[0], DECK + 0.02, z + p[1]);
    };
    for (const [d, dx] of [[6, -6], [8, 6]]) for (const l of SEG[d]) seg(dx, 128, 6, 5, l);
    // ilha (superestrutura) com degraus, janelas, número no costado e mastros
    c.box(11, 16, 30, CINZA_N, 30, 17, -30);
    c.box(10, 6, 22, CINZA_N2, 30, 27.5, -28);
    c.box(8.5, 5, 14, CINZA_N, 30, 33, -26);
    c.box(9.2, 1.4, 0.2, VIDRO, 30, 33.5, -18.95);
    for (const sx of [24.4, 35.6]) c.box(0.2, 1.2, 12, VIDRO, sx, 33.5, -26);
    for (let i = 0; i < 3; i++) c.box(10.6, 0.15, 30.4, CINZA_N2, 30, 12 + i * 5, -30);
    for (const l of SEG[6]) { const p = { a: [0, 4, 4, 0.8], b: [2, 2, 0.8, 4], c: [2, -2, 0.8, 4], d: [0, -4, 4, 0.8], e: [-2, -2, 0.8, 4], f: [-2, 2, 0.8, 4], g: [0, 0, 4, 0.8] }[l]; c.box(0.2, p[3], p[2], BR, 24.4, 22 + p[1], -36 + p[0]); }
    for (const l of SEG[8]) { const p = { a: [0, 4, 4, 0.8], b: [2, 2, 0.8, 4], c: [2, -2, 0.8, 4], d: [0, -4, 4, 0.8], e: [-2, -2, 0.8, 4], f: [-2, 2, 0.8, 4], g: [0, 0, 4, 0.8] }[l]; c.box(0.2, p[3], p[2], BR, 24.4, 22 + p[1], -30 + p[0]); }
    // mastro treliçado e radares
    for (const [ox, oz] of [[-1.5, -1.5], [1.5, -1.5], [-1.5, 1.5], [1.5, 1.5]]) c.box(0.35, 14, 0.35, CINZA_N2, 30 + ox, 42, -30 + oz);
    for (let i = 0; i < 4; i++) c.box(3.6, 0.25, 3.6, CINZA_N2, 30, 36 + i * 3.5, -30);
    c.box(8, 0.5, 0.6, CINZA_N2, 30, 47, -30);
    c.box(5, 2.2, 0.3, 0xcfd3d6, 30, 45, -24, 0, 0.3, 0);
    c.esf(1.6, BRANCO, 33, 38.5, -40);
    c.esf(1.3, BRANCO, 27, 38, -40);
    c.cil(0.2, 0.2, 6, 6, METAL, 30, 52, -30);
    // botes salva-vidas, guindaste e veículos de convés
    for (let i = 0; i < 5; i++) c.cil(0.7, 0.7, 2.5, 8, 0xdddddd, 34.5, 6, -120 + i * 12, Math.PI / 2);
    c.box(3, 1.2, 4, 0xe6c23a, 26, 9.6, -55);
    c.box(2.5, 1.6, 3.5, 0xdddddd, 20, 9.8, 10);
    c.box(2, 1.0, 3, 0xe6c23a, -20, 9.5, 70);
    // canhões CIWS e lançadores
    for (const [x, z] of [[33, 150], [-30, -150], [33, -150]]) { c.cil(1.2, 1.4, 2, 10, BRANCO, x, 10, z); c.cil(0.2, 0.2, 2.4, 6, METAL, x, 11, z + 1.4, Math.PI / 2); }
    // número no casco, guarda-corpos e caças F/A-18 de verdade estacionados no convés
    numero(c, '68', 19.5, 3.0, 125, 6.0, '+x');
    numero(c, '68', -19.5, 3.0, 125, 6.0, '-x');
    guarda(c, 37.5, -150, 37.5, -25, 9.0, 0x8a9095, 1.2);
    guarda(c, -40.5, -150, -40.5, -65, 9.0, 0x8a9095, 1.2);
    const caca = AERO.f18();
    for (let k = 0; k < 6; k++) juntaModelo(c, caca.corpo, -28 + (k % 2) * 14, 9.0, 70 + Math.floor(k / 2) * 22, Math.PI * 0.8, 1);
    for (let k = 0; k < 3; k++) juntaModelo(c, caca.corpo, 30, 9.0, 40 + k * 24, -Math.PI * 0.5, 1);
    return { corpo: c.build() };
  },
};

// ---------------- estruturas da base ----------------
const ESTR = {
  placa() {
    // placa verde de rodovia com dois postes, faixas brancas de texto e escudo da rodovia
    const c = new Mont();
    for (const sx of [-1, 1]) c.cil(0.12, 0.14, 7.5, 8, 0x8a8f92, sx * 3.4, 3.75, 0);
    c.box(7.4, 0.25, 0.25, 0x8a8f92, 0, 5.2, -0.15);
    c.bloco(8.0, 2.6, 0.12, 0x1f6b3a, 0, 6.2, 0.05, 0, 0, 0, 0.12);
    c.box(7.8, 2.4, 0.02, 0xf2f2f2, 0, 6.2, 0.12);
    c.box(7.6, 2.2, 0.03, 0x1f6b3a, 0, 6.2, 0.13);
    for (const [w, y] of [[5.2, 6.75], [4.2, 6.2], [3.0, 5.65]]) c.box(w, 0.28, 0.03, 0xf2f2f2, 0.6, y, 0.15);
    c.bloco(1.0, 1.1, 0.03, 0xf2f2f2, -3.0, 6.3, 0.15, 0, 0, 0, 0.1);
    c.bloco(0.8, 0.9, 0.035, 0x1c2f6b, -3.0, 6.3, 0.16, 0, 0, 0, 0.1);
    c.box(0.5, 0.25, 0.04, 0xf2f2f2, 3.2, 5.25, 0.15);                    // seta
    return { corpo: c.build() };
  },
  pista() {
    // pista de pouso militar com pátio de estacionamento e hangares
    const c = new Mont();
    c.box(40, 0.12, 320, 0x3b3e42, 0, 0.06, 0);
    for (let k = -140; k < 140; k += 16) c.box(0.8, 0.03, 8, 0xf0f0ea, 0, 0.14, k);
    for (const s of [-1, 1]) c.box(0.6, 0.03, 320, 0xf0f0ea, s * 18, 0.14, 0);
    for (let i = 0; i < 8; i++) for (const e of [-1, 1]) c.box(1.4, 0.03, 12, 0xf0f0ea, -14 + i * 4, 0.14, e * 150);
    c.box(50, 0.1, 140, 0x4a4d50, -45, 0.05, 80);                        // pátio dos jatos
    for (let i = 0; i < 3; i++) {
      c.perfil([[-12, 0], [-12, 6], [-6, 10], [6, 10], [12, 6], [12, 0]], 30, 0x7d8578, -85 + 0, 0.2);
    }
    c.cil(0.3, 0.4, 18, 8, METAL, -75, 9, -120);
    c.box(6, 4, 6, 0xb0b3a8, -75, 20, -120);
    c.box(6.2, 1.4, 6.2, VIDRO, -75, 21.5, -120);
    return { corpo: c.build() };
  },
  acampamento() {
    // acampamento de sobreviventes: barricada de sacos de areia e carros, barracas, caixas e fogueira
    const c = new Mont();
    const R = 13;
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2;
      if (i % 9 === 0) continue;                                    // aberturas
      const x = Math.sin(a) * R, z = Math.cos(a) * R;
      c.bloco(3.2, 0.5, 0.7, 0xa8956a, x, 0.25, z, 0, a + Math.PI / 2, 0, 0.2);
      c.bloco(2.9, 0.5, 0.7, 0x9c8a60, x, 0.72, z, 0, a + Math.PI / 2 + 0.1, 0, 0.2);
      if (i % 3 === 0) c.bloco(2.6, 0.45, 0.65, 0xb09c70, x, 1.15, z, 0, a + Math.PI / 2, 0, 0.2);
    }
    // carros virados como barricada
    for (const [x, z, a, cor] of [[R + 2, 3, 0.2, 0x8a2a24], [-R - 2, -4, -0.3, 0x2c4a7a], [3, -R - 2, 1.5, 0xd0d0d0]]) {
      c.bloco(1.8, 1.3, 4.3, cor, x, 0.65, z, 0, a, Math.PI / 2 - 0.1, 0.25);
    }
    // barracas
    for (const [x, z, a, cor] of [[-5, 3, 0.3, 0x4f7a3a], [4, 5, -0.5, 0x3a5a8a], [-2, -6, 1.2, 0xb36a2a], [6, -3, 2.0, 0x6a6a3a]]) {
      const g = new THREE.CylinderGeometry(0.01, 2.0, 2.0, 4, 1);
      c.add(g, cor, x, 1.0, z, 0, a, 0, 1.2, 1, 0.9);
    }
    // caixas, tambores e fogueira
    for (let i = 0; i < 6; i++) c.box(0.9, 0.7, 0.9, 0x7a5a36, -8 + i * 0.95, 0.35, 8 - (i % 2) * 0.9);
    for (let i = 0; i < 4; i++) c.cil(0.4, 0.4, 1.0, 10, i % 2 ? 0x2f5a8a : 0x8a3a2a, 8 + (i % 2) * 0.9, 0.5, 6 - Math.floor(i / 2) * 0.9);
    c.cil(0.9, 1.0, 0.25, 10, 0x55524c, 0, 0.12, 0);
    for (let i = 0; i < 4; i++) c.box(1.2, 0.18, 0.18, 0x4a3420, 0, 0.3, 0, 0, i * 0.8, 0);
    // varal e bandeira
    c.cil(0.06, 0.06, 4.5, 6, METAL, -9, 2.25, -5);
    c.box(0.04, 0.9, 1.4, 0xf0f0f0, -9, 4.0, -4.3);
    return { corpo: c.build() };
  },
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
  fob() {
    // posto avançado: muro de gabiões HESCO, barracas, torre de rádio e heliponto pequeno
    const c = new Mont();
    for (let i = 0; i < 32; i++) {
      const a = (i / 32) * Math.PI * 2;
      if (i % 8 === 0) continue;
      c.bloco(2.4, 2.2, 1.2, 0xc2ad82, Math.sin(a) * 26, 1.1, Math.cos(a) * 26, 0, a + Math.PI / 2, 0, 0.1);
    }
    for (const [x, z, a] of [[-8, -6, 0], [-8, 4, 0], [6, -8, 1.57], [10, 6, 0.3]]) {
      c.bloco(5, 2.6, 9, 0x6f7550, x, 1.3, z, 0, a, 0, 1.2);
    }
    c.cil(0.15, 0.25, 14, 6, METAL, 0, 7, -14);
    c.box(0.6, 1.2, 0.1, BRANCO, 0, 12, -13.8);
    c.cil(6, 6, 0.15, 20, 0x44474a, 8, 0.08, 14);
    c.box(1.0, 0.05, 4, BRANCO, 7, 0.18, 14); c.box(1.0, 0.05, 4, BRANCO, 9, 0.18, 14); c.box(2.4, 0.05, 0.8, BRANCO, 8, 0.18, 14);
    c.cil(0.08, 0.08, 6, 6, METAL, -14, 3, 10);
    c.box(0.05, 1.0, 1.6, 0x2b4a8c, -14, 5.4, 10.8);
    for (let i = 0; i < 5; i++) c.box(1.0, 0.8, 1.0, 0x6a5a3a, 14 + (i % 2), 0.4, -10 + i);
    return { corpo: c.build() };
  },
  muro() {
    const c = new Mont();
    for (let i = 0; i < 5; i++) {
      c.bloco(1.4, 2.2, 1.9, 0xc2ad82, 0, 1.1, -4 + i * 2, 0, 0, 0, 0.12);
      c.box(1.45, 0.06, 1.95, 0x77705a, 0, 2.22, -4 + i * 2);
    }
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


// ================= Rússia e China =================
const RU = 0x4b5631, RU2 = 0x3c4527, RU3 = 0x5c6740, CN = 0x58653f, CN2 = 0x48533a, CN3 = 0x6c7a52, ESC2 = 0x2b2d28;
// estrela vermelha (marca das Forças Armadas russas e do Exército de Libertação Popular)
function estrelaVerm(c, x, y, z, r, plano) { estrela(c, x, y, z, r, plano, 0xb3261e); }
function chinaMarca(c, x, y, z, r, plano) {
  estrela(c, x, y, z, r, plano, 0xc8261c);
  numero(c, '81', x + (plano === '+x' ? 0.01 : plano === '-x' ? -0.01 : 0), y - r * 0.05, z, r * 0.45, plano, 0xf2d34a);
}
// canhão de tanque com evacuador de fumos e camisa térmica
function canhao(t, comp, r, y, z, cor) {
  t.cil(r, r * 1.1, comp, 10, cor, 0, y, z + comp / 2, Math.PI / 2);
  t.cil(r * 1.5, r * 1.5, 0.7, 10, cor, 0, y, z + comp * 0.45, Math.PI / 2);
  t.cil(r * 1.15, r * 1.15, 0.25, 10, ESC2, 0, y, z + comp + 0.1, Math.PI / 2);
}
// esteiras de tanque russo/chinês: 6 rodas grandes, sem rodas de retorno aparentes
function lagartasLeste(M, comp, alt, x, larg, cor, saia = true) {
  for (const s of [-1, 1]) {
    const xx = s * x;
    M.box(larg, 0.1, comp, PRETO, xx, alt, 0);
    M.box(larg, 0.1, comp - 1.4, PRETO, xx, 0.06, 0);
    M.box(larg, alt * 0.8, 0.12, PRETO, xx, alt * 0.5, comp / 2 - 0.35, 0.65);
    M.box(larg, alt * 0.8, 0.12, PRETO, xx, alt * 0.5, -comp / 2 + 0.35, -0.65);
    const nr = 6;
    for (let i = 0; i < nr; i++) M.roda(alt * 0.4, larg * 0.9, 0x34362f, xx, alt * 0.42, -comp / 2 + 1.0 + i * (comp - 2.0) / (nr - 1));
    M.roda(alt * 0.36, larg * 0.95, 0x30312c, xx, alt * 0.66, comp / 2 - 0.3);
    M.roda(alt * 0.36, larg * 0.95, 0x30312c, xx, alt * 0.66, -comp / 2 + 0.3);
    if (saia) M.box(0.08, alt * 0.5, comp - 0.4, cor, s * (x + larg / 2 + 0.05), alt * 0.85, 0);
  }
}
// blindagem reativa (blocos) ao longo das saias
function blocosERA(c, x, y, z0, z1, n, cor) {
  for (const s of [-1, 1]) for (let i = 0; i < n; i++) c.box(0.12, 0.42, (z1 - z0) / n - 0.05, cor, s * x, y, z0 + (i + 0.5) * (z1 - z0) / n);
}

const LESTE_V = {
  t90() {
    // T-90M: casco baixo, torre com cunhas de blindagem reativa Relikt, canhão 125 mm, tambores de combustível atrás
    const c = new Mont(), C = RU, C2 = RU2;
    c.add(loftZ([
      { z: -3.45, w: 3.4, hT: 0.55, hB: 0.5, y: 1.05, n: 7 },
      { z: 2.4, w: 3.45, hT: 0.55, hB: 0.5, y: 1.05, n: 7 },
      { z: 3.45, w: 3.3, hT: 0.08, hB: 0.48, y: 0.95, n: 5 },
    ], 22), C);
    c.box(3.75, 0.08, 6.6, C2, 0, 1.58, 0);
    lagartasLeste(c, 6.9, 1.1, 1.45, 0.58, C);
    blocosERA(c, 1.82, 1.05, -2.8, 2.9, 7, C2);
    // cunha de blindagem reativa no glacis
    for (let i = 0; i < 6; i++) c.box(0.5, 0.12, 0.7, C2, -1.25 + i * 0.5, 1.2, 3.0, -0.35);
    // dois tambores de combustível atrás (marca registrada dos tanques russos)
    for (const sx of [-0.55, 0.55]) c.cil(0.3, 0.3, 1.5, 12, 0x3a4024, sx, 1.45, -3.65, 0, 0, Math.PI / 2);
    for (const sx of [-1, 1]) { c.box(0.6, 0.35, 1.7, C2, sx * 1.35, 1.75, -1.6); faroisFrente(c, 1.2, 1.25, 3.4); }
    for (const sx of [-1, 1]) estrelaVerm(c, sx * 1.89, 1.25, -1.0, 0.24, sx > 0 ? '+x' : '-x');
    const t = new Mont(); t.limpa = true;
    t.add(loftZ([
      { z: -1.9, w: 2.4, hT: 0.38, hB: 0.3, y: 0.3, n: 4 },
      { z: -0.6, w: 2.7, hT: 0.45, hB: 0.32, y: 0.32, n: 4 },
      { z: 0.9, w: 2.6, hT: 0.42, hB: 0.32, y: 0.32, n: 3.5 },
      { z: 1.6, w: 1.9, hT: 0.3, hB: 0.3, y: 0.3, n: 3 },
    ], 22), C);
    // cunhas Relikt dos dois lados do canhão
    for (const sx of [-1, 1]) {
      t.add(loftZ([{ z: 0.6, w: 0.95, hT: 0.32, hB: 0.25, y: 0.42, x: sx * 0.78, n: 6 }, { z: 2.0, w: 0.55, hT: 0.16, hB: 0.18, y: 0.4, x: sx * 0.62, n: 5 }], 10), C2);
      t.box(0.5, 0.6, 1.4, C2, sx * 1.35, 0.4, -0.9);              // caixas laterais
    }
    t.box(2.6, 0.75, 1.0, 0x3a4024, 0, 0.45, -2.3);                 // cesto/bagageiro traseiro
    canhao(t, 5.2, 0.13, 0.35, 1.6, C2);
    t.cil(0.38, 0.4, 0.3, 10, C2, 0.65, 0.95, -0.2);                // cúpula do comandante
    t.box(0.5, 0.35, 0.5, C2, 0.65, 1.25, -0.2);                    // estação de armas remota
    t.cil(0.03, 0.03, 0.9, 6, METAL, 0.65, 1.3, 0.35, Math.PI / 2);
    t.box(0.45, 0.4, 0.45, ESC2, -0.6, 0.95, 0.4);                   // mira do atirador
    antena(t, -0.9, 0.8, -1.6, 2.4);
    return { corpo: c.build(), torre: t.build(), torreY: 1.6, torreZ: 0.2, canoZ: 6.9, canoY: 0.35 };
  },
  type99() {
    // Type 99A: casco longo, torre com frente em ponta de flecha, canhão 125 mm, caixa do dissuasor a laser
    const c = new Mont(), C = CN, C2 = CN2;
    c.add(loftZ([
      { z: -3.75, w: 3.3, hT: 0.6, hB: 0.5, y: 1.1, n: 7 },
      { z: 2.6, w: 3.4, hT: 0.6, hB: 0.5, y: 1.1, n: 7 },
      { z: 3.75, w: 3.2, hT: 0.1, hB: 0.48, y: 1.0, n: 5 },
    ], 22), C);
    c.box(3.6, 0.08, 7.2, C2, 0, 1.68, 0);
    lagartasLeste(c, 7.4, 1.15, 1.42, 0.58, C);
    for (const s of [-1, 1]) for (let i = 0; i < 6; i++) c.box(0.12, 0.5, 1.05, i % 2 ? CN3 : C, s * 1.78, 1.1, -2.8 + i * 1.15);
    faroisFrente(c, 1.15, 1.35, 3.7);
    for (const sx of [-1, 1]) chinaMarca(c, sx * 1.85, 1.15, 0.6, 0.26, sx > 0 ? '+x' : '-x');
    const t = new Mont(); t.limpa = true;
    // torre de laterais retas e frente em "ponta de flecha"
    t.planta([[-1.35, -2.0], [1.35, -2.0], [1.45, 0.4], [0.4, 2.0], [-0.4, 2.0], [-1.45, 0.4]], 0.85, C, -0.05, 0.05);
    t.planta([[-1.2, -1.9], [1.2, -1.9], [1.3, 0.3], [0.35, 1.8], [-0.35, 1.8], [-1.3, 0.3]], 0.12, C2, 0.8);
    canhao(t, 5.4, 0.13, 0.4, 1.9, C2);
    t.box(0.55, 0.42, 0.7, ESC2, -1.0, 1.1, 0.0);                    // caixa do dissuasor a laser
    t.box(0.5, 0.35, 0.5, C2, 0.7, 1.1, -0.4);
    t.cil(0.035, 0.035, 1.0, 6, METAL, 0.7, 1.15, 0.3, Math.PI / 2);   // metralhadora 12,7 mm
    t.box(2.5, 0.55, 0.8, CN2, 0, 0.45, -2.3);
    for (const sx of [-1, 1]) for (let i = 0; i < 3; i++) t.cil(0.06, 0.06, 0.3, 6, METAL, sx * 1.3, 0.6 + i * 0.1, -1.2, 0.5);   // lançadores de fumaça
    antena(t, -0.9, 0.9, -1.7, 2.4);
    return { corpo: c.build(), torre: t.build(), torreY: 1.7, torreZ: 0.1, canoZ: 7.3, canoY: 0.4 };
  },
  bmp3() {
    // BMP-3: casco baixo com glacis longo, aleta anfíbia, torre com canhão 100 mm e 30 mm
    const c = new Mont(), C = RU, C2 = RU2;
    c.add(loftZ([
      { z: -3.6, w: 3.0, hT: 0.65, hB: 0.55, y: 1.2, n: 7 },
      { z: 0.4, w: 3.1, hT: 0.65, hB: 0.55, y: 1.2, n: 7 },
      { z: 2.9, w: 3.0, hT: 0.1, hB: 0.5, y: 1.05, n: 5 },
      { z: 3.6, w: 2.8, hT: 0.02, hB: 0.25, y: 0.85, n: 4 },
    ], 22), C);
    lagartasLeste(c, 6.9, 1.0, 1.42, 0.5, C);
    c.box(3.0, 0.1, 0.5, C2, 0, 1.0, 3.6, 0.4);                      // aleta anfíbia
    c.box(1.2, 1.0, 0.1, C2, -0.6, 1.2, -3.62);                      // portas traseiras
    for (const sx of [-1, 1]) { estrelaVerm(c, sx * 1.56, 1.35, -1.2, 0.22, sx > 0 ? '+x' : '-x'); c.box(0.08, 0.06, 2.8, C2, sx * 1.55, 1.8, -1.0); }
    faroisFrente(c, 1.1, 1.15, 3.55);
    numero(c, '312', 1.58, 1.4, 0.8, 0.22, '+x', 0xf0f0ea); numero(c, '312', -1.58, 1.4, 0.8, 0.22, '-x', 0xf0f0ea);
    const t = new Mont(); t.limpa = true;
    t.add(loftZ([{ z: -1.0, w: 1.9, hT: 0.35, hB: 0.3, y: 0.3, n: 4 }, { z: 0.8, w: 2.0, hT: 0.38, hB: 0.3, y: 0.3, n: 4 }, { z: 1.3, w: 1.3, hT: 0.25, hB: 0.28, y: 0.28 }], 18), C);
    t.cil(0.14, 0.15, 3.0, 10, C2, 0, 0.35, 2.6, Math.PI / 2);       // 100 mm
    t.cil(0.05, 0.05, 2.8, 8, METAL, 0.32, 0.32, 2.5, Math.PI / 2);   // 30 mm
    t.box(0.35, 0.3, 0.4, ESC2, -0.55, 0.75, 0.3);
    t.cil(0.3, 0.32, 0.2, 10, C2, 0.5, 0.72, -0.4);
    antena(t, -0.7, 0.6, -0.9, 2.2);
    return { corpo: c.build(), torre: t.build(), torreY: 1.82, torreZ: 0.6, canoZ: 4.1, canoY: 0.35 };
  },
  zbd04() {
    // ZBD-04A: casco anguloso com blindagem adicional em caixas, torre com 100 mm + 30 mm
    const c = new Mont(), C = CN, C2 = CN2;
    c.add(loftZ([
      { z: -3.4, w: 3.1, hT: 0.7, hB: 0.55, y: 1.25, n: 8 },
      { z: 1.2, w: 3.15, hT: 0.7, hB: 0.55, y: 1.25, n: 8 },
      { z: 2.8, w: 3.05, hT: 0.15, hB: 0.5, y: 1.1, n: 6 },
      { z: 3.4, w: 2.9, hT: 0.02, hB: 0.3, y: 0.9, n: 4 },
    ], 22), C);
    lagartasLeste(c, 6.7, 1.0, 1.45, 0.52, C, false);
    for (const s of [-1, 1]) for (let i = 0; i < 5; i++) c.box(0.16, 0.65, 1.15, i % 2 ? CN3 : C2, s * 1.8, 1.25, -2.6 + i * 1.25);
    c.box(1.3, 1.1, 0.1, C2, 0, 1.25, -3.42);
    faroisFrente(c, 1.1, 1.2, 3.35);
    for (const sx of [-1, 1]) chinaMarca(c, sx * 1.89, 1.3, 0.2, 0.22, sx > 0 ? '+x' : '-x');
    const t = new Mont(); t.limpa = true;
    t.planta([[-1.05, -1.1], [1.05, -1.1], [1.1, 0.7], [0.6, 1.3], [-0.6, 1.3], [-1.1, 0.7]], 0.7, C, 0, 0.04);
    t.cil(0.14, 0.15, 3.0, 10, C2, 0, 0.38, 2.7, Math.PI / 2);
    t.cil(0.05, 0.05, 2.7, 8, METAL, 0.32, 0.36, 2.55, Math.PI / 2);
    t.box(0.4, 0.35, 0.45, ESC2, -0.6, 0.85, 0.2);
    for (const sx of [-1, 1]) t.box(0.3, 0.3, 0.9, C2, sx * 1.15, 0.45, -0.2);   // mísseis HJ-73
    antena(t, -0.75, 0.7, -0.9, 2.2);
    return { corpo: c.build(), torre: t.build(), torreY: 1.95, torreZ: 0.4, canoZ: 4.2, canoY: 0.38 };
  },
  btr82() {
    // BTR-82A: 8x8 com casco de barco (proa em cunha), portas laterais entre os eixos, torre com 30 mm
    const c = new Mont(), C = RU, C2 = RU2;
    c.add(loftZ([
      { z: -3.8, w: 2.6, hT: 0.55, hB: 0.6, y: 1.55, n: 6, nB: 3 },
      { z: 2.0, w: 2.85, hT: 0.6, hB: 0.65, y: 1.55, n: 6, nB: 3 },
      { z: 3.2, w: 2.5, hT: 0.25, hB: 0.65, y: 1.45, n: 5, nB: 3 },
      { z: 3.85, w: 1.6, hT: 0.02, hB: 0.3, y: 1.15, n: 4 },
    ], 22), C);
    rodas(c, [-1.25, 1.25], [-2.7, -1.35, 1.0, 2.35], 0.6, 0.45);
    for (const sx of [-1, 1]) {
      c.box(0.08, 0.9, 1.0, C2, sx * 1.42, 1.55, -0.2);              // porta lateral
      estrelaVerm(c, sx * 1.44, 1.65, 1.6, 0.22, sx > 0 ? '+x' : '-x');
      for (let i = 0; i < 3; i++) c.cil(0.08, 0.08, 0.05, 8, VIDRO, sx * 1.33, 1.95, -2.6 + i * 1.6, 0, 0, Math.PI / 2);   // seteiras
    }
    numero(c, '243', 1.44, 1.5, -2.0, 0.22, '+x', 0xf0f0ea); numero(c, '243', -1.44, 1.5, -2.0, 0.22, '-x', 0xf0f0ea);
    faroisFrente(c, 0.6, 1.5, 3.7); antena(c, -1.0, 2.15, -3.0, 2.6);
    const t = new Mont(); t.limpa = true;
    t.cil(0.65, 0.75, 0.55, 10, C, 0, 0.27, 0);
    t.cil(0.06, 0.07, 2.4, 8, METAL, 0.08, 0.35, 1.7, Math.PI / 2);
    t.cil(0.03, 0.03, 0.9, 6, METAL, -0.25, 0.32, 1.0, Math.PI / 2);
    t.box(0.3, 0.3, 0.3, ESC2, -0.45, 0.6, 0.2);
    return { corpo: c.build(), torre: t.build(), torreY: 2.15, torreZ: 1.0, canoZ: 2.9, canoY: 0.35 };
  },
  zbl08() {
    // ZBL-08: 8x8 de laterais retas e frente inclinada, torre de 30 mm
    const c = new Mont(), C = CN, C2 = CN2;
    c.add(loftZ([
      { z: -3.9, w: 2.95, hT: 0.8, hB: 0.7, y: 1.6, n: 8 },
      { z: 2.3, w: 3.0, hT: 0.8, hB: 0.72, y: 1.6, n: 8 },
      { z: 3.5, w: 2.9, hT: 0.2, hB: 0.7, y: 1.5, n: 6 },
      { z: 4.0, w: 2.6, hT: 0.02, hB: 0.35, y: 1.15, n: 4 },
    ], 22), C);
    rodas(c, [-1.3, 1.3], [-2.9, -1.5, 1.0, 2.4], 0.6, 0.48);
    c.box(1.4, 1.3, 0.1, C2, 0, 1.6, -3.92);
    for (const sx of [-1, 1]) { chinaMarca(c, sx * 1.5, 1.8, -1.5, 0.24, sx > 0 ? '+x' : '-x'); for (let i = 0; i < 4; i++) c.box(0.1, 0.45, 1.3, C2, sx * 1.52, 1.25, -2.8 + i * 1.6); }
    faroisFrente(c, 0.9, 1.5, 3.9); antena(c, 1.1, 2.4, -3.3, 2.6);
    const t = new Mont(); t.limpa = true;
    t.planta([[-0.85, -0.9], [0.85, -0.9], [0.9, 0.5], [0.45, 1.0], [-0.45, 1.0], [-0.9, 0.5]], 0.6, C, 0, 0.04);
    t.cil(0.06, 0.07, 2.4, 8, METAL, 0, 0.32, 2.1, Math.PI / 2);
    t.box(0.3, 0.3, 0.35, ESC2, -0.5, 0.75, 0.2);
    return { corpo: c.build(), torre: t.build(), torreY: 2.4, torreZ: 0.6, canoZ: 3.3, canoY: 0.32 };
  },
  tigr() {
    // GAZ Tigr: jipe blindado russo, capô alto com grade vertical, cabine quadrada de janelas pequenas
    const c = new Mont(), v = new Mont(), C = RU, C2 = RU2;
    c.box(2.2, 0.5, 5.3, C2, 0, 0.75, 0);
    c.add(loftZ([
      { z: -2.7, w: 2.35, hT: 0.95, hB: 0.3, y: 1.35, n: 6 },
      { z: 0.6, w: 2.4, hT: 0.95, hB: 0.3, y: 1.35, n: 6 },
      { z: 0.9, w: 2.35, hT: 0.35, hB: 0.3, y: 1.3, n: 5 },
      { z: 2.85, w: 2.2, hT: 0.25, hB: 0.3, y: 1.25, n: 5 },
    ], 20), C);
    c.box(1.6, 0.5, 0.08, ESC2, 0, 1.15, 2.88);                      // grade vertical
    for (const sx of [-1, 1]) { v.box(0.04, 0.42, 0.75, VIDRO, sx * 1.2, 1.95, 0.1); v.box(0.04, 0.42, 0.55, VIDRO, sx * 1.2, 1.95, -1.1); estrelaVerm(c, sx * 1.21, 1.5, -1.9, 0.18, sx > 0 ? '+x' : '-x'); }
    v.box(1.8, 0.45, 0.05, VIDRO, 0, 1.95, 0.66);
    rodas(c, [-1.0, 1.0], [-1.75, 1.75], 0.55, 0.38);
    faroisFrente(c, 0.8, 1.3, 2.88);
    c.box(0.9, 0.12, 0.9, C2, 0, 2.38, -0.5);
    const t = new Mont(); t.limpa = true;
    t.box(0.5, 0.35, 0.5, C2, 0, 0.18, 0);
    t.cil(0.035, 0.035, 1.1, 6, METAL, 0, 0.25, 0.75, Math.PI / 2);
    return { corpo: c.build(), vidro: v.build(false), torre: t.build(), torreY: 2.44, torreZ: -0.5, canoZ: 1.3, canoY: 0.25 };
  },
  mengshi() {
    // Dongfeng Mengshi: parecido com o Humvee, cabine mais alta e capô com grade larga
    const c = new Mont(), v = new Mont(), C = CN, C2 = CN2;
    c.box(2.0, 0.45, 4.6, C2, 0, 0.72, 0);
    c.add(loftZ([
      { z: -2.4, w: 2.2, hT: 0.85, hB: 0.32, y: 1.2, n: 7 },
      { z: 0.5, w: 2.25, hT: 0.88, hB: 0.34, y: 1.2, n: 7 },
      { z: 0.8, w: 2.22, hT: 0.32, hB: 0.34, y: 1.15, n: 6 },
      { z: 2.35, w: 2.15, hT: 0.24, hB: 0.32, y: 1.1, n: 6 },
    ], 20), C);
    c.box(1.7, 0.4, 0.08, ESC2, 0, 1.05, 2.38);
    for (const sx of [-1, 1]) { v.box(0.04, 0.45, 0.85, VIDRO, sx * 1.13, 1.75, 0.0); v.box(0.04, 0.45, 0.85, VIDRO, sx * 1.13, 1.75, -1.15); chinaMarca(c, sx * 1.14, 1.3, -1.9, 0.17, sx > 0 ? '+x' : '-x'); }
    v.box(1.8, 0.45, 0.05, VIDRO, 0, 1.75, 0.56);
    rodas(c, [-0.95, 0.95], [-1.55, 1.55], 0.52, 0.38);
    faroisFrente(c, 0.8, 1.15, 2.38);
    const t = new Mont(); t.limpa = true;
    t.cil(0.4, 0.45, 0.3, 10, C2, 0, 0.15, 0);
    t.cil(0.035, 0.035, 1.1, 6, METAL, 0, 0.35, 0.7, Math.PI / 2);
    t.box(0.5, 0.35, 0.06, C2, 0, 0.45, 0.25);
    return { corpo: c.build(), vidro: v.build(false), torre: t.build(), torreY: 2.1, torreZ: -0.5, canoZ: 1.25, canoY: 0.35 };
  },
};

const LESTE_A = {
  ka52() {
    // Ka-52 Alligator: rotores coaxiais (sem rotor de cauda), cabine lado a lado, cauda com duas derivas
    const c = new Mont(), v = new Mont(), C = 0x4e5a40, C2 = 0x3e4834;
    c.add(loftZ([
      { z: -7.4, w: 0.4, hT: 0.3, hB: 0.25, y: 2.0 },
      { z: -3.5, w: 0.75, hT: 0.55, hB: 0.45, y: 1.9 },
      { z: -1.2, w: 1.5, hT: 0.95, hB: 0.75, y: 1.85, n: 3 },
      { z: 1.8, w: 1.6, hT: 0.95, hB: 0.75, y: 1.8, n: 3 },
      { z: 3.4, w: 1.4, hT: 0.65, hB: 0.65, y: 1.65, n: 2.6 },
      { z: 4.7, w: 0.7, hT: 0.3, hB: 0.4, y: 1.45 },
    ], 20), C);
    v.add(loftZ([{ z: 1.2, w: 1.45, hT: 0.65, hB: 0.05, y: 2.55, n: 3 }, { z: 2.6, w: 1.4, hT: 0.55, hB: 0.05, y: 2.45, n: 2.8 }, { z: 3.7, w: 1.1, hT: 0.3, hB: 0.05, y: 2.2 }], 16), VIDRO);
    for (const sx of [-1, 1]) {
      casulo(c, [[-2.4, 0.25], [-1.9, 0.42], [0.4, 0.42], [0.9, 0.28]], C2, sx * 0.95, 2.7, -0.6);
      c.add(asa({ p: [sx * 0.75, 1.75, 0.6], corda: 1.2, esp: 0.14 }, { p: [sx * 3.0, 1.6, 0.5], corda: 0.9, esp: 0.12 }), C2);
      casulo(c, [[-0.9, 0.24], [-0.7, 0.32], [0.7, 0.32], [0.9, 0.25]], 0x55593f, sx * 2.0, 1.35, 0.5);
      casulo(c, [[-0.9, 0.12], [-0.7, 0.16], [0.9, 0.16], [1.1, 0.04]], 0x6b6d58, sx * 2.8, 1.35, 0.5);
      c.add(asa({ p: [sx * 0.2, 2.1, -7.0], corda: 1.1, esp: 0.1 }, { p: [sx * 1.3, 2.1, -7.2], corda: 0.9, esp: 0.08 }), C);
      c.add(asa({ p: [sx * 1.3, 1.6, -6.9], corda: 1.0, esp: 0.1 }, { p: [sx * 1.3, 3.2, -7.4], corda: 0.7, esp: 0.08 }), C);   // derivas
      c.cil(0.05, 0.05, 1.1, 6, METAL, sx * 0.85, 0.65, 2.6, 0, 0, sx * 0.35);
      c.roda(0.3, 0.2, PNEU, sx * 1.1, 0.3, 2.6);
      estrelaVerm(c, sx * 0.21, 2.0, -5.5, 0.25, sx > 0 ? '+x' : '-x');
    }
    c.cil(0.05, 0.05, 2.0, 6, METAL, 0.8, 1.35, 2.0, Math.PI / 2);      // canhão 30 mm lateral
    c.esf(0.35, ESC2, 0, 1.2, 4.6);                                      // torreta de sensores
    c.cil(0.28, 0.32, 1.6, 12, C2, 0, 3.4, 0.4);                         // mastro dos rotores
    c.roda(0.2, 0.15, PNEU, 0, 0.25, -6.6);
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(3, 7.25, 0x2a2a2a, 0.55), rotorY: 4.35, rotorZ: 0.4, rotor2: rotor(3, 7.25, 0x2a2a2a, 0.55), rotor2Y: 3.5, rotor2Z: 0.4, armaZ: 4.6, armaY: 1.2 };
  },
  z10() {
    // Z-10: helicóptero de ataque chinês, fuselagem estreita e angulosa, cabines em tandem, rotor de 5 pás
    const c = new Mont(), v = new Mont(), C = 0x5d6a52, C2 = 0x4c5844;
    c.add(loftZ([
      { z: -8.6, w: 0.25, hT: 0.25, hB: 0.2, y: 2.05 },
      { z: -4.0, w: 0.55, hT: 0.5, hB: 0.4, y: 1.92, n: 4 },
      { z: -1.4, w: 0.95, hT: 0.85, hB: 0.6, y: 1.84, n: 5 },
      { z: 1.6, w: 0.95, hT: 0.85, hB: 0.6, y: 1.8, n: 5 },
      { z: 3.6, w: 0.75, hT: 0.55, hB: 0.5, y: 1.65, n: 4 },
      { z: 5.0, w: 0.3, hT: 0.15, hB: 0.25, y: 1.5 },
    ], 18), C);
    v.add(loftZ([{ z: 0.3, w: 0.85, hT: 0.65, hB: 0.05, y: 2.55, n: 4 }, { z: 1.8, w: 0.85, hT: 0.55, hB: 0.05, y: 2.5, n: 4 }, { z: 2.4, w: 0.8, hT: 0.4, hB: 0.05, y: 2.35, n: 4 }, { z: 3.8, w: 0.6, hT: 0.35, hB: 0.05, y: 2.15 }], 14), VIDRO);
    for (const sx of [-1, 1]) {
      casulo(c, [[-2.6, 0.2], [-2.1, 0.4], [0.3, 0.4], [0.8, 0.26]], C2, sx * 0.8, 2.6, -0.5);
      c.add(asa({ p: [sx * 0.6, 1.95, 1.0], corda: 1.0, esp: 0.12 }, { p: [sx * 2.6, 1.8, 0.9], corda: 0.75, esp: 0.1 }), C2);
      for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) casulo(c, [[-0.8, 0.02], [-0.6, 0.09], [0.6, 0.09], [0.85, 0.01]], 0x7a7a52, sx * (1.75 + i * 0.24), 1.6 - j * 0.22, 0.8, 1, 1, 8);
      casulo(c, [[-0.9, 0.22], [-0.7, 0.3], [0.7, 0.3], [0.9, 0.24]], 0x55593f, sx * 2.5, 1.62, 0.6);
      c.roda(0.28, 0.18, PNEU, sx * 0.95, 0.28, 2.4);
      c.cil(0.05, 0.05, 1.0, 6, METAL, sx * 0.8, 0.6, 2.4, 0, 0, sx * 0.3);
      chinaMarca(c, sx * 0.29, 2.0, -5.5, 0.24, sx > 0 ? '+x' : '-x');
    }
    c.add(asa({ p: [0, 2.15, -7.9], corda: 1.3, esp: 0.12 }, { p: [0, 3.9, -8.7], corda: 0.9, esp: 0.1 }), C);
    asas(c, { p: [0.1, 1.95, -7.6], corda: 0.8, esp: 0.1 }, { p: [1.4, 1.95, -7.8], corda: 0.6, esp: 0.08 }, C);
    c.cil(0.05, 0.05, 1.5, 6, METAL, 0, 1.05, 4.6, Math.PI / 2);          // canhão 23 mm
    c.esf(0.3, ESC2, 0, 1.25, 5.0);
    c.cil(0.2, 0.26, 0.8, 8, C2, 0, 3.4, 0.1);
    c.roda(0.18, 0.12, PNEU, 0, 0.2, -7.8);
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(5, 6.5), rotorY: 3.95, rotorZ: 0.1, cauda: rotorCauda(1.2), caudaPos: [0.25, 3.0, -8.7], caudaEixo: 'x', armaZ: 4.9, armaY: 1.05 };
  },
  mi8() {
    // Mi-8AMTSh: fuselagem longa com nariz envidraçado, tanques externos, portas traseiras em concha, rotor de 5 pás
    const c = new Mont(), v = new Mont(), C = 0x56613f, C2 = 0x454f33;
    c.add(loftZ([
      { z: -12.0, w: 0.3, hT: 0.3, hB: 0.2, y: 2.9 },
      { z: -7.5, w: 0.6, hT: 0.5, hB: 0.4, y: 2.6 },
      { z: -4.0, w: 2.2, hT: 1.1, hB: 0.95, y: 2.05, n: 3, nB: 5 },
      { z: 3.0, w: 2.35, hT: 1.15, hB: 0.95, y: 2.0, n: 3, nB: 5 },
      { z: 5.0, w: 2.1, hT: 1.0, hB: 0.9, y: 1.95, n: 2.8 },
      { z: 6.4, w: 1.6, hT: 0.7, hB: 0.75, y: 1.8, n: 2.4 },
      { z: 7.1, w: 0.8, hT: 0.3, hB: 0.4, y: 1.6 },
    ], 22), C);
    v.add(loftZ([{ z: 5.3, w: 1.9, hT: 0.85, hB: 0.2, y: 2.1, n: 2.6 }, { z: 6.5, w: 1.45, hT: 0.55, hB: 0.3, y: 1.85, n: 2.4 }, { z: 7.15, w: 0.75, hT: 0.25, hB: 0.3, y: 1.62 }], 16), VIDRO);
    c.add(loftZ([{ z: -3.0, w: 1.6, hT: 0.65, hB: 0.1, y: 3.15, n: 3 }, { z: 4.2, w: 1.7, hT: 0.65, hB: 0.1, y: 3.15, n: 3 }, { z: 5.2, w: 1.0, hT: 0.3, hB: 0.1, y: 3.1 }], 16), C2);
    for (const sx of [-1, 1]) {
      for (let i = 0; i < 5; i++) v.cil(0.22, 0.22, 0.05, 10, VIDRO, sx * 1.18, 2.5, -3.0 + i * 1.3, 0, 0, Math.PI / 2);   // janelas redondas
      casulo(c, [[-1.4, 0.2], [-1.0, 0.45], [1.2, 0.45], [1.6, 0.2]], C2, sx * 1.45, 1.55, 0.5);   // tanques externos
      c.add(asa({ p: [sx * 1.2, 2.1, -1.2], corda: 0.9, esp: 0.12 }, { p: [sx * 2.8, 1.9, -1.25], corda: 0.7, esp: 0.1 }), C2);
      casulo(c, [[-0.9, 0.22], [-0.7, 0.3], [0.7, 0.3], [0.9, 0.24]], 0x55593f, sx * 2.6, 1.6, -1.2);
      c.cil(0.06, 0.06, 1.0, 6, METAL, sx * 1.3, 0.55, 4.5, 0, 0, sx * 0.4);
      c.roda(0.35, 0.25, PNEU, sx * 1.6, 0.35, 4.5);
      c.roda(0.38, 0.28, PNEU, sx * 1.7, 0.38, -1.5);
      estrelaVerm(c, sx * 0.35, 2.85, -8.0, 0.32, sx > 0 ? '+x' : '-x');
    }
    c.box(2.2, 1.6, 0.1, C2, 0, 1.75, -4.05);                          // portas traseiras
    c.add(asa({ p: [0, 3.0, -11.0], corda: 1.4, esp: 0.12 }, { p: [0, 4.3, -11.8], corda: 0.9, esp: 0.1 }), C);
    asas(c, { p: [0.1, 2.75, -10.2], corda: 0.8, esp: 0.1 }, { p: [1.6, 2.75, -10.3], corda: 0.6, esp: 0.08 }, C);
    c.cil(0.26, 0.32, 0.55, 12, C2, 0, 3.95, 0.5);
    return { corpo: c.build(), vidro: v.build(false), rotor: rotor(5, 10.6, 0x2a2a2a, 0.55), rotorY: 4.35, rotorZ: 0.5, cauda: rotorCauda(1.9), caudaPos: [-0.35, 4.0, -11.9], caudaEixo: 'x' };
  },
  z20() {
    // Z-20: helicóptero médio chinês, da mesma família de forma do Black Hawk, pintado de cinza-esverdeado
    return AERO.blackhawk({ C: 0x6c7766, C2: 0x5a6555, marca: (c, sx) => chinaMarca(c, sx * 0.31, 2.2, -6.6, 0.26, sx > 0 ? '+x' : '-x') });
  },
};
// jatos russos e chineses: variantes dos jatos do jogo com a pintura e as marcas da nação
Object.assign(LESTE_A, {
  su57() { return comPintura(0x7f93a8, 'russia', () => AERO.f22()); },    // Su-57: cinza-azulado
  su25() { return comPintura(0x6f7a50, 'russia', () => AERO.a10()); },    // Su-25: verde-oliva
  j20() { return comPintura(0x4f565e, 'china', () => AERO.f35()); },      // J-20: cinza-escuro
  j16() { return comPintura(0x8d99a6, 'china', () => AERO.f18()); },      // J-16: cinza-claro
});
Object.assign(VEIC, LESTE_V);
Object.assign(AERO, LESTE_A);

for (const k in VEIC) { if (k === 'abrams') continue; const f = VEIC[k]; VEIC[k] = () => { SUJAR = true; try { return f(); } finally { SUJAR = false; } }; }
const TODOS = Object.assign({}, VEIC, AERO, NAVAL, ESTR);

// porta-aviões USS Enterprise (CVN-80) a partir do modelo 3D com textura (www/modelos/porta.js)
function portaReal(M) {
  const b64 = (t) => { const b = atob(t), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; };
  const malhas = [];
  for (const pt of M.partes) {
    const P = new Int16Array(b64(pt.p)), N = new Int8Array(b64(pt.n)), U = new Int16Array(b64(pt.uv));
    const pos = new Float32Array(P.length), nor = new Float32Array(N.length), uv = new Float32Array(U.length);
    for (let i = 0; i < P.length; i++) { pos[i] = P[i] / 100; nor[i] = N[i] / 127; }
    const ku = pt.uvs / 32767;
    for (let i = 0; i < U.length; i++) uv[i] = U[i] * ku;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(new THREE.BufferAttribute(pt.i32 ? new Uint32Array(b64(pt.i)) : new Uint16Array(b64(pt.i)), 1));
    g.computeBoundingSphere();
    const tex = new THREE.TextureLoader().load(pt.tex);
    tex.colorSpace = THREE.SRGBColorSpace; tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.anisotropy = QUAL === 0 ? 2 : 8;
    const op = pt.alfa ? { alphaTest: 0.5, side: THREE.DoubleSide } : {};
    const mat = QUAL === 0
      ? new THREE.MeshLambertMaterial({ map: tex, ...op })
      : new THREE.MeshStandardMaterial({ map: tex, roughness: 0.78, metalness: 0.15, envMapIntensity: 0.6, ...op });
    malhas.push({ geo: g, mat, semSombra: pt.alfa });
  }
  return { malhas, deck: M.deck, real: true };
}

// helicópteros com modelo 3D texturizado (www/modelos/helis.js): corpo, rotores e rotor de cauda separados
const _texHeli = {};
function heliReal(nome, extra) {
  const M = window.MODELOS_HELIS && window.MODELOS_HELIS[nome];
  if (!M) return null;
  const b64 = (t) => { const b = atob(t), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; };
  const mats = {};
  const material = (tex, vidro) => {
    const k = vidro ? '#vidro' : tex || '#cinza';
    if (mats[k]) return mats[k];
    if (vidro) return (mats[k] = QUAL === 0 ? new THREE.MeshLambertMaterial({ color: 0x1c2833 })
      : new THREE.MeshStandardMaterial({ color: 0x1a2632, roughness: 0.08, metalness: 0.85, envMapIntensity: 1.4, side: THREE.DoubleSide }));
    let map = null;
    if (tex) {
      const kt = nome + '/' + tex;
      map = _texHeli[kt] || (_texHeli[kt] = new THREE.TextureLoader().load(M.texturas[tex]));
      map.colorSpace = THREE.SRGBColorSpace; map.wrapS = map.wrapT = THREE.RepeatWrapping; map.anisotropy = QUAL === 0 ? 2 : 4;
    }
    const op = { map, color: tex ? 0xffffff : 0x55595d, side: THREE.DoubleSide };
    // sem o reflexo do céu (qualidade baixa) a pintura cinza fica escura demais: clareia um pouco
    if (QUAL === 0 && tex) op.color = new THREE.Color(1.3, 1.3, 1.3);
    return (mats[k] = QUAL === 0 ? new THREE.MeshLambertMaterial(op) : new THREE.MeshStandardMaterial({ ...op, roughness: 0.66, metalness: 0.22, envMapIntensity: 0.7 }));
  };
  const def = { ...extra, malhas: [] };
  for (const pt of M.partes) {
    const P = new Int16Array(b64(pt.p)), U = new Int16Array(b64(pt.uv));
    const pos = new Float32Array(P.length), uv = new Float32Array(U.length);
    for (let i = 0; i < P.length; i++) pos[i] = P[i] / 1000;
    for (let i = 0; i < U.length; i++) uv[i] = U[i] / 4096;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setIndex(new THREE.BufferAttribute(pt.i32 ? new Uint32Array(b64(pt.i)) : new Uint16Array(b64(pt.i)), 1));
    g.computeVertexNormals(); g.computeBoundingSphere();
    const m = { geo: g, mat: material(pt.tex, pt.vidro) };
    if (pt.peca === 'corpo') def.malhas.push(m);
    else (def[pt.peca + 'Malhas'] || (def[pt.peca + 'Malhas'] = [])).push(m);
  }
  const pv = M.pivos;
  if (pv.rotor) { def.rotor = true; [def.rotorX, def.rotorY, def.rotorZ] = pv.rotor; }
  if (pv.rotor2) { def.rotor2 = true; [def.rotor2X, def.rotor2Y, def.rotor2Z] = pv.rotor2; }
  if (pv.cauda) { def.cauda = true; def.caudaPos = pv.cauda; def.caudaEixo = 'x'; }
  def.real = true;
  return def;
}

// cria o objeto 3D de um tipo; devolve {grupo, torre, rotor, rotor2, cauda, nacele...}
// modelos provisórios das unidades russas e chinesas ainda não modeladas
const PROVISORIO = {};
export function criarModelo(nome) {
  if (!TODOS[nome] && PROVISORIO[nome]) nome = PROVISORIO[nome];
  const def = cache['_d_' + nome] || (cache['_d_' + nome] = TODOS[nome]());
  const grupo = new THREE.Group();
  const r = { grupo, def };
  if (def.corpo) grupo.add(new THREE.Mesh(def.corpo, matCorpo()));
  for (const m of def.malhas || []) { const o = new THREE.Mesh(m.geo, m.mat); o.userData.semSombra = m.semSombra; grupo.add(o); }
  if (def.vidro) grupo.add(new THREE.Mesh(def.vidro, matVidro()));
  if (def.torre) {
    const t = new THREE.Mesh(def.torre, matCorpo());
    t.position.set(0, def.torreY, def.torreZ);
    grupo.add(t); r.torre = t;
  }
  // peça móvel: uma malha (modelos feitos no jogo) ou várias texturizadas (modelos 3D importados)
  const movel = (geo, malhas) => {
    if (!malhas) return new THREE.Mesh(geo, MAT_ROTOR);
    const g = new THREE.Group();
    for (const m of malhas) g.add(new THREE.Mesh(m.geo, m.mat));
    return g;
  };
  if (def.rotor && !def.nacele) {
    const ro = movel(def.rotor, def.rotorMalhas);
    ro.position.set(def.rotorX || 0, def.rotorY, def.rotorZ);
    grupo.add(ro); r.rotor = ro;
  }
  if (def.rotor2) {
    const ro = movel(def.rotor2, def.rotor2Malhas);
    ro.position.set(def.rotor2X || 0, def.rotor2Y, def.rotor2Z);
    grupo.add(ro); r.rotor2 = ro;
  }
  if (def.cauda) {
    const ca = movel(def.cauda, def.caudaMalhas);
    ca.position.set(...def.caudaPos);
    grupo.add(ca); r.cauda = ca;
  }
  if (def.helice) {
    const h = new THREE.Mesh(def.helice, MAT_ROTOR);
    h.position.set(0, def.heliceY, def.heliceZ);
    h.rotation.x = Math.PI / 2;
    grupo.add(h); r.helice = h;
  }
  if (def.motorZ !== undefined && !def.semChama) {
    // chama do pós-combustor: cones aditivos com anéis (diamantes de choque)
    const R = def.chamaR || 0.5;
    const g = new THREE.ConeGeometry(R, R * 8, 12, 1, true);
    g.rotateX(-Math.PI / 2); g.translate(0, 0, -R * 4);
    const mat = new THREE.MeshBasicMaterial({ color: 0xff9a50, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false });
    const g2 = new THREE.ConeGeometry(R * 0.7, R * 5, 12, 1, true);
    g2.rotateX(-Math.PI / 2); g2.translate(0, 0, -R * 2.5);
    const mat2 = new THREE.MeshBasicMaterial({ color: 0x9fc8ff, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    const g3 = new THREE.TorusGeometry(R * 0.45, R * 0.12, 6, 12);
    const mat3 = new THREE.MeshBasicMaterial({ color: 0xffe0b0, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false });
    r.chamas = [];
    for (const x of def.motores || [0]) {
      const a = new THREE.Mesh(g, mat), b = new THREE.Mesh(g2, mat2);
      a.position.set(x, def.motorY, def.motorZ); b.position.set(x, def.motorY, def.motorZ);
      grupo.add(a); grupo.add(b);
      r.chamas.push(a, b);
      for (let k = 1; k <= 3; k++) { const t = new THREE.Mesh(g3, mat3); t.position.set(x, def.motorY, def.motorZ - k * R * 1.6); grupo.add(t); r.chamas.push(t); }
    }
  }
  if (def.trem) {
    r.trem = new THREE.Mesh(def.trem, matCorpo());
    grupo.add(r.trem);
  }
  if (def.nacele) {
    r.naceles = [];
    for (const s of [-1, 1]) {
      const piv = new THREE.Group();
      piv.position.set(s * def.naceleX, def.naceleY, 0.6);
      const n = new THREE.Mesh(def.nacele, matCorpo());
      piv.add(n);
      const ro = new THREE.Mesh(def.rotor, MAT_ROTOR);
      ro.position.set(0, 2.65, 0);
      piv.add(ro);
      grupo.add(piv);
      r.naceles.push({ piv, ro });
    }
  }
  grupo.traverse((o) => { if (o.isMesh) { o.castShadow = !o.userData.semSombra; o.receiveShadow = true; } });
  return r;
}

// marcador de seleção (anel)
export function criarAnel(raio, cor = 0x4cff6a) {
  const g = new THREE.RingGeometry(raio * 0.86, raio, 28).rotateX(-Math.PI / 2);
  const m = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: cor, transparent: true, opacity: 0.85, depthWrite: false }));
  m.renderOrder = 3;
  return m;
}
