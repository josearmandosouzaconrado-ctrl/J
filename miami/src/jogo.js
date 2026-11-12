// Montagem do mundo, bases militares, porta-aviões, produção e fim de jogo (guerra: EUA x Rússia e China)
import * as THREE from 'three';
import { G, alerta } from './estado.js';
import {
  lugares, predios, rasterizarPredios, removerPrediosEm, construirPredios, construirChao, construirAgua,
  construirPalmeiras, construirCarros, andavel, LARG, ALT, GW, GH, CEL, grade, predioId, T, agua as ehAgua,
  META, COSTA,
} from './mapa.js';
import { prepararNavegacao, pontoLivreProximo, livre } from './caminho.js';
import { TIPOS, ESTRUTURAS, CONSTRUIR, PRODUCAO_N } from './tipos.js';
import { criarModelo } from './modelos.js';
import { construirKit, regularizarPredios } from './kit.js';
import {
  criarUnidade, danoUnidade, naZonaSegura, volEm, vagas, embarcarCivil, embarcar, chaoEm, marcarSelecao, padPorta, padLivre,
  ordenarMover, removerUnidade,
} from './unidades.js';
import { criarCivil } from './agentes.js';
import { rand, randi, escolher, dist, dist2 } from './util.js';
import { somUI } from './som.js';
import { NACOES, escolherLocaisBases, iniciarGuerra, atualizarGuerra, ataqueSandbox, limparInimigos } from './guerra.js';

const DIF = {
  facil: { dinheiro: 5000, civis: 600, sos: 22, meta: 150, intervalo: 1.35, renda: 7 },
  normal: { dinheiro: 3500, civis: 750, sos: 26, meta: 250, intervalo: 1.0, renda: 5 },
  dificil: { dinheiro: 2200, civis: 900, sos: 30, meta: 350, intervalo: 0.7, renda: 4 },
  sandbox: { dinheiro: Infinity, civis: 750, sos: 26, meta: Infinity, intervalo: 1.0, renda: 0, sandbox: true },
};

export function montarMundo() {
  // ligações para evitar importações circulares
  G.danoUnidade = danoUnidade; G.naZonaSegura = naZonaSegura; G.volEm = volEm; G.vagas = vagas;
  G.construir = construir;
  G.embarcarCivil = embarcarCivil; G.criarCivil = criarCivil; G.produzir = produzir;
  G.ordenarMover = ordenarMover; G.criarUnidade = criarUnidade; G.removerUnidade = removerUnidade;
  G.regularizados = regularizarPredios();   // contornos retos nos mapas da Esri
  const b = lugares.base;
  removerPrediosEm(b.x, b.z, 380);
  escolherLocaisBases();                    // onde ficam as bases das outras nações
  // eixo da ilha (Dodge Island vai de oeste-noroeste para leste-sudeste)
  const ab = META.baseAng ?? 0.43;
  const ax = { x: Math.cos(ab), z: Math.sin(ab) }, pp = { x: -ax.z, z: ax.x };
  G.baseEixo = { ax, pp, ang: Math.atan2(ax.x, ax.z) };
  const L = (u, v) => ({ x: b.x + ax.x * u + pp.x * v, z: b.z + ax.z * u + pp.z * v });
  // prédios da base viram obstáculos (e dá para pôr soldados no telhado)
  G.layout = {
    qg: L(0, -10), quartel: L(-150, -60), patio: L(-150, 60), heliporto: L(150, -20), zona: L(10, 110),
    torres: [L(-260, -120), L(-260, 140), L(260, -120), L(260, 140), L(0, -160)],
    patriot: [L(90, 120), L(230, 60)],
  };
  const blocos = [['qg', 42, 28, 16], ['quartel', 56, 42, 6], ['patio', 64, 34, 10]];
  for (const [k, w, d, h] of blocos) {
    const c = G.layout[k];
    addBloco(c.x, c.z, w, d, G.baseEixo.ang + Math.PI / 2, h);
  }
  rasterizarPredios();
  prepararNavegacao();
}

