// Vida dos NPCs: necessidades, decisões, conversas com voz e status ao olhar.
//
// Cada soldado e cada nobre tem FOME, SEDE e ENERGIA (0 a 100), que caem com o tempo
// (mais rápido em combate). Quando está livre, o NPC decide sozinho:
//   - dormir (de noite ou muito cansado): deita, fecha os olhos e mostra "Zzz";
//   - beber: pega uma caneca e bebe;
//   - comer: pega um pão ou uma tigela de sopa e come;
//   - conversar: procura outro NPC livre perto, os dois se viram um para o outro e trocam
//     falas (texto em cima da cabeça + voz de personagem).
// Quando o jogador olha para um NPC, aparece na tela o nome e as barras de fome, sede e energia.
import { world, system } from '@minecraft/server';
import { CONVERSAS, FALAS_NECESSIDADE, SAUDACOES } from './dialogos.js';

export const TIPOS = {
  'romano:legionario': { ns: 'romano', voz: 'soldado', nome: 'Legionário', grupo: 'soldado' },
  'romano:sagitario': { ns: 'romano', voz: 'soldado', nome: 'Arqueiro Romano', grupo: 'soldado' },
  'nobre:aurelia': { ns: 'nobre', voz: 'matrona', nome: 'Aurélia', grupo: 'nobre' },
  'nobre:livia': { ns: 'nobre', voz: 'nobre', nome: 'Lívia', grupo: 'nobre' },
  'nobre:cornelia': { ns: 'nobre', voz: 'nobre', nome: 'Cornélia', grupo: 'nobre' },
  'nobre:julia': { ns: 'nobre', voz: 'nobre', nome: 'Júlia', grupo: 'nobre' },
  'nobre:aelia': { ns: 'nobre', voz: 'nobre', nome: 'Aélia', grupo: 'nobre' },
};
const ACAO = { nada: 0, comer: 1, sopa: 2, beber: 3, dormir: 4, conversar: 5 };
const NOME_ACAO = { 1: 'comendo pão', 2: 'tomando sopa', 3: 'bebendo', 4: 'dormindo', 5: 'conversando' };

const vidas = new Map();     // id -> { f, s, e, acao, ate, conversa, nomeOriginal, salvo }
const conversas = new Set();
const saudados = new Map();  // id do NPC -> tick da última saudação

// ------------------------------------------------------------------ utilidades
const valido = (e) => { try { return typeof e.isValid === 'function' ? e.isValid() : e.isValid; } catch (err) { return false; } };
const prop = (e, n) => { try { return e.getProperty(n); } catch (err) { return undefined; } };
const evento = (e, n) => { try { e.triggerEvent(n); } catch (err) { /* sem evento */ } };
const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
const sorteia = (lista) => lista[Math.floor(Math.random() * lista.length)];
const hash = (s) => { let h = 0; for (const ch of String(s)) h = (h * 31 + ch.charCodeAt(0)) | 0; return Math.abs(h); };

function npcs() {
  const dim = world.getDimension('overworld');
  return Object.keys(TIPOS).flatMap((type) => { try { return dim.getEntities({ type }); } catch (e) { return []; } });
}

function vida(e) {
  let v = vidas.get(e.id);
  if (v) return v;
  let salvo = null;
  try { const s = e.getDynamicProperty('vida'); if (typeof s === 'string') salvo = JSON.parse(s); } catch (err) { /* novo */ }
  v = { f: 60 + Math.random() * 40, s: 60 + Math.random() * 40, e: 55 + Math.random() * 45, ...(salvo ?? {}),
    acao: 0, ate: 0, conversa: null, nomeOriginal: null };
  vidas.set(e.id, v);
  return v;
}
function salvarVida(e, v) {
  try { e.setDynamicProperty('vida', JSON.stringify({ f: Math.round(v.f), s: Math.round(v.s), e: Math.round(v.e) })); } catch (err) { /* ok */ }
}

const emCombate = (e, t) => prop(e, `${t.ns}:em_combate`) === true;
const ocupadoComOutra = (e) => e.hasTag('obra') || e.hasTag('guarda') || e.hasTag('em_missao');

function falar(e, texto, duracao = 70) {
  const v = vida(e);
  const t = TIPOS[e.typeId];
  if (v.nomeOriginal === null) v.nomeOriginal = e.nameTag ?? '';
  try { e.nameTag = `§f${texto}`; } catch (err) { /* ok */ }
  v.falaAte = system.currentTick + duracao;
  const tom = 0.85 + (hash(e.id) % 40) / 100;  // cada NPC com um tom de voz só dele
  try { e.dimension.playSound(`batalha.voz.${t.voz}`, e.location, { volume: 1, pitch: tom }); } catch (err) { /* som opcional */ }
}
function restaurarNome(e, v) {
  if (v.nomeOriginal === null) return;
  try { e.nameTag = v.nomeOriginal; } catch (err) { /* ok */ }
  v.nomeOriginal = null;
}

