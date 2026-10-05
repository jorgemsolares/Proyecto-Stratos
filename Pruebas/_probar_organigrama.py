"""
PRUEBA de la logica nueva del PUNTO 31 (organigrama general) y del cruce de
datos del PUNTO 33. Porta 1:1 a Python las funciones de logica.js y comprueba los
casos reales: cadenas de 4+ niveles, ciclos, No.1 duplicados, acentos y
apostrofos, y deteccion de duplicados en todas las listas.
"""
import io, os

CARPETA = os.path.dirname(os.path.abspath(__file__))
REPORTE = os.path.join(CARPETA, 'resultado_organigrama.txt')
salida = []
fallos = []

def comprobar(nombre, condicion, detalle=""):
    if condicion:
        salida.append("[OK]    %s" % nombre)
    else:
        fallos.append(nombre)
        salida.append("[FALLA] %s  %s" % (nombre, detalle))

# ---------- puerto de logica.js ----------
def normalizar_para_comparar(texto):
    if texto is None:
        texto = ""
    return " ".join(str(texto).lower().split()).strip()

def coincide(registro, nombre, puesto, telefono, email, en_edicion):
    if registro is None:
        return False
    if registro.get("id") and registro.get("id") == en_edicion:
        return False
    r_nombre = normalizar_para_comparar(registro.get("nombreCompleto") or registro.get("nombre"))
    r_puesto = normalizar_para_comparar(registro.get("puesto") or registro.get("posicion"))
    r_tel = normalizar_para_comparar(registro.get("telefono"))
    r_mail = normalizar_para_comparar(registro.get("email"))
    if telefono and r_tel and telefono == r_tel:
        return True
    if email and r_mail and email == r_mail:
        return True
    if nombre and r_nombre and nombre == r_nombre and puesto and r_puesto and puesto == r_puesto:
        return True
    return False

def recorrer(nodo, lista):
    if not nodo:
        return lista
    lista.append(nodo)
    for hijo in nodo.get("hijos", []):
        recorrer(hijo, lista)
    return lista

def buscar_duplicado(base, organigrama, indirectos, observadores, datos, activo, en_edicion=None):
    nombre = normalizar_para_comparar(datos.get("nombre"))
    puesto = normalizar_para_comparar(datos.get("puesto"))
    telefono = normalizar_para_comparar(datos.get("telefono"))
    email = normalizar_para_comparar(datos.get("email"))
    for u in base:
        if coincide(u, nombre, puesto, telefono, email, en_edicion):
            superior = next((x for x in base if x["id"] == u.get("superiorId")), None)
            otra = bool(u.get("superiorId") and u.get("superiorId") != activo)
            return {"registro": u, "otraRama": otra,
                    "nombreSuperior": (superior.get("nombre") or superior.get("nombreCompleto"))
                                      if (otra and superior) else None}
    for c in recorrer(organigrama, []):
        if coincide(c, nombre, puesto, telefono, email, en_edicion):
            return {"registro": c, "otraRama": False, "nombreSuperior": None}
    for c in list(indirectos) + list(observadores):
        if coincide(c, nombre, puesto, telefono, email, en_edicion):
            return {"registro": c, "otraRama": False, "nombreSuperior": None}
    return None

def normalizar_unico_no1(base):
    marcados = [u for u in base if u.get("esNo1")]
    if len(marcados) <= 1:
        return None
    ganador = sorted(marcados, key=lambda u: str(u.get("fechaRegistro") or ""))[0]
    for u in marcados:
        if u["id"] == ganador["id"]:
            continue
        u["esNo1"] = False
        if not u.get("superiorId"):
            u["superiorId"] = ganador["id"]
    ganador["esNo1"] = True
    return ganador

def construir(base):
    usuarios = [u for u in base if u and u.get("id")]
    if not usuarios:
        return {"raices": [], "nodos": {}, "totalUsuarios": 0}
    nodos = {u["id"]: {"id": u["id"], "superiorId": u.get("superiorId") or None,
                       "nivel": None, "esNo1": bool(u.get("esNo1"))} for u in usuarios}
    hijos_de = {i: [] for i in nodos}
    for i in nodos:
        jefe = nodos[i]["superiorId"]
        if not jefe or jefe not in nodos or jefe == i:
            continue
        hijos_de[jefe].append(i)
    raices = [i for i in nodos if not nodos[i]["superiorId"] or nodos[i]["superiorId"] not in nodos]
    cola = list(raices)
    for i in raices:
        nodos[i]["nivel"] = 0
    while cola:
        actual = cola.pop(0)
        nivel = nodos[actual]["nivel"] or 0
        for hijo in hijos_de[actual]:
            if nodos[hijo]["nivel"] is None:
                nodos[hijo]["nivel"] = nivel + 1
                cola.append(hijo)
    for i in nodos:
        if nodos[i]["nivel"] is None:          # ciclo: pasa a raiz
            nodos[i]["nivel"] = 0
            raices.append(i)
    id_no1 = next((i for i in nodos if nodos[i]["esNo1"]), None)
    if id_no1 and id_no1 not in raices:
        raices.insert(0, id_no1)
    return {"raices": raices, "nodos": nodos, "totalUsuarios": len(usuarios)}

