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

## PUNTO ÚNICO: REDISEÑO DEL ALGORITMO DE LA PALETA DE COLORES (DIVERSIDAD)

**Contexto:** Actualmente, el algoritmo de la paleta (`analizarColoresLogoAutomatico`) está metiendo colores repetidos (varios tonos de azul, o varios blancos) porque no descarta los colores similares del logo. El Arquitecto ha definido una regla exacta de combinatoria y pesos para garantizar que siempre haya 8 colores variados.

**Qué cambiar:**
- En `logica.js`, reescribir la lógica de la función `analizarColoresLogoAutomatico` (y `generarPaleta` si es necesario) para que construya la paleta de 8 colores basándose en la siguiente regla:

1. **Escaneo:** Analizar los colores del logo. Descartar el blanco puro (`#FFFFFF`) y el negro puro (`#000000`).
2. **Pesos:** Si quedan 2 o más colores, ordenarlos de mayor a menor presencia en el logo.
3. **Construcción de la paleta según el caso:**
   - **Caso 0 (Cero colores, logo puro blanco y negro):** 
     1. Blanco, 2. Negro, 3. Azul Fondo General, 4. Azul Área Útil, 5. Naranja, 6. Rojo, 7. Verde Stratos, 8. Combinación (75% Verde Stratos + 25% Azul Área Útil).
   - **Caso 1 (Un solo color encontrado, ej. Azul):**
     1. Color encontrado, 2. Combinación (75% Color encontrado + 25% Verde Stratos), 3. Combinación (75% Color encontrado + 25% Rojo Stratos), 4. Blanco, 5. Negro, 6. Azul Fondo General, 7. Azul Área Útil, 8. Naranja.
   - **Caso 2 (Dos o más colores encontrados):** (Tomar solo los 2 de mayor peso).
     1. Color 1, 2. Color 2, 3. Blanco, 4. Negro, 5. Verde Stratos, 6. Naranja Stratos, 7. Combinación (75% Color 1 + 25% Rojo Stratos), 8. Combinación (75% Color 2 + 25% Verde Stratos).

**Funciones de utilidad:**
- Crear o usar una función que mezcle dos colores HEX con un porcentaje (ej. 75% / 25%) para generar las combinaciones.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: funciones de análisis de logo y paleta.
- `Motor-Logica-y-Acronimos/datos.js`: si es necesario, mover las listas de colores base (Azul Fondo, Azul Útil, Naranja, Rojo, Verde) para que sean constantes globales.

**Cómo debe quedar:**
- Al cargar un logo, la paleta siempre debe mostrar 8 colores variados (sin repetir el mismo tono del logo, salvo en los Casos 0 y 1 que es imposible).
- La paleta debe respetar los 3 casos matemáticos definidos.

**Qué NO hacer:**
- NO cambiar el diseño de los cuadros de la paleta.
- NO alterar la forma en que el usuario selecciona los colores.

---

**Fin de las instrucciones.