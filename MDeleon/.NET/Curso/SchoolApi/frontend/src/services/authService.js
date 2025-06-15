import axios from 'axios';

const login = async (email, password) => {
  try {
    const res = await axios.post('http://localhost:5004/api/Auth/login', { email, password });
    localStorage.setItem('token', res.data.token);
    return true;
  } catch (err) {
    return false;
  }
};

export default { login };