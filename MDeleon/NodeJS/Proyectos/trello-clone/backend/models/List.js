const mongoose = require('mongoose');

const ListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true }, // Relación con Board
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('List', ListSchema);