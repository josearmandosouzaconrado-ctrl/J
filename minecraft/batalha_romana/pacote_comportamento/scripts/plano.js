// Plantas das construções romanas (sem dependências do Minecraft: rodam no jogo e no Node).
//
// Cada planta tem: larg x comp (lx de 0 a larg-1, lz de 0 a comp-1), o portão/frente no
// lado lz = 0, o centro (mx, mz), a lista de blocos em ordem de obra e os postos de guarda:
//   torres: [lx, lz, dy] onde um vigia fica parado
//   rondas: [[lx, lz, dy], [lx, lz, dy]] trechos da passarela onde um soldado anda de um lado
//           para o outro
// Cada bloco tem dy = altura acima do chão daquela coluna (acompanha o terreno).

const TORA = 'minecraft:spruce_log';
const TORA_CLARA = 'minecraft:stripped_spruce_log';
const TABUA = 'minecraft:spruce_planks';
const LAJE = 'minecraft:spruce_slab';
const CERCA = 'minecraft:spruce_fence';

const FASE = { muro: 0, torres: 1, portao: 2, adarve: 3, telhados: 4, acampamento: 5 };
const DENTRO = new Set([FASE.adarve, FASE.acampamento]);

function nova(larg, comp) {
  const mapa = new Map();
  const add = (lx, lz, dy, bloco, fase) =>
    mapa.set(`${lx},${lz},${dy}`, { lx, lz, dy, bloco, fase, dentro: DENTRO.has(fase) });
  const mx = (larg - 1) / 2, mz = (comp - 1) / 2;
  const fim = (extra) => {
    const blocos = [...mapa.values()];
    const ang = (b) => Math.atan2(b.lz - mz, b.lx - mx);
    blocos.sort((a, b) => a.fase - b.fase || a.dy - b.dy || ang(a) - ang(b));
    return { larg, comp, mx: Math.floor(mx), mz: Math.floor(mz), blocos, torres: [], rondas: [], ...extra };
  };
  return { add, fim };
}

// torre 3 x 3: postes nos cantos, paredes de tábua com seteiras, piso, parapeito,
// telhado com beiral e mastro com bandeira vermelha e ponta dourada
function torre(add, x0, z0, piso) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const lx = x0 + i, lz = z0 + j;
      const canto = i !== 1 && j !== 1;
      const centro = i === 1 && j === 1;
      for (let dy = 0; dy < piso; dy++) {
        if (canto) add(lx, lz, dy, TORA, FASE.torres);
        else if (!centro && dy !== piso - 2) add(lx, lz, dy, TABUA, FASE.torres);
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
  return [x0 + 1, z0 + 1, piso + 1];  // onde o vigia fica
}

function estaca(add, lx, lz) {
  const tipo = (lx + lz) % 2 ? TORA : TORA_CLARA;
  for (let dy = 0; dy < 4; dy++) add(lx, lz, dy, tipo, FASE.muro);
  add(lx, lz, 4, (lx + lz) % 2 ? tipo : CERCA, FASE.muro);
}

function tenda(add, x0, z0, cor) {
  for (let lz = z0; lz < z0 + 3; lz++) {
    add(x0, lz, 0, cor, FASE.acampamento);
    add(x0 + 2, lz, 0, cor, FASE.acampamento);
    add(x0 + 1, lz, 1, cor, FASE.acampamento);
  }
}

