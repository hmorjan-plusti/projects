import React, { useState } from 'react';
import Card from './Card';
import { createCard } from '../services/cardService';

const List = ({ title, listId }) => {
    const [cards, setCards] = useState([]);
    const [cardText, setCardText] = useState('');

    const handleAddCard = async () => {
        if (cardText.trim() === '') return;

        try {
            const newCard = await createCard(listId, { text: cardText });
            setCards([...cards, newCard]);
            setCardText('');
        } catch (error) {
            console.error('Error al agregar la tarjeta:', error);
        }
    };

    return (
        <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px' }}>
            <h3>{title}</h3>
            <div>
                <input
                    type="text"
                    placeholder="Texto de la Tarjeta"
                    value={cardText}
                    onChange={(e) => setCardText(e.target.value)}
                    style={{ padding: '10px', marginRight: '10px', width: '300px' }}
                />
                <button onClick={handleAddCard} style={{ padding: '10px 20px' }}>
                    Crear Tarjeta
                </button>
            </div>
            <div style={{ marginTop: '10px' }}>
                {cards.map((card) => (
                    <Card key={card._id} text={card.text} />
                ))}
            </div>
        </div>
    );
};

export default List;