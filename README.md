# Dia D Normandia

Jogo de estratégia em tempo real (RTS) em 3D para celular, ambientado na praia de Omaha em 6 de junho de 1944. Roda direto no navegador, sem instalação.

## Como jogar

Abra `index.html` num navegador (de preferência com o celular deitado), ou publique a pasta no GitHub Pages.

1. **Desembarque.** Três barcaças Higgins abrem a rampa sob o fogo das casamatas alemãs. Leve os soldados até a cobertura dos ouriços tchecos e das crateras, suba a falésia e destrua as 4 casamatas com granadas, bazucas e o apoio naval dos destróieres.
2. **Cabeça de praia.** Quando a praia cai, um navio LST encosta, abre as portas da proa e desembarca o Veículo de Construção (trator D7) escoltado por dois Shermans. Leve o veículo para terra firme e toque em **MONTAR BASE**.
3. **Avanço.** Construa Depósito, Quartel, Fábrica de Tanques, Ninhos de Metralhadora, Canhões AT e Hospital. Capture Vierville, Saint-Laurent, Colleville e Formigny (cada vila dá +6 suprimentos/s), resista aos contra-ataques e destrua o Quartel-General Alemão em Trévières.

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
