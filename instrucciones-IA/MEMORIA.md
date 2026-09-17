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

---

## CÓMO TRABAJAR CON LA IA (Reglas de comunicación)

> **Estas reglas son obligatorias para la IA en cada sesión. El Arquitecto no debe repetirlas cada vez.**

- La IA debe dar respuestas **cortas y al grano**.
- La IA **nunca** debe tocar el código sin permiso explícito del Arquitecto.
- Se trabaja **una sola área o funcionalidad a la vez**.
- **Nada se deja a medias.** Si algo no se termina, se anota claramente en la sección PENDIENTES de esta bitácora.
- La IA debe respetar el protocolo de lectura: primero `A_DONDE_VA_STRATOS.md` + `Minutas de Chats`, luego TODOS los archivos del sistema.

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

> **NOTA (duplicación — RESUELTA 28/08/2026):** La carpeta vieja duplicada
> `Proyecto-Stratos` fue ELIMINADA. Ahora hay UN SOLO repositorio en la raíz,
> donde corre la app REAL (los archivos numerados arriba). ✅

---

## ESTADO ACTUAL (actualizado el 29/08/2026)

- La app que corre es la de las carpetas de la **raíz** (`Cuerpo-y-Textos`, `Colores-Estetica`, `Motor-Logica-y-Acronimos`).
- El `index.html` referencia correctamente a `estilos.css`, `datos.js` y `logica.js`. ✅
- **28/08/2026:** Enlace GitHub resuelto (upstream configurado), duplicado `Proyecto-Stratos` ELIMINADO (un solo repositorio) y cadenas corruptas de `datos.js` corregidas. El `DOMContentLoaded` final de `datos.js` se queda donde está (opción A).
- **Decisiones del 28/08 ya cumplidas:** GitHub como respaldo automático ✅ (script `subir_automatico.ps1` activo), cambios solo en la raíz `Stratos` ✅, duplicado eliminado ✅, `MEMORIA.md` de continuidad ✅.
- **29/08/2026:** Revisadas las 3 opciones de Configuración (Sonido, Vibración, Notificaciones): guardan la preferencia pero NO ejecutan ninguna acción (no existe código de audio/vibración/notificación en el proyecto). Decisión del Arquitecto: dejar PENDIENTE su activación hasta desarrollar la **Pantalla Comunicación** (siguiente paso del proyecto).
- **16/09/2026:** Aplicados los 4 PUNTOS de `instrucciones.md` (ver detalle en BITÁCORA): zona superior dividida (branding 1/3 + cartelera 2/3), Configuración limpia con botón de IA (esfera con humo), saludo "Hola [Nombre]" en Login con biometría por dispositivo, y botón flotante de IA con ventana emergente y voz. Pendiente: verificación del Arquitecto en el navegador (la hará el 17/09).

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

---

## BITÁCORA (historial de lo realizado)

