import { world, system, ItemStack } from "@minecraft/server";
import { FACCOES, INTENSIDADES, VALOR_ABATE, NOME_TIPO, CLASSES, infoEntidade } from "./faccoes.js";
import { salvarTerreno, transformarTerreno, posicoesBases } from "./terreno.js";
import { registrar } from "./perfil.js";
import { rand } from "./util.js";
import { hudArmaAte } from "./hud.js";

let batalhaAtual = null;
export const getBatalha = () => batalhaAtual;

const HP_COMANDO = 900;
const VEICULOS = new Set(["tanque", "blindado"]);

export function valido(e) {
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

export function faccaoDoJogador(player) {
  for (const t of player.getTags()) if (t.startsWith("gm_aliado_")) return t.slice("gm_aliado_".length);
  return null;
}

/** Remove todas as tropas, veículos, postos e projéteis do addon. */
export function limparUnidades(dim) {
  let n = 0;
  for (const fam of ["gm", "gm_projetil"]) {
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
  for (const t of player.getTags()) if (t.startsWith("gm_")) player.removeTag(t);
}

export function kitBatalha(faccao, classeId) {
  const classe = CLASSES.find((c) => c.id === classeId) ?? CLASSES[0];
  const itens = [["gm:radio", 1], ...classe.itens, ["gm:kit_medico", 2], ["gm:granada", 2]];
  if (faccao) itens.push([`gm:bandeira_${faccao}`, 1]);
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
   * @param {string} o.classe id da classe do jogador
   */
  constructor(o) {
    this.o = o;
    this.dim = o.lider.dimension;
    const l = o.lider.location;
    this.centro = { x: Math.floor(l.x), y: Math.floor(l.y), z: Math.floor(l.z) };
    this.int = INTENSIDADES[o.intensidade];
    // a facção do jogador fica na primeira base
    const ordem = o.faccaoJogador ? [o.faccaoJogador, ...o.faccoes.filter((f) => f !== o.faccaoJogador)] : [...o.faccoes];
    this.bases = posicoesBases(ordem, o.raio).map((b) => ({ ...b, comando: null, vivo: true }));
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
    this.jogadores = this.dim.getPlayers().filter((p) => Math.hypot(p.location.x - x, p.location.z - z) <= raio + 24);
    if (!this.jogadores.includes(this.o.lider)) this.jogadores.push(this.o.lider);

    limparUnidades(this.dim);
    this.dim.runCommandAsync("tickingarea remove gm_batalha").catch(() => {});
    this.dim.runCommandAsync(`tickingarea add circle ${x} ${y} ${z} 4 gm_batalha`).catch(() => {});
    this.titulo("§a§lRÁDIO: COMANDO", "§7Salvando o terreno original...");
    this.som("gm.radio");

    salvarTerreno(this.dim, this.centro, raio, (falhas) => {
      if (falhas) this.msg("§e[Guerra Moderna] Não foi possível salvar o terreno inteiro: a restauração pode ficar incompleta.");
      this.transformar();
    });
  }

  transformar() {
    this.estado = "transformando";
    this.titulo("§c§lBOMBARDEIO!", `§7O campo de batalha se forma: §f${this.o.cenario.nome}`);
    this.som("gm.assobio");
    let ultimoSom = 0;
    transformarTerreno(
      this.dim,
      this.centro,
      this.o.raio,
      this.o.cenario,
      this.bases,
      (frac) => {
        this.atualizarBarra(`§c§lPREPARANDO O CAMPO §r${"§6|".repeat(Math.round(frac * 20))}${"§8|".repeat(20 - Math.round(frac * 20))}`);
        if (this.t++ - ultimoSom > 10) {
          ultimoSom = this.t;
          this.som("gm.explosao", 0.8 + frac * 0.3);
        }
      },
      (falhas) => {
        if (falhas > 20) this.msg(`§e[Guerra Moderna] ${falhas} etapas da transformação falharam (área fora dos chunks carregados?).`);
        system.runTimeout(() => this.comecarCombate(), 20);
      },
    );
  }

  posBase(b, dx = 0, dz = 0) {
    return { x: this.centro.x + b.x + 0.5 + dx, y: this.centro.y, z: this.centro.z + b.z + 0.5 + dz };
  }

  /** Ponto logo fora do portão da base, virado para o centro do mapa (onde nascem os veículos). */
  portao(b) {
    const d = Math.hypot(b.x, b.z) || 1;
    return this.posBase(b, (-b.x / d) * 12, (-b.z / d) * 12);
  }

  comecarCombate() {
    const { x, y, z } = this.centro;
    for (const b of this.bases) {
      b.comando = this.dim.spawnEntity(`gm:${b.faccao}_comando`, this.posBase(b));
      this.nomearComando(b);
    }
    const minha = this.minhaBase();
    if (minha) {
      // um tanque pronto para o jogador, estacionado no portão da base
      try {
        const tanque = this.dim.spawnEntity(`gm:${minha.faccao}_tanque_p`, this.portao(minha));
        tanque.nameTag = "§aSeu tanque";
      } catch {
        // área não carregada
      }
    }
    for (const p of this.jogadores) {
      removerTagsGuerra(p);
      p.addTag("gm_participante");
      if (this.o.faccaoJogador) {
        p.addTag(`gm_aliado_${this.o.faccaoJogador}`);
        for (const b of this.bases) if (b.faccao !== this.o.faccaoJogador) p.addTag(`gm_inimigo_${b.faccao}`);
      }
      try {
        const sp = p.getSpawnPoint();
        if (sp) p.setDynamicProperty("gm:spawn", JSON.stringify({ x: sp.x, y: sp.y, z: sp.z, dim: sp.dimension.id }));
      } catch {
        // sem ponto de renascimento salvo
      }
      const destino = minha ? this.posBase(minha, 0, 4) : { x: x + 0.5, y: y + 0.1, z: z + 0.5 };
      destino.y += 0.1;
      p.teleport(destino, { dimension: this.dim });
      if (minha) p.setSpawnPoint({ dimension: this.dim, x: Math.floor(destino.x), y: Math.floor(destino.y), z: Math.floor(destino.z) });
      darItens(p, kitBatalha(this.o.faccaoJogador, this.o.classe));
      this.efeitos(p);
    }
    this.estado = "combate";
    this.proximaOnda = 0;
    const nomes = this.bases.map((b) => `${FACCOES[b.faccao].cor}${FACCOES[b.faccao].nome}`).join(" §fvs ");
    this.titulo("§4§lAO ATAQUE!", nomes);
    this.som("raid.horn", 1);
    this.msg(`§c[Guerra Moderna] §fA batalha começou: ${nomes}`);
    if (this.o.faccaoJogador) {
      this.msg("§7Destrua os §fpostos de comando§7 inimigos e proteja o seu. Há um §atanque§7 esperando no portão da sua base: clique nele para pilotar.");
      this.msg("§7Rádio: ordens, reforços, blindados e artilharia. Segure a §fBandeira§7 para suas tropas te seguirem.");
    } else {
      this.msg("§7Modo espectador: a última facção com posto de comando de pé vence.");
    }
    this.loop = system.runInterval(() => {
      try {
        this.tick();
      } catch (e) {
        console.warn(`[Guerra Moderna] erro no tick: ${e}\n${e?.stack ?? ""}`);
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
      p.addEffect("health_boost", 1200, { amplifier: 1, showParticles: false });
      p.addEffect("saturation", 1200, { amplifier: 0, showParticles: false });
    } catch {
      // efeitos indisponíveis
    }
  }

  nomearComando(b) {
    if (!valido(b.comando)) return;
    const f = FACCOES[b.faccao];
    const hp = Math.ceil(vida(b.comando)?.currentValue ?? 0);
    const max = vida(b.comando)?.effectiveMax ?? HP_COMANDO;
    const n = Math.round((hp / max) * 10);
    b.comando.nameTag = `${f.cor}§lPosto de Comando ${f.sigla}\n§a${"|".repeat(n)}§8${"|".repeat(10 - n)} §f${hp}`;
  }

  unidades(f) {
    return this.dim.getEntities({ families: [`gm_${f}`, "gm_unidade"] });
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
    for (const b of this.bases) {
      if (!b.vivo) continue;
      const h = valido(b.comando) ? vida(b.comando)?.currentValue ?? 0 : 0;
      if (h <= 0) this.comandoDestruido(b, null);
      else if (this.t % 2 === 0) this.nomearComando(b);
    }
    if (this.estado !== "combate") return;

    if (this.t >= this.proximaOnda) {
      this.onda++;
      this.proximaOnda = this.t + this.int.intervalo * 4;
      for (const b of this.bases) if (b.vivo) this.enviarEsquadrao(b);
      if (this.onda > 1) this.atualizarBarra(`§e§lOnda ${this.onda}§r§7: reforços chegaram ao front!`);
    }
    if (this.t % 4 === 0) this.curar();
    if (this.t % 8 === 0) this.roncoDosMotores();
    if (this.t % 200 === 0) for (const p of this.jogadoresValidos()) this.efeitos(p);
    if (this.t % 2 === 0) this.hud();
  }

  composicao(n) {
    const lista = [];
    // veículos vão na frente para não ficarem de fora quando o limite de tropas está quase cheio
    if (n % 4 === 0) lista.push("tanque");
    if (n % 3 === 0) lista.push("blindado");
    for (let i = 0; i < this.int.esquadrao; i++) {
      if (i === 0) lista.push(n % 2 === 0 ? "atirador" : "bazuca");
      else if (i === 1) lista.push("metralhador");
      else if (i === 2) lista.push("medico");
      else lista.push("fuzileiro");
    }
    return lista;
  }

  enviarEsquadrao(b, tipos = null, perto = null, ordem = null) {
    const f = b.faccao;
    const atuais = this.unidades(f);
    let vagas = this.int.limite - atuais.length;
    if (vagas <= 0 && !tipos) return 0;
    let veiculos = atuais.filter((e) => temFamilia(e, "gm_veiculo")).length;
    const lista = tipos ?? this.composicao(this.onda);
    const ordemFinal = ordem ?? (f === this.o.faccaoJogador ? this.ordem : "atacar");
    let n = 0;
    for (const tipo of lista) {
      const veic = VEICULOS.has(tipo);
      if (!tipos && vagas-- <= 0) break;
      if (veic && !tipos) {
        if (veiculos >= this.int.veiculos) continue;
        veiculos++;
      }
      const origem = perto ?? (veic ? this.portao(b) : this.posBase(b));
      const ang = rand(0, Math.PI * 2);
      const r = veic ? rand(0, 2) : rand(2, 4);
      const loc = { x: origem.x + Math.cos(ang) * r, y: origem.y, z: origem.z + Math.sin(ang) * r };
      try {
        const e = this.dim.spawnEntity(`gm:${f}_${tipo}`, loc);
        if (veic) e.nameTag = `${FACCOES[f].cor}${NOME_TIPO[tipo]} ${FACCOES[f].sigla}`;
        if (ordemFinal === "defender") e.triggerEvent("gm:defender");
        n++;
      } catch {
        // área não carregada
      }
    }
    return n;
  }

  curar() {
    for (const m of this.dim.getEntities({ families: ["gm_medico"] })) {
      const info = infoEntidade(m.typeId);
      if (!info) continue;
      const alvos = this.dim.getEntities({ location: m.location, maxDistance: 6, families: [`gm_${info.faccao}`, "gm_unidade"] })
        .filter((a) => !temFamilia(a, "gm_veiculo"));
      if (info.faccao === this.o.faccaoJogador) {
        alvos.push(...this.dim.getPlayers({ location: m.location, maxDistance: 6, tags: [`gm_aliado_${info.faccao}`] }));
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

  /** O som do motor (2 s, em loop) toca nos veículos que estão andando. */
  roncoDosMotores() {
    for (const v of this.dim.getEntities({ families: ["gm_veiculo"] })) {
      try {
        const vel = v.getVelocity();
        if (Math.hypot(vel.x, vel.z) < 0.02) continue;
        world.playSound("gm.motor", v.location, { volume: 0.9, pitch: v.typeId.includes("blindado") ? 1.15 : 0.95 });
      } catch {
        // veículo saiu da área carregada
      }
    }
  }

  // ---------------------------------------------------------------- eventos

  aoMorrer(morto, assassino) {
    const info = infoEntidade(morto.typeId);
    if (!info) return;
    if (info.tipo === "comando") {
      const b = this.base(info.faccao);
      if (b && b.vivo) this.comandoDestruido(b, assassino);
      return;
    }
    this.baixas[info.faccao] = (this.baixas[info.faccao] ?? 0) + 1;
    if (VEICULOS.has(info.tipo.replace("_p", ""))) {
      try {
        this.dim.spawnParticle("minecraft:huge_explosion_emitter", morto.location);
        world.playSound("gm.explosao", morto.location, { volume: 1.2 });
      } catch {
        // efeito indisponível
      }
    }
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

  comandoDestruido(b, assassino) {
    b.vivo = false;
    const f = FACCOES[b.faccao];
    const loc = this.posBase(b);
    loc.y += 1;
    try {
      this.dim.createExplosion(loc, 4, { breaksBlocks: false, causesFire: false });
      this.dim.spawnParticle("minecraft:huge_explosion_emitter", loc);
      world.playSound("gm.explosao", loc, { volume: 2 });
    } catch {
      // explosão indisponível
    }
    if (valido(b.comando)) b.comando.remove();
    this.titulo(`${f.cor}§lPOSTO DE COMANDO DESTRUÍDO`, `§f${f.nome} perdeu sua base!`);
    this.msg(`§c[Guerra Moderna] §fO posto de comando da ${f.cor}${f.nome}§f foi destruído!`);
    if (assassino?.typeId === "minecraft:player" && this.participa(assassino) && b.faccao !== this.o.faccaoJogador) {
      registrar(assassino, { creditos: VALOR_ABATE.comando });
      this.msg(`§6${assassino.name} destruiu o posto de comando! +${VALOR_ABATE.comando} créditos`);
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
    const premio = [60, 100, 150, 220][this.o.intensidade];
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
      const opc = { fadeInDuration: 10, stayDuration: 80, fadeOutDuration: 20 };
      if (motivo === "vitoria") p.onScreenDisplay.setTitle("§6§lVITÓRIA!", { ...opc, subtitle: `§f+${creditos} créditos` });
      else if (motivo === "derrota") p.onScreenDisplay.setTitle("§4§lDERROTA", { ...opc, subtitle: "§7Seu posto de comando caiu..." });
      else if (vencedor) p.onScreenDisplay.setTitle(`${FACCOES[vencedor].cor}§l${FACCOES[vencedor].nome}`, { ...opc, subtitle: "§fvenceu a batalha!" });
      p.playSound(motivo === "derrota" ? "mob.wither.death" : "random.totem");
      this.liberarJogador(p);
    }
    this.dim.runCommandAsync("tickingarea remove gm_batalha").catch(() => {});
    // as tropas restantes somem depois de alguns segundos
    system.runTimeout(() => limparUnidades(this.dim), motivo === "cancelada" ? 1 : 160);
    if (batalhaAtual === this) batalhaAtual = null;
    this.o.aoTerminar?.(resultado);
  }

  liberarJogador(p) {
    removerTagsGuerra(p);
    try {
      const s = p.getDynamicProperty("gm:spawn");
      if (typeof s === "string") {
        const sp = JSON.parse(s);
        p.setSpawnPoint({ dimension: world.getDimension(sp.dim), x: sp.x, y: sp.y, z: sp.z });
        p.setDynamicProperty("gm:spawn", undefined);
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

  /** Texto do placar das bases (usado também pela barra de munição). */
  placar() {
    return this.bases
      .map((b) => {
        const f = FACCOES[b.faccao];
        if (!b.vivo) return `§8${f.sigla} X`;
        const h = valido(b.comando) ? vida(b.comando).currentValue / vida(b.comando).effectiveMax : 0;
        const n = Math.round(h * 5);
        return `${f.cor}${f.sigla} ${"|".repeat(n)}§8${"|".repeat(5 - n)}`;
      })
      .join(" §8| ");
  }

  hud() {
    const placar = this.placar();
    for (const p of this.jogadoresValidos()) {
      if ((this.barraAte ?? 0) > system.currentTick || (hudArmaAte.get(p.id) ?? 0) > system.currentTick) continue;
      try {
        p.onScreenDisplay.setActionBar(`§fOnda §e${this.onda} §8| ${placar} §8| §cAbates ${this.abates.get(p.id) ?? 0}`);
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
