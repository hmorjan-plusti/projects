const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
    titulo: { type: String, required: true },
    descripcion: { type: String },
    completado: { type: Boolean, default: false },
    fechaCreacion: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tarea', TareaSchema);
