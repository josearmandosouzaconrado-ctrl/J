// Unidades militares: movimento, combate, transporte, guarnição de prédios e resgate
import * as THREE from 'three';
import { G, alerta } from './estado.js';
import { TIPOS, ESTRUTURAS } from './tipos.js';
import { criarModelo, criarAnel } from './modelos.js';
import { queimar, matQueimado } from './abrams.js';
import { andavel, predios, dentroPoligono, CEL, cel, predioId, agua as ehAgua, esmagarCarros, QUAL } from './mapa.js';
import { acharCaminho, livre, pontoLivreProximo } from './caminho.js';
import { rand, clamp, angDif, girarPara, dist, dist2 } from './util.js';
import { somTiro, somExplosao, somUI, somVidro, somEsmagar } from './som.js';
import { criarCivilSeguindo, danoAgente } from './agentes.js';
import { hostis, doJogador, inimigoDoJogador, qgDestruido, NACOES } from './guerra.js';

const ARMAS_COR = { fuzil: [1, 0.9, 0.5], mg: [1, 0.8, 0.4], sniper: [1, 1, 0.8], pistola: [1, 0.9, 0.5], '50cal': [1, 0.7, 0.3], '25mm': [1, 0.6, 0.2], '30mm': [1, 0.6, 0.2], m134: [1, 0.45, 0.2], m240: [1, 0.7, 0.3] };
const RUIDO = { fuzil: 110, pistola: 70, mg: 140, sniper: 160, '50cal': 200, '25mm': 260, '30mm': 260, m134: 220, m240: 160, '120mm': 450, '155mm': 500, naval: 500, foguete: 450, hellfire: 450, bomba: 600 };

export function modoNav(u) {
  if (u.classe === 'naval') return u.d.nav;
  return 0;
}

// ---------------- criação ----------------
export function criarUnidade(tipo, x, z, ang = 0, opts = {}) {
  const d = TIPOS[tipo];
  const u = {
    id: G.idSeq++, tipo, d, classe: d.classe, x, z, y: 0, ang, hp: d.hp, hpMax: d.hp,
    caminho: null, wp: 0, destino: null, ordem: null, alvo: null, cd: rand(0, 0.5), cd2: rand(0, 1), busca: rand(0, 0.4),
    passageiros: [], cargaUsada: 0, dentro: null, predio: null, vivo: true, sel: false, fase: rand(0, 6), mirando: 0,
    alt: 0, altAlvo: 0, torreAng: 0, travado: 0, salva: d.salva || 0, recarga: 0, municao: d.municao || 0,
    estadoJato: 'pronto', vx: 0, vz: 0, velAtual: 0, repath: 0, ultimaPos: { x, z }, cura: 0,
    nacao: opts.nacao || d.nacao || G.nacao,
  };
  if (d.modelo) {
    u.m = criarModelo(d.modelo);
    G.cena.add(u.m.grupo);
  }
  if (u.classe === 'aereo') { u.alt = opts.alt ?? 0; u.altAlvo = u.alt; }
  if (u.classe === 'jato') { u.estadoJato = 'pronto'; u.alt = 9.5; }
  G.unidades.push(u);
  posicionarModelo(u, 0);
  return u;
}

export function removerUnidade(u) {
  u.vivo = false;
  if (u.sombra) { G.cena.remove(u.sombra); u.sombra = null; }
  if (u.corda) { G.cena.remove(u.corda); u.corda = null; }
  if (u.m) G.cena.remove(u.m.grupo);
  if (u.anel) { G.cena.remove(u.anel); u.anel = null; }
  const i = G.selecao.indexOf(u);
  if (i >= 0) G.selecao.splice(i, 1);
}

// ---------------- utilidades ----------------
// contorno do convoo do USS Enterprise (coordenadas locais: proa = +Z, boreste/ilha = -X)
const CONVES = { pts: [15, 166, -17.5, 166, -19, 109, -26, 107, -26, 88, -22, 75, -37.5, 67, -37.5, -148, -22, -150, -21, -166, 17, -166, 39, -157, 42, 60, 22.5, 83, 17.5, 112] };
// vagas de helicóptero/Osprey no convoo: popa a boreste e a bombordo, longe da pista angulada
const PADS_PORTA = [[-27, -114], [-27, -136], [30, -150], [30, -126], [30, -102]];
export function padPorta(p, i) {
  if (!(p.m && p.m.def.real)) return pontoBase(p, 0, -60 - (i % 4) * 25);
  // mais aeronaves que vagas: as extras ficam ao lado, um pouco para dentro do convoo
  const [lx, lz] = PADS_PORTA[i % PADS_PORTA.length], volta = Math.floor(i / PADS_PORTA.length) % 2;
  return pontoBase(p, lx - Math.sign(lx) * volta * 10, lz);
}
// primeira vaga do convoo sem aeronave pousada nem reservada por outra que está a caminho
export function padLivre(p, eu = null) {
  for (let i = 0; i < 12; i++) {
    const q = padPorta(p, i);
    const ocupada = G.unidades.some((u) => u !== eu && u.vivo && u.classe === 'aereo' && !u.dentro &&
      ((u.ordem && u.ordem.tipo === 'pousarPorta' && u.ordem.pad === i) || (u.pousado && dist2(u.x, u.z, q.x, q.z) < 64)));
    if (!ocupada) return i;
  }
  return 0;
}
export function chaoEm(x, z) {
  const p = G.porta;
  if (p && p.vivo && p.tipo === 'portaavioes') {
    const dx = x - p.x, dz = z - p.z, c = Math.cos(-p.ang), s = Math.sin(-p.ang);
    const lx = dx * c + dz * s, lz = -dx * s + dz * c;
    if (p.m && p.m.def.real ? dentroPoligono(CONVES, lx, lz) : Math.abs(lx) < 34 && Math.abs(lz) < 158) return p.deck ?? 9.2;
  }
  const c = cel(x, z);
  if (c >= 0 && predioId[c] >= 0) return predios[predioId[c]].h;
  return 0;
}

export function naZonaSegura(x, z, y = 0) {
  for (const e of G.abrigos || []) {
    if (!e.vivo || e.construindo > 0) continue;
    const r = e.tipoEstr === 'zona' ? 170 : e.tipoEstr === 'fob' ? 110 : 120;
    if (dist2(x, z, e.x, e.z) < r * r) return true;
  }
  const p = G.porta;
  if (p && p.vivo && (y > 7 || p.aerodromo) && dist2(x, z, p.x, p.z) < 170 * 170) return true;
  return false;
}

export function volEm(x, z) {
  if (!G.camAlvo) return 0;
  const d = Math.hypot(x - G.camAlvo.x, z - G.camAlvo.z) + G.camDist * 0.6;
  return clamp(1 - d / 1400, 0, 1);
}

function ruido(x, z, r) {
  G.ruidos.push({ x, z, r: r * (G.noite ? 1.2 : 1), t: G.tempo });
}

// ---------------- ordens ----------------
export function ordenar(unids, ordem) {
  for (const u of unids) {
    if (!u.vivo || u.estr) continue;
    if (u.dentro) continue;
    u.ordem = Object.assign({}, ordem);
    u.alvo = null;
    u.caminho = null;
    u.repath = 0;
    if (u.predio && (ordem.tipo === 'mover' || ordem.tipo === 'embarcar' || ordem.tipo === 'guarnecer')) sairDoPredio(u);
  }
}

export function ordenarMover(unids, x, z) {
  const lista = unids.filter((u) => u.vivo && !u.dentro && !u.estr);
  if (!lista.length) return;
  // jatos: ataque no ponto
  const jatos = lista.filter((u) => u.classe === 'jato');
  for (const j of jatos) ordenarJato(j, x, z);
  const resto = lista.filter((u) => u.classe !== 'jato');
  // formação em grade ao redor do ponto
  const n = resto.length, lado = Math.ceil(Math.sqrt(n));
  resto.sort((a, b) => dist2(a.x, a.z, x, z) - dist2(b.x, b.z, x, z));
  resto.forEach((u, i) => {
    const esp = Math.max(4, u.d.raio * 2.6);
    const ox = ((i % lado) - (lado - 1) / 2) * esp, oz = (Math.floor(i / lado) - (lado - 1) / 2) * esp;
    let tx = x + ox, tz = z + oz;
    if (u.predio) sairDoPredio(u);
    u.ordem = { tipo: 'mover', x: tx, z: tz };
    u.alvo = null;
    u.caminho = null;
    u.repath = 0;
    if (u.classe === 'aereo') { u.altAlvo = u.d.altCruz; u.pousado = false; }
  });
}

function ordenarJato(j, x, z) {
  if (j.estadoJato === 'rearmando') { alerta(`${j.d.nome} está sendo rearmado`, j.x, j.z); return; }
  if (j.estadoJato === 'pousando') { alerta(`${j.d.nome} está pousando`, j.x, j.z); return; }
  j.ordem = { tipo: 'ataque', x, z };
  if (j.estadoJato === 'pronto') {
    // vai para a catapulta / cabeceira da pista e decola
    const p = baseDo(j);
    if (!p) { alerta(`${j.d.nome} está sem pista de pouso`, j.x, j.z, 'ruim'); return; }
    const gb = geoBase(p);
    const q = pontoBase(p, gb.dx, gb.d0);
    j.x = q.x; j.z = q.z; j.y = (p.deck ?? 9.2) + 0.2; j.ang = p.ang;
    j.velAtual = ehPorta(p) ? 15 : 0;
    j.estadoJato = 'decolando'; j.lancou = false; j.saidaPt = null;
    if (j.m) j.m.grupo.visible = true;
  } else if (j.estadoJato !== 'decolando') j.estadoJato = 'voando';
  j.passe = 0;
}

// bombardeio de área: faixa de (x0,z0) até (x1,z1) com largura w; cada passada despeja a carga ao longo dela
export function ordenarAreaJatos(jatos, x0, z0, x1, z1, w) {
  jatos.forEach((j, i) => {
    if (j.estadoJato === 'rearmando' || j.estadoJato === 'pousando') { alerta(`${j.d.nome} está pousando/rearmando`, j.x, j.z); return; }
    ordenarJato(j, (x0 + x1) / 2, (z0 + z1) / 2);
    // jatos em sequência: o segundo faz a faixa no sentido contrário
    const inv = i % 2 === 1;
    j.ordem = { tipo: 'area', ax: inv ? x1 : x0, az: inv ? z1 : z0, bx: inv ? x0 : x1, bz: inv ? z0 : z1, w, fase: 'aprox', soltas: 0, deslocamento: (i - (jatos.length - 1) / 2) * Math.min(25, w / 3) };
  });
}

