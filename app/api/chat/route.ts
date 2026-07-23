import { createHash } from "node:crypto"

import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText } from "ai"

import { buildContext } from "@/src/lib/ai/retrieval"
import { buildSystemPrompt } from "@/src/lib/ai/system-prompt"
import { createRateLimiter } from "@/src/lib/rate-limit/factory"
import { clientKeyFromRequest } from "@/src/lib/rate-limit/client-key"
import { validateChatBody } from "@/src/lib/ai/validation"
import { MODELS, selectModel } from "@/src/lib/ai/models"

const chatLimiter = createRateLimiter("chat", 60_000, 10)

export const maxDuration = 30
/** Leaves margin under `maxDuration` for the provider request to abort cleanly and still return a friendly error. */
const REQUEST_TIMEOUT_MS = 25_000

const jsonError = (message: string, status: number, headers?: HeadersInit) =>
    Response.json({ error: message }, { status, headers })

/** Structured, content-free abuse/ops logging — never the message text, never the raw IP. */
function logEvent(event: string, clientKey: string, extra?: Record<string, string | number>): void {
    console.log(JSON.stringify({ event, client: hashClientKey(clientKey), ts: new Date().toISOString(), ...extra }))
}

/** Stable but non-reversible per-client identifier — safe to log and safe to pass to OpenAI as `user` for abuse detection. */
function hashClientKey(clientKey: string): string {
    return createHash("sha256").update(clientKey).digest("hex").slice(0, 24)
}

export async function POST(req: Request) {
    const clientKey = clientKeyFromRequest(req)

    if (!process.env.OPENAI_API_KEY) {
        return jsonError("The assistant isn't configured yet — please email Heang directly instead.", 503)
    }

    const rate = await chatLimiter.check(clientKey)
    if (!rate.allowed) {
        logEvent("rate_limited", clientKey)
        return jsonError("You're sending messages a bit fast — please wait a moment and try again.", 429, {
            "Retry-After": String(rate.retryAfterSeconds ?? 60),
        })
    }

    let body: unknown
    try {
        body = await req.json()
    } catch {
        return jsonError("Invalid request body.", 400)
    }

    const validation = validateChatBody(body)
    if (!validation.ok || !validation.messages || !validation.userTexts) {
        logEvent("validation_failed", clientKey, { reason: validation.error ?? "unknown" })
        return jsonError(validation.error ?? "Invalid request.", 400)
    }

    const { userTexts, messages, page, projectSlug, preferFallback } = validation
    const latestUserText = userTexts[userTexts.length - 1] ?? ""

    const selection = preferFallback
        ? { tier: "default" as const, model: MODELS.fallback, reasoningEffort: "low" as const, textVerbosity: "low" as const, maxOutputTokens: 700 }
        : selectModel(latestUserText)

    const context = await buildContext(userTexts, { page, projectSlug })

    logEvent("chat_request", clientKey, { tier: selection.tier, model: selection.model, page: page ?? "other" })

    const result = streamText({
        model: openai.responses(selection.model),
        system: buildSystemPrompt(context),
        messages: await convertToModelMessages(messages),
        maxOutputTokens: selection.maxOutputTokens,
        abortSignal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
        providerOptions: {
            openai: {
                reasoningEffort: selection.reasoningEffort,
                textVerbosity: selection.textVerbosity,
                user: hashClientKey(clientKey),
            },
        },
    })

    return result.toUIMessageStreamResponse({
        // Never leak provider errors (keys, quotas, stack traces) to the client.
        onError: (error) => {
            logEvent("stream_error", clientKey, { model: selection.model })
            const timedOut = error instanceof Error && error.name === "AbortError"
            return timedOut
                ? "That took too long to answer — please try again in a moment."
                : "Something went wrong while answering. Please try again in a moment."
        },
    })
}
