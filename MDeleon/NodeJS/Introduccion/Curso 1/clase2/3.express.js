const express = require('express') // Importa el modulo express
const ditto = require('./pokemon/ditto.json') // Importa el modulo ditto

const PORT = process.env.PORT ?? 1234

const app = express()
app.disable('x-powered-by')

app.use(express.json())
// app.use(function (req, res, next) {
//   // si la method de la req es diferente a POST ir a la siguiente funcion
//   if (req.method !== 'POST') return next()
//   if (req.headers['content-type'] !== 'application/json') return next()

//   let body = ''
//   req.on('data', chunk => {
//     body += chunk.toString()
//   })
//   req.on('end', () => {
//     const data = JSON.parse(body)
//     data.timestamp = Date.now()
//     // mutar la request y meter la infromacion en el req.body
//     req.body = data
//     next()
//   })
// })

app.get('/pokemon/ditto', (req, res) => {
  res.json(ditto) // Responde con el json de ditto
})

app.post('/pokemon', (req, res) => {
  // req.body deberiamos guardar en la base de datos
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.status(404).send('<hi>404</hi>')
})

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`)
})
