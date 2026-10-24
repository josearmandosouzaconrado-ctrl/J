import { system, MolangVariableMap, GameMode } from "@minecraft/server";
import { FACCOES } from "./faccoes.js";
import { getBatalha, temFamilia } from "./batalha.js";
import { carregarPerfil } from "./perfil.js";
import { rand } from "./util.js";

const COR_PADRAO = { red: 0.5, green: 0.9, blue: 1 };
const cooldownsLivres = new Map();

function faccaoDoJogador(player) {
  for (const t of player.getTags()) if (t.startsWith("guerra_aliado_")) return t.slice("guerra_aliado_".length);
  return null;
}

function corDe(player) {
  const f = faccaoDoJogador(player);
  return f ? FACCOES[f].rgb : COR_PADRAO;
}

/** Recarga por jogador; devolve segundos restantes (0 = liberado e já reinicia). */
function recarga(player, chave, ticks) {
  const b = getBatalha();
  if (b) return b.cooldown(player, chave, ticks);
  const k = `${player.id}:${chave}`;
  const fim = cooldownsLivres.get(k) ?? 0;
  if (system.currentTick < fim) return Math.ceil((fim - system.currentTick) / 20);
  cooldownsLivres.set(k, system.currentTick + ticks);
  return 0;
}

function avisar(player, txt) {
  try {
    player.onScreenDisplay.setActionBar(txt);
  } catch {
    // tela indisponível
  }
}

function aliado(player, e) {
  const f = faccaoDoJogador(player);
  if (e.typeId === "minecraft:player") return f !== null && e.hasTag(`guerra_aliado_${f}`);
  return f !== null && temFamilia(e, `faccao_${f}`);
}

function feixe(dim, de, ate, cor) {
  const dx = ate.x - de.x;
  const dy = ate.y - de.y;
  const dz = ate.z - de.z;
  const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const passos = Math.min(120, Math.ceil(d / 0.5));
  const vars = new MolangVariableMap();
  vars.setColorRGB("variable.color", cor);
  for (let i = 1; i <= passos; i++) {
    const t = i / passos;
    try {
      dim.spawnParticle("guerra:raio", { x: de.x + dx * t, y: de.y + dy * t, z: de.z + dz * t }, vars);
    } catch {
      return;
    }
  }
}

/** Raio a partir dos olhos: devolve o primeiro inimigo atingido e o ponto final. */
function mirar(player, alcance) {
  const olho = player.getHeadLocation();
  const dir = player.getViewDirection();
  let max = alcance;
  try {
    const bloco = player.getBlockFromViewDirection({ maxDistance: alcance });
    if (bloco) {
      const p = { x: bloco.block.location.x + bloco.faceLocation.x, y: bloco.block.location.y + bloco.faceLocation.y, z: bloco.block.location.z + bloco.faceLocation.z };
      max = Math.hypot(p.x - olho.x, p.y - olho.y, p.z - olho.z);
    }
  } catch {
    // sem bloco no caminho
  }
  let alvo = null;
  let dist = max;
  for (const hit of player.getEntitiesFromViewDirection({ maxDistance: max })) {
    const e = hit.entity;
    if (e.id === player.id || e.typeId === "minecraft:item" || temFamilia(e, "guerra_projetil")) continue;
    if (aliado(player, e)) continue;
    if (hit.distance <= dist) {
      alvo = e;
      dist = hit.distance;
    }
  }
  return { alvo, ponto: { x: olho.x + dir.x * dist, y: olho.y + dir.y * dist, z: olho.z + dir.z * dist }, olho, dir };
}

function causarDano(player, alvo, dano) {
  try {
    alvo.applyDamage(dano, { cause: "entityAttack", damagingEntity: player });
  } catch {
    // alvo não pode receber dano
  }
}

function explodir(player, ponto, raio) {
  try {
    player.dimension.createExplosion(ponto, raio, { breaksBlocks: false, causesFire: false, source: player });
  } catch {
    // explosão indisponível
  }
}

function inicioCano(player) {
  const { olho, dir } = { olho: player.getHeadLocation(), dir: player.getViewDirection() };
  return { x: olho.x + dir.x * 0.8, y: olho.y - 0.25 + dir.y * 0.8, z: olho.z + dir.z * 0.8 };
}

export function usarRifle(player) {
  if (recarga(player, "rifle", 5)) return;
  const up = carregarPerfil(player).up;
  const { alvo, ponto } = mirar(player, 48);
  feixe(player.dimension, inicioCano(player), ponto, corDe(player));
  player.playSound("mob.blaze.shoot", { pitch: 1.8, volume: 0.6 });
  if (alvo) causarDano(player, alvo, 6 + up.dano * 2);
}

export function usarCanhao(player) {
  const r = recarga(player, "canhao", 50);
  if (r) return avisar(player, `§cCanhão recarregando: ${r}s`);
  const up = carregarPerfil(player).up;
  const { alvo, ponto } = mirar(player, 64);
  feixe(player.dimension, inicioCano(player), ponto, { red: 1, green: 0.4, blue: 0.1 });
  player.playSound("mob.ghast.fireball", { pitch: 0.8 });
  if (alvo) causarDano(player, alvo, 12 + up.dano * 3);
  system.runTimeout(() => explodir(player, ponto, 2.6), 2);
}

