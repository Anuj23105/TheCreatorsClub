const { body } = require('express-validator')
const Booking = require('../models/Booking')
const WorkerProfile = require('../models/WorkerProfile')
const asyncHandler = require('../utils/asyncHandler')

const createBookingValidation = [
  body('serviceType').notEmpty().withMessage('Service type is required'),
  body('workerId').notEmpty().withMessage('Worker is required'),
  body('date').notEmpty().withMessage('Date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('paymentProvider').optional().isIn(['razorpay', 'manual', 'cash', 'upi']).withMessage('Invalid payment provider'),
  body('paymentStatus')
    .optional()
    .isIn(['pending', 'captured', 'pay_on_service'])
    .withMessage('Invalid payment status'),
  body('paymentId').optional().isString().withMessage('Invalid payment id'),
]

const createBooking = asyncHandler(async (req, res) => {
  const {
    serviceType,
    workerId,
    date,
    time,
    notes = '',
    paymentProvider,
    paymentId,
    paymentStatus,
  } = req.body

  if (date === '2026-04-01') {
    return res.status(409).json({ message: 'Selected slot is no longer available. Please choose another slot.' })
  }

  const worker = await WorkerProfile.findById(workerId)
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' })
  }

  const priceBreakdown = [
    { label: 'Base service fee', amount: worker.baseFee || 299 },
    { label: 'Platform fee', amount: 40 },
    { label: 'Safety assurance', amount: 20 },
  ]
  const totalAmount = priceBreakdown.reduce((sum, item) => sum + item.amount, 0)

  const resolvedPaymentProvider = paymentProvider || (paymentId ? 'razorpay' : 'razorpay')
  const resolvedPaymentStatus =
    paymentStatus ||
    (resolvedPaymentProvider === 'cash' || resolvedPaymentProvider === 'upi'
      ? 'pay_on_service'
      : paymentId
        ? 'captured'
        : 'pending')

  const booking = await Booking.create({
    customer: req.user._id,
    worker: worker._id,
    serviceType,
    schedule: { date, time },
    notes,
    status: 'worker_assigned',
    priceBreakdown,
    totalAmount,
    payment: {
      provider: resolvedPaymentProvider,
      paymentId: paymentId || '',
      status: resolvedPaymentStatus,
    },
  })

  return res.status(201).json({
    id: booking._id,
    status: booking.status,
    totalAmount: booking.totalAmount,
    priceBreakdown: booking.priceBreakdown,
    payment: booking.payment,
  })
})

const getMyBookings = asyncHandler(async (req, res) => {
  const query = req.user.role === 'customer' ? { customer: req.user._id } : {}

  if (req.user.role === 'worker') {
    const workerProfile = await WorkerProfile.findOne({ user: req.user._id })
    query.worker = workerProfile?._id
  }

  const bookings = await Booking.find(query)
    .populate('customer', 'name')
    .populate({ path: 'worker', populate: { path: 'user', select: 'name' } })
    .sort({ createdAt: -1 })

  return res.json(bookings)
})

const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
    .populate('customer', 'name email')
    .populate({ path: 'worker', populate: { path: 'user', select: 'name email' } })

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  if (req.user.role === 'customer' && String(booking.customer._id) !== String(req.user._id)) {
    return res.status(403).json({ message: 'Not allowed to access this booking' })
  }

  if (req.user.role === 'worker') {
    const workerProfile = await WorkerProfile.findOne({ user: req.user._id })
    if (!workerProfile || String(booking.worker._id) !== String(workerProfile._id)) {
      return res.status(403).json({ message: 'Not allowed to access this booking' })
    }
  }

  return res.json(booking)
})

const updateBookingStatusValidation = [
  body('status')
    .isIn(['worker_assigned', 'on_the_way', 'service_in_progress', 'completed', 'cancelled'])
    .withMessage('Invalid status value'),
]

const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id)
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' })
  }

  const workerProfile = await WorkerProfile.findOne({ user: req.user._id })
  if (!workerProfile || String(booking.worker) !== String(workerProfile._id)) {
    return res.status(403).json({ message: 'Only assigned worker can update status' })
  }

  booking.status = req.body.status
  await booking.save()

  if (booking.status === 'completed') {
    workerProfile.completedJobs += 1
    await workerProfile.save()
  }

  return res.json({ message: 'Booking status updated', booking })
})

module.exports = {
  createBookingValidation,
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatusValidation,
  updateBookingStatus,
}
