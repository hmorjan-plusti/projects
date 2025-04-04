import React, { useState, useEffect } from 'react';
import Board from '../components/Board';
import { getBoards, createBoard } from '../services/boardService';

const Dashboard = () => {
    const [boards, setBoards] = useState([]);
    const [boardName, setBoardName] = useState('');

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const data = await getBoards();
                setBoards(data);
            } catch (error) {
                console.error('Error al cargar los boards:', error);
            }
        };

        fetchBoards();
    }, []);

    const handleAddBoard = async () => {
        if (boardName.trim() === '') return;

        try {
            const newBoard = await createBoard({ title: boardName, description: '' });
            setBoards([...boards, newBoard]);
            setBoardName('');
        } catch (error) {
            console.error('Error al agregar el board:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Dashboard</h1>
            <div>
                <input
                    type="text"
                    placeholder="Nombre del Board"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={handleAddBoard} style={{ padding: '10px 20px' }}>
                    Crear Board
                </button>
            </div>
            <div style={{ marginTop: '30px' }}>
                {boards.map((board) => (
                    <Board key={board._id} title={board.title} boardId={board._id} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;