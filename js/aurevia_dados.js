'use strict';
// =====================================================================
//  AURÉVIA — o sétimo continente, o maior de todos, no extremo leste
//  O formato das terras, das ilhas e dos mares de dentro é o do mapa de
//  referência (js/aurevia_mapa.js): neves no noroeste, florestas, campos,
//  o grande deserto de âmbar cortado pela Cordilheira Rubra, a terra negra
//  dos vulcões e a península do sudeste.
//  Facção principal: o Sacro Império da Rosa Branca (a bandeira de cruz
//  vermelha denteada, cruz negra, sol negro e a rosa branca no centro),
//  com as suas ordens de cavaleiros, cada uma guardando uma província:
//   • Guarda Imperial (Rosálba): o Imperador Leão, de armadura com louros
//   • Cruzados da Rosa: tabardo vermelho com cruz branca e alabarda
//   • Ordem do Sol Negro: armadura negra com chifres e alabarda
//   • Cavaleiros de Prata: armadura clara com pluma vermelha
//   • Legião Escarlate: elmo de crista vermelha, capa e gládio
//   • Guarda Azul: alabardeiros de azul com peitoral de aço
//  Só dados aqui (carregado logo depois de pindorama_dados.js); o desenho,
//  a geração e as regras ficam em aurevia.js.
// =====================================================================
const Aurevia = {
  _c: null,
  // decodifica o mapa de classes e prepara os campos suavizados (terra e serras)
  campo() {
    if (this._c) return this._c;
    const M = AUREVIA_MAPA, w = M.w, h = M.h, n = w * h, cls = new Uint8Array(n);
    let i = 0;
    const re = /([A-G])([0-9a-z]+)/g; let mm;
    while ((mm = re.exec(M.rle))) { const c = mm[1].charCodeAt(0) - 65, k = parseInt(mm[2], 36); cls.fill(c, i, i + k); i += k; }
    const L = new Float32Array(n), S = new Float32Array(n);
    for (let j = 0; j < n; j++) { const c = cls[j]; L[j] = c ? 1 : 0; S[j] = c === 4 ? 1 : c === 6 ? 0.8 : c === 5 ? 0.55 : 0; }
    // borda do mapa: o mar sempre cerca o continente
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) { const d = Math.min(x, y, w - 1 - x, h - 1 - y); if (d < 6) L[y * w + x] *= d / 6; }
    const blur = (A, r, pass) => {
      const T = new Float32Array(n);
      for (let p = 0; p < pass; p++) {
        for (let y = 0; y < h; y++) { let s = 0; const o = y * w; for (let x = -r; x <= r; x++) s += A[o + clamp(x, 0, w - 1)]; for (let x = 0; x < w; x++) { T[o + x] = s / (2 * r + 1); s += A[o + Math.min(w - 1, x + r + 1)] - A[o + Math.max(0, x - r)]; } }
        for (let x = 0; x < w; x++) { let s = 0; for (let y = -r; y <= r; y++) s += T[clamp(y, 0, h - 1) * w + x]; for (let y = 0; y < h; y++) { A[y * w + x] = s / (2 * r + 1); s += T[Math.min(h - 1, y + r + 1) * w + x] - T[Math.max(0, y - r) * w + x]; } }
      }
    };
    blur(L, 1, 2); blur(S, 2, 2);
    return (this._c = { w, h, cls, L, S });
  },
  // valor bilinear de um campo nas coordenadas do mapa (pixels)
  amostra(A, u, v) {
    const C = this._c || this.campo(), w = C.w, h = C.h;
    if (u < 0 || v < 0 || u >= w - 1 || v >= h - 1) return 0;
    const x = u | 0, y = v | 0, fx = u - x, fy = v - y, i = y * w + x;
    return (A[i] * (1 - fx) + A[i + 1] * fx) * (1 - fy) + (A[i + w] * (1 - fx) + A[i + w + 1] * fx) * fy;
  },
  classe(u, v) { const C = this._c || this.campo(); const x = Math.round(u), y = Math.round(v); return x < 0 || y < 0 || x >= C.w || y >= C.h ? 0 : C.cls[y * C.w + x]; },
  BIOMA: [null, 'estepe', 'forest', 'desert', 'rubra', 'volcanic', 'snow'],
  // tiles do mundo -> pixels do mapa
  uv(x, y) { return [(x - AUREVIA.ox) / AUREVIA.sc, (y - AUREVIA.oy) / AUREVIA.sc]; },
  // pixel do mapa -> fração usada pelas regiões (fx/fy, multiplicadas por WORLD_TILES e deslocadas por contOff(6))
  P(px, py) { return { fx: px * AUREVIA.sc / WORLD_TILES, fy: py * AUREVIA.sc / WORLD_TILES }; }
};

