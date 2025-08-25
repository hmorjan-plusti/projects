import React, { useState } from 'react';
import { register } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      alert('Usuario registrado correctamente.');
      navigate('/login');
    } catch (err) {
      alert('Registro fallido. Intenta con otro nombre de usuario.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Usuario"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Registrarse</button>
      </form>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', marginTop: '80px' },
  form: { display: 'inline-block', textAlign: 'left' },
  input: {
    display: 'block',
    width: '250px',
    marginBottom: '15px',
    padding: '8px',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    borderRadius: '5px'
  }
};
