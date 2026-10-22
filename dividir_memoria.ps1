$pathMem = "c:\Proyectos\Para Crear APP\Stratos\instrucciones-IA\MEMORIA.md"
$pathHis = "c:\Proyectos\Para Crear APP\Stratos\instrucciones-IA\Historial_Bitacora.md"
$lineas = Get-Content $pathMem
$total = $lineas.Count
Write-Host ("Total líneas MEMORIA.md: " + $total)
$recorte = $lineas | Select-Object -First 167
$historial = $lineas | Select-Object -Skip 167
$encabezado = "# 📜 HISTORIAL BITÁCORA — STRATOS`r`n`r`nEste archivo contiene el historial de bitácora antiguo de MEMORIA.md (entradas de 19/10/2026 hacia atrás, es decir, todo lo que tiene más de 2 meses de antigüedad o ya está 100% hecho y cerrado).`r`n`r`nSe movió aquí para que MEMORIA.md quede ligero y solo contenga lo vigente (últimas sesiones de octubre 2026) y la estructura del proyecto.`r`n`r`n---`r`n`r`n"
$historialCompleto = $encabezado + ($historial -join "`r`n") + "`r`n"
Set-Content -Path $pathHis -Value $historialCompleto -Encoding UTF8
$nota = "`r`n---`r`n`r`n## HISTORIAL ANTIGUO MOVIDO`r`n`r`nTodas las entradas de bitácora de 19/10/2026 hacia atrás (agosto, septiembre y primera mitad de octubre 2026), ya 100% hechas y cerradas, se trasladaron a:`r`n`r`ninstrucciones-IA/Historial_Bitacora.md`r`n`r`nMEMORIA.md conserva solo: estructura/protocolo, mapa de archivos, VISIÓN DEL ARQUITECTO, reglas de iconos, y las entradas de bitácora de octubre 2026 (20/10 y 21/10).`r`n"
$memoriaCompleto = ($recorte -join "`r`n") + $nota
Set-Content -Path $pathMem -Value $memoriaCompleto -Encoding UTF8
Write-Host ("Hecho. MEMORIA.md: " + ($recorte.Count + 1) + " líneas, Historial_Bitacora.md: " + ($historial.Count + 3) + " líneas")
