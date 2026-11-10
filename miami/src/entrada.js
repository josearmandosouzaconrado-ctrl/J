// Câmera de estratégia (arrastar, pinça, girar) e comandos por toque/mouse
import * as THREE from 'three';
import { G } from './estado.js';
import { LARG, ALT, predioEm, predios } from './mapa.js';
import { clamp, lerp, dist, dist2 } from './util.js';
import {
  ordenar, ordenarMover, marcarSelecao, cabe, desembarcar, sairDoPredio, chaoEm, ordenarAreaJatos,
} from './unidades.js';
import { somUI, iniciarSom } from './som.js';

const ray = new THREE.Raycaster();
const plano = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
const v3 = new THREE.Vector3(), v2 = new THREE.Vector2();

export class CameraRTS {
  constructor(cam) {
    this.cam = cam;
    this.alvo = { x: 0, z: 0 };
    this.dist = 700; this.yaw = 0.35; this.inclExtra = 0;
    this.seguir = null;
    this.tremor = 0;
  }
  pitch() {
    const t = clamp((Math.log(this.dist) - Math.log(25)) / (Math.log(6000) - Math.log(25)), 0, 1);
    return clamp(lerp(0.42, 1.25, t) + this.inclExtra, 0.2, 1.45);
  }
  aplicar(dt) {
    if (this.seguir) {
      const u = this.seguir;
      if (!u.vivo) this.seguir = null;
      else { this.alvo.x += (u.x - this.alvo.x) * Math.min(1, dt * 6); this.alvo.z += (u.z - this.alvo.z) * Math.min(1, dt * 6); }
    }
    this.alvo.x = clamp(this.alvo.x, -2000, LARG + 2000);
    this.alvo.z = clamp(this.alvo.z, -2000, ALT + 2000);
    const p = this.pitch();
    const y0 = this.seguir ? (this.seguir.y || 0) : 0;
    const c = this.cam;
    let tx = 0, tz = 0;
    if (G.tremor > 0.01) { tx = (Math.random() - 0.5) * G.tremor * 3; tz = (Math.random() - 0.5) * G.tremor * 3; G.tremor *= Math.max(0, 1 - dt * 5); }
    c.position.set(
      this.alvo.x + Math.sin(this.yaw) * Math.cos(p) * this.dist + tx,
      y0 + Math.sin(p) * this.dist,
      this.alvo.z + Math.cos(this.yaw) * Math.cos(p) * this.dist + tz,
    );
    // não deixa a câmera entrar nos prédios
    let hmax = 0;
    for (const f of [1, 0.85, 0.7]) {
      const px = this.alvo.x + (c.position.x - this.alvo.x) * f, pz = this.alvo.z + (c.position.z - this.alvo.z) * f;
      for (const [ox, oz] of [[0, 0], [4, 0], [-4, 0], [0, 4], [0, -4]]) {
        const pr = predioEm(px + ox, pz + oz);
        if (pr && pr.h > hmax) hmax = pr.h;
      }
    }
    if (c.position.y < hmax + 6) c.position.y = hmax + 6;
    c.lookAt(this.alvo.x, y0, this.alvo.z);
    c.near = Math.max(0.5, this.dist * 0.01);
    c.far = Math.max(12000, this.dist * 6);
    c.updateProjectionMatrix();
    G.camAlvo = this.alvo; G.camDist = this.dist;
  }
  // ponto do chão sob a tela (coordenadas em pixels)
  chao(sx, sy, y = 0) {
    v2.set((sx / innerWidth) * 2 - 1, -(sy / innerHeight) * 2 + 1);
    ray.setFromCamera(v2, this.cam);
    plano.constant = -y;
    const r = ray.ray.intersectPlane(plano, v3);
    return r ? { x: r.x, z: r.z } : null;
  }
  irPara(x, z, distAlvo) { this.alvo.x = x; this.alvo.z = z; if (distAlvo) this.dist = distAlvo; this.seguir = null; }
}

export function telaDe(x, y, z, cam) {
  v3.set(x, y, z).project(cam);
  if (v3.z > 1) return null;
  return { x: (v3.x + 1) / 2 * innerWidth, y: (1 - v3.y) / 2 * innerHeight };
}

