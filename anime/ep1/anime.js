'use strict';
// =====================================================================
//  CRÔNICAS DE ELDORIA — O ANIME
//  Episódio 1: "O Chifre do Norte"
//  Cada quadro é desenhado aqui: personagens em cel-shading com esqueleto
//  (poses animadas "em dois", como nos animes de TV: 12 desenhos por
//  segundo, câmera a 24), cenários pintados (gerados no Figma), linhas de
//  velocidade, quadros de impacto, faíscas, neve, brasas e aura.
//  render(t) desenha o instante t (segundos) no canvas 1280x720.
// =====================================================================
const W = 1280, H = 720, FPS = 24;
const cv = document.getElementById('c'); let X = cv.getContext('2d');
const IMG = {};
const NOMES = ['vila', 'hrimgard', 'fogo', 'colina'];
function carregar() {
  return Promise.all(NOMES.map(n => new Promise(r => { const i = new Image(); i.onload = () => { IMG[n] = i; r(); }; i.src = 'cenarios/' + n + '.jpg'; })));
}
// ---------- utilidades ----------
const R = (i) => { const x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const cl = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const lerp = (a, b, k) => a + (b - a) * k;
const ease = k => k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
const easeOut = k => 1 - Math.pow(1 - k, 3);
const seg = (t, a, b) => cl((t - a) / (b - a));
const rad = d => d * Math.PI / 180;
const doze = t => Math.floor(t * 12) / 12;        // animação "em dois"
function offscreen() { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; }
const OFF = [offscreen(), offscreen(), offscreen()];

// ---------- câmera e cenário ----------
let CAM = { sx: 0, sy: 0 };
function cenario(nome, zoom, cx, cy, filtro) {
  const im = IMG[nome], k = (W / im.width) * zoom;
  const vw = W / k, vh = H / k;
  let x0 = cx * im.width - vw / 2, y0 = cy * im.height - vh / 2;
  x0 = cl(x0, 0, im.width - vw); y0 = cl(y0, 0, im.height - vh);
  X.save(); if (filtro) X.filter = filtro;
  X.drawImage(im, x0, y0, vw, vh, CAM.sx - 12, CAM.sy - 12, W + 24, H + 24);
  X.restore();
  return { k, x0, y0, map: (ix, iy) => [(ix - x0) * k + CAM.sx, (iy - y0) * k + CAM.sy] };
}
function tremor(t, forca, ate) {
  const f = forca * cl(1 - t / ate);
  CAM.sx = (R(Math.floor(t * 48)) - 0.5) * 2 * f; CAM.sy = (R(Math.floor(t * 48) + 9) - 0.5) * 2 * f;
}

// ---------- desenho básico ----------
let LW = 3;
function contorno(c) { X.lineWidth = LW; X.strokeStyle = c || '#1a1014'; X.lineJoin = 'round'; X.lineCap = 'round'; X.stroke(); }
function poly(pts, fill, linha = true) {
  X.beginPath(); X.moveTo(pts[0][0], pts[0][1]); for (let i = 1; i < pts.length; i++) X.lineTo(pts[i][0], pts[i][1]); X.closePath();
  if (fill) { X.fillStyle = fill; X.fill(); } if (linha) contorno();
}
function curva(pts, fill, linha = true) {
  // contorno suave passando pelos pontos (fechado)
  const n = pts.length; X.beginPath();
  const m = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  let p = m(pts[n - 1], pts[0]); X.moveTo(p[0], p[1]);
  for (let i = 0; i < n; i++) { const q = m(pts[i], pts[(i + 1) % n]); X.quadraticCurveTo(pts[i][0], pts[i][1], q[0], q[1]); }
  X.closePath(); if (fill) { X.fillStyle = fill; X.fill(); } if (linha) contorno();
}
const dirA = a => [Math.sin(rad(a)), Math.cos(rad(a))];     // ângulo a partir de "para baixo", positivo = para a frente
// membros em cadeia (braço+antebraço, coxa+canela): primeiro todos os contornos, depois o preenchimento,
// assim as juntas ficam sem emenda. cores/sombras podem ser uma cor ou uma por segmento
function cadeia(pts, ws, cores, sombras, f) {
  const n = pts.length - 1, cor = i => Array.isArray(cores) ? cores[i] : cores, som = i => Array.isArray(sombras) ? sombras[i] : sombras;
  X.lineCap = 'round'; X.lineJoin = 'round';
  for (let i = 0; i < n; i++) { X.strokeStyle = '#1a1014'; X.lineWidth = ws[i] + ws[i + 1] + LW * 2; X.beginPath(); X.moveTo(pts[i][0], pts[i][1]); X.lineTo(pts[i + 1][0], pts[i + 1][1]); X.stroke(); }
  for (let i = 0; i < n; i++) { X.strokeStyle = cor(i); X.lineWidth = ws[i] + ws[i + 1]; X.beginPath(); X.moveTo(pts[i][0], pts[i][1]); X.lineTo(pts[i + 1][0], pts[i + 1][1]); X.stroke(); }
  X.lineCap = 'butt';
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[i + 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, w = (ws[i] + ws[i + 1]) / 2;
    const sd = (nx * -f + ny * 0.6) > 0 ? 1 : -1, o = w * 0.5 * sd;
    X.strokeStyle = som(i); X.lineWidth = w * 0.85; X.beginPath(); X.moveTo(a[0] + nx * o, a[1] + ny * o); X.lineTo(b[0] + nx * o, b[1] + ny * o); X.stroke();
  }
  X.lineCap = 'round';
}
function membro(a, b, w0, w1, cor, sombra, f) { cadeia([a, b], [w0, w1], cor, sombra, f); }

function mecha(b1, b2, tip, curv, cor) {
  const mx = (b1[0] + tip[0]) / 2 + curv[0], my = (b1[1] + tip[1]) / 2 + curv[1], nx = (b2[0] + tip[0]) / 2 + curv[0], ny = (b2[1] + tip[1]) / 2 + curv[1];
  X.beginPath(); X.moveTo(b1[0], b1[1]); X.quadraticCurveTo(mx, my, tip[0], tip[1]); X.quadraticCurveTo(nx, ny, b2[0], b2[1]); X.closePath(); X.fillStyle = cor; X.fill(); contorno();
}
// o Jarl Hrafn de frente (aparece sempre em silhueta): k = 0 parado, 1 soprando o chifre
function jarlFigura(x, y, s, t, k) {
  X.save(); X.translate(x, y); X.scale(s, s); LW = 3 / s;
  const fl = Math.sin(t * 3) * 8, c = '#000';
  // machado na mão direita
  poly([[84, -10], [94, -10], [94, -300], [84, -300]], c);
  X.beginPath(); X.moveTo(94, -300); X.quadraticCurveTo(160, -320, 160, -250); X.quadraticCurveTo(150, -215, 94, -232); X.closePath(); X.fillStyle = c; X.fill();
  // manto esvoaçando
  poly([[-72, -255], [72, -255], [100 + fl, -60], [128 + fl * 1.6, 4], [70, -6], [0, -20], [-70, -6], [-128 - fl * 1.6, 4], [-100 - fl, -60]], c);
  // pernas e tronco
  poly([[-34, -115], [-6, -115], [-10, 0], [-44, 0]], c); poly([[6, -115], [34, -115], [44, 0], [10, 0]], c);
  poly([[-52, -255], [52, -255], [46, -110], [-46, -110]], c);
  // braço direito segurando o machado
  cadeia([[56, -240], [84, -175], [89, -130]], [17, 15, 13], c, c, 1);
  // braço esquerdo: parado ou levando o chifre à boca
  const cot = [lerp(-80, -96, k), lerp(-175, -205, k)], mao = [lerp(-86, -36, k), lerp(-128, -282, k)];
  cadeia([[-56, -240], cot, mao], [17, 15, 13], c, c, 1);
  if (k > 0.3) { X.beginPath(); X.moveTo(mao[0] + 6, mao[1] - 6); X.quadraticCurveTo(-80, -330, -150, -390); X.lineTo(-118, -410); X.quadraticCurveTo(-70, -350, mao[0] + 14, mao[1] + 8); X.closePath(); X.fillStyle = c; X.fill(); }
  // pele de lobo nos ombros (serrilhada)
  const pts = []; for (let i = 0; i <= 20; i++) { const a = Math.PI + i / 20 * Math.PI, rr = i % 2 ? 74 : 92; pts.push([Math.cos(a) * rr * 1.12, -246 + Math.sin(a) * rr * 0.42]); }
  pts.push([70, -228]); pts.push([-70, -228]); poly(pts, c);
  // cabeça, barba trançada e coroa de ferro
  X.beginPath(); X.arc(0, -296, 27, 0, 7); X.fillStyle = c; X.fill();
  poly([[-26, -292], [26, -292], [22, -236], [10, -196], [2, -226], [-2, -226], [-10, -196], [-22, -236]], c);
  poly([[-30, -304], [30, -304], [33, -330], [20, -318], [13, -350], [0, -324], [-13, -350], [-20, -318], [-33, -330]], c);
  // cabelo longo atrás dos ombros
  poly([[-28, -300], [-46, -250 + fl * 0.3], [-30, -236], [28, -236], [46, -250 - fl * 0.3], [28, -300]], c);
  X.restore();
  return [[x - 10 * s, y - 298 * s], [x + 10 * s, y - 298 * s]];
}
function olhosJarl(ps, a, r = 34) {
  X.save(); X.globalCompositeOperation = 'lighter';
  for (const [ex, ey] of ps) { const g = X.createRadialGradient(ex, ey, 0, ex, ey, r); g.addColorStop(0, `rgba(210,250,255,${a})`); g.addColorStop(0.3, `rgba(110,210,255,${a * 0.8})`); g.addColorStop(1, 'rgba(40,140,255,0)'); X.fillStyle = g; X.fillRect(ex - r, ey - r, r * 2, r * 2); X.fillStyle = `rgba(255,255,255,${a})`; X.fillRect(ex - 5, ey - 1.5, 10, 3); }
  X.restore();
}
// ---------- os personagens ----------
const ELENCO = {
  aren: { skin: '#f6d2b0', skinS: '#d9a585', hair: '#c4482a', hairS: '#7e2414', hairH: '#f08050', eye: '#2f7fd8', eyeD: '#163a7a',
    tunic: '#2f6db5', tunicS: '#1d4680', trim: '#e8c05a', pants: '#4a3a2e', pantsS: '#2e231b', boots: '#5a3520', bootsS: '#38200f',
    belt: '#6a4024', scarf: '#d8322e', scarfS: '#92181a', arma: 'espada', alt: 1, larg: 1, cabeca: 1, cabelo: 'espetado' },
  borin: { skin: '#e8b48c', skinS: '#c08860', hair: '#b8b8c0', hairS: '#7a7a88', hairH: '#e8e8f0', eye: '#5a3a1a', eyeD: '#2a1a0a',
    tunic: '#7a4a28', tunicS: '#4e2c14', trim: '#c0a060', pants: '#5a4a3a', pantsS: '#3a2e22', boots: '#3a2a1a', bootsS: '#22160c',
    belt: '#2a1a10', arma: 'martelo', alt: 0.72, larg: 1.45, cabeca: 1.05, cabelo: 'careca', barba: '#c8c8d0', barbaS: '#8a8a96' },
  berserker: { skin: '#f0d6c4', skinS: '#c8a08a', hair: '#d0702a', hairS: '#8a3a10', hairH: '#f0a050', eye: '#c0302a', eyeD: '#5a0a0a',
    tunic: '#4a4a52', tunicS: '#2a2a32', trim: '#8a6a3a', pants: '#3a3028', pantsS: '#221a14', boots: '#4a3a2a', bootsS: '#2a1e12',
    belt: '#3a2614', arma: 'machado', alt: 1.22, larg: 1.6, cabeca: 1.0, cabelo: 'urso', bracosNus: true, barba: '#d0702a', barbaS: '#8a3a10', pintura: true,
    urso: '#5a3a24', ursoS: '#36200f' },
  viking: { skin: '#e8c8b0', skinS: '#c09a80', hair: '#c0a060', hairS: '#7a6030', hairH: '#e0c080', eye: '#3a5a7a', eyeD: '#1a2a3a',
    tunic: '#6a3a30', tunicS: '#42221a', trim: '#8a8a90', pants: '#3a3a3a', pantsS: '#222', boots: '#3a2a1a', bootsS: '#22160c',
    belt: '#2a1a10', arma: 'machado', alt: 1.08, larg: 1.25, cabeca: 1, cabelo: 'elmo', barba: '#c0a060', barbaS: '#7a6030', escudo: '#a83a2a' },
  aldeao: { skin: '#f0c8a0', skinS: '#c89a78', hair: '#5a3a1a', hairS: '#3a220c', hairH: '#8a5a30', eye: '#4a3a2a', eyeD: '#221a10',
    tunic: '#a89a6a', tunicS: '#7a6a44', trim: '#7a6a44', pants: '#6a5a44', pantsS: '#4a3e2e', boots: '#4a3020', bootsS: '#2a1a10',
    belt: '#4a3020', arma: null, alt: 0.95, larg: 1, cabeca: 1, cabelo: 'curto' },
  aldea: { skin: '#f6d2b0', skinS: '#d0a080', hair: '#e0c070', hairS: '#a08030', hairH: '#f8e0a0', eye: '#4a7a3a', eyeD: '#1a3a10',
    tunic: '#a8484a', tunicS: '#782c2e', trim: '#f0e0c0', pants: '#a8484a', pantsS: '#782c2e', boots: '#4a3020', bootsS: '#2a1a10',
    belt: '#f0e0c0', arma: null, alt: 0.9, larg: 0.95, cabeca: 1, cabelo: 'tranca', saia: true },
  jarl: { skin: '#e8d0c0', skinS: '#b09080', hair: '#e8e8f0', hairS: '#9a9aa8', hairH: '#fff', eye: '#7ad8ff', eyeD: '#1a6aa0',
    tunic: '#2a3a5a', tunicS: '#16203a', trim: '#c0c8d8', pants: '#1a2030', pantsS: '#0e121c', boots: '#2a2a30', bootsS: '#16161a',
    belt: '#c0c8d8', arma: 'chifre', alt: 1.35, larg: 1.7, cabeca: 1.05, cabelo: 'coroa', barba: '#e8e8f0', barbaS: '#9a9aa8', manto: '#3a4a6a', mantoS: '#202a40' }
};

// poses (de frente para a direita). Ângulos absolutos, 0 = para baixo, 90 = para a frente.
// pe: [coxa, canela] da perna da frente; pt: perna de trás; bf/bt: [braço, antebraço]; arma: ângulo da arma
const POSE = {
  parado:   { inc: 4, pe: [8, 2], pt: [-8, -4], bf: [18, 50], bt: [-12, 10], arma: 120, cab: 0 },
  guarda:   { inc: 12, pe: [34, 6], pt: [-30, -12], bf: [42, 96], bt: [30, 80], arma: 150, cab: 4 },
  prepara:  { inc: -10, pe: [26, 8], pt: [-26, -16], bf: [170, 200], bt: [150, 190], arma: 240, cab: -6 },
  golpe:    { inc: 28, pe: [58, 4], pt: [-44, -24], bf: [84, 92], bt: [60, 86], arma: 96, cab: 10 },
  segue:    { inc: 22, pe: [52, 4], pt: [-40, -22], bf: [40, 20], bt: [30, 30], arma: 20, cab: 6 },
  defesa:   { inc: -6, pe: [30, 6], pt: [-34, -20], bf: [150, 120], bt: [140, 100], arma: 92, cab: -10 },
  empurrado:{ inc: -18, pe: [40, 20], pt: [-20, -6], bf: [110, 80], bt: [90, 60], arma: 130, cab: -14 },
  joelho:   { inc: 18, pe: [86, 2], pt: [8, -86], bf: [30, 10], bt: [10, 40], arma: 4, cab: 16 },
  levanta:  { inc: 10, pe: [40, 4], pt: [-20, -30], bf: [50, 70], bt: [20, 40], arma: 110, cab: 0 },
  corre1:   { inc: 24, pe: [62, 12], pt: [-40, -78], bf: [-40, 10], bt: [60, 100], arma: -60, cab: 6 },
  corre2:   { inc: 24, pe: [-30, -70], pt: [56, 6], bf: [50, 110], bt: [-30, 0], arma: 60, cab: 6 },
  investida:{ inc: 52, pe: [70, 30], pt: [-60, -90], bf: [-70, -90], bt: [-30, -20], arma: -100, cab: 30 },
  final:    { inc: 26, pe: [64, 2], pt: [-50, -30], bf: [150, 130], bt: [-50, -20], arma: 165, cab: 8 },
  ofegante: { inc: 16, pe: [20, 2], pt: [-16, -6], bf: [14, 24], bt: [-4, 8], arma: 12, cab: 14 },
  // machado
  ergue:    { inc: -14, pe: [26, 6], pt: [-26, -14], bf: [178, 210], bt: [170, 205], arma: 210, cab: -8 },
  desce:    { inc: 30, pe: [48, 6], pt: [-38, -22], bf: [96, 110], bt: [86, 104], arma: 110, cab: 10 },
  ri:       { inc: -10, pe: [14, 4], pt: [-14, -6], bf: [30, 60], bt: [-30, -10], arma: 100, cab: -18 },
  cai:      { inc: -40, pe: [40, 30], pt: [10, 0], bf: [140, 160], bt: [170, 190], arma: 220, cab: -30 },
  // jarl
  jarl:     { inc: 2, pe: [8, 2], pt: [-8, -4], bf: [10, 12], bt: [-8, -4], arma: 90, cab: 0 },
  sopra:    { inc: -6, pe: [8, 2], pt: [-8, -4], bf: [120, 170], bt: [-8, -4], arma: 60, cab: -18 },
  bracos:   { inc: 2, pe: [10, 2], pt: [-10, -4], bf: [40, 120], bt: [30, 115], arma: 0, cab: -4 }
};
function mistura(a, b, k) {
  const o = {};
  for (const n in a) o[n] = Array.isArray(a[n]) ? a[n].map((v, i) => lerp(v, b[n][i], k)) : lerp(a[n], b[n], k);
  return o;
}
// sequência de poses: [[t, 'pose'], ...] -> pose no tempo t (com "em dois")
function poseEm(seq, t) {
  t = doze(t);
  if (t <= seq[0][0]) return Object.assign({}, POSE[seq[0][1]]);
  for (let i = 0; i < seq.length - 1; i++) {
    const [t0, p0] = seq[i], [t1, p1] = seq[i + 1];
    if (t < t1) return mistura(POSE[p0], POSE[p1], ease((t - t0) / (t1 - t0)));
  }
  return Object.assign({}, POSE[seq[seq.length - 1][1]]);
}
function corrida(t, vel = 1) { const k = (doze(t) * 2.4 * vel) % 1; return k < 0.5 ? mistura(POSE.corre1, POSE.corre2, ease(k * 2)) : mistura(POSE.corre2, POSE.corre1, ease((k - 0.5) * 2)); }

// desenha um personagem em pé: pés em (x, y), escala s, f = 1 olhando para a direita, -1 para a esquerda
// ex: { boca, pisca, vento, rot (giro do corpo inteiro), ar (altura no ar), olhos (brilho do jarl) }
function pessoa(C, P, x, y, s, f, ex = {}) {
  const T = ex.t || 0;
  X.save(); X.translate(x, y); if (ex.rot) X.rotate(rad(ex.rot) * f); X.scale(s * f, s);
  LW = 3 / s * (ex.lw || 1);
  const A = C.alt, B = C.larg, L1 = 44 * A, L2 = 44 * A, TR = 56 * A, hr = 25 * C.cabeca;
  const ff = 1;                          // já espelhado pelo scale
  const perna = (p) => { const a = dirA(p[0]), b = dirA(p[1]); return [a, b]; };
  const ext = p => { const [a, b] = perna(p); return a[1] * L1 + b[1] * L2; };
  const hipY = -Math.max(ext(P.pe), ext(P.pt), 10) - (ex.ar || 0) + (P.bob || 0);
  const quadril = [0, hipY];
  const ombro = [quadril[0] + Math.sin(rad(P.inc)) * TR, quadril[1] - Math.cos(rad(P.inc)) * TR];
  const pescoco = [ombro[0] + Math.sin(rad(P.inc)) * 8, ombro[1] - Math.cos(rad(P.inc)) * 8];
  const cab = [pescoco[0] + Math.sin(rad(P.inc + P.cab)) * hr * 0.95, pescoco[1] - Math.cos(rad(P.inc + P.cab)) * hr * 1.0];
  const desl = (o, ang, L) => { const d = dirA(ang); return [o[0] + d[0] * L, o[1] + d[1] * L]; };
  const vento = ex.vento == null ? 1 : ex.vento;
  // manto (jarl / berserker): atrás de tudo
  if (C.manto || C.urso) {
    const c1 = C.manto || C.urso, c2 = C.mantoS || C.ursoS, ond = Math.sin(T * 5) * 5 * vento;
    const pts = [[ombro[0] + 10 * B, ombro[1] - 4], [ombro[0] - 14 * B, ombro[1] - 6], [quadril[0] - 34 * B - ond, -18 + ond * 0.3], [quadril[0] - 14 * B, -6], [quadril[0] + 6, hipY + 30]];
    if (C.urso) for (let i = 0; i < 4; i++) pts.splice(3 + i, 0, [quadril[0] - 30 * B + i * 6 - ond, hipY + 70 + (i % 2) * 10]);
    poly(pts, c2);
  }
  // cachecol esvoaçando (atrás)
  if (C.scarf) {
    const n = 7, pts = [], pts2 = [];
    for (let i = 0; i <= n; i++) {
      const k = i / n, xx = pescoco[0] - 6 - k * 70 * (0.6 + 0.4 * vento), yy = pescoco[1] + 4 + k * 26 * (1.4 - vento) + Math.sin(T * 9 - k * 5) * 9 * k * vento;
      pts.push([xx, yy - 5 * (1 - k * 0.5)]); pts2.unshift([xx, yy + 5 * (1 - k * 0.5)]);
    }
    poly(pts.concat(pts2), C.scarfS);
  }
  // braço de trás
  const cotT = desl(ombro, P.bt[0], 30 * A), maoT = desl(cotT, P.bt[1], 28 * A);
  cadeia([ombro, cotT, maoT], [7 * B, 6 * B, 5 * B], [C.bracosNus ? C.skinS : C.tunicS, C.skinS], [C.bracosNus ? C.skinS : C.tunicS, C.skinS], ff);
  if (C.escudo) { X.beginPath(); X.arc(maoT[0] - 4, maoT[1], 26, 0, Math.PI * 2); X.fillStyle = C.escudo; X.fill(); contorno(); X.beginPath(); X.arc(maoT[0] - 4, maoT[1], 7, 0, Math.PI * 2); X.fillStyle = '#c0c0c8'; X.fill(); contorno(); }
  // perna de trás
  const jT = desl(quadril, P.pt[0], L1), pT = desl(jT, P.pt[1], L2);
  cadeia([quadril, jT, pT], [9 * B, 7.5 * B, 6.5 * B], [C.pantsS, C.bootsS], [C.pantsS, C.bootsS], ff);
  pe(pT, P.pt[1], C.bootsS);
  // tronco (túnica) e saia
  const n = [Math.cos(rad(P.inc)), Math.sin(rad(P.inc))];
  const tor = [
    [ombro[0] + n[0] * 15 * B, ombro[1] + n[1] * 15 * B], [quadril[0] + n[0] * 13 * B, quadril[1] + n[1] * 13 * B],
    [quadril[0] + n[0] * 17 * B + 4, quadril[1] + (C.saia ? 40 : 20)], [quadril[0] - n[0] * 19 * B - 6, quadril[1] + (C.saia ? 42 : 22)],
    [quadril[0] - n[0] * 14 * B, quadril[1] - n[1] * 14 * B], [ombro[0] - n[0] * 15 * B, ombro[1] - n[1] * 15 * B]];
  poly(tor, C.tunic);
  X.save(); poly(tor, null, false); X.clip();
  poly([tor[4], tor[5], [ombro[0] - 2, ombro[1]], [quadril[0] - 3, quadril[1] + 40]], C.tunicS, false);
  // barra dourada e cinto
  X.strokeStyle = C.trim; X.lineWidth = 4; X.beginPath(); X.moveTo(tor[3][0], tor[3][1] - 3); X.lineTo(tor[2][0], tor[2][1] - 3); X.stroke();
  X.restore(); poly(tor, null);
  membro([quadril[0] - n[0] * 15 * B, quadril[1] - 6], [quadril[0] + n[0] * 15 * B, quadril[1] - 6], 4, 4, C.belt, C.belt, ff);
  // perna da frente
  const jF = desl(quadril, P.pe[0], L1), pF = desl(jF, P.pe[1], L2);
  cadeia([quadril, jF, pF], [9.5 * B, 8 * B, 7 * B], [C.pants, C.boots], [C.pantsS, C.bootsS], ff);
  pe(pF, P.pe[1], C.boots);
  // pescoço e cabeça
  membro(ombro, pescoco, 6, 6, C.skin, C.skinS, ff);
  cabeca(C, cab, hr, P.inc + P.cab, ex);
  if (C.scarf) { X.beginPath(); X.ellipse(pescoco[0], pescoco[1] + 3, 13, 8, rad(P.inc), 0, Math.PI * 2); X.fillStyle = C.scarf; X.fill(); contorno(); }
  // braço da frente e a arma
  const cotF = desl(ombro, P.bf[0], 30 * A), maoF = desl(cotF, P.bf[1], 28 * A);
  if (C.arma && !ex.semArma) arma(C, maoF, P.arma, ex);
  cadeia([ombro, cotF, maoF], [7.5 * B, 6.5 * B, 5.5 * B], [C.bracosNus ? C.skin : C.tunic, C.skin], [C.bracosNus ? C.skinS : C.tunicS, C.skinS], ff);
  if (C.urso) { const pts = []; for (let i = 0; i < 14; i++) { const a = i / 14 * Math.PI * 2, rr = (i % 2 ? 15 : 21) * B * 0.8; pts.push([ombro[0] + Math.cos(a) * rr, ombro[1] + 2 + Math.sin(a) * rr * 0.8]); } poly(pts, C.urso); }
  X.beginPath(); X.arc(maoF[0], maoF[1], 7 * Math.max(1, B * 0.8), 0, Math.PI * 2); X.fillStyle = C.skin; X.fill(); contorno();
  if (ex.runa) { X.save(); X.globalCompositeOperation = 'lighter'; const g = X.createRadialGradient(maoF[0], maoF[1], 0, maoF[0], maoF[1], 40); g.addColorStop(0, `rgba(160,230,255,${ex.runa})`); g.addColorStop(1, 'rgba(60,140,255,0)'); X.fillStyle = g; X.fillRect(maoF[0] - 40, maoF[1] - 40, 80, 80); X.restore(); }
  X.restore();
  return { ombro, quadril, mao: maoF, cab };
}
function pe(p, ang, cor) {
  X.beginPath(); X.ellipse(p[0] + 7, p[1] - 3, 12, 6, 0, 0, Math.PI * 2); X.fillStyle = cor; X.fill(); contorno();
}
function arma(C, m, ang, ex) {
  const d = dirA(ang);
  X.save(); X.translate(m[0], m[1]); X.rotate(-rad(ang) + Math.PI);
  // eixo local: y negativo = direção da arma
  if (C.arma === 'espada') {
    const brilho = ex.brilhoArma || 0;
    if (brilho) { X.save(); X.shadowColor = '#7fd8ff'; X.shadowBlur = 30 * brilho; X.fillStyle = '#bff0ff'; X.fillRect(-6, -98, 12, 86); X.restore(); }
    poly([[-5, -14], [5, -14], [5, -88], [0, -100], [-5, -88]], '#e8eef8');
    poly([[0, -14], [5, -14], [5, -88], [0, -100]], '#9ab0c8', false);
    X.strokeStyle = '#ffffff'; X.lineWidth = 2; X.beginPath(); X.moveTo(-2, -20); X.lineTo(-2, -84); X.stroke();
    poly([[-16, -10], [16, -10], [16, -16], [-16, -16]], '#d8a840');
    poly([[-3, -10], [3, -10], [3, 12], [-3, 12]], '#6a3a1a');
    X.beginPath(); X.arc(0, 14, 5, 0, Math.PI * 2); X.fillStyle = '#d8a840'; X.fill(); contorno();
  } else if (C.arma === 'machado') {
    poly([[-4, 26], [4, 26], [4, -96], [-4, -96]], '#7a5030');
    X.beginPath(); X.moveTo(3, -96); X.quadraticCurveTo(44, -112, 46, -70); X.quadraticCurveTo(40, -40, 3, -58); X.closePath();
    X.fillStyle = '#c8ccd4'; X.fill(); contorno();
    X.strokeStyle = '#fff'; X.lineWidth = 3; X.beginPath(); X.moveTo(40, -100); X.quadraticCurveTo(46, -76, 38, -50); X.stroke();
    if (C === ELENCO.berserker) { X.beginPath(); X.moveTo(-3, -94); X.quadraticCurveTo(-34, -104, -36, -72); X.quadraticCurveTo(-30, -50, -3, -62); X.closePath(); X.fillStyle = '#a8acb4'; X.fill(); contorno(); }
  } else if (C.arma === 'martelo') {
    poly([[-3, 10], [3, 10], [3, -60], [-3, -60]], '#6a4020');
    poly([[-16, -58], [16, -58], [16, -80], [-16, -80]], '#8a8a94');
  } else if (C.arma === 'chifre') {
    X.beginPath(); X.moveTo(-6, 0); X.quadraticCurveTo(-30, -30, -10, -60); X.lineTo(4, -56); X.quadraticCurveTo(-12, -30, 8, 0); X.closePath();
    X.fillStyle = '#e8dcc0'; X.fill(); contorno();
    for (let i = 1; i < 4; i++) { X.strokeStyle = '#c0a060'; X.lineWidth = 3; X.beginPath(); X.moveTo(-14 + i * 2, -i * 14); X.lineTo(4 - i, -i * 14 + 3); X.stroke(); }
  }
  X.restore();
}
// cabeça de perfil 3/4 (olhando para a direita)
function cabeca(C, c, r, inc, ex) {
  const T = ex.t || 0, vento = ex.vento == null ? 1 : ex.vento;
  X.save(); X.translate(c[0], c[1]); X.rotate(rad(inc) * 0.6);
  const P = (x, y) => [x * r, y * r];
  // cabelo de trás (esvoaça)
  if (C.cabelo === 'espetado' || C.cabelo === 'tranca' || C.cabelo === 'curto' || C.cabelo === 'coroa') {
    const pts = [P(0.5, -0.9)], n = C.cabelo === 'curto' ? 3 : 5;
    for (let i = 0; i < n; i++) {
      const a = rad(-60 - i * 34), comp = (C.cabelo === 'espetado' ? 1.75 : C.cabelo === 'coroa' ? 1.9 : 1.4) + (i % 2) * 0.25;
      const w = Math.sin(T * 8 + i) * 0.12 * vento;
      pts.push(P(Math.cos(a) * comp - 0.25 * vento + w, Math.sin(a) * comp * 0.8 + w * 0.5 + (C.cabelo === 'coroa' ? 0.5 : 0)));
      pts.push(P(Math.cos(a - rad(17)) * 0.85, Math.sin(a - rad(17)) * 0.85));
    }
    pts.push(P(-0.3, 0.75));
    poly(pts, C.hair);
    if (C.cabelo === 'tranca') { for (let i = 0; i < 4; i++) { X.beginPath(); X.ellipse(-0.7 * r - i * 2, (0.6 + i * 0.32) * r, 0.2 * r, 0.17 * r, 0, 0, 7); X.fillStyle = C.hair; X.fill(); contorno(); } }
  }
  // rosto
  const rosto = [P(0, -1), P(0.72, -0.72), P(0.88, -0.15), P(1.02, 0.18), P(0.86, 0.34), P(0.84, 0.5), P(0.56, 0.92), P(0.1, 0.84), P(-0.5, 0.62), P(-0.92, 0.06), P(-0.7, -0.72)];
  curva(rosto, C.skin);
  X.save(); curva(rosto, null, false); X.clip();
  X.fillStyle = C.skinS; X.beginPath(); X.ellipse(-0.75 * r, 0.25 * r, 0.6 * r, 0.9 * r, 0, 0, 7); X.fill(); X.restore();
  curva(rosto, null);
  // orelha
  X.beginPath(); X.ellipse(-0.18 * r, 0.12 * r, 0.16 * r, 0.24 * r, 0, 0, 7); X.fillStyle = C.skin; X.fill(); contorno();
  // olho grande de anime
  const pis = ex.pisca ? 1 : 0;
  olhoLado(C, 0.46 * r, 0.06 * r, r, pis, ex);
  // sobrancelha
  X.strokeStyle = C.hairS; X.lineWidth = 0.09 * r; X.beginPath();
  const brava = ex.brava ? 0.12 : 0; X.moveTo(0.26 * r, (-0.32 + brava * 0.3) * r); X.lineTo(0.72 * r, (-0.3 - brava) * r + brava * 0.5 * r); X.stroke();
  // boca
  const b = ex.boca || 0;
  if (b > 0.05) { X.beginPath(); X.ellipse(0.7 * r, 0.56 * r, 0.1 * r, 0.06 * r + b * 0.1 * r, 0, 0, 7); X.fillStyle = '#5a1a1a'; X.fill(); contorno(); }
  else { X.strokeStyle = '#5a2a20'; X.lineWidth = 0.05 * r; X.beginPath(); X.moveTo(0.58 * r, 0.56 * r); X.lineTo(0.78 * r, 0.54 * r); X.stroke(); }
  // barba
  if (C.barba) {
    const ond = Math.sin(T * 6) * 0.05 * vento;
    const pts = [P(0.95, 0.3), P(0.9, 0.9), P(0.6 + ond, 1.6), P(0.25 + ond, 1.35), P(-0.05, 1.55 + ond), P(-0.3, 0.9), P(-0.25, 0.35), P(0.2, 0.62), P(0.6, 0.66)];
    if (b > 0.05) pts.splice(8, 1, P(0.62, 0.66 + b * 0.2));
    poly(pts, C.barba); poly([P(-0.3, 0.9), P(-0.05, 1.55 + ond), P(0.1, 1.0), P(-0.25, 0.35)], C.barbaS, false);
    if (C === ELENCO.berserker) for (const k of [0, 1]) { X.beginPath(); X.ellipse((0.2 + k * 0.38) * r, (1.6 + ond) * r, 0.1 * r, 0.16 * r, 0, 0, 7); X.fillStyle = '#c8a050'; X.fill(); contorno(); }
  }
  // pintura de guerra
  if (C.pintura) { X.save(); curva(rosto, null, false); X.clip(); X.fillStyle = 'rgba(40,90,200,0.75)'; X.fillRect(0.0 * r, -0.12 * r, 1.1 * r, 0.24 * r); X.restore(); olhoLado(C, 0.46 * r, 0.06 * r, r, pis, ex); }
  // cabelo da frente
  if (C.cabelo === 'espetado' || C.cabelo === 'curto' || C.cabelo === 'tranca') {
    const w = Math.sin(T * 9) * 0.06 * vento;
    const fr = [P(-0.7, -0.75), P(0.1, -1.18), P(0.75, -0.85), P(1.05 + w, -0.25), P(0.66, -0.52), P(0.72 + w, -0.05), P(0.38, -0.45), P(0.26, -0.02), P(0.06, -0.4), P(-0.25, -0.1), P(-0.42, -0.5)];
    poly(fr, C.hair);
    X.strokeStyle = C.hairH; X.lineWidth = 0.07 * r; X.beginPath(); X.moveTo(-0.3 * r, -0.85 * r); X.quadraticCurveTo(0.2 * r, -1.05 * r, 0.55 * r, -0.8 * r); X.stroke();
  } else if (C.cabelo === 'careca') {
    X.beginPath(); X.arc(0, -0.15 * r, 1.0 * r, Math.PI * 1.05, Math.PI * 1.95); X.closePath(); X.fillStyle = '#8a8a94'; X.fill(); contorno();
    poly([P(-1.02, -0.25), P(1.02, -0.25), P(1.02, -0.1), P(-1.02, -0.1)], '#6a6a74');
  } else if (C.cabelo === 'elmo') {
    X.beginPath(); X.arc(0, -0.1 * r, 1.04 * r, Math.PI * 1.0, Math.PI * 2.0); X.closePath(); X.fillStyle = '#9aa0aa'; X.fill(); contorno();
    poly([P(0.6, -0.15), P(0.72, -0.15), P(0.74, 0.4), P(0.62, 0.4)], '#9aa0aa');
    poly([P(-1.05, -0.15), P(1.05, -0.15), P(1.05, 0.0), P(-1.05, 0.0)], '#7a808a');
  } else if (C.cabelo === 'urso') {
    // cabeça de urso como capuz
    const pts = [P(-1.3, 0.4), P(-1.25, -0.6), P(-0.7, -1.3), P(0.2, -1.45), P(0.95, -1.15), P(1.45, -0.7), P(1.55, -0.35), P(1.1, -0.25), P(0.6, -0.5), P(-0.2, -0.45), P(-0.8, 0.2)];
    poly(pts, C.urso);
    X.beginPath(); X.arc(-0.45 * r, -1.25 * r, 0.25 * r, 0, 7); X.fillStyle = C.urso; X.fill(); contorno();
    X.beginPath(); X.ellipse(1.42 * r, -0.55 * r, 0.12 * r, 0.1 * r, 0, 0, 7); X.fillStyle = '#1a1010'; X.fill();
    for (const k of [0, 1, 2]) poly([P(0.75 + k * 0.22, -0.3), P(0.85 + k * 0.22, -0.3), P(0.8 + k * 0.22, -0.08)], '#f0eee0');
    X.beginPath(); X.arc(0.85 * r, -0.82 * r, 0.08 * r, 0, 7); X.fillStyle = '#ffcc40'; X.fill();
  } else if (C.cabelo === 'coroa') {
    poly([P(-0.95, -0.55), P(0.95, -0.55), P(1.0, -0.85), P(0.7, -0.75), P(0.55, -1.25), P(0.3, -0.8), P(0, -1.4), P(-0.3, -0.8), P(-0.55, -1.25), P(-0.7, -0.75), P(-1.0, -0.85)], '#c0c8d8');
  }
  X.restore();
}
function olhoLado(C, x, y, r, pisca, ex) {
  if (pisca) { X.strokeStyle = '#1a1014'; X.lineWidth = 0.08 * r; X.beginPath(); X.moveTo(x - 0.2 * r, y + 0.04 * r); X.quadraticCurveTo(x, y + 0.14 * r, x + 0.2 * r, y); X.stroke(); return; }
  const w = 0.22 * r, h = (C === ELENCO.berserker || C === ELENCO.jarl ? 0.18 : 0.32) * r;
  X.beginPath(); X.ellipse(x, y, w, h, 0, 0, 7); X.fillStyle = '#fff'; X.fill();
  const g = X.createLinearGradient(0, y - h, 0, y + h); g.addColorStop(0, C.eyeD); g.addColorStop(1, C.eye);
  X.beginPath(); X.ellipse(x + 0.06 * r, y + 0.02 * r, w * 0.72, h * 0.86, 0, 0, 7); X.fillStyle = g; X.fill();
  X.beginPath(); X.ellipse(x + 0.08 * r, y + 0.03 * r, w * 0.32, h * 0.42, 0, 0, 7); X.fillStyle = '#0a0a14'; X.fill();
  X.beginPath(); X.ellipse(x + 0.12 * r, y - 0.1 * r, w * 0.24, h * 0.2, 0, 0, 7); X.fillStyle = '#fff'; X.fill();
  if (ex.olhos) { X.save(); X.globalCompositeOperation = 'lighter'; const gg = X.createRadialGradient(x, y, 0, x, y, r * 1.2); gg.addColorStop(0, `rgba(120,220,255,${ex.olhos})`); gg.addColorStop(1, 'rgba(0,80,255,0)'); X.fillStyle = gg; X.fillRect(x - r * 1.2, y - r * 1.2, r * 2.4, r * 2.4); X.restore(); }
  // cílio de cima grosso
  X.strokeStyle = '#1a1014'; X.lineWidth = 0.1 * r; X.beginPath(); X.ellipse(x, y, w * 1.05, h * 1.02, 0, Math.PI * 1.1, Math.PI * 1.95); X.stroke();
  X.lineWidth = 0.04 * r; X.beginPath(); X.ellipse(x, y, w, h, 0, 0, 7); X.stroke();
}

// personagem visto de costas (cena final)
function costas(C, x, y, s, t, ex = {}) {
  X.save(); X.translate(x, y); X.scale(s, s); LW = 3 / s;
  const A = C.alt, B = C.larg, vento = 1;
  const resp = Math.sin(t * 2) * 1.5;
  // cachecol
  if (C.scarf) {
    const pts = [], pts2 = [];
    for (let i = 0; i <= 8; i++) { const k = i / 8, xx = 8 + k * 120, yy = -168 * A + k * 30 + Math.sin(t * 7 - k * 5) * 12 * k; pts.push([xx, yy - 7]); pts2.unshift([xx, yy + 7]); }
    poly(pts.concat(pts2), C.scarf);
  }
  // pernas
  for (const sx of [-1, 1]) cadeia([[sx * 11 * B, -88 * A], [sx * 13 * B, -44 * A], [sx * 14 * B, -4]], [10 * B, 8 * B, 7.5 * B], [C.pants, C.boots], [C.pantsS, C.bootsS], 1);
  // tronco
  const tor = [[-24 * B, -150 * A + resp], [24 * B, -150 * A + resp], [22 * B, -88 * A], [26 * B, -68 * A], [-26 * B, -68 * A], [-22 * B, -88 * A]];
  poly(tor, C.tunic); poly([[0, -150 * A + resp], [24 * B, -150 * A + resp], [22 * B, -88 * A], [26 * B, -68 * A], [0, -68 * A]], C.tunicS, false); poly(tor, null);
  membro([-22 * B, -92 * A], [22 * B, -92 * A], 4, 4, C.belt, C.belt, 1);
  // espada nas costas
  if (C.arma === 'espada') { X.save(); X.translate(0, -120 * A); X.rotate(rad(35)); poly([[-4, -60], [4, -60], [4, 40], [-4, 40]], '#6a3a1a'); poly([[-14, -60], [14, -60], [14, -54], [-14, -54]], '#d8a840'); X.restore(); }
  // braços
  for (const sx of [-1, 1]) cadeia([[sx * 24 * B, -146 * A + resp], [sx * 30 * B, -112 * A], [sx * 31 * B, -84 * A]], [7.5 * B, 6.5 * B, 6 * B], [C.tunic, C.skin], [C.tunicS, C.skinS], 1);
  // cabeça (cabelo)
  const r = 25 * C.cabeca, cy = -150 * A - r * 0.95 + resp;
  if (C.cabelo === 'careca') { X.beginPath(); X.arc(0, cy, r, 0, 7); X.fillStyle = C.skin; X.fill(); contorno(); X.beginPath(); X.arc(0, cy - 2, r * 1.02, Math.PI, 0); X.closePath(); X.fillStyle = '#8a8a94'; X.fill(); contorno(); }
  else {
    X.beginPath(); X.arc(0, cy, r * 1.05, 0, 7); X.fillStyle = C.hair; X.fill(); contorno();
    const esp = [[-150, 1.75], [-125, 1.95], [-100, 2.0], [-75, 1.9], [-50, 1.8], [-25, 1.6], [180, 1.55], [5, 1.5], [150, 1.4], [30, 1.3]];
    esp.forEach(([g, L], i) => { const a = rad(g), w = Math.sin(t * 7 + i) * 0.08, b1 = [Math.cos(a - 0.35) * r * 0.9, cy + Math.sin(a - 0.35) * r * 0.9], b2 = [Math.cos(a + 0.35) * r * 0.9, cy + Math.sin(a + 0.35) * r * 0.9];
      mecha(b1, b2, [Math.cos(a + w) * r * L + 8, cy + Math.sin(a + w) * r * L], [0, 0], i % 3 === 1 ? C.hairS : C.hair); });
    X.strokeStyle = C.hairH; X.lineWidth = 3; X.beginPath(); X.arc(0, cy, r * 0.7, rad(200), rad(250)); X.stroke();
  }
  if (C.scarf) { X.beginPath(); X.ellipse(0, -150 * A + 2, 20, 10, 0, 0, 7); X.fillStyle = C.scarf; X.fill(); contorno(); }
  X.restore();
}

// ---------- rosto de frente (closes) ----------
function rosto(C, x, y, r, t, ex = {}) {
  LW = Math.max(3, r * 0.025);
  X.save(); X.translate(x, y);
  const P = (a, b) => [a * r, b * r], vento = ex.vento == null ? 1 : ex.vento;
  // ombros e roupa
  poly([P(-2.2, 3), P(-1.9, 1.75), P(-0.9, 1.45), P(0.9, 1.45), P(1.9, 1.75), P(2.2, 3)], C.tunic);
  poly([P(0.2, 1.45), P(0.9, 1.45), P(1.9, 1.75), P(2.2, 3), P(0.6, 3)], C.tunicS, false);
  if (C.urso) { poly([P(-2.3, 3), P(-2.3, 1.2), P(-1.4, 0.4), P(-0.6, 1.4), P(0.6, 1.4), P(1.4, 0.4), P(2.3, 1.2), P(2.3, 3)], C.urso); }
  // pescoço
  poly([P(-0.38, 0.6), P(0.38, 0.6), P(0.42, 1.55), P(-0.42, 1.55)], C.skinS);
  if (C.scarf) {
    const o = Math.sin(t * 6) * 0.1 * vento;
    poly([P(-0.9, 1.3), P(0.9, 1.3), P(1.0, 1.75), P(0.3, 1.9), P(-1.0, 1.75)], C.scarf);
    poly([P(0.5, 1.6), P(1.5 + o, 2.3), P(2.4 + o * 2, 2.1 + o), P(1.2, 1.5)], C.scarfS);
  }
  // cabelo de trás
  if (C.hair && C.cabelo !== 'urso' && C.cabelo !== 'careca') {
    const pts = [];
    for (let i = 0; i <= 10; i++) {
      const a = rad(150 + i * 24), comp = 1.2 + (i % 2 ? 0.3 + R(i * 3.7) * 0.4 : 0) + (C.cabelo === 'espetado' ? 0.15 : 0), w = Math.sin(t * 7 + i * 1.3) * 0.1 * vento;
      pts.push(P(Math.cos(a) * comp + w - 0.12 * vento, Math.sin(a) * comp * 0.95 - 0.05));
    }
    pts.push(P(1.2, 0.9)); pts.push(P(-1.2, 0.9));
    poly(pts, C.hairS);
  }
  // orelhas
  for (const s of [-1, 1]) { X.beginPath(); X.ellipse(s * 0.9 * r, 0.2 * r, 0.16 * r, 0.26 * r, 0, 0, 7); X.fillStyle = C.skin; X.fill(); contorno(); }
  // rosto
  const face = [P(0, -1.05), P(0.82, -0.82), P(0.95, -0.1), P(0.86, 0.42), P(0.5, 0.86), P(0, 1.08), P(-0.5, 0.86), P(-0.86, 0.42), P(-0.95, -0.1), P(-0.82, -0.82)];
  curva(face, C.skin);
  X.save(); curva(face, null, false); X.clip();
  X.fillStyle = C.skinS; X.beginPath(); X.moveTo(0.35 * r, -1.2 * r); X.quadraticCurveTo(0.2 * r, 0.5 * r, 0.05 * r, 1.2 * r); X.lineTo(1.2 * r, 1.2 * r); X.lineTo(1.2 * r, -1.2 * r); X.closePath(); X.globalAlpha = 0.55; X.fill();
  X.globalAlpha = 1; X.fillStyle = C.skinS; X.fillRect(-r, -0.55 * r, 2 * r, 0.12 * r * (ex.sombraOlhos || 0) * 6);
  if (ex.corado) { X.fillStyle = 'rgba(240,110,110,0.35)'; for (const s of [-1, 1]) { X.beginPath(); X.ellipse(s * 0.5 * r, 0.42 * r, 0.18 * r, 0.08 * r, 0, 0, 7); X.fill(); } }
  if (C.pintura) { X.fillStyle = 'rgba(40,90,200,0.8)'; X.fillRect(-r, -0.12 * r, 2 * r, 0.32 * r); }
  X.restore(); curva(face, null);
  // olhos
  for (const s of [-1, 1]) olhoFrente(C, s * 0.4 * r, 0.12 * r, r, s, t, ex);
  // sobrancelhas
  const brava = ex.brava || 0;
  X.strokeStyle = C.hairS; X.lineWidth = 0.08 * r; X.lineCap = 'round';
  for (const s of [-1, 1]) { X.beginPath(); X.moveTo(s * 0.18 * r, (-0.28 + brava * 0.12) * r); X.quadraticCurveTo(s * 0.4 * r, (-0.4 - brava * 0.02) * r, s * 0.66 * r, (-0.34 - brava * 0.1) * r); X.stroke(); }
  // nariz
  X.strokeStyle = C.skinS; X.lineWidth = 0.04 * r; X.beginPath(); X.moveTo(0.04 * r, 0.36 * r); X.lineTo(-0.03 * r, 0.48 * r); X.lineTo(0.05 * r, 0.5 * r); X.stroke();
  // boca
  const b = ex.boca || 0, sorriso = ex.sorriso || 0;
  if (ex.ruge) {
    X.beginPath(); X.ellipse(0, 0.72 * r, 0.36 * r, 0.26 * r * ex.ruge + 0.04 * r, 0, 0, 7); X.fillStyle = '#4a0e0e'; X.fill(); contorno();
    X.fillStyle = '#f8f4e8'; for (let i = -3; i <= 3; i++) poly([P(i * 0.09 - 0.04, 0.72 - 0.24 * ex.ruge), P(i * 0.09 + 0.04, 0.72 - 0.24 * ex.ruge), P(i * 0.09, 0.72 - 0.12 * ex.ruge)], '#f8f4e8', false);
  } else if (b > 0.05) { X.beginPath(); X.ellipse(0, 0.7 * r, 0.13 * r, (0.03 + b * 0.09) * r, 0, 0, 7); X.fillStyle = '#7a2a2a'; X.fill(); contorno(); X.beginPath(); X.ellipse(0, (0.72 + b * 0.04) * r, 0.07 * r, 0.03 * r * b, 0, 0, 7); X.fillStyle = '#e07070'; X.fill(); }
  else { X.strokeStyle = '#6a2a20'; X.lineWidth = 0.04 * r; X.beginPath(); X.moveTo(-0.13 * r, 0.7 * r); X.quadraticCurveTo(0, (0.7 + sorriso * 0.08) * r, 0.13 * r, (0.68 - sorriso * 0.04) * r); X.stroke(); }
  // barba
  if (C.barba) {
    const pts = [P(-0.9, 0.1), P(-0.7, 0.75), P(-0.45, 1.6), P(-0.15, 1.35), P(0, 1.9), P(0.15, 1.35), P(0.45, 1.6), P(0.7, 0.75), P(0.9, 0.1), P(0.55, 0.5), P(0.32, 0.55), P(0.25, 0.95), P(-0.25, 0.95), P(-0.32, 0.55), P(-0.55, 0.5)];
    if (ex.ruge) { pts.splice(11, 2, P(0.38, 0.72 + 0.3 * ex.ruge), P(-0.38, 0.72 + 0.3 * ex.ruge)); }
    poly(pts, C.barba);
    poly([P(0.15, 1.35), P(0.45, 1.6), P(0.7, 0.75), P(0.9, 0.1), P(0.55, 0.5), P(0.32, 0.55), P(0.25, 0.95)], C.barbaS, false);
    if (C.urso) for (const s of [-1, 1]) { X.beginPath(); X.ellipse(s * 0.3 * r, 1.7 * r, 0.08 * r, 0.14 * r, 0, 0, 7); X.fillStyle = '#c8a050'; X.fill(); contorno(); }
  }
  // cabelo da frente (franja)
  if (C.cabelo === 'espetado') {
    const w = k => Math.sin(t * 7 + k * 1.7) * 0.05 * vento;
    X.beginPath(); X.ellipse(0, -0.42 * r, 1.0 * r, 0.7 * r, 0, Math.PI * 0.98, Math.PI * 2.02); X.closePath(); X.fillStyle = C.hair; X.fill(); contorno();
    const topo = [[-0.85, -0.7, -1.5, -1.2], [-0.42, -1.0, -0.75, -1.75], [0.12, -1.08, 0.2, -1.85], [0.58, -0.95, 1.05, -1.6], [0.92, -0.6, 1.55, -0.92]];
    topo.forEach(([bx, by, tx, ty], i) => mecha(P(bx - 0.3, by + 0.14), P(bx + 0.3, by + 0.14), P(tx + w(i) - 0.08 * vento, ty + w(i + 3)), [(0.12 - i * 0.05) * r, 0.1 * r], C.hair));
    for (const s of [-1, 1]) mecha(P(s * 1.0, -0.55), P(s * 0.68, -0.62), P(s * 1.0 + w(s + 2), 0.6), [s * 0.14 * r, 0], C.hair);
    X.save(); X.translate(0.03 * r, 0.1 * r); X.globalAlpha = 0.8;
    [[-0.86, -0.18], [-0.6, 0.06], [-0.32, -0.1], [-0.06, 0.14], [0.22, -0.06], [0.5, 0.1], [0.78, -0.16]].forEach(([tx, ty], i) => { const bx = tx * 0.75; LW = 0.01; mecha(P(bx - 0.3, -0.84), P(bx + 0.28, -0.9), P(tx + 0.05, ty), [0, 0], C.skinS); });
    X.restore(); LW = Math.max(3, r * 0.025);
    const fr = [[-0.86, -0.18], [-0.6, 0.06], [-0.32, -0.1], [-0.06, 0.14], [0.22, -0.06], [0.5, 0.1], [0.78, -0.16]];
    fr.forEach(([tx, ty], i) => { const bx = tx * 0.75; mecha(P(bx - 0.3, -0.84), P(bx + 0.28, -0.9), P(tx + w(i) + 0.05, ty + w(i + 1)), [(i % 2 ? 0.05 : -0.05) * r, 0], C.hair); });
    X.save(); X.strokeStyle = C.hairH; X.lineWidth = 0.07 * r; X.lineCap = 'round';
    for (let i = 0; i < 5; i++) { const x0 = (-0.66 + i * 0.3) * r; X.beginPath(); X.moveTo(x0, -0.78 * r); X.lineTo(x0 + 0.08 * r, -0.56 * r); X.stroke(); }
    X.restore();
  } else if (C.cabelo === 'urso') {
    poly([P(-1.35, 0.3), P(-1.3, -0.7), P(-0.8, -1.35), P(0, -1.5), P(0.8, -1.35), P(1.3, -0.7), P(1.35, 0.3), P(1.0, -0.2), P(0.6, -0.5), P(0, -0.55), P(-0.6, -0.5), P(-1.0, -0.2)], C.urso);
    for (const s of [-1, 1]) { X.beginPath(); X.arc(s * 0.85 * r, -1.35 * r, 0.25 * r, 0, 7); X.fillStyle = C.urso; X.fill(); contorno(); }
    for (let i = -2; i <= 2; i++) poly([P(i * 0.2 - 0.07, -0.53), P(i * 0.2 + 0.07, -0.53), P(i * 0.2, -0.3)], '#f0eee0');
    for (const s of [-1, 1]) { X.beginPath(); X.arc(s * 0.32 * r, -0.95 * r, 0.07 * r, 0, 7); X.fillStyle = '#ffcc40'; X.fill(); }
  }
  X.restore();
}
function olhoFrente(C, x, y, r, s, t, ex) {
  const fecha = ex.pisca ? 1 : (ex.fecha || 0);
  const w = 0.24 * r, h = (C.urso ? 0.17 : 0.3) * r;
  if (fecha > 0.9) { X.strokeStyle = '#1a1014'; X.lineWidth = 0.07 * r; X.beginPath(); X.moveTo(x - w, y); X.quadraticCurveTo(x, y + 0.08 * r, x + w, y); X.stroke(); return; }
  X.save(); X.beginPath(); X.ellipse(x, y, w, h * (1 - fecha * 0.6), 0, 0, 7); X.fillStyle = '#fff'; X.fill(); X.clip();
  const pp = ex.pupila == null ? 1 : ex.pupila, tre = ex.treme ? (R(Math.floor(t * 24)) - 0.5) * 0.03 * r : 0;
  const ix = x + s * -0.02 * r + tre, g = X.createLinearGradient(0, y - h, 0, y + h); g.addColorStop(0, C.eyeD); g.addColorStop(0.7, C.eye); g.addColorStop(1, '#bfe4ff');
  X.beginPath(); X.ellipse(ix, y + 0.02 * r, w * 0.7 * (0.75 + pp * 0.25), h * 0.92 * (0.75 + pp * 0.25), 0, 0, 7); X.fillStyle = g; X.fill();
  X.beginPath(); X.ellipse(ix, y + 0.04 * r, w * 0.3 * pp, h * 0.38 * pp, 0, 0, 7); X.fillStyle = '#060810'; X.fill();
  if (pp > 0.5) { X.beginPath(); X.ellipse(ix - 0.08 * r, y - 0.1 * r, w * 0.26, h * 0.2, 0, 0, 7); X.fillStyle = '#fff'; X.fill(); X.beginPath(); X.arc(ix + 0.08 * r, y + 0.12 * r, 0.03 * r, 0, 7); X.fill(); }
  if (ex.brilho) { X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(120,220,255,${ex.brilho})`; X.fillRect(x - w, y - h, w * 2, h * 2); }
  X.restore();
  X.strokeStyle = '#1a1014'; X.lineWidth = 0.08 * r; X.beginPath(); X.ellipse(x, y, w * 1.06, h * (1 - fecha * 0.6) * 1.04, 0, Math.PI * 1.05, Math.PI * 1.95); X.stroke();
  X.lineWidth = 0.025 * r; X.beginPath(); X.ellipse(x, y, w, h * (1 - fecha * 0.6), 0, 0.15, Math.PI - 0.15); X.stroke();
  // cílio na ponta de fora
  X.lineWidth = 0.05 * r; X.beginPath(); X.moveTo(x + s * w, y - h * 0.4); X.lineTo(x + s * (w + 0.08 * r), y - h * 0.7); X.stroke();
}

// mão em close com a runa
function maoRuna(x, y, r, t, luz) {
  const C = ELENCO.aren; LW = 5;
  X.save(); X.translate(x, y);
  membro([0.1 * r, 3.3 * r], [0, 1.0 * r], 0.55 * r, 0.5 * r, C.skin, C.skinS, 1);
  poly([[-0.85 * r, 2.3 * r], [0.9 * r, 2.2 * r], [1.0 * r, 3.4 * r], [-0.95 * r, 3.4 * r]], C.tunic);
  X.strokeStyle = C.trim; X.lineWidth = 10; X.beginPath(); X.moveTo(-0.85 * r, 2.33 * r); X.lineTo(0.9 * r, 2.23 * r); X.stroke();
  const fecha = cl(0.25 + Math.sin(t * 1.3) * 0.2);
  [[-0.5, 0.92], [-0.17, 1.06], [0.17, 1.0], [0.48, 0.8]].forEach(([dx, L], i) => {
    const b = [dx * r, -0.42 * r], a = rad(-8 + i * 6), L1 = L * 0.55 * r, L2 = L * 0.5 * r;
    const j = [b[0] + Math.sin(a) * L1, b[1] - Math.cos(a) * L1], a2 = a - fecha * 0.5, p = [j[0] + Math.sin(a2) * L2, j[1] - Math.cos(a2) * L2];
    cadeia([b, j, p], [0.16 * r, 0.145 * r, 0.125 * r], C.skin, C.skinS, 1);
    X.beginPath(); X.ellipse(p[0], p[1] - 0.03 * r, 0.07 * r, 0.06 * r, 0, 0, 7); X.fillStyle = '#fbe6d8'; X.fill();
  });
  curva([[-0.74 * r, -0.52 * r], [0.72 * r, -0.54 * r], [0.8 * r, 0.4 * r], [0.52 * r, 1.08 * r], [-0.5 * r, 1.12 * r], [-0.82 * r, 0.4 * r]], C.skin);
  cadeia([[-0.62 * r, 0.6 * r], [-1.02 * r, 0.08 * r], [-1.12 * r, -0.32 * r]], [0.21 * r, 0.18 * r, 0.15 * r], C.skin, C.skinS, 1);
  X.strokeStyle = C.skinS; X.lineWidth = 4; X.beginPath(); X.moveTo(-0.62 * r, 0.05 * r); X.quadraticCurveTo(0, -0.05 * r, 0.62 * r, -0.16 * r); X.moveTo(-0.55 * r, 0.62 * r); X.quadraticCurveTo(-0.2 * r, 0.2 * r, 0.1 * r, -0.05 * r); X.stroke();
  // a runa (Algiz, "proteção") acesa na palma
  X.save(); X.globalCompositeOperation = 'lighter'; X.shadowColor = '#5ad0ff'; X.shadowBlur = 40 * luz;
  const g = X.createRadialGradient(0, 0.3 * r, 0, 0, 0.3 * r, 1.2 * r); g.addColorStop(0, `rgba(80,190,255,${0.5 * luz})`); g.addColorStop(1, 'rgba(0,60,200,0)'); X.fillStyle = g; X.fillRect(-1.4 * r, -1.0 * r, 2.8 * r, 2.8 * r);
  X.strokeStyle = `rgba(190,245,255,${luz})`; X.lineWidth = 0.09 * r; X.lineCap = 'round';
  X.beginPath(); X.moveTo(0, 0.85 * r); X.lineTo(0, -0.2 * r); X.moveTo(0, 0.22 * r); X.lineTo(-0.36 * r, -0.2 * r); X.moveTo(0, 0.22 * r); X.lineTo(0.36 * r, -0.2 * r); X.stroke();
  X.beginPath(); X.arc(0, 0.3 * r, 0.62 * r, 0, 7); X.lineWidth = 0.035 * r; X.stroke();
  X.restore(); X.restore();
}
// ---------- efeitos ----------
function linhasFoco(cx, cy, n, cor, t, r0 = 260) {
  X.save(); X.fillStyle = cor; const q = Math.floor(t * 24);
  for (let i = 0; i < n; i++) {
    const a = R(i * 7.3 + q * 0.17) * Math.PI * 2, w = 0.004 + R(i + q) * 0.012, ri = r0 + R(i * 3 + q) * 140;
    X.beginPath(); X.moveTo(cx + Math.cos(a) * ri, cy + Math.sin(a) * ri);
    X.lineTo(cx + Math.cos(a - w) * 1500, cy + Math.sin(a - w) * 1500); X.lineTo(cx + Math.cos(a + w) * 1500, cy + Math.sin(a + w) * 1500); X.closePath(); X.fill();
  }
  X.restore();
}
function linhasVelocidade(t, cor1, cor2, dir = -1) {
  const g = X.createLinearGradient(0, 0, 0, H); g.addColorStop(0, cor1); g.addColorStop(0.5, cor2); g.addColorStop(1, cor1);
  X.fillStyle = g; X.fillRect(0, 0, W, H);
  const q = Math.floor(t * 24);
  for (let i = 0; i < 70; i++) {
    const y = R(i * 3.1 + q * 0.3) * H, L = 200 + R(i + q) * 700, x = ((R(i * 5.7) * W * 2 + q * 180 * -dir) % (W * 2)) - W * 0.5;
    X.fillStyle = `rgba(255,255,255,${0.15 + R(i * 9 + q) * 0.5})`; X.fillRect(x, y, L, 1 + R(i * 2.2) * 4);
  }
}
function particulas(tipo, t, n, area, opts = {}) {
  X.save();
  for (let i = 0; i < n; i++) {
    const s = R(i * 1.37 + (opts.semente || 0)), s2 = R(i * 2.91 + 5), s3 = R(i * 4.17 + 9);
    if (tipo === 'neve') {
      const vel = 40 + s2 * 80, z = 0.5 + s3 * 1.5;
      const y = ((s * H + t * vel * z) % (H + 40)) - 20, x = ((s2 * W + Math.sin(t * 1.2 + i) * 30 + t * (opts.vento || 30) * z) % (W + 40) + W + 40) % (W + 40) - 20;
      X.fillStyle = `rgba(255,255,255,${0.5 + s3 * 0.5})`; X.beginPath(); X.arc(x, y, 1 + z * 1.6, 0, 7); X.fill();
    } else if (tipo === 'brasa') {
      const vel = 40 + s2 * 90, y = H - ((s * H + t * vel) % (H + 40)), x = (s2 * W + Math.sin(t * 2 + i) * 40 + t * 30) % W;
      X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(255,${120 + s3 * 100},40,${0.5 + 0.5 * Math.sin(t * 6 + i)})`; X.beginPath(); X.arc(x, y, 1.5 + s3 * 2.5, 0, 7); X.fill();
    } else if (tipo === 'brilho') {
      const vel = 15 + s2 * 30, y = H - ((s * H + t * vel) % (H + 40)), x = (s2 * W + Math.sin(t + i) * 20) % W;
      X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(255,230,150,${0.3 + 0.4 * Math.sin(t * 3 + i)})`; X.beginPath(); X.arc(x, y, 1 + s3 * 2, 0, 7); X.fill();
    } else if (tipo === 'folha') {
      const x = ((s * W * 1.5 - t * (200 + s2 * 200)) % (W + 100) + W + 100) % (W + 100) - 50, y = (s2 * H * 0.8 + Math.sin(t * 3 + i) * 40);
      X.save(); X.translate(x, y); X.rotate(t * 4 + i); X.fillStyle = s3 > 0.5 ? '#f0a0b8' : '#9ad060'; X.beginPath(); X.ellipse(0, 0, 6, 3, 0, 0, 7); X.fill(); X.restore();
    } else if (tipo === 'aura') {
      const vel = 200 + s2 * 300, y = area[1] - ((s * 300 + t * vel) % 300), x = area[0] + (s2 - 0.5) * area[2];
      X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(140,220,255,${0.6 * (1 - (area[1] - y) / 300)})`; X.fillRect(x, y, 3, 18 + s3 * 20);
    }
  }
  X.restore();
}
// estouro de partículas num instante (faíscas, palha, poeira)
function estouro(tipo, x, y, t, n = 30, sem = 0) {
  if (t < 0 || t > 1.2) return;
  X.save();
  for (let i = 0; i < n; i++) {
    const a = R(i * 3.3 + sem) * Math.PI * 2, v = 200 + R(i * 7.1 + sem) * 600, g = tipo === 'poeira' ? 0 : 900;
    const px = x + Math.cos(a) * v * t * (tipo === 'poeira' ? 0.4 : 1), py = y + Math.sin(a) * v * t * (tipo === 'poeira' ? 0.15 : 1) + g * t * t * 0.5;
    const vida = 1 - t / (tipo === 'poeira' ? 1.2 : 0.6); if (vida <= 0) continue;
    if (tipo === 'faisca') { X.globalCompositeOperation = 'lighter'; X.strokeStyle = `rgba(255,${200 + R(i) * 55},120,${vida})`; X.lineWidth = 3; X.beginPath(); X.moveTo(px, py); X.lineTo(px - Math.cos(a) * 26, py - Math.sin(a) * 26 - g * t * 0.03); X.stroke(); }
    else if (tipo === 'palha') { X.save(); X.translate(px, py); X.rotate(a + t * 8); X.fillStyle = `rgba(230,200,110,${vida})`; X.fillRect(-8, -1.5, 16, 3); X.restore(); }
    else if (tipo === 'poeira') { X.fillStyle = `rgba(150,120,100,${vida * 0.5})`; X.beginPath(); X.arc(px, py, 20 + t * 60 * R(i * 1.9), 0, 7); X.fill(); }
    else if (tipo === 'gelo') { X.globalCompositeOperation = 'lighter'; X.fillStyle = `rgba(180,240,255,${vida})`; X.save(); X.translate(px, py); X.rotate(a); X.fillRect(-6, -2, 12, 4); X.restore(); }
  }
  X.restore();
}
function rastroCorte(x, y, r, a0, a1, k, cor = '200,240,255') {
  // meia-lua do golpe: some aos poucos
  if (k <= 0 || k >= 1) return;
  X.save(); X.globalCompositeOperation = 'lighter';
  const aa = a0 + (a1 - a0) * Math.min(1, k * 2), ab = a0 + (a1 - a0) * Math.max(0, k * 2 - 1);
  for (let j = 0; j < 3; j++) {
    X.beginPath(); X.arc(x, y, r + j * 8, ab, aa, a1 < a0); X.arc(x, y, r * 0.72 + j * 10, aa, ab, a1 >= a0); X.closePath();
    X.fillStyle = `rgba(${cor},${(0.6 - j * 0.18) * (1 - k * 0.6)})`; X.fill();
  }
  X.restore();
}
function vinheta(forca = 0.55, cor = '0,0,0') {
  const g = X.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.95);
  g.addColorStop(0, `rgba(${cor},0)`); g.addColorStop(1, `rgba(${cor},${forca})`); X.fillStyle = g; X.fillRect(0, 0, W, H);
}
function tinta(cor, a) { if (a <= 0) return; X.save(); X.globalAlpha = a; X.fillStyle = cor; X.fillRect(0, 0, W, H); X.restore(); }
function tinge(cor, a, modo = 'multiply') { if (a <= 0) return; X.save(); X.globalCompositeOperation = modo; X.globalAlpha = a; X.fillStyle = cor; X.fillRect(0, 0, W, H); X.restore(); }
function granulado(t) {
  X.save(); X.globalAlpha = 0.05; const q = Math.floor(t * 24);
  for (let i = 0; i < 260; i++) { X.fillStyle = R(i + q * 13) > 0.5 ? '#fff' : '#000'; X.fillRect(R(i * 1.7 + q) * W, R(i * 2.3 + q * 3) * H, 2, 2); }
  X.restore();
}
// desenha numa tela à parte e devolve (para silhueta, aura e brilho)
function aParte(i, fn) { const c = OFF[i], g = c.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, W, H); const x0 = X; X = g; try { fn(); } finally { X = x0; } return c; }
function silhueta(c, cor) { const g = c.getContext('2d'); g.save(); g.globalCompositeOperation = 'source-in'; g.fillStyle = cor; g.fillRect(0, 0, W, H); g.restore(); return c; }
function aura(c, cor, t, forca = 1) {
  X.save(); X.globalCompositeOperation = 'lighter';
  for (let j = 0; j < 3; j++) { X.shadowColor = cor; X.shadowBlur = (30 + j * 20 + Math.sin(t * 20 + j) * 8) * forca; X.globalAlpha = 0.5 * forca; X.drawImage(c, (R(Math.floor(t * 24) + j) - 0.5) * 6, -j * 4); }
  X.restore();
}
// legenda
function legenda(nome, texto, cor = '#ffd75a') {
  X.save(); X.font = 'bold 30px "DejaVu Sans", sans-serif'; X.textAlign = 'center'; X.textBaseline = 'alphabetic'; X.lineJoin = 'round';
  const linha = (nome ? nome + ': ' : '') + texto, y = H - 46;
  X.lineWidth = 7; X.strokeStyle = 'rgba(0,0,0,0.9)'; X.strokeText(linha, W / 2, y);
  if (nome) {
    const wn = X.measureText(nome + ': ').width, wt = X.measureText(linha).width, x0 = W / 2 - wt / 2;
    X.textAlign = 'left'; X.fillStyle = cor; X.fillText(nome + ': ', x0, y); X.fillStyle = '#fff'; X.fillText(texto, x0 + wn, y);
  } else { X.fillStyle = '#fff'; X.fillText(linha, W / 2, y); }
  X.restore();
}
function falas(t, lista) {
  for (const [a, b, nome, txt, cor] of lista) if (t >= a && t < b) legenda(nome, txt, cor);
}
const fala = (t, lista) => lista.some(([a, b]) => t >= a && t < b) ? (Math.abs(Math.sin(t * 17)) * 0.9) : 0;

