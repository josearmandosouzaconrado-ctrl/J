"""Roteiro do Episódio 1 de "O Sistema de Eldoria".

Cada cena (plano) tem:
  img     arquivo em anime/arte (sem extensão) ou None (fundo preto)
  dur     duração mínima em segundos (cresce se as falas precisarem)
  cam     quadros-chave da câmera [(fração, cx, cy, zoom)]; zoom 1 = imagem inteira
  fx      efeitos: brilho, chuva, brasas, petalas, neve, vagalumes, poeira,
          velocidade, glitch, escuro, desfoque, ouro
  musica  faixa que começa nesta cena ('-' = silêncio, None = continua)
  itens   linha do tempo da cena, em ordem:
          ("fala", quem, texto)        legenda com nome colorido
          ("narra", texto)             narração em itálico
          ("sis", titulo, [linhas])    janela azul do Sistema
          ("alerta", titulo, [linhas]) janela vermelha do Sistema
          ("local", nome, sub)         legenda de lugar (não espera)
          ("titulo", texto, sub)       título grande no centro
          ("flash",) ("tremor", s, amp) ("sfx", nome) ("pausa", s)
"""

C = lambda cx, cy, z: (cx, cy, z)  # noqa: E731


def cam(*kf):
    """cam((0, cx, cy, z), (1, cx, cy, z), ...)"""
    return list(kf)


ZOOM_IN = cam((0, .5, .5, 1.0), (1, .5, .5, 0.82))
ZOOM_OUT = cam((0, .5, .5, 0.8), (1, .5, .5, 1.0))
PAN_D = cam((0, .42, .5, 0.85), (1, .58, .5, 0.85))
PAN_E = cam((0, .58, .5, 0.85), (1, .42, .5, 0.85))

FPS = 24
BATIDA = 60 / 132  # andamento da abertura
OP_CORTE = BATIDA * 8  # um corte a cada 2 compassos

CENAS = []


def cena(img, dur=4, cam=ZOOM_IN, fx=(), musica=None, itens=(), fade=(0.0, 0.0), vol=1.0):
    CENAS.append(dict(img=img, dur=dur, cam=cam, fx=list(fx), musica=musica,
                      itens=list(itens), fade=fade, vol=vol))


# ============================================================ PRÓLOGO
cena("01_cidade", 10, cam((0, .5, .5, 1.0), (1, .32, .55, 0.62)), ["chuva"], "encerramento", vol=0.55,
     fade=(1.5, 0), itens=[
         ("pausa", 1.5),
         ("local", "SÃO PAULO", "Terra — quinta-feira, 23h47"),
         ("narra", "Meu nome é Rafael Moreira. Vinte anos. Dois empregos... e nenhum sonho."),
         ("narra", "Todo dia é igual: ônibus lotado, chefe gritando, contas chegando no fim do mês."),
         ("narra", "Às vezes eu penso: se existisse um botão de \"recomeçar\", eu apertaria sem pensar duas vezes."),
         ("fala", "Rafa", "Mais um dia de chuva... mais um dia igual."),
         ("narra", "Foi aí que o meu celular vibrou."),
         ("sfx", "ding"),
         ("sis", "MENSAGEM DESCONHECIDA", ["Você deseja recomeçar a sua vida?", "", "      [ SIM ]          [ NÃO ]"]),
         ("fala", "Rafa", "Que propaganda esquisita... Tá. Sim. Por que não?"),
         ("flash",), ("pausa", 0.6),
     ])
cena("02_queda", 8, cam((0, .5, .45, 0.7), (1, .5, .5, 1.0)), ["glitch", "brilho", "velocidade"], "-",
     itens=[
         ("sfx", "vento"), ("tremor", 3, 10),
         ("fala", "Rafa", "AAAAAHHH!! O chão sumiu?!"),
         ("sis", "SISTEMA", ["Transferência dimensional iniciada...", "Origem: Terra", "Destino: Mundo de Eldoria",
                             "Sincronizando alma... 100%"]),
         ("fala", "Rafa", "Eldoria?! Que lugar é esse?! Alguém me ajuda!"),
         ("sis", "SISTEMA", ["Bem-vindo, Viajante.", "A sua nova vida começa agora."]),
         ("flash",), ("pausa", 0.5),
     ], fade=(0, 0.8))

