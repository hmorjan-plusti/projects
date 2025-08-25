import React, { useState } from 'react';
import { register } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [msg, setMsg] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    try {
      await register(form);
      setMsg('Usuario registrado. Ahora puedes iniciar sesión.');
    } catch {
      setMsg('Error al registrar usuario.');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Usuario" name="username" onChange={handleChange} required />
      <TextField label="Contraseña" name="password" type="password" onChange={handleChange} required />
      <Button type="submit" variant="outlined">Registrar</Button>
      {msg && <Typography color={msg.startsWith('Error') ? 'error' : 'primary'}>{msg}</Typography>}
    </Box>
  );
}