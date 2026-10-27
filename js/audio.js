'use strict';
// ===================== ÁUDIO SINTETIZADO (efeitos + música procedural) =====================
const Sfx = {
  ctx: null, master: null, sfxGain: null, musicGain: null, noiseBuf: null,
  sfxOn: true, musicOn: true, sfxVol: 0.6, musicVol: 0.35,
  last: {}, mode: null, nextT: 0, step: 0, bar: 0,
  unlock() {
    if (this.ctx) { if (this.ctx.state === 'suspended') this.ctx.resume(); return; }
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain(); this.master.gain.value = 0.9; this.master.connect(this.ctx.destination);
      this.sfxGain = this.ctx.createGain(); this.sfxGain.gain.value = this.sfxOn ? this.sfxVol : 0; this.sfxGain.connect(this.master);
      this.musicGain = this.ctx.createGain(); this.musicGain.gain.value = this.musicOn ? this.musicVol : 0; this.musicGain.connect(this.master);
      const len = this.ctx.sampleRate * 1;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0); for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.reverb = this.ctx.createConvolver();
      const rl = this.ctx.sampleRate * 1.6, rb = this.ctx.createBuffer(2, rl, this.ctx.sampleRate);
      for (let c = 0; c < 2; c++) { const ch = rb.getChannelData(c); for (let i = 0; i < rl; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / rl, 2.5); }
      this.reverb.buffer = rb;
      this.revGain = this.ctx.createGain(); this.revGain.gain.value = 0.25; this.reverb.connect(this.revGain); this.revGain.connect(this.musicGain);
      setInterval(() => this.schedule(), 90);
    } catch (e) { console.warn('audio', e); }
  },
  setVolumes() {
    if (!this.ctx) return;
    this.sfxGain.gain.value = this.sfxOn ? this.sfxVol : 0;
    this.musicGain.gain.value = this.musicOn ? this.musicVol : 0;
  },
  tone(f, dur, type = 'square', vol = 0.2, slide = 0, delay = 0, dest) {
    const c = this.ctx, t = c.currentTime + delay;
    const o = c.createOscillator(), g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t);
    if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, f + slide), t + dur);
    g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    o.connect(g); g.connect(dest || this.sfxGain); o.start(t); o.stop(t + dur + 0.02);
  },
  noise(dur, vol = 0.2, freq = 1200, q = 1, delay = 0, type = 'bandpass', slide = 0) {
    const c = this.ctx, t = c.currentTime + delay;
    const s = c.createBufferSource(); s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter(); f.type = type; f.frequency.setValueAtTime(freq, t); f.Q.value = q;
    if (slide) f.frequency.exponentialRampToValueAtTime(Math.max(40, freq + slide), t + dur);
    const g = c.createGain(); g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
    s.connect(f); f.connect(g); g.connect(this.sfxGain); s.start(t, Math.random() * 0.5); s.stop(t + dur + 0.02);
  },
  play(name) {
    if (!this.ctx || !this.sfxOn) return;
    const now = this.ctx.currentTime;
    if (this.last[name] && now - this.last[name] < 0.045) return;
    this.last[name] = now;
    switch (name) {
      case 'swing': this.noise(0.12, 0.18, 2200, 0.8, 0, 'bandpass', -1500); break;
      case 'hit': this.noise(0.08, 0.3, 800, 1); this.tone(140, 0.08, 'square', 0.12, -60); break;
      case 'crit': this.noise(0.12, 0.35, 1400, 1); this.tone(220, 0.12, 'square', 0.15, -120); this.tone(660, 0.08, 'triangle', 0.1, 0, 0.02); break;
      case 'hurt': this.tone(200, 0.18, 'sawtooth', 0.15, -120); this.noise(0.1, 0.2, 500, 1); break;
      case 'block': this.tone(900, 0.12, 'square', 0.12, -300); this.noise(0.06, 0.2, 3000, 2); break;
      case 'shot': this.noise(0.25, 0.4, 1800, 0.6, 0, 'lowpass', -1200); this.tone(90, 0.2, 'sine', 0.25, -40); this.tone(1400, 0.08, 'square', 0.05, -900); break;
      case 'bow': this.tone(500, 0.12, 'triangle', 0.15, -300); this.noise(0.1, 0.12, 3000, 1); break;
      case 'spell': this.tone(400, 0.25, 'sine', 0.12, 500); this.tone(600, 0.2, 'triangle', 0.06, 700, 0.03); break;
      case 'zap': this.noise(0.15, 0.2, 4000, 3, 0, 'highpass'); this.tone(1200, 0.1, 'square', 0.06, -800); break;
      case 'fire': this.noise(0.3, 0.15, 600, 0.5, 0, 'lowpass', -300); break;
      case 'boom': this.noise(0.6, 0.45, 300, 0.7, 0, 'lowpass', -220); this.tone(80, 0.5, 'sine', 0.3, -50); break;
      case 'pickup': this.tone(880, 0.07, 'square', 0.08); this.tone(1320, 0.09, 'square', 0.07, 0, 0.06); break;
      case 'coin': this.tone(988, 0.08, 'square', 0.08); this.tone(1319, 0.2, 'square', 0.08, 0, 0.07); break;
      case 'equip': this.noise(0.08, 0.2, 2500, 2); this.tone(300, 0.06, 'square', 0.06); break;
      case 'drink': for (let i = 0; i < 3; i++) this.tone(300 + i * 80, 0.07, 'sine', 0.12, 120, i * 0.08); break;
      case 'eat': for (let i = 0; i < 3; i++) this.noise(0.05, 0.15, 900, 1, i * 0.09); break;
      case 'learn': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.25, 'triangle', 0.1, 0, i * 0.08)); break;
      case 'levelup': [392, 523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.35, 'square', 0.08, 0, i * 0.1)); break;
      case 'quest': [659, 784, 988].forEach((f, i) => this.tone(f, 0.3, 'triangle', 0.12, 0, i * 0.12)); break;
      case 'fail': this.tone(200, 0.15, 'square', 0.1, -80); break;
      case 'chest': this.tone(300, 0.1, 'square', 0.1, 100); [523, 784, 1047].forEach((f, i) => this.tone(f, 0.2, 'triangle', 0.1, 0, 0.12 + i * 0.07)); break;
      case 'door': this.noise(0.2, 0.2, 300, 1); this.tone(120, 0.15, 'square', 0.06, -30); break;
      case 'shout': this.noise(0.8, 0.4, 250, 0.6, 0, 'lowpass', 400); this.tone(110, 0.7, 'sawtooth', 0.2, -40); this.tone(55, 0.9, 'sine', 0.3); break;
      case 'roll': this.noise(0.18, 0.15, 900, 0.7, 0, 'bandpass', -600); break;
      case 'horse': this.noise(0.08, 0.2, 700, 2); this.noise(0.08, 0.2, 600, 2, 0.12); break;
      case 'death': [300, 250, 200, 150].forEach((f, i) => this.tone(f, 0.4, 'sawtooth', 0.1, -40, i * 0.18)); break;
      case 'dragon': this.noise(1.2, 0.4, 200, 0.5, 0, 'lowpass', 300); this.tone(70, 1.2, 'sawtooth', 0.25, 30); break;
      case 'harvest': this.noise(0.1, 0.2, 1800, 1); this.tone(700, 0.08, 'triangle', 0.08, 200, 0.05); break;
      case 'mine': this.tone(1800, 0.06, 'square', 0.1, -400); this.noise(0.12, 0.25, 2500, 2); break;
      case 'forge': for (let i = 0; i < 3; i++) { this.tone(1600, 0.1, 'square', 0.08, -600, i * 0.15); this.noise(0.08, 0.2, 3000, 2, i * 0.15); } break;
    }
  },
  // ---------- Música procedural ----------
  SCALES: {
    field: { root: 57, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 5, 2, 6], tempo: 92, lead: 'pluck', pad: true },
    night: { root: 52, scale: [0, 2, 3, 5, 7, 8, 10], prog: [0, 3, 5, 4], tempo: 70, lead: 'flute', pad: true },
    town: { root: 62, scale: [0, 2, 3, 5, 7, 9, 10], prog: [0, 3, 0, 4], tempo: 108, lead: 'pluck', pad: false, bass: true },
    dungeon: { root: 45, scale: [0, 1, 3, 5, 7, 8, 10], prog: [0, 1, 0, 6], tempo: 60, lead: 'flute', pad: true, sparse: true },
    battle: { root: 50, scale: [0, 2, 3, 5, 7, 8, 11], prog: [0, 5, 6, 4], tempo: 140, lead: 'square', bass: true, drums: true },
    boss: { root: 48, scale: [0, 1, 3, 5, 6, 8, 10], prog: [0, 1, 5, 6], tempo: 150, lead: 'square', bass: true, drums: true, pad: true },
    title: { root: 55, scale: [0, 2, 4, 5, 7, 9, 11], prog: [0, 5, 3, 4], tempo: 80, lead: 'flute', pad: true, bass: true }
  },
  setMusic(mode) { if (mode === this.mode) return; this.mode = mode; this.bar = 0; this.step = 0; },
  mtof(m) { return 440 * Math.pow(2, (m - 69) / 12); },
  inst(kind, f, t, dur, vol) {
    const c = this.ctx;
    const o = c.createOscillator(), g = c.createGain();
    let filt = null;
    if (kind === 'pluck') { o.type = 'triangle'; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.5); }
    else if (kind === 'flute') { o.type = 'sine'; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + 0.06); g.gain.setValueAtTime(vol, t + dur * 0.7); g.gain.exponentialRampToValueAtTime(0.001, t + dur * 1.2); const lfo = c.createOscillator(), lg = c.createGain(); lfo.frequency.value = 5; lg.gain.value = f * 0.008; lfo.connect(lg); lg.connect(o.frequency); lfo.start(t); lfo.stop(t + dur * 1.3); }
    else if (kind === 'square') { o.type = 'square'; vol *= 0.5; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); }
    else if (kind === 'bass') { o.type = 'triangle'; g.gain.setValueAtTime(vol, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur); }
    else if (kind === 'pad') { o.type = 'sawtooth'; filt = c.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = 700; g.gain.setValueAtTime(0.0001, t); g.gain.linearRampToValueAtTime(vol, t + dur * 0.3); g.gain.linearRampToValueAtTime(0.0001, t + dur); }
    o.frequency.setValueAtTime(f, t);
    if (filt) { o.connect(filt); filt.connect(g); } else o.connect(g);
    g.connect(this.musicGain); g.connect(this.reverb);
    o.start(t); o.stop(t + dur * 1.6);
  },
  drum(kind, t) {
    const c = this.ctx;
    if (kind === 'kick') { const o = c.createOscillator(), g = c.createGain(); o.frequency.setValueAtTime(120, t); o.frequency.exponentialRampToValueAtTime(40, t + 0.15); g.gain.setValueAtTime(0.35, t); g.gain.exponentialRampToValueAtTime(0.001, t + 0.18); o.connect(g); g.connect(this.musicGain); o.start(t); o.stop(t + 0.2); }
    else { const s = c.createBufferSource(); s.buffer = this.noiseBuf; const f = c.createBiquadFilter(); f.type = 'highpass'; f.frequency.value = kind === 'hat' ? 6000 : 1500; const g = c.createGain(); g.gain.setValueAtTime(kind === 'hat' ? 0.05 : 0.15, t); g.gain.exponentialRampToValueAtTime(0.001, t + (kind === 'hat' ? 0.04 : 0.12)); s.connect(f); f.connect(g); g.connect(this.musicGain); s.start(t, Math.random() * 0.5); s.stop(t + 0.15); }
  },
  schedule() {
    if (!this.ctx || !this.musicOn || !this.mode) return;
    const M = this.SCALES[this.mode]; if (!M) return;
    const c = this.ctx;
    const stepDur = 60 / M.tempo / 4;
    if (this.nextT < c.currentTime) this.nextT = c.currentTime + 0.05;
    while (this.nextT < c.currentTime + 0.3) {
      const t = this.nextT, s = this.step % 16;
      if (s === 0) this.bar++;
      const chord = M.prog[Math.floor(this.bar) % M.prog.length];
      const deg = (d) => { const o = Math.floor(d / 7); return M.root + M.scale[((d % 7) + 7) % 7] + o * 12; };
      const r = hash2(this.bar, s, this.mode.length * 7);
      if (M.pad && s === 0) [0, 2, 4].forEach(k => this.inst('pad', this.mtof(deg(chord + k) - 12), t, stepDur * 16, 0.035));
      if (M.bass && (s % 4 === 0)) this.inst('bass', this.mtof(deg(chord) - 24 + (s === 8 && M.drums ? 7 : 0)), t, stepDur * 3, 0.16);
      if (M.drums) { if (s % 8 === 0) this.drum('kick', t); if (s % 8 === 4) this.drum('snare', t); if (s % 2 === 0) this.drum('hat', t); }
      const density = M.sparse ? 0.12 : M.drums ? 0.55 : 0.35;
      if ((s % 2 === 0) && r < density) {
        const pick = Math.floor(hash2(this.bar * 3, s, 99) * 5);
        const note = deg(chord + [0, 2, 4, 7, 5][pick]) + (M.lead === 'flute' ? 12 : 0);
        this.inst(M.lead, this.mtof(note), t, stepDur * (M.lead === 'flute' ? 4 : 2), M.lead === 'square' ? 0.06 : 0.08);
      }
      if (this.mode === 'field' || this.mode === 'town') { if (s % 4 === 2 && r > 0.6) this.inst('pluck', this.mtof(deg(chord + 4)), t, stepDur * 2, 0.04); }
      this.nextT += stepDur; this.step++;
    }
  }
};
