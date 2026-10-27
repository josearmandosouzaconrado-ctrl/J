import { world, system, ItemStack } from "@minecraft/server";
import { CAMPO, BOLA, FORMACOES, ITENS_PARTIDA } from "./config.js";
import { gerarElenco, statsPorPapel, skinIndex, KIT_GOLEIRO } from "./data.js";
import { clamp, hyp, rand, distSegmento } from "./util.js";

let partidaAtual = null;

export function getPartida() {
  return partidaAtual;
}

const NOMES_ITENS = {
  "fut:chute": ["§e§lCHUTE", "§7Toque: chute normal. §fSegure§7 para carregar a força.", "§7Mire no gol; olhe para cima para chutar alto."],
  "fut:passe": ["§a§lPASSE", "§7Toque: passe rasteiro para quem está na mira.", "§fSegure§7: lançamento pelo alto."],
  "fut:drible": ["§d§lDRIBLE", "§7Arrancada rápida. Com a bola, fica imune a desarmes por 1s."],
  "fut:dividida": ["§c§lDESARME", "§7Dá um bote para roubar a bola do adversário."],
  "fut:pedir": ["§6§lPEDIR", "§7O companheiro com a bola toca para você."],
};

const CARGA_MAX = 30; // ticks para a barra de força encher

/** Verifica se o jogador tem espaço para guardar os itens da barra rápida. */
export function temEspacoInventario(player) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return false;
  let ocupados = 0;
  for (let i = 0; i < ITENS_PARTIDA.length; i++) {
    const it = inv.getItem(i);
    if (it && !ITENS_PARTIDA.includes(it.typeId)) ocupados++;
  }
  let livres = 0;
  for (let i = 9; i < inv.size; i++) if (!inv.getItem(i)) livres++;
  return livres >= ocupados;
}

export function limparItensPartida(player) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  for (let i = 0; i < inv.size; i++) {
    const it = inv.getItem(i);
    if (it && ITENS_PARTIDA.includes(it.typeId)) inv.setItem(i, undefined);
  }
}

function prepararInventario(player) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  limparItensPartida(player);
  for (let i = 0; i < ITENS_PARTIDA.length; i++) {
    if (!inv.getItem(i)) continue;
    for (let j = 9; j < inv.size; j++) {
      if (!inv.getItem(j)) {
        inv.swapItems(i, j, inv);
        break;
      }
    }
  }
  ITENS_PARTIDA.forEach((id, i) => {
    const item = new ItemStack(id, 1);
    const [nome, ...lore] = NOMES_ITENS[id];
    item.nameTag = nome;
    item.setLore(lore);
    inv.setItem(i, item);
  });
  try {
    player.selectedSlot = 0;
  } catch {
    // selectedSlot é somente leitura em algumas versões
  }
}

function valido(e) {
  try {
    return !!e && e.isValid();
  } catch {
    return false;
  }
}

/** Remove NPCs e bolas que não pertencem a uma partida em andamento. */
export function limparEntidadesOrfas() {
  const ids = partidaAtual ? partidaAtual.idsEntidades() : new Set();
  for (const dim of ["overworld", "nether", "the_end"]) {
    let dimension;
    try {
      dimension = world.getDimension(dim);
    } catch {
      continue;
    }
    for (const type of ["fut:jogador", "fut:bola"]) {
      for (const e of dimension.getEntities({ type })) {
        if (!ids.has(e.id)) {
          try {
            e.remove();
          } catch {
            // entidade já removida
          }
        }
      }
    }
  }
}

export class Partida {
  /**
   * @param {object} o
   * @param {"carreira"|"rapida"|"treino"} o.modo
   * @param {import("@minecraft/server").Dimension} o.dimension
   * @param {{x:number,y:number,z:number}} o.origem centro do campo (y = superfície do gramado)
   * @param {Array<{timeId:number,nome:string,sigla:string,cor:string,rating:number,temporada?:number}>} o.times
   * @param {5|7} o.tamanho
   * @param {Array<{player:any,time:number,papel:string,stats:object,nome:string,numero:number}>} o.humanos
   * @param {number} o.duracaoSeg
   * @param {string} [o.rotulo]
   * @param {(r:object)=>void} [o.aoTerminar]
   */
  constructor(o) {
    this.o = o;
    this.modo = o.modo;
    this.treino = o.modo === "treino";
    this.dim = o.dimension;
    this.origem = o.origem;
    this.duracao = Math.max(20, Math.round(o.duracaoSeg * 20));
    this.t = 0;
    this.relogio = 0;
    this.tempo = 1;
    this.estado = "carregando";
    this.timer = 40;
    this.placar = [0, 0];
    this.eventos = [];
    this.atores = [];
    this.saidaTime = 0;
    // seleções podem ter uniformes iguais: o visitante usa o reserva
    const [ta, tb] = o.times;
    const kitA = ta.kit ?? ta.timeId;
    if ((tb.kit ?? tb.timeId) === kitA) tb.kit = kitA === 6 ? 9 : 6;
    this.bola = {
      entity: null, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
      dono: null, ultimo: null, chute: null, passe: null, semCaptura: 0, giro: 0, giroProp: -1,
    };
    this.montarAtores();
  }

  // ---------------------------------------------------------------- montagem

  montarAtores() {
    const o = this.o;
    for (const timeIdx of [0, 1]) {
      const info = o.times[timeIdx];
      let slots;
      if (this.treino) slots = timeIdx === 0 ? [] : [FORMACOES[5][0]];
      else slots = FORMACOES[o.tamanho].map((s) => [...s]);
      const livres = slots.map(() => true);

      const humanos = o.humanos.filter((h) => h.time === timeIdx);
      for (const h of humanos) {
        let idx = slots.findIndex((s, i) => livres[i] && s[0] === h.papel && s[0] !== "GOL");
        if (idx < 0) idx = slots.findIndex((s, i) => livres[i] && s[0] !== "GOL");
        let fx = 0.3;
        let fz = 0;
        if (idx >= 0) {
          livres[idx] = false;
          [, fx, fz] = slots[idx];
        }
        this.atores.push(this.novoAtor({
          tipo: "humano", player: h.player, time: timeIdx, papel: h.papel, fx, fz,
          nome: h.nome, numero: h.numero, stats: h.stats,
        }));
      }

      const papeis = slots.filter((_, i) => livres[i]).map((s) => s[0]);
      const elenco = gerarElenco(info.semente ?? info.timeId, info.temporada ?? 1, papeis, info.nomes);
      let k = 0;
      slots.forEach((s, i) => {
        if (!livres[i]) return;
        const pessoa = elenco[k++];
        const kit = s[0] === "GOL" ? KIT_GOLEIRO[timeIdx] : info.kit ?? info.timeId;
        this.atores.push(this.novoAtor({
          tipo: "npc", time: timeIdx, papel: s[0], fx: s[1], fz: s[2],
          nome: pessoa.nome, numero: pessoa.numero,
          stats: statsPorPapel(info.rating, s[0], pessoa.variacao),
          skin: skinIndex(kit, pessoa.pele),
        }));
      });
    }
  }

  novoAtor(d) {
    return {
      id: `${d.time}_${this.atores.length}`,
      x: 0, z: 0, y: 0, vx: 0, vz: 0, dirX: 1, dirZ: 0,
      alvoX: 0, alvoZ: 0, velAlvo: 0,
      cdChute: 0, cdDividida: 0, cdDrible: 0, arrancadaAte: 0, carga: null, protecao: 0, segurando: 0,
      assistDe: null, assistTick: 0, forcarPasse: false, pediuTick: -9999,
      anim: 0, animProp: -1, animTimer: 0, entity: null, efeitoTick: 0,
      est: { gols: 0, assist: 0, passes: 0, passesTent: 0, desarmes: 0, chutes: 0, defesas: 0 },
      ...d,
    };
  }

