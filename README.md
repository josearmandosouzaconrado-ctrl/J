# Guerra Mundial 1939

Jogo de estratégia da Segunda Guerra Mundial para celular, em 3D, que roda direto no navegador, sem instalação. Junta um mapa estratégico do mundo inteiro, no estilo Hearts of Iron, com batalhas táticas em 3D, no estilo Company of Heroes.

## Campanha mundial

Começa em **1º de setembro de 1939**, com a Alemanha invadindo a Polônia. Escolha a sua nação:

| Nação | Começa |
| --- | --- |
| Alemanha | Em guerra com a Polônia |
| Reino Unido, França | Declaram guerra à Alemanha em 3 de setembro |
| União Soviética | Neutra, com o Pacto Molotov–Ribbentrop |
| Itália | Neutra até junho de 1940 |
| Japão | Em guerra com a China |
| Estados Unidos | Neutros, com indústria que cresce todo mês |
| Polônia | Invadida no primeiro dia |
| China | Em guerra com o Japão |

- **Mapa:** o mundo com as fronteiras de 1939, dividido em cerca de 980 províncias. Pode ser visto como **globo 3D** ou como **mapa político plano (estilo HoI)**: botão "Mapa".
- **Tempo:** ❚❚ pausa; de 1 a 5 escolhe a velocidade, de 1 dia a cada 2 s até 8 dias por segundo.
- **Divisões:** de infantaria, motorizadas e blindadas, mostradas com contadores e símbolos da OTAN, além de figuras 3D na cor de cada nação. Toque nas suas divisões e depois numa província para mover ou atacar. Para longe ou do outro lado do mar, elas viajam por transporte naval.
- **General automático:** ligado por padrão (fica no painel de Produção). A IA comanda as suas frentes, e toda divisão a que você der uma ordem passa a ser comandada por você. O botão AO GENERAL devolve a divisão para a IA.
- **Combate:** depende de organização, força, terreno (montanhas, selva, frio), inverno russo, linhas de suprimento e cercos. A doutrina de cada exército muda com o tempo: a Blitzkrieg alemã é forte até 1942, o Exército Vermelho cresce a partir de 1943.
- **Eventos históricos:** Guerra de Inverno, Weserübung, queda da França, entrada da Itália, anexação dos países bálticos, Pacto Tripartite, Iugoslávia e Grécia, Operação Barbarossa, Pearl Harbor, México e Brasil na guerra e a Manchúria em 1945. Quando a decisão é da sua nação, você escolhe se segue a história.
- **Capitulação:** quando um país perde a capital e a maior parte do território, ele capitula. A França vira a França de Vichy. Países com colônias continuam lutando no exílio.
- **Produção, pesquisa e diplomacia:** fabrique divisões, pesquise Blindados, Infantaria e Indústria, declare guerra e entre nos Aliados ou no Eixo.
- **Salvamento:** o jogo salva sozinho a cada 15 dias. O botão MENU também salva, e CONTINUAR retoma a partida.

## Batalhas em 3D

Toda batalha com divisões suas pode ser lutada no campo 3D: toque em **LUTAR EM 3D** no aviso, no marcador ⚔ ou no painel BATALHAS. As outras batalhas são resolvidas automaticamente.

- O terreno vem da província: temperado, mediterrâneo, deserto, selva, montanha, e neve no inverno do norte.
- As tropas são as das divisões envolvidas, com os veículos do ano e da pesquisa de cada nação. Uniformes, bandeiras e aviões de apoio mudam por país, e os blindados alemães são cinzentos até 1943.
- Cada nação tem soldados próprios: capacete M1, Stahlhelm, Brodie, SSh-40, Tipo 90, M33 ou Adrian, além de uniforme, equipamento e armas da época (Garand, Kar98k, Lee-Enfield, Mosin, Arisaka, Thompson, MP40, PPSh, bazuca e Panzerschreck).
- O atacante precisa tomar 3 posições, e o defensor precisa segurá-las. Ganha também quem destroçar o outro lado, e o botão RETIRAR encerra a batalha a qualquer momento.
- As perdas e o resultado voltam para o mapa.

## Evolução dos veículos

Cada nação ganha blindados novos conforme os anos e a pesquisa:

