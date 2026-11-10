// Sons gerados na hora (Web Audio), sem arquivos de áudio.
// Tiros em camadas (estalo supersônico, corpo, grave e eco da cidade), canhões, explosões,
// rotores de helicóptero, ronco de jatos e motores de blindados.
let ctx = null, mestre = null, eco = null, ruido = null, marrom = null, ligado = true;
const ultimo = {};
let heli = null, jato = null, motor = null;

export function iniciarSom() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -14; comp.knee.value = 10; comp.ratio.value = 6; comp.attack.value = 0.003; comp.release.value = 0.25;
  comp.connect(ctx.destination);
  mestre = ctx.createGain();
  mestre.gain.value = ligado ? 0.6 : 0;
  mestre.connect(comp);
  const sr = ctx.sampleRate;
  // ruído branco e marrom
  ruido = ctx.createBuffer(1, sr * 2, sr);
  marrom = ctx.createBuffer(1, sr * 2, sr);
  const w = ruido.getChannelData(0), b = marrom.getChannelData(0);
  let ult = 0;
  for (let i = 0; i < w.length; i++) {
    w[i] = Math.random() * 2 - 1;
    ult = (ult + 0.02 * w[i]) / 1.02;
    b[i] = ult * 3.5;
  }
  // eco da cidade (reverberação gerada)
  const dur = 2.4, ir = ctx.createBuffer(2, sr * dur, sr);
  for (let c = 0; c < 2; c++) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < d.length; i++) {
      const t = i / sr;
      // primeiras reflexões nos prédios + cauda
      const refl = (t > 0.06 && t < 0.075) || (t > 0.13 && t < 0.14) || (t > 0.21 && t < 0.22) ? 0.6 : 0;
      d[i] = (Math.random() * 2 - 1) * (Math.exp(-t * 2.6) * 0.5 + refl * Math.exp(-t * 3));
    }
  }
  const conv = ctx.createConvolver();
  conv.buffer = ir;
  eco = ctx.createGain();
  eco.gain.value = 0.45;
  eco.connect(conv); conv.connect(mestre);
}
export function somLigado(v) { ligado = v; if (mestre) mestre.gain.value = v ? 0.6 : 0; }

function limitar(chave, ms) {
  const agora = performance.now();
  if (ultimo[chave] && agora - ultimo[chave] < ms) return false;
  ultimo[chave] = agora;
  return true;
}

// rajada de ruído filtrado com envelope; send = quanto vai para o eco
function rajada(vol, ataque, dur, freq, q, tipo = 'lowpass', send = 0.2, atraso = 0, buf = ruido, freqFim = 0) {
  if (!ctx || !ligado || vol < 0.005) return;
  const t = ctx.currentTime + atraso;
  const s = ctx.createBufferSource();
  s.buffer = buf;
  s.playbackRate.value = 0.9 + Math.random() * 0.2;
  const f = ctx.createBiquadFilter();
  f.type = tipo; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
  if (freqFim) f.frequency.exponentialRampToValueAtTime(freqFim, t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + ataque);
  g.gain.exponentialRampToValueAtTime(0.0001, t + ataque + dur);
  s.connect(f); f.connect(g); g.connect(mestre);
  if (send > 0) { const e = ctx.createGain(); e.gain.value = send; g.connect(e); e.connect(eco); }
  s.start(t, Math.random() * 1.2, ataque + dur + 0.05);
}
function tom(vol, dur, f0, f1, tipo = 'sine', atraso = 0, send = 0.15) {
  if (!ctx || !ligado || vol < 0.005) return;
  const t = ctx.currentTime + atraso;
  const o = ctx.createOscillator();
  o.type = tipo;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(15, f1), t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  o.connect(g); g.connect(mestre);
  if (send > 0) { const e = ctx.createGain(); e.gain.value = send; g.connect(e); e.connect(eco); }
  o.start(t); o.stop(t + dur + 0.05);
}

