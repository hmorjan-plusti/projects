import axios from 'axios';

const API_URL = 'http://localhost:5227/api';

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const getUsers = (token) =>
  axios.get(`${API_URL}/users`, { headers: { Authorization: `Bearer ${token}` } });

export const createUser = (data, token) =>
  axios.post(`${API_URL}/users`, data, { headers: { Authorization: `Bearer ${token}` } });

export const updateUser = (id, data, token) =>
  axios.put(`${API_URL}/users/${id}`, data, { headers: { Authorization: `Bearer ${token}` } });

export const deleteUser = (id, token) =>
  axios.delete(`${API_URL}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });