// Carrega os modelos .glb gerados no Blender e cria cópias (aliado = cores originais, Eixo = cinza/vermelho).
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const NOMES_MODELOS = [
  'sherman', 'm7_priest', 'jeep', 'halftrack', 'caminhao', 'soldado', 'soldado_bazuca', 'soldado_eixo', 'soldado_bazuca_eixo',
  'soldado_simples', 'soldado_bazuca_simples', 'p51', 'p80', 'b17',
  'c47', 'porta_avioes', 'contratorpedeiro', 'higgins', 'qg', 'quartel', 'garagem', 'aerodromo',
  'porto', 'bunker', 'antiaerea', 'torre_eiffel', 'arco_triunfo', 'catedral_bayeux', 'notre_dame',
  // cidade francesa (instanciadas na GPU)
  'casa_normanda', 'casa_pedra', 'fazenda', 'casa_cidade', 'casa_tijolo', 'casa_provence', 'predio_haussmann',
  'arvore_carvalho', 'arvore_choupo', 'macieira', 'pinheiro',
];

const base = {};
const porFaccao = [{}, {}];

const CORES_EIXO = {
  Pintura: 0x5c6064, PinturaEscura: 0x45484b, Insignia: 0xa8322a, InsigniaAzul: 0x2a2a2a,
  Aluminio: 0x6e7468, Farda: 0x5a6064, Calca: 0x4c5155, Branco: 0xd9d9d0, PinturaNavio: 0x6a6a66,
  Lona: 0x5f6060, Vermelho: 0x2a2a2a, Azul: 0x222222,
};

export async function carregarModelos(progresso) {
  const loader = new GLTFLoader();
  let n = 0;
  await Promise.all(NOMES_MODELOS.map(async (nome) => {
    try {
      const g = await loader.loadAsync(`./models/${nome}.glb`);
      base[nome] = g.scene;
      g.scene.traverse((o) => {
        if (o.isMesh) {
          o.castShadow = true;
          o.receiveShadow = true;
          o.material.side = THREE.DoubleSide;
          // o soldado detalhado (textura escura do uniforme) fica um pouco mais claro no campo de batalha
          if (/^soldado(_bazuca)?(_eixo)?$/.test(nome)) o.material.color.multiplyScalar(1.4);
        }
      });
    } catch (e) {
      console.warn('modelo faltando', nome, e);
      base[nome] = caixaReserva();
    }
    progresso?.(++n / NOMES_MODELOS.length);
  }));
}

function caixaReserva() {
  const g = new THREE.Group();
  g.add(new THREE.Mesh(new THREE.BoxGeometry(2, 2, 4), new THREE.MeshStandardMaterial({ color: 0x667744 })));
  return g;
}

function versaoEixo(nome) {
  // modelo com versão própria do Eixo (ex.: soldado com uniforme cinza feito no Blender)
  if (base[nome + '_eixo']) return base[nome + '_eixo'];
  const orig = base[nome];
  const c = orig.clone(true);
  const cache = new Map();
  c.traverse((o) => {
    if (!o.isMesh) return;
    const m = o.material;
    if (!cache.has(m)) {
      const nm = m.clone();
      const cor = CORES_EIXO[m.name];
      if (cor !== undefined) nm.color.setHex(cor);
      cache.set(m, nm);
    }
    o.material = cache.get(m);
  });
  return c;
}

export function instanciar(nome, faccao) {
  let molde = porFaccao[faccao][nome];
  if (!molde) {
    molde = faccao === 1 ? versaoEixo(nome) : base[nome];
    porFaccao[faccao][nome] = molde;
  }
  const o = molde.clone(true);
  o.userData.partes = {};
  o.traverse((p) => {
    if (['Torre', 'Helice', 'Rotor', 'RotorCauda'].includes(p.name)) o.userData.partes[p.name] = p;
  });
  return o;
}

// ---------------- Materiais compartilhados das construções (texturas pintadas no Blender) ----------------
const texLoader = new THREE.TextureLoader();
const matTex = new Map();
export function materialTextura(nome, duplo = false) {
  const k = nome + (duplo ? '2' : '');
  if (!matTex.has(k)) {
    const t = texLoader.load(`./texturas/${nome.toLowerCase()}.jpg`);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    matTex.set(k, new THREE.MeshLambertMaterial({ map: t, side: duplo ? THREE.DoubleSide : THREE.FrontSide }));
  }
  return matTex.get(k);
}
const CORES = { Chamine: 0x8a4a35 };
export function materialCor(nome) {
  const k = 'cor:' + nome;
  if (!matTex.has(k)) matTex.set(k, new THREE.MeshLambertMaterial({ color: CORES[nome] ?? 0x999999 }));
  return matTex.get(k);
}
const matVertice = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });

