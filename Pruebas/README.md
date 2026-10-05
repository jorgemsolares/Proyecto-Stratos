# 🧪 PRUEBAS DE STRATOS

> Carpeta creada el 04/10/2026. Contiene las pruebas que usa la IA para comprobar
> que el código de Stratos está bien **sin abrir el navegador**.
> Última verificación: **58/58 pruebas en verde.**

---

## ¿Para qué sirven?

Stratos es una app de navegador (HTML + CSS + JavaScript). Estas pruebas **no
prueban la app en sí**: prueban la **lógica delicada** que la IA escribe y que un
error tipográfico rompería en silencio (cálculos, comparaciones, criptografía).

Ya FINDaron errores reales: en la biometría detectaron **dos fallos** que habrían
imposibilitado entrar con la huella en algunos equipos.

---

## Cómo correrlas

Se pueden correr desde **cualquier carpeta** (los scripts encuentran la raíz solos):

```
python Pruebas/_validar_js.py
python Pruebas/_probar_biometria.py
python Pruebas/_probar_organigrama.py
python Pruebas/_probar_marcas.py
```

Cada una imprime `[OK]` o `[FALLA]` por prueba y deja el detalle en un archivo
`resultado_*.txt` dentro de esta misma carpeta.

---

## Qué prueba cada una

| Archivo | Qué revisa | Pruebas |
|---------|-----------|---------|
| `_validar_js.py` | Que `logica.js` y `datos.js` no tengan errores de **sintaxis** | 2 archivos |
| `_probar_biometria.py` | La criptografía de la biometría (CBOR→SPKI, firma ECDSA, base64url) | 26 |
| `_probar_organigrama.py` | El árbol del Organigrama General y el cruce de duplicados (PUNTOS 31 y 33) | 22 |
| `_probar_marcas.py` | Primera entrada, última salida y tiempo del día (PUNTO 6A) | 10 |

---

## Requisitos

- **Python 3** (ya instalado en el equipo).
- **`_validar_js.py` necesita un paso extra:** `pip install esprima`.
  Sin eso NO falla: avisa que no lo encontró y hace una revisión más básica
  (equilibrio de llaves y paréntesis), que es menos precisa.
- **Las otras tres NO necesitan instalar nada.**

### Nota sobre este equipo
Este equipo **no tiene Node.js**, por eso el validador de sintaxis está escrito en
Python. Si en el futuro se instala Node, basta con usar `node --check` sobre los
`.js` y es aún más exacto.

---

## Cuando una prueba falla

1. La línea `[FALLA]` dice qué se rompió y muestra el detalle.
2. Se corrige el código de la app (en `Motor-Logica-y-Acronimos/`).
3. Se vuelve a correr la prueba.
4. Se anota el arreglo en la BITÁCORA de `instrucciones-IA/MEMORIA.md`.

**Regla:** si una prueba falla, el trabajo **no está terminado**. No se sube a
GitHub con pruebas en rojo.

---

*Los `resultado_*.txt` que se generan al correrlas NO se suben a GitHub.*