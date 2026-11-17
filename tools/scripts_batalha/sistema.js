// O SISTEMA: janela no estilo dos animes de "outro mundo".
//
// Na primeira vez que o jogador entra no mundo, o Sistema aparece, o escolhe como
// General de Roma e o veste com a armadura de general. Depois ele abre o menu com o
// item "Sistema" (ou /function sistema): status, missões, poderes, construir,
// recrutar e ordens para a legião.
import { world, system, ItemStack, EquipmentSlot } from '@minecraft/server';
import { ActionFormData, MessageFormData } from '@minecraft/server-ui';
import { PLANOS, rotPara } from './plano.js';
import { iniciarObra, aoConcluir, dimensao, emCombate, valido, ROMANOS } from './obras.js';

const BARBAROS = ['inimigo:guerreiro_gaules', 'inimigo:guerreiro_germano', 'inimigo:arqueiro_parto'];
const AZUL = '§b', OURO = '§6', CINZA = '§7', BRANCO = '§f', VERDE = '§a', VERM = '§c';
const LINHA = '§3================================';
const TITULO = '§l§b[ SISTEMA ]';

// ------------------------------------------------------------------ dados do jogador
function dados(p) {
  let d = null;
  try { const s = p.getDynamicProperty('sistema'); if (typeof s === 'string') d = JSON.parse(s); } catch (e) { /* novo */ }
  d ??= {};
  d.nivel ??= 1; d.xp ??= 0; d.denarios ??= 200;
  d.poderes ??= ['grito']; d.missoes ??= {};
  d.cont ??= {};
  for (const k of ['abates', 'abates_legiao', 'construcoes', 'recrutas', 'poderes_usados', 'menus']) d.cont[k] ??= 0;
  d.titulo ??= 'General de Roma';
  return d;
}
function guardar(p, d) {
  try { p.setDynamicProperty('sistema', JSON.stringify(d)); } catch (e) { console.warn(`[sistema] ${e}`); }
}
const proximoNivel = (n) => 100 + 60 * (n - 1);

function aviso(p, titulo, sub, som = 'random.orb') {
  try {
    p.onScreenDisplay.setTitle(titulo, { subtitle: sub, fadeInDuration: 5, stayDuration: 50, fadeOutDuration: 15 });
  } catch (e) { p.sendMessage(`${titulo} ${sub}`); }
  try { p.playSound(som, { volume: 1, pitch: 1 }); } catch (e) { /* som opcional */ }
}

function ganharXp(p, d, xp, denarios = 0) {
  d.xp += xp;
  d.denarios += denarios;
  while (d.xp >= proximoNivel(d.nivel)) {
    d.xp -= proximoNivel(d.nivel);
    d.nivel++;
    d.denarios += 50;
    aviso(p, '§l§bLEVEL UP!', `${BRANCO}Nível ${OURO}${d.nivel}${BRANCO}  (+50 denários)`, 'random.levelup');
    try { p.addEffect('instant_health', 1, { amplifier: 2 }); } catch (e) { /* cura opcional */ }
  }
}

// ------------------------------------------------------------------ poderes
const PODERES = {
  grito: { nome: 'Grito de Guerra', cd: 45, desc: 'Legião ganha força e velocidade; bárbaros perto ficam fracos e lentos.' },
  escudos: { nome: 'Muralha de Escudos', cd: 60, desc: 'Você e a legião ganham resistência por 15 s.' },
  minerva: { nome: 'Bênção de Minerva', cd: 75, desc: 'Cura você e todos os soldados romanos perto.' },
  cavalaria: { nome: 'Chamar a Cavalaria', cd: 150, desc: 'Três cavaleiros romanos chegam galopando.' },
  flechas: { nome: 'Chuva de Flechas', cd: 50, desc: 'Flechas caem do céu sobre os inimigos à sua frente.' },
  marte: { nome: 'Fúria de Marte', cd: 90, desc: 'Força II, velocidade e regeneração por 20 s.' },
  jupiter: { nome: 'Raio de Júpiter', cd: 120, desc: 'Raios atingem até 6 inimigos perto.' },
};
const recargas = new Map();