### 16/09/2026 — PUNTO 1 (instrucciones.md): zona superior dividida + ajustes de la cartelera
- **`index.html`:** nueva `#zona-superior` dividida — izquierda `#zona-branding` (1/3: branding corporativo o STRATOS) y derecha `#zona-cartelera` (2/3: el mensaje rotativo/avisos). IDs intactos; el cuerpo de pantalla crece al liberar la fila completa que ocupaba el mensaje.
- **`estilos.css` — nueva sección 2.2.1 ZONA SUPERIOR:** fila 1/3+2/3 con altura compartida, responsive apilado en ≤768px. Branding compacto y centrado dentro de su área: logo en espacio fijo 140×40 px (120×36 móvil) con `object-fit: contain` (cualquier foto se ajusta sin deformarse) y slogan acotado al MISMO ancho, centrado (no desborda; baja en líneas). Cartelera con ancho automático (flex).
- **`logica.js` — `obtenerFragmentosMisionVisionValores()`:** se eliminó el corte forzado a 150 caracteres que amputaba frases largas y dejaba colas huérfanas (causa del mensaje suelto "los objetivos" en la cartelera). Ahora cada fragmento es la frase completa, separada solo en fronteras naturales (comas/puntos/dobles espacios).
- **`logica.js` — `construirColaMensajes()`:** el mensaje del día se invalida si el texto guardado ya no existe en los fragmentos actuales (al editar Misión/Visión/Valores se rifa uno nuevo de inmediato; ya no hay que esperar a mañana).
- **PUNTO 4 (instrucciones.md) — Configuración limpia + botón de IA:**
  - **`index.html`:** eliminada la sección completa "🔔 Notificaciones" (casillas Sonido, Vibración y Push — Push incluida porque también es gestión de notificaciones; el sistema ahora toma los permisos autorizados del dispositivo). En su lugar quedó la sección "🤖 Configuración de IA" con el botón `#boton-ia-configuracion` (clase `.boton-ia`; sin lógica todavía — Vero se conecta en el PUNTO 7). Nota: "Modo Nocturno" no existía como opción en pantalla (`temaOscuro` es fijo `true`, definido por el No.1).
  - **`datos.js`:** claves de traducción `cfg_notif`/`cfg_sonido`/`cfg_vibracion`/`cfg_push` reemplazadas por `cfg_ia`/`cfg_ia_desc`/`cfg_ia_boton` (ES/EN).
  - **`estilos.css`:** nueva sección 3.12 BOTÓN DE IA — rediseñada como **esfera de 110px** con el diseño del PUNTO 7 adelantado: humo verde circulando dentro (2 nubes difusas animadas), rótulo "Configuración IA" sobre la esfera y **halo verde Stratos** al posicionar el cursor o presionar. Este diseño (`.boton-ia`) es la base reutilizable del botón flotante de las demás pantallas (PUNTO 7). La clase genérica `.config-options` quedó sin uso (no se tocó).
  - **`logica.js`:** `guardarConfiguracion()` ya no lee sonido/vibración/push — guarda solo idioma y biometría. Idioma, Seguridad, Recuperación de Contraseñas y Acciones Rápidas intactos.
  - **Rediseño visual del botón (comentario del Arquitecto):** esfera centrada en su área con rótulo en dos líneas — "Configuración" pequeña arriba y "IA" grande abajo (traducciones `cfg_ia_boton1`/`cfg_ia_boton2`). **Decisión para el PUNTO 7:** en las demás pantallas el botón flotante tendrá el TAMAÑO del círculo del libro (tuerca) y estará centrado en su área. El texto "Vero" se retiró de la app: el usuario nombrará a su asistente en la Configuración de IA.
- **Pendiente de verificación del Arquitecto en el navegador** (recargar con Ctrl+F5 por caché de CSS/JS).
- **PUNTO 6 (instrucciones.md) — Saludo "Hola [Nombre]" en Login:**
  - **HTML:** ya existía el saludo `#bienvenida-usuario` ("Hola" + `#nombre-usuario-login`); agregada la fila de biometría `#opciones-biometria` (facial 👤 / patrón 🔳 / huella ☝️) debajo del botón ENTRAR.
  - **`logica.js` — nuevas funciones:** `actualizarSaludoLogin()` (el saludo cambia EN VIVO al escribir/elegir nombre del desplegable, ANTES de presionar ENTRAR; si el campo está vacío usa el ÚLTIMO USUARIO del sistema); `inicializarBiometria()` (detecta autenticador de plataforma del dispositivo vía WebAuthn `isUserVerifyingPlatformAuthenticatorAvailable` — si no hay, los botones quedan atenuados); `intentarBiometria()` (avisa disponibilidad; su activación real queda enlazada al checkbox "Habilitar autenticación biométrica" de Configuración).
  - **Al ENTRAR:** `validarEntrada()` guarda `stratos_ultimo_usuario` y llama `actualizarSaludoLogin()` → el saludo cambia de nombre y luego entra (el usuario ve el cambio).
  - **Cartelera:** en `construirColaMensajes()` se agregó el mensaje tipo 'saludo' "👋 Hola, [nombre]" que aparece SOLO la primera vez del día (clave `stratos_ultimo_saludo_fecha`; base para la estadística de horario de trabajo).
  - **`datos.js`:** nuevas claves en `STORAGE_KEYS`: `ULTIMO_USUARIO` y `ULTIMO_SALUDO`.
  - **`estilos.css`:** nueva sección 3.13 OPCIONES BIOMÉTRICAS — círculos de 44px con halo verde al pasar el mouse y estado atenuado cuando el dispositivo no ofrece autenticador.
  - **Nota (limitación honesta):** el patrón visual no es autenticable vía navegador; los botones detectan el autenticador general del equipo (huella/PIN/cara según dispositivo). El registro biométrico por usuario se definirá más adelante (requiere decisión del Arquitecto).
