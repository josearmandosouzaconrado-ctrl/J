// Obras e patrulhas dos legionários.
//
// Obras: os legionários (ou o próprio Sistema, se não houver soldados) erguem as
// construções de plano.js bloco a bloco. Patrulha: quando uma construção fica pronta,
// soldados livres sobem nela: vigias ficam nas torres olhando em volta e rondas andam de
// um lado para o outro na passarela. Se aparece inimigo, eles descem para lutar.
import { world, system } from '@minecraft/server';
import { PLANOS, girar, rotPara } from './plano.js';

export const ROMANO = 'romano:legionario';
export const ROMANOS = ['romano:legionario', 'romano:sagitario', 'romano:cavaleiro'];
const CHAVE = 'batalha:estado';
const MAX_CONSTRUTORES = 4;
const DIST_ENTRE_POSTOS = 40;

let estado = null;
const ouvintes = { concluida: [] };
export const aoConcluir = (f) => ouvintes.concluida.push(f);

// ------------------------------------------------------------------ estado salvo no mundo
export function obterEstado() {
  if (estado) return estado;
  try {
    const s = world.getDynamicProperty(CHAVE);
    if (typeof s === 'string') estado = JSON.parse(s);
  } catch (e) { /* mundo novo */ }
  estado ??= { obras: [], postos: [] };
  for (const o of estado.obras) o.tipo ??= 'forte';
  return estado;
}
export function salvar() {
  try { world.setDynamicProperty(CHAVE, JSON.stringify(estado)); } catch (e) { console.warn(`[batalha] ${e}`); }
}

// ------------------------------------------------------------------ utilidades
const SUBSTITUIVEL = /(short_grass|tallgrass|tall_grass|fern|deadbush|dead_bush|snow_layer|flower|dandelion|poppy|tulip|orchid|allium|azure|daisy|cornflower|lily_of_the_valley|sapling|leaf_litter|vine)/;
export const dimensao = () => world.getDimension('overworld');

function bloco(dim, x, y, z) {
  try { return dim.getBlock({ x, y, z }); } catch (e) { return undefined; }
}
function livre(b) {
  return !!b && (b.isAir || SUBSTITUIVEL.test(b.typeId));
}
export function chao(dim, x, z, yRef) {
  for (let y = yRef + 6; y >= yRef - 8; y--) {
    const b = bloco(dim, x, y, z);
    if (!b) return null;
    if (b.isLiquid) return null;
    if (!livre(b)) return y + 1;
  }
  return null;
}
export function valido(e) {
  try { return typeof e.isValid === 'function' ? e.isValid() : e.isValid; } catch (err) { return false; }
}
function propriedade(e, nome) {
  try { return e.getProperty(nome); } catch (err) { return undefined; }
}
export const emCombate = (e) => propriedade(e, 'romano:em_combate') === true;
export const dist2 = (a, b) => (a.x - b.x) ** 2 + (a.z - b.z) ** 2;

export function avisar(dim, local, texto) {
  for (const p of dim.getPlayers({ location: local, maxDistance: 64 })) p.sendMessage(texto);
}
export function som(dim, id, local, volume = 1, pitch = 1) {
  try { dim.playSound(id, local, { volume, pitch }); } catch (e) { /* som opcional */ }
}
export function particula(dim, id, local) {
  try { dim.spawnParticle(id, local); } catch (e) { /* partícula opcional */ }
}
function evento(e, nome) {
  try { e.triggerEvent(nome); } catch (err) { /* entidade sem esse evento */ }
}
function soldados(dim, opcoes) {
  return ROMANOS.flatMap((type) => {
    try { return dim.getEntities({ ...opcoes, type }); } catch (e) { return []; }
  });
}
const ocupado = (e) => e.hasTag('obra') || e.hasTag('guarda') || e.hasTag('seguindo');

// ------------------------------------------------------------------ terreno e obras
function terreno(dim, cx, cy, cz, rot, plano) {
  const alt = [];
  let min = Infinity, max = -Infinity;
  for (let lx = 0; lx < plano.larg; lx++) {
    alt.push([]);
    for (let lz = 0; lz < plano.comp; lz++) {
      const [dx, dz] = girar(lx, lz, rot, plano);
      const h = chao(dim, cx + dx, cz + dz, cy);
      if (h === null) return null;
      alt[lx].push(h);
      min = Math.min(min, h);
      max = Math.max(max, h);
    }
  }
  return max - min <= 4 ? alt : null;
}

export function longeDeTudo(x, z, dist = DIST_ENTRE_POSTOS) {
  const d = dist * dist;
  const e = obterEstado();
  return e.postos.every((p) => dist2(p, { x, z }) > d) && e.obras.every((o) => dist2(o, { x, z }) > d);
}

