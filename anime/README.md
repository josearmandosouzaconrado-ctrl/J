# O Sistema de Eldoria — o anime

Anime original passado no mundo de **Crônicas de Eldoria**: uma Europa medieval de fantasia com
quatro continentes (Eldoria, Kaeloria, Valtheria e Elyndra) e treze raças. O protagonista,
Rafael "Rafa" Moreira, é um rapaz de São Paulo que é teleportado para esse mundo e ganha o
**Sistema do Viajante**: janelas azuis de status, habilidades únicas e missões.

## Episódio 1 — O Sistema Despertou (19 min)

| Arquivo | O que é |
|---|---|
| `episodio1_parte1.mp4` | 00:00–10:38 · prólogo, abertura, o Sistema, o mapa, as raças, a batalha contra os goblins |
| `episodio1_parte2.mp4` | 10:38–18:57 · Valdoria, a Guilda, a taverna, os vilões, o Rei Goblin, encerramento e prévia |
| `trilha/*.mp3` | as 7 músicas da trilha |
| `arte/*.jpg` | as 32 artes-chave do episódio |

O vídeo foi dividido em duas partes porque o GitHub não aceita arquivos acima de 100 MB.

### Capítulos

| Tempo | Cena |
|---|---|
| 00:00 | Prólogo: uma noite de chuva em São Paulo |
| 00:43 | A queda pelo portal |
| 01:06 | Abertura: "O Sistema de Eldoria" |
| 02:25 | Parte A: acordando em Eldoria, debaixo de duas luas |
| 02:59 | O Sistema: status, habilidades únicas e a missão principal |
| 04:07 | O mapa dos quatro continentes |
| 05:02 | Enciclopédia do Sistema: os reinos e as raças |
| 08:29 | Lyriel cercada pelos goblins |
| 09:24 | Lâmina do Viajante |
| 09:46 | Pôr do sol com Lyriel |
| 10:38 | Parte B: a capital Valdoria |
| 11:17 | Guilda dos Heróis e o Cristal da Aferição |
| 11:52 | Taverna do Javali Dourado: Borin e Mira |
| 13:05 | Duas luas |
| 13:41 | Os vilões: Lich Morvath e Vorthax, o Dragão do Fim |
| 14:16 | Parte C: a Caverna do Rei Goblin |
| 15:16 | Corte Celestial |
| 15:39 | Vitória |
| 16:15 | Rumo a Kaeloria |
| 16:53 | Encerramento: "Duas Luas" |
| 18:33 | Prévia do episódio 2 |

## Personagens

- **Rafa** — humano de outro mundo, o Viajante. Classe "???", Sorte 30.
- **Lyriel** — elfa arqueira de Sylvaris.
- **Borin Martelo-de-Brasa** — anão ferreiro de Khaz Durim.
- **Mira** — ladina felina do deserto de Zahrim.
- **Lich Morvath** — senhor das Terras Sombrias, já derrotado por um Viajante há mil anos.
- **Vorthax** — o Dragão do Fim.

## Como foi feito

- **Artes**: 32 cenas geradas no Figma (arquivo "Anime - O Sistema de Eldoria").
- **Música**: o tema de abertura foi composto em partitura ABC no plugin de partitura; as sete
  faixas estão em `ferramentas/musica.py`, que lê a notação ABC e sintetiza melodia, acordes,
  baixo, arpejo e bateria.
- **Teaser vertical (9:16, 17 s)**: montado e renderizado no Picsart (salvo no Picsart Drive).
- **Montagem**: `ferramentas/roteiro.py` tem o roteiro inteiro (falas, janelas do Sistema,
  câmera e efeitos de cada plano) e `ferramentas/render.py` monta o vídeo com Pillow e FFmpeg:
  câmera em movimento, partículas (chuva, brasas, pétalas, neve, vaga-lumes), linhas de
  velocidade, tremores, flashes, legendas com o nome de quem fala e as janelas do Sistema
  digitadas letra a letra, mais os efeitos sonoros.

### Gerar de novo

```bash
cd anime/ferramentas
python3 musica.py /tmp/anime/audio      # trilha (WAV)
python3 render.py /tmp/anime            # episódio completo em /tmp/anime/episodio1.mp4
python3 render.py /tmp/anime --tempos   # só lista os planos e os tempos
python3 render.py /tmp/anime --quadro 24 20   # salva um quadro de teste (plano 24, 20 s)
```

Precisa de Python 3 com `numpy` e `Pillow`, e do `ffmpeg`.