function efeito(e, tipo, dur, amp = 0) {
  try { e.addEffect(tipo, dur, { amplifier: amp, showParticles: true }); } catch (err) { /* sem efeito */ }
}
function proximos(dim, local, raio, ids) {
  return ids.flatMap((type) => {
    try { return dim.getEntities({ type, location: local, maxDistance: raio }); } catch (e) { return []; }
  });
}
function particulas(dim, id, local, n = 8, raio = 2) {
  for (let i = 0; i < n; i++) {
    try {
      dim.spawnParticle(id, { x: local.x + (Math.random() - 0.5) * raio * 2, y: local.y + 1 + Math.random() * 2,
        z: local.z + (Math.random() - 0.5) * raio * 2 });
    } catch (e) { /* opcional */ }
  }
}

function usarPoder(p, id) {
  const d = dados(p);
  const poder = PODERES[id];
  const chave = `${p.id}:${id}`;
  const falta = Math.ceil(((recargas.get(chave) ?? 0) - system.currentTick) / 20);
  if (falta > 0) return p.sendMessage(`${TITULO} ${VERM}${poder.nome} recarregando: ${falta} s.`);
  const dim = p.dimension, loc = p.location;
  switch (id) {
    case 'grito':
      for (const r of proximos(dim, loc, 20, ROMANOS)) { efeito(r, 'strength', 400, 1); efeito(r, 'speed', 400, 0); }
      for (const b of proximos(dim, loc, 14, BARBAROS)) { efeito(b, 'weakness', 300, 0); efeito(b, 'slowness', 300, 0); }
      efeito(p, 'strength', 300, 0);
      try { dim.playSound('mob.ravager.roar', loc, { volume: 1, pitch: 0.8 }); } catch (e) { /* opcional */ }
      break;
    case 'escudos':
      for (const r of [p, ...proximos(dim, loc, 14, ROMANOS)]) efeito(r, 'resistance', 300, 1);
      particulas(dim, 'minecraft:villager_happy', loc, 16, 4);
      break;
    case 'minerva':
      for (const r of [p, ...proximos(dim, loc, 16, ROMANOS)]) { efeito(r, 'instant_health', 1, 1); efeito(r, 'regeneration', 200, 1); }
      particulas(dim, 'minecraft:heart_particle', loc, 14, 4);
      break;
    case 'cavalaria': {
      const v = p.getViewDirection(), n = Math.hypot(v.x, v.z) || 1;
      for (let i = -1; i <= 1; i++) {
        const pos = { x: loc.x - (v.x / n) * 4 + (v.z / n) * i * 2.5, y: loc.y, z: loc.z - (v.z / n) * 4 - (v.x / n) * i * 2.5 };
        try {
          const c = dim.spawnEntity('romano:cavaleiro', pos);
          c.addTag(`dono_${p.id}`); c.addTag('seguindo');
          particulas(dim, 'minecraft:totem_particle', pos, 10, 1);
        } catch (e) { /* lugar ruim */ }
      }
      break;
    }
    case 'flechas': {
      const v = p.getViewDirection(), n = Math.hypot(v.x, v.z) || 1;
      const alvo = { x: loc.x + (v.x / n) * 10, y: loc.y, z: loc.z + (v.z / n) * 10 };
      let onda = 0;
      const chuva = system.runInterval(() => {
        for (let i = 0; i < 6; i++) {
          const pos = { x: alvo.x + (Math.random() - 0.5) * 10, y: alvo.y + 14, z: alvo.z + (Math.random() - 0.5) * 10 };
          try { dim.spawnEntity('minecraft:arrow', pos).applyImpulse({ x: 0, y: -2.5, z: 0 }); } catch (e) { /* opcional */ }
        }
        for (const b of proximos(dim, alvo, 7, BARBAROS)) {
          try { b.applyDamage(3, { cause: 'projectile', damagingEntity: p }); } catch (e) { /* já morreu */ }
        }
        if (++onda >= 6) system.clearRun(chuva);
      }, 8);
      break;
    }
    case 'marte':
      efeito(p, 'strength', 400, 1); efeito(p, 'speed', 400, 1); efeito(p, 'regeneration', 400, 0);
      particulas(dim, 'minecraft:lava_particle', loc, 12, 1);
      break;
    case 'jupiter': {
      const alvos = proximos(dim, loc, 18, BARBAROS).slice(0, 6);
      if (!alvos.length) return p.sendMessage(`${TITULO} ${CINZA}Nenhum inimigo por perto.`);
      alvos.forEach((b, i) => system.runTimeout(() => {
        try { if (valido(b)) { dim.spawnEntity('minecraft:lightning_bolt', b.location); b.applyDamage(8, { cause: 'lightning', damagingEntity: p }); } } catch (e) { /* já morreu */ }
      }, i * 6));
      break;
    }
  }
  recargas.set(chave, system.currentTick + poder.cd * 20);
  aviso(p, `${OURO}§l${poder.nome.toUpperCase()}`, `${CINZA}[poder ativado]`, 'beacon.activate');
  d.cont.poderes_usados++;
  verificarMissoes(p, d);
  guardar(p, d);
}

