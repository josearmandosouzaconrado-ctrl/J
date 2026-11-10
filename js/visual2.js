'use strict';
// =====================================================================
//  VISUAL 2: O MUNDO MAIS VIVO E BONITO
//  • Água viva: brilhos que correm, ondas e espuma na beira.
//  • Sombras de nuvens passando devagar pelo chão nos dias de sol.
//  • Árvores balançando com o vento.
//  • Borboletas de dia e bandos de pássaros cruzando o céu.
//  • De noite: janelas acesas nas casas e halo quente nos lampiões.
//  Tudo leve (só o que está na tela) e desligado no Modo leve ou quando
//  "Visual top" está desligado nas Opções.
// =====================================================================
const Visual2 = {
  agua: new Map(), aguaT: 0, bichos: [], bandos: [], bT: 3, pT: 12,
  ARV: null,
  on() { return Visual.ligado() && Game.level && Game.level.isWorld; },
  // ---------- água ----------
  // por trecho de 32×32: 0 = terra, 1 = água, +2 terra em cima, +4 embaixo, +8 à esquerda, +16 à direita, +32 = mar fundo
  trecho(W, cx, cy) {
    const k = cx * 4096 + cy; let m = this.agua.get(k); if (m) return m;
    m = new Uint8Array(1024); let tem = false;
    for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
      const tx = cx * 32 + x, ty = cy * 32 + y, t = W.tileAt(tx, ty);
      if (t !== T.WATER && t !== T.DEEP) continue;
      let v = 1; tem = true; if (t === T.DEEP) v |= 32;
      const terra = (a, b) => { const q = W.tileAt(a, b); return !TWATER[q] && q !== T.BRIDGE; };
      if (terra(tx, ty - 1)) v |= 2; if (terra(tx, ty + 1)) v |= 4; if (terra(tx - 1, ty)) v |= 8; if (terra(tx + 1, ty)) v |= 16;
      m[y * 32 + x] = v;
    }
    if (!tem) m = Visual2.VAZIO;
    this.agua.set(k, m); if (this.agua.size > 60) this.agua.delete(this.agua.keys().next().value);
    return m;
  },
  VAZIO: new Uint8Array(0),
  desenharAgua(ctx, camX, camY, vw, vh) {
    const G = Game, W = G.world, t = G.t;
    const tx0 = Math.floor(camX / 16), ty0 = Math.floor(camY / 16), tx1 = Math.floor((camX + vw) / 16), ty1 = Math.floor((camY + vh) / 16);
    const gelo = typeof Estacoes !== 'undefined' && Estacoes.inverno && Estacoes.inverno();
    const noite = G.darkness() > 0.4;
    for (let cy = ty0 >> 5; cy <= ty1 >> 5; cy++) for (let cx = tx0 >> 5; cx <= tx1 >> 5; cx++) {
      if (cx < 0 || cy < 0) continue;
      const m = this.trecho(W, cx, cy); if (!m.length) continue;
      const xa = Math.max(tx0, cx * 32), xb = Math.min(tx1, cx * 32 + 31), ya = Math.max(ty0, cy * 32), yb = Math.min(ty1, cy * 32 + 31);
      for (let ty = ya; ty <= yb; ty++) for (let tx = xa; tx <= xb; tx++) {
        const v = m[(ty - cy * 32) * 32 + (tx - cx * 32)]; if (!v) continue;
        const x = tx * 16 - camX, y = ty * 16 - camY, h = hash2(tx, ty, 7);
        // brilhos que correm de lado (um ou dois risquinhos por quadrado)
        const f = (t * (v & 32 ? 0.22 : 0.3) + h * 5) % 1, al = Math.sin(f * Math.PI);
        if (h < 0.62) {
          ctx.fillStyle = noite ? `rgba(170,200,255,${0.16 * al})` : `rgba(235,250,255,${(v & 32 ? 0.2 : 0.34) * al})`;
          const lx = Math.round(x + 2 + h * 9 + f * 4), ly = Math.round(y + 3 + ((h * 97) % 1) * 10);
          ctx.fillRect(lx, ly, 4 + Math.round(h * 3), 1);
          if (h < 0.25) ctx.fillRect(lx + 2, ly + 5, 3, 1);
        }
        // a onda escura logo atrás do brilho dá volume
        if (h > 0.5 && !(v & 32)) { ctx.fillStyle = `rgba(20,50,110,${0.12 * (1 - al)})`; ctx.fillRect(Math.round(x + h * 8), Math.round(y + 9 + f * 3), 6, 1); }
        // espuma na beira: uma linha clara que vai e volta
        if (v & 30) {
          const s = Math.sin(t * 1.6 + h * 6.28), d = s > 0.3 ? 1 : 0, a2 = gelo ? 0.75 : 0.5 + 0.25 * s;
          ctx.fillStyle = `rgba(240,250,255,${a2})`;
          if (v & 2) { ctx.fillRect(x, y + d, 16, 1); ctx.fillStyle = 'rgba(240,250,255,0.22)'; ctx.fillRect(x + (h * 8 | 0), y + d + 2, 6, 1); ctx.fillStyle = `rgba(240,250,255,${a2})`; }
          if (v & 4) ctx.fillRect(x, y + 15 - d, 16, 1);
          if (v & 8) ctx.fillRect(x + d, y, 1, 16);
          if (v & 16) ctx.fillRect(x + 15 - d, y, 1, 16);
        }
      }
    }
  },
  // ---------- árvores ao vento ----------
  arvores(D, camX, camY) {
    if (!this.ARV) this.ARV = new Set(['OAK', 'PINE', 'SNOWPINE', 'PALM', 'WILLOW', 'AUTUMN', 'BIRCH', 'CHERRY', 'JUNGLETREE', 'BAMBOO'].filter(k => O[k] !== undefined).map(k => O[k]));
    const t = Game.t, w = Game.weather.kind, forca = w === 'storm' || w === 'nevasca' ? 2 : 1, vel = forca > 1 ? 3.2 : 1.5;
    for (const d of D) {
      if (d.o === undefined || !this.ARV.has(d.o) || !d.img || d.img.height < 26) continue;
      const img = d.img, s = Math.sin(t * vel + d.tx * 0.9 + d.ty * 0.6) + 0.35 * Math.sin(t * vel * 2.3 + d.tx);
      const dx = s > 0.55 ? forca : s < -0.75 ? -1 : 0; if (!dx) continue;
      const h = img.height, h1 = Math.round(h * 0.34), h2 = Math.round(h * 0.62);
      d.fn = (ctx, cx, cy) => {
        const x = d.x - cx, y = d.yy - cy;
        ctx.drawImage(img, 0, 0, img.width, h1, x + dx, y, img.width, h1);                                   // a copa vai mais longe
        ctx.drawImage(img, 0, h1, img.width, h2 - h1, x + (dx > 1 ? 1 : dx), y + h1, img.width, h2 - h1);
        ctx.drawImage(img, 0, h2, img.width, h - h2, x, y + h2, img.width, h - h2);                          // o tronco fica
      };
    }
  },
  // ---------- nuvens passando ----------
  texNuvem() {
    if (this._nuv) return this._nuv;
    const S = 384, c = Sprites.cv(S, S), x = c.getContext('2d'), r = new RNG(4242);
    for (let i = 0; i < 9; i++) {
      const cx = r.int(0, S), cy = r.int(0, S), n = r.int(4, 7);
      for (let k = 0; k < n; k++) {
        const bx = cx + r.int(-46, 46), by = cy + r.int(-20, 20), rx = r.int(26, 58), ry = Math.round(rx * (0.5 + r.next() * 0.2));
        for (const ox of [-S, 0, S]) for (const oy of [-S, 0, S]) { x.fillStyle = '#000'; x.beginPath(); x.ellipse(bx + ox, by + oy, rx, ry, 0, 0, 6.29); x.fill(); }
      }
    }
    return (this._nuv = c);
  },
  nuvens(ctx, camX, camY, vw, vh) {
    const G = Game, h = G.time / 60, w = G.weather.kind;
    if (h < 6.8 || h > 18.2 || w) return;
    const T_ = this.texNuvem(), S = T_.width, a = 0.13 * Math.min(1, (h - 6.8) / 1.2, (18.2 - h) / 1.2);
    const ox = ((camX * 1 - G.t * 7) % S + S) % S, oy = ((camY * 1 - G.t * 2.5) % S + S) % S;
    ctx.globalAlpha = a;
    for (let y = -oy; y < vh; y += S) for (let x = -ox; x < vw; x += S) ctx.drawImage(T_, Math.round(x), Math.round(y));
    ctx.globalAlpha = 1;
  },
  // ---------- borboletas e pássaros ----------
  vida(ctx, camX, camY, vw, vh, dt) {
    const G = Game, h = G.time / 60, w = G.weather.kind, P = G.player, W = G.world;
    const dia = h > 7 && h < 18 && !w && !(typeof Estacoes !== 'undefined' && Estacoes.inverno && Estacoes.inverno());
    this.bT -= dt;
    if (dia && this.bT <= 0 && this.bichos.length < 7) {
      this.bT = 1.2 + Math.random() * 2;
      const x = camX + Math.random() * vw, y = camY + Math.random() * vh, t = W.tileAt(Math.floor(x / 16), Math.floor(y / 16));
      if ((t === T.GRASS || t === T.DGRASS || t === T.ELFGRASS || t === T.WINDGRASS) && !W.settlementAt(Math.floor(x / 16), Math.floor(y / 16)))
        this.bichos.push({ x, y, a: Math.random() * 6.28, vida: 9 + Math.random() * 9, c: ['#fff0a0', '#ffffff', '#ffb0d0', '#a0d8ff', '#ffc060'][Math.floor(Math.random() * 5)], f: Math.random() * 9 });
    }
    for (let i = this.bichos.length - 1; i >= 0; i--) {
      const b = this.bichos[i]; b.vida -= dt; b.f += dt * 14; b.a += (Math.random() - 0.5) * 3.2 * dt * 3;
      b.x += Math.cos(b.a) * 13 * dt; b.y += Math.sin(b.a) * 9 * dt + Math.sin(b.f * 0.5) * 0.25;
      const x = Math.round(b.x - camX), y = Math.round(b.y - camY);
      if (b.vida <= 0 || x < -30 || y < -30 || x > vw + 30 || y > vh + 30 || !dia) { this.bichos.splice(i, 1); continue; }
      const aberto = Math.sin(b.f) > 0, al = Math.min(1, b.vida, 1);
      ctx.globalAlpha = al; ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(x, y + 7, 2, 1);
      ctx.fillStyle = b.c; if (aberto) { ctx.fillRect(x - 1, y - 1, 1, 2); ctx.fillRect(x + 1, y - 1, 1, 2); } else { ctx.fillRect(x - 1, y, 1, 1); ctx.fillRect(x + 1, y, 1, 1); }
      ctx.fillStyle = '#2a2018'; ctx.fillRect(x, y, 1, 1); ctx.globalAlpha = 1;
    }
    // bandos de pássaros bem no alto, com a sombra correndo no chão
    this.pT -= dt;
    if (this.pT <= 0 && h > 5.5 && h < 19.5 && w !== 'storm' && w !== 'nevasca') {
      this.pT = 22 + Math.random() * 30;
      const dir = Math.random() < 0.5 ? 1 : -1, n = 3 + Math.floor(Math.random() * 5);
      this.bandos.push({ x: dir > 0 ? camX - 40 : camX + vw + 40, y: camY + vh * (0.15 + Math.random() * 0.6), vx: dir * (46 + Math.random() * 20), vy: (Math.random() - 0.5) * 10, n, f: 0 });
    }
    for (let i = this.bandos.length - 1; i >= 0; i--) {
      const b = this.bandos[i]; b.x += b.vx * dt; b.y += b.vy * dt; b.f += dt * 7;
      const x0 = b.x - camX, y0 = b.y - camY;
      if (x0 < -160 || x0 > vw + 160) { this.bandos.splice(i, 1); continue; }
      const dir = b.vx > 0 ? 1 : -1;
      for (let k = 0; k < b.n; k++) {
        const fila = Math.ceil(k / 2), lado = k % 2 ? 1 : -1, x = Math.round(x0 - dir * fila * 9), y = Math.round(y0 + lado * fila * 6), bate = Math.sin(b.f + k * 0.9) > 0;
        ctx.fillStyle = 'rgba(20,10,30,0.16)'; ctx.fillRect(x - 2, y + 46, 5, 1);                             // a sombra no chão
        ctx.fillStyle = '#2a2430'; ctx.fillRect(x, y, 2, 1);
        if (bate) { ctx.fillRect(x - 2, y - 1, 2, 1); ctx.fillRect(x + 2, y - 1, 2, 1); } else { ctx.fillRect(x - 2, y + 1, 2, 1); ctx.fillRect(x + 2, y + 1, 2, 1); }
      }
    }
  },
  // ---------- a noite: janelas acesas e halo dos lampiões ----------
  janelas(img) {
    this._jan = this._jan || new WeakMap();
    if (this._jan.has(img)) return this._jan.get(img);
    let out = null;
    try {
      const w = img.width, h = img.height, src = img.getContext('2d').getImageData(0, 0, w, h).data;
      const c = Sprites.cv(w, h), x = c.getContext('2d'), o = x.createImageData(w, h), d = o.data; let n = 0;
      for (let i = 0; i < src.length; i += 4) {
        if (src[i + 3] < 200) continue; const r = src[i], g = src[i + 1], b = src[i + 2];
        const claro = Math.abs(r - 122) < 7 && Math.abs(g - 160) < 7 && Math.abs(b - 188) < 7, escuro = Math.abs(r - 74) < 7 && Math.abs(g - 106) < 7 && Math.abs(b - 136) < 7;
        if (!claro && !escuro) continue;
        d[i] = 255; d[i + 1] = claro ? 226 : 196; d[i + 2] = claro ? 140 : 96; d[i + 3] = 255; n++;
      }
      if (n > 3) { x.putImageData(o, 0, 0); out = c; }
    } catch (e) { out = null; }
    this._jan.set(img, out); return out;
  },
  halo() {
    if (this._halo) return this._halo;
    const c = Sprites.cv(64, 64), x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 1, 32, 32, 32);
    g.addColorStop(0, 'rgba(255,214,140,0.55)'); g.addColorStop(0.35, 'rgba(255,180,90,0.2)'); g.addColorStop(1, 'rgba(255,160,60,0)');
    x.fillStyle = g; x.fillRect(0, 0, 64, 64); return (this._halo = c);
  },
  noite(ctx, camX, camY) {
    const G = Game, dark = G.darkness(); if (dark < 0.2) return;
    const k = Math.min(1, (dark - 0.2) / 0.4), vw = G.vw, vh = G.vh, W = G.world, h = G.time / 60, tarde = h > 23.5 || h < 5;
    // janelas: a maioria acesa no começo da noite, poucas de madrugada
    for (const b of W.buildingsInView(camX, camY, camX + vw, camY + vh)) {
      if (b.site || b.decorative) continue;
      const q = hash2(b.tx, b.ty, 31); if (q > (tarde ? 0.25 : 0.82)) continue;
      const img = Sprites.building(Estacoes.predio(b)), jan = this.janelas(img); if (!jan) continue;
      const x = b.tx * 16 - 1 - camX, y = (b.ty + b.h) * 16 - (img.height - 1) - camY;
      ctx.globalAlpha = k * (0.86 + 0.08 * Math.sin(G.t * 2 + q * 40)); ctx.drawImage(jan, Math.round(x), Math.round(y));
    }
    ctx.globalAlpha = 1;
    // halo quente em volta de cada lampião, tocha e fogueira
    const H = this.halo(), tx0 = Math.floor(camX / 16) - 2, ty0 = Math.floor(camY / 16) - 2, tx1 = Math.floor((camX + vw) / 16) + 2, ty1 = Math.floor((camY + vh) / 16) + 2;
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = 0.5 * k;
    for (let cy = Math.max(0, ty0 >> 5); cy <= Math.min(WORLD_H / 32 - 1, ty1 >> 5); cy++) for (let cx = Math.max(0, tx0 >> 5); cx <= Math.min(WORLD_W / 32 - 1, tx1 >> 5); cx++) {
      for (const [tx, ty, o] of W.lightList(cx, cy).objs) { if (tx < tx0 || tx > tx1 || ty < ty0 || ty > ty1) continue; const r = 22 + 3 * Math.sin(G.t * 7 + tx); ctx.drawImage(H, Math.round(tx * 16 + 8 - camX - r), Math.round(ty * 16 - 2 - camY - r), r * 2, r * 2); }
    }
    ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
  }
};

