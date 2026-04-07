import { CheckCircle2, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import RatingStars from './RatingStars.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'

function WorkerCard({ worker, view = 'grid' }) {
  const { addToCart } = useCart()
  const { tr, trCategory } = useLanguage()

  function handleAddToCart() {
    addToCart({
      workerId: worker.id,
      workerName: worker.name,
      serviceType: worker.category,
      fee: worker.fee,
      location: worker.location,
      image: worker.image,
    })
  }

  return (
    <motion.article
      layout
      whileHover={{ y: -4 }}
      className={`glass-card rounded-2xl ${view === 'list' ? 'flex flex-col gap-4 p-4 md:flex-row' : 'p-4'} `}
    >
      <img
        src={worker.image}
        alt={worker.name}
        className={`${view === 'list' ? 'h-44 w-full md:w-52' : 'h-48 w-full'} rounded-xl object-cover`}
      />

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex items-center justify-between gap-2">
          <h3 className="text-xl font-semibold">{worker.name}</h3>
          {worker.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300">
              <CheckCircle2 size={14} /> {tr('Verified')}
            </span>
          )}
        </div>

        <p className="text-sm font-medium text-sky-700 dark:text-sky-300">{trCategory(worker.category)}</p>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
          <MapPin size={14} /> {worker.location} · {worker.distanceKm} km
        </p>
        <div className="mt-2 flex items-center gap-2">
          <RatingStars value={worker.rating} />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{worker.rating}</span>
        </div>

        {worker.rating < 4 && (
          <p className="mt-2 rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
            {tr('This worker has mixed reviews. Check profile details before booking.')}
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600 dark:text-slate-300">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{worker.experienceYears}+ {tr('yrs')}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{worker.completedJobs} {tr('jobs')}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{tr('Starting')} Rs {worker.fee}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to={`/workers/${worker.id}`}
            className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            {tr('View Profile')}
          </Link>
          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-xl border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/25"
          >
            {tr('Add to Cart')}
          </button>
          <Link
            to={`/booking?workerId=${worker.id}&service=${encodeURIComponent(worker.category)}`}
            className="rounded-xl border border-sky-200 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-50 dark:border-sky-700 dark:text-sky-300 dark:hover:bg-sky-900/30"
          >
            {tr('Book Service')}
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default WorkerCard
