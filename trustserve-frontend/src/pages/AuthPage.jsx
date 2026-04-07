import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useLanguage } from '../context/LanguageContext.jsx'

function AuthPage() {
  const { tr, trCategory } = useLanguage()
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState('Service Worker')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    city: '',
    category: 'Electrician',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const {
    loginWorker,
    signupWorker,
    loginCustomer,
    signupCustomer,
    isWorkerAuthenticated,
    isCustomerAuthenticated,
  } = useAuth()

  const isWorkerRole = role === 'Service Worker'
  const defaultRedirect = isWorkerRole ? '/worker-dashboard' : '/user-dashboard'
  const redirectPath = location.state?.from?.pathname || defaultRedirect
  const redirectSearch = location.state?.from?.search || ''
  const redirectTo = `${redirectPath}${redirectSearch}`

  useEffect(() => {
    if (location.state?.role === 'Customer') {
      setRole('Customer')
    }
  }, [location.state])

  useEffect(() => {
    if (isWorkerAuthenticated && isWorkerRole) {
      navigate('/worker-dashboard', { replace: true })
      return
    }

    if (isCustomerAuthenticated && !isWorkerRole) {
      navigate('/user-dashboard', { replace: true })
    }
  }, [isWorkerAuthenticated, isCustomerAuthenticated, isWorkerRole, navigate])

  function updateField(event) {
    const { name, value } = event.target
    setError('')
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function validateForm() {
    if (!form.email.trim()) {
      return tr('Email is required')
    }

    if (!form.password) {
      return tr('Password is required')
    }

    if (mode === 'signup') {
      if (!form.name.trim()) {
        return tr('Name is required')
      }

      if (!form.city.trim()) {
        return tr('City is required')
      }

      if (form.password.length < 6) {
        return tr('Password must be at least 6 characters')
      }

      if (form.password !== form.confirmPassword) {
        return tr('Password and confirm password do not match')
      }
    }

    return ''
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    try {
      setLoading(true)
      if (isWorkerRole) {
        if (mode === 'login') {
          await loginWorker(form.email, form.password)
        } else {
          await signupWorker(form)
        }
      } else {
        if (mode === 'login') {
          await loginCustomer(form.email, form.password)
        } else {
          await signupCustomer(form)
        }
      }

      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-2 lg:px-8">
      <section className="glass-card rounded-3xl p-6 sm:p-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-300">
          {tr('JWT-ready Auth UI')}
        </p>
        <h1 className="text-3xl font-bold">{mode === 'login' ? tr('Welcome back') : tr('Create your account')}</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          {tr('Choose your role and continue. Backend integration can directly map to JWT endpoints.')}
        </p>

        <div className="mt-5 inline-flex rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            onClick={() => setMode('login')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === 'login' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}
          >
            {tr('Login')}
          </button>
          <button
            onClick={() => setMode('signup')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold ${mode === 'signup' ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}
          >
            {tr('Signup')}
          </button>
        </div>

        <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <input
              name="name"
              value={form.name}
              onChange={updateField}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              placeholder={tr('Full Name')}
            />
          )}
          <input
            name="email"
            value={form.email}
            onChange={updateField}
            type="email"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            placeholder={tr('Email')}
          />
          <input
            name="password"
            value={form.password}
            onChange={updateField}
            type="password"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            placeholder={tr('Password')}
          />

          {mode === 'signup' && (
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={updateField}
              type="password"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
              placeholder={tr('Confirm Password')}
            />
          )}

          {mode === 'signup' && (
            <>
              <input
                name="phone"
                value={form.phone}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                placeholder={tr('Phone (optional)')}
              />
              <input
                name="city"
                value={form.city}
                onChange={updateField}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                placeholder={tr('City')}
              />
              {isWorkerRole && (
                <select
                  name="category"
                  value={form.category}
                  onChange={updateField}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="Electrician">{trCategory('Electrician')}</option>
                  <option value="Plumber">{trCategory('Plumber')}</option>
                  <option value="Carpenter">{trCategory('Carpenter')}</option>
                  <option value="AC Technician">{trCategory('AC Technician')}</option>
                </select>
              )}
            </>
          )}

          <div>
            <label className="mb-1 block text-xs font-semibold uppercase text-slate-500">{tr('Role')}</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setRole('Customer')}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  role === 'Customer'
                    ? 'bg-sky-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {tr('Customer')}
              </button>
              <button
                type="button"
                onClick={() => setRole('Service Worker')}
                className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
                  role === 'Service Worker'
                    ? 'bg-sky-600 text-white'
                    : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                {tr('Service Worker')}
              </button>
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-300">
              {error}
            </p>
          )}

          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            {loading
              ? tr('Please wait...')
              : mode === 'login'
                ? isWorkerRole
                  ? tr('Worker Login')
                  : tr('Customer Login')
                : isWorkerRole
                  ? tr('Create Worker Account')
                  : tr('Create Customer Account')}
          </motion.button>
        </form>
      </section>

      <section className="glass-card rounded-3xl p-6 sm:p-8">
        <h2 className="text-2xl font-bold">{tr('Secure, role-based access')}</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
          <li>{tr('Customer flows for quick booking and reviews')}</li>
          <li>{tr('Worker flows are now enabled with live JWT login/logout state')}</li>
          <li>{tr('Both customer and worker dashboard routes are protected')}</li>
        </ul>

        <div className="mt-5 rounded-2xl border border-dashed border-sky-300 bg-sky-50 p-4 text-sm dark:border-sky-800 dark:bg-sky-900/20">
          API-ready payload example: {'{ email, password, role }'}
        </div>
      </section>
    </main>
  )
}

export default AuthPage
