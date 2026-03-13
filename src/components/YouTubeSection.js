'use client'

import useSWR from 'swr'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Youtube, Users, Play, ExternalLink } from 'lucide-react'

const fetcher = (url) => fetch(url).then((res) => res.json())

export function YouTubeSection() {
  const { data, isLoading } = useSWR('/api/youtube', fetcher)
  const subscriberCount = data?.subscriberCount ?? null
  const videos = data?.videos ?? []

  // Placeholder videos for when API is not configured
  const placeholderVideos = [
    { id: '1', title: 'Building your first project with Next.js 14', thumbnail: null, publishedAt: '2024-01-15' },
    { id: '2', title: 'Tailwind CSS: Advanced tips and tricks', thumbnail: null, publishedAt: '2024-01-10' },
    { id: '3', title: 'React Server Components explained', thumbnail: null, publishedAt: '2024-01-05' },
    { id: '4', title: 'Deploying applications on Vercel', thumbnail: null, publishedAt: '2024-01-01' },
    { id: '5', title: 'TypeScript for beginners', thumbnail: null, publishedAt: '2023-12-28' },
    { id: '6', title: 'Build a professional portfolio', thumbnail: null, publishedAt: '2023-12-20' },
  ]

  const displayVideos = videos.length > 0 ? videos : placeholderVideos

  return (
    <section id="videos" className="relative py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full">
              YouTube
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              <span className="dark:gradient-text gradient-text-light">
                Últimos videos
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Tutoriales útiles, tips de terminal y herramientas de productividad para mejorar tu día a día como desarrollador en el ecosistema Mac.
            </p>
          </div>

          {/* Subscriber count (CTA principal vive en el header sticky) */}
          <div className="flex flex-col items-start md:items-end gap-4">
            {subscriberCount != null ? (
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-accent/30 border border-border/50">
                <Users size={18} className="text-muted-foreground" />
                <span className="text-lg font-semibold text-foreground">
                  {subscriberCount.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">suscriptores</span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.slice(0, 6).map((video, index) => (
            <a
              key={video.id}
              href={videos.length > 0 ? `https://www.youtube.com/watch?v=${video.id}` : 'https://www.youtube.com/@AprendiendoAndo'}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="overflow-hidden bg-card/50 border-border/50 hover:border-border transition-all duration-300 card-hover">
                {/* Thumbnail */}
                <div className="relative aspect-video bg-accent/50 overflow-hidden">
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-accent/50">
                      <Play size={40} className="text-muted-foreground/50" />
                    </div>
                  )}

                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors duration-300 ease-out">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 group-hover:scale-100 transform scale-90 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)]">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-foreground/80 transition-colors mb-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date(video.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </p>
                </div>
              </Card>
            </a>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://www.youtube.com/@AprendiendoAndo"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              Ver todos los videos
              <ExternalLink size={16} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
