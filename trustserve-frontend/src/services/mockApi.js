const WORKERS = [
  {
    id: 'w1',
    name: 'Amit Verma',
    category: 'Electrician',
    location: 'Jaipur, Rajasthan',
    distanceKm: 2.4,
    rating: 4.9,
    experienceYears: 8,
    completedJobs: 320,
    verified: true,
    skills: ['Home Wiring', 'Inverter Setup', 'Fan Installation'],
    about: 'Specialist in residential electrical safety and fast emergency support.',
    fee: 399,
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=300&q=80',
    availability: ['Mon 10:00', 'Tue 12:00', 'Wed 16:00', 'Thu 11:00'],
  },
  {
    id: 'w5',
    name: 'Deepak Soni',
    category: 'Electrician',
    location: 'Bikaner, Rajasthan',
    distanceKm: 6.8,
    rating: 4.7,
    experienceYears: 11,
    completedJobs: 287,
    verified: true,
    skills: ['MCB Fixing', 'Wiring Inspection', 'Appliance Setup'],
    about: 'Handles home electrical repairs, safety checks, and appliance installations.',
    fee: 449,
    image:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    availability: ['Mon 09:00', 'Thu 14:00', 'Sat 11:30'],
  },
  {
    id: 'w2',
    name: 'Sanjay Kumar',
    category: 'Plumber',
    location: 'Kota, Rajasthan',
    distanceKm: 5.7,
    rating: 4.6,
    experienceYears: 6,
    completedJobs: 214,
    verified: true,
    skills: ['Leak Repair', 'Pipe Fitting', 'Water Tank Setup'],
    about: 'Reliable plumbing technician focused on clean work and transparent pricing.',
    fee: 349,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    availability: ['Mon 14:00', 'Tue 09:00', 'Fri 12:30'],
  },
  {
    id: 'w6',
    name: 'Farah Khan',
    category: 'Plumber',
    location: 'Ajmer, Rajasthan',
    distanceKm: 8.1,
    rating: 4.8,
    experienceYears: 7,
    completedJobs: 241,
    verified: true,
    skills: ['Leak Repair', 'Bathroom Fitting', 'Water Line Service'],
    about: 'Quick-response plumber for household repairs and installation work.',
    fee: 369,
    image:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    availability: ['Tue 10:00', 'Thu 09:30', 'Sun 15:00'],
  },
  {
    id: 'w3',
    name: 'Imran Sheikh',
    category: 'Carpenter',
    location: 'Ajmer, Rajasthan',
    distanceKm: 9.2,
    rating: 3.9,
    experienceYears: 4,
    completedJobs: 110,
    verified: false,
    skills: ['Door Repair', 'Custom Shelves', 'Furniture Assembly'],
    about: 'Affordable carpenter for quick household fixes and furniture adjustments.',
    fee: 299,
    image:
      'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=300&q=80',
    availability: ['Wed 10:30', 'Sat 13:00'],
  },
  {
    id: 'w7',
    name: 'Salim Ansari',
    category: 'Carpenter',
    location: 'Kota, Rajasthan',
    distanceKm: 7.4,
    rating: 4.5,
    experienceYears: 9,
    completedJobs: 198,
    verified: true,
    skills: ['Wardrobe Repair', 'Custom Furniture', 'Door Alignment'],
    about: 'Furniture and woodwork specialist for everyday home fixes.',
    fee: 329,
    image:
      'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=300&q=80',
    availability: ['Mon 13:00', 'Wed 11:00', 'Fri 16:30'],
  },
  {
    id: 'w9',
    name: 'Aman Purohit',
    category: 'Carpenter',
    location: 'Raipur, Rajasthan',
    distanceKm: 4.8,
    rating: 4.7,
    experienceYears: 8,
    completedJobs: 176,
    verified: true,
    skills: ['Furniture Repair', 'Door Fitting', 'Modular Shelves'],
    about: 'Local carpenter for fast home repairs and custom woodwork in Raipur.',
    fee: 339,
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=300&q=80',
    availability: ['Tue 10:30', 'Thu 12:00', 'Sat 15:30'],
  },
  {
    id: 'w4',
    name: 'Ravi Narayan',
    category: 'AC Technician',
    location: 'Udaipur, Rajasthan',
    distanceKm: 4.1,
    rating: 4.8,
    experienceYears: 10,
    completedJobs: 402,
    verified: true,
    skills: ['AC Service', 'Cooling Diagnostics', 'Installation'],
    about: 'Experienced AC engineer for servicing, diagnostics, and preventive maintenance.',
    fee: 499,
    image:
      'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=300&q=80',
    availability: ['Tue 11:00', 'Thu 15:00', 'Sun 09:30'],
  },
  {
    id: 'w8',
    name: 'Nadeem Khan',
    category: 'AC Technician',
    location: 'Jaipur, Rajasthan',
    distanceKm: 3.2,
    rating: 4.9,
    experienceYears: 12,
    completedJobs: 455,
    verified: true,
    skills: ['AC Repair', 'Gas Refill', 'Filter Cleaning'],
    about: 'Seasonal AC maintenance and emergency cooling support specialist.',
    fee: 549,
    image:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    availability: ['Wed 09:00', 'Fri 14:00', 'Sun 10:30'],
  },
]

