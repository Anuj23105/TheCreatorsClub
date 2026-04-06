function SkeletonCard() {
  return (
    <article className="glass-card rounded-2xl p-4">
      <div className="mb-4 h-40 animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-700/60" />
      <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/60" />
      <div className="mb-4 h-4 w-2/3 animate-pulse rounded bg-slate-200/80 dark:bg-slate-700/60" />
      <div className="h-10 animate-pulse rounded-xl bg-slate-200/80 dark:bg-slate-700/60" />
    </article>
  )
}

export default SkeletonCard
