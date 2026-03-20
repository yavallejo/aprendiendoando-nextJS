'use client'

import { useEffect, useMemo, useRef } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function GAPageViewsClient({ measurementId }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const fullPath = useMemo(() => {
    const qs = searchParams?.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }, [pathname, searchParams])

  const didInitRef = useRef(false)

  useEffect(() => {
    if (!measurementId) return

    // Skip the first run: GA4 already fires the initial page_view when `gtag('config')` loads.
    if (!didInitRef.current) {
      didInitRef.current = true
      return
    }

    if (typeof window === 'undefined') return
    const gtagFn = window.gtag
    if (typeof gtagFn !== 'function') return

    gtagFn('config', measurementId, {
      page_path: fullPath,
    })
  }, [fullPath, measurementId])

  return null
}

