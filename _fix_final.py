import pathlib
p = pathlib.Path('Motor-Logica-y-Acronimos/datos.js')
t = p.read_text(encoding='utf-8')
old = '"ia_sin_micro": { es: "Sin micr\u00f3fono \u2014 usa para escribir", en: "No mic \u2014 use to type" }'
new = '"ia_sin_micro": { es: "Sin micr\u00f3fono \u2014 escribe abajo", en: "No mic \u2014 type below" }'
assert old in t, 'no encontrado'
p.write_text(t.replace(old, new), encoding='utf-8')
print('ia_sin_micro corregido')

# barrido final de emojis a color (rangos emoji reales)
import re
todo = (pathlib.Path('Motor-Logica-y-Acronimos/logica.js').read_text(encoding='utf-8')
  + pathlib.Path('Cuerpo-y-Textos/index.html').read_text(encoding='utf-8')
  + pathlib.Path('Motor-Logica-y-Acronimos/datos.js').read_text(encoding='utf-8'))
pat = re.compile(r'[\U0001F000-\U0001FAFF\u2600-\u27BF\u2B00-\u2BFF\uFE0F]')
hall = sorted(set(pat.findall(todo)))
abrir = pathlib.Path('_ver_emoji.txt')
abrir.write_text('\n'.join(repr(c) for c in hall), encoding='utf-8')
print('emojis restantes:', len(hall))
