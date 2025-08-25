// src/pages/Register.js
import { useState } from "react";
import { api } from "../services/api";

export default function Register({ onDone }){
  const [email, setEmail] = useState("user@demo.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [msg, setMsg] = useState("");

  async function submit(e){
    e.preventDefault();
    setMsg("Creando usuario...");
    try{
      await api.register(email, password);
      setMsg("Usuario creado. Ahora inicia sesión.");
      onDone?.();
    }catch(err){
      setMsg("Error: " + err.message);
    }
  }

  return (
    <form onSubmit={submit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
      <h2>Registro</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" type="password" />
      <button>Crear</button>
      <div>{msg}</div>
    </form>
  );
}
