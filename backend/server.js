require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const connectDB = require('./config/db')

// Connect to Database
connectDB()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))) // Serve statically as requested

// Routes
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/dishes', require('./routes/dishRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))
app.use('/api/search', require('./routes/searchRoutes'))

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is healthy' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})