- **PUNTO 7 (instrucciones.md) — Botón de IA (esfera + ventana emergente + voz):**
  - **HTML:** botón flotante `#boton-ia-flotante` (misma esfera `.boton-ia`, rótulo "Stratos", TAMAÑO del círculo del libro/tuerca — 50px desktop, 45px móvil — abajo-CENTRO, decisión del Arquitecto) + ventana emergente `#ventana-ia` (estado "Escuchando.../Respondiendo...", ⏸ PAUSA, ✏️ editar, ✕ cerrar, líneas de lo que dice el usuario y de la IA, campo de escritura si no hay micrófono). En Configuración se agregó el campo "Nombre de tu asistente" (`#config-nombre-asistente`; el comando de activación es "Hola [nombre]"; predeterminado "Vero" — el usuario lo cambia).
  - **`logica.js` — nueva sección 33 (asistente):** `activarBotonIA()` (pitido WebAudio sin archivos, abre ventana, halo verde, auto-cierre), `iniciarEscuchaIA()` (Web Speech API; sin micrófono → entrada por teclado), `alternarPausaIA()` (PAUSA corrige manualmente), `editarTextoIA()`/`enviarTextoIA()`, `cerrarVentanaIA()`, `programarCierreAutomaticoIA()` (**(palabras/3.5)+0.75 s**, solo tras responder), `procesarComandoIA()` (confirmación "Hola [nombre]" obligatoria; comandos locales: abrir pantallas, hora, frase motivacional), `responderIA()` (texto + voz SpeechSynthesis según idioma). `mostrarBotonIA()` conectado a `irAPantalla()`: aparece en TODAS las pantallas excepto Login.
  - **`datos.js`:** `configuracionPersonal.nombreAsistente` (reemplazó al bloque notificaciones eliminado en el Punto 4); traducciones nuevas: `cfg_ia_nombre`, `ia_escuchando`, `ia_respondiendo`, `ia_pausa`, `ia_sin_micro`, `ia_escribe`. Al cargar la app se restaura el nombre del asistente.
  - **`estilos.css`:** secciones 3.14 (botón flotante, centrado con translateX, halo `ia-presionado`) y 3.15 (ventana abajo-centro, 70% ancho máx 420px, crece con el contenido, scroll interno).
  - **Límites actuales:** reconocimiento/voz dependen del navegador (Chrome sí; si no hay, funciona por teclado). Los comandos son LOCALES (sin servidor); la IA completa de Vero se integrará más adelante.
- **Pendiente de verificación del Arquitecto en el navegador** (recargar con Ctrl+F5).


