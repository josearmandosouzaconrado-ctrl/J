// COMANDO DA LEGIÃO: ordens por grupo, formações de verdade e soldados que pensam sozinhos.
//
// Ordens (menu "Ordens à legião" do Sistema ou o Bastão do Centurião):
//   seguir     marcham atrás do general em formação (legionários na frente, arqueiros atrás,
//              cavalaria nos flancos) e entram na luta sozinhos se o inimigo chegar perto
//   formacao   linha de batalha parada no lugar que o general marcou, virada para onde ele olhava
//   testudo    a tartaruga: formação fechada com escudos (resistência, mas andam devagar)
//   atacar     carga contra os inimigos onde o general apontou; dividem os alvos entre si,
//              a cavalaria chega pelo lado e os arqueiros atiram de longe
//   defender   guarda-costas: anel em volta do general, interceptam quem se aproximar
//   aguardar   ficam parados
//   guarda     vão patrulhar o forte ou a torre mais perto
//
// Inteligência automática em qualquer ordem: feridos recuam para trás da linha e se curam,
// arqueiros mantêm distância dos inimigos, ninguém fica preso (se travar, dá a volta),
// quem se perder longe reaparece perto do general, e o centurião avisa o que está acontecendo.
import { world, system } from '@minecraft/server';
import { ActionFormData } from '@minecraft/server-ui';
import { chao, emCombate, valido, ROMANOS } from './obras.js';

export const ORDENS = {
  seguir: { nome: 'Sigam-me', desc: 'Marcham atrás de você em formação', icone: 'textures/items/compass_item' },
  formacao: { nome: 'Linha de batalha aqui', desc: 'Formam a linha onde você está, virados para onde olha', icone: 'textures/items/iron_sword' },
  testudo: { nome: 'Testudo!', desc: 'Formação de escudos: resistem muito mais, andam devagar', icone: 'textures/items/shield' },
  atacar: { nome: 'Atacar!', desc: 'Carga contra os inimigos para onde você olha', icone: 'textures/items/diamond_sword' },
  defender: { nome: 'Protejam o General', desc: 'Guarda-costas em volta de você', icone: 'textures/items/iron_chestplate' },
  aguardar: { nome: 'Aguardem aqui', desc: 'Ficam parados onde estão', icone: 'textures/items/clock_item' },
  guarda: { nome: 'Montem guarda', desc: 'Patrulham o forte ou a torre mais perto', icone: 'textures/items/spyglass' },
};
const GRUPOS = {
  todos: { nome: 'Toda a legião', tipos: ROMANOS },
  legionarios: { nome: 'Legionários', tipos: ['romano:legionario'] },
  arqueiros: { nome: 'Arqueiros', tipos: ['romano:sagitario'] },
  cavalaria: { nome: 'Cavalaria', tipos: ['romano:cavaleiro'] },
};
const ORDEM_GRUPO = ['todos', 'legionarios', 'arqueiros', 'cavalaria'];
const CENTURIAO = '§6[Centurião]§f';
const PASSO = { 'romano:legionario': 1.0, 'romano:sagitario': 1.0, 'romano:cavaleiro': 1.8 }; // blocos a cada 0,25 s
const ALCANCE_ARCO = 12;

// ------------------------------------------------------------------ dados do general
function dadosCmd(p) {
  let d = null;
  try { const s = p.getDynamicProperty('comando'); if (typeof s === 'string') d = JSON.parse(s); } catch (e) { /* novo */ }
  d ??= {};
  d.grupo ??= 'todos';
  return d;
}
function guardarCmd(p, d) {
  try { p.setDynamicProperty('comando', JSON.stringify(d)); } catch (e) { /* ok */ }
}

export function legiaoDe(p, grupo = 'todos') {
  return GRUPOS[grupo].tipos.flatMap((type) => {
    try { return p.dimension.getEntities({ type, tags: [`dono_${p.id}`] }); } catch (e) { return []; }
  }).filter(valido);
}
export function ordemDe(e) {
  const t = e.getTags().find((x) => x.startsWith('ordem:'));
  return t ? t.slice(6) : (e.hasTag('seguindo') ? 'seguir' : 'aguardar');
}
function marcarOrdem(e, ordem) {
  for (const t of e.getTags()) if (t.startsWith('ordem:')) e.removeTag(t);
  e.addTag(`ordem:${ordem}`);
  // "seguindo" = sob comando direto (as obras e as patrulhas não pegam esse soldado)
  if (ordem === 'guarda') e.removeTag('seguindo'); else e.addTag('seguindo');
  if (ordem !== 'testudo') tirarTestudo(e);
}
export function novoRecruta(e) {
  marcarOrdem(e, 'seguir');
}

