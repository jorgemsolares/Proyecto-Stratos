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