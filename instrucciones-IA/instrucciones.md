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

---

## PUNTO 1: CORRECCIÓN DE LA LISTA Y MODAL DE DETALLE DE CORREOS

**Contexto:** El modal de detalle de correo tiene el texto centrado (debe ir a la izquierda), muestra una flecha en lugar de "De:", los botones no están en una línea y falta el botón de "Reenviar". Además, la lista de correos no tiene checkboxes para selección múltiple ni el indicador visual (película blanca) para los correos no leídos.

**Qué cambiar:**

1. **Título del Modal (index.html / logica.js):**
   - En lugar de decir siempre "Detalle del correo", el título debe mostrar el nombre de la bandeja actual. Ejemplo: si estás en Recibidos, dirá "Detalle - Recibidos" (o el nombre de la carpeta correspondiente).

2. **Contenido del Modal (index.html / logica.js):**
   - Asegurar que el cuerpo del mensaje (`detalle-correo-cuerpo`) tenga `text-align: left` y use `var(--color-letras)`.
   - Cambiar la flecha (→) del remitente para que diga claramente **"De: [remitente]"**.
   - Agregar el botón **"REENVIAR"** junto a los botones de Responder y Archivar.
   - Asegurar que los 4 botones (Responder, Reenviar, Archivar, Eliminar) queden en una sola línea, ajustando el tamaño de la letra si es necesario.

3. **Checkboxes y Leído/No leído (index.html / estilos.css / logica.js):**
   - Agregar un checkbox en la parte superior de la lista para "Seleccionar todos".
   - Agregar un checkbox a cada fila de correo.
   - Los correos no leídos deben llevar una "película" de fondo (un fondo gris/blanco sutil) para diferenciarlos visualmente. Al abrirlos (marcarlos como leídos), pierden ese fondo.
   - **Lógica de apertura:** Al hacer doble clic o clic en un correo para abrirlo, el sistema debe marcarlo como leído y quitarle la película de fondo automáticamente. (Opcional: permitir volver a marcarlo como no leído desde el menú de opciones).

**Dónde:**
- `Cuerpo-y-Textos/index.html` (estructura de la lista y el modal).
- `Colores-y-Estetica/estilos.css` (clases de los correos, checkboxes y modal).
- `Motor-Logica-y-Acronimos/logica.js` (funciones de renderizado y apertura de correos).

**Qué NO hacer:**
- NO cambiar la forma en que se envían los correos.
- NO alterar el diseño del menú lateral.

---

**Fin de las instrucciones.