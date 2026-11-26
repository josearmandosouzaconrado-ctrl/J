'use strict';
// =====================================================================
//  CENA DA TELA DE CARREGAMENTO — um cavaleiro com o estandarte cavalga ao
//  entardecer, com montanhas, um castelo no morro e vaga-lumes. Pixel art
//  desenhada em código numa tela pequena (384x216) e ampliada sem borrar.
//  Não depende de nada do jogo: também é usada na primeira abertura do APK
//  leve, antes de o jogo ser baixado.
// =====================================================================
const CenaCarga = {
  W: 384, H: 216,
  estrelas: null,
  ini() {
    if (this.estrelas) return;
    let s = 1234567; const r = () => (s = (s * 16807) % 2147483647) / 2147483647;
    this.estrelas = []; for (let i = 0; i < 90; i++) this.estrelas.push([Math.floor(r() * this.W), Math.floor(r() * this.H * 0.55), r() * 6.28, r() < 0.15 ? 2 : 1]);
    this.vagalumes = []; for (let i = 0; i < 18; i++) this.vagalumes.push([r() * this.W, this.H * 0.4 + r() * this.H * 0.25, r() * 6.28, 0.4 + r() * 0.8]);
  },
  // altura de um "relevo" em x (soma de senos: sempre a mesma montanha no mesmo lugar)
  relevo(x, a, f) { return Math.sin(x * f) * a + Math.sin(x * f * 2.3 + 1.7) * a * 0.45 + Math.sin(x * f * 5.1 + 0.3) * a * 0.18; },
  desenhar(ctx, t) {
    this.ini();
    const W = this.W, H = this.H, f = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h)); };
    // céu do entardecer em faixas (como pixel art)
    const ceu = ['#140c24', '#1e1032', '#2c1440', '#40184c', '#5a1e52', '#7a2a52', '#9c3a4e', '#c2543e', '#e07a3a', '#f0a04a'];
    const fx = Math.ceil(H * 0.6 / ceu.length);
    ceu.forEach((c, i) => f(0, i * fx, W, fx + 1, c));
    // estrelas piscando
    for (const [x, y, ph, sz] of this.estrelas) { const a = 0.35 + 0.65 * Math.abs(Math.sin(t * 1.3 + ph)); if (y > H * 0.38) continue; ctx.globalAlpha = a; f(x, y, sz, sz, '#fff4d8'); }
    ctx.globalAlpha = 1;
    // sol se pondo atrás das montanhas
    const sx = W * 0.72, sy = H * 0.48;
    for (let r = 30; r > 0; r -= 3) { ctx.globalAlpha = 0.08; ctx.fillStyle = '#ffd080'; ctx.beginPath(); ctx.arc(sx, sy, r + 14, 0, 6.29); ctx.fill(); }
    ctx.globalAlpha = 1; ctx.fillStyle = '#ffe2a0'; ctx.beginPath(); ctx.arc(sx, sy, 20, 0, 6.29); ctx.fill();
    // três camadas de montanhas que deslizam devagar (a viagem continua)
    // cada camada é um desenho só (um polígono), para a cena pesar pouco no celular
    const camada = (base, amp, freq, vel, cor, neve) => {
      const off = t * vel;
      ctx.fillStyle = cor; ctx.beginPath(); ctx.moveTo(0, H);
      for (let x = 0; x <= W; x += 3) ctx.lineTo(x, Math.round(base - this.relevo(x + off, amp, freq)));
      ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
      if (neve) { ctx.fillStyle = neve; for (let x = 0; x < W; x += 3) { const r = this.relevo(x + off, amp, freq); if (r > amp * 0.72) ctx.fillRect(x, Math.round(base - r), 3, 2); } }
    };
    camada(H * 0.45, 24, 0.018, 4, '#4a2450', '#c890b0');
    camada(H * 0.54, 16, 0.03, 9, '#2e1838', null);
    // castelo no morro (na camada do meio, passando devagar)
    const cx = ((W * 0.3 - t * 9) % (W + 160) + W + 160) % (W + 160) - 80, chao = H * 0.54 - this.relevo(cx + 9 * t + 40, 16, 0.03) - 2;
    const c = '#1c0f24';
    f(cx, chao - 26, 50, 26, c); f(cx - 6, chao - 40, 12, 40, c); f(cx + 44, chao - 40, 12, 40, c); f(cx + 18, chao - 48, 14, 48, c);
    for (let i = 0; i < 4; i++) { f(cx - 6 + i * 3, chao - 43, 2, 3, c); f(cx + 44 + i * 3, chao - 43, 2, 3, c); }
    f(cx + 24, chao - 58, 1, 10, c); f(cx + 25, chao - 58, 6, 4, '#c03030');
    const luz = Math.sin(t * 3) > -0.6 ? '#ffc860' : '#c08040';
    f(cx + 3, chao - 18, 2, 3, luz); f(cx + 22, chao - 36, 2, 3, luz); f(cx + 47, chao - 30, 2, 3, luz); f(cx + 33, chao - 14, 2, 3, '#ffc860');
    // chão perto, com a estrada
    camada(H * 0.62, 6, 0.05, 30, '#140a1a', null);
    f(0, H * 0.66, W, H * 0.34, '#0e0712');
    ctx.fillStyle = '#2a1830'; for (let x = (7 - Math.floor(t * 60) % 7) % 7; x < W; x += 7) ctx.fillRect(x, Math.round(H * 0.66) + 1, 1, 1);
    // o cavaleiro com o estandarte (silhueta), cavalgando no lugar
    const k = Math.floor(t * 8) % 4, bx = W * 0.5, by = H * 0.665, s = '#07040a', pulo = k === 1 || k === 3 ? -1 : 0;
    // cavalo
    f(bx - 16, by - 20 + pulo, 30, 10, s); f(bx + 10, by - 27 + pulo, 7, 10, s); f(bx + 14, by - 30 + pulo, 8, 5, s); f(bx + 20, by - 29 + pulo, 3, 3, s);
    f(bx - 20, by - 19 + pulo, 5, 3, s); f(bx - 22, by - 17 + pulo, 3, 6, s);
    const pernas = [[-13, -6], [-8, 4], [6, -4], [11, 5]];
    pernas.forEach(([px, fase], i) => { const sw = Math.sin((t * 8 + i * 1.6)) * 3; f(bx + px + sw * 0.5, by - 11 + pulo, 3, 7, s); f(bx + px + sw, by - 5, 3, 5, s); });
    // cavaleiro
    f(bx - 3, by - 34 + pulo, 8, 14, s); f(bx - 1, by - 41 + pulo, 6, 7, s); f(bx + 1, by - 44 + pulo, 2, 3, s);
    f(bx + 4, by - 30 + pulo, 6, 3, s);
    // lança com o estandarte balançando ao vento
    f(bx - 7, by - 60 + pulo, 2, 44, s);
    for (let y = 0; y < 10; y++) { const onda = Math.round(Math.sin(t * 6 + y * 0.5) * 1.5); f(bx - 5, by - 59 + y + pulo, 14 + onda, 1, y === 4 || y === 5 ? '#f0c040' : '#b02428'); }
    // vaga-lumes subindo
    for (const v of this.vagalumes) {
      const y = ((v[1] - t * 6 * v[3]) % (H * 0.3) + H * 0.3) % (H * 0.3) + H * 0.38, x = v[0] + Math.sin(t + v[2]) * 6;
      ctx.globalAlpha = 0.5 + 0.5 * Math.sin(t * 4 + v[2]); f(x, y, 1, 1, '#ffe080');
    }
    ctx.globalAlpha = 1;
    // vinheta escura nas bordas
    if (!this._vin || this._vinC !== ctx) { this._vinC = ctx; this._vin = ctx.createRadialGradient(W / 2, H / 2, H * 0.3, W / 2, H / 2, H * 0.95); this._vin.addColorStop(0, 'rgba(0,0,0,0)'); this._vin.addColorStop(1, 'rgba(0,0,0,0.55)'); }
    ctx.fillStyle = this._vin; ctx.fillRect(0, 0, W, H);
  },
  // anima uma tela (canvas) enquanto ela estiver na página
  animar(cv) {
    cv.width = this.W; cv.height = this.H;
    const ctx = cv.getContext('2d'), t0 = performance.now();
    let ult = 0;
    const passo = (ts) => { if (!cv.isConnected) return; if (!ts || ts - ult > 32) { ult = ts || 0; this.desenhar(ctx, (performance.now() - t0) / 1000); } requestAnimationFrame(passo); };   // ~30 quadros por segundo
    requestAnimationFrame(passo);
  }
};
const DICAS_CARGA = [
  'Os moradores têm rotina: siga alguém e entre atrás dele nos prédios.',
  'No inverno a caça some e a comida fica cara. Guarde mantimentos no outono!',
  'Na República, faça campanha: pão para o povo e banquetes para os nobres ganham votos.',
  'Na Junta Militar, pague o soldo dos generais ou um deles dá um golpe.',
  'Na Comuna do Povo, só quem tem 50 anos tem assento no Conselho dos Anciãos.',
  'Cada casa nobre tem uma mansão diferente. Visite e converse com o Duque.',
  'Os soldados das casas nobres usam as cores e o elmo da casa.',
  'Abra o mapa e toque numa cidade descoberta para viajar rápido.',
  'Viaje de navio pelos portos para cruzar os mares entre os continentes.',
  'Aurévia, o maior continente, fica além do Mar das Rosas.',
  'Crianças vão à escola das 7h às 16h e se formam aos 16 anos.',
  'Jante com a família para encher a fome e a sede.',
  'Durma na sua casa ou alugue um quarto numa taverna para recuperar o sono.',
  'Andar na neve é mais lento. No deserto não neva.',
  'Mande demolir as casas que você construiu pela aba Família.',
  'No multiplayer, toque em 💬 e no nome de alguém para conversar, namorar e casar.',
  'Ative mods de outros jogadores em 🧩 Mods → 🌍 Galeria.',
  'Use 💾 Copiar o progresso (em Opções) para levar os seus saves para outro aparelho.',
  'As fazendas grandes têm vacas, fazendeiros e plantações perto das vilas.',
  'Converse com os moradores e pergunte: "Como é o seu dia?"',
  'Fundar uma vila é o primeiro passo para ter o seu próprio reino.',
  'Uma guerra civil longa pode derrubar a monarquia e trazer uma república.'
];
