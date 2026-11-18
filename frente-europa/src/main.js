// Frente Europa 1944 — jogo de estratégia em tempo real na Europa em tamanho real.
import * as THREE from 'three';
import { Terreno, SOL } from './terreno.js';
import { CameraRTS } from './camera.js';
import { carregarModelos, instanciar, texturaIcone } from './modelos.js';
import { Efeitos } from './efeitos.js';
import { ALIADOS, EIXO, Jogo } from './jogo.js';
import { IA } from './ia.js';
import { Piloto } from './piloto.js';
import { Cidades3D } from './cidades3d.js';
import { Pintor } from './pintor.js';
import { configOSM } from './osm.js';
import { CENARIO_AEREO, CENARIO_LIVRE, CENARIO_NORMANDIA, ESTRUTURAS, MARCOS, TIPOS } from './dados.js';
import { lat2ty, lon2tx, paraMundo, tx2lon, ty2lat, formatarDist } from './geo.js';
import { chao, definirExagero, preCarregar, tickRelevo } from './relevo.js';
import { estatRede } from './rede.js';
import { alternarSom, iniciarAudio } from './audio.js';

const $ = (s) => document.querySelector(s);
const COR_HORIZONTE = 0xc9d7e4, COR_ZENITE = 0x4a80c4;

// ------------------------------------------------------------------ renderização
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
// sombras suaves projetadas pelo sol (prédios, árvores, tanques, aviões)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
$('#tela').appendChild(renderer.domElement);
const cena = new THREE.Scene();
cena.background = new THREE.Color(COR_HORIZONTE);
// neblina atmosférica: o chão se mistura com a cor do horizonte (sem corte brusco entre céu e terra)
cena.fog = new THREE.Fog(COR_HORIZONTE, 1e5, 1e6);
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 1e6);
cena.add(new THREE.HemisphereLight(0xe6eeff, 0x59613d, 1.7));
const sol = new THREE.DirectionalLight(0xfff4e0, 2.0);
sol.position.copy(SOL);
sol.castShadow = true;
sol.shadow.mapSize.set(2048, 2048);
sol.shadow.bias = -0.0004;
sol.shadow.normalBias = 0.5;
sol.shadow.radius = 3;
cena.add(sol);
cena.add(sol.target);

// céu com degradê (azul em cima, claro e enevoado no horizonte)
const ceu = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 16), new THREE.ShaderMaterial({
  side: THREE.BackSide, depthWrite: false, fog: false,
  uniforms: { topo: { value: new THREE.Color(COR_ZENITE) }, horiz: { value: new THREE.Color(COR_HORIZONTE) } },
  vertexShader: `varying vec3 vP;
    void main() { vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = gl_Position.w; }`,
  fragmentShader: `uniform vec3 topo; uniform vec3 horiz; varying vec3 vP;
    void main() { float h = normalize(vP).y; vec3 c = mix(horiz, topo, pow(clamp(h, 0.0, 1.0), 0.5));
      gl_FragColor = vec4(c, 1.0);
      #include <colorspace_fragment>
    }`,
}));
ceu.frustumCulled = false;
ceu.renderOrder = -10;
cena.add(ceu);
let sombras = true;

const terreno = new Terreno(cena, renderer);
terreno.pintor = new Pintor();
terreno.estiloJogo = false; // no menu: foto; no jogo: escolha do jogador
const rts = new CameraRTS(camera, renderer.domElement);
const fx = new Efeitos(cena);
const cidades3d = new Cidades3D(cena);
const marcos = [];
let jogo = null, ia = null, piloto = null;
let velocidade = 5;
let selecao = [];
let modoConstruir = null;
let ultimoToque = { t: 0, id: null };

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// ------------------------------------------------------------------ carregamento
carregarModelos((p) => {
  $('#barraCarga').style.width = p * 100 + '%';
}).then(() => {
  $('#textoCarga').textContent = 'Pronto!';
  $('#carregando').classList.add('escondido');
  $('#botoesInicio').classList.remove('escondido');
});
// relevo grosso da Europa ocidental (terra x mar) já no menu
preCarregar(41, 53, -6, 14, 7).catch(() => {});

$('#btnAjuda').onclick = () => $('#ajuda').classList.toggle('escondido');
$('#fecharAjuda').onclick = () => $('#ajuda').classList.add('escondido');
document.querySelectorAll('#botoesInicio [data-cen]').forEach((b) => {
  b.onclick = () => iniciar({ normandia: CENARIO_NORMANDIA, aereo: CENARIO_AEREO, livre: CENARIO_LIVRE }[b.dataset.cen]);
});

