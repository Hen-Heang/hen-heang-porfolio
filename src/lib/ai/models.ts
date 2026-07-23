import "server-only"

/**
 * Model policy for the portfolio assistant.
 *
 * Three roles, all configurable via env vars so the actual model ids can
 * change without a code deploy:
 *
 * - OPENAI_MODEL          default model for ordinary portfolio/recruiter Q&A.
 * - OPENAI_DEEP_MODEL      used only for questions that need real analysis —
 *                          comparisons, role-fit judgment, architecture
 *                          trade-offs — selected by `classifyComplexity`.
 * - OPENAI_FALLBACK_MODEL  resilience fallback: retried once when the
 *                          default/deep call itself fails (error, timeout,
 *                          capacity) — never used as a primary route.
 *
 * The env var defaults below name the models this deployment is configured
 * for. Swap them via env vars, not code, if the provider renames or retires
 * one — this module never hardcodes a model id inline anywhere else.
 */
export const MODELS = {
    default: process.env.OPENAI_MODEL || "gpt-5.6-terra",
    deep: process.env.OPENAI_DEEP_MODEL || "gpt-5.6-sol",
    fallback: process.env.OPENAI_FALLBACK_MODEL || "gpt-5.6-luna",
} as const

export type ModelTier = "default" | "deep"

export interface ModelSelection {
    tier: ModelTier
    model: string
    reasoningEffort: "low" | "medium"
    textVerbosity: "low" | "medium"
    maxOutputTokens: number
}

/** Comparison/judgment/architecture language — the signal that a question needs the deep model. */
const DEEP_SIGNAL = /\b(compare|comparison|versus|vs\.?|trade-?offs?|architecture|evaluate|evaluation|assess|candidate|role fit|good fit|best fit|would (?:he|heang) fit|why (?:would|should) (?:he|heang|we)|recommend(?:ation)?|pros and cons|strongest (?:evidence|project|professional)|summarize his (?:strongest|professional)|deep dive|in-?depth|walk me through)\b/i

/** Multiple distinct questions in one message ("...? ...and...?") read as compound/analytical. */
const isCompound = (text: string): boolean => (text.match(/\?/g)?.length ?? 0) > 1

/**
 * Deterministic (no LLM call) complexity routing. Errs toward the default
 * model — the deep model is reserved for questions that clearly need
 * multi-fact synthesis or judgment, not every longer sentence.
 */
export function classifyComplexity(latestUserText: string): ModelTier {
    const text = latestUserText.trim()
    if (text.length === 0) return "default"
    if (DEEP_SIGNAL.test(text)) return "deep"
    if (isCompound(text) && text.length > 80) return "deep"
    if (text.length > 260) return "deep"
    return "default"
}

export function selectModel(latestUserText: string): ModelSelection {
    const tier = classifyComplexity(latestUserText)
    if (tier === "deep") {
        return {
            tier,
            model: MODELS.deep,
            reasoningEffort: "medium",
            textVerbosity: "medium",
            maxOutputTokens: 1100,
        }
    }
    return {
        tier,
        model: MODELS.default,
        reasoningEffort: "low",
        textVerbosity: "low",
        maxOutputTokens: 800,
    }
}
