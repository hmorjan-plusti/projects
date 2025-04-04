import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Cart = () => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    // Suponiendo que tienes un usuario autenticado y su ID
    const userId = 'usuario-id';
    axios.get(`http://localhost:5000/api/cart/${userId}`)
      .then(response => setCart(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cart.products?.map(item => (
          <div key={item.productId._id}>
            <h3>{item.productId.name}</h3>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.productId.price}</p>
            <button>Remove from Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