function iniciar(cen) {
  iniciarAudio();
  if (jogo) location.reload();
  terreno.k = parseFloat($('#optDetalhe').value);
  definirExagero(parseFloat($('#optRelevo').value));
  cidades3d.usarOSM = $('#optPredios').checked;
  configOSM.ligado = $('#optPredios').checked;
  terreno.estiloJogo = $('#optChao').value === 'jogo';
  sombras = $('#optSombras').checked;
  renderer.shadowMap.enabled = sombras;
  sol.castShadow = sombras;
  $('#btnPredios').classList.toggle('ativo', cidades3d.ligado);
  for (const m of MARCOS) {
    const o = instanciar(m.modelo, 0);
    const p = paraMundo(m.lat, m.lon);
    o.position.set(p.x, 0, p.z);
    o.rotation.y = (180 - m.rot) * Math.PI / 180;
    o.traverse((p) => { if (p.isMesh) { p.castShadow = true; p.receiveShadow = true; } });
    cena.add(o);
    marcos.push(o);
  }
  jogo = new Jogo(cena);
  jogo.fx = fx;
  ia = new IA(jogo, 1);
  jogo.ia = ia;
  jogo.carregarCenario(cen);
  jogo.selecaoMudou = () => { selecao = selecao.filter((e) => e.vivo); atualizarPainel(); };
  piloto = new Piloto(jogo, camera, fx, $('#piloto'));
  jogo.aoMorrerPiloto = () => setTimeout(sairPiloto, 1500);
  const c = paraMundo(cen.camera.lat, cen.camera.lon);
  rts.irPara(c.x, c.z, cen.camera.dist);
  rts.rumo = cen.camera.rumo;
  rts.inc = cen.camera.inclinacao;
  rts.alvo.y = chao(c.x, c.z, true) ?? 0;
  $('#inicio').classList.add('escondido');
  ['#topo', '#ferramentas', '#minimapa', '#painel'].forEach((s) => $(s).classList.remove('escondido'));
  prepararMinimapa();
  atualizarPainel();
  if (cen.aereo && jogo.jogadorInicial) {
    selecao = [jogo.jogadorInicial];
    setTimeout(() => entrarPiloto(jogo.jogadorInicial), 300);
    msg('Batalha aérea! Derrube todos os aviões inimigos. Use o manche à esquerda e FOGO à direita.');
  } else {
    msg('6 de junho de 1944, Dia D. Tome a Normandia e avance até Paris!');
    msg('Dica: selecione soldados e toque num inimigo, num veículo para embarcar ou no chão para mover.');
  }
}

// ------------------------------------------------------------------ mensagens
function msg(t) {
  const d = document.createElement('div');
  d.textContent = t;
  $('#msgs').appendChild(d);
  setTimeout(() => d.remove(), 4600);
  while ($('#msgs').children.length > 4) $('#msgs').firstChild.remove();
}

// ------------------------------------------------------------------ seleção e ordens
function telaDe(e, alvo = new THREE.Vector3()) {
  alvo.set(e.x, e.y + (e.voa ? 0 : Math.min(e.def.tam * 0.3, 10)), e.z).project(camera);
  if (alvo.z > 1) return null;
  return { x: (alvo.x * 0.5 + 0.5) * window.innerWidth, y: (-alvo.y * 0.5 + 0.5) * window.innerHeight };
}

function entidadesVisiveis() {
  return [...jogo.unidades.filter((u) => !u.dentro), ...jogo.estruturas];
}

function entidadeEm(x, y) {
  let melhor = null, md = 1e9;
  for (const e of entidadesVisiveis()) {
    const p = telaDe(e);
    if (!p) continue;
    const dCam = camera.position.distanceTo(new THREE.Vector3(e.x, e.y, e.z));
    const raioPx = Math.max(26, e.def.tam * 0.5 / dCam * window.innerHeight * 1.1);
    const d = Math.hypot(p.x - x, p.y - y);
    if (d < raioPx && d < md + (e.est ? 10 : 0)) { md = d; melhor = e; }
  }
  return melhor;
}

const raycaster = new THREE.Raycaster();
function chaoEm(x, y) {
  const ndc = new THREE.Vector2(x / window.innerWidth * 2 - 1, -(y / window.innerHeight) * 2 + 1);
  raycaster.setFromCamera(ndc, camera);
  const hits = raycaster.intersectObjects(terreno.malhasVisiveis(), false);
  if (hits.length) return hits[0].point;
  // sem tile: interseção com o plano do mar
  const r = raycaster.ray;
  if (r.direction.y < -1e-4) {
    const t = -r.origin.y / r.direction.y;
    return r.origin.clone().addScaledVector(r.direction, t);
  }
  return null;
}

