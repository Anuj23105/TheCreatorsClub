import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from './RatingStars.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'

function TopRatedCarousel({ workers }) {
  const [idx, setIdx] = useState(0)
  const { tr, trCategory } = useLanguage()

  const current = useMemo(() => workers[idx], [workers, idx])

  if (!workers.length) {
    return null
  }

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold">{tr('Top Rated Near You')}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIdx((prev) => (prev - 1 + workers.length) % workers.length)}
            className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
            aria-label={tr('Previous')}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => setIdx((prev) => (prev + 1) % workers.length)}
            className="rounded-lg border border-slate-200 p-2 dark:border-slate-700"
            aria-label={tr('Next')}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-4 sm:flex-row">
        <img src={current.image} alt={current.name} className="h-36 w-full rounded-xl object-cover sm:w-44" />
        <div>
          <p className="text-lg font-semibold">{current.name}</p>
          <p className="text-sm text-slate-600 dark:text-slate-300">{trCategory(current.category)}</p>
          <div className="mt-2 flex items-center gap-2">
            <RatingStars value={current.rating} />
            <span className="font-semibold">{current.rating}</span>
          </div>
          <Link
            to={`/workers/${current.id}`}
            className="mt-4 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            {tr('View Details')}
          </Link>
        </div>
      </div>
    </div>
  )
}

export default TopRatedCarousel