// tipo: chave de PLANOS; opcoes: { dono (id do jogador), magica (o Sistema constrói sozinho) }
export function iniciarObra(dim, x, y, z, rot, tipo = 'forte', opcoes = {}) {
  const plano = PLANOS[tipo];
  for (const [ox, oz] of [[0, 0], [3, 0], [-3, 0], [0, 3], [0, -3], [5, 5], [-5, -5], [5, -5], [-5, 5]]) {
    const cx = Math.floor(x) + ox, cz = Math.floor(z) + oz;
    const alt = terreno(dim, cx, Math.floor(y), cz, rot, plano);
    if (!alt) continue;
    const obra = { id: Math.floor(Math.random() * 1e9), tipo, x: cx, y: Math.floor(y), z: cz, rot, alt, i: 0,
      dono: opcoes.dono ?? null, magica: !!opcoes.magica };
    obterEstado().obras.push(obra);
    salvar();
    const n = obra.magica ? 0 : recrutar(dim, obra, MAX_CONSTRUTORES);
    const quem = obra.magica ? '§bo Sistema está erguendo' : `os legionários começaram (${n} construindo)`;
    avisar(dim, obra, `§6[Roma] §f${plano.nome}: ${quem} em ${cx}, ${obra.y}, ${cz}.`);
    som(dim, 'random.levelup', { x: cx, y: obra.y, z: cz }, 0.6, 0.7);
    return obra;
  }
  return null;
}

function livreParaObra(e) {
  return valido(e) && e.typeId === ROMANO && !ocupado(e) && !emCombate(e);
}

function recrutar(dim, obra, quantos) {
  const centro = { x: obra.x, y: obra.y, z: obra.z };
  const candidatos = dim.getEntities({ type: ROMANO, location: centro, maxDistance: 32 })
    .filter(livreParaObra)
    .sort((a, b) => dist2(a.location, centro) - dist2(b.location, centro))
    .slice(0, quantos);
  for (const c of candidatos) {
    c.addTag('obra');
    c.addTag(`obra_${obra.id}`);
    evento(c, 'romano:comecar_obra');
  }
  return candidatos.length;
}

function liberar(e, obra) {
  try {
    e.removeTag('obra');
    e.removeTag(`obra_${obra.id}`);
    evento(e, 'romano:terminar_obra');
  } catch (err) { /* já saiu do mundo */ }
}

function posicaoMundo(registro, b) {
  const plano = PLANOS[registro.tipo];
  const [dx, dz] = girar(b.lx, b.lz, registro.rot, plano);
  // o beiral dos telhados sai 1 bloco para fora da planta: usa o chão da coluna mais próxima
  const ax = Math.min(plano.larg - 1, Math.max(0, b.lx)), az = Math.min(plano.comp - 1, Math.max(0, b.lz));
  return { x: registro.x + dx, y: registro.alt[ax][az] + (b.dy ?? b[2]), z: registro.z + dz };
}

// leva o soldado aos poucos até (sx, sy, sz), olhando para "olhar"
function andarAte(e, sx, sy, sz, olhar, passoMax) {
  const p = e.location;
  const d = Math.hypot(sx - p.x, sz - p.z);
  const passo = d < 0.05 ? 1 : Math.min(1, passoMax / d);
  try {
    e.teleport({ x: p.x + (sx - p.x) * passo, y: sy, z: p.z + (sz - p.z) * passo }, { facingLocation: olhar });
  } catch (err) { /* chunk descarregado */ }
  return d;
}

function posicionar(dim, e, obra, alvo, dentro) {
  const lado = dentro ? 1 : -1;
  const vx = (obra.x - alvo.x) * lado, vz = (obra.z - alvo.z) * lado;
  const len = Math.hypot(vx, vz) || 1;
  const sx = alvo.x + 0.5 + (vx / len) * 1.8, sz = alvo.z + 0.5 + (vz / len) * 1.8;
  const sy = chao(dim, Math.floor(sx), Math.floor(sz), obra.y) ?? obra.y;
  if (Math.hypot(sx - e.location.x, sz - e.location.z) < 0.8) return;
  andarAte(e, sx, sy, sz, { x: alvo.x + 0.5, y: alvo.y + 0.5, z: alvo.z + 0.5 }, 1.6);
}

