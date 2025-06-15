import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogsViewer() {
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("No estás autenticado. Por favor, inicia sesión.");
      navigate("/login"); // Redirige al Login si no hay token
      return;
    }

    axios
      .get("/api/logs", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setLogs(res.data))
      .catch((err) => {
        console.error("Error al obtener los logs:", err);
        if (err.response && err.response.status === 401) {
          alert("Sesión expirada. Por favor, inicia sesión nuevamente.");
          navigate("/login"); // Redirige al Login si el token es inválido
        } else {
          alert("Error al conectar con el servidor. Intenta nuevamente más tarde.");
        }
      });
  }, [navigate]);

  return (
    <div>
      <h2>Logs</h2>
      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Tipo</th>
            <th>Mensaje</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={index}>
              <td>{log.fecha}</td>
              <td>{log.tipo}</td>
              <td>{log.mensaje}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LogsViewer;