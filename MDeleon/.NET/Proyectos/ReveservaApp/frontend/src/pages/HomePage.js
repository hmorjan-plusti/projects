import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Sistema de Reservas</h1>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={() => navigate('/register')}>Registrarse</button>
        <button style={styles.button} onClick={() => navigate('/login')}>Iniciar Sesión</button>
      </div>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', marginTop: '100px' },
  title: { fontSize: '2.5rem', marginBottom: '30px' },
  buttonGroup: { display: 'flex', justifyContent: 'center', gap: '20px' },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    borderRadius: '5px'
  }
};