export function usarGranada(player, itemStack) {
  if (recarga(player, "granada", 20)) return;
  const { ponto: fim, olho, dir } = mirar(player, 22);
  const dist = Math.hypot(fim.x - olho.x, fim.z - olho.z);
  const ponto = dist < 1 ? { x: olho.x + dir.x * 14, y: olho.y - 1, z: olho.z + dir.z * 14 } : fim;
  // consome uma granada (exceto no criativo)
  try {
    if (player.getGameMode?.() !== GameMode.creative) {
      const inv = player.getComponent("inventory").container;
      const slot = player.selectedSlot;
      const item = inv.getItem(slot);
      if (item?.typeId === itemStack.typeId) {
        if (item.amount > 1) {
          item.amount--;
          inv.setItem(slot, item);
        } else inv.setItem(slot, undefined);
      }
    }
  } catch {
    // não foi possível consumir
  }
  player.playSound("random.bow", { pitch: 0.6 });
  const dim = player.dimension;
  const de = player.getHeadLocation();
  for (let i = 1; i <= 10; i++) {
    const t = i / 10;
    const arco = Math.sin(t * Math.PI) * 2.5;
    system.runTimeout(() => {
      try {
        dim.spawnParticle("minecraft:basic_smoke_particle", { x: de.x + (ponto.x - de.x) * t, y: de.y + (ponto.y - de.y) * t + arco, z: de.z + (ponto.z - de.z) * t });
      } catch {
        // partícula indisponível
      }
    }, i);
  }
  system.runTimeout(() => {
    try {
      dim.spawnParticle("minecraft:electric_spark_particle", ponto);
    } catch {
      // partícula indisponível
    }
  }, 12);
  system.runTimeout(() => explodir(player, ponto, 3.2), 28);
}

export function usarEscudo(player) {
  const up = carregarPerfil(player).up;
  const r = recarga(player, "escudo", 600 - up.escudo * 100);
  if (r) return avisar(player, `§9Escudo recarregando: ${r}s`);
  player.addEffect("absorption", 200, { amplifier: 2 + up.escudo, showParticles: false });
  player.addEffect("resistance", 160, { amplifier: 1, showParticles: false });
  player.playSound("beacon.power", { pitch: 1.5 });
  const vars = new MolangVariableMap();
  vars.setColorRGB("variable.color", { red: 0.3, green: 0.6, blue: 1 });
  const l = player.location;
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    try {
      player.dimension.spawnParticle("guerra:raio", { x: l.x + Math.cos(a) * 1.2, y: l.y + 1, z: l.z + Math.sin(a) * 1.2 }, vars);
    } catch {
      break;
    }
  }
  avisar(player, "§9Escudo de energia ativado!");
}

/** Bombardeio orbital no ponto mirado. Devolve mensagem de erro ou null. */
export function ataqueOrbital(player) {
  const up = carregarPerfil(player).up;
  const r = recarga(player, "orbital", 1800 - up.orbital * 300);
  if (r) return `Satélite recarregando: ${r}s`;
  const { ponto } = mirar(player, 120);
  const dim = player.dimension;
  const vars = new MolangVariableMap();
  vars.setColorRGB("variable.color", { red: 1, green: 0.15, blue: 0.1 });
  for (let k = 0; k < 12; k++) {
    system.runTimeout(() => {
      for (let y = 0; y < 30; y += 1) {
        try {
          dim.spawnParticle("guerra:raio", { x: ponto.x, y: ponto.y + y, z: ponto.z }, vars);
        } catch {
          return;
        }
      }
    }, k * 5);
  }
  player.playSound("beacon.activate", { pitch: 0.6 });
  const explosoes = 6 + up.orbital * 2;
  for (let i = 0; i < explosoes; i++) {
    system.runTimeout(() => {
      const p = { x: ponto.x + rand(-4, 4), y: ponto.y, z: ponto.z + rand(-4, 4) };
      explodir(player, p, 3.5);
      try {
        dim.spawnParticle("minecraft:huge_explosion_emitter", p);
      } catch {
        // partícula indisponível
      }
    }, 60 + i * 4);
  }
  return null;
}

/** Chama um esquadrão aliado perto do jogador. */
export function chamarReforcos(player) {
  const b = getBatalha();
  const f = faccaoDoJogador(player);
  if (!b || b.estado !== "combate" || !f) return "Reforços só durante uma batalha, lutando por uma facção.";
  const up = carregarPerfil(player).up;
  const r = b.cooldown(player, "reforcos", 1200 - up.reforcos * 200);
  if (r) return `Reforços a caminho em ${r}s`;
  const tipos = ["soldado", "soldado", "medico", "pesado"];
  for (let i = 0; i < up.reforcos; i++) tipos.push("soldado");
  const base = b.base(f);
  const n = b.enviarEsquadrao(base, tipos, player.location);
  player.playSound("random.levelup", { pitch: 0.8 });
  return n ? null : "Não foi possível posicionar os reforços aqui.";
}
