import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { FACCOES, LISTA_FACCOES, CENARIOS, TAMANHOS, INTENSIDADES, CLASSES } from "./faccoes.js";
import { Batalha, getBatalha, limparUnidades } from "./batalha.js";
import { getBackup, restaurarTerreno, descartarBackup } from "./terreno.js";
import { carregarPerfil, patente, comprarUpgrade, UPGRADES, CUSTO_UPGRADE } from "./perfil.js";
import { artilharia, chamarReforcos, pedirVeiculo } from "./armas.js";

const it = (n) => `textures/items/gm_${n}`;
const ICONES = {
  radio: it("radio"),
  fuzil: it("fuzil"),
  tanque: it("disparo_canhao"),
  mg: it("disparo_mg"),
  bazuca: it("bazuca"),
  granada: it("granada"),
  medico: it("kit_medico"),
  sniper: it("sniper"),
  restaurar: "textures/items/clock_item",
  limpar: "textures/blocks/barrier",
  ajuda: "textures/items/book_enchanted",
  voltar: "textures/items/arrow",
  faccoes: "textures/items/book_normal",
};
const SEP = "§8------------------------------";
const btn = (titulo, sub = "") => (sub ? `§l${titulo}§r\n§8${sub}` : `§l${titulo}`);
const esperar = (ticks) => new Promise((res) => system.runTimeout(res, ticks));

function valido(p) {
  try {
    return !!p && p.isValid();
  } catch {
    return false;
  }
}

async function mostrar(player, form) {
  for (let i = 0; i < 40; i++) {
    if (!valido(player)) return { canceled: true };
    const r = await form.show(player);
    if (r.canceled && r.cancelationReason === "UserBusy") {
      await esperar(10);
      continue;
    }
    return r;
  }
  return { canceled: true };
}

async function menu(player, titulo, corpo, botoes) {
  const f = new ActionFormData().title(titulo).body(corpo);
  for (const [txt, icone] of botoes) {
    if (icone) f.button(txt, icone);
    else f.button(txt);
  }
  const r = await mostrar(player, f);
  if (r.canceled || r.selection === undefined) return;
  const acao = botoes[r.selection]?.[2];
  if (acao) await acao();
}

async function confirmar(player, titulo, corpo, sim = "§2Confirmar") {
  const f = new ActionFormData().title(titulo).body(corpo).button(sim).button("§4Cancelar");
  const r = await mostrar(player, f);
  return !r.canceled && r.selection === 0;
}

const nomeFac = (f) => `${FACCOES[f].cor}${FACCOES[f].nome}§r`;

// ---------------------------------------------------------------- principal

export async function abrirRadio(player) {
  const b = getBatalha();
  if (b && b.participa(player)) return menuTatico(player);
  const perfil = carregarPerfil(player);
  const pat = patente(perfil);
  const backup = getBackup();
  const corpo = [
    "§l§2GUERRA MODERNA",
    "§7Use o rádio e o terreno ao seu redor vira um campo de batalha com tanques, blindados e infantaria.",
    SEP,
    `§fPatente: ${pat.nome} §7| §fCréditos: §6${perfil.creditos}`,
    b ? "§eHá uma batalha em andamento em outro lugar." : "",
    backup ? `§eTerreno da última batalha ainda não restaurado (${backup.x}, ${backup.y}, ${backup.z}).` : "",
  ].join("\n");
  const botoes = [
    [btn("§4Iniciar Batalha", "Transformar o terreno aqui"), ICONES.radio, () => configurarBatalha(player)],
    [btn("Pedir tanque", "Fora de batalha: para treinar"), ICONES.tanque, () => falar(player, pedirVeiculoLivre(player, "tanque"), "§aTanque entregue! Clique nele para pilotar.")],
    [btn("Arsenal", "Melhorias com créditos"), ICONES.fuzil, () => menuArsenal(player)],
    [btn("Perfil de combate", pat.nome.replace(/§./g, "")), ICONES.sniper, () => menuPerfil(player)],
    [btn("Facções"), ICONES.faccoes, () => menuFaccoes(player)],
  ];
  if (backup) botoes.push([btn("Restaurar terreno", "Desfaz a última transformação"), ICONES.restaurar, () => menuRestaurar(player)]);
  botoes.push([btn("Remover tropas e veículos"), ICONES.limpar, () => removerTropas(player)]);
  botoes.push([btn("Como jogar"), ICONES.ajuda, () => menuAjuda(player)]);
  await menu(player, "§lGuerra Moderna", corpo, botoes);
}