# ---------- datos de prueba ----------
ACTIVO = "u1"          # quien esta invitando (el No.1)
base = [
    {"id": "u1", "nombre": "Ana", "nombreCompleto": "Ana Ruiz", "posicion": "Directora",
     "telefono": "5551", "email": "ana@x.com", "esNo1": True, "superiorId": None,
     "invitadoPor": None, "fechaRegistro": "2026-01-01"},
    {"id": "u2", "nombre": "Luis", "nombreCompleto": "Luis Paz", "posicion": "Gerente",
     "telefono": "5552", "email": "luis@x.com", "esNo1": False, "superiorId": "u1",
     "invitadoPor": "u1", "fechaRegistro": "2026-02-01"},
    {"id": "u3", "nombre": "Sara", "nombreCompleto": "Sara Diaz", "posicion": "Analista",
     "telefono": "5553", "email": "sara@x.com", "esNo1": False, "superiorId": "u2",
     "invitadoPor": "u2", "fechaRegistro": "2026-03-01"},
    {"id": "u4", "nombre": "O'Brien", "nombreCompleto": "Donal O'Brien", "posicion": "Asistente",
     "telefono": "5554", "email": "obrien@x.com", "esNo1": False, "superiorId": "u3",
     "invitadoPor": "u3", "fechaRegistro": "2026-04-01"},
]
indirectos = [{"id": "c1", "nombre": "Marta Soto", "puesto": "Proveedor",
               "telefono": "7777", "email": "marta@y.com"}]
observadores = [{"id": "o1", "nombre": "Pedro Gil", "puesto": "Cliente",
                 "telefono": "8888", "email": "pedro@y.com"}]

# ===== ARBOL DEL ORGANIGRAMA GENERAL (PUNTO 31) =====
arbol = construir(base)
comprobar("ARBOL: los 4 usuarios entran", arbol["totalUsuarios"] == 4, str(arbol["totalUsuarios"]))
comprobar("ARBOL: hay una sola raiz (el No.1)", len(arbol["raices"]) == 1, str(arbol["raices"]))
comprobar("ARBOL: la raiz es el No.1", arbol["raices"][0] == "u1", str(arbol["raices"]))
comprobar("ARBOL: se llegan a 4 niveles (0,1,2,3)",
          [arbol["nodos"][i]["nivel"] for i in ("u1", "u2", "u3", "u4")] == [0, 1, 2, 3],
          str([arbol["nodos"][i]["nivel"] for i in ("u1", "u2", "u3", "u4")]))

ciclo = [{"id": "a", "esNo1": True, "superiorId": "b"},
         {"id": "b", "esNo1": False, "superiorId": "a"}]
arbol_ciclo = construir(ciclo)
comprobar("ARBOL: un ciclo no rompe nada",
          all(n["nivel"] is not None for n in arbol_ciclo["nodos"].values()),
          str({k: v["nivel"] for k, v in arbol_ciclo["nodos"].items()}))

propio = [{"id": "x", "esNo1": True, "superiorId": "x"}]
comprobar("ARBOL: nadie es su propio jefe",
          "x" in construir(propio)["raices"], str(construir(propio)["raices"]))

con_dos = [dict(u) for u in base]
con_dos.append({"id": "u9", "nombre": "Zoe", "nombreCompleto": "Zoe Rey", "posicion": "CEO",
                "telefono": "9999", "email": "zoe@z.com", "esNo1": True, "superiorId": None,
                "invitadoPor": None, "fechaRegistro": "2026-01-15"})
ganador = normalizar_unico_no1(con_dos)
comprobar("No.1: deja UNO solo", sum(1 for u in con_dos if u["esNo1"]) == 1,
          str(sum(1 for u in con_dos if u["esNo1"])))
comprobar("No.1: se queda el MAS ANTIGUO", ganador["id"] == "u1", str(ganador["id"]))
comprobar("No.1: el nuevo queda subordinado",
          next(u for u in con_dos if u["id"] == "u9")["superiorId"] == "u1")

# ===== CRUCE DE DATOS (PUNTO 33) =====
d = buscar_duplicado(base, None, indirectos, observadores,
                     {"nombre": "Luis Paz", "puesto": "Gerente", "telefono": "", "email": ""}, ACTIVO)
