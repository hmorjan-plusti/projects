import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();

  // Obtener productos desde el backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/products');
        setProducts(data);
      } catch (error) {
        console.error('Error al obtener los productos:', error);
      }
    };

    fetchProducts();
  }, []);

  // Crear o actualizar un producto
  const saveProduct = async () => {
    if (!newProduct.name || !newProduct.price) {
      alert('Por favor, completa todos los campos');
      return;
    }

    try {
      if (editingProduct) {
        // Actualizar producto existente
        const { data } = await axios.put(
          `http://localhost:5000/api/products/${editingProduct._id}`,
          newProduct
        );
        setProducts(
          products.map((product) =>
            product._id === editingProduct._id ? data : product
          )
        );
        alert('Producto actualizado con éxito');
      } else {
        // Crear un nuevo producto
        const { data } = await axios.post('http://localhost:5000/api/products', newProduct);
        setProducts([...products, data]);
        alert('Producto agregado con éxito');
      }

      setNewProduct({ name: '', price: '' });
      setEditingProduct(null);
    } catch (error) {
      console.error('Error al guardar el producto:', error);
    }
  };

  // Eliminar un producto
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts(products.filter((product) => product._id !== id));
      alert('Producto eliminado con éxito');
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  // Editar un producto
  const editProduct = (product) => {
    setNewProduct({ name: product.name, price: product.price });
    setEditingProduct(product);
  };

  const addToCart = async (productId) => {
    try {
      await axios.post('http://localhost:5000/api/cart', { productId, quantity: 1 });
      alert('Producto agregado al carrito');
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error);
      alert('No se pudo agregar el producto al carrito');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Elimina el token de usuario
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  const goToCart = () => {
    navigate('/cart'); // Redirige al usuario a la página del carrito
  };

  return (
    <div style={styles.container}>
      <h1>Gestión de Productos</h1>

      {/* Formulario para agregar o editar un producto */}
      <div style={{ marginBottom: '20px' }}>
        <h2>{editingProduct ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          style={{ marginRight: '10px' }}
        />
        <button onClick={saveProduct}>
          {editingProduct ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
        {editingProduct && (
          <button
            onClick={() => {
              setNewProduct({ name: '', price: '' });
              setEditingProduct(null);
            }}
            style={{ marginLeft: '10px' }}
          >
            Cancelar
          </button>
        )}
      </div>

      {/* Lista de productos */}
      <ul>
        {products.map((product) => (
          <li key={product._id} style={{ marginBottom: '10px' }}>
            {product.name} - ${product.price}
            <button
              onClick={() => addToCart(product._id)}
              style={{ marginLeft: '10px', marginRight: '10px' }}
            >
              Agregar al carrito
            </button>
            <button
              onClick={() => editProduct(product)}
              style={{ marginRight: '10px' }}
            >
              Editar
            </button>
            <button
              onClick={() => deleteProduct(product._id)}
              style={{ backgroundColor: 'red', color: 'white' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div style={styles.buttons}>
        <button onClick={goToCart} style={styles.cartButton}>Ir al Carrito</button>
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
  cartButton: {
    backgroundColor: '#3498db',
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

export default ProductPage;