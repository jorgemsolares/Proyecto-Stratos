# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. **DEPURACIÓN DE MEMORIA:** Antes de iniciar cualquier cambio, revisar la sección BITÁCORA de `MEMORIA.md`. Si hay entradas terminadas con más de 3 meses de antigüedad, trasladarlas a `Historial_Bitacora.md` (conservando el historial) y eliminarlas de `MEMORIA.md`.
5. Al terminar todo, actualizar `MEMORIA.md` con lo realizado y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`datos.js`) para aplicar estos puntos. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- `datos.js` (el archivo a modificar).

---

## PUNTO ÚNICO: CREAR EL BANCO DE CONTRASEÑAS TEMPORALES EN EL USUARIO

**Contexto:** El sistema actual no tiene un espacio para guardar múltiples contraseñas temporales. Cuando un facilitador genera una clave, esta sobrescribe la contraseña original del perfil. Se necesita un arreglo para guardar varias claves sin afectar la original.

**Qué cambiar:**
- En `datos.js`, dentro de la estructura de `usuarioActivo` (y en la de `baseDatosUsuarios`, si aplica), agregar el campo `contrasenasTemporales: []`.

**Cómo debe quedar:**
- El objeto `usuarioActivo` debe tener un campo `contrasenasTemporales` que sea un arreglo vacío por defecto.
- Lo mismo para los usuarios que se crean y guardan en `baseDatosUsuarios`.

**Dónde:**
- `Motor-Logica-y-Acronimos/datos.js`: buscar la definición de `usuarioActivo` y la estructura de usuario en `baseDatosUsuarios`.

**Qué NO hacer:**
- NO modificar la lógica del Login ni del botón ENVIAR todavía.
- NO cambiar la contraseña original del perfil.

---

**Fin de las instrucciones.
