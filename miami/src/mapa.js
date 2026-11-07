// Mapa real de Miami: grade de terreno, prédios em 3D, água, satélite e palmeiras
import * as THREE from 'three';
import { META, GRADE_RLE, PREDIOS } from './dados_mapa.js';

export const MPP = META.mpp;                 // metros por pixel (z17)
export const CEL = META.cel * MPP;           // tamanho da célula da grade (m)
export const GW = META.gw, GH = META.gh;
export const LARG = GW * CEL, ALT = GH * CEL; // tamanho do mapa em metros
export const T = { AGUA: 0, CHAO: 1, RUA: 2, PARQUE: 3, AREIA: 4, PREDIO: 5, PONTE: 6 };

function b64(s) {
  const bin = atob(s), u = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  return u;
}

// ---------------- grade ----------------
export const grade = new Uint8Array(GW * GH);
{
  const r = b64(GRADE_RLE);
  let p = 0;
  for (let i = 0; i < r.length; i += 2) { grade.fill(r[i], p, p + r[i + 1]); p += r[i + 1]; }
}
export const predioId = new Int32Array(GW * GH).fill(-1);

export function cel(x, z) {
  const cx = Math.floor(x / CEL), cz = Math.floor(z / CEL);
  if (cx < 0 || cz < 0 || cx >= GW || cz >= GH) return -1;
  return cz * GW + cx;
}
export function tipo(x, z) { const c = cel(x, z); return c < 0 ? T.AGUA : grade[c]; }
export function andavel(x, z) {
  const c = cel(x, z);
  if (c < 0) return false;
  const t = grade[c];
  return t !== T.AGUA && predioId[c] < 0;
}
export function agua(x, z) { const c = cel(x, z); return c < 0 || grade[c] === T.AGUA || grade[c] === T.PONTE; }
export function predioEm(x, z) { const c = cel(x, z); return c < 0 ? null : (predioId[c] >= 0 ? predios[predioId[c]] : null); }

export const lugares = {};
for (const k in META.lugares) {
  const [nome, px, py] = META.lugares[k];
  lugares[k] = { nome, x: px * MPP, z: py * MPP };
}

// ---------------- prédios ----------------
export const predios = [];
{
  const u8 = b64(PREDIOS);
  const a = new Uint16Array(u8.buffer, u8.byteOffset, u8.byteLength / 2);
  let i = 0;
  while (i < a.length) {
    const n = a[i], h = a[i + 1] / 4;
    const pts = new Float32Array(n * 2);
    for (let k = 0; k < n; k++) { pts[k * 2] = a[i + 2 + k * 2] / 2 * MPP; pts[k * 2 + 1] = a[i + 3 + k * 2] / 2 * MPP; }
    i += 2 + n * 2;
    // garante orientação (área com sinal negativa) para as paredes ficarem para fora
    let s = 0;
    for (let k = 0; k < n; k++) { const j = (k + 1) % n; s += pts[k * 2] * pts[j * 2 + 1] - pts[j * 2] * pts[k * 2 + 1]; }
    if (s > 0) {
      for (let k = 0; k < n / 2; k++) {
        const j = n - 1 - k;
        let t = pts[k * 2]; pts[k * 2] = pts[j * 2]; pts[j * 2] = t;
        t = pts[k * 2 + 1]; pts[k * 2 + 1] = pts[j * 2 + 1]; pts[j * 2 + 1] = t;
      }
    }
    const area = Math.abs(s) / 2;
    let cx = 0, cz = 0, x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
    for (let k = 0; k < n; k++) {
      const x = pts[k * 2], z = pts[k * 2 + 1];
      cx += x; cz += z;
      if (x < x0) x0 = x; if (x > x1) x1 = x; if (z < z0) z0 = z; if (z > z1) z1 = z;
    }
    cx /= n; cz /= n;
    predios.push({
      id: predios.length, pts, h, area, cx, cz, x0, x1, z0, z1,
      raio: Math.max(x1 - x0, z1 - z0) / 2,
      cap: Math.max(4, Math.min(20, Math.round(area / 60))),
      guarnicao: [], civis: 0, sos: false, integridade: 100, removido: false,
    });
  }
}

