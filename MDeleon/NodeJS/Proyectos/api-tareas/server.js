require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');



const app = express();
const PORT = process.env.PORT || 3000;


connectDB();


app.use(cors());
app.use(express.json());


app.use('/api/tareas', require('./routes/tareas'));


app.listen(PORT, () => {
    console.log(` Servidor corriendo en http://localhost:${PORT}`);
});
