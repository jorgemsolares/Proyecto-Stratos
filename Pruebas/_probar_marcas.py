"""
PRUEBA de las marcas del dia del PUNTO 6 Parte A (primera entrada, ultima salida
y tiempo total). Porta 1:1 a Python las funciones minutosHastaAhora y
obtenerMarcasDelDia de logica.js y comprueba los 3 casos que importan:
dia abierto, dia cerrado y cruce de medianoche.
"""
import io, os
from datetime import datetime, timedelta

CARPETA = os.path.dirname(os.path.abspath(__file__))
REPORTE = os.path.join(CARPETA, 'resultado_marcas.txt')
salida, fallos = [], []

def comprobar(nombre, condicion, detalle=""):
    if condicion:
        salida.append("[OK]    %s" % nombre)
    else:
        fallos.append(nombre)
        salida.append("[FALLA] %s  %s" % (nombre, detalle))

# ---------- puerto de logica.js ----------
def minutos_hasta_ahora(registro, ahora):
    if not registro or not registro.get("fechaEntrada"):
        return 0
    fin = datetime.fromisoformat(registro["fechaSalida"]) if registro.get("fechaSalida") else ahora
    ms = (fin - datetime.fromisoformat(registro["fechaEntrada"])).total_seconds() * 1000
    if not ms or ms <= 0:
        return 0
    return round(ms / 60000)

def obtener_marcas_del_dia(registros, usuario_id, hoy):
    registro = next((r for r in registros if r["usuarioId"] == usuario_id and r["diaLaboral"] == hoy), None)
    if not registro:
        return {"primeraEntradaDelDia": None, "ultimaSalidaDelDia": None, "tiempoTotalDelDia": 0}
    return {
        "primeraEntradaDelDia": "%s %s" % (registro["diaLaboral"], registro["horaEntrada"]),
        "ultimaSalidaDelDia": ("%s %s" % (registro["diaLaboral"], registro["horaSalida"])
                               if registro.get("horaSalida") else None),
        "tiempoTotalDelDia": minutos_hasta_ahora(registro, datetime.now()),
    }

# ---------- 1) Dia ABIERTO: el tiempo va contando, la salida sigue vacia ----------
ahora = datetime.now()
inicio = ahora - timedelta(hours=2, minutes=30)
abierto = {"id": "r1", "usuarioId": "u1", "diaLaboral": "2026-10-04",
           "horaEntrada": inicio.strftime("%H:%M"),
           "fechaEntrada": inicio.isoformat(), "horaSalida": None, "fechaSalida": None}
m = obtener_marcas_del_dia([abierto], "u1", "2026-10-04")
comprobar("ABIERTO: la primera entrada queda escrita", m["primeraEntradaDelDia"] == "2026-10-04 " + inicio.strftime("%H:%M"), str(m))
comprobar("ABIERTO: la ultima salida sigue VACIA", m["ultimaSalidaDelDia"] is None, str(m))
comprobar("ABIERTO: el tiempo va contando solo (150 min)", m["tiempoTotalDelDia"] == 150, str(m["tiempoTotalDelDia"]))

# ---------- 2) Dia CERRADO: entrada + salida + tiempo fijo ----------
cerrado = {"id": "r2", "usuarioId": "u1", "diaLaboral": "2026-10-04",
           "horaEntrada": "08:00", "fechaEntrada": "2026-10-04T08:00:00",
           "horaSalida": "17:30", "fechaSalida": "2026-10-04T17:30:00"}
m = obtener_marcas_del_dia([cerrado], "u1", "2026-10-04")
comprobar("CERRADO: primera entrada 08:00", m["primeraEntradaDelDia"] == "2026-10-04 08:00", str(m))
comprobar("CERRADO: ultima salida 17:30", m["ultimaSalidaDelDia"] == "2026-10-04 17:30", str(m))
comprobar("CERRADO: 9h30 = 570 minutos", m["tiempoTotalDelDia"] == 570, str(m["tiempoTotalDelDia"]))

# ---------- 3) Cruce de medianoche: el cierre pertenece al dia anterior ----------
medianoche = {"id": "r3", "usuarioId": "u1", "diaLaboral": "2026-10-04",
              "horaEntrada": "23:00", "fechaEntrada": "2026-10-04T23:00:00",
              "horaSalida": "00:30", "fechaSalida": "2026-10-05T00:30:00",
              "salidaTrasMedianoche": True}
m = obtener_marcas_del_dia([medianoche], "u1", "2026-10-04")
comprobar("MEDIANOCHE: la ultima salida sigue en el dia LABORAL", m["ultimaSalidaDelDia"] == "2026-10-04 00:30", str(m))
comprobar("MEDIANOCHE: 1h30 = 90 minutos", m["tiempoTotalDelDia"] == 90, str(m["tiempoTotalDelDia"]))

# ---------- 4) Usuario sin registro de hoy ----------
m = obtener_marcas_del_dia([cerrado], "u9", "2026-10-04")
comprobar("SIN REGISTRO: las marcas quedan vacias", m["primeraEntradaDelDia"] is None and m["tiempoTotalDelDia"] == 0, str(m))

# ---------- 5) Al entrar de nuevo el mismo dia NO se pisa la primera entrada ----------
registros = [dict(abierto)]
comprobar("NO PISAR: un segundo ingreso conserva el mismo registro",
          len(registros) == 1 and registros[0]["horaEntrada"] == inicio.strftime("%H:%M"))

salida.append("---")
salida.append("PRUEBAS CON PROBLEMA: %d" % len(fallos))
io.open(REPORTE, 'w', encoding='utf-8').write("\n".join(salida))
print("\n".join(salida))