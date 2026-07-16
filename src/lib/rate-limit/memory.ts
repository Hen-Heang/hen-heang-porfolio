import "server-only"
import type { RateLimiter, RateLimitResult } from "./index"

/**
 * In-memory sliding-window limiter, keyed by client IP.
 *
 * Good enough for local development or a single serverless instance (Fluid
 * Compute reuses instances, so the map survives across requests), but not
 * correct across multiple concurrent instances — `factory.ts` prefers
 * Upstash Redis whenever it's configured and only falls back to this.
 */
export class MemoryRateLimiter implements RateLimiter {
    private hits = new Map<string, number[]>()

    constructor(
        private windowMs: number,
        private maxRequests: number,
        private maxTrackedClients = 5_000,
    ) {}

    async check(key: string): Promise<RateLimitResult> {
        const now = Date.now()
        const windowStart = now - this.windowMs

        // Bound memory: drop everything when the map grows past the cap.
        if (this.hits.size > this.maxTrackedClients) this.hits.clear()

        const recent = (this.hits.get(key) ?? []).filter((t) => t > windowStart)

        if (recent.length >= this.maxRequests) {
            this.hits.set(key, recent)
            const oldest = recent[0]
            return {
                allowed: false,
                retryAfterSeconds: Math.max(1, Math.ceil((oldest + this.windowMs - now) / 1000)),
            }
        }

        recent.push(now)
        this.hits.set(key, recent)
        return { allowed: true }
    }
}
