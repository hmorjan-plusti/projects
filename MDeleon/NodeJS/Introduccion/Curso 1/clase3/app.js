const express = require('express') // Importamos express
const movies = require('./movies.json') // Importamos el archivo movies.json

const app = express() // Creamos una instancia de express
app.use(express.json()) // Middleware para parsear el cuerpo de las peticiones a JSOn
app.disable('x-powered-by') // Deshabilitamos la cabecera X-Powered-By

// todos los recuersos que sean Movies se identifican con /movies

app.get('/movies', (req, res) => { // Definimos una ruta para el método GET
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === parseInt(id))
  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const { title, director, year, genre } = req.body
  const id = movies[movies.length - 1].id + 1
  const newMovie = { id, title, director, year, genre }
  movies.push(newMovie)
  res.status(201).json(newMovie)
})

const POST = 1234 // Definimos el puerto en el que escuchará el servidor
app.listen(POST, () => { // Iniciamos el servidor
  console.log(`Servidor escuchando en el puerto http://localhost:${POST}`) // Mostramos un mensaje en la consola
})
