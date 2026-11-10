// Miami: Surto Zumbi — estratégia em tempo real 3D no mapa real de Miami
import * as THREE from 'three';
import { G } from './estado.js';
import { LARG, ALT, lugares, predios, MAT_PREDIOS, META, COSTA, definirQualidade, atualizarDecoracao, atualizarPredios } from './mapa.js';
import { Hash } from './util.js';
import { Bonecos, CAMO, CAMO2, PELE_SOLD, SWAT_ROUPA, SWAT_CALCA } from './bonecos.js';
import { Efeitos } from './efeitos.js';
import { CameraRTS, configurarEntrada } from './entrada.js';
import { montarMundo, construirVisual, iniciarPartida, atualizarJogo } from './jogo.js';
import { atualizarUnidades, atualizarProjeteis, chaoEm, ordenar, ordenarMover, desembarcar } from './unidades.js';
import { telaDe } from './entrada.js';
import * as NAV from './caminho.js';
import * as MAPA from './mapa.js';
import { enfileirar } from './jogo.js';
import { atualizarAgentes, desenharAgentes } from './agentes.js';
import { UI, AJUDA } from './ui.js';
import { iniciarSom, somLigado, somHeli, somJato, somMotor } from './som.js';

const $ = (s) => document.querySelector(s);
const status = (t) => { const e = $('#carregando-txt'); if (e) e.textContent = t; };

function lerCfg() {
  try { Object.assign(G.cfg, JSON.parse(localStorage.getItem('miami-cfg') || '{}')); } catch (e) { /* sem armazenamento */ }
  // primeira vez: celular começa na qualidade baixa
  if (G.cfg.qualidade === undefined) {
    const celular = /Android|iPhone|iPad|Mobile|MiamiZumbiAPK/i.test(navigator.userAgent) || (navigator.deviceMemory && navigator.deviceMemory <= 4);
    G.cfg.qualidade = celular ? 0 : 1;
  }
}
G.salvarCfg = () => { try { localStorage.setItem('miami-cfg', JSON.stringify(G.cfg)); } catch (e) { /* ignora */ } };

const CEU_DIA = new THREE.Color(0xa9cfe8), CEU_TARDE = new THREE.Color(0xf0b27a), CEU_NOITE = new THREE.Color(0x0d1830);
const SNIPER = [0.78, 0.86, 0.66];