  idsEntidades() {
    const s = new Set();
    for (const a of this.atores) if (a.entity) s.add(a.entity.id);
    if (this.bola.entity) s.add(this.bola.entity.id);
    return s;
  }

  humanos() {
    return this.atores.filter((a) => a.tipo === "humano");
  }

  atorDoJogador(player) {
    return this.atores.find((a) => a.tipo === "humano" && a.player.id === player.id);
  }

  goleiro(timeIdx) {
    return this.atores.find((a) => a.time === timeIdx && a.papel === "GOL" && a.tipo === "npc");
  }

  /** +1 se o time ataca para X positivo, -1 caso contrário. Os lados trocam no segundo tempo. */
  atacaDir(timeIdx) {
    if (this.treino) return timeIdx === 0 ? 1 : -1;
    return (timeIdx === 0 ? 1 : -1) * (this.tempo === 1 ? 1 : -1);
  }

  mundo(x, y, z) {
    return { x: this.origem.x + x, y: this.origem.y + y, z: this.origem.z + z };
  }

  // ---------------------------------------------------------------- ciclo de vida

  iniciar() {
    if (partidaAtual) partidaAtual.finalizar("substituida");
    partidaAtual = this;
    limparEntidadesOrfas();
    for (const h of this.humanos()) {
      prepararInventario(h.player);
      h.player.teleport(this.mundo(0, 0.1, -10), { dimension: this.dim });
    }
    this.msgTodos(`§a§l[Futebol]§r ${this.o.rotulo ?? "Partida"}: ${this.nomeTime(0)} §fx ${this.nomeTime(1)}`);
    this.msgTodos("§7Itens: §eChutar §7| §aPassar §7| §cDividida §7| §6Pedir a Bola§7. Bater na bola também chuta. Agachar protege a bola.");
    this.loop = system.runInterval(() => {
      try {
        this.tick();
      } catch (e) {
        console.warn(`[Futebol] erro no tick: ${e}\n${e?.stack ?? ""}`);
      }
    }, 1);
  }

  spawnar() {
    for (const a of this.atores) {
      if (a.tipo !== "npc") continue;
      const e = this.dim.spawnEntity("fut:jogador", this.mundo(a.x, 0, a.z));
      e.nameTag = `${this.o.times[a.time].cor}${a.nome} §f${a.numero}`;
      try {
        e.setProperty("fut:skin", a.skin);
      } catch {
        // propriedade indisponível: usa a textura padrão
      }
      a.entity = e;
    }
    this.bola.entity = this.dim.spawnEntity("fut:bola", this.mundo(0, 0, 0));
  }

  finalizar(motivo = "fim") {
    if (this.encerrada) return;
    this.encerrada = true;
    if (this.loop !== undefined) system.clearRun(this.loop);
    if (partidaAtual === this) partidaAtual = null;
    for (const a of this.atores) {
      if (a.entity && valido(a.entity)) a.entity.remove();
    }
    if (valido(this.bola.entity)) this.bola.entity.remove();
    for (const h of this.humanos()) {
      if (!valido(h.player)) continue;
      try {
        limparItensPartida(h.player);
        for (const ef of ["slowness", "speed", "resistance", "saturation"]) h.player.removeEffect(ef);
      } catch {
        // jogador saindo do mundo
      }
    }
    const resultado = this.resultado(motivo);
    if (this.o.aoTerminar && motivo !== "substituida") {
      Promise.resolve()
        .then(() => this.o.aoTerminar(resultado))
        .catch((e) => console.warn(`[Futebol] erro ao encerrar: ${e}\n${e?.stack ?? ""}`));
    }
  }

  resultado(motivo) {
    const [g0, g1] = this.placar;
    const notas = this.atores.map((a) => ({ a, nota: this.nota(a) }));
    const craque = notas.reduce((m, n) => (!m || n.nota > m.nota ? n : m), null);
    return {
      motivo,
      abandonada: motivo !== "fim",
      modo: this.modo,
      placar: [g0, g1],
      times: this.o.times,
      eventos: this.eventos,
      craque: craque ? { nome: craque.a.nome, time: craque.a.time, nota: craque.nota } : null,
      humanos: notas
        .filter((n) => n.a.tipo === "humano")
        .map((n) => ({ playerId: n.a.player.id, player: n.a.player, nome: n.a.nome, time: n.a.time, est: n.a.est, nota: n.nota })),
    };
  }

  nota(a) {
    const pro = this.placar[a.time];
    const contra = this.placar[1 - a.time];
    const e = a.est;
    let n = 6 + e.gols * 1.1 + e.assist * 0.75;
    n += Math.min(1.2, e.desarmes * 0.12) + Math.min(0.8, e.passes * 0.04) + Math.min(0.4, e.chutes * 0.05);
    n -= Math.min(0.8, (e.passesTent - e.passes) * 0.05);
    if (!this.treino) {
      n += pro > contra ? 0.4 : pro < contra ? -0.4 : 0;
      if (a.papel === "ZAG" || a.papel === "GOL") n += contra === 0 ? 0.8 : -0.15 * contra;
      if (a.papel === "GOL") n += Math.min(2, e.defesas * 0.25);
    }
    return Math.round(clamp(n, 3, 10) * 10) / 10;
  }

  jogadorSaiu(playerId) {
    if (this.humanos().some((h) => h.player.id === playerId)) this.finalizar("abandono");
  }

  // ---------------------------------------------------------------- tick principal

  tick() {
    this.t++;
    if (this.estado === "carregando") {
      if (--this.timer <= 0) {
        this.spawnar();
        if (this.treino) this.reposicionarTreino(true);
        else this.saida(0);
      }
      return;
    }

    for (const h of this.humanos()) {
      if (!valido(h.player)) return this.finalizar("abandono");
      this.lerHumano(h);
    }
    if (this.atores.some((a) => a.tipo === "npc" && !valido(a.entity)) || !valido(this.bola.entity)) {
      this.msgTodos("§cAs entidades da partida foram removidas. Partida encerrada.");
      return this.finalizar("erro");
    }

    for (const a of this.atores) {
      if (a.cdChute > 0) a.cdChute--;
      if (a.cdDividida > 0) a.cdDividida--;
      if (a.cdDrible > 0) a.cdDrible--;
      if (a.protecao > 0) a.protecao--;
      if (a.animTimer > 0) a.animTimer--;
    }
    if (this.bola.semCaptura > 0) this.bola.semCaptura--;

    switch (this.estado) {
      case "saida":
        this.tickSaida();
        break;
      case "jogando":
      case "parado":
        this.tickJogo();
        break;
      case "gol":
        this.fisicaBola(false);
        this.moverNpcs();
        if (--this.timer <= 0) {
          if (this.treino) this.reposicionarTreino(false);
          else this.saida(this.saidaTime);
        }
        break;
      case "intervalo":
        if (--this.timer <= 0) {
          this.tempo = 2;
          this.msgTodos("§e§lSegundo tempo! §r§7Os times trocaram de lado.");
          this.saida(1);
        }
        break;
    }
    if (this.encerrada) return;
    this.renderizar();
    if (this.t % 5 === 0 || (this.t % 2 === 0 && this.atores.some((a) => a.carga))) this.hud();
  }

