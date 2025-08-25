import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5093/api/auth/register", user);
      alert("✅ Usuario registrado correctamente");
      navigate("/login");
    } catch (error) {
      alert("❌ Error al registrar usuario");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro de Usuario</h2>
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
      <button type="submit">Registrar</button>
    </form>
  );
}
