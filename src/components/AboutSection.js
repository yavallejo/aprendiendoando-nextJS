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
    <section id="about-me" className="relative py-12 md:py-24 overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image & Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-square md:aspect-4/5 rounded-4xl overflow-hidden border border-border/30 bg-accent/5">
              {/* Photo placeholder (Use <img> here when you have the picture) */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/40 bg-linear-to-br from-accent/5 to-accent/20">
                <Users size={48} className="mb-4 opacity-50" />
                <span className="text-sm font-medium tracking-wide">[ Add Yan's Photo Here ]</span>
              </div>
            </div>
            
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 md:-right-8 p-6 rounded-2xl bg-card border border-border/50 shadow-xl backdrop-blur-sm -rotate-3 hover:rotate-0 transition-transform duration-300">
               <div className="text-3xl font-bold text-foreground">11+</div>
               <div className="text-sm text-muted-foreground font-medium">Years coding</div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 mt-8 lg:mt-0">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-[hsl(var(--accent-brand-foreground))] border border-[hsl(var(--accent-brand))] bg-[hsl(var(--accent-brand))/10] rounded-full">
              Instructor Profile
            </span>
            
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              <span className="dark:gradient-text gradient-text-light">
                Hey, I'm Yan Vallejo
              </span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
              Founder of <strong className="text-foreground">AprendiendoAndo</strong>. 
              My mission is to equip you with real-world skills to build modern, production-ready web applications using best practices.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 hover:border-border transition-all duration-300 card-hover"
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 flex items-center justify-center rounded-xl bg-accent/50 text-foreground group-hover:bg-accent transition-colors">
                      <feature.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-foreground mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}