### 29/08/2026 — Revisión de las 3 opciones de Configuración (sonido, vibración, notificaciones)
- **Diagnóstico (SIN tocar código):** las casillas `config-sonido`, `config-vibracion` y `config-push` SÍ guardan su estado en localStorage (`guardarConfiguracion()`), pero NO ejecutan acción real: no existe en todo el proyecto código de audio, vibración ni notificaciones. Hoy son casillas decorativas.
- **Falla adicional detectada:** al reabrir la app NO se restauran los estados guardados de esas casillas (solo se recupera el idioma); reaparecen marcadas por el defecto del HTML.
- **"Push":** el texto viene del diccionario `TRADUCCIONES` (`cfg_push`). Las push reales (app cerrada) requieren tokens por dispositivo (Firebase/servidor). Hoy no hay nada implementado → **0 tokens en uso**.
- **Decisión del Arquitecto:** dejar PENDIENTE hacerlas funcionales; se conectarán cuando exista "recibir notificaciones nuevas". **Siguiente paso: desarrollar la Pantalla Comunicación.** El diseño acordado quedó anotado en VISIÓN.
- **Revisión de pendientes solicitada por el Arquitecto:** `logica.js` SÍ fue renumerado (1→32) el 26/08, pero la renumeración de TÍTULOS internos de `datos.js` NO tiene registro de haberse hecho → anotada en PENDIENTES. Conteo de corrupciones: 14 detectadas (26/08) vs 11 corregidas (28/08); el escaneo final dio 0 caracteres corruptos en los 4 archivos → cerrado con verificación. La nota "NOTA IMPORTANTE (estado de duplicación)" de este archivo quedó desactualizada (decía que el duplicado existía) → corregida.
- La respuesta detallada de esta revisión quedó escrita en `explicacion.txt` (se limpiará al grabar bitácora, según nuevo protocolo de `instrucciones.md`).

### 28/08/2026 — GitHub resuelto, duplicado eliminado y frases corruptas corregidas
- **Enlace GitHub ↔ repositorio RESUELTO:** credenciales OK y **upstream configurado** (`git push -u origin main`). `git push`/`git pull` a secas y el botón Sync de VS Code ya funcionan. Local = `origin/main`.
- **Duplicado `Proyecto-Stratos` ELIMINADO:** antes de borrar se verificó que sus 9 commits ya existen en el repo real (`git cat-file`). Borrado con `rmdir /s /q` (el Explorador fallaba por el `.git` interno con archivos de solo lectura). Ahora hay UN SOLO repositorio en la raíz.
- **Cadenas corruptas de `datos.js` CORREGIDAS (11 líneas):** 4 frases motivacionales (L312/313/314/318: comunicación, éxito, acción, confía, día) + 7 comentarios (L38, 42, 43, 44, 47, 55, 568). Verificado: escaneo Python = 0 caracteres corruptos en los 4 archivos; `node --check` = sintaxis OK. Respaldo: `_respaldo_pre_reorg/datos.js.antes_fix_frases`.
- **Decisión DOMContentLoaded (cerrada):** el bloque de arranque final de `datos.js` SE QUEDA donde está (opción A del Arquitecto): funciona perfecto y moverlo no da beneficio.
- **Verificación del Arquitecto en navegador (28/08):** los 3 botones de añadir, la edición de contactos y el idioma ES/EN funcionan. ✅
- **PENDIENTE restante:** el "otro tema" del Arquitecto (punto 2 de la ruta) y, opcional, traducción de textos 100% dinámicos.

