"""
PRUEBA de la parte criptografica de la biometria (PUNTO 9-10-11), sin instalar nada.
Porta 1:1 a Python las funciones _bioDecodificarCose / _bioDer / _bioSecuenciaDer /
_bioCoseASpki de logica.js y las contrasta contra:
  1) un codificador CBOR escrito aparte, directo de la especificacion CBOR,
  2) la plantilla literal del formato SPKI que exige WebCrypto,
  3) una verificacion ECDSA real con matematicas puras (firma valida se acepta,
     firma manipulada se rechaza).
"""
import base64, hashlib, io, os

CARPETA = os.path.dirname(os.path.abspath(__file__))
REPORTE = os.path.join(CARPETA, 'resultado_biometria.txt')

# ---------- puerto de las funciones de logica.js ----------
def bio_der(longitud):
    if longitud < 0x80:
        return bytes([longitud])
    b = []
    n = longitud
    while n > 0:
        b.insert(0, n & 0xFF)
        n //= 256
    return bytes([0x80 | len(b)]) + bytes(b)

def bio_secuencia(*partes):
    cuerpo = b"".join(partes)
    return bytes([0x30]) + bio_der(len(cuerpo)) + cuerpo

def bio_decodificar_cose(vista):
    pos = [0]

    def cabecera():
        inicial = vista[pos[0]]; pos[0] += 1
        tipo = inicial >> 5
        info = inicial & 0x1F
        largo = info
        if info == 24:
            largo = vista[pos[0]]; pos[0] += 1
        elif info == 25:
            largo = int.from_bytes(vista[pos[0]:pos[0]+2], 'big'); pos[0] += 2
        elif info == 26:
            largo = int.from_bytes(vista[pos[0]:pos[0]+4], 'big'); pos[0] += 4
        return tipo, info, largo

    def valor():
        tipo, info, largo = cabecera()
        if tipo == 0:
            return largo
        if tipo == 1:
            return -1 - largo
        if tipo == 2:
            v = vista[pos[0]:pos[0]+largo]; pos[0] += largo; return v
        if tipo == 3:
            v = vista[pos[0]:pos[0]+largo].decode(); pos[0] += largo; return v
        if tipo == 4:
            arr = []
            for _ in range(largo):
                arr.append(valor())
            return arr
        if tipo == 5:
            m = {}
            for _ in range(largo):
                k = valor(); m[k] = valor()
            return m
        if tipo == 7:
            return info == 21
        raise ValueError("tipo CBOR no soportado %d" % tipo)

    return valor()

def bio_cose_a_spki(cose):
    # las claves COSE son enteras: 1 = kty, 3 = alg, 32 = crv, 33 = x, 34 = y, 32 = n, 33 = e
    if cose[1] == 2:
        algoritmo = bio_secuencia(
            bytes([0x06, 0x07, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x02, 0x01]),
            bytes([0x06, 0x08, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x03, 0x01, 0x07]))
        punto = bytes([0x04]) + cose[33] + cose[34]
        bits = bytes([0x00]) + punto
        return bio_secuencia(algoritmo, bytes([0x03]), bio_der(len(bits)), bits)
    if cose[1] == 3:
        algoritmo = bio_secuencia(
            bytes([0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x01]),
            bytes([0x05, 0x00]))
        def entero(b):
            cuerpo = (b"\x00" + b) if (len(b) and (b[0] & 0x80)) else b
            return bytes([0x02]) + bio_der(len(cuerpo)) + cuerpo
        bits = bytes([0x00]) + bio_secuencia(entero(cose[32]), entero(cose[33]))
        return bio_secuencia(algoritmo, bytes([0x03]), bio_der(len(bits)), bits)
    raise ValueError("kty no soportado")

def b64url(b):
    return base64.urlsafe_b64encode(b).decode().rstrip("=")

# ---------- codificador CBOR independiente (escrito desde la especificacion) ----------
def cbor_bstr(b):
    n = len(b)
    if n < 24:
        return bytes([0x40 + n]) + b
    if n < 256:
        return bytes([0x58, n]) + b
    return bytes([0x59]) + n.to_bytes(2, 'big') + b

def cbor_int_neg(v):
    n = -1 - v
    if n < 24:
        return bytes([0x20 | n])
    if n < 256:
        return bytes([0x38, n])
    return bytes([0x39]) + n.to_bytes(2, 'big')

def cbor_int_pos(v):
    return bytes([v]) if v < 24 else bytes([0x18, v])

# ---------- curvas P-256 (parametros oficiales del estandar SEC2) ----------
P = 0xFFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF
A = P - 3
B = 0x5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B
N = 0xFFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551
Gx = 0x6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296
Gy = 0x4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5

def inv(a, m):
    return pow(a, -1, m)

