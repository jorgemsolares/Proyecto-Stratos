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
- La carpeta de iconos: `Colores-y-Estetica/Iconos/`.

---

## PUNTO 1: AGREGAR EL BOTÓN "REDACTAR" EN LA PANTALLA DE CORREOS

**Contexto:** La pantalla de Correos actual (en `index.html`) no tiene un botón para crear un correo nuevo. Se necesita agregar uno para dar acceso a la pantalla de redacción.

**Qué cambiar:**
- Agregar un botón en la interfaz de la pantalla de Correos.
- Al presionarlo, debe abrir la nueva pantalla de redacción (que se creará en el Punto 2).

**Dónde:**
- `index.html`: dentro de `<section id="pantalla-correos" class="pantalla">`, justo debajo del título `<h2>📧 Correos</h2>` (o junto a la barra de búsqueda).
- `logica.js`: crear la función que maneja el clic y llama a la nueva pantalla.

**Cómo debe quedar:**
- Un botón verde (`btn-principal`) que diga "REDACTAR".
- Ubicado visualmente de forma que resalte (por ejemplo, alineado a la derecha antes de la barra de búsqueda, o como primer botón de la barra de vistas).
- Al hacer clic, se debe ocultar la lista de correos y mostrar la pantalla de redacción.

---

## PUNTO 2: PANTALLA DE REDACCIÓN DE CORREOS

**Contexto:** Se necesita crear la vista para redactar un correo nuevo. Se basará en la simplicidad visual de Gmail, ocupando la pantalla completa pero respetando el encabezado (logo + cartelera) y el pie (sello de agua, botón Vero y botón Libro).

**Qué cambiar:**
- Crear el HTML de la pantalla de redacción (nueva `<section class="pantalla">`).
- Agregar los estilos en `estilos.css`.
- Agregar la lógica en `logica.js` para mostrar la pantalla, capturar los datos y manejar los botones.

**Cómo debe quedar (Estructura visual):**
- **Pantalla completa:** Debe ocupar el espacio central (`#app-container`), respetando los márgenes y la estructura de las demás pantallas.
- **Botón "Volver":** En la parte superior izquierda para cancelar y regresar a la bandeja.
- **Campos (estilo Gmail):**
  - `De:` (Fijo, mostrando el email del `usuarioActivo`).
  - `Para:` (Input con autocompletado y validación visual).
  - `Asunto:` (Input de texto).
  - `Mensaje:` (Textarea grande y expansible).
- **Barra de acciones (abajo):**
  - Botón principal: `ENVIAR` (verde).
  - Botón secundario: `ENVIAR + TAREA` (naranja).
  - Botón secundario: `ENVIAR + ALARMA` (naranja).
  - Botón de peligro/descartar: `DESCARTAR` (rojo).
- **Botón de adjuntar:** Un ícono de clip (revisar carpeta `Iconos/`, si no existe, preguntar al Arquitecto).

**Lógica de los botones (Trabajo Invisible):**
- Al presionar **ENVIAR**:
  1. Validar que el destinatario y el asunto no estén vacíos.
  2. Guardar el correo en la vista "Enviados" (`correosLocales`).
  3. Registrar en el `bancoDatos` la actividad: "Envió correo a [destinatario]" con fecha y hora.
  4. Mostrar aviso de éxito y volver a la lista de correos.
- Al presionar **ENVIAR + TAREA**:
  1. Hacer el envío del correo (pasos anteriores).
  2. Redirigir al usuario a la pantalla de creación de Tareas (si no existe, avisar "Módulo en preparación").
- Al presionar **ENVIAR + ALARMA**:
  1. Hacer el envío del correo.
  2. Redirigir al usuario a la pantalla de creación de Alarmas (si no existe, avisar "Módulo en preparación").

**Nota sobre el "Tiempo de espera" (Vero):**
- No se debe implementar lógica compleja de tiempos en este punto. Solo registrar la hora exacta en que se envía el correo en el banco de datos.

**Qué NO hacer:**
- NO intentar conectar a servidores SMTP reales en este punto (sigue siendo simulado).
- NO salirse del diseño base (mantener logo, cartelera, sello, Vero y Libro).
- NO cambiar la forma en que se muestran los correos en la bandeja de entrada actual.

---

**Fin de las instrucciones.