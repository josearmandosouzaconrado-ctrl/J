'use strict';
// ===================== TELA INICIAL EM 3D =====================
// O fundo (castelo na ilha, montanhas nevadas e o lago) foi modelado e renderizado no Blender 4.2
// (tools/blender/titulo.py) e reduzido para pixel art (600x240, img/titulo3d.png).
// Por cima, o jogo anima estrelas, a lua, o brilho da água, as janelas e o dragão.
const Titulo3D = {
  W: 600, H: 240, img: null, ok: false,
  // pontos de luz das janelas do castelo e do reflexo na imagem (para piscar como velas)
  luzes: [[214, 58], [226, 78], [200, 82], [218, 82], [209, 85], [162, 88], [238, 88], [229, 88], [177, 90], [208, 91], [206, 94], [224, 96], [182, 98], [227, 99], [238, 99], [222, 100], [158, 110], [238, 110]],
  ESPELHO: 159,   // linha da água: o reflexo de y aparece em 2*ESPELHO - y
  carregar() {
    if (this.img) return;
    const im = new Image();
    im.onload = () => { this.ok = true; };
    im.src = imgSrc('img/titulo3d.png');
    this.img = im;
  },
  desenhar(G) {
    const ctx = G.ctx, vw = G.vw, vh = G.vh, t = G.t, W = this.W, H = this.H;
    // cobre a tela inteira mantendo os pixels nítidos; corta as sobras pelos lados
    const s = Math.max(vw / W, vh / H), dw = Math.ceil(W * s), dh = Math.ceil(H * s);
    const ox = Math.round((vw - dw) / 2 + Math.sin(t * 0.07) * Math.min(6, (dw - vw) / 2)), oy = Math.round((vh - dh) / 2);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(this.img, ox, oy, dw, dh);
    const X = x => ox + x * s, Y = y => oy + y * s;
    // estrelas só no alto do céu
    for (let i = 0; i < 70; i++) {
      const x = hash2(i, 0, 7) * W, y = hash2(i, 1, 7) * 34, a = 0.25 + 0.55 * (0.5 + 0.5 * Math.sin(t * (1.5 + hash2(i, 2, 7) * 2) + i));
      ctx.fillStyle = `rgba(255,248,230,${a.toFixed(2)})`; ctx.fillRect(Math.round(X(x)), Math.round(Y(y)), 1, 1);
    }
    // estrela cadente de vez em quando
    const ec = (t % 9) / 9; if (ec < 0.08) { const k = ec / 0.08, x0 = X(380 + k * 120), y0 = Y(6 + k * 22); ctx.strokeStyle = `rgba(255,255,255,${(1 - k).toFixed(2)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 - 10 * s, y0 - 2 * s); ctx.stroke(); }
    // lua crescente com halo
    const lx = Math.round(X(470)), ly = Math.round(Y(26));
    const hg = ctx.createRadialGradient(lx, ly, 2, lx, ly, 30); hg.addColorStop(0, 'rgba(255,230,190,0.25)'); hg.addColorStop(1, 'rgba(255,230,190,0)');
    ctx.fillStyle = hg; ctx.fillRect(lx - 30, ly - 30, 60, 60);
    ctx.fillStyle = '#f4e6c4'; ctx.beginPath(); ctx.arc(lx, ly, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#3a2350'; ctx.beginPath(); ctx.arc(lx + 4, ly - 2, 8, 0, Math.PI * 2); ctx.fill();
    // janelas piscando como velas (no castelo e no reflexo do lago, espelhado)
    for (let i = 0; i < this.luzes.length; i++) {
      const [x, y] = this.luzes[i], f = 0.5 + 0.5 * Math.sin(t * (5 + i) + i * 1.7) * Math.sin(t * 2.3 + i);
      ctx.fillStyle = `rgba(255,190,90,${(0.18 * f).toFixed(3)})`;
      ctx.fillRect(Math.round(X(x) - 2), Math.round(Y(y) - 2), 4, 4);
      if (2 * this.ESPELHO - y < H) ctx.fillRect(Math.round(X(x) - 2), Math.round(Y(2 * this.ESPELHO - y) - 2), 4, 5);
    }
    // brilho da água: riscos de luz que andam devagar sobre o lago
    for (let i = 0; i < 26; i++) {
      const y = 146 + hash2(i, 3, 9) * 90, w = 4 + hash2(i, 4, 9) * 14, sp = 3 + hash2(i, 5, 9) * 5;
      const x = ((hash2(i, 6, 9) * W + t * sp) % (W + 40)) - 20, a = 0.08 + 0.12 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * 2));
      ctx.fillStyle = `rgba(230,200,255,${a.toFixed(3)})`; ctx.fillRect(Math.round(X(x)), Math.round(Y(y)), Math.round(w * s), 1);
    }
    // o dragão sobrevoa as montanhas
    const per = vw + 240, dx = ((t * 26) % per) - 120, dy = Y(46) + Math.sin(t * 0.9) * 6;
    const D = Sprites.actor({ k: 'dragon', c: '#2a1a2a' }), fr = D.right[Math.floor(t * 4) % 2 + 1];
    ctx.globalAlpha = 0.92; ctx.drawImage(fr, Math.round(dx), Math.round(dy));
    ctx.globalAlpha = 1;
    // vinheta suave para o menu se destacar
    const vg = ctx.createRadialGradient(vw / 2, vh * 0.45, vh * 0.3, vw / 2, vh * 0.45, vw * 0.75);
    vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(8,2,16,0.45)');
    ctx.fillStyle = vg; ctx.fillRect(0, 0, vw, vh);
  }
};
(function () {
  Titulo3D.carregar();
  const rt0 = Game.renderTitle;
  Game.renderTitle = function (dt) {
    if (!Titulo3D.ok) return rt0.apply(this, arguments);   // enquanto a imagem carrega, a tela antiga
    try { Titulo3D.desenhar(this); } catch (e) { console.warn('titulo3d', e); rt0.apply(this, arguments); }
  };
})();