function marcar(x, y, ataque) {
  const m = $('#marcador');
  m.style.left = x + 'px'; m.style.top = y + 'px';
  m.className = '';
  void m.offsetWidth;
  m.className = 'on' + (ataque ? ' ataque' : '');
}

function meus() { return selecao.filter((e) => e.fac === ALIADOS && e.vivo); }

rts.aoTocar = (x, y) => {
  if (!jogo || piloto?.ativo) return;
  iniciarAudio();
  if (modoConstruir) {
    const p = chaoEm(x, y);
    if (!p) return;
    const e = jogo.construir(modoConstruir, ALIADOS, p.x, p.z);
    if (e) { modoConstruir = null; $('#aviso').classList.add('escondido'); selecionar([e]); }
    return;
  }
  const e = entidadeEm(x, y);
  const minhas = meus();
  if (e) {
    if (e.fac === EIXO && minhas.length && minhas.some((u) => !u.est)) {
      jogo.ordenarAtacar(minhas, e);
      marcar(x, y, true);
      return;
    }
    if (e.fac === ALIADOS && minhas.length && !minhas.includes(e)) {
      const temInf = minhas.some((u) => u.cat === 'inf');
      const temAviao = minhas.some((u) => u.voa);
      const podeLevar = (e.est && e.def.guarnicao && temInf) || (!e.est && e.capacidade && temInf) ||
        (e.def.hangar && temAviao) || (e.tipo === 'aerodromo' && temAviao);
      if (podeLevar) {
        jogo.ordenarEmbarcar(minhas, e);
        marcar(x, y);
        msg(e.def.hangar || e.tipo === 'aerodromo' ? 'Aviões indo pousar' : 'Soldados embarcando em ' + e.def.nome);
        return;
      }
    }
    const agora = performance.now();
    if (ultimoToque.id === e.id && agora - ultimoToque.t < 450 && e.fac === ALIADOS) {
      // toque duplo: todos do mesmo tipo na tela
      selecionar(entidadesVisiveis().filter((o) => o.fac === ALIADOS && o.tipo === e.tipo && telaDe(o) &&
        Math.abs(telaDe(o).x - window.innerWidth / 2) < window.innerWidth / 2 && Math.abs(telaDe(o).y - window.innerHeight / 2) < window.innerHeight / 2));
    } else selecionar([e]);
    ultimoToque = { t: agora, id: e.id };
    return;
  }
  const p = chaoEm(x, y);
  if (p && minhas.length) {
    jogo.ordenarMover(minhas, p.x, p.z);
    marcar(x, y);
  }
};

rts.aoArrastarCaixa = (x0, y0, x1, y1, fim) => {
  const c = $('#caixaSel');
  const l = Math.min(x0, x1), t = Math.min(y0, y1), w = Math.abs(x1 - x0), h = Math.abs(y1 - y0);
  Object.assign(c.style, { display: fim ? 'none' : 'block', left: l + 'px', top: t + 'px', width: w + 'px', height: h + 'px' });
  if (fim) {
    const sel = jogo.unidades.filter((u) => u.fac === ALIADOS && !u.dentro && (() => {
      const p = telaDe(u);
      return p && p.x >= l && p.x <= l + w && p.y >= t && p.y <= t + h;
    })());
    selecionar(sel);
    rts.modoCaixa = false;
    $('#btnCaixa').classList.remove('ativo');
  }
};

const geoAnel = new THREE.RingGeometry(0.85, 1, 32).rotateX(-Math.PI / 2);
const matAnel = [new THREE.MeshBasicMaterial({ color: 0x7fe36b, transparent: true, opacity: 0.85, depthTest: false }),
  new THREE.MeshBasicMaterial({ color: 0xff5a4a, transparent: true, opacity: 0.85, depthTest: false })];

function selecionar(lista) {
  for (const e of selecao) {
    if (e.anel) e.anel.visible = false;
    e.icone.material.map = texturaIcone(e.cat, e.fac, false);
  }
  selecao = lista.filter((e) => e.vivo);
  for (const e of selecao) {
    if (!e.anel) {
      e.anel = new THREE.Mesh(geoAnel, matAnel[e.fac]);
      e.anel.renderOrder = 3;
      cena.add(e.anel);
    }
    e.anel.visible = true;
    e.icone.material.map = texturaIcone(e.cat, e.fac, true);
  }
  atualizarPainel();
}

