// Construções do kit feito no Blender (www/modelos/kit.js): casas, sobrados, lojas e galpões.
// Cada construção retangular do mapa real recebe o módulo que cabe nela, virado para a rua e esticado
// para o tamanho dela. Perto da câmera aparece o modelo detalhado; longe, uma versão simples (caixa + telhado).
// Tudo desenhado com InstancedMesh (poucas chamadas de desenho), atualizado quando a câmera anda.
import * as THREE from 'three';
import { predios, grade, GW, GH, CEL, ehRua, T, QUAL, BRASIL, META, MAT_PREDIOS, texTelha } from './mapa.js';

const KIT = window.KIT_PREDIOS || null;
const CELULA = 200;   // grade espacial para achar as construções perto da câmera

function b64(s) { const b = atob(s), u = new Uint8Array(b.length); for (let i = 0; i < b.length; i++) u[i] = b.charCodeAt(i); return u.buffer; }

// textura de reboco (manchas leves) para as paredes
function texReboco() {
  const N = 128, c = document.createElement('canvas'); c.width = c.height = N;
  const g = c.getContext('2d');
  g.fillStyle = '#f2f2f2'; g.fillRect(0, 0, N, N);
  let s = 5; const r = () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; };
  for (let k = 0; k < 500; k++) { const v = 220 + r() * 35 | 0; g.fillStyle = `rgba(${v},${v},${v},0.18)`; g.fillRect(r() * N, r() * N, 2 + r() * 8, 2 + r() * 8); }
  const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ---------------- materiais ----------------
let MAT = null;
function materiais() {
  if (MAT) return MAT;
  const corpo = new THREE.MeshLambertMaterial({ vertexColors: true, map: texReboco() });
  // paredes (tinge = 1) recebem a cor de cada casa; molduras, portas e grades mantêm a cor própria
  corpo.onBeforeCompile = (sh) => {
    sh.vertexShader = 'attribute float tinge;\n' + sh.vertexShader.replace('#include <color_vertex>', `
      vColor = vec3(1.0);
      #ifdef USE_COLOR_ALPHA
      #else
      vColor *= color;
      #endif
      #ifdef USE_INSTANCING_COLOR
      vColor *= mix(vec3(1.0), instanceColor.rgb, tinge);
      #endif`);
  };
  const tt = texTelha(); tt.repeat.set(1, 1);
  const telha = new THREE.MeshLambertMaterial({ vertexColors: true, map: tt });
  // vidro: escuro de dia; à noite acende conforme a "luz" de cada casa (canal vermelho da cor da instância)
  const vidro = new THREE.MeshLambertMaterial({ color: 0x1d2a36, emissive: 0xffd49a, emissiveIntensity: 0 });
  vidro.onBeforeCompile = (sh) => {
    sh.fragmentShader = sh.fragmentShader.replace('#include <color_fragment>', '')
      .replace('#include <emissivemap_fragment>', '#include <emissivemap_fragment>\n#ifdef USE_INSTANCING_COLOR\ntotalEmissiveRadiance *= vColor.r;\n#endif');
  };
  MAT_PREDIOS.kitVidro = vidro;   // o ciclo de dia e noite acende as janelas
  MAT = { C: corpo, T: telha, V: vidro };
  return MAT;
}

// ---------------- geometrias dos módulos ----------------
function geoParte(pt, escUV) {
  const P = new Int16Array(b64(pt.p)), N = new Int8Array(b64(pt.n)), C = new Uint8Array(b64(pt.c)), Tn = new Uint8Array(b64(pt.t)), U = new Int16Array(b64(pt.uv));
  const n = P.length / 3;
  const pos = new Float32Array(n * 3), nor = new Float32Array(n * 3), cor = new Float32Array(n * 3), tin = new Float32Array(n), uv = new Float32Array(n * 2);
  for (let i = 0; i < n * 3; i++) { pos[i] = P[i] / 1000; nor[i] = N[i] / 127; cor[i] = C[i] / 255; }
  for (let i = 0; i < n; i++) tin[i] = Tn[i];
  for (let i = 0; i < n * 2; i++) uv[i] = U[i] / 512 * escUV;
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  g.setAttribute('color', new THREE.BufferAttribute(cor, 3));
  g.setAttribute('tinge', new THREE.BufferAttribute(tin, 1));
  g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  g.setIndex(new THREE.BufferAttribute(new Uint16Array(b64(pt.i)), 1));
  return g;
}

