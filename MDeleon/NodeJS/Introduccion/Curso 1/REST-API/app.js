import express from 'express';
import cors from 'cors';
import { movieSchema, partialMovieSchema } from './schemas/movies.js';

const app = express();
const port = process.env.PORT || 1234;

app.use(cors());
app.use(express.json());

let movies = [];
let currentId = 1;

app.get('/movies', (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter(movie => movie.genre.includes(genre));
    res.json(filteredMovies);
  } else {
    res.json(movies);
  }
});

app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ message: 'Movie not found' });
  }
});

app.post('/movies', (req, res) => {
  try {
    const movie = movieSchema.parse(req.body);
    movie.id = currentId++;
    movies.push(movie);
    res.status(201).json(movie);
  } catch (e) {
    console.error("Validation error:", e.errors); // Mostrar error en la consola
    res.status(400).json({ error: "Invalid movie data", details: e.errors });
  }
});

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

// Inicia el servidor y lo exporta para cerrarlo en las pruebas
const server = app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export { app, server };
