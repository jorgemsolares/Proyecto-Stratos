# PROTOCOLO DE SINCRONIZACIÓN CON GITHUB — STRATOS
**Creado:** 17/09/2026 · **Motivo:** evitar que se repita el enredo del 16/09/2026
**Para:** el Arquitecto (Jorge) y cualquier IA que trabaje en este proyecto.

---

## 1. POR QUÉ EXISTE ESTE DOCUMENTO

El 16/09/2026 el repositorio quedó **a mitad de un `rebase`** (`no branch, rebasing main`),
con 7 archivos preparados sin commitear y **37 líneas de trabajo de Vero que solo existían
en el disco duro** (no estaban en ningún commit). Se pudo rescatar, pero costó tiempo y
riesgo. Las tres causas fueron:

1. Se subía a GitHub **sin integrar antes lo que había en GitHub** (el `push` fue rechazado).
2. Un rebase quedó **a medias** porque se cerró el editor/terminal en medio del proceso.
3. Había **trabajo solo en el disco** que nadie había commiteado (a un paso de perderse).

Este protocolo y las tres herramientas que lo acompañan cierran esas tres puertas.

---

## 2. LAS TRES HERRAMIENTAS (tareas de VS Code)

Se lanzan con **Ctrl+Shift+P → "Run Task"**:

| Tarea | Qué hace | Cuándo usarla |
|---|---|---|
| **0) Iniciar vigilante de respaldo (dejar abierto)** | Vigila toda la carpeta del proyecto. Cada vez que guardas algo, respalda y sube a GitHub (máx. 1 vez por minuto). | Al empezar a trabajar. Se deja corriendo. |
| **1) Estado Git (diagnóstico)** | Te dice en 2 segundos: rama, si hay rebase a medias, qué está sin commitear, qué falta subir y el **VEREDICTO**. | Antes de empezar, antes de subir y cuando algo "huela raro". |
| **2) Sincronizar con GitHub** | Rescata rebase/merge a medias, commitea, integra lo de GitHub y sube, con verificación final. | Para subir a mano con reporte (o cuando el vigilante avise). |

El diagnóstico guarda además el reporte en `_estado_git.txt` (raíz del proyecto).
**Si hay que pedir ayuda a la IA, se le pega ese archivo completo.**

### VEREDICTOS DEL DIAGNÓSTICO

| Veredicto | Significado | Qué hacer |
|---|---|---|
| **AL DÍA** (verde) | Todo respaldado y GitHub igual. | Trabajar tranquilo. |
| **CON AVISOS** (amarillo) | Nada está en riesgo, pero hay archivos nuevos solo en el PC. | Correr la tarea 2 cuando sea buen momento. |
| **REVISAR** (rojo) | Hay trabajo sin respaldo, commits sin subir, rebase/merge a medias o conflictos. | Correr la tarea 2 (o ver la sección 4). |

---

## 3. RUTINA RECOMENDADA

**Al empezar a trabajar**
1. Tarea **1) Estado Git** → debe decir AL DÍA (o CON AVISOS).
2. Tarea **0) Iniciar vigilante** → se deja corriendo en su propia terminal.

**Mientras trabajas** — nada especial: el vigilante respalda y sube solo (máx. 1 vez por minuto).

**Antes de cerrar el PC**
1. Tarea **2) Sincronizar con GitHub** (deja el mensaje o presiona Enter para el automático).
2. Tarea **1) Estado Git** → debe decir **AL DÍA**.

**Al cerrar la sesión de IA** — el protocolo ya pide anotar en `MEMORIA.md`; con el vigilante
corriendo, esa anotación sube sola.

---

## 4. QUÉ HACER SI...

### a) El diagnóstico dice "REBASE por terminar" o "MERGE por terminar"
**No toques nada a mano.** Corre la tarea **2) Sincronizar con GitHub**.
Antes de tocar nada guarda un respaldo en la rama local `respaldo-antes-de-rebase`,
cierra el rebase (o lo aborta si no se puede cerrar) y deja el repositorio en `main` sano.
Después corre la tarea 1 y verifica que diga AL DÍA.