### 27/08/2026 — Arreglos: display en blanco, menú con símbolos raros y contactos (añadir/editar)
- **Display inicial en blanco** (textos crudos sin diseño): NO era error de código ni de texto. Live Server se abrió desde dentro de `Cuerpo-y-Textos`, y como el `index.html` enlaza sus hermanas con `../`, el navegador pedía rutas que no existen → 404 → rechazaba CSS/JS (MIME text/html). Solución (no código): abrir VS Code con la carpeta `C:\Proyectos\Para Crear APP\Stratos` como raíz y usar "Go Live"; la URL debe ser `http://127.0.0.1:5500/Cuerpo-y-Textos/index.html`.
- **Menú de la tuerca (abajo, derecha) con símbolos raros y tildes rotas:** corrupción de codificación (doble encoding) en el bloque `estadoPantallas` (nombres/iconos) de `datos.js`. Se restauraron los valores originales desde `_respaldo_pre_reorg/datos.js.BAK` (iconos 👤🔐🏢📊🌐💬⚠️ y "Comunicación"/"Configuración"). Respaldo previo: `_respaldo_pre_reorg/datos.js.antes_menu_fix`. Quedan PENDIENTES otras cadenas corruptas de datos (frases motivacionales, algunos comentarios, token/`Textos`).
- **BUG contactos (organigrama personal):** al editar agregaba el contacto como nuevo en lugar de modificarlo; y tras un borrar, los 3 botones "+ Añadir" (Colaborador/Indirecto/Observador) dejaban de funcionar.
  - **Causa raíz:** el modal `#modal-contacto` NO tenía el campo oculto `#modal-contacto-id` que el código espera. Por eso `mostrarFormularioContacto()` daba error (los botones no abrían) y al guardar el tipo quedaba siempre "directo". Además `guardarContacto()` estaba duplicado (secciones 26 y 32) y la versión activa SIEMPRE creaba un contacto nuevo (por eso borrar/editar agregaba duplicados).
  - **Arreglo aplicado:** (1) se agregó el campo oculto `#modal-contacto-id` al modal en `index.html`; (2) se eliminó el `guardarContacto()` duplicado; (3) `guardarContacto()` quedó unificado en la sección 32: en modo edición actualiza el contacto existente (mismo id) y en modo nuevo lo agrega respetando el tipo (directo/indirecto/observador); (4) `editarContactoDesdeDetalle()` deja el id y el tipo en el campo oculto para que guardar actualice y no duplique.
  - Respaldos: `_respaldo_pre_reorg/logica.js.antes_contactos_fix` e `_respaldo_pre_reorg/index.html.antes_contactos_fix`.
- **PENDIENTE:** Arquitecto verificar en el navegador los botones de añadir (los 3) y la edición de contactos; y sigue pendiente arreglar el enlace GitHub (tarea "Subir a Git") para que la bitácora y el código se suban solos.

### 27/08/2026 — Idioma Español/Inglés (Configuración)
- El selector de idioma en Configuración **sí guardaba** la preferencia (localStorage) pero **nunca la aplicaba**: no existía sistema de traducción, por eso elegir Inglés "no hacía nada".
- Se implementó el mecanismo para traducir **solo los textos que el usuario lee** (nunca lo que escribe):
  - Diccionario `TRADUCCIONES` (claves `data-i18n` → ES/EN) en `datos.js`.
  - Función `aplicarIdioma(idioma)` en `logica.js` que reemplaza textos y placeholders marcados.
  - `guardarConfiguracion()` ahora llama a `aplicarIdioma()` al guardar.
  - Al cargar la app se lee la configuración guardada y se aplica el idioma (`DOMContentLoaded` en `datos.js`).
- Se marcaron con `data-i18n` la pantalla de **Configuración** completa y la cabecera/branding (21 textos). El selector mantiene los nombres "Español/English" fijos (no se traducen a sí mismos).
- **EXTENSIÓN INMEDIATA (27/08/2026):** el mecanismo se extendió a **TODAS las pantallas** (93 textos en total): Registro/Perfil, Acceso/Login, Identidad Corporativa, Organigrama Personal, Comunicación, Modales (contacto, detalle, cambio de contraseña) y el **menú de la tuerca** (nombres de pantalla + "Cerrar Sesión" traducidos en `actualizarMenuTuerca()` vía `traducirTexto`). La cabecera "HERRAMIENTA MULTIFUNCIONAL" también se traduce.
  - `aplicarIdioma()` ahora omite elementos con hijos (spans/strong) para no romper el layout; se añadió `traducirTexto(clave)` para los textos dinámicos (menú y títulos de modales).
  - Los títulos dinámicos de los modales ("Nuevo Colaborador/Indirecto/Observador", "Editar Contacto") usan traducción.
  - Al guardar Configuración se refresca el menú (`actualizarMenuTuerca`) para aplicar el idioma al instante.
  - Respaldos: `_respaldo_pre_reorg/*.antes_idioma_full`.
- **PENDIENTE (menor):** los textos generados dinámicamente por JS (secciones "Contactos Indirectos"/"Observadores" del organigrama, mensajes de aviso/invitación, botón "Cerrar Sesión" ya cubierto) y el texto del modal de contraseña temporal con `<strong>` quedan en español (estructura compleja). Se pueden cubrir en una pasada futura si se desea 100% de cobertura dinámica.

