import { world, system, ItemStack } from "@minecraft/server";
import { abrirMenu } from "./ui.js";
import { getPartida, limparEntidadesOrfas } from "./match.js";

const ACOES = {
  "fut:chute": "chute",
  "fut:passe": "passe",
  "fut:dividida": "dividida",
  "fut:pedir": "pedir",
};

function temItemMenu(player) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return true;
  for (let i = 0; i < inv.size; i++) if (inv.getItem(i)?.typeId === "fut:menu") return true;
  return false;
}

function darItemMenu(player, forcar = false) {
  if (!forcar && temItemMenu(player)) return;
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  const item = new ItemStack("fut:menu", 1);
  item.nameTag = "§bMenu do Futebol";
  item.setLore(["§7Use para abrir o menu do Futebol Craft."]);
  inv.addItem(item);
}

function abrir(player) {
  abrirMenu(player).catch((e) => console.warn(`[Futebol] erro no menu: ${e}\n${e?.stack ?? ""}`));
}

world.afterEvents.itemUse.subscribe((ev) => {
  const id = ev.itemStack?.typeId;
  const player = ev.source;
  if (id === "fut:menu") return abrir(player);
  const acao = ACOES[id];
  if (!acao) return;
  const partida = getPartida();
  if (partida) partida.acaoHumano(player, acao);
  else player.onScreenDisplay.setActionBar("§7Nenhuma partida em andamento.");
});

world.afterEvents.entityHitEntity.subscribe((ev) => {
  const player = ev.damagingEntity;
  if (player?.typeId !== "minecraft:player") return;
  const partida = getPartida();
  if (!partida) return;
  const alvo = ev.hitEntity?.typeId;
  if (alvo === "fut:bola") partida.acaoHumano(player, "chute");
  else if (alvo === "fut:jogador") partida.acaoHumano(player, "dividida");
});

world.afterEvents.playerSpawn.subscribe((ev) => {
  if (!ev.initialSpawn) return;
  const player = ev.player;
  system.runTimeout(() => {
    try {
      darItemMenu(player);
      player.sendMessage("§a[Futebol Craft] §fUse o §bMenu do Futebol§f para jogar. Perdeu o item? §7/scriptevent fut:item");
    } catch {
      // jogador saiu antes
    }
  }, 60);
});

world.afterEvents.playerLeave.subscribe((ev) => {
  getPartida()?.jogadorSaiu(ev.playerId);
});

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  const p = ev.sourceEntity;
  if (!p || p.typeId !== "minecraft:player") return;
  if (ev.id === "fut:menu") abrir(p);
  else if (ev.id === "fut:item") darItemMenu(p, true);
});

// remove NPCs que sobraram de partidas interrompidas (ex.: mundo fechado no meio do jogo)
system.runInterval(() => {
  try {
    limparEntidadesOrfas();
  } catch (e) {
    console.warn(`[Futebol] limpeza: ${e}`);
  }
}, 100);