# ============================================================ ABERTURA
OP = [
    ("00_poster", ["brilho"], cam((0, .5, .55, 0.7), (1, .5, .5, 1.0))),
    ("05_mapa", [], cam((0, .3, .35, 0.6), (1, .7, .6, 0.6))),
    ("06_valdoria", [], PAN_D),
    ("07_sylvaris", ["vagalumes"], ZOOM_IN),
    ("08_khazdurim", ["brasas"], PAN_E),
    ("15_nordheim", ["neve"], ZOOM_OUT),
    ("09_gorthak", ["poeira"], PAN_D),
    ("10_zahrim", [], PAN_E),
    ("30_ssarak", ["vagalumes"], ZOOM_IN),
    ("11_talassa", [], PAN_D),
    ("12_shirokai", ["petalas"], ZOOM_OUT),
    ("13_azhkar", ["brasas"], PAN_E),
    ("14_aurelion", [], PAN_D),
    ("16_goblins", [], ZOOM_IN),
    ("18_corte", ["velocidade", "brilho"], ZOOM_OUT),
    ("24_lich", [], ZOOM_IN),
    ("25_dragao", ["brasas"], PAN_D),
    ("27_rei_goblin", ["poeira"], ZOOM_OUT),
    ("28_lamina", ["brilho", "velocidade"], ZOOM_IN),
    ("00_poster", ["brilho"], cam((0, .5, .5, 0.85), (1, .5, .5, 1.0))),
]
CREDITOS_OP = {
    0: ("titulo", "O SISTEMA DE ELDORIA", "Crônicas de Eldoria — o anime"),
    2: ("credito", "Roteiro e mundo", "Crônicas de Eldoria"),
    5: ("credito", "Artes-chave", "geradas no Figma"),
    8: ("credito", "Música", "tema original composto em partitura ABC"),
    11: ("credito", "Personagens", "Rafa • Lyriel • Borin • Mira"),
    14: ("credito", "Vilões", "Lich Morvath • Vorthax, o Dragão do Fim"),
    19: ("titulo", "O SISTEMA DE ELDORIA", ""),
}
for i, (img, fx, cm) in enumerate(OP):
    itens = []
    if i in CREDITOS_OP:
        itens.append(CREDITOS_OP[i])
    if i in (14, 18):
        itens = [("flash",)] + itens
    cena(img, OP_CORTE, cm, fx, "abertura" if i == 0 else None, itens=itens,
         fade=(0.6 if i == 0 else 0, 1.0 if i == len(OP) - 1 else 0))

cena("04_sistema", 6, cam((0, .5, .5, 1.0), (1, .5, .5, 0.92)), ["escuro", "desfoque", "brilho"], "-",
     fade=(0.8, 0.8), itens=[("titulo", "EPISÓDIO 1", "O Sistema Despertou"), ("sfx", "ding"), ("pausa", 5)])

# ============================================================ PARTE A
cena("03_prado", 8, cam((0, .3, .55, 0.6), (0.55, .35, .5, 0.75), (1, .55, .45, 1.0)), [], "calmo", fade=(1.2, 0),
     itens=[
         ("local", "ARREDORES DE VALDORIA", "Continente de Eldoria"),
         ("pausa", 1),
         ("fala", "Rafa", "Hm... onde... onde eu tô?"),
         ("fala", "Rafa", "Grama? Céu azul? Eu tava na avenida agora mesmo..."),
         ("fala", "Rafa", "E aquilo ali é... um castelo?! E por que tem DUAS luas no céu?!"),
         ("narra", "Nenhum prédio. Nenhum carro. Só moinhos de vento, um castelo de pedra e um silêncio que eu nunca tinha ouvido na vida."),
         ("fala", "Rafa", "Calma, Rafa. Respira. Deve ser um sonho. Um sonho muito realista..."),
         ("sfx", "impacto_leve"),
         ("fala", "Rafa", "Ai! Beliscão dói. Não é sonho."),
     ])
