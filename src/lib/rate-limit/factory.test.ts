import { describe, expect, it, vi, beforeEach } from "vitest"

describe("createRateLimiter", () => {
    beforeEach(() => {
        vi.resetModules()
        vi.unstubAllEnvs()
    })

    it("returns a working memory-backed limiter when Upstash env vars are absent", async () => {
        vi.stubEnv("UPSTASH_REDIS_REST_URL", "")
        vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "")

        const { createRateLimiter } = await import("./factory")
        const limiter = createRateLimiter("test", 60_000, 1)

        expect((await limiter.check("a")).allowed).toBe(true)
        expect((await limiter.check("a")).allowed).toBe(false)
    })

    it("constructs an Upstash-backed limiter when env vars are present", async () => {
        vi.stubEnv("UPSTASH_REDIS_REST_URL", "https://example.upstash.io")
        vi.stubEnv("UPSTASH_REDIS_REST_TOKEN", "fake-token")

        vi.doMock("@upstash/redis", () => ({
            Redis: vi.fn().mockImplementation(() => ({})),
        }))
        const limitMock = vi.fn().mockResolvedValue({ success: true, reset: Date.now() + 1000 })
        vi.doMock("@upstash/ratelimit", () => ({
            Ratelimit: Object.assign(
                vi.fn().mockImplementation(() => ({ limit: limitMock })),
                { slidingWindow: vi.fn() },
            ),
        }))

        const { createRateLimiter } = await import("./factory")
        const limiter = createRateLimiter("test", 60_000, 1)
        const result = await limiter.check("a")

        expect(limitMock).toHaveBeenCalledWith("a")
        expect(result.allowed).toBe(true)
    })
})
