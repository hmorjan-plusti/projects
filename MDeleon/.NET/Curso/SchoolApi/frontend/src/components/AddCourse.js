import React, { useState } from 'react';
import axios from 'axios';

function AddCourse() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5004/api/Course', { name, description }, config);
      alert('Curso agregado con éxito');
      setName('');
      setDescription('');
    } catch (err) {
      console.error(err);
      alert('Error al agregar curso');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Curso</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddCourse;