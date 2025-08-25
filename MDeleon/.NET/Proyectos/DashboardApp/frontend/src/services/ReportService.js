import axios from 'axios';
const API = process.env.REACT_APP_API + '/reports';

export const getEmbedInfo = (token) => axios.get(`${API}/embed`, {
  headers: { Authorization: `Bearer ${token}` }
});
