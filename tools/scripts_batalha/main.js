// Batalha Romana: IA de construção dos legionários.
//
// Os legionários constroem sozinhos um posto avançado de madeira quando estão
// em grupo (3 ou mais), sem inimigos por perto e sem outro posto num raio de 48
// blocos. O jogador também pode mandar construir: /scriptevent romano:construir
// (ou /function posto_avancado). Os blocos aparecem um por um enquanto os
// soldados martelam ao lado; se um inimigo aparece, eles largam o martelo,
// lutam e depois voltam à obra.
import { world, system } from '@minecraft/server';
import { planoPosto, girar, rotPara, TAM } from './plano.js';

const ROMANO = 'romano:legionario';
const CHAVE = 'batalha:estado';
const PLANO = planoPosto();
const MAX_CONSTRUTORES = 4;
const DIST_ENTRE_POSTOS = 48;

let estado = null;
let tick = 0;

// ------------------------------------------------------------------ estado salvo no mundo
function carregar() {
  try {
    const s = world.getDynamicProperty(CHAVE);
    if (typeof s === 'string') return JSON.parse(s);
  } catch (e) { /* mundo novo */ }
  return { obras: [], postos: [] };
}
function salvar() {
  try { world.setDynamicProperty(CHAVE, JSON.stringify(estado)); } catch (e) { console.warn(`[batalha] ${e}`); }
}

// ------------------------------------------------------------------ utilidades
const SUBSTITUIVEL = /(short_grass|tallgrass|tall_grass|fern|deadbush|dead_bush|snow_layer|flower|dandelion|poppy|tulip|orchid|allium|azure|daisy|cornflower|lily_of_the_valley|sapling|leaf_litter|vine)/;
const dimensao = () => world.getDimension('overworld');

function bloco(dim, x, y, z) {
  try { return dim.getBlock({ x, y, z }); } catch (e) { return undefined; }
}
function livre(b) {
  return !!b && (b.isAir || SUBSTITUIVEL.test(b.typeId));
}
function chao(dim, x, z, yRef) {
  for (let y = yRef + 6; y >= yRef - 8; y--) {
    const b = bloco(dim, x, y, z);
    if (!b) return null;
    if (b.isLiquid) return null;
    if (!livre(b)) return y + 1;
  }
  return null;
}
function valido(e) {
  try { return typeof e.isValid === 'function' ? e.isValid() : e.isValid; } catch (err) { return false; }
}
function propriedade(e, nome) {
  try { return e.getProperty(nome); } catch (err) { return undefined; }
}
const emCombate = (e) => propriedade(e, 'romano:em_combate') === true;
const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.z - b.z) ** 2;

function avisar(dim, local, texto) {
  for (const p of dim.getPlayers({ location: local, maxDistance: 64 })) p.sendMessage(texto);
}
function som(dim, id, local, volume = 1, pitch = 1) {
  try { dim.playSound(id, local, { volume, pitch }); } catch (e) { /* som opcional */ }
}
function particula(dim, id, local) {
  try { dim.spawnParticle(id, local); } catch (e) { /* partícula opcional */ }
}

// ------------------------------------------------------------------ terreno e obras
function terreno(dim, cx, cy, cz, rot) {
  const alt = [];
  let min = Infinity, max = -Infinity;
  for (let lx = 0; lx < TAM; lx++) {
    alt.push([]);
    for (let lz = 0; lz < TAM; lz++) {
      const [dx, dz] = girar(lx, lz, rot);
      const h = chao(dim, cx + dx, cz + dz, cy);
      if (h === null) return null;
      alt[lx].push(h);
      min = Math.min(min, h);
      max = Math.max(max, h);
    }
  }
  return max - min <= 4 ? alt : null;
}

function longeDeTudo(x, z) {
  const d = DIST_ENTRE_POSTOS * DIST_ENTRE_POSTOS;
  return estado.postos.every((p) => dist2(p, { x, z }) > d) && estado.obras.every((o) => dist2(o, { x, z }) > d);
}

function iniciarObra(dim, x, y, z, rot) {
  for (const [ox, oz] of [[0, 0], [3, 0], [-3, 0], [0, 3], [0, -3], [5, 5], [-5, -5], [5, -5], [-5, 5]]) {
    const cx = Math.floor(x) + ox, cz = Math.floor(z) + oz;
    const alt = terreno(dim, cx, Math.floor(y), cz, rot);
    if (!alt) continue;
    const obra = { id: Math.floor(Math.random() * 1e9), x: cx, y: Math.floor(y), z: cz, rot, alt, i: 0 };
    estado.obras.push(obra);
    salvar();
    const n = recrutar(dim, obra, MAX_CONSTRUTORES);
    avisar(dim, obra, `§6[Roma] §fOs legionários começaram um posto avançado (${n} construindo) em ${cx}, ${obra.y}, ${cz}.`);
    som(dim, 'random.levelup', { x: cx, y: obra.y, z: cz }, 0.6, 0.7);
    return obra;
  }
  return null;
}