  tickJogo() {
    this.relogio++;
    if (this.estado === "parado" && --this.timer <= 0) this.estado = "jogando";
    if (this.t % 2 === 0) this.ia();
    this.moverNpcs();
    this.atualizarBola();
    this.efeitosHumanos();

    if (this.estado !== "jogando" && this.estado !== "parado") return;
    if (this.treino) {
      if (this.relogio >= this.duracao) this.finalizar("fim");
    } else if (this.tempo === 1 && this.relogio >= this.duracao / 2) {
      this.estado = "intervalo";
      this.timer = 100;
      this.bola.dono = null;
      this.titulo("§eIntervalo", `${this.placarTexto()}`);
      this.som("random.orb", 0.6);
    } else if (this.relogio >= this.duracao) {
      this.titulo("§6Fim de jogo!", this.placarTexto());
      this.som("random.levelup", 1);
      this.finalizar("fim");
    }
  }

  // ---------------------------------------------------------------- saída de bola

  saida(timeIdx) {
    this.estado = "saida";
    this.timer = 60;
    this.saidaTime = timeIdx;
    const b = this.bola;
    Object.assign(b, { x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, dono: null, chute: null, passe: null, ultimo: null });

    let batedor = null;
    const doTime = this.atores.filter((a) => a.time === timeIdx && a.papel !== "GOL");
    batedor = doTime.find((a) => a.tipo === "humano") ?? doTime.find((a) => a.papel === "ATA") ?? doTime[0];
    this.batedor = batedor;

    for (const a of this.atores) {
      const dir = this.atacaDir(a.time);
      let k = a.fx * 22;
      if (a.time === timeIdx) k = Math.min(k, -2.5);
      else k = Math.min(k, -6.5);
      let z = a.fz * 13;
      if (a === batedor) {
        k = -0.9;
        z = 0;
      }
      a.x = dir * k;
      a.z = z;
      a.vx = a.vz = 0;
      a.dirX = dir;
      a.dirZ = 0;
      a.alvoX = a.x;
      a.alvoZ = a.z;
      a.assistDe = null;
      if (a.tipo === "humano") {
        const p = a.player;
        p.teleport(this.mundo(a.x, 0.05, a.z), { dimension: this.dim, facingLocation: this.mundo(0, 1, 0) });
        p.addEffect("slowness", 62, { amplifier: 255, showParticles: false });
      }
    }
    this.msgAcao(`§eSaída de bola: ${this.nomeTime(timeIdx)}`);
  }

  tickSaida() {
    const seg = Math.ceil(this.timer / 20);
    if (this.timer % 20 === 0 && seg > 0) {
      this.titulo(`§e${seg}`, this.placarTexto(), 0, 18, 2);
      this.som("note.hat", 1);
    }
    this.bola.x = 0;
    this.bola.z = 0;
    if (--this.timer <= 0) {
      this.titulo("§aJÁ!", "", 0, 15, 5);
      this.som("note.pling", 1.5);
      this.estado = "jogando";
      const b = this.batedor;
      if (b) {
        this.capturar(b);
        b.protecao = 30;
        if (b.tipo === "npc") b.forcarPasse = true;
      }
      for (const h of this.humanos()) h.player.removeEffect("slowness");
      for (const h of this.humanos()) h.efeitoTick = 0;
    }
  }

  // ---------------------------------------------------------------- humanos

  lerHumano(a) {
    const l = a.player.location;
    const x = l.x - this.origem.x;
    const z = l.z - this.origem.z;
    a.vx = x - a.x;
    a.vz = z - a.z;
    if (Math.abs(a.vx) > 3 || Math.abs(a.vz) > 3) a.vx = a.vz = 0; // teleporte
    a.x = x;
    a.z = z;
    a.y = l.y - this.origem.y;
    const v = hyp(a.vx, a.vz);
    if (v > 0.04) {
      a.dirX = a.vx / v;
      a.dirZ = a.vz / v;
    } else {
      const d = a.player.getViewDirection();
      const h = hyp(d.x, d.z);
      if (h > 0.01) {
        a.dirX = d.x / h;
        a.dirZ = d.z / h;
      }
    }
  }

  efeitosHumanos() {
    for (const h of this.humanos()) {
      if (this.t < h.efeitoTick || this.t < h.arrancadaAte) continue;
      h.efeitoTick = this.t + 200;
      const p = h.player;
      const vel = h.stats.vel;
      p.removeEffect("speed");
      p.removeEffect("slowness");
      if (vel >= 85) p.addEffect("speed", 260, { amplifier: 1, showParticles: false });
      else if (vel >= 70) p.addEffect("speed", 260, { amplifier: 0, showParticles: false });
      else if (vel < 50) p.addEffect("slowness", 260, { amplifier: 0, showParticles: false });
      p.addEffect("resistance", 260, { amplifier: 4, showParticles: false });
      p.addEffect("saturation", 260, { amplifier: 1, showParticles: false });
    }
  }

  /** Começa a carregar um chute/passe (item segurado). */
  iniciarCarga(player, tipo) {
    const a = this.atorDoJogador(player);
    if (a) a.carga = { tipo, inicio: this.t };
  }

  /** Solta o item segurado: executa a ação com a força acumulada (0..1). */
  soltarCarga(player) {
    const a = this.atorDoJogador(player);
    if (!a || !a.carga) return;
    const { tipo, inicio } = a.carga;
    a.carga = null;
    this.acaoHumano(player, tipo, clamp((this.t - inicio) / CARGA_MAX, 0, 1));
  }

  /** Ações dos itens e ataques do jogador real. carga: 0..1 (undefined = toque). */
  acaoHumano(player, acao, carga) {
    const a = this.atorDoJogador(player);
    if (!a || (this.estado !== "jogando" && this.estado !== "parado")) return;
    const b = this.bola;
    const dBola = hyp(b.x - a.x, b.z - a.z);
    const alcanca = b.dono === a || (!b.dono && dBola < 1.9 && b.y < a.y + 1.6 && a.cdChute === 0);

    if (acao === "chute") {
      if (!alcanca) return this.msgJogador(player, "§7Chegue mais perto da bola para chutar.");
      this.chuteHumano(a, carga ?? 0.75);
    } else if (acao === "passe") {
      if (!alcanca) return this.msgJogador(player, "§7Você precisa estar com a bola para passar.");
      this.passeHumano(a, player.isSneaking || (carga ?? 0) > 0.4);
    } else if (acao === "drible") {
      this.dribleHumano(a);
    } else if (acao === "dividida") {
      this.divididaHumano(a, dBola);
    } else if (acao === "pedir") {
      a.pediuTick = this.t;
      this.som("note.bell", 1.6, player);
      this.msgJogador(player, "§6Toca! Toca!");
    }
  }

  chuteHumano(a, carga) {
    const d = a.player.getViewDirection();
    const h = hyp(d.x, d.z) || 1;
    const forca = (0.75 + carga * 0.8) * (0.8 + (a.stats.chu / 99) * 0.3);
    // chute cheio perde um pouco de precisão
    const erro = (1 - a.stats.chu / 99) * (0.08 + carga * 0.1) * (Math.random() * 2 - 1);
    const ang = this.mirarGol(a, Math.atan2(d.z / h, d.x / h)) + erro;
    const subida = clamp(d.y + 0.1, 0.03, 0.85) * forca * 0.55;
    this.chutar(a, Math.cos(ang) * forca, subida, Math.sin(ang) * forca, "chute");
    a.est.chutes++;
    this.som("random.bow", 0.7, a.player);
  }

