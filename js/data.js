'use strict';
// ===================== DADOS DO JOGO =====================

// ---------- Tiles ----------
const T = {
  DEEP: 0, WATER: 1, SAND: 2, GRASS: 3, DGRASS: 4, DIRT: 5, SNOW: 6, ICE: 7, SWAMP: 8, DESERT: 9,
  ROCK: 10, SNOWROCK: 11, LAVA: 12, ASH: 13, ROAD: 14, COBBLE: 15, WOOD: 16, WALL: 17, BRIDGE: 18, TUNDRA: 19,
  FARM: 20, DFLOOR: 21, DWALL: 22, CFLOOR: 23, CWALL: 24, DEADGRASS: 25, BADLAND: 26, ELFGRASS: 27, MUD: 28, SANDSTONE: 29,
  IFLOOR: 30, IWALL: 31, TFLOOR: 32, TWALL: 33, VFLOOR: 34, VWALL: 35, RFLOOR: 36, RWALL: 37, MFLOOR: 38, MWALL: 39,
  CARPET: 40, PALISADE: 41, DCOBBLE: 42, HWALL: 43, LOGWALL: 44, HFLOOR: 45
};
// solid: bloqueia; slow: multiplicador de velocidade; hurt: dano/s; c: cor do mapa; wall: renderizado como parede 3D
const TILE_DEFS = [];
function tdef(id, o) { TILE_DEFS[id] = Object.assign({ solid: false, slow: 1, hurt: 0, c: '#000', wall: false, water: false }, o); }
tdef(T.DEEP, { name: 'Mar', solid: true, c: '#1f4a8a', water: true });
tdef(T.WATER, { name: 'Água rasa', slow: 0.5, c: '#3a78c8', water: true });
tdef(T.SAND, { name: 'Areia', c: '#dcc98a' });
tdef(T.GRASS, { name: 'Grama', c: '#4f9a3c' });
tdef(T.DGRASS, { name: 'Bosque', c: '#3a7330' });
tdef(T.DIRT, { name: 'Terra', c: '#8a6a43' });
tdef(T.SNOW, { name: 'Neve', slow: 0.88, c: '#e6edf5' });
tdef(T.ICE, { name: 'Gelo', slow: 1.1, c: '#a6d6ee' });
tdef(T.SWAMP, { name: 'Pântano', slow: 0.75, c: '#4d5a2e' });
tdef(T.DESERT, { name: 'Deserto', slow: 0.92, c: '#e6b765' });
tdef(T.ROCK, { name: 'Montanha', solid: true, c: '#77706a', wall: true });
tdef(T.SNOWROCK, { name: 'Pico nevado', solid: true, c: '#c9d2dc', wall: true });
tdef(T.LAVA, { name: 'Lava', hurt: 25, slow: 0.6, c: '#ff5a1a' });
tdef(T.ASH, { name: 'Cinzas', c: '#4a4246' });
tdef(T.ROAD, { name: 'Estrada', slow: 1.15, c: '#b09163' });
tdef(T.COBBLE, { name: 'Calçada', slow: 1.15, c: '#8d8a86' });
tdef(T.WOOD, { name: 'Madeira', slow: 1.1, c: '#9c6b3c' });
tdef(T.WALL, { name: 'Muralha', solid: true, c: '#5d5a62', wall: true });
tdef(T.BRIDGE, { name: 'Ponte', slow: 1.1, c: '#a67845' });
tdef(T.TUNDRA, { name: 'Tundra', c: '#8a9a6e' });
tdef(T.FARM, { name: 'Plantação', c: '#7a5a2e' });
tdef(T.DFLOOR, { name: 'Piso', c: '#4b4552' });
tdef(T.DWALL, { name: 'Parede', solid: true, c: '#26212c', wall: true });
tdef(T.CFLOOR, { name: 'Caverna', c: '#5a4a3c' });
tdef(T.CWALL, { name: 'Rocha', solid: true, c: '#2e2520', wall: true });
tdef(T.DEADGRASS, { name: 'Terra morta', c: '#6b6040' });
tdef(T.BADLAND, { name: 'Terra vermelha', c: '#9c4a2c' });
tdef(T.ELFGRASS, { name: 'Clareira mágica', c: '#3d9a72' });
tdef(T.MUD, { name: 'Lama', slow: 0.8, c: '#5e4b35' });
tdef(T.SANDSTONE, { name: 'Arenito', slow: 1.15, c: '#c9a46a' });
tdef(T.IFLOOR, { name: 'Gelo', c: '#7fa8c4' });
tdef(T.IWALL, { name: 'Parede de gelo', solid: true, c: '#3b5a78', wall: true });
tdef(T.TFLOOR, { name: 'Piso antigo', c: '#a8875a' });
tdef(T.TWALL, { name: 'Parede de arenito', solid: true, c: '#6a5030', wall: true });
tdef(T.VFLOOR, { name: 'Rocha vulcânica', c: '#3a2a2a' });
tdef(T.VWALL, { name: 'Basalto', solid: true, c: '#1c1212', wall: true });
tdef(T.RFLOOR, { name: 'Pedra musgosa', c: '#506a50' });
tdef(T.RWALL, { name: 'Ruína', solid: true, c: '#2a3a2c', wall: true });
tdef(T.MFLOOR, { name: 'Piso anão', c: '#6a5844' });
tdef(T.MWALL, { name: 'Parede anã', solid: true, c: '#3a2e24', wall: true });
tdef(T.CARPET, { name: 'Tapete', c: '#8a2030' });
tdef(T.PALISADE, { name: 'Paliçada', solid: true, c: '#5a3a1e', wall: true });
tdef(T.DCOBBLE, { name: 'Calçada escura', slow: 1.15, c: '#5a5660' });
tdef(T.HWALL, { name: 'Parede', solid: true, c: '#c8b898', wall: true });
tdef(T.LOGWALL, { name: 'Parede de troncos', solid: true, c: '#6a4a2a', wall: true });
tdef(T.HFLOOR, { name: 'Assoalho', c: '#8a6038' });

// ---------- Objetos ----------
const O = {
  NONE: 0, OAK: 1, PINE: 2, SNOWPINE: 3, PALM: 4, DEADTREE: 5, WILLOW: 6, ELFTREE: 7, AUTUMN: 8, CACTUS: 9,
  BIGSHROOM: 10, BUSH: 11, ROCK: 12, BOULDER: 13, FLOWERS: 14, TALLGRASS: 15, REEDS: 16,
  ORE_FERRO: 17, ORE_PRATA: 18, ORE_OURO: 19, ORE_OBSIDIANA: 20, ORE_MALAQUITA: 21, ORE_EBANO: 22,
  HERB_RED: 23, HERB_BLUE: 24, HERB_SHROOM: 25, HERB_FIRE: 26, HERB_ICE: 27,
  CHEST: 28, CHEST_OPEN: 29, CAMPFIRE: 30, BLOCK: 31, SIGN: 32, WELL: 33, LAMP: 34, FENCE: 35, STALL: 36,
  TENT: 37, RUNESTONE: 38, SHRINE: 39, BONES: 40, TORCH: 41, STAIRS_UP: 42, BARREL: 43, CRATE: 44,
  FORGE: 45, ALCHEMY: 46, CRYSTAL: 47, PILLAR: 48, BROKEN_PILLAR: 49, GRAVE: 50, HAY: 51, CROP: 52, STATUE: 53,
  ENT_CAVE: 54, ENT_CRYPT: 55, ENT_RUIN: 56, ENT_MINE: 57, ENT_TOMB: 58, ENT_BARROW: 59, COBWEB: 60, SKULLS: 61,
  FOUNTAIN: 62, BANNER: 63, CHEST_BOSS: 64, ENT_LAVA: 65, ENT_ICE: 66, ENT_ARENA: 67, BED: 68, TABLE: 69, LILY: 70,
  HUT_TOTEM: 71, ICEROCK: 72, SANDROCK: 73, ALTAR: 74, PORTAL: 75,
  COUNTER: 76, SHELF: 77, BOOKSHELF: 78, CHAIR: 79, FIREPLACE: 80, THRONE: 81, PLANT: 82, WARDROBE: 83, CRIB: 84, WEAPONRACK: 85,
  DOOR_IN: 86, CANDLE: 87, BENCH: 88, POTSHELF: 89, KEG: 90, CAULDRON: 91, DESTINY: 92, ANVIL: 93, WINDOW: 94, PAINTING: 95, QUESTBOARD: 96, BEDSMALL: 97, DESTINY2: 98, DESTINY3: 99
};
// solid; tall=altura do sprite (px); harvest; light (raio px); kind de interação
const OBJ_DEFS = [];
function odef(id, o) { OBJ_DEFS[id] = Object.assign({ solid: false, harvest: null, light: 0, interact: null, name: '' }, o); }
odef(O.NONE, {});
odef(O.OAK, { name: 'Carvalho', solid: true });
odef(O.PINE, { name: 'Pinheiro', solid: true });
odef(O.SNOWPINE, { name: 'Pinheiro nevado', solid: true });
odef(O.PALM, { name: 'Palmeira', solid: true });
odef(O.DEADTREE, { name: 'Árvore morta', solid: true });
odef(O.WILLOW, { name: 'Salgueiro', solid: true });
odef(O.ELFTREE, { name: 'Árvore ancestral', solid: true, light: 26 });
odef(O.AUTUMN, { name: 'Árvore outonal', solid: true });
odef(O.CACTUS, { name: 'Cacto', solid: true });
odef(O.BIGSHROOM, { name: 'Cogumelo gigante', solid: true, light: 20 });
odef(O.BUSH, { name: 'Arbusto', solid: false });
odef(O.ROCK, { name: 'Pedra', solid: false });
odef(O.BOULDER, { name: 'Rocha', solid: true });
odef(O.ICEROCK, { name: 'Rocha de gelo', solid: true });
odef(O.SANDROCK, { name: 'Rocha de arenito', solid: true });
odef(O.FLOWERS, { name: 'Flores' });
odef(O.TALLGRASS, { name: 'Capim' });
odef(O.REEDS, { name: 'Juncos' });
odef(O.LILY, { name: 'Vitória-régia' });
odef(O.ORE_FERRO, { name: 'Veio de Ferro', solid: true, harvest: { item: 'minerio_ferro', n: [1, 3], skill: 'ferraria' }, interact: 'harvest' });
odef(O.ORE_PRATA, { name: 'Veio de Prata', solid: true, harvest: { item: 'minerio_prata', n: [1, 2], skill: 'ferraria' }, interact: 'harvest' });
odef(O.ORE_OURO, { name: 'Veio de Ouro', solid: true, harvest: { item: 'minerio_ouro', n: [1, 2], skill: 'ferraria' }, interact: 'harvest' });
odef(O.ORE_OBSIDIANA, { name: 'Veio de Obsidiana', solid: true, harvest: { item: 'minerio_obsidiana', n: [1, 2], skill: 'ferraria' }, interact: 'harvest' });
odef(O.ORE_MALAQUITA, { name: 'Veio de Malaquita', solid: true, harvest: { item: 'minerio_malaquita', n: [1, 2], skill: 'ferraria' }, interact: 'harvest' });
odef(O.ORE_EBANO, { name: 'Veio de Ébano', solid: true, harvest: { item: 'minerio_ebano', n: [1, 2], skill: 'ferraria' }, interact: 'harvest' });
odef(O.HERB_RED, { name: 'Flor Sanguínea', harvest: { item: 'erva_vermelha', n: [1, 2], skill: 'alquimia' }, interact: 'harvest' });
odef(O.HERB_BLUE, { name: 'Lírio Lunar', harvest: { item: 'erva_azul', n: [1, 2], skill: 'alquimia' }, interact: 'harvest', light: 12 });
odef(O.HERB_SHROOM, { name: 'Cogumelo Brilhante', harvest: { item: 'cogumelo', n: [1, 3], skill: 'alquimia' }, interact: 'harvest', light: 14 });
odef(O.HERB_FIRE, { name: 'Flor de Fogo', harvest: { item: 'flor_fogo', n: [1, 2], skill: 'alquimia' }, interact: 'harvest', light: 12 });
odef(O.HERB_ICE, { name: 'Raiz Gélida', harvest: { item: 'raiz_gelo', n: [1, 2], skill: 'alquimia' }, interact: 'harvest' });
odef(O.CHEST, { name: 'Baú', solid: true, interact: 'chest' });
odef(O.CHEST_OPEN, { name: 'Baú vazio', solid: true });
odef(O.CHEST_BOSS, { name: 'Baú do Tesouro', solid: true, interact: 'chest' });
odef(O.CAMPFIRE, { name: 'Fogueira', solid: true, light: 70, interact: 'cook' });
odef(O.BLOCK, { solid: true });
odef(O.SIGN, { name: 'Placa', solid: true, interact: 'sign' });
odef(O.WELL, { name: 'Poço', solid: true });
odef(O.FOUNTAIN, { name: 'Fonte', solid: true });
odef(O.LAMP, { name: 'Lampião', solid: true, light: 64 });
odef(O.FENCE, { name: 'Cerca', solid: true });
odef(O.STALL, { name: 'Barraca', solid: true });
odef(O.TENT, { name: 'Tenda', solid: true });
odef(O.RUNESTONE, { name: 'Pedra Rúnica', solid: true, interact: 'runestone', light: 30 });
odef(O.SHRINE, { name: 'Santuário', solid: true, interact: 'shrine', light: 36 });
odef(O.BONES, { name: 'Ossos' });
odef(O.SKULLS, { name: 'Crânios' });
odef(O.TORCH, { name: 'Tocha', solid: true, light: 72 });
odef(O.STAIRS_UP, { name: 'Saída', solid: true, interact: 'exit', light: 40 });
odef(O.BARREL, { name: 'Barril', solid: true });
odef(O.CRATE, { name: 'Caixote', solid: true });
odef(O.FORGE, { name: 'Forja', solid: true, interact: 'forge', light: 40 });
odef(O.ALCHEMY, { name: 'Bancada de Alquimia', solid: true, interact: 'alchemy' });
odef(O.CRYSTAL, { name: 'Cristal', solid: true, light: 40 });
odef(O.PILLAR, { name: 'Pilar', solid: true });
odef(O.BROKEN_PILLAR, { name: 'Pilar quebrado', solid: true });
odef(O.GRAVE, { name: 'Túmulo', solid: true });
odef(O.HAY, { name: 'Feno', solid: true });
odef(O.CROP, { name: 'Trigo' });
odef(O.STATUE, { name: 'Estátua', solid: true });
odef(O.BANNER, { name: 'Estandarte', solid: true });
odef(O.COBWEB, { name: 'Teia' });
odef(O.BED, { name: 'Cama', solid: true });
odef(O.TABLE, { name: 'Mesa', solid: true });
odef(O.HUT_TOTEM, { name: 'Totem', solid: true });
odef(O.ALTAR, { name: 'Altar', solid: true, light: 40 });
odef(O.PORTAL, { name: 'Portal', solid: true, interact: 'exit', light: 60 });
odef(O.COUNTER, { name: 'Balcão', solid: true });
odef(O.SHELF, { name: 'Prateleira', solid: true });
odef(O.BOOKSHELF, { name: 'Estante', solid: true });
odef(O.CHAIR, { name: 'Cadeira' });
odef(O.FIREPLACE, { name: 'Lareira', solid: true, light: 80, interact: 'cook' });
odef(O.THRONE, { name: 'Trono', solid: true });
odef(O.PLANT, { name: 'Vaso', solid: true });
odef(O.WARDROBE, { name: 'Baú da casa', solid: true, interact: 'wardrobe' });
odef(O.CRIB, { name: 'Berço', solid: true, interact: 'crib' });
odef(O.WEAPONRACK, { name: 'Armeiro', solid: true });
odef(O.DOOR_IN, { name: 'Porta', solid: true, interact: 'exit' });
odef(O.CANDLE, { name: 'Candelabro', solid: true, light: 46 });
odef(O.BENCH, { name: 'Banco' });
odef(O.POTSHELF, { name: 'Prateleira de poções', solid: true, light: 14 });
odef(O.KEG, { name: 'Barris de cerveja', solid: true });
odef(O.CAULDRON, { name: 'Caldeirão', solid: true, light: 24, interact: 'alchemy' });
odef(O.DESTINY, { name: 'Pedra do Guerreiro', solid: true, interact: 'destiny', light: 34 });
odef(O.DESTINY2, { name: 'Pedra do Mago', solid: true, interact: 'destiny', light: 34 });
odef(O.DESTINY3, { name: 'Pedra do Ladrão', solid: true, interact: 'destiny', light: 34 });
odef(O.ANVIL, { name: 'Bigorna', solid: true, interact: 'forge' });
odef(O.WINDOW, { name: 'Janela', solid: true, light: 20 });
odef(O.PAINTING, { name: 'Quadro', solid: true });
odef(O.QUESTBOARD, { name: 'Quadro de Missões', solid: true });
odef(O.BEDSMALL, { name: 'Cama', solid: true });
for (const id of [O.ENT_CAVE, O.ENT_CRYPT, O.ENT_RUIN, O.ENT_MINE, O.ENT_TOMB, O.ENT_BARROW, O.ENT_LAVA, O.ENT_ICE, O.ENT_ARENA])
  odef(id, { name: 'Entrada', solid: true, interact: 'dungeon', light: 24 });

