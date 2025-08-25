import React, { useState } from 'react';
import { register } from '../services/AuthService';

export default function Register() {
  const [user, setUser] = useState({ username: '', passwordHash: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(user);
    alert("Registered!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Username" onChange={e => setUser({...user, username: e.target.value})} />
      <input type="password" placeholder="Password" onChange={e => setUser({...user, passwordHash: e.target.value})} />
      <button type="submit">Register</button>
    </form>
  );
}
