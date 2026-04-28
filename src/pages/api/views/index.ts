import type { NextApiRequest, NextApiResponse } from "next"
import { getRedis } from "src/libs/redis"
import { getViewKey, toViewCount } from "src/libs/views"

type ViewsResponse = {
  counts: Record<string, number>
  enabled: boolean
}

function getSlugs(query: NextApiRequest["query"]) {
  const raw = Array.isArray(query.slugs) ? query.slugs.join(",") : query.slugs

  if (!raw) return []

  return Array.from(
    new Set(
      raw
        .split(",")
        .map((slug) => decodeURIComponent(slug).trim())
        .filter(Boolean)
    )
  ).slice(0, 100)
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ViewsResponse | { message: string }>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET")
    return res.status(405).json({ message: "Method not allowed" })
  }

  const slugs = getSlugs(req.query)
  const emptyCounts = Object.fromEntries(slugs.map((slug) => [slug, 0]))
  const redis = getRedis()

  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300")

  if (!redis || !slugs.length) {
    return res.status(200).json({
      counts: emptyCounts,
      enabled: Boolean(redis),
    })
  }

  try {
    const values = await redis.mget(...slugs.map(getViewKey))
    const counts = slugs.reduce<Record<string, number>>((acc, slug, index) => {
      acc[slug] = toViewCount(values[index])
      return acc
    }, {})

    return res.status(200).json({ counts, enabled: true })
  } catch (error) {
    console.error("Failed to read view counts", error)
    return res.status(200).json({ counts: emptyCounts, enabled: false })
  }
}
