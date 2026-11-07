// Efeitos visuais: traçantes, clarões, explosões, fumaça, sangue e respingos
import * as THREE from 'three';

const MAXP = 4000, MAXT = 600;

export class Efeitos {
  constructor(cena) {
    // partículas
    this.pos = new Float32Array(MAXP * 3);
    this.cor = new Float32Array(MAXP * 4);
    this.tam = new Float32Array(MAXP);
    this.vel = new Float32Array(MAXP * 3);
    this.vida = new Float32Array(MAXP);
    this.vidaMax = new Float32Array(MAXP);
    this.cresce = new Float32Array(MAXP);
    this.grav = new Float32Array(MAXP);
    this.corIni = new Float32Array(MAXP * 3);
    this.corFim = new Float32Array(MAXP * 3);
    this.livre = [];
    for (let i = MAXP - 1; i >= 0; i--) this.livre.push(i);
    this.ativos = [];
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.pos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('cor', new THREE.BufferAttribute(this.cor, 4).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('tam', new THREE.BufferAttribute(this.tam, 1).setUsage(THREE.DynamicDrawUsage));
    this.geo = g;
    const mat = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false,
      uniforms: { escala: { value: 600 } },
      vertexShader: `attribute vec4 cor; attribute float tam; varying vec4 vC; uniform float escala;
        void main(){ vC = cor; vec4 mv = modelViewMatrix * vec4(position,1.0); gl_PointSize = clamp(tam * escala / -mv.z, 1.0, 256.0); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `varying vec4 vC; void main(){ vec2 d = gl_PointCoord - 0.5; float r = dot(d,d); if (r > 0.25) discard; gl_FragColor = vec4(vC.rgb, vC.a * (1.0 - r*3.2)); }`,
    });
    this.matP = mat;
    this.pontos = new THREE.Points(g, mat);
    this.pontos.frustumCulled = false;
    this.pontos.renderOrder = 5;
    cena.add(this.pontos);
    // traçantes
    this.tPos = new Float32Array(MAXT * 6);
    this.tCor = new Float32Array(MAXT * 6);
    this.tVida = new Float32Array(MAXT);
    this.tn = 0;
    const tg = new THREE.BufferGeometry();
    tg.setAttribute('position', new THREE.BufferAttribute(this.tPos, 3).setUsage(THREE.DynamicDrawUsage));
    tg.setAttribute('color', new THREE.BufferAttribute(this.tCor, 3).setUsage(THREE.DynamicDrawUsage));
    this.tgeo = tg;
    this.linhas = new THREE.LineSegments(tg, new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.9 }));
    this.linhas.frustumCulled = false;
    this.linhas.renderOrder = 4;
    cena.add(this.linhas);
  }

  particula(x, y, z, vx, vy, vz, tam, vida, c0, c1, alfa = 1, grav = 0, cresce = 0) {
    if (!this.livre.length) return;
    const i = this.livre.pop();
    this.ativos.push(i);
    this.pos[i * 3] = x; this.pos[i * 3 + 1] = y; this.pos[i * 3 + 2] = z;
    this.vel[i * 3] = vx; this.vel[i * 3 + 1] = vy; this.vel[i * 3 + 2] = vz;
    this.tam[i] = tam; this.vida[i] = vida; this.vidaMax[i] = vida; this.grav[i] = grav; this.cresce[i] = cresce;
    this.corIni[i * 3] = c0[0]; this.corIni[i * 3 + 1] = c0[1]; this.corIni[i * 3 + 2] = c0[2];
    this.corFim[i * 3] = c1[0]; this.corFim[i * 3 + 1] = c1[1]; this.corFim[i * 3 + 2] = c1[2];
    this.cor[i * 4 + 3] = alfa;
    this.alfa0 = alfa;
    this.cor[i * 4] = c0[0]; this.cor[i * 4 + 1] = c0[1]; this.cor[i * 4 + 2] = c0[2];
  }

  tracante(x0, y0, z0, x1, y1, z1, cor = [1, 0.85, 0.4]) {
    const i = this.tn++ % MAXT;
    this.tPos.set([x0, y0, z0, x1, y1, z1], i * 6);
    this.tCor.set([cor[0], cor[1], cor[2], cor[0] * 0.6, cor[1] * 0.6, cor[2] * 0.6], i * 6);
    this.tVida[i] = 0.07;
  }

  clarao(x, y, z, tam = 1.2) {
    this.particula(x, y, z, 0, 0, 0, tam, 0.06, [1, 0.95, 0.6], [1, 0.6, 0.2], 1);
  }

  explosao(x, y, z, raio = 6, agua = false) {
    const n = Math.min(40, 8 + raio * 2);
    for (let k = 0; k < n; k++) {
      const a = Math.random() * 6.28, v = Math.random() * raio * 2.2;
      this.particula(x, y + 0.5, z, Math.cos(a) * v, Math.random() * raio * 2, Math.sin(a) * v, raio * (0.5 + Math.random() * 0.5), 0.35 + Math.random() * 0.3, [1, 0.85, 0.35], [0.9, 0.25, 0.05], 1, -2, raio * 0.8);
    }
    for (let k = 0; k < n * 0.7; k++) {
      const a = Math.random() * 6.28, v = Math.random() * raio * 0.7;
      const c = agua ? [0.85, 0.92, 1] : [0.35, 0.33, 0.3];
      this.particula(x + Math.cos(a) * raio * 0.3, y + Math.random() * raio * 0.5, z + Math.sin(a) * raio * 0.3, Math.cos(a) * v, raio * 0.4 + Math.random() * 3, Math.sin(a) * v, raio * 0.9, 1.6 + Math.random() * 1.6, c, agua ? [0.7, 0.8, 0.9] : [0.15, 0.15, 0.15], 0.75, agua ? 9 : -0.6, raio * 0.9);
    }
    if (agua) {
      for (let k = 0; k < 18; k++) {
        const a = Math.random() * 6.28;
        this.particula(x, 0.3, z, Math.cos(a) * 3, 8 + Math.random() * raio * 3, Math.sin(a) * 3, 1.5, 1.4, [0.9, 0.95, 1], [0.6, 0.75, 0.9], 0.9, 14, 0.5);
      }
    }
  }

  fumaca(x, y, z, tam = 2, cor = [0.25, 0.25, 0.25]) {
    this.particula(x, y, z, (Math.random() - 0.5) * 1.5, 2 + Math.random() * 2, (Math.random() - 0.5) * 1.5, tam, 2.5, cor, [0.5, 0.5, 0.5], 0.5, -0.4, tam);
  }

  sangue(x, y, z, n = 5) {
    for (let k = 0; k < n; k++) {
      this.particula(x, y, z, (Math.random() - 0.5) * 4, Math.random() * 3, (Math.random() - 0.5) * 4, 0.35, 0.5, [0.55, 0.03, 0.03], [0.3, 0.0, 0.0], 1, 12, 0);
    }
  }

  poeira(x, z, n = 2) {
    for (let k = 0; k < n; k++) this.particula(x + (Math.random() - 0.5) * 2, 0.4, z + (Math.random() - 0.5) * 2, (Math.random() - 0.5), 0.8, (Math.random() - 0.5), 1.4, 1.0, [0.72, 0.66, 0.55], [0.8, 0.76, 0.68], 0.35, 0, 1.5);
  }

  esteira(x, y, z) {
    this.particula(x, y, z, 0, 0, 0, 1.6, 0.9, [1, 0.7, 0.4], [0.5, 0.5, 0.5], 0.6, 0, 3);
  }

  atualizar(dt, escalaTela) {
    this.matP.uniforms.escala.value = escalaTela;
    const A = this.ativos;
    for (let k = A.length - 1; k >= 0; k--) {
      const i = A[k];
      this.vida[i] -= dt;
      if (this.vida[i] <= 0) {
        this.tam[i] = 0; this.cor[i * 4 + 3] = 0;
        this.pos[i * 3 + 1] = -1000;
        A[k] = A[A.length - 1]; A.pop();
        this.livre.push(i);
        continue;
      }
      const t = 1 - this.vida[i] / this.vidaMax[i];
      this.vel[i * 3 + 1] -= this.grav[i] * dt;
      this.pos[i * 3] += this.vel[i * 3] * dt;
      this.pos[i * 3 + 1] += this.vel[i * 3 + 1] * dt;
      this.pos[i * 3 + 2] += this.vel[i * 3 + 2] * dt;
      if (this.pos[i * 3 + 1] < 0.1 && this.grav[i] > 0) { this.pos[i * 3 + 1] = 0.1; this.vel[i * 3] *= 0.5; this.vel[i * 3 + 2] *= 0.5; this.vel[i * 3 + 1] = 0; }
      this.vel[i * 3] *= 0.97; this.vel[i * 3 + 2] *= 0.97;
      this.tam[i] += this.cresce[i] * dt;
      for (let c = 0; c < 3; c++) this.cor[i * 4 + c] = this.corIni[i * 3 + c] + (this.corFim[i * 3 + c] - this.corIni[i * 3 + c]) * t;
      this.cor[i * 4 + 3] = Math.min(this.cor[i * 4 + 3], (1 - t) * 1.2);
    }
    const g = this.geo.attributes;
    g.position.needsUpdate = g.cor.needsUpdate = g.tam.needsUpdate = true;
    for (let i = 0; i < MAXT; i++) {
      if (this.tVida[i] > 0) {
        this.tVida[i] -= dt;
        if (this.tVida[i] <= 0) for (let c = 0; c < 6; c++) this.tPos[i * 6 + c] = 0;
      }
    }
    this.tgeo.attributes.position.needsUpdate = true;
    this.tgeo.attributes.color.needsUpdate = true;
  }
}
