# ⚽ Futebol Craft — Addon de futebol para Minecraft Bedrock

Futebol completo dentro do Minecraft: você joga **com e contra NPCs** que passam, driblam, chutam,
desarmam e defendem, em um estádio gerado automaticamente. Inclui **Modo Carreira** com liga, copa,
evolução de atributos, loja, propostas de transferência, troféus e aposentadoria.

## Instalação

1. Baixe [`dist/FutebolCraft.mcaddon`](dist/FutebolCraft.mcaddon) e abra o arquivo: o Minecraft importa os dois pacotes.
2. Crie (ou edite) um mundo e ative **os dois** pacotes:
   - Pacotes de comportamento: **Futebol Craft**
   - Pacotes de recursos: **Futebol Craft (Recursos)**
3. Requer Minecraft Bedrock **1.21.0 ou superior** (Windows, celular, console).
   Não é preciso ativar experimentos: o addon usa apenas a API de scripts estável.

Dica: jogue de dia ou no modo pacífico para que monstros não atrapalhem a partida.

## Como começar

1. Ao entrar no mundo você recebe o item **Menu do Futebol** (se perder: `/scriptevent fut:item`
   ou receita de papel + lã branca).
2. Vá para um lugar plano e aberto, abra o menu e escolha **Estádio → Construir aqui**.
   O estádio (63 × 45 blocos, com gols, redes, arquibancadas e refletores) é construído centrado em você.
3. Escolha um modo: **Modo Carreira**, **Partida Rápida** ou **Treino de Finalização**.

## Controles na partida

Durante a partida os itens abaixo ocupam os slots 1–4 da barra (seus itens vão para a mochila e
continuam lá quando a partida acaba).

| Item | O que faz |
|---|---|
| **Chutar** | Chuta na direção da mira. Olhe para cima para chutar mais alto. Bater na bola também chuta. |
| **Passar** | Toca para o companheiro na direção em que você olha. **Agachado** = lançamento pelo alto. |
| **Dividida** | Dá um bote e tenta roubar a bola do adversário (depende de Defesa e Físico). |
| **Pedir a Bola** | O companheiro NPC com a bola passa para você. |

- Encostar na bola solta faz você dominá-la; correr com ela conduz automaticamente.
- **Agachar** com a bola protege contra desarmes.
- Placar, cronômetro e avisos aparecem na barra de ação.

## Regras simuladas

5×5 ou 7×7, dois tempos com troca de lado, saída de bola com contagem regressiva, gols com
comemoração, traves e travessão, laterais, tiros de meta e escanteios. Goleiros NPC se posicionam,
saem do gol, fazem defesas, espalmam e repõem a bola. Disputas de pênaltis decidem empates na Copa.

## Modo Carreira

- Crie seu jogador: nome, posição (Atacante, Meia ou Zagueiro), número e clube inicial.
- **Liga Craft**: 10 clubes, turno e returno (18 rodadas). Os outros jogos da rodada são simulados.
- **Copa Craft**: mata-mata com quartas, semifinal e final entre as rodadas da liga.
- Jogue cada partida ou **simule** (mais rápido, rende menos pontos).
- Ganhe **pontos de treino** (nota, gols, assistências) e **dinheiro** (salário, bicho, prêmio por gol).
- **Centro de Treinamento**: evolua Velocidade, Finalização, Passe, Drible, Defesa e Físico.
  O mini-jogo de finalização dá pontos extras uma vez por rodada.
- **Loja**: chuteiras, tênis, colete e outros equipamentos que aumentam atributos.
- Fim de temporada: troféus (Liga, Copa, Artilheiro, Seleção da Temporada, Bola de Ouro),
  histórico, evolução dos clubes e **janela de transferências** com propostas de acordo com sua reputação.
- Envelhecimento: jovens evoluem sozinhos, veteranos perdem físico; aposentadoria aos 38 anos.
- Configurações por carreira: dificuldade (Fácil a Lendário), duração das partidas e formato.

Seus atributos valem em campo: Velocidade vira efeito de velocidade; Finalização define força e
precisão do chute; Passe, Drible, Defesa e Físico influenciam passes, proteção da bola e desarmes.
O progresso fica salvo no próprio mundo.

## Estrutura do projeto

```
Futebol_BP/            pacote de comportamento
  entities/            NPC jogador e bola (movidos por script)
  items/               itens de controle e menu
  scripts/
    main.js            eventos (itens, ataques, entrada/saída de jogadores)
    match.js           motor da partida: física da bola, IA dos NPCs, goleiros, regras, HUD
    career.js          liga, copa, simulação, temporadas, propostas, loja, treino
    ui.js              menus (server-ui)
    stadium.js         construção do estádio
    data.js, config.js, util.js
Futebol_RP/            pacote de recursos (modelos, animações, texturas, textos)
tools/gerar_recursos.py  gera uniformes (12 kits × 3 tons de pele), bola e ícones
tools/build.py           valida os JSONs e gera dist/FutebolCraft.mcaddon
```

Para regenerar texturas e o pacote:

```
python3 tools/gerar_recursos.py   # requer Pillow
python3 tools/build.py
```
