# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

> **Antes de empezar:**
> 1. **Ignora las instrucciones anteriores.** El texto que te dieron antes queda anulado.
> 2. **Lee todo lo pertinente antes de trabajar:**
>    - `MEMORIA.md` (estado actual del proyecto).
>    - `A_DONDE_VA_STRATOS.md` (visión completa de Stratos y de la IA).
>    - Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.
>    - El repositorio del código en GitHub (`Proyecto-Stratos`).
>    - El repositorio de las Minutas (`Comunicaci-n-IA-Internet`).
> 3. **Solo después de leer todo, empieza a trabajar.**
> 4. **Cuando en este documento se mencione "la IA" o "Vero", se refiere a la IA del sistema que se implementará después. Hoy solo hay que dejar la estructura preparada para cuando llegue.**
> 5. **Este texto es muy detallado a propósito.** No lo resumas ni lo interpretes. Ejecuta exactamente lo que dice.
> 6. **REGLA INVIOLABLE (de `A_DONDE_VA_STRATOS.md`):** Tienes ESTRICTAMENTE PROHIBIDO alterar la lógica, proponer cambios de diseño por tu cuenta, o agregar funciones que no se te han solicitado. Si detectas que algo de lo que se pide romperá el sistema, explícalo y espera aprobación. **NO hagas nada que no esté en este documento.** Si tienes dudas, pregunta antes de actuar.
> 7. **PERMISO EXPLÍCITO:** El hecho de que este documento te sea entregado constituye el permiso explícito del Arquitecto para ejecutar los cambios aquí descritos. No necesitas pedir permiso punto por punto. Pero sí debes verificar cada punto antes de pasar al siguiente y reportar "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
> 8. **Al terminar todo:**
>    - Guarda en `MEMORIA.md` (bitácora) un resumen de lo solicitado en este documento y de lo que realizaste.
>    - Sincroniza con GitHub (**sube todos los archivos**).

---

## PUNTO 1: CENTRAR EL NODO DEL NO.1 EN EL ORGANIGRAMA GENERAL

**Contexto:**
El nodo del No.1 en el Organigrama General quedó descentrado después de los últimos cambios. Debe volver a estar centrado como estaba antes.

**Qué cambiar:**
- Centrar el nodo del No.1 en el Organigrama General.

**Dónde:**
- `logica.js`: Función `renderizarOrganigramaGeneral`.
- `estilos.css`: Diseño del contenedor del Organigrama General.

**Cómo debe quedar:**
- El nodo del No.1 aparece **centrado horizontalmente** y **en la parte superior del lienzo** del Organigrama General.
- Si el No.1 cambia porque alguien de mayor rango se inscribe, el nuevo No.1 ocupará esa posición (eso ya está definido en la lógica del crecimiento automático).

**Qué NO hacer:**
- **NO** cambiar el tamaño del nodo.
- **NO** mover otros nodos.
- **NO** agregar elementos nuevos.

---

## PUNTO 2: CREAR LA PANTALLA DE COMUNICACIÓN

**Contexto:**
Hoy, la Pantalla de Comunicación está vacía en `index.html` (solo tiene un mensaje de "en desarrollo"). Debe tener los 8 botones que llevan a los submódulos.

**Qué cambiar:**
- Crear la Pantalla de Comunicación con los 8 botones.

**Dónde:**
- `index.html`: Pantalla de Comunicación (`#pantalla-comunicacion`).
- `logica.js`: Función `irAPantalla` (para que los botones lleven a los submódulos).
- `estilos.css`: Diseño de los botones.

**Cómo debe quedar:**

1. **8 botones grandes y claros:**
   - **Correos** (rectangular).
   - **Chats** (rectangular).
   - **Tareas** (rectangular).
   - **Alarmas** (rectangular).
   - **Calendario** (rectangular).
   - **Hub de Archivos** (rectangular).
   - **Enlace Móvil** (rectangular).
   - **Otras Actividades** (hexágono, colores invertidos, abajo a la derecha).

