import axios from "axios";

const API_URL = "http://localhost:5000/tareas";

export const getTareas = () => axios.get(API_URL);
export const createTarea = (tarea) => axios.post(API_URL, tarea);
export const deleteTarea = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTarea = (id, updatedData) => axios.put(`${API_URL}/${id}`, updatedData);
