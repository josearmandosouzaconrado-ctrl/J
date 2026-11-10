// Polícia SWAT de Miami: equipes independentes que aparecem quando o vírus começa a se espalhar.
// Cada equipe tem um blindado BearCat e 6 policiais. Elas vão sozinhas até os focos, combatem os
// zumbis e levam os civis que embarcam no blindado até a zona segura da base.
import { G, alerta } from './estado.js';
import { latlon, andavel } from './mapa.js';
import { pontoLivreProximo } from './caminho.js';
import { criarUnidade, embarcar, desembarcar, ordenar, ordenarMover, naZonaSegura, vagas } from './unidades.js';
import { dist, rand } from './util.js';
import { somUI } from './som.js';

const DELEGACIAS = [
  { nome: 'Polícia de Miami (Downtown)', ...latlon(25.7795, -80.1985) },
  { nome: 'Polícia de Miami Beach', ...latlon(25.7808, -80.1325) },
];
const MAX_EQUIPES = 4;
const equipes = [];
G.equipes = equipes;

function lugar(p) { return andavel(p.x, p.z) ? p : (pontoLivreProximo(0, p.x, p.z) || p); }

export function enviarSwat(x, z, nome) {
  if (equipes.filter((e) => e.vivo).length >= MAX_EQUIPES) return;
  const del = DELEGACIAS.slice().sort((a, b) => dist(a.x, a.z, x, z) - dist(b.x, b.z, x, z))[0];
  const p = lugar(del);
  const van = criarUnidade('bearcat', p.x, p.z, 0);
  van.policia = true;
  const oficiais = [];
  for (let i = 0; i < 6; i++) {
    const o = criarUnidade('swat', p.x + rand(-3, 3), p.z + rand(-3, 3), 0);
    o.policia = true;
    embarcar(o, van);
    oficiais.push(o);
  }
  const e = { van, oficiais, alvo: { x, z }, estado: 'indo', t: 0, calmo: 0, vivo: true, id: equipes.length + 1 };
  equipes.push(e);
  van.ordem = { tipo: 'mover', x, z };
  alerta(`🚓 SWAT da ${del.nome} a caminho de ${nome || 'um foco de infecção'}`, p.x, p.z, 'info');
  somUI('sirene');
}

function zumbisPerto(x, z, r) {
  return G.hashA ? G.hashA.contar(x, z, r, (a) => a.zumbi && a.vivo && a.estado !== 'morto') : 0;
}

function zumbiMaisProximo(x, z, r) {
  let melhor = null, md = r * r;
  for (const a of G.agentes) {
    if (!a.zumbi || !a.vivo || a.dentro || a.estado === 'morto') continue;
    const d2 = (a.x - x) ** 2 + (a.z - z) ** 2;
    if (d2 < md) { md = d2; melhor = a; }
  }
  return melhor;
}

let relogio = 0;
export function atualizarPolicia(dt) {
  relogio -= dt;
  if (relogio > 0) return;
  relogio = 1;
  for (const e of equipes) {
    if (!e.vivo) continue;
    e.oficiais = e.oficiais.filter((o) => o.vivo);
    const van = e.van.vivo ? e.van : null;
    if (!van && !e.oficiais.length) { e.vivo = false; alerta('☠️ Uma equipe da SWAT foi perdida', e.alvo.x, e.alvo.z, 'ruim'); continue; }
    e.t += 1;
    const fora = e.oficiais.filter((o) => !o.dentro);
    const centro = fora.length ? { x: fora.reduce((s, o) => s + o.x, 0) / fora.length, z: fora.reduce((s, o) => s + o.z, 0) / fora.length } : (van || e.oficiais[0]);
    // blindado cheio de civis: leva para a zona segura
    if (van) {
      const civis = van.passageiros.filter((p) => p.agente).length;
      if (e.estado !== 'evacuar' && civis > 0 && (vagas(van) < 1 || (civis >= 4 && zumbisPerto(van.x, van.z, 60) === 0 && e.t > 20))) {
        e.estado = 'evacuar';
        const zs = G.estr.zona;
        van.ordem = { tipo: 'mover', x: zs.x, z: zs.z };
        alerta(`🚓 Blindado da SWAT levando ${civis} civis para a zona segura`, van.x, van.z, 'bom');
      }
      if (e.estado === 'evacuar') {
        if (!van.passageiros.some((p) => p.agente)) { e.estado = 'voltar'; van.ordem = { tipo: 'mover', x: e.alvo.x, z: e.alvo.z }; }
        else if (naZonaSegura(van.x, van.z, 0) && !van.ordem) desembarcar(van);
        continue;
      }
      if (e.estado === 'voltar') {
        if (dist(van.x, van.z, e.alvo.x, e.alvo.z) < 80 || !van.ordem) e.estado = 'combate';
        continue;
      }
    }
    // escolhe o alvo: foco atual ou o zumbi mais próximo
    const perto = zumbisPerto(e.alvo.x, e.alvo.z, 140);
    if (perto === 0) e.calmo++; else e.calmo = 0;
    if (e.calmo > 12) {
      const z = zumbiMaisProximo(centro.x, centro.z, 3500);
      if (z) { e.alvo = { x: z.x, z: z.z }; e.calmo = 0; e.estado = 'indo'; }
    }
    const longe = dist(centro.x, centro.z, e.alvo.x, e.alvo.z) > 320;
    if (van && longe && e.estado !== 'indo') {
      // reagrupa no blindado para ir longe
      e.estado = 'indo';
      const fora2 = e.oficiais.filter((o) => !o.dentro);
      if (fora2.length) ordenar(fora2, { tipo: 'embarcar', t: van });
    }
    if (e.estado === 'indo' && van) {
      const fora2 = e.oficiais.filter((o) => !o.dentro);
      if (fora2.length && e.t % 30 !== 0 && fora2.some((o) => o.ordem && o.ordem.tipo === 'embarcar')) continue; // esperando embarcar
      if (dist(van.x, van.z, e.alvo.x, e.alvo.z) > 70) {
        if (!van.ordem) van.ordem = { tipo: 'mover', x: e.alvo.x + rand(-20, 20), z: e.alvo.z + rand(-20, 20) };
      } else {
        van.ordem = null;
        desembarcar(van);
        e.estado = 'combate';
      }
      continue;
    }
    // em combate: policiais avançam devagar em direção ao foco e o blindado fica perto
    e.estado = 'combate';
    for (const o of e.oficiais) {
      if (o.dentro || o.ordem) continue;
      if (o.alvo && o.alvo.vivo && o.alvo.zumbi) continue;
      const z = zumbiMaisProximo(o.x, o.z, 200);
      const dest = z || e.alvo;
      if (dist(o.x, o.z, dest.x, dest.z) > 45) {
        const a = Math.atan2(dest.x - o.x, dest.z - o.z) + rand(-0.4, 0.4);
        ordenarMover([o], o.x + Math.sin(a) * 30, o.z + Math.cos(a) * 30);
      }
    }
    if (van && !van.ordem && centro !== van && dist(van.x, van.z, centro.x, centro.z) > 50) van.ordem = { tipo: 'mover', x: centro.x + rand(-10, 10), z: centro.z + rand(-10, 10) };
  }
}
