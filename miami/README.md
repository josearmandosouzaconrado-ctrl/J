# ⚔️ Frente de Guerra

Jogo de **estratégia em tempo real 3D** para celular (Android) em **cidades de verdade, em tamanho real (1:1)**:
os **EUA contra a Rússia e a China**, que são aliadas. Antes chamado "Miami: Surto Zumbi".

**Regiões:** Miami 🌴, Interior da Flórida 🌾, São Francisco 🌉, Cidade do México 🇲🇽 e Sete Lagoas 🇧🇷 (MG).

## A guerra

- No menu inicial você escolhe o seu lado: 🇺🇸 **EUA**, 🇷🇺 **Rússia** ou 🇨🇳 **China**. As outras nações são
  comandadas pelo computador: cada uma tem a sua base (com bandeira), produz tropas e manda ondas de ataque.
  Jogando de Rússia ou China, a outra é sua aliada e luta ao seu lado.
- **Vitória:** destruir o Quartel-General de cada nação inimiga. **Derrota:** perder o seu QG.
- **Combate com blindagem:** fuzis e metralhadoras são bons contra soldados e quase não ferem tanques; os soldados
  levam lança-foguetes (AT4, RPG-7, PF-98) que só disparam contra veículos e helicópteros; canhões de tanque e
  artilharia não acertam aeronaves no ar; soldados em prédios ficam mais protegidos. Abater inimigos dá dinheiro.
- **Civis** fogem dos tiros, das explosões e das tropas inimigas, seguem as suas tropas e podem ser evacuados para a
  Zona Segura (+$40 cada). Soldados abatidos ficam caídos no chão por um tempo.

| Nação | Infantaria | Veículos | Helicópteros | Jatos |
|---|---|---|---|---|
| 🇺🇸 EUA | Soldado (M4A1 + AT4), metralhador, atirador, médico | Humvee, ambulância, Stryker, Bradley, Abrams, Paladin, HIMARS | Little Bird, Black Hawk, Seahawk, Chinook, Apache, drone Reaper | F-35C, F/A-18E, F-22, A-10 |
| 🇷🇺 Rússia | Soldado (AK-12 + RPG-7), metralhador (PKP), atirador (SVD), médico | GAZ Tigr, BTR-82A, BMP-3, T-90M | Ka-52 Alligator, Mi-8AMTSh | Su-57, Su-25 |
| 🇨🇳 China | Soldado (QBZ-191 + PF-98), metralhador, atirador (QBU-191), médico | Dongfeng Mengshi, ZBL-08, ZBD-04A, Type 99A | Z-10, Z-20 | J-20, J-16 |

- **Modelos feitos no Blender por código** (`ferramentas/leste/`): tanques T-90M e Type 99A e jatos Su-57 e J-20 com
  a pintura (camuflagem digital, sujeira e estrelas) assada numa textura, torre que gira, trem de pouso que recolhe e
  versão destruída queimada; soldados com as camuflagens OCP (EUA), EMR "tsifra" (Rússia) e Tipo 07 (China) e o
  capacete, colete, mochila e fuzil (M4A1, AK-12, QBZ-191) de cada exército. Os russos usam balaclava.
- Cada base do computador tem pista de pouso e baterias antiaéreas; a partir da 2ª onda o comandante junta dinheiro
  para jatos e os manda atacar as suas tropas. **Baterias antiaéreas** (Patriot / S-400 / HQ-9) derrubam jatos e
  helicópteros; só elas acertam jatos voando.
- Prédios e estruturas só cedem a explosões e canhões (metralhadoras quase não os ferem); o QG tem 12.000 de vida.
- Unidades paradas avançam sozinhas contra inimigos próximos. As ondas de ataque crescem aos poucos.
- Os EUA também têm a Marinha (docas, destróier, porta-aviões USS Enterprise); a marinha da Rússia e da China fica
  para a próxima etapa.

## Baixar

