import pathlib
# PUNTO 1
p = pathlib.Path('Motor-Logica-y-Acronimos/logica.js')
t = p.read_text(encoding='utf-8')
a = t.count('textoMensaje.innerText = texto;')
b = t.count('textoMensaje.innerText = mensaje.texto;')
t = t.replace('textoMensaje.innerText = texto;', 'textoMensaje.innerHTML = texto;')
t = t.replace('textoMensaje.innerText = mensaje.texto;', 'textoMensaje.innerHTML = mensaje.texto;')
p.write_text(t, encoding='utf-8')
print(f'PUNTO1 ok: {a} + {b} cambios')
