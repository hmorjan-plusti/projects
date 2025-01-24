const http = require('node:http') // prtocolo http

const desiredPort = process.env.PORT ?? 1234

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hola mundo')
})

server.listen(desiredPort, () => {
  console.log(`server listen on port http://localhost:${desiredPort}`)
})
