# 🎖 Frente Europa 1944

Jogo de **estratégia em tempo real (RTS)** na **Europa em tamanho real**, com foco na **França**, feito para **celular Android** (APK) e que também roda no navegador do PC.

O mapa é o **mundo real**: fotos de **satélite** (Esri World Imagery) aplicadas sobre o **relevo real** (AWS Terrain Tiles), com 1 metro do jogo = 1 metro de verdade.

O mundo é **construído em 3D**:
- **Relevo**: morros, vales e montanhas reais com luz e sombra (exagero ajustável no menu: real 1×, 1,5× ou 2,5×).
- **Cidades e vilas**: o jogo analisa as fotos de satélite e, onde há telhados e ruas, levanta **prédios e casas com telhado de duas águas**, com a cor dos telhados da própria foto. Nas cidades grandes (Paris, Lyon, Marseille...) os prédios são mais altos.
- **Florestas e cercas vivas** (o *bocage* da Normandia) viram **árvores 3D**.
- **Marcos**: **Torre Eiffel** (324 m) e **Arco do Triunfo** (50 m), modelados no Blender nos lugares e tamanhos reais.
- Opcional: prédios reais do OpenStreetMap no lugar dos gerados. Dá para afastar até ver a Europa inteira e aproximar até ver os campos da Normandia, as ruas de Paris e os tanques lado a lado. As **cidades são reais** (Paris, Caen, Cherbourg, Lyon, Marseille, Bruxelas, Berlim...) e as bases ficam nos lugares históricos (praia de Omaha, RAF Tangmere, aeroporto de Orly...).

> Projeto independente: não usa código de nenhum outro jogo deste repositório.

## 📱 Instalar no celular

Baixe **`FrenteEuropa1944.apk`** (nesta pasta) no Android e instale (permita "instalar apps de fontes desconhecidas").
O jogo precisa de **internet** para baixar as imagens de satélite e o relevo do mapa (os modelos 3D já vêm dentro do APK).

## 🎮 Modos

| Modo | O que é |
|---|---|
| **Campanha: Dia D — Normandia → Paris** | 6 de junho de 1944. Desembarque em Omaha/Utah, avance pela França e liberte Paris para vencer. |
| **Batalha Aérea sobre o Canal** | Você já começa pilotando um P-51 Mustang contra caças inimigos, com porta-aviões e B-17 ao lado. |
| **Europa Livre** | Sandbox com 100.000 de suprimentos para construir e testar tudo. |

## 🪖 Unidades (todas modeladas no Blender com medidas reais)

| Tipo | Unidades |
|---|---|
| **Infantaria** | Fuzileiro (M1 Garand), Bazuca M1A1 |
| **Veículos WW2** | Jipe Willys MB, Caminhão GMC CCKW, Half-track M3, Tanque **M4A3 Sherman**, Artilharia **M7 Priest** (alcance 11 km) |
| **Aviões** | **P-51D Mustang** (caça), **P-80 Shooting Star** (o primeiro caça a jato dos EUA, de 1944/45), **B-17G** (bombardeiro), **C-47** (transporte de paraquedistas) |
| **Navios** | **Porta-aviões classe Essex** (12 aviões no hangar), **Contratorpedeiro Fletcher** (alcance 15 km), **Barco Higgins LCVP** (desembarque na praia) |
| **Estruturas** | Quartel-General, Quartel (Quonset), Garagem, Aeródromo (pista de 700 m), Porto Naval, **Bunker** (até 6 soldados dentro), Canhão Antiaéreo Bofors |

### Soldados que entram em veículos e estruturas
- Selecione soldados e **toque num jipe (3), caminhão (12), half-track (10), C-47 no aeródromo (18), barco Higgins (12) ou bunker (6)**.
- **Desembarcar** no painel. O **C-47 em voo solta paraquedistas** (🪂). O Higgins precisa encostar na praia.
- Aviões pousam no **aeródromo** ou dentro do **porta-aviões** (toque nele com aviões selecionados). "Lançar aviões" decola todos.