### 26/08/2026 — Sesión inicial (diagnóstico)
- Se diagnosticó la estructura: la app real corre en las carpetas de la raíz; `Proyecto-Stratos` es duplicado viejo.
- Se detectó que hay **2 repositorios git** (raíz y subcarpeta) apuntando al mismo GitHub.
- El respaldo de GitHub **no está al día** (archivos modificados sin subir).
- Se decidió crear este archivo **MEMORIA** para dar continuidad.
- Se acordó: verificar que la app corre bien ANTES de hacer cambios.

### 26/08/2026 — Sesión de estructura y continuidad (estilos + index)
- Se creó este archivo `MEMORIA.md` y se editó `instrucciones.md` (paso obligatorio de leído).
- Se alineó el objetivo: dar a los archivos títulos numerados + explicación humana comparable a `estilos.css`.
- En `Colores-y-Estetica/estilos.css`:
  - Se numeraron los sub-bloques de **3.7 BOTONES** (3.7.1 → 3.7.12) con su explicación.
  - Se eliminó la **tuerca duplicada** que estaba mal ubicada y se completó la tuerca oficial **3.10** (base+hover+active+span), sin cambios visuales.
- En `Cuerpo-y-Textos/index.html` se reorganizaron los **títulos-comentario** en 5 GRUPOS numerados (grupos + sub-procesos), SIN tocar el HTML real:
  - GRUPO 1: Cabecera y avisos globales (1.1–1.5)
  - GRUPO 2: Pantallas principales (2.1–2.7, con sub-procesos 2.3.1–2.3.8 y 2.7.1)
  - GRUPO 3: Pie de página y navegación (3.1–3.4)
  - GRUPO 4: Modales (4.1–4.3)
  - GRUPO 5: Scripts (5.1)
- Pendiente: analizar y proponer títulos para `datos.js` y `logica.js`.

### 26/08/2026 — Análisis de arquitectura (datos.js / logica.js)
Se decidió reorganizar `datos.js` y `logica.js` para que cada uno cumpla su propósito declarado:
- `datos.js` = SOLO datos/estructuras/memoria.
- `logica.js` = SOLO procesamiento/validaciones/interacción.
- Sin duplicados, sin lógica en datos, sin datos sueltos en lógica.

**Diagnóstico encontrado:**
1. `datos.js` tiene **5 funciones DUPLICADAS** que también existen en `logica.js` (gana la de `logica` por orden de carga): `generarIdUnico`, `generarCodigoInvitacion`, `guardarEnStorage`, `cargarDeStorage`, `obtenerFraseMotivacional`.
2. `datos.js` tiene `reconstruirOrganigramaDesdeUsuario` (uso real en `logica.js`, debería estar ahí).
3. `datos.js` tiene 7 funciones de infraestructura futura SIN uso hoy (se conservan, se mueven a `logica`): `buscarUsuarioPorContacto`, `buscarUsuarioPorIdEmpleado`, `esUsuarioNo1`, `esUsuarioPrimeraLinea`, `obtenerSuperiorDirecto`, `obtenerSubordinados`, `limpiarSesion`.
4. `logica.js` tiene DATOS embebidos que deberían estar en `datos`: `coloresSeguridad` (paleta, DUPLICADA en 2 lugares) y `tipoValido` (formatos de imagen).

### 26/08/2026 — PLAN de reorganización (PASO A PASO, para rastrear conflictos)
Orden acordado por el Arquitecto: (1) registrar plan en bitácora, (2) hacer respaldo, (3) aplicar cambios.
Cada paso queda numerado para poder identificar en qué punto aparecería un conflicto.

