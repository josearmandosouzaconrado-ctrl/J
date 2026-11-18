// Tanque Sherman: dirigir (WASD, a frente segue o olhar), canhão de 75 mm e metralhadora .50
import { system, world } from '@minecraft/server';

const TANQUE = 'sherman:m4a3';
const CANHAO = 'sherman:granada_75';
const MG = 'sherman:metralhadora_50';
const RECARGA_CANHAO = 60; // ticks (3 s)
const RECARGA_MG = 3;
const DIMENSOES = ['minecraft:overworld', 'minecraft:nether', 'minecraft:the_end'];

const recarga = new Map(); // id do tanque -> { canhao, mg }

const somar = (a, b, k = 1) => ({ x: a.x + b.x * k, y: a.y + b.y * k, z: a.z + b.z * k });
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const grausNorm = (a) => ((a % 360) + 540) % 360 - 180;

function tanqueDe(jogador) {
  try {
    const r = jogador.getComponent('minecraft:riding');
    const e = r?.entityRidingOn;
    return e && e.typeId === TANQUE ? e : undefined;
  } catch { return undefined; }
}

function quebraBlocos() {
  return world.getDynamicProperty('sherman:quebra_blocos') !== false;
}

// onde o tiro acerta: o bloco ou a entidade mais perto na linha da mira
function mirar(tanque, jogador, alcance) {
  const dir = jogador.getViewDirection();
  const dim = tanque.dimension;
  const origem = somar(somar(tanque.location, { x: 0, y: 2.25, z: 0 }), dir, 3.6);
  let alvo = { local: somar(origem, dir, alcance), entidade: undefined, distancia: alcance };
  try {
    const b = dim.getBlockFromRay(origem, dir, { maxDistance: alcance, includeLiquidBlocks: false, includePassableBlocks: false });
    if (b) {
      const l = { x: b.block.x + b.faceLocation.x, y: b.block.y + b.faceLocation.y, z: b.block.z + b.faceLocation.z };
      alvo = { local: l, entidade: undefined, distancia: dist(origem, l) };
    }
  } catch { /* fora do mundo carregado */ }
  try {
    const caronas = new Set((tanque.getComponent('minecraft:rideable')?.getRiders() ?? []).map((r) => r.id));
    for (const h of dim.getEntitiesFromRay(origem, dir, { maxDistance: alcance })) {
      const e = h.entity;
      if (e.id === tanque.id || caronas.has(e.id)) continue;
      if (h.distance < alvo.distancia) alvo = { local: e.location, entidade: e, distancia: h.distance };
      break;
    }
  } catch { /* nada */ }
  return { origem, dir, ...alvo };
}

function rastro(dim, origem, dir, distancia, particula, passo) {
  for (let d = 0; d < distancia; d += passo) {
    try { dim.spawnParticle(particula, somar(origem, dir, d)); } catch { /* chunk descarregado */ }
  }
}

function atirarCanhao(tanque, jogador) {
  const r = recarga.get(tanque.id) ?? { canhao: 0, mg: 0 };
  if (system.currentTick < r.canhao) {
    const s = Math.ceil((r.canhao - system.currentTick) / 20);
    jogador.onScreenDisplay?.setActionBar(`§cRecarregando o canhão... ${s}s`);
    return false;
  }
  r.canhao = system.currentTick + RECARGA_CANHAO;
  recarga.set(tanque.id, r);
  const dim = tanque.dimension;
  const t = mirar(tanque, jogador, 160);
  tanque.triggerEvent('sherman:atirar');
  system.runTimeout(() => { try { tanque.triggerEvent('sherman:parar_tiro'); } catch { /* tanque sumiu */ } }, 12);
  dim.playSound('sherman.canhao', tanque.location, { volume: 4 });
  try { dim.spawnParticle('minecraft:huge_explosion_emitter', t.origem); } catch { /* nada */ }
  for (let i = 0; i < 4; i++) {
    try { dim.spawnParticle('minecraft:large_explosion', somar(tanque.location, { x: (Math.random() - 0.5) * 3, y: 0.3, z: (Math.random() - 0.5) * 4 })); } catch { /* nada */ }
  }
  rastro(dim, t.origem, t.dir, t.distancia, 'minecraft:basic_smoke_particle', 2.5);
  // a granada voa a ~8 blocos por tick
  system.runTimeout(() => {
    try {
      if (t.entidade?.isValid()) t.entidade.applyDamage(40, { cause: 'entityExplosion', damagingEntity: jogador });
      dim.createExplosion(t.local, 3.5, { breaksBlocks: quebraBlocos(), causesFire: false, source: jogador });
      dim.playSound('sherman.impacto', t.local, { volume: 3 });
    } catch { /* fora do mundo carregado */ }
  }, Math.max(1, Math.round(t.distancia / 8)));
  return true;
}

