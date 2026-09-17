# INSTRUCCIONES PARA LA IA DEL SISTEMA (VS CODE)

> **Propósito:** Este documento contiene los cambios concretos a implementar en el sistema Stratos.
> Cada punto incluye: **qué cambiar**, **dónde**, **cómo debe quedar**.

---

## PUNTO 1: MOVER LOGO + SLOGAN A SUPERIOR IZQUIERDA

**Qué cambiar:**
- Mover el logo y el slogan de la compañía de la parte superior centrada a la parte superior izquierda.
- El espacio superior restante (a la derecha del logo) debe ocuparlo el área de Cartelera de Mensajes.

**Dónde:**
- `index.html`: Estructura de la parte superior.
- `estilos.css`: Diseño de la parte superior.

**Cómo debe quedar:**
- La parte superior se divide en tres: izquierda (logo + slogan) ocupa 1/3, derecha (cartelera) ocupa 2/3.
- Comparten altura y ancho.
- El cuerpo de la pantalla crece, aprovechando el espacio liberado (al correr la cartelera hacia arriba, se libera el espacio actual que ocupa en pantalla).
- El logo/slogan dejan de ser el centro de atención y pasan a ser referencia y pertenencia (identidad).

---

## PUNTO 4: ELIMINAR SONIDO, VIBRACIÓN, MODO NOCTURNO DE CONFIGURACIÓN

**Qué cambiar:**
- Eliminar las tres opciones (Sonido, Vibración, Modo Nocturno) de la pantalla de Configuración.
- El sistema debe tomar los autorizados del dispositivo (no gestionarlos desde Stratos).
- En su lugar, implementar el botón de configuración de IA.

**Dónde:**
- `index.html`: Pantalla de Configuración.
- `logica.js`: Lógica de la pantalla de Configuración.
- `estilos.css`: Diseño de la pantalla de Configuración.

**Cómo debe quedar:**
- La pantalla de Configuración ya no tiene las tres opciones.
- En la misma área, aparece el botón de **"Configuración de IA"**.
- El sistema no gestiona sonido, vibración ni modo nocturno.

---

## PUNTO 6: SALUDO "HOLA [NOMBRE]" EN LOGIN

**Qué cambiar:**
- Implementar saludo personalizado en Login.
- El saludo debe cambiar **antes** de presionar "ENTRAR".
- Habiendo incluido el saludo personalizado, el sistema debe reconocer el nombre del último usuario del sistema para eso.
- Si el dispositivo ya tiene guardado varios usuarios y se cambia el usuario de entrada, al presionar ENTRAR, el sistema debe cambiar el nombre en el saludo inicial y luego entrar, permitiendo ver al usuario ese cambio.
- Al entrar, el saludo debe aparecer de nuevo en la Cartelera, **solo la primera vez del día** (para estadísticas de horario de trabajo).
- El reconocimiento facial/patrón/huella son opciones **dentro del mismo Login**, habilitadas según el dispositivo, **en la parte inferior del botón de entrada**.

**Dónde:**
- `index.html`: Pantalla de Login.
- `logica.js`: Lógica del saludo y del desplegable de usuarios.
- `estilos.css`: Diseño del saludo.

**Cómo debe quedar:**
- Al seleccionar un nombre del desplegable, el saludo cambia a "Hola [Nombre]".
- Al entrar, el saludo aparece en Cartelera (solo la primera vez del día).
- Las opciones de autenticación (facial, patrón, huella) aparecen en la parte inferior del botón de entrada, dentro del mismo Login, según el dispositivo.

---

## PUNTO 7: CREAR BOTÓN DE IA (EFECTOS VISUALES + SONIDO + INDICADOR DE VOZ)

**Qué cambiar:**
- Implementar la lógica del botón de IA (actualmente es un placeholder).
- El botón está en **todas las pantallas** (excepto Login). En la pantalla de Configuración está en otro lugar, pero su diseño es igual.
- Al presionar:
  - Se activa el micrófono (con sonido).
  - Se requiere el comando **"Hola [nombre]"** para confirmar que no fue un error.
- La ventana emergente:
  - Aparece cuando el usuario presiona el botón.
  - Guarda el diseño actual en cuanto a colores de las ventanas de Organigrama.
  - Solo tiene: el texto del estado, el botón de editar y la X.
  - Muestra en texto lo que el usuario dice (mientras Vero escucha).
  - Muestra en texto lo que Vero responde (mientras Vero habla).
  - Tiene un letrero **"PAUSA"** (en el área de "Escuchando") para que el usuario corrija manualmente si Vero tradujo mal.
  - En la parte de abajo, muestra el estado actual:
    - **"Escuchando..."** (mientras el micrófono está activo).
    - **"Respondiendo..."** (mientras Vero habla).
  - Se cierra sola después de un tiempo calculado: `(número de palabras / 3.5) + 0.75` segundos.
  - Mismo tamaño y forma que las de organigramas, pero crece si la respuesta ocupa más espacio.
  - Ubicación: parte inferior central, tamaño compacto, no se puede mover.
- El botón:
  - Es una **esfera con movimiento tipo humo** (el humo color verde Stratos), con la palabra "Stratos" sobre ella (excepto en la pantalla de Configuración, que tiene la oración "Configuración de IA").
  - Tiene los colores de identidad corporativa de un botón.
  - Al presionar, sale un **halo de luz verde Stratos**.
- **La única pantalla sin Vero es Login.**

**Dónde:**
- `index.html`: Estructura del botón y la ventana emergente.
- `logica.js`: Lógica de activación, micrófono, ventana emergente, estados.
- `estilos.css`: Diseño del botón (esfera, humo, halo) y de la ventana emergente.

**Cómo debe quedar:**
- El botón de IA es una esfera con movimiento tipo humo (humo color verde Stratos), con "Stratos" sobre ella, colores de identidad, y halo verde al presionar.
- La ventana emergente muestra texto (lo que dice el usuario y lo que responde Vero), con estado "Escuchando..." o "Respondiendo...", con opción "PAUSA", botón de editar y X.
- Se cierra sola después del tiempo calculado.

---

**Fin de las instrucciones.**