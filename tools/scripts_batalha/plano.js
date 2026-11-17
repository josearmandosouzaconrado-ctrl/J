// Planta do posto avançado romano (castellum de madeira), 11 x 11 blocos.
// Sem dependências do Minecraft: o mesmo arquivo roda no jogo e no Node (testes).
//
// Coordenadas locais: lx e lz de 0 a 10; o portão fica no lado lz = 0.
// Cada bloco tem dy = altura acima do chão daquela coluna (o muro acompanha o terreno).

export const TAM = 11;
const MEIO = 5;

const TORA = 'minecraft:spruce_log';
const TABUA = 'minecraft:spruce_planks';
const CERCA = 'minecraft:spruce_fence';

// fases: a ordem em que os legionários constroem
const FASE = { muro: 0, torres: 1, plataformas: 2, portao: 3, acampamento: 4 };

export function planoPosto() {
  const blocos = [];
  const add = (lx, lz, dy, bloco, fase) =>
    blocos.push({ lx, lz, dy, bloco, fase, dentro: fase === FASE.acampamento });
  const portao = (lx, lz) => lz === 0 && lx >= 4 && lx <= 6;
  const torre = (lx, lz) => lz <= 1 && (lx <= 1 || lx >= 9);

  // paliçada: troncos com pontas alternadas (4 e 5 de altura)
  for (let lx = 0; lx < TAM; lx++) {
    for (let lz = 0; lz < TAM; lz++) {
      const borda = lx === 0 || lz === 0 || lx === TAM - 1 || lz === TAM - 1;
      if (!borda || portao(lx, lz) || torre(lx, lz)) continue;
      const h = 4 + ((lx + lz) % 2);
      for (let dy = 0; dy < h; dy++) add(lx, lz, dy, TORA, FASE.muro);
    }
  }
  // duas torres de vigia (2 x 2) dos lados do portão
  for (const [x0, x1] of [[0, 1], [9, 10]]) {
    for (let lx = x0; lx <= x1; lx++)
      for (let lz = 0; lz <= 1; lz++)
        for (let dy = 0; dy < 7; dy++) add(lx, lz, dy, TORA, FASE.torres);
    // plataforma de tábuas 3 x 3 e parapeito de cerca com tochas
    const px0 = x0 === 0 ? 0 : 8;
    for (let lx = px0; lx < px0 + 3; lx++)
      for (let lz = 0; lz < 3; lz++) {
        add(lx, lz, 7, TABUA, FASE.plataformas);
        const dentro = lx === px0 + 1 && lz === 1;
        if (!dentro) add(lx, lz, 8, CERCA, FASE.plataformas);
      }
    add(px0, 0, 9, 'minecraft:torch', FASE.plataformas);
    add(px0 + 2, 0, 9, 'minecraft:torch', FASE.plataformas);
  }
  // portão: verga de troncos por cima da passagem
  for (let lx = 4; lx <= 6; lx++) {
    add(lx, 0, 3, TORA, FASE.portao);
    add(lx, 0, 4, TORA, FASE.portao);
  }
  add(5, 0, 5, 'minecraft:torch', FASE.portao);

  // acampamento: fogueira, tenda de couro, estandarte (vexillum) e suprimentos
  add(MEIO, MEIO, 0, 'minecraft:campfire', FASE.acampamento);
  for (let lz = 7; lz <= 9; lz++) {
    add(2, lz, 0, 'minecraft:brown_wool', FASE.acampamento);
    add(4, lz, 0, 'minecraft:brown_wool', FASE.acampamento);
    add(3, lz, 1, 'minecraft:brown_wool', FASE.acampamento);
  }
  for (let dy = 0; dy < 3; dy++) add(7, 8, dy, CERCA, FASE.acampamento);
  add(7, 8, 3, 'minecraft:red_wool', FASE.acampamento);
  add(6, 8, 3, 'minecraft:red_wool', FASE.acampamento);
  add(8, 8, 3, 'minecraft:red_wool', FASE.acampamento);
  add(7, 8, 4, 'minecraft:gold_block', FASE.acampamento);
  add(8, 3, 0, 'minecraft:crafting_table', FASE.acampamento);
  add(8, 4, 0, 'minecraft:barrel', FASE.acampamento);
  add(2, 3, 0, 'minecraft:hay_block', FASE.acampamento);
  add(2, 4, 0, 'minecraft:hay_block', FASE.acampamento);

  // ordem de obra: por fase, de baixo para cima, dando a volta no muro
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
