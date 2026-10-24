import { world, system } from "@minecraft/server";

const CHAVE = "fut:estadio";

export function getEstadio() {
  const s = world.getDynamicProperty(CHAVE);
  if (typeof s !== "string") return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

/** Centro do gramado em coordenadas do mundo (y = superfície). */
export function origemEstadio(e) {
  return { x: e.x + 0.5, y: e.y, z: e.z + 0.5 };
}

function comandosEstadio(X, Y, Z) {
  const c = [];
  const fill = (x1, y1, z1, x2, y2, z2, bloco) => c.push(`fill ${x1} ${y1} ${z1} ${x2} ${y2} ${z2} ${bloco}`);
  const set = (x, y, z, bloco) => c.push(`setblock ${x} ${y} ${z} ${bloco}`);
  const L = 24;
  const W = 15;

  // limpa a área e faz a base
  fill(X - 31, Y, Z - 22, X, Y + 12, Z + 22, "air");
  fill(X + 1, Y, Z - 22, X + 31, Y + 12, Z + 22, "air");
  fill(X - 31, Y - 3, Z - 22, X + 31, Y - 2, Z + 22, "dirt");

  // gramado listrado
  let faixa = 0;
  for (let x = X - 31; x <= X + 31; x += 4, faixa++) {
    fill(x, Y - 1, Z - 22, Math.min(x + 3, X + 31), Y - 1, Z + 22, faixa % 2 ? "moss_block" : "grass_block");
  }

  // linhas
  const linha = "white_concrete";
  fill(X - L, Y - 1, Z - W, X + L, Y - 1, Z - W, linha);
  fill(X - L, Y - 1, Z + W, X + L, Y - 1, Z + W, linha);
  fill(X - L, Y - 1, Z - W, X - L, Y - 1, Z + W, linha);
  fill(X + L, Y - 1, Z - W, X + L, Y - 1, Z + W, linha);
  fill(X, Y - 1, Z - W, X, Y - 1, Z + W, linha);
  for (const s of [-1, 1]) {
    // grande área
    fill(X + s * 18, Y - 1, Z - 8, X + s * 18, Y - 1, Z + 8, linha);
    fill(X + s * 18, Y - 1, Z - 8, X + s * L, Y - 1, Z - 8, linha);
    fill(X + s * 18, Y - 1, Z + 8, X + s * L, Y - 1, Z + 8, linha);
    // pequena área
    fill(X + s * 21, Y - 1, Z - 5, X + s * 21, Y - 1, Z + 5, linha);
    fill(X + s * 21, Y - 1, Z - 5, X + s * L, Y - 1, Z - 5, linha);
    fill(X + s * 21, Y - 1, Z + 5, X + s * L, Y - 1, Z + 5, linha);
    set(X + s * 20, Y - 1, Z, linha);
  }
  // círculo central
  const pontos = new Set();
  for (let a = 0; a < 360; a += 6) {
    const px = Math.round(Math.cos((a * Math.PI) / 180) * 5);
    const pz = Math.round(Math.sin((a * Math.PI) / 180) * 5);
    pontos.add(`${px},${pz}`);
  }
  for (const p of pontos) {
    const [px, pz] = p.split(",").map(Number);
    set(X + px, Y - 1, Z + pz, linha);
  }

  // gols com rede
  for (const s of [-1, 1]) {
    const gx = X + s * L;
    fill(gx, Y, Z - 4, gx, Y + 2, Z - 4, "white_concrete");
    fill(gx, Y, Z + 4, gx, Y + 2, Z + 4, "white_concrete");
    fill(gx, Y + 3, Z - 4, gx, Y + 3, Z + 4, "white_concrete");
    fill(gx + s, Y, Z - 4, gx + s * 2, Y + 3, Z - 4, "iron_bars");
    fill(gx + s, Y, Z + 4, gx + s * 2, Y + 3, Z + 4, "iron_bars");
    fill(gx + s * 2, Y, Z - 3, gx + s * 2, Y + 3, Z + 3, "iron_bars");
    fill(gx + s, Y + 3, Z - 3, gx + s, Y + 3, Z + 3, "iron_bars");
  }

  // arquibancadas
  for (const s of [-1, 1]) {
    const cor = s < 0 ? "blue_concrete" : "red_concrete";
    for (let k = 0; k < 4; k++) {
      const z = Z + s * (18 + k);
      fill(X - 26, Y, z, X + 26, Y + k, z, "smooth_stone");
      fill(X - 26, Y + k, z, X + 26, Y + k, z, k % 2 ? "white_concrete" : cor);
    }
    fill(X - 26, Y, Z + s * 22, X + 26, Y + 5, Z + s * 22, "smooth_stone");
    for (let x = X - 24; x <= X + 24; x += 8) set(x, Y + 5, Z + s * 22, "sea_lantern");
    // muro atrás dos gols
    fill(X + s * 29, Y, Z - 17, X + s * 29, Y + 2, Z + 17, "glass");
  }

  // refletores
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      const x = X + sx * 28;
      const z = Z + sz * 20;
      fill(x, Y, z, x, Y + 8, z, "iron_block");
      fill(x - 1, Y + 9, z, x + 1, Y + 9, z, "sea_lantern");
    }
  }
  // bandeirinhas de escanteio
  for (const sx of [-1, 1]) for (const sz of [-1, 1]) set(X + sx * (L + 1), Y, Z + sz * (W + 1), "yellow_wool");
  return c;
}

/** Constrói o estádio centrado na posição do jogador (alguns comandos por tick). */
export function construirEstadio(player, aoTerminar) {
  const X = Math.floor(player.location.x);
  const Y = Math.floor(player.location.y);
  const Z = Math.floor(player.location.z);
  const dim = player.dimension;
  const cmds = comandosEstadio(X, Y, Z);
  let i = 0;
  let falhas = 0;
  player.sendMessage(`§a[Futebol] Construindo estádio (${cmds.length} etapas)...`);
  const id = system.runInterval(() => {
    for (let n = 0; n < 6 && i < cmds.length; n++, i++) {
      dim.runCommandAsync(cmds[i]).catch(() => falhas++);
    }
    if (i >= cmds.length) {
      system.clearRun(id);
      world.setDynamicProperty(CHAVE, JSON.stringify({ x: X, y: Y, z: Z, dim: dim.id }));
      system.runTimeout(() => {
        try {
          player.teleport({ x: X + 0.5, y: Y + 0.1, z: Z + 0.5 }, { dimension: dim });
          if (falhas > 0) player.sendMessage(`§e[Futebol] Estádio pronto, mas ${falhas} etapas falharam (área fora dos chunks carregados?).`);
          else player.sendMessage("§a[Futebol] Estádio pronto! Abra o menu para jogar.");
        } catch {
          // jogador saiu
        }
        aoTerminar?.();
      }, 20);
    }
  }, 1);
}