2. **Cada botón lleva a su pantalla correspondiente:**
   - Correos → `#pantalla-correos`.
   - Chats → `#pantalla-chats`.
   - Tareas → `#pantalla-tareas`.
   - Alarmas → `#pantalla-alarmas`.
   - Calendario → `#pantalla-calendario`.
   - Hub de Archivos → `#pantalla-hub`.
   - Enlace Móvil → `#pantalla-enlace-movil`.
   - Otras Actividades → `#pantalla-otras-actividades`.

3. **Registrar la entrada a cada módulo** (estadística de áreas más visitadas). Esto se guarda en el banco de datos.

**Qué NO hacer:**
- **NO** cambiar el diseño de los botones existentes.
- **NO** agregar botones que no estén en la lista.
- **NO** cambiar la estructura de la pantalla.

---

## PUNTO 3: CREAR LA PANTALLA DE CORREOS

**Contexto:**
Hoy, la pantalla de Correos no existe. Es parte del Módulo de Comunicación.

**Qué cambiar:**
- Crear la pantalla de Correos con sus 6 vistas.

**Dónde:**
- `index.html`: Pantalla de Correos (`#pantalla-correos`), con sus 6 vistas.
- `logica.js`: Funciones para cambiar entre vistas.
- `estilos.css`: Diseño de las vistas.

**Cómo debe quedar:**

1. **6 vistas (sub-pantallas):**
   - **Recibidos:** Listado de correos recibidos.
   - **Enviados:** Listado de correos enviados.
   - **Carpetas:** Vista de carpetas/etiquetas.
   - **Eliminados:** Listado de correos eliminados.
   - **Borradores:** Listado de correos sin enviar.
   - **Spam:** Listado de correos marcados como spam.

2. **Cada vista tiene:**
   - Barra de búsqueda.
   - Listado de correos (remitente, asunto, vista previa, fecha).
   - Botones de acción (archivar, eliminar, responder, etc.).

3. **Al presionar un correo:** Se abre su detalle.

4. **Registrar en el banco de datos:**

**Recibidos:**
- Ingreso a la página y momento de la última salida (con hora y minutos).
- Número de correos diarios recibidos.
- Contactos únicos (destinatarios principales, no copias).
- **Correos sin correlación (solo copia):**
  - Cuántos fueron solo copia.
  - Cuánto tiempo pasó desde que los abre hasta que los cierra (para ver si es virtualmente posible que los leyó).
  - Cuántos marcó como leídos sin abrirlos.
  - **Razón:** Parámetro de la importancia que le da a la información recibida. Puede que ya esté enterado (in situ) o que no quiera leer. Pero esa acción (o inacción) puede tener consecuencias en la calidad o efectividad de sus resultados.
- **Personas involucradas:** A quién le dirigió el correo (destinatario principal, no copias). Y si es contacto habitual o esporádico, registrado o no. **(Vero, cuando esté implementada, detecta si un contacto es habitual o esporádico.)**

**Enviados:**
- Número de correos respondidos y tiempo (cuándo lo abre y cuándo lo responde = tiempo invertido en cada respuesta o redacción).
- Correos sin correlación (no respuesta ni reenvío): cuántos, y tiempo invertido en cada uno.
- **Personas involucradas:** A quién le dirigió el correo (destinatario principal, no copias).
- **Acciones generadas:** Si el correo derivó en tarea, alarma, llamada, reunión, etc.
- **Procesos activados:** Si derivó en compra, pago, cotización, etc.

**Carpetas:**
- Cada cuánto tiempo pasan los correos a las carpetas creadas.
- Peso de los correos.

**Eliminados:**
- Tiempo, período a borrar, cantidad y peso borrado.
- Si el usuario borra más de lo habitual.

**Borradores:**
- Los borradores.

**Spam:**
- Tipos de spam y correos de usuarios desconocidos.

**Qué NO hacer:**
- **NO** implementar la sincronización real con Gmail/Outlook todavía (eso es parte de la integración con el servidor).
- **NO** implementar la IA todavía (eso es parte de `vero.js`).
- **NO** agregar funciones que no estén en la lista.

---

**Fin de las instrucciones.**