const AUREVIA_REGIONS = [
  Object.assign({ id: 'rosalba', name: 'Coroa Imperial de Rosálba', short: 'Rosálba', race: 'aur_imperial', biome: 'plains', lvl: [28, 38], mount: 0, culture: 'rosa', cont: 6, isolated: true,
    ruler: { title: 'Imperador', name: 'Leandro IV Coração-de-Leão', race: 'aur_imperial' }, towns: 6, villages: 10, dungeons: 12, color: '#c8202a', imperio: true,
    desc: 'O coração do Sacro Império da Rosa Branca: cidades de pedra clara com telhados vermelhos, catedrais, a bandeira da rosa em cada torre e a Guarda Imperial em todas as portas. O Imperador Leão governa daqui todas as ordens de cavaleiros.' }, Aurevia.P(560, 95)),
  Object.assign({ id: 'cruzada', name: 'Marca dos Cruzados', short: 'Cruzados', race: 'aur_cruzado', biome: 'plains', lvl: [28, 38], mount: 0, culture: 'rosa_cruz', cont: 6, isolated: true,
    ruler: { title: 'Grão-Mestre', name: 'Godofredo da Cruz Branca', race: 'aur_cruzado' }, towns: 5, villages: 9, dungeons: 12, color: '#a01a1a', imperio: true,
    desc: 'A fronteira do império com o Deserto de Âmbar. Os Cruzados da Rosa, de tabardo vermelho com a cruz branca, elmo fechado e alabarda, vigiam fortes e estradas contra os monstros da areia.' }, Aurevia.P(425, 240)),
  Object.assign({ id: 'solnegro', name: 'Bastião do Sol Negro', short: 'Sol Negro', race: 'aur_negro', biome: 'volcanic', lvl: [32, 42], mount: 0.05, culture: 'solnegro', cont: 6, isolated: true,
    ruler: { title: 'Grão-Senhor', name: 'Malkor Chifre-Negro', race: 'aur_negro' }, towns: 3, villages: 5, dungeons: 12, color: '#2a2228', imperio: true,
    desc: 'A terra negra dos vulcões. Aqui vive a Ordem do Sol Negro: cavaleiros de armadura negra e dourada, elmo de chifres e fitas vermelhas, os guerreiros mais temidos do império.' }, Aurevia.P(100, 285)),
  Object.assign({ id: 'argentea', name: 'Marca de Prata', short: 'Prata', race: 'aur_prata', biome: 'forest', lvl: [28, 38], mount: 0, culture: 'rosa_prata', cont: 6, isolated: true,
    ruler: { title: 'Duquesa', name: 'Isolda Pluma-Rubra', race: 'aur_prata' }, towns: 5, villages: 9, dungeons: 12, color: '#c8ccd8', imperio: true,
    desc: 'O continente do noroeste: florestas fundas, campos e, ao norte, os Picos Brancos. Os Cavaleiros de Prata usam armadura polida, pluma vermelha e um saiote branco com faixas vermelhas.' }, Aurevia.P(190, 150)),
  Object.assign({ id: 'solaria', name: 'Província de Solária', short: 'Solária', race: 'aur_legiao', biome: 'desert', lvl: [28, 38], mount: 0, culture: 'solaria', cont: 6, isolated: true,
    ruler: { title: 'Legada', name: 'Aurélia Crista-Rubra', race: 'aur_legiao' }, towns: 5, villages: 7, dungeons: 12, color: '#e0a020', imperio: true,
    desc: 'O deserto dourado do sudoeste. A Legião Escarlate guarda os oásis: elmos de crista vermelha, peitoral de prata e ouro, capa vermelha e gládio. A Legada Aurélia aponta e a legião marcha.' }, Aurevia.P(140, 395)),
  Object.assign({ id: 'campos', name: 'Campos Dourados', short: 'Campos', race: 'aur_imperial', biome: 'plains', lvl: [26, 36], mount: -0.02, culture: 'rosa', cont: 6, isolated: true,
    ruler: { title: 'Barão', name: 'Ulrico Trigo-de-Ouro', race: 'aur_imperial' }, towns: 4, villages: 10, dungeons: 10, color: '#c0a040', imperio: true,
    desc: 'O celeiro do império: trigais sem fim, moinhos e aldeias de pedra. Todas as ordens mandam cavaleiros para cá na época da colheita.' }, Aurevia.P(330, 400)),
  Object.assign({ id: 'azurmar', name: 'Costa de Azurmar', short: 'Azurmar', race: 'aur_azul', biome: 'plains', lvl: [28, 38], mount: 0, culture: 'rosa_azul', cont: 6, isolated: true,
    ruler: { title: 'Conde', name: 'Bertrand Maré-Azul', race: 'aur_azul' }, towns: 5, villages: 8, dungeons: 12, color: '#2a4aa0', imperio: true,
    desc: 'A grande península do sudeste, de portos e faróis. A Guarda Azul, alabardeiros de túnica azul e peitoral de aço, protege os mercadores do império.' }, Aurevia.P(655, 385)),
  Object.assign({ id: 'santarosa', name: 'Ilha de Santa Rosa', short: 'Santa Rosa', race: 'aur_cruzado', biome: 'forest', lvl: [26, 36], mount: 0, culture: 'rosa_cruz', cont: 6, isolated: true,
    ruler: { title: 'Abadessa', name: 'Rosamunda dos Sete Sinos', race: 'aur_cruzado' }, towns: 1, villages: 3, dungeons: 6, color: '#f0ece0', imperio: true,
    desc: 'A ilha santa no meio do mar de dentro, onde nasceu a primeira rosa branca. Mosteiros, sinos e peregrinos de todo o império.' }, Aurevia.P(285, 255)),
  Object.assign({ id: 'deserto_ambar', name: 'Deserto de Âmbar', short: 'Âmbar', race: null, biome: 'desert', lvl: [32, 44], mount: 0.04, culture: 'fort', cont: 6, isolated: true,
    ruler: null, towns: 0, villages: 0, dungeons: 16, color: '#e0b050', hostile: true,
    desc: 'O deserto sem fim no meio do continente, cortado pela Cordilheira Rubra. Vermes de areia, escorpiões gigantes e cavaleiros renegados que trocaram a rosa pelo ouro.' }, Aurevia.P(575, 215)),
  Object.assign({ id: 'uivos', name: 'Mata dos Uivos', short: 'Uivos', race: null, biome: 'forest', lvl: [30, 40], mount: 0, culture: 'fort', cont: 6, isolated: true,
    ruler: null, towns: 0, villages: 0, dungeons: 12, color: '#3a6a3a', hostile: true,
    desc: 'As florestas do nordeste, escuras e frias. Lobos do tamanho de cavalos, ursos e coisas piores. Nem as ordens entram aqui sem necessidade.' }, Aurevia.P(675, 120)),
  Object.assign({ id: 'picos_brancos', name: 'Picos Brancos', short: 'Picos', race: null, biome: 'snow', lvl: [32, 42], mount: 0.1, culture: 'fort', cont: 6, isolated: true,
    ruler: null, towns: 0, villages: 0, dungeons: 10, color: '#e8eef4', hostile: true,
    desc: 'As montanhas geladas do noroeste. Yetis, trolls do gelo e o vento que congela o sangue.' }, Aurevia.P(70, 60)),
  Object.assign({ id: 'ilha_rubra', name: 'Ilha Rubra', short: 'Ilha Rubra', race: null, biome: 'volcanic', lvl: [34, 44], mount: 0.1, culture: 'fort', cont: 6, isolated: true,
    ruler: null, towns: 0, villages: 0, dungeons: 8, color: '#c03a1a', hostile: true,
    desc: 'Uma ilha de rocha vermelha e fogo no mar do norte. Ninguém mora lá. Os marinheiros juram que viram um dragão.' }, Aurevia.P(330, 130))
];
REGIONS.push(...AUREVIA_REGIONS);
AUREVIA_REGIONS.forEach(r => { r.index = REGIONS.indexOf(r); REGION_BY_ID[r.id] = r; });
CONTINENTS.push('Aurévia');

