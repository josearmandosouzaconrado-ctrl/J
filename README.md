# Dia D Normandia

Jogo de estratégia em tempo real (RTS) em 3D para celular, ambientado na praia de Omaha em 6 de junho de 1944. Roda direto no navegador, sem instalação.

## Cenários

Escolha antes de começar:

| Cenário | Data | Chegada | Inimigo final |
| --- | --- | --- | --- |
| Normandia — Praia de Omaha | 6 jun 1944 | Barcaças Higgins e LST | QG em Trévières |
| Norte da África — Passo de Kasserine | fev 1943 | Comboio de caminhões no deserto | QG em Sidi Bou Zid |
| Itália — Anzio | 22 jan 1944 | Barcaças Higgins e LST | QG em Campoleone |
| Ardenas — rumo a Bastogne | dez 1944 | Comboio na neve | QG em Houffalize |

Cada cenário muda o relevo, as cores do terreno, o estilo das vilas, a vegetação, o clima (neve nas Ardenas) e a pintura dos uniformes e tanques.

## Como jogar

Abra `index.html` num navegador (de preferência com o celular deitado), ou publique a pasta no GitHub Pages.

1. **Desembarque.** Três barcaças Higgins abrem a rampa sob o fogo das casamatas alemãs. Leve os soldados até a cobertura dos ouriços tchecos e das crateras, suba a falésia e destrua as 4 casamatas com granadas, bazucas e o apoio naval dos destróieres.
2. **Cabeça de praia.** Quando a praia cai, um navio LST encosta, abre as portas da proa e desembarca o Veículo de Construção (trator D7) escoltado por dois Shermans. Leve o veículo para terra firme e toque em **MONTAR BASE**.
3. **Avanço.** Construa Depósito, Quartel, Fábrica de Tanques, Ninhos de Metralhadora, Canhões AT e Hospital. Capture Vierville, Saint-Laurent, Colleville e Formigny (cada vila dá +6 suprimentos/s), resista aos contra-ataques e destrua o Quartel-General Alemão em Trévières.

### Unidades

- **Aliados:** Fuzileiro, Bazuqueiro, Meia-lagarta M3, M8 Greyhound, Sherman M4, M10 Wolverine e o Veículo de Construção (trator D7 blindado).
- **Alemães:** Granadeiro, Panzerschreck, Sd.Kfz. 251, StuG III, Panzer IV e Tiger I.
- **Navios:** contratorpedeiros controláveis apoiam o desembarque no litoral; lanchas torpedeiras S-Boot alemãs atacam os navios.
- **Paraquedistas:** em APOIO, aviões C-47 lançam 9 homens da 101ª Aerotransportada no ponto escolhido.
- **Inteligência:** sob fogo, os soldados (seus e inimigos) avançam de cobertura em cobertura — pedras, toras, crateras, muros, casas e trincheiras — até o destino. Soldados atingidos podem cair feridos: um médico corre até eles, arrasta-os para a cobertura enquanto outro soldado dá cobertura, e cura-os.
- **Aviação:** no botão APOIO você chama destróieres, caças P-47 Thunderbolt (metralham e disparam foguetes) ou bombardeiros B-26 Marauder (tapete de bombas). Caças Fw 190 da Luftwaffe atacam a sua base; construa Canhões Antiaéreos de 40 mm para derrubá-los. Os alemães têm Flak 38 de 20 mm.

### Controles

| Ação | Toque | Mouse/teclado |
| --- | --- | --- |
| Selecionar | Toque na unidade (toque duplo: todas do mesmo tipo) | Clique |
| Mover / atacar | Toque no chão / no inimigo | Clique ou botão direito |
| Câmera | Arrastar; pinça para zoom e giro | Arrastar, roda, WASD, Q/E |
| Seleção em grupo | Botão CAIXA e arrastar | Shift + arrastar |
| Ponto de reunião | Com Quartel/Fábrica selecionado, toque no chão | Clique |

## Arquitetura

- `index.html` — HUD, telas e estilos.
- `js/models.js` — modelos low-poly: soldados animados, Sherman, Panzer IV, Tiger, trator D7, LCVP, LST com balão de barragem, navios e construções.
- `js/world.js` — mapa de 1.400 × 1.620 m: praia, falésia com "draws", 5 vilas, trincheiras, sebes (bocage), pomares, obstáculos de praia, arame farpado e o minimapa.
- `js/game.js` — unidades, IA, combate (cobertura, blindagem, estilhaços), névoa de guerra, fases, economia, áudio sintetizado e controles de toque.

Usa [three.js r128](https://threejs.org/) pelo CDN cdnjs.
