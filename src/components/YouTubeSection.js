'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Youtube, Users } from 'lucide-react'

export function YouTubeSection() {
  const [subscriberCount, setSubscriberCount] = useState(null)
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch YouTube data from API
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => {
        if (data.subscriberCount) {
          setSubscriberCount(data.subscriberCount)
        }
        if (data.videos) {
          setVideos(data.videos)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching YouTube data:', err)
        setLoading(false)
      })
  }, [])

  return (
    <section id="videos" className="container py-24 px-4">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-heading font-bold text-foreground mb-4">
            Últimos Videos
          </h2>
          {subscriberCount && (
            <div className="flex items-center justify-center gap-2 mb-6">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span className="text-lg font-semibold text-foreground">
                {subscriberCount.toLocaleString()} suscriptores
              </span>
            </div>
          )}
          <Button
            asChild
            size="lg"
            className="mb-8"
          >
            <a
              href="https://www.youtube.com/@aprendiendoando"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Youtube className="h-5 w-5" />
              Suscríbete al Canal
            </a>
          </Button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando videos...</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Los videos se cargarán cuando se configure la API de YouTube
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <Card key={video.id} className="overflow-hidden">
                <div className="aspect-video w-full overflow-hidden bg-muted">
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </a>
                </div>
                <CardHeader>
                  <CardTitle className="line-clamp-2 font-heading">
                    {video.title}
                  </CardTitle>
                  <CardDescription>
                    {new Date(video.publishedAt).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
