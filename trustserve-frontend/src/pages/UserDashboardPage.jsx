function UserDashboardPage() {
  const history = [
    { id: 'BK-12455', worker: 'Amit Verma', service: 'Electrician', status: 'Completed' },
    { id: 'BK-12456', worker: 'Sanjay Kumar', service: 'Plumber', status: 'In Progress' },
  ]

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">User Dashboard</h1>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        Track active bookings, review history, and save trusted workers.
      </p>

      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <article className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-500">Active Bookings</p>
          <p className="mt-2 text-2xl font-bold">2</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-500">Completed</p>
          <p className="mt-2 text-2xl font-bold">14</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-500">Saved Workers</p>
          <p className="mt-2 text-2xl font-bold">6</p>
        </article>
        <article className="glass-card rounded-2xl p-4">
          <p className="text-sm text-slate-500">Pending Reviews</p>
          <p className="mt-2 text-2xl font-bold">1</p>
        </article>
      </section>

      <section className="glass-card mt-6 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Booking History</h2>
        <div className="mt-3 space-y-2">
          {history.map((booking) => (
            <article key={booking.id} className="rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{booking.id}</p>
                <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-slate-800">{booking.status}</span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {booking.service} · Worker: {booking.worker}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-2">
        <article className="glass-card rounded-2xl p-5">
          <h2 className="text-xl font-semibold">Review Section</h2>
          <textarea
            rows={4}
            className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            placeholder="Write a review for your recent booking"
          />
          <button className="mt-3 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">
            Submit Review
          </button>
        </article>

        <article className="glass-card rounded-2xl p-5">
          <h2 className="text-xl font-semibold">Saved Workers</h2>
          <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
            <li>Amit Verma · Electrician</li>
            <li>Ravi Narayan · AC Technician</li>
            <li>Sanjay Kumar · Plumber</li>
          </ul>
        </article>
      </section>
    </main>
  )
}

export default UserDashboardPage
