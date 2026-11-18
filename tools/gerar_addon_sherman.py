#!/usr/bin/env python3
"""Add-on "Tanque Sherman" para Minecraft Bedrock.

Um M4A3(75)W em que o jogador sobe (clique direito), dirige com WASD (a frente segue o olhar),
atira com o canhão de 75 mm (explosão) e com a metralhadora .50. A torre e o canhão acompanham a mira.

Saída: minecraft/tanque_sherman/TanqueSherman.mcaddon (+ pastas RP/BP abertas para ver).
"""
import io
import math
import os
import subprocess
import sys
import wave

import numpy as np
from PIL import Image, ImageDraw

AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, AQUI)
import mc_lib as L  # noqa: E402
import gerar_sherman as GS  # noqa: E402

SAIDA = os.path.join(AQUI, '..', 'minecraft', 'tanque_sherman')
ID = 'sherman:m4a3'
RP, BP = 'TanqueSherman_RP', 'TanqueSherman_BP'
TAXA = 22050


# ------------------------------------------------------------------ sons sintetizados
def _ogg(s):
    s = s / (np.max(np.abs(s)) + 1e-9) * 0.9
    buf = io.BytesIO()
    with wave.open(buf, 'wb') as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(TAXA)
        w.writeframes((s * 32767).astype(np.int16).tobytes())
    r = subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-f', 'wav', '-i', 'pipe:0',
                        '-c:a', 'libvorbis', '-q:a', '3', '-f', 'ogg', 'pipe:1'],
                       input=buf.getvalue(), capture_output=True, check=True)
    return r.stdout


def _passa_baixa(x, corte):
    a = math.exp(-2 * math.pi * corte / TAXA)
    y = np.zeros_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


def sons():
    g = np.random.default_rng(1944)
    t = lambda d: np.arange(int(TAXA * d)) / TAXA
    # motor V8 Ford GAA: batidas graves de ~38 Hz com ronco filtrado
    tm = t(0.9)
    batida = (np.sin(2 * np.pi * 38 * tm) > 0.6).astype(float)
    motor = _passa_baixa(batida * 0.8 + g.standard_normal(len(tm)) * 0.35, 220) + 0.4 * np.sin(2 * np.pi * 76 * tm)
    motor *= np.minimum(1, np.minimum(tm / 0.05, (0.9 - tm) / 0.08))
    # canhão: estalo + estrondo grave decaindo
    tc = t(1.8)
    ruido_c = g.standard_normal(len(tc))
    canhao = _passa_baixa(ruido_c, 300) * np.exp(-tc * 3.2) * 3 + ruido_c * np.exp(-tc * 40) * 0.6
    canhao += np.sin(2 * np.pi * (55 - 20 * tc) * tc) * np.exp(-tc * 4)
    # impacto: explosão mais abafada e longa
    ti = t(2.0)
    impacto = _passa_baixa(g.standard_normal(len(ti)), 180) * np.exp(-ti * 2.4) * 3
    impacto += _passa_baixa(g.standard_normal(len(ti)), 1500) * np.exp(-ti * 9) * 0.5
    # .50: estampido curto
    tg = t(0.18)
    mg = g.standard_normal(len(tg)) * np.exp(-tg * 45) + _passa_baixa(g.standard_normal(len(tg)), 400) * np.exp(-tg * 18) * 2
    return {'motor': _ogg(motor), 'canhao': _ogg(canhao), 'impacto': _ogg(impacto), 'metralhadora': _ogg(mg)}


# ------------------------------------------------------------------ ícones 16x16
def _png(img):
    b = io.BytesIO()
    img.save(b, 'PNG')
    return b.getvalue()


def icones():
    gr = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(gr)
    d.polygon([(2, 13), (10, 5), (12, 7), (4, 15)], fill=(196, 160, 70))       # estojo de latão
    d.line([(3, 14), (11, 6)], fill=(230, 200, 110))
    d.polygon([(10, 5), (13, 2), (14, 3), (12, 7)], fill=(72, 78, 50))          # ogiva verde-oliva
    d.point((14, 2), fill=(40, 44, 30))
    d.line([(2, 13), (4, 15)], fill=(150, 116, 46))
    mg = Image.new('RGBA', (16, 16), (0, 0, 0, 0))
    d = ImageDraw.Draw(mg)
    d.rectangle([3, 7, 9, 10], fill=(64, 64, 62))                                # corpo
    d.line([(9, 8), (15, 8)], fill=(40, 40, 40))                                 # cano
    d.line([(9, 9), (13, 9)], fill=(90, 90, 88))
    d.rectangle([1, 8, 3, 9], fill=(52, 52, 50))                                 # empunhaduras
    d.rectangle([5, 11, 6, 14], fill=(52, 52, 50))
    d.rectangle([6, 4, 9, 6], fill=(72, 78, 50))                                 # caixa de munição
    for x in range(4, 9, 2):
        d.point((x, 7), fill=(200, 170, 80))
    return {'granada_75': _png(gr), 'metralhadora_50': _png(mg)}


