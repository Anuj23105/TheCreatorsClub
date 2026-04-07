import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LayoutGrid, List, LocateFixed } from 'lucide-react'
import EmptyState from '../components/ui/EmptyState.jsx'
import ServiceCardsCarousel from '../components/ui/ServiceCardsCarousel.jsx'
import SkeletonCard from '../components/ui/SkeletonCard.jsx'
import WorkerCard from '../components/ui/WorkerCard.jsx'
import RatingStars from '../components/ui/RatingStars.jsx'
import { useWorkers } from '../hooks/useWorkers.js'
import { categories } from '../services/trustserveApi.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const dummyCustomerReviews = [
  {
    id: 'review-1',
    customer: 'Neha Sharma',
    worker: 'Rakesh Saini',
    service: 'Electrician',
    rating: 5,
    comment: 'Excellent and quick service. Fixed our wiring issue in one visit.',
  },
  {
    id: 'review-2',
    customer: 'Arjun Meena',
    worker: 'Imran Khan',
    service: 'Plumber',
    rating: 4,
    comment: 'Very professional and on time. Leakage problem solved properly.',
  },
  {
    id: 'review-3',
    customer: 'Pooja Verma',
    worker: 'Mahesh Kumar',
    service: 'Carpenter',
    rating: 5,
    comment: 'Great finishing quality on custom shelves. Highly recommended.',
  },
  {
    id: 'review-4',
    customer: 'Rohit Jain',
    worker: 'Vijay Solanki',
    service: 'AC Technician',
    rating: 4,
    comment: 'Did AC servicing neatly and explained all maintenance tips clearly.',
  },
]

function ServicesPage() {
  const { tr, trCategory } = useLanguage()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.toString()
  const [category, setCategory] = useState('All')
  const [minRating, setMinRating] = useState(0)
  const [maxDistance, setMaxDistance] = useState(10)
  const [location, setLocation] = useState('')
  const [currentCoords, setCurrentCoords] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')
  const [view, setView] = useState('grid')

  useEffect(() => {
    const initialCategory = searchParams.get('category')
    const initialLocation = searchParams.get('location')
    const initialLat = searchParams.get('lat')
    const initialLng = searchParams.get('lng')

    if (initialCategory) {
      setCategory(initialCategory)
    }

    if (initialLocation) {
      setLocation(initialLocation)
    }

    if (initialLat && initialLng) {
      const lat = Number(initialLat)
      const lng = Number(initialLng)
      if (Number.isFinite(lat) && Number.isFinite(lng)) {
        setCurrentCoords({ lat, lng })
        setLocation(initialLocation || `Current location (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
      }
    }
  }, [searchQuery])

  function useCurrentLocation() {
    setLocationStatus(tr('Detecting current location...'))

    if (!navigator.geolocation) {
      setLocationStatus(tr('Geolocation is not supported in this browser.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setCurrentCoords({ lat, lng })
        setLocation(`${tr('Current location')} (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
        setLocationStatus(tr('Current location selected.'))
      },
      () => {
        setLocationStatus(tr('Unable to access current location. Please enter it manually.'))
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
    )
  }

  const filters = useMemo(
    () => ({
      category,
      minRating,
      maxDistance,
      location,
      lat: currentCoords?.lat,
      lng: currentCoords?.lng,
    }),
    [category, minRating, maxDistance, location, currentCoords],
  )

  const { workers, loading } = useWorkers(filters)

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{tr('Service Discovery')}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {tr('Discover verified workers by category, ratings, and location proximity.')}
      </p>

      <section className="glass-card mt-6 grid gap-3 rounded-2xl p-4 sm:grid-cols-2 lg:grid-cols-5">
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          {categories.map((item) => (
            <option key={item}>{trCategory(item)}</option>
          ))}
        </select>

        <select
          value={minRating}
          onChange={(event) => setMinRating(Number(event.target.value))}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <option value={0}>{tr('Any Rating')}</option>
          <option value={4}>{tr('4+ Stars')}</option>
          <option value={4.5}>{tr('4.5+ Stars')}</option>
        </select>

        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder={tr('Location')}
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
        />

        <div>
          <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{tr('Distance')}: {maxDistance} km</label>
          <input
            value={maxDistance}
            onChange={(event) => setMaxDistance(Number(event.target.value))}
            type="range"
            min="1"
            max="20"
            className="w-full"
          />
        </div>

        <button
          type="button"
          onClick={useCurrentLocation}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 dark:border-sky-700 dark:bg-sky-900/20 dark:text-sky-300"
        >
          <LocateFixed size={16} /> {tr('Use Current Location')}
        </button>
      </section>

      {locationStatus && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{locationStatus}</p>}

      <ServiceCardsCarousel />

      <div className="mt-4 flex items-center justify-end gap-2">
        <button
          onClick={() => setView('grid')}
          className={`rounded-lg px-3 py-2 text-sm ${view === 'grid' ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          <LayoutGrid size={16} />
        </button>
        <button
          onClick={() => setView('list')}
          className={`rounded-lg px-3 py-2 text-sm ${view === 'list' ? 'bg-slate-900 text-white dark:bg-slate-200 dark:text-slate-900' : 'bg-slate-100 dark:bg-slate-800'}`}
        >
          <List size={16} />
        </button>
      </div>

      <section className={`mt-4 grid gap-4 ${view === 'grid' ? 'md:grid-cols-2' : 'grid-cols-1'}`}>
        {loading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        {!loading && !workers.length && (
          <EmptyState
            title={tr('No workers found')}
            description={tr('Try increasing distance or changing category to discover available professionals.')}
          />
        )}

        {!loading && workers.map((worker) => <WorkerCard key={worker.id} worker={worker} view={view} />)}
      </section>

      <section className="mt-8 glass-card rounded-2xl p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold">{tr('Customer Reviews & Ratings')}</h2>
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700 dark:bg-sky-900/30 dark:text-sky-300">
            {tr('Demo Reviews')}
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {tr('Recent feedback shared by customers for listed workers.')}
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {dummyCustomerReviews.map((review) => (
            <article key={review.id} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold">{review.customer}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {tr('For')} {review.worker} • {trCategory(review.service)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <RatingStars value={review.rating} />
                  <span className="text-xs font-semibold">{review.rating}.0</span>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">"{review.comment}"</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

export default ServicesPage
