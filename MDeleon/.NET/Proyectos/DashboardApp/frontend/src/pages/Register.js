import { useState } from 'react';
import { register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ username: '', passwordHash: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Usuario registrado');
      navigate('/');
    } catch {
      alert('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Registro</h2>
      <input placeholder="Usuario" onChange={e => setForm({...form, username: e.target.value})} />
      <input type="password" placeholder="Contraseña" onChange={e => setForm({...form, passwordHash: e.target.value})} />
      <button type="submit">Registrarse</button>
    </form>
  );
}
