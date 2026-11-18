// Câmera de estratégia: arrastar = mover, pinça = zoom, dois dedos = girar/inclinar.
// Mouse: arrastar com botão esquerdo = mover, direito = girar/inclinar, roda = zoom. Teclado: WASD/QE/RF.
import * as THREE from 'three';
import { chao } from './relevo.js';

export class CameraRTS {
  constructor(camera, dom) {
    this.cam = camera;
    this.dom = dom;
    this.alvo = new THREE.Vector3();
    this.dist = 3000;
    this.rumo = 0;
    this.inc = 0.85;
    this.ativo = true;
    this.ponteiros = new Map();
    this.teclas = new Set();
    this.aoTocar = null;      // (x, y) tela
    this.aoArrastarCaixa = null; // (x0,y0,x1,y1, fim)
    this.modoCaixa = false;
    this.seguir = null;
    this._ligar();
  }

  irPara(x, z, dist) {
    this.alvo.set(x, this.alvo.y, z);
    if (dist) this.dist = dist;
  }

  _ligar() {
    const d = this.dom;
    d.addEventListener('contextmenu', (e) => e.preventDefault());
    d.addEventListener('pointerdown', (e) => {
      d.setPointerCapture(e.pointerId);
      this.ponteiros.set(e.pointerId, { x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY, t0: performance.now(), botao: e.button });
      if (this.ponteiros.size === 2) this._gesto = null;
    });
    d.addEventListener('pointermove', (e) => {
      const p = this.ponteiros.get(e.pointerId);
      if (!p || !this.ativo) return;
      const dx = e.clientX - p.x, dy = e.clientY - p.y;
      p.x = e.clientX; p.y = e.clientY;
      if (Math.hypot(p.x - p.x0, p.y - p.y0) > 8) p.moveu = true;
      if (this.ponteiros.size === 1) {
        if (this.modoCaixa && p.botao === 0) {
          this.aoArrastarCaixa?.(p.x0, p.y0, p.x, p.y, false);
        } else if (p.botao === 2) {
          this.rumo -= dx * 0.005;
          this.inc = THREE.MathUtils.clamp(this.inc + dy * 0.004, 0.12, 1.5);
        } else if (p.moveu) {
          this._arrastar(dx, dy);
        }
      } else if (this.ponteiros.size === 2) {
        const [a, b] = [...this.ponteiros.values()];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        const ang = Math.atan2(b.y - a.y, b.x - a.x);
        const my = (a.y + b.y) / 2, mx = (a.x + b.x) / 2;
        if (this._gesto) {
          const g = this._gesto;
          this.dist = THREE.MathUtils.clamp(this.dist * g.dist / Math.max(10, dist), 12, 2.5e6);
          let da = ang - g.ang;
          if (da > Math.PI) da -= Math.PI * 2;
          if (da < -Math.PI) da += Math.PI * 2;
          this.rumo += da;
          this.inc = THREE.MathUtils.clamp(this.inc + (my - g.my) * 0.004, 0.12, 1.5);
          this._arrastar(mx - g.mx, 0);
        }
        this._gesto = { dist, ang, my, mx };
        a.moveu = b.moveu = true;
      }
    });
    const fim = (e) => {
      const p = this.ponteiros.get(e.pointerId);
      if (!p) return;
      this.ponteiros.delete(e.pointerId);
      if (this.ponteiros.size < 2) this._gesto = null;
      if (!this.ativo) return;
      if (this.modoCaixa && p.moveu && p.botao === 0) this.aoArrastarCaixa?.(p.x0, p.y0, p.x, p.y, true);
      else if (!p.moveu && performance.now() - p.t0 < 500 && e.type === 'pointerup') this.aoTocar?.(p.x, p.y, p.botao);
    };
    d.addEventListener('pointerup', fim);
    d.addEventListener('pointercancel', fim);
    d.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (!this.ativo) return;
      this.dist = THREE.MathUtils.clamp(this.dist * Math.exp(e.deltaY * 0.0012), 12, 2.5e6);
    }, { passive: false });
    window.addEventListener('keydown', (e) => { if (!e.target.closest('input')) this.teclas.add(e.key.toLowerCase()); });
    window.addEventListener('keyup', (e) => this.teclas.delete(e.key.toLowerCase()));
  }

  _arrastar(dx, dy) {
    this.seguir = null;
    const k = this.dist * 1.15 / this.dom.clientHeight;
    const s = Math.sin(this.rumo), c = Math.cos(this.rumo);
    // direita = (c, 0, -s); frente = (-s, 0, -c)
    this.alvo.x += -dx * k * c + dy * k * -s / Math.max(0.35, Math.sin(this.inc));
    this.alvo.z += dx * k * s + dy * k * -c / Math.max(0.35, Math.sin(this.inc));
  }

  atualizar(dt) {
    if (!this.ativo) return;
    const t = this.teclas;
    const v = this.dist * 0.9 * dt;
    const s = Math.sin(this.rumo), c = Math.cos(this.rumo);
    if (t.has('w') || t.has('arrowup')) { this.alvo.x -= s * v; this.alvo.z -= c * v; this.seguir = null; }
    if (t.has('s') || t.has('arrowdown')) { this.alvo.x += s * v; this.alvo.z += c * v; this.seguir = null; }
    if (t.has('a') || t.has('arrowleft')) { this.alvo.x -= c * v; this.alvo.z += s * v; this.seguir = null; }
    if (t.has('d') || t.has('arrowright')) { this.alvo.x += c * v; this.alvo.z -= s * v; this.seguir = null; }
    if (t.has('q')) this.rumo += dt * 1.2;
    if (t.has('e')) this.rumo -= dt * 1.2;
    if (t.has('r')) this.dist = Math.max(12, this.dist * (1 - dt * 1.5));
    if (t.has('f')) this.dist = Math.min(2.5e6, this.dist * (1 + dt * 1.5));
    if (this.seguir) {
      if (!this.seguir.vivo || this.seguir.dentro) this.seguir = null;
      else { this.alvo.x = this.seguir.x; this.alvo.z = this.seguir.z; }
    }
    // longe demais: olha mais de cima
    const incMin = this.dist > 400000 ? 1.25 : this.dist > 80000 ? 0.7 : 0.12;
    const inc = Math.max(this.inc, incMin);
    const g = chao(this.alvo.x, this.alvo.z, this.dist < 60000);
    if (g !== null) this.alvo.y += (g - this.alvo.y) * Math.min(1, dt * 4);
    if (this.seguir && this.seguir.voa) this.alvo.y = this.seguir.y;
    const cam = this.cam;
    cam.position.set(
      this.alvo.x + s * Math.cos(inc) * this.dist,
      this.alvo.y + Math.sin(inc) * this.dist,
      this.alvo.z + c * Math.cos(inc) * this.dist,
    );
    const gc = chao(cam.position.x, cam.position.z, false);
    if (gc !== null && cam.position.y < gc + 8) cam.position.y = gc + 8;
    cam.up.set(0, 1, 0);
    cam.lookAt(this.alvo);
    this.ajustarPlanos();
  }

  ajustarPlanos() {
    const cam = this.cam;
    const alt = Math.max(5, cam.position.y - (this.alvo.y || 0));
    cam.near = THREE.MathUtils.clamp(alt * 0.02, 0.3, 2000);
    cam.far = Math.max(60000, this.dist * 40, alt * 60);
    cam.updateProjectionMatrix();
  }
}
