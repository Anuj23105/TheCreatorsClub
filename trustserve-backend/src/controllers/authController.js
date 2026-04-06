const { body } = require('express-validator')
const User = require('../models/User')
const WorkerProfile = require('../models/WorkerProfile')
const asyncHandler = require('../utils/asyncHandler')
const generateToken = require('../utils/generateToken')

const registerValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  body('role').optional().isIn(['customer', 'worker']).withMessage('Role must be customer or worker'),
]

const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
]

const register = asyncHandler(async (req, res) => {
  const { name, email, password, role = 'customer', phone = '', city = '', workerProfile } = req.body

  const existing = await User.findOne({ email })
  if (existing) {
    return res.status(409).json({ message: 'Email already in use' })
  }

  const user = await User.create({
    name,
    email,
    password,
    role,
    phone,
    city,
  })

  if (role === 'worker') {
    const profilePayload = {
      user: user._id,
      category: workerProfile?.category || 'Electrician',
      skills: workerProfile?.skills || [],
      experienceYears: workerProfile?.experienceYears || 0,
      about: workerProfile?.about || '',
      baseFee: workerProfile?.baseFee || 299,
      profilePhoto: workerProfile?.profilePhoto || '',
      location: {
        city: workerProfile?.location?.city || city || 'Jaipur',
        state: workerProfile?.location?.state || 'Rajasthan',
        coordinates: workerProfile?.location?.coordinates || [75.7873, 26.9124],
      },
      availability: workerProfile?.availability || [],
    }
    await WorkerProfile.create(profilePayload)
  }

  return res.status(201).json({
    message: 'Account created successfully',
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      city: user.city,
    },
  })
})

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  return res.json({
    token: generateToken(user._id),
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      city: user.city,
    },
  })
})

const me = asyncHandler(async (req, res) => {
  const workerProfile =
    req.user.role === 'worker' ? await WorkerProfile.findOne({ user: req.user._id }) : null

  return res.json({
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
      city: req.user.city,
      phone: req.user.phone,
    },
    workerProfile,
  })
})

module.exports = {
  registerValidation,
  loginValidation,
  register,
  login,
  me,
}
