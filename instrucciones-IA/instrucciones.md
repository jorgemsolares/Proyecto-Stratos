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

## PUNTO 1: PROPORCIÓN 1/4 Y 3/4 EN LA PANTALLA DE CORREOS

**Contexto:** El menú lateral ocupa mucho espacio. Se ajustará a 1/4 del ancho, y la lista de correos a 3/4.

**Qué cambiar:**
- En `estilos.css`, ajustar el contenedor de dos columnas de la pantalla de correos. El menú lateral debe tener `flex: 0 0 25%` (o similar) y la lista de correos `flex: 1`.
- Reducir el `font-size` de los botones del menú lateral para que el texto quepa en una sola línea. Evitar que palabras como "BORRADORES" o "ELIMINADOS" se rompan en dos líneas o se corten.

---

## PUNTO 2: CORRECCIÓN DE COLORES Y EFECTOS EN LOS BOTONES

**Contexto:** Los botones laterales y los correos en la lista no están respetando el color de letras definido en Identidad Corporativa, lo que los hace ver como cuadros negros.

**Qué cambiar:**
- En `estilos.css`, asegurar que los botones del menú (Recibidos, Enviados, etc.) y el texto de los correos usen la variable `var(--color-letras)` para el color del texto.
- El botón presionado (estado activo) debe tener el fondo con la "cubierta" correspondiente (resaltado), y los correos en la lista deben tener el borde iluminado solo al hacer hover o al estar seleccionados.
- El botón de "Volver" (flecha izquierda) debe tener un tamaño de 30px.

---

## PUNTO 3: REDISEÑO DEL MODAL DE REDACCIÓN (ESTILO GMAIL)

**Contexto:** La ventana de redactar correos debe emular las funciones de Gmail.

**Qué cambiar:**
- En `index.html` y `logica.js`:
  - El campo **De:** debe estar bloqueado y mostrar solo el correo del perfil.
  - Agregar una **barra de herramientas de texto** sobre el área del mensaje (Negrita, Cursiva, Subrayado, Color, Listas, etc.).
  - Agregar la **firma automática**: si el usuario configuró una firma en su perfil, debe aparecer al final del mensaje.
  - El botón de adjuntar debe abrir el explorador de archivos.
  - Los botones de acción (Enviar, Enviar + Tarea, etc.) deben respetar el diseño unificado.

---

## PUNTO 4: COMPORTAMIENTO DE "RESPONDER" Y "REENVIAR"

**Contexto:** Al responder o reenviar, el sistema debe citar el correo original.

**Qué cambiar:**
- En `logica.js`, al presionar "Responder" o "Reenviar", abrir el modal de redacción.
- Incluir en el cuerpo del mensaje el texto del correo original citado, con el formato de Gmail (ej. "El [Fecha] a las [Hora], [Remitente] escribió:").
- Incluir el botón de "Reenviar" en el modal de detalle del correo.

---

## PUNTO 5: FUNCIÓN DE ARCHIVAR Y LÓGICA DE VERO

**Contexto:** Archivar no debe ser un botón que simplemente oculte el correo. Debe permitir organizarlo, y si no se hace, Vero interviene.

**Qué cambiar:**
- En `logica.js`, al presionar "Archivar", abrir una ventana pequeña o menú para asignar una carpeta (ej. "Proveedores", "Cotizaciones").
- **Lógica de Vero:** Si el correo no se archiva manualmente, después de un tiempo prudencial (a definir), Vero lo archivará automáticamente para mantener el historial.

---

## PUNTO 6: CORRECCIÓN DEL TEXTO EN LA LISTA DE CORREOS

**Contexto:** El texto de la lista de correos (remitente, asunto, vista previa) no está respetando la tipografía ni el color de letras definidos en Identidad Corporativa.

**Qué cambiar:**
- En `estilos.css`, asegurar que los textos de la lista de correos (`.item-correo-remitente`, `.item-correo-asunto`, `.item-correo-previa`, `.item-correo-fecha`) usen `var(--color-letras)` o la tipografía correspondiente. Quitar cualquier fondo gris que no corresponda.

---

**Fin de las instrucciones.