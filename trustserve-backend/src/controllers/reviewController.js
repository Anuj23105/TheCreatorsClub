const { body } = require('express-validator')
const Review = require('../models/Review')
const WorkerProfile = require('../models/WorkerProfile')
const Booking = require('../models/Booking')
const asyncHandler = require('../utils/asyncHandler')

const createReviewValidation = [
  body('workerId').notEmpty().withMessage('Worker id is required'),
  body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').isLength({ min: 2 }).withMessage('Comment is required'),
]

const getWorkerReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ worker: req.params.workerId })
    .populate('customer', 'name')
    .sort({ createdAt: -1 })

  return res.json(
    reviews.map((review) => ({
      id: review._id,
      user: review.customer?.name || 'Anonymous',
      rating: review.rating,
      comment: review.comment,
      createdAt: review.createdAt,
    })),
  )
})

const createReview = asyncHandler(async (req, res) => {
  const { workerId, rating, comment, bookingId } = req.body

  const worker = await WorkerProfile.findById(workerId)
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' })
  }

  if (bookingId) {
    const booking = await Booking.findById(bookingId)
    if (!booking || String(booking.customer) !== String(req.user._id)) {
      return res.status(403).json({ message: 'Invalid booking for review' })
    }
  }

  const review = await Review.create({
    worker: worker._id,
    customer: req.user._id,
    booking: bookingId || undefined,
    rating,
    comment,
  })

  const agg = await Review.aggregate([
    { $match: { worker: worker._id } },
    {
      $group: {
        _id: '$worker',
        avgRating: { $avg: '$rating' },
        count: { $sum: 1 },
      },
    },
  ])

  worker.ratingAvg = Number((agg[0]?.avgRating || 0).toFixed(1))
  worker.ratingCount = agg[0]?.count || 0
  await worker.save()

  return res.status(201).json({
    id: review._id,
    user: req.user.name,
    rating: review.rating,
    comment: review.comment,
    createdAt: review.createdAt,
  })
})

module.exports = {
  createReviewValidation,
  getWorkerReviews,
  createReview,
}