// ------------------------------------------------------------------ geometria
const horiz = (v) => { const n = Math.hypot(v.x, v.z) || 1; return { x: v.x / n, z: v.z / n }; };
const d2 = (a, b) => (a.x - b.x) ** 2 + (a.z - b.z) ** 2;
const inimigosPerto = (dim, local, raio) => {
  try { return dim.getEntities({ families: ['barbaro'], location: local, maxDistance: raio }).filter(valido); } catch (e) { return []; }
};
function vida01(e) {
  const h = e.getComponent('minecraft:health');
  return h ? h.currentValue / h.effectiveMax : 1;
}
function prop(e, n) { try { return e.getProperty(n); } catch (err) { return undefined; } }
function evento(e, n) { try { e.triggerEvent(n); } catch (err) { /* sem esse evento */ } }

// vagas da formação: origem, frente (f) e direita (r); legionários em fileiras de 5,
// arqueiros atrás e cavaleiros nas pontas
function vagas(unidades, origem, frente, atras, fechada) {
  const f = horiz(frente), r = { x: -f.z, z: f.x };
  const esp = fechada ? 1.05 : 1.7;
  const ponto = (lado, prof) => ({ x: origem.x + r.x * lado - f.x * prof, y: origem.y, z: origem.z + r.z * lado - f.z * prof });
  const leg = unidades.filter((e) => e.typeId === 'romano:legionario');
  const arq = unidades.filter((e) => e.typeId === 'romano:sagitario');
  const cav = unidades.filter((e) => e.typeId === 'romano:cavaleiro');
  const mapa = new Map();
  const larg = fechada ? 4 : 5;
  leg.forEach((e, i) => {
    const fil = Math.floor(i / larg), col = i % larg, n = Math.min(larg, leg.length - fil * larg);
    mapa.set(e.id, ponto((col - (n - 1) / 2) * esp, atras + fil * (fechada ? 1.05 : 1.8)));
  });
  const fundo = atras + Math.ceil(leg.length / larg) * 1.8 + 1.5;
  arq.forEach((e, i) => {
    const fil = Math.floor(i / 6), col = i % 6, n = Math.min(6, arq.length - fil * 6);
    mapa.set(e.id, ponto((col - (n - 1) / 2) * 1.8, fundo + fil * 1.8));
  });
  cav.forEach((e, i) => {
    const lado = i % 2 === 0 ? 1 : -1, k = Math.floor(i / 2);
    mapa.set(e.id, ponto(lado * (Math.max(larg, 3) * esp / 2 + 3 + k * 2.2), atras + 1 + k * 1.2));
  });
  return mapa;
}

// ------------------------------------------------------------------ movimento
const travados = new Map();  // id -> { x, z, n }
function andar(e, alvo, passo, olhar) {
  const p = e.location;
  const dx = alvo.x - p.x, dz = alvo.z - p.z;
  const dist = Math.hypot(dx, dz);
  if (dist < 0.4) return dist;
  if (dist > 40) {  // perdido: reaparece no lugar
    const y = chao(e.dimension, Math.floor(alvo.x), Math.floor(alvo.z), Math.floor(alvo.y)) ?? alvo.y;
    try { e.teleport({ x: alvo.x, y, z: alvo.z }, { facingLocation: olhar ?? alvo }); } catch (err) { /* ok */ }
    return 0;
  }
  const k = Math.min(1, passo / dist);
  let tentativas = [[dx * k, dz * k]];
  const t = travados.get(e.id);
  if (t && t.n >= 2) {  // travado: tenta contornar pelos lados
    const lado = t.n % 4 < 2 ? 1 : -1;
    tentativas = [[(dx * k) * 0.3 - dz * k * lado, (dz * k) * 0.3 + dx * k * lado], ...tentativas];
  }
  for (const [mx, mz] of tentativas) {
    const nx = p.x + mx, nz = p.z + mz;
    const y = chao(e.dimension, Math.floor(nx), Math.floor(nz), Math.floor(p.y));
    if (y === null || y - p.y > 1.1 || p.y - y > 3) continue;
    try {
      e.teleport({ x: nx, y, z: nz }, { facingLocation: olhar ?? { x: nx + mx * 4, y: y + 1.5, z: nz + mz * 4 } });
    } catch (err) { return dist; }
    travados.delete(e.id);
    return dist;
  }
  const n = (t?.n ?? 0) + 1;
  travados.set(e.id, { n });
  if (n > 16 && dist < 40) {  // preso de vez: pula para a vaga
    const y = chao(e.dimension, Math.floor(alvo.x), Math.floor(alvo.z), Math.floor(alvo.y));
    if (y !== null) try { e.teleport({ x: alvo.x, y, z: alvo.z }); } catch (err) { /* ok */ }
    travados.delete(e.id);
  }
  return dist;
}
function marchar(e, sim) {
  const ja = e.hasTag('marchando_cmd');
  if (sim && !ja) { e.addTag('marchando_cmd'); evento(e, 'romano:marchar'); }
  if (!sim && ja) { e.removeTag('marchando_cmd'); evento(e, 'romano:parar'); }
}
function emMissao(e, sim) {
  if (sim) e.addTag('em_missao'); else e.removeTag('em_missao');
}
function tirarTestudo(e) {
  if (!e.hasTag('testudo')) return;
  e.removeTag('testudo');
  try { e.removeEffect('resistance'); e.removeEffect('slowness'); } catch (err) { /* ok */ }
}