// ------------------------------------------------------------------ missões
const MISSOES = [
  { id: 'despertar', nome: 'O Despertar', desc: 'Abra o Sistema.', meta: (d) => [d.cont.menus, 1], xp: 50, den: 100 },
  { id: 'sangue', nome: 'Primeiro Sangue', desc: 'Derrote 3 bárbaros.', meta: (d) => [d.cont.abates, 3], xp: 120, den: 80, poder: 'escudos' },
  { id: 'legiao', nome: 'Recrute sua Legião', desc: 'Recrute 3 soldados.', meta: (d) => [d.cont.recrutas, 3], xp: 100, den: 150 },
  { id: 'acampamento', nome: 'Erguer o Acampamento', desc: 'Conclua 1 construção.', meta: (d) => [d.cont.construcoes, 1], xp: 150, den: 100, poder: 'minerva' },
  { id: 'poder', nome: 'O Poder do General', desc: 'Use poderes 5 vezes.', meta: (d) => [d.cont.poderes_usados, 5], xp: 120, den: 100, poder: 'cavalaria' },
  { id: 'cacador', nome: 'Caçador de Bárbaros', desc: 'Você e a legião derrotam 15 bárbaros.', meta: (d) => [d.cont.abates + d.cont.abates_legiao, 15], xp: 250, den: 200, poder: 'flechas' },
  { id: 'construtor', nome: 'Mestre Construtor', desc: 'Conclua 3 construções.', meta: (d) => [d.cont.construcoes, 3], xp: 300, den: 250, poder: 'jupiter' },
  { id: 'vitoria', nome: 'Vitória de Roma', desc: 'Você e a legião derrotam 40 bárbaros.', meta: (d) => [d.cont.abates + d.cont.abates_legiao, 40], xp: 500, den: 400, poder: 'marte' },
  { id: 'imperator', nome: 'Imperator', desc: 'Chegue ao nível 10.', meta: (d) => [d.nivel, 10], xp: 0, den: 1000, titulo: 'Imperator' },
];

function verificarMissoes(p, d) {
  for (const m of MISSOES) {
    if (d.missoes[m.id]) continue;
    const [atual, alvo] = m.meta(d);
    if (atual < alvo) continue;
    d.missoes[m.id] = true;
    let premio = `+${m.xp} XP, +${m.den} denários`;
    if (m.poder && !d.poderes.includes(m.poder)) { d.poderes.push(m.poder); premio += `, poder: ${PODERES[m.poder].nome}`; }
    if (m.titulo) { d.titulo = m.titulo; premio += `, título: ${m.titulo}`; }
    aviso(p, `${OURO}§lMISSÃO CONCLUÍDA`, `${BRANCO}${m.nome}`, 'random.levelup');
    p.sendMessage(`${TITULO} ${VERDE}Missão concluída: ${BRANCO}${m.nome} ${CINZA}(${premio})`);
    ganharXp(p, d, m.xp, m.den);
  }
}

const barra = (a, b) => {
  const n = Math.max(0, Math.min(10, Math.floor((a / b) * 10)));
  return `${VERDE}${'|'.repeat(n)}§8${'|'.repeat(10 - n)}`;
};

// ------------------------------------------------------------------ janelas
async function mostrar(p, form) {
  for (let tentativa = 0; tentativa < 20; tentativa++) {
    const r = await form.show(p);
    if (!(r.canceled && r.cancelationReason === 'UserBusy')) return r;
    await new Promise((ok) => system.runTimeout(ok, 20));
  }
  return { canceled: true };
}