function addBloco(cx, cz, w, d, ang, h) {
  const c = Math.cos(ang), s = Math.sin(ang);
  const pts = new Float32Array(8);
  const cantos = [[-w / 2, -d / 2], [-w / 2, d / 2], [w / 2, d / 2], [w / 2, -d / 2]];
  let x0 = 1e9, x1 = -1e9, z0 = 1e9, z1 = -1e9;
  cantos.forEach(([lx, lz], i) => {
    const x = cx + lx * c + lz * s, z = cz - lx * s + lz * c;
    pts[i * 2] = x; pts[i * 2 + 1] = z;
    x0 = Math.min(x0, x); x1 = Math.max(x1, x); z0 = Math.min(z0, z); z1 = Math.max(z1, z);
  });
  // orientação com área negativa (igual aos prédios do mapa)
  let sa = 0;
  for (let k = 0; k < 4; k++) { const j = (k + 1) % 4; sa += pts[k * 2] * pts[j * 2 + 1] - pts[j * 2] * pts[k * 2 + 1]; }
  if (sa > 0) { const r = new Float32Array([pts[6], pts[7], pts[4], pts[5], pts[2], pts[3], pts[0], pts[1]]); pts.set(r); }
  predios.push({ id: predios.length, pts, h, area: w * d, cx, cz, x0, x1, z0, z1, raio: Math.max(w, d) / 2, cap: 12, guarnicao: [], civis: 0, sos: false, integridade: 600, integMax: 600, removido: false, base: true });
}

export function construirVisual() {
  G.chao = construirChao(G.cena);
  G.agua = construirAgua(G.cena);
  const naoBase = predios.filter((p) => p.base);
  for (const p of naoBase) p.removido = true;   // não desenha os blocos (os modelos da base aparecem no lugar)
  G.kit = construirKit(G.cena);                 // casas e lojas modeladas no Blender
  G.malhasPredios = construirPredios(G.cena);
  for (const p of naoBase) p.removido = false;
  // sem árvores em cima da pista de pouso (cidades sem mar)
  const bb = lugares.base, ex = G.baseEixo;
  const pc = COSTA ? null : { x: bb.x + ex.pp.x * -330, z: bb.z + ex.pp.z * -330 };
  G.decor = construirPalmeiras(G.cena, META.rural ? 32000 : META.pais === 'Brasil' ? 5000 : 2600, pc ? (x, z) => {
    const dx = x - pc.x, dz = z - pc.z, a = ex.ang, l = dx * Math.sin(a) + dz * Math.cos(a), t = dx * Math.cos(a) - dz * Math.sin(a);
    return Math.abs(l) < 180 && t > -110 && t < 40;
  } : null);
  const b = lugares.base;
  G.decor.push(...construirCarros(G.cena, 3200, (x, z) => dist(x, z, b.x, b.z) < 450));
  for (const p of predios) if (!p.base) { p.integMax = 150 + Math.min(900, p.area * 0.4); p.integridade = p.integMax; }
}

export function criarEstrutura(tipo, x, z, ang, nacao = G.nacao) {
  const d = ESTRUTURAS[tipo];
  const m = criarModelo(tipo);
  bandeira(m.grupo, nacao, d.raio);
  m.grupo.position.set(x, 0, z);
  m.grupo.rotation.y = ang;
  G.cena.add(m.grupo);
  const u = { id: G.idSeq++, estr: true, tipoEstr: tipo, tipo, d, classe: 'estr', x, z, y: 0, ang, hp: d.hp, hpMax: d.hp, vivo: true, m, fila: [], passageiros: [], cargaUsada: 0, busca: rand(0, 1), cd: 0, nacao };
  G.unidades.push(u);
  if (['qg', 'zona', 'fob'].includes(tipo) && nacao === G.nacao) (G.abrigos || (G.abrigos = [])).push(u);
  return u;
}