function jatoArea(u, o, dt) {
  const d = u.d;
  const dx = o.bx - o.ax, dz = o.bz - o.az, L = Math.max(1, Math.hypot(dx, dz)), ux = dx / L, uz = dz / L;
  const px = -uz * o.deslocamento, pz = ux * o.deslocamento;
  let tx, tz, alt = d.arma === 'canhao' ? 45 : d.arma === 'bomba' ? 130 : 80;
  if (o.fase === 'aprox') {
    tx = o.ax - ux * 900 + px; tz = o.az - uz * 900 + pz;
    alt = d.altCruz;
    if (dist(u.x, u.z, tx, tz) < 220) o.fase = 'alinhar';
  } else if (o.fase === 'alinhar') {
    tx = o.ax + px; tz = o.az + pz;
    if (dist(u.x, u.z, tx, tz) < 120 || ((u.x - o.ax) * ux + (u.z - o.az) * uz) > -30) { o.fase = 'corrida'; o.soltas = 0; }
  } else {
    tx = o.bx + ux * 500 + px; tz = o.bz + uz * 500 + pz;
    // posição ao longo da faixa
    const t = (u.x - o.ax) * ux + (u.z - o.az) * uz;
    const n = d.arma === 'canhao' ? 40 : d.arma === 'bomba' ? (d.bombas ? 8 : 6) : 10;
    const esp = L / n;
    // a bomba cai um pouco à frente: compensa
    const queda = d.arma === 'canhao' ? 170 : d.arma === 'bomba' ? u.velAtual * 0.6 * Math.sqrt(2 * u.y / 9.8) * 0.5 : 120;
    while (o.soltas < n && t + queda >= o.soltas * esp + esp / 2) {
      const at = Math.min(L, o.soltas * esp + esp / 2);
      const lat = rand(-o.w / 2, o.w / 2);
      const bx = o.ax + ux * at - uz * lat + px * 0.3, bz = o.az + uz * at + ux * lat + pz * 0.3;
      if (d.arma === 'canhao') {
        G.efeitos.tracante(u.x + Math.sin(u.ang) * 9, u.y - 0.4, u.z + Math.cos(u.ang) * 9, bx, 0.5, bz, [1, 0.55, 0.2]);
        explodir(bx, 0.3, bz, d.splash, d.dano, u, true);
        if (o.soltas === 0) somTiro('gau8', volEm(u.x, u.z));
      } else if (d.arma === 'bomba') lancarProjetil(u.x, u.y, u.z, bx, bz, { arma: 'bomba', dano: d.dano, splash: d.splash, precisao: 1 }, u);
      else lancarProjetil(u.x, u.y - 1, u.z, bx, bz, { arma: 'foguete', dano: d.dano, splash: d.splash, precisao: 1, missil: true }, u);
      o.soltas++;
      if (o.soltas === 1) { ruido(o.ax, o.az, 700); }
      if (d.arma !== 'canhao') somTiro(d.arma === 'bomba' ? 'bomba' : 'foguete', volEm(u.x, u.z));
    }
    if (t > L + 450) {
      u.municao--;
      if (u.municao <= 0) { u.estadoJato = 'voltando'; u.ordem = null; alerta(`${d.nome} lançou toda a carga, voltando ao porta-aviões`, u.x, u.z); }
      else {
        // próxima passada no sentido contrário
        const a0x = o.ax, a0z = o.az;
        o.ax = o.bx; o.az = o.bz; o.bx = a0x; o.bz = a0z; o.fase = 'aprox'; o.deslocamento = -o.deslocamento;
      }
    }
  }
  return { tx, tz, alt };
}

// ---------------- prédios ----------------
export function pontoEntrada(p, deX, deZ) {
  // ponto andável perto do prédio, do lado de quem chega
  const dx = deX - p.cx, dz = deZ - p.cz, L = Math.hypot(dx, dz) || 1;
  for (let r = p.raio * 0.5; r < p.raio + 60; r += CEL * 0.7) {
    for (const off of [0, 0.4, -0.4, 0.8, -0.8, 1.4, -1.4, 2.2, -2.2, 3.1]) {
      const a = Math.atan2(dx / L, dz / L) + off;
      const x = p.cx + Math.sin(a) * r, z = p.cz + Math.cos(a) * r;
      if (andavel(x, z)) return { x, z };
    }
  }
  return { x: p.cx, z: p.cz };
}

function posTelhado(p, k) {
  const n = Math.max(4, p.cap);
  const a = (k / n) * Math.PI * 2 + 0.3;
  for (let f = 0.7; f > 0.05; f -= 0.15) {
    const x = p.cx + Math.sin(a) * p.raio * f, z = p.cz + Math.cos(a) * p.raio * f;
    if (dentroPoligono(p, x, z)) return { x, z };
  }
  return { x: p.cx + rand(-1, 1), z: p.cz + rand(-1, 1) };
}

// janela: um ponto na parede, num andar, com o soldado debruçado para fora
function posJanela(p, k) {
  const n = p.pts.length / 2;
  const andares = Math.max(1, Math.floor((p.h - 3) / 3.4));
  for (let tent = 0; tent < 12; tent++) {
    const i = (k * 5 + tent * 3 + p.id) % n, j = (i + 1) % n;
    const ax = p.pts[i * 2], az = p.pts[i * 2 + 1], bx = p.pts[j * 2], bz = p.pts[j * 2 + 1];
    const ex = bx - ax, ez = bz - az, len = Math.hypot(ex, ez);
    if (len < 4) continue;
    const t = 0.2 + ((k * 0.37 + tent * 0.21) % 0.6);
    const nx = -ez / len, nz = ex / len;
    const andar = 1 + ((k + tent) % Math.min(andares, 6));
    const y = Math.min(p.h - 2.6, andar * 3.4 + 0.2);
    const x = ax + ex * t + nx * 0.28, z = az + ez * t + nz * 0.28;
    // não usa janela que dá de cara com outro prédio
    if (predioEmXZ(x + nx * 3, z + nz * 3)) continue;
    return { x, z, y, nx, nz };
  }
  return null;
}
function predioEmXZ(x, z) { const c = cel(x, z); return c >= 0 && predioId[c] >= 0; }

export function entrarNoPredio(u, p) {
  if (p.guarnicao.length >= p.cap) { alerta(`Prédio cheio (${p.cap} soldados)`, p.cx, p.cz); return false; }
  p.guarnicao.push(u);
  u.predio = p;
  const k = p.guarnicao.length - 1;
  // metade nas janelas (atirando pelo vidro), metade no telhado
  const jan = p.h > 6 && k % 2 === 0 ? posJanela(p, k) : null;
  if (jan) {
    u.x = jan.x; u.z = jan.z; u.y = jan.y;
    u.janela = { nx: jan.nx, nz: jan.nz, ang: Math.atan2(jan.nx, jan.nz), quebrou: false };
    u.ang = u.janela.ang;
  } else {
    const pos = posTelhado(p, k);
    u.x = pos.x; u.z = pos.z; u.y = p.h;
    u.janela = null;
  }
  u.ordem = null; u.caminho = null;
  if (p.integridade <= 0) p.integridade = 30;
  if (p.sos && p.civis > 0) resgatarDoPredio(p, u);
  return true;
}

export function sairDoPredio(u) {
  const p = u.predio;
  if (!p) return;
  p.guarnicao = p.guarnicao.filter((x) => x !== u);
  const e = pontoEntrada(p, u.x + rand(-5, 5), u.z + rand(-5, 5));
  u.x = e.x + rand(-2, 2); u.z = e.z + rand(-2, 2); u.y = 0;
  if (!andavel(u.x, u.z)) { u.x = e.x; u.z = e.z; }
  u.predio = null;
  u.janela = null;
}

export function resgatarDoPredio(p, lider) {
  if (!p.civis) return;
  const e = pontoEntrada(p, lider.x, lider.z);
  const n = p.civis;
  for (let i = 0; i < n; i++) criarCivilSeguindo(e.x + rand(-3, 3), e.z + rand(-3, 3), lider);
  p.civis = 0; p.sos = false;
  alerta(`${n} civis saíram do prédio e estão seguindo suas tropas!`, p.cx, p.cz, 'bom');
  somUI('resgate');
}

// ---------------- transporte ----------------
export function categoriaCarga(u) {
  if (u.classe === 'inf') return 'inf';
  if (u.classe === 'veic') return u.d.leve ? 'leve' : 'veic';
  return null;
}
export function cabe(t, u) {
  if (!t.d.carga || t === u) return false;
  const cat = categoriaCarga(u);
  if (!cat) return false;
  const tipos = t.d.cargaTipos;
  if (!(tipos.includes(cat) || (cat === 'leve' && tipos.includes('veic')))) return false;
  return t.cargaUsada + (u.d.slots || 1) <= t.d.carga;
}
export function vagas(t) { return (t.d.carga || 0) - t.cargaUsada; }
export function acessivel(t) {
  if (t.classe === 'aereo') return t.pousado;
  return true;
}

export function embarcar(u, t) {
  if (!cabe(t, u)) return false;
  u.dentro = t;
  t.passageiros.push(u);
  t.cargaUsada += u.d.slots || 1;
  if (u.predio) sairDoPredio(u);
  if (u.m) u.m.grupo.visible = false;
  if (u.anel) { G.cena.remove(u.anel); u.anel = null; }
  const i = G.selecao.indexOf(u);
  if (i >= 0) { G.selecao.splice(i, 1); u.sel = false; }
  u.ordem = null; u.caminho = null;
  // quem segue o soldado vai junto
  return true;
}

export function embarcarCivil(a, t) {
  if (vagas(t) < 1) return false;
  a.dentro = t;
  t.passageiros.push(a);
  t.cargaUsada += 1;
  return true;
}

export function desembarcar(t) {
  if (!t.passageiros.length) return;
  if (t.classe === 'aereo' && !t.pousado) {
    t.ordem = { tipo: 'pousar', desembarcar: true };
    return;
  }
  const seguro = naZonaSegura(t.x, t.z, t.y);
  let k = 0;
  for (const p of t.passageiros.slice()) {
    if (p.agente) {
      if (seguro) continue; // entregues em entregarCivis
    }
    let x = t.x, z = t.z;
    for (let tent = 0; tent < 30; tent++) {
      const a = k * 0.9 + tent * 0.5, r = t.d.raio + 2 + tent * 0.8 + (k % 4);
      const nx = t.x + Math.sin(a) * r, nz = t.z + Math.cos(a) * r;
      if (andavel(nx, nz)) { x = nx; z = nz; break; }
    }
    k++;
    t.passageiros.splice(t.passageiros.indexOf(p), 1);
    t.cargaUsada -= p.agente ? 1 : (p.d.slots || 1);
    p.dentro = null;
    p.x = x; p.z = z; p.y = 0;
    if (p.agente) { p.estado = 'seguir'; p.lider = t; p.espera = 6; }
    else if (p.m) p.m.grupo.visible = true;
  }
  if (seguro) entregarCivis(t);
}

export function entregarCivis(t) {
  let n = 0;
  for (const p of t.passageiros.slice()) {
    if (!p.agente) continue;
    t.passageiros.splice(t.passageiros.indexOf(p), 1);
    t.cargaUsada -= 1;
    p.vivo = false; p.resgatado = true; p.dentro = null;
    n++;
  }
  if (n) {
    G.resgatados += n;
    G.dinheiro += n * 40;
    alerta(`✅ ${n} civis resgatados! (+$${n * 40})`, t.x, t.z, 'bom');
    somUI('resgate');
  }
}

