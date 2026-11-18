// Efeitos sonoros do episódio 1, sintetizados (sem arquivos de áudio). Tempos em segundos do episódio.
// cenas: 1 Hrimgard 0 | 2 título 7 | 3 treino 11.5 | 4 close 20 | 5 chifre 25 | 6 ataque 29.2 | 7 luta 35.7 | 8 jarl 48.7 | 9 final 56.7
const DEIXAS = [
  ['vento', 0, 7, 0.35], ['horn', 5.0, 1.9, 1], ['boom', 7.0, 1, 0.8], ['brilho', 7.9, 1.2, 0.5],
  ['passaros', 11.5, 8, 0.15],
  ['whoosh', 14.2, 0.3, 0.6], ['pancada', 14.4, 0.3, 0.8], ['whoosh', 15.8, 0.3, 0.6], ['pancada', 16.0, 0.3, 0.8], ['whoosh', 18.6, 0.35, 0.8], ['pancada', 18.8, 0.4, 1],
  ['vento', 20, 5, 0.25], ['horn', 25.25, 2.6, 0.55], ['tensao', 25.3, 1.2, 0.6],
  ['fogo', 29.2, 19.5, 0.35], ['gritos', 29.4, 3, 0.25], ['whoosh', 31.5, 0.6, 0.6], ['impacto', 32.1, 1, 1], ['rugido', 32.85, 2.6, 0.8],
  ['passos', 35.7, 1.1, 0.5], ['whoosh', 37.55, 0.3, 0.8], ['clang', 37.7, 1.4, 1], ['arrasta', 37.8, 0.9, 0.5], ['risada', 39.1, 1.8, 0.5],
  ['carga', 42.3, 2.0, 0.7], ['whoosh', 44.3, 0.8, 1], ['corte', 45.1, 1.2, 1], ['quebra', 46.0, 0.8, 0.9], ['impacto', 46.9, 0.8, 0.8],
  ['vento', 48.7, 8, 0.4], ['drone', 48.7, 3.5, 0.6], ['runa', 52.1, 2.2, 0.6], ['drone', 54.3, 2.4, 0.5], ['vento', 56.7, 10.5, 0.3]
];
if (typeof module !== 'undefined') module.exports = DEIXAS;
