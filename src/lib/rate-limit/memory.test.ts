import { describe, expect, it, beforeEach, afterEach, vi } from "vitest"
import { MemoryRateLimiter } from "./memory"

describe("MemoryRateLimiter", () => {
    beforeEach(() => {
        vi.useFakeTimers()
        vi.setSystemTime(0)
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it("allows requests up to the limit, then blocks with a positive retryAfterSeconds", async () => {
        const limiter = new MemoryRateLimiter(60_000, 3)

        expect((await limiter.check("a")).allowed).toBe(true)
        expect((await limiter.check("a")).allowed).toBe(true)
        expect((await limiter.check("a")).allowed).toBe(true)

        const blocked = await limiter.check("a")
        expect(blocked.allowed).toBe(false)
        expect(blocked.retryAfterSeconds).toBeGreaterThan(0)
    })

    it("tracks different keys independently", async () => {
        const limiter = new MemoryRateLimiter(60_000, 1)

        expect((await limiter.check("a")).allowed).toBe(true)
        expect((await limiter.check("b")).allowed).toBe(true)
        expect((await limiter.check("a")).allowed).toBe(false)
    })

    it("allows requests again after the window expires", async () => {
        const limiter = new MemoryRateLimiter(60_000, 1)

        expect((await limiter.check("a")).allowed).toBe(true)
        expect((await limiter.check("a")).allowed).toBe(false)

        vi.setSystemTime(60_001)
        expect((await limiter.check("a")).allowed).toBe(true)
    })
})
