# 🎖️ Frente Ocidental 1916 — jogo Unity 3D para celular (1ª Guerra Mundial)

Jogo de tiro em primeira pessoa, em 3D, ambientado no **primeiro dia da Batalha do Somme (1º de julho de 1916)**.
Você é o soldado britânico Thomas Hale: ao som do apito, sai da trincheira, atravessa a terra de ninguém,
destrói o ninho de metralhadora, toma a trincheira alemã, sobrevive a um ataque de gás e segura a posição
até os reforços chegarem. **A campanha tem começo, meio e fim**, com tela de vitória, epílogo histórico e "FIM".

Tudo é gerado por código (terreno, modelos, texturas, sons e interface), então o projeto **não precisa de nenhum
asset da loja** — é só abrir no Unity e apertar Play.

## Como abrir e jogar

1. Instale o **Unity 2022.3 LTS** (pelo Unity Hub) com o módulo **Android Build Support** (inclui SDK, NDK e OpenJDK).
   Também funciona no Unity 6.
2. No Unity Hub: **Add → Add project from disk** e escolha a pasta `WW1Unity`.
3. Ao abrir, o projeto se prepara sozinho (cria a cena `Assets/WW1/Scenes/FrenteOcidental.unity`,
   os materiais e as configurações do Android). Se quiser repetir: menu **WW1 → 1. Preparar projeto**.
   - Se aparecer o aviso de "sistema de entrada ajustado", reinicie o Unity uma vez.
4. Aperte **Play** para testar no editor (WASD + mouse).

## Gerar o APK para o celular

- Menu **WW1 → 2. Gerar APK Android**. O arquivo sai em `WW1Unity/Builds/FrenteOcidental1916.apk`.
- Copie o APK para o celular e instale (permita "instalar apps de fontes desconhecidas").
- Pela linha de comando:
  `Unity -batchmode -quit -projectPath WW1Unity -executeMethod WW1.EditorTools.WW1Setup.BuildAndroidBatch`

Configuração usada: Android 7.0+ (API 24), ARM64, IL2CPP, paisagem, espaço de cor linear.

## Controles

**Celular**
- Lado esquerdo: joystick flutuante (empurre até o fim para frente para correr).
- Lado direito: arraste para olhar/mirar (arrastar o dedo no botão ATIRAR também mira).
- Botões: **ATIRAR**, **MIRAR** (mira de ferro), **RECARREGAR**, **GRANADA**, **BAIONETA**, **AGACHAR**,
  **MÁSCARA** (aparece no ataque de gás) e **II** (pausa).

**PC / editor**: WASD andar • Shift correr • mouse olhar • clique esquerdo atirar • botão direito mirar •
R recarregar • G granada • F baioneta • C agachar • M máscara • Esc pausa.

## A missão

1. **Bombardeio** — a artilharia aliada castiga a linha alemã enquanto você espera na trincheira.
2. **O apito** — os soldados sobem e avançam pela terra de ninguém; saia pelas rampas ou escalando a parede.
3. **Terra de ninguém** — crateras alagadas, arame farpado (com brechas), árvores mortas e um tanque Mark I
   destruído servem de cobertura. Obuses alemães caem por perto.
4. **Ninho de metralhadora** — destrua a MG 08 com uma granada ou abata o atirador.
5. **Trincheira alemã** — elimine os defensores (combate de baioneta na trincheira) e reabasteça na caixa de munição.
6. **Ataque de gás** — coloque a máscara (a visão fica limitada pelas lentes).
7. **Contra-ataque** — segure a posição contra ondas de infantaria alemã até os reforços chegarem.
8. **Vitória e epílogo** — estatísticas, o contexto histórico e o armistício de 11/11/1918. **FIM.**

Morreu? "Tentar novamente" recomeça a missão direto, sem passar pelo menu.

## O que deixa o jogo realista

- Terreno de 128 × 304 m com relevo, mais de cem crateras (algumas com poças d'água que refletem o céu),
  trincheiras em zigue-zague com baias, degraus de tiro, estrados de madeira, revestimento nas paredes
  e parapeitos de sacos de areia.
- Texturas procedurais de lama com mapa de normais, tecido, madeira, aniagem e metal enferrujado.
- Céu encoberto, neblina, chuva constante, sombras, colunas de fumaça e explosões com fogo, terra e fumaça.
- Soldados britânicos (capacete Brodie, uniforme cáqui, perneiras) e alemães (Stahlhelm M1916, feldgrau, botas)
  com animação de corrida, de joelhos e de morte.
- Fuzil Lee-Enfield com ferrolho animado, mira de ferro, recarga por pentes, baioneta e granadas Mills.
- Inimigos avançam em lances, se ajoelham para atirar, saltam na trincheira e lutam de baioneta.
- Som 100% sintetizado: tiros com eco, metralhadora, explosões, assobio dos obuses, apito do oficial,
  chuva, vento, sino de alarme de gás, respiração dentro da máscara e batimento cardíaco com pouca vida.

## Opções

- **Dificuldade**: Recruta, Soldado ou Veterano (precisão inimiga, distância dos obuses e tamanho das ondas).
- **Gráficos**: *Realista* (sombras, antisserrilhado, clarões) ou *Desempenho* (para celulares mais fracos).
- **Sensibilidade** da mira.

## Estrutura do código (`Assets/WW1`)

| Pasta | Conteúdo |
|---|---|
| `Scripts/Game.cs` | Inicialização automática, estados (menu, briefing, jogo, pausa, morte, vitória), qualidade e atmosfera |
| `Scripts/Mission.cs` | Roteiro da campanha, objetivos, ondas de inimigos, final |
| `Scripts/World` | Terreno, trincheiras, crateras, arame, tanque, destroços |
| `Scripts/Actors` | Vida, modelo/animação dos soldados, IA, ninho de metralhadora |
| `Scripts/Player` | Movimento em primeira pessoa, fuzil, granadas |
| `Scripts/Effects` | Partículas, traçantes, artilharia e sons sintetizados |
| `Scripts/UI` | Controles de toque e interface (IMGUI) |
| `Editor/WW1Setup.cs` | Preparação do projeto e geração do APK |
