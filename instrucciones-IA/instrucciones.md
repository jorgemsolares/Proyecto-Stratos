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

**REGLAS DE ORO INVIOLABLES:**
1. **Color de Letras:** Todo texto debe usar `var(--color-letras)`. Excepciones: alertas semánticas y marca de agua.
2. **Color de Botones:** Todo fondo de botón debe usar `var(--color-botones)`.

---

## PUNTO ÚNICO: OPTIMIZACIÓN DE LA APLICACIÓN DE IDENTIDAD CORPORATIVA (EL "NUDO")

**Contexto:** Actualmente, la función `aplicarCambiosVisuales` en `logica.js` recorre elemento por elemento (p, span, botones, etc.) para aplicar los colores de la Identidad Corporativa. Esto provoca que los modales nuevos, los textos dinámicos y algunas pantallas no tomen el color correctamente (o se queden en blanco/amarillo).

**Qué cambiar:**
- **En `estilos.css`:**
  - En la regla universal `*`, agregar `color: var(--color-letras);` para que todos los textos hereden el color automáticamente.
  - Revisar que los botones del sistema (`btn-principal`, `btn-secundario`, etc.) ya usen `background: var(--color-botones);` (esto ya está, solo verificar).
- **En `logica.js`:**
  - Modificar la función `aplicarCambiosVisuales()` (y `aplicarBrandingGlobal()` si es necesario) para que **dejen de recorrer elementos**.
  - En su lugar, la función solo debe inyectar las variables CSS en la raíz del documento (`document.documentElement.style.setProperty('--color-letras', ...)`).
  - Al cambiar la variable en la raíz, el CSS se encargará de pintar todos los textos y botones de forma automática.

**Cómo debe quedar:**
- Al guardar la Identidad y recargar, los colores se mantienen.
- Al abrir un modal nuevo (como Detalle de Contacto o Detalle de Correo), el texto nace con el color correcto sin necesidad de que JS lo pinte.
- El rendimiento mejora porque el sistema no tiene que buscar cientos de elementos para pintarlos.

**Qué NO hacer:**
- NO cambiar el diseño de las pantallas.
- NO tocar los textos de las alertas de éxito/error ni la marca de agua (ellos mantienen su color propio).
- NO modificar la lógica de los botones.

---

**Fin de las instrucciones.