// ---------------- armas ----------------
// vol: 0..1 já com a distância aplicada (longe = mais abafado e mais eco)
export function somTiro(arma, vol) {
  if (!ctx || vol < 0.015) return;
  const longe = 1 - vol;                      // distância relativa
  const brilho = 1 - longe * 0.75;           // tiros longe perdem os agudos
  const r = 0.92 + Math.random() * 0.16;
  switch (arma) {
    case 'pistola':
      if (!limitar('pist', 60)) return;
      rajada(vol * 0.5 * brilho, 0.001, 0.03, 3200 * r, 0.7, 'highpass', 0.1);
      rajada(vol * 0.45, 0.002, 0.09, 1400 * r, 1.2, 'bandpass', 0.3);
      tom(vol * 0.25, 0.06, 260, 90);
      break;
    case 'fuzil':
      if (!limitar('fuzil', 40)) return;
      rajada(vol * 0.7 * brilho, 0.001, 0.025, 4200 * r, 0.6, 'highpass', 0.15);   // estalo
      rajada(vol * 0.55, 0.002, 0.1, 1100 * r, 1.1, 'bandpass', 0.35);               // corpo
      tom(vol * 0.35, 0.08, 200 * r, 70);                                            // grave
      rajada(vol * 0.18, 0.01, 0.45, 900, 0.7, 'lowpass', 0.9, 0.02);               // cauda
      break;
    case 'mg': case 'm240':
      if (!limitar('mg', 38)) return;
      rajada(vol * 0.6 * brilho, 0.001, 0.022, 3600 * r, 0.6, 'highpass', 0.12);
      rajada(vol * 0.55, 0.002, 0.09, 900 * r, 1.0, 'bandpass', 0.35);
      tom(vol * 0.35, 0.07, 170 * r, 60);
      if (Math.random() < 0.4) rajada(vol * 0.15, 0.01, 0.4, 800, 0.7, 'lowpass', 0.9, 0.02);
      break;
    case 'm134':
      if (!limitar('m134', 30)) return;
      rajada(vol * 0.5, 0.001, 0.05, 1500 * r, 0.8, 'bandpass', 0.3);
      tom(vol * 0.25, 0.05, 140, 70, 'square');
      break;
    case 'sniper':
      if (!limitar('sn', 80)) return;
      rajada(vol * 0.95 * brilho, 0.001, 0.03, 3800, 0.6, 'highpass', 0.2);
      rajada(vol * 0.8, 0.002, 0.18, 700, 0.9, 'bandpass', 0.5);
      tom(vol * 0.6, 0.22, 140, 38);
      rajada(vol * 0.35, 0.02, 1.4, 600, 0.6, 'lowpass', 1.2, 0.05);              // eco entre os prédios
      break;
    case '50cal':
      if (!limitar('50', 55)) return;
      rajada(vol * 0.7 * brilho, 0.001, 0.03, 2800 * r, 0.6, 'highpass', 0.2);
      rajada(vol * 0.75, 0.003, 0.16, 520 * r, 1.0, 'bandpass', 0.45);
      tom(vol * 0.55, 0.14, 110 * r, 38);
      if (Math.random() < 0.5) rajada(vol * 0.2, 0.01, 0.6, 500, 0.6, 'lowpass', 1.0, 0.03);
      break;
    case '25mm': case '30mm':
      if (!limitar('ac', 90)) return;
      rajada(vol * 0.7 * brilho, 0.001, 0.035, 2400, 0.6, 'highpass', 0.2);
      rajada(vol * 0.85, 0.003, 0.22, 380 * r, 0.9, 'bandpass', 0.5);
      tom(vol * 0.7, 0.2, 90 * r, 30);
      rajada(vol * 0.25, 0.02, 0.8, 400, 0.6, 'lowpass', 1.0, 0.04, marrom);
      break;
    case '120mm': case '155mm': case 'naval':
      if (!limitar('can', 120)) return;
      // estrondo do canhão: estalo, bafo de pressão, grave longo e eco atrasado
      rajada(vol * 0.9 * brilho, 0.001, 0.05, 2000, 0.5, 'highpass', 0.3);
      rajada(vol * 1.2, 0.004, 0.9, 260, 0.7, 'lowpass', 0.9, 0, marrom, 90);
      tom(vol * 1.1, 1.1, 75, 24);
      tom(vol * 0.5, 0.5, 140, 45, 'triangle');
      rajada(vol * 0.45, 0.05, 2.0, 300, 0.6, 'lowpass', 1.4, 0.32, marrom);
      rajada(vol * 0.25, 0.05, 1.6, 250, 0.6, 'lowpass', 1.4, 0.75, marrom);
      break;
    case 'foguete': case 'hellfire':
      if (!limitar('fog', 110)) return;
      rajada(vol * 0.8, 0.005, 0.15, 600, 0.6, 'lowpass', 0.4, 0, marrom);
      rajada(vol * 0.6, 0.06, 0.9, 500, 1.4, 'bandpass', 0.6, 0, ruido, 2600);   // assobio subindo
      tom(vol * 0.4, 0.4, 90, 40);
      break;
    case 'bomba':
      if (!limitar('bmb', 150)) return;
      tom(vol * 0.18, 1.2, 1400, 500, 'sine', 0, 0.3);                           // assobio da queda
      break;
    default:
      if (!limitar('def', 100)) return;
      rajada(vol * 0.6, 0.002, 0.2, 700, 0.9, 'bandpass', 0.4);
  }
}