- **APK (Android 7+), sempre a versão mais nova:**
  https://github.com/josearmandosouzaconrado-ctrl/J/releases/download/miami-ultima/MiamiSurtoZumbi.apk
  (o GitHub publica sozinho a cada atualização; todas as versões ficam em
  https://github.com/josearmandosouzaconrado-ctrl/J/releases). Também fica em [`MiamiSurtoZumbi.apk`](../MiamiSurtoZumbi.apk) na raiz.
- No navegador: abra `miami/www/index.html` por um servidor web (ex.: `python3 -m http.server` dentro de `miami/www`).

O Android pede para permitir "instalar apps desconhecidos", porque o APK não vem da Play Store.

## O mapa

- Área de **≈ 9,2 × 5,3 km** em escala real: Downtown, Brickell, Bayside, Bayfront Park, Overtown, parte de
  Little Havana, PortMiami (Dodge Island), Watson Island, Venetian Islands, Star Island, South Beach
  (Ocean Drive, Lummus Park, South Pointe) e Fisher Island, com a Baía de Biscayne e o Atlântico.
- **4.868 prédios reais**, com o contorno tirado do mapa da Esri e altura estimada por bairro
  (arranha-céus em Downtown e Brickell, prédios art déco em tons pastel em South Beach, galpões no porto).
- Litoral, pontes (Port Blvd, MacArthur e Venetian Causeway), ruas, parques e praias também vêm do mapa.
- O chão é desenhado pelo jogo (asfalto, calçadas, estacionamentos, gramados, areia), sem fotos de satélite:
  os mapas de satélite servem só para saber onde ficam as ruas, os prédios e o litoral.
- Sombras do sol (prédios, árvores, veículos e soldados; aeronaves têm sombra no chão), luz de fim de tarde,
  mar verde-azulado com espuma nas ondas e arrebentação na costa.
- Casas com telhado de telha de duas águas, prédios de tijolo, faixas de pedestre nas esquinas, vagas pintadas
  nos estacionamentos e meio-fio.
- Porta-aviões **USS Enterprise (CVN-80, classe Ford)** com modelo 3D texturizado em escala real (333 m, convoo a
  22 m do mar): ilha a boreste, catapultas na proa, pista angulada com cabos de parada, elevadores e guarda-corpos.
  Os jatos decolam pela catapulta, pousam na pista angulada e estacionam a boreste; helicópteros e Ospreys pousam
  nas vagas da popa, cada um na sua. Jatos com chama do pós-combustor.
- Fachadas desenhadas em três estilos (torres de vidro, prédios de concreto, art déco em tons pastel), telhados com
  mureta e equipamentos, e janelas que acendem à noite.
- Palmeiras com cocos e árvores de copa larga em parques e calçadas, faixa amarela no meio das ruas,
  carros estacionados (os blindados amassam ao passar por cima), água animada e ciclo de dia e noite.
- Soldados com farda camuflada, colete, capacete com visão noturna, mochila e fuzil no ombro.
- Sons gerados pelo jogo: tiros em camadas com eco entre os prédios, canhões, explosões, rotores de
  helicóptero, ronco dos jatos e motores dos blindados.

## Forças militares dos EUA (detalhes)

| Onde | Unidades |
|---|---|
| 🪖 Quartel | Soldado (M4A1), Metralhador (M249), Atirador de elite (M110/Barrett), Médico de combate |
| 🚙 Pátio de veículos | Humvee M1151, Ambulância M997, Stryker M1126, Bradley M2A3, Tanque M1A2 Abrams, Obuseiro M109A7 Paladin, HIMARS M142 |
| 🚁 Heliporto | MH-6 Little Bird (soldados sentados nos bancos externos), UH-60 Black Hawk, SH-60B Seahawk, CH-47 Chinook, AH-64 Apache, drone MQ-9 Reaper |
| ⚓ Docas | Lancha Mark VI, hovercraft LCAC (anfíbio), destróier classe Arleigh Burke |
| 🛳️ Porta-aviões | F-35C Lightning II, F/A-18E Super Hornet, MV-22 Osprey, SH-60B Seahawk |
| 🛫 Pista de pouso (construída) | F-22 Raptor (bombas pequenas SDB), A-10 Thunderbolt II (canhão GAU-8 de 30 mm) |

- **Tanque M1A2 Abrams** com modelo 3D detalhado (metralhadoras, cestos de carga, grades, esteiras de elos), pintado
  no tan do deserto do Exército, com a torre girando. Quando é destruído, a munição explode e a torre é arremessada.
- **Helicópteros com modelo 3D texturizado:** SH-60B Seahawk da Marinha (cinza, metralhadora M240 na porta e mísseis
  Hellfire, leva 5) e CH-47 Chinook do Exército (verde-oliva "U.S. ARMY"), com os rotores girando de verdade
  (o Chinook com os dois rotores em sentidos opostos).
- **Casas modeladas no Blender:** casas de telha, casas com alpendre, sobrados de laje com caixa d'água e varanda,
  sobrados de telha, casas de teto plano (Flórida), lojas com toldo e letreiro e galpões, com molduras, peitoris,
  portas e sombra nos cantos. Cada construção retangular do mapa recebe o modelo que cabe nela, virada para a rua;
  fileiras compridas viram casas geminadas. Perto da câmera aparece o modelo detalhado, longe uma versão simples.
  As janelas acendem à noite. Gerado por `ferramentas/predios/kit.py`.
- **Prédios altos com fachadas feitas no Blender:** apartamentos com varandas, pele de vidro com montantes, art déco
  de Miami Beach com "sobrancelhas" e tijolo com vergas de pedra, modelados em 3D e fotografados com sombra de
  verdade (`ferramentas/predios/fachadas.py`), mais a versão com as janelas acesas para a noite.
- **Contornos retos:** nos mapas lidos da Esri (Miami, SF, México, Flórida) cada prédio vira o retângulo que o
  representa; prédios em L ou recortados viram até 6 blocos retos com alturas escalonadas.
- **Carcaças:** todo veículo terrestre destruído fica no lugar como carcaça queimada, pegando fogo e soltando fumaça,
  e some depois de alguns minutos.
- **Soldados entram** em veículos, helicópteros, barcos e no Osprey; o Chinook e o LCAC levam veículos.
- **Prédios:** soldados sobem no telhado de qualquer prédio e atiram de cima com mais alcance. Lá dentro
  eles ficam mais protegidos dos tiros.
- **Resgate:** civis seguem as tropas e embarcam sozinhos nos transportes. Prédios com **SOS** têm civis
  presos: as tropas os tiram pela porta e os helicópteros pelo telhado. Leve-os à **Zona Segura** da base
  ou ao porta-aviões.
- **Jatos** decolam pela catapulta do porta-aviões ou pela pista, com trem de pouso, pós-combustor e vórtices nas
  pontas das asas; voltam, fazem a aproximação alinhada, pousam e rearmam.
- **Bombardeio:** arraste o dedo no mapa para marcar a área de bombardeio; eles decolam do porta-aviões, fazem
  passadas soltando bombas ao longo da faixa e voltam para rearmar.
- **Soldados nas janelas:** parte da tropa fica nas janelas dos prédios (quebra o vidro e atira para fora) e
  parte no telhado.
- **🌾 Interior da Flórida:** mapa real (zoom 16, ~23 × 10 km) de Homestead, Florida City, fazendas de Redland,
  canais com pontes e a borda dos Everglades, com a base na Homestead Air Reserve Base. Placas nas rodovias que
  saem de Miami (US-41, US-1, SR-836) levam ao interior e vice-versa.
- **🇧🇷 Sete Lagoas (MG):** mapa real (~7,4 × 6,6 km) feito com os dados do OpenStreetMap: as lagoas (Paulino, Boa Vista,
  José Félix, Cercadinho…), as avenidas e ruas na largura certa, praças, a Catedral, a Prefeitura, o Shopping e o
  Terminal Urbano. Onde o OSM não tem as construções desenhadas, os quarteirões são preenchidos com casas de telha,
  sobrados e prédios de concreto (mais altos no Centro), com quintais de grama e terra vermelha. A base fica na Vila
  Militar e, sem mar, os jatos saem de uma pista de pouso.
- **🪢 Descida em corda (fast-rope):** Black Hawk, Chinook e Osprey param no ar e os soldados descem de corda,
  no chão ou direto num telhado.
- **♾️ Modo Sandbox:** dinheiro infinito, produção rápida, sem derrota, com botões para criar um ataque inimigo onde
  a câmera está, pausar os comandantes do computador e remover as tropas inimigas.
- **🔨 Construir bases** em qualquer lugar: posto avançado (FOB), quartel, pátio, heliporto, docas, zona segura,
  torre e barreiras. Cada base produz unidades ali mesmo.
- **🎮 Controlar:** assuma qualquer unidade em 3ª pessoa com o joystick.

## Controles

- Um dedo: arrastar a câmera • dois dedos: pinça (zoom), girar e inclinar.
- Toque numa unidade para selecionar; toque duplo pega todas do mesmo tipo; segure e arraste para seleção em caixa.
- Com unidades selecionadas: toque no chão (mover), numa unidade ou estrutura inimiga (atacar), num prédio (subir no telhado / resgatar SOS),
  num transporte (embarcar), no porta-aviões (pousar).
- PC: arrastar, roda do mouse, botão direito gira, WASD e Q/E, espaço pausa.

## Como gerar de novo

```bash
cd miami
npm install          # three.js e esbuild
npm run build        # gera www/jogo.js
cd ..
python3 android/build_apk.py --miami   # gera MiamiSurtoZumbi.apk (sem Android SDK)
```

A chave de assinatura fica em `android/signing_miami/key.pem` e **não vai para o repositório**. Guarde-a:
sem ela o Android não deixa atualizar o app por cima da versão instalada (é preciso desinstalar antes).

### Dados do mapa

**Sete Lagoas (OpenStreetMap):** exporte a área em https://www.openstreetmap.org/export (link "Overpass API") e rode:

```bash
cd miami/ferramentas
python3 osm_mapa.py setelagoas map.osm saida          # terreno, ruas, lagoas e prédios (+ casas geradas)
python3 gerar_mapa.py setelagoas saida/classes.npy ../www/mapas/setelagoas.js saida/predios.json
```

**Miami, São Francisco, Cidade do México e Flórida (Esri):**

`src/dados_mapa.js` foi gerado assim (precisa de acesso a `server.arcgisonline.com`):

```bash
cd miami/ferramentas
python3 baixar_tiles.py World_Topo_Map 17 25.752 -80.210 25.800 -80.118 topo17.png
python3 classificar.py topo17.png classes          # água, chão, ruas, parques, areia, prédios
python3 gerar_mapa.py miami classes.npy ../www/mapas/miami.js   # sf, mexico e florida: veja cidades.py
# interior da Flórida: baixar_tiles.py ... 16 ... e classificar.py topo16.png classes rural
python3 gerar_icone.py ..                          # ícone do app
```

## Créditos

Posição de prédios, ruas e litoral a partir de dados de mapa © Esri e da comunidade de usuários GIS.
Mapa de Sete Lagoas: © colaboradores do [OpenStreetMap](https://www.openstreetmap.org/copyright); os dados derivados em
`www/mapas/setelagoas.js` ficam sob a licença ODbL. Motor 3D: [three.js](https://threejs.org) (MIT).
Tanque M1 Abrams: modelo "M1 Abrams low poly" do [CGTrader](https://www.cgtrader.com/free-3d-models/military/military-vehicle/m1-abrams-low-poly)
(download gratuito, licença Royalty Free), convertido e pintado para o jogo com `ferramentas/abrams/exportar.py`;
o arquivo original não vai para o repositório.
Porta-aviões: modelo "USS Enterprise CVN-80 Aircraft Carrier" (Sketchfab), convertido com `ferramentas/porta/converter.py`
para `www/modelos/porta.js` (geometria e texturas embutidas).
Helicópteros: modelos "SH-60B Seahawk Helicopter" e "Boeing CH-47 Chinook Military Transport Aircraft", convertidos com
`ferramentas/helis/converter.py` para `www/modelos/helis.js`. Os demais modelos 3D, os sons e o código foram feitos para este jogo.
