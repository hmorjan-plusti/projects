import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenidos a SchoolApi</h1>
      <p>Por favor, selecciona una opción para continuar:</p>
      <div>
        <button
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => navigate('/register')}
        >
          Registrarse
        </button>
        <button
          style={{ margin: '10px', padding: '10px 20px', fontSize: '16px' }}
          onClick={() => navigate('/login')}
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  );
}

export default HomePage;