// versão simples para longe: caixa da parede + telhado (duas águas ou plano com platibanda)
function geoSimples(m) {
  const { w, d, h } = m;
  // caixa sem a face de baixo (e sem a de cima quando o telhado cobre)
  const cx0 = new THREE.BoxGeometry(w, h, d).translate(0, h / 2, 0).toNonIndexed();
  const caixa = new THREE.BufferGeometry();
  for (const nomeA of ['position', 'normal', 'uv']) {
    const a = cx0.attributes[nomeA], it = a.itemSize, arr = [];
    for (let i = 0; i < a.count; i++) {
      // ordem da BoxGeometry: +x, -x, cima (12-17), baixo (18-23), +z, -z
      if ((i >= 18 && i < 24) || (m.tipo === 'pitched' && i >= 12 && i < 18)) continue;
      for (let k = 0; k < it; k++) arr.push(a.array[i * it + k]);
    }
    caixa.setAttribute(nomeA, new THREE.Float32BufferAttribute(arr, it));
  }
  const n = caixa.attributes.position.count;
  const cor = new Float32Array(n * 3), tin = new Float32Array(n).fill(1);
  for (let i = 0; i < n; i++) { const y = caixa.attributes.position.getY(i), f = 0.72 + 0.28 * Math.min(1, y / h); cor[i * 3] = cor[i * 3 + 1] = cor[i * 3 + 2] = f; }
  caixa.setAttribute('color', new THREE.BufferAttribute(cor, 3));
  caixa.setAttribute('tinge', new THREE.BufferAttribute(tin, 1));
  const r = { C: caixa };
  if (m.tipo === 'pitched' && m.partes.T) {
    const a = w / 2 + 0.5, b = d / 2 + 0.5, alt = m.d > 20 ? 2.6 : 2.0;
    const v = [-a, h, -b, a, h, -b, a, h + alt, 0, -a, h, -b, a, h + alt, 0, -a, h + alt, 0,
      -a, h + alt, 0, a, h + alt, 0, a, h, b, -a, h + alt, 0, a, h, b, -a, h, b];
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(v, 3));
    g.computeVertexNormals();
    const k = v.length / 3, c = new Float32Array(k * 3).fill(0.95), uv = new Float32Array(k * 2);
    for (let i = 0; i < k; i++) { uv[i * 2] = v[i * 3] * 0.35; uv[i * 2 + 1] = v[i * 3 + 2] * 0.35; }
    g.setAttribute('color', new THREE.BufferAttribute(c, 3));
    g.setAttribute('tinge', new THREE.BufferAttribute(new Float32Array(k), 1));
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    r.T = g;
  }
  return r;
}

// ---------------- encaixe nas construções do mapa ----------------
// menor retângulo que contém o polígono (direção de uma das arestas)
function retangulo(p) {
  const pts = p.pts, n = pts.length / 2;
  let best = null;
  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n, ex = pts[j * 2] - pts[i * 2], ez = pts[j * 2 + 1] - pts[i * 2 + 1], L = Math.hypot(ex, ez);
    if (L < 0.5) continue;
    const ux = ex / L, uz = ez / L;
    let a0 = 1e9, a1 = -1e9, b0 = 1e9, b1 = -1e9;
    for (let k = 0; k < n; k++) {
      const x = pts[k * 2], z = pts[k * 2 + 1], a = x * ux + z * uz, b = -x * uz + z * ux;
      if (a < a0) a0 = a; if (a > a1) a1 = a; if (b < b0) b0 = b; if (b > b1) b1 = b;
    }
    const area = (a1 - a0) * (b1 - b0);
    if (!best || area < best.area) best = { area, ux, uz, la: a1 - a0, lb: b1 - b0, am: (a0 + a1) / 2, bm: (b0 + b1) / 2 };
  }
  if (!best) return null;
  best.cx = best.am * best.ux - best.bm * best.uz;
  best.cz = best.am * best.uz + best.bm * best.ux;
  return best;
}

// distância até a rua mais próxima saindo do centro de um lado, na direção (nx, nz)
function distRua(cx, cz, nx, nz, meio) {
  for (let s = meio; s < meio + 26; s += 2) {
    const x = cx + nx * s, z = cz + nz * s;
    const c = Math.floor(z / CEL) * GW + Math.floor(x / CEL);
    if (x < 0 || z < 0 || x >= GW * CEL || z >= GH * CEL) return 999;
    const t = grade[c];
    if (ehRua(t) || t === T.PONTE) return s - meio;
  }
  return 999;
}

