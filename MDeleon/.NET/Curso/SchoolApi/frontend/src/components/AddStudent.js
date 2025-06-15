import React, { useState } from 'react';
import axios from 'axios';

function AddStudent() {
  const [name, setName] = useState('');
  const [courseId, setCourseId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post('http://localhost:5004/api/Student', { name, courseId: parseInt(courseId) }, config);
      alert('Estudiante agregado con éxito');
      setName('');
      setCourseId('');
    } catch (err) {
      console.error(err);
      alert('Error al agregar estudiante');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar Estudiante</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="ID del Curso"
        value={courseId}
        onChange={(e) => setCourseId(e.target.value)}
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default AddStudent;