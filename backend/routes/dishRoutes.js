const express = require('express')
const router = express.Router()
const {
  getDishes,
  createDish,
  updateDish,
  deleteDish,
} = require('../controllers/dishController')
const { protect } = require('../middleware/authMiddleware')
const upload = require('../middleware/upload')

router
  .route('/')
  .get(getDishes)
  .post(protect, upload.single('image'), createDish)

router
  .route('/:id')
  .put(protect, upload.single('image'), updateDish)
  .delete(protect, deleteDish)

module.exports = router
