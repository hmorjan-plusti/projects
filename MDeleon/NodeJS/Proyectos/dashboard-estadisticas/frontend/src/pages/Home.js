// src/pages/Home.js
import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenido al Dashboard</h1>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2'
  },
  title: {
    fontSize: '48px',
    color: '#333',
    textAlign: 'center'
  }
};

export default Home;
