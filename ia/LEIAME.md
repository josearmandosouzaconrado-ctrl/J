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
