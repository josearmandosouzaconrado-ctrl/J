// Guerra: EUA contra Rússia e China (aliados). O jogador escolhe a nação no menu; as outras duas são comandadas
// pelo computador: produzem tropas na própria base, juntam grupos e atacam; os aliados do jogador também lutam.
import { G, alerta } from './estado.js';
import { TIPOS, PRODUCAO_N } from './tipos.js';
import { lugares, LARG, ALT, grade, GW, GH, CEL, T, predios, removerPrediosEm } from './mapa.js';
import { pontoLivreProximo } from './caminho.js';
import { rand, escolher, dist, dist2 } from './util.js';
import { somUI } from './som.js';

export const NACOES = {
  eua: { nome: 'EUA', povo: 'americano', bandeira: '🇺🇸', time: 'otan', base: 'Base dos EUA', cor: '#3d8bff',
    farda: [1, 1, 1], calca: [0.95, 0.95, 0.93], colete: [0.62, 0.56, 0.42], capacete: [0.52, 0.48, 0.36] },
  russia: { nome: 'Rússia', povo: 'russo', bandeira: '🇷🇺', time: 'leste', base: 'Base Russa', cor: '#e8483c',
    farda: [0.62, 0.78, 0.5], calca: [0.56, 0.7, 0.45], colete: [0.33, 0.37, 0.24], capacete: [0.3, 0.34, 0.22] },
  china: { nome: 'China', povo: 'chinês', bandeira: '🇨🇳', time: 'leste', base: 'Base Chinesa', cor: '#ffc928',
    farda: [0.52, 0.72, 0.58], calca: [0.48, 0.66, 0.52], colete: [0.27, 0.35, 0.27], capacete: [0.25, 0.32, 0.24] },
};
export const timeDe = (n) => (NACOES[n] ? NACOES[n].time : null);
export function hostis(a, b) { return !!(a && b && a.nacao && b.nacao && timeDe(a.nacao) !== timeDe(b.nacao)); }
export function inimigoDoJogador(u) { return !!(u && u.nacao && timeDe(u.nacao) !== timeDe(G.nacao)); }
export function doJogador(u) { return !!u && u.nacao === G.nacao; }

// ---------------- locais das outras bases ----------------
// escolhidos antes de desenhar a cidade (os prédios do lugar são removidos): terra firme, longe da base do jogador
// e uma da outra. O 1º local (mais longe) fica com o inimigo principal.
export function escolherLocaisBases() {
  const b = lugares.base;
  const terra = (x, z) => {
    const c = Math.floor(z / CEL) * GW + Math.floor(x / CEL);
    return x > 0 && z > 0 && x < LARG && z < ALT && grade[c] !== T.AGUA && grade[c] !== T.PONTE;
  };
  // fração de terra em volta (a base precisa de uns 220 m livres de água)
  const seco = (x, z) => {
    let n = 0, ok = 0;
    for (let r = 40; r <= 220; r += 60) for (let a = 0; a < 6.28; a += 0.5) { n++; if (terra(x + Math.cos(a) * r, z + Math.sin(a) * r)) ok++; }
    return ok / n;
  };
  const cand = [];
  for (let z = 300; z < ALT - 300; z += 160) for (let x = 300; x < LARG - 300; x += 160) {
    if (!terra(x, z)) continue;
    const s = seco(x, z);
    if (s > 0.9) cand.push({ x, z });
  }
  const locais = [];
  // entre 1,6 e 3,5 km da base do jogador (mapas grandes: os ataques precisam chegar em poucos minutos)
  const longe = (p) => {
    const d = dist(p.x, p.z, b.x, b.z);
    if (d > 3500) return 3500 - (d - 3500) * 2;
    return Math.min(d, ...locais.map((q) => dist(p.x, p.z, q.x, q.z) * 1.3));
  };
  for (let k = 0; k < 2; k++) {
    let melhor = null, mv = -1e9;
    for (const p of cand) { if (dist(p.x, p.z, b.x, b.z) < 1600) continue; const v = longe(p); if (v > mv) { mv = v; melhor = p; } }
    if (!melhor) melhor = { x: LARG - b.x, z: ALT - b.z };
    locais.push(melhor);
  }
  // pista de pouso ao lado de cada base (comprimento apontando para a base do jogador), só em terra firme
  for (const l of locais) {
    removerPrediosEm(l.x, l.z, 260);
    l.ang = Math.atan2(b.x - l.x, b.z - l.z);
    const c = Math.cos(l.ang), s = Math.sin(l.ang);
    l.pista = null;
    for (const lado of [-280, 280]) {
      const P = (u, v) => ({ x: l.x + u * c + v * s, z: l.z - u * s + v * c });
      let ok = true;
      for (let v = -170; v <= 170 && ok; v += 34) for (const du of [-22, 0, 22]) { const q = P(lado + du, v); if (!terra(q.x, q.z)) { ok = false; break; } }
      if (!ok) continue;
      l.pista = P(lado, 0);
      for (let v = -170; v <= 170; v += 50) { const q = P(lado, v); removerPrediosEm(q.x, q.z, 40); }
      break;
    }
  }
  G.locaisBases = locais;
  return locais;
}

