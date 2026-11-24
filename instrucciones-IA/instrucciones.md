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

## PUNTO ÚNICO: REPARAR LA FUNCIÓN `enviarInvitacion()` PARA QUE CREE EL CORREO

**Contexto:** La función `enviarInvitacion(invitacion)` se está llamando correctamente desde `continuarCreacionContacto()`, pero **no está generando el correo en la bandeja de "Enviados"**. El correo no aparece en la lista. Esto indica que la función `enviarInvitacion` está fallando internamente (no guarda en `correosLocales` o no muestra el aviso).

**Qué cambiar:**
- En `logica.js`, en la función `enviarInvitacion(invitacion)`:
  1. Verificar que está extrayendo correctamente el correo del destinatario (`invitacion.emailContacto`) y el link (`invitacion.linkInvitacion`).
  2. Asegurar que se está creando el objeto de correo y se está agregando a `correosLocales`.
  3. Asegurar que se llama a `guardarCorreosLocales()` para persistir el cambio.
  4. Si hay un error en la lógica, corregirlo para que el correo se cree siempre que haya un email válido.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `enviarInvitacion()`.

**Qué NO hacer:**
- NO cambiar la llamada desde `continuarCreacionContacto()` (esa está bien).
- NO tocar los estilos de Correos.
- NO usar `prompt()` ni `alert()`.

---

**Fin de las instrucciones.