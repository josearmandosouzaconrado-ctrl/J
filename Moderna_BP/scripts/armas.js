import { world, system } from "@minecraft/server";
import { getBatalha, temFamilia, faccaoDoJogador, vida } from "./batalha.js";
import { carregarPerfil } from "./perfil.js";
import { hudArmaAte } from "./hud.js";
import { rand } from "./util.js";

export const ARMAS = {
  "gm:fuzil": { nome: "Fuzil de Assalto", pente: 30, dano: 5, cadencia: 3, alcance: 70, dispersao: 0.018, recarga: 40, som: "gm.tiro.fuzil", auto: true },
  "gm:metralhadora": { nome: "Metralhadora", pente: 100, dano: 4, cadencia: 2, alcance: 60, dispersao: 0.04, recarga: 90, som: "gm.tiro.metralhadora", auto: true },
  "gm:sniper": { nome: "Rifle de Precisão", pente: 5, dano: 26, cadencia: 25, alcance: 128, dispersao: 0.06, recarga: 55, som: "gm.tiro.sniper", mira: true },
  "gm:bazuca": { nome: "Lança-Foguetes", pente: 1, dano: 55, cadencia: 10, alcance: 90, dispersao: 0.01, recarga: 70, som: "gm.foguete", foguete: 2.8 },
};

/** Armas dos veículos pilotáveis, por tipo de veículo. */
export const ARMAS_VEICULO = {
  tanque: {
    "gm:disparo_canhao": { nome: "Canhão 120mm", pente: 1, dano: 65, cadencia: 10, alcance: 120, dispersao: 0.004, recarga: 70, som: "gm.canhao", foguete: 3.6, veloz: true },
    "gm:disparo_mg": { nome: "Metralhadora coaxial", pente: 200, dano: 4, cadencia: 2, alcance: 70, dispersao: 0.03, recarga: 100, som: "gm.tiro.metralhadora", auto: true },
  },
  blindado: {
    "gm:disparo_canhao": { nome: "Autocanhão 30mm", pente: 10, dano: 16, cadencia: 7, alcance: 90, dispersao: 0.015, recarga: 60, som: "gm.canhao", foguete: 1.4, veloz: true, pitch: 1.6 },
    "gm:disparo_mg": { nome: "Metralhadora", pente: 200, dano: 4, cadencia: 2, alcance: 70, dispersao: 0.03, recarga: 100, som: "gm.tiro.metralhadora", auto: true },
  },
};

const municao = new Map(); // `${playerId}:${item}` -> { balas, recarregandoAte, ultimoTiro }
const automaticos = new Map(); // playerId -> id do loop de tiro
const cooldownsLivres = new Map();

function tick() {
  return system.currentTick;
}

function recarga(player, chave, ticks) {
  const b = getBatalha();
  if (b) return b.cooldown(player, chave, ticks);
  const k = `${player.id}:${chave}`;
  const fim = cooldownsLivres.get(k) ?? 0;
  if (tick() < fim) return Math.ceil((fim - tick()) / 20);
  cooldownsLivres.set(k, tick() + ticks);
  return 0;
}

export function veiculoMontado(player) {
  try {
    const v = player.getComponent("riding")?.entityRidingOn;
    if (!v) return null;
    const m = /^gm:\w+_(tanque|blindado)_p$/.exec(v.typeId);
    return m ? { entidade: v, tipo: m[1] } : null;
  } catch {
    return null;
  }
}

function especArma(player, itemId) {
  if (ARMAS[itemId]) return ARMAS[itemId];
  const v = veiculoMontado(player);
  return v ? ARMAS_VEICULO[v.tipo][itemId] ?? null : null;
}

function estado(player, itemId, spec, up) {
  const k = `${player.id}:${itemId}`;
  let e = municao.get(k);
  const max = Math.round(spec.pente * (1 + 0.25 * up.pente));
  if (!e) {
    e = { balas: max, recarregandoAte: 0, ultimoTiro: -999 };
    municao.set(k, e);
  }
  e.max = max;
  return e;
}

