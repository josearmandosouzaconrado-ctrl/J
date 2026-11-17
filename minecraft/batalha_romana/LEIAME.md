# Batalha Romana (add-on Minecraft Bedrock + modelos do Blockbench)

O legionário romano contra os inimigos de Roma na época do Império:

| Inimigo | Arma | Visual | Onde aparece |
|---|---|---|---|
| **Guerreiro Gaulês** | espada longa celta (dano 7) + escudo oval | cabelo espetado, bigodão, torque de ouro, túnica e calça xadrez, manto azul | planícies e florestas, grupos de 2–4 |
| **Guerreiro Germânico** | framea, a lança (dano 6) + escudo redondo | coque suevo, barba trançada, pele de lobo nos ombros, peito nu, faixas nas pernas | taigas e florestas, grupos de 2–4 |
| **Arqueiro Parto** | arco recurvo (flechas, de longe) | gorro curvado com abas, túnica açafrão, calça bufante, aljava com flechas, punhal | desertos, savanas e mesas, grupos de 1–3 |

![batalha](previa_batalha.png)

![inimigos](previa_inimigos.png)

## Arquivos

| Arquivo | Para que serve |
|---|---|
| `BatalhaRomana.mcaddon` | Add-on completo: **inclui o Soldado Romano** e os três inimigos |
| `guerreiro_gaules.bbmodel`, `guerreiro_germano.bbmodel`, `arqueiro_parto.bbmodel` | Projetos do Blockbench (modelo, textura e animações) |
| `pacote_recursos/`, `pacote_comportamento/` | O conteúdo do add-on, aberto |

O modelo do legionário está em `../soldado_romano/soldado_romano.bbmodel`.

> Use **só este add-on**: ele já traz o legionário. Se o `SoldadoRomano.mcaddon` também estiver
> ativo no mundo, os dois brigam pelo mesmo `romano:legionario`.

## Como jogar

1. Abra `BatalhaRomana.mcaddon` e ative os dois pacotes no mundo (com comandos/trapaças ligados para usar `/function`).
2. Vá para um lugar plano e digite:
   - `/function batalha`: 6 legionários contra 2 gauleses, 2 germânicos e 2 arqueiros partos.
   - `/function batalha_grande`: o dobro de gente.
3. Ou use os ovos: **Gerar Guerreiro Gaulês**, **Gerar Guerreiro Germânico**, **Gerar Arqueiro Parto** e **Gerar Soldado Romano**.

Comportamento:
- Os inimigos atacam legionários e jogadores. Os legionários atacam os inimigos (e monstros).
- Em combate, os guerreiros levantam o escudo e ficam em guarda; o arqueiro estica o arco e atira.
- Os inimigos deixam pepitas de ferro e de ouro quando morrem.

## Posto avançado: os legionários constroem

![construção](previa_construcao.png)

![martelando](previa_martelando.png)

Os legionários erguem um **castellum de madeira** de 11 × 11 blocos: paliçada de troncos com pontas,
duas torres de vigia com plataforma, parapeito e tochas, portão com verga, e lá dentro uma fogueira,
tenda de couro, estandarte vermelho com águia dourada, bancada, barril e feno.

- **Sozinhos:** quando 3 ou mais legionários estão juntos, sem inimigos num raio de 24 blocos e sem
  outro posto num raio de 48, eles decidem construir (a cada 30 s há uma chance).
- **Sob ordem:** `/function posto_avancado` (ou `/scriptevent romano:construir`) manda os legionários
  livres até 32 blocos construírem para onde você está olhando, com o portão virado para você.
- **Como aparece:** até 4 soldados trocam o gládio por um martelo, vão até a obra e martelam; os
  blocos surgem um por um (muro de baixo para cima, depois torres, plataformas, portão e acampamento),
  com som de madeira e partículas. O muro é feito pelo lado de fora, então ninguém fica preso.
  Uns 261 blocos, mais ou menos 30 a 45 segundos com 3 ou 4 construtores.
- Se aparece um inimigo, quem está em combate larga o martelo e luta; depois outros são chamados de volta.
- O posto só ocupa espaço livre: grama e flores são trocadas, mas nada que você construiu é destruído.
  Terreno muito irregular (mais de 3 blocos de desnível) ou com água é recusado.
- `/function cancelar_obras` cancela as obras em andamento.

## IA mais esperta

- **Legionários:** chamam os companheiros quando um é atacado; o scutum segura metade do dano das
  flechas (parede de escudos); com pouca vida recuam por 6 s; feridos longe da luta se curam.
- **Bárbaros:** também chamam ajuda; com pouca vida perdem a coragem e fogem por 8 s.
- **Arqueiro parto:** mantém distância — se um romano chega a 6 blocos, ele recua e volta a atirar de longe.

O posto usa a API de scripts do Bedrock (`@minecraft/server` 1.11.0, já embutida no add-on). Precisa do
Minecraft Bedrock 1.21 ou mais novo.

## Animações (aba Animate do Blockbench)

- Legionário (`../soldado_romano/soldado_romano.bbmodel`): também `construir` (martelando)

- Gaulês e germânico: `parado`, `andar`, `combate`, `atacar`
- Arqueiro: `parado`, `andar`, `combate` (mira, puxa a corda e solta)

## Mudar os modelos

Gerados por `tools/gerar_batalha_romana.py` (usa `tools/mc_lib.py`, `tools/gerar_soldado_romano.py` e os scripts de `tools/scripts_batalha/`):

```bash
python3 tools/gerar_batalha_romana.py
```
