import Redis from "ioredis"

const redisUrl =
  process.env.REDIS_URL || process.env.REDIS_CONNECTION_STRING || ""

let redis: Redis | null = null

export const isRedisConfigured = Boolean(redisUrl)

export function getRedis() {
  if (!redisUrl) return null

  if (!redis) {
    redis = new Redis(redisUrl, {
      lazyConnect: true,
      maxRetriesPerRequest: 2,
      enableReadyCheck: false,
    })

    redis.on("error", (error) => {
      console.error("Redis connection error", error)
    })
  }

  return redis
}
