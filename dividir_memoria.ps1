$lineas = Get-Content "c:\Proyectos\Para Crear APP\Stratos\instrucciones-IA\MEMORIA.md"
$total = $lineas.Count
Write-Host "Total líneas MEMORIA.md: $total"
$recorte = $lineas | Select-Object -First 167
$historial = $lineas | Select-Object -Skip 167
$encabezado = @(
    "# 📜 HISTORIAL BITÁCORA — STRATOS",
    "",
    "Este archivo contiene el historial de bitácora antiguo de `MEMORIA.md` (entradas de 19/10/2026 hacia atrás, es decir, todo lo que tiene más de 2 meses de antigüedad o ya está 100% hecho y cerrado).",
    "",
    "Se movió aquí para que `MEMORIA.md` quede ligero y solo contenga lo vigente (últimas sesiones de octubre 2026) y la estructura del proyecto.",
    "",
    "---",
    ""
)
$nota = @(
    "",
    "---",
    "",
    "## HISTORIAL ANTIGUO MOVIDO",
    "",
    "Todas las entradas de bitácora de 19/10/2026 hacia atrás (agosto, septiembre y primera mitad de octubre 2026), ya 100% hechas y cerradas, se trasladaron a:",
    "",
    "instrucciones-IA/Historial_Bitacora.md",
    "",
    "MEMORIA.md conserva solo: estructura/protocolo, mapa de archivos, VISIÓN DEL ARQUITECTO, reglas de iconos, y las entradas de bitácora de octubre 2026 (20/10 y 21/10).",
    ""
)
($encabezado + $historial) | Set-Content -Encoding UTF8 "c:\Proyectos\Para Crear APP\Stratos\instrucciones-IA\Historial_Bitacora.md"
($recorte + $nota) | Set-Content -Encoding UTF8 "c:\Proyectos\Para Crear APP\Stratos\instrucciones-IA\MEMORIA.md"
Write-Host "Hecho. MEMORIA.md: $($recorte.Count + $nota.Count) líneas, Historial_Bitacora.md: $($encabezado.Count + $historial.Count) líneas"
