# ✨ Nexo IA

App Android de chat com IA que **pesquisa sozinho** antes de responder:

| Onde pesquisa | Para quê |
|---|---|
| **Google** (pela busca do Gemini) — ou DuckDuckGo/Bing | notícias, datas de lançamento, temporadas novas, onde assistir |
| **YouTube** | trailers, aberturas, análises, teorias, músicas (aparecem como cartões: toque e abre no app do YouTube) |
| **MyAnimeList** (Jikan) | animes e mangás: nota, episódios, estúdio, sinopse, animes da temporada, rankings |
| **TVmaze** | séries: temporadas, último e próximo episódio com data, elenco, emissora |
| **Wikipédia** | qualquer assunto |
| **Ler página** | abre um link dos resultados e lê o texto inteiro |

## Instalar

Baixe o **`NexoIA.apk`** no celular e instale (permita "instalar apps de fontes desconhecidas").
Link fixo da versão mais nova:
https://github.com/josearmandosouzaconrado-ctrl/J/releases/download/nexo-ultima/NexoIA.apk

## Como saber qual atualização instalar

Cada versão tem um **número e um nome**, por exemplo **1.3.0 "Criador de Jogos"**.
- Dentro do app: ⚙ → **Versão e atualizações** mostra a sua versão. Quando sai uma nova, aparece no topo do chat o aviso **🎁 Atualização X — "Nome"** com o botão **⬇ Baixar e instalar**.
- No GitHub: a página https://github.com/josearmandosouzaconrado-ctrl/J/releases mostra cada versão com o nome. Baixe sempre o **NexoIA.apk** da release **"versão mais nova"**. Ele instala por cima, sem perder nada.

## Novidades da versão 1.5: "Jarvis Flutuante"

O Nexo agora é um **app Android nativo** (Java + WebView), compilado com o Android SDK oficial (`python3 android/build_nexo_nativo.py`).

- **Voz dentro do APK:** reconhecimento e fala do próprio Android. O 🎙️ e o 🎤 funcionam no app.
- **Assistente flutuante (bolha):** em ⚙ → **Assistente flutuante**, toque em **Ligar**. Aparece uma bolha com o gatinho por cima de qualquer app.
  - Com a **tela acesa**, fale o nome (ex.: **"Jarvis"**) e o painel abre por cima do app que você estiver usando.
  - Dá para falar junto: *"Jarvis, abre o Free Fire"*, *"Jarvis, quais jogos eu tenho?"*, *"Jarvis, que horas são?"*.
  - Toque na bolha para abrir ou fechar e **segure** para desligar. Arraste para mudar de lugar.
  - Com a tela apagada ele para de ouvir (economiza bateria). Uma notificação mostra que ele está ouvindo.
- **Apps e jogos:** ele vê os apps instalados, separa os jogos e abre qualquer um pelo nome (tolera nomes parecidos, como "free fire" para "Free Fire MAX").
- **Permissões** que o app pede: microfone, exibir sobre outros apps e notificações. No **Xiaomi/Redmi**, ative também (botão **🔧 Permissões do Xiaomi**): "Exibir janelas pop-up em segundo plano", "Início automático" e bateria "Sem restrições".

## Novidades da versão 1.4: "Assistente de Voz"

- **Nexo como site, sem instalar nada:** https://josearmandosouzaconrado-ctrl.github.io/J/ (abra no **Google Chrome**). No menu ⋮ do Chrome, toque em **"Adicionar à tela inicial"** para ele ganhar ícone.
- **Modo assistente (🎙️):** você fala, ele responde em voz alta e volta a ouvir, no estilo de um assistente pessoal. Diga "tchau" para sair e toque no círculo para interromper.
  - Em ⚙ → **Assistente de voz** dá para mudar o **nome** (ex.: Jarvis) e a **palavra para chamar**: com ela preenchida, ele só responde quando a frase começa com ela.
  - **🎤** dita uma frase no lugar de digitar.
