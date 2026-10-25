# Protocolo de Trabajo Stratos

## Prohibiciones Absolutas
- TIENES ESTRICTAMENTE PROHIBIDO alterar la lógica del sistema sin permiso explícito.
- NO propongas cambios de diseño que no se te hayan solicitado.
- NO inventes soluciones. Si no tienes la información, DETENTE y pregunta.

## Flujo de Trabajo
- Antes de escribir una sola línea de código, DEBES leer `A_DONDE_VA_STRATOS.md`.
- Si la tarea requiere modificar más de un archivo, DETENTE y pide autorización.
- Cada vez que termines un cambio, reporta "Hecho" o "No se pudo porque...".
- **Regla de Oro:** Ejecuta un solo punto o cambio a la vez. Espera a que el Arquitecto apruebe el anterior antes de pasar al siguiente.

## Reglas de Uniformidad y Diseño (Ley Visual de Stratos)

### 1. Estructura Fija de Pantalla
- **Superior Izquierda:** Logo de la empresa + Slogan debajo de él (máx. 140px).
- **Superior Restante:** Cartelera de mensajes.
- **Inferior Izquierda:** Sello de agua y slogan de Stratos.
- **Inferior Centro:** Botón de IA (Vero).
- **Inferior Derecha:** Botón "Libro" (Menú General).
- **Login (Excepción):** NO lleva cartelera, ni botón de IA, ni botón Libro. Solo formulario de acceso e iconos biométricos.

### 2. Tamaños de Pantalla y Modales
- **Pantallas Angostas (480px):** Formularios (Perfil, Login), configuración simple y menús de entrada (Comunicación). Los botones se ajustan al espacio.
- **Pantallas Anchas (875px):** Layouts de gestión (Correos, Tareas, Alarmas), vistas de datos (Organigramas) y configuraciones complejas (Identidad).
- **Modales Informativos (Máx 500px):** Para leer datos (Detalle de Contacto, Detalle de Correo).
- **Modales de Trabajo (Máx 875px):** Para editar o redactar (Nuevo Correo, Editar Contacto). Si se presiona "Editar" en un informativo, este se expande.

### 3. Botones e Iconos
- **Clasificación:** Principal (Verde `#00ff88`), Secundaria (Naranja `#ff8c00`), Irreversible (Rojo `#e53935`).
- **Efecto:** Todos tienen halo, borde, escala 1.08 en hover y resplandor en active.
- **Iconos como botones:** Todo icono que funcione como botón (clip, logo, edición) lleva recuadro, fondo y efecto.
- **Textos:** Centrados dentro del botón. Si no caben, se reduce la letra.
- **Cero emojis:** Si falta un icono en la carpeta `Colores-y-Estetica/Iconos/`, pregunta al Arquitecto.

### 4. Colores Base (Inviolables)
- Todos los textos deben usar `var(--color-letras)`.
- Los botones deben usar `var(--color-botones)`.
- Las únicas excepciones son las alertas semánticas (barra superior) y la marca de agua.