function hashId(id, k) { let x = (id * 374761393 + k * 668265263) >>> 0; x = ((x ^ (x >>> 13)) * 1274126177) >>> 0; return (x ^ (x >>> 16)) / 4294967296; }

// estilo de cada região: módulos preferidos (peso) por altura e cores de parede/telhado
const ESTILOS = {
  brasil: {
    terrea: [['casa_telha', 52], ['casa_alpendre', 28], ['loja', 6], ['casa_plana', 6]],
    sobrado: [['sobrado_telha', 45], ['sobrado_laje', 45], ['loja', 10]],
    paredes: [0xf4efe4, 0xf2e2b8, 0xe9d7a6, 0xd9e8d0, 0xcfe0ea, 0xf1d2c0, 0xe8b996, 0xffffff, 0xf7e7a6, 0xd7d0e8, 0xc9dcc0, 0xeac8a0],
    telhas: [0xb5502e, 0xa8462a, 0xc0603a, 0x9c4a30, 0x8f3f26, 0x8a8f94, 0x9a9fa3, 0xb8562f],
  },
  eua: {
    terrea: [['casa_plana', 45], ['casa_telha', 30], ['casa_alpendre', 15], ['loja', 10]],
    sobrado: [['sobrado_telha', 45], ['sobrado_laje', 35], ['loja', 20]],
    paredes: [0xf7c7cc, 0xbfe8dc, 0xf7e7a6, 0xbfdcf2, 0xf6f2ea, 0xf9d7b2, 0xdccbf0, 0xffffff, 0xc9f0e6, 0xffd0dc, 0xf2ead8],
    telhas: [0x9c9286, 0x7d7a74, 0xb5502e, 0x6a6f74, 0xa89880, 0x8f3f26],
  },
  mexico: {
    terrea: [['casa_plana', 55], ['loja', 25], ['casa_telha', 20]],
    sobrado: [['sobrado_laje', 70], ['loja', 20], ['sobrado_telha', 10]],
    paredes: [0xe9578e, 0xf2c14e, 0x4fa3d1, 0xf28a3a, 0x8fd18a, 0xf5ead0, 0xd1495b, 0xffffff, 0x9b7fd1],
    telhas: [0xb5502e, 0xa8462a, 0x9c4a30],
  },
};
const ESTILO = BRASIL ? ESTILOS.brasil : META.cidade === 'mexico' ? ESTILOS.mexico : ESTILOS.eua;

function sortear(lista, r) {
  let tot = 0; for (const [, p] of lista) tot += p;
  let x = r * tot;
  for (const [n, p] of lista) { if ((x -= p) <= 0) return n; }
  return lista[0][0];
}

// tenta encaixar um módulo: escala de cada eixo entre 0,62 e 1,6 do tamanho padrão
function encaixa(m, larg, fundo) {
  const sx = larg / m.w, sz = fundo / m.d;
  return sx > 0.62 && sx < 1.6 && sz > 0.62 && sz < 1.9;   // casa mais funda só alonga as paredes laterais
}

