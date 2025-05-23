const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');

// Obtener el carrito actual (no comprado)
router.get('/', async (req, res) => {
  try {
    let cart = await Cart.findOne({ isPurchased: false }).populate('products.product');
    if (!cart) {
      // Si no existe un carrito actual, crear uno nuevo
      cart = new Cart({ products: [] });
      await cart.save();
    }
    res.json(cart);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ message: 'Error al obtener el carrito' });
  }
});

// Agregar un producto al carrito
router.post('/', async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ isPurchased: false });
    if (!cart) {
      cart = new Cart({ products: [] });
    }

    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    res.status(500).json({ message: 'Error al agregar producto al carrito' });
  }
});

// Eliminar un producto del carrito
router.delete('/:productId', async (req, res) => {
  try {
    let cart = await Cart.findOne({ isPurchased: false });
    if (!cart) {
      return res.status(404).json({ message: 'Carrito no encontrado' });
    }

    // Filtrar los productos para eliminar el producto especificado
    cart.products = cart.products.filter(
      (item) => item.product.toString() !== req.params.productId
    );

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error al eliminar producto del carrito:', error);
    res.status(500).json({ message: 'Error al eliminar producto del carrito' });
  }
});

// Realizar una compra
router.post('/checkout', async (req, res) => {
  try {
    // Buscar el carrito actual (no comprado)
    let cart = await Cart.findOne({ isPurchased: false }).populate('products.product');
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: 'El carrito está vacío' });
    }

    // Validar que los productos existan en la base de datos
    const invalidProducts = cart.products.filter((item) => !item.product);
    if (invalidProducts.length > 0) {
      return res.status(400).json({
        message: 'Algunos productos en el carrito ya no están disponibles',
        invalidProducts,
      });
    }

    // Calcular el monto total
    const totalAmount = cart.products.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // Obtener el último número de compra
    const lastPurchase = await Cart.findOne({ isPurchased: true })
      .sort({ purchaseNumber: -1 })
      .select('purchaseNumber');

    const nextPurchaseNumber = lastPurchase ? lastPurchase.purchaseNumber + 1 : 1;

    // Obtener los nombres y cantidades de los productos comprados
    const purchasedProducts = cart.products.map((item) => ({
      name: item.product.name,
      quantity: item.quantity,
    }));

    // Marcar el carrito como comprado
    cart.isPurchased = true;
    cart.purchasedAt = new Date();
    cart.purchaseNumber = nextPurchaseNumber;
    cart.totalAmount = totalAmount;
    cart.purchasedProducts = purchasedProducts;
    await cart.save();

    // Crear un nuevo carrito vacío
    const newCart = new Cart({ products: [] });
    await newCart.save();

    // Responder al cliente
    res.json({
      message: 'Compra realizada con éxito',
      totalAmount,
      purchaseNumber: cart.purchaseNumber,
      purchasedProducts,
      newCart,
    });
  } catch (error) {
    console.error('Error al realizar la compra:', error);
    res.status(500).json({ message: 'Error al realizar la compra', error: error.message });
  }
});

module.exports = router;