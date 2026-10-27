import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData } from "@minecraft/server-ui";
import { FACCOES, LISTA_FACCOES, CENARIOS, TAMANHOS, INTENSIDADES } from "./faccoes.js";
import { Batalha, getBatalha, limparUnidades } from "./batalha.js";
import { getBackup, restaurarTerreno, descartarBackup } from "./terreno.js";
import { carregarPerfil, patente, comprarUpgrade, UPGRADES, CUSTO_UPGRADE } from "./perfil.js";
import { ataqueOrbital, chamarReforcos } from "./armas.js";

const ICONES = {
  batalha: "textures/items/guerra_nucleo_batalha",
  arsenal: "textures/items/guerra_rifle",
  perfil: "textures/items/guerra_comunicador",
  restaurar: "textures/items/clock_item",
  limpar: "textures/blocks/barrier",
  ajuda: "textures/items/book_enchanted",
  voltar: "textures/items/arrow",
  atacar: "textures/items/iron_sword",
  defender: "textures/items/guerra_escudo",
  orbital: "textures/items/guerra_canhao",
  reforcos: "textures/items/guerra_granada",
  faccoes: "textures/items/book_normal",
};

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

async function confirmar(player, titulo, corpo, sim = "§aConfirmar") {
  const f = new ActionFormData().title(titulo).body(corpo).button(sim).button("§cCancelar");
  const r = await mostrar(player, f);
  return !r.canceled && r.selection === 0;
}

const nomeFac = (f) => `${FACCOES[f].cor}${FACCOES[f].nome}§r`;

// ---------------------------------------------------------------- principal

export async function abrirMenuPrincipal(player) {
  const b = getBatalha();
  if (b && b.participa(player)) return menuTatico(player);
  const perfil = carregarPerfil(player);
  const pat = patente(perfil);
  const backup = getBackup();
  const corpo = [
    "§l§bGUERRA FUTURISTA§r",
    "§7Ative o núcleo e o terreno ao seu redor vira um campo de batalha entre facções.",
    "",
    `§fPatente: ${pat.nome} §7| §fCréditos: §6${perfil.creditos}`,
    b ? "§eHá uma batalha em andamento em outro lugar." : "",
    backup ? `§eTerreno da última batalha ainda não restaurado (${backup.x}, ${backup.y}, ${backup.z}).` : "",
  ].join("\n");
  const botoes = [
    ["§l§4Iniciar Batalha\n§r§8Transformar o terreno aqui", ICONES.batalha, () => configurarBatalha(player)],
    ["§lArsenal\n§r§8Melhorias com créditos", ICONES.arsenal, () => menuArsenal(player)],
    ["§lPerfil de Combate", ICONES.perfil, () => menuPerfil(player)],
    ["§lFacções", ICONES.faccoes, () => menuFaccoes(player)],
  ];
  if (backup) botoes.push(["§lRestaurar terreno\n§r§8Desfaz a última transformação", ICONES.restaurar, () => menuRestaurar(player)]);
  botoes.push(["§lRemover tropas\n§r§8Apaga unidades e núcleos", ICONES.limpar, () => removerTropas(player)]);
  botoes.push(["§lComo Jogar", ICONES.ajuda, () => menuAjuda(player)]);
  await menu(player, "§lGuerra Futurista", corpo, botoes);
}

async function removerTropas(player) {
  if (getBatalha()) return player.sendMessage("§c[Guerra] Encerre a batalha atual primeiro.");
  const n = limparUnidades(player.dimension);
  player.sendMessage(`§a[Guerra] ${n} entidades removidas.`);
}

async function menuFaccoes(player) {
  const corpo = LISTA_FACCOES.map((f) => `${FACCOES[f].cor}§l${FACCOES[f].nome}§r\n§7${FACCOES[f].desc}`).join("\n\n");
  const extra = "\n\n§fCada facção tem: §7Soldado, Atirador, Artilheiro, Médico, Drone voador, Titã (mech) e o Núcleo da base.";
  await menu(player, "Facções", corpo + extra, [["Voltar", ICONES.voltar, () => abrirMenuPrincipal(player)]]);
}

async function menuAjuda(player) {
  const txt = [
    "§l§eComo começar§r",
    "1. Fique num lugar aberto e use o §bNúcleo de Batalha§r > Iniciar Batalha.",
    "2. Escolha sua facção, os inimigos, o cenário, o tamanho e a intensidade.",
    "3. O terreno é salvo e se transforma numa onda a partir de você.",
    "4. Cada facção ganha uma base com um §fNúcleo§r. Tropas chegam em ondas.",
    "5. Destrua os núcleos inimigos e proteja o seu para vencer!",
    "",
    "§l§eSeu equipamento§r",
    "§eRifle de Plasma§r: tiro rápido (use repetidamente).",
    "§cCanhão de Íons§r: tiro explosivo pesado.",
    "§6Granada de Pulso§r: arremessa no ponto mirado.",
    "§9Escudo de Energia§r: absorção e resistência por alguns segundos.",
    "§aComunicador Tático§r: ordens (atacar/defender), reforços e ataque orbital.",
    "§fEstandarte§r: segure para suas tropas te seguirem.",
    "",
    "§l§eDepois da batalha§r",
    "Use 'Restaurar terreno' para voltar o lugar ao que era antes.",
    "Créditos ganhos compram melhorias no Arsenal e sobem sua patente.",
    "",
    "§7Comandos: /scriptevent guerra:menu | /scriptevent guerra:item",
    "§7Dica: os ovos das unidades ficam no inventário criativo (aba Equipamentos/ovos).",
  ].join("\n");
  await menu(player, "Como Jogar", txt, [["Voltar", ICONES.voltar, () => abrirMenuPrincipal(player)]]);
}

