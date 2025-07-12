import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { startConnection, sendMessage } from '../services/authService'; // aún llamado authService

export default function ChatRoom() {
  const { token, logout } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      startConnection(token, (user, msg) => {
        setMessages(prev => [...prev, { user, msg }]);
      });
    }
  }, [token]);

  const handleSend = () => {
    if (!input.trim()) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const user = payload.username; // ✅ usamos el claim personalizado

      if (!user) {
        alert('No se pudo obtener el nombre del usuario');
        return;
      }

      sendMessage(user, input);
      setInput('');
    } catch (err) {
      alert('Error al decodificar el token');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Chat</h2>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
        {messages.map((m, i) => (
          <div key={i}><strong>{m.user}:</strong> {m.msg}</div>
        ))}
      </div>

      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Escribe un mensaje..."
      />
      <button onClick={handleSend}>Enviar</button>
    </div>
  );
}
