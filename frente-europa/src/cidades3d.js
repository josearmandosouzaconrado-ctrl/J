// Constrói o mundo em 3D a partir das imagens de satélite:
// cada tile (zoom 15, ~800 m) é analisado pixel a pixel; onde a foto mostra telhados/ruas viram PRÉDIOS e CASAS
// (com a cor dos telhados da própria foto), onde mostra mata fechada ou cercas vivas viram ÁRVORES.
// Perto do centro das cidades grandes os prédios ficam mais altos (Paris ~20 m, como os prédios haussmannianos).
import * as THREE from 'three';
import { baixarImagem, URL_SATELITE } from './rede.js';
import { lat2ty, lon2tx, paraLatLon, paraMundo, tx2lon, ty2lat } from './geo.js';
import { chao, ehAgua, quandoPronto, tileRelevo } from './relevo.js';
import { CIDADES, MARCOS } from './dados.js';

const Z = 15;
const NC = 16;          // células por lado (16 x 16 px cada)
const RAIO_TILES = 2;   // gera 5 x 5 tiles em volta da câmera (~4 km)

// --- geometrias base (cores por vértice = luz e sombra "pintadas") ---
function pintarPorNormal(g, fn) {
  const n = g.attributes.normal, p = g.attributes.position;
  const c = new Float32Array(n.count * 3);
  for (let i = 0; i < n.count; i++) {
    const v = fn(n.getX(i), n.getY(i), n.getZ(i), p.getY(i));
    c[i * 3] = c[i * 3 + 1] = c[i * 3 + 2] = v;
  }
  g.setAttribute('color', new THREE.BufferAttribute(c, 3));
  return g;
}
const sombraLado = (nx, ny, nz) => (ny > 0.5 ? 1.05 : ny < -0.5 ? 0.4 : nz > 0.5 ? 0.92 : nx > 0.5 ? 0.82 : nx < -0.5 ? 0.62 : 0.68);
const GEO_BLOCO = pintarPorNormal(new THREE.BoxGeometry(1, 1, 1).translate(0, 0.5, 0), sombraLado);
const GEO_TELHADO = (() => {
  // prisma triangular (telhado de duas águas), base 1 x 1, altura 1
  const s = new THREE.Shape([new THREE.Vector2(-0.5, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0, 1)]);
  const g = new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false }).translate(0, 0, -0.5);
  return pintarPorNormal(g.toNonIndexed(), (nx, ny, nz) => (nz > 0.5 || nz < -0.5 ? 0.75 : nx > 0 ? 1.0 : 0.7));
})();
GEO_TELHADO.computeVertexNormals();
const GEO_ARVORE = pintarPorNormal(new THREE.IcosahedronGeometry(1, 1).translate(0, 1, 0), (nx, ny, nz, y) => 0.55 + 0.45 * (y / 2));

const MAT = new THREE.MeshBasicMaterial({ vertexColors: true });
const corTmp = new THREE.Color();
const PEDRA = new THREE.Color(0xd9cfbd);

const cv = document.createElement('canvas');
cv.width = cv.height = 256;
const ctx = cv.getContext('2d', { willReadFrequently: true });

