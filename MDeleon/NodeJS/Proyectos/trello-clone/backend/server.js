const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config(); // Cargar variables de entorno

// Importar rutas
const authRoutes = require('./routes/auth');
const boardRoutes = require('./routes/Board'); // Cambiado a Board.js
const listRoutes = require('./routes/List');   // Nueva ruta para List.js
const cardRoutes = require('./routes/Card');   // Nueva ruta para Card.js

const app = express();

// Middlewares
app.use(express.json()); // Para manejar JSON en requests
app.use(cors()); // Habilitar CORS

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB conectado'))
  .catch(err => {
      console.error('❌ Error en MongoDB:', err);
      process.exit(1); // Terminar el servidor si la conexión falla
  });

// Rutas principales
app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes); // Ruta para Boards
app.use('/api/lists', listRoutes);   // Ruta para Lists
app.use('/api/cards', cardRoutes);   // Ruta para Cards

// Ruta de prueba
app.get('/', (req, res) => res.send('API funcionando 🚀'));

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

