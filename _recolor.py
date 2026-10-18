import pathlib, re
base = pathlib.Path('Colores-y-Estetica/Iconos')
nuevos = ['IA.svg','Lenguaje.svg','Accion Rapida.svg','Guardar.svg','Cargar documento.svg','Pausa.svg','Documento guardado.svg']
for n in nuevos:
    p = base / n
    t = p.read_text(encoding='utf-8', errors='ignore')
    t2 = re.sub(r'#000000', '#00ff88', t, flags=re.I)
    if t2 != t:
        p.write_text(t2, encoding='utf-8')
        print('recolor', n)
    else:
        print('ya-verde', n)
