import axios from 'axios';

const API = 'http://localhost:5053/api/reservas';

export const getReservas = (token) => {
  return axios.get(API, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const createReserva = (reserva, token) => {
  return axios.post(API, reserva, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
