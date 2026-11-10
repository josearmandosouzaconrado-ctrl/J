// Montagem do mundo, base militar, porta-aviões, surto zumbi, produção e fim de jogo
import * as THREE from 'three';
import { G, alerta } from './estado.js';
import {
  lugares, predios, rasterizarPredios, removerPrediosEm, construirPredios, construirChao, construirAgua,
  construirPalmeiras, construirCarros, andavel, LARG, ALT, GW, GH, CEL, grade, predioId, T, agua as ehAgua,
  META, COSTA,
} from './mapa.js';
import { prepararNavegacao, pontoLivreProximo, livre } from './caminho.js';
import { TIPOS, ESTRUTURAS, CONSTRUIR } from './tipos.js';
import { criarModelo } from './modelos.js';
import {
  criarUnidade, danoUnidade, naZonaSegura, volEm, vagas, embarcarCivil, embarcar, chaoEm, marcarSelecao,
} from './unidades.js';
import { criarCivil, criarZumbi, soldadoVirouZumbi, tornarZumbi } from './agentes.js';
import { rand, randi, escolher, dist, dist2 } from './util.js';
import { somUI } from './som.js';
import { enviarSwat, atualizarPolicia } from './policia.js';
import { atualizarSobreviventes } from './sobreviventes.js';

const DIF = {
  facil: { dinheiro: 5000, civis: 600, sos: 22, meta: 150, intervalo: 1.35, renda: 7 },
  normal: { dinheiro: 3500, civis: 750, sos: 26, meta: 250, intervalo: 1.0, renda: 5 },
  dificil: { dinheiro: 2200, civis: 900, sos: 30, meta: 350, intervalo: 0.7, renda: 4 },
};

export function montarMundo() {
  // ligações para evitar importações circulares
  G.danoUnidade = danoUnidade; G.naZonaSegura = naZonaSegura; G.volEm = volEm; G.vagas = vagas;
  G.construir = construir;
  G.embarcarCivil = embarcarCivil; G.criarCivil = criarCivil; G.virarZumbi = soldadoVirouZumbi; G.produzir = produzir;
  const b = lugares.base;
  removerPrediosEm(b.x, b.z, 380);
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
  G.malhasPredios = construirPredios(G.cena);
  for (const p of naoBase) p.removido = false;
  // sem árvores em cima da pista de pouso (cidades sem mar)
  const bb = lugares.base, ex = G.baseEixo;
  const pc = COSTA ? null : { x: bb.x + ex.pp.x * -330, z: bb.z + ex.pp.z * -330 };
  G.decor = construirPalmeiras(G.cena, 2600, pc ? (x, z) => {
    const dx = x - pc.x, dz = z - pc.z, a = ex.ang, l = dx * Math.sin(a) + dz * Math.cos(a), t = dx * Math.cos(a) - dz * Math.sin(a);
    return Math.abs(l) < 180 && t > -110 && t < 40;
  } : null);
  const b = lugares.base;
  G.decor.push(construirCarros(G.cena, 3200, (x, z) => dist(x, z, b.x, b.z) < 450));
  for (const p of predios) if (!p.base) { p.integMax = 150 + Math.min(900, p.area * 0.4); p.integridade = p.integMax; }
}

export function criarEstrutura(tipo, x, z, ang) {
  const d = ESTRUTURAS[tipo];
  const m = criarModelo(tipo);
  m.grupo.position.set(x, 0, z);
  m.grupo.rotation.y = ang;
  G.cena.add(m.grupo);
  const u = { id: G.idSeq++, estr: true, tipoEstr: tipo, tipo, d, classe: 'estr', x, z, y: 0, ang, hp: d.hp, hpMax: d.hp, vivo: true, m, fila: [], passageiros: [], cargaUsada: 0, busca: rand(0, 1), cd: 0 };
  G.unidades.push(u);
  if (['qg', 'zona', 'fob'].includes(tipo)) (G.abrigos || (G.abrigos = [])).push(u);
  return u;
}

