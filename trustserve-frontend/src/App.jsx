import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer.jsx'
import Navbar from './components/layout/Navbar.jsx'
import UserProtectedRoute from './components/routes/UserProtectedRoute.jsx'
import WorkerProtectedRoute from './components/routes/WorkerProtectedRoute.jsx'
import SkeletonCard from './components/ui/SkeletonCard.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AuthPage = lazy(() => import('./pages/AuthPage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const SkillsPage = lazy(() => import('./pages/SkillsPage.jsx'))
const CartPage = lazy(() => import('./pages/CartPage.jsx'))
const WorkerProfilePage = lazy(() => import('./pages/WorkerProfilePage.jsx'))
const BookingPage = lazy(() => import('./pages/BookingPage.jsx'))
const WorkerDashboardPage = lazy(() => import('./pages/WorkerDashboardPage.jsx'))
const UserDashboardPage = lazy(() => import('./pages/UserDashboardPage.jsx'))
const TermsPage = lazy(() => import('./pages/TermsPage.jsx'))
const PrivacyPage = lazy(() => import('./pages/PrivacyPage.jsx'))
const WorkerPolicyPage = lazy(() => import('./pages/WorkerPolicyPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function PageFallback() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 h-10 w-64 animate-pulse rounded-xl bg-white/50 dark:bg-slate-800/70" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <Navbar />
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route
            path="/skills"
            element={
              <WorkerProtectedRoute>
                <SkillsPage />
              </WorkerProtectedRoute>
            }
          />
          <Route path="/worker-skills" element={<Navigate to="/skills" replace />} />
          <Route path="/learn-skills" element={<Navigate to="/skills" replace />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/workers/:workerId" element={<WorkerProfilePage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route
            path="/worker-dashboard"
            element={
              <WorkerProtectedRoute>
                <WorkerDashboardPage />
              </WorkerProtectedRoute>
            }
          />
          <Route
            path="/user-dashboard"
            element={
              <UserProtectedRoute>
                <UserDashboardPage />
              </UserProtectedRoute>
            }
          />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/worker-policy" element={<WorkerPolicyPage />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Footer />
    </div>
  )
}

export default App