function comecar(e, acao, segundos) {
  const v = vida(e);
  const t = TIPOS[e.typeId];
  v.acao = acao;
  v.ate = system.currentTick + segundos * 20;
  evento(e, `${t.ns}:acao_${acao}`);
}
function parar(e, v) {
  const t = TIPOS[e.typeId];
  v.acao = 0;
  v.conversa = null;
  evento(e, `${t.ns}:acao_0`);
  restaurarNome(e, v);
}

function olharPara(e, alvo) {
  try { e.teleport(e.location, { facingLocation: { x: alvo.location.x, y: alvo.location.y + 1.6, z: alvo.location.z } }); } catch (err) { /* ok */ }
}

// ------------------------------------------------------------------ necessidades (a cada segundo)
function viver() {
  const tick = system.currentTick;
  const hora = world.getTimeOfDay();
  const noite = hora >= 13000 && hora <= 23000;
  for (const e of npcs()) {
    if (!valido(e)) continue;
    const t = TIPOS[e.typeId];
    const v = vida(e);
    const luta = emCombate(e, t) || e.hasTag('em_missao');  // em missão larga a comida
    const k = luta ? 2.2 : 1;
    v.f = Math.max(0, v.f - 0.05 * k);
    v.s = Math.max(0, v.s - 0.08 * k);
    v.e = v.acao === ACAO.dormir ? Math.min(100, v.e + 0.9) : Math.max(0, v.e - 0.035 * k);
    if (tick % 200 < 20) salvarVida(e, v);
    if (v.falaAte && tick > v.falaAte && v.acao !== ACAO.dormir && !v.conversa) { restaurarNome(e, v); v.falaAte = 0; }

    if (luta) { if (v.acao) parar(e, v); continue; }
    if (v.acao === ACAO.dormir) {
      if (v.e >= 98 || (!noite && v.e >= 75)) {
        parar(e, v);
        falar(e, sorteia(FALAS_NECESSIDADE.acordou), 60);
      } else if (!v.falaAte || tick > v.falaAte) {
        v.falaAte = 0;
        if (v.nomeOriginal === null) v.nomeOriginal = e.nameTag ?? '';
        try { e.nameTag = '§7Zzz...'; } catch (err) { /* ok */ }
      }
      continue;
    }
    if (v.acao && v.acao !== ACAO.conversar) {
      if (tick % 30 < 20) {  // barulhinho de mastigar ou de gole
        try { e.dimension.playSound(v.acao === ACAO.beber ? 'random.drink' : 'random.eat', e.location, { volume: 0.6 }); } catch (err) { /* ok */ }
      }
      if (tick >= v.ate) {
        if (v.acao === ACAO.beber) v.s = Math.min(100, v.s + 60);
        else v.f = Math.min(100, v.f + (v.acao === ACAO.sopa ? 60 : 50));
        parar(e, v);
        try { e.dimension.spawnParticle('minecraft:villager_happy', { ...e.location, y: e.location.y + 2 }); } catch (err) { /* ok */ }
        if (Math.random() < 0.6) falar(e, sorteia(FALAS_NECESSIDADE.satisfeito), 50);
      }
      continue;
    }
    if (v.conversa) continue;
    const critico = v.f < 12 || v.s < 12 || v.e < 8;
    if (ocupadoComOutra(e) && !critico) continue;
    // decisões (com sorteio para cada um decidir num momento diferente)
    if (v.e < 20 || (noite && v.e < 70 && Math.random() < 0.08)) {
      comecar(e, ACAO.dormir, 9999);
      falar(e, sorteia(FALAS_NECESSIDADE.sono), 50);
    } else if (v.s < 35 && Math.random() < 0.25) {
      comecar(e, ACAO.beber, 5);
      if (Math.random() < 0.5) falar(e, sorteia(FALAS_NECESSIDADE.sede), 50);
    } else if (v.f < 35 && Math.random() < 0.25) {
      const sopa = Math.random() < 0.45;
      comecar(e, sopa ? ACAO.sopa : ACAO.comer, sopa ? 9 : 7);
      if (Math.random() < 0.5) falar(e, sorteia(FALAS_NECESSIDADE.fome), 50);
    }
  }
}

// ------------------------------------------------------------------ conversas entre NPCs
function livreParaConversar(e) {
  if (!valido(e)) return false;
  const v = vida(e);
  return !v.acao && !v.conversa && !ocupadoComOutra(e) && !emCombate(e, TIPOS[e.typeId]);
}