async function menu(p) {
  const d = dados(p);
  d.cont.menus++;
  verificarMissoes(p, d);
  guardar(p, d);
  try { p.playSound('beacon.activate', { volume: 0.6, pitch: 1.6 }); } catch (e) { /* opcional */ }
  const form = new ActionFormData()
    .title(TITULO)
    .body(`${LINHA}\n${BRANCO}${p.name}  ${CINZA}|  ${OURO}${d.titulo}\n${BRANCO}Nível ${AZUL}${d.nivel}  ${barra(d.xp, proximoNivel(d.nivel))}\n${BRANCO}Denários: ${OURO}${d.denarios}\n${LINHA}`)
    .button('Status', 'textures/items/book_written')
    .button('Missões', 'textures/items/map_empty')
    .button('Poderes', 'textures/items/blaze_powder')
    .button('Construir', 'textures/items/wood_axe')
    .button('Recrutar', 'textures/items/iron_sword')
    .button('Ordens à legião', 'textures/items/compass_item');
  const r = await mostrar(p, form);
  if (r.canceled) return;
  return [status, missoes, poderes, construir, recrutar, ordens][r.selection]?.(p);
}

function minhaLegiao(p) {
  return ROMANOS.flatMap((type) => {
    try { return p.dimension.getEntities({ type, tags: [`dono_${p.id}`] }); } catch (e) { return []; }
  });
}

async function status(p) {
  const d = dados(p);
  const legiao = minhaLegiao(p);
  const conta = (t) => legiao.filter((e) => e.typeId === t).length;
  const body = [
    LINHA,
    `${BRANCO}Nome: ${AZUL}${p.name}`,
    `${BRANCO}Título: ${OURO}${d.titulo}`,
    `${BRANCO}Nível: ${AZUL}${d.nivel}   ${BRANCO}XP: ${d.xp}/${proximoNivel(d.nivel)}`,
    `${BRANCO}Denários: ${OURO}${d.denarios}`,
    LINHA,
    `${BRANCO}Legião: ${VERM}${conta('romano:legionario')} ${CINZA}legionários, ${VERM}${conta('romano:sagitario')} ${CINZA}arqueiros, ${VERM}${conta('romano:cavaleiro')} ${CINZA}cavaleiros`,
    `${BRANCO}Bárbaros derrotados: ${d.cont.abates} ${CINZA}(você)${BRANCO} + ${d.cont.abates_legiao} ${CINZA}(legião)`,
    `${BRANCO}Construções: ${d.cont.construcoes}`,
    `${BRANCO}Poderes: ${AZUL}${d.poderes.map((k) => PODERES[k].nome).join(', ')}`,
    LINHA,
  ].join('\n');
  await mostrar(p, new ActionFormData().title(`${TITULO} §r§fStatus`).body(body).button('Voltar'));
  return menu(p);
}

async function missoes(p) {
  const d = dados(p);
  const linhas = MISSOES.map((m) => {
    const [a, b] = m.meta(d);
    const feito = d.missoes[m.id];
    const premio = [m.xp ? `${m.xp} XP` : '', `${m.den} den.`, m.poder ? `poder ${PODERES[m.poder].nome}` : '', m.titulo ? `título ${m.titulo}` : '']
      .filter(Boolean).join(', ');
    return `${feito ? `${VERDE}[OK]` : `${OURO}[  ]`} ${BRANCO}${m.nome}\n  ${CINZA}${m.desc} ${feito ? '' : barra(a, b) + ` ${CINZA}${Math.min(a, b)}/${b}`}\n  ${CINZA}Prêmio: ${premio}`;
  });
  await mostrar(p, new ActionFormData().title(`${TITULO} §r§fMissões`).body(`${LINHA}\n${linhas.join('\n')}\n${LINHA}`).button('Voltar'));
  return menu(p);
}

async function poderes(p) {
  const d = dados(p);
  const ids = Object.keys(PODERES);
  const form = new ActionFormData().title(`${TITULO} §r§fPoderes`).body(`${CINZA}Desbloqueie mais poderes completando missões.`);
  for (const id of ids) {
    const tem = d.poderes.includes(id);
    const falta = Math.ceil(((recargas.get(`${p.id}:${id}`) ?? 0) - system.currentTick) / 20);
    const estadoTxt = !tem ? '§8[bloqueado]' : falta > 0 ? `§c[${falta} s]` : '§a[pronto]';
    form.button(`${tem ? BRANCO : '§8'}${PODERES[id].nome} ${estadoTxt}\n§r${CINZA}${tem ? PODERES[id].desc : '???'}`);
  }
  form.button('Voltar');
  const r = await mostrar(p, form);
  if (r.canceled || r.selection === ids.length) return r.canceled ? undefined : menu(p);
  const id = ids[r.selection];
  if (!d.poderes.includes(id)) { p.sendMessage(`${TITULO} ${CINZA}Poder bloqueado. Complete missões para desbloquear.`); return; }
  usarPoder(p, id);
}

