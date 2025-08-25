import React from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigateToRegister = () => {
    navigate("/register"); // Redirige a la página de registro
  };

  const handleNavigateToLogin = () => {
    navigate("/login"); // Redirige a la página de login
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <button onClick={handleNavigateToRegister}>Registrar Usuario</button>
        <button onClick={handleNavigateToLogin}>Iniciar Sesión</button>
      </div>
    </div>
  );
}

export default Dashboard;