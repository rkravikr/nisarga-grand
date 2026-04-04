export interface Dish {
  _id?: string
  id?: string // Legacy frontend ID / mapping for _id
  name: string
  description: string
  price: number
  image: string
  category: 'South Indian' | 'North Indian' | 'Chinese & Starters' | 'Beverages'
  tags: string[]
  rating: number
  isPopular?: boolean
  isBestseller?: boolean
  isNew?: boolean
  isNewItem?: boolean // Match backend schema
  isAvailable?: boolean
}

export const dishes: Dish[] = [
  // South Indian
  {
    id: 'si-1',
    name: 'Masala Dosa',
    description: 'Crispy golden dosa filled with spiced potato masala, served with coconut chutney & sambar.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    category: 'South Indian',
    tags: ['Crispy', 'Classic'],
    rating: 4.8,
    isBestseller: true,
  },
  {
    id: 'si-2',
    name: 'Idly-Vada',
    description: 'Soft steamed rice cakes and a crunchy lintel fritter served with piping hot sambar and chutneys.',
    price: 70,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    category: 'South Indian',
    tags: ['Classic', 'Breakfast'],
    rating: 4.8,
    isPopular: true,
  },
  {
    id: 'si-3',
    name: 'Open Cheese Dosa',
    description: 'A standout masterpiece! Thick, fluffy dosa topped with generous butter, masala, and grated cheese.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    category: 'South Indian',
    tags: ['Masterpiece', 'Indulgent'],
    rating: 5.0,
    isBestseller: true,
  },
  {
    id: 'si-4',
    name: 'South Indian Thali',
    description: 'A grand feast featuring rice, sambar, rasam, palya, pooris, sweet, and buttermilk.',
    price: 150,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    category: 'South Indian',
    tags: ['Feast', 'Filling'],
    rating: 4.6,
  },
  {
    id: 'si-6',
    name: 'Poori Bhaaji',
    description: 'Fresh, piping hot pooris served with a home-style potato and onion bhaaji.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    category: 'South Indian',
    tags: ['Breakfast', 'Hot'],
    rating: 4.7,
  },
  {
    id: 'si-4',
    name: 'Rava Dosa',
    description: 'Lacy, crispy semolina dosa with onion and green chili, served instantly.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&q=80',
    category: 'South Indian',
    tags: ['Crispy', 'Quick'],
    rating: 4.6,
  },
  {
    id: 'si-5',
    name: 'Bisi Bele Bath',
    description: `Karnataka's signature one-pot comfort dish of rice, lentils & vegetables in aromatic spices.`,
    price: 100,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    category: 'South Indian',
    tags: ['Comfort', 'Filling'],
    rating: 4.7,
    isNew: true,
  },

  // North Indian
  {
    id: 'ni-1',
    name: 'Paneer Butter Masala',
    description: 'Cottage cheese cubes in rich, creamy tomato-butter gravy with aromatic spices.',
    price: 180,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=600&q=80',
    category: 'North Indian',
    tags: ['Rich', 'Creamy'],
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: 'ni-2',
    name: 'Dal Makhani',
    description: 'Black lentils slow-cooked overnight with butter and cream — the king of dals.',
    price: 160,
    image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=600&q=80',
    category: 'North Indian',
    tags: ['Slow-cooked', 'Rich'],
    rating: 4.8,
    isPopular: true,
  },
  {
    id: 'ni-3',
    name: 'Butter Naan',
    description: 'Soft, pillowy leavened bread baked in tandoor and brushed with golden butter.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1574894709920-11b28be1103a?w=600&q=80',
    category: 'North Indian',
    tags: ['Bread', 'Classic'],
    rating: 4.6,
  },
  {
    id: 'ni-4',
    name: 'Veg Biryani',
    description: 'Fragrant basmati rice layered with seasonal vegetables and whole spices.',
    price: 200,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&q=80',
    category: 'North Indian',
    tags: ['Aromatic', 'Filling'],
    rating: 4.8,
    isBestseller: true,
  },
  {
    id: 'ni-5',
    name: 'Chole Bhature',
    description: 'Spiced chickpea curry served with puffed, golden deep-fried bhature bread.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=600&q=80',
    category: 'North Indian',
    tags: ['Spicy', 'Indulgent'],
    rating: 4.6,
  },

  // Chinese & Starters
  {
    id: 'ff-1',
    name: 'Gobi Kebab',
    description: 'Cauliflower florets marinated in vibrant Indian spices and deep-fried to crisp perfection.',
    price: 140,
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?w=600&q=80',
    category: 'Chinese & Starters',
    tags: ['Starter', 'Crispy'],
    rating: 4.6,
    isPopular: true,
  },
  {
    id: 'ff-2',
    name: 'Paneer Pepper Dry',
    description: 'Cubes of cottage cheese tossed with bell peppers, freshly cracked black pepper and soy.',
    price: 170,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&q=80',
    category: 'Chinese & Starters',
    tags: ['Spicy', 'Appetizer'],
    rating: 4.7,
    isBestseller: true,
  },
  {
    id: 'ff-3',
    name: 'Hot & Sour Soup',
    description: 'A comforting, tangy, and spicy broth filled with finely chopped vegetables and tofu.',
    price: 90,
    image: 'https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?w=600&q=80',
    category: 'Chinese & Starters',
    tags: ['Warm', 'Soup'],
    rating: 4.5,
  },
  {
    id: 'ff-4',
    name: 'Baby Corn Kebab',
    description: 'Tender baby corn coated in a seasoned batter and fried until golden and crunchy.',
    price: 130,
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=600&q=80',
    category: 'Chinese & Starters',
    tags: ['Crunchy', 'Snack'],
    rating: 4.4,
    isNew: true,
  },

  // Beverages
  {
    id: 'bv-1',
    name: 'Mango Lassi',
    description: 'Thick, creamy yogurt blended with ripe Alphonso mangoes and a hint of cardamom.',
    price: 80,
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?w=600&q=80',
    category: 'Beverages',
    tags: ['Chilled', 'Sweet'],
    rating: 4.9,
    isBestseller: true,
  },
  {
    id: 'bv-2',
    name: 'Filter Coffee',
    description: 'South Indian devanalli filter coffee — strong, aromatic, and served in a traditional davara.',
    price: 40,
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80',
    category: 'Beverages',
    tags: ['Hot', 'Classic'],
    rating: 4.8,
    isPopular: true,
  },
  {
    id: 'bv-3',
    name: 'Fresh Lime Soda',
    description: 'Refreshing fresh lime squeezed over fizzy soda — sweet, salted, or mixed.',
    price: 50,
    image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=600&q=80',
    category: 'Beverages',
    tags: ['Refreshing', 'Fizzy'],
    rating: 4.6,
  },
  {
    id: 'bv-4',
    name: 'Rose Milk',
    description: 'Chilled full-cream milk infused with aromatic rose syrup and sabja seeds.',
    price: 60,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&q=80',
    category: 'Beverages',
    tags: ['Chilled', 'Floral'],
    rating: 4.5,
    isNew: true,
  },
]

export const getFeaturedDishes = () =>
  dishes.filter((d) => d.isBestseller || d.isPopular).slice(0, 6)

export const getMenuPreviewDishes = () => dishes.slice(0, 8)

export const categories = ['South Indian', 'North Indian', 'Chinese & Starters', 'Beverages'] as const
