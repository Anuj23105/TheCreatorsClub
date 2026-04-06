const User = require('../models/User')
const WorkerProfile = require('../models/WorkerProfile')
const asyncHandler = require('../utils/asyncHandler')

const getSavedWorkers = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate({
    path: 'savedWorkers',
    populate: { path: 'user', select: 'name' },
  })

  return res.json(
    user.savedWorkers.map((worker) => ({
      id: worker._id,
      name: worker.user?.name,
      category: worker.category,
      rating: worker.ratingAvg,
      verified: worker.verifiedBadge,
      location: `${worker.location.city}, ${worker.location.state}`,
    })),
  )
})

const toggleSavedWorker = asyncHandler(async (req, res) => {
  const { workerId } = req.params

  const worker = await WorkerProfile.findById(workerId)
  if (!worker) {
    return res.status(404).json({ message: 'Worker not found' })
  }

  const user = await User.findById(req.user._id)
  const exists = user.savedWorkers.some((id) => String(id) === String(workerId))

  if (exists) {
    user.savedWorkers = user.savedWorkers.filter((id) => String(id) !== String(workerId))
  } else {
    user.savedWorkers.push(workerId)
  }

  await user.save()

  return res.json({
    message: exists ? 'Worker removed from saved list' : 'Worker added to saved list',
    savedWorkers: user.savedWorkers,
  })
})

module.exports = {
  getSavedWorkers,
  toggleSavedWorker,
}
