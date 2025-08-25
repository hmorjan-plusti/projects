import axios from 'axios';
const API = process.env.REACT_APP_API + '/auth';

export const register = (user) => axios.post(`${API}/register`, user);
export const login = (user) => axios.post(`${API}/login`, user);