// ---------------- início da guerra ----------------
const ESTR_BASE = [['qg', 0, 0], ['quartel', -110, -50], ['patio', -110, 60], ['heliporto', 120, 0], ['torre', 0, -130], ['torre', 0, 130], ['torre', 160, 110], ['patriot', 70, -95], ['patriot', -40, 150]];
export function iniciarGuerra(criarEstrutura, criarUnidade, lugarLivre) {
  const ia = Object.keys(NACOES).filter((n) => n !== G.nacao);
  // o inimigo principal fica no local mais longe; o aliado do jogador (ou o 2º inimigo) no outro
  const ordem = ia.sort((a, b) => (hostisN(b, G.nacao) ? 1 : 0) - (hostisN(a, G.nacao) ? 1 : 0));
  G.ia = {};
  G.bases = {};
  ordem.forEach((n, i) => {
    const l = G.locaisBases[i] || G.locaisBases[0];
    const ang = Math.atan2(b0().x - l.x, b0().z - l.z);   // virada para a base do jogador
    const c = Math.cos(ang), s = Math.sin(ang);
    const L = (u, v) => ({ x: l.x + u * c + v * s, z: l.z - u * s + v * c });
    const estr = {};
    for (const [tipo, u, v] of ESTR_BASE) {
      const p = lugarLivre(L(u, v));
      const e = criarEstrutura(tipo, p.x, p.z, ang, n);
      if (tipo !== 'torre' && tipo !== 'patriot') estr[tipo] = e;
    }
    if (l.pista) {
      const e = criarEstrutura('pista', l.pista.x, l.pista.z, ang, n);
      e.deck = 0.3; e.fila = [];
      estr.pista = e;
    }
    for (const k of ['quartel', 'patio']) { const e = estr[k]; e.saida = lugarLivre({ x: e.x + Math.sin(ang) * 45, z: e.z + Math.cos(ang) * 45 }); }
    G.bases[n] = { x: l.x, z: l.z, ang, estr, nome: `${NACOES[n].base}` };
    G.ia[n] = { dinheiro: 1500, prox: 3, onda: 0, proxOnda: (G.dificuldade === 'facil' ? 300 : G.dificuldade === 'dificil' ? 150 : 210) + i * 60, grupos: [] };
    // tropas iniciais
    const tropas = PRODUCAO_N[n];
    const inf = tropas.quartel, vei = tropas.patio;
    for (let k = 0; k < 10; k++) { const p = lugarLivre({ x: estr.quartel.saida.x + rand(-12, 12), z: estr.quartel.saida.z + rand(-12, 12) }); criarUnidade(k < 7 ? inf[0] : k < 9 ? inf[1] : inf[2], p.x, p.z, ang, { nacao: n }); }
    for (let k = 0; k < 3; k++) { const p = lugarLivre({ x: estr.patio.saida.x + rand(-15, 15), z: estr.patio.saida.z + rand(-15, 15) }); criarUnidade(vei[k === 2 ? 2 : 0], p.x, p.z, ang, { nacao: n }); }
  });
  G.abates = 0;
}
function hostisN(a, b) { return timeDe(a) !== timeDe(b); }
function b0() { return G.estr.qg || lugares.base; }

