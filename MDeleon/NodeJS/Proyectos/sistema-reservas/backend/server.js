require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('MongoDB conectado');
  app.listen(process.env.PORT, () => console.log('Servidor en puerto 5000'));
});
