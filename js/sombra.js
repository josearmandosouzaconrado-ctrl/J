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
    im.src = 'img/criatura_sombras.png';
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
  // olhos vermelhos brilhando no escuro (desenhado depois da iluminação)
  drawEyes(ctx, camX, camY, dark) {
    if (dark < 0.15) return;
    for (const a of Game.actors) {
      if (a.dead || !a.def || !a.def.glowEyes || a.dir === 'up') continue;
      const s = a.dir === 'left' ? -1 : a.dir === 'right' ? 1 : 0;
      const ex = a.x + s * (a.moving && a.target ? 26 : 22) - camX, ey = a.y - (s ? 34 : 44) - camY;
      if (ex < -40 || ey < -40 || ex > Game.vw + 40 || ey > Game.vh + 40) continue;
      const fl = 0.75 + Math.sin(Game.t * 5 + a.id) * 0.15;
      ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = Math.min(1, dark * 1.4) * fl;
      ctx.drawImage(Game.lightBlob(2), ex - 14, ey - 14, 28, 28);
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    }
  },
  // rugido ao avistar a presa, fumaça escura e brasas vermelhas
  update(m, dt) {
    if (m.target && !m.roared) {
      m.roared = true;
      if (m.target === Game.player) { Sfx.play('dragon'); Game.shake = Math.max(Game.shake, 3); Game.floater(m.x, m.y - 62, 'GRRRAAAH!', '#ff3030'); }
    } else if (!m.target) m.roared = false;
    if (Math.random() < dt * 6) Game.particle(m.x + (Math.random() - 0.5) * 30, m.y - 10 - Math.random() * 40, (Math.random() - 0.5) * 6, -8 - Math.random() * 8, Math.random() < 0.7 ? 'rgba(20,10,14,0.6)' : '#e01830', 1.2, Math.random() < 0.4 ? 2 : 1, -4);
    // mais rápida e feroz à noite
    m.spd = m.def.spd * (Game.isNight() ? 1.2 : 1);
  }
};
