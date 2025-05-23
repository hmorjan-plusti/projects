import React, { useState } from "react";

const TaskList = ({ tasks, onTasksUpdated, onBack }) => {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTitulo, setEditTitulo] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar esta tarea?")) return;

    await fetch(`http://localhost:5000/api/tareas/${id}`, { method: "DELETE" });
    onTasksUpdated();
  };

  const toggleComplete = async (task) => {
    await fetch(`http://localhost:5000/api/tareas/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...task, completado: !task.completado }),
    });
    onTasksUpdated();
  };

  const handleEdit = (task) => {
    setEditTaskId(task._id);
    setEditTitulo(task.titulo);
    setEditDescripcion(task.descripcion);
  };

  const handleSave = async (id) => {
    if (!editTitulo || !editDescripcion) return alert("Todos los campos son obligatorios.");

    await fetch(`http://localhost:5000/api/tareas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: editTitulo, descripcion: editDescripcion }),
    });

    setEditTaskId(null);
    onTasksUpdated();
  };

  return (
    <div>
      <h2>📋 Lista de Tareas</h2>
      <button onClick={onBack}>🔄 Regresar</button>

      <ul>
        {tasks.length === 0 ? (
          <p>No hay tareas.</p>
        ) : (
          tasks.map(task => (
            <li key={task._id}>
              {editTaskId === task._id ? (
                <>
                  <input type="text" value={editTitulo} onChange={(e) => setEditTitulo(e.target.value)} required />
                  <input type="text" value={editDescripcion} onChange={(e) => setEditDescripcion(e.target.value)} required />
                  <button onClick={() => handleSave(task._id)}>💾 Guardar</button>
                  <button onClick={() => setEditTaskId(null)}>❌ Cancelar</button>
                </>
              ) : (
                <>
                  <span style={{ textDecoration: task.completado ? "line-through" : "none" }}>
                    {task.titulo} - {task.descripcion}
                  </span>
                  <button onClick={() => toggleComplete(task)}>
                    {task.completado ? "❌ Desmarcar" : "✅ Completar"}
                  </button>
                  <button onClick={() => handleEdit(task)}>✏️ Modificar</button>
                  <button onClick={() => handleDelete(task._id)}>🗑️ Eliminar</button>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList;
