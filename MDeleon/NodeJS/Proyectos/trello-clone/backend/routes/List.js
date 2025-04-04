const express = require('express');
const router = express.Router();
const List = require('../models/List');

// Crear una nueva lista
router.post('/:boardId', async (req, res) => {
    try {
        const { title } = req.body;
        const { boardId } = req.params;

        const newList = new List({ title, board: boardId });
        await newList.save();

        res.status(201).json(newList);
    } catch (error) {
        console.error('Error al crear la lista:', error);
        res.status(500).json({ message: 'Error al crear la lista' });
    }
});

module.exports = router;