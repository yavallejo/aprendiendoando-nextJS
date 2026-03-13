'use client'

import { courses } from '@/data/courses'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Star, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react'

// Placeholder courses for when data is not configured
const placeholderCourses = [
  {
    id: 1,
    title: 'Productividad Extrema en Mac para Devs',
    description: 'Domina Raycast, Amphetamine, Atajos y más herramientas exclusivas de MacOS.',
    image: null,
    students: 2500,
    rating: 4.8,
    udemyLink: 'https://udemy.com',
  },
  {
    id: 2,
    title: 'Domina Git y Control de Versiones con Fork',
    description: 'Aprende a realizar merges visuales y ten control total de tu código sn sufrir.',
    image: null,
    students: 1800,
    rating: 4.9,
    udemyLink: 'https://udemy.com',
  },
  {
    id: 3,
    title: 'Desarrollo de Temas en WordPress',
    description: 'Crea temas profesionales desde cero, usa campos condicionales y personaliza el panel.',
    image: null,
    students: 3200,
    rating: 4.7,
    udemyLink: 'https://udemy.com',
  },
]

export function CoursesSection() {
  const displayCourses = courses.length > 0 ? courses : placeholderCourses

  return (
    <section id="premium-courses" className="relative py-12 md:py-16">
      {/* Background */}
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full">
            <Sparkles size={14} />
            Cursos Premium
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="dark:gradient-text gradient-text-light">
              Desarrolla habilidades
            </span>
            <br />
            <span className="text-muted-foreground">
              listas para el mundo real
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Aprende a trabajar como un profesional: desde tu entorno local, al control de tu código y la gestión de proyectos web.
          </p>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCourses.map((course, index) => (
            <Card
              key={course.id}
              className="group relative overflow-hidden bg-card/40 backdrop-blur-sm border-border/40 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-500"
            >
              {/* Course image/placeholder */}
              <div className="relative aspect-video bg-linear-to-br from-accent to-accent/30 overflow-hidden">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap size={48} className="text-muted-foreground/30" />
                  </div>
                )}
                
                {/* Badge */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full">
                    Most popular
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-foreground/80 transition-colors">
                  {course.title}
                </h3>
                
                {course.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 mb-6 text-sm">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Users size={16} />
                    <span>{course.students?.toLocaleString() || '1000+'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Star size={16} className="fill-yellow-400 text-yellow-400" />
                    <span>{course.rating || course.positiveReviews || '4.8'}</span>
                  </div>
                </div>

                {/* CTA */}
                <Button
                  asChild
                  className="w-full h-11 rounded-full bg-foreground text-background hover:bg-foreground/90"
                >
                  <a
                    href={course.udemyLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    View on Udemy
                    <ArrowUpRight size={16} />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Note */}
        {courses.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            * The courses shown are examples. Real courses will be added soon.
          </p>
        )}
      </div>
    </section>
  )
}