function escolherConversa(a, b) {
  const ga = TIPOS[a.typeId].grupo, gb = TIPOS[b.typeId].grupo;
  const chave = ga === gb ? ga : 'misto';
  const lista = CONVERSAS[chave];
  const conversa = sorteia(lista);
  // no grupo misto, a primeira fala é sempre do soldado
  const [x, y] = chave === 'misto' && ga !== 'soldado' ? [b, a] : [a, b];
  // falas sobre as necessidades de quem está com fome, sede ou sono
  const extra = [];
  const va = vida(x);
  if (va.f < 45) extra.push([0, sorteia(FALAS_NECESSIDADE.fome)], [1, sorteia(FALAS_NECESSIDADE.resposta_fome)]);
  else if (va.e < 45) extra.push([0, sorteia(FALAS_NECESSIDADE.sono)], [1, sorteia(FALAS_NECESSIDADE.resposta_sono)]);
  return { quem: [x, y], falas: [...conversa, ...extra], i: 0, prox: system.currentTick + 10 };
}

function procurarConversas() {
  const lista = npcs().filter(livreParaConversar);
  for (const a of lista) {
    if (!livreParaConversar(a) || Math.random() > 0.12) continue;
    const b = lista.find((o) => o !== a && livreParaConversar(o) && dist(o.location, a.location) < 5);
    if (!b) continue;
    const c = escolherConversa(a, b);
    for (const e of c.quem) { const v = vida(e); v.conversa = c; comecar(e, ACAO.conversar, 9999); }
    olharPara(c.quem[0], c.quem[1]);
    olharPara(c.quem[1], c.quem[0]);
    conversas.add(c);
  }
}

function avancarConversas() {
  const tick = system.currentTick;
  for (const c of [...conversas]) {
    const [a, b] = c.quem;
    const acabou = !valido(a) || !valido(b) || emCombate(a, TIPOS[a.typeId]) || emCombate(b, TIPOS[b.typeId])
      || dist(a.location, b.location) > 7;
    if (!acabou && tick < c.prox) continue;
    if (acabou || c.i >= c.falas.length) {
      for (const e of c.quem) if (valido(e)) parar(e, vida(e));
      conversas.delete(c);
      continue;
    }
    const [quem, texto] = c.falas[c.i++];
    const falante = c.quem[quem], ouvinte = c.quem[1 - quem];
    restaurarNome(ouvinte, vida(ouvinte));
    olharPara(falante, ouvinte);
    falar(falante, texto, 70);
    c.prox = tick + 50 + Math.min(40, texto.length * 1.2);
  }
}

// ------------------------------------------------------------------ jogador: saudações e status ao olhar
const barra = (v, cor) => `${cor}${'|'.repeat(Math.round(v / 10))}§8${'|'.repeat(10 - Math.round(v / 10))}`;

function olharDoJogador() {
  for (const p of world.getPlayers()) {
    let alvo;
    try {
      alvo = p.getEntitiesFromViewDirection({ maxDistance: 16 }).map((h) => h.entity).find((e) => e && TIPOS[e.typeId]);
    } catch (err) { continue; }
    if (!alvo) continue;
    const t = TIPOS[alvo.typeId];
    const v = vida(alvo);
    const fazendo = v.acao ? `  §7(${NOME_ACAO[v.acao]})` : '';
    const nome = (v.nomeOriginal !== null ? v.nomeOriginal : alvo.nameTag) || t.nome;
    try {
      p.onScreenDisplay.setActionBar(
        `§l§6${nome}§r${fazendo}\n§fFome ${barra(v.f, '§6')}  §fSede ${barra(v.s, '§b')}  §fEnergia ${barra(v.e, '§e')}`);
    } catch (err) { /* ok */ }
  }
}

function saudar() {
  const tick = system.currentTick;
  for (const p of world.getPlayers()) {
    for (const e of npcs()) {
      if (!livreParaConversar(e) || dist(e.location, p.location) > 4) continue;
      if (tick - (saudados.get(e.id) ?? -99999) < 1200) continue;
      saudados.set(e.id, tick);
      olharPara(e, p);
      falar(e, sorteia(SAUDACOES[TIPOS[e.typeId].grupo]), 60);
    }
  }
}

// ------------------------------------------------------------------ ligar tudo
export function iniciarVida() {
  system.runInterval(() => {
    try { viver(); } catch (e) { console.warn(`[vida] ${e}`); }
  }, 20);
  system.runInterval(() => {
    try { avancarConversas(); olharDoJogador(); } catch (e) { console.warn(`[vida] ${e}`); }
  }, 5);
  system.runInterval(() => {
    try { procurarConversas(); saudar(); } catch (e) { console.warn(`[vida] ${e}`); }
  }, 40);
  world.afterEvents.entityHurt?.subscribe?.((ev) => {
    const e = ev.hurtEntity;
    if (!e || !TIPOS[e.typeId]) return;
    const v = vida(e);
    if (v.acao === ACAO.dormir || v.conversa) parar(e, v);  // acorda ou para de conversar se apanhar
  });
}

// para testes
export const _interno = { vidas, conversas, vida, ACAO };