// ---------- Regiões / Reinos ----------
const REGIONS = [
  { id: 'valdoria', name: 'Reino de Valdoria', short: 'Valdoria', race: 'humano', fx: 0.50, fy: 0.53, biome: 'plains', lvl: [1, 6], mount: -0.05, culture: 'human',
    ruler: { title: 'Rei', name: 'Aldric III', race: 'humano' }, towns: 3, villages: 6, dungeons: 16, color: '#e0b84a',
    desc: 'O maior reino humano. Campos dourados, castelos e estradas movimentadas.' },
  { id: 'colinas', name: 'Condado das Colinas', short: 'Colinas', race: 'pequenino', fx: 0.30, fy: 0.64, biome: 'hills', lvl: [1, 5], mount: 0.0, culture: 'halfling',
    ruler: { title: 'Prefeito', name: 'Bolgo Pé-Leve', race: 'pequenino' }, towns: 2, villages: 6, dungeons: 10, color: '#8ad050',
    desc: 'Terra dos pequeninos. Colinas floridas, tortas e muita fofoca.' },
  { id: 'sylvaris', name: 'Floresta de Sylvaris', short: 'Sylvaris', race: 'elfo', fx: 0.20, fy: 0.38, biome: 'forest', lvl: [3, 10], mount: 0.0, culture: 'elf',
    ruler: { title: 'Rainha', name: 'Elarion', race: 'elfo' }, towns: 3, villages: 4, dungeons: 14, color: '#40c090',
    desc: 'Floresta ancestral dos elfos, cheia de magia e segredos.' },
  { id: 'khazdurim', name: 'Montanhas de Khaz Durim', short: 'Khaz Durim', race: 'anao', fx: 0.50, fy: 0.17, biome: 'mountain', lvl: [8, 16], mount: 0.16, culture: 'dwarf',
    ruler: { title: 'Rei', name: 'Thorin Barba-de-Ferro', race: 'anao' }, towns: 3, villages: 3, dungeons: 14, color: '#b07850',
    desc: 'Fortalezas anãs escavadas nas montanhas. Minas profundas e forjas eternas.' },
  { id: 'nordheim', name: 'Terras Geladas de Nordheim', short: 'Nordheim', race: 'nordico', fx: 0.17, fy: 0.12, biome: 'snow', lvl: [10, 20], mount: 0.05, culture: 'nordic',
    ruler: { title: 'Jarl', name: 'Ragnvald Punho-de-Gelo', race: 'nordico' }, towns: 3, villages: 4, dungeons: 14, color: '#a0c8f0',
    desc: 'Terra gelada dos nórdicos. Túmulos antigos, draugrs e dragões.' },
  { id: 'gorthak', name: "Ermos de Gor'Thak", short: "Gor'Thak", race: 'orc', fx: 0.80, fy: 0.46, biome: 'volcanic', lvl: [12, 22], mount: 0.03, culture: 'orc',
    ruler: { title: 'Chefe', name: 'Grommash Quebra-Crânios', race: 'orc' }, towns: 2, villages: 4, dungeons: 14, color: '#d05030',
    desc: 'Ermos vulcânicos dos clãs orcs. Só os fortes sobrevivem.' },
  { id: 'zahrim', name: 'Deserto de Zahrim', short: 'Zahrim', race: 'felino', fx: 0.72, fy: 0.81, biome: 'desert', lvl: [8, 16], mount: -0.06, culture: 'desert',
    ruler: { title: 'Sultã', name: "Ra'Shana", race: 'felino' }, towns: 3, villages: 4, dungeons: 14, color: '#f0c060',
    desc: 'Areias infinitas, oásis, caravanas felinas e tumbas de faraós.' },
  { id: 'ssarak', name: 'Pântanos de Ssarak', short: 'Ssarak', race: 'draconato', fx: 0.40, fy: 0.85, biome: 'swamp', lvl: [6, 14], mount: -0.1, culture: 'swamp',
    ruler: { title: 'Matriarca', name: 'Sseth-Ka', race: 'draconato' }, towns: 2, villages: 4, dungeons: 12, color: '#70a040',
    desc: 'Pântanos nebulosos dos draconatos. Ruínas afundadas e criaturas antigas.' },
  { id: 'morvath', name: 'Terras Sombrias de Morvath', short: 'Morvath', race: null, fx: 0.83, fy: 0.15, biome: 'dead', lvl: [18, 30], mount: 0.04, culture: 'fort',
    ruler: null, towns: 1, villages: 0, dungeons: 14, color: '#8060a0', hostile: true,
    desc: 'Terra amaldiçoada do Lich Morvath. Os mortos não descansam aqui.' }
];
const REGION_BY_ID = {}; REGIONS.forEach((r, i) => { r.index = i; REGION_BY_ID[r.id] = r; });
const VOLCANO = { fx: 0.91, fy: 0.29 };

// ---------- Raças ----------
const RACES = {
  humano: { name: 'Humano', desc: 'Versáteis e ambiciosos. Aprendem rápido (+15% XP).', ability: 'coragem',
    skins: ['#f1c9a0', '#e0ac69', '#c68642', '#8d5524', '#5c3a1e'], hairs: ['#2a1a10', '#5a3a1a', '#a0703a', '#d8b860', '#8a2a1a', '#1a1a1a'],
    mods: { hp: 10, mp: 10, st: 10 }, xp: 0.15 },
  elfo: { name: 'Elfo', desc: 'Antigos e mágicos. +40 Magia e +15% dano mágico.', ability: 'graca',
    skins: ['#f8e0c8', '#e8c8a8', '#c0a8d8', '#8a7aa8'], hairs: ['#f0f0e0', '#e8d080', '#3a2a5a', '#2a4a3a', '#c0c0d0'],
    mods: { mp: 40, magic: 0.15 }, ears: 'elf', tall: 1 },
  anao: { name: 'Anão', desc: 'Robustos e teimosos. +25 Vida, +20 Armadura, resistem a veneno.', ability: 'pele_pedra',
    skins: ['#e8b890', '#d09a70', '#a8704a'], hairs: ['#8a3a1a', '#3a2a1a', '#c08040', '#9a9a9a', '#e0c070'],
    mods: { hp: 25, armor: 20 }, res: { poison: 0.5 }, beard: true, short: 2 },
  orc: { name: 'Orc', desc: 'Guerreiros brutais. +25 Vida e +15% dano corpo a corpo.', ability: 'furia',
    skins: ['#6a9a4a', '#4a7a3a', '#8aa05a', '#7a8a6a'], hairs: ['#1a1a1a', '#3a2a1a', '#5a1a1a'],
    mods: { hp: 25, melee: 0.15 }, tusks: true, bulky: true },
  pequenino: { name: 'Pequenino', desc: 'Pequenos e sortudos. +10% crítico, +25% ouro, mais rápidos.', ability: 'sorte',
    skins: ['#f1c9a0', '#e0ac69', '#c68642'], hairs: ['#5a3a1a', '#a0703a', '#d8b860', '#2a1a10'],
    mods: { crit: 0.10, gold: 0.25, speed: 0.05 }, short: 3 },
  draconato: { name: 'Draconato', desc: 'Descendentes de dragões. Resistem a fogo (50%) e cospem chamas.', ability: 'sopro',
    skins: ['#4a8a5a', '#8a3a2a', '#3a5a8a', '#a08a3a', '#5a3a6a'], hairs: ['#e0d0a0', '#2a2a2a', '#c0a060'],
    mods: { hp: 15, armor: 10 }, res: { fire: 0.5 }, snout: true, tail: true, horns: true },
  felino: { name: 'Felino', desc: 'Ágeis caçadores do deserto. +12% velocidade, garras e visão noturna.', ability: 'garras',
    skins: ['#d8a050', '#a87a40', '#e8d8b0', '#5a4a3a', '#c06030'], hairs: ['#3a2a1a', '#e8d8b0', '#1a1a1a'],
    mods: { speed: 0.12, st: 20 }, catears: true, tail: true, muzzle: true, nightvision: true },
  nordico: { name: 'Nórdico', desc: 'Filhos do gelo. +30 Vida, resistem ao frio (50%).', ability: 'sangue_gelo',
    skins: ['#f8dcc8', '#f0c8a8', '#e0b090'], hairs: ['#f0e0a0', '#d8c080', '#c06030', '#8a5a2a'],
    mods: { hp: 30, st: 10 }, res: { frost: 0.5 }, beard: true, tall: 1 }
};
const RACE_ABILITIES = {
  coragem: { name: 'Coragem Humana', desc: '+30% dano e -30% dano recebido por 30s.', cd: 120 },
  graca: { name: 'Graça Élfica', desc: 'Restaura toda a magia e regenera rapidamente por 20s.', cd: 120 },
  pele_pedra: { name: 'Pele de Pedra', desc: '-50% dano recebido por 30s.', cd: 120 },
  furia: { name: 'Fúria Orc', desc: '+50% dano corpo a corpo e ataques rápidos por 20s.', cd: 120 },
  sorte: { name: 'Sorte do Pequenino', desc: '+40% chance de crítico por 30s.', cd: 120 },
  sopro: { name: 'Sopro Dracônico', desc: 'Cospe fogo em cone causando grande dano.', cd: 60 },
  garras: { name: 'Garras Felinas', desc: '+40% velocidade e +25% dano por 20s.', cd: 120 },
  sangue_gelo: { name: 'Sangue de Gelo', desc: 'Cura 50% da vida e resiste a dano por 15s.', cd: 120 }
};

// ---------- Classes ----------
const CLASSES = {
  aventureiro: { name: 'Aventureiro', desc: 'Você decide quem será jogando: use espadas, arcos ou magias e seu estilo surgirá naturalmente.', mods: {},
    items: ['sword_ferro', 'body_couro', 'feet_couro', 'bow_ferro', 'flecha:25', 'pocao_vida_p', 'pocao_vida_p', 'pocao_vida_p', 'pocao_magia_p'], spells: ['bola_fogo', 'cura'],
    skills: {}, color: '#7a5a3a' },
  guerreiro: { name: 'Guerreiro', desc: 'Mestre das armas e armaduras pesadas.', mods: { hp: 30, st: 20 },
    items: ['sword_ferro', 'shield_ferro', 'body_ferro', 'head_ferro', 'pocao_vida_p', 'pocao_vida_p', 'pocao_vida_p'], spells: [],
    skills: { combate: 20, armadura: 15 }, color: '#a03030' },
  mago: { name: 'Mago', desc: 'Domina a destruição arcana. Frágil, porém letal.', mods: { mp: 60 },
    items: ['staff_aprendiz', 'robe_aprendiz', 'feet_couro', 'pocao_magia_p', 'pocao_magia_p', 'pocao_vida_p'], spells: ['bola_fogo', 'estilhaco_gelo', 'cura'],
    skills: { destruicao: 20, restauracao: 10 }, color: '#3050c0' },
  arqueiro: { name: 'Arqueiro', desc: 'Atira de longe com precisão mortal.', mods: { st: 30, hp: 10 },
    items: ['bow_ferro', 'dagger_ferro', 'body_couro', 'feet_couro', 'flecha:60', 'pocao_vida_p', 'pocao_vida_p'], spells: [],
    skills: { arquearia: 25 }, color: '#307030' },
  ladino: { name: 'Ladino', desc: 'Rápido, crítico e cheio de ouro.', mods: { st: 30 }, gold: 200,
    items: ['dagger_aco', 'body_couro', 'head_couro', 'feet_couro', 'bow_ferro', 'flecha:30', 'pocao_vida_p', 'pocao_vida_p'], spells: ['passo_arcano'],
    skills: { combate: 15, eloquencia: 15 }, crit: 0.1, color: '#404040' },
  paladino: { name: 'Paladino', desc: 'Guerreiro sagrado que cura e pune os mortos-vivos.', mods: { hp: 20, mp: 20 },
    items: ['mace_ferro', 'shield_ferro', 'body_ferro', 'pocao_vida_p', 'pocao_vida_p'], spells: ['cura', 'luz_sagrada'],
    skills: { combate: 15, restauracao: 15 }, color: '#d0b040' },
  druida: { name: 'Druida', desc: 'Guardião da natureza. Invoca feras e controla plantas.', mods: { mp: 40, hp: 10 },
    items: ['staff_carvalho', 'body_couro', 'feet_couro', 'pocao_vida_p', 'pocao_magia_p'], spells: ['raizes', 'invocar_lobo', 'cura'],
    skills: { conjuracao: 20, restauracao: 10 }, color: '#508030' }
};

// ---------- Habilidades ----------
// Estilos de jogo: surgem das habilidades mais usadas
const STYLE_PAIRS = {
  'combate+armadura': 'Guerreiro', 'combate+restauracao': 'Paladino', 'combate+destruicao': 'Cavaleiro Arcano', 'combate+arquearia': 'Batedor', 'combate+conjuracao': 'Cavaleiro Sombrio',
  'destruicao+restauracao': 'Mago', 'destruicao+conjuracao': 'Feiticeiro', 'arquearia+destruicao': 'Arqueiro Arcano', 'arquearia+eloquencia': 'Ladino',
  'conjuracao+restauracao': 'Druida', 'arquearia+armadura': 'Patrulheiro', 'armadura+restauracao': 'Templário', 'alquimia+eloquencia': 'Mercador', 'alquimia+conjuracao': 'Bruxo'
};
const STYLE_SINGLE = { combate: 'Guerreiro', armadura: 'Guardião', destruicao: 'Mago', restauracao: 'Clérigo', conjuracao: 'Conjurador', arquearia: 'Arqueiro', ferraria: 'Ferreiro', alquimia: 'Alquimista', eloquencia: 'Mercador' };
const STYLE_BONUS = {
  Guerreiro: { melee: 0.1, hp: 20, d: '+10% dano corpo a corpo, +20 vida' }, Guardião: { armor: 25, hp: 20, d: '+25 armadura, +20 vida' }, Mago: { magic: 0.12, mp: 25, d: '+12% dano mágico, +25 magia' },
  Clérigo: { heal: 0.25, mp: 20, d: '+25% cura, +20 magia' }, Conjurador: { summon: 0.25, mp: 20, d: 'Invocações 25% mais fortes, +20 magia' }, Arqueiro: { bow: 0.12, st: 20, d: '+12% dano com arco, +20 vigor' },
  Ferreiro: { armor: 15, craft: 1, d: '+15 armadura, forja melhor' }, Alquimista: { potion: 0.25, d: 'Poções 25% mais fortes' }, Mercador: { price: 0.1, gold: 0.15, d: 'Preços 10% melhores, +15% ouro' },
  Paladino: { melee: 0.08, heal: 0.15, armor: 10, d: '+8% corpo a corpo, +15% cura, +10 armadura' }, 'Cavaleiro Arcano': { melee: 0.08, magic: 0.08, d: '+8% corpo a corpo e mágico' },
  Batedor: { melee: 0.06, bow: 0.06, st: 20, d: '+6% corpo a corpo e arco, +20 vigor' }, 'Cavaleiro Sombrio': { melee: 0.08, summon: 0.15, d: '+8% corpo a corpo, invocações mais fortes' },
  Feiticeiro: { magic: 0.1, summon: 0.15, d: '+10% mágico, invocações mais fortes' }, 'Arqueiro Arcano': { bow: 0.08, magic: 0.08, d: '+8% arco e mágico' }, Ladino: { bow: 0.06, crit: 0.06, gold: 0.15, d: '+6% crítico, +15% ouro' },
  Druida: { summon: 0.2, heal: 0.15, d: 'Invocações e cura mais fortes' }, Patrulheiro: { bow: 0.1, armor: 10, d: '+10% arco, +10 armadura' }, Templário: { armor: 20, heal: 0.15, d: '+20 armadura, +15% cura' },
  Bruxo: { potion: 0.15, summon: 0.15, d: 'Poções e invocações mais fortes' }, Aventureiro: { d: 'Use suas habilidades para definir seu estilo.' }
};
const DESTINY = {
  guerreiro: { name: 'Pedra do Guerreiro', skills: ['combate', 'armadura', 'ferraria', 'arquearia'], desc: 'Combate, Armadura, Arquearia e Ferraria evoluem 25% mais rápido.', c: '#e05040' },
  mago: { name: 'Pedra do Mago', skills: ['destruicao', 'restauracao', 'conjuracao', 'alquimia'], desc: 'Destruição, Restauração, Conjuração e Alquimia evoluem 25% mais rápido.', c: '#5080ff' },
  ladrao: { name: 'Pedra do Ladrão', skills: ['arquearia', 'eloquencia', 'alquimia', 'combate'], desc: 'Arquearia, Eloquência, Alquimia e Combate evoluem 20% mais rápido e +10% ouro.', c: '#50d070' }
};
const SKILLS = {
  combate: 'Combate', arquearia: 'Arquearia', destruicao: 'Destruição', restauracao: 'Restauração', conjuracao: 'Conjuração',
  armadura: 'Armadura', ferraria: 'Ferraria', alquimia: 'Alquimia', eloquencia: 'Eloquência'
};