// ===================== AS CENAS =====================
const COR = { aren: '#7fc8ff', borin: '#ffc070', berserker: '#ff7a5a', jarl: '#a8e8ff' };
const CENAS = [];
function cena(dur, fn) { CENAS.push({ dur, fn }); }

// 1) Hrimgard à noite: o Jarl sopra o chifre
cena(7, t => {
  CAM.sx = 0; CAM.sy = 0; if (t > 5) tremor(t - 5, 7, 1.8);
  cenario('hrimgard', 1.18, lerp(0.38, 0.6, ease(t / 7)), 0.42);
  // aurora pulsando
  X.save(); X.globalCompositeOperation = 'lighter';
  for (let i = 0; i < 4; i++) { const x = (i * 380 + t * 40) % (W + 400) - 200; const g = X.createLinearGradient(x, 0, x + 200, 0); g.addColorStop(0, 'rgba(60,255,160,0)'); g.addColorStop(0.5, `rgba(60,255,160,${0.06 + 0.04 * Math.sin(t * 2 + i)})`); g.addColorStop(1, 'rgba(60,255,160,0)'); X.fillStyle = g; X.fillRect(x, 0, 200, H * 0.5); }
  X.restore();
  particulas('neve', t, 140, null, { vento: t > 5 ? 260 : 40 });
  // o jarl, em silhueta com contorno de luz
  const k = easeOut(seg(t, 1.6, 3.2)), ks = ease(seg(doze(t), 4.4, 5.0));
  let olhos; const desenha = () => { olhos = jarlFigura(980, 880 + (1 - k) * 80, 1.45, t, ks); };
  const c1 = silhueta(aParte(0, desenha), '#9fe0ff'), c2 = silhueta(aParte(1, desenha), '#0c1424');
  X.save(); X.globalAlpha = k; X.drawImage(c1, -4, -3); X.drawImage(c2, 0, 0);
  // olhos brilhando por cima da silhueta
  X.restore();
  if (t > 3) olhosJarl(olhos, cl((t - 3) * 2) * (0.7 + 0.3 * Math.sin(t * 9)) * k);
  if (t > 5) { X.save(); X.globalCompositeOperation = 'lighter'; for (let j = 0; j < 4; j++) { const r = ((t - 5) * 700 + j * 160) % 900; X.strokeStyle = `rgba(160,220,255,${0.4 * (1 - r / 900)})`; X.lineWidth = 6; X.beginPath(); X.arc(930, 410, r, 0, 7); X.stroke(); } X.restore(); }
  vinheta(0.7, '0,8,30');
  falas(t, [[2.4, 4.6, 'Jarl Hrafn', 'Os sulistas dormem tranquilos...', COR.jarl], [4.6, 6.6, 'Jarl Hrafn', 'Que ouçam o chifre de Hrimgard!', COR.jarl]]);
  tinta('#000', 1 - seg(t, 0, 0.8)); tinta('#fff', seg(t, 6.6, 7));
});

