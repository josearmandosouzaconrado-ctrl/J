# 🎖️ Frente Ocidental 1916

Jogo de tiro em primeira pessoa, em 3D, ambientado no **primeiro dia da Batalha do Somme (1º de julho de 1916)**.
Você é o soldado britânico Thomas Hale: ao som do apito, sai da trincheira, atravessa a terra de ninguém,
destrói o ninho de metralhadora, toma a trincheira alemã, sobrevive a um ataque de gás e segura a posição
até os reforços chegarem. A campanha tem começo, meio e fim, com tela de vitória, epílogo histórico e "FIM".

Feito com WebGL ([three.js](https://threejs.org), incluído em `lib/`). Terreno, modelos, texturas e sons são
gerados por código, sem nenhum arquivo de arte.

## Instalar no celular (Android)

1. Baixe o **[`FrenteOcidental1916.apk`](../FrenteOcidental1916.apk)** (na raiz do repositório).
2. Abra o arquivo no celular e permita "instalar apps de fontes desconhecidas".
3. O jogo abre em tela cheia, deitado. Use fones de ouvido.

Também roda no navegador do PC: abra `ww1/index.html`.

### Gerar o APK de novo

```
python3 android/build_apk.py --ww1
```

Só precisa de Python 3 e do pacote `cryptography`. O APK sai em `FrenteOcidental1916.apk`.
A chave de assinatura fica em `android/signing-ww1/key.pem` (fora do git). Se ela mudar, desinstale a versão
antiga antes de instalar a nova.

## Controles

**Celular**: joystick à esquerda (empurre até o fim para frente para correr); arraste à direita para olhar
(arrastar o dedo no botão ATIRAR também mira). Botões ATIRAR, MIRAR, RECARREGAR, GRANADA, BAIONETA, AGACHAR,
MÁSCARA (no ataque de gás) e II (pausa). O botão "voltar" do Android também pausa.

**PC**: WASD andar • Shift correr • mouse olhar (clique na tela) • clique atirar • botão direito mirar •
R recarregar • G granada • F baioneta • C agachar • M máscara • Esc pausa.

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