// ---------- povos: todos humanos do império; cada ordem tem a sua armadura ----------
const AUR_RACAS = { aur_imperial: 'Guarda Imperial', aur_cruzado: 'Cruzados da Rosa', aur_negro: 'Ordem do Sol Negro', aur_prata: 'Cavaleiros de Prata', aur_legiao: 'Legião Escarlate', aur_azul: 'Guarda Azul' };
for (const id in AUR_RACAS) {
  RACES[id] = { name: 'Aureviano', desc: 'O povo do Sacro Império da Rosa Branca. A ordem desta terra: ' + AUR_RACAS[id] + '.', npcOnly: true, sheet: true, skins: ['#e8c0a0'], hairs: ['#6a4a2a'], mods: {} };
  NAMES[id] = {
    m: ['Leandro', 'Godofredo', 'Bertrand', 'Ulrico', 'Tristão', 'Percival', 'Lancelim', 'Galvão', 'Reinaldo', 'Teobaldo', 'Amadeu', 'Rodrigo', 'Afonso', 'Henrique', 'Baltasar', 'Gerardo', 'Otão', 'Sancho', 'Vicente', 'Malkor'],
    f: ['Isolda', 'Aurélia', 'Rosamunda', 'Leonor', 'Matilde', 'Brunilde', 'Constança', 'Beatriz', 'Urraca', 'Elvira', 'Branca', 'Guiomar', 'Inês', 'Violante', 'Sancha', 'Ermesinda'],
    s: ['da Rosa', 'Coração-de-Leão', 'da Cruz Branca', 'Chifre-Negro', 'Pluma-Rubra', 'Crista-Rubra', 'Maré-Azul', 'de Rosálba', 'Trigo-de-Ouro', 'do Sol Negro', 'de Prata', 'Escudo-Firme', 'dos Sete Sinos', 'Lança-Longa', 'de Azurmar', 'Elmo-Fechado']
  };
}

