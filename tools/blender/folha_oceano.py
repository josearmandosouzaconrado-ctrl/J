# Junta os 2N quadros do oceano (oceano.py) em N quadros que fecham o laço sem pulo
# (cada quadro mistura o tempo k com o tempo k+N) e grava a folha em img/oceano.webp.
# Uso: python3 folha_oceano.py <pasta> [N] [colunas]
import sys, numpy as np
from PIL import Image
D = sys.argv[1]; N = int(sys.argv[2]) if len(sys.argv) > 2 else 24; C = int(sys.argv[3]) if len(sys.argv) > 3 else 6
q = [np.asarray(Image.open(f'{D}/q{i:03d}.png').convert('RGB'), dtype=np.float32) for i in range(2 * N)]
T = q[0].shape[0]; L = (N + C - 1) // C
folha = Image.new('RGB', (C * T, L * T))
for k in range(N):
    a = k / N
    f = (1 - a) * q[k + N] + a * q[k]
    # mais contraste nas ondas (no jogo a câmera fica longe e o desenho é pequeno)
    m = f.mean(axis=(0, 1), keepdims=True); f = m + (f - m) * 1.55
    cinza = f.mean(axis=2, keepdims=True); f = cinza + (f - cinza) * 1.15
    folha.paste(Image.fromarray(np.clip(f + 0.5, 0, 255).astype(np.uint8)), ((k % C) * T, (k // C) * T))
folha.save('img/oceano.webp', 'WEBP', quality=80, method=6)
print('img/oceano.webp', folha.size)
