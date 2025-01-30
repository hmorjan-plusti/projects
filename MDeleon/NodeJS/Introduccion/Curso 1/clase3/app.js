const express = require('express') // Importamos express
const crypto = require('node:crypto') // Para generar IDs únicos
const fs = require('node:fs') // Para trabajar con el sistema de archivos
const path = require('node:path') // Para resolver rutas de archivos
const movies = require('./movies.json') // Importamos el archivo movies.json
const { movieSchema } = require('./schemas/movies') // Importamos el esquema de la película
const { z } = require('zod') // Importamos Zod correctamente
const cors = require('cors') // Importamos el middleware cors
const app = express() // Creamos una instancia de express

app.use(cors()) // Middleware para permitir CORS desde cualquier origen
app.use(express.json()) // Middleware para parsear el cuerpo de las peticiones a JSON
app.disable('x-powered-by') // Deshabilitamos la cabecera X-Powered-By por seguridad

// Esquema parcial para actualizaciones (usa .extend() para hacerlo opcional)
const partialMovieSchema = movieSchema.extend({
  title: z.string().optional(),
  director: z.string().optional(),
  year: z.number().optional(),
  genre: z.array(z.string()).optional(),
  duration: z.string().optional(),
  poster: z.string().url().optional(),
  rate: z.number().optional()
})

// Ruta para servir el archivo HTML en la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'web', 'index.html'))
})

// Ruta para obtener todas las películas o filtrar por género
app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )

    if (filteredMovies.length === 0) {
      return res.status(404).json({ message: `No movies found for genre: ${genre}` })
    }

    return res.json(filteredMovies)
  }

  res.json(movies)
})

// Ruta para obtener una película por ID
app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id) // IDs como cadenas

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

// Ruta para crear una nueva película
app.post('/movies', (req, res) => {
  try {
    console.log('Received body:', req.body) // Log para verificar el cuerpo recibido

    const newMovie = movieSchema.parse(req.body)
    newMovie.id = crypto.randomUUID() // Generar ID único

    movies.push(newMovie)

    // Guardar la nueva lista de películas
    fs.writeFileSync(path.join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2), 'utf-8')

    res.status(201).json(newMovie)
  } catch (error) {
    console.error('Validation error:', error.errors)
    res.status(400).json({
      errors: error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message
      }))
    })
  }
})

// Ruta para actualizar parcialmente una película
app.patch('/movies/:id', (req, res) => {
  try {
    const validatedData = partialMovieSchema.parse(req.body) // Validar solo campos enviados
    const { id } = req.params

    const movieIndex = movies.findIndex((movie) => movie.id === id) // IDs como cadenas

    if (movieIndex === -1) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    // Actualizar la película
    const updatedMovie = {
      ...movies[movieIndex],
      ...validatedData
    }

    movies[movieIndex] = updatedMovie

    // Guardar los cambios en movies.json
    fs.writeFileSync(path.join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2), 'utf-8')

    return res.json(updatedMovie)
  } catch (error) {
    console.error('Validation error:', error.errors)
    res.status(400).json({
      errors: error.errors.map((e) => ({
        path: e.path.join('.'),
        message: e.message
      }))
    })
  }
})

// Ruta para eliminar una película por ID
app.delete('/movies/:id', (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex((movie) => movie.id === id) // IDs como cadenas

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1) // Eliminar la película del array

  // Guardar los cambios en movies.json
  fs.writeFileSync(path.join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2), 'utf-8')

  res.json({ success: true })
})

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Iniciar el servidor
const PORT = 1234
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`)
})
