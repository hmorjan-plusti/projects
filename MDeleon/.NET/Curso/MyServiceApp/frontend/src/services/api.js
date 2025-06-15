import axios from "axios";

// Cambia el puerto al correcto
export const getLogs = () => axios.get("http://localhost:5169/api/log");