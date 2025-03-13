import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MovieController } from './controllers/movies.js'; // Asegúrate de que esta ruta sea correcta

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());

// Configurar CSP para permitir imágenes desde localhost
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'none'"],
        imgSrc: ["'self'", "http://localhost:3000"],
      },
    },
  })
);

// Servir archivos estáticos desde 'public/'
app.use(express.static(path.join(__dirname, 'public')));

// Servir favicon.ico correctamente
app.use('/favicon.ico', express.static(path.join(__dirname, 'public', 'favicon.ico')));

// Rutas para el controlador de películas
app.get('/api/movies', MovieController.getAll);
app.get('/api/movies/:id', MovieController.getById);
app.post('/api/movies', MovieController.create);
app.delete('/api/movies/:id', MovieController.delete);
app.put('/api/movies/:id', MovieController.update);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});