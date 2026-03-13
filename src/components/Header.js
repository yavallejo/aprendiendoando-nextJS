'use client'

import { useState, useEffect, useRef, startTransition } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X, Youtube } from 'lucide-react'

const YOUTUBE_SUBSCRIBE_URL = 'https://www.youtube.com/@AprendiendoAndo?sub_confirmation=1'

const navigation = [
  { name: 'Sobre mí', href: '#about-me' },
  { name: 'Videos', href: '#videos' },
  { name: 'Cursos', href: '#premium-courses' },
  { name: 'Contacto', href: '#contact' },
]

const STICKY_SCROLL_THRESHOLD = 20

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const headerRef = useRef(null)
  const stickyTweenRef = useRef(null)
  const mobileNavWrapperRef = useRef(null)
  const mobileNavRef = useRef(null)
  const mobileNavItemsRef = useRef([])
  const mobileMenuTlRef = useRef(null)
  const mobileMenuHasOpenedRef = useRef(false)

  const logoRef = useRef(null)
  const splitLogoRef = useRef(null)
  const logoIntroTlRef = useRef(null)
  const lastLogoIndexRef = useRef(-1)

  // Registrar plugin SplitText una sola vez en cliente
  useEffect(() => {
    if (typeof window === 'undefined') return
    gsap.registerPlugin(SplitText)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      startTransition(() => {
        setIsScrolled(window.scrollY > STICKY_SCROLL_THRESHOLD)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // GSAP: animation when applying/removing sticky (transforms, cleanup, reduced motion)
  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(header, { y: 0 })
      return
    }

    stickyTweenRef.current?.kill()

    if (isScrolled) {
      stickyTweenRef.current = gsap.fromTo(
        header,
        { y: -8 },
        {
          y: 0,
          duration: 0.35,
          ease: 'power2.out',
          overwrite: true,
        }
      )
    } else {
      stickyTweenRef.current = gsap.to(header, {
        y: 0,
        duration: 0.2,
        ease: 'power2.out',
        overwrite: true,
      })
    }

    return () => stickyTweenRef.current?.kill()
  }, [isScrolled])

  // GSAP: mobile menu open/close animation + reduced motion
  useEffect(() => {
    const wrapper = mobileNavWrapperRef.current
    const nav = mobileNavRef.current
    const items = mobileNavItemsRef.current.filter(Boolean)
    if (!wrapper || !nav) return

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    mobileMenuTlRef.current?.kill()

    // Initial closed state (no animation on first mount)
    if (!isMobileMenuOpen && !mobileMenuHasOpenedRef.current) {
      gsap.set(wrapper, { height: 0, opacity: 0, overflow: 'hidden' })
      gsap.set(items, { opacity: 0, y: 12 })
      return
    }

    if (isMobileMenuOpen) {
      mobileMenuHasOpenedRef.current = true
      const height = nav.scrollHeight
      if (prefersReducedMotion) {
        gsap.set(wrapper, { height, opacity: 1 })
        gsap.set(items, { opacity: 1, y: 0 })
        return
      }
      gsap.set(wrapper, { height: 0, opacity: 0, overflow: 'hidden' })
      gsap.set(items, { opacity: 0, y: 12 })
      mobileMenuTlRef.current = gsap.timeline()
        .to(wrapper, {
          height,
          opacity: 1,
          duration: 0.35,
          ease: 'power2.out',
          overflow: 'hidden',
        })
        .to(items, {
          opacity: 1,
          y: 0,
          duration: 0.3,
          stagger: 0.05,
          ease: 'power2.out',
        }, '-=0.15')
    } else {
      if (prefersReducedMotion) {
        gsap.set(wrapper, { height: 0, opacity: 0 })
        return
      }
      mobileMenuTlRef.current = gsap.timeline()
        .to(items, {
          opacity: 0,
          y: -8,
          duration: 0.15,
          stagger: 0.02,
          ease: 'power2.in',
        })
        .to(wrapper, {
          height: 0,
          opacity: 0,
          duration: 0.25,
          ease: 'power2.in',
          overflow: 'hidden',
        }, '-=0.05')
    }

    return () => mobileMenuTlRef.current?.kill()
  }, [isMobileMenuOpen])

  // Cleanup logo animations on unmount
  useEffect(() => {
    return () => {
      if (splitLogoRef.current) {
        splitLogoRef.current.revert()
        splitLogoRef.current = null
      }
      logoIntroTlRef.current?.kill()
    }
  }, [])

  const handleLogoMouseEnter = () => {
    if (typeof window === 'undefined') return
    const target = logoRef.current
    if (!target) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    if (!splitLogoRef.current) {
      splitLogoRef.current = SplitText.create(target, {
        type: 'chars',
        charsClass: 'aa-logo-char',
      })
    }

    const letters = splitLogoRef.current.chars || []
    if (!letters || !letters.length) return

    logoIntroTlRef.current?.kill()
    gsap.set(letters, { transformOrigin: '50% 50%', willChange: 'transform, color, text-shadow' })

    logoIntroTlRef.current = gsap.timeline({ defaults: { ease: 'power2.out' } })
      .fromTo(
        letters,
        { y: 0, opacity: 0.9 },
        {
          y: -1.5,
          opacity: 1,
          duration: 0.45,
          stagger: 0.03,
        }
      )
      .to(
        letters,
        {
          y: 0,
          duration: 0.4,
          stagger: 0.02,
        },
        '-=0.25'
      )
  }

  const handleLogoMouseMove = (event) => {
    if (typeof window === 'undefined') return
    const target = logoRef.current
    if (!target || !splitLogoRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const letters = splitLogoRef.current.chars || []
    if (!letters || !letters.length) return

    const rect = target.getBoundingClientRect()
    if (rect.width === 0) return

    const x = event.clientX - rect.left
    const ratio = Math.min(1, Math.max(0, x / rect.width))
    const index = Math.min(letters.length - 1, Math.max(0, Math.round(ratio * (letters.length - 1))))

    if (index === lastLogoIndexRef.current) return

    const current = letters[index]
    const previous = lastLogoIndexRef.current >= 0 ? letters[lastLogoIndexRef.current] : null
    lastLogoIndexRef.current = index

    if (previous && previous !== current) {
      gsap.to(previous, {
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    gsap.to(current, {
      y: -2,
      duration: 0.25,
      ease: 'power2.out',
      overwrite: 'auto',
    })
  }

  const handleLogoMouseLeave = () => {
    const letters = splitLogoRef.current?.chars || []
    if (!letters || !letters.length) return

    lastLogoIndexRef.current = -1
    logoIntroTlRef.current?.kill()

    gsap.to(letters, {
      y: 0,
      duration: 0.35,
      ease: 'power2.out',
      clearProps: 'will-change',
    })
  }

  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      const headerOffset = 80
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color] duration-300 ${isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-border/50'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex h-16 items-center">
          {/* Logo con animación sutil al hover (GSAP) */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-[opacity,transform] duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] shrink-0"
            onMouseEnter={handleLogoMouseEnter}
            onMouseMove={handleLogoMouseMove}
            onMouseLeave={handleLogoMouseLeave}
          >
            <svg
              className="w-[1.65em] h-[1.65em] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="3" strokeWidth="1.5" opacity="0.85" />
              <path d="M7 9l3 3-3 3" strokeWidth="1.5" opacity="0.9" />
              <path d="M11 15h4" strokeWidth="1.5" opacity="0.9" />
            </svg>
            <span ref={logoRef} className="relative inline-flex">
              AprendiendoAndo
            </span>
          </Link>

          {/* Desktop Navigation — centered */}
          <nav className="hidden md:flex flex-1 items-center justify-center">
            <div className="flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="nav-link group relative px-4 py-2.5 text-sm text-muted-foreground rounded-full
                    transition-[color,background-color,transform] duration-300 ease-out
                    hover:text-foreground hover:bg-accent/60 hover:-translate-y-0.5 hover:scale-[1.03]
                    active:scale-[0.98] active:translate-y-0"
                >
                  <span className="relative z-10">{item.name}</span>
                  <span
                    className="absolute inset-0 rounded-full bg-accent/40 scale-0 opacity-0
                      group-hover:scale-100 group-hover:opacity-100
                      transition-[transform,opacity] duration-300 ease-out"
                    aria-hidden
                  />
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 z-1 h-0.5 rounded-full
                      bg-[hsl(var(--accent-brand))] w-0 transition-[width] duration-300 ease-out
                      group-hover:w-3/4"
                    aria-hidden
                  />
                </Link>
              ))}
            </div>
          </nav>

          {/* Actions: Subscribe (accent) + Theme + Mobile */}
          <div className="flex flex-1 md:flex-none items-center justify-end gap-2">
            <a
              href={YOUTUBE_SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl text-sm font-medium transition-[color,background-color,transform] duration-200 ease-out hover:scale-[1.02] active:scale-[0.98] bg-[hsl(var(--accent-brand))] text-[hsl(var(--accent-brand-foreground))] hover:opacity-90"
              aria-label="Suscribirse al canal de YouTube"
            >
              <Youtube size={18} aria-hidden />
              Suscribirme
            </a>
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-[color,transform] duration-200 ease-out hover:scale-105 active:scale-95"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation — box contenedor a ancho completo del área de contenido */}
        <div
          ref={mobileNavWrapperRef}
          className="md:hidden -mx-6 w-[calc(100%+3rem)] max-w-none bg-background/95 backdrop-blur-md border-t border-border/50 shadow-[0_10px_40px_-12px_hsl(var(--foreground)/0.12)]"
          style={{ overflow: 'hidden' }}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav
            ref={mobileNavRef}
            className="w-full py-4 px-6"
            aria-label="Menú principal"
          >
            <div className="flex flex-col gap-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  ref={(el) => { mobileNavItemsRef.current[index] = el }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block w-full px-4 py-3.5 text-base font-medium text-foreground rounded-xl bg-accent/30 hover:bg-accent/60 active:bg-accent/80 border border-transparent hover:border-border/50 transition-[background-color,border-color,transform] duration-200 ease-out active:scale-[0.99]"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