async function iniciar() {
  lerCfg();
  status('Preparando o mapa de Miami...');
  await new Promise((r) => setTimeout(r, 30));
  const q = G.cfg.qualidade ?? 1;
  definirQualidade(q);
  const renderer = new THREE.WebGLRenderer({ antialias: q >= 2, powerPreference: 'high-performance', stencil: false });
  // resolução base por qualidade; um ajuste automático reduz mais se o FPS cair
  const prBase = q === 0 ? Math.min(1, devicePixelRatio) * 0.7 : q === 1 ? Math.min(1.25, devicePixelRatio) : Math.min(2, devicePixelRatio);
  let escalaRes = 1;
  renderer.setPixelRatio(prBase);
  renderer.setSize(innerWidth, innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  // sombras do sol (desligadas na qualidade baixa)
  renderer.shadowMap.enabled = q >= 1;
  renderer.shadowMap.autoUpdate = false;   // atualizada a cada 2 quadros (abaixo)
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  $('#jogo').appendChild(renderer.domElement);
  const cena = new THREE.Scene();
  cena.background = CEU_DIA.clone();
  cena.fog = new THREE.Fog(CEU_DIA.clone(), 2500, 11000);
  const camera = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 1, 15000);
  G.cena = cena; G.camera = camera; G.renderer = renderer;
  const hemi = new THREE.HemisphereLight(0xcfe3ff, 0x5d5446, 1.1);
  cena.add(hemi);
  const sol = new THREE.DirectionalLight(0xfff0d8, 3.2);
  sol.position.set(-0.5, 1, 0.35);
  sol.castShadow = q >= 1;
  sol.shadow.mapSize.set(q >= 2 ? 2048 : 1024, q >= 2 ? 2048 : 1024);
  sol.shadow.bias = -0.0004;
  sol.shadow.normalBias = 0.6;
  sol.shadow.camera.near = 10; sol.shadow.camera.far = 6000;
  cena.add(sol);
  cena.add(sol.target);
  G.sol = sol;

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
  const f0 = lugares[(META.focos || [])[0]] || lugares.base;
  camRTS.irPara(f0.x, f0.z, 1400);
  camRTS.yaw = 0.6;
  configurarEntrada(renderer.domElement, camRTS);
  const ui = new UI(camRTS);
  ui.ajustarCidade();

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
  const raioPessoas = q === 0 ? 450 : q === 1 ? 700 : 900;
  function visivel(x, z) {
    if (G.longe) return false;
    vp.set(x, 1, z);
    const dx = x - camera.position.x, dz = z - camera.position.z;
    if (dx * dx + dz * dz > raioPessoas * raioPessoas) return false;
    return frustum.containsPoint(vp);
  }
  function simular(dt) {
    // buscas de caminho por passo: poucas e curtas no celular, para não travar a tela
    G.orcamentoCaminhos = q === 0 ? 1 : 2;
    G.limiteCaminho = q === 0 ? 12000 : 30000;
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
    sol.intensity = 3.2 * Math.max(0.12, luz - 0.1) + (luz < 0.5 ? 0.25 : 0);
    hemi.intensity = 0.35 + 0.8 * luz;
    // sol baixo de manhã e à tarde (sombras longas); à noite a "luz" vem da lua
    const ang = ((h - 6) / 12) * Math.PI;
    const dia = h >= 6 && h <= 18.5;
    const elev = dia ? 0.35 + 0.65 * Math.max(0, Math.sin(ang)) : 0.9;
    G.dirSol = { x: dia ? -Math.cos(ang) * 0.9 : 0.4, y: elev, z: 0.45 };
    sol.color.setHex(tarde > 0.3 ? 0xffb874 : luz < 0.5 ? 0x8fa6ff : 0xfff0d8);
    G.agua.userData.tempo.value += dt;
    // janelas acesas à noite
    const noite = Math.max(0, Math.min(1, (0.85 - luz) / 0.5));
    for (const k in MAT_PREDIOS) MAT_PREDIOS[k].emissiveIntensity = noite * 0.9;
  }
  let mediaQuadro = 16, contaRes = 0, nQuadro = 0;
  function quadro(agora) {
    requestAnimationFrame(quadro);
    // qualidade baixa: limita a 30 quadros por segundo (menos calor e menos travadas)
    if (q === 0 && agora - ultimo < 30) return;
    const bruto = agora - ultimo;
    let dt = Math.min(0.05, bruto / 1000);
    ultimo = agora;
    nQuadro++;
    // resolução dinâmica: se ficar lento, reduz; se sobrar, volta a subir
    mediaQuadro = mediaQuadro * 0.95 + Math.min(200, bruto) * 0.05;
    if (G.iniciado && ++contaRes > 90) {
      contaRes = 0;
      const meta = q === 0 ? 40 : 24;
      let nova = escalaRes;
      if (mediaQuadro > meta * 1.25 && escalaRes > 0.55) nova = escalaRes - 0.1;
      else if (mediaQuadro < meta * 0.75 && escalaRes < 1) nova = Math.min(1, escalaRes + 0.1);
      if (nova !== escalaRes) { escalaRes = nova; renderer.setPixelRatio(prBase * escalaRes); }
    }
    // sombras só quando a câmera está perto (de longe nem aparecem)
    const comSombra = q >= 1 && camRTS.dist < (q >= 2 ? 1400 : 800);
    renderer.shadowMap.needsUpdate = comSombra && nQuadro % 2 === 0;
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
    // a sombra acompanha a área vista pela câmera
    if (G.dirSol) {
      const S = Math.min(2200, Math.max(70, camRTS.dist * 1.25));
      const sc = sol.shadow.camera;
      if (Math.abs(sc.right - S) > S * 0.1) { sc.left = -S; sc.right = S; sc.top = S; sc.bottom = -S; sc.updateProjectionMatrix(); }
      // trava na grade de texels para a sombra não tremer
      const tx = (2 * S) / sol.shadow.mapSize.x;
      const ax = Math.round(camRTS.alvo.x / tx) * tx, az = Math.round(camRTS.alvo.z / tx) * tx;
      const d = G.dirSol, L = Math.hypot(d.x, d.y, d.z);
      sol.target.position.set(ax, 0, az);
      sol.position.set(ax + d.x / L * 3000, d.y / L * 3000, az + d.z / L * 3000);
    }
    // árvores e carros somem no zoom muito afastado (não dá para ver e pesa no celular)
    // distância de névoa acompanha o zoom; na qualidade baixa a névoa é mais perto e o que está atrás dela não é desenhado
    const nf = q === 0 ? [700, 1.6, 2600, 3.6] : q === 1 ? [1200, 2.0, 5000, 5] : [1500, 2.2, 9000, 6];
    cena.fog.near = Math.max(nf[0], camRTS.dist * nf[1]);
    cena.fog.far = Math.max(nf[2], camRTS.dist * nf[3]);
    if (camera.far !== cena.fog.far + 300) { camera.far = cena.fog.far + 300; camera.updateProjectionMatrix(); }
    if (G.decor) atualizarDecoracao(G.decor, camRTS.alvo, camRTS.dist);
    if (G.malhasPredios) atualizarPredios(G.malhasPredios, camRTS.alvo, camRTS.dist, cena.fog.far + camRTS.dist * 0.5);
    ciclo(G.pausado ? 0 : dt);
    mat4.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
    frustum.setFromProjectionMatrix(mat4);
    // pessoas
    const bon = G.bonecos;
    bon.comecar();
    if (camRTS.dist < (q === 0 ? 500 : 900)) {
      for (const u of G.unidades) {
        if (u.classe !== 'inf' || !u.vivo || u.dentro) continue;
        if (!visivel(u.x, u.z)) continue;
        const pose = u.mirando > 0 && u.velAtual < 0.5 ? 2 : 0;
        const vn = Math.min(1, u.velAtual / 3);
        if (u.policia) bon.add(u.x, u.y, u.z, u.ang, u.fase, pose, SWAT_ROUPA, SWAT_CALCA, PELE_SOLD, 2, 1, null, vn);
        else bon.add(u.x, u.y, u.z, u.ang, u.fase, pose, u.tipo === 'sniper' ? SNIPER : CAMO, CAMO2, PELE_SOLD, 1, 1, null, vn);
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
    // jatos e motores dos blindados perto da câmera
    let jv = 0, mv = 0, rot = 0;
    for (const u of G.unidades) {
      if (!u.vivo || u.dentro) continue;
      const d = Math.hypot(u.x - camRTS.alvo.x, u.z - camRTS.alvo.z) + camRTS.dist * 0.5;
      if (u.classe === 'jato' && u.estadoJato !== 'pronto' && u.estadoJato !== 'rearmando') jv = Math.max(jv, (1 - d / 2600) * (u.estadoJato === 'pousando' ? 0.5 : 1));
      else if (u.classe === 'veic') { const v = (1 - d / 350) * (u.d.raio >= 3.4 ? 1 : 0.55); if (v > mv) { mv = v; rot = Math.min(1, u.velAtual / u.d.vel); } }
    }
    somJato(G.pausado ? 0 : Math.max(0, jv));
    somMotor(G.pausado ? 0 : Math.max(0, mv), rot);
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
  const chkSom = $('#m-som'), selQ = $('#m-qual');
  chkSom.checked = G.cfg.som !== false; selQ.value = String(q);
  chkSom.onchange = () => { G.cfg.som = chkSom.checked; somLigado(chkSom.checked); G.salvarCfg(); };
  selQ.onchange = () => { G.cfg.qualidade = +selQ.value; G.salvarCfg(); $('#m-qual-aviso').textContent = 'A qualidade muda ao abrir o jogo de novo.'; };
  $('#m-ajuda').onclick = () => ui.ajuda();
  // escolha da cidade: recarrega com o mapa novo
  menu.querySelectorAll('[data-cidade]').forEach((b) => {
    b.classList.toggle('ativo', b.dataset.cidade === (META.cidade || 'miami'));
    b.addEventListener('click', () => {
      if (b.dataset.cidade === (META.cidade || 'miami')) return;
      try { localStorage.setItem('miami-cidade', b.dataset.cidade); } catch (e) { /* sem armazenamento */ }
      location.href = location.pathname + '?cidade=' + b.dataset.cidade;
    });
  });
  $('#m-jogar').onclick = () => {
    iniciarSom();
    menu.classList.add('oculto');
    iniciarPartida(dif);
    G.iniciado = true;
    camRTS.irPara(G.estr.qg.x, G.estr.qg.z, 420);
    camRTS.yaw = G.baseEixo.ang + Math.PI;
    ui.atualizarTopo();
    ui.alerta(`📻 ${lugares.base.nome} operante. Relatos de ataques estranhos em ${META.nome}...`, G.estr.qg.x, G.estr.qg.z, 'info');
    ui.alerta('Dica: toque em ❓ no menu ⚙️ para ver os controles', null, null, 'info');
  };
  if (/[?&]auto/.test(location.search)) $('#m-jogar').click();
  window.G = G;
  window.__dbg = { ordenar, ordenarMover, desembarcar, enfileirar, simular, predios, NAV, MAPA, tela: (x, y, z) => telaDe(x, y, z, camera) };
}

iniciar().catch((e) => {
  console.error(e);
  status('Erro ao iniciar: ' + e.message);
});
