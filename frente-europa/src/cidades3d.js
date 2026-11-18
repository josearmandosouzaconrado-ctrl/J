// Constrói o mundo em 3D em volta da câmera (tiles de ~800 m, zoom 15):
//
// 1) PRÉDIOS REAIS do OpenStreetMap (Overpass): cada prédio nasce exatamente em cima do contorno real,
//    com as paredes e telhados texturizados (pedra de Caen, enxaimel normando, tijolo, reboco, ocre;
//    ardósia, telha de barro, zinco) e telhado de duas águas alinhado com o próprio prédio/rua.
//    Tudo de um tile vira 1 malha por material (poucas chamadas de desenho).
// 2) Sem OSM (sem internet / servidor fora): usa as casas modeladas no Blender, instanciadas na GPU,
//    nos pontos onde a foto de satélite mostra telhados, giradas na direção das ruas da foto.
// 3) ÁRVORES do Blender (carvalho, choupo, macieira, pinheiro) onde a foto mostra mata e cercas vivas.
import * as THREE from 'three';
import { baixarImagem, URL_SATELITE } from './rede.js';
import { lat2ty, lon2tx, paraLatLon, paraMundo, tx2lon, ty2lat } from './geo.js';
import { chao, ehAgua, quandoPronto, tileRelevo } from './relevo.js';
import { CIDADES, MARCOS } from './dados.js';
import { partesInstancia, materialTextura, materialCor } from './modelos.js';

const Z = 15;
const RAIO_TILES = 2;                 // 5 x 5 tiles (~4 km) em volta da câmera
const OVERPASS = 'https://overpass-api.de/api/interpreter';
const ESC_PAREDE = [4, 3], ESC_TELHADO = [2, 2];  // metros por repetição da textura (igual ao Blender)

const cv = document.createElement('canvas');
cv.width = cv.height = 256;
const ctx = cv.getContext('2d', { willReadFrequently: true });

function rnd(seed) {
  let s = seed >>> 0;
  return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
}

// ---------------------------------------------------------------- geometria auxiliar
function areaAssinada(p) {
  let a = 0;
  for (let i = 0; i < p.length; i++) { const q = p[i], r = p[(i + 1) % p.length]; a += q.x * r.z - r.x * q.z; }
  return a / 2;
}

function fechoConvexo(pts) {
  const p = [...pts].sort((a, b) => a.x - b.x || a.z - b.z);
  const cr = (o, a, b) => (a.x - o.x) * (b.z - o.z) - (a.z - o.z) * (b.x - o.x);
  const lo = [], hi = [];
  for (const q of p) { while (lo.length >= 2 && cr(lo[lo.length - 2], lo[lo.length - 1], q) <= 0) lo.pop(); lo.push(q); }
  for (let i = p.length - 1; i >= 0; i--) { const q = p[i]; while (hi.length >= 2 && cr(hi[hi.length - 2], hi[hi.length - 1], q) <= 0) hi.pop(); hi.push(q); }
  return lo.slice(0, -1).concat(hi.slice(0, -1));
}

// retângulo de menor área em volta do prédio (dá o alinhamento real com a rua)
function retanguloMinimo(pts) {
  const h = fechoConvexo(pts);
  let melhor = null;
  for (let i = 0; i < h.length; i++) {
    const a = h[i], b = h[(i + 1) % h.length];
    const ang = Math.atan2(b.z - a.z, b.x - a.x);
    const c = Math.cos(ang), s = Math.sin(ang);
    let u0 = 1e9, u1 = -1e9, v0 = 1e9, v1 = -1e9;
    for (const q of h) {
      const u = q.x * c + q.z * s, v = -q.x * s + q.z * c;
      if (u < u0) u0 = u;
      if (u > u1) u1 = u;
      if (v < v0) v0 = v;
      if (v > v1) v1 = v;
    }
    const ar = (u1 - u0) * (v1 - v0);
    if (!melhor || ar < melhor.area) {
      const um = (u0 + u1) / 2, vm = (v0 + v1) / 2;
      melhor = { area: ar, ang, cx: um * c - vm * s, cz: um * s + vm * c, a: u1 - u0, b: v1 - v0 };
    }
  }
  if (!melhor) return null;
  // L = lado comprido (cumeeira), W = lado curto
  if (melhor.a >= melhor.b) return { ...melhor, L: melhor.a, W: melhor.b };
  return { ...melhor, ang: melhor.ang + Math.PI / 2, L: melhor.b, W: melhor.a };
}

