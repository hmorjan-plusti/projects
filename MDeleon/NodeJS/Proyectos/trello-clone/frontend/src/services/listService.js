const API_URL = 'http://localhost:5000/api/lists';

export const getLists = async (boardId) => {
    const response = await fetch(`${API_URL}/${boardId}`);
    if (!response.ok) {
        throw new Error('Error al obtener las listas');
    }
    return response.json();
};

export const createList = async (boardId, listData) => {
    const response = await fetch(`${API_URL}/${boardId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData),
    });

    if (!response.ok) {
        throw new Error('Error al crear la lista');
    }

    return response.json();
};