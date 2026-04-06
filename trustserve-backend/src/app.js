const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')

const authRoutes = require('./routes/authRoutes')
const workerRoutes = require('./routes/workerRoutes')
const bookingRoutes = require('./routes/bookingRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const userRoutes = require('./routes/userRoutes')
const { notFound, errorHandler } = require('./middleware/errorHandler')

const app = express()

app.use(cors({ origin: process.env.CLIENT_ORIGIN?.split(',') || '*' }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'trustserve-backend' })
})

app.use('/api/auth', authRoutes)
app.use('/api/workers', workerRoutes)
app.use('/api/bookings', bookingRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/api/users', userRoutes)

app.use(notFound)
app.use(errorHandler)

module.exports = app
