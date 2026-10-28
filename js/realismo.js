'use strict';
/* =========================================================
   REALISMO DOS BLINDADOS
   - escala real (comprimento do casco em metros, soldado ≈ 1,8 m)
   - lagartas ocas com elos, guias e garras em relevo
   - rodas com pneu, disco abaulado e anel de parafusos; rodas motrizes dentadas
   - blindagem inclinada (casco/torre afunilados) e torres fundidas arredondadas
   - poeira nas superfícies horizontais, escorridos, pintura gasta e Zimmerit
   - kit de ferramentas, cabos de reboque, faróis, periscópios e elos sobressalentes
   ========================================================= */

/* ---------- escala real ---------- */
const REAL_L = { sherman: 5.84, panzer4: 5.92, tiger: 6.32, m10: 5.97, m36: 5.88, m7: 6.02, stug: 5.52, wirbelwind: 5.92 };
const ZIMMERIT = ['panzer4', 'tiger', 'panther', 'kingtiger', 'jagdpanther', 'stug'];
const _makeTankOrig = makeTank;
makeTank = function (kind) {
  const g = _makeTankOrig(kind);
  const real = REAL_L[kind];
  if (real && g.userData.L) { const k = real / g.userData.L; g.scale.setScalar(k); g.userData.L *= k; }
  // Zimmerit: pasta antimagnética das fábricas alemãs (set/1943 – set/1944)
  const y = SC.year || 1944;
  if (ZIMMERIT.includes(kind) && y >= 1943.65 && y < 1944.75) {
    const gun = g.userData.gun;
    g.traverse(o => { if (o.isMesh && o.material === VC_MAT && o !== gun) o.material = VC_MAT_Z; });
  }
  return g;
};

