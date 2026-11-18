// Batalha Romana: ponto de entrada dos scripts.
//
//   obras.js    legionários constroem fortes, torres e muralhas e depois patrulham
//   sistema.js  o Sistema estilo anime: general, missões, poderes, construir, recrutar
//   plano.js    as plantas das construções
//   vida.js     fome, sede, sono, comer, beber, dormir e conversas com voz (dialogos.js)
//
// Comandos: /function posto_avancado (forte), /function cancelar_obras,
//           /function sistema (abre o Sistema)
import { system } from '@minecraft/server';
import { rotPara } from './plano.js';
import {
  obterEstado, salvar, iniciarObra, avancarObras, pensarEmConstruir, cuidarDosFeridos, patrulhar,
  dimensao, ROMANO, valido, emCombate,
} from './obras.js';
import { iniciarSistema, seguirGeneral } from './sistema.js';
import { iniciarVida } from './vida.js';

let tick = 0;

system.afterEvents.scriptEventReceive.subscribe((ev) => {
  const quem = ev.sourceEntity;
  if (ev.id === 'romano:construir') {
    if (!quem) return;
    const dim = quem.dimension;
    if (dim.id !== 'minecraft:overworld') return quem.sendMessage?.('§c[Roma] Só dá para construir na superfície.');
    const perto = dim.getEntities({ type: ROMANO, location: quem.location, maxDistance: 32 })
      .filter((e) => valido(e) && !e.hasTag('obra') && !emCombate(e));
    if (!perto.length) return quem.sendMessage?.('§c[Roma] Não há legionários livres por perto (até 32 blocos).');
    const v = quem.getViewDirection();
    const n = Math.hypot(v.x, v.z) || 1;
    const cx = quem.location.x + (v.x / n) * 16, cz = quem.location.z + (v.z / n) * 16;
    const obra = iniciarObra(dim, cx, quem.location.y, cz, rotPara(quem.location.x - cx, quem.location.z - cz), 'forte');
    if (!obra) quem.sendMessage?.('§c[Roma] O terreno ali é muito irregular ou tem água. Tente num lugar mais plano.');
  } else if (ev.id === 'romano:cancelar') {
    const dim = dimensao();
    const estado = obterEstado();
    for (const obra of estado.obras) {
      for (const c of dim.getEntities({ type: ROMANO, tags: [`obra_${obra.id}`] })) {
        c.removeTag('obra'); c.removeTag(`obra_${obra.id}`);
        try { c.triggerEvent('romano:terminar_obra'); } catch (e) { /* ok */ }
      }
    }
    estado.obras = [];
    salvar();
    quem?.sendMessage?.('§6[Roma] §fObras canceladas.');
  }
});

iniciarSistema();
iniciarVida();

system.runInterval(() => {
  tick++;
  try {
    avancarObras(tick);
    patrulhar(tick);
    if (tick % 120 === 0) pensarEmConstruir();
    if (tick % 8 === 0) { cuidarDosFeridos(); seguirGeneral(); }
  } catch (e) {
    console.warn(`[batalha] ${e}`);
  }
}, 5);