function livreParaObra(e) {
  return valido(e) && !e.hasTag('obra') && !emCombate(e);
}

function recrutar(dim, obra, quantos) {
  const centro = { x: obra.x, y: obra.y, z: obra.z };
  const candidatos = dim.getEntities({ type: ROMANO, location: centro, maxDistance: 28 })
    .filter(livreParaObra)
    .sort((a, b) => dist2(a.location, centro) - dist2(b.location, centro))
    .slice(0, quantos);
  for (const c of candidatos) {
    c.addTag('obra');
    c.addTag(`obra_${obra.id}`);
    c.triggerEvent('romano:comecar_obra');
  }
  return candidatos.length;
}

function liberar(e, obra) {
  try {
    e.removeTag('obra');
    e.removeTag(`obra_${obra.id}`);
    e.triggerEvent('romano:terminar_obra');
  } catch (err) { /* já saiu do mundo */ }
}

function posicaoMundo(obra, b) {
  const [dx, dz] = girar(b.lx, b.lz, obra.rot);
  // o beiral dos telhados sai 1 bloco para fora da planta: usa o chão da coluna mais próxima
  const ax = Math.min(TAM - 1, Math.max(0, b.lx)), az = Math.min(TAM - 1, Math.max(0, b.lz));
  return { x: obra.x + dx, y: obra.alt[ax][az] + b.dy, z: obra.z + dz };
}

// leva o construtor para perto do bloco, olhando para ele: muro e torres são
// feitos pelo lado de fora (ninguém fica preso), o acampamento pelo lado de dentro
function posicionar(dim, e, obra, alvo, dentro) {
  const lado = dentro ? 1 : -1;
  const vx = (obra.x - alvo.x) * lado, vz = (obra.z - alvo.z) * lado;
  const len = Math.hypot(vx, vz) || 1;
  const sx = alvo.x + 0.5 + (vx / len) * 1.8, sz = alvo.z + 0.5 + (vz / len) * 1.8;
  const sy = chao(dim, Math.floor(sx), Math.floor(sz), obra.y) ?? obra.y;
  const p = e.location;
  const d = Math.hypot(sx - p.x, sz - p.z);
  if (d < 0.8) return;
  const passo = Math.min(1, 1.6 / d);  // caminha um pouco por vez em vez de pular
  try {
    e.teleport({ x: p.x + (sx - p.x) * passo, y: sy, z: p.z + (sz - p.z) * passo },
      { facingLocation: { x: alvo.x + 0.5, y: alvo.y + 0.5, z: alvo.z + 0.5 } });
  } catch (err) { /* chunk descarregado */ }
}

function colocarProximo(dim, obra, construtor) {
  while (obra.i < PLANO.length) {
    const b = PLANO[obra.i];
    const pos = posicaoMundo(obra, b);
    const atual = bloco(dim, pos.x, pos.y, pos.z);
    if (!atual) return;  // chunk descarregado: espera
    obra.i++;
    if (!livre(atual)) continue;  // já tem algo ali (não destrói blocos do jogador)
    try { atual.setType(b.bloco); } catch (err) { continue; }
    posicionar(dim, construtor, obra, pos, b.dentro);
    const centro = { x: pos.x + 0.5, y: pos.y + 0.5, z: pos.z + 0.5 };
    som(dim, 'dig.wood', centro, 0.8, 0.9 + Math.random() * 0.2);
    if (obra.i % 4 === 0) som(dim, 'random.anvil_use', centro, 0.15, 1.6);
    particula(dim, 'minecraft:villager_happy', centro);
    return;
  }
}

function concluir(dim, obra, construtores) {
  for (const c of construtores) liberar(c, obra);
  estado.obras = estado.obras.filter((o) => o !== obra);
  estado.postos.push({ x: obra.x, z: obra.z });
  salvar();
  const topo = { x: obra.x, y: obra.y + 4, z: obra.z };
  som(dim, 'random.levelup', topo, 1, 1);
  particula(dim, 'minecraft:totem_particle', topo);
  avisar(dim, obra, '§6[Roma] §fPosto avançado concluído! §7(Ave!)');
}