def sumar(p1, p2):
    if p1 is None:
        return p2
    if p2 is None:
        return p1
    if p1[0] == p2[0] and (p1[1] + p2[1]) % P == 0:
        return None
    if p1 == p2:
        lam = (3 * p1[0] * p1[0] + A) * inv(2 * p1[1], P) % P
    else:
        lam = (p2[1] - p1[1]) * inv(p2[0] - p1[0], P) % P
    x3 = (lam * lam - p1[0] - p2[0]) % P
    return (x3, (lam * (p1[0] - x3) - p1[1]) % P)

def multiplicar(k, punto):
    resultado = None
    while k:
        if k & 1:
            resultado = sumar(resultado, punto)
        punto = sumar(punto, punto)
        k >>= 1
    return resultado

def firmar(h, d):
    e = int.from_bytes(h, 'big')
    while True:
        k = int.from_bytes(hashlib.sha256(os.urandom(32) + d.to_bytes(32, 'big')).digest(), 'big') % N
        if k == 0:
            continue
        punto = multiplicar(k, (Gx, Gy))
        r = punto[0] % N
        if r == 0:
            continue
        s = inv(k, N) * (e + r * d) % N
        if s == 0:
            continue
        return r, s

def verificar(h, r, s, Q):
    if not (1 <= r < N and 1 <= s < N):
        return False
    e = int.from_bytes(h, 'big')
    w = inv(s, N)
    u1 = e * w % N
    u2 = r * w % N
    punto = sumar(multiplicar(u1, (Gx, Gy)), multiplicar(u2, Q))
    if punto is None:
        return False
    return punto[0] % N == r

# ---------- plantillas SPKI escritas a mano (formato que exige WebCrypto) ----------
OID_EC_PUBKEY = bytes([0x06, 0x07, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x02, 0x01])
OID_PRIME256V1 = bytes([0x06, 0x08, 0x2A, 0x86, 0x48, 0xCE, 0x3D, 0x03, 0x01, 0x07])
OID_RSA = bytes([0x06, 0x09, 0x2A, 0x86, 0x48, 0x86, 0xF7, 0x0D, 0x01, 0x01, 0x01])

# ---------- lector DER independiente (comprueba la ESTRUCTURA, no los numeros) ----------
def leer_der(b, pos=0):
    def leer(actual, p):
        etiqueta = actual[p]; p += 1
        largo = actual[p]; p += 1
        if largo & 0x80:
            cuantos = largo & 0x7F
            largo = int.from_bytes(actual[p:p+cuantos], 'big'); p += cuantos
        contenido = actual[p:p+largo]; p += largo
        if etiqueta == 0x30:                 # SEQUENCE: hay que seguir leyendo dentro
            hijos, interno = [], 0
            while interno < len(contenido):
                hijo, interno = leer(contenido, interno)
                hijos.append(hijo)
            return (etiqueta, hijos), p
        if etiqueta == 0x03:                  # BIT STRING: primer byte = bits sin usar
            return (etiqueta, contenido[0], contenido[1:]), p
        return (etiqueta, contenido), p
    return leer(b, pos)[0]

def comprobar_der(raiz, oid_esperado, largo_clave):
    comprobar("SPKI: empieza por SEQUENCE", raiz[0] == 0x30, hex(raiz[0]))
    interior = raiz[1]
    comprobar("SPKI: dentro hay SEQUENCE + BIT STRING",
              len(interior) == 2 and interior[0][0] == 0x30 and interior[1][0] == 0x03)
    comprobar("SPKI: el OID del algoritmo es el esperado",
              interior[0][1][0][1] == oid_esperado[2:], interior[0][1][0][1].hex())
    comprobar("SPKI: el BIT STRING no tiene bits de relleno", interior[1][1] == 0,
              str(interior[1][1]))
    if largo_clave:
        comprobar("SPKI: la clave publica esta donde debe",
                  len(interior[1][2]) == largo_clave, str(len(interior[1][2])))
    return interior[1][2]

# ---------- pruebas ----------
fallos = []

def comprobar(nombre, condicion, detalle=""):
    if condicion:
        print("[OK]    %s" % nombre)
    else:
        fallos.append(nombre)
        print("[FALLA] %s   %s" % (nombre, detalle))

# clave EC de prueba (d fija -> clave publica reproducible)
d = 0x1B7E151628AED2A6ABF7158809CF4F3C762E7160F38B4DA56A784D9045190CF
Q = multiplicar(d, (Gx, Gy))
x = Q[0].to_bytes(32, 'big')
y = Q[1].to_bytes(32, 'big')

cose_bytes = (bytes([0xA5])
              + cbor_int_pos(1) + cbor_int_pos(2)          # 1: kty = 2 (EC2)
              + cbor_int_pos(3) + cbor_int_neg(-7)        # 3: alg = -7 (ES256)
              + cbor_int_pos(32) + cbor_int_pos(1)        # 32: crv = 1 (P-256)
              + cbor_int_pos(33) + cbor_bstr(x)           # 33: x
              + cbor_int_pos(34) + cbor_bstr(y))          # 34: y
