// Chão estilo jogo de estratégia: em vez da foto de satélite, o terreno perto da câmera é desenhado com
// texturas de jogo (grama, trigo, terra arada, chão de mata, paralelepípedo, água, areia, cascalho)
// em resolução total, misturadas por um "mapa de pesos" (splat map) de cada tile.
//
// A foto de satélite NÃO aparece: ela só é lida para decidir onde fica cada tipo de chão
// (campos, matas, cidades, praias, mar). As ruas e rios do OpenStreetMap são desenhados por cima
// (paralelepípedo nas cidades, cascalho/terra no campo).
import * as THREE from 'three';
import { amostrar } from './relevo.js';
import { lat2ty, lon2tx, ty2lat } from './geo.js';

// camadas da textura-array (ordem = canais dos splats A.rgba e B.rgba)
export const CAMADAS = [
  { nome: 'grama', arq: 'chao_grama', m: 4 },
  { nome: 'trigo', arq: 'chao_trigo', m: 5 },
  { nome: 'terra', arq: 'chao_terra', m: 5 },
  { nome: 'mata', arq: 'chao_mata', m: 4 },
  { nome: 'pedra', arq: 'chao_paralelepipedo', m: 2.5 },
  { nome: 'agua', arq: 'chao_agua', m: 10 },
  { nome: 'areia', arq: 'chao_areia', m: 5 },
  { nome: 'estrada', arq: 'chao_cascalho', m: 4 },
];
const GRAMA = 0, TRIGO = 1, TERRA = 2, MATA = 3, PEDRA = 4, AGUA = 5, AREIA = 6, ESTRADA = 7;
const PERIODO = 20; // m: múltiplo comum dos tamanhos acima (precisão do shader longe da origem)

export class Pintor {
  constructor() {
    this.fila = [];
    this.textura = null;
    this.pronto = this._carregar();
    this.cv = document.createElement('canvas');
    this.cv.width = this.cv.height = 256;
    this.ctx = this.cv.getContext('2d', { willReadFrequently: true });
  }

