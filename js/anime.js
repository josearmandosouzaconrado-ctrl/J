'use strict';
// =====================================================================
//  ANIME DE CRÔNICAS DE ELDORIA — o player dentro do jogo
//  Um menu na tela inicial ("Anime") lista os capítulos. Cada capítulo é
//  animado ao vivo aqui no canvas (não é um vídeo baixado): personagens
//  desenhados em estilo de anime (arte em anime/arte/*.webp), com
//  respiração, cabelo e roupa ao vento, piscadas, boca falando, golpes,
//  linhas de velocidade, quadros de impacto, faíscas, neve, brasas e aura.
//  A trilha é tocada pelo sintetizador do jogo (js/musica.js) e os
//  efeitos sonoros são sintetizados na hora, sincronizados com a imagem.
//  Os capítulos se registram com Anime.registrar({...}) (js/anime_ep1.js).
// =====================================================================
const Anime = {
  W: 1280, H: 720, caps: [], img: {}, X: null, t: 0, filtros: true,
  // ponto (ix, iy) da imagem do último cenário desenhado -> tela
  noFundo(ix, iy) { const u = this.ult || { k: 1, x0: 0, y0: 0 }; return [(ix - u.x0) * u.k + this.CAM.sx, (iy - u.y0) * u.k + this.CAM.sy]; },
  registrar(cap) { cap.dur = cap.cenas.reduce((a, c) => a + c.d, 0); this.caps.push(cap); },

  // ---------- utilidades ----------
  R(i) { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); },
  cl: (v, a = 0, b = 1) => Math.max(a, Math.min(b, v)),
  lerp: (a, b, k) => a + (b - a) * k,
  ease: k => k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2,
  easeOut: k => 1 - Math.pow(1 - k, 3),
  seg(t, a, b) { return this.cl((t - a) / (b - a)); },
  doze: t => Math.floor(t * 12) / 12,      // animação "em dois" (12 desenhos por segundo)

  // ---------- carregar a arte ----------
  carregar(cap, prog) {
    const nomes = cap.arte.filter(n => !this.img[n]);
    let feitos = 0;
    return Promise.all(nomes.map(n => new Promise(ok => {
      const i = new Image();
      i.onload = () => { this.img[n] = i; feitos++; prog && prog(feitos / nomes.length); ok(); };
      i.onerror = () => { feitos++; prog && prog(feitos / nomes.length); ok(); };
      i.src = 'anime/arte/' + n + '.webp';
    })));
  },
  // versões tingidas/silhueta (guardadas para não refazer a cada quadro)
  _tint: {},
  tingida(nome, cor, a = 1, modo = 'source-atop') {
    const k = nome + cor + a + modo, im = this.img[nome]; if (!im) return null;
    if (this._tint[k]) return this._tint[k];
    const c = document.createElement('canvas'); c.width = im.width; c.height = im.height;
    const g = c.getContext('2d'); g.drawImage(im, 0, 0); g.globalCompositeOperation = modo; g.globalAlpha = a; g.fillStyle = cor; g.fillRect(0, 0, c.width, c.height);
    return (this._tint[k] = c);
  },

  // ---------- câmera e cenário ----------
  CAM: { sx: 0, sy: 0 },
  tremor(t, forca, ate) { const f = forca * this.cl(1 - t / ate), q = Math.floor(t * 48); this.CAM.sx = (this.R(q) - 0.5) * 2 * f; this.CAM.sy = (this.R(q + 9) - 0.5) * 2 * f; },
  fundo(nome, zoom, cx, cy, filtro) {
    const X = this.X, im = this.img[nome]; if (!im) { X.fillStyle = '#000'; X.fillRect(0, 0, this.W, this.H); return; }
    const k = (this.W / im.width) * zoom, vw = this.W / k, vh = this.H / k;
    const x0 = this.cl(cx * im.width - vw / 2, 0, im.width - vw), y0 = this.cl(cy * im.height - vh / 2, 0, im.height - vh);
    this.ult = { k, x0, y0 };
    X.save(); if (filtro && this.filtros) X.filter = filtro;
    X.drawImage(im, x0, y0, vw, vh, this.CAM.sx - 14, this.CAM.sy - 14, this.W + 28, this.H + 28);
    X.restore();
  },

  // ---------- personagem (cel) ----------
  // x, y = pés (centro embaixo); h = altura na tela. o: { flip, alpha, rot, resp, vento, ventoAte, img (tela tingida), aura, sil, brilho }
  cel(nome, x, y, h, o = {}) {
    const X = this.X, im = o.img || (o.sil ? this.tingida(nome, o.sil, 1, 'source-in') : o.tint ? this.tingida(nome, o.tint[0], o.tint[1]) : this.img[nome]);
    if (!im) return;
    const T = this.t, k = h / im.height, w = im.width * k;
    const r = o.resp == null ? 0.010 : o.resp, sy = 1 + r * Math.sin(T * 2.6 + (o.fase || 0)), sx = 1 - r * 0.5 * Math.sin(T * 2.6 + (o.fase || 0));
    X.save(); X.translate(x + this.CAM.sx * (o.par || 1), y + this.CAM.sy * (o.par || 1)); if (o.rot) X.rotate(o.rot); X.scale((o.flip ? -1 : 1) * sx * (o.esc || 1), sy * (o.esc || 1));
    if (o.alpha != null) X.globalAlpha *= o.alpha;
    if (o.aura) {
      // aura de energia: o próprio desenho borrado e brilhando por trás
      const q = Math.floor(T * 24);
      X.save(); X.globalCompositeOperation = 'lighter';
      const az = this.tingida(nome, o.aura, 1, 'source-in');
      for (let j = 0; j < 3; j++) { X.globalAlpha = 0.28 * (o.auraF || 1); const e = 1.03 + j * 0.035 + this.R(q + j) * 0.02; X.drawImage(az, -w / 2 * e, -h * e - j * 6, w * e, h * e); }
      X.restore();
    }
    this._desenhaVento(im, -w / 2, -h, w, h, o.vento == null ? 1 : o.vento, o.ventoAte == null ? 0.38 : o.ventoAte, T + (o.fase || 0));
    if (o.brilho) { X.globalCompositeOperation = 'lighter'; X.globalAlpha = o.brilho; X.drawImage(this.tingida(nome, '#bfeaff', 1, 'source-in'), -w / 2, -h, w, h); }
    X.restore();
  },
  // cabelo e roupas ao vento: a parte de cima é desenhada em faixas que ondulam
  _desenhaVento(im, x, y, w, h, amp, ate, T) {
    const X = this.X;
    if (!amp) { X.drawImage(im, x, y, w, h); return; }
    const n = 22, hs = im.height * ate, k = h / im.height;
    for (let i = 0; i < n; i++) {
      const s0 = i * hs / n, f = 1 - i / n, dx = amp * 5 * f * f * Math.sin(T * 3.1 + i * 0.32);
      X.drawImage(im, 0, s0, im.width, hs / n + 1, x + dx, y + s0 * k, w, (hs / n + 1) * k);
    }
    X.drawImage(im, 0, hs, im.width, im.height - hs, x, y + hs * k, w, (im.height - hs) * k);
  },

  // ---------- close no rosto ----------
  // a arte cobre a tela; ROSTOS dá boca, olhos e cor da pele para a fala e as piscadas
  ROSTOS: {
    aren_rosto: { b: [626, 416, 46, 0], o: [[524, 282, 40, 34], [722, 272, 40, 34]], p: '#efa86c' },
    aren_triste: { b: [490, 382, 32, 0], o: [[382, 272, 32, 22], [552, 262, 32, 22]], p: '#d47e40' },
    lina_rosto: { b: [660, 428, 40, 1], o: [[526, 318, 38, 34], [736, 262, 38, 34]], p: '#efae74' },
    lina_triste: { b: [494, 428, 32, 0], o: [[392, 210, 34, 26], [590, 208, 34, 26]], p: '#d08446' },
    borin_rosto: { b: [490, 376, 36, 0], o: [[420, 222, 26, 15], [560, 222, 26, 15]], p: '#a86638' }
  },
  rosto(nome, o = {}) {
    const X = this.X, im = o.sil ? this.tingida(nome, o.sil, 1, 'source-in') : o.tint ? this.tingida(nome, o.tint[0], o.tint[1]) : this.img[nome]; if (!im) return;
    const T = this.t, z = o.zoom || 1, k = (this.W * 0.98 / im.width) * z, w = im.width * k, h = im.height * k;
    const bob = Math.sin(T * 2.2) * 3;
    const x0 = this.W / 2 - w / 2 + (o.dx || 0) + this.CAM.sx, y0 = this.H - h + (o.dy || 0) + bob + this.CAM.sy + (o.desce == null ? 30 : o.desce);
    X.save(); if (o.alpha != null) X.globalAlpha = o.alpha;
    this._desenhaVento(im, x0, y0, w, h, o.vento == null ? 1.6 : o.vento, 0.42, T);
    const R = this.ROSTOS[nome];
    if (R) {
      const P = (px, py) => [x0 + px * k, y0 + py * k];
      // piscar: a pálpebra desce sobre o olho
      const pis = o.pisca != null ? o.pisca : this._piscada(T + (o.fase || 0));
      if (pis > 0) for (const [ex, ey, ew, eh] of R.o) {
        const [cx, cy] = P(ex, ey), rw = ew * k, rh = eh * k;
        X.save(); X.beginPath(); X.ellipse(cx, cy, rw * 1.08, rh * 1.15, 0, 0, 7); X.clip();
        X.fillStyle = R.p; X.fillRect(cx - rw * 1.2, cy - rh * 1.3, rw * 2.4, rh * 2.6 * pis);
        X.restore();
        const ly = cy - rh * 1.15 + rh * 2.3 * pis;
        X.strokeStyle = '#2a140c'; X.lineWidth = Math.max(2, 5 * k); X.lineCap = 'round';
        X.beginPath(); X.moveTo(cx - rw, ly - rh * 0.1); X.quadraticCurveTo(cx, ly + rh * 0.35 * pis, cx + rw, ly - rh * 0.1); X.stroke();
      }
      // boca falando (abre e fecha)
      const fala = o.fala || 0;
      if (fala > 0) {
        const [bx, by] = P(R.b[0], R.b[1]), bw = R.b[2] * k, ab = Math.abs(Math.sin(T * 15)) * fala;
        if (R.b[3]) { // a arte já está de boca aberta: fecha de vez em quando
          if (ab < 0.45) { X.fillStyle = R.p; X.beginPath(); X.ellipse(bx, by, bw * 0.62, bw * 0.38, 0, 0, 7); X.fill(); X.strokeStyle = '#6a2418'; X.lineWidth = Math.max(2, 4 * k); X.beginPath(); X.moveTo(bx - bw * 0.45, by - bw * 0.05); X.quadraticCurveTo(bx, by + bw * 0.18, bx + bw * 0.45, by - bw * 0.08); X.stroke(); }
        } else if (ab > 0.2) {
          X.fillStyle = '#6a1e1e'; X.strokeStyle = '#220a08'; X.lineWidth = Math.max(1.5, 3 * k);
          X.beginPath(); X.ellipse(bx, by + bw * 0.12 * ab, bw * 0.42, bw * (0.08 + 0.26 * ab), 0, 0, 7); X.fill(); X.stroke();
          X.fillStyle = '#d86a6a'; X.beginPath(); X.ellipse(bx, by + bw * 0.28 * ab, bw * 0.22, bw * 0.08 * ab, 0, 0, 7); X.fill();
        }
      }
    }
    X.restore();
  },
  _piscada(T) { const c = T % 3.7; return c < 0.06 ? c / 0.06 : c < 0.14 ? 1 : c < 0.2 ? 1 - (c - 0.14) / 0.06 : 0; },

  // ---------- efeitos ----------
  linhasFoco(cx, cy, n, cor, t, r0 = 260) {
    const X = this.X; X.save(); X.fillStyle = cor; const q = Math.floor(t * 24);
    for (let i = 0; i < n; i++) {
      const a = this.R(i * 7.3 + q * 0.17) * Math.PI * 2, w = 0.004 + this.R(i + q) * 0.012, ri = r0 + this.R(i * 3 + q) * 140;
      X.beginPath(); X.moveTo(cx + Math.cos(a) * ri, cy + Math.sin(a) * ri); X.lineTo(cx + Math.cos(a - w) * 1600, cy + Math.sin(a - w) * 1600); X.lineTo(cx + Math.cos(a + w) * 1600, cy + Math.sin(a + w) * 1600); X.closePath(); X.fill();
    }
    X.restore();
  },
  linhasVelocidade(t, cor1, cor2, dir = -1) {
    const X = this.X, g = X.createLinearGradient(0, 0, 0, this.H); g.addColorStop(0, cor1); g.addColorStop(0.5, cor2); g.addColorStop(1, cor1);
    X.fillStyle = g; X.fillRect(0, 0, this.W, this.H); const q = Math.floor(t * 24);
    for (let i = 0; i < 70; i++) {
      const y = this.R(i * 3.1 + q * 0.3) * this.H, L = 200 + this.R(i + q) * 700, x = ((this.R(i * 5.7) * this.W * 2 + q * 180 * -dir) % (this.W * 2)) - this.W * 0.5;
      X.fillStyle = `rgba(255,255,255,${0.15 + this.R(i * 9 + q) * 0.5})`; X.fillRect(x, y, L, 1 + this.R(i * 2.2) * 4);
    }
  },
  particulas(tipo, t, n, o = {}) {
    const X = this.X, W = this.W, H = this.H, R = i => this.R(i);
    X.save();
    for (let i = 0; i < n; i++) {
      const s = R(i * 1.37 + (o.sem || 0)), s2 = R(i * 2.91 + 5), s3 = R(i * 4.17 + 9);
      if (tipo === 'neve') {
        const vel = 40 + s2 * 80, z = 0.5 + s3 * 1.5, y = ((s * H + t * vel * z) % (H + 40)) - 20, x = ((s2 * W + Math.sin(t * 1.2 + i) * 30 + t * (o.vento || 30) * z) % (W + 40) + W + 40) % (W + 40) - 20;
        X.fillStyle = `rgba(255,255,255,${0.5 + s3 * 0.5})`; X.beginPath(); X.arc(x, y, 1 + z * 1.6, 0, 7); X.fill();
      } else if (tipo === 'brasa') {
        const vel = 40 + s2 * 90, y = H - ((s * H + t * vel) % (H + 40)), x = (s2 * W + Math.sin(t * 2 + i) * 40 + t * 30) % W;
        X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(255,${120 + s3 * 100},40,${0.5 + 0.5 * Math.sin(t * 6 + i)})`; X.beginPath(); X.arc(x, y, 1.5 + s3 * 2.5, 0, 7); X.fill();
      } else if (tipo === 'brilho') {
        const vel = 15 + s2 * 30, y = H - ((s * H + t * vel) % (H + 40)), x = (s2 * W + Math.sin(t + i) * 20) % W;
        X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(${o.cor || '255,230,150'},${0.3 + 0.4 * Math.sin(t * 3 + i)})`; X.beginPath(); X.arc(x, y, 1 + s3 * 2, 0, 7); X.fill();
      } else if (tipo === 'folha') {
        const x = ((s * W * 1.5 - t * (200 + s2 * 200)) % (W + 100) + W + 100) % (W + 100) - 50, y = (s2 * H * 0.8 + Math.sin(t * 3 + i) * 40);
        X.save(); X.translate(x, y); X.rotate(t * 4 + i); X.fillStyle = s3 > 0.5 ? '#f0a0b8' : '#9ad060'; X.beginPath(); X.ellipse(0, 0, 6, 3, 0, 0, 7); X.fill(); X.restore();
      } else if (tipo === 'aura') {
        const [ax, ay, aw] = o.area, vel = 200 + s2 * 300, y = ay - ((s * 300 + t * vel) % 300), x = ax + (s2 - 0.5) * aw;
        X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(140,220,255,${0.6 * (1 - (ay - y) / 300)})`; X.fillRect(x, y, 3, 18 + s3 * 20);
      }
    }
    X.restore();
  },
  estouro(tipo, x, y, t, n = 30, sem = 0) {
    if (t < 0 || t > 1.2) return;
    const X = this.X, R = i => this.R(i); X.save();
    for (let i = 0; i < n; i++) {
      const a = R(i * 3.3 + sem) * Math.PI * 2, v = 200 + R(i * 7.1 + sem) * 600, g = tipo === 'poeira' ? 0 : 900;
      const px = x + Math.cos(a) * v * t * (tipo === 'poeira' ? 0.4 : 1), py = y + Math.sin(a) * v * t * (tipo === 'poeira' ? 0.15 : 1) + g * t * t * 0.5;
      const vida = 1 - t / (tipo === 'poeira' ? 1.2 : 0.6); if (vida <= 0) continue;
      if (tipo === 'faisca') { X.globalCompositeOperation = 'lighter'; X.strokeStyle = `rgba(255,${200 + R(i) * 55},120,${vida})`; X.lineWidth = 3; X.beginPath(); X.moveTo(px, py); X.lineTo(px - Math.cos(a) * 26, py - Math.sin(a) * 26); X.stroke(); }
      else if (tipo === 'palha') { X.save(); X.translate(px, py); X.rotate(a + t * 8); X.fillStyle = `rgba(230,200,110,${vida})`; X.fillRect(-8, -1.5, 16, 3); X.restore(); }
      else if (tipo === 'poeira') { X.fillStyle = `rgba(150,120,100,${vida * 0.5})`; X.beginPath(); X.arc(px, py, 20 + t * 60 * R(i * 1.9), 0, 7); X.fill(); }
      else if (tipo === 'gelo') { X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(180,240,255,${vida})`; X.save(); X.translate(px, py); X.rotate(a); X.fillRect(-6, -2, 12, 4); X.restore(); }
    }
    X.restore();
  },
  corte(x, y, r, a0, a1, k, cor = '200,240,255') {
    if (k <= 0 || k >= 1) return;
    const X = this.X; X.save(); X.globalCompositeOperation = 'lighter';
    const aa = a0 + (a1 - a0) * Math.min(1, k * 2), ab = a0 + (a1 - a0) * Math.max(0, k * 2 - 1);
    for (let j = 0; j < 3; j++) { X.beginPath(); X.arc(x, y, r + j * 8, ab, aa, a1 < a0); X.arc(x, y, r * 0.72 + j * 10, aa, ab, a1 >= a0); X.closePath(); X.fillStyle = `rgba(${cor},${(0.6 - j * 0.18) * (1 - k * 0.6)})`; X.fill(); }
    X.restore();
  },
  vinheta(forca = 0.55, cor = '0,0,0') { const X = this.X, g = X.createRadialGradient(this.W / 2, this.H / 2, this.H * 0.35, this.W / 2, this.H / 2, this.H * 0.95); g.addColorStop(0, `rgba(${cor},0)`); g.addColorStop(1, `rgba(${cor},${forca})`); X.fillStyle = g; X.fillRect(0, 0, this.W, this.H); },
  tinta(cor, a) { if (a <= 0) return; const X = this.X; X.save(); X.globalAlpha = Math.min(1, a); X.fillStyle = cor; X.fillRect(0, 0, this.W, this.H); X.restore(); },
  tinge(cor, a, modo = 'multiply') { if (a <= 0) return; const X = this.X; X.save(); X.globalCompositeOperation = modo; X.globalAlpha = a; X.fillStyle = cor; X.fillRect(0, 0, this.W, this.H); X.restore(); },
  impacto() { const X = this.X; X.save(); X.globalCompositeOperation = 'difference'; X.fillStyle = '#fff'; X.fillRect(0, 0, this.W, this.H); X.globalCompositeOperation = 'saturation'; X.fillStyle = '#000'; X.fillRect(0, 0, this.W, this.H); X.restore(); },
  fogo(t, x, y, s) { // chamas da fogueira (luz que tremula)
    const X = this.X; X.save(); X.globalCompositeOperation = 'lighter';
    const g = X.createRadialGradient(x, y, 0, x, y, 420 * s); g.addColorStop(0, `rgba(255,150,60,${0.32 + 0.08 * Math.sin(t * 13) + 0.05 * Math.sin(t * 7.3)})`); g.addColorStop(1, 'rgba(255,90,20,0)');
    X.fillStyle = g; X.fillRect(x - 420 * s, y - 420 * s, 840 * s, 840 * s); X.restore();
  },
  // legenda
  legenda(nome, texto, cor = '#ffd75a') {
    const X = this.X, W = this.W; X.save(); X.font = 'bold 30px "DejaVu Sans", Arial, sans-serif'; X.textBaseline = 'alphabetic'; X.lineJoin = 'round';
    const linha = (nome ? nome + ': ' : '') + texto, y = this.H - 40;
    const wt = X.measureText(linha).width, x0 = W / 2 - wt / 2;
    X.lineWidth = 7; X.strokeStyle = 'rgba(0,0,0,0.92)'; X.textAlign = 'left'; X.strokeText(linha, x0, y);
    if (nome) { const wn = X.measureText(nome + ': ').width; X.fillStyle = cor; X.fillText(nome + ': ', x0, y); X.fillStyle = '#fff'; X.fillText(texto, x0 + wn, y); }
    else { X.fillStyle = '#f0f0f0'; X.font = 'italic bold 30px "DejaVu Serif", Georgia, serif'; X.strokeText(texto, W / 2 - X.measureText(texto).width / 2, y); X.fillText(texto, W / 2 - X.measureText(texto).width / 2, y); }
    X.restore();
  },
  falas(t, lista) { for (const [a, b, nome, txt, cor] of lista) if (t >= a && t < b) this.legenda(nome, txt, cor); },
  falando(t, lista) { return lista.some(([a, b]) => t >= a && t < b - 0.15) ? 1 : 0; },
  granulado(t) { const X = this.X; X.save(); X.globalAlpha = 0.045; const q = Math.floor(t * 24); for (let i = 0; i < 200; i++) { X.fillStyle = this.R(i + q * 13) > 0.5 ? '#fff' : '#000'; X.fillRect(this.R(i * 1.7 + q) * this.W, this.R(i * 2.3 + q * 3) * this.H, 2, 2); } X.restore(); },

  // ---------- desenhar um instante ----------
  desenhar(ctx, cap, t) {
    this.X = ctx; this.t = t; ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, this.W, this.H);
    let t0 = 0;
    for (const c of cap.cenas) { if (t < t0 + c.d) { this.CAM.sx = 0; this.CAM.sy = 0; ctx.save(); c.f(t - t0, this, t); ctx.restore(); break; } t0 += c.d; }
    if (this.qualidade !== 'baixa') this.granulado(t);
  },
  inicioCena(cap, i) { let a = 0; for (let j = 0; j < i; j++) a += cap.cenas[j].d; return a; },

  // =====================================================================
  //  SOM: música (sintetizador do jogo) + efeitos sintetizados
  // =====================================================================
  // dispara um efeito no contexto de áudio `ac`, ligado em `out` (e no eco `rv`), no instante `t` (tempo do contexto)
  sfx(ac, out, rv, nome, t, d, v) {
    const SR = ac.sampleRate;
    if (!this._ruido || this._ruido.sr !== SR) {
      const mk = marrom => { const b = ac.createBuffer(1, SR * 2, SR), x = b.getChannelData(0); let l = 0; for (let i = 0; i < x.length; i++) { if (marrom) { l = (l + 0.02 * (Math.random() * 2 - 1)) / 1.02; x[i] = l * 3.5; } else x[i] = Math.random() * 2 - 1; } return b; };
      this._ruido = { sr: SR, b: mk(false), m: mk(true) };
    }
    const ruido = this._ruido.b, marrom = this._ruido.m;
    const env = (g, t, a, dur, v, rel = 0.1) => { g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(v, t + a); g.gain.setValueAtTime(v, Math.max(t + a, t + dur - rel)); g.gain.linearRampToValueAtTime(0.0001, t + dur); };
    const saida = (n, rev = 0.3) => { n.connect(out); if (rev && rv) { const r2 = ac.createGain(); r2.gain.value = rev; n.connect(r2); r2.connect(rv); } };
    const fonte = (t, dur, buf = ruido) => { const s = ac.createBufferSource(); s.buffer = buf; s.loop = true; s.start(t, Math.random()); s.stop(t + dur + 0.1); return s; };
    const osc = (tipo, f, t, dur) => { const o = ac.createOscillator(); o.type = tipo; o.frequency.setValueAtTime(f, t); o.start(t); o.stop(t + dur + 0.1); return o; };
    const filtro = (tipo, f, q = 1) => { const x = ac.createBiquadFilter(); x.type = tipo; x.frequency.value = f; x.Q.value = q; return x; };
    const F = {
      vento(t, d, v) { const s = fonte(t, d, marrom), f = filtro('bandpass', 500, 0.6), g = ac.createGain(); s.connect(f); f.connect(g); env(g, t, 1.2, d, v, 1.5); for (let k = 0; k < d; k += 1.5) f.frequency.linearRampToValueAtTime(350 + Math.random() * 700, t + k); saida(g, 0); },
      horn(t, d, v) { const g = ac.createGain(); env(g, t, 0.35, d, v * 0.5, 0.6); const f = filtro('lowpass', 500, 2); f.frequency.setValueAtTime(250, t); f.frequency.linearRampToValueAtTime(900, t + 0.5); f.frequency.linearRampToValueAtTime(600, t + d);
        for (const [m, k] of [[1, 1], [1.006, 0.7], [2, 0.3], [0.5, 0.4]]) { const o = osc('sawtooth', 92 * m, t, d); o.frequency.linearRampToValueAtTime(98 * m, t + 0.3); const gg = ac.createGain(); gg.gain.value = k; o.connect(gg); gg.connect(f); }
        f.connect(g); saida(g, 0.9); },
      boom(t, d, v) { const o = osc('sine', 80, t, d); o.frequency.exponentialRampToValueAtTime(30, t + d); const g = ac.createGain(); env(g, t, 0.01, d, v, 0.8); o.connect(g); saida(g, 0.5); F.whoosh(t - 0.2, 0.4, v * 0.5); },
      brilho(t, d, v) { [1568, 2093, 2637, 3136, 4186].forEach((f, i) => { const o = osc('sine', f, t + i * 0.07, 0.8), g = ac.createGain(); env(g, t + i * 0.07, 0.005, 0.8, v * 0.15, 0.7); o.connect(g); saida(g, 0.8); }); },
      passaros(t, d, v) { for (let k = 0.2; k < d; k += 0.5 + Math.random() * 1.2) { const tt = t + k, o = osc('sine', 3000, tt, 0.15); o.frequency.setValueAtTime(2500 + Math.random() * 1500, tt); o.frequency.exponentialRampToValueAtTime(4200, tt + 0.07); o.frequency.exponentialRampToValueAtTime(2800, tt + 0.14); const g = ac.createGain(); env(g, tt, 0.01, 0.15, v * 0.3, 0.05); o.connect(g); saida(g, 0.5); } },
      whoosh(t, d, v) { const s = fonte(t, d), f = filtro('bandpass', 400, 1.5), g = ac.createGain(); f.frequency.setValueAtTime(300, t); f.frequency.exponentialRampToValueAtTime(3000, t + d * 0.6); f.frequency.exponentialRampToValueAtTime(800, t + d); s.connect(f); f.connect(g); env(g, t, d * 0.5, d, v * 0.8, d * 0.4); saida(g, 0.2); },
      pancada(t, d, v) { const s = fonte(t, d), f = filtro('lowpass', 1500), g = ac.createGain(); s.connect(f); f.connect(g); env(g, t, 0.003, d, v * 0.9, d * 0.8); saida(g, 0.2); const o = osc('sine', 140, t, 0.2); o.frequency.exponentialRampToValueAtTime(50, t + 0.2); const g2 = ac.createGain(); env(g2, t, 0.003, 0.2, v * 0.8, 0.15); o.connect(g2); saida(g2, 0.1); },
      impacto(t, d, v) { const o = osc('sine', 110, t, d); o.frequency.exponentialRampToValueAtTime(28, t + d); const g = ac.createGain(); env(g, t, 0.005, d, v * 1.2, d * 0.8); o.connect(g); saida(g, 0.3); const s = fonte(t, 0.5, marrom), g2 = ac.createGain(); env(g2, t, 0.005, 0.5, v * 0.9, 0.4); s.connect(g2); saida(g2, 0.3); },
      clang(t, d, v) { [523, 1187, 1733, 2611, 3517].forEach((f, i) => { const o = osc(i ? 'sine' : 'triangle', f, t, d), g = ac.createGain(); env(g, t, 0.002, d / (1 + i * 0.4), v * 0.22 / (1 + i * 0.3), d / (1 + i * 0.4) * 0.9); o.connect(g); saida(g, 0.7); }); F.pancada(t, 0.2, v * 0.8); },
      arrasta(t, d, v) { const s = fonte(t, d, marrom), f = filtro('lowpass', 700), g = ac.createGain(); s.connect(f); f.connect(g); env(g, t, 0.05, d, v, d * 0.7); saida(g, 0); },
      fogo(t, d, v) { const s = fonte(t, d, marrom), f = filtro('lowpass', 900), g = ac.createGain(); s.connect(f); f.connect(g); env(g, t, 0.8, d, v * 0.7, 1); saida(g, 0); for (let k = 0; k < d; k += 0.06 + Math.random() * 0.25) { const tt = t + k, s2 = fonte(tt, 0.03), f2 = filtro('highpass', 2000), g2 = ac.createGain(); env(g2, tt, 0.002, 0.03, v * (0.1 + Math.random() * 0.25), 0.02); s2.connect(f2); f2.connect(g2); saida(g2, 0); } },
      gritos(t, d, v) { for (let i = 0; i < 4; i++) { const tt = t + i * 0.6 + Math.random() * 0.3, o = osc('sawtooth', 500 + Math.random() * 300, tt, 0.7); o.frequency.linearRampToValueAtTime(380, tt + 0.7); const f = filtro('bandpass', 1200, 3), g = ac.createGain(); env(g, tt, 0.05, 0.7, v * 0.4, 0.3); o.connect(f); f.connect(g); saida(g, 0.8); } },
      rugido(t, d, v) { const o = osc('sawtooth', 120, t, d); o.frequency.linearRampToValueAtTime(150, t + 0.4); o.frequency.linearRampToValueAtTime(90, t + d); const s = fonte(t, d), mix = ac.createGain(), gn = ac.createGain(); gn.gain.value = 0.4; s.connect(gn); gn.connect(mix); o.connect(mix);
        const f1 = filtro('bandpass', 700, 4), f2 = filtro('bandpass', 1200, 5), g = ac.createGain(); mix.connect(f1); mix.connect(f2); f1.connect(g); f2.connect(g); const lfo = osc('sine', 9, t, d), lg = ac.createGain(); lg.gain.value = 20; lfo.connect(lg); lg.connect(o.frequency); env(g, t, 0.08, d, v * 0.8, 0.6); saida(g, 0.5); },
      risada(t, d, v) { for (let k = 0; k < d; k += 0.22) { const o = osc('sawtooth', 140 - k * 10, t + k, 0.16), f = filtro('bandpass', 600, 4), g = ac.createGain(); env(g, t + k, 0.02, 0.16, v * 0.6, 0.08); o.connect(f); f.connect(g); saida(g, 0.4); } },
      passos(t, d, v) { for (let k = 0; k < d; k += 0.21) F.pancada(t + k, 0.1, v * 0.4); },
      carga(t, d, v) { const s = fonte(t, d), f = filtro('bandpass', 200, 3), g = ac.createGain(); f.frequency.setValueAtTime(200, t); f.frequency.exponentialRampToValueAtTime(5000, t + d); s.connect(f); f.connect(g); env(g, t, d * 0.9, d, v, 0.1); saida(g, 0.4); const o = osc('sine', 110, t, d); o.frequency.exponentialRampToValueAtTime(880, t + d); const g2 = ac.createGain(); env(g2, t, d * 0.9, d, v * 0.3, 0.1); o.connect(g2); saida(g2, 0.5); },
      corte(t, d, v) { F.whoosh(t - 0.1, 0.3, v); const s = fonte(t, d), f = filtro('highpass', 4000), g = ac.createGain(); s.connect(f); f.connect(g); env(g, t, 0.005, d, v * 0.4, d * 0.9); saida(g, 0.9); [2093, 3136, 4186].forEach(fq => { const o = osc('sine', fq, t, d), g2 = ac.createGain(); env(g2, t, 0.003, d, v * 0.12, d * 0.9); o.connect(g2); saida(g2, 0.9); }); F.boom(t, 1, v * 0.7); },
      quebra(t, d, v) { F.clang(t, 0.5, v * 0.7); for (let i = 0; i < 6; i++) F.pancada(t + 0.05 + Math.random() * 0.3, 0.08, v * 0.3); },
      tensao(t, d, v) { const o = osc('sawtooth', 55, t, d), f = filtro('lowpass', 400), g = ac.createGain(); o.connect(f); f.connect(g); env(g, t, 0.02, d, v, d * 0.8); saida(g, 0.6); },
      drone(t, d, v) { for (const fq of [55, 55.5, 82.4]) { const o = osc('sawtooth', fq, t, d), f = filtro('lowpass', 300), g = ac.createGain(); o.connect(f); f.connect(g); env(g, t, 0.8, d, v * 0.25, 1); saida(g, 0.6); } },
      runa(t, d, v) { for (let k = 0; k < d; k += 0.18) { const fq = [1319, 1568, 1976, 2349, 2637][Math.floor(Math.random() * 5)], o = osc('sine', fq, t + k, 0.9), g = ac.createGain(); env(g, t + k, 0.005, 0.9, v * 0.12, 0.8); o.connect(g); saida(g, 1); } },
      crepita(t, d, v) { F.fogo(t, d, v); }
    };
    if (F[nome]) F[nome](t, d, v);
  },
  // registra as partituras do capítulo no sintetizador de música do jogo
  prepararMusica(cap) { if (typeof Musica === 'undefined' || !cap.trilha) return; Object.assign(Musica.ABC, cap.trilha.ABC); Object.assign(Musica.ARR, cap.trilha.ARR); },
  // modo da música no instante t do capítulo
  modoEm(cap, t) { let a = 0; for (const [m, d] of cap.trilha.plano) { if (t < a + d) return m; a += d; } return null; },

  // =====================================================================
  //  PLAYER (tela cheia por cima do jogo)
  // =====================================================================
  tocar(cap) {
    Sfx.unlock();
    const el = document.createElement('div'); el.id = 'anime-player';
    el.innerHTML = `<canvas width="1280" height="720"></canvas>
      <div class="ap-load"><div class="ap-lt">${cap.titulo}</div><div class="ap-bar"><i></i></div><div class="ap-dim">Carregando o capítulo...</div></div>
      <div class="ap-ctl hidden"><button data-a="play">⏸</button><div class="ap-prog"><i></i></div><span class="ap-tm">0:00</span><button data-a="sair">✕ Sair</button></div>`;
    document.body.appendChild(el);
    const cv = el.querySelector('canvas'), ctx = cv.getContext('2d'), ctl = el.querySelector('.ap-ctl'), bar = el.querySelector('.ap-bar i');
    const P = this.player = { cap, el, ctx, t: 0, pausa: false, fim: false, base: 0, ultimo: 0, deixa: 0, modo: null, ctlAte: 0 };
    const ac = Sfx.ctx;
    // ganho próprio para o anime (música e efeitos fortes, independente das opções do jogo)
    if (ac) {
      P.out = ac.createGain(); P.out.gain.value = 1.0; P.out.connect(ac.destination);
      P.rv = ac.createConvolver(); const rb = ac.createBuffer(2, ac.sampleRate * 2, ac.sampleRate);
      for (let c = 0; c < 2; c++) { const d = rb.getChannelData(c); for (let i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 3); }
      P.rv.buffer = rb; const rg = ac.createGain(); rg.gain.value = 0.3; P.rv.connect(rg); rg.connect(P.out);
      P.musica0 = { mode: Sfx.mode, musicOn: Sfx.musicOn, vol: Sfx.musicGain ? Sfx.musicGain.gain.value : 0 };
      Sfx.musicOn = true; if (Sfx.musicGain) Sfx.musicGain.gain.value = 0.85;
      Sfx.setMusic(null);
    }
    this.prepararMusica(cap);
    const relogio = () => ac ? ac.currentTime : performance.now() / 1000;
    const mostrarCtl = () => { ctl.classList.remove('hidden'); P.ctlAte = performance.now() + 3000; };
    el.addEventListener('pointerdown', e => { if (e.target.closest('button')) return; mostrarCtl(); });
    el.querySelector('[data-a="play"]').onclick = () => { this.pausar(!P.pausa); el.querySelector('[data-a="play"]').textContent = P.pausa ? '▶' : '⏸'; mostrarCtl(); };
    el.querySelector('[data-a="sair"]').onclick = () => this.sair();
    el.querySelector('.ap-prog').onclick = e => { const r = e.currentTarget.getBoundingClientRect(); this.pular(this.cl((e.clientX - r.left) / r.width) * cap.dur); mostrarCtl(); };
    P.onKey = e => { if (e.key === 'Escape') this.sair(); else if (e.key === ' ') el.querySelector('[data-a="play"]').click(); };
    window.addEventListener('keydown', P.onKey);
    this.carregar(cap, k => { bar.style.width = Math.round(k * 100) + '%'; }).then(() => {
      if (this.player !== P) return;
      el.querySelector('.ap-load').remove(); mostrarCtl();
      P.base = relogio() + 0.15; P.relogio = relogio;
      const passo = () => {
        if (this.player !== P) return;
        if (!P.pausa && !P.fim) {
          P.t = Math.max(0, relogio() - P.base);
          this._somAte(P, P.t + 0.6);
          if (P.t >= cap.dur) { P.fim = true; this._fimCap(P); }
        }
        this.desenhar(ctx, cap, Math.min(P.t, cap.dur - 0.001));
        if (performance.now() > P.ctlAte && !P.pausa && !P.fim) ctl.classList.add('hidden');
        el.querySelector('.ap-prog i').style.width = (P.t / cap.dur * 100) + '%';
        const s = Math.floor(P.t); el.querySelector('.ap-tm').textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')} / ${Math.floor(cap.dur / 60)}:${String(Math.floor(cap.dur % 60)).padStart(2, '0')}`;
        P.raf = requestAnimationFrame(passo);
      };
      P.raf = requestAnimationFrame(passo);
    });
  },
  // agenda os efeitos e troca a música conforme o tempo do capítulo avança
  _somAte(P, ate) {
    const ac = Sfx.ctx; if (!ac) return;
    const cap = P.cap;
    while (P.deixa < cap.deixas.length && cap.deixas[P.deixa][1] < ate) {
      const [n, t, d, v] = cap.deixas[P.deixa++];
      if (t + d < P.t) continue;
      const quando = P.base + t, cortar = Math.max(0, P.t - t);
      if (cortar > 0.2 && n !== 'vento' && n !== 'fogo' && n !== 'drone') continue;
      try { this.sfx(ac, P.out, P.rv, n, Math.max(ac.currentTime, quando), d - cortar, v); } catch (e) { }
    }
    const m = this.modoEm(cap, P.t);
    if (m !== P.modo) { P.modo = m; Musica._modo = null; Sfx.setMusic(m); }
  },
  pausar(sim) {
    const P = this.player; if (!P || P.fim) return;
    P.pausa = sim; const ac = Sfx.ctx;
    if (sim) { P.tPausa = P.t; Sfx.setMusic(null); P.modo = null; if (ac) ac.suspend(); }
    else { if (ac) ac.resume().then(() => { P.base = ac.currentTime - P.tPausa; }); else P.base = performance.now() / 1000 - P.tPausa; }
  },
  pular(t) {
    const P = this.player; if (!P || !P.relogio) return;
    // os efeitos já agendados continuam; a partir daqui agenda de novo
    P.out.gain.cancelScheduledValues(0); P.out.disconnect(); const g = Sfx.ctx.createGain(); g.gain.value = 1.0; g.connect(Sfx.ctx.destination); P.rv.disconnect(); P.rv.connect(g); P.out = g;
    P.t = t; P.base = P.relogio() - t; P.deixa = 0; P.modo = null; P.fim = false;
    if (P.pausa) { P.tPausa = t; }
  },
  _fimCap(P) {
    try { localStorage.setItem('eldoria_anime_' + P.cap.id, '1'); } catch (e) { }
    Sfx.setMusic(null);
    const fim = document.createElement('div'); fim.className = 'ap-fim';
    fim.innerHTML = `<div class="ap-lt">Fim do ${P.cap.titulo}</div><button data-a="de-novo">↺ Assistir de novo</button><button data-a="menu">Capítulos</button>`;
    P.el.appendChild(fim);
    fim.querySelector('[data-a="de-novo"]').onclick = () => { fim.remove(); this.pular(0); P.fim = false; };
    fim.querySelector('[data-a="menu"]').onclick = () => { this.sair(); this.menu(); };
  },
  sair() {
    const P = this.player; if (!P) return;
    this.player = null; cancelAnimationFrame(P.raf); window.removeEventListener('keydown', P.onKey);
    const ac = Sfx.ctx;
    if (ac) { if (ac.state === 'suspended') ac.resume(); try { P.out.disconnect(); } catch (e) { } }
    if (P.musica0) { Sfx.musicOn = P.musica0.musicOn; if (Sfx.musicGain) Sfx.musicGain.gain.value = P.musica0.vol; Musica._modo = null; Sfx.setMusic(P.musica0.mode || 'title'); }
    P.el.remove();
  },

  // ---------- o menu de capítulos ----------
  menu() {
    const f = UI.reg(), visto = id => { try { return localStorage.getItem('eldoria_anime_' + id) === '1'; } catch (e) { return false; } };
    const m = s => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
    const cards = this.caps.map(c => `<div class="anime-card">
        <img src="anime/arte/${c.capa}.webp" alt="">
        <div class="ac-txt"><div class="ac-n">${c.titulo}${visto(c.id) ? ' <span class="ac-ok">✓ assistido</span>' : ''}</div><div class="ac-t">${c.subtitulo}</div><div class="ac-d">${c.sinopse}</div><div class="ac-m">${m(c.dur)} • legendado</div></div>
        <button class="mbtn gold" ${f(() => { UI.close && UI.close(); this.tocar(c); })}>▶ Assistir</button></div>`).join('');
    const el = UI.show('anime', `<div class="panel anime-menu"><div class="ptitle">Crônicas de Eldoria — O Anime</div>
      <div class="ctext dim">A história de Aren, um garoto de uma vila do norte, e da runa de gelo que desperta na sua mão. Assista aos capítulos aqui mesmo no jogo.</div>
      ${cards}
      <div class="anime-card breve"><div class="ac-txt"><div class="ac-n">Capítulo 2</div><div class="ac-t">A Geleira Eterna</div><div class="ac-d">Em breve...</div></div></div>
      <button class="mbtn" ${f(() => UI.showTitle())}>Voltar</button></div>`, { cls: 'transparent' });
    UI.bind(el, f);
  }
};
