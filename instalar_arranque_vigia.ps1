# ============================================================
# ARRANQUE AUTOMÁTICO DEL VIGÍA - STRATOS
# ------------------------------------------------------------
# Este archivo NO sube nada a GitHub. Solo hace que el vigía
# (subir_automatico.ps1) arranque solo, siempre, sin que el
# Arquitecto tenga que ejecutarlo a mano cada vez.
#
# CÓMO FUNCIONA:
#   1. Este archivo se registra UNA VEZ en el Programador de
#      Tareas de Windows (con nivel de ejecucion mas alto).
#   2. Windows lo ejecuta al iniciar sesión (via wscript.exe + lanzar_vigia_oculto.vbs).
#   3. El lanzador .vbs arranca el vigía (subir_automatico.ps1) 100% invisible.
#   4. El vigía queda corriendo siempre.
#
# USO (UNA SOLA VEZ):
#   En PowerShell (como Administrador):
#   powershell -NoProfile -ExecutionPolicy Bypass -File .\instalar_arranque_vigia.ps1
#
# DESINSTALAR:
#   powershell -NoProfile -ExecutionPolicy Bypass -File .\instalar_arranque_vigia.ps1 -Desinstalar
# ============================================================

param(
    [switch]$Desinstalar
)

$ErrorActionPreference = "Stop"

$NombreTarea = "StratosVigiaRespaldo"
$RutaProyecto = $PSScriptRoot
$RutaVigia = Join-Path $RutaProyecto "subir_automatico.ps1"

# ---------- MODO DESINSTALAR ----------
if ($Desinstalar) {
    Write-Host ""
    Write-Host "============================================================" -ForegroundColor Cyan
    Write-Host "  DESINSTALAR ARRANQUE AUTOMATICO DEL VIGIA" -ForegroundColor Cyan
    Write-Host "============================================================" -ForegroundColor Cyan
    try {
        Unregister-ScheduledTask -TaskName $NombreTarea -Confirm:$false -ErrorAction Stop
        Write-Host "  Tarea eliminada correctamente." -ForegroundColor Green
    } catch {
        Write-Host "  La tarea no existia (o no se pudo eliminar)." -ForegroundColor Yellow
    }
    Write-Host ""
    exit 0
}

# ---------- VALIDACIONES ----------
if (-not (Test-Path $RutaVigia)) {
    Write-Host ""
    Write-Host "  [!] No se encontro el vigia en: $RutaVigia" -ForegroundColor Red
    Write-Host "      Verifica que el archivo subir_automatico.ps1 este en la carpeta del proyecto." -ForegroundColor Red
    Write-Host ""
    exit 1
}

$RutaLanzador = Join-Path $RutaProyecto "lanzar_vigia_oculto.vbs"
if (-not (Test-Path $RutaLanzador)) {
    Write-Host ""
    Write-Host "  [!] No se encontro el lanzador invisible en: $RutaLanzador" -ForegroundColor Red
    Write-Host "      Verifica que el archivo lanzar_vigia_oculto.vbs este en la carpeta del proyecto." -ForegroundColor Red
    Write-Host ""
    exit 1
}

Write-Host ""
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  INSTALAR ARRANQUE AUTOMATICO DEL VIGIA - STRATOS" -ForegroundColor Cyan
Write-Host "============================================================" -ForegroundColor Cyan
Write-Host "  Proyecto : $RutaProyecto"
Write-Host "  Vigia    : $RutaVigia"
Write-Host "  Lanzador : $RutaLanzador"
Write-Host "  Tarea    : $NombreTarea"
Write-Host ""

# ---------- CREAR LA ACCION ----------
# La accion es: ejecutar el lanzador invisible (VBScript) con wscript.exe.
# El .vbs arranca el vigia con powershell -WindowStyle Hidden y objShell.Run 0,False,
# por lo que NO se ve ninguna ventana negra al iniciar sesion (PUNTO 1, 18/10/2026).
$Accion = New-ScheduledTaskAction `
    -Execute "wscript.exe" `
    -Argument "`"$RutaLanzador`"" `
    -WorkingDirectory $RutaProyecto

# ---------- CREAR EL DISPARADOR ----------
# Se ejecuta al iniciar sesion del usuario.
$Disparador = New-ScheduledTaskTrigger -AtLogOn

# ---------- CONFIGURACION ----------
# - No detener si el equipo pasa a bateria.
# - Permitir arrancar con bateria.
# - Reiniciar si falla.
# - Sin limite de tiempo (el vigia corre siempre).
$Configuracion = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -RestartCount 3 `
    -RestartInterval (New-TimeSpan -Minutes 1) `
    -ExecutionTimeLimit ([TimeSpan]::Zero)

# ---------- NIVEL DE EJECUCION ----------
# Mantiene los permisos elevados con los que fue instalado (PUNTO 1, 18/10/2026):
# la tarea corre con el nivel mas alto disponible para el usuario actual.
$Principal = New-ScheduledTaskPrincipal `
    -UserId $env:USERNAME `
    -LogonType Interactive `
    -RunLevel Highest

# ---------- REGISTRAR LA TAREA ----------
try {
    # Si ya existe, la eliminamos primero (para evitar duplicados).
    $tareaExistente = Get-ScheduledTask -TaskName $NombreTarea -ErrorAction SilentlyContinue
    if ($tareaExistente) {
        Write-Host "  La tarea ya existia. Reemplazando..." -ForegroundColor Yellow
        Unregister-ScheduledTask -TaskName $NombreTarea -Confirm:$false
    }

    Register-ScheduledTask `
        -TaskName $NombreTarea `
        -Action $Accion `
        -Trigger $Disparador `
        -Settings $Configuracion `
        -Principal $Principal `
        -Description "Arranca el vigia de respaldo automatico a GitHub para Stratos al iniciar sesion (invisible, con privilegios elevados)." `
        -Force | Out-Null

    Write-Host ""
    Write-Host "  Tarea registrada correctamente." -ForegroundColor Green
    Write-Host ""
    Write-Host "  A partir de ahora, el vigia arrancara solo cada vez que inicies sesion en Windows." -ForegroundColor Green
    Write-Host "  Si quieres probarlo ahora sin reiniciar, ejecuta:" -ForegroundColor Cyan
    Write-Host "    Start-ScheduledTask -TaskName `"$NombreTarea`"" -ForegroundColor Cyan
    Write-Host ""
} catch {
    Write-Host ""
    Write-Host "  [!] No se pudo registrar la tarea." -ForegroundColor Red
    Write-Host "      Detalle: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "  NOTA: Es posible que necesites ejecutar este script como Administrador." -ForegroundColor Yellow
    Write-Host ""
    exit 1
}