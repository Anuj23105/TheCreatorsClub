import { useEffect, useState } from 'react'
import OnboardingHint from '../components/ui/OnboardingHint.jsx'
import { fetchWorkerDashboard } from '../services/trustserveApi.js'

function WorkerDashboardPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    monthlyEarnings: 0,
    acceptanceRate: 0,
  })
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true)
      try {
        const data = await fetchWorkerDashboard()
        setSummary(data.summary)
        setJobs(data.incomingJobs || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Worker Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Simple onboarding and job controls designed for non-technical workers.
      </p>

      <OnboardingHint>
        Tip: Complete profile verification first to get higher booking visibility and trust score.
      </OnboardingHint>

      <section className="grid gap-4 md:grid-cols-3">
        <article className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">Today Earnings</p>
          <p className="mt-2 text-2xl font-bold">Rs {summary.totalEarnings || 0}</p>
        </article>
        <article className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">This Month</p>
          <p className="mt-2 text-2xl font-bold">Rs {summary.monthlyEarnings || 0}</p>
        </article>
        <article className="glass-card rounded-2xl p-5">
          <p className="text-sm text-slate-500">Acceptance Rate</p>
          <p className="mt-2 text-2xl font-bold">{summary.acceptanceRate || 0}%</p>
        </article>
      </section>

      <section className="glass-card mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Incoming Jobs</h2>
        {loading && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Loading jobs...</p>}
        {!loading && error && (
          <p className="mt-3 text-sm text-rose-600 dark:text-rose-300">{error}</p>
        )}
        {!loading && !error && jobs.length === 0 && (
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">No incoming jobs right now.</p>
        )}
        <div className="mt-3 space-y-3">
          {jobs.map((job) => (
            <article key={job._id || job.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <p className="font-semibold">{job.serviceType}</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">{job.customer?.name || 'Customer'}</p>
              <div className="mt-2 flex gap-2">
                <button className="rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white">
                  Accept
                </button>
                <button className="rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white">
                  Reject
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="glass-card mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Profile Verification Upload</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          Upload ID proof and skill certificates to unlock verified badge.
        </p>
        <div className="mt-3 rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm dark:border-slate-700">
          Drag and drop files here (UI placeholder)
        </div>
      </section>
    </main>
  )
}

export default WorkerDashboardPage
