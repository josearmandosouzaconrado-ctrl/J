# Tanque M4A3(75)W Sherman — modelo + add-on

Refeito com as medidas reais do M4A3(75)W: 2,94 m de altura até a cúpula, ~2,6 m de largura,
~5,9 m de comprimento, 2,11 m entre o centro das esteiras, 43 cm de vão livre e o canhão a 2,24 m do chão.
Escala de verdade no Minecraft: 1 bloco = 1 metro (o tanque ocupa uns 6 × 3 × 3 blocos).

![Sherman](previa_sherman.png)

![de lado e de trás](previa_sherman_lado.png)

![detalhes](previa_sherman_detalhes.png)

**O que mudou para parecer um Sherman de verdade**: torre fundida arredondada (feita de 120 placas
inclinadas, mais estreita na frente e com a "bunda" atrás), mantlet M34A1 de face inteira com o escudo
do rotor, canhão de 75 mm com o comprimento certo, placa frontal a 47° que vai até o teto,
nariz da transmissão arredondado, sponsons sobre as esteiras, escotilhas grandes do motorista,
cúpula de visão do comandante com blocos de vidro, escotilha oval do carregador, .50 no teto,
suspensão VVSS (3 truques por lado, molas volutas, roletes de retorno em cima), roda dentada
na frente e esteira de borracha T48.

## Add-on (TanqueSherman.mcaddon)

Abra o `TanqueSherman.mcaddon` (instala os dois pacotes) e ative os dois no mundo
Depois, no chat: `/function sherman` — aparece um Sherman na sua
frente e você ganha 32 granadas de 75 mm e a metralhadora .50.

| Ação | Como |
| --- | --- |
| Entrar | clique direito no tanque (2 lugares: comandante e um na traseira) |
| Dirigir | WASD — a frente segue para onde você olha |
| Sair | agachar |
| Canhão de 75 mm | segure a **Granada de 75 mm** e clique direito: explosão onde mirar (recarga de 3 s) |
| Metralhadora .50 | segure a **Metralhadora .50** e clique direito (rajada) |

A torre e o canhão giram e sobem/descem seguindo a sua mira, o canhão recua no tiro, as rodas giram
quando anda, sai fumaça do escapamento e tem som de motor, tiro e impacto. Na tela aparece a
blindagem (400) e se o canhão está pronto. O tanque não toma dano de queda, fogo nem afogamento e
aguenta flechas; quando é destruído, explode e deixa ferro.

- `/function sherman_sem_destruicao` — o canhão para de quebrar blocos (`sherman_com_destruicao` volta).
- Receitas: granadas (ferro + pólvora + pepita de ouro), metralhadora e o próprio tanque
  (blocos de ferro, carrinhos e bloco de redstone).
- Também aparece o ovo **Tanque Sherman** no inventário criativo.

Gerado por `tools/gerar_sherman.py` (modelo) e `tools/gerar_addon_sherman.py` (add-on);
o script do jogo fica em `tools/scripts_sherman/main.js`.

## Versão no Blender (plugin)

Na pasta `blender/` está um **plugin do Blender** que gera o Sherman de verdade em 3D (malhas lisas,
não cubos): torre fundida arredondada, mantlet M34A1, canhão M3 de 75 mm, rodas estampadas com pneu,
molas volutas, roda motriz dentada, esteira elo por elo com garras em "V", número de registro em texto 3D,
materiais de tinta verde-oliva desbotada com arranhões e lama (Cycles) e animação (torre girando,
canhão subindo, rodas girando). Escala 1:1 em metros. ~28 mil faces, 126 objetos.

![frente](blender/sherman_blender_frente.png)
![lado](blender/sherman_blender_lado.png)
![trás](blender/sherman_blender_tras.png)
![torre](blender/sherman_blender_torre.png)
![suspensão](blender/sherman_blender_suspensao.png)

**Instalar o plugin** (Blender 4.2 ou mais novo): Editar > Preferências > Complementos > seta ⌄ no canto >
*Instalar do disco…* > `sherman_blender_addon.zip`. Depois, na vista 3D: **Shift+A > Malha > Tanque Sherman**
(ou a aba **Sherman** na barra lateral, tecla N). No painel que aparece dá para ligar/desligar as saias de
areia, a estrela/número e a animação. Para mirar, gire os vazios **Torre** (eixo Z) e **Canhão** (eixo X).

Arquivos prontos: `sherman.blend` (cena com chão, sol e câmera), `sherman.glb` (com animação) e `sherman.obj`.
Para gerar tudo de novo sem abrir o Blender: `pip install bpy` e `python3 tools/renderizar_sherman_blender.py`.
O código do plugin fica em `tools/blender_sherman/`.

Obs.: o Minecraft Bedrock só aceita modelos de cubos (Blockbench), então o modelo do Blender serve para
renders, animações e vídeos; o add-on do jogo continua usando o modelo de cubos de cima.
