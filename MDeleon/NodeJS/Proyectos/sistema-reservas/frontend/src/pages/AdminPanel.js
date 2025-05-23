import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdminPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [reservas, setReservas] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get('http://localhost:5000/api/users', {
          headers: { Authorization: token }
        });
        setUsuarios(usersRes.data);

        const reservasRes = await axios.get('http://localhost:5000/api/reservas/admin', {
          headers: { Authorization: token }
        });
        setReservas(reservasRes.data);
      } catch (err) {
        alert('Acceso denegado o error de token');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Panel de Administración</h2>

      <h3>Usuarios Registrados</h3>
      <ul>
        {usuarios.map(u => (
          <li key={u._id}>
            {u.nombre} - {u.email} - Rol: {u.rol}
          </li>
        ))}
      </ul>

      <h3>Todas las Reservas</h3>
      <ul>
        {reservas.map(r => (
          <li key={r._id}>
            {r.fecha} - {r.hora} - {r.lugar} (Usuario: {r.usuario?.nombre})
          </li>
        ))}
      </ul>
    </div>
  );
}
