# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

Este es el documento de trabajo del día para el proyecto Stratos. Contiene los cambios que el Arquitecto ya autorizó y que deben ejecutarse en orden.

**Protocolo de trabajo habitual del proyecto:**
1. Leer los archivos de contexto y del sistema listados abajo.
2. Ejecutar los puntos en el orden indicado.
3. Reportar cada punto como "Punto X: hecho" o "Punto X: no se pudo porque [razón]".
4. Al terminar, actualizar `MEMORIA.md` y ejecutar `sincronizar_git.ps1`.

**AUTORIZACIÓN EXPLÍCITA DE MODIFICACIÓN:** El Arquitecto te autoriza formalmente a **modificar los archivos** (`index.html`, `estilos.css`, `logica.js`, `datos.js`) para aplicar estos puntos. **NO necesitas pedir permiso después de leer los archivos; procede directamente a escribir el código.**

**Documentos y archivos de contexto a leer antes de empezar:**
- `MEMORIA.md`.
- `A_DONDE_VA_STRATOS.md`.
- Los 4 archivos del sistema: `index.html`, `estilos.css`, `datos.js`, `logica.js`.

---

## PUNTO 1: CORREGIR DISEÑO Y TEXTOS DE LOS BOTONES (SLOGAN Y FIRMA)

**Contexto:** Cline eliminó los textos de los botones (Tipografía, Estilo, etc.) y los reemplazó por menús desplegables. Esto rompe la uniformidad visual. Además, en la Firma, los botones están apilados hacia abajo en lugar de estar en una fila horizontal.

**Qué cambiar:**
1. En `index.html`:
   - **Slogan:** Devolver los textos "Tipografía:", "Estilo:" y "Color:" a los botones/etiquetas. Asegurar que los menús desplegables aparezcan al presionarlos.
   - **Firma:** Hacer exactamente lo mismo. Devolver los textos "Tipografía", "Estilo", "Tamaño" y "Color" a sus botones.
   - **Firma (distribución):** Asegurar que estos 4 botones estén en una fila horizontal, alineados y con el mismo tamaño. Si el texto no cabe en una línea, reducir la letra.
2. En `estilos.css`:
   - Aplicar los estilos para que los botones de la firma se vean como botones reales (con fondo, borde y halo) y no como simples listas desplegables.

---

## PUNTO 2: QUITAR EL EMOJI Y EL COLOR DEL TÍTULO "FIRMA DEL USUARIO"

**Contexto:** El título "Firma del Usuario" tiene un emoji genérico (✍️) y un color que no corresponde a la pantalla de Configuración.

**Qué cambiar:**
- En `index.html` (sección de la Firma):
  - **Quitar el emoji** (✍️).
  - Asegurar que el título "Firma del Usuario" use el mismo estilo y color que los demás títulos de Configuración (Idioma, Seguridad, etc.), sin clases que lo pinten de verde o amarillo.

**Qué NO hacer:**
- NO usar `prompt()` ni `alert()`.
- NO usar emojis (revisar la carpeta de iconos si se necesita uno).
- NO cambiar el diseño de otras pantallas.

---

## PUNTO 3: ARREGLAR EL TAMAÑO DEL RECUADRO DE LA FIRMA (FONDO FIJO)

**Contexto:** Al cambiar el tamaño de la letra de la firma, todo el recuadro y la pantalla se estiran. El recuadro debe tener un tamaño fijo, y solo el texto de adentro debe cambiar de tamaño.

**Qué cambiar:**
- En `estilos.css`:
  - Asegurar que el contenedor del área de la firma (`textarea` o `div`) tenga un `height` fijo (ej. 120px o 150px) y un `resize: vertical` (o `none`).
  - Al aplicar los botones de formato (negrita, tamaño, etc.), asegurarse de que solo afecten al texto y no al contenedor.

**Dónde:**
- `Cuerpo-y-Textos/index.html`: Sección de la Firma y Slogan.
- `Colores-y-Estetica/estilos.css`: Clases de los botones de formato y del recuadro de firma.
- `Motor-Logica-y-Acronimos/logica.js`: Funciones de los botones de formato.

---

**Fin de las instrucciones.