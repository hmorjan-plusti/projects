// src/pages/Dashboard.js
import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function Dashboard({ email, setMsg }){
  const [sku, setSku] = useState("ABC123");
  const [days, setDays] = useState(120);
  const [series, setSeries] = useState([]);
  const [recent, setRecent] = useState([]);
  const [horizon, setHorizon] = useState(7);
  const [metrics, setMetrics] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [models, setModels] = useState([]);

  useEffect(()=>{ /* nada por ahora */ },[]);

  async function doSeed(){
    try{
      const r = await api.seed(sku, days);
      setMsg?.(`Seed OK: ${r.inserted} filas`);
      await doSeries();
      await doRecent();
    }catch(err){ setMsg?.("Error: " + err.message); }
  }

  async function doSeries(){
    try{
      const data = await api.series(sku);
      setSeries(data);
      setMsg?.("Series OK");
    }catch(err){ setMsg?.("Error: " + err.message); }
  }

  async function doRecent(){
    try{
      const data = await api.recent(5);
      setRecent(data);
      setMsg?.("Recientes OK");
    }catch(err){ setMsg?.("Error: " + err.message); }
  }

  // ML
  async function doTrain(){
    try{
      const r = await api.train(sku, horizon);
      setMetrics(r.metrics || null);
      setMsg?.(`Modelo entrenado (${r.modelPath}) — MAE=${r?.metrics?.mae?.toFixed?.(2)}, RMSE=${r?.metrics?.rmse?.toFixed?.(2)}`);
    }catch(err){ setMsg?.("Error: " + err.message); }
  }

  async function doPredict(){
    try{
      const r = await api.predict(sku, horizon);
      setForecast(r);
      setMsg?.("Predicción OK");
    }catch(err){ setMsg?.("Error: " + err.message); }
  }

  async function doModels(){
    try{
      const r = await api.models();
      setModels(r);
      setMsg?.(`Modelos: ${r.length}`);
    }catch(err){ setMsg?.("Error: " + err.message); }
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <div>Conectado como: <b>{email || "(anónimo)"}</b></div>

      <div style={{ display:"flex", gap:8, marginTop:8, flexWrap:"wrap", alignItems:"center" }}>
        <input value={sku} onChange={e=>setSku(e.target.value)} placeholder="SKU" />
        <input value={days} onChange={e=>setDays(+e.target.value)} type="number" min="1" />
        <button onClick={doSeed}>Seed</button>
        <button onClick={doSeries}>Cargar Series</button>
        <button onClick={doRecent}>Ver Recientes</button>

        <span style={{ marginLeft: 8 }}>Horizon:</span>
        <input value={horizon} onChange={e=>setHorizon(+e.target.value)} type="number" min="1" style={{ width: 80 }} />
        <button onClick={doTrain}>Entrenar</button>
        <button onClick={doPredict}>Predecir</button>
        <button onClick={doModels}>Modelos</button>
      </div>

      <h3 style={{ marginTop: 12 }}>Series</h3>
      <table border="1" cellPadding="4">
        <thead><tr><th>date</th><th>qty</th></tr></thead>
        <tbody>
          {series.map((r,i)=>(<tr key={i}><td>{(r.date || "").slice(0,10)}</td><td>{r.qty}</td></tr>))}
        </tbody>
      </table>

      <h3 style={{ marginTop: 12 }}>Recientes</h3>
      <table border="1" cellPadding="4">
        <thead><tr><th>Id</th><th>Sku</th><th>Timestamp</th><th>Quantity</th></tr></thead>
        <tbody>
          {recent.map(r=>(<tr key={r.id}><td>{r.id}</td><td>{r.sku}</td><td>{r.timestamp}</td><td>{r.quantity}</td></tr>))}
        </tbody>
      </table>

      {metrics && (
        <div style={{ marginTop: 16 }}>
          <h3>Métricas (holdout)</h3>
          <ul>
            <li>MAE: {metrics.mae?.toFixed?.(3)}</li>
            <li>RMSE: {metrics.rmse?.toFixed?.(3)}</li>
          </ul>
        </div>
      )}

      {forecast && (
        <div style={{ marginTop: 16 }}>
          <h3>Predicción (próximos {forecast.horizon} pasos)</h3>
          <table border="1" cellPadding="4">
            <thead><tr><th>t</th><th>forecast</th><th>lower</th><th>upper</th></tr></thead>
            <tbody>
              {forecast.forecast?.map((y,i)=>(
                <tr key={i}>
                  <td>{i+1}</td>
                  <td>{y?.toFixed?.(2)}</td>
                  <td>{forecast.lower?.[i]?.toFixed?.(2)}</td>
                  <td>{forecast.upper?.[i]?.toFixed?.(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {models?.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <h3>Modelos</h3>
          <ul>{models.map((m,i)=>(<li key={i}>{m}</li>))}</ul>
        </div>
      )}
    </div>
  );
}
