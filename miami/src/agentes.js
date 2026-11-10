// Civis e zumbis: o surto começa pequeno e se espalha com as mordidas
import { G, alerta } from './estado.js';
import { andavel, predioEm, predios } from './mapa.js';
import { rand, escolher, dist, dist2, girarPara, angDif } from './util.js';
import { CAMISAS, CALCAS, PELES, CABELOS, PELE_ZUMBI, CAMO, CAMO2, hex } from './bonecos.js';
import { somZumbi, somTiro } from './som.js';

const ZB = {
  comum: { hp: 70, vel: 4.0, vagar: 0.9, dano: 12, cd: 1.0, perc: 32, esc: 1 },
  corredor: { hp: 50, vel: 7.2, vagar: 1.4, dano: 9, cd: 0.8, perc: 40, esc: 1 },
  bruto: { hp: 750, vel: 3.0, vagar: 0.8, dano: 45, cd: 1.3, perc: 30, esc: 1.4 },
  soldado: { hp: 110, vel: 4.0, vagar: 1.0, dano: 14, cd: 1.0, perc: 34, esc: 1 },
};
const RAIO = { raio: 0.4, slots: 1 };

function novoAgente(x, z) {
  return {
    agente: true, id: G.idSeq++, x, z, y: 0, ang: rand(0, 6.28), zumbi: false, sub: 'civil', hp: 30, vivo: true,
    estado: 'vagar', lider: null, alvo: null, t: rand(0, 1), fase: rand(0, 6), vel: 0, dx: 0, dz: 0, cd: 0,
    camisa: escolher(CAMISAS), calca: escolher(CALCAS), pele: escolher(PELES), cabelo: Math.random() < 0.9 ? escolher(CABELOS) : null, soldado: false,
    dentro: null, virando: 0, mortoT: 0, casa: { x, z }, d: RAIO, espera: 0, acena: 0, esc: 1,
  };
}

export function criarCivil(x, z) {
  const a = novoAgente(x, z);
  G.agentes.push(a);
  return a;
}

export function criarCivilSeguindo(x, z, lider) {
  const a = criarCivil(x, z);
  a.estado = 'seguir'; a.lider = lider; a.espera = 0;
  return a;
}

export function criarZumbi(x, z, sub = 'comum') {
  const a = novoAgente(x, z);
  tornarZumbi(a, sub);
  G.agentes.push(a);
  return a;
}

function tornarZumbi(a, sub) {
  a.zumbi = true;
  a.sub = sub;
  const z = ZB[sub];
  a.hp = z.hp; a.esc = z.esc;
  a.pele = escolher(PELE_ZUMBI);
  if (sub === 'bruto') { a.camisa = hex(0x4a3b33); a.calca = hex(0x2b2b2b); }
  a.camisa = a.camisa.map((c) => c * 0.75);
  a.estado = 'vagar'; a.lider = null; a.alvo = null; a.t = rand(0, 0.5);
}

// soldado mordido vira zumbi fardado
export function soldadoVirouZumbi(u) {
  const a = novoAgente(u.x, u.z);
  a.soldado = true;
  a.camisa = CAMO; a.calca = CAMO2;
  tornarZumbi(a, 'soldado');
  a.camisa = CAMO.map((c) => c * 0.8);
  a.estado = 'morto'; a.virando = 3.5; a.vivo = true;
  G.agentes.push(a);
  G.infectados++;
}

export function danoAgente(a, dano, fonte) {
  if (!a.vivo || a.estado === 'morto') return;
  a.hp -= dano;
  if (a.zumbi && Math.random() < 0.5) G.efeitos.sangue(a.x, 1.2, a.z, 3);
  if (a.hp > 0) return;
  if (a.zumbi) {
    a.estado = 'morto'; a.mortoT = 12; a.virando = 0;
    G.zumbisMortos++;
    G.dinheiro += a.sub === 'bruto' ? 30 : 4;
    G.efeitos.sangue(a.x, 1, a.z, 6);
    return;
  }
  // civil
  if (fonte && fonte.zumbi) {
    // mordido: vai virar zumbi
    a.estado = 'morto'; a.virando = 3 + rand(0, 3);
    a.lider = null;
    G.infectados++;
  } else {
    a.estado = 'morto'; a.mortoT = 15; a.virando = 0;
    G.civisMortos++;
    if (fonte && !fonte.zumbi && !fonte.agente && G.tempo - (G._avisoFogo || -99) > 20) { G._avisoFogo = G.tempo; alerta('⚠️ Civis atingidos por fogo amigo!', a.x, a.z, 'ruim'); }
  }
  G.efeitos.sangue(a.x, 1, a.z, 8);
}

