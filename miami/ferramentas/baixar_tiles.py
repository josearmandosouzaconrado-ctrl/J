"""Baixa tiles do Esri (World_Topo_Map / World_Imagery) e monta um mosaico recortado na área pedida.
Uso: python3 baixar_tiles.py World_Topo_Map 17 25.752 -80.210 25.800 -80.118 topo17.png
"""
import math, os, sys, subprocess
from concurrent.futures import ThreadPoolExecutor
from PIL import Image
D=os.environ.get('TILES_DIR', 'tiles')  # pasta de cache dos tiles baixados
def tx(lon,z): return (lon+180)/360*2**z
def ty(lat,z):
    r=math.radians(lat); return (1-math.asinh(math.tan(r))/math.pi)/2*2**z
def mosaic(svc,z,S,W,N,E,out):
    x0,x1=int(tx(W,z)),int(tx(E,z)); y0,y1=int(ty(N,z)),int(ty(S,z))
    os.makedirs(f'{D}/{svc}/{z}',exist_ok=True)
    jobs=[(x,y) for x in range(x0,x1+1) for y in range(y0,y1+1)]
    def get(j):
        x,y=j; p=f'{D}/{svc}/{z}/{y}_{x}.jpg'
        if not os.path.exists(p) or os.path.getsize(p)<100:
            subprocess.run(['curl','-sS','-m','40','--retry','3','-o',p,f'https://server.arcgisonline.com/ArcGIS/rest/services/{svc}/MapServer/tile/{z}/{y}/{x}'])
        return p
    with ThreadPoolExecutor(8) as ex: list(ex.map(get,jobs))
    im=Image.new('RGB',((x1-x0+1)*256,(y1-y0+1)*256))
    for x,y in jobs:
        try: im.paste(Image.open(f'{D}/{svc}/{z}/{y}_{x}.jpg').convert('RGB'),((x-x0)*256,(y-y0)*256))
        except Exception as e: print('fail',x,y,e)
    # crop to exact bbox
    L=(tx(W,z)-x0)*256; R=(tx(E,z)-x0)*256; T=(ty(N,z)-y0)*256; B=(ty(S,z)-y0)*256
    im=im.crop((int(L),int(T),int(R),int(B)))
    im.save(out); print(out,im.size)
if __name__=='__main__':
    svc,z,S,W,N,E,out=sys.argv[1],int(sys.argv[2]),*map(float,sys.argv[3:7]),sys.argv[7]
    mosaic(svc,z,S,W,N,E,out)