// ---------------- toque / mouse ----------------
export function configurarEntrada(canvas, camRTS) {
  const ptrs = new Map();
  let arrasto = null, pinca = null, pressao = null, caixa = null, ultimoToque = { t: 0, u: null };
  G.modoCaixa = false;

  canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  canvas.addEventListener('pointerdown', (e) => {
    iniciarSom();
    canvas.setPointerCapture(e.pointerId);
    ptrs.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), botao: e.button });
    if (ptrs.size === 1) {
      const ch = camRTS.chao(e.clientX, e.clientY);
      arrasto = { ch, moveu: false, girar: e.button === 2 };
      // jatos selecionados: arrastar marca a área de bombardeio
      if (G.modoArea && e.button !== 2 && ch && G.selecao.some((u) => u.classe === 'jato')) {
        G.area = { x0: ch.x, z0: ch.z, x1: ch.x, z1: ch.z };
        return;
      }
      if (G.modoCaixa || e.shiftKey) caixa = { x0: e.clientX, y0: e.clientY, x1: e.clientX, y1: e.clientY };
      else {
        clearTimeout(pressao);
        pressao = setTimeout(() => {
          // pressão longa: começa a seleção em caixa
          const p = ptrs.values().next().value;
          if (p && ptrs.size === 1 && Math.hypot(p.x - p.x0, p.y - p.y0) < 12) {
            caixa = { x0: p.x0, y0: p.y0, x1: p.x, y1: p.y };
            if (navigator.vibrate) navigator.vibrate(25);
          }
        }, 450);
      }
    } else if (ptrs.size === 2) {
      clearTimeout(pressao);
      caixa = null;
      const [a, b] = [...ptrs.values()];
      pinca = { d: Math.hypot(a.x - b.x, a.y - b.y), ang: Math.atan2(b.y - a.y, b.x - a.x), mx: (a.x + b.x) / 2, my: (a.y + b.y) / 2, dist: camRTS.dist, yaw: camRTS.yaw };
      arrasto = null;
    }
  });
  canvas.addEventListener('pointermove', (e) => {
    const p = ptrs.get(e.pointerId);
    if (!p) return;
    p.x = e.clientX; p.y = e.clientY;
    if (G.area && ptrs.size === 1) {
      const ch = camRTS.chao(p.x, p.y);
      if (ch) { G.area.x1 = ch.x; G.area.z1 = ch.z; }
      if (Math.hypot(p.x - p.x0, p.y - p.y0) > 10 && arrasto) arrasto.moveu = true;
      return;
    }
    if (caixa && ptrs.size === 1) { caixa.x1 = p.x; caixa.y1 = p.y; G.caixa = caixa; return; }
    if (ptrs.size === 1 && arrasto) {
      if (Math.hypot(p.x - p.x0, p.y - p.y0) > 10) { arrasto.moveu = true; clearTimeout(pressao); }
      if (!arrasto.moveu) return;
      if (arrasto.girar) {
        camRTS.yaw -= e.movementX * 0.006;
        camRTS.inclExtra = clamp(camRTS.inclExtra - e.movementY * 0.004, -0.3, 0.3);
        return;
      }
      camRTS.seguir = null;
      const ch = camRTS.chao(p.x, p.y);
      if (ch && arrasto.ch) {
        camRTS.alvo.x += arrasto.ch.x - ch.x;
        camRTS.alvo.z += arrasto.ch.z - ch.z;
        camRTS.aplicar(0);
        arrasto.ch = camRTS.chao(p.x, p.y);
      }
    } else if (ptrs.size === 2 && pinca) {
      const [a, b] = [...ptrs.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y), ang = Math.atan2(b.y - a.y, b.x - a.x);
      camRTS.dist = clamp(pinca.dist * pinca.d / Math.max(10, d), 25, 6000);
      camRTS.yaw = pinca.yaw - (ang - pinca.ang);
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      // arrastar com dois dedos para cima/baixo inclina
      const dy = my - pinca.my;
      if (Math.abs(d - pinca.d) < 40) camRTS.inclExtra = clamp(camRTS.inclExtra + (dy - (pinca.ultDy || 0)) * 0.003, -0.3, 0.3);
      pinca.ultDy = dy;
    }
  });
  const fim = (e) => {
    const p = ptrs.get(e.pointerId);
    clearTimeout(pressao);
    if (!p) return;
    ptrs.delete(e.pointerId);
    if (G.area) {
      const a = G.area;
      G.area = null;
      const L = Math.hypot(a.x1 - a.x0, a.z1 - a.z0);
      const jatos = G.selecao.filter((u) => u.classe === 'jato' && u.vivo);
      if (L > 25 && jatos.length) {
        const w = Math.max(40, Math.min(160, L * 0.35));
        ordenarAreaJatos(jatos, a.x0, a.z0, a.x1, a.z1, w);
        G.areaMarcada = { ...a, w, t: performance.now() };
        G.ui && G.ui.alerta(`🎯 Área de bombardeio marcada (${Math.round(L)} m). ${jatos.length > 1 ? jatos.length + ' jatos' : 'Jato'} a caminho!`, (a.x0 + a.x1) / 2, (a.z0 + a.z1) / 2, 'info');
        somUI('ok');
        if (ptrs.size === 0) { pinca = null; arrasto = null; }
        return;
      }
      // toque curto: ataque num ponto (comportamento normal)
    }
    if (caixa) {
      selecionarCaixa(caixa, camRTS, e.shiftKey);
      caixa = null; G.caixa = null;
      if (G.modoCaixa && G.ui) G.ui.modoCaixa(false);
      return;
    }
    if (ptrs.size === 0 && arrasto && !arrasto.moveu && !pinca) {
      if (e.button === 2) { G.selecao.slice().forEach((u) => marcarSelecao(u, false)); G.selecao = []; G.ui && G.ui.atualizarSelecao(); }
      else {
        const agora = performance.now();
        toque(p.x, p.y, camRTS, agora - ultimoToque.t < 330, ultimoToque);
        ultimoToque.t = agora;
      }
    }
    if (ptrs.size === 0) { pinca = null; arrasto = null; }
  };
  canvas.addEventListener('pointerup', fim);
  canvas.addEventListener('pointercancel', fim);
  canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
    camRTS.dist = clamp(camRTS.dist * Math.exp(e.deltaY * 0.0012), 25, 6000);
  }, { passive: false });
  const teclas = new Set();
  addEventListener('keydown', (e) => {
    teclas.add(e.key.toLowerCase());
    if (e.key === ' ') { G.pausado = !G.pausado; G.ui && G.ui.atualizarTopo(); }
    if (e.key === 'Escape') { G.selecao.slice().forEach((u) => marcarSelecao(u, false)); G.selecao = []; G.ui && G.ui.atualizarSelecao(); }
  });
  addEventListener('keyup', (e) => teclas.delete(e.key.toLowerCase()));
  G.teclado = (dt) => {
    let dx = 0, dz = 0;
    if (G.controlando) {
      // WASD controla a unidade
      const j = { x: 0, z: 0 };
      if (teclas.has('w') || teclas.has('arrowup')) j.z -= 1;
      if (teclas.has('s') || teclas.has('arrowdown')) j.z += 1;
      if (teclas.has('a') || teclas.has('arrowleft')) j.x -= 1;
      if (teclas.has('d') || teclas.has('arrowright')) j.x += 1;
      if (j.x || j.z) G.joyTeclado = j; else G.joyTeclado = null;
      return;
    }
    if (teclas.has('w') || teclas.has('arrowup')) dz -= 1;
    if (teclas.has('s') || teclas.has('arrowdown')) dz += 1;
    if (teclas.has('a') || teclas.has('arrowleft')) dx -= 1;
    if (teclas.has('d') || teclas.has('arrowright')) dx += 1;
    if (teclas.has('q')) camRTS.yaw += dt * 1.5;
    if (teclas.has('e')) camRTS.yaw -= dt * 1.5;
    if (dx || dz) {
      const v = camRTS.dist * 1.2 * dt, s = Math.sin(camRTS.yaw), c = Math.cos(camRTS.yaw);
      camRTS.alvo.x += (dx * c + dz * s) * v;
      camRTS.alvo.z += (-dx * s + dz * c) * v;
      camRTS.seguir = null;
    }
  };
}

