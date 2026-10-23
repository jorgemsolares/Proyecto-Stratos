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

## PUNTO 1: AJUSTE DE PROPORCIÓN Y BOTONES LATERALES EN CORREOS

**Contexto:** El menú lateral de la pantalla de correos ocupa mucho espacio (1/4) y los botones no están respetando la regla general de botones (halo, fondo, color de letras). Además, el texto de los botones se alineó a la izquierda por error. Se ajustará la proporción a 1/5 y 4/5 para dar más espacio a la lectura de correos, y se corregirán los botones.

**Qué cambiar:**
- En `estilos.css`:
  - Modificar el contenedor de la pantalla de correos para que el menú lateral ocupe `flex: 0 0 20%` (1/5) o un ancho fijo proporcional, y la lista de correos ocupe el `flex: 1` restante (4/5).
  - Ajustar el tamaño de la letra de los botones del menú (`.btn-vista-correo`) para que quepan en una línea en este nuevo espacio más angosto.
  - **Asegurar que el texto de los botones del menú esté centrado** (`text-align: center` o `justify-content: center`).
  - Asegurar que todos los botones del menú (Recibidos, Enviados, etc.) tengan la regla general de botones:
    - Fondo: `var(--color-botones)`.
    - Texto: `var(--color-letras)`.
    - Estado normal: sin sombra fija.
    - Estado activo/hover: borde y halo verde (`var(--color-primario)`).
- En `logica.js`:
  - En la función que inyecta los correos de prueba, quitar el texto "Bienvenido a tu bandeja Stratos". En su lugar, el título de la lista debe mostrar el nombre de la carpeta seleccionada (ej. "Recibidos", "Enviados").
  - Asegurar que el texto de la vista previa del correo (`.item-correo-previa`) esté alineado a la izquierda y respete el color de letras.

**Dónde:**
- `Colores-y-Estetica/estilos.css` (clases de la pantalla de correos y `.btn-vista-correo`).
- `Motor-Logica-y-Acronimos/logica.js` (función `renderizarListaCorreos` y los datos de prueba).

**Qué NO hacer:**
- NO cambiar la estructura del modal de redactar.
- NO alterar la lógica de envío.

---

**Fin de las instrucciones.