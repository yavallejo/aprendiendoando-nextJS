'use client'

import { courses } from '@/data/courses'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Star, GraduationCap, ArrowUpRight, Sparkles } from 'lucide-react'

// Placeholder courses for when data is not configured
const placeholderCourses = [
  {
    id: 1,
    title: 'React desde Cero hasta Avanzado',
    description: 'Aprende React con proyectos reales y las mejores prácticas del mercado.',
    image: null,
    students: 2500,
    rating: 4.8,
    udemyLink: 'https://udemy.com',
  },
  {
    id: 2,
    title: 'Next.js - El Framework Fullstack',
    description: 'Domina Next.js y crea aplicaciones web modernas con SSR y SSG.',
    image: null,
    students: 1800,
    rating: 4.9,
    udemyLink: 'https://udemy.com',
  },
  {
    id: 3,
    title: 'WordPress para Desarrolladores',
    description: 'Crea temas y plugins profesionales con PHP y WordPress.',
    image: null,
    students: 3200,
    rating: 4.7,
    udemyLink: 'https://udemy.com',
  },
]

export function CoursesSection() {
  const displayCourses = courses.length > 0 ? courses : placeholderCourses

  return (
    <section id="cursos-premium" className="relative py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full">
            <Sparkles size={14} />
            Cursos Premium
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="dark:gradient-text gradient-text-light">
              Aprende con proyectos
            </span>
            <br />
            <span className="text-muted-foreground">
              listos para producción
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cursos prácticos donde construirás aplicaciones reales que podrás 
            agregar a tu portafolio y usar como referencia en tu trabajo.
          </p>
        </div>

        {/* Courses grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayCourses.map((course, index) => (
            <Card
              key={course.id}
              className="group relative overflow-hidden bg-card/50 border-border/50 hover:border-border transition-all duration-300 card-hover"
            >
              {/* Course image/placeholder */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-accent to-accent/30 overflow-hidden">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <GraduationCap size={48} className="text-muted-foreground/30" />
                  </div>
                )}
                
                {/* Badge */}
                {index === 0 && (
                  <div className="absolute top-4 left-4 px-3 py-1 text-xs font-medium bg-foreground text-background rounded-full">
                    Más popular
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
                    Ver en Udemy
                    <ArrowUpRight size={16} />
                  </a>
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Note */}
        {courses.length === 0 && (
          <p className="mt-12 text-center text-sm text-muted-foreground">
            * Los cursos mostrados son ejemplos. Los cursos reales se agregarán próximamente.
          </p>
        )}
      </div>
    </section>
  )
}