/* ---------- geometria: blindagem inclinada ---------- */
function _faceGeo(tris) {
  const pos = new Float32Array(tris.length * 9), nor = new Float32Array(tris.length * 9);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), n = new THREE.Vector3();
  tris.forEach((t, i) => {
    a.fromArray(t[0]); b.fromArray(t[1]); c.fromArray(t[2]);
    n.subVectors(c, b).cross(a.clone().sub(b)).normalize();
    for (let k = 0; k < 3; k++) { pos.set(t[k], i * 9 + k * 3); nor.set([n.x, n.y, n.z], i * 9 + k * 3); }
  });
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  return g;
}
// perfil lateral (z frente, y cima) com laterais inclinadas: largura wBot embaixo e wTop em cima
function taperProfile(pts, wBot, wTop) {
  let y0 = Infinity, y1 = -Infinity; for (const p of pts) { y0 = Math.min(y0, p[1]); y1 = Math.max(y1, p[1]); }
  const hw = (y) => lerp(wBot, wTop, (y - y0) / Math.max(1e-6, y1 - y0)) / 2;
  // sentido anti-horário no plano (z, y)
  let area = 0; for (let i = 0; i < pts.length; i++) { const p = pts[i], q = pts[(i + 1) % pts.length]; area += p[0] * q[1] - q[0] * p[1]; }
  const P = area < 0 ? pts.slice().reverse() : pts;
  const L = P.map(p => [-hw(p[1]), p[1], p[0]]), R = P.map(p => [hw(p[1]), p[1], p[0]]);
  const tris = [], idx = THREE.ShapeUtils.triangulateShape(P.map(p => new THREE.Vector2(p[0], p[1])), []);
  for (const [i, j, k] of idx) { tris.push([R[i], R[j], R[k]]); tris.push([L[k], L[j], L[i]]); }
  for (let i = 0; i < P.length; i++) { const j = (i + 1) % P.length; tris.push([L[i], L[j], R[j]], [L[i], R[j], R[i]]); }
  return _orient(tris);
}
// planta ([x, z]) em anéis [y, escala x, escala z, deslocamento z]: torres inclinadas ou fundidas
function loftPlan(pts, rings, smooth) {
  const n = pts.length, P = rings.map(([y, sx, sz, dz]) => pts.map(([x, z]) => [x * sx, y, z * sz + (dz || 0)]));
  const tris = [];
  for (let r = 0; r < rings.length - 1; r++) for (let i = 0; i < n; i++) {
    const a = P[r][i], b = P[r][(i + 1) % n], c = P[r + 1][(i + 1) % n], d = P[r + 1][i];
    tris.push([a, b, c], [a, c, d]);
  }
  for (const r of [0, rings.length - 1]) {
    let cx = 0, cz = 0; for (const p of P[r]) { cx += p[0]; cz += p[2]; } cx /= n; cz /= n;
    const c = [cx, P[r][0][1], cz];
    for (let i = 0; i < n; i++) tris.push([c, P[r][i], P[r][(i + 1) % n]]);
  }
  const g = _orient(tris);
  if (smooth) { const m = THREE.BufferGeometryUtils ? null : null; void m; smoothNormals(g, n * (rings.length - 1) * 6); }
  return g;
}
// vira os triângulos para fora (formas convexas por fatia)
function _orient(tris) {
  let cx = 0, cy = 0, cz = 0, k = 0;
  for (const t of tris) for (const v of t) { cx += v[0]; cy += v[1]; cz += v[2]; k++; }
  cx /= k; cy /= k; cz /= k;
  for (const t of tris) {
    const [a, b, c] = t, ux = b[0] - a[0], uy = b[1] - a[1], uz = b[2] - a[2], vx = c[0] - a[0], vy = c[1] - a[1], vz = c[2] - a[2];
    const nx = uy * vz - uz * vy, ny = uz * vx - ux * vz, nz = ux * vy - uy * vx;
    const mx = (a[0] + b[0] + c[0]) / 3 - cx, my = (a[1] + b[1] + c[1]) / 3 - cy, mz = (a[2] + b[2] + c[2]) / 3 - cz;
    if (nx * mx + ny * my * 0.25 + nz * mz < 0) { t[1] = c; t[2] = b; }
  }
  return _faceGeo(tris);
}
// normais suaves nas paredes laterais (aço fundido): média por posição
function smoothNormals(g, sideVerts) {
  const p = g.attributes.position, nrm = g.attributes.normal, acc = new Map(), key = (i) => p.getX(i).toFixed(3) + ',' + p.getY(i).toFixed(3) + ',' + p.getZ(i).toFixed(3);
  for (let i = 0; i < sideVerts; i++) { const k = key(i); const a = acc.get(k) || [0, 0, 0]; a[0] += nrm.getX(i); a[1] += nrm.getY(i); a[2] += nrm.getZ(i); acc.set(k, a); }
  for (let i = 0; i < sideVerts; i++) { const a = acc.get(key(i)), l = Math.hypot(a[0], a[1], a[2]) || 1; nrm.setXYZ(i, a[0] / l, a[1] / l, a[2] / l); }
}
// superelipse: plantas arredondadas de torres fundidas
function superPlan(w, d, n, k, frontK) {
  const pts = [];
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2, c = Math.cos(a), s = Math.sin(a), e = s > 0 ? (frontK || k) : k;
    pts.push([Math.sign(c) * Math.pow(Math.abs(c), 2 / e) * w / 2, Math.sign(s) * Math.pow(Math.abs(s), 2 / e) * d / 2]);
  }
  return pts;
}

