# Converte os bonecos de npcs_previa.py em pixel art (contorno escuro, poucas cores) e monta uma
# comparação: linha 1 = como é hoje no jogo; linha 2 = reformulado no mesmo tamanho; linha 3 = versão maior.
# Uso: python3 folha_npcs_previa.py <pasta_blender> <pasta_atual> <saida.png>
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFont
B, A, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
NS = ['campones', 'camponesa', 'guarda', 'anao', 'elfa', 'orc']; VS = ['frente', 'lado', 'costas']
def pixel(f, alt, alt_ref=1.5):
    im = Image.open(f).convert('RGBA'); bb = im.getchannel('A').point(lambda a: 255 if a > 40 else 0).getbbox(); im = im.crop(bb)
    h = max(4, round(alt * im.height / 190)); w = max(2, round(im.width * h / im.height))
    # média ponderada pela transparência (sem misturar a cor com o fundo transparente, que escurecia tudo)
    f = np.asarray(im, dtype=np.float32); al = f[..., 3:4] / 255
    pm = Image.fromarray(np.clip(f[..., :3] * al, 0, 255).astype(np.uint8)).resize((w, h), Image.BOX)
    am = im.getchannel('A').resize((w, h), Image.BOX)
    rgb = np.asarray(pm, dtype=np.float32); aa = np.asarray(am, dtype=np.float32)[..., None] / 255
    rgb = np.clip(rgb / np.maximum(aa, 1e-3), 0, 255)
    a = np.zeros((h, w, 4), np.uint8); a[..., :3] = rgb.astype(np.uint8); a[..., 3] = np.where(aa[..., 0] > 0.4, 255, 0)
    q = Image.fromarray(a[..., :3]).quantize(colors=12, method=Image.MEDIANCUT).convert('RGB'); a[..., :3] = np.asarray(q)
    # contorno escuro de 1 px (como os sprites do jogo)
    m = a[..., 3] > 0; o = np.zeros_like(m)
    o[1:] |= m[:-1]; o[:-1] |= m[1:]; o[:, 1:] |= m[:, :-1]; o[:, :-1] |= m[:, 1:]; o &= ~m
    out = np.zeros((h + 2, w + 2, 4), np.uint8); out[1:-1, 1:-1] = a
    mo = np.zeros((h + 2, w + 2), bool); mo[1:-1, 1:-1] = o
    m2 = np.zeros((h + 2, w + 2), bool); m2[1:-1, 1:-1] = m
    borda = np.zeros_like(m2); borda[1:] |= m2[:-1]; borda[:-1] |= m2[1:]; borda[:, 1:] |= m2[:, :-1]; borda[:, :-1] |= m2[:, 1:]; borda &= ~m2
    out[borda] = (26, 18, 16, 255)
    return Image.fromarray(out, 'RGBA')
E = 5; CW, CH = 40, 56
folha = Image.new('RGBA', (len(NS) * 3 * CW, CH * 3 + 30), (86, 136, 66, 255))
for i, n in enumerate(NS):
    for j, v in enumerate(VS):
        x = (i * 3 + j) * CW
        at = Image.open(f'{A}/atual_{n}_{j}.png').convert('RGBA'); folha.alpha_composite(at, (x + (CW - at.width) // 2, CH - at.height - 2))
        r1 = pixel(f'{B}/{n}_{v}.png', 28 if n != 'anao' else 22); folha.alpha_composite(r1, (x + (CW - r1.width) // 2, 2 * CH - r1.height - 2))
        r2 = pixel(f'{B}/{n}_{v}.png', 44 if n != 'anao' else 34); folha.alpha_composite(r2, (x + (CW - r2.width) // 2, 3 * CH - r2.height - 2))
big = folha.resize((folha.width * E // 2, folha.height * E // 2), Image.NEAREST)
d = ImageDraw.Draw(big); f = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 18)
for k, t in enumerate(['HOJE NO JOGO', 'REFORMULADO (mesmo tamanho)', 'REFORMULADO (maior, mais detalhe)']):
    d.text((8, k * CH * E // 2 + 4), t, fill=(255, 240, 180), font=f, stroke_width=3, stroke_fill=(0, 0, 0))
for i, n in enumerate(['Camponês', 'Camponesa', 'Guarda', 'Anão', 'Elfa', 'Orc']):
    d.text((i * 3 * CW * E // 2 + 10, big.height - 34), n, fill=(255, 255, 255), font=f, stroke_width=3, stroke_fill=(0, 0, 0))
big.convert('RGB').save(OUT)
print(OUT, big.size)
