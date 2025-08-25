import React, { useEffect, useState } from 'react';
import { getReservas, createReserva } from '../services/ReservaService';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [reservas, setReservas] = useState([]);
  const [form, setForm] = useState({ tipo: '', detalle: '', fecha: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else {
      loadReservas();
    }
  }, []);

  const loadReservas = async () => {
    try {
      const res = await getReservas(token);
      setReservas(res.data);
    } catch (err) {
      alert('Error al cargar las reservas.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReserva(form, token);
      setForm({ tipo: '', detalle: '', fecha: '' });
      loadReservas();
    } catch (err) {
      alert('Error al crear reserva.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h2>Panel de Reservas</h2>
      <button style={styles.logoutButton} onClick={handleLogout}>Cerrar sesión</button>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Tipo (Hotel, Restaurante, Médico)"
          value={form.tipo}
          onChange={(e) => setForm({ ...form, tipo: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Detalle"
          value={form.detalle}
          onChange={(e) => setForm({ ...form, detalle: e.target.value })}
          required
          style={styles.input}
        />
        <input
          type="datetime-local"
          value={form.fecha}
          onChange={(e) => setForm({ ...form, fecha: e.target.value })}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Crear Reserva</button>
      </form>

      <h3>Mis Reservas</h3>
      <ul style={styles.lista}>
        {reservas.map((r) => (
          <li key={r.id} style={styles.item}>
            <strong>{r.tipo}:</strong> {r.detalle} - {new Date(r.fecha).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: { textAlign: 'center', marginTop: '50px' },
  logoutButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    marginBottom: '20px',
    cursor: 'pointer',
    borderRadius: '5px'
  },
  form: { display: 'inline-block', textAlign: 'left', marginBottom: '30px' },
  input: {
    display: 'block',
    width: '300px',
    marginBottom: '10px',
    padding: '8px',
    fontSize: '14px'
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    fontSize: '16px',
    borderRadius: '5px'
  },
  lista: { listStyleType: 'none', padding: 0 },
  item: { marginBottom: '10px' }
};
