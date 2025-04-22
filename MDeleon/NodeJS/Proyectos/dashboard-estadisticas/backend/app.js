const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/stats', require('./routes/statsRoutes'));

module.exports = app;
