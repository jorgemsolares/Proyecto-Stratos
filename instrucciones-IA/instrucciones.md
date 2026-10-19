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
- La carpeta de iconos: `Colores-y-Estetica/Iconos/` (verificar los nuevos: `flecha izquierda.svg`, `Error-rojo.svg`, `Advertencia-naranja.svg`).

---

## PUNTO 1: REDISEÑO ESTRUCTURAL DE LA PANTALLA DE CORREOS (ESTILO GMAIL)

**Contexto:** La pantalla de correos actual apila los botones, no se ve bien y no emula a un gestor de correos. Se cambiará a un diseño de dos columnas.

**Qué cambiar:**
- Modificar la estructura de `<section id="pantalla-correos">` en `index.html`.
- Usar flexbox o grid en `estilos.css` para crear el layout de dos columnas.

**Cómo debe quedar (Estructura visual):**
- **Encabezado (Arriba):** 
  - Izquierda: Botón con el icono `flecha izquierda.svg` (sin texto) que lleva a "Volver a Comunicación".
  - Centro: Título "Correos".
- **Columnas:**
  - **Izquierda (Menú):** Botón `REDACTAR` arriba. Debajo, lista vertical de vistas (Recibidos, Enviados, Carpetas, Eliminados, Borradores, Spam).
  - **Derecha (Contenido):** Barra de búsqueda arriba. Debajo, lista de correos.

**Qué NO hacer:**
- NO romper la vista responsiva (en celular, las columnas deben apilarse).

---

## PUNTO 2: CORREGIR EL EFECTO DE LOS BOTONES DEL MENÚ LATERAL

**Contexto:** Los botones del menú lateral (Recibidos, Enviados, etc.) tienen el borde iluminado permanentemente. Incumplen la regla general de botones.

**Qué cambiar:**
- En `estilos.css`, quitar el borde iluminado fijo de los botones del menú lateral.
- Aplicar la regla general: borde transparente en estado normal, borde verde y sombra intensificada solo en `:hover`, halo intenso en `:active`.
- La vista activa (la carpeta en la que está el usuario) debe distinguirse (ej. fondo más claro y texto verde), pero sin el borde iluminado permanente.

**Qué NO hacer:**
- NO cambiar la estructura de la lista, solo el CSS.

---

## PUNTO 3: DISEÑO DE LA LISTA DE CORREOS (FILAS) Y DATOS DE PRUEBA

**Contexto:** No hay correos para probar el diseño. Se deben inyectar datos falsos y estructurar cada fila.

**Qué cambiar:**
- En `logica.js`, en la función `cargarCorreosLocales()` (o al inicializar), inyectar 3 o 4 correos de prueba en `correosLocales` (vista "recibidos") si la lista está vacía.
- En `logica.js`, en `renderizarListaCorreos()`, ajustar la estructura de cada fila.

**Cómo debe quedar cada fila:**
- **Línea 1:** Remitente en negrita y a la derecha la Fecha (letra más pequeña, gris).
- **Línea 2:** Asunto en negrita.
- **Línea 3:** Vista previa del texto, máximo 3 líneas (con elipsis si es más largo).
- **Tamaño de letra:** Adecuado (14px o 15px) para leer sin zoom.

---

## PUNTO 4: FUNCIÓN DE ADJUNTAR EN LA VENTANA DE REDACTAR

**Contexto:** El botón de adjuntar documento en la ventana de redactar no funciona.

**Qué cambiar:**
- En `index.html` (dentro del modal de redactar), el botón de clip debe ser un `<input type="file" style="display:none;">` activado por el botón visual.
- En `logica.js`, agregar la lógica para capturar el archivo seleccionado y mostrar un aviso o texto (ej. "Archivo adjunto: documento.pdf") dentro de la ventana.

**Qué NO hacer:**
- NO intentar subir el archivo a internet (no hay servidor todavía). Solo capturar y mostrar el nombre.

---

**Fin de las instrucciones.