/* ---------- lagartas: banda oca com elos em relevo ---------- */
TEX.track2 = canvasTex(256, 64, (g) => {
  g.fillStyle = '#1b1a17'; g.fillRect(0, 0, 256, 64);
  for (let x = 0; x < 256; x += 32) {
    const gr = g.createLinearGradient(x, 0, x + 28, 0); gr.addColorStop(0, '#34322c'); gr.addColorStop(0.5, '#4a473f'); gr.addColorStop(1, '#2c2a25');
    g.fillStyle = gr; g.fillRect(x + 1, 3, 27, 58);
    g.fillStyle = '#5f5b51'; g.fillRect(x + 11, 4, 6, 56);                       // garra
    g.fillStyle = '#6d695e'; g.fillRect(x + 12, 5, 2, 54);
    g.fillStyle = '#26241f'; g.fillRect(x + 4, 28, 20, 8);                        // furo da guia
    g.fillStyle = '#121110'; g.fillRect(x + 28, 0, 4, 64);                        // vão entre elos
    g.fillStyle = '#56524a'; for (const y of [8, 56]) { g.beginPath(); g.arc(x + 30, y, 2.4, 0, 6.3); g.fill(); }   // pinos
    for (let i = 0; i < 6; i++) { g.fillStyle = 'rgba(92,78,58,' + (0.25 + Math.random() * 0.3) + ')'; g.fillRect(x + Math.random() * 28, Math.random() * 60, 2 + Math.random() * 5, 2 + Math.random() * 4); }
  }
});
TEX.trackBump = canvasTex(256, 64, (g) => {
  g.fillStyle = '#000'; g.fillRect(0, 0, 256, 64);
  for (let x = 0; x < 256; x += 32) { g.fillStyle = '#707070'; g.fillRect(x + 1, 3, 27, 58); g.fillStyle = '#ffffff'; g.fillRect(x + 11, 4, 6, 56); g.fillStyle = '#303030'; g.fillRect(x + 4, 28, 20, 8); }
});
trackMaterial = function (rep) {
  const t = TEX.track2.clone(); t.needsUpdate = true; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set((rep || 1.2) * 0.5, 1);
  const b = TEX.trackBump.clone(); b.needsUpdate = true; b.wrapS = b.wrapT = THREE.RepeatWrapping; b.repeat.copy(t.repeat);
  return new THREE.MeshPhongMaterial({ map: t, bumpMap: b, bumpScale: 0.06, shininess: 28, specular: 0x2a2a26 });
};
function _loopPts(L, h, rs, ri, off) {
  const pts = [], arc = (cz, cy, r, a0, a1) => { for (let i = 0; i <= 10; i++) { const a = a0 + (a1 - a0) * i / 10; pts.push([cz + Math.cos(a) * (r - off), cy + Math.sin(a) * (r - off)]); } };
  pts.push([-L / 2 + ri * 1.6, 0.02 + off], [L / 2 - rs * 1.9, 0.02 + off]);
  arc(L / 2 - rs, h - rs, rs, -1.9, Math.PI / 2);
  // percurso de cima levemente caído entre os roletes
  const zA = L / 2 - rs, zB = -L / 2 + ri;
  for (let i = 1; i < 6; i++) { const z = lerp(zA, zB, i / 6); pts.push([z, h - off - Math.sin(i / 6 * Math.PI) * 0.05]); }
  arc(-L / 2 + ri, h - ri, ri, Math.PI / 2, Math.PI * 1.42);
  return pts;
}
trackLoop = function (L, h, rs, ri) {
  const sh = new THREE.Shape(), outer = _loopPts(L, h, rs, ri, 0), inner = _loopPts(L, h, rs, ri, 0.085);
  outer.forEach((p, i) => i ? sh.lineTo(p[0], p[1]) : sh.moveTo(p[0], p[1]));
  const hole = new THREE.Path(); inner.slice().reverse().forEach((p, i) => i ? hole.lineTo(p[0], p[1]) : hole.moveTo(p[0], p[1]));
  sh.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(sh, { depth: 1, bevelEnabled: false, steps: 1 });
  g.rotateY(-Math.PI / 2); g.translate(0.5, 0, 0);
  return g;
};

/* ---------- rodas, rodas motrizes dentadas ---------- */
const _SPROCKET_HUB = 0x3d3e36;
wheel = function (B, x, y, z, r, w, rubber, hub) {
  if (hub === _SPROCKET_HUB && r >= 0.28) { sprocket(B, x, y, z, r, w); return; }
  const sx = Math.sign(x) || 1;
  B.add(G.cyl12, rubber, r, w, r, x, y, z, 0, 0, Math.PI / 2);                                   // pneu de borracha
  B.add(G.cyl12, 0x161614, r * 0.86, w + 0.012, r * 0.86, x, y, z, 0, 0, Math.PI / 2);            // sulco entre pneu e aro
  B.add(G.cyl12, hub, r * 0.8, w + 0.03, r * 0.8, x, y, z, 0, 0, Math.PI / 2);                   // disco de aço
  B.add(G.flare, hub, r * 0.5, 0.06, r * 0.5, x + sx * (w / 2 + 0.03), y, z, 0, 0, -sx * Math.PI / 2);   // disco abaulado
  const nb = r > 0.3 ? 8 : 6;
  for (let i = 0; i < nb; i++) { const a = i / nb * Math.PI * 2; B.add(G.cyl6, 0x2c2b25, 0.025, 0.04, 0.025, x + sx * (w / 2 + 0.035), y + Math.cos(a) * r * 0.36, z + Math.sin(a) * r * 0.36, 0, 0, Math.PI / 2); }
  B.add(G.cyl8, 0x2a2924, r * 0.16, w + 0.16, r * 0.16, x, y, z, 0, 0, Math.PI / 2);              // cubo
};
function sprocket(B, x, y, z, r, w) {
  const sx = Math.sign(x) || 1, met = 0x3d3e36;
  B.add(G.cyl12, met, r * 0.92, w * 0.5, r * 0.92, x, y, z, 0, 0, Math.PI / 2);
  for (const o of [-1, 1]) B.add(G.cyl12, met, r * 0.95, 0.05, r * 0.95, x + o * w * 0.28, y, z, 0, 0, Math.PI / 2);
  const nt = 13;
  for (let i = 0; i < nt; i++) { const a = i / nt * Math.PI * 2; B.add(G.box, 0x4a4a42, w * 0.62, r * 0.16, r * 0.14, x, y + Math.cos(a) * r, z + Math.sin(a) * r, a, 0, 0); }
  B.add(G.flare, met, r * 0.45, 0.1, r * 0.45, x + sx * (w / 2 + 0.04), y, z, 0, 0, -sx * Math.PI / 2);
  for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2; B.add(G.cyl6, 0x262520, 0.028, 0.05, 0.028, x + sx * (w / 2 + 0.06), y + Math.cos(a) * r * 0.33, z + Math.sin(a) * r * 0.33, 0, 0, Math.PI / 2); }
  B.add(G.cyl8, 0x2a2924, r * 0.15, w + 0.2, r * 0.15, x, y, z, 0, 0, Math.PI / 2);
}

