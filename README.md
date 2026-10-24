# ⚔️ Crônicas de Eldoria

RPG medieval de fantasia em **mundo aberto**, todo em **pixel art**, feito para **celular** (também funciona no PC).
Roda direto no navegador, sem instalar nada — e pode ser instalado como aplicativo (PWA) e jogado offline.

## Como jogar

1. Abra o `index.html` por um servidor web (ex.: GitHub Pages, ou `python3 -m http.server` na pasta do projeto) e acesse pelo navegador do celular.
2. No celular, use **"Adicionar à tela inicial"** no menu do navegador para jogar em tela cheia e offline.

### Controles no celular
- **Lado esquerdo da tela:** joystick virtual (empurre até o fim para correr).
- **⚔ Atacar** (mira automática no inimigo mais próximo) • **Magia** • **⟳** trocar magia • **Esquiva** (invulnerável) • **Poção** • **Grito do Dragão** • **★ Habilidade racial** • **Cavalo**.
- O botão dourado de **ação** aparece quando há algo para interagir: falar, entrar, abrir baú, minerar, coletar ervas...
- Toque no minimapa para abrir o mapa-múndi; toque na missão rastreada para abrir o diário.

### Controles no teclado
WASD/setas andar • Shift correr • J/Espaço atacar • K magia • Q trocar magia • 1–9 escolher magia • L esquivar • E interagir • F poção de vida • G poção de magia • R grito • C trocar grito • T habilidade racial • H cavalo • I/Tab menu • M mapa.

## O que tem no jogo

- **Mundo procedural de 4096 × 4096 tiles (~65 km²)** — maior que o mapa de Skyrim — gerado a partir de uma semente (cada jogo pode ter um mundo diferente).
- **9 reinos/regiões** com biomas e culturas próprias: Reino humano de Valdoria, Condado das Colinas (pequeninos), Floresta élfica de Sylvaris, Montanhas anãs de Khaz Durim, Terras Geladas de Nordheim, Ermos orcs de Gor'Thak, Deserto felino de Zahrim, Pântanos draconatos de Ssarak e as Terras Sombrias de Morvath.
- **65+ cidades, vilas e capitais** com muralhas, castelos, palácios, tavernas, ferrarias, armazéns, alquimistas, lojas de magia, templos, estábulos, casas à venda, guardas e moradores que andam pelas ruas.
- **Estradas, pontes e placas** conectando todo o reino; viagem rápida para cidades descobertas.
- **8 raças jogáveis** (Humano, Elfo, Anão, Orc, Pequenino, Draconato, Felino, Nórdico), cada uma com bônus e habilidade especial.
- **Sem classe fixa**: você começa como Aventureiro e seu estilo (Guerreiro, Mago, Arqueiro, Paladino, Druida, Ladino e mais de 20 outros) surge das habilidades que você mais usa, com bônus próprios. As **Pedras do Destino** perto de Valdoria dão bênçãos que aceleram seu caminho.
- **Interiores exploráveis em todos os 800 prédios**: casas com moradores, tavernas, ferrarias, lojas, templos, guildas, castelos com sala do trono.
- **Romance, casamento e filhos**: converse, dê presentes, flerte, namore e case (Amuleto da Aurora). Seu cônjuge mora com você, cozinha, dá presentes e pode lutar ao seu lado. Tenha filhos ou adote no orfanato do templo.
- **Animais de estimação** (cachorro, gato selvagem, lobo domado) e **pesca**.
- **9 guildas** — incluindo a **Guilda dos Heróis** com ranks F → S, Companhia do Aço, Academia Arcana, Irmandade das Sombras, Ordem da Aurora, Liga dos Caçadores, Círculo Druídico, Irmandade da Forja e Clã do Punho Sangrento — com missões geradas e recompensas por posto.
- **História principal** em 9 capítulos contra o Lich Morvath e o dragão ancião Vorthax.
- **140+ masmorras** procedurais (cavernas, criptas, ruínas élficas, minas anãs, túmulos nórdicos, tumbas do deserto, cavernas de lava e gelo, arena) com chefes e baús de tesouro, além de acampamentos de bandidos.
- **50+ tipos de inimigos e chefes**: lobos, ursos, aranhas, goblins, bandidos, esqueletos, draugrs, espectros, trolls, ogros, golems, elementais, múmias, hidra, Rainha Aranha, Lich e **dragões que atacam pelo mundo**.
- **Combate**: armas corpo a corpo, arcos, cajados, críticos, esquiva, bloqueio, efeitos de fogo/gelo/veneno/atordoamento.
- **18 magias** (destruição, restauração e conjuração) e **6 Gritos do Dragão** aprendidos com almas de dragão em Pedras Rúnicas.
- **Equipamentos em 9 materiais** (couro até dracônico), raridades (comum → lendário), encantamentos aleatórios, artefatos únicos e encantamento com gemas.
- **Criação**: mineração, coleta de ervas, fundição, forja, alquimia e culinária.
- **Progressão**: níveis, 9 habilidades que evoluem com o uso, 24 talentos.
- Ciclo **dia/noite** com iluminação dinâmica, **clima** (chuva, tempestade, neve, cinzas, areia), música procedural e efeitos sonoros sintetizados.
- Cavalo, mercenários, invocações, casas com baú, mapas do tesouro, santuários, mercadores viajantes.
- **Salvamento** automático e em 3 espaços (no próprio navegador).

## Estrutura do código

| Arquivo | Conteúdo |
|---|---|
| `js/data.js` | Raças, classes, itens, magias, inimigos, guildas, regiões, história |
| `js/sprites.js`, `js/sprites2.js` | Toda a pixel art gerada por código (tiles, objetos, personagens, criaturas, construções, ícones) |
| `js/world.js` | Geração do mundo aberto, cidades, estradas, masmorras e locais |
| `js/dungeon.js` | Geração das masmorras |
| `js/entities.js`, `js/player.js` | Combate, IA dos monstros, NPCs e jogador |
| `js/quests.js`, `js/shops.js`, `js/items.js` | Missões, lojas, itens e saque |
| `js/ui.js`, `js/input.js`, `js/audio.js` | Interface, controles de toque/teclado e áudio |
| `js/game.js` | Loop principal, renderização, iluminação, salvamento |

Sem dependências externas além da fonte VT323 (opcional).
