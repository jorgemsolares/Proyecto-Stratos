# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`index.html`, `estilos.css`, `logica.js`, `datos.js`) para aplicar estos puntos. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

---

## PUNTO ÚNICO: CORREGIR EL COMPORTAMIENTO DE CTRL + Z

**Contexto:** La implementación actual de Ctrl+Z reemplaza el comportamiento nativo del navegador con un sistema de "foto completa" (historial de 50 estados) que afecta a TODOS los inputs y textareas. Esto causa que, al escribir en un campo de texto y presionar Ctrl+Z, se borre todo el texto de golpe en lugar de deshacer letra por letra (el estándar natural del navegador). Esta implementación es incorrecta y confunde al usuario.

**Qué cambiar:**
En `logica.js`:

1. **Desvincular los inputs del sistema de historial:**
   - En el listener de `keydown` (donde se detecta `Ctrl+Z` o `Cmd+Z`), agregar una condición que verifique si el elemento activo (`document.activeElement`) es un `<input>` o un `<textarea>`.
   - Si el usuario está escribiendo dentro de un input o textarea, el sistema **NO debe ejecutar `preventDefault()`** ni llamar a `deshacerUltimoCambio()`. Debe dejar que el navegador maneje el deshacer nativo (letra por letra).

2. **Dejar de capturar estados en los inputs:**
   - En el listener de `input` (línea 828 aproximadamente), eliminar la llamada a `capturarEstadoParaDeshacer()` cuando el evento provenga de un `input` o `textarea`. El sistema de historial solo debe capturar cambios de la interfaz (colores, paleta, identidad), no la escritura de texto.

3. **Mantener el Ctrl+Z solo para acciones de la interfaz:**
   - El historial de 50 estados (`historialDeshacer`) debe seguir funcionando única y exclusivamente para los cambios de color, paleta, tipografía, logo e identidad. Si el usuario presiona Ctrl+Z fuera de un input (o en un elemento que no sea de escritura), se restaurará la "foto completa" del estado anterior.

**Cómo debe quedar:**
- Si el usuario escribe en un input y presiona Ctrl+Z, el texto se borra letra por letra (comportamiento nativo del navegador).
- Si el usuario cambia un color en la paleta y presiona Ctrl+Z, el color vuelve al anterior (foto completa).

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.
- NO eliminar el sistema de historial (`historialDeshacer`), solo limitar su alcance.
- NO interferir con la función nativa de los inputs.

---

**Fin de las instrucciones.