/* ---------- kit realista: ferramentas, cabos, faróis, periscópios, elos sobressalentes ---------- */
function toolKit(B, x, y, z, len, us) {
  const wood = 0x6e5434, steel = 0x3a3a34;
  B.add(G.cyl8, wood, 0.025, len * 0.7, 0.025, x, y, z - len * 0.1, Math.PI / 2, 0, 0);          // pá
  B.add(G.box, steel, 0.02, 0.2, 0.26, x, y, z + len * 0.3);
  B.add(G.cyl8, wood, 0.025, len * 0.55, 0.025, x + 0.09, y, z - len * 0.25, Math.PI / 2, 0, 0); // machado
  B.add(G.box, steel, 0.025, 0.15, 0.11, x + 0.09, y + 0.02, z);
  B.add(G.cyl8, steel, 0.018, len * 0.8, 0.018, x - 0.09, y, z, Math.PI / 2, 0, 0);              // pé de cabra
  for (const dz of [-len * 0.32, len * 0.18]) B.add(G.box, 0x2a2924, 0.26, 0.03, 0.04, x, y + 0.025, z + dz);   // presilhas
  if (!us) { B.add(G.cyl12, 0x2e2e2a, 0.07, 0.42, 0.07, x, y + 0.02, z - len * 0.6, Math.PI / 2, 0, 0); }       // macaco
}
function towCable(B, x, y, z0, z1) {
  const n = 10, len = Math.abs(z1 - z0);
  for (let i = 0; i < n; i++) { const z = lerp(z0, z1, (i + 0.5) / n); B.add(G.cyl8, 0x3b3a34, 0.03, len / n * 1.02, 0.03, x, y + Math.sin(i * 1.7) * 0.008, z, Math.PI / 2, 0, 0); }
  for (const z of [z0, z1]) B.add(G.torus, 0x3b3a34, 0.09, 0.09, 0.6, x, y, z, 0, Math.PI / 2, 0);
}
function boschLight(B, x, y, z) {
  B.add(G.cyl12, 0x2e2f2a, 0.1, 0.16, 0.1, x, y, z, Math.PI / 2, 0, 0);
  B.add(G.dome, 0x2e2f2a, 0.1, 0.07, 0.1, x, y, z - 0.08, -Math.PI / 2, 0, 0);
  B.add(G.box, 0xc9c2a0, 0.12, 0.012, 0.02, x, y, z + 0.085);
  B.add(G.cyl8, 0x2e2f2a, 0.02, 0.12, 0.02, x, y - 0.1, z);
}
function usLights(B, x, y, z) {
  for (const s of [-1, 1]) {
    B.add(G.cyl12, 0x2e2f2a, 0.08, 0.1, 0.08, x + s * 0.12, y, z, Math.PI / 2, 0, 0);
    B.add(G.cyl12, 0xd8d6c6, 0.055, 0.02, 0.055, x + s * 0.12, y, z + 0.055, Math.PI / 2, 0, 0);
  }
  B.add(G.torus, 0x3a3a34, 0.24, 0.24, 1.2, x, y + 0.02, z + 0.05, 0, 0, 0);                      // proteção de arame
}
function periscope(B, x, y, z, ry) { B.add(G.box, 0x2a2b25, 0.16, 0.12, 0.08, x, y, z, 0, ry || 0, 0); B.add(G.box, 0x7a8c90, 0.13, 0.04, 0.012, x, y + 0.01, z + 0.045, 0, ry || 0, 0); }
function spareLinks(B, x0, x1, y, z, rx, n, col) {
  for (let i = 0; i < n; i++) {
    const x = lerp(x0, x1, n > 1 ? i / (n - 1) : 0.5);
    B.add(G.box, col || 0x34322c, 0.42, 0.06, 0.16, x, y, z, rx, Math.PI / 2, 0);
    B.add(G.box, 0x4a473f, 0.08, 0.075, 0.16, x, y + 0.01, z, rx, Math.PI / 2, 0);
  }
}
function weldSeam(B, x, y, z, w, h, d, rx) { B.add(G.box, 0x34342e, w, h, d, x, y, z, rx || 0, 0, 0); }
function exhaust(B, x, y, z, big) {
  B.add(G.cyl12, 0x4a3c30, big ? 0.13 : 0.1, 0.62, big ? 0.13 : 0.1, x, y, z);
  B.add(G.cyl12, 0x221d18, big ? 0.07 : 0.055, 0.1, big ? 0.07 : 0.055, x, y + 0.33, z);
  B.add(G.box, 0x3d3e36, 0.3, 0.05, 0.05, x, y - 0.32, z);
}
// detalhes extras nos tanques principais (somam-se aos de HULL_EXTRA)
const _hullExtraOrig = Object.assign({}, HULL_EXTRA);
HULL_EXTRA.sherman = (B, s) => {
  _hullExtraOrig.sherman(B, s);
  usLights(B, 0, 1.55, 3.15);
  for (const sx of [-1, 1]) { toolKit(B, sx * 1.42, 2.17, -2.0, 1.3, true); periscope(B, sx * 0.62, 2.36, 1.28); }
  spareLinks(B, -0.9, 0.9, 1.75, 2.75, 0.85, 5);
  weldSeam(B, 0, 1.43, 3.3, 2.5, 0.03, 0.03);
  towCable(B, 1.25, 2.18, -2.8, -0.3);
};
HULL_EXTRA.panzer4 = (B, s) => {
  _hullExtraOrig.panzer4(B, s);
  boschLight(B, -1.15, 1.32, 3.1);
  for (const sx of [-1, 1]) toolKit(B, sx * 1.38, 1.18, 0.4, 1.4, false);
  spareLinks(B, -1.0, 1.0, 1.55, 2.98, 1.05, 7);
  exhaust(B, -0.8, 0.85, -3.55, true);
  towCable(B, 1.25, 1.2, -2.5, 1.5);
  for (const x of [-0.6, 0.6]) periscope(B, x, 1.98, 2.0);
};
HULL_EXTRA.tiger = (B, s) => {
  _hullExtraOrig.tiger(B, s);
  for (const sx of [-1, 1]) { boschLight(B, sx * 1.3, 2.18, 3.4); toolKit(B, sx * 1.62, 2.06, -0.5, 1.6, false); towCable(B, sx * 1.75, 1.75, -3.0, 2.5); }
  spareLinks(B, -1.6, 1.6, 2.06, 3.5, 0, 6);
  for (const x of [-0.75, 0.75]) periscope(B, x, 2.08, 2.6);
};

