import { world, system, ItemStack } from "@minecraft/server";
import { abrirMenu, abrirCelular } from "./ui.js";
import { getPartida, limparEntidadesOrfas } from "./match.js";

const ACOES = {
  "fut:chute": "chute",
  "fut:passe": "passe",
  "fut:drible": "drible",
  "fut:dividida": "dividida",
  "fut:pedir": "pedir",
};
// chute e passe podem ser segurados para carregar; um toque rápido age na hora
const CARREGAVEIS = new Set(["fut:chute", "fut:passe"]);
const pendentes = new Map(); // playerId -> { carregando }

function temItem(player, typeId) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return true;
  for (let i = 0; i < inv.size; i++) if (inv.getItem(i)?.typeId === typeId) return true;
  return false;
}

function darItemMenu(player, forcar = false) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  if (forcar || !temItem(player, "fut:celular")) {
    const cel = new ItemStack("fut:celular", 1);
    cel.setLore(["§7Redes sociais, mensagens e notícias da sua carreira."]);
    inv.addItem(cel);
  }
  if (!forcar && temItem(player, "fut:menu")) return;
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
  if (id === "fut:celular") return abrirCelular(player).catch((e) => console.warn(`[Futebol] celular: ${e}`));
  const acao = ACOES[id];
  if (!acao) return;
  const partida = getPartida();
  if (!partida) return player.onScreenDisplay.setActionBar("§7Nenhuma partida em andamento.");
  if (!CARREGAVEIS.has(id)) return partida.acaoHumano(player, acao);
  // espera alguns ticks: se o item começar a ser segurado, a ação sai ao soltar
  const pend = { carregando: false };
  pendentes.set(player.id, pend);
  system.runTimeout(() => {
    if (pendentes.get(player.id) !== pend || pend.carregando) return;
    pendentes.delete(player.id);
    getPartida()?.acaoHumano(player, acao);
  }, 3);
});

world.afterEvents.itemStartUse.subscribe((ev) => {
  const id = ev.itemStack?.typeId;
  if (!CARREGAVEIS.has(id)) return;
  const partida = getPartida();
  if (!partida) return;
  const pend = pendentes.get(ev.source.id) ?? { carregando: false };
  pend.carregando = true;
  pendentes.set(ev.source.id, pend);
  partida.iniciarCarga(ev.source, ACOES[id]);
});

function soltar(ev) {
  if (!CARREGAVEIS.has(ev.itemStack?.typeId)) return;
  const pend = pendentes.get(ev.source.id);
  if (!pend?.carregando) return;
  pendentes.delete(ev.source.id);
  getPartida()?.soltarCarga(ev.source);
}
world.afterEvents.itemReleaseUse.subscribe(soltar);
world.afterEvents.itemStopUse.subscribe(soltar);
world.afterEvents.itemCompleteUse.subscribe(soltar);

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