cena("04_sistema", 8, cam((0, .4, .45, 0.75), (0.5, .45, .45, 0.65), (1, .6, .5, 0.8)), ["brilho"], None, itens=[
    ("sis", "SISTEMA", ["Inicialização concluída.", "Usuário: Rafael Moreira", "Bem-vindo ao Sistema do Viajante."]),
    ("fala", "Rafa", "Uma janela... flutuando na minha frente? Igualzinho a um jogo?!"),
    ("fala", "Rafa", "Será que... Status?"),
    ("sis", "STATUS", ["Nome: Rafael Moreira", "Raça: Humano (Outro Mundo)", "Classe: ???  (não despertada)",
                       "Nível: 1        EXP: 0 / 100", "HP: 120     MP: 45",
                       "FOR 8   AGI 9   INT 14   SORTE 30"]),
    ("fala", "Rafa", "Sorte 30?! Pelo menos alguma coisa boa nessa vida..."),
    ("sis", "HABILIDADES ÚNICAS", ["[Olhos do Sistema]  analisa pessoas, monstros e itens",
                                   "[Inventário Infinito]  guarda qualquer coisa",
                                   "[Crescimento do Viajante]  EXP em dobro",
                                   "[ ? ? ? ]  bloqueada"]),
    ("fala", "Rafa", "Inventário infinito e EXP em dobro... isso é praticamente trapaça!"),
    ("sis", "MISSÃO PRINCIPAL", ["Sobreviva ao seu primeiro dia em Eldoria.", "Recompensa: ???", "Em caso de falha: ..."]),
    ("fala", "Rafa", "\"Em caso de falha: três pontinhos\"? Que jeito tranquilizador de terminar uma frase."),
])

# ---- o mapa do mundo
cena("05_mapa", 6, cam((0, .5, .5, 1.0), (1, .5, .5, 0.9)), [], None, itens=[
    ("sis", "MAPA-MÚNDI DESBLOQUEADO", ["Analisando o mundo...", "4 continentes  •  13 raças  •  21 reinos"]),
    ("narra", "O Sistema me mostrou o mundo inteiro. E ele era muito, muito maior do que eu imaginava."),
])
cena("05_mapa", 5, cam((0, .45, .45, 0.8), (1, .28, .3, 0.45)), [], None, itens=[
    ("local", "ELDORIA", "O continente central — o lugar onde eu caí"),
    ("narra", "Eldoria: humanos, elfos, anões, orcs, felinos, nórdicos e draconatos. Nove reinos que vivem em guerra e em paz, quase sempre ao mesmo tempo."),
])
cena("05_mapa", 5, cam((0, .3, .3, 0.45), (1, .55, .3, 0.45)), [], None, itens=[
    ("local", "KAELORIA", "Além do Mar das Brumas"),
    ("narra", "A leste, depois do Mar das Brumas, fica Kaeloria: terra dos tritões, dos tieflings de chifres e das kitsunes de muitas caudas."),
])
cena("05_mapa", 5, cam((0, .55, .3, 0.45), (1, .45, .7, 0.5)), [], None, itens=[
    ("local", "VALTHERIA", "O Grande Continente, ao sul"),
    ("narra", "Ao sul, Valtheria, o Grande Continente: impérios de mármore, gigantes, gnomos inventores... e fábricas a vapor."),
])
cena("05_mapa", 5, cam((0, .45, .7, 0.5), (1, .82, .45, 0.45)), [], None, itens=[
    ("local", "ELYNDRA", "O continente do leste — inexplorado"),
    ("narra", "E bem longe, no leste, Elyndra. O maior de todos. Ninguém que foi até lá voltou para contar."),
    ("fala", "Rafa", "Quatro continentes... e eu nem sei andar a cavalo."),
])