/* ---------- materiais: poeira, escorridos, pintura gasta, Zimmerit ---------- */
DETAIL.unit = `
    vec3 p = vDPos;
    float n = vnoise(p * 9.0) * 0.55 + vnoise(p * 2.6) * 0.45;
    float streak = vnoise(vec3(p.x * 16.0, p.y * 1.3, p.z * 16.0));
    float chip = step(0.86, vnoise(p * 23.0));
    float lum = dot(diffuseColor.rgb, vec3(0.33));
    diffuseColor.rgb *= 0.88 + 0.2 * n - 0.1 * smoothstep(0.55, 1.0, streak) * (1.0 - abs(vDNrm.y));
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.3, 0.29, 0.27), chip * 0.25 * step(0.12, lum));
    float dust = smoothstep(0.6, 0.95, vDNrm.y) * (0.45 + 0.55 * vnoise(p * 4.0)) * step(0.1, lum);
    diffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.56, 0.51, 0.42), dust * 0.32);
    diffuseColor.rgb *= mix(0.6, 1.0, smoothstep(0.0, 1.5, p.y));`;
DETAIL.unitZ = DETAIL.unit + `
    float side = 1.0 - smoothstep(0.45, 0.75, abs(vDNrm.y));
    float rib = smoothstep(0.35, 0.5, abs(fract((p.x * vDNrm.z - p.z * vDNrm.x) * 12.0 + vnoise(p * 6.0) * 0.5) - 0.5));
    float zim = side * step(1.05, p.y) * step(0.16, lum);
    diffuseColor.rgb *= 1.0 - zim * (0.09 * rib + 0.03);`;