- **Ações no celular:** "coloca um alarme às 7", "liga para…", "manda no WhatsApp…", "timer de 10 minutos", "abre no mapa…". Aparece um botão e você toca para confirmar (o celular não deixa um site fazer isso sozinho).
- A voz funciona **só no site pelo Chrome**. O APK não tem reconhecimento de voz (o Android não dá isso a um app feito como o Nexo).
- No site, a busca na internet usa a Wikipédia (e o Google, se você colocar a chave grátis do Gemini). A busca de vídeos mostra um botão para o YouTube, ou lista os vídeos se você colocar a chave da API do YouTube.

### Para o site funcionar (uma vez só)
No GitHub: **Settings → Pages → Build and deployment → Source: "Deploy from a branch" → Branch: `ccr-8adf1d6e-xt6jt2`, pasta `/docs` → Save.** Em 1 ou 2 minutos o site fica no endereço acima. (Se você já usa o GitHub Pages deste repositório para outro site, trocar a branch tira o outro do ar.)

## Novidades da versão 1.3: "Criador de Jogos"

- **Nexo Motor**: um motor de jogos próprio (pixel art, controles de toque, sons, partículas, colisões).
- **5 jogos prontos** feitos com ele: plataforma, nave, cobrinha, aventura com espada e corrida, com 8 temas de cores.
- **⚡ Criar jogo agora** (aba Jogos): escolha o tipo, o tema e os nomes. O jogo sai na hora, sem IA e sem esperar.
- **A IA própria cria jogos**: no Nexo Local, um pedido como "jogo em pixel art de ninja" vira um jogo completo (a IA escolhe o nome, os personagens e o tema). Para jogos diferentes, ela escreve o código, **testa sozinha** e corrige se der erro.
- **Teste automático igual ao do Claude Code**: todo jogo criado pela IA (local ou nuvem) roda escondido por 3 segundos. Se der erro de JavaScript, a IA recebe o erro e corrige.
- **Aba Animes refeita**: dados do AniList (com o MyAnimeList de reserva). Tem temporada, em alta, lançando, top, em breve, 18 gêneros, "carregar mais", próximo episódio com data, **link oficial de cada episódio** (Crunchyroll etc.) quando existe, parecidos, relacionados e capítulos lidos dos mangás.

## Novidades da versão 1.2: sem chave

- **Nexo Local** (padrão): uma IA que roda **dentro do celular**, sem chave, sem conta e sem pagar. Na primeira mensagem ele baixa o "cérebro" uma única vez (≈1,1 GB; use Wi-Fi) e guarda no aparelho. Se a internet cair, o download continua de onde parou. Depois funciona até sem internet.
  - Tamanhos em ⚙: **Leve** (≈0,5 GB, para celular fraco), **Equilibrado** (≈1,1 GB) e **Forte** (Qwen 3, ≈1,1 GB). Também aceita o link de qualquer modelo `.gguf`.
  - Antes de responder ele pesquisa sozinho na internet (DuckDuckGo/Bing) e no YouTube, sem chave.
  - Motor: llama.cpp em WebAssembly (biblioteca wllama, licença MIT). Modelos abertos Qwen (Apache 2.0).
- Quem estava num provedor sem chave passa automaticamente para o Nexo Local. Os outros provedores (Gemini, Claude Fable/Opus, ChatGPT, Grok, Groq…) continuam disponíveis para quem tiver chave.

**Sobre "criar um modelo igual ao Opus ou Fable do zero":** não é possível num app ou num computador comum. Esses modelos são treinados em milhares de placas de vídeo durante meses, com custo de centenas de milhões de dólares. Um modelo treinado do zero aqui sairia sem sentido. Por isso o Nexo Local usa um modelo aberto já treinado (Qwen) rodando no seu celular. Ele é seu e funciona sem chave, mas é bem mais simples que o Claude ou o Gemini.

## Novidades da versão 1.1

