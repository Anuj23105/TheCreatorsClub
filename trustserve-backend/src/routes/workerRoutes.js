const express = require('express')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const {
  getWorkers,
  getWorkerById,
  getTopRated,
  getRecommended,
  uploadVerificationValidation,
  uploadVerification,
  getWorkerReviewsSummary,
} = require('../controllers/workerController')
const { protect, authorize } = require('../middleware/auth')
const validate = require('../middleware/validate')

const router = express.Router()

const uploadsDir = process.env.VERCEL
  ? path.join('/tmp', 'uploads', 'verification')
  : path.join(process.cwd(), 'uploads', 'verification')

fs.mkdirSync(uploadsDir, { recursive: true })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`)
  },
})

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
})

router.get('/', getWorkers)
router.get('/top-rated', getTopRated)
router.get('/recommended', getRecommended)
router.get('/:id', getWorkerById)
router.get('/:id/reviews', getWorkerReviewsSummary)
router.post(
  '/verification/upload',
  protect,
  authorize('worker'),
  upload.single('document'),
  uploadVerificationValidation,
  validate,
  uploadVerification,
)

module.exports = router