function moverAgente(a, dx, dz) {
  const nx = a.x + dx, nz = a.z + dz;
  if (andavel(nx, nz)) { a.x = nx; a.z = nz; return true; }
  const L = Math.hypot(dx, dz) * 0.25;
  if (Math.abs(dx) > L && andavel(nx, a.z)) { a.x = nx; return true; }
  if (Math.abs(dz) > L && andavel(a.x, nz)) { a.z = nz; return true; }
  return false;
}

function unidadeAlvo(o) {
  return o.vivo && !o.dentro && !o.predio && (o.classe === 'inf' || o.classe === 'veic' || o.estr || (o.classe === 'aereo' && o.y < 2));
}

// ---------------- decisões ----------------
function decidirZumbi(a) {
  const z = ZB[a.sub];
  const perc = z.perc * (G.noite ? 1.4 : 1);
  let melhor = null, md = perc * perc;
  G.hashA.busca(a.x, a.z, perc, (o, d2) => {
    if (!o.zumbi && o.vivo && !o.dentro && o.estado !== 'morto' && d2 < md) { md = d2; melhor = o; }
  });
  G.hashU.busca(a.x, a.z, perc, (o, d2) => {
    if (unidadeAlvo(o) && d2 < md * 0.9) { md = d2; melhor = o; }
  });
  a.alvo = melhor;
  if (melhor) { a.estado = 'perseguir'; return; }
  // barulho de tiros e explosões atrai
  let rr = null, rd = Infinity;
  for (const r of G.ruidos) {
    const d2 = dist2(a.x, a.z, r.x, r.z);
    if (d2 < r.r * r.r && d2 < rd) { rd = d2; rr = r; }
  }
  if (rr) { a.estado = 'ruido'; a.destino = { x: rr.x + rand(-15, 15), z: rr.z + rand(-15, 15) }; return; }
  if (a.estado !== 'ruido' || !a.destino || dist(a.x, a.z, a.destino.x, a.destino.z) < 5) {
    a.estado = 'vagar';
    if (Math.random() < 0.4) { const ang = rand(0, 6.28); a.dx = Math.sin(ang); a.dz = Math.cos(ang); }
  }
  // ataca prédio com soldados no telhado
  for (const [ox, oz] of [[2, 0], [-2, 0], [0, 2], [0, -2]]) {
    const p = predioEm(a.x + ox, a.z + oz);
    if (p && p.guarnicao.length) {
      p.integridade -= 4;
      if (p.integridade <= 0) {
        p.integridade = 0;
        const u = escolher(p.guarnicao);
        if (u) G.danoUnidade(u, z.dano, true);
      }
      break;
    }
  }
}

