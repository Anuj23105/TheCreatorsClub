const express = require('express')
const { createReviewValidation, getWorkerReviews, createReview } = require('../controllers/reviewController')
const { protect, authorize } = require('../middleware/auth')
const validate = require('../middleware/validate')

const router = express.Router()

router.get('/worker/:workerId', getWorkerReviews)
router.post('/', protect, authorize('customer'), createReviewValidation, validate, createReview)

module.exports = router