function avancarObras() {
  const dim = dimensao();
  for (const obra of [...estado.obras]) {
    const centro = { x: obra.x, y: obra.y, z: obra.z };
    let construtores;
    try {
      construtores = dim.getEntities({ type: ROMANO, location: centro, maxDistance: 40, tags: [`obra_${obra.id}`] });
    } catch (e) { continue; }  // área descarregada
    // quem entrou em combate larga o martelo
    for (const c of construtores) if (emCombate(c)) liberar(c, obra);
    construtores = construtores.filter((c) => valido(c) && c.hasTag('obra'));
    if (construtores.length < MAX_CONSTRUTORES && tick % 40 === 0) {
      recrutar(dim, obra, MAX_CONSTRUTORES - construtores.length);
    }
    if (!construtores.length) continue;
    for (const c of construtores) colocarProximo(dim, obra, c);
    if (obra.i >= PLANO.length) concluir(dim, obra, construtores);
  }
  if (tick % 20 === 0) salvar();
}

// ------------------------------------------------------------------ decisão de construir sozinho
function pensarEmConstruir() {
  const dim = dimensao();
  const romanos = dim.getEntities({ type: ROMANO }).filter(livreParaObra);
  romanos.sort(() => Math.random() - 0.5);
  for (const r of romanos) {
    const p = r.location;
    const grupo = dim.getEntities({ type: ROMANO, location: p, maxDistance: 10 }).filter(livreParaObra);
    if (grupo.length < 3 || !longeDeTudo(p.x, p.z)) continue;
    if (dim.getEntities({ families: ['barbaro'], location: p, maxDistance: 24 }).length) continue;
    if (Math.random() > 0.35) return;
    const v = r.getViewDirection();
    const n = Math.hypot(v.x, v.z) || 1;
    const cx = p.x + (v.x / n) * 7, cz = p.z + (v.z / n) * 7;
    iniciarObra(dim, cx, p.y, cz, rotPara(p.x - cx, p.z - cz));
    return;
  }
}

// ------------------------------------------------------------------ médico: feridos longe da luta se curam
function cuidarDosFeridos() {
  const dim = dimensao();
  for (const r of dim.getEntities({ type: ROMANO })) {
    const vida = r.getComponent('minecraft:health');
    if (!vida || vida.currentValue > vida.effectiveMax * 0.5) continue;
    const perigo = dim.getEntities({ families: ['barbaro'], location: r.location, maxDistance: 8 }).length;
    if (!perigo) {
      try { r.addEffect('regeneration', 60, { amplifier: 0, showParticles: true }); } catch (e) { /* sem efeito */ }
    }
  }
}

// ------------------------------------------------------------------ comandos
system.afterEvents.scriptEventReceive.subscribe((ev) => {
  if (!estado) estado = carregar();
  const quem = ev.sourceEntity;
  if (ev.id === 'romano:construir') {
    if (!quem) return;
    const dim = quem.dimension;
    if (dim.id !== 'minecraft:overworld') return quem.sendMessage?.('§c[Roma] Só dá para construir na superfície.');
    const perto = dim.getEntities({ type: ROMANO, location: quem.location, maxDistance: 32 }).filter(livreParaObra);
    if (!perto.length) return quem.sendMessage?.('§c[Roma] Não há legionários livres por perto (até 32 blocos).');
    const v = quem.getViewDirection();
    const n = Math.hypot(v.x, v.z) || 1;
    const cx = quem.location.x + (v.x / n) * 9, cz = quem.location.z + (v.z / n) * 9;
    const obra = iniciarObra(dim, cx, quem.location.y, cz, rotPara(quem.location.x - cx, quem.location.z - cz));
    if (!obra) quem.sendMessage?.('§c[Roma] O terreno ali é muito irregular ou tem água. Tente num lugar mais plano.');
  } else if (ev.id === 'romano:cancelar') {
    const dim = dimensao();
    for (const obra of estado.obras) {
      for (const c of dim.getEntities({ type: ROMANO, tags: [`obra_${obra.id}`] })) liberar(c, obra);
    }
    estado.obras = [];
    salvar();
    quem?.sendMessage?.('§6[Roma] §fObras canceladas.');
  }
});

system.runInterval(() => {
  if (!estado) estado = carregar();
  tick++;
  try {
    avancarObras();
    if (tick % 120 === 0) pensarEmConstruir();
    if (tick % 8 === 0) cuidarDosFeridos();
  } catch (e) {
    console.warn(`[batalha] ${e}`);
  }
}, 5);
