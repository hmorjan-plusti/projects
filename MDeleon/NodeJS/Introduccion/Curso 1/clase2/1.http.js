const http = require('node:http') // protocolo http
const fs = require('node:fs') // file system

const desiredPort = process.env.PORT ?? 1234

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8') // para que se muestre bien los caracteres especiales
  if (req.url === '/') {
    res.statusCode = 200
    res.end('<h1>mi pagina</h1>')
  } else if (req.url === '/imagen-super.png') {
    fs.readFile('./mario.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png')
        res.end(data)
      }
    })
  } else if (req.url === '/contacto') {
    res.statusCode = 200
    res.end('<h1>Contacto</h1>')
  } else {
    res.statusCode = 404
    res.end('<h1>404 Not Found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`server listen on port http://localhost:${desiredPort}`)
})
