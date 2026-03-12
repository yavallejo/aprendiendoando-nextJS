'use client'

import { Code2, Globe, Users, Rocket } from 'lucide-react'

const features = [
  {
    icon: Code2,
    title: 'Frontend Developer',
    description: 'Over 11 years building modern, scalable web interfaces.',
  },
  {
    icon: Globe,
    title: 'Global Experience',
    description: 'Remote work with teams from Peru, Mexico, USA, Austria, Costa Rica, and Colombia.',
  },
  {
    icon: Users,
    title: 'WordPress Community',
    description: 'Organizer of the local WordPress community, sharing knowledge every month.',
  },
  {
    icon: Rocket,
    title: 'Teaching by Doing',
    description: 'Hands-on courses where you build real, production-ready projects.',
  },
]

export function AboutSection() {
  return (
    <section id="about-me" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/20 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full">
            About me
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="dark:gradient-text gradient-text-light">
              Passionate about the
            </span>
            <br />
            <span className="text-muted-foreground">
              digital world
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Founder of <strong className="text-foreground">AprendiendoAndo</strong>,
            a community where we share knowledge and grow together as developers. React, Next.js, WordPress, and modern frontend.
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
            My goal is to equip students with the skills to build job-ready sites and apps using modern web development trends and best practices.
          </blockquote>
        </div>
      </div>
    </section>
  )
}