function mostrarMunicao(player, spec, e) {
  const b = getBatalha();
  let txt;
  if (tick() < e.recarregandoAte) {
    const f = 1 - (e.recarregandoAte - tick()) / e.duracaoRecarga;
    const n = Math.round(f * 10);
    txt = `§e${spec.nome} §7RECARREGANDO §6${"|".repeat(n)}§8${"|".repeat(10 - n)}`;
  } else {
    const cor = e.balas / e.max < 0.25 ? "§c" : "§f";
    txt = `§e${spec.nome} ${cor}§l${e.balas}§r§7/${e.max}`;
  }
  if (b && b.participa(player)) txt += `  §8| ${b.placar()}`;
  hudArmaAte.set(player.id, tick() + 30);
  try {
    player.onScreenDisplay.setActionBar(txt);
  } catch {
    // tela indisponível
  }
}

function iniciarRecarga(player, spec, e, up) {
  if (tick() < e.recarregandoAte || e.balas >= e.max) return;
  e.duracaoRecarga = Math.round(spec.recarga * (1 - 0.15 * up.pente));
  e.recarregandoAte = tick() + e.duracaoRecarga;
  try {
    world.playSound("gm.recarga", player.location, { volume: 0.8, pitch: spec.foguete ? 0.7 : 1 });
  } catch {
    // som indisponível
  }
  system.runTimeout(() => {
    e.balas = e.max;
    if (player.isValid()) mostrarMunicao(player, spec, e);
  }, e.duracaoRecarga);
  mostrarMunicao(player, spec, e);
}

// ---------------------------------------------------------------- raio de tiro

const TAMANHOS = { tanque: [3.2, 2.4], blindado: [2.8, 2.4], comando: [2.0, 1.6] };

function caixa(e) {
  const l = e.location;
  let w = 0.8;
  let h = 1.9;
  const m = /_(tanque|blindado|comando)(_p)?$/.exec(e.typeId);
  if (m) [w, h] = TAMANHOS[m[1]];
  else if (e.typeId === "minecraft:player") [w, h] = [0.7, 1.8];
  return { min: { x: l.x - w / 2, y: l.y, z: l.z - w / 2 }, max: { x: l.x + w / 2, y: l.y + h, z: l.z + w / 2 } };
}

function raioCaixa(o, d, bx) {
  let t0 = 0;
  let t1 = Infinity;
  for (const k of ["x", "y", "z"]) {
    if (Math.abs(d[k]) < 1e-9) {
      if (o[k] < bx.min[k] || o[k] > bx.max[k]) return null;
    } else {
      let a = (bx.min[k] - o[k]) / d[k];
      let b = (bx.max[k] - o[k]) / d[k];
      if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a);
      t1 = Math.min(t1, b);
      if (t0 > t1) return null;
    }
  }
  return t0;
}

function aliado(player, e) {
  const f = faccaoDoJogador(player);
  if (!f) return false;
  if (e.typeId === "minecraft:player") return e.hasTag(`gm_aliado_${f}`);
  return temFamilia(e, `gm_${f}`);
}

/** Traça um raio a partir dos olhos com dispersão; devolve o primeiro inimigo e o ponto final. */
function tracarTiro(player, alcance, dispersao, ignorar) {
  const o = player.getHeadLocation();
  const v = player.getViewDirection();
  const d = { x: v.x + rand(-dispersao, dispersao), y: v.y + rand(-dispersao, dispersao), z: v.z + rand(-dispersao, dispersao) };
  const n = Math.hypot(d.x, d.y, d.z) || 1;
  d.x /= n;
  d.y /= n;
  d.z /= n;
  let max = alcance;
  try {
    const hit = player.dimension.getBlockFromRay(o, d, { maxDistance: alcance });
    if (hit) {
      const p = hit.block.location;
      const f = hit.faceLocation;
      max = Math.min(max, Math.hypot(p.x + f.x - o.x, p.y + f.y - o.y, p.z + f.z - o.z));
    }
  } catch {
    // sem bloco no caminho
  }
  let alvo = null;
  for (const e of player.dimension.getEntities({ location: o, maxDistance: max + 3 })) {
    if (e.id === player.id || e.id === ignorar?.id || e.typeId === "minecraft:item" || temFamilia(e, "gm_projetil") || aliado(player, e)) continue;
    const t = raioCaixa(o, d, caixa(e));
    if (t !== null && t <= max) {
      max = t;
      alvo = e;
    }
  }
  return { alvo, origem: o, dir: d, ponto: { x: o.x + d.x * max, y: o.y + d.y * max, z: o.z + d.z * max }, dist: max };
}

