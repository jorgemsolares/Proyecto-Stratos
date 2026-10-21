# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**El Arquitecto ya autorizó estos cambios al entregar este documento.** No se requiere confirmación adicional para leer, ejecutar o proceder.

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

**REGLAS DE ORO INVIOLABLES (Para este y todos los desarrollos futuros):**
1. **Color de Letras:** Todo texto, botón, título, icono de "X" o elemento generado por JS DEBE usar la variable `var(--color-letras)`. Las únicas excepciones son las alertas semánticas (éxito/error) y la marca de agua.
2. **Color de Botones:** Todo fondo de botón DEBE usar `var(--color-botones)`.
3. **Tamaño de Nodos (Modales):** Diferenciar entre Informativos (pequeños) y de Trabajo (grandes).

---

## PUNTO 1: CLASIFICACIÓN Y TAMAÑO DE PANTALLAS Y MODALES

**Contexto:** Las pantallas y ventanas flotantes no tienen un tamaño uniforme, lo que rompe la experiencia en computadora. Se establecen dos tamaños base.

**Qué cambiar:**
- En `logica.js` (función `ajustarLayoutAdaptativo`) y `estilos.css`, aplicar las siguientes medidas:
  - **Pantallas Angostas (480px):** `registro-invitacion` (Perfil), `pantalla-acceso` (Login), `pantalla-configuracion`, `pantalla-comunicacion`, `pantalla-otras-actividades`.
  - **Pantallas Anchas (875px):** `pantalla-identidad`, `pantalla-organigrama`, `pantalla-organigrama-general`, `pantalla-correos` (y futuras como Tareas, Alarmas).
- **Modales Informativos (Máx 500px):** `modal-detalle-contacto`, `modal-detalle-correo`, `ventana-aviso-contacto`.
- **Modales de Trabajo (Máx 875px):** `modal-contacto`, `modal-redactar-correo`. Si el usuario hace clic en "Editar" o "Responder" desde un modal informativo, este debe expandirse al tamaño de trabajo.

---

## PUNTO 2: CORRECCIÓN DE COLORES EN TODOS LOS BOTONES Y TEXTOS (IDENTIDAD)

**Contexto:** La Identidad Corporativa se guarda, pero no se aplica a todos los textos (como los correos) ni a los botones de cerrar (X).

**Qué cambiar:**
- En `estilos.css`, asegurar que las clases de los botones de cerrar (`.btn-cerrar`), los textos de los correos (`.item-correo-remitente`, `.item-correo-asunto`, `.item-correo-previa`, `.item-correo-fecha`) y el texto del modal de detalle de correo usen `var(--color-letras)`.
- En `logica.js` (función `aplicarCambiosVisuales`), asegurar que se aplique el color de letras a los elementos dinámicos.
- **Alinear el texto:** En el modal de detalle de correo, quitar cualquier `text-align: center` para que el cuerpo del mensaje se lea a la izquierda (como lo escribió el emisor).

---

## PUNTO 3: UNIFICACIÓN DE LOS BOTONES DEL MENÚ LATERAL (CORREOS)

**Contexto:** El botón "Recibidos" (y otros) se ven como texto plano o tienen sombras ("pantallitas") que rompen la uniformidad.

**Qué cambiar:**
- En `estilos.css`, en la clase `.btn-vista-correo`:
  - **Estado Normal:** Fondo oscuro (`--color-botones`), sin sombra (`box-shadow: none`), texto con `var(--color-letras)`. El tamaño de la letra debe ajustarse (ej. `0.8rem` o `12px`) y asegurar que no se rompa en dos líneas.
  - **Estado Activo/Hover:** Fondo oscuro, texto verde (`--color-primario`), borde verde y el halo/sombra (igual que el botón SPAM).

---

## PUNTO 4: REESTRUCTURACIÓN DEL MODAL DE REDACCIÓN Y DETALLE

**Contexto:** La ventana de Redactar (y Responder) tiene los botones de edición de texto a un lado, la cita mal posicionada y el texto no se puede escribir bien.

**Qué cambiar:**
- En `index.html` y `estilos.css`, dentro de `modal-redactar-correo`:
  - **Botones de formato:** Moverlos a una barra horizontal arriba del área de texto (debajo del asunto).
  - **Área de texto:** Debe ocupar todo el ancho disponible debajo de los botones de formato.
  - **Cita (Responder/Reenviar):** El texto original citado debe ir debajo del área donde el usuario escribe, no arriba.
  - **Uniformidad:** Tanto si es Redactar, como Responder o Reenviar, los elementos deben estar en las mismas posiciones.
- En la lista de correos, ajustar el tamaño de la letra (vista previa) para que no se vea gigante al ocupar el 75% del ancho.

---

**Fin de las instrucciones.