// ------------------------------------------------------------------ painel inferior
function botao(txt, fn, cls = '', titulo = '') {
  const b = document.createElement('button');
  b.innerHTML = txt;
  if (cls) b.className = cls;
  if (titulo) b.title = titulo;
  b.onclick = (ev) => { ev.stopPropagation(); iniciarAudio(); fn(); atualizarPainel(); };
  return b;
}

let painelChave = '';
function atualizarPainel(forcar = true) {
  if (!jogo) return;
  selecao = selecao.filter((e) => e.vivo);
  const info = $('#selInfo'), acoes = $('#acoes');
  const chave = selecao.map((e) => e.id + ':' + (e.carga?.length || 0) + (e.guarnicao?.length || 0) + e.estado + (e.fila?.length || 0) + !!e.construindo).join(',');
  if (!forcar && chave === painelChave) { atualizarInfo(); return; }
  painelChave = chave;
  acoes.innerHTML = '';
  atualizarInfo();
  if (!selecao.length) {
    acoes.appendChild(botao('🏗 Construir', abrirConstruir));
    acoes.appendChild(botao('⌂ Ir para o QG', irBase));
    return;
  }
  const minhas = meus();
  acoes.appendChild(botao('✕ Limpar seleção', () => selecionar([])));
  if (!minhas.length) return;
  const e0 = minhas[0];
  if (minhas.length === 1 && e0.est) {
    const e = e0;
    if (e.def.produz && !e.construindo) {
      for (const t of e.def.produz) {
        const d = TIPOS[t];
        const n = e.fila.filter((f) => f.tipo === t).length;
        const b = botao(`${d.nome}<small>💰${d.custo} · ${d.tempo}s ${n ? '<span class="fila">×' + n + '</span>' : ''}</small><small>${d.desc}</small>`,
          () => jogo.produzir(e, t), 'prod');
        b.disabled = jogo.dinheiro[ALIADOS] < d.custo;
        acoes.appendChild(b);
      }
      if (e.fila.length) acoes.appendChild(botao('↩ Cancelar último', () => jogo.cancelar(e)));
    }
    if (e.def.guarnicao && e.guarnicao.length) acoes.appendChild(botao('🚪 Esvaziar bunker', () => jogo.desembarcar(e)));
    return;
  }
  const unidades = minhas.filter((u) => !u.est);
  acoes.appendChild(botao('✋ Parar', () => jogo.parar(unidades)));
  acoes.appendChild(botao('🎥 Seguir', () => { rts.seguir = unidades[0]; }));
  const comCarga = unidades.filter((u) => u.carga.length);
  if (comCarga.some((u) => u.cat === 'air' && u.estado === 'voando' && !u.def.hangar)) {
    acoes.appendChild(botao('🪂 Saltar paraquedistas', () => comCarga.forEach((u) => jogo.desembarcar(u))));
  } else if (comCarga.some((u) => !u.def.hangar)) {
    acoes.appendChild(botao('⬇ Desembarcar', () => comCarga.forEach((u) => jogo.desembarcar(u))));
  }
  if (unidades.some((u) => u.def.hangar && u.carga.length)) acoes.appendChild(botao('🛫 Lançar aviões', () => jogo.decolar(unidades.filter((u) => u.def.hangar))));
  const voando = unidades.filter((u) => u.voa && u.estado === 'voando');
  if (voando.length) acoes.appendChild(botao('🛬 Pousar', () => jogo.ordenarPousar(voando)));
  const pousados = unidades.filter((u) => u.voa && u.estado === 'pousado');
  if (pousados.length) acoes.appendChild(botao('🛫 Decolar', () => jogo.decolar(pousados)));
  if (unidades.length === 1 && unidades[0].cat === 'air') acoes.appendChild(botao('✈ Pilotar (batalha aérea)', () => entrarPiloto(unidades[0]), 'ativo'));
  const inf = unidades.filter((u) => u.cat === 'inf');
  if (inf.length) acoes.appendChild(botao('🔍 Transporte mais próximo', () => embarcarProximo(inf)));
}