const OBRAS = [
  { tipo: 'forte', custo: 300 },
  { tipo: 'torre', custo: 80 },
  { tipo: 'muralha', custo: 150 },
];

async function construir(p) {
  const d = dados(p);
  const form = new ActionFormData().title(`${TITULO} §r§fConstruir`)
    .body(`${CINZA}Os legionários perto constroem. Sem soldados, o próprio Sistema ergue a obra.\n${BRANCO}Denários: ${OURO}${d.denarios}`);
  for (const o of OBRAS) {
    const pl = PLANOS[o.tipo];
    form.button(`${BRANCO}${pl.nome}  ${OURO}${o.custo} den.\n§r${CINZA}${pl.larg} x ${pl.comp} blocos, ${pl.blocos.length} peças`);
  }
  form.button('Voltar');
  const r = await mostrar(p, form);
  if (r.canceled) return;
  if (r.selection === OBRAS.length) return menu(p);
  const o = OBRAS[r.selection];
  if (d.denarios < o.custo) return p.sendMessage(`${TITULO} ${VERM}Denários insuficientes (${d.denarios}/${o.custo}).`);
  const pl = PLANOS[o.tipo];
  const dim = p.dimension;
  if (dim.id !== 'minecraft:overworld') return p.sendMessage(`${TITULO} ${VERM}Só é possível construir na superfície.`);
  const v = p.getViewDirection(), n = Math.hypot(v.x, v.z) || 1;
  const dist = pl.mz + 4;
  const cx = p.location.x + (v.x / n) * dist, cz = p.location.z + (v.z / n) * dist;
  const temSoldados = dim.getEntities({ type: 'romano:legionario', location: p.location, maxDistance: 32 })
    .some((e) => !e.hasTag('obra') && !e.hasTag('guarda') && !e.hasTag('seguindo') && !emCombate(e));
  const obra = iniciarObra(dim, cx, p.location.y, cz, rotPara(p.location.x - cx, p.location.z - cz), o.tipo,
    { dono: p.id, magica: !temSoldados });
  if (!obra) return p.sendMessage(`${TITULO} ${VERM}Terreno irregular ou com água. Procure um lugar mais plano.`);
  d.denarios -= o.custo;
  guardar(p, d);
}

const TROPAS = [
  { id: 'romano:legionario', nome: 'Legionário', custo: 50, desc: 'Gládio e scutum. Constrói e patrulha.' },
  { id: 'romano:sagitario', nome: 'Arqueiro romano', custo: 60, desc: 'Atira de longe e vigia as torres.' },
  { id: 'romano:cavaleiro', nome: 'Cavaleiro (eques)', custo: 120, desc: 'Rápido e forte, ataca com a lança.' },
];

async function recrutar(p) {
  const d = dados(p);
  const form = new ActionFormData().title(`${TITULO} §r§fRecrutar`).body(`${BRANCO}Denários: ${OURO}${d.denarios}`);
  for (const t of TROPAS) form.button(`${BRANCO}${t.nome}  ${OURO}${t.custo} den.\n§r${CINZA}${t.desc}`);
  form.button('Voltar');
  const r = await mostrar(p, form);
  if (r.canceled) return;
  if (r.selection === TROPAS.length) return menu(p);
  const t = TROPAS[r.selection];
  if (d.denarios < t.custo) return p.sendMessage(`${TITULO} ${VERM}Denários insuficientes (${d.denarios}/${t.custo}).`);
  const loc = p.location;
  const pos = { x: loc.x + (Math.random() - 0.5) * 4, y: loc.y, z: loc.z + (Math.random() - 0.5) * 4 };
  try {
    const e = p.dimension.spawnEntity(t.id, pos);
    e.addTag(`dono_${p.id}`); e.addTag('seguindo');
    particulas(p.dimension, 'minecraft:totem_particle', pos, 12, 1);
  } catch (e) { return p.sendMessage(`${TITULO} ${VERM}Não deu para recrutar aqui.`); }
  d.denarios -= t.custo;
  d.cont.recrutas++;
  aviso(p, `${OURO}${t.nome} recrutado`, `${CINZA}Ave, General!`, 'random.orb');
  verificarMissoes(p, d);
  guardar(p, d);
  return recrutar(p);
}

