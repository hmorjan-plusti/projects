import { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const handleRegister = async () => {
    if (!email || !password) {
      setMsg('Por favor, completa todos los campos');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setMsg('El email no tiene un formato válido');
      return;
    }

    if (password.length < 6) {
      setMsg('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/register',
        { email, password },
        { withCredentials: true }
      );
      setMsg(response.data.message || 'Registro exitoso');
    } catch (error) {
      console.error('Error al registrar:', error.response?.data || error.message);

      if (error.response?.data?.errors) {
        const validationErrors = Object.values(error.response.data.errors).flat();
        setMsg(validationErrors.join(' '));
      } else {
        setMsg(error.response?.data?.message || 'Error al registrar usuario');
      }
    }
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}