import React, { useEffect, useState } from "react";
import { getDatos } from "../services/DatoService";

const Dashboard = () => {
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    getDatos().then(setDatos).catch(console.error);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>📄 Datos Consultados</h2>
      {datos.length === 0 ? (
        <p>No hay datos aún.</p>
      ) : (
        <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Descripción</th>
              <th>Fecha Consulta</th>
            </tr>
          </thead>
          <tbody>
            {datos.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.id}</td>
                <td>{dato.titulo}</td>
                <td>{dato.descripcion}</td>
                <td>{new Date(dato.fechaConsulta).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
