const express = require("express");
const router = express.Router();
const Tarea = require("../models/Tarea");

// Obtener todas las tareas
app.get("/tareas", async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener tareas", error });
    }
});

// Crear nueva tarea
router.post("/tareas", async (req, res) => {
    const nuevaTarea = new Tarea(req.body);
    await nuevaTarea.save();
    res.json(nuevaTarea);
});

// Actualizar tarea
router.put("/:id", async (req, res) => {
    const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tareaActualizada);
});

// Eliminar tarea
router.delete("/:id", async (req, res) => {
    await Tarea.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Tarea eliminada" });
});

module.exports = router;
