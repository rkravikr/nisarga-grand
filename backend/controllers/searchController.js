const Dish = require('../models/Dish')

// @desc    Search dishes by name
// @route   GET /api/search?q=
// @access  Public
const searchDishes = async (req, res) => {
  try {
    const query = req.query.q

    if (!query) {
      return res.json([])
    }

    // Perform case-insensitive regex search on the Dish 'name' field
    const dishes = await Dish.find({
      name: { $regex: query, $options: 'i' },
      isAvailable: true // Assuming customers only search available dishes
    })

    res.json(dishes)
  } catch (error) {
    res.status(500).json({ message: 'Server Error during search' })
  }
}

module.exports = {
  searchDishes,
}
