import { Star } from 'lucide-react'

function RatingStars({ value, size = 16 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rating ${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, idx) => {
        const filled = idx + 1 <= Math.round(value)
        return (
          <Star
            key={idx}
            size={size}
            className={filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
          />
        )
      })}
    </div>
  )
}

export default RatingStars
