import io
lines = io.open('Motor-Logica-y-Acronimos/logica.js', encoding='utf-8-sig').read().splitlines()
for n in (3140, 3145, 3148, 3149, 3150, 3151, 3152, 3153, 3154):
    print(n, repr(lines[n-1][:260]))
