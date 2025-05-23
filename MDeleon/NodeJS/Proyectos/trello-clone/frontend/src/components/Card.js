import React from 'react';

const Card = ({ text }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '5px', borderRadius: '5px' }}>
            <p>{text}</p>
        </div>
    );
};

export default Card;