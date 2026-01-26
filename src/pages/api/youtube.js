// API Route para obtener datos de YouTube
// Requiere YOUTUBE_API_KEY en .env.local

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  const channelHandle = '@aprendiendoando'

  if (!apiKey) {
    return res.status(200).json({
      subscriberCount: null,
      videos: [],
      message: 'YouTube API key no configurada',
    })
  }

  try {
    // Primero obtener el channel ID desde el handle
    const channelResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${channelHandle}&type=channel&key=${apiKey}`
    )

    if (!channelResponse.ok) {
      throw new Error('Error al obtener información del canal')
    }

    const channelData = await channelResponse.json()
    const channelId = channelData.items?.[0]?.snippet?.channelId

    if (!channelId) {
      return res.status(200).json({
        subscriberCount: null,
        videos: [],
        message: 'Canal no encontrado',
      })
    }

    // Obtener estadísticas del canal
    const statsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`
    )

    if (!statsResponse.ok) {
      throw new Error('Error al obtener estadísticas del canal')
    }

    const statsData = await statsResponse.json()
    const subscriberCount = parseInt(
      statsData.items?.[0]?.statistics?.subscriberCount || 0
    )

    // Obtener últimos videos
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=6&key=${apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error('Error al obtener videos')
    }

    const videosData = await videosResponse.json()
    const videos = videosData.items?.map((item) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt,
    })) || []

    return res.status(200).json({
      subscriberCount,
      videos,
    })
  } catch (error) {
    console.error('Error en YouTube API:', error)
    return res.status(500).json({
      error: 'Error al obtener datos de YouTube',
      message: error.message,
    })
  }
}