  /** Mira assistida: se o jogador olha mais ou menos para o gol, corrige o ângulo para dentro dele. */
  mirarGol(a, ang) {
    const gx = this.atacaDir(a.time) * CAMPO.LINHA_X;
    const dx = Math.cos(ang);
    const dz = Math.sin(ang);
    const dist = gx - this.bola.x;
    if (dist * dx <= 0 || Math.abs(dist) > 30) return ang;
    const zCruza = this.bola.z + (dz / dx) * dist;
    if (Math.abs(zCruza) > CAMPO.GOL_Z + 3) return ang;
    const zAlvo = clamp(zCruza, -(CAMPO.GOL_Z - 0.6), CAMPO.GOL_Z - 0.6);
    const angGol = Math.atan2(zAlvo - this.bola.z, dist);
    return ang + (angGol - ang) * 0.6;
  }

  dribleHumano(a) {
    if (a.cdDrible > 0) return this.msgJogador(a.player, `§7Arrancada recarregando (${Math.ceil(a.cdDrible / 20)}s)`);
    a.cdDrible = 80;
    a.arrancadaAte = this.t + 30;
    a.efeitoTick = 0;
    try {
      a.player.addEffect("speed", 30, { amplifier: 3, showParticles: false });
    } catch {
      // efeito indisponível
    }
    if (this.bola.dono === a) {
      a.protecao = Math.max(a.protecao, 22);
      this.msgJogador(a.player, "§d§lDRIBLE!");
    } else {
      this.msgJogador(a.player, "§dArrancada!");
    }
    this.som("mob.horse.gallop", 1.4, a.player);
  }

  passeHumano(a, lob = false) {
    const d = a.player.getViewDirection();
    const h = hyp(d.x, d.z) || 1;
    const vx = d.x / h;
    const vz = d.z / h;
    let melhor = null;
    let melhorScore = -Infinity;
    for (const m of this.atores) {
      if (m === a || m.time !== a.time) continue;
      const dx = m.x - a.x;
      const dz = m.z - a.z;
      const dist = hyp(dx, dz);
      if (dist < 2 || dist > 32) continue;
      const alinhamento = (dx * vx + dz * vz) / dist;
      if (alinhamento < 0.55) continue;
      const score = alinhamento * 10 - dist * 0.15;
      if (score > melhorScore) {
        melhorScore = score;
        melhor = m;
      }
    }
    if (melhor) {
      this.passar(a, melhor, lob);
    } else {
      const forca = 0.55 + (a.stats.pas / 99) * 0.25;
      this.chutar(a, vx * forca, lob ? 0.42 : 0.02, vz * forca, "passe");
      a.est.passesTent++;
    }
    this.som("random.pop", 0.8, a.player);
  }

  divididaHumano(a, dBola) {
    if (a.cdDividida > 0) return;
    a.cdDividida = 24;
    const b = this.bola;
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const d = hyp(dx, dz) || 1;
    if (dBola < 4) {
      try {
        a.player.applyKnockback(dx / d, dz / d, Math.min(1.4, dBola * 0.45), 0.05);
      } catch {
        // knockback indisponível
      }
    }
    const dono = b.dono;
    if (!dono || dono.time === a.time || dBola > 2.6 || dono.protecao > 0) return;
    const chance = clamp(0.3 + (a.stats.def - dono.stats.dri) / 150 + a.stats.fis / 400, 0.1, 0.8);
    if (Math.random() < chance) {
      this.roubar(a, dono);
      this.msgJogador(a.player, "§aDesarme!");
    } else {
      a.cdDividida = 40;
      this.msgJogador(a.player, "§cErrou a dividida!");
    }
  }

  // ---------------------------------------------------------------- bola

  capturar(a) {
    const b = this.bola;
    if (b.passe && b.passe.de !== a) {
      if (b.passe.de.time === a.time) {
        b.passe.de.est.passes++;
        a.assistDe = b.passe.de;
        a.assistTick = this.t;
      } else {
        a.est.desarmes++;
      }
    } else if (b.chute && b.chute.time !== a.time && a.papel !== "GOL") {
      a.est.desarmes++;
    }
    if (b.ultimo && b.ultimo.time !== a.time) a.assistDe = null;
    b.dono = a;
    b.ultimo = a;
    b.chute = null;
    b.passe = null;
    b.vx = b.vy = b.vz = 0;
    a.protecao = Math.max(a.protecao, a.papel === "GOL" ? 40 : 8);
    a.segurando = 0;
  }

  roubar(ladrao, vitima) {
    ladrao.est.desarmes++;
    vitima.cdChute = 14;
    this.capturar(ladrao);
    ladrao.assistDe = null;
    ladrao.protecao = 16;
  }

  chutar(a, vx, vy, vz, tipo) {
    const b = this.bola;
    b.dono = null;
    b.vx = vx;
    b.vy = vy;
    b.vz = vz;
    b.y = Math.max(b.y, 0.02);
    b.ultimo = a;
    b.semCaptura = 2;
    b.chute = tipo === "chute" ? { time: a.time, tentou: new Set() } : null;
    b.passe = tipo === "passe" ? { de: a, t: this.t } : null;
    a.cdChute = 10;
    a.animTimer = 6;
    a.anim = 2;
    if (this.estado === "parado") this.estado = "jogando";
    if (tipo !== "chute") a.assistDe = null;
  }

  passar(a, m, lob = false) {
    const b = this.bola;
    const tx = m.x + m.vx * 8;
    const tz = m.z + m.vz * 8;
    const dx = tx - b.x;
    const dz = tz - b.z;
    const d = hyp(dx, dz) || 1;
    const erro = (1 - a.stats.pas / 99) * 0.16 * (Math.random() * 2 - 1);
    const ang = Math.atan2(dz, dx) + erro;
    let v;
    let vy;
    if (lob) {
      vy = clamp(0.32 + d * 0.012, 0.35, 0.7);
      const tVoo = (2 * vy) / BOLA.GRAVIDADE;
      v = clamp((d / tVoo) * 1.08, 0.2, 1.3);
    } else {
      vy = 0.02;
      v = clamp(d * (1 - BOLA.ATRITO_CHAO) + 0.22, 0.3, 1.25);
    }
    this.chutar(a, Math.cos(ang) * v, vy, Math.sin(ang) * v, "passe");
    a.est.passesTent++;
  }

  chutarGol(a) {
    const b = this.bola;
    const dir = this.atacaDir(a.time);
    const gx = dir * (CAMPO.LINHA_X + 0.6);
    const gk = this.goleiro(1 - a.time);
    const lado = gk ? -Math.sign(gk.z || rand(-1, 1)) : Math.sign(rand(-1, 1));
    const zAlvo = lado * rand(1.2, 3.1);
    const hAlvo = rand(0.2, 2.3);
    const dx = gx - b.x;
    const dz = zAlvo - b.z;
    const d = hyp(dx, dz);
    const v = 1.0 + (a.stats.chu / 100) * 0.55;
    const tVoo = (d / v) * 1.08;
    const precisao = 1 - a.stats.chu / 100;
    let vy = (hAlvo + 0.02 * tVoo * tVoo) / tVoo;
    vy *= 1 + (Math.random() - 0.5) * precisao * 0.9;
    const ang = Math.atan2(dz, dx) + precisao * 0.35 * (Math.random() * 2 - 1);
    this.chutar(a, Math.cos(ang) * v, clamp(vy, 0.02, 0.9), Math.sin(ang) * v, "chute");
    a.est.chutes++;
    this.somEm("random.bow", 0.6, b);
  }

