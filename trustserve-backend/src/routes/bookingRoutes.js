const express = require('express')
const {
  createBookingValidation,
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatusValidation,
  updateBookingStatus,
} = require('../controllers/bookingController')
const { protect, authorize } = require('../middleware/auth')
const validate = require('../middleware/validate')

const router = express.Router()

router.post('/', protect, authorize('customer'), createBookingValidation, validate, createBooking)
router.get('/me', protect, getMyBookings)
router.get('/:id', protect, getBookingById)
router.patch(
  '/:id/status',
  protect,
  authorize('worker'),
  updateBookingStatusValidation,
  validate,
  updateBookingStatus,
)

module.exports = router
