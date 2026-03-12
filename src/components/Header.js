'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ThemeToggle } from './ThemeToggle'
import { Menu, X } from 'lucide-react'

const navigation = [
  { name: 'About me', href: '#about-me' },
  { name: 'Videos', href: '#videos' },
  { name: 'Courses', href: '#premium-courses' },
  { name: 'Contact', href: '#contact' },
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
  const [mobileNavInlineStyle, setMobileNavInlineStyle] = useState(() => ({ overflow: 'hidden', height: 0, opacity: 0 }))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > STICKY_SCROLL_THRESHOLD)
    }
    window.addEventListener('scroll', handleScroll)
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
      setMobileNavInlineStyle((s) => ('height' in s ? { overflow: 'hidden' } : s))
      return
    }
    setMobileNavInlineStyle((s) => ('height' in s ? { overflow: 'hidden' } : s))

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
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground hover:opacity-80 transition-[opacity,transform] duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
          >
            <svg
              className="w-[1.65em] h-[1.65em] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="2.8" strokeWidth="1.5" opacity="0.85" />
              <path d="M12 5v4.2M12 14.8V19" strokeWidth="1.4" opacity="0.65" />
              <path d="M5 12h4.2M14.8 12H19" strokeWidth="1.4" opacity="0.65" />
            </svg>
            <span>AprendiendoAndo</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 ease-out rounded-full hover:bg-accent/50 active:scale-[0.98]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-[color,transform] duration-200 ease-out hover:scale-105 active:scale-95"
            aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation — always in DOM for GSAP, visibility controlled by animation */}
        <div
          ref={mobileNavWrapperRef}
          className="md:hidden"
          style={mobileNavInlineStyle}
          aria-hidden={!isMobileMenuOpen}
        >
          <nav
            ref={mobileNavRef}
            className="border-t border-border/50 bg-background py-5 shadow-[0_8px_24px_-8px_hsl(var(--foreground)/0.08)]"
            aria-label="Mobile menu"
          >
            <div className="flex flex-col gap-0.5">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  ref={(el) => { mobileNavItemsRef.current[index] = el }}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="block px-4 py-3.5 text-base font-medium text-foreground rounded-lg hover:bg-accent/60 active:bg-accent/80 active:scale-[0.98] transition-colors duration-200 ease-out"
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
