// Terreno da Europa em tamanho real: quadtree de tiles com foto de satélite + relevo real.
// Cada tile é uma malha 16x16 posicionada no seu centro (precisão boa mesmo a 1000 km da origem).
import * as THREE from 'three';
import { baixarImagem, URL_SATELITE } from './rede.js';
import { lat2ty, lon2tx, paraMundo, tx2lon, ty2lat } from './geo.js';
import { amostrar, quandoPronto, tileRelevo, EXAGERO } from './relevo.js';

// direção da luz do sol (vem do sul/sudeste, como nas fotos de satélite da Europa)
export const SOL = new THREE.Vector3(0.35, 0.75, 0.55).normalize();
// o chão usa material com luz (para receber sombras); esta cor compensa a luz para a foto ficar com o brilho original
export const COR_CHAO = new THREE.Color(1.05, 1.05, 1.05);

const N = 16;            // segmentos por tile
const Z_RAIZ = 5;
const Z_MAX = 17;
const Z_RELEVO_MAX = 12;
// Europa: lat 34..64, lon -12..36
const REGIAO = { latMin: 34, latMax: 64, lonMin: -12, lonMax: 36 };

// A Esri devolve uma imagem cinza "Map data not yet available" onde não há foto nesse zoom.
const cvTeste = document.createElement('canvas');
cvTeste.width = cvTeste.height = 16;
const ctxTeste = cvTeste.getContext('2d', { willReadFrequently: true });
function semFoto(img) {
  try {
    ctxTeste.drawImage(img, 0, 0, 16, 16);
    const d = ctxTeste.getImageData(0, 0, 16, 16).data;
    let cinza = 0;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i], g = d[i + 1], b = d[i + 2];
      if (r > 175 && Math.abs(r - g) < 6 && Math.abs(g - b) < 6) cinza++;
    }
    return cinza > 200;
  } catch (e) { return false; }
}

class Tile {
  constructor(z, x, y, pai) {
    this.z = z; this.x = x; this.y = y; this.pai = pai;
    this.estado = 0; // 0 nada, 1 carregando, 2 pronto, 3 falhou
    this.malha = null;
    this.filhos = null;
    this.uso = 0;
    const lat0 = ty2lat(y, z), lat1 = ty2lat(y + 1, z);
    const lon0 = tx2lon(x, z), lon1 = tx2lon(x + 1, z);
    const c = paraMundo((lat0 + lat1) / 2, (lon0 + lon1) / 2);
    const a = paraMundo(lat0, lon0), b = paraMundo(lat1, lon1);
    this.centro = new THREE.Vector3(c.x, 0, c.z);
    this.tamanho = Math.max(Math.abs(a.z - b.z), Math.abs(paraMundo(lat1, lon1).x - paraMundo(lat1, lon0).x));
    this.raio = this.tamanho * 0.75;
    this.hMax = 0;
  }
}

