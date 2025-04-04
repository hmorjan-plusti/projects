const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }, // Nueva característica
    createdAt: { type: Date, default: Date.now }, // Fecha de creación
    backgroundColor: { type: String, default: '#ffffff' }, // Color de fondo
});

module.exports = mongoose.model('Board', BoardSchema);