export function ligarModoAreaSeJatos() {
  const so = G.selecao.length && G.selecao.every((u) => u.classe === 'jato');
  if (so && !G.modoArea && G.ui) G.ui.alerta('🎯 Arraste o dedo no mapa para marcar a área que os jatos vão bombardear (ou toque num ponto)', null, null, 'info');
  G.modoArea = !!so;
}

function selecionarCaixa(cx, camRTS, somar) {
  const x0 = Math.min(cx.x0, cx.x1), x1 = Math.max(cx.x0, cx.x1), y0 = Math.min(cx.y0, cx.y1), y1 = Math.max(cx.y0, cx.y1);
  if (!somar) { G.selecao.slice().forEach((u) => marcarSelecao(u, false)); G.selecao = []; }
  const achados = [];
  for (const u of G.unidades) {
    if (!u.vivo || u.estr || u.dentro || u.tipo === 'portaavioes' || u.policia) continue;
    const t = telaDe(u.x, u.y + 1, u.z, camRTS.cam);
    if (t && t.x >= x0 && t.x <= x1 && t.y >= y0 && t.y <= y1) achados.push(u);
  }
  // se a caixa pegou infantaria e veículos, prefere as tropas que se movem por terra
  for (const u of achados) if (!G.selecao.includes(u)) { G.selecao.push(u); marcarSelecao(u, true); }
  if (achados.length) somUI('clique');
  ligarModoAreaSeJatos();
  G.ui && G.ui.atualizarSelecao();
}