// ---------- Materiais e itens gerados ----------
const MATERIALS = [
  { id: 'couro', name: 'Couro', of: true, tier: 0, color: '#8a5a32', w: 0.85, a: 0.7, val: 0.8, lvl: 1, ingot: 'couro', skill: 0, armorOnly: true },
  { id: 'ferro', name: 'Ferro', of: true, tier: 1, color: '#9aa0a8', w: 1.0, a: 1.0, val: 1, lvl: 1, ingot: 'lingote_ferro', skill: 0 },
  { id: 'aco', name: 'Aço', of: true, tier: 2, color: '#d0d8e0', w: 1.3, a: 1.35, val: 2, lvl: 4, ingot: 'lingote_aco', skill: 15 },
  { id: 'elfico', m: 'Élfico', f: 'Élfica', tier: 3, color: '#e0c060', w: 1.6, a: 1.65, val: 4, lvl: 8, ingot: 'lingote_prata', skill: 30 },
  { id: 'anao', m: 'Anão', f: 'Anã', tier: 3, color: '#c8884a', w: 1.75, a: 1.85, val: 5, lvl: 11, ingot: 'lingote_ouro', skill: 38 },
  { id: 'orc', m: 'Orc', f: 'Orc', tier: 4, color: '#607050', w: 2.05, a: 2.15, val: 7, lvl: 15, ingot: 'lingote_obsidiana', skill: 48 },
  { id: 'vidro', name: 'Vidro', of: true, tier: 5, color: '#70e0a0', w: 2.45, a: 2.5, val: 11, lvl: 19, ingot: 'vidro_malaquita', skill: 60 },
  { id: 'ebano', name: 'Ébano', of: true, tier: 6, color: '#40384e', w: 2.95, a: 3.0, val: 16, lvl: 24, ingot: 'lingote_ebano', skill: 75 },
  { id: 'draconico', m: 'Dracônico', f: 'Dracônica', tier: 7, color: '#c03028', w: 3.6, a: 3.6, val: 26, lvl: 30, ingot: 'escama_dragao', skill: 90 }
];
const MAT_BY_ID = {}; MATERIALS.forEach(m => MAT_BY_ID[m.id] = m);

const WEAPON_TYPES = {
  sword: { name: 'Espada', g: 'f', dmg: 10, cd: 0.42, range: 20, val: 40, n: 2, arc: 1.1 },
  axe: { name: 'Machado', g: 'm', dmg: 12, cd: 0.5, range: 20, val: 45, n: 2, arc: 1.1 },
  mace: { name: 'Maça', g: 'f', dmg: 13, cd: 0.56, range: 19, val: 45, n: 2, arc: 1.0, holy: true },
  dagger: { name: 'Adaga', g: 'f', dmg: 7, cd: 0.28, range: 16, val: 25, n: 1, arc: 0.9, crit: 0.12 },
  great: { name: 'Espada Grande', g: 'f', dmg: 20, cd: 0.8, range: 25, val: 70, n: 3, arc: 1.5, two: true },
  hammer: { name: 'Martelo de Guerra', g: 'm', dmg: 23, cd: 0.9, range: 24, val: 75, n: 3, arc: 1.4, two: true },
  bow: { name: 'Arco', g: 'm', dmg: 12, cd: 0.6, range: 200, val: 50, n: 2, ranged: true, two: true }
};
const ARMOR_TYPES = {
  body: { name: 'Couraça', g: 'f', a: 20, val: 60, n: 4, leather: 'Armadura de Couro' },
  head: { name: 'Elmo', g: 'm', a: 8, val: 30, n: 2, leather: 'Capuz de Couro' },
  feet: { name: 'Botas', g: 'f', a: 6, val: 25, n: 2, leather: 'Botas de Couro' },
  shield: { name: 'Escudo', g: 'm', a: 12, val: 40, n: 3, slot: 'offhand', leather: 'Broquel de Couro' }
};

const ITEMS = {};
function idef(id, o) { ITEMS[id] = Object.assign({ id, value: 1, stack: false }, o); return ITEMS[id]; }
function matName(typeName, g, mat) {
  if (mat.of) return typeName + ' de ' + mat.name;
  return typeName + ' ' + (g === 'f' ? mat.f : mat.m);
}
for (const mat of MATERIALS) {
  if (!mat.armorOnly) {
    for (const [wk, w] of Object.entries(WEAPON_TYPES)) {
      idef(wk + '_' + mat.id, {
        name: matName(w.name, w.g, mat), type: 'weapon', slot: 'weapon', wclass: wk, mat: mat.id, tier: mat.tier,
        dmg: Math.round(w.dmg * mat.w), cd: w.cd, range: w.range, arc: w.arc, crit: w.crit || 0, two: !!w.two, ranged: !!w.ranged,
        value: Math.round(w.val * mat.val), icon: { k: wk, c: mat.color }, craft: { mat: mat.id, n: w.n }, lvl: mat.lvl, holy: w.holy
      });
    }
  }
  for (const [ak, a] of Object.entries(ARMOR_TYPES)) {
    if (mat.id === 'draconico' && ak === 'shield') { /* ok */ }
    const name = mat.armorOnly ? a.leather : matName(a.name, a.g, mat);
    idef(ak + '_' + mat.id, {
      name, type: 'armor', slot: a.slot || ak, akind: ak, mat: mat.id, tier: mat.tier,
      armor: Math.round(a.a * mat.a), value: Math.round(a.val * mat.val), icon: { k: ak, c: mat.color }, craft: { mat: mat.id, n: a.n }, lvl: mat.lvl
    });
  }
}
// Cajados e mantos
const STAFFS = [
  { id: 'staff_aprendiz', name: 'Cajado do Aprendiz', dmg: 6, magic: 0.10, value: 40, c: '#8a6a3a', g: '#6aa0ff', lvl: 1 },
  { id: 'staff_carvalho', name: 'Cajado de Carvalho', dmg: 7, magic: 0.10, value: 40, c: '#6a4a2a', g: '#80e060', lvl: 1 },
  { id: 'staff_adepto', name: 'Cajado do Adepto', dmg: 11, magic: 0.25, value: 180, c: '#5a4a6a', g: '#c070ff', lvl: 6 },
  { id: 'staff_elfico', name: 'Cajado Élfico', dmg: 15, magic: 0.40, value: 450, c: '#d0c070', g: '#70ffd0', lvl: 12 },
  { id: 'staff_mestre', name: 'Cajado do Mestre', dmg: 20, magic: 0.60, value: 1100, c: '#3a3a5a', g: '#ff70a0', lvl: 18 },
  { id: 'staff_arquimago', name: 'Cajado do Arquimago', dmg: 28, magic: 0.85, value: 2600, c: '#202030', g: '#ffe060', lvl: 25 }
];
for (const s of STAFFS) idef(s.id, { name: s.name, type: 'weapon', slot: 'weapon', wclass: 'staff', dmg: s.dmg, cd: 0.5, range: 160, magicBonus: s.magic, value: s.value, icon: { k: 'staff', c: s.c, g: s.g }, two: true, ranged: true, lvl: s.lvl, tier: Math.ceil(s.lvl / 5) });
const ROBES = [
  { id: 'robe_aprendiz', name: 'Manto do Aprendiz', a: 4, mp: 20, regen: 0.2, value: 40, c: '#3a50a0', lvl: 1 },
  { id: 'robe_adepto', name: 'Manto do Adepto', a: 6, mp: 40, regen: 0.35, value: 200, c: '#6a3a9a', lvl: 6 },
  { id: 'robe_mestre', name: 'Manto do Mestre', a: 9, mp: 70, regen: 0.55, value: 900, c: '#9a2a4a', lvl: 15 },
  { id: 'robe_arquimago', name: 'Manto do Arquimago', a: 12, mp: 110, regen: 0.8, value: 2400, c: '#e0c040', lvl: 24 },
  { id: 'robe_druida', name: 'Manto do Druida', a: 7, mp: 40, regen: 0.4, value: 220, c: '#4a7a3a', lvl: 6 },
  { id: 'robe_sombras', name: 'Capa das Sombras', a: 10, mp: 20, regen: 0.1, value: 400, c: '#2a2a3a', lvl: 8, crit: 0.08 }
];
for (const r of ROBES) idef(r.id, { name: r.name, type: 'armor', slot: 'body', akind: 'robe', armor: r.a, mpBonus: r.mp, mpRegen: r.regen, value: r.value, icon: { k: 'robe', c: r.c }, lvl: r.lvl, crit: r.crit || 0, color: r.c });

// Joias
idef('anel_prata', { name: 'Anel de Prata', type: 'armor', slot: 'ring', armor: 0, value: 60, icon: { k: 'ring', c: '#d0d8e0', g: '#70a0ff' } });
idef('anel_ouro', { name: 'Anel de Ouro', type: 'armor', slot: 'ring', armor: 0, value: 120, icon: { k: 'ring', c: '#f0c040', g: '#ff4040' } });
idef('amuleto_prata', { name: 'Amuleto de Prata', type: 'armor', slot: 'neck', armor: 0, value: 80, icon: { k: 'amulet', c: '#d0d8e0', g: '#40c0ff' } });
idef('amuleto_ouro', { name: 'Amuleto de Ouro', type: 'armor', slot: 'neck', armor: 0, value: 160, icon: { k: 'amulet', c: '#f0c040', g: '#40ff80' } });

// Artefatos únicos
idef('lamina_alvorecer', { name: 'Lâmina do Alvorecer', type: 'weapon', slot: 'weapon', wclass: 'sword', dmg: 48, cd: 0.38, range: 22, arc: 1.2, value: 5000, icon: { k: 'sword', c: '#ffe080' }, unique: true, ench: [{ k: 'holy', v: 20 }, { k: 'fire', v: 10 }], lvl: 15, tier: 6 });
idef('arco_lunar', { name: 'Arco Lunar de Sylvaris', type: 'weapon', slot: 'weapon', wclass: 'bow', dmg: 40, cd: 0.5, range: 220, ranged: true, two: true, value: 4000, icon: { k: 'bow', c: '#a0e0ff' }, unique: true, ench: [{ k: 'frost', v: 12 }], lvl: 8, tier: 5 });
idef('martelo_runico', { name: 'Martelo Rúnico de Durim', type: 'weapon', slot: 'weapon', wclass: 'hammer', dmg: 70, cd: 0.8, range: 25, arc: 1.4, two: true, value: 6000, icon: { k: 'hammer', c: '#70c0ff' }, unique: true, ench: [{ k: 'shock', v: 20 }], lvl: 13, tier: 6 });
idef('machado_grommash', { name: 'Machado de Sangue de Grommash', type: 'weapon', slot: 'weapon', wclass: 'axe', dmg: 62, cd: 0.42, range: 21, arc: 1.2, value: 6000, icon: { k: 'axe', c: '#d03030' }, unique: true, ench: [{ k: 'drain', v: 8 }], lvl: 17, tier: 6 });
idef('cajado_morvath', { name: 'Cajado do Lich Morvath', type: 'weapon', slot: 'weapon', wclass: 'staff', dmg: 34, cd: 0.45, range: 170, magicBonus: 1.2, two: true, ranged: true, value: 8000, icon: { k: 'staff', c: '#302040', g: '#a040ff' }, unique: true, ench: [{ k: 'drain', v: 6 }], lvl: 24, tier: 7 });
idef('presa_vorthax', { name: 'Presa de Vorthax', type: 'weapon', slot: 'weapon', wclass: 'great', dmg: 110, cd: 0.7, range: 26, arc: 1.5, two: true, value: 15000, icon: { k: 'great', c: '#ff6030' }, unique: true, ench: [{ k: 'fire', v: 35 }], lvl: 30, tier: 8 });
idef('coroa_heroi', { name: 'Coroa do Herói', type: 'armor', slot: 'head', armor: 40, value: 5000, icon: { k: 'head', c: '#ffd040' }, unique: true, ench: [{ k: 'hp', v: 50 }, { k: 'mp', v: 50 }], lvl: 20, tier: 6 });
idef('escudo_aurora', { name: 'Escudo da Aurora', type: 'armor', slot: 'offhand', akind: 'shield', armor: 45, value: 3000, icon: { k: 'shield', c: '#fff0a0' }, unique: true, ench: [{ k: 'def', v: 20 }], lvl: 12, tier: 5 });
idef('anel_sombras', { name: 'Anel das Sombras', type: 'armor', slot: 'ring', armor: 0, value: 2500, icon: { k: 'ring', c: '#2a2a3a', g: '#a040ff' }, unique: true, ench: [{ k: 'crit', v: 15 }, { k: 'speed', v: 10 }], lvl: 10 });
idef('amuleto_druida', { name: 'Amuleto do Círculo', type: 'armor', slot: 'neck', armor: 0, value: 2500, icon: { k: 'amulet', c: '#6a4a2a', g: '#60ff60' }, unique: true, ench: [{ k: 'regen', v: 3 }, { k: 'mp', v: 40 }], lvl: 10 });
idef('martelo_forja', { name: 'Martelo da Forja Eterna', type: 'weapon', slot: 'weapon', wclass: 'mace', dmg: 55, cd: 0.5, range: 20, arc: 1.0, value: 4500, icon: { k: 'mace', c: '#ff9040' }, unique: true, ench: [{ k: 'fire', v: 15 }], lvl: 15, tier: 6 });
idef('arco_cacador', { name: 'Arco do Grande Caçador', type: 'weapon', slot: 'weapon', wclass: 'bow', dmg: 52, cd: 0.45, range: 230, ranged: true, two: true, value: 4500, icon: { k: 'bow', c: '#6a8a3a' }, unique: true, ench: [{ k: 'crit', v: 15 }], lvl: 15, tier: 6 });

// Consumíveis
const POTIONS = [
  ['pocao_vida_p', 'Poção de Vida Menor', { heal: 45 }, 20, '#e03030'],
  ['pocao_vida_m', 'Poção de Vida', { heal: 110 }, 55, '#e03030'],
  ['pocao_vida_g', 'Poção de Vida Maior', { heal: 280 }, 130, '#e03030'],
  ['pocao_magia_p', 'Poção de Magia Menor', { mana: 45 }, 22, '#3070f0'],
  ['pocao_magia_m', 'Poção de Magia', { mana: 110 }, 60, '#3070f0'],
  ['pocao_magia_g', 'Poção de Magia Maior', { mana: 280 }, 140, '#3070f0'],
  ['pocao_vigor', 'Poção de Vigor', { stam: 120 }, 25, '#30c040'],
  ['pocao_res_fogo', 'Poção de Resistência ao Fogo', { buff: { k: 'resFire', v: 0.5, t: 120 } }, 60, '#ff8030'],
  ['pocao_res_gelo', 'Poção de Resistência ao Gelo', { buff: { k: 'resFrost', v: 0.5, t: 120 } }, 60, '#a0e0ff'],
  ['pocao_forca', 'Poção de Força', { buff: { k: 'dmg', v: 0.3, t: 60 } }, 80, '#c04020'],
  ['pocao_velocidade', 'Poção de Velocidade', { buff: { k: 'speed', v: 0.3, t: 60 } }, 70, '#f0f040'],
  ['antidoto', 'Antídoto', { cure: true }, 30, '#80ff80'],
  ['elixir_heroi', 'Elixir do Herói', { heal: 9999, mana: 9999, stam: 9999, buff: { k: 'dmg', v: 0.25, t: 120 } }, 600, '#ffd040']
];
for (const [id, name, eff, value, c] of POTIONS) idef(id, { name, type: 'potion', use: eff, value, stack: true, icon: { k: 'potion', c } });
const FOODS = [
  ['maca', 'Maçã', { heal: 8 }, 3, { k: 'apple', c: '#d03020' }],
  ['pao', 'Pão', { heal: 14 }, 4, { k: 'bread', c: '#c8903a' }],
  ['queijo', 'Queijo', { heal: 18 }, 6, { k: 'cheese', c: '#f0d040' }],
  ['batata', 'Batata', { heal: 8 }, 2, { k: 'potato', c: '#a88050' }],
  ['carne_crua', 'Carne Crua', { heal: 5 }, 4, { k: 'meat', c: '#d06060' }],
  ['carne_assada', 'Carne Assada', { heal: 30, stam: 30 }, 12, { k: 'meat', c: '#8a4a2a' }],
  ['ensopado', 'Ensopado', { heal: 60, stam: 60, buff: { k: 'regen', v: 2, t: 60 } }, 25, { k: 'stew', c: '#a06030' }],
  ['torta_maca', 'Torta de Maçã', { heal: 40, buff: { k: 'regen', v: 1, t: 60 } }, 20, { k: 'pie', c: '#d09040' }],
  ['hidromel', 'Hidromel', { stam: 80, buff: { k: 'resFrost', v: 0.2, t: 120 } }, 15, { k: 'bottle', c: '#d0a030' }],
  ['vinho', 'Vinho Élfico', { mana: 50 }, 30, { k: 'bottle', c: '#802040' }],
  ['peixe', 'Peixe', { heal: 10 }, 6, { k: 'fish', c: '#8aa0b0' }],
  ['salmao', 'Salmão', { heal: 18 }, 14, { k: 'fish', c: '#e08070' }],
  ['peixe_gelo', 'Peixe do Gelo', { heal: 15, buff: { k: 'resFire', v: 0.2, t: 60 } }, 20, { k: 'fish', c: '#c0e8ff' }],
  ['enguia', 'Enguia do Pântano', { heal: 14, mana: 15 }, 18, { k: 'fish', c: '#4a6a3a' }],
  ['peixe_dourado', 'Peixe Dourado', { heal: 40 }, 90, { k: 'fish', c: '#ffd040' }],
  ['peixe_assado', 'Peixe Assado', { heal: 35, stam: 40 }, 18, { k: 'fish', c: '#b07040' }],
  ['bolo', 'Bolo de Festa', { heal: 50, buff: { k: 'regen', v: 2, t: 120 } }, 40, { k: 'pie', c: '#f0a0c0' }]
];
for (const [id, name, eff, value, icon] of FOODS) idef(id, { name, type: 'food', use: eff, value, stack: true, icon });

