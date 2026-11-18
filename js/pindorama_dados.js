'use strict';
// =====================================================================
//  PINDORAMA — o sexto continente, a leste de Elyndra, além do Mar Verde
//  Inspirado no Brasil: uma floresta tropical gigante (a maior do mundo),
//  rios largos, os alagados de um pantanal, o sertão seco da caatinga, a
//  costa de palmeiras de um reino colonial e serras de ouro.
//  Facções: o Reino de Vera Cruz (cidades coloniais de azulejo, igrejas
//  barrocas), dois povos indígenas da floresta (Jaguaretê e Guaraci, com
//  ocas, malocas, pajés e caciques), os ribeirinhos das palafitas do
//  Pantaneira, os cangaceiros do Sertão, o Quilombo da Serra Livre e os
//  garimpeiros armados da Serra do Ouro Fino.
//  Só dados aqui (carregado logo depois de data.js); o desenho, a geração
//  e as regras ficam em pindorama.js.
// =====================================================================
const PINDORAMA_REGIONS = [
  { id: 'veracruz', name: 'Reino de Vera Cruz', short: 'Vera Cruz', race: 'brasilico', fx: 24050 / 4096, fy: 8500 / 4096, biome: 'tropical', lvl: [22, 32], mount: -0.04, culture: 'colonial', cont: 5, isolated: true,
    ruler: { title: 'Rei', name: 'Dom Afonso Cruzeiro-do-Sul', race: 'brasilico' }, towns: 5, villages: 8, dungeons: 10, color: '#2a9a40',
    desc: 'Um reino de costa de palmeiras: cidades de casarões coloridos com azulejos, igrejas barrocas de torres brancas, engenhos de açúcar, festas com tambores e um povo misturado de todas as cores.' },
  { id: 'jaguarete', name: 'Selva do Povo Jaguaretê', short: 'Jaguaretê', race: 'indigena', fx: 21500 / 4096, fy: 3300 / 4096, biome: 'jungle', lvl: [24, 34], mount: 0.0, culture: 'oca', cont: 5, isolated: true,
    ruler: { title: 'Cacique', name: 'Arapuã Olho-de-Onça', race: 'indigena' }, towns: 3, villages: 8, dungeons: 10, color: '#e0a020',
    desc: 'O norte da grande floresta: árvores do tamanho de torres, rios cor de chá e aldeias de ocas em roda. O Povo Jaguaretê caça com arco e zarabatana e diz ser parente das onças.' },
  { id: 'guaraci', name: 'Grande Selva de Guaraci', short: 'Guaraci', race: 'indigena', fx: 22350 / 4096, fy: 6050 / 4096, biome: 'jungle', lvl: [24, 34], mount: -0.02, culture: 'oca', cont: 5, isolated: true,
    ruler: { title: 'Pajé-Mor', name: 'Jaci Flecha-de-Lua', race: 'indigena' }, towns: 3, villages: 9, dungeons: 10, color: '#d04a2a',
    desc: 'O coração da floresta, tão fechada que o sol quase não toca o chão. O Povo Guaraci vive em malocas enormes, conhece cada erva da mata e guarda a selva de quem vem derrubá-la.' },
  { id: 'pantaneira', name: 'Alagados de Pantaneira', short: 'Pantaneira', race: 'brasilico', fx: 21400 / 4096, fy: 8900 / 4096, biome: 'wetland', lvl: [22, 32], mount: -0.1, culture: 'palafita', cont: 5, isolated: true,
    ruler: { title: 'Senhora das Águas', name: 'Iracema Remo-Ligeiro', race: 'brasilico' }, towns: 3, villages: 7, dungeons: 10, color: '#3a8ab0',
    desc: 'Um pântano do tamanho de um reino: campos que viram lagoas na cheia, jacarés às centenas, sucuris e vitórias-régias. Os ribeirinhos vivem em palafitas e andam de canoa.' },
  { id: 'sertao', name: 'Sertão do Cangaço', short: 'Sertão', race: 'brasilico', fx: 24300 / 4096, fy: 3100 / 4096, biome: 'caatinga', lvl: [24, 34], mount: 0.02, culture: 'taipa', cont: 5, isolated: true,
    ruler: { title: 'Capitão', name: 'Severino Chapéu-de-Couro', race: 'brasilico' }, towns: 3, villages: 6, dungeons: 10, color: '#c0702a',
    desc: 'Terra seca de mandacarus e chão rachado, onde chove pouco e o sol castiga. Os cangaceiros de chapéu de couro mandam aqui: fazem justiça com as próprias mãos e não gostam de forasteiros.' },
  { id: 'quilombo', name: 'Quilombo da Serra Livre', short: 'Serra Livre', race: 'brasilico', fx: 23350 / 4096, fy: 10750 / 4096, biome: 'serraverde', lvl: [24, 34], mount: 0.04, culture: 'quilombo', cont: 5, isolated: true,
    ruler: { title: 'Rei', name: 'Akin Mão-Livre', race: 'brasilico' }, towns: 3, villages: 5, dungeons: 8, color: '#8a4ac0',
    desc: 'Uma serra verde onde ninguém é dono de ninguém. Fundado por quem fugiu das correntes, o quilombo tem roças, capoeira na praça, tambores à noite e paliçadas que nenhum exército conseguiu romper.' },
  { id: 'ourofino', name: 'Serra do Ouro Fino', short: 'Ouro Fino', race: null, fx: 23700 / 4096, fy: 5900 / 4096, biome: 'serra', lvl: [28, 38], mount: 0.1, culture: 'garimpo', cont: 5, isolated: true,
    ruler: null, towns: 2, villages: 0, dungeons: 12, color: '#d8b830', hostile: true,
    desc: 'Serras de pedra e terra vermelha com veios de ouro. Garimpeiros armados e bandeirantes sem lei disputam cada barranco, e a mata em volta esconde o Mapinguari.' }
];
REGIONS.push(...PINDORAMA_REGIONS);
PINDORAMA_REGIONS.forEach(r => { r.index = REGIONS.indexOf(r); REGION_BY_ID[r.id] = r; });
CONTINENTS.push('Pindorama');

