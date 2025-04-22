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
    type: Number, 
  },
  purchasedProducts: [
    {
      name: String, 
      quantity: Number, 
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);