import pathlib
p = pathlib.Path('Cuerpo-y-Textos/index.html')
t = p.read_text(encoding='utf-8')
orig = t
IC = '../Colores-y-Estetica/Iconos'
def img(f, alt=''):
    return f'<img src="{IC}/{f}" alt="{alt}" class="icono-inline">'
def big(f, alt=''):
    return f'<img src="{IC}/{f}" alt="{alt}" class="icono-inline" style="width:3rem;height:3rem;">'

# Banderas de pais: <option> no admite <img> -> solo texto
for b in ['\U0001F1EC\U0001F1F9','\U0001F1F2\U0001F1FD','\U0001F1FA\U0001F1F8','\U0001F1EA\U0001F1F8','\U0001F1F8\U0001F1FB','\U0001F1ED\U0001F1F3']:
    t = t.replace(b+' ', '').replace(b, '')

# Titulos y botones estaticos (envolver icono + span para no romper aplicarIdioma)
reps = [
  ('<p style="font-size: 0.9rem; color: var(--color-primario); margin-bottom: 10px; font-weight: 600;" data-i18n="reg_cambiar_pass">\n                \U0001F510 Cambiar mi contrase\u00f1a (opcional)',
   '<p style="font-size: 0.9rem; color: var(--color-primario); margin-bottom: 10px; font-weight: 600;">'+img('Cambiar contrase\u00f1a.svg')+' <span data-i18n="reg_cambiar_pass">Cambiar mi contrase\u00f1a (opcional)</span>'),
  ('<p class="titulo-biometria" data-i18n="bio_enrol_titulo">\U0001F510 Autenticaci\u00f3n biom\u00e9trica (este dispositivo)</p>',
   '<p class="titulo-biometria">'+img('Cambiar contrase\u00f1a.svg')+' <span data-i18n="bio_enrol_titulo">Autenticaci\u00f3n biom\u00e9trica (este dispositivo)</span></p>'),
  ('<span id="texto-placeholder-logo" data-i18n="id_cargar_logo">\U0001F4E4 Cargar Logo</span>',
   '<span id="texto-placeholder-logo">'+img('Cargar documento.svg')+' <span data-i18n="id_cargar_logo">Cargar Logo</span></span>'),
  ('<p style="font-size:3rem;">\U0001F4F9</p>', '<p style="font-size:3rem;">'+big('Reuniones.svg')+'</p>'),
  ('<p style="font-size:3rem;">\U0001F4AC</p>', '<p style="font-size:3rem;">'+big('chats.svg')+'</p>'),
  ('<p style="font-size:3rem;">\u2705</p>', '<p style="font-size:3rem;">'+big('tareas.svg')+'</p>'),
  ('<p style="font-size:3rem;">\u23F0</p>', '<p style="font-size:3rem;">'+big('alarmas.svg')+'</p>'),
  ('<p style="font-size:3rem;">\U0001F4C5</p>', '<p style="font-size:3rem;">'+big('calendario.svg')+'</p>'),
  ('<p style="font-size:3rem;">\U0001F4C1</p>', '<p style="font-size:3rem;">'+big('hub.svg')+'</p>'),
  ('<p style="font-size:3rem;">\U0001F4F1</p>', '<p style="font-size:3rem;">'+big('enlace movil.svg')+'</p>'),
  ('<p style="font-size:3rem;">\u2B21</p>', '<p style="font-size:3rem;">'+big('otras actividades.svg')+'</p>'),
  ('<h2>\U0001F4E7 Correos</h2>', '<h2>'+img('correos.svg')+' Correos</h2>'),
  ('<h3 data-i18n="cfg_ia">\U0001F916 Configuraci\u00f3n de IA</h3>', '<h3>'+img('IA.svg')+' <span data-i18n="cfg_ia">Configuraci\u00f3n de IA</span></h3>'),
  ('<h3 data-i18n="cfg_idioma">\U0001F310 Idioma</h3>', '<h3>'+img('Lenguaje.svg')+' <span data-i18n="cfg_idioma">Idioma</span></h3>'),
  ('<h3 data-i18n="cfg_seguridad">\U0001F512 Seguridad</h3>', '<h3>'+img('Cambiar contrase\u00f1a.svg')+' <span data-i18n="cfg_seguridad">Seguridad</span></h3>'),
  ('<h3 data-i18n="cfg_rec">\U0001F511 Recuperaci\u00f3n de Contrase\u00f1as</h3>', '<h3>'+img('Contrase\u00f1a.svg')+' <span data-i18n="cfg_rec">Recuperaci\u00f3n de Contrase\u00f1as</span></h3>'),
  ('<h3 data-i18n="cfg_acciones">\U0001F464 Acciones R\u00e1pidas</h3>', '<h3>'+img('Accion Rapida.svg')+' <span data-i18n="cfg_acciones">Acciones R\u00e1pidas</span></h3>'),
  ('\U0001F4E7 ENVIAR CONTRASE\u00d1A', img('correos.svg')+' <span data-i18n="cfg_rec_enviar">ENVIAR CONTRASE\u00d1A</span>'),
  ('\u270f\ufe0f Editar Mi Perfil', img('Editar.svg')+' <span data-i18n="cfg_editar">Editar Mi Perfil</span>'),
  ('\U0001F310 Ver Organigrama General', img('Organigrama General.svg')+' <span data-i18n="cfg_verorg">Ver Organigrama General</span>'),
  ('<span>\U0001F4CB</span>', '<span>'+img('Configuraci\u00f3n.svg')+'</span>'),
  ('title="Editar">\u270f\ufe0f</button>', 'title="Editar">'+img('Editar.svg')+'</button>'),
]
# Botones con data-i18n que contienen el emoji dentro: envolver con span
reps += [
  ('<button class="btn-principal" onclick="guardarContacto()" data-i18n="mod_salvar_inv">\U0001F4BE SALVAR E INVITAR</button>',
   '<button class="btn-principal" onclick="guardarContacto()">'+img('Guardar.svg')+' <span data-i18n="mod_salvar_inv">SALVAR E INVITAR</span></button>'),
  ('<button type="button" class="btn-secundario" onclick="editarContactoDesdeDetalle()" data-i18n="det_editar">\u270f\ufe0f EDITAR</button>',
   '<button type="button" class="btn-secundario" onclick="editarContactoDesdeDetalle()">'+img('Editar.svg')+' <span data-i18n="det_editar">EDITAR</span></button>'),
  ('<button type="button" class="btn-peligro" onclick="eliminarContacto()" data-i18n="det_eliminar">\U0001F5D1\ufe0f ELIMINAR</button>',
   '<button type="button" class="btn-peligro" onclick="eliminarContacto()">'+img('Eliminar.svg')+' <span data-i18n="det_eliminar">ELIMINAR</span></button>'),
  ('<h3 data-i18n="cambio_titulo">\u26a0\ufe0f Cambio de Contrase\u00f1a Obligatorio</h3>',
   '<h3>'+img('Advertencia.svg')+' <span data-i18n="cambio_titulo">Cambio de Contrase\u00f1a Obligatorio</span></h3>'),
  ('<button class="btn-principal" onclick="cambiarContrasenaObligatoria()" data-i18n="cambio_boton">\n                    \U0001F512 CAMBIAR CONTRASE\u00d1A Y CONTINUAR',
   '<button class="btn-principal" onclick="cambiarContrasenaObligatoria()">\n                    '+img('Cambiar contrase\u00f1a.svg')+' <span data-i18n="cambio_boton">CAMBIAR CONTRASE\u00d1A Y CONTINUAR</span>'),
]
# Boton pausa IA (▶/⏸ si existen se dejan; aqui el estatico ⏸ -> Pausa.svg)
t = t.replace('title="Pausa">\u23f8</button>', 'title="Pausa">'+img('Pausa.svg')+'</button>')
n = 0
for old, new in reps:
    if old in t:
        t = t.replace(old, new); n += 1
    else:
        print('NO-HTML:', repr(old[:70]))
p.write_text(t, encoding='utf-8')
print(f'HTML ok: {n}/{len(reps)} reemplazos')
