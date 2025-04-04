const express = require('express');
const router = express.Router();
const Board = require('../models/Board');

// Crear un Board
router.post('/', async (req, res) => {
    try {
        const { title, description, backgroundColor } = req.body;
        const board = new Board({ title, description, backgroundColor });
        await board.save();
        res.status(201).json(board);
    } catch (error) {
        console.error("Error en /api/boards:", error);
        res.status(500).json({ message: 'Error al crear el Board', error });
    }
});

// Obtener todos los Boards
router.get('/', async (req, res) => {
    try {
        const boards = await Board.find();
        res.json(boards);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los Boards', error });
    }
});

module.exports = router;