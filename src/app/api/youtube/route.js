import { NextResponse } from 'next/server'

export async function GET() {
  // Try the public YouTube RSS feed first (no API key or quota required).
  // You need the static channelId for your YouTube channel.
  // Example feed URL: https://www.youtube.com/feeds/videos.xml?channel_id=UCxxxxxxxxxxxx
  const channelId = process.env.YOUTUBE_CHANNEL_ID
  // Fallback: lightweight scraping of the videos page using the channel handle
  const channelHandle = process.env.YOUTUBE_CHANNEL_HANDLE || '@AprendiendoAndo'
  const subscriberEstimateEnv = process.env.YOUTUBE_SUBSCRIBERS_ESTIMATE
  const subscriberEstimate =
    typeof subscriberEstimateEnv === 'string' &&
    subscriberEstimateEnv.trim() !== ''
      ? parseInt(subscriberEstimateEnv, 10)
      : null

  try {
    let videos = []

    // 1) Try RSS + channelId when it is available
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

    // 2) If RSS fails (404 or other) or there is no channelId, use HTML fallback with handle
    if (videos.length === 0 && channelHandle) {
      const htmlResponse = await fetch(
        `https://www.youtube.com/${channelHandle.replace('@', '')}/videos`
      )

      if (!htmlResponse.ok) {
        const errorBody = await htmlResponse.text()
        console.error('YouTube HTML page error body:', errorBody)
        // do not throw here; continue with other fallbacks
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
            console.error('Failed to parse ytInitialData from YouTube HTML', e)
          }
        } else {
          console.error('ytInitialData not found in YouTube HTML')
        }
      }
    }

    // 3) Final fallback: manual list of video IDs from env so the page does not break
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

    return NextResponse.json(
      {
        subscriberCount: Number.isNaN(subscriberEstimate)
          ? null
          : subscriberEstimate,
        videos,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('YouTube API error:', error)
    return NextResponse.json(
      {
        error: 'Failed to fetch YouTube data',
        message: error.message,
      },
      { status: 500 }
    )
  }
}

