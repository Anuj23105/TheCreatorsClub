import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { apiRequest, clearToken, getToken, setToken } from '../services/apiClient.js'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [workerUser, setWorkerUser] = useState(null)
  const [customerUser, setCustomerUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function bootstrap() {
      const workerToken = getToken('worker')
      const customerToken = getToken('customer')

      const checks = []

      if (workerToken) {
        checks.push(
          apiRequest('/auth/me', { auth: true, authRole: 'worker' })
            .then((data) => {
              if (data?.user?.role === 'worker') {
                setWorkerUser(data.user)
              } else {
                clearToken('worker')
                setWorkerUser(null)
              }
            })
            .catch(() => {
              clearToken('worker')
              setWorkerUser(null)
            }),
        )
      }

      if (customerToken) {
        checks.push(
          apiRequest('/auth/me', { auth: true, authRole: 'customer' })
            .then((data) => {
              if (data?.user?.role === 'customer') {
                setCustomerUser(data.user)
              } else {
                clearToken('customer')
                setCustomerUser(null)
              }
            })
            .catch(() => {
              clearToken('customer')
              setCustomerUser(null)
            }),
        )
      }

      await Promise.all(checks)
      setLoading(false)
    }

    bootstrap()
  }, [])

  async function loginWorker(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (data?.user?.role !== 'worker') {
      throw new Error('Only service workers can login from this flow')
    }

    clearToken('customer')
    setCustomerUser(null)
    setToken(data.token, 'worker')
    setWorkerUser(data.user)
    return data.user
  }

  async function loginCustomer(email, password) {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    })

    if (data?.user?.role !== 'customer') {
      throw new Error('Please use a customer account for this login')
    }

    clearToken('worker')
    setWorkerUser(null)
    setToken(data.token, 'customer')
    setCustomerUser(data.user)
    return data.user
  }

  async function signupWorker(payload) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: 'worker',
        phone: payload.phone || '',
        city: payload.city || 'Jaipur',
        workerProfile: {
          category: payload.category || 'Electrician',
          about: payload.about || '',
          experienceYears: Number(payload.experienceYears || 0),
          baseFee: Number(payload.baseFee || 299),
          location: {
            city: payload.city || 'Jaipur',
            state: payload.state || 'Rajasthan',
          },
        },
      },
    })

    clearToken('customer')
    setCustomerUser(null)
    setToken(data.token, 'worker')
    setWorkerUser(data.user)
    return data.user
  }

  async function signupCustomer(payload) {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: {
        name: payload.name,
        email: payload.email,
        password: payload.password,
        role: 'customer',
        phone: payload.phone || '',
        city: payload.city || 'Jaipur',
      },
    })

    clearToken('worker')
    setWorkerUser(null)
    setToken(data.token, 'customer')
    setCustomerUser(data.user)
    return data.user
  }

  function logoutWorker() {
    clearToken('worker')
    setWorkerUser(null)
  }

  function logoutCustomer() {
    clearToken('customer')
    setCustomerUser(null)
  }

  const value = useMemo(
    () => ({
      workerUser,
      customerUser,
      loading,
      isWorkerAuthenticated: Boolean(workerUser),
      isCustomerAuthenticated: Boolean(customerUser),
      loginWorker,
      loginCustomer,
      signupWorker,
      signupCustomer,
      logoutWorker,
      logoutCustomer,
    }),
    [workerUser, customerUser, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider')
  }
  return context
}
