import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // ajusta al backend real
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); // o donde guardes el token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
