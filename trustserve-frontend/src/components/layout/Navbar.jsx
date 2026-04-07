import { Languages, Menu, ShoppingCart, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { useCart } from '../../context/CartContext.jsx'
import { useLanguage } from '../../context/LanguageContext.jsx'

function Navbar() {
  const {
    workerUser,
    customerUser,
    isWorkerAuthenticated,
    isCustomerAuthenticated,
    logoutWorker,
    logoutCustomer,
  } = useAuth()
  const { cartCount } = useCart()
  const { t, isHindi, toggleLanguage } = useLanguage()
  const [open, setOpen] = useState(false)
  const isAuthenticated = isWorkerAuthenticated || isCustomerAuthenticated
  const links = [
    { to: '/', label: t.nav.home },
    { to: '/services', label: t.nav.findServices },
    { to: '/booking', label: t.nav.book },
  ]
  const dashboardLink = isWorkerAuthenticated
    ? { to: '/worker-dashboard', label: t.nav.workerDashboard }
    : isCustomerAuthenticated
      ? { to: '/user-dashboard', label: t.nav.userDashboard }
      : null
  const skillsLink = !isCustomerAuthenticated ? { to: '/skills', label: t.nav.skills } : null
  const sessionLabel = isWorkerAuthenticated
    ? `${t.nav.worker}: ${workerUser?.name || t.nav.loggedIn}`
    : `${t.nav.customer}: ${customerUser?.name || t.nav.loggedIn}`
  const navLinks = [
    ...links,
    ...(skillsLink ? [skillsLink] : []),
    ...(dashboardLink ? [dashboardLink] : []),
  ]

  function handleLogout() {
    if (isWorkerAuthenticated) {
      logoutWorker()
      return
    }
    logoutCustomer()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-(--ts-card) backdrop-blur-xl dark:border-white/10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center">
          <img
            src="/logo.webp"
            alt="TrustServe"
            className="h-11 w-42.5 object-cover object-[28%_52%] sm:h-12 sm:w-47.5 lg:h-12 lg:w-52.5"
          />
        </Link>

        <button
          className="rounded-lg p-2 text-(--ts-text) md:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label={t.nav.toggleMenu}
        >
          <Menu size={20} />
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white'
                    : 'text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={toggleLanguage}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={isHindi ? 'Switch to English' : 'Switch to Hindi'}
          >
            <Languages size={16} /> {t.nav.language}
          </button>
          <Link
            to="/cart"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label={t.nav.openCart}
          >
            <ShoppingCart size={22} strokeWidth={2.2} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>
          {isAuthenticated ? (
            <>
              <span className="rounded-lg bg-emerald-100 px-3 py-2 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                {sessionLabel}
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300"
              >
                {t.nav.logout}
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
            >
              <UserRound size={16} /> {t.nav.login}
            </Link>
          )}
        </div>
      </nav>

      {open && (
        <div className="space-y-1 border-t border-slate-200 bg-(--ts-card) px-4 py-3 md:hidden dark:border-white/10">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-900/5 dark:text-slate-200 dark:hover:bg-white/10"
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={isHindi ? 'Switch to English' : 'Switch to Hindi'}
            >
              <Languages size={16} /> {t.nav.language}
            </button>
            <Link
              to="/cart"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              aria-label={t.nav.openCart}
            >
              <ShoppingCart size={22} strokeWidth={2.2} />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full rounded-lg bg-slate-900 px-3 py-2 text-center text-sm font-semibold text-white dark:bg-slate-200 dark:text-slate-900"
              >
                {t.nav.logout}
              </button>
            ) : (
              <Link
                to="/auth"
                className="w-full rounded-lg bg-sky-600 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {t.nav.login}
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