// ------------------------------------------------------------------ cérebro de cada soldado
// distribui os inimigos: cada alvo recebe no máximo alguns soldados, os mais perto primeiro
function distribuirAlvos(unidades, inimigos) {
  const carga = new Map(inimigos.map((i) => [i.id, 0]));
  const alvo = new Map();
  const ordenadas = [...unidades].sort((a, b) => a.typeId.localeCompare(b.typeId));
  for (const u of ordenadas) {
    let melhor = null, nota = Infinity;
    for (const i of inimigos) {
      const v = vida01(i);
      const n = Math.sqrt(d2(u.location, i.location)) + carga.get(i.id) * 5 + v * 4;
      if (n < nota) { nota = n; melhor = i; }
    }
    if (melhor) { alvo.set(u.id, melhor); carga.set(melhor.id, carga.get(melhor.id) + 1); }
  }
  return alvo;
}

function irAoAlvo(u, alvo) {
  const passo = PASSO[u.typeId];
  if (u.typeId === 'romano:sagitario') {
    // arqueiro: fica a ~12 blocos, de frente, e deixa o arco trabalhar
    const d = Math.sqrt(d2(u.location, alvo.location));
    if (d > ALCANCE_ARCO + 2) andar(u, alvo.location, passo, alvo.location);
    else if (d < ALCANCE_ARCO - 5) recuarDe(u, alvo.location, passo);
    else try { u.teleport(u.location, { facingLocation: alvo.location }); } catch (e) { /* ok */ }
    return;
  }
  if (u.typeId === 'romano:cavaleiro' && d2(u.location, alvo.location) > 36) {
    // cavalaria ataca pelo flanco: mira um ponto ao lado do inimigo
    const v = horiz({ x: alvo.location.x - u.location.x, z: alvo.location.z - u.location.z });
    const lado = (Number(u.id) || u.id.length) % 2 ? 1 : -1;
    andar(u, { x: alvo.location.x - v.z * 4 * lado, y: alvo.location.y, z: alvo.location.z + v.x * 4 * lado }, passo, alvo.location);
    return;
  }
  if (d2(u.location, alvo.location) > 2.2) andar(u, alvo.location, passo, alvo.location);
}
function recuarDe(u, de, passo) {
  const v = horiz({ x: u.location.x - de.x, z: u.location.z - de.z });
  andar(u, { x: u.location.x + v.x * 3, y: u.location.y, z: u.location.z + v.z * 3 }, passo, de);
}

const avisos = new Map();  // jogador -> { chave: tick }
function avisar(p, chave, texto, intervalo = 300) {
  const m = avisos.get(p.id) ?? {};
  const t = system.currentTick;
  if (m[chave] && t - m[chave] < intervalo) return;
  m[chave] = t;
  avisos.set(p.id, m);
  p.sendMessage(`${CENTURIAO} ${texto}`);
}

