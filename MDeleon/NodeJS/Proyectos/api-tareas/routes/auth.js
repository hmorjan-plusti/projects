const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const router = express.Router();

router.post('/register', async (req, res) => {
    const { nombre, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = new Usuario({ nombre, email, password: hashedPassword });
    await nuevoUsuario.save();
    res.json({ message: 'Usuario registrado' });
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario || !(await bcrypt.compare(password, usuario.password))) {
        return res.status(401).json({ message: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
});

module.exports = router;