  async _carregar() {
    const T = 256;
    const imgs = await Promise.all(CAMADAS.map((c) => new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = `./texturas/${c.arq}.jpg`;
    })));
    const cv = document.createElement('canvas');
    cv.width = cv.height = T;
    const g = cv.getContext('2d', { willReadFrequently: true });
    const dados = new Uint8Array(T * T * 4 * imgs.length);
    imgs.forEach((im, k) => {
      g.drawImage(im, 0, 0, T, T);
      dados.set(g.getImageData(0, 0, T, T).data, k * T * T * 4);
    });
    const t = new THREE.DataArrayTexture(dados, T, T, imgs.length);
    t.format = THREE.RGBAFormat;
    t.type = THREE.UnsignedByteType;
    t.colorSpace = THREE.SRGBColorSpace;
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.generateMipmaps = true;
    t.anisotropy = 4;
    t.needsUpdate = true;
    this.textura = t;
  }

  // no máximo 2 tiles pintados por quadro (sem travar o jogo)
  tick() { for (let i = 0; i < 2 && this.fila.length; i++) this.fila.shift()(); }
  _vez() { return new Promise((r) => this.fila.push(r)); }

  // Cria o material do chão de um tile (z >= 12)
  async material(t, img, er, osm, matSat) {
    await this.pronto;
    await this._vez();
    const S = t.z >= 15 ? 512 : 256;
    const cls = this._classificar(t, img, er);
    const grande = this._ampliar(cls, S);
    if (osm) this._desenharOSM(grande, S, t, osm);
    const [a, b] = this._pesos(grande, S);
    const ta = this._dataTex(a, S), tb = this._dataTex(b, S);
    const m = matSat.clone();
    m.userData.splats = [ta, tb];
    const off = new THREE.Vector2(((t.centro.x % PERIODO) + PERIODO) % PERIODO, ((t.centro.z % PERIODO) + PERIODO) % PERIODO);
    const textura = this.textura;
    m.onBeforeCompile = (sh) => {
      sh.uniforms.uSplatA = { value: ta };
      sh.uniforms.uSplatB = { value: tb };
      sh.uniforms.uDet = { value: textura };
      sh.uniforms.uOff = { value: off };
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', '#include <common>\nuniform vec2 uOff;\nvarying vec2 vChao;')
        .replace('#include <begin_vertex>', '#include <begin_vertex>\nvChao = transformed.xz + uOff;');
      const esc = CAMADAS.map((c) => (1 / c.m).toFixed(5));
      sh.fragmentShader = sh.fragmentShader
        .replace('#include <common>', `#include <common>
uniform sampler2D uSplatA; uniform sampler2D uSplatB;
uniform highp sampler2DArray uDet;
varying vec2 vChao;
vec3 det(float esc, float camada) { return texture(uDet, vec3(vChao * esc, camada)).rgb; }`)
        .replace('#include <map_fragment>', `
  vec4 sA = texture2D(uSplatA, vMapUv);
  vec4 sB = texture2D(uSplatB, vMapUv);
  float tot = dot(sA, vec4(1.0)) + dot(sB, vec4(1.0)) + 1e-4;
  vec3 cc = vec3(0.0);
  if (sA.r > 0.01) cc += sA.r * det(${esc[0]}, 0.0);
  if (sA.g > 0.01) cc += sA.g * det(${esc[1]}, 1.0);
  if (sA.b > 0.01) cc += sA.b * det(${esc[2]}, 2.0);
  if (sA.a > 0.01) cc += sA.a * det(${esc[3]}, 3.0);
  if (sB.r > 0.01) cc += sB.r * det(${esc[4]}, 4.0);
  if (sB.g > 0.01) cc += sB.g * det(${esc[5]}, 5.0);
  if (sB.b > 0.01) cc += sB.b * det(${esc[6]}, 6.0);
  if (sB.a > 0.01) cc += sB.a * det(${esc[7]}, 7.0);
  cc /= tot;
  // variação suave de tom entre as parcelas (sem mostrar a foto)
  vec3 sat = texture2D(map, vMapUv).rgb;
  float lum = dot(sat, vec3(0.3333));
  cc *= mix(0.8, 1.18, smoothstep(0.12, 0.42, lum));
  diffuseColor.rgb *= cc;`);
    };
    m.customProgramCacheKey = () => 'chao-jogo';
    return m;
  }

  // ------------------------------------------------------------------ classificação da foto
  _classificar(t, img, er) {
    const N = 256;
    this.ctx.drawImage(img, 0, 0, N, N);
    const px = this.ctx.getImageData(0, 0, N, N).data;
    // mar pelo relevo (altitude < 0), numa grade 64 x 64
    const mar = new Uint8Array(64 * 64);
    let temMar = false;
    if (er && er.dados) {
      const s = 2 ** (t.z - er.z);
      const ex = Math.floor(t.x / s), ey = Math.floor(t.y / s);
      for (let j = 0; j < 64; j++) {
        for (let i = 0; i < 64; i++) {
          const gx = t.x + (i + 0.5) / 64, gy = t.y + (j + 0.5) / 64;
          if (amostrar(er, (gx / s - ex) * 256, (gy / s - ey) * 256) < 0) { mar[j * 64 + i] = 1; temMar = true; }
        }
      }
    }
    const L = new Float32Array(N * N);
    for (let i = 0; i < N * N; i++) L[i] = (px[i * 4] + px[i * 4 + 1] + px[i * 4 + 2]) / 765;
    const cls = new Uint8Array(N * N);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const i = y * N + x, o = i * 4;
        const r = px[o], g = px[o + 1], b = px[o + 2];
        const mx = Math.max(r, g, b) || 1, mn = Math.min(r, g, b);
        const l = L[i], sat = (mx - mn) / mx, gd = (g - (r + b) / 2) / mx;
        // textura local (variância 3x3)
        let s1 = 0, s2 = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          const v = L[Math.min(N - 1, Math.max(0, y + dy)) * N + Math.min(N - 1, Math.max(0, x + dx))];
          s1 += v; s2 += v * v;
        }
        const varl = s2 / 9 - (s1 / 9) ** 2;
        let c;
        if (mar[(y >> 2) * 64 + (x >> 2)]) c = l > 0.5 && r >= b ? AREIA : AGUA;
        else if (l < 0.2 && varl < 0.0008 && b >= r - 4 && gd < 0.35) c = 100;           // talvez água (confirma abaixo)
        else if ((l > 0.27 && sat < 0.13) || (r > g + 20 && r > b + 30 && g < r * 0.72 && l > 0.25 && l < 0.7)) c = PEDRA;
        else if (l < 0.2 && gd > 0.15) c = MATA;
        else if (gd > 0.06) c = GRAMA;
        else if (r > g && l > 0.42) c = TRIGO;
        else if (r > g) c = TERRA;
        else c = GRAMA;
        cls[i] = c;
      }
    }
    // água pela cor só vale em manchas largas (rio/lago); linhas finas escuras (ferrovia, estrada) não
    const integral = (cond) => {
      const I = new Int32Array((N + 1) * (N + 1));
      for (let y = 0; y < N; y++) {
        let lin = 0;
        for (let x = 0; x < N; x++) { lin += cond(cls[y * N + x]) ? 1 : 0; I[(y + 1) * (N + 1) + x + 1] = I[y * (N + 1) + x + 1] + lin; }
      }
      return (x0, y0, x1, y1) => {
        x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(N, x1); y1 = Math.min(N, y1);
        return I[y1 * (N + 1) + x1] - I[y0 * (N + 1) + x1] - I[y1 * (N + 1) + x0] + I[y0 * (N + 1) + x0];
      };
    };
    const somaAgua = integral((c) => c === 100);
    const somaPedra = integral((c) => c === PEDRA);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const i = y * N + x;
        if (cls[i] === 100) cls[i] = somaAgua(x - 3, y - 3, x + 4, y + 4) >= 40 ? AGUA : GRAMA;
        // dentro das cidades, trigo/terra/areia soltos viram calçamento de pedra
        if ((cls[i] === TRIGO || cls[i] === TERRA) && somaPedra(x - 7, y - 7, x + 8, y + 8) > 225 * 0.35) cls[i] = PEDRA;
      }
    }
    // areia só perto do mar (campos claros no interior continuam campos)
    if (temMar) {
      for (let i = 0; i < N * N; i++) if (cls[i] === AREIA || (cls[i] === TRIGO && L[i] > 0.55)) {
        const x = i % N, y = (i / N) | 0;
        let perto = false;
        for (let dy = -12; dy <= 12 && !perto; dy += 4) for (let dx = -12; dx <= 12 && !perto; dx += 4) {
          const yy = Math.min(255, Math.max(0, y + dy)), xx = Math.min(255, Math.max(0, x + dx));
          if (mar[(yy >> 2) * 64 + (xx >> 2)]) perto = true;
        }
        cls[i] = perto ? AREIA : cls[i] === AREIA ? TRIGO : cls[i];
      }
    }
    // filtro de moda 3x3: tira os pontinhos isolados
    const out = new Uint8Array(N * N);
    const cont = new Uint8Array(8);
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        cont.fill(0);
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          cont[cls[Math.min(N - 1, Math.max(0, y + dy)) * N + Math.min(N - 1, Math.max(0, x + dx))]]++;
        }
        let m = cls[y * N + x], mc = 0;
        for (let k = 0; k < 8; k++) if (cont[k] > mc) { mc = cont[k]; m = k; }
        out[y * N + x] = mc >= 5 ? m : cls[y * N + x];
      }
    }
    return out;
  }

  _ampliar(cls, S) {
    if (S === 256) return cls;
    const f = S / 256, g = new Uint8Array(S * S);
    for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) g[y * S + x] = cls[((y / f) | 0) * 256 + ((x / f) | 0)];
    return g;
  }

  // ruas, estradas e rios do OpenStreetMap desenhados no mapa de classes
  _desenharOSM(g, S, t, osm) {
    const mpp = 40075016 * Math.cos(ty2lat(t.y + 0.5, t.z) * Math.PI / 180) / 2 ** t.z / S; // metros por pixel
    const pt = (p) => [(lon2tx(p.lon, t.z) - t.x) * S, (lat2ty(p.lat, t.z) - t.y) * S];
    const linha = (geo, larg, classe) => {
      const r = Math.max(0.6, larg / 2 / mpp);
      for (let i = 0; i + 1 < geo.length; i++) {
        const [ax, ay] = pt(geo[i]), [bx, by] = pt(geo[i + 1]);
        const x0 = Math.max(0, Math.floor(Math.min(ax, bx) - r)), x1 = Math.min(S - 1, Math.ceil(Math.max(ax, bx) + r));
        const y0 = Math.max(0, Math.floor(Math.min(ay, by) - r)), y1 = Math.min(S - 1, Math.ceil(Math.max(ay, by) + r));
        if (x0 > x1 || y0 > y1) continue;
        const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy || 1;
        for (let y = y0; y <= y1; y++) {
          for (let x = x0; x <= x1; x++) {
            const u = Math.max(0, Math.min(1, ((x + 0.5 - ax) * dx + (y + 0.5 - ay) * dy) / L2));
            const ex = ax + u * dx - x - 0.5, ey = ay + u * dy - y - 0.5;
            if (ex * ex + ey * ey <= r * r) g[y * S + x] = classe;
          }
        }
      }
    };
    for (const w of osm.rios || []) {
      const tp = w.tags.waterway;
      linha(w.geometry, tp === 'river' ? 30 : tp === 'canal' ? 15 : 4, AGUA);
    }
    const LARG = { motorway: 9, trunk: 8, primary: 7, secondary: 6.5, tertiary: 6, unclassified: 5, residential: 5.5,
      living_street: 5, pedestrian: 6, service: 3.5, track: 3, path: 1.5, footway: 1.5, cycleway: 1.5, bridleway: 2 };
    for (const w of osm.ruas || []) {
      const tp = w.tags.highway;
      const larg = LARG[tp];
      if (!larg) continue;
      // nas cidades: paralelepípedo (com calçada); no campo: cascalho ou terra
      const cidade = ['residential', 'living_street', 'pedestrian'].includes(tp) || w.tags.surface === 'sett' || w.tags.surface === 'cobblestone';
      if (cidade) linha(w.geometry, larg + 3, PEDRA);
      linha(w.geometry, larg, cidade ? PEDRA : ['track', 'path', 'bridleway', 'footway'].includes(tp) ? TERRA : ESTRADA);
    }
  }

  // classes -> pesos (2 imagens RGBA), com desfoque leve para as bordas ficarem macias
  _pesos(g, S) {
    const ch = Array.from({ length: 8 }, () => new Float32Array(S * S));
    for (let i = 0; i < S * S; i++) ch[g[i]][i] = 1;
    const tmp = new Float32Array(S * S);
    const R = S >= 512 ? 2 : 1;
    for (const c of ch) {
      for (let y = 0; y < S; y++) { // horizontal
        let acc = 0;
        for (let x = -R; x <= R; x++) acc += c[y * S + Math.min(S - 1, Math.max(0, x))];
        for (let x = 0; x < S; x++) {
          tmp[y * S + x] = acc / (2 * R + 1);
          acc += c[y * S + Math.min(S - 1, x + R + 1)] - c[y * S + Math.max(0, x - R)];
        }
      }
      for (let x = 0; x < S; x++) { // vertical
        let acc = 0;
        for (let y = -R; y <= R; y++) acc += tmp[Math.min(S - 1, Math.max(0, y)) * S + x];
        for (let y = 0; y < S; y++) {
          c[y * S + x] = acc / (2 * R + 1);
          acc += tmp[Math.min(S - 1, y + R + 1) * S + x] - tmp[Math.max(0, y - R) * S + x];
        }
      }
    }
    const a = new Uint8Array(S * S * 4), b = new Uint8Array(S * S * 4);
    for (let y = 0; y < S; y++) {
      const linhaDst = (S - 1 - y) * S; // a textura tem v=0 embaixo
      for (let x = 0; x < S; x++) {
        const i = y * S + x, o = (linhaDst + x) * 4;
        for (let k = 0; k < 4; k++) { a[o + k] = ch[k][i] * 255; b[o + k] = ch[k + 4][i] * 255; }
      }
    }
    return [a, b];
  }

  _dataTex(d, S) {
    const t = new THREE.DataTexture(d, S, S, THREE.RGBAFormat);
    t.magFilter = THREE.LinearFilter;
    t.minFilter = THREE.LinearFilter;
    t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    t.needsUpdate = true;
    return t;
  }
}

export const tilesOSM = (t) => {
  // tile de zoom 15 que contém (ou é) este tile
  const s = 2 ** (t.z - 15);
  return [Math.floor(t.x / s), Math.floor(t.y / s)];
};
