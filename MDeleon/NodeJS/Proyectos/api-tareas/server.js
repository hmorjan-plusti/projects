require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Ruta raíz para evitar "Cannot GET /"
app.get("/", (req, res) => {
    res.send("Servidor funcionando correctamente");
});

// Manejo del favicon para evitar advertencias en la consola
app.get("/favicon.ico", (req, res) => res.status(204).end());

// Rutas de la API
app.use('/api/tareas', require('./routes/tareas'));

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