  chutao(a) {
    const dir = this.atacaDir(a.time);
    this.chutar(a, dir * rand(1.0, 1.3), rand(0.4, 0.55), rand(-0.35, 0.35), "passe");
    this.bola.passe = null;
  }

  atualizarBola() {
    const b = this.bola;
    const dono = b.dono;
    if (dono) {
      let perto = 0.75;
      if (dono.tipo === "humano" && dono.player.isSneaking) perto = 0.55;
      else if (this.t < dono.arrancadaAte) perto = 1.05;
      b.x = dono.x + dono.dirX * perto;
      b.z = dono.z + dono.dirZ * perto;
      b.y = 0;
      b.vx = dono.vx;
      b.vz = dono.vz;
      b.vy = 0;
      if (this.estado === "jogando") this.tentarRoubos(dono);
      if (Math.abs(b.z) > CAMPO.LINHA_Z + 0.4) this.lateral(Math.sign(b.z));
      else if (Math.abs(b.x) > CAMPO.LINHA_X + 0.4) {
        if (Math.abs(b.z) < CAMPO.GOL_Z) this.gol(Math.sign(b.x));
        else this.linhaDeFundo(Math.sign(b.x));
      }
      return;
    }
    this.fisicaBola(true);
    if (this.estado === "jogando" || this.estado === "parado") {
      this.defesasGoleiro();
      if (!b.dono) this.capturasLivres();
    }
  }

  tentarRoubos(dono) {
    if (dono.protecao > 0) return;
    const b = this.bola;
    const protegendo = dono.tipo === "humano" && dono.player.isSneaking;
    for (const a of this.atores) {
      if (a.time === dono.time || a.cdChute > 0) continue;
      const d = hyp(b.x - a.x, b.z - a.z);
      if (a.tipo === "npc") {
        if (d > 1.15 || this.t % 2 !== 0) continue;
        const base = dono.tipo === "humano" ? 0.07 : 0.05;
        let chance = clamp(base + (a.stats.def - dono.stats.dri) * 0.002 + (a.stats.fis - dono.stats.fis) * 0.001, 0.012, 0.18);
        if (protegendo) chance *= 0.45;
        if (Math.random() < chance) {
          this.roubar(a, dono);
          if (dono.tipo === "humano") this.msgJogador(dono.player, "§cPerdeu a bola!");
          return;
        }
      } else if (d < 0.95) {
        const chance = clamp(0.025 + (a.stats.def - dono.stats.dri) * 0.0008, 0.008, 0.06);
        if (Math.random() < chance) {
          this.roubar(a, dono);
          this.msgJogador(a.player, "§aRoubou a bola!");
          return;
        }
      }
    }
  }

  fisicaBola(regras) {
    const b = this.bola;
    const R = BOLA.RAIO;
    if (b.y > 0 || b.vy > 0) b.vy -= BOLA.GRAVIDADE;
    let nx = b.x + b.vx;
    let ny = b.y + b.vy;
    const nz = b.z + b.vz;

    // traves e travessão
    if (Math.abs(b.x) <= CAMPO.LINHA_X && Math.abs(nx) > CAMPO.LINHA_X) {
      const za = Math.abs(nz);
      if (za > CAMPO.GOL_Z - R && za < CAMPO.GOL_Z + 1 + R && ny < CAMPO.GOL_ALT + R) {
        b.vx = -b.vx * 0.6;
        b.vz += (Math.random() - 0.5) * 0.2;
        nx = b.x;
        if (regras) this.anunciar("§fNA TRAVE!", "random.anvil_land");
      } else if (za < CAMPO.GOL_Z && ny > CAMPO.GOL_ALT - R && ny < CAMPO.GOL_ALT + 1 + R) {
        b.vx = -b.vx * 0.5;
        b.vy = Math.abs(b.vy) * 0.5;
        nx = b.x;
        if (regras) this.anunciar("§fNO TRAVESSÃO!", "random.anvil_land");
      }
    }
    b.x = nx;
    b.z = nz;
    if (ny <= 0) {
      ny = 0;
      b.vy = b.vy < -0.12 ? -b.vy * BOLA.QUIQUE : 0;
    }
    b.y = ny;
    const atrito = b.y <= 0 && b.vy === 0 ? BOLA.ATRITO_CHAO : BOLA.ATRITO_AR;
    b.vx *= atrito;
    b.vz *= atrito;
    if (Math.abs(b.vx) < 0.004) b.vx = 0;
    if (Math.abs(b.vz) < 0.004) b.vz = 0;

    if (!regras) {
      // bola dentro da rede após o gol
      if (Math.abs(b.x) > CAMPO.LINHA_X) {
        if (Math.abs(b.x) > CAMPO.REDE_X) {
          b.x = Math.sign(b.x) * CAMPO.REDE_X;
          b.vx = -b.vx * 0.15;
        }
        b.z = clamp(b.z, -CAMPO.GOL_Z + R, CAMPO.GOL_Z - R);
        if (b.y > CAMPO.GOL_ALT - R) {
          b.y = CAMPO.GOL_ALT - R;
          b.vy = 0;
        }
      }
      return;
    }

    if (Math.abs(b.x) > CAMPO.LINHA_X + R) {
      if (Math.abs(b.z) < CAMPO.GOL_Z && b.y < CAMPO.GOL_ALT) this.gol(Math.sign(b.x));
      else this.linhaDeFundo(Math.sign(b.x));
    } else if (Math.abs(b.z) > CAMPO.LINHA_Z + R) {
      this.lateral(Math.sign(b.z));
    }
  }

  defesasGoleiro() {
    const b = this.bola;
    if (!b.chute) return;
    const vel = hyp(b.vx, b.vz);
    for (const g of this.atores) {
      if (g.papel !== "GOL" || g.tipo !== "npc" || g.time === b.chute.time || b.chute.tentou.has(g.id)) continue;
      const dirGol = -this.atacaDir(g.time);
      if (b.vx * dirGol <= 0) continue;
      const d = hyp(b.x - g.x, b.z - g.z);
      if (d > 1.8 || b.y > 2.9) continue;
      b.chute.tentou.add(g.id);
      // chutes no canto (longe do corpo do goleiro) e mais fortes são mais difíceis
      // distância do goleiro à trajetória da bola: chute no canto é mais difícil
      const lateral = vel > 0.01 ? Math.abs((g.x - b.x) * b.vz - (g.z - b.z) * b.vx) / vel : d;
      const canto = Math.pow(clamp(lateral / 1.8, 0, 1), 1.5) * 0.45 + (b.y > 2 ? 0.1 : 0);
      const chance = clamp(0.55 + (g.stats.def / 100) * 0.4 - (vel - 1.0) * 0.3 - canto, 0.1, 0.9);
      if (Math.random() >= chance) continue;
      g.est.defesas++;
      g.animTimer = 8;
      g.anim = 3;
      if (vel < 1.15 && Math.random() < 0.6) {
        this.capturar(g);
        this.anunciar("§bQue defesa! O goleiro segura.", "random.orb");
      } else {
        b.vx = -b.vx * 0.35;
        b.vz += (Math.random() - 0.5) * 0.6;
        b.vy = 0.25;
        b.chute = null;
        b.passe = null;
        b.ultimo = g;
        b.semCaptura = 4;
        this.anunciar("§bEspalmou o goleiro!", "random.orb");
      }
      return;
    }
  }

