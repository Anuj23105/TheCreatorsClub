const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
const TOKEN_KEYS = {
  worker: 'trustserve-worker-token',
  customer: 'trustserve-customer-token',
}

function getToken(role = 'worker') {
  return localStorage.getItem(TOKEN_KEYS[role])
}

function setToken(token, role = 'worker') {
  localStorage.setItem(TOKEN_KEYS[role], token)
}

function clearToken(role = 'worker') {
  localStorage.removeItem(TOKEN_KEYS[role])
}

async function apiRequest(path, { method = 'GET', body, auth = false, authRole = 'worker' } = {}) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (auth) {
    const token = getToken(authRole)
    if (!token) {
      throw new Error(
        authRole === 'worker'
          ? 'Please login as service worker to continue'
          : 'Please login as customer to continue',
      )
    }
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(data.message || 'API request failed')
  }

  return data
}

export { apiRequest, getToken, setToken, clearToken }