// ---------- cidades ----------
SETTLEMENT_NAMES.rosalba = { cap: 'Rosálba, a Cidade Imperial', list: ['Torre da Rosa', 'Vila Leonina', 'Sete Pontes', 'Ponte do Rei', 'Catedral Alta', 'Vale das Bandeiras', 'Coroa Velha', 'São Leandro', 'Campo do Torneio', 'Fonte dos Lírios', 'Vila Escudeira', 'Pedra Branca', 'Muralha Nova', 'Portão de Ouro', 'Santa Clara da Rosa', 'Vila do Arauto'] };
SETTLEMENT_NAMES.cruzada = { cap: 'Fortaleza da Cruz Branca', list: ['Forte Vigília', 'Cruz do Deserto', 'Vila Peregrina', 'Torre da Alabarda', 'São Jorge da Areia', 'Comenda Velha', 'Poço dos Cruzados', 'Vila do Juramento', 'Ermida Vermelha', 'Bastião do Âmbar', 'Capela do Escudo', 'Forte da Aurora', 'Vila Tabardo', 'Porta da Fé'] };
SETTLEMENT_NAMES.solnegro = { cap: 'Cidadela do Sol Negro', list: ['Forja Chifruda', 'Torre Cinzenta', 'Vila das Brasas', 'Forte Obsidiano', 'Rocha Negra', 'Vila Fita-Rubra', 'Portão de Cinza', 'Bastião Escuro'] };
SETTLEMENT_NAMES.argentea = { cap: 'Argêntea dos Duques', list: ['Pluma Rubra', 'Vila Prateada', 'Bosque do Elmo', 'Torre Branca', 'Lago Espelho', 'Vila dos Pinheiros', 'Forte do Norte', 'Campo da Neve', 'Moinho de Prata', 'São Tristão', 'Vila do Escudo Claro', 'Porto da Prata', 'Vila Lírio-Branco', 'Bosque Alto'] };
SETTLEMENT_NAMES.solaria = { cap: 'Castra Solária', list: ['Oásis da Legião', 'Vila Gládio', 'Castra Áurea', 'Poço da Crista', 'Torre do Sol', 'Vila Centúria', 'Duna Rubra', 'Arco do Triunfo', 'Fonte da Legada', 'Vila Estandarte', 'Castra do Sul', 'Aqueduto Velho'] };
SETTLEMENT_NAMES.campos = { cap: 'Celeiro do Império', list: ['Moinho Grande', 'Vila Trigal', 'Sete Moinhos', 'Vila da Colheita', 'Espiga de Ouro', 'Vila do Arado', 'Ponte do Celeiro', 'Campo Largo', 'Vila Feno', 'Santa Ceres', 'Vila das Papoulas', 'Granja Real', 'Vila Cevada', 'Pomar do Rei'] };
SETTLEMENT_NAMES.azurmar = { cap: 'Azurmar dos Faróis', list: ['Farol Alto', 'Porto Anil', 'Vila Maré', 'Enseada Azul', 'Vila das Velas', 'Cabo da Rosa', 'Vila Gaivota', 'Torre do Mar', 'Baía dos Mercadores', 'Vila Âncora', 'Porto Safira', 'Vila Coral', 'Cais do Conde'] };
SETTLEMENT_NAMES.santarosa = { cap: 'Mosteiro da Rosa Primeira', list: ['Vila dos Sete Sinos', 'Ermida do Mar', 'Vila Peregrina da Ilha', 'Claustro Branco'] };