// ---------------- combate ----------------
// alvo válido: unidade ou estrutura viva do time inimigo, fora de prédios/veículos
function alvoValido(a, u) { return !!(a && a.vivo && !a.dentro && (!u || hostis(u, a))); }

// classes de arma: leves (fuzis e metralhadoras), médias (canhões 20-30 mm) e pesadas (canhão de tanque, mísseis...)
const PENETRA = { explosao: 0.7, fuzil: 0.04, pistola: 0.02, sniper: 0.15, mg: 0.05, m240: 0.06, m134: 0.07, '50cal': 0.35, '25mm': 0.6, '30mm': 0.62, canhao: 0.85 };
function penetracao(w) { return PENETRA[w.arma] ?? 1; }
// dano que passa pela blindagem do alvo
export function fatorBlindagem(alvo, w) {
  // estruturas: paredes grossas, só caem com fogo pesado e insistente
  if (alvo.estr) return w.arma === 'explosao' ? 0.5 : Math.max(0.02, penetracao(w) - 0.3) * 0.6;   // metralhadora quase não arranha
  const b = alvo.d.blindagem || 0;
  return 1 - b * (1 - penetracao(w));
}
// a arma consegue atingir esse alvo? (artilharia e canhão de tanque não acertam aeronave no ar; antitanque não mira em soldado)
function podeAtingir(w, v) {
  const noAr = (v.classe === 'aereo' || v.classe === 'jato') && v.y > 6;
  if (v.classe === 'jato' && noAr) return !!w.antiaereo;
  if (noAr && (w.arco || w.arma === '120mm' || w.arma === 'bomba' || w.arma === 'naval' || w.arma === '155mm' || w.arma === 'foguete')) return false;
  if (w.antitanque && v.classe === 'inf') return false;
  if (w.soAereo && !noAr) return false;   // antiaérea só mira aeronaves voando
  return true;
}
// procura o melhor alvo inimigo no alcance: armas leves preferem soldados, pesadas preferem blindados
function acharAlvo(u, alcance, splash, minAlc = 0, w = u.d || {}) {
  const ox = u.x, oz = u.z, min2 = minAlc * minAlc;
  const pen = penetracao(w), jn = u.janela;
  if (!splash || splash < 8) {
    let melhor = null, mv = Infinity;
    G.hashU.busca(ox, oz, alcance, (v, d2) => {
      if (!v.vivo || v.dentro || !hostis(u, v) || d2 < min2 || !podeAtingir(w, v)) return;
      if (jn && (v.x - ox) * jn.nx + (v.z - oz) * jn.nz < Math.sqrt(d2) * 0.25) return;
      const blind = v.estr ? 0.6 : (v.d.blindagem || 0);
      // custo: distância, mais caro se a arma quase não fere esse alvo
      let c = d2 * (1 + blind * (1 - pen) * 6);
      if (pen >= 0.9 && v.classe === 'inf') c *= 2.5;
      if (v.estr) c *= 1.8;
      if (c < mv) { mv = c; melhor = v; }
    });
    return melhor;
  }
  // armas de área (artilharia, foguetes, bombas): o maior grupo de inimigos sem tropas amigas perto
  const cand = [];
  G.hashU.busca(ox, oz, alcance, (v, d2) => {
    if (v.vivo && !v.dentro && hostis(u, v) && d2 >= min2 && podeAtingir(w, v)) { cand.push(v); if (cand.length > 60) return true; }
  });
  if (!cand.length) return null;
  let melhor = null, mv = 0;
  for (let i = 0; i < cand.length; i += cand.length > 30 ? 2 : 1) {
    const a = cand[i];
    let ini = 0, amigos = 0;
    G.hashU.busca(a.x, a.z, splash + 4, (v) => { if (!v.vivo || v.dentro || v.classe === 'jato' || (v.classe === 'aereo' && v.y > 8)) return; if (hostis(u, v)) ini += v.classe === 'inf' ? 1 : 3; else amigos++; });
    if (amigos > 0) continue;
    if (ini > mv) { mv = ini; melhor = a; }
  }
  return melhor;
}

function posArma(u) {
  if (u.m && u.m.def.canoZ !== undefined && u.m.torre) {
    const a = u.ang + u.torreAng, d = u.m.def;
    const zz = d.torreZ, cz = d.canoZ;
    return {
      x: u.x + Math.sin(u.ang) * zz + Math.sin(a) * cz,
      y: u.y + d.torreY + d.canoY,
      z: u.z + Math.cos(u.ang) * zz + Math.cos(a) * cz,
    };
  }
  if (u.m && u.m.def.armaZ) return { x: u.x + Math.sin(u.ang) * u.m.def.armaZ, y: u.y + u.m.def.armaY, z: u.z + Math.cos(u.ang) * u.m.def.armaZ };
  if (u.classe === 'aereo') return { x: u.x + Math.sin(u.ang) * 2, y: u.y + 1.5, z: u.z + Math.cos(u.ang) * 2 };
  return { x: u.x + Math.sin(u.ang) * 0.7, y: u.y + 1.25, z: u.z + Math.cos(u.ang) * 0.7 };
}

function atirar(u, alvo, w) {
  const o = posArma(u);
  const ax = alvo.x, az = alvo.z, ay = (alvo.y || 0) + 1.1;
  const d = Math.hypot(ax - u.x, az - u.z);
  const ef = G.efeitos;
  const vol = volEm(u.x, u.z);
  ruido(u.x, u.z, RUIDO[w.arma] || 150);
  if (u.janela && !u.janela.quebrou) {
    u.janela.quebrou = true;
    for (let i = 0; i < 14; i++) ef.particula(u.x, u.y + 1.3, u.z, u.janela.nx * rand(1, 3) + rand(-1, 1), rand(0, 2), u.janela.nz * rand(1, 3) + rand(-1, 1), 0.18, 1.2, [0.8, 0.92, 1], [0.6, 0.75, 0.85], 0.9, 9.8, 0);
    somVidro(vol);
  }
  if (w.arma === 'sam') {
    // míssil antiaéreo: sobe deixando rastro de fumaça e explode no ar junto do alvo
    const acertou = Math.random() < w.precisao;
    const tx = ax + (acertou ? 0 : rand(-12, 12)), ty = ay + (acertou ? 0 : rand(-6, 6)), tz = az + (acertou ? 0 : rand(-12, 12));
    for (let k = 0; k <= 14; k++) {
      const f = k / 14;
      ef.particula(o.x + (tx - o.x) * f, o.y + (ty - o.y) * f + Math.sin(f * Math.PI) * 25, o.z + (tz - o.z) * f, rand(-0.5, 0.5), 0.5, rand(-0.5, 0.5), 2.2, 2.2 + f, [0.92, 0.92, 0.9], [0.6, 0.6, 0.6], 0.55, -0.2, 2);
    }
    ef.clarao(o.x, o.y, o.z, 3);
    G.efeitos.explosao(tx, ty, tz, 5);
    if (acertou) danoUnidade(alvo, w.dano, u);
    somTiro('hellfire', vol);
    return;
  }
  if (w.missil || w.arma === '120mm' || w.arco || w.arma === 'foguete' || w.antitanque) {
    const fx = ax + rand(-1, 1) * (1 - w.precisao) * 12, fz = az + rand(-1, 1) * (1 - w.precisao) * 12;
    lancarProjetil(o.x, o.y, o.z, fx, fz, w, u);
    ef.clarao(o.x, o.y, o.z, w.arma === '120mm' ? 4 : 2.5);
    for (let i = 0; i < 4; i++) ef.fumaca(o.x, o.y, o.z, 2.5);
    somTiro(w.arma, vol);
    return;
  }
  const chance = w.precisao * (1 - (d / (w.alcance * 1.3)) * 0.4) * (G.noite ? 0.85 : 1);
  const acerto = Math.random() < chance;
  const cor = ARMAS_COR[w.arma] || [1, 0.85, 0.4];
  ef.clarao(o.x, o.y, o.z, w.arma === 'fuzil' || w.arma === 'pistola' ? 0.9 : 1.5);
  if (acerto) {
    ef.tracante(o.x, o.y, o.z, ax, ay, az, cor);
    if (w.splash) explodir(ax, (alvo.y || 0) + 0.5, az, w.splash, w.dano, u, true);
    else danoUnidade(alvo, w.dano * fatorBlindagem(alvo, w), u);
  } else {
    ef.tracante(o.x, o.y, o.z, ax + rand(-3, 3), ay + rand(-1, 1), az + rand(-3, 3), cor);
  }
  somTiro(w.arma, vol);
}

export function lancarProjetil(x, y, z, tx, tz, w, dono) {
  const d = Math.hypot(tx - x, tz - z);
  let vel = w.arma === '120mm' ? 900 : w.arco ? 260 : w.arma === 'bomba' ? 0 : w.missil ? 140 : 200;
  const p = {
    x0: x, y0: y, z0: z, tx, tz, t: 0, x, y, z,
    dur: w.arma === 'bomba' ? Math.sqrt(2 * Math.max(5, y) / 9.8) : Math.max(0.12, d / vel),
    arco: w.arco ? Math.min(400, d * 0.35) : w.missil ? Math.min(60, d * 0.12) : w.arma === 'foguete' ? d * 0.08 : 0,
    dano: w.dano, raio: w.splash || 3, arma: w.arma, dono, rastro: w.arma !== '120mm',
    vx: dono && dono.classe === 'jato' ? Math.sin(dono.ang) * dono.velAtual * 0.6 : 0,
    vz: dono && dono.classe === 'jato' ? Math.cos(dono.ang) * dono.velAtual * 0.6 : 0,
  };
  if (w.arma === 'bomba') { p.tx = x + p.vx * p.dur; p.tz = z + p.vz * p.dur; p.tx = tx; p.tz = tz; }
  G.projeteis.push(p);
}

export function atualizarProjeteis(dt) {
  const ef = G.efeitos;
  for (let i = G.projeteis.length - 1; i >= 0; i--) {
    const p = G.projeteis[i];
    p.t += dt;
    const k = Math.min(1, p.t / p.dur);
    const px = p.x, py = p.y, pz = p.z;
    p.x = p.x0 + (p.tx - p.x0) * k;
    p.z = p.z0 + (p.tz - p.z0) * k;
    if (p.arma === 'bomba') p.y = p.y0 * (1 - k * k);
    else p.y = p.y0 + (0.5 - p.y0) * k + Math.sin(k * Math.PI) * p.arco;
    if (p.rastro) ef.esteira(px, py, pz);
    ef.particula(p.x, p.y, p.z, 0, 0, 0, p.arma === 'naval' || p.arma === '155mm' ? 1.2 : 0.9, 0.05, [1, 0.9, 0.6], [1, 0.6, 0.2], 1);
    if (k >= 1) {
      explodir(p.x, 0.5, p.z, p.raio, p.dano, p.dono, false);
      G.projeteis.splice(i, 1);
    }
  }
}

