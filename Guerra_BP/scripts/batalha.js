import { world, system, ItemStack } from "@minecraft/server";
import { FACCOES, INTENSIDADES, VALOR_ABATE, NOME_TIPO, infoEntidade } from "./faccoes.js";
import { salvarTerreno, transformarTerreno, posicoesBases } from "./terreno.js";
import { registrar } from "./perfil.js";
import { rand } from "./util.js";

let batalhaAtual = null;
export const getBatalha = () => batalhaAtual;

const HP_NUCLEO = 600;

function valido(e) {
  try {
    return !!e && e.isValid();
  } catch {
    return false;
  }
}

export function temFamilia(e, fam) {
  try {
    return !!e.getComponent("type_family")?.hasTypeFamily(fam);
  } catch {
    return false;
  }
}

export function vida(e) {
  return e.getComponent("health");
}

/** Remove todas as unidades, núcleos e projéteis do addon. */
export function limparUnidades(dim) {
  let n = 0;
  for (const fam of ["guerra", "guerra_projetil"]) {
    for (const e of dim.getEntities({ families: [fam] })) {
      try {
        e.remove();
        n++;
      } catch {
        // já removida
      }
    }
  }
  return n;
}

export function removerTagsGuerra(player) {
  for (const t of player.getTags()) if (t.startsWith("guerra_")) player.removeTag(t);
}

export function kitBatalha(faccao) {
  const itens = [
    ["guerra:rifle", 1],
    ["guerra:canhao", 1],
    ["guerra:granada", 8],
    ["guerra:escudo", 1],
    ["guerra:comunicador", 1],
  ];
  if (faccao) itens.push([`guerra:estandarte_${faccao}`, 1]);
  return itens;
}

export function darItens(player, itens) {
  const inv = player.getComponent("inventory")?.container;
  if (!inv) return;
  for (const [id, qtd] of itens) {
    let tem = false;
    for (let i = 0; i < inv.size; i++) if (inv.getItem(i)?.typeId === id) tem = true;
    if (tem) continue;
    const resto = inv.addItem(new ItemStack(id, qtd));
    if (resto) player.dimension.spawnItem(resto, player.location);
  }
}

export class Batalha {
  /**
   * @param {object} o
   * @param {import("@minecraft/server").Player} o.lider
   * @param {string|null} o.faccaoJogador facção dos jogadores (null = só assistir)
   * @param {string[]} o.faccoes facções participantes
   * @param {object} o.cenario
   * @param {number} o.raio
   * @param {number} o.intensidade índice em INTENSIDADES
   */
  constructor(o) {
    this.o = o;
    this.dim = o.lider.dimension;
    const l = o.lider.location;
    this.centro = { x: Math.floor(l.x), y: Math.floor(l.y), z: Math.floor(l.z) };
    this.int = INTENSIDADES[o.intensidade];
    // a facção do jogador fica na primeira base
    const ordem = o.faccaoJogador ? [o.faccaoJogador, ...o.faccoes.filter((f) => f !== o.faccaoJogador)] : [...o.faccoes];
    this.bases = posicoesBases(ordem, o.raio).map((b) => ({ ...b, nucleo: null, vivo: true }));
    this.estado = "preparando";
    this.onda = 0;
    this.t = 0;
    this.proximaOnda = 0;
    this.ordem = "atacar";
    this.abates = new Map(); // playerId -> abates
    this.baixas = Object.fromEntries(ordem.map((f) => [f, 0]));
    this.jogadores = [];
    this.cooldowns = new Map();
  }

  // ---------------------------------------------------------------- início

  iniciar() {
    batalhaAtual = this;
    const { x, y, z } = this.centro;
    const raio = this.o.raio;
    this.jogadores = this.dim
      .getPlayers()
      .filter((p) => Math.hypot(p.location.x - x, p.location.z - z) <= raio + 24);
    if (!this.jogadores.includes(this.o.lider)) this.jogadores.push(this.o.lider);

    limparUnidades(this.dim);
    this.dim.runCommandAsync(`tickingarea remove guerra_batalha`).catch(() => {});
    this.dim.runCommandAsync(`tickingarea add circle ${x} ${y} ${z} 4 guerra_batalha`).catch(() => {});
    this.titulo("§b§lNÚCLEO ATIVADO", "§7Salvando o terreno original...");
    this.som("beacon.activate");

    salvarTerreno(this.dim, this.centro, raio, (falhas) => {
      if (falhas) this.msg("§e[Guerra] Não foi possível salvar o terreno inteiro: a restauração pode ficar incompleta.");
      this.transformar();
    });
  }