// mastro com a bandeira da nação dona da estrutura
const _tBand = {};
function texBandeira(n) {
  if (_tBand[n]) return _tBand[n];
  const c = document.createElement('canvas'); c.width = 96; c.height = 64;
  const g = c.getContext('2d');
  if (n === 'eua') {
    for (let i = 0; i < 13; i++) { g.fillStyle = i % 2 ? '#ffffff' : '#b22234'; g.fillRect(0, i * 64 / 13, 96, 64 / 13 + 0.5); }
    g.fillStyle = '#3c3b6e'; g.fillRect(0, 0, 40, 35);
    g.fillStyle = '#fff'; for (let j = 0; j < 5; j++) for (let i = 0; i < 6; i++) g.fillRect(3 + i * 6.3, 3 + j * 6.5, 2, 2);
  } else if (n === 'russia') {
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, 96, 22); g.fillStyle = '#0039a6'; g.fillRect(0, 21, 96, 22); g.fillStyle = '#d52b1e'; g.fillRect(0, 42, 96, 22);
  } else {
    g.fillStyle = '#de2910'; g.fillRect(0, 0, 96, 64);
    const est = (x, y, r) => { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, q = i % 2 ? r * 0.4 : r; g.lineTo(x + Math.cos(a) * q, y + Math.sin(a) * q); } g.fill(); };
    g.fillStyle = '#ffde00'; est(16, 16, 10); for (const [x, y] of [[32, 6], [38, 13], [38, 22], [32, 29]]) est(x, y, 3.4);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  return (_tBand[n] = t);
}
function bandeira(grupo, nacao, raio) {
  if (!nacao) return;
  const h = 14, x = Math.min(raio * 0.7, 20);
  const mastro = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, h, 6), new THREE.MeshLambertMaterial({ color: 0xd8d8d8 }));
  mastro.position.set(x, h / 2, 0);
  const pano = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.8), new THREE.MeshLambertMaterial({ map: texBandeira(nacao), side: THREE.DoubleSide }));
  pano.position.set(x + 2.2, h - 1.6, 0);
  grupo.add(mastro, pano);
}

// estrutura da produção: a escolhida no painel, senão a mais perto da câmera
export function fonteDe(tipoFonte) {
  if (tipoFonte === 'porta') return COSTA ? G.porta : fonteDe('pista');
  if (G.fonteSel && G.fonteSel.vivo && G.fonteSel.tipoEstr === tipoFonte && !(G.fonteSel.construindo > 0) && G.fonteSel.nacao === G.nacao) return G.fonteSel;
  let melhor = null, md = Infinity;
  const c = G.camAlvo || { x: 0, z: 0 };
  for (const u of G.unidades) {
    if (!u.vivo || !u.estr || u.tipoEstr !== tipoFonte || u.construindo > 0 || u.nacao !== G.nacao) continue;
    const d = dist2(u.x, u.z, c.x, c.z);
    if (d < md) { md = d; melhor = u; }
  }
  return melhor;
}

// constrói uma estrutura nova onde o jogador tocou
export function construir(tipo, x, z) {
  const d = CONSTRUIR[tipo];
  if (G.dinheiro < d.custo) { alerta('Dinheiro insuficiente', null, null, 'ruim'); somUI('erro'); return false; }
  if (!andavel(x, z)) { alerta('Não dá para construir aí (prédio ou água)', x, z, 'ruim'); somUI('erro'); return false; }
  const r = Math.min(d.raio, 24);
  if (!d.agua && tipo !== 'muro' && tipo !== 'torre') {
    let bloq = 0;
    for (let a = 0; a < 6.28; a += 0.5) for (const f of [0.5, 1]) if (!andavel(x + Math.sin(a) * r * f, z + Math.cos(a) * r * f)) bloq++;
    if (bloq > 3) { alerta('Pouco espaço livre aqui: escolha um terreno aberto (praça, estacionamento, rua larga)', x, z, 'ruim'); somUI('erro'); return false; }
  }
  for (const u of G.unidades) if (u.vivo && u.estr && dist(u.x, u.z, x, z) < (u.d.raio + d.raio) * 0.6) { alerta('Muito perto de outra estrutura', x, z, 'ruim'); somUI('erro'); return false; }
  let ang = G.cam ? G.cam.yaw : 0;
  let saidaAgua = null;
  if (d.agua) {
    const b = acharBeiraMar(x, z);
    if (!b || b.r > 80) { alerta('As docas precisam ficar na beira da água', x, z, 'ruim'); somUI('erro'); return false; }
    x = b.x; z = b.z; ang = b.ang; saidaAgua = b.agua;
  }
  G.dinheiro -= d.custo;
  const u = criarEstrutura(tipo, x, z, ang);
  u.construindo = u.tempoObra = G.sandbox ? 2 : d.tempo;
  u.hp = u.hpMax * 0.2;
  u.m.grupo.scale.y = 0.15;
  if (saidaAgua) u.saidaAgua = saidaAgua;
  if (tipo === 'pista') { u.deck = 0.3; u.fila = []; }
  if (tipo === 'quartel' || tipo === 'patio') u.saida = lugarLivre({ x: x + Math.sin(ang) * 40, z: z + Math.cos(ang) * 40 });
  alerta(`🏗️ Construindo ${d.nome}...`, x, z, 'info');
  somUI('ok');
  return true;
}

