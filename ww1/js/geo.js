'use strict';
// Combinador de geometrias: junta centenas de peças em uma malha (poucas chamadas de desenho no celular).
(function () {
  const _m = new THREE.Matrix4(), _n = new THREE.Matrix3(), _v = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _e = new THREE.Euler();

  const prims = {};
  WW1.prim = {
    box: () => prims.box || (prims.box = new THREE.BoxGeometry(1, 1, 1)),
    cyl: () => prims.cyl || (prims.cyl = new THREE.CylinderGeometry(0.5, 0.5, 1, 8, 1)),
    cylHi: () => prims.cylHi || (prims.cylHi = new THREE.CylinderGeometry(0.5, 0.5, 1, 14, 1)),
    sph: () => prims.sph || (prims.sph = new THREE.SphereGeometry(0.5, 12, 8)),
    lowSph: () => prims.lowSph || (prims.lowSph = new THREE.SphereGeometry(0.5, 9, 6)),
  };

  class GeoBuilder {
    constructor(withColor) {
      this.pos = []; this.nor = []; this.uv = []; this.col = []; this.idx = [];
      this.withColor = !!withColor;
      this.count = 0;
    }
    add(geo, matrix, color, uvScale) {
      const p = geo.attributes.position, n = geo.attributes.normal, uv = geo.attributes.uv;
      _n.getNormalMatrix(matrix);
      const off = this.count, us = uvScale || 1;
      for (let i = 0; i < p.count; i++) {
        _v.fromBufferAttribute(p, i).applyMatrix4(matrix);
        this.pos.push(_v.x, _v.y, _v.z);
        _v.fromBufferAttribute(n, i).applyMatrix3(_n).normalize();
        this.nor.push(_v.x, _v.y, _v.z);
        if (uv) this.uv.push(uv.getX(i) * us, uv.getY(i) * us); else this.uv.push(0, 0);
        if (this.withColor) { const c = color || [1, 1, 1]; this.col.push(c[0] ** 2.2, c[1] ** 2.2, c[2] ** 2.2); } // cores sRGB -> lineares
      }
      if (geo.index) { const ix = geo.index.array; for (let i = 0; i < ix.length; i++) this.idx.push(ix[i] + off); }
      else for (let i = 0; i < p.count; i++) this.idx.push(i + off);
      this.count += p.count;
      return this;
    }
    // Caixa: centro, tamanho, rotação (Euler em graus ou quaternion)
    box(x, y, z, sx, sy, sz, rot, color, uvScale) {
      return this.add(WW1.prim.box(), WW1.trs(x, y, z, rot, sx, sy, sz), color, uvScale);
    }
    // Cilindro entre dois pontos
    cyl(a, b, r, color, hi) {
      const d = _v.set(b.x - a.x, b.y - a.y, b.z - a.z);
      const len = d.length();
      if (len < 0.001) return this;
      _q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.clone().divideScalar(len));
      _m.compose(new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2), _q, _s.set(r * 2, len, r * 2));
      return this.add(hi ? WW1.prim.cylHi() : WW1.prim.cyl(), _m.clone(), color);
    }
    // Tronco de cone entre dois pontos (membros), com raios diferentes nas pontas
    seg(a, b, r0, r1, color, sides) {
      const d = new THREE.Vector3(b.x - a.x, b.y - a.y, b.z - a.z);
      const len = d.length();
      if (len < 0.001) return this;
      const g = new THREE.CylinderGeometry(r1, r0, len, sides || 8, 1);
      const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), d.divideScalar(len));
      this.add(g, new THREE.Matrix4().compose(new THREE.Vector3((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2), q, new THREE.Vector3(1, 1, 1)), color);
      g.dispose();
      return this;
    }
    // Esfera (juntas, cabeça, mãos)
    ball(x, y, z, sx, sy, sz, color, rot) {
      return this.add(WW1.prim.sph(), WW1.trs(x, y, z, rot || null, sx * 2, (sy || sx) * 2, (sz || sx) * 2), color);
    }
    build() {
      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(this.pos, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(this.nor, 3));
      g.setAttribute('uv', new THREE.Float32BufferAttribute(this.uv, 2));
      if (this.withColor) g.setAttribute('color', new THREE.Float32BufferAttribute(this.col, 3));
      g.setIndex(this.count > 65000 ? new THREE.Uint32BufferAttribute(this.idx, 1) : new THREE.Uint16BufferAttribute(this.idx, 1));
      g.computeBoundingSphere();
      g.computeBoundingBox();
      return g;
    }
    mesh(material, cast, receive) {
      const m = new THREE.Mesh(this.build(), material);
      m.castShadow = cast !== false;
      m.receiveShadow = receive !== false;
      m.matrixAutoUpdate = false;
      m.updateMatrix();
      return m;
    }
  }
  WW1.GeoBuilder = GeoBuilder;

  WW1.trs = function (x, y, z, rot, sx, sy, sz) {
    if (rot instanceof THREE.Quaternion) _q.copy(rot);
    else if (rot) _q.setFromEuler(_e.set(rot[0] * Math.PI / 180, rot[1] * Math.PI / 180, rot[2] * Math.PI / 180, 'YXZ'));
    else _q.identity();
    if (sx === undefined) sx = 1;
    if (sy === undefined) sy = sx;
    if (sz === undefined) sz = sx;
    return new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), _q, new THREE.Vector3(sx, sy, sz));
  };

  // Extrusão de perfil convexo (z,y) com largura em x (casco do tanque)
  WW1.extrude = function (profile, width) {
    const shape = new THREE.Shape(profile.map(p => new THREE.Vector2(p[0], p[1])));
    const g = new THREE.ExtrudeGeometry(shape, { depth: width, bevelEnabled: false });
    // a forma fica no plano XY e é extrudada em Z; giramos para perfil no plano ZY e largura em X
    g.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -width / 2));
    g.applyMatrix4(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    return g;
  };
})();
