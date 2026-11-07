// Sons gerados na hora (Web Audio), sem arquivos de áudio
let ctx = null, mestre = null, ruido = null, ligado = true;
let ultimo = {};
let heli = null;

export function iniciarSom() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  ctx = new AC();
  mestre = ctx.createGain();
  mestre.gain.value = 0.5;
  mestre.connect(ctx.destination);
  const n = ctx.sampleRate * 1.5;
  ruido = ctx.createBuffer(1, n, ctx.sampleRate);
  const d = ruido.getChannelData(0);
  for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
}
export function somLigado(v) { ligado = v; if (mestre) mestre.gain.value = v ? 0.5 : 0; }

function burst(vol, dur, freq, q = 1, tipo = 'lowpass', atraso = 0) {
  if (!ctx || !ligado || vol < 0.01) return;
  const t = ctx.currentTime + atraso;
  const s = ctx.createBufferSource();
  s.buffer = ruido;
  const f = ctx.createBiquadFilter();
  f.type = tipo; f.frequency.value = freq; f.Q.value = q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  s.connect(f); f.connect(g); g.connect(mestre);
  s.start(t, Math.random() * 1.0, dur + 0.05);
}
function tom(vol, dur, f0, f1, tipo = 'sine', atraso = 0) {
  if (!ctx || !ligado || vol < 0.01) return;
  const t = ctx.currentTime + atraso;
  const o = ctx.createOscillator();
  o.type = tipo;
  o.frequency.setValueAtTime(f0, t);
  o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + dur);
  o.connect(g); g.connect(mestre);
  o.start(t); o.stop(t + dur + 0.05);
}

function limitar(chave, ms) {
  const agora = performance.now();
  if (ultimo[chave] && agora - ultimo[chave] < ms) return false;
  ultimo[chave] = agora;
  return true;
}

// vol: 0..1 já com distância aplicada
export function somTiro(arma, vol) {
  if (vol < 0.02) return;
  switch (arma) {
    case 'fuzil': case 'pistola': if (limitar('fuzil', 45)) burst(vol * 0.35, 0.12, 2400, 0.7); break;
    case 'mg': case 'm134': case 'm240': if (limitar('mg', 40)) burst(vol * 0.35, 0.09, 1900, 0.8); break;
    case 'sniper': if (limitar('sn', 80)) { burst(vol * 0.6, 0.35, 1400, 0.6); } break;
    case '50cal': case '25mm': case '30mm': if (limitar('50', 60)) { burst(vol * 0.5, 0.18, 900, 0.8); tom(vol * 0.2, 0.12, 160, 60); } break;
    default: if (limitar('can', 120)) { burst(vol * 0.8, 0.6, 500, 0.7); tom(vol * 0.5, 0.4, 120, 35); }
  }
}
export function somExplosao(vol) {
  if (vol < 0.02 || !limitar('exp', 70)) return;
  burst(vol * 0.9, 1.2, 380, 0.6);
  tom(vol * 0.6, 0.8, 90, 25);
}
export function somZumbi(vol) {
  if (vol < 0.03 || !limitar('zb', 900)) return;
  const f = 90 + Math.random() * 60;
  tom(vol * 0.12, 0.9, f, f * 0.7, 'sawtooth');
  burst(vol * 0.08, 0.9, 500, 3, 'bandpass');
}
export function somUI(tipo = 'clique') {
  if (!ctx) return;
  if (tipo === 'clique') tom(0.12, 0.06, 900, 700, 'square');
  else if (tipo === 'ok') { tom(0.15, 0.08, 660, 660, 'square'); tom(0.15, 0.1, 990, 990, 'square', 0.08); }
  else if (tipo === 'alerta') { tom(0.18, 0.15, 880, 880, 'square'); tom(0.18, 0.15, 660, 660, 'square', 0.18); }
  else if (tipo === 'erro') tom(0.15, 0.2, 220, 160, 'square');
  else if (tipo === 'resgate') { tom(0.12, 0.1, 523, 523, 'triangle'); tom(0.12, 0.1, 659, 659, 'triangle', 0.1); tom(0.12, 0.2, 784, 784, 'triangle', 0.2); }
}
// motor de helicóptero contínuo: intensidade 0..1
export function somHeli(v) {
  if (!ctx) return;
  if (!heli) {
    const s = ctx.createBufferSource(); s.buffer = ruido; s.loop = true;
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 180;
    const g = ctx.createGain(); g.gain.value = 0;
    const lfo = ctx.createOscillator(); lfo.frequency.value = 17;
    const lg = ctx.createGain(); lg.gain.value = 0;
    lfo.connect(lg); lg.connect(g.gain);
    s.connect(f); f.connect(g); g.connect(mestre);
    s.start(); lfo.start();
    heli = { g, lg };
  }
  const alvo = ligado ? v * 0.5 : 0;
  heli.g.gain.setTargetAtTime(alvo, ctx.currentTime, 0.3);
  heli.lg.gain.setTargetAtTime(alvo * 0.8, ctx.currentTime, 0.3);
}