// ---------------- construção do sistema ----------------
export function construirKit(cena) {
  if (!KIT) return null;
  const mats = materiais();
  const escolhidos = [];
  for (const p of predios) {
    if (p.removido || p.base || p.h >= 11) continue;
    const n = p.pts.length / 2;
    if (n < 4 || n > 8) continue;
    const r = retangulo(p);
    if (!r || p.area / r.area < 0.8 || Math.min(r.la, r.lb) < 4.5) continue;
    const area = r.la * r.lb;
    if (area > 2600) continue;
    // frente: o lado mais perto de uma rua
    const lados = [[-r.uz, r.ux, r.lb / 2, r.la], [r.uz, -r.ux, r.lb / 2, r.la], [r.ux, r.uz, r.la / 2, r.lb], [-r.ux, -r.uz, r.la / 2, r.lb]];
    let fr = lados[0], md = 1e9;
    // empate: a fachada maior fica de frente
    for (const l of lados) { const dd = distRua(r.cx, r.cz, l[0], l[1], l[2]) - (l[3] >= Math.max(r.la, r.lb) - 0.01 ? 0.5 : 0); if (dd < md) { md = dd; fr = l; } }
    const [nx, nz, meio, larg] = fr;
    const fundo = meio * 2;
    // módulo: galpão para os grandes, senão conforme a altura e o estilo da região.
    // Fileira comprida (casas geminadas): divide a frente em 2 a 4 casas lado a lado.
    let nome = null, partes = 1;
    const rr = hashId(p.id, 1);
    if (area > 420 && Math.min(larg, fundo) > 12) nome = encaixa(KIT.galpao, larg, fundo) || encaixa(KIT.galpao, fundo, larg) ? 'galpao' : null;
    if (!nome) {
      const lista = (p.h >= 6.0 ? ESTILO.sobrado : ESTILO.terrea).slice();
      for (let tent = 0; tent < 6 && !nome && lista.length; tent++) {
        const cand = sortear(lista, (rr + tent * 0.37) % 1);
        for (let k = 1; k <= 4 && !nome; k++) if (encaixa(KIT[cand], larg / k, fundo)) { nome = cand; partes = k; }
        if (!nome) lista.splice(lista.findIndex((a) => a[0] === cand), 1);
      }
    }
    if (!nome) continue;
    const m = KIT[nome];
    // o galpão fica com o comprimento ao longo do maior lado
    let lx = larg, lz = fundo, fx = nx, fz = nz;
    if (nome === 'galpao' && !encaixa(m, larg, fundo)) { lx = fundo; lz = larg; fx = -nz; fz = nx; }
    const un = lx / partes, sx = un / m.w, sz = lz / m.d;
    const sy = Math.max(0.85, Math.min(1.3, p.h / m.h));
    // a altura de jogo (telhado onde os soldados ficam) acompanha o modelo
    p.h = m.h * sy + (m.tipo === 'pitched' ? 0.8 : 0.9);
    p.kit = nome;
    const ang = Math.atan2(fx, fz), q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), ang);
    const ax = Math.cos(ang), az = -Math.sin(ang);   // eixo da largura (x local)
    for (let i = 0; i < partes; i++) {
      const off = (i + 0.5) * un - lx / 2;
      const x = r.cx + ax * off, z = r.cz + az * off;
      // casas vizinhas da mesma fileira: módulo pode variar entre casa de telha e com alpendre, cores diferentes
      const mat = new THREE.Matrix4().compose(new THREE.Vector3(x, 0, z), q, new THREE.Vector3(sx, sy, sz));
      const parede = new THREE.Color(ESTILO.paredes[Math.floor(hashId(p.id, 2 + i * 7) * ESTILO.paredes.length)]);
      const telha = new THREE.Color(ESTILO.telhas[Math.floor(hashId(p.id, 3 + (partes > 1 && hashId(p.id, 9) < 0.5 ? 0 : i * 7)) * ESTILO.telhas.length)]);
      const luz = hashId(p.id, 4 + i * 7) < 0.55 ? 1 : 0.06;
      escolhidos.push({ p, nome, mat: mat.elements.slice(), parede, telha, luz, x, z });
    }
  }
  // malhas instanciadas: perto (detalhe) e longe (simples), uma por parte de cada módulo
  const porModulo = {};
  for (const e of escolhidos) (porModulo[e.nome] || (porModulo[e.nome] = [])).push(e);
  const malhas = { perto: {}, longe: {} };
  const todas = [];
  for (const nome in porModulo) {
    const m = KIT[nome], cap = porModulo[nome].length;
    const det = {}, simp = geoSimples(m);
    for (const k in m.partes) det[k] = geoParte(m.partes[k], k === 'T' ? 0.35 : 0.25);
    for (const [nivel, geos] of [['perto', det], ['longe', simp]]) {
      malhas[nivel][nome] = {};
      for (const k in geos) {
        const im = new THREE.InstancedMesh(geos[k], mats[k], cap);
        im.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(cap * 3), 3);
        im.count = 0; im.frustumCulled = false;
        im.castShadow = QUAL >= 1 && nivel === 'perto'; im.receiveShadow = QUAL >= 1;
        im.name = 'kit';
        cena.add(im);
        malhas[nivel][nome][k] = im;
        todas.push(im);
      }
    }
  }
  // grade espacial
  const grade2 = new Map();
  for (const e of escolhidos) {
    const k = Math.floor(e.x / CELULA) + ',' + Math.floor(e.z / CELULA);
    (grade2.get(k) || grade2.set(k, []).get(k)).push(e);
  }
  return { escolhidos, malhas, todas, grade: grade2, ultimo: null };
}

