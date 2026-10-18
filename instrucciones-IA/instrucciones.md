# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**Documentos y archivos de contexto a leer antes de empezar:**
- `Motor-Logica-y-Acronimos/logica.js`.
- `Cuerpo-y-Textos/index.html`.

---

## PUNTO 1: REPARAR LA CARTELERA (TEXTOS E ICONOS EN BLANCO)

**Contexto:** Al implementar los iconos SVG en la cartelera, el código se rompió. Ahora no se muestra ni el texto ni el icono, y la cartelera aparece vacía con la marca de agua flotando.

**Qué cambiar:**
- Revisar la función `construirColaMensajes()` y `mostrarSiguienteMensaje()` en `logica.js`.
- Revisar cómo se están inyectando los mensajes en el HTML (`#texto-mensaje-personalizado`).
- Asegurar que la estructura HTML de la cartelera esté completa.

**Cómo debe quedar:**
- La cartelera debe mostrar el mensaje de texto correspondiente (con su icono SVG al lado).
- Si el icono no se puede cargar, el texto debe verse de todos modos.
- El contenedor de la cartelera no debe colapsar ni dejar la marca de agua flotando fuera de lugar.

**Qué NO hacer:**
- NO cambiar el diseño de los mensajes (solo reparar lo que se rompió).
- NO alterar la lógica de rotación de mensajes.

---

**Fin de las instrucciones.