function particulas(dim, id, de, ate, passo, vars) {
  const dx = ate.x - de.x;
  const dy = ate.y - de.y;
  const dz = ate.z - de.z;
  const dist = Math.hypot(dx, dy, dz);
  const n = Math.min(60, Math.ceil(dist / passo));
  for (let i = 1; i <= n; i++) {
    const t = i / n;
    try {
      dim.spawnParticle(id, { x: de.x + dx * t, y: de.y + dy * t, z: de.z + dz * t }, vars);
    } catch {
      return;
    }
  }
}

function explodir(player, ponto, raio, danoExtra, alvo) {
  try {
    player.dimension.createExplosion(ponto, raio, { breaksBlocks: false, causesFire: false, source: player });
    world.playSound("gm.explosao", ponto, { volume: 1.2 + raio / 4 });
  } catch {
    // explosão indisponível
  }
  if (alvo && danoExtra) {
    try {
      alvo.applyDamage(danoExtra, { cause: "entityExplosion", damagingEntity: player });
    } catch {
      // alvo não recebe dano
    }
  }
}

// ---------------------------------------------------------------- disparo

/** Dispara uma vez a arma em mãos. Devolve false se não pôde atirar. */
export function disparar(player, itemId) {
  const spec = especArma(player, itemId);
  if (!spec) {
    if (itemId.startsWith("gm:disparo_")) player.onScreenDisplay.setActionBar("§7Entre num veículo para usar esta arma.");
    return false;
  }
  const up = carregarPerfil(player).up;
  const e = estado(player, itemId, spec, up);
  if (tick() < e.recarregandoAte) {
    mostrarMunicao(player, spec, e);
    return false;
  }
  // recarga manual: usar agachado (exceto o rifle de precisão, que usa o agachar para mirar)
  if (player.isSneaking && !spec.mira && e.balas < e.max && !itemId.startsWith("gm:disparo_")) {
    iniciarRecarga(player, spec, e, up);
    return false;
  }
  if (tick() - e.ultimoTiro < spec.cadencia) return false;
  if (e.balas <= 0) {
    iniciarRecarga(player, spec, e, up);
    return false;
  }
  e.balas--;
  e.ultimoTiro = tick();
  const veic = veiculoMontado(player);
  const mirando = spec.mira && player.isSneaking;
  const dispersao = mirando ? 0.0015 : spec.dispersao * (player.isSneaking ? 0.6 : 1);
  const tiro = tracarTiro(player, spec.alcance, dispersao, veic?.entidade);
  const dim = player.dimension;
  const cano = { x: tiro.origem.x + tiro.dir.x * 1.2, y: tiro.origem.y - 0.2 + tiro.dir.y * 1.2, z: tiro.origem.z + tiro.dir.z * 1.2 };
  const somEm = veic ? veic.entidade.location : player.location;
  try {
    world.playSound(spec.som, somEm, { volume: spec.foguete ? 2 : 1.4, pitch: (spec.pitch ?? 1) * rand(0.95, 1.05) });
    dim.spawnParticle("minecraft:basic_flame_particle", cano);
  } catch {
    // efeito indisponível
  }
  const dano = spec.dano * (1 + 0.15 * up.dano);

  if (spec.foguete) {
    // projétil explosivo com voo visível (rastro de fumaça)
    const vel = spec.veloz ? 8 : 3.5;
    const passos = Math.max(1, Math.ceil(tiro.dist / vel));
    for (let i = 1; i <= passos; i++) {
      system.runTimeout(() => {
        const t0 = (i - 1) / passos;
        const t1 = i / passos;
        const de = { x: cano.x + (tiro.ponto.x - cano.x) * t0, y: cano.y + (tiro.ponto.y - cano.y) * t0, z: cano.z + (tiro.ponto.z - cano.z) * t0 };
        const ate = { x: cano.x + (tiro.ponto.x - cano.x) * t1, y: cano.y + (tiro.ponto.y - cano.y) * t1, z: cano.z + (tiro.ponto.z - cano.z) * t1 };
        particulas(dim, spec.veloz ? "gm:tracante" : "minecraft:basic_smoke_particle", de, ate, 0.6);
      }, i);
    }
    system.runTimeout(() => {
      if (player.isValid()) explodir(player, tiro.ponto, spec.foguete, dano, tiro.alvo?.isValid() ? tiro.alvo : null);
    }, passos + 1);
  } else {
    particulas(dim, "gm:tracante", cano, tiro.ponto, 1.4);
    if (tiro.alvo) {
      try {
        tiro.alvo.applyDamage(dano, { cause: "entityAttack", damagingEntity: player });
      } catch {
        // alvo não recebe dano
      }
    } else if (tiro.dist < spec.alcance && Math.random() < 0.35) {
      try {
        dim.spawnParticle("minecraft:basic_smoke_particle", tiro.ponto);
        world.playSound("gm.impacto", tiro.ponto, { volume: 0.6 });
      } catch {
        // efeito indisponível
      }
    }
  }
  if (e.balas <= 0) iniciarRecarga(player, spec, e, up);
  else mostrarMunicao(player, spec, e);
  return true;
}

