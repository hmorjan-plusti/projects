import React, { useState } from 'react';
import AddStudent from './AddStudent';
import AddProfessor from './AddProfessor';
import AddCourse from './AddCourse';

function ManageEntities() {
  const [activeForm, setActiveForm] = useState('student'); // Controla qué formulario se muestra

  return (
    <div>
      <h1>Gestión de Entidades</h1>
      <div>
        <button onClick={() => setActiveForm('student')}>Agregar Estudiante</button>
        <button onClick={() => setActiveForm('professor')}>Agregar Profesor</button>
        <button onClick={() => setActiveForm('course')}>Agregar Curso</button>
      </div>
      <div>
        {activeForm === 'student' && <AddStudent />}
        {activeForm === 'professor' && <AddProfessor />}
        {activeForm === 'course' && <AddCourse />}
      </div>
    </div>
  );
}

export default ManageEntities;