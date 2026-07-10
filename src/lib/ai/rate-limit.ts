import "server-only"

/**
 * In-memory sliding-window rate limiter, keyed by client IP.
 *
 * Good enough for a portfolio on a single serverless instance (Fluid Compute
 * reuses instances, so the map survives across requests). If the site ever
 * needs multi-region guarantees, swap this for Upstash Redis behind the same
 * `checkRateLimit` signature.
 */
const WINDOW_MS = 60_000
const MAX_REQUESTS_PER_WINDOW = 10
const MAX_TRACKED_CLIENTS = 5_000

const hits = new Map<string, number[]>()

export interface RateLimitResult {
    allowed: boolean
    /** Seconds until the client may retry (only set when blocked). */
    retryAfterSeconds?: number
}

export function checkRateLimit(clientKey: string): RateLimitResult {
    const now = Date.now()
    const windowStart = now - WINDOW_MS

    // Bound memory: drop everything when the map grows past the cap.
    if (hits.size > MAX_TRACKED_CLIENTS) hits.clear()

    const recent = (hits.get(clientKey) ?? []).filter((t) => t > windowStart)

    if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
        hits.set(clientKey, recent)
        const oldest = recent[0]
        return {
            allowed: false,
            retryAfterSeconds: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)),
        }
    }

    recent.push(now)
    hits.set(clientKey, recent)
    return { allowed: true }
}

export function clientKeyFromRequest(req: Request): string {
    const forwarded = req.headers.get("x-forwarded-for")
    return forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "anonymous"
}
