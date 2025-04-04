const express = require('express');
const mongoose = require('mongoose');
const socketIo = require('socket.io');
const http = require('http');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const Message = require('./models/Message'); // Importamos el modelo de Message
const app = express();

// Configuración de dotenv
dotenv.config();

// Crear el servidor HTTP
const server = http.createServer(app);

// Configuración de Socket.io con CORS
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3001', // Asegúrate de que esta URL es la de tu frontend
    methods: ['GET', 'POST'],
  },
});

// Middleware para habilitar CORSs
app.use(cors({
  origin: 'http://localhost:3001', // URL del frontend
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log('MongoDB connection error:', err));

// Almacenamos los usuarios conectados y sus socketId
let users = [];

// Configuración de eventos de Socket.io
io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Manejo de desconexión de cliente
  socket.on('disconnect', () => {
    console.log('Client disconnected');
    // Eliminar usuario de la lista de usuarios cuando se desconecte
    users = users.filter(u => u.socketId !== socket.id);
  });

  // Manejo de la unión al chat
  socket.on('joinChat', (user) => {
    users.push({ username: user, socketId: socket.id });
    console.log(`${user} has joined the chat.`);
  });

  // Manejo de envío de mensajes privados
  socket.on('sendPrivateMessage', async (message, recipientUsername) => {
    const sender = users.find(u => u.socketId === socket.id);
    if (sender) {
      // Guardar el mensaje en la base de datos
      const newMessage = new Message({
        username: sender.username,
        message: message,
      });

      try {
        await newMessage.save();
        console.log('Message saved to DB');

        // Enviar el mensaje al destinatario específico
        const recipient = users.find(u => u.username === recipientUsername);
        if (recipient) {
          io.to(recipient.socketId).emit('receivePrivateMessage', {
            username: sender.username,
            message,
          });
        }
      } catch (error) {
        console.error('Error saving message:', error);
      }
    }
  });
});

// Iniciar el servidor en el puerto 3000
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
