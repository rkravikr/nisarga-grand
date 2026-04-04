const mongoose = require('mongoose')

const dishSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      // Typically an ObjectId ref, but we will keep as String to easily match the existing frontend string enum model.
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    tags: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 4.5,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
    isBestseller: {
      type: Boolean,
      default: false,
    },
    isNewItem: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Dish = mongoose.model('Dish', dishSchema)
module.exports = Dish
