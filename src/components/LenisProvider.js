'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

// Motion principles: Slow in/out (ease into and out of poses), timing for rhythm
const EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const tickerCallbackRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData
    const isSmallScreen = window.innerWidth < 768

    // En móviles, usuarios con ahorro de datos o que piden menos movimiento
    // no inicializamos Lenis para proteger INP y batería.
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
        // Anchor links with offset for fixed header (~80px)
        anchors: {
          offset: 80,
        },
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

  // Next.js: scroll al inicio en cambio de ruta
  useEffect(() => {
    const handleRouteChange = () => {
      const lenis = lenisRef.current
      if (lenis) {
        lenis.scrollTo(0, { immediate: true, force: true })
      }
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return <>{children}</>
}
