'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Youtube, Users, Play, ExternalLink } from 'lucide-react'

export function YouTubeSection() {
  const [subscriberCount, setSubscriberCount] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => {
        if (data.subscriberCount) setSubscriberCount(data.subscriberCount)
        if (data.videos) setVideos(data.videos)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  // Placeholder videos for when API is not configured
  const placeholderVideos = [
    { id: '1', title: 'Creando tu primer proyecto con Next.js 14', thumbnail: null, publishedAt: '2024-01-15' },
    { id: '2', title: 'Tailwind CSS: Tips y trucos avanzados', thumbnail: null, publishedAt: '2024-01-10' },
    { id: '3', title: 'React Server Components explicados', thumbnail: null, publishedAt: '2024-01-05' },
    { id: '4', title: 'Desplegando aplicaciones en Vercel', thumbnail: null, publishedAt: '2024-01-01' },
    { id: '5', title: 'TypeScript para principiantes', thumbnail: null, publishedAt: '2023-12-28' },
    { id: '6', title: 'Construye un portafolio profesional', thumbnail: null, publishedAt: '2023-12-20' },
  ]

  const displayVideos = videos.length > 0 ? videos : placeholderVideos

  return (
    <section id="videos" className="relative py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium uppercase tracking-wider text-muted-foreground border border-border/50 rounded-full">
              YouTube
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              <span className="dark:gradient-text gradient-text-light">
                Últimos videos
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Contenido gratuito sobre desarrollo web, tutoriales y tips para mejorar tus habilidades.
            </p>
          </div>

          {/* Subscriber count & CTA */}
          <div className="flex flex-col items-start md:items-end gap-4">
            {subscriberCount && (
              <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-accent/30 border border-border/50">
                <Users size={18} className="text-muted-foreground" />
                <span className="text-lg font-semibold text-foreground">
                  {subscriberCount.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground">suscriptores</span>
              </div>
            )}
            <Button
              asChild
              className="h-11 px-6 rounded-full bg-red-600 hover:bg-red-700 text-white"
            >
              <a
                href="https://www.youtube.com/@aprendiendoando?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Youtube size={18} />
                Suscribirme
                <ExternalLink size={14} />
              </a>
            </Button>
          </div>
        </div>

        {/* Videos grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayVideos.slice(0, 6).map((video, index) => (
            <a
              key={video.id}
              href={videos.length > 0 ? `https://www.youtube.com/watch?v=${video.id}` : 'https://www.youtube.com/@aprendiendoando'}
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
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-accent to-accent/50">
                      <Play size={40} className="text-muted-foreground/50" />
                    </div>
                  )}
                  
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-colors">
                    <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 text-black opacity-0 group-hover:opacity-100 transition-all transform scale-75 group-hover:scale-100">
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
        <div className="mt-12 text-center">
          <Button
            asChild
            variant="ghost"
            className="text-muted-foreground hover:text-foreground"
          >
            <a
              href="https://www.youtube.com/@aprendiendoando"
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
