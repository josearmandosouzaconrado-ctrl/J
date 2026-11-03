# 🎖️ Frente Ocidental 1916

Jogo de tiro em primeira pessoa, em 3D, ambientado no **primeiro dia da Batalha do Somme (1º de julho de 1916)**.
Você é o soldado britânico Thomas Hale: ao som do apito, sai da trincheira, atravessa a terra de ninguém,
destrói o ninho de metralhadora, toma a trincheira alemã, sobrevive a um ataque de gás e segura a posição
até os reforços chegarem. A campanha tem começo, meio e fim, com tela de vitória, epílogo histórico e "FIM".

Também tem o **MUNDO ABERTO**: um mapa de 6 × 6 km da frente do Somme, no estilo GTA, onde você chega
de comboio de caminhões à cidade de Albert e escolhe ser **soldado, tanquista, artilheiro ou comandante de divisão**.

Feito com WebGL ([three.js](https://threejs.org), incluído em `lib/`). Terreno, modelos, texturas e sons são
gerados por código, sem nenhum arquivo de arte.

## Instalar no celular (Android)

1. No celular, baixe o APK pelo link fixo (sempre a versão mais nova):
   **https://github.com/josearmandosouzaconrado-ctrl/J/releases/download/frente-ocidental-1916/FrenteOcidental1916.apk**
2. Abra o arquivo e permita "instalar apps de fontes desconhecidas".
3. O jogo abre em tela cheia, deitado. Use fones de ouvido.

Também roda no navegador do PC: abra `ww1/index.html`.

### Como o APK é gerado

O GitHub Actions (`.github/workflows/frente-ocidental-apk.yml`) compila o projeto Android da pasta
`ww1-android/` com o Android SDK e o Gradle oficiais, coloca o jogo da pasta `ww1/` dentro do APK e publica
na Release `frente-ocidental-1916`. Isso acontece sozinho a cada mudança em `ww1/` ou `ww1-android/`,
ou pela aba **Actions → APK Frente Ocidental 1916 → Run workflow**.

Sem configuração extra, o APK é assinado com uma chave de teste nova a cada compilação, então para
instalar uma versão nova é preciso desinstalar a antiga antes. Para atualizar sem desinstalar, crie uma
chave (`keytool -genkeypair -keystore ww1.jks -alias ww1 -keyalg RSA -validity 10000`) e cadastre os
segredos `WW1_KEYSTORE_BASE64` (o arquivo em base64) e `WW1_KEYSTORE_PASSWORD` no repositório.

## Mundo aberto

- **Mapa de 6 × 6 km** com 14 cidades e vilas francesas (Albert, Amiens, Bapaume, Pozières...), estradas com
  álamos, o rio Ancre, florestas, campos de trigo e a linha de frente inteira com trincheiras, crateras e arame.
- **Chegada de comboio**: você chega sentado na carroceria de um caminhão com outros soldados até a praça de Albert
  (dá para pular a viagem).
- **Funções**:
  - *Soldado de infantaria*: missões no quartel-general (assalto a trincheiras, destruir metralhadoras, levar
    munição de caminhão até a frente, defender a linha).
  - *Tanquista*: pilote o tanque Mark IV, dispare o canhão e a metralhadora e rompa a linha alemã.
  - *Artilheiro*: opere o canhão de 18 libras, ajuste direção e elevação, veja a correção do observador
    ("curto 80 m, à esquerda 30 m") e use a vista do observador sobre o alvo.
  - *Comandante de divisão*: mapa estratégico com 8 batalhões e 20 setores da frente; ordene ataques e
    barragens de artilharia e enfrente os contra-ataques alemães.
- Dá para **dirigir qualquer caminhão ou tanque** estacionado, usar a **viagem rápida** pelo mapa e ser promovido
  (Soldado → Cabo → Sargento → Tenente → Capitão → Major).
- Os setores tomados ficam salvos. Com 8 setores tomados aparece a **ofensiva final sobre Bapaume** (o comandante
  vence com 10 setores), seguida da tela de vitória e "FIM".

## Controles

**Celular**: joystick à esquerda (empurre até o fim para frente para correr); arraste à direita para olhar
(arrastar o dedo no botão ATIRAR também mira). Botões ATIRAR, MIRAR, RECARREGAR, GRANADA, BAIONETA, AGACHAR,
MÁSCARA (no ataque de gás) e II (pausa). O botão "voltar" do Android também pausa.

**Controle de PS4 (DualShock 4 por Bluetooth), Xbox ou genérico**: pareie o controle no Android antes de abrir o jogo.
Analógico esquerdo anda, direito mira • R2 atira • L2 mira de ferro • □ recarrega • ○ agacha • L1 granada •
R1 baioneta • △ usar/entrar/sair de veículo • L3 corre • ↑ máscara • touchpad/Share ou ↓ abre o mapa • Options pausa.
Nos veículos: R2 acelera, L2 freia/ré, analógico esquerdo vira, R1 dispara o canhão do tanque, L1 metralhadora.
No canhão de artilharia: analógico direito ou cruz direcional ajustam a mira, R2 ou X dispara, □ alterna a vista do
observador. Nos menus: cruz direcional ou analógico escolhe, X confirma, ○ volta.

**PC**: WASD andar • Shift correr • mouse olhar (clique na tela) • clique atirar • botão direito mirar •
R recarregar • G granada • F baioneta • C agachar • M máscara • Esc pausa. No mundo aberto: E usar/entrar/sair,
Tab mapa, Espaço dispara o canhão do tanque, Q vista do observador.

## A missão

1. **Bombardeio**: a artilharia aliada castiga a linha alemã enquanto você espera na trincheira.
2. **O apito**: os soldados sobem; saia pelas rampas ou empurrando contra a parede para escalar.
3. **Terra de ninguém**: crateras alagadas, arame farpado (com brechas), árvores mortas e um tanque Mark I destruído.
4. **Ninho de metralhadora**: destrua a MG 08 com granada ou abata o atirador.
5. **Trincheira alemã**: elimine os defensores e reabasteça na caixa de munição.
6. **Ataque de gás**: coloque a máscara.
7. **Contra-ataque**: segure a posição até os reforços chegarem.
8. **Vitória e epílogo**, até o armistício de 11/11/1918. **FIM.**

## Opções

Dificuldade (Recruta, Soldado, Veterano), gráficos (Realista ou Desempenho) e sensibilidade da mira.