  transformar() {
    this.estado = "transformando";
    this.titulo("§c§lTRANSFORMAÇÃO!", `§7O campo de batalha se forma: §f${this.o.cenario.nome}`);
    this.som("ambient.weather.thunder");
    let ultimoSom = 0;
    transformarTerreno(
      this.dim,
      this.centro,
      this.o.raio,
      this.o.cenario,
      this.bases,
      (frac) => {
        this.atualizarBarra(`§c§lTRANSFORMANDO §r${"§b|".repeat(Math.round(frac * 20))}${"§8|".repeat(20 - Math.round(frac * 20))}`);
        if (this.t++ - ultimoSom > 8) {
          ultimoSom = this.t;
          this.som("random.explode", 0.6 + frac);
        }
      },
      (falhas) => {
        if (falhas > 20) this.msg(`§e[Guerra] ${falhas} etapas da transformação falharam (área fora dos chunks carregados?).`);
        system.runTimeout(() => this.comecarCombate(), 20);
      },
    );
  }

  comecarCombate() {
    const { x, y, z } = this.centro;
    for (const b of this.bases) {
      const n = this.dim.spawnEntity(`guerra:${b.faccao}_nucleo`, { x: x + b.x + 0.5, y, z: z + b.z + 0.5 });
      b.nucleo = n;
      this.nomearNucleo(b);
    }
    const minha = this.minhaBase();
    for (const p of this.jogadores) {
      removerTagsGuerra(p);
      p.addTag("guerra_participante");
      if (this.o.faccaoJogador) {
        p.addTag(`guerra_aliado_${this.o.faccaoJogador}`);
        for (const b of this.bases) if (b.faccao !== this.o.faccaoJogador) p.addTag(`guerra_inimigo_${b.faccao}`);
      }
      try {
        const sp = p.getSpawnPoint();
        if (sp) p.setDynamicProperty("guerra:spawn", JSON.stringify({ x: sp.x, y: sp.y, z: sp.z, dim: sp.dimension.id }));
      } catch {
        // sem ponto de renascimento salvo
      }
      const destino = minha ? { x: x + minha.x + 0.5, y: y + 0.1, z: z + minha.z + 3.5 } : { x: x + 0.5, y: y + 0.1, z: z + 0.5 };
      p.teleport(destino, { dimension: this.dim });
      if (minha) p.setSpawnPoint({ dimension: this.dim, x: Math.floor(destino.x), y: Math.floor(destino.y), z: Math.floor(destino.z) });
      darItens(p, kitBatalha(this.o.faccaoJogador));
      this.efeitos(p);
    }
    this.estado = "combate";
    this.proximaOnda = 0;
    const nomes = this.bases.map((b) => `${FACCOES[b.faccao].cor}${FACCOES[b.faccao].nome}`).join(" §fvs ");
    this.titulo("§4§lBATALHA!", nomes);
    this.som("mob.wither.spawn", 1.2);
    this.msg(`§c[Guerra] §fA batalha começou: ${nomes}`);
    if (this.o.faccaoJogador) {
      this.msg("§7Destrua os §fnúcleos inimigos§7 e proteja o seu! Use o §aComunicador§7 para dar ordens e pedir ataque orbital.");
      this.msg("§7Segure o §fEstandarte§7 para suas tropas te seguirem.");
    } else {
      this.msg("§7Modo espectador: a última facção com núcleo de pé vence.");
    }
    this.loop = system.runInterval(() => {
      try {
        this.tick();
      } catch (e) {
        console.warn(`[Guerra] erro no tick: ${e}\n${e?.stack ?? ""}`);
      }
    }, 5);
  }

  // ---------------------------------------------------------------- utilidades

  minhaBase() {
    return this.bases.find((b) => b.faccao === this.o.faccaoJogador) ?? null;
  }

  base(f) {
    return this.bases.find((b) => b.faccao === f);
  }

  participa(player) {
    return this.jogadores.some((p) => p.id === player.id);
  }

  jogadoresValidos() {
    return this.jogadores.filter(valido);
  }

