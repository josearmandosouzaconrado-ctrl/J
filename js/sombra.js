'use strict';
// ===================== CRIATURA DAS SOMBRAS =====================
// Sprites recortados da folha de arte original (tools/extrair_sombra.py) e montados
// no formato dos atores do jogo: frente/costas/lado + parada, andando, correndo,
// pose de ataque e pose de morte. Só existe no continente de Valtheria.
const Sombra = {
  img: null, ready: false, sheetS: null, placeholder: null,
  load() {
    const im = new Image();
    im.onload = () => { this.img = im; this.build(); };
    im.src = imgSrc('img/criatura_sombras.png');   // embutida: no APK uma imagem de arquivo bloquearia a leitura dos pixels
  },
  // recorta um quadro deixando os pés no centro da imagem (o jogo desenha pelo centro dos pés)
  frame(k, flip, bob) {
    const f = SOMBRA_FRAMES[k], half = Math.max(f.ax, f.w - f.ax), W = half * 2;
    const c = Sprites.cv(W, f.h + (bob ? 1 : 0)), x = c.getContext('2d');
    if (flip) { x.translate(W, 0); x.scale(-1, 1); }
    x.drawImage(this.img, f.x, f.y, f.w, f.h, half - f.ax, 0, f.w, f.h);
    return c;
  },
  build() {
    const F = (k, fl, b) => this.frame(k, fl, b);
    const front = F('frente'), back = F('costas');
    const S = {
      type: 'hum', white: {},
      // de frente e de costas: passo alternado (espelhado) com um leve balanço
      down: [front, F('frente', false, true), F('frente', true), F('frente', true, true)],
      up: [back, F('costas', false, true), F('costas', true), F('costas', true, true)],
      // de lado: parada, andando, correndo e a vista "lado" (andar sem pressa)
      right: [F('idle'), F('andar'), F('correr'), F('lado')],
      left: [F('idle', true), F('andar', true), F('correr', true), F('lado', true)],
      w: front.width, h: 60, sombra: true
    };
    S.atk = { type: 'hum', white: {}, right: [F('ataque')], left: [F('ataque', true)], down: [front], up: [back] };
    S.dead = { type: 'hum', white: {}, right: [F('morte')], left: [F('morte', true)], down: [F('morte')], up: [F('morte', true)] };
    this.sheetS = S; this.ready = true;
  },
  // usado por Sprites.actor({ k: 'sombra' })
  sheet() {
    if (this.ready) return this.sheetS;
    if (!this.placeholder) {
      const c = Sprites.cv(40, 58), x = c.getContext('2d');
      x.fillStyle = '#1a1216'; x.beginPath(); x.ellipse(20, 34, 16, 22, 0, 0, Math.PI * 2); x.fill();
      x.fillStyle = '#ff2020'; x.fillRect(14, 18, 3, 2); x.fillRect(23, 18, 3, 2);
      const a = [c, c, c, c];
      this.placeholder = { type: 'hum', white: {}, down: a, up: a, right: a, left: a, w: 40, h: 58, placeholder: true };
    }
    return this.placeholder;
  },
  // ---------- O encontro: aparição invisível, névoa e fúria ----------
  // enc = { phase: 'fog' | 'fury', t, fogA, growlT, list }
  enc: null,
  night() { return Game.isNight(); },
  // chamado no primeiro quadro de cada criatura
  arrive(m) {
    m.inited = true; m.baseDmg = m.dmg;
    if (!this.night()) { this.dissolve(m, true); return; }
    if (!Game.level.isWorld) return;
    const P = Game.player;
    if (!this.enc) {
      this.enc = { phase: 'fog', t: 26 + Math.random() * 10, fogA: 0, growlT: 4, list: [] };
      // o jogador não a vê chegar: só escuta o som tenebroso, e a névoa sobe
      Sfx.sombra('aparece');
      Game.toast('Um som tenebroso ecoa na escuridão... uma névoa sobe ao seu redor.', '#ff6060');
      Game.shake = Math.max(Game.shake, 2);
    }
    if (this.enc.phase === 'fog') {
      // nasce escondida dentro da névoa, a alguma distância
      const a = Math.random() * Math.PI * 2; m.x = P.x + Math.cos(a) * 150; m.y = P.y + Math.sin(a) * 150; Game.findFree(m);
      m.fogHidden = true; m.dmg = m.baseDmg * 0.3;
    } else this.enrage(m, false);
    this.enc.list.push(m);
  },
  enrage(m, loud) {
    m.fogHidden = false; m.enraged = true; m.dmg = m.baseDmg * 2.2; m.retreatT = 0;
    if (loud) Game.floater(m.x, m.y - 66, 'GRRRAAAAAH!!', '#ff2020');
  },
  dissolve(m, quiet) {
    m.dead = true; m.deadT = 10; m.fogHidden = false;
    for (let i = 0; i < 26; i++) Game.particle(m.x + (Math.random() - 0.5) * 40, m.y - Math.random() * 50, (Math.random() - 0.5) * 30, -20 - Math.random() * 30, Math.random() < 0.8 ? 'rgba(20,10,14,0.7)' : '#e01830', 1.6, 2, -6);
    if (!quiet) Sfx.sombra('some');
  },
  // golpe dado: na névoa ela ataca e some de novo (bate e corre)
  strike(m) {
    if (m.fogHidden) { m.retreatT = 1.4 + Math.random() * 1.2; Sfx.sombra('golpe', this.pan(m)); }
  },
  pan(m) { return clamp((m.x - Game.player.x) / 160, -1, 1); },
  // controla o movimento enquanto recua para dentro da névoa
  control(m, dt, sf) {
    if (!(m.retreatT > 0)) return false;
    m.retreatT -= dt;
    const t = m.target || Game.player, a = angleTo(t.x, t.y, m.x, m.y) + Math.sin(Game.t + m.id) * 0.8;
    m.moveToward(m.x + Math.cos(a) * 40, m.y + Math.sin(a) * 40, m.spd * 1.2 * sf, dt);
    return true;
  },
  update(m, dt) {
    if (!m.inited) { this.arrive(m); if (m.dead) return; }
    m.spd = m.def.spd * (m.enraged ? 1.3 : 1);
    // o amanhecer a desfaz em sombras
    if (!this.night()) { Game.toast('Com o amanhecer, a criatura se desfaz nas sombras...', '#c0a0a0'); this.dissolve(m); return; }
    if (Math.random() < dt * (m.enraged ? 14 : 6) && !m.fogHidden) Game.particle(m.x + (Math.random() - 0.5) * 30, m.y - 10 - Math.random() * 40, (Math.random() - 0.5) * 6, -8 - Math.random() * 8, Math.random() < (m.enraged ? 0.4 : 0.7) ? 'rgba(20,10,14,0.6)' : '#e01830', 1.2, Math.random() < 0.4 ? 2 : 1, -4);
  },
  // estado do encontro (chamado uma vez por quadro pelo jogo)
  tick(dt) {
    const e = this.enc; if (!e) return;
    e.list = e.list.filter(m => !m.dead && Game.actors.includes(m));
    const target = e.phase === 'fog' && e.list.length ? 1 : 0;
    e.fogA += (target - e.fogA) * Math.min(1, dt * (target ? 0.8 : 0.6));
    if (!e.list.length) { if (e.fogA < 0.02) this.enc = null; return; }
    if (e.phase === 'fog') {
      e.t -= dt;
      // rosnados vindos de algum lado da névoa
      e.growlT -= dt;
      if (e.growlT <= 0) { e.growlT = 3 + Math.random() * 4; const m = e.list[Math.floor(Math.random() * e.list.length)]; Sfx.sombra('rosnado', this.pan(m)); }
      if (e.t <= 0) {
        // a névoa some: rugido alto e os ataques ficam muito fortes
        e.phase = 'fury';
        Sfx.sombra('furia'); Game.shake = Math.max(Game.shake, 8);
        Game.centerMsg('A NÉVOA SE DISSIPOU', 'A criatura das sombras está furiosa!');
        for (const m of e.list) this.enrage(m, true);
      }
    }
  },
  // névoa densa em volta do jogador (meia resolução, com fiapos que se movem)
  drawFog(ctx) {
    const e = this.enc; if (!e || e.fogA < 0.01 || !Game.level.isWorld) return;
    const vw = Game.vw, vh = Game.vh, D = 3, w = Math.ceil(vw / D), h = Math.ceil(vh / D);
    if (!this.fogC || this.fogC.width !== w || this.fogC.height !== h) { this.fogC = Sprites.cv(w, h); }
    const x = this.fogC.getContext('2d'), P = Game.player, tex = this.fogTex();
    x.globalCompositeOperation = 'source-over'; x.clearRect(0, 0, w, h);
    x.globalAlpha = 0.9 * e.fogA; x.fillStyle = '#23262e'; x.fillRect(0, 0, w, h);
    const t = Game.t, cx = (Game.camX / D) | 0, cy = (Game.camY / D) | 0;
    for (const [sp, al, sc] of [[6, 0.5, 1], [-9, 0.35, 1.6]]) {
      x.globalAlpha = al * e.fogA; const tw = tex.width * sc, th = tex.height * sc;
      const ox = -(((cx + t * sp) % tw) + tw) % tw, oy = -(((cy + t * sp * 0.4) % th) + th) % th;
      for (let yy = oy; yy < h; yy += th) for (let xx = ox; xx < w; xx += tw) x.drawImage(tex, xx, yy, tw, th);
    }
    // só um pouquinho em volta do jogador fica visível
    x.globalCompositeOperation = 'destination-out'; x.globalAlpha = 0.85;
    const px = (P.x - Game.camX) / D, py = (P.y - 8 - Game.camY) / D, r = 46 / D;
    x.drawImage(Game.lightBlob(0), px - r, py - r, r * 2, r * 2);
    x.globalCompositeOperation = 'source-over'; x.globalAlpha = 1;
    ctx.imageSmoothingEnabled = true; ctx.drawImage(this.fogC, 0, 0, w, h, 0, 0, w * D, h * D); ctx.imageSmoothingEnabled = false;
  },
  fogTex() {
    if (this._fogTex) return this._fogTex;
    const N = 64, c = Sprites.cv(N, N), x = c.getContext('2d'), r = new RNG(77);
    for (let i = 0; i < 26; i++) {
      const px = r.range(0, N), py = r.range(0, N), rad = r.range(8, 22), a = r.range(0.25, 0.6);
      for (const [dx, dy] of [[0, 0], [N, 0], [-N, 0], [0, N], [0, -N]]) {
        const g = x.createRadialGradient(px + dx, py + dy, 0, px + dx, py + dy, rad);
        g.addColorStop(0, `rgba(150,155,170,${a})`); g.addColorStop(1, 'rgba(150,155,170,0)');
        x.fillStyle = g; x.fillRect(px + dx - rad, py + dy - rad, rad * 2, rad * 2);
      }
    }
    return (this._fogTex = c);
  },
  // olhos vermelhos brilhando no escuro (desenhado depois da iluminação; na névoa ela não aparece)
  drawEyes(ctx, camX, camY, dark) {
    if (dark < 0.15) return;
    for (const a of Game.actors) {
      if (a.dead || !a.def || !a.def.glowEyes || a.dir === 'up' || a.fogHidden) continue;
      const s = a.dir === 'left' ? -1 : a.dir === 'right' ? 1 : 0;
      const ex = a.x + s * (a.moving && a.target ? 26 : 22) - camX, ey = a.y - (s ? 34 : 44) - camY;
      if (ex < -40 || ey < -40 || ex > Game.vw + 40 || ey > Game.vh + 40) continue;
      const fl = (a.enraged ? 1 : 0.75) + Math.sin(Game.t * 5 + a.id) * 0.15;
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, dark * 1.4) * fl;
      ctx.drawImage(Game.lightBlob(2), ex - 14, ey - 14, 28, 28);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
  }
};
