import React, { useState } from 'react';
import API from '../services/api';

const StatForm = ({ onCreate }) => {
  const [form, setForm] = useState({ title: '', value: '', category: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/stats', form);
    onCreate(); // Recarga los datos
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" />
      <input name="value" value={form.value} onChange={handleChange} placeholder="Valor" type="number" />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" />
      <button type="submit">Agregar</button>
    </form>
  );
};

export default StatForm;
