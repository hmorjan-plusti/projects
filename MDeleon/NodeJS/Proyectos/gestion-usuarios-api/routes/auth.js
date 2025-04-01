// routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
require('dotenv').config();

const router = express.Router();


router.post('/register', async (req, res) => {
    try {
        const { username, nombre, email, password } = req.body;

       
        if (!username || !nombre || !email || !password) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

        
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

        // 🔹 Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

       
        user = new User({
            username,
            nombre,
            email,
            password: hashedPassword
        });

        await user.save();

        // 🔹 Crear el Token
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ msg: 'Usuario registrado con éxito', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

       
        if (!email || !password) {
            return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
        }

     
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Usuario no encontrado' });

    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Contraseña incorrecta' });

 
        const payload = { userId: user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ msg: 'Inicio de sesión exitoso', token });

    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
