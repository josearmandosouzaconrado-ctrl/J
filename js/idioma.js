'use strict';
// =====================================================================
//  IDIOMAS — Português (Brasil), English, Español, 日本語, 中文
//  Na primeira vez que o jogo abre, o jogador escolhe a língua (dá para
//  trocar depois no botão "🌐 Idioma" da tela inicial).
//  A tradução é feita na hora em que o texto aparece na tela: menus,
//  botões, telas, avisos e o HUD passam por um dicionário (frases inteiras,
//  pedaços separados por "•" e ":", e modelos com números como "Nv 5").
//  O que ainda não está no dicionário continua em português.
// =====================================================================
const IDIOMAS = [
  ['pt', 'Português (Brasil)', '🇧🇷'], ['en', 'English', '🇺🇸'], ['es', 'Español', '🇪🇸'], ['ja', '日本語', '🇯🇵'], ['zh', '中文 (简体)', '🇨🇳']
];
// chave em português -> [inglês, espanhol, japonês, chinês]
const DIC = {
  // tela inicial e criação
  'Continuar': ['Continue', 'Continuar', 'つづきから', '继续'], 'Novo Jogo': ['New Game', 'Nuevo juego', 'はじめから', '新游戏'], 'Carregar': ['Load', 'Cargar', 'ロード', '读取'],
  'Opções': ['Options', 'Opciones', 'オプション', '选项'], 'Como Jogar': ['How to Play', 'Cómo jugar', '遊び方', '玩法说明'], 'Multiplayer': ['Multiplayer', 'Multijugador', 'マルチプレイ', '多人游戏'],
  'Anime': ['Anime', 'Anime', 'アニメ', '动画'], 'assista aos capítulos da história': ['watch the story chapters', 'mira los capítulos de la historia', '物語のエピソードを見る', '观看剧情章节'],
  'Criar Personagem': ['Create Character', 'Crear personaje', 'キャラクター作成', '创建角色'], 'Nome': ['Name', 'Nombre', '名前', '名字'], 'Raça': ['Race', 'Raza', '種族', '种族'], 'Classe': ['Class', 'Clase', 'クラス', '职业'],
  'Aparência': ['Appearance', 'Apariencia', '外見', '外观'], 'Estilo': ['Style', 'Estilo', 'スタイル', '风格'], 'Mundo': ['World', 'Mundo', 'ワールド', '世界'], 'Semente do mundo (opcional)': ['World seed (optional)', 'Semilla del mundo (opcional)', 'ワールドシード（任意）', '世界种子（可选）'],
  'Começar Aventura ▶': ['Start Adventure ▶', 'Comenzar aventura ▶', '冒険を始める ▶', '开始冒险 ▶'], 'Pedras do Destino': ['Destiny Stones', 'Piedras del Destino', '運命の石', '命运之石'], 'Sem classe fixa.': ['No fixed class.', 'Sin clase fija.', '固定クラスなし。', '没有固定职业。'],
  'Masculino': ['Male', 'Masculino', '男性', '男'], 'Feminino': ['Female', 'Femenino', '女性', '女'], 'Pele': ['Skin', 'Piel', '肌', '肤色'], 'Cabelo': ['Hair', 'Pelo', '髪', '头发'], 'Olhos': ['Eyes', 'Ojos', '目', '眼睛'], 'Roupa': ['Clothes', 'Ropa', '服', '服装'],
  'Aleatório': ['Random', 'Aleatorio', 'ランダム', '随机'], 'Dificuldade': ['Difficulty', 'Dificultad', '難易度', '难度'], 'Normal': ['Normal', 'Normal', 'ノーマル', '普通'], 'Difícil': ['Hard', 'Difícil', 'ハード', '困难'], 'Brutal (estilo Kenshi)': ['Brutal (Kenshi style)', 'Brutal (estilo Kenshi)', 'ブルータル（Kenshi風）', '残酷（Kenshi 风格）'],
  'Um RPG de fantasia medieval em mundo aberto': ['An open-world medieval fantasy RPG', 'Un RPG de fantasía medieval de mundo abierto', 'オープンワールドの中世ファンタジーRPG', '开放世界中世纪奇幻角色扮演游戏'],
  'com amigos': ['with friends', 'con amigos', '友達と', '和朋友一起'], 'código de convite': ['invite code', 'código de invitación', '招待コード', '邀请码'],
  // opções
  'Música': ['Music', 'Música', '音楽', '音乐'], 'Efeitos sonoros': ['Sound effects', 'Efectos de sonido', '効果音', '音效'], 'Som': ['Sound', 'Sonido', 'サウンド', '声音'], 'Volume': ['Volume', 'Volumen', '音量', '音量'], 'Clima': ['Weather', 'Clima', '天候', '天气'],
  'Tamanho dos botões': ['Button size', 'Tamaño de botones', 'ボタンの大きさ', '按钮大小'], 'Mostrar FPS': ['Show FPS', 'Mostrar FPS', 'FPSを表示', '显示 FPS'], 'Zoom': ['Zoom', 'Zoom', 'ズーム', '缩放'], 'Modo leve': ['Light mode', 'Modo ligero', '軽量モード', '流畅模式'],
  'Ligado': ['On', 'Activado', 'オン', '开'], 'Desligado': ['Off', 'Desactivado', 'オフ', '关'], 'Idioma': ['Language', 'Idioma', '言語', '语言'], '🌐 Idioma / Language': ['🌐 Language / Idioma', '🌐 Idioma / Language', '🌐 言語 / Language', '🌐 语言 / Language'],
  'Escolha o idioma': ['Choose your language', 'Elige el idioma', '言語を選んでください', '选择语言'],
  // botões comuns
  'Voltar': ['Back', 'Volver', '戻る', '返回'], 'Tchau': ['Bye', 'Adiós', 'じゃあね', '再见'], 'Sair': ['Leave', 'Salir', '出る', '离开'], 'Fechar': ['Close', 'Cerrar', '閉じる', '关闭'], 'Ok': ['OK', 'OK', 'OK', '好的'],
  'Agora não': ['Not now', 'Ahora no', '今はいい', '现在不要'], 'Entrar': ['Enter', 'Entrar', '入る', '进入'], 'Vazio': ['Empty', 'Vacío', '空', '空'], 'vazio': ['empty', 'vacío', '空', '空'], 'Comprar / Vender': ['Buy / Sell', 'Comprar / Vender', '売買', '买 / 卖'],
  'Comprar': ['Buy', 'Comprar', '買う', '购买'], 'Vender': ['Sell', 'Vender', '売る', '出售'], 'Salvar': ['Save', 'Guardar', 'セーブ', '保存'], 'Subir': ['Go up', 'Subir', '上がる', '上去'], 'Descer': ['Go down', 'Bajar', '下りる', '下去'], 'Pronto': ['Done', 'Listo', '完了', '完成'],
  'Recusar': ['Decline', 'Rechazar', '断る', '拒绝'], 'Aceitar': ['Accept', 'Aceptar', '受ける', '接受'], 'Obrigado(a)!': ['Thank you!', '¡Gracias!', 'ありがとう！', '谢谢！'], 'Entendi': ['Got it', 'Entendido', 'わかった', '明白了'], 'Ainda não': ['Not yet', 'Todavía no', 'まだ', '还没有'],
  'Boa viagem!': ['Safe travels!', '¡Buen viaje!', 'よい旅を！', '一路顺风！'], 'Boa viagem': ['Safe travels', 'Buen viaje', 'よい旅を', '一路顺风'], 'Embarcar': ['Board', 'Embarcar', '乗船する', '登船'], 'Desembarcar': ['Disembark', 'Desembarcar', '下船する', '下船'], 'Sim': ['Yes', 'Sí', 'はい', '是'], 'Não': ['No', 'No', 'いいえ', '否'],
  'Cancelar': ['Cancel', 'Cancelar', 'キャンセル', '取消'], 'Confirmar': ['Confirm', 'Confirmar', '決定', '确认'], 'Continuar conversando': ['Keep talking', 'Seguir hablando', '話を続ける', '继续聊天'], 'Feito!': ['Done!', '¡Hecho!', 'できた！', '完成！'], 'Fugir!': ['Run!', '¡Huir!', '逃げろ！', '逃跑！'],
  'Só assistir': ['Just watch', 'Solo mirar', '見るだけ', '只是看看'], 'Ficar quieto': ['Stay quiet', 'Quedarse quieto', 'じっとする', '保持安静'], 'Sair da mesa': ['Leave the table', 'Dejar la mesa', '席を立つ', '离开桌子'], 'Lutar': ['Fight', 'Luchar', '戦う', '战斗'], 'Intimidar': ['Intimidate', 'Intimidar', '威嚇する', '威吓'],
  // menu principal
  'Mochila': ['Backpack', 'Mochila', 'バッグ', '背包'], 'Herói': ['Hero', 'Héroe', 'ヒーロー', '英雄'], 'Magias': ['Spells', 'Hechizos', '魔法', '法术'], 'Missões': ['Quests', 'Misiones', 'クエスト', '任务'], 'Família': ['Family', 'Familia', '家族', '家庭'],
  'Guildas': ['Guilds', 'Gremios', 'ギルド', '公会'], 'Reinos': ['Kingdoms', 'Reinos', '王国', '王国'], 'Mapa': ['Map', 'Mapa', '地図', '地图'], 'Sistema': ['System', 'Sistema', 'システム', '系统'], 'Tudo': ['All', 'Todo', 'すべて', '全部'],
  'Armas': ['Weapons', 'Armas', '武器', '武器'], 'Equip.': ['Gear', 'Equipo', '装備', '装备'], 'Consumíveis': ['Consumables', 'Consumibles', '消耗品', '消耗品'], 'Materiais': ['Materials', 'Materiales', '素材', '材料'], 'Outros': ['Other', 'Otros', 'その他', '其他'],
  'Equipar': ['Equip', 'Equipar', '装備する', '装备'], 'Desequipar': ['Unequip', 'Quitar', '外す', '卸下'], 'Usar': ['Use', 'Usar', '使う', '使用'], 'Comer': ['Eat', 'Comer', '食べる', '吃'], 'Beber': ['Drink', 'Beber', '飲む', '喝'], 'Largar': ['Drop', 'Soltar', '置く', '丢弃'],
  'Salvar jogo': ['Save game', 'Guardar partida', 'セーブする', '保存游戏'], 'Menu inicial': ['Title screen', 'Menú inicial', 'タイトルへ', '主菜单'], 'Voltar ao jogo': ['Back to game', 'Volver al juego', 'ゲームに戻る', '返回游戏'],
  'Toque num item.': ['Tap an item.', 'Toca un objeto.', 'アイテムをタップ。', '点击一个物品。'], 'Acampar / Fogueira': ['Camp / Campfire', 'Acampar / Hoguera', 'キャンプ / 焚き火', '露营 / 篝火'],
  'Arma': ['Weapon', 'Arma', '武器', '武器'], 'Escudo': ['Shield', 'Escudo', '盾', '盾牌'], 'Corpo': ['Body', 'Cuerpo', '胴', '身体'], 'Cabeça ': ['Head', 'Cabeza', '頭', '头'], 'Pés': ['Feet', 'Pies', '足', '脚'], 'Anel': ['Ring', 'Anillo', '指輪', '戒指'], 'Amuleto': ['Amulet', 'Amuleto', 'お守り', '护身符'],
  'Mãos': ['Hands', 'Manos', '手', '手'], 'Vazio.': ['Empty.', 'Vacío.', '空。', '空。'], 'Inventário': ['Inventory', 'Inventario', '持ち物', '物品栏'], 'Equipamento': ['Equipment', 'Equipo', '装備', '装备'], 'Habilidades': ['Skills', 'Habilidades', 'スキル', '技能'],
  'Ativas': ['Active', 'Activas', '進行中', '进行中'], 'Concluídas': ['Completed', 'Completadas', '完了', '已完成'], 'Missão principal': ['Main quest', 'Misión principal', 'メインクエスト', '主线任务'], 'Nenhuma missão.': ['No quests.', 'Sin misiones.', 'クエストなし。', '没有任务。'],
  'Dormir até de manhã': ['Sleep until morning', 'Dormir hasta la mañana', '朝まで眠る', '睡到早上'], 'Descansar 1 hora': ['Rest 1 hour', 'Descansar 1 hora', '1時間休む', '休息1小时'], 'Viajar': ['Travel', 'Viajar', '旅する', '旅行'], 'Pagar': ['Pay', 'Pagar', '払う', '支付'],
  'Morreu': ['You died', 'Moriste', '死んでしまった', '你死了'], 'VOCÊ MORREU': ['YOU DIED', 'HAS MUERTO', '死んでしまった', '你死了'], 'Renascer': ['Respawn', 'Renacer', '復活する', '复活'],
  'Guarda da cidade': ['City guard', 'Guardia de la ciudad', '町の衛兵', '城市卫兵'], 'Mercador': ['Merchant', 'Mercader', '商人', '商人'], 'Cidadão': ['Citizen', 'Ciudadano', '市民', '市民'], 'Capitão': ['Captain', 'Capitán', '船長', '船长'],
  // atributos e HUD
  'Vida': ['Health', 'Vida', '体力', '生命'], 'Magia': ['Mana', 'Magia', '魔力', '魔法'], 'Vigor': ['Stamina', 'Vigor', 'スタミナ', '耐力'], 'Nível': ['Level', 'Nivel', 'レベル', '等级'], 'Ouro': ['Gold', 'Oro', 'ゴールド', '金币'], 'ouro': ['gold', 'oro', 'ゴールド', '金币'],
  'Fome': ['Hunger', 'Hambre', '空腹', '饥饿'], 'Sede': ['Thirst', 'Sed', '渇き', '口渴'], 'Sono': ['Sleep', 'Sueño', '眠気', '困倦'], 'Frio': ['Cold', 'Frío', '寒さ', '寒冷'], 'Honra': ['Honor', 'Honor', '名誉', '荣誉'],
  'Ataque': ['Attack', 'Ataque', '攻撃', '攻击'], 'Defesa': ['Defense', 'Defensa', '防御', '防御'], 'Armadura': ['Armor', 'Armadura', '鎧', '护甲'], 'Dano': ['Damage', 'Daño', 'ダメージ', '伤害'], 'Velocidade': ['Speed', 'Velocidad', '速さ', '速度'],
  'NÍVEL 2!': ['LEVEL 2!', '¡NIVEL 2!', 'レベル2！', '升到2级！'], 'Escolha um atributo para aumentar (+10):': ['Choose a stat to raise (+10):', 'Elige un atributo para subir (+10):', '上げる能力を選ぼう（+10）：', '选择要提升的属性（+10）：'],
  'VIDA': ['HEALTH', 'VIDA', '体力', '生命'], 'MAGIA': ['MANA', 'MAGIA', '魔力', '魔法'], 'VIGOR': ['STAMINA', 'VIGOR', 'スタミナ', '耐力'],
  'Primavera': ['Spring', 'Primavera', '春', '春'], 'Verão': ['Summer', 'Verano', '夏', '夏'], 'Outono': ['Autumn', 'Otoño', '秋', '秋'], 'Inverno': ['Winter', 'Invierno', '冬', '冬'],
  'PERIGOSO!': ['DANGEROUS!', '¡PELIGROSO!', '危険！', '危险！'], 'Bem-vindo a': ['Welcome to', 'Bienvenido a', 'ようこそ', '欢迎来到'],
  // interações
  'Falar': ['Talk', 'Hablar', '話す', '交谈'], 'Abrir': ['Open', 'Abrir', '開ける', '打开'], 'Pescar': ['Fish', 'Pescar', '釣る', '钓鱼'], 'Colher': ['Harvest', 'Cosechar', '収穫', '采集'], 'Dormir': ['Sleep', 'Dormir', '眠る', '睡觉'],
  'Montar': ['Mount', 'Montar', '乗る', '骑乘'], 'Cortar': ['Chop', 'Talar', '伐る', '砍伐'], 'Quebrar': ['Break', 'Romper', '砕く', '打碎'], 'Saquear': ['Loot', 'Saquear', '略奪', '搜刮'], 'Ler': ['Read', 'Leer', '読む', '阅读'], 'Apostar': ['Bet', 'Apostar', '賭ける', '下注'],
  'Correr': ['Race', 'Correr', 'レースする', '赛跑'], 'Jogar': ['Play', 'Jugar', '遊ぶ', '游玩'], 'Tocar': ['Play', 'Tocar', '演奏する', '演奏'], 'Mergulhar': ['Dive', 'Bucear', '潜る', '潜水'], 'Escavar': ['Dig', 'Excavar', '発掘する', '挖掘'], 'Cavar': ['Dig', 'Cavar', '掘る', '挖'],
  'Pegar': ['Take', 'Tomar', '取る', '拿取'], 'Jaula': ['Cage', 'Jaula', '檻', '笼子'], 'Pilotar': ['Steer', 'Pilotar', '操舵する', '掌舵'], 'Soltar': ['Drop', 'Soltar', '降ろす', '放下'], 'Tocar ': ['Touch', 'Tocar', '触れる', '触摸'], 'Obra': ['Build site', 'Obra', '工事', '工地'],
  'Carroça': ['Cart', 'Carreta', '荷車', '马车'], 'Timão': ['Helm', 'Timón', '舵輪', '船舵'], 'Água': ['Water', 'Agua', '水', '水'],
  // navio
  'Velas': ['Sails', 'Velas', '帆', '船帆'], 'Recolhidas': ['Furled', 'Recogidas', 'たたむ', '收起'], 'A meio': ['Half', 'A medias', '半分', '一半'], 'Cheias': ['Full', 'Llenas', '全開', '满帆'],
  '💥 Bombordo': ['💥 Port', '💥 Babor', '💥 左舷', '💥 左舷'], '💥 Estibordo': ['💥 Starboard', '💥 Estribor', '💥 右舷', '💥 右舷'], '🎯 Canhão de proa': ['🎯 Bow cannon', '🎯 Cañón de proa', '🎯 艦首砲', '🎯 船首炮'],
  '🎣 Lançar a rede': ['🎣 Cast the net', '🎣 Lanzar la red', '🎣 網を投げる', '🎣 撒网'], '🧭 Rota até um porto': ['🧭 Route to a port', '🧭 Ruta a un puerto', '🧭 港への航路', '🧭 前往港口的航线'], '🧭 Cancelar rota': ['🧭 Cancel route', '🧭 Cancelar ruta', '🧭 航路を解除', '🧭 取消航线'],
  '🏴‍☠️ Bandeira': ['🏴‍☠️ Flag', '🏴‍☠️ Bandera', '🏴‍☠️ 旗', '🏴‍☠️ 旗帜'], '⚓ Desembarcar': ['⚓ Disembark', '⚓ Desembarcar', '⚓ 下船', '⚓ 下船'], '✋ Largar o timão': ['✋ Let go of the helm', '✋ Soltar el timón', '✋ 舵を離す', '✋ 松开船舵'],
  '🚣 Desembarcar (bote)': ['🚣 Disembark (rowboat)', '🚣 Desembarcar (bote)', '🚣 下船（ボート）', '🚣 下船（小艇）'], '🌬 Vento de alto-mar: mais rápido': ['🌬 Open-sea wind: faster', '🌬 Viento de alta mar: más rápido', '🌬 外洋の風：速い', '🌬 远海之风：更快'],
  'nós': ['knots', 'nudos', 'ノット', '节'], 'rumo': ['heading', 'rumbo', '針路', '航向'],
  // atividades e sistemas novos
  'Quadro de Caçadas': ['Hunting Board', 'Tablón de cacería', '狩猟掲示板', '狩猎告示板'], 'Mesa de Dados': ['Dice Table', 'Mesa de dados', 'サイコロ台', '骰子桌'], 'Hipódromo': ['Racetrack', 'Hipódromo', '競馬場', '赛马场'], 'Roda de Capoeira': ['Capoeira Circle', 'Rueda de capoeira', 'カポエイラの輪', '卡波耶拉圈'],
  'Desafio dos Tambores': ['Drum Challenge', 'Desafío de tambores', '太鼓チャレンジ', '鼓乐挑战'], 'Mergulho de Pérolas': ['Pearl Diving', 'Buceo de perlas', '真珠採り', '采珍珠'], 'Sítio de Escavação': ['Dig Site', 'Excavación', '発掘現場', '挖掘点'],
  'Caçada Lendária': ['Legendary Hunt', 'Cacería legendaria', '伝説の狩り', '传奇狩猎'], 'Mapas do tesouro': ['Treasure maps', 'Mapas del tesoro', '宝の地図', '藏宝图'], 'Tesouro encontrado!': ['Treasure found!', '¡Tesoro encontrado!', '宝物を見つけた！', '找到宝藏了！'], 'Lenda abatida!': ['Legend slain!', '¡Leyenda abatida!', '伝説を討ち取った！', '传说已被击败！'],
  'Escavação': ['Excavation', 'Excavación', '発掘', '挖掘'], 'Vitória!': ['Victory!', '¡Victoria!', '勝利！', '胜利！'], 'Largada!': ['Go!', '¡Salida!', 'スタート！', '出发！'],
  'DESMAIADO': ['KNOCKED OUT', 'INCONSCIENTE', '気絶', '昏迷'], 'CAPTURADO': ['CAPTURED', 'CAPTURADO', '捕まった', '被俘'], 'A jaula abriu!': ['The cage is open!', '¡La jaula se abrió!', '檻が開いた！', '笼子打开了！'], 'Livre': ['Free', 'Libre', '自由', '自由'], 'Resgate!': ['Rescue!', '¡Rescate!', '救出！', '救援！'],
  'SERPENTE-DO-ABISMO!': ['ABYSS SERPENT!', '¡SERPIENTE DEL ABISMO!', '深淵の大海蛇！', '深渊巨蛇！'], 'Serpente-do-Abismo': ['Abyss Serpent', 'Serpiente del Abismo', '深淵の大海蛇', '深渊巨蛇'], 'A SERPENTE-DO-ABISMO CAIU!': ['THE ABYSS SERPENT HAS FALLEN!', '¡LA SERPIENTE DEL ABISMO CAYÓ!', '深淵の大海蛇を倒した！', '深渊巨蛇倒下了！'],
  'PIRATA AFUNDADO': ['PIRATE SUNK', 'PIRATA HUNDIDO', '海賊船を撃沈', '海盗船被击沉'], 'Terra à vista!': ['Land ho!', '¡Tierra a la vista!', '陸が見えたぞ！', '看到陆地了！'],
  '🩸 sangrando': ['🩸 bleeding', '🩸 sangrando', '🩸 出血中', '🩸 流血中'], 'Cabeça': ['Head', 'Cabeza', '頭', '头'], 'Tronco': ['Torso', 'Torso', '胴', '躯干'], 'Braço esq.': ['Left arm', 'Brazo izq.', '左腕', '左臂'], 'Braço dir.': ['Right arm', 'Brazo der.', '右腕', '右臂'], 'Perna esq.': ['Left leg', 'Pierna izq.', '左脚', '左腿'], 'Perna dir.': ['Right leg', 'Pierna der.', '右脚', '右腿'],
  '💰 Pagar o resgate': ['💰 Pay the ransom', '💰 Pagar el rescate', '💰 身代金を払う', '💰 支付赎金'], '🌙 Esperar a noite': ['🌙 Wait for night', '🌙 Esperar la noche', '🌙 夜を待つ', '🌙 等到夜晚'],
  // lugares e povos (nomes gerais)
  'Eldoria': ['Eldoria', 'Eldoria', 'エルドリア', '艾尔多利亚'], 'Pindorama': ['Pindorama', 'Pindorama', 'ピンドラマ', '平多拉玛'], 'Taverna': ['Tavern', 'Taberna', '酒場', '酒馆'], 'Ferreiro': ['Blacksmith', 'Herrero', '鍛冶屋', '铁匠'], 'Templo': ['Temple', 'Templo', '神殿', '神殿'],
  'Mercado': ['Market', 'Mercado', '市場', '市场'], 'Loja': ['Shop', 'Tienda', '店', '商店'], 'Castelo': ['Castle', 'Castillo', '城', '城堡'], 'Porto': ['Port', 'Puerto', '港', '港口'], 'Guarda': ['Guard', 'Guardia', '衛兵', '卫兵'], 'Bandido': ['Bandit', 'Bandido', '盗賊', '强盗'],
  'Guerra declarada!': ['War declared!', '¡Guerra declarada!', '宣戦布告！', '宣战了！'], 'GUERRA DECLARADA!': ['WAR DECLARED!', '¡GUERRA DECLARADA!', '宣戦布告！', '宣战了！'], 'GOLPE DE ESTADO!': ['COUP D\'ÉTAT!', '¡GOLPE DE ESTADO!', 'クーデター！', '政变！'],
  'Jogo carregado.': ['Game loaded.', 'Partida cargada.', 'ロードしました。', '游戏已读取。'], 'Jogo salvo.': ['Game saved.', 'Partida guardada.', 'セーブしました。', '游戏已保存。'], 'Ouro insuficiente.': ['Not enough gold.', 'Oro insuficiente.', 'ゴールドが足りない。', '金币不足。'],
  'Forjando o mundo de Eldoria...': ['Forging the world of Eldoria...', 'Forjando el mundo de Eldoria...', 'エルドリアの世界を創造中…', '正在锻造艾尔多利亚的世界……'], 'Carregando...': ['Loading...', 'Cargando...', '読み込み中…', '加载中……']
};
// modelos com números e nomes
const MODELOS = [
  [/^Nv (\d+)$/, ['Lv $1', 'Nv $1', 'Lv $1', 'Lv $1']], [/^Nível (\d+)$/, ['Level $1', 'Nivel $1', 'レベル$1', '$1级']], [/^(\d+) ouro$/, ['$1 gold', '$1 oro', '$1 ゴールド', '$1 金币']],
  [/^Dia (\d+)$/, ['Day $1', 'Día $1', '$1日目', '第$1天']], [/^Nível (\d+)-(\d+)$/, ['Level $1-$2', 'Nivel $1-$2', 'レベル$1-$2', '等级 $1-$2']], [/^NÍVEL (\d+)!$/, ['LEVEL $1!', '¡NIVEL $1!', 'レベル$1！', '升到$1级！']],
  [/^\[E\] (.+?): (.+)$/, ['[E] $1: $2', '[E] $1: $2', '[E] $1：$2', '[E] $1：$2']], [/^Recarregando \(([\d.]+)s\)\.\.\.$/, ['Reloading ($1s)...', 'Recargando ($1s)...', '装填中（$1秒）…', '装填中（$1秒）……']],
  [/^Bem-vindo a (.+)$/, ['Welcome to $1', 'Bienvenido a $1', '$1へようこそ', '欢迎来到$1']], [/^até (\d+)$/, ['up to $1', 'hasta $1', '最大$1人', '最多$1人']], [/^Casa de (.+)$/, ['$1\'s House', 'Casa de $1', '$1の家', '$1的家']],
  [/^Taverna (.+)$/, ['Tavern $1', 'Taberna $1', '酒場「$1」', '$1酒馆']], [/^(\d+)h$/, ['$1h', '$1h', '$1時間', '$1小时']],
  [/^(\d+) nós$/, ['$1 knots', '$1 nudos', '$1ノット', '$1节']], [/^rumo (\S+)$/, ['heading $1', 'rumbo $1', '針路 $1', '航向 $1']],
  [/^\+(\d+) (.+)$/, ['+$1 $2', '+$1 $2', '+$1 $2', '+$1 $2']]
];
const Idioma = {
  lang: 'pt', idx: -1, cache: new Map(), orig: new WeakMap(),
  init() {
    if (this._ok) return; this._ok = true;
    let l = null; try { l = localStorage.getItem('eldoria_lang'); } catch (e) { }
    this.usar(l || 'pt', true);
    if (!l) setTimeout(() => this.escolher(true), 400);
    // tudo que aparecer na tela passa pelo tradutor
    this.obs = new MutationObserver(ms => {
      if (this.idx < 0) return;
      for (const m of ms) {
        if (m.type === 'characterData') this.no(m.target);
        else for (const n of m.addedNodes) this.arvore(n);
      }
    });
    this.obs.observe(document.body, { childList: true, subtree: true, characterData: true });
    // textos desenhados no canvas (nomes, avisos no chão, mensagens grandes)
    for (const f of ['fillText', 'strokeText']) {
      const o = CanvasRenderingContext2D.prototype[f];
      CanvasRenderingContext2D.prototype[f] = function (t, ...r) { return o.call(this, Idioma.idx < 0 || typeof t !== 'string' ? t : Idioma.t(t), ...r); };
    }
  },
  usar(l, inicio) {
    this.lang = IDIOMAS.some(i => i[0] === l) ? l : 'pt'; this.idx = ['en', 'es', 'ja', 'zh'].indexOf(this.lang); this.cache.clear();
    try { localStorage.setItem('eldoria_lang', this.lang); } catch (e) { }
    document.documentElement.lang = this.lang === 'pt' ? 'pt-BR' : this.lang;
    document.body && document.body.classList.toggle('cjk', this.lang === 'ja' || this.lang === 'zh');
    if (!inicio) { this.arvore(document.body, true); }
  },
  // traduz uma frase (com cache)
  t(s) {
    if (this.idx < 0 || !s) return s;
    let r = this.cache.get(s); if (r !== undefined) return r;
    r = this.frase(s);
    if (this.cache.size > 6000) this.cache.clear();
    this.cache.set(s, r); return r;
  },
  frase(s) {
    const d = DIC[s]; if (d) return d[this.idx];
    const m = s.match(/^(\s*)(.*?)(\s*)$/s), core = m[2];
    if (core !== s) { const c = this.frase(core); return c === core ? s : m[1] + c + m[3]; }
    for (const [re, tr] of MODELOS) { const x = core.match(re); if (x) return tr[this.idx].replace(/\$(\d)/g, (_, i) => this.t(x[i])); }
    // emoji ou símbolo na frente ("💤 Dormir")
    const e = core.match(/^([^\p{L}\p{N}]+)(\p{L}.*)$/u); if (e && DIC[e[2]]) return e[1] + DIC[e[2]][this.idx];
    // pedaços separados por " • ", " | ", " / " e "Rótulo: valor"
    for (const sep of [' • ', ' | ', ' · ']) if (core.includes(sep)) { const ps = core.split(sep), ts = ps.map(p => this.t(p)); if (ts.some((t, i) => t !== ps[i])) return ts.join(sep); }
    const c2 = core.match(/^([^:]{1,30}): (.+)$/); if (c2 && (DIC[c2[1]] || DIC[c2[2]])) return this.t(c2[1]) + (this.idx >= 2 ? '：' : ': ') + this.t(c2[2]);
    return s;
  },
  no(n) {
    if (n.nodeType !== 3) return;
    const p = n.parentNode; if (p && (p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE')) return;
    let o = this.orig.get(n);
    // o texto mudou por fora (o jogo atualizou): guarda o novo original
    if (!o || (n.nodeValue !== o.tr)) o = { pt: n.nodeValue, tr: null };
    const tr = this.idx < 0 ? o.pt : this.t(o.pt);
    o.tr = tr; this.orig.set(n, o);
    if (n.nodeValue !== tr) n.nodeValue = tr;
  },
  arvore(raiz, tudo) {
    if (!raiz) return;
    if (raiz.nodeType === 3) return this.no(raiz);
    if (raiz.nodeType !== 1) return;
    const w = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT); let n;
    const lista = []; while ((n = w.nextNode())) lista.push(n);
    for (const x of lista) {
      if (tudo) { const o = this.orig.get(x); if (o && x.nodeValue === o.tr) { o.tr = null; x.nodeValue = o.pt; } }
      this.no(x);
    }
    if (raiz.querySelectorAll) for (const el of raiz.querySelectorAll('[placeholder]')) { el.dataset.ph = el.dataset.ph || el.placeholder; el.placeholder = this.t(el.dataset.ph); }
  },
  // tela de escolha do idioma (na primeira vez e pelo botão da tela inicial)
  escolher(primeira) {
    const el = document.createElement('div'); el.id = 'idioma-tela';
    el.innerHTML = `<div class="id-box"><div class="id-t">🌐 Escolha o idioma • Choose your language • 言語 • 语言</div>${IDIOMAS.map(([k, n, f]) => `<button data-l="${k}" class="${k === this.lang ? 'on' : ''}">${f} ${n}</button>`).join('')}<div class="id-obs">Português é o idioma original. Nos outros idiomas, alguns diálogos ainda aparecem em português.<br>Portuguese is the original language; some dialogues are still in Portuguese.</div></div>`;
    el.addEventListener('pointerdown', e => { const b = e.target.closest('button'); if (!b) return; e.preventDefault(); this.usar(b.dataset.l); el.remove(); if (!primeira && typeof UI !== 'undefined' && UI.showTitle && !Game.started) UI.showTitle(); });
    document.body.appendChild(el);
  }
};
document.addEventListener('DOMContentLoaded', () => Idioma.init());
if (document.readyState !== 'loading') Idioma.init();