function decidirCivil(a) {
  if (a.campo) { decidirAcampado(a); return; }
  // perigo
  let perigo = null, pd = 20 * 20;
  G.hashA.busca(a.x, a.z, 20, (o, d2) => { if (o.zumbi && o.vivo && o.estado !== 'morto' && d2 < pd) { pd = d2; perigo = o; } });
  if (perigo && (a.estado !== 'seguir' || pd < 64)) {
    a.estado = 'fugir';
    const d = Math.sqrt(pd) || 1;
    a.dx = (a.x - perigo.x) / d; a.dz = (a.z - perigo.z) / d;
    a.medo = 4;
    return;
  }
  if (a.estado === 'fugir' && a.medo > 0) return;
  if (a.estado === 'fugir') a.estado = a.lider ? 'seguir' : 'vagar';
  // procurar soldados
  if (a.estado !== 'seguir') {
    let u = null, ud = 16 * 16, longe = false;
    G.hashU.busca(a.x, a.z, 70, (o, d2) => {
      if (!o.vivo || o.dentro || o.estr) return;
      if (o.classe === 'inf' || o.classe === 'veic' || (o.classe === 'naval' && o.d.carga) || (o.classe === 'aereo' && o.pousado && o.d.carga)) {
        if (d2 < ud) { ud = d2; u = o; } else longe = true;
      }
    });
    if (u) { a.estado = 'seguir'; a.lider = u; return; }
    a.acena = longe ? 3 : 0;
  }
  if (a.estado === 'vagar' && Math.random() < 0.3) {
    const ang = rand(0, 6.28);
    const vai = Math.random() < 0.6;
    a.dx = vai ? Math.sin(ang) : 0; a.dz = vai ? Math.cos(ang) : 0;
    // não se afasta muito de casa
    if (dist(a.x, a.z, a.casa.x, a.casa.z) > 60) { const d = dist(a.x, a.z, a.casa.x, a.casa.z); a.dx = (a.casa.x - a.x) / d; a.dz = (a.casa.z - a.z) / d; }
  }
}

// ---------------- sobreviventes ----------------
function decidirAcampado(a) {
  const c = a.campo;
  if (!c.ativo) { a.campo = null; a.estado = 'vagar'; return; }
  a.estado = 'acampar';
  // desarmados fogem para dentro do acampamento se um zumbi chega perto
  if (!a.armado) {
    let perigo = false;
    G.hashA.busca(a.x, a.z, 10, (o) => { if (o.zumbi && o.vivo && o.estado !== 'morto') perigo = true; });
    if (perigo) a.posto = { x: c.x + rand(-3, 3), z: c.z + rand(-3, 3) };
  }
}

function tiroSobrevivente(a, dt) {
  a.cdTiro = (a.cdTiro || 0) - dt;
  if (a.mirando > 0) a.mirando -= dt;
  if (a.cdTiro > 0) return;
  a.cdTiro = a.policial ? 0.45 : 0.75 + Math.random() * 0.4;
  const alc = a.policial ? 55 : 40;
  let alvo = null, md = alc * alc;
  G.hashA.busca(a.x, a.z, alc, (o, d2) => { if (o.zumbi && o.vivo && o.estado !== 'morto' && o.virando <= 0 && d2 < md) { md = d2; alvo = o; } });
  if (!alvo) return;
  a.ang = Math.atan2(alvo.x - a.x, alvo.z - a.z);
  a.mirando = 0.8;
  const ef = G.efeitos;
  const ox = a.x + Math.sin(a.ang) * 0.7, oz = a.z + Math.cos(a.ang) * 0.7;
  ef.clarao(ox, 1.4, oz, 0.8);
  const acerto = Math.random() < (a.policial ? 0.55 : 0.38);
  ef.tracante(ox, 1.4, oz, alvo.x + (acerto ? 0 : rand(-3, 3)), 1.1, alvo.z + (acerto ? 0 : rand(-3, 3)), [1, 0.85, 0.45]);
  if (acerto) danoAgente(alvo, a.policial ? 18 : 22, a);
  somTiro(a.policial ? 'fuzil' : 'pistola', G.volEm(a.x, a.z) * 0.8);
  G.ruidos.push({ x: a.x, z: a.z, r: 90, t: G.tempo });
}

