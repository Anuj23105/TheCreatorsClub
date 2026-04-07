import { useLanguage } from '../../context/LanguageContext.jsx'

function StatusTicker({ currentStatus, progress }) {
  const { tr } = useLanguage()

  return (
    <section className="glass-card rounded-2xl p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">{tr('Real-time Booking Status')}</h3>
        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          {progress}%
        </span>
      </div>
      <p className="mb-3 text-sm text-slate-600 dark:text-slate-300">{tr(currentStatus)}</p>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-full rounded-full bg-linear-to-r from-sky-500 to-emerald-500 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  )
}

export default StatusTicker
