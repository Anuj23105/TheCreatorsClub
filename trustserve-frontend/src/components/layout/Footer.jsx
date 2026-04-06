import { FileText, Mail, MapPin, Phone, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="mt-12 border-t border-slate-200/70 py-8 dark:border-slate-800">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 text-sm text-slate-600 sm:px-6 lg:grid-cols-3 lg:px-8 dark:text-slate-300">
        <section className="space-y-3">
          <div className="flex items-center gap-3">
            <img
              src="/logo.webp"
              alt="TrustServe"
              className="h-10 w-37.5 object-cover object-[28%_52%] sm:h-10 sm:w-40"
            />
          </div>
          <p>Safe and verified local services for every city.</p>
          <p>Designed for trust, accessibility, and digital inclusion.</p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-semibold text-slate-100">Contact</h3>
          <p className="inline-flex items-center gap-2">
            <Mail size={16} className="text-sky-400" /> trustserve.help@gmail.com
          </p>
          <p className="inline-flex items-center gap-2">
            <Phone size={16} className="text-sky-400" /> +91 98765 43210
          </p>
          <p className="inline-flex items-center gap-2">
            <MapPin size={16} className="text-sky-400" /> Jaipur, Rajasthan, India
          </p>
        </section>

        <section className="space-y-3">
          <h3 className="text-base font-semibold text-slate-100">Compliance & Legal</h3>
          <p className="inline-flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-400" /> Licensed service providers and KYC verified workers
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link to="/terms" className="inline-flex items-center gap-1 text-slate-300 transition hover:text-sky-300">
              <FileText size={14} /> Terms
            </Link>
            <Link to="/privacy" className="inline-flex items-center gap-1 text-slate-300 transition hover:text-sky-300">
              <FileText size={14} /> Privacy
            </Link>
            <Link to="/worker-policy" className="inline-flex items-center gap-1 text-slate-300 transition hover:text-sky-300">
              <FileText size={14} /> Worker Policy
            </Link>
          </div>
          <p className="text-xs text-slate-400">TrustServe Services Pvt. Ltd. All rights reserved.</p>
        </section>
      </div>
      <div className="mx-auto mt-6 max-w-7xl border-t border-slate-800/80 px-4 pt-4 text-xs text-slate-400 sm:px-6 lg:px-8">
        Service availability and compliance may vary by city and local regulations.
      </div>
    </footer>
  )
}

export default Footer