// Materiais
const MATS = [
  ['minerio_ferro', 'Minério de Ferro', 6, { k: 'ore', c: '#9a8a7a' }],
  ['minerio_prata', 'Minério de Prata', 12, { k: 'ore', c: '#d0d8e0' }],
  ['minerio_ouro', 'Minério de Ouro', 18, { k: 'ore', c: '#f0c040' }],
  ['minerio_obsidiana', 'Obsidiana Bruta', 24, { k: 'ore', c: '#3a3040' }],
  ['minerio_malaquita', 'Malaquita Bruta', 32, { k: 'ore', c: '#40c070' }],
  ['minerio_ebano', 'Minério de Ébano', 45, { k: 'ore', c: '#2a2238' }],
  ['lingote_ferro', 'Lingote de Ferro', 14, { k: 'ingot', c: '#9aa0a8' }],
  ['lingote_aco', 'Lingote de Aço', 24, { k: 'ingot', c: '#d0d8e0' }],
  ['lingote_prata', 'Lingote de Prata', 30, { k: 'ingot', c: '#e8eef8' }],
  ['lingote_ouro', 'Lingote de Ouro', 45, { k: 'ingot', c: '#f0c040' }],
  ['lingote_obsidiana', 'Lingote de Obsidiana', 60, { k: 'ingot', c: '#4a4050' }],
  ['vidro_malaquita', 'Vidro de Malaquita', 80, { k: 'ingot', c: '#60e0a0' }],
  ['lingote_ebano', 'Lingote de Ébano', 110, { k: 'ingot', c: '#3a3048' }],
  ['couro', 'Couro', 8, { k: 'leather', c: '#8a5a32' }],
  ['pele_lobo', 'Pele de Lobo', 10, { k: 'pelt', c: '#7a7a80' }],
  ['pele_urso', 'Pele de Urso', 20, { k: 'pelt', c: '#6a4a2a' }],
  ['pele_gelo', 'Pele Gélida', 30, { k: 'pelt', c: '#e0e8f0' }],
  ['presa', 'Presa', 8, { k: 'fang', c: '#f0e8d0' }],
  ['chifre', 'Chifre de Cervo', 12, { k: 'horn', c: '#c0a070' }],
  ['osso', 'Osso', 3, { k: 'bone', c: '#e8e0c8' }],
  ['seda_aranha', 'Seda de Aranha', 10, { k: 'silk', c: '#e8e8f0' }],
  ['veneno', 'Glândula de Veneno', 15, { k: 'gland', c: '#80c030' }],
  ['gosma', 'Gosma', 5, { k: 'goo', c: '#60d060' }],
  ['asa_morcego', 'Asa de Morcego', 6, { k: 'wing', c: '#4a3a4a' }],
  ['ectoplasma', 'Ectoplasma', 25, { k: 'goo', c: '#a0f0e0' }],
  ['essencia_fogo', 'Essência de Fogo', 35, { k: 'essence', c: '#ff7020' }],
  ['essencia_gelo', 'Essência de Gelo', 35, { k: 'essence', c: '#80d0ff' }],
  ['gordura_troll', 'Gordura de Troll', 20, { k: 'goo', c: '#c0b080' }],
  ['carapaca', 'Carapaça', 18, { k: 'shell', c: '#8a5030' }],
  ['bandagem', 'Bandagem Antiga', 12, { k: 'silk', c: '#c8b890' }],
  ['escama_lagarto', 'Escama de Lagarto', 14, { k: 'scale', c: '#5a8a3a' }],
  ['escama_dragao', 'Escama de Dragão', 250, { k: 'scale', c: '#c03028' }],
  ['osso_dragao', 'Osso de Dragão', 300, { k: 'bone', c: '#f0e0b0' }],
  ['erva_vermelha', 'Flor Sanguínea', 5, { k: 'herb', c: '#e03040' }],
  ['erva_azul', 'Lírio Lunar', 6, { k: 'herb', c: '#5080ff' }],
  ['cogumelo', 'Cogumelo Brilhante', 5, { k: 'shroom', c: '#a060e0' }],
  ['flor_fogo', 'Flor de Fogo', 10, { k: 'herb', c: '#ff8020' }],
  ['raiz_gelo', 'Raiz Gélida', 10, { k: 'root', c: '#a0e0ff' }],
  ['rubi', 'Rubi', 120, { k: 'gem', c: '#e02040' }],
  ['safira', 'Safira', 120, { k: 'gem', c: '#2050e0' }],
  ['esmeralda', 'Esmeralda', 130, { k: 'gem', c: '#20c060' }],
  ['ametista', 'Ametista', 90, { k: 'gem', c: '#a040e0' }],
  ['diamante', 'Diamante', 300, { k: 'gem', c: '#e0f8ff' }],
  ['alma_dragao', 'Alma de Dragão', 0, { k: 'soul', c: '#ffb040' }]
];
for (const [id, name, value, icon] of MATS) idef(id, { name, type: 'material', value, stack: true, icon });
ITEMS.alma_dragao.type = 'misc';
idef('flecha', { name: 'Flecha', type: 'ammo', value: 1, stack: true, icon: { k: 'arrow', c: '#c0c0c0' } });
idef('tocha', { name: 'Tocha', type: 'misc', value: 3, stack: true, icon: { k: 'torch', c: '#ff9030' }, desc: 'Ilumina mais em lugares escuros (passivo).' });
idef('pergaminho_anciao', { name: 'Pergaminho Ancião', type: 'quest', value: 0, icon: { k: 'scroll', c: '#f0e0a0' }, desc: 'Escrito na língua dos dragões.' });
idef('totem_orc', { name: "Totem de Gor'Thak", type: 'quest', value: 0, icon: { k: 'totem', c: '#a04020' } });
idef('filacterio', { name: 'Filactério de Morvath', type: 'quest', value: 0, icon: { k: 'gem', c: '#8020c0' } });
idef('pacote', { name: 'Pacote Lacrado', type: 'quest', value: 0, icon: { k: 'crate', c: '#a07040' } });
idef('carta', { name: 'Carta Selada', type: 'quest', value: 0, icon: { k: 'scroll', c: '#e0d0b0' } });
idef('mapa_tesouro', { name: 'Mapa do Tesouro', type: 'misc', value: 50, icon: { k: 'scroll', c: '#d0b070' }, desc: 'Revela um tesouro escondido (use).' , use: { treasure: true }, stack: true });

// ---------- Encantamentos ----------
const ENCHANTS = {
  fire: { name: 'de Fogo', desc: v => `+${v} dano de fogo`, weapon: true, c: '#ff7020' },
  frost: { name: 'de Gelo', desc: v => `+${v} dano de gelo e lentidão`, weapon: true, c: '#80d0ff' },
  shock: { name: 'do Trovão', desc: v => `+${v} dano elétrico`, weapon: true, c: '#fff070' },
  drain: { name: 'Vampírico', desc: v => `${v}% do dano vira vida`, weapon: true, c: '#c02040', pct: true },
  holy: { name: 'Sagrado', desc: v => `+${v} dano sagrado (x3 em mortos-vivos)`, weapon: true, c: '#fff0a0' },
  crit: { name: 'da Precisão', desc: v => `+${v}% chance de crítico`, both: true, c: '#ffffff', pct: true },
  hp: { name: 'da Vitalidade', desc: v => `+${v} Vida máxima`, armor: true, c: '#e03030' },
  mp: { name: 'da Sabedoria', desc: v => `+${v} Magia máxima`, armor: true, c: '#3070f0' },
  st: { name: 'do Vigor', desc: v => `+${v} Vigor máximo`, armor: true, c: '#30c040' },
  def: { name: 'da Proteção', desc: v => `+${v} Armadura`, armor: true, c: '#a0a0b0' },
  speed: { name: 'da Agilidade', desc: v => `+${v}% velocidade`, armor: true, c: '#f0f040', pct: true },
  magic: { name: 'do Arcano', desc: v => `+${v}% dano mágico`, both: true, c: '#c070ff', pct: true },
  regen: { name: 'da Regeneração', desc: v => `+${v} vida/s`, armor: true, c: '#60ff60' },
  luck: { name: 'da Fortuna', desc: v => `+${v}% ouro`, armor: true, c: '#ffd040', pct: true },
  resFire: { name: 'Antichamas', desc: v => `+${v}% resistência a fogo`, armor: true, c: '#ff9050', pct: true },
  resFrost: { name: 'do Inverno', desc: v => `+${v}% resistência a gelo`, armor: true, c: '#a0e0ff', pct: true }
};
const RARITY = [
  { name: 'Comum', c: '#e8e8e8', ench: 0, mult: 1 },
  { name: 'Incomum', c: '#50e050', ench: 1, mult: 1.08 },
  { name: 'Raro', c: '#5090ff', ench: 1, mult: 1.15 },
  { name: 'Épico', c: '#c060ff', ench: 2, mult: 1.25 },
  { name: 'Lendário', c: '#ff9a20', ench: 3, mult: 1.4 }
];

// ---------- Magias ----------
const SPELLS = {
  bola_fogo: { name: 'Bola de Fogo', school: 'destruicao', cost: 14, cd: 0.55, kind: 'proj', dmg: 16, spd: 190, elem: 'fire', aoe: 20, color: '#ff7a1a', price: 80, desc: 'Projétil flamejante que explode.' },
  estilhaco_gelo: { name: 'Estilhaço de Gelo', school: 'destruicao', cost: 12, cd: 0.45, kind: 'proj', dmg: 13, spd: 230, elem: 'frost', slow: 0.5, color: '#a0e8ff', price: 80, desc: 'Fragmento gelado que desacelera.' },
  raio: { name: 'Raio', school: 'destruicao', cost: 18, cd: 0.7, kind: 'chain', dmg: 20, range: 140, chains: 2, elem: 'shock', color: '#fff27a', price: 200, desc: 'Relâmpago que salta entre inimigos.' },
  drenar_vida: { name: 'Drenar Vida', school: 'destruicao', cost: 18, cd: 0.7, kind: 'proj', dmg: 14, spd: 170, elem: 'dark', drain: 0.6, color: '#c02050', price: 260, desc: 'Rouba a vida do alvo.' },
  nevoa_toxica: { name: 'Névoa Tóxica', school: 'destruicao', cost: 26, cd: 2, kind: 'cloud', dmg: 8, radius: 40, t: 6, elem: 'poison', color: '#80e040', price: 300, desc: 'Nuvem venenosa no alvo.' },
  nevasca: { name: 'Nevasca', school: 'destruicao', cost: 60, cd: 4, kind: 'nova', dmg: 40, radius: 80, elem: 'frost', slow: 0.6, color: '#c0f0ff', price: 900, minLvl: 12, desc: 'Explosão de gelo ao seu redor.' },
  meteoro: { name: 'Meteoro', school: 'destruicao', cost: 70, cd: 4, kind: 'meteor', dmg: 95, radius: 50, delay: 0.9, elem: 'fire', color: '#ff5010', price: 1500, minLvl: 16, desc: 'Invoca um meteoro devastador.' },
  tempestade: { name: 'Tempestade de Raios', school: 'destruicao', cost: 90, cd: 6, kind: 'storm', dmg: 38, strikes: 9, radius: 120, elem: 'shock', color: '#fff27a', price: 2400, minLvl: 22, desc: 'Raios caem sobre inimigos próximos.' },
  cura: { name: 'Cura', school: 'restauracao', cost: 22, cd: 1.0, kind: 'heal', heal: 45, color: '#80ff90', price: 80, desc: 'Restaura vida.' },
  cura_maior: { name: 'Cura Maior', school: 'restauracao', cost: 55, cd: 2, kind: 'heal', heal: 150, regen: 4, color: '#a0ffb0', price: 900, minLvl: 10, desc: 'Restaura muita vida e regenera.' },
  luz_sagrada: { name: 'Luz Sagrada', school: 'restauracao', cost: 28, cd: 2, kind: 'nova', dmg: 20, radius: 60, elem: 'holy', color: '#fff4b0', price: 300, desc: 'Explosão sagrada. Devastadora contra mortos-vivos.' },
  escudo_arcano: { name: 'Escudo Arcano', school: 'restauracao', cost: 35, cd: 5, kind: 'buff', buff: { k: 'armor', v: 80, t: 45 }, color: '#80b0ff', price: 250, desc: '+80 de armadura por 45s.' },
  luz: { name: 'Luz Mágica', school: 'restauracao', cost: 10, cd: 2, kind: 'buff', buff: { k: 'light', v: 1, t: 180 }, color: '#fff8c0', price: 40, desc: 'Ilumina ao redor por 3 minutos.' },
  invocar_lobo: { name: 'Invocar Lobo Espiritual', school: 'conjuracao', cost: 40, cd: 3, kind: 'summon', ent: 'lobo_espiritual', t: 60, color: '#80c0ff', price: 250, desc: 'Um lobo espiritual luta ao seu lado.' },
  reanimar: { name: 'Erguer Esqueleto', school: 'conjuracao', cost: 45, cd: 3, kind: 'summon', ent: 'esqueleto_aliado', t: 60, color: '#d0d0c0', price: 400, minLvl: 6, desc: 'Invoca um guerreiro esqueleto.' },
  invocar_elemental: { name: 'Invocar Elemental de Fogo', school: 'conjuracao', cost: 80, cd: 4, kind: 'summon', ent: 'elemental_aliado', t: 60, color: '#ff8030', price: 1400, minLvl: 15, desc: 'Um poderoso elemental de fogo.' },
  raizes: { name: 'Raízes Enredantes', school: 'conjuracao', cost: 24, cd: 3, kind: 'area', radius: 50, root: 3, dmg: 8, color: '#70a040', price: 150, desc: 'Raízes prendem os inimigos próximos.' },
  passo_arcano: { name: 'Passo Arcano', school: 'conjuracao', cost: 18, cd: 1.2, kind: 'blink', range: 80, color: '#c080ff', price: 200, desc: 'Teleporta uma curta distância.' }
};
const SHOUTS = {
  forca: { name: 'Força Implacável', words: 'KRAH VOS DUN', cd: 20, kind: 'push', dmg: 18, desc: 'Empurra e atordoa inimigos à frente.' },
  fogo: { name: 'Sopro de Fogo', words: 'IGNA VYR TOR', cd: 25, kind: 'cone', dmg: 55, elem: 'fire', desc: 'Um cone de fogo dracônico.' },
  gelo: { name: 'Sopro Gélido', words: 'FRO ZAH NIR', cd: 25, kind: 'cone', dmg: 40, elem: 'frost', desc: 'Congela e desacelera inimigos.' },
  etereo: { name: 'Rajada Etérea', words: 'VEN SHA RUH', cd: 12, kind: 'dash', desc: 'Avança como o vento, invulnerável.' },
  tempo: { name: 'Tempo Lento', words: 'TID KRO VUL', cd: 45, kind: 'slowtime', desc: 'Desacelera os inimigos por 8s.' },
  dragao: { name: 'Chamado do Dragão', words: 'OD AH VIING', cd: 90, kind: 'dragonstorm', dmg: 60, desc: 'Chamas caem dos céus ao seu redor.' }
};

