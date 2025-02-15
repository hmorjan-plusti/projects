import express, { json } from 'express' // require -> commonJS
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middlewares/cors.js'
import 'dotenv/config'

// después
export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware())
  app.disable('x-powered-by')

  app.use('/movies', createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 1234

  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  })
}

// Iniciar la aplicación si este archivo es el módulo principal
if (import.meta.url === `file://${process.cwd()}/app.js`) {
  console.log('Iniciando la aplicación...')
  const movieModel = {} // Aquí deberías pasar tu modelo de película real
  createApp({ movieModel })
} else {
  console.log('El archivo no es el módulo principal.')
}