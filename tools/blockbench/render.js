// Renderiza um modelo do Blockbench (.bbmodel) nos quadros de uma montaria do jogo, com three.js
// num Chromium sem janela (Playwright). Cada face recebe o sombreamento fixo do próprio Blockbench
// (topo claro, laterais médias, baixo escuro) e a textura com pixels nítidos.
// Quadros: lado (perfil olhando para a direita), frente (vindo para baixo; corpo e cabeça separados,
// porque o cavaleiro fica entre os dois) e costas (indo para cima), cada um parado + 2 passos.
// Uso: NODE_PATH=<pasta com three@0.149 e playwright> node render.js <modelo.bbmodel> <pasta de saída>
const fs = require('fs'), path = require('path');
const { chromium } = require('playwright');
const [modelo, saida] = process.argv.slice(2);
const PX = 8;   // pixels por unidade na renderização (o montaria_px.py reduz depois)

// [nome, direção da câmera (de onde ela olha), elevação em graus, centro, meia-largura, meia-altura]
const VISTAS = [
  ['lado', [1, 0, 0], 14, [0, 12, -6], 24, 18],
  ['frente', [0, 0, -1], 36, [0, 12, -6], 14, 22],
  ['costas', [0, 0, 1], 36, [0, 12, -6], 14, 22],
  ['previa', [0.8, 0, -0.6], 24, [0, 13, -6], 28, 20]   // vista de 3/4 só para mostrar o modelo (um quadro)
];
const PASSO = 18;
const POSES = [{}, { perna_fe: PASSO, perna_td: PASSO, perna_fd: -PASSO, perna_te: -PASSO, cabeca: -4 },
  { perna_fe: -PASSO, perna_td: -PASSO, perna_fd: PASSO, perna_te: PASSO, cabeca: -4 }];

