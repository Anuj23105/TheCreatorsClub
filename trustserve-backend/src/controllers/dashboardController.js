const Booking = require('../models/Booking')
const Review = require('../models/Review')
const WorkerProfile = require('../models/WorkerProfile')
const asyncHandler = require('../utils/asyncHandler')

const getWorkerDashboard = asyncHandler(async (req, res) => {
  const worker = await WorkerProfile.findOne({ user: req.user._id }).populate('user', 'name email')
  if (!worker) {
    return res.status(404).json({ message: 'Worker profile not found' })
  }

  const jobs = await Booking.find({ worker: worker._id }).sort({ createdAt: -1 }).limit(20)
  const incomingJobs = jobs.filter((job) => ['finding_worker', 'worker_assigned'].includes(job.status))

  const completedJobs = jobs.filter((job) => job.status === 'completed')
  const totalEarnings = completedJobs.reduce((sum, booking) => sum + booking.totalAmount, 0)

  return res.json({
    worker: {
      id: worker._id,
      name: worker.user?.name,
      category: worker.category,
      verifiedBadge: worker.verifiedBadge,
      verificationStatus: worker.verificationStatus,
    },
    summary: {
      totalEarnings,
      monthlyEarnings: totalEarnings,
      completedJobs: worker.completedJobs,
      acceptanceRate: jobs.length ? Math.round((incomingJobs.length / jobs.length) * 100) : 100,
    },
    incomingJobs,
  })
})

const getUserDashboard = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ customer: req.user._id })
    .populate({ path: 'worker', populate: { path: 'user', select: 'name' } })
    .sort({ createdAt: -1 })

  const activeBookings = bookings.filter((booking) => !['completed', 'cancelled'].includes(booking.status))
  const completedBookings = bookings.filter((booking) => booking.status === 'completed')

  const reviewedBookingIds = await Review.find({ customer: req.user._id }).distinct('booking')
  const pendingReviews = completedBookings.filter(
    (booking) => !reviewedBookingIds.some((id) => String(id) === String(booking._id)),
  )

  return res.json({
    summary: {
      activeBookings: activeBookings.length,
      completedBookings: completedBookings.length,
      savedWorkers: req.user.savedWorkers.length,
      pendingReviews: pendingReviews.length,
    },
    bookings,
  })
})

module.exports = {
  getWorkerDashboard,
  getUserDashboard,
}
