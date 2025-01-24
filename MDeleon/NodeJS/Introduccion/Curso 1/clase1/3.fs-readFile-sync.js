const fs = require('node:fs')// readFileSync es una función sincrona

console.log('leyendo el primer archivo')
const text = fs.readFileSync('./prueba.txt', 'utf-8')

console.log(text)

console.log('hacer cosas mientras lee el archivo')

console.log('leyendo el segundo archivo')
const text2 = fs.readFileSync('./prueba2.txt', 'utf-8')

console.log(text2)