// ---------- estilos das cidades ----------
CULTURES.rosa = { plaza: T.COBBLE, street: T.COBBLE, wall: T.WALL, walls: ['capital', 'town'], houseWall: 'timber', roof: ['#b0282a', '#9a2a24', '#c03a2a', '#8a2a2a'], wallC: '#f0e8d8', race: 'aur_imperial', guard: true, flowers: true, imperio: true };
CULTURES.solnegro = { plaza: T.DCOBBLE, street: T.DCOBBLE, wall: T.WALL, walls: ['capital', 'town', 'village'], houseWall: 'stone', roof: ['#2a2228', '#3a1a1a', '#5a1a1a'], wallC: '#4a4048', race: 'aur_negro', guard: true, imperio: true };
CULTURES.solaria = { plaza: T.SANDSTONE, street: T.SANDSTONE, wall: T.WALL, walls: ['capital', 'town'], houseWall: 'adobe', roof: ['#c03a2a', '#e8e0d0', '#b0282a'], wallC: '#e8d8b0', race: 'aur_legiao', guard: true, domes: true, imperio: true };
// cada província tem a sua ordem de guardas: a mesma cidade de pedra e telhado vermelho, outro povo nas ruas
CULTURES.rosa_cruz = Object.assign({}, CULTURES.rosa, { race: 'aur_cruzado' });
CULTURES.rosa_prata = Object.assign({}, CULTURES.rosa, { race: 'aur_prata', roof: ['#5a6070', '#4a5060', '#b0282a'] });
CULTURES.rosa_azul = Object.assign({}, CULTURES.rosa, { race: 'aur_azul', roof: ['#2a4a8a', '#3a5a9a', '#b0282a'] });
Object.assign(BIOME_GROUND, { rubra: T.BADLAND });

