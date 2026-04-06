const { body } = require('express-validator')
const WorkerProfile = require('../models/WorkerProfile')
const Review = require('../models/Review')
const asyncHandler = require('../utils/asyncHandler')
const { distanceKmBetween } = require('../utils/distance')

const JAIPUR_COORDINATES = [75.7873, 26.9124]

function serializeWorker(worker, referenceCoords) {
  const distanceKm = distanceKmBetween(referenceCoords, worker.location.coordinates)
  return {
    id: worker._id,
    name: worker.user?.name,
    category: worker.category,
    location: `${worker.location.city}, ${worker.location.state}`,
    distanceKm,
    rating: worker.ratingAvg,
    experienceYears: worker.experienceYears,
    completedJobs: worker.completedJobs,
    verified: worker.verifiedBadge,
    skills: worker.skills,
    about: worker.about,
    fee: worker.baseFee,
    image: worker.profilePhoto,
    availability: worker.availability,
  }
}

const getWorkers = asyncHandler(async (req, res) => {
  const { category = 'All', minRating = 0, maxDistance = 100, location = '' } = req.query
  const lat = Number(req.query.lat)
  const lng = Number(req.query.lng)

  const query = { isActive: true }
  if (category !== 'All') {
    query.category = category
  }

  query.ratingAvg = { $gte: Number(minRating) || 0 }

  if (location) {
    query['location.city'] = { $regex: location, $options: 'i' }
  }

  const workers = await WorkerProfile.find(query).populate('user', 'name')

  const referenceCoords =
    Number.isFinite(lat) && Number.isFinite(lng) ? [lng, lat] : JAIPUR_COORDINATES

  const filtered = workers
    .map((worker) => serializeWorker(worker, referenceCoords))
    .filter((worker) => worker.distanceKm <= Number(maxDistance || 100))
    .sort((a, b) => b.rating - a.rating)

  return res.json(filtered)
})

const getWorkerById = asyncHandler(async (req, res) => {
  const worker = await WorkerProfile.findById(req.params.id).populate('user', 'name email')
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' })
  }

  const profile = serializeWorker(worker, JAIPUR_COORDINATES)
  return res.json({
    ...profile,
    verificationStatus: worker.verificationStatus,
    contactEmail: worker.user.email,
  })
})

const getTopRated = asyncHandler(async (req, res) => {
  const workers = await WorkerProfile.find({ isActive: true })
    .sort({ ratingAvg: -1, completedJobs: -1 })
    .limit(5)
    .populate('user', 'name')

  return res.json(workers.map((worker) => serializeWorker(worker, JAIPUR_COORDINATES)))
})

const getRecommended = asyncHandler(async (req, res) => {
  const workers = await WorkerProfile.find({ isActive: true, verifiedBadge: true })
    .sort({ completedJobs: -1, ratingAvg: -1 })
    .limit(6)
    .populate('user', 'name')

  return res.json(workers.map((worker) => serializeWorker(worker, JAIPUR_COORDINATES)))
})

const uploadVerificationValidation = [
  body('note').optional().isString().withMessage('Note must be a string'),
]

const uploadVerification = asyncHandler(async (req, res) => {
  const worker = await WorkerProfile.findOne({ user: req.user._id })
  if (!worker) {
    return res.status(404).json({ message: 'Worker profile not found' })
  }

  if (!req.file) {
    return res.status(400).json({ message: 'Verification document is required' })
  }

  worker.verificationDocs.push(req.file.path.replace(/\\/g, '/'))
  worker.verificationStatus = 'pending'
  await worker.save()

  return res.json({
    message: 'Verification document uploaded successfully',
    verificationStatus: worker.verificationStatus,
    file: req.file.path.replace(/\\/g, '/'),
  })
})

const getWorkerReviewsSummary = asyncHandler(async (req, res) => {
  const workerId = req.params.id
  const reviews = await Review.find({ worker: workerId }).populate('customer', 'name').sort({ createdAt: -1 })
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

module.exports = {
  getWorkers,
  getWorkerById,
  getTopRated,
  getRecommended,
  uploadVerificationValidation,
  uploadVerification,
  getWorkerReviewsSummary,
}
