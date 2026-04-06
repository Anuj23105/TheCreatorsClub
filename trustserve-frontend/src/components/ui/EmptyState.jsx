import { SearchX } from 'lucide-react'

function EmptyState({ title, description }) {
  return (
    <div className="glass-card rounded-2xl px-6 py-10 text-center">
      <SearchX className="mx-auto mb-3 text-sky-600 dark:text-sky-400" size={42} />
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="mx-auto max-w-md text-slate-600 dark:text-slate-300">{description}</p>
    </div>
  )
}

export default EmptyState