# ------------------------------------------------------------------ definições
def entidade_cliente():
    return {'format_version': '1.10.0', 'minecraft:client_entity': {'description': {
        'identifier': ID,
        'materials': {'default': 'entity_alphatest'},
        'textures': {'default': 'textures/entity/sherman'},
        'geometry': {'default': 'geometry.sherman'},
        'render_controllers': ['controller.render.default'],
        'animations': {
            'andar': 'animation.sherman.andar', 'atirar': 'animation.sherman.atirar', 'mirar': 'animation.sherman.mirar',
            'ctrl_andar': 'controller.animation.sherman.andar', 'ctrl_tiro': 'controller.animation.sherman.tiro'},
        'scripts': {'animate': ['mirar', 'ctrl_andar', 'ctrl_tiro']},
        'spawn_egg': {'base_color': '#545838', 'overlay_color': '#eeece2'}}}}


def controladores():
    return {'format_version': '1.10.0', 'animation_controllers': {
        'controller.animation.sherman.andar': {'initial_state': 'parado', 'states': {
            'parado': {'transitions': [{'andando': 'query.ground_speed > 0.3'}], 'blend_transition': 0.3},
            'andando': {'animations': ['andar'], 'transitions': [{'parado': 'query.ground_speed <= 0.3'}],
                        'blend_transition': 0.3}}},
        'controller.animation.sherman.tiro': {'initial_state': 'pronto', 'states': {
            'pronto': {'transitions': [{'tiro': "query.property('sherman:atirando')"}]},
            'tiro': {'animations': ['atirar'], 'transitions': [{'pronto': "!query.property('sherman:atirando')"}]}}},
    }}


ANIM_MIRAR = {'animation.sherman.mirar': {'loop': True, 'bones': {
    'torre': {'rotation': [0, "query.property('sherman:torre')", 0]},
    'canhao': {'rotation': ["-query.property('sherman:elevacao')", 0, 0]}}}}


def entidade_servidor():
    return {'format_version': '1.21.0', 'minecraft:entity': {
        'description': {
            'identifier': ID, 'is_spawnable': True, 'is_summonable': True,
            'properties': {
                'sherman:torre': {'type': 'int', 'range': [-180, 180], 'default': 0, 'client_sync': True},
                'sherman:elevacao': {'type': 'int', 'range': [-10, 20], 'default': 0, 'client_sync': True},
                'sherman:atirando': {'type': 'bool', 'default': False, 'client_sync': True}}},
        'events': {
            'sherman:atirar': {'set_property': {'sherman:atirando': True}},
            'sherman:parar_tiro': {'set_property': {'sherman:atirando': False}}},
        'components': {
            'minecraft:type_family': {'family': ['sherman', 'tanque', 'inanimate']},
            'minecraft:health': {'value': 400, 'max': 400},
            'minecraft:collision_box': {'width': 2.8, 'height': 2.4},
            'minecraft:physics': {},
            'minecraft:pushable': {'is_pushable': False, 'is_pushable_by_piston': False},
            'minecraft:knockback_resistance': {'value': 1.0},
            'minecraft:movement': {'value': 0.2},
            'minecraft:movement.basic': {},
            'minecraft:navigation.walk': {'avoid_water': True},
            'minecraft:input_ground_controlled': {},
            'minecraft:variable_max_auto_step': {'base_value': 1.0625, 'controlled_value': 1.0625,
                                                 'jump_prevented_value': 1.0625},
            'minecraft:rideable': {
                'seat_count': 2, 'controlling_seat': 0, 'crouching_skip_interact': True,
                'family_types': ['player'], 'interact_text': 'Entrar no Sherman', 'pull_in_entities': False,
                'seats': [{'position': [0.0, 1.45, 0.25], 'min_rider_count': 0, 'max_rider_count': 2},
                          {'position': [0.0, 1.9, -1.6], 'min_rider_count': 1, 'max_rider_count': 2}]},
            'minecraft:damage_sensor': {'triggers': [
                {'cause': 'fall', 'deals_damage': 'no'}, {'cause': 'drowning', 'deals_damage': 'no'},
                {'cause': 'suffocation', 'deals_damage': 'no'}, {'cause': 'fire', 'deals_damage': 'no'},
                {'cause': 'fire_tick', 'deals_damage': 'no'}, {'cause': 'lava', 'damage_multiplier': 0.2},
                {'cause': 'projectile', 'damage_multiplier': 0.2}, {'cause': 'entity_attack', 'damage_multiplier': 0.3}]},
            'minecraft:fire_immune': {},
            'minecraft:breathable': {'total_supply': 15, 'suffocate_time': 0, 'breathes_water': True, 'breathes_air': True},
            'minecraft:loot': {'table': 'loot_tables/entities/sherman.json'},
            'minecraft:nameable': {},
            'minecraft:persistent': {},
            'minecraft:conditional_bandwidth_optimization': {},
        }}}