export class Terreno {
  constructor(cena, renderer) {
    this.grupo = new THREE.Group();
    this.grupo.name = 'Terreno';
    cena.add(this.grupo);
    this.renderer = renderer;
    this.raizes = [];
    this.todos = new Map();
    this.visiveis = [];
    this.quadro = 0;
    this.k = 2.2; // qualidade: maior = mais detalhe
    this.maxAniso = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    const x0 = Math.floor(lon2tx(REGIAO.lonMin, Z_RAIZ)), x1 = Math.floor(lon2tx(REGIAO.lonMax, Z_RAIZ));
    const y0 = Math.floor(lat2ty(REGIAO.latMax, Z_RAIZ)), y1 = Math.floor(lat2ty(REGIAO.latMin, Z_RAIZ));
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) this.raizes.push(this._novo(Z_RAIZ, x, y, null));
    this.frustum = new THREE.Frustum();
    this.mat4 = new THREE.Matrix4();
    this.esfera = new THREE.Sphere();
    this.matFalha = new THREE.MeshLambertMaterial({ color: 0x55703f });
  }

  _novo(z, x, y, pai) {
    const t = new Tile(z, x, y, pai);
    this.todos.set(z + '/' + x + '/' + y, t);
    return t;
  }

  _pedir(t, dist) {
    if (t.estado !== 0) return;
    t.estado = 1;
    const ze = Math.min(t.z, Z_RELEVO_MAX);
    const s = 2 ** (t.z - ze);
    const er = tileRelevo(ze, Math.floor(t.x / s), Math.floor(t.y / s), t.z);
    const prio = t.z + Math.min(4, dist / Math.max(1, t.tamanho) * 0.5);
    const pImg = baixarImagem(URL_SATELITE(t.z, t.x, t.y), prio);
    Promise.allSettled([pImg, quandoPronto(er)]).then(([ri]) => {
      if (t.descartado) return;
      let mat;
      if (ri.status === 'fulfilled' && t.z > 9 && semFoto(ri.value)) {
        t.estado = 3;
        return;
      }
      if (ri.status === 'fulfilled') {
        const tex = new THREE.Texture(ri.value);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = this.maxAniso;
        tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping;
        tex.needsUpdate = true;
        mat = new THREE.MeshLambertMaterial({ map: tex, color: COR_CHAO });
      } else if (t.z > Z_RAIZ + 3) {
        // sem foto neste zoom (ex.: mar aberto): não divide mais aqui
        t.estado = 3;
        return;
      } else {
        mat = this.matFalha;
      }
      t.malha = this._malha(t, er, mat);
      t.malha.visible = false;
      this.grupo.add(t.malha);
      t.estado = 2;
    });
  }

  _malha(t, er, mat) {
    const ze = er.z;
    const s = 2 ** (t.z - ze);
    const ex = Math.floor(t.x / s), ey = Math.floor(t.y / s);
    const M = N + 3;
    const pos = new Float32Array(M * M * 3);
    const uv = new Float32Array(M * M * 2);
    const saia = Math.min(400, t.tamanho * 0.03 + 5);
    let hMax = 0, brutoMax = -1e9;
    for (let j = 0; j < M; j++) {
      for (let i = 0; i < M; i++) {
        const ci = Math.min(N, Math.max(0, i - 1)), cj = Math.min(N, Math.max(0, j - 1));
        const u = ci / N, v = cj / N;
        const gx = t.x + u, gy = t.y + v;
        const lat = ty2lat(gy, t.z), lon = tx2lon(gx, t.z);
        const p = paraMundo(lat, lon);
        let h = 0;
        if (er.dados) {
          const bruto = amostrar(er, (gx / s - ex) * 256, (gy / s - ey) * 256);
          if (bruto > brutoMax) brutoMax = bruto;
          h = Math.max(0, bruto) * EXAGERO;
        }
        if (h > hMax) hMax = h;
        const borda = i === 0 || j === 0 || i === M - 1 || j === M - 1;
        const k = j * M + i;
        pos[k * 3] = p.x - t.centro.x;
        pos[k * 3 + 1] = borda ? h - saia : h;
        pos[k * 3 + 2] = p.z - t.centro.z;
        uv[k * 2] = u;
        uv[k * 2 + 1] = 1 - v;
      }
    }
    // normais do relevo (a luz do sol faz morros e vales aparecerem; o chão recebe as sombras)
    const nor = new Float32Array(M * M * 3);
    const P = (i, j) => {
      i = Math.min(M - 2, Math.max(1, i)); j = Math.min(M - 2, Math.max(1, j));
      const k = j * M + i;
      return [pos[k * 3], pos[k * 3 + 1], pos[k * 3 + 2]];
    };
    const n = new THREE.Vector3();
    for (let j = 0; j < M; j++) {
      for (let i = 0; i < M; i++) {
        const a = P(i - 1, j), b = P(i + 1, j), c = P(i, j - 1), d = P(i, j + 1);
        const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2];
        const vx = d[0] - c[0], vy = d[1] - c[1], vz = d[2] - c[2];
        n.set(vy * uz - vz * uy, vz * ux - vx * uz, vx * uy - vy * ux).normalize();
        if (n.y < 0) n.negate();
        const k = j * M + i;
        nor[k * 3] = n.x; nor[k * 3 + 1] = n.y; nor[k * 3 + 2] = n.z;
      }
    }
    const idx = [];
    for (let j = 0; j < M - 1; j++) {
      for (let i = 0; i < M - 1; i++) {
        const a = j * M + i, b = a + 1, c = a + M, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
    g.setIndex(idx);
    g.computeBoundingSphere();
    g.computeBoundingBox();
    t.hMax = hMax;
    t.mar = er.dados && brutoMax < -2; // tile todo no mar: não precisa de mais detalhe
    t.centro.y = hMax / 2;
    const m = new THREE.Mesh(g, mat);
    m.receiveShadow = true;
    m.position.set(t.centro.x, 0, t.centro.z);
    m.matrixAutoUpdate = false;
    m.updateMatrix();
    m.userData.tile = t;
    return m;
  }

  _noFrustum(t) {
    this.esfera.center.copy(t.centro);
    this.esfera.radius = t.raio + t.hMax;
    return this.frustum.intersectsSphere(this.esfera);
  }

  atualizar(camera) {
    this.quadro++;
    this.mat4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.mat4);
    for (const t of this.visiveis) if (t.malha) t.malha.visible = false;
    this.visiveis = [];
    this.camPos = camera.position;
    for (const r of this.raizes) this._visitar(r);
    if (this.quadro % 120 === 0) this._podar();
  }

  _visitar(t) {
    t.uso = this.quadro;
    const d = Math.max(1, this.camPos.distanceTo(t.centro) - t.raio * 0.7);
    if (t.estado === 0) this._pedir(t, d);
    const dentro = this._noFrustum(t);
    if (!dentro && t.estado === 2) { this._mostrar(t); return; }
    if (!dentro) return;
    const dividir = t.z < Z_MAX && !(t.mar && t.z >= 11) && t.tamanho / d > this.k;
    if (dividir) {
      if (!t.filhos) {
        const z = t.z + 1, x = t.x * 2, y = t.y * 2;
        t.filhos = [this._novo(z, x, y, t), this._novo(z, x + 1, y, t), this._novo(z, x, y + 1, t), this._novo(z, x + 1, y + 1, t)];
      }
      let prontos = true, falhou = false;
      for (const f of t.filhos) {
        f.uso = this.quadro;
        if (f.estado === 0) this._pedir(f, d);
        if (f.estado === 3) falhou = true;
        else if (f.estado !== 2) prontos = false;
      }
      if (prontos && !falhou) {
        for (const f of t.filhos) this._visitar(f);
        return;
      }
    }
    if (t.estado === 2) this._mostrar(t);
  }

  _mostrar(t) {
    t.malha.visible = true;
    this.visiveis.push(t);
  }

  _podar() {
    if (this.todos.size < 500) return;
    for (const t of [...this.todos.values()]) {
      if (t.descartado || !t.filhos) continue;
      if (t.filhos.every((f) => this.quadro - f.uso > 200)) this._removerSub(t);
    }
  }

  _removerSub(t) {
    if (!t.filhos) return;
    for (const f of t.filhos) {
      f.descartado = true;
      if (f.malha) {
        this.grupo.remove(f.malha);
        f.malha.geometry.dispose();
        if (f.malha.material !== this.matFalha) { f.malha.material.map?.dispose(); f.malha.material.dispose(); }
      }
      this.todos.delete(f.z + '/' + f.x + '/' + f.y);
      this._removerSub(f);
    }
    t.filhos = null;
  }

  malhasVisiveis() {
    return this.visiveis.map((t) => t.malha);
  }

  carregando() {
    let n = 0;
    for (const t of this.todos.values()) if (t.estado === 1) n++;
    return n;
  }
}
