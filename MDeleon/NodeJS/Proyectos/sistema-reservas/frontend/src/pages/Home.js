import React from 'react';

export default function Home() {
  return (
    <div style={styles.container}>
      <h1>Bienvenido al Sistema de Reservas</h1>
      <img
        src="https://cdn-icons-png.flaticon.com/512/2356/2356880.png" // imagen de ejemplo
        alt="Reservation System"
        style={styles.image}
      />
    </div>
  );
}

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
  },
  image: {
    marginTop: '20px',
    width: '300px',
    height: 'auto',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
  }
};
