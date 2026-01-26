'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Youtube, ArrowRight } from 'lucide-react'

export function HeroSection() {
  const heroRef = useRef(null)

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(
            600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
            rgba(120, 119, 198, 0.08),
            transparent 40%
          )
        `,
      }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-background pointer-events-none" />
      
      {/* Subtle grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-border/50 bg-accent/30 backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-sm text-muted-foreground">+11 años de experiencia</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 leading-[0.95]">
          <span className="dark:gradient-text gradient-text-light">
            Aprende desarrollo web
          </span>
          <br />
          <span className="text-muted-foreground">
            haciendo proyectos reales
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          Comunidad de desarrolladores donde compartimos conocimiento, 
          creamos cursos prácticos y construimos proyectos listos para producción.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="h-12 px-8 text-base rounded-full bg-foreground text-background hover:bg-foreground/90 transition-all hover:scale-105"
          >
            <a
              href="https://www.youtube.com/@aprendiendoando?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube size={20} />
              Suscríbete al canal
            </a>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="h-12 px-8 text-base rounded-full text-muted-foreground hover:text-foreground"
            onClick={() => {
              document.querySelector('#cursos-premium')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Ver cursos
            <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 pt-12 border-t border-border/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '11+', label: 'Años de experiencia' },
              { value: '6+', label: 'Países remotos' },
              { value: '1000+', label: 'Estudiantes' },
              { value: '50+', label: 'Videos publicados' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  )
}
