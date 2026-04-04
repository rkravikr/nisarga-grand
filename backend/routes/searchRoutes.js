const express = require('express')
const router = express.Router()
const { searchDishes } = require('../controllers/searchController')

router.get('/', searchDishes)

module.exports = router
