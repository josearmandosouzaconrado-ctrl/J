// Planta do posto avançado romano (castellum de madeira), 15 x 25 blocos.
// Sem dependências do Minecraft: o mesmo arquivo roda no jogo e no Node (testes).
//
// Formato de "carta de baralho" dos acampamentos romanos, comprido para trás.
// Coordenadas locais: lx de 0 a 14 (largura), lz de 0 a 24 (comprimento);
// o portão principal fica no lado lz = 0 e o portão dos fundos em lz = 24.
// Cada bloco tem dy = altura acima do chão daquela coluna (o forte acompanha o terreno).
//
//   Muralha de estacas pontudas (troncos alternando com troncos descascados)
//   Portão principal com guarita (duas torres e ponte) e portão dos fundos
//   Torres no meio das muralhas compridas e nos cantos do fundo
//   Adarve: passarela por dentro do muro, com escadas na frente e no fundo
//   Rua central até a tenda do comandante (principia) com o estandarte
//   Fileiras de tendas dos soldados, celeiro (horreum), fogueiras e depósito

export const LARG = 15;
export const COMP = 25;
const MX = 7, MZ = 12;  // centro
const UX = LARG - 1, UZ = COMP - 1;

const TORA = 'minecraft:spruce_log';
const TORA_CLARA = 'minecraft:stripped_spruce_log';
const TABUA = 'minecraft:spruce_planks';
const LAJE = 'minecraft:spruce_slab';
const CERCA = 'minecraft:spruce_fence';

const FASE = { muro: 0, torres: 1, portao: 2, adarve: 3, telhados: 4, acampamento: 5 };
const DENTRO = new Set([FASE.adarve, FASE.acampamento]);

// torres 3 x 3: [x0, z0, altura do piso]
const TORRES = [
  [3, 0, 5], [9, 0, 5],          // guarita do portão principal
  [0, 11, 5], [12, 11, 5],       // meio das muralhas compridas
  [0, 22, 6], [12, 22, 6],       // cantos do fundo
];
const naTorre = (lx, lz) => TORRES.some(([x, z]) => lx >= x && lx <= x + 2 && lz >= z && lz <= z + 2);
const noPortao = (lx, lz) => lx >= 6 && lx <= 8 && (lz <= 1 || lz >= UZ - 1);

