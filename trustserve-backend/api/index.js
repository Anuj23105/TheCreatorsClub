require('dotenv').config()

const app = require('../src/app')
const connectDB = require('../src/config/db')

let dbReady = false

module.exports = async (req, res) => {
  try {
    if (!dbReady) {
      await connectDB()
      dbReady = true
    }

    return app(req, res)
  } catch (error) {
    return res.status(500).json({
      message: 'Server initialization failed',
      error: error.message,
    })
  }
}
