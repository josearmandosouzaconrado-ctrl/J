// Trilha do episódio 1 (notação ABC), tocada pelo sintetizador do próprio jogo (js/musica.js)
const TRILHA_ANIME = {
  ABC: {
    a_tema: `X:1
T:O Chifre do Norte
M:4/4
L:1/8
Q:1/4=132
K:Dm
"Dm"D2 A2 F2 E2 | "Bb"D2 F2 B4 | "C"c2 B2 A2 G2 | "A"A6 z2 |
"Dm"d2 c2 A2 F2 | "Bb"G2 A2 B4 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 |
"F"c2 c2 A2 c2 | "Bb"d4 B4 | "C"e2 d2 c2 B2 | "A"A6 z2 |
"Dm"d2 f2 a2 f2 | "Bb"g2 f2 d2 B2 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 |]`,
    a_frio: `X:2
T:Hrimgard
M:4/4
L:1/8
Q:1/4=60
K:Am
"Am"E4 A4 | "F"c4 B4 | "G"A4 G2 E2 | "Am"E8 | "F"F4 A4 | "C"G4 E4 | "E"^G4 B4 | "Am"A8 |]`,
    a_vila: `X:3
T:Manhã na Vila
M:6/8
L:1/8
Q:3/8=84
K:G
"G"G2A B2d | "C"e2d c2B | "D"A2B c2A | "G"B3 G3 | "Em"E2G B2e | "C"c2e "D"d2c | "G"B2G "D"A2F | "G"G6 |]`,
    a_perigo: `X:4
T:O Chifre Soou
M:4/4
L:1/8
Q:1/4=112
K:Dm
"Dm"D2 D2 F2 D2 | "Bb"D2 D2 G2 F2 | "C"E2 E2 G2 E2 | "A"^C4 E4 | "Dm"d2 c2 A2 F2 | "Gm"G2 B2 d2 B2 | "A"A2 G2 F2 E2 | "A"^C8 |]`,
    a_luta: `X:5
T:Aren contra o Berserker
M:4/4
L:1/8
Q:1/4=152
K:Dm
|:"Dm"d2 d2 c2 A2 | "Bb"B2 B2 A2 F2 | "C"G2 G2 F2 E2 | "A"E4 ^C4 | "Dm"D2 F2 A2 d2 | "Bb"f2 e2 d2 B2 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 :|`,
    a_fim: `X:6
T:Rumo ao Norte
M:4/4
L:1/8
Q:1/4=84
K:Dm
"Dm"D2 A2 F2 E2 | "Bb"D2 F2 B4 | "C"c2 B2 A2 G2 | "A"A6 z2 |
"Dm"d2 c2 A2 F2 | "Bb"G2 A2 B4 | "Gm"A2 G2 "A"E2 ^C2 | "Dm"D8 |]`
  },
  ARR: {
    a_tema: { lead: 'square', acc: 'drive', pad: true, bass: true, drums: true, vol: 0.06 },
    a_frio: { lead: 'flute', acc: 'pad', bass: false, vol: 0.07 },
    a_vila: { lead: 'pluck', acc: 'arp', bass: true, vol: 0.09 },
    a_perigo: { lead: 'square', acc: 'drive', pad: true, bass: true, vol: 0.055 },
    a_luta: { lead: 'square', acc: 'drive', pad: true, bass: true, drums: true, vol: 0.06 },
    a_fim: { lead: 'flute', acc: 'pad', arp: true, bass: true, vol: 0.08 }
  },
  PLANO: [['a_frio', 7], ['a_tema', 4.5], ['a_vila', 13.5], ['a_perigo', 10.7], ['a_luta', 13], ['a_frio', 8], ['a_fim', 10.5]]
};
if (typeof module !== 'undefined') module.exports = TRILHA_ANIME;