export function planoPosto() {
  const mapa = new Map();  // um bloco por posição (o último vence)
  const add = (lx, lz, dy, bloco, fase) =>
    mapa.set(`${lx},${lz},${dy}`, { lx, lz, dy, bloco, fase, dentro: DENTRO.has(fase) });

  // ---- muralha: 4 de estacas + ponta (tronco ou cerca alternados)
  for (let lx = 0; lx < LARG; lx++) {
    for (let lz = 0; lz < COMP; lz++) {
      const borda = lx === 0 || lz === 0 || lx === UX || lz === UZ;
      if (!borda || naTorre(lx, lz) || noPortao(lx, lz)) continue;
      const estaca = (lx + lz) % 2 ? TORA : TORA_CLARA;
      for (let dy = 0; dy < 4; dy++) add(lx, lz, dy, estaca, FASE.muro);
      add(lx, lz, 4, (lx + lz) % 2 ? estaca : CERCA, FASE.muro);
    }
  }

  // ---- torres: postes nos cantos, paredes de tábua com seteiras, piso, parapeito e telhado
  for (const [x0, z0, piso] of TORRES) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const lx = x0 + i, lz = z0 + j;
        const canto = i !== 1 && j !== 1;
        const centro = i === 1 && j === 1;
        for (let dy = 0; dy < piso; dy++) {
          if (canto) add(lx, lz, dy, TORA, FASE.torres);
          else if (!centro && dy !== piso - 2) add(lx, lz, dy, TABUA, FASE.torres);  // seteira
        }
        add(lx, lz, piso, TABUA, FASE.torres);
        if (canto) for (let dy = piso + 1; dy <= piso + 3; dy++) add(lx, lz, dy, TORA, FASE.torres);
        else if (!centro) add(lx, lz, piso + 1, CERCA, FASE.torres);
      }
    }
    const yt = piso + 4;
    for (let i = -1; i <= 3; i++) for (let j = -1; j <= 3; j++) add(x0 + i, z0 + j, yt, TABUA, FASE.telhados);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) add(x0 + i, z0 + j, yt + 1, LAJE, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 1, TABUA, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 2, CERCA, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 3, CERCA, FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 4, 'minecraft:red_wool', FASE.telhados);
    add(x0 + 2, z0 + 1, yt + 4, 'minecraft:red_wool', FASE.telhados);
    add(x0 + 2, z0 + 1, yt + 3, 'minecraft:red_wool', FASE.telhados);
    add(x0 + 1, z0 + 1, yt + 5, 'minecraft:gold_block', FASE.telhados);
    add(x0 + 1, z0, piso + 2, 'minecraft:torch', FASE.telhados);
    add(x0 + 1, z0 + 2, piso + 2, 'minecraft:torch', FASE.telhados);
  }

  // ---- portão principal: passagem 3 x 3 com verga e ponte entre as torres
  for (let lx = 6; lx <= 8; lx++) {
    for (let lz = 0; lz <= 1; lz++) {
      add(lx, lz, 3, TORA, FASE.portao);
      add(lx, lz, 4, TABUA, FASE.portao);
    }
    add(lx, 0, 5, CERCA, FASE.portao);
  }
  add(6, 0, 6, 'minecraft:lantern', FASE.portao);
  add(8, 0, 6, 'minecraft:lantern', FASE.portao);
  // portão dos fundos (porta decumana): verga dupla com pontas e lanternas
  for (let lx = 6; lx <= 8; lx++) {
    add(lx, UZ, 3, TORA, FASE.portao);
    add(lx, UZ, 4, lx === 7 ? TORA : CERCA, FASE.portao);
    add(lx, UZ - 1, 3, TORA, FASE.portao);
  }
  add(5, UZ, 5, 'minecraft:lantern', FASE.portao);
  add(9, UZ, 5, 'minecraft:lantern', FASE.portao);

  // ---- adarve: passarela de tábuas atrás do muro, com postes, e quatro escadas
  for (let lx = 1; lx < UX; lx++) {
    for (let lz = 1; lz < UZ; lz++) {
      const anel = lx === 1 || lz === 1 || lx === UX - 1 || lz === UZ - 1;
      if (!anel || naTorre(lx, lz)) continue;
      if (lx >= 6 && lx <= 8 && (lz <= 2 || lz >= UZ - 2)) continue;  // passagens dos portões livres
      add(lx, lz, 2, TABUA, FASE.adarve);
      if ((lx + lz) % 3 === 0) { add(lx, lz, 0, TORA, FASE.adarve); add(lx, lz, 1, TORA, FASE.adarve); }
    }
  }
  for (const z of [3, UZ - 3]) {
    for (const [x, dx] of [[3, -1], [11, 1]]) {
      add(x, z, 0, TABUA, FASE.adarve);
      add(x + dx, z, 0, TABUA, FASE.adarve);
      add(x + dx, z, 1, LAJE, FASE.adarve);
    }
  }

  // ---- acampamento
  const tenda = (x0, z0, cor) => {  // tenda de 3 x 3 em "A"
    for (let lz = z0; lz < z0 + 3; lz++) {
      add(x0, lz, 0, cor, FASE.acampamento);
      add(x0 + 2, lz, 0, cor, FASE.acampamento);
      add(x0 + 1, lz, 1, cor, FASE.acampamento);
    }
  };
  // fileiras de tendas dos soldados dos dois lados da rua
  for (const z0 of [5, 8, 15, 18]) {
    tenda(2, z0, 'minecraft:brown_wool');
    tenda(10, z0, 'minecraft:brown_wool');
  }
  // principia: tenda do comandante, listrada, no centro do forte
  for (let lz = 12; lz <= 15; lz++) {
    const cor = lz % 2 ? 'minecraft:red_wool' : 'minecraft:white_wool';
    for (const x of [5, 9]) { add(x, lz, 0, cor, FASE.acampamento); add(x, lz, 1, cor, FASE.acampamento); }
    add(6, lz, 2, cor, FASE.acampamento); add(8, lz, 2, cor, FASE.acampamento);
    add(7, lz, 3, cor, FASE.acampamento);
    if (lz === 15) for (let x = 6; x <= 8; x++) for (let dy = 0; dy < 3; dy++) if (!(x !== 7 && dy === 2)) add(x, lz, dy, cor, FASE.acampamento);
  }
  // estandarte (aquila) na frente da principia
  for (let dy = 0; dy < 3; dy++) add(7, 10, dy, CERCA, FASE.acampamento);
  add(6, 10, 2, 'minecraft:red_wool', FASE.acampamento);
  add(7, 10, 3, 'minecraft:red_wool', FASE.acampamento);
  add(8, 10, 2, 'minecraft:red_wool', FASE.acampamento);
  add(7, 10, 4, 'minecraft:gold_block', FASE.acampamento);
  // celeiro (horreum) no fundo: tábuas com postes, porta na frente e telhado de laje
  for (let lx = 5; lx <= 9; lx++) {
    for (let lz = 18; lz <= 21; lz++) {
      const parede = lx === 5 || lx === 9 || lz === 18 || lz === 21;
      if (!parede) continue;
      const canto = (lx === 5 || lx === 9) && (lz === 18 || lz === 21);
      const porta = lz === 18 && lx === 7;
      for (let dy = 0; dy < 3; dy++) {
        if (porta && dy < 2) continue;
        add(lx, lz, dy, canto ? TORA : TABUA, FASE.acampamento);
      }
    }
    for (let lz = 17; lz <= 22; lz++) add(lx, lz, 3, LAJE, FASE.acampamento);
  }
  for (const [x, z] of [[6, 19], [8, 19], [6, 20]]) add(x, z, 0, 'minecraft:hay_block', FASE.acampamento);
  add(8, 20, 0, 'minecraft:barrel', FASE.acampamento);
  // fogueiras, lanternas na rua e depósito de armas
  add(4, 12, 0, 'minecraft:campfire', FASE.acampamento);
  add(10, 12, 0, 'minecraft:campfire', FASE.acampamento);
  for (const z of [3, 7]) { add(5, z, 0, 'minecraft:lantern', FASE.acampamento); add(9, z, 0, 'minecraft:lantern', FASE.acampamento); }
  add(3, 13, 0, 'minecraft:barrel', FASE.acampamento);
  add(3, 14, 0, 'minecraft:barrel', FASE.acampamento);
  add(11, 13, 0, 'minecraft:crafting_table', FASE.acampamento);
  add(11, 14, 0, 'minecraft:anvil', FASE.acampamento);

  // ordem de obra: por fase, de baixo para cima, dando a volta
  const blocos = [...mapa.values()];
  const ang = (b) => Math.atan2(b.lz - MZ, b.lx - MX);
  blocos.sort((a, b) => a.fase - b.fase || a.dy - b.dy || ang(a) - ang(b));
  return blocos;
}

// local -> deslocamento no mundo, com o portão principal virado para "rot"
// rot 0: portão para -Z (norte), 1: +X (leste), 2: +Z (sul), 3: -X (oeste)
export function girar(lx, lz, rot) {
  const x = lx - MX, z = lz - MZ;
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