// ---------- Talentos ----------
const PERKS = [
  { id: 'lamina', name: 'Lâmina Afiada', desc: '+20% dano corpo a corpo.', req: 1 },
  { id: 'aguia', name: 'Olho de Águia', desc: '+25% dano com arcos.', req: 1 },
  { id: 'destruicao', name: 'Destruição Aprimorada', desc: '+25% dano mágico.', req: 1 },
  { id: 'atleta', name: 'Atleta', desc: '+10% velocidade e +50% regeneração de vigor.', req: 1 },
  { id: 'negociante', name: 'Negociante', desc: 'Compre 20% mais barato e venda 20% mais caro.', req: 1 },
  { id: 'saqueador', name: 'Saqueador', desc: '+50% ouro encontrado.', req: 2 },
  { id: 'alquimista', name: 'Alquimista', desc: 'Poções e comidas 50% mais fortes.', req: 2 },
  { id: 'critico', name: 'Golpe Crítico', desc: '+10% chance de crítico.', req: 3 },
  { id: 'mana', name: 'Mana Profunda', desc: '+60% regeneração de magia.', req: 3 },
  { id: 'curandeiro', name: 'Curandeiro', desc: '+50% de cura.', req: 3 },
  { id: 'ferreiro', name: 'Mestre Ferreiro', desc: 'Forjar exige 20 de habilidade a menos.', req: 4 },
  { id: 'furtivo', name: 'Sombra', desc: 'Inimigos te percebem 40% mais perto.', req: 4 },
  { id: 'escudeiro', name: 'Pele de Aço', desc: '-15% dano recebido.', req: 5 },
  { id: 'cavaleiro', name: 'Cavaleiro', desc: '+25% velocidade montado.', req: 5 },
  { id: 'eficiente', name: 'Conjurador Eficiente', desc: '-25% custo de magias.', req: 6 },
  { id: 'rapido', name: 'Mãos Rápidas', desc: 'Ataques 15% mais rápidos.', req: 6 },
  { id: 'berserker', name: 'Berserker', desc: '+40% dano com menos de 35% de vida.', req: 8 },
  { id: 'tiro_duplo', name: 'Tiro Duplo', desc: 'Arcos disparam 2 flechas.', req: 8 },
  { id: 'conjurador', name: 'Mestre Conjurador', desc: 'Invocações 50% mais fortes e duradouras.', req: 8 },
  { id: 'vampiro', name: 'Toque Vampírico', desc: '5% do dano causado vira vida.', req: 10 },
  { id: 'grito', name: 'Voz do Dragão', desc: 'Gritos recarregam 40% mais rápido.', req: 10 },
  { id: 'dragao', name: 'Pele de Dragão', desc: '+25% resistência a todos os elementos.', req: 12 },
  { id: 'colosso', name: 'Colosso', desc: '+20% vida máxima.', req: 14 },
  { id: 'arquimago', name: 'Arquimago', desc: 'Magias de destruição atravessam inimigos e +15% dano.', req: 18 }
];

// ---------- Inimigos e criaturas ----------
// look: aparência; ai: melee|ranged|caster|charge|flee|flyer|boss
const ENEMIES = {
  coelho: { name: 'Coelho', look: { k: 'rabbit' }, hp: 6, dmg: 0, spd: 72, ai: 'flee', xp: 2, r: 4, drops: [['carne_crua', 0.4]], animal: true, passive: true },
  cervo: { name: 'Cervo', look: { k: 'deer' }, hp: 22, dmg: 0, spd: 84, ai: 'flee', xp: 5, r: 6, drops: [['carne_crua', 1], ['couro', 0.6], ['chifre', 0.4]], animal: true, passive: true },
  lobo: { name: 'Lobo', look: { k: 'wolf', c: '#7a7a82' }, hp: 28, dmg: 6, spd: 68, ai: 'melee', xp: 10, aggro: 110, drops: [['pele_lobo', 0.6], ['carne_crua', 0.3], ['presa', 0.25]], animal: true },
  lobo_gelo: { name: 'Lobo do Gelo', look: { k: 'wolf', c: '#d8e4f0' }, hp: 42, dmg: 9, spd: 72, ai: 'melee', xp: 18, aggro: 120, elem: 'frost', drops: [['pele_gelo', 0.5], ['presa', 0.3]], animal: true },
  urso: { name: 'Urso', look: { k: 'bear', c: '#6a4a2a' }, hp: 80, dmg: 14, spd: 54, ai: 'melee', xp: 26, r: 7, aggro: 90, drops: [['pele_urso', 0.7], ['carne_crua', 0.6]], animal: true },
  urso_polar: { name: 'Urso Polar', look: { k: 'bear', c: '#e8eef4' }, hp: 120, dmg: 18, spd: 56, ai: 'melee', xp: 40, r: 7, aggro: 100, drops: [['pele_gelo', 0.8], ['carne_crua', 0.6]], animal: true },
  javali: { name: 'Javali', look: { k: 'boar', c: '#5a3a2a' }, hp: 36, dmg: 8, spd: 60, ai: 'charge', xp: 12, aggro: 80, drops: [['couro', 0.6], ['carne_crua', 0.7], ['presa', 0.3]], animal: true },
  aranha: { name: 'Aranha Gigante', look: { k: 'spider', c: '#3a2a3a' }, hp: 30, dmg: 7, spd: 64, ai: 'melee', xp: 14, aggro: 110, poison: 3, drops: [['seda_aranha', 0.6], ['veneno', 0.3]] },
  slime: { name: 'Gosma', look: { k: 'slime', c: '#50c050' }, hp: 24, dmg: 5, spd: 36, ai: 'melee', xp: 8, aggro: 80, drops: [['gosma', 0.8]] },
  slime_fogo: { name: 'Gosma de Lava', look: { k: 'slime', c: '#ff6020' }, hp: 50, dmg: 10, spd: 38, ai: 'melee', xp: 20, elem: 'fire', drops: [['gosma', 0.5], ['essencia_fogo', 0.2]] },
  escorpiao: { name: 'Escorpião Gigante', look: { k: 'scorpion', c: '#8a5030' }, hp: 50, dmg: 11, spd: 58, ai: 'melee', xp: 22, poison: 4, drops: [['carapaca', 0.6], ['veneno', 0.4]] },
  lagarto: { name: 'Lagarto do Pântano', look: { k: 'lizard', c: '#4a7a3a' }, hp: 44, dmg: 9, spd: 56, ai: 'melee', xp: 18, drops: [['escama_lagarto', 0.6], ['carne_crua', 0.4]], animal: true },
  salamandra: { name: 'Salamandra', look: { k: 'lizard', c: '#d04020' }, hp: 55, dmg: 11, spd: 58, ai: 'ranged', proj: 'fireball', xp: 26, elem: 'fire', drops: [['essencia_fogo', 0.3], ['escama_lagarto', 0.4]] },
  morcego: { name: 'Morcego', look: { k: 'bat', c: '#4a3a4a' }, hp: 14, dmg: 4, spd: 88, ai: 'melee', xp: 6, fly: true, drops: [['asa_morcego', 0.6]] },
  goblin: { name: 'Goblin', look: { k: 'hum', skin: '#7aa040', body: '#6a4a2a', legs: '#4a3a2a', size: 0.8, ears: 'goblin', weapon: 'dagger', wc: '#9a9a9a' }, hp: 22, dmg: 5, spd: 62, ai: 'melee', xp: 9, gold: [1, 8], drops: [['osso', 0.2], ['pao', 0.2]] },
  goblin_arqueiro: { name: 'Goblin Arqueiro', look: { k: 'hum', skin: '#7aa040', body: '#4a6a2a', legs: '#4a3a2a', size: 0.8, ears: 'goblin', weapon: 'bow', wc: '#8a6a3a' }, hp: 18, dmg: 5, spd: 60, ai: 'ranged', proj: 'arrow', xp: 10, gold: [1, 8], drops: [['flecha', 0.5]] },
  goblin_xama: { name: 'Xamã Goblin', look: { k: 'hum', skin: '#7aa040', body: '#8a3a6a', legs: '#4a3a2a', size: 0.8, ears: 'goblin', hood: '#8a3a6a', weapon: 'staff', wc: '#6a4a2a' }, hp: 20, dmg: 7, spd: 55, ai: 'caster', proj: 'fireball', xp: 14, gold: [3, 12], drops: [['cogumelo', 0.5], ['erva_azul', 0.3]] },
  bandido: { name: 'Bandido', look: { k: 'hum', skin: '#d8a070', body: '#6a5040', legs: '#3a3a3a', hair: '#3a2a1a', hood: '#4a3a30', weapon: 'sword', wc: '#a0a0a0' }, hp: 42, dmg: 8, spd: 62, ai: 'melee', xp: 16, gold: [5, 25], drops: [['pocao_vida_p', 0.2], ['pao', 0.2]], dropGear: 0.12 },
  bandido_arqueiro: { name: 'Bandido Arqueiro', look: { k: 'hum', skin: '#c89060', body: '#5a6040', legs: '#3a3a3a', hair: '#5a3a1a', weapon: 'bow', wc: '#8a6a3a' }, hp: 34, dmg: 7, spd: 60, ai: 'ranged', proj: 'arrow', xp: 16, gold: [5, 20], drops: [['flecha', 0.7]], dropGear: 0.08 },
  bandido_mago: { name: 'Mago Renegado', look: { k: 'hum', skin: '#e0b080', body: '#4a2a5a', legs: '#2a2a3a', hood: '#4a2a5a', weapon: 'staff', wc: '#5a4a3a' }, hp: 34, dmg: 10, spd: 56, ai: 'caster', proj: 'frost', xp: 22, gold: [10, 30], drops: [['pocao_magia_p', 0.4]] },
  orc_renegado: { name: 'Orc Renegado', look: { k: 'hum', skin: '#5a8a3a', body: '#5a3a2a', legs: '#3a2a2a', hair: '#1a1a1a', tusks: true, bulky: true, weapon: 'axe', wc: '#606060' }, hp: 70, dmg: 13, spd: 60, ai: 'melee', xp: 28, gold: [8, 30], dropGear: 0.12 },
  esqueleto: { name: 'Esqueleto', look: { k: 'hum', skin: '#e8e0c8', body: null, legs: null, skeleton: true, weapon: 'sword', wc: '#8a8a7a' }, hp: 34, dmg: 8, spd: 56, ai: 'melee', xp: 14, undead: true, drops: [['osso', 0.7]], dropGear: 0.06 },
  esqueleto_arqueiro: { name: 'Esqueleto Arqueiro', look: { k: 'hum', skin: '#e8e0c8', skeleton: true, weapon: 'bow', wc: '#6a5a4a' }, hp: 28, dmg: 7, spd: 54, ai: 'ranged', proj: 'arrow', xp: 14, undead: true, drops: [['osso', 0.6], ['flecha', 0.6]] },
  zumbi: { name: 'Zumbi', look: { k: 'hum', skin: '#7a9a7a', body: '#4a4a3a', legs: '#3a3a30', hair: '#2a2a2a', zombie: true }, hp: 52, dmg: 10, spd: 38, ai: 'melee', xp: 15, undead: true, drops: [['osso', 0.3]] },
  draugr: { name: 'Draugr', look: { k: 'hum', skin: '#6a7a7a', body: '#3a4048', legs: '#2a2a30', hair: '#c0c0b0', zombie: true, helm: '#5a5a60', weapon: 'axe', wc: '#5a6a6a' }, hp: 62, dmg: 12, spd: 52, ai: 'melee', xp: 24, undead: true, elem: 'frost', drops: [['osso', 0.3]], dropGear: 0.12 },
  draugr_arqueiro: { name: 'Draugr Arqueiro', look: { k: 'hum', skin: '#6a7a7a', body: '#3a4048', legs: '#2a2a30', hair: '#c0c0b0', zombie: true, weapon: 'bow', wc: '#4a3a2a' }, hp: 48, dmg: 11, spd: 50, ai: 'ranged', proj: 'arrow', xp: 24, undead: true, drops: [['flecha', 0.6]] },
  espectro: { name: 'Espectro', look: { k: 'ghost', c: '#a0e8e0' }, hp: 40, dmg: 10, spd: 52, ai: 'melee', xp: 22, undead: true, fly: true, ghost: true, elem: 'frost', drops: [['ectoplasma', 0.6]] },
  cultista: { name: 'Cultista Sombrio', look: { k: 'hum', skin: '#c0a090', body: '#2a1a2a', legs: '#1a1a1a', hood: '#2a1a2a', weapon: 'staff', wc: '#3a2a2a' }, hp: 40, dmg: 11, spd: 56, ai: 'caster', proj: 'dark', xp: 26, gold: [10, 40], drops: [['pocao_magia_p', 0.3], ['ametista', 0.05]] },
  cavaleiro_morto: { name: 'Cavaleiro da Morte', look: { k: 'hum', skin: '#a0a8a0', body: '#2a2a34', legs: '#1a1a20', skeleton: true, helm: '#3a3a44', weapon: 'great', wc: '#5a5a70', bulky: true }, hp: 160, dmg: 20, spd: 54, ai: 'melee', xp: 70, undead: true, drops: [['lingote_ebano', 0.2]], dropGear: 0.4, elite: true },
  troll: { name: 'Troll', look: { k: 'hum', skin: '#7a8a6a', body: '#5a4a3a', legs: '#4a3a2a', hair: '#3a3a2a', size: 1.6, bulky: true, tusks: true }, hp: 130, dmg: 18, spd: 50, ai: 'melee', xp: 50, regen: 3, r: 8, drops: [['gordura_troll', 0.8]] },
  troll_gelo: { name: 'Troll do Gelo', look: { k: 'hum', skin: '#d0dce8', body: '#a0b0c0', legs: '#8090a0', hair: '#f0f0f0', size: 1.6, bulky: true, tusks: true }, hp: 170, dmg: 22, spd: 50, ai: 'melee', xp: 65, regen: 4, r: 8, elem: 'frost', drops: [['gordura_troll', 0.8], ['essencia_gelo', 0.2]] },
  ogro: { name: 'Ogro', look: { k: 'hum', skin: '#c09060', body: '#6a4a2a', legs: '#5a3a1a', hair: '#2a1a0a', size: 1.7, bulky: true, weapon: 'hammer', wc: '#6a5a4a' }, hp: 170, dmg: 24, spd: 46, ai: 'melee', xp: 60, r: 8, gold: [10, 50], drops: [['carne_crua', 0.5]] },
  yeti: { name: 'Yeti', look: { k: 'hum', skin: '#e8f0f8', body: '#e8f0f8', legs: '#d0dce8', hair: '#ffffff', size: 1.7, bulky: true, fur: true }, hp: 200, dmg: 26, spd: 54, ai: 'melee', xp: 80, r: 8, elem: 'frost', drops: [['pele_gelo', 1], ['essencia_gelo', 0.3]] },
  golem_pedra: { name: 'Golem de Pedra', look: { k: 'golem', c: '#8a8580' }, hp: 220, dmg: 22, spd: 40, ai: 'melee', xp: 75, r: 8, drops: [['minerio_ferro', 1], ['minerio_prata', 0.4], ['diamante', 0.03]], armor: 40 },
  elemental_fogo: { name: 'Elemental de Fogo', look: { k: 'elemental', c: '#ff7020' }, hp: 90, dmg: 16, spd: 58, ai: 'caster', proj: 'fireball', xp: 48, elem: 'fire', fly: true, drops: [['essencia_fogo', 0.8]] },
  elemental_gelo: { name: 'Elemental de Gelo', look: { k: 'elemental', c: '#80d0ff' }, hp: 90, dmg: 16, spd: 54, ai: 'caster', proj: 'frost', xp: 48, elem: 'frost', fly: true, drops: [['essencia_gelo', 0.8]] },
  mumia: { name: 'Múmia', look: { k: 'hum', skin: '#c8b890', body: '#c8b890', legs: '#b8a880', mummy: true }, hp: 72, dmg: 12, spd: 42, ai: 'melee', xp: 28, undead: true, drops: [['bandagem', 0.7], ['rubi', 0.04]] },
  // Chefes
  bandido_chefe: { name: 'Líder Bandido', look: { k: 'hum', skin: '#d8a070', body: '#8a2a2a', legs: '#2a2a2a', hair: '#1a1a1a', helm: '#7a7a7a', weapon: 'great', wc: '#c0c0c0', bulky: true }, hp: 180, dmg: 16, spd: 60, ai: 'melee', xp: 90, gold: [60, 160], boss: true, dropGear: 1, elite: true },
  rei_goblin: { name: 'Rei Goblin Gruk', look: { k: 'hum', skin: '#8ab040', body: '#a08020', legs: '#4a3a2a', ears: 'goblin', size: 1.3, crown: true, weapon: 'mace', wc: '#c0a040' }, hp: 260, dmg: 16, spd: 56, ai: 'boss', summon: 'goblin', xp: 160, gold: [100, 250], boss: true, dropGear: 1 },
  rainha_aranha: { name: 'Rainha Aranha Nyxara', look: { k: 'spider', c: '#4a1a4a', size: 2.2 }, hp: 700, dmg: 22, spd: 60, ai: 'boss', summon: 'aranha', proj: 'poison', poison: 6, xp: 450, boss: true, r: 12, dropGear: 1, gold: [200, 400] },
  guardiao_golem: { name: 'Guardião Rúnico', look: { k: 'golem', c: '#6a7a9a', size: 2, rune: true }, hp: 1200, dmg: 32, spd: 42, ai: 'boss', proj: 'rock', xp: 800, boss: true, r: 13, armor: 60, dropGear: 1, gold: [300, 600] },
  campeao_orc: { name: 'Campeão Urzog', look: { k: 'hum', skin: '#4a7a2a', body: '#7a2a1a', legs: '#3a2a1a', hair: '#1a1a1a', tusks: true, bulky: true, size: 1.5, helm: '#4a4a4a', weapon: 'axe', wc: '#a03030' }, hp: 1400, dmg: 34, spd: 62, ai: 'boss', charge: true, xp: 1000, boss: true, r: 10, dropGear: 1, gold: [400, 800] },
  rei_draugr: { name: 'Rei Draugr Hrothgar', look: { k: 'hum', skin: '#5a6a6a', body: '#2a3440', legs: '#1a2028', hair: '#d0d0c0', zombie: true, crown: true, size: 1.4, weapon: 'great', wc: '#70a0c0' }, hp: 1100, dmg: 30, spd: 54, ai: 'boss', summon: 'draugr', proj: 'frost', xp: 900, boss: true, undead: true, r: 10, dropGear: 1, gold: [300, 700] },
  farao: { name: 'Faraó Amun-Sheth', look: { k: 'hum', skin: '#c8b890', body: '#d0a030', legs: '#b8a880', mummy: true, crown: true, size: 1.4, weapon: 'staff', wc: '#d0a030' }, hp: 1000, dmg: 28, spd: 46, ai: 'boss', summon: 'mumia', proj: 'dark', xp: 850, boss: true, undead: true, r: 10, dropGear: 1, gold: [500, 900] },
  hidra: { name: 'Hidra do Pântano', look: { k: 'dragon', c: '#3a7a4a', heads: 3, size: 1.1 }, hp: 900, dmg: 26, spd: 40, ai: 'boss', proj: 'poison', poison: 6, xp: 700, boss: true, r: 14, dropGear: 1, gold: [300, 600] },
  senhor_chamas: { name: 'Senhor das Chamas', look: { k: 'elemental', c: '#ff4010', size: 2 }, hp: 1200, dmg: 32, spd: 50, ai: 'boss', proj: 'fireball', summon: 'slime_fogo', xp: 900, boss: true, elem: 'fire', r: 12, dropGear: 1, gold: [300, 600] },
  necromante: { name: 'Necromante', look: { k: 'hum', skin: '#b0a0a0', body: '#1a1a2a', legs: '#101018', hood: '#1a1a2a', weapon: 'staff', wc: '#4a2a5a' }, hp: 500, dmg: 22, spd: 52, ai: 'boss', proj: 'dark', summon: 'esqueleto', xp: 400, boss: true, dropGear: 1, gold: [150, 350] },
  troll_rei: { name: 'Troll Ancião', look: { k: 'hum', skin: '#6a7a5a', body: '#4a3a2a', legs: '#3a2a1a', hair: '#2a2a1a', size: 2, bulky: true, tusks: true }, hp: 500, dmg: 26, spd: 50, ai: 'boss', regen: 8, xp: 350, boss: true, r: 11, dropGear: 1, gold: [100, 300] },
  lich: { name: 'Lich Morvath', look: { k: 'hum', skin: '#c0d0c0', body: '#2a1a3a', legs: '#1a1028', hood: '#2a1a3a', skeleton: true, crown: true, size: 1.5, weapon: 'staff', wc: '#8040c0' }, hp: 3200, dmg: 40, spd: 50, ai: 'boss', proj: 'dark', summon: 'esqueleto', xp: 3000, boss: true, undead: true, r: 10, dropGear: 1, gold: [1000, 2000], teleport: true },
  dragao: { name: 'Dragão', look: { k: 'dragon', c: '#7a2a2a' }, hp: 650, dmg: 30, spd: 70, ai: 'flyer', proj: 'fireball', xp: 600, fly: true, boss: true, r: 14, elem: 'fire', drops: [['escama_dragao', 1], ['osso_dragao', 1]], gold: [100, 400], dragon: true },
  dragao_gelo: { name: 'Dragão do Gelo', look: { k: 'dragon', c: '#5a80b0' }, hp: 750, dmg: 32, spd: 70, ai: 'flyer', proj: 'frost', xp: 700, fly: true, boss: true, r: 14, elem: 'frost', drops: [['escama_dragao', 1], ['osso_dragao', 1]], gold: [100, 400], dragon: true },
  vorthax: { name: 'Vorthax, o Devorador', look: { k: 'dragon', c: '#2a1a1a', size: 1.6, glow: '#ff4010' }, hp: 6000, dmg: 50, spd: 64, ai: 'boss', proj: 'fireball', xp: 8000, boss: true, r: 20, elem: 'fire', dragon: true, drops: [['escama_dragao', 1], ['osso_dragao', 1]], gold: [3000, 5000], dropGear: 1 },
  // Aliados
  lobo_espiritual: { name: 'Lobo Espiritual', look: { k: 'wolf', c: '#80c0ff', ghostly: true }, hp: 70, dmg: 12, spd: 80, ai: 'melee', xp: 0, ally: true },
  esqueleto_aliado: { name: 'Esqueleto Servo', look: { k: 'hum', skin: '#e8e0c8', skeleton: true, weapon: 'sword', wc: '#a0a0c0' }, hp: 90, dmg: 14, spd: 60, ai: 'melee', xp: 0, ally: true },
  elemental_aliado: { name: 'Elemental de Fogo', look: { k: 'elemental', c: '#ff9030' }, hp: 200, dmg: 22, spd: 62, ai: 'caster', proj: 'fireball', xp: 0, ally: true, fly: true },
  cachorro: { name: 'Cachorro', look: { k: 'wolf', c: '#a07040' }, hp: 120, dmg: 10, spd: 82, ai: 'melee', xp: 0, ally: true },
  gato_selvagem: { name: 'Gato Selvagem', look: { k: 'wolf', c: '#d0a050' }, hp: 90, dmg: 12, spd: 90, ai: 'melee', xp: 0, ally: true },
  lobo_domado: { name: 'Lobo Domado', look: { k: 'wolf', c: '#5a5a62' }, hp: 150, dmg: 14, spd: 84, ai: 'melee', xp: 0, ally: true },
  mercenario: { name: 'Mercenário', look: { k: 'hum', skin: '#d8a070', body: '#5a6a8a', legs: '#3a3a4a', hair: '#3a2a1a', helm: '#9aa0a8', weapon: 'sword', wc: '#c0c0c0', shield: true }, hp: 160, dmg: 14, spd: 68, ai: 'melee', xp: 0, ally: true },
  guarda: { name: 'Guarda', look: { k: 'hum', skin: '#d8a070', body: '#9aa0a8', legs: '#3a3a4a', hair: '#3a2a1a', helm: '#9aa0a8', weapon: 'sword', wc: '#c0c0c0', shield: true }, hp: 300, dmg: 18, spd: 64, ai: 'melee', xp: 0, ally: true, guard: true }
};