// 2) Abertura com o título
cena(4.5, t => {
  CAM.sx = 0; CAM.sy = 0;
  cenario('colina', lerp(1.08, 1.2, t / 4.5), 0.6, 0.35, 'blur(5px) brightness(0.55)');
  particulas('brilho', t, 70);
  const k = easeOut(seg(t, 0.15, 0.7)), esc = 1.6 - 0.6 * k;
  X.save(); X.translate(W / 2, H / 2 - 40); X.scale(esc, esc); X.globalAlpha = k;
  X.font = 'bold 86px "DejaVu Serif", serif'; X.textAlign = 'center'; X.textBaseline = 'middle';
  const g = X.createLinearGradient(0, -50, 0, 50); g.addColorStop(0, '#fff6c0'); g.addColorStop(0.5, '#f0c040'); g.addColorStop(1, '#a86a10');
  X.lineWidth = 12; X.strokeStyle = '#2a1404'; X.lineJoin = 'round'; X.strokeText('CRÔNICAS', 0, -50); X.strokeText('DE ELDORIA', 0, 50);
  X.fillStyle = g; X.fillText('CRÔNICAS', 0, -50); X.fillText('DE ELDORIA', 0, 50);
  // brilho passando
  X.globalCompositeOperation = 'source-atop'; const sx = lerp(-700, 700, seg(t, 0.9, 1.9));
  const gs = X.createLinearGradient(sx - 80, 0, sx + 80, 0); gs.addColorStop(0, 'rgba(255,255,255,0)'); gs.addColorStop(0.5, 'rgba(255,255,255,0.9)'); gs.addColorStop(1, 'rgba(255,255,255,0)');
  X.fillStyle = gs; X.fillRect(-700, -120, 1400, 240);
  X.restore();
  X.save(); X.globalAlpha = seg(t, 1.3, 2.0); X.font = 'bold 34px "DejaVu Sans", sans-serif'; X.textAlign = 'center'; X.lineWidth = 6; X.strokeStyle = '#000'; X.lineJoin = 'round';
  X.strokeText('EPISÓDIO 1  —  O CHIFRE DO NORTE', W / 2, H / 2 + 120); X.fillStyle = '#e8f4ff'; X.fillText('EPISÓDIO 1  —  O CHIFRE DO NORTE', W / 2, H / 2 + 120); X.restore();
  tinta('#fff', 1 - seg(t, 0, 0.35)); tinta('#000', seg(t, 4.1, 4.5));
});

