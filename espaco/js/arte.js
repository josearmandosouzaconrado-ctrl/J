'use strict';
// ===================== CRÔNICAS ESTELARES: arte em pixel procedural =====================
const RACAS = {
  humano: { nome: 'Terrano', plural: 'Terranos', pele: ['#f1c8a0', '#d8a070', '#a86a42', '#6a4228'], cabelo: ['#2a1a10', '#6a3a1a', '#d8b060', '#1a1a1a', '#a83a20'], cabeca: 'humana', olho: '#1a1a2a', bonus: { creditos: 400 }, bonusTxt: '+400 créditos iniciais', desc: 'Exploradores teimosos de uma Terra que já não existe.' },
  zorkiano: { nome: 'Zorkiano', plural: 'Zorkianos', pele: ['#8ad06a', '#6ab84a', '#a8e080', '#7ac0a0'], cabeca: 'oval', olho: '#0a0a0a', antena: true, bonus: { escudo: 30 }, bonusTxt: '+30 de escudo', desc: 'Cabeças enormes, olhos negros e mentes brilhantes.' },
  krell: { nome: 'Krell', plural: 'Krell', pele: ['#8a6a3a', '#6a4a2a', '#a07a40', '#5a5a2a'], cabeca: 'inseto', olho: '#e83030', bonus: { vida: 35 }, bonusTxt: '+35 de vida', desc: 'Guerreiros insetoides de carapaça dura.' },
  vaari: { nome: 'Vaari', plural: 'Vaari', pele: ['#4a8ad0', '#3a70c0', '#60a8e8', '#5a6ad8'], cabeca: 'alongada', olho: '#ffffff', bonus: { vel: 0.14 }, bonusTxt: '+14% de velocidade', desc: 'Altos, azuis e silenciosos. Seus olhos brilham no escuro.' },
  moruk: { nome: 'Moruk', plural: 'Moruk', pele: ['#8a7a6a', '#7a6a5a', '#9a8478', '#6a6a72'], cabeca: 'pedra', olho: '#ffa030', largo: true, bonus: { armadura: 0.18 }, bonusTxt: '18% menos dano', desc: 'Gente de pedra viva com lava nas veias.' },
  lumari: { nome: 'Lumari', plural: 'Lumari', pele: ['#e080c0', '#80d0e0', '#c090f0', '#f0a0a0'], cabeca: 'medusa', olho: '#ffffff', bonus: { regen: 2 }, bonusTxt: 'o escudo volta 2x mais rápido', desc: 'Seres de luz e gelatina, vindos dos mares de Aquara.' }
};

