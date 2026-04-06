import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { useCart } from '../context/CartContext.jsx'
import { createBooking } from '../services/trustserveApi.js'
import { startPayment } from '../services/paymentGateway.js'

function CartPage() {
  const navigate = useNavigate()
  const { isCustomerAuthenticated } = useAuth()
  const {
    items,
    cartCount,
    cartTotal,
    updateCartItem,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [customerPhone, setCustomerPhone] = useState('')

  const platformFee = useMemo(() => (cartTotal > 0 ? 40 : 0), [cartTotal])
  const finalAmount = cartTotal + platformFee

  async function handleCheckout() {
    setError('')
    setSuccess('')

    if (!items.length) {
      setError('Your cart is empty.')
      return
    }

    if (!isCustomerAuthenticated) {
      setShowLoginModal(true)
      return
    }

    setSubmitting(true)

    try {
      const paymentResult = await startPayment({
        amount: finalAmount,
        customerName: 'TrustServe Customer',
        customerEmail: '',
        customerPhone,
      })

      const bookingRequests = []

      items.forEach((item) => {
        for (let i = 0; i < item.quantity; i += 1) {
          bookingRequests.push(
            createBooking({
              workerId: item.workerId,
              service: item.serviceType,
              date: item.date,
              time: item.time,
              notes: item.notes,
              paymentId: paymentResult.paymentId,
              paymentProvider: paymentResult.provider,
            }),
          )
        }
      })

      const results = await Promise.allSettled(bookingRequests)
      const failed = results.filter((result) => result.status === 'rejected')

      if (failed.length > 0) {
        throw new Error(
          failed[0].reason?.message || 'Some services could not be booked. Please try again.',
        )
      }

      clearCart()
      setSuccess(`Payment successful (${paymentResult.paymentId}). Your services are booked.`)
    } catch (err) {
      setError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  function goToLogin() {
    setShowLoginModal(false)
    navigate('/auth', {
      state: {
        role: 'Customer',
        from: { pathname: '/cart' },
      },
    })
  }

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Your Service Cart</h1>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Review selected services and pay to confirm your bookings.
          </p>
        </div>
        <Link
          to="/services"
          className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700"
        >
          Add More Services
        </Link>
      </div>

      {!items.length && (
        <section className="glass-card mt-6 rounded-2xl p-6 text-center">
          <p className="text-lg font-semibold">Your cart is empty</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Browse workers and add services to continue.
          </p>
          <Link
            to="/services"
            className="mt-4 inline-flex rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
          >
            Explore Services
          </Link>
        </section>
      )}

      {!!items.length && (
        <section className="mt-6 grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {items.map((item) => (
              <article key={item.id} className="glass-card rounded-2xl p-4">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <img
                    src={item.image}
                    alt={item.workerName}
                    className="h-28 w-full rounded-xl object-cover sm:w-44"
                  />

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h2 className="text-lg font-semibold">{item.serviceType}</h2>
                        <p className="text-sm text-slate-600 dark:text-slate-300">
                          {item.workerName} • {item.location}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="rounded-lg border border-rose-300 p-2 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-900/20"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                      <input
                        type="date"
                        value={item.date}
                        onChange={(event) => updateCartItem(item.id, { date: event.target.value })}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                      />
                      <input
                        type="time"
                        value={item.time}
                        onChange={(event) => updateCartItem(item.id, { time: event.target.value })}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                      />
                      <div className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-2 py-1 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="min-w-5 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="rounded-lg p-1 hover:bg-slate-100 dark:hover:bg-slate-800"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    <textarea
                      value={item.notes}
                      onChange={(event) => updateCartItem(item.id, { notes: event.target.value })}
                      rows={2}
                      placeholder="Notes for this service"
                      className="mt-3 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
                    />

                    <p className="mt-3 text-sm font-semibold">Subtotal: Rs {item.fee * item.quantity}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="glass-card h-fit rounded-2xl p-5">
            <h2 className="text-lg font-semibold">Payment Summary</h2>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
              Gateway: {import.meta.env.VITE_PAYMENT_PROVIDER === 'manual' ? 'Manual test mode' : 'Razorpay'}
            </p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Items ({cartCount})</span>
                <span>Rs {cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform fee</span>
                <span>Rs {platformFee}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold dark:border-slate-700">
                <span>Total payable</span>
                <span>Rs {finalAmount}</span>
              </div>
            </div>

            <label className="mt-4 block text-xs font-semibold uppercase text-slate-500">
              Contact Number (for payment)
            </label>
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              placeholder="e.g. 9876543210"
              className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900"
            />

            <button
              type="button"
              onClick={handleCheckout}
              disabled={submitting}
              className="mt-4 w-full rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {submitting ? 'Opening payment...' : 'Pay & Confirm Services'}
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold dark:border-slate-700"
            >
              Clear Cart
            </button>

            {error && (
              <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700 dark:border-rose-900 dark:bg-rose-900/20 dark:text-rose-300">
                {error}
              </p>
            )}

            {success && (
              <p className="mt-3 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700 dark:border-emerald-800 dark:bg-emerald-900/20 dark:text-emerald-300">
                {success}
              </p>
            )}
          </aside>
        </section>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-5 shadow-2xl dark:bg-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">Login required</h3>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Please login as customer to pay and confirm these services.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                type="button"
                onClick={goToLogin}
                className="flex-1 rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-700"
              >
                Login / Signup
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="flex-1 rounded-xl border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default CartPage
