const express = require('express');
const router = express.Router();
const Card = require('../models/Card');

// Crear una nueva tarjeta
router.post('/lists/:listId', async (req, res) => {
    try {
        const { text } = req.body;
        const { listId } = req.params;

        const newCard = new Card({ text, list: listId });
        await newCard.save();

        res.status(201).json(newCard);
    } catch (error) {
        console.error('Error al crear la tarjeta:', error);
        res.status(500).json({ message: 'Error al crear la tarjeta' });
    }
});

module.exports = router;