import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const navigate = useNavigate();

  // Obtener el carrito actual desde el backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/cart');
        setCart(data);
      } catch (error) {
        console.error('Error al obtener el carrito:', error);
      }
    };

    fetchCart();
  }, []);

  // Eliminar un producto del carrito
  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      setCart({
        ...cart,
        products: cart.products.filter((item) => item.product._id !== productId),
      });
      alert('Producto eliminado del carrito');
    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  };

  // Realizar la compra
  const handleCheckout = async () => {
    try {
      const { data } = await axios.post('http://localhost:5000/api/cart/checkout');
      const { totalAmount, purchaseNumber, purchasedProducts } = data;

      alert(
        `Compra realizada con éxito.\nNúmero de compra: ${purchaseNumber}\nTotal: $${totalAmount}\nProductos comprados:\n${purchasedProducts
          .map((item) => `${item.name} x ${item.quantity}`)
          .join('\n')}`
      );

      setCart(data.newCart); // Actualizar el carrito con el nuevo carrito vacío
    } catch (error) {
      console.error('Error al realizar la compra:', error);
      alert('Hubo un problema al realizar la compra');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Elimina el token de usuario
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  const goBack = () => {
    navigate(-1); // Navega a la página anterior
  };

  if (!cart) {
    return <p>Cargando carrito...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Carrito</h1>
      {cart.products.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cart.products.map((item) => (
            <li key={item.product._id}>
              {item.product.name} - ${item.product.price} x {item.quantity}
              <button
                onClick={() => removeFromCart(item.product._id)}
                style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      )}
      {cart.products.length > 0 && (
        <button onClick={handleCheckout} style={{ marginTop: '20px' }}>
          Pagar
        </button>
      )}
      <div style={styles.buttons}>
        <button onClick={goBack} style={styles.backButton}>Regresar</button>
        <button onClick={handleLogout} style={styles.logoutButton}>Cerrar Sesión</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    gap: '10px',
  },
  backButton: {
    backgroundColor: '#95a5a6',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    cursor: 'pointer',
    fontSize: '16px',
    borderRadius: '4px',
  },
};

export default CartPage;