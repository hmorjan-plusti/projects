import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verifica el token con el backend
      axios
        .get('http://localhost:5000/api/auth/profile', {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          setIsAuthenticated(true);
          setProfileMessage(response.data.message);
        })
        .catch(() => {
          setIsAuthenticated(false);
          localStorage.removeItem('token'); // Elimina el token si es inválido
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local
    setIsAuthenticated(false);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Bienvenido</h2>
      {isAuthenticated ? (
        <>
          <p>{profileMessage}</p>
          <button onClick={handleLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <button onClick={() => navigate('/register')}>Registrarse</button>
          <button onClick={() => navigate('/login')}>Iniciar sesión</button>
        </>
      )}
    </div>
  );
}