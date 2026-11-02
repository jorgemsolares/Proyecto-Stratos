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

## PUNTO 1: FLUJO DE RECUPERACIÓN DE CONTRASEÑA (SOLICITUD Y TEMPORAL SIMULADA)

**Contexto:** El sistema debe permitir al usuario recuperar su contraseña si la olvida. Al no tener un servidor de correos real todavía, el envío se simulará guardando la contraseña temporal y mostrándola en pantalla al jefe (para pruebas), pero con toda la lógica de seguridad (vencimiento de 1 día, obligación de cambio, etc.).

**Qué cambiar:**

1. **Visibilidad y Efecto del Botón (index.html y estilos.css):**
   - En `index.html`, en la pantalla de Login (`pantalla-acceso`), quitar el `style="display: none;"` al botón `#btn-olvidaste-pass` para que sea visible siempre.
   - En `estilos.css`, asegurar que el botón `.btn-link` tenga un efecto hover claro (que cambie a verde Stratos o tenga un resplandor).

2. **Lógica de la Solicitud (logica.js):**
   - Al presionar "¿Olvidaste tu contraseña?", el sistema debe:
     - Registrar una solicitud en la memoria (`localStorage`, clave `stratos_solicitudes_recuperacion`). Esta solicitud debe incluir el ID del usuario, el nombre, la fecha y el estado (`pendiente`).
     - Mostrar un aviso en la barra de notificaciones: *"Solicitud de contraseña enviada al jefe. Espere su respuesta."*
     - (Simulación de correo enviado): Registrar en la bandeja local de correos (o en el banco de datos) un mensaje que diga: *"Correo silencioso enviado al jefe solicitando recuperación de contraseña"*.

3. **Configuración del Jefe (Candado de Seguridad y Generación de Temporal):**
   - En la pantalla de Configuración (`pantalla-configuracion`), en el área de recuperación de contraseñas:
     - **El Candado:** Si no existe una solicitud pendiente en `stratos_solicitudes_recuperacion` para el usuario que se está buscando, el sistema debe bloquear el campo de "Enviar Contraseña" y mostrar un aviso: *"No hay ninguna solicitud de recuperación pendiente para este usuario"*.
     - **La Generación (Simulada):** Si la solicitud existe, el jefe ingresa la contraseña temporal manualmente (puede ser cualquier texto, como "otravezlaolvidaste"). Al presionar "Enviar Contraseña":
       - El sistema guarda esa contraseña temporal en el perfil del usuario solicitante (`baseDatosUsuarios`).
       - Marca al usuario con la bandera `requiereCambioContrasena = true`.
       - Asigna una fecha de vencimiento a la contraseña temporal (`fechaExpiracionTemporal = new Date() + 1 día`).
       - **Para pruebas:** Muestra en pantalla un aviso (o en el modal) que diga: *"Contraseña temporal generada: [Clave]. (Simulación de envío al correo/celular del usuario)"*.
       - Cambia el estado de la solicitud a `completada`.

4. **Bloqueo y Cambio Obligatorio (logica.js):**
   - En `validarEntrada()` (Login): Si el usuario intenta entrar con una contraseña temporal y ha pasado más de 1 día desde su creación, el sistema debe negar el acceso y mostrar un aviso rojo: *"Contraseña temporal expirada. Solicite una nueva recuperación."*
   - Si la temporal es válida, el sistema debe permitir el acceso pero redirigir automáticamente a "Mi Perfil" (área de contraseña) y mostrar un modal o aviso bloqueante que diga: *"Debes cambiar tu contraseña temporal antes de continuar"*.

**Dónde:**
- `Cuerpo-y-Textos/index.html`: Pantalla de Login y Configuración.
- `Colores-y-Estetica/estilos.css`: Efecto del botón de olvido.
- `Motor-Logica-y-Acronimos/logica.js`: Lógica de solicitud, generación de temporal, validación de vencimiento y redirección al Perfil.
- `Motor-Logica-y-Acronimos/datos.js`: Añadir la estructura para las solicitudes y la fecha de expiración en el usuario.

**Cómo debe quedar:**
- El usuario puede pedir recuperación desde el Login.
- El jefe solo puede generar la temporal si el usuario la pidió (candado).
- La contraseña temporal vence en 1 día.
- El usuario es obligado a cambiarla al entrar.

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()` (usar la barra de notificaciones y modales).
- NO permitir que el jefe cambie contraseñas sin solicitud.
- NO conectar a un servidor de correo real (solo simular mostrando el mensaje en pantalla).

---

**Fin de las instrucciones.