'use strict';
// =====================================================================
//  MÚSICA COMPOSTA: temas de verdade no menu e durante o jogo
//  Cada lugar tem a sua melodia, escrita em notação ABC (a mesma das
//  partituras de música folclórica) e tocada pelo sintetizador do jogo,
//  sem nenhum arquivo de áudio: menu, campo de dia, noite, cidade,
//  mar, masmorra, batalha e chefe. Por baixo da melodia vêm os acordes
//  (pad, arpejo ou "pum-pá" de taverna), o baixo e, nas lutas, a bateria.
//  A cada volta a música muda um pouco (oitava acima, outro timbre, uma
//  volta só com o acompanhamento) para não cansar.
// =====================================================================
const Musica = {
  // ---------- as partituras ----------
  ABC: {
    title: `X:1
T:Crônicas de Eldoria
M:3/4
L:1/8
Q:1/4=84
K:D
"D"D2 F2 A2 | "G"B4 A2 | "A"G2 F2 E2 | "D"F6 |
"Bm"F2 E2 D2 | "G"G4 B2 | "A"A2 G2 E2 | "A"A6 |
"D"d2 c2 B2 | "G"B4 A2 | "Em"G2 B2 e2 | "A"c6 |
"G"B2 A2 G2 | "D"F2 A2 d2 | "A"e2 c2 A2 | "D"d6 |]`,
    field: `X:2
T:Campos de Valdoria
M:6/8
L:1/8
Q:3/8=76
K:G
|:"G"G2B d2B | "C"c2e "D"d2B | "Em"A2G B2d | "D"A3 F3 |
"G"G2B d2g | "C"e2c "G"B2G | "Am"A2c "D"F2A | "G"G3 G3 :|
|:"Em"B2e e2d | "C"c2e g2e | "G"d2B "D"A2F | "G"G3 B3 |
"C"c2e "G"d2B | "Am"c2A "D"B2A | "G"G2B "D"A2F | "G"G6 :|`,
    night: `X:3
T:Sob as Estrelas
M:4/4
L:1/8
Q:1/4=66
K:Am
|:"Am"E4 A2 B2 | c4 B2 A2 | "F"F4 A2 c2 | "E"B6 z2 |
"Am"A4 c2 e2 | "Dm"d4 c2 A2 | "E"B4 ^G2 E2 | "Am"A8 :|`,
    town: `X:4
T:Taverna do Javali Dourado
M:6/8
L:1/8
Q:3/8=112
K:D
|:"D"A,DF A2F | "G"G2B "D"A2F | "D"DFA d2c | "A"B2A G2E |
"D"A,DF A2F | "G"G2B "D"A2d | "A"c2A "Em"G2E | "D"D3 D3 :|
|:"D"d2f a2f | "G"g2e "D"f2d | "Bm"B2d "A"c2A | "G"B2G "A"A2c |
"D"d2f a2f | "G"g2e "D"f2d | "A"e2c A2c | "D"d3 d3 :|`,
    sea: `X:5
T:Ventos do Mar das Brumas
M:6/8
L:1/8
Q:3/8=84
K:Ddor
|:"Dm"D2D F2A | "C"G2E C2E | "Dm"D2F A2d | "C"c3 G3 |
"Dm"D2D F2A | "C"G2E C2E | "F"F2A "C"G2E | "Dm"D6 :|
|:"F"A2c f2e | "C"e2c G2c | "Dm"d2A F2A | "C"G3 E3 |
"F"A2c f2a | "C"g2e c2e | "Dm"d2A "C"G2E | "Dm"D6 :|`,
    dungeon: `X:6
T:Cripta Esquecida
M:4/4
L:1/8
Q:1/4=56
K:Em
|:"Em"E4 =F4 | E2 G2 =F2 E2 | "Am"A4 B2 c2 | "B"B8 |
"Em"e4 d2 B2 | "C"c4 B2 A2 | "B"=F4 ^D2 B,2 | "Em"E8 :|`,
    battle: `X:7
T:Batalha nas Colinas
M:4/4
L:1/8
Q:1/4=144
K:Dm
|:"Dm"D2 A2 d2 A2 | "Bb"B2 F2 d2 F2 | "C"c2 G2 e2 G2 | "A"^c2 A2 e2 A2 |
"Dm"d3 e f2 e2 | "Bb"d3 c B2 A2 | "Gm"G2 B2 "A"A2 ^c2 | "Dm"d4 A4 :|
|:"Dm"f3 e d2 A2 | "C"e3 d c2 G2 | "Bb"d3 c B2 F2 | "A"A2 ^c2 e2 a2 |
"Dm"f3 e d2 f2 | "C"e3 d c2 e2 | "Gm"d2 B2 "A"^c2 e2 | "Dm"d8 :|`,
    boss: `X:8
T:A Fúria do Dragão
M:4/4
L:1/8
Q:1/4=152
K:Cm
|:"Cm"C2 C2 _D2 C2 | "Cm"G,2 C2 E2 G2 | "Ab"A4 G2 F2 | "G"G4 =B,4 |
"Cm"c2 c2 _d2 c2 | "Fm"A2 F2 c2 F2 | "Ab"E2 F2 "G"G2 =B2 | "Cm"c8 :|`
  },
  // como cada uma é tocada
  ARR: {
    title: { lead: 'flute', acc: 'pad', arp: true, bass: true, vol: 0.08 },
    field: { lead: 'pluck', acc: 'arp', bass: true, vol: 0.09 },
    night: { lead: 'flute', acc: 'pad', bass: false, vol: 0.07 },
    town: { lead: 'pluck', acc: 'oompah', bass: true, vol: 0.09 },
    sea: { lead: 'flute', acc: 'pad', arp: true, bass: true, vol: 0.075 },
    dungeon: { lead: 'flute', acc: 'pad', bass: true, vol: 0.06 },
    battle: { lead: 'square', acc: 'drive', bass: true, drums: true, vol: 0.06 },
    boss: { lead: 'square', acc: 'drive', pad: true, bass: true, drums: true, vol: 0.06 }
  },
  cache: {},
  // ---------- o leitor de ABC ----------
  // devolve { len, spb (segundos por semínima), notas [{t, d, m}], acordes [{t, d, raiz, menor}] } com tempo em semínimas
  ler(abc) {
    const H = {}, corpo = [];
    for (const l of abc.split('\n')) { const m = /^([A-Za-z]):\s*(.*)$/.exec(l.trim()); if (m && 'XTMLQKC'.includes(m[1])) H[m[1]] = m[2].trim(); else if (l.trim()) corpo.push(l); }
    const frac = s => { const p = String(s || '1/8').split('/'); return (+p[0] || 1) / (+p[1] || 1); };
    const L = frac(H.L) * 4;                                   // a unidade em semínimas
    let qpm = 100;
    if (H.Q) { const m = /(?:(\d+)\/(\d+)\s*=\s*)?(\d+)/.exec(H.Q); if (m) qpm = +m[3] * (m[1] ? (+m[1] / +m[2]) * 4 : 1); }
    const sig = this.armadura(H.K || 'C');
    const notas = [], acordes = [];
    let t = 0, i = 0, inicio = 0, iniN = 0, iniA = 0, acid = {};
    const s = corpo.join(' ');
    const PC = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
    const dur = () => { let n = '', d = ''; while (/\d/.test(s[i] || '')) n += s[i++]; let k = n ? +n : 1; if (s[i] === '/') { i++; while (/\d/.test(s[i] || '')) d += s[i++]; k /= d ? +d : 2; } return k * L; };
    const repetir = () => { const seg = t - inicio; const nn = notas.length, na = acordes.length; for (let j = iniN; j < nn; j++) notas.push(Object.assign({}, notas[j], { t: notas[j].t + seg })); for (let j = iniA; j < na; j++) acordes.push(Object.assign({}, acordes[j], { t: acordes[j].t + seg })); t += seg; };
    while (i < s.length) {
      const c = s[i];
      if (c === '"') { const f = s.indexOf('"', i + 1); const nome = s.slice(i + 1, f); i = f + 1; const m = /^([A-G])([#b]?)(m(?!aj)|dim)?/.exec(nome); if (m) acordes.push({ t, raiz: (PC[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0) + 12) % 12, menor: !!m[3] }); continue; }
      if (c === '|' || c === ':' || c === '[' || c === ']') {
        let tok = ''; while (i < s.length && '|:[]'.includes(s[i])) tok += s[i++];
        acid = {};
        if (tok.includes(':|') || /^:+$/.test(tok)) { repetir(); inicio = t; iniN = notas.length; iniA = acordes.length; }
        if (tok.includes('|:')) { inicio = t; iniN = notas.length; iniA = acordes.length; }
        continue;
      }
      if (c === 'z' || c === 'x') { i++; t += dur(); continue; }
      if ('^_='.includes(c) || /[A-Ga-g]/.test(c)) {
        let ac = null; while ('^_='.includes(s[i])) { ac = (ac || 0) + (s[i] === '^' ? 1 : s[i] === '_' ? -1 : 0); if (s[i] === '=') ac = 0; i++; }
        const letra = s[i++]; if (!letra || !/[A-Ga-g]/.test(letra)) continue;
        const U = letra.toUpperCase(); let oit = letra === U ? 0 : 1;
        while (s[i] === "'" || s[i] === ',') { oit += s[i] === "'" ? 1 : -1; i++; }
        const chave = U + oit;
        if (ac !== null) acid[chave] = ac;
        const alt = acid[chave] !== undefined ? acid[chave] : sig[U] || 0;
        const d = dur();
        notas.push({ t, d, m: 60 + PC[U] + alt + oit * 12 });
        if (s[i] === '-') i++;
        t += d; continue;
      }
      i++;
    }
    for (let j = 0; j < acordes.length; j++) acordes[j].d = (j + 1 < acordes.length ? acordes[j + 1].t : t) - acordes[j].t;
    notas.sort((a, b) => a.t - b.t); acordes.sort((a, b) => a.t - b.t);
    return { len: t, spb: 60 / qpm, notas, acordes, titulo: H.T || '' };
  },
  // sustenidos e bemóis da armadura (aceita modos: Am, Ddor, Emix...)
  armadura(K) {
    const m = /^([A-G])([#b]?)\s*([a-zA-Z]*)/.exec(K.trim()); if (!m) return {};
    const QUINTAS = { C: 0, G: 1, D: 2, A: 3, E: 4, B: 5, F: -1 };
    let n = QUINTAS[m[1]] + (m[2] === '#' ? 7 : m[2] === 'b' ? -7 : 0);
    const modo = m[3].toLowerCase().slice(0, 3);
    n += { '': 0, maj: 0, ion: 0, m: -3, min: -3, aeo: -3, dor: -2, phr: -4, lyd: 1, mix: -1, loc: -5 }[modo] || 0;
    const sig = {};
    if (n > 0) for (const l of 'FCGDAEB'.slice(0, n)) sig[l] = 1;
    if (n < 0) for (const l of 'BEADGCF'.slice(0, -n)) sig[l] = -1;
    return sig;
  },
  musica(modo) {
    if (!this.ABC[modo]) return null;
    if (!this.cache[modo]) { try { this.cache[modo] = this.ler(this.ABC[modo]); } catch (e) { this.cache[modo] = null; } }
    return this.cache[modo];
  },
  // ---------- tocar ----------
  tocar(S) {
    const M = this.musica(S.mode); if (!M || !M.len) return false;
    const A = this.ARR[S.mode], c = S.ctx, now = c.currentTime;
    if (this._modo !== S.mode) { this._modo = S.mode; this.pos = 0; this.volta = 0; this.ni = 0; this.ci = 0; this.nextT = now + 0.08; this.tocadoAte = -1; }
    if (this.nextT < now) this.nextT = now + 0.05;
    const passo = 0.25, spb = M.spb, mtof = m => S.mtof(m);
    let guarda = 0;
    while (this.nextT < now + 0.35 && guarda++ < 64) {
      const b0 = this.pos, b1 = this.pos + passo, base = this.nextT, quando = t => base + (t - b0) * spb;
      const so = this.volta % 3 === 2;                     // uma volta só com o acompanhamento
      const sobe = this.volta % 3 === 1 ? 12 : 0;            // outra volta uma oitava acima
      // a melodia
      while (this.ni < M.notas.length && M.notas[this.ni].t < b1) {
        const n = M.notas[this.ni++]; if (n.t < b0 || so) continue;
        const lead = this.volta % 3 === 1 && A.lead === 'pluck' ? 'flute' : A.lead;
        S.inst(lead, mtof(n.m + sobe + (lead === 'flute' && A.lead !== 'flute' ? 0 : 0)), quando(n.t), Math.max(0.12, n.d * spb * 0.95), A.vol);
      }
      // os acordes
      while (this.ci < M.acordes.length && M.acordes[this.ci].t < b1) {
        const k = M.acordes[this.ci++]; if (k.t < b0) continue;
        const raiz = 48 + k.raiz, terca = raiz + (k.menor ? 3 : 4), quinta = raiz + 7, t0 = quando(k.t), d = k.d * spb;
        if (A.acc === 'pad' || A.pad) for (const m of [raiz, terca, quinta]) S.inst('pad', mtof(m), t0, d, 0.028);
        if (A.acc === 'arp' || A.arp) { const seq = [raiz, quinta, terca + 12, quinta]; for (let j = 0; j < Math.floor(k.d * 2); j++) S.inst('pluck', mtof(seq[j % 4] + 12), t0 + j * spb / 2, spb * 0.5, 0.03); }
        if (A.acc === 'oompah') for (let j = 0; j < Math.floor(k.d * 2); j++) { if (j % 3 === 0) S.inst('bass', mtof(raiz - 12), t0 + j * spb / 2, spb * 0.6, 0.14); else S.inst('pluck', mtof((j % 3 === 1 ? terca : quinta) + 12), t0 + j * spb / 2, spb * 0.35, 0.035); }
        if (A.acc === 'drive') for (let j = 0; j < Math.floor(k.d * 2); j++) S.inst('bass', mtof(raiz - 12 + (j % 4 === 3 ? 7 : 0)), t0 + j * spb / 2, spb * 0.45, 0.13);
        else if (A.bass && A.acc !== 'oompah') S.inst('bass', mtof(raiz - 12), t0, Math.min(d, spb * 2), 0.13);
      }
      // a bateria das lutas
      if (A.drums) for (let q = Math.ceil(b0 * 2) / 2; q < b1; q += 0.5) {
        const t0 = quando(q), bt = q % 4;
        if (bt === 0 || bt === 2.5) S.drum('kick', t0); if (bt === 1 || bt === 3) S.drum('snare', t0); S.drum('hat', t0);
      }
      this.pos = b1; this.nextT += passo * spb;
      if (this.pos >= M.len - 1e-6) { this.pos = 0; this.ni = 0; this.ci = 0; this.volta++; }
    }
    return true;
  }
};

// ---------------- ganchos ----------------
(function () {
  // as músicas compostas tomam o lugar da música procedural (que continua para os modos sem partitura)
  const sch0 = Sfx.schedule;
  Sfx.schedule = function () {
    if (!this.ctx || !this.musicOn || !this.mode) return;
    if (this.ctx.state !== 'running') return;
    if (Musica.ABC[this.mode]) { try { if (Musica.tocar(this)) return; } catch (e) { console.warn('musica', e); } }
    return sch0.apply(this, arguments);
  };
  // a tela inicial também tem música (o navegador só deixa tocar depois do primeiro toque)
  const st0 = UI.showTitle;
  UI.showTitle = function () { const r = st0.apply(this, arguments); if (!Game.started) Sfx.setMusic('title'); return r; };
  const un0 = Sfx.unlock;
  Sfx.unlock = function () { const r = un0.apply(this, arguments); if (!this.mode && !Game.started) this.setMusic('title'); return r; };
  window.addEventListener('pointerdown', () => { try { Sfx.unlock(); } catch (e) { } }, { passive: true });
  window.addEventListener('keydown', () => { try { Sfx.unlock(); } catch (e) { } }, { passive: true });
  const sm0 = Sfx.setMusic;
  Sfx.setMusic = function (mode) { if (mode !== this.mode) Musica._modo = null; return sm0.apply(this, arguments); };
})();
