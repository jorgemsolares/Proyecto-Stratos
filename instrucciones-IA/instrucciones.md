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
- `instalar_arranque_vigia.ps1` y `subir_automatico.ps1`.

---

## PUNTO 1: OCULTAR LA VENTANA DEL VIGÍA Y MANTENER PERMISOS DE ADMINISTRADOR

**Contexto:** Al iniciar la computadora, se abre una ventana negra de PowerShell mostrando el registro del vigía (`subir_automatico.ps1`). El Arquitecto quiere que arranque en segundo plano de forma 100% invisible y que mantenga los permisos elevados con los que fue instalado.

**Qué cambiar:**
- Crear un archivo lanzador invisible usando VBScript.
- Modificar el instalador para que registre este nuevo lanzador con nivel de ejecución más alto.

**Dónde:**
- En la raíz del proyecto, crear un archivo llamado `lanzar_vigia_oculto.vbs`.
- Modificar el archivo `instalar_arranque_vigia.ps1`.

**Cómo debe quedar:**

1. **El archivo `lanzar_vigia_oculto.vbs`** debe tener exactamente este contenido:
```vbscript
Set objShell = CreateObject("WScript.Shell")
rutaScript = "C:\Proyectos\Para Crear APP\Stratos\subir_automatico.ps1"
comando = "powershell.exe -NoProfile -ExecutionPolicy Bypass -WindowStyle Hidden -File " & Chr(34) & rutaScript & Chr(34)
objShell.Run comando, 0, False