# ---- as raças (Enciclopédia do Sistema)
RACAS = [
    ("06_valdoria", [], PAN_D, "VALDORIA", "Reino Humano — Eldoria", "ENCICLOPÉDIA: HUMANOS",
     ["Talento: comércio, ordem e cavalaria", "Exército: cavaleiros de bandeira azul", "Força: equilibrada em tudo"],
     "Os humanos de Valdoria: cavaleiros, mercadores e reis que adoram uma guerra."),
    ("07_sylvaris", ["vagalumes"], ZOOM_IN, "SYLVARIS", "Floresta Élfica — Eldoria", "ENCICLOPÉDIA: ELFOS",
     ["Vivem mais de mil anos", "Mestres do arco e da magia natural", "Desconfiam de forasteiros"],
     "Os elfos de Sylvaris constroem cidades em árvores mais antigas que qualquer reino."),
    ("08_khazdurim", ["brasas"], PAN_E, "KHAZ DURIM", "Montanhas Anãs — Eldoria", "ENCICLOPÉDIA: ANÕES",
     ["Ferreiros lendários", "Resistentes a fogo e veneno", "Nunca esquecem uma dívida"],
     "Os anões de Khaz Durim. Dizem que uma espada anã atravessa até escama de dragão."),
    ("15_nordheim", ["neve"], ZOOM_OUT, "NORDHEIM", "Terras Geladas — Eldoria", "ENCICLOPÉDIA: NÓRDICOS",
     ["Guerreiros do gelo", "Navegam em drakkars de escudos", "Imunes ao frio"],
     "Os nórdicos atravessam mares congelados só para provar quem bebe mais hidromel."),
    ("09_gorthak", ["poeira"], PAN_D, "GOR'THAK", "Ermos Orcs — Eldoria", "ENCICLOPÉDIA: ORCS",
     ["Força bruta incomparável", "Hordas montadas em lobos gigantes", "Respeitam apenas quem os vence"],
     "As hordas de Gor'Thak. O Sistema pintou esse lugar de vermelho no mapa. Melhor não ir lá tão cedo."),
    ("10_zahrim", [], PAN_E, "ZAHRIM", "Deserto Felino — Eldoria", "ENCICLOPÉDIA: FELINOS",
     ["Agilidade e reflexos sobre-humanos", "Mercadores de caravanas", "Ladinos muito habilidosos"],
     "Os felinos de Zahrim: rápidos, espertos, e ótimos em fazer a sua bolsa de moedas desaparecer."),
    ("30_ssarak", ["vagalumes"], ZOOM_IN, "SSARAK", "Pântanos Draconatos — Eldoria", "ENCICLOPÉDIA: DRACONATOS",
     ["Descendentes dos dragões", "Escamas duras como aço", "Sopro elemental"],
     "Os draconatos de Ssarak contam que, um dia, os dragões foram os seus reis."),
    ("11_talassa", [], PAN_D, "TALASSA", "Reino dos Tritões — Kaeloria", "ENCICLOPÉDIA: TRITÕES",
     ["Respiram debaixo d'água", "Cidades brancas de cúpulas azuis", "Senhores das rotas do mar"],
     "Em Kaeloria, os tritões de Talassa controlam todos os portos. Sem eles, ninguém atravessa o oceano."),
    ("12_shirokai", ["petalas"], ZOOM_OUT, "SHIROKAI", "Reino Kitsune — Kaeloria", "ENCICLOPÉDIA: KITSUNES",
     ["Raposas de muitas caudas", "Ilusões e fogo-raposa", "Quanto mais caudas, mais poder"],
     "As kitsunes de Shirokai guardam templos sob cerejeiras que florescem o ano inteiro."),
    ("13_azhkar", ["brasas"], PAN_E, "AZHKAR", "Império Tiefling — Kaeloria", "ENCICLOPÉDIA: TIEFLINGS",
     ["Sangue de origem infernal", "Magia de fogo e de sombra", "Fortalezas entre rios de lava"],
     "E o Império de Azhkar, dos tieflings. Chifres, olhos brilhando e um imperador que ninguém nunca viu sorrir."),
    ("14_aurelion", [], PAN_D, "AURÉLION", "Império de Mármore — Valtheria", "ENCICLOPÉDIA: IMPÉRIO",
     ["Legiões e mosqueteiros arcanos", "Revolução industrial a vapor", "Trens, dirigíveis e fábricas"],
     "No Grande Continente, Aurélion já tem trens e dirigíveis. Um mundo medieval... que está começando a mudar."),
]
for img, fx, cm, lugar, sub, tit, linhas, narr in RACAS:
    it = [("local", lugar, sub), ("pausa", 0.8), ("sis", tit, linhas), ("narra", narr)]
    if img == "09_gorthak":
        it.append(("alerta", "AVISO", ["Nível recomendado: 25 ou mais", "Seu nível: 1"]))
    cena(img, 9, cm, fx, None, itens=it)

cena("03_prado", 5, cam((0, .5, .5, 0.85), (1, .3, .55, 0.6)), [], None, itens=[
    ("fala", "Rafa", "Treze raças, quatro continentes... Tá bom, Sistema. Por onde eu começo?"),
    ("sis", "MISSÃO", ["Vá até a capital Valdoria.", "Distância: 3 km ao norte."]),
    ("fala", "Rafa", "Três quilômetros a pé. Igualzinho à minha vida antiga."),
    ("sfx", "grito"),
    ("fala", "???", "Socorro! Alguém!"),
    ("fala", "Rafa", "Uma voz... vindo da floresta!"),
])

