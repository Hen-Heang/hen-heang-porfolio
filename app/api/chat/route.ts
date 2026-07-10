import { openai } from "@ai-sdk/openai"
import { convertToModelMessages, streamText } from "ai"

import { buildContext } from "@/src/lib/ai/retrieval"
import { buildSystemPrompt } from "@/src/lib/ai/system-prompt"
import { checkRateLimit, clientKeyFromRequest } from "@/src/lib/ai/rate-limit"
import { validateChatBody } from "@/src/lib/ai/validation"

export const maxDuration = 30

/** Small, fast model is plenty for grounded Q&A over a fixed knowledge base. */
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini"

const jsonError = (message: string, status: number, headers?: HeadersInit) =>
    Response.json({ error: message }, { status, headers })

export async function POST(req: Request) {
    if (!process.env.OPENAI_API_KEY) {
        return jsonError("The assistant isn't configured yet — please email Hen directly instead.", 503)
    }

    const rate = checkRateLimit(clientKeyFromRequest(req))
    if (!rate.allowed) {
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
        return jsonError(validation.error ?? "Invalid request.", 400)
    }

    const context = await buildContext(validation.userTexts)

    const result = streamText({
        model: openai.responses(MODEL),
        system: buildSystemPrompt(context),
        messages: await convertToModelMessages(validation.messages),
        temperature: 0.3,
        maxOutputTokens: 700,
    })

    return result.toUIMessageStreamResponse({
        // Never leak provider errors (keys, quotas, stack traces) to the client.
        onError: () => "Something went wrong while answering. Please try again in a moment.",
    })
}