  efeitos(p) {
    try {
      p.addEffect("health_boost", 1200, { amplifier: 2, showParticles: false });
      p.addEffect("saturation", 1200, { amplifier: 0, showParticles: false });
    } catch {
      // efeitos indisponíveis
    }
  }

  nomearNucleo(b) {
    if (!valido(b.nucleo)) return;
    const f = FACCOES[b.faccao];
    const hp = Math.ceil(vida(b.nucleo)?.currentValue ?? 0);
    const max = vida(b.nucleo)?.effectiveMax ?? HP_NUCLEO;
    const n = Math.round((hp / max) * 10);
    b.nucleo.nameTag = `${f.cor}§lNúcleo ${f.nome}\n§a${"|".repeat(n)}§8${"|".repeat(10 - n)} §f${hp}`;
  }

  unidades(f) {
    return this.dim.getEntities({ families: [`faccao_${f}`, "guerra_unidade"] });
  }

  cooldown(player, chave, ticks) {
    const k = `${player.id}:${chave}`;
    const agora = system.currentTick;
    const fim = this.cooldowns.get(k) ?? 0;
    if (agora < fim) return Math.ceil((fim - agora) / 20);
    this.cooldowns.set(k, agora + ticks);
    return 0;
  }

  // ---------------------------------------------------------------- ciclo

  tick() {
    if (this.estado !== "combate") return;
    this.t++;
    // núcleos
    for (const b of this.bases) {
      if (!b.vivo) continue;
      const h = valido(b.nucleo) ? vida(b.nucleo)?.currentValue ?? 0 : 0;
      if (h <= 0) this.nucleoDestruido(b, null);
      else if (this.t % 2 === 0) this.nomearNucleo(b);
    }
    if (this.estado !== "combate") return;

    // ondas
    if (this.t >= this.proximaOnda) {
      this.onda++;
      this.proximaOnda = this.t + this.int.intervalo * 4;
      for (const b of this.bases) if (b.vivo) this.enviarEsquadrao(b);
      if (this.onda > 1) this.atualizarBarra(`§e§lOnda ${this.onda}§r§7: reforços chegaram ao campo!`);
    }

    // médicos curam aliados a cada segundo
    if (this.t % 4 === 0) this.curar();

    // efeitos dos jogadores
    if (this.t % 200 === 0) for (const p of this.jogadoresValidos()) this.efeitos(p);

    if (this.t % 2 === 0) this.hud();
  }

  composicao(n) {
    const lista = [];
    for (let i = 0; i < this.int.esquadrao; i++) {
      if (i === 0 && n % 2 === 0) lista.push("sniper");
      else if (i === 1) lista.push("pesado");
      else if (i === 2 && n % 2 === 1) lista.push("medico");
      else lista.push("soldado");
    }
    if (n % 3 === 0) lista.push("drone");
    if (n % 3 === 0 && this.o.intensidade >= 2) lista.push("drone");
    // o titã vem na frente para não ficar de fora quando o limite de tropas está quase cheio
    if (n % 5 === 0) lista.unshift("tita");
    return lista;
  }

  enviarEsquadrao(b, tipos = null, perto = null, ordem = null) {
    const f = b.faccao;
    const atuais = this.unidades(f);
    let vagas = this.int.limite - atuais.length;
    if (vagas <= 0 && !tipos) return 0;
    let titas = atuais.filter((e) => e.typeId.endsWith("_tita")).length;
    const lista = tipos ?? this.composicao(this.onda);
    const origem = perto ?? { x: this.centro.x + b.x + 0.5, y: this.centro.y, z: this.centro.z + b.z + 0.5 };
    const ordemFinal = ordem ?? (f === this.o.faccaoJogador ? this.ordem : "atacar");
    let n = 0;
    for (const tipo of lista) {
      if (!tipos && vagas-- <= 0) break;
      if (tipo === "tita") {
        if (!tipos && titas >= this.int.titas) continue;
        titas++;
      }
      const ang = rand(0, Math.PI * 2);
      const r = rand(2, 4);
      const loc = { x: origem.x + Math.cos(ang) * r, y: origem.y + (tipo === "drone" ? 3 : 0), z: origem.z + Math.sin(ang) * r };
      try {
        const e = this.dim.spawnEntity(`guerra:${f}_${tipo}`, loc);
        if (tipo === "tita") e.nameTag = `${FACCOES[f].cor}§lTitã ${FACCOES[f].nome}`;
        if (ordemFinal === "defender") e.triggerEvent("guerra:defender");
        n++;
      } catch {
        // área não carregada
      }
    }
    return n;
  }

