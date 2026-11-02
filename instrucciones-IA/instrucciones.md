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

## PUNTO ÚNICO: VALIDACIONES Y LÓGICA DEL BOTÓN "SALVAR" EN PERFIL

**Contexto:** La pantalla de Perfil necesita validar los campos correctamente y manejar dos flujos distintos: el primer registro (que debe llevar a Configuración para terminar el onboarding) y la edición posterior (que debe quedarse en el Perfil). Además, debe gestionar el aviso de contraseña temporal.

**Qué cambiar:**

1. **Validación de Campos (logica.js):**
   - En la función `procesarRegistro()`:
     - **Campos estrictamente obligatorios (bloquean el guardado):** Nombres, Apellidos, ID Empleado, Posición, Contraseña y Confirmar Contraseña.
     - **Contacto obligatorio:** Debe haber al menos un Teléfono o un Email. Si ambos están vacíos, no se permite grabar.
     - **Si falta un campo obligatorio:** Mostrar un aviso **Amarillo** en la barra de notificaciones listando exactamente qué falta (ej. *"Falta el Apellido y el Email"*) y detener el guardado.
     - **Si se graba con campos opcionales vacíos (ej. falta el Email pero hay Teléfono):** Guardar los datos y mostrar un aviso **Amarillo** que diga *"Perfil guardado. Quedó pendiente: [campo faltante]"*.

2. **Lógica del Botón "SALVAR" (logica.js):**
   - **Primera vez (Registro nuevo):** Después de guardar exitosamente, redirigir a la pantalla `pantalla-configuracion` (para completar el onboarding).
   - **Ediciones posteriores (ya existe usuarioActivo.id):** Después de guardar, quedarse en la pantalla de Perfil y mostrar el aviso Verde de *"Perfil actualizado correctamente"*.

3. **Aviso de Contraseña Temporal (logica.js y estilos.css):**
   - Si el usuario entró con una contraseña temporal, al cargar la pantalla de Perfil, mostrar un aviso claro y bloqueante (Amarillo o Rojo) en la barra de notificaciones: *"Debes crear y guardar una nueva contraseña ahora"*.
   - **Conteo de 24 horas:** La fecha de expiración de la contraseña temporal debe calcularse desde el momento en que el usuario **recibe** la contraseña (o cuando el sistema la simula), no desde que el jefe la crea.
   - El usuario debe poder cambiar la contraseña en esta misma pantalla (campos de contraseña actual, nueva y confirmación).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `procesarRegistro()`, lógica de redirección y validación.
- `Cuerpo-y-Textos/index.html`: estructura del Perfil (ya existe).
- `Colores-y-Estetica/estilos.css`: estilos del aviso (si es necesario).

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.
- NO agregar botón de "ojo" al campo de contraseña (mantener la máscara actual).
- NO bloquear el guardado si falta un campo opcional (solo avisar).

---

**Fin de las instrucciones.