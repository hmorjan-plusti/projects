const API_URL = 'http://localhost:5000/api/boards';

export const getBoards = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Error al obtener los boards');
    }
    return response.json();
};

export const createBoard = async (boardData) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(boardData),
    });

    if (!response.ok) {
        throw new Error('Error al crear el board');
    }

    return response.json();
};