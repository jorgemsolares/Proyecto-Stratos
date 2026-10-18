import io
p = 'Motor-Logica-y-Acronimos/logica.js'
lines = io.open(p, encoding='utf-8-sig').read().splitlines()
for n in (212, 221, 235, 247, 476, 1345, 1355, 3200, 3704):
    print(n, repr(lines[n-1][:220]))
    open('_diag.txt', 'a', encoding='utf-8').write(str(n) + ' :: ' + repr(lines[n-1][:220]) + '\n')
print('diag ok')
