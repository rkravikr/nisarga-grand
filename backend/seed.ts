import * as dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import Category from './models/Category'
import Dish from './models/Dish'
// @ts-ignore
import { dishes, categories } from '../src/data/dishes'

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string)
    console.log('MongoDB Connected for Seeding')

    // 1. Wipe existing
    await Category.deleteMany()
    await Dish.deleteMany()

    // 2. Insert Categories
    for (const name of categories) {
      await Category.create({ name })
    }

    // 3. Insert all Dishes
    for (const dish of dishes) {
      await Dish.create({
        name: dish.name,
        price: dish.price,
        category: dish.category,
        description: dish.description,
        image: dish.image,
        tags: dish.tags,
        rating: dish.rating,
        isBestseller: dish.isBestseller || false,
        isPopular: dish.isPopular || false,
        isNewItem: dish.isNew || false,
        isAvailable: true
      })
    }

    console.log(`Seeding Success! Inserted ${dishes.length} dishes.`)
    process.exit()
  } catch (err) {
    console.error('Seeding Error:', err)
    process.exit(1)
  }
}

seedData()
