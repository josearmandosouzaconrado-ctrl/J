# Crônicas de Eldoria — O Anime · Episódio 1: "O Chifre do Norte"

Primeiro capítulo (curto, ~67 s) de um anime passado no mundo do jogo. Protagonista: **Aren**, um garoto
humano de uma vila do norte de Eldoria, aprendiz do mestre anão **Borin**. Na mesma manhã em que ele
treina, o **Jarl Hrafn** de Hrimgard sopra o chifre de guerra e os vikings da geleira atacam a vila.
Aren enfrenta um **berserker**, e uma runa de gelo desperta na sua mão.

| Parte | Como foi feita |
|---|---|
| Cenários pintados (`cenarios/`) | gerados no **Figma** (geração de imagem) |
| Animação (`anime.js`) | desenhada quadro a quadro em canvas: personagens em cel-shading com esqueleto, poses "em dois" (12 desenhos/s, câmera a 24 fps), linhas de velocidade, quadro de impacto, faíscas, neve, brasas e aura |
| Trilha (`som/trilha_abc.js`) | composta em partitura ABC (**Play Sheet Music**) e tocada pelo sintetizador do próprio jogo (`js/musica.js`) |
| Efeitos sonoros (`som/efeitos.js`) | sintetizados (chifre, golpes, choque de metal, rugido, fogo, vento, runa) |
| Montagem e exportação final | **Picsart** (vídeo + música + efeitos, fades e cartão final) |

Vídeo pronto: `video/CronicasDeEldoria_Anime_Ep1.mp4` (72 s, 1280x720, 24 fps, com trilha e efeitos).

Para ver a animação no navegador: abra `anime/ep1/index.html#play` por um servidor local
(`python3 -m http.server`).
