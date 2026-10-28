import { world, system } from "@minecraft/server";
import { FACCOES } from "./faccoes.js";
import { escolher, rand, randInt } from "./util.js";

const CHAVE_BACKUP = "gm:backup";
const ABAIXO = 8; // camadas salvas abaixo do chão
const ACIMA = 32; // camadas salvas acima do chão
const TILE = 8;

export function getBackup() {
  const s = world.getDynamicProperty(CHAVE_BACKUP);
  if (typeof s !== "string") return null;
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}

/** Executa comandos aos poucos (por tick) e chama aoTerminar com o número de falhas. */
function executarLote(dim, cmds, porTick, aoTick, aoTerminar) {
  let i = 0;
  let falhas = 0;
  let pendentes = 0;
  const id = system.runInterval(() => {
    const fim = Math.min(cmds.length, i + porTick);
    for (; i < fim; i++) {
      const cmd = cmds[i];
      if (typeof cmd === "function") {
        try {
          cmd();
        } catch {
          falhas++;
        }
        continue;
      }
      pendentes++;
      dim.runCommandAsync(cmd).then(
        () => pendentes--,
        () => {
          pendentes--;
          falhas++;
        },
      );
    }
    aoTick?.(i, cmds.length);
    if (i >= cmds.length && pendentes <= 0) {
      system.clearRun(id);
      aoTerminar?.(falhas);
    }
  }, 1);
}

/** Salva o terreno original em estruturas de até 64x64. */
export function salvarTerreno(dim, centro, raio, aoTerminar) {
  const x0 = centro.x - raio;
  const z0 = centro.z - raio;
  const lado = raio * 2 + 1;
  const partes = Math.ceil(lado / 64);
  const passo = Math.ceil(lado / partes);
  const tiles = [];
  const cmds = [];
  let n = 0;
  for (let a = 0; a < partes; a++) {
    for (let b = 0; b < partes; b++) {
      const x1 = x0 + a * passo;
      const z1 = z0 + b * passo;
      const x2 = Math.min(x0 + lado - 1, x1 + passo - 1);
      const z2 = Math.min(z0 + lado - 1, z1 + passo - 1);
      const nome = `gm_bkp_${n++}`;
      const y1 = centro.y - ABAIXO;
      tiles.push({ nome, x: x1, y: y1, z: z1 });
      cmds.push(`structure save ${nome} ${x1} ${y1} ${z1} ${x2} ${centro.y + ACIMA} ${z2} false disk true`);
    }
  }
  executarLote(dim, cmds, 2, null, (falhas) => {
    if (falhas === 0) {
      world.setDynamicProperty(CHAVE_BACKUP, JSON.stringify({ ...centro, raio, dim: dim.id, tiles }));
    }
    aoTerminar(falhas);
  });
}

export function restaurarTerreno(aoTerminar) {
  const b = getBackup();
  if (!b) return aoTerminar?.(-1);
  const dim = world.getDimension(b.dim);
  const cmds = b.tiles.map((t) => `structure load ${t.nome} ${t.x} ${t.y} ${t.z}`);
  executarLote(dim, cmds, 1, null, (falhas) => {
    if (falhas === 0) world.setDynamicProperty(CHAVE_BACKUP, undefined);
    aoTerminar?.(falhas);
  });
}

export function descartarBackup() {
  world.setDynamicProperty(CHAVE_BACKUP, undefined);
}

/** Posições das bases das facções (relativas ao centro). */
export function posicoesBases(faccoes, raio) {
  const d = Math.round(raio * 0.72);
  return faccoes.map((f, i) => {
    const ang = (i * 2 * Math.PI) / faccoes.length;
    return { faccao: f, x: Math.round(Math.cos(ang) * d), z: Math.round(Math.sin(ang) * d) };
  });
}