// ---------- inimigos ----------
Object.assign(ENEMIES, {
  cavaleiro_renegado: { name: 'Cavaleiro Renegado', look: { k: 'hum', skin: '#e0b090', body: '#3a3a40', legs: '#2a2a30', hair: '#3a2a1a', helm: '#4a4a52', helmStyle: 'full', chestplate: true, tabard: '#5a4a3a', weapon: 'sword', wc: '#b0b0b8', shield: '#4a3a2a' }, hp: 180, dmg: 26, spd: 60, ai: 'melee', xp: 80, armor: 20, gold: [30, 90], dropGear: 0.25 },
  besteiro_renegado: { name: 'Besteiro Renegado', look: { k: 'hum', skin: '#e0b090', body: '#4a3a2a', legs: '#2a2a30', hair: '#3a2a1a', helm: '#5a5a62', helmStyle: 'kettle', weapon: 'bow', wc: '#6a4a2a' }, hp: 120, dmg: 22, spd: 60, ai: 'ranged', proj: 'arrow', xp: 64, gold: [20, 60], dropGear: 0.15 },
  verme_areia: { name: 'Verme de Areia', look: { k: 'lizard', c: '#c8a060', size: 1.7 }, hp: 420, dmg: 32, spd: 52, ai: 'charge', charge: true, xp: 160, r: 11, armor: 15, drops: [['presa', 0.8], ['escama_lagarto', 0.8]] },
  escorpiao_ambar: { name: 'Escorpião de Âmbar', look: { k: 'spider', c: '#d08a20' }, hp: 160, dmg: 24, spd: 64, ai: 'melee', xp: 70, poison: 7, drops: [['veneno', 0.6]] },
  lobo_uivos: { name: 'Lobo dos Uivos', look: { k: 'wolf', c: '#4a4a52', size: 1.35 }, hp: 170, dmg: 26, spd: 92, ai: 'charge', xp: 72, aggro: 140, r: 7, drops: [['couro', 0.9], ['presa', 0.6]], animal: true },
  urso_negro: { name: 'Urso-Negro Gigante', look: { k: 'bear', c: '#1e1a1a', size: 1.4 }, hp: 380, dmg: 34, spd: 60, ai: 'charge', xp: 120, r: 10, armor: 10, drops: [['couro', 1], ['carne_crua', 1], ['presa', 0.6]], animal: true },
  carneiro_dourado: { name: 'Carneiro Dourado', look: { k: 'deer', c: '#d8c080' }, hp: 40, dmg: 0, spd: 84, ai: 'flee', xp: 8, r: 6, drops: [['carne_crua', 1], ['couro', 0.6]], animal: true, passive: true },
  cervo_real: { name: 'Cervo Real', look: { k: 'deer', c: '#8a5a30' }, hp: 34, dmg: 0, spd: 92, ai: 'flee', xp: 7, r: 6, drops: [['carne_crua', 1], ['couro', 0.7]], animal: true, passive: true },
  grifo: { name: 'Grifo', look: { k: 'dragon', c: '#c09040', heads: 1, size: 0.75 }, hp: 520, dmg: 34, spd: 80, ai: 'charge', charge: true, fly: true, xp: 220, r: 10, drops: [['presa', 0.8], ['couro', 0.8]] },
  cavaleiro_caido: { name: 'Cavaleiro Caído do Sol Negro', look: { k: 'hum', skin: '#c0b0a0', body: '#1a1a1e', legs: '#141418', hair: '#1a1a1a', helm: '#1e1e22', helmStyle: 'full', helmHorns: true, chestplate: true, tabard: '#7a1a1a', cape: '#5a1010', weapon: 'great', wc: '#9a1a1a', eyes: '#ff3020', size: 1.25, bulky: true }, hp: 2400, dmg: 46, spd: 58, ai: 'boss', xp: 1300, boss: true, r: 11, armor: 45, dropGear: 1, gold: [500, 1000] },
  verme_rei: { name: 'Verme-Rei de Âmbar', look: { k: 'lizard', c: '#e0a040', size: 2.6 }, hp: 3000, dmg: 50, spd: 46, ai: 'boss', xp: 1400, boss: true, r: 16, armor: 30, dropGear: 1, gold: [500, 1000] },
  dragao_rubro: { name: 'Dragão Rubro', look: { k: 'dragon', c: '#a01a10', heads: 1, size: 1.5 }, hp: 3600, dmg: 54, spd: 62, ai: 'boss', proj: 'fireball', elem: 'fire', fly: true, xp: 1800, boss: true, r: 16, armor: 40, dropGear: 1, gold: [800, 1500] }
});
Object.assign(SPAWNS, {
  rosalba: { day: [['cervo_real', 3], ['coelho', 3], ['carneiro_dourado', 2], ['cavaleiro_renegado', 0.6]], night: [['lobo', 2], ['cavaleiro_renegado', 1], ['espectro', 1]] },
  cruzada: { day: [['carneiro_dourado', 3], ['cervo_real', 2], ['escorpiao_ambar', 1], ['cavaleiro_renegado', 1]], night: [['escorpiao_ambar', 2], ['cavaleiro_renegado', 1.5], ['besteiro_renegado', 1], ['lobo', 1]] },
  solnegro: { day: [['salamandra', 2], ['slime_fogo', 2], ['cavaleiro_renegado', 1]], night: [['elemental_fogo', 1.5], ['salamandra', 2], ['espectro', 1.5]] },
  argentea: { day: [['cervo_real', 3], ['javali', 2], ['urso', 1], ['lobo', 1.5]], night: [['lobo', 2.5], ['urso', 1.5], ['espectro', 1], ['cavaleiro_renegado', 0.8]] },
  solaria: { day: [['escorpiao', 2], ['escorpiao_ambar', 1], ['lagarto', 2], ['carneiro_dourado', 2]], night: [['escorpiao_ambar', 2], ['mumia', 1], ['besteiro_renegado', 1]] },
  campos: { day: [['coelho', 4], ['carneiro_dourado', 3], ['cervo_real', 2], ['javali', 1.5]], night: [['lobo', 2], ['javali', 1.5], ['cavaleiro_renegado', 0.8]] },
  azurmar: { day: [['coelho', 3], ['cervo_real', 2], ['javali', 1.5], ['bandido', 0.6]], night: [['lobo', 1.5], ['bandido', 1], ['espectro', 1]] },
  santarosa: { day: [['coelho', 3], ['cervo_real', 2]], night: [['espectro', 1], ['lobo', 0.8]] },
  deserto_ambar: { day: [['escorpiao_ambar', 3], ['verme_areia', 1], ['cavaleiro_renegado', 1.5], ['besteiro_renegado', 1]], night: [['escorpiao_ambar', 3], ['verme_areia', 1.5], ['mumia', 1.5], ['cavaleiro_renegado', 1.5]] },
  uivos: { day: [['lobo_uivos', 3], ['urso_negro', 1], ['cervo_real', 2], ['grifo', 0.3]], night: [['lobo_uivos', 4], ['urso_negro', 1.5], ['espectro', 1.5]] },
  picos_brancos: { day: [['lobo_gelo', 3], ['yeti', 1.5], ['urso_polar', 1]], night: [['lobo_gelo', 3], ['troll_gelo', 1.5], ['yeti', 1.5]] },
  ilha_rubra: { day: [['salamandra', 3], ['elemental_fogo', 1.5], ['grifo', 0.6]], night: [['elemental_fogo', 2.5], ['slime_fogo', 2], ['grifo', 0.6]] }
});
Object.assign(DUNGEON_TYPES, {
  catacumba_rosa: { name: 'Catacumba da Rosa', gen: 'rooms', floor: T.DFLOOR || T.RFLOOR, wall: T.DWALL || T.RWALL, ent: O.ENT_CRYPT || O.ENT_RUIN, mobs: ['esqueleto', 'espectro', 'cavaleiro_morto', 'esqueleto_arqueiro'], boss: 'cavaleiro_caido', deco: [O.PILLAR, O.COBWEB, O.BONES, O.TORCH] },
  forte_renegado: { name: 'Forte dos Renegados', gen: 'rooms', floor: T.RFLOOR, wall: T.RWALL, ent: O.ENT_RUIN, mobs: ['cavaleiro_renegado', 'besteiro_renegado', 'cavaleiro_renegado'], boss: 'bandido_chefe', deco: [O.BARREL, O.CRATE, O.TORCH, O.PILLAR] },
  toca_verme: { name: 'Toca do Verme', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['escorpiao_ambar', 'verme_areia', 'escorpiao'], boss: 'verme_rei', deco: [O.BONES, O.ROCK] },
  ninho_dragao: { name: 'Ninho do Dragão Rubro', gen: 'cave', floor: T.CFLOOR, wall: T.CWALL, ent: O.ENT_CAVE, mobs: ['salamandra', 'elemental_fogo', 'slime_fogo'], boss: 'dragao_rubro', deco: [O.BONES, O.ROCK] }
});
Object.assign(REGION_DUNGEONS, {
  rosalba: ['catacumba_rosa', 'cripta', 'caverna', 'forte_renegado'],
  cruzada: ['forte_renegado', 'catacumba_rosa', 'tumba_deserto', 'caverna'],
  solnegro: ['caverna_lava', 'catacumba_rosa', 'forte_renegado'],
  argentea: ['caverna', 'cripta', 'catacumba_rosa', 'covil_bandido'],
  solaria: ['tumba_deserto', 'tumba_deserto', 'forte_renegado'],
  campos: ['caverna', 'covil_bandido', 'cripta'],
  azurmar: ['ruina_afundada', 'caverna', 'covil_bandido', 'catacumba_rosa'],
  santarosa: ['catacumba_rosa', 'cripta'],
  deserto_ambar: ['toca_verme', 'toca_verme', 'tumba_deserto', 'forte_renegado'],
  uivos: ['caverna', 'covil_bandido', 'cripta'],
  picos_brancos: ['caverna_gelo', 'caverna_gelo', 'tumulo_nordico'],
  ilha_rubra: ['ninho_dragao', 'caverna_lava', 'caverna_lava']
});
Object.assign(RUMORS, {
  rosalba: ['O Imperador Leandro carrega a espada do primeiro imperador nas costas, e nunca a perdeu num torneio.', 'A rosa branca da bandeira é a rosa que nasceu na Ilha de Santa Rosa. O sol negro em volta dela é o juramento das ordens.', 'Em Rosálba toda torre tem a bandeira do império. Contar as bandeiras é contar as torres.', 'A Guarda Imperial escolhe um cavaleiro de cada ordem. É a maior honra do império.'],
  cruzada: ['O Grão-Mestre Godofredo jurou não tirar o elmo até o último renegado cair.', 'As alabardas dos cruzados têm uma lâmina curva e um espeto: uma para o cavalo, outra para o cavaleiro.', 'No Deserto de Âmbar há vermes que engolem um cavalo inteiro.'],
  solnegro: ['Os cavaleiros do Sol Negro amarram fitas vermelhas nos chifres do elmo: uma para cada inimigo vencido.', 'Dizem que um deles caiu em desgraça e ainda vaga numa catacumba, de olhos vermelhos.', 'A terra aqui é negra de cinza. Mesmo assim, a cidadela nunca caiu.'],
  argentea: ['A Duquesa Isolda poliu a própria armadura até virar espelho.', 'Nos Picos Brancos o frio mata mais que qualquer espada.', 'A pluma vermelha dos Cavaleiros de Prata é tingida com a flor da papoula.'],
  solaria: ['A Legada Aurélia comanda a legião só com o dedo. Quando ela aponta, ninguém pergunta.', 'Cada castra tem um aqueduto. Sem água, nem a legião aguenta o deserto.', 'Os elmos da Legião Escarlate têm crista vermelha para que se vejam no meio da areia.'],
  campos: ['Na colheita, até cavaleiro pega na foice.', 'O pão de Rosálba é feito com o trigo daqui.', 'Os moinhos param quando a bandeira do império desce. Nunca aconteceu.'],
  azurmar: ['A Guarda Azul usa alabarda porque pirata não chega perto de uma.', 'Os faróis de Azurmar se veem de tão longe que guiam navios de outros continentes.', 'O Conde Bertrand nasceu num navio e diz que vai morrer num.'],
  santarosa: ['A primeira rosa branca nasceu aqui, no meio de um campo de cinzas.', 'Os sete sinos do mosteiro tocam juntos só quando morre um imperador.'],
  deserto_ambar: ['Os renegados trocaram a rosa pelo ouro. Agora assaltam as caravanas.', 'A Cordilheira Rubra é vermelha porque o deserto sangrou nela, dizem os velhos.'],
  uivos: ['Os uivos à noite não são de lobos comuns. São grandes como cavalos.'],
  picos_brancos: ['Um yeti carregou um cavaleiro inteiro, com armadura e tudo.'],
  ilha_rubra: ['Ninguém volta da Ilha Rubra. Ninguém.']
});
