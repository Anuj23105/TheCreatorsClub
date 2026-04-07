import { Link } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

function NotFoundPage() {
  const { tr } = useLanguage()

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 text-center sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold">{tr('Page not found')}</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-300">
        {tr('The page you requested does not exist.')}
      </p>
      <Link to="/" className="mt-6 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white">
        {tr('Back to Home')}
      </Link>
    </main>
  )
}

export default NotFoundPage
