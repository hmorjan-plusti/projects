const fs = require('node:fs')

// lee el directorio actual
fs.readdir('.', (err, files) => {
  if (err) {
    console.error('Error leyendo el directorio:', err)
    return
  }

  files.forEach(file => {
    console.log(files)
  })
})
