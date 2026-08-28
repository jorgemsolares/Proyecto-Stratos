# 🧭 A DONDE VA STRATOS (Visión del Arquitecto)

> **Documento de visión.** Este archivo es el "norte" del proyecto.
> La IA DEBE leerlo al inicio de cualquier sesión para entender el objetivo completo sin que el Arquitecto tenga que repetirlo.

---

## 1. ¿Qué es STRATOS?

STRATOS es una **herramienta multifuncional** de gestión de actividades pocas veces medibles en el accionar personal/organizacional. 
Su estructura principal se basa en un **organigrama** (No.1, Colaboradores, Observadores, Indirectos) que determina los niveles de comunicación directa y la forma en que permeará la comunicación de toda actividad, lo cual recuerda, la base de la actividad siempre es la buena comunicación, también busca dejar rastro que permita medir al detalle el porcentaje invertido en cada actividad, también promueve una **identidad corporativa** por medio de definir la imagen visual de donde se va a trabajar, pero más importante, prestando al usuario la plataforma que dejará marca de su importancia en cada cosa que haga, permitiendo medir su injerencia real en cada actividad que lleva a los resultados.

## 2. ¿Qué se busca lograr?

- Que sea una herramienta **usable, práctica, completa y visualmente atractiva**.
- Que funcione como un sistema de gestión donde el usuario controle su comunicación y avances dejando su identidad y la red de contactos con los que intervino para lograr el objetivo.
- Que tenga la capacidad de **cambiar de idioma** (Español/Inglés) según la preferencia del usuario.
- Que permita medir sus actividades y el estado de las mismas al momento de su revisión en tiempo real.
- Que la medición de su aporte laboral no sea solo sobre un resultado sino sobre su participación en cada paso que intervino de una actividad. 
- Que el usuario vea en el sistema su carta de presentación, su herramienta diaria, su respaldo e incentivo de trabajo, su motor y herramienta indispensable. 

## 3. ¿Cómo se quiere lograr?

- **Diseño:** Sistema visual claro, profesional y responsive (usando variables CSS definidas en `estilos.css`).
- **Arquitectura:** Código limpio y separado por responsabilidades:
  - `index.html` (Estructura y textos)
  - `estilos.css` (Diseño)
  - `datos.js` (Datos y memoria)
  - `logica.js` (Procesamiento e interacción)

## 4. Seguridad y respaldo

- **GitHub** se usa como **respaldo y seguridad**: si un cambio sale mal, se debe poder **retroceder** al estado anterior.
- La información debe guardarse de forma segura en el navegador (localStorage) para no perder los datos del usuario.

## 5. La regla de oro del Arquitecto

- El Arquitecto trabaja por **una sola área o funcionalidad a la vez**.
- Si la IA no está segura de algo, **debe preguntar antes de tocar el código**.
- **No se deja nada a medias:** si algo no se termina, se anota como pendiente en la bitácora (`MEMORIA.md`) para la próxima sesión.

