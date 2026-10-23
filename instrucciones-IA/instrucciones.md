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

## PUNTO 1: LÓGICA DEL SELLO "FIRMA" (INTERACCIÓN Y SUSTITUCIÓN)

**Contexto:** Se necesita programar el comportamiento del sello "FIRMA" en las áreas de escritura. El sello debe ser interactivo (como un botón) y sustituirse por el texto configurado.

**Qué cambiar:**

1. **Estructura base del área de texto:**
   - Al abrir un área de escritura (o al responder/reenviar), el sistema debe preparar el texto con esta estructura:
     - 5 líneas en blanco.
     - Una marca visual (sello) con la palabra **"FIRMA"**.
     - Si es respuesta/reenvío, el texto del correo original debajo del sello.

2. **Estilo visual del Sello "FIRMA":**
   - En `estilos.css`, darle el estilo de marca de agua (letra gris tenue, mayúsculas, subrayada, un poco más grande que el texto normal).
   - **Efecto Hover/Active:** Aplicar los mismos efectos de la regla de botones (escala 1.08 al pasar el mouse y halo al hacer clic) para que el usuario sepa que es un elemento interactivo.

3. **Interacción (Clic):**
   - **Si hay firma configurada:** Al hacer clic en el sello "FIRMA", el sistema debe **SUSTITUIR** el sello por el texto guardado en `configuracionPersonal.firmaTexto`.
   - **Si es automático:** Si el checkbox `config-firma-automatica` está activo, la sustitución se hace sola al abrir el área de texto (el usuario no tiene que hacer clic).
   - **Si NO hay firma configurada:** Al hacer clic en el sello (o si el sistema intenta insertar la firma automática y no la encuentra), se debe mostrar un aviso Amarillo y redirigir al usuario a la pantalla de Configuración, haciendo foco en el recuadro de la firma.

**Dónde:**
- `Motor-Logica-y-Acronimos/logica.js`: lógica de apertura del área de texto y el evento clic del sello.
- `Cuerpo-y-Textos/index.html` y `Colores-y-Estetica/estilos.css`: estructura y diseño del sello.

**Qué NO hacer:**
- NO modificar la pantalla de Configuración (eso ya está listo).
- NO borrar el texto original del correo al sustituir la firma.

---

**Fin de las instrucciones.