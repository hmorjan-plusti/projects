import express from 'express';
import cors from 'cors';
import { randomUUID } from 'crypto';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { validateMovie, validatePartialMovie } from './schemas/movies.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const movies = JSON.parse(fs.readFileSync(join(__dirname, 'movies.json'), 'utf8'));

const app = express();

app.use(cors());
app.use(express.json());
app.disable('x-powered-by');

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'web', 'index.html'));
});

app.post('/movies', (req, res) => {
  try {
    const result = validateMovie(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    const newMovie = { id: randomUUID(), ...result.data };
    movies.push(newMovie);
    writeFileSync(join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2));
    res.status(201).json(newMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.patch('/movies/:id', (req, res) => {
  try {
    const result = validatePartialMovie(req.body);
    if (!result.success) {
      return res.status(400).json(result.error);
    }
    const index = movies.findIndex(movie => movie.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    movies[index] = { ...movies[index], ...result.data };
    writeFileSync(join(__dirname, 'movies.json'), JSON.stringify(movies, null, 2));
    res.json(movies[index]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 1234;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;