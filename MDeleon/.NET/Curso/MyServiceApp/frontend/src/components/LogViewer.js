import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getLogs();
        setLogs(result.data);
      } catch (error) {
        console.error("Error al obtener los logs:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1rem" }}>
        Logs del Servicio
      </h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.time} - {log.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogViewer;
