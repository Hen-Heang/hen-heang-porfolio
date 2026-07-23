import { createHash } from "node:crypto"

import { createRateLimiter } from "@/src/lib/rate-limit/factory"
import { clientKeyFromRequest } from "@/src/lib/rate-limit/client-key"
import { PAGE_CONTEXTS, type PageContext } from "@/src/lib/ai/page-context"

const feedbackLimiter = createRateLimiter("assistant-feedback", 60_000, 20)

const jsonError = (message: string, status: number) => Response.json({ error: message }, { status })

const hashClientKey = (clientKey: string): string => createHash("sha256").update(clientKey).digest("hex").slice(0, 24)

/**
 * Privacy-safe "was this helpful?" signal: a vote plus a coarse page hint,
 * never the question or answer text. Logged only (no persistence store yet)
 * — see the assistant README notes for wiring this into a dashboard.
 */
export async function POST(req: Request) {
    const clientKey = clientKeyFromRequest(req)
    const rate = await feedbackLimiter.check(clientKey)
    if (!rate.allowed) return jsonError("Too many feedback submissions.", 429)

    let body: unknown
    try {
        body = await req.json()
    } catch {
        return jsonError("Invalid request body.", 400)
    }

    const { vote, page } = (body ?? {}) as { vote?: unknown; page?: unknown }
    if (vote !== "up" && vote !== "down") return jsonError("Invalid vote.", 400)
    const safePage: PageContext = typeof page === "string" && (PAGE_CONTEXTS as readonly string[]).includes(page) ? (page as PageContext) : "other"

    console.log(JSON.stringify({ event: "assistant_feedback", vote, page: safePage, client: hashClientKey(clientKey), ts: new Date().toISOString() }))

    return Response.json({ ok: true })
}