export function explodir(x, y, z, raio, dano, dono, pequeno) {
  const agua = ehAgua(x, z) && chaoEm(x, z) === 0;
  if (!pequeno || raio > 2) G.efeitos.explosao(x, y, z, raio * 0.8, agua);
  else G.efeitos.particula(x, y, z, 0, 2, 0, raio, 0.3, [1, 0.8, 0.3], [0.4, 0.4, 0.4], 1, 0, raio);
  if (raio >= 6) somExplosao(volEm(x, z), raio >= 15);
  ruido(x, z, raio >= 6 ? 500 : 200);
  const r2 = raio * raio;
  G.hashA.busca(x, z, raio * 1.3, (a, d2) => {
    if (!a.vivo || a.dentro) return;
    const f = d2 < r2 ? 1 - Math.sqrt(d2) / raio * 0.6 : 0.25;
    danoAgente(a, dano * f * 0.5, dono);
  });
  // unidades e estruturas inimigas de quem atirou (sem fogo amigo); blindagem segura parte da explosão
  G.hashU.busca(x, z, raio * 1.3 + 6, (v, d2) => {
    if (!v.vivo || v.dentro || (dono && !hostis(dono, v))) return;
    if ((v.classe === 'aereo' || v.classe === 'jato') && Math.abs((v.y || 0) - y) > raio + 3) return;
    const r = raio + (v.estr ? v.d.raio * 0.6 : v.d.raio || 0.6);
    if (d2 > r * r * 1.69) return;
    const f = d2 < r * r ? 1 - Math.sqrt(d2) / r * 0.5 : 0.3;
    danoUnidade(v, dano * f * fatorBlindagem(v, { arma: 'explosao' }), dono);
  });
  if (G.tremor !== undefined && raio >= 10) G.tremor = Math.max(G.tremor, Math.min(1, raio / 30) * volEm(x, z));
}

// ---------------- atualização ----------------
export function atualizarUnidades(dt) {
  for (let i = G.unidades.length - 1; i >= 0; i--) {
    const u = G.unidades[i];
    if (!u.vivo) { G.unidades.splice(i, 1); continue; }
    if (u.estr) { atualizarEstrutura(u, dt); continue; }
    if (u.dentro) { u.x = u.dentro.x; u.z = u.dentro.z; u.y = u.dentro.y; if (u.dentro.d.cura && u.hp < u.hpMax) u.hp = Math.min(u.hpMax, u.hp + u.dentro.d.cura * dt); continue; }
    u.fase += dt * (u.velAtual > 0.3 ? u.velAtual * 1.6 : 0);
    if (u.mirando > 0) u.mirando -= dt;
    switch (u.classe) {
      case 'inf': atualizarInfantaria(u, dt); break;
      case 'veic': atualizarTerrestre(u, dt); break;
      case 'naval': atualizarNaval(u, dt); break;
      case 'aereo': atualizarAereo(u, dt); break;
      case 'jato': atualizarJato(u, dt); break;
    }
    if (u.classe !== 'jato') combate(u, dt);
    if (u.d.carga) atualizarTransporte(u, dt);
    posicionarModelo(u, dt);
  }
}

function seguirOrdem(u, dt) {
  const o = u.ordem;
  if (!o) return null;
  if (o.tipo === 'mover') return { x: o.x, z: o.z, fim: () => { u.ordem = null; } };
  if (o.tipo === 'atacar') {
    if (!alvoValido(o.alvo, u)) { u.ordem = null; return null; }
    u.alvo = o.alvo;
    const al = (u.d.alcance || 50) * 0.85;
    if (dist(u.x, u.z, o.alvo.x, o.alvo.z) < al) return null;
    return { x: o.alvo.x, z: o.alvo.z, dinamico: true };
  }
  if (o.tipo === 'guarnecer') {
    const p = o.predio;
    if (!o.e) o.e = pontoEntrada(p, u.x, u.z);
    if (dist(u.x, u.z, o.e.x, o.e.z) < 7) { entrarNoPredio(u, p); return null; }
    return { x: o.e.x, z: o.e.z };
  }
  if (o.tipo === 'resgatar') {
    const p = o.predio;
    if (!p.sos || p.civis <= 0) { u.ordem = null; return null; }
    if (!o.e) o.e = pontoEntrada(p, u.x, u.z);
    if (dist(u.x, u.z, o.e.x, o.e.z) < 9 || dist(u.x, u.z, p.cx, p.cz) < p.raio + 12) { resgatarDoPredio(p, u); u.ordem = null; return null; }
    return { x: o.e.x, z: o.e.z };
  }
  if (o.tipo === 'embarcar') {
    const t = o.t;
    if (!t.vivo || !cabe(t, u)) { u.ordem = null; return null; }
    const d = dist(u.x, u.z, t.x, t.z);
    if (d < t.d.raio + 6) {
      if (acessivel(t)) { embarcar(u, t); return null; }
      if (t.classe === 'aereo' && (!t.ordem || t.ordem.tipo !== 'pousar')) t.ordem = { tipo: 'pousar' };
      return null;
    }
    return { x: t.x, z: t.z, dinamico: true };
  }
  return null;
}

// movimento por caminho (terra/água)
function andarCaminho(u, dt, alvo, vel, modo) {
  if (!alvo) { u.velAtual = 0; return; }
  const chegada = Math.max(2.5, u.d.raio * 1.5);
  if (dist(u.x, u.z, alvo.x, alvo.z) < chegada) {
    u.velAtual = 0; u.caminho = null;
    if (alvo.fim) alvo.fim();
    return;
  }
  u.repath -= dt;
  if ((!u.caminho || alvo.dinamico || (u.caminhoAlvo && dist(u.caminhoAlvo.x, u.caminhoAlvo.z, alvo.x, alvo.z) > 15)) && u.repath <= 0) {
    if (G.orcamentoCaminhos <= 0) { if (!u.caminho) u.velAtual = 0; if (!u.caminho) return; }
    else {
    // grupos que vão para o mesmo lugar reaproveitam o caminho do primeiro
    const c = G.cacheCam || (G.cacheCam = []);
    let ach = null;
    for (const e of c) {
      if (e.modo === modo && G.tempo - e.t < 4 && dist(e.sx, e.sz, u.x, u.z) < 45 && dist(e.ex, e.ez, alvo.x, alvo.z) < 45) { ach = e; break; }
    }
    if (ach) {
      u.caminho = ach.pts.slice(0, -1).concat([{ x: alvo.x, z: alvo.z }]);
    } else {
      G.orcamentoCaminhos--;
      u.caminho = acharCaminho(modo, u.x, u.z, alvo.x, alvo.z, G.limiteCaminho || 40000);
      if (u.caminho && !u.caminho.parcial) { c.push({ modo, sx: u.x, sz: u.z, ex: alvo.x, ez: alvo.z, pts: u.caminho, t: G.tempo }); if (c.length > 20) c.shift(); }
    }
    u.caminhoAlvo = { x: alvo.x, z: alvo.z };
    u.wp = 0; u.repath = 2.5;
    if (!u.caminho) { u.ordem = null; u.velAtual = 0; return; }
    }
  }
  if (!u.caminho) { u.velAtual = 0; return; }
  let w = u.caminho[u.wp];
  if (!w) { const parcial = u.caminho && u.caminho.parcial; u.caminho = null; u.velAtual = 0; if (alvo.fim && !parcial) alvo.fim(); else u.repath = parcial ? 0 : 1.2; return; }
  const ult = u.wp === u.caminho.length - 1;
  if (dist(u.x, u.z, w.x, w.z) < (ult ? chegada : Math.max(4, u.d.raio * 2))) {
    u.wp++;
    w = u.caminho[u.wp];
    if (!w) { const parcial = u.caminho && u.caminho.parcial; u.caminho = null; u.velAtual = 0; if (alvo.fim && !parcial) alvo.fim(); else u.repath = parcial ? 0 : 1.2; return; }
  }
  const angAlvo = Math.atan2(w.x - u.x, w.z - u.z);
  const giro = u.classe === 'inf' ? 10 : u.classe === 'naval' ? (u.d.raio > 20 ? 0.25 : 0.9) : 2.2;
  u.ang = girarPara(u.ang, angAlvo, giro * dt);
  const alin = Math.max(0.15, Math.cos(angDif(u.ang, angAlvo)));
  const v = vel * alin;
  u.velAtual = v;
  mover(u, Math.sin(u.ang) * v * dt, Math.cos(u.ang) * v * dt, modo);
}

function podePisar(u, x, z, modo) {
  if (modo === 0) return andavel(x, z);
  if (modo === 3) return andavel(x, z) || livre(1, x, z);
  return livre(modo, x, z);
}

function mover(u, dx, dz, modo) {
  const nx = u.x + dx, nz = u.z + dz;
  if (podePisar(u, nx, nz, modo)) { u.x = nx; u.z = nz; }
  else if (Math.abs(dx) > Math.hypot(dx, dz) * 0.25 && podePisar(u, u.x + dx, u.z, modo)) u.x += dx;
  else if (Math.abs(dz) > Math.hypot(dx, dz) * 0.25 && podePisar(u, u.x, u.z + dz, modo)) u.z += dz;
  else {
    // tenta contornar girando o passo; se ficar preso muito tempo, passa assim mesmo
    let ok = false;
    for (const a of [0.6, -0.6, 1.2, -1.2]) {
      const c = Math.cos(a), sn = Math.sin(a), rx = dx * c - dz * sn, rz = dx * sn + dz * c;
      if (podePisar(u, u.x + rx, u.z + rz, modo)) { u.x += rx; u.z += rz; ok = true; break; }
    }
    if (!ok) {
      u.travado += 0.1;
      if (u.travado > 1.5 && (modo === 0 || modo === 3)) { u.x = nx; u.z = nz; }
    }
  }
  // destrava
  u.checa = (u.checa || 0) + 0.016;
  if (u.checa > 1.2) {
    u.checa = 0;
    if (dist(u.x, u.z, u.ultimaPos.x, u.ultimaPos.z) < 1 && u.velAtual > 0.5) { u.caminho = null; u.repath = 0; u.travado++; }
    else u.travado = 0;
    if (u.travado > 4) { u.ordem = null; u.caminho = null; u.travado = 0; }
    u.ultimaPos.x = u.x; u.ultimaPos.z = u.z;
  }
}

function separar(u, dt) {
  G.hashU.busca(u.x, u.z, u.d.raio * 2 + 1, (o, d2) => {
    if (o === u || !o.vivo || o.dentro || o.predio || o.classe !== u.classe || o.estr) return;
    const min = u.d.raio + o.d.raio;
    if (d2 < min * min && d2 > 0.0001) {
      const d = Math.sqrt(d2), f = (min - d) / d * 0.5 * Math.min(1, dt * 8);
      const dx = (u.x - o.x) * f, dz = (u.z - o.z) * f;
      if (podePisar(u, u.x + dx, u.z + dz, modoNav(u))) { u.x += dx; u.z += dz; }
    }
  });
}

export function soltarCorda(t, p, lado) {
  t.passageiros.splice(t.passageiros.indexOf(p), 1);
  t.cargaUsada -= p.d.slots || 1;
  p.dentro = null;
  const rx = Math.cos(t.ang), rz = -Math.sin(t.ang);
  p.x = t.x + rx * lado * 1.3 + Math.sin(t.ang) * 1.2; p.z = t.z + rz * lado * 1.3 + Math.cos(t.ang) * 1.2;
  p.y = t.y + 1.2; p.ang = t.ang + lado * Math.PI / 2;
  p.rapel = { chao: chaoEm(p.x, p.z) };
  p.ordem = null; p.caminho = null; p.velAtual = 0;
}

