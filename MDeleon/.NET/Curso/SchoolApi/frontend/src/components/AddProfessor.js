import React, { useState } from 'react';
import axios from 'axios';

function AddProfessor() {
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5004/api/Professor', { name, department }, config);
      alert('Profesor agregado con éxito');
      setName('');
      setDepartment('');
    } catch (err) {
      console.error(err);
      alert('Error al agregar profesor');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Profesor</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Departamento"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddProfessor;