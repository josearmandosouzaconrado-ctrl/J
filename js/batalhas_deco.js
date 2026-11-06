'use strict';
// =====================================================================
//  DECORAÇÕES DO CRIADOR DE BATALHAS (SÓ NO MODO ADM)
//  Mais de 200 peças para montar os cenários, em pixel art feita no código:
//  guerra (sacos de areia, arame farpado, ouriços, dentes de dragão, crateras,
//  trincheiras, minas, munição, bandeiras, tendas), fortificações (bunkers,
//  muros, canhões, metralhadoras), destroços (tanques, aviões e carros
//  destruídos), ruínas, natureza, cidade moderna/corporativa (prédios de
//  escritório, arranha-céus, lojas, carros, ônibus, postes, semáforos,
//  outdoors) e as peças medievais do jogo. As sólidas viram cobertura de
//  verdade (bloqueiam passagem e tiros) e as minas explodem.
// =====================================================================
if (typeof IS_ADM !== 'undefined' && IS_ADM) (function () {
  const A = window.EraArte; if (!A) return;
  const Tela = A.Tela, P = A.P;
  const DECOS = [], porId = {};
  // cada peça: tamanho do desenho, a base sólida (em pixels) e a função que desenha
  function def(cat, id, nome, w, h, desenho, o = {}) {
    const d = Object.assign({ cat, id, nome, w, h, desenho, sol: o.sol === undefined ? [w * 0.8, 10] : o.sol }, o);
    DECOS.push(d); porId[id] = d; return d;
  }
  const CORES_REINO = ['#c03030', '#3050c0', '#30a040', '#d0a020', '#8040c0', '#e07020', '#2aa0a0', '#e0e0e0', '#303030', '#a04060', '#6a8a30', '#60a0e0'];
  const VIDRO = '#8ab8d8', VIDRO_L = '#c8e4f4', VIDRO_D = '#4a6a8a';

  // ---------- peças comuns ----------
  const saco = (t, x, y, c) => { const p = P(c); t.elip(x, y, 3.6, 2.2, p.b); t.r(x - 2, y - 2, 4, 1, p.l); t.d(x + 3, y + 1, p.d); };
  const caixa = (t, x, y, w, h, c) => { const p = P(c); t.r(x, y, w, h, p.b); t.r(x, y, w, 1, p.l); t.r(x, y + h - 1, w, 1, p.d); t.r(x + 1, y + Math.floor(h / 2), w - 2, 1, p.d); };
  const janelas = (t, x0, y0, cols, rows, cw, ch, gx, gy, acesa) => { for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const x = x0 + c * (cw + gx), y = y0 + r * (ch + gy); t.r(x, y, cw, ch, ((r * 7 + c * 3) % 5 === 0 && acesa) ? '#e8d890' : VIDRO); t.r(x, y, cw, 1, VIDRO_L); } };

  // ================== GUERRA ==================
  for (const L of [2, 3, 5]) for (const [c, n] of [['#c8b48a', 'areia'], ['#a8a070', 'cáqui']]) def('guerra', `sacos${L}${n}`, `Sacos de areia (${L}) ${n}`, L * 16, 16, t => { for (let row = 0; row < 3; row++) for (let i = 0; i < L * 2 + (row % 2 ? 0 : 1); i++) saco(t, 4 + i * 7.6 - (row % 2 ? -3.8 : 0), 13 - row * 4, row % 2 ? shade(c, -0.06) : c); }, { sol: [L * 16, 10] });
  for (const c of ['#c8b48a', '#a8a070']) def('guerra', 'ninho' + c, 'Ninho de metralhadora', 44, 24, t => { for (let i = 0; i < 9; i++) { const a = Math.PI + i / 8 * Math.PI; saco(t, 22 + Math.cos(a) * 17, 19 + Math.sin(a) * 9, c); saco(t, 22 + Math.cos(a) * 17, 15 + Math.sin(a) * 9, shade(c, -0.05)); } t.r(18, 6, 12, 3, '#2a2a26'); t.r(28, 7, 10, 1, '#1a1a18'); t.r(20, 9, 2, 5, '#3a3a34'); }, { sol: [40, 12] });
  for (const L of [2, 4, 6]) def('guerra', 'arame' + L, `Arame farpado (${L})`, L * 16, 14, t => { for (let i = 0; i <= L; i++) t.r(i * 16 - (i === L ? 1 : 0), 2, 1, 11, '#4a3a2a'); for (let x = 0; x < L * 16; x++) { const y = 7 + Math.round(Math.sin(x * 0.6) * 4); t.d(x, y, '#8a8a90'); if (x % 4 === 0) { t.d(x, y - 1, '#b0b0b8'); t.d(x, y + 1, '#5a5a60'); } t.d(x, 10 + Math.round(Math.cos(x * 0.55) * 3), '#7a7a80'); } }, { sol: [L * 16, 8], arame: true });
  for (const [c, n] of [['#4e4e4e', 'aço'], ['#7a5a3a', 'enferrujado']]) def('guerra', 'ourico' + n, `Ouriço tcheco (${n})`, 18, 16, t => { const p = P(c); t.linha(2, 14, 15, 2, p.b); t.linha(3, 14, 16, 2, p.d); t.linha(2, 2, 15, 14, p.b); t.linha(3, 2, 16, 14, p.l); t.r(8, 3, 2, 12, p.d); t.r(8, 3, 2, 1, p.l); });
  for (const L of [1, 3, 5]) def('guerra', 'dentes' + L, `Dentes de dragão (${L})`, L * 16, 16, t => { for (let i = 0; i < L; i++) { const x = 8 + i * 16; t.poly([[x - 6, 15], [x, 3], [x + 6, 15]], '#9a9890'); t.linha(x, 3, x - 6, 15, '#bab8b0'); t.poly([[x, 3], [x + 6, 15], [x + 2, 15]], '#7a7870'); } }, { sol: [L * 16, 10] });
  for (const s of [16, 28, 40, 56]) def('guerra', 'cratera' + s, `Cratera (${s})`, s, Math.round(s * 0.55), t => { const W = s, H = Math.round(s * 0.55); t.elip(W / 2, H / 2, W / 2 - 1, H / 2 - 1, '#5a4430'); t.elip(W / 2, H / 2 + 1, W / 2 - 3, H / 2 - 3, '#3a2a1a'); t.elip(W / 2 + 1, H / 2 + 2, W / 3, H / 4, '#2a1e12'); for (let i = 0; i < s / 4; i++) { const a = i * 2.4; t.d(W / 2 + Math.cos(a) * (W / 2 - 1), H / 2 + Math.sin(a) * (H / 2 - 1), '#7a6448'); } }, { plano: true, sol: null });
  for (const L of [3, 5, 8]) def('guerra', 'trincheira' + L, `Trincheira (${L})`, L * 16, 20, t => { t.r(0, 6, L * 16, 12, '#3a2a1a'); t.r(1, 8, L * 16 - 2, 8, '#2a1e12'); for (let x = 3; x < L * 16; x += 8) t.r(x, 8, 1, 8, '#5a4428'); t.r(1, 15, L * 16 - 2, 1, '#6a5030'); for (let i = 0; i < L * 2 + 1; i++) saco(t, 3 + i * 7.6, 4, '#c8b48a'); }, { plano: true, sol: null });
  def('guerra', 'mina', 'Mina terrestre (explode)', 10, 6, t => { t.elip(5, 3, 4, 2, '#3a4030'); t.r(4, 1, 2, 1, '#6a6a5a'); t.d(5, 0, '#9a9a8a'); }, { plano: true, sol: null, mina: true });
  for (const [c, n] of [['#e0c020', 'amarela'], ['#d0d0d0', 'branca']]) def('guerra', 'perigo' + n, `Placa de perigo (${n})`, 14, 22, t => { t.r(6, 8, 2, 14, '#4a3a2a'); t.r(1, 1, 12, 9, c); t.r(1, 1, 12, 1, shade(c, 0.3)); t.circ(7, 4, 2, '#1a1a1a'); t.r(6, 6, 3, 2, '#1a1a1a'); t.d(5, 4, c); t.d(8, 4, c); });
  for (const [c, n] of [['#4a5a32', 'verde'], ['#5a4a32', 'marrom'], ['#3a4a4a', 'cinza'], ['#6a5a3a', 'madeira']]) def('guerra', 'municao' + n, `Caixas de munição (${n})`, 26, 18, t => { caixa(t, 1, 9, 12, 8, c); caixa(t, 13, 9, 12, 8, shade(c, -0.08)); caixa(t, 6, 2, 13, 7, shade(c, 0.06)); t.r(9, 4, 6, 1, '#e0d080'); });
  for (const [c, n] of [['#3a6a3a', 'verdes'], ['#8a3a2a', 'vermelhos'], ['#3a4a7a', 'azuis']]) def('guerra', 'barris' + n, `Barris de combustível (${n})`, 26, 22, t => { const p = P(c); for (const [x, y] of [[1, 9], [13, 9], [7, 1]]) { t.r(x, y, 12, 12, p.b); t.r(x, y, 12, 1, p.l); t.r(x, y + 4, 12, 1, p.d); t.r(x, y + 8, 12, 1, p.d); t.r(x + 2, y + 1, 1, 10, p.l); t.d(x + 9, y + 1, '#2a2a2a'); } });
  CORES_REINO.forEach((c, i) => def('guerra', 'bandeira' + i, 'Bandeira', 18, 34, t => { t.r(2, 2, 2, 32, '#5a4a32'); t.r(2, 1, 2, 1, '#c8a040'); const p = P(c); for (let x = 0; x < 13; x++) { const o = Math.round(Math.sin(x * 0.5) * 1.2); t.r(4 + x, 3 + o, 1, 10, x % 4 === 0 ? p.d : p.b); t.d(4 + x, 3 + o, p.l); } }, { sol: [6, 6], cor: c }));
  for (const [tam, w, h] of [['pequena', 30, 22], ['grande', 46, 30]]) for (const [c, n] of [['#5a6036', 'verde'], ['#8a7a5a', 'areia'], ['#e0e0d8', 'branca']]) def('guerra', `tenda${tam}${n}`, `Tenda militar ${tam} (${n})`, w, h, t => { const p = P(c); t.poly([[1, h - 2], [w / 2, 2], [w - 1, h - 2]], p.b); t.poly([[w / 2, 2], [w - 1, h - 2], [w / 2 + 3, h - 2]], p.d); t.linha(w / 2, 2, 1, h - 2, p.l); t.poly([[w / 2 - 4, h - 2], [w / 2, h - 12], [w / 2 + 4, h - 2]], '#1e1a12'); t.r(w / 2, 0, 1, 3, '#4a3a2a'); });
  def('guerra', 'hospital', 'Hospital de campanha', 48, 30, t => { const p = P('#e0e0d8'); t.r(2, 10, 44, 18, p.b); t.poly([[2, 10], [24, 1], [46, 10]], p.l); t.r(2, 27, 44, 1, p.d); t.r(20, 14, 8, 3, '#c02020'); t.r(22, 12, 4, 7, '#c02020'); t.r(30, 18, 8, 10, '#2a2218'); });
  def('guerra', 'radio', 'Rádio e antena', 20, 36, t => { t.r(9, 2, 1, 26, '#5a5a5a'); t.linha(9, 2, 2, 10, '#7a7a7a'); t.linha(10, 2, 17, 10, '#7a7a7a'); caixa(t, 2, 26, 16, 9, '#4a5232'); t.r(5, 28, 3, 2, '#e0c040'); t.r(10, 28, 5, 1, '#2a2a2a'); });
  def('guerra', 'holofote', 'Holofote', 20, 22, t => { t.r(9, 12, 2, 8, '#3a3a3a'); t.r(4, 19, 12, 2, '#3a3a3a'); t.circ(10, 8, 6, '#4a4a4a'); t.circ(10, 8, 4.5, '#f0f0d0'); t.circ(9, 7, 2, '#ffffff'); });
  for (const n of [0, 1]) def('guerra', 'poste' + n, 'Poste de telégrafo', 18, 40, t => { t.r(8, 2, 2, 38, '#5a4028'); t.r(2, 6, 14, 2, '#4a3420'); for (const x of [3, 8, 13]) t.d(x, 5, '#c8d0d8'); if (n) { t.linha(0, 6, 3, 8, '#2a2a2a'); t.linha(17, 6, 14, 8, '#2a2a2a'); } }, { sol: [4, 4] });
  for (const [c, n] of [['#6a4a2a', 'tábuas'], ['#4a4a44', 'sucata']]) def('guerra', 'barricada' + n, `Barricada (${n})`, 34, 18, t => { const p = P(c); t.linha(1, 16, 32, 3, p.b); t.linha(1, 15, 32, 2, p.l); t.linha(1, 3, 32, 16, p.d); for (let i = 0; i < 4; i++) t.r(3 + i * 8, 6 + (i % 2) * 3, 7, 3, i % 2 ? p.b : p.d); });
  def('guerra', 'torre_madeira', 'Torre de vigia (madeira)', 28, 52, t => { const p = P('#6a4a2a'); t.linha(4, 50, 8, 14, p.b); t.linha(23, 50, 19, 14, p.b); t.linha(6, 32, 21, 46, p.d); t.linha(21, 32, 6, 46, p.d); t.r(2, 10, 24, 5, p.b); t.r(2, 10, 24, 1, p.l); t.r(3, 2, 22, 8, '#5a4a32'); t.poly([[1, 3], [14, 0], [27, 3]], '#4a3a22'); t.r(10, 5, 8, 3, '#1a1a14'); }, { sol: [20, 8] });
  def('guerra', 'torre_metal', 'Torre de vigia (metal)', 28, 56, t => { t.linha(5, 54, 10, 16, '#5a5e60'); t.linha(22, 54, 17, 16, '#5a5e60'); for (let y = 20; y < 54; y += 8) t.linha(7 + (54 - y) * 0.12, y, 20 - (54 - y) * 0.12, y + 6, '#4a4e50'); t.r(4, 8, 20, 8, '#6a6e70'); t.r(4, 8, 20, 1, '#8a8e90'); t.r(7, 10, 14, 3, '#1a1a1a'); t.r(6, 4, 16, 4, '#5a5e60'); t.circ(20, 6, 2, '#f0f0d0'); }, { sol: [18, 8] });

  // ================== FORTIFICAÇÕES ==================
  for (const [tam, w, h] of [['pequeno', 34, 22], ['grande', 56, 30]]) for (const [c, n] of [['#8a8a84', 'concreto'], ['#6a6a48', 'camuflado']]) def('fort', `bunker${tam}${n}`, `Bunker ${tam} (${n})`, w, h, t => { const p = P(c); t.poly([[2, h - 1], [4, 8], [w - 4, 8], [w - 2, h - 1]], p.b); t.r(3, 5, w - 6, 4, p.l); t.r(2, h - 2, w - 4, 1, p.d); t.r(Math.round(w * 0.25), h * 0.45, Math.round(w * 0.5), 3, '#121212'); if (n === 'camuflado') for (let i = 0; i < w / 4; i++) t.r(4 + (i * 7) % (w - 10), 9 + (i * 5) % (h - 12), 4, 2, i % 2 ? '#4a5232' : '#7a6a48'); t.r(w * 0.5, h * 0.48, 6, 1, '#2a2a2a'); }, { sol: [w - 4, 14] });
  def('fort', 'casamata', 'Casamata de madeira', 40, 24, t => { const p = P('#6a4a2a'); t.r(2, 8, 36, 15, p.b); for (let y = 9; y < 23; y += 3) t.r(2, y, 36, 1, p.d); t.r(0, 5, 40, 4, '#5a4a32'); for (let i = 0; i < 6; i++) saco(t, 4 + i * 6.5, 4, '#c8b48a'); t.r(10, 13, 20, 3, '#121212'); }, { sol: [36, 12] });
  for (const L of [2, 4, 6]) def('fort', 'muro' + L, `Muro de concreto (${L})`, L * 16, 26, t => { const p = P('#9a9890'); t.r(0, 4, L * 16, 21, p.b); t.r(0, 4, L * 16, 2, p.l); t.r(0, 24, L * 16, 1, p.d); for (let x = 16; x < L * 16; x += 16) t.r(x, 6, 1, 18, p.d); for (let i = 0; i < L * 3; i++) t.d((i * 11) % (L * 16), 10 + (i * 7) % 12, p.dd); }, { sol: [L * 16, 12] });
  for (const [c, n] of [['#b0aea6', 'cinza'], ['#e0e0d8', 'branca']]) def('fort', 'jersey' + n, `Barreira de concreto (${n})`, 32, 14, t => { const p = P(c); t.poly([[1, 13], [5, 3], [27, 3], [31, 13]], p.b); t.r(5, 3, 22, 1, p.l); t.r(1, 12, 30, 1, p.d); if (n === 'branca') for (let x = 4; x < 28; x += 8) t.poly([[x, 12], [x + 4, 4], [x + 7, 4], [x + 3, 12]], '#d03020'); }, { sol: [30, 8] });
  def('fort', 'portao', 'Portão de base', 64, 30, t => { t.r(0, 2, 6, 28, '#6a6a64'); t.r(58, 2, 6, 28, '#6a6a64'); t.r(0, 0, 6, 3, '#8a8a84'); t.r(58, 0, 6, 3, '#8a8a84'); t.r(6, 18, 52, 3, '#c0c0b8'); for (let x = 8; x < 56; x += 8) t.r(x, 18, 4, 3, '#c02020'); t.r(26, 6, 12, 8, '#e0e0d8'); t.r(28, 8, 8, 1, '#2a2a2a'); t.r(28, 10, 6, 1, '#2a2a2a'); }, { sol: [12, 8] });
  const canhao = (t, w, h, cano, rodas, cor) => { const p = P(cor); t.linha(w * 0.35, h - 6, w * 0.05, h - 2, p.d); t.linha(w * 0.35, h - 7, w * 0.05, h - 3, p.b); t.r(w * 0.3, h - 13, w * 0.25, 6, p.b); t.r(w * 0.3, h - 13, w * 0.25, 1, p.l); for (let i = 0; i < cano; i++) t.d(w * 0.5 + i, h - 12 - i * 0.45, p.dd), t.d(w * 0.5 + i, h - 11 - i * 0.45, p.d); if (rodas) { t.circ(w * 0.42, h - 4, 4, '#3a3020'); t.circ(w * 0.42, h - 4, 2.5, '#6a5030'); t.d(w * 0.42, h - 4, '#2a2010'); } };
  def('fort', 'canhao1914', 'Canhão de campanha (1914)', 40, 24, t => canhao(t, 40, 24, 18, true, '#5a5a48'));
  def('fort', 'obuseiro', 'Obuseiro pesado', 50, 30, t => { canhao(t, 50, 30, 22, true, '#4a5236'); t.r(14, 14, 10, 4, '#3a4228'); });
  def('fort', 'antitanque', 'Canhão antitanque', 44, 22, t => { const p = P('#5a6040'); t.poly([[8, 8], [22, 6], [22, 16], [8, 18]], p.b); t.r(22, 10, 20, 2, p.dd); t.r(40, 9, 3, 4, p.ddd); t.circ(14, 18, 3.5, '#2a2a24'); t.linha(10, 16, 1, 21, p.d); });
  def('fort', 'morteiro', 'Morteiro', 20, 20, t => { t.r(3, 16, 14, 3, '#4a4a44'); t.linha(8, 16, 13, 3, '#3a3a34'); t.linha(9, 16, 14, 3, '#5a5a54'); t.linha(10, 16, 6, 9, '#3a3a34'); t.r(12, 2, 3, 2, '#2a2a24'); });
  def('fort', 'mg_pesada', 'Metralhadora pesada', 26, 16, t => { t.r(4, 6, 12, 4, '#3a3a34'); t.r(16, 7, 9, 1, '#1a1a18'); t.r(6, 10, 2, 5, '#3a3a34'); t.linha(7, 10, 2, 15, '#3a3a34'); t.linha(7, 10, 12, 15, '#3a3a34'); t.r(2, 8, 3, 3, '#5a5a4a'); for (let i = 0; i < 5; i++) t.d(9 + i, 11 + (i % 2), '#c8a040'); });
  def('fort', 'flak', 'Canhão antiaéreo', 34, 30, t => { for (let i = 0; i < 10; i++) { const a = i / 10 * 6.28; saco(t, 17 + Math.cos(a) * 13, 24 + Math.sin(a) * 4, '#c8b48a'); } t.r(13, 16, 8, 7, '#5a5e4a'); t.linha(17, 16, 28, 2, '#2a2e24'); t.linha(18, 16, 29, 2, '#4a4e44'); t.r(27, 1, 3, 2, '#1a1a1a'); });

  // ================== DESTROÇOS ==================
  const queimado = (img, sombra = 0.55) => { const c = document.createElement('canvas'); c.width = img.width; c.height = img.height; const x = c.getContext('2d'); x.drawImage(img, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = `rgba(20,16,12,${sombra})`; x.fillRect(0, 0, c.width, c.height); x.fillStyle = 'rgba(90,40,10,0.25)'; for (let i = 0; i < 12; i++) x.fillRect((i * 37) % c.width, (i * 23) % c.height, 5, 3); return c; };
  for (const m of ['sherman', 'tiger', 'panzer4', 'mark4', 'ft17']) { const M = A.TANQUES[m]; def('destrocos', 'qt_' + m, `${M.nome} destruído`, M.W, M.H + 6, null, { sol: [M.W * 0.8, 14], pronto: () => { const T = A.tanque(m, M.cor, '#2a2a2a'), c = document.createElement('canvas'); c.width = M.W; c.height = M.H + 6; const x = c.getContext('2d'); x.drawImage(queimado(T.lado[0]), 0, 6); if (T.torre) { x.save(); x.translate(M.ancora[0] - M.pivo[0], 6 + M.ancora[1] - M.pivo[1] + 3); x.rotate(0.12); x.drawImage(queimado(T.torre), 0, 0); x.restore(); } return c; } }); }
  def('destrocos', 'qt_caminhao', 'Caminhão destruído', 54, 32, null, { pronto: () => queimado(A.caminhao('#5a5a40', '#2a2a2a').lado[0]) });
  def('destrocos', 'qt_jipe', 'Jipe destruído', 40, 24, null, { pronto: () => queimado(A.jipe('#56603e', '#2a2a2a').lado[0]) });
  for (const [m, n] of [['biplano', 'Biplano abatido'], ['caca', 'Caça abatido']]) def('destrocos', 'qt_' + m, n, 60, 50, null, { plano: false, sol: [30, 10], pronto: () => { const s = A[m](m === 'biplano' ? '#a08850' : '#6a7a6a', '#2a2a2a'), c = document.createElement('canvas'); c.width = 60; c.height = 50; const x = c.getContext('2d'); x.fillStyle = '#2a1e12'; x.beginPath(); x.ellipse(30, 40, 26, 7, 0, 0, 6.29); x.fill(); x.translate(30, 26); x.rotate(0.9); x.drawImage(queimado(s.c, 0.45), -s.W / 2, -s.H / 2); return c; } });
  const carro = (t, c, onibus) => { const p = P(c), W = onibus ? 60 : 36; if (onibus) { t.r(2, 4, 56, 16, p.b); t.r(2, 4, 56, 2, p.l); janelas(t, 6, 7, 7, 1, 5, 5, 2, 0); t.r(52, 7, 4, 9, VIDRO); } else { t.poly([[2, 16], [2, 10], [9, 9], [13, 3], [25, 3], [30, 9], [34, 10], [34, 16]], p.b); t.r(13, 3, 12, 1, p.l); t.poly([[14, 5], [24, 5], [27, 9], [11, 9]], VIDRO); t.r(19, 5, 1, 4, p.b); t.r(2, 11, 32, 1, p.l); t.d(33, 12, '#f0e8a0'); t.d(2, 12, '#c03020'); } for (const wx of onibus ? [12, 48] : [9, 27]) { t.circ(wx, onibus ? 20 : 16, 3.6, '#1a1a18'); t.circ(wx, onibus ? 20 : 16, 1.6, '#8a8a8a'); } void W; };
  for (const [c, n] of [['#6a3a2a', 'vermelho'], ['#3a3a4a', 'azul']]) def('destrocos', 'carro_q' + n, `Carro queimado (${n})`, 36, 20, null, { pronto: () => { const t = Tela(36, 20); carro(t, c); t.contorno(); return queimado(t.c, 0.6); } });
  for (let v = 0; v < 4; v++) def('destrocos', 'sucata' + v, 'Pilha de destroços', 30, 18, t => { const r = new RNG(v * 99 + 7); for (let i = 0; i < 14; i++) { const x = r.int(2, 24), y = r.int(6, 15), w = r.int(3, 8); t.r(x, y, w, r.int(2, 4), r.pick(['#5a5a54', '#6a5040', '#4a4a44', '#7a6a5a', '#3a3a34'])); } t.r(6, 4, 14, 2, '#5a5a54'); t.linha(4, 14, 18, 4, '#7a6a5a'); });

  // ================== RUÍNAS ==================
  for (const [c, n] of [['#9a5a40', 'tijolo'], ['#8a8a80', 'pedra']]) for (let v = 0; v < 4; v++) def('ruinas', `parede${n}${v}`, `Parede em ruínas (${n})`, 40, 40, t => { const p = P(c), r = new RNG(v * 13 + 5); const alt = [r.int(14, 36), r.int(10, 30), r.int(18, 38), r.int(8, 24), r.int(12, 34)]; for (let i = 0; i < 5; i++) { const x = i * 8, h = alt[i]; t.r(x, 40 - h, 8, h, p.b); for (let y = 40 - h; y < 40; y += 4) t.r(x, y, 8, 1, p.d); t.r(x + ((y => y)(i) % 2 ? 4 : 0), 40 - h, 1, h, p.d); t.r(x, 40 - h, 8, 1, p.l); } if (v % 2) t.r(14, 22, 8, 10, '#1a1410'); }, { sol: [40, 10] });
  for (const [c, n] of [['#c8b090', 'bege'], ['#a07060', 'tijolo'], ['#9aa0a8', 'cinza']]) def('ruinas', 'casab' + n, `Casa bombardeada (${n})`, 56, 48, t => { const p = P(c); t.poly([[2, 47], [2, 16], [14, 10], [20, 20], [30, 6], [40, 18], [54, 14], [54, 47]], p.b); t.r(2, 46, 52, 1, p.d); janelas(t, 8, 22, 3, 2, 7, 7, 8, 6); t.r(8, 22, 7, 7, '#1a1410'); t.r(38, 34, 9, 13, '#1a1410'); for (let i = 0; i < 8; i++) t.r(4 + i * 6, 42 + (i % 2), 5, 4, p.d); t.linha(30, 6, 22, 30, '#2a1e14'); }, { sol: [52, 14] });
  for (const v of [0, 1]) def('ruinas', 'coluna' + v, 'Coluna quebrada', 16, 36, t => { const p = P('#d0c8b8'); const h = v ? 22 : 32; t.r(3, 36 - h, 10, h - 3, p.b); t.r(4, 36 - h, 2, h - 3, p.l); t.r(11, 36 - h, 1, h - 3, p.d); t.r(1, 33, 14, 3, p.d); t.poly([[3, 36 - h], [7, 33 - h], [13, 37 - h]], p.b); });
  def('ruinas', 'igreja', 'Igreja em ruínas', 64, 64, t => { const p = P('#a8a090'); t.poly([[4, 63], [4, 26], [20, 14], [20, 4], [26, 0], [32, 4], [32, 14], [44, 22], [52, 18], [60, 30], [60, 63]], p.b); t.r(4, 62, 56, 1, p.d); t.r(23, 6, 6, 8, '#1a1410'); t.circ(26, 30, 5, '#1a1410'); t.r(22, 46, 8, 17, '#1a1410'); janelas(t, 40, 34, 2, 1, 5, 10, 6, 0); t.r(24, 0, 4, 1, p.l); }, { sol: [56, 16] });
  for (const c of ['#9a5a40', '#8a8a80']) def('ruinas', 'tijolos' + c, 'Pilha de tijolos', 28, 14, t => { const r = new RNG(c.length + 3); for (let i = 0; i < 16; i++) t.r(r.int(1, 22), r.int(4, 11), 5, 2, i % 3 ? c : shade(c, -0.2)); });

  // ================== NATUREZA ==================
  for (let v = 0; v < 3; v++) def('natureza', 'arvq' + v, 'Árvore queimada', 26, 44, t => { const r = new RNG(v * 31 + 2); t.r(11, 14, 4, 30, '#2a2420'); t.r(12, 14, 1, 30, '#4a3e34'); for (let i = 0; i < 4 + v; i++) { const y = r.int(6, 26), dir = r.chance(0.5) ? 1 : -1; t.linha(13, y + 6, 13 + dir * r.int(5, 11), y, '#2a2420'); } }, { sol: [6, 6] });
  for (const v of [0, 1]) def('natureza', 'toco' + v, 'Toco', 16, 12, t => { t.r(4, 3, 9, 8, v ? '#3a2a1a' : '#6a4a2a'); t.elip(8, 3, 4.5, 1.6, v ? '#5a4a3a' : '#c8a070'); t.linha(2, 11, 5, 8, '#5a3a20'); t.linha(14, 11, 11, 8, '#5a3a20'); });
  for (const [s, c] of [[20, '#4a3a24'], [30, '#3a3020'], [40, '#5a6a7a']]) def('natureza', 'poca' + s, s === 40 ? 'Poça d\'água' : 'Lamaçal', s, Math.round(s * 0.5), t => { t.elip(s / 2, s * 0.25, s / 2 - 1, s * 0.25 - 1, c); t.elip(s / 2 - 2, s * 0.22, s / 3, s * 0.12, shade(c, 0.15)); }, { plano: true, sol: null });
  for (const v of [0, 1]) def('natureza', 'secos' + v, 'Arbusto seco', 20, 14, t => { for (let i = 0; i < 9; i++) t.linha(10, 13, 2 + i * 2, 2 + (i % 3) * 2, v ? '#8a7a4a' : '#6a5a3a'); });

  // ================== CIDADE MODERNA / CORPORATIVO ==================
  for (const [andares, nome] of [[3, 'baixo'], [5, 'médio'], [8, 'alto']]) for (const [c, n] of [['#7a8a9a', 'azul-acinzentado'], ['#8a7a6a', 'bege'], ['#5a6a7a', 'grafite']]) {
    const w = 56, h = 14 + andares * 12;
    def('cidade', `escritorio${andares}${n}`, `Prédio de escritórios ${nome} (${n})`, w, h, t => { const p = P(c); t.r(2, 6, w - 4, h - 6, p.b); t.r(2, 6, w - 4, 2, p.l); t.r(w - 6, 6, 4, h - 6, p.d); t.r(0, 2, w, 5, p.d); t.r(0, 2, w, 1, p.l); janelas(t, 6, 12, 6, andares, 5, 7, 3, 5, true); t.r(20, h - 12, 16, 12, VIDRO_D); t.r(20, h - 12, 16, 1, VIDRO_L); t.r(27, h - 12, 1, 12, '#2a3a4a'); t.r(16, h - 16, 24, 3, '#e8e8e0'); }, { sol: [w - 6, 16] });
  }
  for (const [c, n] of [[VIDRO, 'azul'], ['#7ab8a0', 'verde'], ['#c8a868', 'dourado']]) def('cidade', 'arranha' + n, `Arranha-céu de vidro (${n})`, 44, 130, t => { const p = P(c); t.r(4, 10, 36, 120, p.b); for (let y = 12; y < 128; y += 6) { t.r(4, y, 36, 1, p.l); } for (let x = 8; x < 40; x += 6) t.r(x, 10, 1, 120, p.d); t.r(36, 10, 4, 120, p.dd); t.r(8, 4, 28, 6, '#5a6068'); t.r(21, 0, 2, 4, '#3a3a3a'); t.d(21, 0, '#ff3030'); t.r(14, 116, 16, 14, '#2a3a4a'); }, { sol: [36, 18] });
  for (const [c, n] of [['#c03030', 'vermelha'], ['#3060c0', 'azul'], ['#30a050', 'verde'], ['#e0a020', 'amarela'], ['#8040a0', 'roxa'], ['#e06090', 'rosa']]) def('cidade', 'loja' + n, `Loja com toldo (${n})`, 48, 40, t => { const p = P('#d8ccb8'); t.r(2, 8, 44, 32, p.b); t.r(2, 8, 44, 1, p.l); t.r(0, 4, 48, 4, '#6a5a4a'); t.r(8, 6, 32, 6, '#f0f0e8'); t.r(12, 8, 24, 2, c); for (let x = 2; x < 46; x += 6) { t.r(x, 14, 3, 6, c); t.r(x + 3, 14, 3, 6, '#f0f0e8'); } t.r(6, 22, 20, 14, VIDRO); t.r(6, 22, 20, 1, VIDRO_L); t.r(30, 22, 10, 18, '#3a2a1a'); t.d(38, 31, '#e0c040'); }, { sol: [44, 14] });
  for (const [c, n] of [['#e0d8c8', 'branca'], ['#c8a088', 'salmão'], ['#a0b8c8', 'azul'], ['#b8c898', 'verde']]) def('cidade', 'casam' + n, `Casa moderna (${n})`, 48, 40, t => { const p = P(c); t.r(2, 14, 44, 26, p.b); t.poly([[0, 15], [24, 2], [48, 15]], '#7a4a3a'); t.linha(0, 15, 24, 2, '#9a6a5a'); janelas(t, 6, 20, 2, 1, 9, 8, 4, 0); t.r(32, 24, 9, 16, '#5a3a2a'); t.r(2, 38, 44, 2, p.d); t.r(36, 6, 4, 8, '#8a5a4a'); }, { sol: [44, 14] });
  for (const v of [0, 1]) def('cidade', 'fabrica' + v, 'Fábrica com chaminé', 64, 56, t => { const p = P(v ? '#8a6a5a' : '#7a7a74'); t.r(2, 28, 60, 28, p.b); for (let i = 0; i < 4; i++) t.poly([[2 + i * 15, 28], [2 + i * 15, 20], [17 + i * 15, 28]], p.l); janelas(t, 6, 34, 6, 2, 6, 5, 3, 4); t.r(46, 2, 8, 26, '#6a5a50'); t.r(45, 2, 10, 2, '#4a3a30'); t.r(4, 46, 14, 10, '#2a2a24'); }, { sol: [60, 16] });
  def('cidade', 'posto', 'Posto de gasolina', 64, 40, t => { t.r(0, 4, 64, 5, '#e8e8e0'); t.r(0, 6, 64, 2, '#d03020'); t.r(6, 9, 2, 31, '#c8c8c0'); t.r(56, 9, 2, 31, '#c8c8c0'); for (const x of [18, 38]) { t.r(x, 22, 8, 16, '#d03020'); t.r(x + 1, 24, 6, 4, '#e8e8e0'); t.r(x + 8, 26, 2, 8, '#2a2a2a'); } }, { sol: [50, 8] });
  for (const v of [0, 1]) def('cidade', 'postel' + v, 'Poste de luz', 16, 44, t => { t.r(7, 6, 2, 38, '#4a4e52'); t.r(5, 42, 6, 2, '#3a3e42'); if (v) { t.r(7, 4, 7, 2, '#4a4e52'); t.r(11, 5, 4, 2, '#f0e8a0'); } else { t.r(4, 2, 8, 4, '#3a3e42'); t.r(5, 5, 6, 1, '#f0e8a0'); } }, { sol: [4, 4], luz: true });
  def('cidade', 'semaforo', 'Semáforo', 14, 40, t => { t.r(6, 14, 2, 26, '#3a3a3a'); t.r(3, 1, 8, 16, '#2a2a2a'); t.circ(7, 4, 2, '#d03020'); t.circ(7, 9, 2, '#5a4a10'); t.circ(7, 14, 2, '#1a4a1a'); }, { sol: [4, 4] });
  for (const [c, n] of [['#2a7a3a', 'verde'], ['#2a4a8a', 'azul'], ['#e8e8e0', 'branca']]) def('cidade', 'placa' + n, `Placa de rua (${n})`, 20, 30, t => { t.r(9, 8, 2, 22, '#6a6a6a'); t.r(1, 1, 18, 8, c); t.r(1, 1, 18, 1, shade(c, 0.3)); t.r(4, 4, 12, 1, n === 'branca' ? '#2a2a2a' : '#e8e8e0'); });
  for (const [c, n] of [['#d03020', 'vermelho'], ['#2060c0', 'azul'], ['#e0b020', 'amarelo'], ['#30a060', 'verde']]) def('cidade', 'outdoor' + n, `Outdoor (${n})`, 56, 40, t => { t.r(12, 22, 2, 18, '#4a4a4a'); t.r(42, 22, 2, 18, '#4a4a4a'); t.r(2, 2, 52, 22, '#e8e8e0'); t.r(4, 4, 48, 18, c); t.r(8, 8, 24, 3, '#f0f0f0'); t.r(8, 13, 16, 2, '#f0f0f0'); t.circ(42, 13, 6, shade(c, 0.4)); }, { sol: [36, 6] });
  def('cidade', 'banco', 'Banco de praça', 28, 14, t => { t.r(2, 4, 24, 2, '#8a5a30'); t.r(2, 7, 24, 2, '#8a5a30'); t.r(3, 9, 2, 5, '#3a3a3a'); t.r(23, 9, 2, 5, '#3a3a3a'); t.r(2, 4, 24, 1, '#aa7a50'); });
  for (const [c, n] of [['#3a6a3a', 'verde'], ['#5a5a5a', 'cinza']]) def('cidade', 'lixeira' + n, `Lixeira (${n})`, 12, 16, t => { const p = P(c); t.r(2, 3, 8, 12, p.b); t.r(1, 2, 10, 2, p.l); t.r(4, 5, 1, 9, p.d); t.r(7, 5, 1, 9, p.d); });
  def('cidade', 'hidrante', 'Hidrante', 10, 14, t => { t.r(3, 3, 4, 10, '#d03020'); t.r(2, 6, 6, 2, '#b02010'); t.elip(5, 3, 2.4, 1.4, '#e04030'); t.r(2, 12, 6, 2, '#a02010'); });
  def('cidade', 'correio', 'Caixa de correio', 12, 20, t => { t.r(2, 3, 8, 10, '#2050a0'); t.elip(6, 3, 4, 2, '#3060b0'); t.r(3, 6, 6, 1, '#1a1a1a'); t.r(5, 13, 2, 7, '#3a3a3a'); });
  def('cidade', 'cabine', 'Cabine telefônica', 18, 36, t => { t.r(2, 3, 14, 33, '#c02020'); t.r(2, 3, 14, 3, '#a01010'); for (let y = 9; y < 32; y += 5) t.r(4, y, 10, 4, VIDRO); t.r(5, 6, 8, 1, '#f0f0f0'); }, { sol: [14, 8] });
  def('cidade', 'ponto', 'Ponto de ônibus', 44, 30, t => { t.r(2, 2, 40, 3, '#5a6068'); t.r(3, 5, 1, 25, '#5a6068'); t.r(40, 5, 1, 25, '#5a6068'); t.r(4, 8, 36, 14, VIDRO); t.r(4, 8, 36, 1, VIDRO_L); t.r(8, 22, 28, 2, '#8a5a30'); t.r(34, 2, 8, 8, '#2060c0'); }, { sol: [38, 6] });
  def('cidade', 'banca', 'Banca de jornal', 30, 28, t => { t.r(2, 8, 26, 20, '#3a6a3a'); t.r(0, 4, 30, 5, '#2a5a2a'); t.r(5, 12, 20, 9, '#e8e0c8'); for (let i = 0; i < 5; i++) t.r(6 + i * 4, 13, 3, 7, ['#c03030', '#3050c0', '#e0c020', '#30a040', '#e07020'][i]); }, { sol: [26, 10] });
  def('cidade', 'cone', 'Cone de trânsito', 10, 12, t => { t.poly([[1, 11], [5, 1], [9, 11]], '#e06010'); t.r(3, 6, 4, 2, '#f0f0f0'); t.r(0, 10, 10, 2, '#e06010'); });
  ['#c03030', '#3050c0', '#e8e8e0', '#2a2a2a', '#30a050', '#e0c020', '#8a8a92', '#7a3a7a'].forEach((c, i) => def('cidade', 'carro' + i, 'Carro', 36, 20, t => carro(t, c), { sol: [32, 10] }));
  for (const [c, n] of [['#e0b020', 'amarelo'], ['#d03020', 'vermelho']]) def('cidade', 'onibus' + n, `Ônibus (${n})`, 62, 26, t => carro(t, c, true), { sol: [58, 12] });
  for (const L of [2, 4]) def('cidade', 'cercam' + L, `Cerca de metal (${L})`, L * 16, 18, t => { for (let x = 0; x < L * 16; x += 8) t.r(x, 2, 1, 15, '#6a6e72'); t.r(0, 4, L * 16, 1, '#8a8e92'); t.r(0, 14, L * 16, 1, '#8a8e92'); for (let x = 0; x < L * 16; x++) for (let y = 5; y < 14; y++) if ((x + y) % 4 === 0 || (x - y + 64) % 4 === 0) t.d(x, y, '#9a9ea2'); }, { sol: [L * 16, 6] });
  def('cidade', 'faixa', 'Faixa de pedestres', 48, 20, t => { for (let x = 0; x < 48; x += 8) t.r(x, 2, 5, 16, '#e8e8e0'); }, { plano: true, sol: null });
  def('cidade', 'vaga', 'Vagas de estacionamento', 64, 24, t => { for (let x = 0; x <= 64; x += 16) t.r(Math.min(x, 63), 2, 1, 20, '#e8e8e0'); t.r(0, 21, 64, 1, '#e8e8e0'); }, { plano: true, sol: null });
  def('cidade', 'arvcal', 'Árvore de calçada', 26, 40, t => { t.r(11, 22, 4, 16, '#5a3a20'); t.circ(13, 14, 10, '#3a7a2a'); t.circ(10, 11, 6, '#4a9a3a'); t.circ(16, 16, 5, '#2a6a1a'); t.r(5, 37, 16, 3, '#5a5a5a'); for (let x = 6; x < 21; x += 3) t.d(x, 38, '#8a8a8a'); }, { sol: [8, 6] });

  // troncos: cobertura de madeira onde as tropas se escondem
  for (const v of [0, 1, 2]) def('natureza', 'tronco' + v, v === 2 ? 'Troncos empilhados' : 'Tronco caído', v === 2 ? 40 : 36, v === 2 ? 20 : 12, t => {
    const p = P(v === 1 ? '#5a4028' : '#7a5434'), log = (x, y, w) => { t.r(x, y, w, 6, p.b); t.r(x, y, w, 1, p.l); t.r(x, y + 5, w, 1, p.dd); for (let i = x + 4; i < x + w - 3; i += 7) t.d(i, y + 3, p.d); t.elip(x + w - 1, y + 3, 2, 3, '#c8a070'); t.d(x + w - 1, y + 3, '#8a6a40'); };
    if (v === 2) { log(1, 13, 37); log(3, 7, 34); log(6, 1, 29); } else { log(1, 5, 33); t.linha(10, 5, 7, 1, p.d); t.linha(22, 5, 25, 2, p.d); }
  }, { sol: v === 2 ? [36, 12] : [32, 6] });
  def('natureza', 'troncosmg', 'Ninho de troncos (metralhadora)', 44, 22, t => { const p = P('#6a4a2c'); for (const [x, y, w] of [[1, 15, 14], [29, 15, 14], [3, 9, 12], [29, 9, 12]]) { t.r(x, y, w, 6, p.b); t.r(x, y, w, 1, p.l); t.r(x, y + 5, w, 1, p.dd); } t.r(15, 12, 14, 3, p.d); t.r(18, 7, 9, 3, '#3a3a34'); t.r(27, 8, 9, 1, '#1a1a18'); t.r(20, 10, 2, 3, '#3a3a34'); }, { sol: null });
  def('guerra', 'toca', 'Toca de atirador', 22, 12, t => { t.elip(11, 7, 10, 4.5, '#3a2a1a'); t.elip(11, 7, 7.5, 3, '#22180e'); for (let i = 0; i < 6; i++) { const a = Math.PI + i / 5 * Math.PI; t.elip(11 + Math.cos(a) * 10, 6 + Math.sin(a) * 4, 2.6, 1.6, '#c8b48a'); } }, { plano: true, sol: null });

  // ================== MEDIEVAL (as peças que o jogo já tem) ==================
  const OBJS = [['OAK', 'Carvalho'], ['PINE', 'Pinheiro'], ['SNOWPINE', 'Pinheiro nevado'], ['PALM', 'Palmeira'], ['DEADTREE', 'Árvore morta'], ['WILLOW', 'Salgueiro'], ['AUTUMN', 'Árvore outonal'], ['ELFTREE', 'Árvore ancestral'], ['CACTUS', 'Cacto'], ['BIGSHROOM', 'Cogumelo gigante'], ['BUSH', 'Arbusto'], ['ROCK', 'Pedra'], ['BOULDER', 'Rocha'], ['ICEROCK', 'Rocha de gelo'], ['SANDROCK', 'Rocha de arenito'], ['FLOWERS', 'Flores'], ['TALLGRASS', 'Capim alto'], ['REEDS', 'Juncos'], ['STUMP', 'Toco de árvore'], ['CAMPFIRE', 'Fogueira'], ['TENT', 'Tenda'], ['BARREL', 'Barril'], ['CRATE', 'Caixote'], ['KEG', 'Barris de cerveja'], ['SACKS', 'Sacos'], ['HAY', 'Feno'], ['FENCE', 'Cerca'], ['SIGN', 'Placa'], ['WELL', 'Poço'], ['LAMP', 'Lampião'], ['GASLAMP', 'Lampião a gás'], ['TORCH', 'Tocha'], ['STALL', 'Barraca de feira'], ['STATUE', 'Estátua'], ['ANGELSTATUE', 'Estátua de anjo'], ['FOUNTAIN', 'Fonte'], ['BANNER', 'Estandarte'], ['PILLAR', 'Pilar'], ['BROKEN_PILLAR', 'Pilar quebrado'], ['GRAVE', 'Túmulo'], ['BONES', 'Ossos'], ['SKULLS', 'Crânios'], ['RUNESTONE', 'Pedra rúnica'], ['SHRINE', 'Santuário'], ['ANVIL', 'Bigorna'], ['WEAPONRACK', 'Suporte de armas'], ['ARMORSTAND', 'Armadura'], ['DUMMY', 'Boneco de treino'], ['CANNON', 'Canhão antigo'], ['MINECART', 'Carrinho de mina'], ['BENCH', 'Banco'], ['TABLE', 'Mesa'], ['CAULDRON', 'Caldeirão'], ['BOILER', 'Caldeira'], ['MACHINE', 'Máquina a vapor'], ['PIPES', 'Canos'], ['CRYSTAL', 'Cristal'], ['TROPHY', 'Troféu'], ['LANTERN', 'Lanterna']];
  for (const [k, nome] of OBJS) if (O[k] !== undefined) def('medieval', 'obj_' + k, nome, 16, 16, null, { obj: O[k] });

  // ---------- o que cada peça faz na batalha ----------
  //  trinch: cobertura de quem está dentro (trincheira, toca)
  //  arma: atira sozinha pelo lado de quem colocou (auto) ou com um soldado no posto
  for (const d of DECOS) {
    if (/^trincheira/.test(d.id)) { d.trinch = 0.65; d.sol = null; d.plano = true; }
    if (d.id === 'toca') d.trinch = 0.6;
    if (/^ninho/.test(d.id)) { d.sol = null; d.arma = { tipo: 'mg', dmg: 13, cd: 0.13, alc: 320, hp: 360, cob: 0.75, dentro: true }; }
    if (d.id === 'troncosmg') d.arma = { tipo: 'mg', dmg: 13, cd: 0.13, alc: 320, hp: 300, cob: 0.7, dentro: true };
    if (/^tronco[012]$/.test(d.id)) d.cob = 0.55;
  }
  const arma = (id, a) => { if (porId[id]) porId[id].arma = a; };
  arma('canhao1914', { tipo: 'canhao', dmg: 150, aoe: 34, cd: 3.2, alc: 460, hp: 420, era: 'ww1' });
  arma('obuseiro', { tipo: 'obus', dmg: 230, aoe: 52, cd: 5.5, alc: 900, min: 120, hp: 520 });
  arma('antitanque', { tipo: 'at', dmg: 300, cd: 2.6, alc: 480, hp: 360, blind: true });
  arma('morteiro', { tipo: 'morteiro', dmg: 95, aoe: 38, cd: 3.4, alc: 420, min: 70, hp: 200 });
  arma('mg_pesada', { tipo: 'mg', dmg: 15, cd: 0.11, alc: 330, hp: 260 });
  arma('flak', { tipo: 'flak', dmg: 70, aoe: 22, cd: 0.7, alc: 520, hp: 380, ar: true });
  for (const d of DECOS) if (/^bunker/.test(d.id)) d.arma = { tipo: 'mg', dmg: 16, cd: 0.12, alc: 340, hp: /grande/.test(d.id) ? 1600 : 1000, auto: true, duro: 0.35 };
  arma('casamata', { tipo: 'mg', dmg: 13, cd: 0.14, alc: 300, hp: 700, auto: true, duro: 0.5 });

  // ---------- as imagens (prontas na primeira vez que aparecem) ----------
  const imgs = new Map();
  const Deco = {
    DECOS, porId,
    CATS: [['guerra', '💣 Guerra'], ['fort', '🏰 Fortificações'], ['destrocos', '🔥 Destroços'], ['ruinas', '🏚 Ruínas'], ['natureza', '🌳 Natureza'], ['cidade', '🏙 Cidade e corporativo'], ['medieval', '⚔ Medieval']],
    img(d) {
      if (imgs.has(d.id)) return imgs.get(d.id);
      let c;
      try {
        if (d.obj !== undefined) c = Sprites.obj(d.obj, 0, 0).c;
        else if (d.pronto) c = d.pronto();
        else { const t = Tela(d.w, d.h); d.desenho(t); t.contorno(); c = t.c; }
      } catch (e) { c = Tela(8, 8).c; }
      imgs.set(d.id, c); return c;
    },
    // girada (0, 90, 180 ou 270 graus), espelhada e/ou destruída (escura)
    imgR(d, r, f, morto) {
      r = (r || 0) & 3; if (!r && !f && !morto) return this.img(d);
      const k = d.id + '|' + r + (f ? 'f' : '') + (morto ? 'x' : ''); if (imgs.has(k)) return imgs.get(k);
      const src = this.img(d), w = src.width, h = src.height, c = document.createElement('canvas');
      c.width = r & 1 ? h : w; c.height = r & 1 ? w : h; const x = c.getContext('2d'); x.imageSmoothingEnabled = false;
      x.translate(c.width / 2, c.height / 2); x.rotate(r * Math.PI / 2); if (f) x.scale(-1, 1); x.drawImage(src, -w / 2, -h / 2);
      if (morto) { x.setTransform(1, 0, 0, 1, 0, 0); x.globalCompositeOperation = 'source-atop'; x.fillStyle = 'rgba(20,14,10,0.6)'; x.fillRect(0, 0, c.width, c.height); }
      imgs.set(k, c); return c;
    },
    url(d) { const k = 'u' + d.id; if (!imgs.has(k)) imgs.set(k, this.img(d).toDataURL()); return imgs.get(k); }
  };
  window.BatDeco = Deco;
})();
