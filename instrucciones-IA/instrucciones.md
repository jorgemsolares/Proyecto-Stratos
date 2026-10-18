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

## PUNTO 1: CORREGIR EL ERROR DE HTML EN LA CARTELERA

**Contexto:** Al implementar los iconos, los mensajes de la cartelera muestran el código HTML literal (`<img src="...">`) en lugar de la imagen. Esto ocurre porque se está usando `innerText` para inyectar el mensaje, y `innerText` trata todo como texto plano.

**Qué cambiar:**
- En `logica.js`, en las funciones que inyectan los mensajes en la cartelera (`mostrarSiguienteMensaje` y `mostrarAvisoInmediato`), cambiar la propiedad `innerText` por `innerHTML` únicamente para el contenedor donde se muestra el texto de la cartelera (`#texto-mensaje-personalizado`).
- **Ojo:** NO cambiar `innerText` por `innerHTML` en los inputs (`input.value`), ya que eso rompería la seguridad y la visualización de los campos de texto.

**Dónde:**
- `logica.js`, función `mostrarSiguienteMensaje()`: donde dice `textoMensaje.innerText = mensaje.texto;`, cambiar a `textoMensaje.innerHTML = mensaje.texto;`.
- `logica.js`, función `mostrarAvisoInmediato()`: donde dice `textoMensaje.innerText = texto;`, cambiar a `textoMensaje.innerHTML = texto;`.

---

## PUNTO 2: REEMPLAZAR TODOS LOS EMOJIS RESTANTES POR SVGs

**Contexto:** En la revisión anterior quedaron varios emojis sin reemplazar en el código (por ejemplo: el sobre de Correos, la cámara de Reuniones, el candado de Biometría, el menú lateral, etc.). Deben ser reemplazados por los SVG de la carpeta, usando el formato de imagen inline (`<img class="icono-inline" src="...">`) y color verde.

**Qué cambiar:**
- Revisar el archivo `index.html` y `logica.js` de arriba a abajo y reemplazar TODOS los emojis que aún queden.
- Usar las etiquetas `<img>` con la clase `icono-inline` (o la que hayas definido en el CSS) y la ruta relativa al SVG.
- Asegurarse de que el CSS de `.icono-inline` ajuste el tamaño y el color (verde `#00ff88`) correctamente.

**Dónde y cuáles (ejemplos detectados, pero revisar todo):**
- `index.html`:
  - `<h2>📧 Correos</h2>` → Usar `correos.svg`.
  - `<p style="font-size:3rem;">📹</p>` (en Reuniones) → Usar `Reuniones.svg`.
  - `<h3>🔒 Seguridad</h3>` (en configuración) → Usar `Cambiar contraseña.svg` o similar.
  - `<p class="titulo-biometria">🔐 Autenticación biométrica...</p>` → Usar `Cambiar contraseña.svg` o `rostro.svg`.
  - `<h3>🤖 Configuración de IA</h3>` → Usar un icono de IA o dejar texto.
  - Cualquier otro emoji en títulos, botones o menús estáticos.
- `logica.js` (dentro de `actualizarMenuTuerca` y textos generados):
  - `🚪` → Usar `Salir.svg` (o el correspondiente).
  - `👤`, `🏢`, `📊`, `🌐`, `⚙️`, `⬡`, `📧`, `💬`, `✅`, `⏰`, `📅`, `📁`, `📱`, `📹` → Usar sus respectivos SVG.
  - `🔗` y `👁️` en nodos (usar SVGs de Indirecto/Observador).
  - `✏️` (Editar), `🗑️` (Eliminar), `💾` (Guardar), `📤` (Subir).

**Regla para el futuro:**
- Revisar la carpeta `Iconos/` antes de poner un icono. Si no hay uno adecuado, NO inventar, NO usar emoji, NO usar otro icono. Debe preguntar al Arquitecto.

**Qué NO hacer:**
- NO modificar la lógica de los botones.
- NO cambiar los textos que no sean emojis.

---

**Fin de las instrucciones.**