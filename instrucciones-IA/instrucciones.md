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

## PUNTO ÚNICO: MEJORAR EL CONTRASTE DE LAS COMBINACIONES EN LA PALETA

**Contexto:** Las mezclas de colores (los últimos dos cuadros de la paleta) están quedando muy apagadas cuando el color extraído del logo es oscuro. Para garantizar que los colores Stratos (Rojo y Verde) resalten, la mezcla debe ser dinámica dependiendo de la luminosidad del color base.

**Qué cambiar:**
- En `Motor-Logica-y-Acronimos/logica.js`, en la función que construye la paleta (donde se hacen las combinaciones de 75%/25%):
  1. Calcular la luminosidad del Color 1 y del Color 2 (los extraídos del logo).
  2. **Si el color base es oscuro:** La mezcla debe ser **60% Color Base + 40% Color Stratos** (para que el Rojo o el Verde tengan más fuerza).
  3. **Si el color base es claro:** La mezcla se mantiene en **75% Color Base + 25% Color Stratos**.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: funciones de generación de paleta y combinación de colores.

**Cómo debe quedar:**
- Los dos últimos cuadros de la paleta se verán más vivos y contrastantes, sin importar si el logo tiene colores oscuros o claros.

**Qué NO hacer:**
- NO cambiar la lógica de los Casos 0, 1 y 2.
- NO alterar los colores base de Stratos.
- NO cambiar el diseño de los cuadros.

---

**Fin de las instrucciones.