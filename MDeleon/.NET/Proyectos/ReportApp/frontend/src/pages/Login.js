import { useState } from "react";
import { login } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.password) {
      alert("⚠️ Usuario y contraseña son requeridos.");
      return;
    }

    try {
      await login(user);
      navigate("/");
    } catch (error) {
      alert("❌ Error al iniciar sesión. Verifica tus credenciales.");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <input
        placeholder="Usuario"
        value={user.username}
        onChange={e => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={user.password}
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button type="submit">Login</button>
      <button type="button" onClick={() => navigate("/register")}>
        Registrarse
      </button>
    </form>
  );
}