// ---------- povos ----------
RACES.indigena = { name: 'Povo da Mata', desc: 'Os povos da grande floresta de Pindorama: caçadores, pescadores e pajés que conhecem cada planta e cada bicho da selva.', npcOnly: true, sheet: true, skins: ['#a8683c'], hairs: ['#14100c'], mods: {} };
RACES.brasilico = { name: 'Pindoramense', desc: 'O povo misturado de Pindorama: filhos de todos os povos que chegaram à costa e dos que já estavam lá.', npcOnly: true, sheet: true, skins: ['#c68642'], hairs: ['#1a1410'], mods: {} };

NAMES.indigena = {
  m: ['Arapuã', 'Ubiratã', 'Caiuá', 'Tabajara', 'Juruna', 'Aimberê', 'Piatã', 'Ubirajara', 'Tupã-Arã', 'Moacir', 'Irapuã', 'Jaguaraci', 'Raoni-Tê', 'Peri', 'Cauê', 'Tainá-Guaçu'],
  f: ['Jaci', 'Iara', 'Moema', 'Potira', 'Araci', 'Jurema', 'Tainá', 'Yporã', 'Iracy', 'Naiá', 'Ceci', 'Juçara', 'Aponi', 'Poranga', 'Inaiê', 'Maíra'],
  s: ['Olho-de-Onça', 'Flecha-de-Lua', 'Pena-de-Arara', 'Canto-do-Rio', 'Pé-Ligeiro', 'Raiz-Funda', 'da Cachoeira', 'Pele-de-Urucum', 'Zarabatana', 'Voo-de-Gavião', 'Sombra-da-Mata', 'Filho-do-Sol']
};
NAMES.brasilico = {
  m: ['João', 'Severino', 'Benedito', 'Raimundo', 'Sebastião', 'Francisco', 'Antônio', 'Zé Pequeno', 'Cícero', 'Damião', 'Tião', 'Josué', 'Manoel', 'Chico', 'Bento', 'Joaquim', 'Gonçalo', 'Lampejo'],
  f: ['Maria', 'Iracema', 'Conceição', 'Rosa', 'Das Dores', 'Aparecida', 'Benedita', 'Luzia', 'Graça', 'Socorro', 'Dandara', 'Tereza', 'Rita', 'Joana', 'Maria Bonita', 'Zefinha'],
  s: ['da Silva', 'dos Santos', 'de Oliveira', 'de Souza', 'Pereira', 'do Rosário', 'da Conceição', 'Ferreira', 'do Sertão', 'Cruzeiro', 'das Águas', 'de Jesus', 'Bandeira', 'Remo-Ligeiro', 'Chapéu-de-Couro', 'Mão-Livre']
};

