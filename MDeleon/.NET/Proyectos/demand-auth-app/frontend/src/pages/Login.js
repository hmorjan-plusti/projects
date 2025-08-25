// src/pages/Login.js
import { useState } from "react";
import { api } from "../services/api";

export default function Login({ onLogged }){
  const [email, setEmail] = useState("user@demo.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [msg, setMsg] = useState("");

  async function submit(e){
    e.preventDefault();
    setMsg("Ingresando...");
    try{
      await api.login(email, password);
      setMsg("¡Login OK!");
      onLogged?.(email);
    }catch(err){
      setMsg("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <h2>Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button>Entrar</button>
      <div>{msg}</div>
    </form>
  );
}
