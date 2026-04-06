require('dotenv').config()

const connectDB = require('../config/db')
const User = require('../models/User')
const WorkerProfile = require('../models/WorkerProfile')
const Review = require('../models/Review')

async function seed() {
  await connectDB()

  await Review.deleteMany({})
  await WorkerProfile.deleteMany({})
  await User.deleteMany({})

  const [customer] = await User.create([
    {
      name: 'Priya Sharma',
      email: 'customer@trustserve.com',
      password: 'password123',
      role: 'customer',
      city: 'Jaipur',
    },
  ])

  const workerUsers = await User.create([
    {
      name: 'Amit Verma',
      email: 'amit@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Jaipur',
    },
    {
      name: 'Sanjay Kumar',
      email: 'sanjay@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Kota',
    },
    {
      name: 'Ravi Narayan',
      email: 'ravi@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Udaipur',
    },
    {
      name: 'Deepak Soni',
      email: 'deepak@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Bikaner',
    },
    {
      name: 'Farah Khan',
      email: 'farah@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Ajmer',
    },
    {
      name: 'Salim Ansari',
      email: 'salim@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Kota',
    },
    {
      name: 'Nadeem Khan',
      email: 'nadeem@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Jaipur',
    },
    {
      name: 'Aman Purohit',
      email: 'aman@trustserve.com',
      password: 'password123',
      role: 'worker',
      city: 'Raipur',
    },
  ])

  const workers = await WorkerProfile.create([
    {
      user: workerUsers[0]._id,
      category: 'Electrician',
      skills: ['Home Wiring', 'Inverter Setup', 'Fan Installation'],
      experienceYears: 8,
      completedJobs: 320,
      about: 'Specialist in residential electrical safety and fast emergency support.',
      profilePhoto:
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=300&q=80',
      baseFee: 399,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.9,
      ratingCount: 32,
      availability: ['Mon 10:00', 'Tue 12:00', 'Wed 16:00'],
      location: {
        city: 'Jaipur',
        state: 'Rajasthan',
        coordinates: [75.7873, 26.9124],
      },
    },
    {
      user: workerUsers[1]._id,
      category: 'Plumber',
      skills: ['Leak Repair', 'Pipe Fitting', 'Water Tank Setup'],
      experienceYears: 6,
      completedJobs: 214,
      about: 'Reliable plumbing technician focused on clean work and transparent pricing.',
      profilePhoto:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      baseFee: 349,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.6,
      ratingCount: 21,
      availability: ['Mon 14:00', 'Tue 09:00', 'Fri 12:30'],
      location: {
        city: 'Kota',
        state: 'Rajasthan',
        coordinates: [75.8391, 25.2138],
      },
    },
    {
      user: workerUsers[2]._id,
      category: 'Carpenter',
      skills: ['Door Repair', 'Custom Shelves', 'Furniture Assembly'],
      experienceYears: 4,
      completedJobs: 110,
      about: 'Affordable carpenter for quick household fixes and furniture adjustments.',
      profilePhoto:
        'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
      baseFee: 299,
      verifiedBadge: false,
      verificationStatus: 'pending',
      ratingAvg: 3.9,
      ratingCount: 10,
      availability: ['Wed 10:30', 'Sat 13:00'],
      location: {
        city: 'Udaipur',
        state: 'Rajasthan',
        coordinates: [73.7125, 24.5854],
      },
    },
    {
      user: workerUsers[3]._id,
      category: 'Electrician',
      skills: ['MCB Fixing', 'Wiring Inspection', 'Appliance Setup'],
      experienceYears: 11,
      completedJobs: 287,
      about: 'Handles home electrical repairs, safety checks, and appliance installations.',
      profilePhoto:
        'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
      baseFee: 449,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.7,
      ratingCount: 29,
      availability: ['Mon 09:00', 'Thu 14:00', 'Sat 11:30'],
      location: {
        city: 'Bikaner',
        state: 'Rajasthan',
        coordinates: [73.3119, 28.0229],
      },
    },
    {
      user: workerUsers[4]._id,
      category: 'Plumber',
      skills: ['Leak Repair', 'Bathroom Fitting', 'Water Line Service'],
      experienceYears: 7,
      completedJobs: 241,
      about: 'Quick-response plumber for household repairs and installation work.',
      profilePhoto:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
      baseFee: 369,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.8,
      ratingCount: 26,
      availability: ['Tue 10:00', 'Thu 09:30', 'Sun 15:00'],
      location: {
        city: 'Ajmer',
        state: 'Rajasthan',
        coordinates: [74.6399, 26.4499],
      },
    },
    {
      user: workerUsers[5]._id,
      category: 'Carpenter',
      skills: ['Wardrobe Repair', 'Custom Furniture', 'Door Alignment'],
      experienceYears: 9,
      completedJobs: 198,
      about: 'Furniture and woodwork specialist for everyday home fixes.',
      profilePhoto:
        'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80',
      baseFee: 329,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.5,
      ratingCount: 18,
      availability: ['Mon 13:00', 'Wed 11:00', 'Fri 16:30'],
      location: {
        city: 'Kota',
        state: 'Rajasthan',
        coordinates: [75.2133, 25.2138],
      },
    },
    {
      user: workerUsers[6]._id,
      category: 'AC Technician',
      skills: ['AC Repair', 'Gas Refill', 'Filter Cleaning'],
      experienceYears: 12,
      completedJobs: 455,
      about: 'Seasonal AC maintenance and emergency cooling support specialist.',
      profilePhoto:
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      baseFee: 549,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.9,
      ratingCount: 41,
      availability: ['Wed 09:00', 'Fri 14:00', 'Sun 10:30'],
      location: {
        city: 'Jaipur',
        state: 'Rajasthan',
        coordinates: [75.7873, 26.9124],
      },
    },
    {
      user: workerUsers[7]._id,
      category: 'Carpenter',
      skills: ['Furniture Repair', 'Door Fitting', 'Modular Shelves'],
      experienceYears: 8,
      completedJobs: 176,
      about: 'Local carpenter for fast home repairs and custom woodwork in Raipur.',
      profilePhoto:
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80',
      baseFee: 339,
      verifiedBadge: true,
      verificationStatus: 'verified',
      ratingAvg: 4.7,
      ratingCount: 17,
      availability: ['Tue 10:30', 'Thu 12:00', 'Sat 15:30'],
      location: {
        city: 'Raipur',
        state: 'Rajasthan',
        coordinates: [74.1083, 22.7196],
      },
    },
  ])

  await Review.create([
    {
      worker: workers[0]._id,
      customer: customer._id,
      rating: 5,
      comment: 'Very professional and fast service.',
    },
    {
      worker: workers[1]._id,
      customer: customer._id,
      rating: 5,
      comment: 'Solved leakage in one visit.',
    },
    {
      worker: workers[3]._id,
      customer: customer._id,
      rating: 5,
      comment: 'Very neat wiring work and on time.',
    },
    {
      worker: workers[4]._id,
      customer: customer._id,
      rating: 5,
      comment: 'Fixed the tap and drain quickly.',
    },
    {
      worker: workers[7]._id,
      customer: customer._id,
      rating: 5,
      comment: 'Repaired the door and shelves neatly.',
    },
  ])

  console.log('Seed completed successfully')
  console.log('Customer login: customer@trustserve.com / password123')
  console.log('Worker login: amit@trustserve.com / password123')
  console.log('Additional worker logins: deepak@trustserve.com, farah@trustserve.com, salim@trustserve.com, nadeem@trustserve.com, aman@trustserve.com / password123')
  process.exit(0)
}

seed().catch((error) => {
  console.error('Seed failed:', error)
  process.exit(1)
})
