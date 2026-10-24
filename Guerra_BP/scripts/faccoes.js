export const FACCOES = {
  solar: {
    id: "solar",
    nome: "Legião Solar",
    sigla: "SOL",
    cor: "§6",
    rgb: { red: 1, green: 0.75, blue: 0.2 },
    blocos: { pri: "yellow_concrete", sec: "white_concrete", vidro: "yellow_stained_glass" },
    desc: "Exército disciplinado que domina a energia das estrelas. Armaduras douradas e táticas em formação.",
  },
  nyx: {
    id: "nyx",
    nome: "Enxame Nyx",
    sigla: "NYX",
    cor: "§5",
    rgb: { red: 0.85, green: 0.3, blue: 1 },
    blocos: { pri: "purple_concrete", sec: "black_concrete", vidro: "purple_stained_glass" },
    desc: "Ciborgues ligados a uma mente coletiva vinda do vazio. Atacam em ondas incessantes.",
  },
  ferro: {
    id: "ferro",
    nome: "Coalizão Ferro",
    sigla: "FER",
    cor: "§c",
    rgb: { red: 1, green: 0.35, blue: 0.15 },
    blocos: { pri: "red_concrete", sec: "gray_concrete", vidro: "red_stained_glass" },
    desc: "Indústria de guerra pesada: blindagem grossa, artilharia e titãs de aço.",
  },
  aurora: {
    id: "aurora",
    nome: "Vanguarda Aurora",
    sigla: "AUR",
    cor: "§b",
    rgb: { red: 0.4, green: 0.95, blue: 1 },
    blocos: { pri: "cyan_concrete", sec: "white_concrete", vidro: "cyan_stained_glass" },
    desc: "Exploradores de elite com tecnologia de luz e drones de precisão.",
  },
};

export const LISTA_FACCOES = ["solar", "nyx", "ferro", "aurora"];

export const CENARIOS = [
  {
    id: "ruinas",
    nome: "Cidade em Ruínas",
    chao: ["gray_concrete", "andesite", "stone", "polished_andesite", "black_concrete"],
    sub: "stone",
    cobertura: ["stone_bricks", "cracked_stone_bricks", "cobblestone", "polished_andesite"],
    cratera: "blackstone",
    luz: "sea_lantern",
    predios: 0.16,
  },
  {
    id: "marte",
    nome: "Deserto Marciano",
    chao: ["red_sand", "red_sandstone", "orange_terracotta", "terracotta"],
    sub: "red_sandstone",
    cobertura: ["red_sandstone", "smooth_red_sandstone", "brown_terracotta", "orange_terracotta"],
    cratera: "blackstone",
    luz: "shroomlight",
    predios: 0.04,
  },
  {
    id: "tundra",
    nome: "Tundra Neon",
    chao: ["snow_block", "packed_ice", "light_gray_concrete", "white_concrete"],
    sub: "packed_ice",
    cobertura: ["blue_ice", "packed_ice", "cyan_terracotta", "light_blue_stained_glass"],
    cratera: "deepslate",
    luz: "sea_lantern",
    predios: 0.06,
  },
  {
    id: "orbital",
    nome: "Base Orbital",
    chao: ["smooth_stone", "polished_deepslate", "gray_concrete", "light_gray_concrete"],
    sub: "deepslate",
    cobertura: ["iron_block", "polished_deepslate", "quartz_block", "smooth_stone"],
    cratera: "black_concrete",
    luz: "sea_lantern",
    predios: 0.1,
  },
];

export const TAMANHOS = [
  { nome: "Médio (80 blocos)", raio: 40 },
  { nome: "Grande (112 blocos)", raio: 56 },
];

// intervalo entre ondas (s), tamanho do esquadrão, limite de unidades por facção, titãs simultâneos
export const INTENSIDADES = [
  { nome: "Baixa", intervalo: 30, esquadrao: 3, limite: 12, titas: 0 },
  { nome: "Média", intervalo: 22, esquadrao: 4, limite: 18, titas: 1 },
  { nome: "Alta", intervalo: 16, esquadrao: 5, limite: 24, titas: 1 },
  { nome: "Caos", intervalo: 11, esquadrao: 6, limite: 30, titas: 2 },
];

export const VALOR_ABATE = { soldado: 5, sniper: 6, pesado: 8, medico: 6, drone: 8, tita: 40, nucleo: 100 };
export const NOME_TIPO = {
  soldado: "Soldado",
  sniper: "Atirador",
  pesado: "Artilheiro",
  medico: "Médico",
  drone: "Drone",
  tita: "Titã",
  nucleo: "Núcleo",
};

/** "guerra:solar_tita" -> { faccao: "solar", tipo: "tita" } */
export function infoEntidade(typeId) {
  const m = /^guerra:(solar|nyx|ferro|aurora)_(\w+)$/.exec(typeId ?? "");
  return m ? { faccao: m[1], tipo: m[2] } : null;
}
