import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useRef } from 'react'
import { useLanguage } from '../../context/LanguageContext.jsx'

const popularServices = [
  {
    id: 'svc-cleaning-2bath',
    title: 'Classic cleaning (2 bathrooms)',
    rating: 4.82,
    votes: '1.4M',
    price: 858,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'svc-drill-hang',
    title: 'Drill & hang (wall decor)',
    rating: 4.84,
    votes: '97K',
    price: 49,
    image: 'https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'svc-roll-on-waxing',
    title: 'Roll-on waxing (Full arms, legs & underarms)',
    rating: 4.87,
    votes: '130K',
    price: 749,
    image: 'https://images.unsplash.com/photo-1616391182219-e080b4d1043a?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'svc-tap-repair',
    title: 'Tap repair',
    rating: 4.79,
    votes: '114K',
    price: 49,
    image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'svc-switch-socket',
    title: 'Switch/socket replacement',
    rating: 4.83,
    votes: '74K',
    price: 49,
    image: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?auto=format&fit=crop&w=1200&q=80',
  },
]

function ServiceCardsCarousel() {
  const scrollRef = useRef(null)
  const { tr } = useLanguage()

  function scrollCards(direction) {
    if (!scrollRef.current) {
      return
    }

    const cardWidth = 320
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -cardWidth : cardWidth,
      behavior: 'smooth',
    })
  }

  return (
    <section className="relative mt-8">
      <h2 className="text-2xl font-bold">{tr('Popular Services')}</h2>
      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
        {tr('Choose from frequently booked services near you.')}
      </p>

      <button
        type="button"
        onClick={() => scrollCards('left')}
        className="absolute left-[-10px] top-[45%] z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 dark:hover:bg-slate-800"
        aria-label={`${tr('Previous')} ${tr('Service')}`}
      >
        <ChevronLeft size={20} />
      </button>

      <div
        ref={scrollRef}
        className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {popularServices.map((service) => (
          <article key={service.id} className="min-w-[260px] snap-start sm:min-w-[300px]">
            <div className="overflow-hidden rounded-2xl bg-slate-200">
              <img src={service.image} alt={service.title} className="h-[170px] w-full object-cover sm:h-[180px]" />
            </div>

            <div className="pt-3">
              <h3 className="text-[16px] font-semibold leading-snug text-slate-900 dark:text-slate-100 sm:text-[17px]">
                {tr(service.title)}
              </h3>

              <p className="mt-2 flex items-center gap-1 text-[16px] text-slate-700 dark:text-slate-200 sm:text-[17px]">
                <Star size={14} className="fill-current" />
                <span className="font-medium">{service.rating.toFixed(2)}</span>
                <span className="text-slate-600 dark:text-slate-300">({service.votes})</span>
              </p>

              <p className="mt-1 text-[18px] font-semibold text-slate-900 dark:text-slate-100 sm:text-[19px]">
                Rs {service.price}
              </p>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        onClick={() => scrollCards('right')}
        className="absolute right-[-10px] top-[45%] z-10 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/95 text-slate-800 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900/95 dark:text-slate-100 dark:hover:bg-slate-800"
        aria-label={`${tr('Next')} ${tr('Service')}`}
      >
        <ChevronRight size={20} />
      </button>
    </section>
  )
}

export default ServiceCardsCarousel
