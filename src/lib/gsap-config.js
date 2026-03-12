'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Anchor links (#section) and smooth scroll are handled by Lenis (LenisProvider with anchors)
export function useSmoothScroll() {
  // Reserved for additional logic if needed; Lenis already handles anchors
}

// Patrón tipo machone: ScrollTrigger + Lenis para animaciones de entrada al viewport.
// gsap.set inicial + timeline con scrollTrigger asegura sync con el scroll suave.
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

    function initAnimations() {
      if (prefersReducedMotion) return

      const sections = document.querySelectorAll('section')
      sections.forEach((section, index) => {
        // Saltar la primera sección (hero), ya tiene su propia animación
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

    // Iniciar al montar (DOM ya tiene las secciones) y refrescar cuando termine load
    initAnimations()
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