function atualizarInfo() {
  const info = $('#selInfo');
  if (!selecao.length) {
    info.innerHTML = `<b>Nada selecionado</b><br>Toque em unidades ou estruturas.<br><small>Cidades suas: ${jogo.cidades.filter((c) => c.dono === ALIADOS).length} · Unidades: ${jogo.unidades.filter((u) => u.fac === ALIADOS).length}</small>`;
    return;
  }
  if (selecao.length === 1) {
    const e = selecao[0];
    const d = e.def;
    let h = `<b>${e.nome}</b><div class="vida"><div style="width:${Math.max(0, e.hp / e.hpMax * 100)}%"></div></div>`;
    h += `Vida ${Math.ceil(e.hp)}/${e.hpMax}`;
    if (e.construindo) h += `<br>🏗 Construindo... ${Math.ceil(e.construindo)}s`;
    if (!e.est) {
      h += `<br>${d.desc || ''}`;
      if (e.voa) h += `<br>${e.estado === 'voando' ? '✈ Em voo' : '🅿 Pousado'} · ${Math.round((e.v || d.vel) * 3.6)} km/h`;
      else h += `<br>Velocidade máx.: ${Math.round(d.vel * 3.6)} km/h`;
    }
    if (d.armas?.length) h += '<br>⚔ ' + d.armas.map((w) => `${w.n} (${formatarDist(w.alc)})`).join(', ');
    const carga = e.est ? e.guarnicao : e.carga;
    const cap = e.est ? d.guarnicao : d.hangar || d.cap;
    if (cap) h += `<br>👥 ${carga.length}/${cap}: ${resumo(carga)}`;
    if (e.fila?.length) h += `<br>⏳ Produzindo: ${TIPOS[e.fila[0].tipo].nome} (${Math.ceil(e.fila[0].resta)}s)`;
    info.innerHTML = h;
  } else {
    info.innerHTML = `<b>${selecao.length} selecionados</b><br>${resumo(selecao)}`;
  }
}

function resumo(lista) {
  const c = {};
  for (const e of lista) c[e.def.nome] = (c[e.def.nome] || 0) + 1;
  return Object.entries(c).map(([k, v]) => `${v}× ${k}`).join(', ') || '—';
}

function embarcarProximo(inf) {
  const c = { x: inf[0].x, z: inf[0].z };
  let melhor = null, md = 3000;
  for (const u of jogo.unidades) {
    if (u.fac !== ALIADOS || !u.capacidade || u.carga.length >= u.capacidade || u.dentro) continue;
    if (u.voa && u.estado !== 'pousado') continue;
    const d = Math.hypot(u.x - c.x, u.z - c.z);
    if (d < md) { md = d; melhor = u; }
  }
  if (melhor) { jogo.ordenarEmbarcar(inf, melhor); msg('Embarcando em ' + melhor.def.nome); } else msg('Nenhum transporte livre a menos de 3 km');
}

function abrirConstruir() {
  const l = $('#listaConstruir');
  l.innerHTML = '';
  for (const [t, d] of Object.entries(ESTRUTURAS)) {
    if (t === 'qg') continue;
    const b = botao(`${d.nome}<br><small>💰 ${d.custo}</small>`, () => {
      modoConstruir = t;
      $('#menuConstruir').classList.add('escondido');
      const a = $('#aviso');
      a.innerHTML = `Toque no mapa para construir: <b>${d.nome}</b> <button id="cancConstr">Cancelar</button>`;
      a.classList.remove('escondido');
      $('#cancConstr').onclick = () => { modoConstruir = null; a.classList.add('escondido'); };
    });
    b.disabled = jogo.dinheiro[ALIADOS] < d.custo;
    l.appendChild(b);
  }
  $('#menuConstruir').classList.remove('escondido');
}
$('#menuConstruir .fechar').onclick = () => $('#menuConstruir').classList.add('escondido');

function irBase() {
  const qg = jogo.estruturas.find((e) => e.fac === ALIADOS && e.tipo === 'qg') || jogo.estruturas.find((e) => e.fac === ALIADOS);
  if (qg) { rts.irPara(qg.x, qg.z, 1500); rts.seguir = null; }
}

// ------------------------------------------------------------------ barra de ferramentas
$('#btnConstruir').onclick = abrirConstruir;
$('#btnCaixa').onclick = () => { rts.modoCaixa = !rts.modoCaixa; $('#btnCaixa').classList.toggle('ativo', rts.modoCaixa); };
$('#btnTela').onclick = () => selecionar(jogo.unidades.filter((u) => u.fac === ALIADOS && !u.dentro && (() => {
  const p = telaDe(u);
  return p && p.x > 0 && p.y > 0 && p.x < window.innerWidth && p.y < window.innerHeight;
})()));
$('#btnBase').onclick = irBase;
$('#btnPredios').onclick = () => {
  cidades3d.ligado = !cidades3d.ligado;
  $('#btnPredios').classList.toggle('ativo', cidades3d.ligado);
  if (!cidades3d.ligado) cidades3d.limpar();
  msg(cidades3d.ligado ? 'Cidades, casas e árvores em 3D ligadas (aproxime a câmera)' : 'Cidades 3D desligadas (só a foto de satélite)');
};
document.querySelectorAll('.velocidades button').forEach((b) => {
  b.onclick = () => {
    velocidade = parseFloat(b.dataset.v);
    document.querySelectorAll('.velocidades button').forEach((x) => x.classList.toggle('ativo', x === b));
  };
});
$('#btnSom').onclick = () => { $('#btnSom').textContent = alternarSom() ? '🔊' : '🔇'; };
$('#btnMenu').onclick = () => { if (confirm('Voltar ao menu? O progresso será perdido.')) location.reload(); };
$('#fimContinuar').onclick = () => $('#fim').classList.add('escondido');
$('#fimMenu').onclick = () => location.reload();

