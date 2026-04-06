const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema(
  {
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkerProfile', required: true },
    serviceType: { type: String, required: true },
    schedule: {
      date: { type: String, required: true },
      time: { type: String, required: true },
    },
    notes: { type: String, default: '' },
    status: {
      type: String,
      enum: [
        'finding_worker',
        'worker_assigned',
        'on_the_way',
        'service_in_progress',
        'completed',
        'cancelled',
      ],
      default: 'finding_worker',
    },
    priceBreakdown: [
      {
        label: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },

    payment: {
      provider: {
        type: String,
        enum: ['razorpay', 'manual', 'cash', 'upi'],
        default: 'razorpay',
      },
      paymentId: { type: String, default: '' },
      status: {
        type: String,
        enum: ['pending', 'captured', 'pay_on_service'],
        default: 'pending',
      },
    },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Booking', bookingSchema)
