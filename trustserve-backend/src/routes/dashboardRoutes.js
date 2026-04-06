const express = require('express')
const { getWorkerDashboard, getUserDashboard } = require('../controllers/dashboardController')
const { protect, authorize } = require('../middleware/auth')

const router = express.Router()

router.get('/worker', protect, authorize('worker'), getWorkerDashboard)
router.get('/user', protect, authorize('customer'), getUserDashboard)

module.exports = router
