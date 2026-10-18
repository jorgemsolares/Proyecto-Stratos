import io, re
p = 'Motor-Logica-y-Acronimos/logica.js'
t = io.open(p, encoding='utf-8-sig').read()

# 1) Lineas 476 y 3200: comillas dobles externas chocan con las del <img> -> usar backticks
t = t.replace(
  'mostrarAvisoInmediato("<img src="../Colores-y-Estetica/Iconos/Documento guardado.svg" alt="" class="icono-inline"> Completa tus datos para registrarte", "exito");',
  'mostrarAvisoInmediato(`<img src="../Colores-y-Estetica/Iconos/Documento guardado.svg" alt="" class="icono-inline"> Completa tus datos para registrarte`, "exito");')
t = t.replace(
  'mostrarAvisoInmediato("../Colores-y-Estetica/Iconos/alarmas.svg"',
  'mostrarAvisoInmediato(`<img src="../Colores-y-Estetica/Iconos/alarmas.svg"')
t = t.replace(
  'class="icono-inline"> Sesi\u00f3n cerrada por inactividad de 30 minutos", "advertencia"); cerrarSesion();',
  'class="icono-inline"> Sesi\u00f3n cerrada por inactividad de 30 minutos`, "advertencia"); cerrarSesion();')

# 2) Respaldo: si un icono no carga, se oculta solo el <img> y el texto queda visible
# Solo en cartelera (construirColaMensajes + mostrarAvisoInmediato con <img>): agregar onerror que oculta el img
def con_respaldo(m):
    tag = m.group(0)
    if 'onerror' in tag:
        return tag
    return tag.replace('class="icono-inline"', 'class="icono-inline" onerror="this.style.display=\'none\'"')
t = re.sub(r'<img src="\.\./Colores-y-Estetica/Iconos/[^"]*" alt="" class="icono-inline">', con_respaldo, t)

io.open(p, 'w', encoding='utf-8').write(t)
print('reparado: comillas + onerror en cartelera')
print('onerror count:', t.count("onerror=\"this.style.display='none'\""))
