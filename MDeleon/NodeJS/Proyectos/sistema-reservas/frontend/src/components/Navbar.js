// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Sistema de Reservas</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Inicio</Link>
        {!token && <Link to="/registro" style={styles.link}>Registro</Link>}
        {!token && <Link to="/login" style={styles.link}>Login</Link>}
        {token && <button onClick={handleLogout} style={styles.button}>Cerrar sesión</button>}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    backgroundColor: '#2c3e50',
    color: 'white'
  },
  logo: {
    margin: 0
  },
  links: {
    display: 'flex',
    gap: '20px'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  button: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px'
  }
};