# ============================================================ BATALHA NA FLORESTA
cena("16_goblins", 6, cam((0, .5, .5, 1.0), (0.5, .5, .45, 0.7), (1, .55, .4, 0.6)), [], "batalha", itens=[
    ("fala", "Goblin", "Grrah! Elfa sozinha! Orelha pontuda vale muita moeda!"),
    ("fala", "Lyriel", "Afastem-se, criaturas imundas! Eu não vou avisar de novo!"),
    ("sis", "[OLHOS DO SISTEMA]", ["Goblin  Nv. 3   × 5", "Elfa: Lyriel de Sylvaris  Nv. 12", "Flechas restantes: 1"]),
    ("fala", "Rafa", "Uma flecha só contra cinco?! Ela não vai conseguir!"),
    ("narra", "Eu podia fugir. Ninguém ia ficar sabendo. Mas, pela primeira vez na vida..."),
])
cena("17_salto", 5, cam((0, .5, .6, 0.6), (1, .5, .5, 1.0)), ["velocidade"], None, itens=[
    ("sfx", "whoosh"), ("tremor", 0.6, 8),
    ("fala", "Rafa", "Ei, seus feiosos! Aqui!"),
    ("sis", "MISSÃO DE EMERGÊNCIA", ["Proteja a elfa Lyriel.", "Inimigos: 5", "Recompensa: Habilidade de Classe"]),
    ("fala", "Lyriel", "Um humano?! Você está desarmado, seu idiota!"),
    ("fala", "Rafa", "Não tô desarmado! Eu tenho... esta espada enferrujada que achei no mato!"),
    ("fala", "Goblin", "Hahaha! Mata o humano primeiro!"),
])
cena("18_corte", 6, cam((0, .55, .45, 0.6), (1, .5, .5, 1.0)), ["brilho", "velocidade"], None, itens=[
    ("sis", "HABILIDADE DESPERTADA", ["[Lâmina do Viajante]  Nv. 1", "Concentra mana na lâmina e corta tudo à frente."]),
    ("fala", "Rafa", "Sei lá o que eu tô fazendo... mas VAI! LÂMINA DO VIAJANTE!!"),
    ("sfx", "corte"), ("flash",), ("tremor", 1.0, 16),
    ("fala", "Goblin", "Gyaaaah!!"),
    ("pausa", 0.8),
    ("sis", "BATALHA VENCIDA", ["Goblins derrotados: 5", "EXP +250  (bônus ×2)", "NÍVEL 1  →  3 !"]),
    ("sfx", "levelup"),
])
cena("19_por_do_sol", 8, cam((0, .5, .5, 1.0), (0.4, .35, .5, 0.6), (0.7, .6, .45, 0.6), (1, .5, .5, 0.9)), ["vagalumes"],
     "encerramento", vol=0.7, itens=[
         ("fala", "Lyriel", "...Você é o humano mais imprudente que eu já conheci."),
         ("fala", "Rafa", "De nada. Eu acho."),
         ("fala", "Lyriel", "Lyriel, arqueira de Sylvaris. Eu te devo a vida... então, obrigada."),
         ("fala", "Rafa", "Rafael. Pode me chamar de Rafa. Eu sou de... bem longe daqui."),
         ("fala", "Lyriel", "Suas roupas são estranhas. E aquela luz azul na sua espada... não era magia comum."),
         ("fala", "Rafa", "Se eu disser que uma janela flutuante conversa comigo, você acredita?"),
         ("fala", "Lyriel", "...Vamos para Valdoria. Lá você explica isso para alguém que entenda de loucura."),
         ("sis", "NOVO ALIADO", ["Lyriel de Sylvaris entrou no grupo.", "Afinidade: +10"]),
     ])

# ============================================================ INTERVALO
cena("00_poster", 6, cam((0, .5, .5, 0.9), (1, .5, .5, 1.0)), ["brilho", "ouro"], "vitoria", fade=(0.5, 0.5), itens=[
    ("titulo", "O SISTEMA DE ELDORIA", "intervalo"), ("pausa", 5)])

