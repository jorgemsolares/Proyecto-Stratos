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

## PUNTO 1: REPARAR EL MODAL DE REDACCIÓN DE CORREOS

**Contexto:** Al presionar el botón "REDACTAR" (o Responder/Reenviar), el modal no se abre. La función en `logica.js` está lanzando un error de JavaScript antes de mostrar la ventana (posiblemente porque intenta leer `configuracionPersonal.firmaTexto` sin que exista o hay un error de sintaxis).

**Qué cambiar:**
- En `logica.js`, revisar la función que abre el modal de redacción (`abrirModalRedactar` o similar).
- Asegurar que la variable `configuracionPersonal.firmaTexto` esté definida en `datos.js` (si no existe, crearla vacía: `firmaTexto: ""`).
- Corregir cualquier error de referencia que esté deteniendo la ejecución de la función y evitar que se rompa el flujo.

**Cómo debe quedar:**
- Al presionar "REDACTAR", el modal debe abrirse correctamente, mostrando los campos (De, Para, CC, CCo, Asunto) y el área de texto con el sello de la Firma.

**Qué NO hacer:**
- NO cambiar el diseño del modal.
- NO alterar la lógica de los otros botones.

---

## PUNTO 2: REPARAR LOS BOTONES DE COLOR EN IDENTIDAD CORPORATIVA

**Contexto:** Los botones de "Fondo", "Letras" y "Botones" en la pantalla de Identidad Corporativa no están aplicando el color seleccionado.

**Qué cambiar:**
- En `logica.js`, revisar la función `aplicarCambioEstetico` (o la que asigne el color). Asegurar que la variable `colorSeleccionado` esté capturando bien el valor y que esté llamando a `aplicarCambiosVisuales()` correctamente.

**Cómo debe quedar:**
- Al seleccionar un color de la paleta y presionar "Fondo", "Letras" o "Botones", el sistema debe aplicar el cambio en vivo y reflejarlo en la vista previa.

**Qué NO hacer:**
- NO alterar las reglas de la Sección H (tamaños y colores base del sistema).
- NO cambiar el diseño de la paleta.

---

## PUNTO 3: REPARAR EL BOTÓN "EDITAR" EN EL ORGANIGRAMA PERSONAL

**Contexto:** Al dar doble clic en el nodo raíz (el del usuario) en el Organigrama Personal, se abre el detalle, pero al presionar "Editar", no hace nada. Debería redirigir a "Mi Perfil".

**Qué cambiar:**
- En `logica.js`, en la función `editarContactoDesdeDetalle()` (o la que maneje ese botón), agregar una validación: si el contacto que se está editando tiene el mismo `id` que el `usuarioActivo`, cerrar el modal y redirigir a la pantalla `registro-invitacion` (Mi Perfil).

**Cómo debe quedar:**
- Al editar tu propio nodo, el sistema te lleva a tu Perfil. Al editar un contacto, abre el modal de edición normal.

**Qué NO hacer:**
- NO modificar la estructura del Organigrama.

---

**Fin de las instrucciones.