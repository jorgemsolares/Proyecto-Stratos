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

## PUNTO ÚNICO: REPARAR LA APLICACIÓN DEL COLOR DE FONDO EN IDENTIDAD CORPORATIVA

**Contexto:** Al presionar el botón "Fondo" en Identidad Corporativa, el color seleccionado no se aplica correctamente al área de trabajo. Además, al recargar la página (F5), el sistema no mantiene el color de fondo guardado y vuelve al color por defecto. Esto ocurre porque la función `aplicarCambiosVisuales` está intentando aplicar el color a elementos incorrectos (como el fondo general de la app) o se está ejecutando antes de que los datos carguen.

**Qué cambiar:**
1. **En `logica.js`, función `aplicarCambiosVisuales()`:**
   - Asegurar que el color de fondo (`configuracionEstetica.colorFondo`) se aplique **ÚNICAMENTE** al contenedor de trabajo (`#app-container`).
   - **NO** aplicar el color de fondo al `body` (el fondo general debe quedarse con el color oscuro de Stratos).
   - Verificar que al presionar el botón "Fondo", el color se aplique en tiempo real al área de trabajo.
   - Asegurar que, al recargar la página (F5), la función que carga los datos guardados (en `window.onload`) llame a `aplicarCambiosVisuales()` después de haber cargado la identidad desde el `localStorage`.

2. **Limpieza de la prueba anterior:**
   - No es necesario borrar el localStorage a mano. Al corregir la función, el sistema aplicará los colores correctos que estén guardados en la identidad actual.

**Cómo debe quedar:**
- Al seleccionar un color y presionar "Fondo", el fondo del área de trabajo (el recuadro central) cambia inmediatamente.
- Al recargar la página (F5), el color de fondo se mantiene si está guardado en la identidad.
- El fondo general de la app sigue siendo el color oscuro de Stratos.

**Qué NO hacer:**
- NO cambiar el diseño del resto de la pantalla.
- NO alterar los colores de los textos o botones.
- NO modificar la lógica de otras pantallas.

---

**Fin de las instrucciones.