'use client'

import { useEffect, useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Button } from '@/components/ui/button'
import { BGPattern } from '@/components/ui/bg-pattern'
import { useLanguage } from '@/components/LanguageProvider'
import { Youtube, ArrowRight } from 'lucide-react'

const subscriberEstimate =
  typeof process.env.NEXT_PUBLIC_YOUTUBE_SUBSCRIBERS_ESTIMATE === 'string' &&
  process.env.NEXT_PUBLIC_YOUTUBE_SUBSCRIBERS_ESTIMATE.trim() !== ''
    ? parseInt(process.env.NEXT_PUBLIC_YOUTUBE_SUBSCRIBERS_ESTIMATE, 10)
    : null

gsap.registerPlugin(ScrollTrigger)

export function HeroSection() {
  const { t, lang } = useLanguage()

  const STATS = useMemo(
    () => [
      { num: 13, suffix: '+', label: t('hero.statYears') },
      { num: 6, suffix: '+', label: t('hero.statCountries') },
      {
        num:
          subscriberEstimate && !Number.isNaN(subscriberEstimate)
            ? subscriberEstimate
            : 12000,
        suffix: '+',
        label: t('hero.statSubscribers'),
      },
      { num: 300, suffix: '+', label: t('hero.statVideos') },
    ],
    [t, lang]
  )

  const numberLocale = lang === 'en' ? 'en-US' : 'es-ES'
  const heroRef = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const subheadlineRef = useRef(null)
  const animRef = useRef(null)
  const statsRef = useRef(null)
  const numberRefs = useRef([])
  const countUpTrigger = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    if (!hero) return

    const handleMouseMove = (e) => {
      const rect = hero.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      hero.style.setProperty('--mouse-x', `${x}px`)
      hero.style.setProperty('--mouse-y', `${y}px`)
    }

    hero.addEventListener('mousemove', handleMouseMove)
    return () => hero.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Block-based animation: text stays as plain DOM, only containers are animated
  useEffect(() => {
    const headline = headlineRef.current
    const subline = sublineRef.current
    const subheadline = subheadlineRef.current
    if (!headline || !subline || !subheadline) return

    const blocks = [headline, subline, subheadline]

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      gsap.set(blocks, { opacity: 1, y: 0 })
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
    tl.from(headline, { opacity: 0, y: 24, duration: 0.7 })
      .from(subline, { opacity: 0, y: 20, duration: 0.6 }, '-=0.4')
      .from(subheadline, { opacity: 0, y: 16, duration: 0.6 }, '-=0.35')

    animRef.current = tl

    return () => {
      gsap.set(blocks, { opacity: 1, y: 0 })
      tl.kill()
      animRef.current = null
    }
  }, [])

  // Stats count-up animation when the section enters the viewport
  useEffect(() => {
    const container = statsRef.current
    if (!container) return

    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const runCountUp = () => {
      STATS.forEach((stat, i) => {
        const el = numberRefs.current[i]
        if (!el) return
        const obj = { val: 0 }
        gsap.to(obj, {
          val: stat.num,
          duration: 1.4,
          ease: 'power2.out',
          snap: { val: 1 },
          onUpdate: () => {
            el.textContent =
              Math.round(obj.val).toLocaleString(numberLocale) + stat.suffix
          },
        })
      })
    }

    const alreadyInView = () => {
      const rect = container.getBoundingClientRect()
      return rect.top < window.innerHeight * 0.85
    }

    if (alreadyInView()) {
      runCountUp()
      return
    }

    countUpTrigger.current = ScrollTrigger.create({
      trigger: container,
      start: 'top 85%',
      once: true,
      onEnter: runCountUp,
    })

    return () => {
      countUpTrigger.current?.kill()
      countUpTrigger.current = null
    }
  }, [STATS, numberLocale])

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pb-8"
      style={{
        background: `
          radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            hsl(var(--accent-brand) / 0.15),
            transparent 45%
          )
        `,
      }}
    >
      {/* Visual pattern overlay. `bg-pattern.js` leverages native Next.js UI conventions via `shadcn/ui` */}
      <BGPattern variant="grid" mask="fade-edges" fill="hsl(var(--accent-brand)/0.05)" />
      
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-background to-background pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 md:py-28 text-center">
        {/* Hero badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border/50 bg-accent/30 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-muted-foreground">{t('hero.badge')}</span>
        </div>

        {/* Headline and subheadline: plain DOM text (always visible), block-based animation */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]">
          <span ref={headlineRef} className="dark:gradient-text gradient-text-light inline-block">
            {t('hero.headline')}
          </span>
          <br />
          <span ref={sublineRef} className="text-muted-foreground inline-block">
            {t('hero.subline')}
          </span>
        </h1>

        <p ref={subheadlineRef} className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed">
          {t('hero.subheadline')}
        </p>

        {/* Primary CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="h-12 px-8 text-base rounded-full bg-[hsl(var(--accent-brand))] text-[hsl(var(--accent-brand-foreground))] hover:opacity-90 transition-[opacity,transform] duration-200 ease-[cubic-bezier(0.33,1,0.68,1)] hover:scale-105 active:scale-[0.98]"
          >
            <a href="#premium-courses">
              {t('hero.ctaCourses')}
              <ArrowRight size={18} className="ml-2" />
            </a>
          </Button>
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="h-12 px-8 text-base rounded-full text-muted-foreground hover:text-foreground border border-border/50 bg-accent/5 transition-[color,transform] duration-200 ease-out hover:scale-[1.02]"
          >
            <a
              href="https://www.youtube.com/@AprendiendoAndo?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube size={20} />
              {t('hero.ctaYoutube')}
            </a>
          </Button>
        </div>

        {/* Stats grid */}
        <div ref={statsRef} className="mt-16 pt-10 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  <span ref={(el) => { numberRefs.current[index] = el }}>
                    0{stat.suffix}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground capitalize">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade-out overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