# ============================================================ PARTE B — VALDORIA
cena("20_portao", 7, cam((0, .5, .5, 1.0), (1, .62, .45, 0.75)), [], "calmo", fade=(0.6, 0), itens=[
    ("local", "VALDORIA", "Capital do Reino Humano"),
    ("fala", "Guarda", "Alto! Documentos... ou duas moedas de prata de taxa de entrada."),
    ("fala", "Rafa", "Documentos... é... aceita Pix?"),
    ("fala", "Lyriel", "Eu pago. Considere a primeira parte da minha dívida."),
    ("narra", "A cidade parecia um livro de história, só que viva: barulhenta, cheirando a pão quente e a cavalo."),
])
cena("06_valdoria", 6, cam((0, .3, .55, 0.6), (1, .7, .5, 0.6)), [], None, itens=[
    ("fala", "Rafa", "Tem anão, tem elfo, gente com orelha de gato... é um festival de cosplay que nunca acaba!"),
    ("fala", "Lyriel", "Cos... o quê?"),
    ("fala", "Rafa", "Nada não. Coisa da minha terra."),
])
cena("22_guilda", 8, cam((0, .5, .5, 1.0), (0.6, .45, .55, 0.7), (1, .55, .6, 0.55)), ["brilho"], None, itens=[
    ("local", "GUILDA DOS HERÓIS", "Sede de Valdoria"),
    ("fala", "Elsa", "Bem-vindo à Guilda dos Heróis! Coloque a mão no Cristal da Aferição, por favor."),
    ("sfx", "magia"), ("tremor", 1.5, 5), ("flash",),
    ("fala", "Elsa", "E-esse brilho... o cristal nunca ficou tão azul!"),
    ("sis", "CRISTAL DA AFERIÇÃO", ["Classe: ???  —  ERRO", "Mana: fora da escala", "Origem: desconhecida"]),
    ("fala", "Elsa", "Classe desconhecida... Pelo regulamento você começa no Rank F, mas... quem é você?"),
    ("fala", "Rafa", "Só um cara que perdeu o ônibus. Perdeu feio."),
    ("sis", "TÍTULO OBTIDO", ["[Aventureiro Rank F]", "Missões da guilda liberadas."]),
])
cena("21_taverna", 10, cam((0, .5, .5, 1.0), (0.25, .7, .45, 0.6), (0.5, .85, .5, 0.55), (0.75, .3, .5, 0.6),
                             (1, .5, .5, 0.95)), [], "taverna", itens=[
    ("local", "TAVERNA DO JAVALI DOURADO", "Valdoria, à noite"),
    ("fala", "Borin", "HAH! Então foi você que fez o cristal da guilda brilhar feito farol? Senta aí, rapaz!"),
    ("fala", "Lyriel", "Rafa, esse é Borin Martelo-de-Brasa, ferreiro de Khaz Durim. Não aposte bebida com ele."),
    ("fala", "Borin", "Bebo o necessário! E forjo melhor que qualquer um daqui até Nordheim!"),
    ("fala", "Mira", "E eu sou a Mira, do deserto de Zahrim. Aliás... isso aqui é seu?"),
    ("fala", "Rafa", "Minha bolsa de moedas?! Quando foi que você...?!"),
    ("fala", "Mira", "Hehe. Regra número um de Eldoria, novato: preste atenção."),
    ("sis", "[OLHOS DO SISTEMA]", ["Borin — Anão   Nv. 18   Ferreiro/Guerreiro",
                                   "Mira — Felina   Nv. 15   Ladina",
                                   "Afinidade com o grupo: crescendo"]),
    ("fala", "Borin", "A guilda postou uma missão: o Rei Goblin acordou na caverna ao norte. Pagamento gordo!"),
    ("fala", "Mira", "Um humano esquisito, uma elfa certinha, um anão bêbado e uma ladra. Parece começo de piada."),
    ("fala", "Rafa", "Ou começo de um grupo. Eu topo!"),
    ("sis", "GRUPO FORMADO", ["Membros: Rafa • Lyriel • Borin • Mira", "Bônus de grupo: EXP +20%"]),
])
cena("23_telhado", 8, cam((0, .55, .4, 0.6), (1, .35, .55, 0.8)), [], "encerramento", vol=0.6, itens=[
    ("narra", "Naquela noite, eu não consegui dormir."),
    ("fala", "Rafa", "Será que alguém lá na Terra percebeu que eu sumi? A minha mãe... o meu chefe... alguém?"),
    ("fala", "Rafa", "Lá eu era só mais um no ônibus. Aqui... aqui as pessoas olham pra mim."),
    ("sis", "MISSÃO PRINCIPAL ATUALIZADA", ["Encontre o caminho de volta para casa...", "...ou um motivo para ficar."]),
    ("fala", "Rafa", "Você também tem senso de humor, Sistema?"),
    ("sis", "SISTEMA", ["..."]),
    ("fala", "Rafa", "Hehe. Boa noite pra você também."),
])

