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

## PUNTO 1: CORREGIR COLOR DE TEXTOS Y PLACEHOLDERS EN IDENTIDAD Y FORMULARIOS

**Contexto:** Varios textos en la pantalla de Identidad Corporativa y los *placeholders* de los inputs no están heredando el color definido en `--color-letras`.

**Qué cambiar:**
- En `estilos.css`, agregar reglas específicas para que:
  - Los textos de la paleta (ej. "Asignar color seleccionado a:", "Fondo", "Letras", "Botones") usen `var(--color-letras)`.
  - Todos los `::placeholder` de los inputs y textareas usen `var(--color-letras)` con opacidad (ej. `opacity: 0.6`) para que se distingan pero respeten el color.
- En `logica.js`, en la función `aplicarCambiosVisuales()`:
  - Asegurar que el selector de elementos incluya los `p` y `span` de la sección de la paleta para que tomen el color dinámicamente.

---

## PUNTO 2: VOLVER LA PALETA A CUADRADOS

**Contexto:** Los rectángulos horizontales no se ven bien estéticamente. Se deben volver a los cuadrados, aunque la pantalla se alargue un poco.

**Qué cambiar:**
- En `estilos.css`, en la clase `.color-cuadro`:
  - Quitar el `height: 40px; width: 100%;`.
  - Volver a poner `aspect-ratio: 1;` (o el tamaño cuadrado que tenía antes).
  - Ajustar el `grid` (`.contenedor-paleta-ocho`) para que vuelva a mostrar los cuadros en el formato anterior.

---

## PUNTO 3: IGUALAR EL TAMAÑO DE LOS BOTONES DE CONTROL (MANTENER Y VOLVER)

**Contexto:** Los botones "Mantener colores actuales" y "Volver a colores Stratos" se ven más grandes que los de Fondo, Letras y Botones. El texto no se ajusta al tamaño y eso rompe el centrado visual.

**Qué cambiar:**
- En `estilos.css`, en la clase o clase(s) de estos dos botones nuevos:
  - Igualar exactamente el `padding`, el `font-size` y el `border` a los de los botones de Fondo/Letras/Botones.
  - Asegurar que el texto se ajuste al ancho del botón (reduciendo el tamaño de letra si es necesario para que quepa en una sola línea, respetando la regla de la Sección H).

**Dónde:**
- `Colores-y-Estetica/estilos.css`: clases de la paleta y de los botones de control.
- `Motor-Logica-y-Acronimos/logica.js`: función `aplicarCambiosVisuales()`.

**Qué NO hacer:**
- NO cambiar la lógica de la paleta (los 3 casos).
- NO alterar el tamaño de la pantalla general.

---

**Fin de las instrucciones.