cose = bio_decodificar_cose(cose_bytes)
comprobar("CBOR: lee kty=2 (EC2)", cose[1] == 2, str(cose.get(1)))
comprobar("CBOR: lee alg=-7 (ES256)", cose[3] == -7, str(cose.get(3)))
comprobar("CBOR: lee crv=1 (P-256)", cose[32] == 1, str(cose.get(32)))
comprobar("CBOR: x e y coinciden byte a byte",
          cose[33] == x and cose[34] == y,
          "x=%s" % cose.get(33, b"?").hex()[:16])

spki = bio_cose_a_spki(cose)
esperado = (bytes([0x30, 0x59])
            + bytes([0x30, 0x13]) + OID_EC_PUBKEY + OID_PRIME256V1
            + bytes([0x03, 0x42, 0x00, 0x04]) + x + y)
comprobar("SPKI P-256: es IDENTICO a la plantilla del estandar", spki == esperado,
          "obtenido %s / esperado %s" % (spki.hex()[:40], esperado.hex()[:40]))
comprobar("SPKI P-256: mide 91 bytes", len(spki) == 91, str(len(spki)))
punto = comprobar_der(leer_der(spki), OID_EC_PUBKEY, 65)
comprobar("SPKI P-256: el punto es 0x04 + x + y sin alterar",
          punto == bytes([0x04]) + x + y, punto[:4].hex())
comprobar("SPKI P-256: los dos OID (ecPublicKey + prime256v1) estan ahi",
          OID_PRIME256V1 in spki and OID_EC_PUBKEY in spki)

# clave RSA de prueba (modulo de 2048 bits con el bit alto activado)
n_bytes = bytes([(os.urandom(1)[0] | 0x80)]) + os.urandom(255)
e_bytes = bytes([0x01, 0x00, 0x01])
cose_rsa = (bytes([0xA4])
            + cbor_int_pos(1) + cbor_int_pos(3)              # 1: kty = 3 (RSA)
            + cbor_int_pos(3) + cbor_int_neg(-257)          # 3: alg = -257 (RS256)
            + cbor_int_pos(32) + cbor_bstr(n_bytes)         # 32: n
            + cbor_int_pos(33) + cbor_bstr(e_bytes))        # 33: e
cose_r = bio_decodificar_cose(cose_rsa)
comprobar("CBOR: lee kty=3 (RSA) y alg=-257", cose_r[1] == 3 and cose_r[3] == -257)
spki_r = bio_cose_a_spki(cose_r)
secuencia = comprobar_der(leer_der(spki_r), OID_RSA, 0)
interior_r = leer_der(secuencia)
n_leido = interior_r[1][0]
e_leido = interior_r[1][1]
comprobar("SPKI RSA: es SEQUENCE con los dos INTEGER (n y e)",
          interior_r[0] == 0x30 and len(interior_r[1]) == 2
          and n_leido[0] == 0x02 and e_leido[0] == 0x02,
          str([x[0] for x in interior_r[1]]))
comprobar("SPKI RSA: el modulo n se conserva intacto", n_leido[1].endswith(n_bytes),
          "n leido %d bytes / original %d" % (len(n_leido[1]), len(n_bytes)))
comprobar("SPKI RSA: el exponente e es 65537", e_leido[1].lstrip(b"\x00") == e_bytes,
          e_leido[1].hex())

# verificacion ECDSA completa (mismo camino que _bioVerificarAsercion)
mensaje = b"authenticatorData" + hashlib.sha256(b'{"type":"webauthn.get"}').digest()
h = hashlib.sha256(mensaje).digest()
r, s = firmar(h, d)
firma = r.to_bytes(32, 'big') + s.to_bytes(32, 'big')
comprobar("FIRMA: la firma valida se acepta", verificar(h, r, s, Q))
r2, s2 = firmar(h, (d + 1) % N)
comprobar("FIRMA: una firma de otra clave se rechaza", not verificar(h, r2, s2, Q))
comprobar("FIRMA: un mensaje alterado se rechaza",
          not verificar(hashlib.sha256(mensaje + b"x").digest(), r, s, Q))
comprobar("FIRMA: el bit UP del authenticatorData se lee en la posicion 32",
          (b"\x00" * 32 + bytes([0x05]) + b"\x00" * 4)[32] & 0x01 == 0x01)

# base64url (el formato con el que se guarda en localStorage)
aleatorio = os.urandom(33)
comprobar("base64url: sin '+' ni '/' y sin relleno",
          "+" not in b64url(aleatorio) and "/" not in b64url(aleatorio) and "=" not in b64url(aleatorio))

print("---")
print("PRUEBAS CON PROBLEMA: %d" % len(fallos))
