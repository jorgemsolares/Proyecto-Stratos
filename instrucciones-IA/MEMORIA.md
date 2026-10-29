# 📌 MEMORIA DE PROYECTO — STRATOS

> **Documento de continuidad.** Este archivo es la "memoria viva" del proyecto.
> La IA (asistente) DEBE leerlo al inicio de cualquier sesión ANTES de responder o actuar.
> El Arquitecto (dueño) lo mantiene actualizado en cada avance.

---

## CÓMO USAR ESTE ARCHIVO (protocolo)

1. **Al abrir una sesión nueva**, la IA debe leer primero `A_DONDE_VA_STRATOS.md` + `Minutas de Chats` (https://github.com/jorgemsolares/Comunicaci-n-IA-Internet/blob/main/Minutas%20de%20Chats), luego `instrucciones-IA/Historial_Bitacora.md` (bitácora cerrada, 19/10/2026 hacia atrás), y después TODOS los archivos del sistema (los que están en las carpetas `Cuerpo-y-Textos`, `Colores-y-Estetica`, `Motor-Logica-y-Acronimos`, y los de `instrucciones-IA`).
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
### 23/10/2026 — Punto 1: Avisos de feedback en botones de ejecución (Identidad)
- **logica.js `salvarIdentidad()`:** ya no bloquea el guardado si faltan campos. Guarda siempre lo que haya; si faltan campos (logo/misión/visión/valores/etc.) muestra aviso Amarillo "Se guardó el avance. La identidad aún está incompleta." y redirige al Organigrama; si todo está completo marca completada=true, muestra aviso Verde "Identidad guardada correctamente." y redirige al Organigrama.
- **logica.js `saltarIdentidad()`:** aviso Amarillo "Atención: los cambios no se guardaron. Si saliste sin guardar, lo escrito se borrará." y redirige al Organigrama.
- **index.html:** botón "CONTINUAR SIN COMPLETAR" ya usa `onclick="saltarIdentidad()"` (no había `ondblclick` que corregir).
- **Verificación:** esprima OK logica.js (0 fallos).


### 23/10/2026 — Punto 1: Corrección del nodo principal y edición en el Organigrama Personal
- **logica.js `renderizarOrganigrama()`:** tras asegurar que existe `datosOrganigrama`, se sincroniza el nodo raíz (usuario actual) con `usuarioActivo` (nombre, apellidos, nombreCompleto, puesto, acrónimo, teléfono, email, idEmpleado, paisPrefijo) para no mostrar datos desactualizados. Se guarda en storage.
- **logica.js `verDetalleContacto(id)`:** se valida si `id === usuarioActivo.id` (esUsuarioActivo). Si es el usuario activo (nodo principal), al abrir el modal de detalle el botón "EDITAR" se reasigna para redirigir a `registro-invitacion` (Mi Perfil) en lugar de abrir el modal de edición de contactos.
- **logica.js `guardarContacto()`:** ya cuenta con `return` después de `lista[indice] = datosActualizados` en el bloque `if (enEdicion)`, evitando que el flujo continúe a la creación de un contacto nuevo (sin duplicados).
- **Verificación:** esprima OK logica.js (0 fallos).

### 23/10/2026 — Punto 1: Ajuste de proporción y botones laterales en Correos
- **estilos.css `.menu-correos`:** ancho reducido de 25% a 20% (`flex: 0 0 20%` / `max-width: 20%`) para dar más espacio a la lectura de correos (proporción 1/5 + 4/5).
- **estilos.css `.btn-vista-correo`:** `text-align` cambiado de `left` a `center` para que el texto de los botones del menú esté centrado.
- **estilos.css `.item-correo-previa`:** agregado `text-align: left` para asegurar que la vista previa del correo esté alineada a la izquierda y respete `var(--color-letras)`.
- **logica.js datos de prueba:** asunto del correo demo2 cambiado de "Bienvenido a tu bandeja Stratos" a "Bienvenido a Stratos".
- **logica.js `renderizarListaCorreos()`:** agregado título de carpeta seleccionada (ej. "Recibidos", "Enviados") al inicio de la lista, usando `nombreCorreoVista(vistaCorreoActual)`.
- **Verificación:** esprima OK logica.js (0 fallos).

### 23/10/2026 — Punto 1: Corrección de la lista y modal de detalle de correos
- **estilos.css `#detalle-correo-cuerpo`:** agregado `color: var(--color-letras)` para que el cuerpo del mensaje use el color de identidad corporativa.
- **estilos.css `.item-correo.no-leido`:** agregada película de fondo (`background: rgba(255,255,255,0.06)`) para diferenciar visualmente los correos no leídos.
- **estilos.css `.modal-footer`:** `flex-wrap: nowrap` y `justify-content: center` para que los 4 botones (Responder, Reenviar, Archivar, Eliminar) queden en una sola línea; tamaño de letra reducido a 0.85rem.
- **index.html `modal-detalle-correo`:** el `<h3>` del título ahora tiene `id="detalle-correo-titulo"` para poder cambiarlo dinámicamente.
- **logica.js `abrirDetalleCorreo(id)`:** 
  - El título del modal ahora muestra "Detalle - [nombre de la bandeja]" (ej. "Detalle - Recibidos").
  - La meta del remitente cambió de "remitente → destinatarios" a "De: remitente".
  - Al abrir un correo se marca como leído (`c.leido = true`) y se guarda.
- **logica.js `renderizarListaCorreos()`:**
  - Agregado checkbox "Seleccionar todos" en la parte superior de la lista.
  - Cada fila de correo ahora incluye un checkbox individual.
  - Los correos no leídos reciben la clase `no-leido` (película de fondo).
- **Verificación:** esprima OK logica.js (0 fallos).

### 23/10/2026 — Punto 1: Reorganización visual del bloque de IA en Configuración + Punto 2: Área de Firma del Usuario
- **PUNTO 1 — index.html:** El bloque de IA ahora usa contenedor `.config-ia-row` (flex fila, 50/50). Izquierda: título + texto "Personaliza a tu Asistente Ejecutivo...". Derecha: esfera `.boton-ia` reducida a 70x70px. Alto del bloque reducido con padding 12px.
- **PUNTO 1 — estilos.css:** Agregadas clases `.config-ia-row`, `.config-ia-izquierda`, `.config-ia-derecha`; `#boton-ia-configuracion` a 70x70px con rótulos más pequeños.
- **PUNTO 2 — index.html:** Eliminado bloque de "🔒 Seguridad" (biometría visual). Creado bloque "✍️ Firma del Usuario" con: textarea `#config-firma-texto` (5 líneas), barra de herramientas con 4 botones (Tipografía, Estilo, Tamaño, Color), checkbox `#config-firma-automatica` ("Insertar firma automáticamente en los correos").
- **PUNTO 2 — estilos.css:** Clases `.config-firma-toolbar` y `#config-firma-texto`.
- **PUNTO 2 — datos.js:** `configuracionPersonal` ahora incluye `firmaTexto` ("") y `firmaAutomatica` (false).
- **PUNTO 2 — logica.js `guardarConfiguracion()`:** guarda `firmaTexto` y `firmaAutomatica` desde el DOM.
- **PUNTO 2 — logica.js `irAPantalla()`:** al cargar `pantalla-configuracion`, recupera `firmaTexto` y `firmaAutomatica` del storage.
- **PUNTO 2 — logica.js:** funciones `abrirSelectorFirmaTipografia/Estilo/Tamano/Color()` para personalizar la firma.
- **Verificación:** esprima OK logica.js y datos.js (0 fallos).

### 23/10/2026 — PUNTO 1: Lógica del sello "FIRMA" en áreas de escritura
- **logica.js `abrirRedaccionCorreo()`:** tras limpiar el área de texto, inserta 5 líneas en blanco + sello "FIRMA" (`<span class="sello-firma" onclick="insertarFirma()">FIRMA</span>`). Si `config-firma-automatica` está activo y hay `firmaTexto`, se inserta la firma automáticamente al abrir.
- **logica.js `prepararRedaccionResponderReenviar()`:** la cita del correo original se inserta debajo del sello FIRMA (usando `insertAdjacentHTML` después del sello), no reemplazando todo el contenido.
- **logica.js `insertarSelloFirma(mensaje)`:** nueva función que pone el sello FIRMA con 5 líneas en blanco previas.
- **logica.js `insertarFirma()`:** nueva función. Si hay `firmaTexto` configurada, sustituye el sello por el texto. Si no hay firma, muestra aviso Amarillo y redirige a Configuración con foco en `#config-firma-texto`.
- **estilos.css `.sello-firma`:** estilo de marca de agua (letra gris tenue `rgba(255,255,255,0.45)`, mayúsculas, subrayada, 1.3rem). Hover: escala 1.08. Active: halo verde Stratos.
- **Verificación:** esprima OK logica.js (0 fallos).

### 25/10/2026 — instrucciones.md (PUNTOS 1, 2 y 3): Reparación de modal de redacción, botones de color y edición de contacto
- **PUNTO 1 — hecho:** `logica.js` línea 4056: `configuracionPersonal.firma` corregido a `configuracionPersonal.firmaTexto` para consistencia con la propiedad definida en `datos.js` (línea 471, `firmaTexto: ""` ya existía).
- **PUNTO 2 — hecho:** `index.html` líneas 193-195: los botones "Fondo", "Letras", "Botones" ahora pasan `event` a `aplicarCambioEstetico(tipo, event)` para que `asignarDestino` reciba el botón presionado y aplique la clase `activo`. `colorSeleccionado` se captura correctamente en `seleccionarColor()` y `aplicarCambiosVisuales()` se llama después del switch.
- **PUNTO 3 — hecho:** `logica.js` `editarContactoDesdeDetalle()`: agregada validación al inicio: si `contactoEnEdicion.id === usuarioActivo.id`, cierra el modal y redirige a `registro-invitacion` (Mi Perfil).
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 26/10/2026 — instrucciones.md (PUNTO ÚNICO): Reparación del color de fondo en Identidad Corporativa
- **Punto Único — hecho:** `estilos.css` `#app-container` ahora usa `background: var(--color-fondo, rgba(255, 255, 255, 0.03))` para pintar el color de fondo en el área de trabajo. `logica.js` `aplicarCambiosVisuales()` aplica `configuracionEstetica.colorFondo` únicamente a `#app-container` (nunca al `body`), tanto al pulsar "Fondo" en tiempo real como al recargar la página (window.onload ya lo invoca tras cargar la identidad desde localStorage). El fondo general de la app (`body`) se mantiene oscuro.
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 26/10/2026 — instrucciones.md (PUNTO ÚNICO): Arreglar el botón "Fondo" en Identidad Corporativa
- **Punto Único — hecho:** `index.html` líneas 193-195 ya pasan `event` a `aplicarCambioEstetico('fondo'/'texto'/'botones', event)`. `logica.js` `aplicarCambiosVisuales()` se corrigió: se eliminó `contenedor.style.backgroundColor = configuracionEstetica.colorFondo;` (que pisaba el CSS) y se conserva `root.setProperty('--color-fondo', configuracionEstetica.colorFondo);` para que el CSS de `#app-container` (`var(--color-fondo, ...)`) pinte el área de trabajo. El `body` no se toca.
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 26/10/2026 — instrucciones.md (PUNTO ÚNICO): Rediseño del algoritmo de la paleta de colores (diversidad)
- **Punto Único — hecho:** `datos.js` agregó constantes globales `COLOR_VERDE_STRATOS`, `COLOR_ROJO_STRATOS`, `COLOR_NARANJA_STRATOS`, `COLOR_AZUL_FONDO_GENERAL`, `COLOR_AZUL_AREA_UTIL`. `logica.js` agregó funciones globales `hexToRgb` y `mezclarColores(hex1, hex2, porcentaje1)`, y reescribió `analizarColoresLogoAutomatico()` con los 3 casos matemáticos (Caso 0: logo blanco/negro → 8 colores base; Caso 1: un color → color + 2 mezclas + blanco/negro/azules/naranja; Caso 2: 2+ colores → 2 colores + blanco/negro/verde/naranja + 2 mezclas). `generarPaleta()` renderiza exactamente los 8 colores del algoritmo sin rellenar con colores de seguridad.
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 26/10/2026 — instrucciones.md (PUNTO ÚNICO): Corrección del algoritmo de la paleta (agrupación de colores similares)
- **Punto Único — hecho:** `logica.js` `analizarColoresLogoAutomatico()` corregido: (1) filtra blanco/negro por brillo (umbral >245 / <10) en el escaneo inicial; (2) agrupa colores similares con distancia RGB < 50 promediando ponderado por conteo; (3) cuenta los colores reales tras el agrupamiento; (4) aplica los 3 casos matemáticos (0: base Stratos, 1: 1 color + 2 mezclas, 2: 2 colores + combinaciones). `generarPaleta()` renderiza los 8 colores del algoritmo.
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 26/10/2026 — instrucciones.md (PUNTO ÚNICO): Mejorar el contraste de las combinaciones en la paleta
- **Punto Único — hecho:** `logica.js` agregó funciones globales `calcularLuminosidad(hex)` (luminancia relativa WCAG 0-1) y `obtenerPorcentajeMezcla(colorBase)` (60% si el color base es oscuro, 75% si es claro). En `analizarColoresLogoAutomatico()`, las mezclas de los Casos 1 y 2 usan ahora el porcentaje dinámico según la luminosidad del color base del logo: 60% base + 40% Stratos si es oscuro (más fuerza al Rojo/Verde), 75% base + 25% Stratos si es claro. El Caso 0 no se modifica (no hay color base del logo).
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 26/10/2026 — instrucciones.md (PUNTO ÚNICO): Rediseño de la paleta e inserción de botones de control de identidad
- **Punto Único — hecho:** `estilos.css` `.color-cuadro` pasó de `aspect-ratio: 1` a `height: 40px; width: 100%;` (rectángulos horizontales). Agregado `.controles-paleta-botones` con `display: grid; grid-template-columns: repeat(7, 1fr);` y ajuste de texto de botones (`font-size 0.85rem`, `white-space nowrap`, `text-overflow ellipsis`). `index.html` insertó contenedor con 2 botones justo arriba de la paleta: Botón 1 "Mantener colores actuales" (`.btn-principal`, `grid-column: 2 / 5`) y Botón 2 "Volver a colores Stratos" (`.btn-peligro`, `grid-column: 6 / 9`). `logica.js` agregó `mantenerColoresActuales()` y `restaurarColoresStratos()` (resetea `colorFondo`/`colorTexto`/`colorBotones` a `#0b0f19`/`#ffffff`/`#00ff88`, llama `aplicarCambiosVisuales()` y actualiza vistas previas).
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 28/10/2026 — instrucciones.md (PUNTOS 1, 2 y 3): Identidad Corporativa — textos, paleta y botones de control
- **Punto 1 — hecho:** `estilos.css` `input::placeholder`/`textarea::placeholder` ahora usan `var(--color-letras)` con `opacity: 0.6`; agregadas reglas `.controles-destino-color p` y `.preview-colores span` con `color: var(--color-letras)`. `logica.js` `aplicarCambiosVisuales()` aplica el color de letras dinámico a los `p` y `span` de la sección de paleta.
- **Punto 2 — hecho:** `estilos.css` `.color-cuadro` vuelve a cuadrado (`width: 100%; aspect-ratio: 1;`), quitando `height: 40px;`; `.contenedor-paleta-ocho` conserva `repeat(8, 1fr)`.
- **Punto 3 — hecho:** `estilos.css` `.controles-paleta-botones button` igualado a `.btn-opcion` (Fondo/Letras/Botones): `padding: 8px 12px`, `font-size: 0.8rem`, `border: 2px solid transparent`; el texto se ajusta en una sola línea (Sección H).
- **Verificación:** esprima OK logica.js y datos.js (0 problemas).

### 28/10/2026 — instrucciones.md (PUNTO ÚNICO): Botones del área de Firma sin prompt()
- **Punto Único — hecho:** `index.html` área Firma: quitados los 4 botones `onclick` que llamaban a `prompt()`; agregados `<select>` de Tipografía (6 fuentes del Slogan), Estilo (Normal/Negrita/Cursiva/Negrita Cursiva) y Tamaño (10-18px), más botón desplegable de Color con muestra + lista de 8 cuadros de color (ids propios `#sel-firma-*`, `#btn-color-firma`, `#muestra-color-firma`, `#lista-color-firma`). `estilos.css`: agregadas reglas `.selector-color-firma`, `.btn-desplegable-firma`, `.muestra-color-firma`, `.lista-color-firma`, `.opcion-color-firma` (patrón igual al Slogan, z-index 50). `logica.js`: eliminadas las 4 funciones `abrirSelectorFirma*` que usaban `prompt()`; creadas `aplicarTipografiaFirma/Estilo/Tamano()`, `alternarDesplegableFirma()`, `elegirColorFirma()`, `poblarSelectorColorFirma()` y cierre al clic fuera (bandera `document._cierreDesplegableFirma`). No se tocaron los botones del Slogan ni el diseño general de Configuración.
- **Verificación:** se eliminaron todas las referencias a `abrirSelectorFirma*` y `prompt()` del área Firma; llaves de `logica.js` balanceadas (969/969). Node/esprima no disponible en el entorno para validación automática.

### 28/10/2026 — instrucciones.md (PUNTOS 1, 2 y 3): Botones de control de identidad
- **Punto 1 — hecho:** `index.html` quitados `grid-column: 2 / 5` y `grid-column: 6 / 9` de los botones "Mantener colores actuales" y "Volver a colores Stratos"; `estilos.css` `.controles-paleta-botones button` igualado a `.btn-opcion` con `padding: 8px 12px`, `border: 2px solid transparent`, `font-size: 0.7rem`, `white-space: nowrap` para que ambos botones tengan mismo tamaño, estén centrados en su celda y el texto quepa en una línea.
- **Punto 2 — hecho:** `logica.js` `mantenerColoresActuales()` ahora llama `guardarEnStorage(STORAGE_KEYS.IDENTIDAD, identidadCorporativa)` tras mostrar el aviso, para que los cambios se persistan con el logo nuevo.
- **Punto 3 — hecho:** `logica.js` `restaurarColoresStratos()` ya llama `guardarEnStorage(STORAGE_KEYS.IDENTIDAD, identidadCorporativa)` tras `aplicarCambiosVisuales()`, para que el restablecimiento a colores Stratos por defecto sea permanente al recargar.
- **Verificación:** `guardarEnStorage` y `STORAGE_KEYS.IDENTIDAD` existen y se usan en otros puntos del código; llaves de `logica.js` balanceadas (971/971). Node/esprima no disponible en el entorno para validación automática.

### 28/10/2026 — instrucciones.md (PUNTOS 1, 2 y 3): Diseño y textos de botones Firma
- **Punto 1 — hecho:** `index.html` área Firma: quitados los `<select>` y devueltos los textos a botones reales ("Tipografía", "Estilo", "Tamaño", "Color") en una fila horizontal (`.config-firma-toolbar` flex, 4 `.campo-firma-desplegable` con `flex:1`, mismo tamaño, `text-overflow: ellipsis`). Cada botón abre un desplegable propio de la app (Tipografía: 6 fuentes del Slogan; Estilo: Normal/Negrita/Cursiva/Negrita Cursiva; Tamaño: 10-18px; Color: muestra + 8 cuadros de color). Slogan: ya cumplía con textos "Tipografía:/Estilo:/Color:" y desplegables que aparecen al presionar (no se tocó). `estilos.css`: `.btn-firma` con fondo, borde, halo y efectos hover/active; `.desplegable-firma-lista` z-index 50. `logica.js`: creadas `alternarDesplegableFirmaTipografia/Estilo/Tamano()`, `poblarListaFirma()`, `cerrarDesplegablesFirma()` y cierre al clic fuera (bandera `document._cierreDesplegablesFirma`). No se usan `prompt()`/`alert()`/`confirm()`.
- **Punto 2 — hecho:** `index.html` quitado el emoji (✍️) del título; ahora `<h3>Firma del Usuario</h3>` sin emoji, igual que los demás títulos de Configuración.
- **Punto 3 — hecho:** `estilos.css` `#config-firma-texto` con `height: 140px` y `resize: vertical` (contenedor fijo; solo el texto cambia de tamaño con los botones de formato).
- **Verificación:** llaves de `logica.js` balanceadas (995/995). Node/esprima no disponible en el entorno para validación automática.

---
---

## HISTORIAL ANTIGUO MOVIDO

Todas las entradas de bitácora de **19/10/2026 hacia atrás** (agosto, septiembre y primera mitad de octubre 2026), ya 100% hechas y cerradas, se trasladaron a:

`instrucciones-IA/Historial_Bitacora.md`

`MEMORIA.md` conserva solo: estructura/protocolo, mapa de archivos, VISIÓN DEL ARQUITECTO, reglas de iconos, y las entradas de bitácora de octubre 2026 (20/10 y 21/10).

