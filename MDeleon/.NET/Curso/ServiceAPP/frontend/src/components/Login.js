import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token); // Guarda el token
      navigate("/dashboard"); // Redirige al dashboard
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      if (error.response) {
        // Manejar errores específicos según el código de estado
        if (error.response.status === 401) {
          alert("Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.");
        } else if (error.response.status === 500) {
          alert("Error interno del servidor. Intenta nuevamente más tarde.");
        } else {
          alert(`Error inesperado: ${error.response.status}`);
        }
      } else {
        // Error de red u otro problema
        alert("No se pudo conectar con el servidor. Verifica tu conexión a internet.");
      }
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="text"
        placeholder="Usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
}

export default Login;