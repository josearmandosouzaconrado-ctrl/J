// Falas dos NPCs (curtas, para caber em cima da cabeça).
// Cada conversa é uma lista de [quem fala (0 ou 1), texto].

export const CONVERSAS = {
  soldado: [
    [[0, 'Viu os gauleses perto do rio?'], [1, 'Vi. Cabelos espetados e muito barulho.'],
      [0, 'Barulho não vence a disciplina.'], [1, 'Por Marte! Que venham.']],
    [[0, 'Esse scutum pesa como uma mula.'], [1, 'E salvou sua vida três vezes.'], [0, 'Quatro, se contar a da taverna.']],
    [[0, 'Quanto falta para o pagamento?'], [1, 'Duas semanas, se o centurião lembrar.'], [0, 'Ele nunca lembra.'], [1, 'Haha! Verdade.']],
    [[0, 'Sonhei com Roma ontem.'], [1, 'Com o fórum ou com a comida?'], [0, 'Com a comida, claro.']],
    [[0, 'O general nos olhou hoje.'], [1, 'Dizem que o Sistema o escolheu.'], [0, 'Seja quem for, luta bem.'], [1, 'Ave, General!']],
    [[0, 'Afiou o gládio?'], [1, 'Duas vezes. E o seu?'], [0, 'Uma. Sou mais confiante.'], [1, 'Ou mais preguiçoso.']],
    [[0, 'Esse forte ficou bonito.'], [1, 'Levantamos tudo em um dia.'], [0, 'A legião constrói como luta.']],
    [[0, 'Os germânicos usam peles de lobo.'], [1, 'E nós temos aço e escudos.'], [0, 'Eu queria a pele de lobo no inverno.']],
    [[0, 'Ouviu os arqueiros partos?'], [1, 'Atiram correndo, é o que dizem.'], [0, 'Então a gente corre mais.'], [1, 'De armadura? Boa sorte.']],
    [[0, 'Minha mãe me mandou uma carta.'], [1, 'O que ela disse?'], [0, 'Para eu comer direito.'], [1, 'Então vá pegar sopa.']],
  ],
  nobre: [
    [[0, 'Viste o tecido que chegou do Oriente?'], [1, 'Seda! Azul como o mar.'], [0, 'Quero uma stola dela.'], [1, 'Mamãe vai dizer que é caro.']],
    [[0, 'O banquete será amanhã.'], [1, 'Teremos uvas e mel?'], [0, 'E peixe com garum.'], [1, 'Que os deuses abençoem a cozinha.']],
    [[0, 'O General passou pela vila.'], [1, 'Dizem que veio de outro mundo.'], [0, 'Parece bem daqui, a meu ver.'], [1, 'Lívia! Que ousadia.']],
    [[0, 'Meu cabelo não para preso hoje.'], [1, 'Use a rede de ouro.'], [0, 'Boa ideia, irmã.']],
    [[0, 'Lemos poesia à tarde?'], [1, 'Ovídio, por favor.'], [0, 'Sempre Ovídio contigo.']],
    [[0, 'Ouviste falar dos bárbaros?'], [1, 'A legião vai nos proteger.'], [0, 'Os soldados são valentes.'], [1, 'E alguns bem bonitos.']],
    [[0, 'Vamos ao templo de Vesta?'], [1, 'Depois do almoço.'], [0, 'Levo flores para a deusa.']],
    [[0, 'Este colar era da vovó.'], [1, 'Combina com teus olhos.'], [0, 'Obrigada, prima querida.']],
  ],
  misto: [
    [[0, 'Salve, senhora. Tudo em paz?'], [1, 'Graças a vós, soldado.'], [0, 'É uma honra protegê-la.']],
    [[0, 'Senhora, não se afaste do forte.'], [1, 'Há bárbaros por perto?'], [0, 'Sempre há. Mas estamos aqui.']],
    [[0, 'Bela tarde, senhora.'], [1, 'Bela mesmo. Já comeste hoje?'], [0, 'Um pão duro, como sempre.'], [1, 'Mandarei uvas ao quartel.']],
    [[0, 'Precisa de escolta, senhora?'], [1, 'Só até o mercado.'], [0, 'Com prazer.']],
  ],
};

export const FALAS_NECESSIDADE = {
  fome: ['Estou faminto...', 'Meu estômago ronca.', 'Hora de comer alguma coisa.', 'Um pão cairia bem.'],
  sede: ['Que sede!', 'Preciso de água... ou vinho.', 'Minha garganta está seca.'],
  sono: ['Estou exausto...', 'Meus olhos estão fechando.', 'Preciso dormir um pouco.'],
  satisfeito: ['Ahh, agora sim!', 'Que delícia.', 'Pronto, revigorado.', 'Bem melhor.'],
  acordou: ['Bom dia!', 'Dormi como uma pedra.', 'Pronto para outra.'],
  resposta_fome: ['Tem sopa no caldeirão.', 'Pegue um pão na despensa.', 'Coma, antes que esfrie.'],
  resposta_sono: ['Vá descansar, eu vigio.', 'Durma, amanhã tem marcha.', 'Descanse, você merece.'],
};

export const SAUDACOES = {
  soldado: ['Ave, General!', 'Às suas ordens, General!', 'Por Roma, General!', 'Salve, comandante!'],
  nobre: ['Salve, General!', 'Que os deuses o protejam.', 'Bem-vindo, General.', 'Que honra recebê-lo!'],
};