export function dentroPoligono(p, x, z) {
  const pts = p.pts, n = pts.length / 2;
  let dentro = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = pts[i * 2], zi = pts[i * 2 + 1], xj = pts[j * 2], zj = pts[j * 2 + 1];
    if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) dentro = !dentro;
  }
  return dentro;
}

// pinta os prédios na grade (para colisão e para tocar num prédio)
export function rasterizarPredios() {
  predioId.fill(-1);
  for (const p of predios) {
    if (p.removido) continue;
    const cz0 = Math.max(0, Math.floor(p.z0 / CEL)), cz1 = Math.min(GH - 1, Math.floor(p.z1 / CEL));
    const cx0 = Math.max(0, Math.floor(p.x0 / CEL)), cx1 = Math.min(GW - 1, Math.floor(p.x1 / CEL));
    let marcou = false;
    for (let cz = cz0; cz <= cz1; cz++) {
      const z = (cz + 0.5) * CEL;
      for (let cx = cx0; cx <= cx1; cx++) {
        if (dentroPoligono(p, (cx + 0.5) * CEL, z)) { predioId[cz * GW + cx] = p.id; marcou = true; }
      }
    }
    if (!marcou) { const c = cel(p.cx, p.cz); if (c >= 0) predioId[c] = p.id; }
  }
  // células "prédio" do mapa sem polígono viram chão
  for (let i = 0; i < grade.length; i++) if (grade[i] === T.PREDIO && predioId[i] < 0) grade[i] = T.CHAO;
}

export function removerPrediosEm(x, z, r) {
  for (const p of predios) if (!p.removido && Math.hypot(p.cx - x, p.cz - z) < r + p.raio * 0.3) p.removido = true;
}