/** Fora de batalha o jogador não tem facção: entrega o tanque da Força Tarefa Oliva. */
function pedirVeiculoLivre(player, tipo) {
  if (getBatalha()?.participa(player)) return pedirVeiculo(player, tipo);
  const temp = !player.getTags().some((t) => t.startsWith("gm_aliado_"));
  if (temp) player.addTag("gm_aliado_oliva");
  const erro = pedirVeiculo(player, tipo);
  if (temp) player.removeTag("gm_aliado_oliva");
  return erro;
}

function falar(player, erro, ok) {
  player.sendMessage(erro ? `§c[Rádio] ${erro}` : `§a[Rádio] §r${ok}`);
}

async function removerTropas(player) {
  if (getBatalha()) return player.sendMessage("§c[Rádio] Encerre a batalha atual primeiro.");
  const n = limparUnidades(player.dimension);
  player.sendMessage(`§a[Rádio] ${n} entidades removidas.`);
}

async function menuFaccoes(player) {
  const corpo = LISTA_FACCOES.map((f) => `${FACCOES[f].cor}§l${FACCOES[f].nome}§r\n§7${FACCOES[f].desc}`).join("\n\n");
  const extra = `\n\n${SEP}\n§fCada facção tem: §7Fuzileiro, Atirador, Metralhador, Antitanque, Médico, Blindado, Tanque e Posto de Comando.`;
  await menu(player, "Facções", corpo + extra, [[btn("Voltar"), ICONES.voltar, () => abrirRadio(player)]]);
}

async function menuAjuda(player) {
  const txt = [
    "§l§eComeçando",
    "§f1. Num lugar aberto, use o §aRádio de Campanha§f > Iniciar Batalha.",
    "§f2. Escolha facção, inimigos, cenário, tamanho, intensidade e sua classe.",
    "§f3. O terreno é salvo e bombardeado até virar um campo de batalha.",
    "§f4. Destrua os §fpostos de comando§f inimigos e proteja o seu.",
    SEP,
    "§l§eArmas",
    "§fUse para atirar. §eFuzil§f e §6Metralhadora§f: segure para rajada.",
    "§bRifle de precisão§f: agache para mirar com zoom.",
    "§cLança-foguetes§f: o melhor contra tanques e blindados.",
    "§fUsar a arma §lagachado§r§f recarrega (o pente também recarrega sozinho quando acaba).",
    "§7Balas quase não arranham a blindagem: use foguetes, granadas, artilharia ou um tanque.",
    SEP,
    "§l§eVeículos",
    "§fClique no tanque/blindado para entrar. Ande com os controles normais,",
    "§fmire com a câmera, use §cCANHÃO§f e §eMETRALHADORA§f. Agache para sair.",
    "§fNo blindado cabem mais 3 jogadores como passageiros.",
    SEP,
    "§l§eRádio na batalha",
    "§fOrdens (atacar/defender), reforços, pedir tanque/blindado e artilharia.",
    "§fSegure a §fBandeira§f para suas tropas seguirem você.",
    SEP,
    "§7/scriptevent gm:radio  |  /scriptevent gm:item",
  ].join("\n");
  await menu(player, "Como jogar", txt, [[btn("Voltar"), ICONES.voltar, () => abrirRadio(player)]]);
}

// ---------------------------------------------------------------- batalha