// ---------- cidades ----------
SETTLEMENT_NAMES.veracruz = { cap: 'São Salvador da Cruz', list: ['Vila do Pelourinho', 'Porto das Palmas', 'Engenho Velho', 'Olinda Alta', 'Santa Luzia', 'Recife das Velas', 'Ouro Branco', 'Arraial do Cajueiro', 'São João do Rio Doce', 'Vila Rica do Mar', 'Itapuã', 'Paraty Nova', 'Ilhéus de Cima', 'Cachoeira do Sino'] };
SETTLEMENT_NAMES.jaguarete = { cap: 'Grande Aldeia Jaguaretê', list: ['Aldeia do Rio Negro', 'Taba da Onça', 'Aldeia Pé-de-Sapucaia', 'Taba do Gavião', 'Aldeia Igarapé', 'Taba da Cachoeira', 'Aldeia Buriti', 'Taba das Araras', 'Aldeia do Tucano', 'Taba Sumaúma', 'Aldeia Cipó'] };
SETTLEMENT_NAMES.guaraci = { cap: 'Maloca Grande de Guaraci', list: ['Aldeia Sol Nascente', 'Taba do Jacaré', 'Aldeia das Ervas', 'Taba da Lua', 'Aldeia Vitória-Régia', 'Taba Mandioca', 'Aldeia do Pajé', 'Taba Urucum', 'Aldeia Jenipapo', 'Taba Seringueira', 'Aldeia Boto-Rosa', 'Taba Castanheira'] };
SETTLEMENT_NAMES.pantaneira = { cap: 'Porto das Águas', list: ['Palafitas do Tuiuiú', 'Vila Piranha', 'Corixo Grande', 'Baía das Garças', 'Vila da Cheia', 'Remanso', 'Pouso do Jacaré', 'Vila Capivara', 'Ilha do Aguapé', 'Furo do Dourado'] };
SETTLEMENT_NAMES.sertao = { cap: 'Arraial do Capitão', list: ['Vila Mandacaru', 'Juazeiro Seco', 'Serra Talhada', 'Poço da Cruz', 'Vila do Vaqueiro', 'Xique-Xique', 'Pedra Furada', 'Açude Velho', 'Vila Asa-Branca', 'Cabrobó'] };
SETTLEMENT_NAMES.quilombo = { cap: 'Cerca Real da Serra Livre', list: ['Mocambo do Tambor', 'Roça Grande', 'Mocambo das Palmeiras', 'Vila Liberdade', 'Mocambo do Jongo', 'Aldeia da Capoeira', 'Vila Aqualtune', 'Mocambo da Lua'] };
SETTLEMENT_NAMES.ourofino = { cap: 'Arraial do Ouro Fino', list: ['Forte dos Bandeirantes', 'Barranco Rico'] };

