// Modo piloto (batalha aérea): você pilota um caça/bombardeiro em 3ª pessoa sobre o mapa de satélite.
// Joystick virtual à esquerda (manche), acelerador e botão de tiro à direita. Teclado: setas/WASD, Shift/Ctrl, Espaço, B.
import * as THREE from 'three';
import { chao } from './relevo.js';
import { motorAviao, tocar } from './audio.js';
import { EIXO } from './jogo.js';

const vF = new THREE.Vector3(), vU = new THREE.Vector3(), vR = new THREE.Vector3();
const qTmp = new THREE.Quaternion();
const X = new THREE.Vector3(1, 0, 0), Y = new THREE.Vector3(0, 1, 0), Z = new THREE.Vector3(0, 0, 1);

export class Piloto {
  constructor(jogo, camera, fx, el) {
    this.jogo = jogo; this.cam = camera; this.fx = fx; this.el = el;
    this.u = null;
    this.q = new THREE.Quaternion();
    this.manche = { x: 0, y: 0 };
    this.acel = 0.85;
    this.atirando = false;
    this.cd = 0;
    this.camPos = new THREE.Vector3();
    this.camUp = new THREE.Vector3(0, 1, 0);
    this.teclas = new Set();
    this._ligarControles();
  }

  get ativo() { return !!this.u; }