# ============================================================ OS VILÕES
cena("24_lich", 7, cam((0, .5, .6, 1.0), (1, .5, .3, 0.55)), ["escuro"], "sombrio", fade=(1.0, 0), itens=[
    ("local", "TERRAS SOMBRIAS DE MORVATH", "Ao mesmo tempo, muito longe dali..."),
    ("fala", "Morvath", "Sentiram isso, meus servos? Uma alma de outro mundo atravessou o véu."),
    ("fala", "Morvath", "Há mil anos, outro Viajante me derrotou com esse mesmo poder azul."),
    ("fala", "Morvath", "Desta vez... eu o encontrarei primeiro. Acordem Vorthax."),
])
cena("25_dragao", 7, cam((0, .3, .3, 0.6), (1, .6, .5, 1.0)), ["brasas"], None, itens=[
    ("sfx", "rugido"), ("tremor", 2.5, 12),
    ("narra", "Naquela mesma noite, o dragão negro Vorthax abriu os olhos depois de um sono de mil anos."),
    ("alerta", "ALERTA DO SISTEMA", ["Ameaça de nível catastrófico detectada.", "Vorthax, o Dragão do Fim  —  Nv. ???"]),
    ("pausa", 1),
], fade=(0, 1.0))

# ============================================================ PARTE C — A CAVERNA
cena("26_masmorra", 8, cam((0, .5, .5, 1.0), (1, .4, .45, 0.7)), ["poeira"], None, fade=(0.8, 0), itens=[
    ("local", "CAVERNA DO REI GOBLIN", "Norte de Valdoria — dia 3"),
    ("fala", "Borin", "Cheiro de goblin e de mofo. Fiquem juntos."),
    ("fala", "Mira", "Armadilha no chão, terceira pedra. De nada."),
    ("fala", "Lyriel", "Rafa, o seu Sistema consegue ver o que tem lá dentro?"),
    ("sis", "[OLHOS DO SISTEMA]", ["Rei Goblin   Nv. 22", "Resistência: cortes", "Ponto fraco: a coroa (núcleo de mana)"]),
    ("fala", "Rafa", "Nível 22... e eu sou nível 5. Ótimo. Excelente. Maravilha."),
])
cena("27_rei_goblin", 8, cam((0, .5, .6, 1.0), (0.5, .65, .3, 0.6), (1, .3, .7, 0.7)), ["poeira"], "batalha", itens=[
    ("sfx", "rugido"), ("tremor", 2, 14),
    ("fala", "Rei Goblin", "HUMANO! ELFA! ANÃO! GATINHA! TODOS VÃO VIRAR ALMOÇO!"),
    ("fala", "Borin", "Almoço é a tua avó! PELA FORJA!"),
    ("sfx", "impacto"), ("flash",),
    ("fala", "Lyriel", "Chuva de Flechas!"),
    ("fala", "Mira", "Corte das Sombras!"),
    ("fala", "Rei Goblin", "Inúteis! A minha pele é de pedra!"),
    ("sfx", "impacto"), ("tremor", 1, 16),
    ("fala", "Borin", "Argh! Ele é forte demais! Rafa, a coroa! Mire na coroa!"),
    ("alerta", "[LÂMINA DO VIAJANTE]", ["Mana insuficiente:  12 / 80"]),
    ("fala", "Rafa", "Mana insuficiente?! Agora não, Sistema!"),
])
cena("28_lamina", 8, cam((0, .5, .6, 0.55), (0.6, .5, .45, 0.8), (1, .5, .5, 1.0)), ["brilho", "velocidade"], "abertura",
     itens=[
         ("fala", "Lyriel", "Rafa! Pegue a minha mana! A de todos nós! Juntos!"),
         ("sfx", "magia"),
         ("sis", "HABILIDADE OCULTA DESBLOQUEADA", ["[Elo do Viajante]", "Compartilha a mana dos aliados do grupo.",
                                                    "Mana:  12  →  240"]),
         ("fala", "Rafa", "Eu sinto... a força de todos vocês!"),
         ("tremor", 3, 10),
         ("fala", "Rafa", "LÂMINA DO VIAJANTE — CORTE CELESTIAL!!!"),
         ("sfx", "corte"), ("flash",), ("tremor", 1.5, 22), ("sfx", "impacto"),
         ("pausa", 1.5),
     ])
