import axios from "axios";

const API = "http://localhost:5293/api/Auth";

const register = (username, password) =>
  axios.post(`${API}/register`, { username, password });

const login = async (username, password) => {
  const res = await axios.post(`${API}/login`, { username, password });
  localStorage.setItem("token", res.data.token);
};

const AuthService = {
  register,
  login,
};

export default AuthService;
