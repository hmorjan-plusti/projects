import express from 'express';
import logger from 'morgan';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import { Server } from 'socket.io';
import { createServer } from 'node:http';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const port = process.env.PORT ?? 3000;

const app = express();
const server = createServer(app);
const io = new Server(server, {
  connectionStateRecovery: {},
});

// Obtén la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conectar a MySQL en Railway
let db;
const connectDB = async () => {
  try {
    db = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log('✅ Conectado a Railway MySQL');

    await db.execute(`
      CREATE TABLE IF NOT EXISTS messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT NOT NULL,
        user VARCHAR(255) NOT NULL,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } catch (error) {
    console.error('❌ Error conectando a MySQL:', error);
    process.exit(1);
  }
};

connectDB().then(() => {
  // Manejo de conexiones de Socket.io
  io.on('connection', async (socket) => {
    console.log('🔵 Un usuario se ha conectado');

    socket.on('disconnect', () => {
      console.log('🔴 Un usuario se ha desconectado');
    });

    socket.on('chat message', async (msg) => {
      const username = socket.handshake.auth.username ?? 'anonymous';
      console.log({ username });
      try {
        const [result] = await db.execute(
          'INSERT INTO messages (content, user) VALUES (?, ?)',
          [msg, username]
        );
        io.emit('chat message', msg, result.insertId, username);
      } catch (error) {
        console.error('❌ Error guardando mensaje:', error);
      }
    });

    try {
      const [results] = await db.execute(
        'SELECT id, content, user FROM messages WHERE id > ?',
        [socket.handshake.auth.serverOffset ?? 0]
      );

      results.forEach((row) => {
        socket.emit('chat message', row.content, row.id, row.user);
      });
    } catch (error) {
      console.error('❌ Error recuperando mensajes:', error);
    }
  });

  // Middlewares
  app.use(logger('dev'));

  // Ruta principal
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });

  // Iniciar servidor
  server.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
});