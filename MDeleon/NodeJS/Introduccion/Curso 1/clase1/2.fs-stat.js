const fs = require('node:fs')

const stats = fs.statSync('./prueba.txt')
console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size,
  stats.atime,
  stats.mtime,
  stats.ctime,
  stats.birthtime
)
