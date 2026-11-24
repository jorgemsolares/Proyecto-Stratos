# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. **DEPURACIÓN DE MEMORIA:** Antes de iniciar cualquier cambio, revisar la sección BITÁCORA de `MEMORIA.md`.
5. Al terminar todo, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`logica.js`) para aplicar este punto.

---

## PUNTO ÚNICO: CORREGIR EL REMITENTE DEL CORREO DE INVITACIÓN

**Contexto:** El correo simulado de invitación dice que lo envía "soporte@stratos.app", pero debería decir que lo envía el usuario que está haciendo la invitación (el facilitador). En la función `enviarInvitacion()`, el campo `remitente` está fijo en el código.

**Qué cambiar:**
- En `logica.js`, en la función `enviarInvitacion(invitacion)`:
  - Cambiar el valor de `remitente: "soporte@stratos.app"` por `remitente: usuarioActivo.email` (o el campo que contenga el correo del usuario logueado).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `enviarInvitacion()`.

**Qué NO hacer:**
- NO cambiar el resto de la lógica del correo (asunto, link, destinatario).
- NO tocar los tamaños ni estilos de la pantalla de Correos (eso queda como pendiente para después).

---

**Fin de las instrucciones.