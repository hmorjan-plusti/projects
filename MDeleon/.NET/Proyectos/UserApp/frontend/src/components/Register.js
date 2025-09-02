import React, { useState } from 'react';
import { register } from '../api';
import { TextField, Button, Box, Typography } from '@mui/material';

export default function Register() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [msg, setMsg] = useState('');
  const [errors, setErrors] = useState([]);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setMsg('');
    setErrors([]);
    try {
      await register(form);
      setMsg('Usuario registrado. Ahora puedes iniciar sesión.');
    } catch (error) {
      if (error.response && error.response.data) {
        // Identity returns array of errors
        if (Array.isArray(error.response.data)) {
          setErrors(error.response.data.map(e => e.description || JSON.stringify(e)));
          setMsg('Error al registrar usuario.');
        } else if (error.response.data.Message) {
          setMsg(error.response.data.Message);
        } else {
          setMsg('Error al registrar usuario.');
        }
      } else {
        setMsg('Error al registrar usuario.');
      }
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField label="Usuario" name="username" onChange={handleChange} required />
      <TextField label="Email" name="email" type="email" onChange={handleChange} required />
      <TextField label="Contraseña" name="password" type="password" onChange={handleChange} required />
      <Button type="submit" variant="outlined">Registrar</Button>
      {msg && <Typography color={msg.startsWith('Error') ? 'error' : 'primary'}>{msg}</Typography>}
      {errors.length > 0 && (
        <Box>
          {errors.map((err, idx) => (
            <Typography key={idx} color="error">{err}</Typography>
          ))}
        </Box>
      )}
    </Box>
  );
}