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

## PUNTO ÚNICO: IMPLEMENTAR LA FUNCIÓN DE DESHACER (CTRL + Z)

**Contexto:** Actualmente el sistema no permite deshacer acciones (como cambiar un color, escribir en un campo o modificar la identidad). El Arquitecto requiere que la combinación de teclas Ctrl + Z funcione en todo el sistema para revertir el último cambio realizado.

**Qué cambiar:**
1. En `logica.js`:
   - Crear un sistema de historial (un arreglo o "stack" global) que guarde el estado anterior de las variables o del DOM cada vez que el usuario realice una acción que modifique algo (escribir en un input, cambiar un color, editar un texto, etc.).
   - Escuchar el evento `keydown` en el documento. Si el usuario presiona `Ctrl + Z` (o `Cmd + Z` en Mac), el sistema debe leer el último estado guardado en el historial y restaurarlo.
   - El historial debe aplicarse a los campos de texto (`input`, `textarea`) y a las acciones de la interfaz (como la selección de colores en Identidad).

2. En `index.html` y `estilos.css`:
   - No se requieren cambios visuales para este punto.

**Cómo debe quedar:**
- Si el usuario cambia un color o escribe en un campo y presiona `Ctrl + Z`, el sistema revierte ese último cambio visual y lógicamente.

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.
- NO implementar un botón visual para "Deshacer" (se solicitó la función por teclado).
- NO interferir con el funcionamiento normal de los campos de texto.

---

**Fin de las instrucciones.