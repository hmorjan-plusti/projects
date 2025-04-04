const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
});

// Agregar un nuevo producto
router.post('/', async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = new Product({ name, price });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar producto' });
  }
});

// Modificar un producto
router.put('/:id', async (req, res) => {
  const { name, price } = req.body;

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error al modificar producto' });
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar producto' });
  }
});

module.exports = router;