  curar() {
    for (const m of this.dim.getEntities({ families: ["guerra_medico"] })) {
      const info = infoEntidade(m.typeId);
      if (!info) continue;
      const alvos = this.dim.getEntities({ location: m.location, maxDistance: 6, families: [`faccao_${info.faccao}`, "guerra_unidade"] });
      if (info.faccao === this.o.faccaoJogador) {
        alvos.push(...this.dim.getPlayers({ location: m.location, maxDistance: 6, tags: [`guerra_aliado_${info.faccao}`] }));
      }
      for (const a of alvos) {
        const h = vida(a);
        if (!h || h.currentValue >= h.effectiveMax) continue;
        h.setCurrentValue(Math.min(h.effectiveMax, h.currentValue + 3));
        try {
          this.dim.spawnParticle("minecraft:heart_particle", { x: a.location.x, y: a.location.y + 2, z: a.location.z });
        } catch {
          // partícula indisponível
        }
      }
    }
  }

  // ---------------------------------------------------------------- eventos

  aoMorrer(morto, assassino) {
    const info = infoEntidade(morto.typeId);
    if (!info) return;
    if (info.tipo === "nucleo") {
      const b = this.base(info.faccao);
      if (b && b.vivo) this.nucleoDestruido(b, assassino);
      return;
    }
    this.baixas[info.faccao] = (this.baixas[info.faccao] ?? 0) + 1;
    if (assassino?.typeId === "minecraft:player" && this.participa(assassino) && info.faccao !== this.o.faccaoJogador) {
      const valor = VALOR_ABATE[info.tipo] ?? 5;
      this.abates.set(assassino.id, (this.abates.get(assassino.id) ?? 0) + 1);
      registrar(assassino, { creditos: valor, abates: 1 });
      try {
        assassino.onScreenDisplay.setActionBar(`§c+1 abate §7(${NOME_TIPO[info.tipo]}) §6+${valor} créditos`);
      } catch {
        // tela indisponível
      }
    }
  }

  nucleoDestruido(b, assassino) {
    b.vivo = false;
    const f = FACCOES[b.faccao];
    const loc = { x: this.centro.x + b.x + 0.5, y: this.centro.y + 1, z: this.centro.z + b.z + 0.5 };
    try {
      this.dim.createExplosion(loc, 4, { breaksBlocks: false, causesFire: false });
      this.dim.spawnParticle("minecraft:huge_explosion_emitter", loc);
    } catch {
      // explosão indisponível
    }
    if (valido(b.nucleo)) b.nucleo.remove();
    this.titulo(`${f.cor}§lNÚCLEO DESTRUÍDO`, `§f${f.nome} perdeu sua base!`);
    this.som("random.explode", 0.5);
    this.msg(`§c[Guerra] §fO núcleo da ${f.cor}${f.nome}§f foi destruído!`);
    if (assassino?.typeId === "minecraft:player" && this.participa(assassino) && b.faccao !== this.o.faccaoJogador) {
      registrar(assassino, { creditos: VALOR_ABATE.nucleo });
      this.msg(`§6${assassino.name} destruiu o núcleo! +${VALOR_ABATE.nucleo} créditos`);
    }
    this.verificarFim();
  }

  verificarFim() {
    const vivos = this.bases.filter((b) => b.vivo);
    const minha = this.minhaBase();
    if (minha && !minha.vivo) return this.finalizar("derrota");
    if (vivos.length <= 1) return this.finalizar(minha ? "vitoria" : "fim", vivos[0]?.faccao ?? null);
  }

  // ---------------------------------------------------------------- fim

