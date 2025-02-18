import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; // Importamos helmet para la seguridad
import { movieSchema, partialMovieSchema } from './schemas/movies.js';

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

// 🔹 Configuración de Content Security Policy (CSP)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "https://deploy-api-rest.onrender.com"], // Permitir imágenes de este servidor
        scriptSrc: ["'self'"], // Solo scripts desde el propio servidor
        objectSrc: ["'none'"], // Bloquea plugins como Flash (mejor seguridad)
        upgradeInsecureRequests: [], // Fuerza el uso de HTTPS si es necesario
      },
    },
  })
);

let movies = [];
let currentId = 1;

// 🔹 Obtener todas las películas (con opción de filtrar por género)
app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.includes(genre));
    return res.json(filteredMovies);
  }
  res.json(movies);
});

// 🔹 Obtener una película por ID
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  res.json(movie);
});

// 🔹 Crear una nueva película
app.post('/movies', (req, res) => {
  try {
    const movie = movieSchema.parse(req.body);
    movie.id = currentId++;
    movies.push(movie);
    res.status(201).json(movie);
  } catch (e) {
    console.error("Validation error:", e.errors);
    res.status(400).json({ error: "Invalid movie data", details: e.errors });
  }
});

// 🔹 Actualizar una película parcialmente
app.patch('/movies/:id', (req, res) => {
  try {
    const movie = movies.find(m => m.id === parseInt(req.params.id));
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    const updatedMovie = partialMovieSchema.parse(req.body);
    Object.assign(movie, updatedMovie);
    res.json(movie);
  } catch (e) {
    res.status(400).json({ error: "Invalid update data", details: e.errors });
  }
});

// 🔹 Eliminar una película
app.delete('/movies/:id', (req, res) => {
  const index = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ message: 'Movie not found' });
  }
  movies.splice(index, 1);
  res.json({ message: 'Movie deleted successfully' });
});

// Iniciar el servidor y exportarlo para pruebas
const server = app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

export { app, server };
