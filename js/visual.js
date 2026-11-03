'use strict';
// ===================== VISUAL TOP: SOL, SOMBRAS LONGAS E LUZ DOURADA =====================
// Só no mundo aberto. O sol nasce a leste e se põe a oeste: casas, árvores, postes e pedras
// projetam sombras no chão que giram e esticam com a hora. No fim da tarde (e um pouco de
// manhã) tudo ganha um tom dourado, névoa rosada no alto da tela e raios de sol inclinados.
// Desliga sozinho no Modo leve; também dá para desligar nas Opções.
const Visual = {
  ligado() { return Game.settings.visual !== false && !Game.settings.lite; },
  // direção (kx, ky) e força da sombra pela hora do dia
  sol() {
    const h = Game.time / 60;
    if (h < 5.6 || h > 19.6) return null;
    const t = (h - 5.6) / 14, alt = Math.sin(t * Math.PI);
    const len = Math.min(1.25, 0.3 / Math.max(0.24, alt));
    const kx = -Math.cos(t * Math.PI) * len, ky = 0.06 + 0.42 * len;   // meio-dia: sombra curta logo abaixo
    let a = 0.46 * Math.min(1, (h - 5.6) / 0.8, (19.6 - h) / 0.8);
    const w = Game.weather.kind;
    if (w === 'rain' || w === 'storm' || w === 'snow') a *= 0.25; else if (w === 'sand' || w === 'ash') a *= 0.6;
    a *= 0.62 + 0.38 * Math.min(1, len);   // sombra curta do meio-dia é mais clara
    return a > 0.02 ? { kx, ky, a } : null;
  },
  // quanto de "hora dourada" há agora (0..1): forte no fim da tarde, suave no nascer
  dourado() {
    const h = Game.time / 60;
    if (h >= 15.5 && h < 18.4) return (h - 15.5) / 2.9;
    if (h >= 18.4 && h < 20.2) return 1 - (h - 18.4) / 1.8;
    if (h >= 5.2 && h < 6.6) return (h - 5.2) / 1.4 * 0.6;
    if (h >= 6.6 && h < 8.6) return 0.6 * (1 - (h - 6.6) / 2);
    return 0;
  },
  // silhueta escura de um desenho (guardada para não refazer)
  sil(img) {
    this._sil = this._sil || new WeakMap();
    let s = this._sil.get(img);
    if (!s) { s = Sprites.cv(img.width, img.height); const x = s.getContext('2d'); x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = '#000'; x.fillRect(0, 0, s.width, s.height); this._sil.set(img, s); }
    return s;
  },
  tela(k, vw, vh) {
    this._c = this._c || {};
    let c = this._c[k];
    if (!c || c.width !== vw || c.height !== vh) { c = this._c[k] = Sprites.cv(vw, vh); }
    return c;
  },
  // sombras projetadas de tudo que é alto (desenhadas no chão, antes dos objetos)
  sombras(ctx, D, camX, camY, vw, vh) {
    if (!this.ligado() || !Game.level.isWorld) return;
    const S = this.sol(); if (!S) return;
    const sc = this.tela('sombra', vw, vh), x = sc.getContext('2d');
    x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, vw, vh);
    let n = 0;
    for (const d of D) {
      const img = d.img;
      if (!img || img.height < 17 || d.semSombra) continue;
      const ix = d.x - camX, iy = d.yy - camY, base = d.y + 1 - camY;
      const alto = base - iy;
      if (ix > vw + alto * 1.5 || ix + img.width < -alto * 1.5 || iy > vh || base + alto < 0) continue;
      // cada pixel a uma altura h do chão vai para (x + h*kx, base + h*ky)
      x.setTransform(1, 0, -S.kx, -S.ky, ix + S.kx * (base - iy), base + S.ky * (base - iy));
      x.drawImage(this.sil(img), 0, 0); n++;
    }
    x.setTransform(1, 0, 0, 1, 0, 0);
    if (!n) return;
    // pinta tudo de uma vez (sombras que se cruzam não ficam mais escuras)
    x.globalCompositeOperation = 'source-in'; x.fillStyle = '#26122e'; x.fillRect(0, 0, vw, vh); x.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = S.a; ctx.drawImage(sc, 0, 0); ctx.globalAlpha = 1;
  },
  // raios de sol: faixas inclinadas e suaves (textura feita uma vez)
  raios(vh) {
    if (this._raios && this._raios.height === vh) return this._raios;
    const c = Sprites.cv(256, vh), x = c.getContext('2d'), r = new RNG(77);
    for (let i = 0; i < 7; i++) {
      const cx = r.int(0, 256), w = r.int(10, 34), a = 0.25 + r.next() * 0.5;
      const g = x.createLinearGradient(cx - w, 0, cx + w, 0);
      g.addColorStop(0, 'rgba(255,230,170,0)'); g.addColorStop(0.5, `rgba(255,230,170,${a})`); g.addColorStop(1, 'rgba(255,230,170,0)');
      for (const dx of [0, -256, 256]) { x.save(); x.translate(dx, 0); x.fillStyle = g; x.fillRect(cx - w, 0, w * 2, vh); x.restore(); }
    }
    return (this._raios = c);
  },
  vinheta(vw, vh) {
    if (this._vin && this._vin.width === vw && this._vin.height === vh) return this._vin;
    const c = Sprites.cv(vw, vh), x = c.getContext('2d'), R = Math.hypot(vw, vh) / 2;
    const g = x.createRadialGradient(vw / 2, vh / 2, R * 0.45, vw / 2, vh / 2, R);
    g.addColorStop(0, 'rgba(20,8,24,0)'); g.addColorStop(1, 'rgba(20,8,24,0.42)');
    x.fillStyle = g; x.fillRect(0, 0, vw, vh);
    return (this._vin = c);
  },
  // cor do ar: calor de dia, dourado no fim da tarde, névoa rosada no alto e raios de sol
  luz(ctx, vw, vh) {
    if (!this.ligado() || !(Game.level.isWorld || (Game.level.isShip && !Game.level.floor))) return;
    const g = this.dourado(), h = Game.time / 60, dia = h >= 5.5 && h < 20;
    const chuva = Game.weather.kind === 'rain' || Game.weather.kind === 'storm';
    if (dia) {
      // tudo mais quente e saturado; no fim da tarde, laranja forte por cima
      ctx.globalCompositeOperation = 'overlay';
      ctx.fillStyle = `rgba(255,${Math.round(190 - 60 * g)},${Math.round(100 - 60 * g)},${(chuva ? 0.08 : 0.24) + 0.3 * g})`;
      ctx.fillRect(0, 0, vw, vh);
      if (g > 0.03 && !chuva) { ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = `rgba(255,196,150,${0.38 * g})`; ctx.fillRect(0, 0, vw, vh); }
      ctx.globalCompositeOperation = 'source-over';
    }
    if (g > 0.03 && !chuva) {
      // névoa rosada de pôr do sol no alto da tela
      ctx.globalCompositeOperation = 'screen';
      const gr = ctx.createLinearGradient(0, 0, 0, vh * 0.5);
      gr.addColorStop(0, `rgba(255,120,110,${0.34 * g})`); gr.addColorStop(0.5, `rgba(255,170,90,${0.12 * g})`); gr.addColorStop(1, 'rgba(255,170,90,0)');
      ctx.fillStyle = gr; ctx.fillRect(0, 0, vw, vh * 0.5);
      // raios de sol inclinados, andando devagar
      const T = this.raios(vh), off = (Game.t * 3) % 256, inc = h > 12 ? 0.55 : -0.55;
      ctx.globalAlpha = 0.3 * g;
      ctx.setTransform(1, 0, inc, 1, 0, 0);   // faixas inclinadas como luz entrando de lado
      const x0 = -Math.max(0, inc) * vh - 256 + off, x1 = vw - Math.min(0, inc) * vh;
      for (let xx = x0; xx < x1; xx += 256) ctx.drawImage(T, xx, 0);
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = 'source-over';
    }
    ctx.drawImage(this.vinheta(vw, vh), 0, 0);
  }
};
