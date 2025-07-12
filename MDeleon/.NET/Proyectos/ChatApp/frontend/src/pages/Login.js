import { useState, useContext } from 'react';
import { login } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({ username: '', password: '' });
  const { login: setToken } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(user);
      setToken(res.data.token);
      navigate('/chat');
    } catch (err) {
      alert('Error al iniciar sesión');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Usuario" onChange={e => setUser({ ...user, username: e.target.value })} />
      <input placeholder="Contraseña" type="password" onChange={e => setUser({ ...user, password: e.target.value })} />
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
