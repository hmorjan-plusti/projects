import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [form, setForm] = useState({ fecha: '', hora: '', lugar: '' });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem('token');

  const fetchReservas = async () => {
    const res = await axios.get('http://localhost:5000/api/reservas', {
      headers: { Authorization: token }
    });
    setReservas(res.data);
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await axios.put(`http://localhost:5000/api/reservas/${editId}`, form, {
        headers: { Authorization: token }
      });
      setEditId(null);
    } else {
      await axios.post('http://localhost:5000/api/reservas', form, {
        headers: { Authorization: token }
      });
    }
    setForm({ fecha: '', hora: '', lugar: '' });
    fetchReservas();
  };

  const handleEdit = (reserva) => {
    setForm({ fecha: reserva.fecha, hora: reserva.hora, lugar: reserva.lugar });
    setEditId(reserva._id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/reservas/${id}`, {
      headers: { Authorization: token }
    });
    fetchReservas();
  };

  return (
    <div>
      <h2>Mis Reservas</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Fecha"
          value={form.fecha}
          onChange={e => setForm({ ...form, fecha: e.target.value })}
        />
        <input
          placeholder="Hora"
          value={form.hora}
          onChange={e => setForm({ ...form, hora: e.target.value })}
        />
        <input
          placeholder="Lugar"
          value={form.lugar}
          onChange={e => setForm({ ...form, lugar: e.target.value })}
        />
        <button>{editId ? 'Actualizar' : 'Reservar'}</button>
      </form>
      <ul>
        {reservas.map(r => (
          <li key={r._id}>
            {r.fecha} - {r.hora} - {r.lugar}
            <button onClick={() => handleEdit(r)}>✏️</button>
            <button onClick={() => handleDelete(r._id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