// ------------------------------------------------------------------ modo piloto
let velAntesPiloto = 5;
function entrarPiloto(u) {
  if (!u || !u.vivo) return;
  velAntesPiloto = velocidade;
  velocidade = 1;
  rts.ativo = false;
  piloto.iniciar(u);
  ['#ferramentas', '#painel', '#minimapa'].forEach((s) => $(s).classList.add('escondido'));
  msg(`Pilotando ${u.def.nome}. Puxe o manche para baixo para subir.`);
}
function sairPiloto() {
  const u = piloto.u;
  piloto.parar();
  rts.ativo = true;
  velocidade = velAntesPiloto;
  if (u && u.vivo) { rts.irPara(u.x, u.z, 900); rts.alvo.y = u.y; }
  ['#ferramentas', '#painel', '#minimapa'].forEach((s) => $(s).classList.remove('escondido'));
  atualizarPainel();
}
$('#btnSairPiloto').onclick = sairPiloto;

// ------------------------------------------------------------------ minimapa
const mm = $('#minimapa');
const mmCtx = mm.getContext('2d');
const MM = { latMin: 41.3, latMax: 53.2, lonMin: -6.5, lonMax: 11 };
let mmFundo = null;
const mmA = paraMundo(MM.latMax, MM.lonMin), mmB = paraMundo(MM.latMin, MM.lonMax), mmC = paraMundo(MM.latMin, MM.lonMin);
const mmX0 = mmC.x, mmX1 = mmB.x, mmZ0 = mmA.z, mmZ1 = mmB.z;
const paraMM = (x, z) => ({ x: (x - mmX0) / (mmX1 - mmX0) * mm.width, y: (z - mmZ0) / (mmZ1 - mmZ0) * mm.height });

function prepararMinimapa() {
  mmFundo = document.createElement('canvas');
  mmFundo.width = mm.width; mmFundo.height = mm.height;
  const g = mmFundo.getContext('2d');
  g.fillStyle = '#2b4560';
  g.fillRect(0, 0, mm.width, mm.height);
  const z = 6;
  const x0 = Math.floor(lon2tx(MM.lonMin, z)), x1 = Math.floor(lon2tx(MM.lonMax, z));
  const y0 = Math.floor(lat2ty(MM.latMax, z)), y1 = Math.floor(lat2ty(MM.latMin, z));
  for (let x = x0; x <= x1; x++) {
    for (let y = y0; y <= y1; y++) {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        // desenha em faixas para acompanhar a projeção (cada faixa de 32 px de altura)
        for (let s = 0; s < 8; s++) {
          const la0 = ty2lat(y + s / 8, z), la1 = ty2lat(y + (s + 1) / 8, z);
          const lo0 = tx2lon(x, z), lo1 = tx2lon(x + 1, z);
          const latm = (la0 + la1) / 2;
          const p0 = paraMM(paraMundo(latm, lo0).x, paraMundo(la0, lo0).z), p1 = paraMM(paraMundo(latm, lo1).x, paraMundo(la1, lo1).z);
          g.drawImage(img, 0, s * 32, 256, 32, p0.x, p0.y, p1.x - p0.x + 0.6, p1.y - p0.y + 0.6);
        }
      };
      img.src = `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}`;
    }
  }
}