| Nação | 1936 → 1944 |
| --- | --- |
| Alemanha | Panzer II → Panzer III → Panzer IV → Panther → Tiger II (e Sd.Kfz. 251, Puma, StuG, Jagdpanther) |
| União Soviética | T-26 → BT-7 → T-34 → KV-1 |
| Estados Unidos | M3 Stuart → M3 Lee → Sherman → M26 Pershing (e meia-lagarta, Greyhound, M10, M18) |
| Reino Unido | Matilda II → Crusader → Sherman |
| França | Somua S35 → Char B1 bis |
| Itália | L3/35 → Fiat M13/40 |
| Japão | Ha-Go → Chi-Ha |
| Polônia | 7TP |

## Controle

Funciona com controle de Xbox, PlayStation 4 e 5 ou genérico, com fio ou por Bluetooth. Conecte o controle ao celular ou computador e aperte qualquer botão.

| Botão | Mapa mundial | Batalha 3D |
| --- | --- | --- |
| Analógico esquerdo | Cursor (na borda, move a câmera) | Cursor (na borda, move a câmera) |
| Analógico direito, LT/RT (L2/R2) | Girar / zoom | Girar / zoom |
| A (✕) | Selecionar / ordenar no cursor | Selecionar / ordenar no cursor |
| X (□) | Mover ou atacar no cursor | Mover ou atacar no cursor |
| B (○) | Cancelar | Cancelar |
| Y (△) | Batalhas | Todas as tropas |
| LB / RB (L1/R1) | Velocidade − / + | Tanques / Apoio |
| Menu / Options | Pausar | Apoio |
| View / Share | Globo ou mapa plano | Seleção em caixa |
| Direcional | Navegar pelos botões dos menus e painéis | Navegar pelos botões dos menus e painéis |

O controle vibra com as explosões próximas.

## Modo livre

Na tela inicial:

- **Recursos ilimitados:** produção 20 vezes maior e suprimentos infinitos.
- **Sem névoa:** inimigos sempre à mostra nas batalhas e visão de longe.

## Arquitetura

- `index.html`: interfaces do mapa e da batalha, telas e estilos.
- `js/dados_mundo.js`: províncias do mundo em 1939, geradas a partir do Natural Earth (world-atlas 50m). Contém os contornos como arcos compartilhados, as adjacências e estreitos, o terreno e os nomes de cidades.
- `js/mundo.js`: a campanha estratégica. Inclui nações, guerras e eventos, movimento, combate, suprimento e cerco, IA, produção e pesquisa, o desenho do mapa (globo e plano), os contadores e a ponte para as batalhas 3D.
- `js/controle.js`: suporte a controle pela Gamepad API, com cursor virtual, navegação por direcional e vibração.
- `js/soldado3d.js`: soldados de todas as facções, com esqueleto de proporções reais e mãos presas à arma em todas as poses (parado, andando, correndo, mirando, ajoelhado, ferido, paraquedas). Cada nação tem capacete, uniforme, equipamento e armas próprios.
- `teste_soldado.html`: página para ver os soldados de perto, por facção, tipo e pose.
- `js/blindados3d.js`: 45 veículos modelados do zero em escala real — 34 tanques e caça-tanques, carros blindados, meias-lagartas, jipes, caminhões e o trator do Dia D. Têm rodas e lagartas animadas, camuflagem de cada nação e época pintada no shader, Zimmerit, Schürzen e uma versão leve automática quando estão longe da câmera.
- `js/avioes3d.js`: 12 aviões (P-47, Fw 190, Ju 87, C.202, Il-2, Typhoon, Zero, D.520, PZL P.11, I-16, C-47 e B-26), com pintura de cada força aérea e as faixas da invasão.
- `js/navios3d.js`: contratorpedeiros Fletcher e Kagerō, cruzador Cleveland, lanchas PT e S-Boot, barcaça Higgins, LST e encouraçado.
- `teste_blindados.html`, `teste_avioes.html` e `teste_navios.html`: visualizadores para ver os modelos de perto.
- `js/models.js` e `js/veiculos.js`: civis, construções e os modelos antigos (reserva).
- `js/world.js`: terreno tático 3D, vilas, vegetação, coberturas e água.
- `js/game.js`: o modo tático, com unidades, IA de cobertura, médicos, combate, apoio aéreo e de artilharia, e as batalhas da campanha.
- `js/campanha.js`: gerador do mapa gigante do Reno, das versões anteriores.

Usa [three.js r128](https://threejs.org/) pelo CDN cdnjs. Os dados do mapa vêm do [Natural Earth](https://www.naturalearthdata.com/), que é de domínio público.
