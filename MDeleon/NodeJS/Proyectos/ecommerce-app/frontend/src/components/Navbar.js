import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useState(null); // Estado para manejar el token

  useEffect(() => {
    // Actualiza el estado del token al cargar el componente
    setToken(localStorage.getItem('userToken'));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Elimina el token de usuario
    setToken(null); // Actualiza el estado del token
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>Ecommerce App</h2>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {!token && <Link to="/register" style={styles.link}>Register</Link>}
        {!token && <Link to="/login" style={styles.link}>Login</Link>}
        {token && <Link to="/products" style={styles.link}>Products</Link>}
        {token && <Link to="/cart" style={styles.link}>Cart</Link>}
        {token && <button onClick={handleLogout} style={styles.button}>Cerrar Sesión</button>}
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