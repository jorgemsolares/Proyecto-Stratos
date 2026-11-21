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

## PUNTO ÚNICO: LLAMAR A LA FUNCIÓN `enviarInvitacion` AL GUARDAR UN CONTACTO

**Contexto:** Al guardar un contacto en el Organigrama Personal, el sistema no está generando el correo simulado en la bandeja de "Enviados". La función `enviarInvitacion()` existe y tiene la lógica, pero **no se está llamando** desde `continuarCreacionContacto()`.

**Qué cambiar:**
- En `logica.js`, en la función `continuarCreacionContacto()`:
  - Buscar el bloque donde se crea el objeto `invitacion` y se guarda en `invitacionesPendientes`.
  - Justo después de `guardarEnStorage(STORAGE_KEYS.INVITACIONES, invitacionesPendientes);`, agregar la línea:
    - `enviarInvitacion(invitacion);`

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `continuarCreacionContacto()`.

**Qué NO hacer:**
- NO cambiar la lógica de `enviarInvitacion()` (esa ya está bien).
- NO tocar los estilos de la pantalla de Correos (eso se hará después).
- NO usar `prompt()` ni `alert()`.

---

**Fin de las instrucciones.