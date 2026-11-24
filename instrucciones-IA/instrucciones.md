# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos.

**Protocolo de trabajo habitual del proyecto:**
1. Leer el archivo `instrucciones-IA/instrucciones.md` (ubicado en la carpeta `instrucciones-IA`, no en la raíz).
2. Leer `instrucciones-IA/A_DONDE_VA_STRATOS.md` y `instrucciones-IA/MEMORIA.md`.
3. Leer los 4 archivos del sistema: `Cuerpo-y-Textos/index.html`, `Colores-y-Estetica/estilos.css`, `Motor-Logica-y-Acronimos/datos.js`, `Motor-Logica-y-Acronimos/logica.js`.
4. Ejecutar el punto indicado abajo.
5. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`logica.js`) para aplicar este punto. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

---

## PUNTO ÚNICO: CORREGIR LA RUTA DEL LINK DE INVITACIÓN

**Contexto:** El link de invitación generado apunta a la raíz del servidor (`http://127.0.0.1:5500/?inv=...`), lo que muestra el listado de archivos en lugar de la aplicación. El link debe apuntar directamente al archivo `index.html`.

**Qué cambiar:**
- En `logica.js`, en la función `continuarCreacionContacto()` (o donde se construya el `linkInvitacion`):
  - Cambiar la construcción del link para que incluya la ruta correcta hacia el archivo principal.
  - La nueva ruta debe ser: `const linkInvitacion = window.location.origin + "/Cuerpo-y-Textos/index.html?inv=" + codigoInv;`

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función que crea el objeto de invitación.

**Qué NO hacer:**
- NO cambiar la lógica de `enviarInvitacion()`.
- NO tocar los estilos de la pantalla de Correos.

---

**Fin de las instrucciones.