  finalizar(motivo, vencedor = null) {
    if (this.estado === "fim") return;
    this.estado = "fim";
    if (this.loop !== undefined) system.clearRun(this.loop);
    const premio = [50, 80, 120, 180][this.o.intensidade];
    const resultado = { motivo, vencedor, onda: this.onda, baixas: { ...this.baixas }, jogadores: [] };
    for (const p of this.jogadoresValidos()) {
      const abates = this.abates.get(p.id) ?? 0;
      let creditos = 0;
      if (motivo === "vitoria") {
        creditos = premio * 2;
        registrar(p, { creditos, vitorias: 1, batalhas: 1 });
      } else if (motivo === "derrota") {
        creditos = Math.round(premio / 2);
        registrar(p, { creditos, derrotas: 1, batalhas: 1 });
      } else {
        registrar(p, { batalhas: 1 });
      }
      resultado.jogadores.push({ player: p, abates, creditos });
      if (motivo === "vitoria") p.onScreenDisplay.setTitle("§6§lVITÓRIA!", { subtitle: `§f+${creditos} créditos`, fadeInDuration: 10, stayDuration: 80, fadeOutDuration: 20 });
      else if (motivo === "derrota") p.onScreenDisplay.setTitle("§4§lDERROTA", { subtitle: "§7Seu núcleo caiu...", fadeInDuration: 10, stayDuration: 80, fadeOutDuration: 20 });
      else if (vencedor) p.onScreenDisplay.setTitle(`${FACCOES[vencedor].cor}§l${FACCOES[vencedor].nome}`, { subtitle: "§fvenceu a batalha!", fadeInDuration: 10, stayDuration: 80, fadeOutDuration: 20 });
      p.playSound(motivo === "derrota" ? "mob.wither.death" : "random.totem");
      this.liberarJogador(p);
    }
    this.dim.runCommandAsync("tickingarea remove guerra_batalha").catch(() => {});
    // as tropas restantes somem depois de alguns segundos
    system.runTimeout(() => limparUnidades(this.dim), motivo === "cancelada" ? 1 : 160);
    if (batalhaAtual === this) batalhaAtual = null;
    this.o.aoTerminar?.(resultado);
  }

  liberarJogador(p) {
    removerTagsGuerra(p);
    try {
      const s = p.getDynamicProperty("guerra:spawn");
      if (typeof s === "string") {
        const sp = JSON.parse(s);
        p.setSpawnPoint({ dimension: world.getDimension(sp.dim), x: sp.x, y: sp.y, z: sp.z });
        p.setDynamicProperty("guerra:spawn", undefined);
      }
    } catch {
      // ponto de renascimento não restaurado
    }
  }

  jogadorSaiu(playerId) {
    this.jogadores = this.jogadores.filter((p) => valido(p) && p.id !== playerId);
    if (this.jogadores.length === 0 && this.estado === "combate") this.finalizar("cancelada");
  }

  // ---------------------------------------------------------------- HUD

  hud() {
    const partes = this.bases.map((b) => {
      const f = FACCOES[b.faccao];
      if (!b.vivo) return `§8${f.sigla} X`;
      const h = valido(b.nucleo) ? vida(b.nucleo).currentValue / vida(b.nucleo).effectiveMax : 0;
      const n = Math.round(h * 5);
      return `${f.cor}${f.sigla} ${"|".repeat(n)}§8${"|".repeat(5 - n)}`;
    });
    for (const p of this.jogadoresValidos()) {
      if ((this.barraAte ?? 0) > system.currentTick) continue;
      try {
        p.onScreenDisplay.setActionBar(`§fOnda §e${this.onda} §8| ${partes.join(" §8| ")} §8| §cAbates ${this.abates.get(p.id) ?? 0}`);
      } catch {
        // tela indisponível
      }
    }
  }

  atualizarBarra(txt) {
    this.barraAte = system.currentTick + 40;
    for (const p of this.jogadoresValidos()) {
      try {
        p.onScreenDisplay.setActionBar(txt);
      } catch {
        // tela indisponível
      }
    }
  }

  titulo(t, sub = "") {
    for (const p of this.jogadoresValidos()) {
      try {
        p.onScreenDisplay.setTitle(t, { subtitle: sub, fadeInDuration: 5, stayDuration: 50, fadeOutDuration: 15 });
      } catch {
        // tela indisponível
      }
    }
  }

  som(id, pitch = 1) {
    for (const p of this.jogadoresValidos()) {
      try {
        p.playSound(id, { pitch, volume: 1 });
      } catch {
        // som indisponível
      }
    }
  }

  msg(txt) {
    for (const p of this.jogadoresValidos()) p.sendMessage(txt);
  }
}