### ✈ Batalha aérea / modo piloto
Selecione **um** avião e toque em **✈ Pilotar**. Joystick à esquerda é o manche (puxe para baixo para subir), à direita ficam o acelerador, **FOGO** e **💣** (no B-17). O indicador vermelho mostra o inimigo aéreo mais próximo. No PC: setas/WASD, Shift/Ctrl, Espaço e B.

## 🕹 Controles da estratégia
- **Um dedo**: arrastar o mapa · **pinça**: zoom · **dois dedos**: girar e inclinar
- **Toque** numa unidade para selecionar; **toque duplo** pega todas do mesmo tipo na tela; **⬚ Área** para seleção em retângulo
- Com unidades selecionadas: toque no **chão** = mover, toque num **inimigo** = atacar
- Toque numa **estrutura** para produzir unidades
- **Cidades**: fique perto com tropas para capturar; cada cidade dá suprimentos por minuto
- Velocidade do tempo: ⏸ 1× 5× 20× 60× (a França é grande de verdade!)
- **🏙 Cidades 3D**: liga/desliga as cidades, casas e árvores em 3D
- PC: WASD move, Q/E gira, R/F zoom, roda do mouse = zoom, botão direito = girar/inclinar

## 🛠 Como foi feito / como modificar

```
frente-europa/
├── index.html, src/        jogo (JavaScript + Three.js)
│   ├── terreno.js          mapa da Europa: quadtree de tiles de satélite + relevo
│   ├── relevo.js           altitude real e detecção de mar/terra
│   ├── jogo.js             simulação: unidades, combate, transporte, cidades, produção
│   ├── ia.js               inteligência do inimigo
│   ├── piloto.js           modo piloto (batalha aérea)
│   ├── cidades3d.js        constrói prédios, casas e árvores a partir das fotos de satélite
│   ├── dados.js            unidades, estruturas, cidades reais, marcos e cenários (edite aqui!)
│   └── predios.js          prédios 3D do OpenStreetMap
├── blender/
│   ├── gerar_modelos.py    gera TODOS os modelos 3D no Blender
│   ├── frente_europa_modelos.blend   todos os modelos para editar
│   ├── previews/           renders de cada modelo (todos_os_modelos.jpg = todos juntos)
│   └── referencias/        coloque aqui fotos de referência (ex.: sherman.jpg)
├── public/models/*.glb     modelos usados pelo jogo
├── android/                projeto Android (WebView) que vira o APK
└── FrenteEuropa1944.apk    o APK pronto
```

### Rodar no PC
```bash
npm install
npm run dev        # abre em http://localhost:5173
```

### Refazer os modelos no Blender
```bash
blender -b -P blender/gerar_modelos.py        # com o Blender instalado
# ou: pip install bpy && python3 blender/gerar_modelos.py
```
Para refinar um modelo com uma foto da época, salve a foto em `blender/referencias/<nome>.jpg` (ex.: `sherman.jpg`, `p51.jpg`, `b17.jpg`) e rode o script: a foto aparece no `.blend` ao lado do modelo como imagem de referência. Fotos oficiais do Exército dos EUA da Segunda Guerra são de domínio público.

### Gerar o APK
```bash
npm run build
bash android/build.sh     # precisa do Android SDK (ANDROID_HOME) e JDK 17+
```
Quando o `FrenteEuropa1944.apk` novo é enviado ao GitHub, o workflow **"APK Frente Europa"** publica ele na Release `frente-europa-ultima`:
https://github.com/josearmandosouzaconrado-ctrl/J/releases/download/frente-europa-ultima/FrenteEuropa1944.apk

A chave de assinatura (`android/chave/frente-europa.jks`) não vai para o git, igual às outras chaves deste repositório. Sem ela o APK sai assinado com a chave de depuração, e aí o celular pede para desinstalar a versão antiga antes de instalar a nova.

## Créditos
- Imagens de satélite: **Esri, Maxar, Earthstar Geographics** (Esri World Imagery)
- Relevo: **Mapzen / AWS Terrain Tiles** (Terrarium)
- Prédios 3D: **© colaboradores do OpenStreetMap**
- Motor 3D: **Three.js** · Modelos: feitos do zero no **Blender** com script Python
