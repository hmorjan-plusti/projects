const express = require("express");
const mongoose = require("mongoose");
const Tarea = require("./models/Tarea"); // Importar modelo
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/tareasdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("Conectado a MongoDB"))
.catch(err => console.error("Error al conectar:", err));

// Obtener todas las tareas
app.get("/api/tareas", async (req, res) => {
    try {
        const tareas = await Tarea.find();
        res.json(tareas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las tareas", error });
    }
});

// Crear nueva tarea
app.post("/api/tareas", async (req, res) => {
    try {
        const { titulo, descripcion, completado } = req.body;
        const nuevaTarea = new Tarea({ titulo, descripcion, completado });
        await nuevaTarea.save();
        res.status(201).json({ message: "Tarea creada", tarea: nuevaTarea });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la tarea", error });
    }
});

// Actualizar tarea
app.put("/api/tareas/:id", async (req, res) => {
    try {
        const { titulo, descripcion, completado } = req.body;
        const tareaActualizada = await Tarea.findByIdAndUpdate(req.params.id, {
            titulo, descripcion, completado, fechaActualizacion: Date.now()
        }, { new: true });

        if (!tareaActualizada) return res.status(404).json({ message: "Tarea no encontrada" });

        res.json({ message: "Tarea actualizada", tarea: tareaActualizada });
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar", error });
    }
});

// Eliminar tarea
app.delete("/api/tareas/:id", async (req, res) => {
    try {
        const tareaEliminada = await Tarea.findByIdAndDelete(req.params.id);
        if (!tareaEliminada) return res.status(404).json({ message: "Tarea no encontrada" });

        res.json({ message: "Tarea eliminada" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar", error });
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
