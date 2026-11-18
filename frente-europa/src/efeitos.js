// Efeitos: traçantes, explosões, fumaça, clarões e paraquedas.
import * as THREE from 'three';

function texturaRadial(stops) {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  stops.forEach(([p, cor]) => gr.addColorStop(p, cor));
  g.fillStyle = gr;
  g.fillRect(0, 0, 64, 64);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export class Efeitos {
  constructor(cena) {
    this.cena = cena;
    // traçantes: um único LineSegments com 400 segmentos
    this.maxT = 400;
    this.tPos = new Float32Array(this.maxT * 6);
    this.tCor = new Float32Array(this.maxT * 6);
    this.tVida = new Float32Array(this.maxT);
    this.tOrig = new Float64Array(this.maxT * 6);
    this.tI = 0;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(this.tPos, 3).setUsage(THREE.DynamicDrawUsage));
    g.setAttribute('color', new THREE.BufferAttribute(this.tCor, 3).setUsage(THREE.DynamicDrawUsage));
    this.linhas = new THREE.LineSegments(g, new THREE.LineBasicMaterial({
      vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false,
    }));
    this.linhas.frustumCulled = false;
    this.linhas.renderOrder = 5;
    cena.add(this.linhas);
    this.texFogo = texturaRadial([[0, 'rgba(255,255,220,1)'], [0.25, 'rgba(255,190,60,0.95)'], [0.6, 'rgba(230,80,20,0.5)'], [1, 'rgba(120,20,0,0)']]);
    this.texFumaca = texturaRadial([[0, 'rgba(90,88,84,0.9)'], [0.6, 'rgba(70,68,64,0.5)'], [1, 'rgba(60,60,60,0)']]);
    this.sprites = [];
    this.pool = [];
    this.origem = new THREE.Vector3(); // para traçantes perto da câmera (precisão)
    this.linhas.position.copy(this.origem);
  }

  _sprite(tex, aditivo) {
    let s = this.pool.pop();
    if (!s) {
      s = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false }));
      this.cena.add(s);
    }
    s.material.map = tex;
    s.material.blending = aditivo ? THREE.AdditiveBlending : THREE.NormalBlending;
    s.material.needsUpdate = true;
    s.visible = true;
    return s;
  }

  tracante(a, b, cor = 0xffd27a) {
    const i = this.tI;
    this.tI = (this.tI + 1) % this.maxT;
    const o = this.tOrig;
    o[i * 6] = a.x; o[i * 6 + 1] = a.y; o[i * 6 + 2] = a.z;
    o[i * 6 + 3] = b.x; o[i * 6 + 4] = b.y; o[i * 6 + 5] = b.z;
    const c = new THREE.Color(cor);
    for (let k = 0; k < 2; k++) {
      this.tCor[i * 6 + k * 3] = c.r * (k ? 1 : 0.4);
      this.tCor[i * 6 + k * 3 + 1] = c.g * (k ? 1 : 0.4);
      this.tCor[i * 6 + k * 3 + 2] = c.b * (k ? 1 : 0.4);
    }
    this.tVida[i] = 0.12;
  }

  explosao(p, tam = 6, fumaca = true) {
    const s = this._sprite(this.texFogo, true);
    s.position.set(p.x, p.y + tam * 0.4, p.z);
    s.scale.setScalar(tam);
    this.sprites.push({ s, vida: 0.5, max: 0.5, cresce: tam * 2.2, sobe: 0 });
    if (fumaca) {
      for (let k = 0; k < (tam > 20 ? 4 : 2); k++) {
        const f = this._sprite(this.texFumaca, false);
        f.position.set(p.x + (Math.random() - 0.5) * tam, p.y + tam * 0.3, p.z + (Math.random() - 0.5) * tam);
        f.scale.setScalar(tam * 0.8);
        this.sprites.push({ s: f, vida: 3 + Math.random() * 2, max: 5, cresce: tam * 0.8, sobe: tam * 0.25 });
      }
    }
  }

  clarao(p, tam = 1.2) {
    const s = this._sprite(this.texFogo, true);
    s.position.copy(p);
    s.scale.setScalar(tam);
    this.sprites.push({ s, vida: 0.06, max: 0.06, cresce: 0, sobe: 0 });
  }

  atualizar(dt, camPos) {
    // traçantes relativos a um ponto perto da câmera (evita tremer com coordenadas de 1000 km)
    this.origem.set(Math.round(camPos.x / 1000) * 1000, 0, Math.round(camPos.z / 1000) * 1000);
    this.linhas.position.copy(this.origem);
    const o = this.tOrig;
    for (let i = 0; i < this.maxT; i++) {
      if (this.tVida[i] > 0) {
        this.tVida[i] -= dt;
        for (let k = 0; k < 2; k++) {
          this.tPos[i * 6 + k * 3] = o[i * 6 + k * 3] - this.origem.x;
          this.tPos[i * 6 + k * 3 + 1] = o[i * 6 + k * 3 + 1];
          this.tPos[i * 6 + k * 3 + 2] = o[i * 6 + k * 3 + 2] - this.origem.z;
        }
        if (this.tVida[i] <= 0) this.tPos.fill(0, i * 6, i * 6 + 6);
      }
    }
    this.linhas.geometry.attributes.position.needsUpdate = true;
    this.linhas.geometry.attributes.color.needsUpdate = true;
    for (let i = this.sprites.length - 1; i >= 0; i--) {
      const e = this.sprites[i];
      e.vida -= dt;
      if (e.vida <= 0) {
        e.s.visible = false;
        this.pool.push(e.s);
        this.sprites.splice(i, 1);
        continue;
      }
      const t = 1 - e.vida / e.max;
      e.s.material.opacity = Math.min(1, e.vida / e.max * 1.6);
      e.s.scale.setScalar(e.s.scale.x + e.cresce * dt / e.max);
      e.s.position.y += e.sobe * dt;
      e.s.material.rotation = t;
    }
  }
}

// Paraquedas simples (cúpula branca) para os paraquedistas
let geoPara = null;
export function paraquedas() {
  if (!geoPara) geoPara = new THREE.SphereGeometry(3.5, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2);
  const m = new THREE.Mesh(geoPara, new THREE.MeshLambertMaterial({ color: 0xe8e4d4, side: THREE.DoubleSide }));
  m.position.y = 6;
  m.scale.y = 0.6;
  m.name = 'Paraquedas';
  return m;
}
