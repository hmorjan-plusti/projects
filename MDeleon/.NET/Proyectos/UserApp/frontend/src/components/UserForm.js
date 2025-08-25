import React, { useState, useEffect } from 'react';
import { createUser, updateUser } from '../api';
import { Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function UserForm({ token, userToEdit, onSuccess, onCancel }) {
  const [form, setForm] = useState({ username: '', password: '' });

  useEffect(() => {
    if (userToEdit) {
      setForm({ username: userToEdit.username, password: '' }); // password no se rellena
    } else {
      setForm({ username: '', password: '' });
    }
  }, [userToEdit]);

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();

    // Cambia los nombres de los campos para el backend
   const payload = {
  Username: form.username
};
if (!userToEdit || form.password.trim() !== '') {
  payload.Password = form.password;
}

    try {
      if (userToEdit) {
        await updateUser(userToEdit.id, payload, token);
      } else {
        await createUser(payload, token);
      }
      onSuccess();
      setForm({ username: '', password: '' });
    } catch (err) {
      console.error("❌ Error al guardar usuario:", err.response?.data || err);
      alert("Ocurrió un error al guardar el usuario.");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        {userToEdit ? 'Editar usuario' : 'Crear usuario'}
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}
      >
        <TextField
          label="Usuario"
          name="username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <TextField
          label="Contraseña"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required={!userToEdit} // solo obligatoria al crear
        />
        <Button type="submit" variant="contained" color="primary">
          {userToEdit ? 'Actualizar' : 'Crear'}
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={onCancel}
          >
            Cancelar
          </Button>
        )}
      </Box>
    </Paper>
  );
}