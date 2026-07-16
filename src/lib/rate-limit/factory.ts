import "server-only"
import { Redis } from "@upstash/redis"
import { MemoryRateLimiter } from "./memory"
import { UpstashRateLimiter } from "./upstash"
import type { RateLimiter } from "./index"

let redisClient: Redis | null | undefined // undefined = not yet checked

function getRedis(): Redis | null {
    if (redisClient !== undefined) return redisClient
    const url = process.env.UPSTASH_REDIS_REST_URL
    const token = process.env.UPSTASH_REDIS_REST_TOKEN
    redisClient = url && token ? new Redis({ url, token }) : null
    return redisClient
}

/**
 * Returns an Upstash-backed limiter when `UPSTASH_REDIS_REST_URL`/`_TOKEN`
 * are configured (correct across Vercel's multiple serverless instances),
 * otherwise falls back to an in-memory limiter so local dev works without
 * any Redis setup.
 */
export function createRateLimiter(prefix: string, windowMs: number, maxRequests: number): RateLimiter {
    const redis = getRedis()
    return redis ? new UpstashRateLimiter(redis, windowMs, maxRequests, prefix) : new MemoryRateLimiter(windowMs, maxRequests)
}