async function configurarBatalha(player) {
  if (getBatalha()) return player.sendMessage("§c[Rádio] Já existe uma batalha em andamento.");
  if (getBackup()) {
    const ok = await confirmar(
      player,
      "Terreno não restaurado",
      "§eA última batalha ainda não foi desfeita.§r\n\nSe começar outra, a cópia de segurança antiga será §csubstituída§r e aquele lugar não poderá mais ser restaurado.\n\nContinuar mesmo assim?",
      "§eContinuar",
    );
    if (!ok) return;
    descartarBackup();
  }
  const nomes = LISTA_FACCOES.map((f) => FACCOES[f].nome);
  const f = new ModalFormData().title("Nova Batalha").dropdown("Sua facção", [...nomes, "Apenas assistir"], 0);
  LISTA_FACCOES.forEach((fac, i) => f.toggle(`Participa: ${FACCOES[fac].cor}${FACCOES[fac].nome}`, i < 2));
  f.dropdown("Cenário", CENARIOS.map((c) => c.nome), 0)
    .dropdown("Tamanho do campo", TAMANHOS.map((t) => t.nome), 0)
    .dropdown("Intensidade", INTENSIDADES.map((i) => i.nome), 1)
    .dropdown("Sua classe", CLASSES.map((c) => `${c.nome} - ${c.desc}`), 0);
  const r = await mostrar(player, f);
  if (r.canceled || !r.formValues) return;
  const v = r.formValues;
  const faccaoJogador = v[0] < LISTA_FACCOES.length ? LISTA_FACCOES[v[0]] : null;
  const faccoes = LISTA_FACCOES.filter((_, i) => v[1 + i] || LISTA_FACCOES[i] === faccaoJogador);
  const [cen, tam, int, classe] = v.slice(1 + LISTA_FACCOES.length);
  if (faccoes.length < 2) {
    player.sendMessage("§c[Rádio] Escolha pelo menos duas facções participantes.");
    return configurarBatalha(player);
  }
  const raio = TAMANHOS[tam].raio;
  const ok = await confirmar(
    player,
    "Confirmar operação",
    [
      `§fCenário: §e${CENARIOS[cen].nome}`,
      `§fFacções: ${faccoes.map(nomeFac).join(" §7vs ")}`,
      `§fVocê: ${faccaoJogador ? `${nomeFac(faccaoJogador)} §7(${CLASSES[classe].nome})` : "§7espectador"}`,
      `§fIntensidade: §e${INTENSIDADES[int].nome}`,
      "",
      `§cO terreno num raio de ${raio} blocos ao seu redor será transformado!`,
      "§7Uma cópia de segurança é salva para você restaurar depois.",
      "§7Jogadores próximos entram na batalha do seu lado.",
    ].join("\n"),
    "§4§lINICIAR",
  );
  if (!ok) return;
  new Batalha({
    lider: player,
    faccaoJogador,
    faccoes,
    cenario: CENARIOS[cen],
    raio,
    intensidade: int,
    classe: CLASSES[classe].id,
    aoTerminar: (res) => {
      system.runTimeout(() => {
        for (const j of res.jogadores) if (valido(j.player)) resumo(j.player, res, j);
      }, 100);
    },
  }).iniciar();
}

async function resumo(player, res, j) {
  const titulos = { vitoria: "§6§lVITÓRIA!", derrota: "§4§lDERROTA", cancelada: "§7Batalha encerrada", fim: "§eFim da batalha" };
  const linhas = [titulos[res.motivo] ?? "Fim"];
  if (res.vencedor) linhas.push(`§fVencedor: ${nomeFac(res.vencedor)}`);
  linhas.push(`§fOndas: §e${res.onda}`, `§fSeus abates: §c${j.abates}`);
  if (j.creditos) linhas.push(`§6+${j.creditos} créditos`);
  linhas.push(SEP, "§l§eBaixas por facção");
  for (const [f, n] of Object.entries(res.baixas)) linhas.push(`${nomeFac(f)}: §f${n}`);
  const p = carregarPerfil(player);
  linhas.push(SEP, `§fPatente: ${patente(p).nome} §7| §fCréditos: §6${p.creditos}`);
  const botoes = [];
  if (getBackup()) botoes.push([btn("§2Restaurar o terreno agora"), ICONES.restaurar, () => menuRestaurar(player)]);
  botoes.push([btn("Manter o campo de batalha"), ICONES.voltar]);
  await menu(player, "Relatório de combate", linhas.join("\n"), botoes);
}

async function menuRestaurar(player) {
  if (getBatalha()) return player.sendMessage("§c[Rádio] Encerre a batalha antes de restaurar.");
  const b = getBackup();
  if (!b) return player.sendMessage("§7[Rádio] Não há terreno para restaurar.");
  const ok = await confirmar(player, "Restaurar terreno", `O terreno em §e${b.x}, ${b.y}, ${b.z}§r (raio ${b.raio}) voltará a ser como era antes da batalha.\n\n§7Fique perto do local para os chunks estarem carregados.`);
  if (!ok) return;
  limparUnidades(world.getDimension(b.dim));
  player.sendMessage("§a[Rádio] Restaurando o terreno...");
  restaurarTerreno((falhas) => {
    if (!valido(player)) return;
    if (falhas === 0) player.sendMessage("§a[Rádio] Terreno restaurado!");
    else player.sendMessage("§c[Rádio] Parte da restauração falhou. Chegue mais perto do local e tente de novo.");
  });
}

// ---------------------------------------------------------------- rádio durante a batalha

