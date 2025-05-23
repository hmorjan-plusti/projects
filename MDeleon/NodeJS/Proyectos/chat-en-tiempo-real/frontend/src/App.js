import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientUsername, setRecipientUsername] = useState(''); // Usuario receptor

  const register = async () => {
    try {
      await axios.post('http://localhost:3000/api/auth/register', { username, password });
      alert('User registered');
    } catch (error) {
      console.error('Registration error', error);
    }
  };

  const login = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/login', { username, password });
      setToken(response.data.token);
      socket.emit('joinChat', username);
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const sendPrivateMessage = () => {
    if (recipientUsername) {
      socket.emit('sendPrivateMessage', newMessage, recipientUsername);
      setMessages((prevMessages) => [...prevMessages, { username, message: newMessage }]);
      setNewMessage('');
    } else {
      alert('Please enter a recipient username.');
    }
  };

  // Escuchar los mensajes privados recibidos
  useEffect(() => {
    socket.on('receivePrivateMessage', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.off('receivePrivateMessage');
    };
  }, []);

  return (
    <div>
      <h1>Chat App</h1>
      {!token ? (
        <div>
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={register}>Register</button>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}</h2>
          <input
            type="text"
            placeholder="Recipient Username"
            value={recipientUsername}
            onChange={(e) => setRecipientUsername(e.target.value)}
          />
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={sendPrivateMessage}>Send</button>
          <div>
            {messages.map((msg, idx) => (
              <p key={idx}><strong>{msg.username}:</strong> {msg.message}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