def item(nome, icone, texto, mao=False):
    comp = {'minecraft:icon': icone, 'minecraft:display_name': {'value': texto}, 'minecraft:max_stack_size': 64 if not mao else 1}
    if mao:
        comp['minecraft:hand_equipped'] = True
    return {'format_version': '1.21.0', 'minecraft:item': {
        'description': {'identifier': f'sherman:{nome}', 'menu_category': {'category': 'equipment'}},
        'components': comp}}


def receita(nome, padrao, chaves, resultado, n=1):
    return {'format_version': '1.20.10', 'minecraft:recipe_shaped': {
        'description': {'identifier': f'sherman:receita_{nome}'}, 'tags': ['crafting_table'],
        'pattern': padrao, 'key': {k: {'item': v} for k, v in chaves.items()},
        'result': {'item': resultado, 'count': n}}}


def montar():
    m = GS.construir()
    textura = m.montar_textura()
    geo = m.geo()
    desc = geo['minecraft:geometry'][0]['description']
    desc.update({'visible_bounds_width': 8, 'visible_bounds_height': 6, 'visible_bounds_offset': [0, 2, 0]})

    a = {}
    a[f'{RP}/models/entity/sherman.geo.json'] = L.json_bytes(geo)
    a[f'{RP}/animations/sherman.animation.json'] = L.json_bytes(m.animacoes_bedrock(ANIM_MIRAR))
    a[f'{RP}/animation_controllers/sherman.animation_controllers.json'] = L.json_bytes(controladores())
    a[f'{RP}/entity/sherman.entity.json'] = L.json_bytes(entidade_cliente())
    a[f'{RP}/textures/entity/sherman.png'] = textura
    ic = icones()
    for nome, png in ic.items():
        a[f'{RP}/textures/items/{nome}.png'] = png
    a[f'{RP}/textures/item_texture.json'] = L.json_bytes({'resource_pack_name': 'sherman', 'texture_name': 'atlas.items',
                                                          'texture_data': {f'sherman_{n}': {'textures': f'textures/items/{n}'} for n in ic}})
    sd = {}
    for nome, ogg in sons().items():
        a[f'{RP}/sounds/sherman/{nome}.ogg'] = ogg
        sd[f'sherman.{nome}'] = {'category': 'neutral', 'min_distance': 4 if nome == 'motor' else 16,
                                 'max_distance': 48 if nome == 'motor' else 160,
                                 'sounds': [{'name': f'sounds/sherman/{nome}', 'volume': 1.0}]}
    a[f'{RP}/sounds/sound_definitions.json'] = L.json_bytes({'format_version': '1.14.0', 'sound_definitions': sd})
    a[f'{RP}/texts/languages.json'] = L.json_bytes(['pt_BR', 'en_US'])
    for lingua, nome, ovo in (('pt_BR', 'Tanque Sherman', 'Tanque Sherman'), ('en_US', 'Sherman Tank', 'Sherman Tank')):
        a[f'{RP}/texts/{lingua}.lang'] = (f'entity.{ID}.name={nome}\nitem.spawn_egg.entity.{ID}.name={ovo}\n'
                                         f'action.interact.sherman=Entrar no Sherman\n').encode()

    a[f'{BP}/entities/sherman.json'] = L.json_bytes(entidade_servidor())
    a[f'{BP}/items/granada_75.json'] = L.json_bytes(item('granada_75', 'sherman_granada_75', 'Granada de 75 mm (atirar com o canhão)'))
    a[f'{BP}/items/metralhadora_50.json'] = L.json_bytes(item('metralhadora_50', 'sherman_metralhadora_50', 'Metralhadora .50 do Sherman', mao=True))
    a[f'{BP}/loot_tables/entities/sherman.json'] = L.json_bytes({'pools': [
        {'rolls': 1, 'entries': [{'type': 'item', 'name': 'minecraft:iron_ingot', 'weight': 1,
                                  'functions': [{'function': 'set_count', 'count': {'min': 8, 'max': 16}}]}]}]})
    a[f'{BP}/recipes/granada_75.json'] = L.json_bytes(receita('granada_75', [' I ', 'IPI', ' G '],
        {'I': 'minecraft:iron_ingot', 'P': 'minecraft:gunpowder', 'G': 'minecraft:gold_nugget'}, 'sherman:granada_75', 8))
    a[f'{BP}/recipes/metralhadora_50.json'] = L.json_bytes(receita('metralhadora_50', ['III', 'PRI', '  I'],
        {'I': 'minecraft:iron_ingot', 'P': 'minecraft:gunpowder', 'R': 'minecraft:redstone'}, 'sherman:metralhadora_50'))
    a[f'{BP}/recipes/sherman.json'] = L.json_bytes(receita('sherman', ['BBB', 'MRM', 'BBB'],
        {'B': 'minecraft:iron_block', 'M': 'minecraft:minecart', 'R': 'minecraft:redstone_block'}, 'sherman:m4a3_spawn_egg'))
    a[f'{BP}/functions/sherman.mcfunction'] = (
        '# Coloca um Sherman na sua frente e dá a munição\n'
        'summon sherman:m4a3 ^ ^ ^6\n'
        'give @s sherman:granada_75 32\n'
        'give @s sherman:metralhadora_50 1\n'
        'tellraw @s {"rawtext":[{"text":"§2Sherman pronto!§r Clique com o botão direito para subir, WASD para dirigir, '
        'agachar para sair. Segure a §eGranada de 75 mm§r ou a §eMetralhadora .50§r e clique com o botão direito para atirar."}]}\n'
    ).encode()
    a[f'{BP}/functions/sherman_sem_destruicao.mcfunction'] = b'scriptevent sherman:quebrar_blocos nao\n'
    a[f'{BP}/functions/sherman_com_destruicao.mcfunction'] = b'scriptevent sherman:quebrar_blocos sim\n'
    with open(os.path.join(AQUI, 'scripts_sherman', 'main.js'), 'rb') as f:
        a[f'{BP}/scripts/main.js'] = f.read()

    base = 'tanque_sherman'
    a[f'{RP}/manifest.json'] = L.json_bytes(L.manifesto(base, 'resources', 'Tanque Sherman (recursos)',
                                                         'M4A3(75)W Sherman dirigível', 'data'))
    man = L.manifesto(base, 'data', 'Tanque Sherman (comportamento)', 'Use /function sherman para ganhar um tanque', 'resources')
    man['modules'].append({'type': 'script', 'language': 'javascript', 'entry': 'scripts/main.js',
                           'uuid': str(L.uuid.uuid5(L.uuid.NAMESPACE_URL, base + '/modulo/script')), 'version': [1, 0, 0]})
    man['dependencies'].append({'module_name': '@minecraft/server', 'version': '1.11.0'})
    a[f'{BP}/manifest.json'] = L.json_bytes(man)
    prev = os.path.join(SAIDA, 'previa_sherman.png')
    if os.path.exists(prev):
        im = Image.open(prev).convert('RGB')
        lado = min(im.size)
        im = im.crop(((im.width - lado) // 2, (im.height - lado) // 2, (im.width + lado) // 2, (im.height + lado) // 2))
        icone = _png(im.resize((256, 256), Image.LANCZOS))
        a[f'{RP}/pack_icon.png'] = icone
        a[f'{BP}/pack_icon.png'] = icone
    return a


def main():
    a = montar()
    for rel, dados in a.items():
        caminho = os.path.join(SAIDA, rel)
        os.makedirs(os.path.dirname(caminho), exist_ok=True)
        with open(caminho, 'wb') as f:
            f.write(dados)
    with open(os.path.join(SAIDA, 'TanqueSherman.mcaddon'), 'wb') as f:
        f.write(L.mcaddon(a, [(RP, 'TanqueSherman_RP.mcpack'), (BP, 'TanqueSherman_BP.mcpack')]))
    print(len(a), 'arquivos; TanqueSherman.mcaddon pronto')


if __name__ == '__main__':
    main()
