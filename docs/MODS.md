# Como criar mods para Crônicas de Eldoria

Um mod é um arquivo **.js** que muda o jogo: cria itens e inimigos, reage ao que acontece no mundo, dá recompensas, mostra mensagens e diálogos, desenha coisas na tela e guarda os próprios dados.

## Instalar um mod

1. Na tela inicial (ou em **Opções** durante o jogo), toque em **🧩 Mods**.
2. Escolha uma das formas:
   - **📁 Escolher arquivo .js** — pega o arquivo do celular ou do computador;
   - **link** — cole o endereço `https://...` do arquivo e toque em **Baixar**;
   - **colar o código** — cole o texto do mod na caixa e toque em **Instalar o código colado**.
3. Toque em **🔄 Reabrir o jogo agora**. O mod começa a valer quando o jogo abre de novo (o progresso salvo não muda).

Na mesma tela dá para **ligar, desligar e remover** cada mod e usar os **botões** que o mod criar.
Se um mod quebrar o jogo, abra o endereço do jogo com `?semmods` no final para abrir sem nenhum mod e então desligue o mod com problema.

> Instale só mods de quem você confia: um mod roda dentro do jogo e pode mudar qualquer coisa nele.

## O mod mais simples

```js
Eldoria.registrar({
  id: 'meu_mod',            // identificador único (letras, números, _ e -)
  nome: 'Meu Primeiro Mod',
  versao: '1.0',
  autor: 'Seu nome',
  descricao: 'Dá um pão mágico quando você pede.',
  iniciar(api) {
    api.item('pao_magico', {
      name: 'Pão Mágico', type: 'food', use: { heal: 50 }, value: 30,
      icon: { k: 'bread', c: '#f0c040' }, desc: 'Cura 50 de vida.'
    });
    api.botao('Ganhar pão mágico', () => api.dar('pao_magico', 3));
  }
});
```

Tudo acontece dentro de `iniciar(api)`, que roda uma vez quando o jogo abre.

## Eventos — `api.ao(evento, função)`

| Evento | Quando acontece | Recebe |
|---|---|---|
| `quadro` | a cada quadro do jogo (~60 por segundo) | `dt` (segundos desde o último quadro) |
| `desenhar` | ao desenhar o mundo (por cima de tudo) | `ctx` (canvas 2D), `camX`, `camY` |
| `mundoPronto` | quando um jogo novo ou salvo termina de carregar | `mundo` |
| `diaNovo` | quando vira o dia no jogo | número do dia |
| `inimigoMorto` | quando um inimigo morre | `inimigo` (`inimigo.eid` é o tipo), `matador` |
| `falarNPC` | quando você fala com alguém | `npc` — retorne `true` para cuidar da conversa você mesmo |

Para desenhar no mundo, converta a posição: tela = posição no mundo − câmera.

```js
api.ao('desenhar', (ctx, camX, camY) => {
  const P = api.jogador();
  ctx.fillStyle = 'gold';
  ctx.fillText('Herói!', P.x - camX - 14, P.y - camY - 40);
});
```

## Funções da `api`

| Função | O que faz |
|---|---|
| `api.item(id, def)` | cria um item. Campos comuns: `name`, `type` (`food`, `potion`, `material`, `weapon`, `armor`...), `use` (`{ heal, mana, stam, buff }`), `value`, `stack`, `icon: { k, c }`, `desc` |
| `api.inimigo(id, def)` | cria um inimigo: `name`, `look` (aparência: `{ k: 'wolf'/'boar'/'bear'/'deer'/'spider'/'slime'/'hum'/'dragon'..., c: cor }`), `hp`, `dmg`, `spd`, `ai` (`melee`, `charge`, `ranged`, `caster`, `flee`, `boss`), `xp`, `gold: [min, max]`, `drops: [[item, chance]]` |
| `api.criar(idInimigo, x?, y?, nivel?)` | faz o inimigo aparecer (sem x/y: ao lado do jogador) |
| `api.dar(idItem, quantidade)` | põe itens na bolsa do jogador |
| `api.ouro(n)` | dá (ou tira, se negativo) ouro |
| `api.aviso(texto, cor?)` | mensagem rápida no canto da tela |
| `api.mensagem(titulo, subtitulo?)` | mensagem grande no meio da tela |
| `api.dialogo(titulo, texto, opcoes?)` | caixa de diálogo; `opcoes = [{ label: 'Sim', fn: () => ... }]` |
| `api.botao(rotulo, função)` | cria um botão do mod na tela 🧩 Mods |
| `api.jogador()` / `api.mundo()` | o jogador (x, y, hp, gold, level, inv...) e o mundo |
| `api.hora()` / `api.dia()` | hora do dia (0–24) e número do dia |
| `api.salvar(chave, valor)` / `api.ler(chave, padrao)` | guarda e lê dados do seu mod no aparelho |
| `api.jogo`, `api.ui`, `api.dados` | acesso total ao jogo (`Game`, `UI`) e às tabelas (`ITEMS`, `ENEMIES`, `REGIONS`, `RACES`, `SPAWNS`, `SPELLS`) para mods avançados |

## Exemplo completo

O arquivo [`mods/exemplo_vaca_dourada.js`](../mods/exemplo_vaca_dourada.js) cria o **Leite Dourado**, a **Vaca Brava**, dois botões e um presente a cada três dias. O mesmo mod pode ser instalado direto pelo botão **⭐ Instalar o mod de exemplo**.

## Dicas

- Use nomes de `id` únicos (por exemplo, comece com o nome do seu mod) para não colidir com o jogo ou com outros mods.
- Se o seu mod der erro 5 vezes no mesmo evento, o jogo desliga aquele evento e mostra o erro na tela 🧩 Mods.
- Para testar no computador, abra o console do navegador (F12): os erros dos mods aparecem lá com o nome `mod_<id>.js`.
