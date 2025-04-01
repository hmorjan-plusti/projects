
const express = require('express');
const verifyToken = require('../middlewares/verifyToken'); 
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');


router.get('/', verifyToken, async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});


router.get('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);  
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});


router.put('/:id', verifyToken, async (req, res) => {
    try {
        const { username, nombre, email, password } = req.body;
       
        let updatedFields = { username, nombre, email };
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updatedFields.password = await bcrypt.hash(password, salt);
        }

        const user = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

        res.json({ msg: 'Usuario actualizado', user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});


router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' });
        res.json({ msg: 'Usuario eliminado' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error en el servidor' });
    }
});

module.exports = router;
