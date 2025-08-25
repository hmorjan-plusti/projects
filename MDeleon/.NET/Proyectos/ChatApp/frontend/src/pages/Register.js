// frontend/src/pages/Register.js
import { useState } from 'react';
import { register } from '../services/authService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [user, setUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      alert('Usuario registrado correctamente');
      navigate('/login');
    } catch (err) {
      alert('Error al registrar');
    }
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Usuario"
        onChange={e => setUser({ ...user, username: e.target.value })}
      />
      <input
        placeholder="Contraseña"
        type="password"
        onChange={e => setUser({ ...user, password: e.target.value })}
      />
      <button type="submit">Registrarse</button>
      <button type="button" onClick={goToLogin} style={{ marginLeft: '10px' }}>
        Ya tengo cuenta
      </button>
    </form>
  );
}