function lugarLivre(p, modo = 0) {
  if (modo === 0 && andavel(p.x, p.z)) return p;
  return pontoLivreProximo(modo, p.x, p.z) || p;
}

// placas nas saídas das rodovias que levam a outra região
function criarSaidas() {
  G.saidas = [];
  for (const [nome, px, pz, dest] of META.saidas || []) {
    let x = px * META.mpp, z = pz * META.mpp;
    const p = pontoLivreProximo(0, x, z);
    if (p) { x = p.x; z = p.z; }
    const m = criarModelo('placa');
    // a placa fica de frente para o centro do mapa
    const ang = Math.atan2(LARG / 2 - x, ALT / 2 - z);
    m.grupo.position.set(x + Math.sin(ang + Math.PI / 2) * 6, 0, z + Math.cos(ang + Math.PI / 2) * 6);
    m.grupo.rotation.y = ang;
    G.cena.add(m.grupo);
    G.saidas.push({ nome, x, z, dest, m });
  }
}

export function iniciarPartida(dif, nacao = 'eua') {
  G.nacao = NACOES[nacao] ? nacao : 'eua';
  const EUA = G.nacao === 'eua';
  lugares.base.nome = `${NACOES[G.nacao].base} - ${META.nome}`;
  G.nomeCidade = META.nome;
  criarSaidas();
  const cfg = DIF[dif] || DIF.normal;
  G.dificuldade = dif; G.cfgDif = cfg;
  G.dinheiro = cfg.dinheiro; G.meta = cfg.meta; G.sandbox = !!cfg.sandbox; G.pausaIA = false;
  G.tempo = 0; G.dia = 1;
  G.resgatados = 0; G.civisMortos = 0; G.perdas = 0; G.abates = 0;
  G.ruidos = []; G.quadro = 0; G.fim = false;
  const ang = G.baseEixo.ang + Math.PI / 2;
  const L = G.layout;
  G.estr.qg = criarEstrutura('qg', L.qg.x, L.qg.z, ang);
  G.estr.quartel = criarEstrutura('quartel', L.quartel.x, L.quartel.z, ang);
  G.estr.patio = criarEstrutura('patio', L.patio.x, L.patio.z, ang);
  const h = lugarLivre(L.heliporto);
  G.estr.heliporto = criarEstrutura('heliporto', h.x, h.z, ang);
  const zz = lugarLivre(L.zona);
  G.estr.zona = criarEstrutura('zona', zz.x, zz.z, ang);
  for (const t of L.torres) { const p = lugarLivre(t); if (dist(p.x, p.z, t.x, t.z) < 60) criarEstrutura('torre', p.x, p.z, ang); }
  for (const t of L.patriot) { const p = lugarLivre(t); criarEstrutura('patriot', p.x, p.z, ang + 0.5); }
  // docas: na beira d'água mais próxima (só em cidades com costa; por enquanto só os EUA têm marinha)
  const docas = COSTA && EUA ? acharBeiraMar(G.estr.qg.x, G.estr.qg.z) : null;
  if (docas) {
    G.estr.docas = criarEstrutura('docas', docas.x, docas.z, docas.ang);
    G.estr.docas.saidaAgua = docas.agua;
  }
  // saídas de produção
  for (const k of ['quartel', 'patio']) {
    const e = G.estr[k];
    const fr = { x: e.x + G.baseEixo.pp.x * 45, z: e.z + G.baseEixo.pp.z * 45 };
    e.saida = lugarLivre(fr);
  }
  let pa = null;
  if (!EUA) { /* Rússia e China: ainda sem marinha e jatos (próxima etapa) */ } else if (COSTA) {
    // porta-aviões e escolta
    pa = lugares.portaavioes;
    if (!livre(2, pa.x, pa.z)) pa = pontoLivreProximo(2, pa.x, pa.z) || pa;
    G.porta = criarUnidade('portaavioes', pa.x, pa.z, Math.PI);
    G.porta.fila = [];
    G.porta.deck = G.porta.m?.def.deck ?? 9.2;
    const de = pontoLivreProximo(2, pa.x - 250, pa.z + 300) || { x: pa.x, z: pa.z + 400 };
    criarUnidade('destroier', de.x, de.z, Math.PI);
    const lan = G.estr.docas.saidaAgua;
    criarUnidade('lancha', lan.x, lan.z, docas.ang);
  } else {
    // cidade sem mar: os jatos operam de uma pista de pouso ao lado da base
    const b = lugares.base, ax = G.baseEixo.ax, pp = G.baseEixo.pp;
    const L2 = (u, v) => ({ x: b.x + ax.x * u + pp.x * v, z: b.z + ax.z * u + pp.z * v });
    const pp2 = L2(0, -330);
    G.porta = criarEstrutura('pista', pp2.x, pp2.z, G.baseEixo.ang);
    G.porta.deck = 0.3; G.porta.aerodromo = true;
    pa = G.porta;
  }
  // tropas iniciais da nação do jogador
  const P = PRODUCAO_N[G.nacao];
  const qs = G.estr.quartel.saida, ps = G.estr.patio.saida;
  const tropas = [[P.quartel[0], 8], [P.quartel[1], 2], [P.quartel[2], 1], [P.quartel[3], 1]];
  let k = 0;
  for (const [t, n] of tropas) for (let i = 0; i < n; i++, k++) {
    const p = lugarLivre({ x: qs.x + (k % 4) * 3 - 5, z: qs.z + Math.floor(k / 4) * 3 });
    criarUnidade(t, p.x, p.z, G.baseEixo.ang);
  }
  const veic = EUA ? [['humvee', 2], ['stryker', 1], ['ambulancia', 1]] : [[P.patio[0], 2], [P.patio[1], 2]];
  for (const [t, n] of veic) for (let i = 0; i < n; i++, k++) {
    const p = lugarLivre({ x: ps.x + (k % 3) * 8 - 8, z: ps.z + (k % 2) * 8 });
    criarUnidade(t, p.x, p.z, G.baseEixo.ang);
  }
  const hp = G.estr.heliporto;
  const [hTransp, hAtaque] = EUA ? ['blackhawk', 'apache'] : [P.heliporto[1], P.heliporto[0]];
  const bh = criarUnidade(hTransp, hp.x + G.baseEixo.ax.x * -30, hp.z + G.baseEixo.ax.z * -30, G.baseEixo.ang);
  bh.pousado = true; bh.y = 0;
  const ap = criarUnidade(hAtaque, hp.x, hp.z, G.baseEixo.ang);
  ap.pousado = true;
  // jatos no convés (EUA)
  if (pa) {
    const j1 = criarUnidade('f35', pa.x, pa.z, 0); j1.vagaConves = 0; j1.base = G.porta;
    const j2 = criarUnidade('f18', pa.x, pa.z, 0); j2.vagaConves = 1; j2.base = G.porta;
    if (!COSTA) { const j3 = criarUnidade('a10', pa.x, pa.z, 0); j3.vagaConves = 2; j3.base = G.porta; }
  }
  // as bases da Rússia, da China e dos EUA controladas pelo computador
  iniciarGuerra(criarEstrutura, criarUnidade, lugarLivre);
  // civis
  espalharCivis(cfg.civis);
  // prédios com civis presos (SOS)
  const cand = predios.filter((p) => !p.base && !p.removido && p.h > 9 && dist(p.cx, p.cz, G.estr.qg.x, G.estr.qg.z) > 700);
  for (let i = 0; i < cfg.sos && cand.length; i++) {
    const p = cand.splice(randi(0, cand.length - 1), 1)[0];
    p.sos = true; p.civis = randi(4, 14);
  }
  G.populacao = G.agentes.length + predios.reduce((s, p) => s + p.civis, 0);
  G.pausado = false;
}

