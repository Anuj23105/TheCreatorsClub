function TermsPage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold">Terms of Service</h1>
      <p className="mt-2 text-sm text-slate-400">Effective date: March 31, 2026</p>

      <section className="glass-card mt-6 space-y-4 rounded-2xl p-6 text-sm text-slate-300">
        <p>
          TrustServe is a platform that connects customers with verified local service workers.
          By using this platform, you agree to comply with these terms and all applicable laws.
        </p>
        <p>
          Users must provide accurate account details. Workers must maintain updated service,
          availability, and verification records.
        </p>
        <p>
          TrustServe facilitates discovery and booking, but the quality of service execution remains
          the responsibility of the individual worker and customer at the time of service.
        </p>
        <p>
          We reserve the right to suspend accounts for fraudulent behavior, policy violations, or
          misuse of the platform.
        </p>
      </section>
    </main>
  )
}

export default TermsPage
