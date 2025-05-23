import { useState } from 'react';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setMsg('Por favor, completa todos los campos');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token); // Guarda el token en el almacenamiento local
      setMsg('Login exitoso');
      // Redirige al usuario a la página principal o dashboard
      window.location.href = '/';
    } catch (error) {
      console.error('Error al iniciar sesión:', error.response?.data || error.message);
      if (error.response?.data?.message) {
        setMsg(error.response.data.message); // Mensaje del backend
      } else {
        setMsg('Credenciales inválidas');
      }
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Inicio de Sesión</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '300px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', margin: '10px auto', padding: '10px', width: '300px' }}
      />
      <button
        onClick={handleLogin}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Login
      </button>
      {msg && <p style={{ marginTop: '20px', color: 'red' }}>{msg}</p>}
    </div>
  );
}