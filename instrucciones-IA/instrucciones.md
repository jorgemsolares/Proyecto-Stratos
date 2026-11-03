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

## PUNTO ÚNICO: LÓGICA DE MÚLTIPLES CONTRASEÑAS TEMPORALES, ANULACIÓN Y REGISTRO

**Contexto:** El flujo actual permite que un jefe genere una contraseña temporal para un subalterno. Sin embargo, en la vida real, si el jefe tarda, el usuario puede pedirle a varios compañeros que le ayuden. El sistema debe ser flexible (permitir múltiples contraseñas generadas para una misma solicitud) pero seguro (la primera que se use anula las demás). Además, debe registrar todos los datos para medir la operatividad.

**Qué cambiar en `logica.js`:**

1. **Generación de Múltiples Contraseñas (Flexibilidad):**
   - En la función `enviarContrasenaAUsuario()`, permitir que se generen y envíen múltiples contraseñas temporales para una misma solicitud. No bloquear la acción si ya existe una contraseña generada previamente.
   - Guardar cada nueva contraseña temporal generada en una lista dentro de la solicitud (ej. `contrasenasGeneradas: []`).

2. **Anulación por Uso (Seguridad):**
   - En la función `validarEntrada()` (Login), cuando el usuario ingrese con una contraseña temporal:
     - Validar que coincida con **cualquiera** de las contraseñas generadas para su solicitud.
     - Si la contraseña es válida y el usuario entra, el sistema debe **invalidar automáticamente todas las demás contraseñas temporales** de esa solicitud (marcarlas como `usadas` o borrarlas de la lista) y marcar la solicitud como `resuelta`.

3. **Aviso Operativo al Jefe (Cartelera):**
   - Al resolverse la solicitud, generar un aviso en la cartelera del jefe que diga: *"El usuario [Nombre del solicitante] ya está operativo de nuevo"* (sin especificar quién le dio la contraseña).

4. **Registro en el Banco de Datos (Trazabilidad):**
   - Al generar cada contraseña temporal, registrar en el banco de datos del solicitante y del jefe:
     - Quién generó la contraseña (ID del jefe o compañero).
     - Fecha y hora de generación.
   - Al resolverse la solicitud (cuando el usuario entra y cambia la contraseña), registrar:
     - Cuál de todas las contraseñas se usó (quién la generó).
     - Fecha y hora en que el usuario ingresó (tiempo total de respuesta).
     - Fecha y hora en que se cambió la contraseña definitiva.
   - **Alerta de patrón:** Si el usuario ha solicitado recuperación de contraseña más de 3 veces en un mes, registrar esta bandera en su banco de datos para que Vero pueda analizarlo posteriormente (no lanzar alerta en tiempo real, solo guardar el dato).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: funciones `enviarContrasenaAUsuario`, `validarEntrada` y `registrarActividadBancoDatos`.
- `Motor-Logica-y-Acronimos/datos.js`: estructuras de la solicitud y el usuario (para guardar la lista de contraseñas generadas y la bandera de solicitudes repetidas).

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()`.
- NO bloquear la generación de una segunda contraseña si ya existe una (la flexibilidad es obligatoria).
- NO permitir que se use más de una contraseña temporal para entrar (la primera que se use anula las demás).
- NO analizar los datos en tiempo real (eso es tarea de Vero después).

---

**Fin de las instrucciones.