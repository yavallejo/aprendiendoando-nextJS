'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

// Motion principles: Slow in/out (ease into and out of poses), timing for rhythm
const EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const tickerCallbackRef = useRef(null)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData
    const isSmallScreen = window.innerWidth < 768

    // On mobile, for users with data saving enabled or who request less motion,
    // we do not initialize Lenis to protect INP and battery.
    if (prefersReducedMotion || saveData || isSmallScreen) {
      return
    }

    const initLenis = () => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: EASING,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        // Disable Lenis anchor handling so that
        // the browser uses native behavior + CSS scroll-margin-top.
        anchors: null,
        // Sync with GSAP ScrollTrigger
        autoRaf: false,
      })

      lenisRef.current = lenis

      // GSAP integration: ScrollTrigger and ticker for scroll-linked animations
      gsap.registerPlugin(ScrollTrigger)
      lenis.on('scroll', ScrollTrigger.update)
      const tickerCallback = (time) => {
        lenis.raf(time * 1000)
      }
      tickerCallbackRef.current = tickerCallback
      gsap.ticker.add(tickerCallback)
      gsap.ticker.lagSmoothing(0)
    }

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initLenis)
    } else {
      setTimeout(initLenis, 0)
    }

    return () => {
      if (tickerCallbackRef.current) {
        gsap.ticker.remove(tickerCallbackRef.current)
      }
      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
      }
    }
  }, [])

  // App Router: scroll to top when pathname changes
  useEffect(() => {
    const lenis = lenisRef.current
    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true })
    }
  }, [pathname])

  return <>{children}</>
}
