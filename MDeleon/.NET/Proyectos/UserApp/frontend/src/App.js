import React, { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Container, Box, Typography, Button } from '@mui/material';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const handleSetToken = t => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  return (
    <Container maxWidth="md">
      {!token ? (
        <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Panel de Usuarios
          </Typography>
          <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
            <Box>
              <Typography variant="h6" align="center">Iniciar Sesión</Typography>
              <Login setToken={handleSetToken} />
            </Box>
            <Box>
              <Typography variant="h6" align="center">Registrar Usuario</Typography>
              <Register />
            </Box>
          </Box>
        </Box>
      ) : (
        <>
          <Box sx={{ mt: 4, mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h5">Panel de Usuarios</Typography>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </Box>
          <Dashboard token={token} />
        </>
      )}
    </Container>
  );
}

export default App;