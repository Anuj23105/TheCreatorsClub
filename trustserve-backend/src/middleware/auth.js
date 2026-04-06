const jwt = require('jsonwebtoken')
const User = require('../models/User')

async function protect(req, res, next) {
  const authHeader = req.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.id)
    if (!user) {
      return res.status(401).json({ message: 'User not found for token' })
    }
    req.user = user
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Token invalid or expired' })
  }
}

function authorize(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden for this role' })
    }
    next()
  }
}

module.exports = { protect, authorize }