const SPAWNS = {
  valdoria: { day: [['lobo', 3], ['javali', 2], ['bandido', 2], ['bandido_arqueiro', 1], ['goblin', 2], ['cervo', 3], ['coelho', 3], ['slime', 1], ['urso', 0.6]], night: [['esqueleto', 2], ['zumbi', 2], ['lobo', 3], ['bandido', 1]] },
  colinas: { day: [['coelho', 4], ['cervo', 3], ['goblin', 3], ['goblin_arqueiro', 1], ['javali', 2], ['lobo', 1], ['slime', 1]], night: [['goblin', 3], ['goblin_xama', 1], ['esqueleto', 1], ['lobo', 2]] },
  sylvaris: { day: [['lobo', 2], ['aranha', 3], ['cervo', 3], ['urso', 2], ['slime', 1], ['bandido_mago', 0.6], ['coelho', 2]], night: [['aranha', 3], ['espectro', 2], ['lobo', 2]] },
  khazdurim: { day: [['golem_pedra', 1], ['troll', 1], ['lobo', 2], ['urso', 2], ['goblin', 2], ['goblin_arqueiro', 1], ['cervo', 1]], night: [['troll', 2], ['esqueleto', 2], ['lobo', 2]] },
  nordheim: { day: [['lobo_gelo', 3], ['urso_polar', 1], ['troll_gelo', 1], ['draugr', 1], ['yeti', 0.4], ['cervo', 2], ['coelho', 1]], night: [['draugr', 3], ['draugr_arqueiro', 1], ['lobo_gelo', 2], ['espectro', 1]] },
  gorthak: { day: [['orc_renegado', 3], ['ogro', 1], ['salamandra', 2], ['elemental_fogo', 1], ['javali', 2], ['slime_fogo', 1]], night: [['orc_renegado', 2], ['elemental_fogo', 2], ['ogro', 1], ['esqueleto', 1]] },
  zahrim: { day: [['escorpiao', 3], ['bandido', 2], ['bandido_arqueiro', 1], ['mumia', 0.5], ['salamandra', 1]], night: [['mumia', 2], ['esqueleto', 2], ['escorpiao', 2], ['espectro', 1]] },
  ssarak: { day: [['lagarto', 3], ['slime', 2], ['aranha', 1], ['troll', 0.5], ['cervo', 1]], night: [['zumbi', 2], ['espectro', 1], ['lagarto', 2], ['slime', 1]] },
  morvath: { day: [['esqueleto', 3], ['esqueleto_arqueiro', 2], ['zumbi', 2], ['espectro', 2], ['cultista', 2], ['cavaleiro_morto', 0.4]], night: [['esqueleto', 3], ['espectro', 3], ['cultista', 2], ['cavaleiro_morto', 0.8], ['zumbi', 2]] }
};

// ---------- Masmorras ----------
const DUNGEON_TYPES = {
  caverna: { name: 'Caverna', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['morcego', 'aranha', 'lobo', 'urso', 'slime'], boss: 'troll_rei', deco: [O.BONES, O.HERB_SHROOM, O.ROCK, O.CRYSTAL] },
  covil_bandido: { name: 'Esconderijo Bandido', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['bandido', 'bandido_arqueiro', 'bandido_mago'], boss: 'bandido_chefe', deco: [O.BARREL, O.CRATE, O.TORCH, O.CAMPFIRE] },
  covil_goblin: { name: 'Covil Goblin', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['goblin', 'goblin_arqueiro', 'goblin_xama'], boss: 'rei_goblin', deco: [O.BONES, O.TORCH, O.CRATE, O.SKULLS] },
  cripta: { name: 'Cripta', gen: 'rooms', floor: T.DFLOOR, wall: T.DWALL, ent: O.ENT_CRYPT, mobs: ['esqueleto', 'esqueleto_arqueiro', 'zumbi', 'espectro'], boss: 'cavaleiro_morto', deco: [O.GRAVE, O.TORCH, O.SKULLS, O.COBWEB, O.PILLAR] },
  ruina_elfica: { name: 'Ruína Élfica', gen: 'rooms', floor: T.RFLOOR, wall: T.RWALL, ent: O.ENT_RUIN, mobs: ['aranha', 'espectro', 'bandido_mago', 'slime'], boss: 'necromante', deco: [O.BROKEN_PILLAR, O.PILLAR, O.COBWEB, O.HERB_BLUE, O.CRYSTAL] },
  mina_ana: { name: 'Mina Anã', gen: 'cave', floor: T.MFLOOR, wall: T.MWALL, ent: O.ENT_MINE, mobs: ['golem_pedra', 'aranha', 'goblin', 'goblin_arqueiro', 'morcego'], boss: 'troll_rei', deco: [O.ORE_FERRO, O.ORE_PRATA, O.ORE_OURO, O.CRATE, O.TORCH], ores: true },
  tumulo_nordico: { name: 'Túmulo Nórdico', gen: 'rooms', floor: T.DFLOOR, wall: T.DWALL, ent: O.ENT_BARROW, mobs: ['draugr', 'draugr_arqueiro', 'esqueleto', 'espectro'], boss: 'cavaleiro_morto', deco: [O.GRAVE, O.TORCH, O.SKULLS, O.COBWEB, O.PILLAR] },
  caverna_gelo: { name: 'Caverna de Gelo', gen: 'cave', floor: T.IFLOOR, wall: T.IWALL, ent: O.ENT_ICE, mobs: ['lobo_gelo', 'troll_gelo', 'elemental_gelo', 'urso_polar'], boss: 'yeti', deco: [O.CRYSTAL, O.ICEROCK, O.HERB_ICE, O.ORE_MALAQUITA] },
  tumba_deserto: { name: 'Tumba Antiga', gen: 'rooms', floor: T.TFLOOR, wall: T.TWALL, ent: O.ENT_TOMB, mobs: ['mumia', 'escorpiao', 'esqueleto', 'esqueleto_arqueiro'], boss: 'farao', deco: [O.PILLAR, O.STATUE, O.TORCH, O.SKULLS, O.CRATE] },
  caverna_lava: { name: 'Caverna de Lava', gen: 'cave', floor: T.VFLOOR, wall: T.VWALL, ent: O.ENT_LAVA, mobs: ['elemental_fogo', 'salamandra', 'slime_fogo', 'ogro'], boss: 'senhor_chamas', deco: [O.CRYSTAL, O.HERB_FIRE, O.ORE_OBSIDIANA, O.BONES], lava: true },
  ruina_afundada: { name: 'Ruína Afundada', gen: 'rooms', floor: T.RFLOOR, wall: T.RWALL, ent: O.ENT_RUIN, mobs: ['lagarto', 'slime', 'aranha', 'zumbi'], boss: 'hidra', deco: [O.BROKEN_PILLAR, O.HERB_SHROOM, O.REEDS, O.COBWEB], water: true },
  cripta_sombria: { name: 'Cripta Sombria', gen: 'rooms', floor: T.DFLOOR, wall: T.DWALL, ent: O.ENT_CRYPT, mobs: ['esqueleto', 'espectro', 'cultista', 'cavaleiro_morto', 'esqueleto_arqueiro'], boss: 'necromante', deco: [O.GRAVE, O.TORCH, O.SKULLS, O.ALTAR, O.ORE_EBANO] },
  arena: { name: 'Arena', gen: 'arena', floor: T.SAND, wall: T.WALL, ent: O.ENT_ARENA, mobs: ['orc_renegado', 'ogro'], boss: 'campeao_orc', deco: [O.TORCH, O.BANNER] }
};
const REGION_DUNGEONS = {
  valdoria: ['caverna', 'covil_bandido', 'covil_goblin', 'cripta', 'cripta'],
  colinas: ['covil_goblin', 'covil_goblin', 'caverna', 'covil_bandido'],
  sylvaris: ['ruina_elfica', 'ruina_elfica', 'caverna', 'covil_bandido'],
  khazdurim: ['mina_ana', 'mina_ana', 'caverna', 'covil_goblin'],
  nordheim: ['tumulo_nordico', 'tumulo_nordico', 'caverna_gelo'],
  gorthak: ['caverna_lava', 'caverna_lava', 'covil_bandido', 'caverna'],
  zahrim: ['tumba_deserto', 'tumba_deserto', 'caverna', 'covil_bandido'],
  ssarak: ['ruina_afundada', 'ruina_afundada', 'caverna', 'cripta'],
  morvath: ['cripta_sombria', 'cripta_sombria', 'cripta', 'tumulo_nordico']
};
const DUNGEON_ADJ = ['Esquecida', 'Sombria', 'Antiga', 'Maldita', 'Perdida', 'Profunda', 'Silenciosa', 'Sangrenta', 'Uivante', 'Gélida', 'Ardente', 'Oculta', 'Ecoante', 'Proibida'];
const DUNGEON_NOUNS = ['do Corvo', 'dos Ossos', 'da Lua Negra', 'do Lobo', 'das Sombras', 'do Rei Caído', 'da Serpente', 'das Almas', 'do Trovão', 'da Bruma', 'do Eco', 'da Aranha', 'dos Mil Olhos', 'do Juramento', 'do Abismo', 'da Coroa Partida', 'das Lágrimas', 'do Dragão', 'da Brasa', 'do Inverno'];

