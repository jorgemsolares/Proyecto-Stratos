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

## PUNTO 1: IGUALAR EL TAMAÑO Y CENTRADO DE LOS BOTONES DE IDENTIDAD

**Contexto:** En la pantalla de Identidad Corporativa, los botones "Mantener colores actuales" y "Volver a colores Stratos" no tienen el mismo tamaño que los botones de "Fondo/Letras/Botones", no están centrados y el texto no se ajusta al ancho del botón.

**Qué cambiar:**
- En `estilos.css`:
  - Quitar la propiedad `grid-column` a los botones "Mantener" y "Volver" (para que no se estiren de forma independiente).
  - Asegurar que los botones de arriba tengan exactamente el mismo `padding`, `font-size` y `border` que los de abajo.
  - Si el texto es muy largo, reducir el `font-size` para que quepa en una sola línea.

---

## PUNTO 2: CORREGIR LA FUNCIÓN DEL BOTÓN "MANTENER COLORES ACTUALES"

**Contexto:** La función `mantenerColoresActuales()` solo muestra un mensaje pero no guarda los cambios con el nuevo logo en la memoria.

**Qué cambiar:**
- En `logica.js`, en la función `mantenerColoresActuales()`:
  - Después de mostrar el aviso, llamar a la función de guardado (`guardarEnStorage(STORAGE_KEYS.IDENTIDAD, identidadCorporativa)`).
  - Asegurarse de que el logo nuevo se guarde en la identidad.

---

## PUNTO 3: CORREGIR LA FUNCIÓN DEL BOTÓN "VOLVER A COLORES STRATOS"

**Contexto:** La función `restaurarColoresStratos()` cambia los colores en pantalla pero no los guarda en la memoria, por lo que al recargar se pierden.

**Qué cambiar:**
- En `logica.js`, en la función `restaurarColoresStratos()`:
  - Actualizar `identidadCorporativa.colorFondo`, `colorTexto` y `colorBotones` con los valores por defecto.
  - Llamar a la función `aplicarCambiosVisuales()`.
  - Llamar a `guardarEnStorage(STORAGE_KEYS.IDENTIDAD, identidadCorporativa)` para que los cambios sean permanentes.

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.
- NO cambiar el diseño del resto de la pantalla.
- NO alterar los botones de Fondo/Letras/Botones.

---

**Fin de las instrucciones.