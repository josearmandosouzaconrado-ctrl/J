'use strict';
// Laço principal, estados do jogo, renderização e configurações.
(function () {
  const W = WW1.world;
  THREE.ColorManagement.legacyMode = false;

  // ---------- Configurações salvas ----------
  WW1.settings = { diff: 1, quality: 'high', sens: 1 };
  try {
    const s = JSON.parse(localStorage.getItem('ww1_settings') || '{}');
    Object.assign(WW1.settings, s);
  } catch (e) { /* sem armazenamento */ }
  WW1.saveSettings = () => { try { localStorage.setItem('ww1_settings', JSON.stringify(WW1.settings)); } catch (e) { } };
  WW1.fmtTime = s => { const t = Math.max(0, Math.ceil(s)); return Math.floor(t / 60) + ':' + String(t % 60).padStart(2, '0'); };
  WW1.time = 0;

  const FOG = 0x787a77;
  // modo: campanha do Somme (padrão) ou mundo aberto ('open:soldier', 'open:tank', ...)
  const modeStr = sessionStorage.getItem('ww1_mode') || 'somme';
  const g = WW1.game = {
    mode: modeStr.startsWith('open') ? 'open' : 'somme', role: modeStr.split(':')[1] || 'soldier',
    state: 'loading', player: null, mg: null, gasActive: false,
    playTime: 0, kills: 0, shots: 0, hits: 0, fade: 1, timers: [], menuT: 0,
    get quality() { return WW1.settings.quality; },
    enemyAccuracy() { return [0.55, 0.85, 1.2][WW1.settings.diff]; },
    shellMinDist() { return [14, 10, 7][WW1.settings.diff]; },
    later(sec, fn) { this.timers.push({ at: WW1.time + sec, fn }); },
  };

  window.addEventListener('error', e => {
    const l = document.getElementById('loading');
    if (l && g.state === 'loading') l.textContent = 'Erro: ' + e.message;
  });

  function init() {
    const low = WW1.settings.quality === 'low';
    const r = g.renderer = new THREE.WebGLRenderer({ antialias: !low, powerPreference: 'high-performance' });
    r.outputEncoding = THREE.sRGBEncoding;
    r.toneMapping = THREE.ACESFilmicToneMapping;
    r.toneMappingExposure = 0.95;
    r.shadowMap.enabled = false; // céu encoberto: luz difusa, sem sombras duras (e mais leve no celular)
    r.autoClear = false;
    document.body.prepend(r.domElement);

    const scene = g.scene = new THREE.Scene();
    scene.background = new THREE.Color(FOG);
    const open = g.mode === 'open';
    g.fogDensity = open ? (low ? 0.0075 : 0.0058) : (low ? 0.014 : 0.0115);
    scene.fog = new THREE.FogExp2(FOG, g.fogDensity);
    g.camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.05, open ? 760 : 320);
    g.camera.rotation.order = 'YXZ';

    // Luz de céu encoberto
    scene.add(new THREE.HemisphereLight(0xa9aeb3, 0x3b342b, 0.7));
    const sun = g.sun = new THREE.DirectionalLight(0xe2ddd0, 1.3);
    scene.add(sun, sun.target);

    // Reflexos do céu cinzento (poças e lama molhada)
    const envScene = new THREE.Scene();
    const sky = new THREE.Mesh(new THREE.SphereGeometry(50, 32, 16), new THREE.ShaderMaterial({
      side: THREE.BackSide,
      vertexShader: 'varying vec3 p; void main(){ p = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
      fragmentShader: 'varying vec3 p; void main(){ float h = normalize(p).y; vec3 top = vec3(0.55,0.57,0.6); vec3 mid = vec3(0.42,0.43,0.42); vec3 bot = vec3(0.09,0.08,0.06); gl_FragColor = vec4(h > 0.0 ? mix(mid, top, h) : mix(mid, bot, min(1.0,-h*3.0)), 1.0); }',
    }));
    envScene.add(sky);
    const pm = new THREE.PMREMGenerator(r);
    scene.environment = pm.fromScene(envScene, 0.04).texture;
    pm.dispose();

    // Cena da arma em primeira pessoa (desenhada por cima, sem atravessar paredes)
    g.vmScene = new THREE.Scene();
    g.vmScene.environment = scene.environment;
    g.vmScene.add(new THREE.HemisphereLight(0xa9aeb3, 0x3b342b, 0.9));
    const vl = new THREE.DirectionalLight(0xe2ddd0, 1.1); vl.position.set(0.4, 1, 0.3);
    g.vmScene.add(vl);
    g.vmCam = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.01, 5);

    WW1.tex.init();
    WW1.fx.init(scene, WW1.settings.quality);
    if (open) {
      WW1.ow.build(scene);
      WW1.ow.activate();
    } else W.build(scene);
    WW1.soldierInit(scene);
    WW1.artillery.reset();
    if (open) {
      WW1.vehInit(scene);
      g.player = new WW1.Player(g.camera, g.vmScene, 0, -900);
      WW1.og.start(g.role);
    } else {
      const px = 0;
      g.player = new WW1.Player(g.camera, g.vmScene, px, W.trenchZ(px, W.PLAYER_TRENCH) - 0.2);
      g.player.pos.y = W.S(g.player.pos.x, g.player.pos.z);
      WW1.mission.setup();
    }
    WW1.ui.init();
    resize();
    addEventListener('resize', resize);
    applyQualityRuntime();

    if (open) {
      // carrega o terreno em volta do ponto de partida antes de começar
      WW1.og.controlPlayer(g.player, 0.016);
      g.camera.updateMatrixWorld();
      for (let i = 0; i < 400 && WW1.ow.update(g.camera, 0, 50) > 0; i++);
      g.state = 'playing';
      WW1.ui.show(null);
      g.player.controls = true;
      g.fade = 1;
      WW1.audio.start();
    } else if (sessionStorage.getItem('ww1_skip') === '1') {
      sessionStorage.removeItem('ww1_skip');
      g.begin();
    } else {
      g.state = 'menu';
      WW1.ui.show('menu');
    }
    last = performance.now();
    requestAnimationFrame(loop);
  }

  function resize() {
    const low = WW1.settings.quality === 'low';
    const pr = Math.min(devicePixelRatio || 1, low ? 1 : 1.5) * (low ? 0.8 : 1);
    g.renderer.setPixelRatio(pr);
    g.renderer.setSize(innerWidth, innerHeight);
    g.camera.aspect = g.vmCam.aspect = innerWidth / innerHeight;
    g.camera.updateProjectionMatrix();
    g.vmCam.updateProjectionMatrix();
    WW1.ui.layout();
  }

  function applyQualityRuntime() {
    const low = WW1.settings.quality === 'low';
    g.scene.fog.density = g.fogDensity;
    WW1.fx.setFog(g.scene.fog.density, new THREE.Vector3(0x78 / 255, 0x7a / 255, 0x77 / 255));
  }

  // Trocar a qualidade recria o renderizador: o jeito mais simples é recarregar a página.
  g.applyQuality = function () { location.reload(); };

  g.briefing = function () { g.state = 'briefing'; WW1.ui.show('briefing'); };

  g.begin = function () {
    g.state = 'playing';
    WW1.ui.show(null);
    g.player.controls = true;
    g.player.yaw = 0; g.player.pitch = 0.07;
    g.fade = 1;
    WW1.audio.start();
    WW1.mission.begin();
  };

  g.pause = function () {
    if (g.state !== 'playing') return;
    g.state = 'paused';
    WW1.ui.show('pause');
    WW1.ui.resetTouches();
    WW1.audio.pause(true);
    if (document.exitPointerLock) document.exitPointerLock();
  };

  g.resume = function () {
    if (g.state !== 'paused') return;
    g.state = 'playing';
    WW1.ui.show(null);
    WW1.audio.pause(false);
  };

  g.playerDied = function () {
    g.gasActive = false;
    if (g.mode === 'open') { g.later(2.8, () => { g.fade = 1; WW1.og.respawn(); }); return; }
    g.later(2.2, () => {
      g.state = 'dead';
      WW1.ui.deathStats(g);
      WW1.ui.show('dead');
      if (document.exitPointerLock) document.exitPointerLock();
    });
  };

  g.victory = function () {
    if (g.state !== 'playing' || g.player.dead) return;
    g.player.controls = false;
    g.player.maskOn = false;
    g.victoryT = 0;
  };

  g.restart = function (skipMenu) {
    if (skipMenu) sessionStorage.setItem('ww1_skip', '1');
    else sessionStorage.removeItem('ww1_mode');
    location.reload();
  };
  // Entra no mundo aberto com a função escolhida
  g.openWorld = function (role) {
    sessionStorage.setItem('ww1_mode', 'open:' + role);
    location.reload();
  };

  let last = 0;
  function loop(now) {
    requestAnimationFrame(loop);
    const real = WW1.clamp((now - last) / 1000, 0, 0.25); // nunca negativo (o 1º quadro pode vir antes do fim do carregamento)
    let dt = Math.min(0.05, real);
    last = now;
    if (g.state === 'paused') dt = 0;
    if (g.mode === 'open' && WW1.ui.overlayOpen && WW1.ui.overlayOpen() && WW1.og.mode !== 'command') dt = 0; // mapa e ordens pausam o jogo
    WW1.time += dt;
    const playing = g.state === 'playing';

    for (let i = g.timers.length - 1; i >= 0; i--) if (WW1.time >= g.timers[i].at) { const t = g.timers.splice(i, 1)[0]; t.fn(); }

    WW1.pad.update();
    const overlay = WW1.ui.overlayOpen();
    if (!playing || overlay) WW1.ui.padMenus(real);

    if (playing && g.fade > 0 && !(g.victoryT >= 0)) g.fade = Math.max(0, g.fade - real * 0.8);
    if (playing && !overlay) {
      g.playTime += dt;
      WW1.ui.input(dt);
    } else if (g.state === 'menu' || g.state === 'briefing') g.fade = Math.max(0, g.fade - real * 0.6);

    // sequência de vitória: escurece, mostra a tela final
    if (g.victoryT !== undefined && g.victoryT >= 0) {
      g.victoryT += real;
      if (g.victoryT < 2) g.fade = g.victoryT / 2;
      else if (g.state === 'playing') { g.state = 'victory'; WW1.ui.winStats(g); if (g.mode === 'open') { WW1.ui.closeOverlays(); WW1.ui.openVictoryTexts(); } WW1.ui.show('victory1'); if (document.exitPointerLock) document.exitPointerLock(); }
      else g.fade = Math.max(0, 1 - (g.victoryT - 2) / 1.5);
    }

    if (dt > 0) {
      g.player.update(dt);
      for (const s of WW1.soldiers.slice()) s.update(dt, playing);
      if (g.mg) g.mg.update(dt, playing);
      WW1.artillery.update(dt);
      if (playing && g.mode === 'somme') WW1.mission.update(dt);
      if (g.mode === 'open' && (playing || g.state === 'victory')) WW1.og.update(dt);
    }

    const cam = g.camera;
    if (g.mode === 'open') WW1.ow.update(cam, dt, 2);
    if (g.state === 'menu' || g.state === 'briefing') {
      g.menuT += dt;
      const x = -14 + Math.sin(g.menuT * 0.05) * 10, z = W.trenchZ(x, W.PLAYER_TRENCH) + 2.6;
      cam.position.set(x, W.H(x, z) + 1.2, z);
      cam.rotation.set((4 + Math.sin(g.menuT * 0.13) * 1.5) * Math.PI / 180, Math.PI - (12 + Math.sin(g.menuT * 0.07) * 14) * Math.PI / 180, 0, 'YXZ');
      cam.fov = 55; cam.updateProjectionMatrix();
    }
    cam.updateMatrixWorld();

    g.sun.position.set(-40, 70, -50);

    const cf = new THREE.Vector3(0, 0, -1).applyQuaternion(cam.quaternion);
    const yaw = Math.atan2(cf.x, cf.z);
    WW1.audio.setListener(cam.position.x, cam.position.y, cam.position.z, yaw);
    const hp = g.player.hp / g.player.max;
    WW1.audio.setLoop('heart', playing && hp < 0.4 ? 0.4 + (0.4 - hp) : 0);

    const px = g.renderer.getDrawingBufferSize(new THREE.Vector2());
    WW1.fx.setScale(px.y / (2 * Math.tan(cam.fov * Math.PI / 360)));
    WW1.fx.update(dt, cam);
    if (playing || g.state === 'paused' || g.state === 'dead') WW1.ui.update();
    WW1.ui.fade(g.fade);

    const r = g.renderer;
    r.clear();
    r.render(g.scene, cam);
    if ((playing || g.state === 'paused') && !g.player.dead && (g.mode !== 'open' || WW1.og.mode === 'foot')) {
      g.vmCam.fov = cam.fov;
      g.vmCam.updateProjectionMatrix();
      r.clearDepth();
      r.render(g.vmScene, g.vmCam);
    }
  }

  window.addEventListener('load', () => setTimeout(init, 50));
})();
