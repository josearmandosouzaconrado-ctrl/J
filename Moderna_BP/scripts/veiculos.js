import { world, system, ItemStack } from "@minecraft/server";
import { veiculoMontado, pararAutomatico } from "./armas.js";
import { vida } from "./batalha.js";
import { hudArmaAte } from "./hud.js";

const ITENS_VEICULO = ["gm:disparo_canhao", "gm:disparo_mg"];
const pilotos = new Map(); // playerId -> id do veículo

function normalizar(a) {
  while (a > 180) a -= 360;
  while (a < -180) a += 360;
  return a;
}

function darItensVeiculo(player) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  for (const id of ITENS_VEICULO) {
    let tem = false;
    for (let i = 0; i < inv.size; i++) if (inv.getItem(i)?.typeId === id) tem = true;
    if (tem) continue;
    // tenta os primeiros espaços da barra para ficar à mão
    let colocado = false;
    for (let i = 0; i < 9 && !colocado; i++) {
      if (!inv.getItem(i)) {
        inv.setItem(i, new ItemStack(id, 1));
        colocado = true;
      }
    }
    if (!colocado) inv.addItem(new ItemStack(id, 1));
  }
}

function tirarItensVeiculo(player) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  for (let i = 0; i < inv.size; i++) if (ITENS_VEICULO.includes(inv.getItem(i)?.typeId)) inv.setItem(i, undefined);
}

/** A cada 2 ticks: torre segue a mira do piloto, itens de disparo e painel do veículo. */
export function atualizarVeiculos() {
  for (const p of world.getAllPlayers()) {
    try {
      const v = veiculoMontado(p);
      const antes = pilotos.get(p.id);
      if (!v) {
        if (antes) {
          pilotos.delete(p.id);
          pararAutomatico(p);
          tirarItensVeiculo(p);
        }
        continue;
      }
      if (antes !== v.entidade.id) {
        pilotos.set(p.id, v.entidade.id);
        darItensVeiculo(p);
        p.onScreenDisplay.setTitle(v.tipo === "tanque" ? "§2§lTANQUE" : "§2§lBLINDADO", {
          subtitle: "§7Mire com a câmera. §cCANHÃO§7 e §eMETRALHADORA§7 na barra. Agache para sair.",
          fadeInDuration: 5, stayDuration: 50, fadeOutDuration: 10,
        });
        world.playSound("gm.motor", v.entidade.location, { volume: 1 });
      }
      // só o piloto (primeiro assento) controla a torre
      const rider = v.entidade.getComponent("rideable")?.getRiders?.()[0];
      if (rider && rider.id !== p.id) continue;
      const rv = p.getRotation();
      const rt = v.entidade.getRotation();
      v.entidade.setProperty("gm:torre", Math.max(-180, Math.min(180, normalizar(rv.y - rt.y))));
      v.entidade.setProperty("gm:elev", Math.max(-30, Math.min(30, rv.x)));
      if (system.currentTick % 10 === 0 && (hudArmaAte.get(p.id) ?? 0) < system.currentTick) {
        const h = vida(v.entidade);
        const frac = h ? h.currentValue / h.effectiveMax : 1;
        const n = Math.round(frac * 10);
        const cor = frac > 0.5 ? "§a" : frac > 0.25 ? "§e" : "§c";
        p.onScreenDisplay.setActionBar(`§2${v.tipo === "tanque" ? "TANQUE" : "BLINDADO"} §fBlindagem ${cor}${"|".repeat(n)}§8${"|".repeat(10 - n)} §f${Math.ceil(h?.currentValue ?? 0)}`);
      }
    } catch {
      // jogador ou veículo indisponível neste tick
    }
  }
}
