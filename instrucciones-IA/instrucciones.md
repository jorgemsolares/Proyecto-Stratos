# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. **DEPURACIÓN DE MEMORIA:** Antes de iniciar cualquier cambio, revisar la sección BITÁCORA de `MEMORIA.md`. Si hay entradas terminadas con más de 3 meses de antigüedad, trasladarlas a `Historial_Bitacora.md` (conservando el historial) y eliminarlas de `MEMORIA.md`.
5. Al terminar todo, actualizar `MEMORIA.md` con lo realizado y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`index.html`, `estilos.css`, `logica.js`, `datos.js`) para aplicar estos puntos. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

---

## PUNTO ÚNICO: SIMULACIÓN DE ENVÍO DE INVITACIÓN (CORREO)

**Contexto:** Al presionar "SALVAR E INVITAR" en el Organigrama Personal, el sistema debe generar un correo simulado en la bandeja de "Enviados" con el link de invitación para que el Arquitecto pueda probar el registro de un nuevo usuario.

**Qué cambiar:**
1. En `logica.js`, en la función `guardarContacto()` (o `continuarCreacionContacto()`, donde se genera la invitación):
   - Después de crear el objeto de la invitación con su `linkInvitacion`, simular el envío del correo.
   - Crear un objeto de correo local con esta estructura:
     - `id`: Generar uno único.
     - `vista`: "enviados".
     - `remitente`: El correo del usuario que invita (`usuarioActivo.email`).
     - `destinatarios`: El correo del contacto invitado (el que se escribió en el formulario).
     - `asunto`: "INVITACIÓN STRATOS".
     - `cuerpo`: El link de invitación (solo el link, sin texto extra).
     - `fecha`: Fecha actual.
     - `leido`: `true`.
     - `soloCopia`: `false`.
   - Agregar este objeto al arreglo `correosLocales` (el que usa la pantalla de Correos).
   - Guardar los correos en el `localStorage` (con la función `guardarCorreosLocales()`).
   - Mostrar un aviso al usuario (en la barra de notificaciones, Verde) que diga: *"Invitación enviada a [correo del destinatario]. Revisa tu bandeja de Enviados."*

2. Si el contacto solo tiene celular (no correo):
   - Por ahora, no simular SMS. Mostrar un aviso **Amarillo** que diga: *"El envío de invitaciones por SMS estará disponible próximamente. Usa un correo electrónico para probar."*

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `guardarContacto()` o `continuarCreacionContacto()`.

**Qué NO hacer:**
- NO usar `prompt()` ni `alert()`.
- NO cambiar el diseño de la pantalla de Correos.
- NO modificar la lógica del botón ENVIAR (se hará después).

---

**Fin de las instrucciones.