// 3) A vila ao amanhecer: Aren treina com mestre Borin
cena(8.5, t => {
  CAM.sx = 0; CAM.sy = 0;
  // golpes: 3.2 / 4.6 / 7.2 (o último mais forte)
  const golpes = [2.9, 4.5, 7.3];
  for (const g of golpes) if (t > g && t < g + 0.4) tremor(t - g, g === 7.3 ? 12 : 5, 0.4);
  const kc = ease(seg(t, 0, 2.2));
  const V = cenario('vila', lerp(1.0, 1.3, kc), lerp(0.55, 0.0, kc), lerp(0.3, 1.0, kc));
  particulas('folha', t, 14);
  const [dx, dy] = V.map(230, 470);
  // aren
  const seq = [[0, 'guarda']];
  for (const g of golpes) seq.push([g - 0.45, 'guarda'], [g - 0.2, 'prepara'], [g, 'golpe'], [g + 0.35, 'golpe'], [g + 0.8, 'guarda']);
  const P = poseEm(seq, t), [ax, ay] = V.map(500, 800);
  const sobra = golpes.some(g => t > g && t < g + 0.5);
  // borin (de braços cruzados, depois aponta)
  const [bx, by] = V.map(1040, 800);
  pessoa(ELENCO.borin, poseEm([[0, 'bracos']], t), bx, by, 2.6, -1, { t, boca: fala(t, [[3.2, 5.4]]), pisca: (t % 3.1) < 0.12, vento: 0.5 });
  pessoa(ELENCO.aren, P, ax, ay, 2.5, -1, { t, boca: fala(t, [[5.6, 7.0]]), pisca: (t % 2.7) < 0.1, brava: sobra });
  for (const g of golpes) {
    rastroCorte(ax - 40, ay - 290, 220, rad(-60) + Math.PI, rad(60) + Math.PI, (t - g + 0.08) / 0.35);
    estouro('palha', dx + 60, dy + 40, t - g, g === 7.3 ? 50 : 26, g);
  }
  if (t > 7.3 && t < 7.4) tinta('#fff', 0.7);
  vinheta(0.35, '40,20,0');
  falas(t, [[3.2, 5.4, 'Mestre Borin', 'Mais firme, Aren! O golpe nasce no quadril!', COR.borin], [5.6, 7.1, 'Aren', 'Eu sei, mestre! Olha só esse!', COR.aren], [7.4, 8.5, 'Mestre Borin', 'Hmpf... nada mal, garoto.', COR.borin]]);
  tinta('#000', 1 - seg(t, 0, 0.5));
});

