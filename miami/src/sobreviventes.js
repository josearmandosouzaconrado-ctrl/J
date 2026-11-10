// Sobreviventes: civis que ninguém resgatou se juntam, pegam armas e montam acampamentos.
// O jogador ainda pode resgatá-los: basta chegar com tropas perto do acampamento.
// Quando a cidade fica muito infectada, a polícia e a SWAT desistem e viram sobreviventes também.
import * as THREE from 'three';
import { G, alerta } from './estado.js';
import { andavel, lugares } from './mapa.js';
import { pontoLivreProximo } from './caminho.js';
import { criarModelo } from './modelos.js';
import { removerUnidade } from './unidades.js';
import { rand, dist, dist2 } from './util.js';
import { SWAT_ROUPA, SWAT_CALCA, PELE_SOLD } from './bonecos.js';
import { somUI } from './som.js';

export const acampamentos = [];
G.acampamentos = acampamentos;
let relogio = 20, seq = 0;

function nomePerto(x, z) {
  let n = 'cidade', md = Infinity;
  for (const k in lugares) {
    if (['base', 'heliporto', 'docas', 'portaavioes'].includes(k)) continue;
    const d = dist2(x, z, lugares[k].x, lugares[k].z);
    if (d < md) { md = d; n = lugares[k].nome; }
  }
  return n;
}

function longeDoJogador(x, z, r) {
  for (const u of G.unidades) if (u.vivo && !u.policia && (u.estr || u.classe === 'inf' || u.classe === 'veic') && dist2(u.x, u.z, x, z) < r * r) return false;
  return true;
}

function lugarAberto(x, z) {
  // precisa de um círculo livre de ~14 m
  for (let k = 0; k < 30; k++) {
    const px = x + rand(-60, 60), pz = z + rand(-60, 60);
    let ok = true;
    for (let a = 0; a < 6.28 && ok; a += 0.8) if (!andavel(px + Math.sin(a) * 12, pz + Math.cos(a) * 12)) ok = false;
    if (ok && andavel(px, pz)) return { x: px, z: pz };
  }
  return null;
}

function postoDe(c, a, i) {
  const ang = (i / Math.max(6, c.membros.length)) * Math.PI * 2;
  const r = a.armado ? 11.5 : 4 + (i % 3) * 1.5;      // armados na barricada, os outros dentro
  return { x: c.x + Math.sin(ang) * r, z: c.z + Math.cos(ang) * r };
}

export function criarAcampamento(x, z, membros, policia = false) {
  const m = criarModelo('acampamento');
  m.grupo.position.set(x, 0, z);
  m.grupo.rotation.y = rand(0, 6.28);
  G.cena.add(m.grupo);
  const c = { id: ++seq, x, z, m, membros: [], ativo: true, policia, nome: nomePerto(x, z), t: 0 };
  acampamentos.push(c);
  for (const a of membros) entrar(c, a);
  return c;
}

function entrar(c, a) {
  a.campo = c; a.estado = 'acampar'; a.lider = null;
  c.membros.push(a);
  a.posto = postoDe(c, a, c.membros.length - 1);
}

function armar(a) {
  a.armado = true;
  a.hp = Math.max(a.hp, 60);
}

// policiais da SWAT deixam o serviço: viram sobreviventes armados com uniforme
function policialVirouSobrevivente(u) {
  const a = G.criarCivil(u.x, u.z);
  a.camisa = SWAT_ROUPA; a.calca = SWAT_CALCA; a.pele = PELE_SOLD;
  a.policial = true; a.cabelo = null;
  armar(a); a.hp = 115;
  return a;
}

function policiaDesiste() {
  const eq = (G.equipes || []).find((e) => e.vivo && !e.desistiu);
  if (!eq) return false;
  eq.desistiu = true; eq.vivo = false;
  const novos = [];
  for (const o of eq.oficiais) {
    if (!o.vivo) continue;
    if (o.dentro) { o.dentro.passageiros.splice(o.dentro.passageiros.indexOf(o), 1); o.dentro.cargaUsada -= 1; o.dentro = null; }
    novos.push(policialVirouSobrevivente(o));
    removerUnidade(o);
  }
  // civis no blindado descem junto
  if (eq.van.vivo) {
    for (const p of eq.van.passageiros.slice()) if (p.agente) { p.dentro = null; novos.push(p); }
    eq.van.passageiros = eq.van.passageiros.filter((p) => !p.agente);
    const vx = eq.van.x, vz = eq.van.z;
    removerUnidade(eq.van);
    if (novos.length) {
      const l = lugarAberto(vx, vz) || { x: vx, z: vz };
      const c = criarAcampamento(l.x, l.z, novos, true);
      alerta(`🚔 A SWAT desistiu! Os policiais abandonaram o serviço e montaram um acampamento em ${c.nome}`, c.x, c.z, 'ruim');
    }
  }
  somUI('alerta');
  return true;
}