  capturasLivres() {
    const b = this.bola;
    if (b.semCaptura > 0) return;
    const vel = hyp(b.vx, b.vz);
    let melhor = null;
    let melhorD = Infinity;
    for (const a of this.atores) {
      if (a.cdChute > 0) continue;
      if (b.chute && b.chute.tentou.has(a.id)) continue; // goleiro que já falhou a defesa
      const d = hyp(b.x - a.x, b.z - a.z);
      let raio = a.tipo === "humano" ? 1.15 : 0.95;
      let alt = 1.1;
      if (a.papel === "GOL" && a.tipo === "npc" && this.naPropriaArea(a, b.x, b.z)) {
        raio = 1.4;
        alt = 2.6;
      }
      const by = b.y - (a.tipo === "humano" ? Math.max(0, a.y) : 0);
      if (d > raio || by > alt || by < -0.6) continue;
      if (vel > 0.95 && a.papel !== "GOL" && Math.random() < 0.5) continue;
      if (d < melhorD) {
        melhorD = d;
        melhor = a;
      }
    }
    if (melhor) this.capturar(melhor);
  }

  naPropriaArea(a, x, z) {
    const gx = -this.atacaDir(a.time) * CAMPO.LINHA_X;
    return Math.abs(x - gx) < CAMPO.AREA_X && Math.abs(z) < CAMPO.AREA_Z;
  }

  // ---------------------------------------------------------------- regras

  gol(lado) {
    const b = this.bola;
    if (this.treino && lado < 0) return this.reposicionarTreino(false);
    const marcou = this.atacaDir(0) === lado ? 0 : 1;
    this.placar[marcou]++;
    const ult = b.ultimo;
    let autor = null;
    let assist = null;
    let contra = false;
    if (ult && ult.time === marcou) {
      autor = ult;
      ult.est.gols++;
      const ad = ult.assistDe;
      if (ad && ad !== ult && ad.time === marcou && this.t - ult.assistTick < 300) {
        assist = ad;
        ad.est.assist++;
      }
    } else if (ult) {
      autor = ult;
      contra = true;
    }
    const min = this.minuto();
    this.eventos.push({ min, time: marcou, autor: autor?.nome ?? "?", assist: assist?.nome ?? null, contra });

    if (b.dono) {
      b.dono = null;
      b.vx = lado * 0.3;
    }
    const nomeAutor = autor ? `${this.o.times[autor.time].cor}${autor.nome}` : "";
    const sub = contra ? `§7Gol contra de ${nomeAutor}` : `${nomeAutor}${assist ? ` §7(assist. ${assist.nome})` : ""}`;
    this.titulo(this.treino ? "§a§lGOL!" : "§6§lGOOOOOL!", sub, 5, 50, 10);
    this.som("random.levelup", 1);
    this.som("firework.blast", 1);
    this.msgTodos(`§6${min}' §lGOL§r ${this.nomeTime(marcou)}§r! ${sub}  §f${this.placarTexto()}`);
    const p = this.mundo(lado * (CAMPO.LINHA_X + 1), 1.5, 0);
    for (let i = 0; i < 6; i++) {
      try {
        this.dim.spawnParticle("minecraft:totem_particle", { x: p.x, y: p.y + i * 0.4, z: p.z + rand(-3, 3) });
      } catch {
        // partícula indisponível
      }
    }
    for (const a of this.atores) {
      a.assistDe = null;
      if (a.time === marcou) {
        a.anim = 3;
        a.animTimer = 70;
      }
    }
    this.estado = "gol";
    this.timer = this.treino ? 30 : 90;
    this.saidaTime = 1 - marcou;
  }

  lateral(ladoZ) {
    const b = this.bola;
    if (this.treino) return this.reposicionarTreino(false);
    const timeIdx = b.ultimo ? 1 - b.ultimo.time : 0;
    this.reposicionar(timeIdx, clamp(b.x, -CAMPO.LINHA_X + 1, CAMPO.LINHA_X - 1), ladoZ * (CAMPO.LINHA_Z - 0.3), "Lateral");
  }

  linhaDeFundo(ladoX) {
    const b = this.bola;
    if (this.treino) return this.reposicionarTreino(false);
    const defensor = this.atacaDir(0) === ladoX ? 1 : 0;
    if (!b.ultimo || b.ultimo.time !== defensor) {
      const gk = this.goleiro(defensor);
      this.reposicionar(defensor, ladoX * (CAMPO.LINHA_X - 1.5), 0, "Tiro de meta", gk);
    } else {
      const lz = Math.sign(b.z) || 1;
      this.reposicionar(1 - defensor, ladoX * (CAMPO.LINHA_X - 0.4), lz * (CAMPO.LINHA_Z - 0.4), "Escanteio");
    }
  }

  reposicionar(timeIdx, x, z, nome, ator = null) {
    const b = this.bola;
    if (!ator) {
      let melhorD = Infinity;
      for (const a of this.atores) {
        if (a.time !== timeIdx || a.papel === "GOL") continue;
        const d = hyp(a.x - x, a.z - z);
        if (d < melhorD) {
          melhorD = d;
          ator = a;
        }
      }
    }
    if (!ator) return this.saida(timeIdx);
    // fica de frente para o campo
    const dx = -x;
    const dz = -z * 0.5;
    const d = hyp(dx, dz) || 1;
    ator.dirX = dx / d;
    ator.dirZ = dz / d;
    ator.x = x - ator.dirX * 0.75;
    ator.z = z - ator.dirZ * 0.75;
    ator.alvoX = ator.x;
    ator.alvoZ = ator.z;
    if (ator.tipo === "humano") {
      ator.player.teleport(this.mundo(ator.x, 0.05, ator.z), { dimension: this.dim, facingLocation: this.mundo(0, 1, 0) });
    }
    b.x = x;
    b.z = z;
    b.y = 0;
    this.capturar(ator);
    b.ultimo = ator;
    ator.protecao = 50;
    ator.forcarPasse = ator.tipo === "npc" && ator.papel !== "GOL";
    ator.segurando = 0;
    this.estado = "parado";
    this.timer = 30;
    this.msgAcao(`§e${nome}: ${this.nomeTime(timeIdx)}`);
    this.som("note.flute", 1.2);
  }

  reposicionarTreino(inicio) {
    const h = this.humanos()[0];
    if (!h) return this.finalizar("erro");
    const x = rand(9, 17);
    const z = rand(-9, 9);
    h.x = x - 0.8;
    h.z = z;
    h.dirX = 1;
    h.dirZ = 0;
    h.player.teleport(this.mundo(h.x, 0.05, h.z), { dimension: this.dim, facingLocation: this.mundo(CAMPO.LINHA_X, 1, 0) });
    const gk = this.goleiro(1);
    if (gk) {
      gk.x = CAMPO.LINHA_X - 1;
      gk.z = 0;
    }
    Object.assign(this.bola, { x, y: 0, z, vx: 0, vy: 0, vz: 0, chute: null, passe: null });
    this.capturar(h);
    this.estado = "parado";
    this.timer = 10;
    if (inicio) {
      this.titulo("§aTreino de finalização", "§7Faça o máximo de gols em 60s!", 5, 50, 10);
      h.efeitoTick = 0;
    }
  }

  // ---------------------------------------------------------------- IA

  velBase(a) {
    return 0.15 + a.stats.vel * 0.0011;
  }

