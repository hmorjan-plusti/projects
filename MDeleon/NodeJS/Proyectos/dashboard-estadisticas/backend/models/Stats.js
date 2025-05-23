const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  title: String,
  value: Number,
  category: String,
  date: { type: Date, default: Date.now },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Stat', statSchema);