// 4) Close do Aren com o vento
cena(5, t => {
  CAM.sx = 0; CAM.sy = 0;
  cenario('vila', 2.3, lerp(0.58, 0.66, t / 5), 0.16, 'blur(3px)');
  X.save(); X.globalCompositeOperation = 'screen'; const g = X.createRadialGradient(1100, 120, 0, 1100, 120, 600); g.addColorStop(0, 'rgba(255,220,140,0.55)'); g.addColorStop(1, 'rgba(255,200,120,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore();
  particulas('folha', t + 3, 20);
  rosto(ELENCO.aren, 640 + Math.sin(t * 0.8) * 6, 360 + lerp(30, 0, ease(seg(t, 0, 5))), 175, t, { boca: fala(t, [[0.5, 4.6]]) * 0.8, pisca: Math.abs(t - 2.2) < 0.06, sorriso: 0.6, corado: true });
  vinheta(0.3, '40,20,0');
  falas(t, [[0.4, 2.4, 'Aren', 'Um dia... eu vou ser um herói', COR.aren], [2.4, 4.7, 'Aren', 'que protege Eldoria inteira!', COR.aren]]);
});

// 5) O chifre: o olho se arregala e a fumaça sobe no norte
cena(4.2, t => {
  CAM.sx = 0; CAM.sy = 0;
  if (t < 1.3) {
    tremor(t, 4, 1.3);
    X.fillStyle = '#f6d2b0'; X.fillRect(0, 0, W, H);
    rosto(ELENCO.aren, 640 + 2.4 * 175 * 0.4 * 2.2, 360 - 0.12 * 175 * 2.2 * 2.2 + 20, 175 * 4.8, t, { pupila: t > 0.35 ? 0.35 : 1, treme: t > 0.35 });
    if (t > 0.35) linhasFoco(640, 360, 50, 'rgba(0,0,0,0.6)', t, 420);
    return;
  }
  const u = t - 1.3; tremor(u, 3, 3);
  const V = cenario('vila', lerp(1.05, 1.0, u / 2.9), 0.55, 0.4);
  // fumaça subindo atrás das montanhas
  for (let i = 0; i < 3; i++) {
    const [fx, fy] = V.map(620 + i * 170, 300);
    for (let j = 0; j < 14; j++) { const k = ((u * 0.5 + j / 14) % 1); X.fillStyle = `rgba(40,30,30,${0.45 * (1 - k)})`; X.beginPath(); X.arc(fx + Math.sin(j + u) * 14 + k * 50, fy - k * 260, 18 + k * 50, 0, 7); X.fill(); }
  }
  // pássaros fugindo
  for (let i = 0; i < 12; i++) {
    const x = 300 + R(i) * 500 + u * (200 + R(i * 3) * 160), y = 330 - u * (80 + R(i * 5) * 80) + R(i * 7) * 120, a = Math.sin(u * 22 + i) * 7;
    X.strokeStyle = '#1a1414'; X.lineWidth = 3; X.beginPath(); X.moveTo(x - 10, y - a); X.lineTo(x, y); X.lineTo(x + 10, y - a); X.stroke();
  }
  tinge('#ff6a40', seg(u, 0.3, 2.9) * 0.45);
  vinheta(0.5, '40,0,0');
  falas(t, [[1.5, 4.2, 'Mestre Borin', 'Esse som... É o chifre de Hrimgard! Os vikings!', COR.borin]]);
});

// 6) O ataque: aldeões fogem, vikings chegam, o berserker salta e ruge
cena(6.5, t => {
  CAM.sx = 0; CAM.sy = 0;
  if (t < 3.6) {
    if (t > 2.9) tremor(t - 2.9, 16, 0.6);
    const V = cenario('fogo', lerp(1.1, 1.22, t / 3.6), 0.5, 0.62);
    particulas('brasa', t, 60);
    // vikings correndo do fundo
    for (let i = 0; i < 5; i++) {
      const k = cl((t - i * 0.25) / 3), s = lerp(0.8, 1.9, k), x = 260 + i * 190 + (i % 2 ? 1 : -1) * k * 60, y = lerp(470, 640, k);
      const c = aParte(0, () => pessoa(ELENCO.viking, corrida(t + i * 0.3, 1.3), x, y, s, i % 2 ? -1 : 1, { t }));
      X.drawImage(silhueta(c, '#1a0604'), 0, 0);
    }
    // aldeões fugindo na frente
    pessoa(ELENCO.aldea, corrida(t, 1.6), lerp(-100, 1400, t / 3.2), 712, 1.9, 1, { t, boca: 0.8 });
    pessoa(ELENCO.aldeao, corrida(t + 0.2, 1.6), lerp(-300, 1300, (t - 0.3) / 3.2), 735, 2.0, 1, { t, boca: 0.8 });
    // o berserker salta
    if (t > 2.2) {
      const k = seg(t, 2.2, 2.9), x = lerp(1250, 760, k), y = lerp(420, 690, k * k), ar = Math.sin(k * Math.PI) * 120;
      pessoa(ELENCO.berserker, t < 2.9 ? POSE.ergue : POSE.desce, x, y - ar, 2.4, -1, { t, boca: 1, brava: true });
      estouro('poeira', 760, 700, t - 2.9, 26, 3); estouro('faisca', 760, 690, t - 2.9, 20, 4);
    }
    vinheta(0.55, '30,0,0');
    tinta('#000', 1 - seg(t, 0, 0.3));
  } else {
    const u = t - 3.6; tremor(u, 9, 2.9);
    X.fillStyle = '#5a0a08'; X.fillRect(0, 0, W, H);
    linhasFoco(640, 330, 90, 'rgba(255,190,120,0.55)', u, 300);
    particulas('brasa', u, 40);
    rosto(ELENCO.berserker, 640, 330 + Math.sin(u * 30) * 3, 170, u, { ruge: 0.6 + 0.4 * Math.abs(Math.sin(u * 8)), brava: 1, sombraOlhos: 0.2 });
    vinheta(0.6);
    falas(u, [[0.1, 2.9, 'Berserker', 'HAHAHA! Queimem tudo! O Norte chegou!', COR.berserker]]);
  }
});

// 7) A luta
cena(13, t => {
  CAM.sx = 0; CAM.sy = 0;
  const B = ELENCO.berserker, A = ELENCO.aren;
  // 7a) frente a frente, o golpe do machado e o choque
  if (t < 5.5) {
    if (t > 2.0 && t < 3) tremor(t - 2.0, 22, 1);
    const V = cenario('fogo', 1.25, 0.5, 0.75);
    particulas('brasa', t, 50);
    // aren entra correndo e fica em guarda; depois é empurrado
    let ax, Pa;
    if (t < 1.1) { ax = lerp(-100, 430, t / 1.1); Pa = corrida(t, 1.4); }
    else if (t < 2.0) { ax = 430; Pa = poseEm([[1.1, 'guarda'], [1.6, 'guarda'], [1.85, 'defesa']], t); }
    else if (t < 3.2) { ax = lerp(430, 230, easeOut(seg(t, 2.05, 3.0))); Pa = poseEm([[2.0, 'defesa'], [2.4, 'empurrado'], [3.1, 'joelho']], t); }
    else { ax = 230; Pa = poseEm([[3.2, 'joelho']], t); Pa.inc += Math.sin(t * 6) * 3; }
    const Pb = t < 1.4 ? POSE.ri : poseEm([[1.4, 'ri'], [1.65, 'ergue'], [1.95, 'ergue'], [2.05, 'desce'], [2.6, 'desce'], [3.2, 'ri']], t);
    const bx = t < 3.2 ? 820 : lerp(820, 700, seg(t, 3.4, 5.4));
    pessoa(B, Pb, bx, 705, 2.35, -1, { t, boca: Math.max(fala(t, [[3.4, 5.4]]), t > 1.4 && t < 2.1 ? 1 : 0), brava: true, vento: 0.5 });
    pessoa(A, Pa, ax, 705, 2.0, 1, { t, boca: fala(t, [[0.3, 1.6]]), brava: true, pisca: t > 3.2 && (t % 1.6) < 0.08 });
    if (t > 2.0 && t < 3.0) { estouro('faisca', 560, 330, t - 2.02, 40, 7); estouro('poeira', ax, 700, t - 2.1, 14, 8); }
    // poeira do deslize
    if (t > 2.1 && t < 3.1) for (let i = 0; i < 6; i++) { X.fillStyle = 'rgba(120,90,70,0.35)'; X.beginPath(); X.arc(ax + 40 + i * 30, 700 - R(i) * 10, 14 + i * 3, 0, 7); X.fill(); }
    vinheta(0.55, '30,0,0');
    // quadro de impacto (invertido, preto e branco) no choque
    if (t > 2.0 && t < 2.17) { X.save(); X.globalCompositeOperation = 'difference'; X.fillStyle = '#fff'; X.fillRect(0, 0, W, H); X.restore(); X.save(); X.globalCompositeOperation = 'saturation'; X.fillStyle = '#000'; X.fillRect(0, 0, W, H); X.restore(); linhasFoco(560, 330, 70, '#000', t, 120); }
    falas(t, [[0.2, 1.7, 'Aren', 'Saia da minha vila!', COR.aren], [3.4, 5.5, 'Berserker', 'Fraco! Igual a todo sulista!', COR.berserker]]);
    return;
  }
  // 7b) close: "eu não vou fugir!" e a runa acende
  if (t < 7.5) {
    const u = t - 5.5;
    X.fillStyle = '#1a0606'; X.fillRect(0, 0, W, H);
    const luz = seg(u, 0.9, 1.8);
    if (luz > 0) { const g = X.createLinearGradient(0, H, 0, 0); g.addColorStop(0, `rgba(80,200,255,${0.6 * luz})`); g.addColorStop(1, 'rgba(0,40,120,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); linhasFoco(640, 380, 60, `rgba(150,230,255,${0.35 * luz})`, u, 330); }
    particulas('aura', u, luz > 0 ? 50 : 0, [640, H, W]);
    rosto(A, 640, 400, 170, u, { boca: fala(u, [[0.1, 1.6]]), brava: 1, sombraOlhos: u < 0.9 ? 0.25 : 0, brilho: luz * 0.35, vento: 0.4 + luz });
    vinheta(0.5);
    falas(u, [[0.1, 1.9, 'Aren', 'Eu... não vou fugir!', COR.aren]]);
    return;
  }
  // 7c) ele se levanta com a aura
  if (t < 8.6) {
    const u = t - 7.5; tremor(u, 5, 1.1);
    cenario('fogo', 1.4, 0.4, 0.8, 'saturate(0.4) brightness(0.45)');
    tinge('#2a5aa0', 0.5, 'color');
    const P = poseEm([[0, 'joelho'], [0.5, 'levanta'], [0.9, 'guarda']], u);
    const c = aParte(0, () => pessoa(A, P, 560, 760, 2.6, 1, { t: u, brava: true, runa: 1, brilhoArma: 1, vento: 1.6 }));
    aura(c, '#5ad0ff', u, 1); X.drawImage(c, 0, 0);
    particulas('aura', u, 60, [560, 760, 300]);
    vinheta(0.5, '0,10,40');
    return;
  }
  // 7d) a investida (fundo de linhas de velocidade)
  if (t < 9.4) {
    const u = t - 8.6;
    linhasVelocidade(u, '#0a2a5a', '#5ab0f0');
    const P = POSE.investida, x = lerp(200, 1100, ease(u / 0.8));
    for (let j = 3; j >= 1; j--) { const c = aParte(0, () => pessoa(A, P, x - j * 90, 560, 2.4, 1, { t: u, vento: 2 })); X.save(); X.globalAlpha = 0.18 * (4 - j); X.drawImage(silhueta(c, '#bff0ff'), 0, 0); X.restore(); }
    const c = aParte(0, () => pessoa(A, P, x, 560, 2.4, 1, { t: u, vento: 2, brilhoArma: 1, brava: true }));
    aura(c, '#9ae8ff', u, 0.8); X.drawImage(c, 0, 0);
    return;
  }
  // 7e) o corte: clarão e a meia-lua
  if (t < 9.75) {
    const u = t - 9.4;
    X.fillStyle = u < 0.08 ? '#fff' : '#06121e'; X.fillRect(0, 0, W, H);
    rastroCorte(640, 900, 700, rad(200), rad(340), u / 0.35 * 0.8 + 0.1);
    linhasFoco(640, 360, 80, 'rgba(200,240,255,0.7)', u, 200);
    return;
  }
  // 7f) de costas um para o outro: o machado quebra e o berserker cai
  const u = t - 9.75;
  if (u > 0.6 && u < 1.6) tremor(u - 0.6, 10, 1);
  cenario('fogo', 1.25, 0.5, 0.75);
  particulas('brasa', u, 50);
  const caiu = seg(u, 0.75, 1.4);
  const Pb = u < 0.6 ? POSE.desce : mistura(POSE.desce, POSE.cai, ease(seg(u, 0.6, 1.2)));
  pessoa(B, Pb, 620 - caiu * 30, 705, 2.35, -1, { t: u, semArma: u > 0.5, boca: u > 0.5 ? 0.8 : 0, rot: caiu * 80, pisca: u > 1.2 });
  // pedaços do machado voando
  if (u > 0.5) {
    const k = u - 0.5;
    for (let j = 0; j < 2; j++) {
      X.save(); X.translate(480 + (j ? 120 : -60) * k * 2, 340 - 500 * k + 900 * k * k); X.rotate(k * (j ? 9 : -7)); LW = 3;
      if (j) { X.beginPath(); X.moveTo(0, 0); X.quadraticCurveTo(80, -30, 84, 40); X.quadraticCurveTo(70, 90, 0, 60); X.closePath(); X.fillStyle = '#c8ccd4'; X.fill(); contorno(); }
      else poly([[-6, -90], [6, -90], [6, 60], [-6, 60]], '#7a5030');
      X.restore();
    }
  }
  estouro('poeira', 470, 700, u - 1.3, 30, 11);
  const Pa = poseEm([[0, 'final'], [1.6, 'final'], [2.4, 'ofegante']], u);
  pessoa(A, Pa, 1010, 700, 2.15, 1, { t: u, boca: fala(u, [[2.3, 3.2]]), pisca: (u % 2) < 0.08, runa: 0.4 });
  if (u < 0.15) tinta('#fff', 0.8);
  vinheta(0.5, '30,0,0');
  falas(u, [[2.2, 3.25, 'Aren', 'Hah... hah... Consegui...?', COR.aren]]);
});

// 8) O Jarl aparece na fumaça e a runa da mão
cena(8, t => {
  CAM.sx = 0; CAM.sy = 0;
  if (t < 3.4 || t >= 5.6) {
    const u = t < 3.4 ? t : t - 5.6 + 3.4;
    cenario('fogo', 1.2, 0.55, 0.35, 'saturate(0.5) brightness(0.55)');
    tinge('#3a6ab0', 0.55, 'color');
    particulas('neve', u, 90, null, { vento: 120 }); particulas('brasa', u, 25);
    const some = t >= 5.6 ? seg(t, 7.0, 7.9) : 0;
    const k = easeOut(seg(u, 0, 1.2)) * (1 - some);
    let olhos; const desenha = () => { olhos = jarlFigura(700, 600, 1.25, u, 0); };
    const c1 = silhueta(aParte(0, desenha), '#bfeaff'), c2 = silhueta(aParte(1, desenha), '#0a1020');
    X.save(); X.globalAlpha = k; X.drawImage(c1, -3, -2); X.drawImage(c2, 0, 0); X.restore();
    if (k > 0) olhosJarl(olhos, k * (0.75 + 0.25 * Math.sin(u * 7)), 28);
    if (some > 0) for (let i = 0; i < 80; i++) { const a = R(i) * 7, r = some * 500 * R(i * 3); X.fillStyle = `rgba(220,245,255,${1 - some})`; X.fillRect(700 + Math.cos(a + some * 4) * r, 380 + Math.sin(a + some * 4) * r * 0.6, 4, 4); }
    vinheta(0.65, '0,10,30');
    falas(t, [[0.3, 3.3, 'Jarl Hrafn', 'Uma runa do gelo... desperta num garoto do sul?', COR.jarl], [5.7, 7.6, 'Jarl Hrafn', 'Viva, garoto. Eu voltarei por você.', COR.jarl]]);
    return;
  }
  const u = t - 3.4;
  X.fillStyle = '#0a1426'; X.fillRect(0, 0, W, H);
  const luz = 0.5 + 0.5 * Math.sin(u * 5);
  linhasFoco(640, 360, 40, `rgba(120,210,255,${0.2 + 0.2 * luz})`, u, 300);
  maoRuna(640, 360 - u * 10, 150, u, 0.6 + 0.4 * luz);
  estouro('gelo', 640, 380, (u % 0.9), 20, Math.floor(u / 0.9));
  vinheta(0.6);
  falas(u, [[0.2, 2.2, 'Aren', 'O que... é isso na minha mão?!', COR.aren]]);
});

// 9) A colina ao entardecer: rumo ao Norte. "Continua..."
cena(10.5, t => {
  CAM.sx = 0; CAM.sy = 0;
  cenario('colina', lerp(1.25, 1.02, ease(seg(t, 0, 7))), 0.62, lerp(0.5, 0.55, t / 10));
  // capim balançando na frente
  X.save();
  for (let i = 0; i < 90; i++) { const x = R(i) * W, h = 60 + R(i * 3) * 90, b = Math.sin(t * 2.5 + i * 0.3) * 18 + 14; X.strokeStyle = R(i * 5) > 0.5 ? '#3a6a2a' : '#5a8a3a'; X.lineWidth = 4; X.beginPath(); X.moveTo(x, H + 10); X.quadraticCurveTo(x + b * 0.4, H - h / 2, x + b, H - h); X.stroke(); }
  X.restore();
  costas(ELENCO.aren, 430, 880, 2.6, t);
  costas(ELENCO.borin, 760, 840, 2.4, t);
  particulas('brilho', t, 30);
  vinheta(0.45, '20,0,40');
  falas(t, [[0.6, 3.0, 'Mestre Borin', 'Então você vai mesmo para o Norte?', COR.borin], [3.3, 6.2, 'Aren', 'Vou descobrir o que é essa runa... e proteger todo mundo!', COR.aren]]);
  // "Continua..."
  const k = seg(t, 6.8, 7.4);
  if (k > 0) {
    X.save(); X.globalAlpha = k; X.fillStyle = 'rgba(0,0,0,0.35)'; X.fillRect(0, 250, W * easeOut(k), 170);
    X.font = 'italic bold 78px "DejaVu Serif", serif'; X.textAlign = 'center'; X.lineWidth = 10; X.strokeStyle = '#1a0a20'; X.lineJoin = 'round';
    X.strokeText('Continua...', W / 2, 345); X.fillStyle = '#ffe6a0'; X.fillText('Continua...', W / 2, 345);
    X.font = 'bold 28px "DejaVu Sans", sans-serif'; X.lineWidth = 6; X.strokeText('Próximo episódio: A Geleira Eterna', W / 2, 395); X.fillStyle = '#d8ecff'; X.fillText('Próximo episódio: A Geleira Eterna', W / 2, 395);
    X.restore();
  }
  tinta('#000', seg(t, 9.6, 10.5));
});

// ---------- o relógio ----------
const DURACAO = CENAS.reduce((a, c) => a + c.dur, 0);
function render(t) {
  X.setTransform(1, 0, 0, 1, 0, 0); X.clearRect(0, 0, W, H); X.fillStyle = '#000'; X.fillRect(0, 0, W, H);
  let t0 = 0;
  for (const c of CENAS) { if (t < t0 + c.dur) { X.save(); c.fn(t - t0); X.restore(); break; } t0 += c.dur; }
  granulado(t);
}
// início de cada cena (para o som)
const INICIOS = (() => { let a = 0; return CENAS.map(c => { const v = a; a += c.dur; return v; }); })();
window.ANIME = { render, DURACAO, FPS, carregar, INICIOS };