export async function menuTatico(player) {
  const b = getBatalha();
  if (!b || !b.participa(player)) return abrirRadio(player);
  const linhas = [`§fOnda §e${b.onda} §7| §fEstado: §e${b.estado}`, SEP];
  for (const base of b.bases) {
    const hp = base.vivo && base.comando?.isValid() ? Math.ceil(base.comando.getComponent("health").currentValue) : 0;
    const tropas = b.estado === "combate" ? b.unidades(base.faccao).length : 0;
    linhas.push(`${nomeFac(base.faccao)}: ${base.vivo ? `§aPosto ${hp}` : "§8destruído"} §7| tropas §f${tropas}`);
  }
  linhas.push(SEP, `§fSeus abates: §c${b.abates.get(player.id) ?? 0}`, `§fOrdem atual: §e${b.ordem === "atacar" ? "Atacar" : "Defender a base"}`);
  const botoes = [];
  if (b.o.faccaoJogador && b.estado === "combate") {
    botoes.push([btn("§4Ordem: ATACAR", "Tropas avançam sobre o inimigo"), ICONES.fuzil, () => darOrdem(player, "atacar")]);
    botoes.push([btn("§1Ordem: DEFENDER", "Tropas protegem a base"), ICONES.sniper, () => darOrdem(player, "defender")]);
    botoes.push([btn("Chamar reforços", "Esquadrão na sua posição"), ICONES.medico, () => falar(player, chamarReforcos(player), "Reforços enviados para sua posição!")]);
    botoes.push([btn("Pedir tanque", "Recarga 2min30"), ICONES.tanque, () => falar(player, pedirVeiculo(player, "tanque"), "Tanque entregue! Clique nele para pilotar.")]);
    botoes.push([btn("Pedir blindado", "Recarga 1min40, leva 3 passageiros"), ICONES.mg, () => falar(player, pedirVeiculo(player, "blindado"), "Blindado entregue!")]);
    botoes.push([btn("§4Artilharia", "Barragem onde você está olhando"), ICONES.granada, () => falar(player, artilharia(player), "§cArtilharia a caminho! Saia da área!")]);
  }
  botoes.push([
    btn("Encerrar batalha"),
    ICONES.limpar,
    async () => {
      if (await confirmar(player, "Encerrar", "A batalha será encerrada e as tropas removidas.")) b.finalizar("cancelada");
    },
  ]);
  botoes.push([btn("Fechar"), ICONES.voltar]);
  await menu(player, "Rádio de Campanha", linhas.join("\n"), botoes);
}

function darOrdem(player, ordem) {
  const b = getBatalha();
  if (!b) return;
  b.ordem = ordem;
  let n = 0;
  for (const e of b.unidades(b.o.faccaoJogador)) {
    try {
      e.triggerEvent(ordem === "atacar" ? "gm:atacar" : "gm:defender");
      n++;
    } catch {
      // unidade fora de alcance
    }
  }
  world.playSound("gm.radio", player.location);
  b.msg(`§e[Rádio] ${player.name}: ${ordem === "atacar" ? "§cATACAR!" : "§9DEFENDER A BASE!"} §7(${n} unidades)`);
}

// ---------------------------------------------------------------- arsenal / perfil

async function menuArsenal(player) {
  const p = carregarPerfil(player);
  const botoes = Object.entries(UPGRADES).map(([id, u]) => {
    const nivel = p.up[id] ?? 0;
    const custo = CUSTO_UPGRADE[nivel];
    return [
      `§l${u.nome} §r§7[${"■".repeat(nivel)}${"□".repeat(CUSTO_UPGRADE.length - nivel)}]\n§8${custo ? `${custo} créditos` : "MÁXIMO"}`,
      null,
      async () => {
        const erro = comprarUpgrade(player, id);
        if (erro) player.sendMessage(`§c[Rádio] ${erro}`);
        else {
          player.sendMessage(`§a[Rádio] ${u.nome} melhorado!`);
          player.playSound("random.anvil_use");
        }
        await menuArsenal(player);
      },
    ];
  });
  botoes.push([btn("Voltar"), ICONES.voltar, () => abrirRadio(player)]);
  const corpo = `§fCréditos: §6${p.creditos}\n\n` + Object.values(UPGRADES).map((u) => `§e${u.nome}: §7${u.desc}`).join("\n");
  await menu(player, "Arsenal", corpo, botoes);
}

async function menuPerfil(player) {
  const p = carregarPerfil(player);
  const pat = patente(p);
  const corpo = [
    `§l${player.name}§r - ${pat.nome}`,
    pat.proxima !== null ? `§7Próxima patente: ${pat.pontos}/${pat.proxima} pontos` : "§6Patente máxima!",
    SEP,
    `§fBatalhas: §e${p.batalhas} §7| §aVitórias: ${p.vitorias} §7| §cDerrotas: ${p.derrotas}`,
    `§fAbates totais: §c${p.abates}`,
    `§fCréditos: §6${p.creditos}`,
    SEP,
    "§7Pontos de patente = abates + 25 por vitória.",
  ].join("\n");
  await menu(player, "Perfil de combate", corpo, [[btn("Voltar"), ICONES.voltar, () => abrirRadio(player)]]);
}
