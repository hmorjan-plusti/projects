import { useEffect, useState } from "react";
import { api, clearToken } from "./services/api";

export default function App() {
  const [view, setView] = useState("login");   // login | register | dashboard
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("user@demo.com");
  const [password, setPassword] = useState("Passw0rd!");
  const [sku, setSku] = useState("ABC123");
  const [days, setDays] = useState(60);
  const [series, setSeries] = useState([]);
  const [recent, setRecent] = useState([]);
  const [dbPath, setDbPath] = useState("");

  useEffect(() => { api.dbInfo().then(x => setDbPath(x.dbPath)); }, []);

  async function doRegister(e) {
    e.preventDefault();
    setMsg("...");
    try { await api.register(email, password); setMsg("Usuario creado, ahora inicia sesión"); setView("login"); }
    catch (err) { setMsg("Error: " + err.message); }
  }

  async function doLogin(e) {
    e.preventDefault();
    setMsg("...");
    try { await api.login(email, password); setMsg("¡Login OK!"); setView("dashboard"); }
    catch (err) { setMsg("Error: " + err.message); }
  }

  async function doSeed() {
    setMsg("Sembrando...");
    try { const r = await api.seed(sku, days); setMsg(`Seed OK: ${r.inserted} filas`); await doSeries(); await doRecent(); }
    catch (err) { setMsg("Error: " + err.message); }
  }

  async function doSeries() {
    setMsg("Cargando series...");
    try { const data = await api.series(sku); setSeries(data); setMsg("Series OK"); }
    catch (err) { setMsg("Error: " + err.message); }
  }

  async function doRecent() {
    setMsg("Cargando recientes...");
    try { const data = await api.recent(5); setRecent(data); setMsg("Recientes OK"); }
    catch (err) { setMsg("Error: " + err.message); }
  }

  function logout() { clearToken(); setView("login"); setMsg("Sesión cerrada"); }

  return (
    <div style={{ maxWidth: 900, margin: "32px auto", fontFamily: "system-ui" }}>
      <h1>Predicción de Demanda — Frontend</h1>
      <p style={{ color: "#555" }}>Backend: {import.meta.env.VITE_API_URL} — DB: <code>{dbPath}</code></p>

      <nav style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <button onClick={() => setView("login")}>Login</button>
        <button onClick={() => setView("register")}>Registro</button>
        <button onClick={() => setView("dashboard")}>Dashboard</button>
        <button onClick={logout}>Logout</button>
      </nav>

      <div style={{ margin: "12px 0", minHeight: 20 }}>{msg}</div>

      {view === "register" && (
        <form onSubmit={doRegister} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <h2>Registro</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button>Crear</button>
        </form>
      )}

      {view === "login" && (
        <form onSubmit={doLogin} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
          <h2>Login</h2>
          <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <button>Entrar</button>
        </form>
      )}

      {view === "dashboard" && (
        <div>
          <h2>Dashboard</h2>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <input value={sku} onChange={e => setSku(e.target.value)} placeholder="SKU" />
            <input value={days} onChange={e => setDays(+e.target.value)} type="number" min="1" />
            <button onClick={doSeed}>Seed</button>
            <button onClick={doSeries}>Cargar Series</button>
            <button onClick={doRecent}>Ver Recientes</button>
          </div>

          <h3>Series</h3>
          <table border="1" cellPadding="4">
            <thead><tr><th>date</th><th>qty</th></tr></thead>
            <tbody>{series.map((r, i) => <tr key={i}><td>{(r.date || "").slice(0,10)}</td><td>{r.qty}</td></tr>)}</tbody>
          </table>

          <h3>Recientes</h3>
          <table border="1" cellPadding="4">
            <thead><tr><th>Id</th><th>Sku</th><th>Timestamp</th><th>Quantity</th></tr></thead>
            <tbody>{recent.map(r => <tr key={r.id}><td>{r.id}</td><td>{r.sku}</td><td>{r.timestamp}</td><td>{r.quantity}</td></tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  );
}
