import { useMemo, useState } from 'react'
import { BadgeCheck, CirclePlay, GraduationCap } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

const skillModules = [
  {
    id: 'safety-basics',
    title: 'Workplace Safety Basics',
    category: 'All Workers',
    duration: '12 min',
    videoUrl: 'https://www.youtube.com/embed/9No-FiEInLA',
    summary: 'Learn job-site safety, protective gear usage, and hazard reporting.',
  },
  {
    id: 'customer-communication',
    title: 'Customer Communication Skills',
    category: 'Professional Growth',
    duration: '10 min',
    videoUrl: 'https://www.youtube.com/embed/HAnw168huqA',
    summary: 'Understand how to greet, explain work, and handle customer concerns politely.',
  },
  {
    id: 'service-quality',
    title: 'Service Quality and Finishing',
    category: 'Field Excellence',
    duration: '14 min',
    videoUrl: 'https://www.youtube.com/embed/5MgBikgcWnY',
    summary: 'Improve delivery quality with checklists, final inspection, and clean handover.',
  },
]

function downloadCertificate(workerName) {
  const date = new Date().toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const content = [
    'TRUSTSERVE SKILL CERTIFICATE',
    '',
    `This certifies that ${workerName} has successfully completed the TrustServe worker training modules.`,
    '',
    'Completed modules:',
    '- Workplace Safety Basics',
    '- Customer Communication Skills',
    '- Service Quality and Finishing',
    '',
    `Issue Date: ${date}`,
    'Issued by: TrustServe Learning Hub',
  ].join('\n')

  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `trustserve-skill-certificate-${workerName.replace(/\s+/g, '-').toLowerCase()}.txt`
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

function SkillsPage() {
  const { isWorkerAuthenticated, workerUser } = useAuth()
  const { tr } = useLanguage()
  const [completedModules, setCompletedModules] = useState({})
  const [workerName, setWorkerName] = useState(workerUser?.name || '')

  const completedCount = useMemo(
    () => skillModules.filter((module) => completedModules[module.id]).length,
    [completedModules],
  )
  const allCompleted = completedCount === skillModules.length

  function markCompleted(moduleId) {
    setCompletedModules((prev) => ({
      ...prev,
      [moduleId]: true,
    }))
  }

  function handleGetCertificate() {
    const finalName = (workerName || workerUser?.name || '').trim()
    if (!finalName) {
      return
    }
    downloadCertificate(finalName)
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <section className="glass-card rounded-3xl p-6 sm:p-8">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          <GraduationCap size={14} /> {tr('Worker Skill Hub')}
        </p>
        <h1 className="text-3xl font-bold sm:text-4xl">{tr('Learn Skills, Earn Certificate')}</h1>
        <p className="mt-3 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          {tr('Watch training videos curated for TrustServe workers and complete all modules to download your skill certificate.')}
        </p>

        <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold">{tr('Learning Progress')}</p>
            <p className="text-sm font-bold">
              {completedCount}/{skillModules.length} {tr('modules completed')}
            </p>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
            <div
              className="h-2 rounded-full bg-emerald-500 transition-all"
              style={{ width: `${(completedCount / skillModules.length) * 100}%` }}
            />
          </div>
        </div>
      </section>

      <section className="mt-6 grid gap-5 lg:grid-cols-3">
        {skillModules.map((module) => (
          <article key={module.id} className="glass-card rounded-2xl p-4">
            <div className="mb-3 flex items-center justify-between gap-2">
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {tr(module.category)}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{module.duration}</span>
            </div>

            <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <iframe
                className="h-44 w-full"
                src={module.videoUrl}
                title={module.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            <h2 className="mt-3 text-lg font-semibold">{tr(module.title)}</h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{tr(module.summary)}</p>

            <button
              type="button"
              onClick={() => markCompleted(module.id)}
              disabled={Boolean(completedModules[module.id])}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 px-3 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-emerald-700 dark:text-emerald-300 dark:hover:bg-emerald-900/20"
            >
              {completedModules[module.id] ? <BadgeCheck size={16} /> : <CirclePlay size={16} />}
              {completedModules[module.id] ? tr('Completed') : tr('Mark as Completed')}
            </button>
          </article>
        ))}
      </section>

      <section className="glass-card mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-bold">{tr('Skill Certificate')}</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {tr('Complete all training modules and download your TrustServe worker skill certificate.')}
        </p>

        {!isWorkerAuthenticated && (
          <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
            {tr('Login as worker to claim your certificate.')}
            <Link to="/auth" state={{ role: 'Service Worker' }} className="ml-2 font-semibold underline">
              {tr('Go to Login')}
            </Link>
          </div>
        )}

        {isWorkerAuthenticated && (
          <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]">
            <input
              value={workerName}
              onChange={(event) => setWorkerName(event.target.value)}
              placeholder={tr('Worker Name on Certificate')}
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />
            <button
              type="button"
              onClick={handleGetCertificate}
              disabled={!allCompleted || !workerName.trim()}
              className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {tr('Download Certificate')}
            </button>
          </div>
        )}
      </section>
    </main>
  )
}

export default SkillsPage
