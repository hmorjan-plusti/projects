const mongoose = require('mongoose');

// Esquema del mensaje
const messageSchema = new mongoose.Schema({
  username: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Crear el modelo de Message
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
