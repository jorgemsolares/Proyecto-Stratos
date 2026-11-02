# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`index.html`, `estilos.css`, `logica.js`, `datos.js`) para aplicar estos puntos. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

---

## PUNTO ÚNICO: EXPIRACIÓN DE CONTRASEÑA TEMPORAL Y CAMBIO OBLIGATORIO

**Contexto:** Cuando el jefe genera una contraseña temporal, esta solo debe servir por 1 día. Si el usuario entra con ella, el sistema debe obligarlo a cambiarla inmediatamente y no dejarlo usar la app hasta que lo haga.

**Qué cambiar:**

1. **Validación de Expiración en el Login (`logica.js`):**
   - En la función `validarEntrada()`:
     - Al encontrar al usuario y validar que la contraseña es correcta, verificar si `requiereCambioContrasena` es `true` y si tiene una fecha de expiración (`fechaExpiracionTemporal`).
     - Si la fecha actual es mayor a la fecha de expiración: rechazar el acceso, mostrar un aviso rojo (barra de notificaciones) con el mensaje: *"Tu contraseña temporal ha expirado. Por favor, solicita una nueva recuperación."* y limpiar el campo de contraseña.
     - Si la fecha es válida: permitir el ingreso, pero redirigir automáticamente a la pantalla de "Mi Perfil" (o mostrar el modal de cambio obligatorio) y bloquear la navegación a otras pantallas.

2. **Forzar el Cambio en "Mi Perfil" (`logica.js` y `index.html`):**
   - Si el usuario entró con una contraseña temporal, el sistema debe abrir la pantalla de "Mi Perfil" con el foco puesto en el área de cambio de contraseña.
   - Mostrar un aviso llamativo (amarillo o rojo) que diga: *"Estás usando una contraseña temporal. Debes cambiarla para continuar."*
   - El usuario debe ingresar la contraseña actual (la temporal), la nueva y la confirmación.
   - Al guardar la nueva contraseña exitosamente, el sistema debe:
     - Actualizar la contraseña en la base de datos.
     - Poner `requiereCambioContrasena = false` y limpiar la `fechaExpiracionTemporal`.
     - Redirigir al usuario a la pantalla de Comunicación (o a donde corresponda).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: funciones de validación de login y guardado de perfil.
- `Cuerpo-y-Textos/index.html`: modal o área de cambio de contraseña en Mi Perfil.

**Cómo debe quedar:**
- Si la temporal expiró, el usuario no puede entrar.
- Si la temporal es válida, el usuario entra pero queda "atrapado" en el Perfil hasta que cambie la contraseña.

**Qué NO hacer:**
- NO permitir el acceso a la app si la contraseña temporal está vencida.
- NO dejar que el usuario navegue a otras pantallas sin cambiar la contraseña.
- NO usar `prompt()`, `alert()` ni `confirm()`.

---

**Fin de las instrucciones.