// Prepara um modelo do Blender para GPU instancing: junta as peças em poucas geometrias
// (1 por textura + 1 com todas as cores lisas como cor por vértice) -> poucas chamadas de desenho.
const partesCache = new Map();
export function partesInstancia(nome) {
  if (partesCache.has(nome)) return partesCache.get(nome);
  const raiz = base[nome];
  raiz.updateMatrixWorld(true);
  const grupos = new Map();
  raiz.traverse((o) => {
    if (!o.isMesh) return;
    let g = o.geometry.clone().applyMatrix4(o.matrixWorld);
    g = g.index ? g.toNonIndexed() : g;
    for (const a of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(a)) g.deleteAttribute(a);
    if (!g.attributes.normal) g.computeVertexNormals();
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    const nm = o.material.name || '';
    const texturizado = nm.startsWith('Parede') || nm.startsWith('Telhado');
    const k = texturizado ? nm : 'cores';
    if (!texturizado) {
      const c = o.material.color || new THREE.Color(0.7, 0.7, 0.7);
      const n = g.attributes.position.count;
      const cor = new Float32Array(n * 3);
      for (let i = 0; i < n; i++) { cor[i * 3] = c.r; cor[i * 3 + 1] = c.g; cor[i * 3 + 2] = c.b; }
      g.setAttribute('color', new THREE.Float32BufferAttribute(cor, 3));
    }
    if (!grupos.has(k)) grupos.set(k, []);
    grupos.get(k).push(g);
  });
  const partes = [];
  for (const [k, gs] of grupos) {
    const geometria = gs.length > 1 ? mergeGeometries(gs, false) : gs[0];
    geometria.computeBoundingSphere();
    partes.push({ geometria, material: k === 'cores' ? matVertice : materialTextura(k, true) });
  }
  partesCache.set(nome, partes);
  return partes;
}

// ---------------- Ícones táticos (estilo OTAN) para quando a câmera está longe ----------------
const iconCache = new Map();
export function texturaIcone(cat, faccao, selecionado = false) {
  const k = cat + faccao + (selecionado ? 's' : '');
  if (iconCache.has(k)) return iconCache.get(k);
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const cor = faccao === 0 ? '#3d7bd9' : '#d23b30';
  g.fillStyle = selecionado ? '#ffe36b' : cor;
  g.strokeStyle = '#111';
  g.lineWidth = 3;
  if (cat === 'air') {
    g.beginPath(); g.arc(32, 36, 22, Math.PI, 0); g.lineTo(54, 50); g.lineTo(10, 50); g.closePath();
  } else if (cat === 'ship') {
    g.beginPath(); g.moveTo(6, 26); g.lineTo(58, 26); g.lineTo(48, 50); g.lineTo(16, 50); g.closePath();
  } else if (cat === 'est') {
    g.beginPath(); g.rect(10, 14, 44, 38);
  } else {
    g.beginPath(); g.rect(6, 16, 52, 34);
  }
  g.fill(); g.stroke();
  g.strokeStyle = '#111';
  g.fillStyle = '#111';
  g.lineWidth = 3;
  g.beginPath();
  if (cat === 'inf') { g.moveTo(6, 16); g.lineTo(58, 50); g.moveTo(58, 16); g.lineTo(6, 50); g.stroke(); }
  if (cat === 'veh') { g.ellipse(32, 33, 18, 9, 0, 0, Math.PI * 2); g.stroke(); }
  if (cat === 'air') { g.moveTo(14, 38); g.quadraticCurveTo(23, 28, 32, 38); g.quadraticCurveTo(41, 28, 50, 38); g.stroke(); }
  if (cat === 'ship') { g.moveTo(32, 28); g.lineTo(32, 46); g.moveTo(24, 34); g.lineTo(40, 34); g.stroke(); }
  if (cat === 'est') { g.moveTo(22, 46); g.lineTo(22, 20); g.lineTo(42, 26); g.lineTo(22, 32); g.fill(); g.stroke(); }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  iconCache.set(k, t);
  return t;
}

export function rotulo(texto, cor = '#fff', fundo = 'rgba(0,0,0,0.55)') {
  const c = document.createElement('canvas');
  const g = c.getContext('2d');
  g.font = 'bold 28px sans-serif';
  const w = Math.ceil(g.measureText(texto).width) + 24;
  c.width = w; c.height = 40;
  g.font = 'bold 28px sans-serif';
  g.fillStyle = fundo;
  g.beginPath(); g.roundRect(0, 0, w, 40, 10); g.fill();
  g.fillStyle = cor;
  g.textBaseline = 'middle';
  g.fillText(texto, 12, 21);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return { textura: t, aspecto: w / 40 };
}
