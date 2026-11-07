// Miami: Surto Zumbi — estratégia em tempo real 3D no mapa real de Miami
import * as THREE from 'three';
import { G } from './estado.js';
import { LARG, ALT, carregarSatelite, lugares, SateliteDetalhe, predios } from './mapa.js';
import { Hash } from './util.js';
import { Bonecos, CAMO, CAMO2, PELE_SOLD, hex } from './bonecos.js';
import { Efeitos } from './efeitos.js';
import { CameraRTS, configurarEntrada } from './entrada.js';
import { montarMundo, construirVisual, iniciarPartida, atualizarJogo } from './jogo.js';
import { atualizarUnidades, atualizarProjeteis, chaoEm, ordenar, ordenarMover, desembarcar } from './unidades.js';
import { telaDe } from './entrada.js';
import * as NAV from './caminho.js';
import { enfileirar } from './jogo.js';
import { atualizarAgentes, desenharAgentes } from './agentes.js';
import { UI, AJUDA } from './ui.js';
import { iniciarSom, somLigado, somHeli } from './som.js';

const $ = (s) => document.querySelector(s);
const status = (t) => { const e = $('#carregando-txt'); if (e) e.textContent = t; };

function lerCfg() {
  try { Object.assign(G.cfg, JSON.parse(localStorage.getItem('miami-cfg') || '{}')); } catch (e) { /* sem armazenamento */ }
}
G.salvarCfg = () => { try { localStorage.setItem('miami-cfg', JSON.stringify(G.cfg)); } catch (e) { /* ignora */ } };

const CEU_DIA = new THREE.Color(0xa9cfe8), CEU_TARDE = new THREE.Color(0xf0b27a), CEU_NOITE = new THREE.Color(0x0d1830);
const SNIPER = hex(0x5a6b3c);

