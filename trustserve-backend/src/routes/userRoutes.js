const express = require('express')
const { protect, authorize } = require('../middleware/auth')
const { getSavedWorkers, toggleSavedWorker } = require('../controllers/userController')

const router = express.Router()

router.get('/saved-workers', protect, authorize('customer'), getSavedWorkers)
router.post('/saved-workers/:workerId', protect, authorize('customer'), toggleSavedWorker)

module.exports = router