comprobar("DUPLICADO: detecta por nombre + puesto", d is not None and d["registro"]["id"] == "u2", str(d))
d = buscar_duplicado(base, None, indirectos, observadores,
                     {"nombre": "Nadie", "puesto": "Jefe", "telefono": "5553", "email": ""}, ACTIVO)
comprobar("DUPLICADO: detecta por telefono", d is not None and d["registro"]["id"] == "u3", str(d))
d = buscar_duplicado(base, None, indirectos, observadores,
                     {"nombre": "Nadie", "puesto": "Jefe", "telefono": "", "email": "pedro@y.com"}, ACTIVO)
comprobar("DUPLICADO: detecta en observadores", d is not None and d["registro"]["id"] == "o1", str(d))
d = buscar_duplicado(base, None, indirectos, observadores,
                     {"nombre": "Nadie", "puesto": "Jefe", "telefono": "", "email": "marta@y.com"}, ACTIVO)
comprobar("DUPLICADO: detecta en indirectos", d is not None and d["registro"]["id"] == "c1", str(d))
d = buscar_duplicado(base, None, indirectos, observadores,
                     {"nombre": "Nueva", "puesto": "Nuevo", "telefono": "1234", "email": "n@z.com"}, ACTIVO)
comprobar("DUPLICADO: una persona nueva NO se marca", d is None, str(d))

# El organigrama personal: duplicado en un nivel profundo (nieto)
arbol_profundo = {"id": "u1", "nombre": "Ana", "telefono": "5551",
                  "hijos": [{"id": "k1", "nombre": "Hijo", "puesto": "Cargo",
                             "telefono": "6000", "email": "h@x.com", "hijos": [
                                 {"id": "k2", "nombre": "Nieto", "puesto": "Ayudante",
                                  "telefono": "6001", "email": "n2@x.com", "hijos": []}]}]}
d = buscar_duplicado(base, arbol_profundo, [], [],
                     {"nombre": "Nieto", "puesto": "Ayudante", "telefono": "", "email": "n2@x.com"}, ACTIVO)
comprobar("DUPLICADO: encuentra un contacto 2 niveles abajo", d is not None and d["registro"]["id"] == "k2", str(d))

# Otra rama: subordinado de OTRO jefe (bloquea, PUNTO 31 3.5)
otra = [{"id": "u2", "nombre": "Luis", "nombreCompleto": "Luis Paz", "posicion": "Gerente",
         "telefono": "5552", "email": "luis@x.com", "esNo1": False, "superiorId": "u9",
         "invitadoPor": "u9", "fechaRegistro": "2026-02-01"},
        {"id": "u9", "nombre": "Zoe", "nombreCompleto": "Zoe Rey", "posicion": "CEO",
         "telefono": "9999", "email": "zoe@z.com", "esNo1": True, "superiorId": None,
         "invitadoPor": None, "fechaRegistro": "2026-01-15"}]
d = buscar_duplicado(otra, None, [], [],
                     {"nombre": "Luis Paz", "puesto": "Gerente", "telefono": "5552", "email": ""}, ACTIVO)
comprobar("DUPLICADO: marca 'otraRama' si el jefe es otro",
          d is not None and d["otraRama"] and d["nombreSuperior"] == "Zoe", str(d))
d = buscar_duplicado(base, None, indirectos, observadores,
                     {"nombre": "Luis Paz", "puesto": "Gerente", "telefono": "5552", "email": ""},
                     ACTIVO, en_edicion="u2")
comprobar("DUPLICADO: al editar, uno mismo no cuenta", d is None, str(d))

# Acentos y apostrofos se respetan (solo mayusculas se ignoran)
comprobar("COMPARAR: 'Ana Ruiz' == 'ana ruiz'", normalizar_para_comparar("Ana Ruiz") == "ana ruiz")
comprobar("COMPARAR: 'Jose' != 'José'", normalizar_para_comparar("Jose") != normalizar_para_comparar("José"))
comprobar("COMPARAR: \"O'Brien\" != \"Obrien\"",
          normalizar_para_comparar("O'Brien") != normalizar_para_comparar("Obrien"))
comprobar("COMPARAR: ' Luis  Paz ' == 'luis paz'",
          normalizar_para_comparar("  Luis  Paz ") == normalizar_para_comparar("luis paz"))
comprobar("COMPARAR: un campo vacio nunca hace coincidir",
          not coincide({"nombre": "X", "puesto": "Y"}, "", "", "", "", None))

salida.append("---")
salida.append("PRUEBAS CON PROBLEMA: %d" % len(fallos))
io.open(REPORTE, 'w', encoding='utf-8').write("\n".join(salida))
print("\n".join(salida))
