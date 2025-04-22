import React, { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await API.post('/auth/login', form);
    localStorage.setItem('token', res.data.token);
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default LoginForm;