/** Tiro automático enquanto o item é segurado. */
export function iniciarAutomatico(player, itemId) {
  const spec = especArma(player, itemId);
  if (!spec?.auto) return;
  pararAutomatico(player);
  const id = system.runInterval(() => {
    if (!player.isValid()) return pararAutomatico(player);
    disparar(player, itemId);
  }, spec.cadencia);
  automaticos.set(player.id, id);
  disparar(player, itemId);
}

export function pararAutomatico(player) {
  const id = automaticos.get(player.id);
  if (id !== undefined) system.clearRun(id);
  automaticos.delete(player.id);
}

// ---------------------------------------------------------------- outros itens

export function usarGranada(player, itemStack) {
  if (recarga(player, "granada", 20)) return;
  const tiro = tracarTiro(player, 24, 0, null);
  const ponto = tiro.dist < 1.5 ? { x: tiro.origem.x + tiro.dir.x * 14, y: tiro.origem.y - 1, z: tiro.origem.z + tiro.dir.z * 14 } : tiro.ponto;
  consumir(player, itemStack.typeId);
  world.playSound("random.bow", player.location, { pitch: 0.6 });
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
    if (player.isValid()) explodir(player, ponto, 3.2, 0, null);
  }, 30);
}

export function usarKitMedico(player, itemStack) {
  if (recarga(player, "kit", 60)) return;
  const h = vida(player);
  if (h && h.currentValue >= h.effectiveMax) return player.onScreenDisplay.setActionBar("§7Você já está com a vida cheia.");
  consumir(player, itemStack.typeId);
  if (h) h.setCurrentValue(Math.min(h.effectiveMax, h.currentValue + 8));
  player.addEffect("regeneration", 100, { amplifier: 1, showParticles: true });
  player.playSound("random.drink");
  player.onScreenDisplay.setActionBar("§a+ Curativo aplicado");
}

function consumir(player, typeId) {
  try {
    if (player.getGameMode?.() === "creative") return;
    const inv = player.getComponent("inventory").container;
    const slot = player.selectedSlot;
    const item = inv.getItem(slot);
    if (item?.typeId !== typeId) return;
    if (item.amount > 1) {
      item.amount--;
      inv.setItem(slot, item);
    } else inv.setItem(slot, undefined);
  } catch {
    // não foi possível consumir
  }
}

