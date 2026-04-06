import { ExternalLink, MapPinned } from 'lucide-react'

function buildMapsUrl(location) {
  const customEmbedUrl = import.meta.env.VITE_GOOGLE_MAPS_EMBED_URL
  if (customEmbedUrl) {
    return customEmbedUrl
  }

  const query = typeof location === 'string' && location.trim() ? location.trim() : 'Jaipur, Rajasthan, India'
  return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=12&output=embed`
}

function buildMapsSearchUrl(location) {
  const query = typeof location === 'string' && location.trim() ? location.trim() : 'Jaipur, Rajasthan, India'
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`
}

function MapPlaceholder({ location = 'Jaipur, Rajasthan, India', coords = null, title = 'Workers near you' }) {
  const searchLocation = coords ? `${coords.lat},${coords.lng}` : location
  const mapsUrl = coords
    ? `https://www.google.com/maps?q=${coords.lat},${coords.lng}&z=14&output=embed`
    : buildMapsUrl(location)
  const searchUrl = coords ? `https://www.google.com/maps/search/?api=1&query=${coords.lat},${coords.lng}` : buildMapsSearchUrl(location)

  return (
    <section className="glass-card overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-700">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-sky-700 dark:text-sky-300">
            <MapPinned size={14} /> Google Maps
          </div>
          <h3 className="mt-1 text-lg font-semibold">{title}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Showing {searchLocation || 'your selected service area'}
          </p>
        </div>
        <a
          href={searchUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-100 dark:border-sky-700 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:bg-sky-900/35"
        >
          Open Maps <ExternalLink size={14} />
        </a>
      </div>

      <div className="relative aspect-video w-full bg-slate-900">
        <iframe
          title="Google Maps"
          src={mapsUrl}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    </section>
  )
}

export default MapPlaceholder