function comandarJogador(p, tick) {
  const dim = p.dimension;
  const d = dadosCmd(p);
  const todos = legiaoDe(p);
  if (!todos.length) return;
  const livres = todos.filter((e) => !e.hasTag('obra') && !e.hasTag('guarda'));
  const porOrdem = {};
  for (const e of livres) (porOrdem[ordemDe(e)] ??= []).push(e);
  const olhar = p.getViewDirection();
  const ameacas = inimigosPerto(dim, p.location, 18);

  // feridos (menos de 35% de vida) com inimigo perto recuam para trás do general
  const feridos = new Set();
  for (const e of livres) {
    // entra em recuo abaixo de 35% de vida com inimigo perto e só volta à luta com 60%
    const v = vida01(e);
    if (v >= 0.6) { e.removeTag('ferido'); continue; }
    if (!e.hasTag('ferido') && (v >= 0.35 || !inimigosPerto(dim, e.location, 10).length)) continue;
    feridos.add(e.id);
    if (!e.hasTag('ferido')) { e.addTag('ferido'); avisar(p, 'ferido', 'Temos feridos! Recuando para trás da linha.', 200); }
    const f = horiz(olhar);
    andar(e, { x: p.location.x - f.x * 6, y: p.location.y, z: p.location.z - f.z * 6 }, PASSO[e.typeId] * 1.2);
    try { e.addEffect('regeneration', 40, { amplifier: 0, showParticles: false }); } catch (err) { /* ok */ }
  }

  for (const [ordem, lista] of Object.entries(porOrdem)) {
    let ativos = lista.filter((e) => !feridos.has(e.id));
    if (!ativos.length) continue;
    if (ordem === 'aguardar' || ordem === 'guarda') { ativos.forEach((e) => { marchar(e, false); emMissao(e, false); }); continue; }

    if (ordem === 'atacar') {
      const ponto = d.alvo ?? p.location;
      let inimigos = inimigosPerto(dim, ponto, 20);
      if (!inimigos.length) inimigos = inimigosPerto(dim, p.location, 24);
      if (!inimigos.length) {
        ativos.forEach((e) => { marcarOrdem(e, 'seguir'); emMissao(e, false); });
        p.onScreenDisplay?.setTitle?.('§6§lVITÓRIA!', { subtitle: '§fOs inimigos fugiram ou caíram. A legião volta a seguir você.', fadeInDuration: 5, stayDuration: 50, fadeOutDuration: 15 });
        avisar(p, 'vitoria', 'Área limpa, General! Voltamos a segui-lo.', 60);
        continue;
      }
      const alvos = distribuirAlvos(ativos, inimigos);
      for (const u of ativos) {
        emMissao(u, true);
        marchar(u, false);
        if (emCombate(u) && u.typeId !== 'romano:sagitario') continue;  // já está lutando
        const a = alvos.get(u.id);
        if (a) irAoAlvo(u, a);
      }
      continue;
    }

    if (ordem === 'defender') {
      const n = ativos.length;
      ativos.forEach((u, i) => {
        const perto = ameacas.filter((a) => d2(a.location, p.location) < 12 * 12);
        if (perto.length) {
          emMissao(u, true);
          const a = perto.sort((x, y) => d2(x.location, u.location) - d2(y.location, u.location))[0];
          if (!emCombate(u) || u.typeId === 'romano:sagitario') irAoAlvo(u, a);
          return;
        }
        emMissao(u, false);
        const ang = (2 * Math.PI * i) / n + tick * 0.0;
        const r = u.typeId === 'romano:cavaleiro' ? 5 : 2.6;
        andar(u, { x: p.location.x + Math.cos(ang) * r, y: p.location.y, z: p.location.z + Math.sin(ang) * r }, PASSO[u.typeId] * 1.3,
          { x: p.location.x + Math.cos(ang) * 10, y: p.location.y + 1.5, z: p.location.z + Math.sin(ang) * 10 });
      });
      continue;
    }

    // seguir, formacao e testudo: vagas de formação
    let origem, frente, atras;
    if (ordem === 'seguir') {
      origem = p.location; frente = olhar; atras = 3;
      // inimigo chegou perto do general: quem estiver mais perto entra na luta sozinho
      if (ameacas.length) {
        const alvos = distribuirAlvos(ativos.filter((u) => d2(u.location, p.location) < 20 * 20), ameacas);
        avisar(p, 'contato', `Inimigos à vista (${ameacas.length})! A legião entra em combate.`, 400);
        for (const u of ativos) {
          const a = alvos.get(u.id);
          if (!a) continue;
          emMissao(u, true); marchar(u, false);
          if (!emCombate(u) || u.typeId === 'romano:sagitario') irAoAlvo(u, a);
        }
        ativos = ativos.filter((u) => !alvos.has(u.id));  // os outros continuam em formação
        if (!ativos.length) continue;
      }
    } else {
      const f = d[ordem] ?? { x: p.location.x, y: p.location.y, z: p.location.z, fx: olhar.x, fz: olhar.z };
      origem = f; frente = { x: f.fx, z: f.fz }; atras = 0;
    }
    const mapa = vagas(ativos, origem, frente, atras, ordem === 'testudo');
    const fh = horiz(frente);
    const frenteLonge = { x: origem.x + fh.x * 30, y: origem.y + 1.5, z: origem.z + fh.z * 30 };
    for (const u of ativos) {
      const vaga = mapa.get(u.id);
      if (!vaga) continue;
      if (ordem === 'testudo' && u.typeId === 'romano:legionario' && !u.hasTag('testudo')) {
        u.addTag('testudo');
        try { u.addEffect('resistance', 20000000, { amplifier: 2, showParticles: false }); u.addEffect('slowness', 20000000, { amplifier: 1, showParticles: false }); } catch (err) { /* ok */ }
      }
      // em linha: luta com quem encostar, mas não sai correndo atrás (volta para a vaga)
      const longe = d2(u.location, vaga);
      if (emCombate(u) && longe < (ordem === 'seguir' ? 14 * 14 : 9 * 9)) { marchar(u, false); continue; }
      if (prop(u, 'romano:acao') && ordem === 'seguir' && longe < 18 * 18) continue;  // comendo ou bebendo
      emMissao(u, false);
      const passo = PASSO[u.typeId] * (ordem === 'testudo' ? 0.5 : longe > 64 ? 1.4 : 1);
      const dist = andar(u, vaga, passo, ordem === 'seguir' && longe > 4 ? undefined : frenteLonge);
      marchar(u, dist > 1.5);
    }
  }

  // painel quando está com o bastão na mão
  try {
    const mao = p.getComponent('minecraft:equippable')?.getEquipment('Mainhand');
    if (mao?.typeId === 'batalha:bastao' && tick % 2 === 0) {
      const conta = (o) => livres.filter((e) => ordemDe(e) === o).length;
      const partes = Object.keys(ORDENS).filter((o) => conta(o)).map((o) => `${ORDENS[o].nome} §e${conta(o)}§f`);
      p.onScreenDisplay.setActionBar(`§6Legião §f${todos.length}  §7|§f ${partes.join(' §7|§f ')}`
        + `${feridos.size ? `  §c${feridos.size} feridos` : ''}${ameacas.length ? `  §4${ameacas.length} inimigos perto` : ''}`
        + `\n§7Grupo: §f${GRUPOS[d.grupo].nome}  §7(clique: atacar onde olha | agachado: ordens)`);
    }
  } catch (e) { /* ok */ }
}