// unidade aliada mais próxima do toque (na tela)
function unidadeNoToque(sx, sy, cam, filtro) {
  let melhor = null, md = Infinity;
  for (const u of G.unidades) {
    if (!u.vivo || u.dentro || u.policia) continue;
    if (filtro && !filtro(u)) continue;
    const t = telaDe(u.x, u.y + (u.classe === 'inf' ? 1 : (u.d.raio || 2) * 0.4), u.z, cam);
    if (!t) continue;
    // raio na tela proporcional ao tamanho da unidade
    const pr = telaDe(u.x + (u.d.raio || 1) * Math.cos(G.cam.yaw), u.y, u.z - (u.d.raio || 1) * Math.sin(G.cam.yaw), cam);
    const rTela = pr ? Math.hypot(pr.x - t.x, pr.y - t.y) : 0;
    const lim = Math.max(26, rTela * 1.1);
    const d = Math.hypot(t.x - sx, t.y - sy);
    if (d < lim && d - rTela * 0.5 < md) { md = d - rTela * 0.5; melhor = u; }
  }
  return melhor;
}

function zumbiNoToque(sx, sy, cam) {
  const ch = G.cam.chao(sx, sy);
  if (!ch) return null;
  const r = Math.max(6, G.cam.dist * 0.03);
  let melhor = null, md = Infinity;
  G.hashA.busca(ch.x, ch.z, r, (a, d2) => { if (a.zumbi && a.vivo && a.estado !== 'morto' && d2 < md) { md = d2; melhor = a; } });
  return melhor;
}

function predioNoToque(sx, sy, cam) {
  v2.set((sx / innerWidth) * 2 - 1, -(sy / innerHeight) * 2 + 1);
  ray.setFromCamera(v2, cam);
  const hits = ray.intersectObjects(G.malhasPredios || [], false);
  if (hits.length) {
    const h = hits[0];
    const n = h.face ? h.face.normal : { x: 0, y: 1, z: 0 };
    const p = predioEm(h.point.x - n.x * 0.6, h.point.z - n.z * 0.6);
    if (p) return p;
  }
  // blocos da base (sem malha própria)
  const ch = G.cam.chao(sx, sy);
  if (ch) { const p = predioEm(ch.x, ch.z); if (p) return p; }
  return null;
}

