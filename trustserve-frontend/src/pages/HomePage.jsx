import { lazy, Suspense, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BadgeCheck, LocateFixed, Search } from 'lucide-react'
import AnimatedSection from '../components/ui/AnimatedSection.jsx'
import SkeletonCard from '../components/ui/SkeletonCard.jsx'
import WorkerCard from '../components/ui/WorkerCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { categories, fetchRecommendedWorkers, fetchTopRatedWorkers } from '../services/trustserveApi.js'
import { useLanguage } from '../context/LanguageContext.jsx'

const TopRatedCarousel = lazy(() => import('../components/ui/TopRatedCarousel.jsx'))

const fallbackRecommendedWorkers = [
  {
    id: 'fallback-1',
    name: 'Amit Verma',
    category: 'Electrician',
    location: 'Jaipur, Rajasthan',
    distanceKm: 2.4,
    rating: 4.9,
    experienceYears: 8,
    completedJobs: 320,
    verified: true,
    fee: 399,
    image:
      'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: 'fallback-2',
    name: 'Ravi Narayan',
    category: 'AC Technician',
    location: 'Udaipur, Rajasthan',
    distanceKm: 4.1,
    rating: 4.8,
    experienceYears: 10,
    completedJobs: 402,
    verified: true,
    fee: 499,
    image:
      'https://images.unsplash.com/photo-1557862921-37829c790f19?auto=format&fit=crop&w=900&q=80',
  },
]

