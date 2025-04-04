import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

const App = () => {
  const [view, setView] = useState("home");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/tareas");
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error al obtener tareas:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h1>📌 Gestor de Tareas</h1>
      {view === "home" && (
        <div>
          <button onClick={() => setView("list")}>📋 Mostrar Tareas</button>
          <button onClick={() => setView("add")}>➕ Agregar Tarea</button>
        </div>
      )}
      {view === "list" && <TaskList tasks={tasks} onTasksUpdated={fetchTasks} onBack={() => setView("home")} />}
      {view === "add" && <TaskForm onTaskAdded={() => { fetchTasks(); setView("list"); }} />}
    </div>
  );
};

export default App;