- **PASO 0 (hecho):** Registrar este plan en la bitácora.
- **PASO 0.5 (hecho):** Crear COPIA DE RESPALDO de `datos.js` y `logica.js` (mismo estado que hoy).
  - Carpeta: `Motor-Logica-y-Acronimos\_respaldo_pre_reorg\`
  - `datos.js.BAK` (21.550 bytes) y `logica.js.BAK` (88.503 bytes) — tamaños idénticos a los originales.
- **PASO 1 (hecho):** Mover de `logica.js` → `datos.js`: `coloresSeguridad` (una sola vez, quitando el duplicado) y `tipoValido`.
  - Resultado: se MANTUVIERON las 2 listas originales SIN alterar (antón de decisión del Arquitecto: no cambiar textos). Se agregó en `datos.js` `COLORES_SEGURIDAD_ANALISIS` (11) y `COLORES_SEGURIDAD_PALETA` (10), más `TIPOS_IMAGEN_VALIDOS`. En `logica.js` cada función ya referencia la constante global; NO quedan listas literales en `logica.js`. Comportamiento visual intacto.
- **PASO 2 (hecho):** Quitar de `datos.js` las 5 funciones duplicadas (viven en `logica`).
  - Resultado verificado: `datos.js` ya no define `generarIdUnico`, `generarCodigoInvitacion`, `guardarEnStorage`, `cargarDeStorage`, `obtenerFraseMotivacional` (todas = 0). En `logica.js` cada una queda definida exactamente 1 vez.
  - Nota de trazabilidad: la versión de `obtenerFraseMotivacional` en `datos.js` era distinta (usaba misión/visión/valores) pero quedaba anulada por la de `logica.js` (carga posterior). Sin cambio de comportamiento activo.
- **PASO 3 (hecho):** Mover de `datos.js` → `logica.js`: `reconstruccionOrganigramaDesdeUsuario`.
  - Resultado verificado: 0 definiciones en `datos.js`, 1 en `logica.js` (insertada junto a `generarAcronimo`). Sin cambio de comportamiento (calls en runtime 274/670/746).
- **PASO 4 (hecho):** Mover de `datos.js` → `logica.js` las 7 funciones de infraestructura (sin borrar lógica).
  - Movidas: `buscarUsuarioPorContacto`, `buscarUsuarioPorIdEmpleado`, `esUsuarioNo1`, `esUsuarioPrimeraLinea`, `obtenerSuperiorDirecto`, `obtenerSubordinados`, `limpiarSesion`.
  - Verificado: 0 en `datos.js`, 1 en `logica.js` cada una.
- **PASO 5 (hecho):** Verificación final global.
  - Equilibrio de llaves/paréntesis PERFECTO en `datos.js` y `logica.js` (sin roturas de sintaxis).
  - Orden de carga correcto: `datos.js` antes que `logica.js` en `index.html`.
  - Sin llamadas a nivel de carga rotas (las llamadas a `cargarDeStorage` en `datos.js` están dentro de `DOMContentLoaded`, que corre tras la carga).
- **RESULTADO FINAL de la reorganización:** `datos.js` = SOLO datos/estructuras/memoria (persistencia e inicialización de carga de datos). `logica.js` = toda la lógica/funciones. Sin funciones duplicadas.
- **Nota pendiente:** la reorganización de TÍTULOS internos de `datos.js`/`logica.js` (estilo estilos/index) es un trabajo posterior. También el `DOMContentLoaded` final de `datos.js` es lógica de carga (se decide más adelante si se mueve).
- IMPORTANTE: falta que el Arquitecto VERIFIQUE en el navegador que la app sigue funcionando igual tras esta reorganización.

### 26/08/2026 — Pulido de títulos y codificación (datos.js + logica.js)
Con el objetivo de dejar los 4 archivos con el mismo criterio (títulos numerados + comentario corto de guía, todo en español, sin tocar lógica):

- **`datos.js` — corregida la CODIFICACIÓN de los títulos/comentarios:**
  - El archivo tenía **doble-codificación** (UTF-8 ↔ cp1252): tildes, Ñ y emojis salían corruptos (`Sesión`, `CONFIGURACIÓN`).
  - Se repararon **30 líneas de comentario/título** usando round-trip cp1252, solo en líneas de comentario.
  - **No se tocó ninguna línea de código ni dato en ese momento** (quedaron 14 corrupciones en DATOS — cadenas de la app — pendientes). **RESUELTO 28/08/2026:** las 14 cadenas corruptas de `datos.js` fueron reparadas en el commit `d1c50ff` ("Fix: cadenas corruptas en datos.js (frases motivacionales + comentarios)"). Verificado 16/09/2026 con escaneo completo del archivo: **0 corrupciones restantes**. ✅
  - `logica.js`, `estilos.css` e `index.html` ya estaban limpios (0 corrupciones).

- **`logica.js` — reorganización de títulos y comentarios:**
  - Se **renumeró correlativamente de principio a fin** (1 → 32) TODAS las secciones, incluidas las que no tenían número (FUNCIONES ADICIONALES, PERSISTENCIA, TEMPORIZADOR, etc.), respetando el **orden físico** (no se movió nada por depender de la lógica).
  - Se añadió a **cada título su comentario corto descriptivo** (estilo estilos/index).
  - Se **tradujeron al español** los 9 comentarios internos que estaban en inglés (sección análisis de colores).
  - Sub-secciones actuales: 12.1 (reconstruir organigrama) y 12.2 (infraestructura de usuarios/sesión).
  - **No se tocó ninguna línea de código.**

- **Respaldo de codificación:** se creó `Motor-Logica-y-Acronimos\_respaldo_encoding\` (datos.js.BAK + logica.js.BAK) por si se quiere volver atrás.

- **Detectado aparte (NO modificado):** hay una función **`guardarContacto()` DUPLICADA** en `logica.js` (en la sección 26 aprox. línea 1329 y en la 32 aprox. línea 1909). Es código, no comentario, así que queda PENDIENTE de revisión/explicación con el Arquitecto.

### 26/08/2026 — RUTA DE TRABAJO ACORDADA PARA LA PRÓXIMA SESIÓN (orden de prioridad)
El Arquitecto quiere no comenzar en 0 y avanzar por prioridad (un solo cupo por día):
1. **Arreglar el enlace GitHub ↔ este repositorio** (que el respaldo suba todo automáticamente con la tarea "Subir a Git" de `.vscode/tasks.json`, incluida esta bitácora). Es la base de la continuidad.
2. **El "otro tema" que el Arquitecto quiere hablar antes que el duplicado** (lo menciona como su prioridad; se retoma con calma ya con GitHub funcionando).
3. **`guardarContacto()` duplicado** (dejarlo pendiente de última, si sobra cupo).
- Objetivo de fondo: que la bitácora viva en GitHub para que **DeepSeek (internet) la lea y retome sin empezar en 0**, pegándola como contexto de continuidad.
- Regla del Arquitecto para todas las sesiones: **respuestas cortas y al grano; no dejar temas a medias** (lo no terminado se anota como PENDIENTE claro aquí).

---

## PENDIENTES / SIGUIENTES PASOS
- [ ] **VERIFICACIÓN DEL ARQUITECTO (programada para el 17/09/2026):** revisar en el navegador (Ctrl+F5) los Puntos 1, 4, 6 y 7 aplicados hoy: zona superior (logo/cartelera), Configuración (esfera de IA + nombre del asistente), Login (saludo + biometría) y botón flotante de IA con voz y ventana.
- [ ] **SIGUIENTE PASO (prioridad del Arquitecto): desarrollar la PANTALLA COMUNICACIÓN** (Pantalla 5, hoy sin funcionalidad).
- [ ] Registro biométrico por usuario (facial/huella reales): requiere decisión del Arquitecto sobre el flujo de inscripción; hoy solo hay detección de dispositivo en Login.
- [ ] Activar el "cerebro" completo de Vero (IA real): hoy el asistente tiene voz + comandos LOCALES (navegación, hora, frase); los comandos solo tienen sentido con más usuarios inscritos y con Comunicación (nota del Arquitecto del 16/09).
- [ ] Renumerar los TÍTULOS internos de `datos.js` (estilo logica.js 1→32) — sin registro de término; detectado en revisión 29/08.
- [ ] Opcional: traducción 100% dinámica (avisos JS, secciones del organigrama, modal de contraseña temporal).