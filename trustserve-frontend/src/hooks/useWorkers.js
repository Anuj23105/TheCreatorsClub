import { useEffect, useState } from 'react'
import { fetchWorkers } from '../services/trustserveApi.js'

export function useWorkers(filters) {
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    async function load() {
      setLoading(true)
      try {
        const data = await fetchWorkers(filters)
        if (mounted) {
          setWorkers(data)
        }
      } catch (error) {
        if (mounted) {
          setWorkers([])
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [filters])

  return { workers, loading }
}