function rnd(seed) { // gerador determinístico: a mesma cidade sempre igual
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

export class Cidades3D {
  constructor(cena) {
    this.cena = cena;
    this.grupo = new THREE.Group();
    this.grupo.name = 'Cidades3D';
    cena.add(this.grupo);
    this.tiles = new Map();
    this.ocupado = false;
    this.ligado = true;
    this.semPredios = false;   // true quando os prédios reais do OpenStreetMap estão ligados
    this.grandes = CIDADES.filter((c) => c.valor >= 25).map((c) => ({ ...paraMundo(c.lat, c.lon), r: 600 + c.valor * 60, valor: c.valor }));
    this.marcos = MARCOS.map((m) => ({ ...paraMundo(m.lat, m.lon), r: m.livre }));
  }

  atualizar(foco, dist) {
    const ver = this.ligado && dist < 7000;
    this.grupo.visible = ver;
    if (!ver) return;
    const { lat, lon } = paraLatLon(foco.x, foco.z);
    const cx = Math.floor(lon2tx(lon, Z)), cy = Math.floor(lat2ty(lat, Z));
    const r = dist < 2500 ? RAIO_TILES - 1 : RAIO_TILES;
    if (!this.ocupado) {
      // gera primeiro o tile mais perto do centro que ainda falta
      let melhor = null, md = 1e9;
      for (let dy = -r; dy <= r; dy++) {
        for (let dx = -r; dx <= r; dx++) {
          const k = (cx + dx) + '/' + (cy + dy);
          if (this.tiles.has(k)) continue;
          const d = dx * dx + dy * dy;
          if (d < md) { md = d; melhor = [cx + dx, cy + dy, k]; }
        }
      }
      if (melhor) this._gerar(...melhor);
    }
    for (const [k, t] of this.tiles) {
      if (Math.abs(t.x - cx) > r + 2 || Math.abs(t.y - cy) > r + 2) {
        if (t.grupo) { this.grupo.remove(t.grupo); t.grupo.children.forEach((m) => m.dispose?.()); }
        this.tiles.delete(k);
      }
    }
  }

  limpar() {
    for (const t of this.tiles.values()) if (t.grupo) { this.grupo.remove(t.grupo); t.grupo.children.forEach((m) => m.dispose?.()); }
    this.tiles.clear();
  }

  async _gerar(x, y, k) {
    this.ocupado = true;
    const t = { x, y, grupo: null };
    this.tiles.set(k, t);
    try {
      const s = 2 ** (Z - 12);
      const [img] = await Promise.all([
        baixarImagem(URL_SATELITE(Z, x, y), 2),
        quandoPronto(tileRelevo(12, Math.floor(x / s), Math.floor(y / s), 2)),
      ]);
      if (!this.tiles.has(k)) return;
      t.grupo = this._construir(x, y, img);
      if (t.grupo) this.grupo.add(t.grupo);
    } catch (e) {
      // sem foto: tenta de novo mais tarde
      setTimeout(() => this.tiles.delete(k), 20000);
    } finally {
      this.ocupado = false;
    }
  }

  _construir(x, y, img) {
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, 256, 256).data;
    // Classificação calibrada nas fotos da Esri (que têm sombras esverdeadas):
    //  - cidade: muitos pixels claros e pouco saturados (telhados, ruas) ou telhas vermelhas + muita textura
    //  - mata fechada: escura, verde e com textura; cerca viva/bosque: bastante verde escuro no meio do campo
    const urb = new Uint8Array(NC * NC), arv = new Uint8Array(NC * NC);
    const cores = new Float32Array(NC * NC * 3);
    let cinzaClaro = 0;
    for (let cy = 0; cy < NC; cy++) {
      for (let cx = 0; cx < NC; cx++) {
        let n = 0, nB = 0, nD = 0, sL = 0, sL2 = 0, sG = 0, cr = 0, cg = 0, cb = 0;
        for (let j = 0; j < 16; j += 2) {
          for (let i = 0; i < 16; i += 2) {
            const o = ((cy * 16 + j) * 256 + cx * 16 + i) * 4;
            const r = px[o], g = px[o + 1], b = px[o + 2];
            const mx = Math.max(r, g, b) || 1, mn = Math.min(r, g, b);
            const L = (r + g + b) / 765, sat = (mx - mn) / mx, gd = (g - (r + b) / 2) / mx;
            n++; sL += L; sL2 += L * L; sG += gd;
            if (r > 175 && Math.abs(r - g) < 6 && Math.abs(g - b) < 6) cinzaClaro++;
            if ((L > 0.27 && sat < 0.22) || (r > g + 14 && r > b + 24 && L > 0.25)) { nB++; cr += r; cg += g; cb += b; }
            if (L < 0.2 && gd > 0.15) nD++;
          }
        }
        const c = cy * NC + cx;
        const m = sL / n, tex = Math.sqrt(Math.max(0, sL2 / n - m * m)), fb = nB / n, gm = sG / n, fd = nD / n;
        if (fb > 0.3 && tex > 0.07) urb[c] = 1;
        else if (m < 0.2 && tex > 0.04 && fb < 0.1 && gm > 0.15) arv[c] = 3;
        else if (fd > 0.25 && tex > 0.05 && fb < 0.15) arv[c] = 1;
        if (nB) { cores[c * 3] = cr / nB / 255; cores[c * 3 + 1] = cg / nB / 255; cores[c * 3 + 2] = cb / nB / 255; }
      }
    }
    if (cinzaClaro > NC * NC * 64 * 0.8) return null; // imagem "sem dados" da Esri
    const ehUrb = (cx, cy) => cx >= 0 && cy >= 0 && cx < NC && cy < NC && urb[cy * NC + cx] === 1;
    // centro do tile no mundo
    const latC = ty2lat(y + 0.5, Z), lonC = tx2lon(x + 0.5, Z);
    const centro = paraMundo(latC, lonC);
    const blocos = [], telhados = [], arvores = [];
    const aleat = rnd(x * 73856093 ^ y * 19349663);
    for (let cy = 0; cy < NC; cy++) {
      for (let cx = 0; cx < NC; cx++) {
        const c = cy * NC + cx;
        const lat0 = ty2lat(y + cy / NC, Z), lat1 = ty2lat(y + (cy + 1) / NC, Z);
        const lon0 = tx2lon(x + cx / NC, Z), lon1 = tx2lon(x + (cx + 1) / NC, Z);
        const a = paraMundo(lat0, lon0), b = paraMundo(lat1, lon1);
        const w = Math.abs(b.x - a.x), h = Math.abs(b.z - a.z);
        const mx = (a.x + b.x) / 2, mz = (a.z + b.z) / 2;
        if (ehAgua(mx, mz, false) === true) continue;
        if (this.marcos.some((m) => Math.hypot(m.x - mx, m.z - mz) < m.r)) continue;
        const urbana = ehUrb(cx, cy);
        if (urbana && !this.semPredios) {
          let viz = 0;
          for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (ehUrb(cx + dx, cy + dy)) viz++;
          let perto = 0;
          for (const g of this.grandes) {
            const d = Math.hypot(g.x - mx, g.z - mz);
            if (d < g.r) perto = Math.max(perto, (1 - d / g.r) * Math.min(1, g.valor / 60));
          }
          corTmp.setRGB(cores[c * 3], cores[c * 3 + 1], cores[c * 3 + 2], THREE.SRGBColorSpace);
          if (viz >= 6 && perto > 0.12) {
            // quarteirões de prédios (centro de cidade grande): 2 x 2 blocos com ruas entre eles
            const fachada = corTmp.clone().lerp(PEDRA, 0.55).multiplyScalar(0.85);
            for (let i = 0; i < 4; i++) {
              if (aleat() < 0.15) continue; // praça / pátio
              const ox = ((i % 2) - 0.5) * w * 0.48, oz = (Math.floor(i / 2) - 0.5) * h * 0.48;
              const alt = 10 + perto * 14 + aleat() * 5;
              blocos.push({ x: mx + ox, z: mz + oz, sx: w * 0.36, sz: h * 0.36, sy: alt, cor: fachada, rot: 0 });
              telhados.push({ x: mx + ox, z: mz + oz, sx: w * 0.37, sz: h * 0.37, sy: 3, base: alt, cor: corTmp.clone().multiplyScalar(0.8), rot: 0 });
            }
          } else {
            // casas com telhado de duas águas
            const n = viz >= 5 ? 3 : viz >= 3 ? 2 : 1;
            for (let i = 0; i < n; i++) {
              const sx = 6 + aleat() * 5, sz = 7 + aleat() * 6, sy = 3 + aleat() * 2.5 + (viz >= 6 ? 3 : 0) + perto * 5;
              const px_ = mx + (aleat() - 0.5) * (w - sx), pz = mz + (aleat() - 0.5) * (h - sz);
              const rot = (aleat() < 0.5 ? 0 : Math.PI / 2) + (aleat() - 0.5) * 0.3;
              const parede = PEDRA.clone().lerp(corTmp, 0.35).multiplyScalar(0.82);
              blocos.push({ x: px_, z: pz, sx, sz, sy, cor: parede, rot });
              telhados.push({ x: px_, z: pz, sx: sx * 1.08, sz: sz * 1.04, sy: 2.5 + sx * 0.18, base: sy, cor: corTmp.clone().multiplyScalar(0.85), rot });
            }
          }
        } else if (arv[c] && !urbana) {
          const n = arv[c] === 3 ? 3 : 1 + (aleat() < 0.4 ? 1 : 0);
          for (let i = 0; i < n; i++) {
            const r = 3.5 + aleat() * 3.5;
            corTmp.setHSL(0.24 + aleat() * 0.08, 0.5, 0.2 + aleat() * 0.1, THREE.SRGBColorSpace);
            arvores.push({ x: mx + (aleat() - 0.5) * w * 0.9, z: mz + (aleat() - 0.5) * h * 0.9, sx: r, sz: r, sy: (8 + aleat() * 10) / 2, cor: corTmp.clone(), rot: aleat() * 6 });
          }
        }
      }
    }
    if (!blocos.length && !arvores.length) return new THREE.Group();
    const grupo = new THREE.Group();
    grupo.position.set(centro.x, 0, centro.z);
    grupo.add(this._instancias(GEO_BLOCO, blocos, centro));
    grupo.add(this._instancias(GEO_TELHADO, telhados, centro));
    grupo.add(this._instancias(GEO_ARVORE, arvores, centro));
    return grupo;
  }

  _instancias(geo, lista, centro) {
    const m = new THREE.InstancedMesh(geo, MAT, Math.max(1, lista.length));
    m.count = lista.length;
    const o = new THREE.Object3D();
    lista.forEach((e, i) => {
      const g = (chao(e.x, e.z, false) ?? 0) - 0.3;
      o.position.set(e.x - centro.x, g + (e.base || 0), e.z - centro.z);
      o.rotation.set(0, e.rot, 0);
      o.scale.set(e.sx, e.sy, e.sz);
      o.updateMatrix();
      m.setMatrixAt(i, o.matrix);
      m.setColorAt(i, e.cor);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    m.computeBoundingSphere();
    return m;
  }
}
