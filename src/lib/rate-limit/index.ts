import "server-only"

export interface RateLimitResult {
    allowed: boolean
    /** Seconds until the client may retry (only set when blocked). */
    retryAfterSeconds?: number
}

export interface RateLimiter {
    check(key: string): Promise<RateLimitResult>
}
