import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
    const [name, setName] = useState("");
    const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    setErrors([]);
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(name.trim())) {
      setMsg("El nombre de usuario solo puede contener letras y dígitos, sin espacios ni símbolos.");
      return;
    }
    try {
        await register(displayName.trim() || name.trim(), email, password);
      setMsg("Usuario registrado. Ahora puedes iniciar sesión.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error: any) {
      console.log("Registro error:", error.response?.data || error);
      if (error.response && error.response.data) {
        if (Array.isArray(error.response.data)) {
          setErrors(error.response.data.map((e: any) => e.description || JSON.stringify(e)));
          setMsg("Error al registrar usuario.");
        } else if (error.response.data.Message) {
          setMsg(error.response.data.Message);
        } else {
          setMsg("Error al registrar usuario.");
        }
      } else {
        setMsg("Error al registrar usuario.");
      }
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Registro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Usuario"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
          <input
            type="text"
            placeholder="Nombre para mostrar"
            className="input"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        <input
          type="email"
          placeholder="Email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full">Registrar</button>
      </form>
      {msg && (
        <div className={msg.startsWith("Error") ? "text-red-600 mt-2" : "text-green-600 mt-2"}>{msg}</div>
      )}
      {errors.length > 0 && (
        <div className="mt-2">
          {errors.map((err, idx) => (
            <div key={idx} className="text-red-600">{err}</div>
          ))}
        </div>
      )}
    </div>
  );
}