export function atualizarSobreviventes(dt) {
  relogio -= dt;
  for (const c of acampamentos) {
    if (!c.ativo) continue;
    c.membros = c.membros.filter((a) => a.vivo && !a.zumbi && a.estado !== 'morto' && a.campo === c);
    c.t += dt;
    // aos poucos encontram armas
    if (c.t > 25 && Math.random() < dt * 0.03) {
      const d = c.membros.find((a) => !a.armado);
      if (d && c.membros.filter((a) => a.armado).length < c.membros.length * 0.7) { armar(d); d.posto = postoDe(c, d, c.membros.indexOf(d)); }
    }
    if (!c.membros.length) {
      c.ativo = false;
      alerta(`☠️ O acampamento de sobreviventes em ${c.nome} caiu`, c.x, c.z, 'ruim');
      continue;
    }
    // resgate: tropas do jogador chegam perto
    let lider = null;
    G.hashU.busca(c.x, c.z, 45, (u) => {
      if (lider || !u.vivo || u.dentro || u.policia || u.estr) return;
      if (u.classe === 'inf' || u.classe === 'veic' || (u.classe === 'aereo' && u.pousado && u.d.carga) || (u.classe === 'naval' && u.d.carga)) lider = u;
    });
    if (lider) {
      c.ativo = false;
      for (const a of c.membros) { a.campo = null; a.estado = 'seguir'; a.lider = lider; a.espera = 0; }
      alerta(`🤝 ${c.membros.length} sobreviventes de ${c.nome} aceitaram o resgate e seguem suas tropas!`, c.x, c.z, 'bom');
      somUI('resgate');
    }
  }
  if (relogio > 0) return;
  relogio = 15;
  // infecção alta: polícia desiste
  const inf = G.populacao ? G.infectados / G.populacao : 0;
  if (!G.policiaDesistiu && (inf > 0.4 || (G.nZumbis > 250 && G.nZumbis > G.nCivis))) {
    G.policiaDesistiu = true;
    alerta('📻 A cidade está tomada. A polícia e a SWAT estão desistindo e abandonando os postos!', null, null, 'surto');
  }
  if (G.policiaDesistiu && Math.random() < 0.6) policiaDesiste();
  // novos acampamentos de civis esquecidos (a partir de ~3 min de surto)
  if (G.focos < 2 || G.tempo < 180) return;
  const ativos = acampamentos.filter((c) => c.ativo).length;
  if (ativos >= 8) return;
  const soltos = G.agentes.filter((a) => a.vivo && !a.zumbi && !a.dentro && !a.campo && a.estado !== 'morto' && a.estado !== 'seguir');
  for (let tent = 0; tent < 6; tent++) {
    const a = soltos[(Math.random() * soltos.length) | 0];
    if (!a) return;
    if (!longeDoJogador(a.x, a.z, 350)) continue;
    if (acampamentos.some((c) => c.ativo && dist2(c.x, c.z, a.x, a.z) < 500 * 500)) continue;
    const grupo = soltos.filter((b) => !b.campo && dist2(a.x, a.z, b.x, b.z) < 140 * 140).slice(0, 16);
    if (grupo.length < 5) continue;
    const l = lugarAberto(a.x, a.z);
    if (!l) continue;
    const c = criarAcampamento(l.x, l.z, grupo);
    // alguns já acham armas
    for (let i = 0; i < Math.min(grupo.length, 2 + (G.dia >= 2 ? 2 : 0)); i++) armar(grupo[i]);
    for (const b of grupo) b.posto = postoDe(c, b, c.membros.indexOf(b));
    alerta(`🏕️ Sobreviventes montaram um acampamento em ${c.nome} (${grupo.length} pessoas). Mande tropas para resgatá-los!`, c.x, c.z, 'info');
    somUI('alerta');
    return;
  }
}
