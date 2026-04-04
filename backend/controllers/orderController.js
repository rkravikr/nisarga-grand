const Order = require('../models/Order')

// @desc    Create new order
// @route   POST /api/orders
// @access  Public
const createOrder = async (req, res) => {
  try {
    const { items, total, customerName, phone, type, tableNo } = req.body

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' })
    }

    const order = new Order({
      customerName,
      phone,
      type,
      tableNo,
      items,
      total,
      status: 'pending',
    })

    const createdOrder = await order.save()
    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    // Sort by newest first
    const orders = await Order.find({}).sort({ createdAt: -1 })
    res.json(orders)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Update order status
// @route   PUT /api/orders/:id
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true, runValidators: false } // Allows updating status even if old test orders lack customerName
    )

    if (updatedOrder) {
      res.json(updatedOrder)
    } else {
      res.status(404).json({ message: 'Order not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = {
  createOrder,
  getOrders,
  updateOrderStatus,
}