function acharBeiraMar(x, z) {
  // procura a água mais próxima em 16 direções e põe as docas na margem
  let melhor = null;
  for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2, sx = Math.sin(a), sz = Math.cos(a);
    for (let r = 20; r < 600; r += 4) {
      const px = x + sx * r, pz = z + sz * r;
      if (ehAgua(px, pz)) {
        if (!melhor || r < melhor.r) {
          const aguaP = pontoLivreProximo(1, px + sx * 60, pz + sz * 60) || { x: px + sx * 60, z: pz + sz * 60 };
          melhor = { r, x: px - sx * 4, z: pz - sz * 4, ang: a, agua: aguaP };
        }
        break;
      }
    }
  }
  return melhor || { x, z, ang: 0, agua: { x, z } };
}

function espalharCivis(n) {
  const qg = G.estr.qg;
  let t = 0, criados = 0;
  while (criados < n && t < n * 200) {
    t++;
    const x = Math.random() * LARG, z = Math.random() * ALT;
    if (!andavel(x, z)) continue;
    if (dist2(x, z, qg.x, qg.z) < 600 * 600) continue;
    // mais gente perto de prédios
    const cx = Math.floor(x / CEL), cz = Math.floor(z / CEL);
    let perto = 0;
    for (let dz = -3; dz <= 3; dz += 3) for (let dx = -3; dx <= 3; dx += 3) {
      const k = (cz + dz) * GW + (cx + dx);
      if (k >= 0 && k < predioId.length && predioId[k] >= 0) perto++;
    }
    if (Math.random() > 0.08 + perto * 0.12) continue;
    criarCivil(x, z);
    criados++;
  }
}