// estrutura da produção: a escolhida no painel, senão a mais perto da câmera
export function fonteDe(tipoFonte) {
  if (tipoFonte === 'porta') return COSTA ? G.porta : fonteDe('pista');
  if (G.fonteSel && G.fonteSel.vivo && G.fonteSel.tipoEstr === tipoFonte && !(G.fonteSel.construindo > 0)) return G.fonteSel;
  let melhor = null, md = Infinity;
  const c = G.camAlvo || { x: 0, z: 0 };
  for (const u of G.unidades) {
    if (!u.vivo || !u.estr || u.tipoEstr !== tipoFonte || u.construindo > 0) continue;
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
  u.construindo = d.tempo; u.tempoObra = d.tempo;
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

export function iniciarPartida(dif) {
  const cfg = DIF[dif] || DIF.normal;
  G.dificuldade = dif; G.cfgDif = cfg;
  G.dinheiro = cfg.dinheiro; G.meta = cfg.meta;
  G.tempo = 0; G.dia = 1; G.focos = 0; G.proxFoco = 20; G.infectados = 0;
  G.resgatados = 0; G.civisMortos = 0; G.zumbisMortos = 0; G.perdas = 0;
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
  // docas: na beira d'água mais próxima (só em cidades com costa)
  const docas = COSTA ? acharBeiraMar(G.estr.qg.x, G.estr.qg.z) : null;
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
  let pa;
  if (COSTA) {
    // porta-aviões e escolta
    pa = lugares.portaavioes;
    if (!livre(2, pa.x, pa.z)) pa = pontoLivreProximo(2, pa.x, pa.z) || pa;
    G.porta = criarUnidade('portaavioes', pa.x, pa.z, Math.PI);
    G.porta.fila = [];
    G.porta.deck = 9.2;
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
  // tropas iniciais
  const qs = G.estr.quartel.saida, ps = G.estr.patio.saida;
  const tropas = { fuzileiro: 8, metralhador: 2, sniper: 1, medico: 1 };
  let k = 0;
  for (const t in tropas) for (let i = 0; i < tropas[t]; i++, k++) {
    const p = lugarLivre({ x: qs.x + (k % 4) * 3 - 5, z: qs.z + Math.floor(k / 4) * 3 });
    criarUnidade(t, p.x, p.z, G.baseEixo.ang);
  }
  for (const [t, n] of [['humvee', 2], ['stryker', 1], ['ambulancia', 1]]) for (let i = 0; i < n; i++, k++) {
    const p = lugarLivre({ x: ps.x + (k % 3) * 8 - 8, z: ps.z + (k % 2) * 8 });
    criarUnidade(t, p.x, p.z, G.baseEixo.ang);
  }
  const hp = G.estr.heliporto;
  const bh = criarUnidade('blackhawk', hp.x + G.baseEixo.ax.x * -30, hp.z + G.baseEixo.ax.z * -30, G.baseEixo.ang);
  bh.pousado = true; bh.y = 0;
  const ap = criarUnidade('apache', hp.x, hp.z, G.baseEixo.ang);
  ap.pousado = true;
  // jatos no convés
  const j1 = criarUnidade('f35', pa.x, pa.z, 0); j1.vagaConves = 0; j1.base = G.porta;
  const j2 = criarUnidade('f18', pa.x, pa.z, 0); j2.vagaConves = 1; j2.base = G.porta;
  if (!COSTA) { const j3 = criarUnidade('a10', pa.x, pa.z, 0); j3.vagaConves = 2; j3.base = G.porta; }
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
  fonte.fila.push({ tipo, t: d.tempo, total: d.tempo });
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
      u = criarUnidade(tipo, p.x, p.z, 0);
      u.base = p;
      const usadas = new Set(G.unidades.filter((x) => x.classe === 'jato' && x !== u && x.vivo && (x.base || G.porta) === p).map((x) => x.vagaConves));
      let v = 0; while (usadas.has(v)) v++;
      u.vagaConves = v;
    } else {
      const k = -60 - randi(0, 3) * 25;
      u = criarUnidade(tipo, p.x + Math.sin(p.ang) * k, p.z + Math.cos(p.ang) * k, p.ang, { alt: p.deck });
      u.y = p.deck; u.pousado = true;
    }
  } else if (d.de === 'heliporto') {
    const pads = [[-30, 0], [0, 0], [30, 0], [-15, 32], [15, 32]];
    const [px, pz] = escolher(pads);
    const c = Math.cos(fonte.ang), s = Math.sin(fonte.ang);
    u = criarUnidade(tipo, fonte.x + px * c + pz * s, fonte.z - px * s + pz * c, fonte.ang);
    u.pousado = true;
  } else if (d.de === 'docas') {
    const a = fonte.saidaAgua;
    let p = a;
    if (d.nav === 2) p = pontoLivreProximo(2, a.x, a.z) || a;
    u = criarUnidade(tipo, p.x + rand(-10, 10), p.z + rand(-10, 10), fonte.ang);
  } else {
    const s = fonte.saida || fonte;
    const p = lugarLivre({ x: s.x + rand(-6, 6), z: s.z + rand(-6, 6) });
    u = criarUnidade(tipo, p.x, p.z, G.baseEixo.ang);
  }
  alerta(`${d.icone} ${d.nome} pronto!`, u.x, u.z, 'bom');
  somUI('ok');
  return u;
}

// ---------------- surto ----------------
const FOCOS_NOMES = META.focos || ['bayside'];

function nomePerto(x, z) {
  let n = 'Miami', md = Infinity;
  for (const k in lugares) {
    if (k === 'base' || k === 'heliporto' || k === 'docas' || k === 'portaavioes') continue;
    const d = dist2(x, z, lugares[k].x, lugares[k].z);
    if (d < md) { md = d; n = lugares[k].nome; }
  }
  return n;
}

function novoFoco() {
  G.focos++;
  let cx, cz;
  const civis = G.agentes.filter((a) => a.vivo && !a.zumbi && !a.dentro && a.estado !== 'morto' && dist(a.x, a.z, G.estr.qg.x, G.estr.qg.z) > 700);
  if (G.focos <= 4 && lugares[FOCOS_NOMES[G.focos - 1]]) { const l = lugares[FOCOS_NOMES[G.focos - 1]]; cx = l.x; cz = l.z; }
  else if (civis.length) { const a = escolher(civis); cx = a.x; cz = a.z; }
  else return;
  const n = Math.min(14, 3 + Math.floor(G.focos * 0.8));
  // os civis mais próximos são os primeiros infectados
  const perto = civis.sort((a, b) => dist2(a.x, a.z, cx, cz) - dist2(b.x, b.z, cx, cz)).slice(0, n);
  let feitos = 0;
  for (const a of perto) {
    if (dist(a.x, a.z, cx, cz) > 250) break;
    tornarZumbi(a, G.dia >= 2 && Math.random() < 0.2 ? 'corredor' : 'comum');
    G.infectados++;
    feitos++;
  }
  for (; feitos < n; feitos++) {
    const p = pontoLivreProximo(0, cx + rand(-20, 20), cz + rand(-20, 20));
    if (p) { criarZumbi(p.x, p.z); G.infectados++; G.populacao++; }
  }
  const nome = nomePerto(cx, cz);
  (G.swatPendente || (G.swatPendente = [])).push({ t: G.tempo + 4, x: cx, z: cz, nome });
  alerta(G.focos === 1 ? `☣️ Primeiro caso confirmado em ${nome}! O surto começou.` : `☣️ Novo foco de infecção: ${nome}`, cx, cz, 'surto');
  somUI('alerta');
}

function hordaDeFora() {
  // zumbis chegando de fora da cidade por qualquer borda com terra
  const n = Math.min(30, 6 + G.dia * 4);
  let cx, cz, t = 0;
  do {
    t++;
    const lado = (Math.random() * 4) | 0, k = Math.random();
    cx = lado === 0 ? rand(5, 50) : lado === 1 ? LARG - rand(5, 50) : k * LARG;
    cz = lado === 2 ? rand(5, 50) : lado === 3 ? ALT - rand(5, 50) : k * ALT;
  } while ((!andavel(cx, cz) || dist(cx, cz, G.estr.qg.x, G.estr.qg.z) < 900) && t < 300);
  if (t >= 300) return;
  for (let i = 0; i < n; i++) {
    const p = pontoLivreProximo(0, cx + rand(-30, 30), cz + rand(-30, 30));
    if (p) { const z = criarZumbi(p.x, p.z, G.dia >= 3 && Math.random() < 0.06 ? 'bruto' : G.dia >= 2 && Math.random() < 0.2 ? 'corredor' : 'comum'); z.estado = 'ruido'; const f0 = lugares[FOCOS_NOMES[0]]; z.destino = { x: f0.x, z: f0.z }; }
  }
  enviarSwat(cx, cz, nomePerto(cx, cz));
  alerta(`🧟 Horda de ${n} zumbis chegando de fora da cidade (${nomePerto(cx, cz)})`, cx, cz, 'surto');
  somUI('alerta');
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
  // focos
  if (G.tempo >= G.proxFoco) {
    novoFoco();
    G.proxFoco = G.tempo + Math.max(35, 80 - G.focos * 6) * G.cfgDif.intervalo;
  }
  if (G.dia >= 2) {
    if (!G.proxHorda) G.proxHorda = G.tempo + 30;
    if (G.tempo >= G.proxHorda) { hordaDeFora(); G.proxHorda = G.tempo + Math.max(70, 160 - G.dia * 20) * G.cfgDif.intervalo; }
  }
  if (G.swatPendente) for (let i = G.swatPendente.length - 1; i >= 0; i--) { const q = G.swatPendente[i]; if (G.tempo >= q.t) { G.swatPendente.splice(i, 1); enviarSwat(q.x, q.z, q.nome); } }
  atualizarPolicia(dt);
  atualizarSobreviventes(dt);
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
  // fim de jogo
  if (!G.fim && G.quadro % 30 === 0) {
    const presos = predios.reduce((s, q) => s + (q.base ? 0 : q.civis), 0);
    if (G.resgatados >= G.meta) vitoria(`Você resgatou ${G.resgatados} civis. Miami agradece!`);
    else if (G.focos >= 5 && G.nZumbis === 0 && G.tempo > 300) vitoria('O surto foi contido: não restou nenhum zumbi em Miami!');
    else if (G.focos >= 2 && G.nCivis === 0 && presos === 0) derrota('Não restaram civis para resgatar.');
  }
}

export function vitoria(txt) { G.fim = true; G.pausado = true; G.ui && G.ui.fim(true, txt); }
export function derrota(txt) { if (G.fim) return; G.fim = true; G.pausado = true; G.ui && G.ui.fim(false, txt); }
G.derrota = derrota;
