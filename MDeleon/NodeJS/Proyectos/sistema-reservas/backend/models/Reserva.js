const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  fecha: String,
  hora: String,
  lugar: String,
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Reserva', reservaSchema);
