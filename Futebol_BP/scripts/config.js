// Coordenadas do campo são relativas ao centro; o eixo X liga os dois gols.
export const CAMPO = {
  LINHA_X: 24, // linha de fundo
  LINHA_Z: 15, // linha lateral
  GOL_Z: 3.5, // metade da largura interna do gol
  GOL_ALT: 3, // altura interna do gol
  REDE_X: 25.3, // fundo da rede
  AREA_X: 6, // profundidade da grande área
  AREA_Z: 8, // metade da largura da grande área
};

export const BOLA = {
  GRAVIDADE: 0.04,
  ATRITO_CHAO: 0.955,
  ATRITO_AR: 0.99,
  QUIQUE: 0.45,
  RAIO: 0.22,
};

// [papel, profundidade (-1 = próprio gol, 1 = gol adversário), lateral (-1..1)]
export const FORMACOES = {
  5: [
    ["GOL", -0.95, 0],
    ["ZAG", -0.5, -0.35],
    ["ZAG", -0.5, 0.35],
    ["MEI", -0.05, 0],
    ["ATA", 0.4, 0],
  ],
  7: [
    ["GOL", -0.95, 0],
    ["ZAG", -0.55, -0.5],
    ["ZAG", -0.62, 0],
    ["ZAG", -0.55, 0.5],
    ["MEI", -0.1, -0.4],
    ["MEI", -0.1, 0.4],
    ["ATA", 0.4, 0],
  ],
};

export const POSICOES = {
  ATA: "Atacante",
  MEI: "Meia",
  ZAG: "Zagueiro",
  GOL: "Goleiro",
};

export const DIFICULDADES = [
  { nome: "Fácil", ajuste: -10 },
  { nome: "Normal", ajuste: 0 },
  { nome: "Difícil", ajuste: 7 },
  { nome: "Lendário", ajuste: 14 },
];

export const ATRIBUTOS = {
  vel: "Velocidade",
  chu: "Finalização",
  pas: "Passe",
  dri: "Drible",
  def: "Defesa",
  fis: "Físico",
};

export const ITENS_PARTIDA = ["fut:chute", "fut:passe", "fut:dividida", "fut:pedir"];