// ---------- estilos das cidades ----------
CULTURES.colonial = { plaza: T.COBBLE, street: T.COBBLE, wall: T.WALL, walls: ['capital', 'town'], houseWall: 'colonial', roof: ['#c0583a', '#b04a30', '#d06a40', '#a8462c'], wallC: '#f2ecdc', race: 'brasilico', guard: true, flowers: true };
CULTURES.oca = { plaza: T.DIRT, street: T.DIRT, wall: T.PALISADE, walls: ['capital'], houseWall: 'oca', roof: ['#c8a050', '#b8903e', '#d4ae5c'], wallC: '#8a6a3a', race: 'indigena' };
CULTURES.palafita = { plaza: T.WOOD, street: T.WOOD, wall: null, walls: [], houseWall: 'palafita', roof: ['#b89a52', '#a88a44', '#c8a85e'], wallC: '#8a6a44', race: 'brasilico' };
CULTURES.taipa = { plaza: T.DIRT, street: T.DIRT, wall: T.PALISADE, walls: ['capital', 'town'], houseWall: 'taipa', roof: ['#b85a34', '#a84e2e', '#c4683c'], wallC: '#d8b080', race: 'brasilico', guard: true };
CULTURES.quilombo = { plaza: T.DIRT, street: T.DIRT, wall: T.PALISADE, walls: ['capital', 'town', 'village'], houseWall: 'mocambo', roof: ['#a8903e', '#98803a', '#b89e4a'], wallC: '#a8784a', race: 'brasilico', guard: true };
CULTURES.garimpo = { plaza: T.DIRT, street: T.DIRT, wall: T.PALISADE, walls: ['capital', 'town'], houseWall: 'taipa', roof: ['#6a5a4a', '#7a5a3a'], wallC: '#c09a6a', race: 'brasilico', guard: true };
Object.assign(BIOME_GROUND, { jungle: T.DGRASS, wetland: T.MUD, caatinga: T.DIRT, tropical: T.GRASS, serraverde: T.GRASS, serra: T.DIRT });

