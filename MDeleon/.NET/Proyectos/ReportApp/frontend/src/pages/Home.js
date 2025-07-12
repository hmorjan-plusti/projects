import { useEffect, useState } from "react";
import axios from "axios";
import { getToken, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [reportes, setReportes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();

    if (!token) {
      navigate("/login");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const fetchReportes = async () => {
      try {
        const res = await axios.get("http://localhost:5093/api/reportes");
        setReportes(res.data);
      } catch (error) {
        console.error(error);
        if (error.response?.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };

    fetchReportes();

    const interval = setInterval(fetchReportes, 15000);
    return () => clearInterval(interval);
  }, [navigate]);

  const activar = async () => {
    await axios.post("http://localhost:5093/api/reportes/activar");
  };

  const desactivar = async () => {
    await axios.post("http://localhost:5093/api/reportes/desactivar");
  };

  return (
    <div>
      <h1>Reportes</h1>
      <button onClick={activar}>Activar</button>
      <button onClick={desactivar}>Desactivar</button>
      <button onClick={() => { logout(); navigate("/login"); }}>Logout</button>

      <ul>
        {reportes.map(r => (
          <li key={r.id}>
            {r.nombre} - {new Date(r.fechaGeneracion).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
