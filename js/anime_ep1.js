'use strict';
// =====================================================================
//  ANIME — CAPÍTULO 1: "O CHIFRE DO NORTE"  (~3 min)
//  Aren treina na vila com o mestre Borin; Lina traz pão; o chifre de
//  Hrimgard soa; os vikings atacam; Aren salva Lina, enfrenta o berserker
//  e a Runa de Algiz desperta na sua mão; o Jarl Hrafn aparece; à noite,
//  na fogueira, Borin conta a lenda dos Guardiões; eles partem para o Norte.
// =====================================================================
(function () {
  const A = Anime, W = 1280, H = 720;
  const cl = A.cl, lerp = A.lerp, ease = A.ease, easeOut = A.easeOut, seg = (t, a, b) => A.seg(t, a, b), doze = A.doze;
  const COR = { aren: '#7fc8ff', lina: '#ffb0c8', borin: '#ffc070', berserker: '#ff7a5a', jarl: '#a8e8ff', viking: '#ff9a6a' };
  const AREN = 560;                 // altura do Aren em pé na tela (escala dos personagens)
  const cenas = [], deixas = [];
  let inicio = 0;
  // cada cena: duração, desenho e os sons (em tempo da própria cena)
  const cena = (d, sons, f) => { for (const [n, t, dd, v] of sons) deixas.push([n, inicio + t, dd, v]); cenas.push({ d, f }); inicio += d; };
  const aurora = t => {
    const X = A.X; X.save(); X.globalCompositeOperation = 'lighter';
    for (let i = 0; i < 4; i++) { const x = (i * 380 + t * 40) % (W + 400) - 200, g = X.createLinearGradient(x, 0, x + 200, 0); g.addColorStop(0, 'rgba(60,255,160,0)'); g.addColorStop(0.5, `rgba(60,255,160,${0.06 + 0.04 * Math.sin(t * 2 + i)})`); g.addColorStop(1, 'rgba(60,255,160,0)'); X.fillStyle = g; X.fillRect(x, 0, 200, H * 0.5); }
    X.restore();
  };
  const ondas = (x, y, t, cor = '160,220,255') => { const X = A.X; X.save(); X.globalCompositeOperation = 'lighter'; for (let j = 0; j < 4; j++) { const r = (t * 700 + j * 160) % 900; X.strokeStyle = `rgba(${cor},${0.45 * (1 - r / 900)})`; X.lineWidth = 6; X.beginPath(); X.arc(x, y, r, 0, 7); X.stroke(); } X.restore(); };
  const fumaca = (t, pts) => { const X = A.X; for (const [fx, fy] of pts) for (let j = 0; j < 14; j++) { const k = ((t * 0.5 + j / 14) % 1); X.fillStyle = `rgba(40,30,30,${0.45 * (1 - k)})`; X.beginPath(); X.arc(fx + Math.sin(j + t) * 14 + k * 50, fy - k * 260, 18 + k * 50, 0, 7); X.fill(); } };
  const passaros = t => { const X = A.X; for (let i = 0; i < 12; i++) { const x = 300 + A.R(i) * 500 + t * (200 + A.R(i * 3) * 160), y = 330 - t * (80 + A.R(i * 5) * 80) + A.R(i * 7) * 120, a = Math.sin(t * 22 + i) * 7; X.strokeStyle = '#1a1414'; X.lineWidth = 3; X.beginPath(); X.moveTo(x - 10, y - a); X.lineTo(x, y); X.lineTo(x + 10, y - a); X.stroke(); } };
  const anda = (t, v = 1) => Math.abs(Math.sin(t * 7 * v)) * -10;         // balanço do andar
  const tremeu = (t, ts, f, d) => { for (const a of ts) if (t > a && t < a + d) A.tremor(t - a, f, d); };

  // ---------------- 1. Prólogo: Hrimgard ----------------
  cena(14, [['vento', 0, 14, 0.35], ['drone', 5, 6.5, 0.45], ['horn', 11.4, 2.4, 1]], t => {
    if (t > 11.4) A.tremor(t - 11.4, 9, 2.6);
    if (t < 5) {
      A.fundo('hrimgard', 1.2, lerp(0.34, 0.52, ease(t / 5)), 0.45); aurora(t); A.particulas('neve', t, 130);
      A.vinheta(0.6, '0,8,30');
      A.falas(t, [[0.8, 4.6, null, 'Hrimgard... a geleira eterna, no extremo norte de Eldoria.']]);
    } else if (t < 9 || t >= 11.4) {
      A.fundo('hrimgard', 1.25, 0.62, 0.45); aurora(t); A.particulas('neve', t, 150, { vento: t > 11.4 ? 420 : 40 });
      const k = easeOut(seg(t, 5, 6.2)), sop = t >= 11.4;
      A.cel('jarl_pe', 860, 760 + (1 - k) * 60, 700 * (sop ? 1.03 : 1), { alpha: k, tint: ['#0a1838', sop ? 0.25 : 0.5], vento: 1.4, ventoAte: 0.9 });
      if (sop) ondas(1010, 120, t - 11.4);
      A.vinheta(0.6, '0,8,30');
      A.falas(t, [[5.3, 8.9, 'Jarl Hrafn', 'Por cem invernos, o sul esqueceu o nosso nome...', COR.jarl]]);
    } else {
      A.fundo('hrimgard', 1.4, 0.62, 0.4, 'blur(3px) brightness(0.6)');
      A.particulas('neve', t, 80);
      A.rosto('jarl_rosto', { zoom: lerp(1.0, 1.1, seg(t, 9, 11.4)), vento: 0.8, dy: 20 });
      const X = A.X, a = 0.6 + 0.4 * Math.sin(t * 9); X.save(); X.globalCompositeOperation = 'lighter';
      for (const ex of [585, 710]) { const g = X.createRadialGradient(ex, 225, 0, ex, 225, 60); g.addColorStop(0, `rgba(180,240,255,${a * 0.7})`); g.addColorStop(1, 'rgba(40,140,255,0)'); X.fillStyle = g; X.fillRect(ex - 60, 165, 120, 120); }
      X.restore(); A.vinheta(0.7, '0,8,30');
      A.falas(t, [[9.1, 11.3, 'Jarl Hrafn', 'Que ouçam o chifre de Hrimgard... e tremam!', COR.jarl]]);
    }
    A.tinta('#000', 1 - seg(t, 0, 0.8)); A.tinta('#fff', seg(t, 13.5, 14));
  });

  // ---------------- 2. Abertura ----------------
  cena(5, [['boom', 0.1, 1.2, 0.8], ['brilho', 1.0, 1.2, 0.5]], t => {
    const X = A.X;
    A.fundo('colina', lerp(1.08, 1.2, t / 5), 0.6, 0.35, 'blur(5px) brightness(0.55)');
    A.particulas('brilho', t, 70);
    const k = easeOut(seg(t, 0.15, 0.7)), esc = 1.6 - 0.6 * k;
    X.save(); X.translate(W / 2, H / 2 - 40); X.scale(esc, esc); X.globalAlpha = k;
    X.font = 'bold 86px "DejaVu Serif", Georgia, serif'; X.textAlign = 'center'; X.textBaseline = 'middle';
    const g = X.createLinearGradient(0, -50, 0, 50); g.addColorStop(0, '#fff6c0'); g.addColorStop(0.5, '#f0c040'); g.addColorStop(1, '#a86a10');
    X.lineWidth = 12; X.strokeStyle = '#2a1404'; X.lineJoin = 'round'; X.strokeText('CRÔNICAS', 0, -50); X.strokeText('DE ELDORIA', 0, 50);
    X.fillStyle = g; X.fillText('CRÔNICAS', 0, -50); X.fillText('DE ELDORIA', 0, 50);
    X.globalCompositeOperation = 'source-atop'; const sx = lerp(-700, 700, seg(t, 0.9, 1.9));
    const gs = X.createLinearGradient(sx - 80, 0, sx + 80, 0); gs.addColorStop(0, 'rgba(255,255,255,0)'); gs.addColorStop(0.5, 'rgba(255,255,255,0.9)'); gs.addColorStop(1, 'rgba(255,255,255,0)');
    X.fillStyle = gs; X.fillRect(-700, -120, 1400, 240); X.restore();
    X.save(); X.globalAlpha = seg(t, 1.3, 2.0); X.font = 'bold 34px "DejaVu Sans", Arial, sans-serif'; X.textAlign = 'center'; X.lineWidth = 6; X.strokeStyle = '#000'; X.lineJoin = 'round';
    X.strokeText('CAPÍTULO 1  —  O CHIFRE DO NORTE', W / 2, H / 2 + 120); X.fillStyle = '#e8f4ff'; X.fillText('CAPÍTULO 1  —  O CHIFRE DO NORTE', W / 2, H / 2 + 120); X.restore();
    A.tinta('#fff', 1 - seg(t, 0, 0.35)); A.tinta('#000', seg(t, 4.5, 5));
  });

  // ---------------- 3. O treino ----------------
  const golpes = [3.2, 5.8, 8.6];
  cena(11, [['passaros', 0, 11, 0.15], ...golpes.flatMap(g => [['whoosh', g - 0.2, 0.3, 0.6], ['pancada', g, 0.3, g === 8.6 ? 1 : 0.8]])], t => {
    tremeu(t, golpes, 6, 0.35);
    const kc = ease(seg(t, 0, 2.2));
    A.fundo('vila', lerp(1.0, 1.3, kc), lerp(0.55, 0.0, kc), lerp(0.3, 1.0, kc));
    A.particulas('folha', t, 12);
    const fala = A.falando(t, [[4.0, 6.6]]);
    A.cel('borin_pe', 1090, 718, 470, { fase: 1 });
    // o Aren: guarda -> prepara -> golpe
    const td = doze(t); let pose = 'aren_pe', h = AREN, dx = 0;
    for (const g of golpes) { if (td > g - 0.45 && td < g) { pose = 'aren_prepara'; h = AREN * 1.12; } else if (td >= g && td < g + 0.55) { pose = 'aren_golpe'; h = AREN * 0.86; dx = -60; } }
    A.cel(pose, 560 + dx, 705, h, { flip: true, vento: 1.2 });
    for (const g of golpes) { A.corte(330, 330, 230, Math.PI * 1.75, Math.PI * 0.75, (t - g + 0.05) / 0.4); A.estouro('palha', 300, 380, t - g, g === 8.6 ? 50 : 26, g); }
    if (t > 8.6 && t < 8.7) A.tinta('#fff', 0.6);
    A.vinheta(0.3, '40,20,0');
    A.falas(t, [[4.0, 6.6, 'Mestre Borin', 'Mais firme, Aren! O golpe nasce no quadril!', COR.borin], [6.8, 8.4, 'Aren', 'Eu sei, mestre! Olha só esse!', COR.aren], [9.2, 11, 'Mestre Borin', 'Hmpf... nada mal, garoto.', COR.borin]]);
    A.tinta('#000', 1 - seg(t, 0, 0.5));
  });

  // ---------------- 4. Lina chega ----------------
  cena(13, [['passaros', 0, 13, 0.12], ['passos', 0, 2.4, 0.25]], t => {
    if (t < 4) {
      A.fundo('vila', 1.3, 0.0, 1.0); A.particulas('folha', t, 12);
      const k = easeOut(seg(t, 0, 2.4)), lx = lerp(1450, 1000, k);
      A.cel('aren_pe', 520, 705, AREN, { vento: 1.2 });
      A.cel('lina_pe', lx, 712 + (k < 1 ? anda(t) : 0), 520, { vento: 1.3, fase: 2 });
      A.vinheta(0.3, '40,20,0');
      A.falas(t, [[1.0, 3.9, 'Lina', 'Aren! Trouxe pão quente da padaria!', COR.lina]]);
    } else if (t < 8.5) {
      A.fundo('vila', 2.2, 0.62, 0.18, 'blur(4px)'); A.particulas('folha', t + 3, 16);
      A.rosto('lina_rosto', { fala: A.falando(t, [[4.2, 8.3]]), vento: 1.4 });
      A.falas(t, [[4.2, 8.3, 'Lina', 'Treinando de novo desde o amanhecer? Você nunca descansa!', COR.lina]]);
    } else {
      A.fundo('vila', 2.3, 0.66, 0.16, 'blur(4px)'); A.particulas('folha', t + 5, 16);
      const X = A.X; X.save(); X.globalCompositeOperation = 'screen'; const g = X.createRadialGradient(1100, 120, 0, 1100, 120, 600); g.addColorStop(0, 'rgba(255,220,140,0.5)'); g.addColorStop(1, 'rgba(255,200,120,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore();
      A.rosto('aren_rosto', { fala: A.falando(t, [[8.7, 12.8]]), vento: 1.8, zoom: lerp(1, 1.06, seg(t, 8.5, 13)) });
      A.falas(t, [[8.7, 10.8, 'Aren', 'Um dia eu vou ser um cavaleiro de verdade...', COR.aren], [10.8, 12.9, 'Aren', '...e proteger esta vila inteira!', COR.aren]]);
    }
  });

  // ---------------- 5. "Você também, Lina" ----------------
  cena(9, [['brilho', 4.6, 1, 0.35]], t => {
    if (t < 4.5) {
      A.fundo('vila', 1.45, 0.08, 1.0); A.particulas('folha', t, 12);
      A.cel('aren_pe', 470, 720, AREN * 1.12, { vento: 1.2 });
      A.cel('lina_pe', 920, 726, 580, { vento: 1.3, fase: 2 });
      A.vinheta(0.3, '40,20,0');
      A.falas(t, [[0.3, 3.8, 'Aren', 'E proteger você também, Lina!', COR.aren]]);
    } else {
      A.fundo('vila', 2.2, 0.6, 0.2, 'blur(5px)');
      A.particulas('brilho', t, 40, { cor: '255,160,200' });
      A.rosto('lina_rosto', { fala: A.falando(t, [[4.8, 8.6]]), zoom: 1.12, dy: 30, vento: 1.2 });
      const X = A.X; X.save(); X.globalAlpha = 0.35 * seg(t, 4.6, 5.2); X.fillStyle = '#ff6a8a';
      for (const [bx, by] of [[505, 455], [790, 395]]) { X.beginPath(); X.ellipse(bx, by, 60, 22, -0.2, 0, 7); X.fill(); }
      X.restore();
      A.falas(t, [[4.8, 8.7, 'Lina', 'B-bobo! Come logo esse pão antes que esfrie!', COR.lina]]);
    }
  });

  // ---------------- 6. Borin fala do Norte ----------------
  cena(8, [['vento', 3.5, 4.5, 0.3]], t => {
    const k = ease(seg(t, 3.8, 7.5));
    A.fundo('vila', lerp(1.3, 1.15, k), lerp(0.1, 0.45, k), lerp(1.0, 0.0, k));
    A.cel('borin_pe', 900, 720 + k * 500, 520, { fase: 1 });
    A.cel('aren_pe', 420, 720 + k * 500, AREN, {});
    A.vinheta(0.35, '20,20,40');
    A.falas(t, [[0.3, 3.8, 'Mestre Borin', 'Não tenha pressa, garoto. O mundo é maior que esta vila.', COR.borin], [4.0, 7.9, 'Mestre Borin', 'Ao norte, depois das montanhas, fica Hrimgard... onde o gelo nunca derrete.', COR.borin]]);
  });

  // ---------------- 7. O chifre soa ----------------
  cena(7, [['horn', 0.1, 2.8, 0.6], ['tensao', 0.25, 1.3, 0.6], ['vento', 1.6, 5, 0.3]], t => {
    if (t < 1.6) {
      A.tremor(t, 4, 1.6);
      A.X.fillStyle = '#f6c890'; A.X.fillRect(0, 0, W, H);
      A.rosto('aren_choque', { zoom: lerp(1.6, 1.75, t / 1.6), dy: 330, vento: 0.6 });
      if (t > 0.3) A.linhasFoco(640, 330, 50, 'rgba(0,0,0,0.55)', t, 380);
      return;
    }
    const u = t - 1.6; A.tremor(u, 3, 3);
    A.fundo('vila', lerp(1.05, 1.0, u / 5.4), 0.55, 0.4);
    fumaca(u, [[620, 280], [790, 300], [960, 270]]);
    passaros(u);
    A.tinge('#ff6a40', seg(u, 0.3, 4) * 0.45); A.vinheta(0.5, '40,0,0');
    A.falas(t, [[2.0, 6.9, 'Mestre Borin', 'Esse som... É o chifre de guerra de Hrimgard! Os vikings!', COR.borin]]);
  });

  // ---------------- 8. O ataque: Aren salva Lina ----------------
  cena(15, [['fogo', 0, 15, 0.4], ['gritos', 0.3, 3, 0.25], ['passos', 0.2, 3.5, 0.3], ['whoosh', 7.0, 0.6, 0.7], ['whoosh', 8.45, 0.3, 0.8], ['clang', 8.7, 1.4, 1], ['corte', 10.5, 1, 0.8], ['impacto', 11.2, 0.7, 0.7]], t => {
    const X = A.X;
    if (t < 7) {
      if (t > 4) A.tremor(t - 4, 3, 1);
      A.fundo('fogo', lerp(1.1, 1.2, t / 7), 0.5, 0.62); A.particulas('brasa', t, 60);
      // vikings correndo do fundo
      for (let i = 0; i < 4; i++) {
        const k = cl((t - i * 0.35) / 3.5); if (k <= 0) continue;
        const x = 200 + i * 290 + (i % 2 ? 1 : -1) * k * 50;
        A.cel('viking_ataca', x, lerp(470, 640, k) + anda(t + i, 1.3) * 0.5, lerp(120, 330, k), { tint: ['#1a0604', 0.7], flip: i % 2 === 0, alpha: Math.min(1, k * 3), resp: 0 });
      }
      if (t > 3.6) {
        A.cel('lina_medo', 520, 712, 330, { vento: 1.2 });
        const k = easeOut(seg(t, 3.9, 5.2));
        A.cel('viking_ataca', lerp(1450, 960, k), 716 + (k < 1 ? anda(t, 1.4) : 0), 610, { vento: 0.8 });
      }
      A.vinheta(0.55, '30,0,0');
      A.falas(t, [[0.4, 3.4, null, 'Os vikings de Hrimgard invadem a vila!'], [4.4, 5.7, 'Viking', 'Hahaha! Uma presa fácil!', COR.viking], [5.8, 7, 'Lina', 'Socorro!!', COR.lina]]);
    } else if (t < 8.6) {
      const u = t - 7;
      A.linhasVelocidade(u, '#5a1008', '#f0a050');
      const x = lerp(-200, 900, ease(u / 1.6));
      for (let j = 3; j >= 1; j--) A.cel('aren_corre', x - j * 110, 600, 430, { sil: '#ffe0b0', alpha: 0.16 * (4 - j), resp: 0, vento: 0 });
      A.cel('aren_corre', x, 600, 430, { vento: 2, resp: 0 });
      A.falas(t, [[7.05, 8.6, 'Aren', 'LINAAAA!', COR.aren]]);
    } else if (t < 10.4) {
      if (t > 8.7) A.tremor(t - 8.7, 18, 1);
      A.fundo('fogo', 1.25, 0.5, 0.75); A.particulas('brasa', t, 50);
      const desce = seg(t, 8.6, 8.75);
      A.cel('viking_ataca', 900, 716, 620, { rot: desce * 0.35, vento: 0.6 });
      A.cel('aren_defende', 600, 708, AREN * 1.04, { vento: 1.4 });
      A.estouro('faisca', 720, 300, t - 8.72, 40, 7);
      if (t > 8.7 && t < 8.86) { A.impacto(); A.linhasFoco(720, 300, 70, '#000', t, 120); }
      A.vinheta(0.5, '30,0,0');
    } else if (t < 12.4) {
      A.tremor(t - 10.4, 8, 1);
      A.fundo('fogo', 1.25, 0.5, 0.75); A.particulas('brasa', t, 50);
      const voa = easeOut(seg(t, 10.55, 11.6));
      A.cel('viking_ataca', lerp(900, 1500, voa), 716 - Math.sin(voa * Math.PI) * 180, 620, { rot: voa * 2.2, resp: 0 });
      A.cel('aren_golpe', 640, 708, AREN * 0.86, { vento: 1.6 });
      A.corte(760, 420, 280, Math.PI * 1.15, Math.PI * 0.15, (t - 10.5) / 0.45);
      A.estouro('poeira', 1150, 700, t - 11.3, 24, 3);
      A.vinheta(0.5, '30,0,0');
    } else {
      A.fundo('fogo', 1.2, 0.45, 0.72); A.particulas('brasa', t, 50);
      A.cel('lina_medo', 330, 714, 320, { vento: 1.2 });
      A.cel('aren_pe', 780, 712, AREN, { vento: 1.6 });
      A.vinheta(0.5, '30,0,0');
      A.falas(t, [[12.5, 14.9, 'Aren', 'Fique atrás de mim, Lina!', COR.aren]]);
    }
  });

  // ---------------- 9. O berserker ----------------
  cena(8, [['fogo', 0, 8, 0.4], ['whoosh', 0.3, 0.6, 0.6], ['impacto', 0.9, 1.1, 1], ['rugido', 2.6, 2.6, 0.9]], t => {
    if (t < 2.5) {
      if (t > 0.9) A.tremor(t - 0.9, 20, 1.2);
      A.fundo('fogo', 1.2, 0.5, 0.7); A.particulas('brasa', t, 50);
      const k = seg(t, 0.2, 0.9);
      A.cel('aren_defende', 360, 712, AREN * 1.04, { vento: 1.4 });
      A.cel('berserker_pe', 900, lerp(-120, 724, k * k), 660, { vento: 1.2 });
      A.estouro('poeira', 900, 712, t - 0.9, 30, 5); A.estouro('faisca', 900, 712, t - 0.9, 20, 6);
      A.vinheta(0.55, '30,0,0');
    } else {
      const u = t - 2.5; A.tremor(u, 8, 5.5);
      A.X.fillStyle = '#5a0a08'; A.X.fillRect(0, 0, W, H);
      A.linhasFoco(640, 320, 90, 'rgba(255,190,120,0.55)', u, 300);
      A.particulas('brasa', u, 40);
      A.rosto('berserker_rosto', { zoom: 1.04 + Math.sin(u * 30) * 0.004, vento: 1.2, dy: 10 });
      A.vinheta(0.6);
      A.falas(t, [[2.7, 7.8, 'Berserker', 'HAHAHA! Um filhote com espada! Isso vai ser divertido!', COR.berserker]]);
    }
  });

  // ---------------- 10. A primeira troca: Aren é derrubado; Borin cai ----------------
  cena(10, [['fogo', 0, 10, 0.4], ['whoosh', 0.2, 0.4, 0.6], ['whoosh', 1.35, 0.3, 0.9], ['clang', 1.6, 1.4, 1], ['arrasta', 2.2, 1.2, 0.5], ['risada', 3.9, 2, 0.6], ['passos', 7.0, 0.9, 0.4], ['impacto', 8.1, 0.8, 0.9]], t => {
    if (t > 1.6 && t < 2.6) A.tremor(t - 1.6, 22, 1);
    if (t > 8.1 && t < 9) A.tremor(t - 8.1, 14, 0.9);
    A.fundo('fogo', 1.25, 0.5, 0.75); A.particulas('brasa', t, 50);
    // o berserker: ergue, desce o machado, ri, anda; depois acerta o Borin
    const rot = t < 1.3 ? -0.08 : t < 1.6 ? lerp(-0.08, 0.5, seg(t, 1.3, 1.6)) : t < 2.4 ? 0.5 : t < 7.6 ? lerp(0.5, 0, seg(t, 2.4, 2.8)) + Math.sin(t * 6) * 0.03 : t < 8.1 ? lerp(0, -0.2, seg(t, 7.6, 8.1)) : lerp(0.55, 0.3, seg(t, 8.1, 9));
    const bx = t < 3.6 ? 880 : lerp(880, 820, seg(t, 3.6, 6.5));
    A.cel('berserker_pe', bx, 724, 660, { rot, vento: 1.1 });
    if (t < 1.3) A.cel('aren_prepara', lerp(260, 560, ease(seg(t, 0, 1))), 708, AREN * 1.12, { vento: 1.4 });
    else if (t < 2.2) A.cel('aren_defende', 600, 708, AREN * 1.04, { vento: 1.4 });
    else { const k = easeOut(seg(t, 2.2, 3.2)); A.cel('aren_joelho', lerp(600, 260, k), 710, AREN * 0.84, { vento: 1.2 });
      if (t < 3.4) for (let i = 0; i < 6; i++) { A.X.fillStyle = 'rgba(120,90,70,0.35)'; A.X.beginPath(); A.X.arc(lerp(600, 260, k) + 60 + i * 34, 700 - A.R(i) * 10, 16 + i * 3, 0, 7); A.X.fill(); } }
    if (t > 1.3 && t < 1.7) A.corte(760, 330, 260, Math.PI * 1.35, Math.PI * 0.6, (t - 1.3) / 0.35, '255,220,180');
    A.estouro('faisca', 700, 280, t - 1.6, 40, 8);
    if (t > 1.6 && t < 1.76) { A.impacto(); A.linhasFoco(700, 280, 70, '#000', t, 120); }
    // Borin entra correndo e é arremessado
    if (t > 6.9) {
      const k = seg(t, 6.9, 8.1), voa = easeOut(seg(t, 8.1, 9.2));
      const x = t < 8.1 ? lerp(-120, 520, k) : lerp(520, -300, voa), y = t < 8.1 ? 718 + anda(t, 1.5) : 718 - Math.sin(voa * Math.PI) * 220;
      A.cel('borin_pe', x, y, 470, { flip: true, rot: t < 8.1 ? 0.12 : -voa * 2.4, resp: 0 });
      A.estouro('faisca', 560, 470, t - 8.1, 30, 9);
    }
    A.vinheta(0.55, '30,0,0');
    A.falas(t, [[3.9, 6.4, 'Berserker', 'Fraco! Igual a todo sulista!', COR.berserker], [6.9, 8.1, 'Mestre Borin', 'Saia de perto dele, besta!', COR.borin], [8.6, 10, 'Aren', 'MESTRE BORIN!!', COR.aren]]);
  });

  // ---------------- 11. A virada: a runa desperta ----------------
  cena(14, [['tensao', 0, 3.8, 0.5], ['runa', 3.2, 3.6, 0.7], ['carga', 6.3, 3.6, 0.8], ['vento', 6.5, 7.5, 0.5], ['drone', 10, 4, 0.35]], t => {
    const X = A.X;
    if (t < 4) {
      X.fillStyle = '#120404'; X.fillRect(0, 0, W, H);
      const luz = seg(t, 1.8, 3.8);
      if (luz > 0) { const g = X.createLinearGradient(0, H, 0, 0); g.addColorStop(0, `rgba(80,200,255,${0.6 * luz})`); g.addColorStop(1, 'rgba(0,40,120,0)'); X.fillStyle = g; X.fillRect(0, 0, W, H); A.linhasFoco(640, 330, 60, `rgba(150,230,255,${0.35 * luz})`, t, 320); }
      A.particulas('aura', t, luz > 0 ? 50 : 0, { area: [640, H, W] });
      A.rosto('aren_determinado', { tint: ['#000', 0.55 * (1 - luz)], vento: 0.8 + luz * 2, zoom: lerp(1.0, 1.08, seg(t, 0, 4)) });
      A.vinheta(0.5);
      A.falas(t, [[0.3, 2.0, 'Aren', 'Eu... não vou deixar...', COR.aren], [2.0, 3.9, 'Aren', 'você machucar mais ninguém!', COR.aren]]);
    } else if (t < 6.5) {
      const u = t - 4;
      X.fillStyle = '#0a1426'; X.fillRect(0, 0, W, H);
      const luz = 0.5 + 0.5 * Math.sin(u * 5);
      A.linhasFoco(640, 330, 40, `rgba(120,210,255,${0.2 + 0.2 * luz})`, u, 300);
      A.rosto('aren_mao', { zoom: lerp(1.0, 1.08, u / 2.5), vento: 0, desce: 40 });
      const g = X.createRadialGradient(640, 300, 0, 640, 300, 360); g.addColorStop(0, `rgba(120,220,255,${0.35 * luz})`); g.addColorStop(1, 'rgba(0,80,255,0)');
      X.save(); X.globalCompositeOperation = 'lighter'; X.fillStyle = g; X.fillRect(0, 0, W, H); X.restore();
      A.estouro('gelo', 640, 300, (u % 0.9), 20, Math.floor(u / 0.9));
      A.vinheta(0.6);
      A.falas(t, [[4.2, 6.4, 'Aren', 'Que luz é essa... na minha mão?!', COR.aren]]);
    } else if (t < 10) {
      const u = t - 6.5; A.tremor(u, 6, 3.5);
      A.fundo('fogo', 1.3, 0.45, 0.78, 'saturate(0.4) brightness(0.45)');
      A.tinge('#2a5aa0', 0.5, 'color');
      A.cel('aren_aura', 640, 722, AREN * 1.12, { aura: '#5ad0ff', auraF: 0.6 + 0.4 * Math.sin(u * 12), vento: 2.5, ventoAte: 0.55 });
      A.particulas('aura', u, 70, { area: [640, 720, 420] });
      A.vinheta(0.5, '0,10,40');
    } else {
      A.fundo('fogo', 1.25, 0.6, 0.75, 'brightness(0.7)');
      A.tinge('#3a7ad0', 0.35, 'color'); A.particulas('brasa', t, 30);
      A.cel('berserker_pe', 760, 724, 660, { vento: 1, tint: ['#5ab0ff', 0.18], rot: -0.05 + Math.sin(t * 20) * 0.01 });
      A.vinheta(0.5, '0,10,40');
      A.falas(t, [[10.2, 13.9, 'Berserker', 'Essa luz... a runa dos Guardiões?! Impossível!', COR.berserker]]);
    }
  });

  // ---------------- 12. O golpe final ----------------
  cena(9, [['whoosh', 0, 1, 1], ['corte', 1.0, 1.2, 1], ['quebra', 2.1, 0.8, 0.9], ['impacto', 2.4, 0.9, 1], ['fogo', 2.5, 6.5, 0.3]], t => {
    const X = A.X;
    if (t < 1) {
      A.linhasVelocidade(t, '#0a2a5a', '#5ab0f0');
      const x = lerp(-150, 1250, ease(t));
      for (let j = 3; j >= 1; j--) A.cel('aren_corre', x - j * 120, 600, 430, { sil: '#bff0ff', alpha: 0.18 * (4 - j), resp: 0, vento: 0 });
      A.cel('aren_corre', x, 600, 430, { aura: '#9ae8ff', vento: 2.4, resp: 0 });
      return;
    }
    if (t < 1.4) {
      const u = t - 1; X.fillStyle = u < 0.08 ? '#fff' : '#06121e'; X.fillRect(0, 0, W, H);
      A.corte(640, 900, 700, Math.PI * 1.1, Math.PI * 1.9, u / 0.4 * 0.8 + 0.1); A.linhasFoco(640, 360, 80, 'rgba(200,240,255,0.7)', u, 200);
      return;
    }
    if (t > 2.1 && t < 3.2) A.tremor(t - 2.1, 12, 1.1);
    A.fundo('fogo', 1.25, 0.5, 0.75); A.particulas('brasa', t, 50);
    if (t < 2.1) A.cel('berserker_pe', 400, 724, 660, { rot: -0.04, resp: 0, vento: 0.6 });
    else A.cel('berserker_caido', 420, 724, 300, { resp: 0.004, vento: 0.3 });
    A.estouro('poeira', 420, 700, t - 2.3, 30, 11);
    if (t < 5) A.cel('aren_corte', 900, 714, AREN * 0.86, { vento: 1.6, brilho: 0.25 * (1 - seg(t, 1.4, 4)) });
    else A.cel('aren_pe', 900, 712, AREN, { vento: 1, resp: 0.02, aura: '#5ad0ff', auraF: 0.4 * (1 - seg(t, 5, 7)) });
    if (t < 1.55) A.tinta('#fff', 0.8);
    A.vinheta(0.5, '30,0,0');
    A.falas(t, [[5.3, 7.3, 'Aren', 'Hah... hah... Consegui...?', COR.aren], [7.4, 9, 'Lina', 'Aren! Você... está brilhando!', COR.lina]]);
  });

  // ---------------- 13. O Jarl aparece ----------------
  cena(15, [['vento', 0, 15, 0.4], ['drone', 0, 5, 0.6], ['drone', 5, 5, 0.5], ['runa', 10.5, 3, 0.4]], t => {
    const X = A.X;
    if (t < 5 || t >= 10) {
      A.fundo('fogo', 1.2, 0.55, 0.35, 'saturate(0.5) brightness(0.55)');
      A.tinge('#3a6ab0', 0.55, 'color');
      A.particulas('neve', t, 100, { vento: 140 }); A.particulas('brasa', t, 25);
      const some = t >= 10 ? seg(t, 12.2, 14.5) : 0, k = easeOut(seg(t, 0, 1.5)) * (1 - some);
      A.cel('jarl_pe', 660, 700, 720, { alpha: 0.85 * k, tint: ['#9ad8ff', 0.35], vento: 1.6, ventoAte: 0.95 });
      if (some > 0) for (let i = 0; i < 90; i++) { const a = A.R(i) * 7, r = some * 520 * A.R(i * 3); X.fillStyle = `rgba(220,245,255,${1 - some})`; X.fillRect(660 + Math.cos(a + some * 4) * r, 360 + Math.sin(a + some * 4) * r * 0.6, 4, 4); }
      A.vinheta(0.65, '0,10,30');
      A.falas(t, [[0.6, 4.9, 'Jarl Hrafn', 'Então a Runa de Algiz despertou... num garoto do sul.', COR.jarl], [10.2, 13.8, 'Jarl Hrafn', '...eu mesmo virei buscar essa runa.', COR.jarl]]);
    } else {
      A.fundo('fogo', 1.6, 0.55, 0.3, 'blur(4px) saturate(0.4) brightness(0.4)'); A.tinge('#3a6ab0', 0.5, 'color');
      A.particulas('neve', t, 60, { vento: 100 });
      A.rosto('jarl_rosto', { zoom: lerp(1.0, 1.12, seg(t, 5, 10)), vento: 0.8, dy: 20 });
      const a = 0.6 + 0.4 * Math.sin(t * 7); X.save(); X.globalCompositeOperation = 'lighter';
      for (const ex of [585, 710]) { const g = X.createRadialGradient(ex, 225, 0, ex, 225, 55); g.addColorStop(0, `rgba(180,240,255,${a * 0.6})`); g.addColorStop(1, 'rgba(40,140,255,0)'); X.fillStyle = g; X.fillRect(ex - 55, 170, 110, 110); }
      X.restore(); A.vinheta(0.7, '0,8,30');
      A.falas(t, [[5.3, 7.6, 'Jarl Hrafn', 'Viva, pequeno guardião.', COR.jarl], [7.6, 9.9, 'Jarl Hrafn', 'Quando o inverno eterno chegar...', COR.jarl]]);
    }
    A.tinta('#000', seg(t, 14.4, 15));
  });

  // ---------------- 14. A fogueira e a lenda ----------------
  cena(32, [['crepita', 0, 32, 0.35], ['vento', 9, 8, 0.25]], t => {
    const fogueira = (z, cx, cy) => { A.fundo('fogueira', z, cx, cy); const [fx, fy] = A.noFundo(0.45 * 1536, 0.66 * 864); A.fogo(t, fx, fy, 1); A.particulas('brasa', t, 22); };
    if (t < 3) { fogueira(lerp(1.15, 1.05, t / 3), 0.45, 0.6); A.vinheta(0.55, '0,0,20'); }
    else if (t < 9) { A.fundo('fogueira', 2.0, 0.45, 0.4, 'blur(5px) brightness(0.6)'); A.fogo(t, 640, 720, 1.4); A.rosto('borin_rosto', { fala: A.falando(t, [[3.3, 6.2], [6.4, 8.8]]), vento: 0.6 }); A.vinheta(0.5, '0,0,20');
      A.falas(t, [[3.3, 6.2, 'Mestre Borin', 'A Runa de Algiz... a marca dos antigos Guardiões.', COR.borin], [6.4, 8.9, 'Mestre Borin', 'Eu achava que era só uma lenda de taverna.', COR.borin]]); }
    else if (t < 17) {
      const u = t - 9; A.fundo('lenda', lerp(1.25, 1.05, u / 8), lerp(0.35, 0.6, u / 8), 0.5); A.particulas('brilho', u, 40, { cor: '200,230,255' });
      A.vinheta(0.6, '30,15,0');
      A.falas(t, [[9.3, 13.2, 'Mestre Borin', 'Há mil anos, os Guardiões das Runas selaram os Gigantes do Gelo no extremo norte.', COR.borin], [13.4, 16.9, 'Mestre Borin', 'Se a runa escolheu você... o selo está enfraquecendo.', COR.borin]]);
    }
    else if (t < 21) { A.fundo('fogueira', 2.0, 0.6, 0.4, 'blur(5px) brightness(0.6)'); A.fogo(t, 300, 720, 1.4); A.rosto('aren_triste', { fala: A.falando(t, [[17.3, 20.8]]), vento: 0.5 }); A.vinheta(0.5, '0,0,20');
      A.falas(t, [[17.3, 20.9, 'Aren', 'A vila foi atacada... por minha causa?', COR.aren]]); }
    else if (t < 25.5) { A.fundo('fogueira', 2.0, 0.3, 0.4, 'blur(5px) brightness(0.6)'); A.fogo(t, 980, 720, 1.4); A.rosto('lina_triste', { fala: A.falando(t, [[21.3, 25.2]]), vento: 0.6 }); A.vinheta(0.5, '0,0,20');
      A.falas(t, [[21.3, 25.3, 'Lina', 'Não! Você salvou todos nós, Aren. Eu vi.', COR.lina]]); }
    else if (t < 29) { A.fundo('fogueira', 2.0, 0.6, 0.35, 'blur(5px) brightness(0.6)'); A.fogo(t, 300, 720, 1.4); A.rosto('aren_rosto', { tint: ['#ff7a2a', 0.22], fala: A.falando(t, [[25.7, 28.9]]), vento: 0.9 }); A.vinheta(0.5, '0,0,20');
      A.falas(t, [[25.7, 27.4, 'Aren', 'Então eu vou para o Norte.', COR.aren], [27.4, 29, 'Aren', 'Vou descobrir a verdade sobre esta runa!', COR.aren]]); }
    else { fogueira(1.05, 0.45, 0.6); A.vinheta(0.55, '0,0,20');
      A.falas(t, [[29.1, 31.9, 'Mestre Borin', 'Não vai sozinho, garoto. Este velho anão ainda tem um martelo.', COR.borin]]); }
    A.tinta('#000', 1 - seg(t, 0, 0.8)); A.tinta('#000', seg(t, 31.4, 32));
  });

  // ---------------- 15. A partida ----------------
  cena(17, [['vento', 0, 17, 0.3], ['passaros', 1, 8, 0.1], ['brilho', 10.2, 1.2, 0.4]], t => {
    const X = A.X;
    A.fundo('colina', lerp(1.25, 1.02, ease(seg(t, 0, 9))), 0.62, lerp(0.55, 0.6, t / 17));
    X.save(); for (let i = 0; i < 90; i++) { const x = A.R(i) * W, h = 60 + A.R(i * 3) * 90, b = Math.sin(t * 2.5 + i * 0.3) * 18 + 14; X.strokeStyle = A.R(i * 5) > 0.5 ? '#3a6a2a' : '#5a8a3a'; X.lineWidth = 4; X.beginPath(); X.moveTo(x, H + 10); X.quadraticCurveTo(x + b * 0.4, H - h / 2, x + b, H - h); X.stroke(); } X.restore();
    A.cel('aren_costas', 470, 790, 640, { vento: 2.4, ventoAte: 0.5 });
    A.cel('lina_pe', 820, 780, 560, { vento: 1.8, fase: 2, flip: true });
    A.cel('borin_pe', 1060, 786, 470, { vento: 1, fase: 1, flip: true });
    A.particulas('brilho', t, 30);
    A.vinheta(0.45, '20,0,40');
    A.falas(t, [[0.4, 3.6, 'Lina', 'E nem pense em me deixar para trás!', COR.lina], [3.8, 6.6, 'Mestre Borin', 'Hmpf. Alguém precisa cuidar de vocês dois.', COR.borin], [6.8, 9.6, 'Aren', 'Então vamos... Para o Norte!', COR.aren]]);
    const k = seg(t, 10.2, 10.8);
    if (k > 0) {
      X.save(); X.globalAlpha = k; X.fillStyle = 'rgba(0,0,0,0.35)'; X.fillRect(0, 250, W * easeOut(k), 170);
      X.font = 'italic bold 78px "DejaVu Serif", Georgia, serif'; X.textAlign = 'center'; X.lineWidth = 10; X.strokeStyle = '#1a0a20'; X.lineJoin = 'round';
      X.strokeText('Continua...', W / 2, 345); X.fillStyle = '#ffe6a0'; X.fillText('Continua...', W / 2, 345);
      X.font = 'bold 28px "DejaVu Sans", Arial, sans-serif'; X.lineWidth = 6; X.strokeText('Próximo capítulo: A Geleira Eterna', W / 2, 395); X.fillStyle = '#d8ecff'; X.fillText('Próximo capítulo: A Geleira Eterna', W / 2, 395);
      X.restore();
    }
    A.tinta('#000', seg(t, 16.2, 17));
  });

  // ---------------- trilha (notação ABC, tocada pelo sintetizador do jogo) ----------------
  const trilha = {
    ABC: {
      a_tema: `X:1\nT:O Chifre do Norte\nM:4/4\nL:1/8\nQ:1/4=132\nK:Dm\n"Dm"D2 A2 F2 E2 | "Bb"D2 F2 B4 | "C"c2 B2 A2 G2 | "A"A6 z2 |\n"Dm"d2 c2 A2 F2 | "Bb"G2 A2 B4 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 |]`,
      a_frio: `X:2\nT:Hrimgard\nM:4/4\nL:1/8\nQ:1/4=60\nK:Am\n"Am"E4 A4 | "F"c4 B4 | "G"A4 G2 E2 | "Am"E8 | "F"F4 A4 | "C"G4 E4 | "E"^G4 B4 | "Am"A8 |]`,
      a_vila: `X:3\nT:Manhã na Vila\nM:6/8\nL:1/8\nQ:3/8=84\nK:G\n"G"G2A B2d | "C"e2d c2B | "D"A2B c2A | "G"B3 G3 | "Em"E2G B2e | "C"c2e "D"d2c | "G"B2G "D"A2F | "G"G6 |]`,
      a_perigo: `X:4\nT:O Chifre Soou\nM:4/4\nL:1/8\nQ:1/4=112\nK:Dm\n"Dm"D2 D2 F2 D2 | "Bb"D2 D2 G2 F2 | "C"E2 E2 G2 E2 | "A"^C4 E4 | "Dm"d2 c2 A2 F2 | "Gm"G2 B2 d2 B2 | "A"A2 G2 F2 E2 | "A"^C8 |]`,
      a_luta: `X:5\nT:Aren contra o Berserker\nM:4/4\nL:1/8\nQ:1/4=152\nK:Dm\n|:"Dm"d2 d2 c2 A2 | "Bb"B2 B2 A2 F2 | "C"G2 G2 F2 E2 | "A"E4 ^C4 | "Dm"D2 F2 A2 d2 | "Bb"f2 e2 d2 B2 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 :|`,
      a_runa: `X:6\nT:A Runa Desperta\nM:4/4\nL:1/8\nQ:1/4=76\nK:Dm\n"Dm"D4 F4 | "Bb"B4 d4 | "C"c4 e4 | "A"^c8 | "Dm"d4 f4 | "Bb"f4 d4 | "C"e4 g4 | "D"^f8 |]`,
      a_fogueira: `X:7\nT:Histórias da Fogueira\nM:3/4\nL:1/8\nQ:1/4=80\nK:Em\n"Em"E2 G2 B2 | "C"c4 B2 | "D"A2 F2 D2 | "Em"E6 | "G"G2 A2 B2 | "C"e4 d2 | "B7"B2 A2 ^D2 | "Em"E6 |]`,
      a_fim: `X:8\nT:Rumo ao Norte\nM:4/4\nL:1/8\nQ:1/4=84\nK:Dm\n"Dm"D2 A2 F2 E2 | "Bb"D2 F2 B4 | "C"c2 B2 A2 G2 | "A"A6 z2 |\n"Dm"d2 c2 A2 F2 | "Bb"G2 A2 B4 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 |]`
    },
    ARR: {
      a_tema: { lead: 'square', acc: 'drive', pad: true, bass: true, drums: true, vol: 0.06 },
      a_frio: { lead: 'flute', acc: 'pad', bass: false, vol: 0.07 },
      a_vila: { lead: 'pluck', acc: 'arp', bass: true, vol: 0.09 },
      a_perigo: { lead: 'square', acc: 'drive', pad: true, bass: true, vol: 0.055 },
      a_luta: { lead: 'square', acc: 'drive', pad: true, bass: true, drums: true, vol: 0.06 },
      a_runa: { lead: 'flute', acc: 'pad', arp: true, bass: true, vol: 0.085 },
      a_fogueira: { lead: 'pluck', acc: 'arp', bass: true, vol: 0.08 },
      a_fim: { lead: 'flute', acc: 'pad', arp: true, bass: true, vol: 0.08 }
    },
    // [modo, duração] seguindo as cenas
    plano: [['a_frio', 14], ['a_tema', 5], ['a_vila', 41], ['a_perigo', 22], ['a_luta', 18], ['a_runa', 14], ['a_luta', 9], ['a_frio', 15], ['a_fogueira', 32], ['a_fim', 17]]
  };

  const ARTE = ['vila', 'hrimgard', 'fogo', 'colina', 'fogueira', 'lenda', 'aren_pe', 'aren_prepara', 'aren_golpe', 'aren_rosto', 'aren_choque', 'aren_corre', 'aren_defende', 'aren_joelho', 'aren_aura', 'aren_corte', 'aren_costas', 'aren_mao', 'aren_determinado', 'aren_triste',
    'lina_pe', 'lina_rosto', 'lina_medo', 'lina_triste', 'borin_pe', 'borin_rosto', 'viking_ataca', 'berserker_pe', 'berserker_rosto', 'berserker_caido', 'jarl_pe', 'jarl_rosto'];
  Anime.registrar({
    id: 'ep1', titulo: 'Capítulo 1', subtitulo: 'O Chifre do Norte', capa: 'aren_rosto',
    sinopse: 'Numa manhã comum, o chifre de guerra de Hrimgard soa e os vikings da geleira atacam a vila de Aren. Para proteger Lina e o mestre Borin, ele enfrenta um berserker... e uma runa antiga desperta na sua mão.',
    arte: ARTE, cenas, deixas: deixas.sort((a, b) => a[1] - b[1]), trilha
  });
})();
