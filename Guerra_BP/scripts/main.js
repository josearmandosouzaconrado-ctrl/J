import { world, system, ItemStack } from "@minecraft/server";
import { abrirMenuPrincipal, menuTatico } from "./ui.js";
import { getBatalha, temFamilia, vida, darItens, kitBatalha, removerTagsGuerra } from "./batalha.js";
import { usarRifle, usarCanhao, usarGranada, usarEscudo } from "./armas.js";

function erro(e) {
  console.warn(`[Guerra] ${e}\n${e?.stack ?? ""}`);
}

function darNucleo(player, forcar = false) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  if (!forcar) for (let i = 0; i < inv.size; i++) if (inv.getItem(i)?.typeId === "guerra:nucleo_batalha") return;
  inv.addItem(new ItemStack("guerra:nucleo_batalha", 1));
}

world.afterEvents.itemUse.subscribe((ev) => {
  const p = ev.source;
  const id = ev.itemStack?.typeId;
  if (!id?.startsWith("guerra:")) return;
  try {
    switch (id) {
      case "guerra:nucleo_batalha":
        abrirMenuPrincipal(p).catch(erro);
        break;
      case "guerra:comunicador":
        menuTatico(p).catch(erro);
        break;
      case "guerra:rifle":
        usarRifle(p);
        break;
      case "guerra:canhao":
        usarCanhao(p);
        break;
      case "guerra:granada":
        usarGranada(p, ev.itemStack);
        break;
      case "guerra:escudo":
        usarEscudo(p);
        break;
    }
  } catch (e) {
    erro(e);
  }
});

world.afterEvents.entityDie.subscribe((ev) => {
  const b = getBatalha();
  if (!b || !ev.deadEntity.typeId.startsWith("guerra:")) return;
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
  if (!atacante || !atacante.typeId.startsWith("guerra:")) return;
  for (const t of alvo.getTags()) {
    if (t.startsWith("guerra_aliado_") && temFamilia(atacante, `faccao_${t.slice(14)}`)) {
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
          const s = p.getDynamicProperty("guerra:spawn");
          if (typeof s === "string") {
            const sp = JSON.parse(s);
            p.setSpawnPoint({ dimension: world.getDimension(sp.dim), x: sp.x, y: sp.y, z: sp.z });
            p.setDynamicProperty("guerra:spawn", undefined);
          }
        }
        darNucleo(p);
        p.sendMessage("§b[Guerra Futurista] §fUse o §bNúcleo de Batalha§f para transformar o terreno numa guerra. §7/scriptevent guerra:item");
      } catch (e) {
        erro(e);
      }
    }, 80);
  } else if (b && b.participa(p) && b.estado === "combate") {
    system.runTimeout(() => {
      try {
        darItens(p, kitBatalha(b.o.faccaoJogador));
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
  if (ev.id === "guerra:menu") abrirMenuPrincipal(p).catch(erro);
  else if (ev.id === "guerra:item") darNucleo(p, true);
});