### b) El diagnóstico dice que hay conflictos
La tarea 2 **se detiene sola y no sube nada** (a propósito: no adivina).
Ver la sección 5 (rescate manual) o pedir ayuda a la IA pegando `_estado_git.txt`.

### c) GitHub rechazó la subida
Tu commit **sigue guardado en tu PC** (no se pierde nada). Revisa internet/credenciales
y vuelve a correr la tarea 2. El vigilante también lo deja anotado en `_subida_automatica.log`.

### d) El vigilante avisa "hay un REBASE sin terminar"
Es correcto: se protege solo. Corre la tarea 2 y luego vuelve a lanzar el vigilante.

### e) Quedó trabajo sin subir y no hay internet
No pasa nada: el commit queda en el PC. Cuando vuelva la conexión, corre la tarea 2.
**Lo único prohibido es borrar la carpeta del proyecto o formatear sin haber visto "AL DÍA".**

### f) Estás en otro PC o alguien más va a seguir el trabajo
1. `git clone https://github.com/jorgemsolares/Proyecto-Stratos.git`
2. Copiar las herramientas locales (`estado_git.ps1`, `sincronizar_git.ps1`,
   `subir_automatico.ps1`, `.vscode\tasks.json`): **no están en GitHub a propósito**
   (son herramientas locales del PC del Arquitecto, igual que `subir_automatico.ps1`).

---

## 5. RESCATE MANUAL (SOLO SI LA IA O YO LO INDICAMOS)

Comandos, en este orden y **uno por uno** (nunca encadenados):

```powershell
# 1. Ver qué está pasando (nunca hace daño)
git status
git --no-pager log --oneline -5

# 2. Si hay un rebase a medias y quieres volver atrás sin perder nada:
git branch respaldo-antes-de-rebase     # respaldo por si acaso
git rebase --abort                      # vuelve a main tal como estaba

# 3. Si quieres cerrar el rebase (resolviendo conflictos ya):
$env:GIT_EDITOR='true'
git rebase --continue

# 4. Guardar TODO lo que hay en el disco (aunque parezca perdido):
git add -A
git commit -m "Rescate: trabajo del disco"

# 5. Subir siempre integrando primero (nunca solo 'git push'):
git pull --rebase --autostash origin main
git push origin main
```

**Reglas de oro (aprendidas el 16/09/2026):**
1. **Nunca** `git push` sin `git pull --rebase` antes.
2. **Nunca** dejar un `rebase` a medias: o se termina, o se aborta.
3. **Nunca** dar por perdido un archivo sin mirar antes `git status --porcelain` y el disco.
4. Ante la duda: `git branch respaldo-<fecha>` (una rama de respaldo no cuesta nada).
5. Los archivos temporales de la IA (`_*.txt`) no se suben: están en `.gitignore`.

---

## 6. ARCHIVOS QUE **NO** SE SUBEN (y por qué)

| Archivo | Motivo |
|---|---|
| `.venv/` | Entorno virtual de Python (local). |
| `.vscode/` | Configuración de VS Code (local, incluidas las tareas). |
| `subir_automatico.ps1`, `estado_git.ps1`, `sincronizar_git.ps1` | Herramientas locales de sincronización. |
| `_subida_automatica.log`, `_estado_git.txt`, `_*.txt` | Registros y temporales de trabajo. |
| `Motor-Logica-y-Acronimos/_respaldo_*/` | Respaldos locales del motor. |

**Sí se suben:** el sistema (`Cuerpo-y-Textos/`, `Colores-y-Estetica/`,
`Motor-Logica-y-Acronimos/`) y **todo** `instrucciones-IA/` (memoria, visión, protocolo),
porque la IA del internet necesita leerlos.

---

## 7. HISTORIAL DE ESTE PROTOCOLO

| Fecha | Cambio |
|---|---|
| 17/09/2026 | Creación. Tras el enredo del rebase del 16/09. Se endurece el vigilante (integra antes de subir, verifica después, no toca nada si hay rebase a medias) y se añaden `estado_git.ps1` y `sincronizar_git.ps1`. |
