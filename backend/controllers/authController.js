const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    // Check for user email
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Register a new admin (Can be disabled in prod)
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Please add all fields' })
  }

  try {
    // Check if user exists
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create user
    const user = await User.create({
      email,
      password: hashedPassword,
    })

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(400).json({ message: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

// @desc    Get current logged in user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  res.status(200).json({
    id: req.user._id,
    email: req.user.email,
  })
}

module.exports = {
  loginUser,
  registerUser,
  getMe,
}
