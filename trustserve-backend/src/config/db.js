const mongoose = require('mongoose')

async function connectDB() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI

  if (!uri) {
    throw new Error('MongoDB URI missing. Set MONGODB_URI (or MONGO_URI) in your environment variables.')
  }

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 5000,
  })
  console.log('MongoDB connected successfully')
}

module.exports = connectDB