function colocarProximo(dim, obra, construtor) {
  const plano = PLANOS[obra.tipo];
  while (obra.i < plano.blocos.length) {
    const b = plano.blocos[obra.i];
    const pos = posicaoMundo(obra, b);
    const atual = bloco(dim, pos.x, pos.y, pos.z);
    if (!atual) return;  // chunk descarregado: espera
    obra.i++;
    if (!livre(atual)) continue;  // não destrói nada que já esteja ali
    try { atual.setType(b.bloco); } catch (err) { continue; }
    const centro = { x: pos.x + 0.5, y: pos.y + 0.5, z: pos.z + 0.5 };
    if (construtor) {
      posicionar(dim, construtor, obra, pos, b.dentro);
      som(dim, 'dig.wood', centro, 0.8, 0.9 + Math.random() * 0.2);
      if (obra.i % 4 === 0) som(dim, 'random.anvil_use', centro, 0.15, 1.6);
      particula(dim, 'minecraft:villager_happy', centro);
    } else {  // o Sistema constrói: brilho azul e som de cristal
      particula(dim, 'minecraft:totem_particle', centro);
      if (obra.i % 3 === 0) som(dim, 'random.orb', centro, 0.25, 1.4 + Math.random() * 0.4);
    }
    return;
  }
}

function concluir(dim, obra, construtores) {
  for (const c of construtores) liberar(c, obra);
  const e = obterEstado();
  e.obras = e.obras.filter((o) => o !== obra);
  e.postos.push({ id: obra.id, tipo: obra.tipo, x: obra.x, y: obra.y, z: obra.z, rot: obra.rot, alt: obra.alt });
  salvar();
  const topo = { x: obra.x, y: obra.y + 4, z: obra.z };
  som(dim, 'random.levelup', topo, 1, 1);
  particula(dim, 'minecraft:totem_particle', topo);
  avisar(dim, obra, `§6[Roma] §f${PLANOS[obra.tipo].nome} concluído! §7(Ave!) Soldados livres vão montar guarda.`);
  for (const f of ouvintes.concluida) { try { f(obra); } catch (err) { console.warn(`[batalha] ${err}`); } }
}

export function avancarObras(tick) {
  const dim = dimensao();
  const e = obterEstado();
  for (const obra of [...e.obras]) {
    const centro = { x: obra.x, y: obra.y, z: obra.z };
    if (obra.magica) {
      for (let k = 0; k < 5; k++) colocarProximo(dim, obra, null);
      if (obra.i >= PLANOS[obra.tipo].blocos.length) concluir(dim, obra, []);
      continue;
    }
    let construtores;
    try {
      construtores = dim.getEntities({ type: ROMANO, location: centro, maxDistance: 48, tags: [`obra_${obra.id}`] });
    } catch (err) { continue; }  // área descarregada
    for (const c of construtores) if (emCombate(c)) liberar(c, obra);
    construtores = construtores.filter((c) => valido(c) && c.hasTag('obra'));
    if (construtores.length < MAX_CONSTRUTORES && tick % 40 === 0) {
      recrutar(dim, obra, MAX_CONSTRUTORES - construtores.length);
    }
    if (!construtores.length) continue;
    for (const c of construtores) colocarProximo(dim, obra, c);
    if (obra.i >= PLANOS[obra.tipo].blocos.length) concluir(dim, obra, construtores);
  }
  if (tick % 20 === 0) salvar();
}

// os legionários decidem sozinhos erguer um forte
export function pensarEmConstruir() {
  const dim = dimensao();
  const romanos = dim.getEntities({ type: ROMANO }).filter(livreParaObra);
  romanos.sort(() => Math.random() - 0.5);
  for (const r of romanos) {
    const p = r.location;
    const grupo = dim.getEntities({ type: ROMANO, location: p, maxDistance: 10 }).filter(livreParaObra);
    if (grupo.length < 3 || !longeDeTudo(p.x, p.z, 48)) continue;
    if (dim.getEntities({ families: ['barbaro'], location: p, maxDistance: 24 }).length) continue;
    if (Math.random() > 0.35) return;
    const v = r.getViewDirection();
    const n = Math.hypot(v.x, v.z) || 1;
    const cx = p.x + (v.x / n) * 16, cz = p.z + (v.z / n) * 16;
    iniciarObra(dim, cx, p.y, cz, rotPara(p.x - cx, p.z - cz), 'forte');
    return;
  }
}

// feridos longe da luta se curam
export function cuidarDosFeridos() {
  const dim = dimensao();
  for (const r of soldados(dim, {})) {
    const vida = r.getComponent('minecraft:health');
    if (!vida || vida.currentValue > vida.effectiveMax * 0.5) continue;
    if (!dim.getEntities({ families: ['barbaro'], location: r.location, maxDistance: 8 }).length) {
      try { r.addEffect('regeneration', 60, { amplifier: 0, showParticles: true }); } catch (e) { /* sem efeito */ }
    }
  }
}

// ------------------------------------------------------------------ patrulha
const guardas = new Map();  // id da entidade -> { posto, vaga, alvo, marchando, giro }

