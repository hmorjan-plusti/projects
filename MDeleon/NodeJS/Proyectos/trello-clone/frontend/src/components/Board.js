import React, { useState, useEffect } from 'react';
import List from './List';
import { getLists, createList } from '../services/listService';

const Board = ({ title, boardId }) => {
    const [lists, setLists] = useState([]);
    const [listName, setListName] = useState('');

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const data = await getLists(boardId);
                setLists(data);
            } catch (error) {
                console.error('Error al cargar las listas:', error);
            }
        };

        fetchLists();
    }, [boardId]);

    const handleAddList = async () => {
        if (listName.trim() === '') return;

        try {
            const newList = await createList(boardId, { title: listName });
            setLists([...lists, newList]);
            setListName('');
        } catch (error) {
            console.error('Error al agregar la lista:', error);
        }
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '20px' }}>
            <h2>{title}</h2>
            <div>
                <input
                    type="text"
                    placeholder="Nombre de la Lista"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={handleAddList} style={{ padding: '10px 20px' }}>
                    Crear Lista
                </button>
            </div>
            <div style={{ marginTop: '20px' }}>
                {lists.map((list) => (
                    <List key={list._id} title={list.title} listId={list._id} />
                ))}
            </div>
        </div>
    );
};

export default Board;