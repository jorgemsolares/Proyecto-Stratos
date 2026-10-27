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

## PUNTO ÚNICO: REDISEÑO DE LA PALETA E INSERCIÓN DE BOTONES DE CONTROL DE IDENTIDAD

**Contexto:** Se necesita optimizar el espacio en la pantalla de Identidad Corporativa. Los cuadros de la paleta pasarán a ser rectángulos horizontales para liberar altura, y en ese espacio se insertarán dos botones de control con una distribución específica.

**Qué cambiar:**

1. **Paleta de Colores (CSS):**
   - En `estilos.css`, cambiar la clase `.color-cuadro` (o la que renderice la paleta). Eliminar `aspect-ratio: 1`.
   - Aplicar `height: 40px; width: 100%;` (o similar) para que se vean como rectángulos horizontales en lugar de cuadrados.
   - Ajustar el `grid` de la paleta para que los 8 rectángulos quepan en una fila, ocupando el ancho disponible.

2. **Botones de Control (HTML y CSS):**
   - En `index.html`, justo arriba de la paleta de colores (en el espacio liberado), agregar un contenedor (fila) para los botones.
   - **Botón 1 (Izquierda):** `Mantener colores actuales`. Clase `.btn-principal` (verde). 
   - **Botón 2 (Derecha):** `Volver a colores Stratos`. Clase `.btn-peligro` (rojo).
   - **Distribución (CSS):** El contenedor debe tener un `display: grid` con `grid-template-columns: repeat(7, 1fr)`.
     - El Botón 1 debe ocupar las columnas 2, 3 y 4 (ancho 3/7).
     - El Botón 2 debe ocupar las columnas 6, 7 y 8 (ancho 3/7).
     - El espacio entre ellos (columna 5) quedará vacío (1/7).
   - **Tamaño y texto:** Ambos botones deben tener el mismo tamaño que los botones de Fondo/Letras/Botones. Asegurar que el texto se ajuste al ancho (reduciendo el tamaño de letra si es necesario para que quepa en una sola línea).

3. **Lógica (JS):**
   - En `logica.js`, crear la función `mantenerColoresActuales()`: No altera los colores, solo confirma el guardado con el nuevo logo.
   - En `logica.js`, crear la función `restaurarColoresStratos()`: Resetea las variables `configuracionEstetica.colorFondo`, `colorTexto` y `colorBotones` a sus valores por defecto (`#0b0f19`, `#ffffff`, `#00ff88`), llama a `aplicarCambiosVisuales()` y actualiza la vista previa.
   - Conectar los botones a estas funciones.

**Cómo debe quedar:**
- La paleta se ve como una fila de 8 rectángulos.
- Justo arriba de la paleta, hay dos botones distribuidos según la regla 3/7 - 1/7 - 3/7, con sus textos legibles en una sola línea y los efectos de botón correspondientes (verde y rojo).

**Qué NO hacer:**
- NO cambiar el tamaño total de la pantalla ni agrandar el contenedor.
- NO alterar el algoritmo de generación de colores (los 3 casos ya están hechos).
- NO cambiar el diseño del recuadro de carga de logo.

---

**Fin de las instrucciones.