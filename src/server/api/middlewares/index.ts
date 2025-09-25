import type { Context } from 'hono'
import redis from '@/server/common/redis'
import { API_CALL_LIMIT_KEY } from '@/server/common/redis/keys'

export const rateLimit = async ({
  context,
  key,
  windowSeconds = 60,
  limit = 1
}: {
  context: Context
  key?: string
  windowSeconds?: number
  limit?: number
}) => {
  const routePath = context.req.routePath
  const ipAddress = context.req.header('x-forwarded-for')
  const redisKey =
    `${API_CALL_LIMIT_KEY}:${routePath}:${ipAddress}` + (key ? `:${key}` : '')

  const currentCount = await redis.incr(redisKey)
  if (currentCount === 1) {
    await redis.expire(redisKey, windowSeconds)
  }
  if (currentCount > limit) {
    return false
  }
  return true
}
