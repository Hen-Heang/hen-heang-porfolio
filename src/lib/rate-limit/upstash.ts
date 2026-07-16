import "server-only"
import { Ratelimit } from "@upstash/ratelimit"
import type { Redis } from "@upstash/redis"
import type { RateLimiter, RateLimitResult } from "./index"

export class UpstashRateLimiter implements RateLimiter {
    private limiter: Ratelimit

    constructor(redis: Redis, windowMs: number, maxRequests: number, prefix: string) {
        this.limiter = new Ratelimit({
            redis,
            limiter: Ratelimit.slidingWindow(maxRequests, `${windowMs} ms`),
            prefix,
            analytics: false,
        })
    }

    async check(key: string): Promise<RateLimitResult> {
        const { success, reset } = await this.limiter.limit(key)
        if (success) return { allowed: true }
        return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((reset - Date.now()) / 1000)) }
    }
}
