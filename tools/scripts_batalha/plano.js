// Planta do posto avançado romano (castellum de madeira), 15 x 15 blocos.
// Sem dependências do Minecraft: o mesmo arquivo roda no jogo e no Node (testes).
//
// Coordenadas locais: lx e lz de 0 a 14; o portão fica no lado lz = 0.
// Cada bloco tem dy = altura acima do chão daquela coluna (o forte acompanha o terreno).
//
//   Muralha de estacas pontudas (troncos alternando com troncos descascados)
//   Adarve: passarela de tábuas por dentro do muro, com escadas
//   Portão com guarita: duas torres e uma ponte coberta por cima da passagem
//   Torres de vigia nos dois cantos do fundo, com telhado e bandeira
//   Dentro: tenda do comandante (principia), tendas dos soldados,
//   estandarte com a águia, fogueira e depósito de suprimentos

export const TAM = 15;
const MEIO = 7;
const ULT = TAM - 1;

const TORA = 'minecraft:spruce_log';
const TORA_CLARA = 'minecraft:stripped_spruce_log';
const TABUA = 'minecraft:spruce_planks';
const LAJE = 'minecraft:spruce_slab';
const CERCA = 'minecraft:spruce_fence';

const FASE = { muro: 0, torres: 1, portao: 2, adarve: 3, telhados: 4, acampamento: 5 };
const DENTRO = new Set([FASE.adarve, FASE.acampamento]);

// torres: [x0, z0] do canto de cada torre 3 x 3
const TORRES_PORTAO = [[3, 0], [9, 0]];
const TORRES_CANTO = [[0, 12], [12, 12]];
const TORRES = [...TORRES_PORTAO, ...TORRES_CANTO];
const naTorre = (lx, lz) => TORRES.some(([x, z]) => lx >= x && lx <= x + 2 && lz >= z && lz <= z + 2);
const noPortao = (lx, lz) => lz <= 1 && lx >= 6 && lx <= 8;  // passagem entre as torres