// ---------------- textura das fachadas ----------------
function texturaJanelas() {
  const c = document.createElement('canvas');
  c.width = 64; c.height = 64;
  const g = c.getContext('2d');
  g.fillStyle = '#ffffff'; g.fillRect(0, 0, 64, 64);
  g.fillStyle = '#5d6f80'; g.fillRect(10, 18, 44, 34);
  g.fillStyle = '#7f95a8'; g.fillRect(12, 20, 20, 30);
  g.fillStyle = '#e6e6e6'; g.fillRect(0, 58, 64, 6);
  const t = new THREE.CanvasTexture(c);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 4;
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

const PASTEIS = [0xf6c6c8, 0xbfe6d8, 0xf5e6a8, 0xbcd8ef, 0xf3f0e8, 0xf8d6b0, 0xd9c8ef, 0xffffff];
const VIDROS = [0x8fb3c9, 0x7fa6b8, 0x9fc3c0, 0xa8b9c9, 0xc9d3db, 0x6d8fa6, 0xb6c4b2];
const CONCRETO = [0xe8e2d6, 0xd9d4c9, 0xf0ece4, 0xcfc8bc, 0xe0d8cc];

export function construirPredios(cena) {
  const mat = new THREE.MeshLambertMaterial({ vertexColors: true, map: texturaJanelas() });
  const TAM = 1200;
  const chunks = new Map();
  const cor = new THREE.Color();
  for (const p of predios) {
    if (p.removido) continue;
    const key = Math.floor(p.cx / TAM) + ',' + Math.floor(p.cz / TAM);
    let ch = chunks.get(key);
    if (!ch) { ch = { pos: [], nor: [], col: [], uv: [] }; chunks.set(key, ch); }
    const n = p.pts.length / 2, h = p.h, pts = p.pts;
    const sem = (p.id * 2654435761) >>> 0;
    if (h > 45) cor.setHex(VIDROS[sem % VIDROS.length]);
    else if (h > 14) cor.setHex(CONCRETO[sem % CONCRETO.length]);
    else cor.setHex(PASTEIS[sem % PASTEIS.length]);
    p.cor = cor.getHex();
    const { pos, nor, col, uv } = ch;
    let along = 0;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const ax = pts[i * 2], az = pts[i * 2 + 1], bx = pts[j * 2], bz = pts[j * 2 + 1];
      const ex = bx - ax, ez = bz - az, len = Math.hypot(ex, ez) || 1;
      const nx = -ez / len, nz = ex / len;
      const u0 = along / 3.6, u1 = (along + len) / 3.6, v1 = h / 3.4;
      along += len;
      pos.push(ax, 0, az, bx, 0, bz, bx, h, bz, ax, 0, az, bx, h, bz, ax, h, az);
      for (let k = 0; k < 6; k++) { nor.push(nx, 0, nz); col.push(cor.r, cor.g, cor.b); }
      uv.push(u0, 0, u1, 0, u1, v1, u0, 0, u1, v1, u0, v1);
    }
    // telhado
    const cont = [];
    for (let i = 0; i < n; i++) cont.push(new THREE.Vector2(pts[i * 2], pts[i * 2 + 1]));
    let tris;
    try { tris = THREE.ShapeUtils.triangulateShape(cont, []); } catch (e) { tris = []; }
    const rr = cor.r * 0.78, rg = cor.g * 0.78, rb = cor.b * 0.78;
    for (const t of tris) {
      let [a, b, c] = t;
      const cross = (cont[b].x - cont[a].x) * (cont[c].y - cont[a].y) - (cont[b].y - cont[a].y) * (cont[c].x - cont[a].x);
      if (cross > 0) { const tmp = b; b = c; c = tmp; }
      for (const k of [a, b, c]) {
        pos.push(cont[k].x, h, cont[k].y);
        nor.push(0, 1, 0); col.push(rr, rg, rb); uv.push(0.03, 0.97);
      }
    }
  }
  const malhas = [];
  for (const ch of chunks.values()) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(ch.pos, 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(ch.nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(ch.col, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(ch.uv, 2));
    g.computeBoundingSphere();
    const m = new THREE.Mesh(g, mat);
    m.matrixAutoUpdate = false;
    m.updateMatrix();
    m.name = 'predios';
    cena.add(m);
    malhas.push(m);
  }
  return malhas;
}

// ---------------- chão (cores por tipo de terreno) ----------------
const CORES_T = [[44, 104, 140], [205, 200, 188], [96, 98, 104], [104, 150, 84], [232, 214, 164], [170, 168, 160], [120, 120, 124]];
export function canvasTerreno(escala = 1) {
  const c = document.createElement('canvas');
  c.width = Math.ceil(GW / escala); c.height = Math.ceil(GH / escala);
  const g = c.getContext('2d');
  const img = g.createImageData(c.width, c.height);
  const d = img.data;
  for (let y = 0; y < c.height; y++) {
    for (let x = 0; x < c.width; x++) {
      const i = Math.min(GH - 1, y * escala) * GW + Math.min(GW - 1, x * escala);
      const t = predioId[i] >= 0 ? 5 : grade[i];
      const cc = CORES_T[t];
      const ru = ((i * 1103515245 + 12345) >>> 16) & 15;
      const o = (y * c.width + x) * 4;
      d[o] = cc[0] + ru - 8; d[o + 1] = cc[1] + ru - 8; d[o + 2] = cc[2] + ru - 8; d[o + 3] = 255;
    }
  }
  g.putImageData(img, 0, 0);
  return c;
}

export function construirChao(cena) {
  const tex = new THREE.CanvasTexture(canvasTerreno(1));
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  const geo = new THREE.PlaneGeometry(LARG, ALT);
  geo.rotateX(-Math.PI / 2);
  geo.translate(LARG / 2, 0, ALT / 2);
  const chao = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex }));
  chao.name = 'chao';
  cena.add(chao);
  // fundo do mar além do mapa
  const fundo = new THREE.Mesh(new THREE.PlaneGeometry(80000, 80000).rotateX(-Math.PI / 2), new THREE.MeshBasicMaterial({ color: 0x1d5a7a }));
  fundo.position.set(LARG / 2, -0.6, ALT / 2);
  cena.add(fundo);
  return chao;
}

