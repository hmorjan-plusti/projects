import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Archivo CSS para estilos

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li><Link to="/" className="navbar-link">Home</Link></li>
        <li><Link to="/products" className="navbar-link">Products</Link></li>
        <li><Link to="/cart" className="navbar-link">Cart</Link></li>
        <li><Link to="/register" className="navbar-link">Register</Link></li>
        <li><Link to="/login" className="navbar-link">Login</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;