  _ligarControles() {
    const area = this.el.querySelector('#manche');
    const bola = this.el.querySelector('#mancheBola');
    let id = null, cx = 0, cy = 0;
    const raio = 60;
    area.addEventListener('pointerdown', (e) => {
      id = e.pointerId; area.setPointerCapture(id);
      const r = area.getBoundingClientRect();
      cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      mover(e);
    });
    const mover = (e) => {
      if (e.pointerId !== id) return;
      let dx = e.clientX - cx, dy = e.clientY - cy;
      const d = Math.hypot(dx, dy);
      if (d > raio) { dx *= raio / d; dy *= raio / d; }
      this.manche.x = dx / raio; this.manche.y = dy / raio;
      bola.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    area.addEventListener('pointermove', mover);
    const soltar = (e) => {
      if (e.pointerId !== id) return;
      id = null; this.manche.x = this.manche.y = 0; bola.style.transform = '';
    };
    area.addEventListener('pointerup', soltar);
    area.addEventListener('pointercancel', soltar);
    const fogo = this.el.querySelector('#btnFogo');
    fogo.addEventListener('pointerdown', (e) => { e.preventDefault(); this.atirando = true; });
    fogo.addEventListener('pointerup', () => { this.atirando = false; });
    fogo.addEventListener('pointerleave', () => { this.atirando = false; });
    this.el.querySelector('#btnBomba').addEventListener('click', () => this.bomba());
    const acel = this.el.querySelector('#acelerador');
    acel.addEventListener('input', () => { this.acel = acel.value / 100; });
    window.addEventListener('keydown', (e) => this.teclas.add(e.key.toLowerCase()));
    window.addEventListener('keyup', (e) => this.teclas.delete(e.key.toLowerCase()));
  }

  iniciar(u) {
    this.u = u;
    u.pilotado = true;
    u.ordem = null;
    if (u.dentro) this.jogo.desembarcarUm(u.dentro, u, 0);
    if (u.estado === 'pousado') {
      // decolagem do aeródromo: começa na cabeceira da pista
      const g = chao(u.x, u.z, false) ?? 0;
      if (u.parque) {
        const p = u.parque;
        u.x = p.x + Math.cos(p.hd) * 40 + Math.sin(p.hd) * 330; // ponta da pista
        u.z = p.z - Math.sin(p.hd) * 40 + Math.cos(p.hd) * 330;
        u.hd = p.hd + Math.PI;
        p.estacionados = Math.max(0, p.estacionados - 1);
        u.parque = null;
      }
      u.y = g + 4;
      u.v = u.def.vel * 0.55;
      u.pitch = 0.12;
      u.estado = 'voando';
    }
    if (!u.v) u.v = u.def.vel * 0.8;
    this.q.setFromEuler(new THREE.Euler(-(u.pitch || 0), u.hd, u.bank || 0, 'YXZ'));
    u.quat = this.q;
    this.camPos.set(u.x - Math.sin(u.hd) * 40, u.y + 10, u.z - Math.cos(u.hd) * 40);
    this.el.classList.remove('escondido');
    this.el.querySelector('#btnBomba').style.display = u.def.bombardeiro ? '' : 'none';
    this.el.querySelector('#acelerador').value = Math.round(this.acel * 100);
    motorAviao(true, 1, u.def.jato);
  }

  parar() {
    const u = this.u;
    if (!u) return;
    this.u = null;
    motorAviao(false);
    this.el.classList.add('escondido');
    if (u.vivo) {
      const e = new THREE.Euler().setFromQuaternion(this.q, 'YXZ');
      u.hd = e.y; u.pitch = -e.x; u.bank = 0;
      u.pilotado = false;
      u.quat = null;
      u.orbita = { x: u.x + Math.sin(u.hd) * 1500, z: u.z + Math.cos(u.hd) * 1500 };
    }
  }

  bomba() {
    const u = this.u;
    if (!u || !u.def.bombardeiro || (this.cdBomba || 0) > 0) return;
    this.cdBomba = 1.2;
    const w = u.def.armas.find((a) => a.bomba);
    const g = chao(u.x, u.z, false) ?? 0;
    const t = Math.sqrt(2 * Math.max(10, u.y - g) / 9.8);
    // a bomba cai à frente (inércia do avião)
    this.jogo.eventos.push({ t, w, fac: u.fac, x: u.x + Math.sin(u.hd) * u.v * t, y: g, z: u.z + Math.cos(u.hd) * u.v * t, de: u });
  }

  atualizar(dt) {
    const u = this.u;
    if (!u) return;
    if (!u.vivo) { this.parar(); return; }
    const k = this.teclas;
    let mx = this.manche.x, my = this.manche.y;
    if (k.has('a') || k.has('arrowleft')) mx = -1;
    if (k.has('d') || k.has('arrowright')) mx = 1;
    if (k.has('w') || k.has('arrowup')) my = -1;
    if (k.has('s') || k.has('arrowdown')) my = 1;
    if (k.has('shift')) this.acel = Math.min(1.2, this.acel + dt * 0.5);
    if (k.has('control')) this.acel = Math.max(0.3, this.acel - dt * 0.5);
    const tiro = this.atirando || k.has(' ');
    if (k.has('b')) this.bomba();
    const d = u.def;
    const agil = d.bombardeiro ? 0.45 : d.cap ? 0.55 : 1;
    // rotações locais: arfagem (puxar = nariz para cima) e rolagem
    qTmp.setFromAxisAngle(X, -my * 1.4 * agil * dt);
    this.q.multiply(qTmp);
    qTmp.setFromAxisAngle(Z, mx * 2.4 * agil * dt);
    this.q.multiply(qTmp);
    vF.copy(Z).applyQuaternion(this.q);
    vU.copy(Y).applyQuaternion(this.q);
    vR.copy(X).applyQuaternion(this.q);
    // curva coordenada: a inclinação das asas faz o avião virar
    // +X do modelo é a asa esquerda: asa esquerda para cima (vR.y > 0) = inclinado para a direita
    const inclinacao = Math.asin(THREE.MathUtils.clamp(vR.y, -1, 1));
    qTmp.setFromAxisAngle(Y, -inclinacao * 0.9 * agil * dt);
    this.q.premultiply(qTmp);
    // auto-nivelamento suave sem comando
    if (Math.abs(mx) < 0.05) {
      qTmp.setFromAxisAngle(Z, -Math.sin(inclinacao) * 0.6 * dt);
      this.q.multiply(qTmp);
    }
    this.q.normalize();
    vF.copy(Z).applyQuaternion(this.q);
    // velocidade: acelerador + gravidade em subida/descida
    const alvoV = d.vel * this.acel;
    u.v += (alvoV - u.v) * 0.35 * dt - vF.y * 9.8 * dt * 0.7;
    u.v = THREE.MathUtils.clamp(u.v, d.vel * 0.25, d.vel * 1.5);
    if (u.v < d.vel * 0.38) { // estol: nariz cai
      qTmp.setFromAxisAngle(X, 0.8 * dt);
      this.q.multiply(qTmp);
    }
    u.x += vF.x * u.v * dt;
    u.y += vF.y * u.v * dt;
    u.z += vF.z * u.v * dt;
    u.hd = Math.atan2(vF.x, vF.z);
    u.pitch = Math.asin(THREE.MathUtils.clamp(vF.y, -1, 1));
    const g = chao(u.x, u.z, true) ?? 0;
    if (u.y < g + 3) {
      this.jogo.msg('💥 O avião caiu!');
      this.jogo._matar(u);
      this.parar();
      return;
    }
    // tiro
    this.cd -= dt;
    this.cdBomba = (this.cdBomba || 0) - dt;
    const arma = d.armas.find((w) => !w.bomba);
    if (tiro && arma && this.cd <= 0) {
      this.cd = Math.max(0.07, arma.cad * 0.8);
      this._atirar(u, arma);
    }
    // câmera de perseguição
    const dist = Math.max(18, d.tam * 2.2);
    const desejado = new THREE.Vector3(u.x, u.y, u.z).addScaledVector(vF, -dist).addScaledVector(vU, d.tam * 0.45);
    this.camPos.lerp(desejado, 1 - Math.exp(-dt * 6));
    this.cam.position.copy(this.camPos);
    this.camUp.lerp(vU, 1 - Math.exp(-dt * 3)).normalize();
    this.cam.up.copy(this.camUp);
    this.cam.lookAt(u.x + vF.x * 60, u.y + vF.y * 60, u.z + vF.z * 60);
    this.cam.near = 0.5;
    this.cam.far = 120000;
    this.cam.updateProjectionMatrix();
    motorAviao(true, 0.7 + this.acel * 0.5, d.jato);
    this._hud(u, g);
  }

  _atirar(u, arma) {
    vF.copy(Z).applyQuaternion(this.q);
    vR.copy(X).applyQuaternion(this.q);
    const j = this.jogo;
    // melhor alvo dentro de um cone estreito à frente
    let melhor = null, ma = 0.045;
    for (const e of j.perto(u.x, u.z, arma.alc, (e) => e.fac !== u.fac && !e.dentro)) {
      const dx = e.x - u.x, dy = (e.y + (e.est ? 3 : 1)) - u.y, dz = e.z - u.z;
      const dd = Math.hypot(dx, dy, dz);
      if (dd > arma.alc) continue;
      const ang = Math.acos(THREE.MathUtils.clamp((dx * vF.x + dy * vF.y + dz * vF.z) / dd, -1, 1));
      const tol = e.voa && e.estado === 'voando' ? 0.06 : 0.035;
      if (ang < tol && ang < ma + 0.02) { ma = ang; melhor = e; }
    }
    for (const lado of [-1, 1]) {
      const boca = new THREE.Vector3(u.x, u.y, u.z).addScaledVector(vR, lado * u.def.tam * 0.25);
      const fim = melhor ? new THREE.Vector3(melhor.x, melhor.y + 1, melhor.z) : boca.clone().addScaledVector(vF, arma.alc);
      fim.x += (Math.random() - 0.5) * 4; fim.y += (Math.random() - 0.5) * 4;
      this.fx.tracante(boca, fim, 0xffe08a);
    }
    tocar('mg', 0);
    if (melhor && Math.random() < 0.55) {
      j._dano(melhor, arma, arma.dano * 1.2, u);
      this.fx.clarao(new THREE.Vector3(melhor.x, melhor.y + 1, melhor.z), melhor.voa ? 3 : 2);
      if (!melhor.vivo) j.msg(`🎯 Abatido: ${melhor.def.nome}`);
    }
  }

  _hud(u, g) {
    const h = this.el;
    h.querySelector('#hudVel').textContent = Math.round(u.v * 3.6) + ' km/h';
    h.querySelector('#hudAlt').textContent = Math.round(u.y - g) + ' m';
    h.querySelector('#hudVida').style.width = Math.max(0, u.hp / u.hpMax * 100) + '%';
    // indicador do inimigo aéreo mais próximo
    let alvo = null, md = 1e9;
    for (const e of this.jogo.unidades) {
      if (e.fac === u.fac || !e.voa || e.estado !== 'voando') continue;
      const d = Math.hypot(e.x - u.x, e.z - u.z, e.y - u.y);
      if (d < md) { md = d; alvo = e; }
    }
    const mk = h.querySelector('#hudAlvo');
    if (alvo && md < 30000) {
      const p = new THREE.Vector3(alvo.x, alvo.y, alvo.z).project(this.cam);
      const w = window.innerWidth, hh = window.innerHeight;
      let sx = (p.x * 0.5 + 0.5) * w, sy = (-p.y * 0.5 + 0.5) * hh;
      const atras = p.z > 1;
      if (atras) { sx = w - sx; sy = hh - sy; }
      const fora = atras || sx < 0 || sx > w || sy < 0 || sy > hh;
      sx = THREE.MathUtils.clamp(sx, 30, w - 30);
      sy = THREE.MathUtils.clamp(sy, 60, hh - 30);
      mk.style.display = 'block';
      mk.style.left = sx + 'px';
      mk.style.top = sy + 'px';
      mk.className = fora ? 'fora' : '';
      mk.textContent = (alvo.fac === EIXO ? '' : '') + (md > 1000 ? (md / 1000).toFixed(1) + ' km' : Math.round(md) + ' m');
    } else mk.style.display = 'none';
  }
}
