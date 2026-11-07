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

## PUNTO 1: AGREGAR AVISOS DE FEEDBACK EN EL BOTÓN "SALVAR" DE PERFIL

**Contexto:** En la función `procesarRegistro()`, cuando el usuario guarda su perfil (en cualquiera de sus 3 variantes), el sistema debe mostrar un aviso en la barra de notificaciones con su icono correspondiente (Verde para éxito, Amarillo para advertencia).

**Qué cambiar:**
1. En `logica.js`, en la función `procesarRegistro()`:
   - **Registro nuevo (primera vez):** Antes de redirigir a `pantalla-configuracion`, mostrar un aviso **Verde** con el icono `Exito-verde.svg` que diga: *"Perfil creado correctamente. Continúa con la configuración"*.
   - **Edición normal:** Asegurar que el aviso actual (`"✓ Perfil actualizado"`) use el icono `Exito-verde.svg` y sea de tipo `exito` (Verde).
   - **Cambio de contraseña obligatorio:** Al cambiar la contraseña exitosamente, mostrar un aviso **Verde** con el icono `Exito-verde.svg` que diga: *"Contraseña actualizada correctamente. Perfil guardado"*.
   - **Si faltan campos:** Asegurar que el aviso actual (Amarillo, listando los campos) use el icono `Advertencia-naranja.svg` y sea de tipo `advertencia`.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `procesarRegistro()`.

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.
- NO cambiar la lógica de las validaciones.

---

## PUNTO 2: AUMENTAR EL TIEMPO DE VISIÓN DEL ÚLTIMO CARÁCTER EN LA MÁSCARA DE CONTRASEÑA

**Contexto:** En la función `manejarMascara()`, el último carácter de la contraseña se muestra por 800 milisegundos. Ese tiempo es muy corto para que el usuario verifique que escribió bien. Se aumentará a 2500 milisegundos (2.5 segundos) para mayor comodidad, sin comprometer la seguridad.

**Qué cambiar:**
- En `logica.js`, en la función `manejarMascara()`:
  - Cambiar el valor `800` en el `setTimeout` (que oculta el carácter) a `2000`.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `manejarMascara()`.

**Qué NO hacer:**
- NO agregar un botón de "ojo" para ver la contraseña (decisión de seguridad del Arquitecto).

---

**Fin de las instrucciones.