// ---------------------------------------------------------------- batalha

async function configurarBatalha(player) {
  if (getBatalha()) return player.sendMessage("§c[Guerra] Já existe uma batalha em andamento.");
  const backup = getBackup();
  if (backup) {
    const ok = await confirmar(
      player,
      "Terreno não restaurado",
      "§eA última batalha ainda não foi desfeita.§r\n\nSe começar outra, a cópia de segurança antiga será §csubstituída§r e aquele lugar não poderá mais ser restaurado.\n\nDeseja continuar mesmo assim?",
      "§eContinuar",
    );
    if (!ok) return;
    descartarBackup();
  }
  const nomes = LISTA_FACCOES.map((f) => FACCOES[f].nome);
  const f = new ModalFormData()
    .title("Nova Batalha")
    .dropdown("Sua facção", [...nomes, "Apenas assistir"], 0);
  LISTA_FACCOES.forEach((fac, i) => f.toggle(`Participa: ${FACCOES[fac].cor}${FACCOES[fac].nome}`, i < 2));
  f.dropdown("Cenário", CENARIOS.map((c) => c.nome), 0)
    .dropdown("Tamanho do campo", TAMANHOS.map((t) => t.nome), 0)
    .dropdown("Intensidade", INTENSIDADES.map((i) => i.nome), 1);
  const r = await mostrar(player, f);
  if (r.canceled || !r.formValues) return;
  const v = r.formValues;
  const escolha = v[0];
  const faccaoJogador = escolha < LISTA_FACCOES.length ? LISTA_FACCOES[escolha] : null;
  const faccoes = LISTA_FACCOES.filter((_, i) => v[1 + i] || LISTA_FACCOES[i] === faccaoJogador);
  const [cen, tam, int] = v.slice(1 + LISTA_FACCOES.length);
  if (faccoes.length < 2) {
    player.sendMessage("§c[Guerra] Escolha pelo menos duas facções participantes.");
    return configurarBatalha(player);
  }
  const raio = TAMANHOS[tam].raio;
  const ok = await confirmar(
    player,
    "Ativar Núcleo de Batalha",
    [
      `§fCenário: §e${CENARIOS[cen].nome}`,
      `§fFacções: ${faccoes.map(nomeFac).join(" §7vs ")}`,
      `§fVocê: ${faccaoJogador ? nomeFac(faccaoJogador) : "§7espectador"}`,
      `§fIntensidade: §e${INTENSIDADES[int].nome}`,
      "",
      `§cO terreno num raio de ${raio} blocos ao seu redor será transformado!`,
      "§7Uma cópia de segurança é salva para você restaurar depois.",
      "§7Jogadores próximos entram na batalha do seu lado.",
    ].join("\n"),
    "§4§lATIVAR",
  );
  if (!ok) return;
  new Batalha({
    lider: player,
    faccaoJogador,
    faccoes,
    cenario: CENARIOS[cen],
    raio,
    intensidade: int,
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
  if (j.creditos) linhas.push(`§6+${j.creditos} créditos de batalha`);
  linhas.push("", "§l§eBaixas por facção§r");
  for (const [f, n] of Object.entries(res.baixas)) linhas.push(`${nomeFac(f)}: §f${n}`);
  const p = carregarPerfil(player);
  linhas.push("", `§fPatente: ${patente(p).nome} §7| §fCréditos: §6${p.creditos}`);
  const botoes = [];
  if (getBackup()) botoes.push(["§aRestaurar o terreno agora", ICONES.restaurar, () => menuRestaurar(player)]);
  botoes.push(["§fManter o campo de batalha", ICONES.voltar]);
  await menu(player, "Relatório de Batalha", linhas.join("\n"), botoes);
}

async function menuRestaurar(player) {
  if (getBatalha()) return player.sendMessage("§c[Guerra] Encerre a batalha antes de restaurar.");
  const b = getBackup();
  if (!b) return player.sendMessage("§7[Guerra] Não há terreno para restaurar.");
  const ok = await confirmar(player, "Restaurar terreno", `O terreno em §e${b.x}, ${b.y}, ${b.z}§r (raio ${b.raio}) voltará a ser como era antes da batalha.\n\n§7Fique perto do local para os chunks estarem carregados.`);
  if (!ok) return;
  limparUnidades(world.getDimension(b.dim));
  player.sendMessage("§a[Guerra] Restaurando o terreno...");
  restaurarTerreno((falhas) => {
    if (!valido(player)) return;
    if (falhas === 0) player.sendMessage("§a[Guerra] Terreno restaurado!");
    else player.sendMessage("§c[Guerra] Parte da restauração falhou. Chegue mais perto do local e tente de novo.");
  });
}

// ---------------------------------------------------------------- tático (durante a batalha)

export async function menuTatico(player) {
  const b = getBatalha();
  if (!b || !b.participa(player)) return abrirMenuPrincipal(player);
  const linhas = [`§fOnda §e${b.onda} §7| §fEstado: §e${b.estado}`, ""];
  for (const base of b.bases) {
    const hp = base.vivo && base.nucleo?.isValid() ? Math.ceil(base.nucleo.getComponent("health").currentValue) : 0;
    const tropas = base.vivo || b.estado === "combate" ? b.unidades(base.faccao).length : 0;
    linhas.push(`${nomeFac(base.faccao)}: ${base.vivo ? `§aNúcleo ${hp}` : "§8destruído"} §7| tropas §f${tropas}`);
  }
  linhas.push("", `§fSeus abates: §c${b.abates.get(player.id) ?? 0}`, `§fOrdem atual: §e${b.ordem === "atacar" ? "Atacar" : "Defender a base"}`);
  const botoes = [];
  if (b.o.faccaoJogador && b.estado === "combate") {
    botoes.push(["§l§cOrdem: ATACAR\n§r§8Tropas avançam sobre o inimigo", ICONES.atacar, () => darOrdem(player, "atacar")]);
    botoes.push(["§l§9Ordem: DEFENDER\n§r§8Tropas protegem a base", ICONES.defender, () => darOrdem(player, "defender")]);
    botoes.push(["§l§6Chamar reforços", ICONES.reforcos, () => falar(player, chamarReforcos(player), "§aReforços enviados para sua posição!")]);
    botoes.push(["§l§4Ataque orbital\n§r§8No ponto para onde você olha", ICONES.orbital, () => falar(player, ataqueOrbital(player), "§cAtaque orbital a caminho! Saia da área!")]);
  }
  botoes.push([
    "§lEncerrar batalha",
    ICONES.limpar,
    async () => {
      if (await confirmar(player, "Encerrar", "A batalha será encerrada e as tropas removidas.")) b.finalizar("cancelada");
    },
  ]);
  botoes.push(["Fechar", ICONES.voltar]);
  await menu(player, "Comunicador Tático", linhas.join("\n"), botoes);
}

function falar(player, erro, ok) {
  player.sendMessage(erro ? `§c[Guerra] ${erro}` : `§a[Guerra] §r${ok}`);
}

function darOrdem(player, ordem) {
  const b = getBatalha();
  if (!b) return;
  b.ordem = ordem;
  let n = 0;
  for (const e of b.unidades(b.o.faccaoJogador)) {
    try {
      e.triggerEvent(ordem === "atacar" ? "guerra:atacar" : "guerra:defender");
      n++;
    } catch {
      // unidade fora de alcance
    }
  }
  b.msg(`§e[Guerra] ${player.name}: ${ordem === "atacar" ? "§cATACAR!" : "§9DEFENDER A BASE!"} §7(${n} unidades)`);
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
        if (erro) player.sendMessage(`§c[Guerra] ${erro}`);
        else {
          player.sendMessage(`§a[Guerra] ${u.nome} melhorado!`);
          player.playSound("random.anvil_use");
        }
        await menuArsenal(player);
      },
    ];
  });
  botoes.push(["Voltar", ICONES.voltar, () => abrirMenuPrincipal(player)]);
  const corpo = `§fCréditos: §6${p.creditos}\n\n` + Object.values(UPGRADES).map((u) => `§e${u.nome}: §7${u.desc}`).join("\n");
  await menu(player, "Arsenal", corpo, botoes);
}

async function menuPerfil(player) {
  const p = carregarPerfil(player);
  const pat = patente(p);
  const corpo = [
    `§l${player.name}§r - ${pat.nome}`,
    pat.proxima !== null ? `§7Próxima patente: ${pat.pontos}/${pat.proxima} pontos` : "§6Patente máxima!",
    "",
    `§fBatalhas: §e${p.batalhas} §7| §aVitórias: ${p.vitorias} §7| §cDerrotas: ${p.derrotas}`,
    `§fAbates totais: §c${p.abates}`,
    `§fCréditos: §6${p.creditos}`,
    "",
    "§7Pontos de patente = abates + 25 por vitória.",
  ].join("\n");
  await menu(player, "Perfil de Combate", corpo, [["Voltar", ICONES.voltar, () => abrirMenuPrincipal(player)]]);
}