(async () => {
  const bb = JSON.parse(fs.readFileSync(modelo, 'utf8'));
  // centro do assento: o meio do cubo "sela"
  const se = bb.elements.find(e => e.name === 'sela'); bb.sela = se.from.map((v, i) => (v + se.to[i]) / 2);
  const selas = {};
  fs.mkdirSync(saida, { recursive: true });
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-webgl', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage();
  await page.setContent('<html><body style="margin:0;background:transparent"></body></html>');
  await page.addScriptTag({ path: path.join(path.dirname(require.resolve('three')), 'three.min.js') });
  await page.evaluate(({ bb, PX }) => {
    const T = THREE, W = 1024, H = 1024;
    const ren = new T.WebGLRenderer({ antialias: false, alpha: true, preserveDrawingBuffer: true });
    ren.setSize(W, H); ren.setClearColor(0x000000, 0); document.body.appendChild(ren.domElement);
    window.ren = ren;
    const img = new Image(); img.src = bb.textures[0].source;
    window.pronto = new Promise(r => img.onload = r).then(() => {
      const tex = new T.Texture(img); tex.magFilter = T.NearestFilter; tex.minFilter = T.NearestFilter; tex.generateMipmaps = false; tex.needsUpdate = true;
      const mat = new T.MeshBasicMaterial({ map: tex, vertexColors: true, alphaTest: 0.5, side: T.DoubleSide });
      const TW = bb.resolution.width, TH = bb.resolution.height;
      const LUZ = { up: 1.08, north: 0.8, east: 0.86, south: 0.66, west: 0.7, down: 0.45 };
      const elems = Object.fromEntries(bb.elements.map(e => [e.uuid, e]));
      const rad = v => v * Math.PI / 180;
      // geometria de um cubo com UV por face (cantos: sup.esq, sup.dir, inf.dir, inf.esq), em coordenadas do grupo
      const geo = (e, o) => {
        const [x0, y0, z0] = e.from.map((v, i) => v - o[i]), [x1, y1, z1] = e.to.map((v, i) => v - o[i]);
        const C = {
          north: [[x1, y1, z0], [x0, y1, z0], [x0, y0, z0], [x1, y0, z0]], south: [[x0, y1, z1], [x1, y1, z1], [x1, y0, z1], [x0, y0, z1]],
          east: [[x1, y1, z1], [x1, y1, z0], [x1, y0, z0], [x1, y0, z1]], west: [[x0, y1, z0], [x0, y1, z1], [x0, y0, z1], [x0, y0, z0]],
          up: [[x0, y1, z0], [x1, y1, z0], [x1, y1, z1], [x0, y1, z1]], down: [[x0, y0, z1], [x1, y0, z1], [x1, y0, z0], [x0, y0, z0]]
        };
        const pos = [], uv = [], cor = [], idx = [];
        for (const f in C) {
          const fc = e.faces[f]; if (!fc || fc.texture === null || fc.texture === undefined) continue;
          const [u0, v0, u1, v1] = fc.uv, n = pos.length / 3, l = LUZ[f];
          C[f].forEach(p => { pos.push(...p); cor.push(l, l, l); });
          uv.push(u0 / TW, 1 - v0 / TH, u1 / TW, 1 - v0 / TH, u1 / TW, 1 - v1 / TH, u0 / TW, 1 - v1 / TH);
          idx.push(n, n + 2, n + 1, n, n + 3, n + 2);
        }
        const g = new T.BufferGeometry();
        g.setAttribute('position', new T.Float32BufferAttribute(pos, 3)); g.setAttribute('uv', new T.Float32BufferAttribute(uv, 2));
        g.setAttribute('color', new T.Float32BufferAttribute(cor, 3)); g.setIndex(idx); return g;
      };
      const scene = new T.Scene(), ossos = {};
      const montar = (no, pai, oPai) => {
        if (typeof no === 'string') {
          const e = elems[no], piv = e.origin, m = new T.Mesh(geo(e, piv), mat);
          m.position.set(piv[0] - oPai[0], piv[1] - oPai[1], piv[2] - oPai[2]);
          if (e.rotation) { m.rotation.order = 'ZYX'; m.rotation.set(rad(e.rotation[0]), rad(e.rotation[1]), rad(e.rotation[2])); }
          pai.add(m); return;
        }
        const g = new T.Group(); g.name = no.name; ossos[no.name] = g;
        g.position.set(no.origin[0] - oPai[0], no.origin[1] - oPai[1], no.origin[2] - oPai[2]);
        pai.add(g); no.children.forEach(c => montar(c, g, no.origin));
      };
      bb.outliner.forEach(n => montar(n, scene, [0, 0, 0]));
      window.quadro = (vista, pose, so) => {
        const [, dir, elev, alvo, mw, mh] = vista;
        for (const k in ossos) ossos[k].rotation.set(0, 0, 0);
        for (const k in pose) ossos[k].rotation.x = rad(pose[k]);
        ossos.cabeca.visible = so !== 'corpo';
        // só a cabeça: esconde tudo o que não é da cabeça (os cubos ficam, mas invisíveis)
        scene.traverse(o => { if (o.isMesh) { let p = o.parent, naCabeca = false; while (p) { if (p === ossos.cabeca) naCabeca = true; p = p.parent; } o.visible = so === 'cabeca' ? naCabeca : true; } });
        const cam = new T.OrthographicCamera(-mw, mw, mh, -mh, 1, 500), e = rad(elev);
        cam.position.set(alvo[0] + dir[0] * Math.cos(e) * 200, alvo[1] + Math.sin(e) * 200, alvo[2] + dir[2] * Math.cos(e) * 200);
        cam.lookAt(alvo[0], alvo[1], alvo[2]);
        ren.setSize(Math.round(mw * 2 * PX), Math.round(mh * 2 * PX));
        ren.render(scene, cam);
        // onde a sela cai na imagem: o cavaleiro do jogo é desenhado no centro do quadro
        const s = new T.Vector3(...bb.sela).project(cam);
        return { url: ren.domElement.toDataURL('image/png'), sela: [(s.x + 1) / 2 * mw * 2 * PX, (1 - s.y) / 2 * mh * 2 * PX] };
      };
    });
  }, { bb, PX });
  await page.evaluate(() => window.pronto);
  for (const v of VISTAS) {
    const camadas = v[0] === 'frente' ? ['corpo', 'cabeca'] : [null];
    for (let f = 0; f < (v[0] === 'previa' ? 1 : 3); f++) for (const so of camadas) {
      const { url, sela } = await page.evaluate(({ v, p, so }) => window.quadro(v, p, so), { v, p: POSES[f], so });
      const nome = `${v[0]}${so ? '_' + so : ''}_${f}.png`;
      fs.writeFileSync(path.join(saida, nome), Buffer.from(url.split(',')[1], 'base64'));
      selas[v[0]] = sela;
      console.log(nome);
    }
  }
  fs.writeFileSync(path.join(saida, 'selas.json'), JSON.stringify(selas));
  await browser.close();
})();
