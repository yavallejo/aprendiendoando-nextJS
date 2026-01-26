'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'

export function useSmoothScroll() {
  useEffect(() => {
    // Smooth scroll for anchor links using native smooth scroll
    // GSAP animations will be handled separately for scroll-triggered animations
    const handleAnchorClick = (e) => {
      const href = e.target.closest('a')?.getAttribute('href')
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href)
        if (target) {
          e.preventDefault()
          const headerOffset = 80
          const elementPosition = target.getBoundingClientRect().top
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          })
        }
      }
    }

    // Add event listener to all anchor links
    const links = document.querySelectorAll('a[href^="#"]')
    links.forEach((link) => {
      link.addEventListener('click', handleAnchorClick)
    })

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', handleAnchorClick)
      })
    }
  }, [])
}

export function useScrollAnimations() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gsap.fromTo(
            entry.target,
            {
              opacity: 0,
              y: 50,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            }
          )
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    // Observe all sections with a small delay to ensure DOM is ready
    setTimeout(() => {
      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        observer.observe(section)
      })
    }, 100)

    return () => {
      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])
}
