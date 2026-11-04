'use strict';
/* =========================================================
   DESEMPENHO (celular)
   - resolução automática: se o quadro passar de ~25 ms a resolução
     interna baixa; quando sobra folga ela volta a subir
   - LOD mais cedo no modo leve (as versões leves dos modelos entram antes)
   - impostores dos soldados: longe da câmera cada soldado (16 peças
     articuladas) vira UMA malha já posada (parado, andando em 4 passos,
     mirando, ajoelhado) e todos os iguais saem num único desenho
     instanciado; perto continuam os soldados articulados de verdade
   ========================================================= */
const Perf = (() => {
  const low = () => GFX === 'low';
  const P = { pr: 1, acc: 0, n: 0, slow: 0 };
  const cap = () => Math.min(window.devicePixelRatio || 1, low() ? 1 : 1.75);
  function reset() { P.pr = cap(); P.acc = 0; P.n = 0; renderer.setPixelRatio(P.pr); }
  // resolução automática (média de 1,5 s)
  function tick(dt) {
    P.acc += Math.min(dt, 0.25); P.n++;
    if (P.acc < 1.5) return;
    const avg = P.acc / P.n; P.acc = 0; P.n = 0;
    if (document.hidden) return;
    let pr = P.pr;
    if (avg > 1 / 38) pr = Math.max(0.5, pr * (avg > 1 / 24 ? 0.78 : 0.88));
    else if (avg < 1 / 55) pr = Math.min(cap(), pr * 1.08);
    if (Math.abs(pr - P.pr) > 0.02) { P.pr = pr; renderer.setPixelRatio(pr); }
  }

  // LOD: no modo leve a distância conta em dobro (a versão leve entra antes)
  const _a = new THREE.Vector3(), _b = new THREE.Vector3();
  THREE.LOD.prototype.update = function (cam) {
    const L = this.levels;
    if (L.length < 2) return;
    _a.setFromMatrixPosition(cam.matrixWorld); _b.setFromMatrixPosition(this.matrixWorld);
    const d = _a.distanceTo(_b) / cam.zoom * (low() ? 2.2 : 1);
    L[0].object.visible = true;
    let i = 1;
    for (; i < L.length; i++) { if (d >= L[i].distance) { L[i - 1].object.visible = false; L[i].object.visible = true; } else break; }
    this._currentLevel = i - 1;
    for (; i < L.length; i++) L[i].object.visible = false;
  };

  /* ---------- impostores dos soldados ---------- */
  const BK = new Map(); let bakedThisFrame = 0;
  function flip(g) { for (const a of Object.values(g.attributes)) { const n = a.itemSize, r = a.array; for (let t = 0; t < a.count; t += 3) for (let c = 0; c < n; c++) { const i1 = (t + 1) * n + c, i2 = (t + 2) * n + c, v = r[i1]; r[i1] = r[i2]; r[i2] = v; } } }
  // junta as peças (versão leve do LOD) numa malha por material, no espaço do grupo raiz
  // ref: espaço de referência; skip: subárvore que fica de fora (a torre, no casco)
  function bake(root, ref, skip) {
    root.updateMatrixWorld(true);
    ref = ref || root;
    const inv = ref.matrixWorld.clone().invert(), groups = new Map(), m4 = new THREE.Matrix4();
    const visit = (o) => {
      if (!o.visible || o === skip) return;
      if (o.isLOD) { visit(o.levels[o.levels.length - 1].object); return; }
      if (o.isMesh && !Array.isArray(o.material) && o.geometry.attributes.position.count && !o.material.transparent) {
        const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
        m4.multiplyMatrices(inv, o.matrixWorld); g.applyMatrix4(m4); if (m4.determinant() < 0) flip(g);
        let a = groups.get(o.material); if (!a) groups.set(o.material, a = []); a.push(g);
      }
      for (const c of o.children) visit(c);
    };
    visit(root);
    const out = [];
    for (const [mat, list] of groups) {
      const names = ['position', 'normal', 'color'].filter(nm => list.every(g => g.attributes[nm]));
      const tot = list.reduce((t, g) => t + g.attributes.position.count, 0), geo = new THREE.BufferGeometry();
      for (const nm of names) {
        const arr = new Float32Array(tot * 3); let o = 0;
        for (const g of list) { const a = g.attributes[nm]; for (let i = 0; i < a.count; i++, o += 3) { arr[o] = a.getX(i); arr[o + 1] = a.getY(i); arr[o + 2] = a.getZ(i); } }
        geo.setAttribute(nm, new THREE.BufferAttribute(arr, 3));
      }
      geo.computeBoundingSphere(); out.push({ geo, mat });
    }
    return out;
  }
  const entry = (parts) => ({ n: 0, cap: 0, parts, meshes: [] });
  const POSE = { s: {}, a: { aim: true }, k: { aim: true, crouch: true }, c: { crouch: true } };
  function imp(mk, fr) {
    const key = JSON.stringify([mk.nat, mk.kind, mk.pal, mk.biome, mk.variant, mk.scale]) + fr;
    let e = BK.get(key); if (e) return e;
    if (bakedThisFrame >= 2) return null;     // no máximo 2 poses novas por quadro (sem engasgo)
    bakedThisFrame++;
    const g = Soldado3.make(Object.assign({}, mk, { skin: 0 }));
    const st = fr[0] === 'w' ? { moving: true, speed: 6 } : POSE[fr];
    for (let i = 0; i < 5; i++) Soldado3.pose(g, st, 1);
    if (fr[0] === 'w') { g.userData.ph = (+fr[1]) * Math.PI / 2; Soldado3.pose(g, st, 1e-6); }
    e = entry(bake(g)); BK.set(key, e); return e;
  }
  // blindados: casco (tudo menos a torre) e torre separados, para a torre girar
  function impVeh(kind) {
    const key = 'V|' + kind + '|' + SC.id + '|' + SC.year + '|' + SC.biome;
    let e = BK.get(key); if (e) return e;
    if (bakedThisFrame >= 1) return null;
    bakedThisFrame++;
    const g = makeTank(kind), tur = g.userData.turret;
    if (!tur || !tur.parent || tur.parent.parent !== g) { BK.set(key, null); return null; }
    e = { hull: entry(bake(g, g, tur)), tur: entry(bake(tur, tur)) };
    BK.set(key, e); VEH.push(e.hull, e.tur);
    return e;
  }
  const VEH = [];
  // mostra/esconde as peças de verdade (o anel de seleção continua)
  function parts(u, on) { for (const c of u.mesh.children) if (c !== u.ring) c.visible = on; }
  function grow(e, need) {
    const cap = Math.max(16, need * 2);
    for (const m of e.meshes) { scene.remove(m); m.dispose && m.dispose(); }
    e.meshes = e.parts.map(p => { const m = new THREE.InstancedMesh(p.geo, p.mat, cap); m.frustumCulled = false; m.count = 0; m.castShadow = false; scene.add(m); return m; });
    e.cap = cap;
  }
  const _tm = new THREE.Matrix4();
  function put(e, mtx, used) { if (e.n >= e.cap) { used.push(e); return false; } for (const im of e.meshes) im.setMatrixAt(e.n, mtx); e.n++; return true; }
  function impostors(dt) {
    bakedThisFrame = 0;
    const all = [...BK.values()].filter(e => e && e.parts).concat(VEH);
    for (const e of all) e.n = 0;
    const far2 = (low() ? 30 : 62) ** 2, farV = (low() ? 48 : 95) ** 2, cx = camera.position.x, cy = camera.position.y, cz = camera.position.z;
    const used = [];
    for (const u of ents) {
      const m = u.mesh; if (!m) continue;
      if (u.tank && m.userData.b3) {
        const ok = u.alive && m.parent === scene && m.visible, dx = m.position.x - cx, dy = m.position.y - cy, dz = m.position.z - cz;
        const e = ok && dx * dx + dy * dy + dz * dz >= farV ? impVeh(u.kind) : null;
        if (e) {
          m.updateMatrix(); const tur = m.userData.turret, mid = tur.parent; tur.updateMatrix();
          _tm.multiplyMatrices(m.matrix, mid.matrix).multiply(tur.matrix);
          if (e.hull.n < e.hull.cap && e.tur.n < e.tur.cap) { put(e.hull, m.matrix, used); put(e.tur, _tm, used); if (!u.imp) { u.imp = true; parts(u, false); } continue; }
          used.push(e.hull, e.tur);
        }
        if (u.imp) { u.imp = false; parts(u, true); }
        continue;
      }
      if (!u.inf || !m.userData.s3) continue;
      const ok = u.alive && !u.downed && !u.dragged && m.parent === scene && m.visible;
      const dx = m.position.x - cx, dy = m.position.y - cy, dz = m.position.z - cz;
      if (!ok || dx * dx + dy * dy + dz * dz < far2) { if (u.imp) { u.imp = false; parts(u, true); m.userData.st = null; } continue; }
      const moving = u.speedNow > 0.4, aim = (!!u.target && !moving) || S.time - u.fireT < 1;
      let fr;
      if (moving) { u.impPh = (u.impPh || Math.random() * 4) + dt * Math.max(2, u.speedNow) * 0.8; fr = 'w' + (Math.floor(u.impPh) % 4); }
      else fr = u.crouch ? (aim ? 'k' : 'c') : aim ? 'a' : 's';
      const e = imp(m.userData.mk, fr);
      if (!e) { if (u.imp) { u.imp = false; parts(u, true); } continue; }
      m.updateMatrix();
      if (!put(e, m.matrix, used)) { if (u.imp) { u.imp = false; parts(u, true); } continue; }   // cresce logo abaixo
      if (!u.imp) { u.imp = true; parts(u, false); }
    }
    // capacidade estourou: recria maior e coloca na próxima volta
    for (const e of new Set(used)) grow(e, e.cap + used.length);
    for (const e of all) for (const im of e.meshes) { im.count = Math.min(e.n, e.cap); im.instanceMatrix.needsUpdate = true; }
  }
  // começa com a resolução certa
  reset();
  return { tick, reset, impostors, state: P, bakes: () => BK.size };
})();
