# Validador de sintaxis para los archivos JS del proyecto (no hay Node en el equipo).
# 1) intenta usar esprima si está instalado  2) si no, revisión de equilibrio de
# llaves/paréntesis/corchetes ignorando comentarios y cadenas.
import io, os, sys

# Ruta de la raiz del proyecto (un nivel arriba de esta carpeta), para que estas
# pruebas se puedan correr desde CUALQUIER carpeta, no solo desde la raiz.
RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CARPETA_MOTOR = os.path.join(RAIZ, 'Motor-Logica-y-Acronimos')

# Ademas de mostrar por pantalla, deja el resultado en un archivo (util cuando la
# terminal no deja leer la salida).
REPORTE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'resultado_validar_js.txt')
lineas = []
def _imprimir(texto):
    print(texto)
    lineas.append(texto)

def balance(ruta):
    src = io.open(ruta, encoding='utf-8-sig').read()
    pares = {'{': '}', '(': ')', '[': ']'}
    cierre = {'}': '{', ')': '(', ']': '['}
    pila = []
    i, n = 0, len(src)
    linea = 1
    ultimo_significativo = ''
    while i < n:
        c = src[i]
        if c == '\n':
            linea += 1; i += 1; continue
        # comentarios
        if c == '/' and i + 1 < n:
            if src[i+1] == '/':
                while i < n and src[i] != '\n':
                    i += 1
                continue
            if src[i+1] == '*':
                i += 2
                while i + 1 < n and not (src[i] == '*' and src[i+1] == '/'):
                    if src[i] == '\n':
                        linea += 1
                    i += 1
                i += 2
                continue
            # expresión regular?
            if ultimo_significativo in ('', '(', ',', '=', ':', '[', '!', '&', '|', '?', '{', '}', ';', '+', '-', '*', '%', '<', '>', '~', '^', 'return'):
                i += 1
                while i < n and src[i] != '/':
                    if src[i] == '\\':
                        i += 2; continue
                    if src[i] == '\n':
                        linea += 1
                    i += 1
                i += 1
                while i < n and src[i].isalpha():
                    i += 1
                ultimo_significativo = 'x'
                continue
        # cadenas
        if c in ('"', "'", '`'):
            comilla = c
            i += 1
            while i < n:
                if src[i] == '\\':
                    i += 2; continue
                if src[i] == comilla:
                    break
                if src[i] == '\n':
                    linea += 1
                    if comilla != '`':
                        return "cadena sin cerrar en la linea %d" % linea
                i += 1
            i += 1
            ultimo_significativo = 'x'
            continue
        if c in pares:
            pila.append((c, linea))
        elif c in cierre:
            if not pila:
                return "cierre '%s' sobrante en la linea %d" % (c, linea)
            abierto, l_origen = pila.pop()
            if pares[abierto] != c:
                return "'%s' (linea %d) no cierra con '%s' de la linea %d" % (abierto, l_origen, c, linea)
        if not c.isspace():
            ultimo_significativo = c
        i += 1
    if pila:
        abierto, l_origen = pila[-1]
        return "queda abierto '%s' de la linea %d" % (abierto, l_origen)
    return None

try:
    import esprima
    import re
    modo = 'esprima (parser real)'
except ImportError:
    esprima = None
    modo = 'equilibrio de delimitadores (esprima no instalado)'

# esprima entiende hasta ES2017: el proyecto usa encadenamiento opcional (ES2020)
# y logique nulle (??). Se neutralizan solo para la comprobacion, sin tocar el archivo.
def normalizar(texto):
    texto = re.sub(r'\?\.\[', '[', texto)   # arr?.[0] -> arr[0]
    texto = re.sub(r'\?\.', '.', texto)      # obj?.prop  -> obj.prop
    texto = re.sub(r'\?\?', '||', texto)     # a ?? b     -> a || b
    return texto

fallos = 0
# Si no le pasan archivos, revisa por su cuenta los dos del motor de la app.
if len(sys.argv) < 2:
    sys.argv = [
        os.path.join(CARPETA_MOTOR, 'logica.js'),
        os.path.join(CARPETA_MOTOR, 'datos.js')
    ]
for ruta in sys.argv[1:]:
    if esprima:
        try:
            esprima.parseScript(normalizar(io.open(ruta, encoding='utf-8-sig').read()))
            _imprimir("[OK]   %s  (analisis sintactico real)" % ruta)
        except Exception as e:
            fallos += 1
            _imprimir("[FALLA] %s -> %s" % (ruta, e))
    else:
        problema = balance(ruta)
        if problema:
            fallos += 1
            _imprimir("[FALLA] %s -> %s" % (ruta, problema))
        else:
            _imprimir("[OK]   %s  (delimitadores balanceados)" % ruta)

_imprimir("---")
_imprimir("metodo: %s" % modo)
_imprimir("archivos con problema: %d" % fallos)
io.open(REPORTE, 'w', encoding='utf-8').write("\n".join(lineas))