// Acumula triângulos por material, com normal e UV em metros
class Construtor {
  constructor() { this.buf = new Map(); }
  _b(k) { let b = this.buf.get(k); if (!b) this.buf.set(k, b = { p: [], n: [], uv: [] }); return b; }
  tri(k, a, b, c, n, uva, uvb, uvc) {
    // ordem dos vértices de acordo com a normal (face da frente para fora)
    const ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    if (cx * n[0] + cy * n[1] + cz * n[2] < 0) { [b, c] = [c, b]; [uvb, uvc] = [uvc, uvb]; }
    const B = this._b(k);
    B.p.push(...a, ...b, ...c);
    B.n.push(...n, ...n, ...n);
    B.uv.push(...uva, ...uvb, ...uvc);
  }
  quad(k, a, b, c, d, n, ua, ub, uc, ud) { this.tri(k, a, b, c, n, ua, ub, uc); this.tri(k, a, c, d, n, ua, uc, ud); }
  parede(k, ax, az, bx, bz, y0, y1, u0, nx, nz) {
    const L = Math.hypot(bx - ax, bz - az), su = ESC_PAREDE[0], sv = ESC_PAREDE[1];
    this.quad(k, [ax, y0, az], [bx, y0, bz], [bx, y1, bz], [ax, y1, az], [nx, 0, nz],
      [u0 / su, 0], [(u0 + L) / su, 0], [(u0 + L) / su, (y1 - y0) / sv], [u0 / su, (y1 - y0) / sv]);
    return u0 + L;
  }
  malhas(materiais) {
    const out = [];
    for (const [k, b] of this.buf) {
      if (!b.p.length) continue;
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(b.p, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(b.n, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(b.uv, 2));
      g.computeBoundingSphere();
      const m = new THREE.Mesh(g, materiais(k));
      m.castShadow = true;
      m.receiveShadow = true;
      out.push(m);
    }
    return out;
  }
}

// ---------------------------------------------------------------- estilos regionais (França 1944)
function estilo(lat, lon, area, urbano, r, tags) {
  const t = tags || {};
  const paris = Math.hypot((lat - 48.857) * 111, (lon - 2.35) * 73) < 7;
  if (t.building === 'church' || t.building === 'chapel' || t.amenity === 'place_of_worship') {
    return { parede: 'Parede_pedra', telhado: 'Telhado_ardosia', incl: 55, andares: 4, chamine: false };
  }
  if (paris && area > 120) return { parede: 'Parede_haussmann', telhado: 'Telhado_zinco', incl: 0, andares: 5 + (r() < 0.4 ? 1 : 0), andarAlt: 3.3, plano: true };
  if (['garage', 'garages', 'shed', 'hut', 'barn', 'farm_auxiliary', 'roof'].includes(t.building)) {
    return { parede: lat > 50 ? 'Parede_tijolo' : 'Parede_pedra', telhado: lat < 45 ? 'Telhado_telha' : 'Telhado_ardosia', incl: 30, andares: 1, andarAlt: 2.8, chamine: false };
  }
  if (['industrial', 'warehouse', 'commercial', 'retail', 'school', 'hospital'].includes(t.building) || area > 1200) {
    return { parede: lat > 49.5 ? 'Parede_tijolo' : 'Parede_reboco', telhado: 'Telhado_zinco', incl: 0, andares: 2, plano: true };
  }
  const sul = lat < 44.8, norte = lat > 50.0, normandia = lat > 47.6 && lon < 1.9;
  let parede, telhado = lat > 46.8 ? 'Telhado_ardosia' : 'Telhado_telha';
  let incl = telhado === 'Telhado_telha' ? 30 : 45;
  if (sul) { parede = r() < 0.65 ? 'Parede_ocre' : 'Parede_reboco'; telhado = 'Telhado_telha'; incl = 24; }
  else if (norte) parede = 'Parede_tijolo';
  else if (normandia && !urbano) parede = r() < 0.45 ? 'Parede_enxaimel' : r() < 0.7 ? 'Parede_pedra' : 'Parede_reboco';
  else if (normandia) parede = r() < 0.55 ? 'Parede_pedra' : r() < 0.6 ? 'Parede_reboco' : 'Parede_enxaimel';
  else parede = r() < 0.5 ? 'Parede_reboco' : 'Parede_pedra';
  const andares = urbano ? (area > 150 ? 3 + Math.floor(r() * 2) : 2 + Math.floor(r() * 2)) : area > 90 ? 2 : 1 + (r() < 0.5 ? 1 : 0);
  if (parede === 'Parede_enxaimel') incl = 52;
  return { parede, telhado, incl, andares, chamine: true };
}

// ---------------------------------------------------------------- árvores por região
function tipoArvore(lat, r) {
  if (lat < 44.5) return r() < 0.6 ? 'pinheiro' : 'arvore_carvalho';
  const x = r();
  if (lat > 47.5) return x < 0.62 ? 'arvore_carvalho' : x < 0.82 ? 'macieira' : 'arvore_choupo';
  return x < 0.7 ? 'arvore_carvalho' : 'arvore_choupo';
}

const CASAS_RESERVA = {
  normandia: ['casa_normanda', 'casa_pedra', 'casa_normanda', 'fazenda', 'casa_cidade'],
  norte: ['casa_tijolo', 'casa_tijolo', 'casa_cidade'],
  sul: ['casa_provence', 'casa_provence', 'fazenda'],
  centro: ['casa_pedra', 'casa_cidade', 'fazenda'],
  cidade: ['casa_cidade', 'casa_pedra', 'predio_haussmann'],
};

export class Cidades3D {
  constructor(cena) {
    this.cena = cena;
    this.grupo = new THREE.Group();
    this.grupo.name = 'Cidades3D';
    cena.add(this.grupo);
    this.tiles = new Map();
    this.ocupado = false;
    this.ligado = true;
    this.usarOSM = true;
    this.osmFalhas = 0;
    this.osmPausaAte = 0;
    this.estat = { osm: 0, reserva: 0 };
    this.grandes = CIDADES.filter((c) => c.valor >= 25).map((c) => ({ ...paraMundo(c.lat, c.lon), r: 600 + c.valor * 60, valor: c.valor }));
    this.marcos = MARCOS.map((m) => ({ ...paraMundo(m.lat, m.lon), r: m.livre }));
    this.matCache = new Map();
  }

