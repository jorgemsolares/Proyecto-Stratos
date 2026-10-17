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
- El repositorio del código en GitHub (`Proyecto-Stratos`).
- El repositorio de las Minutas (`Comunicaci-n-IA-Internet`).

**Reglas de trabajo del proyecto:**
- Cuando en este documento se mencione "la IA" o "Vero", se refiere a la IA del sistema que se implementará después.
- Este texto es muy detallado a propósito. No lo resumas ni lo interpretes. Ejecuta exactamente lo que dice.
- REGLA INVIOLABLE: Tienes ESTRICTAMENTE PROHIBIDO alterar la lógica, proponer cambios de diseño por tu cuenta, o agregar funciones que no se te han solicitado. NO hagas nada que no esté en este documento.
- Al terminar todo: guarda en `MEMORIA.md` (bitácora) un resumen de lo solicitado en este documento y de lo que realizaste, y ejecuta `sincronizar_git.ps1` para subir a GitHub. Verifica que la subida funcionó. Si no puedes, avísalo claramente.

---

## PUNTO 1: ACTUALIZAR LOS VALORES POR DEFECTO EN datos.js

**Contexto:** El cambio de color base de botones se aplicó en `estilos.css` (`--color-botones: #0b0f19`), pero `datos.js` sigue teniendo los valores viejos en `#00ff88`. Como `aplicarCambiosVisuales()` sobreescribe la variable CSS con el valor de `configuracionEstetica.colorBotones`, al cargar la app todo vuelve al verde brillante. Hay que actualizar los valores por defecto en `datos.js`.

**Qué cambiar:**
- En `datos.js`, dentro del objeto `identidadCorporativa`, cambiar `colorBotones: "#00ff88"` por `colorBotones: "#0b0f19"`.
- En `datos.js`, dentro del objeto `configuracionEstetica`, cambiar `colorBotones: "#00ff88"` por `colorBotones: "#0b0f19"`.

**Dónde:**
- `Motor-Logica-y-Acronimos/datos.js`, sección 2.1 (ESTADO DE IDENTIDAD CORPORATIVA) y sección 2.3 (CONFIGURACIÓN ESTÉTICA APLICADA).

**Cómo debe quedar:**
- `identidadCorporativa.colorBotones = "#0b0f19"`.
- `configuracionEstetica.colorBotones = "#0b0f19"`.
- Cuando el usuario no ha definido un color de Botones en Identidad Corporativa, el sistema usa `#0b0f19` (oscuro, igual al fondo).

**Qué NO hacer:**
- NO tocar `colorFondo` ni `colorTexto`.
- NO tocar la paleta de colores (`coloresExtraidos`).
- NO tocar `identidadCorporativa.completada` ni ningún otro campo.

---

## PUNTO 2: EL BOTÓN "LIBRO" DEBE USAR EL COLOR DE BOTONES

**Contexto:** El botón "Libro" (`.tuerca-navegacion`) usa `var(--color-primario)` como fondo, por eso se ve verde brillante aunque el resto de botones ya usen el color de Botones del usuario. Debe usar `var(--color-botones)` como el resto.

**Qué cambiar:**
- En `estilos.css`, dentro de `.tuerca-navegacion`, cambiar `background: var(--color-primario);` por `background: var(--color-botones, var(--color-primario));`.

**Dónde:**
- `Colores-y-Estetica/estilos.css`, sección 3.10 (TUERCA - MENÚ LATERAL).

**Cómo debe quedar:**
- `.tuerca-navegacion` usa `var(--color-botones, var(--color-primario))` como fondo.
- El halo, la sombra y la animación (hover: rotación 90° + escala 1.08; active: rotación 90° + halo + inset) se mantienen iguales.
- El icono (`<span>📋</span>`) se mantiene igual.

**Qué NO hacer:**
- NO cambiar el tamaño, la posición ni la forma del botón.
- NO cambiar la animación (rotación 90°, escala 1.08).
- NO tocar el botón de la IA (`.boton-ia`), que tiene su propio tratamiento.

---

## PUNTO 3: EL BOTÓN "LIBRO" NO DEBE APARECER ANTES DE ENTRAR

**Contexto:** En `validarEntrada`, antes del `setTimeout(..., 1500)` que lleva a la pantalla de Comunicación, hay una línea que fuerza el Libro a `display:flex` mientras el usuario todavía está en Login. Por eso aparece durante 1.5 segundos en la pantalla de Login antes de cambiar.

**Qué cambiar:**
- En `logica.js`, dentro de `validarEntrada`, quitar (o comentar) la línea que pone `botonTuerca.style.display = 'flex'` ANTES del `setTimeout`.
- La visibilidad del Libro ya la maneja `irAPantalla` (que lo oculta en Login y lo muestra en el resto). No hace falta forzarla en `validarEntrada`.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`, dentro de `validarEntrada`. La línea exacta a quitar es:
  `const botonTuerca = document.getElementById('boton-tuerca-global');`
  `if (botonTuerca) botonTuerca.style.display = 'flex';`
- Esa línea está justo antes del `setTimeout` que lleva a `pantalla-identidad` o `pantalla-comunicacion`.

**Cómo debe quedar:**
- El Libro NO aparece mientras el usuario está en Login.
- Aparece solo cuando `irAPantalla` cambia a Comunicación (después del `setTimeout`).
- El resto del flujo de login se mantiene igual.

**Qué NO hacer:**
- NO cambiar el `setTimeout` de 1500 ms.
- NO cambiar cómo se muestra u oculta el Libro en otras pantallas.
- NO tocar el botón de la IA.

---

## PUNTO 4: AL CERRAR SESIÓN, LIMPIAR LA VARIABLE DE COLOR DE BOTONES

**Contexto:** Cuando `aplicarCambiosVisuales()` corre, setea `--color-botones` inline en el elemento `<html>` con el valor que el usuario tenga. Al cerrar sesión, esa variable NO se limpia, así que el botón ENTRAR de Login queda con el color del usuario anterior en lugar del `#0b0f19` por defecto del CSS.

**Qué cambiar:**
- En `logica.js`, dentro de `cerrarSesion`, agregar la limpieza de las variables CSS que `aplicarCambiosVisuales` dejó inline en `<html>`: `--color-fondo`, `--color-texto`, `--color-letras`, `--color-primario`, `--color-botones`.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`, dentro de `cerrarSesion`, después de `usuarioActivo = null;` y antes de `irAPantalla('pantalla-acceso')`.

**Cómo debe quedar:**
- Al cerrar sesión, el `<html>` queda sin las variables CSS inline.
- Al volver a Login, el botón ENTRAR se ve con el `#0b0f19` por defecto del CSS.
- Al entrar de nuevo, si el usuario tiene su propia identidad corporativa, `aplicarCambiosVisuales` vuelve a setear las variables.

**Qué NO hacer:**
- NO cambiar la lógica de cierre de sesión (confirmación, registro de hora de salida, limpieza de `sessionStorage`).
- NO tocar el `usuarioActivo`.
- NO tocar otras variables de sesión.

---

**Fin de las instrucciones.**