export function planoPosto() {
  const mapa = new Map();  // evita dois blocos no mesmo lugar (o último vence)
  const add = (lx, lz, dy, bloco, fase) =>
    mapa.set(`${lx},${lz},${dy}`, { lx, lz, dy, bloco, fase, dentro: DENTRO.has(fase) });

  // ---- muralha: 4 de estacas + ponta (tronco ou cerca alternados)
  for (let lx = 0; lx < TAM; lx++) {
    for (let lz = 0; lz < TAM; lz++) {
      const borda = lx === 0 || lz === 0 || lx === ULT || lz === ULT;
      if (!borda || naTorre(lx, lz) || noPortao(lx, lz)) continue;
      const estaca = (lx + lz) % 2 ? TORA : TORA_CLARA;
      for (let dy = 0; dy < 4; dy++) add(lx, lz, dy, estaca, FASE.muro);
      add(lx, lz, 4, (lx + lz) % 2 ? estaca : CERCA, FASE.muro);
    }
  }

  // ---- torres 3 x 3: postes nos cantos, paredes de tábua com seteiras, piso e parapeito
  for (const [x0, z0] of TORRES) {
    const portao = z0 === 0;
    const alturaPiso = portao ? 5 : 6;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const lx = x0 + i, lz = z0 + j;
        const canto = (i !== 1) && (j !== 1);
        const centro = i === 1 && j === 1;
        for (let dy = 0; dy < alturaPiso; dy++) {
          if (canto) add(lx, lz, dy, TORA, FASE.torres);
          else if (!centro) {
            const seteira = dy === alturaPiso - 2;  // janelinha para os arqueiros
            if (!seteira) add(lx, lz, dy, TABUA, FASE.torres);
          }
        }
        add(lx, lz, alturaPiso, TABUA, FASE.torres);                  // piso
        if (canto) {
          for (let dy = alturaPiso + 1; dy <= alturaPiso + 3; dy++) add(lx, lz, dy, TORA, FASE.torres);
        } else if (!centro) {
          add(lx, lz, alturaPiso + 1, CERCA, FASE.torres);              // parapeito
        }
      }
    }
    // telhado de tábuas com beiral e laje por cima; mastro com bandeira vermelha
    const yt = alturaPiso + 4;
    for (let i = -1; i <= 3; i++) for (let j = -1; j <= 3; j++) add(x0 + i, z0 + j, yt, TABUA, FASE.telhados);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) add(x0 + i, z0 + j, yt + 1, LAJE, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 1, TABUA, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 2, CERCA, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 3, CERCA, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 4, 'minecraft:red_wool', FASE.telhados);
    add(x0 + 2, z0 + 1, yt + 4, 'minecraft:red_wool', FASE.telhados);
    add(x0 + 2, z0 + 1, yt + 3, 'minecraft:red_wool', FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 5, 'minecraft:gold_block', FASE.telhados);
    // tochas nos cantos do parapeito
    add(x0 + 1, z0, alturaPiso + 2, 'minecraft:torch', FASE.telhados);
    add(x0 + 1, z0 + 2, alturaPiso + 2, 'minecraft:torch', FASE.telhados);
  }

  // ---- portão: passagem de 3 x 3 entre as torres, com verga de troncos e
  //      ponte por cima ligando as duas torres, com parapeito e lanternas
  for (let lx = 6; lx <= 8; lx++) {
    for (let lz = 0; lz <= 1; lz++) {
      add(lx, lz, 3, TORA, FASE.portao);
      add(lx, lz, 4, TABUA, FASE.portao);
    }
    add(lx, 0, 5, CERCA, FASE.portao);
  }
  add(6, 0, 6, 'minecraft:lantern', FASE.portao);
  add(8, 0, 6, 'minecraft:lantern', FASE.portao);

  // ---- adarve: passarela de tábuas atrás do muro, com postes de apoio, e escadas
  for (let lx = 1; lx < ULT; lx++) {
    for (let lz = 1; lz < ULT; lz++) {
      const anel = lx === 1 || lz === 1 || lx === ULT - 1 || lz === ULT - 1;
      if (!anel || naTorre(lx, lz)) continue;
      if (lz <= 2 && lx >= 6 && lx <= 8) continue;  // atrás do portão a passagem fica livre
      add(lx, lz, 2, TABUA, FASE.adarve);
      if ((lx + lz) % 3 === 0) { add(lx, lz, 0, TORA, FASE.adarve); add(lx, lz, 1, TORA, FASE.adarve); }
    }
  }
  // escadas de blocos para subir no adarve (uma de cada lado do portão)
  for (const [x, dx] of [[3, -1], [11, 1]]) {
    add(x, 3, 0, TABUA, FASE.adarve);
    add(x + dx, 3, 0, TABUA, FASE.adarve);
    add(x + dx, 3, 1, LAJE, FASE.adarve);
  }

  // ---- acampamento
  // tenda do comandante (principia): listras vermelhas e brancas, 5 de largura
  for (let lz = 8; lz <= 11; lz++) {
    const cor = lz % 2 ? 'minecraft:red_wool' : 'minecraft:white_wool';
    add(5, lz, 0, cor, FASE.acampamento); add(9, lz, 0, cor, FASE.acampamento);
    add(5, lz, 1, cor, FASE.acampamento); add(9, lz, 1, cor, FASE.acampamento);
    add(6, lz, 2, cor, FASE.acampamento); add(8, lz, 2, cor, FASE.acampamento);
    add(7, lz, 3, cor, FASE.acampamento);
    if (lz === 11) for (let x = 6; x <= 8; x++) for (let dy = 0; dy < 3; dy++) if (!(x !== 7 && dy === 2)) add(x, lz, dy, cor, FASE.acampamento);
  }
  // tendas dos soldados (couro)
  for (const x0 of [2, 10]) {
    for (let lz = 5; lz <= 7; lz++) {
      add(x0, lz, 0, 'minecraft:brown_wool', FASE.acampamento);
      add(x0 + 2, lz, 0, 'minecraft:brown_wool', FASE.acampamento);
      add(x0 + 1, lz, 1, 'minecraft:brown_wool', FASE.acampamento);
    }
  }
  // estandarte (aquila) na frente da principia e fogueira no centro
  for (let dy = 0; dy < 3; dy++) add(7, 6, dy, CERCA, FASE.acampamento);
  add(6, 6, 2, 'minecraft:red_wool', FASE.acampamento);
  add(7, 6, 3, 'minecraft:red_wool', FASE.acampamento);
  add(8, 6, 2, 'minecraft:red_wool', FASE.acampamento);
  add(7, 6, 4, 'minecraft:gold_block', FASE.acampamento);
  add(10, 10, 0, 'minecraft:campfire', FASE.acampamento);
  // depósito: barris, feno, bancada e bigorna
  add(2, 9, 0, 'minecraft:barrel', FASE.acampamento);
  add(2, 10, 0, 'minecraft:barrel', FASE.acampamento);
  add(2, 9, 1, 'minecraft:barrel', FASE.acampamento);
  add(12, 9, 0, 'minecraft:hay_block', FASE.acampamento);
  add(12, 10, 0, 'minecraft:hay_block', FASE.acampamento);
  add(12, 9, 1, 'minecraft:hay_block', FASE.acampamento);
  add(12, 7, 0, 'minecraft:crafting_table', FASE.acampamento);
  add(12, 8, 0, 'minecraft:anvil', FASE.acampamento);
  add(5, 4, 0, 'minecraft:lantern', FASE.acampamento);
  add(9, 4, 0, 'minecraft:lantern', FASE.acampamento);

  // ordem de obra: por fase, de baixo para cima, dando a volta
  const blocos = [...mapa.values()];
  const ang = (b) => Math.atan2(b.lz - MEIO, b.lx - MEIO);
  blocos.sort((a, b) => a.fase - b.fase || a.dy - b.dy || ang(a) - ang(b));
  return blocos;
}

// local -> deslocamento no mundo, com o portão virado para a direção "rot"
// rot 0: portão para -Z (norte), 1: +X (leste), 2: +Z (sul), 3: -X (oeste)
export function girar(lx, lz, rot) {
  const x = lx - MEIO, z = lz - MEIO;
  switch (rot) {
    case 1: return [-z, x];
    case 2: return [-x, -z];
    case 3: return [z, -x];
    default: return [x, z];
  }
}

// escolhe rot para o portão olhar na direção (dx, dz)
export function rotPara(dx, dz) {
  const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let melhor = 0, mv = -Infinity;
  dirs.forEach(([x, z], i) => {
    const v = x * dx + z * dz;
    if (v > mv) { mv = v; melhor = i; }
  });
  return melhor;
}
