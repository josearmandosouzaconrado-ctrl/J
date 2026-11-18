// Sons sintetizados (sem arquivos): tiros, metralhadora, canhão, artilharia, explosões, motor.
let ctx = null;
let mestre = null;
let ruido = null;
export let somLigado = true;

export function iniciarAudio() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  try {
    ctx = new (window.AudioContext || window.webkitAudioContext)();
    mestre = ctx.createGain();
    mestre.gain.value = 0.5;
    mestre.connect(ctx.destination);
    const n = ctx.sampleRate * 2;
    ruido = ctx.createBuffer(1, n, ctx.sampleRate);
    const d = ruido.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = Math.random() * 2 - 1;
  } catch (e) { ctx = null; }
}

export function alternarSom() {
  somLigado = !somLigado;
  if (mestre) mestre.gain.value = somLigado ? 0.5 : 0;
  return somLigado;
}

const ultimo = {};
const PERFIS = {
  tiro: { dur: 0.12, freq: 1800, q: 0.8, vol: 0.35, tipo: 'bandpass', min: 0.05 },
  mg: { dur: 0.07, freq: 1300, q: 0.7, vol: 0.3, tipo: 'bandpass', min: 0.06 },
  aa: { dur: 0.18, freq: 600, q: 0.7, vol: 0.45, tipo: 'bandpass', min: 0.12 },
  canhao: { dur: 0.6, freq: 300, q: 0.5, vol: 0.8, tipo: 'lowpass', min: 0.15 },
  artilharia: { dur: 1.2, freq: 180, q: 0.5, vol: 0.9, tipo: 'lowpass', min: 0.2 },
  explosao: { dur: 1.6, freq: 140, q: 0.4, vol: 1.0, tipo: 'lowpass', min: 0.12 },
};

// volume cai com a distância até a câmera (dist em metros)
export function tocar(nome, dist = 0) {
  if (!ctx || !somLigado) return;
  const p = PERFIS[nome];
  if (!p) return;
  const agora = ctx.currentTime;
  if (ultimo[nome] && agora - ultimo[nome] < p.min) return;
  const vol = p.vol / (1 + dist / 400);
  if (vol < 0.02) return;
  ultimo[nome] = agora;
  const src = ctx.createBufferSource();
  src.buffer = ruido;
  src.playbackRate.value = 0.8 + Math.random() * 0.4;
  const f = ctx.createBiquadFilter();
  f.type = p.tipo;
  f.frequency.value = p.freq;
  f.Q.value = p.q;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, agora);
  g.gain.exponentialRampToValueAtTime(0.001, agora + p.dur);
  src.connect(f).connect(g).connect(mestre);
  src.start(agora, Math.random());
  src.stop(agora + p.dur + 0.05);
}

// motor contínuo (modo piloto)
let motor = null;
export function motorAviao(ligado, rotacao = 1, jato = false) {
  if (!ctx) return;
  if (ligado && !motor) {
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 500;
    const g = ctx.createGain();
    g.gain.value = 0.08;
    o.connect(f).connect(g).connect(mestre);
    o.start();
    motor = { o, f, g };
  }
  if (!ligado && motor) {
    motor.o.stop();
    motor = null;
    return;
  }
  if (motor) {
    motor.o.frequency.value = (jato ? 140 : 55) * rotacao;
    motor.f.frequency.value = jato ? 2200 : 600;
  }
}
