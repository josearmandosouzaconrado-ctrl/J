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

- Código do app: `ia/index.html`, `ia/style.css`, `ia/app.js` (sem dependências).
- Gerar o APK (sem Android SDK): `python3 android/build_apk_ia.py` → `NexoIA.apk`.
- Testar no PC: abra `ia/index.html` no Chrome iniciado com `--disable-web-security` (no APK isso é feito por `setAllowUniversalAccessFromFileURLs`).