export function comandar(tick) {
  for (const p of world.getPlayers()) {
    try { comandarJogador(p, tick); } catch (e) { console.warn(`[comando] ${e}`); }
  }
}

// ------------------------------------------------------------------ dar ordens
export function darOrdem(p, ordem, grupo) {
  const d = dadosCmd(p);
  grupo ??= d.grupo;
  const unidades = legiaoDe(p, grupo).filter((e) => !e.hasTag('obra'));
  if (!unidades.length) {
    p.sendMessage(`${CENTURIAO} §cNão há ${GRUPOS[grupo].nome.toLowerCase()} sob seu comando. Recrute no Sistema.`);
    return 0;
  }
  const v = p.getViewDirection();
  if (ordem === 'formacao' || ordem === 'testudo') {
    d[ordem] = { x: p.location.x, y: p.location.y, z: p.location.z, fx: v.x, fz: v.z };
  }
  if (ordem === 'atacar') {
    let alvo = null;
    try {
      const hit = p.getEntitiesFromViewDirection({ maxDistance: 64 }).find((h) => h.entity.getComponent('minecraft:type_family')?.hasTypeFamily('barbaro'));
      if (hit) alvo = hit.entity.location;
    } catch (e) { /* sem raycast */ }
    if (!alvo) {
      try {
        const b = p.getBlockFromViewDirection({ maxDistance: 64 });
        if (b) alvo = { x: b.block.x + 0.5, y: b.block.y + 1, z: b.block.z + 0.5 };
      } catch (e) { /* ok */ }
    }
    alvo ??= { x: p.location.x + v.x * 16, y: p.location.y, z: p.location.z + v.z * 16 };
    const inimigos = inimigosPerto(p.dimension, alvo, 20).length || inimigosPerto(p.dimension, p.location, 24).length;
    if (!inimigos) {
      // nenhum inimigo lá: avançam e formam a linha no ponto apontado
      d.formacao = { x: alvo.x, y: alvo.y, z: alvo.z, fx: v.x, fz: v.z };
      ordem = 'formacao';
      p.sendMessage(`${CENTURIAO} Nenhum inimigo ali, General. Avançamos e formamos a linha naquele ponto.`);
    } else {
      d.alvo = alvo;
    }
  }
  d.ultima = ordem;
  guardarCmd(p, d);
  for (const e of unidades) {
    marcarOrdem(e, ordem);
    if (ordem === 'guarda') { e.removeTag('em_missao'); marchar(e, false); }
  }
  const respostas = {
    seguir: 'Legião, em marcha! Seguimos o General.',
    formacao: 'Formar linha! Escudos à frente, arqueiros atrás!',
    testudo: 'TESTUDO! Escudos juntos, ninguém passa!',
    atacar: 'Pela glória de Roma! AO ATAQUE!',
    defender: 'Protejam o General com a vida!',
    aguardar: 'Alto! Aguardamos suas ordens.',
    guarda: 'Às muralhas! Vamos montar guarda.',
  };
  p.sendMessage(`${CENTURIAO} ${respostas[ordem]} §7(${unidades.length} ${GRUPOS[grupo].nome.toLowerCase()})`);
  try { p.dimension.playSound(ordem === 'atacar' ? 'raid.horn' : 'random.orb', p.location, { volume: ordem === 'atacar' ? 0.6 : 0.8 }); } catch (e) { /* ok */ }
  return unidades.length;
}