  ia() {
    const b = this.bola;
    const dono = b.dono;
    for (const timeIdx of [0, 1]) {
      const npcs = this.atores.filter((a) => a.time === timeIdx && a.tipo === "npc" && a.papel !== "GOL");
      npcs.sort((p, q) => hyp(p.x - b.x, p.z - b.z) - hyp(q.x - b.x, q.z - b.z));
      const temBola = dono && dono.time === timeIdx;
      const dir = this.atacaDir(timeIdx);
      const bolaNoMeuCampo = b.x * dir < 0;
      npcs.forEach((a, idx) => {
        if (a === dono) this.iaPortador(a);
        else if (temBola) this.iaApoio(a);
        else if (!dono) {
          if (idx === 0 || (idx === 1 && bolaNoMeuCampo)) this.iaPerseguir(a);
          else this.iaFormacao(a);
        } else if (idx === 0) this.iaPressionar(a);
        else if (idx === 1) this.iaMarcar(a, dono);
        else this.iaFormacao(a);
      });
      const gk = this.goleiro(timeIdx);
      if (gk) this.iaGoleiro(gk);
    }
  }

  oponentes(a) {
    return this.atores.filter((o) => o.time !== a.time);
  }

  oponenteMaisProximo(a, soAFrente = false) {
    const dir = this.atacaDir(a.time);
    let melhor = null;
    let melhorD = Infinity;
    for (const o of this.oponentes(a)) {
      if (soAFrente && (o.x - a.x) * dir < -0.5) continue;
      const d = hyp(o.x - a.x, o.z - a.z);
      if (d < melhorD) {
        melhorD = d;
        melhor = o;
      }
    }
    return { o: melhor, d: melhorD };
  }

  linhaLivre(a, m) {
    for (const o of this.oponentes(a)) {
      if (distSegmento(o.x, o.z, a.x, a.z, m.x, m.z) < 1.3) return false;
    }
    return true;
  }

  melhorPasse(a) {
    const dir = this.atacaDir(a.time);
    let melhor = null;
    for (const m of this.atores) {
      if (m === a || m.time !== a.time || m.papel === "GOL") continue;
      const d = hyp(m.x - a.x, m.z - a.z);
      if (d < 3 || d > 28) continue;
      const progresso = (m.x - a.x) * dir;
      let livre = Infinity;
      for (const o of this.oponentes(a)) livre = Math.min(livre, hyp(o.x - m.x, o.z - m.z));
      let score = progresso * 0.4 + Math.min(livre, 6) * 0.6 - d * 0.05;
      if (!this.linhaLivre(a, m)) score -= 8;
      if (m.tipo === "humano") score += 1.5;
      if (!melhor || score > melhor.score) melhor = { ator: m, score, d };
    }
    return melhor && melhor.score > -1 ? melhor : null;
  }

  iaPortador(a) {
    a.velAlvo = this.velBase(a) * 0.88;
    if (this.estado === "parado") {
      a.alvoX = a.x;
      a.alvoZ = a.z;
      return;
    }
    const dir = this.atacaDir(a.time);
    const gx = dir * CAMPO.LINHA_X;
    const dGol = hyp(gx - a.x, a.z);

    const pedinte = this.atores.find((h) => h.tipo === "humano" && h.time === a.time && this.t - h.pediuTick < 40);
    if (pedinte && hyp(pedinte.x - a.x, pedinte.z - a.z) < 30 && Math.random() < 0.85) {
      pedinte.pediuTick = -9999;
      return this.passar(a, pedinte, !this.linhaLivre(a, pedinte));
    }
    if (a.forcarPasse && a.protecao < 40) {
      a.forcarPasse = false;
      const m = this.melhorPasse(a);
      if (m) return this.passar(a, m.ator, m.d > 14 || !this.linhaLivre(a, m.ator));
    }
    const alcance = 8 + a.stats.chu * 0.09;
    if (dGol < alcance && Math.abs(a.z) < 11) {
      const chance = 0.16 + ((alcance - dGol) / alcance) * 0.45;
      if (Math.random() < chance) return this.chutarGol(a);
    }
    const { o: perto, d: pressao } = this.oponenteMaisProximo(a);
    if (pressao < 2.3 && Math.random() < 0.16 + a.stats.pas / 500) {
      const m = this.melhorPasse(a);
      if (m) return this.passar(a, m.ator, !this.linhaLivre(a, m.ator));
    }
    if (Math.random() < 0.02) {
      const m = this.melhorPasse(a);
      if (m && m.score > 3) return this.passar(a, m.ator);
    }
    let tx = gx - dir * 3;
    let tz = a.z * 0.6;
    const { o: frente, d: dFrente } = this.oponenteMaisProximo(a, true);
    if (frente && dFrente < 4) {
      const lado = Math.sign(a.z - frente.z) || (Math.random() < 0.5 ? -1 : 1);
      tz = a.z + lado * 4;
      tx = a.x + dir * 3;
    }
    if (perto && pressao < 1.5 && a.stats.dri > 70 && Math.random() < 0.1) {
      a.protecao = Math.max(a.protecao, 6); // drible rápido
    }
    a.alvoX = tx;
    a.alvoZ = clamp(tz, -CAMPO.LINHA_Z + 1, CAMPO.LINHA_Z - 1);
  }

  posicaoFormacao(a, ataque) {
    const b = this.bola;
    const dir = this.atacaDir(a.time);
    const f = ataque ? a.fx + 0.35 : a.fx - 0.08;
    let tx = dir * f * 22 + b.x * (ataque ? 0.3 : 0.35);
    let tz = a.fz * 13 * (ataque ? 1 : 0.85) + b.z * (ataque ? 0.2 : 0.3);
    if (ataque) tx = dir * Math.min(tx * dir, 20);
    // espalha jogadores próximos
    for (const m of this.atores) {
      if (m === a || m.time !== a.time) continue;
      if (hyp(m.x - tx, m.z - tz) < 3.5) tz += Math.sign(tz - m.z || a.fz || 1) * 2.5;
    }
    return { x: clamp(tx, -23, 23), z: clamp(tz, -14, 14) };
  }

  iaApoio(a) {
    const p = this.posicaoFormacao(a, true);
    a.alvoX = p.x;
    a.alvoZ = p.z;
    a.velAlvo = this.velBase(a) * 0.9;
  }

  iaFormacao(a) {
    const p = this.posicaoFormacao(a, false);
    a.alvoX = p.x;
    a.alvoZ = p.z;
    a.velAlvo = this.velBase(a) * 0.8;
  }

  iaPerseguir(a) {
    const b = this.bola;
    const v = this.velBase(a);
    const d = hyp(b.x - a.x, b.z - a.z);
    const k = Math.min(12, d / v);
    a.alvoX = b.x + b.vx * k * 0.6;
    a.alvoZ = b.z + b.vz * k * 0.6;
    a.velAlvo = v;
  }

  iaPressionar(a) {
    const b = this.bola;
    const dirGol = -this.atacaDir(a.time);
    if (this.estado === "parado") {
      a.alvoX = b.x + dirGol * 3;
      a.alvoZ = b.z * 0.85;
    } else {
      a.alvoX = b.x + dirGol * 0.3;
      a.alvoZ = b.z;
    }
    a.velAlvo = this.velBase(a);
  }

  iaMarcar(a, dono) {
    const gx = -this.atacaDir(a.time) * CAMPO.LINHA_X;
    const dx = gx - dono.x;
    const dz = -dono.z;
    const d = hyp(dx, dz) || 1;
    const dist = Math.min(4, d * 0.5);
    a.alvoX = dono.x + (dx / d) * dist;
    a.alvoZ = dono.z + (dz / d) * dist;
    a.velAlvo = this.velBase(a) * 0.92;
  }