// =========================================================== FORTE (castellum) 15 x 25
function forte() {
  const LARG = 15, COMP = 25, UX = LARG - 1, UZ = COMP - 1;
  const { add, fim } = nova(LARG, COMP);
  const TORRES = [[3, 0, 5], [9, 0, 5], [0, 11, 5], [12, 11, 5], [0, 22, 6], [12, 22, 6]];
  const naTorre = (lx, lz) => TORRES.some(([x, z]) => lx >= x && lx <= x + 2 && lz >= z && lz <= z + 2);
  const noPortao = (lx, lz) => lx >= 6 && lx <= 8 && (lz <= 1 || lz >= UZ - 1);

  for (let lx = 0; lx < LARG; lx++)
    for (let lz = 0; lz < COMP; lz++) {
      const borda = lx === 0 || lz === 0 || lx === UX || lz === UZ;
      if (borda && !naTorre(lx, lz) && !noPortao(lx, lz)) estaca(add, lx, lz);
    }
  const vigias = TORRES.map(([x, z, p]) => torre(add, x, z, p));

  // portão principal: verga e ponte entre as torres; portão dos fundos
  for (let lx = 6; lx <= 8; lx++) {
    for (let lz = 0; lz <= 1; lz++) { add(lx, lz, 3, TORA, FASE.portao); add(lx, lz, 4, TABUA, FASE.portao); }
    add(lx, 0, 5, CERCA, FASE.portao);
    add(lx, UZ, 3, TORA, FASE.portao);
    add(lx, UZ, 4, lx === 7 ? TORA : CERCA, FASE.portao);
    add(lx, UZ - 1, 3, TORA, FASE.portao);
  }
  add(6, 0, 6, 'minecraft:lantern', FASE.portao);
  add(8, 0, 6, 'minecraft:lantern', FASE.portao);
  add(5, UZ, 5, 'minecraft:lantern', FASE.portao);
  add(9, UZ, 5, 'minecraft:lantern', FASE.portao);

  // adarve com postes e quatro escadas
  for (let lx = 1; lx < UX; lx++)
    for (let lz = 1; lz < UZ; lz++) {
      const anel = lx === 1 || lz === 1 || lx === UX - 1 || lz === UZ - 1;
      if (!anel || naTorre(lx, lz)) continue;
      if (lx >= 6 && lx <= 8 && (lz <= 2 || lz >= UZ - 2)) continue;
      add(lx, lz, 2, TABUA, FASE.adarve);
      if ((lx + lz) % 3 === 0) { add(lx, lz, 0, TORA, FASE.adarve); add(lx, lz, 1, TORA, FASE.adarve); }
    }
  for (const z of [3, UZ - 3])
    for (const [x, dx] of [[3, -1], [11, 1]]) {
      add(x, z, 0, TABUA, FASE.adarve);
      add(x + dx, z, 0, TABUA, FASE.adarve);
      add(x + dx, z, 1, LAJE, FASE.adarve);
    }

  // acampamento: tendas, principia, estandarte, celeiro, fogueiras e depósito
  for (const z0 of [5, 8, 15, 18]) { tenda(add, 2, z0, 'minecraft:brown_wool'); tenda(add, 10, z0, 'minecraft:brown_wool'); }
  for (let lz = 12; lz <= 15; lz++) {
    const cor = lz % 2 ? 'minecraft:red_wool' : 'minecraft:white_wool';
    for (const x of [5, 9]) { add(x, lz, 0, cor, FASE.acampamento); add(x, lz, 1, cor, FASE.acampamento); }
    add(6, lz, 2, cor, FASE.acampamento); add(8, lz, 2, cor, FASE.acampamento);
    add(7, lz, 3, cor, FASE.acampamento);
    if (lz === 15) for (let x = 6; x <= 8; x++) for (let dy = 0; dy < 3; dy++) if (!(x !== 7 && dy === 2)) add(x, lz, dy, cor, FASE.acampamento);
  }
  for (let dy = 0; dy < 3; dy++) add(7, 10, dy, CERCA, FASE.acampamento);
  add(6, 10, 2, 'minecraft:red_wool', FASE.acampamento);
  add(7, 10, 3, 'minecraft:red_wool', FASE.acampamento);
  add(8, 10, 2, 'minecraft:red_wool', FASE.acampamento);
  add(7, 10, 4, 'minecraft:gold_block', FASE.acampamento);
  for (let lx = 5; lx <= 9; lx++) {
    for (let lz = 18; lz <= 21; lz++) {
      if (!(lx === 5 || lx === 9 || lz === 18 || lz === 21)) continue;
      const canto = (lx === 5 || lx === 9) && (lz === 18 || lz === 21);
      for (let dy = 0; dy < 3; dy++) {
        if (lz === 18 && lx === 7 && dy < 2) continue;
        add(lx, lz, dy, canto ? TORA : TABUA, FASE.acampamento);
      }
    }
    for (let lz = 17; lz <= 22; lz++) add(lx, lz, 3, LAJE, FASE.acampamento);
  }
  for (const [x, z] of [[6, 19], [8, 19], [6, 20]]) add(x, z, 0, 'minecraft:hay_block', FASE.acampamento);
  add(8, 20, 0, 'minecraft:barrel', FASE.acampamento);
  add(4, 12, 0, 'minecraft:campfire', FASE.acampamento);
  add(10, 12, 0, 'minecraft:campfire', FASE.acampamento);
  for (const z of [3, 7]) { add(5, z, 0, 'minecraft:lantern', FASE.acampamento); add(9, z, 0, 'minecraft:lantern', FASE.acampamento); }
  add(3, 13, 0, 'minecraft:barrel', FASE.acampamento);
  add(3, 14, 0, 'minecraft:barrel', FASE.acampamento);
  add(11, 13, 0, 'minecraft:crafting_table', FASE.acampamento);
  add(11, 14, 0, 'minecraft:anvil', FASE.acampamento);

  return fim({
    nome: 'Forte (castellum)',
    // ordem de preferência: guarita do portão, cantos do fundo, meio das muralhas
    torres: [vigias[0], vigias[1], vigias[4], vigias[5], vigias[2], vigias[3]],
    // trechos da passarela (dy 3 = em pé em cima das tábuas)
    rondas: [
      [[1, 2, 3], [1, 10, 3]], [[UX - 1, 2, 3], [UX - 1, 10, 3]],
      [[1, 14, 3], [1, 21, 3]], [[UX - 1, 14, 3], [UX - 1, 21, 3]],
      [[3, UZ - 1, 3], [5, UZ - 1, 3]],
    ],
  });
}

