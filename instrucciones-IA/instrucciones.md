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

## PUNTO 1: AJUSTE DE PROPORCIONES EN LA PANTALLA DE CORREOS

**Contexto:** El menú lateral de correos ocupa la mitad del ancho, dejando muy poco espacio para la lista de correos. Se debe ajustar la proporción para emular a Gmail.

**Qué cambiar:**
- En `estilos.css`, modificar el contenedor del menú lateral de correos para que ocupe como máximo 1/3 del ancho (o un ancho fijo de ~200px), dejando los 2/3 restantes para la lista de correos.

---

## PUNTO 2: CORREGIR EL ESTADO NORMAL Y ACTIVO DE LOS BOTONES DEL MENÚ LATERAL

**Contexto:** El botón "Recibidos" se ve como texto plano (no tiene el diseño de botón), mientras que los demás tienen una sombra verde permanente ("pantallita") que no es uniforme al resto del sistema.

**Qué cambiar:**
- En `estilos.css`, en la clase `.btn-vista-correo`:
  - **Estado Normal:** Quitar el `box-shadow` (la pantallita). Debe tener el fondo oscuro del color de botones, borde y forma de botón igual que los demás (como se ve "Recibidos" en la foto 1, pero con el fondo del botón).
  - **Estado Activo (presionado):** Debe ser idéntico al botón "Enviados" de la foto 2. Fondo oscuro, texto verde (`--color-primario`), borde verde y el resplandor (`box-shadow`) que lo rodea.
- Asegurar que todos los botones (Recibidos, Enviados, Carpetas, etc.) tengan exactamente la misma estructura visual, variando solo si están en estado normal o activo.

---

## PUNTO 3: DETALLE DEL CORREO EN VENTANA EMERGENTE (MODAL)

**Contexto:** Actualmente, al hacer doble clic en un correo, el detalle se expande hacia abajo en la misma lista. Eso no es práctico si hay muchos correos, y el usuario se pierde.

**Qué cambiar:**
- En `index.html` y `logica.js`, mover el bloque de `detalle-correo` para que funcione como una ventana emergente (modal), similar al de "Redactar".
- Al hacer doble clic en un correo, se debe abrir el modal con los datos del correo.
- El modal debe tener un botón de cerrar (X) y los botones de acción (Responder, Archivar, Eliminar).
- Mantener el efecto de borde iluminado en la fila del correo que se está visualizando.

---

**Fin de las instrucciones.