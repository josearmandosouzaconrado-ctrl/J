import { world, system } from "@minecraft/server";
import { FACCOES } from "./faccoes.js";
import { escolher, rand, randInt } from "./util.js";

const CHAVE_BACKUP = "guerra:backup";
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
      const nome = `guerra_bkp_${n++}`;
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
  fill(x1, Y - 1, z1, x2, Y - 1, z2, escolher(cen.chao));
  for (let k = 0; k < 3; k++) set(x1 + randInt(0, 7), Y - 1, z1 + randInt(0, 7), escolher(cen.chao));

  const cx = tx + TILE / 2;
  const cz = tz + TILE / 2;
  const longe = Math.hypot(cx, cz) > 7 && bases.every((b) => Math.hypot(cx - b.x, cz - b.z) > 11);
  if (!longe) return;
  const r = Math.random();
  const px = x1 + randInt(1, 6);
  const pz = z1 + randInt(1, 6);
  if (r < cen.predios) {
    // prédio em ruínas
    const h = randInt(4, 8);
    fill(x1 + 1, Y, z1 + 1, x1 + 6, Y + h, z1 + 6, escolher(cen.cobertura), "hollow");
    fill(x1 + 3, Y, z1 + 1, x1 + 4, Y + 2, z1 + 1, "air");
    fill(x1 + 1, Y + randInt(2, h), z1 + randInt(2, 5), x1 + 1, Y + h, z1 + 6, "air");
    fill(x1 + 2, Y + h, z1 + 2, x1 + randInt(3, 5), Y + h, z1 + randInt(3, 5), "air");
    set(x1 + 6, Y + 2, z1 + 3, "glass");
  } else if (r < cen.predios + 0.26) {
    // muro de cobertura
    const len = randInt(3, 6);
    const bloco = escolher(cen.cobertura);
    if (Math.random() < 0.5) fill(px - 2, Y, pz, Math.min(x2, px - 2 + len), Y + 1, pz, bloco);
    else fill(px, Y, pz - 2, px, Y + 1, Math.min(z2, pz - 2 + len), bloco);
  } else if (r < cen.predios + 0.38) {
    // cratera
    fill(px - 1, Y - 1, pz - 1, px + 1, Y - 1, pz + 1, cen.cratera);
    set(px, Y - 1, pz, "air");
  } else if (r < cen.predios + 0.46) {
    // poste de energia
    const h = randInt(3, 6);
    fill(px, Y, pz, px, Y + h, pz, escolher(cen.cobertura));
    set(px, Y + h + 1, pz, cen.luz);
  } else if (r < cen.predios + 0.53) {
    // caixas de suprimento
    fill(px, Y, pz, px + 1, Y, pz + 1, "barrel");
    set(px, Y + 1, pz, "iron_block");
  }
}

function comandosBase(c, X, Y, Z, base) {
  const f = FACCOES[base.faccao].blocos;
  const bx = X + base.x;
  const bz = Z + base.z;
  const fill = (a, b, cc, d, e, ff, bloco, modo = "") => c.push(`fill ${a} ${b} ${cc} ${d} ${e} ${ff} ${bloco}${modo ? ` ${modo}` : ""}`);
  fill(bx - 7, Y, bz - 7, bx + 7, Y + 12, bz + 7, "air");
  fill(bx - 7, Y - 1, bz - 7, bx + 7, Y - 1, bz + 7, f.sec);
  fill(bx - 5, Y - 1, bz - 5, bx + 5, Y - 1, bz + 5, f.pri);
  fill(bx - 6, Y, bz - 6, bx + 6, Y + 1, bz + 6, f.sec, "hollow");
  fill(bx - 6, Y + 2, bz - 6, bx + 6, Y + 2, bz + 6, f.vidro);
  fill(bx - 5, Y + 2, bz - 5, bx + 5, Y + 2, bz + 5, "air");
  // portões nos quatro lados
  fill(bx - 1, Y, bz - 6, bx + 1, Y + 2, bz - 6, "air");
  fill(bx - 1, Y, bz + 6, bx + 1, Y + 2, bz + 6, "air");
  fill(bx - 6, Y, bz - 1, bx - 6, Y + 2, bz + 1, "air");
  fill(bx + 6, Y, bz - 1, bx + 6, Y + 2, bz + 1, "air");
  // torres
  for (const [sx, sz] of [[-1, -1], [1, -1], [-1, 1], [1, 1]]) {
    const tx = bx + sx * 6;
    const tz = bz + sz * 6;
    fill(tx, Y, tz, tx, Y + 6, tz, f.pri);
    c.push(`setblock ${tx} ${Y + 7} ${tz} sea_lantern`);
    fill(tx - sx, Y + 7, tz - sz, tx - sx, Y + 7, tz - sz, f.vidro);
  }
  // plataforma do núcleo
  fill(bx - 1, Y - 1, bz - 1, bx + 1, Y - 1, bz + 1, "sea_lantern");
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
            dim.spawnParticle(Math.random() < 0.3 ? "minecraft:huge_explosion_emitter" : "minecraft:electric_spark_particle", p);
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