function atualizarInfantaria(u, dt) {
  if (u.rapel) {
    // deslizando pela corda
    u.y -= 7.5 * dt; u.velAtual = 0; u.fase += dt * 4;
    if (u.y <= u.rapel.chao + 0.05) {
      const ch = u.rapel.chao;
      u.y = ch; u.rapel = null;
      if (ch > 1) {
        // caiu num telhado: ocupa o prédio (janelas/telhado); se estiver cheio, desce pela escada
        const c0 = cel(u.x, u.z), pr = c0 >= 0 && predioId[c0] >= 0 ? predios[predioId[c0]] : null;
        if (pr && !entrarNoPredio(u, pr)) { const e = pontoEntrada(pr, u.x, u.z); u.x = e.x; u.z = e.z; u.y = 0; }
        else if (!pr) u.y = 0;
      }
      G.efeitos.poeira(u.x, u.z, 2);
    }
    return;
  }
  if (G.controlando === u) { controleDireto(u, dt); return; }
  if (u.predio) { u.velAtual = 0; return; }
  const alvo = seguirOrdem(u, dt);
  // soldado parado atira; andando não
  andarCaminho(u, dt, alvo, u.d.vel * (G.noite ? 0.95 : 1), 0);
  separar(u, dt);
  if (u.d.cura) {
    u.cura -= dt;
    if (u.cura <= 0) {
      u.cura = 1;
      G.hashU.busca(u.x, u.z, 14, (o) => { if (o.vivo && o.classe === 'inf' && !o.dentro && o.hp < o.hpMax) o.hp = Math.min(o.hpMax, o.hp + u.d.cura); });
    }
  }
}

function atualizarTerrestre(u, dt) {
  if (G.controlando === u) { controleDireto(u, dt); }
  else {
    const alvo = seguirOrdem(u, dt);
    andarCaminho(u, dt, alvo, u.d.vel, 0);
  }
  separar(u, dt);
  if (u.velAtual > 3) {
    if (Math.random() < dt * 4) G.efeitos.poeira(u.x - Math.sin(u.ang) * u.d.raio, u.z - Math.cos(u.ang) * u.d.raio, 1);
    if (u.d.raio >= 3.4) {
      u.tEsm = (u.tEsm || 0) - dt;
      if (u.tEsm <= 0) {
        u.tEsm = 0.25;
        if (esmagarCarros(u.x, u.z, u.d.raio + 0.8)) { somEsmagar(volEm(u.x, u.z)); G.efeitos.poeira(u.x, u.z, 4); }
      }
    }
    if (u.d.atropela) {
      G.hashU.busca(u.x, u.z, u.d.raio + 0.6, (v) => {
        if (v.vivo && !v.dentro && v.classe === 'inf' && hostis(u, v)) danoUnidade(v, 200 * dt * u.velAtual / 8, u);
      });
    }
  }
}

function atualizarNaval(u, dt) {
  if (G.controlando === u) controleDireto(u, dt);
  else {
    const alvo = seguirOrdem(u, dt);
    andarCaminho(u, dt, alvo, u.d.vel, modoNav(u));
  }
  if (u.velAtual > 2 && Math.random() < dt * 6) {
    const r = u.d.raio * 1.2;
    G.efeitos.particula(u.x - Math.sin(u.ang) * r + rand(-2, 2), 0.4, u.z - Math.cos(u.ang) * r + rand(-2, 2), 0, 0.5, 0, u.d.raio * 0.25, 2.5, [0.95, 0.97, 1], [0.7, 0.8, 0.9], 0.5, 0, u.d.raio * 0.15);
  }
  u.y = u.tipo === 'lcac' ? 0.4 : 0;
  // hovercraft entrando na praia/terra
  if (u.tipo === 'lcac' && Math.random() < dt * 5) G.efeitos.particula(u.x + rand(-8, 8), 0.5, u.z + rand(-8, 8), 0, 1, 0, 3, 1.0, [0.9, 0.9, 0.95], [0.8, 0.8, 0.8], 0.35, 0, 3);
}

function atualizarAereo(u, dt) {
  const d = u.d;
  const o = u.ordem;
  let alvo = null;
  if (G.controlando === u) { controleDireto(u, dt); }
  else if (o) {
    if (o.tipo === 'pousar') {
      const ch = chaoEm(u.x, u.z);
      const sobreAgua = ehAgua(u.x, u.z) && ch === 0;
      if (sobreAgua) {
        const p = pontoLivreProximo(0, u.x, u.z);
        if (p) { u.ordem = { tipo: 'mover', x: p.x, z: p.z, pousar: true, desembarcar: o.desembarcar }; }
        else u.ordem = null;
      } else {
        u.altAlvo = ch;
        if (u.y <= ch + 0.3) {
          u.pousado = true;
          if (o.desembarcar) { u.ordem = null; desembarcar(u); }
          else u.ordem = null;
          if (naZonaSegura(u.x, u.z, u.y)) entregarCivis(u);
        }
      }
    } else if (o.tipo === 'mover') {
      alvo = { x: o.x, z: o.z };
      if (dist(u.x, u.z, o.x, o.z) < 3) {
        if (o.pousar) u.ordem = { tipo: 'pousar', desembarcar: o.desembarcar };
        else u.ordem = null;
        if (d.orbita) u.orbita = { x: o.x, z: o.z };
      }
    } else if (o.tipo === 'resgatar') {
      const p = o.predio;
      alvo = { x: p.cx, z: p.cz };
      if (dist(u.x, u.z, p.cx, p.cz) < Math.max(4, p.raio * 0.5)) {
        u.altAlvo = p.h + 6;
        alvo = null;
        if (u.y < p.h + 9) {
          if (d.carga && p.civis > 0) {
            let n = 0;
            while (p.civis > 0 && vagas(u) >= 1) { const a = criarCivilSeguindo(p.cx, p.cz, u); embarcarCivil(a, u); p.civis--; n++; }
            if (n) { alerta(`🚁 ${n} civis embarcaram pelo telhado!`, p.cx, p.cz, 'bom'); somUI('resgate'); }
            if (p.civis <= 0) p.sos = false;
            else alerta(`Helicóptero cheio! Ainda há ${p.civis} civis no telhado`, p.cx, p.cz);
          }
          u.ordem = null;
          u.altAlvo = d.altCruz;
        }
      } else u.altAlvo = Math.max(d.altCruz, p.h + 15);
    } else if (o.tipo === 'atacar') {
      if (!alvoValido(o.alvo, u)) u.ordem = null;
      else { u.alvo = o.alvo; if (dist(u.x, u.z, o.alvo.x, o.alvo.z) > d.alcance * 0.7) alvo = { x: o.alvo.x, z: o.alvo.z }; }
    } else if (o.tipo === 'corda') {
      // voa até o ponto, para no ar ~14 m acima do chão (ou do telhado) e os soldados descem pelas cordas
      if (!o.pairando && dist(u.x, u.z, o.x, o.z) > 4) {
        alvo = { x: o.x, z: o.z };
        u.altAlvo = Math.max(d.altCruz, chaoEm(o.x, o.z) + 22);
      } else {
        o.pairando = true;
        // freia e se mantém em cima do ponto (corrige o vento/inércia)
        u.velAtual *= Math.max(0, 1 - dt * 6);
        const kk = Math.min(1, dt * 1.5);
        u.x += (o.x - u.x) * kk; u.z += (o.z - u.z) * kk;
        u.altAlvo = Math.max(chaoEm(u.x, u.z), chaoEm(u.x + Math.cos(u.ang) * 1.3, u.z - Math.sin(u.ang) * 1.3), chaoEm(u.x - Math.cos(u.ang) * 1.3, u.z + Math.sin(u.ang) * 1.3)) + 14;
        if (Math.abs(u.y - u.altAlvo) < 1.5 && u.velAtual < 3 && dist(u.x, u.z, o.x, o.z) < 3) {
          o.t = (o.t || 0) - dt;
          if (o.t <= 0) {
            o.t = 0.75;
            const p = u.passageiros.find((q) => !q.agente);
            if (!p) {
              u.ordem = null; u.altAlvo = d.altCruz;
              alerta('🪢 Todos os soldados desceram de corda', u.x, u.z, 'bom');
            } else { o.lado = -(o.lado || 1); soltarCorda(u, p, o.lado); }
          }
        }
      }
    } else if (o.tipo === 'pousarPorta') {
      const p = G.porta;
      alvo = padPorta(p, o.pad ?? 0);
      // freia sobre a vaga e só então desce (senão passa direto e pousa longe dela)
      if (dist(u.x, u.z, alvo.x, alvo.z) < 3 && u.velAtual < 6) { u.x = alvo.x; u.z = alvo.z; u.velAtual = 0; u.ordem = { tipo: 'pousar', desembarcar: false }; alvo = null; }
    } else if (o.tipo === 'embarcar') {
      // helicóptero não embarca em nada
      u.ordem = null;
    }
  }
  // drone em órbita
  if (d.orbita && !alvo && u.orbita && !(o && o.tipo === 'pousar')) {
    u.orbAng = (u.orbAng || 0) + dt * d.vel / d.orbita;
    alvo = { x: u.orbita.x + Math.sin(u.orbAng) * d.orbita, z: u.orbita.z + Math.cos(u.orbAng) * d.orbita };
  }
  if (alvo) {
    if (u.pousado) { u.pousado = false; }
    if (u.altAlvo < d.altCruz * 0.6 && !(o && o.tipo === 'resgatar')) u.altAlvo = d.altCruz;
    const subindo = u.y < Math.min(u.altAlvo, chaoEm(u.x, u.z) + 12) - 1;
    const angA = Math.atan2(alvo.x - u.x, alvo.z - u.z);
    u.ang = girarPara(u.ang, angA, (d.orbita ? 0.8 : 2.0) * dt);
    const dd = dist(u.x, u.z, alvo.x, alvo.z);
    const v = (subindo ? d.vel * 0.15 : d.vel) * Math.min(1, dd / 40 + 0.15) * Math.max(0.2, Math.cos(angDif(u.ang, angA)));
    u.velAtual += (v - u.velAtual) * Math.min(1, dt * 1.5);
    if (o && o.tipo === 'pousarPorta') u.velAtual = Math.min(u.velAtual, dd * 0.9 + 1.5);
    u.x += Math.sin(u.ang) * u.velAtual * dt;
    u.z += Math.cos(u.ang) * u.velAtual * dt;
  } else if (!(G.controlando === u)) {
    u.velAtual *= Math.max(0, 1 - dt * 2);
    u.x += Math.sin(u.ang) * u.velAtual * dt;
    u.z += Math.cos(u.ang) * u.velAtual * dt;
  }
  // altitude
  const ch = chaoEm(u.x, u.z);
  if (!u.pousado) {
    let alvoY = u.altAlvo;
    if (alvo || (o && o.tipo !== 'pousar')) alvoY = Math.max(alvoY, ch + (o && o.tipo === 'resgatar' && !alvo ? 4 : 10));
    u.y += clamp(alvoY - u.y, -8 * dt, 10 * dt);
    if (u.y < ch) u.y = ch;
  } else u.y = ch;
  u.alt = u.y;
  // separação entre aeronaves
  G.hashU.busca(u.x, u.z, 30, (o2, d2) => {
    if (o2 === u || o2.classe !== 'aereo' || !o2.vivo || o2.dentro) return;
    const min = (u.d.raio + o2.d.raio) * 1.1;
    if (d2 < min * min && d2 > 0.01 && !u.pousado) { const dd = Math.sqrt(d2), f = (min - dd) / dd * dt * 2; u.x += (u.x - o2.x) * f; u.z += (u.z - o2.z) * f; }
  });
}