function comandosTile(c, cen, X, Y, Z, tx, tz, bases) {
  const x1 = X + tx;
  const z1 = Z + tz;
  const x2 = x1 + TILE - 1;
  const z2 = z1 + TILE - 1;
  const fill = (a, b, cc, d, e, f, bloco, modo = "") => c.push(`fill ${a} ${b} ${cc} ${d} ${e} ${f} ${bloco}${modo ? ` ${modo}` : ""}`);
  const set = (a, b, cc, bloco) => c.push(`setblock ${a} ${b} ${cc} ${bloco}`);

  fill(x1, Y, z1, x2, Y + ACIMA - 2, z2, "air");
  fill(x1, Y - 6, z1, x2, Y - 2, z2, cen.sub);
  // ruas em grade (cidade) ou chão variado
  const rua = cen.rua && (Math.abs(tx) % 24 < TILE || Math.abs(tz) % 24 < TILE);
  fill(x1, Y - 1, z1, x2, Y - 1, z2, rua ? cen.rua : escolher(cen.chao));
  if (rua) {
    if (Math.abs(tx) % 24 < TILE) fill(x1 + 3, Y - 1, z1, x1 + 3, Y - 1, z2, "yellow_concrete");
  } else {
    for (let k = 0; k < 3; k++) set(x1 + randInt(0, 7), Y - 1, z1 + randInt(0, 7), escolher(cen.chao));
  }

  const cx = tx + TILE / 2;
  const cz = tz + TILE / 2;
  const longe = Math.hypot(cx, cz) > 8 && bases.every((b) => Math.hypot(cx - b.x, cz - b.z) > 13);
  if (!longe || rua) return;
  const r = Math.random();
  const px = x1 + randInt(2, 5);
  const pz = z1 + randInt(2, 5);
  let lim = cen.predios;
  if (r < lim) {
    // prédio bombardeado com janelas
    const h = randInt(5, 11);
    const parede = escolher(cen.cobertura);
    fill(x1 + 1, Y, z1 + 1, x1 + 6, Y + h, z1 + 6, parede, "hollow");
    for (let y = Y + 2; y < Y + h - 1; y += 3) {
      fill(x1 + 2, y, z1 + 1, x1 + 5, y, z1 + 1, "glass_pane");
      fill(x1 + 2, y, z1 + 6, x1 + 5, y, z1 + 6, "glass_pane");
    }
    fill(x1 + 3, Y, z1 + 1, x1 + 4, Y + 2, z1 + 1, "air");
    // buraco de explosão e entulho
    fill(x1 + randInt(1, 3), Y + randInt(3, h), z1 + 6, x1 + 6, Y + h, z1 + 6, "air");
    fill(x1 + 2, Y + h, z1 + 2, x1 + randInt(3, 5), Y + h, z1 + randInt(3, 5), "air");
    fill(x1 + 7, Y, z1 + 2, x1 + 7, Y, z1 + 4, "cobblestone");
    return;
  }
  if (r < (lim += 0.12)) {
    // trincheira de sacos de areia em L
    fill(px - 2, Y, pz, px + 2, Y, pz, cen.sacos);
    fill(px - 2, Y, pz, px - 2, Y, pz + 2, cen.sacos);
    if (Math.random() < 0.5) set(px, Y + 1, pz, cen.sacos);
    return;
  }
  if (r < (lim += 0.08)) {
    // cratera de bomba
    fill(px - 2, Y - 1, pz - 1, px + 2, Y - 1, pz + 1, cen.cratera);
    fill(px - 1, Y - 1, pz - 2, px + 1, Y - 1, pz + 2, cen.cratera);
    set(px, Y - 1, pz, "coal_block");
    set(px, Y, pz, "campfire");
    return;
  }
  if (r < (lim += 0.07)) {
    // carro destruído
    const cor = escolher(["black_concrete", "gray_concrete", "brown_concrete", "white_concrete"]);
    fill(px - 1, Y, pz, px + 1, Y, pz + 1, cor);
    set(px, Y + 1, pz, "black_stained_glass");
    set(px + 1, Y + 1, pz + 1, "campfire");
    return;
  }
  if (r < (lim += 0.06)) {
    // ouriços antitanque
    for (let k = 0; k < 3; k++) {
      const ox = px - 2 + k * 2;
      fill(ox, Y, pz, ox, Y + 1, pz, "iron_bars");
    }
    return;
  }
  if (r < (lim += cen.arvores)) {
    // árvore (floresta / inverno)
    const h = randInt(4, 7);
    fill(px - 2, Y + h - 2, pz - 2, px + 2, Y + h, pz + 2, cen.folhas);
    fill(px - 1, Y + h + 1, pz - 1, px + 1, Y + h + 1, pz + 1, cen.folhas);
    fill(px, Y, pz, px, Y + h, pz, cen.tronco);
    return;
  }
  if (r < (lim += 0.04)) {
    // contêiner
    const cor = escolher(["red_concrete", "blue_concrete", "green_concrete", "orange_concrete"]);
    fill(x1 + 1, Y, z1 + 2, x1 + 6, Y + 2, z1 + 4, cor, "hollow");
    fill(x1 + 1, Y, z1 + 3, x1 + 1, Y + 1, z1 + 3, "air");
  }
}

