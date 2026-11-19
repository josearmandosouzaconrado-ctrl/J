/* Nexo Motor: mini motor de jogos 2D / pixel art para celular.
 * É embutido dentro de cada jogo gerado (a função é convertida em texto e colada no HTML do jogo). */
'use strict';
function NEXO_MOTOR() {
  const N = window.Nexo = {};
  const teclas = {}, antes = {}, mapa = {
    ArrowLeft: 'esq', KeyA: 'esq', ArrowRight: 'dir', KeyD: 'dir', ArrowUp: 'cima', KeyW: 'cima', ArrowDown: 'baixo', KeyS: 'baixo',
    Space: 'a', KeyZ: 'a', KeyJ: 'a', Enter: 'a', KeyX: 'b', KeyK: 'b',
  };
  const apertos = new Set();   // guarda toques rápidos até o próximo quadro
  N.teclas = teclas;
  N.segurando = k => !!teclas[k] || apertos.has(k);
  N.apertou = k => apertos.has(k) || (!!teclas[k] && !antes[k]);
  let toque = false, toqueNovo = false, deslize = null;
  N.tocou = () => toqueNovo;
  N.deslize = () => { const d = deslize; deslize = null; return d; };
  addEventListener('keydown', e => { const k = mapa[e.code]; if (k) { if (!e.repeat && !teclas[k]) apertos.add(k); teclas[k] = true; e.preventDefault(); } N.somLiberar(); });
  addEventListener('keyup', e => { const k = mapa[e.code]; if (k) teclas[k] = false; });

  // ---------- tela ----------
  let cv, ctx, W = 160, H = 240, escala = 1, tremor = 0;
  N.iniciar = (o = {}) => {
    W = o.largura || 160; H = o.altura || 240;
    document.documentElement.style.cssText = 'height:100%;background:' + (o.borda || '#000');
    document.body.style.cssText = 'margin:0;height:100%;overflow:hidden;touch-action:none;user-select:none;-webkit-user-select:none;display:flex;align-items:center;justify-content:center;background:' + (o.borda || '#000');
    cv = document.createElement('canvas');
    cv.width = W; cv.height = H;
    cv.style.imageRendering = 'pixelated';
    document.body.appendChild(cv);
    ctx = cv.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    const ajustar = () => {
      // em pé, deixa a parte de baixo livre para os botões de toque
      const emPe = innerHeight > innerWidth;
      const reservado = N._temControles && emPe ? 150 : 0;
      const e = Math.min(innerWidth / W, (innerHeight - reservado) / H);
      escala = e;
      document.body.style.alignItems = reservado ? 'flex-start' : 'center';
      cv.style.marginTop = reservado ? Math.max(0, (innerHeight - reservado - H * e) / 2) + 'px' : '0';
      cv.style.width = Math.round(W * escala) + 'px';
      cv.style.height = Math.round(H * escala) + 'px';
    };
    addEventListener('resize', ajustar); ajustar(); N._ajustar = ajustar;
    let ini = null;
    cv.addEventListener('pointerdown', e => { toque = true; toqueNovo = true; ini = { x: e.clientX, y: e.clientY }; N.somLiberar(); });
    addEventListener('pointerup', e => {
      toque = false;
      if (ini) {
        const dx = e.clientX - ini.x, dy = e.clientY - ini.y;
        if (Math.max(Math.abs(dx), Math.abs(dy)) > 24) deslize = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'dir' : 'esq') : (dy > 0 ? 'baixo' : 'cima');
      }
      ini = null;
    });
    N.ctx = ctx; N.W = W; N.H = H;
    return ctx;
  };
  N.posToque = null;
  addEventListener('pointermove', e => { if (cv && e.buttons) { const r = cv.getBoundingClientRect(); N.posToque = { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; } });
  addEventListener('pointerdown', e => { if (cv) { const r = cv.getBoundingClientRect(); N.posToque = { x: (e.clientX - r.left) / r.width * W, y: (e.clientY - r.top) / r.height * H }; } });
  addEventListener('pointerup', () => { N.posToque = null; });

  // ---------- controles de toque ----------
  N.controles = (lista = ['esq', 'dir', 'a']) => {
    if (!('ontouchstart' in window) && !navigator.maxTouchPoints) return;
    N._temControles = true;
    const rot = { esq: '◀', dir: '▶', cima: '▲', baixo: '▼', a: 'A', b: 'B' };
    const css = 'position:fixed;width:64px;height:64px;border-radius:50%;border:2px solid #fff6;background:#fff2;color:#fffc;font:bold 24px sans-serif;display:flex;align-items:center;justify-content:center;touch-action:none;z-index:9;';
    const pos = { esq: 'left:14px;bottom:24px', dir: 'left:150px;bottom:24px', cima: 'left:82px;bottom:92px', baixo: 'left:82px;bottom:24px', a: 'right:18px;bottom:40px', b: 'right:92px;bottom:24px' };
    if (!lista.includes('cima') && !lista.includes('baixo')) pos.dir = 'left:88px;bottom:24px';
    for (const k of lista) {
      const b = document.createElement('div');
      b.textContent = rot[k];
      b.style.cssText = css + pos[k] + (k === 'a' ? ';width:76px;height:76px;background:#ff4d6d44' : '');
      const on = e => { e.preventDefault(); if (!teclas[k]) apertos.add(k); teclas[k] = true; b.style.background = '#fff6'; N.somLiberar(); };
      const off = e => { e.preventDefault(); teclas[k] = false; b.style.background = k === 'a' ? '#ff4d6d44' : '#fff2'; };
      b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off); b.addEventListener('pointercancel', off); b.addEventListener('pointerleave', off);
      document.body.appendChild(b);
    }
    if (N._ajustar) N._ajustar();
  };

  // ---------- sprites ----------
  N.sprite = (linhas, paleta) => {
    const h = linhas.length, w = Math.max(...linhas.map(l => l.length));
    const c = document.createElement('canvas'); c.width = w; c.height = h;
    const g = c.getContext('2d');
    linhas.forEach((l, y) => { for (let x = 0; x < l.length; x++) { const cor = paleta[l[x]]; if (cor) { g.fillStyle = cor; g.fillRect(x, y, 1, 1); } } });
    return c;
  };
  N.desenhar = (s, x, y, virar, esc = 1) => {
    if (!s) return;
    if (virar) { ctx.save(); ctx.translate(Math.round(x) + s.width * esc, Math.round(y)); ctx.scale(-esc, esc); ctx.drawImage(s, 0, 0); ctx.restore(); }
    else ctx.drawImage(s, Math.round(x), Math.round(y), s.width * esc, s.height * esc);
  };
  N.ret = (x, y, w, h, cor) => { ctx.fillStyle = cor; ctx.fillRect(Math.round(x), Math.round(y), w, h); };
  N.texto = (t, x, y, o = {}) => {
    ctx.font = `bold ${o.tam || 8}px monospace`;
    ctx.textAlign = o.alinhar || 'center'; ctx.textBaseline = 'top';
    if (o.sombra !== false) { ctx.fillStyle = '#000a'; ctx.fillText(t, Math.round(x) + 1, Math.round(y) + 1); }
    ctx.fillStyle = o.cor || '#fff'; ctx.fillText(t, Math.round(x), Math.round(y));
  };

  // ---------- utilidades ----------
  N.misturar = (a, b, t) => {
    const p = h => { h = String(h).replace('#', '').slice(0, 6); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) || 0); };
    const x = p(a), y = p(b);
    return '#' + x.map((v, i) => Math.round(v + (y[i] - v) * t).toString(16).padStart(2, '0')).join('');
  };
  N.colide = (a, b) => a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
  N.sorteio = (a, b) => a + Math.random() * (b - a);
  N.sorteioInt = (a, b) => Math.floor(N.sorteio(a, b + 1));
  N.tremer = f => { tremor = Math.max(tremor, f); };
  N.recorde = (chave, valor) => {
    let r = 0;
    try { r = +localStorage.getItem('nexo_rec_' + chave) || 0; if (valor > r) { localStorage.setItem('nexo_rec_' + chave, valor); r = valor; } } catch (e) { r = Math.max(r, valor || 0); }
    return r;
  };

  // ---------- partículas ----------
  const parts = [];
  N.explodir = (x, y, cor, n = 12, vel = 60) => {
    for (let i = 0; i < n; i++) { const a = Math.random() * 6.28, v = Math.random() * vel; parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0.4 + Math.random() * 0.4, cor }); }
  };

  // ---------- som (WebAudio, sem arquivos) ----------
  let ac = null;
  N.somLiberar = () => { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { ac = false; } } if (ac && ac.state === 'suspended') ac.resume(); };
  const SONS = { pulo: [[520, 0.08, 'square', 880]], moeda: [[988, 0.06, 'square'], [1319, 0.12, 'square']], tiro: [[880, 0.06, 'square', 220]],
    explosao: [[120, 0.25, 'sawtooth', 40]], dano: [[220, 0.2, 'sawtooth', 110]], inicio: [[523, 0.1, 'square'], [659, 0.1, 'square'], [784, 0.15, 'square']],
    poder: [[440, 0.08, 'triangle'], [660, 0.08, 'triangle'], [880, 0.12, 'triangle']], fim: [[392, 0.15, 'square'], [330, 0.15, 'square'], [262, 0.3, 'square']] };
  N.som = nome => {
    if (!ac) return;
    let t = ac.currentTime;
    for (const [f, d, tipo, f2] of SONS[nome] || []) {
      const o = ac.createOscillator(), g = ac.createGain();
      o.type = tipo; o.frequency.setValueAtTime(f, t);
      if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
      g.gain.setValueAtTime(0.08, t); g.gain.exponentialRampToValueAtTime(0.001, t + d);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + d);
      t += d * 0.9;
    }
  };

  // ---------- laço ----------
  N.rodar = (atualizar, desenhar) => {
    let ant = performance.now();
    const quadro = agora => {
      const dt = Math.min(0.05, (agora - ant) / 1000); ant = agora;
      atualizar(dt);
      for (let i = parts.length - 1; i >= 0; i--) { const p = parts[i]; p.x += p.vx * dt; p.y += p.vy * dt; p.vy += 80 * dt; p.t -= dt; if (p.t <= 0) parts.splice(i, 1); }
      ctx.save();
      if (tremor > 0) { ctx.translate(N.sorteio(-tremor, tremor), N.sorteio(-tremor, tremor)); tremor = Math.max(0, tremor - 30 * dt); }
      desenhar(ctx);
      for (const p of parts) N.ret(p.x, p.y, 2, 2, p.cor);
      ctx.restore();
      Object.assign(antes, teclas); apertos.clear(); toqueNovo = false;
      requestAnimationFrame(quadro);
    };
    requestAnimationFrame(quadro);
  };

  // tela de título / fim reaproveitável
  N.telaTitulo = (titulo, sub, cores) => {
    N.ret(0, 0, W, H, cores.fundo);
    const pisca = Math.floor(performance.now() / 500) % 2;
    N.texto(titulo, W / 2, H * 0.3, { tam: titulo.length > 14 ? 10 : 14, cor: cores.destaque });
    if (sub) N.texto(sub, W / 2, H * 0.3 + 22, { tam: 7, cor: cores.texto });
    if (pisca) N.texto('TOQUE PARA JOGAR', W / 2, H * 0.62, { tam: 8, cor: cores.texto });
  };
  N.querComecar = () => N.tocou() || N.apertou('a');
}
