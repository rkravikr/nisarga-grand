const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        dishId: { type: mongoose.Schema.Types.ObjectId, ref: 'Dish' },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    customerName: { type: String, default: 'Guest' },
    phone: { type: String, default: 'N/A' },
    type: { type: String, enum: ['dine-in', 'takeaway'], required: true },
    tableNo: { type: String },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'preparing', 'completed', 'cancelled'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)
module.exports = Order