function atirarMG(tanque, jogador) {
  const r = recarga.get(tanque.id) ?? { canhao: 0, mg: 0 };
  if (system.currentTick < r.mg) return false;
  r.mg = system.currentTick + RECARGA_MG;
  recarga.set(tanque.id, r);
  const dim = tanque.dimension;
  const t = mirar(tanque, jogador, 70);
  dim.playSound('sherman.metralhadora', tanque.location, { volume: 2 });
  rastro(dim, t.origem, t.dir, Math.min(t.distancia, 40), 'minecraft:basic_crit_particle', 3);
  if (t.entidade?.isValid()) {
    try { t.entidade.applyDamage(7, { cause: 'projectile', damagingEntity: jogador }); } catch { /* imune */ }
  }
  return true;
}

function usarItem(ev) {
  const { source: jogador, itemStack: item } = ev;
  if (!item || (item.typeId !== CANHAO && item.typeId !== MG)) return;
  const tanque = tanqueDe(jogador);
  if (!tanque) {
    jogador.onScreenDisplay?.setActionBar('§eSuba no Sherman para atirar (clique com o botão direito no tanque).');
    return;
  }
  if (item.typeId === CANHAO) atirarCanhao(tanque, jogador);
  else atirarMG(tanque, jogador);
}

// torre e canhão seguem o olhar do comandante; fumaça do escapamento e painel na tela
function atualizar() {
  for (const id of DIMENSOES) {
    let tanques = [];
    try { tanques = world.getDimension(id).getEntities({ type: TANQUE }); } catch { continue; }
    for (const tanque of tanques) {
      const caronas = tanque.getComponent('minecraft:rideable')?.getRiders() ?? [];
      const cmd = caronas.find((c) => c.typeId === 'minecraft:player');
      let torre = 0, elev = 0;
      if (cmd) {
        const rj = cmd.getRotation(), rt = tanque.getRotation();
        torre = Math.round(Math.max(-180, Math.min(180, grausNorm(rj.y - rt.y))));
        elev = Math.round(Math.max(-10, Math.min(20, -rj.x)));
        const vida = tanque.getComponent('minecraft:health');
        const r = recarga.get(tanque.id);
        const pronto = !r || system.currentTick >= r.canhao;
        cmd.onScreenDisplay?.setActionBar(`§2SHERMAN§r  Blindagem §a${Math.ceil(vida?.currentValue ?? 0)}§7/${vida?.effectiveMax ?? 0}`
          + `   Canhão ${pronto ? '§aPRONTO' : '§cRECARREGANDO'}`);
        const v = tanque.getVelocity?.() ?? { x: 0, z: 0 };
        if (Math.hypot(v.x, v.z) > 0.02 && system.currentTick % 8 === 0) {
          const rad = (rt.y * Math.PI) / 180;
          const traseira = { x: tanque.location.x + Math.sin(rad) * 2.9, y: tanque.location.y + 1.9, z: tanque.location.z - Math.cos(rad) * 2.9 };
          try { tanque.dimension.spawnParticle('minecraft:basic_smoke_particle', traseira); } catch { /* nada */ }
          tanque.dimension.playSound('sherman.motor', tanque.location, { volume: 0.8 });
        }
      }
      try {
        if (tanque.getProperty('sherman:torre') !== torre) tanque.setProperty('sherman:torre', torre);
        if (tanque.getProperty('sherman:elevacao') !== elev) tanque.setProperty('sherman:elevacao', elev);
      } catch { /* entidade sendo removida */ }
    }
  }
}

function morte(ev) {
  const e = ev.deadEntity;
  if (e.typeId !== TANQUE) return;
  try {
    e.dimension.createExplosion(e.location, 4, { breaksBlocks: false, causesFire: true });
    e.dimension.spawnParticle('minecraft:huge_explosion_emitter', e.location);
  } catch { /* nada */ }
  recarga.delete(e.id);
}

function comando(ev) {
  if (ev.id === 'sherman:quebrar_blocos') {
    const ligado = ev.message.trim() !== 'nao';
    world.setDynamicProperty('sherman:quebra_blocos', ligado);
    world.sendMessage(ligado ? '§eO canhão do Sherman agora destrói blocos.' : '§eO canhão do Sherman não destrói mais blocos.');
  }
}

export function iniciar() {
  world.afterEvents.itemUse.subscribe(usarItem);
  world.afterEvents.entityDie.subscribe(morte);
  system.afterEvents.scriptEventReceive.subscribe(comando);
  system.runInterval(atualizar, 2);
}

iniciar();
export const _interno = { mirar, atirarCanhao, atirarMG, recarga };