  iaGoleiro(g) {
    const b = this.bola;
    const dir = this.atacaDir(g.time);
    const gx = -dir * CAMPO.LINHA_X;
    const vel = 0.2 + g.stats.def * 0.001;
    g.velAlvo = vel * 0.7;

    if (b.dono === g) {
      g.segurando += 2;
      if (this.estado === "parado") {
        g.alvoX = g.x;
        g.alvoZ = g.z;
        if (this.timer > 4) return;
      }
      if (g.segurando > 30) {
        const m = this.melhorPasse(g);
        if (m && Math.random() < 0.65) this.passar(g, m.ator, m.d > 14 || !this.linhaLivre(g, m.ator));
        else this.chutao(g);
        g.segurando = 0;
      } else {
        g.alvoX = gx + dir * 2;
        g.alvoZ = clamp(g.z, -2, 2);
      }
      return;
    }

    let tx = gx + dir * 1.0;
    let tz = clamp(b.z * 0.3, -2.8, 2.8);
    const vb = hyp(b.vx, b.vz);
    if (!b.dono && b.vx * -dir > 0.2) {
      const tCruza = (gx - b.x) / b.vx;
      if (tCruza > 0 && tCruza < 30) {
        const zc = b.z + b.vz * tCruza;
        if (Math.abs(zc) < 5) {
          tz = clamp(zc, -3.6, 3.6);
          g.velAlvo = vel * 1.3;
        }
      }
    }
    if (!b.dono && this.naPropriaArea(g, b.x, b.z) && vb < 0.6) {
      tx = b.x;
      tz = b.z;
      g.velAlvo = vel;
    } else if (b.dono && b.dono.time !== g.time && Math.abs(b.x - gx) < 9) {
      tx = gx + dir * 2.2;
      tz = clamp(b.z * 0.5, -3, 3);
      g.velAlvo = vel;
    }
    g.alvoX = tx;
    g.alvoZ = tz;
  }

  moverNpcs() {
    for (const a of this.atores) {
      if (a.tipo !== "npc") continue;
      if (this.estado === "gol") {
        a.alvoX = a.x;
        a.alvoZ = a.z;
      }
      const dx = a.alvoX - a.x;
      const dz = a.alvoZ - a.z;
      const d = hyp(dx, dz);
      let v = a.velAlvo;
      if (d < 1.5) v = Math.min(v, d * 0.25 + 0.02);
      if (d > 0.06) {
        const passo = Math.min(v, d);
        a.vx = (dx / d) * passo;
        a.vz = (dz / d) * passo;
        a.dirX = dx / d;
        a.dirZ = dz / d;
      } else {
        a.vx = a.vz = 0;
      }
      for (const o of this.atores) {
        if (o === a) continue;
        const sx = a.x - o.x;
        const sz = a.z - o.z;
        const s = hyp(sx, sz);
        if (s < 0.8 && s > 0.001) {
          a.vx += (sx / s) * 0.05;
          a.vz += (sz / s) * 0.05;
        }
      }
      a.x = clamp(a.x + a.vx, -27, 27);
      a.z = clamp(a.z + a.vz, -18, 18);
    }
  }

  // ---------------------------------------------------------------- renderização / HUD

  renderizar() {
    const b = this.bola;
    for (const a of this.atores) {
      if (a.tipo !== "npc") continue;
      let fx = a.dirX;
      let fz = a.dirZ;
      if (hyp(a.vx, a.vz) < 0.02 && b.dono !== a) {
        fx = b.x - a.x;
        fz = b.z - a.z;
      }
      const yaw = (-Math.atan2(fx, fz) * 180) / Math.PI;
      a.entity.teleport(this.mundo(a.x, 0, a.z), { rotation: { x: 0, y: yaw } });
      let anim = a.animTimer > 0 ? a.anim : hyp(a.vx, a.vz) > 0.03 ? 1 : 0;
      if (anim !== a.animProp) {
        a.animProp = anim;
        try {
          a.entity.setProperty("fut:anim", anim);
        } catch {
          // sem animação
        }
      }
    }
    b.entity.teleport(this.mundo(b.x, b.y, b.z));
    b.giro += hyp(b.vx, b.vz) * 2.5;
    const g = Math.floor(b.giro) % 12;
    if (g !== b.giroProp) {
      b.giroProp = g;
      try {
        b.entity.setProperty("fut:giro", g);
      } catch {
        // sem giro
      }
    }
  }

  minuto() {
    if (this.treino) return Math.floor(this.relogio / 20);
    return Math.min(90, Math.floor((this.relogio / this.duracao) * 90));
  }

  nomeTime(i) {
    const t = this.o.times[i];
    return `${t.cor}${t.sigla}§r`;
  }

  placarTexto() {
    return `${this.nomeTime(0)} §f${this.placar[0]} x ${this.placar[1]} ${this.nomeTime(1)}`;
  }

  hud() {
    if (this.acaoTimer > this.t) return;
    let base;
    if (this.treino) {
      const rest = Math.max(0, Math.ceil((this.duracao - this.relogio) / 20));
      base = `§aGols: §f${this.placar[0]}  §7| §eTempo: §f${rest}s`;
    } else {
      base = `${this.placarTexto()}  §7| §f${this.minuto()}' §7${this.tempo}ºT`;
    }
    for (const h of this.humanos()) {
      const dono = this.bola.dono;
      let dica;
      if (h.carga) {
        const n = Math.round(clamp((this.t - h.carga.inicio) / CARGA_MAX, 0, 1) * 15);
        const cor = n > 12 ? "§c" : n > 7 ? "§6" : "§e";
        dica = `${h.carga.tipo === "chute" ? "§lFORÇA" : "§lPASSE"} ${cor}${"|".repeat(n)}§8${"|".repeat(15 - n)}`;
      } else if (dono === h) {
        dica = h.player.isSneaking ? "§b● Protegendo a bola" : "§a● Sua bola  §e[1] Chute  §a[2] Passe  §d[3] Drible";
      } else if (dono && dono.time !== h.time) {
        dica = "§c[4] Desarme  §d[3] Arrancada";
      } else if (dono) {
        dica = "§6[5] Pedir a bola  §d[3] Arrancada";
      } else {
        dica = "§7Bola livre: encoste para dominar";
      }
      try {
        h.player.onScreenDisplay.setActionBar(`${base}\n${dica}`);
      } catch {
        // tela indisponível
      }
    }
  }

  msgAcao(txt) {
    this.acaoTimer = this.t + 40;
    for (const h of this.humanos()) {
      try {
        h.player.onScreenDisplay.setActionBar(txt);
      } catch {
        // tela indisponível
      }
    }
  }

  anunciar(txt, som) {
    this.msgAcao(txt);
    if (som) this.som(som, 1);
  }

  titulo(t, sub = "", fi = 5, stay = 40, fo = 10) {
    for (const h of this.humanos()) {
      try {
        h.player.onScreenDisplay.setTitle(t, { subtitle: sub, fadeInDuration: fi, stayDuration: stay, fadeOutDuration: fo });
      } catch {
        // tela indisponível
      }
    }
  }

  som(id, pitch = 1, player = null) {
    const alvos = player ? [player] : this.humanos().map((h) => h.player);
    for (const p of alvos) {
      try {
        p.playSound(id, { pitch, volume: 0.8 });
      } catch {
        // som indisponível
      }
    }
  }

  somEm(id, pitch, pos) {
    try {
      world.playSound(id, this.mundo(pos.x, pos.y, pos.z), { pitch, volume: 1 });
    } catch {
      // som indisponível
    }
  }

  msgTodos(txt) {
    for (const h of this.humanos()) h.player.sendMessage(txt);
  }

  msgJogador(p, txt) {
    try {
      p.onScreenDisplay.setActionBar(txt);
    } catch {
      // tela indisponível
    }
    this.acaoTimer = this.t + 20;
  }
}
