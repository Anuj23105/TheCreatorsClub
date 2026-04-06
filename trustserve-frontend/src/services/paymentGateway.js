const RAZORPAY_SDK_URL = 'https://checkout.razorpay.com/v1/checkout.js'

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Payment can only be started in the browser'))
      return
    }

    if (window.Razorpay) {
      resolve(window.Razorpay)
      return
    }

    const existingScript = document.querySelector(`script[src="${RAZORPAY_SDK_URL}"]`)
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.Razorpay), { once: true })
      existingScript.addEventListener('error', () => reject(new Error('Unable to load Razorpay SDK')), {
        once: true,
      })
      return
    }

    const script = document.createElement('script')
    script.src = RAZORPAY_SDK_URL
    script.async = true
    script.onload = () => resolve(window.Razorpay)
    script.onerror = () => reject(new Error('Unable to load Razorpay SDK'))
    document.body.appendChild(script)
  })
}

export async function startPayment({ amount, customerName, customerEmail, customerPhone }) {
  const amountInPaise = Math.round(Number(amount) * 100)
  if (!Number.isFinite(amountInPaise) || amountInPaise <= 0) {
    throw new Error('Invalid payable amount')
  }

  const provider = import.meta.env.VITE_PAYMENT_PROVIDER || 'razorpay'

  if (provider === 'manual') {
    return {
      provider: 'manual',
      paymentId: `manual_${Date.now()}`,
      status: 'captured',
    }
  }

  const key = import.meta.env.VITE_RAZORPAY_KEY_ID
  if (!key) {
    throw new Error('Razorpay key is missing. Set VITE_RAZORPAY_KEY_ID in frontend env.')
  }

  const Razorpay = await loadRazorpayScript()

  return new Promise((resolve, reject) => {
    const checkout = new Razorpay({
      key,
      amount: amountInPaise,
      currency: 'INR',
      name: 'TrustServe',
      description: 'Service Booking Payment',
      prefill: {
        name: customerName || '',
        email: customerEmail || '',
        contact: customerPhone || '',
      },
      notes: {
        source: 'trustserve-cart-checkout',
      },
      theme: {
        color: '#0ea5e9',
      },
      handler: (response) => {
        resolve({
          provider: 'razorpay',
          paymentId: response.razorpay_payment_id,
          orderId: response.razorpay_order_id || '',
          signature: response.razorpay_signature || '',
          status: 'captured',
        })
      },
      modal: {
        ondismiss: () => {
          reject(new Error('Payment cancelled by user'))
        },
      },
    })

    checkout.on('payment.failed', (response) => {
      const message = response?.error?.description || 'Payment failed. Please try again.'
      reject(new Error(message))
    })

    checkout.open()
  })
}