// atualiza o que aparece perto e longe da câmera (chamado a cada quadro; só refaz quando a câmera anda)
const _dir = new THREE.Vector3();
export function atualizarKit(kit, alvo, distCam, alcance, camera, agora) {
  if (!kit) return;
  const u = kit.ultimo;
  camera.getWorldDirection(_dir);
  const cx = camera.position.x, cz = camera.position.z;
  if (u && Math.hypot(alvo.x - u.x, alvo.z - u.z) < 10 && Math.abs(distCam - u.d) < u.d * 0.08 && _dir.x * u.dx + _dir.z * u.dz > 0.995 && agora - u.t < 2000) return;
  kit.ultimo = { x: alvo.x, z: alvo.z, d: distCam, dx: _dir.x, dz: _dir.z, t: agora };
  const rPerto = Math.min(QUAL === 0 ? 200 : QUAL === 1 ? 280 : 330, Math.max(120, distCam * 0.8 + 80));
  // casas são pequenas: bem longe não aparecem (a névoa já as apaga)
  const rLonge = Math.min(alcance, QUAL === 0 ? 1100 : QUAL === 1 ? 1600 : 2200);
  for (const nivel in kit.malhas) for (const nome in kit.malhas[nivel]) for (const k in kit.malhas[nivel][nome]) kit.malhas[nivel][nome][k].count = 0;
  const dl = Math.hypot(_dir.x, _dir.z) || 1, ddx = _dir.x / dl, ddz = _dir.z / dl;
  const c0x = Math.floor((alvo.x - rLonge) / CELULA), c1x = Math.floor((alvo.x + rLonge) / CELULA);
  const c0z = Math.floor((alvo.z - rLonge) / CELULA), c1z = Math.floor((alvo.z + rLonge) / CELULA);
  for (let gx = c0x; gx <= c1x; gx++) for (let gz = c0z; gz <= c1z; gz++) {
    const lista = kit.grade.get(gx + ',' + gz);
    if (!lista) continue;
    for (const e of lista) {
      if (e.p.removido) continue;
      const dx = e.x - alvo.x, dz = e.z - alvo.z, d2 = dx * dx + dz * dz;
      if (d2 > rLonge * rLonge) continue;
      // atrás da câmera não desenha
      const vx = e.x - cx, vz = e.z - cz;
      if (vx * ddx + vz * ddz < -60) continue;
      const nivel = d2 < rPerto * rPerto ? 'perto' : 'longe';
      const ms = kit.malhas[nivel][e.nome];
      for (const k in ms) {
        const im = ms[k], i = im.count++;
        im.instanceMatrix.array.set(e.mat, i * 16);
        const c = k === 'T' ? e.telha : k === 'V' ? { r: e.luz, g: e.luz, b: e.luz } : e.parede;
        im.instanceColor.array[i * 3] = c.r; im.instanceColor.array[i * 3 + 1] = c.g; im.instanceColor.array[i * 3 + 2] = c.b;
      }
    }
  }
  for (const im of kit.todas) { im.instanceMatrix.needsUpdate = true; im.instanceColor.needsUpdate = true; im.visible = im.count > 0; }
}

