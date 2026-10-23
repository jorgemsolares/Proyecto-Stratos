# 📌 MEMORIA DE PROYECTO — STRATOS

> **Documento de continuidad.** Este archivo es la "memoria viva" del proyecto.
> La IA (asistente) DEBE leerlo al inicio de cualquier sesión ANTES de responder o actuar.
> El Arquitecto (dueño) lo mantiene actualizado en cada avance.

---

## CÓMO USAR ESTE ARCHIVO (protocolo)

1. **Al abrir una sesión nueva**, la IA debe leer primero `A_DONDE_VA_STRATOS.md` + `Minutas de Chats` (https://github.com/jorgemsolares/Comunicaci-n-IA-Internet/blob/main/Minutas%20de%20Chats), y luego TODOS los archivos del sistema (los que están en las carpetas `Cuerpo-y-Textos`, `Colores-y-Estetica`, `Motor-Logica-y-Acronimos`, y los de `instrucciones-IA`).
2. **Cada avance real** se anota en la sección BITÁCORA (con fecha).
3. **Las notas de visión** (comentarios del Arquitecto que aún no se aplican) se guardan en VISIÓN, para que la IA las tenga presentes cuando toque ese proceso.
4. Este archivo también se respalda en GitHub junto al código.
5. **`instrucciones.md` y `explicacion.txt` deben estar vacíos al inicio del día.** Se llenan después, cuando el Arquitecto quiere dar las órdenes del día o explicar algo (para evadir tokens).
6. **CONTROL DE UNIFORMIDAD:** Antes de dar por terminado cualquier ajuste, cambio o creación de pantalla, modal o botón, la IA debe verificar obligatoriamente que se cumpla al 100% la **Sección H (Pantalla y botones)** de `A_DONDE_VA_STRATOS.md`.

---

## CÓMO TRABAJAR CON LA IA (Reglas de comunicación)

> **Estas reglas son obligatorias para la IA en cada sesión. El Arquitecto no debe repetirlas cada vez.**

- La IA debe dar respuestas **cortas y al grano**.
- La IA **nunca** debe tocar el código sin permiso explícito del Arquitecto.
- Se trabaja **una sola área o funcionalidad a la vez**.
- **Nada se deja a medias.** Si algo no se termina, se anota claramente en la sección PENDIENTES de esta bitácora.
- La IA debe respetar el protocolo de lectura: primero `A_DONDE_VA_STRATOS.md` + `Minutas de Chats`, luego TODOS los archivos del sistema.
- **REGLA DE DISEÑO INVIOLABLE:** Todo código nuevo o modificado **debe** aplicar las reglas de la Sección H de `A_DONDE_VA_STRATOS.md` (tamaños de pantallas, tamaños de modales, reglas de botones, colores de identidad, iconos como botones).

---

## MAPA DE ARCHIVOS (qué es cada cosa, numerado)

1. **`Cuerpo-y-Textos/index.html`**
   - Estructura y cuerpos de texto de la app (pantallas, formularios, modales).
   - Es el archivo de entrada que la app usa al correr.
   - Carga los estilos y la lógica desde las carpetas hermanas de la raíz.

2. **`Colores-y-Estetica/estilos.css`**
   - Diseño, colores, sistema visual completo (variables CSS, responsive, scrollbar).

3. **`Motor-Logica-y-Acronimos/datos.js`**
   - Datos, variables, estructuras y memoria (usuario, identidad, organigrama, storage).

4. **`Motor-Logica-y-Acronimos/logica.js`**
   - Procesamiento, validaciones e interacción (la "mente" de la app).

5. **`instrucciones-IA/instrucciones.md`**
   - Protocolo: el rol del Arquitecto (dueño) y de la IA (asistente técnico).

6. **`instrucciones-IA/MEMORIA.md`** (este archivo)
   - Memoria de continuidad: estado actual, visión, bitácora.

7. **`instrucciones-IA/PROTOCOLO_GITHUB.md`** (creado 17/09/2026)
   - Cómo subir a GitHub sin repetir el enredo del 16/09: las 3 tareas, rutina diaria,
     qué hacer si hay rebase/conflicto/rechazo y el rescate manual. **Sí se sube a GitHub.**

8. **Herramientas locales de sincronización** (NO se suben; viven en el PC):
   - `estado_git.ps1` → diagnóstico en un paso (veredicto AL DÍA / CON AVISOS / REVISAR).
   - `sincronizar_git.ps1` → subida segura (rescata rebase, integra, verifica).
   - `subir_automatico.ps1` → vigilante: respalda y sube al guardar (endurecido 17/09).
   - `.vscode\tasks.json` → las 4 tareas que se lanzan desde VS Code.

9. **`Pruebas/`** (carpeta creada el 04/10/2026, **SÍ sube a GitHub**)
   - Contiene `README.md` y las 4 pruebas que usa la IA para comprobar el código
     **sin abrir el navegador**: `_validar_js.py` (sintaxis), `_probar_biometria.py`
     (26), `_probar_organigrama.py` (22) y `_probar_marcas.py` (10).
   - **Último resultado: 58/58 en verde.** Se pueden correr desde cualquier carpeta:
     `python Pruebas/_probar_biometria.py`.
   - Solo `_validar_js.py` necesita `pip install esprima`; si no está, avisa y hace
     una revisión más básica. Las otras tres no necesitan instalar nada.
   - Los `resultado_*.txt` que generan NO se suben (están en el `.gitignore`).
   - **Por qué se suben:** son pruebas de regresión. Ya detectaron 2 bugs reales en la
     biometría antes de que llegaran al navegador. Toda IA que retome el proyecto
     puede correrlas antes de dar por terminado un cambio.
   - **Regla:** si una prueba falla, el trabajo NO está terminado y no se sube a GitHub.

10. **`instrucciones-IA/instrucciones.md` y `explicacion.txt` son archivos DE ÓRDENES, no de memoria.**
    - El Arquitecto escribe ahí lo que quiere el día y **al terminar la sesión los limpia**.
    - Por eso son VOLÁTILES: **nada importante puede quedarse solo ahí.** Todo lo que
      sobreviva (decisiones, límites, lo aplicado, lo pendiente) va a esta `MEMORIA.md`.
    - **Regla importante (confirmada por el Arquitecto el 04/10/2026): se VACÍAN, NO SE BORRAN.**
      Los dos archivos **deben seguir existiendo** (vacíos) para que el flujo de trabajo
      del día siguiente funcione. Borrarlos por error deja al Arquitecto sin dónde escribir.
    - El 04/10/2026 se vaciaron los dos y su contenido quedó volcado en la BITÁCORA.

> **NOTA (duplicación — RESUELTA 28/08/2026):** La carpeta vieja duplicada
> `Proyecto-Stratos` fue ELIMINADA. Ahora hay UN SOLO repositorio en la raíz,
> donde corre la app REAL (los archivos numerados arriba). ✅

---

## ESTADO ACTUAL (actualizado el 17/09/2026)

- La app que corre es la de las carpetas de la **raíz** (`Cuerpo-y-Textos`, `Colores-Estetica`, `Motor-Logica-y-Acronimos`).
- El `index.html` referencia correctamente a `estilos.css`, `datos.js` y `logica.js`. ✅
- **28/08/2026:** Enlace GitHub resuelto (upstream configurado), duplicado `Proyecto-Stratos` ELIMINADO (un solo repositorio) y cadenas corruptas de `datos.js` corregidas. El `DOMContentLoaded` final de `datos.js` se queda donde está (opción A).
- **Decisiones del 28/08 ya cumplidas:** GitHub como respaldo automático ✅ (script `subir_automatico.ps1` activo), cambios solo en la raíz `Stratos` ✅, duplicado eliminado ✅, `MEMORIA.md` de continuidad ✅.
- **29/08/2026:** Revisadas las 3 opciones de Configuración (Sonido, Vibración, Notificaciones): guardan la preferencia pero NO ejecutan ninguna acción (no existe código de audio/vibración/notificación en el proyecto). Decisión del Arquitecto: dejar PENDIENTE su activación hasta desarrollar la **Pantalla Comunicación** (siguiente paso del proyecto).
- **16/09/2026:** Aplicados los 4 PUNTOS de `instrucciones.md` (ver detalle en BITÁCORA): zona superior dividida (branding 1/3 + cartelera 2/3), Configuración limpia con botón de IA (esfera con humo), saludo "Hola [Nombre]" en Login con biometría por dispositivo, y botón flotante de IA con ventana emergente y voz. Pendiente: verificación del Arquitecto en el navegador (la hará el 17/09).
- **17/09/2026:** Sincronización con GitHub completada (el rebase que quedó a medias el 16/09 fue resuelto). Repositorio limpio y al día: `main` = `origin/main` = `c74d162`. Se preservaron 37 líneas nuevas de `A_DONDE_VA_STRATOS.md` (contenido de Vero). Detalle en BITÁCORA.
- **17/09/2026 (sesión 2):** Ante la preocupación del Arquitecto por el tiempo que costó la sincronización, se **blindó el proceso** para que no vuelva a pasar: diagnóstico en un paso, subida segura con rescate de rebase, vigilante endurecido y protocolo escrito (`PROTOCOLO_GITHUB.md`). **No se tocó ninguna línea de la app.** Detalle en BITÁCORA.
- **17/09/2026 (sesión 2, continuación):** El Arquitecto precisó que su prioridad es **"con menos hacer más"** (no gastar tokens/tiempo en tareas repetitivas). Se resolvió con **arranque automático**: el vigilante de respaldo ahora **se inicia solo al encender el PC** (carpeta de Inicio de Windows, oculto), y si se lanza dos veces el segundo se cierra solo. Ya no hay que acordarse de nada.
- **03/10/2026:** Aplicado el **PUNTO 48** de `instrucciones.md` (Login: registro de hora de entrada/salida, errores de tipeo por usuario, aviso al jefe al agotar los 7 intentos, cambio obligatorio con contraseña temporal, sugerencia de la IA por reincidencia y nombre de IA configurable; sello "Escribe aquí..."). Ver detalle en BITÁCORA. Pendiente: verificación del Arquitecto en el navegador y la integración de la alerta al jefe con la **cartelera por prioridad (PUNTO 2)**.
- **03/10/2026 (continuación):** Aplicado el **PUNTO 34** de `instrucciones.md`: ficha **`bancoDatos`** por usuario (días/sesiones, errores, permisos, invitaciones, actividad y campos libres) + **migración al cargar con respaldo previo**. Histórico de 5 años (con hora y minutos). Detalle en BITÁCORA.


- **Reorganización de archivos (hecha hoy 26/08/2026):**
  - `estilos.css`: sección 3.7 numerada (3.7.1–3.7.12) y tuerca unificada en 3.10.
  - `index.html`: títulos en 5 grupos numerados (solo comentarios, sin tocar HTML real).
  - `datos.js` y `logica.js`: se trasladó la lógica a `logica` y los datos a `datos`, eliminando duplicados (ver bitácora PASO 0–5).

- **Por hacer (próximo, IMPORTANTE):** que el Arquitecto **VERIFIQUE en el navegador** que la app sigue funcionando igual tras la reorganización de `datos.js`/`logica.js` (hay respaldo en `Motor-Logica-y-Acronimos\_respaldo_pre_reorg\`). Luego: unificación + respaldo a GitHub + títulos de datos/logica.

---

## VISIÓN DEL ARQUITECTO (notas que orientan, no se aplican ya)

Estas notas NO se ejecutan en el momento; sirven para que la IA entienda la idea completa
y le recuerde al Arquitecto cuando lleguemos a ese proceso.

- La app es **STRATOS**, una herramienta multifuncional con estructura de **organigrama** (No.1, Colaboradores, Observadores, Indirectos) e **identidad corporativa**.
- GitHub se quiere usar como **respaldo/seguridad**: si un cambio sale mal, poder **retroceder** al estado anterior.
- La forma de trabajar del Arquitecto es por **una sola área o funcionalidad a la vez**.
- El Arquitecto valora la **continuidad entre sesiones** y quiere que la IA "recuerde" la visión completa.
- **Pantalla Comunicación (próximo desarrollo):** será el módulo de mensajes/notificaciones entre usuarios. Cuando exista "recibir notificaciones nuevas", las 3 opciones de Configuración se activarán así:
  - **Sonido:** decisión On/Off; reproduce un pitido local (sin archivos de audio).
  - **Notificaciones:** usan el sonido BASE que la máquina o el celular ya tengan designado (notificación del sistema; el navegador pide permiso una sola vez; sin tokens).
  - **Vibración:** solo aplica a celular (On/Off; Android sí soporta, iPhone no permite vibración desde navegador — ahí simplemente no vibra).

*(Se irán agregando más notas aquí conforme el Arquitecto las comparta.)*

### PROCESO ESTÁNDAR OBLIGATORIO — INSERCIÓN DE ICONOS (17/10/2026, ampliado 19/10/2026 con LEY F de A_DONDE_VA_STRATOS.md)
- **Prohibido usar emojis genéricos** en código nuevo. Todo icono visible debe salir de `Colores-y-Estetica/Iconos/`.
- **Paso 1 — buscar:** ante una acción que necesite icono, buscar en la carpeta `Iconos/` el más adecuado por significado (no por parecido visual).
- **Paso 2 — convertir:** base verde Stratos `#00ff88` (recolor de `fill` negro u otros tonos; se conservan los ya verdes). Variantes por alerta ya autorizadas: `Advertencia-naranja.svg` (`#ff8c00`), `Error-rojo.svg` (`#e53935`), `Exito-verde.svg`.
- **Paso 3 — colocar:** insertarlo donde corresponde con `<img src="../Colores-y-Estetica/Iconos/NOMBRE.svg" alt="" class="icono-inline">` (cartelera/menú) o la clase de icono que aplique en su módulo.
- **Tamaño (PUNTO 1 del 19/10):** fuera de botones ~30px (`.icono-inline` 30×30, `.icono-placeholder` 30px); dentro de botones intacto (1.2em; `icono-comunicacion`/`icono-hexagono` no se tocan).
- **LEY F — barra vs cartelera (diseño obligatorio de ahora en adelante):**
  - **Barra de notificaciones** (`#barra-notificaciones`): avisos inmediatos del sistema (confirmación/error/advertencia), 3 segundos, colores de contraste fijos. Icono por tipo: éxito→verde, advertencia→naranja, error→rojo.
  - **Cartelera** (`#zona-cartelera`): rota avisos + motivacionales (10 s alta, 6 s media, 4 s baja); respeta identidad corporativa. Icono por jerarquía/urgencia, NO por tipo genérico: naranja = mensaje de un superior (directo o indirecto); rojo = urgente/atención inmediata; verde = normal (colegas, subalternos, sistema, motivacionales). Naranja/rojo = prioridad alta (10 s en pantalla).
  - **Login sin cartelera:** solo barra de notificaciones + formulario + biometría.
  - **Futuros módulos** (correos, tareas, chats): aplican la misma regla jerárquica de la cartelera.
- **Si no hay uno adecuado:** NO poner uno genérico, NO inventar, NO reutilizar otro icono "parecido". Avisar primero al Arquitecto para que autorice/inserte el SVG buscado, y solo después colocarlo.
- **Aplica a futuro:** cada icono nuevo que se pida sigue estos pasos + LEY F + aviso previo si falta.

---

## BITÁCORA (historial de lo realizado)
### 20/10/2026 — instrucciones.md PUNTOS 1-6: PANTALLA DE CORREOS (reajuste estilo Gmail)
- **Punto 1 — hecho:** `.menu-correos` al 25% del ancho y `.contenido-correos` al 75% (`flex: 1`); `.btn-vista-correo` a 0.78rem con `white-space: nowrap` para que "BORRADORES"/"ELIMINADOS" quepan en una línea.
- **Punto 2 — hecho:** textos de botones de vista y de la lista de correos usan `var(--color-letras)`; botón activo con fondo de cubierta resaltado; borde iluminado de fila solo en hover/selección; botón Volver (flecha izquierda) a 30px (`.btn-volver-correos .icono-inline`).
- **Punto 3 — hecho:** modal de redacción con barra de herramientas de texto (Negrita/Cursiva/Subrayado/Color/Lista viñetas/Lista numerada) sobre área contenteditable; `De:` bloqueado con correo del perfil; firma automática al final si está configurada; adjuntar abre explorador; botones ENVIAR/ENVIAR+TAREA/ENVIAR+ALARMA/DESCARTAR con diseño unificado.
- **Punto 4 — hecho:** "Responder" y "Reenviar" abren el modal de redacción citando el original ("El [Fecha] a las [Hora], [Remitente] escribió:"); botón "Reenviar" añadido al modal de detalle.
- **Punto 5 — hecho:** "Archivar" abre modal para asignar carpeta (Proveedores/Cotizaciones/Archivo/Otra); auto-archivo de Vero tras tiempo prudencial (temporizador, valor a definir por el Arquitecto).
- **Punto 6 — hecho:** textos de la lista de correos (remitente/asunto/previa/fecha) usan `var(--color-letras)`; fondo gris de fila quitado (`transparent`).
- **Verificación:** esprima OK en logica.js y datos.js (analisis sintactico real, 0 fallos). Pendiente: Ctrl+F5 del Arquitecto + sincronizar a GitHub.

### 21/10/2026 — instrucciones.md (4 puntos nuevos + Reglas de Oro)
- **Reglas de Oro:** todo texto/botón/título usa `var(--color-letras)`; todo fondo de botón `var(--color-botones)`; modales informativos (máx 500px) vs de trabajo (máx 875px).
- **Punto 1 — hecho:** `ajustarLayoutAdaptativo()` incluye `pantalla-correos` en pantallas anchas (875px); `.modal-redactar` a `max-width: 875px` (modal de trabajo); modales informativos (`modal-detalle-correo`, `ventana-aviso-contacto`) se mantienen en 500px.
- **Punto 2 — hecho:** `.btn-cerrar`, `.item-correo-*` y `#detalle-correo-cuerpo` (`text-align: left`) usan `var(--color-letras)`; `aplicarCambiosVisuales()` incluye `.btn-cerrar` en los botones dinámicos.
- **Punto 3 — hecho:** `.btn-vista-correo` normal fondo `--color-botones` + texto `--color-letras` + sin sombra + 0.78rem + no-wrap; activo/hover con texto y borde `--color-primario` + halo.
- **Punto 4 — hecho:** barra de formato **arriba** del área de texto (debajo del asunto); área ancho completo; cita (Responder/Reenviar) debajo con cursor al inicio para escribir arriba; uniforme en Redactar/Responder/Reenviar.
- **Lista de correos:** tamaño devuelto a normal (remitente 15px, asunto/previa 14px, fecha 12px) para que no se vea gigante al ocupar el 75% de ancho.
- **Verificación:** esprima OK logica.js (0 fallos). Pendiente: Ctrl+F5 del Arquitecto + sincronizar a GitHub.


### 21/10/2026 (ajustes de cumplimiento Sección H de A_DONDE_VA_STRATOS.md)
- **Ajuste al 100% de la Sección H (Pantalla y botones - LEY DE DISEÑO):**
  - `.btn-formato` (N C S A * 1 del modal de redacción): fondo ahora `var(--color-botones)`, borde `var(--color-botones)`, hover con halo verde + borde `--color-primario` (antes fondo transparente). Cumple Regla de Iconos como Botones.
  - `.btn-adjunto-correo` (clip): fondo `var(--color-botones)`, borde `var(--color-botones)`, color `--color-letras` para el icono, hover con halo verde. Cumple Regla de Iconos como Botones.
  - `.etiqueta-redaccion`: color cambió de `--color-primario` a `--color-letras` (Cumple Color de letras).
  - `.redactar-de`: color cambió de `--color-texto` a `--color-letras` (Cumple Color de letras).
  - `aplicarCambiosVisuales()` (logica.js): selector de botones dinámicos ahora incluye `.btn-formato` y `.btn-adjunto-correo` para aplicar color de botones y letras al cambiar Identidad Corporativa.
- Los 4 puntos de instrucciones.md ya estaban hechos; estos ajustes cierran el cumplimiento al 100% de la Sección H.
- **Verificación:** esprima OK logica.js (0 fallos). Pendiente: Ctrl+F5 del Arquitecto + sincronizar a GitHub.

### 23/10/2026 — Punto Único: Optimización de aplicación de identidad corporativa (el "nudo")
- **estilos.css:** regla universal `*` ahora incluye `color: var(--color-letras);` para que todos los textos hereden el color automáticamente. Botones del sistema (`.btn-principal`, `.btn-secundario`, `.btn-peligro`, `.btn-accion`, `.btn-cerrar`) ya usaban `background: var(--color-botones, ...)` — verificado, sin cambios.
- **logica.js:** `aplicarCambiosVisuales()` deja de recorrer elementos (se eliminaron los `querySelectorAll` masivos de textos y botones que aplicaban `style.color`/`style.backgroundColor` inline). Ahora solo inyecta las variables CSS en la raíz (`--color-fondo`, `--color-texto`/`--color-letras`, `--color-primario`/`--color-botones`) mediante `document.documentElement.style.setProperty`. El CSS pinta automáticamente textos y botones. `aplicarBrandingGlobal()` ya inyectaba variables en la raíz y no recorre elementos masivos — sin cambios.
- **Verificación:** esprima OK logica.js y datos.js (0 fallos).

---

## HISTORIAL ANTIGUO MOVIDO

Todas las entradas de bitácora de **19/10/2026 hacia atrás** (agosto, septiembre y primera mitad de octubre 2026), ya 100% hechas y cerradas, se trasladaron a:

`instrucciones-IA/Historial_Bitacora.md`

`MEMORIA.md` conserva solo: estructura/protocolo, mapa de archivos, VISIÓN DEL ARQUITECTO, reglas de iconos, y las entradas de bitácora de octubre 2026 (20/10 y 21/10).

