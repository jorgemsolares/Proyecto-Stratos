import io
p = 'Motor-Logica-y-Acronimos/logica.js'
t = io.open(p, encoding='utf-8-sig').read()
viejo = 'mostrarAvisoInmediato("<img src="../Colores-y-Estetica/Iconos/alarmas.svg"'
nuevo = 'mostrarAvisoInmediato(`<img src="../Colores-y-Estetica/Iconos/alarmas.svg"'
assert viejo in t, 'no hallado'
t = t.replace(viejo, nuevo)
io.open(p, 'w', encoding='utf-8').write(t)
print('linea 3200 reparada')
