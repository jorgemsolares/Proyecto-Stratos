import pathlib
# --- logica.js: nodos + avisos con equivalente SVG claro ---
p = pathlib.Path('Motor-Logica-y-Acronimos/logica.js')
t = p.read_text(encoding='utf-8')
IC = '../Colores-y-Estetica/Iconos'
def img(f):
    return f'<img src="{IC}/{f}" alt="" class="icono-inline">'
reps = [
  ('<div class="nombre-nodo-personal">\U0001F517 ${contacto.nombre}</div>',
   f'<div class="nombre-nodo-personal">{img("Indirecto.svg")} ${{contacto.nombre}}</div>'),
  ('<div class="nombre-nodo-personal">\U0001F441\ufe0f ${contacto.nombre}</div>',
   f'<div class="nombre-nodo-personal">{img("Observador.svg")} ${{contacto.nombre}}</div>'),
  ("const bandera = usuario.tipoActual === 'Observador' ? '\U0001F441\ufe0f '\n            : usuario.tipoActual === 'Indirecto' ? '\U0001F517 '\n            : '';",
   f"const bandera = usuario.tipoActual === 'Observador' ? '{img('Observador.svg')} '\n            : usuario.tipoActual === 'Indirecto' ? '{img('Indirecto.svg')} '\n            : '';"),
  ('mostrarAvisoInmediato("\U0001F4DD Completa tus datos para registrarte", "exito");',
   f'mostrarAvisoInmediato("{img("Documento guardado.svg")} Completa tus datos para registrarte", "exito");'),
  ('`\U0001F451 ${usuarioNuevo.nombre} es ahora el No.1.',
   f'`{img("Rango superior.svg")} ${{usuarioNuevo.nombre}} es ahora el No.1.'),
  ('mostrarAvisoInmediato("\u23F0 Sesi\u00f3n cerrada por inactividad de 30 minutos", "advertencia");',
   f'mostrarAvisoInmediato("{img("alarmas.svg")} Sesi\u00f3n cerrada por inactividad de 30 minutos", "advertencia");'),
  ("mostrarAvisoInmediato('\u26a0\ufe0f Est\u00e1s borrando m\u00e1s de lo habitual hoy.', 'advertencia');",
   f"mostrarAvisoInmediato('{img('Advertencia.svg')} Est\u00e1s borrando m\u00e1s de lo habitual hoy.', 'advertencia');"),
]
n = 0
for old, new in reps:
    if old in t:
        t = t.replace(old, new); n += 1
    else:
        print('NO-JS:', repr(old[:70]))
p.write_text(t, encoding='utf-8')
print(f'JS ok: {n}/{len(reps)}')

# --- datos.js: quitar emojis de TRADUCCIONES (el icono ya va en el HTML) ---
d = pathlib.Path('Motor-Logica-y-Acronimos/datos.js')
u = d.read_text(encoding='utf-8')
emo = ['\U0001F510','\U0001F511','\U0001F512','\U0001F4E4','\U0001F4E7','\U0001F4BE','\u270F\ufe0F','\U0001F5D1\ufe0F','\u26A0\ufe0F']
c = 0
for e in emo:
    k = u.count(e)
    u = u.replace(e+' ', '').replace(e, '')
    c += k
d.write_text(u, encoding='utf-8')
print(f'DATOS ok: {c} emojis quitados de traducciones')
