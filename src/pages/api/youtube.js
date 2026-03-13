// API route to fetch YouTube data
// Requires YOUTUBE_API_KEY in .env.local

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
      message: 'YouTube API key not configured',
    })
  }

  try {
    // First get channel ID from handle using the exact handle parameter
    const channelResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,statistics&forHandle=${channelHandle}&key=${apiKey}`
    )

    if (!channelResponse.ok) {
      throw new Error('Failed to fetch channel information')
    }

    const channelData = await channelResponse.json()
    const channelItem = channelData.items?.[0]
    const channelId = channelItem?.id
    
    // We already have the subscriber count from this request!
    const directSubscriberCount = parseInt(
      channelItem?.statistics?.subscriberCount || 0
    )

    if (!channelId) {
      return res.status(200).json({
        subscriberCount: null,
        videos: [],
        message: 'Channel not found',
      })
    }

    // Now we only need to fetch the videos, since we have the stats
    const videosResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&order=date&maxResults=6&key=${apiKey}`
    )

    if (!videosResponse.ok) {
      throw new Error('Failed to fetch videos')
    }

    const videosData = await videosResponse.json()

    const subscriberCount = directSubscriberCount
    const videos =
      videosData.items?.map((item) => ({
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
    console.error('YouTube API error:', error)
    return res.status(500).json({
      error: 'Failed to fetch YouTube data',
      message: error.message,
    })
  }
}