  _material(k) {
    if (!this.matCache.has(k)) this.matCache.set(k, k.startsWith('Parede') || k.startsWith('Telhado') ? materialTextura(k) : materialCor(k));
    return this.matCache.get(k);
  }

  atualizar(foco, dist) {
    const ver = this.ligado && dist < 7000;
    this.grupo.visible = ver;
    if (!ver) return;
    const { lat, lon } = paraLatLon(foco.x, foco.z);
    const cx = Math.floor(lon2tx(lon, Z)), cy = Math.floor(lat2ty(lat, Z));
    const r = dist < 2500 ? RAIO_TILES - 1 : RAIO_TILES;
    if (!this.ocupado) {
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
      if (Math.abs(t.x - cx) > r + 2 || Math.abs(t.y - cy) > r + 2) { this._descartar(t); this.tiles.delete(k); }
    }
  }

  _descartar(t) {
    if (!t.grupo) return;
    this.grupo.remove(t.grupo);
    t.grupo.traverse((m) => {
      if (m.isInstancedMesh) m.dispose();
      else if (m.isMesh) m.geometry.dispose();
    });
  }

  limpar() {
    for (const t of this.tiles.values()) this._descartar(t);
    this.tiles.clear();
  }

  async _osm(x, y) {
    if (!this.usarOSM || performance.now() < this.osmPausaAte) return null;
    const s = ty2lat(y + 1, Z), n = ty2lat(y, Z), w = tx2lon(x, Z), e = tx2lon(x + 1, Z);
    const q = `[out:json][timeout:25];way["building"](${s.toFixed(6)},${w.toFixed(6)},${n.toFixed(6)},${e.toFixed(6)});out geom;`;
    const ctl = new AbortController();
    const to = setTimeout(() => ctl.abort(), 25000);
    try {
      const r = await fetch(OVERPASS, {
        method: 'POST', body: 'data=' + encodeURIComponent(q), signal: ctl.signal,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      if (!r.ok) throw new Error('overpass ' + r.status);
      const d = await r.json();
      this.osmFalhas = 0;
      return d.elements || [];
    } catch (err) {
      if (++this.osmFalhas >= 2) this.osmPausaAte = performance.now() + 120000; // tenta de novo em 2 min
      return null;
    } finally {
      clearTimeout(to);
    }
  }

  async _gerar(x, y, k) {
    this.ocupado = true;
    const t = { x, y, grupo: null };
    this.tiles.set(k, t);
    try {
      const s = 2 ** (Z - 12);
      const [img, , osm] = await Promise.all([
        baixarImagem(URL_SATELITE(Z, x, y), 2),
        quandoPronto(tileRelevo(12, Math.floor(x / s), Math.floor(y / s), 2)),
        this._osm(x, y),
      ]);
      if (!this.tiles.has(k)) return;
      t.grupo = this._construir(x, y, img, osm);
      if (t.grupo) this.grupo.add(t.grupo);
    } catch (e) {
      console.warn('cidade 3D', e);
      setTimeout(() => this.tiles.delete(k), 20000);
    } finally {
      this.ocupado = false;
    }
  }

  // ------------------------------------------------------------ análise da foto de satélite
  _analisar(img) {
    ctx.drawImage(img, 0, 0);
    const px = ctx.getImageData(0, 0, 256, 256).data;
    const N = 32, P = 8; // 32 x 32 células de 8 px (~25 m)
    const cel = [];
    let cinzaClaro = 0;
    const lum = (q) => px[q] + px[q + 1] + px[q + 2];
    for (let cy = 0; cy < N; cy++) {
      for (let cx = 0; cx < N; cx++) {
        let n = 0, nB = 0, nD = 0, sL = 0, sL2 = 0, sG = 0, bx = 0, by = 0;
        let gxx = 0, gyy = 0, gxy = 0;
        for (let j = 0; j < P; j++) {
          for (let i = 0; i < P; i++) {
            const X = cx * P + i, Y = cy * P + j;
            const o = (Y * 256 + X) * 4;
            const r = px[o], g = px[o + 1], b = px[o + 2];
            const mx = Math.max(r, g, b) || 1, mn = Math.min(r, g, b);
            const L = (r + g + b) / 765, sat = (mx - mn) / mx, gd = (g - (r + b) / 2) / mx;
            n++; sL += L; sL2 += L * L; sG += gd;
            if (r > 175 && Math.abs(r - g) < 6 && Math.abs(g - b) < 6) cinzaClaro++;
            // telhado cinza (ardósia/zinco) ou telha vermelha; terra arada (marrom-clara) fica de fora
            if ((L > 0.27 && sat < 0.13) || (r > g + 20 && r > b + 30 && g < r * 0.72 && L > 0.25 && L < 0.7)) { nB++; bx += i; by += j; }
            if (L < 0.2 && gd > 0.15) nD++;
            // gradiente (direção das bordas = direção das ruas e prédios da foto)
            if (X > 0 && Y > 0 && X < 255 && Y < 255) {
              const dx = lum(o + 4) - lum(o - 4), dy = lum(o + 1024) - lum(o - 1024);
              gxx += dx * dx; gyy += dy * dy; gxy += dx * dy;
            }
          }
        }
        const m = sL / n;
        cel.push({ fb: nB / n, fd: nD / n, m, tex: Math.sqrt(Math.max(0, sL2 / n - m * m)), gm: sG / n,
          bx: nB ? bx / nB : P / 2, by: nB ? by / nB : P / 2, gxx, gyy, gxy });
      }
    }
    return { cel, N, P, vazia: cinzaClaro > 256 * 256 * 0.8 };
  }

  _construir(x, y, img, osm) {
    const A = this._analisar(img);
    if (A.vazia) return null;
    const centro = paraMundo(ty2lat(y + 0.5, Z), tx2lon(x + 0.5, Z));
    const grupo = new THREE.Group();
    grupo.position.set(centro.x, 0, centro.z);
    const aleat = rnd(x * 73856093 ^ y * 19349663);
    const ocupado = new Uint8Array(A.N * A.N);
    const celulaDe = (wx, wz) => {
      const { lat, lon } = paraLatLon(wx, wz);
      const fx = (lon2tx(lon, Z) - x) * A.N, fy = (lat2ty(lat, Z) - y) * A.N;
      return fx >= 0 && fy >= 0 && fx < A.N && fy < A.N ? Math.floor(fy) * A.N + Math.floor(fx) : -1;
    };
    const pertoCidade = (wx, wz) => {
      let p = 0;
      for (const g of this.grandes) {
        const d = Math.hypot(g.x - wx, g.z - wz);
        if (d < g.r) p = Math.max(p, 1 - d / g.r);
      }
      return p;
    };
    const livre = (wx, wz) => !this.marcos.some((m) => Math.hypot(m.x - wx, m.z - wz) < m.r);

    if (osm && osm.length) {
      this.estat.osm++;
      const B = new Construtor();
      for (const el of osm) {
        if (el.type !== 'way' || !el.geometry || el.geometry.length < 4) continue;
        const pts = el.geometry.map((p) => { const w = paraMundo(p.lat, p.lon); return { x: w.x - centro.x, z: w.z - centro.z }; });
        if (Math.hypot(pts[0].x - pts[pts.length - 1].x, pts[0].z - pts[pts.length - 1].z) < 0.01) pts.pop();
        if (pts.length < 3) continue;
        const area = Math.abs(areaAssinada(pts));
        if (area < 12 || area > 40000) continue;
        const cxm = pts.reduce((a, p) => a + p.x, 0) / pts.length, czm = pts.reduce((a, p) => a + p.z, 0) / pts.length;
        if (!livre(cxm + centro.x, czm + centro.z)) continue;
        // marca as células do prédio como ocupadas (sem árvores em cima de casas)
        for (const p of [...pts, { x: cxm, z: czm }]) {
          const c = celulaDe(p.x + centro.x, p.z + centro.z);
          if (c >= 0) ocupado[c] = 1;
        }
        this._predioOSM(B, pts, area, el.tags, centro, aleat, pertoCidade(cxm + centro.x, czm + centro.z) > 0.15);
      }
      for (const m of B.malhas((k) => this._material(k))) grupo.add(m);
    } else {
      this.estat.reserva++;
      this._casasReserva(grupo, A, x, y, centro, aleat, ocupado, livre, pertoCidade);
    }
    this._arvores(grupo, A, x, y, centro, aleat, ocupado, livre);
    return grupo;
  }

  _predioOSM(B, pts, area, tags, centro, r, urbano) {
    const cxm = pts.reduce((a, p) => a + p.x, 0) / pts.length, czm = pts.reduce((a, p) => a + p.z, 0) / pts.length;
    const { lat, lon } = paraLatLon(cxm + centro.x, czm + centro.z);
    const est = estilo(lat, lon, area, urbano, r, tags);
    const t = tags || {};
    const andarAlt = est.andarAlt || 3;
    let h = parseFloat(t.height) || (parseFloat(t['building:levels']) || est.andares) * andarAlt;
    h = Math.max(2.5, Math.min(h, 60));
    let gMin = 1e9, gSom = 0;
    for (const p of pts) { const g = chao(p.x + centro.x, p.z + centro.z, false) ?? 0; gMin = Math.min(gMin, g); gSom += g; }
    const y0 = gMin - 0.6, y1 = gSom / pts.length + h;
    const ret = retanguloMinimo(pts);
    const retangular = ret && area / (ret.L * ret.W) > 0.82 && ret.W < 22 && !est.plano;
    let contorno = pts;
    if (retangular) {
      // usa o retângulo alinhado com o prédio (o telhado de duas águas encaixa certinho)
      const c = Math.cos(ret.ang), s = Math.sin(ret.ang), L = ret.L / 2, W = ret.W / 2;
      contorno = [[-L, -W], [L, -W], [L, W], [-L, W]].map(([u, v]) => ({ x: ret.cx + u * c - v * s, z: ret.cz + u * s + v * c }));
    }
    const sinal = areaAssinada(contorno) > 0 ? 1 : -1;
    let u = 0;
    for (let i = 0; i < contorno.length; i++) {
      const a = contorno[i], b = contorno[(i + 1) % contorno.length];
      const dx = b.x - a.x, dz = b.z - a.z, L = Math.hypot(dx, dz) || 1;
      u = B.parede(est.parede, a.x, a.z, b.x, b.z, y0, y1, u, sinal * dz / L, -sinal * dx / L);
    }
    if (retangular) this._telhadoDuasAguas(B, ret, y1, est);
    else this._telhadoPlano(B, contorno, y1, est.telhado);
  }

  _telhadoDuasAguas(B, ret, y1, est) {
    const incl = Math.min(est.incl, Math.atan2(6, ret.W / 2) * 180 / Math.PI) * Math.PI / 180;
    const sobe = (ret.W / 2) * Math.tan(incl);
    const c = Math.cos(ret.ang), s = Math.sin(ret.ang);
    // (u, v) no sistema do prédio: u ao longo da cumeeira, v atravessado
    const P = (u, v, y) => [ret.cx + u * c - v * s, y, ret.cz + u * s + v * c];
    const L = ret.L / 2, W = ret.W / 2, beiral = 0.4;
    const yb = y1 - beiral * Math.tan(incl), yc = y1 + sobe;
    const comp = Math.hypot(W + beiral, sobe + beiral * Math.tan(incl));
    const [su, sv] = ESC_TELHADO;
    for (const lado of [-1, 1]) {
      const nl = [-s * lado * Math.sin(incl), Math.cos(incl), c * lado * Math.sin(incl)];
      B.quad(est.telhado, P(-L - beiral, lado * (W + beiral), yb), P(L + beiral, lado * (W + beiral), yb),
        P(L + beiral, 0, yc), P(-L - beiral, 0, yc), nl,
        [0, 0], [(ret.L + 2 * beiral) / su, 0], [(ret.L + 2 * beiral) / su, comp / sv], [0, comp / sv]);
    }
    // empenas (triângulos das pontas) com a textura da parede
    for (const ponta of [-1, 1]) {
      B.tri(est.parede, P(ponta * L, -W, y1), P(ponta * L, W, y1), P(ponta * L, 0, yc), [c * ponta, 0, s * ponta],
        [0, 0], [ret.W / ESC_PAREDE[0], 0], [ret.W / 2 / ESC_PAREDE[0], sobe / ESC_PAREDE[1]]);
    }
    // chaminé de tijolo
    if (est.chamine && ret.L > 6) {
      const u = L * 0.6, cw = 0.35, cd = 0.45, ys = yc - 0.8, ye = yc + 1.3;
      const q = [[u - cw, -cd], [u + cw, -cd], [u + cw, cd], [u - cw, cd]].map(([a, b]) => P(a, b, 0));
      for (let i = 0; i < 4; i++) {
        const a = q[i], b = q[(i + 1) % 4];
        const dx = b[0] - a[0], dz = b[2] - a[2], l = Math.hypot(dx, dz);
        const n = [dz / l, 0, -dx / l];
        // normal para fora do centro da chaminé
        const mx = (a[0] + b[0]) / 2 - (q[0][0] + q[2][0]) / 2, mz = (a[2] + b[2]) / 2 - (q[0][2] + q[2][2]) / 2;
        if (n[0] * mx + n[2] * mz < 0) { n[0] = -n[0]; n[2] = -n[2]; }
        B.quad('Chamine', [a[0], ys, a[2]], [b[0], ys, b[2]], [b[0], ye, b[2]], [a[0], ye, a[2]], n, [0, 0], [1, 0], [1, 1], [0, 1]);
      }
      B.quad('Chamine', [q[0][0], ye, q[0][2]], [q[1][0], ye, q[1][2]], [q[2][0], ye, q[2][2]], [q[3][0], ye, q[3][2]], [0, 1, 0],
        [0, 0], [1, 0], [1, 1], [0, 1]);
    }
  }

  _telhadoPlano(B, contorno, y1, mat) {
    const v2 = contorno.map((p) => new THREE.Vector2(p.x, p.z));
    let tris;
    try { tris = THREE.ShapeUtils.triangulateShape(v2, []); } catch (e) { return; }
    const [su, sv] = ESC_TELHADO;
    for (const [a, b, c] of tris) {
      const A = contorno[a], Bp = contorno[b], C = contorno[c];
      B.tri(mat, [A.x, y1, A.z], [Bp.x, y1, Bp.z], [C.x, y1, C.z], [0, 1, 0],
        [A.x / su, A.z / sv], [Bp.x / su, Bp.z / sv], [C.x / su, C.z / sv]);
    }
  }

  // ------------------------------------------------------------ casas do Blender (sem OSM)
  _casasReserva(grupo, A, x, y, centro, aleat, ocupado, livre, pertoCidade) {
    const { N, P, cel } = A;
    const urb = (cx, cy) => cx >= 0 && cy >= 0 && cx < N && cy < N && cel[cy * N + cx].fb > 0.38 && cel[cy * N + cx].tex > 0.07;
    const porModelo = new Map();
    for (let cy = 0; cy < N; cy++) {
      for (let cx = 0; cx < N; cx++) {
        if (!urb(cx, cy)) continue;
        const c = cel[cy * N + cx];
        // posição: no meio dos pixels de telhado da célula (fora das ruas largas)
        const fx = x + (cx * P + c.bx + 0.5) / 256, fy = y + (cy * P + c.by + 0.5) / 256;
        const w = paraMundo(ty2lat(fy, Z), tx2lon(fx, Z));
        if (ehAgua(w.x, w.z, false) === true || !livre(w.x, w.z)) continue;
        let viz = 0;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) if (urb(cx + dx, cy + dy)) viz++;
        if (viz < 4) continue; // telhados precisam formar um grupo (evita estradas e campos)
        const { lat } = paraLatLon(w.x, w.z);
        const perto = pertoCidade(w.x, w.z);
        const regiao = perto > 0.25 && viz >= 7 ? 'cidade' : lat > 50 ? 'norte' : lat < 44.8 ? 'sul' : lat > 47.6 ? 'normandia' : 'centro';
        const lista = CASAS_RESERVA[regiao];
        let modelo = lista[Math.floor(aleat() * lista.length)];
        if (modelo === 'predio_haussmann' && perto < 0.5) modelo = 'casa_cidade';
        // direção das ruas: orientação dominante das bordas na célula (tensor de estrutura da foto)
        const ang = 0.5 * Math.atan2(2 * c.gxy, c.gxx - c.gyy);
        const rot = -ang + (aleat() < 0.5 ? 0 : Math.PI);
        if (!porModelo.has(modelo)) porModelo.set(modelo, []);
        porModelo.get(modelo).push({ x: w.x - centro.x, z: w.z - centro.z, rot, esc: 0.85 + aleat() * 0.2, wx: w.x, wz: w.z });
        ocupado[cy * N + cx] = 1;
      }
    }
    for (const [modelo, lista] of porModelo) this._instanciar(grupo, modelo, lista);
  }

  _arvores(grupo, A, x, y, centro, aleat, ocupado, livre) {
    const { N, P, cel } = A;
    const porModelo = new Map();
    let total = 0;
    for (let cy = 0; cy < N; cy++) {
      for (let cx = 0; cx < N; cx++) {
        const i = cy * N + cx;
        if (ocupado[i]) continue;
        const c = cel[i];
        let n = 0;
        if (c.m < 0.2 && c.tex > 0.04 && c.fb < 0.1 && c.gm > 0.15) n = 2;     // mata fechada
        else if (c.fd > 0.3 && c.tex > 0.05 && c.fb < 0.15) n = 1;                // cerca viva / bosque
        for (let k = 0; k < n && total < 1500; k++) {
          const fx = x + (cx * P + aleat() * P) / 256, fy = y + (cy * P + aleat() * P) / 256;
          const w = paraMundo(ty2lat(fy, Z), tx2lon(fx, Z));
          if (!livre(w.x, w.z) || ehAgua(w.x, w.z, false) === true) continue;
          const tipo = tipoArvore(ty2lat(fy, Z), aleat);
          if (!porModelo.has(tipo)) porModelo.set(tipo, []);
          porModelo.get(tipo).push({ x: w.x - centro.x, z: w.z - centro.z, rot: aleat() * 6.28, esc: 0.75 + aleat() * 0.6, wx: w.x, wz: w.z });
          total++;
        }
      }
    }
    for (const [modelo, lista] of porModelo) this._instanciar(grupo, modelo, lista);
  }

  // GPU instancing: 1 InstancedMesh por parte (material) do modelo do Blender
  _instanciar(grupo, modelo, lista) {
    const partes = partesInstancia(modelo);
    const o = new THREE.Object3D();
    const mats = lista.map((e) => {
      const g = chao(e.wx, e.wz, false) ?? 0;
      o.position.set(e.x, g - 0.2, e.z);
      o.rotation.set(0, e.rot, 0);
      o.scale.setScalar(e.esc);
      o.updateMatrix();
      return o.matrix.clone();
    });
    for (const p of partes) {
      const m = new THREE.InstancedMesh(p.geometria, p.material, lista.length);
      mats.forEach((mt, i) => m.setMatrixAt(i, mt));
      m.instanceMatrix.needsUpdate = true;
      m.castShadow = true;
      m.receiveShadow = true;
      m.computeBoundingSphere();
      grupo.add(m);
    }
  }
}
