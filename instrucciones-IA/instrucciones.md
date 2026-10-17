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
- El repositorio del código en GitHub (`Proyecto-Stratos`).
- El repositorio de las Minutas (`Comunicaci-n-IA-Internet`).
- La carpeta de iconos: `Colores-y-Estetica/Iconos/`.

**Reglas de trabajo del proyecto:**
- Cuando en este documento se mencione "la IA" o "Vero", se refiere a la IA del sistema que se implementará después.
- Este texto es muy detallado a propósito. No lo resumas ni lo interpretes. Ejecuta exactamente lo que dice.
- REGLA INVIOLABLE: Tienes ESTRICTAMENTE PROHIBIDO alterar la lógica, proponer cambios de diseño por tu cuenta, o agregar funciones que no se te han solicitado. NO hagas nada que no esté en este documento.
- Al terminar todo: guarda en `MEMORIA.md` (bitácora) un resumen de lo solicitado en este documento y de lo que realizaste, y ejecuta `sincronizar_git.ps1` para subir a GitHub. Verifica que la subida funcionó. Si no puedes, avísalo claramente.

---

## PUNTO 1: BOTÓN "COLOR" PARA EL SLOGAN

**Contexto:** Hoy el bloque del Slogan en Identidad Corporativa tiene dos selectores: **Tipografía** y **Estilo**. Falta un tercer selector: **Color**. Debe funcionar igual que los otros dos y mostrar los mismos 8 colores de la paleta superior.

**Qué cambiar:**
- Agregar un tercer selector (lista desplegable) llamado **Color** junto a **Tipografía** y **Estilo**.
- Debe mostrar los mismos 8 colores que ya tiene la paleta superior (`coloresExtraidos`).
- Al elegir un color, el Slogan (el texto de vista previa y el de la cabecera) cambia a ese color.
- El color se guarda con el resto de la identidad corporativa.

**Dónde:**
- `index.html`: agregar el tercer `<select>` en el bloque del Slogan, junto a `#sel-tipografia` y `#sel-estilo`.
- `datos.js`: agregar el campo `colorSlogan` dentro de `identidadCorporativa` y `configuracionEstetica`.
- `logica.js`: en `actualizarVistaPrevia()` y en `salvarIdentidad()`, aplicar y guardar el `colorSlogan`.
- `estilos.css`: agregar el estilo del nuevo selector para que se vea igual que los otros dos (el tamaño y distribución se pueden ajustar para que quepan los tres).

**Qué NO hacer:**
- NO cambiar la función de Tipografía y Estilo.
- NO agregar más de un selector.
- NO usar una paleta distinta a la de `coloresExtraidos`.
- NO cambiar nada fuera del bloque del Slogan.

---

## PUNTO 2: REGISTRO DE ACTIVIDAD EN IDENTIDAD CORPORATIVA

**Contexto:** Cada edición de Identidad Corporativa (misión, visión, valores, colores, logo, slogan, tipografía, estilo) es una actividad laboral real que debe quedar registrada.

**Qué cambiar:**
- Registrar en el banco de datos del usuario que edita: quién, cuándo, y qué cambió (misión, visión, valores, colores, logo, slogan, tipografía, estilo).

**Dónde:**
- `logica.js`: en la función que guarda la Identidad Corporativa (`salvarIdentidad`), agregar el registro en `bancoDatos[usuarioId].actividad` usando la función `registrarActividadBancoDatos`.

**Qué NO hacer:**
- NO cambiar cómo se guarda la Identidad Corporativa hoy.
- NO tocar el banco de datos de otros usuarios.

---

## PUNTO 3: CAMBIO DE ICONOS ACTUALES (EMOJI → SVG)

**Contexto:** El sistema usa emojis en varios lugares. Deben ser reemplazados por los archivos SVG de la carpeta `Colores-y-Estetica/Iconos/`, usando el color verde brillante (`#00ff88`). Si falta un icono, la IA debe preguntar.

**Qué cambiar:**
- Reemplazar los emojis por los iconos SVG correspondientes:

| Emoji actual | Dónde está | SVG a usar |
|---|---|---|
| 👋 | Cartelera: saludo | `Saludos.svg` |
| ⚠️ | Cartelera: aviso de identidad pendiente | `Advertencia.svg` |
| 🔑 | Cartelera: solicitud de contraseña | `Contraseña.svg` |
| 🔐 | Cartelera: sugerencia de cambio de contraseña | `Cambiar contraseña.svg` |
| 📧 | Menú + Correos | `correos.svg` |
| 💬 | Menú + Chats | `chats.svg` |
| ✅ | Menú + Tareas | `tareas.svg` |
| ⏰ | Menú + Alarmas | `alarmas.svg` |
| 📅 | Menú + Calendario | `calendario.svg` |
| 📁 | Menú + Hub | `hub.svg` |
| 📱 | Menú + Enlace Móvil | `enlace movil.svg` |
| 📹 | Menú + Reuniones | `Reuniones.svg` |
| ⬡ | Menú + Otras Actividades | `otras actividades.svg` |

**Dónde:**
- `logica.js`: en los textos de cartelera (`construirColaMensajes`, `mostrarSiguienteMensaje`), en el menú (`actualizarMenuTuerca`) y en los títulos dinámicos.
- `index.html`: en el menú estático si aplica.
- `estilos.css`: agregar una clase (ej. `.icono-inline`) para que los SVG dentro del texto tengan el tamaño, alineación y color verde (`#00ff88`) adecuados.

**Regla para el futuro:**
- Antes de poner un icono nuevo, revisar la carpeta `Iconos/`. Si no hay uno adecuado, NO inventar, NO usar emoji, NO usar otro icono. Debe preguntar al Arquitecto.

**Qué NO hacer:**
- NO cambiar el texto de los mensajes.
- NO usar iconos que no estén en la carpeta.

---

## PUNTO 4: BOTÓN "OTRAS ACTIVIDADES" (FORMA DE PÍLDORA)

**Contexto:** El botón "Otras Actividades" usa `clip-path` para hacer forma de hexágono. Ese recorte corta el halo y el contorno, por lo que no se ve el efecto unificado que tienen los demás botones. Se cambiará su forma a una "píldora" (cápsula) para que el efecto se vea igual de bien.

**Qué cambiar:**
- Quitar el `clip-path` y la propiedad `filter: drop-shadow`.
- Cambiar la forma a píldora usando `border-radius: 999px;` (o 60px).
- Ajustar el ancho y alto si es necesario para que el texto y el icono queden bien dentro de la cápsula.
- Aplicar los efectos de hover y active normales (borde iluminado, sombra, escala 1.08, halo e inset) que ya tienen los demás botones.

**Dónde:**
- `estilos.css`: en la clase `.btn-hexagono` (se puede renombrar a `.btn-otras-actividades` si el Arquitecto lo aprueba, pero para no romper el HTML se mantiene el nombre de la clase).

**Cómo debe quedar:**
- El botón se ve como una cápsula alargada.
- El fondo respeta `--color-botones`.
- El texto respeta `--color-letras`.
- En hover: borde verde (`#00ff88`), sombra verde, escala 1.08.
- En active: halo verde intenso e inset.
- El icono va a la izquierda del texto, centrado verticalmente.

**Qué NO hacer:**
- NO cambiar la función del botón (sigue llevando a Otras Actividades).
- NO cambiar el texto "Otras Actividades".
- NO cambiar el tamaño del botón de forma exagerada.

---

**Fin de las instrucciones.**