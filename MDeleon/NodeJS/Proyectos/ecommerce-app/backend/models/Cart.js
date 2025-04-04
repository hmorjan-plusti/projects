const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        required: true,
        default: 1,
      },
    },
  ],
  isPurchased: {
    type: Boolean,
    default: false, // Indica si el carrito ha sido comprado
  },
  purchasedAt: {
    type: Date, // Fecha de compra
  },
  purchaseNumber: {
    type: Number, // Número correlativo de la compra
  },
  totalAmount: {
    type: Number, // Monto total de la compra
  },
  purchasedProducts: [
    {
      name: String, // Nombre del producto
      quantity: Number, // Cantidad comprada
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);