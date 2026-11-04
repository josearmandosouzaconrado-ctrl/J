// Descompactador LZMA (formato .lzma "alone"), baseado na especificação do LZMA SDK.
// Usado só dentro do APK: o código do jogo vai num pacote LZMA (bem menor que deflate)
// e é descompactado aqui quando o jogo abre.
function unlzma(inp, size) {
  const props = inp[0], lc = props % 9, lp = ((props / 9) | 0) % 5, pb = (props / 45) | 0;
  const out = new Uint8Array(size);
  // range e code ficam num Uint32Array (mais rápido: sem números quebrados na memória)
  const R = new Uint32Array([0xFFFFFFFF, 0]);
  let pos = 13, outPos = 0;
  pos++;   // o primeiro byte do decodificador é sempre 0
  for (let i = 0; i < 4; i++) R[1] = (R[1] << 8) | inp[pos++];
  const P = n => new Uint16Array(n).fill(1024);
  const lit = P(0x300 << (lc + lp)), isMatch = P(192), isRep = P(12), isRepG0 = P(12), isRepG1 = P(12), isRepG2 = P(12), isRep0Long = P(192);
  const posSlot = P(256), posDec = P(115), align = P(16);
  const lenC = () => ({ ch: P(2), low: P(16 << 3), mid: P(16 << 3), high: P(256) });
  const lenD = lenC(), repLenD = lenC();
  function bit(p, i) {
    const v = p[i], bound = (R[0] >>> 11) * v;
    let s;
    if (R[1] < bound) { p[i] = v + ((2048 - v) >>> 5); R[0] = bound; s = 0; }
    else { p[i] = v - (v >>> 5); R[1] -= bound; R[0] -= bound; s = 1; }
    if (R[0] < 16777216) { R[0] <<= 8; R[1] = (R[1] << 8) | inp[pos++]; }
    return s;
  }
  function tree(p, base, n) { let m = 1; for (let i = 0; i < n; i++) m = (m << 1) + bit(p, base + m); return m - (1 << n); }
  function rtree(p, base, n) { let m = 1, s = 0; for (let i = 0; i < n; i++) { const b = bit(p, base + m); m = (m << 1) + b; s |= b << i; } return s; }
  function direct(n) {
    let r = 0;
    for (; n > 0; n--) {
      R[0] >>>= 1;
      let b = 0; if (R[1] >= R[0]) { R[1] -= R[0]; b = 1; }
      r = r * 2 + b;
      if (R[0] < 16777216) { R[0] <<= 8; R[1] = (R[1] << 8) | inp[pos++]; }
    }
    return r;
  }
  function len(L, ps) {
    if (!bit(L.ch, 0)) return tree(L.low, ps << 3, 3);
    if (!bit(L.ch, 1)) return 8 + tree(L.mid, ps << 3, 3);
    return 16 + tree(L.high, 0, 8);
  }
  function distance(l) {
    const ls = l > 3 ? 3 : l, slot = tree(posSlot, ls << 6, 6);
    if (slot < 4) return slot;
    const nd = (slot >>> 1) - 1;
    let d = (2 | (slot & 1)) * Math.pow(2, nd);
    if (slot < 14) d += rtree(posDec, d - slot, nd);
    else d += direct(nd - 4) * 16 + rtree(align, 0, 4);
    return d;
  }
  let state = 0, rep0 = 0, rep1 = 0, rep2 = 0, rep3 = 0;
  const pbm = (1 << pb) - 1, lpm = (1 << lp) - 1;
  while (outPos < size) {
    const ps = outPos & pbm;
    if (!bit(isMatch, (state << 4) + ps)) {
      const prev = outPos > 0 ? out[outPos - 1] : 0, base = 0x300 * (((outPos & lpm) << lc) + (prev >>> (8 - lc)));
      let s = 1;
      if (state >= 7) {
        let mb = out[outPos - rep0 - 1];
        do {
          const m = (mb >>> 7) & 1; mb <<= 1;
          const b = bit(lit, base + ((1 + m) << 8) + s);
          s = (s << 1) | b;
          if (m !== b) break;
        } while (s < 0x100);
      }
      while (s < 0x100) s = (s << 1) | bit(lit, base + s);
      out[outPos++] = s - 0x100;
      state = state < 4 ? 0 : state < 10 ? state - 3 : state - 6;
      continue;
    }
    let l;
    if (bit(isRep, state)) {
      if (!bit(isRepG0, state)) {
        if (!bit(isRep0Long, (state << 4) + ps)) { state = state < 7 ? 9 : 11; out[outPos] = out[outPos - rep0 - 1]; outPos++; continue; }
      } else {
        let d;
        if (!bit(isRepG1, state)) d = rep1;
        else { if (!bit(isRepG2, state)) d = rep2; else { d = rep3; rep3 = rep2; } rep2 = rep1; }
        rep1 = rep0; rep0 = d;
      }
      l = len(repLenD, ps);
      state = state < 7 ? 8 : 11;
    } else {
      rep3 = rep2; rep2 = rep1; rep1 = rep0;
      l = len(lenD, ps);
      state = state < 7 ? 7 : 10;
      rep0 = distance(l);
      if (rep0 === 0xFFFFFFFF) break;
    }
    for (l += 2; l > 0 && outPos < size; l--) { out[outPos] = out[outPos - rep0 - 1]; outPos++; }
  }
  return out;
}