- **Logo nova** (gatinho com olhos de estrela).
- **Claude Fable 5.2 e Opus 5.5**: atalhos em ⚙ → Anthropic. A resposta aparece ao vivo, com ajuste de **esforço** (de "baixo" a "máximo") e troca automática de modelo se o Claude recusar.
- **Criador de jogos**: peça *"crie um jogo de…"*. A IA escreve o jogo inteiro (HTML5 para celular), ele aparece num cartão e na aba **Jogos**. Lá você **joga na hora**, pede melhorias e toca em **📦 APK**. O próprio app monta e assina o APK no celular, envia para o repositório `nexo-jogos` no seu GitHub e mostra o botão **⬇ Baixar APK**.
- **Plugin do GitHub**: com um token, a IA lista seus repositórios, lê arquivos, salva arquivos (commit) e abre issues. Ela pede sua confirmação antes de gravar.
- **Plugins MCP**: conecte qualquer servidor MCP (GitHub oficial e Figma já vêm prontos; "Outro" aceita qualquer endereço e token). Funciona com o Claude.
- **Aba Animes**: temporada atual, em exibição, top, em breve e busca de animes e mangás. O detalhe mostra a nota, o estúdio, a sinopse, as aberturas, as continuações e **todos os episódios**: título, data, filler/recap, botão para marcar como visto (com barra de progresso) e busca do episódio no YouTube. Também tem os links **oficiais** de onde assistir ou ler e a **Minha lista** de favoritos.

### Sobre os plugins do Claude.ai
Os conectores que você usa dentro do Claude (Docs, Figma, Picsart, partituras, GitHub) ficam presos à sua conta do claude.ai e não podem ser copiados para outro app. No Nexo você adiciona cada serviço pelo **endereço MCP + token** dele (ou pelo plugin do GitHub nativo).

### Sobre "todos os episódios"
O app lista todos os episódios e leva até onde assistir **oficialmente** (Crunchyroll, Netflix e outros cadastrados no MyAnimeList) ou procura no YouTube. Ele não embute sites piratas de streaming.

## Primeiro uso: escolher o "cérebro"

O app não tem um modelo de IA dentro dele (um modelo bom tem dezenas de GB). Ele usa o modelo que você escolher, com a sua chave:

- **Google Gemini — grátis.** Entre em https://aistudio.google.com/apikey, toque em *Create API key*, copie e cole em ⚙ → Chave da API. Essa chave também liga a **pesquisa no Google**.
- **Groq — grátis**, muito rápido (modelos abertos): https://console.groq.com/keys
- **OpenRouter** — um só lugar para GPT, Claude, Grok, Llama, DeepSeek, Qwen, Mistral e modelos abertos (alguns grátis).
- **OpenAI (ChatGPT)**, **Anthropic (Claude)**, **xAI (Grok)**, **DeepSeek** — pagos.
- **Modelo no seu PC** (Ollama ou LM Studio) — escolha "Outro" e coloque o IP do PC na rede Wi-Fi, ex.: `http://192.168.0.10:11434/v1`.

Em ⚙ o botão **Listar** mostra todos os modelos que a sua chave pode usar.

## Modo livre

Ligado por padrão. A IA conversa como um adulto: fala abertamente de violência, gore, terror e temas maduros das obras, sem sermão e sem avisos desnecessários. No Gemini ele também desliga os filtros ajustáveis do Google.
Os provedores ainda aplicam as próprias regras deles; quem quiser o mínimo de restrição pode usar um modelo aberto (Groq, OpenRouter ou no próprio PC).

## Outros recursos

- Várias conversas salvas no celular (☰), com apagar.
- **Refazer** e **Copiar** em cada resposta; botão ■ para parar.
- Spoilers escondidos `||assim||` (toque para ver).
- Instruções de personalidade (ex.: "fale como um otaku sarcástico").
- As chaves ficam só no celular e vão direto para o provedor escolhido.

## Para desenvolvedores

- Código do app: `ia/index.html`, `ia/style.css`, `ia/app.js` (chat, IA e plugins), `ia/animes.js`, `ia/jogos.js` e `ia/apk.js` (gera e assina APKs dentro do app; produz exatamente os mesmos bytes que `android/build_apk_ia.py`).
- Gerar o APK (sem Android SDK): `python3 android/build_apk_ia.py` → `NexoIA.apk`.
- Testar no PC: abra `ia/index.html` no Chrome iniciado com `--disable-web-security` (no APK isso é feito por `setAllowUniversalAccessFromFileURLs`).