async function ordens(p) {
  const legiao = minhaLegiao(p);
  const form = new ActionFormData().title(`${TITULO} §r§fOrdens`).body(`${BRANCO}Soldados sob seu comando: ${VERM}${legiao.length}`)
    .button(`${BRANCO}Sigam-me\n§r${CINZA}A legião acompanha você`)
    .button(`${BRANCO}Aguardem aqui\n§r${CINZA}Ficam onde estão`)
    .button(`${BRANCO}Montem guarda\n§r${CINZA}Patrulham o forte ou a torre mais perto`)
    .button(`${BRANCO}Reunir!\n§r${CINZA}Todos vêm até você agora`)
    .button('Voltar');
  const r = await mostrar(p, form);
  if (r.canceled) return;
  if (r.selection === 4) return menu(p);
  for (const e of legiao) {
    if (r.selection === 0 || r.selection === 3) e.addTag('seguindo');
    else e.removeTag('seguindo');
    if (r.selection === 3) {
      try { e.teleport({ x: p.location.x + (Math.random() - 0.5) * 6, y: p.location.y, z: p.location.z + (Math.random() - 0.5) * 6 }); } catch (err) { /* longe */ }
    }
  }
  const txt = ['A legião segue você.', 'A legião aguarda.', 'Os soldados vão montar guarda.', 'Legião reunida!'][r.selection];
  aviso(p, `${OURO}${txt}`, `${CINZA}${legiao.length} soldados`, 'random.orb');
}

// ------------------------------------------------------------------ chegada do general
async function despertar(p) {
  aviso(p, TITULO, `${BRANCO}Conectando ao portador...`, 'beacon.activate');
  await new Promise((ok) => system.runTimeout(ok, 60));
  const texto = [
    LINHA,
    `${AZUL}[ALERTA]${BRANCO} Uma alma compatível foi encontrada.`,
    '',
    `${BRANCO}Ano 117 d.C. O Império Romano está em guerra nas fronteiras.`,
    `${BRANCO}Gauleses, germânicos e partos avançam contra Roma.`,
    `${BRANCO}O General da legião caiu em batalha... e o Sistema escolheu ${OURO}você${BRANCO} para tomar o lugar dele.`,
    '',
    `${AZUL}Recompensas iniciais:`,
    `${CINZA}- Armadura do General (elmo, couraça, saiote e grevas)`,
    `${CINZA}- Gládio do General e escudo`,
    `${CINZA}- Poder: Grito de Guerra`,
    `${CINZA}- 200 denários para recrutar soldados e construir`,
    LINHA,
    `${BRANCO}Você aceita?`,
  ].join('\n');
  let aceitou = false;
  while (!aceitou) {
    const r = await mostrar(p, new MessageFormData().title(TITULO).body(texto).button1('§aAceitar').button2('§cRecusar'));
    if (r.canceled) { await new Promise((ok) => system.runTimeout(ok, 100)); continue; }
    if (r.selection === 0) aceitou = true;
    else {
      aviso(p, `${VERM}§lERRO`, `${BRANCO}Recusar não é uma opção.`, 'note.bass');
      await new Promise((ok) => system.runTimeout(ok, 40));
    }
  }
  vestirGeneral(p);
  const d = dados(p);
  d.iniciado = true;
  guardar(p, d);
  aviso(p, `${OURO}§lGENERAL DE ROMA`, `${BRANCO}O Sistema foi ativado. Use o item ${AZUL}Sistema${BRANCO}.`, 'random.levelup');
  particulas(p.dimension, 'minecraft:totem_particle', p.location, 30, 1.5);
  p.sendMessage(`${TITULO} ${BRANCO}Abra o Sistema com o item ${AZUL}Sistema${BRANCO} (ou /function sistema).`);
}

