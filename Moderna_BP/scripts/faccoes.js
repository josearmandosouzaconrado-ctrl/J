export const FACCOES = {
  oliva: {
    id: "oliva",
    nome: "Força Tarefa Oliva",
    sigla: "OLV",
    cor: "§2",
    blocos: { pri: "yellow_concrete" },
    desc: "Infantaria tática com máscaras de gás e faixas amarelas. Disciplina e poder de fogo.",
  },
  granito: {
    id: "granito",
    nome: "Divisão Granito",
    sigla: "GRN",
    cor: "§7",
    blocos: { pri: "light_gray_concrete" },
    desc: "Tropas de assalto com exoarmadura cinza e camuflagem. Avançam como um paredão.",
  },
  corvo: {
    id: "corvo",
    nome: "Unidade Corvo",
    sigla: "CRV",
    cor: "§8",
    blocos: { pri: "orange_concrete" },
    desc: "Operações especiais de preto e laranja, visores ciano. Atiradores letais.",
  },
  caveira: {
    id: "caveira",
    nome: "Legião Caveira",
    sigla: "CAV",
    cor: "§4",
    blocos: { pri: "red_concrete" },
    desc: "Soldados de máscara de caveira e casaco cinza. Não recuam nunca.",
  },
  azul: {
    id: "azul",
    nome: "Força de Paz Azul",
    sigla: "AZL",
    cor: "§9",
    blocos: { pri: "light_blue_concrete" },
    desc: "Capacetes azuis, camuflagem de selva e bandanas de caveira. Bem equipados e numerosos.",
  },
};

export const LISTA_FACCOES = ["oliva", "granito", "corvo", "caveira", "azul"];

export const CENARIOS = [
  {
    id: "cidade",
    nome: "Cidade em Guerra",
    chao: ["gray_concrete", "light_gray_concrete", "andesite", "stone"],
    rua: "black_concrete",
    sub: "stone",
    cobertura: ["stone_bricks", "bricks", "light_gray_concrete", "white_concrete", "cracked_stone_bricks"],
    sacos: "mud_bricks",
    cratera: "blackstone",
    predios: 0.3,
    arvores: 0,
    tronco: "oak_log",
    folhas: "oak_leaves",
  },
  {
    id: "deserto",
    nome: "Deserto",
    chao: ["sand", "sand", "sandstone", "smooth_sandstone"],
    rua: null,
    sub: "sandstone",
    cobertura: ["sandstone", "smooth_sandstone", "cut_sandstone"],
    sacos: "mud_bricks",
    cratera: "blackstone",
    predios: 0.08,
    arvores: 0,
    tronco: "oak_log",
    folhas: "oak_leaves",
  },
  {
    id: "floresta",
    nome: "Floresta",
    chao: ["grass_block", "grass_block", "podzol", "coarse_dirt"],
    rua: null,
    sub: "dirt",
    cobertura: ["cobblestone", "mossy_cobblestone", "oak_planks"],
    sacos: "mud_bricks",
    cratera: "coarse_dirt",
    predios: 0.03,
    arvores: 0.22,
    tronco: "oak_log",
    folhas: "oak_leaves",
  },
  {
    id: "inverno",
    nome: "Front de Inverno",
    chao: ["snow_block", "snow_block", "packed_ice", "white_concrete_powder"],
    rua: null,
    sub: "stone",
    cobertura: ["stone_bricks", "spruce_planks", "cobblestone"],
    sacos: "packed_mud",
    cratera: "gravel",
    predios: 0.05,
    arvores: 0.18,
    tronco: "spruce_log",
    folhas: "spruce_leaves",
  },
];

export const TAMANHOS = [
  { nome: "Médio (100 blocos)", raio: 50 },
  { nome: "Grande (128 blocos)", raio: 64 },
];

// intervalo entre ondas (s), tamanho do esquadrão, limite de tropas por facção, limite de veículos
export const INTENSIDADES = [
  { nome: "Patrulha", intervalo: 32, esquadrao: 3, limite: 12, veiculos: 1 },
  { nome: "Combate", intervalo: 24, esquadrao: 4, limite: 18, veiculos: 2 },
  { nome: "Ofensiva", intervalo: 18, esquadrao: 5, limite: 24, veiculos: 3 },
  { nome: "Guerra Total", intervalo: 12, esquadrao: 6, limite: 30, veiculos: 4 },
];

export const CLASSES = [
  { id: "assalto", nome: "Assalto", desc: "Fuzil de assalto automático + granadas", itens: [["gm:fuzil", 1], ["gm:granada", 4]] },
  { id: "atirador", nome: "Atirador de elite", desc: "Rifle de precisão (agache para mirar) + fuzil", itens: [["gm:sniper", 1], ["gm:fuzil", 1]] },
  { id: "suporte", nome: "Suporte", desc: "Metralhadora pesada + kits médicos extras", itens: [["gm:metralhadora", 1], ["gm:kit_medico", 2]] },
  { id: "antitanque", nome: "Antitanque", desc: "Lança-foguetes + fuzil", itens: [["gm:bazuca", 1], ["gm:fuzil", 1]] },
];

export const VALOR_ABATE = { fuzileiro: 5, atirador: 6, metralhador: 7, bazuca: 7, medico: 6, blindado: 30, tanque: 50, comando: 120 };
export const NOME_TIPO = {
  fuzileiro: "Fuzileiro",
  atirador: "Atirador",
  metralhador: "Metralhador",
  bazuca: "Antitanque",
  medico: "Médico",
  tanque: "Tanque",
  blindado: "Blindado",
  tanque_p: "Tanque",
  blindado_p: "Blindado",
  comando: "Posto de Comando",
};

/** "gm:oliva_tanque" -> { faccao: "oliva", tipo: "tanque" } */
export function infoEntidade(typeId) {
  const m = /^gm:(oliva|granito|corvo|caveira|azul)_(\w+)$/.exec(typeId ?? "");
  return m ? { faccao: m[1], tipo: m[2] } : null;
}