// ponto no referencial da base aérea (porta-aviões ou pista): lx lateral, lz ao longo do eixo
function pontoBase(p, lx, lz) {
  const c = Math.cos(p.ang), s = Math.sin(p.ang);
  return { x: p.x + lx * c + lz * s, z: p.z - lx * s + lz * c };
}
function baseDo(u) { const b = u.base; return b && b.vivo ? b : G.porta; }
function ehPorta(p) { return p.tipo === 'portaavioes'; }
// geometria da pista em cada tipo de base: decolagem, toque e vagas
function geoBase(p) {
  if (ehPorta(p) && p.m && p.m.def.real) {
    // USS Enterprise: catapulta de proa, pouso na pista angulada (8,6° para bombordo) e vagas a boreste
    return { dx: 7, d0: 62, d1: 168, td: -100, tx: 3.4, angP: 0.15, frear: 30, vaga: (k) => [-29 + (k % 2) * 12, -62 + (k % 9) * 14] };
  }
  return ehPorta(p)
    ? { dx: 6, d0: 20, d1: 160, td: -110, tx: 0, angP: 0, frear: 30, vaga: (k) => [-24 + (k % 2) * 10, 40 + k * 22] }
    : { dx: 0, d0: -140, d1: 80, td: -130, tx: 0, angP: 0, frear: 11, vaga: (k) => [-40 + (k % 2) * 10, 25 + k * 18] };
}

function atualizarJato(u, dt) {
  const d = u.d, p = baseDo(u);
  if (!p) return;
  const gb = geoBase(p), deck = (p.deck ?? 9.2) + 0.2;
  const ax = Math.sin(p.ang), az = Math.cos(p.ang);
  u.vy = 0;
  if (u.estadoJato === 'pronto' || u.estadoJato === 'rearmando') {
    const [lx, lz] = gb.vaga(u.vagaConves ?? 0);
    const q = pontoBase(p, lx, lz);
    u.x = q.x; u.z = q.z; u.y = deck; u.ang = p.ang + Math.PI * 0.75;
    u.velAtual = 0; u.banco = 0;
    if (u.estadoJato === 'rearmando') {
      u.rearme -= dt;
      if (u.rearme <= 0) { u.estadoJato = 'pronto'; u.municao = d.municao; u.hp = u.hpMax; alerta(`${d.nome} rearmado e pronto`, u.x, u.z); }
    }
    return;
  }
  if (u.estadoJato === 'decolando') {
    // corrida pela catapulta / pista, depois sobe
    const vMax = d.vel * 0.42;
    u.velAtual = Math.min(vMax, u.velAtual + (ehPorta(p) ? 28 : 16) * dt);
    u.ang = p.ang;
    u.x += ax * u.velAtual * dt; u.z += az * u.velAtual * dt;
    const lz = (u.x - p.x) * ax + (u.z - p.z) * az;
    if (lz > gb.d1) { u.y += 14 * dt; u.vy = 14; } else u.y = deck;
    if (u.y > deck + 25) u.estadoJato = 'voando';
    if (Math.random() < dt * 40) G.efeitos.particula(u.x - ax * 9, u.y + 0.5, u.z - az * 9, rand(-2, 2), 1, rand(-2, 2), 2, 0.8, [0.85, 0.85, 0.85], [0.7, 0.7, 0.7], 0.4, 0, 3);
    return;
  }
  if (u.estadoJato === 'pousando') {
    // toque e frenagem (cabo de parada no porta-aviões, freio na pista)
    u.velAtual = Math.max(0, u.velAtual - gb.frear * dt);
    u.ang = p.ang + gb.angP; u.y = deck; u.banco = 0;
    u.x += Math.sin(u.ang) * u.velAtual * dt; u.z += Math.cos(u.ang) * u.velAtual * dt;
    if (u.velAtual < 3) { u.estadoJato = 'rearmando'; u.rearme = 18; u.ordem = null; }
    return;
  }
  // em voo
  const o = u.ordem;
  let tx, tz, alvoAlt = d.altCruz, vAlvo = d.vel, giro = 0.9;
  if (u.estadoJato === 'aproximando') {
    // planeio alinhado com a pista até o ponto de toque
    const t = pontoBase(p, gb.tx, gb.td);
    const dd = dist(u.x, u.z, t.x, t.z);
    tx = t.x; tz = t.z;
    alvoAlt = deck + Math.min(90, dd * 0.07);
    vAlvo = Math.max(65, d.vel * 0.32);
    giro = 1.2;
    // já passou do ponto de toque, alinhado com a pista (angulada no porta-aviões)
    const lax = Math.sin(p.ang + gb.angP), laz = Math.cos(p.ang + gb.angP);
    const ll = (u.x - t.x) * lax + (u.z - t.z) * laz, lat = Math.abs((u.x - t.x) * laz - (u.z - t.z) * lax);
    if (dd < 30 || (ll > 0 && ll < 120 && lat < 25)) {
      u.estadoJato = 'pousando'; u.y = deck;
      G.efeitos.poeira(u.x, u.z, 3);
      somEsmagar(volEm(u.x, u.z) * 0.6);
      return;
    }
    if (dd > 2500) u.estadoJato = 'voltando';
  } else if (u.estadoJato === 'voltando' || !o) {
    // vai até o início da aproximação, atrás da base
    u.estadoJato = 'voltando';
    const a = pontoBase(p, gb.tx - Math.sin(gb.angP) * 1300, gb.td - Math.cos(gb.angP) * 1300);
    tx = a.x; tz = a.z;
    if (dist(u.x, u.z, a.x, a.z) < 700) alvoAlt = deck + 100;
    if (dist(u.x, u.z, a.x, a.z) < 180) u.estadoJato = 'aproximando';
  } else if (o.tipo === 'area') {
    const r = jatoArea(u, o, dt);
    tx = r.tx; tz = r.tz; alvoAlt = r.alt;
  } else {
    tx = o.x; tz = o.z;
    const dd = dist(u.x, u.z, tx, tz);
    const canhao = d.arma === 'canhao';
    // depois de cada passada, segue em frente e só então volta alinhado para outra
    if (u.lancou && !u.saidaPt) u.saidaPt = { x: u.x + Math.sin(u.ang) * 1400, z: u.z + Math.cos(u.ang) * 1400 };
    if (dd < 900) alvoAlt = canhao ? 45 : d.arma === 'bomba' ? 120 : 70;
    if (canhao) vAlvo = d.vel * 0.85;
    const angA = Math.atan2(tx - u.x, tz - u.z);
    const lancaEm = canhao ? 330 : d.arma === 'bomba' ? 330 : 380;
    if (dd < lancaEm && Math.abs(angDif(u.ang, angA)) < 0.25 && !u.lancou) {
      const alvo = acharAlvo({ x: tx, z: tz, nacao: u.nacao }, 160, d.splash, 0, d);
      if (!alvo) {
        u.lancou = true; u.passe = (u.passe || 0) + 1;
        if (u.passe >= 3) { u.estadoJato = 'voltando'; alerta(`${d.nome}: nenhum alvo no local, voltando`, u.x, u.z); }
      } else {
        if (canhao) { u.rajadaT = 1.7; somTiro('gau8', volEm(u.x, u.z)); }
        else if (d.arma === 'bomba') {
          const nb = d.bombas || 2;
          for (let b = 0; b < nb; b++) lancarProjetil(u.x, u.y, u.z, alvo.x + rand(-6, 6) + (b - (nb - 1) / 2) * Math.sin(u.ang) * 14, alvo.z + rand(-6, 6) + (b - (nb - 1) / 2) * Math.cos(u.ang) * 14, { arma: 'bomba', dano: d.dano, splash: d.splash, precisao: 1 }, u);
          somTiro('bomba', volEm(u.x, u.z));
        } else {
          for (let b = 0; b < d.rajada; b++) {
            const ax2 = alvo.x + rand(-12, 12), az2 = alvo.z + rand(-12, 12);
            lancarProjetil(u.x + rand(-1, 1), u.y - 1, u.z + rand(-1, 1), ax2, az2, { arma: 'foguete', dano: d.dano, splash: d.splash, precisao: 1, missil: true }, u);
          }
          somTiro('foguete', volEm(u.x, u.z));
        }
        u.municao--;
        u.lancou = true;
        ruido(tx, tz, 600);
      }
    }
    if (u.lancou && u.saidaPt) {
      if (u.municao <= 0 && !(u.rajadaT > 0)) { u.estadoJato = 'voltando'; u.lancou = false; u.saidaPt = null; alerta(`${d.nome} sem munição, voltando para a base`, u.x, u.z); }
      else if (dist(u.x, u.z, u.saidaPt.x, u.saidaPt.z) < 250) { u.lancou = false; u.saidaPt = null; }
      else { tx = u.saidaPt.x; tz = u.saidaPt.z; }
    }
  }
  // rajada do canhão GAU-8: impactos em linha à frente do avião
  if (u.rajadaT > 0) {
    u.rajadaT -= dt;
    if (!u.lancou) u.rajadaT = 0;
    u.cdGau = (u.cdGau || 0) - dt;
    while (u.cdGau <= 0) {
      u.cdGau += 0.04;
      const fr = 120 + rand(-15, 15);
      const ix = u.x + Math.sin(u.ang) * fr + rand(-5, 5), iz = u.z + Math.cos(u.ang) * fr + rand(-5, 5);
      G.efeitos.tracante(u.x + Math.sin(u.ang) * 9, u.y - 0.4, u.z + Math.cos(u.ang) * 9, ix, 0.5, iz, [1, 0.55, 0.2]);
      explodir(ix, 0.3, iz, d.splash, d.dano, u, true);
    }
  }
  const angA = Math.atan2(tx - u.x, tz - u.z);
  const antes = u.ang;
  u.ang = girarPara(u.ang, angA, giro * dt);
  u.banco += (clamp(angDif(antes, u.ang) / dt * 0.9, -1.2, 1.2) - (u.banco || 0)) * Math.min(1, dt * 4);
  u.velAtual += (vAlvo - u.velAtual) * Math.min(1, dt * 0.8);
  u.x += Math.sin(u.ang) * u.velAtual * dt;
  u.z += Math.cos(u.ang) * u.velAtual * dt;
  u.vy = clamp((alvoAlt - u.y) * 0.8, -40, 40);
  u.y += clamp(alvoAlt - u.y, -40 * dt, 40 * dt);
  if (u.y < chaoEm(u.x, u.z) + 15 && u.estadoJato !== 'aproximando') u.y = chaoEm(u.x, u.z) + 15;
  // fumaça do motor e vórtices nas pontas das asas em curvas fechadas
  const ef = G.efeitos;
  if (Math.random() < dt * 25) ef.particula(u.x - Math.sin(u.ang) * 9, u.y + 0.9, u.z - Math.cos(u.ang) * 9, 0, 0, 0, 1.2, 0.5, [0.8, 0.8, 0.8], [0.6, 0.6, 0.6], 0.22, 0, 2);
  if (Math.abs(u.banco) > 0.5 && u.velAtual > 120) {
    const sp = u.m && u.m.def.pontas || 6;
    const c = Math.cos(u.ang), s = Math.sin(u.ang);
    for (const lado of [-1, 1]) {
      const lx = lado * sp, ly = 1.2 + lado * Math.sin(-u.banco) * sp * 0.3;
      ef.particula(u.x + c * lx - s * 3, u.y + ly, u.z - s * lx - c * 3, 0, 0, 0, 0.5, 0.7, [1, 1, 1], [0.9, 0.9, 0.9], 0.55, 0, 0.4);
    }
  }
}

