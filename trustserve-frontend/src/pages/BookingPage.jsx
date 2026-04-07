import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TriangleAlert } from 'lucide-react'
import { createBooking, fetchWorkerById, fetchWorkers } from '../services/trustserveApi.js'
import { useLiveBookingStatus } from '../hooks/useBookings.js'
import StatusTicker from '../components/ui/StatusTicker.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function BookingPage() {
  const { tr, trCategory } = useLanguage()
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.toString()
  const [form, setForm] = useState({
    service: searchParams.get('service') || searchParams.get('category') || 'Electrician',
    workerId: '',
    date: '2026-04-02',
    time: '11:00',
    notes: '',
  })
  const [workers, setWorkers] = useState([])
  const [booking, setBooking] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const { currentStatus, progress } = useLiveBookingStatus(Boolean(booking))

  const priceBreakdown = useMemo(
    () => [
      { label: tr('Base service fee'), value: 299 },
      { label: tr('Platform fee'), value: 40 },
      { label: tr('Safety assurance'), value: 20 },
    ],
    [tr],
  )

  const total = priceBreakdown.reduce((acc, item) => acc + item.value, 0)

  useEffect(() => {
    async function loadWorkers() {
      try {
        const category = searchParams.get('service') || searchParams.get('category') || 'All'
        const location = searchParams.get('location') || ''
        const selectedWorkerId = searchParams.get('workerId') || ''
        const list = await fetchWorkers({ category, minRating: 0, maxDistance: 30, location })
        let nextWorkers = list
        let selectedWorkerCategory = category === 'All' ? '' : category

        if (selectedWorkerId && !list.some((worker) => worker.id === selectedWorkerId)) {
          try {
            const selectedWorker = await fetchWorkerById(selectedWorkerId)
            nextWorkers = [selectedWorker, ...list]
            selectedWorkerCategory = selectedWorker.category
          } catch (err) {
            nextWorkers = list
          }
        }

        setWorkers(nextWorkers)

        if (selectedWorkerId) {
          setForm((prev) => ({
            ...prev,
            workerId: selectedWorkerId,
            service: selectedWorkerCategory || prev.service,
          }))
        } else if (nextWorkers.length) {
          setForm((prev) => ({
            ...prev,
            workerId: nextWorkers[0].id,
            service: selectedWorkerCategory || nextWorkers[0].category || prev.service,
          }))
        }
      } catch (err) {
        setWorkers([])
      }
    }

    loadWorkers()
  }, [searchQuery])

  function updateField(event) {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    try {
      if (!form.workerId) {
        throw new Error(tr('Please choose a worker before booking'))
      }
      const result = await createBooking(form)
      setBooking(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">{tr('Booking System')}</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{tr('Step-based booking with transparent pricing and status tracking.')}</p>

      <section className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="glass-card rounded-2xl p-5 lg:col-span-2">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{tr('Service')}</label>
              <select name="service" value={form.service} onChange={updateField} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                <option value="Electrician">{trCategory('Electrician')}</option>
                <option value="Plumber">{trCategory('Plumber')}</option>
                <option value="Carpenter">{trCategory('Carpenter')}</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{tr('Worker')}</label>
              <select
                name="workerId"
                value={form.workerId}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              >
                {!workers.length && <option value="">{tr('No workers available')}</option>}
                {workers.map((worker) => (
                  <option key={worker.id} value={worker.id}>
                    {worker.name} ({trCategory(worker.category)})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{tr('Date')}</label>
              <input type="date" name="date" value={form.date} onChange={updateField} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            </div>
            <div>
              <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{tr('Time')}</label>
              <input type="time" name="time" value={form.time} onChange={updateField} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
            </div>
          </div>

          <textarea
            name="notes"
            value={form.notes}
            onChange={updateField}
            rows={4}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            placeholder={tr('Add service notes')}
          />

          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="mt-4 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700 disabled:opacity-60"
          >
            {submitting ? tr('Confirming...') : tr('Confirm Booking')}
          </button>

          {error && (
            <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-900/20 dark:text-rose-300">
              <p className="flex items-center gap-2 font-semibold">
                <TriangleAlert size={16} /> {tr('Booking failed')}
              </p>
              <p className="mt-1">{error}</p>
            </div>
          )}

          {booking && (
            <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
              {tr('Booking confirmed with ID')} {booking.id}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <section className="glass-card rounded-2xl p-5">
            <h2 className="text-lg font-semibold">{tr('Pricing Transparency')}</h2>
            <div className="mt-3 space-y-2 text-sm">
              {priceBreakdown.map((item) => (
                <div key={item.label} className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-300">{item.label}</span>
                  <span className="font-semibold">Rs {item.value}</span>
                </div>
              ))}
              <div className="mt-2 border-t border-slate-200 pt-2 text-base font-bold dark:border-slate-700">
                {tr('Total payable')}: Rs {total}
              </div>
            </div>
          </section>

          <StatusTicker currentStatus={currentStatus} progress={progress} />
        </aside>
      </section>
    </main>
  )
}

export default BookingPage
