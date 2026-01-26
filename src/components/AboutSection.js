'use client'

import { Code2, Globe, Users, Rocket } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Frontend Developer',
    description: 'Más de 11 años construyendo interfaces web modernas y escalables.',
  },
  {
    icon: Globe,
    title: 'Experiencia Global',
    description: 'Trabajo remoto con equipos de Perú, México, USA, Austria, Costa Rica y Colombia.',
  },
  {
    icon: Users,
    title: 'Comunidad WordPress',
    description: 'Organizador de la comunidad WordPress local, compartiendo conocimiento cada mes.',
  },
  {
    icon: Rocket,
    title: 'Enseñar Haciendo',
    description: 'Cursos prácticos donde construyes proyectos reales listos para producción.',
  },
]

export function AboutSection() {
  return (
    <section id="sobre-mi" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl pointer-events-none" />
      
      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full">
            Sobre mí
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="dark:gradient-text gradient-text-light">
              Apasionado por el
            </span>
            <br />
            <span className="text-muted-foreground">
              mundo digital
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fundador de <strong className="text-foreground">aprendiendoando</strong>, 
            una comunidad donde compartimos conocimiento y crecemos juntos como desarrolladores.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-card/50 border border-border/50 hover:border-border transition-all duration-300 card-hover"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-accent/50 text-foreground group-hover:bg-accent transition-colors">
                  <feature.icon size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quote / Mission */}
        <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-accent/30 to-transparent border border-border/30">
          <div className="absolute top-6 left-8 text-6xl text-muted-foreground/20 font-serif">"</div>
          <blockquote className="relative z-10 text-xl md:text-2xl text-foreground/90 leading-relaxed max-w-3xl mx-auto text-center italic">
            Mi meta es dar a mis estudiantes la capacidad de construir sitios 
            totalmente calificados para entrar en el mercado laboral, tomando 
            en cuenta las tendencias y mejores prácticas del desarrollo web moderno.
          </blockquote>
        </div>
      </div>
    </section>
  )
}
