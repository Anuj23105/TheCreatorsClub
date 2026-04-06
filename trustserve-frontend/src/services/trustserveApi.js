import { apiRequest } from './apiClient.js'

export const categories = ['All', 'Electrician', 'Plumber', 'Carpenter', 'AC Technician']

const dummyWorkers = [
  {
    id: 'dummy-1',
    name: 'Rakesh Saini',
    category: 'Electrician',
    location: 'Jaipur, Rajasthan',
    distanceKm: 2.1,
    rating: 4.8,
    experienceYears: 9,
    completedJobs: 410,
    verified: true,
    fee: 399,
    about: 'Home wiring, inverter setup, and appliance fault fixes.',
    image:
      'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=900&q=80',
    skills: ['Wiring', 'Inverter', 'Switchboard Repair'],
    availability: ['Mon 10:00-13:00', 'Tue 15:00-18:00', 'Thu 11:00-14:00'],
  },
  {
    id: 'dummy-2',
    name: 'Imran Khan',
    category: 'Plumber',
    location: 'Ajmer, Rajasthan',
    distanceKm: 3.8,
    rating: 4.6,
    experienceYears: 7,
    completedJobs: 290,
    verified: true,
    fee: 349,
    about: 'Pipeline leakage, bathroom fitting, and water tank solutions.',
    image:
      'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=900&q=80',
    skills: ['Leak Fix', 'Bathroom Fittings', 'Tank Cleaning'],
    availability: ['Mon 09:00-12:00', 'Wed 14:00-18:00', 'Sat 10:00-13:00'],
  },
  {
    id: 'dummy-3',
    name: 'Mahesh Kumar',
    category: 'Carpenter',
    location: 'Udaipur, Rajasthan',
    distanceKm: 5.4,
    rating: 4.7,
    experienceYears: 11,
    completedJobs: 520,
    verified: true,
    fee: 499,
    about: 'Furniture repair, custom shelves, and modular kitchen fittings.',
    image:
      'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=900&q=80',
    skills: ['Furniture Repair', 'Wood Polish', 'Custom Installation'],
    availability: ['Tue 10:00-14:00', 'Thu 16:00-19:00', 'Sun 09:00-12:00'],
  },
  {
    id: 'dummy-4',
    name: 'Vijay Solanki',
    category: 'AC Technician',
    location: 'Kota, Rajasthan',
    distanceKm: 4.3,
    rating: 4.9,
    experienceYears: 8,
    completedJobs: 360,
    verified: true,
    fee: 549,
    about: 'AC installation, gas refill, and seasonal maintenance.',
    image:
      'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=900&q=80',
    skills: ['AC Install', 'Gas Refill', 'Deep Cleaning'],
    availability: ['Mon 11:00-15:00', 'Fri 12:00-16:00', 'Sat 14:00-18:00'],
  },
]

function filterDummyWorkers(filters = {}) {
  return dummyWorkers.filter((worker) => {
    const categoryMatch = !filters.category || filters.category === 'All' || worker.category === filters.category
    const ratingMatch = typeof filters.minRating !== 'number' || worker.rating >= filters.minRating
    const distanceMatch = typeof filters.maxDistance !== 'number' || worker.distanceKm <= filters.maxDistance
    const locationMatch =
      !filters.location || worker.location.toLowerCase().includes(String(filters.location).trim().toLowerCase())

    return categoryMatch && ratingMatch && distanceMatch && locationMatch
  })
}

export async function fetchWorkers(filters = {}) {
  const params = new URLSearchParams()

  if (filters.category) {
    params.set('category', filters.category)
  }
  if (typeof filters.minRating === 'number') {
    params.set('minRating', String(filters.minRating))
  }
  if (typeof filters.maxDistance === 'number') {
    params.set('maxDistance', String(filters.maxDistance))
  }
  if (filters.location?.trim()) {
    params.set('location', filters.location.trim())
  }
  if (typeof filters.lat === 'number' && Number.isFinite(filters.lat)) {
    params.set('lat', String(filters.lat))
  }
  if (typeof filters.lng === 'number' && Number.isFinite(filters.lng)) {
    params.set('lng', String(filters.lng))
  }

  const query = params.toString() ? `?${params.toString()}` : ''

  try {
    const workers = await apiRequest(`/workers${query}`)
    if (Array.isArray(workers) && workers.length > 0) {
      return workers
    }
    return filterDummyWorkers(filters)
  } catch {
    return filterDummyWorkers(filters)
  }
}

export async function fetchWorkerById(workerId) {
  try {
    return await apiRequest(`/workers/${workerId}`)
  } catch {
    const fallback = dummyWorkers.find((worker) => worker.id === workerId)
    if (fallback) {
      return fallback
    }
    throw new Error('Worker not found')
  }
}

export async function fetchReviews(workerId) {
  return apiRequest(`/workers/${workerId}/reviews`)
}

export async function submitReview(workerId, payload) {
  return apiRequest('/reviews', {
    method: 'POST',
    auth: true,
    authRole: 'customer',
    body: {
      workerId,
      rating: payload.rating,
      comment: payload.comment,
    },
  })
}

export async function createBooking(payload) {
  const requestBody = {
    serviceType: payload.service || payload.serviceType,
    workerId: payload.workerId,
    date: payload.date,
    time: payload.time,
    notes: payload.notes,
  }

  if (payload.paymentId) {
    requestBody.paymentId = payload.paymentId
  }

  if (payload.paymentProvider) {
    requestBody.paymentProvider = payload.paymentProvider
  }

  if (payload.paymentStatus) {
    requestBody.paymentStatus = payload.paymentStatus
  }

  return apiRequest('/bookings', {
    method: 'POST',
    auth: true,
    authRole: 'customer',
    body: requestBody,
  })
}

export async function fetchWorkerDashboard() {
  return apiRequest('/dashboard/worker', {
    auth: true,
    authRole: 'worker',
  })
}

export async function fetchTopRatedWorkers() {
  try {
    const workers = await apiRequest('/workers/top-rated')
    if (Array.isArray(workers) && workers.length > 0) {
      return workers
    }
    return dummyWorkers.slice().sort((a, b) => b.rating - a.rating).slice(0, 4)
  } catch {
    return dummyWorkers.slice().sort((a, b) => b.rating - a.rating).slice(0, 4)
  }
}

export async function fetchRecommendedWorkers() {
  try {
    const workers = await apiRequest('/workers/recommended')
    if (Array.isArray(workers) && workers.length > 0) {
      return workers
    }
    return dummyWorkers.slice(0, 3)
  } catch {
    return dummyWorkers.slice(0, 3)
  }
}