function desenharMinimapa() {
  if (!mmFundo) return;
  mmCtx.drawImage(mmFundo, 0, 0);
  for (const c of jogo.cidades) {
    const p = paraMM(c.x, c.z);
    mmCtx.fillStyle = c.dono === ALIADOS ? '#5b9dff' : c.dono === EIXO ? '#ff4a3a' : '#ddd';
    mmCtx.strokeStyle = '#000';
    mmCtx.beginPath(); mmCtx.rect(p.x - 3, p.y - 3, 6, 6); mmCtx.fill(); mmCtx.stroke();
  }
  for (const u of jogo.unidades) {
    if (u.dentro) continue;
    const p = paraMM(u.x, u.z);
    mmCtx.fillStyle = u.fac === ALIADOS ? '#9fd0ff' : '#ff9b8f';
    mmCtx.fillRect(p.x - 1, p.y - 1, 2, 2);
  }
  const p = paraMM(rts.alvo.x, rts.alvo.z);
  const r = Math.max(3, rts.dist / (mmX1 - mmX0) * mm.width);
  mmCtx.strokeStyle = '#ffe36b';
  mmCtx.lineWidth = 1.5;
  mmCtx.strokeRect(p.x - r, p.y - r * 0.6, r * 2, r * 1.2);
}
mm.addEventListener('pointerdown', (e) => {
  e.stopPropagation();
  const r = mm.getBoundingClientRect();
  const fx_ = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
  rts.irPara(mmX0 + fx_ * (mmX1 - mmX0), mmZ0 + fy * (mmZ1 - mmZ0));
  rts.seguir = null;
  if (rts.dist < 5000) rts.dist = 20000;
});

// ------------------------------------------------------------------ visual das entidades
const vTmp = new THREE.Vector3();
function sincronizar(dt, t) {
  const cp = camera.position;
  for (const e of [...jogo.unidades, ...jogo.estruturas]) {
    if (e.dentro) { e.obj.visible = false; e.icone.visible = false; if (e.anel) e.anel.visible = false; continue; }
    vTmp.set(e.x, e.y, e.z);
    const d = cp.distanceTo(vTmp);
    const tam = e.def.tam;
    if (!e.voa && e.cat !== 'ship' && e.estado !== 'caindo' && d < 25000) {
      const h = chao(e.x, e.z, d < 8000);
      if (h !== null) e.y = h;
    }
    if (e.voa && e.estado === 'pousado' && d < 25000) {
      const h = chao(e.x, e.z, d < 8000);
      if (h !== null) e.y = h;
    }
    const verModelo = d < Math.max(1200, tam * (e.est ? 1500 : 1000));
    e.obj.visible = verModelo;
    e.icone.visible = d > Math.max(350, tam * 110) || (piloto?.ativo && e.voa && e !== piloto.u && d > 500);
    if (piloto?.ativo && !e.voa && !e.est) e.icone.visible = false;
    e.icone.position.set(e.x, e.y + (e.voa ? 2 : tam * 0.6 + 2), e.z);
    if (e.anel) {
      e.anel.visible = selecao.includes(e) && verModelo;
      e.anel.position.set(e.x, (e.voa && e.estado === 'voando' ? e.y : e.y) + 0.3, e.z);
      e.anel.scale.setScalar(Math.max(1.2, tam * (e.est ? 0.6 : 0.75)));
    }
    if (!verModelo) continue;
    const o = e.obj;
    o.position.set(e.x, e.y, e.z);
    if (e.quat) o.quaternion.copy(e.quat);
    else if (e.voa) o.rotation.set(-e.pitch, e.hd, e.bank, 'YXZ');
    else o.rotation.set(0, e.hd, 0);
    if (e.cat === 'ship') { o.position.y = Math.sin(t * 0.8 + e.id) * Math.min(0.4, 20 / tam); o.rotation.z = Math.sin(t * 0.6 + e.id) * 0.02; }
    if (e.cat === 'inf') {
      e.passo += dt * (e.andando ? 9 : 0);
      e.modelo.position.y = e.andando ? Math.abs(Math.sin(e.passo)) * 0.08 : 0;
      e.modelo.rotation.x = e.andando ? 0.08 : 0;
    }
    const pt = e.modelo.userData.partes;
    if (pt.Helice) pt.Helice.rotation.z += dt * (e.estado === 'voando' ? 60 : 0);
    if (pt.Torre) {
      const a = e.alvos?.find((x) => x && x.vivo);
      const des = a ? Math.atan2(a.x - e.x, a.z - e.z) - e.hd : 0;
      let da = des - pt.Torre.rotation.y;
      da = Math.atan2(Math.sin(da), Math.cos(da));
      pt.Torre.rotation.y += Math.max(-dt * 1.2, Math.min(dt * 1.2, da));
    }
  }
  for (const o of marcos) {
    const d = Math.hypot(o.position.x - cp.x, o.position.z - cp.z);
    o.visible = d < 60000;
    if (o.visible) { const h = chao(o.position.x, o.position.z, d < 10000); if (h !== null) o.position.y = h - 0.5; }
  }
  for (const c of jogo.cidades) {
    const y = (chao(c.x, c.z, false) ?? 0) + 30;
    c.rot.position.set(c.x, y, c.z);
    c.bandeira.position.set(c.x, y, c.z);
    const d = Math.hypot(c.x - cp.x, c.z - cp.z);
    c.rot.visible = !piloto?.ativo && d < 900000 && (c.valor >= 30 || d < 250000);
    c.bandeira.visible = !piloto?.ativo || d < 30000;
  }
}

