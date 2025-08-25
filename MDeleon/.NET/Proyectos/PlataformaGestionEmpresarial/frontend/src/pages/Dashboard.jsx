import { useEffect, useState } from "react";
import { AuthApi, CustomersApi } from "../services/api";

export default function Dashboard(){
  const [me, setMe] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");

  async function load(){
    try { const u = await AuthApi.me(); setMe(u); setCustomers(await CustomersApi.list()); }
    catch (error) {
      console.error("Error loading dashboard data:", error);
    }
  }
  useEffect(()=>{ load(); }, []);

  const [error, setError] = useState("");
  async function add(){
    setError("");
    try {
      await CustomersApi.create(name, email);
      setName(""); setEmail("");
      setCustomers(await CustomersApi.list());
    } catch (e) {
      setError(e.message);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.reload();
  }
  return (
    <div style={{maxWidth:720, margin:"24px auto", display:"grid", gap:16}}>
      <h2>Dashboard</h2>
      {!me ? <div>Inicia sesión para gestionar clientes.</div> : (
        <>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
            <span>Hola, {me.Name || me.name} ({me.Email || me.email})</span>
            <button onClick={logout} style={{marginLeft:16}}>Cerrar sesión</button>
          </div>
          <div style={{display:"flex", gap:8}}>
            <input placeholder="Nombre" value={name} onChange={e=>setName(e.target.value)}/>
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
            <button onClick={add}>Agregar</button>
          </div>
          {error && <div style={{color:"red"}}>{error}</div>}
          <ul>{customers.map(c => <li key={c.id}>{c.name} — {c.email}</li>)}</ul>
        </>
      )}
    </div>
  );
}