function vestirGeneral(p) {
  const pecas = [
    [EquipmentSlot.Head, 'batalha:elmo_general', 'slot.armor.head'],
    [EquipmentSlot.Chest, 'batalha:couraca_general', 'slot.armor.chest'],
    [EquipmentSlot.Legs, 'batalha:saiote_general', 'slot.armor.legs'],
    [EquipmentSlot.Feet, 'batalha:grevas_general', 'slot.armor.feet'],
  ];
  const eq = p.getComponent('minecraft:equippable');
  for (const [slot, item, nomeSlot] of pecas) {
    try { eq.setEquipment(slot, new ItemStack(item)); } catch (e) {
      try { p.runCommandAsync(`replaceitem entity @s ${nomeSlot} 0 ${item}`); } catch (err) { /* sem armadura */ }
    }
  }
  try { eq.setEquipment(EquipmentSlot.Offhand, new ItemStack('minecraft:shield')); } catch (e) { /* opcional */ }
  const inv = p.getComponent('minecraft:inventory')?.container;
  if (!inv) return;
  const gladio = new ItemStack('minecraft:iron_sword');
  gladio.nameTag = '§6Gládio do General';
  try { gladio.setLore(['§7Forjado em Roma.', '§7Dado pelo Sistema.']); } catch (e) { /* opcional */ }
  inv.addItem(new ItemStack('batalha:sistema'));
  inv.addItem(gladio);
}

// ------------------------------------------------------------------ eventos
export function iniciarSistema() {
  world.afterEvents.playerSpawn.subscribe((ev) => {
    if (!ev.initialSpawn) return;
    const p = ev.player;
    if (!dados(p).iniciado) system.runTimeout(() => despertar(p), 80);
  });

  world.afterEvents.itemUse.subscribe((ev) => {
    if (ev.itemStack?.typeId === 'batalha:sistema' && ev.source?.typeId === 'minecraft:player') menu(ev.source);
  });

  system.afterEvents.scriptEventReceive.subscribe((ev) => {
    const p = ev.sourceEntity;
    if (!p || p.typeId !== 'minecraft:player') return;
    if (ev.id === 'sistema:abrir') menu(p);
    else if (ev.id === 'sistema:reiniciar') { p.setDynamicProperty('sistema', undefined); despertar(p); }
  });

  world.afterEvents.entityDie.subscribe((ev) => {
    const morto = ev.deadEntity;
    let tipo;
    try { tipo = morto.typeId; } catch (e) { return; }
    if (!BARBAROS.includes(tipo)) return;
    const quem = ev.damageSource?.damagingEntity;
    if (!quem) return;
    if (quem.typeId === 'minecraft:player') {
      const d = dados(quem);
      d.cont.abates++;
      ganharXp(quem, d, 15, 10);
      verificarMissoes(quem, d);
      guardar(quem, d);
      return;
    }
    if (!ROMANOS.includes(quem.typeId)) return;
    // vitória da legião: vale para o dono do soldado ou para os jogadores perto
    const donoTag = quem.getTags().find((t) => t.startsWith('dono_'));
    const jogadores = world.getPlayers().filter((pl) => (donoTag ? `dono_${pl.id}` === donoTag
      : pl.dimension.id === quem.dimension.id && (pl.location.x - quem.location.x) ** 2 + (pl.location.z - quem.location.z) ** 2 < 32 * 32));
    for (const pl of jogadores) {
      const d = dados(pl);
      d.cont.abates_legiao++;
      ganharXp(pl, d, 6, 5);
      verificarMissoes(pl, d);
      guardar(pl, d);
    }
  });

  aoConcluir((obra) => {
    const jogadores = world.getPlayers().filter((pl) => (obra.dono ? pl.id === obra.dono
      : (pl.location.x - obra.x) ** 2 + (pl.location.z - obra.z) ** 2 < 48 * 48));
    for (const pl of jogadores) {
      const d = dados(pl);
      d.cont.construcoes++;
      ganharXp(pl, d, 60, 30);
      verificarMissoes(pl, d);
      guardar(pl, d);
    }
  });
}

// soldados com a ordem "sigam-me" acompanham o dono
export function seguirGeneral() {
  for (const p of world.getPlayers()) {
    for (const e of minhaLegiao(p)) {
      if (!e.hasTag('seguindo') || emCombate(e) || e.hasTag('obra') || e.hasTag('guarda')) continue;
      const d2 = (e.location.x - p.location.x) ** 2 + (e.location.z - p.location.z) ** 2;
      if (d2 < 14 * 14) continue;
      const v = p.getViewDirection(), n = Math.hypot(v.x, v.z) || 1;
      try {
        e.teleport({ x: p.location.x - (v.x / n) * 3 + (Math.random() - 0.5) * 4, y: p.location.y,
          z: p.location.z - (v.z / n) * 3 + (Math.random() - 0.5) * 4 }, { facingLocation: p.location });
      } catch (err) { /* outra dimensão */ }
    }
  }
}