function vagasDe(posto) {
  const plano = PLANOS[posto.tipo];
  return [
    ...plano.torres.map((t, i) => ({ chave: `t${i}`, tipo: 'torre', ponto: t })),
    ...plano.rondas.map((r, i) => ({ chave: `r${i}`, tipo: 'ronda', ponto: r[0], fim: r[1] })),
  ];
}
const mundo = (posto, ponto) => {
  const p = posicaoMundo(posto, { lx: ponto[0], lz: ponto[1], dy: ponto[2] });
  return { x: p.x + 0.5, y: p.y, z: p.z + 0.5 };
};

function soltarGuarda(e, posto) {
  try {
    e.removeTag('guarda');
    e.removeTag(`guarda_${posto.id}`);
    for (const t of e.getTags()) if (t.startsWith('vaga_')) e.removeTag(t);
    evento(e, 'romano:terminar_guarda');
  } catch (err) { /* saiu do mundo */ }
  guardas.delete(e.id);
}

export function patrulhar(tick) {
  const dim = dimensao();
  for (const posto of obterEstado().postos) {
    if (!posto.alt || !PLANOS[posto.tipo]) continue;
    const centro = { x: posto.x, y: posto.y, z: posto.z };
    let atuais;
    try { atuais = soldados(dim, { location: centro, maxDistance: 64, tags: [`guarda_${posto.id}`] }); } catch (e) { continue; }
    const vagas = vagasDe(posto);
    const ocupadas = new Set();
    for (const g of atuais) {
      const vagaTag = g.getTags().find((t) => t.startsWith('vaga_'));
      const vaga = vagas.find((v) => `vaga_${v.chave}` === vagaTag);
      if (!vaga || emCombate(g)) { soltarGuarda(g, posto); continue; }
      ocupadas.add(vaga.chave);
      let info = guardas.get(g.id);
      if (!info) { info = { posto: posto.id, vaga, alvo: 1, marchando: false, giro: 0 }; guardas.set(g.id, info); }
      moverGuarda(dim, g, posto, info, tick);
    }
    // novas sentinelas a cada 2 s
    if (tick % 8 !== 0) continue;
    for (const vaga of vagas) {
      if (ocupadas.has(vaga.chave)) continue;
      const tipos = vaga.tipo === 'torre' ? ['romano:sagitario', ROMANO] : [ROMANO];
      let escolhido = null;
      for (const type of tipos) {
        let lista = [];
        try { lista = dim.getEntities({ type, location: centro, maxDistance: 40 }); } catch (e) { /* nada */ }
        escolhido = lista.find((e) => valido(e) && !ocupado(e) && !emCombate(e));
        if (escolhido) break;
      }
      if (!escolhido) break;
      escolhido.addTag('guarda');
      escolhido.addTag(`guarda_${posto.id}`);
      escolhido.addTag(`vaga_${vaga.chave}`);
      evento(escolhido, 'romano:comecar_guarda');
      const pos = mundo(posto, vaga.ponto);
      try { escolhido.teleport(pos); } catch (e) { /* longe */ }  // sobe pela escada
      particula(dim, 'minecraft:villager_happy', pos);
      guardas.set(escolhido.id, { posto: posto.id, vaga, alvo: 1, marchando: false, giro: 0 });
      ocupadas.add(vaga.chave);
    }
  }
}

function moverGuarda(dim, g, posto, info, tick) {
  const { vaga } = info;
  if (vaga.tipo === 'torre') {
    const pos = mundo(posto, vaga.ponto);
    if (dist2(g.location, pos) > 36) { soltarGuarda(g, posto); return; }  // caiu da torre
    if (tick % 12 === 0) {  // vigia olhando em volta
      info.giro += 1.2 + Math.random();
      try {
        g.teleport(pos, { facingLocation: { x: pos.x + Math.sin(info.giro) * 10, y: pos.y + 1, z: pos.z + Math.cos(info.giro) * 10 } });
      } catch (e) { /* longe */ }
    }
    return;
  }
  const a = mundo(posto, vaga.ponto), b = mundo(posto, vaga.fim);
  const alvo = info.alvo ? b : a;
  if (Math.min(dist2(g.location, a), dist2(g.location, b)) > 400) { soltarGuarda(g, posto); return; }
  const d = andarAte(g, alvo.x, alvo.y, alvo.z, { x: alvo.x, y: alvo.y + 1.5, z: alvo.z }, 0.22);
  const marchando = d > 0.3;
  if (!marchando) info.alvo = 1 - info.alvo;  // chegou na ponta: dá meia-volta
  if (marchando !== info.marchando) {
    info.marchando = marchando;
    evento(g, marchando ? 'romano:marchar' : 'romano:parar');
  }
}