function addDetailN(mat, mode) {
  mat.onBeforeCompile = (sh) => {
    sh.vertexShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\nvDPos = transformed; vDNrm = normalize(objectNormal);');
    sh.fragmentShader = 'varying vec3 vDPos;\nvarying vec3 vDNrm;\n' + NOISE_GLSL + '\n' + sh.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n' + DETAIL[mode]);
  };
  mat.customProgramCacheKey = () => 'detailN-' + mode;
  mat.needsUpdate = true;
  return mat;
}
addDetailN(VC_MAT, 'unit');
VC_MAT.shininess = 18; VC_MAT.specular.setHex(0x22221e);
const VC_MAT_Z = addDetailN(new THREE.MeshPhongMaterial({ vertexColors: true, shininess: 10, specular: 0x161614 }), 'unitZ');

/* ---------- torres refeitas ---------- */
// Sherman: torre fundida arredondada, mantelete curvo, cúpula, escotilha do municiador, .50 e periscópios
function turretShermanReal(B, s) {
  const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(G.cyl12, dark, 1.16, 0.1, 1.16, 0, 0.05, -0.05);
  const plan = superPlan(2.42, 2.75, 32, 2.7, 2.3).map(([x, z]) => [x, z - 0.12]);
  B.add(loftPlan(plan, [[0.08, 1, 1], [0.42, 1.03, 1.02], [0.74, 0.97, 0.97], [0.96, 0.82, 0.84], [1.1, 0.6, 0.64]], true), P0, 1, 1, 1, 0, 0, 0);
  // mantelete e escudo do canhão
  B.add(G.cyl12, P0, 0.4, 1.3, 0.4, 0, 0.55, 1.12, 0, 0, Math.PI / 2);
  B.add(loftPlan(superPlan(1.25, 0.34, 16, 3.5), [[0.22, 1, 1], [0.88, 1, 1]]), P0, 1, 1, 1, 0, 0, 1.36);
  for (const sx of [-0.5, 0.5]) B.add(G.sph16, met, 0.04, 0.04, 0.04, sx, 0.8, 1.54);
  B.add(G.box, dark, 0.11, 0.11, 0.08, 0.38, 0.55, 1.55);                                 // coaxial
  B.add(G.box, dark, 0.08, 0.1, 0.06, -0.38, 0.75, 1.53);                                 // luneta
  // cúpula do comandante com blocos de visão e escotilha aberta
  B.add(G.cyl12, P0, 0.4, 0.22, 0.4, 0.45, 1.18, -0.45);
  for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; B.add(G.box, 0x6f8288, 0.07, 0.06, 0.03, 0.45 + Math.sin(a) * 0.4, 1.2, -0.45 + Math.cos(a) * 0.4, 0, a, 0); }
  B.add(G.box, P0, 0.38, 0.05, 0.4, 0.45, 1.5, -0.74, 1.15, 0, 0);
  B.add(G.cyl12, P0, 0.3, 0.06, 0.3, -0.45, 1.12, -0.2);
  for (const x of [-0.75, -0.1]) periscope(B, x, 1.16, 0.45);
  crewBust(B, 0.45, 1.62, -0.45, 'us');
  // cobertor enrolado na lateral, .50 no pino, antena e ventilador
  B.add(G.limb, 0x9a8a55, 0.2, 1.4, 0.2, -1.3, 0.55, -0.55, Math.PI / 2, 0, 0);
  for (const z of [-1.05, -0.05]) B.add(G.limb, 0x4a3f2a, 0.215, 0.05, 0.215, -1.3, 0.55, z, Math.PI / 2, 0, 0);
  B.add(G.cyl8, met, 0.03, 0.42, 0.03, 0.05, 1.3, -0.95);
  B.add(G.box, met, 0.12, 0.15, 0.5, 0.05, 1.55, -0.82);
  B.add(G.cyl8, 0x1e1e1e, 0.028, 1.0, 0.028, 0.05, 1.57, -0.1, Math.PI / 2, 0, 0);
  B.add(G.box, 0x4b5130, 0.15, 0.14, 0.25, 0.22, 1.48, -0.82);
  B.add(G.cyl8, met, 0.05, 0.12, 0.05, -0.75, 1.0, -1.15);
  B.add(G.cyl8, 0x2a2a2a, 0.012, 3.2, 0.012, -0.75, 2.6, -1.25, -0.08, 0, 0);
  B.add(G.dome, met, 0.16, 0.08, 0.16, 0.0, 1.15, -1.1);
}
// Panzer IV: torre de laterais inclinadas, escotilhas laterais, cúpula com 5 visores e Schürzen da torre
function turretPanzer4Real(B, s) {
  const P0 = s.paint, dark = 0x2c2b25, met = 0x3d3e36;
  B.add(G.cyl12, dark, 1.0, 0.1, 1.0, 0, 0.05, 0);
  B.add(loftPlan([[-0.78, 1.0], [0.78, 1.0], [1.02, 0.3], [1.02, -1.15], [-1.02, -1.15], [-1.02, 0.3]], [[0.08, 1, 1], [0.86, 0.88, 0.94, -0.04]]), P0, 1, 1, 1, 0, 0, 0);
  B.add(loftPlan([[-0.48, 0.18], [0.48, 0.18], [0.48, -0.12], [-0.48, -0.12]], [[0.15, 1, 1], [0.72, 1, 1]]), P0, 1, 1, 1, 0, 0, 1.1);
  B.add(G.box, dark, 0.12, 0.1, 0.05, -0.28, 0.5, 1.29); B.add(G.box, dark, 0.1, 0.09, 0.05, 0.3, 0.5, 1.29);
  for (const sx of [-1, 1]) { B.add(G.box, P0, 0.05, 0.5, 0.42, sx * 0.94, 0.45, 0.05, 0, 0, sx * 0.18); B.add(G.box, dark, 0.03, 0.06, 0.2, sx * 0.97, 0.62, 0.05, 0, 0, sx * 0.18); }
  B.add(G.cyl12, P0, 0.36, 0.3, 0.36, 0, 1.05, -0.7);
  for (let i = 0; i < 5; i++) { const a = -1.3 + i * 0.65; B.add(G.box, 0x1a1a18, 0.08, 0.06, 0.02, Math.sin(a) * 0.37, 1.08, -0.7 + Math.cos(a) * 0.37, 0, a, 0); }
  B.add(G.cyl12, dark, 0.37, 0.06, 0.37, 0, 1.22, -0.7);
  B.add(G.box, P0, 0.36, 0.04, 0.36, 0, 1.45, -0.98, 1.15, 0, 0);
  crewBust(B, 0, 1.62, -0.7, 'de');
  B.add(G.dome, met, 0.13, 0.07, 0.13, 0.45, 0.94, 0.4);
  // Schürzen da torre (afastadas por suportes)
  for (const sx of [-1, 1]) { B.add(G.box, P0, 0.05, 0.74, 2.2, sx * 1.36, 0.48, -0.36); for (const z of [0.4, -0.9]) B.add(G.box, met, 0.32, 0.05, 0.05, sx * 1.2, 0.6, z); }
  B.add(G.box, P0, 2.76, 0.74, 0.05, 0, 0.48, -1.5);
  B.add(G.box, P0, 1.25, 0.5, 0.5, 0, 0.42, -1.82);
  for (const sx of [-0.4, 0.4]) B.add(G.box, dark, 0.2, 0.04, 0.04, sx, 0.68, -2.07);
}
TANK_PARTS.sherman[1] = turretShermanReal;
TANK_PARTS.panzer4[1] = turretPanzer4Real;
