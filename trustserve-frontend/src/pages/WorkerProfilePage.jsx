import { useEffect, useState } from 'react'
import { BadgeCheck } from 'lucide-react'
import { useParams, Link } from 'react-router-dom'
import RatingStars from '../components/ui/RatingStars.jsx'
import SkeletonCard from '../components/ui/SkeletonCard.jsx'
import { fetchReviews, fetchWorkerById, submitReview } from '../services/trustserveApi.js'
import { useLanguage } from '../context/LanguageContext.jsx'

function WorkerProfilePage() {
  const { tr, trCategory } = useLanguage()
  const { workerId } = useParams()
  const [worker, setWorker] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [comment, setComment] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const [workerData, reviewData] = await Promise.all([
          fetchWorkerById(workerId),
          fetchReviews(workerId),
        ])
        setWorker(workerData)
        setReviews(reviewData)
      } catch (err) {
        setError(err.message)
        setWorker(null)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [workerId])

  async function handleReviewSubmit(event) {
    event.preventDefault()
    if (!comment.trim()) {
      return
    }
    try {
      const created = await submitReview(workerId, { rating, comment })
      setReviews((prev) => [created, ...prev])
      setComment('')
      setError('')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <SkeletonCard />
      </main>
    )
  }

  if (!worker) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p>{error || tr('Worker not found.')}</p>
      </main>
    )
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-3 lg:px-8">
      <section className="glass-card rounded-2xl p-5 lg:col-span-2">
        <div className="flex flex-col gap-4 sm:flex-row">
          <img src={worker.image} alt={worker.name} className="h-52 w-full rounded-xl object-cover sm:w-56" />
          <div>
            <div className="mb-2 flex items-center gap-2">
              <h1 className="text-3xl font-bold">{worker.name}</h1>
              {worker.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                  <BadgeCheck size={14} /> {tr('Verified')}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-sky-700 dark:text-sky-300">{trCategory(worker.category)}</p>
            <div className="mt-2 flex items-center gap-2">
              <RatingStars value={worker.rating} />
              <span className="font-semibold">{worker.rating}</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{worker.about}</p>
            <p className="mt-3 text-sm">{tr('Experience')}: {worker.experienceYears}+ {tr('yrs')}</p>
            <p className="text-sm">{tr('Completed jobs')}: {worker.completedJobs}</p>
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold">{tr('Skills')}</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {worker.skills.map((skill) => (
              <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-sm dark:bg-slate-800">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold">{tr('Availability Calendar')}</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {worker.availability.map((slot) => (
              <div key={slot} className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
                {slot}
              </div>
            ))}
          </div>
        </div>

        <Link
          to="/booking"
          className="mt-5 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
        >
          {tr('Book Now')}
        </Link>
      </section>

      <aside className="space-y-4">
        {error && (
          <section className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-900/20 dark:text-rose-300">
            {error}
          </section>
        )}
        <section className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold">{tr('Rating & Reviews')}</h3>
          <div className="mt-3 space-y-3">
            {reviews.map((review) => (
              <div key={review.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
                <div className="mb-1 flex items-center justify-between">
                  <p className="text-sm font-semibold">{review.user}</p>
                  <span className="text-xs">{review.rating}/5</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="glass-card rounded-2xl p-5">
          <h3 className="text-lg font-semibold">{tr('Add Review')}</h3>
          <form className="mt-3 space-y-3" onSubmit={handleReviewSubmit}>
            <select
              value={rating}
              onChange={(event) => setRating(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            >
              <option value={5}>{tr('5 Stars')}</option>
              <option value={4}>{tr('4 Stars')}</option>
              <option value={3}>{tr('3 Stars')}</option>
              <option value={2}>{tr('2 Stars')}</option>
              <option value={1}>{tr('1 Star')}</option>
            </select>
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              placeholder={tr('Share your experience')}
            />
            <button className="w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
              {tr('Submit Review')}
            </button>
          </form>
        </section>
      </aside>
    </main>
  )
}

export default WorkerProfilePage