/** Barragem de artilharia no ponto mirado. Devolve mensagem de erro ou null. */
export function artilharia(player) {
  const up = carregarPerfil(player).up;
  const r = recarga(player, "artilharia", 1500 - up.artilharia * 300);
  if (r) return `Artilharia recarregando: ${r}s`;
  const { ponto } = tracarTiro(player, 160, 0, veiculoMontado(player)?.entidade);
  const dim = player.dimension;
  const disparos = 8 + up.artilharia * 3;
  world.playSound("gm.radio", player.location);
  player.onScreenDisplay.setActionBar("§c§lARTILHARIA A CAMINHO! §r§7Saia da área!");
  for (let i = 0; i < disparos; i++) {
    const p = { x: ponto.x + rand(-6, 6), y: ponto.y, z: ponto.z + rand(-6, 6) };
    const quando = 50 + i * 6;
    system.runTimeout(() => {
      try {
        world.playSound("gm.assobio", p, { volume: 1.5 });
      } catch {
        // som indisponível
      }
    }, quando - 30);
    system.runTimeout(() => {
      if (!player.isValid()) return;
      explodir(player, p, 3.5, 0, null);
      try {
        dim.spawnParticle("minecraft:huge_explosion_emitter", p);
      } catch {
        // partícula indisponível
      }
    }, quando);
  }
  return null;
}

/** Chama um esquadrão aliado perto do jogador. */
export function chamarReforcos(player) {
  const b = getBatalha();
  const f = faccaoDoJogador(player);
  if (!b || b.estado !== "combate" || !f) return "Reforços só durante uma batalha, lutando por uma facção.";
  const up = carregarPerfil(player).up;
  const r = b.cooldown(player, "reforcos", 1100 - up.reforcos * 200);
  if (r) return `Reforços a caminho em ${r}s`;
  const tipos = ["fuzileiro", "fuzileiro", "metralhador", "medico", "bazuca"];
  for (let i = 0; i < up.reforcos; i++) tipos.push("fuzileiro");
  const n = b.enviarEsquadrao(b.base(f), tipos, player.location);
  world.playSound("gm.radio", player.location);
  return n ? null : "Não foi possível posicionar os reforços aqui.";
}

/** Entrega um veículo pilotável perto do jogador. */
export function pedirVeiculo(player, tipo) {
  const f = faccaoDoJogador(player);
  if (!f) return "Escolha uma facção numa batalha para pedir veículos.";
  const r = recarga(player, `veiculo_${tipo}`, tipo === "tanque" ? 3000 : 2000);
  if (r) return `Próximo ${tipo === "tanque" ? "tanque" : "blindado"} disponível em ${r}s`;
  const d = player.getViewDirection();
  const h = Math.hypot(d.x, d.z) || 1;
  const l = player.location;
  try {
    const v = player.dimension.spawnEntity(`gm:${f}_${tipo}_p`, { x: l.x + (d.x / h) * 5, y: l.y + 0.5, z: l.z + (d.z / h) * 5 });
    v.nameTag = `§a${tipo === "tanque" ? "Tanque" : "Blindado"} de ${player.name}`;
    world.playSound("gm.motor", v.location, { volume: 1 });
  } catch {
    return "Sem espaço para o veículo aqui.";
  }
  return null;
}

/** Zoom do rifle de precisão: lentidão forte enquanto o jogador está agachado com ele na mão. */
export function atualizarMiras() {
  for (const p of world.getAllPlayers()) {
    try {
      if (!p.isSneaking) continue;
      const item = p.getComponent("inventory")?.container?.getItem(p.selectedSlot);
      if (item?.typeId !== "gm:sniper") continue;
      p.addEffect("slowness", 6, { amplifier: 6, showParticles: false });
    } catch {
      // jogador indisponível
    }
  }
}

export function itemNaMao(player) {
  try {
    return player.getComponent("inventory")?.container?.getItem(player.selectedSlot)?.typeId ?? null;
  } catch {
    return null;
  }
}

