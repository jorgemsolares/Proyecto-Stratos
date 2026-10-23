# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**El Arquitecto ya autorizó estos cambios al entregar este documento.** No se requiere confirmación adicional para leer, ejecutar o proceder.

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

---

## PUNTO 1: CORRECCIÓN DEL NODO PRINCIPAL Y EDICIÓN EN EL ORGANIGRAMA PERSONAL

**Contexto:** 
1. El nodo principal del Organigrama Personal (el usuario mismo) no está trayendo su correo, celular ni su puesto completo desde su Perfil. 
2. Al intentar "Editar" el nodo principal, el sistema abre un modal de edición en lugar de llevar al usuario a "Mi Perfil" (que es de donde proviene la información).
3. Al editar los datos de un contacto desde el Organigrama Personal y guardar, el sistema crea un contacto duplicado en lugar de actualizar el existente.

**Qué cambiar:**

1. **Sincronización del Nodo Principal:**
   - En `logica.js`, en la función `renderizarOrganigrama()`, cuando se dibuja el nodo raíz (el usuario actual), el sistema no debe usar `datosOrganigrama` si este está desactualizado. Debe obtener la información directamente de `usuarioActivo` o de `baseDatosUsuarios` (buscando por el ID).
   - Asegurar que el nombre, puesto, acrónimo, correo y celular se muestren completos, tal como están en el perfil.

2. **Edición del Nodo Principal:**
   - En `logica.js`, en la función `verDetalleContacto(id)` (o donde se maneje el doble clic del organigrama), validar si el `id` del contacto es igual al `id` del `usuarioActivo`.
   - Si es el usuario activo: El botón "Editar" dentro del modal debe redirigir a la pantalla de "Mi Perfil" (`registro-invitacion`), no abrir el modal de edición de contactos.

3. **Bug de Duplicación al Editar:**
   - En `logica.js`, en la función `guardarContacto()`, en el bloque `if (enEdicion)`, el sistema debe buscar el contacto en la lista correspondiente (hijos directos, indirectos u observadores) usando su `id`. Si lo encuentra, debe reemplazar los datos (`lista[indice] = datosActualizados`) y **evitar que el flujo continúe a la creación de uno nuevo** (asegurarse de que haya un `return` después de guardar los cambios).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: funciones `renderizarOrganigrama`, `verDetalleContacto`, y `guardarContacto`.

**Qué NO hacer:**
- NO cambiar el diseño visual del organigrama ni del modal.
- NO modificar la base de datos de usuarios.

---

**Fin de las instrucciones.