function HomePage() {
  const navigate = useNavigate()
  const { tr, trCategory } = useLanguage()
  const { isCustomerAuthenticated, isWorkerAuthenticated } = useAuth()
  const [recommended, setRecommended] = useState([])
  const [topRated, setTopRated] = useState([])
  const [loadingRecommendations, setLoadingRecommendations] = useState(true)
  const [loadingTopRated, setLoadingTopRated] = useState(true)
  const [recommendationError, setRecommendationError] = useState('')
  const [topRatedError, setTopRatedError] = useState('')
  const [serviceType, setServiceType] = useState('All')
  const [location, setLocation] = useState('')
  const [currentCoords, setCurrentCoords] = useState(null)
  const [locationStatus, setLocationStatus] = useState('')
  const [isRequestingLocation, setIsRequestingLocation] = useState(false)
  const [showLocationPermissionModal, setShowLocationPermissionModal] = useState(false)
  const [showLoginRequiredModal, setShowLoginRequiredModal] = useState(false)
  const isLoggedIn = isCustomerAuthenticated || isWorkerAuthenticated

  function handleSearch(event) {
    event.preventDefault()

    const searchParams = new URLSearchParams()

    if (serviceType && serviceType !== 'All') {
      searchParams.set('category', serviceType)
    }

    if (location.trim()) {
      searchParams.set('location', location.trim())
    }

    if (currentCoords) {
      searchParams.set('lat', String(currentCoords.lat))
      searchParams.set('lng', String(currentCoords.lng))
    }

    const targetSearch = searchParams.toString()

    if (!isLoggedIn) {
      setShowLoginRequiredModal(true)
      return
    }

    navigate(`/services${targetSearch ? `?${targetSearch}` : ''}`)
  }

  function goToLoginForBooking() {
    const searchParams = new URLSearchParams()

    if (serviceType && serviceType !== 'All') {
      searchParams.set('category', serviceType)
    }

    if (location.trim()) {
      searchParams.set('location', location.trim())
    }

    if (currentCoords) {
      searchParams.set('lat', String(currentCoords.lat))
      searchParams.set('lng', String(currentCoords.lng))
    }

    setShowLoginRequiredModal(false)
    navigate('/auth', {
      state: {
        role: 'Customer',
        from: {
          pathname: '/services',
          search: searchParams.toString() ? `?${searchParams.toString()}` : '',
        },
      },
    })
  }

  function useCurrentLocation() {
    if (!navigator.geolocation) {
      setLocationStatus(tr('Geolocation is not supported in this browser.'))
      return
    }

    setIsRequestingLocation(true)
    setLocationStatus(tr('Please allow location access in your browser prompt...'))

    const requestCurrentPosition = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude
          const lng = position.coords.longitude
          setCurrentCoords({ lat, lng })
          setLocation(`${tr('Current location')} (${lat.toFixed(4)}, ${lng.toFixed(4)})`)
          setLocationStatus(tr('Current location selected.'))
          setIsRequestingLocation(false)
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            setLocationStatus(tr('Location permission denied. Please allow it in browser settings.'))
          } else if (error.code === error.POSITION_UNAVAILABLE) {
            setLocationStatus(tr('Location is unavailable right now. Please try again.'))
          } else if (error.code === error.TIMEOUT) {
            setLocationStatus(tr('Location request timed out. Please try again.'))
          } else {
            setLocationStatus(tr('Unable to access current location. Please enter it manually.'))
          }
          setIsRequestingLocation(false)
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 },
      )
    }

    if (navigator.permissions?.query) {
      navigator.permissions
        .query({ name: 'geolocation' })
        .then((permissionStatus) => {
          if (permissionStatus.state === 'denied') {
            setLocationStatus(tr('Location permission is blocked. Enable it in browser settings.'))
            setIsRequestingLocation(false)
            return
          }

          if (permissionStatus.state === 'prompt') {
            setLocationStatus(tr('Browser will ask for location permission. Please tap Allow.'))
          }

          requestCurrentPosition()
        })
        .catch(() => {
          requestCurrentPosition()
        })
      return
    }

    requestCurrentPosition()
  }

  function openLocationPermissionModal() {
    if (!navigator.geolocation) {
      setLocationStatus(tr('Geolocation is not supported in this browser.'))
      return
    }

    setShowLocationPermissionModal(true)
  }

  function handleGiveLocationPermission() {
    setShowLocationPermissionModal(false)
    useCurrentLocation()
  }

  function handleDenyLocationPermission() {
    setShowLocationPermissionModal(false)
    setLocationStatus(tr('Location access denied. You can enter location manually.'))
  }

  useEffect(() => {
    async function init() {
      try {
        const recommendedWorkers = await fetchRecommendedWorkers()
        setRecommended(recommendedWorkers)
      } catch (error) {
        setRecommended([])
        setRecommendationError(tr('Recommended workers are unavailable right now.'))
      } finally {
        setLoadingRecommendations(false)
      }

      try {
        const topRatedWorkers = await fetchTopRatedWorkers()
        setTopRated(topRatedWorkers)
      } catch (error) {
        setTopRated([])
        setTopRatedError(tr('Top rated workers are unavailable right now.'))
      } finally {
        setLoadingTopRated(false)
      }
    }

    init()
  }, [])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <AnimatedSection className="hero-glow rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 shadow-lg">
        <div className="relative overflow-hidden p-6 sm:p-12">
          {/* Background gradient accent */}
          <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-sky-700/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-64 w-64 rounded-full bg-blue-700/15 blur-3xl" />
          <div className="relative z-10">
            <p className="mb-4 inline-flex rounded-full bg-sky-900/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-sky-300">
              {tr('Trusted marketplace')}
            </p>
            <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              {tr('Find Verified Skilled Workers in Your Area')}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 sm:text-base">
              {tr('Book electricians, plumbers, carpenters, and skilled professionals with transparent ratings, verified credentials, and neighborhood discovery.')}
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mt-8 space-y-3 rounded-2xl border border-slate-700 bg-slate-900/80 p-4 shadow-sm sm:p-6">
              <div className="grid gap-3 sm:grid-cols-4">
                <select
                  value={serviceType}
                  onChange={(event) => setServiceType(event.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-900/30"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category === 'All' ? tr('Service Type') : trCategory(category)}
                    </option>
                  ))}
                </select>
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-medium text-slate-100 transition-colors placeholder:text-slate-500 hover:border-slate-600 focus:border-sky-500 focus:ring-2 focus:ring-sky-900/30"
                  placeholder={tr('Enter location or address')}
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
                >
                  <Search size={16} />
                  <span className="hidden sm:inline">{tr('Search')}</span>
                </button>
                <button
                  type="button"
                  onClick={openLocationPermissionModal}
                  disabled={isRequestingLocation}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-slate-800 disabled:opacity-50"
                >
                  <LocateFixed size={16} />
                  <span className="hidden sm:inline">{tr('Location')}</span>
                </button>
              </div>
              {locationStatus && <p className="text-xs text-slate-300">{locationStatus}</p>}
            </form>

            {/* Stats */}
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                <p className="text-sm font-semibold text-white">20k+</p>
                <p className="text-xs text-slate-300">{tr('Verified workers')}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                <p className="text-sm font-semibold text-white">4.8★</p>
                <p className="text-xs text-slate-300">{tr('Average rating')}</p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3">
                <p className="text-sm font-semibold text-white">100%</p>
                <p className="text-xs text-slate-300">{tr('Secure bookings')}</p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Location Permission Modal */}
      {showLocationPermissionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-heading text-lg font-semibold text-neutral-900 dark:text-white">{tr('Enable location access?')}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {tr("We'll use your location to find nearby workers faster and more accurately.")}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={handleGiveLocationPermission}
                className="flex-1 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                {tr('Enable')}
              </button>
              <button
                type="button"
                onClick={handleDenyLocationPermission}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                {tr('Skip')}
              </button>
            </div>
            </div>
          </div>
        )}

      {/* Login Required Modal */}
      {showLoginRequiredModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-950/50 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-neutral-900">
            <h3 className="font-heading text-lg font-semibold text-neutral-900 dark:text-white">{tr('Sign in required')}</h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
              {tr('Create an account or sign in to book a service.')}
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={goToLoginForBooking}
                className="flex-1 rounded-lg bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
              >
                {tr('Sign In')}
              </button>
              <button
                type="button"
                onClick={() => setShowLoginRequiredModal(false)}
                className="flex-1 rounded-lg border border-neutral-300 bg-white px-4 py-3 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
              >
                {tr('Cancel')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Worker Promotion Section */}
      <AnimatedSection className="mt-12 rounded-2xl border border-neutral-200 bg-gradient-to-r from-primary-50 to-accent-50 p-8 transition-colors dark:border-neutral-800 dark:from-primary-900/20 dark:to-accent-900/20">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary-700 dark:text-primary-300">{tr('Earn & Grow')}</p>
            <h2 className="font-heading text-3xl font-bold text-neutral-900 dark:text-white">{tr('Become a Service Provider')}</h2>
            <p className="mt-3 max-w-2xl text-neutral-600 dark:text-neutral-400">
              {tr('Create your professional profile, showcase your expertise, and connect with verified customers in your neighborhood.')}
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/auth')}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600"
          >
            {tr('Get Started')}
          </button>
        </div>
      </AnimatedSection>

      {/* Features Grid */}
      <AnimatedSection className="mt-12 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-6 sm:p-8">
        <div className="mb-8">
          <h2 className="font-heading text-3xl font-bold text-white">{tr('Why Choose TrustServe?')}</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-sm transition-all hover:border-slate-600 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-sky-900/30">
              <BadgeCheck className="text-sky-300" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-white">{tr('Verified & Safe')}</h3>
            <p className="mt-2 text-sm text-slate-300">
              {tr('Every worker is KYC verified with background checks for your peace of mind.')}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-sm transition-all hover:border-slate-600 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/30">
              <LocateFixed className="text-blue-300" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-white">{tr('Neighborhood Discovery')}</h3>
            <p className="mt-2 text-sm text-slate-300">
              {tr('Find skilled professionals available in your area in seconds.')}
            </p>
          </article>
          <article className="rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-sm transition-all hover:border-slate-600 hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-cyan-900/30">
              <Search className="text-cyan-300" size={24} />
            </div>
            <h3 className="font-heading font-semibold text-white">{tr('Transparent Reviews')}</h3>
            <p className="mt-2 text-sm text-slate-300">
              {tr('Read honest customer feedback before making your booking decision.')}
            </p>
          </article>
        </div>
      </AnimatedSection>

      {/* Recommended Workers Section */}
      <AnimatedSection className="mt-12">
        <h2 className="mb-8 font-heading text-3xl font-bold text-neutral-900 dark:text-white">{tr('Recommended For You')}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {loadingRecommendations && (
            <>
              <SkeletonCard />
              <SkeletonCard />
            </>
          )}

          {!loadingRecommendations && recommendationError &&
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-5 text-sm text-amber-800 dark:border-amber-700/30 dark:bg-amber-900/20 dark:text-amber-200 md:col-span-2">
              {recommendationError} {tr('Showing featured professionals.')}
            </div>}

          {!loadingRecommendations && !recommendationError && !recommended.length &&
            <div className="rounded-xl border border-neutral-200 bg-white px-4 py-5 text-sm text-neutral-600 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 md:col-span-2">
              {tr('Showing featured professionals in your area.')}
            </div>}

          {!loadingRecommendations &&
            (recommended.length ? recommended : fallbackRecommendedWorkers).map((worker) => (
              <WorkerCard key={worker.id} worker={worker} />
            ))}
        </div>
      </AnimatedSection>

      {/* Top Rated Section */}
      <AnimatedSection className="mt-12">
        <h2 className="mb-8 font-heading text-3xl font-bold text-neutral-900 dark:text-white">{tr('Top Rated Professionals')}</h2>

        {loadingTopRated && (
          <div className="grid gap-4 md:grid-cols-3">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {!loadingTopRated && topRatedError && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-800 dark:border-rose-700/30 dark:bg-rose-900/20 dark:text-rose-200">
            {topRatedError}
          </div>
        )}

        {!loadingTopRated && !topRatedError && topRated.length > 0 && (
          <Suspense
            fallback={
              <div className="grid gap-4 md:grid-cols-3">
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </div>
            }
          >
            <TopRatedCarousel workers={topRated} />
          </Suspense>
        )}
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection className="mt-12 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-sm transition-colors">
          <h2 className="font-heading text-2xl font-bold text-white">{tr('Looking for Services?')}</h2>
          <p className="mt-3 text-slate-300">
            {tr('Browse our network of verified professionals and book trusted services in your neighborhood.')}
          </p>
          <div className="mt-6 flex gap-3">
            <Link to="/services" className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-700">
              {tr('Explore Services')}
            </Link>
            <Link to="/auth" className="inline-flex items-center gap-2 rounded-lg border border-slate-600 bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-100 transition-colors hover:bg-slate-700">
              {tr('Sign In')}
            </Link>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-700 bg-slate-900/80 p-8 shadow-sm transition-colors">
          <h2 className="font-heading text-2xl font-bold text-white">{tr('Want to Earn More?')}</h2>
          <p className="mt-3 text-slate-300">
            {tr('Join thousands of skilled professionals earning on their own terms with flexible schedules.')}
          </p>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="mt-6 rounded-lg border border-slate-600 bg-slate-950 p-4 text-sm text-sky-100"
          >
            💡 {tr('Build your reputation, control your rates, and grow your business.')}
          </motion.div>
        </section>
      </AnimatedSection>
    </main>
  )
}

export default HomePage
