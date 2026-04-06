import { Lightbulb } from 'lucide-react'

function OnboardingHint({ children }) {
  return (
    <div className="glass-card mb-4 flex items-start gap-3 rounded-2xl border border-emerald-200 px-4 py-3 dark:border-emerald-800">
      <Lightbulb className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" size={20} />
      <p className="text-sm text-slate-700 dark:text-slate-200">{children}</p>
    </div>
  )
}

export default OnboardingHint
