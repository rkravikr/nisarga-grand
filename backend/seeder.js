require('dotenv').config()
const mongoose = require('mongoose')
const Category = require('./models/Category')
const Dish = require('./models/Dish')

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB Connected for Full Seeding')

    await Category.deleteMany()
    await Dish.deleteMany()

    const categories = ['South Indian', 'North Indian', 'Chinese & Starters', 'Beverages']
    for (const name of categories) {
      await Category.create({ name })
    }

    const dishes = [
      {
        name: 'Masala Dosa',
        description: 'Crispy golden dosa filled with spiced potato masala, served with coconut chutney & sambar.',
        price: 80,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
        category: 'South Indian',
        isBestseller: true,
      },
      {
        name: 'Idly-Vada',
        description: 'Soft steamed rice cakes and a crunchy lintel fritter served with piping hot sambar.',
        price: 70,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        category: 'South Indian',
        isPopular: true,
      },
      {
        name: 'Open Cheese Dosa',
        description: 'A standout masterpiece! Thick, fluffy dosa topped with generous butter, masala, and grated cheese.',
        price: 120,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
        category: 'South Indian',
        isBestseller: true,
      },
      {
        name: 'South Indian Thali',
        description: 'A grand feast featuring rice, sambar, rasam, palya, pooris, sweet, and buttermilk.',
        price: 150,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
        category: 'South Indian',
      },
      {
        name: 'Poori Bhaaji',
        description: 'Fresh, piping hot pooris served with a home-style potato and onion bhaaji.',
        price: 80,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        category: 'South Indian',
      },
      {
        name: 'Rava Dosa',
        description: 'Lacy, crispy semolina dosa with onion and green chili, served instantly.',
        price: 90,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
        category: 'South Indian',
      },
      {
        name: 'Bisi Bele Bath',
        description: 'Karnataka signature one-pot comfort dish of rice, lentils & vegetables.',
        price: 100,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        category: 'South Indian',
        isNewItem: true,
      },
      {
        name: 'Paneer Butter Masala',
        description: 'Cottage cheese cubes in rich, creamy tomato-butter gravy with aromatic spices.',
        price: 180,
        image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
        category: 'North Indian',
        isBestseller: true,
      },
      {
        name: 'Dal Makhani',
        description: 'Black lentils slow-cooked overnight with butter and cream — the king of dals.',
        price: 160,
        image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
        category: 'North Indian',
        isPopular: true,
      },
      {
        name: 'Butter Naan',
        description: 'Soft, pillowy leavened bread baked in tandoor and brushed with golden butter.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1574894709920-11b28be1103a?w=600&q=80',
        category: 'North Indian',
      },
      {
        name: 'Veg Biryani',
        description: 'Fragrant basmati rice layered with seasonal vegetables and whole spices.',
        price: 200,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
        category: 'North Indian',
        isBestseller: true,
      },
      {
        name: 'Chole Bhature',
        description: 'Spiced chickpea curry served with puffed, golden deep-fried bhature bread.',
        price: 130,
        image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
        category: 'North Indian',
      },
      {
        name: 'Gobi Kebab',
        description: 'Cauliflower florets marinated in vibrant Indian spices and deep-fried to crisp perfection.',
        price: 140,
        image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
        category: 'Chinese & Starters',
        isPopular: true,
      },
      {
        name: 'Paneer Pepper Dry',
        description: 'Cubes of cottage cheese tossed with bell peppers, freshly cracked black pepper and soy.',
        price: 170,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
        category: 'Chinese & Starters',
        isBestseller: true,
      },
      {
        name: 'Hot & Sour Soup',
        description: 'A comforting, tangy, and spicy broth filled with finely chopped vegetables and tofu.',
        price: 90,
        image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80',
        category: 'Chinese & Starters',
      },
      {
        name: 'Baby Corn Kebab',
        description: 'Tender baby corn coated in a seasoned batter and fried until golden and crunchy.',
        price: 130,
        image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
        category: 'Chinese & Starters',
        isNewItem: true,
      },
      {
        name: 'Mango Lassi',
        description: 'Thick, creamy yogurt blended with ripe Alphonso mangoes and a hint of cardamom.',
        price: 80,
        image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80',
        category: 'Beverages',
        isBestseller: true,
      },
      {
        name: 'Filter Coffee',
        description: 'South Indian devanalli filter coffee — strong, aromatic, and served in a traditional davara.',
        price: 40,
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
        category: 'Beverages',
        isPopular: true,
      },
      {
        name: 'Fresh Lime Soda',
        description: 'Refreshing fresh lime squeezed over fizzy soda — sweet, salted, or mixed.',
        price: 50,
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
        category: 'Beverages',
      },
      {
        name: 'Rose Milk',
        description: 'Chilled full-cream milk infused with aromatic rose syrup and sabja seeds.',
        price: 60,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
        category: 'Beverages',
        isNewItem: true,
      }
    ]

    for (const dish of dishes) {
      await Dish.create({ ...dish, isAvailable: true })
    }

    console.log(`Successfully seeded all ${dishes.length} dishes to MongoDB!`)
    process.exit()
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

seedData()
