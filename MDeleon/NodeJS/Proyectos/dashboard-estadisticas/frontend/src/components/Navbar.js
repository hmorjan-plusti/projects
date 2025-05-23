// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav style={styles.navbar}>
      <Link style={styles.link} to="/">Inicio</Link>
      <Link style={styles.link} to="/login">Login</Link>
      <Link style={styles.link} to="/register">Registro</Link>
      {token && (
        <>
          <Link style={styles.link} to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout} style={styles.button}>Cerrar sesión</button>
        </>
      )}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    backgroundColor: '#222',
    padding: '10px',
    alignItems: 'center'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '8px 16px',
    backgroundColor: '#444',
    borderRadius: '4px',
    transition: '0.3s'
  },
  button: {
    color: 'white',
    backgroundColor: '#d33',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Navbar;