function controleDireto(u, dt) {
  const c = G.joy || { x: 0, z: 0 };
  const m = Math.hypot(c.x, c.z);
  const vel = u.d.vel * (u.classe === 'inf' ? 1.2 : 1);
  if (m > 0.1) {
    const ang = Math.atan2(c.x, c.z);
    if (u.classe === 'aereo') {
      u.ang = girarPara(u.ang, ang, 3 * dt);
      u.velAtual = vel * Math.min(1, m);
      u.x += Math.sin(u.ang) * u.velAtual * dt; u.z += Math.cos(u.ang) * u.velAtual * dt;
      u.pousado = false; if (u.altAlvo < 15) u.altAlvo = u.d.altCruz;
    } else {
      u.ang = girarPara(u.ang, ang, (u.classe === 'inf' ? 12 : 2.5) * dt);
      u.velAtual = vel * Math.min(1, m) * Math.max(0.2, Math.cos(angDif(u.ang, ang)));
      mover(u, Math.sin(u.ang) * u.velAtual * dt, Math.cos(u.ang) * u.velAtual * dt, modoNav(u));
    }
  } else u.velAtual = 0;
  u.ordem = null; u.caminho = null;
}

function combate(u, dt) {
  const d = u.d;
  if (u.rapel) return;
  if (!d.arma && !d.sec) return;
  if (u.classe === 'inf' && u.velAtual > 0.5 && G.controlando !== u) return;
  if (u.classe === 'aereo' && u.pousado) return;
  u.busca -= dt;
  u.cd -= dt; u.cd2 -= dt;
  if (u.recarga > 0) { u.recarga -= dt; if (u.recarga <= 0) u.salva = d.salva; }
  const bonus = u.predio ? 1.3 : 1;
  if (u.busca <= 0) {
    u.busca = 0.35 + Math.random() * 0.2;
    if (!(u.ordem && u.ordem.tipo === 'atacar' && alvoValido(u.ordem.alvo, u))) {
      if (!alvoValido(u.alvo, u) || dist(u.x, u.z, u.alvo.x, u.alvo.z) > d.alcance * bonus) u.alvo = acharAlvo(u, d.alcance * bonus, d.splash && d.splash >= 8 ? d.splash : 0, d.minAlc || 0, d);
    }
    if (d.sec) u.alvo2 = acharAlvo(u, d.sec.alcance, d.sec.splash && d.sec.splash >= 8 ? d.sec.splash : 0, 0, d.sec);
  }
  // parada e sem alvo no alcance: avança contra inimigo próximo (defende a área sem precisar de ordem)
  if (!u.alvo && !u.ordem && u.busca > 0.3 && u.classe !== 'jato' && u.classe !== 'naval' && !u.predio && d.arma && G.controlando !== u) {
    let perto = null, md = (d.alcance * 2.2) ** 2;
    G.hashU.busca(u.x, u.z, d.alcance * 2.2, (v, d2) => { if (d2 < md && v.vivo && !v.dentro && hostis(u, v) && podeAtingir(d, v)) { md = d2; perto = v; } });
    if (perto) u.ordem = { tipo: 'atacar', alvo: perto, auto: true };
  }
  const a = u.alvo;
  if (alvoValido(a, u) && d.arma) {
    const dd = dist(u.x, u.z, a.x, a.z);
    const angA = Math.atan2(a.x - u.x, a.z - u.z);
    if (u.m && u.m.torre) u.torreAng = girarPara(u.torreAng, angDif(u.ang, angA), 3 * dt) ;
    else if (u.janela) u.ang = girarPara(u.ang, u.janela.ang + Math.max(-1.1, Math.min(1.1, angDif(u.janela.ang, angA))), 8 * dt);
    else if (u.classe === 'inf' && u.velAtual < 0.5) u.ang = girarPara(u.ang, angA, 8 * dt);
    else if (u.classe === 'aereo' && !u.ordem && u.velAtual < 5) u.ang = girarPara(u.ang, angA, 2 * dt);
    if (u.cd <= 0 && dd <= d.alcance * bonus && dd >= (d.minAlc || 0)) {
      if (d.salva) {
        if (u.salva > 0) { atirar(u, a, d); u.salva--; u.cd = d.cadencia; if (u.salva <= 0) u.recarga = d.recarga; }
      } else {
        atirar(u, a, d);
        u.cd = d.cadencia * rand(0.85, 1.15);
      }
      u.mirando = 0.6;
    }
  } else if (u.m && u.m.torre) u.torreAng = girarPara(u.torreAng, 0, 0.8 * dt);
  if (d.sec && alvoValido(u.alvo2, u) && u.cd2 <= 0) {
    // míssil/foguete: vale a pena contra blindados, aeronaves e estruturas, ou contra um grupo de soldados
    const v2 = u.alvo2;
    if (d.sec.antitanque || v2.classe !== 'inf' || G.hashU.contar(v2.x, v2.z, d.sec.splash || 3, (z) => z.vivo && hostis(u, z)) >= 3) {
      atirar(u, u.alvo2, d.sec);
      u.cd2 = d.sec.cadencia * rand(0.9, 1.1);
    }
  }
}

function atualizarTransporte(t, dt) {
  // entrega civis ao chegar na zona segura
  if (t.passageiros.length && naZonaSegura(t.x, t.z, t.y) && (t.classe !== 'aereo' || t.pousado)) {
    if (t.passageiros.some((p) => p.agente)) entregarCivis(t);
  }
  // navios perto do porta-aviões entregam civis
  if (t.classe === 'naval' && t.passageiros.length && G.porta && dist(t.x, t.z, G.porta.x, G.porta.z) < 200) entregarCivis(t);
  // resgate automático de SOS por veículos perto
}

// estruturas da base (torres atiram sozinhas)
function atualizarEstrutura(u, dt) {
  if (u.construindo > 0) {
    u.construindo -= dt;
    const f = 1 - Math.max(0, u.construindo) / u.tempoObra;
    u.m.grupo.scale.y = 0.15 + 0.85 * f;
    u.hp = Math.max(u.hp, u.hpMax * (0.2 + 0.8 * f));
    if (Math.random() < dt * 3) G.efeitos.poeira(u.x + rand(-u.d.raio, u.d.raio) * 0.5, u.z + rand(-u.d.raio, u.d.raio) * 0.5, 1);
    if (u.construindo <= 0) { u.m.grupo.scale.y = 1; alerta(`🏗️ ${u.d.nome} construído!`, u.x, u.z, 'bom'); somUI('ok'); }
    return;
  }
  if (u.d.arma) {
    u.busca -= dt; u.cd -= dt;
    if (u.busca <= 0) { u.busca = 0.4; u.alvo = acharAlvo(u, u.d.alcance, 0, 0, u.d); }
    if (alvoValido(u.alvo, u) && u.cd <= 0) { atirar({ ...u, y: 11, m: null, classe: 'estr' }, u.alvo, u.d); u.cd = u.d.cadencia; }
  }
  if (u.fila && u.fila.length) {
    const f = u.fila[0];
    f.t -= dt;
    if (f.t <= 0) { u.fila.shift(); G.produzir(f.tipo, u); }
  }
}

// ---------------- dano em unidades ----------------
export function danoUnidade(u, dano, fonte) {
  if (!u.vivo || dano <= 0) return;
  // soldado dentro de prédio fica protegido pelas paredes
  if (u.classe === 'inf' && u.predio && u.predio.integridade > 0) dano *= 0.4;
  u.hp -= dano;
  u.atacadoT = G.tempo;
  if (u.classe === 'inf' && Math.random() < 0.3) G.efeitos.sangue(u.x, u.y + 1.2, u.z, 3);
  if (u.hp <= 0) matarUnidade(u, fonte);
}

export function matarUnidade(u, fonte) {
  if (!u.vivo) return;
  const meu = doJogador(u);
  if (meu && !u.estr) G.perdas++;
  // abate de unidade inimiga pelo time do jogador: conta e dá recompensa
  if (inimigoDoJogador(u) && fonte && fonte.nacao === G.nacao) {
    G.abates = (G.abates || 0) + 1;
    G.dinheiro += Math.round((u.d.custo || 300) * 0.3);
  }
  const bandeira = NACOES[u.nacao] ? NACOES[u.nacao].bandeira + ' ' : '';
  if (u.estr) {
    G.efeitos.explosao(u.x, 5, u.z, 18);
    somExplosao(volEm(u.x, u.z));
    if (meu || inimigoDoJogador(u)) alerta(`💥 ${bandeira}${u.d.nome} ${meu ? 'foi destruído!' : 'destruído'}`, u.x, u.z, meu ? 'ruim' : 'bom');
    removerUnidade(u);
    if (u.tipoEstr === 'qg') qgDestruido(u);
    return;
  }
  if (u.predio) u.predio.guarnicao = u.predio.guarnicao.filter((x) => x !== u);
  // passageiros saem (ou morrem com aeronaves)
  for (const p of u.passageiros.slice()) {
    if (u.classe === 'aereo' && u.y > 8 || u.classe === 'naval') {
      if (p.agente) { p.vivo = false; G.civisMortos++; } else { p.vivo = false; removerUnidade(p); if (meu) G.perdas++; }
    }
  }
  if (!(u.classe === 'aereo' && u.y > 8) && u.classe !== 'naval') { u.pousado = true; desembarcar(u); }
  if (u.classe === 'inf') {
    if (meu) alerta(`${u.d.nome} abatido`, u.x, u.z, 'ruim');
    G.mortos = G.mortos || [];
    G.mortos.push({ x: u.x, y: u.y, z: u.z, ang: u.ang, nacao: u.nacao, sniper: u.tipo.includes('sniper'), t: G.tempo });
    if (G.mortos.length > 120) G.mortos.shift();
  } else {
    G.efeitos.explosao(u.x, u.y + 1, u.z, u.d.raio * 2.5, ehAgua(u.x, u.z));
    somExplosao(volEm(u.x, u.z));
    // avisa as suas perdas e os inimigos que as suas tropas destroem (as baixas do aliado não enchem a tela)
    if (meu) alerta(`💥 ${u.d.nome} destruído`, u.x, u.z, 'ruim');
    else if (inimigoDoJogador(u) && fonte && fonte.nacao === G.nacao) alerta(`💥 ${bandeira}${u.d.nome} destruído`, u.x, u.z, 'bom');
    if (u.classe === 'veic' && u.m && !ehAgua(u.x, u.z)) criarDestroco(u);
  }
  removerUnidade(u);
}

