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

## PUNTO ÚNICO: CORRECCIÓN DEL ALGORITMO DE LA PALETA (AGRUPACIÓN DE COLORES SIMILARES)

**Contexto:** El intento anterior de la paleta falló porque el código no agrupó los colores similares antes de contar. Si el logo tiene muchos tonos de un mismo color (por ejemplo, una foto), el sistema los cuenta todos como diferentes, se hace un lío y no aplica las reglas de los 3 casos.

**Qué cambiar:**
En `Motor-Logica-y-Acronimos/logica.js`, dentro de la función `analizarColoresLogoAutomatico()` (o el método usado para extraer colores):

1. **Filtrar Blanco y Negro:** Eliminar cualquier color que sea muy claro (blanco) o muy oscuro (negro) del escaneo inicial, para no contaminar la paleta.
2. **Agrupar Similares:** Implementar una función de agrupación matemática. Si dos colores son muy parecidos (por ejemplo, su distancia en el espacio RGB es menor a un umbral, como 50), deben fusionarse en uno solo, promediando su color.
3. **Contar los Reales:** Una vez agrupados, contar cuántos colores quedan realmente.
4. **Aplicar los Casos (0, 1 y 2+):** Aplicar exactamente las combinaciones matemáticas que se definieron antes (Caso 0: todo Stratos, Caso 1: 75% del color + 25% Verde/Rojo, Caso 2: los dos colores más pesados + las combinaciones).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: en la función de análisis de colores.

**Qué NO hacer:**
- NO modificar el diseño de los cuadros de la paleta.
- NO cambiar los colores base de Stratos definidos en `datos.js`.
- NO alterar la lógica de selección de colores por parte del usuario.

---

**Fin de las instrucciones.