// =========================================================== TORRE DE VIGIA 5 x 5
function torreVigia() {
  const { add, fim } = nova(5, 5);
  const vigia = torre(add, 1, 1, 7);
  for (const [lx, lz] of [[0, 0], [4, 0], [0, 4], [4, 4]]) {
    for (let dy = 0; dy < 2; dy++) add(lx, lz, dy, CERCA, FASE.muro);
    add(lx, lz, 2, 'minecraft:torch', FASE.muro);
  }
  // escada de blocos subindo por fora até a seteira de baixo
  add(2, 0, 0, TABUA, FASE.adarve);
  add(3, 0, 0, LAJE, FASE.adarve);
  add(2, 4, 0, 'minecraft:barrel', FASE.acampamento);
  return fim({ nome: 'Torre de vigia', torres: [vigia] });
}

// =========================================================== MURALHA COM PORTÃO 21 x 4
function muralha() {
  const LARG = 21;
  const { add, fim } = nova(LARG, 4);
  const TORRES = [[0, 0, 5], [18, 0, 5], [7, 0, 5], [11, 0, 5]];
  const naTorre = (lx, lz) => TORRES.some(([x, z]) => lx >= x && lx <= x + 2 && lz >= z && lz <= z + 2);
  for (let lx = 0; lx < LARG; lx++) if (!naTorre(lx, 1) && !(lx >= 10 && lx <= 10)) estaca(add, lx, 1);
  const vigias = TORRES.map(([x, z, p]) => torre(add, x, z, p));
  add(10, 1, 3, TORA, FASE.portao);
  add(10, 1, 4, TABUA, FASE.portao);
  add(10, 0, 3, TORA, FASE.portao);
  add(10, 2, 3, TORA, FASE.portao);
  for (let lx = 3; lx < LARG - 3; lx++) {
    if (naTorre(lx, 2) || lx === 10) continue;
    add(lx, 2, 2, TABUA, FASE.adarve);
    if (lx % 3 === 0) { add(lx, 2, 0, TORA, FASE.adarve); add(lx, 2, 1, TORA, FASE.adarve); }
  }
  add(4, 3, 0, TABUA, FASE.adarve);
  add(5, 3, 0, TABUA, FASE.adarve);
  add(5, 3, 1, LAJE, FASE.adarve);
  return fim({
    nome: 'Muralha com portão',
    torres: [vigias[2], vigias[3], vigias[0], vigias[1]],
    rondas: [[[3, 2, 3], [6, 2, 3]], [[14, 2, 3], [17, 2, 3]]],
  });
}

export const PLANOS = { forte: forte(), torre: torreVigia(), muralha: muralha() };

// local -> deslocamento no mundo, com a frente virada para "rot"
// rot 0: frente para -Z (norte), 1: +X (leste), 2: +Z (sul), 3: -X (oeste)
export function girar(lx, lz, rot, plano = PLANOS.forte) {
  const x = lx - plano.mx, z = lz - plano.mz;
  switch (rot) {
    case 1: return [-z, x];
    case 2: return [-x, -z];
    case 3: return [z, -x];
    default: return [x, z];
  }
}

export function rotPara(dx, dz) {
  const dirs = [[0, -1], [1, 0], [0, 1], [-1, 0]];
  let melhor = 0, mv = -Infinity;
  dirs.forEach(([x, z], i) => {
    const v = x * dx + z * dz;
    if (v > mv) { mv = v; melhor = i; }
  });
  return melhor;
}

// compatibilidade com o código antigo
export const planoPosto = () => PLANOS.forte.blocos;
export const LARG = PLANOS.forte.larg;
export const COMP = PLANOS.forte.comp;