export function somExplosao(vol, grande = false) {
  if (!ctx || vol < 0.015 || !limitar('exp', 60)) return;
  const k = grande ? 1.3 : 1;
  rajada(vol * 0.8, 0.001, 0.06, 1800, 0.5, 'highpass', 0.3);                     // estalo
  rajada(vol * 1.3 * k, 0.005, 1.4 * k, 420, 0.6, 'lowpass', 1.0, 0, marrom, 70); // bola de fogo
  tom(vol * 1.1 * k, 1.3 * k, 62, 18);                                            // pressão no peito
  // estilhaços caindo
  for (let i = 0; i < 6; i++) rajada(vol * 0.12, 0.002, 0.05, 3000 + Math.random() * 3000, 1, 'bandpass', 0.2, 0.15 + Math.random() * 0.7);
  rajada(vol * 0.4 * k, 0.1, 2.5, 220, 0.6, 'lowpass', 1.5, 0.35, marrom);        // eco
}

export function somVidro(vol) {
  if (!ctx || vol < 0.02 || !limitar('vidro', 120)) return;
  rajada(vol * 0.5, 0.001, 0.12, 4500, 0.8, 'highpass', 0.2);
  for (let i = 0; i < 9; i++) tom(vol * 0.08, 0.06 + Math.random() * 0.12, 2500 + Math.random() * 4000, 2000 + Math.random() * 3000, 'sine', 0.02 + Math.random() * 0.35, 0.1);
}

export function somEsmagar(vol) {
  if (!ctx || vol < 0.02 || !limitar('esm', 200)) return;
  rajada(vol * 0.8, 0.002, 0.35, 700, 1.5, 'bandpass', 0.3);
  tom(vol * 0.4, 0.25, 160, 60, 'square');
  for (let i = 0; i < 4; i++) tom(vol * 0.06, 0.1, 2000 + Math.random() * 2500, 1500, 'sine', 0.05 + Math.random() * 0.2, 0.05);
}

export function somZumbi(vol) {
  if (!ctx || vol < 0.03 || !limitar('zb', 700)) return;
  const t = ctx.currentTime;
  const f = 85 + Math.random() * 70;
  const o = ctx.createOscillator(); o.type = 'sawtooth';
  o.frequency.setValueAtTime(f, t); o.frequency.linearRampToValueAtTime(f * 0.75, t + 1.1);
  const vib = ctx.createOscillator(); vib.frequency.value = 6 + Math.random() * 4;
  const vg = ctx.createGain(); vg.gain.value = 6; vib.connect(vg); vg.connect(o.frequency);
  const f1 = ctx.createBiquadFilter(); f1.type = 'bandpass'; f1.frequency.value = 450 + Math.random() * 300; f1.Q.value = 4;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol * 0.35, t + 0.15); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
  o.connect(f1); f1.connect(g); g.connect(mestre);
  o.start(t); vib.start(t); o.stop(t + 1.25); vib.stop(t + 1.25);
  rajada(vol * 0.06, 0.1, 1.0, 800, 3, 'bandpass', 0.2);
}

