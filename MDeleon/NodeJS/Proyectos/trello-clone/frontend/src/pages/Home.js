import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bienvenido a Trello Clone</h1>
            <p>Administra tus tareas y proyectos fácilmente.</p>
            <div style={{ marginTop: '20px' }}>
                <button
                    style={{ marginRight: '10px', padding: '10px 20px' }}
                    onClick={() => navigate('/register')}
                >
                    Registrarse
                </button>
                <button
                    style={{ padding: '10px 20px' }}
                    onClick={() => navigate('/login')}
                >
                    Iniciar Sesión
                </button>
            </div>
        </div>
    );
}

export default Home;