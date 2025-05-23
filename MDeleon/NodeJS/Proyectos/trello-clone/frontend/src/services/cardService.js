const API_URL = 'http://localhost:5000/api/cards';

export const createCard = async (listId, cardData) => {
    const response = await fetch(`${API_URL}/lists/${listId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
    });

    if (!response.ok) {
        throw new Error('Error al crear la tarjeta');
    }

    return response.json();
};