// Masmorras únicas (história e chefes)
const UNIQUE_DUNGEONS = [
  { id: 'templo_lunar', name: 'Templo Lunar', region: 'sylvaris', type: 'ruina_elfica', boss: 'rainha_aranha', lvl: 8, size: 64, reward: 'pergaminho_anciao', bonus: 'arco_lunar', main: true, off: [-0.06, -0.08] },
  { id: 'minas_durim', name: 'Minas Profundas de Durim', region: 'khazdurim', type: 'mina_ana', boss: 'guardiao_golem', lvl: 13, size: 72, reward: 'martelo_runico', main: true, off: [0.07, 0.03] },
  { id: 'arena_sangue', name: 'Arena de Sangue', region: 'gorthak', type: 'arena', boss: 'campeao_orc', lvl: 17, size: 30, reward: 'totem_orc', bonus: 'machado_grommash', main: true, off: [0.02, 0.04], near: true },
  { id: 'necropole', name: 'Necrópole de Morvath', region: 'morvath', type: 'cripta_sombria', boss: 'lich', lvl: 24, size: 80, reward: 'filacterio', bonus: 'cajado_morvath', main: true, off: [0.04, -0.03] },
  { id: 'covil_vorthax', name: 'Covil de Vorthax', region: 'gorthak', type: 'caverna_lava', boss: 'vorthax', lvl: 30, size: 80, reward: 'presa_vorthax', main: true, volcano: true },
  { id: 'tumulo_hrothgar', name: 'Túmulo do Rei Hrothgar', region: 'nordheim', type: 'tumulo_nordico', boss: 'rei_draugr', lvl: 16, size: 64, bonus: 'coroa_heroi', off: [0.05, 0.06] },
  { id: 'piramide', name: 'Pirâmide de Amun-Sheth', region: 'zahrim', type: 'tumba_deserto', boss: 'farao', lvl: 14, size: 64, bonus: 'anel_sombras', off: [0.07, 0.05] },
  { id: 'covil_hidra', name: 'Covil da Hidra', region: 'ssarak', type: 'ruina_afundada', boss: 'hidra', lvl: 12, size: 60, bonus: 'amuleto_druida', off: [-0.06, 0.05] },
  { id: 'fortaleza_goblin', name: 'Fortaleza Goblin', region: 'colinas', type: 'covil_goblin', boss: 'rei_goblin', lvl: 4, size: 56, bonus: 'escudo_aurora', off: [-0.05, 0.05] },
  { id: 'cripta_aurora', name: 'Cripta dos Reis', region: 'valdoria', type: 'cripta', boss: 'cavaleiro_morto', lvl: 6, size: 56, bonus: 'lamina_alvorecer', off: [0.08, -0.04] }
];

// ---------- Guildas ----------
const GUILDS = {
  herois: { name: 'Guilda dos Heróis', desc: 'A grande guilda de aventureiros, presente em todas as cidades. Suba de Rank F até S!', hq: null,
    ranks: ['Rank F', 'Rank E', 'Rank D', 'Rank C', 'Rank B', 'Rank A', 'Rank S'], th: [0, 3, 7, 12, 18, 26, 36], qtypes: ['kill', 'kill', 'clear', 'collect', 'camp'], color: '#e0b040',
    rewards: [null, { gold: 100 }, { item: 'pocao_vida_m:3' }, { gold: 500, item: 'anel_ouro' }, { item: 'elixir_heroi' }, { gold: 2000 }, { item: 'coroa_heroi' }] },
  guerreiros: { name: 'Companhia do Aço', desc: 'Irmandade de guerreiros honrados de Nordheim.', hq: 'nordheim',
    ranks: ['Recruta', 'Escudeiro', 'Guerreiro', 'Veterano', 'Campeão', 'Lenda'], th: [0, 2, 5, 9, 14, 20], qtypes: ['kill', 'clear', 'kill'], color: '#a0a8b0',
    rewards: [null, { item: 'sword_aco' }, { item: 'body_aco' }, { item: 'great_anao' }, { item: 'body_orc' }, { item: 'great_ebano' }] },
  magos: { name: 'Academia Arcana', desc: 'Escola de magia mais antiga do mundo, em Sylvaris.', hq: 'sylvaris',
    ranks: ['Aprendiz', 'Iniciado', 'Adepto', 'Mago', 'Mestre', 'Arquimago'], th: [0, 2, 5, 9, 14, 20], qtypes: ['collect', 'kill', 'clear', 'deliver'], color: '#6080ff',
    rewards: [null, { spell: 'raio' }, { item: 'staff_adepto' }, { spell: 'nevasca' }, { item: 'robe_mestre' }, { spell: 'meteoro', item: 'staff_arquimago' }] },
  ladroes: { name: 'Irmandade das Sombras', desc: 'Ladrões e espiões que dominam o comércio oculto de Zahrim.', hq: 'zahrim',
    ranks: ['Batedor de Carteiras', 'Gatuno', 'Ladrão', 'Sombra', 'Mestre Ladrão'], th: [0, 2, 5, 9, 14], qtypes: ['deliver', 'collect', 'clear'], color: '#6a5a8a',
    rewards: [null, { gold: 300 }, { item: 'robe_sombras' }, { item: 'dagger_vidro' }, { item: 'anel_sombras', gold: 2000 }] },
  paladinos: { name: 'Ordem da Aurora', desc: 'Cavaleiros sagrados que caçam mortos-vivos.', hq: 'valdoria',
    ranks: ['Noviço', 'Escudeiro', 'Cavaleiro', 'Paladino', 'Grão-Mestre'], th: [0, 2, 5, 9, 14], qtypes: ['kill_undead', 'clear_undead', 'kill_undead'], color: '#f0e080',
    rewards: [null, { spell: 'luz_sagrada' }, { item: 'mace_aco' }, { item: 'escudo_aurora', spell: 'cura_maior' }, { item: 'lamina_alvorecer' }] },
  cacadores: { name: 'Liga dos Caçadores', desc: 'Rastreadores e arqueiros das Colinas.', hq: 'colinas',
    ranks: ['Rastreador', 'Caçador', 'Batedor', 'Mestre Caçador', 'Grande Caçador'], th: [0, 2, 5, 9, 14], qtypes: ['kill_animal', 'collect_pelt', 'kill'], color: '#70a040',
    rewards: [null, { item: 'flecha:100' }, { item: 'bow_elfico' }, { item: 'body_elfico' }, { item: 'arco_cacador' }] },
  druidas: { name: 'Círculo Druídico', desc: 'Guardiões do equilíbrio natural nos pântanos.', hq: 'ssarak',
    ranks: ['Semente', 'Broto', 'Raiz', 'Carvalho', 'Arquidruida'], th: [0, 2, 5, 9, 14], qtypes: ['collect_herb', 'kill', 'clear'], color: '#40a060',
    rewards: [null, { spell: 'nevoa_toxica' }, { item: 'robe_druida' }, { spell: 'invocar_elemental' }, { item: 'amuleto_druida' }] },
  ferreiros: { name: 'Irmandade da Forja', desc: 'Os maiores ferreiros, guardiões das forjas de Khaz Durim.', hq: 'khazdurim',
    ranks: ['Aprendiz de Forja', 'Artesão', 'Ferreiro', 'Mestre da Forja', 'Forjador Eterno'], th: [0, 2, 5, 9, 14], qtypes: ['collect_ore', 'collect_ore', 'clear'], color: '#e08040',
    rewards: [null, { item: 'lingote_aco:5' }, { item: 'hammer_anao' }, { item: 'lingote_ebano:4' }, { item: 'martelo_forja' }] },
  sangue: { name: 'Clã do Punho Sangrento', desc: 'Berserkers orcs que vivem pela glória do combate.', hq: 'gorthak',
    ranks: ['Verme', 'Guerreiro', 'Berserker', 'Senhor da Guerra'], th: [0, 3, 7, 12], qtypes: ['kill_strong', 'kill_strong', 'clear'], color: '#c03030',
    rewards: [null, { item: 'axe_orc' }, { item: 'body_orc' }, { item: 'machado_grommash' }] }
};

// ---------- Nomes ----------
const NAMES = {
  humano: { m: ['Aldric', 'Edmund', 'Gareth', 'Roland', 'Tomás', 'Henrique', 'Bento', 'Duarte', 'Afonso', 'Rodrigo', 'Martim', 'Gonçalo', 'Vasco', 'Nuno', 'Lourenço', 'Ricardo', 'Fernão', 'Godofredo'],
    f: ['Isolda', 'Beatriz', 'Leonor', 'Mirela', 'Helena', 'Inês', 'Marta', 'Elena', 'Brites', 'Constança', 'Urraca', 'Teresa', 'Matilde', 'Joana', 'Catarina', 'Guiomar'],
    s: ['Corvo-Negro', 'Pedregal', 'Ferreira', 'Valente', 'do Vale', 'Montalvo', 'Torres', 'Lobo', 'Sarmento', 'Bravo', 'Castelo', 'Ribeiro'] },
  elfo: { m: ['Aerendil', 'Thalion', 'Faelar', 'Lorien', 'Eldrin', 'Galadhor', 'Ithil', 'Caelum', 'Sylas', 'Varion'], f: ['Lirael', 'Sylwen', 'Nimriel', 'Aelwen', 'Elaria', 'Thessaly', 'Miriel', 'Naerys', 'Ilyana', 'Luthien'],
    s: ['Folha-de-Prata', 'Luz-Estelar', 'Vento-Suave', 'Orvalho', 'Canção-da-Lua', 'Raiz-Antiga'] },
  anao: { m: ['Durgan', 'Brokk', 'Thrain', 'Gimrik', 'Balgar', 'Dwalin', 'Korgan', 'Thorgrim', 'Bofur', 'Hargin'], f: ['Dagna', 'Helga', 'Brunna', 'Kilda', 'Thora', 'Disa', 'Hilda'],
    s: ['Martelo-de-Pedra', 'Barba-Ruiva', 'Forja-Viva', 'Punho-de-Ferro', 'Pedra-Funda', 'Malho-Duro'] },
  orc: { m: ['Gorbag', 'Urzul', 'Shagrol', 'Grokk', 'Mogka', 'Thrag', 'Durzag', 'Lurtz', 'Azog', 'Bolg'], f: ['Garra', 'Shara', 'Ugrah', 'Mazoga', 'Borka', 'Yazga'],
    s: ['Quebra-Ossos', 'Dente-Partido', 'Punho-Sangrento', 'Olho-Rubro', 'Rasga-Carne'] },
  pequenino: { m: ['Bolgo', 'Pipo', 'Tobias', 'Fredo', 'Bilo', 'Lotto', 'Milo', 'Samo', 'Teco'], f: ['Rosinha', 'Margarida', 'Lili', 'Papoula', 'Prímula', 'Nina', 'Bela'],
    s: ['Pé-Leve', 'Toca-Funda', 'Barriga-Cheia', 'Pé-Peludo', 'Colina-Verde', 'Torta-Doce'] },
  draconato: { m: ['Kazrith', 'Draxis', 'Sseth', 'Vorrak', 'Zharos', 'Krissk', 'Tazzik'], f: ['Vyxa', 'Ssira', 'Ixara', 'Zalys', 'Kessa', 'Thyssa'],
    s: ['Escama-Rubra', 'Garra-Sombria', 'Cauda-Longa', 'Olho-de-Brasa', 'Sopro-Quente'] },
  felino: { m: ["Ra'kesh", "Do'rahn", "Ma'shir", "J'zar", "Ri'kaan", "Zaj'ir", "Ka'dar"], f: ["Ji'zara", "S'ahna", "Ri'lyn", "Ma'ira", "Na'shi", "Sha'kira"],
    s: ['Areia-Dourada', 'Pata-Silenciosa', 'Bigode-Prateado', 'Duna-Rubra', 'Olho-de-Lua'] },
  nordico: { m: ['Bjorn', 'Ragnar', 'Eirik', 'Ulf', 'Sven', 'Gunnar', 'Halvar', 'Leif', 'Torvald', 'Harald'], f: ['Sigrid', 'Astrid', 'Freya', 'Hilde', 'Ingrid', 'Solveig', 'Ylva', 'Runa'],
    s: ['Machado-Gélido', 'Filho-do-Urso', 'Escudo-Partido', 'Lobo-Branco', 'Barba-de-Neve'] }
};
const SETTLEMENT_NAMES = {
  valdoria: { cap: 'Valdoria', list: ['Pedravale', 'Rio Claro', 'Ponte Alta', 'Vila Trigal', 'Monte Sereno', 'Águas Frias', 'Campo Dourado', 'Bosque do Corvo', 'Porto Velho', 'Três Moinhos', 'Vau do Cervo', 'Pinhal'] },
  colinas: { cap: 'Valebolso', list: ['Pé-de-Feijão', 'Colina Verde', 'Ribeira Doce', 'Moinho Velho', 'Toca do Texugo', 'Campina', 'Vila Pudim', 'Sete Tortas', 'Morro Alegre'] },
  sylvaris: { cap: 'Sylvaris', list: ['Lothiel', 'Aelindor', 'Faelwen', 'Miriandel', 'Thalassë', 'Nimrais', 'Elenhir', 'Caras Luin'] },
  khazdurim: { cap: 'Khaz Durim', list: ['Karak Zorn', 'Forja Profunda', 'Bargrim', 'Dun Kolgar', 'Pico de Bronze', 'Grimhold', 'Barak Varr'] },
  nordheim: { cap: 'Nordheim', list: ['Ventofrio', 'Skjold', 'Hrafnvik', 'Isvald', 'Frostheim', 'Ulfsvik', 'Dragsholm', 'Kaldvik'] },
  gorthak: { cap: "Gor'Thak", list: ["Mok'Garash", 'Rocha Sangrenta', "Kraz'Mor", 'Garra Negra', 'Uzgul', "Durz'ak", 'Fenda Rubra'] },
  zahrim: { cap: 'Zahrim', list: ['Al-Kesh', "Oásis de Ma'rah", 'Dunas Rubras', 'Qasr Ilan', 'Sahira', 'Bir Sefa', 'Khar-Ankh'] },
  ssarak: { cap: 'Ssarak', list: ['Lodo-Fundo', 'Vssith', 'Kaz-Sissa', 'Raiz Negra', 'Charco Velho', 'Ninho Úmido'] },
  morvath: { cap: 'Bastião da Aurora', list: ['Bastião da Aurora'] }
};

// ---------- Estilos culturais (cidades) ----------
const CULTURES = {
  human: { plaza: T.COBBLE, street: T.COBBLE, wall: T.WALL, walls: ['capital', 'town'], houseWall: 'timber', roof: ['#a03a2a', '#8a4a2a', '#6a3a2a', '#9a5a3a'], wallC: '#e8dcc0', race: 'humano', guard: true },
  halfling: { plaza: T.ROAD, street: T.ROAD, wall: null, walls: [], houseWall: 'round', roof: ['#5a8a3a', '#c09030', '#7a9a3a', '#a06a30'], wallC: '#f0e0b0', race: 'pequenino', flowers: true },
  elf: { plaza: T.ELFGRASS, street: T.RFLOOR, wall: null, walls: [], houseWall: 'elven', roof: ['#2a8a7a', '#3a7aa0', '#4a9a6a'], wallC: '#f0f0e8', race: 'elfo', glow: true },
  dwarf: { plaza: T.DCOBBLE, street: T.DCOBBLE, wall: T.WALL, walls: ['capital', 'town', 'village'], houseWall: 'stone', roof: ['#4a4a52', '#5a4a40', '#3a3a44'], wallC: '#8a8a90', race: 'anao' },
  nordic: { plaza: T.DIRT, street: T.DIRT, wall: T.PALISADE, walls: ['capital', 'town'], houseWall: 'log', roof: ['#e8eef4', '#d8e0e8'], wallC: '#6a4a2a', race: 'nordico', snowroof: true },
  orc: { plaza: T.DIRT, street: T.DIRT, wall: T.PALISADE, walls: ['capital', 'town', 'village'], houseWall: 'hide', roof: ['#8a5a3a', '#6a3a2a', '#9a6a4a'], wallC: '#7a5a3a', race: 'orc', tents: true },
  desert: { plaza: T.SANDSTONE, street: T.SANDSTONE, wall: T.WALL, walls: ['capital'], houseWall: 'adobe', roof: ['#e8e0d0', '#4a80c0', '#e0d0b0'], wallC: '#d8b880', race: 'felino', domes: true },
  swamp: { plaza: T.WOOD, street: T.WOOD, wall: null, walls: [], houseWall: 'stilt', roof: ['#8a7a4a', '#6a6a3a', '#7a6a3a'], wallC: '#6a5a3a', race: 'draconato' },
  fort: { plaza: T.DCOBBLE, street: T.DCOBBLE, wall: T.WALL, walls: ['capital', 'town', 'village'], houseWall: 'stone', roof: ['#3a3a4a', '#4a3a3a'], wallC: '#7a7a80', race: 'humano', guard: true }
};