// ---------------- produção ----------------
export function enfileirar(tipo, aba) {
  const d = TIPOS[tipo];
  const fonte = fonteDe(aba || d.de);
  if (!fonte && (aba || d.de) === 'pista') { alerta(G.unidades.some((u) => u.vivo && u.tipoEstr === 'pista') ? 'A pista de pouso ainda está em construção' : 'Construa uma Pista de Pouso (🔨 Construir) para usar F-22 e A-10', null, null, 'ruim'); somUI('erro'); return false; }
  if (!fonte || !fonte.vivo) { alerta('Estrutura destruída: não dá para produzir', 0, 0, 'ruim'); somUI('erro'); return false; }
  if (G.dinheiro < d.custo) { alerta('Dinheiro insuficiente', null, null, 'ruim'); somUI('erro'); return false; }
  if (fonte.fila.length >= 8) { alerta('Fila cheia', null, null); somUI('erro'); return false; }
  if (d.classe === 'jato' && G.unidades.filter((u) => u.classe === 'jato' && u.vivo && (u.base || G.porta) === fonte).length + fonte.fila.filter((f) => TIPOS[f.tipo].classe === 'jato').length >= 6) {
    alerta('Esta base comporta no máximo 6 jatos', null, null); somUI('erro'); return false;
  }
  G.dinheiro -= d.custo;
  const tp = G.sandbox ? Math.max(1, d.tempo * 0.15) : d.tempo;
  fonte.fila.push({ tipo, t: tp, total: tp });
  somUI('clique');
  return true;
}

export function cancelar(fonteNome, i) {
  const fonte = fonteDe(fonteNome);
  if (!fonte || !fonte.fila[i]) return;
  const f = fonte.fila.splice(i, 1)[0];
  G.dinheiro += TIPOS[f.tipo].custo;
}