// ---------------- atualização ----------------
export function atualizarAgentes(dt) {
  const A = G.agentes;
  let nZ = 0, nC = 0;
  const noite = G.noite;
  for (let i = A.length - 1; i >= 0; i--) {
    const a = A[i];
    if (!a.vivo) { A[i] = A[A.length - 1]; A.pop(); continue; }
    if (a.dentro) { if (!a.dentro.vivo) a.vivo = false; else { a.x = a.dentro.x; a.z = a.dentro.z; } nC++; continue; }
    if (a.estado === 'morto') {
      if (a.virando > 0) {
        a.virando -= dt;
        if (a.virando <= 0) {
          if (!a.zumbi) tornarZumbi(a, sorteioTipo());
          else { a.estado = 'vagar'; a.hp = ZB[a.sub].hp; }
          a.y = 0;
          somZumbi(G.volEm(a.x, a.z));
        }
      } else {
        a.mortoT -= dt;
        if (a.mortoT <= 0) a.vivo = false;
      }
      continue;
    }
    if (a.zumbi) nZ++; else nC++;
    a.t -= dt;
    a.cd -= dt;
    if (a.medo > 0) a.medo -= dt;
    if (a.zumbi) {
      const z = ZB[a.sub];
      if (a.t <= 0) { a.t = rand(0.3, 0.6); decidirZumbi(a); }
      let vel = 0;
      if (a.estado === 'perseguir' && a.alvo) {
        const o = a.alvo;
        if (!o.vivo || o.dentro || o.predio || o.estado === 'morto' || (o.classe === 'aereo' && o.y > 2)) { a.alvo = null; a.estado = 'vagar'; }
        else {
          const dd = dist(a.x, a.z, o.x, o.z);
          const alc = (o.d ? o.d.raio : 0.4) + 0.9;
          if (dd > alc) {
            const ang = Math.atan2(o.x - a.x, o.z - a.z);
            a.ang = girarPara(a.ang, ang, 6 * dt);
            vel = z.vel * (noite ? 1.25 : 1);
            if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) {
              // contorna obstáculo
              const lado = (a.id & 1) ? 1.3 : -1.3;
              moverAgente(a, Math.sin(a.ang + lado) * vel * dt, Math.cos(a.ang + lado) * vel * dt);
            }
          } else if (a.cd <= 0) {
            a.cd = z.cd;
            if (o.agente) danoAgente(o, z.dano + 6, a);
            else G.danoUnidade(o, o.classe === 'inf' ? z.dano : z.dano * (a.sub === 'bruto' ? 1.5 : 0.5), true);
            if (Math.random() < 0.15) somZumbi(G.volEm(a.x, a.z));
          }
        }
      } else if (a.estado === 'ruido' && a.destino) {
        const ang = Math.atan2(a.destino.x - a.x, a.destino.z - a.z);
        a.ang = girarPara(a.ang, ang, 3 * dt);
        vel = z.vel * 0.7;
        if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) moverAgente(a, Math.sin(a.ang + 1.2) * vel * dt, Math.cos(a.ang + 1.2) * vel * dt);
      } else if (a.dx || a.dz) {
        vel = z.vagar;
        a.ang = girarPara(a.ang, Math.atan2(a.dx, a.dz), 2 * dt);
        if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) { a.dx = -a.dx; a.dz = -a.dz; }
      }
      a.vel = vel;
      a.fase += dt * vel * 2.2;
    } else {
      // civil
      if (a.t <= 0) { a.t = rand(0.35, 0.7); decidirCivil(a); }
      let vel = 0;
      if (a.estado === 'fugir') {
        vel = 4.2;
        const ang = Math.atan2(a.dx, a.dz);
        a.ang = girarPara(a.ang, ang, 8 * dt);
        if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) {
          const lado = (a.id & 1) ? 1.4 : -1.4;
          a.dx = Math.sin(a.ang + lado); a.dz = Math.cos(a.ang + lado);
        }
      } else if (a.estado === 'seguir') {
        let l = a.lider;
        if (l && l.dentro) l = a.lider = l.dentro;
        if (!l || !l.vivo) { a.estado = 'vagar'; a.lider = null; }
        else if (l.predio) {
          // soldados num prédio: civis se abrigam lá dentro
          const p = l.predio;
          const dd = dist(a.x, a.z, p.cx, p.cz);
          if (dd < p.raio + 10) { p.civis++; a.vivo = false; continue; }
          const ang = Math.atan2(p.cx - a.x, p.cz - a.z);
          a.ang = girarPara(a.ang, ang, 8 * dt); vel = 3.5;
          moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt);
        } else {
          const dd = dist(a.x, a.z, l.x, l.z);
          const raio = (l.d ? l.d.raio : 0.5);
          const transp = l.d && l.d.carga;
          if (transp && dd < raio + 6 && (l.classe !== 'aereo' || l.pousado) && G.vagas(l) >= 1 && a.espera <= 0) {
            G.embarcarCivil(a, l);
            continue;
          }
          if (a.espera > 0) a.espera -= dt;
          const perto = transp ? raio + 2 : 3 + (a.id % 4);
          if (dd > perto) {
            const ang = Math.atan2(l.x - a.x, l.z - a.z);
            a.ang = girarPara(a.ang, ang, 8 * dt);
            vel = dd > 12 ? 4.2 : 2.2;
            if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) {
              const lado = (a.id & 1) ? 1.2 : -1.2;
              moverAgente(a, Math.sin(a.ang + lado) * vel * dt, Math.cos(a.ang + lado) * vel * dt);
            }
          }
          if (dd > 160) { a.estado = 'vagar'; a.lider = null; }
        }
      } else if (a.estado === 'acampar' && a.campo) {
        const c = a.campo, dd = dist(a.x, a.z, a.posto.x, a.posto.z);
        if (dd > 1.5) {
          const ang = Math.atan2(a.posto.x - a.x, a.posto.z - a.z);
          a.ang = girarPara(a.ang, ang, 8 * dt);
          vel = dd > 30 ? 4 : 1.6;
          if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) {
            const lado = (a.id & 1) ? 1.3 : -1.3;
            moverAgente(a, Math.sin(a.ang + lado) * vel * dt, Math.cos(a.ang + lado) * vel * dt);
          }
        } else if (!a.mirando || a.mirando <= 0) a.ang = girarPara(a.ang, Math.atan2(a.x - c.x, a.z - c.z), 2 * dt);
      } else if (a.dx || a.dz) {
        vel = 1.3;
        a.ang = girarPara(a.ang, Math.atan2(a.dx, a.dz), 4 * dt);
        if (!moverAgente(a, Math.sin(a.ang) * vel * dt, Math.cos(a.ang) * vel * dt)) { a.dx = -a.dx; a.dz = -a.dz; }
      }
      a.vel = vel;
      a.fase += dt * vel * 2.4;
      if (a.armado) tiroSobrevivente(a, dt);
      if (vel === 0 && a.acena > 0) { a.acena -= dt; a.fase += dt * 6; }
      // chegou na zona segura
      if ((a.id + G.quadro) % 20 === 0 && G.naZonaSegura(a.x, a.z, 0)) {
        a.vivo = false; a.resgatado = true;
        G.resgatados++; G.dinheiro += 40;
        G.resgateAcum = (G.resgateAcum || 0) + 1;
      }
    }
  }
  G.nZumbis = nZ; G.nCivis = nC;
}

function sorteioTipo() {
  const dia = G.dia;
  const r = Math.random();
  if (dia >= 3 && r < 0.05) return 'bruto';
  if (dia >= 2 && r < 0.15) return 'corredor';
  if (G.tempo > 360 && r < 0.06) return 'corredor';
  return 'comum';
}

// ---------------- desenho ----------------
export function desenharAgentes(bon, visivel) {
  const A = G.agentes;
  for (let i = 0; i < A.length; i++) {
    const a = A[i];
    if (!a.vivo || a.dentro) continue;
    if (!visivel(a.x, a.z)) continue;
    const pose = a.estado === 'morto' ? 3 : a.zumbi ? 1 : (a.vel === 0 && a.acena > 0 ? 4 : 0);
    const est = a.soldado ? 3 : a.armado ? (a.policial ? 5 : 4) : 0;
    const pz = a.armado && pose === 0 && a.mirando > 0 ? 2 : pose;
    bon.add(a.x, a.y, a.z, a.ang, a.fase, pz, a.camisa, a.calca, a.pele, est, a.esc, a.policial ? null : a.cabelo, Math.min(1, a.vel / 2.5));
  }
}

export { sorteioTipo, tornarZumbi };