// ---------------- água animada ----------------
export function construirAgua(cena) {
  const m = new Uint8Array(GW * GH);
  for (let i = 0; i < m.length; i++) m[i] = grade[i] === T.AGUA ? 255 : 0;
  const mask = new THREE.DataTexture(m, GW, GH, THREE.RedFormat, THREE.UnsignedByteType);
  mask.magFilter = THREE.LinearFilter; mask.minFilter = THREE.LinearFilter;
  mask.needsUpdate = true;
  const mat = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      tempo: { value: 0 }, mascara: { value: mask }, tam: { value: new THREE.Vector2(LARG, ALT) },
      alfa: { value: 1 }, luz: { value: 1 },
      corNevoa: { value: new THREE.Color(0xa9c8de) }, nevoaPerto: { value: 2000 }, nevoaLonge: { value: 9000 },
    },
    vertexShader: `
      varying vec3 vW; varying float vProf;
      void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; vec4 mv = viewMatrix * w; vProf = -mv.z; gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `
      uniform float tempo; uniform sampler2D mascara; uniform vec2 tam; uniform float alfa; uniform float luz;
      uniform vec3 corNevoa; uniform float nevoaPerto; uniform float nevoaLonge;
      varying vec3 vW; varying float vProf;
      void main(){
        vec2 uv = vW.xz / tam;
        float m = 1.0;
        if (uv.x > 0.0 && uv.y > 0.0 && uv.x < 1.0 && uv.y < 1.0) m = texture2D(mascara, uv).r;
        if (m < 0.45) discard;
        float o = sin(vW.x*0.045 + tempo*0.9) * sin(vW.z*0.06 - tempo*1.1) + 0.5*sin((vW.x+vW.z)*0.11 + tempo*1.7);
        vec3 raso = vec3(0.16,0.52,0.62), fundo = vec3(0.07,0.30,0.45);
        float costa = smoothstep(0.45, 0.95, m);
        vec3 c = mix(raso, fundo, costa) + o*0.035;
        c += vec3(0.9) * pow(max(0.0, o), 6.0) * 0.12;
        c *= luz;
        float f = smoothstep(nevoaPerto, nevoaLonge, vProf);
        gl_FragColor = vec4(mix(c, corNevoa, f), alfa * (0.55 + 0.45*costa));
      }`,
  });
  const geo = new THREE.PlaneGeometry(LARG + 30000, ALT + 30000);
  geo.rotateX(-Math.PI / 2);
  const agua = new THREE.Mesh(geo, mat);
  agua.position.set(LARG / 2, 0.15, ALT / 2);
  agua.renderOrder = 1;
  cena.add(agua);
  return agua;
}

// ---------------- imagens de satélite (Esri World Imagery) ----------------
export function carregarSatelite(cena, z, aoCarregar) {
  const grupo = new THREE.Group();
  grupo.name = 'satelite';
  cena.add(grupo);
  const tilePx = 256 * Math.pow(2, 17 - z);          // tamanho do tile em pixels z17
  const tileM = tilePx * MPP;
  const tx0 = Math.floor(META.gx0 / tilePx), ty0 = Math.floor(META.gy0 / tilePx);
  const tx1 = Math.floor((META.gx0 + META.wpx) / tilePx), ty1 = Math.floor((META.gy0 + META.hpx) / tilePx);
  const B = 4; // tiles por bloco
  let pendentes = 0, ok = 0, falhas = 0;
  for (let by = ty0; by <= ty1; by += B) {
    for (let bx = tx0; bx <= tx1; bx += B) {
      const nx = Math.min(B, tx1 - bx + 1), ny = Math.min(B, ty1 - by + 1);
      const cv = document.createElement('canvas');
      cv.width = nx * 256; cv.height = ny * 256;
      const g = cv.getContext('2d');
      const tex = new THREE.CanvasTexture(cv);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      const geo = new THREE.PlaneGeometry(nx * tileM, ny * tileM).rotateX(-Math.PI / 2);
      const mesh = new THREE.Mesh(geo, new THREE.MeshLambertMaterial({ map: tex }));
      mesh.position.set((bx * tilePx - META.gx0) * MPP + nx * tileM / 2, 0.05, (by * tilePx - META.gy0) * MPP + ny * tileM / 2);
      mesh.visible = false;
      grupo.add(mesh);
      for (let j = 0; j < ny; j++) {
        for (let i = 0; i < nx; i++) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          pendentes++;
          img.onload = () => {
            g.drawImage(img, i * 256, j * 256);
            tex.needsUpdate = true; mesh.visible = true; ok++;
            if (--pendentes === 0 && aoCarregar) aoCarregar(ok, falhas);
          };
          img.onerror = () => { falhas++; if (--pendentes === 0 && aoCarregar) aoCarregar(ok, falhas); };
          img.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${by + j}/${bx + i}`;
        }
      }
    }
  }
  return grupo;
}

