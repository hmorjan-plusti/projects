// server.js
const express = require('express');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();


connectDB();


app.use(express.json());

// 🔹 Rutas
app.use('/api/auth', authRoutes);  
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Bienvenido a la API de Gestión de Usuarios con JWT');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Servidor en http://localhost:${PORT}`));
