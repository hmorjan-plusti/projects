const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
    text: { type: String, required: true },
    list: { type: mongoose.Schema.Types.ObjectId, ref: 'List', required: true }, // Relación con List
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Card', CardSchema);