const REVIEWS = {
  w1: [
    { id: 'r1', user: 'Priya', rating: 5, comment: 'Very professional and fast.' },
    { id: 'r2', user: 'Rahul', rating: 4, comment: 'Good work, clean finishing.' },
  ],
  w2: [
    { id: 'r3', user: 'Neha', rating: 5, comment: 'Solved leakage in one visit.' },
  ],
  w5: [
    { id: 'r6', user: 'Karan', rating: 5, comment: 'Very neat wiring work and on time.' },
  ],
  w6: [
    { id: 'r7', user: 'Sana', rating: 5, comment: 'Fixed the tap and drain quickly.' },
  ],
  w3: [
    { id: 'r4', user: 'Ankit', rating: 3, comment: 'Okay work, arrived late.' },
  ],
  w7: [
    { id: 'r8', user: 'Rohit', rating: 4, comment: 'Good finishing on the cupboard repair.' },
  ],
  w9: [
    { id: 'r10', user: 'Vikas', rating: 5, comment: 'Repaired the door and shelves neatly.' },
  ],
  w4: [
    { id: 'r5', user: 'Meera', rating: 5, comment: 'Great diagnosis and service.' },
  ],
  w8: [
    { id: 'r9', user: 'Asha', rating: 5, comment: 'AC cooling was restored the same day.' },
  ],
}

function delay(ms = 500) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function fetchWorkers(filters = {}) {
  await delay(650)

  let list = [...WORKERS]

  if (filters.category && filters.category !== 'All') {
    list = list.filter((worker) => worker.category === filters.category)
  }

  if (typeof filters.minRating === 'number') {
    list = list.filter((worker) => worker.rating >= filters.minRating)
  }

  if (typeof filters.maxDistance === 'number') {
    list = list.filter((worker) => worker.distanceKm <= filters.maxDistance)
  }

  if (filters.location?.trim()) {
    const lc = filters.location.toLowerCase()
    list = list.filter((worker) => worker.location.toLowerCase().includes(lc))
  }

  return list
}

export async function fetchWorkerById(workerId) {
  await delay(500)
  return WORKERS.find((worker) => worker.id === workerId) || null
}

export async function fetchReviews(workerId) {
  await delay(450)
  return REVIEWS[workerId] || []
}

export async function submitReview(workerId, payload) {
  await delay(400)
  const entry = {
    id: String(Date.now()),
    user: payload.user || 'You',
    rating: payload.rating,
    comment: payload.comment,
  }
  REVIEWS[workerId] = [entry, ...(REVIEWS[workerId] || [])]
  return entry
}

export async function createBooking(payload) {
  await delay(900)
  if (payload.date === '2026-04-01') {
    throw new Error('Selected slot is no longer available. Please choose another slot.')
  }

  return {
    id: `BK-${Math.floor(Math.random() * 90000 + 10000)}`,
    status: 'confirmed',
    ...payload,
  }
}

export async function fetchTopRatedWorkers() {
  await delay(350)
  return [...WORKERS].sort((a, b) => b.rating - a.rating).slice(0, 3)
}

export async function fetchRecommendedWorkers() {
  await delay(550)
  return [...WORKERS]
    .filter((worker) => worker.verified)
    .sort((a, b) => b.completedJobs - a.completedJobs)
    .slice(0, 2)
}

export const categories = ['All', 'Electrician', 'Plumber', 'Carpenter', 'AC Technician']