function toque(sx, sy, camRTS, duplo, ultimo) {
  const cam = camRTS.cam;
  if (G.construindo) {
    const ch = camRTS.chao(sx, sy);
    if (ch && G.construir(G.construindo, ch.x, ch.z)) { G.construindo = null; G.ui.atualizarConstrucao(); }
    return;
  }
  const sel = G.selecao.filter((u) => u.vivo && !u.dentro);
  G.selecao = sel;
  const u = unidadeNoToque(sx, sy, cam);
  // toque numa unidade aliada
  if (u && !u.estr) {
    // com tropas selecionadas, tocar num transporte = embarcar
    const passageiros = sel.filter((s) => s !== u && cabe(u, s));
    if (sel.length && u.d.carga && passageiros.length && !sel.includes(u)) {
      ordenar(passageiros, { tipo: 'embarcar', t: u });
      if (u.classe === 'aereo' && !u.pousado) u.ordem = { tipo: 'pousar' };
      G.ui.ping(u.x, u.z, 'embarque');
      somUI('ok');
      return;
    }
    // aeronaves selecionadas + toque no porta-aviões = pousar no convés
    if (u.tipo === 'portaavioes' && sel.length && sel.some((s) => s.classe === 'aereo')) {
      let k = -120;
      for (const s of sel) if (s.classe === 'aereo') { s.ordem = { tipo: 'pousarPorta', k }; s.altAlvo = s.d.altCruz; k += 30; }
      const navios = sel.filter((s) => s.classe === 'naval');
      if (navios.length) ordenarMover(navios, u.x + 120, u.z);
      G.ui.ping(u.x, u.z, 'mover');
      somUI('ok');
      return;
    }
    if (duplo && ultimo.u === u) {
      // toque duplo: todas do mesmo tipo visíveis
      for (const o of G.unidades) {
        if (o.tipo !== u.tipo || !o.vivo || o.dentro || G.selecao.includes(o)) continue;
        const t = telaDe(o.x, o.y, o.z, cam);
        if (t && t.x > 0 && t.y > 0 && t.x < innerWidth && t.y < innerHeight) { G.selecao.push(o); marcarSelecao(o, true); }
      }
    } else if (G.selecaoMultipla) {
      if (G.selecao.includes(u)) { G.selecao.splice(G.selecao.indexOf(u), 1); marcarSelecao(u, false); }
      else { G.selecao.push(u); marcarSelecao(u, true); }
    } else {
      G.selecao.slice().forEach((o) => marcarSelecao(o, false));
      G.selecao = [u]; marcarSelecao(u, true);
    }
    ultimo.u = u;
    somUI('clique');
    ligarModoAreaSeJatos();
    G.ui.atualizarSelecao();
    return;
  }
  if (u && u.estr && !sel.length) { G.fonteSel = u; if (['quartel', 'patio', 'heliporto', 'docas'].includes(u.tipoEstr)) G.ui.abrirProducao(u.tipoEstr); else G.ui.alerta(`${u.d.nome}${u.construindo > 0 ? ' (em construção)' : ''}`, u.x, u.z, 'info'); return; }
  if (!sel.length) {
    // sem seleção: tocar num prédio mostra informações
    const p = predioNoToque(sx, sy, cam);
    if (p) G.ui.infoPredio(p);
    return;
  }
  // comandos
  const z = zumbiNoToque(sx, sy, cam);
  if (z) {
    const atac = sel.filter((s) => s.d.arma && s.classe !== 'jato');
    ordenar(atac, { tipo: 'atacar', alvo: z });
    const jatos = sel.filter((s) => s.classe === 'jato');
    if (jatos.length) ordenarMover(jatos, z.x, z.z);
    G.ui.ping(z.x, z.z, 'atacar');
    somUI('ok');
    return;
  }
  const p = predioNoToque(sx, sy, cam);
  if (p) {
    const inf = sel.filter((s) => s.classe === 'inf');
    const aereos = sel.filter((s) => s.classe === 'aereo');
    const outros = sel.filter((s) => s.classe !== 'inf' && s.classe !== 'aereo');
    if (p.civis > 0) {
      ordenar(sel.filter((s) => s.classe === 'inf' || s.classe === 'veic'), { tipo: 'resgatar', predio: p });
      ordenar(aereos.filter((s) => s.d.carga), { tipo: 'resgatar', predio: p });
      const resto = aereos.filter((s) => !s.d.carga).concat(outros.filter((s) => s.classe !== 'veic'));
      if (resto.length) ordenarMover(resto, p.cx, p.cz);
      G.ui.ping(p.cx, p.cz, 'resgate');
    } else {
      if (inf.length) ordenar(inf, { tipo: 'guarnecer', predio: p });
      const resto = aereos.concat(outros);
      if (resto.length) ordenarMover(resto, p.cx, p.cz);
      G.ui.ping(p.cx, p.cz, inf.length ? 'guarnecer' : 'mover');
    }
    somUI('ok');
    return;
  }
  const ch = camRTS.chao(sx, sy);
  if (ch) {
    ordenarMover(sel, ch.x, ch.z);
    G.ui.ping(ch.x, ch.z, sel.some((s) => s.classe === 'jato') && sel.every((s) => s.classe === 'jato') ? 'atacar' : 'mover');
    somUI('ok');
  }
}
