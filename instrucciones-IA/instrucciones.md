# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. **DEPURACIÓN DE MEMORIA:** Antes de iniciar cualquier cambio, revisar la sección BITÁCORA de `MEMORIA.md`. Si hay entradas terminadas con más de 3 meses de antigüedad, trasladarlas a `Historial_Bitacora.md` (conservando el historial) y eliminarlas de `MEMORIA.md`.
5. Al terminar todo, actualizar `MEMORIA.md` con lo realizado y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`index.html`, `estilos.css`, `logica.js`, `datos.js`) para aplicar estos puntos. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

---

## PUNTO 1: AGREGAR AVISO DE FEEDBACK AL BOTÓN "GUARDAR CAMBIOS" EN CONFIGURACIÓN

**Contexto:** Al presionar "GUARDAR CAMBIOS" en Configuración, el sistema guarda los datos pero no muestra ningún aviso, por lo que el usuario no sabe si la acción tuvo éxito.

**Qué cambiar:**
- En `logica.js`, en la función `guardarConfiguracion()`:
  - Al finalizar exitosamente el guardado, mostrar un aviso **Verde** en la barra de notificaciones usando la función `mostrarAvisoInmediato`, con el icono `Exito-verde.svg` y el texto: *"Configuración guardada correctamente"*.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `guardarConfiguracion()`.

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.

---

## PUNTO 2: INSERTAR EL ICONO "FIRMA.SVG" EN EL TÍTULO

**Contexto:** El título "Firma del Usuario" en Configuración perdió el icono (se eliminó el emoji genérico) pero no se colocó el icono correspondiente de la carpeta.

**Qué cambiar:**
- En `index.html`, en el bloque del área de Firma:
  - Antes del texto "Firma del Usuario", insertar la etiqueta de imagen usando el icono `firma.svg` de la carpeta correspondiente, con la clase `icono-inline` y la ruta `../Colores-y-Estetica/Iconos/firma.svg`.

**Dónde:**
- `Cuerpo-y-Textos/index.html`: Sección `pantalla-configuracion`.

**Qué NO hacer:**
- NO usar emojis.

---

## PUNTO 3: QUITAR EL HALO AL CHECKBOX "INSERTAR FIRMA AUTOMÁTICAMENTE"

**Contexto:** El checkbox de "Insertar firma automáticamente" tiene un halo/brillo que lo distorsiona visualmente. No debe tener los estilos de la regla de botones.

**Qué cambiar:**
- En `estilos.css`:
  - Asegurar que el checkbox `#config-firma-automatica` (o la clase que se le esté aplicando) NO tenga el `box-shadow` (halo) ni el borde iluminado de los botones. Debe verse como un checkbox estándar.

**Dónde:**
- `Colores-y-Estetica/estilos.css`: clases relacionadas con el checkbox de la firma.

**Qué NO hacer:**
- NO cambiar el tamaño ni la funcionalidad del checkbox.

---

## PUNTO 4: AJUSTAR EL TIEMPO DE LA MÁSCARA DE CONTRASEÑA A 2500 MS

**Contexto:** El tiempo de visión del último carácter en la máscara de contraseña se estableció en 2000 ms, pero el Arquitecto solicitó 2500 ms.

**Qué cambiar:**
- En `logica.js`, en la función `manejarMascara()`:
  - Cambiar el valor `2000` del `setTimeout` a `2500`.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `manejarMascara()`.

**Qué NO hacer:**
- NO agregar botón de "ojo".

---

**Fin de las instrucciones.