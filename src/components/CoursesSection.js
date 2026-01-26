import { courses } from '@/data/courses'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, Star } from 'lucide-react'

export function CoursesSection() {
  return (
    <section id="cursos-premium" className="container py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-4 text-center">
          Cursos Premium
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          Aprende desarrollo web con cursos prácticos y proyectos reales
        </p>

        {courses.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Los cursos se agregarán próximamente
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      Sin imagen
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle className="font-heading">{course.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.students.toLocaleString()} alumnos</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.positiveReviews}% positivas</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    className="w-full"
                    variant="default"
                  >
                    <a
                      href={course.udemyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver en Udemy
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