// ---------- bichos e inimigos ----------
Object.assign(ENEMIES, {
  onca: { name: 'Onça-Pintada', look: { k: 'wolf', c: '#d8a038' }, hp: 120, dmg: 20, spd: 84, ai: 'charge', xp: 55, aggro: 120, r: 6, drops: [['couro', 0.8], ['presa', 0.5], ['carne_crua', 0.5]], animal: true },
  onca_preta: { name: 'Onça-Preta', look: { k: 'wolf', c: '#26242a' }, hp: 150, dmg: 24, spd: 88, ai: 'charge', xp: 70, aggro: 130, r: 6, drops: [['couro', 0.8], ['presa', 0.6]], animal: true },
  sucuri: { name: 'Sucuri Gigante', look: { k: 'lizard', c: '#3e5a26', size: 1.5 }, hp: 220, dmg: 22, spd: 40, ai: 'melee', xp: 70, r: 8, drops: [['escama_lagarto', 1], ['carne_crua', 0.6]], animal: true },
  jacare: { name: 'Jacaré-Açu', look: { k: 'lizard', c: '#4a5a36', size: 1.3 }, hp: 160, dmg: 20, spd: 46, ai: 'melee', xp: 50, aggro: 70, r: 7, drops: [['escama_lagarto', 0.9], ['carne_crua', 0.8], ['presa', 0.3]], animal: true },
  capivara: { name: 'Capivara', look: { k: 'boar', c: '#8a6040' }, hp: 40, dmg: 0, spd: 70, ai: 'flee', xp: 6, r: 6, drops: [['carne_crua', 1], ['couro', 0.5]], animal: true, passive: true },
  anta: { name: 'Anta', look: { k: 'boar', c: '#4a4448' }, hp: 70, dmg: 0, spd: 66, ai: 'flee', xp: 8, r: 7, drops: [['carne_crua', 1], ['couro', 0.7]], animal: true, passive: true },
  queixada: { name: 'Queixada', look: { k: 'boar', c: '#3a3030' }, hp: 85, dmg: 15, spd: 70, ai: 'charge', xp: 34, aggro: 90, drops: [['couro', 0.6], ['carne_crua', 0.8], ['presa', 0.3]], animal: true },
  veado_mateiro: { name: 'Veado-Mateiro', look: { k: 'deer', c: '#a85a30' }, hp: 26, dmg: 0, spd: 88, ai: 'flee', xp: 5, r: 6, drops: [['carne_crua', 1], ['couro', 0.6]], animal: true, passive: true },
  aranha_caranguejeira: { name: 'Caranguejeira Gigante', look: { k: 'spider', c: '#4a2a1a' }, hp: 70, dmg: 14, spd: 62, ai: 'melee', xp: 30, poison: 5, drops: [['seda_aranha', 0.6], ['veneno', 0.5]] },
  curupira: { name: 'Curupira', look: { k: 'hum', skin: '#5a8a3a', body: '#3a6a2a', legs: '#2a4a1a', hair: '#ff5a1a', size: 0.75, eyes: '#ffe040', weapon: 'staff', wc: '#6a4a2a', nobelt: true }, hp: 110, dmg: 16, spd: 96, ai: 'caster', proj: 'poison', xp: 60, gold: [10, 40], drops: [['erva_vermelha', 0.6]] },
  boitata: { name: 'Boitatá', look: { k: 'elemental', c: '#ff7a10' }, hp: 240, dmg: 26, spd: 58, ai: 'caster', proj: 'fireball', xp: 100, elem: 'fire', drops: [['essencia_fogo', 0.6]] },
  assombracao: { name: 'Assombração da Mata', look: { k: 'ghost', c: '#90e0a0' }, hp: 60, dmg: 14, spd: 56, ai: 'melee', xp: 30, undead: true, fly: true, ghost: true, drops: [['ectoplasma', 0.6]] },
  mapinguari: { name: 'Mapinguari', look: { k: 'bear', c: '#5a3a24', size: 1.6 }, hp: 900, dmg: 38, spd: 54, ai: 'charge', charge: true, xp: 400, r: 11, armor: 30, gold: [80, 200], drops: [['couro', 1], ['presa', 1]], dropGear: 0.6 },
  cangaceiro: { name: 'Cangaceiro', look: { k: 'hum', skin: '#c68642', body: '#8a6a3a', legs: '#5a4028', hair: '#1a1410', helm: '#7a5a2a', helmStyle: 'tricorne', crossbelt: true, weapon: 'musket', wc: '#5a4a3a' }, hp: 80, dmg: 22, spd: 62, ai: 'ranged', proj: 'bullet', cd: 2.2, xp: 46, gold: [20, 70], drops: [['pocao_vida_p', 0.2]], dropGear: 0.15 },
  cangaceiro_faca: { name: 'Cangaceiro de Peixeira', look: { k: 'hum', skin: '#a8683c', body: '#7a5a30', legs: '#4a3420', hair: '#1a1410', helm: '#7a5a2a', helmStyle: 'tricorne', weapon: 'dagger', wc: '#d0d0d8' }, hp: 90, dmg: 20, spd: 72, ai: 'melee', xp: 42, gold: [15, 50], dropGear: 0.12 },
  garimpeiro: { name: 'Garimpeiro Armado', look: { k: 'hum', skin: '#d8a070', body: '#5a6a4a', legs: '#3a3a30', hair: '#3a2a1a', hood: '#6a5a3a', weapon: 'axe', wc: '#8a8a90' }, hp: 85, dmg: 18, spd: 60, ai: 'melee', xp: 38, gold: [15, 60], drops: [['minerio_ouro', 0.25]], dropGear: 0.12 },
  bandeirante: { name: 'Bandeirante', look: { k: 'hum', skin: '#e0ac69', body: '#4a3a2a', legs: '#2a2a30', hair: '#2a1a10', helm: '#3a3a3a', helmStyle: 'tricorne', crossbelt: true, weapon: 'musket', wc: '#4a3a2a' }, hp: 95, dmg: 26, spd: 58, ai: 'ranged', proj: 'bullet', cd: 2.4, xp: 55, gold: [30, 90], dropGear: 0.18 },
  coronel_bandeirante: { name: 'Coronel do Ouro', look: { k: 'hum', skin: '#e0ac69', body: '#2a2a3a', legs: '#1a1a24', hair: '#d0d0d0', helm: '#1a1a1a', helmStyle: 'tricorne', crossbelt: true, weapon: 'musket', wc: '#c0a040', size: 1.2, bulky: true }, hp: 1400, dmg: 34, spd: 56, ai: 'boss', proj: 'bullet', xp: 900, boss: true, r: 10, dropGear: 1, gold: [400, 800] },
  boiuna: { name: 'Boiúna, a Cobra-Grande', look: { k: 'dragon', c: '#1e3a26', heads: 1, size: 1.2 }, hp: 1600, dmg: 34, spd: 44, ai: 'boss', proj: 'poison', poison: 7, xp: 1000, boss: true, r: 14, dropGear: 1, gold: [400, 800] },
  mapinguari_rei: { name: 'Mapinguari Ancião', look: { k: 'bear', c: '#3a2416', size: 2.2 }, hp: 2200, dmg: 44, spd: 50, ai: 'boss', xp: 1100, boss: true, r: 14, armor: 40, dropGear: 1, gold: [400, 900] }
});
Object.assign(SPAWNS, {
  veracruz: { day: [['capivara', 3], ['veado_mateiro', 3], ['queixada', 1.5], ['pirata', 1], ['onca', 0.5]], night: [['onca', 1.5], ['assombracao', 1.5], ['pirata', 1.5], ['queixada', 1]] },
  jaguarete: { day: [['onca', 2], ['queixada', 2], ['anta', 3], ['veado_mateiro', 2], ['aranha_caranguejeira', 1.5], ['sucuri', 0.7]], night: [['onca_preta', 2], ['onca', 2], ['curupira', 1.5], ['assombracao', 1.5], ['aranha_caranguejeira', 2]] },
  guaraci: { day: [['onca', 2], ['anta', 3], ['capivara', 2], ['queixada', 2], ['sucuri', 1], ['aranha_caranguejeira', 1.5]], night: [['onca_preta', 2], ['curupira', 2], ['boitata', 0.6], ['assombracao', 2], ['mapinguari', 0.25]] },
  pantaneira: { day: [['jacare', 4], ['capivara', 4], ['sucuri', 1.5], ['veado_mateiro', 2], ['onca', 0.8]], night: [['jacare', 3], ['sucuri', 2], ['boitata', 1], ['assombracao', 1.5]] },
  sertao: { day: [['cangaceiro_faca', 1.5], ['cangaceiro', 1], ['escorpiao', 2], ['lagarto', 2], ['veado_mateiro', 2], ['coelho', 2]], night: [['cangaceiro', 1.5], ['escorpiao', 2], ['assombracao', 1.5], ['lobo', 1.5]] },
  quilombo: { day: [['capivara', 3], ['veado_mateiro', 3], ['queixada', 2], ['onca', 0.8]], night: [['onca', 1.5], ['assombracao', 1.5], ['queixada', 1.5]] },
  ourofino: { day: [['garimpeiro', 3], ['bandeirante', 1.5], ['onca', 1], ['mapinguari', 0.4]], night: [['garimpeiro', 2], ['bandeirante', 2], ['mapinguari', 0.8], ['assombracao', 2]] }
});
Object.assign(DUNGEON_TYPES, {
  templo_selva: { name: 'Templo Perdido da Selva', gen: 'rooms', floor: T.RFLOOR, wall: T.RWALL, ent: O.ENT_RUIN, mobs: ['curupira', 'aranha_caranguejeira', 'onca_preta', 'assombracao'], boss: 'mapinguari_rei', deco: [O.BROKEN_PILLAR, O.HERB_SHROOM, O.COBWEB, O.PILLAR] },
  gruta_alagada: { name: 'Gruta Alagada', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['jacare', 'sucuri', 'aranha_caranguejeira'], boss: 'boiuna', deco: [O.REEDS, O.BONES, O.HERB_SHROOM], water: true },
  mina_garimpo: { name: 'Garimpo Clandestino', gen: 'cave', floor: T.MFLOOR, wall: T.MWALL, ent: O.ENT_MINE, mobs: ['garimpeiro', 'bandeirante', 'garimpeiro'], boss: 'coronel_bandeirante', deco: [O.ORE_OURO, O.ORE_FERRO, O.CRATE, O.TORCH], ores: true },
  esconderijo_cangaco: { name: 'Esconderijo do Cangaço', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['cangaceiro', 'cangaceiro_faca', 'cangaceiro'], boss: 'bandido_chefe', deco: [O.BARREL, O.CRATE, O.TORCH, O.CAMPFIRE] }
});
Object.assign(REGION_DUNGEONS, {
  veracruz: ['caverna', 'covil_bandido', 'ruina_afundada', 'cripta'],
  jaguarete: ['templo_selva', 'templo_selva', 'gruta_alagada', 'caverna'],
  guaraci: ['templo_selva', 'templo_selva', 'gruta_alagada'],
  pantaneira: ['gruta_alagada', 'gruta_alagada', 'ruina_afundada'],
  sertao: ['esconderijo_cangaco', 'esconderijo_cangaco', 'caverna', 'tumba_deserto'],
  quilombo: ['caverna', 'templo_selva', 'covil_bandido'],
  ourofino: ['mina_garimpo', 'mina_garimpo', 'caverna']
});
Object.assign(RUMORS, {
  veracruz: ['Em Vera Cruz toda festa acaba em roda de tambor até o sol nascer.', 'O Rei Dom Afonso mandou cobrir a igreja nova de ouro da Serra do Ouro Fino.', 'Os azulejos azuis das casas vieram de navio, de muito longe.', 'Dizem que piratas se escondem nas enseadas do sul, atrás dos coqueiros.'],
  jaguarete: ['O Cacique Arapuã consegue imitar o rugido da onça tão bem que as onças respondem.', 'Não assobie na mata à noite: o Curupira responde, e os pés dele são virados para trás.', 'Uma sumaúma da aldeia grande é mais velha que qualquer reino.', 'Quem respeita a floresta sai dela. Quem não respeita...'],
  guaraci: ['A Pajé Jaci conversa com os espíritos da mata quando a lua está cheia.', 'Lá no fundo da selva anda o Mapinguari: um bicho enorme com a boca na barriga.', 'O Boitatá é uma cobra de fogo que protege a mata de quem põe fogo nela.', 'O chá de ervas dos Guaraci cura até mordida de cobra.'],
  pantaneira: ['Na cheia, metade das vilas fica dentro d\'água. Por isso as casas têm pernas.', 'A Boiúna, a Cobra-Grande, dorme numa gruta alagada. Os pescadores não passam por lá.', 'Os jacarés daqui não atacam quem fica quieto... quase sempre.', 'A vitória-régia aguenta uma criança em cima sem afundar.'],
  sertao: ['O Capitão Severino nunca perdeu um duelo. Nem um.', 'No sertão a água vale mais que ouro. Não desperdice nem um gole.', 'Quando chove no sertão, o povo sai dançando na rua.', 'Os cangaceiros enfeitam os chapéus de couro com estrelas de metal.'],
  quilombo: ['Na Serra Livre ninguém é dono de ninguém. Quem chega com corrente na mão, não sai.', 'O Rei Akin aprendeu a lutar capoeira antes de aprender a andar.', 'A paliçada do quilombo resistiu a três exércitos.', 'Os tambores da serra contam histórias que os livros esqueceram.'],
  ourofino: ['Tem ouro em cada barranco da serra, mas tem mais bala do que ouro.', 'O Coronel do Ouro manda nos garimpeiros e não deixa ninguém sair rico.', 'Um garimpeiro jurou que viu o Mapinguari carregando uma bateia de ouro.']
});
const SEM_NEVE_PINDORAMA = ['jungle', 'wetland', 'caatinga', 'tropical', 'serraverde', 'serra'];