// ---------------- comandante do computador ----------------
// produz conforme o dinheiro, junta grupos de ataque e manda para a base inimiga mais próxima;
// cada unidade em missão para para lutar quando aparece inimigo no alcance e depois segue.
const RENDA = { facil: 5, normal: 8, dificil: 13, sandbox: 8 };
export function atualizarGuerra(dt) {
  if (!G.ia || G.pausaIA) return;
  for (const n in G.ia) {
    const ia = G.ia[n], base = G.bases[n];
    if (!base.estr.qg || !base.estr.qg.vivo) continue;
    const inimiga = hostisN(n, G.nacao);
    ia.dinheiro += (inimiga ? RENDA[G.dificuldade] || 10 : 8) * dt;
    ia.prox -= dt;
    if (ia.prox <= 0) { ia.prox = 2; produzirIA(n, ia, base); }
    ia.proxJato = (ia.proxJato ?? 60) - dt;
    if (ia.proxJato <= 0) { ia.proxJato = G.dificuldade === 'dificil' ? 40 : 60; ataqueAereo(n, base); }
    ia.proxOnda -= dt;
    if (ia.proxOnda <= 0) { ataque(n, ia, base); ia.proxOnda = Math.max(70, 150 - ia.onda * 8) * (G.dificuldade === 'facil' ? 1.4 : G.dificuldade === 'dificil' ? 0.75 : 1); }
  }
  // unidades em missão (de todas as nações do computador)
  G._tMissao = (G._tMissao || 0) - dt;
  if (G._tMissao > 0) return;
  G._tMissao = 0.6;
  for (const u of G.unidades) {
    if (!u.vivo || u.estr || u.dentro || u.nacao === G.nacao || !u.missao) continue;
    if (u.classe === 'jato') continue;
    const alc = (u.d.alcance || 60) * 1.05;
    let perto = null;
    G.hashU.busca(u.x, u.z, alc, (v) => { if (!perto && v.vivo && !v.dentro && hostis(u, v) && (v.classe !== 'jato')) perto = v; });
    if (perto && u.classe !== 'aereo') {
      // para e luta
      if (u.ordem && u.ordem.tipo === 'mover') { u.ordem = null; u.caminho = null; }
      continue;
    }
    const m = u.missao;
    if (dist(u.x, u.z, m.x, m.z) < 45) { u.missao = proximoAlvo(u) || null; if (!u.missao) continue; }
    if (!u.ordem) G.ordenarMover([u], u.missao.x + rand(-15, 15), u.missao.z + rand(-15, 15));
  }
}

function produzirIA(n, ia, base) {
  const P = PRODUCAO_N[n];
  const meus = G.unidades.filter((u) => u.vivo && u.nacao === n && !u.estr);
  if (meus.length > (G.dificuldade === 'dificil' ? 70 : 55)) return;
  const nInf = meus.filter((u) => u.classe === 'inf').length, nVei = meus.filter((u) => u.classe === 'veic').length, nAer = meus.filter((u) => u.classe === 'aereo').length;
  const pede = (fonte, tipo) => {
    const e = base.estr[fonte], d = TIPOS[tipo];
    if (!e || !e.vivo || e.fila.length >= 2 || ia.dinheiro < d.custo) return false;
    ia.dinheiro -= d.custo;
    e.fila.push({ tipo, t: d.tempo * 1.1, total: d.tempo * 1.1 });
    return true;
  };
  // jatos (a partir da 2ª onda): junta dinheiro para eles antes de gastar com o resto
  const nJat = meus.filter((u) => u.classe === 'jato').length + (base.estr.pista && base.estr.pista.vivo ? base.estr.pista.fila.length : 0);
  if (P.pista && base.estr.pista && base.estr.pista.vivo && ia.onda >= 2 && nJat < (G.dificuldade === 'dificil' ? 3 : 2)) {
    if (!pede('pista', P.pista[Math.random() < 0.5 ? 0 : 1]) && ia.dinheiro < 1700 && nInf > 8) return;
  }
  // proporção: muita infantaria, alguns blindados e poucos helicópteros (mais pesados a cada onda)
  const r = Math.random();
  const inf = r < 0.6 ? P.quartel[0] : r < 0.82 ? P.quartel[1] : r < 0.93 ? P.quartel[2] : P.quartel[3];
  if (nInf < nVei * 3 + 6) pede('quartel', inf);
  const pesado = Math.min(3, Math.floor(ia.onda / 2) + (Math.random() < 0.35 ? 1 : 0));
  if (nVei * 3 < nInf + 2) pede('patio', P.patio[Math.min(P.patio.length - 1, pesado)]);
  if (ia.onda >= 1 && nAer < 1 + Math.floor(ia.onda / 3) && Math.random() < 0.3) pede('heliporto', P.heliporto[Math.random() < 0.65 ? 0 : 1]);
}

// jatos parados na pista saem para atacar o grupo inimigo mais perto da base (ou uma estrutura)
function ataqueAereo(n, base) {
  for (const j of G.unidades) {
    if (!j.vivo || j.nacao !== n || j.classe !== 'jato' || j.estadoJato !== 'pronto' || j.municao <= 0) continue;
    let melhor = null, md = 3800 * 3800;
    for (const v of G.unidades) {
      if (!v.vivo || v.dentro || !hostisN(n, v.nacao) || v.classe === 'jato' || (v.classe === 'aereo' && v.y > 8)) continue;
      const d = dist2(v.x, v.z, base.x, base.z) * (v.estr ? 1.3 : 1);
      if (d < md) { md = d; melhor = v; }
    }
    if (melhor) {
      G.ordenarMover([j], melhor.x, melhor.z);
      if (hostisN(n, G.nacao)) alerta(`✈️ Jato inimigo ${NACOES[n].bandeira} ${j.d.nome} decolando para atacar!`, melhor.x, melhor.z, 'surto');
    }
  }
}

