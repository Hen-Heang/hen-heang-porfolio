import "server-only"

import { renderSections, type KnowledgeSection } from "@/data/knowledge"
import { getLiveKnowledgeBase } from "./live-knowledge"

/**
 * Lightweight keyword retrieval over the knowledge base.
 *
 * The contract is intentionally the same as an embeddings retriever would
 * have — `retrieve(query, sections) → KnowledgeSection[]` — so this module
 * can be swapped for vector search later without touching the API route or
 * UI. Sections come from the live knowledge layer (Supabase with static
 * fallback), so the assistant always answers from what the site shows.
 */
export interface Retriever {
    retrieve(query: string, sections: KnowledgeSection[]): KnowledgeSection[]
}

/** Total character budget for retrieved context (~3k tokens). */
const CONTEXT_CHAR_BUDGET = 12_000
/** Maximum number of non-core sections to include. */
const MAX_SECTIONS = 6
/** Sections scoring below this fraction of the top score are dropped. */
const RELATIVE_SCORE_CUTOFF = 0.25

const tokenize = (text: string): string[] =>
    text
        .toLowerCase()
        .split(/[^a-z0-9+.#]+/)
        .filter((token) => token.length > 1)

function scoreSection(section: KnowledgeSection, queryTokens: string[]): number {
    let score = 0
    for (const token of queryTokens) {
        for (const keyword of section.keywords) {
            if (keyword === token) {
                score += 3
            } else if (keyword.includes(token) || token.includes(keyword)) {
                score += 1
            }
        }
        if (section.title.toLowerCase().includes(token)) score += 2
        if (section.category === token) score += 2
    }
    return score
}

export const keywordRetriever: Retriever = {
    retrieve(query: string, sections: KnowledgeSection[]): KnowledgeSection[] {
        const queryTokens = tokenize(query)

        const scored = sections
            .filter((section) => !section.core)
            .map((section) => ({ section, score: scoreSection(section, queryTokens) }))
            .filter((entry) => entry.score > 0)
            .sort((a, b) => b.score - a.score)

        const topScore = scored[0]?.score ?? 0
        const relevant = scored
            .filter((entry) => entry.score >= topScore * RELATIVE_SCORE_CUTOFF)
            .slice(0, MAX_SECTIONS)
            .map((entry) => entry.section)

        // Greetings / vague questions match nothing — fall back to the
        // overview sections so the model can still introduce Heang.
        const selected = relevant.length > 0
            ? relevant
            : sections.filter((s) => s.id === "projects-catalog" || s.id === "skills-current-focus")

        // Core sections (identity + contact) are always present.
        const result = [...sections.filter((s) => s.core), ...selected]

        // Enforce the character budget, dropping the least relevant first.
        let total = 0
        return result.filter((section) => {
            total += section.content.length
            return total <= CONTEXT_CHAR_BUDGET
        })
    },
}

/**
 * Builds the focused context block for a chat turn. Uses the latest user
 * message plus the previous one so short follow-ups ("tell me more") keep
 * the topic's sections in scope.
 */
export async function buildContext(userMessages: string[]): Promise<string> {
    const sections = await getLiveKnowledgeBase()
    const query = userMessages.slice(-2).join("\n")
    return renderSections(keywordRetriever.retrieve(query, sections))
}
