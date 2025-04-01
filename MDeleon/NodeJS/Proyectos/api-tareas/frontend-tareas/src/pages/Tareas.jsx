import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/tareas"; // Asegúrate de que este puerto sea el correcto

function Tareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTareas(data))
      .catch((err) => console.error("Error al obtener tareas:", err));
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ borderCollapse: "collapse", width: "80%" }}>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Estado</th>
            <th>Fecha de Creación</th>
          </tr>
        </thead>
        <tbody>
          {tareas.map((tarea) => (
            <tr key={tarea._id}>
              <td>{tarea.titulo}</td>
              <td>{tarea.descripcion}</td>
              <td>{tarea.completado ? "✅ Completado" : "❌ Pendiente"}</td>
              <td>{new Date(tarea.fechaCreacion).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Tareas;