function produzir(tipo, fonte) {
  const d = TIPOS[tipo];
  let u;
  if (fonte && (fonte === G.porta || fonte.tipoEstr === 'pista')) {
    const p = fonte;
    if (d.classe === 'jato') {
      u = criarUnidade(tipo, p.x, p.z, 0, { nacao: p.nacao });
      u.base = p;
      const usadas = new Set(G.unidades.filter((x) => x.classe === 'jato' && x !== u && x.vivo && (x.base || G.porta) === p).map((x) => x.vagaConves));
      let v = 0; while (usadas.has(v)) v++;
      u.vagaConves = v;
    } else {
      const q = p === G.porta ? padPorta(p, padLivre(p)) : { x: p.x + Math.sin(p.ang) * (-60 - randi(0, 3) * 25), z: p.z + Math.cos(p.ang) * (-60 - randi(0, 3) * 25) };
      u = criarUnidade(tipo, q.x, q.z, p.ang, { alt: p.deck, nacao: p.nacao });
      u.y = p.deck; u.pousado = true;
    }
  } else if (d.de === 'heliporto') {
    const pads = [[-30, 0], [0, 0], [30, 0], [-15, 32], [15, 32]];
    const [px, pz] = escolher(pads);
    const c = Math.cos(fonte.ang), s = Math.sin(fonte.ang);
    u = criarUnidade(tipo, fonte.x + px * c + pz * s, fonte.z - px * s + pz * c, fonte.ang, { nacao: fonte.nacao });
    u.pousado = true;
  } else if (d.de === 'docas') {
    const a = fonte.saidaAgua;
    let p = a;
    if (d.nav === 2) p = pontoLivreProximo(2, a.x, a.z) || a;
    u = criarUnidade(tipo, p.x + rand(-10, 10), p.z + rand(-10, 10), fonte.ang, { nacao: fonte.nacao });
  } else {
    const s = fonte.saida || fonte;
    const p = lugarLivre({ x: s.x + rand(-6, 6), z: s.z + rand(-6, 6) });
    u = criarUnidade(tipo, p.x, p.z, fonte.ang ?? G.baseEixo.ang, { nacao: fonte.nacao });
  }
  if (u.nacao === G.nacao) { alerta(`${d.icone} ${d.nome} pronto!`, u.x, u.z, 'bom'); somUI('ok'); }
  return u;
}

export function atualizarJogo(dt) {
  G.tempo += dt;
  G.quadro++;
  const dur = 480;
  G.hora = (G.tempo / dur * 24 + 8) % 24;
  G.dia = 1 + Math.floor((G.tempo / dur * 24 + 8) / 24);
  G.noite = G.hora < 6 || G.hora >= 19.5;
  G.dinheiro += G.cfgDif.renda * dt;
  // ruídos expiram
  G.ruidos = G.ruidos.filter((r) => G.tempo - r.t < 3);
  if (G.ruidos.length > 60) G.ruidos.splice(0, G.ruidos.length - 60);
  atualizarGuerra(dt);
  // porta-aviões produz
  const p = G.porta;
  if (p && p.vivo && p.fila.length) {
    const f = p.fila[0];
    f.t -= dt;
    if (f.t <= 0) { p.fila.shift(); produzir(f.tipo, p); }
  }
  if (G.resgateAcum) {
    if (!G._ultResg || G.tempo - G._ultResg > 2) {
      alerta(`✅ ${G.resgateAcum} civis chegaram à zona segura (+$${G.resgateAcum * 40})`, null, null, 'bom');
      somUI('resgate');
      G.resgateAcum = 0; G._ultResg = G.tempo;
    }
  }
  // fim de jogo: QG destruído (ver guerra.js); sem civis vivos não há derrota, só a guerra decide
}

export function vitoria(txt) { if (G.fim) return; G.fim = true; G.pausado = true; G.ui && G.ui.fim(true, txt); }
export function derrota(txt) { if (G.sandbox) { alerta('Sandbox: ' + txt + ' (o jogo continua)', null, null, 'ruim'); return; } if (G.fim) return; G.fim = true; G.pausado = true; G.ui && G.ui.fim(false, txt); }
G.derrota = derrota;
G.vitoria = vitoria;
// ferramentas do modo sandbox
G.ataqueSandbox = ataqueSandbox; G.limparInimigos = limparInimigos;
