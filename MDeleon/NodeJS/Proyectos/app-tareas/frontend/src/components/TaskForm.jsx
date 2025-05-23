import React, { useState } from "react";

const TaskForm = ({ onTaskAdded }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!titulo || !descripcion) return alert("Todos los campos son obligatorios.");

    await fetch("http://localhost:5000/api/tareas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, descripcion, completado: false }),
    });

    setTitulo("");
    setDescripcion("");
    onTaskAdded();
  };

  return (
    <div>
      <h2>➕ Agregar Nueva Tarea</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Título" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />
        <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} required />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
};

export default TaskForm;
