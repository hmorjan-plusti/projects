const { readFile } = require('node:fs/promises')
;(
  async () => {
    console.log('leyendo el primer archivo')
    const text = await readFile('./prueba.txt', 'utf-8')
    console.log('primer texto', text)

    console.log('hacer cosas mientras lee el archivo')

    console.log('leyendo el segundo archivo')
    const text2 = await readFile('./prueba2.txt', 'utf-8')
    console.log('segundo texto', text2)
  }
)()
