import React, { useState } from 'react';
import { login } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Login({ setToken }) {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(form);
      if (res.data.token) {
        setToken(res.data.token);
        localStorage.setItem('token', res.data.token);
      } else {
        setError('No se recibió token. Verifica el backend.');
      }
    } catch (err) {
      setError('Credenciales inválidas o error de red.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Usuario" name="username" onChange={handleChange} required />
      <TextField label="Contraseña" name="password" type="password" onChange={handleChange} required />
      <Button type="submit" variant="contained">Entrar</Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}