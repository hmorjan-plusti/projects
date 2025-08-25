import axios from 'axios';

const API = 'http://localhost:5053/api/auth';

export const register = (data) => {
  return axios.post(`${API}/register`, data);
};

export const login = (data) => {
  return axios.post(`${API}/login`, data);
};
