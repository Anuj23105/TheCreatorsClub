const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
    worker: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkerProfile', required: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, trim: true, maxlength: 800 },
  },
  { timestamps: true },
)

module.exports = mongoose.model('Review', reviewSchema)