export function somUI(tipo = 'clique') {
  if (!ctx) return;
  if (tipo === 'clique') tom(0.1, 0.05, 900, 700, 'square', 0, 0);
  else if (tipo === 'ok') { tom(0.12, 0.07, 660, 660, 'square', 0, 0); tom(0.12, 0.09, 990, 990, 'square', 0.07, 0); }
  else if (tipo === 'alerta') { tom(0.15, 0.15, 880, 880, 'square', 0, 0); tom(0.15, 0.15, 660, 660, 'square', 0.18, 0); }
  else if (tipo === 'erro') tom(0.13, 0.2, 220, 160, 'square', 0, 0);
  else if (tipo === 'resgate') { tom(0.1, 0.1, 523, 523, 'triangle', 0, 0); tom(0.1, 0.1, 659, 659, 'triangle', 0.1, 0); tom(0.1, 0.2, 784, 784, 'triangle', 0.2, 0); }
  else if (tipo === 'sirene') {
    const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = 'sawtooth';
    for (let i = 0; i < 3; i++) { o.frequency.setValueAtTime(700, t + i * 0.6); o.frequency.linearRampToValueAtTime(1300, t + i * 0.6 + 0.3); o.frequency.linearRampToValueAtTime(700, t + i * 0.6 + 0.6); }
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 2200;
    g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.07, t + 0.1); g.gain.setValueAtTime(0.07, t + 1.6); g.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
    o.connect(f); f.connect(g); g.connect(mestre); o.start(t); o.stop(t + 1.85);
  }
}

// ---------------- sons contínuos ----------------
function loop(buf, tipo, freq, q) {
  const s = ctx.createBufferSource(); s.buffer = buf; s.loop = true;
  const f = ctx.createBiquadFilter(); f.type = tipo; f.frequency.value = freq; f.Q.value = q;
  const g = ctx.createGain(); g.gain.value = 0;
  s.connect(f); f.connect(g); g.connect(mestre); s.start();
  return { f, g };
}
const alvoGanho = (g, v, k = 0.25) => g.gain.setTargetAtTime(ligado ? v : 0, ctx.currentTime, k);

// helicóptero: batida das pás (~17 vezes por segundo), vento do rotor e assobio da turbina
export function somHeli(v) {
  if (!ctx) return;
  if (!heli) {
    const pas = loop(ruido, 'bandpass', 320, 0.9);
    const lfo = ctx.createOscillator(); lfo.type = 'sawtooth'; lfo.frequency.value = 17;
    const lg = ctx.createGain(); lg.gain.value = 0;
    lfo.connect(lg); lg.connect(pas.g.gain); lfo.start();
    const vento = loop(marrom, 'lowpass', 160, 0.7);
    const tur = ctx.createOscillator(); tur.type = 'sine'; tur.frequency.value = 1750;
    const tg = ctx.createGain(); tg.gain.value = 0; tur.connect(tg); tg.connect(mestre); tur.start();
    heli = { pas, lg, vento, tg };
  }
  alvoGanho(heli.pas.g, v * 0.32);
  heli.lg.gain.setTargetAtTime(ligado ? v * 0.3 : 0, ctx.currentTime, 0.25);
  alvoGanho(heli.vento.g, v * 0.5);
  alvoGanho(heli.tg, v * v * 0.012);
}

// jato: ronco grave + chiado agudo; perto fica mais brilhante (efeito de passagem)
export function somJato(v) {
  if (!ctx) return;
  if (!jato) jato = { ronco: loop(marrom, 'lowpass', 300, 0.6), chiado: loop(ruido, 'bandpass', 1800, 0.7) };
  alvoGanho(jato.ronco.g, v * 0.9, 0.35);
  alvoGanho(jato.chiado.g, v * v * 0.35, 0.35);
  jato.ronco.f.frequency.setTargetAtTime(200 + v * 500, ctx.currentTime, 0.3);
  jato.chiado.f.frequency.setTargetAtTime(1200 + v * 2200, ctx.currentTime, 0.3);
}

// motor a diesel/turbina dos blindados
export function somMotor(v, rot = 0.5) {
  if (!ctx) return;
  if (!motor) {
    const r = loop(marrom, 'lowpass', 140, 0.8);
    const o = ctx.createOscillator(); o.type = 'sawtooth'; o.frequency.value = 38;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 180;
    const g = ctx.createGain(); g.gain.value = 0;
    o.connect(f); f.connect(g); g.connect(mestre); o.start();
    motor = { r, o, g };
  }
  alvoGanho(motor.r.g, v * 0.6);
  alvoGanho(motor.g, v * 0.06);
  motor.o.frequency.setTargetAtTime(32 + rot * 30, ctx.currentTime, 0.4);
}