// ---------------- ganchos ----------------
(function () {
  // logo depois do chão e antes dos objetos: a água; e as árvores passam a balançar
  const s0 = Visual.sombras;
  Visual.sombras = function (ctx, D, camX, camY, vw, vh) {
    const on = Visual2.on();
    if (on) { try { Visual2.desenharAgua(ctx, camX, camY, vw, vh); } catch (e) { } }
    const r = s0.apply(this, arguments);
    if (on) { try { Visual2.arvores(D, camX, camY); } catch (e) { } }
    return r;
  };
  // por cima do mundo: bichos e sombras de nuvens, antes da cor do ar
  const l0 = Visual.luz;
  Visual.luz = function (ctx, vw, vh) {
    if (Visual2.on()) {
      const G = Game, camX = Math.round(G.camX), camY = Math.round(G.camY), agora = G.t, dt = Math.min(0.1, Math.max(0, agora - (Visual2._t || agora))); Visual2._t = agora;
      try { Visual2.vida(ctx, camX, camY, vw, vh, G.paused ? 0 : dt); Visual2.nuvens(ctx, camX, camY, vw, vh); } catch (e) { }
    }
    return l0.apply(this, arguments);
  };
  // depois da escuridão: janelas e halos
  const d0 = Game.drawLighting;
  Game.drawLighting = function (ctx, camX, camY) {
    const r = d0.apply(this, arguments);
    if (Visual2.on()) { try { Visual2.noite(ctx, camX, camY); } catch (e) { } }
    return r;
  };
})();
