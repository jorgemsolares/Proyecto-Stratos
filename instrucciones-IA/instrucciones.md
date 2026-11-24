# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos.

**Protocolo de trabajo habitual del proyecto:**
1. Leer el archivo `instrucciones-IA/instrucciones.md`.
2. Leer `instrucciones-IA/A_DONDE_VA_STRATOS.md` y `instrucciones-IA/MEMORIA.md`.
3. Leer los 4 archivos del sistema: `Cuerpo-y-Textos/index.html`, `Colores-y-Estetica/estilos.css`, `Motor-Logica-y-Acronimos/datos.js`, `Motor-Logica-y-Acronimos/logica.js`.
4. Ejecutar el punto indicado abajo.
5. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar el archivo** `logica.js` para aplicar este punto. **NO necesitas pedir permiso; procede directamente a escribir el código.**

---

## PUNTO ÚNICO: CORREGIR LA RUTA DEL LINK DE INVITACIÓN

**Contexto:** El link de invitación apunta a la raíz del servidor (`http://127.0.0.1:5500/?inv=...`). Debe apuntar al archivo `index.html`.

**Qué cambiar:**
- En `Motor-Logica-y-Acronimos/logica.js`, en la función `continuarCreacionContacto()` (o `guardarContacto()`):
  - Buscar la línea exacta:
    `linkInvitacion: window.location.origin + "?inv=" + codigoInv`
  - Reemplazarla por:
    `linkInvitacion: window.location.origin + "/Cuerpo-y-Textos/index.html?inv=" + codigoInv`

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función que crea el objeto `invitacion`.

**Qué NO hacer:**
- NO cambiar la lógica de `enviarInvitacion()`.
- NO tocar los estilos de la pantalla de Correos.

---

**Fin de las instrucciones.