// ------------------------------------------------------------------ laço principal
let ultimo = performance.now();
let acumUI = 0, acumMM = 0;
function laco(agora) {
  requestAnimationFrame(laco);
  const dt = Math.min(0.1, (agora - ultimo) / 1000);
  ultimo = agora;
  tickRelevo();
  terreno.pintor.tick();
  if (jogo) {
    jogo.camPos.copy(camera.position);
    if (velocidade > 0) {
      const sim = dt * velocidade;
      const n = Math.ceil(sim / 0.2);
      for (let i = 0; i < n; i++) jogo.passo(sim / n);
    }
    if (piloto.ativo) piloto.atualizar(dt);
    else rts.atualizar(dt);
    sincronizar(dt, agora / 1000);
    fx.atualizar(dt * Math.max(1, Math.min(velocidade, 3)), camera.position);
    if (piloto.ativo) {
      const g = chao(camera.position.x, camera.position.z, false) ?? 0;
      cidades3d.atualizar(camera.position, Math.max(200, (camera.position.y - g) * 2.5));
    } else cidades3d.atualizar(rts.alvo, rts.dist);
    while (jogo.msgs.length) msg(jogo.msgs.shift());
    acumUI += dt;
    if (acumUI > 0.25) {
      acumUI = 0;
      $('#dinheiro').textContent = '💰 ' + Math.floor(jogo.dinheiro[ALIADOS]).toLocaleString('pt-BR');
      $('#renda').textContent = '+' + jogo.renda(ALIADOS) + '/min';
      const dtR = new Date(jogo.relogio * 1000);
      $('#relogio').textContent = dtR.toLocaleDateString('pt-BR', { timeZone: 'UTC' }) + ' ' +
        dtR.toLocaleTimeString('pt-BR', { timeZone: 'UTC', hour: '2-digit', minute: '2-digit' });
      const pend = estatRede.pendentes;
      $('#rede').textContent = pend ? `🛰 ${pend}` : '';
      $('#rede').title = 'Baixando imagens de satélite';
      atualizarPainel(false);
      if (jogo.fim && !jogo.fimMostrado) {
        jogo.fimMostrado = true;
        $('#fimTexto').textContent = jogo.fim.texto;
        $('#fim').classList.remove('escondido');
      }
    }
    acumMM += dt;
    if (acumMM > 0.5 && !piloto.ativo) { acumMM = 0; desenharMinimapa(); }
  } else {
    // menu: câmera girando sobre a França
    rts.alvo.set(0, 0, 0);
    rts.dist = 900000;
    rts.rumo += dt * 0.02;
    rts.inc = 1.0;
    rts.atualizar(dt);
  }
  // neblina no horizonte e alcance da câmera
  const voando = piloto?.ativo;
  const dRef = voando ? Math.max(600, camera.position.y - (chao(camera.position.x, camera.position.z, false) ?? 0)) : rts.dist;
  cena.fog.near = voando ? 3000 + dRef * 2 : dRef * 0.9 + 300;
  cena.fog.far = voando ? 35000 + dRef * 10 : dRef * 5 + 7000;
  camera.far = cena.fog.far * 1.03;
  camera.updateProjectionMatrix();
  ceu.position.copy(camera.position);
  ceu.scale.setScalar(camera.far * 0.9);
  // sombra: caixa de luz em volta do que a câmera está olhando
  if (sombras) {
    const foco = voando && piloto.u ? new THREE.Vector3(piloto.u.x, piloto.u.y, piloto.u.z) : rts.alvo;
    const ext = THREE.MathUtils.clamp((voando ? 300 : rts.dist) * 0.9, 120, 2500);
    const sc = sol.shadow.camera;
    sc.left = sc.bottom = -ext; sc.right = sc.top = ext;
    sc.near = 1; sc.far = ext * 8;
    sc.updateProjectionMatrix();
    sol.target.position.copy(foco);
    sol.position.copy(foco).addScaledVector(SOL, ext * 4);
    sol.target.updateMatrixWorld();
  }
  terreno.atualizar(camera);
  renderer.render(cena, camera);
}
requestAnimationFrame(laco);

// depuração no navegador
window.FE = { get jogo() { return jogo; }, cidades3d, rts, terreno, camera, cena, renderer, piloto: () => piloto, iniciar, CENARIO_NORMANDIA };
