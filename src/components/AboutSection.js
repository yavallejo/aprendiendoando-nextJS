'use client'

import Image from 'next/image'
import { useMemo } from 'react'
import { Code2, Globe, Users, Rocket } from 'lucide-react'
import { useLanguage } from '@/components/LanguageProvider'

export function AboutSection() {
  const { t, lang } = useLanguage()

  const features = useMemo(
    () => [
      {
        icon: Code2,
        title: t('about.feature1Title'),
        description: t('about.feature1Desc'),
      },
      {
        icon: Globe,
        title: t('about.feature2Title'),
        description: t('about.feature2Desc'),
      },
      {
        icon: Users,
        title: t('about.feature3Title'),
        description: t('about.feature3Desc'),
      },
      {
        icon: Rocket,
        title: t('about.feature4Title'),
        description: t('about.feature4Desc'),
      },
    ],
    [t, lang]
  )

  return (
    <section id="about-me" className="overflow-hidden relative py-12 md:py-24">
      {/* Background accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-accent/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative px-6 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 items-center lg:grid-cols-12 lg:gap-16">

          {/* Left column: image and badge */}
          <div className="relative lg:col-span-5">
            <div className="overflow-hidden relative border aspect-square md:aspect-4/5 rounded-4xl border-border/30 bg-accent/5">
              <Image
                src="/yan-vallejo.jpg"
                alt={t('about.imageAlt')}
                fill
                sizes="(min-width: 1024px) 480px, (min-width: 768px) 50vw, 100vw"
                priority={false}
                className="object-cover scale-105 saturate-110 contrast-[1.05] brightness-105"
              />
              {/* Color overlay to match the site color palette */}
              <div className="absolute inset-0 to-transparent mix-blend-multiply pointer-events-none bg-linear-to-t from-background/60 via-background/10" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,hsl(var(--accent-brand))/0.35,transparent_55%)] mix-blend-soft-light pointer-events-none" />
            </div>

            {/* Floating experience badge */}
            <div className="absolute -right-6 -bottom-6 p-6 rounded-2xl border shadow-xl backdrop-blur-sm transition-transform duration-300 -rotate-3 md:-right-8 bg-card border-border/50 hover:rotate-0">
              <div className="text-3xl font-bold text-foreground">13+</div>
              <div className="text-sm font-medium text-muted-foreground">{t('about.yearsBadge')}</div>
            </div>
          </div>

          {/* Right column: content */}
          <div className="mt-8 lg:col-span-7 lg:mt-0">
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold uppercase tracking-[0.18em] rounded-full shadow-sm border bg-[hsl(var(--accent-brand))] text-[hsl(var(--accent-brand-foreground))] border-[hsl(var(--accent-brand))]">
              {t('about.badge')}
            </span>

            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              <span className="dark:gradient-text gradient-text-light">
                {t('about.heading')}
              </span>
            </h2>

            <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
              {t('about.introBefore')}
              <strong className="text-foreground">AprendiendoAndo</strong>
              {t('about.introAfter')}
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative p-6 rounded-2xl border transition-all duration-300 group bg-card/50 border-border/50 hover:border-border card-hover"
                >
                  <div className="flex gap-4 items-start">
                    <div className="flex justify-center items-center w-10 h-10 rounded-xl transition-colors shrink-0 bg-accent/50 text-foreground group-hover:bg-accent">
                      <feature.icon size={20} />
                    </div>
                    <div>
                      <h3 className="mb-1 text-base font-semibold text-foreground">
                        {feature.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
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
