import type { NextApiRequest, NextApiResponse } from "next"
import { getRedis } from "src/libs/redis"
import {
  getViewCookieHeader,
  getViewCookieName,
  getViewKey,
  toViewCount,
} from "src/libs/views"

type ViewResponse = {
  slug: string
  count: number
  enabled: boolean
  incremented: boolean
}

function getSlug(query: NextApiRequest["query"]) {
  const slug = Array.isArray(query.slug) ? query.slug.join("/") : query.slug
  return slug ? decodeURIComponent(slug) : ""
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ViewResponse | { message: string }>
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST")
    return res.status(405).json({ message: "Method not allowed" })
  }

  const slug = getSlug(req.query)

  if (!slug) {
    return res.status(400).json({ message: "Missing slug" })
  }

  const redis = getRedis()

  if (!redis) {
    return res.status(200).json({
      slug,
      count: 0,
      enabled: false,
      incremented: false,
    })
  }

  const cookieName = getViewCookieName(slug)
  const wasViewed = Boolean(req.cookies[cookieName])

  try {
    const count = wasViewed
      ? toViewCount(await redis.get(getViewKey(slug)))
      : await redis.incr(getViewKey(slug))

    if (!wasViewed) {
      res.setHeader("Set-Cookie", getViewCookieHeader(cookieName))
    }

    return res.status(200).json({
      slug,
      count,
      enabled: true,
      incremented: !wasViewed,
    })
  } catch (error) {
    console.error("Failed to update view count", error)
    return res.status(200).json({
      slug,
      count: 0,
      enabled: false,
      incremented: false,
    })
  }
}
