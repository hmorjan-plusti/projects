import { useState } from 'react';
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ username: '', passwordHash: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Usuario"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setForm({ ...form, passwordHash: e.target.value })}
        />
        <button type="submit">Iniciar sesión</button>
      </form>

      <div style={{ marginTop: '1rem' }}>
        <span>¿No tienes cuenta? </span>
        <button onClick={() => navigate('/register')}>Crear usuario</button>
      </div>
    </div>
  );
}
