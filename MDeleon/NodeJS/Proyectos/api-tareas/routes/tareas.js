const express = require('express');
const multer = require('multer'); // Add this line to import multer
const path = require('path');
const Tarea = require('../models/Tarea');

const router = express.Router();

// 📌 Configurar almacenamiento de archivos con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
    }
});
const upload = multer({ storage });

// 📌 Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tareas = await Tarea.find().select('-__v'); // Ocultar el campo "__v" de Mongoose
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener tareas', error });
    }
});

// 📌 Crear una nueva tarea con archivo adjunto
router.post('/', upload.single('archivo'), async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const archivo = req.file ? req.file.path : null; // Si hay archivo, guarda la ruta

        const nuevaTarea = new Tarea({ titulo, descripcion, archivo });
        await nuevaTarea.save();

        res.status(201).json(nuevaTarea);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear tarea', error });
    }
});


// 📌 Actualizar tarea (incluyendo archivo)
router.put('/:id', upload.single('archivo'), async (req, res) => {
    try {
        const { titulo, descripcion } = req.body;
        const archivo = req.file ? req.file.path : undefined; // Solo actualizar si se sube un nuevo archivo

        const tareaActualizada = await Tarea.findByIdAndUpdate(
            req.params.id,
            { titulo, descripcion, ...(archivo && { archivo }) },
            { new: true }
        );
        res.json(tareaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar tarea', error });
    }
});

// 📌 Eliminar tarea
router.delete('/:id', async (req, res) => {
    try {
        await Tarea.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tarea eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar tarea', error });
    }
});

module.exports = router;