const Arte = {
  _c: new Map(),
  memo(k, fn) { let v = this._c.get(k); if (!v) { v = fn(); this._c.set(k, v); } return v; },

  // ---------- pessoas (alienígenas humanoides) 16x26, 3 direções x 3 quadros ----------
  pessoa(L) {
    return this.memo('p' + JSON.stringify(L), () => {
      const mk = (d, f) => this.pessoaQ(L, d, f);
      const s = { down: [0, 1, 2].map(f => mk('down', f)), up: [0, 1, 2].map(f => mk('up', f)), right: [0, 1, 2].map(f => mk('side', f)) };
      s.left = s.right.map(Px.flip); return s;
    });
  },
  pessoaQ(L, d, f) {
    const R = RACAS[L.raca] || RACAS.humano, c = Px.cv(18, 28), p = Px.P(c.getContext('2d'));
    const pele = L.pele || R.pele[0], pS = shade(pele, -0.22), pH = shade(pele, 0.2), roupa = L.roupa || '#3a5a8a', rS = shade(roupa, -0.25), rH = shade(roupa, 0.2), bota = '#1e1e28';
    const lado = d === 'side', costas = d === 'up', larg = R.largo ? 1 : 0, ox = 1;
    // pernas (andando)
    const pa = f === 1 ? 1 : f === 2 ? -1 : 0;
    if (lado) { p(6 + ox + pa, 20, rS, 3, 5); p(8 + ox - pa, 20, roupa, 3, 5); p(6 + ox + pa, 25, bota, 4, 2); p(8 + ox - pa, 25, bota, 4, 2); }
    else { p(5 + ox - larg, 20, roupa, 3, 5 - (pa > 0 ? 1 : 0)); p(9 + ox + larg, 20, roupa, 3, 5 - (pa < 0 ? 1 : 0)); p(5 + ox - larg, 25 - (pa > 0 ? 1 : 0), bota, 3, 2); p(9 + ox + larg, 25 - (pa < 0 ? 1 : 0), bota, 3, 2); }
    // tronco do traje
    const tx = 4 + ox - larg, tw = 9 + larg * 2;
    p(tx, 12, roupa, tw, 9); p(tx, 12, rH, tw, 1); p(tx, 19, rS, tw, 1); p(tx, 18, '#2a2a34', tw, 1);   // cinto
    if (!costas) { p(tx + Math.floor(tw / 2) - 1, 14, L.luz || '#60e0ff', 2, 2); p(tx + 1, 13, rH, 1, 4); }
    else { p(tx + 2, 13, rS, tw - 4, 5); p(tx + 3, 14, '#5a5a66', tw - 6, 3); }   // mochila de oxigênio
    // braços
    const ab = f === 0 ? 0 : (f === 1 ? 1 : -1);
    if (lado) { p(7 + ox, 13 + ab, rS, 3, 6); p(7 + ox, 19 + ab, pele, 3, 2); }
    else { p(tx - 2, 13, rS, 2, 6 + (ab > 0 ? 1 : 0)); p(tx + tw, 13, rS, 2, 6 + (ab < 0 ? 1 : 0)); p(tx - 2, 19 + (ab > 0 ? 1 : 0), pele, 2, 2); p(tx + tw, 19 + (ab < 0 ? 1 : 0), pele, 2, 2); }
    // cabeça
    const cx = 8.5 + ox - (lado ? -0.5 : 0) * 0;
    switch (R.cabeca) {
      case 'humana':
        Px.ellipse(p, cx, 7, 4, 4.6, pele); p(cx - 4, 4, L.cabelo || '#2a1a10', 8, 3); if (!costas) { if (lado) { p(cx + 1, 7, R.olho); p(cx + 3, 9, pS); } else { p(cx - 2, 7, R.olho); p(cx + 1, 7, R.olho); p(cx - 1, 10, pS, 2, 1); } } else p(cx - 4, 4, L.cabelo || '#2a1a10', 8, 6);
        break;
      case 'oval':
        Px.ellipse(p, cx, 6, 5.2, 5.5, pele); p(cx - 2, 11, pele, 4, 1); p(cx - 4, 2, pH, 3, 1);
        if (!costas) { if (lado) { p(cx + 1, 5, R.olho, 3, 3); p(cx + 2, 5, '#3a3a4a'); } else { p(cx - 4, 5, R.olho, 3, 3); p(cx + 1, 5, R.olho, 3, 3); p(cx - 3, 5, '#4a4a5a'); p(cx + 2, 5, '#4a4a5a'); p(cx - 1, 9, pS, 2, 1); } }
        p(cx - 3, -0, pS, 1, 2); p(cx + 2, -0, pS, 1, 2); p(cx - 4, 0, '#e0ff60', 2, 1); p(cx + 2, 0, '#e0ff60', 2, 1);   // antenas
        break;
      case 'inseto':
        Px.ellipse(p, cx, 7, 4.2, 4.6, pele); p(cx - 4, 5, pS, 8, 1); p(cx - 3, 3, pH, 6, 1);
        if (!costas) { if (lado) { p(cx + 1, 5, R.olho, 3, 3); p(cx + 3, 10, pS, 2, 2); } else { p(cx - 4, 5, R.olho, 2, 3); p(cx + 2, 5, R.olho, 2, 3); p(cx - 3, 11, pS, 1, 2); p(cx + 2, 11, pS, 1, 2); } }
        p(cx - 2, 1, pS, 1, 2); p(cx + 1, 1, pS, 1, 2);
        break;
      case 'alongada':
        Px.ellipse(p, cx, 6, 3.6, 6.2, pele); p(cx - 1, -0, shade(pele, 0.3), 2, 3);   // crista
        if (!costas) { if (lado) { p(cx + 1, 6, R.olho, 2, 1); p(cx + 1, 7, '#a0e0ff'); } else { p(cx - 3, 6, R.olho, 2, 1); p(cx + 1, 6, R.olho, 2, 1); p(cx - 3, 7, '#a0e0ff', 2, 1); p(cx + 1, 7, '#a0e0ff', 2, 1); } }
        break;
      case 'pedra':
        p(cx - 5, 2, pele, 10, 9); p(cx - 5, 2, pH, 10, 1); p(cx - 5, 10, pS, 10, 1); p(cx - 2, 3, '#ff8020', 1, 3); p(cx + 2, 4, '#ff8020', 1, 2);   // rachaduras com lava
        if (!costas) { if (lado) p(cx + 2, 6, R.olho, 2, 1); else { p(cx - 3, 6, R.olho, 2, 1); p(cx + 1, 6, R.olho, 2, 1); } }
        break;
      case 'medusa':
        Px.ellipse(p, cx, 6, 5.4, 5, pele); p(cx - 3, 3, pH, 2, 2); p(cx + 2, 4, pH, 1, 1);
        for (let i = 0; i < 4; i++) p(cx - 4 + i * 2.5, 10, pS, 1, 3 + ((i + f) % 2));   // tentáculos
        if (!costas) { if (lado) p(cx + 2, 6, R.olho, 2, 2); else { p(cx - 3, 6, R.olho, 2, 2); p(cx + 1, 6, R.olho, 2, 2); } }
        break;
    }
    // capacete de vidro (só o jogador e os viajantes)
    if (L.capacete) { const x = c.getContext('2d'); x.globalAlpha = 0.28; x.fillStyle = '#b0e8ff'; x.beginPath(); x.ellipse(cx, 6.5, 6.5, 6.5, 0, 0, Math.PI * 2); x.fill(); x.globalAlpha = 1; x.strokeStyle = 'rgba(200,240,255,0.7)'; x.lineWidth = 1; x.beginPath(); x.ellipse(cx, 6.5, 6.5, 6.5, 0, 0, Math.PI * 2); x.stroke(); p(cx - 4, 2, '#ffffff', 2, 1); }
    // arma
    if (L.arma && !costas) { if (lado) { p(10 + ox, 16, '#4a4a58', 6, 2); p(15 + ox, 15, '#60e0ff', 1, 1); } else p(tx + tw, 17, '#4a4a58', 2, 4); }
    Px.outline(c); return c;
  },

  // ---------- fauna alienígena (de lado, virada para a direita) ----------
  criatura(tipo, cor, f) {
    return this.memo('c' + tipo + cor + f, () => {
      const hi = shade(cor, 0.25), sh = shade(cor, -0.3), dk = shade(cor, -0.55);
      let c, p;
      const mk = (w, h) => { c = Px.cv(w, h); p = Px.P(c.getContext('2d')); };
      switch (tipo) {
        case 'rastejante': mk(22, 14);
          for (let i = 0; i < 3; i++) { const k = (i + f) % 2; p(5 + i * 5, 9, dk, 1, 4 - k); p(4 + i * 5 + k, 12, dk, 2, 1); }
          Px.ellipse(p, 8, 7, 5, 3.5, cor); Px.ellipse(p, 14, 7, 4, 3.5, cor); p(4, 5, hi, 12, 1); for (let x = 5; x < 18; x += 3) p(x, 4, sh, 1, 2);
          Px.ellipse(p, 18.5, 7, 3, 3, sh); p(19, 6, '#ff3030', 2, 1); p(20, 3 - f % 2, dk, 1, 3); p(21, 2 - f % 2, dk);
          break;
        case 'gosma': mk(16, 14);
          { const sq = f === 1 ? 1 : 0; Px.ellipse(p, 8, 9 + sq, 7 + sq, 5 - sq, cor); p(3, 6 + sq, hi, 4, 2); p(9, 7 + sq, '#ffffff', 2, 2); p(12, 7 + sq, '#ffffff', 2, 2); p(10, 8 + sq, '#101010'); p(13, 8 + sq, '#101010'); p(2, 13, sh, 12, 1); }
          break;
        case 'voador': mk(22, 14);
          { const w = f === 1 ? -3 : f === 2 ? 3 : 0; Px.ellipse(p, 11, 7, 4, 3, cor); for (let i = 0; i < 8; i++) { p(10 - i, 6 + Math.round(w * i / 8) - Math.round(i / 3), sh, 1, 2); p(12 + i, 6 + Math.round(w * i / 8) - Math.round(i / 3), sh, 1, 2); } p(12, 6, '#ffe040'); p(9, 6, '#ffe040'); p(10, 10, dk, 2, 2); }
          break;
        case 'fera': mk(26, 18);
          { const pa = f === 1 ? 2 : f === 2 ? -2 : 0; for (const [x, k] of [[6, pa], [17, -pa]]) { p(x + k, 12, sh, 3, 5); p(x + k - 1, 16, dk, 4, 1); } Px.ellipse(p, 12, 9, 8, 4.5, cor); p(5, 5, hi, 14, 1); for (let x = 5; x < 19; x += 3) { p(x, 2, dk, 1, 3); p(x + 1, 3, dk); }
            Px.ellipse(p, 21, 8, 4, 3.5, cor); p(22, 11, '#f0f0e0', 3, 1); p(23, 7, '#ff4020'); p(1, 8, sh, 4, 2); p(0, 7, sh, 2, 1); for (const [x, k] of [[9, -pa], [19, pa]]) { p(x + k, 12, cor, 3, 5); p(x + k - 1, 16, dk, 4, 1); } }
          break;
        case 'golem': mk(20, 24);
          { const pa = f === 1 ? 1 : f === 2 ? -1 : 0; p(5 + pa, 17, sh, 4, 6); p(11 - pa, 17, sh, 4, 6); p(4, 8, cor, 12, 10); p(4, 8, hi, 12, 2); p(1, 9, sh, 3, 8); p(16, 9, sh, 3, 8); p(6, 1, cor, 8, 7); p(8, 4, '#ffffff', 4, 1); p(7, 10, hi, 2, 3); p(12, 13, hi, 2, 2); p(9, 0, hi, 2, 2); }
          break;
      }
      Px.outline(c); return c;
    });
  },

  // ---------- naves (apontando para a direita) ----------
  nave(tipo, cor) {
    return this.memo('n' + tipo + cor, () => {
      const hi = shade(cor, 0.3), sh = shade(cor, -0.3), dk = shade(cor, -0.55);
      let c, p; const mk = (w, h) => { c = Px.cv(w, h); p = Px.P(c.getContext('2d')); };
      if (tipo === 'jogador') { mk(28, 22);
        p(2, 3, sh, 10, 3); p(2, 16, sh, 10, 3); p(4, 2, dk, 6, 1); p(4, 19, dk, 6, 1);     // asas
        p(4, 7, cor, 18, 8); p(22, 8, cor, 3, 6); p(25, 10, cor, 2, 2); p(4, 7, hi, 18, 1); p(4, 14, sh, 18, 1);
        p(15, 9, '#60d0ff', 6, 4); p(16, 9, '#c0f0ff', 3, 1);                                  // cabine
        p(0, 8, '#ffb040', 4, 2); p(0, 12, '#ffb040', 4, 2); p(0, 9, '#fff0a0', 2, 1); p(0, 13, '#fff0a0', 2, 1);   // motores
        p(8, 5, dk, 2, 2); p(8, 15, dk, 2, 2); p(11, 4, '#ff4040'); p(11, 17, '#40ff60');
      } else if (tipo === 'pirata') { mk(26, 22);
        p(3, 1, dk, 8, 4); p(3, 17, dk, 8, 4); p(9, 2, sh, 4, 3); p(9, 17, sh, 4, 3);
        p(3, 6, cor, 15, 10); p(18, 8, cor, 4, 6); p(22, 10, sh, 4, 2); p(3, 6, hi, 15, 1);
        p(14, 9, '#ff3030', 4, 4); p(15, 9, '#ff9090'); p(0, 9, '#ff6020', 3, 4); p(6, 10, '#1a1a1a', 6, 2);
      } else if (tipo === 'mercante') { mk(36, 22);
        p(2, 4, cor, 26, 14); p(2, 4, hi, 26, 1); p(2, 17, sh, 26, 1); for (let x = 5; x < 25; x += 6) p(x, 6, sh, 4, 10);
        p(28, 7, cor, 5, 8); p(33, 9, sh, 2, 4); p(29, 8, '#60d0ff', 3, 3); p(0, 7, '#ffb040', 2, 3); p(0, 12, '#ffb040', 2, 3);
      } else if (tipo === 'patrulha') { mk(30, 20);
        p(4, 2, sh, 12, 3); p(4, 15, sh, 12, 3); p(2, 6, cor, 22, 8); p(24, 8, cor, 4, 4); p(2, 6, hi, 22, 1); p(17, 8, '#60d0ff', 5, 4); p(0, 8, '#80c0ff', 2, 4); p(8, 9, '#ffe060', 6, 2);
      }
      Px.outline(c); return Px.giros(c, 32);
    });
  },
  estacao() {
    return this.memo('estacao', () => {
      const c = Px.cv(80, 80), x = c.getContext('2d'), p = Px.P(x);
      x.strokeStyle = '#7a8a9a'; x.lineWidth = 6; x.beginPath(); x.arc(40, 40, 30, 0, Math.PI * 2); x.stroke();
      x.strokeStyle = '#a8b8c8'; x.lineWidth = 2; x.beginPath(); x.arc(40, 40, 32, Math.PI * 1.1, Math.PI * 1.7); x.stroke();
      for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2; p(40 + Math.cos(a) * 18 - 2, 40 + Math.sin(a) * 18 - 2, '#5a6a7a', 4, 4); }
      Px.ellipse(p, 40, 40, 12, 12, '#8a9aaa'); Px.ellipse(p, 40, 38, 9, 8, '#aabaca'); p(35, 37, '#60d0ff', 10, 3);
      for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; p(40 + Math.cos(a) * 30 - 1, 40 + Math.sin(a) * 30 - 1, i % 2 ? '#ffe060' : '#60e0ff', 2, 2); }
      p(70, 36, '#5a6a7a', 10, 8); p(76, 38, '#ffd040', 4, 4);   // doca
      Px.outline(c); return c;
    });
  },
  asteroide(seed, r) {
    return this.memo('a' + seed + r, () => {
      const S = r * 2 + 2, c = Px.cv(S, S), p = Px.P(c.getContext('2d')), n = new Simplex(seed);
      for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
        const dx = x - S / 2, dy = y - S / 2, a = Math.atan2(dy, dx), rr = r * (0.8 + 0.25 * n.noise(Math.cos(a) * 1.5, Math.sin(a) * 1.5));
        if (Math.hypot(dx, dy) > rr) continue;
        const v = n.noise(x * 0.25, y * 0.25), l = (dx + dy) / (r * 2);
        p(x, y, v > 0.35 ? '#5a4a42' : l < -0.2 ? '#9a8a7a' : l > 0.3 ? '#4a3e38' : '#7a6a5e');
      }
      Px.outline(c, '#1a1410'); return c;
    });
  },
  // ---------- planetas vistos do espaço ----------
  planeta(pl) {
    return this.memo('pl' + pl.id, () => {
      const r = pl.r, S = r * 2 + 8, c = Px.cv(S, S), x = c.getContext('2d'), img = x.createImageData(S, S), d = img.data, n = new Simplex(hashStr(pl.id)), B = BIOMAS[pl.bioma];
      const cols = B.espaco.map(hexToRgb);
      for (let j = 0; j < S; j++) for (let i = 0; i < S; i++) {
        const dx = (i - S / 2 + 0.5) / r, dy = (j - S / 2 + 0.5) / r, q = dx * dx + dy * dy; if (q > 1) continue;
        const z = Math.sqrt(1 - q), u = dx / (z + 0.7) * 2.2, v = dy / (z + 0.7) * 2.2;
        let h = fbm(n, u + 3, v + 7, 4);
        if (B.faixas) h = Math.sin(dy * 9 + fbm(n, u, v, 2) * 1.6) * 0.6;
        const k = h < -0.15 ? 0 : h < 0.12 ? 1 : h < 0.38 ? 2 : 3, col = cols[Math.min(cols.length - 1, k)];
        const luz = clamp(0.25 + 0.85 * (z * 0.55 + (-dx * 0.6 - dy * 0.35)), 0.12, 1.15);
        const o = (j * S + i) * 4; d[o] = col[0] * luz; d[o + 1] = col[1] * luz; d[o + 2] = col[2] * luz; d[o + 3] = 255;
      }
      x.putImageData(img, 0, 0);
      // atmosfera
      x.strokeStyle = B.atmos; x.globalAlpha = 0.5; x.lineWidth = 2; x.beginPath(); x.arc(S / 2, S / 2, r + 1, Math.PI * 0.6, Math.PI * 1.7); x.stroke(); x.globalAlpha = 1;
      return c;
    });
  },
  anel(pl) {
    return this.memo('anel' + pl.id, () => { const r = pl.r, c = Px.cv(r * 5, r * 2), x = c.getContext('2d'); x.strokeStyle = '#d8c8a0'; x.globalAlpha = 0.7; for (let k = 0; k < 3; k++) { x.lineWidth = 2 - k * 0.5; x.beginPath(); x.ellipse(r * 2.5, r, r * 2.1 + k * 3, r * 0.45 + k, -0.25, 0, Math.PI * 2); x.stroke(); } return c; });
  },
  // ---------- chão e objetos dos planetas ----------
  tile(bioma, t, v) {
    return this.memo('t' + bioma + t + v, () => {
      const B = BIOMAS[bioma], c = Px.cv(16, 16), p = Px.P(c.getContext('2d')), r = new RNG(t * 97 + v * 13 + hashStr(bioma));
      const base = t === 0 ? B.chao[0] : t === 1 ? B.chao[1] : t === 2 ? B.liquido : t === 3 ? B.areia : t === 4 ? mix('#4a505a', B.chao[0], 0.3) : B.chao[0];
      p(0, 0, base, 16, 16);
      if (t === 2) { for (let i = 0; i < 5; i++) p(r.int(0, 12), r.int(0, 15), shade(base, B.liquidoQuente ? 0.35 : 0.2), r.int(2, 4), 1); }
      else if (t === 4) { p(0, 0, shade(base, 0.12), 16, 1); p(0, 0, shade(base, 0.12), 1, 16); p(8, 0, shade(base, -0.18), 1, 16); p(0, 8, shade(base, -0.18), 16, 1); p(3, 3, shade(base, 0.3)); p(12, 11, shade(base, 0.3)); }
      else for (let i = 0; i < 6; i++) p(r.int(0, 15), r.int(0, 15), r.chance(0.5) ? shade(base, 0.12) : shade(base, -0.14), r.int(1, 2), 1);
      return c;
    });
  },
  objeto(bioma, o) {
    return this.memo('o' + bioma + o, () => {
      const B = BIOMAS[bioma]; let c, p; const mk = (w, h) => { c = Px.cv(w, h); p = Px.P(c.getContext('2d')); };
      switch (o) {
        case 'rocha': mk(16, 14); Px.ellipse(p, 8, 8, 7, 5.5, B.rocha); p(3, 4, shade(B.rocha, 0.25), 6, 2); p(4, 11, shade(B.rocha, -0.3), 9, 2); break;
        case 'planta': mk(16, 26);
          if (B.flora === 'cogumelo') { p(7, 12, '#e8d8c0', 3, 13); Px.ellipse(p, 8, 9, 7, 5, B.floraCor); p(4, 7, '#ffffff', 2, 2); p(10, 6, '#ffffff', 2, 2); }
          else if (B.flora === 'espinho') { for (const [x, h] of [[4, 14], [8, 22], [12, 16]]) { p(x, 26 - h, B.floraCor, 2, h); p(x - 1, 26 - h + 4, shade(B.floraCor, 0.3)); p(x + 2, 26 - h + 8, shade(B.floraCor, 0.3)); } }
          else if (B.flora === 'cristal') { for (const [x, h] of [[4, 12], [8, 20], [11, 14]]) { p(x, 26 - h, B.floraCor, 3, h); p(x, 26 - h, '#ffffff', 1, h - 2); p(x + 1, 25 - h, B.floraCor); } }
          else if (B.flora === 'palmeira') { p(7, 9, '#8a6a3a', 2, 17); for (let i = -6; i <= 6; i += 2) p(8 + i, 6 + Math.abs(i) / 2, B.floraCor, 2, 2); p(5, 5, B.floraCor, 6, 2); }
          else { p(7, 14, shade(B.floraCor, -0.4), 2, 12); Px.ellipse(p, 8, 9, 6, 7, B.floraCor); p(5, 5, shade(B.floraCor, 0.3), 3, 2); }
          break;
        case 'cristal': mk(16, 20); { const cc = ITENS[B.cristal].cor; p(3, 9, cc, 3, 10); p(7, 3, cc, 4, 16); p(11, 8, cc, 3, 11); p(7, 3, '#ffffff', 1, 12); p(3, 9, '#ffffff', 1, 6); p(2, 18, '#3a3a44', 13, 2); } break;
        case 'domo': mk(52, 40);
          Px.ellipse(p, 26, 22, 24, 18, '#b8c4d0'); p(2, 22, '#b8c4d0', 48, 14); p(2, 34, '#7a8694', 48, 4); Px.ellipse(p, 20, 14, 10, 6, '#d8e4f0');
          for (let x = 8; x < 46; x += 9) p(x, 24, '#60c0e0', 5, 4); p(22, 26, '#3a4654', 8, 10); p(25, 27, '#ffd040', 2, 2); p(26, 2, '#7a8694', 1, 4); p(25, 1, '#ff4040', 3, 1);
          break;
        case 'loja': mk(52, 40);
          Px.ellipse(p, 26, 22, 24, 18, '#c8b898'); p(2, 22, '#c8b898', 48, 14); p(2, 34, '#8a7a5a', 48, 4); p(14, 14, '#3a2a1a', 24, 7); p(16, 15, '#ffd040', 20, 5); p(22, 26, '#3a4654', 8, 10);
          for (let x = 6; x < 46; x += 10) p(x, 24, '#ffb040', 4, 3);
          break;
        case 'torre': mk(14, 40); p(5, 6, '#7a8694', 4, 34); p(2, 36, '#5a6674', 10, 4); p(3, 2, '#9aa6b4', 8, 5); p(6, 0, '#ff4040', 2, 2); p(1, 18, '#7a8694', 12, 1); break;
        case 'lampada': mk(8, 24); p(3, 4, '#5a6674', 2, 20); p(1, 1, '#60e0ff', 6, 4); p(2, 2, '#e0ffff', 4, 2); break;
      }
      Px.outline(c); return c;
    });
  },
  // a nave pousada (vista de cima, de lado)
  navePousada(cor) { return this.memo('pousada' + cor, () => { const n = this.nave('jogador', cor)[24]; return n; }); }
};
