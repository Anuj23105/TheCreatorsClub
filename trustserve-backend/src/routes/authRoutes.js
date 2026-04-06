const express = require('express')
const validate = require('../middleware/validate')
const { protect } = require('../middleware/auth')
const {
  registerValidation,
  loginValidation,
  register,
  login,
  me,
} = require('../controllers/authController')

const router = express.Router()

router.post('/register', registerValidation, validate, register)
router.post('/login', loginValidation, validate, login)
router.get('/me', protect, me)

module.exports = router
