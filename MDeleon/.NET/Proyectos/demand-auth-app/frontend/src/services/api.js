// frontend/src/api.js
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// ---- Manejo de token (JWT) ----
let token = localStorage.getItem("token") || null;
export function setToken(t) { token = t; localStorage.setItem("token", t); }
export function clearToken(){ token = null; localStorage.removeItem("token"); }

// ---- Helper de requests ----
async function req(path, { method = "GET", body, auth = false } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (auth && token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  });

  // intenta parsear JSON, tolera respuestas vacías (204)
  let data = {};
  try { data = await res.json(); } catch { data = {}; }

  if (!res.ok) {
    const msg = data?.error || data?.message || res.statusText;
    throw new Error(msg);
  }
  return data;
}

// ---- API pública ----
export const api = {
  // Auth
  register: (email, password) =>
    req("/api/auth/register", { method: "POST", body: { email, password } }),

  login: async (email, password) => {
    const data = await req("/api/auth/login", { method: "POST", body: { email, password } });
    setToken(data.token);         // guarda el JWT
    return data;
  },

  // Datos (SQLite)
  seed: (sku, days) =>
    req(`/api/demand/seed?sku=${encodeURIComponent(sku)}&days=${days}`, {
      method: "POST", auth: true
    }),

  series: (sku) =>
    req(`/api/demand/series/${encodeURIComponent(sku)}`, { auth: true }),

  recent: (take = 5) =>
    req(`/api/debug/recent-sales?take=${take}`, { auth: true }),

  dbInfo: () =>
    req("/api/debug/db-info"),

  // ---- ML.NET ----
  // Entrena modelo para un SKU y guarda models/{sku}.zip
  train: (sku, horizon = 7) =>
    req("/api/ml/train", {
      method: "POST",
      auth: true,
      body: { sku, horizon }
    }),

  // Predice próximos 'horizon' pasos para un SKU usando el modelo guardado
  predict: (sku, horizon = 7) =>
    req(`/api/ml/predict/${encodeURIComponent(sku)}?horizon=${horizon}`, {
      auth: true
    }),

  // Lista los modelos disponibles en /models
  models: () =>
    req("/api/ml/models", { auth: true }),
};
