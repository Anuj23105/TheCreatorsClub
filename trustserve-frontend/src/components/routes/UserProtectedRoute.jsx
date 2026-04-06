import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'

function UserProtectedRoute({ children }) {
  const { isCustomerAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="glass-card rounded-2xl p-6">
          <p className="text-sm text-slate-600 dark:text-slate-300">Checking customer session...</p>
        </div>
      </main>
    )
  }

  if (!isCustomerAuthenticated) {
    return <Navigate to="/auth" replace state={{ from: location, role: 'Customer' }} />
  }

  return children
}

export default UserProtectedRoute