async function iniciar() {
  lerCfg();
  status('Preparando o mapa de Miami...');
  await new Promise((r) => setTimeout(r, 30));
  const q = G.cfg.qualidade ?? 1;
  const renderer = new THREE.WebGLRenderer({ antialias: q >= 2, powerPreference: 'high-performance' });
  renderer.setPixelRatio(q === 0 ? Math.min(1, devicePixelRatio) * 0.75 : q === 1 ? Math.min(1.5, devicePixelRatio) : Math.min(2, devicePixelRatio));
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  $('#jogo').appendChild(renderer.domElement);
  const cena = new THREE.Scene();
  cena.background = CEU_DIA.clone();
  cena.fog = new THREE.Fog(CEU_DIA.clone(), 2500, 11000);
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 1, 15000);
  G.cena = cena; G.camera = camera; G.renderer = renderer;
  const hemi = new THREE.HemisphereLight(0xdfefff, 0x6b6450, 1.6);
  cena.add(hemi);
  const sol = new THREE.DirectionalLight(0xfff2dd, 2.2);
  sol.position.set(-0.5, 1, 0.35);
  cena.add(sol);

  status('Lendo prédios e ruas (dados de satélite)...');
  await new Promise((r) => setTimeout(r, 20));
  montarMundo();
  status('Construindo a cidade em 3D...');
  await new Promise((r) => setTimeout(r, 20));
  construirVisual();
  G.bonecos = new Bonecos(cena);
  G.efeitos = new Efeitos(cena);
  G.hashA = new Hash(16, LARG, ALT, 4096);
  G.hashU = new Hash(24, LARG, ALT, 1024);

  const camRTS = new CameraRTS(camera);
  G.cam = camRTS;
  camRTS.irPara(lugares.bayside.x, lugares.bayside.z, 1400);
  camRTS.yaw = 0.6;
  configurarEntrada(renderer.domElement, camRTS);
  const ui = new UI(camRTS);

  // satélite
  G.ligarSatelite = (on) => {
    if (on && !G.satelite) {
      G.satelite = carregarSatelite(cena, q >= 2 ? 16 : 15, (ok, falhas) => {
        if (!ok) { G.cena.remove(G.satelite); G.satelite = null; if (G.satDet) G.satDet.ligado = false; G.agua.material.uniforms.alfa.value = 1; ui.alerta('🛰️ Sem internet: usando o mapa desenhado', null, null, 'info'); }
      });
    }
    if (G.satelite) G.satelite.visible = on;
    if (on && !G.satDet) G.satDet = new SateliteDetalhe(cena);
    if (G.satDet) G.satDet.ligado = on;
    G.agua.material.uniforms.alfa.value = on ? 0.45 : 1;
  };
  if (G.cfg.satelite && navigator.onLine !== false) G.ligarSatelite(true);
  somLigado(G.cfg.som !== false);

  addEventListener('resize', () => {
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  });

  window.androidBack = () => {
    const m = document.querySelector('.modal');
    if (m && !$('#menu').classList.contains('oculto')) return;
    if (m) { m.remove(); G.pausado = false; return; }
    if (G.controlando) { ui.controlar(null); return; }
    ui.menuPausa();
  };

  // ---------------- laço principal ----------------
  const frustum = new THREE.Frustum(), mat4 = new THREE.Matrix4(), vp = new THREE.Vector3();
  let ultimo = performance.now();
  function visivel(x, z) {
    if (G.longe) return false;
    vp.set(x, 1, z);
    const dx = x - camera.position.x, dz = z - camera.position.z;
    if (dx * dx + dz * dz > 900 * 900) return false;
    return frustum.containsPoint(vp);
  }
  function simular(dt) {
    G.orcamentoCaminhos = 4;
    G.hashA.limpar();
    for (const a of G.agentes) if (a.vivo && !a.dentro && a.estado !== 'morto') G.hashA.add(a);
    G.hashU.limpar();
    for (const u of G.unidades) if (u.vivo && !u.dentro) G.hashU.add(u);
    atualizarJogo(dt);
    atualizarUnidades(dt);
    atualizarAgentes(dt);
    atualizarProjeteis(dt);
  }
  function ciclo(dt) {
    // céu e luz conforme a hora
    const h = G.hora ?? 8;
    let luz;
    if (h >= 6.5 && h <= 18) luz = 1;
    else if (h > 18 && h < 20) luz = 1 - (h - 18) / 2 * 0.72;
    else if (h > 5 && h < 6.5) luz = 0.28 + (h - 5) / 1.5 * 0.72;
    else luz = 0.28;
    const tarde = h > 17 && h < 20 ? 1 - Math.abs(h - 18.7) / 1.5 : h > 5 && h < 7.5 ? 1 - Math.abs(h - 6.2) / 1.3 : 0;
    const c = cena.background;
    c.copy(CEU_NOITE).lerp(CEU_DIA, (luz - 0.28) / 0.72);
    if (tarde > 0) c.lerp(CEU_TARDE, Math.max(0, tarde) * 0.55);
    cena.fog.color.copy(c);
    sol.intensity = 2.3 * luz;
    hemi.intensity = 0.55 + 1.1 * luz;
    const ang = ((h - 6) / 12) * Math.PI;
    sol.position.set(Math.cos(ang) * -0.8, Math.max(0.15, Math.sin(ang)), 0.4);
    sol.color.setHex(tarde > 0.3 ? 0xffc890 : luz < 0.5 ? 0x9fb4ff : 0xfff2dd);
    const u = G.agua.material.uniforms;
    u.tempo.value += dt; u.luz.value = 0.35 + 0.65 * luz; u.corNevoa.value.copy(c);
    u.nevoaPerto.value = cena.fog.near; u.nevoaLonge.value = cena.fog.far;
  }
  function quadro(agora) {
    requestAnimationFrame(quadro);
    let dt = Math.min(0.05, (agora - ultimo) / 1000);
    ultimo = agora;
    if (G.teclado) G.teclado(dt);
    // joystick no referencial da câmera
    const j = G.joyUI || (G.joyTeclado ? { x: G.joyTeclado.x, y: G.joyTeclado.z } : null);
    if (j) {
      const s = Math.sin(camRTS.yaw), c = Math.cos(camRTS.yaw);
      G.joy = { x: c * j.x + s * j.y, z: -s * j.x + c * j.y };
    } else G.joy = null;
    const t0 = performance.now();
    if (!G.pausado && G.iniciado) for (let k = 0; k < G.velocidade; k++) simular(dt);
    const t1 = performance.now();
    G.perfSim = (G.perfSim || 0) * 0.95 + (t1 - t0) * 0.05;
    camRTS.aplicar(dt);
    if (G.satDet) G.satDet.atualizar(dt, camRTS.alvo, camRTS.dist);
    // distância de névoa acompanha o zoom
    cena.fog.near = Math.max(1500, camRTS.dist * 2.2);
    cena.fog.far = Math.max(9000, camRTS.dist * 6);
    ciclo(G.pausado ? 0 : dt);
    mat4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(mat4);
    // pessoas
    const bon = G.bonecos;
    bon.comecar();
    if (camRTS.dist < 900) {
      for (const u of G.unidades) {
        if (u.classe !== 'inf' || !u.vivo || u.dentro) continue;
        if (!visivel(u.x, u.z)) continue;
        const pose = u.mirando > 0 && u.velAtual < 0.5 ? 2 : 0;
        bon.add(u.x, u.y, u.z, u.ang, u.fase, pose, u.tipo === 'sniper' ? SNIPER : CAMO, CAMO2, PELE_SOLD, true);
      }
      desenharAgentes(bon, visivel);
    }
    G.longe = camRTS.dist >= 900;
    bon.terminar();
    G.efeitos.atualizar(G.pausado ? 0 : dt * G.velocidade, innerHeight * 0.9);
    // som dos helicópteros perto da câmera
    let hv = 0;
    for (const u of G.unidades) if (u.classe === 'aereo' && u.vivo && !u.dentro && !(u.pousado && u.parado > 3)) {
      const d = Math.hypot(u.x - camRTS.alvo.x, u.z - camRTS.alvo.z) + camRTS.dist * 0.5;
      hv = Math.max(hv, 1 - d / 700);
    }
    somHeli(G.pausado ? 0 : Math.max(0, hv));
    renderer.render(cena, camera);
    if (G.iniciado) ui.quadro(dt);
  }
  requestAnimationFrame(quadro);

  // ---------------- menu inicial ----------------
  $('#carregando').classList.add('oculto');
  const menu = $('#menu');
  menu.classList.remove('oculto');
  let dif = 'normal';
  menu.querySelectorAll('[data-dif]').forEach((b) => b.addEventListener('click', () => {
    dif = b.dataset.dif;
    menu.querySelectorAll('[data-dif]').forEach((x) => x.classList.toggle('ativo', x === b));
  }));
  const chkSat = $('#m-sat'), chkSom = $('#m-som'), selQ = $('#m-qual');
  chkSat.checked = !!G.cfg.satelite; chkSom.checked = G.cfg.som !== false; selQ.value = String(q);
  chkSat.onchange = () => { G.cfg.satelite = chkSat.checked; G.ligarSatelite(chkSat.checked); G.salvarCfg(); };
  chkSom.onchange = () => { G.cfg.som = chkSom.checked; somLigado(chkSom.checked); G.salvarCfg(); };
  selQ.onchange = () => { G.cfg.qualidade = +selQ.value; G.salvarCfg(); $('#m-qual-aviso').textContent = 'A qualidade muda ao abrir o jogo de novo.'; };
  $('#m-ajuda').onclick = () => ui.ajuda();
  $('#m-jogar').onclick = () => {
    iniciarSom();
    menu.classList.add('oculto');
    iniciarPartida(dif);
    G.iniciado = true;
    camRTS.irPara(G.estr.qg.x, G.estr.qg.z, 420);
    camRTS.yaw = G.baseEixo.ang + Math.PI;
    ui.atualizarTopo();
    ui.alerta('📻 Base Militar de Miami operante. Relatos de ataques estranhos no centro...', G.estr.qg.x, G.estr.qg.z, 'info');
    ui.alerta('Dica: toque em ❓ no menu ⚙️ para ver os controles', null, null, 'info');
  };
  if (/[?&]auto/.test(location.search)) $('#m-jogar').click();
  window.G = G;
  window.__dbg = { ordenar, ordenarMover, desembarcar, enfileirar, simular, predios, NAV, tela: (x, y, z) => telaDe(x, y, z, camera) };
}

iniciar().catch((e) => {
  console.error(e);
  status('Erro ao iniciar: ' + e.message);
});