// manda as unidades paradas (menos alguns defensores) atacar
function ataque(n, ia, base) {
  const livres = G.unidades.filter((u) => u.vivo && u.nacao === n && !u.estr && !u.dentro && !u.missao && u.classe !== 'jato' && u.classe !== 'naval' && !(u.d.cura));
  const defesa = Math.min(6, Math.floor(livres.length * 0.25));
  livres.sort((a, b) => dist2(a.x, a.z, base.x, base.z) - dist2(b.x, b.z, base.x, base.z));
  // ondas crescem aos poucos (as unidades que sobram ficam defendendo a base)
  const max = (G.dificuldade === 'facil' ? 6 : G.dificuldade === 'dificil' ? 12 : 9) + ia.onda * (G.dificuldade === 'dificil' ? 6 : 4);
  const vao = livres.slice(defesa).slice(-max);
  if (vao.length < 5) return;
  const alvo = alvoPrincipal(n, base);
  if (!alvo) return;
  ia.onda++;
  for (const u of vao) u.missao = { x: alvo.x, z: alvo.z };
  const qtd = vao.length;
  if (hostisN(n, G.nacao)) {
    alerta(`⚠️ Ataque ${NACOES[n].bandeira} ${NACOES[n].nome}: ${qtd} unidades avançando para ${alvo.nome || 'a sua base'}!`, vao[0].x, vao[0].z, 'surto');
    somUI('alerta');
  } else {
    alerta(`${NACOES[n].bandeira} Aliados (${NACOES[n].nome}) atacando com ${qtd} unidades`, vao[0].x, vao[0].z, 'info');
  }
}

// alvo do grupo: a estrutura inimiga mais perto (de preferência o quartel-general)
function alvoPrincipal(n, base) {
  let melhor = null, md = Infinity;
  for (const u of G.unidades) {
    if (!u.vivo || !u.estr || !hostisN(n, u.nacao)) continue;
    const d = dist2(u.x, u.z, base.x, base.z) * (u.tipoEstr === 'qg' ? 0.8 : 1);
    if (d < md) { md = d; melhor = u; }
  }
  return melhor ? { x: melhor.x, z: melhor.z, nome: melhor.d.nome } : null;
}
function proximoAlvo(u) {
  let melhor = null, md = 1500 * 1500;
  for (const v of G.unidades) {
    if (!v.vivo || v.dentro || !hostis(u, v)) continue;
    if (!v.estr && v.classe === 'jato') continue;
    const d = dist2(u.x, u.z, v.x, v.z) * (v.estr ? 0.7 : 1);
    if (d < md) { md = d; melhor = v; }
  }
  return melhor ? { x: melhor.x, z: melhor.z } : null;
}

// fim de jogo: vitória quando todos os quartéis-generais inimigos caem
export function qgDestruido(u) {
  if (u.nacao === G.nacao) { G.derrota && G.derrota(`O seu Quartel-General ${NACOES[G.nacao].bandeira} foi destruído.`); return; }
  if (!hostisN(u.nacao, G.nacao)) { alerta(`💥 O quartel-general aliado (${NACOES[u.nacao].nome}) caiu!`, u.x, u.z, 'ruim'); return; }
  alerta(`🏆 Quartel-General ${NACOES[u.nacao].bandeira} ${NACOES[u.nacao].nome} destruído!`, u.x, u.z, 'bom');
  const restam = G.unidades.some((v) => v.vivo && v.estr && v.tipoEstr === 'qg' && hostisN(v.nacao, G.nacao));
  if (!restam) G.vitoria && G.vitoria(`Todas as bases inimigas foram destruídas. ${NACOES[G.nacao].bandeira} ${NACOES[G.nacao].nome} vence a batalha de ${G.nomeCidade || 'cidade'}!`);
}

// sandbox: grupo inimigo onde a câmera está, e limpar inimigos
export function ataqueSandbox(x, z) {
  const n = Object.keys(NACOES).find((k) => hostisN(k, G.nacao));
  const P = PRODUCAO_N[n];
  let k = 0;
  for (let i = 0; i < 14; i++) {
    const p = pontoLivreProximo(0, x + rand(-30, 30), z + rand(-30, 30));
    if (p) { G.criarUnidade(i < 10 ? P.quartel[0] : i < 12 ? P.quartel[1] : P.patio[1 + (i % 2)], p.x, p.z, 0, { nacao: n }); k++; }
  }
  alerta(`⚔️ ${k} unidades ${NACOES[n].bandeira} criadas`, x, z, 'surto');
}
export function limparInimigos() {
  let k = 0;
  for (const u of G.unidades) if (u.vivo && !u.estr && inimigoDoJogador(u)) { G.removerUnidade(u); k++; }
  alerta(`🧹 ${k} unidades inimigas removidas`, null, null, 'bom');
}
