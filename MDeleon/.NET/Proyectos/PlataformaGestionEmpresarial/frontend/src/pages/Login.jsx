import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../services/api";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const res = await AuthApi.login(email, password);
      setMsg("Conectado: " + res.fullName);
      navigate("/dashboard");
    } catch (e) {
      setMsg(e.message);
    }
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 420, margin: "24px auto", display: "grid", gap: 8 }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button>Entrar</button>
      <div>{msg}</div>
    </form>
  );
}