cena("31_vitoria", 8, cam((0, .5, .5, 1.0), (0.5, .45, .45, 0.7), (1, .5, .5, 0.95)), ["ouro"], "vitoria", itens=[
    ("sis", "VITÓRIA", ["Rei Goblin derrotado!", "EXP +4.400  (bônus ×2, grupo +20%)", "NÍVEL 5  →  14 !"]),
    ("sfx", "levelup"),
    ("fala", "Borin", "HAHAHA! Isso é o que eu chamo de golpe!"),
    ("fala", "Mira", "E olha só o tesouro: uma Gema do Abismo! Estamos ricos!"),
    ("fala", "Lyriel", "Você está bem? O seu corpo inteiro estava brilhando..."),
    ("fala", "Rafa", "Tô ótimo. Acho que foi a primeira vez que alguém confiou em mim de verdade."),
    ("sis", "MISSÃO PRINCIPAL", ["Sobreviva ao seu primeiro dia:  CONCLUÍDA", "Recompensa: [Passagem para Kaeloria]"]),
])
cena("29_amanhecer", 8, cam((0, .5, .5, 1.0), (1, .5, .45, 0.75)), [], "calmo", itens=[
    ("local", "PORTO DE VALDORIA", "Uma semana depois"),
    ("fala", "Mira", "Uma passagem de navio para Kaeloria... Dizem que as kitsunes de lá sabem abrir portais."),
    ("fala", "Lyriel", "Portais entre mundos... Talvez seja o caminho para a sua casa, Rafa."),
    ("fala", "Borin", "Ou para mais cerveja. Eu vou de qualquer jeito!"),
    ("fala", "Rafa", "Então tá decidido. Próxima parada: Kaeloria!"),
    ("narra", "Eu não sei se um dia vou voltar para a Terra. Mas, pela primeira vez... eu quero muito saber o que vem depois."),
    ("sis", "SISTEMA", ["Capítulo 1 concluído.", "Salvando progresso..."]),
    ("pausa", 1),
], fade=(0, 1.2))

# ============================================================ ENCERRAMENTO (créditos)
CREDITOS = [
    "O SISTEMA DE ELDORIA",
    "Episódio 1 — O Sistema Despertou",
    "",
    "ELENCO",
    "Rafael \"Rafa\" Moreira — o Viajante",
    "Lyriel de Sylvaris — arqueira élfica",
    "Borin Martelo-de-Brasa — ferreiro anão",
    "Mira de Zahrim — ladina felina",
    "Elsa — recepcionista da Guilda",
    "Lich Morvath — Senhor das Terras Sombrias",
    "Vorthax — o Dragão do Fim",
    "O Sistema — ele mesmo",
    "",
    "O MUNDO",
    "Eldoria • Kaeloria • Valtheria • Elyndra",
    "Humanos • Elfos • Anões • Orcs • Felinos",
    "Nórdicos • Draconatos • Tritões • Kitsunes",
    "Tieflings • Meio-Gigantes • Gnomos • Pequeninos",
    "",
    "PRODUÇÃO",
    "Mundo e história: Crônicas de Eldoria",
    "Artes-chave: geradas no Figma",
    "Trilha: composta em partitura ABC",
    "e sintetizada nota por nota",
    "Abertura: \"O Sistema de Eldoria\"",
    "Encerramento: \"Duas Luas\"",
    "Montagem e efeitos: Python + FFmpeg",
    "",
    "Obrigado por assistir!",
]
FUNDO_ED = ["29_amanhecer", "19_por_do_sol", "23_telhado", "31_vitoria", "00_poster"]
for i, img in enumerate(FUNDO_ED):
    cena(img, 20, PAN_D if i % 2 == 0 else PAN_E, ["escuro"] + (["petalas"] if i == 2 else []),
         "encerramento" if i == 0 else None, fade=(1.0, 1.0),
         itens=[("rolagem", i, len(FUNDO_ED))])

# ============================================================ PRÉVIA
cena("14_aurelion", 4, PAN_D, [], "abertura", fade=(0.5, 0), itens=[
    ("narra", "No próximo episódio: o navio para Kaeloria, as kitsunes de Shirokai..."),
])
cena("12_shirokai", 4, ZOOM_IN, ["petalas"], None, itens=[
    ("narra", "...e um imperador de chifres que também está procurando o Viajante."),
])
cena("13_azhkar", 4, ZOOM_OUT, ["brasas"], None, itens=[
    ("titulo", "PRÓXIMO EPISÓDIO", "Rumo a Kaeloria — O Mar das Brumas"), ("pausa", 3.5),
])
cena("00_poster", 6, cam((0, .5, .5, 1.0), (1, .5, .5, 0.85)), ["brilho"], None, fade=(0, 2.0), itens=[
    ("titulo", "CONTINUA...", ""), ("pausa", 5),
])
