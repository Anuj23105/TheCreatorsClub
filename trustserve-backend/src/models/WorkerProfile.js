const mongoose = require('mongoose')

const workerProfileSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    category: { type: String, required: true },
    skills: [{ type: String }],
    experienceYears: { type: Number, default: 0 },
    completedJobs: { type: Number, default: 0 },
    about: { type: String, default: '' },
    profilePhoto: { type: String, default: '' },
    baseFee: { type: Number, default: 0 },
    verifiedBadge: { type: Boolean, default: false },
    verificationStatus: { type: String, enum: ['pending', 'verified', 'rejected'], default: 'pending' },
    verificationDocs: [{ type: String }],
    ratingAvg: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    availability: [{ type: String }],
    location: {
      city: { type: String, required: true },
      state: { type: String, required: true },
      coordinates: {
        type: [Number],
        default: [75.7873, 26.9124],
      },
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
)

workerProfileSchema.index({ 'location.coordinates': '2dsphere' })

module.exports = mongoose.model('WorkerProfile', workerProfileSchema)
