import io
p = 'Motor-Logica-y-Acronimos/logica.js'
t = io.open(p, encoding='utf-8-sig').read()
viejo = 'onerror="this.style.display=\'none\'"'
n = t.count(viejo)
t = t.replace(viejo, 'onerror="this.remove()"')
io.open(p, 'w', encoding='utf-8').write(t)
print('cambiados:', n)
