# 🧟 Miami: Surto Zumbi

**Regiões:** Miami 🌴, Interior da Flórida 🌾 (Homestead, fazendas e Everglades), São Francisco 🌉, Cidade do México 🇲🇽 e Sete Lagoas 🇧🇷 (MG) — cada uma em escala real, escolhida no menu inicial.

Jogo de **estratégia em tempo real 3D** para celular (Android) na **Miami de verdade, em tamanho real (1:1)**.
Um surto zumbi começa aos poucos no centro da cidade e se espalha pelas mordidas. Você comanda o Exército,
a Marinha e a Força Aérea dos EUA a partir de uma base militar no Porto de Miami e de um porta-aviões no mar
para conter a infecção e **resgatar os civis**.

## Baixar

- **APK (Android 7+):** [`MiamiSurtoZumbi.apk`](../MiamiSurtoZumbi.apk) na raiz do repositório.
  Depois que o GitHub Actions publicar: https://github.com/josearmandosouzaconrado-ctrl/J/releases/download/miami-v1.11.0/MiamiSurtoZumbi.apk
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

## Forças militares

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
- **Carcaças:** todo veículo terrestre destruído fica no lugar como carcaça queimada, pegando fogo e soltando fumaça,
  e some depois de alguns minutos.
- **Soldados entram** em veículos, helicópteros, barcos e no Osprey; o Chinook e o LCAC levam veículos.
- **Prédios:** soldados sobem no telhado de qualquer prédio e atiram de cima com mais alcance. Os zumbis
  forçam a entrada aos poucos (barra de integridade).
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
- **♾️ Modo Sandbox:** dinheiro infinito, produção rápida, sem derrota, com botões para criar hordas, pausar o
  surto e limpar os zumbis.
- **🔨 Construir bases** em qualquer lugar: posto avançado (FOB), quartel, pátio, heliporto, docas, zona segura,
  torre e barreiras. Cada base produz unidades ali mesmo.
- **🏕️ Sobreviventes:** civis que ninguém resgata se juntam, acham armas e montam acampamentos com barricadas;
  defendem-se sozinhos e aceitam o resgate quando suas tropas chegam. Com a cidade tomada, a polícia e a SWAT
  desistem e viram sobreviventes também.
- **🚓 Polícia SWAT:** quando o vírus aparece, equipes da SWAT saem das delegacias de Miami e de Miami Beach
  num blindado BearCat. Agem sozinhas: vão aos focos, combatem e levam civis para a zona segura.
- **🎮 Controlar:** assuma qualquer unidade em 3ª pessoa com o joystick.

## O surto

Começa com poucos casos na Bayside Marketplace. Novos focos aparecem em Brickell, Ocean Drive, Kaseya Center,
Little Havana... Civis mordidos viram zumbis (soldados também, fardados). Tiros e explosões atraem zumbis;
à noite eles ficam mais rápidos. No dia 2 chegam hordas do continente e zumbis corredores; no dia 3, brutamontes.

**Vitória:** resgatar a meta de civis (150 / 250 / 350 conforme a dificuldade) ou eliminar todos os zumbis.
**Derrota:** o Quartel-General ser destruído ou não restar nenhum civil.

## Controles

- Um dedo: arrastar a câmera • dois dedos: pinça (zoom), girar e inclinar.
- Toque numa unidade para selecionar; toque duplo pega todas do mesmo tipo; segure e arraste para seleção em caixa.
- Com unidades selecionadas: toque no chão (mover), num zumbi (atacar), num prédio (subir no telhado / resgatar SOS),
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