// ---------- Receitas ----------
const RECIPES = {
  forge: [],
  alchemy: [
    { out: 'pocao_vida_p', in: { erva_vermelha: 2 }, skill: 0 },
    { out: 'pocao_vida_m', in: { erva_vermelha: 2, cogumelo: 1 }, skill: 20 },
    { out: 'pocao_vida_g', in: { erva_vermelha: 3, cogumelo: 1, gordura_troll: 1 }, skill: 45 },
    { out: 'pocao_magia_p', in: { erva_azul: 2 }, skill: 0 },
    { out: 'pocao_magia_m', in: { erva_azul: 2, cogumelo: 1 }, skill: 20 },
    { out: 'pocao_magia_g', in: { erva_azul: 3, ectoplasma: 1 }, skill: 45 },
    { out: 'pocao_vigor', in: { erva_vermelha: 1, erva_azul: 1 }, skill: 5 },
    { out: 'pocao_res_fogo', in: { raiz_gelo: 1, gosma: 1 }, skill: 15 },
    { out: 'pocao_res_gelo', in: { flor_fogo: 1, gosma: 1 }, skill: 15 },
    { out: 'pocao_forca', in: { presa: 1, flor_fogo: 1 }, skill: 25 },
    { out: 'pocao_velocidade', in: { asa_morcego: 1, erva_azul: 1 }, skill: 25 },
    { out: 'antidoto', in: { veneno: 1, erva_vermelha: 1 }, skill: 10 },
    { out: 'elixir_heroi', in: { erva_vermelha: 3, erva_azul: 3, diamante: 1 }, skill: 70 }
  ],
  cook: [
    { out: 'carne_assada', in: { carne_crua: 1 }, skill: 0 },
    { out: 'ensopado', in: { carne_crua: 2, cogumelo: 1, batata: 1 }, skill: 0 },
    { out: 'torta_maca', in: { maca: 3, pao: 1 }, skill: 0 },
    { out: 'pao', in: { batata: 2 }, skill: 0 },
    { out: 'peixe_assado', in: { peixe: 1 }, skill: 0 },
    { out: 'peixe_assado', in: { salmao: 1 }, skill: 0 },
    { out: 'peixe_assado', in: { enguia: 1 }, skill: 0 },
    { out: 'bolo', in: { pao: 2, maca: 2, queijo: 1 }, skill: 0 }
  ],
  smelt: [
    { out: 'lingote_ferro', in: { minerio_ferro: 2 }, skill: 0 },
    { out: 'lingote_aco', in: { lingote_ferro: 1, minerio_ferro: 1 }, skill: 10 },
    { out: 'lingote_prata', in: { minerio_prata: 2 }, skill: 20 },
    { out: 'lingote_ouro', in: { minerio_ouro: 2 }, skill: 30 },
    { out: 'lingote_obsidiana', in: { minerio_obsidiana: 2 }, skill: 40 },
    { out: 'vidro_malaquita', in: { minerio_malaquita: 2 }, skill: 55 },
    { out: 'lingote_ebano', in: { minerio_ebano: 2 }, skill: 70 },
    { out: 'couro', in: { pele_lobo: 1 }, skill: 0 },
    { out: 'couro:2', in: { pele_urso: 1 }, skill: 0 },
    { out: 'couro:2', in: { pele_gelo: 1 }, skill: 0 }
  ]
};
// Gera receitas de forja para todos os equipamentos de material
for (const id in ITEMS) {
  const it = ITEMS[id];
  if (!it.craft) continue;
  const mat = MAT_BY_ID[it.craft.mat];
  const req = {}; req[mat.ingot] = it.craft.n;
  if (mat.id === 'draconico') req.osso_dragao = Math.max(1, Math.floor(it.craft.n / 2));
  if (mat.id !== 'couro') req.couro = (req.couro || 0) + 1;
  RECIPES.forge.push({ out: id, in: req, skill: mat.skill });
}

// ---------- História principal ----------
const MAIN_QUEST = [
  { id: 'm1', title: 'O Despertar do Dragão', desc: 'Um dragão destruiu a caravana em que você viajava. Vá até a capital Valdoria e fale com o Rei Aldric III.', type: 'talk', region: 'valdoria', npc: 'ruler', lvl: 1,
    talk: ['Então você sobreviveu ao ataque do dragão... Isso não é coincidência.', 'Há séculos, a profecia fala de um Portador da Chama que surgiria quando Vorthax, o Devorador, despertasse.', 'E não é só isso: o Lich Morvath ergue os mortos no nordeste. Os reinos estão divididos e fracos.', 'Vá até a Floresta de Sylvaris. A Rainha Elarion guarda o conhecimento antigo. Ela saberá o que fazer.'], reward: { gold: 150, xp: 100 } },
  { id: 'm2', title: 'A Sabedoria dos Elfos', desc: 'Viaje até Sylvaris, a oeste, e fale com a Rainha Elarion.', type: 'talk', region: 'sylvaris', npc: 'ruler', lvl: 3,
    talk: ['Um humano... não, um Portador. Sinto a chama em você.', 'O Pergaminho Ancião, escrito na língua dos dragões, foi selado no Templo Lunar.', 'Mas a Rainha Aranha Nyxara tomou o templo. Traga o pergaminho e aprenderemos como derrotar Vorthax.'], reward: { xp: 150, item: 'pocao_vida_m:2' } },
  { id: 'm3', title: 'O Templo Lunar', desc: 'Encontre o Templo Lunar na Floresta de Sylvaris, derrote a Rainha Aranha e recupere o Pergaminho Ancião.', type: 'clear', dungeon: 'templo_lunar', lvl: 7, reward: { xp: 400, gold: 300 } },
  { id: 'm4', title: 'Runas Esquecidas', desc: 'Leve o Pergaminho Ancião ao Rei Thorin em Khaz Durim, nas montanhas do norte.', type: 'talk', region: 'khazdurim', npc: 'ruler', lvl: 9,
    talk: ['Por minha barba! Esse pergaminho fala do Martelo Rúnico de Durim!', 'Só a arma forjada pelos nossos ancestrais pode romper as escamas de Vorthax.', 'Mas as Minas Profundas foram tomadas pelo Guardião Rúnico, um golem que enlouqueceu. Recupere o martelo!'], reward: { xp: 200 } },
  { id: 'm5', title: 'As Minas Profundas', desc: 'Entre nas Minas Profundas de Durim e derrote o Guardião Rúnico.', type: 'clear', dungeon: 'minas_durim', lvl: 12, reward: { xp: 800, gold: 600 } },
  { id: 'm6', title: 'A Honra dos Orcs', desc: "Os orcs de Gor'Thak controlam o caminho até o vulcão. Fale com o Chefe Grommash.", type: 'talk', region: 'gorthak', npc: 'ruler', lvl: 15,
    talk: ['HAH! Um forasteiro quer passar pelas nossas terras?', 'Orcs só respeitam força. Vá até a Arena de Sangue e derrote nosso Campeão Urzog.', "Se vencer, o clã de Gor'Thak marchará com você contra o dragão!"], reward: { xp: 300 } },
  { id: 'm7', title: 'A Arena de Sangue', desc: 'Derrote o Campeão Urzog na Arena de Sangue.', type: 'clear', dungeon: 'arena_sangue', lvl: 16, reward: { xp: 1200, gold: 1000 } },
  { id: 'm8', title: 'O Exército dos Mortos', desc: 'Antes de enfrentar o dragão, destrua o Lich Morvath, aliado de Vorthax, na Necrópole das Terras Sombrias.', type: 'clear', dungeon: 'necropole', lvl: 22, reward: { xp: 3000, gold: 2000 } },
  { id: 'm9', title: 'O Devorador', desc: 'Suba o vulcão a nordeste de Gor\'Thak, entre no Covil de Vorthax e mate o Dragão Ancião.', type: 'clear', dungeon: 'covil_vorthax', lvl: 28, reward: { xp: 10000, gold: 10000 } }
];

// ---------- Falas ----------
const RUMORS = {
  valdoria: ['Dizem que um dragão foi visto sobre os campos de trigo!', 'A Ordem da Aurora recruta jovens corajosos na capital.', 'A Cripta dos Reis, a leste, está cheia de mortos-vivos.', 'O Rei Aldric é justo, mas os impostos estão pesados.', 'Bandidos atacam caravanas nas estradas à noite.'],
  colinas: ['A Fortaleza Goblin nas colinas é um perigo para todos!', 'Você já provou a torta de maçã da minha avó?', 'A Liga dos Caçadores paga bem por peles de lobo.', 'Pequeninos não precisam de muralhas. Precisamos de despensas cheias!'],
  sylvaris: ['A Academia Arcana aceita estudantes de todas as raças.', 'O Templo Lunar foi tomado por aranhas gigantes...', 'As árvores ancestrais brilham à noite. São as almas dos nossos antepassados.', 'Respeite a floresta e ela respeitará você.'],
  khazdurim: ['As Minas Profundas estão fechadas desde que o Guardião enlouqueceu.', 'Nada se compara ao aço anão, nada!', 'A Irmandade da Forja só aceita quem traz minério de verdade.', 'Cuidado com os trolls nas montanhas.'],
  nordheim: ['O Túmulo do Rei Hrothgar está cheio de draugrs.', 'A Companhia do Aço é a maior honra de um guerreiro.', 'Dragões foram vistos sobre as montanhas geladas.', 'Pedras Rúnicas guardam palavras do poder dos dragões. Dizem que só quem absorve almas de dragão pode aprendê-las.'],
  gorthak: ['Só os fortes merecem respeito em Gor\'Thak!', 'O Clã do Punho Sangrento quer guerreiros, não covardes.', 'O vulcão ronca toda noite... algo enorme dorme lá.', 'A Arena de Sangue nunca fica vazia.'],
  zahrim: ['A Pirâmide de Amun-Sheth guarda ouro... e maldições.', 'A Irmandade das Sombras? Nunca ouvi falar... *pisca*', 'Escorpiões gigantes saem à noite. Fique perto das tochas.', 'Os oásis são dádivas da Lua Gêmea.'],
  ssarak: ['A Hidra do pântano devora barcos inteiros.', 'O Círculo Druídico mantém o equilíbrio do pântano.', 'Nossos ovos são chocados no calor das águas termais.', 'Forasteiros se perdem na bruma... e não voltam.'],
  morvath: ['A Necrópole é o coração da escuridão. O Lich Morvath reina lá.', 'Este bastião é a última luz destas terras.', 'Os mortos atacam com mais força à noite. Fique atento.', 'Precisamos de heróis. Muitos já caíram.']
};
const GREETINGS = ['Saudações, viajante.', 'Bom dia!', 'Olá, forasteiro.', 'Que os deuses te guiem.', 'Precisa de algo?', 'Hm? Ah, olá.', 'Cuidado lá fora.', 'Seja bem-vindo!'];
const GUARD_LINES = ['Mantenha a paz, cidadão.', 'Eu já fui aventureiro como você... até levar uma flechada no joelho.', 'Nenhum problema por aqui, certo?', 'Os monstros não passarão por estes portões!', 'Fique atento à noite.'];

// Prédios
const BUILDINGS = {
  castle: { name: 'Castelo', w: 12, h: 7, role: 'ruler' },
  palace: { name: 'Palácio', w: 10, h: 6, role: 'ruler' },
  temple: { name: 'Templo', w: 6, h: 5, role: 'temple' },
  heroes: { name: 'Guilda dos Heróis', w: 7, h: 5, role: 'guild', guild: 'herois' },
  guildhall: { name: 'Sede da Guilda', w: 7, h: 5, role: 'guild' },
  inn: { name: 'Taverna', w: 6, h: 4, role: 'inn' },
  smith: { name: 'Ferraria', w: 5, h: 4, role: 'smith' },
  general: { name: 'Armazém', w: 5, h: 4, role: 'general' },
  alchemist: { name: 'Alquimista', w: 4, h: 4, role: 'alchemist' },
  magic: { name: 'Loja de Magia', w: 4, h: 4, role: 'magic' },
  stable: { name: 'Estábulo', w: 6, h: 3, role: 'stable' },
  playerhouse: { name: 'Casa à Venda', w: 5, h: 4, role: 'playerhouse' },
  house: { name: 'Casa', w: 4, h: 3, role: 'house' },
  house2: { name: 'Casa', w: 5, h: 3, role: 'house' },
  house3: { name: 'Casa', w: 3, h: 3, role: 'house' },
  tower: { name: 'Torre', w: 3, h: 3, role: 'tower' }
};
const SHOP_NAMES = {
  inn: ['O Pônei Saltitante', 'O Dragão Bêbado', 'Caneca de Ouro', 'O Javali Feliz', 'A Lareira Quente', 'O Corvo Cansado', 'O Barril Sem Fundo'],
  smith: ['Forja do', 'Bigorna do', 'Martelo do'],
  general: ['Armazém do', 'Mercado do', 'Bazar do'],
  alchemist: ['Poções do', 'Ervas do', 'Elixires do'],
  magic: ['Arcanos do', 'Tomos do', 'Mistérios do']
};

// ---------- Itens extras (romance, família, pesca) ----------
idef('amuleto_aurora', { name: 'Amuleto da Aurora', type: 'armor', slot: 'neck', armor: 0, value: 300, icon: { k: 'amulet', c: '#f0c040', g: '#ff80b0' }, ench: [{ k: 'regen', v: 1 }], desc: 'Usado por quem procura um amor. Necessário para pedir alguém em casamento.' });
idef('vara_pesca', { name: 'Vara de Pesca', type: 'misc', value: 40, icon: { k: 'rod', c: '#8a6a3a' }, desc: 'Fique de frente para a água e toque em AÇÃO para pescar.' });
idef('buque', { name: 'Buquê de Flores', type: 'misc', value: 15, stack: true, icon: { k: 'herb', c: '#ff70a0' }, desc: 'Um ótimo presente.' });
idef('boneca', { name: 'Boneca de Pano', type: 'misc', value: 12, stack: true, icon: { k: 'doll', c: '#e0a070' }, desc: 'Brinquedo. Crianças adoram.' });
idef('espada_madeira', { name: 'Espada de Madeira', type: 'misc', value: 10, stack: true, icon: { k: 'sword', c: '#a07040' }, desc: 'Brinquedo. Crianças adoram.' });
idef('desenho', { name: 'Desenho do seu Filho', type: 'misc', value: 0, stack: true, icon: { k: 'scroll', c: '#f0f0ff' }, desc: 'Um desenho seu lutando contra um dragão. Que fofo!' });
const PETS = { cachorro: { name: 'Cachorro', price: 250, names: ['Bolinha', 'Rex', 'Trovão', 'Pipoca', 'Lobo', 'Faísca', 'Biscoito', 'Thor'] }, gato_selvagem: { name: 'Gato Selvagem', price: 400, names: ['Mingau', 'Garra', 'Sombra', 'Pantera', 'Nina'] }, lobo_domado: { name: 'Lobo Domado', price: 900, names: ['Fenrir', 'Uivo', 'Nevasca', 'Presa'] } };
const ROMANCE_LINES = {
  talk: ['Que bom te ver de novo!', 'O dia está lindo, não acha?', 'Ouvi histórias sobre suas aventuras...', 'Você sempre aparece quando preciso de um sorriso.', 'Já pensou em sossegar um pouco?', 'Me conte sobre o lugar mais bonito que você já viu.', 'Fico preocupado(a) quando você vai às masmorras.'],
  flirtOk: ['*sorri e cora*', 'Você é cheio(a) de charme, hein?', 'Hm... continue falando assim.', 'Talvez eu goste de você também...'],
  flirtBad: ['Acho que você está indo rápido demais.', 'Haha... não.', 'Melhor sermos só amigos por enquanto.'],
  spouse: ['Bem-vindo(a) de volta, meu amor!', 'Preparei algo para você comer.', 'Senti sua falta.', 'As crianças perguntaram por você.', 'Tome cuidado lá fora, está bem?'],
  child: ['Me conta uma história de dragão!', 'Quando eu crescer quero ser igual a você!', 'Fiz um desenho pra você!', 'Posso ir na aventura também?', 'Hoje eu vi um coelho enorme!', 'Brinca comigo?']
};
