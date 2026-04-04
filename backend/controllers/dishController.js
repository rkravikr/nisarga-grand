const Dish = require('../models/Dish')

// @desc    Fetch all dishes
// @route   GET /api/dishes
// @access  Public
const getDishes = async (req, res) => {
  try {
    const dishes = await Dish.find({})
    res.json(dishes)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Create a dish
// @route   POST /api/dishes
// @access  Private/Admin
const createDish = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      isAvailable,
      isPopular,
      isBestseller,
      isNewItem,
    } = req.body

    const image = req.file ? `/uploads/${req.file.filename}` : (req.body.image || '')

    const dish = new Dish({
      name,
      price,
      category,
      description,
      image,
      isAvailable: isAvailable === 'true' || isAvailable === true,
      isPopular: isPopular === 'true' || isPopular === true,
      isBestseller: isBestseller === 'true' || isBestseller === true,
      isNewItem: isNewItem === 'true' || isNewItem === true,
    })

    const createdDish = await dish.save()
    res.status(201).json(createdDish)
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Update a dish
// @route   PUT /api/dishes/:id
// @access  Private/Admin
const updateDish = async (req, res) => {
  try {
    const {
      name,
      price,
      category,
      description,
      isAvailable,
      isPopular,
      isBestseller,
      isNewItem,
    } = req.body

    const dish = await Dish.findById(req.params.id)

    if (dish) {
      dish.name = name || dish.name
      dish.price = price || dish.price
      dish.category = category || dish.category
      dish.description = description || dish.description
      
      if (req.file) {
        dish.image = `/uploads/${req.file.filename}`
      } else if (req.body.image) {
        dish.image = req.body.image
      }

      if (isAvailable !== undefined) dish.isAvailable = isAvailable === 'true' || isAvailable === true
      if (isPopular !== undefined) dish.isPopular = isPopular === 'true' || isPopular === true
      if (isBestseller !== undefined) dish.isBestseller = isBestseller === 'true' || isBestseller === true
      if (isNewItem !== undefined) dish.isNewItem = isNewItem === 'true' || isNewItem === true

      const updatedDish = await dish.save()
      res.json(updatedDish)
    } else {
      res.status(404).json({ message: 'Dish not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

// @desc    Delete a dish
// @route   DELETE /api/dishes/:id
// @access  Private/Admin
const deleteDish = async (req, res) => {
  try {
    const dish = await Dish.findById(req.params.id)

    if (dish) {
      await dish.deleteOne()
      res.json({ message: 'Dish removed' })
    } else {
      res.status(404).json({ message: 'Dish not found' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' })
  }
}

module.exports = {
  getDishes,
  createDish,
  updateDish,
  deleteDish,
}
