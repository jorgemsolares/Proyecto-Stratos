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
- La carpeta de iconos: `Colores-y-Estetica/Iconos/`.

---

## PUNTO 1: REGLAS PARA EL USO DE ICONOS SVG (TAMAÑO Y COLOR)

**Contexto:** Se establece una regla unificada para el uso de los iconos SVG en todo el sistema, diferenciando su tamaño según estén dentro o fuera de un botón, y su color según el nivel de alerta del mensaje.

**Qué cambiar:**
1. **Tamaño:**
   - **Iconos dentro de botones:** Mantener el tamaño actual (grande, para llamar la atención).
   - **Iconos fuera de botones** (en títulos, cartelera, menús, alertas de texto): Ajustar su tamaño a **~30px** (ej. `width: 30px; height: 30px;` o `font-size: 30px` según la implementación).
2. **Color según la alerta:**
   - **Normal/Informativo:** Verde Stratos (`#00ff88`). (Los SVG actuales ya tienen este color internamente).
   - **Advertencia:** Naranja (`#ff8c00`).
   - **Error:** Rojo (`#e53935`).
   - Para lograr esto, como los SVG se cargan como imágenes y su color está dentro del archivo, Cline debe crear (o generar) versiones de los iconos con el color naranja y rojo, y el código debe llamar al archivo correcto según el tipo de mensaje.

**Dónde:**
- `estilos.css`: ajustar el tamaño de las clases de iconos inline (que no estén en botones).
- `logica.js`: en las funciones de la cartelera y avisos (`construirColaMensajes`, `mostrarAvisoInmediato`), asegurar que se llame al archivo SVG correcto (verde, naranja o rojo) según la prioridad o tipo de mensaje.
- `Cuerpo-y-Textos/index.html`: en los títulos estáticos que usan iconos, ajustar el tamaño y verificar el color.

**Cómo debe quedar:**
- Los iconos fuera de los botones se ven proporcionados (~30px) y legibles.
- Los iconos dentro de los botones mantienen su tamaño original.
- Los avisos en cartelera usan iconos verdes si son normales, naranjas si son advertencias y rojos si son errores.

**Qué NO hacer:**
- NO cambiar el tamaño de los iconos que están dentro de los botones.
- NO usar emojis como reemplazo.
- Si falta la versión de un icono en naranja o rojo, NO inventarlo; preguntar al Arquitecto (según la regla ya establecida).

---

**Fin de las instrucciones.