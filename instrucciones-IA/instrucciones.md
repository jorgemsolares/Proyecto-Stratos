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

## PUNTO 1: AVISOS DE FEEDBACK (VERDE/AMARILLO/ROJO) EN BOTONES DE EJECUCIÓN

**Contexto:** Actualmente, al presionar botones de ejecución (como "Salvar" en Identidad o "Continuar sin completar"), el sistema a veces se detiene en silencio o no avisa al usuario qué pasó. Se necesita conectar los botones con la función de avisos existentes en la barra de notificaciones superior.

**Qué cambiar:**
- En `logica.js`, en la función `salvarIdentidad()`:
  - Si faltan campos por llenar (logo, misión, visión, etc.): **NO bloquear el guardado**. El sistema debe guardar lo que haya, mostrar un aviso **Amarillo** en la barra superior (`mostrarAvisoInmediato(..., 'advertencia')`) diciendo: *"Se guardó el avance. La identidad aún está incompleta."* y luego redirigir al Organigrama.
  - Si todos los campos están llenos: guardar, mostrar un aviso **Verde** (`mostrarAvisoInmediato(..., 'exito')`) diciendo: *"Identidad guardada correctamente."* y redirigir al Organigrama.
- En `logica.js`, en la función `saltarIdentidad()`:
  - Al presionar "Continuar sin completar", el sistema debe mostrar un aviso **Amarillo** de advertencia: *"Atención: los cambios no se guardaron. Si saliste sin guardar, lo escrito se borrará."*
  - Redirigir al Organigrama.
- En `index.html`, corregir el evento del botón "Continuar sin completar" (actualmente tiene `ondblclick`, debe ser `onclick`).

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: funciones `salvarIdentidad` y `saltarIdentidad`.
- `Cuerpo-y-Textos/index.html`: el botón de "Continuar sin completar" (línea donde dice `onclick="saltarIdentidad()"`).

**Qué NO hacer:**
- NO cambiar el diseño de la pantalla de Identidad.
- NO usar `alert()` del navegador; usar siempre la barra de notificaciones (`mostrarAvisoInmediato`).

---

**Fin de las instrucciones.