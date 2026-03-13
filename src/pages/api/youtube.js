export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Intenta primero el feed público RSS de YouTube (sin API key ni cuotas)
  // Necesitas el channelId estático de tu canal de YouTube.
  // Ejemplo de URL del feed: https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxxxxxxxxxx
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  // Fallback: scrapping ligero de la página de videos usando el handle
  const channelHandle = process.env.YOUTUBE_CHANNEL_HANDLE || '@AprendiendoAndo'
  const subscriberEstimateEnv = process.env.YOUTUBE_SUBSCRIBERS_ESTIMATE
  const subscriberEstimate =
    typeof subscriberEstimateEnv === 'string' && subscriberEstimateEnv.trim() !== ''
      ? parseInt(subscriberEstimateEnv, 10)
      : null

  try {
    let videos = []

    // 1) Intentar con RSS + channelId si está disponible
    if (channelId) {
      const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`
      const feedResponse = await fetch(feedUrl)

      if (feedResponse.ok) {
        const xml = await feedResponse.text()

        const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
        const idRegex = /<yt:videoId>(.*?)<\/yt:videoId>/
        const titleRegex = /<title>(.*?)<\/title>/
        const publishedRegex = /<published>(.*?)<\/published>/
        const thumbnailRegex = /<media:thumbnail url="(.*?)"/

        let match
        while ((match = entryRegex.exec(xml)) && videos.length < 6) {
          const entry = match[1]
          const id = (entry.match(idRegex) || [])[1]
          const title = (entry.match(titleRegex) || [])[1]
          const publishedAt = (entry.match(publishedRegex) || [])[1]
          const thumbnail = (entry.match(thumbnailRegex) || [])[1]

          if (id) {
            videos.push({
              id,
              title: title || '',
              thumbnail: thumbnail || '',
              publishedAt: publishedAt || '',
            })
          }
        }
      } else {
        const errorBody = await feedResponse.text()
        console.error('YouTube RSS feed error body:', errorBody)
      }
    }

    // 2) Si el RSS falla (404 u otro) o no hay channelId, usar fallback HTML con handle
    if (videos.length === 0 && channelHandle) {
      const htmlResponse = await fetch(
        `https://www.youtube.com/${channelHandle.replace('@', '')}/videos`
      )

      if (!htmlResponse.ok) {
        const errorBody = await htmlResponse.text()
        console.error('YouTube HTML page error body:', errorBody)
        // no lanzamos error: seguimos con otros fallbacks
      } else {
        const html = await htmlResponse.text()

        // Extraer el bloque de JSON de ytInitialData
        const initialDataMatch = html.match(
          /ytInitialData"\]\s*=\s*(\{.*?\});<\/script>/s
        )

        if (initialDataMatch) {
          try {
            const initialData = JSON.parse(initialDataMatch[1])
            const contents =
              initialData.contents?.twoColumnBrowseResultsRenderer?.tabs?.[1]
                ?.tabRenderer?.content?.richGridRenderer?.contents || []

            for (const item of contents) {
              const video =
                item.richItemRenderer?.content?.videoRenderer ||
                item.richItemRenderer?.content?.gridVideoRenderer

              if (!video || !video.videoId) continue

              const title =
                video.title?.runs?.[0]?.text ||
                video.headline?.simpleText ||
                ''

              const publishedAt =
                video.publishedTimeText?.simpleText ||
                video.publishedTimeText?.runs?.[0]?.text ||
                ''

              const thumbnail =
                video.thumbnail?.thumbnails?.[
                  video.thumbnail.thumbnails.length - 1
                ]?.url || ''

              videos.push({
                id: video.videoId,
                title,
                thumbnail,
                publishedAt,
              })

              if (videos.length >= 6) break
            }
          } catch (e) {
            console.error('Failed to parse ytInitialData', e)
          }
        } else {
          console.error('ytInitialData not found in YouTube HTML')
        }
      }
    }

    // 3) Fallback definitivo: lista manual de IDs en env para no romper la página
    if (videos.length === 0) {
      const idsEnv = process.env.YOUTUBE_VIDEO_IDS || ''
      const ids = idsEnv
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
      if (ids.length > 0) {
        videos = ids.slice(0, 6).map((id) => ({
          id,
          title: '',
          thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
          publishedAt: '',
        }))
      }
    }

    return res.status(200).json({
      subscriberCount: Number.isNaN(subscriberEstimate) ? null : subscriberEstimate,
      videos,
    })
  } catch (error) {
    console.error('YouTube API error:', error)
    return res.status(500).json({
      error: 'Failed to fetch YouTube data',
      message: error.message,
    })
  }
}
