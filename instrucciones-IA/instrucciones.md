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

## PUNTO 1: REORGANIZACIÓN VISUAL DEL BLOQUE DE IA EN CONFIGURACIÓN

**Contexto:** El bloque de la IA en Configuración ocupa demasiado espacio vertical. Se ajustará a un diseño de dos columnas (50% y 50%) y se le dará la relevancia de "Asistente Ejecutivo".

**Qué cambiar:**
- En `index.html` y `estilos.css`, dentro de la sección de IA en Configuración:
  - Crear un contenedor Flexbox (fila).
  - A la izquierda (50%): Título y texto descriptivo ("Personaliza a tu Asistente Ejecutivo...").
  - A la derecha (50%): La esfera del botón de IA (`.boton-ia`), reducida de tamaño (ej. `width: 70px; height: 70px;`) para que quepa en esa mitad.
  - El alto total del bloque debe reducirse.

---

## PUNTO 2: IMPLEMENTACIÓN DEL ÁREA DE FIRMA EN CONFIGURACIÓN

**Contexto:** Se reemplazará el bloque de "Seguridad" por el área de configuración de la Firma del Usuario. El sistema debe permitir al usuario crear una firma con formato (tipo de letra, tamaño, color) y decidir si se inserta automáticamente.

**Qué cambiar:**
- En `index.html`, en `pantalla-configuracion`:
  - Eliminar el bloque de `<div class="config-section">` que contiene "🔒 Seguridad" y su texto.
  - Crear un nuevo bloque "✍️ Firma del Usuario".
  - **Título:** Un encabezado que diga "Firma del Usuario".
  - **Área de texto:** Un `<textarea id="config-firma-texto">` (o un `div contenteditable="true"`) de 5 líneas de alto, donde el usuario escriba.
  - **Barra de herramientas:** Justo debajo del área de texto, agregar los botones de personalización (Tipografía, Estilo, Tamaño y Color con la paleta `coloresExtraidos`), replicando las opciones que ya existen en Identidad Corporativa.
  - **Checkbox:** Debajo de la barra de herramientas, un `<input type="checkbox" id="config-firma-automatica">` con la etiqueta: "Insertar firma automáticamente en los correos".
- En `logica.js`:
  - En la función `guardarConfiguracion()`, guardar el texto de la firma en `configuracionPersonal.firmaTexto` y el estado del checkbox en `configuracionPersonal.firmaAutomatica`.
  - Asegurar que al cargar la pantalla de Configuración (función `irAPantalla('pantalla-configuracion')` o similar), se recupere el texto de la firma y el estado del checkbox.

**Qué NO hacer:**
- NO mencionar ni inyectar nada en el módulo de Correos todavía.
- NO borrar la lógica de biometría que existe en el sistema, solo el bloque visual de "Seguridad" en esta pantalla.
- NO agregar botones extra fuera de los 3 permitidos (Tipografía, Estilo, Color, y el de Tamaño).

---

**Fin de las instrucciones.