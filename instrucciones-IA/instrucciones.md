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
- La carpeta de iconos: `Colores-y-Estetica/Iconos/`.

---

## PUNTO 1: CAMBIAR LA PANTALLA DE REDACCIÓN POR UNA VENTANA EMERGENTE (MODAL)

**Contexto:** La pantalla de redacción de correos a pantalla completa no se ve bien en el diseño angosto de la app. Se cambiará a una ventana emergente flotante (estilo Gmail) que se abre sobre la bandeja de entrada.

**Qué cambiar:**
- Modificar la estructura HTML de la redacción para que sea un `<div>` con la clase `modal` (o una estructura similar a las ventanas emergentes existentes en el sistema).
- Ajustar los estilos para que flote en el centro de la pantalla.
- Modificar la lógica para que el botón "REDACTAR" abra esta ventana, y que el botón de cerrar o "Descartar" la oculte.

**Cómo debe quedar (Estructura visual):**
- **Tipo:** Ventana flotante (modal) con fondo oscuro semitransparente detrás, igual que el modal de contacto o el de detalles.
- **Encabezado del modal:** Un título simple que diga "Nuevo Correo" y el botón de cerrar (X).
- **Campos (estilo Gmail):**
  - `De:` (Fijo, mostrando el email del `usuarioActivo`).
  - `Para:` (Input).
  - `Asunto:` (Input de texto).
  - `Mensaje:` (Textarea grande).
- **Barra de acciones (abajo del modal):**
  - Botón principal: `ENVIAR` (verde).
  - Botón secundario: `ENVIAR + TAREA` (naranja).
  - Botón secundario: `ENVIAR + ALARMA` (naranja).
  - Botón de peligro/descartar: `DESCARTAR` (rojo).
- **Nota:** Al ser una ventana flotante, **NO debe incluir** el encabezado de la app (logo y cartelera), ni el pie de página (sello de agua, botón de Vero, botón Libro), porque esos ya están visibles en la pantalla de fondo.

**Lógica:**
- Al hacer clic en "REDACTAR" (en la pantalla de correos), el modal aparece en pantalla.
- Al enviar o descartar, el modal se cierra y el usuario vuelve a ver la lista de correos.
- Mantener el registro en el `bancoDatos` al enviar.

---

**Fin de las instrucciones.