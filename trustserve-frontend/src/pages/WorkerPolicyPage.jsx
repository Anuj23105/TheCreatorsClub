function WorkerPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Worker Policy</h1>
      <p className="mt-2 text-sm text-slate-400">Effective date: March 31, 2026</p>

      <section className="glass-card mt-6 space-y-4 rounded-2xl p-6 text-sm text-slate-300">
        <p>
          Service workers must complete KYC and provide accurate profile details, service categories,
          and pricing transparency.
        </p>
        <p>
          Workers are expected to maintain professional behavior, timely communication, and safe
          service practices at customer locations.
        </p>
        <p>
          Repeated cancellations, no-shows, abuse, or fake documentation can lead to suspension or
          permanent removal from the platform.
        </p>
        <p>
          Workers must comply with local licensing requirements and city-level regulations where
          applicable.
        </p>
      </section>
    </main>
  )
}

export default WorkerPolicyPage