function comandosBase(c, X, Y, Z, base) {
  const f = FACCOES[base.faccao].blocos;
  const bx = X + base.x;
  const bz = Z + base.z;
  const fill = (a, b, cc, d, e, ff, bloco, modo = "") => c.push(`fill ${a} ${b} ${cc} ${d} ${e} ${ff} ${bloco}${modo ? ` ${modo}` : ""}`);
  fill(bx - 9, Y, bz - 9, bx + 9, Y + 12, bz + 9, "air");
  fill(bx - 9, Y - 1, bz - 9, bx + 9, Y - 1, bz + 9, "gray_concrete");
  fill(bx - 3, Y - 1, bz - 3, bx + 3, Y - 1, bz + 3, f.pri);
  // muralha de sacos de areia com portões largos para veículos
  fill(bx - 8, Y, bz - 8, bx + 8, Y + 1, bz + 8, "mud_bricks", "hollow");
  fill(bx - 2, Y, bz - 8, bx + 2, Y + 1, bz - 8, "air");
  fill(bx - 2, Y, bz + 8, bx + 2, Y + 1, bz + 8, "air");
  fill(bx - 8, Y, bz - 2, bx - 8, Y + 1, bz + 2, "air");
  fill(bx + 8, Y, bz - 2, bx + 8, Y + 1, bz + 2, "air");
  // torres de vigia com holofote e faixa da facção
  for (const [sx, sz] of [[-1, -1], [1, 1]]) {
    const tx = bx + sx * 7;
    const tz = bz + sz * 7;
    fill(tx, Y, tz, tx, Y + 5, tz, "oak_fence");
    fill(tx - 1, Y + 5, tz - 1, tx + 1, Y + 5, tz + 1, "spruce_planks");
    c.push(`setblock ${tx} ${Y + 6} ${tz} ${f.pri}`);
    c.push(`setblock ${tx} ${Y + 7} ${tz} sea_lantern`);
  }
}

/**
 * Transforma o terreno numa onda que parte do centro.
 * aoProgresso(fração) é chamado a cada tick; aoTerminar(falhas) no fim.
 */
export function transformarTerreno(dim, centro, raio, cenario, bases, aoProgresso, aoTerminar) {
  const { x: X, y: Y, z: Z } = centro;
  const tiles = [];
  for (let tx = -raio; tx <= raio; tx += TILE) {
    for (let tz = -raio; tz <= raio; tz += TILE) {
      const d = Math.hypot(tx + TILE / 2, tz + TILE / 2);
      if (d <= raio + 2) tiles.push({ tx, tz, d });
    }
  }
  tiles.sort((a, b) => a.d - b.d);
  const cmds = [];
  const marcos = [];
  for (const t of tiles) {
    comandosTile(cmds, cenario, X, Y, Z, t.tx, t.tz, bases);
    marcos.push({ indice: cmds.length, t });
  }
  for (const b of bases) comandosBase(cmds, X, Y, Z, b);
  const porTick = Math.max(8, Math.ceil(cmds.length / 90));
  let ultimoMarco = 0;
  executarLote(
    dim,
    cmds,
    porTick,
    (feitos, total) => {
      while (ultimoMarco < marcos.length && marcos[ultimoMarco].indice <= feitos) {
        const t = marcos[ultimoMarco++].t;
        if (Math.random() < 0.35) {
          const p = { x: X + t.tx + rand(0, TILE), y: Y + 1, z: Z + t.tz + rand(0, TILE) };
          try {
            dim.spawnParticle(Math.random() < 0.3 ? "minecraft:huge_explosion_emitter" : "minecraft:large_smoke_particle", p);
          } catch {
            // partícula indisponível
          }
        }
      }
      aoProgresso?.(feitos / total);
    },
    aoTerminar,
  );
}
