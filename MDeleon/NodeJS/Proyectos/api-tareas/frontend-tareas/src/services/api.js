import axios from "axios";

const API_URL = "http://localhost:3000/api"; // Cambia según tu API

export const getTareas = async () => {
  return await axios.get(`${API_URL}/tareas`);
};

export const addTarea = async (tarea) => {
  return await axios.post(`${API_URL}/tareas`, tarea);
};

export const updateTarea = async (id, tarea) => {
  return await axios.put(`${API_URL}/tareas/${id}`, tarea);
};

export const deleteTarea = async (id) => {
  return await axios.delete(`${API_URL}/tareas/${id}`);
};
