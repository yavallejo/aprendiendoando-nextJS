'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Anchor links (#section) and smooth scrolling are handled by Lenis (LenisProvider with anchors)
export function useSmoothScroll() {
  // Reserved for additional logic if needed; Lenis already handles anchors.
  // If we add logic here in the future, it must respect prefers-reduced-motion/saveData.
}

// Machone-style pattern: ScrollTrigger + Lenis for entrance animations on viewport.
// Initial gsap.set + timeline with ScrollTrigger keeps things in sync with smooth scrolling.
const EASE = 'power2.out'
const Y = 24

function reveal(trigger, build, startPos = 'top 85%') {
  const el = typeof trigger === 'string' ? document.querySelector(trigger) : trigger
  if (!el) return null

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: startPos,
      toggleActions: 'play none none none',
      once: true,
    },
  })
  build(tl, el)
  return tl
}

export function useScrollAnimations() {
  const timelinesRef = useRef([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    gsap.registerPlugin(ScrollTrigger)

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const saveData = typeof navigator !== 'undefined' && navigator.connection?.saveData
    const isSmallScreen = window.innerWidth < 768

    function initAnimations() {
      // Respect users who request reduced motion, data saving, or are on small screens.
      if (prefersReducedMotion || saveData || isSmallScreen) return

      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        // Skip the first section (hero), it already has its own animation
        if (index === 0 || section.closest('[data-skip-reveal]')) return

        const tl = reveal(
          section,
          (tl, el) => {
            gsap.set(el, { opacity: 0, y: Y })
            tl.to(el, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: EASE,
            })
          },
          'top 88%'
        )
        if (tl) timelinesRef.current.push(tl)
      })

      ScrollTrigger.refresh()
    }

    // Initialize lazily so it does not compete with the first render.
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(initAnimations)
    } else {
      setTimeout(initAnimations, 0)
    }
    const onLoad = () => ScrollTrigger.refresh()
    if (document.readyState !== 'complete') {
      window.addEventListener('load', onLoad, { once: true })
    }
    const refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 400)

    return () => {
      clearTimeout(refreshTimer)
      window.removeEventListener('load', onLoad)
      timelinesRef.current.forEach((tl) => {
        tl.scrollTrigger?.kill()
        tl.kill()
      })
      timelinesRef.current = []
    }
  }, [])
}