// ---------------- carcaças queimadas ----------------
// o veículo destruído vira uma carcaça preta que pega fogo, solta fumaça e some depois de um tempo.
// No Abrams a munição explode e a torre é arremessada para cima.
const DESTROCO_VIDA = 150, MAX_DESTROCOS = 10, _pw = new THREE.Vector3();
function criarDestroco(u) {
  if (!G.destrocos) G.destrocos = [];
  while (G.destrocos.length >= MAX_DESTROCOS) removerDestroco(G.destrocos[0]);
  const d = u.m.def, grupo = new THREE.Group();
  grupo.position.set(u.x, u.y, u.z);
  grupo.rotation.y = u.ang;
  const casco = new THREE.Mesh(queimar(d.corpo), matQueimado());
  casco.castShadow = casco.receiveShadow = true;
  grupo.add(casco);
  const w = { grupo, t: 0, x: u.x, y: u.y, z: u.z, raio: u.d.raio || 3, torre: null };
  if (d.torre) {
    const t = new THREE.Mesh(queimar(d.torre), matQueimado());
    t.castShadow = t.receiveShadow = true;
    t.position.set(0, d.torreY, d.torreZ);
    t.rotation.y = u.torreAng || 0;
    grupo.add(t);
    w.torre = t;
    if (d.destrocoTorre) {
      // explosão da munição: a torre sobe girando e cai ao lado do casco
      w.voo = { vy: 11 + Math.random() * 5, vx: rand(-3, 3), vz: rand(-3, 3), gx: rand(-1.2, 1.2), gy: rand(-2, 2), gz: rand(-1.2, 1.2), y0: d.torreY };
      G.efeitos.explosao(u.x, u.y + 3, u.z, 9);
    } else {
      t.rotation.x = rand(-0.12, 0.12); t.rotation.z = rand(-0.12, 0.12);
    }
  }
  grupo.rotation.z = rand(-0.04, 0.04); grupo.rotation.x = rand(-0.04, 0.04);
  G.cena.add(grupo);
  G.destrocos.push(w);
}
function removerDestroco(w) {
  G.cena.remove(w.grupo);
  const i = G.destrocos.indexOf(w);
  if (i >= 0) G.destrocos.splice(i, 1);
}
export function atualizarDestrocos(dt) {
  if (!G.destrocos || !dt) return;
  for (const w of G.destrocos.slice()) {
    w.t += dt;
    const v = w.voo, t = w.torre;
    if (v) {
      v.vy -= 9.8 * dt;
      t.position.x += v.vx * dt; t.position.y += v.vy * dt; t.position.z += v.vz * dt;
      t.rotation.x += v.gx * dt; t.rotation.y += v.gy * dt; t.rotation.z += v.gz * dt;
      if (Math.random() < dt * 30) { t.getWorldPosition(_pw); G.efeitos.fumaca(_pw.x, _pw.y, _pw.z, 1.6, [0.12, 0.11, 0.1]); }
      // cai sobre o casco (se ainda estiver em cima dele) ou no chão ao lado
      const sobreCasco = Math.abs(t.position.x) < 1.6 && Math.abs(t.position.z) < 3.6, piso = sobreCasco ? v.y0 * 0.8 : -0.1;
      if (v.vy < 0 && t.position.y <= piso) {
        t.position.y = piso;
        t.rotation.x = clamp(Math.sin(t.rotation.x) * 0.5, -0.45, 0.45); t.rotation.z = clamp(Math.sin(t.rotation.z) * 0.5, -0.45, 0.45);
        t.getWorldPosition(_pw);
        G.efeitos.poeira(_pw.x, _pw.z, 6);
        somExplosao(volEm(_pw.x, _pw.z) * 0.4);
        w.voo = null;
      }
    }
    // fogo nos primeiros 30 s, depois só fumaça
    const R = w.raio * 0.45;
    if (w.t < 30 && Math.random() < dt * (QUAL === 0 ? 6 : 14)) {
      G.efeitos.particula(w.x + rand(-R, R), w.y + 1.4 + Math.random(), w.z + rand(-R, R), rand(-0.4, 0.4), 2.2 + Math.random() * 2, rand(-0.4, 0.4), 1 + Math.random() * 0.8, 0.45 + Math.random() * 0.3, [1, 0.82, 0.35], [0.85, 0.2, 0.04], 0.9, -1.5, 0.6);
    }
    if (w.t < 80 && Math.random() < dt * (w.t < 30 ? 4 : 1.5)) G.efeitos.fumaca(w.x + rand(-R, R), w.y + 2.2, w.z + rand(-R, R), 2.6, [0.09, 0.085, 0.08]);
    // no fim afunda no chão e some
    if (w.t > DESTROCO_VIDA - 6) w.grupo.position.y = w.y - (w.t - (DESTROCO_VIDA - 6)) * 0.6;
    if (w.t > DESTROCO_VIDA) removerDestroco(w);
  }
}

// ---------------- modelo 3D ----------------
const _euler = new THREE.Euler();
export function posicionarModelo(u, dt) {
  if (u.anel) {
    u.anel.position.set(u.x, (u.classe === 'aereo' || u.classe === 'jato' ? chaoEm(u.x, u.z) : u.y) + 0.35, u.z);
    u.anel.visible = !u.dentro;
  }
  if (!u.m) return;
  const g = u.m.grupo;
  g.position.set(u.x, u.y, u.z);
  if (u.classe === 'aereo' || u.classe === 'jato') {
    const incl = u.classe === 'jato' ? -clamp(Math.atan2(u.vy || 0, Math.max(30, u.velAtual)), -0.5, 0.5) : clamp(u.velAtual / u.d.vel, -1, 1) * 0.18;
    _euler.set(incl, u.ang, u.classe === 'jato' ? -(u.banco || 0) : 0, 'YXZ');
    g.rotation.copy(_euler);
  } else if (u.classe === 'naval' && u.d.raio < 20) {
    _euler.set(-Math.min(0.06, u.velAtual * 0.004) + Math.sin(G.tempo * 1.3 + u.id) * 0.015, u.ang, Math.sin(G.tempo * 0.9 + u.id) * 0.02, 'YXZ');
    g.rotation.copy(_euler);
  } else g.rotation.set(0, u.ang, 0);
  if (u.m.torre) u.m.torre.rotation.y = u.torreAng;
  if (u.m.trem) {
    const e = u.estadoJato, deck = (baseDo(u)?.deck ?? 9.2);
    u.m.trem.visible = e === 'pronto' || e === 'rearmando' || e === 'pousando' || (e === 'decolando' && u.y < deck + 12) || (e === 'aproximando' && u.y < deck + 60);
  }
  if (u.m.chamas) {
    const voando = u.estadoJato === 'voando' || u.estadoJato === 'voltando' || u.estadoJato === 'decolando';
    const k = voando ? 0.8 + Math.random() * 0.4 : 0;
    for (const c of u.m.chamas) { c.visible = voando; c.scale.set(1, 1, k); }
  }
  if (u.classe === 'aereo') {
    const pairando = u.ordem && u.ordem.tipo === 'corda' && u.ordem.pairando && u.passageiros.some((q) => !q.agente);
    if (pairando && !u.corda) {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
      u.corda = new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color: 0x2a2620 }));
      u.corda.frustumCulled = false;
      G.cena.add(u.corda);
    }
    if (u.corda) {
      u.corda.visible = !!pairando;
      if (pairando) {
        const a = u.corda.geometry.attributes.position.array, ch = chaoEm(u.x, u.z);
        const rx = Math.cos(u.ang), rz = -Math.sin(u.ang), fx = Math.sin(u.ang) * 1.2, fz = Math.cos(u.ang) * 1.2;
        let k = 0;
        for (const l of [-1, 1]) {
          const x = u.x + rx * l * 1.3 + fx, z = u.z + rz * l * 1.3 + fz;
          a[k++] = x; a[k++] = u.y + 2.2; a[k++] = z; a[k++] = x; a[k++] = ch; a[k++] = z;
        }
        u.corda.geometry.attributes.position.needsUpdate = true;
      }
    }
  }
  // sombra no chão para aeronaves em voo (a sombra real do sol só cobre perto da câmera)
  if (u.classe === 'aereo' || u.classe === 'jato') {
    if (!u.sombra) {
      const g = new THREE.CircleGeometry(1, 16).rotateX(-Math.PI / 2);
      u.sombra = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.28, depthWrite: false }));
      u.sombra.renderOrder = 2;
      G.cena.add(u.sombra);
    }
    const ch = chaoEm(u.x, u.z);
    const alt = u.y - ch;
    const d = G.dirSol || { x: -0.5, y: 0.8, z: 0.4 };
    u.sombra.visible = alt > 2 && !u.dentro && !(u.classe === 'jato' && (u.estadoJato === 'pronto' || u.estadoJato === 'rearmando'));
    u.sombra.position.set(u.x - d.x / d.y * alt, ch + 0.3, u.z - d.z / d.y * alt);
    u.sombra.scale.set(u.d.raio * 0.7, 1, u.d.raio * 1.0);
    u.sombra.rotation.y = u.ang;
  }
  const girando = u.classe === 'aereo' && !(u.pousado && u.y === chaoEm(u.x, u.z) && !u.ordem && u.velAtual < 0.1 && u.parado > 3);
  if (u.classe === 'aereo') u.parado = u.pousado ? (u.parado || 0) + dt : 0;
  const vr = girando ? 28 : 0;
  if (u.m.rotor) u.m.rotor.rotation.y += vr * dt;
  if (u.m.rotor2) u.m.rotor2.rotation.y -= vr * dt;
  if (u.m.cauda) u.m.cauda.rotation.x += vr * 2 * dt;
  if (u.m.helice) u.m.helice.rotation.y += 40 * dt;
  if (u.m.naceles) {
    const alvoN = u.velAtual > 40 ? Math.PI / 2 : 0;
    for (const n of u.m.naceles) {
      n.piv.rotation.x += (alvoN - n.piv.rotation.x) * Math.min(1, dt);
      n.ro.rotation.y += vr * dt;
    }
  }
}

export function marcarSelecao(u, sel) {
  u.sel = sel;
  if (sel && !u.anel && u.classe !== 'inf') {
    u.anel = criarAnel(Math.max(1.2, u.d.raio * 1.2));
    G.cena.add(u.anel);
  } else if (!sel && u.anel) { G.cena.remove(u.anel); u.anel = null; }
}

export { ESTRUTURAS };
