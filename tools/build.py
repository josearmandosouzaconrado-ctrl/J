"""Empacota os dois packs em dist/FutebolCraft.mcaddon (abre direto no Minecraft)."""
import json
import os
import zipfile

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PACKS = ["Futebol_BP", "Futebol_RP"]


def main():
    for pack in PACKS:
        for dirpath, _, files in os.walk(os.path.join(RAIZ, pack)):
            for f in files:
                if f.endswith(".json"):
                    with open(os.path.join(dirpath, f), encoding="utf-8") as fh:
                        json.load(fh)
    os.makedirs(os.path.join(RAIZ, "dist"), exist_ok=True)
    destino = os.path.join(RAIZ, "dist", "FutebolCraft.mcaddon")
    with zipfile.ZipFile(destino, "w", zipfile.ZIP_DEFLATED) as z:
        for pack in PACKS:
            base = os.path.join(RAIZ, pack)
            for dirpath, _, files in os.walk(base):
                for f in sorted(files):
                    caminho = os.path.join(dirpath, f)
                    z.write(caminho, os.path.join(pack, os.path.relpath(caminho, base)))
    print(f"Gerado {destino} ({os.path.getsize(destino) // 1024} KB)")


if __name__ == "__main__":
    main()
