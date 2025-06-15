import axios from "axios";

export const getLogs = () =>
  axios.get("http://localhost:5163/api/log"); // Cambia al puerto correcto