async function mostrar(p, form) {
  for (let i = 0; i < 20; i++) {
    const r = await form.show(p);
    if (!(r.canceled && r.cancelationReason === 'UserBusy')) return r;
    await new Promise((ok) => system.runTimeout(ok, 20));
  }
  return { canceled: true };
}

export async function menuOrdens(p, voltar) {
  const d = dadosCmd(p);
  const todos = legiaoDe(p);
  const conta = (g) => legiaoDe(p, g).length;
  const form = new ActionFormData().title('§l§b[ SISTEMA ] §r§fOrdens')
    .body(`§fLegião: §c${todos.length} §7(${conta('legionarios')} legionários, ${conta('arqueiros')} arqueiros, ${conta('cavalaria')} cavaleiros)\n`
      + `§fOrdens para: §e${GRUPOS[d.grupo].nome}`)
    .button(`§fTrocar grupo §7(agora: ${GRUPOS[d.grupo].nome})`, 'textures/items/name_tag');
  const chaves = Object.keys(ORDENS);
  for (const k of chaves) form.button(`§f${ORDENS[k].nome}\n§r§7${ORDENS[k].desc}`, ORDENS[k].icone);
  if (voltar) form.button('Voltar');
  const r = await mostrar(p, form);
  if (r.canceled) return;
  if (r.selection === 0) {
    d.grupo = ORDEM_GRUPO[(ORDEM_GRUPO.indexOf(d.grupo) + 1) % ORDEM_GRUPO.length];
    guardarCmd(p, d);
    return menuOrdens(p, voltar);
  }
  if (r.selection === chaves.length + 1) return voltar?.(p);
  darOrdem(p, chaves[r.selection - 1]);
}

// bastão do centurião: clique = atacar onde olha; agachado = menu de ordens
export function iniciarComando() {
  world.afterEvents.itemUse.subscribe((ev) => {
    const p = ev.source;
    if (ev.itemStack?.typeId !== 'batalha:bastao' || p?.typeId !== 'minecraft:player') return;
    if (p.isSneaking) menuOrdens(p);
    else darOrdem(p, 'atacar');
  });
  system.afterEvents.scriptEventReceive.subscribe((ev) => {
    if (!ev.id.startsWith('legiao:')) return;
    const p = ev.sourceEntity;
    if (p?.typeId !== 'minecraft:player') return;
    const ordem = ev.id.slice(7);
    if (ordem === 'menu') menuOrdens(p);
    else if (ORDENS[ordem]) darOrdem(p, ordem, GRUPOS[ev.message.trim()] ? ev.message.trim() : undefined);
  });
}

export const _interno = { vagas, distribuirAlvos, dadosCmd };
