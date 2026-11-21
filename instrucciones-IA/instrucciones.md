# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. **DEPURACIÓN DE MEMORIA:** Antes de iniciar cualquier cambio, revisar la sección BITÁCORA de `MEMORIA.md`.
5. Al terminar todo, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`index.html`, `estilos.css`, `logica.js`, `datos.js`) para aplicar estos puntos.

---

## PUNTO 1: CREAR EL CORREO DE INVITACIÓN EN "ENVIADOS"

**Contexto:** Al guardar un contacto en el Organigrama, el sistema no está generando el correo simulado en la bandeja de "Enviados". La lógica de simulación está en `enviarInvitacion()`, pero esa función no se está llamando.

**Qué cambiar:**
- En `logica.js`, dentro de la función `guardarContacto()` (o `continuarCreacionContacto()`), justo después de crear el objeto `invitacion` y antes de cerrar el modal:
  - Llamar a la función `enviarInvitacion(invitacion)` para que genere el correo en la bandeja de Enviados.
  - **Importante:** El contacto NO debe guardarse en una agenda global ni mostrarse en chats/correos de otros. Solo debe guardarse en el Organigrama Personal del usuario que invita (con el nombre que él le puso) y el correo simulado en su bandeja de Enviados.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: función `guardarContacto()` o `continuarCreacionContacto()`.

---

## PUNTO 2: CORREGIR EL COLOR DE LOS BOTONES EN CORREOS

**Contexto:** Los botones del menú lateral (Recibidos, Enviados, etc.) no tienen el color base correcto.

**Qué cambiar:**
- En `estilos.css`, en la clase `.btn-vista-correo`:
  - Asegurar que el fondo use `var(--color-botones)` y el texto `var(--color-letras)`.
  - Aplicar la película blanca tenue al 10% (`background-color: rgba(255, 255, 255, 0.1);`) para diferenciarlos del fondo, respetando el color base.

---

## PUNTO 3: CORREGIR EL TÍTULO Y TAMAÑO DE LOS CORREOS EN LA LISTA

**Contexto:** El título "Enviados" tiene un color incorrecto y los textos de los correos tienen un tamaño que no es el acordado.

**Qué cambiar:**
- En `estilos.css`:
  - El título de la bandeja (ej. "Enviados") debe usar `var(--color-letras)`.
  - Los textos de los correos (remitente, asunto, fecha) deben tener el tamaño que ya habíamos definido (remitente 15px, asunto/previa 14px, fecha 12px).

**Dónde:**
- `Colores-y-Estetica/estilos.css`: clases `.item-correo-*` y el contenedor del título de la lista.

---

**Fin de las instrucciones.