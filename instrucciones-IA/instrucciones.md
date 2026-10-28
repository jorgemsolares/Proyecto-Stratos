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

## PUNTO ÚNICO: HACER FUNCIONAR LOS BOTONES DEL ÁREA DE FIRMA (SIN PROMPT)

**Contexto:** En la pantalla de Configuración, el área de Firma tiene botones (Tipografía, Estilo, Tamaño, Color) que actualmente abren una ventana genérica del navegador (`prompt()`). Deben funcionar exactamente como los botones del Slogan, mostrando menús desplegables propios de la interfaz de Stratos.

**Qué cambiar:**
1. En `index.html` (sección `pantalla-configuracion`, área de la firma):
   - Quitar el `onclick` que llama a la función del `prompt()`. 
   - Agregar la estructura HTML necesaria para los menús desplegables (selects o listas personalizadas) que se abrirán al presionar cada botón.
2. En `logica.js`:
   - Eliminar cualquier uso de `prompt()` o `alert()` relacionado con los botones de la firma.
   - Crear las funciones para:
     - **Tipografía:** Desplegar la misma lista de fuentes que usa el Slogan.
     - **Estilo:** Desplegar Normal, Negrita, Cursiva, Negrita Cursiva.
     - **Tamaño:** Desplegar una lista de tamaños (ej. 10px, 12px, 14px, 16px, 18px).
     - **Color:** Desplegar la paleta visual de colores (los mismos 8 colores que usa el Slogan).
   - Al seleccionar una opción de estos menús, aplicar el cambio al texto dentro del recuadro de la firma.

**Cómo debe quedar:**
- Al presionar "Tipografía", "Estilo", "Tamaño" o "Color", se debe abrir un menú propio de la app (no la ventana gris del navegador).
- El menú de Color debe mostrar los cuadros de colores.

**Qué NO hacer:**
- NO usar `prompt()`, `alert()` ni `confirm()` del navegador.
- NO modificar los botones del Slogan (esos ya funcionan bien).
- NO cambiar el diseño general de la pantalla de Configuración.

---

**Fin de las instrucciones.