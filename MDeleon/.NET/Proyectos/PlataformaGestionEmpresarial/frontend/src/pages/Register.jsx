import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../services/api";


export default function Register() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await AuthApi.register(fullName, email, password);
      // Si el backend devuelve un token, guárdalo y redirige
      if (res.accessToken) {
        localStorage.setItem("token", res.accessToken);
        navigate("/dashboard");
      } else if (res.ok) {
        setMsg("Registrado. Inicia sesión.");
        navigate("/login");
      } else {
        setMsg(res.error || "Error desconocido");
      }
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: "24px auto", display: "grid", gap: 8 }}>
      <h2>Registro</h2>
      <input placeholder="Nombre completo" value={fullName} onChange={e => setFullName(e.target.value)} required />
      <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button>Crear cuenta</button>
      <div>{msg}</div>
    </form>
  );
}
