import { world, system, ItemStack } from "@minecraft/server";
import { abrirRadio } from "./ui.js";
import { getBatalha, temFamilia, vida, darItens, kitBatalha, removerTagsGuerra } from "./batalha.js";
import { ARMAS, disparar, iniciarAutomatico, pararAutomatico, usarGranada, usarKitMedico, atualizarMiras } from "./armas.js";
import { atualizarVeiculos } from "./veiculos.js";

function erro(e) {
  console.warn(`[Guerra Moderna] ${e}\n${e?.stack ?? ""}`);
}

const ARMAS_DE_FOGO = new Set([...Object.keys(ARMAS), "gm:disparo_canhao", "gm:disparo_mg"]);
const SOM_DOS_PROJETEIS = {
  "gm:bala_fuzil": ["gm.tiro.fuzil", 1.1],
  "gm:bala_mg": ["gm.tiro.metralhadora", 1.1],
  "gm:bala_sniper": ["gm.tiro.sniper", 1.4],
  "gm:bala_canhao": ["gm.canhao", 1.0, 1.7],
  "gm:foguete": ["gm.foguete", 1.6],
  "gm:granada_tanque": ["gm.canhao", 2.0],
};
const EXPLOSIVOS = new Set(["gm:foguete", "gm:granada_tanque"]);

function darRadio(player, forcar = false) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  if (!forcar) for (let i = 0; i < inv.size; i++) if (inv.getItem(i)?.typeId === "gm:radio") return;
  inv.addItem(new ItemStack("gm:radio", 1));
}

// ---------------------------------------------------------------- itens

world.afterEvents.itemUse.subscribe((ev) => {
  const p = ev.source;
  const id = ev.itemStack?.typeId;
  if (!id?.startsWith("gm:")) return;
  try {
    if (id === "gm:radio") abrirRadio(p).catch(erro);
    else if (ARMAS_DE_FOGO.has(id)) disparar(p, id);
    else if (id === "gm:granada") usarGranada(p, ev.itemStack);
    else if (id === "gm:kit_medico") usarKitMedico(p, ev.itemStack);
  } catch (e) {
    erro(e);
  }
});

// segurar o botão de uso = rajada (fuzil, metralhadoras)
world.afterEvents.itemStartUse.subscribe((ev) => {
  const id = ev.itemStack?.typeId;
  if (!ARMAS_DE_FOGO.has(id)) return;
  try {
    iniciarAutomatico(ev.source, id);
  } catch (e) {
    erro(e);
  }
});

function soltar(ev) {
  try {
    pararAutomatico(ev.source);
  } catch (e) {
    erro(e);
  }
}
world.afterEvents.itemStopUse.subscribe(soltar);
world.afterEvents.itemReleaseUse.subscribe(soltar);
world.afterEvents.itemCompleteUse.subscribe(soltar);

// ---------------------------------------------------------------- sons dos NPCs

world.afterEvents.entitySpawn.subscribe((ev) => {
  const e = ev.entity;
  const som = SOM_DOS_PROJETEIS[e?.typeId];
  if (!som) return;
  try {
    world.playSound(som[0], e.location, { volume: som[1], pitch: (som[2] ?? 1) * (0.94 + Math.random() * 0.12) });
  } catch {
    // projétil já sumiu
  }
});

function impacto(ev) {
  try {
    const id = ev.projectile?.typeId;
    if (EXPLOSIVOS.has(id)) world.playSound("gm.explosao", ev.location, { volume: id === "gm:granada_tanque" ? 1.6 : 1.1 });
    else if (id?.startsWith("gm:bala") && Math.random() < 0.25) world.playSound("gm.impacto", ev.location, { volume: 0.5 });
  } catch {
    // projétil já removido
  }
}
world.afterEvents.projectileHitBlock.subscribe(impacto);
world.afterEvents.projectileHitEntity.subscribe(impacto);

// ---------------------------------------------------------------- batalha

world.afterEvents.entityDie.subscribe((ev) => {
  const b = getBatalha();
  if (!b || !ev.deadEntity.typeId.startsWith("gm:")) return;
  try {
    b.aoMorrer(ev.deadEntity, ev.damageSource?.damagingEntity);
  } catch (e) {
    erro(e);
  }
});

// tiros perdidos de tropas aliadas não ferem o jogador da mesma facção
world.afterEvents.entityHurt.subscribe((ev) => {
  const alvo = ev.hurtEntity;
  if (alvo.typeId !== "minecraft:player") return;
  const atacante = ev.damageSource?.damagingEntity;
  if (!atacante || !atacante.typeId.startsWith("gm:")) return;
  for (const t of alvo.getTags()) {
    if (t.startsWith("gm_aliado_") && temFamilia(atacante, `gm_${t.slice(10)}`)) {
      const h = vida(alvo);
      if (h && h.currentValue > 0) h.setCurrentValue(Math.min(h.effectiveMax, h.currentValue + ev.damage));
      return;
    }
  }
});

world.afterEvents.playerSpawn.subscribe((ev) => {
  const p = ev.player;
  const b = getBatalha();
  if (ev.initialSpawn) {
    system.runTimeout(() => {
      try {
        if (!getBatalha()?.participa(p)) {
          // limpa marcas de uma batalha interrompida (ex.: mundo fechado no meio)
          removerTagsGuerra(p);
          const s = p.getDynamicProperty("gm:spawn");
          if (typeof s === "string") {
            const sp = JSON.parse(s);
            p.setSpawnPoint({ dimension: world.getDimension(sp.dim), x: sp.x, y: sp.y, z: sp.z });
            p.setDynamicProperty("gm:spawn", undefined);
          }
        }
        darRadio(p);
        p.sendMessage("§2[Guerra Moderna] §fUse o §aRádio de Campanha§f para começar uma batalha. §7/scriptevent gm:item");
      } catch (e) {
        erro(e);
      }
    }, 80);
  } else if (b && b.participa(p) && b.estado === "combate") {
    system.runTimeout(() => {
      try {
        darItens(p, kitBatalha(b.o.faccaoJogador, b.o.classe));
        b.efeitos(p);
      } catch (e) {
        erro(e);
      }
    }, 10);
  }
});

world.afterEvents.playerLeave.subscribe((ev) => getBatalha()?.jogadorSaiu(ev.playerId));

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  const p = ev.sourceEntity;
  if (p?.typeId !== "minecraft:player") return;
  if (ev.id === "gm:radio") abrirRadio(p).catch(erro);
  else if (ev.id === "gm:item") darRadio(p, true);
});

system.runInterval(() => {
  try {
    atualizarVeiculos();
    atualizarMiras();
  } catch (e) {
    erro(e);
  }
}, 2);
