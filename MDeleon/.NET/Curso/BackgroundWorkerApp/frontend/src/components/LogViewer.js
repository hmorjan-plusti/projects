import React, { useEffect, useState } from "react";
import { getLogs } from "../services/api";

function LogViewer() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs()
      .then((res) => setLogs(res.data))
      .catch((err) => console.error("Error al obtener logs:", err));
  }, []);

  return (
    <div>
      <h2>Logs Generados</h2>
      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.message} - {new Date(log.timestamp).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default LogViewer;
