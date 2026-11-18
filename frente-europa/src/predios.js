// Prédios 3D reais do OpenStreetMap (opcional, precisa de internet).
// Quando a câmera chega perto do chão, baixa os contornos dos prédios da região e levanta em 3D.
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { paraLatLon, paraMundo } from './geo.js';
import { chao } from './relevo.js';

const OVERPASS = 'https://overpass-api.de/api/interpreter';
const DLAT = 0.01, DLON = 0.015;

export class Predios {
  constructor(cena) {
    this.cena = cena;
    this.ligado = false;
    this.celulas = new Map();
    this.ocupado = false;
    this.mat = new THREE.MeshLambertMaterial({ color: 0xd9d0bf });
    this.erros = 0;
  }

  atualizar(alvo, dist) {
    if (!this.ligado || dist > 3000 || this.ocupado || this.erros > 5) return;
    const { lat, lon } = paraLatLon(alvo.x, alvo.z);
    const ci = Math.floor(lat / DLAT), cj = Math.floor(lon / DLON);
    // célula do centro primeiro, depois as vizinhas
    for (const [di, dj] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const k = (ci + di) + ',' + (cj + dj);
      if (!this.celulas.has(k)) { this._baixar(k, ci + di, cj + dj); return; }
    }
    // remove células longe
    for (const [k, c] of this.celulas) {
      if (c.malha && Math.hypot(c.malha.position.x - alvo.x, c.malha.position.z - alvo.z) > 8000) {
        this.cena.remove(c.malha);
        c.malha.geometry.dispose();
        this.celulas.delete(k);
      }
    }
  }

  async _baixar(k, ci, cj) {
    this.ocupado = true;
    const cel = { malha: null };
    this.celulas.set(k, cel);
    const s = ci * DLAT, w = cj * DLON, n = s + DLAT, e = w + DLON;
    const q = `[out:json][timeout:25];way["building"](${s},${w},${n},${e});out geom 4000;`;
    try {
      const r = await fetch(OVERPASS, { method: 'POST', body: 'data=' + encodeURIComponent(q) });
      if (!r.ok) throw new Error('overpass ' + r.status);
      const dados = await r.json();
      const c = paraMundo(s + DLAT / 2, w + DLON / 2);
      const geos = [];
      for (const el of dados.elements || []) {
        if (el.type !== 'way' || !el.geometry || el.geometry.length < 4) continue;
        const pts = el.geometry.map((p) => paraMundo(p.lat, p.lon));
        const forma = new THREE.Shape(pts.map((p) => new THREE.Vector2(p.x - c.x, -(p.z - c.z))));
        const t = el.tags || {};
        let h = parseFloat(t.height) || (parseFloat(t['building:levels']) || 0) * 3.2 || 9;
        h = Math.min(h, 320);
        const g = new THREE.ExtrudeGeometry(forma, { depth: h, bevelEnabled: false });
        g.rotateX(-Math.PI / 2);
        const cx = pts.reduce((a, p) => a + p.x, 0) / pts.length, cz = pts.reduce((a, p) => a + p.z, 0) / pts.length;
        const base = chao(cx, cz, true) ?? 0;
        g.translate(0, base - 1, 0);
        geos.push(g);
      }
      if (geos.length) {
        const g = mergeGeometries(geos, false);
        geos.forEach((x) => x.dispose());
        const m = new THREE.Mesh(g, this.mat);
        m.position.set(c.x, 0, c.z);
        this.cena.add(m);
        cel.malha = m;
      }
    } catch (err) {
      this.erros++;
      this.celulas.delete(k);
      console.warn('Prédios OSM indisponíveis', err);
    }
    setTimeout(() => { this.ocupado = false; }, 1500);
  }

  limpar() {
    for (const c of this.celulas.values()) if (c.malha) { this.cena.remove(c.malha); c.malha.geometry.dispose(); }
    this.celulas.clear();
  }
}