// prédio em L / recortado: rasteriza no eixo do retângulo (células de 4 m) e cobre com retângulos
// (fileiras de células iguais empilhadas). Cada retângulo vira um bloco reto, com a altura do original.
function decompor(p, r) {
  const C = 4, nx = Math.max(1, Math.round(r.la / C)), nz = Math.max(1, Math.round(r.lb / C));
  if (nx * nz > 4000) return false;
  const ca = r.la / nx, cb = r.lb / nz, ux = r.ux, uz = r.uz;
  const a0 = -r.la / 2, b0 = -r.lb / 2;
  const cel = new Uint8Array(nx * nz);
  for (let j = 0; j < nz; j++) for (let i = 0; i < nx; i++) {
    const a = a0 + (i + 0.5) * ca, b = b0 + (j + 0.5) * cb;
    cel[j * nx + i] = dentroPol(p, r.cx + a * ux - b * uz, r.cz + a * uz + b * ux) ? 1 : 0;
  }
  const rets = [];
  let abertos = [];   // [i0, i1, j0]
  for (let j = 0; j <= nz; j++) {
    const corridas = [];
    if (j < nz) for (let i = 0; i < nx;) { if (!cel[j * nx + i]) { i++; continue; } let k = i; while (k < nx && cel[j * nx + k]) k++; corridas.push([i, k]); i = k; }
    const novos = [];
    for (const o of abertos) {
      const ig = corridas.findIndex((c) => c[0] === o[0] && c[1] === o[1]);
      if (ig >= 0) { novos.push(o); corridas.splice(ig, 1); } else rets.push([o[0], o[1], o[2], j]);
    }
    for (const c of corridas) novos.push([c[0], c[1], j]);
    abertos = novos;
  }
  // o maior bloco fica com o prédio original (e a altura dele)
  // sem tiras finas (degraus das bordas inclinadas) e no máximo 6 blocos por prédio
  const blocos = rets.filter(([i0, i1, j0, j1]) => (i1 - i0) * ca >= 6 && (j1 - j0) * cb >= 6)
    .sort((x, y) => (y[1] - y[0]) * (y[3] - y[2]) - (x[1] - x[0]) * (x[3] - x[2])).slice(0, 6);
  if (!blocos.length) return false;
  for (let k = 0; k < blocos.length; k++) {
    const [i0, i1, j0, j1] = blocos[k];
    const A0 = a0 + i0 * ca, A1 = a0 + i1 * ca, B0 = b0 + j0 * cb, B1 = b0 + j1 * cb;
    const cant = [[A0, B0], [A1, B0], [A1, B1], [A0, B1]].map(([a, b]) => [r.cx + a * ux - b * uz, r.cz + a * uz + b * ux]);
    // blocos menores do mesmo prédio ficam um pouco mais baixos (escalonamento)
    const h = k === 0 ? p.h : Math.max(4, p.h * (0.7 + 0.3 * hashId(p.id, 20 + k)));
    if (k === 0) aplicarRet(p, cant);
    else {
      const q = { id: predios.length, h, guarnicao: [], civis: 0, sos: false, integridade: 100, removido: false, cap: 6 };
      aplicarRet(q, cant);
      q.cap = Math.max(4, Math.min(24, Math.round(q.area / 50) + Math.floor(h / 10)));
      predios.push(q);
    }
  }
  return true;
}
function dentroPol(p, x, z) {
  const pts = p.pts, n = pts.length / 2;
  let d = false;
  for (let i = 0, j = n - 1; i < n; j = i++) {
    const xi = pts[i * 2], zi = pts[i * 2 + 1], xj = pts[j * 2], zj = pts[j * 2 + 1];
    if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) d = !d;
  }
  return d;
}
function aplicarRet(p, cant) {
  let s = 0;
  for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; s += cant[i][0] * cant[j][1] - cant[j][0] * cant[i][1]; }
  if (s > 0) cant.reverse();
  const pts = new Float32Array(8);
  let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9, cx = 0, cz = 0;
  cant.forEach(([x, z], i) => { pts[i * 2] = x; pts[i * 2 + 1] = z; cx += x / 4; cz += z / 4; x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z); });
  Object.assign(p, { pts, area: Math.abs(s) / 2, cx, cz, x0, x1, z0, z1, raio: Math.max(x1 - x0, z1 - z0) / 2 });
}

// Contornos "derretidos" dos mapas lidos da Esri (Miami, SF, México, Flórida): cada prédio vira o retângulo
// que melhor o representa (mesma área aproximada, alinhado ao lado principal). Prédios em L ou muito
// recortados (menos de 60% do retângulo) ficam como estão. Os do OpenStreetMap já vêm certos.
export function regularizarPredios() {
  if (META.fonte === 'osm') return 0;
  let n = 0;
  const total = predios.length;   // os blocos novos (dos prédios decompostos) entram no fim da lista
  for (let ip = 0; ip < total; ip++) {
    const p = predios[ip];
    if (p.base || p.pts.length / 2 < 5) continue;
    const r = retangulo(p);
    if (!r) continue;
    const fill = p.area / r.area;
    if (fill < 0.6) { if (decompor(p, r)) n++; continue; }
    const k = Math.max(0.86, Math.min(1, Math.sqrt(fill) * 1.02));
    const a = r.la / 2 * k, b = r.lb / 2 * k, ux = r.ux, uz = r.uz;
    aplicarRet(p, [[-a, -b], [a, -b], [a, b], [-a, b]].map(([da, db]) => [r.cx + da * ux - db * uz, r.cz + da * uz + db * ux]));
    n++;
  }
  return n;
}
