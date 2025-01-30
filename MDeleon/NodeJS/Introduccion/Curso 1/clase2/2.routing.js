// filepath: /c:/Users/Marco Tulio/Documents/Github/projects/MDeleon/NodeJS/Introduccion/Curso 1/clase2/2.routing.js
const http = require('node:http')
const fs = require('node:fs')
const path = require('node:path')

// Cargar el archivo ditto.json
const dittoJSON = JSON.parse(fs.readFileSync(path.join(__dirname, 'pokemon', 'ditto.json'), 'utf-8'))

const server = http.createServer((req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(dittoJSON))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }

    case 'POST':
      switch (url) {
        case '/pokemon': {
          let body = ''
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })
          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404 Not Found</h1>')
      }
      break

    default:
      res.statusCode = 405
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      return res.end('<h1>405 Method Not Allowed</h1>')
  }
})

const desiredPort = process.env.PORT ?? 1234
server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
