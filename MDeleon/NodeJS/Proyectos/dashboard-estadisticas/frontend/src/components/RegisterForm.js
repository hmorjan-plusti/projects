import React, { useState } from 'react';
import API from '../services/api';

const RegisterForm = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', form);
    alert('Usuario registrado');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="username" placeholder="Nombre" onChange={handleChange} />
      <input name="email" placeholder="Correo" onChange={handleChange} />
      <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default RegisterForm;
