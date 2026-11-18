// Controle direto em 3ª pessoa de soldados, veículos e navios (igual ao modo piloto dos aviões).
// Celular: joystick à esquerda (andar / dirigir), arrastar a tela para mirar, botões de FOGO à direita.
// PC: WASD/setas andam, arrastar o mouse mira, Espaço = arma principal, Shift = arma secundária.
import * as THREE from 'three';
import { chao, ehAgua } from './relevo.js';
import { tocar } from './audio.js';

const ray = new THREE.Raycaster();

export class ControleDireto {
  constructor(jogo, camera, fx, el, terreno) {
    this.jogo = jogo; this.cam = camera; this.fx = fx; this.el = el; this.terreno = terreno;
    this.u = null;
    this.stick = { x: 0, y: 0 };
    this.mira = { yaw: 0, pitch: -0.12 };
    this.fogo = [false, false];
    this.cds = [0, 0];
    this.vel = 0;
    this.teclas = new Set();
    this.camPos = new THREE.Vector3();
    this.ultimoOlhar = 0;
    this._ligar();
  }

  get ativo() { return !!this.u; }

  _ligar() {
    const area = this.el.querySelector('.manche');
    const bola = this.el.querySelector('.mancheBola');
    let id = null, cx = 0, cy = 0;
    const raio = 60;
    const mover = (e) => {
      if (e.pointerId !== id) return;
      let dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d > raio) { dx *= raio / d; dy *= raio / d; }
      this.stick.x = dx / raio; this.stick.y = -dy / raio; // para cima = frente
      bola.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    area.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      id = e.pointerId; area.setPointerCapture(id);
      const r = area.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      mover(e);
    });
    area.addEventListener('pointermove', mover);
    const soltar = (e) => { if (e.pointerId !== id) return; id = null; this.stick.x = this.stick.y = 0; bola.style.transform = ''; };
    area.addEventListener('pointerup', soltar);
    area.addEventListener('pointercancel', soltar);
    this.el.querySelectorAll('[data-fogo]').forEach((b) => {
      const k = +b.dataset.fogo;
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); e.stopPropagation(); this.fogo[k] = true; });
      b.addEventListener('pointerup', () => { this.fogo[k] = false; });
      b.addEventListener('pointerleave', () => { this.fogo[k] = false; });
    });
    // olhar / mirar: arrastar em qualquer lugar livre da tela
    const olhar = this.el.querySelector('.olhar');
    const ponteiros = new Map();
    olhar.addEventListener('pointerdown', (e) => { olhar.setPointerCapture(e.pointerId); ponteiros.set(e.pointerId, { x: e.clientX, y: e.clientY }); });
    olhar.addEventListener('pointermove', (e) => {
      const p = ponteiros.get(e.pointerId);
      if (!p) return;
      this.mira.yaw -= (e.clientX - p.x) * 0.006;
      this.mira.pitch = THREE.MathUtils.clamp(this.mira.pitch - (e.clientY - p.y) * 0.004, -0.6, 0.5);
      p.x = e.clientX; p.y = e.clientY;
      this.ultimoOlhar = performance.now();
    });
    const fim = (e) => ponteiros.delete(e.pointerId);
    olhar.addEventListener('pointerup', fim);
    olhar.addEventListener('pointercancel', fim);
    window.addEventListener('keydown', (e) => this.teclas.add(e.key.toLowerCase()));
    window.addEventListener('keyup', (e) => this.teclas.delete(e.key.toLowerCase()));
  }

  iniciar(u) {
    this.u = u;
    u.pilotado = true;
    u.ordem = null;
    this.vel = 0;
    this.mira.yaw = u.hd;
    this.mira.pitch = -0.1;
    const d = u.def;
    this.dist = u.cat === 'inf' ? 5.5 : Math.max(9, d.tam * 2.2);
    this.alt = u.cat === 'inf' ? 1.9 : Math.max(3, d.tam * 0.55);
    this.camPos.set(u.x - Math.sin(u.hd) * this.dist, u.y + this.alt + 2, u.z - Math.cos(u.hd) * this.dist);
    const b2 = this.el.querySelector('[data-fogo="1"]');
    b2.style.display = d.armas.length > 1 ? '' : 'none';
    if (d.armas[1]) b2.textContent = d.armas[1].n.split(' ')[0];
    this.el.querySelector('[data-fogo="0"]').textContent = d.armas[0] ? 'FOGO' : '—';
    this.el.classList.remove('escondido');
  }

  parar() {
    const u = this.u;
    this.u = null;
    this.el.classList.add('escondido');
    this.fogo = [false, false];
    if (u) { u.pilotado = false; u.torreMira = undefined; u.andando = false; }
  }

  atualizar(dt) {
    const u = this.u;
    if (!u) return;
    if (!u.vivo) { this.parar(); return; }
    const k = this.teclas;
    let sx = this.stick.x, sy = this.stick.y;
    if (k.has('a') || k.has('arrowleft')) sx = -1;
    if (k.has('d') || k.has('arrowright')) sx = 1;
    if (k.has('w') || k.has('arrowup')) sy = 1;
    if (k.has('s') || k.has('arrowdown')) sy = -1;
    if (k.has('q')) { this.mira.yaw += dt * 1.6; this.ultimoOlhar = performance.now(); }
    if (k.has('e')) { this.mira.yaw -= dt * 1.6; this.ultimoOlhar = performance.now(); }
    const d = u.def;
    if (u.cat === 'inf') this._andarSoldado(u, d, sx, sy, dt);
    else this._dirigir(u, d, sx, sy, dt);
    const g = u.cat === 'ship' ? 0 : chao(u.x, u.z, true);
    if (g !== null) u.y = g;
    // armas
    for (let i = 0; i < 2; i++) {
      this.cds[i] -= dt;
      const quer = this.fogo[i] || (i === 0 && k.has(' ')) || (i === 1 && k.has('shift'));
      const w = d.armas[i];
      if (quer && w && this.cds[i] <= 0) { this.cds[i] = w.cad; this._atirar(u, w); }
    }
    if (d.torre) u.torreMira = this.mira.yaw - u.hd;
    this._camera(u, dt);
    this._hud(u);
  }

  _andarSoldado(u, d, sx, sy, dt) {
    const mag = Math.min(1, Math.hypot(sx, sy));
    if (mag > 0.08) {
      // anda em relação à câmera
      const ang = this.mira.yaw + Math.atan2(-sx, sy);
      const v = d.vel * (mag > 0.85 ? 2.2 : 1.3) * mag;  // empurrar até o fim = correr
      const nx = u.x + Math.sin(ang) * v * dt, nz = u.z + Math.cos(ang) * v * dt;
      if (ehAgua(nx, nz, false) !== true) { u.x = nx; u.z = nz; }
      let da = ang - u.hd; da = Math.atan2(Math.sin(da), Math.cos(da));
      u.hd += Math.max(-8 * dt, Math.min(8 * dt, da));
      u.andando = true;
    } else {
      u.andando = false;
      // parado: vira para onde está mirando
      let da = this.mira.yaw - u.hd; da = Math.atan2(Math.sin(da), Math.cos(da));
      u.hd += Math.max(-5 * dt, Math.min(5 * dt, da));
    }
  }

  _dirigir(u, d, sx, sy, dt) {
    const max = d.vel * (u.cat === 'ship' ? 1 : 1.0);
    const alvoV = sy >= 0 ? sy * max : sy * max * 0.4;  // ré mais lenta
    const acel = u.cat === 'ship' ? 0.15 : 0.6;
    this.vel += (alvoV - this.vel) * Math.min(1, dt * acel * 2);
    // tanques giram parados; rodas e navios só giram andando
    const esteira = d.torre || u.tipo === 'm7';
    const fator = esteira ? 1 : Math.min(1, Math.abs(this.vel) / (max * 0.3 + 0.01));
    u.hd -= sx * d.giro * 1.2 * fator * dt * (this.vel < -0.1 ? -1 : 1);
    const nx = u.x + Math.sin(u.hd) * this.vel * dt, nz = u.z + Math.cos(u.hd) * this.vel * dt;
    const agua = ehAgua(nx, nz, false);
    const pode = u.cat === 'ship' ? agua !== false : agua !== true;
    if (pode) { u.x = nx; u.z = nz; } else this.vel *= -0.2;
    u.andando = Math.abs(this.vel) > 0.3;
    // câmera volta para trás do veículo quando o jogador não está mirando
    if (performance.now() - this.ultimoOlhar > 2500 && !d.torre) {
      let da = u.hd - this.mira.yaw; da = Math.atan2(Math.sin(da), Math.cos(da));
      this.mira.yaw += da * Math.min(1, dt * 2);
    }
  }

  _direcaoMira() {
    const cp = Math.cos(this.mira.pitch);
    return new THREE.Vector3(Math.sin(this.mira.yaw) * cp, Math.sin(this.mira.pitch), Math.cos(this.mira.yaw) * cp);
  }

  _camera(u, dt) {
    const f = this._direcaoMira();
    const alvo = new THREE.Vector3(u.x, u.y + this.alt, u.z);
    const desejado = alvo.clone().addScaledVector(f, -this.dist);
    desejado.x += Math.cos(this.mira.yaw) * (u.cat === 'inf' ? -0.8 : 0); // por cima do ombro
    desejado.z -= Math.sin(this.mira.yaw) * (u.cat === 'inf' ? -0.8 : 0);
    const g = chao(desejado.x, desejado.z, false) ?? u.y;
    desejado.y = Math.max(desejado.y, g + 1.2);
    this.camPos.lerp(desejado, 1 - Math.exp(-dt * 10));
    this.cam.position.copy(this.camPos);
    this.cam.up.set(0, 1, 0);
    this.cam.lookAt(alvo.clone().addScaledVector(f, 30));
    this.cam.near = 0.3;
    this.cam.updateProjectionMatrix();
  }

  // atira na direção da mira (centro da tela)
  _atirar(u, w) {
    const j = this.jogo;
    const f = this._direcaoMira();
    ray.set(this.cam.position, this.cam.getWorldDirection(new THREE.Vector3()));
    // alvo inimigo mais alinhado com a mira
    let melhor = null, ma = 0.06;
    for (const e of j.perto(u.x, u.z, w.alc, (e) => e.fac !== u.fac && !e.dentro)) {
      const p = new THREE.Vector3(e.x, e.y + (e.est ? 3 : e.voa ? 0 : 1.2), e.z);
      const v = p.clone().sub(this.cam.position);
      const ang = v.angleTo(ray.ray.direction);
      const tol = e.est ? 0.12 : e.cat === 'inf' ? 0.05 : 0.08;
      if (ang < tol && ang < ma + 0.03 && Math.hypot(e.x - u.x, e.z - u.z) <= w.alc) { ma = ang; melhor = e; }
    }
    if (melhor && (!w.alvos || w.alvos.includes(melhor.est ? 'b' : melhor.voa && melhor.estado === 'voando' ? 'a' : melhor.cat === 'ship' ? 's' : 't'))) {
      j._disparar(u, { ...w, prec: Math.min(0.95, w.prec * 1.6) }, melhor);
      return;
    }
    // sem alvo: tiro no ponto do chão sob a mira
    const hits = ray.intersectObjects(this.terreno.malhasVisiveis(), false);
    let ponto = hits.length ? hits[0].point : null;
    const boca = new THREE.Vector3(u.x, u.y + (u.cat === 'inf' ? 1.4 : u.def.tam * 0.25), u.z);
    if (!ponto || ponto.distanceTo(boca) > w.alc) ponto = boca.clone().addScaledVector(f, w.alc);
    const camD = 0;
    if (w.som) tocar(w.som, camD);
    if (w.area || w.perfura) {
      this.fx.clarao(boca, 2.5);
      const t = ponto.distanceTo(boca) / (w.fx === 'artilharia' ? 450 : 800);
      j.eventos.push({ t, w, fac: u.fac, x: ponto.x, y: ponto.y, z: ponto.z, alvo: null, de: u });
    } else {
      this.fx.tracante(boca, ponto, 0xffd27a);
      this.fx.clarao(boca, 0.8);
    }
  }

  _hud(u) {
    const h = this.el;
    const d = u.def;
    h.querySelector('.ctlNome').textContent = d.nome;
    h.querySelector('.ctlVida').style.width = Math.max(0, u.hp / u.hpMax * 100) + '%';
    const w0 = d.armas[0], w1 = d.armas[1];
    h.querySelector('.ctlArma').textContent = (w0 ? w0.n + (this.cds[0] > 0.3 ? ' (recarregando)' : '') : 'sem arma') +
      (w1 ? ' · ' + w1.n : '') + (u.cat !== 'inf' ? ' · ' + Math.round(Math.abs(this.vel) * 3.6) + ' km/h' : '');
    // inimigo mais próximo
    let alvo = null, md = 1e9;
    for (const e of this.jogo.perto(u.x, u.z, 1500, (e) => e.fac !== u.fac && !e.dentro)) {
      const dd = Math.hypot(e.x - u.x, e.z - u.z);
      if (dd < md) { md = dd; alvo = e; }
    }
    const mk = h.querySelector('.ctlAlvo');
    if (alvo) {
      const p = new THREE.Vector3(alvo.x, alvo.y + 1.5, alvo.z).project(this.cam);
      const W = window.innerWidth, H = window.innerHeight;
      let sx = (p.x * 0.5 + 0.5) * W, sy = (-p.y * 0.5 + 0.5) * H;
      const atras = p.z > 1;
      if (atras) { sx = W - sx; sy = H - sy; }
      const fora = atras || sx < 0 || sx > W || sy < 0 || sy > H;
      mk.style.display = 'block';
      mk.style.left = THREE.MathUtils.clamp(sx, 30, W - 30) + 'px';
      mk.style.top = THREE.MathUtils.clamp(sy, 60, H - 30) + 'px';
      mk.className = 'ctlAlvo' + (fora ? ' fora' : '');
      mk.textContent = Math.round(md) + ' m';
    } else mk.style.display = 'none';
  }
}
