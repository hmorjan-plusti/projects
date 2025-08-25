import React, { useState } from 'react';
import { login } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [user, setUser] = useState({ username: '', passwordHash: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before making the request
    try {
      const res = await login(user);
      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        alert('Logged in successfully!');
        navigate('/dashboard'); // Redirige al dashboard tras login
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred during login.');
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={user.passwordHash}
          onChange={(e) => setUser({ ...user, passwordHash: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mostrar el error si ocurre */}
    </div>
  );
}
