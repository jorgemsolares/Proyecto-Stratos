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

## PUNTO ÚNICO: ARREGLAR EL BOTÓN "FONDO" EN IDENTIDAD CORPORATIVA

**Contexto:** Al presionar el botón "Fondo" en Identidad Corporativa, el color no se aplica al contenedor de trabajo. El problema está en el evento del botón y en cómo la función `aplicarCambiosVisuales` pisa el CSS.

**Qué cambiar:**
1. En `Cuerpo-y-Textos/index.html` (línea donde están los botones de Fondo/Letras/Botones):
   - Asegurar que los botones llamen a la función pasando el `event` correctamente. Debe verse así:
     `onclick="aplicarCambioEstetico('fondo', event)"`
     `onclick="aplicarCambioEstetico('texto', event)"`
     `onclick="aplicarCambioEstetico('botones', event)"`

2. En `Motor-Logica-y-Acronimos/logica.js` (función `aplicarCambiosVisuales`):
   - **ELIMINAR** la línea `contenedor.style.backgroundColor = configuracionEstetica.colorFondo;` (porque pisa el CSS y causa conflicto).
   - **DEJAR** la línea `root.setProperty('--color-fondo', configuracionEstetica.colorFondo);` para que el CSS haga su trabajo.

**Cómo debe quedar:**
- Al seleccionar un color y presionar "Fondo", el color se aplica inmediatamente al recuadro central (`#app-container`), y el botón se queda marcado como activo.
- Al recargar la página (F5), el color se mantiene.
- El fondo general de la app (el `body`) sigue siendo el color oscuro de Stratos.

**Qué NO hacer:**
- NO cambiar el fondo general (`body`).
- NO tocar la lógica de otros botones o pantallas.

---

**Fin de las instrucciones.