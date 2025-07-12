import axios from "axios";
const API = "http://localhost:5093/api/auth";

export const login = async (user) => {
  const res = await axios.post(`${API}/login`, user);
  localStorage.setItem("token", res.data.token);
};

export const register = async (user) => {
  await axios.post(`${API}/register`, user);
};

export const logout = () => localStorage.removeItem("token");
export const getToken = () => localStorage.getItem("token");