// ---------------- palmeiras ----------------
export function construirPalmeiras(cena, qtd = 1800) {
  const tronco = new THREE.CylinderGeometry(0.18, 0.3, 9, 5).translate(0, 4.5, 0);
  const folhas = new THREE.ConeGeometry(4.2, 2.2, 7, 1, true).translate(0, 8.6, 0);
  const mt = new THREE.MeshLambertMaterial({ color: 0x8a7354 });
  const mf = new THREE.MeshLambertMaterial({ color: 0x3f7f3a, side: THREE.DoubleSide });
  const it = new THREE.InstancedMesh(tronco, mt, qtd), ifo = new THREE.InstancedMesh(folhas, mf, qtd);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), s = new THREE.Vector3(), p = new THREE.Vector3();
  let n = 0, tent = 0;
  while (n < qtd && tent < qtd * 40) {
    tent++;
    const x = Math.random() * LARG, z = Math.random() * ALT;
    const c = cel(x, z);
    if (c < 0 || predioId[c] >= 0) continue;
    const t = grade[c];
    const chance = t === T.PARQUE ? 0.5 : t === T.AREIA ? 0.35 : t === T.CHAO ? 0.05 : 0;
    if (Math.random() > chance) continue;
    const k = 0.7 + Math.random() * 0.6;
    e.set((Math.random() - 0.5) * 0.15, Math.random() * 6.28, (Math.random() - 0.5) * 0.15);
    q.setFromEuler(e);
    m.compose(p.set(x, 0, z), q, s.set(k, k, k));
    it.setMatrixAt(n, m); ifo.setMatrixAt(n, m);
    n++;
  }
  it.count = ifo.count = n;
  cena.add(it); cena.add(ifo);
}

// ---------------- satélite em alta resolução perto da câmera ----------------
export class SateliteDetalhe {
  constructor(cena) {
    this.cena = cena;
    this.cache = new Map();
    this.z = 17;
    this.t = 0;
    this.ligado = true;
    this.carregando = 0;
    this.geo = null;
  }
  atualizar(dt, alvo, distCam) {
    this.t -= dt;
    if (this.t > 0) return;
    this.t = 0.4;
    const ver = this.ligado && distCam < 900;
    const tilePx = 256, tileM = tilePx * MPP;
    if (!this.geo) this.geo = new THREE.PlaneGeometry(tileM, tileM).rotateX(-Math.PI / 2);
    const R = Math.min(1100, Math.max(350, distCam * 1.8));
    const gx = META.gx0 + alvo.x / MPP, gy = META.gy0 + alvo.z / MPP;
    const x0 = Math.floor((gx - R / MPP) / tilePx), x1 = Math.floor((gx + R / MPP) / tilePx);
    const y0 = Math.floor((gy - R / MPP) / tilePx), y1 = Math.floor((gy + R / MPP) / tilePx);
    const agora = performance.now();
    for (const m of this.cache.values()) m.visible = false;
    if (!ver) return;
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const k = tx + ',' + ty;
        let m = this.cache.get(k);
        if (!m) {
          if (this.carregando > 8) continue;
          const mat = new THREE.MeshLambertMaterial({ color: 0xffffff });
          m = new THREE.Mesh(this.geo, mat);
          m.position.set((tx * tilePx - META.gx0) * MPP + tileM / 2, 0.09, (ty * tilePx - META.gy0) * MPP + tileM / 2);
          m.userData.pronto = false;
          this.cache.set(k, m);
          this.carregando++;
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => {
            this.carregando--;
            const t = new THREE.Texture(img);
            t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; t.needsUpdate = true;
            mat.map = t; mat.needsUpdate = true;
            m.userData.pronto = true;
            this.cena.add(m);
          };
          img.onerror = () => { this.carregando--; };
          img.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${this.z}/${ty}/${tx}`;
        }
        m.userData.uso = agora;
        m.visible = m.userData.pronto;
      }
    }
    // limita a memória: descarta os tiles usados há mais tempo
    if (this.cache.size > 90) {
      const lista = [...this.cache.entries()].filter(([, m]) => m.userData.pronto).sort((a, b) => a[1].userData.uso - b[1].userData.uso);
      for (let i = 0; i < lista.length - 70; i++) {
        const [k, m] = lista[i];
        this.cena.remove(m);
        if (m.material.map) m.material.map.dispose();
        m.material.dispose();
        this.cache.delete(k);
      }
    }
  }
}
