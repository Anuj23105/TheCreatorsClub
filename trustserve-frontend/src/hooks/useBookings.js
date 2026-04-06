import { useEffect, useState } from 'react'

const statuses = ['Finding Worker', 'Worker Assigned', 'On The Way', 'Service In Progress', 'Completed']

export function useLiveBookingStatus(active) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (!active) {
      setStep(0)
      return
    }

    const id = setInterval(() => {
      setStep((prev) => (prev < statuses.length - 1 ? prev + 1 : prev))
    }, 1500)

    return () => clearInterval(id)
  }, [active])

  return {
    statuses,
    currentStatus: statuses[step],
    progress: Math.round(((step + 1) / statuses.length) * 100),
  }
}
