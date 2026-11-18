// IA do Eixo: produz unidades, defende cidades atacadas, contra-ataca e patrulha o céu.
import { TIPOS } from './dados.js';
import { ALIADOS, EIXO } from './jogo.js';

const PESOS = {
  qg: { fuzileiro: 5, thompson: 2, bar: 1, bazuca: 2, jeep: 1 },
  quartel: { fuzileiro: 4, thompson: 2, bar: 2, bazuca: 2 },
  garagem: { sherman: 4, halftrack: 2, m7: 1, jeep: 1 },
  aerodromo: { p51: 5, p80: 1, b17: 1 },
  porto: { contratorpedeiro: 1 },
};

function sortear(p) {
  const tot = Object.values(p).reduce((a, b) => a + b, 0);
  let r = Math.random() * tot;
  for (const [k, v] of Object.entries(p)) { if ((r -= v) <= 0) return k; }
  return Object.keys(p)[0];
}

export class IA {
  constructor(jogo, dificuldade = 1) {
    this.jogo = jogo;
    this.dif = dificuldade;
    this.reserva = [];
    this.ataques = [];
    this.tempoAtaque = 0;
  }

  novo(u) {
    if (!u.voa && u.cat !== 'ship') this.reserva.push(u);
  }

  atacado(e, de) {
    // unidades por perto vêm ajudar
    if (this.jogo.tempo - (e.pedidoAjuda || -99) < 20) return;
    e.pedidoAjuda = this.jogo.tempo;
    const ajuda = this.jogo.perto(e.x, e.z, 6000, (a) => a.fac === EIXO && !a.est && !a.dentro && !a.ordem &&
      (a.cat === 'inf' || a.cat === 'veh') && a !== e);
    for (const a of ajuda.slice(0, 10)) a.ordem = { t: 'mover', x: de.x, z: de.z, agressivo: true };
  }

  pensar(dt) {
    const j = this.jogo;
    const vivos = j.unidades.filter((u) => u.fac === EIXO);
    this.reserva = this.reserva.filter((u) => u.vivo && !u.dentro);
    // 1) produção
    if (vivos.length < 260) {
      for (const e of j.estruturas) {
        if (!e.vivo || e.fac !== EIXO || e.construindo || e.fila.length || !PESOS[e.tipo]) continue;
        const t = sortear(PESOS[e.tipo]);
        if (j.dinheiro[EIXO] >= TIPOS[t].custo * 0.8) {
          j.dinheiro[EIXO] -= TIPOS[t].custo * 0.8;
          e.fila.push({ tipo: t, resta: TIPOS[t].tempo * 1.2 });
        }
      }
    }
    j.dinheiro[EIXO] += 25 * this.dif * dt / 60;
    // 2) contra-ataque: junta a reserva e ataca a cidade aliada/neutra mais próxima
    this.tempoAtaque += dt;
    if (this.reserva.length >= 8 && this.tempoAtaque > 90) {
      this.tempoAtaque = 0;
      const grupo = this.reserva.splice(0, 14);
      const cx = grupo.reduce((a, u) => a + u.x, 0) / grupo.length;
      const cz = grupo.reduce((a, u) => a + u.z, 0) / grupo.length;
      let alvo = null, md = 1e12;
      for (const c of j.cidades) {
        if (c.dono === EIXO) continue;
        const d = Math.hypot(c.x - cx, c.z - cz);
        if (d < md && d < 250000) { md = d; alvo = c; }
      }
      for (const e of j.estruturas) {
        if (e.fac !== ALIADOS || !e.vivo) continue;
        const d = Math.hypot(e.x - cx, e.z - cz);
        if (d < md) { md = d; alvo = e; }
      }
      if (alvo) {
        j.ordenarMover(grupo, alvo.x, alvo.z, true);
        if (md < 120000) j.msg(`⚠ Inteligência: o Eixo prepara um ataque contra ${alvo.nome}!`);
      }
    }
    // 3) defesa das cidades com tropas aliadas por perto
    for (const c of j.cidades) {
      if (c.dono !== EIXO && c.ctrl < 50) continue;
      const inim = j.perto(c.x, c.z, 2500, (e) => e.fac === ALIADOS && !e.est && (e.cat === 'inf' || e.cat === 'veh'));
      if (!inim.length) continue;
      const def = j.perto(c.x, c.z, 12000, (a) => a.fac === EIXO && !a.est && !a.dentro && !a.ordem && (a.cat === 'inf' || a.cat === 'veh'));
      for (const a of def.slice(0, 12)) a.ordem = { t: 'mover', x: inim[0].x, z: inim[0].z, agressivo: true };
    }
    // 4) guardas voltam ao posto quando ficam livres e longe
    for (const u of vivos) {
      if (u.guarda && !u.ordem && !u.voa && Math.hypot(u.guarda.x - u.x, u.guarda.z - u.z) > 400 &&
        !u.alvos.some((a) => a && a.vivo)) u.ordem = { t: 'mover', x: u.guarda.x, z: u.guarda.z, agressivo: true };
    }
    // 5) aviação: caças decolam para interceptar aviões aliados perto das bases; bombardeiros atacam estruturas
    for (const u of vivos) {
      if (!u.voa || u.ordem || u.dentro) continue;
      if (u.estado === 'pousado') {
        const ameaca = j.perto(u.x, u.z, 15000, (e) => e.fac === ALIADOS && e.voa && e.estado === 'voando');
        if (ameaca.length && u.def.armas.some((w) => w.alvos.includes('a')) && !u.def.bombardeiro) {
          u.ordem = { t: 'atacar', alvo: ameaca[0] };
        } else if (u.def.bombardeiro && Math.random() < 0.05) {
          const est = j.estruturas.filter((e) => e.fac === ALIADOS && e.vivo);
          if (est.length) {
            est.sort((a, b) => Math.hypot(a.x - u.x, a.z - u.z) - Math.hypot(b.x - u.x, b.z - u.z));
            if (Math.hypot(est[0].x - u.x, est[0].z - u.z) < 400000) u.ordem = { t: 'atacar', alvo: est[0] };
          }
        }
      } else if (u.estado === 'voando' && !u.cacar && Math.random() < 0.1) {
        // volta para casa depois de um tempo patrulhando
        const base = j.estruturaMaisProxima(u, EIXO, 'aerodromo');
        if (base && Math.hypot(base.x - u.x, base.z - u.z) > 30000) u.ordem = { t: 'pousar', alvo: base };
      }
    }
  }
}
